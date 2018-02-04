# Dreamstate
##https://dream-state-app.herokuapp.com/

Uncover the true meaning of your subconcious dreams and discover what your  consious mind has learned to repress. Dreamstate is an interactive application enabling users to understand the meaning of their dreams and view an overall sentiment based on keyword analysis. 

## Requirements
* Build a full-stack application
* Have an interactive front-end
* Be a complete product (CRUD functionality)
* Use a database (MongoDB)
* Implement thoughtful user stories
* Have a visually impressive design 
* Be deployed online and accessible to the public.

## Technologies Used
* Node/Express
 	* Key modules:
     * Cheerio - Dream Analysis data scraping
     * Passport / Bcrypt - Authentication and password hashing
     * Cloudinary / Multer - Profile photo uploading through Cloudinary API
   * Key APIs:
   	 * AWS - detectKeyPhrases for keyword analysis
   	 * AWS - detectSentiment for sentiment analysis
* React
	* Key modules:
	 * Recharts
	 * Axios
	 * React-router-dom
	* CSS Framework: Material UI
* MongoDB with Mongoose


## User Stories
The target user for this app is the ever curious dreamer who is interested in uncovering the true meaning of their dreams and discovering trends in their dreams over time. The users are not those trying to explore a supernatural communication, they  just regular people simply trying to understand how their everyday life is impacting their dreamstate.
* As a user, I want to...
  * be able to quickly concisely analyze key points I remember from my dream
  * be able to understand the overall sentiment based on the content I have entered
  * be able to read more thorough analysis of 
  * be able to track the sentiment of my dreams overtime
  * be able to see if there is an overall trend in the keywords or phrases appearing in my dreams
  * be able to keep an up to date journal of all the dreams I recall to revisit and edit over time


## Development Sprints and Process

### Sprint 1

##### 1. Planned out features and functionality
See "Routes and Models" section for final outline of website structure
##### 2. Developed Wireframes
![](/public/img/wireframe-1.png)

![](/public/img/wireframe-2.png)

First round wireframes show the initial vision for plant view and profile pages.
##### 3. Developed Moodboards
![](/public/img/moodboard.jpg)

I researched plant imagery and colors and created a moodboard. This helped identify the colors and mood I would be aiming for in my design.
##### 4. Setup Trello Board
![](/public/img/trello-board.png)

Trello board status as Sprint 3 wraps. Sprints were color coordinated to help see what might be lagging behind.
##### 5. Stubbed out Routes and Set up Models
Got database running with models and associations.
##### 6. Setup Auth
Utilized auth, including hashed passwords and an authorization flow.
##### 7. Scraped Plant Data into Database
Used Cheerio to pull plant care rankings out  of a research table, as well as images from Wikipedia, then inserted into database.

### Sprint 2
##### 1. Built out key pages for all plants, plant detail, and user profile
##### 2. Completed routes with get, post, put, and delete functionality
   * Users can add/delete plants, add/delete comments, and add/delete/edit journal posts

##### 3. Wrote hooks to correct problematic plant data
##### 4. Wrote loops to go through and add tags as needed to plants
##### 5. Integrated repeated content into partials
##### 6. Completed MVP level functionality

### Sprint 3
##### 1. Integrated Cloudinary API so that users could upload profile pictures
##### 2. Added search functionality for plants
##### 3. Integrated Semantic UI, in particular for grids and to allow for a more user-friendly search tool
##### 4. Built out CSS further for subpages

![](/public/img/live-screenshot-1.png)

![](/public/img/live-screenshot-3.png)

![](/public/img/live-screenshot-2.png)

#### Backlog
  * Responsive navbar (Semantic UI does not have this component)
  * More dynamic tag and water filtering on page (have a start in my code, but not there yet)
  * Scrub database further, adjust plant names as needed so that they can be better located on Wikipedia
  * Scrape lists of easy houseplants and add to "low maintenance" tag
  * Scrape ASCPA website for cat/dog safety and add "cat-friendly"/"dog-friendly" tags
  * Lazy load functionality for longer pages
  * Sticky "back to top" icon

## Routes and Models
* **Routes**
  * Index
    * `GET /` - home page that welcomes user
  * Auth
    * `GET /auth/login` - renders login page
    * `POST /auth/login` - signs in existing user 
    * `GET /auth/signup` - renders sign up page  
    * `POST /auth/signup` - creates new user in database 
    * `GET /auth/logout` - logs out user 
  * Plants
    * `GET /plants` - loads full plant database
    * `GET /plants/:id` - loads individual plant
    * `POST /plants` - associates plant with user in the database (adds to their list of plants)
    * `DELETE /plants/:id` - removes association of user and plant in the database (removes from list of plants)
    * `GET /plants/search` - runs a query for the plant based on the user's search input
    * `GET /plants/notfound` - loads 404 page when user searches for a plant that doesn't exist
  * Comments
    * `POST /comments` - adds comment to individual plant
    * `DELETE /comments/:id` - removes comment from individual plant
  * Journal
    * `GET /journal` - renders full page of all journal entries
    * `GET /journal/new` - renders page for user to post a new journal entry
    * `GET /journal/:id` - renders page for individual journal entry
    * `POST /journal` - adds entry to user's journal
    * `GET /journal/edit/:id` - renders page for user to edit an existing journal entry
    * `PUT /journal/:id` - edits journal entry in database
    * `DELETE /journal/:id` - deletes journal entry from database
  * Tags
    * `GET /tags/:id` - renders all plants for the selected tag
  * Users
    * `GET /users/profile` - renders user's profile page when logged in
    * `GET /users/plants` - renders page with user's full collection of saved plants
    * `GET /users/profilepic` - renders page to update user's profile picture
    * `POST /users/profile` - uploads user's new profile picture through Cloudinary
    * `POST /users/lastwatered` - edits the date in the database when user last checked on their plants
* **Models**
(Note: some fields not listed below as they are not currently utilized)
  * Comment - content, userId, authorName, plantId, imageUrl
    * Belongs to plants and users
  * Journal - title, content, useId, imageUrl
    * Belongs to user
  * Plant - name, botanicalName, light, temperature, humidity, water, soil, imageUrl
    * Belongs to many users, belongs to many tags, has many comments
  * Tag - content
    * Belongs to many plants
  * User - name, email, password, zipcode, userImg, lastWatered
    * Belongs to many plants, has many journals, has many comments

## Steps to Setting Up
If you'd like to set this project up on your own local server:
* Fork and clone this repository
* Run `npm install` to install dependencies
  * Use `nodemon` to start your application
* Setup your database (this app already has one existing model)
  * Run `createdb plantparenthood` to create the database
  * Run `sequelize db:migrate` to run migrations
* Create .env file, which will need to include:
  * `SESSION_SECRET` (you determine this)
  * `BASE_URL` (where you will deploy the site)
  * `CLOUDINARY_URL` (from your Cloudinary account)
* Review database setup file
  * Follow directions in `dbSetup.js` to scrape data and add tags

## Sources
* Plant Data
  * Plant Care Rankings - http://extension.uga.edu/publications/detail.html?number=B1318
  * Individual Plant Images - https://www.wikipedia.org/
* Supporting Icons and Imagery
  * Stock Photos - Pexels
    * https://www.pexels.com/photo/summer-branches-leaves-tree-92733/
  * Icons - Noun
    * https://thenounproject.com/term/houseplant/321363/
    * https://thenounproject.com/term/drop/1372766/
    * https://thenounproject.com/term/fog/19882/
    * https://thenounproject.com/term/sun/1241046/
    * https://thenounproject.com/term/temperature/399436