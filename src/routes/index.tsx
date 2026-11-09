import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Linkedin, Menu, X } from "lucide-react";

import corporateGala from "@/assets/corporate-gala.jpg";
import gardenWedding from "@/assets/garden-wedding.jpg";
import socialDinner from "@/assets/social-dinner.jpg";
import logo from "@/assets/wedding-event-planner-logo.png.asset.json";
import { Button } from "@/components/ui/button";

const linkedInUrl = "https://www.linkedin.com/company/wedding-event-planner";
const officialWebsiteUrl = "http://www.theweddingeventplanner.com";

const occasions = [
  {
    id: "weddings",
    number: "01",
    title: "Wedding planning",
    description:
      "Thoughtful ideas, useful planning tips, and inspiration for celebrations that feel like you.",
    image: gardenWedding,
    alt: "An elegant garden wedding reception beneath a softly lit pavilion",
  },
  {
    id: "corporate",
    number: "02",
    title: "Corporate events",
    description:
      "Creative direction and resources to bring people together with purpose and polish.",
    image: corporateGala,
    alt: "A contemporary city gala set with candlelit tables and floral arrangements",
  },
  {
    id: "social",
    number: "03",
    title: "Social gatherings",
    description:
      "Inspiration for the meaningful moments, from a first toast to a full room of friends.",
    image: socialDinner,
    alt: "A bright conservatory dinner table styled with flowers and candlelight",
  },
];

