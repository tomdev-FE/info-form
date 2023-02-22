import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useFormStore from '@/store/useFormStore';
import { stepOneSchema } from '@/lib/yup';

import { StepOneData } from '@/types';

import Seo from '@/components/Seo';
import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import PasswordInput from '@/components/Forms/PasswordInput';

export default function StepOnePage() {
  const router = useRouter();

  const { stepOne, setData } = useFormStore();

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(stepOneSchema),
    defaultValues: stepOne || {},
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: StepOneData) => {
    setData({ step: 1, data });
    router.push('/form/step-2');
  };

  return (
    <>
      <Seo templateTitle='Step 1' />

      <main>
        <section className='bg-gray-100'>
          <article className='min-h-screen py-16 layout'>
            <h1>Step 1</h1>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='max-w-sm mt-8 space-y-4'
              >
                <Input label='Nama' id='name' />
                <Input id='email' label='Email' />
                <PasswordInput id='password' label='Password' />
                <Input id='age' label='Age' />
                <Input id='phone' label='Phone' />

                <Button type='submit'>Next</Button>
              </form>
            </FormProvider>
          </article>
        </section>
      </main>
    </>
  );
}
