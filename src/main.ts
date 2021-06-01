import fs from 'fs';
import path from 'path';
import os from 'os';
import * as context from './context';
import * as dagger from './dagger';
import * as stateHelper from './state-helper';
import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function run(): Promise<void> {
  try {
    const inputs: context.Inputs = await context.getInputs();
    const daggerBin = await dagger.install(inputs.version);

    if (inputs.installOnly) {
      const daggerDir = path.dirname(daggerBin);
      core.addPath(daggerDir);
      core.debug(`Added ${daggerDir} to PATH`);
      return;
    } else if (!inputs.args) {
      throw new Error('args input required');
    }

    if (inputs.ageKey) {
      await core.group(`Import Dagger private key`, async () => {
        if (!fs.existsSync(path.join(os.homedir(), '.dagger'))) {
          fs.mkdirSync(path.join(os.homedir(), '.dagger'), {recursive: true});
        }
        await fs.writeFileSync(path.join(os.homedir(), '.dagger', 'keys.txt'), inputs.ageKey);
      });
    }

    if (inputs.workdir && inputs.workdir !== '.') {
      core.info(`Using ${inputs.workdir} as working directory`);
      process.chdir(inputs.workdir);
    }

    stateHelper.setCleanup(inputs.cleanup);
    await exec.exec(`${daggerBin} ${inputs.args} --log-format pretty`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function cleanup(): Promise<void> {
  if (!stateHelper.cleanup) {
    return;
  }
  core.info(`Removing ${path.join(os.homedir(), '.dagger')}`);
  fs.rmdirSync(path.join(os.homedir(), '.dagger'), {recursive: true});
}

if (!stateHelper.IsPost) {
  run();
} else {
  cleanup();
}
