import React, { Suspense, lazy } from "react";

import ErrorBoundary from '@/components/Common/ErrorBoundary';
import FallbackLoader from '@/components/Common/Loader/FallbackLoader';

import Header from "@/components/Common/Header";
import HomeTab from '@/components/Common/HomeTab';
import Footer from "@/components/Common/Footer";

const RecentPostList = lazy(() => import("@/components/Post/PostList/RecentPostList"));

const RecentPage = () => {
	return (
		<React.Fragment>
			<Header />
			<HomeTab />
			<ErrorBoundary fallback={<>error...</>}>
				<Suspense fallback={<FallbackLoader />}>
					<RecentPostList />
				</Suspense>
			</ErrorBoundary>
			<Footer /> 
		</React.Fragment>
	);
}

export default RecentPage;
