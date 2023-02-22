import Seo from '@/components/Seo';
import CustomLink from '@/components/CustomLink';

export default function Home() {
  return (
    <>
      <Seo />
      <main>
        <section className='bg-gray-100'>
          <div className='flex flex-col items-center justify-center min-h-screen text-center layout'>
            <h1>Validation Form</h1>
            <p className='mt-2 text-gray-600'>
              Built form with Validation using React Hook Form, Yup, Typescript, and Zustand
            </p>
            <CustomLink className='mt-4' href='/form/step-1'>
              Click and Go to form →
            </CustomLink>
          </div>
        </section>
      </main>
    </>
  );
}
