import styled from '@emotion/styled';
import mediaQueryHelper from '@/styles/mediaHelper';

const StyledPageLayout = {
  Container: styled.div`
  padding: 5rem 0 0 0;
    ${mediaQueryHelper('medium')} {
      padding-top: 6rem;
    }

    ${mediaQueryHelper('large')} {
      padding-top: 7rem;
    }
  `,
};

export default StyledPageLayout;
