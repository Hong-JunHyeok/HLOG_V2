import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HomeTab from '.';

const renderWithRouter = (element: React.ReactNode, route: string) => {
  const history = createMemoryHistory();

  if (route) history.push(route);

  return {
    ...render(
      <Router
        location={history.location}
        navigator={history}
      >
        {element}
      </Router>,
    ),
    history,
  };
};

describe('HomeTab 테스트', () => {
  it('HomeTab이 렌더링되는지 테스트', () => {
    renderWithRouter(<HomeTab />, '/');
  });

  it('Tab들이 렌더링되는지 테스트', () => {
    const { getByText } = renderWithRouter(<HomeTab />, '/');
    expect(getByText('인기 게시글')).toBeInTheDocument();
    expect(getByText('최근 게시글')).toBeInTheDocument();
  });

  it('Router가 잘 동작하는지 테스트', async () => {
    const { getByText, history } = renderWithRouter(<HomeTab />, '/recent');
    const popularButton = getByText('인기 게시글');
    fireEvent.click(popularButton);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });

    const recentButton = getByText('최근 게시글');
    fireEvent.click(recentButton);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/recent');
    });
  });
});
