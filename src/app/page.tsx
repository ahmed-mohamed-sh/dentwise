"use client";

import { SignedIn, SignedOut, SignUpButton, SignOutButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <SignedOut>
        <SignUpButton mode="modal">Sign Up</SignUpButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton>Sign Out</SignOutButton>
      </SignedIn>
    </div>
  );
}
