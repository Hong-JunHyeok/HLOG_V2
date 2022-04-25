import React, { Suspense, lazy } from "react";
import Head from "next/head";
import dynamic from 'next/dynamic';

import ErrorBoundary from 'components/Common/ErrorBoundary';
import FallbackLoader from 'components/Common/Loader/FallbackLoader';

import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
const PostList = dynamic(() => import("../components/Post/PostList"), { suspense: true });

function Index() {
	return (
		<React.Fragment>
			<Head>
				<title>HLOG - 개발을 공유하다.</title>
			</Head>

			<Header />

			<ErrorBoundary fallback={<>error...</>}>
				<Suspense fallback={<FallbackLoader />}>
					<PostList />
				</Suspense>
			</ErrorBoundary>

			<Footer />
		</React.Fragment>
	);
}

export default Index;
