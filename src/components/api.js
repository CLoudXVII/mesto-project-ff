const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: '420395d2-26d5-4b64-8c46-9a14581b8caa',
    'Content-Type': 'application/json'
  }
}

export function updateUserData(nameElement, descElement, avatarElement) {
  fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((data) => {
      nameElement.textContent = data.name;
      descElement.textContent = data.about;
      avatarElement.style = `background-image: url(${data.avatar});`;
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    })
}
