import styled, { css } from "styled-components";
import { secondaryBlue, lightGrey, textScales } from "../../theme";
export const Wrapper = styled.div`
  border-radius: 4px;
  background-color: #fff;
  width: ${({ width }) => width};
  height: 36px;
  position: relative;
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
 

    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  img{
      width:18px;
      height:18px;
      position: absolute;
      top: 20%;
      right: 10px;
      cursor: pointer;
  }



    border: solid 1px ${lightGrey};

    svg path:nth-of-type(1) {
        border: solid 1px ${secondaryBlue};

        svg path:nth-of-type(2) {
        fill: ${secondaryBlue};
        }

        :focus-within {
        box-shadow: 0px 0px 5px 0px ${secondaryBlue};
        border: solid 1px ${secondaryBlue};
        }
        fill: ${secondaryBlue};
    }

    :focus-within {
        box-shadow: 0px 0px 5px 0px ${secondaryBlue};
        border: solid 1px ${secondaryBlue};
    }


  /* handle props iconPosition */
  ${({ iconPosition }) =>
    iconPosition === "left" &&
    css`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      img {
        margin-left: 9px;
        margin-right: -5px;
        poisition: unset;
        left: 0;
      }
    `}

  /* handle props hasError */
  ${({ hasError }) =>
    hasError &&
    css`
      border: solid 1px red;

      :focus-within {
        box-shadow: 0px 0px 5px 0px red;
        border: solid 1px red;
      }
    `}
`;

export const Base = styled.input`
  padding: ${({ iconPosition }) => (iconPosition === "left" ? "0 0 0 2.5em" : "0 0.938em")};
  width: 80%;
  height: 100%;
  outline: none;
  border: none;
  overflow: hidden;
  background: transparent;

  color: "#000000";
  font-size: ${textScales[300]};

  ::placeholder {
    color: ${lightGrey};
    opacity: 1;
    font-size: ${textScales[300]};
  }

  :disabled {
    cursor: not-allowed;
    background-color: ${lightGrey};
    opacity: 0.5;
  }
`;
export const Container = styled.div`
  height: auto;
  word-wrap: break-word;
`;
