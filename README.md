# 🔄 Converter — Conversor Reativo de Caracteres & ASCII

<div align="center">

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Acessar_no_GitHub_Pages-8B5CF6?style=for-the-badge)](https://tauisilva.github.io/Converter/)

![Angular](https://img.shields.io/badge/Angular_17-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PrimeNG](https://img.shields.io/badge/PrimeNG-red?style=for-the-badge&logo=prime&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)

Aplicação web reativa desenvolvida em **Angular 17** e **TypeScript** para conversão dinâmica e simultânea de caracteres e sequências de texto em múltiplos sistemas de numeração e representação de dados (ASCII padrão, ASCII Estendido, Hexadecimal, Binário, Octal, Decimal e Entidades HTML).

</div>

---

## 🌐 Acesso Online

A aplicação está hospedada e disponível publicamente no **GitHub Pages**:

👉 **[https://tauisilva.github.io/Converter/](https://tauisilva.github.io/Converter/)**

---

## ✨ Funcionalidades Principais

- ⚡ **Conversão Reativa em Tempo Real:** Converte simultaneamente cada caractere digitado para 6 formatos diferentes:
  - **Caractere (CHAR):** Incluindo mapeamento legível de caracteres de controle (ex: `NUL`, `LF`, `CR`, `ESC`, `DEL`).
  - **Hexadecimal (HEX):** Base 16 em formato uppercase.
  - **Binário (BIN):** Base 2 com padding de 8 bits (ex: `01000001` para `A`).
  - **Octal (OCT):** Base 8.
  - **Decimal (DEC):** Código numérico ordinal.
  - **Entidade HTML:** Formato `&#Código;` pronto para uso em desenvolvimento web.
- 🎛️ **Suporte a ASCII Estendido:** Toggle para alternar entre tabela ASCII tradicional (0–127) e ASCII Estendido (128–255), com sanitização automática de caracteres fora do escopo selecionado.
- 📊 **Tabela Interativa e Ordenável:** Exibição com ordenação em todas as colunas e filtro global por palavra-chave utilizando PrimeNG.
- 🕒 **Histórico de Consultas:** Armazena os últimos termos consultados com atalho para reconversão ou remoção instantânea.
- 🌓 **Tema Dark / Light:** Alternância completa de cores com paleta personalizada em tons pastel.
- 📖 **Central de Informações Integrada:** Modal com guia explicativo dos caracteres de controle e histórico das tabelas de codificação.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
| :--- | :--- |
| **Framework** | [Angular 17](https://angular.dev/) (Standalone Components, Signals & Control Flow `@if/@for`) |
| **Linguagem** | [TypeScript 5.3](https://www.typescriptlang.org/) |
| **Componentes de UI** | [PrimeNG 17](https://primeng.org/) & [PrimeFlex](https://primeflex.org/) |
| **Ícones** | [Bootstrap Icons](https://icons.getbootstrap.com/) |
| **CI / CD** | [GitHub Actions](https://github.com/features/actions) |
| **Hospedagem** | [GitHub Pages](https://pages.github.com/) |

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)

### 1. Clonar o repositório
```bash
git clone https://github.com/tauisilva/Converter.git
cd Converter
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Executar o servidor de desenvolvimento
```bash
npm start
```
Acesse a aplicação em `http://localhost:4200/`.

---

## 🏗️ Build e Deploy Automatizado

O repositório conta com uma esteira de **CI/CD no GitHub Actions** configurada em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

- A cada `push` na branch `main`, o workflow executa automaticamente:
  1. Instalação limpa via `npm ci`.
  2. Compilação de produção com base href relativo: `npm run build:gh-pages`.
  3. Configuração de arquivo `.nojekyll` e fallback `404.html` para roteamento SPA estático.
  4. Publicação direta no ambiente **GitHub Pages**.

### Para compilar manualmente para o GitHub Pages:
```bash
npm run build:gh-pages
```
Os arquivos prontos para publicação são gerados em `dist/converter/browser`.

---

## 📚 Referências

- [Lookup Tables — ASCII Reference](https://www.lookuptables.com/text)
- [IBM Documentation — ASCII, Decimal, Hexadecimal, Octal & Binary Conversion Table](https://www.ibm.com/docs/en/aix/7.1?topic=adapters-ascii-decimal-hexadecimal-octal-binary-conversion-table)

---

## 👨‍💻 Autor

Desenvolvido por **Taui Silva Lima**
- GitHub: [@tauisilva](https://github.com/tauisilva)
- LinkedIn: [linkedin.com/in/tauisilva](https://www.linkedin.com/in/tauisilva/)
