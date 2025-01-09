import '../pages/index.css';
// import { initialCards } from './cards.js';
import { handleCardRemove, handleCardLike, createCard } from '../components/card.js';
import { openPopup, closePopup } from '../components/modal.js';
import { clearValidation, enableValidation } from '../components/validation.js';
import { addNewCard, changeProfileInfo, getUserData, getCardList, changeAvatar } from "../components/api.js";

const validationConfig = {
  formClass: 'popup__form',

  submitButtonClass: 'popup__button',
  submitButtonDisabledClass: 'popup__button_is-inactive',

  inputClass: 'popup__input',
  inputErrorClass: 'popup__input_type_error',

  errorMesageVisibilityClass: 'popup__input-error_is-visible',
}

let userId;

const cardList = document.querySelector('.places__list');

const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const profileAvatarOverlay = document.querySelector('.profile__image-overlay');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditForm = profileEditPopup.querySelector('.popup__form');
const profileEditFormName = profileEditForm.querySelector('.popup__input_type_name');
const profileEditFormJob = profileEditForm.querySelector('.popup__input_type_description');
const profileEditFormButton = profileEditForm.querySelector('button');

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const addCardFormName = addCardForm.querySelector('.popup__input_type_card-name');;
const addCardFormLink = addCardForm.querySelector('.popup__input_type_url');
const addCardFormButton = addCardForm.querySelector('button');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupName = imagePopup.querySelector('.popup__caption');
const imagePopupWindow = imagePopup.querySelector('.popup__image');

const avatarChangePopup = document.querySelector('.popup_type_avatar-change');
const avatarChangeForm = avatarChangePopup.querySelector('.popup__form');
const avatarChangeFormLink = avatarChangeForm.querySelector('.popup__input_type_url');
const avatarChangeFormButton = avatarChangeForm.querySelector('button');

// Хендлер увеличения изображения
function handleImagePopup(evt) {
  imagePopupName.textContent = evt.target.alt;
  imagePopupWindow.src = evt.target.src;
  imagePopupWindow.alt = evt.target.alt;
  openPopup(imagePopup);
}

// Хендлер сабмита формы изменения профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const originalButtonText = profileEditFormButton.textContent;
  profileEditFormButton.textContent = 'Сохранение...';
  changeProfileInfo(profileEditFormName.value, profileEditFormJob.value)
    .then(data => {
      profileName.textContent = data.name;
      profileDesc.textContent = data.about;
      closePopup(profileEditPopup);
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
      alert("Ошибка при обновлении профиля. Попробуйте еще раз.");
    })
    .finally(() => {
      profileEditFormButton.textContent = originalButtonText;
    })
}

// Хендлер сабмита формы новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const originalButtonText = addCardFormButton.textContent;
  addCardFormButton.textContent = 'Создание...';
  addNewCard(addCardFormName.value, addCardFormLink.value)
    .then(data => {
      cardList.prepend(createCard(data, userId, handleCardRemove, handleCardLike, handleImagePopup));
      closePopup(addCardPopup);
      addCardForm.reset();
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
      alert("Ошибка при добавлении карточки. Попробуйте еще раз.");
    })
    .finally(() => {
      addCardFormButton.textContent = originalButtonText;
    })
}

// Хендлер сабмита нового аватара
function handleChangeAvatarSubmit(evt) {
  evt.preventDefault();
  const originalButtonText = avatarChangeFormButton.textContent;
  avatarChangeFormButton.textContent = 'Сохранение...';
  changeAvatar(avatarChangeFormLink.value)
    .then(data => {
      profileAvatar.style = `background-image: url(${data.avatar});`;
      closePopup(avatarChangePopup);
      avatarChangeForm.reset();
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
      alert("Ошибка при изменении аватара. Попробуйте еще раз.");
    })
    .finally(() => {
      avatarChangeFormButton.textContent = originalButtonText;
    })
}

// Функция полного обновления страницы
function updatePage(nameElement, descElement, avatarElement, cardList, createCardFunc, handleCardRemoveFunc, handleCardLikeFunc, handleImagePopupFunc) {
  Promise.all([
    getUserData(nameElement, descElement, avatarElement),
    getCardList(cardList, createCardFunc, handleCardRemoveFunc, handleCardLikeFunc, handleImagePopupFunc)
  ])
  .then(([userData, cardData]) => {
    nameElement.textContent = userData.name;
    descElement.textContent = userData.about;
    userId = userData._id;
    avatarElement.style = `background-image: url(${userData.avatar});`;
    cardData.forEach(element => cardList.append(createCardFunc(element, userData._id, handleCardRemoveFunc, handleCardLikeFunc, handleImagePopupFunc)));
  })
  .catch(err => console.log(`Ошибка: ${err}`))
}

// Обработчики для изменения профиля
profileEditButton.addEventListener('click', () => {
  openPopup(profileEditPopup);
  profileEditFormName.value = profileName.textContent;
  profileEditFormJob.value = profileDesc.textContent;
  clearValidation(profileEditForm, validationConfig);
});
profileEditForm.addEventListener('submit', handleProfileFormSubmit);

// Обработчики для добавления новой карточки
addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
  clearValidation(addCardForm, validationConfig);
});
addCardForm.addEventListener('submit', handleCardFormSubmit);

// Обработчики для изменения аватара
profileAvatarOverlay.addEventListener('click', () => {
  openPopup(avatarChangePopup);
  clearValidation(avatarChangeForm, validationConfig);
})
avatarChangeForm.addEventListener('submit', handleChangeAvatarSubmit)

// Включение валидации для всех форм
enableValidation(validationConfig);

// Обновление страницы и загрузка всех данных
updatePage(profileName, profileDesc, profileAvatar, cardList, createCard, handleCardRemove, handleCardLike, handleImagePopup)
