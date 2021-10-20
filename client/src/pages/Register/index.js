import React from 'react';
import {WrapperRegister, WrapperForm} from './style';
import Card from '../../components/Card/index';
import Input from '../../components/Input';
import Button from '../../components/Button';
import useForm from "./model/useForm";


const Register = ()=>{
    const { loading, error, setError, handleRegister } = useForm();
    function onChange({ target: { name } }) {
      setError((prevError) => ({
        ...prevError,
        [name]: "",
      }));
    }
    return(
        <WrapperRegister>
            <Card>
                <WrapperForm>
                    <h1>Register</h1>
                    <form onSubmit={handleRegister}>
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
                            Sign Up
                        </Button>
                       
                    </form>
                </WrapperForm>

              
            </Card>

        </WrapperRegister>
    )
}
export default Register;