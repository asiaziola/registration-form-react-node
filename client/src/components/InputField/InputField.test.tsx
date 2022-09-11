import { render, screen } from '@testing-library/react';
import InputField from './InputField';

test('InputField', async () => {
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
  const inputFieldElement = screen.getByText('Name');
  expect(inputFieldElement).toBeInTheDocument();

  expect(screen.getByPlaceholderText('name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('name').classList.contains('input-field')).toBe(true);
  expect(screen.getByPlaceholderText('name').getAttribute('disabled')).toBe(null);
  expect(screen.getByPlaceholderText('name').getAttribute('type')).toBe('text');

  const errorElement = screen.getByText('Name is required');
  expect(errorElement).toBeInTheDocument();

  expect(screen.getByText('Name is required')).toBeInTheDocument();
});
