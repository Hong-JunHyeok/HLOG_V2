import customAxios from "../customAxios";
import allCookies from "next-cookies";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

const cookieSetter = (
	context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
): void => {
	const cookies = allCookies(context);

	if (cookies.hlog_access_token) {
		customAxios.defaults.headers["Authorization"] = cookies.hlog_access_token;
	}
};

export default cookieSetter;
