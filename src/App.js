import React, { useState } from 'react';
import { Shield, Code2, Server, Mail } from 'lucide-react';

const CodeRainBackground = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const codeChars = '01</>[](){}';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(0);

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = codeChars[Math.floor(Math.random() * codeChars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
        drops[i]+= 0.5;
      }
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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.3
      }}
    />
  );
};


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#0d1117', color: '#ffffff', fontFamily: 'monospace' }}>
      <style>{`
      html, body {
    background-color: #0d1117 !important;
    color: #ffffff !important;
      }

  * {
    transition: all 0.5s ease;
  }
  
  body {
    background: #0d1117;
    color: #e6edf3;
  }
  
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 255, 65, 0.2);
  }
  
  a:hover {
    transform: translateX(4px);
  }
  
  section {
    animation: fadeIn 0.6s ease-in;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 255, 65, 0.15);
  }
`}</style>
      
      <CodeRainBackground />
      {/* NAVBAR */}
      <nav style={{
        position: 'fixed',
  top: 0,
  width: '100%',
  height: '60px',
  backgroundColor: '#0d1117',
  borderBottom: '2px solid #22c55e',
  zIndex: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '15px',
  paddingRight: '10px',
  boxSizing: 'border-box'
      }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff', marginRight: '20px' }}>
          &lt; MD_ALIF_JASIM /&gt;
        </div>
        <div style={{ 
  display: 'flex', 
  gap: '8px', 
  fontSize: '12px',
  flexWrap: 'wrap',
  overflow: 'hidden'
}}>
  {['home', 'projects', 'skills', 'certifications', 'contact'].map(item => (
    <button
      key={item}
      onClick={() => scrollToSection(item)}
      style={{
        background: 'none',
        border: 'none',
        color: activeSection === item ? '#ffffff' : '#ffffff',
        cursor: 'pointer',
        fontSize: '11px',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        whiteSpace: 'nowrap'
      }}
    >
      [{item}]
    </button>
  ))}
</div>
      </nav>

      {/* HERO */}
      <section id="home" style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '75px',
        backgroundColor: '#0d1117'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Shield size={80} style={{ color: '#ffffff', marginBottom: '30px' }} />
          <h1 style={{ fontSize: '60px', color: '#ffffff', margin: '0 0 10px 0', fontWeight: '900' }}>
            CYBER SECURITY
          </h1>
          <h2 style={{ fontSize: '40px', color: '#ffffff', margin: '0 0 40px 0' }}>
            &lt;SPECIALIST /&gt;
          </h2>
          <p style={{ fontSize: '16px', color: '#ffffff', marginBottom: '20px' }}>
            Full-Stack Security Practitioner | B.S. Computer Science
          </p>
          <p style={{ fontSize: '14px', color: '#ffffff', marginBottom: '40px' }}>
            Network Intrusion Detection | Python Automation | Federal Security Pipeline
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button
              onClick={() => scrollToSection('projects')}
              style={{
                padding: '12px 30px',
                backgroundColor: '#ffffff',
                color: '#000',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              &gt; VIEW PROJECTS
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              style={{
                padding: '12px 30px',
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '2px solid #22c55e',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              &gt; CONNECT
            </button>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{
        width: '100%',
        minHeight: '100vh',
        padding: '80px 40px',
        backgroundColor: '#161b22',
        borderTop: '2px solid #22c55e',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '15px', paddingRight: '15px', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '28px', color: '#ffffff', textAlign: 'center', marginBottom: '60px' }}>
            &gt; ACTIVE_PROJECTS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { 
                id: 1,
                name: 'PI_ADHAN_AUTOMATION', 
                desc: 'Advanced prayer scheduler with Python, Aladhan API, systemd, Bluetooth automation on Raspberry Pi Zero 2W'
              },
              { 
                id: 2,
                name: 'SURICATA_7.0_NIDS', 
                desc: 'Enterprise-grade Network Intrusion Detection System on Raspberry Pi 5 with real-time threat analytics'
              },
              { 
                id: 3,
                name: 'TRIP_PLANNER', 
                desc: 'Full-stack web app with Google Maps API, Firebase Firestore, deployed on Vercel'
              },
            ].map(project => (
              <div 
                key={project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  border: '2px solid',
                  borderColor: hoveredProject === project.id ? '#4ade80' : '#ffffff',
                  padding: '30px',
                  borderRadius: '6px',
                  backgroundColor: hoveredProject === project.id ? 'rgba(74, 222, 128, 0.15)' : 'rgba(34, 197, 94, 0.05)',
                  transform: hoveredProject === project.id ? 'translateY(-5px)' : 'translateY(0)',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
              >
                <Code2 size={32} style={{ color: '#4ade80', marginBottom: '15px' }} />
                <h3 style={{ color: '#ffffff', marginTop: 0, marginBottom: '10px' }}>{project.name}</h3>
                <p style={{ color: '#ffffff', fontSize: '14px', lineHeight: '1.6' }}>{project.desc}</p>
                <a href="https://github.com/Md-Alif-Jasim/pi-adhan-clock" style={{ color: '#4ade80', textDecoration: 'none', fontSize: '12px', marginTop: '15px', display: 'inline-block' }}>
                  → GitHub
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{
        width: '100%',
        minHeight: '100vh',
        padding: '80px 40px',
        backgroundColor: '#0d1117',
        borderTop: '2px solid #22c55e',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '15px', paddingRight: '15px', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '28px', color: '#ffffff', textAlign: 'center', marginBottom: '60px' }}>
            &gt; TECHNICAL_STACK
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            {[
              { 
                id: 1,
                title: 'SECURITY_OPS', 
                skills: ['Suricata NIDS', 'DHS/FPS Compliance', 'Threat Analysis', 'Network Security'],
                icon: Shield
              },
              { 
                id: 2,
                title: 'DEVELOPMENT', 
                skills: ['Python', 'JavaScript/React', 'Firebase', 'REST APIs'],
                icon: Code2
              },
              { 
                id: 3,
                title: 'INFRASTRUCTURE', 
                skills: ['Raspberry Pi (Zero 2W, Pi 5)', 'Linux/Ubuntu', 'systemd', 'Network Switching'],
                icon: Server
              },
            ].map(category => {
              const Icon = category.icon;
              return (
                <div 
                  key={category.id}
                  onMouseEnter={() => setHoveredSkill(category.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    border: '2px solid',
                    borderColor: hoveredSkill === category.id ? '#4ade80' : '#ffffff',
                    padding: '30px',
                    borderRadius: '6px',
                    backgroundColor: hoveredSkill === category.id ? 'rgba(74, 222, 128, 0.15)' : 'rgba(34, 197, 94, 0.05)',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                >
                  <Icon size={32} style={{ color: '#4ade80', marginBottom: '15px' }} />
                  <h3 style={{ color: '#ffffff', marginTop: 0, marginBottom: '20px' }}>{category.title}</h3>
                  <ul style={{ color: '#ffffff', listStyle: 'none', padding: 0 }}>
                    {category.skills.map(skill => (
                      <li key={skill} style={{ marginBottom: '12px', fontSize: '14px' }}>
                        &gt; {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* CERTIFICATIONS */}
      <section id="certifications" style={{
        width: '100%',
        minHeight: '100vh',
        padding: '80px 40px',
        backgroundColor: 'rgba(22, 27, 34, 0.8)',
        borderTop: '2px solid #22c55e',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', color: '#ffffff', textAlign: 'center', marginBottom: '60px' }}>
            &gt; CERTIFICATIONS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            {[
              
              { name: 'CompTIA Security+', status: 'IN_PROGRESS', color: '#4ade80' },
              { name: 'Google Cybersecurity Certificate', status: 'COMPLETED_2026', color: '#22a7c5' },
              { name: 'FPS/DHS Clearance', status: 'ACTIVE_TRACK', color: '#fbbf24' }
            ].map((cert, idx) => (
              <div key={idx} style={{
                border: '2px solid ' + cert.color,
                padding: '20px',
                borderRadius: '6px',
                backgroundColor: 'rgba(34, 197, 94, 0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ color: cert.color, margin: 0, fontSize: '18px' }}>{cert.name}</h3>
                <span style={{ backgroundColor: cert.color + '20', color: cert.color, padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                  {cert.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{
        width: '100%',
        minHeight: '100vh',
        padding: '80px 40px',
        backgroundColor: '#161b22',
        borderTop: '2px solid #22c55e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '28px', color: '#ffffff', marginBottom: '20px' }}>
            &gt; CONNECT WITH ME
          </h2>
          <p style={{ color: '#ffffff', marginBottom: '40px', fontSize: '16px' }}>
            Open to cybersecurity opportunities, federal employment, and innovative projects
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            <a href="https://github.com/Md-Alif-Jasim" style={{
              padding: '12px 30px',
              backgroundColor: '#374151',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Code2 size={18} /> GITHUB
            </a>
            <a href="mailto:mdalifjasim@gmail.com" style={{
              padding: '12px 30px',
              backgroundColor: '#374151',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Mail size={18} /> EMAIL
            </a>
            <a href="https://www.linkedin.com/in/md-jasim-471521238/" style={{
  padding: '12px 30px',
  backgroundColor: '#374151',
  color: '#ffffff',
  textDecoration: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
}}>
  <Code2 size={18} /> LINKEDIN
            </a>
          </div>
          </div>
        </section>

          </div>
  );
}