import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock3,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Star,
  X,
} from 'lucide-react'
import { offers, services } from './data/siteData'

const phoneDisplay = '(785) 842-3200'
const phoneHref = 'tel:+17858423200'


function SpadeLogo() {
  return (
    <svg
      className="spade-logo"
      viewBox="0 0 100 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Spade */}
      <path
        className="spade-shape"
        d="
          M50 6
          C42 18 32 29 22 40
          C10 53 5 65 8 78
          C11 91 22 99 34 99
          C41 99 47 95 50 88
          C50 99 47 108 41 116
          H59
          C53 108 50 99 50 88
          C53 95 59 99 66 99
          C78 99 89 91 92 78
          C95 65 90 53 78 40
          C68 29 58 18 50 6
          Z"
      />

      {/* ACE text */}
      <text
        className="spade-text"
        x="50"
        y="67"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        ACE
      </text>
    </svg>
  )
}

function SectionHeading({ eyebrow, title, copy, align = 'left' }) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'section-heading center' : 'section-heading'}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function Header({ onQuote }) {
  const [open, setOpen] = useState(false)

  const closeAndScroll = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>Locally owned & operated since 2007</span>
          <a href={phoneHref}><Phone size={15} /> {phoneDisplay}</a>
        </div>
      </div>

      <div className="container nav-wrap">
        <button className="brand" onClick={() => closeAndScroll('home')} aria-label="Ace Cleaning home">
          <span className="brand-mark">
            <SpadeLogo />
          </span>
          <span className="brand-copy">
            <strong>Cleaning</strong>
            <small>Lawrence, Kansas</small>
          </span>
        </button>

        <nav className="desktop-nav" aria-label="Main navigation">
          <button onClick={() => closeAndScroll('services')}>Services</button>
          <button onClick={() => closeAndScroll('pricing')}>Pricing</button>
          <button onClick={() => closeAndScroll('about')}>About</button>
          <button onClick={() => closeAndScroll('reviews')}>Reviews</button>
          <button className="nav-cta" onClick={onQuote}>Request Service</button>
        </nav>

        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="mobile-nav">
          {['services', 'pricing', 'about', 'reviews'].map((id) => (
            <button key={id} onClick={() => closeAndScroll(id)}>
              {id[0].toUpperCase() + id.slice(1)}
            </button>
          ))}
          <button className="nav-cta" onClick={() => { setOpen(false); onQuote() }}>
            Request Service
          </button>
        </div>
      )}
    </header>
  )
}

function Hero({ onQuote }) {
  return (
    <main id="home">
      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="hero-kicker"><BadgeCheck size={18} /> Lawrence's local cleaning professionals</span>
            <h1>Professional cleaning.<br /><em>Done right.</em></h1>
            <p>
              Carpet, air duct, tile, upholstery and restoration services from a Lawrence company you can trust.
            </p>
            <div className="hero-actions">
              <button className="button primary" onClick={onQuote}>Request a Quote <ArrowRight size={18} /></button>
              <a className="button secondary" href={phoneHref}><Phone size={18} /> {phoneDisplay}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          <div><Clock3 /><span><strong>Since 2007</strong><small>Locally established</small></span></div>
          <div><Building2 /><span><strong>Home + Business</strong><small>Residential & commercial</small></span></div>
          <div><ShieldCheck /><span><strong>Professional Care</strong><small>Equipment & experience</small></span></div>
          <div><MapPin /><span><strong>Northeast Kansas</strong><small>Lawrence & surrounding areas</small></span></div>
        </div>
      </section>
    </main>
  )
}

