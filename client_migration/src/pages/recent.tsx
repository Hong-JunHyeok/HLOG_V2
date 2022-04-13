import React, { Suspense, lazy } from "react";

import ErrorBoundary from '@/components/Common/ErrorBoundary';
import FallbackLoader from '@/components/Common/Loader/FallbackLoader';

import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";

// const PostList = lazy(() => import("../components/Post/PostList"));

function Recent() {
	return (
		<React.Fragment>
      
			<Header />

			{/* <ErrorBoundary fallback={<>error...</>}>
				<Suspense fallback={<FallbackLoader />}>
					<PostList />
				</Suspense>
			</ErrorBoundary>
			*/}

			<Footer /> 
		</React.Fragment>
	);
}

export default Recent;
