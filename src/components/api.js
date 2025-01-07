const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: '420395d2-26d5-4b64-8c46-9a14581b8caa',
    'Content-Type': 'application/json'
  }
}

// GET: Получение данных профиля пользователя
export async function getUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
}

// GET: Получение данных массива карточек
export async function getCardList() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
}

// Полное обновление страницы с параллельным выполнение обоих промисов на получение информации
export function updatePage(nameElement, descElement, avatarElement, cardList, createCardFunc, handleCardRemoveFunc, handleCardLikeFunc, handleImagePopupFunc) {
  Promise.all([
    getUserData(nameElement, descElement, avatarElement),
    getCardList(cardList, createCardFunc, handleCardRemoveFunc, handleCardLikeFunc, handleImagePopupFunc)
  ])
  .then(([userData, cardData]) => {
    nameElement.textContent = userData.name;
    descElement.textContent = userData.about;
    avatarElement.style = `background-image: url(${userData.avatar});`;

    cardData.forEach(element => cardList.append(createCardFunc(element, handleCardRemoveFunc, handleCardLikeFunc, handleImagePopupFunc)));
  })
  .catch(err => console.log(`Ошибка: ${err}`))
}

export async function changeProfileInfo(name, desc) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: desc
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
}

export async function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
}
