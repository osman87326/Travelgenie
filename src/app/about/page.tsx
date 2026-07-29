import React from 'react';
import { Shield, Sparkles, Heart, Compass, Cpu, Code, Database, Eye } from 'lucide-react';

const AboutPage: React.FC = () => {
  const team = [
    {
      name: "Marcus Vance",
      role: "Lead Architect / AI Lead",
      bio: "Former systems researcher specializing in generative model constraints and stateful routing.",
      image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus"
    },
    {
      name: "Sophia Chen",
      role: "UX/UI Designer",
      bio: "Passionate about creating premium, accessible, and responsive user experiences.",
      image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sophia"
    },
    {
      name: "Liam O'Connor",
      role: "Core Developer",
      bio: "Full-stack engineer focusing on lightweight state sync and local storage databases.",
      image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam"
    }
  ];

  const techStack = [
    { name: "React.js", desc: "Modular component hierarchies", icon: <Cpu className="w-5 h-5 text-teal-400" /> },
    { name: "TypeScript", desc: "Type-safe interfaces", icon: <Code className="w-5 h-5 text-indigo-400" /> },
    { name: "Tailwind CSS", desc: "Glassmorphism layouts", icon: <Eye className="w-5 h-5 text-emerald-400" /> },
    { name: "Gemini Pro", desc: "Context-aware processing", icon: <Sparkles className="w-5 h-5 text-purple-400" /> },
    { name: "Recharts", desc: "Real-time cost visualization", icon: <Cpu className="w-5 h-5 text-rose-400" /> },
    { name: "LocalStorage", desc: "Persistent offline schemas", icon: <Database className="w-5 h-5 text-amber-400" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Header & Story */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          About <span className="bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">TravelGenie AI</span>
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          We believe travel planning should be inspiring, not exhausting. TravelGenie AI was built to solve the hassle of manually building daily schedules by integrating intelligent, reasoning AI agents.
        </p>
      </section>

      {/* Core Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20 text-teal-400">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Smart Navigation</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            AI recommendations custom-tailored to your exact constraints, ensuring a perfect balance of downtime and activities.
          </p>
        </div>

        <div className="glass-card p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Budget Transparency</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Dynamic cost summation and allocation graphs. You always know exactly where your travel budget is going.
          </p>
        </div>

        <div className="glass-card p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Plan Evolution</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Seamless editing history that preserves every iteration of your trip, letting you compare versions with visual highlights.
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">Our Technology Stack</h2>
          <p className="text-slate-400 text-sm">Building on modern, robust web standards.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {techStack.map((tech, idx) => (
            <div key={idx} className="glass-card p-5 text-center flex flex-col items-center justify-center space-y-2.5">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                {tech.icon}
              </div>
              <div>
                <h4 className="font-bold text-white text-xs">{tech.name}</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">Meet the Team</h2>
          <p className="text-slate-400 text-sm">The minds engineering intelligent travel.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="glass-card p-6 flex flex-col items-center text-center space-y-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full bg-slate-800 border border-slate-700 object-cover shadow-inner"
              />
              <div className="space-y-1">
                <h4 className="font-bold text-white text-base">{member.name}</h4>
                <p className="text-xs text-teal-400 font-semibold uppercase tracking-wider">{member.role}</p>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AboutPage;