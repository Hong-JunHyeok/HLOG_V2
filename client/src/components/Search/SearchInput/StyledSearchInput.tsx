import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';

const StyledSearchInput = {
  Container: styled.div`
    display: flex; 
    justify-content: space-between;
    align-items: center;
    background-color: ${ColorSet['--white']};
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: .6rem;
    .search_input {
      width: 100%;
      border: none; 
      outline: none;
      padding: 15px 10px;
      font-size: 1.2rem;
    }
    .search-icon {
      width: 3rem;
      height: 1.5rem;
    }
    .search_clear_button {
      visibility: hidden;
    }
    .visible {
      visibility: visible;
    }
  `,
};

export default StyledSearchInput;
