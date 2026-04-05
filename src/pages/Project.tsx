import { useParams, useNavigate } from "react-router-dom";

const projects = [
  {
    id: 1,
    slug: "shobe-printing",
    title: "SHOBE PRINTING SERVICES",
    subtitle: "Resource Tracking for",
    name: "Shobe Printing",
    tagline: "Inventory Control & Resource Tracking System",
    description:
      "A web-based inventory management system developed for Shobe Printing Services to automate consumable tracking, material usage logging, and stock-level monitoring — replacing manual paper-based processes.",
    fullDescription:
      "Developed for Shobe Printing Services, a large-format tarpaulin printing and graphic design business in Quezon City, this Resource Tracking and Inventory Control System replaces the company's manual, paper-based inventory processes. The system automates real-time stock monitoring, material consumption logging, and report generation. Key features include low-stock alerts, a searchable transaction history, role-based access control for admins and production staff, and automated reports covering inventory summaries, consumption trends, and material-to-output analysis. Built with React, Node.js, and Supabase, the system was developed using the Rapid Application Development (RAD) model with Agile integration.",
    role: "Project Manager & Backend Developer",
    year: "2025",
    tools: ["React", "Node.js", "Supabase", "Figma"],
    images: {
      hero: "/images/shobe-hero.png",       // main preview image (top)
      gallery: [
        "/images/shobe-1.png",              // bottom-left image
        "/images/shobe-2.png",              // bottom-right image
      ],
    },
  },
  {
    id: 2,
    slug: "evvos",
    title: "EVVOS",
    subtitle: "Introducing",
    name: "EVVOS",
    tagline: "Enforcer Voice-Activated Video Observation System",
    description:
      "A voice-activated body-worn camera system for traffic enforcers — enabling hands-free recording, automatic speech-to-text transcription, secure cloud evidence storage, and emergency backup alerts.",
    fullDescription:
      "EVVOS (Enforcer Voice-Activated Video Observation System) is a prototype wearable body-cam solution designed for traffic enforcers in the field. Built around a Raspberry Pi Zero 2W paired with a ReSpeaker 2-Microphone HAT and the Pico wake-word engine, the device allows officers to start, stop, and mark recordings entirely hands-free using voice commands. Enforcer narrations are automatically transcribed via the Groq Whisper API and linked to their corresponding video clips for fast review. Emergency backup alerts are broadcast to all connected officers in under five seconds, while a React/Vite web admin portal and a React Native/Expo mobile app provide full incident management and responder coordination. Supabase powers the cloud backend with a 13-table PostgreSQL database, JWT two-factor authentication, and secure object storage. The system was evaluated by traffic enforcers from three stations in Caloocan City and received a grand mean of 4.50 (Excellent) across functionality, reliability, efficiency, maintainability, and security.",
    role: "Software Engineer & Quality Assurance",
    year: "2026",
    tools: ["Raspberry Pi", "Python", "React Native", "Expo", "React", "Supabase", "Groq Whisper"],
    images: {
      hero: "/images/evvos-hero.png",       // main preview image (top)
      gallery: [
        "/images/evvos-1.png",              // bottom-left image
        "/images/evvos-2.png",              // bottom-right image
      ],
    },
  },
  {
    id: 3,
    slug: "coming-soon",
    title: "COMING SOON",
    subtitle: "Next project",
    name: "Coming Soon",
    tagline: "Something new is on the way",
    description:
      "This project is currently in progress. Check back soon for updates.",
    fullDescription:
      "This project is currently in progress. Details will be updated once the project is complete. Stay tuned for more.",
    role: "TBD",
    year: "TBD",
    tools: [],
    images: {
      hero: "",                             // main preview image (top)
      gallery: [
        "",                                 // bottom-left image
        "",                                 // bottom-right image
      ],
    },
  },
];

const Project = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  if (!project) {
    return (
      <div className="min-h-screen bg-card flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-display text-4xl mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-card">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6">
        <button
          onClick={() => navigate("/")}
          className="flex flex-col leading-none hover:opacity-70 transition-opacity"
        >
          <span className="text-foreground text-lg font-bold tracking-widest">
            JO
          </span>
          <span className="text-foreground text-lg font-bold tracking-widest">
            HN
          </span>
        </button>

        <button
          onClick={() => navigate("/#projects")}
          className="nav-link flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </button>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <p className="subtitle-text mb-4">{project.subtitle}</p>
          <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl mb-8">
            {project.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {project.tagline}
          </p>
        </div>
      </section>

      {/* Project Hero Image */}
      <section className="px-8 md:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          {project.images.hero ? (
            <img
              src={project.images.hero}
              alt={`${project.title} preview`}
              className="w-full aspect-video object-cover rounded-lg"
            />
          ) : (
            <div className="w-full aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">Project Preview</span>
            </div>
          )}
        </div>
      </section>

      {/* Project Details */}
      <section className="px-8 md:px-16 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left Column - Info */}
            <div className="space-y-8">
              <div>
                <p className="subtitle-text mb-2">Role</p>
                <p className="text-foreground">{project.role}</p>
              </div>
              <div>
                <p className="subtitle-text mb-2">Year</p>
                <p className="text-foreground">{project.year}</p>
              </div>
              <div>
                <p className="subtitle-text mb-2">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-foreground text-sm bg-secondary px-3 py-1 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="md:col-span-2">
              <p className="subtitle-text mb-4">About the Project</p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {project.fullDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery Images */}
      <section className="px-8 md:px-16 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {project.images.gallery[0] ? (
              <img
                src={project.images.gallery[0]}
                alt={`${project.title} screenshot 1`}
                className="w-full aspect-video object-cover rounded-lg"
              />
            ) : (
              <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Image 1</span>
              </div>
            )}
            {project.images.gallery[1] ? (
              <img
                src={project.images.gallery[1]}
                alt={`${project.title} screenshot 2`}
                className="w-full aspect-video object-cover rounded-lg"
              />
            ) : (
              <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Image 2</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Navigation */}
      <section className="px-8 md:px-16 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 items-center border-t border-border pt-12">
            {/* Previous Project */}
            <button
              onClick={() => navigate(`/project/${prevProject.slug}`)}
              className="group flex items-center gap-4 hover:opacity-70 transition-opacity justify-self-start"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground group-hover:text-foreground transition-colors"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <div className="text-left hidden sm:block">
                <p className="subtitle-text mb-1">Previous</p>
                <p className="text-foreground font-semibold">{prevProject.title}</p>
              </div>
            </button>

            {/* Back to Projects */}
            <button
              onClick={() => navigate("/#projects")}
              className="border border-border px-6 py-3 text-xs tracking-[0.25em] uppercase text-foreground hover:bg-secondary transition-colors duration-300 justify-self-center"
            >
              All Projects
            </button>

            {/* Next Project */}
            <button
              onClick={() => navigate(`/project/${nextProject.slug}`)}
              className="group flex items-center gap-4 hover:opacity-70 transition-opacity justify-self-end"
            >
              <div className="text-right hidden sm:block">
                <p className="subtitle-text mb-1">Next</p>
                <p className="text-foreground font-semibold">{nextProject.title}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground group-hover:text-foreground transition-colors"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Project;