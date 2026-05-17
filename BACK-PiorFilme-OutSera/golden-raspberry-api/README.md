# Golden Raspberry Awards API

API RESTful em Java + Spring Boot para ler uma lista CSV de indicados/vencedores da categoria **Pior Filme** do Golden Raspberry Awards e retornar os produtores com:

- menor intervalo entre dois prêmios consecutivos;
- maior intervalo entre dois prêmios consecutivos.

## Tecnologias

- Java 17
- Spring Boot 3
- Spring Web
- Spring Data JPA
- H2 Database em memória
- JUnit 5
- MockMvc
- Maven

## Como executar

```bash
mvn spring-boot:run
```

A API ficará disponível em:

```text
http://localhost:8080
```

## Endpoint

```http
GET /api/awards/intervals
```

Exemplo de resposta:

```json
{
  "min": [
    {
      "producer": "Joel Silver",
      "interval": 1,
      "previousWin": 1990,
      "followingWin": 1991
    }
  ],
  "max": [
    {
      "producer": "Matthew Vaughn",
      "interval": 13,
      "previousWin": 2002,
      "followingWin": 2015
    }
  ]
}
```

## CSV

O arquivo CSV fica em:

```text
src/main/resources/movielist.csv
```

Formato esperado:

```csv
year;title;studios;producers;winner
1990;The Adventures of Ford Fairlane;20th Century Fox;Joel Silver;yes
```

A coluna `winner` deve receber `yes` para vencedores. Linhas sem `yes` são tratadas como não vencedoras.

## Banco H2

Console H2:

```text
http://localhost:8080/h2-console
```

Dados de acesso:

```text
JDBC URL: jdbc:h2:mem:goldenraspberry
User: sa
Password: vazio
```

## Como executar os testes de integração

```bash
mvn test
```

Os testes carregam o contexto Spring Boot, leem o CSV, populam o H2 e validam o retorno do endpoint `/api/awards/intervals`.
