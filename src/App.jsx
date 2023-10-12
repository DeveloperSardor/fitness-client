import React, {useEffect} from 'react'
import Router from './router'
import { useNavigate } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'

const App = () => {
  const navigate = useNavigate()


  return (
    <div>
      <Router/>
    <Toaster/>
    </div>
  )
}
 
export default App
