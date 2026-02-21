import React, { useState, useEffect, useRef, memo } from 'react';
import {
    Github,
    Linkedin,
    Twitter,
    MapPin,
    Mail,
    ExternalLink,
    Terminal,
    Cpu,
    Database,
    BrainCircuit,
    ArrowUpRight,
    Briefcase,
    Quote,
    Send,
    Star,
    Sun,
    Moon,
    Smartphone,
    X,
    Layers,
    Globe,
    Zap,
    LayoutDashboard
} from 'lucide-react';

// --- TYPES ---

type Theme = 'light' | 'dark';

interface GlobalStylesProps {
    theme: Theme;
}

interface CardProps {
    children: React.ReactNode;
    className?: string;
    noPadding?: boolean;
    delay?: number;
    theme: Theme;
    onClick?: () => void;
}

interface TagProps {
    text: string;
    icon?: React.ElementType;
    theme: Theme;
}

interface SocialButtonProps {
    icon: React.ElementType;
    href: string;
    label: string;
    theme: Theme;
}

interface Project {
    id: number;
    title: string;
    shortDesc: string;
    longDescription: string;
    image: string;
    gallery: string[];
    tags: string[];
    icon: React.ElementType;
    color: string;
    link: string;
    size: "large" | "medium";
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
    theme: Theme;
}

interface Service {
    title: string;
    desc: string;
    icon: React.ElementType;
    color: string;
}

// --- STYLES & ANIMATIONS ---

const GlobalStyles = ({ theme }: GlobalStylesProps) => (
    <style>{`
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-scroll {
      animation: scroll 20s linear infinite;
    }
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .glass-card {
      background: ${theme === 'dark' ? 'rgba(20, 20, 22, 0.6)' : 'rgba(239, 233, 227, 0.65)'};
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(217, 207, 199, 0.6)'};
      box-shadow: ${theme === 'dark' ? '0 4px 30px rgba(0, 0, 0, 0.1)' : '0 4px 20px -2px rgba(201, 181, 156, 0.1), 0 10px 15px -3px rgba(201, 181, 156, 0.05)'};
    }
    .grain-overlay {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 50;
      opacity: ${theme === 'dark' ? '0.4' : '0.15'};
    }
    .reveal {
      opacity: 0;
      transform: translateY(20px);
      animation: revealAnim 0.8s cubic-bezier(0.5, 0, 0, 1) forwards;
    }
    @keyframes revealAnim {
      to { opacity: 1; transform: translateY(0); }
    }
    /* Custom Scrollbar Styling */
    .custom-scrollbar::-webkit-scrollbar {
      width: 5px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(201, 181, 156, 0.4)'};
      border-radius: 0px; 
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(201, 181, 156, 0.6)'};
    }
    
    /* Typewriter Cursor */
    .cursor-blink {
      display: inline-block;
      width: 6px;
      height: 14px;
      background-color: ${theme === 'dark' ? '#4ade80' : '#16a34a'};
      margin-left: 2px;
      animation: blink 1s step-end infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    /* Masonry Grid Logic */
    .masonry-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: minmax(100px, auto);
      gap: 16px;
      grid-auto-flow: dense; 
    }
    @media (max-width: 640px) {
      .masonry-grid {
        display: flex;
        flex-direction: column;
      }
    }
  `}</style>
);

// --- REUSABLE COMPONENTS ---

// Using memo to prevent re-renders of all cards when one updates
const Card = memo(({ children, className = "", noPadding = false, delay = 0, theme, onClick }: CardProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onClick={onClick}
            style={{ animationDelay: `${delay}ms` }}
            className={`
        reveal glass-card group relative overflow-hidden rounded-2xl 
        transition-all duration-500 
        ${theme === 'dark' ? 'hover:border-white/20' : 'hover:border-[#C9B59C]/50'}
        ${noPadding ? 'p-0' : 'p-6 sm:p-8'} 
        ${onClick ? 'cursor-pointer hover:scale-[1.01]' : ''}
        ${className}
      `}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(239, 233, 227, 0.4)'}, transparent 40%)`,
                }}
            />
            <div className="relative z-10 h-full flex flex-col">
                {children}
            </div>
        </div>
    );
});

