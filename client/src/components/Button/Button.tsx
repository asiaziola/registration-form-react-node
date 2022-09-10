import { ReactElement } from 'react';
import './Button.css';
interface ButtonProps {
  children: React.ReactNode;
  size: 'regular';
  color: 'blue';
}

const Button = ({ children, size, color }: ButtonProps): ReactElement => {
  return (
    <div className="button-container">
      <button type="submit" className={`form-button ${size} ${color}`}>
        {children}
      </button>
    </div>
  );
};

export default Button;
