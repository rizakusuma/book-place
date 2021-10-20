import styled from "styled-components";

export const Base = styled.button`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
  border: ${({ backgroundColor }) => `1px solid ${backgroundColor}`};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  white-space: nowrap;
  padding: 6px 16px;
  font-weight: bold;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg:nth-child(1),
  > div:nth-child(1) {
    margin-right: 1em;
  }
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: default;
    background-color: lightgrey;
    color: white;
    border: none;

    > svg > path {
      fill: white;
    }
  }
`;
