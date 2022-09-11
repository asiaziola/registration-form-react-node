import { fireEvent, render, screen } from '@testing-library/react';
import InputField from './InputField';

describe('InputField', () => {
  test('displays necessary attributes', () => {
    render(
      <InputField
        label="Name"
        placeholder="name"
        onChange={() => {}}
        type="text"
        name="name"
        errors="Name is required"
        disabled={false}
      />
    );
    const inputFieldElement = screen.getByText('Name');
    expect(inputFieldElement).toBeInTheDocument();

    expect(screen.getByPlaceholderText('name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('name').classList.contains('input-field')).toBe(true);
    expect(screen.getByPlaceholderText('name').getAttribute('disabled')).toBe(null);
    expect(screen.getByPlaceholderText('name').getAttribute('type')).toBe('text');

    const errorElement = screen.getByText('Name is required');
    expect(errorElement).toBeInTheDocument();
  });

  test('calls onChange method when changed', () => {
    const mockChange = jest.fn();
    mockChange.mockImplementation((event) => {
      event.preventDefault();
    });
    render(
      <InputField
        label="Name"
        placeholder="name"
        onChange={mockChange}
        type="text"
        name="name"
        errors="Name is required"
        disabled={false}
      />
    );
    fireEvent.input(screen.getByLabelText('Name'), {
      target: {
        value: 'John',
      },
    });

    expect(mockChange).toBeCalled();
  });
});
