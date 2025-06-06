import { api } from "./api";

export type Avaliacao = {
  email: string;
  id: string;
  autor: string;
  comentario: string;
  nota: number;
  dataCriacao: string;
  usuarioId: string;
  abrigoId?: string; 
};

export const AvaliacaoService = {
  listarPorAbrigo: async (abrigoId: string): Promise<Avaliacao[]> => {
    try {
      const response = await api.get(`/avaliacoes/abrigo/${abrigoId}`);
      console.log("Avaliações carregadas:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar avaliações por abrigo:", error);
      throw error;
    }
  },

  listarMinhas: async (token: string): Promise<Avaliacao[]> => {
    try {
      const response = await api.get("/avaliacoes/minhas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Minhas avaliações:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar minhas avaliações:", error);
      throw error;
    }
  },

  criar: async (
    dados: { abrigoId: string; comentario: string; nota: number },
    token: string
  ): Promise<Avaliacao> => {
    try {
      const response = await api.post("/avaliacoes", dados, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Avaliação criada:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar avaliação:", error);
      throw error;
    }
  },

editar: async (
  id: string,
  dados: { comentario: string; nota: number; abrigoId: string },
  token: string
): Promise<Avaliacao> => {
  try {
    const response = await api.put(`/avaliacoes/${id}`, dados, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Avaliação editada:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar avaliação", error);
    throw error;
  }
},


  deletar: async (id: string, token: string): Promise<void> => {
    try {
      await api.delete(`/avaliacoes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Avaliação excluída:", id);
    } catch (error) {
      console.error("Erro ao excluir avaliação:", error);
      throw error;
    }
  },
};
