import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Heart } from "lucide-react";
const BHForMinas = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section ref={ref} className="py-20 bg-gradient-to-b from-araujo-blue-soft to-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-araujo-blue rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 30
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6
        }}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <Heart className="w-12 h-12 text-listra-footer" strokeWidth={2} fill="currentColor" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                <span className="text-listra-footer">DE BH PARA MINAS</span>
              </h2>
            </div>
          </motion.div>

          <motion.div className="space-y-12 text-lg sm:text-xl leading-relaxed" initial={{
          opacity: 0,
          y: 30
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.3
        }}>
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-3xl p-10 border-2 border-border">
              <MapPin className="w-10 h-10 text-listra-footer mx-auto mb-4" strokeWidth={2} />
              <p className="text-2xl">
                <span className="font-bold">Desde 2011 em Belo Horizonte.</span>
                <br />
                <span className="text-muted-foreground">
                  15 anos entendendo o jeito mineiro de fazer negócio.
                </span>
              </p>
            </div>

            <p className="text-center text-xl text-muted-foreground">
              Assim como a Araujo nasceu em 1906 quando BH tinha apenas 9 anos,
              <br />
              nós crescemos junto com a transformação digital de Minas.
            </p>

            <div className="h-1 bg-gradient-to-r from-transparent via-listra-footer to-transparent my-16 max-w-xs mx-auto" />

            <div className="space-y-8 text-center">
              

              <div className="grid sm:grid-cols-3 gap-6 mt-12">
                {["Conhecemos o orgulho de ter a Araujo na esquina", "Conhecemos a confiança que o nome Araújo carrega", "Conhecemos o compromisso que 120 anos exigem"].map((text, index) => <motion.div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-border" initial={{
                opacity: 0,
                y: 20
              }} animate={isInView ? {
                opacity: 1,
                y: 0
              } : {}} transition={{
                duration: 0.6,
                delay: 0.6 + index * 0.1
              }} whileHover={{
                scale: 1.05
              }}>
                    <p className="text-base text-muted-foreground">{text}</p>
                  </motion.div>)}
              </div>
            </div>

            <div className="h-1 bg-gradient-to-r from-transparent via-listra-footer to-transparent my-16 max-w-xs mx-auto" />

            <div className="text-center space-y-8">
              <p className="text-2xl font-medium">
                Estamos prontos, Araújo!
                <br />
                Prontos para pensar, criar e executar ao lado de vocês!
                <br />
                Vamos juntos?
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default BHForMinas;