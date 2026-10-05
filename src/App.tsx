import { Fragment, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { flushSync } from "react-dom";
import resumePtUrl from "./imports/Igor Rodrigues.pdf?url";
import resumeEnUrl from "./imports/Igor Rodrigues - EN.pdf?url";
import { dictionaries, type Dictionary, type Language, type Project } from "./i18n";

const EMAIL = "igorvprodrigues@gmail.com";
const WHATSAPP_NUMBER = "5516991584347";
const LINKEDIN_URL = "https://www.linkedin.com/in/igordriguess";
const GITHUB_URL = "https://github.com/igordriguess";
const BACK_TO_TOP_THRESHOLD = 600;
const LANGUAGE_STORAGE_KEY = "portfolio-language";

const resumes: Record<Language, { url: string; fileName: string }> = {
  pt: { url: resumePtUrl, fileName: "Igor Rodrigues.pdf" },
  en: { url: resumeEnUrl, fileName: "Igor Rodrigues - EN.pdf" },
};

type IconName =
  | "activity"
  | "arrow"
  | "arrowUp"
  | "branch"
  | "check"
  | "cloud"
  | "code"
  | "copy"
  | "database"
  | "download"
  | "external"
  | "github"
  | "layers"
  | "linkedin"
  | "lock"
  | "mail"
  | "map"
  | "menu"
  | "search"
  | "shield"
  | "sparkles"
  | "target"
  | "terminal"
  | "whatsapp"
  | "x";

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    activity: <path d="M3 12h4l3-8 4 16 3-8h4" />,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    arrowUp: <><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></>,
    branch: <><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="8" r="2.5" /><path d="M6 8.5v7" /><path d="M18 10.5c0 4-6 3-10.5 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    cloud: <path d="M17.5 19H7a5 5 0 1 1 1.6-9.74A6 6 0 0 1 20 12a3.5 3.5 0 0 1-2.5 7Z" />,
    code: <><path d="m8 9-4 3 4 3" /><path d="m16 9 4 3-4 3" /><path d="m14 5-4 14" /></>,
    copy: <><rect x="8" y="8" width="11" height="11" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>,
    database: <><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v7c0 1.66 3.13 3 7 3s7-1.34 7-3V5" /><path d="M5 12v7c0 1.66 3.13 3 7 3s7-1.34 7-3v-7" /></>,
    download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
    external: <><path d="M15 4h5v5" /><path d="m10 14 10-10" /><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" /></>,
    github: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7" /><path d="M8 7v.01" /><path d="M12 17v-7" /><path d="M12 13a3 3 0 0 1 6 0v4" /></>,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></>,
    lock: <><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    map: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
    sparkles: <><path d="M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8Z" /><path d="M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
    terminal: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3" /><path d="M13 15h4" /></>,
    whatsapp: <><path d="M3.5 20.5 4.9 16.4A8.5 8.5 0 1 1 7.8 19.3Z" /><path d="M9 8.8c0 3.4 2.8 6.2 6.2 6.2l.9-1.6-2-1-.9.9a4.5 4.5 0 0 1-2.4-2.4l.9-.9-1-2Z" /></>,
    x: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const heroFocusIcons: IconName[] = ["cloud", "code", "branch", "activity", "sparkles"];

// Order matches t.approach.steps / outputs
const approachStepIcons: IconName[] = ["target", "search", "layers", "branch"];
const approachOutputIcons: IconName[] = ["cloud", "lock", "activity", "sparkles"];
const legacyChain: IconName[] = ["mail", "terminal", "database"];
const modernChain: IconName[] = ["target", "search", "code", "cloud", "activity", "check"];

const expertise = [
  { icon: "cloud" as const, number: "01", tags: ["OCI", "AWS", "Azure", "GCP", "Huawei Cloud"] },
  { icon: "layers" as const, number: "02", tags: ["Terraform", "Ansible", "Jenkins", "Kubernetes", "Podman"] },
  { icon: "code" as const, number: "03", tags: ["Python", "TypeScript", "Bash", "PowerShell", "Java"] },
  { icon: "shield" as const, number: "04", tags: ["Grafana", "Datadog", "Zabbix", "FortiGate", "Sophos"] },
];

// One column on phones, 2×2 on tablets, a single row on wide screens
const expertiseBorders = ["", "border-t md:border-t-0 md:border-l", "border-t xl:border-t-0 xl:border-l", "border-t md:border-l xl:border-t-0"];

const companies = [
  "CCM Soluções em Tecnologia | Ribeirão Preto - SP, Brasil",
  "Statum Tecnologia | Ribeirão Preto - SP, Brasil",
  "Senior Sistemas | Blumenau - SC, Brasil",
  "Pedra Agroindustrial | Serrana - SP, Brasil",
  "SMARAPD Informática | Ribeirão Preto - SP, Brasil",
];

const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

// Order matches t.languages.items; level is how many CEFR steps are filled
const spokenLanguages = [
  { code: "PT", level: 6, cefr: false },
  { code: "EN", level: 3, cefr: true },
];

const certifications = [
  ["OCI Architect Professional", "Oracle Cloud", "2026"],
  ["OCI Migration Architect Professional", "Oracle Cloud", "2026"],
  ["Sophos Endpoint Engineer", "Sophos", "2026"],
  ["Sophos Firewall Engineer", "Sophos", "2026"],
  ["OCI Architect Associate", "Oracle Cloud", "2025"],
  ["Microsoft Azure Fundamentals", "Microsoft", "2024"],
  ["ITIL 4 Foundation", "PeopleCert", "2022"],
];

function getInitialLanguage(): Language {
  try {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === "pt" || saved === "en") return saved;
  } catch {
    // localStorage can be unavailable (private mode, blocked storage)
  }
  return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
}

