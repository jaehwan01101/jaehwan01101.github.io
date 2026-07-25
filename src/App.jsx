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
    label: "Journey",
    file: "journey.log",
    icon: ClockCounterClockwise,
  },
  { id: "projects", label: "Projects", file: "projects.json", icon: Cube },
  { id: "contact", label: "Contact", file: "contact.txt", icon: At },
];

const experience = [
  {
    index: "01",
    role: "2024.06 — 2024.12 / 현장실습",
    company: "씨드젠 · 개인정보 처리방침 평가제 업무 지원",
    description:
      "개인정보보호위원회·KISA 협업 사업에서 국민생활 밀접 49개 기업의 처리방침을 검토했습니다. 26개 항목·42개 지표를 기준으로 기초자료와 평가 소견을 정리하며 보안 판단 기준과 문서화 방식을 익혔습니다.",
    tags: ["Privacy", "Security Review", "Documentation"],
  },
  {
    index: "02",
    role: "2025.12 — 2026.07 / 교육",
    company: "메가존클라우드 IT Bootcamp · Solution Architect",
    description:
      "Linux·Network·DB 기초부터 Docker, Kubernetes, AWS, GCP까지 학습하고 온프레미스 및 클라우드 아키텍처 프로젝트를 수행했습니다. 구축 자체보다 가용성·확장성·보안·복구 가능성을 함께 검토하는 운영 관점을 쌓았습니다.",
    tags: ["AWS", "Kubernetes", "Network", "GCP"],
  },
  {
    index: "03",
    role: "2018.03 — 2026.08 / 졸업 예정",
    company: "가천대학교 · 유럽어문학과 / 소프트웨어 복수전공",
    description:
      "소프트웨어 복수전공과 클라우드 인프라 교육을 연결해 기술 기반을 확장했습니다. 리눅스마스터 2급을 취득했고 정보처리기사 필기 합격 후 실기와 AWS SAA를 준비하고 있습니다.",
    tags: ["Software", "리눅스마스터 2급", "정보처리기사 필기"],
  },
];

const projects = [
  {
    id: "securevoice",
    spec: "PROJECT: 01 / 2026.05 — 2026.07",
    title: "SecureVoiceGuard AWS 전환",
    description:
      "AI 음성 위변조 탐지 서비스의 단일 서버 구조를 AWS 관리형 서비스 기반으로 재설계한 5인 프로젝트입니다. DB 인프라 고도화와 운영 체계를 담당했습니다.",
    image: "/assets/projects/securevoice-architecture.png",
    imageAlt: "SecureVoiceGuard의 CloudFront, ECS Fargate, SQS, RDS 기반 AWS 아키텍처",
    fit: "contain",
    tags: ["AWS", "RDS MySQL", "RDS Proxy", "Terraform", "CloudWatch"],
    metrics: [
      { value: "1분 내", label: "Multi-AZ RTO" },
      { value: "거의 0", label: "RPO" },
      { value: "5명", label: "Team" },
    ],
    details: [
      "사용자 트래픽과 요구사항을 기준으로 RDS 스펙과 확장 방향을 산정",
      "RDS MySQL Multi-AZ, RDS Proxy, 자동 백업·PITR 기반 장애 대응 구조 설계",
      "Secrets Manager·TLS·SSM으로 DB 계정과 관리자 접근 경로 보안 강화",
      "CloudWatch 지표·Slack 알람·복구 Runbook으로 관측과 대응 절차 문서화",
      "Terraform을 persistent/runtime 계층으로 분리하고 S3 state 기반 협업 구조 정리",
    ],
  },
  {
    id: "onprem-ticketing",
    spec: "PROJECT: 02 / 2026.03.01 — 2026.03.16",
    title: "OnPremises-MZC 티켓팅 인프라",
    description:
      "명절 예매 트래픽을 가정한 5인 Kubernetes 인프라 프로젝트입니다. 오토스케일링, 서비스 안정성, 설정 분리, 캐시와 영속 스토리지를 담당했습니다.",
    image: "/assets/projects/onprem-hpa.png",
    imageAlt: "JMeter 부하에 따라 Kubernetes Pod가 자동 확장되는 HPA 검증 결과",
    fit: "contain",
    tags: ["Kubernetes", "HPA", "Redis", "Longhorn", "JMeter"],
    metrics: [
      { value: "2 → 10", label: "Pods" },
      { value: "210 → 8ms", label: "응답 시간" },
      { value: "1,200 → 72", label: "MySQL QPS" },
    ],
    details: [
      "Metrics Server와 HPA를 구성해 JMeter 부하 시 Pod 자동 확장·축소 흐름 검증",
      "Liveness·Readiness Probe와 Rolling Update로 자가 치유와 무중단 배포 기반 구성",
      "ConfigMap·Secret으로 일반 설정과 민감정보를 컨테이너 이미지에서 분리",
      "Redis Cache-Aside 패턴으로 조회 부하와 응답 시간을 개선",
      "Redis StatefulSet에 Longhorn PVC를 연결해 Pod 재생성 후 데이터 유지 검증",
    ],
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
          <span className="figure-format">16:9</span>
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
        <dl className="project-metrics" aria-label={`${project.title} 검증 수치`}>
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.value}</dt>
              <dd>{metric.label}</dd>
            </div>
          ))}
        </dl>
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
          {expanded ? "담당 내용 닫기" : "담당 내용 보기"}
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
          <span className="app-name"><BracketsCurly weight="bold" aria-hidden="true" /> PortfolioConsole</span>
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
            <span>KIM_JAEHWAN</span>
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
              KIM_JAEHWAN <span>›</span> {activeMeta.label}
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
                    가용성·확장성·보안·복구 가능성을 함께 고민하고,
                    검증 결과와 운영 기준을 문서로 남기는 클라우드 엔지니어를 지향합니다.
                  </p>
                  <ul className="tag-list hero-tags" aria-label="핵심 기술">
                    <li>AWS</li><li>Kubernetes</li><li>Terraform</li><li>Network</li><li>Monitoring</li>
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
                  <p><span>FOCUS</span> Cloud &amp; Infrastructure</p>
                  <p><span>BASE</span> Seoul, South Korea</p>
                </figure>
              </div>
            </section>

            <section id="experience" className="editor-section experience-section" aria-labelledby="experience-title">
              <LineRail start={27} count={26} />
              <div className="section-content">
                <div className="section-heading">
                  <div><p className="eyebrow">JOURNEY.LOG</p><h2 id="experience-title">보안 검토에서 클라우드 운영까지</h2></div>
                  <span className="section-command">$ tail -f journey.log</span>
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
                  <span className="section-command">2 verified projects</span>
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
                  <h2 id="contact-title">운영을 생각하는 클라우드 엔지니어를 찾고 계신가요?</h2>
                  <p>AWS, Kubernetes, 인프라 안정성·자동화에 관한 기회와 대화를 기다립니다.</p>
                </div>
                <div className="contact-card">
                  <p className="contact-status"><CheckCircle weight="fill" aria-hidden="true" /> Open to cloud infrastructure roles</p>
                  <dl>
                    <div><dt><MapPin aria-hidden="true" /> Location</dt><dd>Seoul, South Korea</dd></div>
                    <div><dt><Command aria-hidden="true" /> Contact</dt><dd>GitHub 또는 Blog</dd></div>
                  </dl>
                  <p className="contact-note">전화번호·상세 주소·생년월일·이메일은 공개 페이지에서 제외했습니다. 직접 연락처 공개는 확인 후 추가할 수 있습니다.</p>
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
        <span><GitBranch weight="bold" aria-hidden="true" /> codex/personalize-profile</span>
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
