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
  ExternalLink,
  Handshake,
  Info,
  Loader2,
  CheckCircle,
  QrCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// URL del Webhook de Google Apps Script
// REEMPLAZA ESTA URL con la tuya después de desplegar el script
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwMsELF-sCtP0U74DciTkQVeoRAtuzbJbvUZiF4_YcxKdabV_az5WbxJ34IAC5LT4Cf_Q/exec
';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'novedades' | 'vision' | 'futuro'>('novedades');
  const [contactType, setContactType] = useState<'info' | 'demo'>('info');
  
  // Estados para formularios
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Estados para datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    consulta: '',
    tipoSesion: '',
    disponibilidad: '',
    consentimiento: false
  });

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

  // Función para enviar datos al webhook
  const enviarAlWebhook = async (data: any) => {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Error al enviar la solicitud');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  // Handler para enviar formulario de contacto
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consentimiento) {
      setSubmitError('Debes aceptar la política de privacidad para continuar.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      await enviarAlWebhook({
        tipo: contactType,
        nombre: formData.nombre,
        email: formData.email,
        empresa: formData.empresa,
        consulta: formData.consulta,
        cargo: ''
      });
      
      setSubmitSuccess(true);
      // Resetear formulario después de 3 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
        setContactOpen(false);
        setFormData({ nombre: '', email: '', empresa: '', consulta: '', tipoSesion: '', disponibilidad: '', consentimiento: false });
      }, 3000);
    } catch (error) {
      setSubmitError('Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler para enviar formulario de agenda
  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consentimiento) {
      setSubmitError('Debes aceptar la política de privacidad para continuar.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      await enviarAlWebhook({
        tipo: 'demo',
        nombre: formData.nombre,
        email: formData.email,
        empresa: formData.empresa,
        consulta: `Tipo de sesión: ${formData.tipoSesion}. Disponibilidad: ${formData.disponibilidad}`,
        cargo: formData.tipoSesion
      });
      
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setScheduleOpen(false);
        setFormData({ nombre: '', email: '', empresa: '', consulta: '', tipoSesion: '', disponibilidad: '', consentimiento: false });
      }, 3000);
    } catch (error) {
      setSubmitError('Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Componente de checkbox RGPD
  const CheckboxRGPD = ({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) => (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
      <input
        type="checkbox"
        id="consentimiento"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 text-[#00A3E0] focus:ring-[#00A3E0] focus:ring-offset-0"
      />
      <label htmlFor="consentimiento" className="text-sm text-gray-300 cursor-pointer">
        He leído y acepto la{' '}
        <a href="#" className="text-[#00A3E0] hover:underline" target="_blank" rel="noopener noreferrer">
          Política de Privacidad
        </a>{' '}
        y el tratamiento de mis datos personales para gestionar mi solicitud de información sobre los productos y servicios de SailPoint. 
        Entiendo que mis datos serán tratados conforme al RGPD y podré ejercer mis derechos de acceso, rectificación, supresión, 
        oposición, limitación del tratamiento y portabilidad dirigiéndome a:{' '}
        <a href="mailto:privacy@sailpoint.com" className="text-[#00A3E0] hover:underline">
          privacy@sailpoint.com
        </a>
      </label>
    </div>
  );

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
      name: "IC Consult",
      description: "Especialistas en implementación y consultoría de soluciones SailPoint. Líderes en proyectos de gobierno de identidad para grandes empresas europeas.",
      services: ["Implementación", "Consultoría", "Soporte"],
      logo: "IC"
    },
    {
      name: "SIA",
      description: "Partner estratégico con amplia experiencia en transformación digital y seguridad de identidad en el sector financiero y utilities.",
      services: ["Integración", "Desarrollo", "Formación"],
      logo: "SIA"
    },
    {
      name: "Devoteam",
      description: "Consultora tecnológica especializada en cloud, ciberseguridad e inteligencia artificial. Expertos en despliegues enterprise de SailPoint.",
      services: ["Cloud", "Ciberseguridad", "IA"],
      logo: "DV"
    },
    {
      name: "Fujitsu",
      description: "Corporación tecnológica global con presencia en más de 100 países. Partner Platinum de SailPoint con capacidades de delivery worldwide.",
      services: ["Managed Services", "Consultoría", "Outsourcing"],
      logo: "FJ"
    }
  ];

  const agendaItems = [
    {
      time: "09:00 - 09:30",
      title: "Registro y Bienvenida",
      description: "Recepción de asistentes, café de networking y preparación para la jornada.",
      icon: <CoffeeIcon />
    },
    {
      time: "09:30 - 10:30",
      title: "Keynote: La Era de la Identidad Adaptativa",
      description: "Presentación de las últimas innovaciones de SailPoint y visión estratégica para 2026-2027.",
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      time: "10:30 - 11:30",
      title: "Tendencias del Mercado y Novedades",
      description: "Análisis de tendencias en ciberseguridad y presentación de nuestra propuesta de valor actualizada.",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      time: "11:30 - 12:00",
      title: "Coffee Break & Networking",
      description: "Pausa para café y oportunidad de conectar con otros profesionales del sector.",
      icon: <Users className="w-5 h-5" />
    },
    {
      time: "12:00 - 13:00",
      title: "Estrategias de Transformación Digital",
      description: "Cómo hacer de la seguridad de la identidad el pilar de tu transformación digital.",
      icon: <Globe className="w-5 h-5" />
    },
    {
      time: "13:00 - 14:30",
      title: "Almuerzo de Networking",
      description: "Almuerzo en un espacio diseñado para facilitar las conexiones entre asistentes.",
      icon: <Users className="w-5 h-5" />
    },
    {
      time: "14:30 - 15:30",
      title: "Casos de Éxito: Clientes y Partners",
      description: "Testimonios de clientes y partners sobre cómo la identidad está transformando la ciberseguridad.",
      icon: <CheckCircle2 className="w-5 h-5" />
    },
    {
      time: "15:30 - 16:30",
      title: "Demos en Vivo: Adaptive Identity en Acción",
      description: "Demostraciones prácticas de Agent Identity Security, Observability y Data Access Security.",
      icon: <Eye className="w-5 h-5" />
    },
    {
      time: "16:30 - 17:00",
      title: "Clausura y Networking Final",
      description: "Resumen de la jornada, próximos pasos y tiempo para networking final.",
      icon: <Sparkles className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1628] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/images/sailpoint-logo-white.png" 
                alt="SailPoint" 
                className="h-12 w-auto"
              />
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('novedades')} className="text-sm text-gray-300 hover:text-white transition-colors">Novedades</button>
              <button onClick={() => scrollToSection('vision')} className="text-sm text-gray-300 hover:text-white transition-colors">Visión</button>
              <button onClick={() => scrollToSection('partners')} className="text-sm text-gray-300 hover:text-white transition-colors">Partners</button>
              <button onClick={() => scrollToSection('spy')} className="text-sm text-gray-300 hover:text-white transition-colors">SPY App</button>
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
                onClick={() => { setContactType('info'); setContactOpen(true); }}
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass mt-3 py-4 px-4">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('novedades')} className="text-left text-gray-300 hover:text-white">Novedades</button>
              <button onClick={() => scrollToSection('vision')} className="text-left text-gray-300 hover:text-white">Visión</button>
              <button onClick={() => scrollToSection('partners')} className="text-left text-gray-300 hover:text-white">Partners</button>
              <button onClick={() => scrollToSection('spy')} className="text-left text-gray-300 hover:text-white">SPY App</button>
              <button onClick={() => scrollToSection('agenda')} className="text-left text-gray-300 hover:text-white">Agenda</button>
              <Button 
                onClick={() => { setContactType('info'); setContactOpen(true); setMobileMenuOpen(false); }}
                className="btn-primary text-white w-full"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Contacto
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-bg min-h-screen flex items-center justify-center relative pt-20">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-[#00A3E0]/20 blur-xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-[#0066CC]/20 blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-[#6366F1]/20 blur-xl animate-float" style={{ animationDelay: '4s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-slide-up">
              <Badge className="badge-glow text-[#00A3E0] mb-6 px-4 py-2 text-sm">
                <Users className="w-4 h-4 mr-2 inline" />
                Área Privada para Asistentes
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                La Era de la{' '}
                <span className="gradient-text">Identidad Adaptativa</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Bienvenido al microsite exclusivo del evento SailPoint en Madrid. 
                Aquí encontrarás toda la información sobre novedades, partners y el programa del día.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-[#00A3E0]" />
                  <span>23 de Abril, 2026</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-[#00A3E0]" />
                  <span>Madrid, España</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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

            <div className="relative animate-fade-in hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl glow-cyan">
                <img 
                  src="/images/Futuristic%20cyber%20command%20center%20(3).png" 
                  alt="Cyber Command Center" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />
              </div>
              
              {/* Stats Cards */}
              <div className="absolute -bottom-6 -left-6 glass-card rounded-xl p-4 animate-float">
                <div className="text-3xl font-bold gradient-text">53%</div>
                <div className="text-sm text-gray-400">Fortune 500</div>
              </div>
              
              <div className="absolute -top-6 -right-6 glass-card rounded-xl p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-3xl font-bold gradient-text-cyan">#1</div>
                <div className="text-sm text-gray-400">En IGA 2024</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 text-[#00A3E0] rotate-90" />
        </div>
      </section>

      {/* Stats Section */}
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

      {/* Novedades Section */}
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
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => { setContactType('info'); setContactOpen(true); }}
                      variant="outline"
                      size="sm"
                      className="border-[#00A3E0]/40 text-[#00A3E0] hover:bg-[#00A3E0]/10"
                    >
                      <Info className="w-4 h-4 mr-2" />
                      Más información
                    </Button>
                    <Button 
                      onClick={() => setScheduleOpen(true)}
                      variant="outline"
                      size="sm"
                      className="border-[#6366F1]/40 text-[#6366F1] hover:bg-[#6366F1]/10"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Agendar sesión
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Strategy Section */}
      <section id="vision" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
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

                  <div className="mt-8 flex gap-4">
                    <Button 
                      onClick={() => { setContactType('info'); setContactOpen(true); }}
                      className="btn-primary text-white"
                    >
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
                <Button 
                  onClick={() => setScheduleOpen(true)}
                  className="btn-primary text-white px-8 py-4 rounded-full"
                >
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
                  onClick={() => { setContactType('info'); setContactOpen(true); }}
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

      {/* Partners Section */}
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
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#0066CC] to-[#00A3E0] flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-white">{partner.logo}</span>
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

      {/* SPY App Section */}
      <section id="spy" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="badge-glow text-[#00A3E0] mb-4">
              <ExternalLink className="w-4 h-4 mr-2 inline" />
              Aplicación Interactiva
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              SailPoint <span className="gradient-text">SPY Event</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Explora nuestra aplicación interactiva para descubrir más sobre el evento, 
              participar en actividades y conectar con otros asistentes.
            </p>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="relative aspect-[16/9] w-full">
              <iframe
                src="https://sailpoint-spy-event-ncg2lwcam-rlopezle-9851s-projects.vercel.app/"
                className="absolute inset-0 w-full h-full border-0"
                title="SailPoint SPY Event App"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold mb-1">Aplicación SPY Event</h3>
                <p className="text-gray-400 text-sm">Interactúa con la app en tiempo real</p>
              </div>
              <Button 
                onClick={() => window.open('https://sailpoint-spy-event-ncg2lwcam-rlopezle-9851s-projects.vercel.app/', '_blank')}
                className="btn-primary text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Abrir en nueva pestaña
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Info Section */}
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
                onClick={() => { setContactType('info'); setContactOpen(true); }}
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
              
              {/* Event Info Card */}
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
                  <span className="font-semibold">09:00 - 17:00 CET</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda Section */}
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
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line transform md:-translate-x-1/2" />

            <div className="space-y-8">
              {agendaItems.map((item, index) => (
                <div key={index} className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-[#0066CC] to-[#00A3E0] transform -translate-x-1/2 mt-6 z-10 shadow-lg shadow-[#00A3E0]/50" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                  }`}>
                    <div className="glass-card rounded-xl p-6 card-hover">
                      <div className={`flex items-center gap-2 mb-2 ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}>
                        <Clock className="w-4 h-4 text-[#00A3E0]" />
                        <span className="text-sm text-[#00A3E0] font-semibold">{item.time}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Empty space for other side */}
                  <div className="hidden md:block md:w-5/12" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">
              ¿Tienes preguntas sobre alguna sesión específica?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => { setContactType('info'); setContactOpen(true); }}
                className="btn-primary text-white"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Consultar sobre sesiones
              </Button>
              <Button 
                onClick={() => setScheduleOpen(true)}
                variant="outline"
                className="border-[#00A3E0]/40 text-[#00A3E0] hover:bg-[#00A3E0]/10"
              >
                <Video className="w-4 h-4 mr-2" />
                Agendar follow-up
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              onClick={() => { setContactType('info'); setContactOpen(true); }}
              className="btn-primary text-white px-10 py-6 rounded-full text-lg font-semibold"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Solicitar información
            </Button>
            <Button 
              onClick={() => setScheduleOpen(true)}
              variant="outline"
              className="border-[#00A3E0]/40 text-[#00A3E0] hover:bg-[#00A3E0]/10 px-10 py-6 rounded-full text-lg font-semibold"
            >
              <Video className="w-5 h-5 mr-2" />
              Agendar sesión post-evento
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/images/sailpoint-logo-white.png" 
                  alt="SailPoint" 
                  className="h-12 w-auto"
                />
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

      {/* QR Code Dialog */}
      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="glass border-white/10 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Escanea el <span className="gradient-text">Código QR</span>
            </DialogTitle>
            <DialogDescription className="text-center text-gray-400">
              Accede al microsite desde tu móvil escaneando este código
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center py-6">
            <div className="bg-white p-4 rounded-xl">
              <img 
                src="/images/qr-code.png" 
                alt="QR Code" 
                className="w-48 h-48"
                onError={(e) => {
                  // Fallback si la imagen no existe
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-48 h-48 flex items-center justify-center bg-gray-100 text-gray-500 text-sm text-center p-4">QR Code<br/>Generado dinámicamente</div>';
                  }
                }}
              />
            </div>
            <p className="text-gray-400 text-sm mt-4 text-center">
              O visita directamente:<br/>
              <a href="https://2iqi7hojxgvdi.ok.kimi.link" className="text-[#00A3E0] hover:underline">
                2iqi7hojxgvdi.ok.kimi.link
              </a>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="glass border-white/10 max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              {contactType === 'info' ? 'Solicitar' : 'Agendar'}{' '}
              <span className="gradient-text">Información</span>
            </DialogTitle>
            <DialogDescription className="text-center text-gray-400">
              {contactType === 'info' 
                ? 'Completa tus datos y nos pondremos en contacto contigo.' 
                : 'Agenda una sesión personalizada post-evento con nuestro equipo.'}
            </DialogDescription>
          </DialogHeader>
          
          {submitSuccess ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">¡Solicitud enviada!</h3>
              <p className="text-gray-400">Te contactaremos pronto.</p>
            </div>
          ) : (
            <form className="space-y-4 mt-4" onSubmit={handleContactSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2">Nombre completo *</label>
                <input 
                  type="text" 
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00A3E0] transition-colors"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Correo electrónico *</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00A3E0] transition-colors"
                  placeholder="tu@empresa.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Empresa *</label>
                <input 
                  type="text" 
                  value={formData.empresa}
                  onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00A3E0] transition-colors"
                  placeholder="Nombre de tu empresa"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {contactType === 'info' ? '¿Sobre qué tema necesitas información?' : '¿Qué día prefieres para la sesión?'}
                </label>
                <textarea 
                  value={formData.consulta}
                  onChange={(e) => setFormData({...formData, consulta: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00A3E0] transition-colors resize-none"
                  rows={3}
                  placeholder={contactType === 'info' ? 'Describe tu consulta...' : 'Indica tu disponibilidad...'}
                />
              </div>
              
              {/* Checkbox RGPD */}
              <CheckboxRGPD 
                checked={formData.consentimiento} 
                onChange={(checked) => setFormData({...formData, consentimiento: checked})} 
              />
              
              {submitError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {submitError}
                </div>
              )}
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary text-white py-4 rounded-lg font-semibold mt-6 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  contactType === 'info' ? 'Enviar solicitud' : 'Agendar sesión'
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <DialogContent className="glass border-white/10 max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Agendar <span className="gradient-text">Sesión Post-Evento</span>
            </DialogTitle>
            <DialogDescription className="text-center text-gray-400">
              Programa una sesión personalizada con nuestro equipo técnico o comercial después del evento.
            </DialogDescription>
          </DialogHeader>
          
          {submitSuccess ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">¡Solicitud enviada!</h3>
              <p className="text-gray-400">Te contactaremos pronto para confirmar la fecha.</p>
            </div>
          ) : (
            <form className="space-y-4 mt-4" onSubmit={handleScheduleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2">Nombre completo *</label>
                <input 
                  type="text" 
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00A3E0] transition-colors"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Correo electrónico *</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00A3E0] transition-colors"
                  placeholder="tu@empresa.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Empresa *</label>
                <input 
                  type="text" 
                  value={formData.empresa}
                  onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00A3E0] transition-colors"
                  placeholder="Nombre de tu empresa"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tipo de sesión *</label>
                <select 
                  value={formData.tipoSesion}
                  onChange={(e) => setFormData({...formData, tipoSesion: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00A3E0] transition-colors"
                  required
                >
                  <option value="" className="bg-[#0A1628]">Selecciona el tipo de sesión</option>
                  <option value="demo" className="bg-[#0A1628]">Demo técnica de producto</option>
                  <option value="consultoria" className="bg-[#0A1628]">Consultoría de arquitectura</option>
                  <option value="comercial" className="bg-[#0A1628]">Reunión comercial</option>
                  <option value="partnership" className="bg-[#0A1628]">Información para partners</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Preferencia de fecha/hora</label>
                <textarea 
                  value={formData.disponibilidad}
                  onChange={(e) => setFormData({...formData, disponibilidad: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00A3E0] transition-colors resize-none"
                  rows={2}
                  placeholder="Indica tu disponibilidad (ej: Semana del 28 de abril, mañanas)..."
                />
              </div>
              
              {/* Checkbox RGPD */}
              <CheckboxRGPD 
                checked={formData.consentimiento} 
                onChange={(checked) => setFormData({...formData, consentimiento: checked})} 
              />
              
              {submitError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {submitError}
                </div>
              )}
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary text-white py-4 rounded-lg font-semibold mt-6 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4 mr-2" />
                    Confirmar solicitud
                  </>
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Helper icon component
function CoffeeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 1v3M10 1v3M14 1v3" />
    </svg>
  );
}

export default App;
