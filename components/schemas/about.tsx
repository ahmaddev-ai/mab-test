export const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://mianahmadbasit.com/about#aboutpage",

      url: "https://mianahmadbasit.com/about",

      name: "About Mian Ahmad Basit",

      description:
        "Learn about Mian Ahmad Basit, a Pakistani Technology Entrepreneur, Artificial Intelligence Expert, Software Engineer, Blockchain Consultant, Cloud Computing Specialist, Technology Speaker, Mentor, and SaaS Product Builder.",

      isPartOf: {
        "@id": "https://mianahmadbasit.com/#website",
      },

      about: {
        "@id": "https://mianahmadbasit.com/#person",
      },

      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://mianahmadbasit.com/mab.webp",
      },

      inLanguage: "en",
    },

    {
      "@type": "Person",

      "@id": "https://mianahmadbasit.com/#person",

      name: "Mian ahmad Basit",

      alternateName: ["Mian Ahmad Basit", "Ahmad Basit", "MAB"],

      url: "https://mianahmadbasit.com",

      image: "https://mianahmadbasit.com/mab.webp",

      description:
        "Pakistani Technology Entrepreneur, Artificial Intelligence Expert, Blockchain Consultant, Software Engineer, Cloud Computing Specialist, Technology Speaker, Mentor, and Digital Transformation Leader.",

      nationality: {
        "@type": "Country",
        name: "Pakistan",
      },

      jobTitle: [
        "Technology Entrepreneur",
        "Artificial Intelligence Expert",
        "Software Engineer",
        "Blockchain Consultant",
        "Cloud Computing Specialist",
        "Technology Consultant",
        "Technology Speaker",
      ],

      worksFor: {
        "@type": "Organization",
        name: "P2P Clouds",
      },

      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Your University",
      },

      knowsAbout: [
        "Artificial Intelligence",
        "Generative AI",
        "Machine Learning",
        "Large Language Models",
        "AI Agents",
        "Software Engineering",
        "Software Architecture",
        "Blockchain",
        "Web3",
        "Cloud Computing",
        "Cloud Native",
        "Cybersecurity",
        "Automation",
        "Digital Transformation",
        "SaaS",
        "Startup Development",
        "Technology Leadership",
        "Innovation",
      ],

      sameAs: [
        "https://www.linkedin.com/in/mianahmadbasit",
        "https://github.com/MianAhmadBasit",
        "https://twitter.com/MianAhmadBasit1",
        "https://www.instagram.com/mianahmadbasit",
      ],
    },

    {
      "@type": "FAQPage",

      "@id": "https://mianahmadbasit.com/about#faq",

      mainEntity: [
        {
          "@type": "Question",
          name: "Who is Mian Ahmad Basit?",

          acceptedAnswer: {
            "@type": "Answer",
            text: "Mian Ahmad Basit is a Pakistani technology entrepreneur, AI innovator, software engineer, blockchain consultant, cloud computing specialist, technology speaker, and mentor specializing in Artificial Intelligence, SaaS, Web3, and digital transformation.",
          },
        },
        {
          "@type": "Question",
          name: "Who is Ahmad Basit?",

          acceptedAnswer: {
            "@type": "Answer",
            text: "Mian Ahmad Basit is a Pakistani technology entrepreneur, AI innovator, software engineer, blockchain consultant, cloud computing specialist, technology speaker, and mentor specializing in Artificial Intelligence, SaaS, Web3, and digital transformation.",
          },
        },

        {
          "@type": "Question",
          name: "What technologies does Ahmad Basit work with?",

          acceptedAnswer: {
            "@type": "Answer",
            text: "Mian Ahmad Basit works with Artificial Intelligence, Machine Learning, Generative AI, Blockchain, Web3, Cloud Computing, SaaS platforms, Software Engineering, Automation, Cybersecurity, and Digital Transformation.",
          },
        },

        {
          "@type": "Question",
          name: "What is Mian Ahmad Basit known for?",

          acceptedAnswer: {
            "@type": "Answer",
            text: "Mian Ahmad Basit is known for building AI-powered software products, cloud-native platforms, blockchain solutions, mentoring developers, speaking at technology events, and helping organizations adopt emerging technologies.",
          },
        },

        {
          "@type": "Question",
          name: "Does Mian Ahmad Basit provide technology consulting?",

          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Mian Ahmad Basit provides technology consulting, AI strategy, software architecture guidance, cloud solutions, digital transformation consulting, and technology leadership for startups and enterprises.",
          },
        },
      ],
    },
  ],
};
