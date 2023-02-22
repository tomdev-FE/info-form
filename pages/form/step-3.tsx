import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useFormStore from '@/store/useFormStore';
import { stepThreeSchema } from '@/lib/yup';

import { StepThreeData } from '@/types';

import Seo from '@/components/Seo';
import Button from '@/components/Button';
import DatePicker from '@/components/Forms/DatePicker';
import Select from '@/components/Forms/Select';

export default function StepThreePage() {
  const router = useRouter();

  const { stepOne, stepTwo, stepThree, setData } = useFormStore();

  useEffect(() => {
    if (!stepOne) {
      toast.error('Please fill step one first');
      router.push('/form/step-1');
    } else if (!stepTwo) {
      toast.error('Please fill step two first');
      router.push('/form/step-2');
    }
  }, [router, stepOne, stepTwo]);

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(stepThreeSchema),
    defaultValues: stepThree || {},
  });
  const { handleSubmit } = methods;
    const onSubmit = (data: StepThreeData) => {
    setData({ step: 3, data });
    router.push('/form/recap');
  };

  return (
    <>
      <Seo templateTitle='Step 3' />

      <main>
        <section className='bg-gray-100'>
          <article className='min-h-screen py-16 layout'>
            <h1>Step 3</h1>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='max-w-sm mt-8 space-y-4'
              >
                <DatePicker
                  id='birth_date'
                  label='Birth Date'
                  placeholder='Select your birth date'
                />
                <Select id='gender' label='Gender' placeholder='Choose gender'>
                  <option value='L'>Male</option>
                  <option value='P'>Female</option>
                </Select>
                <Button type='submit'>Next</Button>
              </form>
            </FormProvider>
          </article>
        </section>
      </main>
    </>
  );
}
