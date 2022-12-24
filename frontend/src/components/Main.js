import {useContext}  from "react";
import Card from "./Card";
import { CurrenUserContext } from '../contexts/CurrentUserContext';

function Main({onCardClick, onEditAvatar, onEditProfile, onAddPlace, cards, onCardLike, onCardDelete, infoCard}) {
  const currentUser = useContext(CurrenUserContext);

  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__row">
          <picture className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}
            onClick={onEditAvatar}>  
          </picture>
          <div className="profile__grid">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" aria-label="Корректировка информации о персонаже" 
              className="profile__edit-button" onClick={onEditProfile}>
            </button>
            <p className="profile__text">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" aria-label="Добавить фото" className="profile__add-button" 
          onClick={onAddPlace}>
        </button>
      </section>
      <section className="elements content__elements">
        <ul className="elements__lists">
          {cards.map((item) =>
            <Card key={item._id}
              card={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              infoCard={infoCard}
            />
          )}
        </ul>
      </section>
    </main>
  )
}

export default Main;