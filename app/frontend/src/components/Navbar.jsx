import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-teal-600 flex-shrink-0">
            LINGUS
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-teal-600 transition font-medium">
              Home
            </Link>
            <a href="#" className="text-gray-700 hover:text-teal-600 transition font-medium">
              Para Escolas
            </a>
            <a href="#" className="text-gray-700 hover:text-teal-600 transition font-medium">
              Para Professores
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          {!user && (
            <div className="hidden md:flex space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-teal-600 hover:text-teal-700 font-medium transition"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition"
              >
                Cadastro
              </Link>
            </div>
          )}

          {/* Desktop User Menu */}
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition"
              >
                Sair
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-teal-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
            >
              Home
            </Link>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
              Para Escolas
            </a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
              Para Professores
            </a>

            {!user ? (
              <>
                <hr className="my-2" />
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-teal-600 hover:bg-gray-100 rounded font-medium transition"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 font-medium transition text-center"
                >
                  Cadastro
                </Link>
              </>
            ) : (
              <>
                <hr className="my-2" />
                <div className="px-4 py-2 text-sm text-gray-600">
                  {user.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium transition"
                >
                  Sair
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
