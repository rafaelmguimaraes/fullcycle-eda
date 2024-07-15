FROM golang:1.20

WORKDIR /app

RUN apt-get update && apt-get install -y librdkafka-dev

# Download Go modules
COPY go.mod go.sum ./
RUN go mod download

# Copy the code into the container
COPY . .

EXPOSE 8080

CMD ["go", "run", "cmd/walletcore/main.go"]  