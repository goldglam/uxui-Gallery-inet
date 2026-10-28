import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'harvesta',
    title: 'Harvesta',
    client: 'AgriTech Solutions Co., Ltd.',
    tagline: 'ระบบบริหารจัดการข้อมูลการเกษตรและตรวจเช็คอุปกรณ์ IoT ในแปลงปลูก',
    description: 'แพลตฟอร์มจัดการข้อมูลการเกษตร ระบบบริหารจัดการข้อมูลทางการเกษตรที่ช่วยให้ผู้ใช้งานสามารถติดตามผลผลิต ตรวจสอบข้อมูลแปลงเพาะปลูก และวิเคราะห์ข้อมูลผ่าน Dashboard แบบเรียลไทม์ เพื่อช่วยเพิ่มประสิทธิภาพในการวางแผนและการตัดสินใจ',
    detailedDescription: 'ระบบบริหารจัดการแปลงเกษตรอัจฉริยะ ออกแบบระบบสถาปัตยกรรมข้อมูลให้เข้าใจง่ายสำหรับเกษตรกรยุคใหม่และผู้จัดการฟาร์มอุตสาหกรรม เชื่อมต่อข้อมูลเซนเซอร์ IoT ทั้งสภาพดิน อุณหภูมิ ความชื้น และค่าสารอาหาร พร้อมระบบแจ้งเตือนฉุกเฉินเมื่อเกิดความผิดปกติในระบบชลประทาน',
    category: 'Smart Farm',
    platform: 'Multi-platform',
    duration: '2 months',
    type: 'Factory / Agriculture',
    year: 2026,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80',
    screens: [
      {
        title: 'Register & Onboarding',
        description: 'หน้าสำหรับการสมัครสมาชิกและลงทะเบียนฟาร์ม ออกแบบให้เรียบง่ายลดความซับซ้อน',
        image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80',
        type: 'register'
      },
      {
        title: 'Real-time Field Telemetry Dashboard',
        description: 'แผงควบคุมกลางแสดงค่าดัชนีแปลงปลูก ความชื้น และอัตราการเจริญเติบโต',
        image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=80',
        type: 'dashboard'
      },
      {
        title: 'Torrava - Infrastructure Landing Page',
        description: 'Ready to Manage Infrastructure as One System? นำเสนอภาพรวมการผสานระบบ IoT ทั้งหมด',
        image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=1200&q=80',
        type: 'landing'
      }
    ],
    tokens: {
      typography: 'Sukhumvit Set, Plus Jakarta Sans',
      primaryColor: { name: 'Green Mint', hex: '#3BE29F' },
      secondaryColors: [
        { name: 'Olive Forest', hex: '#5C8B5E' },
        { name: 'Sky Cyan Mist', hex: '#F3FEFF' },
        { name: 'Deep Navy', hex: '#202A45' }
      ]
    },
    metrics: {
      likes: 142,
      views: 1890,
      rating: 4.9
    },
    tags: ['DATA', 'Website', 'Factory', 'IoT', 'Mobile']
  },
  {
    id: 'finflow',
    title: 'FinFlow',
    client: 'FinFlow Global Capital',
    tagline: 'แพลตฟอร์มสำหรับจัดการการเงินรายรับรายจ่ายและวิเคราะห์ข้อมูลผ่าน Dashboard',
    description: 'ระบบแดชบอร์ดบริหารสินทรัพย์และกระแสเงินสดสำหรับธุรกิจและบุคคลทั่วไป รองรับการวิเคราะห์แนวโน้มการลงทุน การจัดสรรงบประมาณ และสรุปภาษีอัตโนมัติ',
    detailedDescription: 'ออกแบบ UX Flow การทำธุรกรรมและจัดการบัญชีหลายสกุลเงินให้ลื่นไหล รวดเร็ว และปลอดภัยตามมาตรฐานสากล พร้อมเครื่องมือสร้างแผนภูมิการเงินแบบโต้ตอบได้',
    category: 'FinTech',
    platform: 'Website',
    duration: '3 months',
    type: 'Financial SaaS',
    year: 2026,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    screens: [
      {
        title: 'Financial Overview Dashboard',
        description: 'รายงานยอดเงินสดหมุนเวียน พอร์ตการลงทุน และสถานะลูกหนี้การค้า',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
        type: 'dashboard'
      },
      {
        title: 'Account Onboarding & KYC',
        description: 'ขั้นตอนการยืนยันตัวตนระดับองค์กรแบบ 3-step verification',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        type: 'register'
      }
    ],
    tokens: {
      typography: 'Inter, JetBrains Mono',
      primaryColor: { name: 'FinFlow Emerald', hex: '#10B981' },
      secondaryColors: [
        { name: 'Dark Slate', hex: '#0F172A' },
        { name: 'Light Mint', hex: '#E1FE7D' }
      ]
    },
    metrics: {
      likes: 98,
      views: 1420,
      rating: 4.8
    },
    tags: ['DATA', 'Website', 'FinTech', 'SaaS']
  },
  {
    id: 'medicare',
    title: 'MediCare+',
    client: 'Bangkok Metropolitan Health Group',
    tagline: 'Where care meets innovation - ระบบบริการจัดการคนไข้สำหรับโรงพยาบาล',
    description: 'ระบบบริการจัดการคนไข้สำหรับโรงพยาบาล ช่วยให้ผู้ป่วยสามารถตรวจเช็คคิวพบแพทย์ จองเวลานัดหมาย และตรวจสอบประวัติการรักษาได้อย่างสะดวก รวดเร็ว และแม่นยำ',
    detailedDescription: 'ยกระดับประสบการณ์ผู้ป่วย (Patient Experience) ด้วยดีไซน์ที่เน้นความเข้าถึงง่าย (High Accessibility) ตัวอักษรขนาดสบายตา สีสันให้ความอบอุ่นและไว้วางใจ ลดระยะเวลารอคิวที่เคาน์เตอร์ลงได้กว่า 45%',
    category: 'Healthcare',
    platform: 'Multi-platform',
    duration: '4 months',
    type: 'Healthcare System',
    year: 2026,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    screens: [
      {
        title: 'Doctor Appointment & Queue System',
        description: 'หน้าจองคิวตรวจและเลือกแพทย์ผู้เชี่ยวชาญ',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
        type: 'landing'
      },
      {
        title: 'Patient Portal Dashboard',
        description: 'หน้าแสดงผลการตรวจและบันทึกประวัติสุขภาพทางอิเล็กทรอนิกส์ (EHR)',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1000&q=80',
        type: 'dashboard'
      }
    ],
    tokens: {
      typography: 'Plus Jakarta Sans, Sukhumvit Set',
      primaryColor: { name: 'Hospital Cyan', hex: '#00F0FF' },
      secondaryColors: [
        { name: 'Clean Mint', hex: '#3BE29F' },
        { name: 'Deep Navy', hex: '#1E293B' }
      ]
    },
    metrics: {
      likes: 185,
      views: 2450,
      rating: 5.0
    },
    tags: ['Healthcare', 'Mobile', 'Web', 'Clinic']
  },
  {
    id: 'myhub',
    title: 'MyHub Supply Chain',
    client: 'Pacific Logistics Logistics Network',
    tagline: 'ระบบจัดการซัพพลายเชน การจัดเก็บสต็อกสินค้า และการกระจายสินค้า',
    description: 'แพลตฟอร์มบริหารคลังสินค้าอัจฉริยะ (WMS) และจัดการกองยานพาหนะ ช่วยให้ทีมงานตรวจสอบเส้นทางจัดส่ง เช็คสต็อกคงคลังแบบ Real-time และลดขั้นตอนเอกสารลง 80%',
    detailedDescription: 'ออกแบบสำหรับบุคลากรทั้งในสำนักงานและคนหน้างานในคลังสินค้า รองรับการสแกนบาร์โค้ด QR code และทำงานในโหมดออฟไลน์เพื่อความต่อเนื่องของกระบวนการส่งสินค้า',
    category: 'Logistics',
    platform: 'Website',
    duration: '2.5 months',
    type: 'Logistics & Warehouse',
    year: 2026,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    screens: [
      {
        title: 'Warehouse Control Tower',
        description: 'หน้ามอนิเตอร์สถานะการเคลื่อนย้ายสินค้าและสล็อตจัดเก็บ',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
        type: 'admin'
      }
    ],
    tokens: {
      typography: 'Inter, IBM Plex Sans',
      primaryColor: { name: 'Transit Orange', hex: '#F97316' },
      secondaryColors: [
        { name: 'Slate Blue', hex: '#202A45' },
        { name: 'Silver White', hex: '#F8FAFC' }
      ]
    },
    metrics: {
      likes: 76,
      views: 950,
      rating: 4.7
    },
    tags: ['Logistics', 'Website', 'Enterprise']
  },
  {
    id: 'plantland',
    title: 'Plantland B2B',
    client: 'Plantland Green Living',
    tagline: 'Hello! Welcome to Plantland - ตลาดต้นไม้และสินค้าเกษตรเพื่อชุมชน',
    description: 'แอปพลิเคชันตลาดต้นไม้และอุปกรณ์จัดสวน B2B เชื่อมโยงสวนพันธุ์ไม้กับร้านค้าปลีก ออกแบบด้วย Visual สไตล์ธรรมชาติ สดชื่น เข้าถึงง่าย',
    detailedDescription: 'มุ่งเน้นการค้นหาสายพันธุ์ไม้ตามสภาพแสง การรดน้ำ และขนาดพื้นที่ พร้อมระบบให้คำปรึกษาด้านการเพาะปลูกและการรับประกันความสมบูรณ์ของต้นไม้',
    category: 'E-Commerce',
    platform: 'Mobile',
    duration: '1.5 months',
    type: 'B2B Marketplace',
    year: 2026,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1200&q=80',
    screens: [
      {
        title: 'Welcome & Mobile Login',
        description: 'ภาพรวมหน้าต้อนรับสไตล์โมเดิร์นพร้อมโทนสีเขียวออร์แกนิก',
        image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80',
        type: 'register'
      }
    ],
    tokens: {
      typography: 'Sukhumvit Set, Plus Jakarta Sans',
      primaryColor: { name: 'Leaf Green', hex: '#3BE29F' },
      secondaryColors: [
        { name: 'Warm Lime', hex: '#E1FE7D' },
        { name: 'Deep Evergreen', hex: '#164E63' }
      ]
    },
    metrics: {
      likes: 112,
      views: 1670,
      rating: 4.9
    },
    tags: ['B2B commerce', 'Mobile', 'GreenTech']
  },
  {
    id: 'eatright',
    title: 'EATRIGHT',
    client: 'Nutrition Science Lab',
    tagline: 'แอปพลิเคชันแนะนำอาหารสุขภาพและคำนวณสารอาหารเฉพาะบุคคล',
    description: 'ระบบแนะนำโภชนาการที่ออกแบบตามความต้องการเฉพาะของร่างกาย วิเคราะห์เมนูอาหาร และบันทึกแคลอรี่ผ่านระบบกล้อง AI อัจฉริยะ',
    category: 'Healthcare',
    platform: 'Mobile',
    duration: '2 months',
    type: 'Health & Nutrition App',
    year: 2026,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
    screens: [
      {
        title: 'Nutrient Balance Tracker',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
        type: 'mobile'
      }
    ],
    tokens: {
      typography: 'Inter',
      primaryColor: { name: 'Vibrant Green', hex: '#10B981' },
      secondaryColors: [
        { name: 'Lemon Yellow', hex: '#E1FE7D' },
        { name: 'Charcoal', hex: '#1E293B' }
      ]
    },
    metrics: {
      likes: 64,
      views: 820,
      rating: 4.6
    },
    tags: ['Health', 'Mobile', 'AI']
  },
  {
    id: 'seo-audit-pro',
    title: 'SEO Audit Pro',
    client: 'Digital Matrix Media',
    tagline: 'ระบบตรวจสอบวิเคราะห์ความสมบูรณ์ของเว็บไซต์และอันดับการค้นหา',
    description: 'เครื่องมือตรวจสอบ Technical SEO และประเมิน Core Web Vitals รายวัน แสดงผลคะแนนพร้อมข้อเสนอแนะเชิงลึกสำหรับนักพัฒนาและทีมการตลาด',
    category: 'Enterprise',
    platform: 'Dashboard',
    duration: '1 month',
    type: 'Analytics Platform',
    year: 2026,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    screens: [
      {
        title: 'Website Health & Keyword Metrics',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
        type: 'dashboard'
      }
    ],
    tokens: {
      typography: 'Space Grotesk, JetBrains Mono',
      primaryColor: { name: 'Audit Amber', hex: '#F59E0B' },
      secondaryColors: [
        { name: 'Deep Navy', hex: '#0F172A' },
        { name: 'Soft Yellow', hex: '#FEF3C7' }
      ]
    },
    metrics: {
      likes: 83,
      views: 1100,
      rating: 4.7
    },
    tags: ['Analytics', 'Dashboard', 'SEO', 'Website']
  }
];

