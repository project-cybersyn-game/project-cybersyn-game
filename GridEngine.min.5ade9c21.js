// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"sXi4":[function(require,module,exports) {
var global = arguments[3];
var define;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var GridEngine = function () {
  var Ur = Object.create;
  var mt = Object.defineProperty,
      Br = Object.defineProperties,
      Vr = Object.getOwnPropertyDescriptor,
      Hr = Object.getOwnPropertyDescriptors,
      jr = Object.getOwnPropertyNames,
      le = Object.getOwnPropertySymbols,
      $r = Object.getPrototypeOf,
      pe = Object.prototype.hasOwnProperty,
      zr = Object.prototype.propertyIsEnumerable;

  var ce = function ce(o, t, e) {
    return t in o ? mt(o, t, {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: e
    }) : o[t] = e;
  },
      R = function R(o, t) {
    for (var e in t || (t = {})) {
      pe.call(t, e) && ce(o, e, t[e]);
    }

    if (le) {
      var _iterator = _createForOfIteratorHelper(le(t)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var e = _step.value;
          zr.call(t, e) && ce(o, e, t[e]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    return o;
  },
      ft = function ft(o, t) {
    return Br(o, Hr(t));
  },
      Yr = function Yr(o) {
    return mt(o, "__esModule", {
      value: !0
    });
  };

  var u = function u(o, t) {
    return function () {
      return o && (t = o(o = 0)), t;
    };
  };

  var he = function he(o, t) {
    return function () {
      return t || o((t = {
        exports: {}
      }).exports, t), t.exports;
    };
  };

  var Kr = function Kr(o, t, e) {
    if (t && _typeof(t) == "object" || typeof t == "function") {
      var _iterator2 = _createForOfIteratorHelper(jr(t)),
          _step2;

      try {
        var _loop = function _loop() {
          var r = _step2.value;
          !pe.call(o, r) && r !== "default" && mt(o, r, {
            get: function get() {
              return t[r];
            },
            enumerable: !(e = Vr(t, r)) || e.enumerable
          });
        };

        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    return o;
  },
      Xr = function Xr(o) {
    return Kr(Yr(mt(o != null ? Ur($r(o)) : {}, "default", o && o.__esModule && "default" in o ? {
      get: function get() {
        return o.default;
      },
      enumerable: !0
    } : {
      value: o,
      enumerable: !0
    })), o);
  };

  var _P,
      dt = u(function () {
    _P = /*#__PURE__*/function () {
      function P() {
        _classCallCheck(this, P);
      }

      _createClass(P, null, [{
        key: "get",
        value: function get() {
          return _P.config;
        }
      }, {
        key: "set",
        value: function set(t) {
          _P.config = t;
        }
      }]);

      return P;
    }();
  });

  var X,
      At = u(function () {
    (function (i) {
      i.DONT_BLOCK = "DONT_BLOCK", i.BLOCK_TWO_TILES = "BLOCK_TWO_TILES", i.BLOCK_ONE_TILE_AHEAD = "BLOCK_ONE_TILE_AHEAD", i.BLOCK_ONE_TILE_BEHIND = "BLOCK_ONE_TILE_BEHIND";
    })(X || (X = {}));
  });

  var _C,
      h,
      F = u(function () {
    _C = /*#__PURE__*/function () {
      function C(t, e) {
        _classCallCheck(this, C);

        typeof t == "number" ? (this.x = t, this.y = e || 0) : (this.x = t.x, this.y = t.y);
      }

      _createClass(C, [{
        key: "clone",
        value: function clone() {
          return new _C(this.x, this.y);
        }
      }, {
        key: "add",
        value: function add(t) {
          return new _C(this.x + t.x, this.y + t.y);
        }
      }, {
        key: "multiply",
        value: function multiply(t) {
          return new _C(this.x * t.x, this.y * t.y);
        }
      }, {
        key: "divide",
        value: function divide(t) {
          return new _C(this.x / t.x, this.y / t.y);
        }
      }, {
        key: "subtract",
        value: function subtract(t) {
          return new _C(this.x - t.x, this.y - t.y);
        }
      }, {
        key: "equals",
        value: function equals(t) {
          return this.x === t.x && this.y === t.y;
        }
      }, {
        key: "abs",
        value: function abs() {
          return new _C(Math.abs(this.x), Math.abs(this.y));
        }
      }, {
        key: "length",
        value: function length() {
          return Math.sqrt(this.x * this.x + this.y * this.y);
        }
      }, {
        key: "toString",
        value: function toString() {
          return "".concat(this.x, "#").concat(this.y);
        }
      }]);

      return C;
    }(), h = _C;
    h.ZERO = new _C(0, 0), h.UP = new _C(0, -1), h.DOWN = new _C(0, 1), h.LEFT = new _C(-1, 0), h.RIGHT = new _C(1, 0);
  });

  function ue(o) {
    var t = [a.UP, a.RIGHT, a.DOWN, a.LEFT],
        e = [a.DOWN_LEFT, a.DOWN_RIGHT, a.UP_RIGHT, a.UP_LEFT];
    return o === _.EIGHT ? [].concat(t, e) : t;
  }

  function kt(o) {
    return [a.DOWN_LEFT, a.DOWN_RIGHT, a.UP_RIGHT, a.UP_LEFT].includes(o);
  }

  function me(o) {
    var _a$LEFT$a$UP_LEFT$a$U;

    return (_a$LEFT$a$UP_LEFT$a$U = {}, _defineProperty(_a$LEFT$a$UP_LEFT$a$U, a.LEFT, a.DOWN_LEFT), _defineProperty(_a$LEFT$a$UP_LEFT$a$U, a.UP_LEFT, a.LEFT), _defineProperty(_a$LEFT$a$UP_LEFT$a$U, a.UP, a.UP_LEFT), _defineProperty(_a$LEFT$a$UP_LEFT$a$U, a.UP_RIGHT, a.UP), _defineProperty(_a$LEFT$a$UP_LEFT$a$U, a.RIGHT, a.UP_RIGHT), _defineProperty(_a$LEFT$a$UP_LEFT$a$U, a.DOWN_RIGHT, a.RIGHT), _defineProperty(_a$LEFT$a$UP_LEFT$a$U, a.DOWN, a.DOWN_RIGHT), _defineProperty(_a$LEFT$a$UP_LEFT$a$U, a.DOWN_LEFT, a.DOWN), _defineProperty(_a$LEFT$a$UP_LEFT$a$U, a.NONE, a.NONE), _a$LEFT$a$UP_LEFT$a$U)[o];
  }

  function U(o) {
    var _a$UP$a$DOWN$a$LEFT$a;

    return (_a$UP$a$DOWN$a$LEFT$a = {}, _defineProperty(_a$UP$a$DOWN$a$LEFT$a, a.UP, h.UP.clone()), _defineProperty(_a$UP$a$DOWN$a$LEFT$a, a.DOWN, h.DOWN.clone()), _defineProperty(_a$UP$a$DOWN$a$LEFT$a, a.LEFT, h.LEFT.clone()), _defineProperty(_a$UP$a$DOWN$a$LEFT$a, a.RIGHT, h.RIGHT.clone()), _defineProperty(_a$UP$a$DOWN$a$LEFT$a, a.NONE, h.ZERO.clone()), _defineProperty(_a$UP$a$DOWN$a$LEFT$a, a.UP_LEFT, new h(-1, -1)), _defineProperty(_a$UP$a$DOWN$a$LEFT$a, a.UP_RIGHT, new h(1, -1)), _defineProperty(_a$UP$a$DOWN$a$LEFT$a, a.DOWN_RIGHT, new h(1, 1)), _defineProperty(_a$UP$a$DOWN$a$LEFT$a, a.DOWN_LEFT, new h(-1, 1)), _a$UP$a$DOWN$a$LEFT$a)[o];
  }

  function fe(o) {
    var _a$UP$a$DOWN$a$LEFT$a2;

    return (_a$UP$a$DOWN$a$LEFT$a2 = {}, _defineProperty(_a$UP$a$DOWN$a$LEFT$a2, a.UP, a.DOWN), _defineProperty(_a$UP$a$DOWN$a$LEFT$a2, a.DOWN, a.UP), _defineProperty(_a$UP$a$DOWN$a$LEFT$a2, a.LEFT, a.RIGHT), _defineProperty(_a$UP$a$DOWN$a$LEFT$a2, a.RIGHT, a.LEFT), _defineProperty(_a$UP$a$DOWN$a$LEFT$a2, a.NONE, a.NONE), _defineProperty(_a$UP$a$DOWN$a$LEFT$a2, a.UP_LEFT, a.DOWN_RIGHT), _defineProperty(_a$UP$a$DOWN$a$LEFT$a2, a.UP_RIGHT, a.DOWN_LEFT), _defineProperty(_a$UP$a$DOWN$a$LEFT$a2, a.DOWN_RIGHT, a.UP_LEFT), _defineProperty(_a$UP$a$DOWN$a$LEFT$a2, a.DOWN_LEFT, a.UP_RIGHT), _a$UP$a$DOWN$a$LEFT$a2)[o];
  }

  var a,
      _,
      w = u(function () {
    F();

    (function (c) {
      c.NONE = "none", c.LEFT = "left", c.UP_LEFT = "up-left", c.UP = "up", c.UP_RIGHT = "up-right", c.RIGHT = "right", c.DOWN_RIGHT = "down-right", c.DOWN = "down", c.DOWN_LEFT = "down-left";
    })(a || (a = {}));

    (function (e) {
      e[e.FOUR = 4] = "FOUR", e[e.EIGHT = 8] = "EIGHT";
    })(_ || (_ = {}));
  });

  var _y,
      q = u(function () {
    F();

    _y = /*#__PURE__*/function () {
      function y() {
        _classCallCheck(this, y);
      }

      _createClass(y, null, [{
        key: "vec2str",
        value: function vec2str(t) {
          return "".concat(t.x, "#").concat(t.y);
        }
      }, {
        key: "equal",
        value: function equal(t, e) {
          return _y.vec2str(t) == _y.vec2str(e);
        }
      }, {
        key: "manhattanDistance",
        value: function manhattanDistance(t, e) {
          var r = Math.abs(t.x - e.x),
              i = Math.abs(t.y - e.y);
          return r + i;
        }
      }, {
        key: "chebyshevDistance",
        value: function chebyshevDistance(t, e) {
          var r = Math.abs(t.x - e.x),
              i = Math.abs(t.y - e.y);
          return Math.max(r, i);
        }
      }, {
        key: "scalarMult",
        value: function scalarMult(t, e) {
          return t.clone().multiply(new h(e, e));
        }
      }]);

      return y;
    }();
  });

  var _Z,
      ot,
      de = u(function () {
    w();
    _Z = /*#__PURE__*/function () {
      function Z(t, e, r) {
        var _this$directionToFram;

        _classCallCheck(this, Z);

        this.sprite = t;
        this.walkingAnimationMapping = e;
        this.characterIndex = r;
        this.lastFootLeft = !1;
        this.directionToFrameRow = (_this$directionToFram = {}, _defineProperty(_this$directionToFram, a.DOWN, 0), _defineProperty(_this$directionToFram, a.DOWN_LEFT, 1), _defineProperty(_this$directionToFram, a.DOWN_RIGHT, 2), _defineProperty(_this$directionToFram, a.LEFT, 1), _defineProperty(_this$directionToFram, a.RIGHT, 2), _defineProperty(_this$directionToFram, a.UP, 3), _defineProperty(_this$directionToFram, a.UP_LEFT, 1), _defineProperty(_this$directionToFram, a.UP_RIGHT, 2), _this$directionToFram);
        this._isEnabled = !0;
      }

      _createClass(Z, [{
        key: "setIsEnabled",
        value: function setIsEnabled(t) {
          this._isEnabled = t;
        }
      }, {
        key: "isEnabled",
        value: function isEnabled() {
          return this._isEnabled;
        }
      }, {
        key: "updateCharacterFrame",
        value: function updateCharacterFrame(t, e) {
          this._isEnabled && (e ? this.setStandingFrameDuringWalk(t) : this.setWalkingFrame(t));
        }
      }, {
        key: "setStandingFrame",
        value: function setStandingFrame(t) {
          this._isEnabled && this._setStandingFrame(t);
        }
      }, {
        key: "setWalkingAnimationMapping",
        value: function setWalkingAnimationMapping(t) {
          this.walkingAnimationMapping = t;
        }
      }, {
        key: "setStandingFrameDuringWalk",
        value: function setStandingFrameDuringWalk(t) {
          this.isCurrentFrameStanding(t) || (this.lastFootLeft = !this.lastFootLeft), this._setStandingFrame(t);
        }
      }, {
        key: "setWalkingFrame",
        value: function setWalkingFrame(t) {
          var e = this.framesOfDirection(t);
          this.sprite.setFrame(this.lastFootLeft ? e.rightFoot : e.leftFoot);
        }
      }, {
        key: "_setStandingFrame",
        value: function _setStandingFrame(t) {
          this.sprite.setFrame(this.framesOfDirection(t).standing);
        }
      }, {
        key: "isCurrentFrameStanding",
        value: function isCurrentFrameStanding(t) {
          return Number(this.sprite.frame.name) == this.framesOfDirection(t).standing;
        }
      }, {
        key: "framesOfDirection",
        value: function framesOfDirection(t) {
          return this.walkingAnimationMapping ? this.getFramesForAnimationMapping(t) : this.getFramesForCharIndex(t);
        }
      }, {
        key: "getFramesForAnimationMapping",
        value: function getFramesForAnimationMapping(t) {
          return this.walkingAnimationMapping[t] || this.walkingAnimationMapping[this.fallbackDirection(t)];
        }
      }, {
        key: "fallbackDirection",
        value: function fallbackDirection(t) {
          switch (t) {
            case a.DOWN_LEFT:
              return a.LEFT;

            case a.DOWN_RIGHT:
              return a.RIGHT;

            case a.UP_LEFT:
              return a.LEFT;

            case a.UP_RIGHT:
              return a.RIGHT;
          }

          return t;
        }
      }, {
        key: "getFramesForCharIndex",
        value: function getFramesForCharIndex(t) {
          var e = this.sprite.texture.source[0].width / this.sprite.width / _Z.FRAMES_CHAR_ROW,
              r = Math.floor(this.characterIndex / e),
              i = this.characterIndex % e,
              n = e * _Z.FRAMES_CHAR_ROW,
              s = _Z.FRAMES_CHAR_ROW * i,
              p = this.directionToFrameRow[t] + r * _Z.FRAMES_CHAR_COL,
              l = s + p * n;
          return {
            rightFoot: l,
            standing: l + 1,
            leftFoot: l + 2
          };
        }
      }]);

      return Z;
    }(), ot = _Z;
    ot.FRAMES_CHAR_ROW = 3, ot.FRAMES_CHAR_COL = 4;
  });

  var Ie = he(function (vi, vt) {
    var ge, be, ve, ye, xe, Te, Pe, Se, Ce, gt, It, _e, Ee, we, _J, De, Oe, Le, Me, Fe, Re, Ae, ke, bt;

    (function (o) {
      var t = (typeof global === "undefined" ? "undefined" : _typeof(global)) == "object" ? global : (typeof self === "undefined" ? "undefined" : _typeof(self)) == "object" ? self : _typeof(this) == "object" ? this : {};
      typeof define == "function" && define.amd ? define("tslib", ["exports"], function (r) {
        o(e(t, e(r)));
      }) : _typeof(vt) == "object" && _typeof(vt.exports) == "object" ? o(e(t, e(vt.exports))) : o(e(t));

      function e(r, i) {
        return r !== t && (typeof Object.create == "function" ? Object.defineProperty(r, "__esModule", {
          value: !0
        }) : r.__esModule = !0), function (n, s) {
          return r[n] = i ? i(n, s) : s;
        };
      }
    })(function (o) {
      var t = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (r, i) {
        r.__proto__ = i;
      } || function (r, i) {
        for (var n in i) {
          Object.prototype.hasOwnProperty.call(i, n) && (r[n] = i[n]);
        }
      };

      ge = function ge(r, i) {
        if (typeof i != "function" && i !== null) throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        t(r, i);

        function n() {
          this.constructor = r;
        }

        r.prototype = i === null ? Object.create(i) : (n.prototype = i.prototype, new n());
      }, be = Object.assign || function (r) {
        for (var i, n = 1, s = arguments.length; n < s; n++) {
          i = arguments[n];

          for (var p in i) {
            Object.prototype.hasOwnProperty.call(i, p) && (r[p] = i[p]);
          }
        }

        return r;
      }, ve = function ve(r, i) {
        var n = {};

        for (var s in r) {
          Object.prototype.hasOwnProperty.call(r, s) && i.indexOf(s) < 0 && (n[s] = r[s]);
        }

        if (r != null && typeof Object.getOwnPropertySymbols == "function") for (var p = 0, s = Object.getOwnPropertySymbols(r); p < s.length; p++) {
          i.indexOf(s[p]) < 0 && Object.prototype.propertyIsEnumerable.call(r, s[p]) && (n[s[p]] = r[s[p]]);
        }
        return n;
      }, ye = function ye(r, i, n, s) {
        var p = arguments.length,
            l = p < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, n) : s,
            c;
        if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) == "object" && typeof Reflect.decorate == "function") l = Reflect.decorate(r, i, n, s);else for (var f = r.length - 1; f >= 0; f--) {
          (c = r[f]) && (l = (p < 3 ? c(l) : p > 3 ? c(i, n, l) : c(i, n)) || l);
        }
        return p > 3 && l && Object.defineProperty(i, n, l), l;
      }, xe = function xe(r, i) {
        return function (n, s) {
          i(n, s, r);
        };
      }, Te = function Te(r, i) {
        if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) == "object" && typeof Reflect.metadata == "function") return Reflect.metadata(r, i);
      }, Pe = function Pe(r, i, n, s) {
        function p(l) {
          return l instanceof n ? l : new n(function (c) {
            c(l);
          });
        }

        return new (n || (n = Promise))(function (l, c) {
          function f(b) {
            try {
              m(s.next(b));
            } catch (A) {
              c(A);
            }
          }

          function T(b) {
            try {
              m(s.throw(b));
            } catch (A) {
              c(A);
            }
          }

          function m(b) {
            b.done ? l(b.value) : p(b.value).then(f, T);
          }

          m((s = s.apply(r, i || [])).next());
        });
      }, Se = function Se(r, i) {
        var n = {
          label: 0,
          sent: function sent() {
            if (l[0] & 1) throw l[1];
            return l[1];
          },
          trys: [],
          ops: []
        },
            s,
            p,
            l,
            c;
        return c = {
          next: f(0),
          throw: f(1),
          return: f(2)
        }, typeof Symbol == "function" && (c[Symbol.iterator] = function () {
          return this;
        }), c;

        function f(m) {
          return function (b) {
            return T([m, b]);
          };
        }

        function T(m) {
          if (s) throw new TypeError("Generator is already executing.");

          for (; n;) {
            try {
              if (s = 1, p && (l = m[0] & 2 ? p.return : m[0] ? p.throw || ((l = p.return) && l.call(p), 0) : p.next) && !(l = l.call(p, m[1])).done) return l;

              switch (p = 0, l && (m = [m[0] & 2, l.value]), m[0]) {
                case 0:
                case 1:
                  l = m;
                  break;

                case 4:
                  return n.label++, {
                    value: m[1],
                    done: !1
                  };

                case 5:
                  n.label++, p = m[1], m = [0];
                  continue;

                case 7:
                  m = n.ops.pop(), n.trys.pop();
                  continue;

                default:
                  if (l = n.trys, !(l = l.length > 0 && l[l.length - 1]) && (m[0] === 6 || m[0] === 2)) {
                    n = 0;
                    continue;
                  }

                  if (m[0] === 3 && (!l || m[1] > l[0] && m[1] < l[3])) {
                    n.label = m[1];
                    break;
                  }

                  if (m[0] === 6 && n.label < l[1]) {
                    n.label = l[1], l = m;
                    break;
                  }

                  if (l && n.label < l[2]) {
                    n.label = l[2], n.ops.push(m);
                    break;
                  }

                  l[2] && n.ops.pop(), n.trys.pop();
                  continue;
              }

              m = i.call(r, n);
            } catch (b) {
              m = [6, b], p = 0;
            } finally {
              s = l = 0;
            }
          }

          if (m[0] & 5) throw m[1];
          return {
            value: m[0] ? m[1] : void 0,
            done: !0
          };
        }
      }, Ce = function Ce(r, i) {
        for (var n in r) {
          n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && bt(i, r, n);
        }
      }, bt = Object.create ? function (r, i, n, s) {
        s === void 0 && (s = n), Object.defineProperty(r, s, {
          enumerable: !0,
          get: function get() {
            return i[n];
          }
        });
      } : function (r, i, n, s) {
        s === void 0 && (s = n), r[s] = i[n];
      }, gt = function gt(r) {
        var i = typeof Symbol == "function" && Symbol.iterator,
            n = i && r[i],
            s = 0;
        if (n) return n.call(r);
        if (r && typeof r.length == "number") return {
          next: function next() {
            return r && s >= r.length && (r = void 0), {
              value: r && r[s++],
              done: !r
            };
          }
        };
        throw new TypeError(i ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, It = function It(r, i) {
        var n = typeof Symbol == "function" && r[Symbol.iterator];
        if (!n) return r;
        var s = n.call(r),
            p,
            l = [],
            c;

        try {
          for (; (i === void 0 || i-- > 0) && !(p = s.next()).done;) {
            l.push(p.value);
          }
        } catch (f) {
          c = {
            error: f
          };
        } finally {
          try {
            p && !p.done && (n = s.return) && n.call(s);
          } finally {
            if (c) throw c.error;
          }
        }

        return l;
      }, _e = function _e() {
        for (var r = [], i = 0; i < arguments.length; i++) {
          r = r.concat(It(arguments[i]));
        }

        return r;
      }, Ee = function Ee() {
        for (var r = 0, i = 0, n = arguments.length; i < n; i++) {
          r += arguments[i].length;
        }

        for (var s = Array(r), p = 0, i = 0; i < n; i++) {
          for (var l = arguments[i], c = 0, f = l.length; c < f; c++, p++) {
            s[p] = l[c];
          }
        }

        return s;
      }, we = function we(r, i) {
        for (var n = 0, s = i.length, p = r.length; n < s; n++, p++) {
          r[p] = i[n];
        }

        return r;
      }, _J = function J(r) {
        return this instanceof _J ? (this.v = r, this) : new _J(r);
      }, De = function De(r, i, n) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var s = n.apply(r, i || []),
            p,
            l = [];
        return p = {}, c("next"), c("throw"), c("return"), p[Symbol.asyncIterator] = function () {
          return this;
        }, p;

        function c(d) {
          s[d] && (p[d] = function (K) {
            return new Promise(function (Rt, Wr) {
              l.push([d, K, Rt, Wr]) > 1 || f(d, K);
            });
          });
        }

        function f(d, K) {
          try {
            T(s[d](K));
          } catch (Rt) {
            A(l[0][3], Rt);
          }
        }

        function T(d) {
          d.value instanceof _J ? Promise.resolve(d.value.v).then(m, b) : A(l[0][2], d);
        }

        function m(d) {
          f("next", d);
        }

        function b(d) {
          f("throw", d);
        }

        function A(d, K) {
          d(K), l.shift(), l.length && f(l[0][0], l[0][1]);
        }
      }, Oe = function Oe(r) {
        var i, n;
        return i = {}, s("next"), s("throw", function (p) {
          throw p;
        }), s("return"), i[Symbol.iterator] = function () {
          return this;
        }, i;

        function s(p, l) {
          i[p] = r[p] ? function (c) {
            return (n = !n) ? {
              value: _J(r[p](c)),
              done: p === "return"
            } : l ? l(c) : c;
          } : l;
        }
      }, Le = function Le(r) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var i = r[Symbol.asyncIterator],
            n;
        return i ? i.call(r) : (r = typeof gt == "function" ? gt(r) : r[Symbol.iterator](), n = {}, s("next"), s("throw"), s("return"), n[Symbol.asyncIterator] = function () {
          return this;
        }, n);

        function s(l) {
          n[l] = r[l] && function (c) {
            return new Promise(function (f, T) {
              c = r[l](c), p(f, T, c.done, c.value);
            });
          };
        }

        function p(l, c, f, T) {
          Promise.resolve(T).then(function (m) {
            l({
              value: m,
              done: f
            });
          }, c);
        }
      }, Me = function Me(r, i) {
        return Object.defineProperty ? Object.defineProperty(r, "raw", {
          value: i
        }) : r.raw = i, r;
      };
      var e = Object.create ? function (r, i) {
        Object.defineProperty(r, "default", {
          enumerable: !0,
          value: i
        });
      } : function (r, i) {
        r.default = i;
      };
      Fe = function Fe(r) {
        if (r && r.__esModule) return r;
        var i = {};
        if (r != null) for (var n in r) {
          n !== "default" && Object.prototype.hasOwnProperty.call(r, n) && bt(i, r, n);
        }
        return e(i, r), i;
      }, Re = function Re(r) {
        return r && r.__esModule ? r : {
          default: r
        };
      }, Ae = function Ae(r, i) {
        if (!i.has(r)) throw new TypeError("attempted to get private field on non-instance");
        return i.get(r);
      }, ke = function ke(r, i, n) {
        if (!i.has(r)) throw new TypeError("attempted to set private field on non-instance");
        return i.set(r, n), n;
      }, o("__extends", ge), o("__assign", be), o("__rest", ve), o("__decorate", ye), o("__param", xe), o("__metadata", Te), o("__awaiter", Pe), o("__generator", Se), o("__exportStar", Ce), o("__createBinding", bt), o("__values", gt), o("__read", It), o("__spread", _e), o("__spreadArrays", Ee), o("__spreadArray", we), o("__await", _J), o("__asyncGenerator", De), o("__asyncDelegator", Oe), o("__asyncValues", Le), o("__makeTemplateObject", Me), o("__importStar", Fe), o("__importDefault", Re), o("__classPrivateFieldGet", Ae), o("__classPrivateFieldSet", ke);
    });
  });

  var Ne,
      k,
      yi,
      xi,
      Ti,
      Pi,
      Si,
      Ge,
      yt,
      Ci,
      _i,
      B,
      V,
      Ei,
      wi,
      H,
      xt,
      We,
      Di,
      Ue,
      Oi,
      Li,
      Mi,
      Fi,
      Ri,
      I = u(function () {
    var _Ne$default;

    Ne = Xr(Ie()), (_Ne$default = Ne.default, k = _Ne$default.__extends, yi = _Ne$default.__assign, xi = _Ne$default.__rest, Ti = _Ne$default.__decorate, Pi = _Ne$default.__param, Si = _Ne$default.__metadata, Ge = _Ne$default.__awaiter, yt = _Ne$default.__generator, Ci = _Ne$default.__exportStar, _i = _Ne$default.__createBinding, B = _Ne$default.__values, V = _Ne$default.__read, Ei = _Ne$default.__spread, wi = _Ne$default.__spreadArrays, H = _Ne$default.__spreadArray, xt = _Ne$default.__await, We = _Ne$default.__asyncGenerator, Di = _Ne$default.__asyncDelegator, Ue = _Ne$default.__asyncValues, Oi = _Ne$default.__makeTemplateObject, Li = _Ne$default.__importStar, Mi = _Ne$default.__importDefault, Fi = _Ne$default.__classPrivateFieldGet, Ri = _Ne$default.__classPrivateFieldSet, _Ne$default);
  });

  function g(o) {
    return typeof o == "function";
  }

  var O = u(function () {});

  function Tt(o) {
    var t = function t(r) {
      Error.call(r), r.stack = new Error().stack;
    },
        e = o(t);

    return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e;
  }

  var Nt = u(function () {});
  var Pt,
      Be = u(function () {
    Nt();
    Pt = Tt(function (o) {
      return function (e) {
        o(this), this.message = e ? e.length + " errors occurred during unsubscription:\n" + e.map(function (r, i) {
          return i + 1 + ") " + r.toString();
        }).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = e;
      };
    });
  });

  function nt(o, t) {
    if (o) {
      var e = o.indexOf(t);
      0 <= e && o.splice(e, 1);
    }
  }

  var Gt = u(function () {});

  function St(o) {
    return o instanceof Q || o && "closed" in o && g(o.remove) && g(o.add) && g(o.unsubscribe);
  }

  function Ve(o) {
    g(o) ? o() : o.unsubscribe();
  }

  var Q,
      Wt,
      Ct = u(function () {
    I();
    O();
    Be();
    Gt();
    Q = function () {
      function o(t) {
        this.initialTeardown = t, this.closed = !1, this._parentage = null, this._teardowns = null;
      }

      return o.prototype.unsubscribe = function () {
        var t, e, r, i, n;

        if (!this.closed) {
          this.closed = !0;
          var s = this._parentage;
          if (s) if (this._parentage = null, Array.isArray(s)) try {
            for (var p = B(s), l = p.next(); !l.done; l = p.next()) {
              var c = l.value;
              c.remove(this);
            }
          } catch (d) {
            t = {
              error: d
            };
          } finally {
            try {
              l && !l.done && (e = p.return) && e.call(p);
            } finally {
              if (t) throw t.error;
            }
          } else s.remove(this);
          var f = this.initialTeardown;
          if (g(f)) try {
            f();
          } catch (d) {
            n = d instanceof Pt ? d.errors : [d];
          }
          var T = this._teardowns;

          if (T) {
            this._teardowns = null;

            try {
              for (var m = B(T), b = m.next(); !b.done; b = m.next()) {
                var A = b.value;

                try {
                  Ve(A);
                } catch (d) {
                  n = n != null ? n : [], d instanceof Pt ? n = H(H([], V(n)), V(d.errors)) : n.push(d);
                }
              }
            } catch (d) {
              r = {
                error: d
              };
            } finally {
              try {
                b && !b.done && (i = m.return) && i.call(m);
              } finally {
                if (r) throw r.error;
              }
            }
          }

          if (n) throw new Pt(n);
        }
      }, o.prototype.add = function (t) {
        var e;
        if (t && t !== this) if (this.closed) Ve(t);else {
          if (t instanceof o) {
            if (t.closed || t._hasParent(this)) return;

            t._addParent(this);
          }

          (this._teardowns = (e = this._teardowns) !== null && e !== void 0 ? e : []).push(t);
        }
      }, o.prototype._hasParent = function (t) {
        var e = this._parentage;
        return e === t || Array.isArray(e) && e.includes(t);
      }, o.prototype._addParent = function (t) {
        var e = this._parentage;
        this._parentage = Array.isArray(e) ? (e.push(t), e) : e ? [e, t] : t;
      }, o.prototype._removeParent = function (t) {
        var e = this._parentage;
        e === t ? this._parentage = null : Array.isArray(e) && nt(e, t);
      }, o.prototype.remove = function (t) {
        var e = this._teardowns;
        e && nt(e, t), t instanceof o && t._removeParent(this);
      }, o.EMPTY = function () {
        var t = new o();
        return t.closed = !0, t;
      }(), o;
    }(), Wt = Q.EMPTY;
  });
  var L,
      at = u(function () {
    L = {
      onUnhandledError: null,
      onStoppedNotification: null,
      Promise: void 0,
      useDeprecatedSynchronousErrorHandling: !1,
      useDeprecatedNextContext: !1
    };
  });
  var tt,
      Ut = u(function () {
    I();
    tt = {
      setTimeout: function (_setTimeout) {
        function setTimeout() {
          return _setTimeout.apply(this, arguments);
        }

        setTimeout.toString = function () {
          return _setTimeout.toString();
        };

        return setTimeout;
      }(function () {
        for (var o = [], t = 0; t < arguments.length; t++) {
          o[t] = arguments[t];
        }

        var e = tt.delegate;
        return ((e == null ? void 0 : e.setTimeout) || setTimeout).apply(void 0, H([], V(o)));
      }),
      clearTimeout: function (_clearTimeout) {
        function clearTimeout(_x) {
          return _clearTimeout.apply(this, arguments);
        }

        clearTimeout.toString = function () {
          return _clearTimeout.toString();
        };

        return clearTimeout;
      }(function (o) {
        var t = tt.delegate;
        return ((t == null ? void 0 : t.clearTimeout) || clearTimeout)(o);
      }),
      delegate: void 0
    };
  });

  function _t(o) {
    tt.setTimeout(function () {
      var t = L.onUnhandledError;
      if (t) t(o);else throw o;
    });
  }

  var Bt = u(function () {
    at();
    Ut();
  });

  function j() {}

  var Vt = u(function () {});

  function je(o) {
    return Ht("E", void 0, o);
  }

  function $e(o) {
    return Ht("N", o, void 0);
  }

  function Ht(o, t, e) {
    return {
      kind: o,
      value: t,
      error: e
    };
  }

  var He,
      ze = u(function () {
    He = function () {
      return Ht("C", void 0, void 0);
    }();
  });

  function et(o) {
    if (L.useDeprecatedSynchronousErrorHandling) {
      var t = !$;

      if (t && ($ = {
        errorThrown: !1,
        error: null
      }), o(), t) {
        var e = $,
            r = e.errorThrown,
            i = e.error;
        if ($ = null, r) throw i;
      }
    } else o();
  }

  function Ye(o) {
    L.useDeprecatedSynchronousErrorHandling && $ && ($.errorThrown = !0, $.error = o);
  }

  var $,
      Et = u(function () {
    at();
    $ = null;
  });

  function $t(o, t) {
    return function () {
      for (var e = [], r = 0; r < arguments.length; r++) {
        e[r] = arguments[r];
      }

      try {
        o.apply(void 0, H([], V(e)));
      } catch (i) {
        L.useDeprecatedSynchronousErrorHandling ? Ye(i) : _t(i);
      }
    };
  }

  function Ke(o) {
    throw o;
  }

  function zt(o, t) {
    var e = L.onStoppedNotification;
    e && tt.setTimeout(function () {
      return e(o, t);
    });
  }

  var st,
      jt,
      qr,
      Yt = u(function () {
    I();
    O();
    Ct();
    at();
    Bt();
    Vt();
    ze();
    Ut();
    Et();
    st = function (o) {
      k(t, o);

      function t(e) {
        var r = o.call(this) || this;
        return r.isStopped = !1, e ? (r.destination = e, St(e) && e.add(r)) : r.destination = qr, r;
      }

      return t.create = function (e, r, i) {
        return new jt(e, r, i);
      }, t.prototype.next = function (e) {
        this.isStopped ? zt($e(e), this) : this._next(e);
      }, t.prototype.error = function (e) {
        this.isStopped ? zt(je(e), this) : (this.isStopped = !0, this._error(e));
      }, t.prototype.complete = function () {
        this.isStopped ? zt(He, this) : (this.isStopped = !0, this._complete());
      }, t.prototype.unsubscribe = function () {
        this.closed || (this.isStopped = !0, o.prototype.unsubscribe.call(this), this.destination = null);
      }, t.prototype._next = function (e) {
        this.destination.next(e);
      }, t.prototype._error = function (e) {
        try {
          this.destination.error(e);
        } finally {
          this.unsubscribe();
        }
      }, t.prototype._complete = function () {
        try {
          this.destination.complete();
        } finally {
          this.unsubscribe();
        }
      }, t;
    }(Q), jt = function (o) {
      k(t, o);

      function t(e, r, i) {
        var n = o.call(this) || this,
            s;
        if (g(e)) s = e;else if (e) {
          s = e.next, r = e.error, i = e.complete;
          var p;
          n && L.useDeprecatedNextContext ? (p = Object.create(e), p.unsubscribe = function () {
            return n.unsubscribe();
          }) : p = e, s = s == null ? void 0 : s.bind(p), r = r == null ? void 0 : r.bind(p), i = i == null ? void 0 : i.bind(p);
        }
        return n.destination = {
          next: s ? $t(s, n) : j,
          error: $t(r != null ? r : Ke, n),
          complete: i ? $t(i, n) : j
        }, n;
      }

      return t;
    }(st);
    qr = {
      closed: !0,
      next: j,
      error: Ke,
      complete: j
    };
  });
  var rt,
      wt = u(function () {
    rt = function () {
      return typeof Symbol == "function" && Symbol.observable || "@@observable";
    }();
  });

  function Xe(o) {
    return o;
  }

  var qe = u(function () {});

  function Ze(o) {
    return o.length === 0 ? Xe : o.length === 1 ? o[0] : function (e) {
      return o.reduce(function (r, i) {
        return i(r);
      }, e);
    };
  }

  var Je = u(function () {
    qe();
  });

  function Qe(o) {
    var t;
    return (t = o != null ? o : L.Promise) !== null && t !== void 0 ? t : Promise;
  }

  function Zr(o) {
    return o && g(o.next) && g(o.error) && g(o.complete);
  }

  function Jr(o) {
    return o && o instanceof st || Zr(o) && St(o);
  }

  var D,
      Dt = u(function () {
    Yt();
    Ct();
    wt();
    Je();
    at();
    O();
    Et();

    D = function () {
      function o(t) {
        t && (this._subscribe = t);
      }

      return o.prototype.lift = function (t) {
        var e = new o();
        return e.source = this, e.operator = t, e;
      }, o.prototype.subscribe = function (t, e, r) {
        var i = this,
            n = Jr(t) ? t : new jt(t, e, r);
        return et(function () {
          var s = i,
              p = s.operator,
              l = s.source;
          n.add(p ? p.call(n, l) : l ? i._subscribe(n) : i._trySubscribe(n));
        }), n;
      }, o.prototype._trySubscribe = function (t) {
        try {
          return this._subscribe(t);
        } catch (e) {
          t.error(e);
        }
      }, o.prototype.forEach = function (t, e) {
        var r = this;
        return e = Qe(e), new e(function (i, n) {
          var s;
          s = r.subscribe(function (p) {
            try {
              t(p);
            } catch (l) {
              n(l), s == null || s.unsubscribe();
            }
          }, n, i);
        });
      }, o.prototype._subscribe = function (t) {
        var e;
        return (e = this.source) === null || e === void 0 ? void 0 : e.subscribe(t);
      }, o.prototype[rt] = function () {
        return this;
      }, o.prototype.pipe = function () {
        for (var t = [], e = 0; e < arguments.length; e++) {
          t[e] = arguments[e];
        }

        return Ze(t)(this);
      }, o.prototype.toPromise = function (t) {
        var e = this;
        return t = Qe(t), new t(function (r, i) {
          var n;
          e.subscribe(function (s) {
            return n = s;
          }, function (s) {
            return i(s);
          }, function () {
            return r(n);
          });
        });
      }, o.create = function (t) {
        return new o(t);
      }, o;
    }();
  });

  function Qr(o) {
    return g(o == null ? void 0 : o.lift);
  }

  function N(o) {
    return function (t) {
      if (Qr(t)) return t.lift(function (e) {
        try {
          return o(e, this);
        } catch (r) {
          this.error(r);
        }
      });
      throw new TypeError("Unable to lift unknown Observable type");
    };
  }

  var lt = u(function () {
    O();
  });
  var G,
      pt = u(function () {
    I();
    Yt();

    G = function (o) {
      k(t, o);

      function t(e, r, i, n, s) {
        var p = o.call(this, e) || this;
        return p.onFinalize = s, p._next = r ? function (l) {
          try {
            r(l);
          } catch (c) {
            e.error(c);
          }
        } : o.prototype._next, p._error = n ? function (l) {
          try {
            n(l);
          } catch (c) {
            e.error(c);
          } finally {
            this.unsubscribe();
          }
        } : o.prototype._error, p._complete = i ? function () {
          try {
            i();
          } catch (l) {
            e.error(l);
          } finally {
            this.unsubscribe();
          }
        } : o.prototype._complete, p;
      }

      return t.prototype.unsubscribe = function () {
        var e,
            r = this.closed;
        o.prototype.unsubscribe.call(this), !r && ((e = this.onFinalize) === null || e === void 0 || e.call(this));
      }, t;
    }(st);
  });
  var tr,
      er = u(function () {
    Nt();
    tr = Tt(function (o) {
      return function () {
        o(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
      };
    });
  });
  var v,
      rr,
      ir = u(function () {
    I();
    Dt();
    Ct();
    er();
    Gt();
    Et();
    v = function (o) {
      k(t, o);

      function t() {
        var e = o.call(this) || this;
        return e.closed = !1, e.observers = [], e.isStopped = !1, e.hasError = !1, e.thrownError = null, e;
      }

      return t.prototype.lift = function (e) {
        var r = new rr(this, this);
        return r.operator = e, r;
      }, t.prototype._throwIfClosed = function () {
        if (this.closed) throw new tr();
      }, t.prototype.next = function (e) {
        var r = this;
        et(function () {
          var i, n;

          if (r._throwIfClosed(), !r.isStopped) {
            var s = r.observers.slice();

            try {
              for (var p = B(s), l = p.next(); !l.done; l = p.next()) {
                var c = l.value;
                c.next(e);
              }
            } catch (f) {
              i = {
                error: f
              };
            } finally {
              try {
                l && !l.done && (n = p.return) && n.call(p);
              } finally {
                if (i) throw i.error;
              }
            }
          }
        });
      }, t.prototype.error = function (e) {
        var r = this;
        et(function () {
          if (r._throwIfClosed(), !r.isStopped) {
            r.hasError = r.isStopped = !0, r.thrownError = e;

            for (var i = r.observers; i.length;) {
              i.shift().error(e);
            }
          }
        });
      }, t.prototype.complete = function () {
        var e = this;
        et(function () {
          if (e._throwIfClosed(), !e.isStopped) {
            e.isStopped = !0;

            for (var r = e.observers; r.length;) {
              r.shift().complete();
            }
          }
        });
      }, t.prototype.unsubscribe = function () {
        this.isStopped = this.closed = !0, this.observers = null;
      }, Object.defineProperty(t.prototype, "observed", {
        get: function get() {
          var e;
          return ((e = this.observers) === null || e === void 0 ? void 0 : e.length) > 0;
        },
        enumerable: !1,
        configurable: !0
      }), t.prototype._trySubscribe = function (e) {
        return this._throwIfClosed(), o.prototype._trySubscribe.call(this, e);
      }, t.prototype._subscribe = function (e) {
        return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e);
      }, t.prototype._innerSubscribe = function (e) {
        var r = this,
            i = r.hasError,
            n = r.isStopped,
            s = r.observers;
        return i || n ? Wt : (s.push(e), new Q(function () {
          return nt(s, e);
        }));
      }, t.prototype._checkFinalizedStatuses = function (e) {
        var r = this,
            i = r.hasError,
            n = r.thrownError,
            s = r.isStopped;
        i ? e.error(n) : s && e.complete();
      }, t.prototype.asObservable = function () {
        var e = new D();
        return e.source = this, e;
      }, t.create = function (e, r) {
        return new rr(e, r);
      }, t;
    }(D), rr = function (o) {
      k(t, o);

      function t(e, r) {
        var i = o.call(this) || this;
        return i.destination = e, i.source = r, i;
      }

      return t.prototype.next = function (e) {
        var r, i;
        (i = (r = this.destination) === null || r === void 0 ? void 0 : r.next) === null || i === void 0 || i.call(r, e);
      }, t.prototype.error = function (e) {
        var r, i;
        (i = (r = this.destination) === null || r === void 0 ? void 0 : r.error) === null || i === void 0 || i.call(r, e);
      }, t.prototype.complete = function () {
        var e, r;
        (r = (e = this.destination) === null || e === void 0 ? void 0 : e.complete) === null || r === void 0 || r.call(e);
      }, t.prototype._subscribe = function (e) {
        var r, i;
        return (i = (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(e)) !== null && i !== void 0 ? i : Wt;
      }, t;
    }(v);
  });
  var or,
      nr = u(function () {
    Dt();
    or = new D(function (o) {
      return o.complete();
    });
  });
  var ar,
      sr = u(function () {
    ar = function ar(o) {
      return o && typeof o.length == "number" && typeof o != "function";
    };
  });

  function lr(o) {
    return g(o == null ? void 0 : o.then);
  }

  var pr = u(function () {
    O();
  });

  function ti() {
    return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
  }

  var cr,
      hr = u(function () {
    cr = ti();
  });

  function ur(o) {
    return g(o[rt]);
  }

  var mr = u(function () {
    wt();
    O();
  });

  function fr(o) {
    return g(o == null ? void 0 : o[cr]);
  }

  var dr = u(function () {
    hr();
    O();
  });

  function gr(o) {
    return Symbol.asyncIterator && g(o == null ? void 0 : o[Symbol.asyncIterator]);
  }

  var br = u(function () {
    O();
  });

  function vr(o) {
    return new TypeError("You provided " + (o !== null && _typeof(o) == "object" ? "an invalid object" : "'" + o + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
  }

  var yr = u(function () {});

  function xr(o) {
    return We(this, arguments, function () {
      var e, r, i, n;
      return yt(this, function (s) {
        switch (s.label) {
          case 0:
            e = o.getReader(), s.label = 1;

          case 1:
            s.trys.push([1,, 9, 10]), s.label = 2;

          case 2:
            return [4, xt(e.read())];

          case 3:
            return r = s.sent(), i = r.value, n = r.done, n ? [4, xt(void 0)] : [3, 5];

          case 4:
            return [2, s.sent()];

          case 5:
            return [4, xt(i)];

          case 6:
            return [4, s.sent()];

          case 7:
            return s.sent(), [3, 2];

          case 8:
            return [3, 10];

          case 9:
            return e.releaseLock(), [7];

          case 10:
            return [2];
        }
      });
    });
  }

  function Tr(o) {
    return g(o == null ? void 0 : o.getReader);
  }

  var Pr = u(function () {
    I();
    O();
  });

  function Sr(o) {
    if (o instanceof D) return o;

    if (o != null) {
      if (ur(o)) return ei(o);
      if (ar(o)) return ri(o);
      if (lr(o)) return ii(o);
      if (gr(o)) return Cr(o);
      if (fr(o)) return oi(o);
      if (Tr(o)) return ni(o);
    }

    throw vr(o);
  }

  function ei(o) {
    return new D(function (t) {
      var e = o[rt]();
      if (g(e.subscribe)) return e.subscribe(t);
      throw new TypeError("Provided object does not correctly implement Symbol.observable");
    });
  }

  function ri(o) {
    return new D(function (t) {
      for (var e = 0; e < o.length && !t.closed; e++) {
        t.next(o[e]);
      }

      t.complete();
    });
  }

  function ii(o) {
    return new D(function (t) {
      o.then(function (e) {
        t.closed || (t.next(e), t.complete());
      }, function (e) {
        return t.error(e);
      }).then(null, _t);
    });
  }

  function oi(o) {
    return new D(function (t) {
      var e, r;

      try {
        for (var i = B(o), n = i.next(); !n.done; n = i.next()) {
          var s = n.value;
          if (t.next(s), t.closed) return;
        }
      } catch (p) {
        e = {
          error: p
        };
      } finally {
        try {
          n && !n.done && (r = i.return) && r.call(i);
        } finally {
          if (e) throw e.error;
        }
      }

      t.complete();
    });
  }

  function Cr(o) {
    return new D(function (t) {
      ai(o, t).catch(function (e) {
        return t.error(e);
      });
    });
  }

  function ni(o) {
    return Cr(xr(o));
  }

  function ai(o, t) {
    var e, r, i, n;
    return Ge(this, void 0, void 0, function () {
      var s, p;
      return yt(this, function (l) {
        switch (l.label) {
          case 0:
            l.trys.push([0, 5, 6, 11]), e = Ue(o), l.label = 1;

          case 1:
            return [4, e.next()];

          case 2:
            if (r = l.sent(), !!r.done) return [3, 4];
            if (s = r.value, t.next(s), t.closed) return [2];
            l.label = 3;

          case 3:
            return [3, 1];

          case 4:
            return [3, 11];

          case 5:
            return p = l.sent(), i = {
              error: p
            }, [3, 11];

          case 6:
            return l.trys.push([6,, 9, 10]), r && !r.done && (n = e.return) ? [4, n.call(e)] : [3, 8];

          case 7:
            l.sent(), l.label = 8;

          case 8:
            return [3, 10];

          case 9:
            if (i) throw i.error;
            return [7];

          case 10:
            return [7];

          case 11:
            return t.complete(), [2];
        }
      });
    });
  }

  var _r = u(function () {
    I();
    sr();
    pr();
    wt();
    Dt();
    O();
    Bt();
    mr();
    br();
    yr();
    dr();
    Pr();
  });

  function Kt(o, t) {
    return N(function (e, r) {
      var i = 0;
      e.subscribe(new G(r, function (n) {
        r.next(o.call(t, n, i++));
      }));
    });
  }

  var Er = u(function () {
    lt();
    pt();
  });

  function Xt(o, t) {
    return N(function (e, r) {
      var i = 0;
      e.subscribe(new G(r, function (n) {
        return o.call(t, n, i++) && r.next(n);
      }));
    });
  }

  var wr = u(function () {
    lt();
    pt();
  });
  var Dr = u(function () {});

  function it(o) {
    return o <= 0 ? function () {
      return or;
    } : N(function (t, e) {
      var r = 0;
      t.subscribe(new G(e, function (i) {
        ++r <= o && (e.next(i), o <= r && e.complete());
      }));
    });
  }

  var qt = u(function () {
    nr();
    lt();
    pt();
  });

  function z(o) {
    return N(function (t, e) {
      Sr(o).subscribe(new G(e, function () {
        return e.complete();
      }, j)), !e.closed && t.subscribe(e);
    });
  }

  var Or = u(function () {
    lt();
    pt();

    _r();

    Vt();
  });
  var Ot = u(function () {
    ir();
    Dr();
    qt();
  });
  var ct,
      Zt = u(function () {
    de();
    q();
    w();
    w();
    Ot();
    F();

    ct = /*#__PURE__*/function () {
      function ct(t, e) {
        _classCallCheck(this, ct);

        this.id = t;
        this.movementDirection = a.NONE;
        this.tileSizePixelsWalked = h.ZERO.clone();
        this._nextTilePos = {
          position: new h(0, 0),
          layer: void 0
        };
        this._tilePos = {
          position: new h(0, 0),
          layer: void 0
        };
        this.movementStarted$ = new v();
        this.movementStopped$ = new v();
        this.directionChanged$ = new v();
        this.positionChangeStarted$ = new v();
        this.positionChangeFinished$ = new v();
        this.tilePositionSet$ = new v();
        this.autoMovementSet$ = new v();
        this.lastMovementImpulse = a.NONE;
        this.facingDirection = a.DOWN;
        this.characterIndex = -1;
        typeof e.walkingAnimationMapping == "number" ? this.characterIndex = e.walkingAnimationMapping : this.walkingAnimationMapping = e.walkingAnimationMapping, this.container = e.container, this.tilemap = e.tilemap, this.speed = e.speed, this.collides = e.collides, this.customOffset = new h(e.offsetX || 0, e.offsetY || 0), this.tileSize = e.tileSize.clone(), this._tilePos.layer = e.charLayer, this.sprite = e.sprite, this._setSprite(this.sprite);
      }

      _createClass(ct, [{
        key: "getId",
        value: function getId() {
          return this.id;
        }
      }, {
        key: "getSpeed",
        value: function getSpeed() {
          return this.speed;
        }
      }, {
        key: "setSpeed",
        value: function setSpeed(t) {
          this.speed = t;
        }
      }, {
        key: "getSprite",
        value: function getSprite() {
          return this.sprite;
        }
      }, {
        key: "setSprite",
        value: function setSprite(t) {
          this._setSprite(t);
        }
      }, {
        key: "setMovement",
        value: function setMovement(t) {
          var e;
          this.autoMovementSet$.next(), this.movement = t, (e = this.movement) == null || e.setCharacter(this);
        }
      }, {
        key: "getMovement",
        value: function getMovement() {
          return this.movement;
        }
      }, {
        key: "setWalkingAnimationMapping",
        value: function setWalkingAnimationMapping(t) {
          this.animation.setWalkingAnimationMapping(t);
        }
      }, {
        key: "setTilePosition",
        value: function setTilePosition(t) {
          this.isMoving() && this.movementStopped$.next(this.movementDirection), this.tilePositionSet$.next(R({}, t)), this.positionChangeStarted$.next({
            exitTile: this.tilePos.position,
            enterTile: t.position,
            exitLayer: this.tilePos.layer,
            enterLayer: t.layer
          }), this.positionChangeFinished$.next({
            exitTile: this.tilePos.position,
            enterTile: t.position,
            exitLayer: this.tilePos.layer,
            enterLayer: t.layer
          }), this.movementDirection = a.NONE, this.lastMovementImpulse = a.NONE, this.nextTilePos = t, this.tilePos = t, this.updateZindex(), this.setPosition(this.tilePosToPixelPos(t.position).add(this.getOffset()).add(this.customOffset));
        }
      }, {
        key: "getTilePos",
        value: function getTilePos() {
          return this.tilePos;
        }
      }, {
        key: "getNextTilePos",
        value: function getNextTilePos() {
          return this.nextTilePos;
        }
      }, {
        key: "move",
        value: function move(t) {
          this.lastMovementImpulse = t, t != a.NONE && (this.isMoving() || (this.isBlockingDirection(t) ? (this.facingDirection = t, this.animation.setStandingFrame(t), this.directionChanged$.next(t)) : this.startMoving(t)));
        }
      }, {
        key: "update",
        value: function update(t) {
          var e;
          (e = this.movement) == null || e.update(t), this.isMoving() && (this.updateCharacterPosition(t), this.updateZindex()), this.lastMovementImpulse = a.NONE;
        }
      }, {
        key: "getMovementDirection",
        value: function getMovementDirection() {
          return this.movementDirection;
        }
      }, {
        key: "isBlockingDirection",
        value: function isBlockingDirection(t) {
          if (t == a.NONE || !this.collides) return !1;
          var e = this.tilePosInDirection(t),
              r = this.tilemap.getTransition(e, this.nextTilePos.layer) || this.nextTilePos.layer,
              i = this.tilemap.hasBlockingTile(r, e, fe(this.toMapDirection(t))),
              n = this.tilemap.hasBlockingChar(e, r);
          return i || n;
        }
      }, {
        key: "isMoving",
        value: function isMoving() {
          return this.movementDirection != a.NONE;
        }
      }, {
        key: "turnTowards",
        value: function turnTowards(t) {
          this.isMoving() || t != a.NONE && (this.facingDirection = t, this.animation.setStandingFrame(t));
        }
      }, {
        key: "getFacingDirection",
        value: function getFacingDirection() {
          return this.facingDirection;
        }
      }, {
        key: "getFacingPosition",
        value: function getFacingPosition() {
          return this._tilePos.position.add(U(this.facingDirection));
        }
      }, {
        key: "movementStarted",
        value: function movementStarted() {
          return this.movementStarted$;
        }
      }, {
        key: "movementStopped",
        value: function movementStopped() {
          return this.movementStopped$;
        }
      }, {
        key: "directionChanged",
        value: function directionChanged() {
          return this.directionChanged$;
        }
      }, {
        key: "tilePositionSet",
        value: function tilePositionSet() {
          return this.tilePositionSet$;
        }
      }, {
        key: "positionChangeStarted",
        value: function positionChangeStarted() {
          return this.positionChangeStarted$;
        }
      }, {
        key: "positionChangeFinished",
        value: function positionChangeFinished() {
          return this.positionChangeFinished$;
        }
      }, {
        key: "autoMovementSet",
        value: function autoMovementSet() {
          return this.autoMovementSet$;
        }
      }, {
        key: "isColliding",
        value: function isColliding() {
          return this.collides;
        }
      }, {
        key: "tilePosToPixelPos",
        value: function tilePosToPixelPos(t) {
          return t.clone().multiply(this.tileSize);
        }
      }, {
        key: "getTileDistance",
        value: function getTileDistance(t) {
          return this.tileSize.clone();
        }
      }, {
        key: "toMapDirection",
        value: function toMapDirection(t) {
          return t;
        }
      }, {
        key: "_setSprite",
        value: function _setSprite(t) {
          t.setOrigin(0, 0), t.x = this.sprite.x, t.y = this.sprite.y, this.sprite = t, this.animation = new ot(this.sprite, this.walkingAnimationMapping, this.characterIndex), this.animation.setIsEnabled(this.walkingAnimationMapping !== void 0 || this.characterIndex !== -1), this.animation.setStandingFrame(a.DOWN), this.updateZindex();
        }
      }, {
        key: "getOffset",
        value: function getOffset() {
          var t = this.tileSize.x / 2 - Math.floor(this.sprite.width * this.sprite.scale / 2),
              e = -(this.sprite.height * this.sprite.scale) + this.tileSize.y;
          return new h(t, e);
        }
      }, {
        key: "createSpeedPixelsPerSecond",
        value: function createSpeedPixelsPerSecond() {
          var _t2,
              _this = this;

          var t = (_t2 = {}, _defineProperty(_t2, a.LEFT, new h(this.tileSize.x, 0)), _defineProperty(_t2, a.RIGHT, new h(this.tileSize.x, 0)), _defineProperty(_t2, a.UP, new h(0, this.tileSize.y)), _defineProperty(_t2, a.DOWN, new h(0, this.tileSize.y)), _defineProperty(_t2, a.UP_LEFT, this.getTileDistance(a.UP_LEFT)), _defineProperty(_t2, a.UP_RIGHT, this.getTileDistance(a.UP_RIGHT)), _defineProperty(_t2, a.DOWN_LEFT, this.getTileDistance(a.DOWN_LEFT)), _defineProperty(_t2, a.DOWN_RIGHT, this.getTileDistance(a.DOWN_RIGHT)), _defineProperty(_t2, a.NONE, h.ZERO.clone()), _t2);
          return Object.entries(t).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                e = _ref2[0],
                r = _ref2[1];

            t[e] = _y.scalarMult(r, _this.speed);
          }), t;
        }
      }, {
        key: "nextTilePos",
        get: function get() {
          return {
            position: this._nextTilePos.position.clone(),
            layer: this._nextTilePos.layer
          };
        },
        set: function set(t) {
          this._nextTilePos.position.x = t.position.x, this._nextTilePos.position.y = t.position.y, this._nextTilePos.layer = t.layer;
        }
      }, {
        key: "tilePos",
        get: function get() {
          return {
            position: this._tilePos.position.clone(),
            layer: this._tilePos.layer
          };
        },
        set: function set(t) {
          this._tilePos.position.x = t.position.x, this._tilePos.position.y = t.position.y, this._tilePos.layer = t.layer;
        }
      }, {
        key: "updateZindex",
        value: function updateZindex() {
          (this.container || this.sprite).setDepth(this.tilemap.getDepthOfCharLayer(this.nextTilePos.layer) + this.mapDepth(this.nextTilePos));
        }
      }, {
        key: "mapDepth",
        value: function mapDepth(t) {
          return t.position.y;
        }
      }, {
        key: "setPosition",
        value: function setPosition(t) {
          var e = this.container || this.sprite;
          e.x = t.x, e.y = t.y;
        }
      }, {
        key: "getPosition",
        value: function getPosition() {
          var t = this.container || this.sprite;
          return new h(t.x, t.y);
        }
      }, {
        key: "startMoving",
        value: function startMoving(t) {
          t !== a.NONE && (t != this.movementDirection && this.movementStarted$.next(t), this.movementDirection = t, this.facingDirection = t, this.updateTilePos());
        }
      }, {
        key: "updateTilePos",
        value: function updateTilePos() {
          this.tilePos = this.nextTilePos;
          var t = this.tilePosInDirection(this.movementDirection),
              r = this.tilemap.getTransition(t, this.tilePos.layer) || this.tilePos.layer;
          this.nextTilePos = {
            position: t,
            layer: r
          }, this.positionChangeStarted$.next({
            exitTile: this.tilePos.position,
            enterTile: t,
            exitLayer: this.tilePos.layer,
            enterLayer: r
          });
        }
      }, {
        key: "tilePosInDirection",
        value: function tilePosInDirection(t) {
          return this.nextTilePos.position.add(U(this.toMapDirection(t)));
        }
      }, {
        key: "getDistToNextTile",
        value: function getDistToNextTile() {
          return this.getTileDistance(this.movementDirection).clone().subtract(this.tileSizePixelsWalked).multiply(U(this.movementDirection));
        }
      }, {
        key: "updateCharacterPosition",
        value: function updateCharacterPosition(t) {
          var e = this.getSpeedPerDelta(t),
              r = this.getDistToNextTile(),
              i = r.length() <= e.length(),
              n = i ? r : e;
          this.moveCharacterSprite(n), i && (this.shouldContinueMoving() ? (this.positionChangeFinished$.next({
            exitTile: this.tilePos.position,
            enterTile: this.nextTilePos.position,
            exitLayer: this.tilePos.layer,
            enterLayer: this.nextTilePos.layer
          }), this.startMoving(this.lastMovementImpulse), this.updateCharacterPosition(t * this.getProportionWalked(e, r))) : this.stopMoving());
        }
      }, {
        key: "getProportionWalked",
        value: function getProportionWalked(t, e) {
          var i = t.subtract(e).divide(t);
          return isNaN(i.x) && (i.x = 0), Math.max(Math.abs(i.x), Math.abs(i.y));
        }
      }, {
        key: "shouldContinueMoving",
        value: function shouldContinueMoving() {
          return this.lastMovementImpulse !== a.NONE && !this.isBlockingDirection(this.lastMovementImpulse);
        }
      }, {
        key: "getSpeedPerDelta",
        value: function getSpeedPerDelta(t) {
          var e = t / 1e3;
          return this.createSpeedPixelsPerSecond()[this.movementDirection].clone().multiply(new h(e, e)).multiply(U(this.movementDirection));
        }
      }, {
        key: "moveCharacterSprite",
        value: function moveCharacterSprite(t) {
          var e = this.getPosition().add(t);
          this.setPosition(e), this.tileSizePixelsWalked.x += Math.abs(t.x), this.tileSizePixelsWalked.y += Math.abs(t.y), this.animation.updateCharacterFrame(this.movementDirection, this.hasWalkedHalfATile()), this.tileSizePixelsWalked.x %= this.getTileDistance(this.movementDirection).x, this.tileSizePixelsWalked.y %= this.getTileDistance(this.movementDirection).y;
        }
      }, {
        key: "stopMoving",
        value: function stopMoving() {
          if (this.movementDirection === a.NONE) return;
          var t = this.tilePos,
              e = this.nextTilePos,
              r = this.movementDirection;
          this.tilePos = this.nextTilePos, this.movementDirection = a.NONE, this.movementStopped$.next(r), this.positionChangeFinished$.next({
            exitTile: t.position,
            enterTile: e.position,
            exitLayer: t.layer,
            enterLayer: e.layer
          });
        }
      }, {
        key: "hasWalkedHalfATile",
        value: function hasWalkedHalfATile() {
          return this.tileSizePixelsWalked.x > this.getTileDistance(this.movementDirection).x / 2 || this.tileSizePixelsWalked.y > this.getTileDistance(this.movementDirection).y / 2;
        }
      }]);

      return ct;
    }();
  });
  var Jt,
      Lr = u(function () {
    w();
    F();
    q();
    Zt();

    Jt = /*#__PURE__*/function (_ct) {
      _inherits(Jt, _ct);

      var _super = _createSuper(Jt);

      function Jt() {
        _classCallCheck(this, Jt);

        return _super.apply(this, arguments);
      }

      _createClass(Jt, [{
        key: "tilePosToPixelPos",
        value: function tilePosToPixelPos(t) {
          return this.getTileDistance(a.UP_LEFT).multiply(new h(t.x - t.y, t.x + t.y));
        }
      }, {
        key: "getTileDistance",
        value: function getTileDistance(t) {
          switch (t) {
            case a.DOWN_LEFT:
            case a.DOWN_RIGHT:
            case a.UP_LEFT:
            case a.UP_RIGHT:
              return _y.scalarMult(this.tileSize, .5);

            default:
              return _get(_getPrototypeOf(Jt.prototype), "getTileDistance", this).call(this, t);
          }
        }
      }, {
        key: "toMapDirection",
        value: function toMapDirection(t) {
          return me(t);
        }
      }, {
        key: "mapDepth",
        value: function mapDepth(t) {
          return t.position.x + t.position.y;
        }
      }]);

      return Jt;
    }(ct);
  });
  var Lt = u(function () {
    wr();
    Er();
    qt();
    Or();
  });
  var Qt,
      Mr = u(function () {
    q();

    Qt = /*#__PURE__*/function () {
      function Qt() {
        _classCallCheck(this, Qt);
      }

      _createClass(Qt, [{
        key: "getShortestPath",
        value: function getShortestPath(t, e, r) {
          var i = this.shortestPathBfs(t, e, r);
          return {
            path: this.returnPath(i.previous, t, e),
            closestToTarget: i.closestToTarget
          };
        }
      }, {
        key: "distance",
        value: function distance(t, e) {
          return _y.manhattanDistance(t.position, e.position);
        }
      }, {
        key: "pos2Str",
        value: function pos2Str(t) {
          return "".concat(t.position.toString(), "#").concat(t.layer);
        }
      }, {
        key: "equal",
        value: function equal(t, e) {
          return _y.equal(t.position, e.position) ? t.layer === e.layer : !1;
        }
      }, {
        key: "shortestPathBfs",
        value: function shortestPathBfs(t, e, r) {
          var i = new Map(),
              n = new Set(),
              s = [],
              p = t,
              l = this.distance(t, e);

          for (s.push({
            node: t,
            dist: 0
          }), n.add(this.pos2Str(t)); s.length > 0;) {
            var _s$shift = s.shift(),
                c = _s$shift.node,
                f = _s$shift.dist,
                T = this.distance(c, e);

            if (T < l && (l = T, p = c), this.equal(c, e)) return {
              shortestDistance: f,
              previous: i,
              closestToTarget: p
            };

            var _iterator3 = _createForOfIteratorHelper(r(c)),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var m = _step3.value;
                n.has(this.pos2Str(m)) || (i.set(this.pos2Str(m), c), s.push({
                  node: m,
                  dist: f + 1
                }), n.add(this.pos2Str(m)));
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }

          return {
            shortestDistance: -1,
            previous: i,
            closestToTarget: p
          };
        }
      }, {
        key: "returnPath",
        value: function returnPath(t, e, r) {
          var i = [],
              n = r;

          for (i.push(n); !this.equal(n, e);) {
            if (n = t.get(this.pos2Str(n)), !n) return [];
            i.push(n);
          }

          return i.reverse();
        }
      }]);

      return Qt;
    }();
  });
  var Mt,
      Fr = u(function () {
    Mt = /*#__PURE__*/function () {
      function Mt(t, e, r) {
        _classCallCheck(this, Mt);

        this.backoffMs = t;
        this.maxRetries = e;
        this.onFinished = r;
        this.retries = 0;
        this.elapsed = 0;
      }

      _createClass(Mt, [{
        key: "retry",
        value: function retry(t, e) {
          this.shouldRetry() ? (this.elapsed += t, this.elapsed >= this.backoffMs && (this.elapsed = 0, this.retries++, e())) : this.onFinished();
        }
      }, {
        key: "reset",
        value: function reset() {
          this.retries = 0, this.elapsed = 0;
        }
      }, {
        key: "getMaxRetries",
        value: function getMaxRetries() {
          return this.maxRetries;
        }
      }, {
        key: "shouldRetry",
        value: function shouldRetry() {
          return this.maxRetries === -1 || this.retries < this.maxRetries;
        }
      }]);

      return Mt;
    }();
  });
  var ht,
      te = u(function () {
    q();
    w();
    F();

    ht = /*#__PURE__*/function () {
      function ht() {
        _classCallCheck(this, ht);
      }

      _createClass(ht, [{
        key: "distance",
        value: function distance(t, e) {
          return _y.chebyshevDistance(t, e);
        }
      }, {
        key: "neighbours",
        value: function neighbours(t) {
          var e = [new h(t.x, t.y + 1), new h(t.x + 1, t.y), new h(t.x - 1, t.y), new h(t.x, t.y - 1)],
              r = [new h(t.x + 1, t.y + 1), new h(t.x + 1, t.y - 1), new h(t.x - 1, t.y + 1), new h(t.x - 1, t.y - 1)];
          return [].concat(e, r);
        }
      }, {
        key: "direction",
        value: function direction(t, e) {
          return e.x > t.x ? e.y > t.y ? a.DOWN_RIGHT : e.y < t.y ? a.UP_RIGHT : a.RIGHT : e.x < t.x ? e.y > t.y ? a.DOWN_LEFT : e.y < t.y ? a.UP_LEFT : a.LEFT : e.y < t.y ? a.UP : e.y > t.y ? a.DOWN : a.NONE;
        }
      }]);

      return ht;
    }();
  });
  var Y,
      ee = u(function () {
    q();
    w();
    F();

    Y = /*#__PURE__*/function () {
      function Y() {
        _classCallCheck(this, Y);
      }

      _createClass(Y, [{
        key: "distance",
        value: function distance(t, e) {
          return _y.manhattanDistance(t, e);
        }
      }, {
        key: "direction",
        value: function direction(t, e) {
          if (_y.equal(t, e)) return a.NONE;
          var r = t.clone().subtract(e);
          return Math.abs(r.x) > Math.abs(r.y) ? r.x > 0 ? a.LEFT : a.RIGHT : r.y > 0 ? a.UP : a.DOWN;
        }
      }, {
        key: "neighbours",
        value: function neighbours(t) {
          return [new h(t.x, t.y + 1), new h(t.x + 1, t.y), new h(t.x - 1, t.y), new h(t.x, t.y - 1)];
        }
      }]);

      return Y;
    }();
  });
  var S,
      Ft = u(function () {
    (function (r) {
      r.STOP = "STOP", r.CLOSEST_REACHABLE = "CLOSEST_REACHABLE", r.RETRY = "RETRY";
    })(S || (S = {}));
  });
  var M,
      re = u(function () {
    (function (r) {
      r.WAIT = "WAIT", r.RETRY = "RETRY", r.STOP = "STOP";
    })(M || (M = {}));
  });
  var x,
      ut,
      ie = u(function () {
    w();
    Mr();
    Fr();
    te();
    ee();
    Ft();
    re();
    Ot();

    (function (p) {
      p.SUCCESS = "SUCCESS", p.NO_PATH_FOUND_MAX_RETRIES_EXCEEDED = "NO_PATH_FOUND_MAX_RETRIES_EXCEEDED", p.PATH_BLOCKED_MAX_RETRIES_EXCEEDED = "PATH_BLOCKED_MAX_RETRIES_EXCEEDED", p.PATH_BLOCKED = "PATH_BLOCKED", p.NO_PATH_FOUND = "NO_PATH_FOUND", p.PATH_BLOCKED_WAIT_TIMEOUT = "PATH_BLOCKED_WAIT_TIMEOUT", p.MOVEMENT_TERMINATED = "MOVEMENT_TERMINATED";
    })(x || (x = {}));

    ut = /*#__PURE__*/function () {
      function ut(t, e) {
        var _this2 = this;

        var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var i = arguments.length > 3 ? arguments[3] : undefined;

        _classCallCheck(this, ut);

        this.tilemap = t;
        this.targetPos = e;
        this.distance = r;
        this.posOnPath = 0;
        this.stopped = !1;
        this.distanceUtils = new Y();

        this.getNeighbours = function (t) {
          return _this2.distanceUtils.neighbours(t.position).filter(function (i) {
            return !_this2.isBlocking(i, t.layer);
          }).map(function (i) {
            var n = _this2.tilemap.getTransition(i, t.layer);

            return {
              position: i,
              layer: n || t.layer
            };
          });
        };

        this.isBlocking = function (t, e) {
          return !t || _this2.tilemap.isBlocking(e, t);
        };

        this.noPathFoundStrategy = (i == null ? void 0 : i.noPathFoundStrategy) || S.STOP, this.pathBlockedStrategy = (i == null ? void 0 : i.pathBlockedStrategy) || M.WAIT, this.noPathFoundRetryable = new Mt((i == null ? void 0 : i.noPathFoundRetryBackoffMs) || 200, (i == null ? void 0 : i.noPathFoundMaxRetries) || -1, function () {
          _this2.stop(x.NO_PATH_FOUND_MAX_RETRIES_EXCEEDED);
        }), this.pathBlockedRetryable = new Mt((i == null ? void 0 : i.pathBlockedRetryBackoffMs) || 200, (i == null ? void 0 : i.pathBlockedMaxRetries) || -1, function () {
          _this2.stop(x.PATH_BLOCKED_MAX_RETRIES_EXCEEDED);
        }), this.pathBlockedWaitTimeoutMs = (i == null ? void 0 : i.pathBlockedWaitTimeoutMs) || -1, this.finished$ = new v();
      }

      _createClass(ut, [{
        key: "setPathBlockedStrategy",
        value: function setPathBlockedStrategy(t) {
          this.pathBlockedStrategy = t;
        }
      }, {
        key: "getPathBlockedStrategy",
        value: function getPathBlockedStrategy() {
          return this.pathBlockedStrategy;
        }
      }, {
        key: "setNumberOfDirections",
        value: function setNumberOfDirections(t) {
          t === _.EIGHT ? this.distanceUtils = new ht() : this.distanceUtils = new Y();
        }
      }, {
        key: "setCharacter",
        value: function setCharacter(t) {
          var _this3 = this;

          this.character = t, this.noPathFoundRetryable.reset(), this.pathBlockedRetryable.reset(), this.pathBlockedWaitElapsed = 0, this.calcShortestPath(), this.character.autoMovementSet().pipe(it(1)).subscribe(function () {
            _this3.stop(x.MOVEMENT_TERMINATED);
          });
        }
      }, {
        key: "update",
        value: function update(t) {
          var _this4 = this;

          var e, r, i, n;
          this.stopped || (this.noPathFound() && (this.noPathFoundStrategy === S.RETRY ? this.noPathFoundRetryable.retry(t, function () {
            return _this4.calcShortestPath();
          }) : this.noPathFoundStrategy === S.STOP && this.stop(x.NO_PATH_FOUND)), this.updatePosOnPath(), this.isBlocking((e = this.nextTileOnPath()) == null ? void 0 : e.position, (r = this.character) == null ? void 0 : r.getNextTilePos().layer) ? this.applyPathBlockedStrategy(t) : this.pathBlockedWaitElapsed = 0, this.hasArrived() ? (this.stop(x.SUCCESS), this.existsDistToTarget() && this.turnTowardsTarget()) : this.isBlocking((i = this.nextTileOnPath()) == null ? void 0 : i.position, (n = this.character) == null ? void 0 : n.getNextTilePos().layer) || this.moveCharOnPath());
        }
      }, {
        key: "finishedObs",
        value: function finishedObs() {
          return this.finished$;
        }
      }, {
        key: "resultToReason",
        value: function resultToReason(t) {
          switch (t) {
            case x.SUCCESS:
              return "Successfully arrived.";

            case x.MOVEMENT_TERMINATED:
              return "Movement of character has been replaced before destination was reached.";

            case x.PATH_BLOCKED:
              return "PathBlockedStrategy STOP: Path blocked.";

            case x.NO_PATH_FOUND_MAX_RETRIES_EXCEEDED:
              return "NoPathFoundStrategy RETRY: Maximum retries of ".concat(this.noPathFoundRetryable.getMaxRetries(), " exceeded.");

            case x.NO_PATH_FOUND:
              return "NoPathFoundStrategy STOP: No path found.";

            case x.PATH_BLOCKED_MAX_RETRIES_EXCEEDED:
              return "PathBlockedStrategy RETRY: Maximum retries of ".concat(this.pathBlockedRetryable.getMaxRetries(), " exceeded.");

            case x.PATH_BLOCKED_WAIT_TIMEOUT:
              return "PathBlockedStrategy WAIT: Wait timeout of ".concat(this.pathBlockedWaitTimeoutMs, "ms exceeded.");
          }
        }
      }, {
        key: "applyPathBlockedStrategy",
        value: function applyPathBlockedStrategy(t) {
          var _this5 = this;

          this.pathBlockedStrategy === M.RETRY ? this.pathBlockedRetryable.retry(t, function () {
            return _this5.calcShortestPath();
          }) : this.pathBlockedStrategy === M.STOP ? this.stop(x.PATH_BLOCKED) : this.pathBlockedStrategy === M.WAIT && this.pathBlockedWaitTimeoutMs > -1 && (this.pathBlockedWaitElapsed += t, this.pathBlockedWaitElapsed >= this.pathBlockedWaitTimeoutMs && this.stop(x.PATH_BLOCKED_WAIT_TIMEOUT));
        }
      }, {
        key: "moveCharOnPath",
        value: function moveCharOnPath() {
          var t = this.getDir(this.character.getNextTilePos().position, this.nextTileOnPath().position);
          this.character.move(t);
        }
      }, {
        key: "nextTileOnPath",
        value: function nextTileOnPath() {
          return this.shortestPath[this.posOnPath + 1];
        }
      }, {
        key: "stop",
        value: function stop(t) {
          this.finished$.next({
            position: this.character.getTilePos().position,
            result: t,
            description: this.resultToReason(t),
            layer: this.character.getTilePos().layer
          }), this.finished$.complete(), this.stopped = !0;
        }
      }, {
        key: "turnTowardsTarget",
        value: function turnTowardsTarget() {
          var t = this.shortestPath[this.posOnPath + 1],
              e = this.getDir(this.character.getNextTilePos().position, t.position);
          this.character.turnTowards(e);
        }
      }, {
        key: "existsDistToTarget",
        value: function existsDistToTarget() {
          return this.posOnPath < this.shortestPath.length - 1;
        }
      }, {
        key: "hasArrived",
        value: function hasArrived() {
          return !this.noPathFound() && this.posOnPath + Math.max(0, this.distance - this.distOffset) >= this.shortestPath.length - 1;
        }
      }, {
        key: "updatePosOnPath",
        value: function updatePosOnPath() {
          var t = this.shortestPath[this.posOnPath];

          for (; this.posOnPath < this.shortestPath.length - 1 && (this.character.getNextTilePos().position.x != t.position.x || this.character.getNextTilePos().position.y != t.position.y);) {
            this.posOnPath++, t = this.shortestPath[this.posOnPath];
          }
        }
      }, {
        key: "noPathFound",
        value: function noPathFound() {
          return this.shortestPath.length === 0;
        }
      }, {
        key: "calcShortestPath",
        value: function calcShortestPath() {
          var t = this.getShortestPath();
          this.posOnPath = 0, this.shortestPath = t.path, this.distOffset = t.distOffset;
        }
      }, {
        key: "getShortestPath",
        value: function getShortestPath() {
          var t = new Qt(),
              _t$getShortestPath = t.getShortestPath(this.character.getNextTilePos(), this.targetPos, this.getNeighbours),
              e = _t$getShortestPath.path,
              r = _t$getShortestPath.closestToTarget;

          if (e.length == 0 && this.noPathFoundStrategy === S.CLOSEST_REACHABLE) {
            var n = t.getShortestPath(this.character.getNextTilePos(), r, this.getNeighbours).path,
                s = this.distanceUtils.distance(r.position, this.targetPos.position);
            return {
              path: n,
              distOffset: s
            };
          }

          return {
            path: e,
            distOffset: 0
          };
        }
      }, {
        key: "getDir",
        value: function getDir(t, e) {
          return this.distanceUtils.direction(t, e);
        }
      }]);

      return ut;
    }();
  });
  var oe,
      Rr = u(function () {
    Lt();
    w();
    ie();
    F();
    Ft();

    oe = /*#__PURE__*/function () {
      function oe(t, e) {
        var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : S.STOP;

        _classCallCheck(this, oe);

        this.gridTilemap = t;
        this.charToFollow = e;
        this.distance = r;
        this.noPathFoundStrategy = i;
        this.numberOfDirections = _.FOUR;
      }

      _createClass(oe, [{
        key: "setNumberOfDirections",
        value: function setNumberOfDirections(t) {
          this.numberOfDirections = t;
        }
      }, {
        key: "setCharacter",
        value: function setCharacter(t) {
          var _this6 = this;

          this.character = t, this.updateTarget(this.charToFollow.getTilePos().position, this.charToFollow.getTilePos().layer), this.charToFollow.positionChangeStarted().pipe(z(this.character.autoMovementSet())).subscribe(function (_ref3) {
            var e = _ref3.enterTile,
                r = _ref3.enterLayer;

            _this6.updateTarget(e, r);
          });
        }
      }, {
        key: "update",
        value: function update(t) {
          var e;
          (e = this.targetMovement) == null || e.update(t);
        }
      }, {
        key: "updateTarget",
        value: function updateTarget(t, e) {
          this.targetMovement = new ut(this.gridTilemap, {
            position: new h(t),
            layer: e
          }, this.distance + 1, {
            noPathFoundStrategy: this.noPathFoundStrategy
          }), this.targetMovement.setNumberOfDirections(this.numberOfDirections), this.targetMovement.setCharacter(this.character);
        }
      }]);

      return oe;
    }();
  });
  var ne,
      Ar = u(function () {
    dt();
    At();

    ne = /*#__PURE__*/function () {
      function ne() {
        _classCallCheck(this, ne);

        this.tilePosToCharacters = new Map();
        this.positionChangeStartedSubs = new Map();
        this.tilePosSetSubs = new Map();
        this.positionChangeFinishedSubs = new Map();
      }

      _createClass(ne, [{
        key: "isCharBlockingAt",
        value: function isCharBlockingAt(t, e) {
          var r = this.posToString(t, e);
          return this.tilePosToCharacters.has(r) && this.tilePosToCharacters.get(r).size > 0 && _toConsumableArray(this.tilePosToCharacters.get(r)).some(function (i) {
            return i.isColliding();
          });
        }
      }, {
        key: "addCharacter",
        value: function addCharacter(t) {
          this.add(this.posToString(t.getTilePos().position, t.getTilePos().layer), t), this.add(this.posToString(t.getNextTilePos().position, t.getNextTilePos().layer), t), this.addPositionChangeSub(t), this.addPositionChangeFinishedSub(t), this.addTilePosSetSub(t);
        }
      }, {
        key: "removeCharacter",
        value: function removeCharacter(t) {
          var e = t.getId();
          this.positionChangeStartedSubs.get(e).unsubscribe(), this.positionChangeFinishedSubs.get(e).unsubscribe(), this.tilePosSetSubs.get(e).unsubscribe(), this.tilePosToCharacters.get(this.posToString(t.getTilePos().position, t.getTilePos().layer)).delete(t), this.tilePosToCharacters.get(this.posToString(t.getNextTilePos().position, t.getNextTilePos().layer)).delete(t);
        }
      }, {
        key: "add",
        value: function add(t, e) {
          this.tilePosToCharacters.has(t) || this.tilePosToCharacters.set(t, new Set()), this.tilePosToCharacters.get(t).add(e);
        }
      }, {
        key: "addTilePosSetSub",
        value: function addTilePosSetSub(t) {
          var _this7 = this;

          var e = t.tilePositionSet().subscribe(function (r) {
            _this7.tilePosToCharacters.get(_this7.posToString(t.getNextTilePos().position, t.getNextTilePos().layer)).delete(t);
          });
          this.tilePosSetSubs.set(t.getId(), e);
        }
      }, {
        key: "addPositionChangeSub",
        value: function addPositionChangeSub(t) {
          var _this8 = this;

          var e = t.positionChangeStarted().subscribe(function (r) {
            _P.get().characterCollisionStrategy === X.BLOCK_ONE_TILE_AHEAD && _this8.tilePosToCharacters.get(_this8.posToString(r.exitTile, r.exitLayer)).delete(t), _this8.add(_this8.posToString(r.enterTile, r.enterLayer), t);
          });
          this.positionChangeStartedSubs.set(t.getId(), e);
        }
      }, {
        key: "addPositionChangeFinishedSub",
        value: function addPositionChangeFinishedSub(t) {
          var _this9 = this;

          var e = t.positionChangeFinished().subscribe(function (r) {
            _this9.tilePosToCharacters.get(_this9.posToString(r.exitTile, r.exitLayer)).delete(t);
          });
          this.positionChangeFinishedSubs.set(t.getId(), e);
        }
      }, {
        key: "posToString",
        value: function posToString(t, e) {
          return "".concat(t.x, "#").concat(t.y, "#").concat(e);
        }
      }]);

      return ne;
    }();
  });

  var _E,
      W,
      kr = u(function () {
    dt();
    Ar();
    _E = /*#__PURE__*/function () {
      function E(t) {
        _classCallCheck(this, E);

        this.tilemap = t;
        this.characters = new Map();
        this.charBlockCache = new ne();
        this.visLayerDepths = new Map();
        this.transitions = new Map();
        this.setLayerDepths();
      }

      _createClass(E, [{
        key: "addCharacter",
        value: function addCharacter(t) {
          this.characters.set(t.getId(), t), t.getNextTilePos().layer === void 0 && t.setTilePosition(ft(R({}, t.getNextTilePos()), {
            layer: this.getLowestCharLayer()
          })), this.charBlockCache.addCharacter(t);
        }
      }, {
        key: "removeCharacter",
        value: function removeCharacter(t) {
          this.charBlockCache.removeCharacter(this.characters.get(t)), this.characters.delete(t);
        }
      }, {
        key: "getCharacters",
        value: function getCharacters() {
          return _toConsumableArray(this.characters.values());
        }
      }, {
        key: "isBlocking",
        value: function isBlocking(t, e, r) {
          return this.hasNoTile(e) || this.hasBlockingTile(t, e, r) || this.hasBlockingChar(e, t);
        }
      }, {
        key: "hasBlockingTile",
        value: function hasBlockingTile(t, e, r) {
          var _this10 = this;

          return this.hasNoTile(e) ? !0 : this.getCollisionRelevantLayers(t).some(function (i) {
            return _this10.isLayerBlockingAt(i, e, r);
          });
        }
      }, {
        key: "getTransition",
        value: function getTransition(t, e) {
          var r = this.transitions.get(t.toString());
          if (r) return r.get(e);
        }
      }, {
        key: "setTransition",
        value: function setTransition(t, e, r) {
          this.transitions.has(t.toString()) || this.transitions.set(t.toString(), new Map()), this.transitions.get(t.toString()).set(e, r);
        }
      }, {
        key: "getTransitions",
        value: function getTransitions() {
          return new Map(_toConsumableArray(this.transitions).map(function (_ref4) {
            var _ref5 = _slicedToArray(_ref4, 2),
                t = _ref5[0],
                e = _ref5[1];

            return [t, new Map(e)];
          }));
        }
      }, {
        key: "hasNoTile",
        value: function hasNoTile(t) {
          var _this11 = this;

          return !this.tilemap.layers.some(function (e) {
            return _this11.tilemap.hasTileAt(t.x, t.y, e.name);
          });
        }
      }, {
        key: "hasBlockingChar",
        value: function hasBlockingChar(t, e) {
          return this.charBlockCache.isCharBlockingAt(t, e);
        }
      }, {
        key: "getTileWidth",
        value: function getTileWidth() {
          var t = this.tilemap.layers[0].tilemapLayer.scale;
          return this.tilemap.tileWidth * t;
        }
      }, {
        key: "getTileHeight",
        value: function getTileHeight() {
          var t = this.tilemap.layers[0].tilemapLayer.scale;
          return this.tilemap.tileHeight * t;
        }
      }, {
        key: "getDepthOfCharLayer",
        value: function getDepthOfCharLayer(t) {
          return this.visLayerDepths.get(t) || 0;
        }
      }, {
        key: "isLayerBlockingAt",
        value: function isLayerBlockingAt(t, e, r) {
          var i = _E.ONE_WAY_COLLIDE_PROP_PREFIX + r,
              n = this.tilemap.getTileAt(e.x, e.y, !1, t.name);
          return Boolean((n == null ? void 0 : n.properties) && (n.properties[_P.get().collisionTilePropertyName] || n.properties[i]));
        }
      }, {
        key: "getCharLayerIndexes",
        value: function getCharLayerIndexes() {
          var _this12 = this;

          return this.tilemap.layers.map(function (t, e) {
            return {
              layer: t,
              index: e
            };
          }).filter(function (_ref6) {
            var t = _ref6.layer;
            return _this12.isCharLayer(t);
          }).map(function (_ref7) {
            var t = _ref7.index;
            return t;
          });
        }
      }, {
        key: "findPrevAndCharLayer",
        value: function findPrevAndCharLayer(t) {
          var _this13 = this;

          var e = this.getCharLayerIndexes(),
              r = e.findIndex(function (i) {
            return _this13.getLayerProp(_this13.tilemap.layers[i], _E.CHAR_LAYER_PROP_NAME) == t;
          });
          return r == 0 ? {
            prevIndex: -1,
            charLayerIndex: e[r]
          } : {
            prevIndex: e[r - 1],
            charLayerIndex: e[r]
          };
        }
      }, {
        key: "getCollisionRelevantLayers",
        value: function getCollisionRelevantLayers(t) {
          if (!t) return this.tilemap.layers;

          var _this$findPrevAndChar = this.findPrevAndCharLayer(t),
              e = _this$findPrevAndChar.prevIndex,
              r = _this$findPrevAndChar.charLayerIndex;

          return this.tilemap.layers.slice(e + 1, r + 1);
        }
      }, {
        key: "getLowestCharLayer",
        value: function getLowestCharLayer() {
          var _this14 = this;

          var t = this.tilemap.layers.find(function (e) {
            return _this14.hasLayerProp(e, _E.CHAR_LAYER_PROP_NAME);
          });
          if (t) return this.getLayerProp(t, _E.CHAR_LAYER_PROP_NAME);
        }
      }, {
        key: "getLayerProp",
        value: function getLayerProp(t, e) {
          var i = t.properties.find(function (n) {
            return n.name == e;
          });
          return i == null ? void 0 : i.value;
        }
      }, {
        key: "hasLayerProp",
        value: function hasLayerProp(t, e) {
          return this.getLayerProp(t, e) != null;
        }
      }, {
        key: "isLayerAlwaysOnTop",
        value: function isLayerAlwaysOnTop(t) {
          return this.hasLayerProp(t, _E.ALWAYS_TOP_PROP_NAME);
        }
      }, {
        key: "isCharLayer",
        value: function isCharLayer(t) {
          return this.hasLayerProp(t, _E.CHAR_LAYER_PROP_NAME);
        }
      }, {
        key: "setLayerDepths",
        value: function setLayerDepths() {
          var _this15 = this;

          var t = [],
              e = 0,
              r = [];
          this.tilemap.layers.forEach(function (i, n) {
            _this15.isLayerAlwaysOnTop(i) && r.push(i), _this15.hasLayerProp(i, _E.HEIGHT_SHIFT_PROP_NAME) ? (_this15.createLayerForEachRow(i, n, e), t.push(i.tilemapLayer), e += i.height) : i.tilemapLayer.setDepth(n + e), _this15.isCharLayer(i) && (_this15.visLayerDepths.set(_this15.getLayerProp(i, _E.CHAR_LAYER_PROP_NAME), n + e), e += _E.MAX_PLAYER_LAYERS);
          }), t.forEach(function (i) {
            return i.destroy();
          }), this.visLayerDepths.size == 0 && r.forEach(function (i, n) {
            i.tilemapLayer.setDepth(_E.MAX_PLAYER_LAYERS + n + e + _this15.tilemap.layers.length - r.length);
          });
        }
      }, {
        key: "createLayerForEachRow",
        value: function createLayerForEachRow(t, e, r) {
          var i = this.getLayerProp(t, _E.HEIGHT_SHIFT_PROP_NAME);

          for (var n = 0; n < t.height; n++) {
            var s = this.tilemap.createBlankLayer("".concat(e, "#").concat(n), t.tilemapLayer.tileset);

            for (var l = 0; l < t.width; l++) {
              s.putTileAt(t.data[n][l], l, n);
            }

            s.scale = t.tilemapLayer.scale;
            var p = .5;
            s.setDepth(r + n + i - 1 + p);
          }
        }
      }]);

      return E;
    }(), W = _E;
    W.MAX_PLAYER_LAYERS = 1e3, W.ALWAYS_TOP_PROP_NAME = "ge_alwaysTop", W.CHAR_LAYER_PROP_NAME = "ge_charLayer", W.HEIGHT_SHIFT_PROP_NAME = "ge_heightShift", W.ONE_WAY_COLLIDE_PROP_PREFIX = "ge_collide_";
  });

  var ae,
      Ir = u(function () {
    w();
    w();
    Lt();
    F();
    te();
    ee();

    ae = /*#__PURE__*/function () {
      function ae() {
        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

        _classCallCheck(this, ae);

        this.delay = t;
        this.radius = e;
        this.numberOfDirections = _.FOUR;
        this.distanceUtils = new Y();
      }

      _createClass(ae, [{
        key: "setNumberOfDirections",
        value: function setNumberOfDirections(t) {
          this.numberOfDirections = t, t === _.EIGHT ? this.distanceUtils = new ht() : this.distanceUtils = new Y();
        }
      }, {
        key: "setCharacter",
        value: function setCharacter(t) {
          var _this16 = this;

          this.character = t, this.delayLeft = this.delay, this.initialRow = t.getNextTilePos().position.y, this.initialCol = t.getNextTilePos().position.x, this.stepSize = this.getRandomInt(this.radius) + 1, this.stepsWalked = 0, this.currentMovementDirection = a.NONE, this.character.positionChangeStarted().pipe(z(this.character.autoMovementSet())).subscribe(function () {
            _this16.stepsWalked++;
          });
        }
      }, {
        key: "update",
        value: function update(t) {
          if (this.shouldContinueWalkingCurrentDirection()) this.character.move(this.currentMovementDirection);else if (this.delayLeft -= t, this.delayLeft <= 0) {
            this.delayLeft = this.delay;
            var e = this.getFreeRandomDirection();
            this.stepsWalked = 0, this.character.move(e), this.currentMovementDirection = e, this.stepSize = this.getRandomInt(this.radius) + 1;
          }
        }
      }, {
        key: "shouldContinueWalkingCurrentDirection",
        value: function shouldContinueWalkingCurrentDirection() {
          return this.stepsWalked < this.stepSize && this.currentMovementDirection !== a.NONE && !this.character.isBlockingDirection(this.currentMovementDirection) && this.isWithinRadius(this.currentMovementDirection);
        }
      }, {
        key: "getFreeDirections",
        value: function getFreeDirections() {
          var _this17 = this;

          return ue(this.numberOfDirections).filter(function (e) {
            return !_this17.character.isBlockingDirection(e);
          }).filter(function (e) {
            return _this17.isWithinRadius(e);
          });
        }
      }, {
        key: "isWithinRadius",
        value: function isWithinRadius(t) {
          return this.radius == -1 ? !0 : this.getDist(t) <= this.radius;
        }
      }, {
        key: "getDist",
        value: function getDist(t) {
          return this.distanceUtils.distance(this.character.getNextTilePos().position.add(U(t)), new h(this.initialCol, this.initialRow));
        }
      }, {
        key: "getFreeRandomDirection",
        value: function getFreeRandomDirection() {
          var t = this.getFreeDirections();
          return t.length == 0 ? a.NONE : t[this.getRandomInt(t.length)];
        }
      }, {
        key: "getRandomInt",
        value: function getRandomInt(t) {
          return Math.floor(Math.random() * Math.floor(t));
        }
      }]);

      return ae;
    }();
  });
  var se,
      Nr = u(function () {
    dt();
    At();
    Lr();
    Rr();
    ie();
    Zt();
    w();
    kr();
    Ir();
    Ot();
    Lt();
    F();
    Ft();
    re();

    se = /*#__PURE__*/function () {
      function se(t) {
        _classCallCheck(this, se);

        this.scene = t;
        this.isCreated = !1;
        this.scene.sys.events.once("boot", this.boot, this);
      }

      _createClass(se, [{
        key: "boot",
        value: function boot() {
          this.scene.sys.events.on("update", this.update, this), this.scene.sys.events.on("destroy", this.destroy, this);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.scene = void 0, this.tilemap = void 0, this.gridCharacters = void 0, this.gridTilemap = void 0, this.movementStarted$ = void 0, this.movementStopped$ = void 0, this.directionChanged$ = void 0, this.positionChangeStarted$ = void 0, this.positionChangeFinished$ = void 0, this.charRemoved$ = void 0;
        }
      }, {
        key: "getCharLayer",
        value: function getCharLayer(t) {
          return this.initGuard(), this.unknownCharGuard(t), this.gridCharacters.get(t).getTilePos().layer;
        }
      }, {
        key: "getTransition",
        value: function getTransition(t, e) {
          return this.initGuard(), this.gridTilemap.getTransition(new h(t), e);
        }
      }, {
        key: "setTransition",
        value: function setTransition(t, e, r) {
          return this.initGuard(), this.gridTilemap.setTransition(new h(t), e, r);
        }
      }, {
        key: "create",
        value: function create(t, e) {
          this.isCreated = !0, this.gridCharacters = new Map();
          var r = this.setConfigDefaults(e);
          _P.set(r), this.tilemap = t, this.movementStopped$ = new v(), this.movementStarted$ = new v(), this.directionChanged$ = new v(), this.positionChangeStarted$ = new v(), this.positionChangeFinished$ = new v(), this.charRemoved$ = new v(), this.gridTilemap = new W(t), this.addCharacters();
        }
      }, {
        key: "getPosition",
        value: function getPosition(t) {
          return this.initGuard(), this.unknownCharGuard(t), this.gridCharacters.get(t).getTilePos().position;
        }
      }, {
        key: "move",
        value: function move(t, e) {
          this.moveChar(t, e);
        }
      }, {
        key: "moveRandomly",
        value: function moveRandomly(t) {
          var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
          this.initGuard(), this.unknownCharGuard(t);
          var i = new ae(e, r);
          i.setNumberOfDirections(_P.get().numberOfDirections), this.gridCharacters.get(t).setMovement(i);
        }
      }, {
        key: "moveTo",
        value: function moveTo(t, e, r) {
          var i = this.assembleMoveToConfig(r);
          this.initGuard(), this.unknownCharGuard(t);
          var n = new ut(this.gridTilemap, {
            position: new h(e),
            layer: (r == null ? void 0 : r.targetLayer) || this.gridCharacters.get(t).getNextTilePos().layer
          }, 0, i);
          return n.setNumberOfDirections(_P.get().numberOfDirections), this.gridCharacters.get(t).setMovement(n), n.finishedObs().pipe(it(1), Kt(function (s) {
            return {
              charId: t,
              position: s.position,
              result: s.result,
              description: s.description,
              layer: s.layer
            };
          }));
        }
      }, {
        key: "stopMovement",
        value: function stopMovement(t) {
          this.initGuard(), this.unknownCharGuard(t), this.gridCharacters.get(t).setMovement(void 0);
        }
      }, {
        key: "setSpeed",
        value: function setSpeed(t, e) {
          this.initGuard(), this.unknownCharGuard(t), this.gridCharacters.get(t).setSpeed(e);
        }
      }, {
        key: "setWalkingAnimationMapping",
        value: function setWalkingAnimationMapping(t, e) {
          this.initGuard(), this.unknownCharGuard(t), this.gridCharacters.get(t).setWalkingAnimationMapping(e);
        }
      }, {
        key: "update",
        value: function update(t, e) {
          if (this.isCreated && this.gridCharacters) {
            var _iterator4 = _createForOfIteratorHelper(this.gridCharacters),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var _step4$value = _slicedToArray(_step4.value, 2),
                    r = _step4$value[0],
                    i = _step4$value[1];

                i.update(e);
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          }
        }
      }, {
        key: "addCharacter",
        value: function addCharacter(t) {
          var _this18 = this;

          this.initGuard();
          var e = {
            sprite: t.sprite,
            speed: t.speed || 4,
            tilemap: this.gridTilemap,
            tileSize: new h(this.gridTilemap.getTileWidth(), this.gridTilemap.getTileHeight()),
            walkingAnimationMapping: t.walkingAnimationMapping,
            container: t.container,
            offsetX: t.offsetX,
            offsetY: t.offsetY,
            collides: t.collides === void 0 ? !0 : t.collides,
            charLayer: t.charLayer
          },
              r = this.createCharacter(t.id, e);
          t.facingDirection && r.turnTowards(t.facingDirection), this.gridCharacters.set(t.id, r);
          var i = t.startPosition ? new h(t.startPosition) : new h(0, 0);
          r.setTilePosition({
            position: i,
            layer: r.getTilePos().layer
          }), this.gridTilemap.addCharacter(r), r.movementStopped().pipe(this.takeUntilCharRemoved(r.getId())).subscribe(function (n) {
            _this18.movementStopped$.next({
              charId: r.getId(),
              direction: n
            });
          }), r.movementStarted().pipe(this.takeUntilCharRemoved(r.getId())).subscribe(function (n) {
            _this18.movementStarted$.next({
              charId: r.getId(),
              direction: n
            });
          }), r.directionChanged().pipe(this.takeUntilCharRemoved(r.getId())).subscribe(function (n) {
            _this18.directionChanged$.next({
              charId: r.getId(),
              direction: n
            });
          }), r.positionChangeStarted().pipe(this.takeUntilCharRemoved(r.getId())).subscribe(function (n) {
            _this18.positionChangeStarted$.next(R({
              charId: r.getId()
            }, n));
          }), r.positionChangeFinished().pipe(this.takeUntilCharRemoved(r.getId())).subscribe(function (n) {
            _this18.positionChangeFinished$.next(R({
              charId: r.getId()
            }, n));
          });
        }
      }, {
        key: "hasCharacter",
        value: function hasCharacter(t) {
          return this.initGuard(), this.gridCharacters.has(t);
        }
      }, {
        key: "removeCharacter",
        value: function removeCharacter(t) {
          this.initGuard(), this.unknownCharGuard(t), this.gridTilemap.removeCharacter(t), this.gridCharacters.delete(t), this.charRemoved$.next(t);
        }
      }, {
        key: "removeAllCharacters",
        value: function removeAllCharacters() {
          this.initGuard();

          var _iterator5 = _createForOfIteratorHelper(this.gridCharacters.keys()),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var t = _step5.value;
              this.removeCharacter(t);
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }
      }, {
        key: "getAllCharacters",
        value: function getAllCharacters() {
          return this.initGuard(), _toConsumableArray(this.gridCharacters.keys());
        }
      }, {
        key: "follow",
        value: function follow(t, e) {
          var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
          this.initGuard(), this.unknownCharGuard(t), this.unknownCharGuard(e);
          var n = new oe(this.gridTilemap, this.gridCharacters.get(e), r, i ? S.CLOSEST_REACHABLE : S.STOP);
          n.setNumberOfDirections(_P.get().numberOfDirections), this.gridCharacters.get(t).setMovement(n);
        }
      }, {
        key: "isMoving",
        value: function isMoving(t) {
          return this.initGuard(), this.unknownCharGuard(t), this.gridCharacters.get(t).isMoving();
        }
      }, {
        key: "getFacingDirection",
        value: function getFacingDirection(t) {
          return this.initGuard(), this.unknownCharGuard(t), this.gridCharacters.get(t).getFacingDirection();
        }
      }, {
        key: "getFacingPosition",
        value: function getFacingPosition(t) {
          return this.initGuard(), this.unknownCharGuard(t), this.gridCharacters.get(t).getFacingPosition();
        }
      }, {
        key: "turnTowards",
        value: function turnTowards(t, e) {
          return this.initGuard(), this.unknownCharGuard(t), this.gridCharacters.get(t).turnTowards(e);
        }
      }, {
        key: "setPosition",
        value: function setPosition(t, e, r) {
          this.initGuard(), this.unknownCharGuard(t), r || this.gridCharacters.get(t).setTilePosition({
            position: new h(e),
            layer: this.gridCharacters.get(t).getTilePos().layer
          }), this.gridCharacters.get(t).setTilePosition({
            position: new h(e),
            layer: r
          });
        }
      }, {
        key: "getSprite",
        value: function getSprite(t) {
          return this.initGuard(), this.unknownCharGuard(t), this.gridCharacters.get(t).getSprite();
        }
      }, {
        key: "setSprite",
        value: function setSprite(t, e) {
          this.initGuard(), this.unknownCharGuard(t), this.gridCharacters.get(t).setSprite(e);
        }
      }, {
        key: "movementStarted",
        value: function movementStarted() {
          return this.movementStarted$;
        }
      }, {
        key: "movementStopped",
        value: function movementStopped() {
          return this.movementStopped$;
        }
      }, {
        key: "directionChanged",
        value: function directionChanged() {
          return this.directionChanged$;
        }
      }, {
        key: "positionChangeStarted",
        value: function positionChangeStarted() {
          return this.positionChangeStarted$;
        }
      }, {
        key: "positionChangeFinished",
        value: function positionChangeFinished() {
          return this.positionChangeFinished$;
        }
      }, {
        key: "setConfigDefaults",
        value: function setConfigDefaults(t) {
          return R({
            collisionTilePropertyName: "ge_collide",
            numberOfDirections: _.FOUR,
            characterCollisionStrategy: X.BLOCK_TWO_TILES
          }, t);
        }
      }, {
        key: "takeUntilCharRemoved",
        value: function takeUntilCharRemoved(t) {
          return z(this.charRemoved$.pipe(Xt(function (e) {
            return e == t;
          })));
        }
      }, {
        key: "initGuard",
        value: function initGuard() {
          if (!this.isCreated) throw new Error("Plugin not initialized. You need to call create() first.");
        }
      }, {
        key: "unknownCharGuard",
        value: function unknownCharGuard(t) {
          if (!this.gridCharacters.has(t)) throw new Error("Character unknown: ".concat(t));
        }
      }, {
        key: "createCharacter",
        value: function createCharacter(t, e) {
          return this._isIsometric() ? new Jt(t, e) : new ct(t, e);
        }
      }, {
        key: "addCharacters",
        value: function addCharacters() {
          var _this19 = this;

          _P.get().characters.forEach(function (t) {
            return _this19.addCharacter(t);
          });
        }
      }, {
        key: "moveChar",
        value: function moveChar(t, e) {
          if (this.initGuard(), this.unknownCharGuard(t), _P.get().numberOfDirections === _.FOUR) {
            if (!this._isIsometric() && kt(e)) {
              console.warn("GridEngine: Character '".concat(t, "' can't be moved '").concat(e, "' in 4 direction mode."));
              return;
            } else if (this._isIsometric() && !kt(e)) {
              console.warn("GridEngine: Character '".concat(t, "' can't be moved '").concat(e, "' in 4 direction isometric mode."));
              return;
            }
          }

          this.gridCharacters.get(t).move(e);
        }
      }, {
        key: "_isIsometric",
        value: function _isIsometric() {
          return this.tilemap.orientation == "".concat(Phaser.Tilemaps.Orientation.ISOMETRIC);
        }
      }, {
        key: "assembleMoveToConfig",
        value: function assembleMoveToConfig(t) {
          var e = ft(R({}, t), {
            noPathFoundStrategy: S.STOP,
            pathBlockedStrategy: M.WAIT
          });
          return (t == null ? void 0 : t.noPathFoundStrategy) && (Object.values(S).includes(t.noPathFoundStrategy) ? e.noPathFoundStrategy = t.noPathFoundStrategy : console.warn("GridEngine: Unknown NoPathFoundStrategy '".concat(t.noPathFoundStrategy, "'. Falling back to '").concat(S.STOP, "'"))), (t == null ? void 0 : t.pathBlockedStrategy) && (Object.values(M).includes(t.pathBlockedStrategy) ? e.pathBlockedStrategy = t.pathBlockedStrategy : console.warn("GridEngine: Unknown PathBlockedStrategy '".concat(t.pathBlockedStrategy, "'. Falling back to '").concat(M.WAIT, "'"))), e;
        }
      }]);

      return se;
    }();
  });
  var si = he(function (cs, Gr) {
    Nr();
    Gr.exports = se;
  });
  return si();
}();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
},{}]},{},["sXi4"], null)
//# sourceMappingURL=/GridEngine.min.5ade9c21.js.map