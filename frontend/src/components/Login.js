import { useState} from "react";
import ExternForm from "./ExternForm";

function Login({onLogin, onLoading}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit (e) {
    e.preventDefault();
    onLogin({
      password: password,
      email: email 
    });
  };

  return (
    <ExternForm 
      onLoading={onLoading} 
      nameTitle='Вход'
      buttonStart='Войти'
      buttonStop='Войти...'
      handleSubmit={handleSubmit}
      setEmail={setEmail}
      setPassword={setPassword}
      email={email}
      password={password}
    />
  )
}

export default Login;