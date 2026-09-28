import { Fragment, useEffect, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import resumePtUrl from "./imports/Igor Rodrigues.pdf?url";
import resumeEnUrl from "./imports/Igor Rodrigues - EN.pdf?url";
import { dictionaries, type Language } from "./i18n";

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
  | "arrow"
  | "arrowUp"
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
  | "mail"
  | "map"
  | "menu"
  | "shield"
  | "whatsapp"
  | "x";

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    arrowUp: <><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></>,
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
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    map: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
    whatsapp: <><path d="M3.5 20.5 4.9 16.4A8.5 8.5 0 1 1 7.8 19.3Z" /><path d="M9 8.8c0 3.4 2.8 6.2 6.2 6.2l.9-1.6-2-1-.9.9a4.5 4.5 0 0 1-2.4-2.4l.9-.9-1-2Z" /></>,
    x: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const expertise = [
  { icon: "cloud" as const, number: "01", tags: ["OCI", "AWS", "Azure", "GCP", "Huawei Cloud"] },
  { icon: "layers" as const, number: "02", tags: ["Terraform", "Ansible", "Jenkins", "Kubernetes", "Podman"] },
  { icon: "code" as const, number: "03", tags: ["Python", "TypeScript", "Bash", "PowerShell", "Java"] },
  { icon: "shield" as const, number: "04", tags: ["Grafana", "Datadog", "Zabbix", "FortiGate", "Sophos"] },
];

const companies = [
  "CCM Soluções em Tecnologia",
  "Statum Tecnologia",
  "Senior Sistemas",
  "Pedra Agroindustrial",
  "SMARAPD Informática",
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

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");
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

  // Close the mobile menu on Escape or when the viewport grows to desktop
  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
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
    [t.nav.expertise, "#especialidades"],
    [t.nav.experience, "#experiencia"],
    [t.nav.certifications, "#certificacoes"],
    [t.nav.languages, "#idiomas"],
  ];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.contact.whatsappMessage)}`;

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f5f6f2] text-[#132625]">
      <header className={`fixed inset-x-0 top-0 z-50 border-b text-white backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300 ${scrolled || menuOpen ? "border-white/10 bg-[#102725]/95 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]" : "border-transparent bg-[#102725]/80"}`}>
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
          <a href="#inicio" onClick={() => setMenuOpen(false)} className="flex shrink-0 items-center gap-3 font-semibold tracking-tight" aria-label={t.nav.home}>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#c9ff59] font-mono text-sm font-bold text-[#102725]">IR</span>
            <span className="hidden sm:block">Igor Rodrigues</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm lg:flex xl:gap-8" aria-label={t.nav.mainLabel}>
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                aria-current={activeSection === href ? "location" : undefined}
                className={`relative py-2 transition after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-[#c9ff59] after:transition-transform after:duration-300 ${activeSection === href ? "text-white after:scale-x-100" : "text-white/65 after:scale-x-0 hover:text-white"}`}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle language={language} onChange={changeLanguage} label={t.languageToggle} />
            <a href={resume.url} download={resume.fileName} className="hidden items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium transition hover:border-white/50 hover:bg-white/5 md:flex">
              <Icon name="download" className="h-4 w-4" /> {t.downloadCv}
            </a>
            <a href="#contato" className="hidden rounded-full bg-[#c9ff59] px-5 py-2.5 text-sm font-semibold text-[#102725] transition hover:bg-white md:block">
              {t.talkToMe}
            </a>
            <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition hover:border-white/50 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu} aria-expanded={menuOpen} aria-controls="mobile-menu">
              <Icon name={menuOpen ? "x" : "menu"} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-menu" className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 bg-[#102725] px-5 pb-6 pt-2 md:px-8 lg:hidden" aria-label={t.nav.mainLabel}>
            {[...navLinks, [t.nav.contact, "#contato"]].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} aria-current={activeSection === href ? "location" : undefined} className={`flex items-center justify-between border-b border-white/10 py-4 text-base transition ${activeSection === href ? "text-[#c9ff59]" : "text-white/80 hover:text-white"}`}>
                {label}
                <Icon name="arrow" className="h-4 w-4 opacity-40" />
              </a>
            ))}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:hidden">
              <a href={resume.url} download={resume.fileName} onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-medium">
                <Icon name="download" className="h-4 w-4" /> {t.downloadCv}
              </a>
              <a href="#contato" onClick={() => setMenuOpen(false)} className="flex items-center justify-center rounded-full bg-[#c9ff59] px-4 py-3 text-sm font-semibold text-[#102725]">
                {t.talkToMe}
              </a>
            </div>
          </nav>
        )}
      </header>
      {menuOpen && <div className="fixed inset-0 z-40 bg-[#07100f]/50 lg:hidden" onClick={() => setMenuOpen(false)} aria-hidden="true" />}

      <main>
        <section id="inicio" className="relative bg-[#102725] px-5 pb-16 pt-32 text-white md:px-8 md:pb-24 md:pt-44">
          <div className="hero-grid absolute inset-0 opacity-30" />
          <div className="absolute -right-36 top-20 h-96 w-96 rounded-full bg-[#40d9cd]/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-end gap-14 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="mb-7 flex items-center gap-3 text-sm font-medium text-[#c9ff59]">
                <span className="h-2 w-2 rounded-full bg-[#c9ff59] shadow-[0_0_0_5px_rgba(201,255,89,.12)]" />
                {t.hero.available}
              </div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-white/50">Cloud Solutions Architect</p>
              <h1 className="max-w-4xl text-[clamp(2.5rem,11vw,5rem)] lg:text-[clamp(4.5rem,7vw,7.4rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
                {t.hero.titleStart} <span className="text-[#c9ff59]">{t.hero.titleHighlight}</span>
              </h1>
              <div className="mt-9 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                <p className="max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg md:text-xl">{t.hero.description}</p>
                <a href="#especialidades" className="group flex w-fit items-center gap-3 text-sm font-semibold">
                  {t.hero.cta}
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition group-hover:border-[#c9ff59] group-hover:bg-[#c9ff59] group-hover:text-[#102725]">
                    <Icon name="arrow" className="h-5 w-5" />
                  </span>
                </a>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-white/5.5 p-5 backdrop-blur-sm sm:p-6">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">{t.hero.numbers}</span>
                <span className="h-2 w-2 rounded-full bg-[#40d9cd]" />
              </div>
              <div className="grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:grid-cols-1 lg:divide-x-0 lg:divide-y">
                <Metric value="8+" label={t.hero.years} />
                <Metric value="5" label={t.hero.providers} />
                <Metric value={String(certifications.length)} label={t.hero.certifications} />
              </div>
              <div className="mt-7 flex items-center gap-2 border-t border-white/10 pt-5 text-sm text-white/50">
                <Icon name="map" className="h-4 w-4 text-[#c9ff59]" />
                {t.hero.location}
              </div>
            </aside>
          </div>
        </section>

        <section className="border-b border-[#132625]/10 bg-[#c9ff59] px-5 py-4 md:px-8">
          <div className="mx-auto max-w-7xl font-mono text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.16em]">
            {/* Fixed line breaks per breakpoint so a ◆ never dangles at the start or end of a wrapped line */}
            <MarqueeRows items={t.marquee} rows={[[0, 1], [2], [3, 4]]} className="md:hidden" />
            <MarqueeRows items={t.marquee} rows={[[0, 1, 2], [3, 4]]} className="hidden md:grid lg:hidden" />
            <MarqueeRows items={t.marquee} rows={[[0, 1, 2, 3, 4]]} className="hidden lg:grid" />
          </div>
        </section>

        <section id="especialidades" className="scroll-mt-18 px-5 py-20 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={t.expertise.eyebrow} title={t.expertise.title} description={t.expertise.description} />
            <div className="mt-10 grid md:mt-14 gap-px overflow-hidden rounded-3xl border border-[#132625]/10 bg-[#132625]/10 md:grid-cols-2">
              {expertise.map((item, index) => (
                <article key={item.number} className="group bg-[#f5f6f2] p-6 transition hover:bg-white sm:p-7 md:p-10">
                  <div className="mb-8 flex md:mb-12 items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#dff4ee] text-[#0c746e] transition group-hover:bg-[#102725] group-hover:text-[#c9ff59]">
                      <Icon name={item.icon} />
                    </span>
                    <span className="font-mono text-xs text-[#132625]/35">{item.number}</span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">{t.expertise.items[index].title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-[#132625]/60">{t.expertise.items[index].description}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {item.tags.map((tag) => <span key={tag} className="rounded-full border border-[#132625]/12 px-3 py-1.5 font-mono text-[11px]">{tag}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experiencia" className="scroll-mt-18 bg-[#e7ebe5] px-5 py-20 md:px-8 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="section-label">{t.experience.eyebrow}</p>
              <h2 className="mt-5 text-[2rem] font-semibold leading-tight tracking-[-0.045em] sm:text-4xl md:text-6xl">{t.experience.title}</h2>
              <p className="mt-6 max-w-md leading-relaxed text-[#132625]/60">{t.experience.description}</p>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border-b border-[#132625] pb-1 text-sm font-semibold">
                {t.experience.linkedin} <Icon name="external" className="h-4 w-4" />
              </a>
            </div>
            <div className="border-t border-[#132625]/15">
              {t.experience.jobs.map((job, index) => {
                const current = index === 0;
                return (
                  <article key={companies[index]} className="grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-3 border-b border-[#132625]/15 py-6 md:grid-cols-[42px_1fr_auto] md:gap-5 md:py-7">
                    <span className={`mt-1 grid h-8 w-8 place-items-center rounded-full font-mono text-[10px] ${current ? "bg-[#102725] text-[#c9ff59]" : "border border-[#132625]/20 text-[#132625]/45"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="col-span-2 md:col-span-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold">{job.role}</h3>
                        {current && <span className="rounded-full bg-[#c9ff59] px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider">{t.experience.current}</span>}
                      </div>
                      <p className="mt-1 text-sm font-medium text-[#0c746e]">{companies[index]}</p>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#132625]/55">{job.summary}</p>
                    </div>
                    <p className="col-start-2 row-start-1 self-center font-mono text-[11px] uppercase tracking-wide text-[#132625]/45 md:col-start-3 md:self-start md:pt-1">{job.date}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="certificacoes" className="scroll-mt-18 bg-[#102725] px-5 py-24 text-white md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading light eyebrow={t.certifications.eyebrow} title={t.certifications.title} description={t.certifications.description} />
            <div className="mt-10 grid md:mt-14 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {certifications.map(([name, issuer, year], index) => (
                <article key={name} className={`group flex min-h-40 flex-col justify-between gap-6 rounded-2xl border p-6 transition sm:min-h-48 ${index === 0 ? "border-[#c9ff59]/40 bg-[#c9ff59]/10" : "border-white/10 bg-white/3.5 hover:border-white/25"}`}>
                  <div className="flex items-start justify-between">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-[#c9ff59]"><Icon name="check" className="h-4 w-4" /></span>
                    <span className="font-mono text-xs text-white/35">{year}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold leading-snug">{name}</h3>
                    <p className="mt-1 text-sm text-white/45">{issuer}</p>
                  </div>
                </article>
              ))}
              <article className="flex min-h-40 flex-col justify-between gap-6 rounded-2xl bg-[#c9ff59] p-6 sm:min-h-48 text-[#102725] md:col-span-2 lg:col-span-2">
                <span className="font-mono text-xs uppercase tracking-[0.16em] opacity-60">{t.certifications.education}</span>
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">{t.certifications.degree}</h3>
                    <p className="mt-1 text-sm opacity-65">Centro Universitário Moura Lacerda</p>
                  </div>
                  <p className="font-mono text-xs uppercase opacity-55">2017 — 2020</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="idiomas" className="scroll-mt-18 bg-[#e7ebe5] px-5 py-20 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={t.languages.eyebrow} title={t.languages.title} description={t.languages.description} />
            <div className="mt-10 grid md:mt-14 gap-4 md:grid-cols-2">
              {spokenLanguages.map((spoken, index) => {
                const item = t.languages.items[index];
                return (
                  <article key={spoken.code} className="group rounded-3xl border border-[#132625]/10 bg-[#f5f6f2] p-6 transition hover:bg-white sm:p-7 md:p-10">
                    <div className="mb-8 flex gap-3 md:mb-12 items-start justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#dff4ee] font-mono text-sm font-medium text-[#0c746e] transition group-hover:bg-[#102725] group-hover:text-[#c9ff59]">
                        {spoken.code}
                      </span>
                      <span className="rounded-full bg-[#c9ff59] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider">{item.note}</span>
                    </div>
                    <h3 className="text-2xl font-semibold tracking-[-0.03em]">{item.name}</h3>
                    <p className="mt-1 text-sm font-medium text-[#0c746e]">{item.level}</p>
                    <div className="mt-8" role="img" aria-label={`${item.name}: ${item.level}${spoken.cefr ? ` (${CEFR_LEVELS[spoken.level - 1]})` : ""}`}>
                      <div className="grid grid-cols-6 gap-1.5">
                        {CEFR_LEVELS.map((level, step) => (
                          <span key={level} className={`h-1.5 rounded-full ${step < spoken.level ? "bg-[#102725]" : "bg-[#132625]/12"}`} />
                        ))}
                      </div>
                      <div className="mt-3 grid grid-cols-6 gap-1.5 font-mono text-[10px] uppercase tracking-wider">
                        {spoken.cefr ? (
                          CEFR_LEVELS.map((level, step) => (
                            <span key={level} className={step === spoken.level - 1 ? "font-bold text-[#0c746e]" : "text-[#132625]/35"}>{level}</span>
                          ))
                        ) : (
                          <span className="col-span-6 text-[#132625]/35">{item.note}</span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-[#132625]/40">{t.languages.scale}: A1 → C2</p>
          </div>
        </section>

        <section id="contato" className="scroll-mt-18 px-5 py-20 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl bg-[#40d9cd] p-6 sm:rounded-4xl sm:p-10 md:p-14 lg:p-20">
              <div className="contact-orbit absolute -right-24 -top-40 h-107.5 w-107.5 rounded-full border border-[#102725]/15" />
              <div className="relative max-w-4xl">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em]">{t.contact.eyebrow}</p>
                <h2 className="mt-6 text-[1.9rem] font-semibold leading-[1.05] tracking-tighter sm:text-5xl md:mt-7 md:text-7xl">{t.contact.title}</h2>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-10">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#102725] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#102725]">
                    <Icon name="whatsapp" className="h-4 w-4" /> {t.contact.whatsapp}
                  </a>
                  <a href={`mailto:${EMAIL}`} className="inline-flex items-center justify-center gap-3 rounded-full bg-white/60 px-6 py-3.5 text-sm font-semibold text-[#102725] transition hover:bg-[#102725] hover:text-white">
                    <Icon name="mail" className="h-4 w-4" /> {t.contact.send}
                  </a>
                  <button onClick={copyEmail} className="inline-flex items-center justify-center gap-3 rounded-full border border-[#102725]/25 px-6 py-3.5 text-sm font-semibold transition hover:bg-white/40" aria-live="polite">
                    <Icon name={copyState === "copied" ? "check" : "copy"} className="h-4 w-4" />
                    {copyState === "copied" ? t.contact.copied : copyState === "failed" ? t.contact.copyFailed : t.contact.copy}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#102725] px-5 pb-8 pt-16 text-white md:px-8 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div className="sm:col-span-2 lg:col-span-1">
              <a href="#inicio" className="inline-flex items-center gap-3 font-semibold tracking-tight" aria-label={t.nav.home}>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#c9ff59] font-mono text-sm font-bold text-[#102725]">IR</span>
                <span className="text-lg">Igor Rodrigues</span>
              </a>
              <p className="mt-5 max-w-sm leading-relaxed text-white/55">{t.footer.tagline}</p>
              <p className="mt-5 flex items-center gap-2 text-sm text-white/45">
                <Icon name="map" className="h-4 w-4 text-[#c9ff59]" /> {t.hero.location}
              </p>
            </div>

            <nav aria-label={t.footer.navigation}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#c9ff59]">{t.footer.navigation}</p>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-1">
                {[...navLinks, [t.nav.contact, "#contato"]].map(([label, href]) => (
                  <li key={href}>
                    <a href={href} className="text-white/65 transition hover:text-white">{label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#c9ff59]">{t.footer.contact}</p>
              <ul className="mt-5 grid gap-3 text-sm">
                <FooterLink href={whatsappUrl} icon="whatsapp" external>WhatsApp</FooterLink>
                <FooterLink href={`mailto:${EMAIL}`} icon="mail">{EMAIL}</FooterLink>
                <FooterLink href={LINKEDIN_URL} icon="linkedin" external>LinkedIn</FooterLink>
                <FooterLink href={GITHUB_URL} icon="github" external>GitHub</FooterLink>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Igor Rodrigues. {t.footer.rights}</p>
            <button type="button" onClick={scrollToTop} className="group inline-flex w-fit items-center gap-2 font-mono uppercase tracking-[0.14em] transition hover:text-white">
              {t.nav.backToTop}
              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/20 transition group-hover:border-[#c9ff59] group-hover:text-[#c9ff59]">
                <Icon name="arrowUp" className="h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        </div>
      </footer>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label={t.nav.backToTop}
        title={t.nav.backToTop}
        tabIndex={showBackToTop ? 0 : -1}
        aria-hidden={!showBackToTop}
        className={`back-to-top fixed right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#c9ff59] text-[#102725] shadow-[0_12px_30px_-10px_rgba(16,39,37,0.6)] ring-1 ring-[#102725]/10 transition duration-300 hover:-translate-y-0.5 hover:bg-white sm:right-6 ${showBackToTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <Icon name="arrowUp" className="h-5 w-5" />
      </button>
    </div>
  );
}

function LanguageToggle({ language, onChange, label }: { language: Language; onChange: (language: Language) => void; label: string }) {
  const options: Language[] = ["pt", "en"];
  return (
    <div role="group" aria-label={label} className="relative grid grid-cols-2 rounded-full border border-white/20 p-1 font-mono text-[11px] font-semibold uppercase">
      <span
        aria-hidden="true"
        className={`language-thumb absolute inset-y-1 left-1 w-10 rounded-full bg-[#c9ff59] transition-transform duration-200 ease-out ${language === "en" ? "translate-x-full" : "translate-x-0"}`}
      />
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={language === option}
          title={language === option ? undefined : label}
          className={`relative z-10 h-8 w-10 rounded-full tracking-wider transition-colors duration-200 ${language === option ? "text-[#102725]" : "text-white/60 hover:text-white"}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

// Stacked list on phones and in the narrow desktop sidebar; three columns in between
function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 py-3 first:pt-0 last:pb-0 sm:block sm:px-4 sm:py-0 sm:first:pl-0 sm:last:pr-0 lg:flex lg:px-0 lg:py-3 lg:first:pt-0 lg:last:pb-0">
      <p className="w-12 shrink-0 text-3xl font-semibold tracking-tight text-[#c9ff59] sm:w-auto lg:w-12">{value}</p>
      <p className="text-[10px] leading-snug uppercase tracking-wider text-white/40 sm:mt-2 lg:mt-0">{label}</p>
    </div>
  );
}

function MarqueeRows({ items, rows, className }: { items: string[]; rows: number[][]; className: string }) {
  return (
    <div className={`grid gap-y-2 ${className}`}>
      {rows.map((row) => (
        <div key={row.join("-")} className="flex items-center justify-center gap-4 whitespace-nowrap sm:gap-7">
          {row.map((itemIndex, position) => (
            <Fragment key={itemIndex}>
              {position > 0 && <span className="text-[#132625]/35" aria-hidden="true">◆</span>}
              <span>{items[itemIndex]}</span>
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

function FooterLink({ href, icon, external = false, children }: { href: string; icon: IconName; external?: boolean; children: ReactNode }) {
  return (
    <li>
      <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className="inline-flex max-w-full items-center gap-3 text-white/65 transition hover:text-white">
        <Icon name={icon} className="h-4 w-4 shrink-0 text-[#c9ff59]" />
        <span className="truncate">{children}</span>
      </a>
    </li>
  );
}

function SectionHeading({ eyebrow, title, description, light = false }: { eyebrow: string; title: string; description: string; light?: boolean }) {
  return (
    <div className="grid gap-5 md:grid-cols-[1fr_0.75fr] md:items-end md:gap-7">
      <div>
        <p className={`section-label ${light ? "text-[#c9ff59]!" : ""}`}>{eyebrow}</p>
        <h2 className="mt-5 text-[2rem] font-semibold leading-tight tracking-[-0.045em] sm:text-4xl md:text-6xl">{title}</h2>
      </div>
      <p className={`max-w-xl leading-relaxed ${light ? "text-white/55" : "text-[#132625]/60"}`}>{description}</p>
    </div>
  );
}

export default App;
