# Running instructions

To run this project locally run

```
npm run dev
```

# API Documentation

- [REST API Documentation](#api-documentation)
  * [Host](#host)
  * [Headers](#headers)
- [Models](#models)
  * [User](#user)
    + [User model](#user-model)
  * [Todo](#todo)
    + [App model](#todo-model)

## Host
> http://localhost:3001

## Headers
Header | Value | Description
------------ | ------------- | -------------
authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25JZCI6MiwibmFtZSI6IkdhbGVubyJ9.M7aiCB-TY9-BzPkk0zN5jsXJMHbbqoXT-zjehyOtMuw |  JWT generated through this APIs authentication endpoints
Content-Type | application/json | Requests body must be JSON

# Models


## User
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/self | Get user in session | User | N/A

### user model
```
const User = sequelize.define('User', {
  // Model attributes are defined here
  oAuthId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  oAuthData: {
    type: Sequelize.JSONB
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});
```

## Todo
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/todo | Find many todo | Todo | N/A
GET | /api/todo/:id | Find one todo by id | [[Todo](#todo-model)] | N/A
POST | /api/todo | Create todo | Todo | [Todo](#todo-model) or [[Todo](#todo-model)]
PUT | /api/todo/:id | Update todo | Todo | [Todo](#todo-model) or [[Todo](#todo-model)]
DELETE | /api/todo/:id | Delete todo | Todo | [Todo](#todo-model)

### todo model
```
const Todo = sequelize.define('Todo', {
  text: {
    type: Sequelize.STRING,
    // AllowNull is a flag that restricts a todo from being entered if it doesn't
    // have a text value
    allowNull: false,
    // len is a validation that checks that our todo is between 1 and 140 characters
    validate: {
      len: [1, 140]
    }
  },
  complete: {
    type: Sequelize.BOOLEAN,
    // defaultValue is a flag that defaults a new todos complete value to false if
    // it isn't supplied one
    defaultValue: false
  }
});
```
