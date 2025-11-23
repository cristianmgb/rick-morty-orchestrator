import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from './Footer';

vi.mock('rick-morty-components-lib', () => ({
  theme: {
    palette: {
      secondary: {
        800: '#123456',
        main: '#abcdef',
      },
    },
  },
}));

describe('Footer component', () => {
  it('renders the footer text', () => {
    render(<Footer />);

    expect(
      screen.getByText(
        'TM & © 2024 The Cartoon Network, Inc. All Rights Reserved.'
      )
    ).toBeInTheDocument();
  });

  it('applies the correct background color from theme', () => {
    const { container } = render(<Footer />);

    const box = container.querySelector('div');

    expect(box).toHaveStyle({
      backgroundColor: '#123456',
    });
  });

  it('applies the correct text color from theme', () => {
    render(<Footer />);

    const typography = screen.getByText(
      'TM & © 2024 The Cartoon Network, Inc. All Rights Reserved.'
    );

    expect(typography).toHaveStyle({
      color: '#abcdef',
    });
  });
});
