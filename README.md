react-kanban
===============

Express, Sequelize, HTML5, React and Redux, stored on PostgreSQL

![](https://github.com/SpaceToastCoastToCoast/react-kanban/blob/master/kanban-screenshot.png)

---

An interactive kanban board for assigning tasks to users. Tasks have a title, a short description, a progress status, a priority, a task creator and an assignee. This board displays tasks in an easy to read visual format.

Tasks are placed in the TO DO column on creation, and their progress can be updated in real time. Three levels of priority are available (LOW, MEDIUM and HIGH), color-coded by urgency, which also can be updated in real-time. Both a mobile and a full-width layout are included.

####How to set up

- Create a user in postgres. (e.g. `kanban_admin`)
- Create a database for the project and assign ownership to the new user. (e.g. `kanban_db`)
- Create a config.json in the config directory and make it look like the example provided. Point the username, password and database to your postgres database.
- `npm install`
- Run `node kanban.js`. Exit the process once webpack build finishes.
- Run `sequelize db:seed:all`
- Run `node kanban.js` again and navigate to `http://localhost:3000`