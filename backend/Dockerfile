FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy rest of the source code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Start the server
CMD ["node", "server.js"]
