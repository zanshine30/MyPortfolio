import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="relative min-h-screen bg-card py-24 px-8 md:px-16">
      <div className="absolute left-8 md:left-16 top-24 section-number">
        .03
      </div>
      
      <nav className="absolute right-8 md:right-16 top-24 flex items-center gap-8">
        <a href="#projects" className="nav-link">
          Projects
        </a>
        <a href="#contact" className="nav-link text-foreground">
          Contact
        </a>
      </nav>
      
      <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 hidden md:block">
        <span className="subtitle-text writing-mode-vertical">Index</span>
      </div>
      
      <div className="max-w-5xl mx-auto pt-32">
        <div className="grid md:grid-cols-2 gap-16 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {/* Contact Info */}
          <div>
            <h2 className="heading-display text-2xl md:text-3xl mb-8">
              CONTACT
            </h2>
            
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="subtitle-text mb-2">Address</h3>
                <p className="text-foreground text-sm">Khmelnyts'kyi, Dniprovs'ка str., 42</p>
              </div>
              
              <div>
                <h3 className="subtitle-text mb-2">Phone</h3>
                <p className="text-foreground text-sm">+380 900 100 15 33</p>
              </div>
              
              <div>
                <h3 className="subtitle-text mb-2">E-mail</h3>
                <p className="text-foreground text-sm">tura@gmail.com</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="heading-display text-2xl md:text-3xl mb-8">
              CONTACT FORM
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your e-mail"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="border border-border px-8 py-3 text-xs tracking-[0.2em] uppercase text-foreground hover:bg-secondary transition-colors duration-300 flex items-center gap-2"
              >
                Send Message
                <span>→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
