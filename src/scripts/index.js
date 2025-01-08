import '../pages/index.css';
// import { initialCards } from './cards.js';
import { handleCardRemove, handleCardLike, createCard } from '../components/card.js';
import { openPopup, closePopup } from '../components/modal.js';
import { clearValidation, enableValidation } from '../components/validation.js';
import { addNewCard, changeProfileInfo, getUserData, changeAvatar, updatePage } from "../components/api.js";

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

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const addCardFormName = addCardForm.querySelector('.popup__input_type_card-name');;
const addCardFormLink = addCardForm.querySelector('.popup__input_type_url');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupName = imagePopup.querySelector('.popup__caption');
const imagePopupWindow = imagePopup.querySelector('.popup__image');

const avatarChangePopup = document.querySelector('.popup_type_avatar-change');
const avatarChangeForm = avatarChangePopup.querySelector('.popup__form');
const avatarChangeFormLink = avatarChangeForm.querySelector('.popup__input_type_url');

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
  const submitButton = profileEditForm.querySelector('button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
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
      submitButton.textContent = originalButtonText;
    })
}

// Хендлер сабмита формы новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = addCardForm.querySelector('button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Создание...';
  addNewCard(addCardFormName.value, addCardFormLink.value)
    .then(data => {
      getUserData()
        .then(userData => {
          cardList.prepend(createCard(data, userData, handleCardRemove, handleCardLike, handleImagePopup));
        })
      closePopup(addCardPopup);
      addCardForm.reset();
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
      alert("Ошибка при добавлении карточки. Попробуйте еще раз.");
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    })
}

// Хендлер сабмита нового аватара
function handleChangeAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButton = avatarChangeForm.querySelector('button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
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
      submitButton.textContent = originalButtonText;
    })
}

// Обработчики для изменения профиля
profileEditButton.addEventListener('click', () => {
  openPopup(profileEditPopup);
  profileEditFormName.value = profileName.textContent;
  profileEditFormJob.value = profileDesc.textContent;
  clearValidation(profileEditForm);
});
profileEditForm.addEventListener('submit', handleProfileFormSubmit);

// Обработчики для добавления новой карточки
addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
  clearValidation(addCardForm);
});
addCardForm.addEventListener('submit', handleCardFormSubmit);

// Обработчики для изменения аватара
profileAvatarOverlay.addEventListener('click', () => {
  openPopup(avatarChangePopup);
  clearValidation(avatarChangeForm);
})
avatarChangeForm.addEventListener('submit', handleChangeAvatarSubmit)

// Включение валидации для всех форм
enableValidation();

// Обновление страницы и загрузка всех данных
updatePage(profileName, profileDesc, profileAvatar, cardList, createCard, handleCardRemove, handleCardLike, handleImagePopup)
