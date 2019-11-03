import { FETCH_JOBS } from '../actions/types';

const INITIAL_STATE = {
  results: []
};

export default function (state = INITIAL_STATE, action) { //collect all different jobs which comes from indeed api request
  switch (action.type) {
    case FETCH_JOBS:
      return action.payload;
    default:
      return state;
  }
}