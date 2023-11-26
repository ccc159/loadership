import { generateShortID } from '../utils';

export abstract class LoaderClass {
  public params: IConfiguratorParam;
  public controls: IConfiguratorControl;

  constructor() {
    this.params = {
      autoLoaderSize: true,
      loaderWidth: 0,
      loaderHeight: 0,
      loaderVersion: generateShortID(),
    };
    this.controls = {
      autoLoaderSize: {
        name: 'Auto size',
        type: 'boolean',
        group: 'Loader',
        affectLoaderSize: true,
      },
      loaderWidth: {
        name: 'Loader width',
        type: 'number',
        group: 'Loader',
        unit: 'px',
      },
      loaderHeight: {
        name: 'Loader height',
        type: 'number',
        group: 'Loader',
        unit: 'px',
      },
    };
  }
  public abstract get PerfectWidth(): number;
  public abstract get PerfectHeight(): number;
  public abstract get HTML(): JSX.Element;
  public abstract get CSS(): string;
  public updateVersion() {
    this.params.loaderVersion = generateShortID();
  }
  public useAutoSize() {
    this.params.loaderWidth = this.PerfectWidth;
    this.params.loaderHeight = this.PerfectHeight;
  }
}
