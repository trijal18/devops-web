FROM node:20

WORKDIR /app

# Install deps before copying source for layer caching
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source *after* install
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
