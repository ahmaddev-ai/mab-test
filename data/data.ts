export const PRODUCTS = [
  {
    slug: "google-ads-optimization-checklist",
    title: "Google Ads Optimization Checklist & Process",
    price: "$19.99",
    image: "/products/google-ads.webp",
    type: "Link",
    description: `
Please note, this is included in the Google Ads curriculum.  
👉 **Struggling to optimize your Google Ads?**  
Most marketers don’t fail because of bad campaigns – they fail because they don’t have a system.

Introducing the Google Ads – **Ultimate Optimization Checklist**  
A 4-step step-by-step template that helps you audit & optimize ANY Google Ads account.

Inside you'll find:  
• Pre-launch check checklist  
• Search Campaign optimization  
• Performance Max optimization  
• Shopping optimization  
• Demand Gen optimization  
• Priority tracker  
• Notes, owners & next steps  
Perfect for freelancers, agencies, business owners, and performance marketers who want predictable results.
`,
    faq: [
      "What is the refund policy?",
      "For how long can I access the content?",
      "Who is this checklist for?",
      "What formats does the template come in?",
      "Will this work for all campaign types?",
      "Can I use this for multiple accounts or clients?",
      "Will this help improve my Google Ads performance?",
      "Will there be updates?",
    ],
  },
  {
    slug: "digital-marketing-strategy-2in1",
    title: "Real Digital Marketing Strategy Template (2 in 1)",
    price: "$12.99",
    oldPrice: "$19.99",
    image: "/products/digital-strategy.webp",
    type: "Link",
    description:
      "Complete digital marketing strategy templates including KPIs, funnels, and channel planning.",
    faq: [
      "What is included?",
      "Can beginners use this?",
      "Does it include frameworks?",
      "Are updates free?",
    ],
  },
  {
    slug: "digital-marketing-agency-kit",
    title: "Digital Marketing Agency Kit (6 in 1)",
    price: "$23.99",
    image: "/products/agency-kit.webp",
    type: "Link",
    description:
      "A premium collection for agencies including proposals, SOPs, workflows, planning sheets, and more.",
    faq: [
      "Can I rebrand this?",
      "Is this editable?",
      "Do you include SOPs?",
      "Can I use for clients?",
    ],
  },
  {
    slug: "media-planning-templates",
    title: "Media Planning Templates",
    price: "$8.99",
    image: "/products/media-plan.webp",
    type: "Document",
    description:
      "Media plan sheets for budgeting, platforms distribution, and forecasting.",
    faq: [
      "What formats?",
      "How many templates?",
      "Editable?",
      "Included sheets?",
    ],
  },
];

