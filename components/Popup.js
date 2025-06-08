export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keydown", (evt) => this._handleEscapeClose(evt));
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.addEventListener("keydown", (evt) => this._handleEscapeClose(evt));
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target === this._popupElement ||
        evt.target === this._popupCloseBtn
      ) {
        this.close(evt);
      }
    });
  }
}
