'use client';
import Callback from '../../components/Callback';
import { Suspense } from 'react';

export default function CallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Callback />
    </Suspense>
  );
}