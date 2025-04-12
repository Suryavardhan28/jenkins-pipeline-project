# Dockerfile
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies (runs as root)
RUN npm install

# Copy all app source code
COPY . .

# Fix permissions so node user can access everything
RUN chown -R node:node /app

# Switch to node user (default in node images)
USER node

# Expose port and start app
EXPOSE 3000
CMD ["npm", "start"]
