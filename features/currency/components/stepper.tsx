import { LucideIcon } from 'lucide-react';
import { Step } from './step';

type Props = {
  steps: {
    num: number;
    title: string;
    icon: LucideIcon;
  }[];
  step: number;
};

export const Stepper = ({ steps, step }: Props) => {
  return (
    <div className="flex items-center justify-between mb-8 px-2">
      {steps.map((s, i) => {
        const Icon = s.icon;
        const active = step >= s.num;
        return (
          <Step
            key={s.num}
            Icon={Icon}
            active={active}
            i={i}
            s={s}
            step={step}
            steps={steps.length}
          />
        );
      })}
    </div>
  );
};
