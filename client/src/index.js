import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserAuth from './user_auth';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider value={{
    user: new UserAuth(),
  }}>
    <App />
  </Context.Provider>
);
