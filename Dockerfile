FROM node:16-alpine
RUN apk add --no-cache tzdata
RUN apk add --no-cache curl 
ENV TZ=Asia/Kolkata
ENV NODE_ENV production
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run test
RUN chown -R node:node /app
USER node
EXPOSE 3000
# Add a health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD \
curl http://localhost:3000/health || exit 1
CMD ["npm", "start"]

