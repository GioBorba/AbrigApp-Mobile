import { api } from "./api";

export const AvaliacaoService = {
  listarPorAbrigo: async (abrigoId: string) => {
    try {
      const response = await api.get(`/avaliacoes/abrigo/${abrigoId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar avaliações por abrigo:", error);
      throw error;
    }
  },

  listarMinhas: async (token: string) => {
    try {
      const response = await api.get("/avaliacoes/minhas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao listar minhas avaliações:", error);
      throw error;
    }
  },

  criar: async (dados: {
    abrigoId: string;
    comentario: string;
    nota: number;
  }, token: string) => {
    try {
      const response = await api.post("/avaliacoes", dados, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar avaliação:", error);
      throw error;
    }
  },

  editar: async (id: string, dados: {
    comentario: string;
    nota: number;
  }, token: string) => {
    try {
      const response = await api.put(`/avaliacoes/${id}`, dados, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao editar avaliação:", error);
      throw error;
    }
  },

  deletar: async (id: string, token: string) => {
    try {
      await api.delete(`/avaliacoes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Erro ao excluir avaliação:", error);
      throw error;
    }
  },
};
