import { useState } from "react";
import { inputValid, classValidRegister } from '../contexts/CurrentUserContext';

function ExternForm ({onLoading, children, nameTitle, buttonStart, buttonStop, handleSubmit, setEmail, setPassword, email, password}) {
  const [ isValid, setIsValid ] = useState(false);
  const [isvalidEmail, setIsValidEmail] = useState( () => classValidRegister (true));
  const [isValidInfoEmail, setIsValidInfoEmail] = useState({name: '', clasInfo: () => inputValid ('')});
  const [isvalidPassword, setIsValidPassword] = useState(() => classValidRegister (true));
  const [isvalidInfoPassword, setIsValidInfoPassword] = useState( {description: '', clasInfo: () =>
    inputValid ('')});

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setIsValidEmail(() => classValidRegister (e.target.validity.valid));
    setIsValidInfoEmail( {name: e.target.validationMessage, clasInfo: () =>
      inputValid (e.target.validationMessage)});
    setIsValid(e.target.closest('form').checkValidity());
  };

  function handleChangePassword(e) {
    setPassword(e.target.value);
    setIsValidPassword(() => classValidRegister (e.target.validity.valid))
    setIsValidInfoPassword({description: e.target.validationMessage, clasInfo: () =>
      inputValid (e.target.validationMessage)});
    setIsValid(e.target.closest('form').checkValidity());
  };
 
  return (
    <form className="register" name='register-form' onSubmit={handleSubmit} noValidate>
      <h2 className='register__title'>{nameTitle}</h2>
      <input placeholder="Email" type="email" name="popup__span_name-author" className={isvalidEmail}
        required onChange={handleChangeEmail} value={email || ''} />
      <span className={isValidInfoEmail.clasInfo()}>{isValidInfoEmail.name}</span>
      <input placeholder="Пароль" type="password"  name="popup__span_name-job" className={isvalidPassword}
        required minLength="5" maxLength="200" onChange={handleChangePassword} value={password || ''}/>
      <span className={isvalidInfoPassword.clasInfo()}>{isvalidInfoPassword.description}</span>
      <button type="submit" aria-label="Регистрация нового пользователя" className={`register__save ` +
        (isValid ? 'register__save_valid' : 'register__save_invalid' )} disabled={!isValid}
        name="register-new-user">{onLoading ? `${buttonStart}` : `${buttonStop}`}
      </button>
      {children}
    </form>
  )
}

export default ExternForm;