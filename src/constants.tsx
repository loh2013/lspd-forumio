
import { Rank, PlaqueType, User, Category, Thread, Post, LinkBlock } from './types';

// --- CONFIGURATION: THEME IMAGES ---
export const THEME_IMAGES = {
    logo: 'https://www.upload.ee/image/18860410/Badge-LSPD.png',
    headerBanner: '', 
    headerBackground: 'https://ca-times.brightspotcdn.com/dims4/default/f4650f9/2147483647/strip/true/crop/4762x3114+0+0/resize/1200x785!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F25%2F27%2F7d3ef48d4cd9943259e6d3ab3b3b%2F1304064-me-lapd-graduation3-a.jpg' 
};

// SVG Constants for Ranks (Colors preserved if needed for other UI elements)
export const RANK_COLORS = {
  [Rank.CIVILIAN]: '#888888',
  [Rank.CADET]: '#a0a0a0',
  [Rank.OFFICER_I]: '#c0c0c0',
  [Rank.OFFICER_II]: '#c0c0c0',
  [Rank.OFFICER_III]: '#c0c0c0',
  [Rank.OFFICER_III_PLUS_1]: '#c0c0c0',
  [Rank.DETECTIVE_I]: '#c5b358',
  [Rank.DETECTIVE_II]: '#c5b358',
  [Rank.DETECTIVE_III]: '#c5b358',
  [Rank.SERGEANT_I]: '#c0c0c0',
  [Rank.SERGEANT_II]: '#c0c0c0',
  [Rank.LIEUTENANT]: '#c5b358',
  [Rank.CAPTAIN]: '#c5b358',
  [Rank.COMMANDER]: '#c5b358',
  [Rank.DEPUTY_CHIEF]: '#c5b358',
  [Rank.CHIEF]: '#c5b358',
};

// --- CONFIGURATION: PASTE YOUR RANK IMAGE LINKS HERE ---
export const RANK_IMAGES: Record<Rank, string> = {
  [Rank.CIVILIAN]: 'https://placehold.co/150x50/333333/FFF?text=Civilian',
  [Rank.CADET]: 'https://placehold.co/150x50/1e3a6e/FFF?text=Cadet',
  [Rank.OFFICER_I]: 'https://lspd.gtaw.io/images/ranks/Police%20Officer%20I.png',
  [Rank.OFFICER_II]: 'https://lspd.gtaw.io/images/ranks/Police%20Officer%20II.png',
  [Rank.OFFICER_III]: 'https://lspd.gtaw.io/images/ranks/Police%20Officer%20III.png',
  [Rank.OFFICER_III_PLUS_1]: 'https://lspd.gtaw.io/images/ranks/Police%20Officer%20III+1.png',
  [Rank.DETECTIVE_I]: 'https://lspd.gtaw.io/images/ranks/Police%20Detective%20I.png',
  [Rank.DETECTIVE_II]: 'https://lspd.gtaw.io/images/ranks/Police%20Detective%20II.png',
  [Rank.DETECTIVE_III]: 'https://lspd.gtaw.io/images/ranks/Police%20Detective%20III.png',
  [Rank.SERGEANT_I]: 'https://lspd.gtaw.io/images/ranks/Police%20Sergeant%20I.png',
  [Rank.SERGEANT_II]: 'https://lspd.gtaw.io/images/ranks/Police%20Sergeant%20II.png',
  [Rank.LIEUTENANT]: 'https://lspd.gtaw.io/images/ranks/Police%20Lieutenant%20I.png',
  [Rank.CAPTAIN]: 'https://lspd.gtaw.io/images/ranks/Police%20Captain%20III.png',
  [Rank.COMMANDER]: 'https://placehold.co/150x50/1e3a6e/FFF?text=Cmdr',
  [Rank.DEPUTY_CHIEF]: 'https://lspd.gtaw.io/images/ranks/Assistant%20Chief%20of%20Police.png',
  [Rank.CHIEF]: 'https://placehold.co/150x50/1e3a6e/FFF?text=Chief',
};

