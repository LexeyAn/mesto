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

renderStartCards();

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
//функция открытия попапов
function openPopup(popups) {
  popups.classList.add('popup_opened');
};

//функция закрытия попапов
function closePopup(popups) {
  popups.classList.remove('popup_opened');
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
});

//слушатели попапа добавления карточек
buttonAddCard.addEventListener('click', function () {
  openPopup(popupAddСard);
  formAddCard.reset();
});

popupAddСardCloseButton.addEventListener('click', function () {
  closePopup(popupAddСard);
});

formAddCard.addEventListener('submit', addCardSubmit);

//слушатели попапа фото
popupFotoCloseButton.addEventListener('click', function () {
  closePopup(popupFoto);
});