export const BLOGS = [
  {
    id: "ai-future",
    title: "Artificial Intelligence: Shaping the Future of Humanity",
    category: "AI",
    image: "/blogs/ai.webp",
    author: "Mian Ahmad Basit",
    date: "Jan 2026",
    readTime: "10 min read",

    excerpt:
      "Artificial Intelligence is transforming industries, redefining work, and reshaping how humans interact with technology.",

    intro:
      "Artificial Intelligence has moved beyond theory into real-world impact. From healthcare to finance, AI systems are now influencing critical decisions at scale.",

    sections: [
      {
        heading: "What is Artificial Intelligence?",
        text: "Artificial Intelligence refers to systems designed to replicate human cognitive abilities such as learning, reasoning, and decision-making. Through machine learning and neural networks, AI systems continuously improve using data.",
      },
      {
        heading: "How AI is Transforming Industries",
        text: "AI is widely used in healthcare for diagnostics, in finance for fraud detection, and in retail for personalization. Businesses rely on AI to automate workflows and enhance operational efficiency.",
      },
      {
        heading: "Ethical Challenges of AI",
        text: "Bias, data privacy, transparency, and job displacement remain major concerns. Responsible AI development focuses on fairness, accountability, and human oversight.",
      },
      {
        heading: "The Future of AI",
        text: "AI will augment human intelligence rather than replace it. Professionals who adapt and collaborate with AI will lead the next phase of innovation.",
      },
    ],

    keyPoints: [
      "AI improves efficiency and decision-making",
      "Ethical AI development is critical",
      "Human–AI collaboration defines the future",
    ],
    faqs: [
      {
        question: "What is Artificial Intelligence?",
        answer:
          "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think, learn, and perform tasks autonomously. It includes subfields such as machine learning, deep learning, and natural language processing.",
      },
      {
        question: "How is AI used in everyday life?",
        answer:
          "AI powers virtual assistants like Siri and Alexa, recommends content on streaming platforms, optimizes e-commerce search results, enables smart home devices, and assists in healthcare diagnostics, finance, and more.",
      },
      {
        question: "What are the risks associated with AI?",
        answer:
          "AI can perpetuate biases in decision-making, threaten privacy, and disrupt job markets. Ethical frameworks and regulations are essential to ensure responsible deployment.",
      },
      {
        question: "Will AI replace humans?",
        answer:
          "AI is designed to augment human capabilities, not replace them. Collaborative AI systems help humans perform tasks more efficiently while allowing for creativity and ethical judgment.",
      },
      {
        question: "How can I start learning AI?",
        answer:
          "Start with Python programming, basic machine learning concepts, and AI frameworks like TensorFlow or PyTorch. Online courses, tutorials, and hands-on projects can accelerate learning.",
      },
    ],
    conclusion:
      "Artificial Intelligence represents one of the most significant technological shifts in history. With responsible adoption, AI has the potential to enhance human progress globally.",
  },
  {
    id: "blockchain-revolution",
    title: "Blockchain Technology: Beyond Cryptocurrency",
    category: "Blockchain",
    image: "/blogs/blockchain.webp",
    author: "Mian Ahmad Basit",
    date: "Jan 2026",
    readTime: "9 min read",

    excerpt:
      "Blockchain technology is more than digital currency — it is redefining trust, transparency, and decentralization across global industries.",

    intro:
      "Blockchain has evolved far beyond its early association with cryptocurrencies. Today, it is emerging as a foundational technology capable of transforming how data, assets, and trust are managed in the digital economy.",

    sections: [
      {
        heading: "Understanding Blockchain Technology",
        text: "Blockchain is a decentralized and immutable digital ledger that records transactions across a distributed network. Each block is cryptographically linked to the previous one, ensuring transparency, security, and resistance to tampering without relying on centralized authorities.",
      },
      {
        heading: "Why Blockchain Matters",
        text: "Traditional systems depend heavily on intermediaries such as banks, governments, or corporations. Blockchain removes this dependency by enabling peer-to-peer transactions, reducing costs, improving efficiency, and increasing trust between participants.",
      },
      {
        heading: "Blockchain Use Cases Across Industries",
        text: "Blockchain is actively transforming supply chains through real-time tracking and verification. In healthcare, it secures patient data and improves interoperability. Financial institutions use blockchain for faster settlements, while governments explore it for digital identity and voting systems.",
      },
      {
        heading: "Smart Contracts and Automation",
        text: "Smart contracts are self-executing programs stored on the blockchain. They automatically enforce agreements once predefined conditions are met, eliminating intermediaries, reducing human error, and enabling transparent automation across industries.",
      },
      {
        heading: "Challenges Facing Blockchain Adoption",
        text: "Despite its potential, blockchain faces challenges including scalability, high energy consumption, regulatory uncertainty, and technical complexity. However, innovations such as Layer-2 solutions and proof-of-stake consensus mechanisms are addressing these limitations.",
      },
      {
        heading: "The Future of Decentralized Systems",
        text: "Blockchain represents a shift toward decentralized ownership of data, identity, and digital assets. As adoption grows, it will play a critical role in shaping Web3, decentralized finance, and the next generation of digital infrastructure.",
      },
    ],

    keyPoints: [
      "Blockchain enables trust without intermediaries",
      "Smart contracts automate and secure agreements",
      "Decentralization empowers individuals and organizations",
      "Scalability and regulation remain key challenges",
    ],
    faqs: [
      {
        question: "What is Blockchain technology?",
        answer:
          "Blockchain is a decentralized and immutable digital ledger that records transactions securely across a network. It eliminates the need for a central authority and ensures transparency and trust.",
      },
      {
        question: "Is blockchain only for cryptocurrencies?",
        answer:
          "No. While blockchain gained fame through Bitcoin, it is also used in supply chain management, healthcare, digital identity, voting systems, and more, thanks to its transparency and security.",
      },
      {
        question: "What are smart contracts?",
        answer:
          "Smart contracts are self-executing programs stored on a blockchain that automatically enforce rules and agreements without intermediaries. They improve efficiency, reduce costs, and minimize human error.",
      },
      {
        question: "What are the challenges of blockchain?",
        answer:
          "Key challenges include scalability, high energy consumption, regulatory uncertainty, and integration complexity. Emerging solutions like proof-of-stake and Layer-2 scaling address some of these issues.",
      },
      {
        question: "How can blockchain impact businesses?",
        answer:
          "Blockchain improves transparency, traceability, and trust in operations. It enables secure transactions, enhances supply chain management, and allows businesses to innovate with decentralized applications.",
      },
    ],
    conclusion:
      "Blockchain is not merely a technological trend — it is a structural shift in how digital trust is established. As innovation continues and adoption expands, blockchain will redefine transparency, ownership, and accountability in the digital world.",
  },
  {
    id: "modern-web-development",
    title: "Modern Web Development: Tools, Trends, and Best Practices",
    category: "Development",
    image: "/blogs/development.webp",
    author: "Mian Ahmad Basit",
    date: "Jan 2026",
    readTime: "11 min read",

    excerpt:
      "Modern web development combines performance, scalability, and user experience through powerful frameworks, cloud infrastructure, and best practices.",

    intro:
      "Web development has evolved far beyond static websites. Today’s applications are dynamic, data-driven, and performance-focused, designed to deliver seamless experiences across devices and platforms.",

    sections: [
      {
        heading: "The Evolution of Web Development",
        text: "Early websites were primarily static and content-focused. Modern web development emphasizes interactivity, real-time updates, and application-like behavior, driven by user expectations and advancements in browser capabilities.",
      },
      {
        heading: "Modern Frameworks and Libraries",
        text: "Frameworks such as React, Next.js, Vue, and Svelte have transformed development workflows. Component-based architecture promotes code reuse, maintainability, and faster development cycles while enabling complex user interfaces.",
      },
      {
        heading: "Rendering Strategies and Performance",
        text: "Techniques like server-side rendering (SSR), static site generation (SSG), and incremental static regeneration (ISR) improve load times, SEO, and user experience. Performance optimization is now a core development requirement.",
      },
      {
        heading: "APIs, Microservices, and Cloud Platforms",
        text: "Modern applications rely on APIs and microservices instead of monolithic backends. Cloud platforms such as AWS, Firebase, and Vercel enable scalable deployments, global distribution, and simplified infrastructure management.",
      },
      {
        heading: "Design Systems and Styling",
        text: "Design systems ensure visual consistency and scalability. Tools like Tailwind CSS and component libraries allow teams to move faster while maintaining a unified design language across products.",
      },
      {
        heading: "Security, Accessibility, and Best Practices",
        text: "Security and accessibility are no longer optional. Secure authentication, data protection, accessibility compliance, and performance monitoring are essential for delivering trustworthy and inclusive web applications.",
      },
      {
        heading: "The Future of Web Development",
        text: "Emerging trends include AI-assisted development, edge computing, Web3 technologies, and immersive experiences. Developers who continuously adapt will remain highly relevant in an evolving digital landscape.",
      },
    ],

    keyPoints: [
      "Modern web apps prioritize performance and scalability",
      "Frameworks simplify complex UI development",
      "Cloud and APIs enable rapid growth",
      "Accessibility and security are essential standards",
      "Continuous learning is critical for developers",
    ],
    faqs: [
      {
        question: "What is modern web development?",
        answer:
          "Modern web development focuses on building fast, scalable, and user-centric applications using frameworks like React, Next.js, and Vue, along with component-based architectures and responsive designs.",
      },
      {
        question: "What are SSR and SSG?",
        answer:
          "SSR (Server-Side Rendering) generates pages on the server for better SEO and performance. SSG (Static Site Generation) pre-builds pages during deployment for faster load times and scalability.",
      },
      {
        question: "Why is accessibility important?",
        answer:
          "Accessibility ensures that web applications are usable by everyone, including people with disabilities. It improves usability, expands audience reach, and meets legal and ethical standards.",
      },
      {
        question: "What is the role of APIs in modern web apps?",
        answer:
          "APIs (Application Programming Interfaces) allow web applications to communicate with external services, enabling features like authentication, payments, data storage, and third-party integrations.",
      },
      {
        question: "What trends are shaping the future of web development?",
        answer:
          "AI-assisted coding, edge computing, Web3, augmented reality (AR), and virtual reality (VR) are emerging trends. Developers who adopt these technologies will remain highly valuable.",
      },
    ],
    conclusion:
      "Modern web development is a balance between engineering excellence and user experience. By adopting the right tools, best practices, and forward-looking mindset, developers can build scalable and future-ready digital products.",
  },
  {
    id: "digital-marketing-growth",
    title: "Digital Marketing: Driving Growth in the Online Era",
    category: "Marketing",
    image: "/blogs/marketing.webp",
    author: "Mian Ahmad Basit",
    date: "Jan 2026",
    readTime: "10 min read",

    excerpt:
      "Digital marketing enables brands to reach, engage, and convert audiences through data-driven strategies and personalized experiences.",

    intro:
      "In today’s digital-first economy, marketing has evolved into a sophisticated blend of technology, data, and creativity. Digital marketing allows businesses to connect with the right audience, at the right time, with measurable impact.",

    sections: [
      {
        heading: "The Shift to Digital-First Marketing",
        text: "Consumer behavior has shifted dramatically toward online platforms. Brands that fail to adopt digital strategies risk losing visibility, relevance, and competitive advantage in an increasingly crowded marketplace.",
      },
      {
        heading: "Core Digital Marketing Channels",
        text: "Search engine optimization improves organic visibility, social media marketing builds engagement, content marketing establishes authority, and paid advertising accelerates reach. A successful strategy balances all channels effectively.",
      },
      {
        heading: "The Role of Data and Analytics",
        text: "Modern marketing relies on analytics to track performance, understand user behavior, and optimize campaigns. Data-driven decision-making reduces guesswork and improves return on investment.",
      },
      {
        heading: "Personalization and Automation",
        text: "AI-powered tools enable personalized content, automated email campaigns, and customer journey optimization. Personalization increases engagement and builds stronger customer relationships.",
      },
      {
        heading: "Building Trust and Brand Authenticity",
        text: "Consumers value transparency, authenticity, and meaningful communication. Brands that focus on education and long-term relationships outperform those that prioritize short-term sales tactics.",
      },
      {
        heading: "Future Trends in Digital Marketing",
        text: "The future of digital marketing includes AI-driven insights, voice search optimization, immersive experiences, and deeper integration between automation and human creativity.",
      },
    ],

    keyPoints: [
      "Digital marketing is essential for modern business growth",
      "Data-driven strategies improve campaign performance",
      "Personalization increases customer engagement",
      "Trust and authenticity drive long-term success",
      "Technology and creativity must work together",
    ],
    faqs: [
      {
        question: "What is digital marketing?",
        answer:
          "Digital marketing is the promotion of products or services through online channels such as social media, search engines, email, content marketing, and paid advertising to reach and engage customers.",
      },
      {
        question: "How does SEO help businesses?",
        answer:
          "Search Engine Optimization improves a website’s visibility on search engines, attracting organic traffic and increasing brand awareness, leads, and sales.",
      },
      {
        question: "What role does data play in digital marketing?",
        answer:
          "Data helps marketers understand audience behavior, optimize campaigns, personalize experiences, and measure ROI. Analytics and AI-driven insights are central to decision-making.",
      },
      {
        question: "What is content marketing?",
        answer:
          "Content marketing involves creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience, ultimately driving profitable customer action.",
      },
      {
        question: "How do brands build trust online?",
        answer:
          "Trust is built through transparency, consistent quality content, ethical practices, engagement with the audience, and authentic storytelling across digital platforms.",
      },
    ],
    conclusion:
      "Digital marketing is no longer optional — it is a core business function. Brands that embrace data, technology, and authentic communication will build sustainable growth in the digital era.",
  },
  {
    id: "finance-smart-investing",
    title: "Finance & Smart Investing in a Digital World",
    category: "Finance",
    image: "/blogs/finance.webp",
    author: "Mian Ahmad Basit",
    date: "Jan 2026",
    readTime: "10 min read",

    excerpt:
      "Smart investing in the digital age combines financial discipline, strategic planning, and technology to build long-term wealth and stability.",

    intro:
      "The financial landscape has undergone a significant transformation. Digital platforms, fintech innovations, and global market access have changed how individuals manage money, invest, and plan for the future.",

    sections: [
      {
        heading: "Understanding Modern Finance",
        text: "Finance today extends beyond traditional banking. Online platforms, digital wallets, and decentralized finance solutions provide faster, more accessible financial services to individuals and businesses worldwide.",
      },
      {
        heading: "Principles of Smart Investing",
        text: "Successful investing is built on diversification, risk management, and long-term vision. Understanding asset classes such as stocks, bonds, real estate, and digital assets is essential for portfolio balance.",
      },
      {
        heading: "Technology and Fintech Innovation",
        text: "Mobile investment apps, robo-advisors, and AI-driven analytics have democratized investing. Technology enables real-time insights, automated strategies, and access to global financial markets.",
      },
      {
        heading: "Managing Risk and Emotions",
        text: "Emotional decision-making remains one of the greatest threats to financial success. Discipline, patience, and a clear strategy help investors navigate market volatility effectively.",
      },
      {
        heading: "The Importance of Financial Literacy",
        text: "Financial literacy empowers individuals to make informed decisions, avoid unnecessary debt, and plan for long-term security. Education is the foundation of financial independence.",
      },
      {
        heading: "The Future of Investing",
        text: "The future of finance will be shaped by automation, artificial intelligence, and decentralized systems. Investors who adapt to innovation while maintaining sound fundamentals will remain resilient.",
      },
    ],

    keyPoints: [
      "Digital finance is reshaping money management",
      "Smart investing requires discipline and diversification",
      "Technology has made investing more accessible",
      "Emotional control is critical to financial success",
      "Financial literacy leads to long-term independence",
    ],
    faqs: [
      {
        question: "What is smart investing?",
        answer:
          "Smart investing is a strategy that combines financial knowledge, risk management, and technology to make informed decisions, diversify portfolios, and grow wealth sustainably.",
      },
      {
        question: "How has technology changed investing?",
        answer:
          "Fintech apps, robo-advisors, and AI analytics allow investors to access global markets, track performance in real-time, and automate portfolio management.",
      },
      {
        question: "What are common investment risks?",
        answer:
          "Market volatility, emotional decision-making, overexposure to a single asset, and lack of research are common risks. Diversification and disciplined strategies help mitigate them.",
      },
      {
        question: "Why is financial literacy important?",
        answer:
          "Financial literacy empowers individuals to make informed decisions, manage risk, achieve independence, and build long-term wealth in a digital economy.",
      },
      {
        question: "Can beginners invest in digital assets safely?",
        answer:
          "Yes, by educating themselves, starting small, diversifying, and using regulated platforms. Risk awareness and disciplined strategies are key to safe investing.",
      },
    ],
    conclusion:
      "Finance in the digital era rewards knowledge, discipline, and adaptability. By combining technology with sound investment principles, individuals can achieve financial stability and sustainable growth.",
  },
];
// data.ts

