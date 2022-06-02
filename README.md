<p align="center">
  <img src="src/images/header/logo.svg" alt="logo" align="center">  
</p>
<h1 align="center"> Movie explorer. Frontend </h1>

<p align="center" >React приложение по поиску фильмов</p>




## Описание
Дипломный проект Яндекс Практикума. Frontend часть.

Адаптивное веб-приложение со следующими особенностями: 
 - главная страница - лендинг с описанием проекта и автора
 - регистрация и авторизация пользователей
    - работа с персональным jwt
    - сохранение, проверка, редактирование и получение данных пользователя - использование собственного API
 - поиск фильмов c возможностью их сохранения в личную коллекцию
    - глобальный поиск по фильмам - использование стороннего API
    - сохранение, поиск и отображение сохраненной коллекции фильмов - использование собственного API  
 - изменение профиля
 - валидация полей ввода
    - использование кастомного хука валидации форм
 - переключатель короткометражек

### Link
С проектом можно ознакомиться по [Ссылке](https://movies-expl.nomoredomains.work),
либо самостоятельно перейдите по адресу `https://movies-expl.nomoredomains.work`

## Технологический стек

* React.js (v. 17)
* React Router (ver. 5.2.1)
* JS
* CSS
  * адаптивность через media screen
  * flex
  * grid
* Figma (работа с макетом)

## Локальная установка проекта
1) Выполните в терминале команду `git clone https://github.com/Avellow/movies-explorer-frontend.git`
2) Внутри клонированного проекта введите `npm install`

## Планы по доработке
- [X] ~~оптимизировать размер карточек под разную ширину окон браузера (минимизировать ширину боковых "ушей")~~
- [ ] рефакторинг полей воода и непосредственно компонента Input
- [ ] оптимизировать приложение под разные браузеры (в т.ч. старые)
