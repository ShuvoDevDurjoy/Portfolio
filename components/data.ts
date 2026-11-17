// ── Shuvo Dev — Full Portfolio Data ──────────────────────────────────────

export const profile = {
  id: '1',
  full_name: 'Shuvo Dev',
  username: 'shuvodevdurjoy',
  headline: 'Software Engineer & Distributed Systems Builder',
  tagline: 'I build systems that run at scale.',
  bio: "CS undergrad at North South University specialising in Distributed Systems, High-Performance Computing, and Full-Stack Engineering.",
  about: "Computer Science & Engineering undergraduate at North South University with a deep interest in software architecture, distributed databases, and high-throughput web applications. Expertise in C++, TypeScript, Go, and Python. Active competitive programmer, open-source contributor, and undergraduate TA — aiming to solve large-scale engineering problems at top-tier tech environments globally.",
  email: 'shuvo.dev@northsouth.edu',
  location: 'Dhaka, Bangladesh',
  github_url: 'https://github.com/shuvodevdurjoy',
  linkedin_url: 'https://linkedin.com/in/shuvodevdurjoy',
  twitter_url: 'https://twitter.com/shuvodevdurjoy',
  avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&auto=format',
  is_hirable: true,
  availability: 'Open to Internships & Full-Time Roles',
  university: 'North South University',
  degree: 'B.Sc. in Computer Science & Engineering',
  gpa: '3.92 / 4.00',
}

export const competitive_stats = {
  leetcode_url: 'https://leetcode.com/shuvodevdurjoy',
  leetcode_rating: 2050,
  leetcode_rank: 'Knight',
  leetcode_solved: 600,
  leetcode_percentile: 1.8,
  codeforces_url: 'https://codeforces.com/profile/shuvodevdurjoy',
  icpc_achievement: 'Regional Finalist — Top 15 / 150+ teams',
}

export const social_links = [
  { name: 'GitHub',     url: 'https://github.com/shuvodevdurjoy',             icon: 'github' },
  { name: 'LinkedIn',   url: 'https://linkedin.com/in/shuvodevdurjoy',        icon: 'linkedin' },
  { name: 'Twitter',    url: 'https://twitter.com/shuvodevdurjoy',            icon: 'twitter' },
  { name: 'LeetCode',   url: 'https://leetcode.com/shuvodevdurjoy',           icon: 'code' },
  { name: 'Codeforces', url: 'https://codeforces.com/profile/shuvodevdurjoy', icon: 'terminal' },
]

export type EmploymentType = 'Full-time' | 'Internship' | 'Freelance' | 'Part-time'

export const experiences = [
  {
    id: '1', company_name: 'Tech Labs — Cloud Infrastructure Team',
    role: 'Software Engineering Intern', employment_type: 'Internship' as EmploymentType,
    location: 'Dhaka, Bangladesh', start_date: 'Jun 2025', end_date: 'Aug 2025', is_current: false,
    description: 'Cloud infrastructure internship focused on gRPC microservices and distributed systems reliability.',
    highlights: [
      'Architected gRPC microservices handling 1M+ daily API requests with 99.9% uptime.',
      'Reduced query latency by 40% via Redis caching and PostgreSQL index tuning.',
      'Automated CI/CD with Docker, GitHub Actions, AWS ECS — cut release time by 80%.',
    ],
    skill_ids: ['go', 'grpc', 'docker', 'redis', 'aws', 'postgres'],
    display_order: 1,
  },
  {
    id: '2', company_name: 'Dept. of ECE, North South University',
    role: 'Undergraduate Teaching Assistant — DSA', employment_type: 'Part-time' as EmploymentType,
    location: 'Dhaka, Bangladesh', start_date: 'Jan 2025', end_date: null, is_current: true,
    description: 'Teaching and mentoring undergraduates in Data Structures & Algorithms using C++.',
    highlights: [
      'Mentored 120+ students in C++, memory management, graph theory, and problem solving.',
      'Conducted weekly lab sessions and code reviews for complexity analysis.',
    ],
    skill_ids: ['cpp', 'dsa', 'algorithms'],
    display_order: 2,
  },
]

