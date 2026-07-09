# Pantry Tracker

A full-stack web application for managing pantry inventory, tracking expiration dates, and organizing household food items.

This project was built to strengthen my full-stack development skills by implementing a complete CRUD application with a React frontend, an Express/Node.js backend, and a PostgreSQL database.

## Features

* Create pantry items
* View pantry inventory
* Edit existing pantry items
* Delete pantry items
* Responsive card-based layout
* Search pantry items
* Sort items alphabetically
* Sort items by expiration date

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

## Project Structure

```
PantryTracker
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── server.js
│   ├── package.json
│   └── tests
│
└── README.md
```

## Getting Started

### Clone the repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd backend
npm install
node server.js
```

The backend runs on:

```
https://pantry-tracker-api-aahe.onrender.com
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```
http://localhost:5173
```

## Database

The project uses PostgreSQL.

Create an `items` table with the following columns:

* id
* name
* brand
* purchase_date
* expiration_date
* location
* owner

## Future Improvements

* User authentication
* Expiration notifications
* Group items by pantry location
* Advanced filtering
* AI-powered recipe recommendations based on pantry contents
* Smart grocery list generation
* Duplicate item detection
* Image support for pantry items
* Unit and integration testing

## Author

Chaithu Sridhar
