import React, { useContext, useState } from "react";
import "../css/Auth.css";
import AppContext from "./AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
  const { dispatch } = useContext(AppContext);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const onChangeHandle = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault();
      const option = {
        method: "post",
        url: "/api/v1/auth/register",
        data: userInput,
      };
      const response = await axios(option);
      const { token, userName } = response.data.data;
      localStorage.setItem("token", token);
      dispatch({ type: "CURRENT_USER", payload: { userName } });
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <section className="auth-container">
      <form className="auth-form" onSubmit={onSubmitHandle}>
        <h2>Register New Account</h2>
        {errorMessage &&
          (Array.isArray(errorMessage) ? (
            errorMessage.map((err) => (
              <div className="error-message">Error: {err}</div>
            ))
          ) : (
            <div className="error-message">Error: {errorMessage}</div>
          ))}
        <input
          onChange={onChangeHandle}
          type="name"
          name="name"
          id="name"
          required
          placeholder="Username"
          value={userInput.name}
        />
        <input
          onChange={onChangeHandle}
          type="email"
          name="email"
          id="email"
          required
          placeholder="Email"
          value={userInput.email}
        />
        <input
          onChange={onChangeHandle}
          type="password"
          name="password"
          id="password"
          required
          placeholder="Password"
          value={userInput.password}
        />
        <button className="btn" type="submit">
          Register
        </button>
      </form>
    </section>
  );
}

export default Register;
