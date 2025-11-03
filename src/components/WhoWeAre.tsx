import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, Shield, Zap } from "lucide-react";
import seloIcon from "@/assets/selo.png";

const WhoWeAre = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Layers,
      title: "DIVERSAS FRENTES",
      subtitle: "Não fazemos uma coisa só",
      description: "Estratégia & Growth Marketing, Desenvolvimento de Soluções em TI, Inteligência Artificial para negócios. Um parceiro completo para todas as frentes digitais.",
    },
    {
      icon: Shield,
      title: "SEGURANÇA",
      subtitle: "Governança que funciona",
      description: "Ambientes segregados, versionamento completo, rollback ágil. Velocidade de startup com governança de corporação. Prontos para auditoria e compliance.",
    },
    {
      icon: Zap,
      title: "ALTERNATIVA",
      subtitle: "Não é mais do mesmo",
      description: "TI + Growth integrados em um só time. Quando marketing precisa de tecnologia, nossa TI acelera. Quando TI precisa de estratégia, nosso Growth atua. Resultados exponenciais.",
    },
  ];

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-6 mb-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="text-foreground">MINEIROS COMO VOCÊS</span>
            </h2>
            <div className="relative w-20 h-20 flex-shrink-0">
              <img 
                src={seloIcon} 
                alt="Selo" 
                className="w-full h-full"
              />
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Somos uma empresa de Belo Horizonte que há 15 anos conecta TI e Growth Marketing para impulsionar negócios. Acreditamos em inovação com propósito.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="h-full bg-white border-2 border-border hover:border-primary/50 rounded-3xl hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8 lg:p-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-8 h-8 text-primary" strokeWidth={2} />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-foreground leading-tight">
                      {service.title}
                    </h3>
                    
                    <p className="text-base text-primary font-semibold mb-4">
                      {service.subtitle}
                    </p>
                    
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
