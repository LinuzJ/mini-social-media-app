import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

if (localStorage.getItem("jwtToken")) {
  const tokenDecoded = jwtDecode(localStorage.getItem("jwtToken"));
  console.log(new Date(tokenDecoded.exp * 1000), new Date(Date.now()));
  if (tokenDecoded.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = tokenDecoded;
  }
}
const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
});

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
      };
    case "logout":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = (data) => {
    console.log(data);
    localStorage.setItem("jwtToken", data.authToken);
    dispatch({
      type: "login",
      payload: data,
    });
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "logout",
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
      }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
