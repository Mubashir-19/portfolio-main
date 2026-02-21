const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["JavaScript", "Python", "Dart", "Java", "C++"]
    },
    {
      title: "Web Technologies",
      skills: ["React", "Next.js", "Express.js", "Flask", "HTML/CSS"]
    },
    {
      title: "Database Systems",
      skills: ["MongoDB", "MySQL", "PostgreSQL"]
    },
    {
      title: "AI & Machine Learning",
      skills: ["TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy", "OpenCV"]
    },
    {
      title: "Cloud Technologies",
      skills: ["Azure", "Google Cloud", "AWS"]
    },
    {
      title: "DevOps & Tools",
      skills: ["Git", "Docker", "CI/CD"]
    },
    {
      title: "Specialized Areas",
      skills: ["Chatbot Development", "AI/ML Pipelines", "Web Development", "RAG Systems"]
    }
  ]

  return (
    <section id="skills" className="section bg-neutral-50">
      <div className="container-custom">
        <div className="section-header">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Comprehensive expertise across multiple technologies and domains
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="card p-6 relative overflow-hidden min-h-[200px]">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary"></div>
              
              <h3 className="text-lg font-bold text-neutral-800 mb-6 text-center">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {category.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
