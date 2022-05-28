import { useParams } from 'react-router-dom';
import useUserInfo from '@/hooks/queries/useUserInfo';
import StyledUserLog from './StyledUserLog';
import DefaultProfile from '@/../public/assets/default_profile.svg';
import SEOHelmet from '@/components/Common/SEOHelmet';
import startWithURL from '@/utils/startWithURL';

function UserLog() {
  const { userId } = useParams();
  const { data } = useUserInfo(parseInt(userId, 10));
  const {
    username,
    profileUrl,
    selfIntroduction,
  } = data.user;

  return (
    <>
      <SEOHelmet
        title={`${username}님의 프로필 | HLOG`}
      />
      <StyledUserLog.Container>
        <StyledUserLog.ProfileContainer>
          {profileUrl
            ? (
              <StyledUserLog.Profile
                profileUrl={startWithURL(profileUrl)}
              />
            )
            : <DefaultProfile />}
        </StyledUserLog.ProfileContainer>
        <StyledUserLog.Meta>
          <StyledUserLog.Name>
            {username}
          </StyledUserLog.Name>
          <StyledUserLog.Description>
            {selfIntroduction}
          </StyledUserLog.Description>
        </StyledUserLog.Meta>
      </StyledUserLog.Container>
    </>
  );
}

export default UserLog;
