import StyledPageError from './StyledPageError';
import SEOHelmet from '../../SEOHelmet';
import Footer from '../../Footer';

const PageError = () => (
  <>
    <SEOHelmet
      title="HLOG | 에러 발생"
    />
    <StyledPageError.Container>
      <h2>
        예기치 못한 에러가 발생했습니다.
      </h2>
      <p>
        새로고침 해보시고 계속 이런 에러가 발생한다면 아래 연락처로 문의주시기 바랍니다.
      </p>
      <StyledPageError.Inquiry>
        <li>
          <a
            href="https://github.com/Hong-JunHyeok/HLOG_V2/issues"
            target="_blank"
            rel="noreferrer"
          >
            Github Issue
          </a>
        </li>

        <li>
          <a
            href="https://www.instagram.com/ramen__killer/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram DM
          </a>
        </li>

      </StyledPageError.Inquiry>
    </StyledPageError.Container>
    <Footer />
  </>
);

export default PageError;
