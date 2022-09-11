import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  test('is visible on the screen', () => {
    const onSubmit = jest.fn((e) => e.preventDefault());

    render(<Button children="Submit" color="blue" size="regular" />, {
      wrapper: ({ children }) => <form onSubmit={onSubmit}>{children}</form>,
    });

    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toBeInTheDocument();
  });

  test('has proper classes', () => {
    const onSubmit = jest.fn((e) => e.preventDefault());

    render(<Button children="Submit" color="blue" size="regular" />, {
      wrapper: ({ children }) => <form onSubmit={onSubmit}>{children}</form>,
    });

    const buttonElement = screen.getByText('Submit');
    expect(buttonElement.classList.contains('blue')).toBe(true);
    expect(buttonElement.classList.contains('regular')).toBe(true);
  });

  test('calls onSubmit function when clicked', () => {
    const onSubmit = jest.fn((e) => e.preventDefault());

    render(<Button children="Submit" color="blue" size="regular" />, {
      wrapper: ({ children }) => <form onSubmit={onSubmit}>{children}</form>,
    });

    const buttonElement = screen.getByText('Submit');
    userEvent.click(buttonElement);
    expect(onSubmit).toBeCalled();
  });
});
