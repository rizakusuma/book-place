

import styled from "styled-components";

export const WrapperCart = styled.div`
    padding: 6rem 8rem 1rem 8rem;
    display:flex;
    flex-direction:column;
    position:relative;
    @media screen and (max-width:768px){
        padding:6rem 2rem;
    }

`

export const WrapperTitle = styled.div`

    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;

`

export const WrapperCheckout = styled.div`
    display:flex;
    width:95%;
    height:100px;
    position:fixed;
    z-index:100;
    background-color:white;
    bottom:0;
    left:0;
    box-shadow: -1px -7px 14px -3px rgba(118,112,112,0.89);
    -webkit-box-shadow: -1px -7px 14px -3px rgba(118,112,112,0.89);
    -moz-box-shadow: -1px -7px 14px -3px rgba(118,112,112,0.89);
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 4rem;
    span{
        font-size:1rem;
        font-weight:bold;
    }



`