import '../pages/index.css';
import { initialCards } from "./cards";

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditForm = profileEditPopup.querySelector('.popup__form');
const profileEditFormName = profileEditForm.querySelector('.popup__input_type_name');
const profileEditFormJob = profileEditForm.querySelector('.popup__input_type_description');

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const addCardFormName = addCardForm.querySelector('.popup__input_type_card-name');;
const addCardFormLink = addCardForm.querySelector('.popup__input_type_url');



// Функция удаление карточки
function cardRemove(evt) {
  evt.target.closest('.card').remove();
}

function cardLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// Функция добавление карточки с помощью template
function cardCreate(card, removalFunc, likeFunc) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', removalFunc);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeFunc);
  return cardElement;
}

initialCards.forEach(element => cardList.append(cardCreate(element, cardRemove, cardLike)));

// Универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handlePopupEscClose);
  popup.addEventListener('click', handlePopupClose);
}

// Универсальная функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handlePopupEscClose);
  popup.removeEventListener('click', handlePopupClose);
}

// Функция закрытия попапа по клику на оверлей или на крестик
function handlePopupClose(evt) {
  const popup = evt.target.closest('.popup');
  if (popup && (evt.target === popup || evt.target.classList.contains('popup__close'))) {
    closePopup(popup);
  }
}

// Функция закрытия попапа по нажатию клавиши esc
function handlePopupEscClose(evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape' && openedPopup) {
    closePopup(openedPopup);
  }
}

// Хендлер сабмита формы изменения профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditFormName.value;
  profileDesc.textContent = profileEditFormJob.value;
  closePopup(profileEditPopup);
}

// Хендлер сабмита формы новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = addCardFormName.value;
  newCard.link = addCardFormLink.value;
  cardList.prepend(cardCreate(newCard, cardRemove));
  closePopup(addCardPopup);
}

profileEditButton.addEventListener('click', () => {
  openPopup(profileEditPopup);
  profileEditFormName.value = profileName.textContent;
  profileEditFormJob.value = profileDesc.textContent;
});

profileEditForm.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
})

addCardForm.addEventListener('submit', handleCardFormSubmit);
