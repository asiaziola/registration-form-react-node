import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

test('Button', async () => {
  const onSubmit = jest.fn((e) => e.preventDefault());

  render(<Button children="Submit" color="blue" size="regular" />, {
    wrapper: ({ children }) => <form onSubmit={onSubmit}>{children}</form>,
  });

  const buttonElement = screen.getByText('Submit');
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement.classList.contains('blue')).toBe(true);
  expect(buttonElement.classList.contains('regular')).toBe(true);

  userEvent.click(buttonElement);
  expect(onSubmit).toBeCalled();
});
