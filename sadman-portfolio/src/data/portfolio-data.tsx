import { ReactNode } from "react";
import { FaReact, FaNodeJs, FaDatabase, FaCode, FaDesktop, FaMobile, FaServer, FaCloud } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb, SiPostgresql, SiExpress, SiPrisma, SiDocker } from "react-icons/si";

export const personalInfo = {
  name: "Sadman Abid",
  title: "Web Developer",
  email: "helloimabid@gmail.com",
  location: "Dhaka, Bangladesh",
  bio: "A passionate Web Developer from Bangladesh, building user-friendly scalable websites for the best user experience.",
  longBio: `I'm Sadman Abid, a passionate and dedicated web developer with a strong foundation in creating responsive, user-friendly applications. I specialize in building full-stack web solutions with a focus on performance and scalability.

My journey in web development began during college, where I developed a fascination for transforming design concepts into functional websites. Since then, I've been continuously expanding my skills and keeping up with the latest industry trends.

I pride myself on writing clean, maintainable code and creating intuitive user experiences. My goal is to contribute to innovative projects that make a positive impact on people's lives.`,
  socialLinks: {
    github: "https://github.com/helloimabid",
    linkedin: "https://linkedin.com/in/helloimabid",
    twitter: "https://twitter.com/helloimabid",
  },
  resumeUrl: "/resume.pdf",
};

interface Skill {
  name: string;
  icon: ReactNode;
  color: string;
  level: number;
  description: string;
}

export const skills: Skill[] = [
  {
    name: "React",
    icon: <FaReact />,
    color: "#61DAFB",
    level: 5,
    description: "Building modern, responsive user interfaces with React and its ecosystem",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    color: "#000000",
    level: 4,
    description: "Creating performant web applications with Next.js for server-side rendering and static site generation",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    color: "#38B2AC",
    level: 5,
    description: "Crafting beautiful interfaces with utility-first CSS framework",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    color: "#3178C6",
    level: 4,
    description: "Developing type-safe applications with enhanced developer experience",
  },
  {
    name: "Node.js",
    icon: <FaNodeJs />,
    color: "#339933",
    level: 4,
    description: "Building scalable backend services and APIs",
  },
  {
    name: "Express",
    icon: <SiExpress />,
    color: "#000000",
    level: 4,
    description: "Creating robust RESTful APIs and web services",
  },
  {
    name: "MongoDB",
    icon: <SiMongodb />,
    color: "#47A248",
    level: 3,
    description: "Working with NoSQL databases for flexible data storage",
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql />,
    color: "#336791",
    level: 3,
    description: "Managing relational databases for structured data",
  },
  {
    name: "Prisma",
    icon: <SiPrisma />,
    color: "#2D3748",
    level: 3,
    description: "Type-safe database access with modern ORM",
  },
  {
    name: "Docker",
    icon: <SiDocker />,
    color: "#2496ED",
    level: 2,
    description: "Containerizing applications for consistent deployment",
  },
];

interface Service {
  title: string;
  description: string;
  icon: ReactNode;
}

export const services: Service[] = [
  {
    title: "Frontend Development",
    description: "Building modern, responsive, and accessible user interfaces with React, Next.js, and other cutting-edge technologies.",
    icon: <FaDesktop />,
  },
  {
    title: "Backend Development",
    description: "Creating robust server-side applications, RESTful APIs, and database integrations using Node.js, Express, and more.",
    icon: <FaServer />,
  },
  {
    title: "Full Stack Development",
    description: "End-to-end development from database design to user interface, ensuring cohesive and scalable applications.",
    icon: <FaCode />,
  },
  {
    title: "Database Design",
    description: "Designing efficient database schemas, optimizing queries, and implementing data models for various applications.",
    icon: <FaDatabase />,
  },
];

