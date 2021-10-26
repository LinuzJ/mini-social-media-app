import React, { createContext, useReducer } from "react";

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
  const [state, dispatch] = useReducer(AuthReducer, { user: null });

  const login = (data) => {
    console.log("logged in ", data);
    dispatch({
      type: "login",
      payload: data,
    });
  };
  const logout = () => {
    console.log("logged out");
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

export default { AuthContext, AuthProvider };
