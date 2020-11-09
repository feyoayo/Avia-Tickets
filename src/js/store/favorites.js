import { data } from "autoprefixer";
import { da } from "date-fns/locale";
import locations from "../store/locations";
import favoritesUI from "../views/favorites";

class Favorites {
  constructor() {
    this.listOfFavorite = {};
  }

  get data() {
    const dataLocations = locations.lastSearch;
    const arrOfViewed = dataLocations.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
    return arrOfViewed;
  }
  onClick(target) {
    const parent = target.closest("[data-ticket-id]");
    const id = parent.dataset.ticketId;
    this.listOfFavorite[id] = favorites.data[id];
    localStorage.setItem("favorites", JSON.stringify(this.listOfFavorite));
    favoritesUI.favTicketRender(this.listOfFavorite);
    this.listOfFavorite;
    console.log(this.listOfFavorite);
  }
  onDelete(target) {
    const parent = target.closest("[data-ticket-id]");
    const id = parent.dataset.ticketId;
    delete this.listOfFavorite[id];
    favoritesUI.favDeleteFromHtml(parent);
  }
}

const favorites = new Favorites();

export default favorites;
