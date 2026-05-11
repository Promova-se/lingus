import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000/api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        userType: userType,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      alert('✅ Cadastro realizado com sucesso!');

      if (userType === 'school') {
        navigate('/school/dashboard');
      } else {
        navigate('/teacher/dashboard');
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 'Erro ao cadastrar. Tente novamente.'
      );
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-8 sm:py-12 px-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Cadastro LINGUS</h2>

        {!userType ? (
          <div className="space-y-4">
            <p className="text-gray-700 text-center mb-6">
              Você é uma escola ou professor?
            </p>
            <button
              onClick={() => setUserType('school')}
              className="w-full py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition"
            >
              🏫 Sou Escola
            </button>
            <button
              onClick={() => setUserType('teacher')}
              className="w-full py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition"
            >
              👨‍🏫 Sou Professor
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setUserType('')}
              className="mb-4 text-teal-600 hover:text-teal-700 font-semibold"
            >
              ← Voltar
            </button>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {userType === 'school'
                    ? 'Nome da Escola'
                    : 'Nome Completo'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Já tem conta?{' '}
                <Link
                  to="/login"
                  className="text-teal-600 font-semibold hover:text-teal-700"
                >
                  Entre aqui
                </Link>
              </p>
            </div>
     