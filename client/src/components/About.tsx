const About = () => {
  return (
    <section id="about" className="section">
      <div className="container-custom">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Passionate about building AI-powered solutions that make a difference
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2 space-y-6">
            <p className="text-lg text-neutral-600 leading-relaxed">
              I'm a dedicated AI Engineer and Full Stack Developer with a passion for creating innovative 
              solutions that bridge the gap between artificial intelligence and web development. Currently 
              pursuing my Bachelor's in Computer Science at Sindh Madressatul Islam University, I've been 
              actively developing AI-powered applications and SaaS platforms.
            </p>
            
            <p className="text-lg text-neutral-600 leading-relaxed">
              My expertise spans across modern web technologies like Next.js and MERN stack, combined with 
              advanced AI/ML frameworks including TensorFlow and PyTorch. I specialize in building chatbots, 
              RAG pipelines, and scalable cloud solutions deployed on Azure, AWS, and Google Cloud.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="card p-6 text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="font-semibold text-neutral-800 mb-2">Focus Areas</h4>
                <p className="text-sm text-neutral-600">AI Engineering, Chatbot Development, Full Stack Web Development</p>
              </div>
              
              <div className="card p-6 text-center">
                <div className="text-3xl mb-3">🌍</div>
                <h4 className="font-semibold text-neutral-800 mb-2">Location</h4>
                <p className="text-sm text-neutral-600">Karachi, Pakistan (Remote Friendly)</p>
              </div>
              
              <div className="card p-6 text-center">
                <div className="text-3xl mb-3">🎓</div>
                <h4 className="font-semibold text-neutral-800 mb-2">Education</h4>
                <p className="text-sm text-neutral-600">Computer Science, SMIU (2021-2025)</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-primary p-1">
              <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                <img
                  src="/assets/anonymous.webp"
                  alt="About Mubashir Ahmed"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
