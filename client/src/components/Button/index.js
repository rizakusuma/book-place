import React from "react";
import PropTypes from "prop-types";
import { Base } from "./style";
import { lightOrange } from "../../theme";
import Loader from "../Loader/index";

function Button({
  children,
  width = "100%",
  height = "45px",
  backgroundColor = lightOrange,
  textColor = "#000000",
  onClick = () => null,
  loading,
  disabled,
  ...props
}) {
  return (
    <Base
      backgroundColor={backgroundColor}
      textColor={textColor}
      width={width}
      height={height}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader />
          Loading...
        </>
      ) : (
        children
      )}
    </Base>
  );
}

Button.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Button;
