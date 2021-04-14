import React from 'react';
import Type from 'prop-types';
import classNames from 'classnames';

const Button = ({onClick, className, outline, children }) => {
    return (
        <button
        onClick={onClick}
            className={classNames('button', className, {
                'button--outline': outline,
            })}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: Type.func,
};

export default Button;
  