// Mock Users
export const MOCK_USERS: Record<string, User> = {
  'u_admin': {
    id: 'u_admin',
    username: 'Miguel Martins', 
    rank: Rank.CHIEF,
    joinDate: '30 авг 2025, 21:45',
    posts: 15,
    avatarUrl: '',
    badges: [PlaqueType.FACTION_MANAGEMENT, PlaqueType.OO_CTSOB_METRO, PlaqueType.MD_PLATOON_D, PlaqueType.DB_LEADERSHIP],
    status: 'Online',
    signature: 'System Administrator',
    password: 'password',
    oocName: 'mr12',
    discord: 'l8sh82013'
  },
  'u1': {
    id: 'u1',
    username: 'Timothy Bradford',
    rank: Rank.SERGEANT_II,
    joinDate: 'Oct 12, 2004',
    posts: 1402, 
    avatarUrl: '', 
    badges: [PlaqueType.OO_CB_FOOTHILL, PlaqueType.MD_PLATOON_D, PlaqueType.FACTION_MANAGEMENT], 
    status: 'Online',
    signature: 'To Protect and to Serve.\nFoothill Watch Commander.',
    password: 'password',
    oocName: 'TimTheTank',
    discord: 'bradford#1234'
  },
  'u2': {
    id: 'u2',
    username: 'Lucy Chen',
    rank: Rank.OFFICER_II,
    joinDate: 'Jan 05, 2008',
    posts: 42,
    avatarUrl: '',
    badges: [PlaqueType.OO_CB_FOOTHILL],
    status: 'Patrolling',
    signature: 'Be the change.',
    password: 'password',
    oocName: 'Luce',
    discord: 'chen_fan'
  },
  'u3': {
    id: 'u3',
    username: 'Wade Grey',
    rank: Rank.LIEUTENANT,
    joinDate: 'Nov 01, 1995',
    posts: 5501,
    avatarUrl: '',
    badges: [PlaqueType.OO_CB_FOOTHILL, PlaqueType.FACTION_MANAGEMENT],
    status: 'Offline',
    signature: 'Watch Commander - Foothill Division\nMy office is always open.',
    password: 'password',
    oocName: 'GreyGhost',
    discord: 'sarge_grey'
  },
  'u4': {
    id: 'u4',
    username: 'Angela Lopez',
    rank: Rank.DETECTIVE_II,
    joinDate: 'Mar 15, 2006',
    posts: 320,
    avatarUrl: '',
    badges: [PlaqueType.DB_RHD],
    status: 'Online',
    signature: 'Major Crimes Division.',
    password: 'password',
    oocName: 'Angie',
    discord: 'lopez_law'
  },
  'u5': {
    id: 'u5',
    username: 'John Nolan',
    rank: Rank.OFFICER_I,
    joinDate: 'May 20, 2008',
    posts: 12,
    avatarUrl: '',
    badges: [PlaqueType.OO_CB_FOOTHILL],
    status: 'Patrolling',
    signature: '',
    password: 'password',
    oocName: 'Rookie40',
    discord: 'nolan_const'
  },
  'u6': {
    id: 'u6',
    username: 'Nyla Harper',
    rank: Rank.SERGEANT_I,
    joinDate: 'Feb 10, 2002',
    posts: 890,
    avatarUrl: '',
    badges: [PlaqueType.OO_CB_FOOTHILL, PlaqueType.MD_PLATOON_D, PlaqueType.MD_TRAINING],
    status: 'Offline',
    signature: 'Tactical Support Element',
    password: 'password',
    oocName: 'Warrior',
    discord: 'harper_tact'
  },
  'u7': {
    id: 'u7',
    username: 'Harry Bosch',
    rank: Rank.DETECTIVE_III, 
    joinDate: 'Aug 14, 1990',
    posts: 2100,
    avatarUrl: '',
    badges: [PlaqueType.DB_RHD],
    status: 'Online',
    signature: 'Everybody counts or nobody counts.',
    password: 'password',
    oocName: 'Hieronymus',
    discord: 'jazz_fan'
  }
};

