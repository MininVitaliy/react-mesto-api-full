import {useState, useEffect, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrenUserContext, inputValid, classValid  } from '../contexts/CurrentUserContext';

function EditProfilePopup ({ isOpen, onClose, onUpdateUser, onLoading}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrenUserContext);
  const [ isValid, setIsValid ] = useState(true);
  const [isvalidName, setIsValidName] = useState( () => classValid (true));
  const [isvalidInfoName, setIsValidInfoName] = useState({name: '', clasInfo: () => inputValid ('')});
  const [isvalidDescription, setIsValidDescription] = useState(() => classValid (true));
  const [isvalidInfoDescription, setIsValidInfoDescription] = useState( {description: '', clasInfo: () =>
    inputValid ('')});


  function handleChangeName(e) {
    setName(e.target.value);
    setIsValidName(() => classValid (e.target.validity.valid));
    setIsValidInfoName( {name: e.target.validationMessage, clasInfo: () =>
      inputValid (e.target.validationMessage)});
    setIsValid(e.target.closest('form').checkValidity());
  };

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    setIsValidDescription(() => classValid (e.target.validity.valid))
    setIsValidInfoDescription({description: e.target.validationMessage, clasInfo: () =>
      inputValid (e.target.validationMessage)});
    setIsValid(e.target.closest('form').checkValidity());
  };

  function handleSubmit (e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setIsValidName(() => classValid (true));
    setIsValidDescription(() => classValid (true));
    setIsValidInfoName({name: '', clasInfo: () => inputValid ('')});
    setIsValidInfoDescription({description: '', clasInfo: () => inputValid ('')});
    setIsValid(true)
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name='open_profil'
      title='Редактировать профиль'
      children={
        <>
          <input type="text" name="popup__span_name-author" className={isvalidName}
            required minLength="2" maxLength="40" onChange={handleChangeName} value={name || ''}/>
          <span className={isvalidInfoName.clasInfo()}>{isvalidInfoName.name}</span>
          <input type="text" name="popup__span_name-job" className={isvalidDescription}
            required minLength="2" maxLength="200" onChange={handleChangeDescription} value={description || ''}/>
          <span className={isvalidInfoDescription.clasInfo()}>{isvalidInfoDescription.description}</span>
          <button type="submit" aria-label="Сохранить и отправить новую форму" className={`popup__button-save ` +
            (isValid ? 'popup__button-save_valid' : 'popup__button-save_invalid' )} disabled={!isValid}
             name="name-save">{onLoading ? 'Cохранить' : 'Сохранить...'}
          </button>
        </>
      }
    />
  )
}

export default EditProfilePopup;