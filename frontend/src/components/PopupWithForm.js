import React from "react";

function PopupWithForm ({name, isOpen, children, title, onClose, onSubmit}) {
  return (
    <div className={`popup popup_opacity popup_${name}`+ (isOpen ? ' popup_opened': '')} >
      <div className="popup__container">
        <form className="popup__forms popup__forms-input popup__forms-delete" name={`form-${name}`}
          noValidate onSubmit={onSubmit}>
          <h2 className={`popup__title` + (name === 'delete' ? ' popup__title_delete': '')}>{title}</h2>
            {children}
          <button type="button" aria-label="Закрыть форму" className="popup__button-close" 
            onClick={() => onClose(name)}>
          </button>
        </form>
      </div>
    </div>
  )
};

export default PopupWithForm;
