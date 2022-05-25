import React, { Suspense, lazy } from "react";

import ErrorBoundary from '@/components/Common/ErrorBoundary';
import FallbackLoader from '@/components/Common/Loader/FallbackLoader';

import Header from "@/components/Common/Header";
import HomeTab from '@/components/Common/HomeTab';
import Footer from "@/components/Common/Footer";

const PopularPostList = lazy(() => import("@/components/Post/PostList/PopularPostList"));

const PopularPage = () => {
	return (
		<React.Fragment>
			<Header />
			<HomeTab />
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
