<p align="center">
  <img src="src/images/header/logo.svg" alt="logo" align="center">  
</p>
<h1 align="center"> Movie explorer. Frontend </h1>

<p align="center" >React приложение по поиску фильмов</p>




## Описание
Frontend часть приложения 'Movies-Explorer'

Веб-приложение со следующими особенностями:
 - Responsive Web Design
 - главная страница - лендинг с описанием проекта и автора
 - регистрация и авторизация пользователей
    - работа с персональным jwt
    - сохранение, проверка, редактирование и получение данных пользователя - использование собственного API
 - поиск фильмов c возможностью их сохранения в личную коллекцию
    - глобальный поиск по фильмам - использование стороннего API
    - сохранение, поиск и отображение сохраненной коллекции фильмов - использование собственного API  
 - изменение профиля
 - валидация полей ввода
    - использование кастомного хука валидации форм (в процессе - рефакторинг с использованием React-hook-form)
 - переключатель короткометражек

## Технологический стек

* React.js (v. 17)
* Redux (v. 4.2.0)
* React Router (ver. 5.2.1)
* JS
* CSS
  * адаптивность через media screen
  * flex
  * grid
* Figma (работа с макетом)

## Локальная установка проекта
1) Выполните в локальном терминале команду `git clone https://github.com/Avellow/movies-explorer-frontend.git`
2) Внутри клонированного проекта введите в терминале `npm install`
3) Для запуска проекта введите `npm run start`
* Измените порт или адрес сервера приложения в src/utils/constants (строка 5) в переменной MAIN_SERVER_URL, если это требуется
  (репозиторий сервера доступен по ссылке [https://github.com/Avellow/movies-explorer-api](https://github.com/Avellow/movies-explorer-api))

## Планы по доработке
- [X] ~~оптимизировать размер карточек под разную ширину окон браузера (минимизировать ширину боковых "ушей")~~
- [X] ~~использовать Redux и RTK в проекте~~
- [X] ~~рефакторинг форм с использованием библиотеки React Hook Form~~
