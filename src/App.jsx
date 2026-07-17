import { useEffect, useMemo, useRef, useState } from "react";
import {
  Article,
  ArrowRight,
  ArrowUp,
  At,
  BracketsCurly,
  CaretDown,
  CheckCircle,
  Circle,
  ClockCounterClockwise,
  Cloud,
  Command,
  Cube,
  FileText,
  FolderOpen,
  GearSix,
  GitBranch,
  GithubLogo,
  Image as ImageIcon,
  List,
  MagnifyingGlass,
  MapPin,
  Stack,
  User,
  X,
} from "@phosphor-icons/react";

const sections = [
  { id: "profile", label: "Profile", file: "profile.md", icon: User },
  {
    id: "experience",
    label: "Experience",
    file: "experience.log",
    icon: ClockCounterClockwise,
  },
  { id: "projects", label: "Projects", file: "projects.json", icon: Cube },
  { id: "contact", label: "Contact", file: "contact.txt", icon: At },
];

const experience = [
  {
    index: "01",
    role: "Cloud Engineer",
    company: "Okestro",
    description:
      "OpenStack과 Ceph를 중심으로 프라이빗 클라우드 환경을 다루고, Kubernetes 기반 플랫폼과 운영 자동화 흐름을 설계합니다.",
    tags: ["OpenStack", "Ceph", "Kubernetes"],
  },
  {
    index: "02",
    role: "Current Focus",
    company: "Cloud Platform Engineering",
    description:
      "반복 가능한 인프라, 명확한 운영 기준, 장애를 빠르게 읽을 수 있는 관찰 가능성을 하나의 엔지니어링 시스템으로 연결합니다.",
    tags: ["Terraform", "Ansible", "Observability"],
  },
];

const projects = [
  {
    id: "private-cloud",
    spec: "SPEC: 001 / PLATFORM",
    title: "Private Cloud Platform",
    description:
      "컴퓨트·스토리지·오케스트레이션 계층을 함께 설계해 확장 가능한 프라이빗 클라우드 기반을 구성하는 프로젝트입니다.",
    image: "/assets/projects/cache-architecture.png",
    imageAlt: "서비스와 클러스터 계층이 연결된 프라이빗 클라우드 아키텍처 다이어그램",
    fit: "contain",
    tags: ["OpenStack", "Ceph", "Kubernetes"],
    details: ["서비스 계층과 인프라 경계 정의", "고가용성 구성과 장애 도메인 검토", "운영자가 읽기 쉬운 구조 문서화"],
  },
  {
    id: "cloud-operations",
    spec: "SPEC: 002 / OPERATIONS",
    title: "Cloud Operations Console",
    description:
      "클라우드 상태를 한눈에 파악하고 반복 작업을 줄일 수 있도록 운영 지표와 자동화 흐름을 연결한 콘솔 프로젝트입니다.",
    image: "/assets/projects/realtime-dashboard.png",
    imageAlt: "처리량과 지연 시간, 시스템 상태를 보여주는 클라우드 운영 대시보드",
    fit: "cover",
    tags: ["Terraform", "Ansible", "Monitoring"],
    details: ["핵심 운영 지표 우선순위 설계", "반복 프로비저닝 작업 자동화", "상태 변화와 실행 기록의 추적성 확보"],
  },
];

const rolePhrase = "클라우드 & 인프라 엔지니어";

function TypewriterRole() {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(motionPreference.matches);

    motionPreference.addEventListener("change", updateMotionPreference);
    return () => motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setDisplayedText(rolePhrase);
      setIsDeleting(false);
      return undefined;
    }

    let delay = isDeleting ? 42 : 76;
    let updateText;

    if (!isDeleting && displayedText === rolePhrase) {
      delay = 1450;
      updateText = () => setIsDeleting(true);
    } else if (isDeleting && displayedText === "") {
      delay = 280;
      updateText = () => setIsDeleting(false);
    } else {
      updateText = () => {
        const nextLength = displayedText.length + (isDeleting ? -1 : 1);
        setDisplayedText(rolePhrase.slice(0, nextLength));
      };
    }

    const timeout = window.setTimeout(updateText, delay);
    return () => window.clearTimeout(timeout);
  }, [displayedText, isDeleting, reduceMotion]);

  return <span className="typing-role" aria-hidden="true">{displayedText}</span>;
}

function WindowControls() {
  return (
    <span className="window-controls" aria-hidden="true">
      <Circle weight="fill" className="control control-red" />
      <Circle weight="fill" className="control control-yellow" />
      <Circle weight="fill" className="control control-green" />
    </span>
  );
}

