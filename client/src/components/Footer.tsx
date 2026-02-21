const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    navigation: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Experience', href: '#experience' },
      { label: 'Projects', href: '#projects' }
    ],
    services: [
      { label: 'AI Development', href: '#contact' },
      { label: 'Web Development', href: '#contact' },
      { label: 'Chatbot Development', href: '#contact' },
      { label: 'Consulting', href: '#contact' }
    ]
  }

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/Mubashir-19' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mubashirahmed23' },
    { label: 'Email', href: 'mailto:contact@mubashir.me' }
  ]

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.open(href, '_blank', 'noopener noreferrer')
    }
  }

  return (
    <footer className="bg-neutral-800 text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Mubashir Ahmed</h3>
            <p className="text-neutral-300 mb-6 leading-relaxed">
              AI Engineer & Full Stack Developer specializing in building scalable web applications 
              and AI solutions. Passionate about creating innovative technologies that make a difference.
            </p>
            
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="text-neutral-300 hover:text-primary-400 transition-colors font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <div className="space-y-2">
              {footerLinks.navigation.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-neutral-300 hover:text-primary-400 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <div className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-neutral-300 hover:text-primary-400 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-center md:text-left">
              &copy; {currentYear} Mubashir Ahmed. All rights reserved.
            </p>
            <p className="text-neutral-400 text-center md:text-right">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
