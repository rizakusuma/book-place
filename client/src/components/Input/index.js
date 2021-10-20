import React, { useState } from "react";
import PropTypes from "prop-types";
import { Base, Wrapper, Container } from "./style";
import VisibilityOn from "../../assets/icon/eye.svg";
import VisibilityOff from "../../assets/icon/eye-no.svg";

function usePassword(originalType) {
  const isPasswordType = originalType === "password";
  const [showPass, setShowPass] = useState(false);
  const toggleShowPass = () => setShowPass((val) => !val);
  const type = showPass ? "text" : "password";

  return {
    type: isPasswordType ? type : originalType,
    toggleShowPass,
    isPasswordType,
    showPass,
  };
}

function Input({ withIcon, width = "100%", iconPosition = "right", withError, ...props }) {
  const { type, toggleShowPass, showPass, isPasswordType } = usePassword(props.type);

  return (
    <Container>
      <Wrapper width={width} hasError={!!withError} iconPosition={iconPosition}>
        <Base iconPosition={iconPosition} hasError={!!withError} {...props} type={type} />
        {withIcon && <img src={withIcon} alt="icon" />}
        {isPasswordType && !showPass && (
          <img src={VisibilityOn} alt="eye" onClick={toggleShowPass} />
        )}
        {isPasswordType && showPass && (
          <img src={VisibilityOff} alt="eye-no" onClick={toggleShowPass} />
        )}
        <br />
      </Wrapper>
      {withError && (
        <h5 style={{color:'red'}}>
          {withError}
        </h5>
      )}
    </Container>
  );
}

Input.propTypes = {
  withIcon: PropTypes.string,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  withError: PropTypes.string,
  width: PropTypes.string,
};

export default Input;