// Rebuilt Categories
export const CATEGORIES: Category[] = [
  // --- ОБЩЕСТВЕННАЯ СЕКЦИЯ (PUBLIC) ---
  { 
    id: 'c_public_1', 
    name: 'Основной раздел', 
    description: '',
    section: 'ОБЩЕСТВЕННАЯ СЕКЦИЯ',
    image: 'https://i.imgur.com/8QzXy7m.png', 
    subforums: [
        { id: 'c_public_pr', name: 'Отдел по связям с общественностью' },
        { id: 'c_public_lic', name: 'Лицензирование и разрешения' },
        { id: 'c_public_complaints', name: 'Раздел жалоб и благодарностей' },
        { id: 'c_public_records', name: 'Запросы криминального прошлого' },
        { id: 'c_public_crime', name: 'Сообщить о преступлении' },
        { id: 'c_public_ridealong', name: 'Программа пробного патруля (Ride Along)' }
    ],
    isRestricted: false 
  },
  { 
    id: 'c_public_2', 
    name: 'Трудоустройство', 
    description: '',
    section: 'ОБЩЕСТВЕННАЯ СЕКЦИЯ',
    image: 'https://placehold.co/600x100/111/FFF?text=EMPLOYMENT+CLOSED+(CHANGE+ME)', 
    subforums: [
        { id: 'c_emp_academy', name: 'Полицейская академия' },
        { id: 'c_emp_civilian', name: 'Трудоустройство гражданским сотрудником' },
        { id: 'c_emp_backhome', name: '(( Программа возвращения домой (BACKHOME) ))' },
        { id: 'c_emp_leo', name: '(( Программа адаптации опытных игроков LEO ))' }
    ],
    isRestricted: false 
  },

  // --- ВНУТРЕННЯЯ СЕКЦИЯ (INTERNAL) ---
  { 
    id: 'c_internal_1', 
    name: 'Руководства и политика департамента', 
    description: 'Руководства и политика департамента.',
    section: 'ВНУТРЕННЯЯ СЕКЦИЯ',
    subforums: [
        { id: 'c_int_manual', name: 'Официальное руководство департамента полиции' },
        { id: 'c_int_guides', name: '(( Игровые гайды от игроков ))' }
    ],
    isRestricted: true
  },
  { 
    id: 'c_internal_2', 
    name: 'Кадровые объявления', 
    description: 'Кадровые объявления. Раздел служебных объявлений касающихся кадрового состава департамента.',
    section: 'ВНУТРЕННЯЯ СЕКЦИЯ',
    subforums: [
        { id: 'c_hr_promo', name: 'Повышения, понижения и переводы' },
        { id: 'c_hr_warn', name: 'Предупреждения и выговоры' },
        { id: 'c_hr_fire', name: 'Отстранения и увольнения' },
        { id: 'c_hr_award', name: 'Награды' }
    ],
    isRestricted: true
  },

  // --- СЛУЖЕБНЫЕ ОТЧЕТЫ (REPORTS) ---
  { 
    id: 'c_reports_1', 
    name: 'Ситуационный отчет', 
    description: 'Ситуационный отчет. Раздел для отчётности об любых инцидентах.',
    section: 'СЛУЖЕБНЫЕ ОТЧЕТЫ',
    subforums: [
        { id: 'c_rep_form', name: 'Форма отчета' },
        { id: 'c_rep_force', name: 'Отчёт о применении смертельной силы' },
        { id: 'c_rep_seize', name: 'Отчёт об изъятии оружия' },
        { id: 'c_rep_archive', name: 'Архив' }
    ],
    isRestricted: true
  },

  // --- ОФИС ОПЕРАЦИЙ (OPERATIONS) ---
  { 
    id: 'c_ops_foothill', 
    name: 'Участок Футхилл (Foothill Area)', 
    description: 'Станция Футхилл.',
    section: 'ОФИС ОПЕРАЦИЙ',
    image: 'https://i.ytimg.com/vi/gn7jstR3_f8/maxresdefault.jpg', 
    subforums: [
        { id: 'c_fh_info', name: 'Информационный стенд' },
        { id: 'c_fh_ftp', name: 'Программа полевой подготовки (FTP)' },
        { id: 'c_fh_slo', name: 'Программа ведущих офицеров (SLO)' },
        { id: 'c_fh_archive', name: 'Архив' }
    ],
    isRestricted: true,
    // Restrict top level visibility too? Or just subforums. Let's restrict top level to general patrol.
    allowedPlaques: [PlaqueType.OO_CB_FOOTHILL, PlaqueType.OO_CB_NE] 
  },
  { 
    id: 'c_ops_detective', 
    name: 'Детективная секция (Detective Section)', 
    description: 'Детективная секция занимается расследованием преступлений.',
    section: 'ОФИС ОПЕРАЦИЙ',
    image: 'https://www.upload.ee/image/18860367/DD.png', 
    subforums: [
        { id: 'c_det_rhd', name: 'RHD (Robbery Homicide Division)' },
        { id: 'c_det_gnd', name: 'GND (Gang and Narcotics Division)' },
        { id: 'c_det_ged', name: 'GED (Gang Enforcement Detail)' }
    ],
    isRestricted: true,
    allowedPlaques: [
        PlaqueType.DB_RHD, 
        PlaqueType.DB_GND, 
        PlaqueType.DB_IAD, 
        PlaqueType.DB_LEADERSHIP, 
        PlaqueType.DB_FS_GED
    ]
  },
  { 
    id: 'c_ops_metro', 
    name: 'Дивизион Метрополитен (Metropolitan Division)', 
    description: 'Элитное подразделение, занимающееся решением ситуаций повышенного риска.',
    section: 'ОФИС ОПЕРАЦИЙ',
    image: 'https://avatars.mds.yandex.net/i?id=96b0829d05008c775fdb5a00f181884ba00b5127-5755593-images-thumbs&n=13', 
    subforums: [
        { id: 'c_met_swat', name: 'D Platoon (SWAT)' },
        { id: 'c_met_esd', name: 'ESD (Emergency Services Detail)' },
        { id: 'c_met_k9', name: 'K-9 Platoon' }
    ],
    isRestricted: true,
    allowedPlaques: [
        PlaqueType.MD_PLATOON_D, 
        PlaqueType.MD_PLATOON_K9, 
        PlaqueType.MD_ESD, 
        PlaqueType.MD_TRAINING,
        PlaqueType.OO_CTSOB_METRO
    ]
  },

  // --- SUBFORUMS (Actual Categories) ---
  
  // Foothill Subforums
  { 
      id: 'c_fh_info', name: 'Информационный стенд', description: 'Info', 
      parentId: 'c_ops_foothill', isRestricted: true, 
      allowedPlaques: [PlaqueType.OO_CB_FOOTHILL] 
  },
  { 
      id: 'c_fh_ftp', name: 'Программа полевой подготовки (FTP)', description: 'FTP', 
      parentId: 'c_ops_foothill', isRestricted: true, 
      allowedPlaques: [PlaqueType.OO_CB_FOOTHILL, PlaqueType.PD_FTP_HEAD] 
  },
  
  // Detective Subforums
  { 
      id: 'c_det_rhd', name: 'RHD', description: 'RHD', 
      parentId: 'c_ops_detective', isRestricted: true, 
      allowedPlaques: [PlaqueType.DB_RHD, PlaqueType.DB_LEADERSHIP] 
  },
  { 
      id: 'c_det_ged', name: 'GED', description: 'GED', 
      parentId: 'c_ops_detective', isRestricted: true, 
      allowedPlaques: [PlaqueType.DB_FS_GED, PlaqueType.DB_LEADERSHIP] 
  },

  // Metro Subforums
  { 
      id: 'c_met_swat', name: 'D Platoon (SWAT)', description: 'SWAT', 
      parentId: 'c_ops_metro', isRestricted: true, 
      allowedPlaques: [PlaqueType.MD_PLATOON_D, PlaqueType.OO_CTSOB_METRO] 
  },
  { 
      id: 'c_met_k9', name: 'K-9 Platoon', description: 'K9', 
      parentId: 'c_ops_metro', isRestricted: true, 
      allowedPlaques: [PlaqueType.MD_PLATOON_K9, PlaqueType.OO_CTSOB_METRO] 
  },
];

