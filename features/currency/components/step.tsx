import { CheckCircle2, LucideIcon } from 'lucide-react';

type Props = {
  s: {
    num: number;
    title: string;
    icon: LucideIcon;
  };
  active: boolean;
  step: number;
  Icon: LucideIcon;
  i: number;
  steps: number;
};

export const Step = ({ s, active, step, Icon, i, steps }: Props) => {
  return (
    <div className="flex items-center flex-1 last:flex-none">
      <div className="flex flex-col items-center gap-1.5">
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            active
              ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30 scale-105'
              : 'bg-background border-2 border-border text-muted-foreground'
          }`}
        >
          {step > s.num ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <Icon className="h-4 w-4" />
          )}
        </div>
        <span
          className={`text-xs font-medium whitespace-nowrap ${
            active ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          {s.title}
        </span>
      </div>
      {i < steps - 1 && (
        <div
          className={`h-0.5 flex-1 mx-2 rounded-full transition-colors duration-300 ${
            step > s.num ? 'bg-primary' : 'bg-border'
          }`}
        />
      )}
    </div>
  );
};
