import React from "react";
import { func, string, number, oneOfType } from "prop-types";

const Input = ({
  labelTestId,
  inputId,
  inputTestId,
  onChangeHandler,
  pattern,
  title,
  labelText,
  inputValue,
  type,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={inputId} className="app__label" data-testid={labelTestId}>
        {labelText}
      </label>
      <br />
      <input
        type={type || "text"}
        onChange={onChangeHandler}
        value={inputValue}
        id={inputId}
        className="app__input"
        required
        pattern={pattern}
        title={title}
        data-testid={inputTestId}
        {...props}
      />
    </div>
  );
};

Input.propTypes = {
  labelTestId: string.isRequired,
  inputId: string.isRequired,
  inputTestId: string.isRequired,
  onChangeHandler: func.isRequired,
  pattern: string.isRequired,
  title: string.isRequired,
  labelText: string.isRequired,
  inputValue: oneOfType([string.isRequired, number.isRequired]),
  type: string,
};

export default Input;
