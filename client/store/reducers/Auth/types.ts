import * as authActions from "./actions";
import { UserType } from "../../../types/User";

export type AuthActions = typeof authActions;

export interface AuthStateType {
	isLoggedIn: boolean;
	loginLoading: boolean;
	loginError: Error | null;

	myInfo: null | UserType;
	userInfo: null | UserType;

	getUserInfoLoading: boolean;
	getUserInfoError: Error | null;

	getMyInfoLoading: boolean;
	getMyInfoError: Error | null;

	editIntroLoading: boolean;
}
