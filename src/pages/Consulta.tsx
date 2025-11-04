import { useState, useRef } from "react";
import { motion, Reorder } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus, ShoppingBag, Loader2, X, Download, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import listraLogo from "@/assets/listra-logo-header.png";
import listraLogo2 from "@/assets/listra-logo-2.png";
import listraLogoColor from "@/assets/listra-logo-color.png";
import listraLogoOverlay from "@/assets/listra-logo-overlay.png";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
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
  { id: "engajamento", label: "Dificuldade em engajar novas gerações", color: "bg-white" },
  { id: "dados", label: "Baixo aproveitamento dos dados", color: "bg-white" },
  { id: "criatividade", label: "Precisamos de ideias mais criativas", color: "bg-white" },
  { id: "conexao", label: "Conexão com o cliente está distante", color: "bg-white" },
  { id: "integracao", label: "Muito canal, pouca integração", color: "bg-white" },
  { id: "jornada", label: "Jornada do cliente mal mapeada", color: "bg-white" },
  { id: "conteudos", label: "Conteúdos com pouco impacto", color: "bg-white" },
  { id: "automacao", label: "Falta automação em pontos-chave", color: "bg-white" },
  { id: "experiencia", label: "A experiência ainda não encanta", color: "bg-white" },
  { id: "relevancia", label: "Estamos perdendo relevância digital", color: "bg-white" },
];

