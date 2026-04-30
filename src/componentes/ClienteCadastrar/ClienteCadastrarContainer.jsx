import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClienteCadastrarView from "./ClienteCadastrarView";
import ClienteService from "./ClienteService"; // container consome esse servico
//*********************************************************************************** */
//Gerenciamento de estado e coordenação entre a view e o serviço de cadastro de clientes
//O container gerencia o estado dos campos do formulário, lida com a submissão dos dados e navegação
//1-cria os estados (useState) para cada campo do formulário e para a mensagem de feedback
//2-retorna o componente de visualização (ClienteCadastrarView) passando os estados e manipuladores como props
//3-o formulario coleta os dados setCpf/setNome/setCep/setComplemento/setEmail isso atualiza os estado do container
//4-e provoca nova renderizacao da view
//5-quando o formulario e submetido, handleSubmit e chamado
//6-handleSubmit coleta os dados do estado e chama o servico ClienteService.cadastrar para enviar os dados ao backend
//7-apos o cadastro, atualiza a mensagem de feedback com sucesso ou erro (setMensagem - esta msg deve ser melhorada)
//8-o container e responsavel por buscar os dados do cep na api externa e preencher os campos do formulario
//*********************************************************************************** */
const ClienteCadastrarContainer = () => {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  // Novos estados para os campos de endereço
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [complemento, setComplemento] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState(null);

  const handleVoltar = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clienteData = {
      cpf,
      nome,
      cep,
      endereco,
      bairro,
      cidade,
      complemento,
      email,
    };

    try {
      const result = await ClienteService.cadastrar(clienteData);

      if (result.data) {
        setMensagem({ texto: "Cliente cadastrado com sucesso", tipo: "sucesso" });
        console.log(result.data);
      } else {
        let textoErro = result.error;
        try {
          const parsed = JSON.parse(result.error);
          if (parsed.message) {
            textoErro = parsed.message;
          }
        } catch (e) {
          // Mantém a string original se não for um JSON válido
        }
        console.log(`Erro: ${textoErro}`);
        setMensagem({ texto: textoErro, tipo: "erro" });
      }
    } catch (error) {
      setMensagem({ texto: `Erro não esperado: ${error.message}`, tipo: "erro" });
    }
  };

  return (
    <ClienteCadastrarView
      cpf={cpf}
      nome={nome}
      cep={cep}
      endereco={endereco}     // Passando os novos
      bairro={bairro}        // estados e setters
      cidade={cidade}        // para a view
      complemento={complemento}
      email={email}
      setCpf={setCpf}
      setNome={setNome}
      setCep={setCep}
      setEndereco={setEndereco}
      setBairro={setBairro}
      setCidade={setCidade}
      setComplemento={setComplemento}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
      handleVoltar={handleVoltar}
      mensagem={mensagem}
    />
  );
};

export default ClienteCadastrarContainer;
