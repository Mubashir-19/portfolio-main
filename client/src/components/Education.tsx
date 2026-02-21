const Education = () => {
  const educationData = [
    {
      period: "2021 – June 2025",
      degree: "Bachelor of Science in Computer Science",
      institution: "Sindh Madressatul Islam University (SMIU)",
      location: "Karachi, Pakistan • GPA: 3.4",
      details: [
        "Relevant Coursework: Data Structures, Algorithms, Machine Learning, Cloud Computing",
        "Focus on AI/ML applications and software engineering principles",
        "Active participation in tech communities and project development"
      ]
    },
    {
      period: "Oct 2021 – March 2022",
      degree: "Chatbot Development Certification",
      institution: "Saylani Mass IT Training Program",
      location: "Karachi, Pakistan",
      details: [
        "Comprehensive training in server development and webhook integration",
        "Created chatbots for WhatsApp, Discord, Messenger, and Telegram platforms",
        "Implemented moderation features and custom functionalities",
        "Integrated payment gateway solutions directly into chatbot systems",
        "Gained hands-on experience with real-time communication APIs"
      ]
    }
  ]

  return (
    <section id="education" className="section">
      <div className="container-custom">
        <div className="section-header">
          <h2 className="section-title">Education & Training</h2>
          <p className="section-subtitle">
            Academic foundation and specialized training in technology
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {educationData.map((edu, index) => (
              <div key={index} className="relative">
                <div className="card p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="md:w-48 flex-shrink-0">
                      <div className="inline-block bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {edu.period}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral-800 mb-2">{edu.degree}</h3>
                      <h4 className="text-lg text-primary-500 font-semibold mb-1">{edu.institution}</h4>
                      <p className="text-neutral-600 mb-4">{edu.location}</p>
                      
                      <ul className="space-y-2">
                        {edu.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-neutral-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Line */}
                {index < educationData.length - 1 && (
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

export default Education
