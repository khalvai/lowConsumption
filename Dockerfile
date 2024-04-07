
    FROM node:20-alpine

    # Create app directory
    WORKDIR /app

    # A wildcard is used to ensure both package.json AND package-lock.json are copied
    COPY package*.json ./

    RUN npm install --only=production  # Install production dependencies only

    COPY . .



    # Install app dependencies
    RUN  npm install

    RUN npx nest build
  

    COPY . .



 
   EXPOSE 3000
   CMD [ "npm", "run", "start:prod" ]
   