import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import initialCards from "./cards.js";
const profileButton = document.querySelector('.profile__button');
const popupProfile = document.querySelector('.popup-profile');
//форма загрузки профиля
const formProfile = document.forms.addProfile;
const nameInputProfile = formProfile.elements.addName;
const jobInputProfile = formProfile.elements.addJob;
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
// попап добавления карточек
const buttonAddCard = document.querySelector('.profile__addButton');
const popupAddСard = document.querySelector('.popup-addcard');
//попап фото
const popupFoto = document.querySelector('.popup-foto');
const popupFotoFoto = popupFoto.querySelector('.popup-foto__foto');
const popupFotoCaption = popupFoto.querySelector('.popup-foto__caption');
// кнопки попапов
const closeButtons = document.querySelectorAll('.popup__close');
// все попапы
const popups = document.querySelectorAll('.popup');
//форма загрузки карточек
const formAddCard = document.forms.addCard;
const namePlace = formAddCard.elements.namePlace;
const linkPlace = formAddCard.elements.linkPlace;
// загрузка карточек скриптом
const photoGrids = document.querySelector('.photo-grids');
// объект настроек
const settingsObject = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inputErrorClass: 'form__input_type_error',
};
const formProfileValidator = new FormValidator(settingsObject, formProfile);
const formAddCardValidator = new FormValidator(settingsObject, formAddCard);

function handleCardClick(name, link, fotoName) {
  popupFotoFoto.src = link;
  popupFotoFoto.title = fotoName;
  popupFotoFoto.alt = fotoName;
  popupFotoCaption.textContent = name;
  openPopup(popupFoto);
}

function prependCard(item) {
  const newCard = new Card(item, '.template-card', handleCardClick);
  photoGrids.prepend(newCard.createCard());
}

function renderStartCards() {
  initialCards.reverse().forEach(item => {
    prependCard(item);
  });
};

function handleCardSubmit(event) {
  event.preventDefault();
  prependCard({
    name: namePlace.value,
    link: linkPlace.value
  });
  closePopup(popupAddСard);
}

// функция попапа профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInputProfile.value;
  profileProfession.textContent = jobInputProfile.value;
  closePopup(popupProfile);
}

// функция по esc
function addListenerEsc(e) {
  const key = e.key;
  if (key == "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  };
};

//функция открытия попапов
function openPopup(popups) {
  popups.classList.add('popup_opened');
  window.addEventListener('keyup', addListenerEsc);
};

//функция закрытия попапов
function closePopup(popups) {
  popups.classList.remove('popup_opened');
  window.removeEventListener('keyup', addListenerEsc);
};

// функция закрытия попапа при щелчке вне попапа
function closePopupOutZone(event, popup) {
  if (event == popup) {
    closePopup(popup);
  };
}

// слушатели попапа профиля
formProfile.addEventListener('submit', handleFormProfileSubmit);

profileButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInputProfile.value = profileName.textContent;
  jobInputProfile.value = profileProfession.textContent;
  formProfileValidator.clearErrorForm();
});

//слушатели попапа добавления карточек
buttonAddCard.addEventListener('click', function () {
  openPopup(popupAddСard);
  formAddCard.reset();
  formAddCardValidator.clearErrorForm();
});

formAddCard.addEventListener('submit', handleCardSubmit);

// универсальный обработчик крестиков (кнопка закрытия попапа)
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// универсальный обработчик закрытия при нажатие на зону попапа
popups.forEach((popup) => {
  popup.addEventListener('mousedown', function (event) {
    closePopupOutZone(event.target, popup);
  });
});

renderStartCards();

formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
