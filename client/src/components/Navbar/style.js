import styled from "styled-components";

export const NavbarStyle = styled.div`
  font-family: "Avenir Light";
  font-weight: 800;

  .header-base {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #FFFFFF;
    color: white;

    padding: 1.125rem 5rem;

    position: fixed;
    overflow-x: hidden;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 1000;

    @media only screen and (max-width:1150px){
      flex-direction:column;
      padding: 1.125rem 1.5rem;
      ${({open})=>open && `
      animation: open 0.3s linear ;
      animation-fill-mode: forwards;
      a,span{
        margin-bottom:1rem;
      }
      
      @keyframes open{
        0%{
          height:60px;
  
        }
        100%{
          height:250px;
        }
      }`}
     

    }
  }

  .header-logo {
    display: flex;
    flex-direction: row;
    align-items: center; 
    @media only screen and (max-width:1150px){
      justify-content:space-between;
    }
  }

  .header-items-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    @media only screen and (max-width:1150px){
      flex-direction:column;
      justify-content:flex-start;
      align-items:start;
      display: ${({open})=> open ? 'flex' : 'none'};
     
    }
  }

  .header-item {
    padding: 0rem 2.125rem;
    color:#000000
  }

  .header-item:hover {
    color:  #F2994A;
    cursor: pointer;
  }

 

`
export const WrapperHamburger = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 36px;
  height: 36px;
  transition: all 0.5s ease-in-out;

  ${(props) =>
    props.open &&
    `
    & > :nth-child(1){
      transform: translateX(-45px);
      background: transparent;
    }
    & > :nth-child(1):before {
      transform: rotate(45deg) translate(30px, -30px);
    }
    & > :nth-child(1):after {
      transform: rotate(-45deg) translate(30px, 30px);
    }
    }
  `}
  @media only screen and (max-width:1150px){
    display:flex;
  }
`;

export const HamburgerIcon = styled.div`
  width: 30px;
  height: 4px;
  background: #000000;
  transition: all 0.5s ease-in-out;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 30px;
    height: 4px;
    background: #000000;
    transition: all 0.5s ease-in-out;
  }

  &:before {
    transform: translateY(-8px);
  }

  &:after {
    transform: translateY(8px);
  }
`;
