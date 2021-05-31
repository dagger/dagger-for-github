import * as core from '@actions/core';

export const IsPost = !!process.env['STATE_isPost'];
export const cleanup = /true/i.test(process.env['STATE_cleanup'] || '');

export function setCleanup(cleanup: boolean) {
  core.saveState('cleanup', cleanup);
}

if (!IsPost) {
  core.saveState('isPost', 'true');
}
