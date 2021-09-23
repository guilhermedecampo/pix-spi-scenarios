# Cenários de mensagens transacionadas pelo SPI/PIX

Esse repositório tem como objetivo documentar todos os possíveis cenários de sucesso e erros nos fluxos de mensagens transacionadas no SPI. Existem muitas dúvidas ao integrar o sistema do zero e esse material é um reforço em conjunto das casas integrantes para que o ecossistema fique cada dia mais inclusivo e sólido.

## SPI/PIX ⚡️

SPI é o sistema de pagamentos instantâneos no qual os participantes do Pix liquidam transações. Ele é basicamente um sistema de mensageria centralizado e gerenciado pelo BACEN. Todas as mensagens transacionadas seguem a ISO20022 e aqui vamos tratar das mensagens PACS.008, PACS.002, PACS.004, ADMI.002 e demais.

## Configurações ⚙️

Pensando na facilidade de manutenção e colaboração utilizamos o projeto mermaid.js para o diagrama de sequência.


## Colaboração 💡

Você é muito bem vindo a colaborar! Crie issues com suas dúvidas ou melhorias e pull requests com modificações ou novos fluxos. 

## Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
