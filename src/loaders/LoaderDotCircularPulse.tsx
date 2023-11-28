import { Configurator } from '../UI/Configurator';
import { generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderDotCircularPulseClass extends LoaderClass {
  public params: {
    autoLoaderSize: boolean;
    loaderWidth: number;
    loaderHeight: number;
    loaderVersion: string;
    loaderRadius: number;
    dotNum: number;
    dotSize: number;
    dotScale: number;
    dotColor: string;
    speed: number;
    stackRate: number;
  };

  constructor() {
    super();
    this.params = {
      autoLoaderSize: true,
      loaderWidth: 0,
      loaderHeight: 0,
      loaderVersion: generateShortID(),
      loaderRadius: 30,
      dotNum: 12,
      dotSize: 8,
      dotScale: 1.5,
      dotColor: '#ffffff',
      speed: 1.2,
      stackRate: 9 / 25,
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
        name: 'Speed',
        type: 'number',
        group: 'Speed',
        min: 0,
        max: 2,
        step: 0.05,
        unit: 's',
      },
      stackRate: {
        name: 'Stack rate',
        type: 'number',
        group: 'Speed',
        min: 0.01,
        max: 1,
        step: 0.01,
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
              animation-delay: ${(((-this.params.speed * this.params.stackRate) / this.params.dotNum) * i).toFixed(2)}s;
            }
            .loadership_${this.params.loaderVersion} div:nth-child(${i + 1}):after {
              top: ${Math.round(this.params.loaderRadius * Math.cos((2 * Math.PI * i) / this.params.dotNum) + this.PerfectHeight / 2 - this.params.dotSize / 2)}px;
              left: ${Math.round(this.params.loaderRadius * Math.sin((2 * Math.PI * i) / this.params.dotNum) + this.PerfectWidth / 2 - this.params.dotSize / 2)}px;
            }
            
            `
      )
      .join('\n');

    const styles = `
        .loadership_${this.params.loaderVersion} {
          display: flex;
          position: relative;
          width: ${this.params.loaderWidth}px;
          height: ${this.params.loaderHeight}px;
        }

        .loadership_${this.params.loaderVersion} div {
          animation: loadership_${this.params.loaderVersion}_roller ${this.params.speed}s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          transform-origin: ${this.params.loaderWidth / 2}px ${this.params.loaderWidth / 2}px;
        }
        .loadership_${this.params.loaderVersion} div:after {
          content: " ";
          display: block;
          position: absolute;
          width: ${this.params.dotSize}px;
          height: ${this.params.dotSize}px;
          border-radius: 50%;
          background: ${this.params.dotColor};
        }
        
        ${tempStyles}
     
        @keyframes loadership_${this.params.loaderVersion}_roller {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
    
    `;
    return styles;
  }
}

const loader = new LoaderDotCircularPulseClass();
const name = 'Loader Dot Circular Pulse';

export const LoaderDotCircularPulse: ILoader = {
  name,
  slug: 'loader_dot_circular_pulse',
  date: new Date('2023/11/16'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};
