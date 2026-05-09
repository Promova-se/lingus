import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">LINGUS</h3>
            <p className="text-gray-400 text-sm">
              Conectando escolas aos melhores educadores do mundo.
            </p>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4">Para Escolas</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Como funciona</a></li>
              <li><a href="#" className="hover:text-white transition">Planos</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4">Para Professores</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Comece agora</a></li>
              <li><a href="#" className="hover:text-white transition">Oportunidades</a></li>
              <li><a href="#" className="hover:text-white transition">Suporte</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Sobre</a></li>
              <li><a href="#" className="hover:text-white transition">Contato</a></li>
              <li><a href="#" className="hover:text-white transition">Privacidade</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-xs sm:text-sm">
          <p>&copy; 2026 LINGUS. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
