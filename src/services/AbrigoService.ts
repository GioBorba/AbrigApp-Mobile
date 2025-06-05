import { api } from "./api";

export const AbrigoService = {
  listarTodos: async (estado?: string, cidade?: string) => {
    try {
      const params: Record<string, string> = {};
      if (estado) params.estado = estado;
      if (cidade) params.cidade = cidade;

      const response = await api.get("/abrigos", { params });
      return response.data;
    } catch (error) {
      console.error("Erro ao listar abrigos:", error);
      throw error;
    }
  },

  buscarPorId: async (id: string) => {
    try {
      const response = await api.get(`/abrigos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar abrigo:", error);
      throw error;
    }
  },
};
