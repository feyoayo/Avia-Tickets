import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketsUI from "./views/tickets";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  const form = formUI.form;

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

    //CODE, CODE, 2019-09, 2019-10
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });
    ticketsUI.renderTickets(locations.lastSearch);
  }
});
