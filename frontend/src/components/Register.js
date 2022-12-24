import { useState } from "react";
import { Link } from 'react-router-dom';
import ExternForm from "./ExternForm";

function Register({onRegister, onLoading}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleSubmit (e) {
    e.preventDefault();
    onRegister({
      password: password,
      email: email 
    },
    {
      emailStat: setEmail,
      passwordStat: setPassword
    }
    );
  };
 
  return (
    <ExternForm 
      onLoading={onLoading} 
      nameTitle='Регистрация'
      buttonStart='Зарегистрироваться'
      buttonStop='Регистрация...'
      handleSubmit={handleSubmit}
      setEmail={setEmail}
      setPassword={setPassword}
      email={email}
      password={password}
      children={
        <Link to='/signin' className="register__link">Уже зарегистрированы? Войти</Link>
      }
    />
  )
}

export default Register;