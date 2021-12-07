import {
	applyMiddleware,
	CombinedState,
	combineReducers,
	compose,
	createStore,
} from "redux";
import { authReducer, AuthStateType } from "./reducers/Auth";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { AnyActionType } from "../types/Comment";
import thunk from "redux-thunk";
import isDevMode from "../utils/isDevMode";
import { postReducer, PostStateType } from "./reducers/Post";

export interface RootState {
	auth: AuthStateType;
	post: PostStateType;
}

const rootReducer = (
	state: RootState | undefined,
	action: AnyActionType,
): CombinedState<RootState> => {
	switch (action.type) {
		case HYDRATE:
			return action.payload;
		default: {
			const combinedReducer = combineReducers({
				auth: authReducer,
				post: postReducer,
			});

			return combinedReducer(state, action);
		}
	}
};

const configureStore = () => {
	const middlewares = [thunk];

	const enhancer = isDevMode()
		? composeWithDevTools(applyMiddleware(...middlewares))
		: compose(applyMiddleware(...middlewares));

	const store = createStore(rootReducer, enhancer);
	return store;
};

export const wrapper = createWrapper(configureStore, {
	debug: false,
});

export default rootReducer;
