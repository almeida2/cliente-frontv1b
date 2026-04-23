//Objetivo: buscar todos os clientes cadastrados no banco de dados

async function ClienteConsultar() {
  const API_URL = "http://localhost:8080/api/v1/clientes/all";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      // Se a resposta não for OK, obtem a mensagem de erro do  body
      const errorData = await response
        .json()
        .catch(() => ({ message: "Erro desconhecido" }));

      // Retorna um objeto de erro estruturado em vez de lançar um erro
      return {
        success: false,
        error: errorData.message || "Erro HTTP: " + response.status,
      };
    }

    const result = await response.json();

    if (result.status === "success" && result.data) {
      return { success: true, data: result.data };
    } else {
      // Retorna um objeto de erro estruturado para um formato de resposta da API inesperado
      return {
        success: false,
        error:
          result.message ||
          "A resposta da API não contém a lista de clientes esperada.",
      };
    }
  } catch (error) {
    console.error("Erro no serviço de consulta de clientes:", error);
    // Retorna um objeto de erro estruturado para erros de rede ou outros erros inesperados
    return {
      success: false,
      error:
        "Não foi possível carregar os dados dos clientes. " + error.message,
    };
  }
}
export default ClienteConsultar;
