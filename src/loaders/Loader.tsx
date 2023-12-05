import { generateShortID } from '../utils';

export abstract class LoaderClass {
  public params: IConfiguratorParam;
  public controls: IConfiguratorControl;

  constructor() {
    this.params = {
      paddingX: 0,
      paddingY: 0,
      loaderVersion: generateShortID(),
    };
    this.controls = {
      paddingX: {
        name: 'Loader padding X',
        type: 'number',
        group: 'Loader',
        unit: 'px',
        min: 0,
        max: 100,
      },
      paddingY: {
        name: 'Loader padding Y',
        type: 'number',
        group: 'Loader',
        unit: 'px',
        min: 0,
        max: 100,
      },
    };
  }
  public abstract get width(): number;
  public abstract get height(): number;
  public abstract get HTML(): JSX.Element;
  public abstract get CSS(): string;
  public updateVersion() {
    this.params.loaderVersion = generateShortID();
  }
}
