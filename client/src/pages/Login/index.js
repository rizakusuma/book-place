import React from 'react';
import {useHistory} from "react-router-dom";
import {WrapperLogin, WrapperForm} from './style';
import Card from '../../components/Card/index';
import Input from '../../components/Input';
import Button from '../../components/Button';
import useForm from "./model/useForm";


const Login = ()=>{
    const history = useHistory();
    const { loading, error, setError, handleLogin } = useForm();
    function onChange({ target: { name } }) {
      setError((prevError) => ({
        ...prevError,
        [name]: "",
      }));
    }
    return(
        <WrapperLogin>
            <Card>
                <WrapperForm>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <h5>Username</h5>
                        <Input
                        placeholder="Input username"
                        name="username"
                        type="text"
                        withError={error.username}
                        onChange={onChange}
                        ></Input>
                        <h5>Password</h5>
                        <Input
                        placeholder="Input password"
                        name="password"
                        type="password"
                        withError={error.password}
                        onChange={onChange}
                        ></Input>
                      
                        <Button
                            loading={loading}
                            width="100%"
                            height="45px"
                            textColor="#FFFFFF"
                            type="submit"
                        >
                            Login
                            
                        </Button>
                        <div className="register" onClick={()=>history.push("/register")}>Register Now</div>
                    </form>
                </WrapperForm>

              
            </Card>

        </WrapperLogin>
    )
}
export default Login;