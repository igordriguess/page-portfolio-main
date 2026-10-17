# Igor Rodrigues · Portfólio

Portfólio pessoal de **Igor Rodrigues**, Cloud Solutions Architect com mais de 8 anos de experiência em infraestrutura, arquitetura multicloud (OCI, AWS, Azure, GCP e Huawei Cloud), IaC e automação.

O site reúne trajetória profissional, projetos de arquitetura e migração, competências técnicas, certificações e formas de contato, em português e inglês.

## Seções

| Seção | Conteúdo |
| --- | --- |
| **Início** | Apresentação, foto, resumo profissional e download do currículo |
| **Sobre** | Trajetória e forma de trabalho (objetivo → discovery → arquitetura → automação) |
| **Experiência** | Linha do tempo dos cargos e empresas |
| **Projetos** | Cases com detalhes de contexto, solução, ganhos e diagrama de arquitetura |
| **Competências** | Cloud, DevOps & IaC, automação, operação & segurança |
| **Formação** | Certificações, graduação e idiomas |
| **Contato** | WhatsApp, e-mail e LinkedIn |

## Destaques

- **Bilíngue (PT/EN):** idioma detectado pelo navegador, com alternância manual que fica salva.
- **Currículo para download** na versão do idioma selecionado.
- **Responsivo**, pensado para celular, tablet e desktop.
- **Acessível:** navegação por teclado, textos alternativos e respeito à preferência de movimento reduzido do sistema.
- **Leve:** imagens em WebP servidas no tamanho certo para cada tela.

## Tecnologias

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)

## Como rodar localmente

Requisitos: **Node.js 22** (as versões estão em `.mise.toml`).

```bash
# instalar dependências
npm install

# servidor de desenvolvimento em http://localhost:8443
npm run dev

# build de produção (gera a pasta dist/)
npm run build

# pré-visualizar o build
npm run preview
```

> O projeto também tem `pnpm-lock.yaml`. Se preferir pnpm, use `pnpm install` e `pnpm dev`.

## Estrutura

```
src/
├── App.tsx        # página e componentes
├── i18n.ts        # todos os textos em português e inglês
├── index.css      # estilos globais e tema do Tailwind
├── main.tsx       # ponto de entrada do React
├── assets/        # fotos otimizadas
└── imports/       # currículos em PDF (PT e EN)
```

## Editando o conteúdo

- **Textos:** ficam em `src/i18n.ts`, nas versões `pt` e `en`. O TypeScript avisa se uma das versões ficar sem algum texto.
- **Certificações, empresas e tecnologias:** listas no início de `src/App.tsx`.
- **Currículo:** substitua os PDFs em `src/imports/`, mantendo os mesmos nomes.

## Contato

- LinkedIn: [linkedin.com/in/igordriguess](https://www.linkedin.com/in/igordriguess)
- GitHub: [github.com/igordriguess](https://github.com/igordriguess)
- E-mail: [igorvprodrigues@gmail.com](mailto:igorvprodrigues@gmail.com)
