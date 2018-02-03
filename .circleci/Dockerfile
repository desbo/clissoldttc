# docker image for build environment
FROM golang:1.9

RUN go get github.com/gohugoio/hugo
RUN apt-get install python
RUN curl -O https://bootstrap.pypa.io/get-pip.py
RUN python get-pip.py --user
RUN python -m pip install awscli