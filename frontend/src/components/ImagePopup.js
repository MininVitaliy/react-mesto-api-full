import {memo} from "react";

const ImagePopup = memo (({name, card, onClose}) => {
  return (
    <div className={`popup ${name}` + (card.openImage ? ' popup_opened': '')}>
      <div className="popup__container">
        <div className="popup__forms">
          <img className="popup__group"  alt={card.name} src={card.link}/>
          <h2 className="popup__group-title">{card.name}</h2>
          <button type="button" aria-label="Закрыть форму" className="popup__button-close" 
            onClick={() => onClose(name, card)}>
          </button>
        </div>
      </div>
    </div>
  )
});

export default ImagePopup;
