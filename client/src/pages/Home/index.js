import React,{useEffect, useState} from 'react';
import { WrapperHome } from './style';
import BooksCard from '../../components/BooksCard/index';
import API from "../../utils/apiConfig";
import {API_GET_BOOKS} from "../../utils/api";
import { Shimmer } from 'react-shimmer';
import Input from "../../components/Input/index";
import Button from "../../components/Button/index";

const Home = ()=>{
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const getBooks = async()=>{
        try{
            const { data:{data} } = await API.get(`${API_GET_BOOKS}?q=${search}`);
            setBooks(data);
            setLoading(false)
      

        }
        catch(e){
            console.log(e);
        }
       
    }


    const handleChange = (e)=>{
        const {value} = e.target;
        setSearch(value);

    }

    const handleSearch = ()=>{
        getBooks();
    }

    useEffect(()=>{
        getBooks(); /* eslint-disable */ 
    },[])




    return(
        <WrapperHome>
            <h1>Mental Health's Books</h1>

            <div className="wrapper-search" >
                <Input  value={search} onChange={handleChange} />
                <Button width="100px" onClick={handleSearch}>
                    Search
                </Button>
            </div>
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
                <>
                    
                    {
                        books.map((el,idx)=>{
                            return(
                                <BooksCard key={idx} showAction={true} {...el}/>
                                


                            

                            )
                        })
                    }
                </>
            }
             
            
           
        </WrapperHome>
    )

}
export default Home;