import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Mail, ExternalLink, Code2, Shield, Zap, Lock, Server } from 'lucide-react';

// Code Rain Background Component
const CodeRainBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const codeChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン</>{}[]()&|^~!@#$%*+=?';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(0);

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;
      ctx.globalAlpha = 0.8;

      for (let i = 0; i < drops.length; i++) {
        const char = codeChars[Math.floor(Math.random() * codeChars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1, opacity: 0.15 }}
    />
  );
};

// Animated Grid Background
const AnimatedGridBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 255, 65, 0.05) 25%, rgba(0, 255, 65, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 65, 0.05) 75%, rgba(0, 255, 65, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 255, 65, 0.05) 25%, rgba(0, 255, 65, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 65, 0.05) 75%, rgba(0, 255, 65, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
          animation: 'scan 8s linear infinite',
        }}
      />
    </div>
  );
};

// Glowing Text Effect
const GlowingText = ({ children, className }) => {
  return (
    <span
      className={className}
      style={{
        textShadow: '0 0 10px rgba(0, 255, 65, 0.5), 0 0 20px rgba(0, 100, 255, 0.3)',
      }}
    >
      {children}
    </span>
  );
};

export default function TechPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 font-mono overflow-x-hidden relative">
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px rgba(0, 100, 255, 0.5); }
          50% { text-shadow: 0 0 20px #00ff41, 0 0 30px #00ff41, 0 0 40px rgba(0, 100, 255, 0.7); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(0, 255, 65, 0.3); }
          50% { border-color: rgba(0, 255, 65, 0.8); }
        }
        .glow-text { animation: glow 2s ease-in-out infinite; }
        .floating { animation: float 3s ease-in-out infinite; }
        .pulse-border { animation: pulse-border 2s ease-in-out infinite; }
        .tech-border {
          border: 2px solid;
          border-image: linear-gradient(45deg, #00ff41, #0099ff) 1;
          position: relative;
        }
        .neon-box {
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.3), inset 0 0 20px rgba(0, 255, 65, 0.1);
        }
      `}</style>

      <AnimatedGridBackground />
      <CodeRainBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur border-b-2 border-green-500/50 z-50 neon-box">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold glow-text">
              &lt; MD_ALIF_JASIM /&gt;
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              {['home', 'projects', 'skills', 'experience', 'contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all font-bold text-sm tracking-wider ${
                    activeSection === item
                      ? 'text-green-400 drop-shadow-lg'
                      : 'text-gray-300 hover:text-green-400'
                  }`}
                  style={{
                    textShadow: activeSection === item ? '0 0 10px rgba(0, 255, 65, 0.7)' : 'none',
                  }}
                >
                  [{item}]
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-green-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2 border-t border-green-500/30">
              {['home', 'projects', 'skills', 'experience', 'contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-2 px-4 hover:bg-green-500/10 rounded text-green-400 font-bold"
                >
                  [{item}]
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 relative">
        <div className="max-w-5xl mx-auto text-center z-10">
          {/* Animated Shield Icon */}
          <div className="mb-8 floating">
            <div className="inline-block p-4 bg-green-500/20 border-2 border-green-500/50 rounded-lg neon-box">
              <Shield className="text-green-400 drop-shadow-lg" size={60} style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 65, 0.8))' }} />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 glow-text tracking-tighter">
            CYBER SECURITY
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-green-400">
            &lt;SPECIALIST /&gt;
          </h2>

          {/* Subtitle */}
          <div className="mb-12 space-y-4">
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-bold tracking-wide">
              <GlowingText className="text-green-400">&gt; FULL-STACK SECURITY PRACTITIONER</GlowingText>
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Network Intrusion Detection | Python Automation | Federal Security Frameworks | IoT Security
            </p>
            <p className="text-sm text-green-500 font-mono">
              [B.S. Computer Science] • [ISC2 CC Candidate] • [FPS/DHS Active Pipeline] • [Armed Security Professional]
            </p>
          </div>

          {/* Tech Status Indicators */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <div className="px-4 py-2 bg-green-500/10 border border-green-500/50 rounded font-mono text-sm text-green-400">
              <span className="animate-pulse">●</span> STATUS: ACTIVE
            </div>
            <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/50 rounded font-mono text-sm text-blue-400">
              <span className="animate-pulse">●</span> CLEARANCE: ELIGIBLE
            </div>
            <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/50 rounded font-mono text-sm text-purple-400">
              <span className="animate-pulse">●</span> AVAILABLE: NOW
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-6 justify-center flex-wrap">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-black font-bold rounded-lg hover:from-green-400 hover:to-green-500 transition transform hover:scale-105 neon-box"
              style={{ textShadow: '0 0 5px rgba(0, 255, 65, 0.5)' }}
            >
              &gt; VIEW PROJECTS
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-green-500 text-green-400 font-bold rounded-lg hover:bg-green-500/10 transition neon-box"
            >
              &gt; CONNECT
            </button>
          </div>
        </div>

        {/* Scanning Line */}
        <div
          className="absolute bottom-20 w-96 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent blur-lg opacity-50"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 px-4 relative">
        <div className="max-w-6xl mx-auto z-10">
          <h2 className="text-5xl font-black mb-4 text-center glow-text tracking-tight">&gt; ACTIVE_PROJECTS</h2>
          <p className="text-center text-gray-400 mb-16">[Security Operations & Development Initiatives]</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pi Adhan Clock */}
            <div className="group relative bg-slate-900/80 border-2 border-green-500/30 rounded-lg p-8 hover:border-green-500/80 transition neon-box">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition"></div>
              <div className="flex items-start justify-between mb-4 relative z-10">
                <h3 className="text-2xl font-bold text-green-400">PI_ADHAN_AUTOMATION</h3>
                <Code2 className="text-green-500 drop-shadow-lg" size={32} />
              </div>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                Advanced prayer scheduler leveraging Python | Aladhan API | systemd services | Bluetooth audio automation on Raspberry Pi Zero 2 W
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Python', 'RPi Zero 2W', 'systemd', 'API', 'Automation'].map(tag => (
                  <span key={tag} className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded border border-green-500/50 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="https://github.com/Md-Alif-Jasim/pi-adhan-clock"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition font-bold"
              >
                &gt; GITHUB_REPO <ExternalLink size={16} />
              </a>
            </div>

            {/* Suricata NIDS */}
            <div className="group relative bg-slate-900/80 border-2 border-red-500/30 rounded-lg p-8 hover:border-red-500/80 transition neon-box">
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition"></div>
              <div className="flex items-start justify-between mb-4 relative z-10">
                <h3 className="text-2xl font-bold text-red-400">SURICATA_7.0_NIDS</h3>
                <Lock className="text-red-500 drop-shadow-lg" size={32} />
              </div>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                Enterprise-grade Network Intrusion Detection System deployed on Raspberry Pi 5 with Netgear GS308E managed switching and real-time threat analytics
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Suricata 7.0', 'RPi 5', 'IDS/IPS', 'Network Security', 'Threat Detection'].map(tag => (
                  <span key={tag} className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded border border-red-500/50 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-400 font-mono">
                → Netgear GS308E Smart Switch | Real-time threat monitoring
              </p>
            </div>

            {/* Trip Planner */}
            <div className="group relative bg-slate-900/80 border-2 border-blue-500/30 rounded-lg p-8 hover:border-blue-500/80 transition neon-box">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition"></div>
              <div className="flex items-start justify-between mb-4 relative z-10">
                <h3 className="text-2xl font-bold text-blue-400">TRIP_PLANNER</h3>
                <Zap className="text-blue-500 drop-shadow-lg" size={32} />
              </div>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                Full-stack web application with Google Maps API integration and Firebase Firestore cloud persistence. Deployed on Vercel with real-time data synchronization
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['React', 'Google Maps', 'Firebase', 'Vercel', 'Web App'].map(tag => (
                  <span key={tag} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded border border-blue-500/50 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="https://github.com/Md-Alif-Jasim/Trip-Planner"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition font-bold"
              >
                &gt; GITHUB_REPO <ExternalLink size={16} />
              </a>
            </div>

            {/* Weight Tracker */}
            <div className="group relative bg-slate-900/80 border-2 border-purple-500/30 rounded-lg p-8 hover:border-purple-500/80 transition neon-box">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition"></div>
              <div className="flex items-start justify-between mb-4 relative z-10">
                <h3 className="text-2xl font-bold text-purple-400">WEIGHT_TRACKER</h3>
                <Server className="text-purple-500 drop-shadow-lg" size={32} />
              </div>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                Health-tech application with Firebase authentication and Firestore backend. Progressive web app with real-time synchronization across devices
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Firebase Auth', 'Firestore', 'React', 'Health Tech', 'PWA'].map(tag => (
                  <span key={tag} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/50 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="https://weight-tracker-be276.web.app"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition font-bold"
              >
                &gt; LIVE_DEMO <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-20 px-4 relative">
        <div className="max-w-6xl mx-auto z-10">
          <h2 className="text-5xl font-black mb-4 text-center glow-text tracking-tight">&gt; TECHNICAL_STACK</h2>
          <p className="text-center text-gray-400 mb-16">[Core Competencies & Expertise Areas]</p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Security */}
            <div className="bg-slate-900/80 border-2 border-red-500/50 rounded-lg p-8 neon-box relative group">
              <div className="absolute inset-0 bg-red-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition"></div>
              <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-3 relative z-10">
                <Shield size={32} className="drop-shadow-lg" />
                SECURITY_OPS
              </h3>
              <ul className="space-y-3 relative z-10">
                {['Network Intrusion Detection (Suricata)', 'NIDS/IDS Architecture', 'DHS/FPS Compliance', 'Threat Analysis & Triage', 'Network Security Design', 'Incident Response'].map(
                  skill => (
                    <li key={skill} className="flex items-center gap-3 text-gray-300 font-mono text-sm">
                      <span className="text-red-400">&gt;</span>
                      {skill}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Development */}
            <div className="bg-slate-900/80 border-2 border-blue-500/50 rounded-lg p-8 neon-box relative group">
              <div className="absolute inset-0 bg-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition"></div>
              <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-3 relative z-10">
                <Code2 size={32} className="drop-shadow-lg" />
                DEVELOPMENT
              </h3>
              <ul className="space-y-3 relative z-10">
                {['Python', 'JavaScript / React', 'Firebase / Firestore', 'REST APIs', 'Web Development', 'Git / GitHub'].map(skill => (
                  <li key={skill} className="flex items-center gap-3 text-gray-300 font-mono text-sm">
                    <span className="text-blue-400">&gt;</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Infrastructure */}
            <div className="bg-slate-900/80 border-2 border-green-500/50 rounded-lg p-8 neon-box relative group">
              <div className="absolute inset-0 bg-green-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition"></div>
              <h3 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-3 relative z-10">
                <Server size={32} className="drop-shadow-lg" />
                INFRASTRUCTURE
              </h3>
              <ul className="space-y-3 relative z-10">
                {['Raspberry Pi (Zero 2W, Pi 5)', 'Linux / Ubuntu', 'Network Switching', 'systemd Services', 'Home Lab Design', 'API Integration'].map(skill => (
                  <li key={skill} className="flex items-center gap-3 text-gray-300 font-mono text-sm">
                    <span className="text-green-400">&gt;</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="experience" className="min-h-screen py-20 px-4 relative">
        <div className="max-w-4xl mx-auto z-10">
          <h2 className="text-5xl font-black mb-4 text-center glow-text tracking-tight">&gt; CREDENTIALS</h2>
          <p className="text-center text-gray-400 mb-16">[Certifications | Education | Federal Pipeline]</p>

          <div className="space-y-6">
            {/* ISC2 CC */}
            <div className="border-l-4 border-cyan-500 bg-slate-900/80 pl-8 py-6 px-6 rounded-r-lg neon-box">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-bold text-cyan-400 font-mono">&gt; ISC2_CC</h3>
                <span className="text-xs bg-cyan-500/30 text-cyan-300 px-3 py-1 rounded border border-cyan-500/50 font-mono">
                  IN_PROGRESS
                </span>
              </div>
              <p className="text-gray-300 font-mono text-sm mb-2">International Information System Security Certification</p>
              <p className="text-gray-400">Comprehensive domain coverage: Security governance | Asset security | Security architecture | Security operations</p>
            </div>

            {/* Security+ */}
            <div className="border-l-4 border-blue-500 bg-slate-900/80 pl-8 py-6 px-6 rounded-r-lg neon-box">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-bold text-blue-400 font-mono">&gt; SECURITY_PLUS</h3>
                <span className="text-xs bg-blue-500/30 text-blue-300 px-3 py-1 rounded border border-blue-500/50 font-mono">
                  IN_PROGRESS
                </span>
              </div>
              <p className="text-gray-300 font-mono text-sm mb-2">CompTIA Advanced Security Certification</p>
              <p className="text-gray-400">Coverage: Threat management | Cryptography | Identity & access | Risk management</p>
            </div>

            {/* CS Degree */}
            <div className="border-l-4 border-green-500 bg-slate-900/80 pl-8 py-6 px-6 rounded-r-lg neon-box">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-bold text-green-400 font-mono">&gt; BS_COMPUTER_SCIENCE</h3>
                <span className="text-xs bg-green-500/30 text-green-300 px-3 py-1 rounded border border-green-500/50 font-mono">
                  COMPLETED_2026
                </span>
              </div>
              <p className="text-gray-300 font-mono text-sm mb-2">Lehman College, CUNY</p>
              <p className="text-gray-400">Full-time degree while maintaining professional security roles. Advanced coursework in networks, cryptography, systems</p>
            </div>

            {/* FPS Pipeline */}
            <div className="border-l-4 border-purple-500 bg-slate-900/80 pl-8 py-6 px-6 rounded-r-lg neon-box">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-bold text-purple-400 font-mono">&gt; FPS_FEDERAL_PIPELINE</h3>
                <span className="text-xs bg-purple-500/30 text-purple-300 px-3 py-1 rounded border border-purple-500/50 font-mono animate-pulse">
                  ACTIVE_TRACK
                </span>
              </div>
              <p className="text-gray-300 font-mono text-sm mb-2">DHS Federal Employment</p>
              <p className="text-gray-400">Completed: eApp | Suitability documentation | Fingerprinting | NDA (DHS Form 11000-6). Security clearance eligible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto z-10">
          <h2 className="text-5xl font-black mb-4 text-center glow-text tracking-tight">&gt; EXPERIENCE</h2>
          <p className="text-center text-gray-400 mb-16">[Professional Background & Current Roles]</p>

          <div className="space-y-6">
            {['Global Security Solutions (GSS)', 'C2 Company Brooklyn', 'NYPD Police Department', 'Syzygy Integration'].map((company, idx) => {
              const details = {
                0: { role: 'Site Manager / Armed Security Guard', location: 'Westchester County / NYC', status: 'Current' },
                1: { role: 'Shift Supervisor', location: 'Brooklyn, NY', status: 'Current' },
                2: { role: 'Police Officer', location: 'New York', status: 'Oct 2021 - Sep 2022' },
                3: { role: 'QA Engineer', location: 'Various', status: 'Oct 2022 - Jan 2024' },
              };
              const info = details[idx];

              return (
                <div
                  key={company}
                  className="bg-slate-900/80 border-2 border-green-500/30 rounded-lg p-8 hover:border-green-500/50 transition neon-box"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-green-400 font-mono">&gt; {info.role}</h3>
                      <p className="text-gray-300 font-mono text-sm">{company}</p>
                    </div>
                    <span className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded border border-green-500/50 font-mono">
                      {info.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">📍 {info.location}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 px-4 flex items-center relative">
        <div className="max-w-4xl mx-auto w-full z-10">
          <h2 className="text-5xl font-black mb-8 text-center glow-text tracking-tight">&gt; CONNECT</h2>
          <p className="text-center text-gray-400 mb-16 font-mono">
            [Open to cybersecurity opportunities, federal employment, and innovative projects]
          </p>

          <div className="bg-slate-900/80 border-2 border-green-500/50 rounded-lg p-12 text-center neon-box">
            <div className="flex justify-center gap-6 flex-wrap mb-12">
              {[
                { icon: Code2, label: 'GITHUB', href: 'https://github.com/Md-Alif-Jasim', color: 'text-green-400' },
                { icon: ExternalLink, label: 'LINKEDIN', href: 'https://linkedin.com', color: 'text-blue-400' },
                { icon: Mail, label: 'EMAIL', href: 'mailto:your.email@example.com', color: 'text-cyan-400' },
              ].map(({ icon: Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  className={`flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition border border-green-500/30 hover:border-green-500/70 ${color} font-bold`}
                  style={{ textShadow: '0 0 10px rgba(0, 255, 65, 0.3)' }}
                >
                  <Icon size={20} />
                  {label}
                </a>
              ))}
            </div>

            <div className="text-gray-400 space-y-3 font-mono text-sm">
              <p className="text-green-400 text-xl font-bold">→ YONKERS, NEW YORK</p>
              <p className="text-blue-400">🔒 SECURITY_CLEARANCE_ELIGIBLE</p>
              <p className="text-purple-400">⚡ ACTIVE_FPS_DHS_PIPELINE</p>
              <p className="pt-4 text-gray-500">LAST_UPDATED: JULY_2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t-2 border-green-500/50 py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 font-mono text-sm">
            &copy; 2026 MD_ALIF_JASIM | CYBERSECURITY_PROFESSIONAL | FEDERAL_SECURITY_SPECIALIST
          </p>
          <p className="text-green-500/50 font-mono text-xs mt-2 animate-pulse">
            [SYSTEM_ONLINE] ● [MONITORING_ACTIVE] ● [THREAT_LEVEL_ELEVATED]
          </p>
        </div>
      </footer>
    </div>
  );
}