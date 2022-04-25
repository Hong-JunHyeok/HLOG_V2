import React, { Suspense, lazy } from "react";

import ErrorBoundary from '@/components/Common/ErrorBoundary';
import FallbackLoader from '@/components/Common/Loader/FallbackLoader';

import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
const RecentPostList = lazy(() => import("@/components/Post/PostList/RecentPostList"));

const PopularPage = () => {
	return (
		<React.Fragment>
			<Header />
			<ErrorBoundary fallback={<>error...</>}>
				<Suspense fallback={<FallbackLoader />}>
					<RecentPostList />
				</Suspense>
			</ErrorBoundary>
			<Footer />
		</React.Fragment>
	);
};

export default PopularPage;
