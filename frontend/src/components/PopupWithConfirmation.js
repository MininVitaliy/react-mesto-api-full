import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation ({isOpen, onClose, onLoading, onCardDelete, info}) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(info);
  };

  return (
    <PopupWithForm
      name='delete'
      title='Вы уверены?'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <button type="submit" aria-label="Удалить новую карточку" className="popup__button-save
            popup__button-save_valid" name="delete-card">{onLoading ? 'Да' : 'Сохранить...'}
          </button>
        </>
      }
    />
  )
};

export default PopupWithConfirmation;