const Consulta = () => {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState(initialSymptoms);
  const [bag, setBag] = useState<Medicine[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showBulaDialog, setShowBulaDialog] = useState(false);
  const [fallingItems, setFallingItems] = useState<string[]>([]);
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

  const handleTapToAdd = (symptom: Medicine) => {
    if (bag.length >= 5) {
      toast.error("Máximo de 5 remédios permitidos!");
      return;
    }
    setBag([...bag, symptom]);
    setSymptoms(symptoms.filter(s => s.id !== symptom.id));
    toast.success(`${symptom.label} adicionado à sua receita!`);
  };

  const addCustomSymptom = () => {
    if (customInput.trim()) {
      const newSymptom = {
        id: `custom-${Date.now()}`,
        label: customInput,
        color: "bg-white",
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

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'receita-digital-araujo.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Imagem salva com sucesso!");
  };

  // Mapeamento de frases originais para nomes de remédios
  const medicineMappings: Record<string, string> = {
    "Dificuldade em engajar novas gerações": "GENZIUM®",
    "Baixo aproveitamento dos dados": "DATANALGINA®",
    "Precisamos de ideias mais criativas": "CRIATIDOL®",
    "Conexão com o cliente está distante": "RELACIONEX®",
    "Muito canal, pouca integração": "OMNILINK®",
    "Jornada do cliente mal mapeada": "MAPPEX®",
    "Conteúdos com pouco impacto": "IMPACTIL®",
    "Falta automação em pontos-chave": "AUTOMAX®",
    "A experiência ainda não encanta": "ENCANTOL®",
    "Estamos perdendo relevância digital": "RELEVAX®"
  };

  // Mapeamento das bulas (descrições) dos remédios
  const bulaDescriptions: Record<string, string> = {
    "GENZIUM®": "Engaja novas gerações com linguagem, canais e conteúdo pensados para o público jovem.",
    "DATANALGINA®": "Transforma dados em decisões estratégicas com análises claras e práticas para marketing e experiência do cliente.",
    "CRIATIDOL®": "Potencializa ideias criativas para campanhas, formatos e conteúdos que fogem do óbvio.",
    "RELACIONEX®": "Reforça a conexão emocional com o cliente, com comunicação mais próxima, empática e constante.",
    "OMNILINK®": "Integra canais físicos e digitais, garantindo uma jornada fluida e consistente para o consumidor.",
    "MAPPEX®": "Mapeia e estrutura a jornada do cliente, identificando pontos de atrito e oportunidades de encantamento.",
    "IMPACTIL®": "Dá força ao conteúdo com mais impacto, criatividade e performance — sem perder o propósito.",
    "AUTOMAX®": "Automatiza processos-chave para ganhar eficiência, escala e previsibilidade.",
    "ENCANTOL®": "Melhora a experiência do usuário com foco em usabilidade, emoção e fidelização.",
    "RELEVAX®": "Fortalece a presença digital contínua da marca, garantindo relevância, atualização e consistência."
  };

  const finishConsultation = async () => {
    if (bag.length === 0) {
      toast.error("Adicione pelo menos uma necessidade à sua receita!");
      return;
    }

    setIsGenerating(true);
    toast.loading("Gerando sua imagem personalizada...");

    try {
      // Mapear as frases para nomes de remédios
      const mappedMedicines = bag.map(med => ({
        ...med,
        medicineName: medicineMappings[med.label] || med.label // Usa o nome mapeado ou o texto original
      }));

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-medicine-bag`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            medicines: mappedMedicines,
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


  const handleCloseSuccess = () => {
    setShowSuccessDialog(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap" rel="stylesheet" />
      
      {/* Header Menu */}
      <header className="bg-listra-footer py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center justify-center relative">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="absolute left-0 text-white hover:bg-primary-foreground/10"
            size="icon"
          >
            <Home className="w-5 h-5" />
          </Button>
          
          <img 
            src={listraLogo} 
            alt="Listra Digital" 
            className="h-10"
          />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              MONTE SUA RECEITA DIGITAL
            </h1>
            <div className="space-y-2 text-lg text-muted-foreground">
              <p className="font-semibold">Todo mineiro já sabe que na Araujo tem tudo.</p>
              <p>Agora é a nossa vez de perguntar: o que falta para vocês?</p>
            </div>
          </motion.div>

          <div 
            ref={dragConstraintsRef}
            className="grid lg:grid-cols-2 gap-6 lg:gap-8"
          >
            {/* Left side - Symptoms */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:order-1 order-2"
            >
              <Card className="h-full">
                <CardContent className="p-6 lg:p-8">
                  <div className="mb-6">
                    <h2 className="text-xl lg:text-2xl font-bold mb-2 flex items-center gap-2">
                      <span className="text-2xl lg:text-3xl">💊</span>
                      Necessidades Disponíveis
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      <span className="hidden lg:inline">Arraste</span>
                      <span className="lg:hidden">Toque</span> até 5 remédios para sua receita
                    </p>
                  </div>

                  <div className="space-y-3 lg:space-y-4 mb-6 max-h-[40vh] lg:max-h-none overflow-y-auto lg:overflow-visible">
                    {symptoms.map((symptom, index) => (
                      <motion.div
                        key={symptom.id}
                        drag={bag.length < 5 ? "y" : false}
                        dragConstraints={dragConstraintsRef}
                        dragElastic={0.1}
                        onDragEnd={(e, info) => handleDragEnd(symptom, info)}
                        whileDrag={{ scale: 1.1, rotate: 5, zIndex: 50 }}
                        initial={{ rotate: index % 2 === 0 ? -2 : 2 }}
                        whileHover={{ rotate: 0, scale: 1.05 }}
                        className={`hidden lg:block ${symptom.color} text-gray-800 px-6 py-4 ${bag.length < 5 ? 'cursor-grab active:cursor-grabbing' : 'cursor-not-allowed opacity-50'} shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all border border-gray-200`}
                        style={{
                          borderRadius: '4px',
                          clipPath: 'polygon(0% 2%, 98% 0%, 100% 98%, 2% 100%)',
                          fontFamily: "'Caveat', cursive",
                        }}
                      >
                        <p className="font-bold text-center text-2xl">{symptom.label}</p>
                      </motion.div>
                    ))}
                    
                    {/* Mobile version - no drag */}
                    {symptoms.map((symptom, index) => (
                      <div
                        key={`mobile-${symptom.id}`}
                        className={`lg:hidden ${symptom.color} text-gray-800 px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all border border-gray-200 relative ${bag.length >= 5 ? 'opacity-50' : ''}`}
                        style={{
                          borderRadius: '4px',
                          clipPath: 'polygon(0% 2%, 98% 0%, 100% 98%, 2% 100%)',
                          fontFamily: "'Caveat', cursive",
                          transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
                        }}
                      >
                        <p className="font-bold text-center text-xl">{symptom.label}</p>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTapToAdd(symptom);
                          }}
                          disabled={bag.length >= 5}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-listra-footer text-white flex items-center justify-center opacity-90 active:opacity-100 transition-opacity disabled:opacity-30"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
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

            {/* Right side - Notebook Paper */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative lg:order-2 order-1"
            >
              <Card 
                id="drop-zone"
                className="h-full border-2 border-gray-300 relative z-10 min-h-[45vh] lg:min-h-0 shadow-xl"
                style={{
                  background: `
                    linear-gradient(to right, 
                      #fef9f3 0px, 
                      #fef9f3 40px, 
                      #ffcccb 40px, 
                      #ffcccb 42px, 
                      #fef9f3 42px, 
                      #fef9f3 100%
                    ),
                    repeating-linear-gradient(
                      to bottom,
                      transparent 0px,
                      transparent 31px,
                      #e8e5dd 31px,
                      #e8e5dd 32px
                    )
                  `,
                  backgroundSize: '100% 100%, 100% 32px',
                  backgroundPosition: '0 0, 0 8px',
                }}
              >
                <CardContent className="p-6 lg:p-8 h-full flex flex-col" style={{ paddingLeft: '60px' }}>
                  <div className="mb-4 lg:mb-6">
                    <div className="flex items-start gap-3 mb-4">
                      <img 
                        src={listraLogo2} 
                        alt="Listra Digital" 
                        className="h-8 w-auto"
                      />
                    </div>
                    <h2 className="text-xl lg:text-2xl font-bold mb-3">
                      Receituário
                    </h2>
                    <p className="text-sm font-semibold mb-2">
                      Nome: Araújo
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {bag.length}/5 necessidades selecionadas {bag.length > 0 && "(clique na palavra para excluir)"}
                    </p>
                  </div>

                  <div className="flex-1 mb-4 lg:mb-6 overflow-y-auto min-h-[200px] lg:min-h-[400px] relative flex flex-col pt-6 lg:pt-12">
                    {bag.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-center" style={{ color: '#999' }}>
                        <div>
                          <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.2rem' }}>Arraste as necessidades aqui</p>
                        </div>
                      </div>
                    ) : (
                      <Reorder.Group axis="y" values={bag} onReorder={setBag} className="space-y-4 w-full">
                          {bag.map((medicine, index) => (
                            <Reorder.Item key={medicine.id} value={medicine}>
                              <motion.div
                                layout
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                onClick={() => removeFromBag(medicine.id)}
                                className="bg-transparent p-2 cursor-pointer hover:opacity-70 transition-opacity"
                                style={{
                                  fontFamily: "'Caveat', cursive",
                                  fontSize: '1.5rem',
                                  color: '#2c3e50',
                                  paddingLeft: '8px',
                                }}
                              >
                                <p className="font-bold">• {medicine.label}</p>
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
                    className="w-full text-base lg:text-lg py-5 lg:py-6"
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
        <DialogContent className="max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 py-4">
            {/* Left side - Text */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <img 
                  src={listraLogoColor} 
                  alt="Listra Digital" 
                  className="h-12 w-auto"
                />
                
                <h2 className="text-2xl font-bold">Essa receita trata os sintomas. Mas a gente quer cuidar da história.</h2>
                
                <div className="space-y-3 text-sm lg:text-base">
                  <p>
                    Os remédios escolhidos já ajudam a aliviar as dores de agora. Mas quando a marca tem 120 anos de legado, o tratamento precisa olhar também pro futuro.
                  </p>
                  
                  <p>
                    E é aí que a Listra entra: não com fórmulas prontas, mas com parceria, investigação e estratégia contínua.
                  </p>
                  
                  <p>
                    Se algum sintoma não apareceu aqui, tudo bem, a gente adora mergulhar fundo, descobrir junto e construir soluções sob medida.
                  </p>
                  
                  <p className="font-semibold">Vamos conversar?</p>
                  
                  <p className="text-listra-footer font-bold">
                    Listra. Há 15 anos criando impacto digital. Juntos.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  onClick={downloadImage}
                  className="flex-1 sm:flex-initial"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Salvar Imagem
                </Button>
                
                <Button
                  variant="default"
                  onClick={() => setShowBulaDialog(true)}
                  className="flex-1 sm:flex-initial"
                >
                  📋 Bula Digital
                </Button>
              </div>
            </div>
            
            {/* Right side - Image */}
            <div className="flex items-center justify-center">
              {generatedImage && (
                <div className="relative w-full max-w-md">
                  <img
                    src={generatedImage}
                    alt="Sacola de remédios gerada"
                    className="w-full h-auto rounded-lg"
                  />
                  <img
                    src={listraLogoOverlay}
                    alt="Listra"
                    className="absolute top-3 right-3 h-8 w-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDialog} onOpenChange={handleCloseSuccess}>
        <DialogContent className="max-w-2xl">
          <div className="flex justify-center pt-6 pb-4">
            <img 
              src={listraLogo2} 
              alt="Listra Digital" 
              className="h-16 w-auto"
            />
          </div>
          <div className="pt-2 space-y-4">
            <h2 className="text-2xl font-bold">Sua receita digital chegou na Listra.</h2>
            <p className="flex items-start gap-2">
              <span>✅</span>
              <span><strong>Status:</strong> Aguardando aprovação para iniciar tratamento</span>
            </p>
            <div>
              <p className="mb-2">Nossa equipe está pronta para preparar a dose certa de:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Estratégia</li>
                <li>Tecnologia</li>
                <li>Criatividade</li>
                <li>Resultado</li>
                <li>Vontade de fazer acontecer</li>
              </ul>
            </div>
            <p>
              <strong>Tempo estimado para retorno:</strong> Assim que vocês quiserem conversar!
            </p>
            <p className="flex items-start gap-2">
              <span>💬</span>
              <span>Ou se preferir, chama a gente no WhatsApp: <a href="https://api.whatsapp.com/send?phone=31990821151" target="_blank" rel="noopener noreferrer" className="font-bold text-listra-footer hover:underline">[31] 99082 1151</a></span>
            </p>
            <p className="text-listra-footer font-bold pt-4">
              💜 Listra Digital - 15 anos criando impacto digital. Juntos.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de Bula Digital */}
      <Dialog open={showBulaDialog} onOpenChange={setShowBulaDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={listraLogoColor} 
                alt="Listra Digital" 
                className="h-10 w-auto"
              />
            </div>
            <DialogTitle className="text-2xl">Bula Digital - Receita Araujo</DialogTitle>
            <DialogDescription>
              Confira abaixo o que cada remédio da sua receita trata
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 pt-4">
            {bag.map((medicine) => {
              const medicineName = medicineMappings[medicine.label] || medicine.label;
              const description = bulaDescriptions[medicineName] || "Solução personalizada para necessidades específicas da sua marca.";
              
              return (
                <div key={medicine.id} className="border-l-4 border-listra-footer pl-4 py-2">
                  <h3 className="text-xl font-bold text-listra-footer mb-2">
                    💊 {medicineName}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    <strong>🩺 O que trata:</strong>
                  </p>
                  <p className="text-base">
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              <strong>💡 Observação:</strong> Cada tratamento é personalizado conforme as necessidades da sua marca. 
              Entre em contato para um diagnóstico completo.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Consulta;
