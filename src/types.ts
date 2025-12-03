
export enum Rank {
  CIVILIAN = 'Civilian',
  CADET = 'Cadet',
  OFFICER_I = 'Police Officer I',
  OFFICER_II = 'Police Officer II',
  OFFICER_III = 'Police Officer III',
  OFFICER_III_PLUS_1 = 'Police Officer III+1',
  DETECTIVE_I = 'Police Detective I',
  DETECTIVE_II = 'Police Detective II',
  DETECTIVE_III = 'Police Detective III',
  SERGEANT_I = 'Sergeant I',
  SERGEANT_II = 'Sergeant II',
  LIEUTENANT = 'Lieutenant',
  CAPTAIN = 'Captain',
  COMMANDER = 'Commander',
  DEPUTY_CHIEF = 'Deputy Chief',
  CHIEF = 'Chief of Police'
}

export enum PlaqueType {
  CIVILIAN = 'Civilian',
  FACTION_MANAGEMENT = 'Faction Management',
  
  // Office of Operations - Control Bureau (Blue)
  OO_CB_FOOTHILL = 'OO-CB: Foothill Patrole Area',
  OO_CB_NE = 'OO-CB: North East Police Division',
  
  // Office of Operations - CTSOB (Metro Header)
  OO_CTSOB_METRO = 'OO-CTSOB: Metropolitain Division',

  // Metropolitan Division (Purple)
  MD_PLATOON_D = 'MD: Platoon D',
  MD_PLATOON_K9 = 'MD: Platoon K9',
  MD_ESD = 'MD: ESD Tactical Medic',
  MD_SCHOOL = 'MD: School',
  MD_TRAINING = 'MD: Training Division',

  // Detective Bureau (Orange/Gold)
  DB_RHD = 'DB: RHD and Support Section',
  DB_GND = 'DB: Gang&Narcotics Division',
  DB_IAD = 'DB: IAD',
  DB_LEADERSHIP = 'DB: Detective Leadership',
  
  // Field Section (GED - Dark/Grey)
  DB_FS_GED = 'DB-FS: Gang Enforcement Detail',
  
  // Police Dept General
  PD_TRAINING = 'PD: Training Division',
  PD_FTP_HEAD = 'PD:Field Training Programm Head'
}

export interface User {
  id: string;
  username: string;
  rank: Rank;
  joinDate: string;
  posts: number;
  avatarUrl: string;
  badges: PlaqueType[];
  signature?: string;
  status: 'Online' | 'Offline' | 'Patrolling';
  password?: string; // Simple mock password
  oocName?: string;
  discord?: string;
}

export interface Post {
  id: string;
  threadId: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface Thread {
  id: string;
  categoryId: string;
  title: string;
  authorId: string;
  createdAt: string;
  views: number;
  replies: number;
  lastPostDate: string;
  lastPostAuthorId: string;
  isPinned?: boolean;
  isLocked?: boolean;
}

export interface SubforumLink {
    id: string;
    name: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  
  // New visual/structure properties
  section?: string;        // Grouping (e.g., "Public Section")
  image?: string;          // Banner image URL
  subforums?: SubforumLink[];    // List of sub-links
  isRestricted?: boolean;  // If true, hidden from Civilians
  allowedPlaques?: PlaqueType[]; // Only users with these badges can see this
  externalLink?: string;   // If present, acts as a link block
}

export interface LinkBlock {
    title: string;
    description: string;
    url: string;
    icon?: string;
}
