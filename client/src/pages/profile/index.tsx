import React, { useState } from "react";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import useUser from "@/hooks/useUser";
import ErrorModal from "@/components/Modal/Error/ErrorModal";

const ProfilePage = () => {
	const { user } = useUser();
	const [errorModalOpened, setErrorModalOpened] = useState(false);

	if(!user) return null;

	return (
		<React.Fragment>
			<Header />
      <Footer />
			{errorModalOpened && 
			<ErrorModal 
				errorTitle="에러가 발생했습니다."
				onClose={() => {setErrorModalOpened(false)}}
			/> 
			}
		</React.Fragment>
	);
}

export default ProfilePage;
