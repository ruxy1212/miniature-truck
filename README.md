# STAGE 2 FRONTEND TASK

## TASK
### Objective

A movie discovery web application that allows users to search for movies, view details about them, and save their favorite movies, consuming data from the TMDB API.

### Requirements

1. User Interface:

- Create a responsive and visually appealing user interface for the application.
- You should list the top 10 movies on the homepage.
- They should be displayed in a grid layout with their movie posters.
- The Card component should display the movie title and release date.
    > card - [data-testid: movie-card]
    > movie poster - [data-testid: movie-poster]
    > movie title - [data-testid: movie-title]
    > movie release date - [data-testid: movie-release-date]

2. Movie Search:

- Implement a search feature that allows users to search for movies by title.
- Display search results, including movie posters, titles, and release dates.
- Show a loading indicator while fetching search results.

3. Movie Details:

/movies/:id route (where :id is the id):
- title - [data-testid: movie-title]
- release date (in UTC) - [data-testid: movie-release-date]
- runtime (in minutes) - [data-testid: movie-runtime]
- overview - [data-testid: movie-overview]

### API Integration

- Consume the TMDB API to fetch movie data.
- Use the following API endpoints:
- Fetch movie details by ID: https://api.themoviedb.org/3/movie/{movie_id}

### Error Handling

- Implement error handling to display meaningful error messages to users in case of API failures or other issues.

### Submission

- Host your frontend application on a platform of your choice (e.g., GitHub Pages, Netlify).
- Provide clear instructions on how to run your project locally in your README.md file.
- Ensure that the code is well-documented and organized.
- This frontend challenge requires you to build a dynamic movie discovery app that interacts with a real API to fetch and display movie data.
- PS: You MUST use react or  Next js

## HOW TO RUN

- Create a directory for the project, open the directory in the terminal and clone the repository into the directory:
    > git clone https://github.com/ruxy1212/miniature-truck.git
- Navigate to the project folder and install the dependencies using `npm`:
    > cd miniature-truck && npm install

- Copy and create an environment file by running the following command:
    > cp .env.example .env

- Inside the `.env`, ensure input your API Key as `REACT_TMDB_API_KEY`

- Start the Frontend Vite server:
    > npm run dev

- The application can be accessed by the browser on `http:127.0.0.1:5713`

> Enjoy!