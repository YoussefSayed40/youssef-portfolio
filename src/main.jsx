import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight, Github, Linkedin, Mail, Download, Database,
  BarChart3, BrainCircuit, FileSpreadsheet, Code2, Menu, X,
  Star, GitFork, ExternalLink, LoaderCircle, Sparkles
} from "lucide-react";
import "./styles.css";

const GITHUB_USER = "YoussefSayed40";
const LINKEDIN_URL = "https://www.linkedin.com/in/youssef-sayed-saad-84ab72306/";
const CV_URL = "#contact";

const skills = [
  { icon: Code2, title: "Python", text: "Data analysis, automation & ML workflows" },
  { icon: BarChart3, title: "Data Analysis", text: "Pandas, NumPy & data visualization" },
  { icon: Database, title: "SQL", text: "Querying, joins, aggregation & analysis" },
  { icon: FileSpreadsheet, title: "Excel", text: "Data preparation, formulas & analysis" },
  { icon: BarChart3, title: "Power BI", text: "Dashboards, reports & business insights" },
  { icon: BrainCircuit, title: "Data Science", text: "Statistics, machine learning & modeling" }
];

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&direction=desc&per_page=100`)
      .then(async (res) => {
        if (!res.ok) throw new Error("GitHub API request failed");
        return res.json();
      })
      .then((data) => setRepos(data))
      .catch(() => setError("Could not load GitHub projects right now. Open the GitHub profile to see all repositories."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <header className="nav">
        <a className="brand" href="#home">YS<span>.</span></a>
        <nav>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-actions">
          <a className="icon-link" href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer"><Github size={19}/></a>
          <a className="icon-link" href={LINKEDIN_URL} target="_blank" rel="noreferrer"><Linkedin size={19}/></a>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-copy">
            <div className="eyebrow"><span className="dot"></span> DATA ANALYTICS • DATA SCIENCE</div>
            <h1>Turning data into<br/><em>clear decisions.</em></h1>
            <p className="hero-text">
              I'm Youssef Sayed, a Data Analyst & Data Science enthusiast focused on
              transforming raw data into useful insights, visualizations and intelligent solutions.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#projects">Explore my work <ArrowUpRight size={18}/></a>
              <a className="btn secondary" href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn <Linkedin size={17}/></a>
            </div>
            <div className="mini-stats">
              <div><strong>{repos.length || "—"}</strong><span>GitHub repos</span></div>
              <div><strong>Python</strong><span>Core language</span></div>
              <div><strong>Data</strong><span>Career focus</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="grid-bg"></div>
            <div className="orb orb-one"></div>
            <div className="orb orb-two"></div>
            <div className="data-card card-a"><span>DATA</span><b>→ INSIGHT</b></div>
            <div className="data-card card-b"><span>PYTHON</span><b>01</b></div>
            <div className="data-card card-c"><span>ANALYTICS</span><b>+</b></div>
            <div className="center-mark"><BarChart3 size={44}/></div>
          </div>
        </section>

        <section id="about" className="section about">
          <div className="section-label">01 / ABOUT</div>
          <div className="two-col">
            <h2>Curious about data.<br/><span>Serious about results.</span></h2>
            <div>
              <p>
                 I'm Youssef Sayed, a Data Analyst and Data Science enthusiast with a
                growing focus on Machine Learning. I work with Python, SQL, Excel,
                 Power BI, and data analysis tools to clean, analyze, and visualize data.
              </p>
              <p>
                   I'm also developing my Machine Learning skills by building models,
    exploring datasets, and turning data into practical, intelligent
    solutions. I'm continuously improving through hands-on projects and
    real-world application
                
              </p>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-label">02 / SKILLS</div>
          <div className="section-heading">
            <h2>Tools I use to <span>work with data.</span></h2>
          </div>
          <div className="skills-grid">
            {skills.map(({icon: Icon, title, text}) => (
              <article className="skill-card" key={title}>
                <div className="skill-icon"><Icon size={21}/></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section projects">
          <div className="section-label">03 / PROJECTS</div>
          <div className="section-heading project-heading">
            <div>
              <h2>Everything I build, <span>in one place.</span></h2>
              <p>Automatically pulled from <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">@{GITHUB_USER}</a>.</p>
            </div>
            <a className="text-link" href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">View GitHub <ArrowUpRight size={17}/></a>
          </div>

          {loading && <div className="status"><LoaderCircle className="spin" size={20}/> Loading repositories...</div>}
          {error && <div className="status error">{error}</div>}
          {!loading && !error && repos.length === 0 && <div className="empty">No public repositories yet. Your future projects will appear here automatically.</div>}

          <div className="projects-grid">
            {repos.map(repo => (
              <article className="project-card" key={repo.id}>
                <div className="project-top">
                  <span className="repo-type">REPOSITORY</span>
                  <a href={repo.html_url} target="_blank" rel="noreferrer" aria-label={`Open ${repo.name}`}><ExternalLink size={18}/></a>
                </div>
                <h3>{repo.name}</h3>
                <p>{repo.description || "A project by Youssef Sayed. Open the repository to explore the code and documentation."}</p>
                <div className="repo-meta">
                  <span>{repo.language || "Code"}</span>
                  <span><Star size={14}/> {repo.stargazers_count}</span>
                  <span><GitFork size={14}/> {repo.forks_count}</span>
                </div>
                <a className="repo-button" href={repo.html_url} target="_blank" rel="noreferrer">View repository <ArrowUpRight size={16}/></a>
              </article>
            ))}
          </div>
        </section>

        <section className="section principles">
          <div className="principle-box">
            <Sparkles size={22}/>
            <div>
              <span>PORTFOLIO PRINCIPLE</span>
              <h3>Build it once. Let GitHub keep it fresh.</h3>
              <p>No project cards to maintain manually. Public repositories are the source of truth.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="section-label">04 / CONTACT</div>
          <h2>Let’s turn data into<br/><span>something useful.</span></h2>
          <div className="contact-links">
            <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer"><Github/> GitHub <ArrowUpRight/></a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer"><Linkedin/> LinkedIn <ArrowUpRight/></a>
            <a href="mailto:your-email@example.com"><Mail/> Email <ArrowUpRight/></a>
          </div>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} Youssef Sayed</span>
        <span>Data Analytics • Data Science</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);