const Tag = ({ text, icon: Icon, theme }: TagProps) => (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-default select-none
    ${theme === 'dark'
            ? 'bg-white/5 text-zinc-300 border-white/5 hover:bg-white/10 hover:border-white/20'
            : 'bg-[#F9F8F6] text-[#5e5852] border-[#D9CFC7] hover:bg-white hover:border-[#C9B59C]'}
  `}>
        {Icon && <Icon size={12} className={theme === 'dark' ? "text-blue-500" : "text-[#8a7a68]"} />}
        {text}
    </span>
);

const SocialButton = ({ icon: Icon, href, label, theme }: SocialButtonProps) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center w-full h-12 border rounded-xl transition-all duration-300 group
      ${theme === 'dark'
                ? 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/20'
                : 'bg-[#F9F8F6] hover:bg-white border-[#D9CFC7] hover:border-[#C9B59C] shadow-sm'
            }
    `}
        aria-label={label}
    >
        <Icon size={20} className={`transition-colors ${theme === 'dark' ? 'text-zinc-400 group-hover:text-blue-400' : 'text-[#8a7a68] group-hover:text-[#5e5852]'}`} />
    </a>
);

// --- SERVICES COMPONENT (Expanded) ---
const Services = ({ theme }: { theme: Theme }) => {
    const services: Service[] = [
        {
            title: "Generative AI",
            desc: "RAG & Agents",
            icon: BrainCircuit,
            color: theme === 'dark' ? "text-purple-400" : "text-[#8a7a68]"
        },
        {
            title: "B2B SaaS",
            desc: "Dashboards & CRM",
            icon: LayoutDashboard,
            color: theme === 'dark' ? "text-blue-400" : "text-[#8a7a68]"
        },
        {
            title: "B2C Platforms",
            desc: "Web Apps & Social",
            icon: Globe,
            color: theme === 'dark' ? "text-cyan-400" : "text-[#8a7a68]"
        },
        {
            title: "Mobile Apps",
            desc: "iOS & Android",
            icon: Smartphone,
            color: theme === 'dark' ? "text-orange-400" : "text-[#8a7a68]"
        },
        {
            title: "Integrations",
            desc: "API & Webhooks",
            icon: Zap,
            color: theme === 'dark' ? "text-yellow-400" : "text-[#8a7a68]"
        },
        {
            title: "Backend",
            desc: "Scalable Systems",
            icon: Database,
            color: theme === 'dark' ? "text-emerald-400" : "text-[#8a7a68]"
        }
    ];

    return (
        <div className="flex flex-col h-full justify-center">
            <div className={`flex items-center gap-2 mb-4 pb-2 border-b border-dashed border-opacity-30 shrink-0 ${theme === 'dark' ? 'border-gray-400' : 'border-[#8a7a68]'}`}>
                <Cpu size={16} className={theme === 'dark' ? 'text-zinc-300' : 'text-[#5e5852]'} />
                <h3 className={`font-mono text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-zinc-300' : 'text-[#5e5852]'}`}>Core Services</h3>
            </div>

            <div className="grid grid-cols-3 gap-2 h-full">
                {services.map((service, idx) => (
                    <div key={idx} className={`flex flex-col items-center justify-center text-center p-2 rounded-xl transition-all duration-300
                    ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-[#F9F8F6]'}`}>
                        <div className={`p-2 rounded-lg mb-2 ${theme === 'dark' ? 'bg-white/5' : 'bg-white border border-[#D9CFC7]'}`}>
                            <service.icon size={20} className={service.color} />
                        </div>
                        <h4 className={`text-xs sm:text-sm font-bold mb-0.5 ${theme === 'dark' ? 'text-zinc-200' : 'text-[#4A4A4A]'}`}>{service.title}</h4>
                        <p className={`text-[10px] leading-tight ${theme === 'dark' ? 'text-zinc-500' : 'text-[#8a7a68]'}`}>{service.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MODAL COMPONENT ---

const ProjectModal = ({ project, isOpen, onClose, theme }: ProjectModalProps) => {
    const [activeImage, setActiveImage] = useState<string | null>(null);

    useEffect(() => {
        if (project) {
            setActiveImage(project.image);
        }
    }, [project]);

    if (!isOpen || !project) return null;

    const allImages = [project.image, ...(project.gallery || [])];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity animate-in fade-in duration-500"
                onClick={onClose}
            />
            <div className={`relative w-full max-w-6xl max-h-[85vh] overflow-hidden rounded-[2rem] border shadow-[0_0_50px_rgba(0,0,0,0.5)] transform transition-all animate-in fade-in zoom-in-95 duration-500
        ${theme === 'dark' ? 'bg-[#0a0a0a] border-white/10' : 'bg-[#F9F8F6] border-[#D9CFC7]'}
      `}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className={`absolute top-6 right-6 z-20 p-2 rounded-full backdrop-blur-md transition-all hover:scale-110 active:scale-90
            ${theme === 'dark' ? 'bg-black/50 text-white hover:bg-white/20' : 'bg-[#EFE9E3]/80 text-[#5e5852] hover:bg-[#D9CFC7]'}
          `}
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col md:flex-row min-h-0 h-full overflow-y-auto custom-scrollbar">
                    {/* Gallery Sidebar / Bottom (Responsive) */}
                    <div className={`w-full md:w-2/3 relative group bg-[#111] flex items-center justify-center min-h-[350px] md:min-h-[500px]`}>
                        <img
                            src={activeImage || project.image}
                            alt={project.title}
                            className="w-full h-full object-contain object-left transition-all duration-500"
                        />

                        {/* Gallery Navigation (Thumbnails) */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 p-2 rounded-2xl backdrop-blur-md bg-black/50 border border-white/10 max-w-[90%] overflow-x-auto scrollbar-hide">
                            {allImages.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImage(img);
                                    }}
                                    className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 border-2 
                    ${activeImage === img ? 'border-blue-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}
                  `}
                                >
                                    <img src={img} className="w-full h-full object-cover" alt={`Gallery ${i}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`w-full md:w-1/3 p-8 md:p-10 flex flex-col ${theme === 'dark' ? 'text-white' : 'text-[#4A4A4A]'}`}>
                        <div className="flex flex-col mb-6">
                            <h2 className="text-3xl font-bold tracking-tight">{project.title}</h2>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag, i) => (
                                <Tag key={i} text={tag} theme={theme} />
                            ))}
                        </div>

                        <div className="flex-1">
                            <p className={`text-base leading-relaxed mb-8 ${theme === 'dark' ? 'text-zinc-300' : 'text-[#6e6760]'}`}>
                                {project.longDescription}
                            </p>
                        </div>

                        <div className="mt-auto pt-8 border-t border-dashed border-opacity-20 flex flex-col gap-3">
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg
                  ${theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-[#4A4A4A] text-[#F9F8F6] hover:bg-[#2D2D2D]'}
                `}
                            >
                                Launch Project <ExternalLink size={18} />
                            </a>
                            <p className={`text-center text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-[#6e6760]'}`}>
                                Click on thumbnails to explore more views
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN APPLICATION ---

export default function App() {
    const [theme, setTheme] = useState<Theme>('dark');
    const [time, setTime] = useState<string>("");
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Projects Data
    const projects: Project[] = [
        {
            id: 1,
            title: "Eggsplain Cloud",
            shortDesc: "A complete cloud infrastructure management platform.",
            longDescription: "Eggsplain Cloud is a comprehensive solution for managing cloud-native infrastructure. It provides a visual interface for service management, server selection, and project monitoring. Built with a focus on simplicity and developer experience, it streamlines the deployment and orchestration of complex services across multiple cloud providers.",
            image: "/portfolio/eggsplain cloud/eggsplain select server.png",
            gallery: [
                "/portfolio/eggsplain cloud/eggsplain eggstore.png",
                "/portfolio/eggsplain cloud/eggsplain manage projects.png",
                "/portfolio/eggsplain cloud/eggsplain project settings.png",
                "/portfolio/eggsplain cloud/eggsplain run services.png"
            ],
            tags: ["Cloud Infrastructure", "React", "SaaS"],
            icon: LayoutDashboard,
            color: "text-blue-400",
            link: "#",
            size: "large"
        },
        {
            id: 2,
            title: "SmileReveal",
            shortDesc: "AI-powered dental simulation and shade matching app.",
            longDescription: "SmileReveal leverages advanced AI to provide realistic dental simulations and accurate shade matching. It features an admin portal for dentists and a user dashboard for patients to visualize their future smiles. The platform includes tools for before-and-after comparisons, gallery management, and automated shade detection, enhancing patient-dentist communication.",
            image: "/portfolio/smilereveal/smilereveal all shades.png",
            gallery: [
                "/portfolio/smilereveal/smilereveal admin portal.png",
                "/portfolio/smilereveal/smilereveal all shades.png",
                "/portfolio/smilereveal/smilereveal app install on mobile.png",
                "/portfolio/smilereveal/smilereveal before and after.png",
                "/portfolio/smilereveal/smilereveal expanded shades.png"
            ],
            tags: ["Generative AI", "Mobile Web", "Computer Vision"],
            icon: BrainCircuit,
            color: "text-purple-400",
            link: "#",
            size: "medium"
        },
        {
            id: 3,
            title: "Fluuz Bank",
            shortDesc: "Next-gen crypto payment and dashboard solution.",
            longDescription: "Fluuz Bank is a platform that allows people to easily use and store value. It handles crypto to fiat, fiat to crypto, crypto to crypto etc., all in a press of a button you receive the amount. Features user friendly design and custodial wallets for maximum security.",
            image: "/portfolio/fluuz/fluuz dashboard.png",
            gallery: [
                "/portfolio/fluuz/fluuz get paid.png",
                "/portfolio/fluuz/fluuz send crypto.png",
                "/portfolio/fluuz/fluuz send payment.png"
            ],
            tags: ["Fintech", "Web3", "Dashboard"],
            icon: Zap,
            color: "text-cyan-400",
            link: "#",
            size: "medium"
        },
        {
            id: 4,
            title: "TieTools Suite",
            shortDesc: "A versatile suite of digital tools and utilities.",
            longDescription: "TieTools is a CRM that integrates Google Ads, Meta Ads, and GoHighLevel data to create reporting and integrated data from all sources. It has tools for different needs of Account Managers, Quality Assurance, Media Buyers, and Content Operations. Includes specialized roles for Admins (Developer Admin, Owner) and Marketing Managers (B2B and B2C).",
            image: "/portfolio/tietools/tools1.png",
            gallery: [
                "/portfolio/tietools/tools2.png",
                "/portfolio/tietools/tools3.png"
            ],
            tags: ["Utilities", "Developer Tools", "CRM"],
            icon: Terminal,
            color: "text-orange-400",
            link: "#",
            size: "medium"
        }
    ];

    useEffect(() => {
        const updateTime = () => {
            setTime(new Date().toLocaleTimeString('en-US', {
                timeZone: 'Asia/Karachi',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }));
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    // Colors based on theme
    const bgClass = theme === 'dark' ? 'bg-[#050505]' : 'bg-[#F9F8F6]';
    const textMain = theme === 'dark' ? 'text-white' : 'text-[#4A4A4A]';
    const textMuted = theme === 'dark' ? 'text-zinc-400' : 'text-[#6e6760]';

    return (
        <div className={`min-h-screen ${bgClass} ${textMain} p-4 sm:p-6 md:p-12 font-sans selection:bg-[#C9B59C]/30 overflow-x-hidden transition-colors duration-700`}>
            <GlobalStyles theme={theme} />
            <div className="grain-overlay" />

            {/* Decorative blobs - Improved for light mode */}
            <div className="fixed inset-0 pointer-events-none transition-opacity duration-700">
                <div className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] ${theme === 'dark' ? 'bg-blue-900/10' : 'bg-[#EFE9E3]/60'}`} />
                <div className={`absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] ${theme === 'dark' ? 'bg-purple-900/10' : 'bg-[#D9CFC7]/40'}`} />
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10">

                {/* HEADER & THEME TOGGLE */}
                <div className="flex justify-end items-center h-12">
                    <button
                        onClick={toggleTheme}
                        className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 mb-8
                 ${theme === 'dark'
                                ? 'bg-white/10 border-white/10 hover:bg-white/20 text-yellow-400'
                                : 'bg-[#EFE9E3] border-[#D9CFC7] hover:bg-white text-[#4A4A4A] shadow-sm'
                            }`}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* === SECTION 1: HERO & INTRO === */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-6">

                    {/* PROFILE CARD */}
                    <Card className="col-span-1 md:col-span-2 row-span-2 min-h-[400px]" delay={0} theme={theme}>
                        <div className="space-y-4 flex-1">
                            <div className="flex items-start justify-between">
                                <div className="relative group/avatar">
                                    <div className={`overflow-hidden transition-transform duration-500 group-hover/avatar:scale-105 m-0 p-0`}>
                                        <img src="/me.webp" alt="Mubashir Ahmed" className="h-32 object-cover" />
                                    </div>
                                    <div className={`absolute bottom-4 right-3 p-1 rounded-full ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#F9F8F6]'}`}>
                                        <div className="bg-green-500 w-4 h-4 rounded-full animate-pulse border-2 border-transparent"></div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border
                     ${theme === 'dark' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-[#EFE9E3] border-[#D9CFC7] text-[#5e5852]'}
                   `}>
                                        Available for hire
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h1 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-3 bg-clip-text text-transparent
                   ${theme === 'dark' ? 'bg-gradient-to-r from-white via-zinc-200 to-zinc-500' : 'bg-gradient-to-r from-[#4A4A4A] via-[#5e5852] to-[#8a7a68]'}
                `}>
                                    Mubashir Ahmed
                                </h1>
                                <h2 className={`text-lg font-medium flex items-center gap-2 ${theme === 'dark' ? 'text-blue-400' : 'text-[#8a7a68]'}`}>
                                    <Terminal size={18} />
                                    AI/ML Engineer & Full Stack Dev
                                </h2>
                            </div>

                            <p className={`${textMuted} leading-relaxed text-sm sm:text-base max-w-lg`}>
                                I craft intelligent digital experiences. Specializing in fusing <span className={`font-semibold ${textMain}`}>Generative AI</span> with robust web architectures.
                                Currently building next-gen chatbots and scalable React applications.
                            </p>
                        </div>

                        <div className="pt-6 mt-auto flex flex-wrap gap-3">
                            <button className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors shadow-lg hover:scale-105 active:scale-95 duration-200
                  ${theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-[#4A4A4A] text-[#F9F8F6] hover:bg-[#2D2D2D]'}
              `}>
                                Download CV <ArrowUpRight size={18} />
                            </button>
                            <button className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors border
                  ${theme === 'dark' ? 'bg-white/5 text-white border-white/10 hover:bg-white/10' : 'bg-[#F9F8F6] text-[#4A4A4A] border-[#D9CFC7] hover:bg-white shadow-sm'}
              `}>
                                Copy Email
                            </button>
                        </div>
                    </Card>

                    {/* MAP & LOCATION (FIXED) */}
                    <Card className="col-span-1 row-span-1 relative min-h-[200px] p-0" noPadding delay={100} theme={theme}>
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Karachi_City_Lights.jpg/640px-Karachi_City_Lights.jpg')] bg-cover bg-center transition-transform duration-700 hover:scale-110 opacity-60" />
                        <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-black/80 via-black/20 to-transparent' : 'from-[#EFE9E3] via-[#EFE9E3]/60 to-transparent'}`} />
                        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full">
                            <div className={`flex items-center gap-2 mb-1 ${theme === 'dark' ? 'text-zinc-300' : 'text-[#6e6760]'}`}>
                                <MapPin size={16} className={theme === 'dark' ? 'text-blue-400' : 'text-[#8a7a68]'} />
                                <span className="text-xs font-bold tracking-widest uppercase">Base of Ops</span>
                            </div>
                            <div className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#4A4A4A]'}`}>Karachi, PK</div>
                            <div className={`text-3xl font-mono mt-1 ${theme === 'dark' ? 'text-white/90' : 'text-[#4A4A4A]/90'}`}>{time}</div>
                        </div>
                    </Card>

                    {/* SOCIALS */}
                    <Card className="col-span-1 row-span-1" delay={150} theme={theme}>
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-xs font-bold uppercase tracking-widest ${textMuted}`}>Network</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-auto">
                                <SocialButton theme={theme} icon={Github} href="https://github.com/Mubashir-19" label="GitHub" />
                                <SocialButton theme={theme} icon={Linkedin} href="https://www.linkedin.com/in/mubashirahmed23" label="LinkedIn" />
                                <SocialButton theme={theme} icon={Twitter} href="#" label="Twitter" />
                                <SocialButton theme={theme} icon={Mail} href="mailto:contact@mubashir.me" label="Email" />
                            </div>
                        </div>
                    </Card>

                    {/* CORE SERVICES (Replaces System Status) */}
                    <Card className="col-span-1 md:col-span-2 row-span-1" delay={200} theme={theme}>
                        <Services theme={theme} />
                    </Card>

                </div>

                {/* === SECTION 2: WORK & EXPERIENCE === */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:h-[600px] mb-6">

                    {/* EXPERIENCE TIMELINE */}
                    <Card className="col-span-1 md:col-span-1 md:h-full h-[400px]" delay={300} theme={theme} noPadding>
                        <div className="flex flex-col h-full">
                            {/* Header with Padding */}
                            <div className="p-6 pb-2">
                                <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-zinc-100' : 'text-[#4A4A4A]'}`}>
                                    <Briefcase size={20} className={theme === 'dark' ? 'text-blue-400' : 'text-[#8a7a68]'} />
                                    <h3 className={`font-bold text-lg ${textMain}`}>Experience</h3>
                                </div>
                            </div>
                            {/* Scrollable Area - Full Width */}
                            <div className={`flex-1 overflow-y-auto custom-scrollbar px-6 pb-6`}>
                                <div className={`relative border-l ml-2 space-y-8 py-2 ${theme === 'dark' ? 'border-white/10' : 'border-[#D9CFC7]'}`}>
                                    {[
                                        { role: "Freelance AI Engineer", company: "Self-Employed", date: "2024 - Present", desc: "Building custom RAG pipelines and chatbots for international clients." },
                                        { role: "Full Stack Developer", company: "Upwork / Remote", date: "2023 - 2024", desc: "Delivered 10+ web apps using React & Node.js." },
                                        { role: "Open Source Contributor", company: "GitHub", date: "Ongoing", desc: "Active contributor to LangChain & Flutter community projects." },
                                        { role: "Junior Developer", company: "Tech Solutions", date: "2022 - 2023", desc: "Assisted in frontend development using React." },
                                        { role: "Intern", company: "Software House", date: "2022", desc: "Learned basics of MERN stack." }
                                    ].map((job, i) => (
                                        <div key={i} className="relative pl-8 group/item">
                                            <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border transition-colors 
                                        ${theme === 'dark'
                                                    ? 'bg-zinc-800 border-white/20 group-hover/item:bg-blue-500 group-hover/item:border-blue-400'
                                                    : 'bg-[#F9F8F6] border-[#D9CFC7] group-hover/item:bg-[#EFE9E3] group-hover/item:border-[#8a7a68]'}`
                                            } />
                                            <h4 className={`font-semibold ${theme === 'dark' ? 'text-zinc-200' : 'text-[#4A4A4A]'}`}>{job.role}</h4>
                                            <div className={`text-xs mb-1 font-mono ${theme === 'dark' ? 'text-blue-400' : 'text-[#8a7a68]'}`}>{job.company} • {job.date}</div>
                                            <p className={`text-xs leading-relaxed ${textMuted}`}>{job.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* PROJECTS SECTION */}
                    <Card className="col-span-1 md:col-span-2 md:h-full h-[500px]" delay={350} theme={theme} noPadding>
                        <div className="flex flex-col h-full overflow-hidden">
                            <div className="p-6 pb-2 flex items-center justify-between shrink-0">
                                <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-zinc-100' : 'text-[#4A4A4A]'}`}>
                                    <Layers size={20} className={theme === 'dark' ? 'text-orange-400' : 'text-[#C9B59C]'} />
                                    <h3 className={`font-bold text-lg ${textMain}`}>Featured Projects</h3>
                                </div>
                                <span className="text-xs font-mono opacity-50 tracking-tight">{projects.length} PROJECTS</span>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                                <div className="masonry-grid">
                                    {projects.map((proj, idx) => (
                                        <Card
                                            key={proj.id}
                                            delay={350 + (idx * 50)}
                                            noPadding
                                            theme={theme}
                                            onClick={() => setSelectedProject(proj)}
                                            className={`min-h-[240px] group/project ${proj.size === 'large' ? 'col-span-2 row-span-2 min-h-[350px]' : 'col-span-1'}`}
                                        >
                                            <div className={`absolute inset-0 z-0 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-[#EFE9E3]'}`}>
                                                <img src={proj.image} alt={proj.title} className="w-full h-full object-contain transition-transform duration-700 group-hover/project:scale-105" />
                                                <div className={`absolute inset-0 transition-all duration-500 opacity-0 group-hover/project:opacity-100 ${theme === 'dark' ? 'bg-zinc-950/40' : 'bg-white/40'}`} />
                                                <div className={`absolute inset-0 bg-gradient-to-t opacity-0 group-hover/project:opacity-100 transition-opacity duration-500 ${theme === 'dark' ? 'from-black via-black/40 to-transparent' : 'from-white via-white/40 to-transparent'}`} />
                                            </div>

                                            <div className="relative z-20 p-6 flex flex-col h-full">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h4 className={`font-bold ${proj.size === 'large' ? 'text-2xl' : 'text-lg'} transition-all duration-500 opacity-0 translate-y-2 group-hover/project:opacity-100 group-hover/project:translate-y-0 ${theme === 'dark' ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                                        {proj.title}
                                                    </h4>
                                                    <div className={`p-2 rounded-full backdrop-blur-md opacity-0 group-hover/project:opacity-100 transition-all duration-300 ${theme === 'dark' ? 'bg-white text-black' : 'bg-[#4A4A4A] text-[#F9F8F6]'}`}>
                                                        <ArrowUpRight size={16} />
                                                    </div>
                                                </div>

                                                <div className="mt-auto opacity-0 translate-y-4 group-hover/project:opacity-100 group-hover/project:translate-y-0 transition-all duration-500">
                                                    <p className={`text-sm line-clamp-2 mb-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-[#6e6760]'}`}>
                                                        {proj.shortDesc}
                                                    </p>
                                                    <div className="flex gap-2 flex-wrap">
                                                        {proj.tags.slice(0, proj.size === 'large' ? 4 : 2).map((t, i) => (
                                                            <span key={i} className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-[#EFE9E3] text-[#5e5852]'}`}>
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* === SECTION 3: TESTIMONIALS & CONTACT === */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                    {/* CLIENTS SAY (Fixed Scroll) */}
                    <Card className="col-span-1 md:col-span-2 h-[400px]" delay={550} theme={theme} noPadding>
                        <div className="flex flex-col md:flex-row h-full">
                            {/* Left Side: Message */}
                            <div className="w-full md:w-1/3 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-dashed border-opacity-20 border-gray-400">
                                <div className="flex items-center gap-2 mb-4">
                                    <Quote size={28} className="text-yellow-400 fill-yellow-400" />
                                </div>
                                <h3 className={`text-2xl font-bold mb-4 ${textMain}`}>Hear from the people I've worked with</h3>
                                <p className={`text-sm ${textMuted}`}>
                                    Trusted by clients worldwide for delivering exceptional AI and web development solutions.
                                </p>
                            </div>

                            {/* Right Side: Reviews Scroll Area */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
                                {[
                                    { text: "Mubashir delivered the AI integration perfectly. His understanding of LLMs saved us weeks of research.", name: "Sarah Jenkins", role: "Tech Startup CEO", initials: "SJ", color: "from-blue-400 to-purple-400" },
                                    { text: "Excellent code quality on the React Native project. Very communicative and professional.", name: "David Miller", role: "Product Manager", initials: "DM", color: "from-orange-400 to-red-400" },
                                    { text: "One of the best developers I've worked with on Upwork. Highly recommended for full-stack tasks.", name: "Alex Lee", role: "Founder, WebFlows", initials: "AL", color: "from-green-400 to-teal-400" },
                                    { text: "Fantastic eye for design and performance. The dashboard he built is incredibly fast.", name: "Emily Chen", role: "CTO, DataCorp", initials: "EC", color: "from-pink-400 to-rose-400" }
                                ].map((review, i) => (
                                    <div key={i} className={`p-5 rounded-2xl border relative group transition-colors 
                                   ${theme === 'dark'
                                            ? 'bg-white/5 border-white/5 hover:bg-white/10'
                                            : 'bg-[#F9F8F6] border-[#D9CFC7] hover:bg-white'}`}>
                                        <div className="flex gap-1 mb-2">
                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="text-yellow-500 fill-yellow-500" />)}
                                        </div>
                                        <p className={`text-sm italic mb-3 leading-relaxed ${theme === 'dark' ? 'text-zinc-300' : 'text-[#6e6760]'}`}>"{review.text}"</p>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${review.color} flex items-center justify-center text-xs font-bold text-white`}>{review.initials}</div>
                                            <div>
                                                <div className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-[#4A4A4A]'}`}>{review.name}</div>
                                                <div className={`text-[10px] uppercase tracking-wide ${textMuted}`}>{review.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* GET IN TOUCH FORM */}
                    <Card className="col-span-1 md:col-span-2 h-[450px]" delay={600} theme={theme}>
                        <div className="flex items-center gap-2 mb-6">
                            <Send size={20} className="text-green-500" />
                            <h3 className="font-bold text-lg">Get in Touch</h3>
                        </div>

                        {formStatus === 'success' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center animate-pulse">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-500">
                                    <Send size={32} />
                                </div>
                                <h4 className="text-xl font-bold">Message Sent!</h4>
                                <p className={`mt-2 ${textMuted}`}>I'll get back to you shortly.</p>
                            </div>
                        ) : (
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    setFormStatus("submitting");
                                    const formData = new FormData(e.currentTarget);
                                    const data = {
                                        name: formData.get("name"),
                                        email: formData.get("email"),
                                        message: formData.get("message"),
                                    };

                                    try {
                                        // REPLACE THIS URL WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
                                        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw8BXV5yIk2DeWSpV78ssRG-EfyYAzXQDzh7v_GJDjXUVcRlbn2l6uwNOQ85Powg7dpeg/exec";

                                        await fetch(SCRIPT_URL, {
                                            method: "POST",
                                            mode: "no-cors", // Required for Apps Script Web App
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify(data),
                                        });

                                        setFormStatus("success");
                                        setTimeout(() => setFormStatus("idle"), 3000);
                                    } catch (error) {
                                        console.error("Error submitting form:", error);
                                        setFormStatus("idle");
                                        alert("Connection failed. Please use the social links while I fix this!");
                                    }
                                }}
                                className="space-y-4 flex flex-col h-[280px]"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Your Name"
                                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all
                                  ${theme === 'dark'
                                                ? 'bg-black/20 border-white/10 text-white focus:border-blue-500/50 focus:bg-white/5'
                                                : 'bg-[#F9F8F6] border-[#D9CFC7] text-[#4A4A4A] focus:border-[#C9B59C] focus:bg-white shadow-inner'}
                                `}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Your Email"
                                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all
                                  ${theme === 'dark'
                                                ? 'bg-black/20 border-white/10 text-white focus:border-blue-500/50 focus:bg-white/5'
                                                : 'bg-[#F9F8F6] border-[#D9CFC7] text-[#4A4A4A] focus:border-[#C9B59C] focus:bg-white shadow-inner'}
                                `}
                                    />
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        name="message"
                                        required
                                        placeholder="How can I help you?"
                                        className={`w-full h-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all resize-none
                                  ${theme === 'dark'
                                                ? 'bg-black/20 border-white/10 text-white focus:border-blue-500/50 focus:bg-white/5'
                                                : 'bg-[#F9F8F6] border-[#D9CFC7] text-[#4A4A4A] focus:border-[#C9B59C] focus:bg-white shadow-inner'}
                                `}
                                    />
                                </div>
                                <button
                                    disabled={formStatus === 'submitting'}
                                    className={`w-full font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50
                              ${theme === 'dark'
                                            ? 'bg-white text-black hover:bg-zinc-200'
                                            : 'bg-[#4A4A4A] text-[#F9F8F6] hover:bg-[#2D2D2D]'}
                            `}
                                >
                                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                                    {formStatus === 'idle' && <Send size={16} />}
                                </button>
                            </form>
                        )}
                    </Card>
                </div>

                {/* FOOTER */}
                <div className="pt-12 pb-6 text-center">
                    <p className={`text-sm ${textMuted}`}>
                        Designed & Built by Mubashir-19 © {new Date().getFullYear()}
                    </p>
                </div>

                {/* Project Modal Overlay */}
                <ProjectModal
                    project={selectedProject}
                    isOpen={!!selectedProject}
                    onClose={() => setSelectedProject(null)}
                    theme={theme}
                />

            </div>
        </div>
    );
}
