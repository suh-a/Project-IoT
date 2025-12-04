import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/planos", label: "Planos" },
    { href: "/tutorial", label: "Tutorial" },
    { href: "/contato", label: "Contato" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">C</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">Colibrino</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* Show profile links when logged in */}
            {(() => {
              try {
                const auth = useAuth();
                if (auth && auth.user) {
                  return (
                    <>
                      <Button variant="ghost" asChild>
                        <Link to="/desafios">Desafios</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/perfil">Perfil</Link>
                      </Button>
                    </>
                  );
                }
              } catch (e) {
                // If useAuth throws (no provider), fallback to showing login/register
                console.warn("useAuth not available in Navbar:", e);
              }

              return (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/login">Entrar</Link>
                  </Button>
                  <Button variant="hero" asChild>
                    <Link to="/cadastro">Cadastrar</Link>
                  </Button>
                </>
              );
            })()}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium py-2 ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="outline" asChild>
                <Link to="/login" onClick={() => setIsOpen(false)}>Entrar</Link>
              </Button>
              <Button variant="hero" asChild>
                <Link to="/cadastro" onClick={() => setIsOpen(false)}>Cadastrar</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
