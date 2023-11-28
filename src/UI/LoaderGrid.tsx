import { Loaders } from '../loaders/Loaders';
import { LoaderPreview } from './LoaderPreview';

export const LoaderGrid = () => {
  return (
    <section className='px-4 py-6 md:p-12 bg-white lg:px-20 lg:py-14'>
      <div className='px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl'>
        <div className='max-w-md mx-auto text-center'>
          <h2 className='text-2xl font-bold text-gray-900 sm:text-3xl'>Choose a loader to configure</h2>
          <p className='mt-4 text-base font-normal leading-7 text-gray-600'>Each loader has different configuration possibilities. Choose a loader you like to configure.</p>
        </div>

        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 mt-10 lg:mt-16 lg:gap-6 lg:grid-cols-4'>
          {Loaders.map((loader) => {
            return <LoaderPreview key={loader.slug} loader={loader} />;
          })}
        </div>
      </div>
    </section>
  );
};
