import {describe, expect, test} from '@jest/globals';
import * as util from '../src/util';

describe('isValidUrl', () => {
  test.each([
    ['https://github.com/dagger/dagger.git', true],
    ['https://github.com/dagger/dagger.git#refs/pull/2161/head', true],
    ['v0.2.7', false]
  ])('given %p', async (url, expected) => {
    expect(util.isValidUrl(url)).toEqual(expected);
  });
});
