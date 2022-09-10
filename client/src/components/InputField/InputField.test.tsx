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
      errors={undefined}
      disabled={false}
    />
  );
  const inputFieldElement = screen.getByPlaceholderText('name');
  expect(inputFieldElement).toBeInTheDocument();
});
