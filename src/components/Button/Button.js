import React, { PropTypes } from 'react';

const Button = ({ children, onClick }) => (
    <button onClick={onClick} className="button">{children}</button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Button;