export const WEBINAR = {
  title: "Mian Ahmad Basit  National Webinar Series",
  subtitle:
    "A collaborative knowledge series with leading universities, tech organizations, and public institutions.",
  description:
    "This webinar brings together academia, industry leaders, and public sector organizations to explore Artificial Intelligence, Emerging Technologies, and Blockchain. The goal is to bridge innovation, education, and real-world impact.",
  heroImage: "/gallery/gallery1.webp",

  topics: [
    {
      title: "Artificial Intelligence",
      description:
        "Real-world AI adoption, ethics, automation, and future workforce transformation.",
      icon: "🤖",
    },
    {
      title: "Emerging Technologies",
      description:
        "Innovation trends shaping the future including Web3, cloud, and automation.",
      icon: "🚀",
    },
    {
      title: "Blockchain",
      description:
        "Decentralization, trustless systems, and real-world blockchain use cases.",
      icon: "🔗",
    },
  ],

  organizations: [
    {
      name: "Jamia Ashrafiya",
      type: "University",
      logo: "/clients/jamia-small.webp",
    },
    {
      name: "University of Lahore (UOL)",
      type: "University",
      logo: "/clients/uol-small.webp",
    },
    { name: "UMT", type: "University", logo: "/clients/umt-small.webp" },
    {
      name: "FAST NUCES",
      type: "University",
      logo: "/clients/fast-small.webp",
    },
    {
      name: "Superior University",
      type: "University",
      logo: "/clients/superior-small.webp",
    },

    {
      name: "Punjab Safe City Authority",
      type: "Government",
      logo: "/clients/psca-small.webp",
    },

    {
      name: "Web3 Pakistan (Bilal Bin Saqib)",
      type: "Web3",
      logo: "/clients/web3pak-small.webp",
    },
  ],
};

