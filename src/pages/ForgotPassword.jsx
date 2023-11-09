import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');



  const onChange = (e) => {
    setEmail(e.target.value)
  }


  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold '>FORGOT PASSWORD</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-11 max-w-6xl'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://img.freepik.com/premium-vector/forgot-password-concept-isolated-white_263070-194.jpg?w=740" alt='key' className='w-full rounded-2xl ' />
        </div>
        <div className=' w-full md:w-[67%] lg:w-[40%] lg:mt-20 mx-7'>
          <form >
            <input className='mb-6 w-full px-4  py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' type="email" id='email' value={email} onChange={onChange} placeholder='Email Address' />


            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Don't have an account?
                <Link to="/sign-up" className='text-red-500 hover:text-red-700 transition  duration-200 ease-in-out ml-1'>Register</Link>

              </p>
              <p>
                <Link className='text-blue-500 hover:text-blue-800 transition  duration-200 ease-in-out' to="/sign-in">Sign In Instead</Link>
              </p>
            </div>
            <button type='submit' className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>Send reset password</button>

            <div className='my-4 items-center  before:border-t flex before:flex-1 before:border-gray-300 after:border-t  after:flex-1 after:border-gray-300 '>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword