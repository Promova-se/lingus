import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-600 to-teal-700 text-white py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              LINGUS
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 leading-relaxed">
              Contratação inteligente de professores freelancer
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-teal-100 mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
              Conectando escolas aos melhores educadores do mundo
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2">
              <Link
                to="/register"
                className="px-6 sm:px-8 py-3 bg-white text-teal-600 font-bold rounded-lg hover:bg-gray-100 transition"
              >
                Sou Escola
              </Link>
              <Link
                to="/register"
                className="px-6 sm:px-8 py-3 bg-teal-800 text-white font-bold rounded-lg hover:bg-teal-900 border border-white transition"
              >
                Sou Professor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12">
            Por que LINGUS?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: '⚡',
                title: 'Plataforma 100% Digital',
                description: 'Mobile-first e acessível de qualquer lugar'
              },
              {
                icon: '🤖',
                title: 'Matching com IA',
                description: 'Recomendações inteligentes de compatibilidade'
              },
              {
                icon: '💰',
                title: 'Sem Intermediários',
                description: 'Menor custo, melhor preço para todos'
              },
              {
                icon: '⭐',
                title: 'Sistema Transparente',
                description: 'Reviews e ratings confiáveis'
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-teal-50 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Pronto para começar?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de escolas e professores usando LINGUS
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition"
          >
            Criar Conta Gratuitamente
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { value: '12 mil', label: 'Escolas' },
              { value: '500 mil', label: 'Professores' },
              { value: 'R$ 3.5B', label: 'Mercado' },
              { value: '100%', label: 'Digital' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-600 mb-2">
                  {stat.value}
                </p>
                <p className="text-sm sm:text-base text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
