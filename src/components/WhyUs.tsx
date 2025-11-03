import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Target, Heart } from "lucide-react";

const WhyUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    { icon: Cpu, title: "TECNOLOGIA", subtitle: "Stack moderna e eficiente", description: "Não usamos tecnologia pela tecnologia. Escolhemos o que traz resultado real. Cloud, IA, automação - tudo com propósito e ROI mensurável.", metrics: [{ value: "15+", label: "anos de experiência" }, { value: "100+", label: "projetos entregues" }] },
    { icon: Target, title: "ESTRATÉGIA", subtitle: "Data-driven, sempre", description: "Cada decisão baseada em dados. Cada ação com KPI claro. Transparência total: você vê onde está indo cada real investido e qual retorno está gerando.", metrics: [{ value: "ROI", label: "sempre rastreável" }, { value: "360°", label: "visão do negócio" }] },
    { icon: Heart, title: "MINEIRIDADE", subtitle: "De BH, para Minas", description: "15 anos em BH não são 15 anos em qualquer lugar. Entendemos o peso da tradição, o valor da confiança, o compromisso de fazer certo. Como vocês.", metrics: [{ value: "BH", label: "desde 2011" }, { value: "100%", label: "mineiro" }] },
  ];

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">POR QUE ACREDITAMOS<br /><span className="text-primary">NESSA CONVERSA</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Três pilares que nos tornam o parceiro ideal para a Araujo</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.2 }}>
                <Card className="h-full bg-white border-2 border-border hover:border-primary rounded-3xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-10">
                    <motion.div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300" whileHover={{ rotate: 5 }}>
                      <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{reason.title}</h3>
                    <p className="text-lg text-primary font-semibold mb-4">{reason.subtitle}</p>
                    <p className="text-base text-muted-foreground leading-relaxed mb-6">{reason.description}</p>
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                      {reason.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-3xl font-bold text-primary mb-1">{metric.value}</div>
                          <div className="text-sm text-muted-foreground">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.9 }}>
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl p-12 border border-primary/20">
            <h3 className="text-3xl font-bold mb-6">PRONTOS PARA A PRÓXIMA ETAPA</h3>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">Não queremos apenas participar do processo seletivo.<br />Queremos construir o futuro digital da Araujo ao lado de vocês.</p>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              {["Diagnóstico completo", "Roadmap estratégico", "Execução ágil", "Parceria de longo prazo"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
