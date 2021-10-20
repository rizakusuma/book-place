import styled, { css } from "styled-components";
import { lightGrey, secondaryBlue, textScales } from "../../theme";

const paddingContent = `6px 15px`;

export const Wrapper = styled.div`
  border-radius: 4px;
  background-color: #fff;
  position: relative;
  width:${(props) => props.width};
  padding: ${paddingContent};
  cursor: pointer;
  span{
    margin-right:12px;
  }
  img {
    position: absolute;
    top: 45%;
    right: 2%;
    width:12px;
  }

  /* just using theme */
  
  border: solid 1px ${lightGrey};
  font-size: ${textScales[300]};
  

  /* handle active props */
  ${({ active }) =>
    active &&
    css`
      box-shadow: 0px 0px 5px 0px ${secondaryBlue};
      border: solid 1px ${lightGrey};
    `}

  /* handle loading props */
  ${({ isLoading }) =>
    isLoading &&
    css`
      background-color: ${secondaryBlue};
      cursor: wait;
      color: black;
    `}
`;

export const PlaceholderText = styled.div`
  opacity: 0.5;
  span {
    margin-right: 12px;
  }
`;

export const Input = styled.input`
  /* padding: 0 0.938em; */
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  overflow: hidden;
  background: transparent;

  color: black;
  font-size: ${textScales[300]};

  ::placeholder {
    color: ${lightGrey};
    opacity: 1;
  }

  :disabled {
    cursor: not-allowed;
    background-color: red;
  }
`;

export const Options = styled.ul`
  overflow-y: auto;
  list-style: none;
  padding: 0;
  background-color: #fff;
  width: 100.1%;
  position: absolute;
  margin: 8px -16px;
  max-height: 0;
  transition: all 0.2s ease-in-out;
  z-index: 10;

  /* handle active props */
  ${({ active, height }) =>
    active &&
    css`
      box-shadow: 0px 0px 5px 0px ${secondaryBlue};
      border: solid 1px ${secondaryBlue};
      max-height: ${height}px;
    `}
`;

Options.Data = styled.li`
  padding: ${paddingContent};

  /* just using theme */

  &:hover {
    background-color: ${secondaryBlue};

    > :nth-of-type(1) {
      color: #fff;
    }
  }
`;
