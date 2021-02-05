# Django Book Rating app

Django-Fullstack is full stack python repo. 

## TechStack

    Python
    Django
    Angular
    Postgresql
    Docker
    Docker-compose

## Project Setup steps

    1- Create Python environment

## Start Project

     python manage.py runserver

## Command to run and setup application 

- Create Project 
  
        django-admin startproject movierater 
- Create app
            
        django-admin startapp api

- Create and migrate DB chagnes
  
        python manage.py makemigrations
        python manage.py migrate
        python manage.py createsuperuser 
     
- pip commands for setup
 
        pip install python-decouple
        pip install dj-database-url
        pip install dj-static
     
- Setup on Heroku
          
        heroku plugins:install heroku-config
        heroku git:remote -a movie-rater-bharat
        heroku config:push
        heroku config
        git commit -m "Code is ready for Heroku"
        git push heroku master --force
- Migrates inside the Heroku 
  
        heroku run python3 manage.py migrate
        heroku run python3 manage.py createsuperuser


## MoveRaterFront
    npm install
    ng serve -o

#
## Django Admin

Django admin module setup. 

### docker commands 

- Commands for docker-compose build and run
  
        docker-compose build 
        docker-compose up --build 
        docker exec -t -i containerId python manage.py createsuperuser
        docker-compose run web python manage.py migrate
        docker-compose run --rm web python manage.py migrate
 
- Interactive commands for Migrate
    
        docker exec -t -i e22c4f14acb8 bash
        python manage.py migrates

# Hosting On Firebase.

Web front-end hosting on a firebase server. 
Create an account on firebase server and go to the hosting window.
https://console.firebase.google.com/u/0/project/movie-rater-460fb/hosting
    
- Execute below command for hosting in frontend app.
  
        npm install -g firebase-tools
        firebase init
        firebase deploy
  
- Endpoint
   
https://movie-rater-460fb.web.app/ 

### APP endpoints

https://movie-rater-api-ai.herokuapp.com/

### References
 
https://pypi.org/project/django-cors-headers