export const education = [
  {
    id: '1', institution: 'North South University',
    degree: 'Bachelor of Science in Computer Science & Engineering',
    field_of_study: 'CS & Engineering', gpa: '3.92 / 4.00',
    start_date: '2022', end_date: '2026 (Expected)',
    honors: "Dean's Honor List (All Semesters) · Merit Scholarship Recipient",
    relevant_coursework: [
      'Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems',
      'Computer Networks', 'Distributed Systems', 'Object-Oriented Programming',
      'Software Engineering & System Design', 'Machine Learning',
    ],
    display_order: 1,
  },
  {
    id: '1', institution: 'North South University, Dhaka, Bangladesh',
    degree: 'Bachelor of Science in Computer Science & Engineering',
    field_of_study: 'CS & Engineering', gpa: '3.92 / 4.00',
    start_date: '2022', end_date: '2026 (Expected)',
    honors: "Dean's Honor List (All Semesters) · Merit Scholarship Recipient",
    relevant_coursework: [
      'Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems',
      'Computer Networks', 'Distributed Systems', 'Object-Oriented Programming',
      'Software Engineering & System Design', 'Machine Learning',
    ],
    display_order: 1,
  },
]

export const projects = [
  {
    id: 'nexuskv', title: 'NexusKV', subtitle: 'Distributed Key-Value Engine',
    slug: 'nexus-kv-engine',
    summary: '45k+ ops/sec distributed KV store with Raft consensus.',
    description: 'High-throughput distributed KV engine in Go using Raft consensus protocol. WAL, custom LSM-tree persistence, binary serialisation via gRPC/Protobuf. Sub-5ms P99 latency.',
    repo_url: 'https://github.com/shuvodevdurjoy/nexus-kv-engine',
    demo_url: 'https://nexuskv-demo.vercel.app',
    thumbnail_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&h=560&fit=crop&auto=format',
    is_featured: true, display_order: 1, category: 'Distributed Systems',
    metrics: ['45k+ ops/sec', 'sub-5ms P99', '3-node Raft cluster'],
    technologies: ['Go', 'Raft Consensus', 'gRPC', 'Protobuf', 'Docker', 'Prometheus'],
  },
  {
    id: 'codepulse', title: 'CodePulse', subtitle: 'Real-Time Collaborative Cloud IDE',
    slug: 'codepulse-ide',
    summary: 'Real-time collaborative editor with Docker sandboxed execution.',
    description: 'Collaborative code editor with Operational Transformation over WebSockets. Docker container sandboxes for isolated execution in 10+ languages with strict quotas.',
    repo_url: 'https://github.com/shuvodevdurjoy/codepulse-ide',
    demo_url: 'https://codepulse-studio.vercel.app',
    thumbnail_url: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=900&h=560&fit=crop&auto=format',
    is_featured: true, display_order: 2, category: 'Full-Stack & Systems',
    metrics: ['200 concurrent users', '<50ms sync latency', '10+ languages'],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'WebSockets', 'Docker', 'Redis'],
  },
  {
    id: 'neuralvision', title: 'NeuralVision', subtitle: 'Edge Video Stream Analytics',
    slug: 'neural-vision-analytics',
    summary: 'AI surveillance pipeline at 60 FPS via PyTorch + Kafka.',
    description: 'End-to-end AI surveillance microservice processing RTSP streams at 60 FPS via PyTorch & TensorRT, streaming metadata through Apache Kafka to a Next.js dashboard.',
    repo_url: 'https://github.com/shuvodevdurjoy/neural-vision-analytics',
    demo_url: 'https://neuralvision-analytics.vercel.app',
    thumbnail_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&h=560&fit=crop&auto=format',
    is_featured: true, display_order: 3, category: 'AI / ML & Cloud',
    metrics: ['60 FPS inference', 'RTSP stream ingestion', 'Kafka pipeline'],
    technologies: ['Python', 'PyTorch', 'OpenCV', 'Kafka', 'FastAPI', 'Next.js'],
  },
  {
    id: 'algoviz', title: 'AlgoViz', subtitle: 'Algorithm & Data Structure Visualiser',
    slug: 'algoviz-cs',
    summary: 'Interactive algorithm visualiser used by 5,000+ CS students.',
    description: 'Interactive visualiser for graph algorithms, DP models, and tree traversals with time-complexity profiling and step-by-step state inspection.',
    repo_url: 'https://github.com/shuvodevdurjoy/algoviz-cs',
    demo_url: 'https://algoviz-cs.vercel.app',
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=560&fit=crop&auto=format',
    is_featured: false, display_order: 4, category: 'Frontend & EdTech',
    metrics: ['5,000+ students', 'Graph · DP · Trees', 'Complexity profiling'],
    technologies: ['React.js', 'TypeScript', 'HTML5 Canvas', 'Tailwind CSS'],
  },
]

