'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const PDFViewQuote = dynamic(() =>
  import('@/components/layout/dashboard-component/quotes/pdf/QuotePDFView').then(mod => mod.PDFViewQuote),
  { ssr: false }
);


export default function Page() {
  return (
    <div>
      <PDFViewQuote />
    </div>
  );
}
