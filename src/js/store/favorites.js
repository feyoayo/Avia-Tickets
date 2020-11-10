import { data } from "autoprefixer";
import { da } from "date-fns/locale";
import locations from "../store/locations";
import favoritesUI from "../views/favorites";

class Favorites {
  constructor() {
    this.listOfFavorite = {};
  }

  get data() {
    //TODO Тут надо покумекать и сделать по другому
    const dataLocations = locations.lastSearch;
    const arrOfViewed = dataLocations.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
    return arrOfViewed;
  }
  onClick(target) {
    //TODO Это надо нахер выпилить отсюда во view
    const parent = target.closest("[data-ticket-id]");
    const id = parent.dataset.ticketId;
    this.listOfFavorite[id] = favorites.data[id];
    localStorage.setItem("favorites", JSON.stringify(this.listOfFavorite));
    favoritesUI.favTicketRender(this.listOfFavorite);
    console.log(this.listOfFavorite);
  }
  onDelete(target) {
    //TODO Аналогично функции выше
    const parent = target.closest("[data-ticket-id]");
    const id = parent.dataset.ticketId;
    delete this.listOfFavorite[id];
    parent.remove();
    localStorage.removeItem("favorites");
    console.log(this.listOfFavorite);
    setTimeout(() => {
      localStorage.setItem("favorites", JSON.stringify(this.listOfFavorite));
    });

    // favoritesUI.favDeleteFromHtml(parent);
  }
}

const favorites = new Favorites();

export default favorites;
