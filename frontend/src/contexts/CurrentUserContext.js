import React from "react";

export const CurrenUserContext = React.createContext();
export const CurrenCardContext = React.createContext();

export function inputValid (info) {
  if (info.length === 0) {
    return 'popup__span'
  } else if (info.length < 60) {
    return 'popup__error popup__error_little-lines'
  } else if (info.length > 60) {
    return 'popup__error popup__span'
  };
};

export function classValid (info) {
  if (info) {
    return `popup__form popup__form_new_name popup__form_valid`
  } else {
    return 'popup__form popup__form_new_name popup__form_invalid'
  };
};

export function classValidRegister (info) {
  if (info) {
    return `register__info register__info_valid`
  } else {
    return 'register__info register__info_invalid'
  };
};

