import { motion } from 'framer-motion'
import { Github, Linkedin, Download, ArrowRight, Mail, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'

const Hero = () => {
  const [yearsExperience, setYearsExperience] = useState(3)

  useEffect(() => {
    const startDate = new Date('2022-03-01')
    const currentDate = new Date()
    const years = currentDate.getFullYear() - startDate.getFullYear()
    const monthDiff = currentDate.getMonth() - startDate.getMonth()
    const dayDiff = currentDate.getDate() - startDate.getDate()

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      setYearsExperience(Math.max(1, years - 1))
    } else {
      setYearsExperience(Math.max(1, years))
    }
  }, [])

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="section bg-gradient-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-accent rounded-full filter blur-[100px] opacity-30 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-100 rounded-full filter blur-[120px] opacity-20 -z-10" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh] py-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
              >
                Hi, I'm <span className="gradient-text">Mubashir Ahmed</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-2xl"
              >
                AI Engineer & Full Stack Developer specializing in building scalable web applications and AI 
                solutions that bring together cutting-edge technology and real-time communication.
              </motion.p>
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={scrollToProjects}
                className="btn btn-primary group"
              >
                View My Work
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={scrollToContact}
                className="btn btn-secondary"
              >
                Get In Touch
              </button>
              
              <a
                href="/Mubashir_Ahmed_CV_Latest.pdf"
                download="Mubashir_Ahmed_CV.pdf"
                className="btn btn-cv group"
              >
                <Download className="w-6 h-6 mr-2 group-hover:scale-110 group-hover:-rotate-12 transition-all" />
                Download CV
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex gap-4"
            >
              <a
                href="https://github.com/Mubashir-19"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-neutral-800 text-neutral-800 rounded-full hover:bg-neutral-800 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-soft"
              >
                <Github className="w-5 h-5" />
                <span className="font-semibold">GitHub</span>
              </a>
              
              <a
                href="https://www.linkedin.com/in/mubashirahmed23"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-soft"
              >
                <Linkedin className="w-5 h-5" />
                <span className="font-semibold">LinkedIn</span>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-extrabold text-primary-500">50+</div>
                <div className="text-sm text-neutral-500 font-medium">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-extrabold text-primary-500">{yearsExperience}+</div>
                <div className="text-sm text-neutral-500 font-medium">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-extrabold text-primary-500">100+</div>
                <div className="text-sm text-neutral-500 font-medium">Happy Clients</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative max-w-lg mx-auto">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-primary p-1">
                <div className="w-full h-full bg-white rounded-3xl overflow-hidden">
                  <img
                    src="/assets/Mub.webp"
                    alt="Mubashir Ahmed - AI Engineer & Full Stack Developer"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-large"
              >
                <Mail className="w-6 h-6 text-primary-500" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-large"
              >
                <Phone className="w-6 h-6 text-green-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
