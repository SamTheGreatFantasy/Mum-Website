import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App experience', () => {
  it('requires all contact fields before submission', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /continue/i }));
    await user.click(screen.getByRole('button', { name: /contact us/i }));

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  it('keeps spaces in the short bio and reveals save changes after sign in', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /continue/i }));
    await user.click(screen.getByRole('button', { name: /my account/i }));

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    expect(signInButton).toBeDisabled();

    await user.type(screen.getByPlaceholderText(/display name/i), 'Ali');
    await user.type(screen.getByPlaceholderText(/real name/i), 'Ali Corah');
    await user.type(screen.getByPlaceholderText(/email/i), 'ali@example.com');
    await user.type(screen.getByPlaceholderText(/e\.g\. april 2024/i), 'April 2024');
    await user.type(screen.getByPlaceholderText('0'), '3');
    const bioField = screen.getByPlaceholderText(/tell us a little about your knitting/i);
    await user.type(bioField, 'hello there');

    expect(bioField).toHaveValue('hello there');
    expect(signInButton).not.toBeDisabled();

    await user.click(signInButton);
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  it('shows the live contact message counter and enforces at least 500 characters', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /continue/i }));
    await user.click(screen.getByRole('button', { name: /contact us/i }));

    const counter = screen.getByText(/0\/500/i);
    expect(counter).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText(/tell us what you'd like to share/i);
    await user.type(textarea, 'a'.repeat(500));

    expect(screen.getByText(/500\/500/i)).toBeInTheDocument();
  }, 10000);

  it('shows a coming soon message when the Shop tab is opened', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /continue/i }));
    await user.click(screen.getByRole('button', { name: /^shop/i }));

    expect(screen.getByRole('heading', { level: 1, name: /shop.*coming soon/i })).toBeInTheDocument();
  });
});
