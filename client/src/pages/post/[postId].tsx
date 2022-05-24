import React from "react";
import PostView from "@/components/Post/PostView";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";


const PostViewPage = () => {
	return (
		<React.Fragment>
			<Header />
			<PostView />
			<Footer />
		</React.Fragment>
	);
};

export default PostViewPage;