export const CATEGORIES = [
  'All',
  'Smart Farm',
  'FinTech',
  'Healthcare',
  'Logistics',
  'E-Commerce',
  'Enterprise'
] as const;

export const FEATURE_CATEGORIES = [
  {
    key: 'register',
    title: 'Register',
    icon: 'UserPlus',
    description: 'สำหรับการสมัครสมาชิกหรือสร้างบัญชีผู้ใช้ใหม่บนระบบดิจิทัล โดยมักออกแบบให้มีความเรียบง่าย ประกอบด้วยช่องกรอกข้อมูลที่จำเป็นเท่านั้น เพื่อลดขั้นตอนและเพิ่มอัตราการสมัครสำเร็จ (Conversion Rate)',
    relatedProjects: ['harvesta', 'plantland']
  },
  {
    key: 'dashboard',
    title: 'Dashboard',
    icon: 'LayoutDashboard',
    description: 'หน้าแดชบอร์ดสรุปภาพรวมข้อมูลและตัวชี้วัดสำคัญ (KPIs) นำเสนอผ่าน Data Visualization ที่อ่านง่าย ช่วยให้ผู้บริหารและทีมงานตัดสินใจได้อย่างรวดเร็วและแม่นยำ',
    relatedProjects: ['finflow', 'harvesta', 'seo-audit-pro']
  },
  {
    key: 'landing',
    title: 'Landing page',
    icon: 'Globe',
    description: 'หน้าแรกสำหรับสื่อสาร Value Proposition สร้างความน่าเชื่อถือ และดึงดูดผู้ใช้งานด้วย Visual Storytelling ที่โดดเด่น นำทางสู่ Call to Action อย่างเป็นธรรมชาติ',
    relatedProjects: ['medicare', 'harvesta']
  },
  {
    key: 'admin',
    title: 'Admin page',
    icon: 'ShieldCheck',
    description: 'ระบบจัดการหลังบ้านสำหรับผู้ดูแล ควบคุมสิทธิ์การใช้งาน จัดการข้อมูลผู้ใช้ ตรวจสอบประวัติการทำงาน และปรับแต่งการตั้งค่าระบบอย่างปลอดภัย',
    relatedProjects: ['myhub', 'finflow']
  }
] as const;
