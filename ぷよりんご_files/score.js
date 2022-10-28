class Score {
  // static fontTemplateList = [];
  // static fontLength;
  // static score = 0;
  static initialize() {
    this.score = 0;
    this.maxRensa = 0;
    this.showScore();
  }
  static showScore() {
    if (this.score / 1000000 < 1){
      Stage.writeNum(Math.floor((this.score / 1000).toPrecision(3) * 10) / 10, Stage.scoreNumElement);
    } else {
      Stage.writeNum(Math.round(this.score / 1000), Stage.scoreNumElement);
    }
    Stage.showUnit("kg");
    Stage.writeNum(this.maxRensa, Stage.maxRensaNumElement);
  }
  static calculateScore(rensa, piece, color) {
    rensa = Math.min(rensa, Score.rensaBonus.length - 1);
    piece = Math.min(piece, Score.pieceBonus.length - 1);
    color = Math.min(color, Score.colorBonus.length - 1);
    let scale = Score.rensaBonus[rensa] + Score.pieceBonus[piece] * 2 + Score.colorBonus[color] * 2;
    if (scale === 0) {
      scale = 1;
    }
    this.maxRensa = Math.max(this.maxRensa, rensa);
    this.addScore(scale * piece * 50);
  }
  static addScore(score) {
    this.score += score;
    this.showScore();
  }
  static getScoreText() {
    if (this.score / 1000 < 1){
      return this.score + "g";
    } else if (this.score / 100000 < 1){
      return Math.floor((this.score / 1000).toPrecision(3) * 10) / 10 + "kg";
    } else {
      return Math.floor(this.score / 1000) + "kg";
    }
  }
};
Score.rensaBonus = [0, 5, 15, 30, 50, 75, 100, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480, 512, 544, 576, 608, 640, 672];
Score.pieceBonus = [0, 0, 0, 0, 0, 1, 3, 4, 5, 6, 7, 10, 10];
Score.colorBonus = [0, 0, 3, 6, 12, 24, 48, 96, 192];