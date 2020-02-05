# README for TODO-app

## How to use

URL: http://18.222.111.201/

Create item: click "Add a todo item", fill in item's detail in the pop-up modal. and click "Create"

Read items: whenever the page is loaded

Update item: click the field you want to modify, finish modification in the input, and press "Enter" or just click somewhere else

Delete item: click "Delete" at the end of selected record, then click "OK" in the pop-up confirmation box

## Frontend

The template of frontend comes from `npx create-react-app my-app --typescript`

Modifications are only made in `APP.tsx` and `components/`

## Backend

#### Background

[RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer#Applied_to_Web_services)

[async and await](https://docs.python.org/3/library/asyncio-task.html) (Just need to know how to correctly use these two keywords. The theory of coroutines is really hard to understand :( )

#### Key components

- app.py: Main entry of tornado server
  - Line 14-20: Definition of database object, parameters come from `config.py`
  - Line 22-32: Configure a tornado web application and start it
- routes.py: Aggregation of API routes, helps keep the hierarchy clean
- handler:
  - base.py: Base class of handlers. Defines some basic operations (parse arguments, return responses, etc.) of handlers
  - exceptions.py (not important) : Defines possible exception classes, according to different HTTP status codes
  - Others: Derived classes of handlers for each API
    - Each API should have its own handler class
    - You can define specific handler functions inside each class to respond to different type of requests. For example, your API could respond a POST request if and only if you define a `post()` handler inside the corresponding handler class. 
- dao: data access object: An abstract interface, providing specific data operations without exposing details of the database
  - models: A good practice is that each handler class should have its own "model". The model uses the query parameters passed by handler class, performs database query, and return the formatted result to handler class. This encapsulation improves the readability of our handler classes
  - db.py: The database object is actually an aggregation of models. This object will be injected into Tornado web application (in app.py), and will act as a bridge when handler class is trying to call its own model
  - mysql.py: Definition of mysql connector. Encapsulate some basic operations