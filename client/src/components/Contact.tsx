import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitMessage('Thanks! Your message has been sent.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Clear message after 3 seconds
      setTimeout(() => setSubmitMessage(''), 3000)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "contact@mubashir.me",
      link: "mailto:contact@mubashir.me"
    },
    {
      icon: "📱",
      title: "Phone",
      value: "+92-337-8063440",
      link: "tel:+923378063440"
    },
    {
      icon: "📍",
      title: "Location",
      value: "Karachi, Pakistan",
      link: null
    },
    {
      icon: "🌐",
      title: "Website",
      value: "mubashir.me",
      link: "https://mubashir.me"
    }
  ]

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full filter blur-[120px] opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100 rounded-full filter blur-[100px] opacity-30 -z-10" />
      
      <div className="container-custom relative z-10">
        <div className="section-header">
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Ready to bring your AI and web development ideas to life
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="card p-6 flex items-center gap-6 group hover:scale-102 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center text-2xl text-white group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-1">{info.title}</h4>
                  {info.link ? (
                    <a 
                      href={info.link}
                      className="text-neutral-600 hover:text-primary-500 transition-colors font-medium"
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-neutral-600 font-medium">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Contact Form */}
          <div className="card p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-neutral-800 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-800 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-neutral-800 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-neutral-800 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="form-input resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitMessage && (
                <div className="text-center text-green-600 font-semibold mt-4">
                  ✅ {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
