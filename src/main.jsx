import React, { useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.css';

gsap.registerPlugin(ScrollTrigger);
function App() {
  const root = useRef(null);
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-reveal', { y: 65, opacity: 0, duration: 1.15, stagger: .13, ease: 'power3.out' });
      gsap.utils.toArray('[data-reveal]').forEach(el => gsap.from(el, { y: 40, opacity: 0, duration: .9, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
      gsap.to('.glow', { x: 45, y: 35, duration: 9, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    }, root);
    return () => mm.revert();
  }, []);
  async function submit(event) {
    event.preventDefault();
    if (['localhost', '127.0.0.1'].includes(location.hostname)) {
      setStatus('This preview does not send enquiries. The form will be available on the Netlify website.');
      return;
    }
    setSending(true); setStatus('');
    try {
      const data = new FormData(event.currentTarget);
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data).toString() });
      if (!response.ok) throw new Error('Request failed');
      setStatus('Thank you. Your enquiry has been sent. Your place is not confirmed until the organisers contact you.');
      event.target.reset();
    } catch { setStatus('Your enquiry could not be sent. Please try again shortly.'); }
    finally { setSending(false); }
  }
  return <div ref={root}>
    <header className="nav"><a className="wordmark" href="#" aria-label="The Foundry home">the found<span>ry</span></a><nav aria-label="Main navigation"><a href="#about">The idea</a><a href="#gathering">The gathering</a></nav><a href="#join" className="nav-cta">Be in the room </a></header>
    <main>
      <section className="hero" aria-labelledby="hero-title"><div className="glow"/><div className="hero-top hero-reveal"><span className="eyebrow">A room for what comes next</span><span className="edition">ACCRA, GHANA &nbsp; / &nbsp; VOL. 001</span></div><h1 className="hero-reveal" id="hero-title">Where<br/>builders <em>meet.</em></h1><div className="hero-bottom hero-reveal"><p>Big ideas need good company.<br/>Find your people. Build what’s next.</p><a className="button cream" href="#join">Join the first gathering </a></div><div className="event-strip hero-reveal"><span>21 NOVEMBER 2026</span><span>02:30 PM · ACCRA</span><span>VIDA E CAFFE, EAST LEGON</span></div></section>
      <section id="about" className="about section"><div className="section-label" data-reveal><span>01 / THE IDEA</span><span>A little less alone.</span></div><div className="about-grid"><h2 data-reveal>No founder<br/>should build<br/><span>alone.</span></h2><div className="about-copy" data-reveal><p className="lead">The funding questions. The first hire. The doubt. Every builder knows the feeling.</p><p>The Foundry puts founders, builders, innovators and leaders in one room to share real lessons and find the partners and investors who turn ideas into companies.</p><p>Honest stories. Useful introductions. A clear next step. A network in Ghana and beyond that opens doors for each other.</p><a className="text-link" href="#gathering">It starts with a gathering </a></div></div><div className="values" data-reveal>{[['01','Openness','The real struggles. And the wins.'],['02','Connection','One introduction can change everything.'],['03','Action','Leave with a next step.']].map(([n,t,d])=><div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>
      <section id="gathering" className="gathering section"><div className="section-label" data-reveal><span>02 / THE FIRST GATHERING</span><span>Good company. Real conversations.</span></div><div className="gathering-grid"><div data-reveal><h2>Your next<br/>chapter starts<br/><em>in this room.</em></h2><p>For founders, aspiring founders, investors,<br className="desktop"/> mentors and the people making things happen.</p></div><article className="ticket" data-reveal aria-label="First gathering details"><div className="ticket-top"><span>THE FOUNDRY</span><span>ADMIT ONE</span></div><div className="ticket-main"><span className="eyebrow">THE FIRST GATHERING</span><h3>Meet. Share.<br/>Build.</h3><dl><div><dt>WHEN</dt><dd>Saturday, 21 Nov 2026<br/>2:30 PM · Accra time</dd></div><div><dt>WHERE</dt><dd>Vida e Caffe<br/>East Legon, Accra</dd></div></dl></div><div className="ticket-bottom"><span>GH₵300<small>per person</small></span><a href="#join" aria-label="Enquire about a ticket">Get in the room </a></div></article></div></section>
      <section id="join" className="join section"><div className="section-label" data-reveal><span>03 / BE IN THE ROOM</span><span>Start with hello.</span></div><div className="join-grid"><div data-reveal><h2>Bring your idea.<br/><span>Find your people.</span></h2><p>Interested in the first gathering?<br/>Leave your details for a ticket enquiry.</p><p className="fine">GH₵300 per person. This is an enquiry, not a confirmed booking. No payment is collected here.</p></div><form name="ticket-enquiry" method="POST" data-netlify="true" netlify-honeypot="website" onSubmit={submit} data-reveal><input type="hidden" name="form-name" value="ticket-enquiry"/><p hidden><label>Leave this empty<input name="website" tabIndex="-1" autoComplete="off"/></label></p><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" placeholder="First and last name" required maxLength="120"/><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength="254"/><label htmlFor="role">What brings you here?</label><select id="role" name="role" defaultValue="" required><option value="" disabled>Select your role</option><option>Founder</option><option>Aspiring founder</option><option>Investor</option><option>Mentor</option><option>Builder / operator</option><option>Something else</option></select><button className="button navy" disabled={sending}>{sending ? 'Sending…' : 'Enquire about a ticket'}</button><p role="status" className="form-status">{status}</p><p className="fine">Your details are used to respond to your gathering enquiry.</p></form></div></section>
    </main><footer><a className="wordmark" href="#">the found<span>ry</span></a><p>Where builders meet.</p><a href="#">Back to top</a><span>© {new Date().getFullYear()} The Foundry</span></footer>
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
