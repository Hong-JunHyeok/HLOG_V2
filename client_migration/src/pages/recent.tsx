import React, { Suspense, lazy } from "react";

import { postsMock } from "@/mocks/postData";

import ErrorBoundary from '@/components/Common/ErrorBoundary';
import FallbackLoader from '@/components/Common/Loader/FallbackLoader';

import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import PostList from "@/components/Post/PostList";

// const PostList = lazy(() => import("../components/Post/PostList"));

function Recent() {
	return (
		<React.Fragment>
      
			<Header />

			<ErrorBoundary fallback={<>error...</>}>
				<Suspense fallback={<FallbackLoader />}>
					<PostList postList={postsMock}/>
				</Suspense>
			</ErrorBoundary>
			
			<Footer /> 
		</React.Fragment>
	);
}

export default Recent;
