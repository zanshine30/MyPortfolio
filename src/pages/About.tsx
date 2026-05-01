import { useState } from "react";
import { useNavigate } from "react-router-dom";

const calculateAge = (): number => {
  const today = new Date();
  const birthDate = new Date(2004, 0, 30); // January 30, 2004
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  if (!hasHadBirthdayThisYear) age--;
  return age;
};

const About = () => {
  const navigate = useNavigate();
  const age = calculateAge();
  const [photoLoaded, setPhotoLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-card text-foreground overflow-x-hidden">

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-8 left-8 md:left-16 z-50 flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span className="text-xs tracking-[0.25em] uppercase">Back</span>
      </button>

      {/* Page number */}
      <div className="fixed right-8 md:right-16 top-8 section-number z-50">
        about
      </div>

      <div className="max-w-5xl mx-auto px-8 md:px-16 pt-28 pb-24">

        {/* Top: Photo + Name block */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-24">

          {/* Photo placeholder */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="relative aspect-[3/4] bg-secondary rounded-lg overflow-hidden border border-border max-w-sm">
              {/* Replace src with your actual photo path e.g. /images/photo.jpg */}
              <img
                src="/images/profile.jpg"
                alt="John Alwin"
                className="w-full h-full object-cover"
                onLoad={() => setPhotoLoaded(true)}
                onError={(e) => {
                  // Show placeholder if image not found
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Placeholder shown when no image */}
              <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 ${photoLoaded ? "hidden" : ""}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground/30"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <p className="text-muted-foreground/30 text-xs tracking-[0.2em] uppercase">Your Photo</p>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-foreground/20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-foreground/20" />
            </div>
          </div>

          {/* Name + intro */}
          <div className="opacity-0 animate-fade-in flex flex-col justify-center pt-4 md:pt-12" style={{ animationDelay: "0.2s" }}>
            <p className="subtitle-text mb-4">About Me</p>
            <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
              JOHN ALWIN<br />NOCILLADO
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              A junior web designer based in the Philippines, passionate about
              crafting clean, purposeful digital experiences. Always eager to
              learn, collaborate, and bring ideas to life through design and code.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-16 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }} />

        {/* Personal Info */}
        <div className="opacity-0 animate-fade-in mb-20" style={{ animationDelay: "0.4s" }}>
          <p className="subtitle-text mb-8">Personal Info</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8">

            <div>
              <p className="text-muted-foreground/50 text-xs tracking-[0.2em] uppercase mb-2">Full Name</p>
              <p className="text-foreground text-sm">John Alwin Ruaya Nocillado</p>
            </div>

            <div>
              <p className="text-muted-foreground/50 text-xs tracking-[0.2em] uppercase mb-2">Birthday</p>
              <p className="text-foreground text-sm">January 30, 2004</p>
            </div>

            <div>
              <p className="text-muted-foreground/50 text-xs tracking-[0.2em] uppercase mb-2">Age</p>
              <p className="text-foreground text-sm">{age} years old</p>
            </div>

            <div>
              <p className="text-muted-foreground/50 text-xs tracking-[0.2em] uppercase mb-2">Nationality</p>
              <p className="text-foreground text-sm">Filipino</p>
            </div>

            <div>
              <p className="text-muted-foreground/50 text-xs tracking-[0.2em] uppercase mb-2">Based In</p>
              <p className="text-foreground text-sm">Philippines</p>
            </div>

            <div>
              <p className="text-muted-foreground/50 text-xs tracking-[0.2em] uppercase mb-2">Role</p>
              <p className="text-foreground text-sm">Junior Web Designer</p>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-16 opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }} />

        {/* Education */}
        <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <p className="subtitle-text mb-8">Education</p>

          <div className="space-y-8">
            {/* College */}
            <div className="group flex gap-8 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded border border-border flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div className="flex-1 border-b border-border pb-8">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-foreground text-sm font-medium tracking-wide mb-1">
                      Bachelor of Science in Information Technology
                    </h3>
                    {/* Replace with your actual college name */}
                    <p className="text-muted-foreground text-xs tracking-[0.15em] uppercase">
                       University of Caloocan City
                    </p>
                  </div>
                  <span className="text-muted-foreground/40 text-xs whitespace-nowrap">
                    2022 — Present
                  </span>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed mt-3 max-w-lg">
                  Currently pursuing a degree focused on software development,
                  web technologies, and information systems. Gaining hands-on
                  experience in both frontend and backend development.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-16 opacity-0 animate-fade-in" style={{ animationDelay: "0.7s" }} />

        {/* Experience */}
        <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <p className="subtitle-text mb-8">Experience</p>

          <div className="space-y-8">
            <div className="group flex gap-8 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded border border-border flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  <line x1="12" y1="12" x2="12" y2="16" />
                  <line x1="10" y1="14" x2="14" y2="14" />
                </svg>
              </div>
              <div className="flex-1 border-b border-border pb-8">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-foreground text-sm font-medium tracking-wide mb-1">
                      Intern — Biometrics &amp; Records Processing
                    </h3>
                    <p className="text-muted-foreground text-xs tracking-[0.15em] uppercase">
                      National Bureau of Investigation (NBI) Satellite · Valenzuela City Town Center
                    </p>
                  </div>
                  <span className="text-muted-foreground/40 text-xs whitespace-nowrap">
                    Apr 2026 — Jul 2026
                  </span>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed mt-3 max-w-lg">
                  Completed a 400-hour internship operating the NBI's internal system to capture
                  applicant biometrics — including all ten fingerprints, facial photographs, and
                  digital signatures — and submitting records for name-clearance verification.
                  Also handled the encoding of First-Time Job Seeker applicants into Excel for
                  documentation and reporting purposes.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;