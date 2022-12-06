import fs from 'fs';
import * as os from 'os';
import path from 'path';
import * as core from '@actions/core';

let _tmpDir: string;

export function tmpDir(): string {
  if (!_tmpDir) {
    _tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dagger-')).split(path.sep).join(path.posix.sep);
  }
  return _tmpDir;
}

export interface Inputs {
  version: string;
  workdir: string;
  args: string;
  installOnly: boolean;
  cleanup: boolean;
  cmds: string[];
}

export async function getInputs(): Promise<Inputs> {
  return {
    version: core.getInput('version') || '0.2',
    workdir: core.getInput('workdir') || '.',
    args: core.getInput('args'),
    installOnly: core.getBooleanInput('install-only'),
    cleanup: core.getBooleanInput('cleanup'),
    cmds: await getInputList('cmds')
  };
}

export async function getInputList(name: string, ignoreComma?: boolean): Promise<string[]> {
  const items = core.getInput(name);
  if (items == '') {
    return [];
  }
  return items
    .split(/\r?\n/)
    .filter(x => x)
    .reduce<string[]>((acc, line) => acc.concat(!ignoreComma ? line.split(',').filter(x => x) : line).map(pat => pat.trim()), []);
}

export const asyncForEach = async (array, callback) => {
  for (const index in array) {
    await callback(array[index], index, array);
  }
};
