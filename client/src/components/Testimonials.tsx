import { useState, useEffect } from 'react'

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      rating: 4.7,
      text: "Mubashir did a great job developing a functional LLM PoC, especially given my evolving requirements. He was responsive, collaborative, and delivered something that met my core needs. Would definitely recommend!",
      author: "dayoodu",
      location: "United Kingdom • May 2024",
      type: "Freelance",
      duration: "4 weeks"
    },
    {
      rating: 5.0,
      text: "It was exceptional and working with him was really good. He has deep understanding of what to do and did everything perfectly. I'd love to work with him more and more. He's highly recommended",
      author: "kayla_brown__",
      location: "Canada • April 2024",
      type: "Freelance",
      duration: "11 days"
    },
    {
      rating: 5.0,
      text: "Outstanding Performance from this well educated seller. He always goes above and beyond to ensure excellence in the quality of his product. I highly recommend and will hire him again.",
      author: "ptpremier",
      location: "United States • December 2023",
      type: "Freelance",
      duration: "1 day"
    },
    {
      rating: 5.0,
      text: "It was great working with Mubashir. He delivered the project on time and as per the expectations.",
      author: "rajatsaxena835",
      location: "India • February 2024",
      type: "Freelance",
      duration: "4 weeks"
    },
    {
      rating: 5.0,
      text: "Very good and fast as usual, will use more in future",
      author: "calleman123",
      location: "Sweden • November 2023",
      type: "Freelance",
      duration: "5 days"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="section bg-gradient-background">
      <div className="container-custom">
        <div className="section-header">
          <h2 className="section-title">What My Clients Say</h2>
          <p className="section-subtitle">
            Trusted by clients worldwide for delivering exceptional AI and web development solutions
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="card p-8 text-center">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="flex text-yellow-400 text-xl">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i < Math.floor(testimonial.rating) ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                      <span className="bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {testimonial.rating}
                      </span>
                    </div>
                    
                    <blockquote className="text-lg text-neutral-700 italic mb-8 leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <h4 className="font-semibold text-neutral-800 mb-1">{testimonial.author}</h4>
                        <p className="text-sm text-neutral-500">{testimonial.location}</p>
                      </div>
                      
                      <div className="text-right">
                        <span className="inline-block bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-xs font-semibold mb-1">
                          {testimonial.type}
                        </span>
                        <p className="text-xs text-neutral-500">{testimonial.duration}</p>
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
              disabled={currentSlide === 0}
            >
              ‹
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
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
              disabled={currentSlide === testimonials.length - 1}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
