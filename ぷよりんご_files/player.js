class Player {
  // static centerPuyo;
  // static movablePuyo;
  // static puyoStatus;
  // static centerPuyoElement;
  // static movablePuyoElement;
  // static groundFrame;
  // static keyStatus;
  // static actionStartFrame;
  // static moveSource;
  // static moveDestination;
  // static rotateBeforeLeft;
  // static rotateAfterLeft;
  // static rotateFromRotation;
  static initialize() {
    // キーボードの入力を確認する
    this.keyStatus = {
      right: false,
      left: false,
      up: false,
      down: false,
      rotate: false,
      previousUp: 0,
      previousRotate: 0
    };
    // ブラウザのキーボードの入力を取得するイベントリスナを登録する
    document.addEventListener('keydown', (e) => {
      // キーボードが押された場合
      switch (e.code) {
        case "ArrowLeft": // 左向きキー
          this.keyStatus.left = true;
          e.preventDefault(); return false;
        case "ArrowUp": // 上向きキー
          this.keyStatus.up = true;
          e.preventDefault(); return false;
        case "ArrowRight": // 右向きキー
          this.keyStatus.right = true;
          e.preventDefault(); return false;
        case "ArrowDown": // 下向きキー
          this.keyStatus.down = true;
          e.preventDefault(); return false;
        case "KeyZ": // 左回転キー
          this.keyStatus.up = true;
          e.preventDefault(); return false;
        // case "KeyX": // 右回転キー
        //   this.keyStatus.rotate = true;
        //   e.preventDefault(); return false;
        }
    });
    document.addEventListener('keyup', (e) => {
      // キーボードが離された場合
      switch (e.code) {
        case "ArrowLeft": // 左向きキー
          this.keyStatus.left = false;
          e.preventDefault(); return false;
        case "ArrowUp": // 上向きキー
          this.keyStatus.up = false;
          this.keyStatus.previousUp = frame;
          e.preventDefault(); return false;
        case "ArrowRight": // 右向きキー
          this.keyStatus.right = false;
          e.preventDefault(); return false;
        case "ArrowDown": // 下向きキー
          this.keyStatus.down = false;
          e.preventDefault(); return false;
        case "KeyZ": // 左回転キー
          this.keyStatus.up = false;
          this.keyStatus.previousUp = frame;
          e.preventDefault(); return false;
        // case "KeyX": // 右回転キー
        //   this.keyStatus.rotate = false;
        //   this.keyStatus.previousRotate = frame;
        //   e.preventDefault(); return false;
      }
    });

    var leftImage = document.getElementById('left');
    leftImage.addEventListener('touchstart', (e) => {
      this.keyStatus.left = true;
      e.preventDefault(); return false;
    })
    leftImage.addEventListener('touchend', (e) => {
      this.keyStatus.left = false;
      e.preventDefault(); return false;
    })
    leftImage.addEventListener('mousedown', (e) => {
      this.keyStatus.left = true;
      e.preventDefault(); return false;
    })
    leftImage.addEventListener('mouseup', (e) => {
      this.keyStatus.left = false;
      e.preventDefault(); return false;
    })
    var downImage = document.getElementById('down');
    downImage.addEventListener('touchstart', (e) => {
      this.keyStatus.down = true;
      e.preventDefault(); return false;
    })
    downImage.addEventListener('touchend', (e) => {
      this.keyStatus.down = false;
      e.preventDefault(); return false;
    })
    downImage.addEventListener('mousedown', (e) => {
      this.keyStatus.down = true;
      e.preventDefault(); return false;
    })
    downImage.addEventListener('mouseup', (e) => {
      this.keyStatus.down = false;
      e.preventDefault(); return false;
    })
    var rightImage = document.getElementById('right');
    rightImage.addEventListener('touchstart', (e) => {
      this.keyStatus.right = true;
      e.preventDefault(); return false;
    })
    rightImage.addEventListener('touchend', (e) => {
      this.keyStatus.right = false;
      e.preventDefault(); return false;
    })
    rightImage.addEventListener('mousedown', (e) => {
      this.keyStatus.right = true;
      e.preventDefault(); return false;
    })
    rightImage.addEventListener('mouseup', (e) => {
      this.keyStatus.right = false;
      e.preventDefault(); return false;
    })
    var rotateImage = document.getElementById('rotate');
    rotateImage.addEventListener('touchstart', (e) => {
      this.keyStatus.up = true;
      e.preventDefault(); return false;
    })
    rotateImage.addEventListener('touchend', (e) => {
      this.keyStatus.up = false;
      this.keyStatus.previousUp = frame;
      e.preventDefault(); return false;
    })
    rotateImage.addEventListener('mousedown', (e) => {
      this.keyStatus.up = true;
      e.preventDefault(); return false;
    })
    rotateImage.addEventListener('mouseup', (e) => {
      this.keyStatus.up = false;
      this.keyStatus.previousUp = frame;
      e.preventDefault(); return false;
    })

    var rotateRightImage = document.getElementById('rotateRight');
    rotateRightImage.addEventListener('touchstart', (e) => {
      this.keyStatus.rotate = true;
      e.preventDefault(); return false;
    })
    rotateRightImage.addEventListener('touchend', (e) => {
      this.keyStatus.rotate = false;
      this.keyStatus.previousRotate = frame;
      console.log(this.keyStatus.previousRotate);
      e.preventDefault(); return false;
    })
    rotateRightImage.addEventListener('mousedown', (e) => {
      this.keyStatus.rotate = true;
      e.preventDefault(); return false;
    })
    rotateRightImage.addEventListener('mouseup', (e) => {
      this.keyStatus.rotate = false;
      this.keyStatus.previousRotate = frame;
      e.preventDefault(); return false;
    })

    // this.setNextPuyo();
  }
  static resetKeyStatus(){
    this.keyStatus.right = false;
    this.keyStatus.down = false;
    this.keyStatus.left = false;
    this.keyStatus.up = false;
    this.keyStatus.rotate = false;
  }
  //ぷよ設置確認
  static setNextPuyo(){
    const puyoColors = Math.max(1, Math.min(8, Config.puyoColors));
    this.nextCenterPuyo = Math.floor(Math.random() * puyoColors) + 1;
    this.nextMovablePuyo = Math.floor(Math.random() * puyoColors) + 1;
    // 新しいぷよ画像を作成する
    this.nextCenterPuyoElement = PuyoImage.getPuyo(this.nextCenterPuyo);
    this.nextMovablePuyoElement = PuyoImage.getPuyo(this.nextMovablePuyo);
    this.nextCenterPuyoElement.style.top = "70%";
    this.nextMovablePuyoElement.style.top = "30%";
    Stage.nextElement.appendChild(this.nextCenterPuyoElement);
    Stage.nextElement.appendChild(this.nextMovablePuyoElement);
  }
  static createNewPuyo() {
    // ぷよぷよが置けるかどうか、1番上の段の左から3つ目を確認する
    if (Stage.board[0][2]) {
      // 空白でない場合は新しいぷよを置けない
      return false;
    }
    this.centerPuyo = this.nextCenterPuyo;
    this.movablePuyo = this.nextMovablePuyo;
    this.centerPuyoElement = this.nextCenterPuyoElement;
    this.movablePuyoElement = this.nextMovablePuyoElement;
    Stage.stageElement.appendChild(this.centerPuyoElement);
    Stage.stageElement.appendChild(this.movablePuyoElement);
    
    this.setNextPuyo();

    // // ぷよの初期配置を定める
    this.puyoStatus = {
      x: 2, // 中心ぷよの位置: 左から2列目
      y: -1, // 画面上部ギリギリから出てくる
      left: 2,
      top: -1,
      dx: 0, // 動くぷよの相対位置: 動くぷよは上方向にある
      dy: -1,
      rotation: 90 // 動くぷよの角度は90度（上向き）
    };
    // 接地時間はゼロ
    this.groundFrame = 0;
    // ぷよを描画
    this.setPuyoPosition();
    return true;
  }
  static setPuyoPosition() {
    this.centerPuyoElement.style.left = this.puyoStatus.left * Config.puyoImgWidth + 'px';
    this.centerPuyoElement.style.top = this.puyoStatus.top * Config.puyoImgHeight + 'px';
    const x = (this.puyoStatus.left + Math.cos(this.puyoStatus.rotation * Math.PI / 180)) * Config.puyoImgWidth;
    const y = (this.puyoStatus.top - Math.sin(this.puyoStatus.rotation * Math.PI / 180)) * Config.puyoImgHeight;
    this.movablePuyoElement.style.left = x + 'px';
    this.movablePuyoElement.style.top = y + 'px';
  }
  static falling(isDownPressed) {
    // 現状の場所の下にブロックがあるかどうか確認する
    let isBlocked = false;
    let x = this.puyoStatus.x;
    let y = this.puyoStatus.y;
    let dx = this.puyoStatus.dx;
    let dy = this.puyoStatus.dy;

    if (this.groundFrame > 0) {
      this.groundFrame++;
      if (this.groundFrame > Config.playerGroundFrame) {
        this.groundFrame = 0;
        return true;
      }
      return;
    }

    isBlocked = !this.isEmpty(x, y, dx, dy);
    if (!isBlocked) {
      // 下にブロックがないなら自由落下してよい。プレイヤー操作中の自由落下処理をする
      this.puyoStatus.top += Config.playerFallingSpeed / 40;
      if (isDownPressed) {
        // 下キーが押されているならもっと加速する
        this.puyoStatus.top += Config.playerDownSpeed / 40;
      }
      if (this.puyoStatus.top > y) {
        // ブロックの境を超えたので、再チェックする
        // 下キーが押されていたら、得点を加算する
        if (isDownPressed) {
          // Score.addScore(1);
        }
        isBlocked = !this.isEmpty(x, y + 1, dx, dy);
        if (!isBlocked) {
          // 境を超えたが特に問題はなかった。次回も自由落下を続ける
            y += 1;
            this.puyoStatus.y = y;
            this.groundFrame = 0;
          return;
        } else {
          // 境を超えたらブロックにぶつかった。位置を調節して、接地を開始する
          this.puyoStatus.top = y;
          this.groundFrame = 1;
          return;
        }
      } else {
        // 自由落下で特に問題がなかった。次回も自由落下を続ける
        this.groundFrame = 0;
        return;
      }
    }
  }
  static isEmpty(x, y, dx, dy) {
    return (x >= 0 &&
      x < Config.stageCols &&
      x + dx >=0 &&
      x + dx < Config.stageCols &&
      y >= -2 &&
      y < Config.stageRows &&
      y + dy >= -2 &&
      y + dy < Config.stageRows &&
      (y < 0 || !Stage.board[y][x]) &&
      (y + dy < 0 || !Stage.board[y + dy][x + dx]))
  }
  static playing(frame) {
    // まず自由落下を確認する
    // 下キーが押されていた場合、それ込みで自由落下させる
    if (this.falling(this.keyStatus.down)) {
      // 落下が終わっていたら、ぷよを固定する
      this.setPuyoPosition();
      return 'fix';
    }
    this.setPuyoPosition();

    if (this.keyStatus.right || this.keyStatus.left) {
      const cx = (this.keyStatus.right) ? 1 : -1;
      if(this.isEmpty(this.puyoStatus.x + cx, this.puyoStatus.y, this.puyoStatus.dx, this.puyoStatus.dy)){
        this.actionStartFrame = frame;
        this.moveSource = this.puyoStatus.x * Config.puyoImgWidth;
        this.moveDestination = (this.puyoStatus.x + cx) * Config.puyoImgWidth;
        this.moveDistance = cx;
        this.puyoStatus.x += cx;
        this.puyoStatus.moving = true;
        return 'moving';
      }
    }
    
    if (this.keyStatus.up || this.keyStatus.rotate) {
      // 回転を確認する
      // 回せるかどうかは後で確認。まわすぞ
      const x = this.puyoStatus.x;
      const y = this.puyoStatus.y;
      const mx = x + this.puyoStatus.dx;
      const my = y + this.puyoStatus.dy;
      const rotation = this.puyoStatus.rotation;
      let canRotate = false;
      let canQuickTurn = false;
      let cx = 0;
      let cy = 0;
      if (this.keyStatus.up) {
        this.rotationAngle = 90;
        if (rotation === 0) {
          // [1,0] -> [0, -1]
          canRotate = true;
        } else if (rotation === 90) {
          // [0,-1] -> [-1, 0]
          if(this.isEmpty(x, y, - 1, 0)){
            canRotate = true;
          } else if (this.isEmpty(x + 1, y, - 1 , 0)){
            // 右に動かせるなら動かす
            cx = 1;
            canRotate = true
          } else if (this.isEmpty(x + 1, y - 1, - 1 , 0)){
            // 右上に動かせるなら動かす
            cx = 1;
            cy = -1;
            canRotate = true
          } else if ((frame - this.keyStatus.previousUp) < 5) {
            // 右もだめならクイックターン判定
            // [0,-1] -> [0, 1]
            canQuickTurn = true;
            this.rotationAngle = 180;
            if (!this.isEmpty(x, y, 0, 1)){
              cy = -1
            }
          }
        } else if (rotation === 180) {
          // [-1, 0] -> [0, 1]
          canRotate = true;
          if (!this.isEmpty(x, y, 0, 1) || !this.isEmpty(x, y + 1, -1, 0)) {
            cy = -1;
          }
        } else if (rotation === 270) {
          // [0, 1] -> [1, 0]
          if(this.isEmpty(x, y, 1, 0)){
            canRotate = true;
          } else if (this.isEmpty(x - 1, y, 1 , 0)){
            // 左に動かせるなら動かす
            cx = -1;
            canRotate = true
          } else if (this.isEmpty(x - 1, y - 1, 1 , 0)){
            // 左上に動かせるなら動かす
            cx = -1;
            cy = -1
            canRotate = true
          } else if ((frame - this.keyStatus.previousUp) < 5) {
            // 左もだめならクイックターン判定
            // [0,-1] -> [0, 1]
            canQuickTurn = true;
            this.rotationAngle = 180;
            if (!this.isEmpty(x, y, 0, 1)){
              cy = -1
            }
          }
        }  
      } else {
        this.rotationAngle = -90;
        if (rotation === 0) {
          // [1,0] -> [0, 1]
          canRotate = true;
          if (!this.isEmpty(x, y, 0, 1) || !this.isEmpty(x, y + 1, -1, 0)) {
            cy = -1;
          }
        } else if (rotation === 90) {
          // [0,-1] -> [1, 0]
          if(this.isEmpty(x, y, 1, 0)){
            canRotate = true;
          } else if (this.isEmpty(x - 1, y, 1 , 0)){
            // 左に動かせるなら動かす
            cx = -1;
            canRotate = true
          } else if (this.isEmpty(x - 1, y - 1, 1 , 0)){
            // 左上に動かせるなら動かす
            cx = -1;
            cy = -1
            canRotate = true
          } else if ((frame - this.keyStatus.previousUp) < 5) {
            // 左もだめならクイックターン判定
            // [0,-1] -> [0, 1]
            canQuickTurn = true;
            this.rotationAngle = 180;
            if (!this.isEmpty(x, y, 0, 1)){
              cy = -1
            }
          }
        } else if (rotation === 180) {
          // [-1, 0] -> [0, 1]
          canRotate = true;
        } else if (rotation === 270) {
          // [0, 1] -> [1, 0]
          if(this.isEmpty(x, y, - 1, 0)){
            canRotate = true;
          } else if (this.isEmpty(x + 1, y, - 1 , 0)){
            // 右に動かせるなら動かす
            cx = 1;
            canRotate = true
          } else if (this.isEmpty(x + 1, y - 1, - 1 , 0)){
            // 右上に動かせるなら動かす
            cx = 1;
            cy = -1;
            canRotate = true
          } else if ((frame - this.keyStatus.previousUp) < 5) {
            // 右もだめならクイックターン判定
            // [0,-1] -> [0, 1]
            canQuickTurn = true;
            this.rotationAngle = 180;
            if (!this.isEmpty(x, y, 0, 1)){
              cy = -1
            }
          }
        }  
      }

      // 回転させる
      if (canRotate || canQuickTurn) {
        // 上に移動する必要があるときは、一気にあげてしまう
        if (cy === -1) {
          this.puyoStatus.y -= 1;
          this.groundFrame = 0;
          this.puyoStatus.top = this.puyoStatus.y;
        }
        // 回すことが出来るので、回転後の情報をセットして回転状態にする
        this.actionStartFrame = frame;
        this.rotateBeforeLeft = x * Config.puyoImgHeight;
        this.rotateAfterLeft = (x + cx) * Config.puyoImgHeight;
        this.rotateLeftDistance = cx;
        this.rotateFromRotation = this.puyoStatus.rotation;
        // 次の状態を先に設定しておく
        this.puyoStatus.x += cx;
        const distRotation = (this.puyoStatus.rotation + this.rotationAngle + 360) % 360;
        const dCombi = [[1, 0], [0, -1], [-1, 0], [0, 1]][distRotation / 90];
        this.puyoStatus.dx = dCombi[0];
        this.puyoStatus.dy = dCombi[1];
        this.puyoStatus.rotating = true;
        return 'rotating'
      }
    }
    return 'playing';
  }
  static moving(frame) {
    // 移動中も自然落下はさせる
    this.falling();
    if (!this.puyoStatus.moving){
      return false;
    }
    const ratio = Math.min(1, (frame - this.actionStartFrame) / Config.playerMoveFrame);
    this.puyoStatus.left += this.moveDistance / Config.playerMoveFrame;
    this.setPuyoPosition();
    if (ratio === 1) {
      this.puyoStatus.left = this.puyoStatus.x;
      this.setPuyoPosition();
      this.puyoStatus.moving = false;
      return false;
    }
    return true;
  }
  static rotating(frame) {
    // 回転中も自然落下はさせる
    this.falling();
    const ratio = Math.min(1, (frame - this.actionStartFrame) / Config.playerRotateFrame);
    if (ratio === 1) {
      this.puyoStatus.left = this.puyoStatus.x;
      this.puyoStatus.rotation = (this.rotateFromRotation + this.rotationAngle + 360) % 360;
      this.setPuyoPosition();
      return false;
    }
    this.puyoStatus.left += this.rotateLeftDistance / Config.playerRotateFrame;
    this.puyoStatus.rotation = (this.rotateFromRotation + ratio * this.rotationAngle + 360) % 360;
    this.setPuyoPosition();
    return true;
  }
  static fix() {
    // 現在のぷよをステージ上に配置する
    const x = this.puyoStatus.x;
    const y = this.puyoStatus.y;
    const dx = this.puyoStatus.dx;
    const dy = this.puyoStatus.dy;
    if (y >= 0) {
      // 画面外のぷよは消してしまう
      Stage.setPuyo(x, y, this.centerPuyo);
      Stage.puyoCount++;
    }
    if (y + dy >= 0) {
      // 画面外のぷよは消してしまう
      Stage.setPuyo(x + dx, y + dy, this.movablePuyo);
      Stage.puyoCount++;
    }
    // 操作用に作成したぷよ画像を消す
    const centerPuyoElement = this.centerPuyoElement;
    const movablePuyoElement = this.movablePuyoElement;
    setTimeout(() => {
      Stage.stageElement.removeChild(centerPuyoElement);
      Stage.stageElement.removeChild(movablePuyoElement);        
    }, 1);
    this.centerPuyoElement = null;
    this.movablePuyoElement = null;
  }
  static accelerate(frame) {
    if(frame % 60 == 0){
      if (Config.difficulty == "easy") {
        Config.playerFallingSpeed = Config.initialPlayerFallingSpeed;
      } else if (Config.difficulty == "normal") {
        Config.playerFallingSpeed = Config.initialPlayerFallingSpeed + Math.floor(frame / 1800) * 0.1 + Math.floor(Math.log(Score.score / 25000 + 1)  / Math.log(2)) * 0.2;
      } else if (Config.difficulty == "hard"){
        Config.playerFallingSpeed = Config.initialPlayerFallingSpeed + Math.floor(frame / 1200) * 0.1 + Math.floor(Math.log(Score.score / 25000 + 1)  / Math.log(2)) * 0.2;
      }
    }
  }
}