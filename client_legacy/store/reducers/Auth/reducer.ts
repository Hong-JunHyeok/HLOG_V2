import { AnyActionType } from "../../../types/Comment";
import * as authActions from "./actions";
import { AuthStateType } from "./types";

const authInitialState: AuthStateType = {
	isLoggedIn: false,
	loginError: null,
	loginLoading: false,

	myInfo: null,
	userInfo: null,

	getUserInfoLoading: false,
	getUserInfoError: null,

	getMyInfoLoading: false,
	getMyInfoError: null,

	editIntroLoading: false,
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
		case authActions.GET_USER_INFO:
			return {
				...state,
				userInfo: null,
				getUserInfoLoading: true,
			};
		case authActions.GET_USER_INFO_SUCCESS:
			return {
				...state,
				userInfo: action.payload,
				getUserInfoLoading: false,
			};
		case authActions.GET_USER_INFO_ERROR:
			return {
				...state,
				userInfo: null,
				getUserInfoLoading: false,
			};
		case authActions.EDIT_INTRO:
			return {
				...state,
				editIntroLoading: true,
			};
		case authActions.EDIT_INTRO_SUCCESS:
			return {
				...state,
				editIntroLoading: false,
				myInfo: {
					...state.myInfo,
					selfIntroduction: action.payload,
				},
			};
		case authActions.EDIT_INTRO_ERROR:
			return {
				...state,
				editIntroLoading: false,
				myInfo: {
					...state.myInfo,
					selfIntroduction: "에러 발생",
				},
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
