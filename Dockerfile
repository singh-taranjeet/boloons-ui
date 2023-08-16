FROM node:16

WORKDIR /app
COPY package.json .
COPY . .
RUN npm install
RUN npm run build
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]