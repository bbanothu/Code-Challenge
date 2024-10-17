# Use Node.js image with Debian (Buster)
FROM node:16-buster
RUN apt-get update && apt-get install -y curl python3 make g++
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --no-optional
ENV TEMPORAL_DISABLE_SWC=true
COPY . .
RUN npx prisma generate
EXPOSE 4000
CMD ["npm", "run", "start"]

