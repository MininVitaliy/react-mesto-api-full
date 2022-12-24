import {useState, useRef, useEffect, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import {inputValid, classValid, CurrenUserContext} from '../contexts/CurrentUserContext';

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar, onLoading}) {
  const avatarRef = useRef();
  const currentUser = useContext(CurrenUserContext);
  const [ isValid, setIsValid ] = useState(false);
  const [isvalidAvatar, setIsValidAvatar] = useState( () => classValid (true));
  const [isvalidInfoAvatar, setIsValidInfoAvatar] = useState({avatar: '', clasInfo: () => inputValid ('')});

  function handleChangeAvatar(e) {
    setIsValidAvatar(() => classValid (e.target.validity.valid))
    setIsValidInfoAvatar({avatar: e.target.validationMessage, clasInfo: () =>
      inputValid (e.target.validationMessage)})
    setIsValid(e.target.closest('form').checkValidity());
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  };

  useEffect(() => {
    avatarRef.current.value = '';
    setIsValid(false)
  }, [currentUser]);

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name='open_avatar'
      title='Обновить аватар'
      children={
        <>
          <input ref={avatarRef} type="url" name="popup__span_avatar" className={isvalidAvatar}
            placeholder="Ссылка на картинку" required onChange={handleChangeAvatar}/>
          <span className={isvalidInfoAvatar.clasInfo()}>{isvalidInfoAvatar.avatar}</span>
          <button type="submit" aria-label="Сохранить и отправить новое фото аватара" className=
            {`popup__button-save ` + (isValid ? 'popup__button-save_valid' :
            'popup__button-save_invalid' )} disabled={!isValid} name="save-avatar">{onLoading ? 'Cохранить' : 'Сохранить...'}
          </button>
        </>
      }
    />
  )
}

export default EditAvatarPopup;

