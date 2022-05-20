import React, { Suspense, lazy } from "react";

import ErrorBoundary from '@/components/Common/ErrorBoundary';
import FallbackLoader from '@/components/Common/Loader/FallbackLoader';

import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
const PopularPostList = lazy(() => import("@/components/Post/PostList/PopularPostList"));

const PopularPage = () => {
	return (
		<React.Fragment>
			<Header />
			<ErrorBoundary fallback={<>error...</>}>
				<Suspense fallback={<FallbackLoader />}>
					<PopularPostList />
				</Suspense>
			</ErrorBoundary>
			<Footer />
		</React.Fragment>
	);
};

export default PopularPage;