export const projects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with product management, shopping cart, and secure payment processing.",
    image: "https://placehold.co/600x400/3178C6/FFFFFF?text=E-Commerce+Platform",
    tags: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    demoUrl: "https://ecommerce-demo.example.com",
    githubUrl: "https://github.com/sadmanabid/ecommerce-platform",
    featured: true,
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, project tracking, and team collaboration features.",
    image: "https://placehold.co/600x400/38B2AC/FFFFFF?text=Task+Management",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Socket.io"],
    demoUrl: "https://taskmaster.example.com",
    githubUrl: "https://github.com/sadmanabid/task-management",
  },
  {
    id: "3",
    title: "Portfolio Website",
    description: "A modern, animated portfolio website showcasing projects and skills with interactive elements.",
    image: "https://placehold.co/600x400/61DAFB/000000?text=Portfolio+Website",
    tags: ["React", "Framer Motion", "Tailwind CSS", "Next.js"],
    demoUrl: "https://sadmanabid.com",
    githubUrl: "https://github.com/sadmanabid/portfolio",
  },
  {
    id: "4",
    title: "Weather Dashboard",
    description: "A weather application providing real-time forecasts, historical data, and location-based weather updates.",
    image: "https://placehold.co/600x400/339933/FFFFFF?text=Weather+App",
    tags: ["React", "OpenWeather API", "Chart.js", "Geolocation"],
    demoUrl: "https://weather.example.com",
    githubUrl: "https://github.com/sadmanabid/weather-dashboard",
  },
  {
    id: "5",
    title: "Blog Platform",
    description: "A content management system with rich text editing, user authentication, and content categorization.",
    image: "https://placehold.co/600x400/47A248/FFFFFF?text=Blog+Platform",
    tags: ["Next.js", "MongoDB", "NextAuth", "TipTap"],
    demoUrl: "https://blog.example.com",
    githubUrl: "https://github.com/sadmanabid/blog-platform",
    featured: true,
  },
  {
    id: "6",
    title: "Social Media Dashboard",
    description: "A unified dashboard for managing multiple social media accounts with analytics and scheduling features.",
    image: "https://placehold.co/600x400/336791/FFFFFF?text=Social+Media+Dashboard",
    tags: ["React", "Redux", "Node.js", "Social APIs"],
    demoUrl: "https://socialdash.example.com",
    githubUrl: "https://github.com/sadmanabid/social-dashboard",
  },
];

export const experiences = [
   {
    title: "Freelance Web Developer",
    company: "Self-employed",
    location: "Remote",
    period: "2024 - oresent",
    description: "Designed and developed websites for small businesses and individuals, focusing on clean code and user-friendly interfaces.",
  },
  {
    title: "Full Stack Developer",
    company: "জিজ্ঞাসা",
    location: "Remote",
    period: "2024 - 2025",
    description: "Developed and maintained web applications for various clients, collaborating with design and backend teams to deliver high-quality products.",
  }
];

export const education = [
  {
    degree: "Higher Secondary Certificate(HSC)",
    institution: "St. Joseph Higher Secondary School",
    location: "Dhaka, Bangladesh",
    period: "2024 - present",
    description: "pursuing my higher secondary studies.",
  },
  {
    degree: "Secondary School Certificate(SSC)",
    institution: "Monipur High School and College",
    location: "Dhaka, Bangladesh",
    period: "2014 - 2024",
    description: "Completed my primary and secondary studies.",
  },
];

export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Project Manager",
    company: "TechSolutions Inc.",
    quote: "Sadman is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are impressive.",
    image: "https://placehold.co/100x100/38B2AC/FFFFFF?text=SJ",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "WebCraft Studios",
    quote: "Working with Sadman has been a pleasure. He's proactive, communicates effectively, and has a talent for turning complex requirements into elegant solutions.",
    image: "https://placehold.co/100x100/61DAFB/000000?text=MC",
  },
  {
    name: "Emma Rodriguez",
    role: "UI/UX Designer",
    company: "Digital Innovations",
    quote: "Sadman has an incredible ability to transform designs into perfect code. His understanding of both design principles and technical implementation is rare and valuable.",
    image: "https://placehold.co/100x100/339933/FFFFFF?text=ER",
  },
];

export const achievements = [
  {
    title: "Social Business Youth Summit Certificate",
    organization: "Festival of Youth 2025",
    date: "February 2025",
    description: "Recognized for outstanding contributions to the Social Business Youth Summit at Intercontinental Dhaka."
  },
  {
    title: "Best Web Development Project",
    organization: "National Tech Competition",
    date: "2023",
    description: "First place award for developing an innovative web application that addresses community needs."
  },
  {
    title: "Open Source Contributor",
    organization: "GitHub",
    date: "2022 - Present",
    description: "Active contributor to several open-source projects with over 50 accepted pull requests."
  },
  {
    title: "Web Development Certification",
    organization: "freeCodeCamp",
    date: "2021",
    description: "Completed advanced web development curriculum and built several projects demonstrating proficiency."
  },
];
