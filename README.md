# Staybnb

Welcome to Staybnb, a clone of Airbnb.


## Technologies used:

![](https://user-images.githubusercontent.com/94085979/187011760-2ab7d8fe-2020-40d8-84a1-3e463ae6718e.svg)
![](https://user-images.githubusercontent.com/94085979/187011810-b9378e1a-8d2d-49ea-8d3d-eb3e83447c13.svg)
![](https://user-images.githubusercontent.com/94085979/187011814-ffd57673-d860-42dc-833b-20c793553b00.svg)
![](https://img.shields.io/badge/-Sequelize-52B0E7?logo=sequelize&logoColor=white&style=for-the-badge)
![](https://img.shields.io/badge/-Express-black?logo=express&logoColor=white&style=for-the-badge)
![](https://user-images.githubusercontent.com/94085979/187011820-bbcedb49-f350-456d-8d11-14326b394b2c.svg)
![](https://user-images.githubusercontent.com/94085979/187011825-efa962b0-85f6-4ead-a408-835f449860e9.svg)
![](https://user-images.githubusercontent.com/94085979/187011832-f41fd6fb-9845-4e2b-8423-4c58848612a4.svg)
![](https://img.shields.io/badge/-Amazon%20S3-569A31?logo=amazon-s3&logoColor=white&style=for-the-badge)
![](https://img.shields.io/badge/-SQLite-003B57?logo=sqlite&logoColor=white&style=for-the-badge)
![](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
![](https://img.shields.io/badge/-NPM-CB3837?logo=npm&logoColor=white&style=for-the-badge)
![](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white&style=for-the-badge)



## About the Project

[API Documentation](https://github.com/davidjettt/Airbnb-clone/wiki/API-Documentation)

[Database Schema](https://github.com/davidjettt/Airbnb-clone/raw/master/backend/airbnb-clone-db-schema-3.png)

[Features List](https://github.com/davidjettt/Airbnb-clone/wiki/Features-List)

[Redux State Shape](https://github.com/davidjettt/Airbnb-clone/wiki/Redux-State-Shape)

[Frontend Route](https://github.com/davidjettt/Airbnb-clone/wiki/Frontend-Routes)



## Home Page
![](app-screenshots/staybnb-homepage.png)

## Spot Details
![](app-screenshots/staybnb-spot-page.png)

## User Reviews
![](app-screenshots/staybnb-user-reviews.png)

## How to Launch Project

To launch project locally:
- `cd` into the backend folder.
- Create a `.env` file with environment variables:
    ```
    PORT=8000
    DB_FILE=db/dev.db
    JWT_SECRET=INSERT-PASSWORD-HERE
    JWT_EXPIRES_IN=604800
    ```
- Run `npm install` and then `npm start` to start the server.
- On a separate terminal, `cd` into the frontend folder.
- Run `npm install` and then `npm start` to launch application onto the browser at http://localhost:3000
