import styled from 'styled-components';

export const WrapperBooksCard = styled.div`
    height:auto;
    background-color:white;
    position:relative;
    border:1px solid white;
    border-radius:2rem;
    padding:1rem;
    box-shadow: -5px 1px 23px 0px rgba(118,112,112,0.89);
    -webkit-box-shadow: -5px 1px 23px 0px rgba(118,112,112,0.89);
    -moz-box-shadow: -5px 1px 23px 0px rgba(118,112,112,0.89);
    display:flex;
    flex-direction:row;
    margin-bottom:2rem;
    h1,h2,h3,h4,h5,h6,p{
        margin-top:0;
        margin-bottom:0.75rem;
    }

    @media only screen and (max-width:576px){
        flex-direction:column;
    }

`

export const WrapperImage = styled.div`
    width:auto;
    margin-bottom:0;
    @media only screen and (max-width:576px){
        display:flex;
        justify-content:center;
        margin-bottom:1rem;
    }
`
export const WrapperContent = styled.div`
    margin-left:1rem;
    width:100%;
    display:flex;
    flex-direction:column;
    @media only screen and (max-width:576px){
       margin-left:0;
    }
`

export const WrapperAction = styled.div`
    display:flex;
    justify-content:flex-end;
`
