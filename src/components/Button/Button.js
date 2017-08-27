import React, { PropTypes } from 'react';

const Button = ({ children, onClick }) => (
    <button onClick={onClick} className="button">{children}</button>
);

const propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
};

Button.propTypes = propTypes;

export default Button;
