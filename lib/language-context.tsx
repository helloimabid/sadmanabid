"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "EN" | "BN"

interface Translations {
  hero: {
    subtitle: string
    start: string
    scrollDown: string
    location: string
  }
  skills: {
    about: string
    roles: string[]
    welcome: string
    portfolio: string
  }
  about: {
    title: string
    bio: string
    skills: {
      security: string[]
      development: string[]
      tools: string[]
      learning: string[]
    }
    education: string
    achievements: string
    educationItems: { degree: string; institution: string; period: string }[]
    achievementItems: { title: string; org: string; year: string }[]
  }
  works: {
    title: string
    view: string
  }
  contact: {
    title: string
    description: string
    email: string
    location: string
    locationValue: string
    name: string
    message: string
    send: string
    sending: string
    sent: string
    namePlaceholder: string
    emailPlaceholder: string
    messagePlaceholder: string
  }
  footer: {
    endOfFile: string
    year: string
    site: string
    contact: string
  }
}

const translations: Record<Language, Translations> = {
  EN: {
    hero: {
      subtitle: "+(Security)_..Sadman Abid",
      start: "Start",
      scrollDown: "Scroll Down",
      location: "Dhaka, BD",
    },
    skills: {
      about: "About",
      roles: ["+(Cyber)-Security", "+(Malware)-Analysis", "+(Web)-Developer"],
      welcome: "{welcome@since_2019}",
      portfolio: "Sadman Abid Portfolio",
    },
    about: {
      title: "About",
      bio: "I'm Sadman Abid, a security enthusiast from Dhaka, Bangladesh. My journey started with web development, but my true passion lies in cybersecurity and understanding how systems can be compromised. Currently focused on malware analysis, vulnerability research, reverse engineering, and developing security tools. I enjoy exploring the dark corners of systems to understand their weaknesses and build better defenses.",
      skills: {
        security: ["Malware Analysis", "Reverse Engineering", "Vulnerability Research", "Penetration Testing"],
        development: ["Python", "C/C++", "Assembly", "Scripting"],
        tools: ["IDA Pro", "Ghidra", "Wireshark", "Burp Suite"],
        learning: ["Exploit Development", "Threat Intelligence", "Forensics", "Red Teaming"],
      },
      education: "Education",
      achievements: "Achievements",
      educationItems: [
        {
          degree: "Higher Secondary Certificate (HSC)",
          institution: "St. Joseph Higher Secondary School",
          period: "2024 - present",
        },
        {
          degree: "Secondary School Certificate (SSC)",
          institution: "Monipur High School and College",
          period: "2014 - 2024",
        },
      ],
      achievementItems: [
        { title: "Web Dev Competition - 3rd Place", org: "Notre Dame IT Club", year: "2025" },
        { title: "Crack the Code - 1st Place", org: "Josephite IT Club", year: "2024" },
        { title: "ICT Olympiad - 1st Place", org: "AIUB Computer Club", year: "2024" },
        { title: "Math Olympiad - 2nd Place", org: "Hermann Gmeiner Science Club", year: "2024" },
      ],
    },
    works: {
      title: "WORKS",
      view: "View",
    },
    contact: {
      title: "Contact",
      description: "Have a project in mind or want to discuss security? Drop me a message and I'll get back to you.",
      email: "Email",
      location: "Location",
      locationValue: "Dhaka, Bangladesh",
      name: "Name",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      sent: "Message Sent!",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "Tell me about your project...",
    },
    footer: {
      endOfFile: "End Of File",
      year: "2025",
      site: "Portfolio site",
      contact: "Contact",
    },
  },
  BN: {
    hero: {
      subtitle: "+(সিকিউরিটি)_..সাদমান আবিদ",
      start: "শুরু",
      scrollDown: "নিচে স্ক্রল করুন",
      location: "ঢাকা, বাংলাদেশ",
    },
    skills: {
      about: "সম্পর্কে",
      roles: ["+(সাইবার)-সিকিউরিটি", "+(ম্যালওয়্যার)-অ্যানালাইসিস", "+(ওয়েব)-ডেভেলপার"],
      welcome: "{স্বাগতম@২০১৯_থেকে}",
      portfolio: "সাদমান আবিদ পোর্টফোলিও",
    },
    about: {
      title: "সম্পর্কে",
      bio: "আমি সাদমান আবিদ, ঢাকা, বাংলাদেশ থেকে একজন সিকিউরিটি উৎসাহী। আমার যাত্রা শুরু হয়েছিল ওয়েব ডেভেলপমেন্ট দিয়ে, কিন্তু আমার আসল আগ্রহ সাইবার সিকিউরিটি এবং সিস্টেম কীভাবে আক্রমণ করা যায় তা বোঝার মধ্যে। বর্তমানে ম্যালওয়্যার অ্যানালাইসিস, ভালনারেবিলিটি রিসার্চ, রিভার্স ইঞ্জিনিয়ারিং এবং সিকিউরিটি টুলস তৈরিতে মনোযোগ দিচ্ছি।",
      skills: {
        security: ["ম্যালওয়্যার অ্যানালাইসিস", "রিভার্স ইঞ্জিনিয়ারিং", "ভালনারেবিলিটি রিসার্চ", "পেনিট্রেশন টেস্টিং"],
        development: ["পাইথন", "সি/সি++", "অ্যাসেম্বলি", "স্ক্রিপ্টিং"],
        tools: ["আইডিএ প্রো", "ঘিদ্রা", "ওয়্যারশার্ক", "বার্প স্যুট"],
        learning: ["এক্সপ্লয়েট ডেভেলপমেন্ট", "থ্রেট ইন্টেলিজেন্স", "ফরেনসিক্স", "রেড টিমিং"],
      },
      education: "শিক্ষা",
      achievements: "অর্জন",
      educationItems: [
        {
          degree: "উচ্চ মাধ্যমিক সার্টিফিকেট (এইচএসসি)",
          institution: "সেন্ট জোসেফ উচ্চ মাধ্যমিক বিদ্যালয়",
          period: "২০২৪ - বর্তমান",
        },
        { degree: "মাধ্যমিক স্কুল সার্টিফিকেট (এসএসসি)", institution: "মনিপুর উচ্চ বিদ্যালয় ও কলেজ", period: "২০১৪ - ২০২৪" },
      ],
      achievementItems: [
        { title: "ওয়েব ডেভ প্রতিযোগিতা - ৩য় স্থান", org: "নটরডেম আইটি ক্লাব", year: "২০২৫" },
        { title: "ক্র্যাক দ্য কোড - ১ম স্থান", org: "জোসেফাইট আইটি ক্লাব", year: "২০২৪" },
        { title: "আইসিটি অলিম্পিয়াড - ১ম স্থান", org: "এআইইউবি কম্পিউটার ক্লাব", year: "২০২৪" },
        { title: "গণিত অলিম্পিয়াড - ২য় স্থান", org: "হারমান মেইনার সায়েন্স ক্লাব", year: "২০২৪" },
      ],
    },
    works: {
      title: "কাজ",
      view: "দেখুন",
    },
    contact: {
      title: "যোগাযোগ",
      description: "কোনো প্রজেক্ট মাথায় আছে বা সিকিউরিটি নিয়ে আলোচনা করতে চান? আমাকে মেসেজ করুন।",
      email: "ইমেইল",
      location: "অবস্থান",
      locationValue: "ঢাকা, বাংলাদেশ",
      name: "নাম",
      message: "বার্তা",
      send: "বার্তা পাঠান",
      sending: "পাঠানো হচ্ছে...",
      sent: "বার্তা পাঠানো হয়েছে!",
      namePlaceholder: "আপনার নাম",
      emailPlaceholder: "আপনার@ইমেইল.কম",
      messagePlaceholder: "আপনার প্রজেক্ট সম্পর্কে বলুন...",
    },
    footer: {
      endOfFile: "ফাইলের শেষ",
      year: "২০২৫",
      site: "পোর্টফোলিও সাইট",
      contact: "যোগাযোগ",
    },
  },
}

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("EN")

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
