import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  MousePointer2, 
  Settings2, 
  BarChart3, 
  Sparkles, 
  Lightbulb,
  ArrowRight,
  Check
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: MousePointer2,
      title: "Controle com movimentos da cabeça",
      description: "Utiliza sensores ultraleves que captam movimentos suaves da cabeça para substituir o uso tradicional do mouse com as mãos."
    },
    {
      icon: Settings2,
      title: "Personalização para cada usuário",
      description: "Cada Colibrino pode ser ajustado para diferentes necessidades, incluindo sensibilidade dos sensores e ângulo de captura."
    },
    {
      icon: BarChart3,
      title: "Monitoramento e evolução",
      description: "Acompanha o uso diário, registrando precisão e tempo de navegação para avaliar evolução motora e cognitiva."
    },
    {
      icon: Sparkles,
      title: "Conforto e praticidade",
      description: "Leve e confortável, adapta-se ao formato da cabeça. Conexão simples via Bluetooth com diversos dispositivos."
    },
    {
      icon: Lightbulb,
      title: "Indicadores visuais",
      description: "LEDs mostram status do dispositivo, nível de bateria, emparelhamento e feedback dos comandos."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Tecnologia Assistiva Inovadora</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-delay-1">
              <span className="text-foreground">Liberdade com </span>
              <span className="text-gradient">Colibrino</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-delay-2">
              Um mouse acessível e inteligente para pessoas que controlam o computador 
              por meio de movimentos da cabeça. Autonomia e independência ao seu alcance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
              <Button variant="hero" size="xl" asChild>
                <Link to="/planos">
                  Ver Planos
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/tutorial">Como Funciona</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is Colibrino Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              O que é o <span className="text-gradient">Colibrino</span>?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              O Colibrino é um mouse acessível e inteligente, especialmente desenvolvido para 
              pessoas que não podem usar as mãos e controlam o computador por meio de movimentos 
              da cabeça. É uma tecnologia assistiva que transforma movimentos sutis da cabeça em 
              comandos de mouse, proporcionando autonomia e independência para quem tem mobilidade 
              reduzida nas mãos.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Funcionalidades <span className="text-gradient-accent">Principais</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Projetado para oferecer a melhor experiência de acessibilidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-card p-6 hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Por que escolher o <span className="text-gradient">Colibrino</span>?
              </h2>
              <ul className="space-y-4">
                {[
                  "Controle preciso através de movimentos da cabeça",
                  "Personalização completa para suas necessidades",
                  "Conexão via Bluetooth com qualquer dispositivo",
                  "Relatórios de evolução e progresso",
                  "Design leve e ergonômico",
                  "Suporte técnico especializado"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/planos">
                    Começar Agora
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-accent animate-pulse-glow flex items-center justify-center">
                  <MousePointer2 className="w-24 h-24 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Pronto para conquistar sua <span className="text-gradient-accent">independência</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Comece hoje mesmo e descubra como o Colibrino pode transformar sua experiência digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/planos">Ver Planos</Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/contato">Fale Conosco</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
