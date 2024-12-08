import '../pages/index.css';
import { initialCards } from './cards.js';
import { handleCardRemove, handleCardLike, createCard } from '../components/card.js';
import { openPopup, closePopup } from '../components/modal.js';

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

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupName = imagePopup.querySelector('.popup__caption');
const imagePopupWindow = imagePopup.querySelector('.popup__image');

// Хендлер увеличения изображения
function handleImagePopup(evt) {
  imagePopupName.textContent = evt.target.alt;
  imagePopupWindow.src = evt.target.src;
  openPopup(imagePopup);
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
  cardList.prepend(createCard(newCard, handleCardRemove, handleCardLike, handleImagePopup));
  closePopup(addCardPopup);
  addCardFormName.value = "";
  addCardFormLink.value = "";
}

// Добавление дефолтных карт
initialCards.forEach(element => cardList.append(createCard(element, handleCardRemove, handleCardLike, handleImagePopup)));

// Обработчики для изменения профиля
profileEditButton.addEventListener('click', () => {
  openPopup(profileEditPopup);
  profileEditFormName.value = profileName.textContent;
  profileEditFormJob.value = profileDesc.textContent;
});
profileEditForm.addEventListener('submit', handleProfileFormSubmit);

// Обработчики для добавления новой карточки
addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
});
addCardForm.addEventListener('submit', handleCardFormSubmit);
