import { Configurator } from '../UI/Configurator';
import { generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderDotLinearMotionBlurClass extends LoaderClass {
  public params: {
    autoLoaderSize: boolean;
    loaderWidth: number;
    loaderHeight: number;
    loaderVersion: string;
    dotSize: number;
    dotDistance: number;
    trailOpacity: number;
    trailScale: number;
    blurInterval: number;
    dotColor: string;
    speed: number;
    dotNum: number;
  };

  constructor() {
    super();
    this.params = {
      autoLoaderSize: true,
      loaderWidth: 0,
      loaderHeight: 0,
      loaderVersion: generateShortID(),
      dotSize: 16,
      dotDistance: 80,
      trailOpacity: 0.3,
      trailScale: 0.25,
      blurInterval: 12,
      dotColor: '#ffffff',
      speed: 1.2,
      dotNum: 20,
    };
    this.controls = {
      ...this.controls,
      dotSize: {
        name: 'Dot size',
        type: 'number',
        group: 'Dot',
        unit: 'px',
        affectLoaderSize: true,
      },
      dotDistance: {
        name: 'Travel distance',
        type: 'number',
        group: 'Dot',
        unit: 'px',
        affectLoaderSize: true,
      },
      trailOpacity: {
        name: 'Trail opacity',
        type: 'number',
        group: 'Dot',
        min: 0,
        max: 1,
        step: 0.01,
      },
      trailScale: {
        name: 'Trail scale',
        type: 'number',
        group: 'Dot',
        min: 0,
        max: 1,
        step: 0.01,
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
      blurInterval: {
        name: 'Blur interval',
        type: 'number',
        group: 'Speed',
        unit: 'ms',
        min: 0,
        max: 50,
        step: 1,
      },
    };
  }

  public override get PerfectWidth(): number {
    return this.params.dotDistance + this.params.dotSize;
  }

  public override get PerfectHeight(): number {
    return this.params.dotSize;
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
    const tempStyles = Array(this.params.dotNum - 1)
      .fill(0)
      .map(
        (_, i) =>
          `.loadership_${this.params.loaderVersion} div:nth-child(${i + 2}) {
            animation-delay: ${(i + 1) * this.params.blurInterval}ms;
            opacity: ${(this.params.trailOpacity - (this.params.trailOpacity / this.params.dotNum) * i).toFixed(2)};
            width: ${this.params.dotSize * (1 - (i * this.params.trailScale) / this.params.dotNum)}px;
            height: ${this.params.dotSize * (1 - (i * this.params.trailScale) / this.params.dotNum)}px;
            top: ${((this.params.loaderHeight - this.PerfectHeight) / 2 + (this.params.dotSize - this.params.dotSize * (1 - (i * this.params.trailScale) / this.params.dotNum)) / 2).toFixed(2)}px;
          }`
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
          position: absolute;
          top: ${(this.params.loaderHeight - this.PerfectHeight) / 2}px;
          width: ${this.params.dotSize}px;
          height: ${this.params.dotSize}px;
          border-radius: 50%;
          background: ${this.params.dotColor};
          animation: loadership_${this.params.loaderVersion}_move alternate ${this.params.speed}s infinite;
          animation-timing-function: cubic-bezier(.54,-0.13,.53,1.07);
        }

        ${tempStyles}

        
        
        @keyframes loadership_${this.params.loaderVersion}_move {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(${this.params.dotDistance}px);
          }
        }
    `;
    return styles;
  }
}

const loader = new LoaderDotLinearMotionBlurClass();
const name = 'Loader Dot Linear Motion Blur';

export const LoaderDotLinearMotionBlur: ILoader = {
  name,
  slug: 'loader_dot_linear_motion_blur',
  date: new Date('2023/11/22'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};
