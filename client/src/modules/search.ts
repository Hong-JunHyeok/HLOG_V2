import { AnyAction } from 'redux';

export const SET_SEARCH = 'SET_SEARCH ' as const;

interface SearchStateType {
  search: string
}

const initialState: SearchStateType = {
  search: '',
};

function searchReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
}

export default searchReducer;
