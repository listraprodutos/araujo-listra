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
      title: "Growth Marketing",
      subtitle: "Estratégia, Performance e Crescimento",
      description: "Apoiamos empresas na geração e retenção de clientes com estratégias orientadas por dados. Atuamos desde o diagnóstico até a execução completa. Tudo integrado à tecnologia para garantir ROI previsível e crescimento sustentável.",
    },
    {
      icon: Shield,
      title: "TI",
      subtitle: "Desenvolvimento, Sustentação e Integrações",
      description: "Entregamos portais, sistemas e integrações com agilidade e governança. Squads ágeis, infraestrutura em nuvem, segurança corporativa e performance contínua.",
    },
    {
      icon: Zap,
      title: "Inteligência Artificial",
      subtitle: "Automação e Soluções Inteligentes",
      description: "Aplicamos IA para gerar eficiência, escala e novas experiências digitais. Automatizamos processos, conectamos sistemas e criamos MVPs e agentes inteligentes que aceleram resultados.",
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

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
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

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 pb-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="snap-start flex-shrink-0 w-[85vw]"
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <Card className="h-full bg-white border-2 border-border rounded-3xl shadow-lg">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7 text-primary" strokeWidth={2} />
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2 text-foreground leading-tight">
                        {service.title}
                      </h3>
                      
                      <p className="text-sm text-primary font-semibold mb-3">
                        {service.subtitle}
                      </p>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
