import { LoaderDotLinear } from '../loaders/LoaderDotLinear.meta';
import { LoaderPreview } from './LoaderPreview';

export const LoaderGrid = () => {
  return (
    <section className='px-12 py-12 bg-white sm:px-6 sm:py-16 lg:px-20 lg:py-20'>
      <div className='px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl'>
        <div className='max-w-md mx-auto text-center'>
          <h2 className='text-2xl font-bold text-gray-900 sm:text-3xl'>Choose a loader to configure</h2>
          <p className='mt-4 text-base font-normal leading-7 text-gray-600'>Each loader has different configuration possibilities. Choose a loader you like to configure.</p>
        </div>

        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 mt-10 lg:mt-16 lg:gap-6 lg:grid-cols-4'>
          <LoaderPreview isNew loader={LoaderDotLinear} />
        </div>
      </div>
    </section>
  );
};
