# Sobre o e-cattle-host

Esta é a ferramenta oficial de *scaffolding* para a plataforma e-Cattle, projetada para lhe dar uma vantagem inicial na construção da sua nova aplicação microfrontend. Ela gera um modelo base para uma aplicação micro-frontend hospedeira com todas as configurações necessárias e estrutura de diretórios padrão, permitindo que você inicie o desenvolvimento sem o incômodo de configurar o projeto do zero.

Este é um *template* para uma aplicação hospedeira (*Host*), nela já estão instalados todas as bibliotecas e os *plugins*, assim como foram feitas todas as configurações necessárias para a contrução de uma aplicação micro-frontend e com todos os recursos de uma aplicação progressiva *web* (PWA). 

## ✨ Características

Este projeto foi desenvolvido utilizando:
- JavaScript
- Vue.js
- Vutify
- Vite
- Arquitetura Micro-frontend
- *Progressive Web App* (PWA)

Além disso, para manter o padrão de codificação do projeto temos os seguintes módulos instalados e configurados:
- Husk
- Prettier
- Eslint
- Commitlint

Para que esta seja uma aplicação com arquitetura de Micro-frontends com recursos de PWA foi necessário instalar alguns módulos externos, quais sejam:
- [vite-plugin-federation](https://github.com/originjs/vite-plugin-federation)
- [Vite PWA](https://vite-pwa-org.netlify.app/)

A instalação e configuração adequada de cada um desses *plugins* irão garantir o adequado funcionamento de uma aplicação com as características descritas anteriomente.

## 👩🏿‍💻 Pós instalação

Este *template* executará sem a necessidade de qualquer alteração ou ajuste em seu código. Entretanto, para integrar e usar aplicações remotas é necessário declará-las no arquivo `config.federation.js` contido na raiz do projeto. Foi deixado um código comentado com o exemplo de como essa declaração deve ser feita:

```javascript
export default {
  name: 'app',
  remotes: {
    // Exemplo de declaração de um remote
    // remote_app1: 'https://localhost:5005/assets/remoteEntry.js'
  },
  shared: ['vue', 'vuetify', 'axios', 'core-js', 'pinia', 'vue-router']
}
```

É preciso colocar o mesmo valor da chave que expôs na aplicação remota, assim como alterar a porta, e já poderá utilizar o componente/página/função na aplicação hospedeira. Supondo que foi criada uma aplicação remota rodando na porta 5006 que expõe um componente chamado `ComponenteApp1`, como a seguir:

```javascript
// config.federation da aplicação remota
export default {
  name: 'e_cattle_remote',
  filename: 'remoteEntry.js',
  exposes: {
    // componente sendo exposto
    './ComponentApp1': './src/pages/index.vue'
  },
  shared: ['vue', 'vuetify']
}

```

O arquivo `config.federation.js` da aplicação *host* deverá ser alterado para:

```javascript
export default {
  name: 'app',
  remotes: {
    // Alterações realizadas
    e_cattle_remote: 'https://localhost:5006/assets/remoteEntry.js'
  },
  shared: ['vue', 'vuetify']
}
```

A partir dessas modificiações o componente está pronto para ser usado. Veja um exemplo de uso do componente remoto na aplicação *host*:

```javascript
<template>
  <ComponentApp1 v-if="!!ComponentApp1" />
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const ComponentApp1 = defineAsyncComponent(
  () => import('e_cattle_remote/ComponentApp1')
)
</script>
```

Tudo que foi desenvolvido em `ComponentApp1` será mostrado na aplicação hospedeira com todos os recursos e funcionalidades definidos na aplicação remota.

## Contribuir 🚀

Se quiser contribuir, clone este repositório, crie sua própria *branch* de trabalho e mãos à obra!

```bash
git clone https://github.com/andre-violin/e-cattle-host.git
```

```bash
git checkout -b feature/NAME
```

No final, abra um *Pull Request* explicando o problema resolvido ou a funcionalidade adicionada. Se existir, adicione capturas de tela das modificações visuais e aguarde pela revisão!

[Como criar uma Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request) |
[Padrão de Commits](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)

## Licença 📃

Este projeto está sob a licença [MIT](./LICENSE) license
