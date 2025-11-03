import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import araujoTemImage from "@/assets/araujo-tem-transparent.png";

const AraujoTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timeline = [
    { year: "1906", event: "Fundação" },
    { year: "1933", event: "1ª drogaria 24h de BH" },
    { year: "1963", event: "1º telemarketing do Brasil" },
    { year: "1990", event: "1º drive-thru" },
    { year: "HOJE", event: "Modelo drugstore inovador" },
  ];

  const stats = [
    { value: "99%", label: "DOS MINEIROS\nconhecem vocês" },
    { value: "87%", label: "TÊM RELAÇÃO\npositiva" },
    { value: "47%", label: "CITAM VÍNCULO\nemocional" },
    { value: "360", label: "LOJAS\nem 65 cidades", unit: "" },
    { value: "17%", label: "CRESCIMENTO\nprojetado 2025" },
    { value: "12", label: "MIL\ncolaboradores", unit: "MIL" },
  ];

  return (
    <section ref={ref} className="py-24 bg-araujo-blue-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-araujo-blue">
            ❤️ 120 ANOS CONSTRUINDO CONFIANÇA
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="relative py-8">
            {/* Blue Line (until 80% - where HOJE is) */}
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-araujo-blue"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
              style={{ transformOrigin: "left", width: "80%" }}
            />

            {/* Transition gradient (where blue meets purple) */}
            <motion.div
              className="absolute top-1/2 h-1 bg-gradient-to-r from-araujo-blue to-primary"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.8, ease: "easeInOut" }}
              style={{ transformOrigin: "left", left: "80%", width: "10%" }}
            />

            {/* Purple Line (continues forward with dots) */}
            <motion.div
              className="absolute top-1/2 h-1"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 2.5, ease: "easeInOut" }}
              style={{ 
                transformOrigin: "left", 
                left: "90%", 
                width: "10%",
                backgroundImage: "repeating-linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) 50%, transparent 50%, transparent 100%)",
                backgroundSize: "20px 1px"
              }}
            />
            
            {/* Glowing effect on blue line */}
            <motion.div
              className="absolute top-1/2 left-0 h-1 w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
              animate={isInView ? {
                left: ["0%", "80%"],
                opacity: [0, 1, 1, 0]
              } : {}}
              transition={{
                duration: 2,
                delay: 0.5,
                ease: "easeInOut",
                times: [0, 0.1, 0.9, 1]
              }}
            />

            {/* Timeline Items */}
            <div className="relative flex justify-between items-center" style={{ width: "80%" }}>
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center z-10"
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.3 + index * 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {/* Pulsing dot */}
                  <motion.div
                    className="relative mb-4"
                    animate={isInView ? {
                      scale: [1, 1.2, 1]
                    } : {}}
                    transition={{
                      duration: 2,
                      delay: 1 + index * 0.2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <div className={`w-8 h-8 rounded-full shadow-lg ${item.year === "HOJE" ? "bg-primary" : "bg-araujo-blue"}`} />
                    <motion.div
                      className={`absolute inset-0 rounded-full ${item.year === "HOJE" ? "bg-primary" : "bg-araujo-blue"}`}
                      animate={isInView ? {
                        scale: [1, 1.5, 2],
                        opacity: [0.5, 0.3, 0]
                      } : {}}
                      transition={{
                        duration: 2,
                        delay: 1 + index * 0.2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="text-center bg-white px-4 py-3 rounded-xl shadow-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
                  >
                    <motion.div 
                      className={`text-3xl font-bold mb-1 ${item.year === "HOJE" ? "text-primary" : "text-araujo-blue"}`}
                      initial={{ scale: 0.5 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.6 + index * 0.2,
                        type: "spring"
                      }}
                    >
                      {item.year}
                    </motion.div>
                    <div className="text-xs sm:text-sm text-foreground max-w-[100px] sm:max-w-[120px] font-medium">
                      {item.event}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Next Chapter Text - aligned to the right */}
          <motion.div
            className="text-right mt-12 ml-auto max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 3.2 }}
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              E O PRÓXIMO CAPÍTULO?
            </h3>
            <p className="text-lg sm:text-xl text-foreground">
              120 anos de história merecem um parceiro<br />
              que pense os próximos 120 juntos
            </p>
          </motion.div>
        </div>

        {/* Closing Section with blue card and overlapping image */}
        <div className="relative max-w-6xl mx-auto mt-20">
          <motion.div
            className="bg-araujo-blue rounded-3xl p-12 space-y-8 max-w-4xl"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <div className="text-center space-y-2">
              <p className="text-2xl sm:text-3xl font-bold text-white">
                Vocês são um patrimônio dos mineiros.
              </p>
              <p className="text-xl sm:text-2xl font-semibold text-white/90">
                E patrimônios assim merecem parceiros que entendam:
              </p>
            </div>

            <div className="space-y-4">
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/40 cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                <div className="flex items-center gap-3 text-white">
                  <span className="text-2xl">→</span>
                  <span className="text-lg font-medium">Como manter conexão com novas gerações</span>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/40 cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 2.0 }}
              >
                <div className="flex items-center gap-3 text-white">
                  <span className="text-2xl">→</span>
                  <span className="text-lg font-medium">Como escalar mantendo a mineiridade</span>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/40 cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 2.2 }}
              >
                <div className="flex items-center gap-3 text-white">
                  <span className="text-2xl">→</span>
                  <span className="text-lg font-medium">Como inovar sem perder a essência</span>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/40 cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 2.4 }}
              >
                <div className="flex items-center gap-3 text-white">
                  <span className="text-2xl">→</span>
                  <span className="text-lg font-medium">Como integrar físico + digital + saúde</span>
                </div>
              </motion.div>
            </div>

            <motion.p 
              className="text-xl sm:text-2xl font-bold text-white text-center pt-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 2.6 }}
            >
              É por isso que queremos fazer parte dessa história.
            </motion.p>
          </motion.div>

          {/* Image overlapping the right side of the card */}
          <motion.div
            className="absolute right-0 top-0 w-64 lg:w-80 z-10 hidden md:block"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <img 
              src={araujoTemImage} 
              alt="Araujo Tem Pra Tudo - App Mobile" 
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AraujoTimeline;
