import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ArrowRight, 
  Plus,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Hammer,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

// Tylko sprawdzone, działające zdjęcia. Będziemy je zapętlać, aby nigdy nie było pustych miejsc.
const validImages = [
  "https://github.com/kidiee558/LUKASZ-FIRMABUDOWLANA/blob/main/1c624d67-b178-49be-bf22-209228a9e82d.jpg?raw=true",
  "https://github.com/kidiee558/LUKASZ-FIRMABUDOWLANA/blob/main/1ecf091f-f721-4830-9565-53661ecd9600.jpg?raw=true",
  "https://github.com/kidiee558/LUKASZ-FIRMABUDOWLANA/blob/main/6ae868d8-c989-4602-a0e8-848881961c0f.jpg?raw=true",
  "https://github.com/kidiee558/LUKASZ-FIRMABUDOWLANA/blob/main/6aed7e8e-fd9f-4434-a5aa-049a54545407.jpg?raw=true",
  "https://github.com/kidiee558/LUKASZ-FIRMABUDOWLANA/blob/main/8c001b4a-f1e2-4bf1-a850-d118684efc56.jpg?raw=true",
  "https://github.com/kidiee558/LUKASZ-FIRMABUDOWLANA/blob/main/911ef76d-af0c-4c47-8fee-15ee340dda37.jpg?raw=true"
];

// Funkcja gwarantująca, że zawsze zwrócimy poprawne zdjęcie, zapętlając tablicę
const getImage = (index: number) => validImages[index % validImages.length];

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeService, setActiveService] = useState<number>(1);

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineScroll } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer dla sekcji Kompetencje (Sticky Menu)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.split('-')[1];
            if (id) setActiveService(Number(id));
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    document.querySelectorAll('.service-section').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-[100dvh] bg-bg-base text-text-main font-sans selection:bg-accent selection:text-bg-base relative">
      
      {/* Fixed Static Gradient Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#111111] via-[#1a1510] to-[#2a2216] pointer-events-none"></div>

      {/* Global Textures & Lighting */}
      <div className="bg-noise"></div>
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-50"></div>

      {/* Dynamic Light Leaks / Sunlight */}
      <div className="fixed top-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/15 via-accent/5 to-transparent blur-[130px] pointer-events-none z-0 rounded-full mix-blend-screen"></div>
      <div className="fixed top-[40%] left-[-20%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-white/0 to-transparent blur-[120px] pointer-events-none z-0 rounded-full mix-blend-screen"></div>
      <div className="fixed bottom-[-20%] right-[10%] w-[70vw] h-[70vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent blur-[150px] pointer-events-none z-0 rounded-full mix-blend-screen"></div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-bg-base/90 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 flex items-center justify-center border ${isScrolled ? 'border-text-main' : 'border-white'}`}>
              <span className="font-display font-bold text-lg">Ł</span>
            </div>
          </div>
          
          <div className="hidden md:flex gap-10 text-xs font-medium tracking-[0.15em] uppercase text-text-muted">
            <a href="#o-firmie" className="hover:text-accent transition-colors">O firmie</a>
            <a href="#kompetencje" className="hover:text-accent transition-colors">Kompetencje</a>
            <a href="#proces" className="hover:text-accent transition-colors">Proces</a>
            <a href="#standardy" className="hover:text-accent transition-colors">Standardy</a>
            <a href="#realizacje" className="hover:text-accent transition-colors">Portfolio</a>
          </div>

          <a href="#kontakt" className="hidden md:inline-flex items-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 bg-accent text-bg-base hover:bg-text-main hover:text-bg-base">
            Wycena <ArrowRight className="w-4 h-4" />
          </a>

          <button 
            className="md:hidden text-text-main"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg-base/95 backdrop-blur-xl pt-24 px-6 md:hidden border-b border-border overflow-y-auto"
          >
            <div className="flex flex-col gap-6 text-xl font-display tracking-wide">
              <a href="#o-firmie" onClick={() => setMobileMenuOpen(false)} className="border-b border-border pb-4">O firmie</a>
              <a href="#kompetencje" onClick={() => setMobileMenuOpen(false)} className="border-b border-border pb-4">Kompetencje</a>
              <a href="#proces" onClick={() => setMobileMenuOpen(false)} className="border-b border-border pb-4">Proces</a>
              <a href="#standardy" onClick={() => setMobileMenuOpen(false)} className="border-b border-border pb-4">Standardy</a>
              <a href="#realizacje" onClick={() => setMobileMenuOpen(false)} className="border-b border-border pb-4">Portfolio</a>
              <a href="#kontakt" onClick={() => setMobileMenuOpen(false)} className="text-accent mt-4 pb-12">Darmowa Wycena</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[100dvh] min-h-[700px] flex items-center overflow-hidden bg-bg-base">
        <div 
          className="absolute inset-0 bg-parallax"
          style={{ backgroundImage: `url(${getImage(0)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-base via-bg-base/60 to-transparent" />
        <div className="absolute inset-0 bg-bg-base/20" />
        
        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full mt-4 md:mt-20">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-6 md:mb-8"
            >
              <div className="w-8 sm:w-12 h-[1px] bg-accent"></div>
              <p className="text-accent font-medium tracking-[0.1em] sm:tracking-[0.2em] uppercase text-[10px] sm:text-xs whitespace-nowrap">
                Nidzica • Olsztynek • Olsztyn
              </p>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display text-text-main mb-4 md:mb-8 leading-[1.05]"
            >
              Zaawansowane <br/> <span className="italic font-light text-accent">prace budowlane</span> i <br className="block md:hidden" /> wykończenia.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg text-text-muted max-w-xl mb-8 md:mb-12 font-light leading-relaxed"
            >
              Generalne wykonawstwo inwestycji prywatnych. Od ciężkich prac wyburzeniowych i instalacyjnych, po rzemieślniczą precyzję detalu wykończeniowego.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <a href="#kompetencje" className="px-8 py-4 bg-text-main text-bg-base hover:bg-accent transition-colors font-medium tracking-[0.15em] uppercase text-xs text-center">
                Zakres Kompetencji
              </a>
              <a href="#realizacje" className="px-8 py-4 bg-accent text-bg-base hover:bg-text-main hover:text-bg-base transition-colors font-medium tracking-[0.15em] uppercase text-xs text-center">
                Zobacz Portfolio
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Background Wrapper for Content */}
      <div className="relative z-10">
        {/* About / Philosophy */}
        <section id="o-firmie" className="py-16 md:py-24 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none"></div>
        <div className="watermark-text text-[10rem] md:text-[15rem] top-0 left-[-5%] opacity-10">INŻYNIERIA</div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-accent"></div>
                <h2 className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold">O firmie</h2>
                <div className="w-12 h-[2px] bg-accent"></div>
              </div>
              <h3 className="text-4xl md:text-5xl font-display text-text-main leading-tight mb-8">
                Inżynieria precyzji <br/><span className="italic text-accent">w każdym detalu.</span>
              </h3>
              <div className="space-y-6 text-text-muted text-base leading-relaxed font-light relative">
                <div className="absolute -top-4 -left-4 text-border font-mono text-xs">+</div>
                <p>
                  Jesteśmy firmą remontowo-budowlaną z wieloletnim stażem. Nie jesteśmy tylko "ekipą od wykończeń". Przeprowadzamy kompleksowe metamorfozy obiektów – od wyburzeń, przez zaawansowane przeróbki instalacji hydraulicznych i elektrycznych, aż po finalny montaż elementów dekoracyjnych.
                </p>
                <p>
                  Nasza metodyka opiera się na rygorystycznym przestrzeganiu sztuki budowlanej, wykorzystaniu chemii najwyższej klasy oraz dbałości o detale, które definiują ostateczny odbiór przestrzeni. Współpracujemy z architektami, dostarczając bezkompromisową jakość wykonania.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/5 pt-12">
                <div>
                  <p className="text-4xl font-display text-text-main mb-2">10<span className="text-accent">+</span></p>
                  <p className="text-xs uppercase tracking-[0.15em] text-text-muted font-medium">Lat doświadczenia</p>
                </div>
                <div>
                  <p className="text-4xl font-display text-text-main mb-2">150<span className="text-accent">+</span></p>
                  <p className="text-xs uppercase tracking-[0.15em] text-text-muted font-medium">Zrealizowanych inwestycji</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              <div className="grid grid-cols-2 gap-2 md:gap-6 items-start">
                <div className="space-y-2 md:space-y-6 mt-6 md:mt-12">
                  <div className="p-[1px] md:p-2 bg-bg-surface border border-white/10 shadow-2xl">
                    <img 
                      src={getImage(1)} 
                      alt="Detal wykończenia" 
                      className="w-full h-auto block grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-[1px] md:p-2 bg-bg-surface border border-white/10 shadow-2xl">
                    <img 
                      src={getImage(2)} 
                      alt="Precyzja" 
                      className="w-full h-auto block grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="space-y-2 md:space-y-6">
                  <div className="p-[1px] md:p-2 bg-bg-surface border border-white/10 shadow-2xl relative">
                    <div className="absolute -right-2 -top-2 md:-right-3 md:-top-3 w-4 h-4 md:w-6 md:h-6 border-t border-r border-accent"></div>
                    <img 
                      src={getImage(3)} 
                      alt="Nowoczesne wnętrze" 
                      className="w-full h-auto block grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-[1px] md:p-2 bg-bg-surface border border-white/10 shadow-2xl">
                    <img 
                      src={getImage(4)} 
                      alt="Realizacja" 
                      className="w-full h-auto block grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services / Competencies - Premium Sticky Scroll Layout */}
      <section id="kompetencje" className="py-16 md:py-24 border-y border-white/5 relative z-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="watermark-text text-[12rem] top-[20%] right-[-10%] opacity-20 vertical-text">KOMPETENCJE</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Premium Glassmorphism Sticky Sidebar */}
            <div className="lg:col-span-4 relative">
              <div className="lg:sticky lg:top-32 bg-bg-surface/40 backdrop-blur-2xl p-8 md:p-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[2px] bg-accent"></div>
                  <h2 className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold">Zakres Kompetencji</h2>
                </div>
                <h3 className="text-3xl md:text-4xl font-display text-text-main mb-6">
                  Specjalizacje wykonawcze
                </h3>
                <p className="text-text-muted font-light text-sm leading-relaxed mb-10">
                  Od ciężkich prac wyburzeniowych i instalacyjnych, po rzemieślniczą precyzję detalu. Realizujemy pełen zakres prac remontowo-budowlanych, gwarantując ciągłość technologiczną na każdym etapie.
                </p>
                
                {/* Dynamic Active State Menu with Tracking Line */}
                <div className="flex relative pl-6">
                  {/* Background Line */}
                  <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-white/10"></div>
                  
                  {/* Animated Active Line */}
                  <motion.div 
                    className="absolute left-0 w-[2px] bg-accent"
                    initial={false}
                    animate={{ 
                      top: `${(activeService - 1) * 25}%`, 
                      height: '25%' 
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />

                  <div className="flex flex-col w-full">
                    {[
                      { id: 1, title: "01. Kompleksowe Remonty" },
                      { id: 2, title: "02. Pokoje Kąpielowe" },
                      { id: 3, title: "03. Gładzie i Zabudowy G-K" },
                      { id: 4, title: "04. Prace Instalacyjne" }
                    ].map((item) => (
                      <a 
                        key={item.id}
                        href={`#service-${item.id}`} 
                        className={`py-4 md:py-5 pl-4 md:pl-6 text-sm font-medium transition-all duration-300 w-full ${
                          activeService === item.id 
                            ? 'text-accent bg-gradient-to-r from-accent/10 to-transparent' 
                            : 'text-text-muted hover:text-text-main hover:bg-white/[0.02]'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.getElementById(`service-${item.id}`);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Scrolling Content */}
            <div className="lg:col-span-8 space-y-40">
              
              {/* Service 1 */}
              <div id="service-1" className="service-section scroll-mt-32 relative">
                <div className="absolute -left-8 top-0 text-border font-mono text-xs hidden md:block">+</div>
                <div className="p-2 bg-bg-surface border border-white/5 mb-8 shadow-2xl">
                  <img src={getImage(0)} alt="Generalne remonty" className="w-full h-auto block grayscale-[15%] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-accent font-mono tracking-widest text-lg">01.</span>
                  <h4 className="text-3xl font-display text-text-main">Generalne Remonty i Wykończenia</h4>
                </div>
                <p className="text-text-muted font-light leading-relaxed mb-8">
                  Przeprowadzamy kompleksowe metamorfozy mieszkań, domów i lokali usługowych. Od stanu deweloperskiego lub z rynku wtórnego, aż po gotowe do zamieszkania wnętrza "pod klucz".
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    'Prace wyburzeniowe i demontaże',
                    'Murowanie ścian działowych',
                    'Wylewki i równanie posadzek',
                    'Układanie podłóg (panele, deska, winyl)',
                    'Montaż drzwi i ościeżnic ukrytych',
                    'Kompleksowe sprzątanie poremontowe'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-text-muted border-b border-white/5 pb-2">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service 2 */}
              <div id="service-2" className="service-section scroll-mt-32 relative">
                <div className="p-2 bg-bg-surface border border-white/5 mb-8 shadow-2xl">
                  <img src={getImage(1)} alt="Łazienki" className="w-full h-auto block grayscale-[15%] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-accent font-mono tracking-widest text-lg">02.</span>
                  <h4 className="text-3xl font-display text-text-main">Ekskluzywne Pokoje Kąpielowe</h4>
                </div>
                <p className="text-text-muted font-light leading-relaxed mb-8">
                  Łazienka to najbardziej wymagające technologicznie pomieszczenie. Wykonujemy je z bezwzględnym zachowaniem reżimu technologicznego, gwarantując szczelność i perfekcyjną estetykę.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    'Układanie spieków kwarcowych',
                    'Cięcie płytek pod kątem 45 stopni (jolly)',
                    'Zaawansowana hydroizolacja podpłytkowa',
                    'Montaż odpływów liniowych i ściennych',
                    'Zabudowy stelaży podtynkowych (WC, bidet)',
                    'Biały montaż i armatura podtynkowa'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-text-muted border-b border-white/5 pb-2">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service 3 */}
              <div id="service-3" className="service-section scroll-mt-32 relative">
                <div className="p-2 bg-bg-surface border border-white/5 mb-8 shadow-2xl">
                  <img src={getImage(2)} alt="Gładzie i zabudowy" className="w-full h-auto block grayscale-[15%] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-accent font-mono tracking-widest text-lg">03.</span>
                  <h4 className="text-3xl font-display text-text-main">Gładzie, Malowanie i Zabudowy G-K</h4>
                </div>
                <p className="text-text-muted font-light leading-relaxed mb-8">
                  Idealna geometria ścian i sufitów to podstawa nowoczesnego wnętrza. Wykorzystujemy agregaty szpachlarskie i malarskie dla uzyskania nieskazitelnych powierzchni.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    'Gładzie nakładane maszynowo',
                    'Bezpyłowe szlifowanie mechaniczne',
                    'Malowanie natryskowe (hydrodynamiczne)',
                    'Sufity podwieszane wielopoziomowe',
                    'Wnęki oświetleniowe LED i ukryte karnisze',
                    'Tynki dekoracyjne (beton, mikrocement)'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-text-muted border-b border-white/5 pb-2">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service 4 */}
              <div id="service-4" className="service-section scroll-mt-32 relative">
                <div className="p-2 bg-bg-surface border border-white/5 mb-8 shadow-2xl">
                  <img src={getImage(3)} alt="Instalacje" className="w-full h-auto block grayscale-[15%] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-accent font-mono tracking-widest text-lg">04.</span>
                  <h4 className="text-3xl font-display text-text-main">Prace Instalacyjne</h4>
                </div>
                <p className="text-text-muted font-light leading-relaxed mb-8">
                  Bezpieczeństwo i funkcjonalność ukryte w ścianach. Wykonujemy niezbędne modyfikacje instalacji, dostosowując je do nowych projektów architektonicznych.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    'Przeróbki instalacji wodno-kanalizacyjnej',
                    'Modyfikacje instalacji elektrycznej',
                    'Przenoszenie punktów świetlnych i gniazd',
                    'Przygotowanie instalacji pod sprzęt AGD',
                    'Montaż osprzętu elektrycznego',
                    'Współpraca z uprawnionymi instalatorami'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-text-muted border-b border-white/5 pb-2">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

        {/* Process - Lighter beige-tinted background */}
        <section id="proces" className="py-32 relative z-10 bg-gradient-to-b from-transparent via-[#2a241c] to-transparent">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="watermark-text text-[15rem] bottom-[-5%] left-[-5%] opacity-20">PROCES</div>
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col items-center text-center mb-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-accent"></div>
              <h2 className="text-xs tracking-[0.3em] text-accent uppercase">Metodologia</h2>
              <div className="w-8 h-[1px] bg-accent"></div>
            </div>
            <h3 className="text-4xl md:text-5xl font-display text-text-main">Etapy Współpracy</h3>
          </div>

          <div className="relative" ref={timelineRef}>
            {/* Central Line for Desktop, Left Line for Mobile */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2"></div>
            
            {/* Animated Fill Line */}
            <motion.div 
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent to-accent-light -translate-x-1/2 origin-top z-0 shadow-[0_0_15px_rgba(194,163,115,0.6)]"
              style={{ scaleY: timelineScroll }}
            ></motion.div>

            <div className="space-y-12 md:space-y-24">
              {[
                { 
                  num: "01", 
                  title: "Wizja Lokalna i Wycena", 
                  desc: "Spotykamy się na obiekcie. Dokonujemy precyzyjnych pomiarów laserowych, analizujemy stan techniczny i omawiamy projekt. Na tej podstawie przygotowujemy transparentny, bezpłatny kosztorys uwzględniający zakres prac i zapotrzebowanie materiałowe."
                },
                { 
                  num: "02", 
                  title: "Umowa i Harmonogram", 
                  desc: "Zabezpieczamy interesy obu stron. Podpisujemy czytelną umowę określającą zakres robót, gwarancję ceny oraz sztywny harmonogram prac. Ustalamy zasady logistyki i dostaw materiałów budowlanych."
                },
                { 
                  num: "03", 
                  title: "Realizacja i Nadzór", 
                  desc: "Przystępujemy do ciężkich prac. Zabezpieczamy części wspólne (klatki schodowe, windy). Pracujemy zgodnie ze sztuką budowlaną, utrzymując porządek na budowie. Inwestor otrzymuje regularne raporty z postępów prac."
                },
                { 
                  num: "04", 
                  title: "Odbiór i Gwarancja", 
                  desc: "Przeprowadzamy gruntowne sprzątanie poremontowe. Wspólnie z inwestorem lub architektem dokonujemy odbioru technicznego. Przekazujemy gotowy obiekt wraz z pisemną gwarancją na wykonane prace."
                }
              ].map((step, index) => (
                <div key={index} className="relative flex flex-col md:flex-row items-center gap-4 md:gap-16 group">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-transparent backdrop-blur-md border border-accent flex items-center justify-center z-10 group-hover:scale-150 transition-transform duration-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-50 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  <div className={`w-full md:w-1/2 flex pl-16 md:pl-0 ${index % 2 === 0 ? 'md:justify-end text-left md:text-right' : 'md:order-2 text-left'}`}>
                    <div className="max-w-md relative w-full py-2">
                      <div className="relative z-10">
                        {/* Mobile Small Elegant Number */}
                        <div className="md:hidden text-accent text-xs font-bold tracking-[0.2em] mb-3 opacity-80">ETAP {step.num}</div>
                        <h4 className="text-2xl md:text-3xl font-display text-text-main mb-3 md:mb-4 group-hover:text-accent transition-colors duration-300">{step.title}</h4>
                        <p className="text-text-muted font-light leading-relaxed text-sm md:text-base">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`hidden md:flex w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-2 justify-start' : 'justify-end'}`}>
                    <span className="text-[8rem] leading-none font-display font-bold text-white/[0.03] group-hover:text-white/[0.08] transition-colors duration-500 select-none">
                      {step.num}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees / Why Us - Clean Solid Cards (NO IMAGES) */}
      <section id="standardy" className="py-16 md:py-24 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[2px] bg-accent"></div>
              <h2 className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold">Standardy</h2>
              <div className="w-12 h-[2px] bg-accent"></div>
            </div>
            <h3 className="text-3xl md:text-5xl font-display text-text-main mb-6">Standardy naszej pracy</h3>
            <p className="text-text-muted font-light max-w-2xl mx-auto">
              Wybierając naszą firmę, decydujesz się na spokój ducha. Remont nie musi kojarzyć się ze stresem i opóźnieniami.
            </p>
          </div>

          <div className="flex flex-col w-full border-t border-white/10 mt-12">
            
            {/* Standard 1 */}
            <div className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 py-12 border-b border-white/10 transition-colors duration-500 hover:bg-white/[0.02] px-4 md:px-8">
              <div className="text-accent/40 group-hover:text-accent transition-colors duration-500 md:w-24 flex justify-center shrink-0">
                <ShieldCheck className="w-12 h-12 md:w-14 md:h-14" strokeWidth={1.5} />
              </div>
              <div className="flex-1 relative z-10">
                <h4 className="text-2xl md:text-3xl font-display text-text-main mb-3 group-hover:text-accent transition-colors duration-500">Pisemna Umowa i Gwarancja</h4>
                <p className="text-text-muted font-light text-base md:text-lg leading-relaxed max-w-3xl">
                  Działamy w pełni legalnie. Zabezpieczamy inwestora rzetelną umową, a na wykonane prace budowlane i instalacyjne wystawiamy pisemną gwarancję.
                </p>
              </div>
              <div className="hidden md:block text-[10rem] font-display text-white/[0.015] group-hover:text-accent/[0.05] transition-colors duration-700 absolute right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none">
                01
              </div>
            </div>
            
            {/* Standard 2 */}
            <div className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 py-12 border-b border-white/10 transition-colors duration-500 hover:bg-white/[0.02] px-4 md:px-8">
              <div className="text-accent/40 group-hover:text-accent transition-colors duration-500 md:w-24 flex justify-center shrink-0">
                <Clock className="w-12 h-12 md:w-14 md:h-14" strokeWidth={1.5} />
              </div>
              <div className="flex-1 relative z-10">
                <h4 className="text-2xl md:text-3xl font-display text-text-main mb-3 group-hover:text-accent transition-colors duration-500">Żelazna Terminowość</h4>
                <p className="text-text-muted font-light text-base md:text-lg leading-relaxed max-w-3xl">
                  Szanujemy Twój czas. Harmonogram prac ustalamy przed wejściem na budowę i rygorystycznie się go trzymamy. Brak ukrytych opóźnień.
                </p>
              </div>
              <div className="hidden md:block text-[10rem] font-display text-white/[0.015] group-hover:text-accent/[0.05] transition-colors duration-700 absolute right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none">
                02
              </div>
            </div>
            
            {/* Standard 3 */}
            <div className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 py-12 border-b border-white/10 transition-colors duration-500 hover:bg-white/[0.02] px-4 md:px-8">
              <div className="text-accent/40 group-hover:text-accent transition-colors duration-500 md:w-24 flex justify-center shrink-0">
                <Hammer className="w-12 h-12 md:w-14 md:h-14" strokeWidth={1.5} />
              </div>
              <div className="flex-1 relative z-10">
                <h4 className="text-2xl md:text-3xl font-display text-text-main mb-3 group-hover:text-accent transition-colors duration-500">Kultura Pracy i Czystość</h4>
                <p className="text-text-muted font-light text-base md:text-lg leading-relaxed max-w-3xl">
                  Zabezpieczamy ciągi komunikacyjne. Utrzymujemy porządek na placu budowy, a po zakończeniu prac oddajemy obiekt posprzątany i gotowy do użytku.
                </p>
              </div>
              <div className="hidden md:block text-[10rem] font-display text-white/[0.015] group-hover:text-accent/[0.05] transition-colors duration-700 absolute right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none">
                03
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section - bg-bg-base */}
      <section id="standardy" className="py-16 md:py-24 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[2px] bg-accent"></div>
              <h2 className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold">FAQ</h2>
              <div className="w-12 h-[2px] bg-accent"></div>
            </div>
            <h3 className="text-3xl md:text-4xl font-display text-text-main">Często zadawane pytania</h3>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Czy wycena prac jest darmowa?",
                a: "Tak, pierwsze spotkanie na obiekcie oraz przygotowanie wstępnego kosztorysu są całkowicie bezpłatne i niezobowiązujące."
              },
              {
                q: "Czy pomagacie w zakupie i transporcie materiałów?",
                a: "Oczywiście. Zajmujemy się kompleksową logistyką materiałów budowlanych (tzw. brudnych). Materiały wykończeniowe (płytki, armatura) inwestor wybiera samodzielnie, ale możemy zorganizować ich transport."
              },
              {
                q: "Jak długo trwa generalny remont mieszkania?",
                a: "Czas trwania zależy od metrażu i zakresu prac. Średnio, generalny remont mieszkania o powierzchni 50-60m² zajmuje od 6 do 10 tygodni. Dokładny harmonogram ustalamy przed podpisaniem umowy."
              },
              {
                q: "Czy udzielacie gwarancji na wykonane prace?",
                a: "Tak, na wszystkie wykonane przez nas prace budowlane i instalacyjne udzielamy pisemnej gwarancji."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-white/5 bg-bg-base overflow-hidden">
                <button 
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-white/[0.02] transition-colors duration-300"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-display text-lg text-text-main">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-accent" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-text-muted font-light leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery / Portfolio - Guaranteed No Empty Squares */}
      <section id="realizacje" className="py-32 relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-accent"></div>
                <h2 className="text-xs tracking-[0.3em] text-accent uppercase">Portfolio</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-display text-text-main">Wybrane realizacje</h3>
            </div>
            <p className="text-text-muted font-light max-w-md text-sm leading-relaxed">
              Dokumentacja fotograficzna naszych prac. Dowód na rzemieślniczą precyzję i dbałość o detale na każdym etapie budowy.
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {/* Tworzymy tablicę 12 elementów i dla każdego pobieramy poprawne zdjęcie z funkcji getImage */}
            {Array.from({ length: 12 }).map((_, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                className="break-inside-avoid relative group cursor-pointer bg-bg-surface border border-white/5 p-2 shadow-xl"
                onClick={() => setSelectedImage(getImage(index))}
              >
                <img 
                  src={getImage(index)} 
                  alt={`Realizacja ${index + 1}`} 
                  className="w-full h-auto block grayscale-[15%] group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-2 bg-bg-base/0 group-hover:bg-bg-base/40 transition-colors duration-500 flex items-center justify-center">
                  <div className="w-12 h-12 border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact - bg-bg-surface */}
      <section id="kontakt" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-accent"></div>
                <h2 className="text-xs tracking-[0.3em] text-accent uppercase">Kontakt</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-display text-text-main mb-8">Rozpocznijmy współpracę</h3>
              <p className="text-text-muted text-sm font-light mb-16 leading-relaxed">
                Zapraszamy do kontaktu w celu omówienia szczegółów inwestycji. Zapewniamy profesjonalne doradztwo techniczne i rzetelną wycenę prac budowlanych.
              </p>
              
              <div className="space-y-10">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-accent transition-colors">
                    <Phone className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-[0.15em] mb-2">Telefon</p>
                    <a href="tel:+48000000000" className="text-xl font-display text-text-main hover:text-accent transition-colors">+48 000 000 000</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-accent transition-colors">
                    <Mail className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-[0.15em] mb-2">E-mail</p>
                    <a href="mailto:kontakt@kontakt.pl" className="text-xl font-display text-text-main hover:text-accent transition-colors">kontakt@kontakt.pl</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-accent transition-colors">
                    <MapPin className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-[0.15em] mb-2">Obszar działania</p>
                    <p className="text-xl font-display text-text-main">Nidzica, Olsztynek, Olsztyn</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="bg-bg-base p-8 md:p-12 border border-white/5 relative shadow-2xl">
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/10"></div>
                
                <h4 className="text-2xl font-display text-text-main mb-10">Zapytanie ofertowe</h4>
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs uppercase tracking-widest text-text-muted">Imię i nazwisko</label>
                      <input 
                        type="text" 
                        className="w-full bg-transparent border-b border-white/10 pb-3 focus:outline-none focus:border-accent transition-colors text-text-main text-sm"
                        placeholder="Jan Kowalski"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs uppercase tracking-widest text-text-muted">Telefon</label>
                      <input 
                        type="tel" 
                        className="w-full bg-transparent border-b border-white/10 pb-3 focus:outline-none focus:border-accent transition-colors text-text-main text-sm"
                        placeholder="+48 000 000 000"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-widest text-text-muted">Szczegóły inwestycji</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-transparent border-b border-white/10 pb-3 focus:outline-none focus:border-accent transition-colors text-text-main text-sm resize-none"
                      placeholder="Opisz zakres prac budowlanych, metraż, lokalizację..."
                    ></textarea>
                  </div>
                  <button className="w-full py-5 bg-text-main text-bg-base hover:bg-accent hover:text-bg-base transition-colors font-medium tracking-[0.15em] uppercase text-xs mt-6">
                    Wyślij zapytanie
                  </button>
                  <p className="text-[10px] text-text-muted text-center uppercase tracking-wider mt-6">
                    Wysyłając formularz, wyrażasz zgodę na przetwarzanie danych osobowych.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-lg text-text-main">Ł</span>
          </div>
          <p className="text-text-muted text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Usługi Remontowo-Budowlane.
          </p>
        </div>
      </footer>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-bg-base/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-text-muted hover:text-text-main transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={selectedImage} 
              alt="Powiększenie" 
              className="max-w-full max-h-[90vh] object-contain border border-white/5 p-2 bg-bg-surface"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
