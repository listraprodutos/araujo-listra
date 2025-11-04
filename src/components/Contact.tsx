import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageCircle } from "lucide-react";
const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section ref={ref} className="py-32 bg-gradient-to-b from-background to-araujo-blue-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.6
        }}>
            <Card className="bg-white border-2 border-border rounded-3xl hover:shadow-xl transition-all duration-300">
              <CardContent className="p-10">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <MessageCircle className="w-8 h-8 text-primary" strokeWidth={2} />
                  <h3 className="text-2xl font-bold text-center">
                    QUER CONVERSAR ANTES DA SEGUNDA ETAPA?
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-xl font-bold mb-1">Listra Digital</div>
                    <div className="text-sm text-muted-foreground">
                      15 anos criando impacto digital
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <motion.a href="mailto:contato@listradigital.com.br" className="p-6 rounded-2xl bg-muted hover:bg-primary/10 transition-colors group border-2 border-transparent hover:border-primary/20" whileHover={{
                    scale: 1.02
                  }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Mail className="w-5 h-5 text-primary" strokeWidth={2} />
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">E-mail</div>
                      </div>
                      <div className="text-base font-semibold group-hover:text-primary transition-colors">
                        contato@listradigital.com.br
                      </div>
                    </motion.a>

                    <motion.a href="https://wa.me/5531999999999" target="_blank" rel="noopener noreferrer" className="p-6 rounded-2xl bg-muted hover:bg-primary/10 transition-colors group border-2 border-transparent hover:border-primary/20" whileHover={{
                    scale: 1.02
                  }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <MessageCircle className="w-5 h-5 text-primary" strokeWidth={2} />
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">WhatsApp</div>
                      </div>
                      <div className="text-base font-semibold group-hover:text-primary transition-colors">
                        (31) 99999-9999
                      </div>
                    </motion.a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Contact;