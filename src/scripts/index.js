import '../pages/index.css';
import { initialCards } from "./cards";

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');

function cardRemove(evt) {
  evt.target.closest('.card').remove();
}

function cardCreate (card, removalFunc) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', removalFunc);
  return cardElement
}

function handlePopupClose(evt) {
  if ((evt.target.classList.contains('popup')) || (evt.target.classList.contains('popup__close'))) {
    evt.target.closest('.popup').classList.remove('popup_is-opened');
    profileEditPopup.removeEventListener('click', handlePopupClose)
    document.removeEventListener('keydown', handlePopupEscClose);
  }
}

function handlePopupEscClose(evt) {
  if (evt.key === 'Escape') {
    profileEditPopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handlePopupEscClose);
  }
}

initialCards.forEach(element => cardList.append(cardCreate(element, cardRemove)));

profileEditButton.addEventListener('click', function() {
  profileEditPopup.classList.add('popup_is-opened');
  profileEditPopup.addEventListener('click', handlePopupClose)
  document.addEventListener('keydown', handlePopupEscClose);
})
