import React from 'react';
import {useHistory} from "react-router-dom";
import {WrapperBooksCard, WrapperImage, WrapperContent, WrapperAction} from './style';
import Button from '../Button';
import API from "../../utils/apiConfig";
import {API_CART} from "../../utils/api";
import {useStoreAuth} from '../../utils/useAuth';

import { useAlert } from 'react-alert'

const BooksCard = ({showPrice = true,showRemove =false, handleRemoveCart, showAction,...props})=>{
    const alert = useAlert();
    const {state} = useStoreAuth();
    const history = useHistory();
    const authIsLoaded = state.token && state.username;


    const openPreview = (link)=>{
        window.open(link);
    }

  
    const handleAddToCart = async(e, id)=>{
        e.stopPropagation();
        try{
            if(authIsLoaded){
                await API.post(API_CART,{
                    id_book: id,
                 
                  });
               
                alert.success(`Success`);
    
            }
            else{
                history.push("/login")
            }
           
        }
        catch(e){
            console.log(e)
        }


    }
    return(
        <WrapperBooksCard {...props} onClick={()=>openPreview(props.preview)}>
            <WrapperImage >
                <img src={props.thumbnail} alt="booksCover"/>
            </WrapperImage>
            <WrapperContent>
                <h3>{props.title}</h3>
                <h6>Authors: {props.authors}</h6>
                <h6>{props.description}</h6>
                {showPrice &&
                  <h5>{props.price} Coin</h5>
                }

                <WrapperAction>
                    {showAction &&  
                        <Button
                            width="100px"
                            textColor="white"
                            onClick={(e)=>handleAddToCart(e, props.id_book)}
                        >
                            Add to Cart
                        </Button>
                    }
                    {
                        showRemove &&
                        <Button
                            width="100px"
                            textColor="white"
                            backgroundColor="red"
                            onClick={(e)=>handleRemoveCart(e, props.id_book)}
                        >
                            Remove
                        </Button>


                    }
                </WrapperAction>
              
               
            </WrapperContent>
           
           
           
    
        </WrapperBooksCard>

        
    )
}
export default BooksCard;