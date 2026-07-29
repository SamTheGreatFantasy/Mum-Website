import React from 'react';
import { useApp } from '../context/AppContext';
import SignOutModal from '../components/SignOutModal';
import PatternDashboardPage from './PatternDashboardPage';
import FavouritesPage       from './FavouritesPage';
import AccountPage          from './AccountPage';
import BasketPage           from './BasketPage';
import ContactPage          from './ContactPage';
import AboutPage            from './AboutPage';
import SettingsPage         from './SettingsPage';
import MyPatternsPage       from './MyPatternsPage';

const NAV_TABS = [
  { id: 'pattern',    label: 'Pattern Dashboard' },
  { id: 'mypatterns', label: 'My Patterns' },
  { id: 'favourites', label: 'Favourites' },
  { id: 'account',    label: 'My Account' },
  { id: 'shop',       label: 'Shop', locked: true },
  { id: 'basket',     label: 'Basket' },
  { id: 'contact',    label: 'Contact Us' },
  { id: 'about',      label: 'About' },
  { id: 'settings',   label: 'Settings' },
];

function ShopComingSoon() {
  return (
    <div className="coming-soon">
      <div className="coming-soon__icon">🔒</div>
      <h1>Shop — Coming Soon</h1>
      <p className="coming-soon__body">
        We're putting the finishing touches on the shop. Check back soon for yarn, needles, and pattern kits!
      </p>
    </div>
  );
}

const PAGE_MAP = {
  pattern:    PatternDashboardPage,
  mypatterns: MyPatternsPage,
  favourites: FavouritesPage,
  account:    AccountPage,
  shop:       ShopComingSoon,
  basket:     BasketPage,
  contact:    ContactPage,
  about:      AboutPage,
  settings:   SettingsPage,
};

export default function DashboardLayout() {
  const { activeTab, handleTab, theme, accent } = useApp();
  const ActivePage = PAGE_MAP[activeTab] || PatternDashboardPage;

  return (
    <div className={`app theme-${theme} accent-${accent}`}>
      <SignOutModal />
      <div className="dashboard">
        <aside className="dashboard__sidebar">
          {NAV_TABS.map(({ id, label, locked }) => (
            <button
              key={id}
              className={[
                'dashboard__tab',
                activeTab === id ? 'dashboard__tab--active' : '',
                locked ? 'dashboard__tab--locked' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => handleTab(id)}
              aria-disabled={locked || undefined}
            >
              {label}
              {locked && <span className="dashboard__tab-lock">🔒 <em>Coming soon</em></span>}
            </button>
          ))}
        </aside>
        <main className="dashboard__content">
          <div key={activeTab} className="dashboard__panel dashboard__panel--wide">
            <ActivePage />
          </div>
        </main>
      </div>
    </div>
  );
}
