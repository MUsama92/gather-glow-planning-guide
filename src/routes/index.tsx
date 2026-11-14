import { useEffect, useState, type MouseEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";

import corporateGala from "@/assets/corporate-gala.jpg";
import gardenWedding from "@/assets/garden-wedding.jpg";
import socialDinner from "@/assets/social-dinner.jpg";
import logo from "@/assets/wedding-event-planner-logo.png";
import { Button } from "@/components/ui/button";

const linkedInUrl = "https://www.linkedin.com/company/wedding-event-planner";

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

const planningSteps = [
  {
    number: "01",
    title: "Decide what matters",
    description:
      "Start with the reason for gathering and how you want people to feel. Let that intention guide the choices that follow.",
  },
  {
    number: "02",
    title: "Set the foundations",
    description:
      "Shape a guest list, working budget, date, and venue around your priorities. Make the big decisions before the small details.",
  },
  {
    number: "03",
    title: "Plan the flow",
    description:
      "Map the experience from arrival to farewell. Give key moments room to breathe, and make sure the practical transitions work too.",
  },
  {
    number: "04",
    title: "Bring it all together",
    description:
      "Confirm the details with everyone involved, share a clear schedule, and plan for accessibility, dietary needs, and a change of plans.",
  },
];

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
    const scrollToHash = () => {
      const { hash, pathname, search } = window.location;
      if (!hash) return;

      const target = document.getElementById(hash.slice(1));
      if (!target) return;

      window.history.replaceState(window.history.state, "", `${pathname}${search}`);
      window.setTimeout(() => {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }, 50);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    window.addEventListener("load", scrollToHash);
    window.addEventListener("pageshow", scrollToHash);
    return () => {
      window.removeEventListener("hashchange", scrollToHash);
      window.removeEventListener("load", scrollToHash);
      window.removeEventListener("pageshow", scrollToHash);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setOccasionIndex((current) => (current + 1) % rotatingOccasions.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const handleSectionLinkClick = (event: MouseEvent<HTMLElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const clickedElement = event.target;
    if (!(clickedElement instanceof Element)) return;

    const link = clickedElement.closest("a");
    if (!link || link.target === "_blank") return;

    const url = new URL(link.href);
    if (
      url.origin !== window.location.origin ||
      url.pathname !== window.location.pathname ||
      !url.hash
    ) {
      return;
    }

    const target = document.getElementById(url.hash.slice(1));
    if (!target) return;

    event.preventDefault();
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
    window.setTimeout(() => {
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }, 50);
  };

  return (
    <main onClick={handleSectionLinkClick}>
      <header className="site-header">
        <div className="site-header-inner page-width">
          <a className="brand-home" href="#home" aria-label="Wedding & Event Planner home">
            <img className="brand-logo" src={logo} alt="Wedding & Event Planner" />
          </a>

          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
            <a href="#services" onClick={closeMenu}>Occasions</a>
            <a href="#planning" onClick={closeMenu}>Planning guide</a>
            <a href="#about" onClick={closeMenu}>Our approach</a>
            <a href="#professionals" onClick={closeMenu}>For professionals</a>
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
        <div className="hero-copy reveal">
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
          </div>
          <div className="hero-proof" aria-label="Company details">
            <div><strong>12K</strong><span>followers</span></div>
            <span className="proof-rule" />
            <div><strong>2016</strong><span>founded</span></div>
            <span className="proof-rule" />
            <div><strong>3</strong><span>event worlds</span></div>
          </div>
        </div>

        <div className="hero-visual reveal">
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

      <section className="planning-section section-space" id="planning">
        <div className="page-width">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">A thoughtful planning guide</p>
              <h2>Start with the feeling.<br /><span>Then shape the details.</span></h2>
            </div>
            <p className="section-intro">
              Every gathering is different. Use these four steps as a flexible starting point, from the first idea to the final farewell.
            </p>
          </div>

          <div className="planning-layout">
            <ol className="planning-steps">
              {planningSteps.map((step, index) => (
                <li className={`planning-step reveal planning-step-${index + 1}`} key={step.number}>
                  <span className="planning-step-number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <aside className="planning-note reveal">
              <p className="eyebrow">Keep in view</p>
              <h3>A gathering is more than a date.</h3>
              <p>
                The best plans make people feel considered. Keep these details close as your ideas take shape.
              </p>
              <ul>
                <li><strong>People:</strong> who is coming, and what will help them feel welcome?</li>
                <li><strong>Place:</strong> does the setting work for the gathering and its guests?</li>
                <li><strong>Pace:</strong> is there a comfortable rhythm between planned moments?</li>
                <li><strong>Plan B:</strong> what will you do if timing or weather changes?</li>
              </ul>
            </aside>
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
              <a href={linkedInUrl} target="_blank" rel="noreferrer">Connect with our community <ArrowUpRight aria-hidden="true" /></a>
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
            <img src={logo} alt="Wedding & Event Planner" width={200} height={200} loading="lazy" />
            <p>Ideas for occasions worth remembering.</p>
          </div>
          <div className="footer-links">
            <a href="#services">Explore occasions</a>
            <a href="#planning">Planning guide</a>
            <a href="#about">Our approach</a>
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
