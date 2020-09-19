import React, {useState} from "react";
import PropTypes from "prop-types";

const LoginForm = ({handleLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin({username, password});
    setUsername("");
    setPassword("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input value={username} onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input value={password} onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
