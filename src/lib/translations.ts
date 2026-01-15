export type Language = "en" | "ar";

export const translations = {
  en: {
    nav: {
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      hireMe: "Hire Me",
    },
    hero: {
      badge: "Available for work",
      title: "Faris Hamad",
      subtitle: "Building Digital Excellence",
      description:
        "Hi, I'm a Full Stack Developer based in Sudan, passionate about building high-performance web applications using Next.js, TypeScript, and Firebase.",
      viewProjects: "View My Projects",
      github: "GitHub",
    },
    skills: {
      title: "Technical Arsenal",
      subtitle:
        "Technologies I use to build scalable and performant applications.",
      levels: {
        advanced: "Advanced",
        intermediate: "Intermediate",
      },
    },
    projects: {
      title: "Featured Projects",
      subtitle:
        "Highlighting my expertise in building scalable web applications.",
      source: "Source",
      demo: "Live Demo",
      items: {
        liperPizza: {
          title: "Liper Pizza",
          description:
            "A premium storefront for Liper Pizza, featuring real-time inventory, localized categories, and a seamless shopping experience.",
        },
        lpDashboard: {
          title: "LP Dashboard",
          description:
            "A robust administrative suite for managing orders, products, and real-time shop analytics with secure authentication.",
        },
        lpDriver: {
          title: "LP Driver",
          description:
            "A specialized logistics application for order fulfillment, featuring real-time status updates and delivery management.",
        },
      },
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Ready to start your next project?",
      details: {
        email: "Email",
        location: "Location",
        locationValue: "Remote / Worldwide",
        phone: "Phone",
      },
      form: {
        title: "Send a Message",
        description: "I'll get back to you as soon as possible.",
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Your Message",
        send: "Send Message",
      },
    },
    footer: {
      text: "© {year} Portfolio. Built with Next.js, Tailwind, and Shadcn UI.",
    },
  },
  ar: {
    nav: {
      skills: "المهارات",
      projects: "المشاريع",
      contact: "اتصل بي",
      hireMe: "وظفني",
    },
    hero: {
      badge: "متاح للعمل",
      title: "فارس حمد",
      subtitle: "بناء التميز الرقمي",
      description:
        "أهلاً، أنا مطور تطبيقات ويب كامل مقيم في السودان، شغوف ببناء تطبيقات ويب عالية الأداء باستخدام Next.js و TypeScript و Firebase.",
      viewProjects: "عرض مشاريعي",
      github: "جيت هاب",
    },
    skills: {
      title: "الترسانة التقنية",
      subtitle:
        "التقنيات التي أستخدمها لبناء تطبيقات قابلة للتوسع وعالية الأداء.",
      levels: {
        advanced: "متقدم",
        intermediate: "متوسط",
      },
    },
    projects: {
      title: "المشاريع المميزة",
      subtitle: "تسليط الضوء على خبرتي في بناء تطبيقات الويب القابلة للتوسع.",
      source: "المصدر",
      demo: "عرض حي",
      items: {
        liperPizza: {
          title: "ليبر بيتزا",
          description:
            "متجر متميز لـ ليبر بيتزا، يتميز بمخزون في الوقت الفعلي وفئات محلية وتجربة تسوق سلسة.",
        },
        lpDashboard: {
          title: "لوحة تحكم ليبر بيتزا",
          description:
            "مجموعة إدارية قوية لإدارة الطلبات والمنتجات وتحليلات المتجر في الوقت الفعلي مع مصادقة آمنة.",
        },
        lpDriver: {
          title: "سائق ليبر بيتزا",
          description:
            "تطبيق لوجستي متخصص لتنفيذ الطلبات، يتميز بتحديثات الحالة في الوقت الفعلي وإدارة التسليم.",
        },
      },
    },
    contact: {
      title: "تواصل معي",
      subtitle: "هل أنت مستعد لبدء مشروعك القادم؟",
      details: {
        email: "البريد الإلكتروني",
        location: "الموقع",
        locationValue: "عن بعد / في جميع أنحاء العالم",
        phone: "الهاتف",
      },
      form: {
        title: "إرسال رسالة",
        description: "سأرد عليك في أقرب وقت ممكن.",
        name: "الاسم",
        email: "البريد الإلكتروني",
        subject: "الموضوع",
        message: "رسالتك",
        send: "إرسال الرسالة",
      },
    },
    footer: {
      text: "© {year} معرض الأعمال. بني بـ Next.js و Tailwind و Shadcn UI.",
    },
  },
};
