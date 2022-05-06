import * as os from 'os';
import * as path from 'path';
import * as util from 'util';
import * as context from './context';
import * as git from './git';
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as http from '@actions/http-client';
import * as tc from '@actions/tool-cache';

const s3URL = 'https://dl.dagger.io/dagger';
const osPlat: string = os.platform();
const osArch: string = os.arch();

export async function build(inputBuildRef: string): Promise<string> {
  // eslint-disable-next-line prefer-const
  let [repo, ref] = inputBuildRef.split('#');
  if (ref.length == 0) {
    ref = 'main';
  }

  const sha = await git.getRemoteSha(repo, ref);
  core.debug(`Remote ref ${sha} found`);

  let toolPath: string;
  toolPath = tc.find('dagger', sha);
  if (!toolPath) {
    const outFolder = path.join(context.tmpDir(), 'out').split(path.sep).join(path.posix.sep);
    toolPath = await exec
      .getExecOutput('docker', ['buildx', 'build', '--build-arg', 'BUILDKIT_CONTEXT_KEEP_GIT_DIR=1', '--output', `type=local,dest=${outFolder}`, inputBuildRef], {
        ignoreReturnCode: true
      })
      .then(res => {
        if (res.stderr.length > 0 && res.exitCode != 0) {
          core.warning(res.stderr.trim());
        }
        return tc.cacheFile(`${outFolder}/bin/dagger`, osPlat == 'win32' ? 'dagger.exe' : 'dagger', 'dagger', sha);
      });
  }

  return path.join(toolPath, osPlat == 'win32' ? 'dagger.exe' : 'dagger');
}

export async function install(version: string): Promise<string> {
  version = await getVersionMapping(version);
  version = version.replace(/^v/, '');

  const downloadUrl: string = util.format('%s/releases/%s/%s', s3URL, version, getFilename(version));
  core.info(`Downloading ${downloadUrl}`);
  const downloadPath: string = await tc.downloadTool(downloadUrl);
  core.debug(`Downloaded to ${downloadPath}`);

  core.info('Extracting Dagger');
  let extPath: string;
  if (osPlat == 'win32') {
    extPath = await tc.extractZip(downloadPath);
  } else {
    extPath = await tc.extractTar(downloadPath);
  }
  core.debug(`Extracted to ${extPath}`);

  const cachePath: string = await tc.cacheDir(extPath, 'dagger', version);
  core.debug(`Cached to ${cachePath}`);

  const exePath: string = path.join(cachePath, osPlat == 'win32' ? 'dagger.exe' : 'dagger');
  core.debug(`Exe path is ${exePath}`);

  return path.join(cachePath, osPlat == 'win32' ? 'dagger.exe' : 'dagger');
}

async function getVersionMapping(version: string): Promise<string> {
  const _http = new http.HttpClient('dagger-for-github');
  const res = await _http.get(`${s3URL}/versions/${version}`);
  if (res.message.statusCode != 200) {
    return version;
  }

  return await res.readBody().then(body => {
    return body.trim();
  });
}

const getFilename = (version: string): string => {
  const platform: string = osPlat == 'win32' ? 'windows' : osPlat;
  const arch: string = osArch == 'x64' ? 'amd64' : osArch;
  const ext: string = osPlat == 'win32' ? '.zip' : '.tar.gz';
  return util.format('dagger_v%s_%s_%s%s', version, platform, arch, ext);
};
