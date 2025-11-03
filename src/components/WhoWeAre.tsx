import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import seloIcon from "@/assets/selo.png";

const WhoWeAre = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      title: "ESTRATÉGIA & GROWTH MARKETING",
      subtitle: "Pensamos crescimento constantemente",
      description: "Estratégias data-driven baseadas em diagnóstico profundo. Tráfego pago (Google, Meta, LinkedIn, TikTok), SEO e conteúdo estratégico, branding e posicionamento, automação, CRM e retenção, dashboards e análise contínua.",
      footer: "Não vendemos 'X posts/mês'\nVendemos crescimento com ROI previsível",
    },
    {
      title: "SOLUÇÕES EM TI",
      subtitle: "Construímos o que o crescimento exige",
      description: "Squads ágeis (dedicados ou compartilhados), portais, plataformas e integrações, infraestrutura cloud (AWS, Azure), DevOps, CI/CD e governança, integrações ERP, CRM, e-commerce, sustentação contínua com SLA.",
      footer: "Velocidade de startup\nGovernança de corporação",
    },
    {
      title: "IA PARA NEGÓCIOS",
      subtitle: "Inteligência que amplifica resultados",
      description: "Diagnóstico e estratégia de IA aplicada, automação inteligente de processos, produtos e MVPs com IA, agentes e chatbots avançados, integrações com sistemas internos.",
      footer: "IA que gera eficiência real\nNão apenas tecnologia pela tecnologia",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="text-primary">MINEIROS COMO VOCÊS</span>
            </h2>
            <div className="relative w-24 h-24 flex-shrink-0">
              <img 
                src={seloIcon} 
                alt="Selo Lovable" 
                className="w-full h-full"
              />
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-snug">
            Somos uma empresa de Belo Horizonte que há 15 anos conecta TI e Growth Marketing para impulsionar negócios. Acreditamos em inovação com propósito.
          </p>
        </motion.div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full bg-white border border-gray-200 rounded-3xl hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-8">
                    {/* Icon circle */}
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <div className="w-6 h-6 rounded-sm border-2 border-primary" />
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 text-foreground leading-tight">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm text-primary font-semibold mb-4">
                      {service.subtitle}
                    </p>
                    
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <p className="font-semibold text-sm text-foreground whitespace-pre-line leading-relaxed">
                        {service.footer}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 pb-4">
            {services.map((service, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex-shrink-0 w-[85vw]"
                >
                  <Card className="h-full bg-white border border-gray-200 rounded-3xl hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-8">
                      {/* Icon circle */}
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        <div className="w-6 h-6 rounded-sm border-2 border-primary" />
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2 text-foreground leading-tight">
                        {service.title}
                      </h3>
                      
                      <p className="text-sm text-primary font-semibold mb-4">
                        {service.subtitle}
                      </p>
                      
                      <p className="text-sm text-gray-500 leading-relaxed mb-6">
                        {service.description}
                      </p>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <p className="font-semibold text-sm text-foreground whitespace-pre-line leading-relaxed">
                          {service.footer}
                        </p>
                      </div>
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
