import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="right">
        
        <li><NavLink to='/signin' className=" grey-text text-darken-2 ">Войти</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks