import { useEffect, useState } from 'react';
import {
  Cpu,
  Network,
  Eye,
  Lock,
  Zap,
  Users,
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  Sparkles,
  Globe,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  MessageSquare,
  Video,
  Handshake,
  QrCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const FORM_URL = 'https://forms.cloud.microsoft/r/Q3Ra4Bfvsh';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'novedades' | 'vision' | 'futuro'>('novedades');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const openForm = () => {
    window.open(FORM_URL, '_blank', 'noopener,noreferrer');
  };

  const innovations = [
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Agent Identity Security",
      description: "Gobierna y asegura agentes de IA a nivel de permisos. Descubre, gobierna y certifica agentes de IA como si fueran humanos, vinculando contexto de usuario y datos.",
      image: "/images/Slide%202%20-%20Network%20of%20Autonomous%20AI%20Agents.png"
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Observability & Insights",
      description: "Visualización interactiva basada en grafos de relaciones de identidad y rutas de acceso. Elimina puntos ciegos con visibilidad completa de entidades humanas y no humanas.",
      image: "/images/Slide%203%20-%20Identity%20Graph.png"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Data Access Security",
      description: "Visibilidad centralizada de quién puede acceder a qué datos y cómo se utilizan. Integración con Snowflake para datos estructurados y no estructurados.",
      image: "/images/Slide%205%20-%20Global%20AI%20Identity%20Adaptative%20Network.png"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Atlas Enterprise",
      description: "Orquestación de seguridad dinámica y respuesta en tiempo real a riesgos identificados. Aprobaciones adaptativas basadas en contexto de riesgo y negocio.",
      image: "/images/Futuristic%20cyber%20command%20center%20(0).png"
    }
  ];

  const visionPoints = [
    {
      title: "Identity-First, Data-First",
      description: "Las acciones de seguridad se informan tanto por el contexto de identidad como de datos.",
      icon: <Lock className="w-6 h-6" />
    },
    {
      title: "Modelos de Acceso Dinámicos",
      description: "Soporte para múltiples enfoques just-in-time, incluyendo tiempo real.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Seguridad Inline",
      description: "Las brechas y amenazas se abordan dentro del SOC con respuesta y remediación en tiempo real.",
      icon: <Lock className="w-6 h-6" />
    },
    {
      title: "Inteligencia Integrada",
      description: "IA y machine learning tejidos en la propia estructura de la plataforma.",
      icon: <Sparkles className="w-6 h-6" />
    }
  ];

  const futureFeatures = [
    {
      title: "Privilege Security Posture Management",
      description: "Automatización del descubrimiento de privilegios y soporte para modelos de acceso just-in-time.",
      status: "En desarrollo"
    },
    {
      title: "Real-time Authorization",
      description: "Evaluación dinámica de solicitudes de acceso utilizando señales contextuales.",
      status: "Próximamente"
    },
    {
      title: "Real-time Threat Defence",
      description: "Detección y respuesta a amenazas basadas en identidad con acciones impulsadas por contexto.",
      status: "Roadmap 2026"
    },
    {
      title: "Harbor Pilot",
      description: "Asistente de IA generativa que ayuda a los usuarios a obtener valor del producto más rápido.",
      status: "Disponible"
    }
  ];

  const partners = [
    {
      name: "Deloitte",
      logo: "DE",
      description: "Firma global líder en consultoría y servicios profesionales. Su práctica de Cyber & Identity ayuda a grandes empresas a diseñar e implementar estrategias de gobierno de identidad, integrando SailPoint en arquitecturas Zero Trust a escala global.",
      services: ["Consultoría estratégica", "Implementación IGA", "Zero Trust"]
    },
    {
      name: "KPMG",
      logo: "KP",
      description: "Una de las Big Four a nivel mundial, con una práctica de Identity & Access Management consolidada. KPMG combina experiencia en auditoría y ciberseguridad para acompañar proyectos de gobierno de identidad con foco en cumplimiento regulatorio (GDPR, SOX, NIS2).",
      services: ["Auditoría IAM", "Compliance", "Transformación digital"]
    },
    {
      name: "Fujitsu",
      logo: "FJ",
      description: "Corporación tecnológica japonesa con presencia en más de 100 países. Partner Platinum de SailPoint, Fujitsu ofrece servicios gestionados de identidad y capacidades de delivery worldwide, con especial fortaleza en el sector financiero y administración pública.",
      services: ["Managed Services", "Servicios gestionados", "Sector público"]
    },
    {
      name: "IndraMind",
      logo: "IM",
      description: "Compañía tecnológica española de referencia en transformación digital e innovación. Combina la experiencia en ciberseguridad e identidad digital de Indra con capacidades avanzadas de inteligencia artificial para ofrecer soluciones IGA adaptadas al mercado ibérico.",
      services: ["Ciberseguridad", "Identidad digital", "IA aplicada"]
    },
    {
      name: "DXC",
      logo: "DX",
      description: "Compañía global de servicios tecnológicos que ayuda a las organizaciones a gestionar sus sistemas y operaciones críticas. Su práctica de Identity Security integra SailPoint en entornos híbridos y multi-cloud complejos, con foco en automatización y reducción de riesgo operacional.",
      services: ["Integración cloud", "Automatización IAM", "Outsourcing TI"]
    }
  ];

  const agendaItems = [
    {
      time: "11:00 - 11:30",
      title: "Registro",
      description: "Recepción de asistentes y preparación para la jornada.",
      icon: <CoffeeIcon />
    },
    {
      time: "11:30 - 11:45",
      title: "Bienvenida",
      description: "Apertura oficial del evento e introducción al programa del día.",
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      time: "11:45 - 12:45",
      title: "Identidad & IA: columna vertebral del SOC",
      description: "Keynote principal: cómo la identidad adaptativa se convierte en el núcleo de operaciones de seguridad en la era de la IA.",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      time: "12:45 - 13:00",
      title: "Entrevista con Ayuntamiento de Madrid",
      description: "Caso de uso real: cómo el Ayuntamiento de Madrid está transformando su gobierno de identidad con SailPoint.",
      icon: <Globe className="w-5 h-5" />
    },
    {
      time: "13:00 - 13:35",
      title: "Panel de Partners",
      description: "Nuestros partners estratégicos comparten visión, experiencias de implementación y tendencias del mercado.",
      icon: <Handshake className="w-5 h-5" />
    },
    {
      time: "13:40 - 14:15",
      title: "Panel de Clientes",
      description: "Testimonios directos de clientes sobre cómo SailPoint está transformando su postura de seguridad.",
      icon: <CheckCircle2 className="w-5 h-5" />
    },
    {
      time: "14:15 - 14:30",
      title: "Wrap Up & Kahoot",
      description: "Resumen de los puntos clave del día y actividad interactiva para los asistentes.",
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      time: "14:30 - 15:30",
      title: "Cocktail",
      description: "Networking en un ambiente distendido para conectar con colegas, partners y el equipo de SailPoint.",
      icon: <Users className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1628] text-white overflow-x-hidden">

      {/* ── TICKER ── */}
      <div style={{
        background: '#0077B6',
        padding: '10px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60
      }}>
        <span style={{
          display: 'inline-block',
          animation: 'ticker 40s linear infinite',
          fontFamily: 'monospace',
          fontSize: '12px',
          letterSpacing: '1px',
          color: 'rgba(255,255,255,0.85)'
        }}>
          96% de CISOs ven los agentes IA como amenaza crítica
          <span style={{ margin: '0 24px', color: 'rgba(255,255,255,0.3)' }}>///</span>
          78% de agentes sin propietario asignado
          <span style={{ margin: '0 24px', color: 'rgba(255,255,255,0.3)' }}>///</span>
          Ratio no-humano:humano = 37:1 · SailPoint gobierna ambos
          <span style={{ margin: '0 24px', color: 'rgba(255,255,255,0.3)' }}>///</span>
          $9.4M coste anual medio de incidentes de agentes
          <span style={{ margin: '0 24px', color: 'rgba(255,255,255,0.3)' }}>///</span>
          +340% crecimiento anual de AI Agents · ¿Los tienes gobernados?
          <span style={{ margin: '0 24px', color: 'rgba(255,255,255,0.3)' }}>///</span>
          SailPoint: líder del Magic Quadrant de IGA 10+ años consecutivos
          <span style={{ margin: '0 24px', color: 'rgba(255,255,255,0.3)' }}>///</span>
          96% de CISOs ven los agentes IA como amenaza crítica
          <span style={{ margin: '0 24px', color: 'rgba(255,255,255,0.3)' }}>///</span>
          78% de agentes sin propietario asignado
          <span style={{ margin: '0 24px', color: 'rgba(255,255,255,0.3)' }}>///</span>
          Ratio no-humano:humano = 37:1 · SailPoint gobierna ambos
          <span style={{ margin: '0 24px', color: 'rgba(255,255,255,0.3)' }}>///</span>
          $9.4M coste anual medio de incidentes de agentes
          <span style={{ margin: '0 24px', color: 'rgba(255,255,255,0.3)' }}>///</span>
          +340% crecimiento anual de AI Agents · ¿Los tienes gobernados?
          <span style={{ margin: '0 24px', color: 'rgba(255,255,255,0.3)' }}>///</span>
          SailPoint: líder del Magic Quadrant de IGA 10+ años consecutivos
          <span style={{ margin: '0 24px', color: 'rgba(255,255,255,0.3)' }}>///</span>
        </span>
      </div>

      {/* ── NAVIGATION ── */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass py-3' : 'bg-transparent py-5'
        }`}
        style={{ top: '40px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/images/Logo.svg" alt="SailPoint" className="h-12 w-auto" />
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('novedades')} className="text-sm text-gray-300 hover:text-white transition-colors">Novedades</button>
              <button onClick={() => scrollToSection('vision')} className="text-sm text-gray-300 hover:text-white transition-colors">Visión</button>
              <button onClick={() => scrollToSection('partners')} className="text-sm text-gray-300 hover:text-white transition-colors">Partners</button>
              <button onClick={() => scrollToSection('agenda')} className="text-sm text-gray-300 hover:text-white transition-colors">Agenda</button>
              <Button
                onClick={() => setQrOpen(true)}
                variant="outline"
                className="border-[#00A3E0]/40 text-[#00A3E0] hover:bg-[#00A3E0]/10"
              >
                <QrCode className="w-4 h-4 mr-2" />
                QR
              </Button>
              <Button
                onClick={openForm}
                className="btn-primary text-white px-6 py-2 rounded-full font-medium"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Contacto
              </Button>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden glass mt-3 py-4 px-4">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('novedades')} className="text-left text-gray-300 hover:text-white">Novedades</button>
              <button onClick={() => scrollToSection('vision')} className="text-left text-gray-300 hover:text-white">Visión</button>
              <button onClick={() => scrollToSection('partners')} className="text-left text-gray-300 hover:text-white">Partners</button>
              <button onClick={() => scrollToSection('agenda')} className="text-left text-gray-300 hover:text-white">Agenda</button>
              <Button onClick={openForm} className="btn-primary text-white w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contacto
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        className="hero-bg min-h-screen flex items-center justify-center relative pb-16"
        style={{ paddingTop: '160px' }}
      >
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-[#00A3E0]/20 blur-xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-[#0066CC]/20 blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-[#6366F1]/20 blur-xl animate-float" style={{ animationDelay: '4s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <Badge className="badge-glow text-[#00A3E0] mb-6 px-4 py-2 text-sm">
              <Users className="w-4 h-4 mr-2 inline" />
              Área Privada para Asistentes
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              La Era de la{' '}
              <span className="gradient-text">Identidad Adaptativa</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Bienvenido al microsite exclusivo del evento SailPoint en Madrid.
              Aquí encontrarás toda la información sobre novedades, partners y el programa del día.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-3 text-gray-300 justify-center">
                <Calendar className="w-5 h-5 text-[#00A3E0]" />
                <span>23 de Abril, 2026</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 justify-center">
                <MapPin className="w-5 h-5 text-[#00A3E0]" />
                <span>Madrid, España</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={() => scrollToSection('novedades')}
                className="btn-primary text-white px-8 py-6 rounded-full text-lg font-semibold"
              >
                Explorar Novedades
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => scrollToSection('agenda')}
                className="btn-secondary text-white px-8 py-6 rounded-full text-lg font-semibold"
              >
                Ver Agenda
              </Button>
            </div>
          </div>

          {/* Hero video */}
          <div className="relative max-w-6xl mx-auto animate-fade-in">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl glow-cyan border border-white/10 bg-[#091426]">
              <div className="relative w-full pb-[56.25%]">
                <iframe
                  src="https://app.heygen.com/embeds/501be1156fb1476aad197bdd98deadd2"
                  title="SailPoint Event Video"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="encrypted-media; fullscreen;"
                  allowFullScreen
                />
              </div>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0A1628]/70 via-transparent to-transparent" />
            </div>

            <div className="hidden md:block absolute -bottom-6 left-6 glass-card rounded-xl p-4 animate-float">
              <div className="text-3xl font-bold gradient-text">53%</div>
              <div className="text-sm text-gray-400">Fortune 500</div>
            </div>
            <div className="hidden md:block absolute -top-6 right-6 glass-card rounded-xl p-4 animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-3xl font-bold gradient-text-cyan">#1</div>
              <div className="text-sm text-gray-400">En IGA 2024</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 text-[#00A3E0] rotate-90" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "96%", label: "Ven agentes IA como amenaza" },
              { value: "80%", label: "Agentes han tomado acciones no intencionadas" },
              { value: "15%", label: "Decisiones empresariales por IA en 2028" },
              { value: "Decenas de billones", label: "De identidades no humanas" }
            ].map((stat, index) => (
              <div key={index} className="text-center glass-card rounded-2xl p-6 card-hover">
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOVEDADES ── */}
      <section id="novedades" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0066CC]/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Badge className="badge-glow text-[#00A3E0] mb-4">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Novedades 2026
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Innovaciones que <span className="gradient-text">Transforman</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              SailPoint presenta una ola de innovaciones diseñadas para abordar los desafíos más apremiantes
              que enfrentan las empresas hoy en día.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {innovations.map((item, index) => (
              <div key={index} className="glass-card rounded-2xl overflow-hidden card-hover group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066CC] to-[#00A3E0] flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>
                  <Button
                    onClick={openForm}
                    variant="outline"
                    size="sm"
                    className="border-[#00A3E0]/40 text-[#00A3E0] hover:bg-[#00A3E0]/10"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Solicitar información
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION & STRATEGY ── */}
      <section id="vision" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <div className="glass rounded-full p-1 flex gap-1">
              {(['novedades', 'vision', 'futuro'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-[#0066CC] to-[#00A3E0] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab === 'novedades' ? 'Novedades' : tab === 'vision' ? 'Visión' : 'Futuro'}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'novedades' && (
            <div className="animate-fade-in">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                    Una Nueva Era de <span className="gradient-text">Seguridad de Identidad</span>
                  </h2>
                  <p className="text-gray-400 mb-8 text-lg">
                    Las paredes que alguna vez definieron la empresa—redes, perímetros, departamentos—ya no
                    proporcionan protección adecuada. Las identidades abarcan humanos, máquinas y agentes de IA,
                    todas accediendo a aplicaciones y datos, creando una vasta nueva superficie de ataque.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Descubre y gobierna agentes de IA como certificas humanos",
                      "Vincula contexto humano-agente-datos para reducir riesgos",
                      "Visibilidad unificada de identidades humanas y no humanas",
                      "Respuesta en tiempo real a amenazas basadas en identidad"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00A3E0] flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Button onClick={openForm} className="btn-primary text-white">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Solicitar información
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="/images/Slide%204%20-%20Rouge%20AI%20Agent%20Hidden.png"
                    alt="Security Vision"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vision' && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Los Pilares de la <span className="gradient-text">Identidad Adaptativa</span>
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                  La Plataforma SailPoint ofrece seguridad identity-first, data-first con inteligencia de IA
                  que guía cómo las empresas gobiernan el acceso, detectan riesgos y responden a amenazas.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {visionPoints.map((point, index) => (
                  <div key={index} className="glass-card rounded-2xl p-6 card-hover text-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0066CC]/20 to-[#00A3E0]/20 flex items-center justify-center text-[#00A3E0] mx-auto mb-4">
                      {point.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-3">{point.title}</h3>
                    <p className="text-gray-400 text-sm">{point.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-16 glass-card rounded-2xl p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Arquitectura de Cinco Capas</h3>
                    <p className="text-gray-400 mb-6">
                      En su base está Atlas, el modelo de datos unificado y grafo enriquecido con servicios
                      comunes de IA. Sobre eso, el plano de control para todas las identidades, centralizando
                      el gobierno de humanos y agentes por igual.
                    </p>
                    <div className="space-y-3">
                      {[
                        { level: "1", name: "Atlas", desc: "Modelo de datos unificado y grafo" },
                        { level: "2", name: "Control Plane", desc: "Gobierno centralizado de identidades" },
                        { level: "3", name: "Real-time Layer", desc: "Puntuación de riesgo dinámica y autorización continua" },
                        { level: "4", name: "Identity-centric Security", desc: "Herramientas avanzadas de investigación" },
                        { level: "5", name: "Customer Experience", desc: "Experiencia agentica con lenguaje natural" }
                      ].map((layer, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0066CC] to-[#00A3E0] flex items-center justify-center text-sm font-bold">
                            {layer.level}
                          </span>
                          <div>
                            <span className="font-semibold">{layer.name}</span>
                            <span className="text-gray-400 text-sm ml-2">{layer.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="/images/Futuristic%20cyber%20command%20center%20(5).png"
                      alt="Platform Architecture"
                      className="rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button onClick={openForm} className="btn-primary text-white px-8 py-4 rounded-full">
                  <Video className="w-5 h-5 mr-2" />
                  Agendar sesión técnica post-evento
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'futuro' && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  El <span className="gradient-text">Futuro</span> de la Seguridad de Identidad
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                  SailPoint continúa innovando para preparar a las empresas para las realidades de un
                  panorama de amenazas dinámico.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {futureFeatures.map((feature, index) => (
                  <div key={index} className="glass-card rounded-2xl p-6 card-hover">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <Badge className={`${
                        feature.status === 'Disponible'
                          ? 'bg-green-500/20 text-green-400 border-green-500/40'
                          : feature.status === 'En desarrollo'
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                          : 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                      }`}>
                        {feature.status}
                      </Badge>
                    </div>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <div className="inline-block glass-card rounded-2xl p-8">
                  <blockquote className="text-xl italic text-gray-300 mb-4">
                    "Las prácticas de seguridad estática no pueden mantener el ritmo con un mundo dinámico.
                    La industria debe adoptar un enfoque más adaptativo—uno que evolucione tan rápido como el negocio mismo."
                  </blockquote>
                  <cite className="text-[#00A3E0] not-italic font-semibold">— SailPoint Leadership</cite>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  onClick={openForm}
                  variant="outline"
                  className="border-[#00A3E0]/40 text-[#00A3E0] hover:bg-[#00A3E0]/10 px-8 py-4"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Solicitar roadmap detallado
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section id="partners" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0066CC]/5 via-transparent to-[#00A3E0]/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Badge className="badge-glow text-[#00A3E0] mb-4">
              <Handshake className="w-4 h-4 mr-2 inline" />
              Nuestros Partners
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Colaboradores <span className="gradient-text">Estratégicos</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Conoce a nuestros partners que participan en el evento y descubre cómo pueden
              ayudarte en tu journey de transformación digital.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="glass-card rounded-2xl p-8 card-hover">
                <div className="flex items-start gap-6">

                  {/* ── LOGO BOX ── */}
                  <div className="w-24 h-24 rounded-xl bg-white flex items-center justify-center flex-shrink-0 p-3 shadow-md">
                    <img
                      src={`/images/${partner.name}.png`}
                      alt={`${partner.name} logo`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.style.background = 'linear-gradient(135deg, #0066CC, #00A3E0)';
                          parent.innerHTML = `<span style="color:white;font-weight:bold;font-size:1.25rem">${partner.logo}</span>`;
                        }
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{partner.name}</h3>
                    <p className="text-gray-400 mb-4">{partner.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {partner.services.map((service, idx) => (
                        <Badge key={idx} variant="outline" className="border-[#00A3E0]/40 text-[#00A3E0]">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENT INFO ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0066CC]/5 via-transparent to-[#00A3E0]/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="badge-glow text-[#00A3E0] mb-6">
                <Calendar className="w-4 h-4 mr-2 inline" />
                23 de Abril, 2026
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Madrid: Epicentro de la{' '}
                <span className="gradient-text">Innovación</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Una jornada única donde desvelaremos las novedades más esperadas de SailPoint.
                Nuestros clientes y partners compartirán cómo la Identidad está transformando el panorama de la ciberseguridad.
              </p>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066CC]/20 to-[#00A3E0]/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-[#00A3E0]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Tendencias del Mercado</h3>
                    <p className="text-gray-400 text-sm">Descubre las últimas novedades acerca de nuestra propuesta de valor.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066CC]/20 to-[#00A3E0]/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-[#00A3E0]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Estrategias de Transformación</h3>
                    <p className="text-gray-400 text-sm">Haz de la seguridad de la identidad el pilar de tu transformación digital.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066CC]/20 to-[#00A3E0]/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-[#00A3E0]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Networking de Élite</h3>
                    <p className="text-gray-400 text-sm">Conecta con los líderes del sector en un ambiente exclusivo.</p>
                  </div>
                </div>
              </div>
              <Button
                onClick={openForm}
                className="btn-primary text-white px-8 py-6 rounded-full text-lg font-semibold"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Contactar con el equipo
              </Button>
            </div>

            <div className="relative">
              <img
                src="/images/Futuristic%20cyber%20command%20center%20(1).png"
                alt="Madrid Event"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 glass-card rounded-xl p-6 max-w-xs">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-[#00A3E0]" />
                  <span className="font-semibold">Madrid, España</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-[#00A3E0]" />
                  <span className="font-semibold">23 de Abril, 2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#00A3E0]" />
                  <span className="font-semibold">11:00 - 15:30 CET</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AGENDA ── */}
      <section id="agenda" className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="badge-glow text-[#00A3E0] mb-4">
              <Clock className="w-4 h-4 mr-2 inline" />
              Programa del Día
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Agenda del <span className="gradient-text">Evento</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line transform md:-translate-x-1/2" />
            <div className="space-y-8">
              {agendaItems.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-[#0066CC] to-[#00A3E0] transform -translate-x-1/2 mt-6 z-10 shadow-lg shadow-[#00A3E0]/50" />
                  <div
                    className={`ml-12 md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                    }`}
                  >
                    <div className="glass-card rounded-xl p-6 card-hover">
                      <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <Clock className="w-4 h-4 text-[#00A3E0]" />
                        <span className="text-sm text-[#00A3E0] font-semibold">{item.time}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-5/12" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">¿Tienes preguntas sobre alguna sesión específica?</p>
            <Button onClick={openForm} className="btn-primary text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Consultar sobre sesiones
            </Button>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0066CC]/20 via-[#00A3E0]/20 to-[#6366F1]/20" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            ¿Necesitas <span className="gradient-text">más información</span>?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Nuestro equipo está disponible para resolver tus dudas, proporcionarte documentación adicional
            o agendar una sesión personalizada post-evento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={openForm}
              className="btn-primary text-white px-10 py-6 rounded-full text-lg font-semibold"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Solicitar información
            </Button>
            <Button
              onClick={openForm}
              variant="outline"
              className="border-[#00A3E0]/40 text-[#00A3E0] hover:bg-[#00A3E0]/10 px-10 py-6 rounded-full text-lg font-semibold"
            >
              <Video className="w-5 h-5 mr-2" />
              Agendar sesión post-evento
            </Button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/Logo.svg" alt="SailPoint" className="h-12 w-auto" />
              </div>
              <p className="text-gray-400 text-sm">
                La plataforma líder en seguridad de identidad empresarial.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Evento</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection('novedades')} className="hover:text-white transition-colors">Novedades</button></li>
                <li><button onClick={() => scrollToSection('vision')} className="hover:text-white transition-colors">Visión</button></li>
                <li><button onClick={() => scrollToSection('partners')} className="hover:text-white transition-colors">Partners</button></li>
                <li><button onClick={() => scrollToSection('agenda')} className="hover:text-white transition-colors">Agenda</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://www.sailpoint.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Web oficial</a></li>
                <li><a href="https://documentation.sailpoint.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Documentación</a></li>
                <li><a href="https://www.sailpoint.com/blog" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>eventos@sailpoint.com</li>
                <li>Madrid, España</li>
                <li>23 de Abril, 2026</li>
              </ul>
            </div>
          </div>
          <div className="section-divider mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 SailPoint Technologies, Inc. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── QR DIALOG ── */}
      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="glass border-white/10 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Escanea el <span className="gradient-text">Código QR</span>
            </DialogTitle>
            <DialogDescription className="text-center text-gray-400">
              Accede al microsite desde tu móvil
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <img
              src="/images/qr-workshops.png"
              alt="Identity Workshops QR"
              className="w-56 h-56 rounded-xl"
            />
            <p className="text-gray-400 text-sm mt-4 text-center">
              Identity Workshops · SailPoint Madrid 2026
            </p>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}

function CoffeeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 1v3M10 1v3M14 1v3" />
    </svg>
  );
}

export default App;
