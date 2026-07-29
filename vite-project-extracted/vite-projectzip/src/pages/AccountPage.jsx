import React from 'react';
import { useApp } from '../context/AppContext';

export default function AccountPage() {
  const {
    isSignedIn, showProfileForm, setShowProfileForm,
    profile, profileSaved, setProfileSaved,
    signInError,
    isEmailValid, isMemberSinceValid, isPatternsValid, isRealNameValid, isBioValid,
    isProfileComplete, isProfileValid,
    handleSignIn, handleProfileSave, handleProfileFieldChange,
    avatarLabel,
    setShowSignOutConfirm,
    handleClick, handleHover,
  } = useApp();

  return (
    <div className="account-page">
      <div className="account-hero">
        <div className={`account-avatar ${isSignedIn ? 'account-avatar--filled' : ''}`}>
          {avatarLabel}
        </div>
        <div>
          <h1>My Account</h1>
          <p className="about-page__subtitle">
            Keep your knitting workspace warm, personal, and beautifully organised.
          </p>
        </div>
      </div>

      <div className="account-grid">
        <div className="settings-card">
          <h2>Profile details</h2>
          {showProfileForm ? (
            <>
              <div className="account-form">
                {[
                  { field: 'displayName', label: 'Display name', type: 'text', placeholder: 'Display name', valid: !!profile.displayName.trim() },
                  { field: 'realName',    label: 'Real name',    type: 'text', placeholder: 'Real name',    valid: isRealNameValid && !!profile.realName.trim() },
                  { field: 'email',       label: 'Email',        type: 'email',placeholder: 'you@example.com', valid: isEmailValid && !!profile.email.trim() },
                  { field: 'memberSince', label: 'Member since', type: 'text', placeholder: 'e.g. April 2024', valid: isMemberSinceValid && !!profile.memberSince.trim() },
                  { field: 'patternsCompleted', label: 'Patterns completed', type: 'text', inputMode: 'numeric', placeholder: '0', valid: isPatternsValid && !!profile.patternsCompleted.trim() },
                ].map(({ field, label, type, inputMode, placeholder, valid }) => (
                  <label key={field} className="input-field">
                    <span>{label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <input
                        type={type}
                        inputMode={inputMode}
                        value={profile[field]}
                        onChange={(e) => handleProfileFieldChange(field, e.target.value)}
                        placeholder={placeholder}
                      />
                      <span className={`validation-indicator${valid ? '' : ' validation-indicator--invalid'}`}>
                        {valid ? '✓' : '•'}
                      </span>
                    </div>
                  </label>
                ))}

                <label className="input-field">
                  <span>Short bio</span>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => handleProfileFieldChange('bio', e.target.value)}
                    rows={4}
                    placeholder="Tell us a little about your knitting"
                  />
                  <span className={`counter-pill${profile.bio.trim().length < 1 || profile.bio.trim().length > 1000 ? ' counter-pill--warning' : ''}`}>
                    {profile.bio.trim().length}/1000
                  </span>
                </label>
              </div>

              <div className="account-actions-row">
                {isSignedIn ? (
                  <button
                    className="button button--primary"
                    onMouseEnter={handleHover}
                    onClick={handleProfileSave}
                    type="button"
                    disabled={!isProfileValid}
                  >
                    Save changes
                  </button>
                ) : (
                  <button
                    className="button button--secondary"
                    onMouseEnter={handleHover}
                    onClick={handleSignIn}
                    type="button"
                    disabled={!isProfileComplete}
                  >
                    Sign in
                  </button>
                )}
              </div>

              {signInError  && <p className="account-feedback account-feedback--error">{signInError}</p>}
              {profileSaved && <p className="account-feedback">Your profile is looking lovely and up to date.</p>}
            </>
          ) : (
            <div className="account-actions-row">
              <button
                className="button button--secondary"
                onMouseEnter={handleHover}
                onClick={() => { handleClick(); setShowProfileForm(true); setProfileSaved(false); }}
                type="button"
              >
                Change profile
              </button>
            </div>
          )}
        </div>

        <div className="account-stack">
          {isSignedIn ? (
            <>
              <div className="settings-card account-panel account-panel--enter">
                <h2>Member snapshot</h2>
                <div className="account-stat">
                  <span>Member since</span>
                  <strong>{profile.memberSince || 'Add a start date'}</strong>
                </div>
                <div className="account-stat">
                  <span>Patterns completed</span>
                  <strong>{profile.patternsCompleted || 'Add a count'}</strong>
                </div>
              </div>
              <div className="settings-card settings-card--danger account-panel account-panel--enter">
                <h2>Account actions</h2>
                <p>Sign out when you're stepping away from your knitting nook.</p>
                <button
                  className="button button--danger"
                  onMouseEnter={handleHover}
                  onClick={() => { handleClick(); setShowSignOutConfirm(true); }}
                  type="button"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