function SectionLink({ section, active, onNavigate }) {
  const Icon = section.icon;

  return (
    <a
      className={`file-link ${active ? "is-active" : ""}`}
      href={`#${section.id}`}
      aria-current={active ? "location" : undefined}
      onClick={(event) => onNavigate(event, section.id)}
    >
      <Icon weight={active ? "fill" : "regular"} aria-hidden="true" />
      <span>{section.label}</span>
      <span className="file-extension">{section.file.split(".").at(-1)}</span>
    </a>
  );
}

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="project-card">
      <div className="project-heading">
        <div>
          <p className="eyebrow">{project.spec}</p>
          <h3>{project.title}</h3>
        </div>
        <span className="status-chip">
          <CheckCircle weight="fill" aria-hidden="true" />
          Documented
        </span>
      </div>

      <figure className="project-figure">
        <figcaption>
          <span><ImageIcon aria-hidden="true" /> preview.png</span>
          <span className="figure-format">16:10</span>
        </figcaption>
        <div className="project-image-wrap">
          <img
            className={`project-image project-image-${project.fit}`}
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
          />
        </div>
      </figure>

      <div className="project-body">
        <p>{project.description}</p>
        <ul className="tag-list" aria-label={`${project.title} 기술 스택`}>
          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <button
          className="detail-button"
          type="button"
          aria-expanded={expanded}
          aria-controls={`${project.id}-details`}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "검토 포인트 닫기" : "검토 포인트 보기"}
          <ArrowRight className={expanded ? "is-rotated" : ""} weight="bold" aria-hidden="true" />
        </button>
        <div id={`${project.id}-details`} className="project-details" hidden={!expanded}>
          <ul>
            {project.details.map((detail) => (
              <li key={detail}><CheckCircle weight="fill" aria-hidden="true" />{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function App() {
  const editorRef = useRef(null);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const paletteTriggerRef = useRef(null);
  const firstPaletteOptionRef = useRef(null);
  const menuWasOpenRef = useRef(false);
  const paletteWasOpenRef = useRef(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const activeMeta = useMemo(
    () => sections.find((section) => section.id === activeSection) ?? sections[0],
    [activeSection],
  );

  const navigateTo = (event, id) => {
    event?.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveSection(id);
    setMenuOpen(false);
    setPaletteOpen(false);
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const update = () => setIsCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isCompact) {
      menuWasOpenRef.current = false;
      return;
    }
    if (menuOpen) {
      window.requestAnimationFrame(() => sidebarRef.current?.querySelector("a")?.focus());
    } else if (menuWasOpenRef.current) {
      menuButtonRef.current?.focus();
    }
    menuWasOpenRef.current = menuOpen;
  }, [isCompact, menuOpen]);

  useEffect(() => {
    if (paletteOpen) {
      window.requestAnimationFrame(() => firstPaletteOptionRef.current?.focus());
    } else if (paletteWasOpenRef.current) {
      paletteTriggerRef.current?.focus();
    }
    paletteWasOpenRef.current = paletteOpen;
  }, [paletteOpen]);

  useEffect(() => {
    if (!paletteOpen) return undefined;
    const trapFocus = (event) => {
      if (event.key !== "Tab") return;
      const options = [...document.querySelectorAll(".palette-options button")];
      if (!options.length) return;
      const first = options[0];
      const last = options.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", trapFocus);
    return () => window.removeEventListener("keydown", trapFocus);
  }, [paletteOpen]);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return undefined;

    const updateScrollState = () => {
      const maxScroll = editor.scrollHeight - editor.clientHeight;
      setScrollProgress(maxScroll > 0 ? Math.round((editor.scrollTop / maxScroll) * 100) : 0);

      const anchor = editor.getBoundingClientRect().top + Math.min(180, editor.clientHeight * 0.28);
      let current = sections[0].id;
      sections.forEach(({ id }) => {
        const node = document.getElementById(id);
        if (node && node.getBoundingClientRect().top <= anchor) current = id;
      });
      setActiveSection(current);
    };

    editor.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => editor.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const initial = window.location.hash.slice(1);
    if (sections.some(({ id }) => id === initial)) {
      window.requestAnimationFrame(() => {
        document.getElementById(initial)?.scrollIntoView({ block: "start" });
      });
    }
  }, []);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#profile" onClick={(event) => navigateTo(event, "profile")}>
        본문으로 바로가기
      </a>

      <header className="titlebar">
        <div className="titlebar-left">
          <WindowControls />
          <button
            ref={menuButtonRef}
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? "사이드바 닫기" : "사이드바 열기"}
            aria-expanded={menuOpen}
            aria-controls="portfolio-sidebar"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
          </button>
          <span className="app-name"><BracketsCurly weight="bold" aria-hidden="true" /> DevConsole</span>
        </div>

        <button
          ref={paletteTriggerRef}
          className="command-button"
          type="button"
          aria-label="포트폴리오 탐색 열기"
          onClick={() => setPaletteOpen(true)}
        >
          <MagnifyingGlass aria-hidden="true" />
          <span>포트폴리오 탐색</span>
          <kbd>⌘ K</kbd>
        </button>

        <div className="titlebar-actions" aria-label="애플리케이션 상태">
          <span className="saved-state"><CheckCircle weight="fill" aria-hidden="true" /> Saved</span>
          <GearSix aria-hidden="true" />
        </div>
      </header>

      <div className="workspace">
        <div
          className={`sidebar-backdrop ${menuOpen ? "is-visible" : ""}`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        <aside
          id="portfolio-sidebar"
          ref={sidebarRef}
          className={`sidebar ${menuOpen ? "is-open" : ""}`}
          aria-label="포트폴리오 섹션 탐색"
          aria-hidden={isCompact && !menuOpen ? true : undefined}
          inert={isCompact && !menuOpen}
        >
          <div className="sidebar-heading">
            <span>EXPLORER</span>
            <span aria-hidden="true">•••</span>
          </div>

          <div className="folder-row">
            <CaretDown weight="bold" aria-hidden="true" />
            <FolderOpen weight="fill" aria-hidden="true" />
            <span>JAEHWAN_PORTFOLIO</span>
          </div>

          <nav className="file-tree" aria-label="페이지 내 이동">
            {sections.map((section) => (
              <SectionLink
                key={section.id}
                section={section}
                active={activeSection === section.id}
                onNavigate={navigateTo}
              />
            ))}
          </nav>

          <div className="sidebar-spacer" />

          <div className="outline-panel">
            <div className="outline-title"><CaretDown weight="bold" aria-hidden="true" /> OUTLINE</div>
            <p>김재환</p>
            <span>Cloud &amp; Infrastructure Engineer</span>
          </div>

          <div className="scroll-status">
            <div className="scroll-status-label"><span>SCROLL</span><strong>{scrollProgress}%</strong></div>
            <div className="scroll-track" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>
            <a href="#profile" onClick={(event) => navigateTo(event, "profile")}>
              <ArrowUp weight="bold" aria-hidden="true" /> 맨 위로
            </a>
          </div>
        </aside>

        <main className="editor-pane" aria-label="김재환 포트폴리오">
          <div className="editor-tabbar">
            <div className="editor-tab is-active">
              <activeMeta.icon weight="fill" aria-hidden="true" />
              <span>{activeMeta.file}</span>
              <span className="tab-dot" aria-label="저장됨">●</span>
            </div>
            <div className="editor-breadcrumb">
              JAEHWAN_PORTFOLIO <span>›</span> {activeMeta.label}
            </div>
          </div>

          <div className="editor-scroll" ref={editorRef}>
            <section id="profile" className="editor-section profile-section" aria-labelledby="profile-title">
              <LineRail start={1} count={26} />
              <div className="section-content profile-grid">
                <div className="profile-copy">
                  <p className="terminal-prompt"><span>root@devconsole</span>:~$ ./whoami.sh</p>
                  <p className="eyebrow">PROFILE / CLOUD INFRASTRUCTURE</p>
                  <h1 id="profile-title" aria-label="김재환 — 클라우드 & 인프라 엔지니어">
                    김재환
                    <TypewriterRole />
                  </h1>
                  <p className="hero-description">
                    복잡한 인프라를 안정적으로 운영 가능한 플랫폼으로 바꿉니다.
                  </p>
                  <ul className="tag-list hero-tags" aria-label="핵심 기술">
                    <li>OpenStack</li><li>Ceph</li><li>Kubernetes</li><li>Terraform</li><li>Ansible</li>
                  </ul>
                  <div className="profile-links" aria-label="외부 프로필 링크">
                    <a
                      className="profile-link"
                      href="https://github.com/jaehwan01101"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="김재환 GitHub 새 탭에서 열기"
                    >
                      <GithubLogo weight="fill" aria-hidden="true" />
                      <span>GitHub</span>
                    </a>
                    <a
                      className="profile-link"
                      href="https://velog.io/@o980204/posts"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="김재환 블로그 새 탭에서 열기"
                    >
                      <Article weight="bold" aria-hidden="true" />
                      <span>Blog</span>
                    </a>
                  </div>
                </div>

                <figure className="profile-file">
                  <figcaption><ImageIcon aria-hidden="true" /> profile-jaehwan.jpg <span>398 × 512</span></figcaption>
                  <div className="portrait-wrap">
                    <img src="/assets/profile-jaehwan.jpg" alt="김재환 프로필 사진" />
                  </div>
                  <p><span>ROLE</span> Cloud &amp; Infrastructure Engineer</p>
                  <p><span>BASE</span> Seoul, South Korea</p>
                </figure>
              </div>
            </section>

            <section id="experience" className="editor-section experience-section" aria-labelledby="experience-title">
              <LineRail start={27} count={26} />
              <div className="section-content">
                <div className="section-heading">
                  <div><p className="eyebrow">EXPERIENCE.LOG</p><h2 id="experience-title">운영을 이해하는 플랫폼 엔지니어링</h2></div>
                  <span className="section-command">$ tail -f experience.log</span>
                </div>
                <div className="timeline">
                  {experience.map((item) => (
                    <article className="timeline-item" key={item.index}>
                      <div className="timeline-index"><span>{item.index}</span></div>
                      <div className="timeline-copy">
                        <p className="timeline-role">{item.role}</p>
                        <h3>{item.company}</h3>
                        <p>{item.description}</p>
                        <ul className="tag-list" aria-label={`${item.company} 관련 기술`}>
                          {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="projects" className="editor-section projects-section" aria-labelledby="projects-title">
              <LineRail start={53} count={34} />
              <div className="section-content">
                <div className="section-heading">
                  <div><p className="eyebrow">PROJECTS.JSON</p><h2 id="projects-title">설계가 보이는 프로젝트</h2></div>
                  <span className="section-command">2 objects loaded</span>
                </div>
                <div className="project-grid">
                  {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
                </div>
              </div>
            </section>

            <section id="contact" className="editor-section contact-section" aria-labelledby="contact-title">
              <LineRail start={87} count={22} />
              <div className="section-content contact-grid">
                <div>
                  <p className="terminal-prompt"><span>visitor@portfolio</span>:~$ open contact.txt</p>
                  <p className="eyebrow">CONTACT / NEXT STEP</p>
                  <h2 id="contact-title">더 나은 클라우드 운영을 함께 이야기해요.</h2>
                  <p>새로운 플랫폼, 인프라 자동화, 운영 경험에 대한 대화를 환영합니다.</p>
                </div>
                <div className="contact-card">
                  <p className="contact-status"><CheckCircle weight="fill" aria-hidden="true" /> Available for conversation</p>
                  <dl>
                    <div><dt><MapPin aria-hidden="true" /> Location</dt><dd>Seoul, South Korea</dd></div>
                    <div><dt><Command aria-hidden="true" /> Contact channel</dt><dd>Available on request</dd></div>
                  </dl>
                  <p className="contact-note">실제 이메일이나 링크가 제공되면 이 영역에 바로 연결할 수 있습니다.</p>
                  <a className="top-button" href="#profile" onClick={(event) => navigateTo(event, "profile")}>
                    <ArrowUp weight="bold" aria-hidden="true" /> 프로필로 돌아가기
                  </a>
                </div>
              </div>
            </section>
          </div>

          <div className="terminal-drawer">
            <span><CaretDown weight="bold" aria-hidden="true" /> TERMINAL</span>
            <span className="terminal-output">portfolio.log — viewing /{activeSection}</span>
          </div>
        </main>
      </div>

      <footer className="statusbar">
        <span><GitBranch weight="bold" aria-hidden="true" /> main*</span>
        <span><CheckCircle weight="fill" aria-hidden="true" /> 0 errors</span>
        <span className="statusbar-spacer" />
        <span>{activeMeta.file}</span>
        <span>UTF-8</span>
        <span><Cloud weight="fill" aria-hidden="true" /> Seoul</span>
      </footer>

      {paletteOpen && (
        <div className="palette-layer" role="presentation" onMouseDown={() => setPaletteOpen(false)}>
          <div className="command-palette" role="dialog" aria-modal="true" aria-labelledby="palette-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="palette-input"><MagnifyingGlass aria-hidden="true" /><span id="palette-title">이동할 섹션을 선택하세요</span><kbd>ESC</kbd></div>
            <div className="palette-options">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    ref={index === 0 ? firstPaletteOptionRef : undefined}
                    type="button"
                    onClick={(event) => navigateTo(event, section.id)}
                  >
                    <Icon weight="fill" aria-hidden="true" /><span>{section.label}<small>{section.file}</small></span><span>↵</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LineRail({ start, count }) {
  return (
    <span className="line-number-rail" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => <span key={start + index}>{start + index}</span>)}
    </span>
  );
}
