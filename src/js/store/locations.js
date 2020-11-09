import api from "../services/apiService";
import { formatDate } from "../helpers/date";
// import favoritesUI from "../views/favorites";
// import favorites from "../store/favorites";

class Locations {
  constructor(api, helpers) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = {};
    this.lastSearch = {};
    this.airlines = {};
    this.formatDate = helpers.formatDate;
  }
  async init() {
    //Метод делает запрос на получение городов и стран у нашего api
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
    ]);

    //Резделим отдельно на страны и города наш response
    const [countries, cities, airlines] = response;
    //Внутри класса сохранить страны и города
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    this.airlines = this.serializeAirlines(airlines);
    return response;
  }

  //!Методы
  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find(
      (item) => item.full_name === key
    );
    return city.code;
  }

  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  getAirLineNameByCode(code) {
    //Если есть такой объект с таким кодом, то проверяем, если есть у него поле name то возвращаем как есть, если нет, то возвращаем пустую строку
    return this.airlines[code] ? this.airlines[code].name : "";
  }

  getAirLineLogoByCode(code) {
    //Аналогично как и выше, мы могла бы сделать 2 метода как один, добавив передаваемые значения что мы хотим получить (name или code). Но пока методов не так много, и так пойдет
    return this.airlines[code] ? this.airlines[code].logo : "";
  }

  //!Конвертация получаемых данных в удобные для использования
  createShortCitiesList(cities) {
    // Создаем объект для автокомплита в удобно виде
    // {"City, Country" : null }
    // Object.entries => [key, value]
    return Object.entries(cities).reduce((acc, [, city]) => {
      acc[city.full_name] = null;
      return acc;
    }, {});
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
      item.name = item.name || item.name_translations.en;
      acc[item.code] = item;
      return acc;
    }, {});
  }

  serializeCountries(countries) {
    // { "Country code": { ... } }
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  serializeCities(cities) {
    // { 'City name, Country name': { ... } }
    return cities.reduce((acc, city) => {
      const country_name = this.getCountryNameByCode(city.country_code);
      city.name;
      const city_name = city.name || city.name_translations.en;
      const full_name = `${city_name},${country_name}`;
      acc[city.code] = {
        ...city,
        country_name,
        full_name,
      };
      return acc;
    }, {});
  }

  getCountryNameByCode(code) {
    return this.countries[code].name;
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this.lastSearch = this.serializeTickets(response.data);
  }

  serializeTickets(tickets) {
    return Object.values(tickets).map((ticket) => {
      return {
        ...ticket,
        origin_name: this.getCityNameByCode(ticket.origin),
        destination_name: this.getCityNameByCode(ticket.destination),
        airline_logo: this.getAirLineLogoByCode(ticket.airline),
        airline_name: this.getAirLineNameByCode(ticket.airline),
        departure_at: this.formatDate(ticket.departure_at, "dd MMM yyyy hh:mm"),
        return_at: this.formatDate(ticket.return_at, "dd MMM yyyy hh:mm"),
        id: `ticket-/${this.formatDate(
          ticket.departure_at,
          "dd MMM yyyy hh:mm"
        )}`,
      };
    });
  }
}

const locations = new Locations(api, { formatDate });
export default locations;

// { 'City', 'Country', null }
// [{}, {}]
// {'City': {...} => cities{code}}
// {  }

//?2 Реализовали сериалайз данных (преобразовали города, страны для автокомплита в нужный формат). Теперь будет удодно общаться с этими данными
