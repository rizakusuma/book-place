import { useState } from "react";
import {useHistory} from "react-router-dom";
import API from "../../../utils/apiConfig";
import {API_REGISTER} from "../../../utils/api";


function useForm() {
  const history = useHistory();
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  function handleSuccess(datas) {
    history.push("/login")

  }

  function handleCatch({
   message,
   code
  }) {
    if (code >= 500) throw new Error("Something went wrong to our server");
    else if (message) {
      setError((prevError) => ({
        ...prevError,
        username: " ",
        password: message,
      }));
    }
  }

  function checkValue({ username, password }) {
    let check = true;
    if (!username) {
      check = false;
      setError((prevError) => ({
        ...prevError,
        username: "Harap masukkan username anda.",
      }));
    }
    if (!password) {
      check = false;
      setError((prevError) => ({
        ...prevError,
        password: "Harap masukkan kata sandi anda.",
      }));
    }
    return check;
  }
  // function dummyChecker({username, password}){
  //     if(username==="admin" && password==="admin"){
  //         const data = {
  //           token:'token',
  //           username:'admin',
  //         }
  //         return data
  //     }
  //     else{
  //       setError((prevError) => ({
  //           ...prevError,
  //           password: "username atau password salah",
  //         }));
        
  //       throw new Error("wrong password");
  //     }
  // }

  async function handleRegister(e) {
    e.preventDefault();
    const { username, password } = e.target.elements;
    if (checkValue({ username: username.value, password: password.value })) {
      setLoading(true);

      try {

        const { data } = await API.post(API_REGISTER, {
          username: username.value,
          password: password.value,
        });
        // const data = dummyChecker({ username: username.value, password: password.value })
        setLoading(false);
        if(data.code===401){
          handleCatch(data);
        }
        else{
          handleSuccess(data);
        }
       
      } catch (e) {
        // handleCatch(e);
        setLoading(false);
      }
    }
  }

  return { loading, error, setError, handleRegister };
}

export default useForm;
