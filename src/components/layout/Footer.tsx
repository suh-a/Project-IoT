import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">C</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">Colibrino</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Tecnologia assistiva que transforma movimentos da cabeça em comandos de mouse, 
              proporcionando autonomia e independência.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/planos" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Planos
                </Link>
              </li>
              <li>
                <Link to="/tutorial" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Tutorial
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Conta</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Entrar
                </Link>
              </li>
              <li>
                <Link to="/cadastro" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Cadastrar
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Colibrino. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
