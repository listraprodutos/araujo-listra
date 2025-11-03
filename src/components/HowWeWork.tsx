import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
const HowWeWork = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [activeStep, setActiveStep] = useState(0);
  const process = [{
    number: "1",
    title: "ALINHAMENTO",
    description: "Entendemos onde você está e onde quer chegar"
  }, {
    number: "2",
    title: "ESTRATÉGIA",
    description: "Definimos o caminho com dados, não achismos"
  }, {
    number: "3",
    title: "EXECUÇÃO",
    description: "Colocamos em prática com squads ágeis e integrados"
  }, {
    number: "4",
    title: "OTIMIZAÇÃO",
    description: "Aprendemos, ajustamos, escalamos"
  }];
  const differentials = [{
    emoji: "⚡",
    title: "TI + GROWTH INTEGRADOS",
    description: "Quando marketing precisa de tecnologia, nossa TI acelera\nQuando TI precisa de estratégia digital, nosso Growth atua\nUm só time. Resultados exponenciais."
  }, {
    emoji: "🤝",
    title: "PARCERIAS DURADOURAS",
    description: "EPA: 8 anos juntos\nUnidas: 11 anos\nMills: 4 anos\nCrescemos COM nossos clientes, não só PARA eles"
  }, {
    emoji: "🛡️",
    title: "VELOCIDADE + GOVERNANÇA",
    description: "Entregamos rápido sem abrir mão de qualidade\nVersionamento, ambientes segregados, rollback ágil\nProntos para auditoria, compliance e segurança"
  }];

  // Cycle through steps automatically
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % process.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView, process.length]);
  return <section ref={ref} className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-28" initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6
      }}>
          <motion.div className="inline-block mb-4 px-6 py-2 bg-primary/10 rounded-full" initial={{
          scale: 0
        }} animate={isInView ? {
          scale: 1
        } : {}} transition={{
          duration: 0.5,
          delay: 0.2
        }}>
            <span className="text-primary font-bold text-sm">🔄 NOSSA METODOLOGIA</span>
          </motion.div>
          <h2 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
            NÃO SOMOS FORNECEDORES<br />
            <span className="text-gradient">SOMOS PARCEIROS ESTRATÉGICOS</span>
          </h2>
        </motion.div>

        {/* Circular Process with Animation */}
        <div className="max-w-6xl mx-auto mb-24 mt-16">
          <div className="relative w-full h-[600px] flex items-center justify-center">
            {/* Animated connecting circle */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" viewBox="0 0 600 600">
              <motion.circle cx="300" cy="300" r="200" fill="none" stroke="url(#gradient)" strokeWidth="3" strokeDasharray="1256" initial={{
              strokeDashoffset: 1256
            }} animate={isInView ? {
              strokeDashoffset: 0
            } : {}} transition={{
              duration: 2,
              delay: 0.5
            }} />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center - Evolução Contínua */}
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" initial={{
            scale: 0,
            rotate: -180
          }} animate={isInView ? {
            scale: 1,
            rotate: 0
          } : {}} transition={{
            duration: 0.8,
            delay: 0.8,
            type: "spring"
          }}>
              <div className="w-40 h-40 rounded-full gradient-hero flex items-center justify-center shadow-2xl relative">
                <motion.div animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5]
              }} transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }} className="absolute inset-0 rounded-full bg-primary/20 my-0 mx-[76px]" />
                <div className="text-white text-center font-bold relative z-10 flex flex-col items-center">
                  <motion.div animate={{
                  rotate: 360
                }} transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}>
                    <RefreshCw size={32} strokeWidth={2.5} />
                  </motion.div>
                  <div className="text-sm mt-2">EVOLUÇÃO</div>
                  <div className="text-sm">CONTÍNUA</div>
                </div>
              </div>
            </motion.div>

            {/* Process Steps positioned in circle */}
            {process.map((step, index) => {
            const angle = index * 360 / process.length - 90;
            const radius = 250;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            const isActive = activeStep === index;
            return <motion.div key={index} className="absolute top-1/2 left-1/2 z-10" style={{
              x: x - 120,
              y: y - 120
            }} initial={{
              opacity: 0,
              scale: 0
            }} animate={isInView ? {
              opacity: 1,
              scale: 1
            } : {}} transition={{
              duration: 0.6,
              delay: 1 + index * 0.15,
              type: "spring"
            }}>
                  <motion.div className={`w-60 bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-500 ${isActive ? "border-primary scale-110" : "border-transparent"}`} animate={isActive ? {
                boxShadow: ["0 10px 30px rgba(125, 40, 247, 0.2)", "0 20px 40px rgba(125, 40, 247, 0.4)", "0 10px 30px rgba(125, 40, 247, 0.2)"]
              } : {}} transition={{
                duration: 1.5,
                repeat: Infinity
              }}>
                    <div className="flex items-start gap-4">
                      <motion.div className="flex-shrink-0 w-14 h-14 rounded-full gradient-hero flex items-center justify-center text-white font-bold text-xl" animate={isActive ? {
                    rotate: 360
                  } : {}} transition={{
                    duration: 0.8
                  }}>
                        {step.number}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2 text-primary">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>;
          })}

            {/* Progress indicator */}
            <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2" initial={{
            opacity: 0
          }} animate={isInView ? {
            opacity: 1
          } : {}} transition={{
            delay: 2
          }}>
              {process.map((_, index) => <div key={index} className={`w-2 h-2 rounded-full transition-all duration-300 ${activeStep === index ? "bg-primary w-8" : "bg-primary/30"}`} />)}
            </motion.div>
          </div>

          <motion.p className="text-center text-lg text-muted-foreground mt-12 font-medium" initial={{
          opacity: 0
        }} animate={isInView ? {
          opacity: 1
        } : {}} transition={{
          delay: 2.5
        }}>
            Loop contínuo de evolução
          </motion.p>
        </div>

        {/* Differentials */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {differentials.map((diff, index) => {
          return <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} animate={isInView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.6,
            delay: 2.5 + index * 0.2
          }}>
                <Card className="h-full bg-white border-2 border-transparent hover:border-primary hover:shadow-2xl transition-all duration-300 group">
                  <CardContent className="pt-8">
                    <motion.div className="text-5xl mb-6" whileHover={{
                  scale: 1.2,
                  rotate: 10
                }} transition={{
                  type: "spring",
                  stiffness: 300
                }}>
                      {diff.emoji}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {diff.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {diff.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>;
        })}
        </div>
      </div>
    </section>;
};
export default HowWeWork;