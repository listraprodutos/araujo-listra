import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const Partnerships = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const mainPartner = {
    company: "MILLS",
    duration: "4 anos de parceria",
    industry: "E-commerce",
    testimonial:
      "A parceria com a Listra transformou completamente nossa presença digital. A equipe demonstrou profundo conhecimento técnico e entendimento estratégico do nosso negócio, entregando soluções que realmente fazem diferença nos resultados.",
    author: "Carlos Silva",
    role: "Diretor de TI",
    results: [
      "60% redução de custos de infraestrutura",
      "4x mais velocidade em publicação de conteúdo",
      "40% melhoria em métricas de SEO",
      "Migração completa modernizada",
    ],
  };

  const otherPartners = [
    {
      company: "EPA SUPERMERCADOS",
      duration: "8 anos de parceria",
      industry: "Varejo",
      testimonial:
        "A abordagem data-driven e o foco em performance trouxeram crescimento consistente",
      author: "Roberto Mendes",
      role: "Head de Digital",
    },
    {
      company: "UNIDAS SEMINOVOS",
      duration: "11 anos de parceria",
      industry: "Automotivo",
      testimonial:
        "Ter um braço extra que possibilita entregas ágeis e inovadoras é o sonho de todo time de marketing",
      author: "Erika Araujo",
      role: "Gerente de Mídia e BI",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-gradient">🤝 PARCERIAS DURADOURAS</span>
          </h2>
        </motion.div>

        {/* Main Partnership Card */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-white border border-border hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8 sm:p-12">
              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-2">{mainPartner.company}</h3>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="font-semibold">{mainPartner.duration}</span>
                  <span>•</span>
                  <span>{mainPartner.industry}</span>
                </div>
              </div>

              <p className="text-lg leading-relaxed mb-6 text-foreground italic">
                "{mainPartner.testimonial}"
              </p>

              <div className="mb-6">
                <div className="font-semibold text-foreground">{mainPartner.author}</div>
                <div className="text-sm text-muted-foreground">{mainPartner.role}</div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <div className="font-semibold mb-4">Resultados:</div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {mainPartner.results.map((result, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Other Partners */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {otherPartners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              >
                <Card className="h-full bg-white border border-border hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{partner.company}</h3>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-6">
                    <span className="font-semibold">{partner.duration}</span>
                    <span>•</span>
                    <span>{partner.industry}</span>
                  </div>

                  <p className="text-sm leading-relaxed mb-6 italic">"{partner.testimonial}"</p>

                  <div>
                    <div className="font-semibold text-sm">{partner.author}</div>
                    <div className="text-xs text-muted-foreground">{partner.role}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Closing Text */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-xl sm:text-2xl leading-relaxed">
            Construímos relações de longo prazo.<br />
            Porque crescimento real leva tempo.<br />
            E parceria verdadeira se prova com <span className="text-gradient font-bold">consistência</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Partnerships;
