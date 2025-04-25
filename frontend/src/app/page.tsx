'use client';

import { useState } from 'react';

export default function Home() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('Test error triggered by button');
  }

  return (
    <main>
      <h1>Task Management App</h1>
      <button
        onClick={() => setShouldError(true)}
        style={{
          padding: '8px 16px',
          marginTop: '20px',
          background: '#ff4d4d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Trigger Error
      </button>
    </main>
  );
}
