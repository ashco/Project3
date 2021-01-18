# Dreamstate

https://dream-state-app.herokuapp.com/

Uncover the true meaning of your subconscious dreams and discover what your conscious mind has learned to repress. Dreamstate is an interactive application enabling users to understand the meaning of their dreams and view an overall sentiment based on keyword analysis.

The final website is responsive to multiple screen sizes:

![](/client//public/img/screenshot1.png)
![](/client//public/img/screenshot2.png)

![](/client//public/img/screenshot3.png)
![](/client//public/img/screenshot4.png)

## Requirements

- Build a full-stack application
- Have an interactive front-end
- Be a complete product (CRUD functionality)
- Use a database (MongoDB)
- Implement thoughtful user stories
- Have a visually impressive design
- Be deployed online and accessible to the public.

## Technologies Used

- Node (v8.9.4)
- Express
  - Key modules:
    - Cheerio - Dream Analysis data scraping
    - Passport / Bcrypt - Authentication and password hashing
  - Key APIs:
    - AWS - detectKeyPhrases for keyword analysis
    - AWS - detectSentiment for sentiment analysis
- React
  - Key modules:
  - Recharts
  - Axios
  - React-router-dom
  - CSS Framework: Material UI
- MongoDB with Mongoose

## User Stories

The target user for this app is the ever curious dreamer who is interested in uncovering the true meaning of their dreams and discovering trends in their dreams over time. The users are not those trying to explore a supernatural communication, they just regular people simply trying to understand how their everyday life is impacting their dreamstate.

- As a user, I want to...
  - be able to quickly concisely analyze key points I remember from my dream
  - be able to understand the overall sentiment based on the content I have entered
  - be able to read more thorough analysis of
  - be able to track the sentiment of my dreams overtime
  - be able to see if there is an overall trend in the keywords or phrases appearing in my dreams
  - be able to keep an up to date journal of all the dreams I recall to revisit and edit over time

## Development Sprints and Process

### Sprint 1

##### Share, Brainstorm and Choose idea

##### 1. Planned out features and functionality

##### 2. Developed Wireframes

![](/client//public/img/wireframes_v1.jpg)

##### 3. Indetify and check functionality of APIs

##### 4. Identify Data Scraping sites to use

##### 5. Setup Trello Board

![](/client//public/img/TrelloBoard.png)

##### 6. Setup Authentication

##### 7. Stubbed out Routes and Set up Mongo Database Models

##### 8. API Call Testing

##### 9. Data Scraping Functionality and testing

### Sprint 2

##### 1. Choose CSS Framework

##### 2. Developed Moodboards and choose theme

![](/client//public/img/moodboard-light.jpg)

##### 3. Component Planning and assignment to individual team members

![](/client//public/img/wireframes_profile_v1.jpg)

##### 4. Completed routes with get, post, put, and delete functionality

- Users can add/edit/delete dreams

##### 5. Implement data cleansing to reformat raw data returned form API & data scraping functionality

##### 6. Error handling

- Raw Data
- User entries

##### 7. Basic styling completed MVP level functionality

### Sprint 3

##### 1. Finalize data visualizations

- Add functionality for tooltips

##### 2. Add conditional rendering to render appropriate data visuals for varying user account status

##### 3. Update user-facing terminology

##### 4. Re-factor layout for improved userflow

##### 5. Final CSS and Mobile Comptability

#### Backlog

- More robust options for keyword analysis - this may include scraping other sites to retrieve keyword content or rescraping the initial site for references to other keywords
- Scrape most common dreams and meanings for readers to references

## Routes, Component Structure, and Models

- **Routes**

  - Auth

    - `POST /auth/login` - signs in existing user
    - `POST /auth/signup` - renders sign up component
    - `POST /me/from/token` - create user token and sets expiration of token

  - Dream

    - `POST /` - runs analysis on user's input (keyword analys, sentiment analysis, and data scraping)
    - `DELETE /dream/:id` - removes dream of specified user from dream log
    - `PUT /dream/edit/:id` - identifies and updates selected dream of the user commiting changes to the database

  - Profile

    - `GET /profile` - queries dream database to select all dream data associated to the logged in user to render trends over time

  - User
    - `GET /log` - queries dream database to return all all dream data assoiated to logged in user to render all dream

- **Models**
  - User -
    - Purpose: store signed-up user information
    - Fields: name, email, password
  - Dream - user_id, date, content,
    - Purpose: store all dream data for signed-up users
    - Fields: user_id, date, content, sentiment, score_positive, score_negative, score_neutral, score_mixed, keyword1, keyword2, keyword3, keyword4, keyword5

## Steps to Setting Up

If you'd like to set this project up on your own local server:

- Fork and clone this repository
- Run `npm install` to install dependencies in both client and main project folder
  - Run `npm run build` in client folder
  - Use `nodemon` to run the application in the main project folder
- Setup your database (this app utilizes one MongoDB model)
- Create .env file, which will need to include:
  - `MONGODB_URI` Connection string to mongo database.
  - `JWT_SECRET` (you determine this for user token creation)
  - AWS Access Keys - Only needs ComprehendFullAccess permissions
    - `AWS_KEY_ID`
    - `AWS_SECRET_KEY`
- Review database setup and check mongoDB to confirm data
  \*If needed, use MongoDB Compass to view data entries

## Sources

- Dream Analysis
  - Sentiment Analysis and Keyword Analysis - https://aws.amazon.com/comprehend/
  - Individual Keyword Descriptions and Meanings - http://www.dreambible.com/search.php
- Stock Photo
  - Pexel - https://www.pexels.com/photo/rocky-mountain-671658/
