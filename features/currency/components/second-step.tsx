import { motion } from 'framer-motion';
import { UploadCloud, UserIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { selectUser } from '@/features/auth/store';
import { TCreateOrderSchema } from '@/features/orders/schema';
import { useTranslation } from '@/lib/i18n';

type Props = {
  imagePreview: string | undefined;

  form: UseFormReturn<TCreateOrderSchema>;

  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleNextStep2: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement, Element>) => void;
};

export const SecondStep = ({
  handleImageUpload,
  handleNextStep2,
  setStep,
  imagePreview,
  form,
}: Props) => {
  const { t } = useTranslation();

  const user = useSelector(selectUser);

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserIcon className="h-5 w-5 text-primary" /> {t.yourInfo}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              {t.username}
            </label>
            <Input value={user?.username} readOnly className="bg-muted/40" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              {t.email}
            </label>
            <Input value={user?.email} readOnly className="bg-muted/40" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              {t.paymentProvider}
            </label>
            <Input
              {...form.register('paymentProvider')}
              placeholder="wallet or bank name"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              {t.accountHolderName}
            </label>
            <Input
              {...form.register('accountHolderName')}
              placeholder="Put account owner."
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              {t.phoneNum}
            </label>
            <Input {...form.register('phone')} placeholder="+249..." />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              {t.note}
            </label>
            <Textarea
              {...form.register('extraInfo')}
              placeholder="Type something"
              className="resize-none h-25"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              {t.uploadProof}
            </label>
            <label className="block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/30 hover:border-primary/40 transition-colors">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              {imagePreview ? (
                <div className="space-y-2">
                  <Image
                    src={imagePreview}
                    alt="proof"
                    width={200}
                    height={200}
                    className="mx-auto rounded-lg object-cover"
                  />
                  <div className="text-xs text-muted-foreground">
                    {t.changeImage}
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="text-sm font-medium">{t.clickOrDrag}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.supportsFormats}
                  </p>
                </div>
              )}
            </label>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(1)}>
              {t.back}
            </Button>
            <Button className="flex-1 h-11" onClick={handleNextStep2}>
              {t.next}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
