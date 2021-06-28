System.register("chunks:///_virtual/update-value-label.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Label;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "02566VN0PhN8o7NqZg0WyFs", "update-value-label", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var UpdateValueLabel = exports('UpdateValueLabel', (_dec = ccclass("UpdateValueLabel"), _dec(_class = (_temp = /*#__PURE__*/function (_Label) {
        _inheritsLoose(UpdateValueLabel, _Label);

        function UpdateValueLabel() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Label.call.apply(_Label, [this].concat(args)) || this;
          _this.isPlaying = false;
          _this.startVal = 0;
          _this.endVal = 0;
          _this.diffVal = 0;
          _this.currTime = 0;
          _this.changingTime = 0;
          return _this;
        }

        var _proto = UpdateValueLabel.prototype;

        _proto.start = function start() {// Your initialization goes here.
        };

        _proto.playUpdateValue = function playUpdateValue(startVal, endVal, changingTime) {
          this.startVal = startVal;
          this.endVal = endVal;
          this.diffVal = this.endVal - this.startVal;
          this.currTime = 0;
          this.changingTime = changingTime;
          this.string = startVal.toString();
          this.isPlaying = true;
        };

        _proto.update = function update(dt) {
          if (!this.isPlaying) {
            return;
          }

          if (this.currTime < this.changingTime) {
            this.currTime += dt;
            var currVal = this.startVal + parseInt((this.currTime / this.changingTime * this.diffVal).toString());

            if (currVal < this.startVal) {
              currVal = this.startVal;
            } else if (currVal > this.endVal) {
              currVal = this.endVal;
            }

            this.string = "" + currVal;
            return;
          }

          this.string = "" + this.endVal;
          this.isPlaying = false;
        };

        return UpdateValueLabel;
      }(Label), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/board-manager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts', './utils.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, Prefab, instantiate, Component, Constants, utils;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      Constants = module.Constants;
    }, function (module) {
      utils = module.utils;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "2a0a0QivvtEZodpOZ79qMFb", "board-manager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;

      var _tempPos = new Vec3();

      var _diamondPos = new Vec3();

      var BoardManager = exports('BoardManager', (_dec = ccclass("BoardManager"), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BoardManager, _Component);

        function BoardManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "boardPrefab", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "diamondPrefab", _descriptor2, _assertThisInitialized(_this));

          _this.diamondSprintList = [];
          _this.diamondCenterX = 0;
          _this._boardList = [];
          _this._boardInsIdx = 0;
          return _this;
        }

        var _proto = BoardManager.prototype; // 当前实例编号

        _proto.start = function start() {
          this.initBoard();
          this.initDiamond();
        } // 每次开始游戏板重置
        ;

        _proto.reset = function reset() {
          this._boardInsIdx = 0;
          Constants.game.initFirstBoard = false;
          var pos = Constants.BOARD_INIT_POS.clone();
          var board;
          var type = Constants.BOARD_TYPE.NORMAL;

          for (var _i = 0; _i < Constants.BOARD_NUM; _i++) {
            board = this._boardList[_i];
            board.reset(type, pos, 1);
            pos = this.getNextPos(board, 1);
          }

          board = this._boardList[0];
          board.isActive = true;
          Constants.game.ball.currBoard = board;

          if (this.diamondSprintList[0]) {
            for (var i = 0; i < Constants.DIAMOND_NUM; i++) {
              this.diamondSprintList[i].active = false;
            }
          }
        } // 板初始化
        ;

        _proto.initBoard = function initBoard() {
          for (var i = 0; i < Constants.BOARD_NUM; i++) {
            var node = instantiate(this.boardPrefab);
            node.name = this._boardInsIdx.toString();
            this._boardInsIdx++;
            this.node.addChild(node);
            var board = node.getComponent('Board');

            this._boardList.push(board);
          }

          this.reset();
        } // 游戏过程中新增板
        ;

        _proto.newBoard = function newBoard(newType, diffLevel) {
          var oldBoard = this._boardList[Constants.BOARD_NUM - 1];
          var pos = this.getNextPos(oldBoard, diffLevel, _tempPos);

          var board = this._boardList.shift();

          if (newType === Constants.BOARD_TYPE.SPRINT) {
            this.diamondCenterX = pos.x;
            this.setDiamond(pos);
            board.reset(newType, pos, 0);
          } else {
            board.reset(newType, pos, diffLevel);
          }

          board.name = this._boardInsIdx.toString();
          this._boardInsIdx++;

          this._boardList.push(board);
        } // 获得新板位置
        ;

        _proto.getNextPos = function getNextPos(board, count, out) {
          var pos = out ? out.set(board.node.position) : board.node.position.clone();
          var o = utils.getDiffCoeff(count, 1, 2);
          pos.x = (Math.random() - .5) * Constants.SCENE_MAX_OFFSET_X * o;

          if (board.type === Constants.BOARD_TYPE.SPRINT) {
            pos.y += Constants.BOARD_GAP_SPRINT;
            pos.x = board.node.position.x;
          }

          if (board.type === Constants.BOARD_TYPE.SPRING) {
            pos.y += Constants.BOARD_GAP_SPRING;
          } else {
            pos.y += Constants.BOARD_GAP;
          }

          return pos;
        };

        _proto.initDiamond = function initDiamond() {
          for (var i = 0; i < Constants.DIAMOND_NUM; i++) {
            this.diamondSprintList[i] = instantiate(this.diamondPrefab);
            this.node.addChild(this.diamondSprintList[i]);
            this.diamondSprintList[i].active = false;
          }
        };

        _proto.setDiamond = function setDiamond(pos) {
          var position = pos.clone();
          position.y += Constants.BALL_JUMP_STEP_SPRINT * Constants.DIAMOND_START_FRAME;

          for (var i = 0; i < Constants.DIAMOND_NUM; i++) {
            this.setNextDiamondPos(position);
            this.diamondSprintList[i].setPosition(position);
            this.diamondSprintList[i].active = true;
          }
        };

        _proto.newDiamond = function newDiamond() {
          _diamondPos.set(this.diamondSprintList[Constants.DIAMOND_NUM - 1].position);

          this.setNextDiamondPos(_diamondPos);
          var node = this.diamondSprintList.shift();
          node.setPosition(_diamondPos);
          node.active = true;
          this.diamondSprintList.push(node);
        };

        _proto.clearDiamond = function clearDiamond() {
          for (var i = 0; i < Constants.DIAMOND_NUM; i++) {
            this.diamondSprintList[i].active = false;
          }
        };

        _proto.setNextDiamondPos = function setNextDiamondPos(pos) {
          pos.y += Constants.DIAMOND_SPRINT_STEP_Y;
          pos.x += 1.5 * (Math.random() - 0.5);

          if (pos.x > this.diamondCenterX + Constants.SCENE_MAX_OFFSET_X) {
            pos.x = this.diamondCenterX + Constants.SCENE_MAX_OFFSET_X;
          } else if (pos.x < this.diamondCenterX - Constants.SCENE_MAX_OFFSET_X) {
            pos.x = this.diamondCenterX - Constants.SCENE_MAX_OFFSET_X;
          }
        };

        _proto.getBoardList = function getBoardList() {
          return this._boardList;
        };

        _proto.getDiamondSprintList = function getDiamondSprintList() {
          return this.diamondSprintList;
        };

        return BoardManager;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "boardPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "diamondPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/page-result.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './update-value-label.ts', './constants.ts', './revive.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Component, UpdateValueLabel, Constants, Revive;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      UpdateValueLabel = module.UpdateValueLabel;
    }, function (module) {
      Constants = module.Constants;
    }, function (module) {
      Revive = module.Revive;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "31b007MqixM3YyJROFsTMEh", "page-result", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PageResult = exports('PageResult', (_dec = ccclass("PageResult"), _dec2 = property({
        type: UpdateValueLabel
      }), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PageResult, _Component);

        function PageResult() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "scoreLabel", _descriptor, _assertThisInitialized(_this));

          _this.targetProgress = 0;

          _initializerDefineProperty(_this, "nodeTips1", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "nodeTips2", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "result", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = PageResult.prototype;

        _proto.init = function init() {
          this.targetProgress = 0;
          this.scoreLabel.playUpdateValue(this.targetProgress, this.targetProgress, 0);
          this.scoreLabel.isPlaying = false;
        };

        _proto.onEnable = function onEnable() {
          Constants.game.node.on(Constants.GAME_EVENT.HIDETIPS, this.hideTips, this);
          Constants.game.node.on(Constants.GAME_EVENT.ADDSCORE, this.addScore, this);
          Constants.game.node.on(Constants.GAME_EVENT.DYING, this.gameDie, this);
          this.showTips(true);
          this.showResult(false);
          this.init();
        };

        _proto.start = function start() {
          var reviveComp = this.result.getComponent(Revive);
          reviveComp.pageResult = this;
        };

        _proto.onDisable = function onDisable() {
          Constants.game.node.off(Constants.GAME_EVENT.HIDETIPS, this.hideTips, this);
          Constants.game.node.off(Constants.GAME_EVENT.ADDSCORE, this.addScore, this);
        };

        _proto.addScore = function addScore(score) {
          this.targetProgress = score;
          var curProgress = Number(this.scoreLabel.string);
          this.scoreLabel.playUpdateValue(curProgress, this.targetProgress, (this.targetProgress - curProgress) / 20);
        };

        _proto.gameDie = function gameDie() {
          this.showTips(false);
          this.showResult(true);
        };

        _proto.showTips = function showTips(show) {
          this.nodeTips1.active = show;
          this.nodeTips2.active = show;
        };

        _proto.hideTips = function hideTips() {
          this.showTips(false);
        };

        _proto.showResult = function showResult(isShow) {
          this.result.active = isShow;
        };

        return PageResult;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nodeTips1", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nodeTips2", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "result", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/revive.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, WidgetComponent, Label, SpriteComponent, Component, Constants;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      WidgetComponent = module.WidgetComponent;
      Label = module.Label;
      SpriteComponent = module.SpriteComponent;
      Component = module.Component;
    }, function (module) {
      Constants = module.Constants;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "37e87RwLXtA5LwGn6Zuq48u", "revive", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Revive = exports('Revive', (_dec = ccclass("Revive"), _dec2 = property(WidgetComponent), _dec3 = property(Label), _dec4 = property({
        type: Label
      }), _dec5 = property({
        type: Label
      }), _dec6 = property(SpriteComponent), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Revive, _Component);

        function Revive() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.closeCb = null;

          _initializerDefineProperty(_this, "wgMenu", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "historyLabel", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scoreLabel", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "progressLabel", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "spCountDown", _descriptor5, _assertThisInitialized(_this));

          _this.pageResult = null;
          return _this;
        }

        var _proto = Revive.prototype;

        _proto.onEnable = function onEnable() {
          this.show();
        };

        _proto.show = function show() {
          var score = Constants.game.score;
          this.scoreLabel.string = score.toString();

          if (Constants.MAX_SCORE < score) {
            Constants.MAX_SCORE = score;
          }

          this.historyLabel.string = Constants.MAX_SCORE.toString(); // this.closeCb = closeCallback;

          this.countDownTime = 5;
          this.progressLabel.string = this.countDownTime + '';
          this.currentTime = 0;
          this.spCountDown.fillRange = 1;
          this.isCountDowning = true;
        };

        _proto.onBtnReviveClick = function onBtnReviveClick() {
          this.isCountDowning = false;
          Constants.game.audioManager.playClip();
          Constants.game.node.emit(Constants.GAME_EVENT.REVIVE);
          this.pageResult.showResult(false); // uiManager.instance.hideDialog('fight/revive');
        };

        _proto.onBtnSkipClick = function onBtnSkipClick() {
          Constants.game.audioManager.playClip();
          this.isCountDowning = false; // uiManager.instance.hideDialog('fight/revive');
          // this.closeCb && this.closeCb();

          Constants.game.gameOver();
        };

        _proto.update = function update(dt) {
          if (!this.isCountDowning) {
            return;
          }

          this.currentTime += dt;
          var spare = this.countDownTime - this.currentTime;
          this.progressLabel.string = Math.ceil(spare) + '';

          if (spare <= 0) {
            spare = 0; //触发倒计时结束

            this.isCountDowning = false;
            this.onBtnSkipClick();
          }

          var percent = spare / this.countDownTime; // 展示百分比

          this.spCountDown.fillRange = percent;
        };

        return Revive;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "wgMenu", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "historyLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "progressLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "spCountDown", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ui-manager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Component, Constants;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      Constants = module.Constants;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "4becfUEfe1C2prK7h8zxNvz", "ui-manager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var UIManager = exports('UIManager', (_dec = ccclass("UIManager"), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UIManager, _Component);

        function UIManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "pageStart", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "pageResult", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = UIManager.prototype;

        _proto.onLoad = function onLoad() {
          Constants.game.uiManager = this;
        };

        _proto.start = function start() {
          this.pageResult.active = false;
        };

        _proto.showDialog = function showDialog(isMain) {
          this.pageResult.active = !isMain;
          this.pageStart.active = isMain;
        };

        return UIManager;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pageStart", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pageResult", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/audio-manager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AudioClip, AudioSource, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioClip = module.AudioClip;
      AudioSource = module.AudioSource;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "52ff6Qg0MlJaaUpLNS1HPTJ", "audio-manager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AudioManager = exports('AudioManager', (_dec = ccclass("AudioManager"), _dec2 = property(AudioClip), _dec3 = property(AudioClip), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AudioManager, _Component);

        function AudioManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "bg", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "click", _descriptor2, _assertThisInitialized(_this));

          _this.audioComp = null;
          return _this;
        }

        var _proto = AudioManager.prototype;

        _proto.start = function start() {
          this.audioComp = this.getComponent(AudioSource);
        };

        _proto.playSound = function playSound(play) {
          if (play === void 0) {
            play = true;
          }

          if (!play) {
            this.audioComp.stop();
            return;
          }

          this.audioComp.clip = this.bg;
          this.audioComp.play();
        };

        _proto.playClip = function playClip() {
          this.audioComp.playOneShot(this.click);
        };

        return AudioManager;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bg", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "click", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/game.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts', './board-manager.ts', './ui-manager.ts', './audio-manager.ts', './ball.ts', './camera-ctrl.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Prefab, instantiate, Component, Constants, BoardManager, UIManager, AudioManager, Ball, CameraCtrl;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      Constants = module.Constants;
    }, function (module) {
      BoardManager = module.BoardManager;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      Ball = module.Ball;
    }, function (module) {
      CameraCtrl = module.CameraCtrl;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "6b6999+5cFK4K47RCoawnB4", "game", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * @zh 游戏管理类，同时也是事件监听核心对象。
       */

      var Game = exports('Game', (_dec = ccclass("Game"), _dec2 = property(Prefab), _dec3 = property(BoardManager), _dec4 = property(CameraCtrl), _dec5 = property(UIManager), _dec6 = property(AudioManager), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Game, _Component);

        function Game() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "ballPref", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "boardManager", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cameraCtrl", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "uiManager", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "audioManager", _descriptor5, _assertThisInitialized(_this));

          _this.initFirstBoard = false;
          _this.state = Constants.GAME_STATE.READY;
          _this.score = 0;
          _this.hasRevive = false;
          _this._ball = null;
          return _this;
        }

        var _proto = Game.prototype;

        _proto.__preload = function __preload() {
          Constants.game = this;
        };

        _proto.onLoad = function onLoad() {
          if (!this.ballPref) {
            console.log('There is no ball!!');
            this.enabled = false;
            return;
          }

          var ball = instantiate(this.ballPref); // @ts-ignore

          ball.parent = this.node.parent;
          this._ball = ball.getComponent(Ball);
        };

        _proto.start = function start() {
          this.node.on(Constants.GAME_EVENT.RESTART, this.gameStart, this);
          this.node.on(Constants.GAME_EVENT.REVIVE, this.gameRevive, this);
        };

        _proto.onDestroy = function onDestroy() {
          this.node.off(Constants.GAME_EVENT.RESTART, this.gameStart, this);
          this.node.off(Constants.GAME_EVENT.REVIVE, this.gameRevive, this);
        };

        _proto.resetGame = function resetGame() {
          this.state = Constants.GAME_STATE.READY;

          this._ball.reset();

          this.cameraCtrl.reset();
          this.boardManager.reset();
          this.uiManager.showDialog(true);
        };

        _proto.gameStart = function gameStart() {
          this.audioManager.playSound();
          this.uiManager.showDialog(false);
          this.state = Constants.GAME_STATE.PLAYING;
          this.hasRevive = false;
          this.score = 0;
        };

        _proto.gameDie = function gameDie() {
          var _this2 = this;

          this.audioManager.playSound(false);
          this.state = Constants.GAME_STATE.PAUSE;

          if (!this.hasRevive) {
            this.node.emit(Constants.GAME_EVENT.DYING, function () {
              _this2.gameOver();
            });
          } else {
            this.gameOver();
          }
        };

        _proto.gameOver = function gameOver() {
          this.state = Constants.GAME_STATE.OVER;
          this.audioManager.playSound(false);
          this.resetGame();
        };

        _proto.gameRevive = function gameRevive() {
          var _this3 = this;

          this.hasRevive = true;
          this.state = Constants.GAME_STATE.READY;
          this.ball.revive();
          this.scheduleOnce(function () {
            _this3.audioManager.playSound();

            _this3.state = Constants.GAME_STATE.PLAYING;
          }, 1);
        };

        _proto.addScore = function addScore(score) {
          this.score += score;
          this.node.emit(Constants.GAME_EVENT.ADDSCORE, this.score);
        };

        _createClass(Game, [{
          key: "ball",
          get: function get() {
            return this._ball;
          }
        }]);

        return Game;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ballPref", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "boardManager", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cameraCtrl", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "uiManager", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "audioManager", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/page-start.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Component, Constants;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Constants = module.Constants;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "75579oVThhNcJN3jNLu42YC", "page-start", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PageStart = exports('PageStart', (_dec = ccclass("PageStart"), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PageStart, _Component);

        function PageStart() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = PageStart.prototype;

        _proto.gameStart = function gameStart() {
          Constants.game.node.emit(Constants.GAME_EVENT.RESTART);
          Constants.game.audioManager.playClip();
        };

        return PageStart;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ball.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts', './utils.ts', './pool-manager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, Prefab, Node, ParticleUtils, find, Camera, Label, Animation, ParticleSystem, Component, Constants, utils, PoolManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Prefab = module.Prefab;
      Node = module.Node;
      ParticleUtils = module.ParticleUtils;
      find = module.find;
      Camera = module.Camera;
      Label = module.Label;
      Animation = module.Animation;
      ParticleSystem = module.ParticleSystem;
      Component = module.Component;
    }, function (module) {
      Constants = module.Constants;
    }, function (module) {
      utils = module.utils;
    }, function (module) {
      PoolManager = module.PoolManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "900c8pQ81tCcrbRdvi9SxTB", "ball", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property; // 局部 vec3 变量复用

      var _tempPos = new Vec3();

      var Ball = exports('Ball', (_dec = ccclass("Ball"), _dec2 = property(Prefab), _dec3 = property({
        type: Prefab
      }), _dec4 = property({
        type: Prefab
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Ball, _Component);

        function Ball() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "diamondParticlePrefab", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scoreAniPrefab", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "trail02Prefab", _descriptor3, _assertThisInitialized(_this));

          _this.currBoard = null;
          _this.boardCount = 0;
          _this.jumpState = Constants.BALL_JUMP_STATE.JUMPUP;
          _this.currBoardIdx = 0;
          _this.diffLevel = 1;
          _this.currJumpFrame = 0;
          _this.hasSprint = false;
          _this.isTouch = false;
          _this.touchPosX = 0;
          _this.movePosX = 0;
          _this.isJumpSpring = false;
          _this.boardGroupCount = 0;
          _this.trailNode = null;
          _this.timeScale = 0;
          _this._wPos = new Vec3();
          return _this;
        }

        var _proto = Ball.prototype;

        _proto.start = function start() {
          Constants.game.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          Constants.game.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          Constants.game.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          Constants.game.node.on(Constants.GAME_EVENT.RESTART, this.gameStart, this); // @ts-ignore
          // this.trailNode = PoolManager.instance.getNode(this.trail01Prefab, this.node.parent);

          this.updateBall();
          this.reset();
        };

        _proto.onDestroy = function onDestroy() {
          Constants.game.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
          Constants.game.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          Constants.game.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          Constants.game.node.off(Constants.GAME_EVENT.RESTART, this.gameStart, this);
        };

        _proto.update = function update(deltaTime) {
          this.timeScale = Math.floor(deltaTime / Constants.normalDt * 100) / 100;

          if (Constants.game.state === Constants.GAME_STATE.PLAYING) {
            var boardBox = Constants.game.boardManager;
            var boardList = boardBox.getBoardList();

            if (this.jumpState === Constants.BALL_JUMP_STATE.SPRINT) {
              // 冲刺状态结束后状态切换
              if (this.currJumpFrame > Constants.BALL_JUMP_FRAMES_SPRINT) {
                this.jumpState = Constants.BALL_JUMP_STATE.JUMPUP;
                this.isJumpSpring = false;
                this.currJumpFrame = 0;
                this.hasSprint = false; // const eulerAngles = this.node.eulerAngles;
                // this.node.eulerAngles = new Vec3(eulerAngles.x, -Constants.BALL_SPRINT_STEP_Y, eulerAngles.z);

                boardBox.clearDiamond();
              }

              this.currJumpFrame += this.timeScale;
              var diamondSprintList = boardBox.getDiamondSprintList();

              for (var i = 0; i < Constants.DIAMOND_NUM; i++) {
                if (Math.abs(this.node.position.y - diamondSprintList[i].position.y) <= Constants.DIAMOND_SPRINT_SCORE_AREA && Math.abs(this.node.position.x - diamondSprintList[i].position.x) <= Constants.DIAMOND_SPRINT_SCORE_AREA) {
                  Constants.game.addScore(Constants.DIAMOND_SCORE);
                  this.showScore(Constants.DIAMOND_SCORE);
                  Constants.game.ball.playDiamondParticle(this.node.position);
                  diamondSprintList[i].active = false;
                }
              }

              this.setPosY();
              this.setPosX(); // this.setRotY();

              this.touchPosX = this.movePosX;
              var y = this.node.position.y + Constants.CAMERA_OFFSET_Y_SPRINT;
              Constants.game.cameraCtrl.setOriginPosY(y);
            } else {
              for (var _i = this.currBoardIdx + 1; _i >= 0; _i--) {
                var board = boardList[_i];
                var pos = this.node.position;
                var boardPos = boardList[_i].node.position;

                if (Math.abs(pos.x - boardPos.x) <= boardList[_i].getRadius() && Math.abs(pos.y - (boardPos.y + Constants.BOARD_HEIGTH)) <= Constants.DIAMOND_SCORE_AREA) {
                  boardList[_i].checkDiamond(pos.x);
                } // 超过当前跳板应该弹跳高度，开始下降


                if (this.jumpState === Constants.BALL_JUMP_STATE.FALLDOWN) {
                  if (this.currJumpFrame > Constants.PLAYER_MAX_DOWN_FRAMES || this.currBoard.node.position.y - pos.y - (Constants.BOARD_GAP + Constants.BOARD_HEIGTH) > 0.001) {
                    ParticleUtils.stop(this.trailNode);
                    Constants.game.gameDie();
                    return;
                  } // 是否在当前检测的板上


                  if (this.isOnBoard(board)) {
                    this.currBoard = board;
                    this.currBoardIdx = _i;
                    this.activeCurrBoard();
                    break;
                  }
                }
              }

              this.currJumpFrame += this.timeScale;

              if (this.jumpState === Constants.BALL_JUMP_STATE.JUMPUP) {
                if (this.isJumpSpring && this.currJumpFrame >= Constants.BALL_JUMP_FRAMES_SPRING) {
                  // 处于跳跃状态并且当前跳跃高度超过弹簧板跳跃高度
                  this.jumpState = Constants.BALL_JUMP_STATE.FALLDOWN;
                  this.currJumpFrame = 0;
                } else {
                  if (!this.isJumpSpring && this.currJumpFrame >= Constants.BALL_JUMP_FRAMES) {
                    // 跳跃距离达到限制，开始下落
                    this.jumpState = Constants.BALL_JUMP_STATE.FALLDOWN;
                    this.currJumpFrame = 0;
                  }
                }
              }

              this.setPosY();
              this.setPosX(); // this.setRotZ();

              if (this.currBoard.type !== Constants.BOARD_TYPE.SPRINT) {
                Constants.game.cameraCtrl.setOriginPosX(this.node.position.x);
              }

              this.touchPosX = this.movePosX;
            }

            this.setTrailPos();
          }
        };

        _proto.onTouchStart = function onTouchStart(touch, event) {
          this.isTouch = true;
          this.touchPosX = touch.getLocation().x;
          this.movePosX = this.touchPosX;
        };

        _proto.onTouchMove = function onTouchMove(touch, event) {
          this.movePosX = touch.getLocation().x;
        };

        _proto.onTouchEnd = function onTouchEnd(touch, event) {
          this.isTouch = false;
        };

        _proto.gameStart = function gameStart() {
          this.playTrail();
        };

        _proto.reset = function reset() {
          this.boardCount = 0;
          this.diffLevel = 1;

          _tempPos.set(Constants.BOARD_INIT_POS);

          _tempPos.y += Constants.BALL_RADIUS + Constants.BOARD_HEIGTH / 2 - .001;
          this.node.setPosition(_tempPos);
          this.node.eulerAngles = new Vec3();
          this.currJumpFrame = 0;
          this.jumpState = Constants.BALL_JUMP_STATE.FALLDOWN;
          this.hasSprint = false;
          this.currBoardIdx = 0;
          this.show();
          this.setTrailPos();
        };

        _proto.updateBall = function updateBall() {
          // PoolManager.instance.putNode(this.trailNode);
          // @ts-ignore
          this.trailNode = PoolManager.instance.getNode(this.trail02Prefab, this.node.parent);
        };

        _proto.show = function show() {
          this.node.active = true;
        };

        _proto.hide = function hide() {
          this.node.active = false;
        };

        _proto.activeCurrBoard = function activeCurrBoard() {
          var pos = this.node.position;
          var boardPos = this.currBoard.node.position;
          var boardType = this.currBoard.type;
          var y = boardPos.y + Constants.BALL_RADIUS + this.currBoard.getHeight() / 2 - .01;
          this.node.setPosition(pos.x, y, pos.z);
          this.currJumpFrame = 0;

          if (boardType === Constants.BOARD_TYPE.SPRINT) {
            this.jumpState = Constants.BALL_JUMP_STATE.SPRINT; // this.node.eulerAngles = new Vec3(this.node.eulerAngles.x, this.node.eulerAngles.y, 0);

            Constants.game.cameraCtrl.setOriginPosX(boardPos.x);
          } else {
            this.jumpState = Constants.BALL_JUMP_STATE.JUMPUP;
          }

          if (!this.currBoard.isActive) {
            this.currBoard.isActive = true;
            var score = Constants.SCORE_BOARD_NOT_CENTER;

            if (boardType !== Constants.BOARD_TYPE.NORMAL && boardType !== Constants.BOARD_TYPE.DROP || Math.abs(pos.x - boardPos.x) <= Constants.BOARD_RADIUS_CENTER) {
              score = Constants.SCORE_BOARD_CENTER;
            }

            Constants.game.addScore(score);
            this.showScore(score);
            this.boardCount++;

            if (this.boardCount === 5) {
              Constants.game.node.emit(Constants.GAME_EVENT.HIDETIPS);
            }

            this.diffLevel += score / 2;

            for (var l = this.currBoardIdx - Constants.BOARD_NEW_INDEX; l > 0; l--) {
              this.newBoard();
            }
          }

          this.isJumpSpring = boardType === Constants.BOARD_TYPE.SPRING;
          this.currBoard.setBump();
          this.currBoard.setWave();

          if (boardType == Constants.BOARD_TYPE.SPRING || boardType == Constants.BOARD_TYPE.SPRINT) {
            this.currBoard.setSpring();
          } // 掉落板开始掉落


          var boardList = Constants.game.boardManager.getBoardList();

          if (boardType === Constants.BOARD_TYPE.DROP) {
            for (var _l = 0; _l < this.currBoardIdx; _l++) {
              boardList[_l].setDrop();
            }
          }

          var c = boardPos.y + Constants.CAMERA_OFFSET_Y;
          Constants.game.cameraCtrl.setOriginPosY(c);
          Constants.game.cameraCtrl.preType = boardType;
        } // 创建新跳板信息
        ;

        _proto.newBoard = function newBoard() {
          var type = Constants.BOARD_TYPE.NORMAL;

          if (this.boardGroupCount <= 0) {
            var coeff = utils.getDiffCoeff(this.diffLevel, 1, 10);
            var t = Math.random() * coeff;

            if (t < 4.2) {
              type = Constants.BOARD_TYPE.NORMAL;
              this.boardGroupCount = 2;
            } else if (t <= 5.5) {
              type = Constants.BOARD_TYPE.GIANT;
              this.boardGroupCount = 3;
            } else if (t <= 6.2) {
              type = Constants.BOARD_TYPE.SPRING;

              if (Math.random() > 0.5) {
                this.boardGroupCount = 2;
              }
            } else if (t <= 7) {
              type = Constants.BOARD_TYPE.DROP;
              this.boardGroupCount = 3;
            } else if (t <= 7.5 && false === this.hasSprint) {
              type = Constants.BOARD_TYPE.SPRINT;
              this.hasSprint = true;
            } else {
              type = Constants.BOARD_TYPE.NORMAL;
            }
          }

          this.boardGroupCount--;
          Constants.game.boardManager.newBoard(type, this.diffLevel);
        } // 界面上的弹跳分数
        ;

        _proto.showScore = function showScore(score) {
          var node = PoolManager.instance.getNode(this.scoreAniPrefab, find('Canvas/resultUI'));
          var pos = new Vec3();
          var cameraComp = Constants.game.cameraCtrl.node.getComponent(Camera);

          this._wPos.set(this.node.worldPosition);

          cameraComp.convertToUINode(this._wPos, find('Canvas/resultUI'), pos);
          pos.x += 50;
          node.setPosition(pos);
          node.getComponentInChildren(Label).string = "+" + score;
          var animationComponent = node.getComponent(Animation);
          animationComponent.once(Animation.EventType.FINISHED, function () {
            PoolManager.instance.putNode(node);
          });
          animationComponent.play();
        };

        _proto.setPosX = function setPosX() {
          if (this.isTouch && this.touchPosX !== this.movePosX) {
            _tempPos.set(this.node.position);

            if (this.jumpState === Constants.BALL_JUMP_STATE.SPRINT) {
              var x = (this.movePosX - this.touchPosX) * Constants.COEFF_POS_BALL;
              this.node.setPosition(_tempPos.x + x, _tempPos.y, _tempPos.z);

              _tempPos.set(this.node.position);

              x = _tempPos.x;
              var t = 1.3 * Constants.SCENE_MAX_OFFSET_X;
              var currBoardPos = this.currBoard.node.position;

              if (x > currBoardPos.x + t) {
                this.node.setPosition(currBoardPos.x + t, _tempPos.y, _tempPos.z);
              } else if (x < this.currBoard.node.position.x - t) {
                this.node.setPosition(currBoardPos.x - t, _tempPos.y, _tempPos.z);
              }
            } else {
              var _x = (this.movePosX - this.touchPosX) * Constants.COEFF_POS_BALL;

              this.node.setPosition(_tempPos.x + _x, _tempPos.y, _tempPos.z);
            }
          }
        } // 垂直位置变化，每帧变动
        ;

        _proto.setPosY = function setPosY() {
          _tempPos.set(this.node.position); // 跳跃状态处理


          if (this.jumpState === Constants.BALL_JUMP_STATE.JUMPUP) {
            if (this.isJumpSpring) {
              _tempPos.y += Constants.BALL_JUMP_STEP_SPRING[Math.floor(this.currJumpFrame / 3)] * this.timeScale;
            } else {
              _tempPos.y += Constants.BALL_JUMP_STEP[Math.floor(this.currJumpFrame / 2)] * this.timeScale;
            }

            this.node.setPosition(_tempPos); // 下落状态处理
          } else if (this.jumpState === Constants.BALL_JUMP_STATE.FALLDOWN) {
            if (this.currBoard.type === Constants.BOARD_TYPE.SPRING) {
              if (this.currJumpFrame < Constants.BALL_JUMP_FRAMES_SPRING) {
                var step = Constants.BALL_JUMP_FRAMES_SPRING - this.currJumpFrame - 1;
                _tempPos.y -= Constants.BALL_JUMP_STEP_SPRING[Math.floor((step >= 0 ? step : 0) / 3)] * this.timeScale;
              } else {
                _tempPos.y -= Constants.BALL_JUMP_STEP_SPRING[0] * this.timeScale;
              }
            } else if (this.currJumpFrame < Constants.BALL_JUMP_FRAMES) {
              var _step = Constants.BALL_JUMP_FRAMES - this.currJumpFrame - 1;

              _tempPos.y -= Constants.BALL_JUMP_STEP[Math.floor((_step >= 0 ? _step : 0) / 2)] * this.timeScale;
            } else {
              _tempPos.y -= Constants.BALL_JUMP_STEP[0] * this.timeScale;
            }

            this.node.setPosition(_tempPos); // 冲刺跳跃状态处理
          } else if (this.jumpState === Constants.BALL_JUMP_STATE.SPRINT) {
            _tempPos.y += Constants.BALL_JUMP_STEP_SPRINT * this.timeScale;
            this.node.setPosition(_tempPos);

            if (this.currJumpFrame >= Constants.DIAMOND_START_FRAME + 20 && this.currJumpFrame <= Constants.BALL_JUMP_FRAMES_SPRINT - 50 && Math.floor(this.currJumpFrame) % Math.floor(Constants.DIAMOND_SPRINT_STEP_Y / Constants.BALL_JUMP_STEP_SPRINT) == 0) {
              Constants.game.boardManager.newDiamond();
            }
          }
        } // 当前处于哪块板子上
        ;

        _proto.isOnBoard = function isOnBoard(board) {
          var pos = this.node.position;
          var boardPos = board.node.position;
          var x = Math.abs(pos.x - boardPos.x);
          var y = pos.y - boardPos.y; // 在板子的半径内

          if (x <= board.getRadius()) {
            if (y >= 0 && y <= Constants.BALL_RADIUS + board.getHeight() / 2) {
              return true;
            } // 处于下落状态


            if (this.isJumpSpring && this.currJumpFrame >= Constants.BALL_JUMP_FRAMES_SPRING) {
              // 是否处于反弹后的第一次匀减速范围内
              if (Math.abs(y) < Constants.BALL_JUMP_STEP_SPRING[0]) {
                return true;
              }
            } else if (!this.isJumpSpring && this.currJumpFrame >= Constants.BALL_JUMP_FRAMES) {
              if (Math.abs(y) < Constants.BALL_JUMP_STEP[0]) {
                return true;
              }
            }
          }

          return false;
        };

        _proto.revive = function revive() {
          this.currBoardIdx--;

          if (this.currBoard.type === Constants.BOARD_TYPE.SPRINT) {
            this.currBoardIdx++;
            this.currBoard = Constants.game.boardManager.getBoardList()[this.currBoardIdx];
          }

          this.currBoard.revive();
          var pos = this.currBoard.node.position.clone();
          pos.y += Constants.BALL_RADIUS + this.currBoard.getHeight() / 2 - .001;
          this.node.setPosition(pos);
          this.node.eulerAngles = new Vec3(0, 0, 0);
          this.currJumpFrame = 0;
          this.show();
          var y = this.currBoard.node.position.y + Constants.CAMERA_OFFSET_Y;
          Constants.game.cameraCtrl.setOriginPosX(pos.x);
          Constants.game.cameraCtrl.setOriginPosY(y);
          this.playTrail();
          this.setTrailPos();
        };

        _proto.playDiamondParticle = function playDiamondParticle(pos) {
          var _this2 = this; // @ts-ignore


          var diamondParticle = PoolManager.instance.getNode(this.diamondParticlePrefab, this.node.parent);
          diamondParticle.setPosition(pos);
          var particleSystemComp = diamondParticle.getComponent(ParticleSystem);
          particleSystemComp.play();

          var fun = function fun() {
            if (!particleSystemComp.isPlaying) {
              PoolManager.instance.putNode(diamondParticle);

              _this2.unschedule(fun);
            }
          };

          this.schedule(fun, 0.1);
        };

        _proto.playTrail = function playTrail() {
          ParticleUtils.play(this.trailNode);
        };

        _proto.setTrailPos = function setTrailPos() {
          var pos = this.node.position;
          this.trailNode.setPosition(pos.x, pos.y - 0.1, pos.z);
        };

        return Ball;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "diamondParticlePrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scoreAniPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "trail02Prefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/camera-ctrl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, Node, Component, Constants;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      Constants = module.Constants;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "b5204GgQaBDNqMtOdI4KDJl", "camera-ctrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;

      var _tempPos = new Vec3();

      var CameraCtrl = exports('CameraCtrl', (_dec = ccclass("CameraCtrl"), _dec2 = property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CameraCtrl, _Component);

        function CameraCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "planeNode", _descriptor, _assertThisInitialized(_this));

          _this.preType = Constants.BOARD_TYPE.NORMAL;
          _this._originPos = new Vec3();
          return _this;
        }

        var _proto = CameraCtrl.prototype;

        _proto.start = function start() {
          this._originPos.set(Constants.CAMERA_INIT_POS);

          this.setPosition(this._originPos);
          this.node.eulerAngles = Constants.CAMERA_INIT_ROT;
        };

        _proto.setOriginPosX = function setOriginPosX(val) {
          this._originPos.x = val;
        };

        _proto.setOriginPosY = function setOriginPosY(val) {
          this._originPos.y = val;
        };

        _proto.update = function update() {
          _tempPos.set(this.node.position);

          if (_tempPos.x === this._originPos.x && _tempPos.y === this._originPos.y) {
            return;
          } // 横向位置误差纠正


          if (Math.abs(_tempPos.x - this._originPos.x) <= Constants.CAMERA_MOVE_MINI_ERR) {
            _tempPos.x = this._originPos.x;
            this.setPosition(_tempPos);
          } else {
            var x = this._originPos.x - _tempPos.x;
            _tempPos.x += x / Constants.CAMERA_MOVE_X_FRAMES;
            this.setPosition(_tempPos);
          }

          _tempPos.set(this.node.position); // 纵向位置误差纠正


          if (Math.abs(_tempPos.y - this._originPos.y) <= Constants.CAMERA_MOVE_MINI_ERR) {
            _tempPos.y = this._originPos.y;
            this.setPosition(_tempPos);
          } else {
            var y = this._originPos.y - _tempPos.y;

            if (this.preType === Constants.BOARD_TYPE.SPRING) {
              _tempPos.y += y / Constants.CAMERA_MOVE_Y_FRAMES_SPRING;
              this.setPosition(_tempPos);
            } else {
              _tempPos.y += y / Constants.CAMERA_MOVE_Y_FRAMES;
              this.setPosition(_tempPos);
            }
          }
        } // 相机的默认位置
        ;

        _proto.reset = function reset() {
          this._originPos.set(Constants.CAMERA_INIT_POS);

          this.setPosition(this._originPos);
        } // 相机更新的同时更新背景板
        ;

        _proto.setPosition = function setPosition(position) {
          this.node.setPosition(position);
          var y = position.y - 27;
          this.planeNode.setPosition(position.x, y, -100);
        };

        return CameraCtrl;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "planeNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/board.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts', './utils.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, Prefab, instantiate, MeshRenderer, Color, Component, Constants, utils;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      MeshRenderer = module.MeshRenderer;
      Color = module.Color;
      Component = module.Component;
    }, function (module) {
      Constants = module.Constants;
    }, function (module) {
      utils = module.utils;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "bb50aLcTl1FbpB7Hy0H/DT9", "board", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;

      var _tempPos = new Vec3();

      var Board = exports('Board', (_dec = ccclass("Board"), _dec2 = property(Prefab), _dec3 = property({
        type: Prefab
      }), _dec4 = property({
        type: Prefab
      }), _dec5 = property({
        type: Prefab
      }), _dec6 = property({
        type: Prefab
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Board, _Component);

        function Board() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "diamondPrefab", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "centerPrefab", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "wavePrefab", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "springTopPrefab", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "springHelixPrefab", _descriptor5, _assertThisInitialized(_this));

          _this.isActive = false;
          _this.diamondList = [];
          _this.type = Constants.BOARD_TYPE.NORMAL;
          _this.wave = null;
          _this.waveInner = null;
          _this.waveOriginScale = new Vec3();
          _this.currWaveFrame = 0;
          _this.currSpringFrame = 0;
          _this.currBumpFrame = Constants.BOARD_BUMP_FRAMES;
          _this.springTop = null;
          _this.springHelix = null;
          _this.springHelixOriginScale = new Vec3();
          _this.center = null;
          _this.isMovingRight = true;
          _this.hasDiamond = false;
          _this.isMoving = false;
          _this.posBeforeDrop = new Vec3();
          _this.originScale = new Vec3();
          _this.currDropFrame = Constants.BOARD_DROP_FRAMES;
          _this._game = null;
          return _this;
        }

        var _proto = Board.prototype;

        _proto.onLoad = function onLoad() {
          this.originScale.set(this.node.scale);
          this.initCenter();
          this.initWave();
          this.initSpring();
          this.initDiamond();
        };

        _proto.update = function update() {
          this.effectBump();
          this.effectWave();

          if (this.type === Constants.BOARD_TYPE.SPRING || this.type === Constants.BOARD_TYPE.SPRINT) {
            this.effectSpring();
          }

          this.effectDrop();
          this.effectMove();

          if (this.hasDiamond) {
            this.effectDiamondRotate();
          }
        };

        _proto.reset = function reset(type, pos, level) {
          this.isActive = false;
          this.type = type;
          this.node.setPosition(pos);
          this.isMoving = false;
          this.currDropFrame = Constants.BOARD_DROP_FRAMES; // 按概率来决定是否是移动板

          if (this.type === Constants.BOARD_TYPE.NORMAL || this.type === Constants.BOARD_TYPE.DROP || this.type === Constants.BOARD_TYPE.SPRING) {
            this.isMoving = this.setMove(level);
          }

          if (this.type === Constants.BOARD_TYPE.GIANT) {
            this.node.setScale(this.originScale.x * Constants.BOARD_SCALE_GIANT, this.originScale.y, this.originScale.z);
          } else if (this.type === Constants.BOARD_TYPE.DROP) {
            this.node.setScale(this.originScale.x, this.originScale.y * Constants.BOARD_HEIGTH_SCALE_DROP, this.originScale.z);
            this.posBeforeDrop.set(this.node.position);
          } else {
            this.node.setScale(this.originScale);
          }

          this.springTop.active = false;

          if (this.type === Constants.BOARD_TYPE.SPRING || this.type === Constants.BOARD_TYPE.SPRINT) {
            this.springHelix.active = true;
            this.springTop.active = true;
            this.setSpringPos();
          }

          this.hasDiamond = false;

          if (this.diamondList[0]) {
            for (var i = 0; i < 5; i++) {
              this.diamondList[i].active = false;
            }

            if (this.type === Constants.BOARD_TYPE.GIANT) {
              for (var _i = 0; _i < 5; _i++) {
                this.diamondList[_i].active = true;
                this.hasDiamond = true;
              }
            } else if (this.type === Constants.BOARD_TYPE.NORMAL || this.type === Constants.BOARD_TYPE.DROP) {
              if (Math.random() > .7) {
                this.diamondList[2].active = Constants.game.initFirstBoard;
                Constants.game.initFirstBoard = true;
                this.hasDiamond = true;
              }
            }

            if (this.hasDiamond) {
              this.setDiamondPos();
            }
          }
        };

        _proto.setDrop = function setDrop() {
          this.currDropFrame = 0;
          this.posBeforeDrop.set(this.node.position);
        };

        _proto.effectDrop = function effectDrop() {
          if (this.currDropFrame < Constants.BOARD_DROP_FRAMES) {
            for (var i = 0; i < 5; i++) {
              this.diamondList[i].active = false;
            }

            if (this.springTop.active) {
              this.springHelix.active = false;
              var pos = this.springTop.position;
              this.springTop.setPosition(pos.x, pos.y - Constants.BOARD_DROP_STEP, pos.z);
            }

            _tempPos.set(this.node.position);

            _tempPos.y -= Constants.BOARD_DROP_STEP;
            this.node.setPosition(_tempPos);
            this.setCenterPos();
            this.currDropFrame++;
          }
        };

        _proto.initDiamond = function initDiamond() {
          for (var i = 0; i < 5; i++) {
            this.diamondList[i] = instantiate(this.diamondPrefab);
            this.node.parent.addChild(this.diamondList[i]);
            this.diamondList[i].active = false;
          }
        };

        _proto.setDiamondPos = function setDiamondPos() {
          var pos = new Vec3();

          for (var i = 0; i < 5; i++) {
            if (this.diamondList[i].active) {
              pos.set(this.node.position);
              pos.x += 1.4 * (i - 2);
              pos.y += Constants.BOARD_HEIGTH;
              this.diamondList[i].setPosition(pos);
            }
          }
        };

        _proto.hideDiamond = function hideDiamond(index) {
          this.diamondList[index].active = false;
        };

        _proto.checkDiamond = function checkDiamond(x) {
          if (this.hasDiamond) {
            var flag = true;

            for (var i = 0; i < 5; i++) {
              if (this.diamondList[i].active) {
                flag = false;

                if (Math.abs(x - this.diamondList[i].position.x) <= Constants.DIAMOND_SCORE_AREA) {
                  Constants.game.ball.playDiamondParticle(this.diamondList[i].position);
                  this.hideDiamond(i);
                  Constants.game.addScore(Constants.DIAMOND_SCORE);
                }
              }
            }

            if (flag) {
              this.hasDiamond = false;
            }
          }
        } // 钻石旋转
        ;

        _proto.effectDiamondRotate = function effectDiamondRotate() {
          for (var i = 0; i < 5; i++) {
            var eulerAngles = this.diamondList[i].eulerAngles;
            this.diamondList[i].eulerAngles = new Vec3(eulerAngles.x, eulerAngles.y + Constants.DIAMOND_ROTATE_STEP_Y, eulerAngles.z);
          }
        };

        _proto.initSpring = function initSpring() {
          this.springHelix = instantiate(this.springHelixPrefab);
          this.springHelixOriginScale = this.springHelix.getScale();
          this.springHelix.setScale(1.5, 1, 1.5);
          this.node.parent.addChild(this.springHelix);
          this.springHelix.active = false;
          this.currSpringFrame = 2 * Constants.BOARD_SPRING_FRAMES;
          this.springTop = instantiate(this.springTopPrefab);
          this.node.parent.addChild(this.springTop);
          this.springTop.active = false;
          var pos = this.node.position.clone();
          pos.y += (Constants.BOARD_HEIGTH + Constants.SPRING_HEIGHT) / 2;
          this.springTop.setPosition(pos);
          this.setSpringPos();
        };

        _proto.setSpring = function setSpring() {
          this.currSpringFrame = 0;
          this.setSpringPos();
          this.springHelix.setScale(1.5, 1, 1.5);
          this.springHelix.active = true;
          this.springTop.active = true;
        };

        _proto.setSpringPos = function setSpringPos() {
          var pos = this.node.position.clone();
          pos.y += Constants.BOARD_HEIGTH / 2;
          this.springHelix.setPosition(pos);
          pos = this.node.position.clone();
          pos.y += (Constants.BOARD_HEIGTH + Constants.SPRING_HEIGHT) / 2;
          this.springTop.setPosition(pos);
        };

        _proto.effectSpring = function effectSpring() {
          var z = this.type === Constants.BOARD_TYPE.SPRINT ? Constants.SPRING_HELIX_STEP_SPIRNT : Constants.SPRING_HELIX_STEP;
          var y = this.type === Constants.BOARD_TYPE.SPRINT ? Constants.SPRING_TOP_STEP_SPRINT : Constants.SPRING_TOP_STEP;
          var scale = this.springHelix.scale;
          var pos = this.springTop.position;

          if (this.currSpringFrame < Constants.BOARD_SPRING_FRAMES) {
            this.springHelix.setScale(scale.x, scale.y + z, scale.z);
            this.springTop.setPosition(pos.x, pos.y + y, pos.z);
            this.currSpringFrame++;
          } else if (this.currSpringFrame >= Constants.BOARD_SPRING_FRAMES && this.currSpringFrame < 2 * Constants.BOARD_SPRING_FRAMES) {
            this.springHelix.setScale(scale.x, scale.y - z, scale.z);
            this.springTop.setPosition(pos.x, pos.y - y, pos.z);
            this.currSpringFrame++;
          } else {
            this.springHelix.active = false;
          }
        };

        _proto.setBump = function setBump() {
          this.currBumpFrame = 0;
        };

        _proto.effectBump = function effectBump() {
          if (this.currBumpFrame < Constants.BOARD_BUMP_FRAMES) {
            var pos = this.node.position;
            this.node.setPosition(pos.x, pos.y + Constants.BOARD_BUMP_STEP[this.currBumpFrame], pos.z);
            this.setCenterPos();
            this.currBumpFrame++;
          }
        };

        _proto.initCenter = function initCenter() {
          this.center = instantiate(this.centerPrefab);
          this.node.parent.addChild(this.center);
          this.center.active = false;
        };

        _proto.setCenterPos = function setCenterPos() {
          var pos = this.node.position.clone();
          pos.y += Constants.BOARD_HEIGTH / 2;
          this.center.setPosition(pos);
        };

        _proto.initWave = function initWave() {
          this.wave = instantiate(this.wavePrefab);
          this.node.parent.addChild(this.wave);
          this.wave.active = false;
          this.waveInner = instantiate(this.wavePrefab);
          this.node.parent.addChild(this.waveInner);
          this.waveInner.active = false;
          this.currWaveFrame = Constants.BOARD_WAVE_FRAMES;
          this.waveOriginScale.set(this.wave.scale);
        };

        _proto.setWave = function setWave() {
          if (this.type != Constants.BOARD_TYPE.GIANT) {
            this.currWaveFrame = 0;
            var pos = this.node.position.clone();
            pos.y += Constants.WAVE_OFFSET_Y;
            this.wave.setPosition(pos);
            this.wave.setScale(this.waveOriginScale.clone());
            this.wave.active = true;
            var mat2 = this.wave.getComponent(MeshRenderer).material; // 初始化时保存以下变量

            var pass = mat2.passes[0];
            var hColor = pass.getHandle('color');
            var color = new Color('#dadada');
            color.a = 127;
            pass.setUniform(hColor, color);
            this.waveInner.setPosition(pos);
            this.waveInner.setScale(this.waveOriginScale.clone());
          }
        };

        _proto.effectWave = function effectWave() {
          if (this.currWaveFrame < Constants.BOARD_WAVE_FRAMES) {
            if (this.currWaveFrame >= Constants.BOARD_WAVE_INNER_START_FRAMES) {
              if (!this.waveInner.active) {
                this.waveInner.active = true;
              }

              var _mat = this.waveInner.getComponent(MeshRenderer).material; // 初始化时保存以下变量

              var _pass = _mat.passes[0];

              var _hColor = _pass.getHandle('color');

              var _color = new Color('#dadada');

              _color.a = 127 - Math.sin(this.currWaveFrame * 0.05) * 127;

              _pass.setUniform(_hColor, _color);

              var _scale = this.waveInner.getScale();

              this.waveInner.setScale(_scale.x + Constants.BOARD_WAVE_INNER_STEP, _scale.y, _scale.z + Constants.BOARD_WAVE_INNER_STEP);
            }

            var mat2 = this.wave.getComponent(MeshRenderer).material; // 初始化时保存以下变量

            var pass = mat2.passes[0];
            var hColor = pass.getHandle('color');
            var color = new Color('#dadada');
            color.a = 127 - Math.sin(this.currWaveFrame * 0.1) * 127;
            pass.setUniform(hColor, color);
            var scale = this.waveInner.getScale();
            this.wave.setScale(scale.x + Constants.BOARD_WAVE_STEP, scale.y, scale.z + Constants.BOARD_WAVE_STEP);
            this.currWaveFrame++;
          } else {
            this.wave.active = false;
            this.waveInner.active = false;
          }
        };

        _proto.getHeight = function getHeight() {
          return this.type === Constants.BOARD_TYPE.DROP ? Constants.BOARD_HEIGTH * Constants.BOARD_HEIGTH_SCALE_DROP : Constants.BOARD_HEIGTH;
        };

        _proto.getRadius = function getRadius() {
          return this.type === Constants.BOARD_TYPE.GIANT ? Constants.BOARD_RADIUS * Constants.BOARD_RADIUS_SCALE_GIANT : Constants.BOARD_RADIUS;
        };

        _proto.setMove = function setMove(coeff) {
          var t = utils.getDiffCoeff(coeff, 1, 10);
          return Math.random() * t > 5;
        };

        _proto.effectMove = function effectMove() {
          if (this.isMoving) {
            var pos = this.node.getPosition().clone();
            var x = pos.x;

            if (this.isMovingRight && x <= Constants.SCENE_MAX_OFFSET_X) {
              x += Constants.BOARD_MOVING_STEP;
              this.node.setPosition(x, pos.y, pos.z);
            } else if (this.isMovingRight && x > Constants.SCENE_MAX_OFFSET_X) {
              this.isMovingRight = false;
            } else if (!this.isMovingRight && x >= -Constants.SCENE_MAX_OFFSET_X) {
              x -= Constants.BOARD_MOVING_STEP;
              this.node.setPosition(x, pos.y, pos.z);
            } else if (!this.isMovingRight && x < -Constants.SCENE_MAX_OFFSET_X) {
              this.isMovingRight = true;
            }

            if (this.type === Constants.BOARD_TYPE.SPRING) {
              this.springHelix.setPosition(this.node.position.x, this.springHelix.position.y, this.springHelix.position.z);
              this.springTop.setPosition(this.node.position.x, this.springTop.position.y, this.springTop.position.z);
            }

            this.setCenterPos();

            if (this.hasDiamond) {
              this.setDiamondPos();
            }
          }
        };

        _proto.revive = function revive() {
          this.isActive = false;
          this.isMoving = false;

          if (this.type === Constants.BOARD_TYPE.DROP) {
            this.currDropFrame = Constants.BOARD_DROP_FRAMES;
            this.node.setPosition(this.posBeforeDrop);
          }
        };

        return Board;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "diamondPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "centerPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "wavePrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "springTopPrefab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "springHelixPrefab", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/constants.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Vec3;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d9bbf8RNxZP/qHAzCKjmpIn", "constants", undefined); //跳板类型


      var BOARD_TYPE;

      (function (BOARD_TYPE) {
        BOARD_TYPE[BOARD_TYPE["NORMAL"] = 0] = "NORMAL";
        BOARD_TYPE[BOARD_TYPE["SPRING"] = 1] = "SPRING";
        BOARD_TYPE[BOARD_TYPE["DROP"] = 2] = "DROP";
        BOARD_TYPE[BOARD_TYPE["GIANT"] = 3] = "GIANT";
        BOARD_TYPE[BOARD_TYPE["SPRINT"] = 4] = "SPRINT";
      })(BOARD_TYPE || (BOARD_TYPE = {}));

      var GAME_STATE;

      (function (GAME_STATE) {
        GAME_STATE[GAME_STATE["READY"] = 1] = "READY";
        GAME_STATE[GAME_STATE["PLAYING"] = 2] = "PLAYING";
        GAME_STATE[GAME_STATE["PAUSE"] = 3] = "PAUSE";
        GAME_STATE[GAME_STATE["OVER"] = 4] = "OVER";
      })(GAME_STATE || (GAME_STATE = {}));

      var GAME_EVENT;

      (function (GAME_EVENT) {
        GAME_EVENT["RESTART"] = "restart";
        GAME_EVENT["REVIVE"] = "revive";
        GAME_EVENT["ADDSCORE"] = "add-score";
        GAME_EVENT["DYING"] = "dying";
        GAME_EVENT["HIDETIPS"] = "hide-tips";
      })(GAME_EVENT || (GAME_EVENT = {}));

      var JUMP_STATE;

      (function (JUMP_STATE) {
        JUMP_STATE[JUMP_STATE["JUMPUP"] = 1] = "JUMPUP";
        JUMP_STATE[JUMP_STATE["FALLDOWN"] = 2] = "FALLDOWN";
        JUMP_STATE[JUMP_STATE["SPRINT"] = 3] = "SPRINT";
      })(JUMP_STATE || (JUMP_STATE = {}));

      var Constants = exports('Constants', function Constants() {});
      Constants.COEFF_POS_BALL = 8 / 360;
      Constants.PLAYER_MAX_DOWN_FRAMES = 40;
      Constants.MAX_SCORE = 0;
      Constants.SCORE_BOARD_CENTER = 2;
      Constants.SCORE_BOARD_NOT_CENTER = 1;
      Constants.BOARD_INIT_POS = new Vec3(0, 10, 0);
      Constants.BOARD_NUM = 6;
      Constants.BOARD_NEW_INDEX = 2;
      Constants.BOARD_HEIGTH = 0.25;
      Constants.BOARD_RADIUS = 1.5;
      Constants.BOARD_HEIGTH_SCALE_DROP = 0.5;
      Constants.BOARD_RADIUS_SCALE_GIANT = 2.8;
      Constants.BOARD_GAP = 4.3;
      Constants.BOARD_GAP_SPRING = 9;
      Constants.BOARD_GAP_SPRINT = 192;
      Constants.BOARD_SCALE_GIANT = 2.8;
      Constants.SCENE_MAX_OFFSET_X = 3.5;
      Constants.BOARD_TYPE = BOARD_TYPE;
      Constants.BOARD_DROP_FRAMES = 40;
      Constants.BOARD_DROP_STEP = 0.5;
      Constants.BOARD_RADIUS_CENTER = 0.35;
      Constants.BOARD_SPRING_FRAMES = 10;
      Constants.BOARD_WAVE_FRAMES = 16;
      Constants.BOARD_WAVE_INNER_START_FRAMES = 8;
      Constants.BOARD_WAVE_INNER_STEP = 0.12 * 2;
      Constants.BOARD_WAVE_STEP = 0.15 * 15;
      Constants.BOARD_MOVING_STEP = 0.03;
      Constants.SPRING_HEIGHT = 0.2;
      Constants.SPRING_HELIX_STEP = 0.5;
      Constants.SPRING_HELIX_STEP_SPIRNT = 1.2;
      Constants.SPRING_TOP_STEP = 0.25;
      Constants.SPRING_TOP_STEP_SPRINT = 0.5;
      Constants.WAVE_OFFSET_Y = 0.13 / 2;
      Constants.CAMERA_INIT_POS = new Vec3(0, 15, 22);
      Constants.CAMERA_INIT_ROT = new Vec3(-11, 0, 0);
      Constants.CAMERA_MOVE_X_FRAMES = 20;
      Constants.CAMERA_MOVE_Y_FRAMES = 15;
      Constants.CAMERA_MOVE_Y_FRAMES_SPRING = 23;
      Constants.CAMERA_MOVE_MINI_ERR = 0.02;
      Constants.CAMERA_OFFSET_Y = 10;
      Constants.CAMERA_OFFSET_Y_SPRINT = 15;
      Constants.BOARD_BUMP_FRAMES = 10;
      Constants.BOARD_BUMP_STEP = [-0.15, -0.1, -0.07, -0.02, -0.003, 0.003, 0.02, 0.07, 0.1, 0.15];
      Constants.GAME_STATE = GAME_STATE;
      Constants.GAME_EVENT = GAME_EVENT;
      Constants.BALL_RADIUS = 0.5;
      Constants.BALL_JUMP_STATE = JUMP_STATE;
      Constants.BALL_JUMP_FRAMES = 20;
      Constants.BALL_JUMP_FRAMES_SPRING = 27;
      Constants.BALL_JUMP_FRAMES_SPRINT = 240;
      Constants.BALL_JUMP_STEP = [0.8, 0.6, 0.5, 0.4, 0.3, 0.2, 0.15, 0.1, 0.05, 0.03];
      Constants.BALL_JUMP_STEP_SPRING = [1.2, 0.8, 0.6, 0.4, 0.3, 0.2, 0.15, 0.1, 0.05];
      Constants.BALL_JUMP_STEP_SPRINT = 0.8;
      Constants.BALL_SPRINT_STEP_Y = 10;
      Constants.DIAMOND_NUM = 10;
      Constants.DIAMOND_PIECE_NUM = 10;
      Constants.DIAMOND_RADIUS = 0.3;
      Constants.DIAMOND_ROTATE_STEP_Y = 1.5;
      Constants.DIAMOND_SCORE = 1;
      Constants.DIAMOND_SCORE_AREA = 0.6;
      Constants.DIAMOND_SPRINT_SCORE_AREA = 1;
      Constants.DIAMOND_SPRINT_STEP_Y = 4;
      Constants.DIAMOND_START_FRAME = 6;
      Constants.normalDt = 1 / 60;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/utils.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      cclegacy._RF.push({}, "dddce/2a/tOSLUiRKNMAQVd", "utils", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var utils = exports('utils', {
        getDiffCoeff: function getDiffCoeff(e, t, a) {
          return (a * e + 1) / (1 * e + ((a + 1) / t - 1));
        },
        getRandomInt: function getRandomInt(min, max) {
          var r = Math.random();
          var rr = r * (max - min + 1) + min;
          return Math.floor(rr);
        }
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/pool-manager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _createClass, cclegacy, _decorator, instantiate, NodePool;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      instantiate = module.instantiate;
      NodePool = module.NodePool;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "f92c3xOcsdMEKh7W/84QPrD", "pool-manager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PoolManager = exports('PoolManager', (_dec = ccclass("PoolManager"), _dec(_class = (_temp = /*#__PURE__*/function () {
        function PoolManager() {
          this.dictPool = {};
          this.dictPrefab = {};
        }

        var _proto = PoolManager.prototype;
        /**
         * 根据预设从对象池中获取对应节点
         */

        _proto.getNode = function getNode(prefab, parent) {
          var name = prefab.data.name;
          this.dictPrefab[name] = prefab;
          var node = null;

          if (this.dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            var pool = this.dictPool[name];

            if (pool.size() > 0) {
              node = pool.get();
            } else {
              node = instantiate(prefab);
            }
          } else {
            //没有对应对象池，创建他！
            var _pool = new NodePool();

            this.dictPool[name] = _pool;
            node = instantiate(prefab);
          }

          node.parent = parent;
          return node;
        }
        /**
         * 将对应节点放回对象池中
         */
        ;

        _proto.putNode = function putNode(node) {
          var name = node.name;
          var pool = null;

          if (this.dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            pool = this.dictPool[name];
          } else {
            //没有对应对象池，创建他！
            pool = new NodePool();
            this.dictPool[name] = pool;
          }

          pool.put(node);
        }
        /**
         * 根据名称，清除对应对象池
         */
        ;

        _proto.clearPool = function clearPool(name) {
          if (this.dictPool.hasOwnProperty(name)) {
            var pool = this.dictPool[name];
            pool.clear();
          }
        };

        _createClass(PoolManager, null, [{
          key: "instance",
          get: function get() {
            if (this._instance) {
              return this._instance;
            }

            this._instance = new PoolManager();
            return this._instance;
          }
        }]);

        return PoolManager;
      }(), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/migrate-canvas.ts", ['cc'], function () {
  'use strict';

  var cclegacy, director, Director, Canvas, Camera, game, Node;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
      Director = module.Director;
      Canvas = module.Canvas;
      Camera = module.Camera;
      game = module.game;
      Node = module.Node;
    }],
    execute: function () {
      cclegacy._RF.push({}, "fb363HTcUpDvp/Ro6ejBmbO", "migrate-canvas", undefined);

      var customLayerMask = 0x000fffff;
      var builtinLayerMask = 0xfff00000;
      director.on(Director.EVENT_AFTER_SCENE_LAUNCH, function () {
        var _director$getScene, _director$getScene2, _director$getScene3;

        var roots = (_director$getScene = director.getScene()) === null || _director$getScene === void 0 ? void 0 : _director$getScene.children;
        var allCanvases = (_director$getScene2 = director.getScene()) === null || _director$getScene2 === void 0 ? void 0 : _director$getScene2.getComponentsInChildren(Canvas);
        if (allCanvases.length <= 1) return;
        allCanvases = allCanvases.filter(function (x) {
          return !!x.cameraComponent;
        });
        var allCameras = (_director$getScene3 = director.getScene()) === null || _director$getScene3 === void 0 ? void 0 : _director$getScene3.getComponentsInChildren(Camera);
        var usedLayer = 0;
        allCameras.forEach(function (x) {
          return usedLayer |= x.visibility & customLayerMask;
        });
        var persistCanvas = [];

        for (var i = 0, l = roots.length; i < l; i++) {
          var root = roots[i];
          if (!game.isPersistRootNode(root)) continue;
          var canvases = root.getComponentsInChildren(Canvas);
          if (canvases.length === 0) continue;
          persistCanvas.push.apply(persistCanvas, canvases.filter(function (x) {
            return !!x.cameraComponent;
          }));
        }

        persistCanvas.forEach(function (val) {
          var isLayerCollided = allCanvases.find(function (x) {
            return x !== val && x.cameraComponent.visibility & val.cameraComponent.visibility & customLayerMask;
          });

          if (isLayerCollided) {
            var availableLayers = ~usedLayer;
            var lastAvailableLayer = availableLayers & ~(availableLayers - 1);
            val.cameraComponent.visibility = lastAvailableLayer | val.cameraComponent.visibility & builtinLayerMask;
            setChildrenLayer(val.node, lastAvailableLayer);
            usedLayer |= availableLayers;
          }
        });
      });

      function setChildrenLayer(node, layer) {
        for (var i = 0, l = node.children.length; i < l; i++) {
          node.children[i].layer = layer;
          setChildrenLayer(node.children[i], layer);
        }
      }

      var setParentEngine = Node.prototype.setParent;
      {
        Node.prototype.setParent = function (value, keepWorldTransform) {
          setParentEngine.call(this, value, keepWorldTransform);
          if (!value) return; // find canvas

          var layer = getCanvasCameraLayer(this);

          if (layer) {
            this.layer = layer;
            setChildrenLayer(this, layer);
          }
        };
      }

      function getCanvasCameraLayer(node) {
        var layer = 0;
        var canvas = node.getComponent(Canvas);

        if (canvas && canvas.cameraComponent) {
          if (canvas.cameraComponent.visibility & canvas.node.layer) {
            layer = canvas.node.layer;
          } else {
            layer = canvas.cameraComponent.visibility & ~(canvas.cameraComponent.visibility - 1);
          }

          return layer;
        }

        if (node.parent) {
          layer = getCanvasCameraLayer(node.parent);
        }

        return layer;
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./update-value-label.ts', './constants.ts', './utils.ts', './board-manager.ts', './revive.ts', './page-result.ts', './ui-manager.ts', './audio-manager.ts', './pool-manager.ts', './ball.ts', './camera-ctrl.ts', './game.ts', './page-start.ts', './board.ts', './migrate-canvas.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});