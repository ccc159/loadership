import { Configurator } from '../UI/Configurator';
import { generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderDotLinearBounceClass extends LoaderClass {
  public params: {
    paddingX: number;
    paddingY: number;
    loaderVersion: string;
    dotNum: number;
    dotSize: number;
    dotDistance: number;
    dotColor: string;
    bounceHeight: number;
    speed: number;
    bezier: string;
    pause: number;
  };

  constructor() {
    super();
    this.params = {
      paddingX: 0,
      paddingY: 0,
      loaderVersion: generateShortID(),
      dotNum: 4,
      dotSize: 13,
      dotDistance: 20,
      dotColor: '#ffffff',
      bounceHeight: 40,
      speed: 1.6,
      bezier: 'linear',
      pause: 0.8,
    };
    this.controls = {
      ...this.controls,
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
      dotDistance: {
        name: 'Dot distance',
        type: 'number',
        group: 'Dot',
        unit: 'px',
        affectLoaderSize: true,
      },
      dotColor: {
        name: 'Dot color',
        type: 'color',
        group: 'Dot',
      },
      bounceHeight: {
        name: 'Bounce height',
        type: 'number',
        group: 'Dot',
        unit: 'px',
      },
      speed: {
        name: 'Speed',
        type: 'number',
        group: 'Speed',
        min: 0,
        max: 10,
        step: 0.01,
        unit: 's',
      },
      bezier: {
        name: 'Bezier',
        type: 'bezier',
        group: 'Animation',
      },
      pause: {
        name: 'Pause time',
        type: 'number',
        group: 'Speed',
        min: 0,
        max: 5,
        step: 0.01,
      },
    };
  }

  public override get width(): number {
    return this.params.dotDistance * (this.params.dotNum - 1) + this.params.dotSize + this.params.paddingX * 2;
  }

  public override get height(): number {
    return this.params.dotSize + this.params.bounceHeight + this.params.paddingY * 2;
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
              animation-delay: ${((this.params.speed / this.params.dotNum) * i).toFixed(2)}s;
              left: ${this.params.paddingX + i * this.params.dotDistance}px;
          }`
      )
      .join('\n');

    const actualAnimationPercent = this.params.speed / (this.params.speed + this.params.pause);

    const styles = `
        .loadership_${this.params.loaderVersion} {
          display: flex;
          position: relative;
          width: ${this.width}px;
          height: ${this.height}px;
        }

        .loadership_${this.params.loaderVersion} div {
          position: absolute;
          top: ${this.params.paddingY + this.params.bounceHeight}px;
          width: ${this.params.dotSize}px;
          height: ${this.params.dotSize}px;
          border-radius: 50%;
          background: ${this.params.dotColor};
          animation: loadership_${this.params.loaderVersion}_bounce ${(this.params.speed + this.params.pause).toFixed(2)}s infinite;
          animation-timing-function: ${this.params.bezier};
        }

        ${tempStyles}


        @keyframes loadership_${this.params.loaderVersion}_bounce {
          0%, ${20 * actualAnimationPercent}%, ${50 * actualAnimationPercent}%, ${80 * actualAnimationPercent}%, ${100 * actualAnimationPercent}%, 100% {
            transform: translateY(0);
          }
        
          ${40 * actualAnimationPercent}% {
            transform: translateY(-${this.params.bounceHeight}px);
          }
        
          ${60 * actualAnimationPercent}% {
            transform: translateY(-${0.4 * this.params.bounceHeight}px);
          }
        }
    `;
    return styles;
  }
}

const loader = new LoaderDotLinearBounceClass();
const name = 'Loader Dot Linear Bounce';

export const LoaderDotLinearBounce: ILoader = {
  name,
  slug: 'loader_dot_linear_bounce',
  date: new Date('2023/11/22'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};
