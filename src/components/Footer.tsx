import listraLogo from "@/assets/listra-logo-white.png";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 bg-[#8b39ef] text-white/90 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <img 
            src={listraLogo} 
            alt="Listra Digital" 
            className="h-12 mx-auto mb-2"
          />
          <div className="text-lg font-medium text-white/80">
            15 anos criando impacto digital. Juntos.
          </div>
          <div className="text-sm text-white/60 pt-6 border-t border-white/10 max-w-xs mx-auto">
            © 2025 Listra Digital. Belo Horizonte - MG
          </div>
        </div>
        
        <div className="absolute bottom-6 right-6 flex items-center gap-2 text-sm text-white/70">
          <span>feito com</span>
          <Heart className="w-4 h-4 text-white fill-white" />
          <span>para Araújo</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
