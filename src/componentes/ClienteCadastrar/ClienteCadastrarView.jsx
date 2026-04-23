import React from "react";
import "./styles.css";
import ClienteService from "./ClienteService";

const ClienteCadastrarView = ({
  cpf, nome, cep, endereco, bairro, cidade, complemento, email,
  setCpf, setNome, setCep, setEndereco, setBairro, setCidade, setComplemento, setEmail,
  handleSubmit, handleVoltar, mensagem,
}) => {

  const handleCepBlur = async (e) => {
    const cepValue = e.target.value.replace(/\D/g, '');

    if (cepValue.length === 8) {
      try {
        const response = await ClienteService.buscarEnderecoPorCep(cepValue);

        if (response.data) {
          setEndereco(response.data.logradouro || '');
          setBairro(response.data.bairro || '');
          setCidade(response.data.cidade || '');
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  return (
    <div className="cliente-cadastrar-view">
      <h2 className="title">Cadastrar Cliente</h2>

      <form onSubmit={handleSubmit} className="form-grid">

        <div className="form-row">
          <label className="form-label">CPF</label>
          <input className="form-input" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="000.000.000-00" required />
        </div>

        <div className="form-row">
          <label className="form-label">Nome Completo</label>
          <input className="form-input" value={nome} onChange={e => setNome(e.target.value)} placeholder="Digite o nome completo" required />
        </div>

        <div className="form-row">
          <label className="form-label">CEP</label>
          <input className="form-input" value={cep} onChange={e => setCep(e.target.value)} onBlur={handleCepBlur} placeholder="00000-000" required />
        </div>

        <div className="form-row">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@exemplo.com" required />
        </div>

        <div className="address-row">
          <div className="form-row">
            <label className="form-label">Logradouro</label>
            <input className="form-input" value={endereco} disabled />
          </div>

          <div className="form-row">
            <label className="form-label">Bairro</label>
            <input className="form-input" value={bairro} disabled />
          </div>

          <div className="form-row">
            <label className="form-label">Cidade</label>
            <input className="form-input" value={cidade} disabled />
          </div>

          <div className="form-row">
            <label className="form-label">Complemento</label>
            <input className="form-input" value={complemento} onChange={e => setComplemento(e.target.value)} placeholder="Apto, Bloco, etc." />
          </div>
        </div>

        <div className="button-group form-grid-full-width">
          <button id="voltar" type="button" className="button" onClick={handleVoltar}>
            Voltar
          </button>
          <button id="confirmar" type="submit" className="button">
            Cadastrar
          </button>
        </div>
      </form>

      {mensagem && (
        <div className={`mensagem ${mensagem.includes("Erro") ? "error" : "success"}`}>
          {mensagem}
        </div>
      )}
    </div>
  );
};

export default ClienteCadastrarView;