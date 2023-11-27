import { Configurator } from '../UI/Configurator';
import { generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderDotCircularFadeClass extends LoaderClass {
  public params: {
    autoLoaderSize: boolean;
    loaderWidth: number;
    loaderHeight: number;
    loaderVersion: string;
    loaderRadius: number;
    fadeRange: number;
    dotNum: number;
    dotSize: number;
    dotScale: number;
    dotColor: string;
    speed: number;
  };

  constructor() {
    super();
    this.params = {
      autoLoaderSize: true,
      loaderWidth: 0,
      loaderHeight: 0,
      loaderVersion: generateShortID(),
      loaderRadius: 30,
      fadeRange: 0.15,
      dotNum: 10,
      dotSize: 10,
      dotScale: 1,
      dotColor: '#ffffff',
      speed: 1.2,
    };
    this.controls = {
      ...this.controls,
      loaderRadius: {
        name: 'Loader radius',
        type: 'number',
        group: 'Loader',
        forceUpdate: true,
        affectLoaderSize: true,
      },
      fadeRange: {
        name: 'Fade range',
        type: 'number',
        group: 'Loader',
        min: 0,
        max: 0.49,
        step: 0.01,
        affectLoaderSize: true,
      },
      dotNum: {
        name: 'Number of dots',
        type: 'number',
        group: 'Dot',
        forceUpdate: true,
        affectLoaderSize: true,
      },
      dotSize: {
        name: 'Dot size',
        type: 'number',
        group: 'Dot',
        unit: 'px',
        affectLoaderSize: true,
      },
      dotScale: {
        name: 'Dot scale',
        type: 'number',
        group: 'Dot',
        min: 1,
        max: 10,
        step: 0.01,
        affectLoaderSize: true,
      },
      dotColor: {
        name: 'Dot color',
        type: 'color',
        group: 'Dot',
      },
      speed: {
        name: 'Rotate speed',
        type: 'number',
        group: 'Speed',
        min: 0,
        max: 2,
        step: 0.01,
        unit: 's',
      },
    };
  }

  public override get PerfectWidth(): number {
    return this.params.loaderRadius * 2 + this.params.dotSize * this.params.dotScale;
  }

  public override get PerfectHeight(): number {
    return this.params.loaderRadius * 2 + this.params.dotSize * this.params.dotScale;
  }

  public override get HTML(): JSX.Element {
    return (
      <div className={`loadership_${this.params.loaderVersion}`}>
        {Array(this.params.dotNum)
          .fill(0)
          .map((_, i) => (
            <div key={i}></div>
          ))}
      </div>
    );
  }

  public override get CSS(): string {
    const tempStyles = Array(this.params.dotNum)
      .fill(0)
      .map(
        (_, i) =>
          `.loadership_${this.params.loaderVersion} div:nth-child(${i + 1}) {
              animation-delay: ${((-this.params.speed / this.params.dotNum) * i).toFixed(2)}s;
              top: ${Math.round(this.params.loaderRadius * Math.cos((2 * Math.PI * i) / this.params.dotNum) + this.PerfectHeight / 2 - this.params.dotSize / 2)}px;
              left: ${Math.round(this.params.loaderRadius * Math.sin((2 * Math.PI * i) / this.params.dotNum) + this.PerfectWidth / 2 - this.params.dotSize / 2)}px;
            }`
      )
      .join('\n');

    const facdAnimation = `
      @keyframes loadership_${this.params.loaderVersion}_fade {
        0%, ${this.params.fadeRange * 100}%, ${(1 - this.params.fadeRange) * 100}%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
      }    
    `;

    const styles = `
        .loadership_${this.params.loaderVersion} {
          display: flex;
          position: relative;
          width: ${this.params.loaderWidth}px;
          height: ${this.params.loaderHeight}px;
        }
        .loadership_${this.params.loaderVersion} div {
          position: absolute;
          width: ${this.params.dotSize}px;
          height: ${this.params.dotSize}px;
          border-radius: 50%;
          background: ${this.params.dotColor};
          animation: loadership_${this.params.loaderVersion}_fade ${this.params.speed}s linear infinite;
        }
        
        ${tempStyles}
     
        ${facdAnimation}
    
    `;
    return styles;
  }
}

const loader = new LoaderDotCircularFadeClass();
const name = 'Loader Dot Circular Fade';

export const LoaderDotCircularFade: ILoader = {
  name,
  slug: 'loader_dot_circular_fade',
  date: new Date('2023/11/22'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};
