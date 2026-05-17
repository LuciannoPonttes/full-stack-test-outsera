# Golden Raspberry - Docker Setup

## Pré-requisitos

Antes de iniciar, instale:

- Docker Desktop
- Docker Compose
- Node.js (opcional para testes locais)

---

# Estrutura esperada

```text
RAIZ-PROJETOS
├── BACK-PiorFilme-OutSera
│   └── golden-raspberry-api
├── FRONT-PiorFilme-OutSera
│   └── golden-raspberry-interface
└── docker-compose.yml
```

---

# Backend Dockerfile

Arquivo:

```text
BACK-PiorFilme-OutSera/golden-raspberry-api/Dockerfile
```

Conteúdo:

```dockerfile
FROM maven:3.9.8-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

# Frontend Dockerfile

Arquivo:

```text
FRONT-PiorFilme-OutSera/golden-raspberry-interface/Dockerfile
```

Conteúdo:

```dockerfile
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/golden-raspberry-interface/browser /usr/share/nginx/html

EXPOSE 80
```

---

# Docker Compose

Arquivo:

```text
D:\PROJETO- OUTSERA\docker-compose.yml
```

Conteúdo:

```yaml
services:
  backend:
    build:
      context: ./BACK-PiorFilme-OutSera/golden-raspberry-api
      dockerfile: Dockerfile
    container_name: golden-raspberry-api
    ports:
      - "8080:8080"

  frontend:
    build:
      context: ./FRONT-PiorFilme-OutSera/golden-raspberry-interface
      dockerfile: Dockerfile
    container_name: golden-raspberry-interface
    ports:
      - "4200:80"
    depends_on:
      - backend
```

---

# Comandos

## Entrar na pasta do projeto

```bash
cd "D:\PROJETO- OUTSERA"
```

---

## Subir aplicação

```bash
docker compose up --build
```

---

## Subir em background

```bash
docker compose up -d --build
```

---

## Ver containers ativos

```bash
docker ps
```

---

## Ver logs

```bash
docker compose logs -f
```

---

## Parar containers

```bash
docker compose down
```

---

## Rebuild completo sem cache

```bash
docker compose down --rmi local

docker compose build --no-cache

docker compose up
```

---

## Remover containers, imagens e volumes

```bash
docker compose down -v --rmi all
```

---

# URLs

## Frontend

```text
http://localhost:4200
```

## Backend

```text
http://localhost:8080
```

---

# Teste da API

Exemplo:

```text
http://localhost:8080/api/movies
```

---

# Problemas comuns

## Página padrão do nginx

Se aparecer:

```text
Welcome to nginx!
```

Faça:

```bash
docker compose down --rmi local

docker compose build --no-cache frontend

docker compose up
```

Depois limpe o cache do navegador:

```text
Ctrl + F5
```

ou abra em janela anônima.

---

# Build manual Angular

Caso queira validar o build do Angular:

```bash
cd FRONT-PiorFilme-OutSera/golden-raspberry-interface

npm install
npm run build
```

A pasta gerada deve ser: