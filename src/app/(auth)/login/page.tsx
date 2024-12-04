'use client'

import { ACCOUNT } from '@/lib/utils';
import { useRouter} from 'next/navigation'; 
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState('');
  const router = useRouter();

  const {USERNAME, PASSWORD} = ACCOUNT;


  useEffect(() => {
    const middlewareLogin = () => {
     const x =  localStorage.getItem('isLogin')
        if(x) {
          router.push('/admin')
        } 
        return;
    }
    middlewareLogin();
  })

  const handleLogin = () => {
    if(email === USERNAME && password === PASSWORD) {
      localStorage.setItem('isLogin', 'true');
      router.push('/admin');
    } else {
      setError('Username atau password salah!')
      console.log(error)
    }
  }

  const handleKeyDown = (e:any) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  }


  return (
    <div className="w-full h-screen flex items-center justify-center bg-custom-gradient">
      <div className="w-[300px] h-auto lg:w-1/4  bg-slate-100 rounded-md p-4 flex flex-col gap-2 items-center">
        <h1 className="font-semibold text-2xl w-full text-center pb-2 border-b-2 border-slate-200">Login Page</h1>
        {error && <div className="bg-red-100 text-red-700 p-2 mb-1 rounded">{error}</div>}

        <div>
          <div className="mb-4 mt-1">
            <label
              className="blovk text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              className="my-2 block w-full p-2 border border-gray-300 rounded-md "
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 mt-1">
            <label
              htmlFor=""
              className="blovk text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              className="my-2 block w-full p-2 border border-gray-300 rounded-md "
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              required
            />
          </div>
          <button
          type='submit'
          onClick={handleLogin}
            className="w-full bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-6s00 transition duration-200 mt-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
