'use client';

import { useEffect } from 'react';
import { PageLoader } from '@/components/PageLoader';

export default function Template({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return (
        <>
            <PageLoader />
            {children}
        </>
    );
}
