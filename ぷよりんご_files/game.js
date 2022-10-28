// 起動されたときに呼ばれる関数を登録する
window.addEventListener("load", () => {
  // まずステージを整える
  const contentsElement = document.getElementById("contents");
  if(window.innerWidth * 600 / 350 > window.innerHeight){
    contentsElement.style.width = window.innerHeight * 350 / 600 + 'px';
    contentsElement.style.height = window.innerHeight + 'px';
  } else {
    contentsElement.style.width = window.innerWidth + 'px';
    contentsElement.style.height = window.innerWidth * 600 / 350 + 'px';
  }
const checkRendered = () => {
    if (document.getElementById("stage").offsetWidth == 0){
      setTimeout(checkRendered,100);
    } else {
      initialize();
      // ゲームを開始する
      loop();
    }
  }
  checkRendered();
});
let mode; // ゲームの現在の状況
let frame; // ゲームの現在フレーム（1/60秒ごとに1追加される）
let combinationCount = 0; // 何連鎖かどうか
function initialize() {
  Config.initialize();
  // 画像を準備する
  PuyoImage.initialize();
  // ステージを準備する
  Stage.initialize();
  // ユーザー操作の準備をする
  Player.initialize();
  // シーンを初期状態にセットする
  Score.initialize();
  // スコア表示の準備をする
  mode = 'start';
  // フレームを初期化する
  frame = 0;
}
function loop() {
  switch (mode) {
    case 'selectColor':
      if(Config.color != null) {
        Stage.hideColorSelector();
        Stage.showSelector();
        PuyoImage.setPuyoimage();
        Player.setNextPuyo();
        mode = 'selectDifficulty';
      }
      break;
    case 'selectDifficulty':
      if(Config.difficulty != null){
        Stage.hideSelector();
        Stage.showDifficulty();
        frame = 0;
        mode = 'checkFall'
      }
      // 最初は、もしかしたら空中にあるかもしれないぷよを自由落下させるところからスタート
      break;
    case 'start':
      // 最初は、もしかしたら空中にあるかもしれないぷよを自由落下させるところからスタート
      Stage.showColorSelector();
      mode = 'selectColor'
      break;
    case 'checkFall':
      // 落ちるかどうか判定する
      if (Stage.checkFall()) {
        mode = 'fall'
      } else {
        // 落ちないならば、ぷよを消せるかどうか判定する
        mode = 'checkErase';
      }
      break;
    case 'fall':
      if (!Stage.fall()) {
        // すべて落ちきったら、ぷよを消せるかどうか判定する
        mode = 'checkErase';
      }
      break;
    case 'checkErase':
      // 消せるかどうか判定する
      const eraseInfo = Stage.checkErase(frame);
      if (eraseInfo) {
        mode = 'erasing';
        combinationCount++;
        // 得点を計算する
        Score.calculateScore(combinationCount, eraseInfo.piece, eraseInfo.color);
        // Stage.hideZenkeshi();
      } else {
        if (Stage.puyoCount === 0 && combinationCount > 0) {
          // 全消しの処理をする
          // Stage.showZenkeshi();
          // Score.addScore(3600);
        }
        combinationCount = 0;
        // 消せなかったら、新しいぷよを登場させる
        mode = 'newPuyo'
      }
      break;
    case 'erasing':
      if (!Stage.erasing(frame)) {
        // 消し終わったら、再度落ちるかどうか判定する
        mode = 'checkFall';
      }
      break;
    case 'newPuyo':
      if (!Player.createNewPuyo()) {
        // 新しい操作用ぷよを作成出来なかったら、ゲームオーバー
        mode = 'gameOver';
      } else {
        // プレイヤーが操作可能
        mode = 'playing';
      }
      break;
    case 'playing':
      // プレイヤーが操作する
      const action = Player.playing(frame);
      mode = action; // 'playing' 'moving' 'rotating' 'fix' のどれかが帰ってくる
      break;
    case 'moving':
      if (!Player.moving(frame)) {
        // 移動が終わったので操作可能にする
        mode = 'playing';
      }
      break;
    case 'rotating':
      if (!Player.rotating(frame)) {
        // 回転が終わったので操作可能にする
        mode = 'playing';
      }
      break;
    case 'fix':
      // 現在の位置でぷよを固定する
      Player.fix();
      // 固定したら、まず自由落下を確認する
      mode = 'checkFall'
      break;
    case 'gameOver':
      // ばたんきゅーの準備をする
      // PuyoImage.prepareBatankyu(frame);
      Stage.showBatankyu();
      mode = 'batankyu';
      break;
    case 'batankyu':
      // PuyoImage.batankyu(frame);
      // Player.batankyu();
      break;
  }
  frame++;
  Player.accelerate(frame);
  // requestAnimationFrame(loop);
  setTimeout(() => {
    requestAnimationFrame(loop);
  }, 1000/63);
}