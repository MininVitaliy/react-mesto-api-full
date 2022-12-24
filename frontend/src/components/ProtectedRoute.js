import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ componentHeader: Header, componentMain: Main, componentFooter: Footer, ...props }) => {
  return (
    <Route>
      {props.loggedIn ? 
        <>
          {props.isMobile ?
            <Header 
              children={props.children} 
            />
            :
            <div className="root__header header__mobile">
              <div className={`header header__mobile header__mobile_margin header__sidebar`+ 
              (props.isOpen ? ' header__sidebar_open': '')}>
                {props.childrenMobil}
              </div>
              <Header 
                children={props.children} 
              />
            </div>
          }
          <Main
            onCardClick={props.onCardClick}
            onEditProfile={props.onEditProfile}
            onAddPlace={props.onAddPlace}
            onEditAvatar={props.onEditAvatar}
            cards={props.cards}
            onCardLike={props.onCardLike}
            infoCard={props.infoCard}
          />
        </>
        : <Redirect to="/signin" />}
    </Route>
  );
};

export default ProtectedRoute; 