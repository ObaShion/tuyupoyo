class Stage {
  // static stageElement;
  // static scoreElement;
  // static zenkeshiImage;
  // static board;
  // static puyoCount;
  // static fallingPuyoList = [];
  // static eraseStartFrame;
  // static erasingPuyoInfoList = [];
  static initialize() {
    // HTML からステージの元となる要素を取得し、大きさを設定する
    const stageElement = document.getElementById("stage");
    this.stageElement = stageElement;

    this.scoreNumElement = document.getElementById("scoreNum");
    this.scoreUnitElement = document.getElementById("scoreUnit");
    this.nextElement = document.getElementById("nextPuyo");
    this.difficultyElement = document.getElementById("difficulty");
    this.maxRensaNumElement = document.getElementById("maxRensaNum");

    this.coverElement = document.getElementById("cover");
    this.coverAllElement = document.getElementById("coverAll");

    this.easySelector = document.getElementById('easySelector');
    this.normalSelector = document.getElementById('normalSelector');
    this.hardSelector = document.getElementById('hardSelector');

    this.easySelector.addEventListener('click', (e) => {
      Config.puyoColors = 4;
      Config.difficulty = 'easy';
      e.preventDefault(); return false;
    })

    this.normalSelector.addEventListener('click', (e) => {
      Config.puyoColors = 5;
      Config.difficulty = 'normal';
      e.preventDefault(); return false;
    })

    this.hardSelector.addEventListener('click', (e) => {
      Config.puyoColors = 8;
      Config.difficulty = 'hard';
      Config.initialPlayerFallingSpeed = 1.5;
      e.preventDefault(); return false;
    })

    this.coverColorElement = document.getElementById("coverColor");

    this.redSelector = document.getElementById('redSelector');
    this.blueSelector = document.getElementById('blueSelector');

    this.redSelector.addEventListener('click', (e) => {
      Config.color = "red";
      e.preventDefault(); return false;
    })

    this.blueSelector.addEventListener('click', (e) => {
      Config.color = "blue";
      e.preventDefault(); return false;
    })

    this.gameoverElement = document.getElementById('gameover');
    this.restartElement = document.getElementById('restart');
    this.restartElement.addEventListener('click', (e) => {
      location.reload() 
    });

    document.getElementById("contents").oncontextmenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    this.fontTemplateList = {};
    for (let i = 0; i < 10; i++) {
      const fontImage = document.getElementById(`num_${i}`);
      this.fontTemplateList[i.toString()] = fontImage;
    }
    this.fontTemplateList["."] = document.getElementById("dot");
    this.tweetElement = document.getElementById('tweet');

    // メモリを準備する
    this.board = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    let puyoCount = 0;
    for (let y = 0; y < Config.stageRows; y++) {
      const line = this.board[y] || (this.board[y] = []);
      for (let x = 0; x < Config.stageCols; x++) {
        const puyo = line[x];
        if (puyo >= 1 && puyo <= 5) {
          // line[x] = {puyo: puyo, element: this.setPuyo(x, y, puyo)};
          this.setPuyo(x, y, puyo);
          puyoCount++;
        } else {
          line[x] = null;
        }
      }
    }
    this.puyoCount = puyoCount;
  }
  // 画面とメモリ両方に puyo をセットする
  static setPuyo(x, y, puyo) {
    // 画像を作成し配置する
    const puyoImage = PuyoImage.getPuyo(puyo);
    puyoImage.style.left = x * Config.puyoImgWidth + "px";
    puyoImage.style.top = y * Config.puyoImgHeight + "px";
    this.stageElement.appendChild(puyoImage);
    // メモリにセットする
    this.board[y][x] = {
      puyo: puyo,
      element: puyoImage
    }
  }
  // 自由落下をチェックする
  static checkFall() {
    this.fallingPuyoList.length = 0;
    let isFalling = false;
    // 下の行から上の行を見ていく
    for (let y = Config.stageRows - 2; y >= 0; y--) {
      const line = this.board[y];
      for (let x = 0; x < line.length; x++) {
        if (!this.board[y][x]) {
          // このマスにぷよがなければ次
          continue;
        }
        if (!this.board[y + 1][x]) {
          // このぷよは落ちるので、取り除く
          let cell = this.board[y][x];
          this.board[y][x] = null;
          let dst = y;
          while (dst + 1 < Config.stageRows && this.board[dst + 1][x] == null) {
            dst++;
          }
          // 最終目的地に置く
          this.board[dst][x] = cell;
          // 落ちるリストに入れる
          this.fallingPuyoList.push({
            element: cell.element,
            position: y * Config.puyoImgHeight,
            destination: dst * Config.puyoImgHeight,
            falling: true
          });
          // 落ちるものがあったことを記録しておく
          isFalling = true;
        }
      }
    }
    return isFalling;
  }
  // 自由落下させる
  static fall() {
    let isFalling = false;
    for (const fallingPuyo of this.fallingPuyoList) {
      if (!fallingPuyo.falling) {
        // すでに自由落下が終わっている
        continue;
      }
      let position = fallingPuyo.position;
      position += Config.freeFallingSpeed;
      if (position >= fallingPuyo.destination) {
        // 自由落下終了
        position = fallingPuyo.destination;
        fallingPuyo.falling = false;
      } else {
        // まだ落下しているぷよがあることを記録する
        isFalling = true;
      }
      // 新しい位置を保存する
      fallingPuyo.position = position;
      // ぷよを動かす
      fallingPuyo.element.style.top = position + 'px';
    }
    return isFalling;
  }
  // 消せるかどうか判定する
  static checkErase(startFrame) {
    this.eraseStartFrame = startFrame;
    this.erasingPuyoInfoList.length = 0;
    // 何色のぷよを消したかを記録する
    const erasedPuyoColor = {};
    // 隣接ぷよを確認する関数内関数を作成
    const sequencePuyoInfoList = [];
    const existingPuyoInfoList = [];
    const checkSequentialPuyo = (x, y) => {
      // ぷよがあるか確認する
      const orig = this.board[y][x];
      if (!orig) {
        // ないなら何もしない
        return;
      }
      // あるなら一旦退避して、メモリ上から消す
      const puyo = this.board[y][x].puyo;
      sequencePuyoInfoList.push({
        x: x,
        y: y,
        cell: this.board[y][x]
      });
      this.board[y][x] = null;
      // 四方向の周囲ぷよを確認する
      const direction = [[0, 1], [1, 0], [0, -1], [-1, 0]];
      for (let i = 0; i < direction.length; i++) {
        const dx = x + direction[i][0];
        const dy = y + direction[i][1];
        if (dx < 0 || dy < 0 || dx >= Config.stageCols || dy >= Config.stageRows) {
          // ステージの外にはみ出た
          continue;
        }
        const cell = this.board[dy][dx];
        if (!cell || cell.puyo !== puyo) {
          // ぷよの色が違う
          continue;
        }
        // そのぷよのまわりのぷよも消せるか確認する
        checkSequentialPuyo(dx, dy);
      };
    };

    // 実際に削除できるかの確認を行う
    for (let y = 0; y < Config.stageRows; y++) {
      for (let x = 0; x < Config.stageCols; x++) {
        sequencePuyoInfoList.length = 0;
        const puyoColor = this.board[y][x] && this.board[y][x].puyo;
        checkSequentialPuyo(x, y);
        if (sequencePuyoInfoList.length == 0 || sequencePuyoInfoList.length < Config.erasePuyoCount) {
          // 連続して並んでいる数が足りなかったので消さない
          if (sequencePuyoInfoList.length) {
            // 退避していたぷよを消さないリストに追加する
            existingPuyoInfoList.push(...sequencePuyoInfoList);
          }
        } else {
          // これらは消して良いので消すリストに追加する
          this.erasingPuyoInfoList.push(...sequencePuyoInfoList);
          erasedPuyoColor[puyoColor] = true;
        }
      }
    }
    this.puyoCount -= this.erasingPuyoInfoList.length;
    // 消さないリストに入っていたぷよをメモリに復帰させる
    for (const info of existingPuyoInfoList) {
      this.board[info.y][info.x] = info.cell;
    }
    if (this.erasingPuyoInfoList.length) {
      // もし消せるならば、消えるぷよの個数と色の情報をまとめて返す
      return {
        piece: this.erasingPuyoInfoList.length,
        color: Object.keys(erasedPuyoColor).length
      };
    }
    return null;
  }
  // 消すアニメーションをする
  static erasing(frame) {
    const elapsedFrame = frame - this.eraseStartFrame;
    const ratio = elapsedFrame / Config.eraseAnimationDuration;
    if (ratio > 1) {
      // アニメーションを終了する
      for (const info of this.erasingPuyoInfoList) {
        var element = info.cell.element;
        this.stageElement.removeChild(element);
      }
      return false;
    } else if (ratio > 0.75) {
      for (const info of this.erasingPuyoInfoList) {
        var element = info.cell.element;
        element.style.display = 'block';
      }
      return true;
    } else if (ratio > 0.50) {
      for (const info of this.erasingPuyoInfoList) {
        var element = info.cell.element;
        element.style.display = 'none';
      }
      return true;
    } else if (ratio > 0.25) {
      for (const info of this.erasingPuyoInfoList) {
        var element = info.cell.element;
        element.style.display = 'block';
      }
      return true;
    } else {
      for (const info of this.erasingPuyoInfoList) {
        var element = info.cell.element;
        element.style.display = 'none';
      }
      return true;
    }
  }
  static showSelector() {
    this.easySelector.style.display = "block";
    this.normalSelector.style.display = "block";
    this.hardSelector.style.display = "block";
    this.coverElement.style.display = "block";
  }
  static hideSelector() {
    this.easySelector.style.display = "none";
    this.normalSelector.style.display = "none";
    this.hardSelector.style.display = "none";
    this.coverElement.style.display = "none";
  }
  static showColorSelector() {
    this.coverColorElement.style.display = "block";
  }
  static hideColorSelector() {
    this.coverColorElement.style.display = "none";
  }
  static showDifficulty() {
    switch (Config.difficulty) {
      case "easy":
        this.difficultyElement.src = "img/easy.png";
        break;
      case "normal":
        this.difficultyElement.src = "img/normal.png";
        break;
      case "hard":
        this.difficultyElement.src = "img/hard.png";
        break;
      }
  }
  static showUnit(unit){

    if(unit == "g"){
      this.scoreUnitElement.src = "img/g.png";
    } else {
      this.scoreUnitElement.src = "img/kg.png";
    }
  }
  static showBatankyu() {
    const difficultyMap = {
      "easy": "やさしい",
      "normal": "ふつう",
      "hard": "むずかしい"
    }
    const version = Config.color == "blue" ? "青りんごVer.／" : "";
    const text = encodeURIComponent(`収穫した青森りんごは${Score.getScoreText()}！最高${Score.maxRensa}れんぞく！［${version}レベル：${difficultyMap[Config.difficulty]}］
-----------------------------------
＼ #ぷよりんご ゲームに挑戦！／
${location.href.replace(location.search,"")}
-----------------------------------`)

    this.tweetElement.href = `https://twitter.com/intent/tweet?text=${text}`;
    this.gameoverElement.style.display = "block";
  }
  static writeNum(num, dom) {
    while (dom.firstChild) {
      dom.removeChild(dom.firstChild);
    }

    [...num.toString(10)].forEach((n) => {
      dom.appendChild(this.fontTemplateList[n].cloneNode());
    });
  }
}
Stage.fallingPuyoList = [];
Stage.erasingPuyoInfoList = [];