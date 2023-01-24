const profileButton = document.querySelector('.profile__button');
const popupProfile = document.querySelector('.popup-profile');
//форма загрузки профиля
const formProfile = document.forms.addProfile;
const nameInputProfile = formProfile.elements.addName;
const jobInputProfile = formProfile.elements.addJob;
const buttonFormProfile = formProfile.elements.sendForm;
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupProfileCloseButton = document.querySelector('.popup-profile__close');
// попап добавления карточек
const buttonAddCard = document.querySelector('.profile__addButton');
const popupAddСard = document.querySelector('.popup-addcard');
const popupAddСardCloseButton = document.querySelector('.popup-addcard__close');
//попап фото
const popupFoto = document.querySelector('.popup-foto');
const popupFotoCloseButton = document.querySelector('.popup-foto__close');
const popupFotoFoto = popupFoto.querySelector('.popup-foto__foto');
const popupFotoCaption = popupFoto.querySelector('.popup-foto__caption');
//форма загрузки карточек
const formAddCard = document.forms.addCard;
const namePlace = formAddCard.elements.namePlace;
const linkPlace = formAddCard.elements.linkPlace;
const buttonFormAddCard = formAddCard.elements.sendForm;
// загрузка карточек скриптом
const photoGrids = document.querySelector('.photo-grids');
const templateCard = document.querySelector('.template-card').content.querySelector('.photo-grids__card');
// обнуление ошибок валидации
const formInputsError = document.querySelectorAll('.form__input-error');
const formInputs = document.querySelectorAll('.form__input');

function createCard(item) {
  //добавление карточки с заданием параметров
  const userCards = templateCard.cloneNode(true);
  const userCardsFoto = userCards.querySelector('.photo-grids__foto');
  const userCardsText = userCards.querySelector('.photo-grids__text');
  const fotoName = `Фотография ${item.name}`;
  const fotoNo = `${item.name} - фото не загружено`;
  const photoGridsButton = userCards.querySelector('.photo-grids__button');
  userCardsFoto.src = item.link;
  userCardsFoto.title = fotoName;
  userCardsFoto.alt = fotoName;
  userCardsText.textContent = item.name;
  userCardsText.title = item.name;
  userCardsFoto.onerror = function () {
    userCardsFoto.src = './images/noFoto.jpg';
    item.link = './images/noFoto.jpg';
    userCardsText.textContent = fotoNo;
    userCardsText.title = fotoNo;
    userCardsFoto.title = fotoName;
    userCardsFoto.alt = fotoName;
  };
  //обработчик удаления карточки
  userCards.querySelector('.photo-grids__basket').addEventListener('mousedown', function () {
    userCards.remove();
  });
  //обработчик на попап фото
  userCardsFoto.addEventListener('mousedown', function () {
    popupFotoFoto.src = item.link;
    popupFotoFoto.title = fotoName;
    popupFotoFoto.alt = fotoName;
    popupFotoCaption.textContent = item.name;
    openPopup(popupFoto);
  });
  //навешивание слушателя на лайк фото
  photoGridsButton.addEventListener('mousedown', function () {
    photoGridsButton.classList.toggle('photo-grids__button_active');
  });
  return userCards
}

function prependCard(item) {
  photoGrids.prepend(createCard(item));
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

// функция очищения от ошибок
function clearErrorForm() {
  for (let i = 0; i < formInputsError.length; i++) {
    formInputsError[i].textContent = '';
    formInputsError[i].classList.remove('form__input-error_active');
    formInputs[i].classList.remove('form__input_type_error');
  }
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
popupProfile.addEventListener('mousedown', function (event) {
  closePopupOutZone(event.target, popupProfile);
});

formProfile.addEventListener('submit', handleFormProfileSubmit);

popupProfileCloseButton.addEventListener('mousedown', function () {
  closePopup(popupProfile);
});

profileButton.addEventListener('mousedown', function () {
  openPopup(popupProfile);
  clearErrorForm();
  nameInputProfile.value = profileName.textContent;
  jobInputProfile.value = profileProfession.textContent;
  buttonFormProfile.setAttribute("disabled", true);
});

//слушатели попапа добавления карточек
popupAddСard.addEventListener('mousedown', function (event) {
  closePopupOutZone(event.target, popupAddСard);
});

buttonAddCard.addEventListener('mousedown', function () {
  openPopup(popupAddСard);
  clearErrorForm();
  formAddCard.reset();
  buttonFormAddCard.setAttribute("disabled", true);
});

popupAddСardCloseButton.addEventListener('mousedown', function () {
  closePopup(popupAddСard);
});

formAddCard.addEventListener('submit', handleCardSubmit);

//слушатели попапа фото
popupFoto.addEventListener('mousedown', function (event) {
  closePopupOutZone(event.target, popupFoto);
});

popupFotoCloseButton.addEventListener('mousedown', function () {
  closePopup(popupFoto);
});

renderStartCards();
