/************************************************************************* */
/* Serviço logica de negocios e comunicacao com a API                      */
/* define a url base, centraliza a configuracao do endpoint                */
/* logica de validacao e tratamento de erros                               */
/************************************************************************* */
const API_BASE_URL = "http://localhost:8080/api/v1/clientes";

const ClienteService = {
  buscarEnderecoPorCep: async (cep) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cep/${cep}`);

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Erro ao buscar endereço");
      }

      const responseData = await response.json();

      if (responseData.status === "success") {
        return {
          data: {
            logradouro: responseData.data.logradouro,
            bairro: responseData.data.bairro,
            cidade: responseData.data.localidade,
            complemento: responseData.data.complemento
          }
        };
      } else {
        throw new Error(responseData.message || "Erro ao buscar endereço");
      }
    } catch (error) {
      return { error: error.message };
    }
  },


  cadastrar: async (clienteData) => {
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Erro ao cadastrar cliente");
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: error.message };
    }
  },
};

export default ClienteService;