export const BOOKS = [
  {
    id: "html-css-jon-duckett",
    title: "HTML & CSS: Design and Build Websites",
    author: "Jon Duckett",
    description:
      "A highly visual and beginner-friendly guide to HTML and CSS. This book explains modern web fundamentals with clear examples, making it ideal for students and aspiring web developers.",
    pdf: "/books/jon-duckett-html-css-book-from-mian-ahmad-basit-website.pdf",
    thumbnail:
      "/books/thumbnails/jon-duckett-html-css-cover-from-mian-ahmad-basit-website.webp",
  },
  {
    id: "javascript-beginner-to-professional",
    title: "JavaScript: Beginner to Professional",
    author: "Laurence Lars Svekis & Maaike van Putten",
    description:
      "A structured JavaScript guide covering fundamentals to advanced concepts. Designed to help beginners transition into professional-level JavaScript development with practical understanding.",
    pdf: "/books/js-beginner-to-professional-book-from-mian-ahmad-basit-website.pdf",
    thumbnail:
      "/books/thumbnails/js-beginner-to-professional-cover-from-mian-ahmad-basit-website.webp",
  },
  {
    id: "python-for-everyone-horstmann",
    title: "Python for Everyone",
    author: "Cay S. Horstmann",
    description:
      "An accessible introduction to Python programming focused on problem-solving and real-world examples. Ideal for beginners, students, and professionals learning Python for data, automation, and software development.",
    pdf: "/books/python-for-everyone-cay-horstmann-from-mian-ahmad-basit-website.pdf",
    thumbnail:
      "/books/thumbnails/python-for-everyone-cay-horstmann-cover-from-mian-ahmad-basit-website.webp",
  },
];

