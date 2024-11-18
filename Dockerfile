FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache git
RUN git clone https://github.com/jimchen2/My-Website-New .
RUN npm install
RUN npm install - @swc/cli @swc/core
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
