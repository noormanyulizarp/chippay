FROM node
ENV SERVICE_PORT 3000
ENV WAIT_START 0

COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install

EXPOSE ${SERVICE_PORT}
CMD echo "waiting for ${WAIT_START}$.." && sleep ${WAIT_START} && npm start

