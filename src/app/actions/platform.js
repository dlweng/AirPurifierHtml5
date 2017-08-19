import * as types from '../constants/ActionTypes';

export function SetPlatform(platform) {
  return {type: types.SET_PLATFORM, data: platform};
}