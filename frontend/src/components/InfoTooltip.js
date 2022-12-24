import React from "react";
import CloseD from '../images/Union.svg'
import GooD from '../images/UnionOk.svg'


function InfoTooltip ({isOpen, onClose, name}) {
  let info;
  if (isOpen.error) {
    info = true; 
  } else {
    info = false; 
  }

  return (
    <div className={`popup popup_opacity` + (isOpen.boolean ? ' popup_opened': '')}>
      <div className="popup__container">
        <div className="popup__forms popup__forms-input popup__forms_margin">
         {isOpen.error ? 
            <>
              <img src={CloseD} className="popup__image-error"></img>
              <h2 className="popup__title popup__title_info">
                Что-то пошло не так! Попробуйте ещё раз.
              </h2>  
            </>
            :
            <>
              <img src={GooD} className="popup__image-error"></img>
              <h2 className="popup__title popup__title_info">
                Вы успешно зарегистрировались!
              </h2>  
            </>
          }
          <button type="button" aria-label="Закрыть форму" className="popup__button-close" 
            onClick={() => onClose(name, info)}>
          </button>    
        </div>
      </div>
    </div>
  )
};

export default InfoTooltip;