export const THREADS: Thread[] = [
  { id: 't1', categoryId: 'c_ops_foothill', title: '[P-2] Probationary Officer Report - John Nolan', authorId: 'u5', createdAt: 'Oct 20, 2024', views: 120, replies: 4, lastPostDate: 'Today, 10:42', lastPostAuthorId: 'u1' },
  { id: 't2', categoryId: 'c_det_rhd', title: 'CASE FILE: 24-991 "Golden State"', authorId: 'u7', createdAt: 'Sep 15, 2024', views: 450, replies: 12, lastPostDate: 'Yesterday, 19:15', lastPostAuthorId: 'u4' },
  { id: 't3', categoryId: 'c_met_swat', title: 'SWAT Training Schedule - November 2025', authorId: 'u6', createdAt: 'Nov 01, 2025', views: 89, replies: 15, lastPostDate: 'Today, 08:30', lastPostAuthorId: 'u6' },
  { id: 't4', categoryId: 'c_public_1', title: 'Press Release: Downtown Incident', authorId: 'u1', createdAt: 'Aug 30, 2025', views: 1200, replies: 0, lastPostDate: 'Aug 30, 2025', lastPostAuthorId: 'u1' },
  { id: 't5', categoryId: 'c_reports_1', title: 'UOFIR #56 - 02/12/2025', authorId: 'u2', createdAt: 'Dec 02, 2025', views: 55, replies: 2, lastPostDate: '23 minutes ago', lastPostAuthorId: 'u3' },
  { id: 't6', categoryId: 'c_det_ged', title: 'GANG INJUNCTION: Davis Neighborhood', authorId: 'u7', createdAt: 'Dec 05, 2025', views: 200, replies: 5, lastPostDate: 'Today, 12:00', lastPostAuthorId: 'u7' }
];

export const POSTS: Post[] = [
  { id: 'p1', threadId: 't1', authorId: 'u5', content: 'Reporting for duty. Day 1 summary attached.', createdAt: 'Oct 20, 2024' },
  { id: 'p2', threadId: 't1', authorId: 'u1', content: 'Good work, boot. Watch your spacing.', createdAt: 'Oct 20, 2024' },
  { id: 'p3', threadId: 't2', authorId: 'u7', content: 'Initial evidence gathered from the scene.', createdAt: 'Sep 15, 2024' },
  { id: 'p4', threadId: 't2', authorId: 'u4', content: 'Updating file with ballistics report.', createdAt: 'Sep 16, 2024' },
  { id: 'p5', threadId: 't3', authorId: 'u6', content: 'Mandatory range day for D Platoon on Friday.', createdAt: 'Nov 01, 2025' },
  { id: 'p6', threadId: 't6', authorId: 'u7', content: 'Initiating injunction protocols for 18th Street.', createdAt: 'Dec 05, 2025' }
];
