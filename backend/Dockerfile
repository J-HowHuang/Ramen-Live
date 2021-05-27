FROM golang:1.16-alpine

ADD . /backend

WORKDIR /backend

RUN go get .
RUN go build -o backend main.go

EXPOSE 8088
ENTRYPOINT [ "./backend" ]