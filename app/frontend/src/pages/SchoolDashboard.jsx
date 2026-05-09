import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SchoolDashboard() {
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'overview'
                ? 'border-b-2 border-teal-600 text-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'requests'
                ? 'border-b-2 border-teal-600 text-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Meus Pedidos
          </button>
          <button
            onClick={() => setActiveTab('candidates')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'candidates'
                ? 'border-b-2 border-teal-600 text-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Candidatos
          </button>
          <button
            onClick={() => setActiveTab('contracts')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'contracts'
                ? 'border-b-2 border-teal-600 text-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Contratos Ativos
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
                    <p className="text-gray-600 text-sm">Pedidos Ativos</p>
                    <p className="text-3xl font-bold text-teal-600">3</p>
                  </div>
                  <div className="text-4xl">📋</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Candidatos</p>
                    <p className="text-3xl font-bold text-blue-600">18</p>
                  </div>
                  <div className="text-4xl">👥</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Professores Contratados</p>
                    <p className="text-3xl font-bold text-green-600">2</p>
                  </div>
                  <div className="text-4xl">✅</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Gasto Total (R$)</p>
                    <p className="text-3xl font-bold text-purple-600">4.200</p>
                  </div>
                  <div className="text-4xl">💰</div>
                </div>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Ações Rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border-2 border-teal-200 rounded-lg hover:bg-teal-50 transition font-semibold text-teal-600">
                  ➕ Criar Novo Pedido
                </button>
                <button className="p-4 border-2 border-teal-200 rounded-lg hover:bg-teal-50 transition font-semibold text-teal-600">
                  👁️ Ver Candidatos
                </button>
                <button className="p-4 border-2 border-teal-200 rounded-lg hover:bg-teal-50 transition font-semibold text-teal-600">
                  💬 Mensagens
                </button>
              </div>
            </div>

            {/* Pedidos Recentes */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Pedidos Recentes</h3>
              <div className="space-y-3">
                {[
                  { id: 1, subject: 'Inglês', grade: '7º ano', candidates: 5, status: 'open' },
                  { id: 2, subject: 'Português', grade: '8º ano', candidates: 3, status: 'open' },
                  { id: 3, subject: 'Matemática', grade: '6º ano', candidates: 8, status: 'closed' }
                ].map(req => (
                  <div key={req.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-semibold">{req.subject} - {req.grade}</p>
                      <p className="text-sm text-gray-600">{req.candidates} candidatos</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${
                      req.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {req.status === 'open' ? '🟢 Aberto' : '🔒 Fechado'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Meus Pedidos</h2>
              <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold">
                ➕ Novo Pedido
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: 1,
                  subject: 'Inglês',
                  grade: '7º ano',
                  hours: 10,
                  rate: 85,
                  candidates: 5,
                  status: 'open'
                },
                {
                  id: 2,
                  subject: 'Português',
                  grade: '8º ano',
                  hours: 8,
                  rate: 90,
                  candidates: 3,
                  status: 'open'
                },
                {
                  id: 3,
                  subject: 'Matemática',
                  grade: '6º ano',
                  hours: 12,
                  rate: 75,
                  candidates: 8,
                  status: 'closed'
                }
              ].map(req => (
                <div key={req.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{req.subject}</h3>
                      <p className="text-gray-600">{req.grade}</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${
                      req.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {req.status === 'open' ? '🟢 Aberto' : '🔒 Fechado'}
                    </span>
                  </div>
                  <div className="mb-4 p-3 bg-gray-50 rounded">
                    <p className="text-sm"><span className="font-semibold">Horas/semana:</span> {req.hours}h</p>
                    <p className="text-sm"><span className="font-semibold">Taxa:</span> R$ {req.rate}/h</p>
                    <p className="text-sm"><span className="font-semibold">Candidatos:</span> {req.candidates}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold">
                      Ver Candidatos
                    </button>
                    <button className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm font-semibold">
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Candidates Tab */}
        {activeTab === 'candidates' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Candidatos por Pedido</h2>

            {['Inglês - 7º ano', 'Português - 8º ano'].map(pedido => (
              <div key={pedido} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="bg-teal-600 text-white p-4 font-bold">{pedido}</div>
                <div className="space-y-2 p-4">
                  {[
                    { name: 'Prof. Maria Silva', match: 92, rating: 5, reviews: 2 },
                    { name: 'Prof. João Santos', match: 85, rating: 4.8, reviews: 5 },
                    { name: 'Prof. Ana Costa', match: 78, rating: 4.5, reviews: 1 }
                  ].map((candidate, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <p className="font-semibold">{candidate.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>⭐ {candidate.rating} ({candidate.reviews} reviews)</span>
                          <span>|</span>
                          <span className="text-green-600 font-semibold">{candidate.match}% match</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-semibold">
                          ✓ Aceitar
                        </button>
                        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm font-semibold">
                          ✕ Rejeitar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contracts Tab */}
        {activeTab === 'contracts' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Contratos Ativos</h2>

            {[
              {
                id: 1,
                teacher: 'Prof. Maria Silva',
                subject: 'Inglês',
                grade: '7º ano',
                rate: 85,
                hours: 10,
                startDate: '01/06/2026',
                status: 'active'
              },
              {
                id: 2,
                teacher: 'Prof. João Santos',
                subject: 'Português',
                grade: '8º ano',
                rate: 90,
                hours: 8,
                startDate: '05/06/2026',
                status: 'active'
              }
            ].map(contract => (
              <div key={contract.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{contract.teacher}</h3>
                    <p className="text-gray-600">{contract.subject} - {contract.grade}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded font-semibold text-sm">
                    ✅ Ativo
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded">
                  <div>
                    <p className="text-sm text-gray-600">Taxa</p>
                    <p className="font-bold">R$ {contract.rate}/h</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Horas/semana</p>
                    <p className="font-bold">{contract.hours}h</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Data Início</p>
                    <p className="font-bold">{contract.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Custo/mês</p>
                    <p className="font-bold">R$ {(contract.rate * contract.hours * 4.33).toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                    💬 Mensagem
                  </button>
                  <button className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold">
                    📊 Relatório
                  </button>
                  <button className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold">
                    ❌ Encerrar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
