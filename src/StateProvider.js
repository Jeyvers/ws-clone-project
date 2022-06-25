import { collection } from 'firebase/firestore';
import React, { createContext, useContext, useReducer } from 'react';
import { db } from './firebase';
import reducer from './reducer';

// Have your markup with children props
// Create your context
// Create your initial state
// Create your state, dispatch with useReducer, pass in your reducer and initialState
// return your <context.provider value={{}}>pass in your children </context.provider>
// create your globalcontext hook, return your state context in useContext
// export your appcontext and provider

const StateContext = createContext();
const initialState = { user: null };

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const roomsCol = collection(db, 'groups');

  return (
    <StateContext.Provider value={{ ...state, dispatch, roomsCol }}>
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(StateContext);
};

export { StateContext, StateProvider };
