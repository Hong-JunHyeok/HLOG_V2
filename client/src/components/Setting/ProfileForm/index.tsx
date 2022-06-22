import {
  ChangeEvent,
  useRef,
  useState,
} from 'react';
import StyledProfileForm from './StyledProfileForm';
import DefaultProfile from '@/../public/assets/default_profile.svg';
import useMyInfo from '@/hooks/queries/useMyInfo';
import SEOHelmet from '@/components/Common/SEOHelmet';
import startWithURL from '@/utils/startWithURL';
import useToggle from '@/hooks/useToggle';
import useEditProfile from '@/hooks/mutations/useEditProfile';
import useEditMeta from '@/hooks/mutations/useEditMeta';
import useWithdrawal from '@/hooks/mutations/useWithdrawal';
import useDeleteProfile from '@/hooks/mutations/useDeleteProfile';

const ProfileSetting = () => {
  const { data } = useMyInfo();

  const profileInputRef = useRef<HTMLInputElement>();
  const editProfile = useEditProfile();
  const deleteProfile = useDeleteProfile();

  const handleClickProfileChange = () => {
    if (profileInputRef.current) {
      profileInputRef.current.click();
    }
  };

  const handleChangeProfile = async (event: ChangeEvent<HTMLInputElement>) => {
    const formedProfile = new FormData();
    formedProfile.append('userId', String(data?.user.id));
    formedProfile.append('profile', event.target.files[0]);

    editProfile(formedProfile);
  };

  const handleDeleteUserProfile = () => {
    deleteProfile();
  };

  return (
    <StyledProfileForm.ProfileContainer>
      {data?.user.profileUrl
        ? (
          <StyledProfileForm.Profile profileUrl={startWithURL(data?.user.profileUrl)} />
        )
        : <DefaultProfile />}
      <div className="profile_edits">
        <button type="button" onClick={handleClickProfileChange} className="profile_edit primary">프로필 사진 변경하기</button>
        <button type="button" className="profile_edit" onClick={handleDeleteUserProfile}>프로필 사진 제거하기</button>
        <input type="file" id="profile_input" ref={profileInputRef} onChange={handleChangeProfile} />
      </div>
    </StyledProfileForm.ProfileContainer>
  );
};

const MetaSetting = () => {
  const { data } = useMyInfo();
  const editMeta = useEditMeta();

  const {
    state: metaEditable,
    toggleState: toggleMetaEditable,
  } = useToggle(false);

  const [editedMeta, setEditedMeta] = useState({
    username: data?.user.username,
    selfIntroduction: data?.user.selfIntroduction,
  });

  const handleEditMeta = () => {
    if (metaEditable) {
      editMeta(editedMeta);
    }

    toggleMetaEditable();
  };

  const handleChangeMeta = (event) => {
    setEditedMeta((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <StyledProfileForm.Meta>
      <h3 className="section_title">유저 정보</h3>
      <label htmlFor="username">
        <p className="label">이름</p>
        {metaEditable
          ? (
            <input type="text" value={editedMeta.username} className="meta_input" name="username" onChange={handleChangeMeta} />
          )
          : (
            <p id="username" className="value">{data?.user.username}</p>
          )}
      </label>
      <label htmlFor="selfIntroduction">
        <p className="label">한줄 자기소개</p>
        {metaEditable
          ? (
            <input type="text" value={editedMeta.selfIntroduction} className="meta_input" name="selfIntroduction" onChange={handleChangeMeta} />
          )
          : (
            <p id="selfIntroduction" className="value">{data?.user.selfIntroduction}</p>
          )}
      </label>
      <div className="edit">
        <button type="button" onClick={handleEditMeta}>수정</button>
      </div>
      <StyledProfileForm.Form />
    </StyledProfileForm.Meta>
  );
};

const DeleteUser = () => {
  const { data } = useMyInfo();
  const withdrawal = useWithdrawal();

  const handleWithDrawalUser = () => {
    withdrawal(String(data?.user.id));
  };
  return (
    <>
      <h3 className="section_title">회원 탈퇴하기</h3>
      <p className="warning">한번 삭제한 유저는 다시 되돌릴 수 없습니다.</p>
      <p className="warning">삭제된 유저의 게시글은 전부 지워집니다.</p>
      <button type="button" className="delete_user" onClick={handleWithDrawalUser}>탈퇴</button>

    </>
  );
};

const ProfileForm = () => (
  <>
    <SEOHelmet
      title="HLOG | 설정"
    />

    <>
      <ProfileSetting />
      <StyledProfileForm.Section>
        <MetaSetting />
      </StyledProfileForm.Section>

      <StyledProfileForm.Section>
        <DeleteUser />
      </StyledProfileForm.Section>
    </>

  </>
);

export default ProfileForm;
