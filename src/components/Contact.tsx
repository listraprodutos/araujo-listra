import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">
              🤝 VAMOS CONVERSAR?
            </h2>

            <p className="text-xl leading-relaxed text-muted-foreground mb-12">
              Esta é nossa manifestação criativa de interesse<br />
              para fazer parte da próxima fase da Araujo.
            </p>

            <div className="space-y-4 text-lg">
              <p>Estamos prontos para a segunda etapa.</p>
              <p>Prontos para mergulhar no desafio.</p>
              <p className="font-semibold">Prontos para pensar, criar e executar ao lado de vocês.</p>
            </div>
          </motion.div>

          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto mx-auto block text-lg px-12 py-6 h-auto bg-araujo-blue hover:bg-araujo-blue/90 text-white"
            >
              <a href="mailto:paixaopelaaraujo@araujo.com.br">
                📧 JÁ MANIFESTAMOS NOSSO INTERESSE
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-white border border-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  💬 QUER CONVERSAR ANTES DA SEGUNDA ETAPA?
                </h3>

                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-xl font-bold mb-4">Listra Digital</div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted">
                      <div className="text-xs text-muted-foreground mb-1">📧 E-mail</div>
                      <a 
                        href="mailto:contato@listradigital.com.br"
                        className="text-sm font-medium hover:text-primary"
                      >
                        contato@listradigital.com.br
                      </a>
                    </div>

                    <div className="p-4 rounded-xl bg-muted">
                      <div className="text-xs text-muted-foreground mb-1">💬 WhatsApp</div>
                      <a
                        href="https://wa.me/5531999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:text-primary"
                      >
                        (31) 99999-9999
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
