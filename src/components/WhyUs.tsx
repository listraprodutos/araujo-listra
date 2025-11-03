import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Target, Heart } from "lucide-react";
const WhyUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const reasons = [{
    icon: Cpu,
    title: "TECNOLOGIA",
    subtitle: "Stack moderna e eficiente",
    description: "Não usamos tecnologia pela tecnologia. Escolhemos o que traz resultado real. Cloud, IA, automação - tudo com propósito e ROI mensurável.",
    metrics: [{
      value: "15+",
      label: "anos de experiência"
    }, {
      value: "100+",
      label: "projetos entregues"
    }]
  }, {
    icon: Target,
    title: "ESTRATÉGIA",
    subtitle: "Data-driven, sempre",
    description: "Cada decisão baseada em dados. Cada ação com KPI claro. Transparência total: você vê onde está indo cada real investido e qual retorno está gerando.",
    metrics: [{
      value: "ROI",
      label: "sempre rastreável"
    }, {
      value: "360°",
      label: "visão do negócio"
    }]
  }, {
    icon: Heart,
    title: "MINEIRIDADE",
    subtitle: "De BH, para Minas",
    description: "15 anos em BH não são 15 anos em qualquer lugar. Entendemos o peso da tradição, o valor da confiança, o compromisso de fazer certo. Como vocês.",
    metrics: [{
      value: "BH",
      label: "desde 2011"
    }, {
      value: "100%",
      label: "mineiro"
    }]
  }];
  return <section ref={ref} className="py-32 bg-gradient-to-b from-background to-muted/50">
      
    </section>;
};
export default WhyUs;