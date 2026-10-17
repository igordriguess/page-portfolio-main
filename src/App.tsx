import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { flushSync } from "react-dom";
import resumePtUrl from "./imports/Igor Rodrigues.pdf?url";
import resumeEnUrl from "./imports/Igor Rodrigues - EN.pdf?url";
import avatar224 from "./assets/avatar-224.webp";
import avatar336 from "./assets/avatar-336.webp";
import avatar448 from "./assets/avatar-448.webp";
import avatarFallback from "./assets/avatar-336.jpg";
import portrait448 from "./assets/portrait-448.webp";
import portrait672 from "./assets/portrait-672.webp";
import portrait896 from "./assets/portrait-896.webp";
import portraitFallback from "./assets/portrait-672.jpg";
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



// Order matches t.about.steps / t.expertise.items
const processIcons: IconName[] = ["target", "search", "layers", "branch"];

const expertise = [
  { icon: "cloud" as const, tags: ["OCI", "AWS", "Azure", "GCP", "Huawei Cloud"] },
  { icon: "layers" as const, tags: ["Terraform", "Ansible", "Jenkins", "Kubernetes", "Podman"] },
  { icon: "code" as const, tags: ["Python", "TypeScript", "Bash", "PowerShell", "Java"] },
  { icon: "shield" as const, tags: ["Grafana", "Datadog", "Zabbix", "FortiGate", "Sophos"] },
];

