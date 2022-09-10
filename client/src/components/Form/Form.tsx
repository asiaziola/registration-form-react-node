import { ReactElement } from 'react';

interface FormProps {
  onSubmit: () => void;
  children: React.ReactNode;
}

const Form = ({ onSubmit, children }: FormProps): ReactElement => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export default Form;
