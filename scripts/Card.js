export default class Card {
  constructor(item, templateSelector, handleCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._selector = templateSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    return document.querySelector(this._selector).content.querySelector('.photo-grids__card');
  }

  _setListeners() {
    this._userCard.querySelector('.photo-grids__basket').addEventListener('click', () => this._deleteCard());
    this._userCardFoto.addEventListener('click', () => this._handleCardClick(this._name, this._link, this._fotoName));
    this._photoGridsButton.addEventListener('click', () => this._likeCard());
  }

  _deleteCard() {
    this._userCard.remove();
  }

  _likeCard() {
    this._photoGridsButton.classList.toggle('photo-grids__button_active');
  }

  createCard() {
    //добавление карточки с заданием параметров
    this._userCard = this._getTemplate().cloneNode(true);
    this._userCardFoto = this._userCard.querySelector('.photo-grids__foto');
    this._userCardText = this._userCard.querySelector('.photo-grids__text');
    this._fotoName = `Фотография ${this._name}`;
    this._fotoNo = `${this._name} - фото не загружено`;
    this._photoGridsButton = this._userCard.querySelector('.photo-grids__button');
    this._userCardFoto.src = this._link;
    this._userCardFoto.title = this._fotoName;
    this._userCardFoto.alt = this._fotoName;
    this._userCardText.textContent = this._name;
    this._userCardText.title = this._name;
    this._userCardFoto.onerror = () => {
      this._userCardFoto.src = './images/noFoto.jpg';
      this._link = './images/noFoto.jpg';
      this._userCardText.textContent = this._fotoNo;
      this._userCardText.title = this._fotoNo;
      this._userCardFoto.title = this._fotoName;
      this._userCardFoto.alt = this._fotoName;
    };
    this._setListeners();
    return this._userCard;
  }

}
