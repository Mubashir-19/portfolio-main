const Achievements = () => {
  const achievements = [
    {
      icon: "🏆",
      title: "GitHub Starstruck Badge",
      description: "Awarded for many stars in repositories",
      year: "Since 2020"
    },
    {
      icon: "💻",
      title: "LeetCode Problem Solver",
      description: "Solved over 75+ unique DSA problems",
      year: "2020"
    },
    {
      icon: "📜",
      title: "Node.js Intermediate Certificate",
      description: "HackerRank certification in Node.js",
      year: "2021"
    },
    {
      icon: "🔗",
      title: "GitHub Foundations",
      description: "GitHub platform fundamentals",
      year: "2024"
    },
    {
      icon: "🚀",
      title: "JavaScript Intermediate",
      description: "Advanced JavaScript concepts mastery",
      year: "2023"
    },
    {
      icon: "🤖",
      title: "LangChain Certification",
      description: "Chat with Your Data - DeepLearning.AI",
      year: "2023"
    }
  ]

  return (
    <section id="achievements" className="section bg-neutral-50">
      <div className="container-custom">
        <div className="section-header">
          <h2 className="section-title">Achievements & Certifications</h2>
          <p className="section-subtitle">
            Recognition for technical excellence and continuous learning
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="card p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary"></div>
              
              <div className="text-4xl mb-4">{achievement.icon}</div>
              
              <h3 className="text-lg font-bold text-neutral-800 mb-2">
                {achievement.title}
              </h3>
              
              <p className="text-neutral-600 mb-4">
                {achievement.description}
              </p>
              
              <span className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                {achievement.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
