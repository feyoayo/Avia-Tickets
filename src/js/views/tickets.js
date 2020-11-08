import currencyUI from "./currency";
class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector(".tickets-sections .row");
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
    //? Была ошибка, т.к была потеря контекста, из за того что в currency метод передавался через this, и this указывал на ticketsUI а такого метода у нас нет, поэтому мы делаем bind в контексте currency
  }

  renderTickets(tickets) {
    //Метод который отвечает за отрисовку рейсов на странице
    this.clearContaier();

    if (!tickets) {
      this.showEmptyMsg();
      return;
    }

    let fragment = "";
    const currency = this.getCurrencySymbol();

    Object.values(tickets).forEach((ticket) => {
      const template = TicketsUI.ticketTemplate(ticket, currency);
      fragment += template;
      // ticket.addEventLister("click", ({ target }) => {
      //   if (target && target.classList.contains("btn-small")) {
      //     console.log("hi");
      //   }
      // });
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  clearContaier() {
    //Перед каждым поиском нам нужно очистить контейнер, для того чтобы информация не накладывалась одна на другую
    this.container.innerHTML = "";
  }

  showEmptyMsg() {
    //Выводим сообщение когда не было найдено рейсов, либо контейнер пуст
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  static emptyMsgTemplate() {
    //Возвращает шаблон для сообщения что билеты не найдены
    return `
        <div class="tickets-empty-res-msg">
            По вашему запросу билетов не найдено.
        </div>
    `;
  }

  static ticketTemplate(ticket, currency) {
    // Генерирует шаблон одного билета
    return `
    <div data-ticket-id="${ticket.id}" class="col s12 m6 card-contaier">
        <div class="card ticket-card">
            <div class="ticket-airline d-flex align-items-center">
                <img
                    src="${ticket.airline_logo}"
                    class="ticket-airline-img"
                    />
                <span class="ticket-airline-name"
                    >${ticket.airline_name}</span
                >
              </div>
                <div class="ticket-destination d-flex align-items-center">
                    <div class="d-flex align-items-center mr-auto">
                    <span class="ticket-city">${ticket.origin_name}</span>
                    <i class="medium material-icons">flight_takeoff</i>
                    </div>
                    <div class="d-flex align-items-center">
                  <i class="medium material-icons">flight_land</i>
                  <span class="ticket-city">${ticket.destination_name}</span>
                </div>
              </div>
              <div class="ticket-time-price d-flex align-items-center">
                <span class="ticket-time-departure">${ticket.departure_at}</span>
                <span class="ticket-price ml-auto">${currency} ${ticket.price}</span>
              </div>
              <div class="ticket-additional-info">
                <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
              </div>
                <a
                class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto"
                >Add to favorites</a
              >
            </div>
    </div>
    `;
  }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;
