FROM golang:1.20

WORKDIR /app/

RUN apt-get update && apt-get install -y librdkafka-dev

# Download Go modules
COPY go.mod go.sum ./
RUN go mod download

EXPOSE 8080

CMD ["tail", "-f", "/dev/null"]