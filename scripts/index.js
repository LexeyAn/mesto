const profileButton = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');
//форма загрузки профиля
const formElement = document.forms.addProfile;
const nameInput = formElement.elements.addName;
const jobInput = formElement.elements.addJob;
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupClose = document.querySelector('.popup__close');
// попап добавления карточек
const buttonAddCard = document.querySelector('.profile__addButton');
const popupAddСard = document.querySelector('.popup-addcard');
const popupAddСardClose = document.querySelector('.popup-addcard__close');
//попап фото
const popupFoto = document.querySelector('.popup-foto');
const popupFotoClose = document.querySelector('.popup-foto__close');
//форма загрузки карточек
const formAddCard = document.forms.addCard;
const namePlace = formAddCard.elements.namePlace;
const linkPlace = formAddCard.elements.linkPlace;
// загрузка карточек скриптом
const photoGrids = document.querySelector('.photo-grids');
const templateCard = document.querySelector('.template-card').content.querySelector('.photo-grids__card');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCard(item) {
  //добавление карточки с заданием параметров
  const userCards = templateCard.cloneNode(true);
  userCards.querySelector('.photo-grids__foto').src = item.link;
  userCards.querySelector('.photo-grids__foto').title = 'Фотография ' + item.name;
  userCards.querySelector('.photo-grids__foto').alt = 'Фотография ' + item.name;
  userCards.querySelector('.photo-grids__text').textContent = item.name;
  userCards.querySelector('.photo-grids__foto').onerror = function () {
    userCards.querySelector('.photo-grids__foto').src = './images/noFoto.gif';
    item.link = './images/noFoto.gif';
    item.name = "Фотография не загружена";
    userCards.querySelector('.photo-grids__text').style.cssText = 'font-size: 15px; color: red;';
    userCards.querySelector('.photo-grids__text').textContent = item.name;
  };
  photoGrids.prepend(userCards);
  //обработчик удаления карточки
  userCards.querySelector('.photo-grids__basket').addEventListener('click', function () {
    userCards.remove();
  });
  //обработчик на попап фото
  userCards.querySelector('.photo-grids__foto').addEventListener('click', function () {
    popupFoto.querySelector('.popup-foto__foto').src = item.link;
    popupFoto.querySelector('.popup-foto__foto').title = 'Фотография ' + item.name;
    popupFoto.querySelector('.popup-foto__foto').alt = 'Фотография ' + item.name;
    popupFoto.querySelector('.popup-foto__caption').textContent = item.name;
    openPopupFoto();
  });
  //навешивание слушателя на лайк фото
  userCards.querySelector('.photo-grids__button').addEventListener('click', function () {
    userCards.querySelector('.photo-grids__button').classList.toggle('photo-grids__button_active');
  });
}

function lendingStartCards() {
  initialCards.reverse().forEach(item => {
    createCard(item);
  });
};

lendingStartCards();

function addCardSubmit(event) {
  event.preventDefault();
  const initialCard = [
    {
      name: namePlace.value,
      link: linkPlace.value
    }];
  createCard(initialCard[0]);
  event.target.reset();
  closePopupAddCard();
}

// функция попапа профиля
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

//функции попапа добавления карточек
function openPopupAddCard() {
  popupAddСard.classList.add('popup-addcard_opened');
};

function closePopupAddCard() {
  popupAddСard.classList.remove('popup-addcard_opened');
  namePlace.value = '';
  linkPlace.value = '';
};

//функции попапа фото
function openPopupFoto() {
  popupFoto.classList.add('popup-foto_opened');
};

function closePopupFoto() {
  popupFoto.classList.remove('popup-foto_opened');
};


// слушатель попапа профиля
formElement.addEventListener('submit', handleFormSubmit);
popupClose.addEventListener('click', closePopup);
profileButton.addEventListener('click', openPopup);

//слушатели попапа добавления карточек
buttonAddCard.addEventListener('click', openPopupAddCard);
popupAddСardClose.addEventListener('click', closePopupAddCard);
formAddCard.addEventListener('submit', addCardSubmit);

//слушатели попапа фото
popupFotoClose.addEventListener('click', closePopupFoto);


