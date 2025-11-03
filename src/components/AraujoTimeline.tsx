import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Store, Users, TrendingUp, Sparkles, Smartphone } from "lucide-react";
import araujoTemImage from "@/assets/araujo-tem-transparent.png";
import araujoALogo from "@/assets/araujo-a-logo.png";

const AraujoTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeYear, setActiveYear] = useState(2);

  const timeline = [
    { year: "1904", title: "A Fundação", description: "Nasceu em BH quando a cidade tinha apenas 7 anos", icon: Store },
    { year: "1933", title: "Expansão", description: "Primeira filial. Começou a história de crescimento", icon: Users },
    { year: "1950", title: "Inovação", description: "Pioneiros em varejo farmacêutico em Minas", icon: TrendingUp },
    { year: "1980", title: "Consolidação", description: "Referência absoluta em saúde e bem-estar", icon: Sparkles },
    { year: "2024", title: "Digital", description: "Araujo Tem: tecnologia encontra tradição", icon: Smartphone },
  ];

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-background to-araujo-blue-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-20" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center gap-8 mb-6 flex-wrap">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center">120 ANOS CONSTRUINDO<br /><span className="text-araujo-blue">CONFIANÇA</span></h2>
            <img src={araujoALogo} alt="Logo Araujo" className="w-24 h-24 sm:w-32 sm:h-32 object-contain" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">Uma história de pioneirismo que merece um parceiro à altura</p>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 hidden lg:block z-0" />
            <motion.div className="absolute top-1/2 left-0 h-1 bg-araujo-blue -translate-y-1/2 hidden lg:block z-0" initial={{ width: 0 }} animate={isInView ? { width: `${(activeYear / (timeline.length - 1)) * 100}%` } : {}} transition={{ duration: 1.5, delay: 0.5 }} />

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeYear === index;
                return (
                  <motion.div key={index} className="relative flex flex-col items-center cursor-pointer z-20" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.1 }} onMouseEnter={() => setActiveYear(index)}>
                    <motion.div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 relative transition-all duration-300 ${isActive ? "bg-araujo-blue text-white shadow-lg scale-110" : "bg-white border-2 border-border text-muted-foreground hover:border-araujo-blue"}`} whileHover={{ scale: 1.1 }}>
                      <Icon className="w-8 h-8" strokeWidth={2} />
                    </motion.div>
                    <div className={`text-2xl font-bold mb-2 transition-colors ${isActive ? "text-araujo-blue" : "text-foreground"}`}>{item.year}</div>
                    <motion.div className="text-center" initial={{ height: 0, opacity: 0 }} animate={isActive ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </motion.div>
                    {!isActive && <h3 className="font-semibold text-base text-center">{item.title}</h3>}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Next Chapter */}
        <motion.div className="max-w-6xl mx-auto mt-32" initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.8 }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-araujo-blue text-white rounded-3xl p-10 lg:p-12">
              <h3 className="text-3xl lg:text-4xl font-bold mb-8">É O PRÓXIMO CAPÍTULO</h3>
              <div className="space-y-6">
                {["Pensa junto, não apenas executa", "Entende a responsabilidade de 120 anos", "Cresce COM vocês, não só PARA vocês", "Combina velocidade com governança", "É mineiro como vocês"].map((text, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
                    <p className="text-lg leading-relaxed"><span className="font-bold">{text.split(',')[0]}</span>{text.includes(',') ? ',' + text.split(',')[1] : ''}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-white/20"><p className="text-xl font-bold">Queremos ser esse parceiro.</p></div>
            </div>
            <motion.div className="relative" initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 1 }}>
              <div className="relative max-w-sm mx-auto"><img src={araujoTemImage} alt="Araujo Tem Pra Tudo - App Mobile" className="w-full h-auto" /></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AraujoTimeline;
