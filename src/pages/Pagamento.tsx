import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Pagamento = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planoId = searchParams.get("plano");

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    email: "",
    telefone: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: ""
  });

  const plans: Record<string, { name: string; price: string }> = {
    basico: { name: "Básico", price: "R$ 50/mês" },
    pro: { name: "Pro", price: "R$ 150/mês" },
    premium: { name: "Premium", price: "R$ 250/mês" }
  };

  const selectedPlan = planoId ? plans[planoId] : null;

  useEffect(() => {
    if (!planoId || !selectedPlan) {
      navigate("/planos");
    }
  }, [planoId, selectedPlan, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = Object.entries(formData);
    const emptyFields = requiredFields.filter(([_, value]) => !value.trim());
    
    if (emptyFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pagamento processado!",
      description: `Seu plano ${selectedPlan?.name} foi ativado com sucesso.`,
    });

    setTimeout(() => navigate("/"), 2000);
  };

  if (!selectedPlan) return null;

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            className="mb-8"
            onClick={() => navigate("/planos")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos planos
          </Button>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="glass-card p-8">
                <h1 className="font-display text-2xl font-bold text-foreground mb-6">
                  Dados de Pagamento
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <h2 className="font-semibold text-foreground border-b border-border pb-2">
                      Dados Pessoais
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nomeCompleto">Nome Completo</Label>
                        <Input
                          id="nomeCompleto"
                          name="nomeCompleto"
                          placeholder="Seu nome completo"
                          value={formData.nomeCompleto}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          name="cpf"
                          placeholder="000.000.000-00"
                          value={formData.cpf}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          name="telefone"
                          placeholder="(00) 00000-0000"
                          value={formData.telefone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-4">
                    <h2 className="font-semibold text-foreground border-b border-border pb-2">
                      Endereço
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="rua">Rua</Label>
                        <Input
                          id="rua"
                          name="rua"
                          placeholder="Rua, número, complemento"
                          value={formData.rua}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bairro">Bairro</Label>
                        <Input
                          id="bairro"
                          name="bairro"
                          placeholder="Seu bairro"
                          value={formData.bairro}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cep">CEP</Label>
                        <Input
                          id="cep"
                          name="cep"
                          placeholder="00000-000"
                          value={formData.cep}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input
                          id="cidade"
                          name="cidade"
                          placeholder="Sua cidade"
                          value={formData.cidade}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="estado">Estado</Label>
                        <Input
                          id="estado"
                          name="estado"
                          placeholder="UF"
                          value={formData.estado}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Finalizar Pagamento
                  </Button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  Resumo do Pedido
                </h2>
                
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground">
                      Plano {selectedPlan.name}
                    </span>
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-gradient">
                    {selectedPlan.price}
                  </p>
                </div>

                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Dispositivo Colibrino incluso
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Garantia de 12 meses
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Frete grátis
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pagamento;
