import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError } from '../utils';

export default function ForgetPasswordScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/forget-password', {
        email,
      });
      toast.success(data.message);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <h1 className="my-3">Forget Password</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3" controlId="email">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <button
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
}
