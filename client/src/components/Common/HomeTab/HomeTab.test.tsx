import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HomeTab from '.';

const withRouterProvider = (element: React.ReactNode) => {
  const history = createMemoryHistory();
  return (
    <Router
      location={history.location}
      navigator={history}
    >
      {element}
    </Router>
  );
};

describe('HomeTab 테스트', () => {
  it('HomeTab이 렌더링되는지 테스트', () => {
    render(
      withRouterProvider(<HomeTab />)
      ,
    );
  });

  it('Tab들이 렌더링되는지 테스트', () => {
    const { getByText } = render(withRouterProvider(<HomeTab />));
    expect(getByText('인기 게시글')).toBeInTheDocument();
    expect(getByText('최근 게시글')).toBeInTheDocument();
  });
});