// short data serevicces
export const services = [
  {
    title: "AI Solutions",
    link: "https://p2pclouds.net/ai-development/",
    shortDesc:
      "Harness AI to automate processes, predict outcomes, and enhance decision-making.",
    longDesc:
      "Custom ML models, NLP, computer vision, predictive analytics, and intelligent automation to transform data into actionable insights and improve business efficiency.",
    image: "/services/ai.webp",
    prompt:
      "Futuristic AI concept, robotic brain connected to data streams, digital innovation, glowing neural network, modern 3D style",
  },
  {
    title: "Blockchain Solutions",
    link: "https://p2pclouds.net/blockchain/",
    shortDesc:
      "Implement secure, decentralized systems for trust, transparency, and efficiency.",
    longDesc:
      "Smart contracts, dApps, NFT marketplaces, and secure payment systems for fraud reduction, traceability, and adoption of decentralized technologies.",
    image: "/services/blockchain.webp",
    prompt:
      "Blockchain network, digital nodes connected in 3D, futuristic tech, security, cryptocurrency style",
  },
  {
    title: "SaaS Development",
    link: "https://p2pclouds.net/software-development/",
    shortDesc:
      "Build scalable, cloud-native software delivering value to customers worldwide.",
    longDesc:
      "End-to-end SaaS solutions including ideation, architecture, front-end & back-end development, API integration, and cloud deployment for seamless user experiences.",
    image: "/services/saas.webp",
    prompt:
      "Modern SaaS app interface, cloud computing, software development workflow, professional UI, futuristic 3D style",
  },
  {
    title: "Digital Marketing",
    link: "https://p2pclouds.net/digital-marketing/",
    shortDesc: "Boost brand visibility with data-driven marketing strategies.",
    longDesc:
      "Social media management, SEO, content strategy, paid ads, and analytics to drive engagement, conversion, and long-term growth.",
    image: "/services/digital-marketing.webp",
    prompt:
      "Digital marketing concept, analytics, social media icons, graphs, professional marketing illustration, vibrant colors",
  },
  {
    title: "Brand Building",
    link: "https://p2pclouds.net/",
    shortDesc:
      "Craft a memorable brand identity that resonates with your audience.",
    longDesc:
      "Brand strategy, identity design, visual storytelling, messaging, and market positioning for consistent, impactful branding across all channels.",
    image: "/services/brand-building.webp",
    prompt:
      "Brand strategy concept, abstract visual identity, logos and color palette, professional illustration, creative design",
  },
  {
    title: "Consulting & Strategy",
    link: "/contact",
    shortDesc: "Drive growth with expert technology and business consulting.",
    longDesc:
      "Digital transformation, cloud adoption, IT strategy, and innovation roadmaps to ensure measurable impact and sustainable growth.",
    image: "/services/consulting.webp",
    prompt:
      "Business strategy consulting, futuristic office, charts and data, digital planning, professional illustration",
  },
];

