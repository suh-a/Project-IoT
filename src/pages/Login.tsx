import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    senha: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.senha) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    (async () => {
      try {
        await auth.login(formData.email, formData.senha);
        toast({
          title: "Login realizado!",
          description: "Bem-vindo de volta!",
        });
        setTimeout(() => navigate("/"), 700);
      } catch (err: any) {
        console.error("Login failed:", err);
        toast({
          title: "Erro ao entrar",
          description: err?.message || "Não foi possível efetuar o login.",
          variant: "destructive"
        });
      }
    })();
  };

  return (
    <Layout>
      <section className="py-24 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="glass-card p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                  <LogIn className="w-8 h-8 text-primary-foreground" />
                </div>
                <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                  Entrar
                </h1>
                <p className="text-muted-foreground text-sm">
                  Acesse sua conta Colibrino
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label htmlFor="senha">Senha</Label>
                  <div className="relative">
                    <Input
                      id="senha"
                      name="senha"
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      value={formData.senha}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Entrar
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Não tem uma conta?{" "}
                <Link to="/cadastro" className="text-primary hover:underline">
                  Cadastrar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
