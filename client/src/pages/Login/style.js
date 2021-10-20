import styled from 'styled-components';
import {primaryBlue} from '../../theme';


export const WrapperLogin = styled.div`
    background-color:#FFFFFF;
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;

    .register{
        text-align:center;
        &:hover{
            cursor:pointer;
            color:${primaryBlue};
        }
    }

`

export const WrapperForm = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    height:100%;
    form{
        width:80%;
    }
    button{
        margin-top:2rem;
        margin-bottom:1rem;
    }

`
