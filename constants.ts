import { Category } from './types';
import { 
  BookOpen, 
  Database, 
  Globe, 
  Library, 
  Monitor, 
  Search, 
  Settings, 
  Tag 
} from 'lucide-react';

export const PREDEFINED_TOPICS: Category[] = [
  {
    id: 'srr-legacy',
    name: 'Dr. S.R. Ranganathan',
    description: 'Life, legacy, Five Laws, and contributions of the Father of Library Science in India.',
    icon: 'Library'
  },
  {
    id: 'class-cat',
    name: 'Classification & Cataloging',
    description: 'DDC, UDC, AACR2, MARC21, and RDA standards.',
    icon: 'Tag'
  },
  {
    id: 'ref-info',
    name: 'Reference & Information Sources',
    description: 'Primary, secondary, tertiary sources and reference services.',
    icon: 'Search'
  },
  {
    id: 'lib-mgmt',
    name: 'Library Management',
    description: 'Administration, budgeting, HRM, and library planning.',
    icon: 'Settings'
  },
  {
    id: 'ict',
    name: 'ICT in Libraries',
    description: 'Automation, RFID, digital libraries, and software like Koha.',
    icon: 'Monitor'
  },
  {
    id: 'info-retrieval',
    name: 'Information Retrieval',
    description: 'Indexing systems, search strategies, and search engines.',
    icon: 'Database'
  },
  {
    id: 'soc-legal',
    name: 'Library & Society',
    description: 'Library legislation, IPR, copyright, and library associations.',
    icon: 'Globe'
  }
];

export const ICONS: Record<string, any> = {
  Tag: Tag,
  Search: Search,
  Settings: Settings,
  Monitor: Monitor,
  Database: Database,
  Globe: Globe,
  Library: Library,
  BookOpen: BookOpen
};