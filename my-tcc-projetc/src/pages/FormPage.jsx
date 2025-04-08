import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/form.css';  // Importe o arquivo CSS aqui

function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    address: {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
    },
    termsAccepted: false,
    comments: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (name.includes("address")) {
      const [addressField] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Resetando mensagens de erro
    setError("");

    // Validação
    if (!formData.name || !formData.email || !formData.phone || !formData.birthDate || !formData.gender) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Email inválido.");
      return;
    }

    if (!formData.termsAccepted) {
      setError("Você deve aceitar os termos e condições.");
      return;
    }

    console.log("Formulário enviado com sucesso!");
    console.log(formData);

    // Limpar campos após envio
    setFormData({
      name: "",
      email: "",
      phone: "",
      birthDate: "",
      gender: "",
      address: {
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
      },
      termsAccepted: false,
      comments: "",
    });
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Formulário de Cadastro</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome completo:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome completo"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu email"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Telefone:</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Digite seu telefone"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthDate">Data de nascimento:</label>
          <input
            id="birthDate"
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Sexo:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Selecione</option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Outro</option>
          </select>
        </div>
        
        <h3 className="form-section-title">Endereço:</h3>
        <div className="form-group">
          <label htmlFor="street">Rua:</label>
          <input
            id="street"
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            placeholder="Rua"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="number">Número:</label>
          <input
            id="number"
            type="text"
            name="address.number"
            value={formData.address.number}
            onChange={handleChange}
            placeholder="Número"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="neighborhood">Bairro:</label>
          <input
            id="neighborhood"
            type="text"
            name="address.neighborhood"
            value={formData.address.neighborhood}
            onChange={handleChange}
            placeholder="Bairro"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">Cidade:</label>
          <input
            id="city"
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            placeholder="Cidade"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">Estado:</label>
          <input
            id="state"
            type="text"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            placeholder="Estado"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="termsAccepted">
            <input
              id="termsAccepted"
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="form-checkbox"
            />
            Aceito os termos e condições
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="comments">Observações:</label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Deixe suas observações aqui..."
            className="form-textarea"
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="form-submit">Cadastrar</button>
      </form>

      <br />
      <Link to="/" className="form-link">Voltar para o Login</Link>
    </div>
  );
}

export default FormPage;
