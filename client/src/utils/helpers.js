export const formateDate = (date, includeTime = false) => {
  const dateObj = new Date(date);

  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  let formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;

  if (includeTime) {
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    formattedDate += ` ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }

  return formattedDate;
}

export const countDays = (dates) => {
  const timeDiff = Math.abs(dates[0].getTime() - dates[1].getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (diffDays === 1) {
    return "1 day";
  } else {
    return `${diffDays} days`;
  }
}

export const validateNumberInput = (event, field) => {
  if (!/[а-яёa-z]/i.test(event.target.value)) {
    field.onChange(event);
  }
}

export const defaultValidate = (event, field) => {
  return field.onChange(event);
}