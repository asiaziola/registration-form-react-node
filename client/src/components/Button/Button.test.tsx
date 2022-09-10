import { render, screen } from '@testing-library/react';
import Button from './Button';

test('displays Button', async () => {
  render(<Button children="Submit" color="blue" size="regular" />);
  const buttonElement = screen.getByText('Submit');
  expect(buttonElement).toBeInTheDocument();
});
