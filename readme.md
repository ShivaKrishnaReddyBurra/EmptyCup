# EmptyCup 
This project implements a mobile web page for listing interior designers, with shortlisting functionality, a Flask-based REST API, and Dockerized deployment.

## Prerequisites
- Docker
- Docker Compose
- Git

## Local Deployment
1. Clone the repository:
   ```bash
   git clone https://github.com/ShivaKrishnaReddyBurra/EmptyCup.git
   cd EmptyCup
   ```
2. Build and run the containers:
   ```bash
   docker-compose up --build
   ```
3. Access the application:
   - Frontend: `http://localhost`
   - Backend API: `http://localhost:5000/api/designers`


## File Structure
- `index.html`: Main HTML file for the frontend.
- `styles.css`: CSS styles for mobile-optimized design.
- `script.js`: JavaScript for dynamic rendering and shortlisting.
- `designers.json`: Static JSON fallback for designer data.
- `app.py`: Flask API for serving designer data.
- `designers.db`: SQLite database for designer data.
- `Dockerfile.frontend`: Docker configuration for frontend.
- `Dockerfile.backend`: Docker configuration for backend.
- `docker-compose.yml`: Orchestrates frontend and backend containers.
- `requirements.txt`: Python dependencies for backend.

## Notes
- The frontend fetches data from the backend API (`http://localhost:5000/api/designers`) with a fallback to `designers.json`.
- The shortlist functionality uses `localStorage` to persist shortlisted designer IDs.
- The database schema is initialized in `app.py` with sample data.
