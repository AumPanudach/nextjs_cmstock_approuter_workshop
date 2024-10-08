"use client"
import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section>
      {children}
    </section>
  );
};

export default AuthLayout;
