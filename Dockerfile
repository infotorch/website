FROM node:erbium-alpine3.11 as build

RUN mkdir /code
WORKDIR /code
ENV PATH /code/node_modules/.bin:$PATH
COPY package.json yarn.lock /code/
RUN yarn install --prod --pure-lockfile

# build the site
FROM build as app
COPY . /code
RUN yarn run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=app /code/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY infra/nginx.conf /etc/nginx/conf.d
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]
