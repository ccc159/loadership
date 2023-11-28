import customize from '../assets/customize.svg';
import free from '../assets/free.svg';
import instant from '../assets/instant.svg';
import no_dependencies from '../assets/no-dependency.svg';
import no_login from '../assets/no-user.svg';
import rich_collection from '../assets/rich-collection.svg';

export const Features = () => {
  return (
    <section className='py-12 bg-white sm:py-16 lg:py-16'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-4xl font-pj'>Why loadership</h2>
          <p className='mt-4 text-base leading-7 text-gray-600 sm:mt-8 font-pj'>The best tool to customize your own loaders without starting from scratch.</p>
        </div>

        <div className='grid grid-cols-1 mt-6 text-center sm:mt-6 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-12'>
          <div className='md:p-8 lg:p-14'>
            <img width={44} className='mx-auto' src={rich_collection} alt='' />
            <h3 className='mt-12 text-xl font-bold text-gray-900 font-pj'>Rich collection</h3>
            <p className='mt-5 text-base text-gray-600 font-pj'>
              Choose from a diverse collection of loader styles, from spinners to progress bars. LoaderShip provides a variety of options to suit different contexts and design preferences.
            </p>
          </div>

          <div className='md:p-8 lg:p-14 md:border-l md:border-mp'>
            <img width={44} className='mx-auto' src={no_login} alt='' />
            <h3 className='mt-12 text-xl font-bold text-gray-900 font-pj'>No login required</h3>
            <p className='mt-5 text-base text-gray-600 font-pj'>
              LoaderShip values your time and privacy. Enjoy the full functionality of the app without the hassle of creating an account or remembering login credentials. Get started with creating
              loaders hassle-free.
            </p>
          </div>

          <div className='md:p-8 lg:p-14 md:border-l md:border-mp'>
            <img width={44} className='mx-auto' src={no_dependencies} alt='' />
            <h3 className='mt-12 text-xl font-bold text-gray-900 font-pj'>No dependencies</h3>
            <p className='mt-5 text-base text-gray-600 font-pj'>Generate CSS-only loaders that can be easily incorporated into your projects without any additional dependencies.</p>
          </div>

          <div className='md:p-8 lg:p-14 md:border-t md:border-mp'>
            <img width={44} className='mx-auto' src={customize} alt='' />
            <h3 className='mt-12 text-xl font-bold text-gray-900 font-pj'>Customizable loaders</h3>
            <p className='mt-5 text-base text-gray-600 font-pj'>
              Tailor your website's loading animations to match your brand identity. With LoaderShip, you have the freedom to customize loader styles, colors, and behaviors, ensuring a seamless
              integration into your design.
            </p>
          </div>

          <div className='md:p-8 lg:p-14 md:border-l md:border-mp md:border-t'>
            <img width={44} className='mx-auto' src={free} alt='' />
            <h3 className='mt-12 text-xl font-bold text-gray-900 font-pj'>Completely free</h3>
            <p className='mt-5 text-base text-gray-600 font-pj'>
              LoaderShip is committed to providing a valuable tool without any cost. Enjoy all the features and benefits without worrying about subscriptions or hidden fees.
            </p>
          </div>

          <div className='md:p-8 lg:p-14 md:border-l md:border-mp md:border-t'>
            <img width={44} className='mx-auto' src={instant} alt='' />
            <h3 className='mt-12 text-xl font-bold text-gray-900 font-pj'>Realtime preview</h3>
            <p className='mt-5 text-base text-gray-600 font-pj'>
              Witness the magic as you tweak your loader settings. LoaderShip offers a real-time preview feature, allowing you to see the impact of your configurations instantly and make adjustments
              on the fly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
