import * as core from '@actions/core';

export interface Inputs {
  version: string;
  ageKey: string;
  workdir: string;
  args: string;
  installOnly: boolean;
}

export async function getInputs(): Promise<Inputs> {
  return {
    version: core.getInput('version') || 'latest',
    ageKey: core.getInput('age-key'),
    workdir: core.getInput('workdir') || '.',
    args: core.getInput('args'),
    installOnly: core.getBooleanInput('install-only')
  };
}
