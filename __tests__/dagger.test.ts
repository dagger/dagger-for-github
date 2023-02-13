import {describe, expect, it} from '@jest/globals';
import * as fs from 'fs';
import * as dagger from '../src/dagger';

describe('build', () => {
  it.skip('valid', async () => {
    const daggerBin = await dagger.build('https://github.com/dagger/dagger.git#refs/pull/2161/head');
    expect(fs.existsSync(daggerBin)).toBe(true);
  }, 100000);
});

describe('install', () => {
  it('acquires latest version of dagger-cue', async () => {
    const daggerBin = await dagger.install('latest');
    expect(fs.existsSync(daggerBin)).toBe(true);
  }, 100000);

  it('acquires latest 0.2.232 version', async () => {
    const daggerBin = await dagger.install('0.2.232');
    expect(fs.existsSync(daggerBin)).toBe(true);
  }, 100000);
});
