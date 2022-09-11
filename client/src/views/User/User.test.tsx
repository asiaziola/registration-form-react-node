import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import User from './User';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('User', () => {
  beforeEach(() => {
    mockedAxios.post.mockResolvedValue({});
  });
  test('it should render basic fields', () => {
    render(<User />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByLabelText('First name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
  });

  test('it should validate firstName field', async () => {
    render(<User />);

    fireEvent.input(screen.getByLabelText('Last name'), {
      target: {
        value: 'Doe',
      },
    });

    fireEvent.input(screen.getByLabelText('Email'), {
      target: {
        value: 'email@test.pl',
      },
    });

    fireEvent.input(screen.getByLabelText('Date'), {
      target: {
        value: '2022-10-09',
      },
    });

    const buttonElement = screen.getByText('Submit');
    userEvent.click(buttonElement);

    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument();
    });
  });

  test('it should validate lastName field', async () => {
    render(<User />);

    fireEvent.input(screen.getByLabelText('First name'), {
      target: {
        value: 'John',
      },
    });

    fireEvent.input(screen.getByLabelText('Email'), {
      target: {
        value: 'email@test.pl',
      },
    });

    fireEvent.input(screen.getByLabelText('Date'), {
      target: {
        value: '2022-10-09',
      },
    });

    const buttonElement = screen.getByText('Submit');
    userEvent.click(buttonElement);

    await waitFor(() => {
      expect(screen.getByText('Last name is required')).toBeInTheDocument();
    });
  });

  test('it should validate email field', async () => {
    render(<User />);

    fireEvent.input(screen.getByLabelText('First name'), {
      target: {
        value: 'John',
      },
    });

    fireEvent.input(screen.getByLabelText('Last name'), {
      target: {
        value: 'Doe',
      },
    });

    fireEvent.input(screen.getByLabelText('Date'), {
      target: {
        value: '2022-10-09',
      },
    });

    const buttonElement = screen.getByText('Submit');
    userEvent.click(buttonElement);

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  test('it should validate incorrect email field', async () => {
    render(<User />);

    fireEvent.input(screen.getByLabelText('First name'), {
      target: {
        value: 'John',
      },
    });

    fireEvent.input(screen.getByLabelText('Last name'), {
      target: {
        value: 'Doe',
      },
    });

    fireEvent.input(screen.getByLabelText('Email'), {
      target: {
        value: 'emailtest.pl',
      },
    });

    fireEvent.input(screen.getByLabelText('Date'), {
      target: {
        value: '2022-10-09',
      },
    });

    const buttonElement = screen.getByText('Submit');
    userEvent.click(buttonElement);

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  test('it should submit correct data', async () => {
    render(<User />);

    fireEvent.input(screen.getByLabelText('First name'), {
      target: {
        value: 'John',
      },
    });

    fireEvent.input(screen.getByLabelText('Last name'), {
      target: {
        value: 'Doe',
      },
    });

    fireEvent.input(screen.getByLabelText('Email'), {
      target: {
        value: 'email@test.pl',
      },
    });

    fireEvent.input(screen.getByLabelText('Date'), {
      target: {
        value: '2022-10-09',
      },
    });

    userEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith('/api/users', {
        email: 'email@test.pl',
        eventDate: '2022-10-09',
        firstName: 'John',
        lastName: 'Doe',
      })
    );
  });
});
