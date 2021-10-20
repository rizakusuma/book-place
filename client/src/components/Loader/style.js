import styled from "styled-components";
import { primaryYellow, lightGrey } from "../../theme";
export const Base = styled.div`
  border: 4px solid ${lightGrey};
  border-radius: 50%;
  border-top: 4px solid ${primaryYellow};
  width: 16px;
  height: 16px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export const Container = styled.div`
  justify-content: center;
  display: flex;
`;
