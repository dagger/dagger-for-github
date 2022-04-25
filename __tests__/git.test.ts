import {describe, expect, it} from '@jest/globals';
import * as git from '../src/git';

describe('git', () => {
  it('returns git remote ref', async () => {
    const ref: string = await git.getRemoteSha('https://github.com/dagger/dagger.git', 'refs/pull/2161/head');
    expect(ref).toEqual('aeb8ea3973a7815fff7cbd16f986811baa08ae2f');
  });
});