// coursesData.ts
export const COURSEDATA = {
  "google-ads": {
    title: "Google Ads",
    slug: "google-ads",
    shortDesc:
      "Master Google Ads to drive traffic, leads, and conversions for your business.",
    longDesc:
      "This comprehensive Google Ads course is designed for marketers, entrepreneurs, and business owners who want to leverage the power of Google’s advertising platform. You’ll learn how to create highly targeted campaigns, conduct in-depth keyword research, optimize ad performance, manage budgets, and analyze results for maximum ROI. By the end of this course, you will confidently launch and manage Google Ads campaigns that convert visitors into customers. The course includes hands-on exercises, real-world examples, and case studies to make learning practical and actionable.",
    duration: "6 Weeks (3 Sessions per Week)",
    price: "$299",
    level: "Beginner to Advanced",
    format: "Online + Practical Exercises",
    language: "English",
    curriculum: [
      {
        title: "Introduction to Google Ads & Account Setup",
        points: [
          "Overview of Google Ads ecosystem and platforms",
          "Creating a Google Ads account and billing setup",
          "Navigating Google Ads interface and dashboards",
        ],
      },
      {
        title: "Understanding Campaign Types: Search, Display, Video",
        points: [
          "Differences between Search, Display, and Video campaigns",
          "When to use each campaign type effectively",
          "Examples of successful campaigns for each type",
        ],
      },
      {
        title: "Keyword Research & Match Types",
        points: [
          "Using Google Keyword Planner and third-party tools",
          "Understanding broad, phrase, exact, and negative match types",
          "Building a keyword strategy for maximum ROI",
        ],
      },
      {
        title: "Audience Targeting & Segmentation",
        points: [
          "Creating custom audiences and remarketing lists",
          "Using demographics, interests, and behavior for targeting",
          "Segmenting campaigns for better ad performance",
        ],
      },
      {
        title: "Ad Copywriting & Creative Best Practices",
        points: [
          "Writing compelling headlines and descriptions",
          "Designing effective display and video creatives",
          "A/B testing ad copies for optimal performance",
        ],
      },
      {
        title: "Bid Strategies & Budget Management",
        points: [
          "Manual vs automated bidding strategies",
          "Setting daily and lifetime budgets",
          "Optimizing spend across campaigns and ad groups",
        ],
      },
      {
        title: "Conversion Tracking & Analytics",
        points: [
          "Setting up conversion tracking in Google Ads and Analytics",
          "Measuring ROI and key performance indicators",
          "Analyzing data to improve campaigns",
        ],
      },
      {
        title: "Remarketing & Retargeting Techniques",
        points: [
          "Creating remarketing audiences for website visitors",
          "Using dynamic remarketing for e-commerce campaigns",
          "Best practices for retargeting sequences",
        ],
      },
      {
        title: "Optimizing Campaign Performance",
        points: [
          "Monitoring campaigns and adjusting bids",
          "Using A/B testing and experiment features",
          "Scaling high-performing campaigns strategically",
        ],
      },
      {
        title: "Case Studies & Practical Exercises",
        points: [
          "Analyzing successful real-world Google Ads campaigns",
          "Hands-on exercises to build your own campaigns",
          "Peer review and optimization feedback",
        ],
      },
    ],
    image: "/mab-fast-earning-program/digital-marketing-growth.webp",
  },

  "meta-ads": {
    title: "Meta Ads",
    slug: "meta-ads",
    shortDesc:
      "Learn Facebook & Instagram Ads to scale your online business efficiently.",
    longDesc:
      "Meta Ads course provides end-to-end training on creating, managing, and scaling Facebook and Instagram ad campaigns. You’ll learn audience targeting, ad formats, budgeting, conversion tracking, and data-driven optimization. The course is ideal for marketers, business owners, and social media managers who want measurable results from paid social campaigns. You will work on live ad campaigns and case studies to gain practical insights.",
    duration: "5 Weeks (2 Sessions per Week)",
    price: "$249",
    level: "Beginner to Advanced",
    format: "Online + Practical Exercises",
    language: "English",
    curriculum: [
      {
        title: "Introduction to Meta Ads & Ads Manager",
        points: [
          "Understanding Facebook and Instagram advertising ecosystem",
          "Navigating Meta Ads Manager and Business Manager",
          "Account setup, billing, and permissions",
        ],
      },
      {
        title: "Audience Targeting & Custom Audiences",
        points: [
          "Creating custom, lookalike, and saved audiences",
          "Leveraging demographic, interest, and behavioral targeting",
          "Segmentation strategies for high-converting audiences",
        ],
      },
      {
        title: "Creating Engaging Ads & Creatives",
        points: [
          "Best practices for ad copywriting",
          "Designing creatives for images, videos, and carousels",
          "Tips for attention-grabbing content",
        ],
      },
      {
        title: "Budgeting, Bidding & Campaign Setup",
        points: [
          "Daily vs lifetime budgets and bid strategies",
          "Setting up campaigns, ad sets, and ad levels",
          "Optimizing campaigns for objective-based results",
        ],
      },
      {
        title: "Conversion Tracking & Pixel Setup",
        points: [
          "Installing Facebook Pixel on websites",
          "Tracking events and conversions accurately",
          "Analyzing conversion data to improve ROI",
        ],
      },
      {
        title: "Optimizing Ad Performance",
        points: [
          "Monitoring campaigns with Ads Manager",
          "Using A/B testing to refine creatives",
          "Scaling successful campaigns efficiently",
        ],
      },
      {
        title: "Scaling Campaigns & A/B Testing",
        points: [
          "Incremental scaling strategies",
          "Split testing audiences and creatives",
          "Analyzing test results for actionable insights",
        ],
      },
      {
        title: "Analytics & Reporting",
        points: [
          "Creating performance dashboards",
          "Interpreting key metrics (CTR, CPC, CPA, ROAS)",
          "Making data-driven decisions for campaigns",
        ],
      },
      {
        title: "Practical Campaign Exercises & Case Studies",
        points: [
          "Hands-on setup of live ad campaigns",
          "Reviewing and critiquing campaign results",
          "Implementing learnings into optimized campaigns",
        ],
      },
    ],
    image: "/mab-fast-earning-program/digital-marketing-growth.webp",
  },

  "digital-marketing": {
    title: "Digital Marketing",
    slug: "digital-marketing",
    shortDesc:
      "Become a complete digital marketing professional and grow businesses online.",
    longDesc:
      "This in-depth Digital Marketing course provides the skills required to plan, execute, and manage online marketing strategies. You’ll learn SEO, content marketing, email marketing, social media, paid advertising, and analytics. The course combines theory, strategy, and practical exercises to help you implement marketing campaigns that drive measurable results for any business. By the end, you will be able to create comprehensive marketing plans and execute campaigns with confidence.",
    duration: "8 Weeks (3 Sessions per Week)",
    price: "$399",
    level: "Beginner to Advanced",
    format: "Online + Practical Exercises",
    language: "English",
    curriculum: [
      {
        title: "Introduction to Digital Marketing & Marketing Funnel",
        points: [
          "Understanding the full marketing ecosystem",
          "Overview of marketing funnels and buyer journey",
          "Identifying key metrics for business success",
        ],
      },
      {
        title: "Search Engine Optimization (SEO) Techniques",
        points: [
          "On-page SEO: meta tags, headings, and content optimization",
          "Off-page SEO: backlinks, outreach, and guest posting",
          "Technical SEO: site speed, structured data, and crawlability",
        ],
      },
      {
        title: "Content Marketing & Blogging",
        points: [
          "Creating high-quality, engaging content",
          "Content planning and editorial calendars",
          "Blog SEO and promotion strategies",
        ],
      },
      {
        title: "Social Media Marketing Strategy",
        points: [
          "Platform-specific strategies for Facebook, Instagram, LinkedIn",
          "Content planning and scheduling",
          "Engagement, growth, and influencer marketing tactics",
        ],
      },
      {
        title: "Email Marketing Campaigns & Automation",
        points: [
          "Building email lists and segmentation",
          "Designing effective newsletters and campaigns",
          "Automating sequences for lead nurturing",
        ],
      },
      {
        title: "Pay-Per-Click (PPC) Advertising",
        points: [
          "Google Ads and Bing Ads campaigns",
          "Keyword targeting and bid optimization",
          "Tracking and reporting PPC performance",
        ],
      },
      {
        title: "Analytics, Reporting & Data-Driven Marketing",
        points: [
          "Setting up Google Analytics and dashboards",
          "Tracking KPIs and campaign performance",
          "Data-driven optimizations for marketing campaigns",
        ],
      },
      {
        title: "Conversion Rate Optimization (CRO)",
        points: [
          "Optimizing landing pages for better conversions",
          "A/B testing page elements and layouts",
          "Analyzing user behavior with heatmaps and analytics",
        ],
      },
      {
        title: "Capstone Project: Real Campaign Execution",
        points: [
          "Planning a full digital marketing strategy",
          "Executing campaigns across multiple channels",
          "Analyzing results and presenting a final report",
        ],
      },
    ],
    image: "/mab-fast-earning-program/digital-marketing-growth.webp",
  },
};
