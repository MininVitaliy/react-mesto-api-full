import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { Route, Switch, Link, Redirect, useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { CurrenUserContext, CurrenCardContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { register, authorize, getContent } from "../utils/profileAuth";
import line from '../images/Line42.svg';


function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState({boolean: false, error: true});
  const [deleteCard, setDeleteCard] = useState({})
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [currentCard, setCurrentCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [widh, setWidh] = useState(window.innerWidth);
  const [sidebar, setSidebar] = useState(false);
  let history = useHistory();

  function handleCardClick (element) {
    setSelectedCard({
      openImage: true,
      name: element.name,
      link: element.link
    });
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  };

  function handleLogin() {
    setLoggedIn(true)
  };

  function openSidebar () {
    setSidebar(true)
  };

  const handleUpdateUser = useCallback (({name, about}) => {
    setLoading(false);
    api.changeUserProfile(name, about)
      .then((res) => setCurrentUser(res))
      .then(() => closeAllPopups( 'open_profil'))
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(true)
      });
  }, []);

  const handleUpdateAvatar = useCallback (({avatar}) => {
    setLoading(false);
    api.changeUserAvatar(avatar)
      .then((res) => setCurrentUser(res))
      .then(() => closeAllPopups('open_avatar'))
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(true);
      });
  }, []);

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCurrentCard((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  };

  const handleCardDelete = useCallback((card) => {
    setLoading(false)
    api.deleteCardTheServer(card._id)
        .then(() => {
          setCurrentCard((state) => state.filter((c) => c._id === card._id ? '' : c));
        })
        .then(() => closeAllPopups('delete'))
        .catch(err => console.log(err))
        .finally(() => {
          setLoading(true);
        });
  }, []);

  const handleAddPlaceSubmit = useCallback(({name, url}) => {
    setLoading(false)
    api.addNewCardOnTheServer (name, url)
        .then((res) => setCurrentCard([res, ...currentCard]))
        .then(() => closeAllPopups('open_mesto'))
        .catch(err => console.log(err))
        .finally(() => {
          setLoading(true);
        });
  }, [currentCard]);

  const registrationUser = useCallback( ({password, email}, {emailStat, passwordStat}) => {
    setLoading(false);
    register ({password, email})
        .then(() => {
          setIsInfoPopupOpen({boolean: true, error: false})
          emailStat('');
          passwordStat('');
          history.push('/signin');
        })
        .catch((err) => {
          console.log(err);
          setIsInfoPopupOpen({boolean: true, error: true})
        })
        .finally(() => {
          setLoading(true)
        });
  }, []);

  const authorizationUser = useCallback( ({password, email}) => {
    setLoading(false);
    authorize ({password, email})
        .then (() => {
          handleLogin()
          setEmail(email)
        })
        .then (() => {
          history.push('/');
        })
        .catch((err) => {
          setIsInfoPopupOpen({boolean: true, error: true})
        })
        .finally(() => {
          setLoading(true)
        });
  }, []);

  const checkToken = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token){
      getContent(token).then((res) => {
        setEmail(res.data.email)
        if (res){
          handleLogin();
          history.push('/');
          mobileWindow ();
        };
      });
    };
  }, []);
  
  const closeAllPopups = useCallback((element, info) => {
    if (element === 'open_mesto') {
      setIsAddPlacePopupOpen(false);
    } else if (element === 'open_profil') {
      setIsEditProfilePopupOpen(false);
    } else if (element === 'open_avatar') {
      setIsEditAvatarPopupOpen(false);
    } else if (element === 'delete') {
      setIsDeletePopupOpen(false);
    } else if (element === 'popup_image') {
      setSelectedCard({
        openImage: false,
        name: info.name,
        link: info.link
      });
    } else if (element === 'open_info') {
      setIsInfoPopupOpen({boolean: false, error: info })
    } else if (element === 'sidebar') {
      setSidebar(false);
    };
  }, []);

  const infoCard = useCallback( (card) => {
    setDeleteCard(card);
    setIsDeletePopupOpen(true);
  }, []);

  const exit = useCallback( () => {
    localStorage.removeItem('token');
    setSidebar(false);

  }, []);
  
  const mobileWindow = useCallback( () => {
    if (widh > 560) {
      setIsMobile(true)
      setSidebar(false)
    } else {
      setIsMobile(false)
    }
  }, [widh]);

  useEffect(() => {
    if (loggedIn) {
      api.getInitialUserMe ()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch(err => console.log(err)
        );
    };
  }, [loggedIn]);

  useEffect (() => {
    checkToken()
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards ()
        .then((res) => {
          setCurrentCard(res);
        })
        .catch(err => console.log(err));
    };
  }, [loggedIn]);

  useEffect (() => {
    window.addEventListener("resize", () => {
      setWidh(window.innerWidth)
    });
    mobileWindow ()
  }, [window.innerWidth]);


  return (
    <CurrenUserContext.Provider value={currentUser}>
      <CurrenCardContext.Provider value={currentCard}>
        <Switch>
          
          <ProtectedRoute 
            exact path="/" 
            loggedIn={loggedIn}
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={currentCard}
            onCardLike={handleCardLike}
            infoCard={infoCard}
            componentHeader={Header}
            componentMain={Main}
            isOpen={sidebar}
            isMobile={isMobile}
            children={isMobile ?
              <>
                <p className="header__mail">{email}</p>
                <Link to="/signin" className="header__link" onClick={exit}>Выйти</Link>
              </>
              :
              <>
                {sidebar ?
                  <button type="button" aria-label="Закрыть форму" className="header__close" 
                    onClick={() => closeAllPopups('sidebar')}>
                  </button>
                :
                <div className="header__image" onClick={openSidebar}>
                  <img src={line} className="header__image_link" />
                  <img src={line} className="header__image_link" />
                  <img src={line} className="header__image_link" />
                </div>
                }
              </>
            }
            childrenMobil={
              <>
                <p className="header__mail header__mail_top">{email}</p>
                <Link to="/signin" className="header__link header__link_margin header__link_margin-auth" onClick={exit}>Выйти</Link>
              </>
            }
          />

          <Route path="/signup">
            <Header 
              children={
                <Link to="/signin" className="header__link header__link_auth">Войти</Link>
              }/>
            <Register onRegister={registrationUser} onLoading={loading}/>
          </Route>

          <Route path="/signin">
            <Header 
              children={
                <Link to="/signup" className="header__link header__link_auth">Регистрация</Link>                              
              }
            />
            <Login onLogin={authorizationUser} onLoading={loading}/>
          </Route>

          <Route exact path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route> 

          <Route exact path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>

        </Switch>
        <Footer />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={loading}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={loading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={loading}
        />
        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
          name='popup_image'
        />
        <PopupWithConfirmation
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onLoading={loading}
          onCardDelete={handleCardDelete}
          info={deleteCard}
        />
        <InfoTooltip  
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          name='open_info'
        />
      </CurrenCardContext.Provider>
    </CurrenUserContext.Provider>
  )
};

export default App;