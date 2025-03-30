# 🧪 Desafio Frontend Vue - Chat de Áudio com Transcrição

Este projeto é um desafio frontend utilizando Vue.js e Tailwind CSS. O objetivo é construir uma aplicação web com login, cadastro e uma interface de chat onde o usuário grava um áudio e recebe uma transcrição e um resumo simulados.

## 🔗 Figma
As telas da aplicação foram desenhadas no Figma e seguem este layout:
👉 [Link para o Figma](https://www.figma.com/design/IiT9wMNSXRqylP6hUzdhnX/Agendart-Test?node-id=0-1&t=aIurnBS6kDPyNc1O-1)

## 🚀 Funcionalidades

- Login com validação via JSON Server
- Cadastro de novo usuário
- Tela de chat com transcrição de áudio usando Web Speech API
- Exibição de áudio gravado e resumo (mock)
- Histórico de mensagens com animações
- Responsivo e estilizado com Tailwind CSS
- Toast para feedback de login e cadastro

## 

## 🛠 Tecnologias Utilizadas

- [Vue 3 + Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JSON Server](https://github.com/typicode/json-server)
- Web APIs: `MediaRecorder` e `SpeechRecognition`
- [HeroIcons](https://heroicons.com/) para ícones

## 📂 Estrutura do Projeto
```bash
public/             # Imagens
src/
├── assets/         # Imagens e ícones
├── components/     # Componentes reutilizáveis (ex: AudioRecorder, Login, Signup)
├── views/          # Páginas principais (LoginView, ChatView)
├── router/         # Configuração das rotas
├── App.vue         # Componente raiz
└── main.js         # Arquivo de entrada
```


## 📦 Instalação e Execução

```bash
# Clone o projeto
$ git clone https://github.com/seu-usuario/nome-do-repositorio.git

# Instale as dependências
$ npm install

# Inicie o JSON Server (porta 3001)
$ npx json-server --watch db.json --port 3001

# Inicie o servidor de desenvolvimento
$ npm run dev
```

> ⚠️ Certifique-se de que o arquivo `db.json` esteja na raiz do projeto com a estrutura básica:

```json
{
  "users": []
}
```

## 🧪 Testando a Aplicação

1. Acesse `http://localhost:5173`
2. Crie uma conta clicando em "Cadastre-se"
3. Faça login com os dados criados
4. Use o botão de microfone para gravar e envie o áudio
5. Veja a transcrição e o resumo simulados aparecerem no chat

## 💡 Extras Implementados

- Transições entre componentes com `<transition>`
- Scroll personalizado e responsividade
- Validação de usuários no login
- Toast com animações para feedback
- Tela de cadastro

## 📄 Licença

Este projeto é apenas para fins de teste/desafio técnico.

---
## 📸 Preview



Desenvolvido com 💙 por Manassés

