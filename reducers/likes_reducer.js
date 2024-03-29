import _ from 'lodash';
import { REHYDRATE } from 'redux-persist';
import { LIKE_JOB, CLEAR_LIKED_JOBS } from '../actions/types';

export default function (state = [], action) { //collect all different jobs which comes from indeed api request
  switch (action.type) {
    case REHYDRATE:
      return action.payload.likedJobs || [];
    case LIKE_JOB:
      return _.uniqBy([
        action.payload, ...state
      ], 'jobkey'); //make a new array, it should contain jobs that user just liked and all the other jobs the user liked before
    case CLEAR_LIKED_JOBS:
      return [];
    default:
      return state;
  }
}