// Feeds the cursor position to the .spotlight glow
function trackPointer(event: ReactPointerEvent<HTMLElement>) {
  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();
  element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  element.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [openProject, setOpenProject] = useState<number | null>(null);
  const t = dictionaries[language];
  const resume = resumes[language];

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    document.title = t.documentTitle;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // ignore storage errors
    }
  }, [language, t]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setShowBackToTop(window.scrollY > BACK_TO_TOP_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link of the section crossing the middle of the viewport
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Fade elements in as they enter the viewport; re-run on language change to catch re-mounted nodes
  useEffect(() => {
    const pending = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    pending.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [language]);

  // Close the mobile menu on Escape or when the viewport grows to desktop
  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia("(min-width: 1280px)");
    const close = () => setMenuOpen(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) close();
    };
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const changeLanguage = (next: Language) => {
    if (next === language) return;
    const apply = () => flushSync(() => setLanguage(next));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (typeof document.startViewTransition !== "function" || reduceMotion) {
      apply();
      return;
    }
    document.startViewTransition(apply);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    window.setTimeout(() => setCopyState("idle"), 1800);
  };

  const navLinks = [
    [t.nav.approach, "#abordagem"],
    [t.nav.projects, "#projetos"],
    [t.nav.expertise, "#especialidades"],
    [t.nav.experience, "#experiencia"],
    [t.nav.certifications, "#certificacoes"],
    [t.nav.languages, "#idiomas"],
  ];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.contact.whatsappMessage)}`;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-space-950 text-ink">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="nebula absolute inset-0" />
        <Starfield />
      </div>

      <header className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color] duration-300 ${scrolled || menuOpen ? "hairline bg-space-950/75" : "border-transparent bg-transparent"}`}>
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
          <a href="#inicio" onClick={() => setMenuOpen(false)} className="flex shrink-0 items-center gap-3" aria-label={t.nav.home}>
            <span className="logo-mark grid h-9 w-9 place-items-center rounded-xl font-display text-[13px] font-extrabold text-white">IR</span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-[15px] font-semibold tracking-tight text-white">Igor Rodrigues</span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Solutions Architect</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 xl:flex" aria-label={t.nav.mainLabel}>
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                aria-current={activeSection === href ? "location" : undefined}
                className={`rounded-full px-3.5 py-2 text-[13px] transition ${activeSection === href ? "bg-accent/12 text-white shadow-[inset_0_0_0_1px_rgba(168,85,247,0.35)]" : "text-white/55 hover:text-white"}`}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle language={language} onChange={changeLanguage} label={t.languageToggle} />
            <a href={resume.url} download={resume.fileName} className="btn-ghost hidden items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-medium md:flex">
              <Icon name="download" className="h-4 w-4" /> {t.downloadCv}
            </a>
            <a href="#contato" className="btn-primary hidden rounded-xl px-5 py-2.5 text-[13px] font-semibold md:block">
              {t.talkToMe}
            </a>
            <button type="button" className="btn-ghost grid h-10 w-10 place-items-center rounded-full xl:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu} aria-expanded={menuOpen} aria-controls="mobile-menu">
              <Icon name={menuOpen ? "x" : "menu"} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-menu" className="hairline max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t bg-space-950/95 px-5 pb-6 pt-2 md:px-8 xl:hidden" aria-label={t.nav.mainLabel}>
            {[...navLinks, [t.nav.contact, "#contato"]].map(([label, href], index) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} aria-current={activeSection === href ? "location" : undefined} className={`hairline flex items-center gap-4 border-b py-4 text-base transition ${activeSection === href ? "text-accent-soft" : "text-white/75 hover:text-white"}`}>
                <span className="font-mono text-[11px] text-accent/70">{String(index + 1).padStart(2, "0")}</span>
                <span className="flex-1">{label}</span>
                <Icon name="arrow" className="h-4 w-4 opacity-40" />
              </a>
            ))}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:hidden">
              <a href={resume.url} download={resume.fileName} onClick={() => setMenuOpen(false)} className="btn-ghost flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium">
                <Icon name="download" className="h-4 w-4" /> {t.downloadCv}
              </a>
              <a href="#contato" onClick={() => setMenuOpen(false)} className="btn-primary flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold">
                {t.talkToMe}
              </a>
            </div>
          </nav>
        )}
      </header>
      {menuOpen && <div className="fixed inset-0 z-40 bg-space-950/60 xl:hidden" onClick={() => setMenuOpen(false)} aria-hidden="true" />}

      <main className="relative">
        {/* ---------- Hero ---------- */}
        <section id="inicio" className="relative overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">
          <div className="tech-grid absolute inset-0" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
            <div>
              <div className="reveal inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/3 py-1.5 pl-3 pr-4 text-[13px] text-white/70 backdrop-blur">
                <span className="status-dot h-1.5 w-1.5 rounded-full" />
                {t.hero.available}
              </div>
              <p className="reveal mt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-accent" style={delay(60)}>
                [ Igor Rodrigues · Cloud Solutions Architect ]
              </p>
              <h1 className="reveal mt-5 font-display text-[clamp(2.75rem,10vw,6.25rem)] font-black leading-[0.92] tracking-[-0.055em] text-white lg:text-[clamp(3.5rem,6.3vw,6.25rem)]" style={delay(120)}>
                {t.hero.titleStart}
                <br />
                <span className="text-gradient animate-gradient">{t.hero.titleHighlight}</span>
              </h1>
              <p className="reveal mt-8 max-w-xl text-lg leading-relaxed text-white/60" style={delay(200)}>
                {t.hero.description}
              </p>

              <div className="reveal mt-8 flex flex-col gap-5 sm:flex-row sm:items-center" style={delay(260)}>
                <p className="max-w-[16rem] text-sm leading-snug text-white/75">{t.hero.focus}</p>
                <ul className="flex gap-2">
                  {heroFocusIcons.map((icon, index) => (
                    <li key={icon} title={t.hero.focusItems[index]} className="icon-ring grid h-10 w-10 place-items-center rounded-full text-accent-soft">
                      <Icon name={icon} className="h-4 w-4" />
                      <span className="sr-only">{t.hero.focusItems[index]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row" style={delay(320)}>
                <a href="#projetos" className="btn-primary group inline-flex items-center justify-center gap-3 rounded-xl px-6 py-3.5 text-sm font-semibold">
                  {t.hero.cta}
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a href={resume.url} download={resume.fileName} className="btn-ghost inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium">
                  <Icon name="download" className="h-4 w-4" /> {t.downloadCv}
                </a>
              </div>
            </div>

            <div className="reveal" style={delay(200)}>
              <HeroGlobe copy={t.hero.globe} stats={[2, 5, certifications.length]} />
            </div>
          </div>

          <dl className="reveal glass relative mx-auto mt-16 grid max-w-7xl overflow-hidden rounded-2xl backdrop-blur-md sm:grid-cols-2 lg:mt-20 lg:grid-cols-4" style={delay(440)} aria-label={t.hero.numbers}>
            <Metric index="01" value="8+" label={t.hero.years} className="" />
            <Metric index="02" value="5" label={t.hero.providers} className="border-t sm:border-l sm:border-t-0" />
            <Metric index="03" value={String(certifications.length)} label={t.hero.certifications} className="border-t lg:border-l lg:border-t-0" />
            <div className="hairline flex items-center gap-3 border-t p-5 sm:border-l sm:p-6 lg:border-t-0">
              <span className="icon-ring grid h-10 w-10 shrink-0 place-items-center rounded-full text-accent-soft">
                <Icon name="map" className="h-4 w-4" />
              </span>
              <span className="text-sm leading-snug text-white/60">{t.hero.location}</span>
            </div>
          </dl>
        </section>

        {/* ---------- 01 · How it connects ---------- */}
        <section id="abordagem" className="relative scroll-mt-18 px-5 py-20 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading number="01" eyebrow={t.approach.eyebrow} title={t.approach.title} description={t.approach.description} />
            <ApproachFlow copy={t.approach} />
          </div>
        </section>

        {/* ---------- 02 · Projects ---------- */}
        <section id="projetos" className="relative scroll-mt-18 px-5 py-20 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading number="02" eyebrow={t.projects.eyebrow} title={t.projects.title} description={t.projects.description} />
            <div className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-2">
              {t.projects.items.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index}
                  featured={index === 0}
                  featuredLabel={t.projects.featured}
                  viewDetails={t.projects.viewDetails}
                  diagram={t.projects.diagram}
                  onOpen={() => setOpenProject(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 03 · Expertise ---------- */}
        <section id="especialidades" className="relative scroll-mt-18 px-5 py-20 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading number="03" eyebrow={t.expertise.eyebrow} title={t.expertise.title} description={t.expertise.description} />
            <p className="reveal gradient-border mt-10 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl px-5 py-3 text-sm font-medium text-white shadow-[0_0_40px_-12px_rgba(168,85,247,0.6)]">
              <span className="font-display font-semibold text-accent-soft">{t.expertise.formula.label}</span>
              <span className="text-white/40">=</span>
              {t.expertise.formula.parts.map((part, index) => (
                <Fragment key={part}>
                  {index > 0 && <span className="text-white/40">+</span>}
                  <span>{part}</span>
                </Fragment>
              ))}
            </p>
            <div className="hairline mt-10 grid border-y md:grid-cols-2 xl:grid-cols-4">
              {expertise.map((item, index) => (
                <article
                  key={item.number}
                  onPointerMove={trackPointer}
                  style={delay(index * 90)}
                  className={`reveal spotlight hairline group flex flex-col px-1 py-8 sm:px-6 md:py-10 ${expertiseBorders[index]}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-accent">{item.number}</span>
                    <span className="icon-ring grid h-11 w-11 place-items-center rounded-full text-accent-soft transition group-hover:text-white group-hover:shadow-[0_0_24px_-4px_rgba(168,85,247,0.8)]">
                      <Icon name={item.icon} />
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-bold tracking-[-0.03em] text-white">{t.expertise.items[index].title}</h3>
                  <p className="mt-3 leading-relaxed text-white/55">{t.expertise.items[index].description}</p>
                  <p className="mt-auto pt-8 font-mono text-[11px] leading-relaxed text-white/45">{item.tags.join("  •  ")}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 04 · Experience ---------- */}
        <section id="experiencia" className="relative scroll-mt-18 px-5 py-20 md:px-8 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading stacked number="04" eyebrow={t.experience.eyebrow} title={t.experience.title} description={t.experience.description} />
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="btn-ghost reveal mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium">
                <Icon name="linkedin" className="h-4 w-4" /> {t.experience.linkedin} <Icon name="external" className="h-3.5 w-3.5 opacity-60" />
              </a>
            </div>
            <ol className="relative">
              <span aria-hidden="true" className="timeline-rail absolute bottom-4 left-1.75 top-4 w-px" />
              {t.experience.jobs.map((job, index) => {
                const current = index === 0;
                return (
                  <li key={companies[index]} className="reveal relative pb-5 pl-10 last:pb-0" style={delay(index * 70)}>
                    <span aria-hidden="true" className={`absolute left-0 top-8 h-3.75 w-3.75 rounded-full border ${current ? "timeline-dot-current border-accent-soft" : "border-accent/40 bg-space-900"}`} />
                    <article onPointerMove={trackPointer} className={`spotlight rounded-2xl p-5 sm:p-6 ${current ? "gradient-border" : "glass"}`}>
                      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-display text-lg font-semibold tracking-tight text-white">{job.role}</h3>
                          {current && <span className="rounded-full border border-accent/40 bg-accent/12 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-soft">{t.experience.current}</span>}
                        </div>
                        <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">{job.date}</p>
                      </div>
                      <p className="mt-1.5 text-sm text-accent-soft/80">{companies[index]}</p>
                      <p className="mt-3 text-sm leading-relaxed text-white/55">{job.summary}</p>
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ---------- 05 · Certifications ---------- */}
        <section id="certificacoes" className="relative scroll-mt-18 px-5 py-20 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading number="05" eyebrow={t.certifications.eyebrow} title={t.certifications.title} description={t.certifications.description} />
            <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
              {certifications.map(([name, issuer, year], index) => (
                <article
                  key={name}
                  onPointerMove={trackPointer}
                  style={delay((index % 3) * 80)}
                  className={`reveal spotlight group flex min-h-44 flex-col justify-between gap-6 rounded-2xl p-6 ${index === 0 ? "gradient-border" : "glass"}`}
                >
                  <div className="flex items-start justify-between">
                    <span className="icon-ring grid h-10 w-10 place-items-center rounded-full text-accent-soft transition group-hover:shadow-[0_0_24px_-4px_rgba(168,85,247,0.8)]">
                      <Icon name="shield" className="h-4 w-4" />
                    </span>
                    <span className="font-mono text-xs text-white/35">{year}</span>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/80">{issuer}</p>
                    <h3 className="mt-2 font-display font-semibold leading-snug text-white">{name}</h3>
                  </div>
                </article>
              ))}
              <article onPointerMove={trackPointer} className="reveal spotlight gradient-border flex min-h-44 flex-col justify-between gap-6 overflow-hidden rounded-2xl p-6 md:col-span-2 lg:col-span-2">
                <div aria-hidden="true" className="orb absolute -right-10 -top-10 h-40 w-40 opacity-60" />
                <span className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft">{t.certifications.education}</span>
                <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">{t.certifications.degree}</h3>
                    <p className="mt-1 text-sm text-white/55">Centro Universitário Moura Lacerda</p>
                  </div>
                  <p className="font-mono text-xs uppercase text-white/45">2017 — 2020</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ---------- 06 · Languages ---------- */}
        <section id="idiomas" className="relative scroll-mt-18 px-5 py-20 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading number="06" eyebrow={t.languages.eyebrow} title={t.languages.title} description={t.languages.description} />
            <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
              {spokenLanguages.map((spoken, index) => {
                const item = t.languages.items[index];
                return (
                  <article key={spoken.code} onPointerMove={trackPointer} style={delay(index * 90)} className="reveal spotlight glass rounded-2xl p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-3">
                      <span className="icon-ring grid h-12 w-12 place-items-center rounded-full font-mono text-sm text-accent-soft">{spoken.code}</span>
                      <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/55">{item.note}</span>
                    </div>
                    <h3 className="mt-8 font-display text-2xl font-bold tracking-[-0.03em] text-white">{item.name}</h3>
                    <p className="mt-1 text-sm text-accent-soft/80">{item.level}</p>
                    <div className="mt-8" role="img" aria-label={`${item.name}: ${item.level}${spoken.cefr ? ` (${CEFR_LEVELS[spoken.level - 1]})` : ""}`}>
                      <div className="grid grid-cols-6 gap-1.5">
                        {CEFR_LEVELS.map((level, step) => (
                          <span key={level} className={`h-1 rounded-full ${step < spoken.level ? "bg-linear-to-r from-violet to-accent shadow-[0_0_10px_rgba(168,85,247,0.7)]" : "bg-white/8"}`} />
                        ))}
                      </div>
                      <div className="mt-3 grid grid-cols-6 gap-1.5 font-mono text-[10px] uppercase tracking-wider">
                        {spoken.cefr ? (
                          CEFR_LEVELS.map((level, step) => (
                            <span key={level} className={step === spoken.level - 1 ? "text-accent-soft" : "text-white/30"}>{level}</span>
                          ))
                        ) : (
                          <span className="col-span-6 text-white/30">{item.note}</span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-white/35">{t.languages.scale}: A1 → C2</p>
          </div>
        </section>

        {/* ---------- 07 · Contact ---------- */}
        <section id="contato" className="relative scroll-mt-18 overflow-hidden px-5 pb-40 pt-20 md:px-8 md:pb-56 md:pt-32">
          <div aria-hidden="true" className="horizon absolute -bottom-288 left-1/2 h-320 w-[220%] -translate-x-1/2 sm:w-[160%] lg:w-[130%]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="reveal flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-accent-soft/70">
              <span className="text-violet-soft">07</span>
              <span className="eyebrow-line h-px w-14" />
              <span className="text-accent">[ {t.contact.eyebrow} ]</span>
            </div>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-14">
              <h2 className="reveal font-display text-[clamp(2.6rem,8vw,6rem)] font-black leading-[0.95] tracking-[-0.055em] text-white" style={delay(80)}>
                {t.contact.titleStart} <span className="text-gradient">{t.contact.titleHighlight}</span>
              </h2>
              <p className="reveal hairline border-l pl-6 leading-relaxed text-white/60" style={delay(160)}>{t.contact.description}</p>
            </div>
            <div className="reveal mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={delay(220)}>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold">
                <Icon name="whatsapp" className="h-4 w-4" /> {t.contact.whatsapp}
              </a>
              <a href={`mailto:${EMAIL}`} className="btn-ghost inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium">
                <Icon name="mail" className="h-4 w-4" /> {t.contact.send}
              </a>
              <button onClick={copyEmail} className="btn-ghost inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium" aria-live="polite">
                <Icon name={copyState === "copied" ? "check" : "copy"} className="h-4 w-4" />
                {copyState === "copied" ? t.contact.copied : copyState === "failed" ? t.contact.copyFailed : t.contact.copy}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/8 bg-space-950 px-5 pb-8 pt-16 md:px-8 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="hairline grid gap-12 border-b pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div className="sm:col-span-2 lg:col-span-1">
              <a href="#inicio" className="inline-flex items-center gap-3" aria-label={t.nav.home}>
                <span className="logo-mark grid h-10 w-10 place-items-center rounded-xl font-display text-sm font-extrabold text-white">IR</span>
                <span className="font-display text-lg font-semibold tracking-tight text-white">Igor Rodrigues</span>
              </a>
              <p className="mt-5 max-w-sm leading-relaxed text-white/50">{t.footer.tagline}</p>
              <p className="mt-5 flex items-center gap-2 text-sm text-white/45">
                <Icon name="map" className="h-4 w-4 text-accent" /> {t.hero.location}
              </p>
            </div>

            <nav aria-label={t.footer.navigation}>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft/70">{t.footer.navigation}</p>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-1">
                {[...navLinks, [t.nav.contact, "#contato"]].map(([label, href]) => (
                  <li key={href}>
                    <a href={href} className="text-white/55 transition hover:text-white">{label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft/70">{t.footer.contact}</p>
              <ul className="mt-5 grid gap-3 text-sm">
                <FooterLink href={whatsappUrl} icon="whatsapp" external>WhatsApp</FooterLink>
                <FooterLink href={`mailto:${EMAIL}`} icon="mail">{EMAIL}</FooterLink>
                <FooterLink href={LINKEDIN_URL} icon="linkedin" external>LinkedIn</FooterLink>
                <FooterLink href={GITHUB_URL} icon="github" external>GitHub</FooterLink>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-8 font-mono text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Igor Rodrigues {t.footer.rights}</p>
            <p className="flex items-center gap-3">
              <span className="h-px w-8 bg-white/20" />
              {t.footer.built}
            </p>
          </div>
        </div>
      </footer>

      {openProject !== null && (
        <ProjectModal
          project={t.projects.items[openProject]}
          index={openProject}
          copy={t.projects}
          talkToMe={t.talkToMe}
          showDiagram={openProject === 0}
          onClose={() => setOpenProject(null)}
        />
      )}

      <button
        type="button"
        onClick={scrollToTop}
        aria-label={t.nav.backToTop}
        title={t.nav.backToTop}
        tabIndex={showBackToTop ? 0 : -1}
        aria-hidden={!showBackToTop}
        className={`back-to-top btn-ghost fixed right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-space-900/80 text-accent-soft backdrop-blur-md transition duration-300 hover:-translate-y-0.5 sm:right-6 ${showBackToTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <Icon name="arrowUp" className="h-5 w-5" />
      </button>
    </div>
  );
}

// Twinkling starfield with a light scroll parallax; drawn once and left still for reduced motion
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    type Star = { x: number; y: number; size: number; alpha: number; speed: number; phase: number; depth: number };
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastDraw = 0;

    const seed = () => {
      const count = Math.round((width * height) / 4200);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() < 0.06 ? Math.random() * 0.8 + 1.1 : Math.random() * 0.8 + 0.25,
        alpha: Math.random() * 0.55 + 0.2,
        speed: Math.random() * 0.0018 + 0.0004,
        phase: Math.random() * Math.PI * 2,
        depth: Math.random(),
      }));
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const scroll = window.scrollY;
      for (const star of stars) {
        const y = (((star.y - scroll * star.depth * 0.12) % height) + height) % height;
        const twinkle = reduceMotion ? 1 : 0.55 + 0.45 * Math.sin(time * star.speed + star.phase);
        const alpha = star.alpha * twinkle;
        if (star.size > 1.1) {
          const glow = context.createRadialGradient(star.x, y, 0, star.x, y, star.size * 4);
          glow.addColorStop(0, `rgba(220, 205, 255, ${alpha})`);
          glow.addColorStop(1, "rgba(220, 205, 255, 0)");
          context.fillStyle = glow;
          context.fillRect(star.x - star.size * 4, y - star.size * 4, star.size * 8, star.size * 8);
        }
        context.fillStyle = `rgba(235, 232, 250, ${alpha})`;
        context.fillRect(star.x, y, star.size, star.size);
      }
    };

    const resize = () => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      // Mobile browsers resize the viewport as the address bar hides; only re-seed on real changes
      const reseed = nextWidth !== width || Math.abs(nextHeight - height) > 160;
      width = nextWidth;
      height = nextHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (reseed || stars.length === 0) seed();
      draw(performance.now());
    };

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      if (time - lastDraw < 33) return; // ~30fps is plenty for a slow twinkle
      lastDraw = time;
      draw(time);
    };

    const onScroll = () => {
      if (reduceMotion) draw(0);
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reduceMotion) frame = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduceMotion) frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

type GlobeCopy = Dictionary["hero"]["globe"];
type Vec3 = [number, number, number];

const toVec = (lat: number, lon: number): Vec3 => {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
};

const CYAN = "34, 211, 238";
const VIOLET = "192, 132, 252";
const WHITE = "235, 230, 255";

// Region markers (lat, lon): primary and DR in South America, the rest stand in for other clouds
const GLOBE_NODES: { pos: Vec3; color: string }[] = [
  { pos: toVec(-23.5, -46.6), color: CYAN }, // São Paulo · primary
  { pos: toVec(-33.4, -70.6), color: VIOLET }, // Santiago · DR
  { pos: toVec(39.0, -77.5), color: WHITE }, // Ashburn
  { pos: toVec(50.1, 8.7), color: WHITE }, // Frankfurt
  { pos: toVec(33.4, -112.1), color: WHITE }, // Phoenix
  { pos: toVec(19.1, 72.9), color: WHITE }, // Mumbai
  { pos: toVec(35.7, 139.7), color: WHITE }, // Tokyo
  { pos: toVec(-33.9, 151.2), color: WHITE }, // Sydney
];

const GLOBE_LINKS: [number, number, string][] = [
  [0, 1, CYAN],
  [0, 2, VIOLET],
  [2, 3, CYAN],
  [2, 4, VIOLET],
  [3, 5, VIOLET],
  [5, 6, CYAN],
  [0, 3, CYAN],
];

// Satellites on their own tilted orbits: radius (× globe radius), tilt (rad), speed, color
const GLOBE_ORBITS = [
  { radius: 1.2, tiltX: 1.15, tiltZ: 0.35, speed: 0.00042, phase: 0.4, color: CYAN },
  { radius: 1.34, tiltX: 1.45, tiltZ: -0.6, speed: -0.0003, phase: 2.4, color: VIOLET },
  { radius: 1.5, tiltX: 0.95, tiltZ: 1.1, speed: 0.00022, phase: 4.2, color: CYAN },
];

// Fibonacci sphere filtered by a smooth pseudo-noise so the dots cluster into "continents"
function buildSurface(count: number): Vec3[] {
  const points: Vec3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    const lat = Math.asin(y);
    const lon = Math.atan2(x, z);
    const noise = Math.sin(lon * 2 + 1.3) * Math.cos(lat * 3 - 0.4) + 0.6 * Math.sin(lon * 5 + lat * 2) + 0.35 * Math.cos(lon * 9 - lat * 7);
    if (noise > 0.15) points.push([x, y, z]);
  }
  return points;
}

function HeroGlobe({ copy, stats }: { copy: GlobeCopy; stats: number[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!wrapper || !canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    let size = 0;
    let surface: Vec3[] = [];
    let frame = 0;
    let running = false;
    let visible = true;
    const start = performance.now();
    // Pointer parallax: the globe leans toward the cursor and eases back
    const lean = { yaw: 0, pitch: 0, targetYaw: 0, targetPitch: 0 };

    const graticule: Vec3[][] = [];
    for (let lon = -180; lon < 180; lon += 30) {
      graticule.push(Array.from({ length: 49 }, (_, i) => toVec(-90 + i * 3.75, lon)));
    }
    for (const lat of [-60, -30, 0, 30, 60]) {
      graticule.push(Array.from({ length: 73 }, (_, i) => toVec(lat, -180 + i * 5)));
    }

    const resize = () => {
      size = wrapper.clientWidth;
      canvas.width = size * ratio;
      canvas.height = size * ratio;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      surface = buildSurface(size < 420 ? 1400 : 2400);
      if (!running) draw(0);
    };

    const draw = (elapsed: number) => {
      const cx = size / 2;
      const cy = size / 2;
      const R = size * 0.34;
      const spin = 0.87 + elapsed * 0.00007 + lean.yaw;
      const tilt = -0.28 + lean.pitch;
      const cosS = Math.cos(spin);
      const sinS = Math.sin(spin);
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      // Globe-space → screen; z > 0 faces the viewer
      const project = ([x, y, z]: Vec3, rotate = true): Vec3 => {
        const x1 = rotate ? x * cosS + z * sinS : x;
        const z1 = rotate ? -x * sinS + z * cosS : z;
        const y2 = y * cosT - z1 * sinT;
        const z2 = y * sinT + z1 * cosT;
        return [cx + x1 * R, cy - y2 * R, z2];
      };
      // Hidden only when behind the sphere and inside its silhouette
      const occluded = ([sx, sy, z]: Vec3) => z < 0 && (sx - cx) ** 2 + (sy - cy) ** 2 < R * R;

      context.clearRect(0, 0, size, size);

      // Sphere body with a violet core
      const body = context.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.05, cx, cy, R);
      body.addColorStop(0, "rgba(76, 36, 140, 0.75)");
      body.addColorStop(0.55, "rgba(28, 16, 58, 0.9)");
      body.addColorStop(1, "rgba(8, 7, 16, 0.96)");
      context.fillStyle = body;
      context.beginPath();
      context.arc(cx, cy, R, 0, Math.PI * 2);
      context.fill();

      const core = context.createRadialGradient(cx + R * 0.05, cy, 0, cx + R * 0.05, cy, R * 0.6);
      core.addColorStop(0, `rgba(${VIOLET}, ${0.32 + 0.06 * Math.sin(elapsed * 0.0012)})`);
      core.addColorStop(1, `rgba(${VIOLET}, 0)`);
      context.fillStyle = core;
      context.fillRect(cx - R, cy - R, R * 2, R * 2);

      // Graticule
      context.lineWidth = 0.6;
      for (const line of graticule) {
        context.beginPath();
        let open = false;
        for (const point of line) {
          const [sx, sy, z] = project(point);
          if (z > 0) {
            if (open) context.lineTo(sx, sy);
            else context.moveTo(sx, sy);
            open = true;
          } else open = false;
        }
        context.strokeStyle = "rgba(200, 190, 255, 0.07)";
        context.stroke();
      }

      // Surface dots: brighter toward the viewer, cyan near the lit limb
      for (const point of surface) {
        const [sx, sy, z] = project(point);
        if (z <= 0) continue;
        const alpha = 0.12 + z * 0.7;
        const limb = (sx - cx) / R < -0.45 ? CYAN : WHITE;
        context.fillStyle = `rgba(${limb}, ${alpha * 0.8})`;
        const dot = 0.6 + z * 0.9;
        context.fillRect(sx - dot / 2, sy - dot / 2, dot, dot);
      }

      // Glowing rim with a light that sweeps around it
      context.save();
      context.shadowColor = `rgba(${CYAN}, 0.9)`;
      context.shadowBlur = 26;
      context.lineWidth = 3;
      if (typeof context.createConicGradient === "function") {
        const sweep = context.createConicGradient(elapsed * 0.00035 + 2.2, cx, cy);
        sweep.addColorStop(0, `rgba(${CYAN}, 1)`);
        sweep.addColorStop(0.3, `rgba(${CYAN}, 0.55)`);
        sweep.addColorStop(0.55, `rgba(${VIOLET}, 0.35)`);
        sweep.addColorStop(0.8, `rgba(${CYAN}, 0.4)`);
        sweep.addColorStop(1, `rgba(${CYAN}, 1)`);
        context.strokeStyle = sweep;
      } else {
        context.strokeStyle = `rgba(${CYAN}, 0.75)`;
      }
      context.beginPath();
      context.arc(cx, cy, R, 0, Math.PI * 2);
      context.stroke();
      context.restore();

      // Outer instrument ring with ticks, counter-rotating
      const ticks = 90;
      const ringOffset = -elapsed * 0.00005;
      for (let i = 0; i < ticks; i++) {
        const angle = (i / ticks) * Math.PI * 2 + ringOffset;
        const major = i % 15 === 0;
        const inner = R * 1.1;
        const outer = inner + (major ? 9 : 4);
        context.strokeStyle = `rgba(255, 255, 255, ${major ? 0.3 : 0.1})`;
        context.lineWidth = major ? 1.2 : 0.8;
        context.beginPath();
        context.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
        context.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
        context.stroke();
      }

      // Replication links: arcs lifted off the surface with a travelling packet
      GLOBE_LINKS.forEach(([from, to, color], linkIndex) => {
        const a = GLOBE_NODES[from].pos;
        const b = GLOBE_NODES[to].pos;
        const omega = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
        const lift = 0.12 + omega * 0.12;
        const at = (t: number): Vec3 => {
          const wa = Math.sin((1 - t) * omega) / Math.sin(omega);
          const wb = Math.sin(t * omega) / Math.sin(omega);
          const h = 1 + lift * Math.sin(Math.PI * t);
          return [(a[0] * wa + b[0] * wb) * h, (a[1] * wa + b[1] * wb) * h, (a[2] * wa + b[2] * wb) * h];
        };
        const steps = 40;
        let previous = project(at(0));
        for (let i = 1; i <= steps; i++) {
          const current = project(at(i / steps));
          if (!occluded(current) && !occluded(previous)) {
            const depth = Math.max(0.15, (current[2] + 1) / 2);
            context.strokeStyle = `rgba(${color}, ${0.55 * depth})`;
            context.lineWidth = 1.1;
            context.beginPath();
            context.moveTo(previous[0], previous[1]);
            context.lineTo(current[0], current[1]);
            context.stroke();
          }
          previous = current;
        }
        const t = (elapsed * 0.00022 + linkIndex * 0.37) % 1;
        const packet = project(at(t));
        if (!occluded(packet)) {
          const glow = context.createRadialGradient(packet[0], packet[1], 0, packet[0], packet[1], 7);
          glow.addColorStop(0, `rgba(${color}, 0.95)`);
          glow.addColorStop(1, `rgba(${color}, 0)`);
          context.fillStyle = glow;
          context.fillRect(packet[0] - 7, packet[1] - 7, 14, 14);
        }
      });

      // Region markers with a pulsing ring
      GLOBE_NODES.forEach((node, nodeIndex) => {
        const [sx, sy, z] = project(node.pos);
        if (z <= 0.02) return;
        const pulse = ((elapsed * 0.0006 + nodeIndex * 0.23) % 1 + 1) % 1;
        context.strokeStyle = `rgba(${node.color}, ${(1 - pulse) * 0.7 * z})`;
        context.lineWidth = 1;
        context.beginPath();
        context.arc(sx, sy, 3 + pulse * 12, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = `rgba(${node.color}, ${0.5 + 0.5 * z})`;
        context.beginPath();
        context.arc(sx, sy, node.color === WHITE ? 2.2 : 3.2, 0, Math.PI * 2);
        context.fill();
      });

      // Satellites with fading trails
      for (const orbit of GLOBE_ORBITS) {
        const cosX = Math.cos(orbit.tiltX);
        const sinX = Math.sin(orbit.tiltX);
        const cosZ = Math.cos(orbit.tiltZ);
        const sinZ = Math.sin(orbit.tiltZ);
        const onOrbit = (angle: number): Vec3 => {
          const px = Math.cos(angle) * orbit.radius;
          const pz = Math.sin(angle) * orbit.radius;
          // tilt around X, then Z, then lean with the pointer
          const y1 = -pz * sinX;
          const z1 = pz * cosX;
          const x2 = px * cosZ - y1 * sinZ;
          const y2 = px * sinZ + y1 * cosZ;
          return project([x2 * Math.cos(lean.yaw) + z1 * Math.sin(lean.yaw), y2, -x2 * Math.sin(lean.yaw) + z1 * Math.cos(lean.yaw)], false);
        };

        // faint full path
        context.strokeStyle = "rgba(255, 255, 255, 0.05)";
        context.lineWidth = 0.8;
        context.beginPath();
        for (let i = 0; i <= 96; i++) {
          const [sx, sy] = onOrbit((i / 96) * Math.PI * 2);
          if (i === 0) context.moveTo(sx, sy);
          else context.lineTo(sx, sy);
        }
        context.stroke();

        const head = orbit.phase + elapsed * orbit.speed;
        const direction = Math.sign(orbit.speed);
        const trail = 28;
        let previous = onOrbit(head - direction * 1.1);
        for (let i = 1; i <= trail; i++) {
          const current = onOrbit(head - direction * 1.1 * (1 - i / trail));
          if (!occluded(current) && !occluded(previous)) {
            context.strokeStyle = `rgba(${orbit.color}, ${(i / trail) ** 2 * 0.9})`;
            context.lineWidth = 0.6 + (i / trail) * 1.4;
            context.beginPath();
            context.moveTo(previous[0], previous[1]);
            context.lineTo(current[0], current[1]);
            context.stroke();
          }
          previous = current;
        }
        const tip = onOrbit(head);
        if (!occluded(tip)) {
          const glow = context.createRadialGradient(tip[0], tip[1], 0, tip[0], tip[1], 12);
          glow.addColorStop(0, `rgba(${orbit.color}, 0.9)`);
          glow.addColorStop(1, `rgba(${orbit.color}, 0)`);
          context.fillStyle = glow;
          context.fillRect(tip[0] - 12, tip[1] - 12, 24, 24);
          context.fillStyle = "#fff";
          context.beginPath();
          context.arc(tip[0], tip[1], 2, 0, Math.PI * 2);
          context.fill();
          context.strokeStyle = `rgba(${orbit.color}, 0.6)`;
          context.lineWidth = 1;
          context.beginPath();
          context.arc(tip[0], tip[1], 6, 0, Math.PI * 2);
          context.stroke();
        }
      }
    };

    const loop = (now: number) => {
      lean.yaw += (lean.targetYaw - lean.yaw) * 0.05;
      lean.pitch += (lean.targetPitch - lean.pitch) * 0.05;
      draw(now - start);
      frame = requestAnimationFrame(loop);
    };

    const play = () => {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const pause = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = wrapper.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
      const dy = (event.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
      lean.targetYaw = Math.max(-1, Math.min(1, dx)) * 0.6;
      lean.targetPitch = Math.max(-1, Math.min(1, dy)) * 0.3;
    };

    const onVisibility = () => (document.hidden ? pause() : play());

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });
    viewObserver.observe(wrapper);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    play();

    return () => {
      pause();
      resizeObserver.disconnect();
      viewObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div ref={wrapperRef} role="img" aria-label={copy.label} className="relative aspect-square w-full">
        <div aria-hidden="true" className="globe-glow absolute inset-[-8%] rounded-full" />
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" />

        <ul aria-hidden="true" className="hud absolute left-0 top-[3%] hidden sm:block">
          {copy.legend.map((item, index) => (
            <li key={item} className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${index === 0 ? "bg-accent shadow-[0_0_8px_rgba(34,211,238,0.9)]" : index === 1 ? "bg-violet-soft shadow-[0_0_8px_rgba(192,132,252,0.9)]" : "bg-white/70"}`} />
              {item}
            </li>
          ))}
        </ul>
        <dl aria-hidden="true" className="hud absolute right-0 top-[3%] text-right">
          {copy.stats.map((label, index) => (
            <div key={label} className="flex justify-end gap-2 uppercase">
              <dt className="text-white/45">{label}</dt>
              <dd className={index === 1 ? "text-violet-soft" : "text-accent"}>{stats[index]}</dd>
            </div>
          ))}
        </dl>
      </div>
      <Telemetry copy={copy} />
    </div>
  );
}

// Illustrative pipeline log that keeps scrolling, like a terminal tail
function Telemetry({ copy }: { copy: GlobeCopy }) {
  const visibleLines = 4;
  const [cursor, setCursor] = useState(visibleLines);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setCursor((value) => value + 1), 1600);
    return () => window.clearInterval(timer);
  }, []);

  const lines = Array.from({ length: visibleLines }, (_, offset) => {
    const id = cursor - visibleLines + offset;
    return { id, ...copy.logs[id % copy.logs.length] };
  });

  return (
    <div aria-hidden="true" className="glass relative -mt-4 overflow-hidden rounded-xl bg-space-950/70 backdrop-blur-md sm:-mt-8">
      <div className="hairline flex items-center justify-between border-b px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em]">
        <span className="text-white/45">[ {copy.pipelineTitle} ]</span>
        <span className="flex items-center gap-2 text-accent">
          <span className="status-dot h-1.5 w-1.5 rounded-full" />
          {copy.pipelineStatus}
        </span>
      </div>
      <ol className="telemetry-mask px-4 py-3 font-mono text-[11px] leading-6">
        {lines.map((line) => (
          <li key={line.id} className="telemetry-line flex gap-3 whitespace-nowrap">
            <span className="text-white/25">{String(line.id + 1).padStart(3, "0")}</span>
            <span className="w-24 shrink-0 text-accent">{line.step}</span>
            <span className="min-w-0 flex-1 truncate text-white/55">{line.detail}</span>
            <span className="text-violet-soft">✓ ok</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

type ApproachCopy = Dictionary["approach"];

function ApproachFlow({ copy }: { copy: ApproachCopy }) {
  return (
    <div className="mt-12 md:mt-16">
      {/* Wide screens: one horizontal pipeline that fans out into the delivery pillars */}
      <div className="reveal glass relative hidden overflow-hidden rounded-3xl px-10 pb-24 pt-14 xl:block">
        <div className="tech-grid absolute inset-0 opacity-60" />
        <div className="relative flex items-center">
          {copy.steps.map((step, index) => (
            <Fragment key={index}>
              {index > 0 && <span className="flow-line mx-3 min-w-6 flex-1" style={delay(index * 400)} />}
              <FlowNode icon={approachStepIcons[index]} title={step.title} caption={step.caption} core={index === 2} />
            </Fragment>
          ))}
          <svg className="h-72 w-14 shrink-0 self-center" viewBox="0 0 56 100" preserveAspectRatio="none" aria-hidden="true">
            {[11, 37, 63, 89].map((y) => (
              <path key={y} className="flow-path" vectorEffect="non-scaling-stroke" d={`M0 50 C28 50 28 ${y} 56 ${y}`} />
            ))}
          </svg>
          <ul className="flex h-72 w-60 shrink-0 flex-col justify-between">
            {copy.outputs.map((output, index) => (
              <li key={index} className="flow-node flex h-16 items-center gap-3 rounded-2xl px-3">
                <span className="icon-ring grid h-8 w-8 shrink-0 place-items-center rounded-full text-accent-soft">
                  <Icon name={approachOutputIcons[index]} className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold text-white">{output.title}</span>
                  <span className="block text-[11px] leading-tight text-white/45">{output.caption}</span>
                </span>
              </li>
            ))}
          </ul>
          <svg className="h-72 w-14 shrink-0 self-center" viewBox="0 0 56 100" preserveAspectRatio="none" aria-hidden="true">
            {[11, 37, 63, 89].map((y) => (
              <path key={y} className="flow-path" vectorEffect="non-scaling-stroke" d={`M0 ${y} C28 ${y} 28 50 56 50`} />
            ))}
          </svg>
          <FlowNode icon="check" title={copy.result.title} caption={copy.result.caption} />
        </div>
      </div>

      {/* Smaller screens: the same story as a vertical sequence */}
      <div className="xl:hidden">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {copy.steps.map((step, index) => (
            <li key={index} className={`reveal flex items-center gap-4 rounded-2xl p-4 ${index === 2 ? "gradient-border" : "glass"}`} style={delay(index * 70)}>
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-accent-soft ${index === 2 ? "orb text-white" : "icon-ring"}`}>
                <Icon name={approachStepIcons[index]} className="relative h-5 w-5" />
              </span>
              <div>
                <p className="font-mono text-[10px] text-accent">{String(index + 1).padStart(2, "0")}</p>
                <p className="font-display font-semibold text-white">{step.title}</p>
                <p className="mt-0.5 text-xs leading-snug text-white/50">{step.caption}</p>
              </div>
            </li>
          ))}
        </ol>
        <span aria-hidden="true" className="flow-line-v mx-auto my-3 block h-8" />
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {copy.outputs.map((output, index) => (
            <li key={index} className="reveal glass flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center" style={delay(index * 70)}>
              <span className="icon-ring grid h-9 w-9 shrink-0 place-items-center rounded-full text-accent-soft">
                <Icon name={approachOutputIcons[index]} className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">{output.title}</span>
                <span className="block text-xs leading-snug text-white/45">{output.caption}</span>
              </span>
            </li>
          ))}
        </ul>
        <span aria-hidden="true" className="flow-line-v mx-auto my-3 block h-8" />
        <div className="reveal gradient-border flex items-center gap-4 rounded-2xl p-5 shadow-[0_0_50px_-15px_rgba(168,85,247,0.6)]">
          <span className="icon-ring grid h-12 w-12 shrink-0 place-items-center rounded-full text-white">
            <Icon name="check" />
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-white">{copy.result.title}</p>
            <p className="text-sm text-white/55">{copy.result.caption}</p>
          </div>
        </div>
      </div>

      {/* Before / after: how the operating model changes */}
      <div className="reveal glass mt-4 grid overflow-hidden rounded-3xl md:grid-cols-[1fr_1.6fr]">
        <div className="p-6 sm:p-8">
          <p className="text-sm font-semibold text-white/60">{copy.legacy.title}</p>
          <p className="mt-1 font-mono text-xs text-white/35">{copy.legacy.flow}</p>
          <IconChain icons={legacyChain} muted />
        </div>
        <div className="hairline relative border-t p-6 sm:p-8 md:border-l md:border-t-0">
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-accent/8 to-transparent" />
          <div className="relative">
            <p className="text-sm font-semibold text-accent-soft">{copy.modern.title}</p>
            <p className="mt-1 font-mono text-xs text-white/50">{copy.modern.flow}</p>
            <IconChain icons={modernChain} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowNode({ icon, title, caption, core = false }: { icon: IconName; title: string; caption: string; core?: boolean }) {
  return (
    <div className="relative flex shrink-0 flex-col items-center">
      <div className={`grid place-items-center rounded-full text-center ${core ? "orb h-36 w-36" : "flow-node h-28 w-28"}`}>
        <div className="relative flex flex-col items-center gap-1.5">
          <Icon name={icon} className={core ? "h-6 w-6 text-white" : "h-5 w-5 text-accent-soft"} />
          <span className={`font-display font-semibold text-white ${core ? "text-base" : "text-[13px]"}`}>{title}</span>
        </div>
      </div>
      <p className="absolute top-full mt-4 w-36 text-center text-xs leading-snug text-white/50">{caption}</p>
    </div>
  );
}

function IconChain({ icons, muted = false }: { icons: IconName[]; muted?: boolean }) {
  return (
    <div aria-hidden="true" className="mt-6 flex flex-wrap items-center gap-y-3">
      {icons.map((icon, index) => (
        <Fragment key={icon}>
          {index > 0 && <span className={`h-px w-4 sm:w-6 ${muted ? "bg-white/15" : "bg-accent/50"}`} />}
          <span className={`grid h-9 w-9 place-items-center rounded-full ${muted ? "border border-white/10 text-white/35" : index === icons.length - 1 ? "orb text-white" : "icon-ring text-accent-soft"}`}>
            <Icon name={icon} className="relative h-4 w-4" />
          </span>
        </Fragment>
      ))}
    </div>
  );
}

type ProjectsCopy = Dictionary["projects"];
type DiagramCopy = ProjectsCopy["diagram"];

function ProjectCard({
  project,
  index,
  featured,
  featuredLabel,
  viewDetails,
  diagram,
  onOpen,
}: {
  project: Project;
  index: number;
  featured: boolean;
  featuredLabel: string;
  viewDetails: string;
  diagram: DiagramCopy;
  onOpen: () => void;
}) {
  const visibleTags = project.tags.slice(0, featured ? 8 : 5);
  const hiddenTags = project.tags.length - visibleTags.length;

  return (
    <article
      onPointerMove={trackPointer}
      style={delay(featured ? 0 : (index - 1) * 90)}
      className={`reveal spotlight group flex flex-col rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-8 ${
        featured ? "gradient-border lg:col-span-2 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 lg:p-10" : "glass"
      }`}
    >
      <div className="flex flex-col">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span className="eyebrow-line h-px w-8" />
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">{project.category}</span>
          {featured && <span className="rounded-full border border-accent/40 bg-accent/12 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-soft">{featuredLabel}</span>}
        </div>
        <h3 className={`mt-6 font-display font-bold leading-tight tracking-[-0.03em] text-white ${featured ? "text-2xl sm:text-3xl lg:text-[2.5rem]" : "text-2xl"}`}>{project.title}</h3>
        <p className="mt-4 leading-relaxed text-white/55">{project.summary}</p>

        <dl className={`hairline mt-8 grid gap-4 border-t pt-6 ${featured ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3"}`}>
          {project.highlights.map((highlight) => (
            <div key={highlight.label}>
              <dt className="sr-only">{highlight.label}</dt>
              <dd>
                <span className="text-gradient block font-display text-xl font-bold tracking-tight sm:text-2xl">{highlight.value}</span>
                <span className="mt-1 block text-[11px] leading-snug text-white/40">{highlight.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 font-mono text-[11px] leading-relaxed text-white/45">
          {visibleTags.join("  •  ")}
          {hiddenTags > 0 && <span className="text-accent/70">{`  +${hiddenTags}`}</span>}
        </p>

        <div className="mt-auto pt-8">
          {/* The ::after overlay stretches the button over the whole card, so the card is one click target */}
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="inline-flex items-center gap-3 text-sm font-semibold text-white after:absolute after:inset-0 after:z-10 after:rounded-3xl after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent"
          >
            {viewDetails}
            <span className="icon-ring grid h-10 w-10 place-items-center rounded-full text-accent-soft transition group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_24px_-2px_rgba(34,211,238,0.9)]">
              <Icon name="arrow" className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>

      {featured && <DiagramPreview diagram={diagram} />}
    </article>
  );
}

// Miniature of the architecture for the featured card; the full diagram lives in the modal
function DiagramPreview({ diagram }: { diagram: DiagramCopy }) {
  const zone = "rounded-2xl border px-4 py-3.5";
  const label = "font-mono text-[10px] uppercase tracking-[0.18em]";
  return (
    <div aria-hidden="true" className="relative mt-10 hidden flex-col justify-center gap-1 sm:flex lg:mt-0">
      <div className={`${zone} border-dashed border-white/15 bg-white/2`}>
        <p className={`${label} text-white/45`}>{diagram.onPrem}</p>
      </div>
      <PreviewLink labels={diagram.links} />
      <div className={`${zone} border-accent/40 bg-accent/8 shadow-[0_0_40px_-12px_rgba(168,85,247,0.6)]`}>
        <p className={`${label} text-accent-soft`}>{diagram.primary}</p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-white/70">
          {[diagram.edge, diagram.app, diagram.data].map((tier) => <span key={tier} className="rounded-lg border border-white/8 bg-space-950/50 px-2 py-2.5 text-center leading-tight">{tier}</span>)}
        </div>
      </div>
      <PreviewLink labels={diagram.replication} />
      <div className={`${zone} border-white/12 bg-white/3`}>
        <p className={`${label} text-white/60`}>{diagram.dr}</p>
      </div>
    </div>
  );
}

function PreviewLink({ labels }: { labels: string[] }) {
  return (
    <div className="flex items-center gap-3 py-1 pl-6">
      <span className="flow-line-v h-7" />
      <span className="truncate font-mono text-[10px] text-white/40">{labels.join(" · ")}</span>
    </div>
  );
}

function ProjectModal({
  project,
  index,
  copy,
  talkToMe,
  showDiagram,
  onClose,
}: {
  project: Project;
  index: number;
  copy: ProjectsCopy;
  talkToMe: string;
  showDiagram: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { labels } = copy;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    // Guarded because StrictMode runs this effect twice in development
    if (!dialog.open) dialog.showModal();
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previousOverflow;
    };
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      className="project-modal"
      aria-labelledby="project-modal-title"
      onClose={onClose}
      onClick={(event) => {
        // A click on the dialog element itself (not its content) is a click on the backdrop
        if (event.target === event.currentTarget) close();
      }}
    >
      <header className="hairline relative flex shrink-0 items-start justify-between gap-4 overflow-hidden border-b px-5 py-5 sm:px-8 sm:py-6">
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-accent/12 via-transparent to-transparent" />
        <div className="relative min-w-0">
          <p className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em]">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span className="eyebrow-line h-px w-8" />
            <span className="text-white/50">{project.category}</span>
          </p>
          <h2 id="project-modal-title" className="mt-3 font-display text-2xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-3xl">{project.title}</h2>
        </div>
        <button type="button" onClick={close} aria-label={copy.close} title={copy.close} className="btn-ghost relative grid h-10 w-10 shrink-0 place-items-center rounded-full">
          <Icon name="x" />
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="grid gap-10 px-5 py-8 sm:px-8 sm:py-10">
          <p className="max-w-3xl text-lg leading-relaxed text-white/70">{project.summary}</p>

          <dl className="glass grid grid-cols-2 overflow-hidden rounded-2xl sm:grid-cols-4" aria-label={labels.highlights}>
            {project.highlights.map((highlight, highlightIndex) => (
              <div key={highlight.label} className={`hairline p-4 sm:p-5 ${highlightIndex % 2 === 1 ? "border-l" : ""} ${highlightIndex >= 2 ? "border-t sm:border-t-0" : ""} ${highlightIndex > 0 ? "sm:border-l" : ""}`}>
                <dt className="sr-only">{highlight.label}</dt>
                <dd>
                  <span className="text-gradient block font-display text-2xl font-bold tracking-tight">{highlight.value}</span>
                  <span className="mt-1 block text-xs leading-snug text-white/45">{highlight.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <ModalSection title={labels.gains}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.gains.map((gain) => (
                <li key={gain.title} className="glass flex gap-4 rounded-2xl p-5">
                  <span className="icon-ring grid h-9 w-9 shrink-0 place-items-center rounded-full text-accent-soft"><Icon name="check" className="h-4 w-4" /></span>
                  <div>
                    <p className="font-semibold text-white">{gain.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/55">{gain.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ModalSection>

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <ModalSection title={labels.context}>
              <p className="leading-relaxed text-white/60">{project.context}</p>
            </ModalSection>
            <ModalSection title={labels.solution}>
              <ul className="grid gap-3">
                {project.solution.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-white/65">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </ModalSection>
          </div>

          {showDiagram && (
            <ModalSection title={labels.architecture}>
              <ArchitectureDiagram diagram={copy.diagram} />
            </ModalSection>
          )}

          {project.flow && (
            <ModalSection title={project.flow.label}>
              <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                {project.flow.steps.map((step, stepIndex) => (
                  <li key={step} className="flex items-center gap-2">
                    {stepIndex > 0 && <Icon name="arrow" className="h-4 w-4 shrink-0 rotate-90 text-accent/60 sm:rotate-0" />}
                    <span className="glass flex items-center gap-3 rounded-full py-2 pl-2 pr-4 text-sm font-medium text-white">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-accent/20 font-mono text-[10px] text-accent-soft">{stepIndex + 1}</span>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </ModalSection>
          )}

          {project.beforeAfter && (
            <ModalSection title={labels.beforeAfter}>
              <div className="grid gap-3">
                {project.beforeAfter.map((row) => (
                  <div key={row.after} className="glass grid overflow-hidden rounded-2xl sm:grid-cols-2">
                    <div className="p-4 sm:p-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">{labels.before}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/50">{row.before}</p>
                    </div>
                    <div className="hairline border-t bg-accent/8 p-4 sm:border-l sm:border-t-0 sm:p-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-soft">{labels.after}</p>
                      <p className="mt-2 flex gap-2 text-sm leading-relaxed text-white">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {row.after}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ModalSection>
          )}

          <ModalSection title={labels.technologies}>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 font-mono text-[11px] text-white/70">{tag}</span>)}
            </div>
          </ModalSection>

          <div className="gradient-border flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="font-display text-lg font-semibold tracking-tight text-white">{labels.cta}</p>
            <a href="#contato" onClick={close} className="btn-primary inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">
              {talkToMe} <Icon name="arrow" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}

function ModalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft/80">
        <span className="eyebrow-line h-px w-8" />
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

// Laid out with HTML instead of a fixed-size image so it reflows to a single column on phones
function ArchitectureDiagram({ diagram }: { diagram: DiagramCopy }) {
  return (
    <figure>
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/2 p-4 sm:p-5">
        <ZoneTitle>{diagram.onPrem}</ZoneTitle>
        <ChipRow items={diagram.onPremItems} />
      </div>

      <DiagramLink labels={diagram.links} />

      <div className="rounded-2xl border border-accent/35 bg-accent/6 p-4 shadow-[0_0_60px_-20px_rgba(168,85,247,0.5)] sm:p-5">
        <ZoneTitle accent>{diagram.primary}</ZoneTitle>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Tier title={diagram.edge} className="md:col-span-2">
            <ol className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {diagram.edgeItems.map((item, itemIndex) => (
                <li key={item} className="flex items-center gap-2 sm:flex-1">
                  {itemIndex > 0 && <Icon name="arrow" className="h-4 w-4 shrink-0 rotate-90 text-accent/60 sm:rotate-0" />}
                  <Chip className="sm:flex-1">{item}</Chip>
                </li>
              ))}
            </ol>
          </Tier>
          <Tier title={diagram.app}><ChipRow items={diagram.appItems} /></Tier>
          <Tier title={diagram.ops}><ChipRow items={diagram.opsItems} /></Tier>
          <Tier title={diagram.data} className="md:col-span-2">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {diagram.dataItems.map((item) => (
                <Chip key={item} icon="database">{item}</Chip>
              ))}
            </div>
          </Tier>
        </div>
      </div>

      <DiagramLink labels={diagram.replication} accent />

      <div className="rounded-2xl border border-white/12 bg-white/3 p-4 sm:p-5">
        <ZoneTitle>{diagram.dr}</ZoneTitle>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {diagram.drItems.map((item) => <Chip key={item}>{item}</Chip>)}
        </div>
        <p className="mt-4 flex items-start gap-2 text-sm font-medium text-accent-soft">
          <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0" />
          {diagram.fsdr}
        </p>
      </div>

      <figcaption className="mt-4 text-xs leading-relaxed text-white/40">{diagram.caption}</figcaption>
    </figure>
  );
}

function ZoneTitle({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return <p className={`font-mono text-[11px] font-medium uppercase tracking-[0.16em] ${accent ? "text-accent-soft" : "text-white/50"}`}>{children}</p>;
}

function Tier({ title, className = "", children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={`rounded-xl border border-white/8 bg-space-950/50 p-3 sm:p-4 ${className}`}>
      <p className="mb-3 text-xs font-semibold text-white/65">{title}</p>
      {children}
    </div>
  );
}

function Chip({ children, icon, className = "" }: { children: ReactNode; icon?: IconName; className?: string }) {
  return (
    <span className={`flex items-center gap-2 rounded-lg border border-white/10 bg-white/4 px-3 py-2 text-xs font-medium leading-snug text-white/80 ${className}`}>
      {icon && <Icon name={icon} className="h-3.5 w-3.5 shrink-0 text-accent" />}
      {children}
    </span>
  );
}

function ChipRow({ items }: { items: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2 first:mt-0">
      {items.map((item) => <Chip key={item}>{item}</Chip>)}
    </div>
  );
}

function DiagramLink({ labels, accent = false }: { labels: string[]; accent?: boolean }) {
  return (
    <div className="flex items-stretch gap-4 py-2 pl-6 sm:pl-10">
      <div className="flex flex-col items-center">
        <span className={`w-px flex-1 ${accent ? "bg-accent/50" : "bg-white/20"}`} />
        <Icon name="arrowUp" className={`h-4 w-4 rotate-180 ${accent ? "text-accent" : "text-white/35"}`} />
      </div>
      <div className="flex flex-wrap items-center gap-2 py-2">
        {labels.map((label) => (
          <span key={label} className={`rounded-full px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wider ${accent ? "border border-accent/40 bg-accent/12 text-accent-soft" : "bg-white/5 text-white/55"}`}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function LanguageToggle({ language, onChange, label }: { language: Language; onChange: (language: Language) => void; label: string }) {
  const options: Language[] = ["pt", "en"];
  return (
    <div role="group" aria-label={label} className="relative grid grid-cols-2 rounded-full border border-white/12 bg-white/3 p-1 font-mono text-[11px] font-medium uppercase">
      <span
        aria-hidden="true"
        className={`language-thumb absolute inset-y-1 left-1 w-10 rounded-full bg-accent/20 shadow-[inset_0_0_0_1px_rgba(168,85,247,0.5),0_0_16px_-4px_rgba(168,85,247,0.8)] transition-transform duration-200 ease-out ${language === "en" ? "translate-x-full" : "translate-x-0"}`}
      />
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={language === option}
          title={language === option ? undefined : label}
          className={`relative z-10 h-8 w-10 rounded-full tracking-wider transition-colors duration-200 ${language === option ? "text-white" : "text-white/45 hover:text-white"}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function Metric({ index, value, label, className }: { index: string; value: string; label: string; className: string }) {
  return (
    <div className={`hairline flex items-center gap-5 p-5 sm:p-6 ${className}`}>
      <span className="font-mono text-[11px] text-violet-soft/80">{index}</span>
      <div>
        <dt className="sr-only">{label}</dt>
        <dd>
          <span className="text-gradient block font-mono text-3xl font-semibold tracking-tight">{value}</span>
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{label}</span>
        </dd>
      </div>
    </div>
  );
}

function FooterLink({ href, icon, external = false, children }: { href: string; icon: IconName; external?: boolean; children: ReactNode }) {
  return (
    <li>
      <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className="inline-flex max-w-full items-center gap-3 text-white/55 transition hover:text-white">
        <Icon name={icon} className="h-4 w-4 shrink-0 text-accent" />
        <span className="truncate">{children}</span>
      </a>
    </li>
  );
}

// The last word of the title gets the blue gradient, echoing the hero
function SectionHeading({ number, eyebrow, title, description, stacked = false }: { number: string; eyebrow: string; title: string; description: string; stacked?: boolean }) {
  const words = title.split(" ");
  const last = words.pop();
  return (
    <div className={`grid gap-6 ${stacked ? "" : "md:grid-cols-[1fr_0.75fr] md:items-end md:gap-10"}`}>
      <div>
        <div className="reveal flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-accent-soft/70">
          <span className="text-violet-soft">{number}</span>
          <span className="eyebrow-line h-px w-14" />
          <span className="text-accent">[ {eyebrow} ]</span>
        </div>
        <h2 className="reveal mt-6 font-display text-[2.1rem] font-extrabold leading-[1.02] tracking-tighter text-white sm:text-5xl md:text-6xl" style={delay(80)}>
          {words.length > 0 && `${words.join(" ")} `}
          <span className="text-gradient">{last}</span>
        </h2>
      </div>
      <p className="reveal max-w-xl leading-relaxed text-white/55" style={delay(160)}>{description}</p>
    </div>
  );
}

export default App;
