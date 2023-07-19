# This is the explanation file 

## 1. Choice of Image

The aim here is to achieve minimal size.
so for i used node:lts-alpine image for both backend and client(fronend) services.
This is because it has minimalistic size which is easy to pull and it is also an lts version.
For the db service, I have used 'mongo:6.0.6' for its minimalistic size.

## 2. Dockerfile Directives . (Dockerfile & Dockerfile )

The backend and frontend services have these directives

### a) FROM - this is the base image and I am using node:lts-alpine.

### b) WORKDIR - this is the directory our application will be running and I have used /app.

### c) COPY -> ./package.json ./ - This will be used to copy the package.json file from the machine to our container. We copy package.json first to our container then install the packages to avoid a situation where our container takes a lot of time to build.

### d) RUN npm install - This command will install all the packages on our package.json file

### e) COPY . . - After copying package.json, we will copy the remaining content to our container

### f) EXPOSE 5001, for the backend service, we would like to access the container from our local machine that is why we are exposing the port 5001. For the client, we will expose 3000 to be able to access the running application on our local machine too.



### g) CMD ["npm", "start"] - This is for the both the client and the backend container and we are starting  with this command.

### 3. Compose File.

We will be using the docker-compose.yml file on the root directory of the project. This is so because, we have created services for backend, client and db and we will run 'docker compose up' to build the containers.
In case of any change we make to our docker-compose.yml we should rebuild the containers with 'docker compose up -d'.

On the compose file, we have these services.

### (i) backend - this is for server container. For dev environment, we will use the Dockerfile.backend.dev on the backend context to build the image. We are connecting container node_modules on the ./backend to watch for any changes on our code base. It also has depends_on, which in this case depends on mongodb container to start before running our backend service. We have mapped our port to 5000 to expose our container to browser.

### (ii) mongodb - this is database container. We using mongo:6.0.8-rc0 image and on we will restart this container any time it fails. We are using the root user and password as the credentials for the db. We are also exposing port 27017 and mapping its volumes to data.

### (iii) client - We builiding a client container, and the context for the docker file is on Dockerfile.client.dev. We are using ./client context and volumes are mapped on ./client. In additon, we are exposing the port 3000 and this service depends on backend service meaning it will run after the backend container is up and running.

### (iv) networks - I have created a user defined network called 'yolo_network'. This network is exposed to all the services on this project.

## 4. Git Workflow

To have this project on your machine, use git clone 'project url' or you can 'fork' the project then clone it as your repo.
To run the containers from your machines, navigate to the root dir of this project then run 'docker compose up' . All the services on the docker compose files will be started. To kill the containers, use 'docker compose down' and all the services will be stopped.

## 5. Publish to Docker Hub

To publish these images to your docker hub, first you need to log into your docker hub account. Run 'docker login '. Provide your docker hub username and password. Push the images to your docker up with these commands:

- docker build -t dockerhubusername/containername:version -f ./dir for dockerfile

### (a) backend: docker build -t pmukethi/backend:v1.0.1 -f ./backend/Dockerfile.backend.dev ./backend

### (b) client: docker build -t pmukethi/client:v1.0.1 -f ./client/Dockerfile.client.dev ./client

- docker push to docker hub.

### (a) backend: docker push pmukethi/backend:v1.0.1

### (b) client: docker push pmukethi/client:v1.0.1

## 6. Running The Containers

To run the containers,

### 1. clone the repo with git clone 'repo_url'

### 2. Navigate into the clone repo with cd yolo.

### 3. In the root dir of this project there is a docker-compose.yml file

### 4. use docker compose build to build the containers

### 5. do a docker compose up to run the containers

### 6. Access the client app with localhost:3000/ on the browser

### 7. I added 2 products via this link and i was able to see them on the browser: http://localhost:3000/#products

## 6. Docker Images On Docker Hub links

