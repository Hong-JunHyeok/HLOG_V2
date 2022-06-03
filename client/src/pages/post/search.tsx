import { Suspense } from 'react';
import styled from '@emotion/styled';
import SearchInput from '@/components/Search/SearchInput';
import SearchList from '@/components/Search/SearchList';
import ErrorBoundary from '@/components/Common/ErrorBoundary';
import PageError from '@/components/Common/Error/PageError';

const StyledSearchPage = {
  Contaienr: styled.main`
    padding: 3rem 2rem;
  `,
};

const SearchPage = () => (
  <StyledSearchPage.Contaienr>
    <SearchInput />
    <ErrorBoundary fallback={<PageError />}>
      <Suspense>
        <SearchList />
      </Suspense>
    </ErrorBoundary>
  </StyledSearchPage.Contaienr>
);

export default SearchPage;
