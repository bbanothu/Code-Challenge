FROM node:16-alpine
RUN apk add --no-cache curl nodejs npm openssl python3 make g++ 
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --no-optional
RUN npm install prisma@latest @prisma/client@latest
COPY . .
RUN npx prisma generate --schema ./prisma/schema.prisma
EXPOSE 4000
RUN curl -sSf https://temporal.download/cli.sh | sh
ENV PATH="${PATH}:/root/.temporalio/bin"
EXPOSE 7233 8233
RUN echo '#!/bin/sh' > /usr/src/app/start.sh && \
    echo 'echo "Starting Temporal server..."' >> /usr/src/app/start.sh && \
    echo 'temporal server start-dev --ip 0.0.0.0 --ui-ip 0.0.0.0 --db-filename /usr/temporal/temporal.db &' >> /usr/src/app/start.sh && \
    echo 'echo "Waiting for Temporal server to start..."' >> /usr/src/app/start.sh && \
    echo 'sleep 10' >> /usr/src/app/start.sh && \
    echo 'echo "Starting worker and API..."' >> /usr/src/app/start.sh && \
    echo 'npm run start' >> /usr/src/app/start.sh && \
    chmod +x /usr/src/app/start.sh
CMD ["/usr/src/app/start.sh"]


