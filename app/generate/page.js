import { Suspense } from 'react';
import GenerateClient from './GenerateClient';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading form...</p>}>
      <GenerateClient />
    </Suspense>
  );
}