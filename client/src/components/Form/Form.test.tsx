import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

describe('Form', () => {
  test('calls mockSubmit method when submitted', () => {
    const mockSubmit = jest.fn();
    mockSubmit.mockImplementation((event) => {
      event.preventDefault();
    });

    render(
      <Form onSubmit={mockSubmit}>
        <button>Submit</button>
      </Form>
    );
    const buttonElement = screen.getByText('Submit');
    userEvent.click(buttonElement);
    expect(mockSubmit).toBeCalled();
  });
});
