export const PROFILE = {
  name: 'Zabir Azmayan',
  handle: 'ZBR',
  role: 'Software Engineer · Full Stack · ML',
  location: 'Banani, Dhaka, Bangladesh',
  email: 'zabirazmayn53@gmail.com',
  phone: '+880 1969 526795',
  phoneHref: '+8801969526795',
  linkedin: 'https://linkedin.com/in/Zabir-Azmayan',
  github: 'https://github.com/',
  x: 'https://x.com/',
  blurb:
    'CS student at BRAC University building modern web apps, mobile apps, and AI-powered systems. I care about products that are polished, fast, and actually shipped.',
};

export const SECTIONS = [
  { id: 'index', label: 'Index', code: '00' },
  { id: 'manifest', label: 'Manifest', code: '01' },
  { id: 'archive', label: 'Archive', code: '02' },
  { id: 'research', label: 'Research', code: '03' },
  { id: 'stack', label: 'Stack', code: '04' },
  { id: 'uplink', label: 'Uplink', code: '05' },
];

export const PROJECTS = [
  {
    id: 'AZR-01',
    title: 'Azure Business Solutions',
    kind: 'Web platform',
    role: 'Full Stack Developer',
    year: '2025',
    desc: 'Modern web presence for a tax & business consulting firm with a real-time database and authentication, immersive scroll effects, and a multi-service showcase.',
    tech: ['React', 'Vite', 'TypeScript', 'Convex', 'Tailwind', 'Framer', 'Three.js'],
    metrics: [
      ['Services', '12+'],
      ['Auth', 'Realtime'],
      ['Render', 'WebGL'],
    ],
  },
  {
    id: 'MDH-02',
    title: 'Medihelp',
    kind: 'Cross-platform mobile',
    role: 'Mobile Developer',
    year: '2024',
    desc: 'Cross-platform health assistant covering appointments, prescriptions, lab reports, medicine tracking, in-app chat, and secure authentication.',
    tech: ['Flutter', 'Firebase', 'Local Notifications'],
    metrics: [
      ['Modules', '6'],
      ['Platforms', 'iOS/Android'],
      ['Auth', 'Firebase'],
    ],
  },
  {
    id: 'RID-03',
    title: 'Ride Sharing Platform',
    kind: 'Campus web app',
    role: 'Backend & UI',
    year: '2024',
    desc: 'Campus ride sharing platform connecting university students for safe, cost-effective rides, with role-based authentication and trip management.',
    tech: ['Django', 'SQLite', 'HTML/CSS', 'Bootstrap'],
    metrics: [
      ['Roles', '3'],
      ['Backend', 'Django'],
      ['Scope', 'Campus'],
    ],
  },
  {
    id: 'PTH-04',
    title: 'Pothole Detection Model',
    kind: 'Computer vision',
    role: 'ML Engineer',
    year: '2024',
    desc: 'Instance segmentation model that detects and outlines potholes on a custom-labelled road dataset using YOLOv8.',
    tech: ['Python', 'YOLOv8', 'OpenCV'],
    metrics: [
      ['Task', 'Segmentation'],
      ['Model', 'YOLOv8'],
      ['Data', 'Custom'],
    ],
  },
];

export const THESIS = {
  title:
    'AI-driven multi-modal surveillance framework for insider threat detection in high-security facilities',
  target: 'Oct 2025',
  points: [
    'Transformer-based pose encoders, 3D CNNs, and YOLOv8 for behavioural detection.',
    'SVM, Random Forest, Decision Trees, and BERT applied to downstream analytics.',
    'All modules integrated into a unified risk assessment and alerting system.',
  ],
};

export const STACK = [
  { group: 'Languages', items: ['Python', 'C', 'JavaScript', 'TypeScript'] },
  {
    group: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  { group: 'Backend', items: ['Django', 'Node.js', 'REST APIs'] },
  { group: 'Mobile', items: ['Flutter', 'Android'] },
  {
    group: 'Data',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Firebase'],
  },
  { group: 'ML', items: ['YOLOv8', 'BERT', 'scikit-learn', 'PyTorch'] },
  { group: 'Tooling', items: ['Git', 'GitHub', 'Vercel', 'Figma'] },
];

export const EDUCATION = {
  school: 'BRAC University',
  place: 'Dhaka, Bangladesh',
  degree: 'B.Sc. in Computer Science and Engineering',
  span: 'June 2021 — Present',
  coursework: [
    'Software Engineering',
    'System Analysis & Design',
    'Machine Learning',
    'Android App Development',
    'Data Structures & Algorithms',
  ],
};

export const BOOT_LINES = [
  'mounting render context ......... ok',
  'probing gpu / webgl2 ............ ok',
  'compiling grid shader ........... ok',
  'compiling particle shader ....... ok',
  'allocating 24,000 nodes ......... ok',
  'linking postprocess chain ....... ok',
  'loading archive [4 records] ..... ok',
  'calibrating pointer telemetry ... ok',
  'system nominal. awaiting operator.',
];