export type SkillCategory = 'Languages' | 'Frameworks' | 'Tools' | 'Soft Skills'
export type SkillLevel = 'Advanced' | 'Intermediate' | 'Familiar'
export interface SkillItem {
  id: string;
  name: string;
  level: SkillLevel;
  note: string;
}

export interface SkillGroup {
  id: number;
  category: SkillCategory;
  items: SkillItem[];
}

export const groupedSkills: SkillGroup[] = [
  {
    id: 1,
    category: 'Languages',
    items: [
      { id: 'cpp', name: 'C++', level: 'Advanced', note: 'Systems & DSA' },
      { id: 'python', name: 'Python', level: 'Advanced', note: 'Backend & ML' },
      { id: 'typescript', name: 'TypeScript', level: 'Advanced', note: 'Full-Stack' },
      { id: 'javascript', name: 'JavaScript', level: 'Advanced', note: 'Web Engineering' },
      { id: 'go', name: 'Go', level: 'Intermediate', note: 'Distributed Systems' },
      { id: 'java', name: 'Java', level: 'Intermediate', note: 'OOP & Enterprise' },
      { id: 'sql', name: 'SQL', level: 'Advanced', note: 'Databases' },
    ],
  },
  {
    id: 2,
    category: 'Frameworks',
    items: [
      { id: 'react', name: 'React.js', level: 'Advanced', note: 'Frontend' },
      { id: 'nextjs', name: 'Next.js', level: 'Advanced', note: 'Full-Stack' },
      { id: 'nodejs', name: 'Node.js', level: 'Advanced', note: 'Backend' },
      { id: 'grpc', name: 'gRPC', level: 'Intermediate', note: 'Microservices' },
      { id: 'graphql', name: 'GraphQL', level: 'Intermediate', note: 'API Layer' },
      { id: 'pytorch', name: 'PyTorch', level: 'Intermediate', note: 'ML' },
    ],
  },
  {
    id: 3,
    category: 'Tools',
    items: [
      { id: 'docker', name: 'Docker', level: 'Advanced', note: 'Containers' },
      { id: 'kubernetes', name: 'Kubernetes', level: 'Intermediate', note: 'Orchestration' },
      { id: 'kafka', name: 'Kafka', level: 'Intermediate', note: 'Event Streaming' },
      { id: 'postgres', name: 'PostgreSQL', level: 'Advanced', note: 'Relational DB' },
      { id: 'redis', name: 'Redis', level: 'Advanced', note: 'Cache' },
      { id: 'aws', name: 'AWS / GCP', level: 'Intermediate', note: 'Cloud' },
      { id: 'git', name: 'Git & GitHub', level: 'Advanced', note: 'Version Control' },
      { id: 'linux', name: 'Linux / Bash', level: 'Advanced', note: 'System Admin' },
    ],
  },
  {
    id: 4,
    category: 'Soft Skills',
    items: [
      { id: 'sysdesign', name: 'System Design', level: 'Advanced', note: 'Architecture' },
      { id: 'dsa', name: 'DSA & Algorithms', level: 'Advanced', note: 'Competitive' },
    ],
  },
];
export type AchievementCategory = 'Competitive Programming' | 'Hackathon' | 'Academic' | 'Open Source'

