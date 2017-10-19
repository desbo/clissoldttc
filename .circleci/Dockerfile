# docker image for build environment
FROM golang:1.9

RUN go get github.com/gohugoio/hugo
RUN go install github.com/gohugoio/hugo

RUN wget http://s3up-linux.s3.amazonaws.com/s3up.gz
RUN gzip -d s3up.gz
