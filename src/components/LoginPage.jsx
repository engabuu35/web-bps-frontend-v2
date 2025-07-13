import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loginAction, loginWithGoogle, error, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      await loginAction(email, password);
      navigate('/publications');
    } catch (err) {
      console.error('Login gagal:', err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/publications');
    } catch (err) {
      console.error('Google login gagal:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaeaea] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <img
            src="https://s.stis.ac.id/logoBPS"
            alt="BPS Logo"
            className="h-20 w-20 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">Selamat Datang!</h2>
          <p className="mt-1 text-sm text-gray-600">
            Masuk untuk mengakses portal publikasi
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Alamat Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Kata Sandi"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-gray-500"
              disabled={isLoading}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold disabled:bg-indigo-300"
            disabled={isLoading}
          >
            {isLoading ? 'Memuat...' : 'Masuk'}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600 text-sm">atau</div>

        <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full py-3 flex items-center justify-center border border-gray-300 bg-white rounded-lg hover:bg-gray-100 transition-all"
          disabled={isLoading}
        >
          <FcGoogle className="mr-2 text-xl" />
          Masuk dengan Google
        </button>
      </div>
    </div>
  );
}
