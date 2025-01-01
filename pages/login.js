// /pages/auth/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import API from '@/axios/api';
import { setAuthorizationToken } from '@/axios/instance';
import { toast } from 'react-toastify';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    API.login({email, password})
    .then(({data})=>{
        console.log(data)
        toast.success('Logged in successfull');
        localStorage.setItem("user", JSON.stringify(data))
        setAuthorizationToken(data.token)
        router?.push("/home")
    })
    .catch((err)=>{
        console.log(err)
        toast.error('Email or password are wrong');
    })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Didn't Registered Yet?{' '}
            <a href="/register" className="text-indigo-600 hover:text-indigo-700">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
}
