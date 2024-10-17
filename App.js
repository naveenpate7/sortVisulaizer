import React, { useState } from 'react'
import { createContext } from 'react'
import NavBar from './NavBar/NavBar';
export const store = createContext();
const App = () => {
  const [data,setData]=useState([]);
  return (
    <div>
      <store.Provider value={[data,setData]}>
        <NavBar/>
      </store.Provider>
    </div>
  )
}

export default App