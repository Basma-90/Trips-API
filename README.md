# Railway Trips REST API

This is a RESTful API for scheduling and retrieving railway trips. A trip has a departure place, a destination, a starting date, a duration, and a number of passengers. The API uses MongoDB to store the trips data.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Installing

1. Clone the repository: `git clone https://github.com/Basma-90/Trips-API.git`
2. Navigate into the project directory: `cd Trips-API `
3. Set up MongoDB and configure the connection in : `db.config.ts`
4. Install dependencies: `npm install`
5. Start the server: `npm start`

## API Endpoints

### GET /trips

Retrieves all trips. Supports pagination, filtering, and sorting through query parameters.

Query parameters:

- `page`, `limit`: Used for page-based pagination. Default to `page=1` and `limit=10`.
- `date_from`, `date_till`: Declare an interval for the trips date. 
- `sort`: Fields to sort according to (comma-separated). Prefix with a minus sign (-) for descending order.
- `departure`, `destination`: Filter trips by departure and destination cities.

Example Requests:

- `GET /trips?page=2&limit=15`
- `GET /trips?date_from=23-04-2024&date_till=12-07-2024`
- `GET /trips?sort=destination,passengers,-date`
- `GET /trips?departure=Cairo&destination=Luxor`

### POST /trips

Schedules a new trip. All fields are required, make sure the data is valid and the date is well-written in form DD-MM-YYYY. The number of passengers must be greater than 1.

Request body:

```json
{
  "departure": "Cairo",
  "destination": "Luxor",
  "price":3000,
  "startDate": "23-04-2024",
  "duration": 10,
  "passengers": 5
}



