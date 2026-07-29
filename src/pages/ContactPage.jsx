import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ContactPage() {
  const { isSignedIn, profile, handleClick, handleHover } = useApp();

  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');

  const change = (field, value) => {
    setForm((c) => ({ ...c, [field]: value }));
    if (error)   setError('');
    if (success) setSuccess('');
  };

  const isContactNameValid    = form.name.trim().length > 0;
  const isContactEmailValid   = /.+@.+\..+/.test(form.email.trim());
  const isContactSubjectValid = form.subject.trim().length > 0;
  const isContactMessageValid = form.message.trim().length >= 100;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick();

    const effectiveName  = isSignedIn && profile.realName.trim()  ? profile.realName.trim()  : form.name;
    const effectiveEmail = isSignedIn && profile.email.trim()     ? profile.email.trim()     : form.email;
    const missing = !effectiveName.trim() || !effectiveEmail.trim() || !form.subject.trim() || !form.message.trim();

    if (missing) {
      setError('Please fill in all fields before sending your message.');
      return;
    }
    if (!isContactMessageValid) {
      setError('Please write at least 100 characters so we can help you properly.');
      return;
    }

    setError('');
    setSuccess("Thanks for reaching out. We'll get back to you soon.");
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p className="contact-page__subtitle">Send us a warm message and we'll get back to you soon.</p>
      <div className="contact-details">
        <div className="contact-details__card">
          <h2>OFFICIAL CONTACT INFORMATION</h2>
          <dl>
            <dt>Trade name</dt>      <dd>Fitting in Knitting</dd>
            <dt>Email</dt>           <dd>ali@fittinginknitting.co.uk</dd>
            <dt>Physical address</dt><dd>113 Scalford Road, LE13 1JZ, United Kingdom</dd>
            <dt>VAT number</dt>      <dd>N/A</dd>
            <dt>Company Name</dt>    <dd>Ali And Chap LTD</dd>
            <dt>Trade Company number</dt><dd>11611069</dd>
            <dt>Phone number</dt>    <dd>00447870542074</dd>
          </dl>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-row">
            <label className="input-field">
              <span>Name</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <input
                  type="text"
                  value={isSignedIn && profile.realName.trim() ? profile.realName.trim() : form.name}
                  onChange={(e) => { if (!isSignedIn || !profile.realName.trim()) change('name', e.target.value); }}
                  placeholder="Your full name"
                  readOnly={isSignedIn && !!profile.realName.trim()}
                />
                <span className={`validation-indicator${(isSignedIn && !!profile.realName.trim()) || isContactNameValid ? '' : ' validation-indicator--invalid'}`}>
                  {(isSignedIn && !!profile.realName.trim()) || isContactNameValid ? '✓' : '•'}
                </span>
              </div>
            </label>
            <label className="input-field">
              <span>Email</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <input
                  type="email"
                  value={isSignedIn && profile.email.trim() ? profile.email.trim() : form.email}
                  onChange={(e) => { if (!isSignedIn || !profile.email.trim()) change('email', e.target.value); }}
                  placeholder="you@example.com"
                  readOnly={isSignedIn && !!profile.email.trim()}
                />
                <span className={`validation-indicator${(isSignedIn && !!profile.email.trim()) || isContactEmailValid ? '' : ' validation-indicator--invalid'}`}>
                  {(isSignedIn && !!profile.email.trim()) || isContactEmailValid ? '✓' : '•'}
                </span>
              </div>
            </label>
          </div>

          <label className="input-field">
            <span>Subject</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => change('subject', e.target.value)}
                placeholder="Topic of your message"
              />
              <span className={`validation-indicator${isContactSubjectValid ? '' : ' validation-indicator--invalid'}`}>
                {isContactSubjectValid ? '✓' : '•'}
              </span>
            </div>
          </label>

          <label className="input-field">
            <span>Message</span>
            <textarea
              value={form.message}
              onChange={(e) => change('message', e.target.value)}
              placeholder="Tell us what you'd like to share…"
              rows={8}
            />
            <span className={`counter-pill${form.message.trim().length < 100 ? ' counter-pill--warning' : ''}`}>
              {form.message.trim().length}/100
            </span>
          </label>

          {error   && <p className="account-feedback account-feedback--error">{error}</p>}
          {success && <p className="account-feedback">{success}</p>}

          <button className="button button--primary" onMouseEnter={handleHover} type="submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
