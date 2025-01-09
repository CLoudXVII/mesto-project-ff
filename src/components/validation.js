function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorMesageVisibilityClass);
};

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorMesageVisibilityClass);
  errorElement.textContent = '';
};

function checkInputValidity (formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};


function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.submitButtonDisabledClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.submitButtonDisabledClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners (formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(`.${config.inputClass}`));
  const buttonElement = formElement.querySelector(`.${config.submitButtonClass}`);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config)
    });
  });
};

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(`.${config.formClass}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    formList.forEach((fieldSet) => {
      setEventListeners(fieldSet, config);
    });
  });
};

export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(`.${config.inputClass}`));
  const buttonElement = formElement.querySelector(`.${config.submitButtonClass}`);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
  toggleButtonState(inputList, buttonElement, config);
}
