import React, { useState } from 'react';

const OpusCodeTemplate = () => {
  const [activePage, setActivePage] = useState('home');

  // Funkce pro simulaci navigace
  const navLinks = [
    { name: 'Domů', id: 'home' },
    { name: 'Služby & Ceník', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Kontakt', id: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 🟢 NAVBAR */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => setActivePage('home')}>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                OpusCode.dev
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => setActivePage(link.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activePage === link.id 
                        ? 'text-indigo-400 bg-slate-900' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button v navigaci */}
            <div className="hidden md:block">
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                Poptávka
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 🟢 HERO SECTION */}
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            Chci peníze protože <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Fentanyl
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-400 mx-auto">
            Holding group: Atom
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors">
              Chci web
            </button>
            <button className="border border-slate-700 text-slate-300 px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
              Zobrazit portfolio
            </button>
          </div>
        </div>
      </main>

      {/* 🟢 PRICING / BUNDLES SECTION */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Vyberte si svůj Opus</h2>
          <p className="text-slate-400">Tři úrovně výkonu. Žádné skryté poplatky.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Card 1: Opus Static */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all">
            <h3 className="text-xl font-semibold text-white">Opus Basic</h3>
            <p className="text-slate-400 text-sm mt-2">Ideální pro blogy a portfolia.</p>
            <div className="my-6">
              <span className="text-4xl font-bold text-white">5 500</span>
              <span className="text-slate-500 ml-2">Kč</span>
            </div>
            <ul className="space-y-4 mb-8 text-sm text-slate-300">
              <li className="flex items-center gap-2">HTML5 & CSS3</li>
              <li className="flex items-center gap-2">rychlé načítání</li>
              <li className="flex items-center gap-2">Základní SEO</li>
            </ul>
            <button className="w-full py-3 rounded-lg font-semibold bg-slate-800 text-white hover:bg-slate-700 transition-colors">
              Zvolit Basic
            </button>
          </div>

          {/* Card 2: Draga Dynamic (HIGHLIGHTED) */}
          <div className="bg-gradient-to-b from-indigo-900/50 to-slate-900 border-2 border-indigo-500 rounded-2xl p-8 transform md:-translate-y-4 shadow-2xl shadow-indigo-900/20 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                Nejlepší volba
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">Web Draga Dynamic</h3>
            <p className="text-indigo-200 text-sm mt-2">Moderní zážitek plný interakcí.</p>
            <div className="my-6">
              <span className="text-5xl font-bold text-white">6 500</span>
              <span className="text-slate-400 ml-2">Kč</span>
            </div>
            <ul className="space-y-4 mb-8 text-sm text-slate-200">
              <li className="flex items-center gap-2"> <span className="font-semibold text-white">React.js</span> komponenty</li>
              <li className="flex items-center gap-2"> Plná responzivita (Mobile-first)</li>
              <li className="flex items-center gap-2"> Plynulé animace a UI/UX</li>
              <li className="flex items-center gap-2"> Kontaktní formuláře</li>
            </ul>
            <button className="w-full py-3 rounded-lg font-bold bg-indigo-500 text-white hover:bg-indigo-400 transition-colors shadow-lg">
              Zvolit Dynamic
            </button>
          </div>

          {/* Card 3: Nexum Engine */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all">
            <h3 className="text-xl font-semibold text-white">Nexum Fetch Pro</h3>
            <p className="text-slate-400 text-sm mt-2">Mozek pro váš byznys.</p>
            <div className="my-6">
              <span className="text-4xl font-bold text-white">10 000+</span>
              <span className="text-slate-500 ml-2">Kč</span>
            </div>
            <ul className="space-y-4 mb-8 text-sm text-slate-300">
              <li className="flex items-center gap-2">FastAPI Backend</li>
              <li className="flex items-center gap-2">Napojení na databázi</li>
              <li className="flex items-center gap-2">Automatizace a e-maily</li>
            </ul>
            <button className="w-full py-3 rounded-lg font-semibold bg-slate-800 text-white hover:bg-slate-700 transition-colors">
              Zvolit Pro
            </button>
          </div>

        </div>
      </section>

      {/* 🟢 FOOTER */}
      <footer className="border-t border-slate-800 mt-20 py-10 text-center text-slate-500 text-sm">
        <p>© 2026 OpusCode.dev</p>
      </footer>
    </div>
  );
};

export default OpusCodeTemplate;