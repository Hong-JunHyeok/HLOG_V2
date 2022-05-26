import styled from '@emotion/styled';
import mediaQueryHelper from '@/styles/mediaHelper'
import ColorSet from '@/styles/colorSet';

interface ProfileProps {
  profileUrl: string;
}

const StyledUserLog = {
  Container: styled.section`
    padding: 2rem;
    border-radius: 20px;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 2rem;
    background-color: ${ColorSet['--white']};
  `,
  ProfileContainer: styled.div`
    width: 60px;
    height: 60px;

    ${mediaQueryHelper('medium')} {
      width: 80px;
      height: 80px; 
    }

    ${mediaQueryHelper('large')} {
      width: 100px;
      height: 100px; 
    }
  `,
  Profile: styled.figure<ProfileProps>`
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background-image: url(${(props) => props.profileUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    ${mediaQueryHelper('medium')} {
      width: 80px;
      height: 80px; 
    }

    ${mediaQueryHelper('large')} {
      width: 100px;
      height: 100px; 
    }
  `,
  Meta: styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 2rem;
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
