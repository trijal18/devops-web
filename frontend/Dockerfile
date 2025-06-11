FROM node:20

WORKDIR /app

COPY package*.json ./
# RUN npm install
RUN npm install --legacy-peer-deps


COPY . .

EXPOSE 5173

# CMD ["npm", "run", "dev"]
CMD ["npm", "run", "dev", "--", "--host"]



# docker build -t mcq-frontend .
# docker run -p 5173:5173 mcq-frontend
