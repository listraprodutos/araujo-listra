import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const BHForMinas = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-araujo-blue-soft to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">
              <span className="text-gradient">💜 DE BH PARA MINAS</span>
            </h2>
          </motion.div>

          <motion.div
            className="space-y-8 text-lg sm:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-center">
              <span className="font-bold">Desde 2011 em Belo Horizonte.</span><br />
              15 anos entendendo o jeito mineiro de fazer negócio.
            </p>

            <p className="text-center text-muted-foreground">
              Assim como a Araujo nasceu em 1906 quando BH tinha apenas 9 anos,<br />
              nós crescemos junto com a transformação digital de Minas.
            </p>

            <div className="h-px bg-gradient-hero my-12 max-w-xs mx-auto" />

            <div className="space-y-6 text-center">
              <p className="font-semibold text-xl">
                Não vamos "estudar" a mineiridade.<br />
                Nós <span className="text-gradient">VIVEMOS</span> ela todos os dias.
              </p>

              <div className="space-y-4 text-muted-foreground">
                <p>Conhecemos o orgulho de ter a Araujo na esquina.</p>
                <p>Conhecemos a confiança que o nome de vocês carrega.</p>
                <p>Conhecemos o compromisso que 120 anos exigem.</p>
              </div>
            </div>

            <div className="h-px bg-gradient-hero my-12 max-w-xs mx-auto" />

            <div className="text-center space-y-6">
              <p className="text-xl">
                E é por isso que queremos fazer parte dessa história.<br />
                Não para contar pra vocês como fazer.<br />
                Mas para construir <span className="font-bold text-gradient">JUNTO</span> o próximo capítulo.
              </p>

              <motion.div
                className="pt-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="text-3xl font-bold mb-2">LISTRA</div>
                <div className="text-muted-foreground">15 anos criando impacto digital. Juntos.</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BHForMinas;
