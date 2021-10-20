import styled from 'styled-components';
import {secondaryBlue, primaryBlue} from '../../theme';

export const WrapperMainLayout = styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    flex-direction:row;
   
`

export const WrapperSidebar = styled.div`
    width:80px;
    height:100%;
    background-color:${secondaryBlue};

  
    ${({isOpen})=>
        isOpen ? `
        animation:open-sidebar 0.5s forwards;
    `
    :
    `
        // animation:close-sidebar 0.5s forwards;
    `
         
    }

    .container {
        display: inline-block;
        cursor: pointer;
        margin-left:1.5rem;
        margin-top:1rem;
      }
      
      .bar1, .bar2, .bar3 {
        width: 35px;
        height: 5px;
        background-color: white;
        margin: 6px 0;
        transition: 0.4s;
      }
      ${({isOpen})=>{
        return(
            isOpen &&`
            .bar1 {
                -webkit-transform: rotate(-45deg) translate(-9px, 6px);
                transform: rotate(-45deg) translate(-9px, 6px);
              }
            .bar2 {opacity: 0;}
            .bar3 {
                -webkit-transform: rotate(45deg) translate(-8px, -8px);
                transform: rotate(45deg) translate(-8px, -8px);
              }
            `
        )    
      }}

    
      @keyframes open-sidebar {
        from {
          width: 80px;
        }
        to {
          width: 300px;
        }
      }
      @keyframes close-sidebar {
        from {
          width: 300px;
        }
        to {
          width: 80px;
        }
      }
     
`

export const WrapperMenu = styled.div`
    display:flex;
    flex-direction:column;
    margin-top:1rem;
`
export const Menu = styled.div`
      display:flex;
      flex-direction:row;
      align-items:center;
      height:100px;
      width:100%;
      justify-content:${({isOpen})=> isOpen ? "start" :"center"};
      &:hover{
          cursor:pointer;
          background-color:${primaryBlue};
      }
      ${({isActive})=>isActive && `background-color:${primaryBlue};`}

      ${({isOpen})=>{
          return(
              isOpen && `
              h4{
                  padding-left:1rem;
                  color:white;
              }
              img{
                  padding-left:1rem;
              }
              
              `
          )
      }}

`

export const WrapperLogout = styled.div`
    

`