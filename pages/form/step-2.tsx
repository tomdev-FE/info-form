import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useFormStore from '@/store/useFormStore';
import { stepTwoSchema } from '@/lib/yup';

import { StepTwoData } from '@/types';

import Seo from '@/components/Seo';
import Input from '@/components/Forms/Input';
import Button from '@/components/Button';
import DropzoneInput from '@/components/Forms/DropzoneInput';

export default function StepTwoPage() {
  const router = useRouter();

  const { stepOne, stepTwo, setData } = useFormStore();

  useEffect(() => {
    if (!stepOne) {
      toast.error('Please fill step one first');
      router.push('/form/step-1');
    }
  }, [router, stepOne]);

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(stepTwoSchema),
    defaultValues: stepTwo || {},
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: StepTwoData) => {
    setData({ step: 2, data });

    router.push('/form/step-3');
  };

  return (
    <>
      <Seo templateTitle='Step 2' />

      <main>
        <section className='bg-gray-100'>
          <article className='min-h-screen py-16 layout'>
            <h1>Step 2</h1>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='max-w-sm mt-8 space-y-4'
              >
                <Input id='score_1' label='Score 1' />
                <Input id='score_2' label='Score 2' />
                <Input id='score_3' label='Score 3' />
                <DropzoneInput
                  label='Score File'
                  id='score_file'
                  accept='image/png, image/jpg, image/jpeg'
                  helperText='You can only drop .jpg, .jpeg, or .png file here'
                  maxFiles={3}
                />
                <DropzoneInput
                  label='Identity Card'
                  id='identity_card'
                  accept='application/pdf'
                  helperText='You can only drop .pdf file here'
                  maxFiles={1}
                />

                <Button type='submit'>Next</Button>
              </form>
            </FormProvider>
          </article>
        </section>
      </main>
    </>
  );
}
