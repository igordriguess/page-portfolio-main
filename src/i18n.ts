export type Language = "pt" | "en";

const pt = {
  htmlLang: "pt-BR",
  documentTitle: "Igor Rodrigues · Cloud Solutions Architect",
  nav: {
    home: "Página inicial",
    expertise: "Especialidades",
    experience: "Experiência",
    certifications: "Certificações",
    languages: "Idiomas",
    contact: "Contato",
    mainLabel: "Navegação principal",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    backToTop: "Voltar ao início",
  },
  languageToggle: "Switch to English",
  downloadCv: "Baixar CV",
  talkToMe: "Fale comigo",
  hero: {
    available: "Motivado por novos desafios",
    titleStart: "Arquitetura que",
    titleHighlight: "escala.",
    description: "Transformo desafios complexos de infraestrutura em ambientes cloud seguros, resilientes e eficientes.",
    cta: "Conheça meu trabalho",
    numbers: "Em números",
    years: "anos de experiência",
    providers: "cloud providers",
    certifications: "certificações",
    location: "Ribeirão Preto, SP · Brasil",
  },
  marquee: ["Cloud Architecture", "Multicloud", "Infrastructure as Code", "DevOps", "Automação"],
  expertise: {
    eyebrow: "O que eu faço",
    title: "Da estratégia à operação.",
    description: "Visão ampla do ecossistema cloud para criar soluções que conectam tecnologia, segurança e resultado.",
    items: [
      {
        title: "Arquitetura Cloud",
        description: "Desenho e evolução de ambientes resilientes, seguros e preparados para escalar.",
      },
      {
        title: "DevOps & IaC",
        description: "Infraestrutura reproduzível e entregas consistentes com automação ponta a ponta.",
      },
      {
        title: "Automação",
        description: "Soluções que eliminam tarefas repetitivas e trazem eficiência para a operação.",
      },
      {
        title: "Operação & Segurança",
        description: "Observabilidade, governança e continuidade para ambientes críticos de negócio.",
      },
    ],
  },
  experience: {
    eyebrow: "Trajetória",
    title: "Experiência que evolui com a tecnologia.",
    description: "Mais de oito anos construindo uma base sólida em infraestrutura, operação e arquitetura cloud.",
    linkedin: "Perfil no LinkedIn",
    current: "Atual",
    jobs: [
      {
        role: "Cloud Solutions Architect",
        date: "Mar 2025 — Atual",
        summary: "Arquiteturas multicloud, migrações, resizing e soluções de automação para ambientes críticos.",
      },
      {
        role: "Cloud Infrastructure Analyst",
        date: "Ago 2024 — Mar 2025",
        summary: "Provisionamento e sustentação de ambientes OCI, monitoramento e resposta a incidentes críticos.",
      },
      {
        role: "Cloud Support Analyst",
        date: "Ago 2021 — Jul 2024",
        summary: "Manutenções preventivas, automações e otimizações para elevar a disponibilidade operacional.",
      },
      {
        role: "Analista de Suporte e Operações de TI",
        date: "Jan 2021 — Ago 2021",
        summary: "Administração de infraestrutura corporativa, dispositivos e rotinas de backup.",
      },
      {
        role: "Analista de Infraestrutura Junior",
        date: "Fev 2018 — Jan 2021",
        summary: "Performance de bancos de dados e sustentação de sistemas em ambiente corporativo.",
      },
    ],
  },
  certifications: {
    eyebrow: "Validação técnica",
    title: "Certificações & formação.",
    description: "Conhecimento continuamente atualizado para acompanhar ecossistemas em constante mudança.",
    education: "Formação acadêmica",
    degree: "Ciência da Computação",
  },
  languages: {
    eyebrow: "Comunicação",
    title: "Idiomas.",
    description: "Comunicação clara com times e clientes, do planejamento à operação.",
    scale: "Escala CEFR",
    items: [
      { name: "Português", level: "Nativo", note: "Língua materna" },
      { name: "Inglês", level: "Intermediário", note: "B1 · CEFR" },
    ],
  },
  contact: {
    eyebrow: "Vamos conversar",
    title: "Precisa de uma visão estratégica para seu próximo desafio cloud?",
    whatsapp: "Chamar no WhatsApp",
    whatsappMessage: "Olá, Igor! Vi seu portfólio e gostaria de conversar.",
    send: "Enviar uma mensagem",
    copy: "Copiar e-mail",
    copied: "E-mail copiado",
    copyFailed: "Não foi possível copiar",
  },
  footer: {
    tagline: "Arquiteto Cloud apaixonado por tecnologia e desenvolvimento.",
    navigation: "Navegação",
    contact: "Contato",
    email: "E-mail",
    rights: "| Todos os direitos reservados.",
  },
};

