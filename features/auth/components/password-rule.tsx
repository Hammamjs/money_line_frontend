import { Check, Circle } from 'lucide-react';

export function PasswordRule({
  passed,
  text,
}: {
  passed: boolean;
  text: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-sm transition-colors ${
        passed ? 'text-green-600' : 'text-muted-foreground'
      }`}
    >
      {passed ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
      <span>{text}</span>
    </div>
  );
}
