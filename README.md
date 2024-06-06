# Car store web service

Welcome to the code repository for this simple backend application to
retrieve and modify a list of cars.

Follow the instructions and make sure to meet the requirements to build and execute the application. 

## Requirements

- Git installed
- Docker Compose (this app was tested on Docker Compose version v2.27.0-desktop.2 ) 
- Basic command line knowledge

## Instructions

1. Positionate on a folder where you will clone the repository, e.g. "Documents"
```bash
cd Documents
git clone https://github.com/adairo/car-brands-models.git
```
2. Positionate inside the project folder
```bash
cd car-brands-models
```
3. Execute docker compose to build and run the project. This step might take a few minutes to complete
```bash
docker compose up --build
```

4. Run the script to populate the database
```bash
docker compose exec app node src/config/database/populate.js
```


5. You are ready to go! if you are running the webserver on localhost visit
http://localhost:3000/models to start consulting the web service

