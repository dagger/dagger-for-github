import * as core from '@actions/core';

export interface Inputs {
  version: string;
  workdir: string;
  args: string;
  installOnly: boolean;
  cleanup: boolean;
}

export async function getInputs(): Promise<Inputs> {
  return {
    version: core.getInput('version') || 'latest',
    workdir: core.getInput('workdir') || '.',
    args: core.getInput('args'),
    installOnly: core.getBooleanInput('install-only'),
    cleanup: core.getBooleanInput('cleanup')
  };
}
