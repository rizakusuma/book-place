

import styled from "styled-components";

export const WrapperHome = styled.div`
    padding: 6rem 8rem 1rem 8rem;
    display:flex;
    flex-direction:column;

    .wrapper-search{
        width:100%;
        margin-bottom:1rem;
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:flex-end;
        button{
            margin-left:1rem;
        }
    }
    @media screen and (max-width:768px){
        padding:6rem 2rem;
    }

   
`