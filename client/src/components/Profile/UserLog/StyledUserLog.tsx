import styled from '@emotion/styled';
import mediaQueryHelper from '@/styles/mediaHelper';
import ColorSet from '@/styles/colorSet';

interface ProfileProps {
  profileUrl: string;
}

const StyledUserLog = {
  Container: styled.section`
    width: 100%;
    padding: 1rem;
    border-radius: 20px;
    box-shadow: rgba(17, 12, 46, 0.03) 0px 48px 100px 0px;
    align-items: center;
    margin-bottom: 2rem;
    background-color: ${ColorSet['--white']};
    display: flex;
    flex-direction: column;
    text-align: center;
  `,
  ProfileContainer: styled.div`
    width: 70px;
    height: 70px;

    ${mediaQueryHelper('medium')} {
      width: 70px;
      height: 70px; 
    }

    ${mediaQueryHelper('large')} {
      width: 90px;
      height: 90px; 
    }
  `,
  Profile: styled.figure<ProfileProps>`
    border-radius: 70px;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.profileUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  `,
  Meta: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Name: styled.h3`
    font-size: 24px;
    font-weight: bold;
  `,
  Description: styled.p`
    font-size: 18px;
  `,
};

export default StyledUserLog;
