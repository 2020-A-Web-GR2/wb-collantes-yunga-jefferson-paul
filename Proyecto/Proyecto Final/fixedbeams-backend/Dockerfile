FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .

EXPOSE 777
CMD [ "npm", "run", "start:dev" ]


# EXECUTION
# docker build -t <your username>/node-web-app .
# docker run -p porthost:protdocker -d <your username>/node-web-app
# If you need to go inside the container you can use the exec command:
# docker exec -it <container id> /bin/bash