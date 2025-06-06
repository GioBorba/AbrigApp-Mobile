// src/services/AbrigoService.ts
import { api } from "./api";

export type Abrigo = {
  id: string;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
};

export const AbrigoService = {
  listarTodos: async (): Promise<Abrigo[]> => {
    try {
      const response = await api.get("/abrigos");
      console.log("Abrigos carregados:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar abrigos:", error);
      throw error;
    }
  },

  buscarPorId: async (id: string): Promise<Abrigo> => {
    try {
      const response = await api.get(`/abrigos/${id}`);
      console.log("Abrigo carregado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar abrigo:", error);
      throw error;
    }
  },
};