export type Dictionary = typeof pt;

const en: Dictionary = {
  htmlLang: "en",
  documentTitle: "Igor Rodrigues · Cloud Solutions Architect",
  nav: {
    home: "Home",
    expertise: "Expertise",
    experience: "Experience",
    certifications: "Certifications",
    languages: "Languages",
    contact: "Contact",
    mainLabel: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backToTop: "Back to top",
  },
  languageToggle: "Mudar para português",
  downloadCv: "Download CV",
  talkToMe: "Get in touch",
  hero: {
    available: "Motivated by new challenges",
    titleStart: "Architecture that",
    titleHighlight: "scales.",
    description: "I turn complex infrastructure challenges into secure, resilient and efficient cloud environments.",
    cta: "See my work",
    numbers: "By the numbers",
    years: "years of experience",
    providers: "cloud providers",
    certifications: "certifications",
    location: "Ribeirão Preto, SP · Brazil",
  },
  marquee: ["Cloud Architecture", "Multicloud", "Infrastructure as Code", "DevOps", "Automation"],
  expertise: {
    eyebrow: "What I do",
    title: "From strategy to operations.",
    description: "A broad view of the cloud ecosystem to build solutions that connect technology, security and results.",
    items: [
      {
        title: "Cloud Architecture",
        description: "Designing and evolving resilient, secure environments that are ready to scale.",
      },
      {
        title: "DevOps & IaC",
        description: "Reproducible infrastructure and consistent delivery with end-to-end automation.",
      },
      {
        title: "Automation",
        description: "Solutions that eliminate repetitive work and bring efficiency to operations.",
      },
      {
        title: "Operations & Security",
        description: "Observability, governance and continuity for business-critical environments.",
      },
    ],
  },
  experience: {
    eyebrow: "Career",
    title: "Experience that evolves with technology.",
    description: "More than eight years building a solid foundation in infrastructure, operations and cloud architecture.",
    linkedin: "LinkedIn profile",
    current: "Current",
    jobs: [
      {
        role: "Cloud Solutions Architect",
        date: "Mar 2025 — Present",
        summary: "Multicloud architectures, migrations, resizing and automation solutions for critical environments.",
      },
      {
        role: "Cloud Infrastructure Analyst",
        date: "Aug 2024 — Mar 2025",
        summary: "Provisioning and support of OCI environments, monitoring and critical incident response.",
      },
      {
        role: "Cloud Support Analyst",
        date: "Aug 2021 — Jul 2024",
        summary: "Preventive maintenance, automation and optimizations to increase operational availability.",
      },
      {
        role: "IT Support and Operations Analyst",
        date: "Jan 2021 — Aug 2021",
        summary: "Administration of corporate infrastructure, devices and backup routines.",
      },
      {
        role: "Junior Infrastructure Analyst",
        date: "Feb 2018 — Jan 2021",
        summary: "Database performance and system support in a corporate environment.",
      },
    ],
  },
  certifications: {
    eyebrow: "Technical validation",
    title: "Certifications & education.",
    description: "Continuously updated knowledge to keep pace with ever-changing ecosystems.",
    education: "Education",
    degree: "Computer Science",
  },
  languages: {
    eyebrow: "Communication",
    title: "Languages.",
    description: "Clear communication with teams and clients, from planning to operations.",
    scale: "CEFR scale",
    items: [
      { name: "Portuguese", level: "Native", note: "Mother tongue" },
      { name: "English", level: "Intermediate", note: "B1 · CEFR" },
    ],
  },
  contact: {
    eyebrow: "Let's talk",
    title: "Need a strategic vision for your next cloud challenge?",
    whatsapp: "Chat on WhatsApp",
    whatsappMessage: "Hi Igor! I saw your portfolio and would like to talk.",
    send: "Send a message",
    copy: "Copy e-mail",
    copied: "E-mail copied",
    copyFailed: "Could not copy",
  },
  footer: {
    tagline: "Cloud Architect passionate about technology and development.",
    navigation: "Navigation",
    contact: "Contact",
    email: "E-mail",
    rights: "| All rights reserved.",
  },
};

export const dictionaries: Record<Language, Dictionary> = { pt, en };
