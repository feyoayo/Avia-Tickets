import { format } from "date-fns";

//Подключаем data-fns для того чтобы более удобно было работать с датами.
// Экспортируем функцию

/**
 *
 * @param {String} str
 * @param {String} type - 'yyyy.mm.dd'
 */
export function formatDate(str, type) {
  const date = new Date(str);
  return format(date, type);
}
