import { useState, useRef } from "react";
import { motion, Reorder } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Medicine {
  id: string;
  label: string;
  color: string;
}

const initialSymptoms = [
  { id: "criatividade", label: "Criatividade", color: "bg-purple-500" },
  { id: "integracao", label: "Integração de Dados", color: "bg-blue-500" },
  { id: "automacao", label: "Automação", color: "bg-green-500" },
  { id: "estrategia", label: "Estratégia Digital", color: "bg-yellow-500" },
  { id: "ia", label: "Inteligência Artificial", color: "bg-pink-500" },
  { id: "cloud", label: "Cloud Computing", color: "bg-indigo-500" },
];

const Consulta = () => {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState(initialSymptoms);
  const [bag, setBag] = useState<Medicine[]>([]);
  const [customInput, setCustomInput] = useState("");
  const dragConstraintsRef = useRef(null);

  const handleDragEnd = (symptom: Medicine, info: any) => {
    const dropZone = document.getElementById("drop-zone");
    if (!dropZone) return;

    const rect = dropZone.getBoundingClientRect();
    const x = info.point.x;
    const y = info.point.y;

    if (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    ) {
      setBag([...bag, symptom]);
      setSymptoms(symptoms.filter(s => s.id !== symptom.id));
      toast.success(`${symptom.label} adicionado à sua receita!`);
    }
  };

  const addCustomSymptom = () => {
    if (customInput.trim()) {
      const colors = ["bg-red-500", "bg-orange-500", "bg-teal-500", "bg-cyan-500"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const newSymptom = {
        id: `custom-${Date.now()}`,
        label: customInput,
        color: randomColor,
      };
      
      setSymptoms([...symptoms, newSymptom]);
      setCustomInput("");
      toast.success("Nova necessidade adicionada!");
    }
  };

  const removeFromBag = (id: string) => {
    const medicine = bag.find(m => m.id === id);
    if (medicine) {
      setBag(bag.filter(m => m.id !== id));
      setSymptoms([...symptoms, medicine]);
    }
  };

  const finishConsultation = () => {
    if (bag.length === 0) {
      toast.error("Adicione pelo menos uma necessidade à sua receita!");
      return;
    }
    toast.success("Receita enviada! Entraremos em contato em breve.");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Monte Sua Receita Digital
            </h1>
            <p className="text-xl text-muted-foreground">
              Arraste as necessidades para a sacola ou adicione as suas próprias
            </p>
          </motion.div>

          <div 
            ref={dragConstraintsRef}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Left side - Symptoms */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="text-3xl">💊</span>
                    Necessidades Disponíveis
                  </h2>

                  <div className="space-y-4 mb-6">
                    {symptoms.map((symptom) => (
                      <motion.div
                        key={symptom.id}
                        drag
                        dragConstraints={dragConstraintsRef}
                        dragElastic={0.1}
                        onDragEnd={(e, info) => handleDragEnd(symptom, info)}
                        whileDrag={{ scale: 1.1, rotate: 5, zIndex: 50 }}
                        className={`${symptom.color} text-white p-4 rounded-xl cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl transition-shadow`}
                      >
                        <p className="font-bold text-center">{symptom.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <p className="font-semibold text-sm text-muted-foreground">
                      Adicionar necessidade customizada:
                    </p>
                    <div className="flex gap-2">
                      <Input
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addCustomSymptom()}
                        placeholder="Ex: SEO, E-commerce..."
                        className="flex-1"
                      />
                      <Button
                        onClick={addCustomSymptom}
                        size="icon"
                        disabled={!customInput.trim()}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right side - Bag */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card 
                id="drop-zone"
                className="h-full border-4 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-background"
              >
                <CardContent className="p-8 h-full flex flex-col">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                    Sua Receita
                  </h2>

                  <div className="flex-1 space-y-4 mb-6 overflow-y-auto min-h-[300px]">
                    {bag.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                        <div>
                          <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-20" />
                          <p>Arraste as necessidades aqui</p>
                        </div>
                      </div>
                    ) : (
                      <Reorder.Group axis="y" values={bag} onReorder={setBag}>
                        {bag.map((medicine) => (
                          <Reorder.Item key={medicine.id} value={medicine}>
                            <motion.div
                              layout
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className={`${medicine.color} text-white p-4 rounded-xl shadow-lg mb-3 cursor-pointer hover:shadow-xl transition-shadow`}
                              onClick={() => removeFromBag(medicine.id)}
                            >
                              <p className="font-bold text-center">{medicine.label}</p>
                              <p className="text-xs text-center text-white/80 mt-1">
                                Clique para remover
                              </p>
                            </motion.div>
                          </Reorder.Item>
                        ))}
                      </Reorder.Group>
                    )}
                  </div>

                  <Button
                    onClick={finishConsultation}
                    disabled={bag.length === 0}
                    size="lg"
                    className="w-full text-lg py-6"
                  >
                    Enviar Receita ({bag.length} {bag.length === 1 ? "remédio" : "remédios"})
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consulta;
