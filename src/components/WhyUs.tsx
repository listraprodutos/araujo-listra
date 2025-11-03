import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const WhyUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background to-araujo-blue-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">
              🤝 POR QUE ACREDITAMOS<br />NESSA CONVERSA
            </h2>

            <p className="text-xl sm:text-2xl leading-relaxed mb-8">
              Porque construir o futuro de uma marca centenária<br />
              exige mais do que execução.
            </p>

            <div className="text-lg sm:text-xl space-y-4 text-muted-foreground">
              <p>Exige quem entenda de:</p>
              <div className="grid sm:grid-cols-3 gap-6 mt-8">
                <motion.div
                  className="p-6 bg-white rounded-2xl card-elevated"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="text-2xl font-bold text-primary mb-2">Tecnologia</div>
                  <div className="text-sm">que escala</div>
                </motion.div>
                <motion.div
                  className="p-6 bg-white rounded-2xl card-elevated"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="text-2xl font-bold text-primary mb-2">Estratégia</div>
                  <div className="text-sm">que conecta gerações</div>
                </motion.div>
                <motion.div
                  className="p-6 bg-white rounded-2xl card-elevated"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <div className="text-2xl font-bold text-primary mb-2">Mineiridade</div>
                  <div className="text-sm">que é autêntica</div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="pt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">
              🚀 PRONTOS PARA A PRÓXIMA ETAPA
            </h3>
            <div className="text-lg sm:text-xl space-y-4 text-muted-foreground">
              <p>Esta página é nossa forma de dizer:</p>
              <p className="text-2xl font-bold text-gradient">
                "Queremos muito fazer parte dessa história"
              </p>
              <div className="mt-8 space-y-2">
                <p>Agora, queremos ouvir vocês.</p>
                <p>Entender os desafios.</p>
                <p className="font-semibold">Pensar soluções juntos.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
