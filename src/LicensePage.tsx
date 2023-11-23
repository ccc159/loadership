export const LicensePage = () => {
  return (
    <section className='px-12 py-12 bg-white sm:px-6 sm:py-16 lg:px-20 lg:py-20'>
      <div className='flex-col items-center justify-center'>
        <h1 className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>License Statement</h1>
        <div className='mt-4 text-base font-normal leading-7 text-gray-600 '>
          <p>
            <span className='font-extrabold'>Loadership</span> is licensed under a{' '}
            <a className='text-gray-600' href='https://creativecommons.org/licenses/by-nc/4.0/' target='_blank'>
              Creative Commons Attribution-NonCommercial 4.0 International License
            </a>
            .
          </p>

          <h4 className='mt-3 font-bold'>You are free to:</h4>
          <ul className='mt-3 ml-3'>
            <li>
              <span className='italic underline '>Share:</span> copy and redistribute the material in any medium or format.
            </li>
            <li>
              <span className='italic underline '>Adapt:</span> remix, transform, and build upon the material.
            </li>
          </ul>

          <h4 className='mt-3 font-bold'>Under the following terms:</h4>
          <ul className='mt-3 ml-3'>
            <li>
              <span className='italic underline '>Attribution:</span> You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any
              reasonable manner, but not in any way that suggests the licensor endorses you or your use.
            </li>
            <li>
              <span className='italic underline '>NonCommercial:</span> You may not use the material for commercial purposes without obtaining a separate license from <em>Loadership</em>.
            </li>
          </ul>

          <h4 className='mt-3 font-bold'>No additional restrictions:</h4>
          <p>You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.</p>

          <h4 className='mt-3 font-bold'>Notices:</h4>
          <p>You do not have to comply with the license for elements of the material in the public domain or where your use is permitted by an applicable exception or limitation.</p>

          <h4 className='mt-3 font-bold'>No warranties are given.</h4>
          <p>
            The license may not give you all of the permissions necessary for your intended use. For example, other rights such as publicity, privacy, or moral rights may limit how you use the
            material.
          </p>
        </div>
      </div>
    </section>
  );
};
