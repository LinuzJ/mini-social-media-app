<!-- ABOUT THE PROJECT -->

## About The Project

Proof of concept twitter-like social media app built with the MERN stack. Features register/login, posting, liking, commenting. Database hosted on MongoDB Atlas.

### Built With

- [Javascript](https://www.javascript.com/)
- [React](https://reactjs.org/)
- [NodeJS](https://nodejs.org/en/)
- [GraphQL](https://graphql.org/)
- [MongoDB](https://www.mongodb.com/)
- [Apollo server](https://www.apollographql.com/docs/apollo-server/)

<!-- EXAMPLES -->

## Examples

**Logging in:**

![ezgif com-gif-maker](https://user-images.githubusercontent.com/68393238/147136061-e88aac9a-27b9-4637-ba0d-f0f2a8de24d1.gif)


**Liking and creating a post:**

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/68393238/147136106-e1473500-503c-4985-a3bc-f68096d659a3.gif)


**Checking out a post and deleting your own comment:**

![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/68393238/147136129-3b483d5a-6c37-42e5-9b61-a4b0adbcd67a.gif)

#### Functionality

- Register and login/logout a user
- Scroll other users posts and comments
- Like posts
- Comment on posts
- Delete your own posts and comments

<!-- GETTING STARTED -->

## Getting Started

To run this locally you have to create your own database and create an .env file with the necessary data. Make sure you have the latest version of Node.js installed.

### Prerequisites

- Node.js
- npm

### Installation

To install and run locally please follow these steps

1. Clone the repo
   ```sh
   https://github.com/LinuzJ/mini-social-media-app
   ```
2. Install NPM packages for the frontend
   ```sh
   cd front-end && npm install
   ```
   then the backend,
   ```sh
   cd back-end && npm install
   ```
3. Then in two different terminal instances start both:
   ```sh
   cd front-end && npm start
   ```
   ```sh
   cd back-end && npm start
   ```
