import fs = require('fs');
import * as dagger from '../src/dagger';

describe('install', () => {
  it('acquires latest version of Dagger', async () => {
    const daggerBin = await dagger.install('latest');
    console.log(daggerBin);
    expect(fs.existsSync(daggerBin)).toBe(true);
  }, 100000);

  it('acquires 0.1.0-alpha.9 version of Dagger', async () => {
    const daggerBin = await dagger.install('0.1.0-alpha.9');
    console.log(daggerBin);
    expect(fs.existsSync(daggerBin)).toBe(true);
  }, 100000);
});
