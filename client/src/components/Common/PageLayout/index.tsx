import PageError from '../Error/PageError';
import ErrorBoundary from '../ErrorBoundary';
import Footer from '../Footer';
import Header from '../Header';
import SEOHelmet from '../SEOHelmet';
import StyledPageLayout from './StyledPageLayout';

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout = ({ children }: PageLayoutProps) => (
  <>
    <SEOHelmet
      title="HLOG"
    />
    <ErrorBoundary fallback={<PageError />}>
      <Header />
      <StyledPageLayout.Container>
        {children}
      </StyledPageLayout.Container>
      <Footer />
    </ErrorBoundary>
  </>
);

export default PageLayout;
