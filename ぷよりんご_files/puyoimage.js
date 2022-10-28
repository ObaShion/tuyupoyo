class PuyoImage {
  static initialize() {
    this.puyoImages = [];
  }
  static setPuyoimage() {
    for (let i = 0; i < 8; i++) {
      let image;
      if (Config.color == 'blue') {
        image = document.getElementById(`puyo_b_${i + 1}`);
      } else {
        image = document.getElementById(`puyo_${i + 1}`);
      }
      image.removeAttribute('id');
      image.width = Config.puyoImgWidth;
      image.height = Config.puyoImgHeight;
      image.style.position = 'absolute';
      this.puyoImages[i] = image;
    }
  }
  static getPuyo(index) {
    const image = this.puyoImages[index - 1].cloneNode(true);
    return image;
  }
}