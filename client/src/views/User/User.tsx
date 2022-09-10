import axios from 'axios';
import { setDefaultResultOrder } from 'dns';
import { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import InputField from '../../components/InputField/InputField';
import './User.css';

const User = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorResult, setErrorResult] = useState({ error: false, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    let defaultValues: any = {};
    defaultValues.date = new Date().toISOString().substring(0, 10);
    reset({ ...defaultValues });
  }, [reset]);

  const handleRegistration = async (data: any) => {
    setLoading(true);
    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      eventDate: data.date,
    };
    await axios
      .post('/api/users', user)
      .then(() => {
        setLoading(false);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
        }, 1000);
      })
      .catch((e) => {
        setErrorResult({ error: true, message: e.message });
        setTimeout(() => {
          setErrorResult({ error: false, message: '' });
        }, 1000);
      });
  };

  const registerOptions = {
    firstName: { required: 'First name is required' },
    lastName: { required: 'Last name is required' },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },
    date: { required: 'Date is required' },
  };

  return (
    <>
      <Form onSubmit={handleSubmit(handleRegistration)}>
        <div>
          <InputField
            type="text"
            placeholder="First name"
            label="First name"
            {...register('firstName', registerOptions.firstName)}
            errors={errors?.firstName && errors.firstName.message}
            disabled={loading}
          />
        </div>
        <div>
          <InputField
            type="text"
            placeholder="Last name"
            label="Last name"
            {...register('lastName', registerOptions.lastName)}
            errors={errors?.lastName && errors.lastName.message}
            disabled={loading}
          />
        </div>
        <div>
          <InputField
            type="email"
            placeholder="Email"
            label="Email"
            {...register('email', registerOptions.email)}
            errors={errors?.email && errors.email.message}
            disabled={loading}
          />
          <InputField
            type="date"
            label="Date"
            {...register('date', registerOptions.date)}
            errors={errors?.date && errors.date.message}
            disabled={loading}
          />
        </div>

        <Button children={loading ? <i className="fa fa-spinner fa-spin"></i> : 'Submit'} color="blue" size="regular" />
      </Form>
      <div className="registration-text">
        {submitted && 'Registration done'}
        {errorResult.error && errorResult.message}
      </div>
    </>
  );
};

export default User;
