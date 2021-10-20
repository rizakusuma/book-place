import React,{useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import { WrapperCart , WrapperCheckout} from './style';
import BooksCard from '../../components/BooksCard/index';
import API from "../../utils/apiConfig";
import {API_CART, API_CHECKOUT} from "../../utils/api";
import Button from '../../components/Button';
import { useAlert } from 'react-alert';
import { useStoreAuth} from "../../utils/useAuth";
import { Shimmer } from 'react-shimmer';

const Cart = ()=>{
    const alert = useAlert();
    const history = useHistory();
    const { state,dispatch } = useStoreAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    const getBooks = async()=>{
        try{
            const { data:{data} } = await API.get(API_CART);
            let tempTotal = 0;
            data.forEach((el)=>{
                tempTotal = tempTotal + el.price;
                
            })
            setTotal(tempTotal);
            setBooks(data);
            setLoading(false)

        }
        catch(e){
            console.log(e);
        }
       
    }

    const handleRemove = async(e,id)=>{
        e.stopPropagation();
        try{     
            console.log(id);
           const {data:{code}}= await API.delete(`${API_CART}/${id}`);
            if (code === 200){
                alert.success(`Item has been deleted`);    
                getBooks();
            }
          
         
        }
        catch(e){
            console.log(e)
        }

    }
    const generateParams = ()=>{

        let params = {
            listBook : books.map((el)=>{
                return {
                    "id_book":el.id_book,
                    "price":el.price,
                }
            })
        }
        return params;
    }
    const handleCheckout = async()=>{
        try{
            const params = generateParams();
            const {data:{code, data}} = await API.post(API_CHECKOUT,params );
            if(code===401){
                alert.error("Coin is not enough")

            }
            else{
                alert.success("Success");
                const dataUser = { username:state.username, token: state.token, coin:data.coin };
                dispatch({ key: "SET_AUTH_DATA", data:dataUser});
                history.push("/library")

            }   

        }
        catch(e){
            console.log(e);

        }


    }

    useEffect(()=>{
        getBooks();

    },[])



    return(
        <WrapperCart>
          
            <h1>My Cart</h1>

            {
               
                loading ? 
                <>
                    <div style={{width:"100%", marginBottom:"1rem"}}>
                        <Shimmer width={"100%"} height={200} />
                    </div>
                    <div style={{width:"100%", marginBottom:"1rem"}}>
                        <Shimmer width={"100%"} height={200} />
                    </div>
                    <div style={{width:"100%", marginBottom:"1rem"}}>
                        <Shimmer width={"100%"} height={200} />
                    </div>
                    <div style={{width:"100%", marginBottom:"1rem"}}>
                        <Shimmer width={"100%"} height={200} />
                    </div>
        
                    
                </>
                :
                <div style={{paddingBottom:"100px"}}>
                    {
                        books.map((el,idx)=>{
                            return(
                                <BooksCard key={idx} showAction={false} showRemove={true} handleRemoveCart={handleRemove} {...el}/>
                            )
                        })
                    }
                </div>

            }
           
            {
                books.length>0 &&
                <WrapperCheckout>
                <span>Total: {total} Coin</span>
                <Button
                    style={{marginRight:"4rem"}}
                    width="100px"
                    textColor="white"
                    onClick={(e)=>handleCheckout(e, books)}
                >
                    Checkout
                </Button>
            </WrapperCheckout>

            }
           

           
        </WrapperCart>
    )

}
export default Cart;