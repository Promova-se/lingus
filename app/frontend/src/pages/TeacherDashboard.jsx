import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Obter dados do usuário do localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return <div>Carregando...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex justify-between items-center flex-col sm:flex-row gap-4 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600">Bem-vindo, {user.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full sm:w-auto"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-6 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 sm:px-4 py-2 font-semibold text-xs sm:text-base whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-b-2 border-teal-600 text-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-3 sm:px-4 py-2 font-semibold text-xs sm:text-base whitespace-nowrap ${
              activeTab === 'opportunities'
                ? 'border-b-2 border-teal-600 text-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Oportunidades
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3 sm:px-4 py-2 font-semibold text-xs sm:text-base whitespace-nowrap ${
              activeTab === 'applications'
                ? 'border-b-2 border-teal-600 text-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Candidaturas
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 sm:px-4 py-2 font-semibold text-xs sm:text-base whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-b-2 border-teal-600 text-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Perfil
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Oportunidades</p>
                    <p className="text-3xl font-bold text-teal-600">12</p>
                  </div>
                  <div className="text-4xl">💼</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Candidaturas</p>
                    <p className="text-3xl font-bold text-blue-600">3</p>
                  </div>
                  <div className="text-4xl">📝</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Contratos Ativos</p>
                    <p className="text-3xl font-bold text-green-600">1</p>
                  </div>
                  <div className="text-4xl">✅</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Ganhos (R$)</p>
                    <p className="text-3xl font-bold text-purple-600">1.240</p>
                  </div>
                  <div className="text-4xl">💰</div>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Sua Reputação</h3>
              <div className="flex items-center gap-4">
                <div className="text-5xl">⭐⭐⭐⭐⭐</div>
                <div>
                  <p className="text-2xl font-bold">5.0</p>
                  <p className="text-gray-600">2 reviews</p>
                </div>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Ações Rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border-2 border-teal-200 rounded-lg hover:bg-teal-50 transition font-semibold text-teal-600">
                  📋 Ver Oportunidades
                </button>
                <button className="p-4 border-2 border-teal-200 rounded-lg hover:bg-teal-50 transition font-semibold text-teal-600">
                  ✏️ Editar Perfil
                </button>
                <button className="p-4 border-2 border-teal-200 rounded-lg hover:bg-teal-50 transition font-semibold text-teal-600">
                  💬 Mensagens
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Oportunidades Disponíveis</h2>

            {/* Filtros */}
            <div className="bg-white p-4 rounded-lg shadow flex gap-4 flex-wrap">
              <input
                type="text"
                placeholder="Buscar por matéria..."
                className="px-4 py-2 border border-gray-300 rounded-lg flex-1"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>Todas as Séries</option>
                <option>1º ano</option>
                <option>7º ano</option>
                <option>3º ano</option>
              </select>
              <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                🔍 Filtrar
              </button>
            </div>

            {/* Oportunidades Lista */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: 1,
                  school: 'E.E. São Paulo',
                  subject: 'Inglês',
                  grade: '7º ano',
                  hours: 10,
                  rate: 85,
                  match: 92
                },
                {
                  id: 2,
                  school: 'Colégio Particular A',
                  subject: 'Português',
                  grade: '8º ano',
                  hours: 8,
                  rate: 90,
                  match: 85
                },
                {
                  id: 3,
                  school: 'E.M. Central',
                  subject: 'Matemática',
                  grade: '6º ano',
                  hours: 12,
                  rate: 75,
                  match: 78
                },
                {
                  id: 4,
                  school: 'Instituto XYZ',
                  subject: 'Inglês',
                  grade: '1º ano EM',
                  hours: 15,
                  rate: 95,
                  match: 88
                }
              ].map(opp => (
                <div key={opp.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{opp.school}</h3>
                      <p className="text-gray-600">{opp.subject} - {opp.grade}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-teal-600">R$ {opp.rate}/h</p>
                      <p className="text-sm text-gray-500">{opp.hours}h/semana</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold bg-green-100 text-green-700 px-3 py-1 rounded">
                        {opp.match}% match
                      </span>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold">
                    Se Candidatar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Minhas Candidaturas</h2>

            <div className="space-y-3">
              {[
                {
                  id: 1,
                  school: 'E.E. São Paulo',
                  subject: 'Inglês',
                  status: 'pending',
                  date: '5 dias atrás'
                },
                {
                  id: 2,
                  school: 'Colégio Particular B',
                  subject: 'Português',
                  status: 'accepted',
                  date: '2 dias atrás'
                },
                {
                  id: 3,
                  school: 'E.M. Central',
                  subject: 'Matemática',
                  status: 'rejected',
                  date: '1 dia atrás'
                }
              ].map(app => (
                <div key={app.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{app.school}</h3>
                      <p className="text-gray-600">{app.subject}</p>
                      <p className="text-sm text-gray-500">{app.date}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-lg font-semibold ${
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {app.status === 'pending' ? '⏳ Pendente' :
                       app.status === 'accepted' ? '✅ Aceito' :
                       '❌ Rejeitado'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white p-8 rounded-lg shadow max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Meu Perfil</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nome</label>
                <input
                  type="text"
                  value={user.name}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Bio</label>
                <textarea
                  placeholder="Conte um pouco sobre você..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Disciplinas</label>
                <div className="flex flex-wrap gap-2">
                  {['Inglês', 'Português', 'Matemática', 'História'].map(subject => (
                    <span key={subject} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                      {subject} ×
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Adicionar disciplina..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-3"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Taxa Horária (R$)</label>
                <input
                  type="number"
                  placeholder="85"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <button className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold">
                💾 Salvar Alterações
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
