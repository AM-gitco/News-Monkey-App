import React from 'react'
import Walk from './Walk.gif'
import spinner from './spinner.gif'
import Spinner2 from './Spinner-2.gif'
import Spinner5 from './Spinner-5.gif'


const Spinner = () => {
    return (
      <div className='text-center mb-3'>
        <img src={spinner} alt="spinner" />
        <img src={Walk} alt="spinner" />
        <img src={Spinner2} alt="spinner" />
        <img src={Spinner5} alt="spinner" />
      </div>
    )

}
export default Spinner