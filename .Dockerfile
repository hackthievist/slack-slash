FROM node:10.0.0-alpine
LABEL Maintainer="Ifeoluwa Sobogun <sobogunifeoluwa@gmail.com>"

WORKDIR /www

ADD application/package.json application/yarn.lock /www/
RUN yarn install \
	&& yarn cache clean;

ADD application /www

CMD ["yarn", "start"]
