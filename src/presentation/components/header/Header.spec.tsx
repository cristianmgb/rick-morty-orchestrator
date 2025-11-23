import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

const setQueryMock = vi.fn();
vi.mock('@/presentation/store/useGlobalStore', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useGlobalStore: (selector: any) =>
    selector({
      setQuery: setQueryMock,
    }),
}));

vi.mock('rick-morty-components-lib', () => ({
  InputSearch: vi.fn(({ onChange }) => (
    <input
      data-testid="input-search"
      onChange={(e) => onChange(e)}
    />
  )),
}));

describe('Header component', () => {
  it('renders the brand logo', () => {
    render(<Header />);

    const logo = screen.getByAltText('brand-logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the InputSearch component', () => {
    render(<Header />);
    expect(screen.getByTestId('input-search')).toBeInTheDocument();
  });
});
