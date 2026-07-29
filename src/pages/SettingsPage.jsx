import React from 'react';
import { useApp } from '../context/AppContext';

export default function SettingsPage() {
  const {
    theme, setTheme, accent, setAccent,
    clickSound, setClickSound,
    isSignedIn, setShowSignOutConfirm,
    handleClick, handleHover,
  } = useApp();

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-card">
        <h2>Sound settings</h2>
        <label className="settings-toggle">
          <span>Click sound</span>
          <input
            type="checkbox"
            checked={clickSound}
            onChange={() => { handleClick(); setClickSound((v) => !v); }}
          />
        </label>
      </div>

      <div className="settings-card">
        <h2>Theme settings</h2>
        <div className="settings-field">
          <span>Mode</span>
          <div className="settings-options">
            {['light', 'dark'].map((t) => (
              <button
                key={t}
                className={theme === t ? 'settings-option settings-option--active' : 'settings-option'}
                onMouseEnter={handleHover}
                onClick={() => { handleClick(); setTheme(t); }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="settings-field">
          <span>Accent</span>
          <div className="settings-options">
            {['warm', 'cool', 'blush'].map((a) => (
              <button
                key={a}
                className={accent === a ? 'settings-option settings-option--active' : 'settings-option'}
                onMouseEnter={handleHover}
                onClick={() => { handleClick(); setAccent(a); }}
              >
                {a.charAt(0).toUpperCase() + a.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isSignedIn && (
        <div className="settings-card settings-card--danger">
          <h2>Account actions</h2>
          <p>This is a placeholder for signing out of your knitting workspace.</p>
          <button
            className="button button--danger"
            onMouseEnter={handleHover}
            onClick={() => { handleClick(); setShowSignOutConfirm(true); }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
