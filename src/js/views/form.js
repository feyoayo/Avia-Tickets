import {
  getAutocompleteInstance,
  getDatePickerInstance,
} from "../plugins/materialize";

//?2 Класс управления формой, тут получаем нужные нам элементы формы и методы для взаимодействия с этими элементами
class FormUI {
  constructor(autocompleteInstance, datePickerInstance) {
    this._form = document.forms["locationControls"];
    this.origin = document.getElementById("autocomplete-origin");
    this.originAutocomplete = autocompleteInstance(this.origin);
    this.destination = document.getElementById("autocomplete-destination");
    this.destinationAutocomplete = autocompleteInstance(this.destination);
    this.depart = datePickerInstance(
      document.getElementById("datepicker-depart")
    );
    this.return = datePickerInstance(
      document.getElementById("datepicker-return")
    );
  }

  get form() {
    return this._form;
    //Для того чтобы мы могли форму использовать в app.js и применять addEventListener чтобы слушать событие submit
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    return this.depart.toString();
  }

  get returnDateValue() {
    return this.return.toString();
  }

  setAutocompleteData(data) {
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;
