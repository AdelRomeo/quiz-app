//создание контрола (input'a)
export function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: ''
  }
}

//валидация введенных вариантов ответа
export function validate(value, validation = null) {
  //если нет параметров валидации возвращаем true и выходим из функции
  if (!validation){
    return true
  }

  let isValid = true;

  if (validation.required){
    //isValid = true если value не пустая строка и isValid до этого true
    isValid = value.trim() !== '' && isValid;
  }

  return isValid;
}

//прошла ли вся форма валидацию
export function validateForm(formControls) {
  let isFormValid = true;

  //проходи по всем элементам в объекте formControls
  for (let control in formControls) {
    //проверка только на верхнем уровне объекта
    if (formControls.hasOwnProperty(control)){
      isFormValid = formControls[control].valid && isFormValid
    }
  }

  return isFormValid
}