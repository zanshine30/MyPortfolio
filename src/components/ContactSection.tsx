import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ContactSection = () => {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation({ threshold: 0.2 });
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

      <div className="max-w-5xl mx-auto pt-32">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div ref={leftRef} className={`pt-6 scroll-fade-left ${leftVisible ? 'visible' : ''}`}>
            <h2 className="heading-display text-2xl md:text-3xl mb-8">
              CONTACT
            </h2>

            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="subtitle-text mb-2">GitHub</h3>
                <a
                  href="https://github.com/zanshine30"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground text-sm hover:text-muted-foreground transition-colors"
                >
                  github.com/zanshine30
                </a>
              </div>

              <div>
                <h3 className="subtitle-text mb-2">Phone</h3>
                <p className="text-foreground text-sm">+63 9383558102</p>
                <p className="text-foreground text-sm">+63 9912585180</p>
              </div>

              <div>
                <h3 className="subtitle-text mb-2">E-mail</h3>
                <a
                  href="mailto:nocilladojohnjohn30@gmail.com"
                  className="text-foreground text-sm hover:text-muted-foreground transition-colors"
                >
                  nocilladojohnjohn30@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form - Always Elevated Card */}
          <div ref={rightRef} className={`scroll-fade-right ${rightVisible ? 'visible' : ''}`}>
            <div className="bg-secondary/80 rounded-lg p-8 shadow-2xl -translate-y-2">
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
                  className="w-full bg-secondary border border-border px-8 py-4 text-xs tracking-[0.2em] uppercase text-foreground hover:bg-muted transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Send Message
                  <span>→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
