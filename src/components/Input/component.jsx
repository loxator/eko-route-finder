import React from "react";
import { func, string } from "prop-types";

const Input = ({
  labelTestId,
  inputId,
  inputTestId,
  onChangeHandler,
  pattern,
  title,
  labelText,
  inputValue,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={inputId} className="app__label" data-testid={labelTestId}>
        {labelText}
      </label>
      <br />
      <input
        type="text"
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
  inputValue: string.isRequired,
};

export default Input;
