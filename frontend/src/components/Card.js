import {useContext, memo} from "react";
import { CurrenUserContext } from '../contexts/CurrentUserContext';

const Card = memo( ({onCardClick, card, onCardLike, infoCard}) => {
  function handleClick() {
    onCardClick(card);
  };

  const currentUser = useContext(CurrenUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  return (
    <li className="element">
      <picture onClick={handleClick} className="element__masck-group" alt={`Фото: ${card.name}`}
        style={{backgroundImage: `url(${card.link})`}}>
      </picture>
      {isOwn ? <button type="button" aria-label="Удалить место" className="element__garbage" name=""
        onClick={() => infoCard(card)}></button> : ''}
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element">
          <button type="button" aria-label="Поставить сердечко" onClick={()=> onCardLike(card)}
            className={"element__heart" + ' ' + (isLiked ? 'element__heart_active' : '')}></button>
          <p className="element__likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
 }
)

export default Card