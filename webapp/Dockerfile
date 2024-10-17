# Use an appropriate base image
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force && \
    rm -rf node_modules
RUN npm install --arch=x64 --platform=linux
COPY . .
CMD ["npm", "start"]