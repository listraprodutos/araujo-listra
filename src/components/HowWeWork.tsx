import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, Handshake, Users, TrendingUp } from "lucide-react";

const HowWeWork = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  const process = [
    {
      number: "1",
      title: "ALINHAMENTO",
      description: "Entendemos onde você está e onde quer chegar",
    },
    {
      number: "2",
      title: "ESTRATÉGIA",
      description: "Definimos o caminho com dados, não achismos",
    },
    {
      number: "3",
      title: "EXECUÇÃO",
      description: "Colocamos em prática com squads ágeis e integrados",
    },
    {
      number: "4",
      title: "OTIMIZAÇÃO",
      description: "Aprendemos, ajustamos, escalamos",
    },
  ];

  const differentials = [
    {
      icon: TrendingUp,
      title: "TI + GROWTH INTEGRADOS",
      description:
        "Quando marketing precisa de tecnologia, nossa TI acelera. Quando TI precisa de estratégia digital, nosso Growth atua. Um só time. Resultados exponenciais.",
    },
    {
      icon: Handshake,
      title: "PARCERIAS DURADOURAS",
      stats: [
        { label: "Epa Supermercados", value: "8 anos" },
        { label: "Mineirão Atacarejo", value: "11 anos" },
        { label: "Brasil Atacarejo", value: "4 anos" },
      ],
      description: "Crescemos COM nossos clientes, não só PARA eles",
    },
    {
      icon: Users,
      title: "VELOCIDADE + GOVERNANÇA",
      description:
        "Entregamos rápido sem abrir mão de qualidade. Versionamento, ambientes segregados, rollback ágil. Prontos para auditoria, compliance e segurança.",
    },
  ];

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % process.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView, process.length]);

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-28"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Mas afinal, por que a Listra?
            <br />
            Não somos fornecedores.
            <br />
            <span className="text-primary">Somos parceiros estratégicos.</span>
          </h2>
        </motion.div>

        {/* Circular Process */}
        <div className="max-w-6xl mx-auto mb-32 mt-16">
          <div className="relative w-full min-h-[600px] flex items-center justify-center">
            {/* Animated connecting circle */}
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] max-w-full"
              viewBox="0 0 600 600"
            >
              <motion.circle
                cx="300"
                cy="300"
                r="200"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeDasharray="1256"
                initial={{ strokeDashoffset: 1256 }}
                animate={isInView ? { strokeDashoffset: 0 } : {}}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center - Evolução Contínua */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
            >
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-2xl relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full bg-primary/20"
                />
                <div className="text-white text-center font-bold relative z-10 flex flex-col items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <RefreshCw size={32} strokeWidth={2.5} />
                  </motion.div>
                  <div className="text-sm mt-2">EVOLUÇÃO</div>
                  <div className="text-sm">CONTÍNUA</div>
                </div>
              </div>
            </motion.div>

            {/* Process Steps positioned in circle */}
            {process.map((step, index) => {
              const angle = (index * 360) / process.length - 90;
              const radius = 250;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              const isActive = activeStep === index;

              return (
                <motion.div
                  key={index}
                  className="absolute top-1/2 left-1/2 z-10"
                  style={{
                    x: x - 120,
                    y: y - 120,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 1 + index * 0.15,
                    type: "spring",
                  }}
                >
                  <motion.div
                    className={`w-60 bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-500 ${
                      isActive ? "border-primary scale-110" : "border-transparent"
                    }`}
                    animate={
                      isActive
                        ? {
                            boxShadow: [
                              "0 10px 30px rgba(125, 40, 247, 0.2)",
                              "0 20px 40px rgba(125, 40, 247, 0.4)",
                              "0 10px 30px rgba(125, 40, 247, 0.2)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-xl"
                        animate={isActive ? { rotate: 360 } : {}}
                        transition={{ duration: 0.8 }}
                      >
                        {step.number}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2 text-primary">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Progress indicator */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 2 }}
            >
              {process.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeStep === index ? "bg-primary w-8" : "bg-primary/30"
                  }`}
                />
              ))}
            </motion.div>
          </div>

          <motion.p
            className="text-center text-lg text-muted-foreground mt-12 font-medium"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 2.5 }}
          >
            Loop contínuo de evolução
          </motion.p>
        </div>

        {/* Differentials */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {differentials.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 2.5 + index * 0.2 }}
              >
                <Card className="h-full bg-white border-2 border-transparent hover:border-primary hover:shadow-2xl transition-all duration-300 group">
                  <CardContent className="pt-10 pb-8 px-8">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-8 h-8 text-primary" strokeWidth={2} />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {diff.title}
                    </h3>
                    
                    {diff.stats && (
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {diff.stats.map((stat, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-2xl font-bold text-primary">{stat.value}</div>
                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {diff.description}
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

export default HowWeWork;
