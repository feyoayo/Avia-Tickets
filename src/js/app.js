import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketsUI from "./views/tickets";
import favorites from "./store/favorites";
import favoritesUI from "./views/favorites";
document.addEventListener("DOMContentLoaded", () => {
  initApp();

  //Пробуем поработать с локал сторейджем
  let favStorageString = localStorage.getItem("favorites");
  let favStorage = JSON.parse(favStorageString);
  favoritesUI.favTicketRender(favStorage);

  const form = formUI.form;
  const listTickets = favoritesUI.listTickets;
  const ddBtn = favoritesUI.ddBtn;

  //Events
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  ddBtn.addEventListener("click", ddHandler);

  //Handlers

  async function initApp() {
    await locations.init(); //Метод который передает объект с ответами от сервера (данные)
    formUI.setAutocompleteData(locations.shortCitiesList);
    //В автокомлпит сетим наши данные которые получили и сформировали
  }

  async function onFormSubmit() {
    //Данные из инпутов
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    //Преобразовываем полученные данные в удобные для работы
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    //locations.lastSearch это обэект в котором хранится наш запрос, т.е те билеты которые мы попросили из инпутов и хотим вывести на страницу

    //Отрисовываем на странице полученные данные
    ticketsUI.renderTickets(favorites.data);
    //Добавляем обработчики на кнопку
    listTickets.forEach((card) => {
      card.addEventListener("click", ({ target }) => {
        if (target && target.classList.contains("btn-small")) {
          favorites.onClick(target);
        }
      });
    });
  }

  async function ddHandler() {
    if (!favoritesUI.favoritesList.length) {
      favoritesUI.favEmptyMsg();
    }
    const childs = favoritesUI.favContaier.children;
    [...childs].forEach((item) => {
      item.addEventListener("click", ({ target }) => {
        if (target && target.classList.contains("delete-favorite")) {
          favorites.onDelete(target);
        }
      });
    });
  }
});

//TODO Подумать как сделать так, чтобы плашка "добавлено в избранные сохранялась и далее, даже после перезагрузке она сообщает что данный билет в избранных"
