// Хендлер закрытия попапа по клику на оверлей или на крестик
function handlePopupClose(evt) {
  const popup = evt.target.closest('.popup');
  if (popup && (evt.target === popup || evt.target.classList.contains('popup__close'))) {
    closePopup(popup);
  }
}

// Хендлер закрытия попапа по нажатию клавиши esc
function handlePopupEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Универсальная функция открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handlePopupEscClose);
  popup.addEventListener('click', handlePopupClose);
}

// Универсальная функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handlePopupEscClose);
  popup.removeEventListener('click', handlePopupClose);
}
