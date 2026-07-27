import { useEffect, useMemo, useRef, useState } from "react";
import {
  Article,
  ArrowUp,
  At,
  BracketsCurly,
  CaretDown,
  CheckCircle,
  Circle,
  ClockCounterClockwise,
  Cloud,
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
    id: "certifications",
    label: "Certificates",
    file: "certifications.md",
    icon: FileText,
  },
  {
    id: "experience",
    label: "Growth",
    file: "growth.log",
    icon: ClockCounterClockwise,
  },
  { id: "projects", label: "Projects", file: "projects.json", icon: Cube },
  { id: "contact", label: "Contact", file: "contact.txt", icon: At },
];

const certifications = [
  {
    name: "리눅스마스터 2급",
    status: "한국정보통신진흥협회(KAIT) | 2026.04.03",
    state: "earned",
  },
  {
    name: "정보처리기사",
    status: "필기 합격 → 실기 준비 중",
    state: "in-progress",
  },
  {
    name: "AWS Solutions Architect – Associate",
    status: "SAA-C03 준비 중",
    state: "in-progress",
  },
];

const experience = [
  {
    index: "01",
    role: "2018.03 — 2026.08 / 졸업 예정",
    company: "가천대학교 · 유럽어문학과 / 소프트웨어 복수전공",
    description: [
      "본전공인 유럽어문학과에서 독문학과 유럽의 문화·정치·제도를 공부하며 자료의 맥락과 근거를 구조화하고, 팀 프로젝트와 발표를 통해 의견을 조율하는 방법을 배웠습니다.",
      "소프트웨어 복수전공에서는 C·Java·Python을 학습하고, 자료구조 및 실습·웹 프로그래밍·모바일 웹 프로그래밍·모바일프로그래밍·로봇공학 과목을 통해 소프트웨어 구현 경험을 넓혔습니다. 이를 바탕으로 클라우드·인프라 역량을 확장하고 있습니다.",
    ],
    tags: [
      "C", "Java", "Python", "JavaScript", "HTML", "자료구조",
      "웹 프로그래밍", "모바일 웹", "모바일 프로그래밍", "로봇공학",
    ],
  },
  {
    index: "02",
    role: "2024.06 — 2024.12 / 현장실습",
    company: "씨드젠 · 개인정보 처리방침 평가제 업무 지원",
    description:
      "개인정보보호위원회·KISA 협업 사업에서 국민생활 밀접 49개 기업의 처리방침을 검토했습니다. 26개 항목·42개 지표를 기준으로 기초자료와 평가 소견을 정리하며 보안 판단 기준과 문서화 방식을 익혔습니다.",
    tags: ["Privacy", "Security Review", "Documentation"],
  },
  {
    index: "03",
    role: "2025.12 — 2026.07 / 교육",
    company: "메가존클라우드 IT Bootcamp · Solution Architect",
    description:
      "Linux·네트워크·데이터베이스 기초부터 온프레미스, 컨테이너, AWS·GCP 클라우드, IaC, CI/CD·GitOps, 모니터링과 자동화까지 Solution Architect 커리큘럼을 이수했습니다. 각 기술을 개별적으로 학습하는 데 그치지 않고 팀 프로젝트에서 가용성·확장성·보안·복구와 운영 가능성을 함께 검토하며 아키텍처를 설계하고 검증했습니다.",
    curriculum: [
      "Linux 서버 기초 및 운영",
      "네트워크 기초와 GNS3·Cisco Packet Tracer 실습",
      "서브넷팅·라우팅·스위칭·VLAN·NAT·ACL",
      "데이터베이스·SQL·Redis 기초",
      "가상화와 온프레미스 인프라 설계",
      "Docker·Kubernetes 컨테이너 환경",
      "AWS 클라우드 아키텍처 설계·구축",
      "Terraform 기반 IaC",
      "Jenkins·GitHub Actions·Argo CD 기반 CI/CD·GitOps",
      "CloudWatch·Prometheus·Grafana 모니터링",
      "GCP·GKE 및 멀티클라우드 구성",
      "Python·boto3 기반 클라우드 자동화와 Bedrock 기초 실습",
    ],
    tags: [
      "Linux", "GNS3", "Cisco Packet Tracer", "MySQL", "Redis", "Docker",
      "Kubernetes", "AWS", "Terraform", "Jenkins", "GitHub Actions", "Argo CD",
      "CloudWatch", "Prometheus", "Grafana", "GCP", "GKE", "Python", "boto3",
      "Amazon Bedrock",
    ],
  },
];

