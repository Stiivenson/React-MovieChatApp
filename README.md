# React-MovieChatApp

Select a film and left your comment. Enjoy :)
[`ссылка ----->`](https://stiivenson.github.io/React-MovieChatApp/)

## Architecture

1. **Technology stack:**

- React + TypeScript - for creating UI logic and structure;
- Scss - for CSS styles;
- Axios - handle http-requests;
- Firebase - data base;

2. **Secondary libs:**

- lodash - smart JS functions;
- moment - handle dates and time duration;
- react-js-pagination - React component for pagination;
- react-multi-select-component - React component for DropDown field;

3. **App description:**

- application consists of two main components - films table and comments window;
- FilmsTable:
    - table use pagination, to 'walk' through films array and show certain number of films at once;
    - table has filters:
        - input field to search a film by name;
        - drop down filed, to filter films by genre; user also can select different genres at once;
- CommentsWindow:
    - window show comments of specific field, when user selects a film in the table;
    - user can add his own comments;
    - component connects to firebase and fetches film data;
    - window has component to show errors;
- all fetching actions are followed by preloaders;
- app includes simple authentication - any new user gets nickname, stored in Local Storage, when user sends comment, DB stores sender's name;
    - your own comments have special style in CommentsWindow.
<br />

## Tips
1. **I've got problems with loading films json.** My request from localhost was blocked by CORS. I solved this problem by saving all data in local json-file. It's not so good solution, but I just tried to make it working (if someone would start this app localy). By the way, in real project I would get data from private server, so there would be no problems.

2. **Connecting to DB.** I decided not to load all films into DB and add comments array for each of them. Instead, when user selects a film, CommentsWindow tries to fetch data - find document in DB, by film's name and year. If DB returns nothing, a new document for selected film is created, and user can start commenting. So, if there's a film, that no one likes, DB simply wouldn't store any data about it.
<br />

## Installation

1. Clone repo:
#### `git clone https://github.com/Stiivenson/React-MovieChatApp`
<br />

2. Go to new directory and install dependencies:
#### `cd React-MovieChatApp`
#### `npm i`

3. Start app:

To run in dev mode:
### `npm run start`

To create production bundle:
### `npm run build`
<br />

## More features

I've got only 10 hours to complete this app. Of course, there're many various features, that can be implemented. For example:

- full-weight authentication, with profile page;
- saving films to favorites;
- upgrade films table with more filters;
- improve design;
- ...
