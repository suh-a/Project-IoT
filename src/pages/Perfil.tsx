import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, Calendar, Gamepad2, LogOut } from "lucide-react";

const Perfil = () => {
  const { user, userData, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) {
    return (
      <Layout>
        <section className="py-24 min-h-[80vh] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Carregando...</div>
        </section>
      </Layout>
    );
  }

  if (!user) return null;

  return (
    <Layout>
      <section className="py-24 min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8">
              <div className="text-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-primary-foreground" />
                </div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                  {userData?.name || user.displayName || "Usuário"}
                </h1>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Membro desde</p>
                    <p className="text-foreground">
                      {userData?.createdAt 
                        ? new Date(userData.createdAt).toLocaleDateString("pt-BR")
                        : new Date(user.metadata.creationTime || "").toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button variant="hero" asChild className="w-full">
                  <Link to="/desafios">
                    <Gamepad2 className="w-4 h-4 mr-2" />
                    Ir para Desafios
                  </Link>
                </Button>
                
                <Button variant="outline" onClick={handleLogout} className="w-full">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair da conta
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Perfil;
