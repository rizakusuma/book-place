import React from 'react';
import {WrapperCard} from './style';

const Card = ({children})=>{
    return(
        <WrapperCard>
            {children}
        </WrapperCard>
    )
}
export default Card;