# set base image (host OS)
FROM python:3.8-slim AS baseimg

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

#Application Author
MAINTAINER everythingisdata

# set the working directory in the container
WORKDIR /app

# copy the dependencies file to the working directory
COPY requirements.txt .

#Get pip to download and install requirements
RUN pip install -U pip && pip install -r requirements.txt

COPY . /app