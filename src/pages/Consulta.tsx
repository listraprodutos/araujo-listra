import { useState, useRef } from "react";
import { motion, Reorder } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus, ShoppingBag, Loader2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const dragConstraintsRef = useRef(null);

  const handleDragEnd = (symptom: Medicine, info: any) => {
    if (bag.length >= 5) {
      toast.error("Máximo de 5 remédios permitidos!");
      return;
    }

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

  const finishConsultation = async () => {
    if (bag.length === 0) {
      toast.error("Adicione pelo menos uma necessidade à sua receita!");
      return;
    }

    setIsGenerating(true);
    toast.loading("Gerando sua imagem personalizada...");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-medicine-bag`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            medicines: bag,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao gerar imagem");
      }

      const data = await response.json();
      setGeneratedImage(data.imageUrl);
      setShowImageDialog(true);
      toast.success("Imagem gerada com sucesso!");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error(
        error instanceof Error ? error.message : "Erro ao gerar imagem. Tente novamente."
      );
    } finally {
      setIsGenerating(false);
      toast.dismiss();
    }
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
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <span className="text-3xl">💊</span>
                      Necessidades Disponíveis
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Selecione até 5 remédios para sua receita
                    </p>
                  </div>

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
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <ShoppingBag className="w-6 h-6 text-primary" />
                      Sua Receita
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {bag.length}/5 remédios selecionados
                    </p>
                  </div>

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
                    disabled={bag.length === 0 || isGenerating}
                    size="lg"
                    className="w-full text-lg py-6"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Gerando Imagem...
                      </>
                    ) : (
                      <>
                        Enviar Receita ({bag.length} {bag.length === 1 ? "remédio" : "remédios"})
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Sua Receita Digital!</DialogTitle>
            <DialogDescription>
              Aqui está a visualização da sua sacola com os remédios selecionados
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            {generatedImage && (
              <img
                src={generatedImage}
                alt="Sacola de remédios gerada"
                className="w-full h-auto rounded-lg"
              />
            )}
          </div>
          <div className="flex gap-4 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowImageDialog(false)}
            >
              Fechar
            </Button>
            <Button
              onClick={() => {
                setShowImageDialog(false);
                toast.success("Receita enviada! Entraremos em contato em breve.");
                setTimeout(() => navigate("/"), 2000);
              }}
            >
              Confirmar e Enviar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Consulta;
