export default class FormValidator {
  constructor(settingsObject, form) {
    this._settingsObject = settingsObject;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(settingsObject.inputSelector));
    this._buttonElement = this._form.querySelector(settingsObject.submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  };

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settingsObject.inputErrorClass); /*form__input_type_error*/
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settingsObject.inputErrorClass); /*form__input_type_error*/
    errorElement.textContent = '';
  }

  clearErrorForm() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

}
