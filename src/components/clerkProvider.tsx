"use client";

import { ClerkProvider as Provider } from '@clerk/nextjs'

interface ClerkProviderProps {
  children: React.ReactNode;
  appearance?: any;
  // أي props تانيه
}

export default function ClerkProvider({ 
  children,
  appearance,
  ...props 
}: ClerkProviderProps) {
  return (
    <Provider 
      appearance={appearance}
      {...props}
    >
      {children}
    </Provider>
  );
}