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
import { chatReducer, ChatStateType } from "./reducers/Chat";

export interface RootState {
	auth: AuthStateType;
	post: PostStateType;
	chat: ChatStateType;
}

const rootReducer = (
	state: RootState | undefined,
	action: AnyActionType,
): CombinedState<RootState> => {
	switch (action.type) {
		case HYDRATE:
			const clientState = { ...state };
			const serverState = { ...action.payload };
			const nextState = {
				...clientState,
				...serverState,
			};

			return nextState;
		default: {
			const combinedReducer = combineReducers({
				auth: authReducer,
				post: postReducer,
				chat: chatReducer,
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
