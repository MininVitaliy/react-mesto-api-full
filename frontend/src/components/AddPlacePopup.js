import {useState, useEffect, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrenCardContext, classValid, inputValid } from "../contexts/CurrentUserContext";

function AddPlacePopup ({onClose, isOpen, onAddPlace,onLoading}) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const  currenCard = useContext(CurrenCardContext);

  const [ isValid, setIsValid ] = useState(false);

  const [isvalidName, setIsValidName] = useState( () => classValid (true));
  const [isvalidInfoName, setIsValidInfoName] = useState({name: '', clasInfo: () => inputValid ('')});
  const [isvalidUrl, setIsValidUrl] = useState(() => classValid (true));
  const [isvalidInfoUrl, setIsValidInfoUrl] = useState( {url: '', clasInfo: () =>
    inputValid ('')});

  function handleChangeName(e) {
    setName(e.target.value);
    setIsValidName(() => classValid (e.target.validity.valid));
    setIsValidInfoName( {name: e.target.validationMessage, clasInfo: () =>
      inputValid (e.target.validationMessage)})
    setIsValid(e.target.closest('form').checkValidity());
  };

  function handleChangeUrl(e) {
    setUrl(e.target.value);
    setIsValidUrl(() => classValid (e.target.validity.valid));
    setIsValidInfoUrl( {url: e.target.validationMessage, clasInfo: () =>
      inputValid (e.target.validationMessage)})
    setIsValid(e.target.closest('form').checkValidity());
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      url: url,
    });
  };

  useEffect(() => {
    setName('');
    setUrl('');
    setIsValid(false)
  }, [currenCard]);

  return (
    <PopupWithForm
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        name='open_mesto'
        title='Новое место'
        children={
          <>
            <input type="text" name="popup__span_name-location" className={isvalidName}
              placeholder="Название" required minLength="2" maxLength="30" value={name || ''} 
              onChange={handleChangeName}/>
            <span className={isvalidInfoName.clasInfo()}>{isvalidInfoName.name}</span>
            <input type="url" name="popup__span_foto-location" className={isvalidUrl}
              placeholder="Ссылка на картинку" required value={url || ''} onChange={handleChangeUrl}/>
            <span className={isvalidInfoUrl.clasInfo()}>{isvalidInfoUrl.url}</span>
            <button type="submit" aria-label="Сохранить и отправить новое место" className={`popup__button-save ` +
              (isValid ? 'popup__button-save_valid' : 'popup__button-save_invalid' )} disabled={!isValid}
               name="save-location">{onLoading ? 'Cоздать' : 'Cоздать...'}
            </button>
          </>
        }
    />
  )
};

export default AddPlacePopup;