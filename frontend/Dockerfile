FROM node:16-alpine
WORKDIR /app
COPY /frontend .
RUN npm i
RUN npm run build
ENV NODE_ENV production
EXPOSE 3030
CMD [ "npx", "serve", "build" ]