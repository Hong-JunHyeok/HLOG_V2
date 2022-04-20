import React, { Suspense, lazy } from "react";

import { getPopularPostsMock } from "@/mocks/postData";

import ErrorBoundary from '@/components/Common/ErrorBoundary';
import FallbackLoader from '@/components/Common/Loader/FallbackLoader';

import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
const PostList = lazy(() => import("@/components/Post/PostList"));

const PopularPage = () => {
	return (
		<React.Fragment>
			<Header />
			<ErrorBoundary fallback={<>error...</>}>
				<Suspense fallback={<FallbackLoader />}>
					<PostList postList={getPopularPostsMock(100)}/>
				</Suspense>
			</ErrorBoundary>
			<Footer />
		</React.Fragment>
	);
};

export default PopularPage;
