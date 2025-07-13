import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FcGoogle } from 'react-icons/fc'; // Ikon Google

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loginAction, error, isLoading, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      await loginAction(email, password);
      navigate('/publications');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle(); // Anda harus buat fungsi ini di useAuth
      navigate('/publications');
    } catch (err) {
      console.error('Google Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-400 via-teal-400 to-slate-600 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <img
            src="https://s.stis.ac.id/logoBPS"
            alt="BPS Logo"
            className="h-20 w-20 mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-800">Selamat Datang</h2>
          <p className="text-sm text-gray-500">Silakan login untuk mengakses data publikasi</p>
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm text-center mb-4">
            <FontAwesomeIcon icon={faEyeSlash} className="mr-2" />
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Alamat Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              placeholder="Kata Sandi"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? 'Sembunyikan sandi' : 'Lihat sandi'}
              disabled={isLoading}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition duration-300 disabled:bg-emerald-300"
          >
            {isLoading ? 'Memuat...' : 'Masuk'}
          </button>
        </form>

        <div className="my-4 text-center text-sm text-gray-500">atau</div>

        {/* Tombol Login Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 transition duration-200 disabled:opacity-50"
        >
          <FcGoogle className="mr-3 text-xl" />
          <span className="text-gray-700 font-medium">Masuk dengan Google</span>
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Belum punya akun?{' '}
            <Link
              to="/register"
              className="text-emerald-600 hover:underline font-medium"
            >
              Daftar
            </Link>
          </p>
          <p className="mt-1">
            <Link
              to="/forgot-password"
              className="text-emerald-600 hover:underline font-medium"
            >
              Lupa Kata Sandi?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
