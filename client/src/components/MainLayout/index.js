import React from 'react';
import {WrapperMainLayout} from './style';
import {removeRelatedWithAuth} from "../../utils/useAuth";
import Navbar from "../Navbar/index";

const MainLayout = ({children,...props})=>{
    function handleLogout(){
        removeRelatedWithAuth();
        window.location.reload();
    }
    return(
        <WrapperMainLayout>    
            <Navbar handleLogout = {handleLogout}/>
            {children}
        </WrapperMainLayout>
    )
}

export default MainLayout;