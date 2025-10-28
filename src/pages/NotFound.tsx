import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import logoCad from "../assets/log-cad.webp";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4" 
      style={{ 
        background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)' 
      }}>
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-6">
          <img 
            src={logoCad} 
            alt="CATOLID" 
            className="w-32 h-32 mx-auto object-contain opacity-50"
          />
          
          <div className="space-y-4">
            <h1 
              className="text-8xl font-bold animate-pulse"
              style={{ color: 'hsl(var(--primary))' }}
            >
              404
            </h1>
            <h2 
              className="text-2xl font-semibold"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              Página não encontrada
            </h2>
            <p 
              className="text-base"
              style={{ color: 'hsl(var(--muted-foreground))' }}
            >
              A página que você está procurando não existe ou foi movida.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 font-semibold"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
              color: 'hsl(var(--primary-foreground))'
            }}
          >
            <Home className="w-4 h-4" />
            Voltar ao Início
          </Button>
          
          <Button
            onClick={() => navigate('/search')}
            variant="outline"
            className="flex items-center gap-2 font-semibold"
            style={{
              borderColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary))'
            }}
          >
            <Search className="w-4 h-4" />
            Buscar Carteirinha
          </Button>
        </div>

        <p 
          className="text-sm"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          Caminho tentado: <span className="font-mono">{location.pathname}</span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
