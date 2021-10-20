import React, { createContext, useEffect, useReducer, useContext } from "react";

// constant name
export const AUTH = "my-auth-data";

const ContextAuth = createContext();

const initialStateAuth = {
  username: getLocalStorageValue(AUTH)?.username ?? "",
  token: getLocalStorageValue(AUTH)?.token ?? "",
  coin:getLocalStorageValue(AUTH)?.coin ?? 0,
};

//get data from local storage
export function getLocalStorageValue(name) {
  const getData = localStorage.getItem(name);
  if (getData) {
    return JSON.parse(getData);
    
  } else return null;
}

//set data to localstorage
export function setLocalStorageValue(key, value) {
  let stringifyVal = JSON.stringify(value);
  localStorage.setItem(key, stringifyVal);
}

export function removeRelatedWithAuth() {
    localStorage.removeItem(AUTH);
}

function reducer(state, { key, ...payload }) {
  switch (key) {
    case "SET_AUTH_DATA":
      setLocalStorageValue(AUTH, payload.data)
      return {
        ...state,
        ...payload.data,
      };
    

    default:
      return state;
  }
}

export function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialStateAuth);
  useEffect(() => {
    const dataUser = getLocalStorageValue(AUTH)
    if (dataUser) {
      dispatch({ key: "SET_AUTH_DATA", data: { ...dataUser } });

    } else {
      setLocalStorageValue(AUTH, initialStateAuth);
    }
  }, []);

  
  return (
    <ContextAuth.Provider value={{ state, dispatch }}>
      {children}
    </ContextAuth.Provider>
  );
}

export function useStoreAuth() {
  const context = useContext(ContextAuth);
  return context;
}
