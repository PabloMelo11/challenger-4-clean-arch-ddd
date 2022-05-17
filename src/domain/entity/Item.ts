import Dimension from './Dimension';

export default class Item {
  constructor(
    readonly idItem: number,
    readonly description: string,
    readonly price: number,
    readonly dimension?: Dimension,
    readonly weight?: number
  ) {
    if (!this.isValidWeight()) throw new Error('Weight of item invalid');
  }

  getVolume() {
    if (this.dimension) {
      return this.dimension.getVolume();
    } else {
      return 0;
    }
  }

  getDensity() {
    if (this.dimension && this.weight) {
      return this.weight / this.dimension.getVolume();
    } else {
      return 0;
    }
  }

  isValidWeight() {
    if (this?.weight && this.weight < 0) return false;
    return true;
  }
}
