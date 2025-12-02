import Layout from "@/components/layout/Layout";
import { Mail, Phone, MapPin } from "lucide-react";

const Contato = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contato@colibrino.com.br",
      href: "mailto:contato@colibrino.com.br"
    },
    {
      icon: Phone,
      label: "Telefone",
      value: "(11) 99999-9999",
      href: "tel:+5511999999999"
    },
    {
      icon: MapPin,
      label: "Localização",
      value: "São Paulo, Brasil",
      href: null
    }
  ];

  return (
    <Layout>
      <section className="py-24 min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Entre em <span className="text-gradient">Contato</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Estamos aqui para ajudar. Entre em contato conosco através dos canais abaixo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="glass-card p-8 text-center hover-lift"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
                  <info.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {info.label}
                </h3>
                {info.href ? (
                  <a 
                    href={info.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-muted-foreground">{info.value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-xl mx-auto glass-card p-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
              Horário de Atendimento
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Segunda - Sexta</span>
                <span className="text-foreground font-medium">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Sábado</span>
                <span className="text-foreground font-medium">09:00 - 13:00</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">Domingo</span>
                <span className="text-foreground font-medium">Fechado</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contato;
