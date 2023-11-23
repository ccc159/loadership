import { useEffect, useState } from 'react';

export const LoaderCircularDot = () => {
  const [numDots, setNumDots] = useState(4);
  const [size, setSize] = useState(100);
  const [dotSize, setDotSize] = useState(13);
  const [dotDistance, setDotDistance] = useState(24);
  const [loaderVersion, setLoaderVersion] = useState(1);

  useEffect(() => {
    setLoaderVersion(loaderVersion + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numDots]);

  const tempStyles = Array(numDots - 1)
    .fill(0)
    .map(
      (_, i) =>
        `.loader_${loaderVersion} div:nth-child(${i + 2}) {
            left: ${8 + i * dotDistance}px;
            animation: loader_${loaderVersion}_translate 0.6s infinite;
        }`
    )
    .join('\n');

  const styles = `
  .loader_${loaderVersion} {
      display: inline-block;
      position: relative;
      width: ${size}px;
      height: ${size}px;
      }
      .loader_${loaderVersion} div {
      position: absolute;
      top: ${Math.floor(size - dotSize) / 2}px;
      width: ${dotSize}px;
      height: ${dotSize}px;
      border-radius: 50%;
      background: white;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
      }
      .loader_${loaderVersion} div:nth-child(1) {
        left: 8px;
        animation: loader_${loaderVersion}_scale_up 0.6s infinite;
      }
      ${tempStyles}
      .loader_${loaderVersion} div:nth-child(${numDots + 1}) {
        left: ${8 + (numDots - 1) * dotDistance}px;
        animation: loader_${loaderVersion}_scale_down 0.6s infinite;
      }
      @keyframes loader_${loaderVersion}_scale_up {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
      }
      @keyframes loader_${loaderVersion}_scale_down {
      0% {
          transform: scale(1);
      }
      100% {
          transform: scale(0);
      }
      }
      @keyframes loader_${loaderVersion}_translate {
      0% {
          transform: translate(0, 0);
      }
      100% {
          transform: translate(${dotDistance}px, 0);
      }
  }
  `;

  return (
    <>
      <style>{styles}</style>
      <section className='loader-controls'>
        <input type='number' value={numDots} onChange={(v) => setNumDots(parseInt(v.target.value))} />
        <input type='number' value={dotSize} onChange={(v) => setDotSize(parseInt(v.target.value))} />
        <input type='number' value={dotDistance} onChange={(v) => setDotDistance(parseInt(v.target.value))} />
      </section>
      <div className={`loader_${loaderVersion}`}>
        {Array(numDots + 1)
          .fill(0)
          .map((_, i) => (
            <div key={i}></div>
          ))}
      </div>
    </>
  );
};
