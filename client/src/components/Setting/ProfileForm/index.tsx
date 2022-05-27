import {
  ChangeEvent,
  useRef,
} from 'react';
import StyledProfileForm from './StyledProfileForm';
import DefaultProfile from '@/../public/assets/default_profile.svg';
import useMyInfo from '@/hooks/queries/useMyInfo';
import SEOHelmet from '@/components/Common/SEOHelmet';
import useUpload from '@/hooks/useUpload';
import startWithURL from '@/utils/startWithURL';

const ProfileForm = () => {
  const { data: { user }, refetch } = useMyInfo();
  const {
    profileUrl, username, selfIntroduction,
  } = user;
  const {
    upload,
  } = useUpload('/user/profile');
  const profileInputRef = useRef<HTMLInputElement>();

  const handleClickProfileChange = () => {
    if (profileInputRef.current) {
      profileInputRef.current.click();
    }
  };

  const handleChangeProfile = async (event: ChangeEvent<HTMLInputElement>) => {
    const formedProfile = new FormData();
    formedProfile.append('profile', event.target.files[0]);

    await upload(formedProfile);
    refetch();
  };

  return (
    <>
      <SEOHelmet
        title={`${username}설정 | HLOG`}
      />
      <StyledProfileForm.Form>
        <StyledProfileForm.ProfileContainer>
          {profileUrl
            ? (
              <StyledProfileForm.Profile profileUrl={startWithURL(profileUrl)} />
            )
            : <DefaultProfile />}
          <div className="profile_edits">
            <button type="button" onClick={handleClickProfileChange} className="profile_edit primary">프로필 사진 변경하기</button>
            <button type="button" className="profile_edit">프로필 사진 제거하기</button>
            <input type="file" id="profile_input" ref={profileInputRef} onChange={handleChangeProfile} />
          </div>
        </StyledProfileForm.ProfileContainer>

        <StyledProfileForm.Section>
          <StyledProfileForm.Meta>
            <h2>{username}</h2>
            <p>{selfIntroduction}</p>
            <button type="button" className="action_button edit">수정</button>
          </StyledProfileForm.Meta>
        </StyledProfileForm.Section>
        <StyledProfileForm.Section>
          <h3>소셜 정보 추가하기</h3>
          <button type="button" className="action_button edit">수정</button>
        </StyledProfileForm.Section>
        <StyledProfileForm.Section>
          <h3>회원 탈퇴하기</h3>
          <p className="warning">한번 삭제한 유저는 다시 되돌릴 수 없습니다.</p>
          <p className="warning">삭제된 유저의 게시글은 전부 지워집니다.</p>
          <button type="button" className="delete_user">탈퇴</button>
        </StyledProfileForm.Section>
      </StyledProfileForm.Form>
    </>
  );
};

export default ProfileForm;
