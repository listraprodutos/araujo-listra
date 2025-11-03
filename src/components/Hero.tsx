import { motion } from "framer-motion";
import araujoLogo from "@/assets/araujo-logo.svg";
import listraLogo from "@/assets/listra-logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Color Merge Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Araujo Blue from Left */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full bg-araujo-blue origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        
        {/* Listra Purple from Right */}
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-full bg-listra-purple origin-right"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        
        {/* Blend Overlay in Center */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.5) 0%, transparent 40%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />
        
        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, hsl(217, 100%, 33%) 0%, hsl(258, 90%, 66%) 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />

        {/* Glow Effects */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-araujo-blue/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-listra-purple/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Logos Fixed at Color Meeting Point */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center gap-12 sm:gap-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.img
          src={araujoLogo}
          alt="Araujo"
          className="h-16 sm:h-20 w-auto"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        />
        <motion.div
          className="text-6xl text-white/80"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.1, type: "spring", stiffness: 200 }}
        >
          &
        </motion.div>
        <motion.img
          src={listraLogo}
          alt="Listra"
          className="h-12 sm:h-16 w-auto"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center pt-48">

          {/* Main Title */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
          >
            120 ANOS MERECEM<br />UM PARCEIRO QUE<br />PENSA JUNTO
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7, duration: 0.8 }}
          >
            <p className="mb-4">Não queremos só entregar campanhas.</p>
            <p className="font-semibold">Queremos construir o futuro da marca mais mineira de todas.</p>
          </motion.div>


          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.8 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
