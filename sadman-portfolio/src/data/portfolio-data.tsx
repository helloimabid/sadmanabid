import { ReactNode } from "react";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaCode,
  FaDesktop,
  FaMobile,
  FaServer,
  FaCloud,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiMongodb,
  SiMysql,
  SiExpress,
} from "react-icons/si";
// export const runtime = "edge";
export const personalInfo = {
  name: "Sadman Abid",
  title: [
    "Full Stack Developer",
    "Graphics Designer",
    "UI/UX Enthusiast",
    "DevOps",
  ],
  email: "helloimabid@gmail.com",
  location: "Dhaka, Bangladesh",
  bio: "A passionate Web Developer from Bangladesh, building user-friendly scalable websites for the best user experience.",
  longBio: `I'm Sadman Abid, a passionate and dedicated web developer with a strong foundation in creating responsive, user-friendly applications. I specialize in building full-stack web solutions with a focus on performance and scalability.

My journey in web development began during school, where I developed a fascination for transforming design concepts into functional websites. Since then, I've been continuously expanding my skills and keeping up with the latest industry trends.

I pride myself on writing clean, maintainable code and creating intuitive user experiences.`,
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
    description:
      "Building modern, responsive user interfaces with React and its ecosystem",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    color: "#000000",
    level: 4,
    description:
      "Creating performant web applications with Next.js for server-side rendering and static site generation",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    color: "#38B2AC",
    level: 5,
    description:
      "Crafting beautiful interfaces with utility-first CSS framework",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    color: "#3178C6",
    level: 4,
    description:
      "Developing type-safe applications with enhanced developer experience",
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
    name: "MySQL",
    icon: <SiMysql />,
    color: "#336791",
    level: 3,
    description: "Managing relational databases for structured data",
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
    description:
      "Building modern, responsive, and accessible user interfaces with React, Next.js, and other cutting-edge technologies.",
    icon: <FaDesktop />,
  },
  {
    title: "Backend Development",
    description:
      "Creating robust server-side applications, RESTful APIs, and database integrations using Node.js, Express, and more.",
    icon: <FaServer />,
  },
  {
    title: "Full Stack Development",
    description:
      "End-to-end development from database design to user interface, ensuring cohesive and scalable applications.",
    icon: <FaCode />,
  },
  {
    title: "Database Design",
    description:
      "Designing efficient database schemas, optimizing queries, and implementing data models for various applications.",
    icon: <FaDatabase />,
  },
];

export const projects = [
  {
    id: "1",
    title: "Portfolio Website",
    description:
      "A modern, animated portfolio website showcasing projects and skills with interactive elements.",
    image: "https://i.ibb.co.com/Wpz5T6MZ/porfolio-SS.png",
    tags: ["React", "Framer Motion", "Tailwind CSS", "Next.js"],
    demoUrl: "https://helloimabid.me",
    githubUrl: "https://github.com/helloimabid/portfolio-V1.0",
    featured: true,
  },
  {
    id: "2",
    title: "cyborg-marketplace-dimension",
    description:
      "A futuristic e-commerce platform specializing in advanced cyborg enhancements.",
    image: "https://i.ibb.co.com/pvFd7PJQ/cyborgss.png",
    tags: ["React", "Shadcn UI ", "Tailwind CSS"],
    demoUrl: "https://cyborg-marketplace-dimension.vercel.app/",
    githubUrl: "https://github.com/helloimabid/cyborg-marketplace-dimension",
    featured: true,
  },
  {
    id: "3",
    title: "PrayerPro",
    description:
      "A simple and elegant web application that provides daily prayer times and a Qibla finder using geolocation and device sensors. 🌙🕌",
    image: "https://i.ibb.co.com/NgxMbcW7/image.png",
    tags: [
      "Html",
      "Css",
      "Javascript",
      "Geolocation API",
      "Aladhan API",
      "Device Orientation API",
    ],
    demoUrl: "https://helloimabid.github.io/PrayerPro/",
    githubUrl: "https://github.com/helloimabid/PrayerPro",
    featured: false,
  },
  {
    id: "4",
    title: "Currency Converter",
    description:
      "A web-based currency converter application that uses the ExchangeRate-API to fetch real-time exchange rates.",
    image: "https://i.ibb.co.com/P8nMrm0/image.png",
    tags: ["Html", "Css", "Javascript", "ExchangeRate-API"],
    demoUrl: "https://helloimabid.github.io/currency_converter/",
    githubUrl: "https://github.com/helloimabid/currency_converter",
    featured: false,
  },
  {
    id: "5",
    title: "Bubble Game",
    description: "A web-based fun and engaging bubble popping game ",
    image: "https://i.ibb.co.com/8hwmsrK/image.png",
    tags: ["Html", "Css", "Javascript"],
    demoUrl: "https://helloimabid.github.io/bubble_game/",
    githubUrl: "https://github.com/helloimabid/bubble_game",
    featured: false,
  },
  {
    id: "6",
    title: "OpenLearn",
    description:
      "a smart education platform where students can learn Physics, Chemistry, Math, Biology, and English Speaking with the help of AI-powered teachers and interactive tools like digital labs",
    image: "https://i.ibb.co/tnw98Cd/IMG-0933.jpg",
    tags: [
      "Tailwind CSS",
      "Javascript",
      "Gemini API",
      "WebSocket",
      "React",
    ],
    demoUrl: "https://openlearn.pages.dev",
    githubUrl: "https://github.com/arnabdatta13/OpenLearn",
    featured: false,
  },
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

export const achievements = [
  {
    title: "Web development competition",
    organization: "Notre Dame Information Technology Club",
    date: "May 2025",
    description:
      "Third place award for designing a futuristic cyborg marketplace web application.",
  },
  {
    title: "Social fiction story telling competition",
    organization: "3ZERO Club",
    date: "February 2025",
    description:
      "Recognized for achieving one of the highest scores in the Social fiction story telling competition.",
  },
  {
    title: "Crack the code competition",
    organization: "Josephite IT club",
    date: "2024",
    description:
      "First place award for acheiving highest scores in the crack the code contest.",
  },
  {
    title: "ICT Olympiad competition",
    organization: "AIUB Computer Club",
    date: "2024",
    description:
      "First place award for acheiving highest scores in the Ict Olympiad.",
  },
  {
    title: "Math Olympiad competition",
    organization: "Hermann Gmeiner Science Club",
    date: "2024",
    description: "Second place award in the Math Olympiad",
  },
];
