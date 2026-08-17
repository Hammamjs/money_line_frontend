import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <LoaderCircle
      className={cn(
        'animate-spin',
        {
          'h-4 w-4': size === 'sm',
          'h-5 w-5': size === 'md',
          'h-8 w-8': size === 'lg',
        },
        className,
      )}
      aria-label="Loading"
    />
  );
}
