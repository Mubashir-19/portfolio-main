import { useState } from 'react'

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const projects = [
    {
      title: "Vector DB Embeddings & Knowledge Management",
      description: "Advanced knowledge management application utilizing vector databases for semantic search and document embeddings. Features intelligent document retrieval and context-aware responses.",
      image: "/assets/know.webp",
      technologies: ["Vector DB", "Embeddings", "Knowledge Management", "Semantic Search"],
      links: {
        demo: "https://chatbot-with-knowledge-management.vercel.app",
        github: null
      }
    },
    {
      title: "Text-to-SQL LLAMA 3.2 3B Fine-tuned Model",
      description: "Final Year Project: Fine-tuned LLAMA 3.2 3B model for natural language to SQL conversion. Achieved 70% ROUGE score and 75% BLEU score. Optimized for both desktop and mobile deployment.",
      image: "/assets/ttsql.webp",
      technologies: ["LLAMA 3.2 3B", "Fine-tuning", "Text-to-SQL", "Mobile Optimization"],
      links: {
        demo: "https://huggingface.co/devMubashir",
        github: "https://github.com/Mubashir-19/local-ttsql-chat"
      }
    },
    {
      title: "Voice Appointment Booking Agentic Pipeline",
      description: "Intelligent voice-powered appointment booking system using OpenAI Agents SDK. Features natural language processing for seamless scheduling and calendar integration.",
      image: "/assets/voice.webp",
      technologies: ["OpenAI Agents SDK", "Voice Recognition", "Agentic AI", "Calendar Integration"],
      links: {
        demo: null,
        github: null
      }
    },
    {
      title: "Funnel2Tunnel: Maritime Domain Expert Chatbot",
      description: "A sophisticated SaaS trained on 800+ maritime documents with OCR scanning and multichat capabilities. Features cost-effective context management for optimal performance.",
      image: "/assets/funnel.webp",
      technologies: ["Next.js", "Langchain", "Pinecone", "AWS", "Stripe"],
      links: {
        demo: "",
        github: null
      }
    },
    {
      title: "Real-Time Token Analysis AI Chatbot",
      description: "Advanced chatbot for fraud and rug pull detection on Solana Network with smart investment insights and risk assessment algorithms to detect scams and honeypots.",
      image: "/assets/token.webp",
      technologies: ["Bitquery API", "Web Scraping", "AI/ML", "Solana"],
      links: {
        demo: "ao1.io",
        github: "https://github.com/Mubashir-19/ao1-site"
      }
    },
    {
      title: "Therabot - AI Therapy Assistant",
      description: "Fine-tuned therapy chatbot available on both web and mobile platforms, providing supportive conversations and mental health guidance.",
      image: "/assets/therabot.webp",
      technologies: ["GPT-3.5", "Web Development", "Mobile Development", "AI Fine-tuning"],
      links: {
        demo: "therabot.bespoketherapy.com",
        github: "https://github.com/Mubashir-19/therabotv4"
      }
    },
    {
      title: "Cross-Platform Blogging Application",
      description: "Medium-like platform with full cross-platform support built using Flutter for mobile and Express.js for backend, providing seamless content creation experience.",
      image: "/assets/blog.webp",
      technologies: ["Flutter", "Express.js", "MongoDB", "Cross-Platform"],
      links: {
        demo: null,
        github: "https://github.com/Mubashir-19/Flutter-Blogging-App"
      }
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section id="projects" className="section">
      <div className="container-custom">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Innovative solutions combining AI, web development, and cloud technologies
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="card overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-neutral-800 mb-4">{project.title}</h3>
                      <p className="text-neutral-600 mb-6 leading-relaxed">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="skill-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-4">
                        {project.links.demo && (
                          <a
                            href={project.links.demo.startsWith('http') ? project.links.demo : `https://${project.links.demo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-500 font-semibold hover:text-primary-600 transition-colors"
                          >
                            View Project
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-600 font-semibold hover:text-neutral-800 transition-colors"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <button
              onClick={prevSlide}
              className="slider-btn"
            >
              ‹
            </button>
            
            <div className="flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="slider-btn"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
