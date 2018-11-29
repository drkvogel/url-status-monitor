
# Dockerfile for https://github.com/drkvogel/newsnow-test

FROM tiangolo/uwsgi-nginx-flask:python3.6

COPY ./server ./server

