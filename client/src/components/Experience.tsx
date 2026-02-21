const Experience = () => {
  const experiences = [
    {
      period: "March 2022 – Present",
      title: "Web and AI Chatbot Developer",
      company: "Fiverr (Freelance)",
      location: "Karachi, Pakistan",
      responsibilities: [
        "Developed SaaS applications using Next.js and MERN stack",
        "Built and deployed Telegram and Discord AI chatbots",
        "Integrated payment gateways (Cryptomus, Stripe) and custom chatbot interfaces",
        "Delivered scalable solutions deployed in Azure and Google Cloud"
      ]
    },
    {
      period: "2023 – Present",
      title: "AI Engineer & Web developer",
      company: "Upwork (Freelance)",
      location: "Remote",
      responsibilities: [
        "Developed AI solutions for fraud (rug pull) detection and smart investment insights",
        "Built RAG pipelines for enhanced AI capabilities",
        "Developed and maintained multiple SaaS Chatbot Websites with real-time features"
      ]
    }
  ]

  return (
    <section id="experience" className="section bg-neutral-50">
      <div className="container-custom">
        <div className="section-header">
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            Building scalable solutions across multiple platforms
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <div className="card p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="md:w-48 flex-shrink-0">
                      <div className="inline-block bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {exp.period}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral-800 mb-2">{exp.title}</h3>
                      <h4 className="text-lg text-primary-500 font-semibold mb-1">{exp.company}</h4>
                      <p className="text-neutral-600 mb-4">{exp.location}</p>
                      
                      <ul className="space-y-2">
                        {exp.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-neutral-600">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Line */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-6 top-full w-0.5 h-8 bg-gradient-primary"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
