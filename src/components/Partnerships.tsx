import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Award, CheckCircle } from "lucide-react";
import dmaLogoMain from "@/assets/dma-logo-main.png";
import unidasLogoMain from "@/assets/unidas-logo-main.png";
import millsLogoMain from "@/assets/mills-logo-main.png";
import varejaoLogo from "@/assets/varejao-logo.png";
import conquestLogo from "@/assets/conquest-logo.png";

const Partnerships = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const mainPartner = {
    company: "DMA Distribuidora",
    duration: "8 anos de parceria",
    industry: "Estratégia, TI, Growth Marketing, IA",
    testimonial:
      "Falar da Listra seria como falar de parte da nossa empresa. É assim que sentimos. Estamos trabalhando juntos desde o início dos nossos projetos digitais. A disponibilidade e o comprometimento da equipe, sempre se envolvendo nas nossas necessidades como se fossem deles, muitas vezes até antecipando e propondo novos caminhos, nos leva a essa relação e a ter tal sentimento. Poderíamos ficar escrevendo linhas e linhas de adjetivos em relação a competência, dedicação e profissionalismo, mas o que temos resumidamente a dizer é, muito obrigado a todos profissionais que fazem parte dessa empresa, 'que é parte da nossa empresa'.",
    author: "Roberto Gosende",
    role: "Diretor",
    results: [
      { metric: "+1000%", label: "crescimento redes sociais" },
      { metric: "30% +", label: "acessos no novo site/mês" },
      { metric: "3.500.000", label: "visualizações stories/mês" },
      { metric: "1 milhão", label: "leads campanha de aniversário 2021" },
    ],
  };

  const otherPartners = [
    {
      company: "Unidas",
      duration: "13 anos de parceria",
      industry: "Squad de TI e UX/UI",
      testimonial:
        "Ter um braço extra que nos possibilite entregas ágeis, inovadoras e assertivas é o sonho de todo time de marketing. Para nós, a Listra representa exatamente isso: são verdadeiros parceiros e estão conosco há anos, sempre entregando com alto nível e mergulhando de cabeça nos nossos projetos digitais. Agradecemos a todo o time da Listra pelo comprometimento de sempre, vamos juntos!",
      author: "Erika Araujo",
      role: "Diretora de Mídia e BI",
      logo: unidasLogoMain,
    },
  ];

  const additionalPartners = [
    {
      company: "Mills",
      duration: "4 anos de parceria",
      industry: "Growth Marketing, TI e UX/UI",
      logo: millsLogoMain,
    },
    {
      company: "Varejão das Tintas",
      duration: "1 ano de parceria",
      industry: "Growth Marketing, TI e IA",
      logo: varejaoLogo,
    },
    {
      company: "Conquest Internet",
      duration: "5 anos de parceria",
      industry: "Growth Marketing, TI",
      logo: conquestLogo,
    },
  ];

  return (
    <section ref={ref} className="pt-16 pb-32 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Award className="w-12 h-12 text-primary" strokeWidth={2} />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="text-primary">PARCERIAS DURADOURAS</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Relacionamentos de longo prazo que provam nosso compromisso
          </p>
        </motion.div>

        {/* Main Partnership Card */}
        <motion.div
          className="max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-white border-2 border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden">
            <CardContent className="p-10 lg:p-12 relative">
              <img 
                src={dmaLogoMain} 
                alt="DMA Distribuidora" 
                className="absolute top-8 right-8 h-16 w-auto object-contain"
              />
              <div className="mb-8">
                <h3 className="text-4xl font-bold mb-3">{mainPartner.company}</h3>
                <div className="flex flex-wrap gap-3 text-base text-muted-foreground">
                  <span className="font-semibold text-primary">{mainPartner.duration}</span>
                  <span>•</span>
                  <span>{mainPartner.industry}</span>
                </div>
              </div>

              <blockquote className="text-xl leading-relaxed mb-8 text-foreground italic border-l-4 border-primary pl-6">
                "{mainPartner.testimonial}"
              </blockquote>

              <div className="mb-8">
                <div className="font-bold text-lg text-foreground">{mainPartner.author}</div>
                <div className="text-base text-muted-foreground">{mainPartner.role}</div>
              </div>

              <div className="mt-10 pt-10 border-t-2 border-border">
                <div className="font-bold text-xl mb-6 text-primary">Resultados entregues:</div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mainPartner.results.map((result, index) => (
                    <motion.div
                      key={index}
                      className="text-center p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-4xl font-bold text-primary mb-2">{result.metric}</div>
                      <div className="text-sm text-muted-foreground">{result.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Other Partners */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {otherPartners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
            >
              <Card className="h-full bg-white border-2 border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 rounded-3xl">
                <CardContent className="p-8 relative">
                  {partner.logo && (
                    <img 
                      src={partner.logo} 
                      alt={partner.company} 
                      className="absolute top-6 right-6 h-12 w-auto object-contain"
                    />
                  )}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-primary" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{partner.company}</h3>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <span className="font-semibold text-primary">{partner.duration}</span>
                        <span>•</span>
                        <span>{partner.industry}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-base leading-relaxed mb-6 italic text-muted-foreground">
                    "{partner.testimonial}"
                  </p>

                  <div className="pt-4 border-t border-border">
                    <div className="font-bold text-sm">{partner.author}</div>
                    <div className="text-sm text-muted-foreground">{partner.role}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Additional Partners Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="h-full bg-white border-2 border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 rounded-3xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {additionalPartners.map((partner, index) => (
                    <div 
                      key={index} 
                      className={`flex items-start gap-4 ${index !== additionalPartners.length - 1 ? 'pb-6 border-b border-border' : ''}`}
                    >
                      <img 
                        src={partner.logo} 
                        alt={partner.company} 
                        className="h-10 w-auto object-contain flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">{partner.company}</h3>
                        <p className="text-sm font-semibold text-primary mb-1">{partner.duration}</p>
                        <p className="text-sm text-muted-foreground">{partner.industry}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Closing Text */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl p-12 border border-primary/20">
            <p className="text-2xl lg:text-3xl leading-relaxed font-medium">
              Construímos relações de longo prazo.
              <br />
              Porque crescimento real leva tempo.
              <br />E parceria verdadeira se prova com{" "}
              <span className="text-primary font-bold">consistência</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partnerships;
