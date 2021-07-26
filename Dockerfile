FROM node:13-alpine

WORKDIR /user/app/

COPY . /user/app/

RUN npm install 

EXPOSE 8080
ENV PORT=8080

CMD ["node", "/user/app/index.js"]