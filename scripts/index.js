const profileButton = document.querySelector('.profile__button');
const popupProfile = document.querySelector('.popup-profile');
//форма загрузки профиля
const formProfile = document.forms.addProfile;
const nameInputProfile = formProfile.elements.addName;
const jobInputProfile = formProfile.elements.addJob;
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
//форма загрузки карточек
const formAddCard = document.forms.addCard;
const namePlace = formAddCard.elements.namePlace;
const linkPlace = formAddCard.elements.linkPlace;
// загрузка карточек скриптом
const photoGrids = document.querySelector('.photo-grids');
const templateCard = document.querySelector('.template-card').content.querySelector('.photo-grids__card');
// обнуление ошибок валидации
const formInputError = document.querySelectorAll('.form__input-error');
const formInput = document.querySelectorAll('.form__input');
const formSubmit = document.querySelectorAll('.form__submit');

function createCard(item) {
  //добавление карточки с заданием параметров
  const userCards = templateCard.cloneNode(true);
  const userCardsFoto = userCards.querySelector('.photo-grids__foto');
  const userCardsText = userCards.querySelector('.photo-grids__text');
  const fotoName = `Фотография ${item.name}`;
  const fotoNo = `${item.name} - фото не загружено`;
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
  userCards.querySelector('.photo-grids__basket').addEventListener('click', function () {
    userCards.remove();
  });
  //обработчик на попап фото
  userCardsFoto.addEventListener('click', function () {
    const popupFotoFoto = popupFoto.querySelector('.popup-foto__foto');
    popupFotoFoto.src = item.link;
    popupFotoFoto.title = fotoName;
    popupFotoFoto.alt = fotoName;
    popupFoto.querySelector('.popup-foto__caption').textContent = item.name;
    openPopup(popupFoto);
  });
  //навешивание слушателя на лайк фото
  userCards.querySelector('.photo-grids__button').addEventListener('click', function () {
    userCards.querySelector('.photo-grids__button').classList.toggle('photo-grids__button_active');
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

function addCardSubmit(event) {
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
  let key = e.key;
  if (key == "Escape") {
    closePopup(popupProfile);
    closePopup(popupAddСard);
    closePopup(popupFoto);
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
  for (let i = 0; i < 4; i++) {
    formInputError[i].textContent = '';
    formInputError[i].classList.remove('form__input-error_active');
    formInput[i].classList.remove('form__input_type_error');
  }
};

// функция закрытия попапа при щелчке вне попапа
function closePopupOutZone(event, popup) {
  if (event == popup) {
    closePopup(popup);
  };
}

popupProfile.onclick = function (event) {
  closePopupOutZone(event.target, popupProfile);
};

popupAddСard.onclick = function (event) {
  closePopupOutZone(event.target, popupAddСard);
};

popupFoto.onclick = function (event) {
  closePopupOutZone(event.target, popupFoto);
};

// слушатели попапа профиля
formProfile.addEventListener('submit', handleFormProfileSubmit);

popupProfileCloseButton.addEventListener('click', function () {
  closePopup(popupProfile);
});

profileButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInputProfile.value = profileName.textContent;
  jobInputProfile.value = profileProfession.textContent;
  formSubmit[0].setAttribute("disabled", true);
});

//слушатели попапа добавления карточек
buttonAddCard.addEventListener('click', function () {
  openPopup(popupAddСard);
  formAddCard.reset();
  formSubmit[1].setAttribute("disabled", true);
});

popupAddСardCloseButton.addEventListener('click', function () {
  closePopup(popupAddСard);
});

formAddCard.addEventListener('submit', addCardSubmit);

//слушатели попапа фото
popupFotoCloseButton.addEventListener('click', function () {
  closePopup(popupFoto);
});

renderStartCards();
