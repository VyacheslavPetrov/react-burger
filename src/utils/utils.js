export const filterArray = (arr) => {
  return arr.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.type]: [...(acc[curr.type] || []), curr],
    }),
    {}
  );
};

export const calculationCost = (bun, arrOtherIngredients) => {
  const bunPrice = bun ? bun.price : 0;
  return (
    bunPrice * 2 +
    arrOtherIngredients.reduce((acc, curr) => (acc += curr.price), 0)
  );
};

export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
      '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name, value, props) => {
  props = {
    path: '/',
    ...props,
  };
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export const deleteCookie = (name) => {
  setCookie(name, null, { expires: -1 });
};

//получить дату создания заказа
const getDaysForCard = (days) => (
  days === 0 ? 'Сегодня'
    : days === 1 ? 'Вчера'
    : days > 1 ? `${days} дня(-ей) назад`
      : 'Что-то пошло не так:(');

//сформировать тату создания заказа для карточки
export const conversionDateForCard = (date) => {
  const dayCreated = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = Math.ceil((today - dayCreated) / (60 * 60 * 24 * 1000));
  const hours = dayCreated.getHours() > 9 ? dayCreated.getHours() : `0${dayCreated.getHours()}`
  const min = dayCreated.getMinutes() > 9 ? dayCreated.getMinutes() : `0${dayCreated.getMinutes()}`

  return `${getDaysForCard(diffTime)}, ${hours}:${min} i-GMT+${dayCreated.getTimezoneOffset() * (-1) / 60}`;
};

//сортировка заказов по статусу
export const filterOrdersByStatus = (arr) => {
  return arr?.reduce((acc, curr) => {
    curr.status === 'done' ? acc['done'] = [...acc['done'], curr] : acc['pending'] = [...acc['pending'], curr]
    return acc;
  }, { done: [], pending: [] })
}