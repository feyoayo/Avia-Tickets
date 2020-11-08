import favorites from "../store/favorites";

class FavoritesUI {
  constructor() {
    this.favBtn = document.querySelector(".favorites");
    this.favContaier = document.getElementById("dropdown1");
    this._listTickets = document.querySelectorAll(".tickets-sections");
  }

  //Методы
  get listTickets() {
    return this._listTickets;
  }

  get favoritesList() {
    return {};
  }

  favTicketRender(favoritesObj) {
    //Очищаем чтобы не стакалось
    this.favContaier.innerHTML = "";

    let fragment = "";

    Object.values(favoritesObj).forEach((item) => {
      const template = FavoritesUI.favTicketTemplate(item);
      fragment += template;
    });
    this.favContaier.insertAdjacentHTML("afterbegin", fragment);
  }

  static favTicketTemplate(item) {
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
                    <span class="ticket-price ml-auto">$315</span>
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
}

const favoritesUI = new FavoritesUI();
export default favoritesUI;
