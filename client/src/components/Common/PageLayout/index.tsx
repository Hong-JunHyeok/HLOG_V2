import { Suspense } from 'react';
import useMyInfo from '@/hooks/queries/useMyInfo';
import PageError from '../Error/PageError';
import ErrorBoundary from '../ErrorBoundary';
import Footer from '../Footer';
import Header from '../Header';
import SEOHelmet from '../SEOHelmet';
import StyledPageLayout from './StyledPageLayout';

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const { data } = useMyInfo();

  return (
    <>
      <SEOHelmet
        title="HLOG"
      />
      <ErrorBoundary fallback={<PageError />}>
        <ErrorBoundary fallback={<>Header Error</>}>
          <Suspense>
            <Header user={data?.user} />
          </Suspense>
        </ErrorBoundary>
        <StyledPageLayout.Container>
          {children}
        </StyledPageLayout.Container>
        <Footer />
      </ErrorBoundary>
    </>
  );
};

export default PageLayout;
