import React from 'react';
import { render } from '@testing-library/react';

import Footer from '.';

describe('렌더링 테스트', () => {
  it('Footer 컴포넌트가 기존의 스냅샷과 동일하다', () => {
    const utils = render(<Footer />);
    expect(utils.container).toMatchSnapshot();
  });
  it('Footer 컴포넌트에 텍스트가 잘 렌더링 된다.', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('HLOG')).toBeDefined();
  });
});
