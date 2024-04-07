
    FROM node:20-alpine

    # Create app directory
    WORKDIR /app

    # A wildcard is used to ensure both package.json AND package-lock.json are copied
    COPY package*.json ./


    COPY . .



    # Install app dependencies
    RUN  npm install

    RUN npx nest build
  

    COPY . .



 
   EXPOSE 3000
   CMD [ "node", "dist/main.js" ]
   