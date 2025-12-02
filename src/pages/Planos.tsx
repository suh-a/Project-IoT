import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Check, X, Sparkles } from "lucide-react";

const Planos = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "basico",
      name: "Básico",
      price: "R$ 50",
      period: "/mês",
      description: "Ideal para começar",
      features: [
        { text: "Dispositivo Colibrino", included: true },
        { text: "Controle por movimento de cabeça", included: true },
        { text: "Conexão Bluetooth", included: false },
        { text: "Suporte por email", included: true },
        { text: "Relatórios básicos", included: true },
        { text: "Personalização avançada", included: false },
        { text: "Suporte prioritário", included: false },
        { text: "Treinamento personalizado", included: false },
      ],
      popular: false
    },
    {
      id: "pro",
      name: "Pro",
      price: "R$ 150",
      period: "/mês",
      description: "Mais recursos e suporte",
      features: [
        { text: "Dispositivo Colibrino", included: true },
        { text: "Controle por movimento de cabeça", included: true },
        { text: "Conexão Bluetooth", included: true },
        { text: "Suporte por email e telefone", included: true },
        { text: "Relatórios completos", included: true },
        { text: "Personalização avançada", included: true },
        { text: "Suporte prioritário", included: true },
        { text: "Treinamento personalizado", included: false },
      ],
      popular: true
    },
    {
      id: "premium",
      name: "Premium",
      price: "R$ 250",
      period: "/mês",
      description: "Experiência completa",
      features: [
        { text: "Dispositivo Colibrino Premium", included: true },
        { text: "Controle por movimento de cabeça", included: true },
        { text: "Conexão Bluetooth e Wi-Fi", included: true },
        { text: "Suporte 24/7", included: true },
        { text: "Relatórios avançados com IA", included: true },
        { text: "Personalização total", included: true },
        { text: "Suporte prioritário VIP", included: true },
        { text: "Treinamento personalizado", included: true },
      ],
      popular: false
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    navigate(`/pagamento?plano=${planId}`);
  };

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Escolha seu <span className="text-gradient">Plano</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Selecione o plano ideal para suas necessidades e comece sua jornada de independência.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative glass-card p-8 flex flex-col ${
                  plan.popular ? "border-primary ring-2 ring-primary/20" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary to-highlight px-4 py-1 rounded-full flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary-foreground" />
                      <span className="text-sm font-semibold text-primary-foreground">
                        Mais Popular
                      </span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-display text-4xl font-bold text-gradient">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-muted/20 flex items-center justify-center">
                          <X className="w-3 h-3 text-muted-foreground" />
                        </div>
                      )}
                      <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  size="lg"
                  className="w-full"
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  Escolher Plano
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Planos;
