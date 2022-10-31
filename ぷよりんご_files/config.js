// 設定を記載しておくクラス
class Config {
  static initialize() {
    Config.puyoImgHeight = document.getElementById("stage").offsetHeight / Config.stageRows;
    Config.puyoImgWidth = document.getElementById("stage").offsetWidth / Config.stageCols;
  }
}
Config.hashtags = "tuyukubo";
Config.stageRows = 14;
Config.stageCols = 6;
Config.freeFallingSpeed = 5000000000000; // 自由落下のスピード
Config.erasePuyoCount = 4; // 何個以上揃ったら消えるか
Config.eraseAnimationDuration = 30; // 何フレームでぷよを消すか
Config.puyoColors = 4; // 何色のぷよを使うか
Config.difficulty = null;
Config.color = null;
Config.initialPlayerFallingSpeed = 5000000000000; // プレイ中の自然落下のスピード
Config.playerFallingSpeed = 0.9; // プレイ中の自然落下のスピード
Config.playerDownSpeed = 10; // プレイ中の下キー押下時の落下スピード
Config.playerGroundFrame = 20; // 何フレーム接地したらぷよを固定するか
Config.playerMoveFrame = 10; // 左右移動に消費するフレーム数
Config.playerRotateFrame = 10; // 回転に消費するフレーム数
Config.zenkeshiDuration = 150; // 全消し時のアニメーションミリセカンド
Config.gameOverFrame = 3000; // ゲームオーバー演出のサイクルフレーム
