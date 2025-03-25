class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  _showInputError(formEl, inputElement, errorMessage) {
    const errorElementId = `#${inputElement.id}-error`;
    this._errorElement = formEl.querySelector(errorElementId);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formEl, inputElement) {
    const errorElementId = `#${inputElement.id}-error`;
    this._errorElement = this._formEl.querySelector(errorElementId);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        this._formEl,
        inputElement,
        inputElement.validationMessage,
        this._settings
      );
    } else {
      this._hideInputError(this._formEl, inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _resetValidator() {
    this._inputList.forEach((input) =>
      this._hideInputError(this._formEl, input)
    );

    this._formEl.reset();
    this._toggleButtonState();
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._resetValidator();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
