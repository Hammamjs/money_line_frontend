import { motion } from 'framer-motion';

import { Globe2, ShieldCheck, Zap } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const HowItWorks = () => {
  const { t } = useTranslation();
  return (
    <section className="py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            {t.howItWorks}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: Zap, title: t.step1, desc: t.step1Desc },
            { icon: ShieldCheck, title: t.step2, desc: t.step2Desc },
            { icon: Globe2, title: t.step3, desc: t.step3Desc },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 text-primary flex items-center justify-center mb-5">
                <step.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
