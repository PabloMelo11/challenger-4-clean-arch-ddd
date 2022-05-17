export default class Dimension {
  constructor(
    readonly width: number,
    readonly height: number,
    readonly length: number
  ) {
    if (!this.isValidDimensions()) throw new Error('Dimension invalid');
  }

  getVolume() {
    return (this.width / 100) * (this.height / 100) * (this.length / 100);
  }

  isValidDimensions() {
    if (this.width < 0 || this.height < 0 || this.length < 0) return false;
    return true;
  }
}
