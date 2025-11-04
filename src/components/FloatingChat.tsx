import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleConsultaClick = () => {
    navigate('/consulta');
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-16 h-16 shadow-2xl hover:shadow-3xl transition-all bg-listra-footer hover:bg-listra-footer/90 text-white"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
        <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-full shadow-md">
          Consulta online
        </span>
      </motion.div>

      {/* Chat Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-28 right-8 z-40 bg-white rounded-2xl shadow-2xl p-6 max-w-sm border border-gray-200"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-gray-900">
                  Quais os sintomas vocês possuem? Onde dói?
                </h3>
                <p className="text-gray-600">
                  Onde dói?
                </p>
              </div>
              
              <Button
                onClick={handleConsultaClick}
                className="w-full bg-listra-footer hover:bg-listra-footer/90 text-white"
                size="lg"
              >
                Acessar Consulta
              </Button>
            </div>

            {/* Triangle pointer */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-200" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;
