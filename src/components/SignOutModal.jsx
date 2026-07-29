import React from 'react';
import { useApp } from '../context/AppContext';

export default function SignOutModal() {
  const { showSignOutConfirm, setShowSignOutConfirm, handleSignOut } = useApp();

  if (!showSignOutConfirm) return null;

  return (
    <div
      className="signout-overlay"
      onClick={() => setShowSignOutConfirm(false)}
    >
      <div className="signout-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Sign out?</h2>
        <p>Are you sure you want to sign out of your knitting nook?</p>
        <div className="signout-modal__actions">
          <button className="button button--danger" type="button" onClick={handleSignOut}>
            Yes, sign out
          </button>
          <button
            className="button button--secondary"
            type="button"
            onClick={() => setShowSignOutConfirm(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