function Services({ onQuote }) {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeading
          eyebrow="WHAT WE DO"
          title="One trusted team. More ways to care for your space."
          copy="From everyday carpet cleaning to specialty services, Ace helps homeowners and businesses take care of the surfaces and systems they rely on."
        />
        <div className="service-grid">
          {services.map(({ title, description, icon: Icon }) => (
            <article className="service-card" key={title}>
              <div className="icon-box"><Icon size={26} /></div>
              <h3>{title}</h3>
              <p>{description}</p>
              <button onClick={onQuote}>Request Service <ArrowRight size={16} /></button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function About({ onQuote }) {
  return (
    <section className="section muted" id="about">
      <div className="container split-section">
        <div className="photo-panel about-photo">
          <div className="photo-badge">
            <strong>19+</strong>
            <span>Years serving the Lawrence area</span>
          </div>
        </div>
        <div className="about-copy">
          <SectionHeading
            eyebrow="LOCAL. EXPERIENCED. STRAIGHTFORWARD."
            title="The kind of company you can feel good about inviting into your home."
            copy="Ace Cleaning has served Lawrence and surrounding Northeast Kansas communities since 2007. The goal is simple: provide dependable cleaning services, communicate clearly and leave customers glad they called."
          />
          <div className="check-list">
            <span><CheckCircle2 /> Locally owned and operated</span>
            <span><CheckCircle2 /> Residential and commercial service</span>
            <span><CheckCircle2 /> Multiple specialty cleaning services</span>
            <span><CheckCircle2 /> Clear, accessible pricing information</span>
          </div>
          <button className="text-link" onClick={onQuote}>Talk with our team <ArrowRight size={17} /></button>
        </div>
      </div>
    </section>
  )
}

function Difference() {
  return (
    <section className="section difference-section">
      <div className="container">
        <SectionHeading
          eyebrow="SEE THE DIFFERENCE"
          title="Results are easier to trust when you can see them."
          copy="Replace these sample images with real Ace job photography. Before-and-after work is one of the strongest selling tools for a cleaning company."
          align="center"
        />
        <div className="before-after-grid">
          <div className="result-card carpet-result"><span>BEFORE</span></div>
          <div className="result-card clean-result"><span>AFTER</span></div>
        </div>
        <p className="image-note">Demo photography placeholders — swap these for real Ace Cleaning project photos.</p>
      </div>
    </section>
  )
}

function Pricing({ onQuote }) {
  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        <SectionHeading
          eyebrow="CURRENT OFFERS"
          title="Simple offers without the wall of fine print."
          copy="Keep the headline pricing easy to scan, then link customers to a full pricing page for qualifying details and restrictions."
          align="center"
        />
        <div className="offer-grid">
          {offers.map((offer, index) => (
            <article className={index === 0 ? 'offer-card featured' : 'offer-card'} key={offer.title}>
              <span className="offer-eyebrow">{offer.eyebrow}</span>
              <h3>{offer.title}</h3>
              <strong className="offer-price">{offer.price}</strong>
              <p>{offer.detail}</p>
              <button onClick={onQuote}>Request service <ArrowRight size={17} /></button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const [reviewData, setReviewData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadReviews() {
      try {
        const response = await fetch('/api/google-reviews', {
          signal: controller.signal,
          cache: 'no-store',
        })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Unable to load reviews.')
        }

        setReviewData(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    loadReviews()
    return () => controller.abort()
  }, [])

  const reviews = reviewData?.reviews || []

  return (
    <section className="section" id="reviews">
      <div className="container">
        <SectionHeading
          eyebrow="GOOGLE REVIEWS"
          title="See what local customers are saying."
          copy="Real public Google reviews, loaded directly from Google Places when this page opens."
          align="center"
        />

        {reviewData && (
          <div className="review-summary">
            <div className="review-score">
              <strong>{reviewData.rating?.toFixed?.(1) || reviewData.rating || '—'}</strong>
              <div>
                <div className="stars" aria-label={`${reviewData.rating || 0} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} size={18} fill={n <= Math.round(reviewData.rating || 0) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <span>{reviewData.userRatingCount?.toLocaleString?.() || reviewData.userRatingCount || 0} Google reviews</span>
              </div>
            </div>
            {reviewData.googleMapsUri && (
              <a className="google-review-link" href={reviewData.googleMapsUri} target="_blank" rel="noreferrer">
                View all on Google Maps <ArrowRight size={16} />
              </a>
            )}
          </div>
        )}

        {loading && <div className="review-status">Loading Google reviews…</div>}

        {!loading && error && (
          <div className="review-status">
            <strong>Google reviews are temporarily unavailable.</strong>
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && reviews.length === 0 && (
          <div className="review-status">No Google review text is currently available to display.</div>
        )}

        {reviews.length > 0 && (
          <>
            <div className="review-grid">
              {reviews.slice(0, 3).map((review) => (
                <article className="review-card google-review-card" key={review.id}>
                  <div className="review-author">
                    {review.author.photoUri ? (
                      <img src={review.author.photoUri} alt="" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="review-avatar-fallback" aria-hidden="true">
                        {review.author.displayName?.slice(0, 1)?.toUpperCase() || 'G'}
                      </span>
                    )}
                    <div>
                      {review.author.uri ? (
                        <a href={review.author.uri} target="_blank" rel="noreferrer">{review.author.displayName}</a>
                      ) : (
                        <strong>{review.author.displayName}</strong>
                      )}
                      <span>{review.relativePublishTimeDescription}</span>
                    </div>
                  </div>

                  <div className="stars" aria-label={`${review.rating || 0} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} size={17} fill={n <= Math.round(review.rating || 0) ? 'currentColor' : 'none'} />
                    ))}
                  </div>

                  {review.text && <p>“{review.text}”</p>}

                  {review.googleMapsUri && (
                    <a className="review-source" href={review.googleMapsUri} target="_blank" rel="noreferrer">
                      View review on Google Maps <ArrowRight size={14} />
                    </a>
                  )}
                </article>
              ))}
            </div>

            <div className="google-attribution">
              <div>
                <span>Google Maps</span>
                {(reviewData.attributions || []).map((item) => (
                  item.providerUri ? (
                    <a key={`${item.provider}-${item.providerUri}`} href={item.providerUri} target="_blank" rel="noreferrer">
                      {item.provider}
                    </a>
                  ) : item.provider ? <span key={item.provider}>{item.provider}</span> : null
                ))}
              </div>
              <small>{reviewData.orderingNotice}</small>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function ServiceArea() {
  return (
    <section className="service-area">
      <div className="container service-area-inner">
        <div>
          <span className="eyebrow light">SERVICE AREA</span>
          <h2>Proudly serving Lawrence and Northeast Kansas.</h2>
          <p>Lawrence · Baldwin City · De Soto · Eudora · Linwood · McLouth · Oskaloosa · Ottawa · Tonganoxie and surrounding areas.</p>
        </div>
        <MapPin size={78} strokeWidth={1.2} />
      </div>
    </section>
  )
}

function Footer({ onQuote }) {
  return (
    <footer className="footer">
      <div className="container footer-cta">
        <div>
          <span className="eyebrow light">READY WHEN YOU ARE</span>
          <h2>Tell us what needs cleaning.</h2>
          <p>Get in touch and we'll help point you toward the right service.</p>
        </div>
        <div className="footer-actions">
          <button className="button white" onClick={onQuote}>Request Service</button>
          <a href={phoneHref}>{phoneDisplay}</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <div className="brand footer-brand">
          <span className="brand-mark">
            <SpadeLogo />

          </span>
          <span className="brand-copy"><strong>Cleaning</strong><small>Lawrence, Kansas</small></span>
        </div>
        <p>© {new Date().getFullYear()} Ace Cleaning. All rights reserved.</p>
      </div>
    </footer>
  )
}

function QuoteModal({ open, onClose }) {
  const initialForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    locations: [],
    services: [],
    message: '',
  }

  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState('')
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  const toggleChoice = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: current[field].includes(value)
        ? current[field].filter((item) => item !== value)
        : [...current[field], value],
    }))

    setFormError('')
  }

  const submit = (e) => {
    e.preventDefault()

    if (form.locations.length === 0 || form.services.length === 0) {
      setFormError(
        'Please select at least one location type and one service.'
      )
      return
    }

    // We'll replace this later with the actual email/API submission.
    console.log('Service request:', form)

    setSubmitted(true)
  }

  const closeModal = () => {
    setSubmitted(false)
    setFormError('')
    setForm(initialForm)
    onClose()
  }

  return (
    <div className="modal-backdrop" onMouseDown={closeModal}>
      <div
        className="modal contact-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={closeModal}
          aria-label="Close form"
        >
          <X />
        </button>

        {!submitted ? (
          <>
            <span className="eyebrow">CONTACT US</span>

            <h2>How can Ace help?</h2>

            <p className="modal-intro">
              Send the details below and the team can follow up about your
              cleaning project.
            </p>

            <form onSubmit={submit}>

              <div className="form-row two-column">
                <label>
                  <span className="label-text">
                    First Name <span className="required-mark">*</span>
                  </span>

                  <input
                    required
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        firstName: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  <span className="label-text">
                    Last Name <span className="required-mark">*</span>
                  </span>


                  <input
                    required
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        lastName: e.target.value,
                      })
                    }
                  />
                </label>

              </div>

              <div className="form-row two-column">
                <label>
                  <span className="label-text">

                    Email <span className="required-mark">*</span>
                  </span>

                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  <span className="label-text">

                    Phone Number <span className="required-mark">*</span>
                  </span>
                  <input
                    required
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value,
                      })
                    }
                  />
                </label>
              </div>

              <div className="form-row two-column">

                <fieldset className="form-fieldset choice-group">
                  <legend>
                    Services <span className="required-mark">*</span>
                  </legend>

                  {[
                    'Air Duct Cleaning',
                    'Carpet Cleaning',
                    'Restoration',
                    'Other',
                  ].map((service) => (
                    <label className="check-option" key={service}>
                      <input
                        type="checkbox"
                        checked={form.services.includes(service)}
                        onChange={() => toggleChoice('services', service)}
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </fieldset>

                <fieldset className="form-fieldset choice-group">
                  <legend>
                    Location <span className="required-mark">*</span>
                  </legend>

                  <label className="check-option">
                    <input
                      type="checkbox"
                      checked={form.locations.includes('Residential')}
                      onChange={() =>
                        toggleChoice('locations', 'Residential')
                      }
                    />
                    <span>Residential</span>
                  </label>

                  <label className="check-option">
                    <input
                      type="checkbox"
                      checked={form.locations.includes('Commercial')}
                      onChange={() =>
                        toggleChoice('locations', 'Commercial')
                      }
                    />
                    <span>Commercial</span>
                  </label>
                </fieldset>

              </div>

              <label>
                Comment or Message

                <textarea
                  rows="5"
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                />
              </label>

              {formError && (
                <p className="form-error" role="alert">
                  {formError}
                </p>
              )}

              <button
                className="button primary full"
                type="submit"
              >
                Submit
                <ArrowRight size={18} />
              </button>

              <small className="form-note">
                Demo form: connect this submit handler to your production
                email/API endpoint.
              </small>
            </form>
          </>
        ) : (
          <div className="success-state">
            <CheckCircle2 size={54} />

            <h2>Request received.</h2>

            <p>
              The interface is working. For production, we'll connect this
              to your email/API endpoint so the Ace team actually receives
              submissions.
            </p>

            <button
              className="button primary"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div >
  )
}

function Review({ onQuote }) {
  const [expanded, setExpanded] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const previewConfig = {
    prospect: "ACE Steam Clean",
    source: "ace",
    offerEndsAt: "2026-09-04T23:59:59-06:00",
  };

  const calculateTimeLeft = () => {
    const offerEndsAt = new Date(previewConfig.offerEndsAt);
    const difference = offerEndsAt.getTime() - Date.now();

    if (difference <= 0) {
      return {
        expired: true,
        days: 0,
        hours: 0,
        minutes: 0,
      };
    }

    return {
      expired: false,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleInterest = async () => {
    try {
      setSubmitting(true);

      const response = await fetch(
        "blueprintwebstudio.com/api/demo-interest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            prospect: previewConfig.prospect,
            source: previewConfig.source,
            action: "Partner Program Interest",
            page: window.location.href,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to submit interest");
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong. Please contact Blueprint WebStudio directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <aside
      className={`concept-review-badge ${
        expanded ? "is-expanded" : "is-collapsed"
      }`}
      aria-label="Private client preview"
    >
      <button
        className="concept-review-toggle"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
      >
        <span>Concept Review · Not For Official Use</span>

        <span className="concept-review-chevron">
          {expanded ? "−" : "+"}
        </span>
      </button>

      {expanded && (
        <div className="concept-review-content">
          <div className="concept-review-private">
            Private Client Preview
          </div>

          {!timeLeft.expired ? (
            <>
              <div className="concept-review-program">
                Partner Program - Discount Eligibility
              </div>

              <div className="concept-review-reserved">
                Reserved for
              </div>

              <div className="concept-review-time">
                <span>
                  <strong>{timeLeft.days}</strong> Days
                </span>

                <span className="concept-review-dot">·</span>

                <span>
                  <strong>{timeLeft.hours}</strong> Hours
                </span>

                <span className="concept-review-dot">·</span>

                <span>
                  <strong>{timeLeft.minutes}</strong> Minutes
                </span>
              </div>

              {!submitted ? (
                <button
                  className="concept-review-accept"
                  onClick={handleInterest}
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "I'm Interested"}
                </button>
              ) : (
                <div className="concept-review-success">
                  Thank you — Blueprint WebStudio has been notified.
                </div>
              )}
            </>
          ) : (
            <div className="concept-review-expired">
              Partner Program offer expired
            </div>
          )}

          <div className="concept-review-contact">
            <a href="tel:+17205156647">
              Call
            </a>

            <span>·</span>

            <a href="mailto:hello@blueprintwebstudio.com">
              Email
            </a>

            <span>·</span>

            <a
              href="https://blueprintwebstudio.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          </div>
        </div>
      )}

      <div className="concept-review-credit">
        <span
          className="concept-review-logo"
          aria-hidden="true"
        />
        <span>© Blueprint WebStudio</span>
      </div>
    </aside>
  );
}

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  return (
    <>
      <Header onQuote={() => setQuoteOpen(true)} />
      <Hero onQuote={() => setQuoteOpen(true)} />
      <Services onQuote={() => setQuoteOpen(true)} />
      <About onQuote={() => setQuoteOpen(true)} />
      <Difference />
      <Pricing onQuote={() => setQuoteOpen(true)} />
      <Reviews />
      <ServiceArea />
      <Footer onQuote={() => setQuoteOpen(true)} />
      <Review onQuote={() => setQuoteOpen(true)} />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  )
}
