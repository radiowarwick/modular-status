FROM node:10

WORKDIR /www

# Copy package.json & package-lock.json and install depends
COPY package*.json ./
RUN npm install --production

# Copy the src and build
COPY . .
RUN npm run-script build

# Override the port
ENV PORT 8080
EXPOSE 8080

# Must be run from the server directory
WORKDIR /www/server
CMD ["node", "index.js"]