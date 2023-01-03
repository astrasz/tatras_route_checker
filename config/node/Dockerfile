FROM node:18.12-alpine
ENV NODE_ENV dev
ENV WDS_SOCKET_PORT=4000

WORKDIR /app

# ENV PATH /frontend/node_modules/.bin:$PATH

COPY ../../frontend/package.json .
COPY ../../frontend/package-lock.json .

COPY ../../frontend/ .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]