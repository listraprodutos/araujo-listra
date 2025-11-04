import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { LogOut, Loader2 } from "lucide-react";

interface Receita {
  id: string;
  medicines: any;
  created_at: string;
  image_url: string | null;
  user_agent: string | null;
  ip_address: string | null;
}

const Admin = () => {
  const { isAdmin, loading: adminLoading, user } = useAdmin();
  const navigate = useNavigate();
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!adminLoading && !user) {
      navigate('/auth');
    }
    
    if (!adminLoading && user && !isAdmin) {
      toast.error("Acesso negado. Você não é administrador.");
      navigate('/');
    }
  }, [isAdmin, adminLoading, user, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchReceitas();
    }
  }, [isAdmin]);

  const fetchReceitas = async () => {
    try {
      const { data, error } = await supabase
        .from('receitas_digitais')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReceitas(data || []);
    } catch (error: any) {
      console.error('Erro ao buscar receitas:', error);
      toast.error("Erro ao carregar receitas");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (adminLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  // Estimate image generation cost (aproximado)
  const estimatedCostPerImage = 0.04; // USD por imagem (exemplo)
  const totalImages = receitas.filter(r => r.image_url).length;
  const totalCost = (totalImages * estimatedCostPerImage).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Painel Admin</h1>
            <p className="text-gray-600 mt-1">
              Bem-vindo, {user?.email}
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Total de Receitas
            </h3>
            <p className="text-3xl font-bold">{receitas.length}</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Imagens Geradas
            </h3>
            <p className="text-3xl font-bold">{totalImages}</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Custo Estimado
            </h3>
            <p className="text-3xl font-bold">${totalCost}</p>
            <p className="text-xs text-gray-500 mt-1">
              ~${estimatedCostPerImage} por imagem
            </p>
          </Card>
        </div>

        {/* Receitas Table */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Receitas Geradas</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Data/Hora</th>
                  <th className="text-left py-3 px-4">Medicamentos</th>
                  <th className="text-left py-3 px-4">Imagem</th>
                  <th className="text-left py-3 px-4">User Agent</th>
                </tr>
              </thead>
              <tbody>
                {receitas.map((receita) => (
                  <tr key={receita.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">
                      {new Date(receita.created_at).toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="max-w-md whitespace-normal break-words">
                        {typeof receita.medicines === 'string' 
                          ? receita.medicines 
                          : JSON.stringify(receita.medicines)}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {receita.image_url ? (
                        <a
                          href={receita.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Ver imagem
                        </a>
                      ) : (
                        <span className="text-gray-400">Sem imagem</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      <div className="max-w-xs truncate">
                        {receita.user_agent || 'N/A'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {receitas.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhuma receita gerada ainda
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;