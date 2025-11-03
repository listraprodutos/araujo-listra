import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GameCTA = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-araujo-blue/5 to-primary/5 border-2 border-primary/20 rounded-3xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-10 lg:p-16">
                <div className="text-center space-y-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <Stethoscope className="w-10 h-10 text-primary" strokeWidth={2} />
                    </div>
                  </motion.div>

                  <div className="space-y-4">
                    <p className="text-lg text-muted-foreground">
                      Antes de você ir embora... a gente queria perguntar:
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-bold text-primary">
                      O QUE AINDA FALTA PARA VOCÊS?<br />
                      ONDE DÓI?
                    </h2>
                  </div>

                  <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                    Acredito que para esse tipo de remédio<br />
                    você está no lugar certo!
                  </p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Button
                      onClick={() => navigate('/consulta')}
                      size="lg"
                      className="text-lg px-12 py-7 h-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group"
                    >
                      <Stethoscope className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      ACESSAR CONSULTA
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GameCTA;
