import styled from '@emotion/styled';

const StyledPageError = {
  Container: styled.main`
    width: 100%;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h2 {
      font-weight: bold;
    }
    p {
      padding-bottom: 3rem;
    }
  `,
  Inquiry: styled.ul`
    display: flex;
    li {
      padding: 0 1rem;
    }
  `,
};

export default StyledPageError;