// "Company | City" — order matches t.experience.jobs
const companies = [
  "CCM Soluções em Tecnologia | Ribeirão Preto - SP, Brasil",
  "Statum Tecnologia | Ribeirão Preto - SP, Brasil",
  "Senior Sistemas | Blumenau - SC, Brasil",
  "Pedra Agroindustrial | Serrana - SP, Brasil",
  "SMARAPD Informática | Ribeirão Preto - SP, Brasil",
].map((entry) => {
  const [name, city] = entry.split(" | ");
  return { name, city };
});

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
    [t.nav.about, "#sobre"],
    [t.nav.experience, "#experiencia"],
    [t.nav.projects, "#projetos"],
    [t.nav.expertise, "#competencias"],
    [t.nav.education, "#formacao"],
    [t.nav.contact, "#contato"],
  ];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.contact.whatsappMessage)}`;
  const socialLinks: { href: string; icon: IconName; label: string; external?: boolean }[] = [
    { href: LINKEDIN_URL, icon: "linkedin", label: "LinkedIn", external: true },
    { href: GITHUB_URL, icon: "github", label: "GitHub", external: true },
    { href: `mailto:${EMAIL}`, icon: "mail", label: "E-mail" },
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-space-950 text-ink">
      <div aria-hidden="true" className="page-glow pointer-events-none absolute inset-x-0 top-0 h-[40rem]" />

      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${scrolled || menuOpen ? "hairline bg-space-950/85 backdrop-blur-lg" : "border-transparent bg-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
          <a href="#inicio" onClick={() => setMenuOpen(false)} className="flex shrink-0 items-center gap-3" aria-label={t.nav.home}>
            <span className="logo-mark grid h-8 w-8 place-items-center rounded-lg font-display text-xs font-bold text-white">IR</span>
            <span className="hidden font-display text-[15px] font-semibold tracking-tight text-white sm:block">Igor Rodrigues</span>
          </a>
          <nav className="hidden items-center gap-1 lg:flex" aria-label={t.nav.mainLabel}>
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                aria-current={activeSection === href ? "location" : undefined}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${activeSection === href ? "text-white" : "text-white/55 hover:text-white"}`}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle language={language} onChange={changeLanguage} label={t.languageToggle} />
            <a href={resume.url} download={resume.fileName} className="btn-ghost hidden items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium md:flex">
              <Icon name="download" className="h-4 w-4" /> {t.downloadCv}
            </a>
            <button type="button" className="btn-ghost grid h-9 w-9 place-items-center rounded-lg lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu} aria-expanded={menuOpen} aria-controls="mobile-menu">
              <Icon name={menuOpen ? "x" : "menu"} className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-menu" className="hairline max-h-[calc(100dvh-4rem)] overflow-y-auto border-t bg-space-950 px-5 pb-6 pt-2 md:px-8 lg:hidden" aria-label={t.nav.mainLabel}>
            {navLinks.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} aria-current={activeSection === href ? "location" : undefined} className={`hairline flex items-center justify-between border-b py-4 text-base transition-colors ${activeSection === href ? "text-white" : "text-white/70 hover:text-white"}`}>
                {label}
                <Icon name="arrow" className="h-4 w-4 opacity-40" />
              </a>
            ))}
            <a href={resume.url} download={resume.fileName} onClick={() => setMenuOpen(false)} className="btn-ghost mt-6 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium md:hidden">
              <Icon name="download" className="h-4 w-4" /> {t.downloadCv}
            </a>
          </nav>
        )}
      </header>
      {menuOpen && <div className="fixed inset-0 z-40 bg-space-950/60 lg:hidden" onClick={() => setMenuOpen(false)} aria-hidden="true" />}

      <main className="relative">
        {/* ---------- Hero ---------- */}
        <section id="inicio" className="px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-44">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16">
            <div>
              <div className="reveal flex items-center gap-5 sm:gap-6">
                {/* Phones and tablets: face crop next to the role; desktop shows the full portrait in the card */}
                <picture className="shrink-0 lg:hidden">
                  <source type="image/webp" srcSet={`${avatar224} 224w, ${avatar336} 336w, ${avatar448} 448w`} sizes="(min-width: 640px) 160px, 128px" />
                  <img src={avatarFallback} alt={t.hero.photoAlt} width={160} height={160} fetchPriority="high" className="h-32 w-32 rounded-2xl object-cover shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)] ring-1 ring-white/10 sm:h-40 sm:w-40" />
                </picture>
                <div className="min-w-0">
                  <p className="font-display text-lg font-medium text-white/90">{t.experience.jobs[0].role}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/45">
                    <Icon name="map" className="h-3.5 w-3.5 shrink-0" /> {t.hero.location}
                  </p>
                </div>
              </div>
              <p className="reveal mt-10 text-sm font-medium text-accent" style={delay(40)}>{t.hero.greeting}</p>
              <h1 className="reveal mt-3 font-display text-[clamp(2.75rem,8vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.035em] text-white" style={delay(60)}>
                Igor Rodrigues
              </h1>
              <p className="reveal mt-4 max-w-xl font-display text-xl font-medium leading-snug text-white/80 sm:text-2xl" style={delay(120)}>
                {t.hero.headline}
              </p>
              <p className="reveal mt-6 max-w-xl text-lg leading-relaxed text-white/55" style={delay(180)}>
                {t.hero.description}
              </p>

              <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={delay(240)}>
                <a href="#projetos" className="btn-primary group inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold">
                  {t.hero.cta}
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a href={resume.url} download={resume.fileName} className="btn-ghost inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium">
                  <Icon name="download" className="h-4 w-4" /> {t.downloadCv}
                </a>
                <ul className="flex items-center gap-1 sm:ml-3">
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})} aria-label={link.label} title={link.label} className="grid h-10 w-10 place-items-center rounded-lg text-white/55 transition-colors hover:bg-white/5 hover:text-white">
                        <Icon name={link.icon} className="h-5 w-5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="reveal" style={delay(200)}>
              <ProfileCard copy={t.hero} />
            </div>
          </div>
        </section>

        {/* ---------- About ---------- */}
        <Section id="sobre">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
              <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-white/65">
                {t.about.paragraphs.map((paragraph, index) => (
                  <p key={index} className="reveal" style={delay(index * 60)}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="reveal text-sm font-medium text-white/45">{t.about.processTitle}</h3>
              <ol className="hairline mt-4 border-t">
                {t.about.steps.map((step, index) => (
                  <li key={step.title} className="reveal hairline flex gap-5 border-b py-6" style={delay(index * 70)}>
                    <span className="icon-ring grid h-10 w-10 shrink-0 place-items-center rounded-lg text-accent">
                      <Icon name={processIcons[index]} className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <p className="font-display font-semibold text-white">
                        <span className="mr-2 font-mono text-xs text-white/35">{String(index + 1).padStart(2, "0")}</span>
                        {step.title}
                      </p>
                      <p className="mt-1 leading-relaxed text-white/55">{step.caption}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Section>

        {/* ---------- Experience ---------- */}
        <Section id="experiencia">
          <SectionHeading eyebrow={t.nav.experience} title={t.experience.title} description={t.experience.description} />
          <ol className="hairline mt-12 border-t">
            {t.experience.jobs.map((job, index) => {
              const company = companies[index];
              return (
                <li key={company.name} className="reveal hairline grid gap-2 border-b py-8 md:grid-cols-[13rem_1fr] md:gap-10" style={delay(index * 60)}>
                  <div className="flex items-center gap-3 md:block">
                    <p className="font-mono text-xs uppercase tracking-wider text-white/45">{job.date}</p>
                    {index === 0 && <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent md:mt-3 md:inline-block">{t.experience.current}</span>}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{job.role}</h3>
                    <p className="mt-1 text-sm text-white/50">
                      <span className="text-white/75">{company.name}</span> · {company.city}
                    </p>
                    <p className="mt-3 max-w-2xl leading-relaxed text-white/60">{job.summary}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="reveal mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-soft">
            <Icon name="linkedin" className="h-4 w-4" /> {t.experience.linkedin} <Icon name="external" className="h-3.5 w-3.5" />
          </a>
        </Section>

        {/* ---------- Projects ---------- */}
        <Section id="projetos">
          <SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title} description={t.projects.description} />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {t.projects.items.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                featured={index === 0}
                featuredLabel={t.projects.featured}
                viewDetails={t.projects.viewDetails}
                diagram={t.projects.diagram}
                onOpen={() => setOpenProject(index)}
              />
            ))}
          </div>
        </Section>

        {/* ---------- Skills ---------- */}
        <Section id="competencias">
          <SectionHeading eyebrow={t.nav.expertise} title={t.expertise.title} description={t.expertise.description} />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {expertise.map((item, index) => (
              <article key={item.icon} className="reveal surface flex flex-col rounded-xl p-6 sm:p-7" style={delay((index % 2) * 80)}>
                <div className="flex items-center gap-4">
                  <span className="icon-ring grid h-10 w-10 shrink-0 place-items-center rounded-lg text-accent">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">{t.expertise.items[index].title}</h3>
                </div>
                <p className="mt-4 leading-relaxed text-white/60">{t.expertise.items[index].description}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {item.tags.map((tag) => (
                    <li key={tag} className="tag">{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        {/* ---------- Education & certifications ---------- */}
        <Section id="formacao">
          <SectionHeading eyebrow={t.education.eyebrow} title={t.education.title} description={t.education.description} />
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h3 className="reveal text-sm font-medium text-white/45">{t.education.certificationsTitle}</h3>
              <ul className="hairline mt-4 border-t">
                {certifications.map(([name, issuer, year], index) => (
                  <li key={name} className="reveal hairline flex items-center gap-4 border-b py-4" style={delay(index * 40)}>
                    <span className="icon-ring grid h-9 w-9 shrink-0 place-items-center rounded-lg text-accent">
                      <Icon name="check" className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white">{name}</p>
                      <p className="text-sm text-white/45">{issuer}</p>
                    </div>
                    <span className="font-mono text-xs text-white/40">{year}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid content-start gap-5">
              <div className="reveal surface rounded-xl p-6">
                <h3 className="text-sm font-medium text-white/45">{t.education.degreeTitle}</h3>
                <p className="mt-3 font-display text-xl font-semibold text-white">{t.education.degree}</p>
                <p className="mt-1 text-white/60">Centro Universitário Moura Lacerda</p>
                <p className="mt-3 font-mono text-xs text-white/40">2017 — 2020</p>
              </div>
              <div className="reveal surface rounded-xl p-6" style={delay(80)}>
                <h3 className="text-sm font-medium text-white/45">{t.education.languagesTitle}</h3>
                <dl className="mt-3">
                  {t.education.languages.map((item) => (
                    <div key={item.name} className="hairline flex items-center justify-between gap-4 border-b py-3 last:border-b-0 last:pb-0">
                      <dt className="font-medium text-white">{item.name}</dt>
                      <dd className="text-sm text-white/55">{item.level}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Section>

        {/* ---------- Contact ---------- */}
        <Section id="contato">
          <div className="reveal surface grid gap-10 rounded-2xl p-7 sm:p-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:p-14">
            <div>
              <p className="text-sm font-medium text-accent">{t.contact.eyebrow}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {t.contact.titleStart} {t.contact.titleHighlight}
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-white/60">{t.contact.description}</p>
            </div>
            <div className="grid gap-3">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-semibold">
                <Icon name="whatsapp" className="h-4 w-4" /> {t.contact.whatsapp}
              </a>
              <a href={`mailto:${EMAIL}`} className="btn-ghost inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-medium">
                <Icon name="mail" className="h-4 w-4" /> {t.contact.send}
              </a>
              <button type="button" onClick={copyEmail} className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm text-white/55 transition-colors hover:text-white" aria-live="polite">
                <Icon name={copyState === "copied" ? "check" : "copy"} className="h-4 w-4" />
                {copyState === "copied" ? t.contact.copied : copyState === "failed" ? t.contact.copyFailed : `${t.contact.copy} · ${EMAIL}`}
              </button>
            </div>
          </div>
        </Section>
      </main>

      <footer className="hairline border-t px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Igor Rodrigues | {t.footer.credit}
          </p>
          <ul className="flex items-center gap-1">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})} aria-label={link.label} title={link.label} className="grid h-9 w-9 place-items-center rounded-lg transition-colors hover:bg-white/5 hover:text-white">
                  <Icon name={link.icon} className="h-4.5 w-4.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>

      {openProject !== null && (
        <ProjectModal
          project={t.projects.items[openProject]}
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
        className={`back-to-top btn-ghost fixed right-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-space-900/90 text-white/75 backdrop-blur-md transition duration-300 sm:right-6 ${showBackToTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <Icon name="arrowUp" className="h-5 w-5" />
      </button>
    </div>
  );
}

function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-16 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="reveal text-sm font-medium text-accent">{eyebrow}</p>
      <h2 className="reveal mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl" style={delay(60)}>
        {title}
      </h2>
      {description && (
        <p className="reveal mt-4 text-[17px] leading-relaxed text-white/55" style={delay(120)}>
          {description}
        </p>
      )}
    </div>
  );
}

// Résumé-style summary next to the hero headline
function ProfileCard({ copy }: { copy: Dictionary["hero"] }) {
  const { profile, photoAlt } = copy;
  const stats = [
    { value: "8+", label: copy.years },
    { value: "5", label: copy.providers },
    { value: String(certifications.length), label: copy.certifications },
  ];
  const rows = [
    { label: profile.company, value: companies[0].name },
    { label: profile.topCert, value: certifications[0][0] },
  ];

  return (
    <aside aria-label={profile.label} className="surface mx-auto w-full max-w-md overflow-hidden rounded-2xl lg:ml-auto">
      <picture className="hidden p-2 pb-0 lg:block">
        <source type="image/webp" srcSet={`${portrait448} 448w, ${portrait672} 672w, ${portrait896} 896w`} sizes="448px" />
        <img src={portraitFallback} alt={photoAlt} width={448} height={448} loading="lazy" className="aspect-square w-full rounded-xl object-cover" />
      </picture>

      <dl className="hairline grid grid-cols-3 border-b lg:mt-2 lg:border-t">
        {stats.map((stat, index) => (
          <div key={stat.label} className={`hairline px-4 py-4 ${index > 0 ? "border-l" : ""}`}>
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="block font-display text-2xl font-semibold text-white">{stat.value}</span>
              <span className="mt-0.5 block text-xs leading-snug text-white/45">{stat.label}</span>
            </dd>
          </div>
        ))}
      </dl>

      <dl className="space-y-4 p-6">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs text-white/40">{row.label}</dt>
            <dd className="mt-0.5 text-sm text-white/85">{row.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

type ProjectsCopy = Dictionary["projects"];
type DiagramCopy = ProjectsCopy["diagram"];

function ProjectCard({
  project,
  featured,
  featuredLabel,
  viewDetails,
  diagram,
  onOpen,
}: {
  project: Project;
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
      className={`reveal surface surface-hover group relative flex flex-col rounded-xl p-6 sm:p-8 ${
        featured ? "lg:col-span-2 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 lg:p-10" : ""
      }`}
    >
      <div className="flex flex-col">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-white/45">{project.category}</span>
          {featured && <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">{featuredLabel}</span>}
        </div>
        <h3 className={`mt-4 font-display font-semibold leading-snug tracking-tight text-white ${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>{project.title}</h3>
        <p className="mt-4 leading-relaxed text-white/60">{project.summary}</p>

        <dl className={`hairline mt-8 grid gap-4 border-t pt-6 ${featured ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3"}`}>
          {project.highlights.map((highlight) => (
            <div key={highlight.label}>
              <dt className="sr-only">{highlight.label}</dt>
              <dd>
                <span className="block font-display text-xl font-semibold text-white">{highlight.value}</span>
                <span className="mt-1 block text-xs leading-snug text-white/45">{highlight.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {visibleTags.map((tag) => (
            <li key={tag} className="tag">{tag}</li>
          ))}
          {hiddenTags > 0 && <li className="tag text-white/45">+{hiddenTags}</li>}
        </ul>

        <div className="mt-auto pt-8">
          {/* The ::after overlay stretches the button over the whole card, so the card is one click target */}
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent after:absolute after:inset-0 after:z-10 after:rounded-xl after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent"
          >
            {viewDetails}
            <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {featured && <DiagramPreview diagram={diagram} />}
    </article>
  );
}

// Miniature of the architecture for the featured card; the full diagram lives in the modal
function DiagramPreview({ diagram }: { diagram: DiagramCopy }) {
  const zone = "rounded-lg border px-4 py-3.5";
  const label = "text-xs font-medium";
  return (
    <div aria-hidden="true" className="relative mt-10 hidden flex-col justify-center gap-1 sm:flex lg:mt-0">
      <div className={`${zone} border-dashed border-white/15 bg-white/2`}>
        <p className={`${label} text-white/50`}>{diagram.onPrem}</p>
      </div>
      <PreviewLink labels={diagram.links} />
      <div className={`${zone} border-accent/35 bg-accent/6`}>
        <p className={`${label} text-accent`}>{diagram.primary}</p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-white/70">
          {[diagram.edge, diagram.app, diagram.data].map((tier) => <span key={tier} className="rounded-md border border-white/8 bg-space-950/60 px-2 py-2.5 text-center leading-tight">{tier}</span>)}
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
      <span className="h-7 w-px bg-white/15" />
      <span className="truncate font-mono text-[10px] text-white/40">{labels.join(" · ")}</span>
    </div>
  );
}

function ProjectModal({
  project,
  copy,
  talkToMe,
  showDiagram,
  onClose,
}: {
  project: Project;
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
        <div className="min-w-0">
          <p className="text-sm text-white/45">{project.category}</p>
          <h2 id="project-modal-title" className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">{project.title}</h2>
        </div>
        <button type="button" onClick={close} aria-label={copy.close} title={copy.close} className="btn-ghost grid h-10 w-10 shrink-0 place-items-center rounded-lg">
          <Icon name="x" />
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="grid gap-10 px-5 py-8 sm:px-8 sm:py-10">
          <p className="max-w-3xl text-lg leading-relaxed text-white/70">{project.summary}</p>

          <dl className="surface grid grid-cols-2 overflow-hidden rounded-xl sm:grid-cols-4" aria-label={labels.highlights}>
            {project.highlights.map((highlight, highlightIndex) => (
              <div key={highlight.label} className={`hairline p-4 sm:p-5 ${highlightIndex % 2 === 1 ? "border-l" : ""} ${highlightIndex >= 2 ? "border-t sm:border-t-0" : ""} ${highlightIndex > 0 ? "sm:border-l" : ""}`}>
                <dt className="sr-only">{highlight.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold tracking-tight">{highlight.value}</span>
                  <span className="mt-1 block text-xs leading-snug text-white/45">{highlight.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <ModalSection title={labels.gains}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.gains.map((gain) => (
                <li key={gain.title} className="surface flex gap-4 rounded-xl p-5">
                  <span className="icon-ring grid h-9 w-9 shrink-0 place-items-center rounded-full text-accent"><Icon name="check" className="h-4 w-4" /></span>
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
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
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
                    <span className="surface flex items-center gap-3 rounded-full py-2 pl-2 pr-4 text-sm font-medium text-white">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-accent/20 font-mono text-[10px] text-accent">{stepIndex + 1}</span>
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
                  <div key={row.after} className="surface grid overflow-hidden rounded-xl sm:grid-cols-2">
                    <div className="p-4 sm:p-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">{labels.before}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/50">{row.before}</p>
                    </div>
                    <div className="hairline border-t bg-accent/8 p-4 sm:border-l sm:border-t-0 sm:p-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{labels.after}</p>
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
              {project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </ModalSection>

          <div className="surface flex flex-col gap-4 rounded-xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="font-display text-lg font-semibold tracking-tight text-white">{labels.cta}</p>
            <a href="#contato" onClick={close} className="btn-primary inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold">
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
      <h3 className="text-sm font-medium text-white/45">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

// Laid out with HTML instead of a fixed-size image so it reflows to a single column on phones
function ArchitectureDiagram({ diagram }: { diagram: DiagramCopy }) {
  return (
    <figure>
      <div className="rounded-xl border border-dashed border-white/15 bg-white/2 p-4 sm:p-5">
        <ZoneTitle>{diagram.onPrem}</ZoneTitle>
        <ChipRow items={diagram.onPremItems} />
      </div>

      <DiagramLink labels={diagram.links} />

      <div className="rounded-xl border border-accent/35 bg-accent/6 p-4 sm:p-5">
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

      <div className="rounded-xl border border-white/12 bg-white/3 p-4 sm:p-5">
        <ZoneTitle>{diagram.dr}</ZoneTitle>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {diagram.drItems.map((item) => <Chip key={item}>{item}</Chip>)}
        </div>
        <p className="mt-4 flex items-start gap-2 text-sm font-medium text-accent">
          <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0" />
          {diagram.fsdr}
        </p>
      </div>

      <figcaption className="mt-4 text-xs leading-relaxed text-white/40">{diagram.caption}</figcaption>
    </figure>
  );
}

function ZoneTitle({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return <p className={`font-mono text-[11px] font-medium uppercase tracking-[0.16em] ${accent ? "text-accent" : "text-white/50"}`}>{children}</p>;
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
          <span key={label} className={`rounded-full px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wider ${accent ? "border border-accent/40 bg-accent/12 text-accent" : "bg-white/5 text-white/55"}`}>
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
    <div role="group" aria-label={label} className="relative grid grid-cols-2 rounded-lg border border-white/12 p-0.5 font-mono text-[11px] font-medium uppercase">
      <span
        aria-hidden="true"
        className={`language-thumb absolute inset-y-0.5 left-0.5 w-9 rounded-md bg-white/10 transition-transform duration-200 ease-out ${language === "en" ? "translate-x-full" : "translate-x-0"}`}
      />
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={language === option}
          title={language === option ? undefined : label}
          className={`relative z-10 h-8 w-9 rounded-md tracking-wider transition-colors duration-200 ${language === option ? "text-white" : "text-white/45 hover:text-white"}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default App;
