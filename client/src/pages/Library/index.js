import React,{useEffect, useState} from 'react';
import { WrapperLibrary} from './style';
import BooksCard from '../../components/BooksCard/index';
import API from "../../utils/apiConfig";
import {API_LIBRARY} from "../../utils/api";
import { Shimmer } from 'react-shimmer';


const Library= ()=>{
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const getBooks = async()=>{
        try{
            const { data:{data} } = await API.get(API_LIBRARY);
           
            setBooks(data);
            setLoading(false)

        }
        catch(e){
            console.log(e);
        }
       
    }
 
    useEffect(()=>{
        getBooks();

    },[])

    return(
        <WrapperLibrary>
          
            <h1>My Library</h1>
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
                              <BooksCard key={idx} showPrice={false} showAction={false} {...el}/>
                          )
                      })
                  }
                </div>
            }
          

           
        </WrapperLibrary>
    )

}
export default Library;