const projects = [
  {
    id: "securevoice",
    spec: "PROJECT: 01 / TEAM PROJECT / 2026.05 — 2026.07",
    title: "SecureVoiceGuard AWS 전환",
    description:
      "AI 음성 위변조 탐지 서비스의 단일 서버 구조를 트래픽 증가, AI 추론 부하, 장애 복구와 반복 배포에 대응할 수 있는 AWS 관리형 아키텍처로 전환한 5인 프로젝트입니다.",
    caseStudy: [
      {
        number: "01",
        title: "Overview",
        subtitle: "프로젝트 배경",
        intro:
          "AI 음성 위변조 탐지 서비스를 운영하는 보안 스타트업을 가정하여, 금융·보험·공공기관 고객 확대와 분석 요청 증가에 대응하는 AWS 전환 프로젝트를 수행했습니다. 기존 온프레미스 단일 서버 구조를 클라우드 기반으로 분리하고, 확장성·가용성·보안·배포 및 모니터링을 고려한 운영 환경 구축을 목표로 했습니다.",
      },
      {
        number: "02",
        title: "Challenge",
        subtitle: "문제 정의",
        items: [
          "Web·API·AI Inference·로컬 파일 저장 기능이 하나의 서버에 함께 배치되어 컴퓨팅 자원을 공유했습니다.",
          "API가 AI 추론 완료까지 기다리는 동기식 처리 방식으로, 요청 급증 시 분석 지연과 Timeout이 발생했습니다.",
          "기능별 독립 확장과 장애 격리가 어려워 단일 서버 장애가 전체 서비스 중단으로 이어질 수 있었습니다.",
          "민감 음성 파일을 로컬 디스크에 저장해 암호화·접근통제·보관·삭제 정책을 체계적으로 적용하기 어려웠습니다.",
          "서버 직접 접속을 통한 수동 배포와 상태 확인으로 변경 이력 관리와 신속한 장애 대응에 한계가 있었습니다.",
        ],
      },
      {
        number: "03",
        title: "Solution",
        subtitle: "해결 방안",
        intro:
          "단일 서버에 결합된 기능을 역할별 AWS 관리형 서비스로 분리하고, 비동기 AI 처리·데이터 보호·배포 및 모니터링 체계를 중심으로 운영 구조를 재설계했습니다.",
        groups: [
          {
            title: "클라우드 아키텍처 분리",
            items: [
              "CloudFront·WAF·ALB를 외부 요청 진입점으로 구성했습니다.",
              "ECS Fargate 기반 API Service와 AI Worker를 Private Subnet에 분리 배치했습니다.",
              "Public·Private App·Private Data Subnet을 2개 가용영역으로 구성해 계층별 접근 범위를 구분했습니다.",
            ],
          },
          {
            title: "비동기 AI 처리 구조",
            items: [
              "음성 파일과 AI 모델을 S3에 저장하고 API와 AI 추론 작업을 분리했습니다.",
              "Free·Paid SQS와 Worker를 각각 구성해 요금제별 작업 경로를 분리했습니다.",
              "실패한 작업은 DLQ에 격리하고, request_id를 기준으로 처리 상태를 확인하도록 설계했습니다.",
            ],
          },
          {
            title: "데이터 가용성과 보안 강화",
            items: [
              "RDS MySQL Multi-AZ·RDS Proxy·자동 백업·PITR을 적용했습니다.",
              "IAM과 Security Group으로 서비스별 접근 권한과 네트워크 경로를 제한했습니다.",
              "KMS·Secrets Manager·TLS·SSM을 활용해 데이터 암호화, 인증정보와 관리자 접근을 분리했습니다.",
            ],
          },
          {
            title: "배포·운영 자동화",
            items: [
              "Jenkins·GitHub·ECR·ECS를 연결해 컨테이너 빌드와 배포 파이프라인을 구성했습니다.",
              "Terraform과 S3 Remote State를 활용해 인프라 구성과 변경사항을 코드로 관리했습니다.",
              "CloudWatch·Prometheus·Grafana와 Slack 알림으로 로그·지표·장애 징후를 확인하도록 구성했습니다.",
            ],
          },
        ],
      },
      {
        number: "04",
        title: "Result",
        subtitle: "성과",
        intro:
          "AWS 관리형 서비스를 활용해 단일 서버에 결합됐던 기능을 분리하고, 확장·장애 대응·데이터 보호·배포 및 모니터링이 가능한 운영 기반을 구축했습니다.",
        groups: [
          {
            title: "서비스 확장성과 장애 대응력 향상",
            items: [
              "API와 AI Worker의 부하를 분리해, 추론 작업 증가가 API 응답 성능과 서비스 전체 안정성에 미치는 영향을 줄였습니다.",
              "요청 급증 시 작업을 SQS에 보관하고 Worker를 독립적으로 확장할 수 있어, 순간적인 부하가 Timeout과 전체 장애로 확산되는 위험을 낮췄습니다.",
              "실패한 작업을 DLQ로 분리해 정상 작업에 미치는 영향을 줄이고, 오류 분석과 재처리 과정의 운영 복잡도를 낮췄습니다.",
            ],
          },
          {
            title: "데이터 가용성과 복구성 향상",
            items: [
              "RDS Multi-AZ를 통해 단일 DB 장애가 장시간 서비스 중단으로 이어질 가능성을 낮추고, 데이터 계층의 가용성을 높였습니다.",
              "자동 백업과 PITR 기반 복구 절차를 마련해 데이터 장애 발생 시 특정 시점으로 복구할 수 있는 대응력을 높였습니다.",
              "RDS Proxy로 연결 집중과 DB 재연결 부담을 완화해, 트래픽 증가와 DB 장애 상황에서 애플리케이션 연결의 안정성을 높였습니다.",
            ],
          },
          {
            title: "배포·모니터링·보안 운영 개선",
            items: [
              "컨테이너 빌드부터 ECS 배포까지 동일한 절차로 실행하도록 표준화해 수동 배포 작업과 담당자별 작업 편차를 줄였습니다.",
              "로그·지표·알림을 통합해 수동 상태 확인에 대한 의존도를 낮추고, 장애 징후 탐지와 원인 파악에 필요한 운영 단계를 단순화했습니다.",
              "인증정보와 관리자 접근 경로를 분리해 비밀정보 노출과 서버 직접 접근 위험을 낮추고, 데이터 접근 범위를 최소화했습니다.",
            ],
          },
          {
            title: "비용 및 운영 효율 개선",
            items: [
              "S3 Gateway Endpoint를 적용해 ECS의 S3 모델 다운로드 트래픽이 NAT Gateway를 거치지 않도록 개선했습니다. 이를 통해 약 6,000GB까지 증가했던 NAT 데이터 처리량을 수 KB 수준으로 낮추고, 하루 400달러 이상의 예상 비용이 반복될 위험을 줄였습니다.",
              "Terraform Remote State로 팀원이 동일한 인프라 상태를 공유하도록 해 변경 충돌과 구성 불일치 가능성을 낮췄습니다.",
              "장기 보존 리소스와 런타임 리소스의 변경 범위를 분리해 중요 데이터의 오삭제 위험과 인프라 변경에 따른 운영 부담을 줄였습니다.",
            ],
          },
        ],
      },
    ],
    image: "/assets/projects/securevoice-architecture.png",
    imageLabel: "aws-overall-architecture.png",
    imageAlt: "SecureVoiceGuard의 CloudFront, ECS Fargate, SQS, RDS 기반 AWS 아키텍처",
    fit: "contain",
    tags: [
      "AWS", "CloudFront", "AWS WAF", "ALB", "ECS Fargate", "ECR", "Docker",
      "S3", "SQS", "RDS MySQL", "RDS Proxy", "Jenkins", "GitHub", "Terraform",
      "CloudWatch", "Prometheus", "Grafana", "IAM", "KMS", "Secrets Manager",
      "SSM", "VPC Endpoint", "Amazon Bedrock",
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
    spec: "PROJECT: 02 / TEAM PROJECT / 2026.03.01 — 2026.03.16",
    title: "OnPremises-MZC 티켓팅 인프라",
    description:
      "명절 예매 시점의 트래픽 폭증, 단일 장비 장애, 데이터 유실과 수동 장애 대응 문제를 해결하기 위해 네트워크부터 애플리케이션·데이터·관측 계층까지 통합 설계한 5인 프로젝트입니다.",
    overview: [
      "GNS3 기반 Front·Container·Data 3-Zone을 구성하고 HSRP 이중화 라우터, Bastion Host, Nginx Reverse Proxy·WAF·TLS·Rate Limit으로 진입 경로와 계층 간 접근을 통제했습니다.",
      "3-Node Kubernetes 클러스터에 FastAPI 서비스를 배포하고 HPA·Metrics Server, Liveness/Readiness Probe, Rolling Update, ConfigMap·Secret으로 확장성과 자가 치유·설정 분리를 구현했습니다.",
      "MySQL GTID Master/Slave와 Keepalived VIP로 DB 장애 전환 구조를 만들고, Redis Cache-Aside와 Longhorn PVC로 조회 성능과 상태 저장 데이터의 영속성을 확보했습니다.",
      "Prometheus·Grafana·Alertmanager와 Discord Webhook으로 Kubernetes·MySQL·Redis 지표를 수집하고, JMeter 부하 및 장애 시나리오로 전체 운영 흐름을 검증했습니다.",
    ],
    image: "/assets/projects/onprem-architecture.png",
    imageLabel: "onprem-logical-architecture.png",
    imageAlt: "Kubernetes, Redis, Longhorn, MySQL, Prometheus와 Grafana를 포함한 온프레미스 전체 논리 아키텍처",
    fit: "contain",
    tags: [
      "GNS3", "Cisco IOS", "HSRP", "Nginx", "ModSecurity WAF", "TLS/HTTPS",
      "Kubernetes", "Docker", "FastAPI", "HPA", "Metrics Server",
      "Liveness/Readiness Probe", "Rolling Update", "ConfigMap", "Secret",
      "MySQL", "GTID Replication", "Keepalived", "Redis", "Longhorn",
      "Prometheus", "Grafana", "Alertmanager", "JMeter", "Discord Webhook",
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
  const contentId = `${project.id}-content`;

  return (
    <article className={`project-card ${expanded ? "is-expanded" : ""}`}>
      <div className="project-heading">
        <div>
          <p className="eyebrow">{project.spec}</p>
          <h3>{project.title}</h3>
        </div>
        <div className="project-heading-actions">
          <span className="status-chip">
            <CheckCircle weight="fill" aria-hidden="true" />
            Documented
          </span>
          <button
            className="project-toggle"
            type="button"
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "프로젝트 접기" : "프로젝트 펼치기"}
            <CaretDown aria-hidden="true" weight="bold" />
          </button>
        </div>
      </div>

      <div className="project-preview">
        <p>{project.description}</p>
        <ul className="tag-list" aria-label={`${project.title} 주요 기술 스택`}>
          {project.tags.slice(0, 6).map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </div>

      <div id={contentId} className="project-expanded-content" hidden={!expanded}>
        <figure className="project-figure">
          <figcaption>
            <span><ImageIcon aria-hidden="true" /> {project.imageLabel}</span>
            <span className="figure-format">AUTO FIT</span>
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
          <div className="project-summary">
            {project.caseStudy ? (
              <div className="project-case-study">
                {project.caseStudy.map((section) => (
                  <section className="case-study-section" key={section.number} aria-labelledby={`${project.id}-${section.title}`}>
                    <div className="case-study-heading">
                      <span className="case-study-number" aria-hidden="true">{section.number}</span>
                      <div>
                        <p>{section.title}</p>
                        <h4 id={`${project.id}-${section.title}`}>{section.subtitle}</h4>
                      </div>
                    </div>
                    {section.intro && <p className="case-study-intro">{section.intro}</p>}
                    {section.items && (
                      <ul className="case-study-list">
                        {section.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    )}
                    {section.groups && (
                      <div className="case-study-groups">
                        {section.groups.map((group) => (
                          <section className="case-study-group" key={group.title}>
                            <h5>{group.title}</h5>
                            <ul className="case-study-list">
                              {group.items.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                          </section>
                        ))}
                      </div>
                    )}
                  </section>
                ))}
              </div>
            ) : (
              <>
                <p className="project-summary-label">요구사항 및 아키텍처 설계</p>
                <ul className="project-overview">
                  {project.overview.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </>
            )}
          </div>
          <p className="project-stack-label">기술 스택</p>
          <ul className="tag-list" aria-label={`${project.title} 전체 기술 스택`}>
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <div className="project-details">
            <p className="project-summary-label">담당 내용</p>
            <ul>
              {project.details.map((detail) => (
                <li key={detail}><CheckCircle weight="fill" aria-hidden="true" />{detail}</li>
              ))}
            </ul>
          </div>
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
                    아키텍처 수준에서 <strong>트레이드오프를 판단</strong>하고 <strong>끊임없이 배우는 자세</strong>로 인프라를 마주합니다.
                    가용성·확장성·보안·복구·지속 가능성을 종합적으로 고려해 최적의 해답을 찾고
                    <br />
                    <strong>'무엇을 왜 이렇게 설계했는지' 설명하고 책임</strong>지며 운영 프로세스를 문서화하는 엔지니어를 지향합니다.
                  </p>
                  <ul className="tag-list hero-tags" aria-label="기술 역량">
                    <li>AWS</li>
                    <li>GCP</li>
                    <li>GKE</li>
                    <li>Kubernetes</li>
                    <li>Docker</li>
                    <li>Terraform</li>
                    <li>Jenkins</li>
                    <li>GitHub Actions</li>
                    <li>Argo CD</li>
                    <li>Python</li>
                    <li>boto3</li>
                    <li>Linux</li>
                    <li>GNS3</li>
                    <li>Cisco Packet Tracer</li>
                    <li>MySQL</li>
                    <li>PostgreSQL</li>
                    <li>Redis</li>
                    <li>Longhorn</li>
                    <li>Prometheus</li>
                    <li>Grafana</li>
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
                  <figcaption>
                    <span><ImageIcon aria-hidden="true" /> profile-jaehwan.jpg</span>
                    <span>398 × 512</span>
                  </figcaption>
                  <div className="portrait-wrap">
                    <img src="/assets/profile-jaehwan.jpg" alt="김재환 프로필 사진" />
                  </div>
                  <p><span>분야</span> 클라우드 &amp; 인프라</p>
                  <p><span>주소</span> 서울시 송파구 오금동</p>
                  <p><span>이메일</span> <a href="mailto:o980204@naver.com">o980204@naver.com</a></p>
                </figure>

              </div>
            </section>

            <section id="certifications" className="editor-section certifications-section" aria-labelledby="certifications-title">
              <LineRail start={27} count={18} />
              <div className="section-content">
                <div className="section-heading">
                  <div><p className="eyebrow">CERTIFICATIONS.MD</p><h2 id="certifications-title">자격 및 준비 현황</h2></div>
                  <span className="section-command">3 credentials</span>
                </div>
                <div className="certification-grid">
                  {certifications.map((certification) => (
                    <article className={`certification-card is-${certification.state}`} key={certification.name}>
                      <div>
                        <h3>{certification.name}</h3>
                        <p>{certification.status}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="experience" className="editor-section experience-section" aria-labelledby="experience-title">
              <LineRail start={45} count={26} />
              <div className="section-content">
                <div className="section-heading">
                  <div><p className="eyebrow">GROWTH.LOG</p><h2 id="experience-title">성장 과정</h2></div>
                  <span className="section-command">$ tail -f growth.log</span>
                </div>
                <div className="timeline">
                  {experience.map((item) => (
                    <article className="timeline-item" key={item.index}>
                      <div className="timeline-index"><span>{item.index}</span></div>
                      <div className="timeline-copy">
                        <p className="timeline-role">{item.role}</p>
                        <h3>{item.company}</h3>
                        {(Array.isArray(item.description) ? item.description : [item.description]).map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        {item.curriculum && (
                          <ul className="experience-curriculum" aria-label={`${item.company} 주요 커리큘럼`}>
                            {item.curriculum.map((subject) => <li key={subject}>{subject}</li>)}
                          </ul>
                        )}
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
              <LineRail start={71} count={34} />
              <div className="section-content">
                <div className="section-heading">
                  <div><p className="eyebrow">PROJECTS.JSON</p><h2 id="projects-title">요구사항을 구현한 프로젝트</h2></div>
                  <span className="section-command">2 verified projects</span>
                </div>
                <div className="project-grid">
                  {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
                </div>
              </div>
            </section>

            <section id="contact" className="editor-section contact-section" aria-labelledby="contact-title">
              <LineRail start={105} count={22} />
              <div className="section-content contact-grid">
                <div>
                  <p className="terminal-prompt"><span>visitor@portfolio</span>:~$ open contact.txt</p>
                  <p className="eyebrow">STRENGTHS / CONTACT</p>
                  <h2 id="contact-title">저는 이러한 강점을 가진 엔지니어입니다.</h2>
                  <p className="strengths-intro">기술을 깊이 이해하고, 사람들과 함께 더 나은 결과를 만들며, 고객에게 전달되는 가치를 먼저 생각합니다.</p>
                  <ul className="strength-list" aria-label="김재환의 강점">
                    <li>
                      <strong>학습 의지</strong>
                      <span>기술을 사용하는 데 그치지 않고 작동 원리와 세부 구조를 계속 파고들어 이해합니다. 관련 도서를 꾸준히 읽으며 배운 지식을 더 깊고 넓게 확장합니다.</span>
                    </li>
                    <li>
                      <strong>협업 능력</strong>
                      <span>편안하게 의견을 나눌 수 있는 분위기를 만들고, 서로 다른 관점을 경청해 팀이 실행할 수 있는 합의점으로 조율합니다.</span>
                    </li>
                    <li>
                      <strong>고객 우선</strong>
                      <span>기술적 선택이 최종 사용자에게 미치는 영향과 경험을 먼저 살피고, 고객에게 더 안정적이고 편리한 결과를 만드는 방향으로 결정합니다.</span>
                    </li>
                  </ul>
                </div>
                <div className="contact-card">
                  <p className="contact-status"><CheckCircle weight="fill" aria-hidden="true" /> Open to cloud infrastructure roles</p>
                  <dl>
                    <div><dt><MapPin aria-hidden="true" /> 주소</dt><dd>서울시 송파구 오금동</dd></div>
                    <div><dt><At aria-hidden="true" /> 이메일</dt><dd><a href="mailto:o980204@naver.com">o980204@naver.com</a></dd></div>
                  </dl>
                  <p className="contact-note">프로젝트 코드와 학습 기록은 GitHub와 Blog에서 확인하실 수 있습니다.</p>
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