const rotatingOccasions = ["weddings", "corporate events", "social gatherings"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wedding & Event Planner | Ideas for Every Occasion" },
      {
        name: "description",
        content:
          "Creative ideas, inspiration, and planning tips for weddings, corporate events, and social gatherings — from Wedding & Event Planner.",
      },
      { property: "og:title", content: "Wedding & Event Planner | Ideas for Every Occasion" },
      {
        property: "og:description",
        content:
          "A thoughtful guide to weddings, corporate events, social gatherings, and marketing for wedding professionals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [occasionIndex, setOccasionIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");

    if (reducedMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setOccasionIndex((current) => (current + 1) % rotatingOccasions.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <div className="site-header-inner page-width">
          <a className="brand-home" href="#home" aria-label="Wedding & Event Planner home">
            <img className="brand-logo" src={logo.url} alt="Wedding & Event Planner" />
          </a>

          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
            <a href="#services" onClick={closeMenu}>What we cover</a>
            <a href="#about" onClick={closeMenu}>Our approach</a>
            <a href="#professionals" onClick={closeMenu}>For professionals</a>
            <a className="nav-social" href={linkedInUrl} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight aria-hidden="true" />
            </a>
          </nav>

          <Button
            className="mobile-menu-button"
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </header>

      <section className="hero-section page-width" id="home">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span /> Ideas for occasions worth remembering</p>
          <h1>
            Make room
            <br />
            for <span className="script-word">wonder.</span>
          </h1>
          <p className="hero-intro">
            A thoughtful guide to planning <span className="occasion-ticker" key={rotatingOccasions[occasionIndex]}>{rotatingOccasions[occasionIndex]}</span>—with
            ideas, inspiration, and practical tips for every detail in between.
          </p>
          <div className="hero-actions">
          <Button asChild className="action-button">
            <a href="#services">Explore the guide <ArrowDown aria-hidden="true" /></a>
          </Button>
            <a className="quiet-link" href={linkedInUrl} target="_blank" rel="noreferrer">
              Meet us on LinkedIn <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <div className="hero-proof" aria-label="Company details">
            <div><strong>12K</strong><span>followers</span></div>
            <span className="proof-rule" />
            <div><strong>2016</strong><span>founded</span></div>
            <span className="proof-rule" />
            <div><strong>3</strong><span>event worlds</span></div>
          </div>
        </div>

        <div className="hero-visual">
          <img
            className="hero-image"
            src={gardenWedding}
            alt="A candlelit garden wedding reception beneath a bright glass pavilion"
            width={1600}
            height={1104}
            fetchPriority="high"
          />
          <div className="hero-image-caption">
            <span className="caption-dot" />
            <span>For the moments that bring us together</span>
          </div>
          <div className="hero-image-index">W&amp;E <span>·</span> 01</div>
        </div>
      </section>

      <section className="services-section section-space" id="services">
        <div className="page-width">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">A guide for every gathering</p>
              <h2>Many occasions.<br /><span>One thoughtful plan.</span></h2>
            </div>
            <p className="section-intro">
              From the first idea to the final detail, find a little more clarity—and a lot more inspiration.
            </p>
          </div>

          <div className="occasion-grid">
            {occasions.map((occasion, index) => (
              <article className={`occasion-item reveal occasion-item-${index + 1}`} key={occasion.id}>
                <div className="occasion-image-link" aria-hidden="true">
                  <img src={occasion.image} alt={occasion.alt} width={1408} height={1008} loading="lazy" />
                </div>
                <div className="occasion-meta"><span>{occasion.number}</span><span>Planning inspiration</span></div>
                <h3>{occasion.title}</h3>
                <p>{occasion.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section section-space" id="about">
        <div className="about-inner page-width">
          <div className="about-aside reveal">
            <p className="eyebrow">A little more about us</p>
            <div className="about-monogram" aria-hidden="true">W<span>&amp;</span>E</div>
            <p className="about-aside-note">A planning guide for people who love bringing people together.</p>
          </div>
          <div className="about-copy reveal">
            <h2>Good plans make<br />space for <span>good moments.</span></h2>
            <p>
              Wedding &amp; Event Planner is an independent guide to weddings, corporate events, and social occasions. We share creative ideas, inspirational resources, and useful tips to help you shape a celebration with care.
            </p>
            <p>
              Built on a background in sales, marketing, and advertising, our perspective also extends to the wedding professionals who make each occasion possible.
            </p>
            <a className="quiet-link about-link" href={officialWebsiteUrl} target="_blank" rel="noreferrer">
              Visit the company website <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <div className="about-photo reveal">
            <img src={socialDinner} alt="A warmly styled dinner table in a sunlit conservatory" width={1408} height={1008} loading="lazy" />
            <span>Considered details, meaningful moments.</span>
          </div>
        </div>
      </section>

      <section className="professionals-section section-space" id="professionals">
        <div className="professionals-inner page-width reveal">
          <div className="professional-index">02 <span>/</span> 02</div>
          <div className="professional-copy">
            <p className="eyebrow">For wedding professionals</p>
            <h2>Make your good work<br />more <span>visible.</span></h2>
            <p>
              Branding, marketing, and advertising insight for wedding professionals with an entrepreneurial spirit—and the ideas to match.
            </p>
            <Button asChild className="action-button">
              <a href={linkedInUrl} target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight aria-hidden="true" /></a>
            </Button>
          </div>
          <div className="professional-art" aria-hidden="true">
            <img src={corporateGala} alt="" width={1408} height={1008} loading="lazy" />
            <span className="professional-stamp">Ideas<br />into impact</span>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main page-width">
          <div className="footer-brand-block">
            <img src={logo.url} alt="Wedding & Event Planner" width={200} height={200} loading="lazy" />
            <p>Ideas for occasions worth remembering.</p>
          </div>
          <div className="footer-links">
            <a href="#services">Weddings, corporate &amp; social</a>
            <a href={officialWebsiteUrl} target="_blank" rel="noreferrer">Company website <ArrowUpRight aria-hidden="true" /></a>
            <a href={linkedInUrl} target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /> Follow along on LinkedIn</a>
          </div>
        </div>
        <div className="footer-bottom page-width">
          <span>Wedding &amp; Event Planner</span>
          <span>Events Services <i /> Est. 2016</span>
        </div>
      </footer>
    </main>
  );
}
