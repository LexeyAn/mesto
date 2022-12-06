let profile__button = document.querySelector('.profile__button');
let popup = document.querySelector('.popup');
let page = document.querySelector('.page');

// функция добавляет селектор, делающий видимым/невидимым попап
function openPopup() {
  popup.classList.toggle('popup_opened');
  page.classList.toggle('page_popup');
};

// слушатель кнопки редактирования профиля
profile__button.addEventListener('click', openPopup);

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__nameInput');
let jobInput = document.querySelector('.popup__jobInput');
let profile__name = document.querySelector('.profile__name');
let profile__profession = document.querySelector('.profile__profession');

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  let name = nameInput.value;
  let job = jobInput.value;

  profile__name.textContent = name;
  profile__profession.textContent = job;

  openPopup();
}

// слушатель кнопки отправки формы
formElement.addEventListener('submit', handleFormSubmit);

// закрытие попапа
let popup__close = document.querySelector('.popup__close');
popup__close.addEventListener('click', closePopup);

function closePopup() {
  openPopup();
  let name = profile__name.textContent;
  let job =  profile__profession.textContent;
  nameInput.value = name;
  jobInput.value = job;
}

