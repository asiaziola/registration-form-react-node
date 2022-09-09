import axios from 'axios';
import { ReactElement, useState } from 'react';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const User = (): ReactElement => {
  const [inputValue, setInputValue] = useState({ firstName: '', lastName: '', email: '' });
  const { firstName, lastName, email } = inputValue;
  const [dateValue, setDateValue] = useState(new Date());

  const handleChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(inputValue);
  };

  const handleClick = async () => {
    const user = {
      firstName,
      lastName,
      email,
      eventDate: '2020-10-09',
    };
    const response = await axios.post('/api/users', user);
    console.log(response);
  };

  return (
    <>
      <InputField
        type="text"
        value={firstName}
        placeholder="First name"
        label="First name"
        name="firstName"
        onChange={handleChange}
      />
      <InputField
        type="text"
        value={lastName}
        placeholder="Last name"
        label="Last name"
        name="lastName"
        onChange={handleChange}
      />
      <InputField type="email" value={email} placeholder="Email" label="Email" name="email" onChange={handleChange} />
      <Calendar value={dateValue} onChange={setDateValue} />
      <Button onClick={handleClick} text="Submit" />
    </>
  );
};

export default User;
