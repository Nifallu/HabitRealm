import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkLogin } from "../../redux/session";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    setLoading(false);

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleDemoLogin = async () => {
    const demoUser = {
      email: "demo@aa.io",
      password: "password"
    };

    setEmail(demoUser.email);
    setPassword(demoUser.password);

    setLoading(true);

    const serverResponse = await dispatch(
      thunkLogin({
        email: demoUser.email,
        password: demoUser.password
      })
    );

    setLoading(false);

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="loginModalBox">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input 
            className="loginInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            className="loginInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit" className="submit" disabled={loading}>
          {loading ? (
            'Logging In...'
          ) : (
            'Log In'
          )}

        </button>
        {loading && (
        <div className="loadingSpinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
        )}
      </form>

      <button className='DemoButton' type="button" onClick={handleDemoLogin}>
        Demo User
      </button>
    </div>
  );
}

export default LoginFormModal;