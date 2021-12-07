import { AnyActionType } from "../../../types/Comment";
import * as authActions from "./actions";
import { AuthStateType } from "./types";

const authInitialState: AuthStateType = {
	isLoggedIn: false,
	loginError: null,
	loginLoading: false,

	myInfo: null,

	getMyInfoLoading: false,
	getMyInfoError: null,
};

export default function authReducer(
	state: AuthStateType = authInitialState,
	action: AnyActionType,
): AuthStateType {
	switch (action.type) {
		case authActions.LOGIN:
			return {
				...state,
				isLoggedIn: false,
				loginLoading: true,
				loginError: null,
			};
		case authActions.LOGIN_SUCCESS:
			return {
				...state,
				loginLoading: false,
				isLoggedIn: true,

				myInfo: action.payload,
			};
		case authActions.LOGIN_ERROR:
			return {
				...state,
				loginError: action.payload,
			};
		case authActions.GET_MY_INFO:
			return {
				...state,
				myInfo: null,
				getMyInfoLoading: true,
			};
		case authActions.GET_MY_INFO_SUCCESS:
			return {
				...state,
				myInfo: action.payload,
				isLoggedIn: true,
				getMyInfoLoading: false,
			};
		case authActions.GET_MY_INFO_ERROR:
			return {
				...state,
				myInfo: null,
				isLoggedIn: false,
				getMyInfoLoading: false,
			};
		case authActions.LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				myInfo: null,
			};
		default:
			return state;
	}
}
