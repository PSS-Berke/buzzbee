'use client';

import Image from 'next/image';
import './print.css';

export default function OneSheetPage() {
  return (
    <div className="os-screen-wrapper">
      {/* ── Screen-only toolbar ── */}
      <div className="os-toolbar">
        <div>
          <p className="text-white font-semibold text-sm">Robert Taglianetti — One-Sheet Preview</p>
          <p className="text-white/40 text-xs mt-0.5">
            Click &ldquo;Save as PDF&rdquo; &rarr; set paper to Letter, margins to None
          </p>
        </div>
        <button
          onClick={() => window.print()}
          style={{ backgroundColor: '#F3A51D' }}
          className="inline-flex items-center gap-2 text-white font-semibold px-5 py-2 rounded-full text-sm hover:opacity-90 transition-opacity cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Save as PDF
        </button>
      </div>

      {/* ── Document wrapper ── */}
      <div className="os-doc-wrap">
        <div className="one-sheet">

          {/* ══ 1. Top bar ══ */}
          <div
            className="flex items-center justify-between flex-shrink-0"
            style={{ backgroundColor: '#203552', padding: '10px 32px' }}
          >
            <Image
              src="/logo-busby-footer.svg"
              alt="Busby"
              width={88}
              height={28}
              className="brightness-0 invert"
              style={{ objectFit: 'contain' }}
            />
            <div className="flex items-center gap-2">
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#F3A51D', flexShrink: 0 }} />
              <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                Podcast Guest &nbsp;·&nbsp; Sleep Industry Expert
              </span>
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#F3A51D', flexShrink: 0 }} />
            </div>
          </div>

          {/* ══ 2. Hero band ══ */}
          <div
            className="flex flex-shrink-0"
            style={{ backgroundColor: '#203552', height: '272px' }}
          >
            {/* Photo */}
            <div style={{ width: '195px', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
              <img
                src="/images/team/tag city corner.jpg"
                alt="Robert Taglianetti"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                }}
              />
            </div>

            {/* Name + Bio */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px 32px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F3A51D', marginBottom: '6px' }}>
                Founder &amp; Operator
              </div>
              <h1 style={{ color: 'white', fontSize: '36px', fontFamily: 'var(--font-josefin), sans-serif', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.5px', margin: '0 0 4px' }}>
                Robert Taglianetti
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', letterSpacing: '0.06em', margin: '0 0 14px' }}>
                Sleep6 &amp; Busby &nbsp;·&nbsp; Chicago, IL
              </p>
              <div style={{ height: '2px', width: '36px', backgroundColor: '#F3A51D', marginBottom: '14px' }} />
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12.5px', lineHeight: 1.65, margin: '0 0 18px', maxWidth: '460px' }}>
                Over two and a half decades building mattress brands from the factory floor up.
                Robert founded Sleep6 and Busby — two Chicago-made brands built on honest materials,
                domestic manufacturing, and the belief that quality sleep should be accessible to everyone.
              </p>

              {/* Stat row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                {[
                  { value: '25+', label: 'Yrs in Industry' },
                  { value: '2', label: 'National Brands' },
                  { value: '100%', label: 'USA-Made' },
                  { value: 'Apt.', label: 'Retail Partner' },
                ].map((s, i) => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
                    {i > 0 && <div style={{ width: '1px', height: '28px', backgroundColor: 'rgba(255,255,255,0.15)', margin: '0 16px' }} />}
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#F3A51D', fontSize: '16px', fontWeight: 700, lineHeight: 1 }}>{s.value}</div>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', marginTop: '3px', whiteSpace: 'nowrap' }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ Gold stripe ══ */}
          <div style={{ height: '4px', backgroundColor: '#F3A51D', flexShrink: 0 }} />

          {/* ══ 3. Three-column body ══ */}
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

            {/* ── Col 1: Topics ── */}
            <div style={{ width: '37%', padding: '20px 24px 16px 28px', borderRight: '1px solid #e8edf2', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4792C', marginBottom: '14px' }}>
                What He Covers
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { title: 'Mattress Science', desc: 'How foam layers and support systems affect sleep quality and physical recovery.' },
                  { title: 'Sleep & Wellness', desc: 'The connection between your mattress and mental clarity, daily performance, and health.' },
                  { title: 'Made in USA Manufacturing', desc: 'What it really takes to keep production domestic when competitors go overseas.' },
                  { title: 'Supply Chain & Retail', desc: 'Navigating distribution from the factory floor to national retail partnerships.' },
                  { title: 'Consumer Buying Mistakes', desc: 'The top errors shoppers make — and a straight-talking guide to avoid them.' },
                  { title: 'Sleep Industry Trends', desc: 'Where the $16B sleep industry is heading — DTC disruption to wellness tech.' },
                  { title: 'Chicago Entrepreneurship', desc: 'Building and scaling a manufacturing business in the heart of the Midwest.' },
                ].map((t) => (
                  <div key={t.title} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#F3A51D', flexShrink: 0, marginTop: '6px' }} />
                    <div style={{ fontSize: '11px', lineHeight: 1.45 }}>
                      <span style={{ fontWeight: 700, color: '#203552' }}>{t.title} </span>
                      <span style={{ color: '#718096' }}>{t.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Col 2: Angles + Sample Qs ── */}
            <div style={{ width: '38%', padding: '20px 22px 16px 24px', borderRight: '1px solid #e8edf2', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4792C', marginBottom: '14px' }}>
                Interview Angles
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
                {[
                  {
                    title: 'The Business Story',
                    desc: 'From factory floor to national retail — how Robert built Sleep6 and Busby, scored an Apt. partnership, and kept it all Made in USA.',
                  },
                  {
                    title: 'Health & Wellness',
                    desc: 'Robert breaks down mattress science — what your bed is actually doing to your body and why most people are sleeping on the wrong one.',
                  },
                  {
                    title: 'Chicago Made',
                    desc: 'A Chicago entrepreneur who manufactures locally, hires locally, and proves American-made can still compete in a global market.',
                  },
                  {
                    title: 'Consumer Advocacy',
                    desc: 'After 25+ years, Robert knows every trick in the mattress sales playbook — and he\'s here to help consumers cut through the noise.',
                  },
                ].map((a) => (
                  <div key={a.title} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '3px', backgroundColor: '#203552', flexShrink: 0, marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#F3A51D" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#203552', marginBottom: '2px' }}>{a.title}</div>
                      <p style={{ fontSize: '11px', color: '#718096', lineHeight: 1.45, margin: 0 }}>{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sample Qs */}
              <div style={{ borderTop: '1px solid #e8edf2', paddingTop: '14px' }}>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4792C', marginBottom: '10px' }}>
                  Sample Questions
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {[
                    '"What\'s the biggest change you\'ve seen in how people think about mattresses over 25 years?"',
                    '"What are the top three mistakes people make when buying a mattress?"',
                    '"You manufacture in the USA when most competitors go overseas — how do you make that work?"',
                    '"Walk us through what actually goes into building a quality mattress."',
                  ].map((q, i) => (
                    <p key={i} style={{ fontSize: '10.5px', fontStyle: 'italic', color: '#4a5568', lineHeight: 1.45, margin: 0 }}>{q}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Col 3: Quick Facts + Contact ── */}
            <div style={{ flex: 1, padding: '20px 20px 16px 22px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4792C', marginBottom: '14px' }}>
                At a Glance
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: 'auto' }}>
                {[
                  { label: 'Experience', value: '25+ Years' },
                  { label: 'Location', value: 'Chicago, IL' },
                  { label: 'Brands', value: 'Sleep6 & Busby' },
                  { label: 'Materials', value: '100% USA-Made' },
                  { label: 'Retail Partner', value: 'Apt.' },
                  { label: 'Warranty', value: '10-Year Guarantee' },
                  { label: 'Interview Format', value: 'Audio & Video' },
                  { label: 'Tech Setup', value: 'Camera-Ready' },
                ].map((f) => (
                  <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a0aec0' }}>{f.label}</span>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#203552' }}>{f.value}</span>
                  </div>
                ))}
              </div>

              {/* Contact card */}
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4792C', marginBottom: '8px' }}>
                  Book Robert
                </div>
                <div style={{ backgroundColor: '#203552', borderRadius: '10px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  <div>
                    <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '2px' }}>Email</div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#F3A51D' }}>press@mybusby.com</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '2px' }}>Phone</div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'white' }}>(844) 886-1640</div>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px' }}>
                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', marginBottom: '2px' }}>Full press kit</div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'white' }}>mybusby.com/press</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══ 4. Footer bar ══ */}
          <div
            className="flex items-center justify-between flex-shrink-0"
            style={{ backgroundColor: '#203552', borderTop: '3px solid #F3A51D', padding: '9px 32px' }}
          >
            <Image
              src="/logo-busby-footer.svg"
              alt="Busby"
              width={70}
              height={22}
              className="brightness-0 invert"
              style={{ opacity: 0.55, objectFit: 'contain' }}
            />
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px', letterSpacing: '0.08em', margin: 0 }}>
              Chicago, IL &nbsp;·&nbsp; American-Made Since Day One
            </p>
            <p style={{ color: '#F3A51D', fontSize: '10px', fontWeight: 600, margin: 0 }}>
              mybusby.com/press
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
