import axios from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import InputField from '../../components/InputField/InputField';
import './User.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const userSchema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .required('First name is a required field')
      .matches(/^[aA-zZ\s]+$/, 'First name should contain only letters'),
    lastName: yup
      .string()
      .required('Last name is a required field')
      .matches(/^[aA-zZ\s]+$/, 'Last name should contain only letters'),
    email: yup.string().required('Email is a required field').email('Email must be valid'),
    date: yup.date().required('Date is a required field'),
  })
  .required();

const User = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorResult, setErrorResult] = useState({ error: false, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(userSchema) });

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
        }, 3000);
      })
      .catch((e) => {
        setErrorResult({ error: true, message: e.message });
        setTimeout(() => {
          setErrorResult({ error: false, message: '' });
        }, 3000);
        setLoading(false);
      });
  };

  // const registerOptions = {
  //   firstName: { required: 'First name is a required field' },
  //   lastName: { required: 'Last name is a required field' },
  //   email: {
  //     required: 'Email is a required field',
  //     pattern: {
  //       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  //       message: 'Email must be valid',
  //     },
  //   },
  //   date: { required: 'Date is required' },
  // };

  return (
    <>
      <Form onSubmit={handleSubmit(handleRegistration)}>
        <div>
          <InputField
            type="text"
            placeholder="First name"
            label="First name"
            {...register('firstName')}
            errors={errors?.firstName && errors.firstName.message}
            disabled={loading}
          />
        </div>
        <div>
          <InputField
            type="text"
            placeholder="Last name"
            label="Last name"
            {...register('lastName')}
            errors={errors?.lastName && errors.lastName.message}
            disabled={loading}
          />
        </div>
        <div>
          <InputField
            type="email"
            placeholder="Email"
            label="Email"
            {...register('email')}
            errors={errors?.email && errors.email.message}
            disabled={loading}
          />
          <InputField
            type="date"
            label="Date"
            {...register('date')}
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
