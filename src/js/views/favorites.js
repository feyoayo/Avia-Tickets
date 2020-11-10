import favorites from "../store/favorites";
import currencyUI from "./currency";
class FavoritesUI {
  constructor(currency) {
    this.favBtn = document.querySelector(".favorites");
    this.favContaier = document.getElementById("dropdown1");
    this._listTickets = document.querySelectorAll(".tickets-sections");
    this.favItems = document.querySelectorAll(".favorite-item");
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  //Методы
  get listTickets() {
    return this._listTickets;
  }

  get ddBtn() {
    return this.favBtn;
  }

  get favoritesList() {
    return this.favContaier.children;
  }

  favTicketRender(favoritesObj) {
    if (!favoritesObj) {
      console.log("Give me your favorites");
      return;
    }
    //Очищаем чтобы не стакалось
    this.favContaier.innerHTML = "";
    const currency = this.getCurrencySymbol();

    let fragment = "";

    Object.values(favoritesObj).forEach((item) => {
      const template = FavoritesUI.favTicketTemplate(item, currency);
      fragment += template;
    });
    this.favContaier.insertAdjacentHTML("afterbegin", fragment);
  }
  // favDeleteFromHtml(el) {
  //   el.remove();
  // }

  favEmptyMsg() {
    const template = FavoritesUI.favEmptyTemplate();
    this.favContaier.insertAdjacentHTML("afterbegin", template);
  }

  static favTicketTemplate(item, currency) {
    return `
    <div data-ticket-id="${item.id}" class="favorite-item d-flex align-items-start">
        <img
            src="${item.airline_logo}"
            class="favorite-item-airline-img"
        />
        <div class="favorite-item-info d-flex flex-column">
          <div
            class="favorite-item-destination d-flex align-items-center"
            >
                    <div class="d-flex align-items-center mr-auto">
                      <span class="favorite-item-city">${item.origin_name}</span>
                      <i class="medium material-icons">flight_takeoff</i>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="medium material-icons">flight_land</i>
                      <span class="favorite-item-city">${item.destination_name}</span>
                    </div>
                  </div>
                  <div class="ticket-time-price d-flex align-items-center">
                    <span class="ticket-time-departure">${item.departure_at}</span>
                    <span class="ticket-price ml-auto">${currency} ${item.price}</span>
                  </div>
                  <div class="ticket-additional-info">
                    <span class="ticket-transfers">Пересадок: ${item.transfers}</span>
                    <span class="ticket-flight-number">Номер рейса: ${item.flight_number}</span>
                  </div>
                  <a
                    class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
                    >Delete</a
                  >
                </div>
              </div>
    `;
  }
  static favEmptyTemplate() {
    return `  
    <div class="tickets-empty-res-msg favorite-item">
      Favorites storage is empty
    </div>`;
  }
}

const favoritesUI = new FavoritesUI(currencyUI);
export default favoritesUI;
