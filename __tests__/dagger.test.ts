import {describe, expect, it} from '@jest/globals';
import * as fs from 'fs';
import * as dagger from '../src/dagger';
import * as util from 'util';

describe('build', () => {
  it.skip('valid', async () => {
    const daggerBin = await dagger.build('https://github.com/dagger/dagger.git#refs/pull/2161/head');
    expect(fs.existsSync(daggerBin)).toBe(true);
  }, 100000);
});

describe('install', () => {
  it('acquires latest version of Dagger', async () => {
    const daggerBin = await dagger.install('latest');
    expect(fs.existsSync(daggerBin)).toBe(true);
  }, 100000);

  it('acquires latest 0.1 version', async () => {
    const daggerBin = await dagger.install('0.1');
    expect(fs.existsSync(daggerBin)).toBe(true);
  }, 100000);

  it('acquires 0.1.0-alpha.9 version of Dagger', async () => {
    const daggerBin = await dagger.install('0.1.0-alpha.9');
    expect(fs.existsSync(daggerBin)).toBe(true);
  }, 100000);
});

describe('getDownloadUrl', () => {
  const s3URL = 'https://dl.dagger.io/dagger';
  const url = 'https://example.org/dagger_0.2.tar.gz';
  const version = '0.2';

  it('returns the official url of a version of Dagger', async () => {
    const actual = dagger.getDownloadUrl(undefined, version);
    const expected = util.format('%s/releases/%s/%s', s3URL, version, dagger.getFilename(version));
    expect(actual).toBe(expected);
  });

  it('returns the custom url a version of Dagger', async () => {
    const actual = dagger.getDownloadUrl(url, version);
    const expected = url;
    expect(actual).toBe(expected);
  });
});
