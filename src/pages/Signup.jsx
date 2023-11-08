import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { db } from '../firebase'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    // console.log(e.target.value)
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  async function onSubmit(e) {
    e.preventDefault();

    try {

      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      updateProfile(auth.currentUser,{
        displayName: name
        
      })

      const user = userCredential.user;
      // console.log(user)
      const formDataCopy={...formData}
      delete formDataCopy.password
      formDataCopy.timestamp=serverTimestamp();
      await setDoc(doc(db, "users", user.uid),formDataCopy);
      
      toast.success("Sign up successfull")
      navigate("/");

    } catch (error) {
      toast.error("Something went wrong with the registration")
      //console.log(error)
    }



  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold '>SIGN UP</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-11 max-w-6xl'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://static.vecteezy.com/system/resources/previews/016/140/880/original/register-now-icon-in-comic-style-registration-cartoon-illustration-on-isolated-background-member-notification-splash-effect-sign-business-concept-vector.jpg" alt='key' className='w-full rounded-2xl ' />
        </div>
        <div className=' w-full md:w-[67%] lg:w-[40%] lg:mt-20 mx-7'>
          <form onSubmit={onSubmit}>
            <input className='mb-6 w-full px-4  py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' type="text" id='name' value={name} onChange={onChange} placeholder='Full Name' />

            <input className='mb-6 w-full px-4  py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' type="email" id='email' value={email} onChange={onChange} placeholder='Email Address' />

            <div className="relative mb-6">
              <input className='w-full px-4  py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' type={showPassword ? "text" : "password"} id='password' value={password} onChange={onChange} placeholder='Enter Password' />

              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Have an account?
                <Link to="/sign-in" className='text-red-500 hover:text-red-700 transition  duration-200 ease-in-out ml-1'>Sign In</Link>

              </p>
              <p>
                <Link className='text-blue-500 hover:text-blue-800 transition  duration-200 ease-in-out' to="/forgot-password"> Forgot Password?</Link>
              </p>
            </div>
            <button type='submit' className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>Sign Up</button>

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

export default Signup

//3:58:20