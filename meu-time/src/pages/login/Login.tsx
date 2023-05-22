import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import axios from "axios";
import "./login.scss";

const Login = () => {
  const [apiKey, setApiKey] = useState("");
  const navigate = useNavigate();
  const apiKeyContext = useContext(ApiKeyContext);
  const [error, setError] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
    setError("");
  };

  const validateApiKey = async (apiKey: string): Promise<boolean> => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/timezone",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      const status = response.status;
      const isDataSuccess = response.data.success;

      return isDataSuccess && status === 200;
    } catch (error) {
      setError(
        "Erro ao validar a chave da API. Por favor, tente novamente mais tarde."
      );
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const isValidKey = await validateApiKey(apiKey);

      if (!isValidKey) {
        setError(
          "A chave da API é inválida. Por favor, insira uma chave válida"
        );
        return;
      }

      setError(""); 

      apiKeyContext.setApiKey(apiKey);
      navigate("/home");
    } catch (error) {
      setError(
        "Erro ao validar a chave da API. Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1 className="login-title">Login</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            API Key:
            <input
              className="login-input"
              type="text"
              value={apiKey}
              onChange={handleInputChange}
              required
            />
          </label>

          <button className="login-submit" type="submit">
            Login
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
