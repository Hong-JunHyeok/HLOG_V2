import React from "react";
import Header from "@/components/Common/Header";
import Footer from '@/components/Common/Footer';
import PostView from "@/components/Post/PostView";


const PostViewPage = (props) => {
	return (
		<React.Fragment>
			<Header />
			<PostView />
			<Footer />
		</React.Fragment>
	);
};

export default PostViewPage;
