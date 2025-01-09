import { deleteCard, changeLikeState } from './api.js'

// Функция удаление карточки
export function handleCardRemove(cardElement) {
  deleteCard(cardElement.id)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
      alert("Ошибка при удалаении карточки. Попробуйте еще раз.");
    })
}

// Функция лайка карточки
export function handleCardLike(cardElement, likeElement, likeCountElement) {
  if (likeElement.classList.contains('card__like-button_is-active')) {
    changeLikeState(cardElement.id, false)
      .then(data => {
        likeCountElement.textContent = data.likes.length;
        likeElement.classList.remove('card__like-button_is-active');
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
        alert("Ошибка при изменении статуса лайка. Попробуйте еще раз.");
      })
  } else {
    changeLikeState(cardElement.id, true)
      .then(data => {
        likeCountElement.textContent = data.likes.length;
        likeElement.classList.add('card__like-button_is-active');
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
        alert("Ошибка при изменении статуса лайка. Попробуйте еще раз.");
      })
  }
}

// Функция добавление карточки с помощью template
export function createCard(card, userId, removeCardFunction, likeCardFunction, imagePopupFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCount = cardElement.querySelector('.card__like-count');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.id = card._id;
  cardElement.querySelector('.card__title').textContent = card.name;

  if (card.owner._id === userId) {
    cardDeleteButton.addEventListener('click', () => {
      removeCardFunction(cardElement);
    });
  } else {
    cardDeleteButton.disabled = true;
    cardDeleteButton.classList.add('card__delete-button_is-disabled');
  }

  card.likes.forEach(element => {
    if (element._id === userId) {
      cardLikeButton.classList.add('card__like-button_is-active');
      return
    }
  })

  cardLikeButton.addEventListener('click', () => {
    likeCardFunction(cardElement, cardLikeButton, cardLikeCount)
  });

  cardLikeCount.textContent = card.likes.length;
  cardImage.addEventListener('click', imagePopupFunction);
  return cardElement;
}
