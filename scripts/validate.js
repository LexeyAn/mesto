const showInputError = (formElement, inputElement, errorMessage, settingsObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settingsObject.inputErrorClass); /*form__input_type_error*/
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, settingsObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingsObject.inputErrorClass); /*form__input_type_error*/
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, settingsObject) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsObject);
  } else {
    hideInputError(formElement, inputElement, settingsObject);
  }
};

const setEventListeners = (formElement, settingsObject) => {
  const inputList = Array.from(formElement.querySelectorAll(settingsObject.inputSelector)); /*'.form__input'*/
  const buttonElement = formElement.querySelector(settingsObject.submitButtonSelector); /* '.form__submit' */
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, settingsObject);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (settingsObject) => {
  const formList = Array.from(document.querySelectorAll(settingsObject.formSelector)); /*'.form'*/
  formList.forEach((formElement) => {
    setEventListeners(formElement, settingsObject);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.removeAttribute("disabled");
  }
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inputErrorClass: 'form__input_type_error',
});