export const achievements = [
  { id: '1', title: 'ICPC Regional Finalist', description: 'Top 15 teams out of 150+ university teams in the National ICPC Regional Contest.', category: 'Competitive Programming' as AchievementCategory, icon: '🏆', year: '2024', highlight: 'Top 15 / 150+ teams' },
  { id: '2', title: 'LeetCode Knight', description: 'Max rating 2050+ (Top 1.8% globally) with 600+ problems solved across algorithms & data structures.', category: 'Competitive Programming' as AchievementCategory, icon: '⚔️', year: '2024', highlight: '2050+ · Top 1.8%' },
  { id: '3', title: 'National Hackathon Champion', description: '1st Place for building a real-time distributed AI cloud monitoring dashboard in 36 hours.', category: 'Hackathon' as AchievementCategory, icon: '🥇', year: '2024', highlight: '1st Place · 36h' },
  { id: '4', title: "Dean's List & Merit Scholar", description: "Continuous academic excellence — 3.90+ GPA across all semesters at North South University.", category: 'Academic' as AchievementCategory, icon: '🎓', year: '2022–Present', highlight: '3.92 GPA · All Semesters' },
]

export const certificates = [
  { id: '1', title: 'AWS Solutions Architect – Associate', issuer: 'Amazon Web Services', issue_date: 'Jun 2025', credential_url: 'https://aws.amazon.com', credential_id: 'AWS-SAA-C03-4921', type: 'certificate' as const },
  { id: '2', title: 'Meta Frontend Developer Certificate', issuer: 'Meta / Coursera', issue_date: 'Jan 2025', credential_url: 'https://coursera.org', credential_id: 'META-FE-7823', type: 'certificate' as const },
  { id: '3', title: 'Professional Scrum Master I', issuer: 'Scrum.org', issue_date: 'Nov 2024', credential_url: 'https://scrum.org', credential_id: 'PSM-I-982341', type: 'certificate' as const },
]

export const courses = [
  { id: '1', title: 'MIT 6.824 Distributed Systems', platform: 'MIT OpenCourseWare', completed: '2024', topics: ['Raft', 'Paxos', 'MapReduce', 'Spanner', 'Zookeeper'], hours: '80+' },
  { id: '2', title: 'CS231n: Deep Learning for Computer Vision', platform: 'Stanford Online', completed: '2024', topics: ['CNNs', 'Transfer Learning', 'Object Detection', 'GANs'], hours: '60+' },
  { id: '3', title: 'Algorithms Specialisation', platform: 'Coursera / Stanford', completed: '2023', topics: ['Divide & Conquer', 'Graph Algorithms', 'Greedy', 'NP-Completeness'], hours: '45+' },
  { id: '4', title: 'Designing Data-Intensive Applications', platform: 'Self-Study (O\'Reilly)', completed: '2023', topics: ['Storage Engines', 'Replication', 'Partitioning', 'Consistency'], hours: '40+' },
]

export const blogs = [
  {
    id: '1',
    title: 'Building NexusKV: Raft Consensus in Go from Scratch',
    excerpt: 'A deep dive into implementing the Raft consensus algorithm for a distributed key-value store — leader election, log replication, and WAL persistence.',
    date: '2025-09-10',
    reading_time: '14 min',
    tags: ['Go', 'Distributed Systems', 'Raft'],
    url: '#',
    cover: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&h=400&fit=crop&auto=format',
  },
  {
    id: '2',
    title: 'Zero to 60 FPS: Real-Time Edge AI with PyTorch & TensorRT',
    excerpt: 'How I optimised an RTSP video analytics pipeline from 12 FPS to 60 FPS using TensorRT quantisation and async Kafka event streaming.',
    date: '2025-07-28',
    reading_time: '10 min',
    tags: ['Python', 'PyTorch', 'TensorRT', 'Kafka'],
    url: '#',
    cover: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=700&h=400&fit=crop&auto=format',
  },
  {
    id: '3',
    title: 'Why I Switched from REST to gRPC for Internal Microservices',
    excerpt: 'Comparing REST and gRPC in practice — latency benchmarks, Protobuf schema evolution, and why binary serialisation matters at 1M+ requests/day.',
    date: '2025-06-14',
    reading_time: '8 min',
    tags: ['Go', 'gRPC', 'Microservices', 'Performance'],
    url: '#',
    cover: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=700&h=400&fit=crop&auto=format',
  },
]