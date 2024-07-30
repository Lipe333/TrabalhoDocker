# Trabalho Final de Docker - Sistemas Distribuídos
**Autor**: Felipe Rocha Spitale

**Matrícula**: 22154141

Este projeto é o trabalho final da matéria **Sistemas Distribuídos**. Ele demonstra a criação e gerenciamento de uma aplicação multi-container usando Docker e Docker Compose.

## Descrição do Projeto

O projeto consiste em uma aplicação que inclui um frontend, um backend e dois bancos de dados, todos implementados em contêineres separados. O frontend interage com o backend, que por sua vez se comunica com ambos os bancos de dados. A aplicação permite adicionar, remover e comparar itens entre os dois bancos de dados.

## Como Rodar o Projeto

### 1. Verifique se não há contêineres em execução

Antes de iniciar os contêineres, é recomendável parar e remover qualquer contêiner existente para garantir que você está começando com um ambiente limpo. Execute o seguinte comando:

```docker-compose down```

### 2. Iniciar a aplicação

Para construir e iniciar os contêineres, execute o seguinte comando:

```docker-compose up --build```



