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

  const form = formUI.form;
  const listTickets = favoritesUI.listTickets;

  //Events
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

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
          console.dir(target);
          favorites.onClick(target);
          if (
            target.classList.contains("green") &&
            target.innerText == "ADD TO FAVORITES"
          ) {
            target.classList.remove("green");
            target.classList.add("red");
            target.innerText = "Remove From Favorites";
          } else {
            target.classList.add("green");
            target.innerText = "ADD TO FAVORITES";
          }
        }
      });
    });
  }
});
