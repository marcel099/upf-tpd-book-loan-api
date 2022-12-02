# WebService de Empréstimo de Livros para Bibliotecas

## Tecnologias usadas

- NestJS (framework TypeScript de uso geral)
- PrismaJS (framework ORM e ODM)
- MongoDB (SGBD)

## Como executar

1. Baixe o código do projeto

2. Instale as dependências. De preferência, utilize a ferramenta Yarn para instalar através do comando `yarn install` pois Yarn foi utilizado no desenvolvimento do projeto.

3. Preencha a variável de ambiente <i>DATABASE_URL</i> do arquivo `.env` com um endereço URL para um banco de dados MongoDB.

4. Execute o servidor através do comando `yarn start:dev`

5. Pronto! O WebService está apto a receber requisições!

### Dica de Uso

Acesse o endereço `localhost:3000/api` e explore o WebService através da documentação gerada de forma automática pela por meio da fácil integração entre Nest e Swagger.

### Cuidado

O banco MongoDB utilizado deve ser do tipo _Replica Set_ para que o framework ODM Prisma possa conectar-se com sucesso ao banco.
