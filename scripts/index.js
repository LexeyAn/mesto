let profile__button = document.querySelector('.profile__button');
let popup = document.querySelector('.popup');
let page = document.querySelector('.page');

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__text_box_nameInput');
let jobInput = document.querySelector('.popup__text_box_jobInput');
let profile__name = document.querySelector('.profile__name');
let profile__profession = document.querySelector('.profile__profession');

let popup__close = document.querySelector('.popup__close');

// функция добавляет селектор, делающий видимым/невидимым попап
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profile__name.textContent;
  jobInput.value = profile__profession.textContent;
};

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  let name = nameInput.value;
  let job = jobInput.value;

  profile__name.textContent = name;
  profile__profession.textContent = job;

  closePopup();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}


// слушатель кнопки отправки формы
formElement.addEventListener('submit', handleFormSubmit);

// закрытие попапа
popup__close.addEventListener('click', closePopup);

// слушатель кнопки редактирования профиля
profile__button.addEventListener('click', openPopup);


