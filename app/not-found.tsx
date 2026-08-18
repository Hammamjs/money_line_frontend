'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-zinc-950 to-zinc-900 px-4">
      <Card className="w-full max-w-lg border border-yellow-500/30 bg-zinc-950/90 backdrop-blur-xl shadow-2xl shadow-yellow-500/10">
        <CardContent className="p-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-yellow-500/40 bg-yellow-500/10">
              <AlertTriangle className="h-10 w-10 text-yellow-400" />
            </div>

            <span className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-yellow-500">
              Error 404
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              Page Not Found
            </h1>

            <p className="mt-4 max-w-sm text-zinc-400">
              The page you're looking for doesn't exist, has been moved, or the
              URL may be incorrect.
            </p>

            <div className="mt-8 h-px w-full bg-linear-to-r from-transparent via-yellow-500/40 to-transparent" />

            <Button
              className="mt-8 bg-yellow-500 text-black hover:bg-yellow-400 font-semibold"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
