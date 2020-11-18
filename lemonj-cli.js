#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module2) => () => {
  if (!module2) {
    module2 = {exports: {}};
    callback(module2.exports, module2);
  }
  return module2.exports;
};
var __exportStar = (target, module2, desc) => {
  __markAsModule(target);
  if (typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  if (module2 && module2.__esModule)
    return module2;
  return __exportStar(__defProp(__create(__getProtoOf(module2)), "default", {value: module2, enumerable: true}), module2);
};

// node_modules/antlr4/Utils.js
var require_Utils = __commonJS((exports) => {
  function arrayToString(a) {
    return "[" + a.join(", ") + "]";
  }
  String.prototype.seed = String.prototype.seed || Math.round(Math.random() * Math.pow(2, 32));
  String.prototype.hashCode = function() {
    var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i, key = this.toString();
    remainder = key.length & 3;
    bytes = key.length - remainder;
    h1 = String.prototype.seed;
    c1 = 3432918353;
    c2 = 461845907;
    i = 0;
    while (i < bytes) {
      k1 = key.charCodeAt(i) & 255 | (key.charCodeAt(++i) & 255) << 8 | (key.charCodeAt(++i) & 255) << 16 | (key.charCodeAt(++i) & 255) << 24;
      ++i;
      k1 = (k1 & 65535) * c1 + (((k1 >>> 16) * c1 & 65535) << 16) & 4294967295;
      k1 = k1 << 15 | k1 >>> 17;
      k1 = (k1 & 65535) * c2 + (((k1 >>> 16) * c2 & 65535) << 16) & 4294967295;
      h1 ^= k1;
      h1 = h1 << 13 | h1 >>> 19;
      h1b = (h1 & 65535) * 5 + (((h1 >>> 16) * 5 & 65535) << 16) & 4294967295;
      h1 = (h1b & 65535) + 27492 + (((h1b >>> 16) + 58964 & 65535) << 16);
    }
    k1 = 0;
    switch (remainder) {
      case 3:
        k1 ^= (key.charCodeAt(i + 2) & 255) << 16;
      case 2:
        k1 ^= (key.charCodeAt(i + 1) & 255) << 8;
      case 1:
        k1 ^= key.charCodeAt(i) & 255;
        k1 = (k1 & 65535) * c1 + (((k1 >>> 16) * c1 & 65535) << 16) & 4294967295;
        k1 = k1 << 15 | k1 >>> 17;
        k1 = (k1 & 65535) * c2 + (((k1 >>> 16) * c2 & 65535) << 16) & 4294967295;
        h1 ^= k1;
    }
    h1 ^= key.length;
    h1 ^= h1 >>> 16;
    h1 = (h1 & 65535) * 2246822507 + (((h1 >>> 16) * 2246822507 & 65535) << 16) & 4294967295;
    h1 ^= h1 >>> 13;
    h1 = (h1 & 65535) * 3266489909 + (((h1 >>> 16) * 3266489909 & 65535) << 16) & 4294967295;
    h1 ^= h1 >>> 16;
    return h1 >>> 0;
  };
  function standardEqualsFunction(a, b) {
    return a.equals(b);
  }
  function standardHashCodeFunction(a) {
    return a.hashCode();
  }
  function Set(hashFunction, equalsFunction) {
    this.data = {};
    this.hashFunction = hashFunction || standardHashCodeFunction;
    this.equalsFunction = equalsFunction || standardEqualsFunction;
    return this;
  }
  Object.defineProperty(Set.prototype, "length", {
    get: function() {
      var l = 0;
      for (var key in this.data) {
        if (key.indexOf("hash_") === 0) {
          l = l + this.data[key].length;
        }
      }
      return l;
    }
  });
  Set.prototype.add = function(value) {
    var hash = this.hashFunction(value);
    var key = "hash_" + hash;
    if (key in this.data) {
      var values = this.data[key];
      for (var i = 0; i < values.length; i++) {
        if (this.equalsFunction(value, values[i])) {
          return values[i];
        }
      }
      values.push(value);
      return value;
    } else {
      this.data[key] = [value];
      return value;
    }
  };
  Set.prototype.contains = function(value) {
    return this.get(value) != null;
  };
  Set.prototype.get = function(value) {
    var hash = this.hashFunction(value);
    var key = "hash_" + hash;
    if (key in this.data) {
      var values = this.data[key];
      for (var i = 0; i < values.length; i++) {
        if (this.equalsFunction(value, values[i])) {
          return values[i];
        }
      }
    }
    return null;
  };
  Set.prototype.values = function() {
    var l = [];
    for (var key in this.data) {
      if (key.indexOf("hash_") === 0) {
        l = l.concat(this.data[key]);
      }
    }
    return l;
  };
  Set.prototype.toString = function() {
    return arrayToString(this.values());
  };
  function BitSet() {
    this.data = [];
    return this;
  }
  BitSet.prototype.add = function(value) {
    this.data[value] = true;
  };
  BitSet.prototype.or = function(set) {
    var bits = this;
    Object.keys(set.data).map(function(alt) {
      bits.add(alt);
    });
  };
  BitSet.prototype.remove = function(value) {
    delete this.data[value];
  };
  BitSet.prototype.contains = function(value) {
    return this.data[value] === true;
  };
  BitSet.prototype.values = function() {
    return Object.keys(this.data);
  };
  BitSet.prototype.minValue = function() {
    return Math.min.apply(null, this.values());
  };
  BitSet.prototype.hashCode = function() {
    var hash = new Hash2();
    hash.update(this.values());
    return hash.finish();
  };
  BitSet.prototype.equals = function(other) {
    if (!(other instanceof BitSet)) {
      return false;
    }
    return this.hashCode() === other.hashCode();
  };
  Object.defineProperty(BitSet.prototype, "length", {
    get: function() {
      return this.values().length;
    }
  });
  BitSet.prototype.toString = function() {
    return "{" + this.values().join(", ") + "}";
  };
  function Map(hashFunction, equalsFunction) {
    this.data = {};
    this.hashFunction = hashFunction || standardHashCodeFunction;
    this.equalsFunction = equalsFunction || standardEqualsFunction;
    return this;
  }
  Object.defineProperty(Map.prototype, "length", {
    get: function() {
      var l = 0;
      for (var hashKey in this.data) {
        if (hashKey.indexOf("hash_") === 0) {
          l = l + this.data[hashKey].length;
        }
      }
      return l;
    }
  });
  Map.prototype.put = function(key, value) {
    var hashKey = "hash_" + this.hashFunction(key);
    if (hashKey in this.data) {
      var entries = this.data[hashKey];
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (this.equalsFunction(key, entry.key)) {
          var oldValue = entry.value;
          entry.value = value;
          return oldValue;
        }
      }
      entries.push({key, value});
      return value;
    } else {
      this.data[hashKey] = [{key, value}];
      return value;
    }
  };
  Map.prototype.containsKey = function(key) {
    var hashKey = "hash_" + this.hashFunction(key);
    if (hashKey in this.data) {
      var entries = this.data[hashKey];
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (this.equalsFunction(key, entry.key))
          return true;
      }
    }
    return false;
  };
  Map.prototype.get = function(key) {
    var hashKey = "hash_" + this.hashFunction(key);
    if (hashKey in this.data) {
      var entries = this.data[hashKey];
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (this.equalsFunction(key, entry.key))
          return entry.value;
      }
    }
    return null;
  };
  Map.prototype.entries = function() {
    var l = [];
    for (var key in this.data) {
      if (key.indexOf("hash_") === 0) {
        l = l.concat(this.data[key]);
      }
    }
    return l;
  };
  Map.prototype.getKeys = function() {
    return this.entries().map(function(e) {
      return e.key;
    });
  };
  Map.prototype.getValues = function() {
    return this.entries().map(function(e) {
      return e.value;
    });
  };
  Map.prototype.toString = function() {
    var ss = this.entries().map(function(entry) {
      return "{" + entry.key + ":" + entry.value + "}";
    });
    return "[" + ss.join(", ") + "]";
  };
  function AltDict() {
    this.data = {};
    return this;
  }
  AltDict.prototype.get = function(key) {
    key = "k-" + key;
    if (key in this.data) {
      return this.data[key];
    } else {
      return null;
    }
  };
  AltDict.prototype.put = function(key, value) {
    key = "k-" + key;
    this.data[key] = value;
  };
  AltDict.prototype.values = function() {
    var data = this.data;
    var keys = Object.keys(this.data);
    return keys.map(function(key) {
      return data[key];
    });
  };
  function DoubleDict(defaultMapCtor) {
    this.defaultMapCtor = defaultMapCtor || Map;
    this.cacheMap = new this.defaultMapCtor();
    return this;
  }
  function Hash2() {
    this.count = 0;
    this.hash = 0;
    return this;
  }
  Hash2.prototype.update = function() {
    for (var i = 0; i < arguments.length; i++) {
      var value = arguments[i];
      if (value == null)
        continue;
      if (Array.isArray(value))
        this.update.apply(this, value);
      else {
        var k = 0;
        switch (typeof value) {
          case "undefined":
          case "function":
            continue;
          case "number":
          case "boolean":
            k = value;
            break;
          case "string":
            k = value.hashCode();
            break;
          default:
            if (value.updateHashCode)
              value.updateHashCode(this);
            else
              console.log("No updateHashCode for " + value.toString());
            continue;
        }
        k = k * 3432918353;
        k = k << 15 | k >>> 32 - 15;
        k = k * 461845907;
        this.count = this.count + 1;
        var hash = this.hash ^ k;
        hash = hash << 13 | hash >>> 32 - 13;
        hash = hash * 5 + 3864292196;
        this.hash = hash;
      }
    }
  };
  Hash2.prototype.finish = function() {
    var hash = this.hash ^ this.count * 4;
    hash = hash ^ hash >>> 16;
    hash = hash * 2246822507;
    hash = hash ^ hash >>> 13;
    hash = hash * 3266489909;
    hash = hash ^ hash >>> 16;
    return hash;
  };
  function hashStuff() {
    var hash = new Hash2();
    hash.update.apply(hash, arguments);
    return hash.finish();
  }
  DoubleDict.prototype.get = function(a, b) {
    var d = this.cacheMap.get(a) || null;
    return d === null ? null : d.get(b) || null;
  };
  DoubleDict.prototype.set = function(a, b, o) {
    var d = this.cacheMap.get(a) || null;
    if (d === null) {
      d = new this.defaultMapCtor();
      this.cacheMap.put(a, d);
    }
    d.put(b, o);
  };
  function escapeWhitespace(s, escapeSpaces) {
    s = s.replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r");
    if (escapeSpaces) {
      s = s.replace(/ /g, "\xB7");
    }
    return s;
  }
  function titleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1);
    });
  }
  function equalArrays(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b))
      return false;
    if (a == b)
      return true;
    if (a.length != b.length)
      return false;
    for (var i = 0; i < a.length; i++) {
      if (a[i] == b[i])
        continue;
      if (!a[i].equals(b[i]))
        return false;
    }
    return true;
  }
  exports.Hash = Hash2;
  exports.Set = Set;
  exports.Map = Map;
  exports.BitSet = BitSet;
  exports.AltDict = AltDict;
  exports.DoubleDict = DoubleDict;
  exports.hashStuff = hashStuff;
  exports.escapeWhitespace = escapeWhitespace;
  exports.arrayToString = arrayToString;
  exports.titleCase = titleCase;
  exports.equalArrays = equalArrays;
});

// node_modules/antlr4/Token.js
var require_Token = __commonJS((exports) => {
  function Token() {
    this.source = null;
    this.type = null;
    this.channel = null;
    this.start = null;
    this.stop = null;
    this.tokenIndex = null;
    this.line = null;
    this.column = null;
    this._text = null;
    return this;
  }
  Token.INVALID_TYPE = 0;
  Token.EPSILON = -2;
  Token.MIN_USER_TOKEN_TYPE = 1;
  Token.EOF = -1;
  Token.DEFAULT_CHANNEL = 0;
  Token.HIDDEN_CHANNEL = 1;
  Object.defineProperty(Token.prototype, "text", {
    get: function() {
      return this._text;
    },
    set: function(text) {
      this._text = text;
    }
  });
  Token.prototype.getTokenSource = function() {
    return this.source[0];
  };
  Token.prototype.getInputStream = function() {
    return this.source[1];
  };
  function CommonToken(source, type, channel, start, stop) {
    Token.call(this);
    this.source = source !== void 0 ? source : CommonToken.EMPTY_SOURCE;
    this.type = type !== void 0 ? type : null;
    this.channel = channel !== void 0 ? channel : Token.DEFAULT_CHANNEL;
    this.start = start !== void 0 ? start : -1;
    this.stop = stop !== void 0 ? stop : -1;
    this.tokenIndex = -1;
    if (this.source[0] !== null) {
      this.line = source[0].line;
      this.column = source[0].column;
    } else {
      this.column = -1;
    }
    return this;
  }
  CommonToken.prototype = Object.create(Token.prototype);
  CommonToken.prototype.constructor = CommonToken;
  CommonToken.EMPTY_SOURCE = [null, null];
  CommonToken.prototype.clone = function() {
    var t = new CommonToken(this.source, this.type, this.channel, this.start, this.stop);
    t.tokenIndex = this.tokenIndex;
    t.line = this.line;
    t.column = this.column;
    t.text = this.text;
    return t;
  };
  Object.defineProperty(CommonToken.prototype, "text", {
    get: function() {
      if (this._text !== null) {
        return this._text;
      }
      var input = this.getInputStream();
      if (input === null) {
        return null;
      }
      var n = input.size;
      if (this.start < n && this.stop < n) {
        return input.getText(this.start, this.stop);
      } else {
        return "<EOF>";
      }
    },
    set: function(text) {
      this._text = text;
    }
  });
  CommonToken.prototype.toString = function() {
    var txt = this.text;
    if (txt !== null) {
      txt = txt.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
    } else {
      txt = "<no text>";
    }
    return "[@" + this.tokenIndex + "," + this.start + ":" + this.stop + "='" + txt + "',<" + this.type + ">" + (this.channel > 0 ? ",channel=" + this.channel : "") + "," + this.line + ":" + this.column + "]";
  };
  exports.Token = Token;
  exports.CommonToken = CommonToken;
});

// node_modules/antlr4/atn/ATNState.js
var require_ATNState = __commonJS((exports) => {
  function ATNState() {
    this.atn = null;
    this.stateNumber = ATNState.INVALID_STATE_NUMBER;
    this.stateType = null;
    this.ruleIndex = 0;
    this.epsilonOnlyTransitions = false;
    this.transitions = [];
    this.nextTokenWithinRule = null;
    return this;
  }
  ATNState.INVALID_TYPE = 0;
  ATNState.BASIC = 1;
  ATNState.RULE_START = 2;
  ATNState.BLOCK_START = 3;
  ATNState.PLUS_BLOCK_START = 4;
  ATNState.STAR_BLOCK_START = 5;
  ATNState.TOKEN_START = 6;
  ATNState.RULE_STOP = 7;
  ATNState.BLOCK_END = 8;
  ATNState.STAR_LOOP_BACK = 9;
  ATNState.STAR_LOOP_ENTRY = 10;
  ATNState.PLUS_LOOP_BACK = 11;
  ATNState.LOOP_END = 12;
  ATNState.serializationNames = [
    "INVALID",
    "BASIC",
    "RULE_START",
    "BLOCK_START",
    "PLUS_BLOCK_START",
    "STAR_BLOCK_START",
    "TOKEN_START",
    "RULE_STOP",
    "BLOCK_END",
    "STAR_LOOP_BACK",
    "STAR_LOOP_ENTRY",
    "PLUS_LOOP_BACK",
    "LOOP_END"
  ];
  ATNState.INVALID_STATE_NUMBER = -1;
  ATNState.prototype.toString = function() {
    return this.stateNumber;
  };
  ATNState.prototype.equals = function(other) {
    if (other instanceof ATNState) {
      return this.stateNumber === other.stateNumber;
    } else {
      return false;
    }
  };
  ATNState.prototype.isNonGreedyExitState = function() {
    return false;
  };
  ATNState.prototype.addTransition = function(trans, index) {
    if (index === void 0) {
      index = -1;
    }
    if (this.transitions.length === 0) {
      this.epsilonOnlyTransitions = trans.isEpsilon;
    } else if (this.epsilonOnlyTransitions !== trans.isEpsilon) {
      this.epsilonOnlyTransitions = false;
    }
    if (index === -1) {
      this.transitions.push(trans);
    } else {
      this.transitions.splice(index, 1, trans);
    }
  };
  function BasicState() {
    ATNState.call(this);
    this.stateType = ATNState.BASIC;
    return this;
  }
  BasicState.prototype = Object.create(ATNState.prototype);
  BasicState.prototype.constructor = BasicState;
  function DecisionState() {
    ATNState.call(this);
    this.decision = -1;
    this.nonGreedy = false;
    return this;
  }
  DecisionState.prototype = Object.create(ATNState.prototype);
  DecisionState.prototype.constructor = DecisionState;
  function BlockStartState() {
    DecisionState.call(this);
    this.endState = null;
    return this;
  }
  BlockStartState.prototype = Object.create(DecisionState.prototype);
  BlockStartState.prototype.constructor = BlockStartState;
  function BasicBlockStartState() {
    BlockStartState.call(this);
    this.stateType = ATNState.BLOCK_START;
    return this;
  }
  BasicBlockStartState.prototype = Object.create(BlockStartState.prototype);
  BasicBlockStartState.prototype.constructor = BasicBlockStartState;
  function BlockEndState() {
    ATNState.call(this);
    this.stateType = ATNState.BLOCK_END;
    this.startState = null;
    return this;
  }
  BlockEndState.prototype = Object.create(ATNState.prototype);
  BlockEndState.prototype.constructor = BlockEndState;
  function RuleStopState() {
    ATNState.call(this);
    this.stateType = ATNState.RULE_STOP;
    return this;
  }
  RuleStopState.prototype = Object.create(ATNState.prototype);
  RuleStopState.prototype.constructor = RuleStopState;
  function RuleStartState() {
    ATNState.call(this);
    this.stateType = ATNState.RULE_START;
    this.stopState = null;
    this.isPrecedenceRule = false;
    return this;
  }
  RuleStartState.prototype = Object.create(ATNState.prototype);
  RuleStartState.prototype.constructor = RuleStartState;
  function PlusLoopbackState() {
    DecisionState.call(this);
    this.stateType = ATNState.PLUS_LOOP_BACK;
    return this;
  }
  PlusLoopbackState.prototype = Object.create(DecisionState.prototype);
  PlusLoopbackState.prototype.constructor = PlusLoopbackState;
  function PlusBlockStartState() {
    BlockStartState.call(this);
    this.stateType = ATNState.PLUS_BLOCK_START;
    this.loopBackState = null;
    return this;
  }
  PlusBlockStartState.prototype = Object.create(BlockStartState.prototype);
  PlusBlockStartState.prototype.constructor = PlusBlockStartState;
  function StarBlockStartState() {
    BlockStartState.call(this);
    this.stateType = ATNState.STAR_BLOCK_START;
    return this;
  }
  StarBlockStartState.prototype = Object.create(BlockStartState.prototype);
  StarBlockStartState.prototype.constructor = StarBlockStartState;
  function StarLoopbackState() {
    ATNState.call(this);
    this.stateType = ATNState.STAR_LOOP_BACK;
    return this;
  }
  StarLoopbackState.prototype = Object.create(ATNState.prototype);
  StarLoopbackState.prototype.constructor = StarLoopbackState;
  function StarLoopEntryState() {
    DecisionState.call(this);
    this.stateType = ATNState.STAR_LOOP_ENTRY;
    this.loopBackState = null;
    this.isPrecedenceDecision = null;
    return this;
  }
  StarLoopEntryState.prototype = Object.create(DecisionState.prototype);
  StarLoopEntryState.prototype.constructor = StarLoopEntryState;
  function LoopEndState() {
    ATNState.call(this);
    this.stateType = ATNState.LOOP_END;
    this.loopBackState = null;
    return this;
  }
  LoopEndState.prototype = Object.create(ATNState.prototype);
  LoopEndState.prototype.constructor = LoopEndState;
  function TokensStartState() {
    DecisionState.call(this);
    this.stateType = ATNState.TOKEN_START;
    return this;
  }
  TokensStartState.prototype = Object.create(DecisionState.prototype);
  TokensStartState.prototype.constructor = TokensStartState;
  exports.ATNState = ATNState;
  exports.BasicState = BasicState;
  exports.DecisionState = DecisionState;
  exports.BlockStartState = BlockStartState;
  exports.BlockEndState = BlockEndState;
  exports.LoopEndState = LoopEndState;
  exports.RuleStartState = RuleStartState;
  exports.RuleStopState = RuleStopState;
  exports.TokensStartState = TokensStartState;
  exports.PlusLoopbackState = PlusLoopbackState;
  exports.StarLoopbackState = StarLoopbackState;
  exports.StarLoopEntryState = StarLoopEntryState;
  exports.PlusBlockStartState = PlusBlockStartState;
  exports.StarBlockStartState = StarBlockStartState;
  exports.BasicBlockStartState = BasicBlockStartState;
});

// node_modules/antlr4/atn/SemanticContext.js
var require_SemanticContext = __commonJS((exports) => {
  var Set = require_Utils().Set;
  var Hash2 = require_Utils().Hash;
  function SemanticContext() {
    return this;
  }
  SemanticContext.prototype.hashCode = function() {
    var hash = new Hash2();
    this.updateHashCode(hash);
    return hash.finish();
  };
  SemanticContext.prototype.evaluate = function(parser, outerContext) {
  };
  SemanticContext.prototype.evalPrecedence = function(parser, outerContext) {
    return this;
  };
  SemanticContext.andContext = function(a, b) {
    if (a === null || a === SemanticContext.NONE) {
      return b;
    }
    if (b === null || b === SemanticContext.NONE) {
      return a;
    }
    var result = new AND(a, b);
    if (result.opnds.length === 1) {
      return result.opnds[0];
    } else {
      return result;
    }
  };
  SemanticContext.orContext = function(a, b) {
    if (a === null) {
      return b;
    }
    if (b === null) {
      return a;
    }
    if (a === SemanticContext.NONE || b === SemanticContext.NONE) {
      return SemanticContext.NONE;
    }
    var result = new OR(a, b);
    if (result.opnds.length === 1) {
      return result.opnds[0];
    } else {
      return result;
    }
  };
  function Predicate(ruleIndex, predIndex, isCtxDependent) {
    SemanticContext.call(this);
    this.ruleIndex = ruleIndex === void 0 ? -1 : ruleIndex;
    this.predIndex = predIndex === void 0 ? -1 : predIndex;
    this.isCtxDependent = isCtxDependent === void 0 ? false : isCtxDependent;
    return this;
  }
  Predicate.prototype = Object.create(SemanticContext.prototype);
  Predicate.prototype.constructor = Predicate;
  SemanticContext.NONE = new Predicate();
  Predicate.prototype.evaluate = function(parser, outerContext) {
    var localctx = this.isCtxDependent ? outerContext : null;
    return parser.sempred(localctx, this.ruleIndex, this.predIndex);
  };
  Predicate.prototype.updateHashCode = function(hash) {
    hash.update(this.ruleIndex, this.predIndex, this.isCtxDependent);
  };
  Predicate.prototype.equals = function(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof Predicate)) {
      return false;
    } else {
      return this.ruleIndex === other.ruleIndex && this.predIndex === other.predIndex && this.isCtxDependent === other.isCtxDependent;
    }
  };
  Predicate.prototype.toString = function() {
    return "{" + this.ruleIndex + ":" + this.predIndex + "}?";
  };
  function PrecedencePredicate(precedence) {
    SemanticContext.call(this);
    this.precedence = precedence === void 0 ? 0 : precedence;
  }
  PrecedencePredicate.prototype = Object.create(SemanticContext.prototype);
  PrecedencePredicate.prototype.constructor = PrecedencePredicate;
  PrecedencePredicate.prototype.evaluate = function(parser, outerContext) {
    return parser.precpred(outerContext, this.precedence);
  };
  PrecedencePredicate.prototype.evalPrecedence = function(parser, outerContext) {
    if (parser.precpred(outerContext, this.precedence)) {
      return SemanticContext.NONE;
    } else {
      return null;
    }
  };
  PrecedencePredicate.prototype.compareTo = function(other) {
    return this.precedence - other.precedence;
  };
  PrecedencePredicate.prototype.updateHashCode = function(hash) {
    hash.update(31);
  };
  PrecedencePredicate.prototype.equals = function(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof PrecedencePredicate)) {
      return false;
    } else {
      return this.precedence === other.precedence;
    }
  };
  PrecedencePredicate.prototype.toString = function() {
    return "{" + this.precedence + ">=prec}?";
  };
  PrecedencePredicate.filterPrecedencePredicates = function(set) {
    var result = [];
    set.values().map(function(context) {
      if (context instanceof PrecedencePredicate) {
        result.push(context);
      }
    });
    return result;
  };
  function AND(a, b) {
    SemanticContext.call(this);
    var operands = new Set();
    if (a instanceof AND) {
      a.opnds.map(function(o) {
        operands.add(o);
      });
    } else {
      operands.add(a);
    }
    if (b instanceof AND) {
      b.opnds.map(function(o) {
        operands.add(o);
      });
    } else {
      operands.add(b);
    }
    var precedencePredicates = PrecedencePredicate.filterPrecedencePredicates(operands);
    if (precedencePredicates.length > 0) {
      var reduced = null;
      precedencePredicates.map(function(p) {
        if (reduced === null || p.precedence < reduced.precedence) {
          reduced = p;
        }
      });
      operands.add(reduced);
    }
    this.opnds = operands.values();
    return this;
  }
  AND.prototype = Object.create(SemanticContext.prototype);
  AND.prototype.constructor = AND;
  AND.prototype.equals = function(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof AND)) {
      return false;
    } else {
      return this.opnds === other.opnds;
    }
  };
  AND.prototype.updateHashCode = function(hash) {
    hash.update(this.opnds, "AND");
  };
  AND.prototype.evaluate = function(parser, outerContext) {
    for (var i = 0; i < this.opnds.length; i++) {
      if (!this.opnds[i].evaluate(parser, outerContext)) {
        return false;
      }
    }
    return true;
  };
  AND.prototype.evalPrecedence = function(parser, outerContext) {
    var differs = false;
    var operands = [];
    for (var i = 0; i < this.opnds.length; i++) {
      var context = this.opnds[i];
      var evaluated = context.evalPrecedence(parser, outerContext);
      differs |= evaluated !== context;
      if (evaluated === null) {
        return null;
      } else if (evaluated !== SemanticContext.NONE) {
        operands.push(evaluated);
      }
    }
    if (!differs) {
      return this;
    }
    if (operands.length === 0) {
      return SemanticContext.NONE;
    }
    var result = null;
    operands.map(function(o) {
      result = result === null ? o : SemanticContext.andContext(result, o);
    });
    return result;
  };
  AND.prototype.toString = function() {
    var s = "";
    this.opnds.map(function(o) {
      s += "&& " + o.toString();
    });
    return s.length > 3 ? s.slice(3) : s;
  };
  function OR(a, b) {
    SemanticContext.call(this);
    var operands = new Set();
    if (a instanceof OR) {
      a.opnds.map(function(o) {
        operands.add(o);
      });
    } else {
      operands.add(a);
    }
    if (b instanceof OR) {
      b.opnds.map(function(o) {
        operands.add(o);
      });
    } else {
      operands.add(b);
    }
    var precedencePredicates = PrecedencePredicate.filterPrecedencePredicates(operands);
    if (precedencePredicates.length > 0) {
      var s = precedencePredicates.sort(function(a2, b2) {
        return a2.compareTo(b2);
      });
      var reduced = s[s.length - 1];
      operands.add(reduced);
    }
    this.opnds = operands.values();
    return this;
  }
  OR.prototype = Object.create(SemanticContext.prototype);
  OR.prototype.constructor = OR;
  OR.prototype.constructor = function(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof OR)) {
      return false;
    } else {
      return this.opnds === other.opnds;
    }
  };
  OR.prototype.updateHashCode = function(hash) {
    hash.update(this.opnds, "OR");
  };
  OR.prototype.evaluate = function(parser, outerContext) {
    for (var i = 0; i < this.opnds.length; i++) {
      if (this.opnds[i].evaluate(parser, outerContext)) {
        return true;
      }
    }
    return false;
  };
  OR.prototype.evalPrecedence = function(parser, outerContext) {
    var differs = false;
    var operands = [];
    for (var i = 0; i < this.opnds.length; i++) {
      var context = this.opnds[i];
      var evaluated = context.evalPrecedence(parser, outerContext);
      differs |= evaluated !== context;
      if (evaluated === SemanticContext.NONE) {
        return SemanticContext.NONE;
      } else if (evaluated !== null) {
        operands.push(evaluated);
      }
    }
    if (!differs) {
      return this;
    }
    if (operands.length === 0) {
      return null;
    }
    var result = null;
    operands.map(function(o) {
      return result === null ? o : SemanticContext.orContext(result, o);
    });
    return result;
  };
  OR.prototype.toString = function() {
    var s = "";
    this.opnds.map(function(o) {
      s += "|| " + o.toString();
    });
    return s.length > 3 ? s.slice(3) : s;
  };
  exports.SemanticContext = SemanticContext;
  exports.PrecedencePredicate = PrecedencePredicate;
  exports.Predicate = Predicate;
});

// node_modules/antlr4/atn/ATNConfig.js
var require_ATNConfig = __commonJS((exports) => {
  var DecisionState = require_ATNState().DecisionState;
  var SemanticContext = require_SemanticContext().SemanticContext;
  var Hash2 = require_Utils().Hash;
  function checkParams(params, isCfg) {
    if (params === null) {
      var result = {state: null, alt: null, context: null, semanticContext: null};
      if (isCfg) {
        result.reachesIntoOuterContext = 0;
      }
      return result;
    } else {
      var props = {};
      props.state = params.state || null;
      props.alt = params.alt === void 0 ? null : params.alt;
      props.context = params.context || null;
      props.semanticContext = params.semanticContext || null;
      if (isCfg) {
        props.reachesIntoOuterContext = params.reachesIntoOuterContext || 0;
        props.precedenceFilterSuppressed = params.precedenceFilterSuppressed || false;
      }
      return props;
    }
  }
  function ATNConfig(params, config) {
    this.checkContext(params, config);
    params = checkParams(params);
    config = checkParams(config, true);
    this.state = params.state !== null ? params.state : config.state;
    this.alt = params.alt !== null ? params.alt : config.alt;
    this.context = params.context !== null ? params.context : config.context;
    this.semanticContext = params.semanticContext !== null ? params.semanticContext : config.semanticContext !== null ? config.semanticContext : SemanticContext.NONE;
    this.reachesIntoOuterContext = config.reachesIntoOuterContext;
    this.precedenceFilterSuppressed = config.precedenceFilterSuppressed;
    return this;
  }
  ATNConfig.prototype.checkContext = function(params, config) {
    if ((params.context === null || params.context === void 0) && (config === null || config.context === null || config.context === void 0)) {
      this.context = null;
    }
  };
  ATNConfig.prototype.hashCode = function() {
    var hash = new Hash2();
    this.updateHashCode(hash);
    return hash.finish();
  };
  ATNConfig.prototype.updateHashCode = function(hash) {
    hash.update(this.state.stateNumber, this.alt, this.context, this.semanticContext);
  };
  ATNConfig.prototype.equals = function(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof ATNConfig)) {
      return false;
    } else {
      return this.state.stateNumber === other.state.stateNumber && this.alt === other.alt && (this.context === null ? other.context === null : this.context.equals(other.context)) && this.semanticContext.equals(other.semanticContext) && this.precedenceFilterSuppressed === other.precedenceFilterSuppressed;
    }
  };
  ATNConfig.prototype.hashCodeForConfigSet = function() {
    var hash = new Hash2();
    hash.update(this.state.stateNumber, this.alt, this.semanticContext);
    return hash.finish();
  };
  ATNConfig.prototype.equalsForConfigSet = function(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof ATNConfig)) {
      return false;
    } else {
      return this.state.stateNumber === other.state.stateNumber && this.alt === other.alt && this.semanticContext.equals(other.semanticContext);
    }
  };
  ATNConfig.prototype.toString = function() {
    return "(" + this.state + "," + this.alt + (this.context !== null ? ",[" + this.context.toString() + "]" : "") + (this.semanticContext !== SemanticContext.NONE ? "," + this.semanticContext.toString() : "") + (this.reachesIntoOuterContext > 0 ? ",up=" + this.reachesIntoOuterContext : "") + ")";
  };
  function LexerATNConfig(params, config) {
    ATNConfig.call(this, params, config);
    var lexerActionExecutor = params.lexerActionExecutor || null;
    this.lexerActionExecutor = lexerActionExecutor || (config !== null ? config.lexerActionExecutor : null);
    this.passedThroughNonGreedyDecision = config !== null ? this.checkNonGreedyDecision(config, this.state) : false;
    return this;
  }
  LexerATNConfig.prototype = Object.create(ATNConfig.prototype);
  LexerATNConfig.prototype.constructor = LexerATNConfig;
  LexerATNConfig.prototype.updateHashCode = function(hash) {
    hash.update(this.state.stateNumber, this.alt, this.context, this.semanticContext, this.passedThroughNonGreedyDecision, this.lexerActionExecutor);
  };
  LexerATNConfig.prototype.equals = function(other) {
    return this === other || other instanceof LexerATNConfig && this.passedThroughNonGreedyDecision == other.passedThroughNonGreedyDecision && (this.lexerActionExecutor ? this.lexerActionExecutor.equals(other.lexerActionExecutor) : !other.lexerActionExecutor) && ATNConfig.prototype.equals.call(this, other);
  };
  LexerATNConfig.prototype.hashCodeForConfigSet = LexerATNConfig.prototype.hashCode;
  LexerATNConfig.prototype.equalsForConfigSet = LexerATNConfig.prototype.equals;
  LexerATNConfig.prototype.checkNonGreedyDecision = function(source, target) {
    return source.passedThroughNonGreedyDecision || target instanceof DecisionState && target.nonGreedy;
  };
  exports.ATNConfig = ATNConfig;
  exports.LexerATNConfig = LexerATNConfig;
});

// node_modules/antlr4/IntervalSet.js
var require_IntervalSet = __commonJS((exports) => {
  var Token = require_Token().Token;
  function Interval(start, stop) {
    this.start = start;
    this.stop = stop;
    return this;
  }
  Interval.prototype.contains = function(item) {
    return item >= this.start && item < this.stop;
  };
  Interval.prototype.toString = function() {
    if (this.start === this.stop - 1) {
      return this.start.toString();
    } else {
      return this.start.toString() + ".." + (this.stop - 1).toString();
    }
  };
  Object.defineProperty(Interval.prototype, "length", {
    get: function() {
      return this.stop - this.start;
    }
  });
  function IntervalSet() {
    this.intervals = null;
    this.readOnly = false;
  }
  IntervalSet.prototype.first = function(v) {
    if (this.intervals === null || this.intervals.length === 0) {
      return Token.INVALID_TYPE;
    } else {
      return this.intervals[0].start;
    }
  };
  IntervalSet.prototype.addOne = function(v) {
    this.addInterval(new Interval(v, v + 1));
  };
  IntervalSet.prototype.addRange = function(l, h) {
    this.addInterval(new Interval(l, h + 1));
  };
  IntervalSet.prototype.addInterval = function(v) {
    if (this.intervals === null) {
      this.intervals = [];
      this.intervals.push(v);
    } else {
      for (var k = 0; k < this.intervals.length; k++) {
        var i = this.intervals[k];
        if (v.stop < i.start) {
          this.intervals.splice(k, 0, v);
          return;
        } else if (v.stop === i.start) {
          this.intervals[k].start = v.start;
          return;
        } else if (v.start <= i.stop) {
          this.intervals[k] = new Interval(Math.min(i.start, v.start), Math.max(i.stop, v.stop));
          this.reduce(k);
          return;
        }
      }
      this.intervals.push(v);
    }
  };
  IntervalSet.prototype.addSet = function(other) {
    if (other.intervals !== null) {
      for (var k = 0; k < other.intervals.length; k++) {
        var i = other.intervals[k];
        this.addInterval(new Interval(i.start, i.stop));
      }
    }
    return this;
  };
  IntervalSet.prototype.reduce = function(k) {
    if (k < this.intervalslength - 1) {
      var l = this.intervals[k];
      var r = this.intervals[k + 1];
      if (l.stop >= r.stop) {
        this.intervals.pop(k + 1);
        this.reduce(k);
      } else if (l.stop >= r.start) {
        this.intervals[k] = new Interval(l.start, r.stop);
        this.intervals.pop(k + 1);
      }
    }
  };
  IntervalSet.prototype.complement = function(start, stop) {
    var result = new IntervalSet();
    result.addInterval(new Interval(start, stop + 1));
    for (var i = 0; i < this.intervals.length; i++) {
      result.removeRange(this.intervals[i]);
    }
    return result;
  };
  IntervalSet.prototype.contains = function(item) {
    if (this.intervals === null) {
      return false;
    } else {
      for (var k = 0; k < this.intervals.length; k++) {
        if (this.intervals[k].contains(item)) {
          return true;
        }
      }
      return false;
    }
  };
  Object.defineProperty(IntervalSet.prototype, "length", {
    get: function() {
      var len = 0;
      this.intervals.map(function(i) {
        len += i.length;
      });
      return len;
    }
  });
  IntervalSet.prototype.removeRange = function(v) {
    if (v.start === v.stop - 1) {
      this.removeOne(v.start);
    } else if (this.intervals !== null) {
      var k = 0;
      for (var n = 0; n < this.intervals.length; n++) {
        var i = this.intervals[k];
        if (v.stop <= i.start) {
          return;
        } else if (v.start > i.start && v.stop < i.stop) {
          this.intervals[k] = new Interval(i.start, v.start);
          var x = new Interval(v.stop, i.stop);
          this.intervals.splice(k, 0, x);
          return;
        } else if (v.start <= i.start && v.stop >= i.stop) {
          this.intervals.splice(k, 1);
          k = k - 1;
        } else if (v.start < i.stop) {
          this.intervals[k] = new Interval(i.start, v.start);
        } else if (v.stop < i.stop) {
          this.intervals[k] = new Interval(v.stop, i.stop);
        }
        k += 1;
      }
    }
  };
  IntervalSet.prototype.removeOne = function(v) {
    if (this.intervals !== null) {
      for (var k = 0; k < this.intervals.length; k++) {
        var i = this.intervals[k];
        if (v < i.start) {
          return;
        } else if (v === i.start && v === i.stop - 1) {
          this.intervals.splice(k, 1);
          return;
        } else if (v === i.start) {
          this.intervals[k] = new Interval(i.start + 1, i.stop);
          return;
        } else if (v === i.stop - 1) {
          this.intervals[k] = new Interval(i.start, i.stop - 1);
          return;
        } else if (v < i.stop - 1) {
          var x = new Interval(i.start, v);
          i.start = v + 1;
          this.intervals.splice(k, 0, x);
          return;
        }
      }
    }
  };
  IntervalSet.prototype.toString = function(literalNames, symbolicNames, elemsAreChar) {
    literalNames = literalNames || null;
    symbolicNames = symbolicNames || null;
    elemsAreChar = elemsAreChar || false;
    if (this.intervals === null) {
      return "{}";
    } else if (literalNames !== null || symbolicNames !== null) {
      return this.toTokenString(literalNames, symbolicNames);
    } else if (elemsAreChar) {
      return this.toCharString();
    } else {
      return this.toIndexString();
    }
  };
  IntervalSet.prototype.toCharString = function() {
    var names = [];
    for (var i = 0; i < this.intervals.length; i++) {
      var v = this.intervals[i];
      if (v.stop === v.start + 1) {
        if (v.start === Token.EOF) {
          names.push("<EOF>");
        } else {
          names.push("'" + String.fromCharCode(v.start) + "'");
        }
      } else {
        names.push("'" + String.fromCharCode(v.start) + "'..'" + String.fromCharCode(v.stop - 1) + "'");
      }
    }
    if (names.length > 1) {
      return "{" + names.join(", ") + "}";
    } else {
      return names[0];
    }
  };
  IntervalSet.prototype.toIndexString = function() {
    var names = [];
    for (var i = 0; i < this.intervals.length; i++) {
      var v = this.intervals[i];
      if (v.stop === v.start + 1) {
        if (v.start === Token.EOF) {
          names.push("<EOF>");
        } else {
          names.push(v.start.toString());
        }
      } else {
        names.push(v.start.toString() + ".." + (v.stop - 1).toString());
      }
    }
    if (names.length > 1) {
      return "{" + names.join(", ") + "}";
    } else {
      return names[0];
    }
  };
  IntervalSet.prototype.toTokenString = function(literalNames, symbolicNames) {
    var names = [];
    for (var i = 0; i < this.intervals.length; i++) {
      var v = this.intervals[i];
      for (var j = v.start; j < v.stop; j++) {
        names.push(this.elementName(literalNames, symbolicNames, j));
      }
    }
    if (names.length > 1) {
      return "{" + names.join(", ") + "}";
    } else {
      return names[0];
    }
  };
  IntervalSet.prototype.elementName = function(literalNames, symbolicNames, a) {
    if (a === Token.EOF) {
      return "<EOF>";
    } else if (a === Token.EPSILON) {
      return "<EPSILON>";
    } else {
      return literalNames[a] || symbolicNames[a];
    }
  };
  exports.Interval = Interval;
  exports.IntervalSet = IntervalSet;
});

// node_modules/antlr4/atn/Transition.js
var require_Transition = __commonJS((exports) => {
  var Token = require_Token().Token;
  var Interval = require_IntervalSet().Interval;
  var IntervalSet = require_IntervalSet().IntervalSet;
  var Predicate = require_SemanticContext().Predicate;
  var PrecedencePredicate = require_SemanticContext().PrecedencePredicate;
  function Transition(target) {
    if (target === void 0 || target === null) {
      throw "target cannot be null.";
    }
    this.target = target;
    this.isEpsilon = false;
    this.label = null;
    return this;
  }
  Transition.EPSILON = 1;
  Transition.RANGE = 2;
  Transition.RULE = 3;
  Transition.PREDICATE = 4;
  Transition.ATOM = 5;
  Transition.ACTION = 6;
  Transition.SET = 7;
  Transition.NOT_SET = 8;
  Transition.WILDCARD = 9;
  Transition.PRECEDENCE = 10;
  Transition.serializationNames = [
    "INVALID",
    "EPSILON",
    "RANGE",
    "RULE",
    "PREDICATE",
    "ATOM",
    "ACTION",
    "SET",
    "NOT_SET",
    "WILDCARD",
    "PRECEDENCE"
  ];
  Transition.serializationTypes = {
    EpsilonTransition: Transition.EPSILON,
    RangeTransition: Transition.RANGE,
    RuleTransition: Transition.RULE,
    PredicateTransition: Transition.PREDICATE,
    AtomTransition: Transition.ATOM,
    ActionTransition: Transition.ACTION,
    SetTransition: Transition.SET,
    NotSetTransition: Transition.NOT_SET,
    WildcardTransition: Transition.WILDCARD,
    PrecedencePredicateTransition: Transition.PRECEDENCE
  };
  function AtomTransition2(target, label) {
    Transition.call(this, target);
    this.label_ = label;
    this.label = this.makeLabel();
    this.serializationType = Transition.ATOM;
    return this;
  }
  AtomTransition2.prototype = Object.create(Transition.prototype);
  AtomTransition2.prototype.constructor = AtomTransition2;
  AtomTransition2.prototype.makeLabel = function() {
    var s = new IntervalSet();
    s.addOne(this.label_);
    return s;
  };
  AtomTransition2.prototype.matches = function(symbol, minVocabSymbol, maxVocabSymbol) {
    return this.label_ === symbol;
  };
  AtomTransition2.prototype.toString = function() {
    return this.label_;
  };
  function RuleTransition(ruleStart, ruleIndex, precedence, followState) {
    Transition.call(this, ruleStart);
    this.ruleIndex = ruleIndex;
    this.precedence = precedence;
    this.followState = followState;
    this.serializationType = Transition.RULE;
    this.isEpsilon = true;
    return this;
  }
  RuleTransition.prototype = Object.create(Transition.prototype);
  RuleTransition.prototype.constructor = RuleTransition;
  RuleTransition.prototype.matches = function(symbol, minVocabSymbol, maxVocabSymbol) {
    return false;
  };
  function EpsilonTransition(target, outermostPrecedenceReturn) {
    Transition.call(this, target);
    this.serializationType = Transition.EPSILON;
    this.isEpsilon = true;
    this.outermostPrecedenceReturn = outermostPrecedenceReturn;
    return this;
  }
  EpsilonTransition.prototype = Object.create(Transition.prototype);
  EpsilonTransition.prototype.constructor = EpsilonTransition;
  EpsilonTransition.prototype.matches = function(symbol, minVocabSymbol, maxVocabSymbol) {
    return false;
  };
  EpsilonTransition.prototype.toString = function() {
    return "epsilon";
  };
  function RangeTransition(target, start, stop) {
    Transition.call(this, target);
    this.serializationType = Transition.RANGE;
    this.start = start;
    this.stop = stop;
    this.label = this.makeLabel();
    return this;
  }
  RangeTransition.prototype = Object.create(Transition.prototype);
  RangeTransition.prototype.constructor = RangeTransition;
  RangeTransition.prototype.makeLabel = function() {
    var s = new IntervalSet();
    s.addRange(this.start, this.stop);
    return s;
  };
  RangeTransition.prototype.matches = function(symbol, minVocabSymbol, maxVocabSymbol) {
    return symbol >= this.start && symbol <= this.stop;
  };
  RangeTransition.prototype.toString = function() {
    return "'" + String.fromCharCode(this.start) + "'..'" + String.fromCharCode(this.stop) + "'";
  };
  function AbstractPredicateTransition(target) {
    Transition.call(this, target);
    return this;
  }
  AbstractPredicateTransition.prototype = Object.create(Transition.prototype);
  AbstractPredicateTransition.prototype.constructor = AbstractPredicateTransition;
  function PredicateTransition(target, ruleIndex, predIndex, isCtxDependent) {
    AbstractPredicateTransition.call(this, target);
    this.serializationType = Transition.PREDICATE;
    this.ruleIndex = ruleIndex;
    this.predIndex = predIndex;
    this.isCtxDependent = isCtxDependent;
    this.isEpsilon = true;
    return this;
  }
  PredicateTransition.prototype = Object.create(AbstractPredicateTransition.prototype);
  PredicateTransition.prototype.constructor = PredicateTransition;
  PredicateTransition.prototype.matches = function(symbol, minVocabSymbol, maxVocabSymbol) {
    return false;
  };
  PredicateTransition.prototype.getPredicate = function() {
    return new Predicate(this.ruleIndex, this.predIndex, this.isCtxDependent);
  };
  PredicateTransition.prototype.toString = function() {
    return "pred_" + this.ruleIndex + ":" + this.predIndex;
  };
  function ActionTransition(target, ruleIndex, actionIndex, isCtxDependent) {
    Transition.call(this, target);
    this.serializationType = Transition.ACTION;
    this.ruleIndex = ruleIndex;
    this.actionIndex = actionIndex === void 0 ? -1 : actionIndex;
    this.isCtxDependent = isCtxDependent === void 0 ? false : isCtxDependent;
    this.isEpsilon = true;
    return this;
  }
  ActionTransition.prototype = Object.create(Transition.prototype);
  ActionTransition.prototype.constructor = ActionTransition;
  ActionTransition.prototype.matches = function(symbol, minVocabSymbol, maxVocabSymbol) {
    return false;
  };
  ActionTransition.prototype.toString = function() {
    return "action_" + this.ruleIndex + ":" + this.actionIndex;
  };
  function SetTransition(target, set) {
    Transition.call(this, target);
    this.serializationType = Transition.SET;
    if (set !== void 0 && set !== null) {
      this.label = set;
    } else {
      this.label = new IntervalSet();
      this.label.addOne(Token.INVALID_TYPE);
    }
    return this;
  }
  SetTransition.prototype = Object.create(Transition.prototype);
  SetTransition.prototype.constructor = SetTransition;
  SetTransition.prototype.matches = function(symbol, minVocabSymbol, maxVocabSymbol) {
    return this.label.contains(symbol);
  };
  SetTransition.prototype.toString = function() {
    return this.label.toString();
  };
  function NotSetTransition(target, set) {
    SetTransition.call(this, target, set);
    this.serializationType = Transition.NOT_SET;
    return this;
  }
  NotSetTransition.prototype = Object.create(SetTransition.prototype);
  NotSetTransition.prototype.constructor = NotSetTransition;
  NotSetTransition.prototype.matches = function(symbol, minVocabSymbol, maxVocabSymbol) {
    return symbol >= minVocabSymbol && symbol <= maxVocabSymbol && !SetTransition.prototype.matches.call(this, symbol, minVocabSymbol, maxVocabSymbol);
  };
  NotSetTransition.prototype.toString = function() {
    return "~" + SetTransition.prototype.toString.call(this);
  };
  function WildcardTransition(target) {
    Transition.call(this, target);
    this.serializationType = Transition.WILDCARD;
    return this;
  }
  WildcardTransition.prototype = Object.create(Transition.prototype);
  WildcardTransition.prototype.constructor = WildcardTransition;
  WildcardTransition.prototype.matches = function(symbol, minVocabSymbol, maxVocabSymbol) {
    return symbol >= minVocabSymbol && symbol <= maxVocabSymbol;
  };
  WildcardTransition.prototype.toString = function() {
    return ".";
  };
  function PrecedencePredicateTransition(target, precedence) {
    AbstractPredicateTransition.call(this, target);
    this.serializationType = Transition.PRECEDENCE;
    this.precedence = precedence;
    this.isEpsilon = true;
    return this;
  }
  PrecedencePredicateTransition.prototype = Object.create(AbstractPredicateTransition.prototype);
  PrecedencePredicateTransition.prototype.constructor = PrecedencePredicateTransition;
  PrecedencePredicateTransition.prototype.matches = function(symbol, minVocabSymbol, maxVocabSymbol) {
    return false;
  };
  PrecedencePredicateTransition.prototype.getPredicate = function() {
    return new PrecedencePredicate(this.precedence);
  };
  PrecedencePredicateTransition.prototype.toString = function() {
    return this.precedence + " >= _p";
  };
  exports.Transition = Transition;
  exports.AtomTransition = AtomTransition2;
  exports.SetTransition = SetTransition;
  exports.NotSetTransition = NotSetTransition;
  exports.RuleTransition = RuleTransition;
  exports.ActionTransition = ActionTransition;
  exports.EpsilonTransition = EpsilonTransition;
  exports.RangeTransition = RangeTransition;
  exports.WildcardTransition = WildcardTransition;
  exports.PredicateTransition = PredicateTransition;
  exports.PrecedencePredicateTransition = PrecedencePredicateTransition;
  exports.AbstractPredicateTransition = AbstractPredicateTransition;
});

// node_modules/antlr4/tree/Tree.js
var require_Tree = __commonJS((exports) => {
  var Token = require_Token().Token;
  var Interval = require_IntervalSet().Interval;
  var INVALID_INTERVAL = new Interval(-1, -2);
  var Utils = require_Utils();
  function Tree() {
    return this;
  }
  function SyntaxTree() {
    Tree.call(this);
    return this;
  }
  SyntaxTree.prototype = Object.create(Tree.prototype);
  SyntaxTree.prototype.constructor = SyntaxTree;
  function ParseTree() {
    SyntaxTree.call(this);
    return this;
  }
  ParseTree.prototype = Object.create(SyntaxTree.prototype);
  ParseTree.prototype.constructor = ParseTree;
  function RuleNode() {
    ParseTree.call(this);
    return this;
  }
  RuleNode.prototype = Object.create(ParseTree.prototype);
  RuleNode.prototype.constructor = RuleNode;
  function TerminalNode() {
    ParseTree.call(this);
    return this;
  }
  TerminalNode.prototype = Object.create(ParseTree.prototype);
  TerminalNode.prototype.constructor = TerminalNode;
  function ErrorNode() {
    TerminalNode.call(this);
    return this;
  }
  ErrorNode.prototype = Object.create(TerminalNode.prototype);
  ErrorNode.prototype.constructor = ErrorNode;
  function ParseTreeVisitor() {
    return this;
  }
  ParseTreeVisitor.prototype.visit = function(ctx) {
    if (Array.isArray(ctx)) {
      return ctx.map(function(child) {
        return child.accept(this);
      }, this);
    } else {
      return ctx.accept(this);
    }
  };
  ParseTreeVisitor.prototype.visitChildren = function(ctx) {
    if (ctx.children) {
      return this.visit(ctx.children);
    } else {
      return null;
    }
  };
  ParseTreeVisitor.prototype.visitTerminal = function(node) {
  };
  ParseTreeVisitor.prototype.visitErrorNode = function(node) {
  };
  function ParseTreeListener() {
    return this;
  }
  ParseTreeListener.prototype.visitTerminal = function(node) {
  };
  ParseTreeListener.prototype.visitErrorNode = function(node) {
  };
  ParseTreeListener.prototype.enterEveryRule = function(node) {
  };
  ParseTreeListener.prototype.exitEveryRule = function(node) {
  };
  function TerminalNodeImpl(symbol) {
    TerminalNode.call(this);
    this.parentCtx = null;
    this.symbol = symbol;
    return this;
  }
  TerminalNodeImpl.prototype = Object.create(TerminalNode.prototype);
  TerminalNodeImpl.prototype.constructor = TerminalNodeImpl;
  TerminalNodeImpl.prototype.getChild = function(i) {
    return null;
  };
  TerminalNodeImpl.prototype.getSymbol = function() {
    return this.symbol;
  };
  TerminalNodeImpl.prototype.getParent = function() {
    return this.parentCtx;
  };
  TerminalNodeImpl.prototype.getPayload = function() {
    return this.symbol;
  };
  TerminalNodeImpl.prototype.getSourceInterval = function() {
    if (this.symbol === null) {
      return INVALID_INTERVAL;
    }
    var tokenIndex = this.symbol.tokenIndex;
    return new Interval(tokenIndex, tokenIndex);
  };
  TerminalNodeImpl.prototype.getChildCount = function() {
    return 0;
  };
  TerminalNodeImpl.prototype.accept = function(visitor) {
    return visitor.visitTerminal(this);
  };
  TerminalNodeImpl.prototype.getText = function() {
    return this.symbol.text;
  };
  TerminalNodeImpl.prototype.toString = function() {
    if (this.symbol.type === Token.EOF) {
      return "<EOF>";
    } else {
      return this.symbol.text;
    }
  };
  function ErrorNodeImpl(token) {
    TerminalNodeImpl.call(this, token);
    return this;
  }
  ErrorNodeImpl.prototype = Object.create(TerminalNodeImpl.prototype);
  ErrorNodeImpl.prototype.constructor = ErrorNodeImpl;
  ErrorNodeImpl.prototype.isErrorNode = function() {
    return true;
  };
  ErrorNodeImpl.prototype.accept = function(visitor) {
    return visitor.visitErrorNode(this);
  };
  function ParseTreeWalker() {
    return this;
  }
  ParseTreeWalker.prototype.walk = function(listener, t) {
    var errorNode = t instanceof ErrorNode || t.isErrorNode !== void 0 && t.isErrorNode();
    if (errorNode) {
      listener.visitErrorNode(t);
    } else if (t instanceof TerminalNode) {
      listener.visitTerminal(t);
    } else {
      this.enterRule(listener, t);
      for (var i = 0; i < t.getChildCount(); i++) {
        var child = t.getChild(i);
        this.walk(listener, child);
      }
      this.exitRule(listener, t);
    }
  };
  ParseTreeWalker.prototype.enterRule = function(listener, r) {
    var ctx = r.getRuleContext();
    listener.enterEveryRule(ctx);
    ctx.enterRule(listener);
  };
  ParseTreeWalker.prototype.exitRule = function(listener, r) {
    var ctx = r.getRuleContext();
    ctx.exitRule(listener);
    listener.exitEveryRule(ctx);
  };
  ParseTreeWalker.DEFAULT = new ParseTreeWalker();
  exports.RuleNode = RuleNode;
  exports.ErrorNode = ErrorNode;
  exports.TerminalNode = TerminalNode;
  exports.ErrorNodeImpl = ErrorNodeImpl;
  exports.TerminalNodeImpl = TerminalNodeImpl;
  exports.ParseTreeListener = ParseTreeListener;
  exports.ParseTreeVisitor = ParseTreeVisitor;
  exports.ParseTreeWalker = ParseTreeWalker;
  exports.INVALID_INTERVAL = INVALID_INTERVAL;
});

// node_modules/antlr4/ParserRuleContext.js
var require_ParserRuleContext = __commonJS((exports) => {
  var RuleContext = require_RuleContext().RuleContext;
  var Tree = require_Tree();
  var INVALID_INTERVAL = Tree.INVALID_INTERVAL;
  var TerminalNode = Tree.TerminalNode;
  var TerminalNodeImpl = Tree.TerminalNodeImpl;
  var ErrorNodeImpl = Tree.ErrorNodeImpl;
  var Interval = require_IntervalSet().Interval;
  function ParserRuleContext(parent, invokingStateNumber) {
    parent = parent || null;
    invokingStateNumber = invokingStateNumber || null;
    RuleContext.call(this, parent, invokingStateNumber);
    this.ruleIndex = -1;
    this.children = null;
    this.start = null;
    this.stop = null;
    this.exception = null;
  }
  ParserRuleContext.prototype = Object.create(RuleContext.prototype);
  ParserRuleContext.prototype.constructor = ParserRuleContext;
  ParserRuleContext.prototype.copyFrom = function(ctx) {
    this.parentCtx = ctx.parentCtx;
    this.invokingState = ctx.invokingState;
    this.children = null;
    this.start = ctx.start;
    this.stop = ctx.stop;
    if (ctx.children) {
      this.children = [];
      ctx.children.map(function(child) {
        if (child instanceof ErrorNodeImpl) {
          this.children.push(child);
          child.parentCtx = this;
        }
      }, this);
    }
  };
  ParserRuleContext.prototype.enterRule = function(listener) {
  };
  ParserRuleContext.prototype.exitRule = function(listener) {
  };
  ParserRuleContext.prototype.addChild = function(child) {
    if (this.children === null) {
      this.children = [];
    }
    this.children.push(child);
    return child;
  };
  ParserRuleContext.prototype.removeLastChild = function() {
    if (this.children !== null) {
      this.children.pop();
    }
  };
  ParserRuleContext.prototype.addTokenNode = function(token) {
    var node = new TerminalNodeImpl(token);
    this.addChild(node);
    node.parentCtx = this;
    return node;
  };
  ParserRuleContext.prototype.addErrorNode = function(badToken) {
    var node = new ErrorNodeImpl(badToken);
    this.addChild(node);
    node.parentCtx = this;
    return node;
  };
  ParserRuleContext.prototype.getChild = function(i, type) {
    type = type || null;
    if (this.children === null || i < 0 || i >= this.children.length) {
      return null;
    }
    if (type === null) {
      return this.children[i];
    } else {
      for (var j = 0; j < this.children.length; j++) {
        var child = this.children[j];
        if (child instanceof type) {
          if (i === 0) {
            return child;
          } else {
            i -= 1;
          }
        }
      }
      return null;
    }
  };
  ParserRuleContext.prototype.getToken = function(ttype, i) {
    if (this.children === null || i < 0 || i >= this.children.length) {
      return null;
    }
    for (var j = 0; j < this.children.length; j++) {
      var child = this.children[j];
      if (child instanceof TerminalNode) {
        if (child.symbol.type === ttype) {
          if (i === 0) {
            return child;
          } else {
            i -= 1;
          }
        }
      }
    }
    return null;
  };
  ParserRuleContext.prototype.getTokens = function(ttype) {
    if (this.children === null) {
      return [];
    } else {
      var tokens = [];
      for (var j = 0; j < this.children.length; j++) {
        var child = this.children[j];
        if (child instanceof TerminalNode) {
          if (child.symbol.type === ttype) {
            tokens.push(child);
          }
        }
      }
      return tokens;
    }
  };
  ParserRuleContext.prototype.getTypedRuleContext = function(ctxType, i) {
    return this.getChild(i, ctxType);
  };
  ParserRuleContext.prototype.getTypedRuleContexts = function(ctxType) {
    if (this.children === null) {
      return [];
    } else {
      var contexts = [];
      for (var j = 0; j < this.children.length; j++) {
        var child = this.children[j];
        if (child instanceof ctxType) {
          contexts.push(child);
        }
      }
      return contexts;
    }
  };
  ParserRuleContext.prototype.getChildCount = function() {
    if (this.children === null) {
      return 0;
    } else {
      return this.children.length;
    }
  };
  ParserRuleContext.prototype.getSourceInterval = function() {
    if (this.start === null || this.stop === null) {
      return INVALID_INTERVAL;
    } else {
      return new Interval(this.start.tokenIndex, this.stop.tokenIndex);
    }
  };
  RuleContext.EMPTY = new ParserRuleContext();
  function InterpreterRuleContext(parent, invokingStateNumber, ruleIndex) {
    ParserRuleContext.call(parent, invokingStateNumber);
    this.ruleIndex = ruleIndex;
    return this;
  }
  InterpreterRuleContext.prototype = Object.create(ParserRuleContext.prototype);
  InterpreterRuleContext.prototype.constructor = InterpreterRuleContext;
  exports.ParserRuleContext = ParserRuleContext;
});

// node_modules/antlr4/tree/Trees.js
var require_Trees = __commonJS((exports) => {
  var Utils = require_Utils();
  var Token = require_Token().Token;
  var RuleNode = require_Tree().RuleNode;
  var ErrorNode = require_Tree().ErrorNode;
  var TerminalNode = require_Tree().TerminalNode;
  var ParserRuleContext = require_ParserRuleContext().ParserRuleContext;
  var RuleContext = require_RuleContext().RuleContext;
  var INVALID_ALT_NUMBER = require_ATN().INVALID_ALT_NUMBER;
  function Trees() {
  }
  Trees.toStringTree = function(tree, ruleNames, recog) {
    ruleNames = ruleNames || null;
    recog = recog || null;
    if (recog !== null) {
      ruleNames = recog.ruleNames;
    }
    var s = Trees.getNodeText(tree, ruleNames);
    s = Utils.escapeWhitespace(s, false);
    var c = tree.getChildCount();
    if (c === 0) {
      return s;
    }
    var res = "(" + s + " ";
    if (c > 0) {
      s = Trees.toStringTree(tree.getChild(0), ruleNames);
      res = res.concat(s);
    }
    for (var i = 1; i < c; i++) {
      s = Trees.toStringTree(tree.getChild(i), ruleNames);
      res = res.concat(" " + s);
    }
    res = res.concat(")");
    return res;
  };
  Trees.getNodeText = function(t, ruleNames, recog) {
    ruleNames = ruleNames || null;
    recog = recog || null;
    if (recog !== null) {
      ruleNames = recog.ruleNames;
    }
    if (ruleNames !== null) {
      if (t instanceof RuleContext) {
        var altNumber = t.getAltNumber();
        if (altNumber != INVALID_ALT_NUMBER) {
          return ruleNames[t.ruleIndex] + ":" + altNumber;
        }
        return ruleNames[t.ruleIndex];
      } else if (t instanceof ErrorNode) {
        return t.toString();
      } else if (t instanceof TerminalNode) {
        if (t.symbol !== null) {
          return t.symbol.text;
        }
      }
    }
    var payload = t.getPayload();
    if (payload instanceof Token) {
      return payload.text;
    }
    return t.getPayload().toString();
  };
  Trees.getChildren = function(t) {
    var list = [];
    for (var i = 0; i < t.getChildCount(); i++) {
      list.push(t.getChild(i));
    }
    return list;
  };
  Trees.getAncestors = function(t) {
    var ancestors = [];
    t = t.getParent();
    while (t !== null) {
      ancestors = [t].concat(ancestors);
      t = t.getParent();
    }
    return ancestors;
  };
  Trees.findAllTokenNodes = function(t, ttype) {
    return Trees.findAllNodes(t, ttype, true);
  };
  Trees.findAllRuleNodes = function(t, ruleIndex) {
    return Trees.findAllNodes(t, ruleIndex, false);
  };
  Trees.findAllNodes = function(t, index, findTokens) {
    var nodes = [];
    Trees._findAllNodes(t, index, findTokens, nodes);
    return nodes;
  };
  Trees._findAllNodes = function(t, index, findTokens, nodes) {
    if (findTokens && t instanceof TerminalNode) {
      if (t.symbol.type === index) {
        nodes.push(t);
      }
    } else if (!findTokens && t instanceof ParserRuleContext) {
      if (t.ruleIndex === index) {
        nodes.push(t);
      }
    }
    for (var i = 0; i < t.getChildCount(); i++) {
      Trees._findAllNodes(t.getChild(i), index, findTokens, nodes);
    }
  };
  Trees.descendants = function(t) {
    var nodes = [t];
    for (var i = 0; i < t.getChildCount(); i++) {
      nodes = nodes.concat(Trees.descendants(t.getChild(i)));
    }
    return nodes;
  };
  exports.Trees = Trees;
});

// node_modules/antlr4/RuleContext.js
var require_RuleContext = __commonJS((exports) => {
  var RuleNode = require_Tree().RuleNode;
  var INVALID_INTERVAL = require_Tree().INVALID_INTERVAL;
  var INVALID_ALT_NUMBER = require_ATN().INVALID_ALT_NUMBER;
  function RuleContext(parent, invokingState) {
    RuleNode.call(this);
    this.parentCtx = parent || null;
    this.invokingState = invokingState || -1;
    return this;
  }
  RuleContext.prototype = Object.create(RuleNode.prototype);
  RuleContext.prototype.constructor = RuleContext;
  RuleContext.prototype.depth = function() {
    var n = 0;
    var p = this;
    while (p !== null) {
      p = p.parentCtx;
      n += 1;
    }
    return n;
  };
  RuleContext.prototype.isEmpty = function() {
    return this.invokingState === -1;
  };
  RuleContext.prototype.getSourceInterval = function() {
    return INVALID_INTERVAL;
  };
  RuleContext.prototype.getRuleContext = function() {
    return this;
  };
  RuleContext.prototype.getPayload = function() {
    return this;
  };
  RuleContext.prototype.getText = function() {
    if (this.getChildCount() === 0) {
      return "";
    } else {
      return this.children.map(function(child) {
        return child.getText();
      }).join("");
    }
  };
  RuleContext.prototype.getAltNumber = function() {
    return INVALID_ALT_NUMBER;
  };
  RuleContext.prototype.setAltNumber = function(altNumber) {
  };
  RuleContext.prototype.getChild = function(i) {
    return null;
  };
  RuleContext.prototype.getChildCount = function() {
    return 0;
  };
  RuleContext.prototype.accept = function(visitor) {
    return visitor.visitChildren(this);
  };
  exports.RuleContext = RuleContext;
  var Trees = require_Trees().Trees;
  RuleContext.prototype.toStringTree = function(ruleNames, recog) {
    return Trees.toStringTree(this, ruleNames, recog);
  };
  RuleContext.prototype.toString = function(ruleNames, stop) {
    ruleNames = ruleNames || null;
    stop = stop || null;
    var p = this;
    var s = "[";
    while (p !== null && p !== stop) {
      if (ruleNames === null) {
        if (!p.isEmpty()) {
          s += p.invokingState;
        }
      } else {
        var ri = p.ruleIndex;
        var ruleName = ri >= 0 && ri < ruleNames.length ? ruleNames[ri] : "" + ri;
        s += ruleName;
      }
      if (p.parentCtx !== null && (ruleNames !== null || !p.parentCtx.isEmpty())) {
        s += " ";
      }
      p = p.parentCtx;
    }
    s += "]";
    return s;
  };
});

// node_modules/antlr4/PredictionContext.js
var require_PredictionContext = __commonJS((exports) => {
  var RuleContext = require_RuleContext().RuleContext;
  var Hash2 = require_Utils().Hash;
  var Map = require_Utils().Map;
  function PredictionContext(cachedHashCode) {
    this.cachedHashCode = cachedHashCode;
  }
  PredictionContext.EMPTY = null;
  PredictionContext.EMPTY_RETURN_STATE = 2147483647;
  PredictionContext.globalNodeCount = 1;
  PredictionContext.id = PredictionContext.globalNodeCount;
  PredictionContext.prototype.isEmpty = function() {
    return this === PredictionContext.EMPTY;
  };
  PredictionContext.prototype.hasEmptyPath = function() {
    return this.getReturnState(this.length - 1) === PredictionContext.EMPTY_RETURN_STATE;
  };
  PredictionContext.prototype.hashCode = function() {
    return this.cachedHashCode;
  };
  PredictionContext.prototype.updateHashCode = function(hash) {
    hash.update(this.cachedHashCode);
  };
  function PredictionContextCache() {
    this.cache = new Map();
    return this;
  }
  PredictionContextCache.prototype.add = function(ctx) {
    if (ctx === PredictionContext.EMPTY) {
      return PredictionContext.EMPTY;
    }
    var existing = this.cache.get(ctx) || null;
    if (existing !== null) {
      return existing;
    }
    this.cache.put(ctx, ctx);
    return ctx;
  };
  PredictionContextCache.prototype.get = function(ctx) {
    return this.cache.get(ctx) || null;
  };
  Object.defineProperty(PredictionContextCache.prototype, "length", {
    get: function() {
      return this.cache.length;
    }
  });
  function SingletonPredictionContext(parent, returnState) {
    var hashCode = 0;
    var hash = new Hash2();
    if (parent !== null) {
      hash.update(parent, returnState);
    } else {
      hash.update(1);
    }
    hashCode = hash.finish();
    PredictionContext.call(this, hashCode);
    this.parentCtx = parent;
    this.returnState = returnState;
  }
  SingletonPredictionContext.prototype = Object.create(PredictionContext.prototype);
  SingletonPredictionContext.prototype.contructor = SingletonPredictionContext;
  SingletonPredictionContext.create = function(parent, returnState) {
    if (returnState === PredictionContext.EMPTY_RETURN_STATE && parent === null) {
      return PredictionContext.EMPTY;
    } else {
      return new SingletonPredictionContext(parent, returnState);
    }
  };
  Object.defineProperty(SingletonPredictionContext.prototype, "length", {
    get: function() {
      return 1;
    }
  });
  SingletonPredictionContext.prototype.getParent = function(index) {
    return this.parentCtx;
  };
  SingletonPredictionContext.prototype.getReturnState = function(index) {
    return this.returnState;
  };
  SingletonPredictionContext.prototype.equals = function(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof SingletonPredictionContext)) {
      return false;
    } else if (this.hashCode() !== other.hashCode()) {
      return false;
    } else {
      if (this.returnState !== other.returnState)
        return false;
      else if (this.parentCtx == null)
        return other.parentCtx == null;
      else
        return this.parentCtx.equals(other.parentCtx);
    }
  };
  SingletonPredictionContext.prototype.toString = function() {
    var up = this.parentCtx === null ? "" : this.parentCtx.toString();
    if (up.length === 0) {
      if (this.returnState === PredictionContext.EMPTY_RETURN_STATE) {
        return "$";
      } else {
        return "" + this.returnState;
      }
    } else {
      return "" + this.returnState + " " + up;
    }
  };
  function EmptyPredictionContext() {
    SingletonPredictionContext.call(this, null, PredictionContext.EMPTY_RETURN_STATE);
    return this;
  }
  EmptyPredictionContext.prototype = Object.create(SingletonPredictionContext.prototype);
  EmptyPredictionContext.prototype.constructor = EmptyPredictionContext;
  EmptyPredictionContext.prototype.isEmpty = function() {
    return true;
  };
  EmptyPredictionContext.prototype.getParent = function(index) {
    return null;
  };
  EmptyPredictionContext.prototype.getReturnState = function(index) {
    return this.returnState;
  };
  EmptyPredictionContext.prototype.equals = function(other) {
    return this === other;
  };
  EmptyPredictionContext.prototype.toString = function() {
    return "$";
  };
  PredictionContext.EMPTY = new EmptyPredictionContext();
  function ArrayPredictionContext(parents, returnStates) {
    var h = new Hash2();
    h.update(parents, returnStates);
    var hashCode = h.finish();
    PredictionContext.call(this, hashCode);
    this.parents = parents;
    this.returnStates = returnStates;
    return this;
  }
  ArrayPredictionContext.prototype = Object.create(PredictionContext.prototype);
  ArrayPredictionContext.prototype.constructor = ArrayPredictionContext;
  ArrayPredictionContext.prototype.isEmpty = function() {
    return this.returnStates[0] === PredictionContext.EMPTY_RETURN_STATE;
  };
  Object.defineProperty(ArrayPredictionContext.prototype, "length", {
    get: function() {
      return this.returnStates.length;
    }
  });
  ArrayPredictionContext.prototype.getParent = function(index) {
    return this.parents[index];
  };
  ArrayPredictionContext.prototype.getReturnState = function(index) {
    return this.returnStates[index];
  };
  ArrayPredictionContext.prototype.equals = function(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof ArrayPredictionContext)) {
      return false;
    } else if (this.hashCode() !== other.hashCode()) {
      return false;
    } else {
      return this.returnStates === other.returnStates && this.parents === other.parents;
    }
  };
  ArrayPredictionContext.prototype.toString = function() {
    if (this.isEmpty()) {
      return "[]";
    } else {
      var s = "[";
      for (var i = 0; i < this.returnStates.length; i++) {
        if (i > 0) {
          s = s + ", ";
        }
        if (this.returnStates[i] === PredictionContext.EMPTY_RETURN_STATE) {
          s = s + "$";
          continue;
        }
        s = s + this.returnStates[i];
        if (this.parents[i] !== null) {
          s = s + " " + this.parents[i];
        } else {
          s = s + "null";
        }
      }
      return s + "]";
    }
  };
  function predictionContextFromRuleContext(atn, outerContext) {
    if (outerContext === void 0 || outerContext === null) {
      outerContext = RuleContext.EMPTY;
    }
    if (outerContext.parentCtx === null || outerContext === RuleContext.EMPTY) {
      return PredictionContext.EMPTY;
    }
    var parent = predictionContextFromRuleContext(atn, outerContext.parentCtx);
    var state = atn.states[outerContext.invokingState];
    var transition = state.transitions[0];
    return SingletonPredictionContext.create(parent, transition.followState.stateNumber);
  }
  function merge(a, b, rootIsWildcard, mergeCache) {
    if (a === b) {
      return a;
    }
    if (a instanceof SingletonPredictionContext && b instanceof SingletonPredictionContext) {
      return mergeSingletons(a, b, rootIsWildcard, mergeCache);
    }
    if (rootIsWildcard) {
      if (a instanceof EmptyPredictionContext) {
        return a;
      }
      if (b instanceof EmptyPredictionContext) {
        return b;
      }
    }
    if (a instanceof SingletonPredictionContext) {
      a = new ArrayPredictionContext([a.getParent()], [a.returnState]);
    }
    if (b instanceof SingletonPredictionContext) {
      b = new ArrayPredictionContext([b.getParent()], [b.returnState]);
    }
    return mergeArrays(a, b, rootIsWildcard, mergeCache);
  }
  function mergeSingletons(a, b, rootIsWildcard, mergeCache) {
    if (mergeCache !== null) {
      var previous = mergeCache.get(a, b);
      if (previous !== null) {
        return previous;
      }
      previous = mergeCache.get(b, a);
      if (previous !== null) {
        return previous;
      }
    }
    var rootMerge = mergeRoot(a, b, rootIsWildcard);
    if (rootMerge !== null) {
      if (mergeCache !== null) {
        mergeCache.set(a, b, rootMerge);
      }
      return rootMerge;
    }
    if (a.returnState === b.returnState) {
      var parent = merge(a.parentCtx, b.parentCtx, rootIsWildcard, mergeCache);
      if (parent === a.parentCtx) {
        return a;
      }
      if (parent === b.parentCtx) {
        return b;
      }
      var spc = SingletonPredictionContext.create(parent, a.returnState);
      if (mergeCache !== null) {
        mergeCache.set(a, b, spc);
      }
      return spc;
    } else {
      var singleParent = null;
      if (a === b || a.parentCtx !== null && a.parentCtx === b.parentCtx) {
        singleParent = a.parentCtx;
      }
      if (singleParent !== null) {
        var payloads = [a.returnState, b.returnState];
        if (a.returnState > b.returnState) {
          payloads[0] = b.returnState;
          payloads[1] = a.returnState;
        }
        var parents = [singleParent, singleParent];
        var apc = new ArrayPredictionContext(parents, payloads);
        if (mergeCache !== null) {
          mergeCache.set(a, b, apc);
        }
        return apc;
      }
      var payloads = [a.returnState, b.returnState];
      var parents = [a.parentCtx, b.parentCtx];
      if (a.returnState > b.returnState) {
        payloads[0] = b.returnState;
        payloads[1] = a.returnState;
        parents = [b.parentCtx, a.parentCtx];
      }
      var a_ = new ArrayPredictionContext(parents, payloads);
      if (mergeCache !== null) {
        mergeCache.set(a, b, a_);
      }
      return a_;
    }
  }
  function mergeRoot(a, b, rootIsWildcard) {
    if (rootIsWildcard) {
      if (a === PredictionContext.EMPTY) {
        return PredictionContext.EMPTY;
      }
      if (b === PredictionContext.EMPTY) {
        return PredictionContext.EMPTY;
      }
    } else {
      if (a === PredictionContext.EMPTY && b === PredictionContext.EMPTY) {
        return PredictionContext.EMPTY;
      } else if (a === PredictionContext.EMPTY) {
        var payloads = [
          b.returnState,
          PredictionContext.EMPTY_RETURN_STATE
        ];
        var parents = [b.parentCtx, null];
        return new ArrayPredictionContext(parents, payloads);
      } else if (b === PredictionContext.EMPTY) {
        var payloads = [a.returnState, PredictionContext.EMPTY_RETURN_STATE];
        var parents = [a.parentCtx, null];
        return new ArrayPredictionContext(parents, payloads);
      }
    }
    return null;
  }
  function mergeArrays(a, b, rootIsWildcard, mergeCache) {
    if (mergeCache !== null) {
      var previous = mergeCache.get(a, b);
      if (previous !== null) {
        return previous;
      }
      previous = mergeCache.get(b, a);
      if (previous !== null) {
        return previous;
      }
    }
    var i = 0;
    var j = 0;
    var k = 0;
    var mergedReturnStates = [];
    var mergedParents = [];
    while (i < a.returnStates.length && j < b.returnStates.length) {
      var a_parent = a.parents[i];
      var b_parent = b.parents[j];
      if (a.returnStates[i] === b.returnStates[j]) {
        var payload = a.returnStates[i];
        var bothDollars = payload === PredictionContext.EMPTY_RETURN_STATE && a_parent === null && b_parent === null;
        var ax_ax = a_parent !== null && b_parent !== null && a_parent === b_parent;
        if (bothDollars || ax_ax) {
          mergedParents[k] = a_parent;
          mergedReturnStates[k] = payload;
        } else {
          var mergedParent = merge(a_parent, b_parent, rootIsWildcard, mergeCache);
          mergedParents[k] = mergedParent;
          mergedReturnStates[k] = payload;
        }
        i += 1;
        j += 1;
      } else if (a.returnStates[i] < b.returnStates[j]) {
        mergedParents[k] = a_parent;
        mergedReturnStates[k] = a.returnStates[i];
        i += 1;
      } else {
        mergedParents[k] = b_parent;
        mergedReturnStates[k] = b.returnStates[j];
        j += 1;
      }
      k += 1;
    }
    if (i < a.returnStates.length) {
      for (var p = i; p < a.returnStates.length; p++) {
        mergedParents[k] = a.parents[p];
        mergedReturnStates[k] = a.returnStates[p];
        k += 1;
      }
    } else {
      for (var p = j; p < b.returnStates.length; p++) {
        mergedParents[k] = b.parents[p];
        mergedReturnStates[k] = b.returnStates[p];
        k += 1;
      }
    }
    if (k < mergedParents.length) {
      if (k === 1) {
        var a_ = SingletonPredictionContext.create(mergedParents[0], mergedReturnStates[0]);
        if (mergeCache !== null) {
          mergeCache.set(a, b, a_);
        }
        return a_;
      }
      mergedParents = mergedParents.slice(0, k);
      mergedReturnStates = mergedReturnStates.slice(0, k);
    }
    var M = new ArrayPredictionContext(mergedParents, mergedReturnStates);
    if (M === a) {
      if (mergeCache !== null) {
        mergeCache.set(a, b, a);
      }
      return a;
    }
    if (M === b) {
      if (mergeCache !== null) {
        mergeCache.set(a, b, b);
      }
      return b;
    }
    combineCommonParents(mergedParents);
    if (mergeCache !== null) {
      mergeCache.set(a, b, M);
    }
    return M;
  }
  function combineCommonParents(parents) {
    var uniqueParents = new Map();
    for (var p = 0; p < parents.length; p++) {
      var parent = parents[p];
      if (!uniqueParents.containsKey(parent)) {
        uniqueParents.put(parent, parent);
      }
    }
    for (var q = 0; q < parents.length; q++) {
      parents[q] = uniqueParents.get(parents[q]);
    }
  }
  function getCachedPredictionContext(context, contextCache, visited) {
    if (context.isEmpty()) {
      return context;
    }
    var existing = visited.get(context) || null;
    if (existing !== null) {
      return existing;
    }
    existing = contextCache.get(context);
    if (existing !== null) {
      visited.put(context, existing);
      return existing;
    }
    var changed = false;
    var parents = [];
    for (var i = 0; i < parents.length; i++) {
      var parent = getCachedPredictionContext(context.getParent(i), contextCache, visited);
      if (changed || parent !== context.getParent(i)) {
        if (!changed) {
          parents = [];
          for (var j = 0; j < context.length; j++) {
            parents[j] = context.getParent(j);
          }
          changed = true;
        }
        parents[i] = parent;
      }
    }
    if (!changed) {
      contextCache.add(context);
      visited.put(context, context);
      return context;
    }
    var updated = null;
    if (parents.length === 0) {
      updated = PredictionContext.EMPTY;
    } else if (parents.length === 1) {
      updated = SingletonPredictionContext.create(parents[0], context.getReturnState(0));
    } else {
      updated = new ArrayPredictionContext(parents, context.returnStates);
    }
    contextCache.add(updated);
    visited.put(updated, updated);
    visited.put(context, updated);
    return updated;
  }
  exports.merge = merge;
  exports.PredictionContext = PredictionContext;
  exports.PredictionContextCache = PredictionContextCache;
  exports.SingletonPredictionContext = SingletonPredictionContext;
  exports.predictionContextFromRuleContext = predictionContextFromRuleContext;
  exports.getCachedPredictionContext = getCachedPredictionContext;
});

// node_modules/antlr4/LL1Analyzer.js
var require_LL1Analyzer = __commonJS((exports) => {
  var Set = require_Utils().Set;
  var BitSet = require_Utils().BitSet;
  var Token = require_Token().Token;
  var ATNConfig = require_ATNConfig().ATNConfig;
  var Interval = require_IntervalSet().Interval;
  var IntervalSet = require_IntervalSet().IntervalSet;
  var RuleStopState = require_ATNState().RuleStopState;
  var RuleTransition = require_Transition().RuleTransition;
  var NotSetTransition = require_Transition().NotSetTransition;
  var WildcardTransition = require_Transition().WildcardTransition;
  var AbstractPredicateTransition = require_Transition().AbstractPredicateTransition;
  var pc = require_PredictionContext();
  var predictionContextFromRuleContext = pc.predictionContextFromRuleContext;
  var PredictionContext = pc.PredictionContext;
  var SingletonPredictionContext = pc.SingletonPredictionContext;
  function LL1Analyzer(atn) {
    this.atn = atn;
  }
  LL1Analyzer.HIT_PRED = Token.INVALID_TYPE;
  LL1Analyzer.prototype.getDecisionLookahead = function(s) {
    if (s === null) {
      return null;
    }
    var count = s.transitions.length;
    var look = [];
    for (var alt = 0; alt < count; alt++) {
      look[alt] = new IntervalSet();
      var lookBusy = new Set();
      var seeThruPreds = false;
      this._LOOK(s.transition(alt).target, null, PredictionContext.EMPTY, look[alt], lookBusy, new BitSet(), seeThruPreds, false);
      if (look[alt].length === 0 || look[alt].contains(LL1Analyzer.HIT_PRED)) {
        look[alt] = null;
      }
    }
    return look;
  };
  LL1Analyzer.prototype.LOOK = function(s, stopState, ctx) {
    var r = new IntervalSet();
    var seeThruPreds = true;
    ctx = ctx || null;
    var lookContext = ctx !== null ? predictionContextFromRuleContext(s.atn, ctx) : null;
    this._LOOK(s, stopState, lookContext, r, new Set(), new BitSet(), seeThruPreds, true);
    return r;
  };
  LL1Analyzer.prototype._LOOK = function(s, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF) {
    var c = new ATNConfig({state: s, alt: 0, context: ctx}, null);
    if (lookBusy.contains(c)) {
      return;
    }
    lookBusy.add(c);
    if (s === stopState) {
      if (ctx === null) {
        look.addOne(Token.EPSILON);
        return;
      } else if (ctx.isEmpty() && addEOF) {
        look.addOne(Token.EOF);
        return;
      }
    }
    if (s instanceof RuleStopState) {
      if (ctx === null) {
        look.addOne(Token.EPSILON);
        return;
      } else if (ctx.isEmpty() && addEOF) {
        look.addOne(Token.EOF);
        return;
      }
      if (ctx !== PredictionContext.EMPTY) {
        for (var i = 0; i < ctx.length; i++) {
          var returnState = this.atn.states[ctx.getReturnState(i)];
          var removed = calledRuleStack.contains(returnState.ruleIndex);
          try {
            calledRuleStack.remove(returnState.ruleIndex);
            this._LOOK(returnState, stopState, ctx.getParent(i), look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
          } finally {
            if (removed) {
              calledRuleStack.add(returnState.ruleIndex);
            }
          }
        }
        return;
      }
    }
    for (var j = 0; j < s.transitions.length; j++) {
      var t = s.transitions[j];
      if (t.constructor === RuleTransition) {
        if (calledRuleStack.contains(t.target.ruleIndex)) {
          continue;
        }
        var newContext = SingletonPredictionContext.create(ctx, t.followState.stateNumber);
        try {
          calledRuleStack.add(t.target.ruleIndex);
          this._LOOK(t.target, stopState, newContext, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
        } finally {
          calledRuleStack.remove(t.target.ruleIndex);
        }
      } else if (t instanceof AbstractPredicateTransition) {
        if (seeThruPreds) {
          this._LOOK(t.target, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
        } else {
          look.addOne(LL1Analyzer.HIT_PRED);
        }
      } else if (t.isEpsilon) {
        this._LOOK(t.target, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
      } else if (t.constructor === WildcardTransition) {
        look.addRange(Token.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType);
      } else {
        var set = t.label;
        if (set !== null) {
          if (t instanceof NotSetTransition) {
            set = set.complement(Token.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType);
          }
          look.addSet(set);
        }
      }
    }
  };
  exports.LL1Analyzer = LL1Analyzer;
});

// node_modules/antlr4/atn/ATN.js
var require_ATN = __commonJS((exports) => {
  var LL1Analyzer = require_LL1Analyzer().LL1Analyzer;
  var IntervalSet = require_IntervalSet().IntervalSet;
  function ATN(grammarType, maxTokenType) {
    this.grammarType = grammarType;
    this.maxTokenType = maxTokenType;
    this.states = [];
    this.decisionToState = [];
    this.ruleToStartState = [];
    this.ruleToStopState = null;
    this.modeNameToStartState = {};
    this.ruleToTokenType = null;
    this.lexerActions = null;
    this.modeToStartState = [];
    return this;
  }
  ATN.prototype.nextTokensInContext = function(s, ctx) {
    var anal = new LL1Analyzer(this);
    return anal.LOOK(s, null, ctx);
  };
  ATN.prototype.nextTokensNoContext = function(s) {
    if (s.nextTokenWithinRule !== null) {
      return s.nextTokenWithinRule;
    }
    s.nextTokenWithinRule = this.nextTokensInContext(s, null);
    s.nextTokenWithinRule.readOnly = true;
    return s.nextTokenWithinRule;
  };
  ATN.prototype.nextTokens = function(s, ctx) {
    if (ctx === void 0) {
      return this.nextTokensNoContext(s);
    } else {
      return this.nextTokensInContext(s, ctx);
    }
  };
  ATN.prototype.addState = function(state) {
    if (state !== null) {
      state.atn = this;
      state.stateNumber = this.states.length;
    }
    this.states.push(state);
  };
  ATN.prototype.removeState = function(state) {
    this.states[state.stateNumber] = null;
  };
  ATN.prototype.defineDecisionState = function(s) {
    this.decisionToState.push(s);
    s.decision = this.decisionToState.length - 1;
    return s.decision;
  };
  ATN.prototype.getDecisionState = function(decision) {
    if (this.decisionToState.length === 0) {
      return null;
    } else {
      return this.decisionToState[decision];
    }
  };
  var Token = require_Token().Token;
  ATN.prototype.getExpectedTokens = function(stateNumber, ctx) {
    if (stateNumber < 0 || stateNumber >= this.states.length) {
      throw "Invalid state number.";
    }
    var s = this.states[stateNumber];
    var following = this.nextTokens(s);
    if (!following.contains(Token.EPSILON)) {
      return following;
    }
    var expected = new IntervalSet();
    expected.addSet(following);
    expected.removeOne(Token.EPSILON);
    while (ctx !== null && ctx.invokingState >= 0 && following.contains(Token.EPSILON)) {
      var invokingState = this.states[ctx.invokingState];
      var rt = invokingState.transitions[0];
      following = this.nextTokens(rt.followState);
      expected.addSet(following);
      expected.removeOne(Token.EPSILON);
      ctx = ctx.parentCtx;
    }
    if (following.contains(Token.EPSILON)) {
      expected.addOne(Token.EOF);
    }
    return expected;
  };
  ATN.INVALID_ALT_NUMBER = 0;
  exports.ATN = ATN;
});

// node_modules/antlr4/atn/ATNType.js
var require_ATNType = __commonJS((exports) => {
  function ATNType() {
  }
  ATNType.LEXER = 0;
  ATNType.PARSER = 1;
  exports.ATNType = ATNType;
});

// node_modules/antlr4/atn/ATNDeserializationOptions.js
var require_ATNDeserializationOptions = __commonJS((exports) => {
  function ATNDeserializationOptions(copyFrom) {
    if (copyFrom === void 0) {
      copyFrom = null;
    }
    this.readOnly = false;
    this.verifyATN = copyFrom === null ? true : copyFrom.verifyATN;
    this.generateRuleBypassTransitions = copyFrom === null ? false : copyFrom.generateRuleBypassTransitions;
    return this;
  }
  ATNDeserializationOptions.defaultOptions = new ATNDeserializationOptions();
  ATNDeserializationOptions.defaultOptions.readOnly = true;
  exports.ATNDeserializationOptions = ATNDeserializationOptions;
});

// node_modules/antlr4/atn/LexerAction.js
var require_LexerAction = __commonJS((exports) => {
  function LexerActionType() {
  }
  LexerActionType.CHANNEL = 0;
  LexerActionType.CUSTOM = 1;
  LexerActionType.MODE = 2;
  LexerActionType.MORE = 3;
  LexerActionType.POP_MODE = 4;
  LexerActionType.PUSH_MODE = 5;
  LexerActionType.SKIP = 6;
  LexerActionType.TYPE = 7;
  function LexerAction(action) {
    this.actionType = action;
    this.isPositionDependent = false;
    return this;
  }
  LexerAction.prototype.hashCode = function() {
    var hash = new Hash();
    this.updateHashCode(hash);
    return hash.finish();
  };
  LexerAction.prototype.updateHashCode = function(hash) {
    hash.update(this.actionType);
  };
  LexerAction.prototype.equals = function(other) {
    return this === other;
  };
  function LexerSkipAction() {
    LexerAction.call(this, LexerActionType.SKIP);
    return this;
  }
  LexerSkipAction.prototype = Object.create(LexerAction.prototype);
  LexerSkipAction.prototype.constructor = LexerSkipAction;
  LexerSkipAction.INSTANCE = new LexerSkipAction();
  LexerSkipAction.prototype.execute = function(lexer) {
    lexer.skip();
  };
  LexerSkipAction.prototype.toString = function() {
    return "skip";
  };
  function LexerTypeAction(type) {
    LexerAction.call(this, LexerActionType.TYPE);
    this.type = type;
    return this;
  }
  LexerTypeAction.prototype = Object.create(LexerAction.prototype);
  LexerTypeAction.prototype.constructor = LexerTypeAction;
  LexerTypeAction.prototype.execute = function(lexer) {
    lexer.type = this.type;
  };
  LexerTypeAction.prototype.updateHashCode = function(hash) {
    hash.update(this.actionType, this.type);
  };
  LexerTypeAction.prototype.equals = function(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof LexerTypeAction)) {
      return false;
    } else {
      return this.type === other.type;
    }
  };
  LexerTypeAction.prototype.toString = function() {
    return "type(" + this.type + ")";
  };
  function LexerPushModeAction(mode) {
    LexerAction.call(this, LexerActionType.PUSH_MODE);
    this.mode = mode;
    return this;
  }
  LexerPushModeAction.prototype = Object.create(LexerAction.prototype);
  LexerPushModeAction.prototype.constructor = LexerPushModeAction;
  LexerPushModeAction.prototype.execute = function(lexer) {
    lexer.pushMode(this.mode);
  };
  LexerPushModeAction.prototype.updateHashCode = function(hash) {
    hash.update(this.actionType, this.mode);
  };
  LexerPushModeAction.prototype.equals = function(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof LexerPushModeAction)) {
      return false;
    } else {
      return this.mode === other.mode;
    }
  };
  LexerPushModeAction.prototype.toString = function() {
    return "pushMode(" + this.mode + ")";
  };
  function LexerPopModeAction() {
    LexerAction.call(this, LexerActionType.POP_MODE);
    return this;
  }
  LexerPopModeAction.prototype = Object.create(LexerAction.prototype);
  LexerPopModeAction.prototype.constructor = LexerPopModeAction;
  LexerPopModeAction.INSTANCE = new LexerPopModeAction();
  LexerPopModeAction.prototype.execute = function(lexer) {
    lexer.popMode();
  };
  LexerPopModeAction.prototype.toString = function() {
    return "popMode";
  };
  function LexerMoreAction() {
    LexerAction.call(this, LexerActionType.MORE);
    return this;
  }
  LexerMoreAction.prototype = Object.create(LexerAction.prototype);
  LexerMoreAction.prototype.constructor = LexerMoreAction;
  LexerMoreAction.INSTANCE = new LexerMoreAction();
  LexerMoreAction.prototype.execute = function(lexer) {
    lexer.more();
  };
  LexerMoreAction.prototype.toString = function() {
    return "more";
  };
  function LexerModeAction(mode) {
    LexerAction.call(this, LexerActionType.MODE);
    this.mode = mode;
    return this;
  }
  LexerModeAction.prototype = Object.create(LexerAction.prototype);
  LexerModeAction.prototype.constructor = LexerModeAction;
  LexerModeAction.prototype.execute = function(lexer) {
    lexer.mode(this.mode);
  };
  LexerModeAction.prototype.updateHashCode = function(hash) {
    hash.update(this.actionType, this.mode);
  };
  LexerModeAction.prototype.equals = function(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof LexerModeAction)) {
      return false;
    } else {
      return this.mode === other.mode;
    }
  };
  LexerModeAction.prototype.toString = function() {
    return "mode(" + this.mode + ")";
  };
  function LexerCustomAction(ruleIndex, actionIndex) {
    LexerAction.call(this, LexerActionType.CUSTOM);
    this.ruleIndex = ruleIndex;
    this.actionIndex = actionIndex;
    this.isPositionDependent = true;
    return this;
  }
  LexerCustomAction.prototype = Object.create(LexerAction.prototype);
  LexerCustomAction.prototype.constructor = LexerCustomAction;
  LexerCustomAction.prototype.execute = function(lexer) {
    lexer.action(null, this.ruleIndex, this.actionIndex);
  };
  LexerCustomAction.prototype.updateHashCode = function(hash) {
    hash.update(this.actionType, this.ruleIndex, this.actionIndex);
  };
  LexerCustomAction.prototype.equals = function(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof LexerCustomAction)) {
      return false;
    } else {
      return this.ruleIndex === other.ruleIndex && this.actionIndex === other.actionIndex;
    }
  };
  function LexerChannelAction(channel) {
    LexerAction.call(this, LexerActionType.CHANNEL);
    this.channel = channel;
    return this;
  }
  LexerChannelAction.prototype = Object.create(LexerAction.prototype);
  LexerChannelAction.prototype.constructor = LexerChannelAction;
  LexerChannelAction.prototype.execute = function(lexer) {
    lexer._channel = this.channel;
  };
  LexerChannelAction.prototype.updateHashCode = function(hash) {
    hash.update(this.actionType, this.channel);
  };
  LexerChannelAction.prototype.equals = function(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof LexerChannelAction)) {
      return false;
    } else {
      return this.channel === other.channel;
    }
  };
  LexerChannelAction.prototype.toString = function() {
    return "channel(" + this.channel + ")";
  };
  function LexerIndexedCustomAction(offset, action) {
    LexerAction.call(this, action.actionType);
    this.offset = offset;
    this.action = action;
    this.isPositionDependent = true;
    return this;
  }
  LexerIndexedCustomAction.prototype = Object.create(LexerAction.prototype);
  LexerIndexedCustomAction.prototype.constructor = LexerIndexedCustomAction;
  LexerIndexedCustomAction.prototype.execute = function(lexer) {
    this.action.execute(lexer);
  };
  LexerIndexedCustomAction.prototype.updateHashCode = function(hash) {
    hash.update(this.actionType, this.offset, this.action);
  };
  LexerIndexedCustomAction.prototype.equals = function(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof LexerIndexedCustomAction)) {
      return false;
    } else {
      return this.offset === other.offset && this.action === other.action;
    }
  };
  exports.LexerActionType = LexerActionType;
  exports.LexerSkipAction = LexerSkipAction;
  exports.LexerChannelAction = LexerChannelAction;
  exports.LexerCustomAction = LexerCustomAction;
  exports.LexerIndexedCustomAction = LexerIndexedCustomAction;
  exports.LexerMoreAction = LexerMoreAction;
  exports.LexerTypeAction = LexerTypeAction;
  exports.LexerPushModeAction = LexerPushModeAction;
  exports.LexerPopModeAction = LexerPopModeAction;
  exports.LexerModeAction = LexerModeAction;
});

// node_modules/antlr4/atn/ATNDeserializer.js
var require_ATNDeserializer = __commonJS((exports) => {
  var Token = require_Token().Token;
  var ATN = require_ATN().ATN;
  var ATNType = require_ATNType().ATNType;
  var ATNStates = require_ATNState();
  var ATNState = ATNStates.ATNState;
  var BasicState = ATNStates.BasicState;
  var DecisionState = ATNStates.DecisionState;
  var BlockStartState = ATNStates.BlockStartState;
  var BlockEndState = ATNStates.BlockEndState;
  var LoopEndState = ATNStates.LoopEndState;
  var RuleStartState = ATNStates.RuleStartState;
  var RuleStopState = ATNStates.RuleStopState;
  var TokensStartState = ATNStates.TokensStartState;
  var PlusLoopbackState = ATNStates.PlusLoopbackState;
  var StarLoopbackState = ATNStates.StarLoopbackState;
  var StarLoopEntryState = ATNStates.StarLoopEntryState;
  var PlusBlockStartState = ATNStates.PlusBlockStartState;
  var StarBlockStartState = ATNStates.StarBlockStartState;
  var BasicBlockStartState = ATNStates.BasicBlockStartState;
  var Transitions = require_Transition();
  var Transition = Transitions.Transition;
  var AtomTransition2 = Transitions.AtomTransition;
  var SetTransition = Transitions.SetTransition;
  var NotSetTransition = Transitions.NotSetTransition;
  var RuleTransition = Transitions.RuleTransition;
  var RangeTransition = Transitions.RangeTransition;
  var ActionTransition = Transitions.ActionTransition;
  var EpsilonTransition = Transitions.EpsilonTransition;
  var WildcardTransition = Transitions.WildcardTransition;
  var PredicateTransition = Transitions.PredicateTransition;
  var PrecedencePredicateTransition = Transitions.PrecedencePredicateTransition;
  var IntervalSet = require_IntervalSet().IntervalSet;
  var Interval = require_IntervalSet().Interval;
  var ATNDeserializationOptions = require_ATNDeserializationOptions().ATNDeserializationOptions;
  var LexerActions = require_LexerAction();
  var LexerActionType = LexerActions.LexerActionType;
  var LexerSkipAction = LexerActions.LexerSkipAction;
  var LexerChannelAction = LexerActions.LexerChannelAction;
  var LexerCustomAction = LexerActions.LexerCustomAction;
  var LexerMoreAction = LexerActions.LexerMoreAction;
  var LexerTypeAction = LexerActions.LexerTypeAction;
  var LexerPushModeAction = LexerActions.LexerPushModeAction;
  var LexerPopModeAction = LexerActions.LexerPopModeAction;
  var LexerModeAction = LexerActions.LexerModeAction;
  var BASE_SERIALIZED_UUID = "AADB8D7E-AEEF-4415-AD2B-8204D6CF042E";
  var ADDED_UNICODE_SMP = "59627784-3BE5-417A-B9EB-8131A7286089";
  var SUPPORTED_UUIDS = [BASE_SERIALIZED_UUID, ADDED_UNICODE_SMP];
  var SERIALIZED_VERSION = 3;
  var SERIALIZED_UUID = ADDED_UNICODE_SMP;
  function initArray(length, value) {
    var tmp = [];
    tmp[length - 1] = value;
    return tmp.map(function(i) {
      return value;
    });
  }
  function ATNDeserializer(options) {
    if (options === void 0 || options === null) {
      options = ATNDeserializationOptions.defaultOptions;
    }
    this.deserializationOptions = options;
    this.stateFactories = null;
    this.actionFactories = null;
    return this;
  }
  ATNDeserializer.prototype.isFeatureSupported = function(feature, actualUuid) {
    var idx1 = SUPPORTED_UUIDS.indexOf(feature);
    if (idx1 < 0) {
      return false;
    }
    var idx2 = SUPPORTED_UUIDS.indexOf(actualUuid);
    return idx2 >= idx1;
  };
  ATNDeserializer.prototype.deserialize = function(data) {
    this.reset(data);
    this.checkVersion();
    this.checkUUID();
    var atn = this.readATN();
    this.readStates(atn);
    this.readRules(atn);
    this.readModes(atn);
    var sets = [];
    this.readSets(atn, sets, this.readInt.bind(this));
    if (this.isFeatureSupported(ADDED_UNICODE_SMP, this.uuid)) {
      this.readSets(atn, sets, this.readInt32.bind(this));
    }
    this.readEdges(atn, sets);
    this.readDecisions(atn);
    this.readLexerActions(atn);
    this.markPrecedenceDecisions(atn);
    this.verifyATN(atn);
    if (this.deserializationOptions.generateRuleBypassTransitions && atn.grammarType === ATNType.PARSER) {
      this.generateRuleBypassTransitions(atn);
      this.verifyATN(atn);
    }
    return atn;
  };
  ATNDeserializer.prototype.reset = function(data) {
    var adjust = function(c) {
      var v = c.charCodeAt(0);
      return v > 1 ? v - 2 : v + 65534;
    };
    var temp = data.split("").map(adjust);
    temp[0] = data.charCodeAt(0);
    this.data = temp;
    this.pos = 0;
  };
  ATNDeserializer.prototype.checkVersion = function() {
    var version = this.readInt();
    if (version !== SERIALIZED_VERSION) {
      throw "Could not deserialize ATN with version " + version + " (expected " + SERIALIZED_VERSION + ").";
    }
  };
  ATNDeserializer.prototype.checkUUID = function() {
    var uuid = this.readUUID();
    if (SUPPORTED_UUIDS.indexOf(uuid) < 0) {
      throw "Could not deserialize ATN with UUID: " + uuid + " (expected " + SERIALIZED_UUID + " or a legacy UUID).", uuid, SERIALIZED_UUID;
    }
    this.uuid = uuid;
  };
  ATNDeserializer.prototype.readATN = function() {
    var grammarType = this.readInt();
    var maxTokenType = this.readInt();
    return new ATN(grammarType, maxTokenType);
  };
  ATNDeserializer.prototype.readStates = function(atn) {
    var j, pair, stateNumber;
    var loopBackStateNumbers = [];
    var endStateNumbers = [];
    var nstates = this.readInt();
    for (var i = 0; i < nstates; i++) {
      var stype = this.readInt();
      if (stype === ATNState.INVALID_TYPE) {
        atn.addState(null);
        continue;
      }
      var ruleIndex = this.readInt();
      if (ruleIndex === 65535) {
        ruleIndex = -1;
      }
      var s = this.stateFactory(stype, ruleIndex);
      if (stype === ATNState.LOOP_END) {
        var loopBackStateNumber = this.readInt();
        loopBackStateNumbers.push([s, loopBackStateNumber]);
      } else if (s instanceof BlockStartState) {
        var endStateNumber = this.readInt();
        endStateNumbers.push([s, endStateNumber]);
      }
      atn.addState(s);
    }
    for (j = 0; j < loopBackStateNumbers.length; j++) {
      pair = loopBackStateNumbers[j];
      pair[0].loopBackState = atn.states[pair[1]];
    }
    for (j = 0; j < endStateNumbers.length; j++) {
      pair = endStateNumbers[j];
      pair[0].endState = atn.states[pair[1]];
    }
    var numNonGreedyStates = this.readInt();
    for (j = 0; j < numNonGreedyStates; j++) {
      stateNumber = this.readInt();
      atn.states[stateNumber].nonGreedy = true;
    }
    var numPrecedenceStates = this.readInt();
    for (j = 0; j < numPrecedenceStates; j++) {
      stateNumber = this.readInt();
      atn.states[stateNumber].isPrecedenceRule = true;
    }
  };
  ATNDeserializer.prototype.readRules = function(atn) {
    var i;
    var nrules = this.readInt();
    if (atn.grammarType === ATNType.LEXER) {
      atn.ruleToTokenType = initArray(nrules, 0);
    }
    atn.ruleToStartState = initArray(nrules, 0);
    for (i = 0; i < nrules; i++) {
      var s = this.readInt();
      var startState = atn.states[s];
      atn.ruleToStartState[i] = startState;
      if (atn.grammarType === ATNType.LEXER) {
        var tokenType = this.readInt();
        if (tokenType === 65535) {
          tokenType = Token.EOF;
        }
        atn.ruleToTokenType[i] = tokenType;
      }
    }
    atn.ruleToStopState = initArray(nrules, 0);
    for (i = 0; i < atn.states.length; i++) {
      var state = atn.states[i];
      if (!(state instanceof RuleStopState)) {
        continue;
      }
      atn.ruleToStopState[state.ruleIndex] = state;
      atn.ruleToStartState[state.ruleIndex].stopState = state;
    }
  };
  ATNDeserializer.prototype.readModes = function(atn) {
    var nmodes = this.readInt();
    for (var i = 0; i < nmodes; i++) {
      var s = this.readInt();
      atn.modeToStartState.push(atn.states[s]);
    }
  };
  ATNDeserializer.prototype.readSets = function(atn, sets, readUnicode) {
    var m = this.readInt();
    for (var i = 0; i < m; i++) {
      var iset = new IntervalSet();
      sets.push(iset);
      var n = this.readInt();
      var containsEof = this.readInt();
      if (containsEof !== 0) {
        iset.addOne(-1);
      }
      for (var j = 0; j < n; j++) {
        var i1 = readUnicode();
        var i2 = readUnicode();
        iset.addRange(i1, i2);
      }
    }
  };
  ATNDeserializer.prototype.readEdges = function(atn, sets) {
    var i, j, state, trans, target;
    var nedges = this.readInt();
    for (i = 0; i < nedges; i++) {
      var src = this.readInt();
      var trg = this.readInt();
      var ttype = this.readInt();
      var arg1 = this.readInt();
      var arg2 = this.readInt();
      var arg3 = this.readInt();
      trans = this.edgeFactory(atn, ttype, src, trg, arg1, arg2, arg3, sets);
      var srcState = atn.states[src];
      srcState.addTransition(trans);
    }
    for (i = 0; i < atn.states.length; i++) {
      state = atn.states[i];
      for (j = 0; j < state.transitions.length; j++) {
        var t = state.transitions[j];
        if (!(t instanceof RuleTransition)) {
          continue;
        }
        var outermostPrecedenceReturn = -1;
        if (atn.ruleToStartState[t.target.ruleIndex].isPrecedenceRule) {
          if (t.precedence === 0) {
            outermostPrecedenceReturn = t.target.ruleIndex;
          }
        }
        trans = new EpsilonTransition(t.followState, outermostPrecedenceReturn);
        atn.ruleToStopState[t.target.ruleIndex].addTransition(trans);
      }
    }
    for (i = 0; i < atn.states.length; i++) {
      state = atn.states[i];
      if (state instanceof BlockStartState) {
        if (state.endState === null) {
          throw "IllegalState";
        }
        if (state.endState.startState !== null) {
          throw "IllegalState";
        }
        state.endState.startState = state;
      }
      if (state instanceof PlusLoopbackState) {
        for (j = 0; j < state.transitions.length; j++) {
          target = state.transitions[j].target;
          if (target instanceof PlusBlockStartState) {
            target.loopBackState = state;
          }
        }
      } else if (state instanceof StarLoopbackState) {
        for (j = 0; j < state.transitions.length; j++) {
          target = state.transitions[j].target;
          if (target instanceof StarLoopEntryState) {
            target.loopBackState = state;
          }
        }
      }
    }
  };
  ATNDeserializer.prototype.readDecisions = function(atn) {
    var ndecisions = this.readInt();
    for (var i = 0; i < ndecisions; i++) {
      var s = this.readInt();
      var decState = atn.states[s];
      atn.decisionToState.push(decState);
      decState.decision = i;
    }
  };
  ATNDeserializer.prototype.readLexerActions = function(atn) {
    if (atn.grammarType === ATNType.LEXER) {
      var count = this.readInt();
      atn.lexerActions = initArray(count, null);
      for (var i = 0; i < count; i++) {
        var actionType = this.readInt();
        var data1 = this.readInt();
        if (data1 === 65535) {
          data1 = -1;
        }
        var data2 = this.readInt();
        if (data2 === 65535) {
          data2 = -1;
        }
        var lexerAction = this.lexerActionFactory(actionType, data1, data2);
        atn.lexerActions[i] = lexerAction;
      }
    }
  };
  ATNDeserializer.prototype.generateRuleBypassTransitions = function(atn) {
    var i;
    var count = atn.ruleToStartState.length;
    for (i = 0; i < count; i++) {
      atn.ruleToTokenType[i] = atn.maxTokenType + i + 1;
    }
    for (i = 0; i < count; i++) {
      this.generateRuleBypassTransition(atn, i);
    }
  };
  ATNDeserializer.prototype.generateRuleBypassTransition = function(atn, idx) {
    var i, state;
    var bypassStart = new BasicBlockStartState();
    bypassStart.ruleIndex = idx;
    atn.addState(bypassStart);
    var bypassStop = new BlockEndState();
    bypassStop.ruleIndex = idx;
    atn.addState(bypassStop);
    bypassStart.endState = bypassStop;
    atn.defineDecisionState(bypassStart);
    bypassStop.startState = bypassStart;
    var excludeTransition = null;
    var endState = null;
    if (atn.ruleToStartState[idx].isPrecedenceRule) {
      endState = null;
      for (i = 0; i < atn.states.length; i++) {
        state = atn.states[i];
        if (this.stateIsEndStateFor(state, idx)) {
          endState = state;
          excludeTransition = state.loopBackState.transitions[0];
          break;
        }
      }
      if (excludeTransition === null) {
        throw "Couldn't identify final state of the precedence rule prefix section.";
      }
    } else {
      endState = atn.ruleToStopState[idx];
    }
    for (i = 0; i < atn.states.length; i++) {
      state = atn.states[i];
      for (var j = 0; j < state.transitions.length; j++) {
        var transition = state.transitions[j];
        if (transition === excludeTransition) {
          continue;
        }
        if (transition.target === endState) {
          transition.target = bypassStop;
        }
      }
    }
    var ruleToStartState = atn.ruleToStartState[idx];
    var count = ruleToStartState.transitions.length;
    while (count > 0) {
      bypassStart.addTransition(ruleToStartState.transitions[count - 1]);
      ruleToStartState.transitions = ruleToStartState.transitions.slice(-1);
    }
    atn.ruleToStartState[idx].addTransition(new EpsilonTransition(bypassStart));
    bypassStop.addTransition(new EpsilonTransition(endState));
    var matchState = new BasicState();
    atn.addState(matchState);
    matchState.addTransition(new AtomTransition2(bypassStop, atn.ruleToTokenType[idx]));
    bypassStart.addTransition(new EpsilonTransition(matchState));
  };
  ATNDeserializer.prototype.stateIsEndStateFor = function(state, idx) {
    if (state.ruleIndex !== idx) {
      return null;
    }
    if (!(state instanceof StarLoopEntryState)) {
      return null;
    }
    var maybeLoopEndState = state.transitions[state.transitions.length - 1].target;
    if (!(maybeLoopEndState instanceof LoopEndState)) {
      return null;
    }
    if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transitions[0].target instanceof RuleStopState) {
      return state;
    } else {
      return null;
    }
  };
  ATNDeserializer.prototype.markPrecedenceDecisions = function(atn) {
    for (var i = 0; i < atn.states.length; i++) {
      var state = atn.states[i];
      if (!(state instanceof StarLoopEntryState)) {
        continue;
      }
      if (atn.ruleToStartState[state.ruleIndex].isPrecedenceRule) {
        var maybeLoopEndState = state.transitions[state.transitions.length - 1].target;
        if (maybeLoopEndState instanceof LoopEndState) {
          if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transitions[0].target instanceof RuleStopState) {
            state.isPrecedenceDecision = true;
          }
        }
      }
    }
  };
  ATNDeserializer.prototype.verifyATN = function(atn) {
    if (!this.deserializationOptions.verifyATN) {
      return;
    }
    for (var i = 0; i < atn.states.length; i++) {
      var state = atn.states[i];
      if (state === null) {
        continue;
      }
      this.checkCondition(state.epsilonOnlyTransitions || state.transitions.length <= 1);
      if (state instanceof PlusBlockStartState) {
        this.checkCondition(state.loopBackState !== null);
      } else if (state instanceof StarLoopEntryState) {
        this.checkCondition(state.loopBackState !== null);
        this.checkCondition(state.transitions.length === 2);
        if (state.transitions[0].target instanceof StarBlockStartState) {
          this.checkCondition(state.transitions[1].target instanceof LoopEndState);
          this.checkCondition(!state.nonGreedy);
        } else if (state.transitions[0].target instanceof LoopEndState) {
          this.checkCondition(state.transitions[1].target instanceof StarBlockStartState);
          this.checkCondition(state.nonGreedy);
        } else {
          throw "IllegalState";
        }
      } else if (state instanceof StarLoopbackState) {
        this.checkCondition(state.transitions.length === 1);
        this.checkCondition(state.transitions[0].target instanceof StarLoopEntryState);
      } else if (state instanceof LoopEndState) {
        this.checkCondition(state.loopBackState !== null);
      } else if (state instanceof RuleStartState) {
        this.checkCondition(state.stopState !== null);
      } else if (state instanceof BlockStartState) {
        this.checkCondition(state.endState !== null);
      } else if (state instanceof BlockEndState) {
        this.checkCondition(state.startState !== null);
      } else if (state instanceof DecisionState) {
        this.checkCondition(state.transitions.length <= 1 || state.decision >= 0);
      } else {
        this.checkCondition(state.transitions.length <= 1 || state instanceof RuleStopState);
      }
    }
  };
  ATNDeserializer.prototype.checkCondition = function(condition, message) {
    if (!condition) {
      if (message === void 0 || message === null) {
        message = "IllegalState";
      }
      throw message;
    }
  };
  ATNDeserializer.prototype.readInt = function() {
    return this.data[this.pos++];
  };
  ATNDeserializer.prototype.readInt32 = function() {
    var low = this.readInt();
    var high = this.readInt();
    return low | high << 16;
  };
  ATNDeserializer.prototype.readLong = function() {
    var low = this.readInt32();
    var high = this.readInt32();
    return low & 4294967295 | high << 32;
  };
  function createByteToHex() {
    var bth = [];
    for (var i = 0; i < 256; i++) {
      bth[i] = (i + 256).toString(16).substr(1).toUpperCase();
    }
    return bth;
  }
  var byteToHex = createByteToHex();
  ATNDeserializer.prototype.readUUID = function() {
    var bb = [];
    for (var i = 7; i >= 0; i--) {
      var int = this.readInt();
      bb[2 * i + 1] = int & 255;
      bb[2 * i] = int >> 8 & 255;
    }
    return byteToHex[bb[0]] + byteToHex[bb[1]] + byteToHex[bb[2]] + byteToHex[bb[3]] + "-" + byteToHex[bb[4]] + byteToHex[bb[5]] + "-" + byteToHex[bb[6]] + byteToHex[bb[7]] + "-" + byteToHex[bb[8]] + byteToHex[bb[9]] + "-" + byteToHex[bb[10]] + byteToHex[bb[11]] + byteToHex[bb[12]] + byteToHex[bb[13]] + byteToHex[bb[14]] + byteToHex[bb[15]];
  };
  ATNDeserializer.prototype.edgeFactory = function(atn, type, src, trg, arg1, arg2, arg3, sets) {
    var target = atn.states[trg];
    switch (type) {
      case Transition.EPSILON:
        return new EpsilonTransition(target);
      case Transition.RANGE:
        return arg3 !== 0 ? new RangeTransition(target, Token.EOF, arg2) : new RangeTransition(target, arg1, arg2);
      case Transition.RULE:
        return new RuleTransition(atn.states[arg1], arg2, arg3, target);
      case Transition.PREDICATE:
        return new PredicateTransition(target, arg1, arg2, arg3 !== 0);
      case Transition.PRECEDENCE:
        return new PrecedencePredicateTransition(target, arg1);
      case Transition.ATOM:
        return arg3 !== 0 ? new AtomTransition2(target, Token.EOF) : new AtomTransition2(target, arg1);
      case Transition.ACTION:
        return new ActionTransition(target, arg1, arg2, arg3 !== 0);
      case Transition.SET:
        return new SetTransition(target, sets[arg1]);
      case Transition.NOT_SET:
        return new NotSetTransition(target, sets[arg1]);
      case Transition.WILDCARD:
        return new WildcardTransition(target);
      default:
        throw "The specified transition type: " + type + " is not valid.";
    }
  };
  ATNDeserializer.prototype.stateFactory = function(type, ruleIndex) {
    if (this.stateFactories === null) {
      var sf = [];
      sf[ATNState.INVALID_TYPE] = null;
      sf[ATNState.BASIC] = function() {
        return new BasicState();
      };
      sf[ATNState.RULE_START] = function() {
        return new RuleStartState();
      };
      sf[ATNState.BLOCK_START] = function() {
        return new BasicBlockStartState();
      };
      sf[ATNState.PLUS_BLOCK_START] = function() {
        return new PlusBlockStartState();
      };
      sf[ATNState.STAR_BLOCK_START] = function() {
        return new StarBlockStartState();
      };
      sf[ATNState.TOKEN_START] = function() {
        return new TokensStartState();
      };
      sf[ATNState.RULE_STOP] = function() {
        return new RuleStopState();
      };
      sf[ATNState.BLOCK_END] = function() {
        return new BlockEndState();
      };
      sf[ATNState.STAR_LOOP_BACK] = function() {
        return new StarLoopbackState();
      };
      sf[ATNState.STAR_LOOP_ENTRY] = function() {
        return new StarLoopEntryState();
      };
      sf[ATNState.PLUS_LOOP_BACK] = function() {
        return new PlusLoopbackState();
      };
      sf[ATNState.LOOP_END] = function() {
        return new LoopEndState();
      };
      this.stateFactories = sf;
    }
    if (type > this.stateFactories.length || this.stateFactories[type] === null) {
      throw "The specified state type " + type + " is not valid.";
    } else {
      var s = this.stateFactories[type]();
      if (s !== null) {
        s.ruleIndex = ruleIndex;
        return s;
      }
    }
  };
  ATNDeserializer.prototype.lexerActionFactory = function(type, data1, data2) {
    if (this.actionFactories === null) {
      var af = [];
      af[LexerActionType.CHANNEL] = function(data12, data22) {
        return new LexerChannelAction(data12);
      };
      af[LexerActionType.CUSTOM] = function(data12, data22) {
        return new LexerCustomAction(data12, data22);
      };
      af[LexerActionType.MODE] = function(data12, data22) {
        return new LexerModeAction(data12);
      };
      af[LexerActionType.MORE] = function(data12, data22) {
        return LexerMoreAction.INSTANCE;
      };
      af[LexerActionType.POP_MODE] = function(data12, data22) {
        return LexerPopModeAction.INSTANCE;
      };
      af[LexerActionType.PUSH_MODE] = function(data12, data22) {
        return new LexerPushModeAction(data12);
      };
      af[LexerActionType.SKIP] = function(data12, data22) {
        return LexerSkipAction.INSTANCE;
      };
      af[LexerActionType.TYPE] = function(data12, data22) {
        return new LexerTypeAction(data12);
      };
      this.actionFactories = af;
    }
    if (type > this.actionFactories.length || this.actionFactories[type] === null) {
      throw "The specified lexer action type " + type + " is not valid.";
    } else {
      return this.actionFactories[type](data1, data2);
    }
  };
  exports.ATNDeserializer = ATNDeserializer;
});

// node_modules/antlr4/error/ErrorListener.js
var require_ErrorListener = __commonJS((exports) => {
  function ErrorListener() {
    return this;
  }
  ErrorListener.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
  };
  ErrorListener.prototype.reportAmbiguity = function(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
  };
  ErrorListener.prototype.reportAttemptingFullContext = function(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
  };
  ErrorListener.prototype.reportContextSensitivity = function(recognizer, dfa, startIndex, stopIndex, prediction, configs) {
  };
  function ConsoleErrorListener() {
    ErrorListener.call(this);
    return this;
  }
  ConsoleErrorListener.prototype = Object.create(ErrorListener.prototype);
  ConsoleErrorListener.prototype.constructor = ConsoleErrorListener;
  ConsoleErrorListener.INSTANCE = new ConsoleErrorListener();
  ConsoleErrorListener.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
    console.error("line " + line + ":" + column + " " + msg);
  };
  function ProxyErrorListener(delegates) {
    ErrorListener.call(this);
    if (delegates === null) {
      throw "delegates";
    }
    this.delegates = delegates;
    return this;
  }
  ProxyErrorListener.prototype = Object.create(ErrorListener.prototype);
  ProxyErrorListener.prototype.constructor = ProxyErrorListener;
  ProxyErrorListener.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
    this.delegates.map(function(d) {
      d.syntaxError(recognizer, offendingSymbol, line, column, msg, e);
    });
  };
  ProxyErrorListener.prototype.reportAmbiguity = function(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
    this.delegates.map(function(d) {
      d.reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs);
    });
  };
  ProxyErrorListener.prototype.reportAttemptingFullContext = function(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
    this.delegates.map(function(d) {
      d.reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs);
    });
  };
  ProxyErrorListener.prototype.reportContextSensitivity = function(recognizer, dfa, startIndex, stopIndex, prediction, configs) {
    this.delegates.map(function(d) {
      d.reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs);
    });
  };
  exports.ErrorListener = ErrorListener;
  exports.ConsoleErrorListener = ConsoleErrorListener;
  exports.ProxyErrorListener = ProxyErrorListener;
});

// node_modules/antlr4/Recognizer.js
var require_Recognizer = __commonJS((exports) => {
  var Token = require_Token().Token;
  var ConsoleErrorListener = require_ErrorListener().ConsoleErrorListener;
  var ProxyErrorListener = require_ErrorListener().ProxyErrorListener;
  function Recognizer() {
    this._listeners = [ConsoleErrorListener.INSTANCE];
    this._interp = null;
    this._stateNumber = -1;
    return this;
  }
  Recognizer.tokenTypeMapCache = {};
  Recognizer.ruleIndexMapCache = {};
  Recognizer.prototype.checkVersion = function(toolVersion) {
    var runtimeVersion = "4.8";
    if (runtimeVersion !== toolVersion) {
      console.log("ANTLR runtime and generated code versions disagree: " + runtimeVersion + "!=" + toolVersion);
    }
  };
  Recognizer.prototype.addErrorListener = function(listener) {
    this._listeners.push(listener);
  };
  Recognizer.prototype.removeErrorListeners = function() {
    this._listeners = [];
  };
  Recognizer.prototype.getTokenTypeMap = function() {
    var tokenNames = this.getTokenNames();
    if (tokenNames === null) {
      throw "The current recognizer does not provide a list of token names.";
    }
    var result = this.tokenTypeMapCache[tokenNames];
    if (result === void 0) {
      result = tokenNames.reduce(function(o, k, i) {
        o[k] = i;
      });
      result.EOF = Token.EOF;
      this.tokenTypeMapCache[tokenNames] = result;
    }
    return result;
  };
  Recognizer.prototype.getRuleIndexMap = function() {
    var ruleNames = this.ruleNames;
    if (ruleNames === null) {
      throw "The current recognizer does not provide a list of rule names.";
    }
    var result = this.ruleIndexMapCache[ruleNames];
    if (result === void 0) {
      result = ruleNames.reduce(function(o, k, i) {
        o[k] = i;
      });
      this.ruleIndexMapCache[ruleNames] = result;
    }
    return result;
  };
  Recognizer.prototype.getTokenType = function(tokenName) {
    var ttype = this.getTokenTypeMap()[tokenName];
    if (ttype !== void 0) {
      return ttype;
    } else {
      return Token.INVALID_TYPE;
    }
  };
  Recognizer.prototype.getErrorHeader = function(e) {
    var line = e.getOffendingToken().line;
    var column = e.getOffendingToken().column;
    return "line " + line + ":" + column;
  };
  Recognizer.prototype.getTokenErrorDisplay = function(t) {
    if (t === null) {
      return "<no token>";
    }
    var s = t.text;
    if (s === null) {
      if (t.type === Token.EOF) {
        s = "<EOF>";
      } else {
        s = "<" + t.type + ">";
      }
    }
    s = s.replace("\n", "\\n").replace("\r", "\\r").replace("	", "\\t");
    return "'" + s + "'";
  };
  Recognizer.prototype.getErrorListenerDispatch = function() {
    return new ProxyErrorListener(this._listeners);
  };
  Recognizer.prototype.sempred = function(localctx, ruleIndex, actionIndex) {
    return true;
  };
  Recognizer.prototype.precpred = function(localctx, precedence) {
    return true;
  };
  Object.defineProperty(Recognizer.prototype, "state", {
    get: function() {
      return this._stateNumber;
    },
    set: function(state) {
      this._stateNumber = state;
    }
  });
  exports.Recognizer = Recognizer;
});

// node_modules/antlr4/CommonTokenFactory.js
var require_CommonTokenFactory = __commonJS((exports) => {
  var CommonToken = require_Token().CommonToken;
  function TokenFactory() {
    return this;
  }
  function CommonTokenFactory(copyText) {
    TokenFactory.call(this);
    this.copyText = copyText === void 0 ? false : copyText;
    return this;
  }
  CommonTokenFactory.prototype = Object.create(TokenFactory.prototype);
  CommonTokenFactory.prototype.constructor = CommonTokenFactory;
  CommonTokenFactory.DEFAULT = new CommonTokenFactory();
  CommonTokenFactory.prototype.create = function(source, type, text, channel, start, stop, line, column) {
    var t = new CommonToken(source, type, channel, start, stop);
    t.line = line;
    t.column = column;
    if (text !== null) {
      t.text = text;
    } else if (this.copyText && source[1] !== null) {
      t.text = source[1].getText(start, stop);
    }
    return t;
  };
  CommonTokenFactory.prototype.createThin = function(type, text) {
    var t = new CommonToken(null, type);
    t.text = text;
    return t;
  };
  exports.CommonTokenFactory = CommonTokenFactory;
});

// node_modules/antlr4/error/Errors.js
var require_Errors = __commonJS((exports) => {
  var PredicateTransition = require_Transition().PredicateTransition;
  function RecognitionException(params) {
    Error.call(this);
    if (!!Error.captureStackTrace) {
      Error.captureStackTrace(this, RecognitionException);
    } else {
      var stack = new Error().stack;
    }
    this.message = params.message;
    this.recognizer = params.recognizer;
    this.input = params.input;
    this.ctx = params.ctx;
    this.offendingToken = null;
    this.offendingState = -1;
    if (this.recognizer !== null) {
      this.offendingState = this.recognizer.state;
    }
    return this;
  }
  RecognitionException.prototype = Object.create(Error.prototype);
  RecognitionException.prototype.constructor = RecognitionException;
  RecognitionException.prototype.getExpectedTokens = function() {
    if (this.recognizer !== null) {
      return this.recognizer.atn.getExpectedTokens(this.offendingState, this.ctx);
    } else {
      return null;
    }
  };
  RecognitionException.prototype.toString = function() {
    return this.message;
  };
  function LexerNoViableAltException(lexer, input, startIndex, deadEndConfigs) {
    RecognitionException.call(this, {message: "", recognizer: lexer, input, ctx: null});
    this.startIndex = startIndex;
    this.deadEndConfigs = deadEndConfigs;
    return this;
  }
  LexerNoViableAltException.prototype = Object.create(RecognitionException.prototype);
  LexerNoViableAltException.prototype.constructor = LexerNoViableAltException;
  LexerNoViableAltException.prototype.toString = function() {
    var symbol = "";
    if (this.startIndex >= 0 && this.startIndex < this.input.size) {
      symbol = this.input.getText((this.startIndex, this.startIndex));
    }
    return "LexerNoViableAltException" + symbol;
  };
  function NoViableAltException(recognizer, input, startToken, offendingToken, deadEndConfigs, ctx) {
    ctx = ctx || recognizer._ctx;
    offendingToken = offendingToken || recognizer.getCurrentToken();
    startToken = startToken || recognizer.getCurrentToken();
    input = input || recognizer.getInputStream();
    RecognitionException.call(this, {message: "", recognizer, input, ctx});
    this.deadEndConfigs = deadEndConfigs;
    this.startToken = startToken;
    this.offendingToken = offendingToken;
  }
  NoViableAltException.prototype = Object.create(RecognitionException.prototype);
  NoViableAltException.prototype.constructor = NoViableAltException;
  function InputMismatchException(recognizer) {
    RecognitionException.call(this, {message: "", recognizer, input: recognizer.getInputStream(), ctx: recognizer._ctx});
    this.offendingToken = recognizer.getCurrentToken();
  }
  InputMismatchException.prototype = Object.create(RecognitionException.prototype);
  InputMismatchException.prototype.constructor = InputMismatchException;
  function FailedPredicateException(recognizer, predicate, message) {
    RecognitionException.call(this, {
      message: this.formatMessage(predicate, message || null),
      recognizer,
      input: recognizer.getInputStream(),
      ctx: recognizer._ctx
    });
    var s = recognizer._interp.atn.states[recognizer.state];
    var trans = s.transitions[0];
    if (trans instanceof PredicateTransition) {
      this.ruleIndex = trans.ruleIndex;
      this.predicateIndex = trans.predIndex;
    } else {
      this.ruleIndex = 0;
      this.predicateIndex = 0;
    }
    this.predicate = predicate;
    this.offendingToken = recognizer.getCurrentToken();
    return this;
  }
  FailedPredicateException.prototype = Object.create(RecognitionException.prototype);
  FailedPredicateException.prototype.constructor = FailedPredicateException;
  FailedPredicateException.prototype.formatMessage = function(predicate, message) {
    if (message !== null) {
      return message;
    } else {
      return "failed predicate: {" + predicate + "}?";
    }
  };
  function ParseCancellationException() {
    Error.call(this);
    Error.captureStackTrace(this, ParseCancellationException);
    return this;
  }
  ParseCancellationException.prototype = Object.create(Error.prototype);
  ParseCancellationException.prototype.constructor = ParseCancellationException;
  exports.RecognitionException = RecognitionException;
  exports.NoViableAltException = NoViableAltException;
  exports.LexerNoViableAltException = LexerNoViableAltException;
  exports.InputMismatchException = InputMismatchException;
  exports.FailedPredicateException = FailedPredicateException;
  exports.ParseCancellationException = ParseCancellationException;
});

// node_modules/antlr4/Lexer.js
var require_Lexer = __commonJS((exports) => {
  var Token = require_Token().Token;
  var Recognizer = require_Recognizer().Recognizer;
  var CommonTokenFactory = require_CommonTokenFactory().CommonTokenFactory;
  var RecognitionException = require_Errors().RecognitionException;
  var LexerNoViableAltException = require_Errors().LexerNoViableAltException;
  function Lexer(input) {
    Recognizer.call(this);
    this._input = input;
    this._factory = CommonTokenFactory.DEFAULT;
    this._tokenFactorySourcePair = [this, input];
    this._interp = null;
    this._token = null;
    this._tokenStartCharIndex = -1;
    this._tokenStartLine = -1;
    this._tokenStartColumn = -1;
    this._hitEOF = false;
    this._channel = Token.DEFAULT_CHANNEL;
    this._type = Token.INVALID_TYPE;
    this._modeStack = [];
    this._mode = Lexer.DEFAULT_MODE;
    this._text = null;
    return this;
  }
  Lexer.prototype = Object.create(Recognizer.prototype);
  Lexer.prototype.constructor = Lexer;
  Lexer.DEFAULT_MODE = 0;
  Lexer.MORE = -2;
  Lexer.SKIP = -3;
  Lexer.DEFAULT_TOKEN_CHANNEL = Token.DEFAULT_CHANNEL;
  Lexer.HIDDEN = Token.HIDDEN_CHANNEL;
  Lexer.MIN_CHAR_VALUE = 0;
  Lexer.MAX_CHAR_VALUE = 1114111;
  Lexer.prototype.reset = function() {
    if (this._input !== null) {
      this._input.seek(0);
    }
    this._token = null;
    this._type = Token.INVALID_TYPE;
    this._channel = Token.DEFAULT_CHANNEL;
    this._tokenStartCharIndex = -1;
    this._tokenStartColumn = -1;
    this._tokenStartLine = -1;
    this._text = null;
    this._hitEOF = false;
    this._mode = Lexer.DEFAULT_MODE;
    this._modeStack = [];
    this._interp.reset();
  };
  Lexer.prototype.nextToken = function() {
    if (this._input === null) {
      throw "nextToken requires a non-null input stream.";
    }
    var tokenStartMarker = this._input.mark();
    try {
      while (true) {
        if (this._hitEOF) {
          this.emitEOF();
          return this._token;
        }
        this._token = null;
        this._channel = Token.DEFAULT_CHANNEL;
        this._tokenStartCharIndex = this._input.index;
        this._tokenStartColumn = this._interp.column;
        this._tokenStartLine = this._interp.line;
        this._text = null;
        var continueOuter = false;
        while (true) {
          this._type = Token.INVALID_TYPE;
          var ttype = Lexer.SKIP;
          try {
            ttype = this._interp.match(this._input, this._mode);
          } catch (e) {
            if (e instanceof RecognitionException) {
              this.notifyListeners(e);
              this.recover(e);
            } else {
              console.log(e.stack);
              throw e;
            }
          }
          if (this._input.LA(1) === Token.EOF) {
            this._hitEOF = true;
          }
          if (this._type === Token.INVALID_TYPE) {
            this._type = ttype;
          }
          if (this._type === Lexer.SKIP) {
            continueOuter = true;
            break;
          }
          if (this._type !== Lexer.MORE) {
            break;
          }
        }
        if (continueOuter) {
          continue;
        }
        if (this._token === null) {
          this.emit();
        }
        return this._token;
      }
    } finally {
      this._input.release(tokenStartMarker);
    }
  };
  Lexer.prototype.skip = function() {
    this._type = Lexer.SKIP;
  };
  Lexer.prototype.more = function() {
    this._type = Lexer.MORE;
  };
  Lexer.prototype.mode = function(m) {
    this._mode = m;
  };
  Lexer.prototype.pushMode = function(m) {
    if (this._interp.debug) {
      console.log("pushMode " + m);
    }
    this._modeStack.push(this._mode);
    this.mode(m);
  };
  Lexer.prototype.popMode = function() {
    if (this._modeStack.length === 0) {
      throw "Empty Stack";
    }
    if (this._interp.debug) {
      console.log("popMode back to " + this._modeStack.slice(0, -1));
    }
    this.mode(this._modeStack.pop());
    return this._mode;
  };
  Object.defineProperty(Lexer.prototype, "inputStream", {
    get: function() {
      return this._input;
    },
    set: function(input) {
      this._input = null;
      this._tokenFactorySourcePair = [this, this._input];
      this.reset();
      this._input = input;
      this._tokenFactorySourcePair = [this, this._input];
    }
  });
  Object.defineProperty(Lexer.prototype, "sourceName", {
    get: function sourceName() {
      return this._input.sourceName;
    }
  });
  Lexer.prototype.emitToken = function(token) {
    this._token = token;
  };
  Lexer.prototype.emit = function() {
    var t = this._factory.create(this._tokenFactorySourcePair, this._type, this._text, this._channel, this._tokenStartCharIndex, this.getCharIndex() - 1, this._tokenStartLine, this._tokenStartColumn);
    this.emitToken(t);
    return t;
  };
  Lexer.prototype.emitEOF = function() {
    var cpos = this.column;
    var lpos = this.line;
    var eof = this._factory.create(this._tokenFactorySourcePair, Token.EOF, null, Token.DEFAULT_CHANNEL, this._input.index, this._input.index - 1, lpos, cpos);
    this.emitToken(eof);
    return eof;
  };
  Object.defineProperty(Lexer.prototype, "type", {
    get: function() {
      return this.type;
    },
    set: function(type) {
      this._type = type;
    }
  });
  Object.defineProperty(Lexer.prototype, "line", {
    get: function() {
      return this._interp.line;
    },
    set: function(line) {
      this._interp.line = line;
    }
  });
  Object.defineProperty(Lexer.prototype, "column", {
    get: function() {
      return this._interp.column;
    },
    set: function(column) {
      this._interp.column = column;
    }
  });
  Lexer.prototype.getCharIndex = function() {
    return this._input.index;
  };
  Object.defineProperty(Lexer.prototype, "text", {
    get: function() {
      if (this._text !== null) {
        return this._text;
      } else {
        return this._interp.getText(this._input);
      }
    },
    set: function(text) {
      this._text = text;
    }
  });
  Lexer.prototype.getAllTokens = function() {
    var tokens = [];
    var t = this.nextToken();
    while (t.type !== Token.EOF) {
      tokens.push(t);
      t = this.nextToken();
    }
    return tokens;
  };
  Lexer.prototype.notifyListeners = function(e) {
    var start = this._tokenStartCharIndex;
    var stop = this._input.index;
    var text = this._input.getText(start, stop);
    var msg = "token recognition error at: '" + this.getErrorDisplay(text) + "'";
    var listener = this.getErrorListenerDispatch();
    listener.syntaxError(this, null, this._tokenStartLine, this._tokenStartColumn, msg, e);
  };
  Lexer.prototype.getErrorDisplay = function(s) {
    var d = [];
    for (var i = 0; i < s.length; i++) {
      d.push(s[i]);
    }
    return d.join("");
  };
  Lexer.prototype.getErrorDisplayForChar = function(c) {
    if (c.charCodeAt(0) === Token.EOF) {
      return "<EOF>";
    } else if (c === "\n") {
      return "\\n";
    } else if (c === "	") {
      return "\\t";
    } else if (c === "\r") {
      return "\\r";
    } else {
      return c;
    }
  };
  Lexer.prototype.getCharErrorDisplay = function(c) {
    return "'" + this.getErrorDisplayForChar(c) + "'";
  };
  Lexer.prototype.recover = function(re) {
    if (this._input.LA(1) !== Token.EOF) {
      if (re instanceof LexerNoViableAltException) {
        this._interp.consume(this._input);
      } else {
        this._input.consume();
      }
    }
  };
  exports.Lexer = Lexer;
});

// node_modules/antlr4/atn/ATNConfigSet.js
var require_ATNConfigSet = __commonJS((exports) => {
  var ATN = require_ATN().ATN;
  var Utils = require_Utils();
  var Hash2 = Utils.Hash;
  var Set = Utils.Set;
  var SemanticContext = require_SemanticContext().SemanticContext;
  var merge = require_PredictionContext().merge;
  function hashATNConfig(c) {
    return c.hashCodeForConfigSet();
  }
  function equalATNConfigs(a, b) {
    if (a === b) {
      return true;
    } else if (a === null || b === null) {
      return false;
    } else
      return a.equalsForConfigSet(b);
  }
  function ATNConfigSet(fullCtx) {
    this.configLookup = new Set(hashATNConfig, equalATNConfigs);
    this.fullCtx = fullCtx === void 0 ? true : fullCtx;
    this.readOnly = false;
    this.configs = [];
    this.uniqueAlt = 0;
    this.conflictingAlts = null;
    this.hasSemanticContext = false;
    this.dipsIntoOuterContext = false;
    this.cachedHashCode = -1;
    return this;
  }
  ATNConfigSet.prototype.add = function(config, mergeCache) {
    if (mergeCache === void 0) {
      mergeCache = null;
    }
    if (this.readOnly) {
      throw "This set is readonly";
    }
    if (config.semanticContext !== SemanticContext.NONE) {
      this.hasSemanticContext = true;
    }
    if (config.reachesIntoOuterContext > 0) {
      this.dipsIntoOuterContext = true;
    }
    var existing = this.configLookup.add(config);
    if (existing === config) {
      this.cachedHashCode = -1;
      this.configs.push(config);
      return true;
    }
    var rootIsWildcard = !this.fullCtx;
    var merged = merge(existing.context, config.context, rootIsWildcard, mergeCache);
    existing.reachesIntoOuterContext = Math.max(existing.reachesIntoOuterContext, config.reachesIntoOuterContext);
    if (config.precedenceFilterSuppressed) {
      existing.precedenceFilterSuppressed = true;
    }
    existing.context = merged;
    return true;
  };
  ATNConfigSet.prototype.getStates = function() {
    var states = new Set();
    for (var i = 0; i < this.configs.length; i++) {
      states.add(this.configs[i].state);
    }
    return states;
  };
  ATNConfigSet.prototype.getPredicates = function() {
    var preds = [];
    for (var i = 0; i < this.configs.length; i++) {
      var c = this.configs[i].semanticContext;
      if (c !== SemanticContext.NONE) {
        preds.push(c.semanticContext);
      }
    }
    return preds;
  };
  Object.defineProperty(ATNConfigSet.prototype, "items", {
    get: function() {
      return this.configs;
    }
  });
  ATNConfigSet.prototype.optimizeConfigs = function(interpreter) {
    if (this.readOnly) {
      throw "This set is readonly";
    }
    if (this.configLookup.length === 0) {
      return;
    }
    for (var i = 0; i < this.configs.length; i++) {
      var config = this.configs[i];
      config.context = interpreter.getCachedContext(config.context);
    }
  };
  ATNConfigSet.prototype.addAll = function(coll) {
    for (var i = 0; i < coll.length; i++) {
      this.add(coll[i]);
    }
    return false;
  };
  ATNConfigSet.prototype.equals = function(other) {
    return this === other || other instanceof ATNConfigSet && Utils.equalArrays(this.configs, other.configs) && this.fullCtx === other.fullCtx && this.uniqueAlt === other.uniqueAlt && this.conflictingAlts === other.conflictingAlts && this.hasSemanticContext === other.hasSemanticContext && this.dipsIntoOuterContext === other.dipsIntoOuterContext;
  };
  ATNConfigSet.prototype.hashCode = function() {
    var hash = new Hash2();
    hash.update(this.configs);
    return hash.finish();
  };
  ATNConfigSet.prototype.updateHashCode = function(hash) {
    if (this.readOnly) {
      if (this.cachedHashCode === -1) {
        this.cachedHashCode = this.hashCode();
      }
      hash.update(this.cachedHashCode);
    } else {
      hash.update(this.hashCode());
    }
  };
  Object.defineProperty(ATNConfigSet.prototype, "length", {
    get: function() {
      return this.configs.length;
    }
  });
  ATNConfigSet.prototype.isEmpty = function() {
    return this.configs.length === 0;
  };
  ATNConfigSet.prototype.contains = function(item) {
    if (this.configLookup === null) {
      throw "This method is not implemented for readonly sets.";
    }
    return this.configLookup.contains(item);
  };
  ATNConfigSet.prototype.containsFast = function(item) {
    if (this.configLookup === null) {
      throw "This method is not implemented for readonly sets.";
    }
    return this.configLookup.containsFast(item);
  };
  ATNConfigSet.prototype.clear = function() {
    if (this.readOnly) {
      throw "This set is readonly";
    }
    this.configs = [];
    this.cachedHashCode = -1;
    this.configLookup = new Set();
  };
  ATNConfigSet.prototype.setReadonly = function(readOnly) {
    this.readOnly = readOnly;
    if (readOnly) {
      this.configLookup = null;
    }
  };
  ATNConfigSet.prototype.toString = function() {
    return Utils.arrayToString(this.configs) + (this.hasSemanticContext ? ",hasSemanticContext=" + this.hasSemanticContext : "") + (this.uniqueAlt !== ATN.INVALID_ALT_NUMBER ? ",uniqueAlt=" + this.uniqueAlt : "") + (this.conflictingAlts !== null ? ",conflictingAlts=" + this.conflictingAlts : "") + (this.dipsIntoOuterContext ? ",dipsIntoOuterContext" : "");
  };
  function OrderedATNConfigSet() {
    ATNConfigSet.call(this);
    this.configLookup = new Set();
    return this;
  }
  OrderedATNConfigSet.prototype = Object.create(ATNConfigSet.prototype);
  OrderedATNConfigSet.prototype.constructor = OrderedATNConfigSet;
  exports.ATNConfigSet = ATNConfigSet;
  exports.OrderedATNConfigSet = OrderedATNConfigSet;
});

// node_modules/antlr4/dfa/DFAState.js
var require_DFAState = __commonJS((exports) => {
  var ATNConfigSet = require_ATNConfigSet().ATNConfigSet;
  var Utils = require_Utils();
  var Hash2 = Utils.Hash;
  var Set = Utils.Set;
  function PredPrediction(pred, alt) {
    this.alt = alt;
    this.pred = pred;
    return this;
  }
  PredPrediction.prototype.toString = function() {
    return "(" + this.pred + ", " + this.alt + ")";
  };
  function DFAState(stateNumber, configs) {
    if (stateNumber === null) {
      stateNumber = -1;
    }
    if (configs === null) {
      configs = new ATNConfigSet();
    }
    this.stateNumber = stateNumber;
    this.configs = configs;
    this.edges = null;
    this.isAcceptState = false;
    this.prediction = 0;
    this.lexerActionExecutor = null;
    this.requiresFullContext = false;
    this.predicates = null;
    return this;
  }
  DFAState.prototype.getAltSet = function() {
    var alts = new Set();
    if (this.configs !== null) {
      for (var i = 0; i < this.configs.length; i++) {
        var c = this.configs[i];
        alts.add(c.alt);
      }
    }
    if (alts.length === 0) {
      return null;
    } else {
      return alts;
    }
  };
  DFAState.prototype.equals = function(other) {
    return this === other || other instanceof DFAState && this.configs.equals(other.configs);
  };
  DFAState.prototype.toString = function() {
    var s = "" + this.stateNumber + ":" + this.configs;
    if (this.isAcceptState) {
      s = s + "=>";
      if (this.predicates !== null)
        s = s + this.predicates;
      else
        s = s + this.prediction;
    }
    return s;
  };
  DFAState.prototype.hashCode = function() {
    var hash = new Hash2();
    hash.update(this.configs);
    return hash.finish();
  };
  exports.DFAState = DFAState;
  exports.PredPrediction = PredPrediction;
});

// node_modules/antlr4/atn/ATNSimulator.js
var require_ATNSimulator = __commonJS((exports) => {
  var DFAState = require_DFAState().DFAState;
  var ATNConfigSet = require_ATNConfigSet().ATNConfigSet;
  var getCachedPredictionContext = require_PredictionContext().getCachedPredictionContext;
  var Map = require_Utils().Map;
  function ATNSimulator(atn, sharedContextCache) {
    this.atn = atn;
    this.sharedContextCache = sharedContextCache;
    return this;
  }
  ATNSimulator.ERROR = new DFAState(2147483647, new ATNConfigSet());
  ATNSimulator.prototype.getCachedContext = function(context) {
    if (this.sharedContextCache === null) {
      return context;
    }
    var visited = new Map();
    return getCachedPredictionContext(context, this.sharedContextCache, visited);
  };
  exports.ATNSimulator = ATNSimulator;
});

// node_modules/antlr4/atn/LexerActionExecutor.js
var require_LexerActionExecutor = __commonJS((exports) => {
  var hashStuff = require_Utils().hashStuff;
  var LexerIndexedCustomAction = require_LexerAction().LexerIndexedCustomAction;
  function LexerActionExecutor(lexerActions) {
    this.lexerActions = lexerActions === null ? [] : lexerActions;
    this.cachedHashCode = hashStuff(lexerActions);
    return this;
  }
  LexerActionExecutor.append = function(lexerActionExecutor, lexerAction) {
    if (lexerActionExecutor === null) {
      return new LexerActionExecutor([lexerAction]);
    }
    var lexerActions = lexerActionExecutor.lexerActions.concat([lexerAction]);
    return new LexerActionExecutor(lexerActions);
  };
  LexerActionExecutor.prototype.fixOffsetBeforeMatch = function(offset) {
    var updatedLexerActions = null;
    for (var i = 0; i < this.lexerActions.length; i++) {
      if (this.lexerActions[i].isPositionDependent && !(this.lexerActions[i] instanceof LexerIndexedCustomAction)) {
        if (updatedLexerActions === null) {
          updatedLexerActions = this.lexerActions.concat([]);
        }
        updatedLexerActions[i] = new LexerIndexedCustomAction(offset, this.lexerActions[i]);
      }
    }
    if (updatedLexerActions === null) {
      return this;
    } else {
      return new LexerActionExecutor(updatedLexerActions);
    }
  };
  LexerActionExecutor.prototype.execute = function(lexer, input, startIndex) {
    var requiresSeek = false;
    var stopIndex = input.index;
    try {
      for (var i = 0; i < this.lexerActions.length; i++) {
        var lexerAction = this.lexerActions[i];
        if (lexerAction instanceof LexerIndexedCustomAction) {
          var offset = lexerAction.offset;
          input.seek(startIndex + offset);
          lexerAction = lexerAction.action;
          requiresSeek = startIndex + offset !== stopIndex;
        } else if (lexerAction.isPositionDependent) {
          input.seek(stopIndex);
          requiresSeek = false;
        }
        lexerAction.execute(lexer);
      }
    } finally {
      if (requiresSeek) {
        input.seek(stopIndex);
      }
    }
  };
  LexerActionExecutor.prototype.hashCode = function() {
    return this.cachedHashCode;
  };
  LexerActionExecutor.prototype.updateHashCode = function(hash) {
    hash.update(this.cachedHashCode);
  };
  LexerActionExecutor.prototype.equals = function(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof LexerActionExecutor)) {
      return false;
    } else if (this.cachedHashCode != other.cachedHashCode) {
      return false;
    } else if (this.lexerActions.length != other.lexerActions.length) {
      return false;
    } else {
      var numActions = this.lexerActions.length;
      for (var idx = 0; idx < numActions; ++idx) {
        if (!this.lexerActions[idx].equals(other.lexerActions[idx])) {
          return false;
        }
      }
      return true;
    }
  };
  exports.LexerActionExecutor = LexerActionExecutor;
});

// node_modules/antlr4/atn/LexerATNSimulator.js
var require_LexerATNSimulator = __commonJS((exports) => {
  var Token = require_Token().Token;
  var Lexer = require_Lexer().Lexer;
  var ATN = require_ATN().ATN;
  var ATNSimulator = require_ATNSimulator().ATNSimulator;
  var DFAState = require_DFAState().DFAState;
  var ATNConfigSet = require_ATNConfigSet().ATNConfigSet;
  var OrderedATNConfigSet = require_ATNConfigSet().OrderedATNConfigSet;
  var PredictionContext = require_PredictionContext().PredictionContext;
  var SingletonPredictionContext = require_PredictionContext().SingletonPredictionContext;
  var RuleStopState = require_ATNState().RuleStopState;
  var LexerATNConfig = require_ATNConfig().LexerATNConfig;
  var Transition = require_Transition().Transition;
  var LexerActionExecutor = require_LexerActionExecutor().LexerActionExecutor;
  var LexerNoViableAltException = require_Errors().LexerNoViableAltException;
  function resetSimState(sim) {
    sim.index = -1;
    sim.line = 0;
    sim.column = -1;
    sim.dfaState = null;
  }
  function SimState() {
    resetSimState(this);
    return this;
  }
  SimState.prototype.reset = function() {
    resetSimState(this);
  };
  function LexerATNSimulator(recog, atn, decisionToDFA, sharedContextCache) {
    ATNSimulator.call(this, atn, sharedContextCache);
    this.decisionToDFA = decisionToDFA;
    this.recog = recog;
    this.startIndex = -1;
    this.line = 1;
    this.column = 0;
    this.mode = Lexer.DEFAULT_MODE;
    this.prevAccept = new SimState();
    return this;
  }
  LexerATNSimulator.prototype = Object.create(ATNSimulator.prototype);
  LexerATNSimulator.prototype.constructor = LexerATNSimulator;
  LexerATNSimulator.debug = false;
  LexerATNSimulator.dfa_debug = false;
  LexerATNSimulator.MIN_DFA_EDGE = 0;
  LexerATNSimulator.MAX_DFA_EDGE = 127;
  LexerATNSimulator.match_calls = 0;
  LexerATNSimulator.prototype.copyState = function(simulator) {
    this.column = simulator.column;
    this.line = simulator.line;
    this.mode = simulator.mode;
    this.startIndex = simulator.startIndex;
  };
  LexerATNSimulator.prototype.match = function(input, mode) {
    this.match_calls += 1;
    this.mode = mode;
    var mark = input.mark();
    try {
      this.startIndex = input.index;
      this.prevAccept.reset();
      var dfa = this.decisionToDFA[mode];
      if (dfa.s0 === null) {
        return this.matchATN(input);
      } else {
        return this.execATN(input, dfa.s0);
      }
    } finally {
      input.release(mark);
    }
  };
  LexerATNSimulator.prototype.reset = function() {
    this.prevAccept.reset();
    this.startIndex = -1;
    this.line = 1;
    this.column = 0;
    this.mode = Lexer.DEFAULT_MODE;
  };
  LexerATNSimulator.prototype.matchATN = function(input) {
    var startState = this.atn.modeToStartState[this.mode];
    if (LexerATNSimulator.debug) {
      console.log("matchATN mode " + this.mode + " start: " + startState);
    }
    var old_mode = this.mode;
    var s0_closure = this.computeStartState(input, startState);
    var suppressEdge = s0_closure.hasSemanticContext;
    s0_closure.hasSemanticContext = false;
    var next = this.addDFAState(s0_closure);
    if (!suppressEdge) {
      this.decisionToDFA[this.mode].s0 = next;
    }
    var predict = this.execATN(input, next);
    if (LexerATNSimulator.debug) {
      console.log("DFA after matchATN: " + this.decisionToDFA[old_mode].toLexerString());
    }
    return predict;
  };
  LexerATNSimulator.prototype.execATN = function(input, ds0) {
    if (LexerATNSimulator.debug) {
      console.log("start state closure=" + ds0.configs);
    }
    if (ds0.isAcceptState) {
      this.captureSimState(this.prevAccept, input, ds0);
    }
    var t = input.LA(1);
    var s = ds0;
    while (true) {
      if (LexerATNSimulator.debug) {
        console.log("execATN loop starting closure: " + s.configs);
      }
      var target = this.getExistingTargetState(s, t);
      if (target === null) {
        target = this.computeTargetState(input, s, t);
      }
      if (target === ATNSimulator.ERROR) {
        break;
      }
      if (t !== Token.EOF) {
        this.consume(input);
      }
      if (target.isAcceptState) {
        this.captureSimState(this.prevAccept, input, target);
        if (t === Token.EOF) {
          break;
        }
      }
      t = input.LA(1);
      s = target;
    }
    return this.failOrAccept(this.prevAccept, input, s.configs, t);
  };
  LexerATNSimulator.prototype.getExistingTargetState = function(s, t) {
    if (s.edges === null || t < LexerATNSimulator.MIN_DFA_EDGE || t > LexerATNSimulator.MAX_DFA_EDGE) {
      return null;
    }
    var target = s.edges[t - LexerATNSimulator.MIN_DFA_EDGE];
    if (target === void 0) {
      target = null;
    }
    if (LexerATNSimulator.debug && target !== null) {
      console.log("reuse state " + s.stateNumber + " edge to " + target.stateNumber);
    }
    return target;
  };
  LexerATNSimulator.prototype.computeTargetState = function(input, s, t) {
    var reach = new OrderedATNConfigSet();
    this.getReachableConfigSet(input, s.configs, reach, t);
    if (reach.items.length === 0) {
      if (!reach.hasSemanticContext) {
        this.addDFAEdge(s, t, ATNSimulator.ERROR);
      }
      return ATNSimulator.ERROR;
    }
    return this.addDFAEdge(s, t, null, reach);
  };
  LexerATNSimulator.prototype.failOrAccept = function(prevAccept, input, reach, t) {
    if (this.prevAccept.dfaState !== null) {
      var lexerActionExecutor = prevAccept.dfaState.lexerActionExecutor;
      this.accept(input, lexerActionExecutor, this.startIndex, prevAccept.index, prevAccept.line, prevAccept.column);
      return prevAccept.dfaState.prediction;
    } else {
      if (t === Token.EOF && input.index === this.startIndex) {
        return Token.EOF;
      }
      throw new LexerNoViableAltException(this.recog, input, this.startIndex, reach);
    }
  };
  LexerATNSimulator.prototype.getReachableConfigSet = function(input, closure, reach, t) {
    var skipAlt = ATN.INVALID_ALT_NUMBER;
    for (var i = 0; i < closure.items.length; i++) {
      var cfg = closure.items[i];
      var currentAltReachedAcceptState = cfg.alt === skipAlt;
      if (currentAltReachedAcceptState && cfg.passedThroughNonGreedyDecision) {
        continue;
      }
      if (LexerATNSimulator.debug) {
        console.log("testing %s at %s\n", this.getTokenName(t), cfg.toString(this.recog, true));
      }
      for (var j = 0; j < cfg.state.transitions.length; j++) {
        var trans = cfg.state.transitions[j];
        var target = this.getReachableTarget(trans, t);
        if (target !== null) {
          var lexerActionExecutor = cfg.lexerActionExecutor;
          if (lexerActionExecutor !== null) {
            lexerActionExecutor = lexerActionExecutor.fixOffsetBeforeMatch(input.index - this.startIndex);
          }
          var treatEofAsEpsilon = t === Token.EOF;
          var config = new LexerATNConfig({state: target, lexerActionExecutor}, cfg);
          if (this.closure(input, config, reach, currentAltReachedAcceptState, true, treatEofAsEpsilon)) {
            skipAlt = cfg.alt;
          }
        }
      }
    }
  };
  LexerATNSimulator.prototype.accept = function(input, lexerActionExecutor, startIndex, index, line, charPos) {
    if (LexerATNSimulator.debug) {
      console.log("ACTION %s\n", lexerActionExecutor);
    }
    input.seek(index);
    this.line = line;
    this.column = charPos;
    if (lexerActionExecutor !== null && this.recog !== null) {
      lexerActionExecutor.execute(this.recog, input, startIndex);
    }
  };
  LexerATNSimulator.prototype.getReachableTarget = function(trans, t) {
    if (trans.matches(t, 0, Lexer.MAX_CHAR_VALUE)) {
      return trans.target;
    } else {
      return null;
    }
  };
  LexerATNSimulator.prototype.computeStartState = function(input, p) {
    var initialContext = PredictionContext.EMPTY;
    var configs = new OrderedATNConfigSet();
    for (var i = 0; i < p.transitions.length; i++) {
      var target = p.transitions[i].target;
      var cfg = new LexerATNConfig({state: target, alt: i + 1, context: initialContext}, null);
      this.closure(input, cfg, configs, false, false, false);
    }
    return configs;
  };
  LexerATNSimulator.prototype.closure = function(input, config, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon) {
    var cfg = null;
    if (LexerATNSimulator.debug) {
      console.log("closure(" + config.toString(this.recog, true) + ")");
    }
    if (config.state instanceof RuleStopState) {
      if (LexerATNSimulator.debug) {
        if (this.recog !== null) {
          console.log("closure at %s rule stop %s\n", this.recog.ruleNames[config.state.ruleIndex], config);
        } else {
          console.log("closure at rule stop %s\n", config);
        }
      }
      if (config.context === null || config.context.hasEmptyPath()) {
        if (config.context === null || config.context.isEmpty()) {
          configs.add(config);
          return true;
        } else {
          configs.add(new LexerATNConfig({state: config.state, context: PredictionContext.EMPTY}, config));
          currentAltReachedAcceptState = true;
        }
      }
      if (config.context !== null && !config.context.isEmpty()) {
        for (var i = 0; i < config.context.length; i++) {
          if (config.context.getReturnState(i) !== PredictionContext.EMPTY_RETURN_STATE) {
            var newContext = config.context.getParent(i);
            var returnState = this.atn.states[config.context.getReturnState(i)];
            cfg = new LexerATNConfig({state: returnState, context: newContext}, config);
            currentAltReachedAcceptState = this.closure(input, cfg, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon);
          }
        }
      }
      return currentAltReachedAcceptState;
    }
    if (!config.state.epsilonOnlyTransitions) {
      if (!currentAltReachedAcceptState || !config.passedThroughNonGreedyDecision) {
        configs.add(config);
      }
    }
    for (var j = 0; j < config.state.transitions.length; j++) {
      var trans = config.state.transitions[j];
      cfg = this.getEpsilonTarget(input, config, trans, configs, speculative, treatEofAsEpsilon);
      if (cfg !== null) {
        currentAltReachedAcceptState = this.closure(input, cfg, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon);
      }
    }
    return currentAltReachedAcceptState;
  };
  LexerATNSimulator.prototype.getEpsilonTarget = function(input, config, trans, configs, speculative, treatEofAsEpsilon) {
    var cfg = null;
    if (trans.serializationType === Transition.RULE) {
      var newContext = SingletonPredictionContext.create(config.context, trans.followState.stateNumber);
      cfg = new LexerATNConfig({state: trans.target, context: newContext}, config);
    } else if (trans.serializationType === Transition.PRECEDENCE) {
      throw "Precedence predicates are not supported in lexers.";
    } else if (trans.serializationType === Transition.PREDICATE) {
      if (LexerATNSimulator.debug) {
        console.log("EVAL rule " + trans.ruleIndex + ":" + trans.predIndex);
      }
      configs.hasSemanticContext = true;
      if (this.evaluatePredicate(input, trans.ruleIndex, trans.predIndex, speculative)) {
        cfg = new LexerATNConfig({state: trans.target}, config);
      }
    } else if (trans.serializationType === Transition.ACTION) {
      if (config.context === null || config.context.hasEmptyPath()) {
        var lexerActionExecutor = LexerActionExecutor.append(config.lexerActionExecutor, this.atn.lexerActions[trans.actionIndex]);
        cfg = new LexerATNConfig({state: trans.target, lexerActionExecutor}, config);
      } else {
        cfg = new LexerATNConfig({state: trans.target}, config);
      }
    } else if (trans.serializationType === Transition.EPSILON) {
      cfg = new LexerATNConfig({state: trans.target}, config);
    } else if (trans.serializationType === Transition.ATOM || trans.serializationType === Transition.RANGE || trans.serializationType === Transition.SET) {
      if (treatEofAsEpsilon) {
        if (trans.matches(Token.EOF, 0, Lexer.MAX_CHAR_VALUE)) {
          cfg = new LexerATNConfig({state: trans.target}, config);
        }
      }
    }
    return cfg;
  };
  LexerATNSimulator.prototype.evaluatePredicate = function(input, ruleIndex, predIndex, speculative) {
    if (this.recog === null) {
      return true;
    }
    if (!speculative) {
      return this.recog.sempred(null, ruleIndex, predIndex);
    }
    var savedcolumn = this.column;
    var savedLine = this.line;
    var index = input.index;
    var marker = input.mark();
    try {
      this.consume(input);
      return this.recog.sempred(null, ruleIndex, predIndex);
    } finally {
      this.column = savedcolumn;
      this.line = savedLine;
      input.seek(index);
      input.release(marker);
    }
  };
  LexerATNSimulator.prototype.captureSimState = function(settings, input, dfaState) {
    settings.index = input.index;
    settings.line = this.line;
    settings.column = this.column;
    settings.dfaState = dfaState;
  };
  LexerATNSimulator.prototype.addDFAEdge = function(from_, tk, to, cfgs) {
    if (to === void 0) {
      to = null;
    }
    if (cfgs === void 0) {
      cfgs = null;
    }
    if (to === null && cfgs !== null) {
      var suppressEdge = cfgs.hasSemanticContext;
      cfgs.hasSemanticContext = false;
      to = this.addDFAState(cfgs);
      if (suppressEdge) {
        return to;
      }
    }
    if (tk < LexerATNSimulator.MIN_DFA_EDGE || tk > LexerATNSimulator.MAX_DFA_EDGE) {
      return to;
    }
    if (LexerATNSimulator.debug) {
      console.log("EDGE " + from_ + " -> " + to + " upon " + tk);
    }
    if (from_.edges === null) {
      from_.edges = [];
    }
    from_.edges[tk - LexerATNSimulator.MIN_DFA_EDGE] = to;
    return to;
  };
  LexerATNSimulator.prototype.addDFAState = function(configs) {
    var proposed = new DFAState(null, configs);
    var firstConfigWithRuleStopState = null;
    for (var i = 0; i < configs.items.length; i++) {
      var cfg = configs.items[i];
      if (cfg.state instanceof RuleStopState) {
        firstConfigWithRuleStopState = cfg;
        break;
      }
    }
    if (firstConfigWithRuleStopState !== null) {
      proposed.isAcceptState = true;
      proposed.lexerActionExecutor = firstConfigWithRuleStopState.lexerActionExecutor;
      proposed.prediction = this.atn.ruleToTokenType[firstConfigWithRuleStopState.state.ruleIndex];
    }
    var dfa = this.decisionToDFA[this.mode];
    var existing = dfa.states.get(proposed);
    if (existing !== null) {
      return existing;
    }
    var newState = proposed;
    newState.stateNumber = dfa.states.length;
    configs.setReadonly(true);
    newState.configs = configs;
    dfa.states.add(newState);
    return newState;
  };
  LexerATNSimulator.prototype.getDFA = function(mode) {
    return this.decisionToDFA[mode];
  };
  LexerATNSimulator.prototype.getText = function(input) {
    return input.getText(this.startIndex, input.index - 1);
  };
  LexerATNSimulator.prototype.consume = function(input) {
    var curChar = input.LA(1);
    if (curChar === "\n".charCodeAt(0)) {
      this.line += 1;
      this.column = 0;
    } else {
      this.column += 1;
    }
    input.consume();
  };
  LexerATNSimulator.prototype.getTokenName = function(tt) {
    if (tt === -1) {
      return "EOF";
    } else {
      return "'" + String.fromCharCode(tt) + "'";
    }
  };
  exports.LexerATNSimulator = LexerATNSimulator;
});

// node_modules/antlr4/atn/PredictionMode.js
var require_PredictionMode = __commonJS((exports) => {
  var Set = require_Utils().Set;
  var Map = require_Utils().Map;
  var BitSet = require_Utils().BitSet;
  var AltDict = require_Utils().AltDict;
  var ATN = require_ATN().ATN;
  var RuleStopState = require_ATNState().RuleStopState;
  var ATNConfigSet = require_ATNConfigSet().ATNConfigSet;
  var ATNConfig = require_ATNConfig().ATNConfig;
  var SemanticContext = require_SemanticContext().SemanticContext;
  var Hash2 = require_Utils().Hash;
  var hashStuff = require_Utils().hashStuff;
  var equalArrays = require_Utils().equalArrays;
  function PredictionMode() {
    return this;
  }
  PredictionMode.SLL = 0;
  PredictionMode.LL = 1;
  PredictionMode.LL_EXACT_AMBIG_DETECTION = 2;
  PredictionMode.hasSLLConflictTerminatingPrediction = function(mode, configs) {
    if (PredictionMode.allConfigsInRuleStopStates(configs)) {
      return true;
    }
    if (mode === PredictionMode.SLL) {
      if (configs.hasSemanticContext) {
        var dup = new ATNConfigSet();
        for (var i = 0; i < configs.items.length; i++) {
          var c = configs.items[i];
          c = new ATNConfig({semanticContext: SemanticContext.NONE}, c);
          dup.add(c);
        }
        configs = dup;
      }
    }
    var altsets = PredictionMode.getConflictingAltSubsets(configs);
    return PredictionMode.hasConflictingAltSet(altsets) && !PredictionMode.hasStateAssociatedWithOneAlt(configs);
  };
  PredictionMode.hasConfigInRuleStopState = function(configs) {
    for (var i = 0; i < configs.items.length; i++) {
      var c = configs.items[i];
      if (c.state instanceof RuleStopState) {
        return true;
      }
    }
    return false;
  };
  PredictionMode.allConfigsInRuleStopStates = function(configs) {
    for (var i = 0; i < configs.items.length; i++) {
      var c = configs.items[i];
      if (!(c.state instanceof RuleStopState)) {
        return false;
      }
    }
    return true;
  };
  PredictionMode.resolvesToJustOneViableAlt = function(altsets) {
    return PredictionMode.getSingleViableAlt(altsets);
  };
  PredictionMode.allSubsetsConflict = function(altsets) {
    return !PredictionMode.hasNonConflictingAltSet(altsets);
  };
  PredictionMode.hasNonConflictingAltSet = function(altsets) {
    for (var i = 0; i < altsets.length; i++) {
      var alts = altsets[i];
      if (alts.length === 1) {
        return true;
      }
    }
    return false;
  };
  PredictionMode.hasConflictingAltSet = function(altsets) {
    for (var i = 0; i < altsets.length; i++) {
      var alts = altsets[i];
      if (alts.length > 1) {
        return true;
      }
    }
    return false;
  };
  PredictionMode.allSubsetsEqual = function(altsets) {
    var first = null;
    for (var i = 0; i < altsets.length; i++) {
      var alts = altsets[i];
      if (first === null) {
        first = alts;
      } else if (alts !== first) {
        return false;
      }
    }
    return true;
  };
  PredictionMode.getUniqueAlt = function(altsets) {
    var all = PredictionMode.getAlts(altsets);
    if (all.length === 1) {
      return all.minValue();
    } else {
      return ATN.INVALID_ALT_NUMBER;
    }
  };
  PredictionMode.getAlts = function(altsets) {
    var all = new BitSet();
    altsets.map(function(alts) {
      all.or(alts);
    });
    return all;
  };
  PredictionMode.getConflictingAltSubsets = function(configs) {
    var configToAlts = new Map();
    configToAlts.hashFunction = function(cfg) {
      hashStuff(cfg.state.stateNumber, cfg.context);
    };
    configToAlts.equalsFunction = function(c1, c2) {
      return c1.state.stateNumber == c2.state.stateNumber && c1.context.equals(c2.context);
    };
    configs.items.map(function(cfg) {
      var alts = configToAlts.get(cfg);
      if (alts === null) {
        alts = new BitSet();
        configToAlts.put(cfg, alts);
      }
      alts.add(cfg.alt);
    });
    return configToAlts.getValues();
  };
  PredictionMode.getStateToAltMap = function(configs) {
    var m = new AltDict();
    configs.items.map(function(c) {
      var alts = m.get(c.state);
      if (alts === null) {
        alts = new BitSet();
        m.put(c.state, alts);
      }
      alts.add(c.alt);
    });
    return m;
  };
  PredictionMode.hasStateAssociatedWithOneAlt = function(configs) {
    var values = PredictionMode.getStateToAltMap(configs).values();
    for (var i = 0; i < values.length; i++) {
      if (values[i].length === 1) {
        return true;
      }
    }
    return false;
  };
  PredictionMode.getSingleViableAlt = function(altsets) {
    var result = null;
    for (var i = 0; i < altsets.length; i++) {
      var alts = altsets[i];
      var minAlt = alts.minValue();
      if (result === null) {
        result = minAlt;
      } else if (result !== minAlt) {
        return ATN.INVALID_ALT_NUMBER;
      }
    }
    return result;
  };
  exports.PredictionMode = PredictionMode;
});

// node_modules/antlr4/atn/ParserATNSimulator.js
var require_ParserATNSimulator = __commonJS((exports) => {
  var Utils = require_Utils();
  var Set = Utils.Set;
  var BitSet = Utils.BitSet;
  var DoubleDict = Utils.DoubleDict;
  var ATN = require_ATN().ATN;
  var ATNState = require_ATNState().ATNState;
  var ATNConfig = require_ATNConfig().ATNConfig;
  var ATNConfigSet = require_ATNConfigSet().ATNConfigSet;
  var Token = require_Token().Token;
  var DFAState = require_DFAState().DFAState;
  var PredPrediction = require_DFAState().PredPrediction;
  var ATNSimulator = require_ATNSimulator().ATNSimulator;
  var PredictionMode = require_PredictionMode().PredictionMode;
  var RuleContext = require_RuleContext().RuleContext;
  var ParserRuleContext = require_ParserRuleContext().ParserRuleContext;
  var SemanticContext = require_SemanticContext().SemanticContext;
  var StarLoopEntryState = require_ATNState().StarLoopEntryState;
  var RuleStopState = require_ATNState().RuleStopState;
  var PredictionContext = require_PredictionContext().PredictionContext;
  var Interval = require_IntervalSet().Interval;
  var Transitions = require_Transition();
  var Transition = Transitions.Transition;
  var SetTransition = Transitions.SetTransition;
  var NotSetTransition = Transitions.NotSetTransition;
  var RuleTransition = Transitions.RuleTransition;
  var ActionTransition = Transitions.ActionTransition;
  var NoViableAltException = require_Errors().NoViableAltException;
  var SingletonPredictionContext = require_PredictionContext().SingletonPredictionContext;
  var predictionContextFromRuleContext = require_PredictionContext().predictionContextFromRuleContext;
  function ParserATNSimulator(parser, atn, decisionToDFA, sharedContextCache) {
    ATNSimulator.call(this, atn, sharedContextCache);
    this.parser = parser;
    this.decisionToDFA = decisionToDFA;
    this.predictionMode = PredictionMode.LL;
    this._input = null;
    this._startIndex = 0;
    this._outerContext = null;
    this._dfa = null;
    this.mergeCache = null;
    return this;
  }
  ParserATNSimulator.prototype = Object.create(ATNSimulator.prototype);
  ParserATNSimulator.prototype.constructor = ParserATNSimulator;
  ParserATNSimulator.prototype.debug = false;
  ParserATNSimulator.prototype.debug_closure = false;
  ParserATNSimulator.prototype.debug_add = false;
  ParserATNSimulator.prototype.debug_list_atn_decisions = false;
  ParserATNSimulator.prototype.dfa_debug = false;
  ParserATNSimulator.prototype.retry_debug = false;
  ParserATNSimulator.prototype.reset = function() {
  };
  ParserATNSimulator.prototype.adaptivePredict = function(input, decision, outerContext) {
    if (this.debug || this.debug_list_atn_decisions) {
      console.log("adaptivePredict decision " + decision + " exec LA(1)==" + this.getLookaheadName(input) + " line " + input.LT(1).line + ":" + input.LT(1).column);
    }
    this._input = input;
    this._startIndex = input.index;
    this._outerContext = outerContext;
    var dfa = this.decisionToDFA[decision];
    this._dfa = dfa;
    var m = input.mark();
    var index = input.index;
    try {
      var s0;
      if (dfa.precedenceDfa) {
        s0 = dfa.getPrecedenceStartState(this.parser.getPrecedence());
      } else {
        s0 = dfa.s0;
      }
      if (s0 === null) {
        if (outerContext === null) {
          outerContext = RuleContext.EMPTY;
        }
        if (this.debug || this.debug_list_atn_decisions) {
          console.log("predictATN decision " + dfa.decision + " exec LA(1)==" + this.getLookaheadName(input) + ", outerContext=" + outerContext.toString(this.parser.ruleNames));
        }
        var fullCtx = false;
        var s0_closure = this.computeStartState(dfa.atnStartState, RuleContext.EMPTY, fullCtx);
        if (dfa.precedenceDfa) {
          dfa.s0.configs = s0_closure;
          s0_closure = this.applyPrecedenceFilter(s0_closure);
          s0 = this.addDFAState(dfa, new DFAState(null, s0_closure));
          dfa.setPrecedenceStartState(this.parser.getPrecedence(), s0);
        } else {
          s0 = this.addDFAState(dfa, new DFAState(null, s0_closure));
          dfa.s0 = s0;
        }
      }
      var alt = this.execATN(dfa, s0, input, index, outerContext);
      if (this.debug) {
        console.log("DFA after predictATN: " + dfa.toString(this.parser.literalNames));
      }
      return alt;
    } finally {
      this._dfa = null;
      this.mergeCache = null;
      input.seek(index);
      input.release(m);
    }
  };
  ParserATNSimulator.prototype.execATN = function(dfa, s0, input, startIndex, outerContext) {
    if (this.debug || this.debug_list_atn_decisions) {
      console.log("execATN decision " + dfa.decision + " exec LA(1)==" + this.getLookaheadName(input) + " line " + input.LT(1).line + ":" + input.LT(1).column);
    }
    var alt;
    var previousD = s0;
    if (this.debug) {
      console.log("s0 = " + s0);
    }
    var t = input.LA(1);
    while (true) {
      var D = this.getExistingTargetState(previousD, t);
      if (D === null) {
        D = this.computeTargetState(dfa, previousD, t);
      }
      if (D === ATNSimulator.ERROR) {
        var e = this.noViableAlt(input, outerContext, previousD.configs, startIndex);
        input.seek(startIndex);
        alt = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(previousD.configs, outerContext);
        if (alt !== ATN.INVALID_ALT_NUMBER) {
          return alt;
        } else {
          throw e;
        }
      }
      if (D.requiresFullContext && this.predictionMode !== PredictionMode.SLL) {
        var conflictingAlts = null;
        if (D.predicates !== null) {
          if (this.debug) {
            console.log("DFA state has preds in DFA sim LL failover");
          }
          var conflictIndex = input.index;
          if (conflictIndex !== startIndex) {
            input.seek(startIndex);
          }
          conflictingAlts = this.evalSemanticContext(D.predicates, outerContext, true);
          if (conflictingAlts.length === 1) {
            if (this.debug) {
              console.log("Full LL avoided");
            }
            return conflictingAlts.minValue();
          }
          if (conflictIndex !== startIndex) {
            input.seek(conflictIndex);
          }
        }
        if (this.dfa_debug) {
          console.log("ctx sensitive state " + outerContext + " in " + D);
        }
        var fullCtx = true;
        var s0_closure = this.computeStartState(dfa.atnStartState, outerContext, fullCtx);
        this.reportAttemptingFullContext(dfa, conflictingAlts, D.configs, startIndex, input.index);
        alt = this.execATNWithFullContext(dfa, D, s0_closure, input, startIndex, outerContext);
        return alt;
      }
      if (D.isAcceptState) {
        if (D.predicates === null) {
          return D.prediction;
        }
        var stopIndex = input.index;
        input.seek(startIndex);
        var alts = this.evalSemanticContext(D.predicates, outerContext, true);
        if (alts.length === 0) {
          throw this.noViableAlt(input, outerContext, D.configs, startIndex);
        } else if (alts.length === 1) {
          return alts.minValue();
        } else {
          this.reportAmbiguity(dfa, D, startIndex, stopIndex, false, alts, D.configs);
          return alts.minValue();
        }
      }
      previousD = D;
      if (t !== Token.EOF) {
        input.consume();
        t = input.LA(1);
      }
    }
  };
  ParserATNSimulator.prototype.getExistingTargetState = function(previousD, t) {
    var edges = previousD.edges;
    if (edges === null) {
      return null;
    } else {
      return edges[t + 1] || null;
    }
  };
  ParserATNSimulator.prototype.computeTargetState = function(dfa, previousD, t) {
    var reach = this.computeReachSet(previousD.configs, t, false);
    if (reach === null) {
      this.addDFAEdge(dfa, previousD, t, ATNSimulator.ERROR);
      return ATNSimulator.ERROR;
    }
    var D = new DFAState(null, reach);
    var predictedAlt = this.getUniqueAlt(reach);
    if (this.debug) {
      var altSubSets = PredictionMode.getConflictingAltSubsets(reach);
      console.log("SLL altSubSets=" + Utils.arrayToString(altSubSets) + ", previous=" + previousD.configs + ", configs=" + reach + ", predict=" + predictedAlt + ", allSubsetsConflict=" + PredictionMode.allSubsetsConflict(altSubSets) + ", conflictingAlts=" + this.getConflictingAlts(reach));
    }
    if (predictedAlt !== ATN.INVALID_ALT_NUMBER) {
      D.isAcceptState = true;
      D.configs.uniqueAlt = predictedAlt;
      D.prediction = predictedAlt;
    } else if (PredictionMode.hasSLLConflictTerminatingPrediction(this.predictionMode, reach)) {
      D.configs.conflictingAlts = this.getConflictingAlts(reach);
      D.requiresFullContext = true;
      D.isAcceptState = true;
      D.prediction = D.configs.conflictingAlts.minValue();
    }
    if (D.isAcceptState && D.configs.hasSemanticContext) {
      this.predicateDFAState(D, this.atn.getDecisionState(dfa.decision));
      if (D.predicates !== null) {
        D.prediction = ATN.INVALID_ALT_NUMBER;
      }
    }
    D = this.addDFAEdge(dfa, previousD, t, D);
    return D;
  };
  ParserATNSimulator.prototype.predicateDFAState = function(dfaState, decisionState) {
    var nalts = decisionState.transitions.length;
    var altsToCollectPredsFrom = this.getConflictingAltsOrUniqueAlt(dfaState.configs);
    var altToPred = this.getPredsForAmbigAlts(altsToCollectPredsFrom, dfaState.configs, nalts);
    if (altToPred !== null) {
      dfaState.predicates = this.getPredicatePredictions(altsToCollectPredsFrom, altToPred);
      dfaState.prediction = ATN.INVALID_ALT_NUMBER;
    } else {
      dfaState.prediction = altsToCollectPredsFrom.minValue();
    }
  };
  ParserATNSimulator.prototype.execATNWithFullContext = function(dfa, D, s0, input, startIndex, outerContext) {
    if (this.debug || this.debug_list_atn_decisions) {
      console.log("execATNWithFullContext " + s0);
    }
    var fullCtx = true;
    var foundExactAmbig = false;
    var reach = null;
    var previous = s0;
    input.seek(startIndex);
    var t = input.LA(1);
    var predictedAlt = -1;
    while (true) {
      reach = this.computeReachSet(previous, t, fullCtx);
      if (reach === null) {
        var e = this.noViableAlt(input, outerContext, previous, startIndex);
        input.seek(startIndex);
        var alt = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(previous, outerContext);
        if (alt !== ATN.INVALID_ALT_NUMBER) {
          return alt;
        } else {
          throw e;
        }
      }
      var altSubSets = PredictionMode.getConflictingAltSubsets(reach);
      if (this.debug) {
        console.log("LL altSubSets=" + altSubSets + ", predict=" + PredictionMode.getUniqueAlt(altSubSets) + ", resolvesToJustOneViableAlt=" + PredictionMode.resolvesToJustOneViableAlt(altSubSets));
      }
      reach.uniqueAlt = this.getUniqueAlt(reach);
      if (reach.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
        predictedAlt = reach.uniqueAlt;
        break;
      } else if (this.predictionMode !== PredictionMode.LL_EXACT_AMBIG_DETECTION) {
        predictedAlt = PredictionMode.resolvesToJustOneViableAlt(altSubSets);
        if (predictedAlt !== ATN.INVALID_ALT_NUMBER) {
          break;
        }
      } else {
        if (PredictionMode.allSubsetsConflict(altSubSets) && PredictionMode.allSubsetsEqual(altSubSets)) {
          foundExactAmbig = true;
          predictedAlt = PredictionMode.getSingleViableAlt(altSubSets);
          break;
        }
      }
      previous = reach;
      if (t !== Token.EOF) {
        input.consume();
        t = input.LA(1);
      }
    }
    if (reach.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
      this.reportContextSensitivity(dfa, predictedAlt, reach, startIndex, input.index);
      return predictedAlt;
    }
    this.reportAmbiguity(dfa, D, startIndex, input.index, foundExactAmbig, null, reach);
    return predictedAlt;
  };
  ParserATNSimulator.prototype.computeReachSet = function(closure, t, fullCtx) {
    if (this.debug) {
      console.log("in computeReachSet, starting closure: " + closure);
    }
    if (this.mergeCache === null) {
      this.mergeCache = new DoubleDict();
    }
    var intermediate = new ATNConfigSet(fullCtx);
    var skippedStopStates = null;
    for (var i = 0; i < closure.items.length; i++) {
      var c = closure.items[i];
      if (this.debug_add) {
        console.log("testing " + this.getTokenName(t) + " at " + c);
      }
      if (c.state instanceof RuleStopState) {
        if (fullCtx || t === Token.EOF) {
          if (skippedStopStates === null) {
            skippedStopStates = [];
          }
          skippedStopStates.push(c);
          if (this.debug_add) {
            console.log("added " + c + " to skippedStopStates");
          }
        }
        continue;
      }
      for (var j = 0; j < c.state.transitions.length; j++) {
        var trans = c.state.transitions[j];
        var target = this.getReachableTarget(trans, t);
        if (target !== null) {
          var cfg = new ATNConfig({state: target}, c);
          intermediate.add(cfg, this.mergeCache);
          if (this.debug_add) {
            console.log("added " + cfg + " to intermediate");
          }
        }
      }
    }
    var reach = null;
    if (skippedStopStates === null && t !== Token.EOF) {
      if (intermediate.items.length === 1) {
        reach = intermediate;
      } else if (this.getUniqueAlt(intermediate) !== ATN.INVALID_ALT_NUMBER) {
        reach = intermediate;
      }
    }
    if (reach === null) {
      reach = new ATNConfigSet(fullCtx);
      var closureBusy = new Set();
      var treatEofAsEpsilon = t === Token.EOF;
      for (var k = 0; k < intermediate.items.length; k++) {
        this.closure(intermediate.items[k], reach, closureBusy, false, fullCtx, treatEofAsEpsilon);
      }
    }
    if (t === Token.EOF) {
      reach = this.removeAllConfigsNotInRuleStopState(reach, reach === intermediate);
    }
    if (skippedStopStates !== null && (!fullCtx || !PredictionMode.hasConfigInRuleStopState(reach))) {
      for (var l = 0; l < skippedStopStates.length; l++) {
        reach.add(skippedStopStates[l], this.mergeCache);
      }
    }
    if (reach.items.length === 0) {
      return null;
    } else {
      return reach;
    }
  };
  ParserATNSimulator.prototype.removeAllConfigsNotInRuleStopState = function(configs, lookToEndOfRule) {
    if (PredictionMode.allConfigsInRuleStopStates(configs)) {
      return configs;
    }
    var result = new ATNConfigSet(configs.fullCtx);
    for (var i = 0; i < configs.items.length; i++) {
      var config = configs.items[i];
      if (config.state instanceof RuleStopState) {
        result.add(config, this.mergeCache);
        continue;
      }
      if (lookToEndOfRule && config.state.epsilonOnlyTransitions) {
        var nextTokens = this.atn.nextTokens(config.state);
        if (nextTokens.contains(Token.EPSILON)) {
          var endOfRuleState = this.atn.ruleToStopState[config.state.ruleIndex];
          result.add(new ATNConfig({state: endOfRuleState}, config), this.mergeCache);
        }
      }
    }
    return result;
  };
  ParserATNSimulator.prototype.computeStartState = function(p, ctx, fullCtx) {
    var initialContext = predictionContextFromRuleContext(this.atn, ctx);
    var configs = new ATNConfigSet(fullCtx);
    for (var i = 0; i < p.transitions.length; i++) {
      var target = p.transitions[i].target;
      var c = new ATNConfig({state: target, alt: i + 1, context: initialContext}, null);
      var closureBusy = new Set();
      this.closure(c, configs, closureBusy, true, fullCtx, false);
    }
    return configs;
  };
  ParserATNSimulator.prototype.applyPrecedenceFilter = function(configs) {
    var config;
    var statesFromAlt1 = [];
    var configSet = new ATNConfigSet(configs.fullCtx);
    for (var i = 0; i < configs.items.length; i++) {
      config = configs.items[i];
      if (config.alt !== 1) {
        continue;
      }
      var updatedContext = config.semanticContext.evalPrecedence(this.parser, this._outerContext);
      if (updatedContext === null) {
        continue;
      }
      statesFromAlt1[config.state.stateNumber] = config.context;
      if (updatedContext !== config.semanticContext) {
        configSet.add(new ATNConfig({semanticContext: updatedContext}, config), this.mergeCache);
      } else {
        configSet.add(config, this.mergeCache);
      }
    }
    for (i = 0; i < configs.items.length; i++) {
      config = configs.items[i];
      if (config.alt === 1) {
        continue;
      }
      if (!config.precedenceFilterSuppressed) {
        var context = statesFromAlt1[config.state.stateNumber] || null;
        if (context !== null && context.equals(config.context)) {
          continue;
        }
      }
      configSet.add(config, this.mergeCache);
    }
    return configSet;
  };
  ParserATNSimulator.prototype.getReachableTarget = function(trans, ttype) {
    if (trans.matches(ttype, 0, this.atn.maxTokenType)) {
      return trans.target;
    } else {
      return null;
    }
  };
  ParserATNSimulator.prototype.getPredsForAmbigAlts = function(ambigAlts, configs, nalts) {
    var altToPred = [];
    for (var i = 0; i < configs.items.length; i++) {
      var c = configs.items[i];
      if (ambigAlts.contains(c.alt)) {
        altToPred[c.alt] = SemanticContext.orContext(altToPred[c.alt] || null, c.semanticContext);
      }
    }
    var nPredAlts = 0;
    for (i = 1; i < nalts + 1; i++) {
      var pred = altToPred[i] || null;
      if (pred === null) {
        altToPred[i] = SemanticContext.NONE;
      } else if (pred !== SemanticContext.NONE) {
        nPredAlts += 1;
      }
    }
    if (nPredAlts === 0) {
      altToPred = null;
    }
    if (this.debug) {
      console.log("getPredsForAmbigAlts result " + Utils.arrayToString(altToPred));
    }
    return altToPred;
  };
  ParserATNSimulator.prototype.getPredicatePredictions = function(ambigAlts, altToPred) {
    var pairs = [];
    var containsPredicate = false;
    for (var i = 1; i < altToPred.length; i++) {
      var pred = altToPred[i];
      if (ambigAlts !== null && ambigAlts.contains(i)) {
        pairs.push(new PredPrediction(pred, i));
      }
      if (pred !== SemanticContext.NONE) {
        containsPredicate = true;
      }
    }
    if (!containsPredicate) {
      return null;
    }
    return pairs;
  };
  ParserATNSimulator.prototype.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule = function(configs, outerContext) {
    var cfgs = this.splitAccordingToSemanticValidity(configs, outerContext);
    var semValidConfigs = cfgs[0];
    var semInvalidConfigs = cfgs[1];
    var alt = this.getAltThatFinishedDecisionEntryRule(semValidConfigs);
    if (alt !== ATN.INVALID_ALT_NUMBER) {
      return alt;
    }
    if (semInvalidConfigs.items.length > 0) {
      alt = this.getAltThatFinishedDecisionEntryRule(semInvalidConfigs);
      if (alt !== ATN.INVALID_ALT_NUMBER) {
        return alt;
      }
    }
    return ATN.INVALID_ALT_NUMBER;
  };
  ParserATNSimulator.prototype.getAltThatFinishedDecisionEntryRule = function(configs) {
    var alts = [];
    for (var i = 0; i < configs.items.length; i++) {
      var c = configs.items[i];
      if (c.reachesIntoOuterContext > 0 || c.state instanceof RuleStopState && c.context.hasEmptyPath()) {
        if (alts.indexOf(c.alt) < 0) {
          alts.push(c.alt);
        }
      }
    }
    if (alts.length === 0) {
      return ATN.INVALID_ALT_NUMBER;
    } else {
      return Math.min.apply(null, alts);
    }
  };
  ParserATNSimulator.prototype.splitAccordingToSemanticValidity = function(configs, outerContext) {
    var succeeded = new ATNConfigSet(configs.fullCtx);
    var failed = new ATNConfigSet(configs.fullCtx);
    for (var i = 0; i < configs.items.length; i++) {
      var c = configs.items[i];
      if (c.semanticContext !== SemanticContext.NONE) {
        var predicateEvaluationResult = c.semanticContext.evaluate(this.parser, outerContext);
        if (predicateEvaluationResult) {
          succeeded.add(c);
        } else {
          failed.add(c);
        }
      } else {
        succeeded.add(c);
      }
    }
    return [succeeded, failed];
  };
  ParserATNSimulator.prototype.evalSemanticContext = function(predPredictions, outerContext, complete) {
    var predictions = new BitSet();
    for (var i = 0; i < predPredictions.length; i++) {
      var pair = predPredictions[i];
      if (pair.pred === SemanticContext.NONE) {
        predictions.add(pair.alt);
        if (!complete) {
          break;
        }
        continue;
      }
      var predicateEvaluationResult = pair.pred.evaluate(this.parser, outerContext);
      if (this.debug || this.dfa_debug) {
        console.log("eval pred " + pair + "=" + predicateEvaluationResult);
      }
      if (predicateEvaluationResult) {
        if (this.debug || this.dfa_debug) {
          console.log("PREDICT " + pair.alt);
        }
        predictions.add(pair.alt);
        if (!complete) {
          break;
        }
      }
    }
    return predictions;
  };
  ParserATNSimulator.prototype.closure = function(config, configs, closureBusy, collectPredicates, fullCtx, treatEofAsEpsilon) {
    var initialDepth = 0;
    this.closureCheckingStopState(config, configs, closureBusy, collectPredicates, fullCtx, initialDepth, treatEofAsEpsilon);
  };
  ParserATNSimulator.prototype.closureCheckingStopState = function(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon) {
    if (this.debug || this.debug_closure) {
      console.log("closure(" + config.toString(this.parser, true) + ")");
      if (config.reachesIntoOuterContext > 50) {
        throw "problem";
      }
    }
    if (config.state instanceof RuleStopState) {
      if (!config.context.isEmpty()) {
        for (var i = 0; i < config.context.length; i++) {
          if (config.context.getReturnState(i) === PredictionContext.EMPTY_RETURN_STATE) {
            if (fullCtx) {
              configs.add(new ATNConfig({state: config.state, context: PredictionContext.EMPTY}, config), this.mergeCache);
              continue;
            } else {
              if (this.debug) {
                console.log("FALLING off rule " + this.getRuleName(config.state.ruleIndex));
              }
              this.closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon);
            }
            continue;
          }
          var returnState = this.atn.states[config.context.getReturnState(i)];
          var newContext = config.context.getParent(i);
          var parms = {state: returnState, alt: config.alt, context: newContext, semanticContext: config.semanticContext};
          var c = new ATNConfig(parms, null);
          c.reachesIntoOuterContext = config.reachesIntoOuterContext;
          this.closureCheckingStopState(c, configs, closureBusy, collectPredicates, fullCtx, depth - 1, treatEofAsEpsilon);
        }
        return;
      } else if (fullCtx) {
        configs.add(config, this.mergeCache);
        return;
      } else {
        if (this.debug) {
          console.log("FALLING off rule " + this.getRuleName(config.state.ruleIndex));
        }
      }
    }
    this.closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon);
  };
  ParserATNSimulator.prototype.closure_ = function(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon) {
    var p = config.state;
    if (!p.epsilonOnlyTransitions) {
      configs.add(config, this.mergeCache);
    }
    for (var i = 0; i < p.transitions.length; i++) {
      if (i == 0 && this.canDropLoopEntryEdgeInLeftRecursiveRule(config))
        continue;
      var t = p.transitions[i];
      var continueCollecting = collectPredicates && !(t instanceof ActionTransition);
      var c = this.getEpsilonTarget(config, t, continueCollecting, depth === 0, fullCtx, treatEofAsEpsilon);
      if (c !== null) {
        var newDepth = depth;
        if (config.state instanceof RuleStopState) {
          if (this._dfa !== null && this._dfa.precedenceDfa) {
            if (t.outermostPrecedenceReturn === this._dfa.atnStartState.ruleIndex) {
              c.precedenceFilterSuppressed = true;
            }
          }
          c.reachesIntoOuterContext += 1;
          if (closureBusy.add(c) !== c) {
            continue;
          }
          configs.dipsIntoOuterContext = true;
          newDepth -= 1;
          if (this.debug) {
            console.log("dips into outer ctx: " + c);
          }
        } else {
          if (!t.isEpsilon && closureBusy.add(c) !== c) {
            continue;
          }
          if (t instanceof RuleTransition) {
            if (newDepth >= 0) {
              newDepth += 1;
            }
          }
        }
        this.closureCheckingStopState(c, configs, closureBusy, continueCollecting, fullCtx, newDepth, treatEofAsEpsilon);
      }
    }
  };
  ParserATNSimulator.prototype.canDropLoopEntryEdgeInLeftRecursiveRule = function(config) {
    var p = config.state;
    if (p.stateType != ATNState.STAR_LOOP_ENTRY)
      return false;
    if (p.stateType != ATNState.STAR_LOOP_ENTRY || !p.isPrecedenceDecision || config.context.isEmpty() || config.context.hasEmptyPath())
      return false;
    var numCtxs = config.context.length;
    for (var i = 0; i < numCtxs; i++) {
      var returnState = this.atn.states[config.context.getReturnState(i)];
      if (returnState.ruleIndex != p.ruleIndex)
        return false;
    }
    var decisionStartState = p.transitions[0].target;
    var blockEndStateNum = decisionStartState.endState.stateNumber;
    var blockEndState = this.atn.states[blockEndStateNum];
    for (var i = 0; i < numCtxs; i++) {
      var returnStateNumber = config.context.getReturnState(i);
      var returnState = this.atn.states[returnStateNumber];
      if (returnState.transitions.length != 1 || !returnState.transitions[0].isEpsilon)
        return false;
      var returnStateTarget = returnState.transitions[0].target;
      if (returnState.stateType == ATNState.BLOCK_END && returnStateTarget == p)
        continue;
      if (returnState == blockEndState)
        continue;
      if (returnStateTarget == blockEndState)
        continue;
      if (returnStateTarget.stateType == ATNState.BLOCK_END && returnStateTarget.transitions.length == 1 && returnStateTarget.transitions[0].isEpsilon && returnStateTarget.transitions[0].target == p)
        continue;
      return false;
    }
    return true;
  };
  ParserATNSimulator.prototype.getRuleName = function(index) {
    if (this.parser !== null && index >= 0) {
      return this.parser.ruleNames[index];
    } else {
      return "<rule " + index + ">";
    }
  };
  ParserATNSimulator.prototype.getEpsilonTarget = function(config, t, collectPredicates, inContext, fullCtx, treatEofAsEpsilon) {
    switch (t.serializationType) {
      case Transition.RULE:
        return this.ruleTransition(config, t);
      case Transition.PRECEDENCE:
        return this.precedenceTransition(config, t, collectPredicates, inContext, fullCtx);
      case Transition.PREDICATE:
        return this.predTransition(config, t, collectPredicates, inContext, fullCtx);
      case Transition.ACTION:
        return this.actionTransition(config, t);
      case Transition.EPSILON:
        return new ATNConfig({state: t.target}, config);
      case Transition.ATOM:
      case Transition.RANGE:
      case Transition.SET:
        if (treatEofAsEpsilon) {
          if (t.matches(Token.EOF, 0, 1)) {
            return new ATNConfig({state: t.target}, config);
          }
        }
        return null;
      default:
        return null;
    }
  };
  ParserATNSimulator.prototype.actionTransition = function(config, t) {
    if (this.debug) {
      var index = t.actionIndex == -1 ? 65535 : t.actionIndex;
      console.log("ACTION edge " + t.ruleIndex + ":" + index);
    }
    return new ATNConfig({state: t.target}, config);
  };
  ParserATNSimulator.prototype.precedenceTransition = function(config, pt, collectPredicates, inContext, fullCtx) {
    if (this.debug) {
      console.log("PRED (collectPredicates=" + collectPredicates + ") " + pt.precedence + ">=_p, ctx dependent=true");
      if (this.parser !== null) {
        console.log("context surrounding pred is " + Utils.arrayToString(this.parser.getRuleInvocationStack()));
      }
    }
    var c = null;
    if (collectPredicates && inContext) {
      if (fullCtx) {
        var currentPosition = this._input.index;
        this._input.seek(this._startIndex);
        var predSucceeds = pt.getPredicate().evaluate(this.parser, this._outerContext);
        this._input.seek(currentPosition);
        if (predSucceeds) {
          c = new ATNConfig({state: pt.target}, config);
        }
      } else {
        var newSemCtx = SemanticContext.andContext(config.semanticContext, pt.getPredicate());
        c = new ATNConfig({state: pt.target, semanticContext: newSemCtx}, config);
      }
    } else {
      c = new ATNConfig({state: pt.target}, config);
    }
    if (this.debug) {
      console.log("config from pred transition=" + c);
    }
    return c;
  };
  ParserATNSimulator.prototype.predTransition = function(config, pt, collectPredicates, inContext, fullCtx) {
    if (this.debug) {
      console.log("PRED (collectPredicates=" + collectPredicates + ") " + pt.ruleIndex + ":" + pt.predIndex + ", ctx dependent=" + pt.isCtxDependent);
      if (this.parser !== null) {
        console.log("context surrounding pred is " + Utils.arrayToString(this.parser.getRuleInvocationStack()));
      }
    }
    var c = null;
    if (collectPredicates && (pt.isCtxDependent && inContext || !pt.isCtxDependent)) {
      if (fullCtx) {
        var currentPosition = this._input.index;
        this._input.seek(this._startIndex);
        var predSucceeds = pt.getPredicate().evaluate(this.parser, this._outerContext);
        this._input.seek(currentPosition);
        if (predSucceeds) {
          c = new ATNConfig({state: pt.target}, config);
        }
      } else {
        var newSemCtx = SemanticContext.andContext(config.semanticContext, pt.getPredicate());
        c = new ATNConfig({state: pt.target, semanticContext: newSemCtx}, config);
      }
    } else {
      c = new ATNConfig({state: pt.target}, config);
    }
    if (this.debug) {
      console.log("config from pred transition=" + c);
    }
    return c;
  };
  ParserATNSimulator.prototype.ruleTransition = function(config, t) {
    if (this.debug) {
      console.log("CALL rule " + this.getRuleName(t.target.ruleIndex) + ", ctx=" + config.context);
    }
    var returnState = t.followState;
    var newContext = SingletonPredictionContext.create(config.context, returnState.stateNumber);
    return new ATNConfig({state: t.target, context: newContext}, config);
  };
  ParserATNSimulator.prototype.getConflictingAlts = function(configs) {
    var altsets = PredictionMode.getConflictingAltSubsets(configs);
    return PredictionMode.getAlts(altsets);
  };
  ParserATNSimulator.prototype.getConflictingAltsOrUniqueAlt = function(configs) {
    var conflictingAlts = null;
    if (configs.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
      conflictingAlts = new BitSet();
      conflictingAlts.add(configs.uniqueAlt);
    } else {
      conflictingAlts = configs.conflictingAlts;
    }
    return conflictingAlts;
  };
  ParserATNSimulator.prototype.getTokenName = function(t) {
    if (t === Token.EOF) {
      return "EOF";
    }
    if (this.parser !== null && this.parser.literalNames !== null) {
      if (t >= this.parser.literalNames.length && t >= this.parser.symbolicNames.length) {
        console.log("" + t + " ttype out of range: " + this.parser.literalNames);
        console.log("" + this.parser.getInputStream().getTokens());
      } else {
        var name = this.parser.literalNames[t] || this.parser.symbolicNames[t];
        return name + "<" + t + ">";
      }
    }
    return "" + t;
  };
  ParserATNSimulator.prototype.getLookaheadName = function(input) {
    return this.getTokenName(input.LA(1));
  };
  ParserATNSimulator.prototype.dumpDeadEndConfigs = function(nvae) {
    console.log("dead end configs: ");
    var decs = nvae.getDeadEndConfigs();
    for (var i = 0; i < decs.length; i++) {
      var c = decs[i];
      var trans = "no edges";
      if (c.state.transitions.length > 0) {
        var t = c.state.transitions[0];
        if (t instanceof AtomTransition) {
          trans = "Atom " + this.getTokenName(t.label);
        } else if (t instanceof SetTransition) {
          var neg = t instanceof NotSetTransition;
          trans = (neg ? "~" : "") + "Set " + t.set;
        }
      }
      console.error(c.toString(this.parser, true) + ":" + trans);
    }
  };
  ParserATNSimulator.prototype.noViableAlt = function(input, outerContext, configs, startIndex) {
    return new NoViableAltException(this.parser, input, input.get(startIndex), input.LT(1), configs, outerContext);
  };
  ParserATNSimulator.prototype.getUniqueAlt = function(configs) {
    var alt = ATN.INVALID_ALT_NUMBER;
    for (var i = 0; i < configs.items.length; i++) {
      var c = configs.items[i];
      if (alt === ATN.INVALID_ALT_NUMBER) {
        alt = c.alt;
      } else if (c.alt !== alt) {
        return ATN.INVALID_ALT_NUMBER;
      }
    }
    return alt;
  };
  ParserATNSimulator.prototype.addDFAEdge = function(dfa, from_, t, to) {
    if (this.debug) {
      console.log("EDGE " + from_ + " -> " + to + " upon " + this.getTokenName(t));
    }
    if (to === null) {
      return null;
    }
    to = this.addDFAState(dfa, to);
    if (from_ === null || t < -1 || t > this.atn.maxTokenType) {
      return to;
    }
    if (from_.edges === null) {
      from_.edges = [];
    }
    from_.edges[t + 1] = to;
    if (this.debug) {
      var literalNames = this.parser === null ? null : this.parser.literalNames;
      var symbolicNames = this.parser === null ? null : this.parser.symbolicNames;
      console.log("DFA=\n" + dfa.toString(literalNames, symbolicNames));
    }
    return to;
  };
  ParserATNSimulator.prototype.addDFAState = function(dfa, D) {
    if (D == ATNSimulator.ERROR) {
      return D;
    }
    var existing = dfa.states.get(D);
    if (existing !== null) {
      return existing;
    }
    D.stateNumber = dfa.states.length;
    if (!D.configs.readOnly) {
      D.configs.optimizeConfigs(this);
      D.configs.setReadonly(true);
    }
    dfa.states.add(D);
    if (this.debug) {
      console.log("adding new DFA state: " + D);
    }
    return D;
  };
  ParserATNSimulator.prototype.reportAttemptingFullContext = function(dfa, conflictingAlts, configs, startIndex, stopIndex) {
    if (this.debug || this.retry_debug) {
      var interval = new Interval(startIndex, stopIndex + 1);
      console.log("reportAttemptingFullContext decision=" + dfa.decision + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
    }
    if (this.parser !== null) {
      this.parser.getErrorListenerDispatch().reportAttemptingFullContext(this.parser, dfa, startIndex, stopIndex, conflictingAlts, configs);
    }
  };
  ParserATNSimulator.prototype.reportContextSensitivity = function(dfa, prediction, configs, startIndex, stopIndex) {
    if (this.debug || this.retry_debug) {
      var interval = new Interval(startIndex, stopIndex + 1);
      console.log("reportContextSensitivity decision=" + dfa.decision + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
    }
    if (this.parser !== null) {
      this.parser.getErrorListenerDispatch().reportContextSensitivity(this.parser, dfa, startIndex, stopIndex, prediction, configs);
    }
  };
  ParserATNSimulator.prototype.reportAmbiguity = function(dfa, D, startIndex, stopIndex, exact, ambigAlts, configs) {
    if (this.debug || this.retry_debug) {
      var interval = new Interval(startIndex, stopIndex + 1);
      console.log("reportAmbiguity " + ambigAlts + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
    }
    if (this.parser !== null) {
      this.parser.getErrorListenerDispatch().reportAmbiguity(this.parser, dfa, startIndex, stopIndex, exact, ambigAlts, configs);
    }
  };
  exports.ParserATNSimulator = ParserATNSimulator;
});

// node_modules/antlr4/atn/index.js
var require_atn = __commonJS((exports) => {
  exports.ATN = require_ATN().ATN;
  exports.ATNDeserializer = require_ATNDeserializer().ATNDeserializer;
  exports.LexerATNSimulator = require_LexerATNSimulator().LexerATNSimulator;
  exports.ParserATNSimulator = require_ParserATNSimulator().ParserATNSimulator;
  exports.PredictionMode = require_PredictionMode().PredictionMode;
});

// node_modules/antlr4/polyfills/codepointat.js
var require_codepointat = __commonJS(() => {
  /*! https://mths.be/codepointat v0.2.0 by @mathias */
  if (!String.prototype.codePointAt) {
    (function() {
      "use strict";
      var defineProperty = function() {
        try {
          var object = {};
          var $defineProperty = Object.defineProperty;
          var result = $defineProperty(object, object, object) && $defineProperty;
        } catch (error) {
        }
        return result;
      }();
      var codePointAt = function(position) {
        if (this == null) {
          throw TypeError();
        }
        var string = String(this);
        var size = string.length;
        var index = position ? Number(position) : 0;
        if (index != index) {
          index = 0;
        }
        if (index < 0 || index >= size) {
          return void 0;
        }
        var first = string.charCodeAt(index);
        var second;
        if (first >= 55296 && first <= 56319 && size > index + 1) {
          second = string.charCodeAt(index + 1);
          if (second >= 56320 && second <= 57343) {
            return (first - 55296) * 1024 + second - 56320 + 65536;
          }
        }
        return first;
      };
      if (defineProperty) {
        defineProperty(String.prototype, "codePointAt", {
          value: codePointAt,
          configurable: true,
          writable: true
        });
      } else {
        String.prototype.codePointAt = codePointAt;
      }
    })();
  }
});

// node_modules/antlr4/dfa/DFASerializer.js
var require_DFASerializer = __commonJS((exports) => {
  function DFASerializer(dfa, literalNames, symbolicNames) {
    this.dfa = dfa;
    this.literalNames = literalNames || [];
    this.symbolicNames = symbolicNames || [];
    return this;
  }
  DFASerializer.prototype.toString = function() {
    if (this.dfa.s0 === null) {
      return null;
    }
    var buf = "";
    var states = this.dfa.sortedStates();
    for (var i = 0; i < states.length; i++) {
      var s = states[i];
      if (s.edges !== null) {
        var n = s.edges.length;
        for (var j = 0; j < n; j++) {
          var t = s.edges[j] || null;
          if (t !== null && t.stateNumber !== 2147483647) {
            buf = buf.concat(this.getStateString(s));
            buf = buf.concat("-");
            buf = buf.concat(this.getEdgeLabel(j));
            buf = buf.concat("->");
            buf = buf.concat(this.getStateString(t));
            buf = buf.concat("\n");
          }
        }
      }
    }
    return buf.length === 0 ? null : buf;
  };
  DFASerializer.prototype.getEdgeLabel = function(i) {
    if (i === 0) {
      return "EOF";
    } else if (this.literalNames !== null || this.symbolicNames !== null) {
      return this.literalNames[i - 1] || this.symbolicNames[i - 1];
    } else {
      return String.fromCharCode(i - 1);
    }
  };
  DFASerializer.prototype.getStateString = function(s) {
    var baseStateStr = (s.isAcceptState ? ":" : "") + "s" + s.stateNumber + (s.requiresFullContext ? "^" : "");
    if (s.isAcceptState) {
      if (s.predicates !== null) {
        return baseStateStr + "=>" + s.predicates.toString();
      } else {
        return baseStateStr + "=>" + s.prediction.toString();
      }
    } else {
      return baseStateStr;
    }
  };
  function LexerDFASerializer(dfa) {
    DFASerializer.call(this, dfa, null);
    return this;
  }
  LexerDFASerializer.prototype = Object.create(DFASerializer.prototype);
  LexerDFASerializer.prototype.constructor = LexerDFASerializer;
  LexerDFASerializer.prototype.getEdgeLabel = function(i) {
    return "'" + String.fromCharCode(i) + "'";
  };
  exports.DFASerializer = DFASerializer;
  exports.LexerDFASerializer = LexerDFASerializer;
});

// node_modules/antlr4/dfa/DFA.js
var require_DFA = __commonJS((exports) => {
  var Set = require_Utils().Set;
  var DFAState = require_DFAState().DFAState;
  var StarLoopEntryState = require_ATNState().StarLoopEntryState;
  var ATNConfigSet = require_ATNConfigSet().ATNConfigSet;
  var DFASerializer = require_DFASerializer().DFASerializer;
  var LexerDFASerializer = require_DFASerializer().LexerDFASerializer;
  function DFA(atnStartState, decision) {
    if (decision === void 0) {
      decision = 0;
    }
    this.atnStartState = atnStartState;
    this.decision = decision;
    this._states = new Set();
    this.s0 = null;
    this.precedenceDfa = false;
    if (atnStartState instanceof StarLoopEntryState) {
      if (atnStartState.isPrecedenceDecision) {
        this.precedenceDfa = true;
        var precedenceState = new DFAState(null, new ATNConfigSet());
        precedenceState.edges = [];
        precedenceState.isAcceptState = false;
        precedenceState.requiresFullContext = false;
        this.s0 = precedenceState;
      }
    }
    return this;
  }
  DFA.prototype.getPrecedenceStartState = function(precedence) {
    if (!this.precedenceDfa) {
      throw "Only precedence DFAs may contain a precedence start state.";
    }
    if (precedence < 0 || precedence >= this.s0.edges.length) {
      return null;
    }
    return this.s0.edges[precedence] || null;
  };
  DFA.prototype.setPrecedenceStartState = function(precedence, startState) {
    if (!this.precedenceDfa) {
      throw "Only precedence DFAs may contain a precedence start state.";
    }
    if (precedence < 0) {
      return;
    }
    this.s0.edges[precedence] = startState;
  };
  DFA.prototype.setPrecedenceDfa = function(precedenceDfa) {
    if (this.precedenceDfa !== precedenceDfa) {
      this._states = new DFAStatesSet();
      if (precedenceDfa) {
        var precedenceState = new DFAState(null, new ATNConfigSet());
        precedenceState.edges = [];
        precedenceState.isAcceptState = false;
        precedenceState.requiresFullContext = false;
        this.s0 = precedenceState;
      } else {
        this.s0 = null;
      }
      this.precedenceDfa = precedenceDfa;
    }
  };
  Object.defineProperty(DFA.prototype, "states", {
    get: function() {
      return this._states;
    }
  });
  DFA.prototype.sortedStates = function() {
    var list = this._states.values();
    return list.sort(function(a, b) {
      return a.stateNumber - b.stateNumber;
    });
  };
  DFA.prototype.toString = function(literalNames, symbolicNames) {
    literalNames = literalNames || null;
    symbolicNames = symbolicNames || null;
    if (this.s0 === null) {
      return "";
    }
    var serializer = new DFASerializer(this, literalNames, symbolicNames);
    return serializer.toString();
  };
  DFA.prototype.toLexerString = function() {
    if (this.s0 === null) {
      return "";
    }
    var serializer = new LexerDFASerializer(this);
    return serializer.toString();
  };
  exports.DFA = DFA;
});

// node_modules/antlr4/dfa/index.js
var require_dfa = __commonJS((exports) => {
  exports.DFA = require_DFA().DFA;
  exports.DFASerializer = require_DFASerializer().DFASerializer;
  exports.LexerDFASerializer = require_DFASerializer().LexerDFASerializer;
  exports.PredPrediction = require_DFAState().PredPrediction;
});

// node_modules/antlr4/polyfills/fromcodepoint.js
var require_fromcodepoint = __commonJS(() => {
  /*! https://mths.be/fromcodepoint v0.2.1 by @mathias */
  if (!String.fromCodePoint) {
    (function() {
      var defineProperty = function() {
        try {
          var object = {};
          var $defineProperty = Object.defineProperty;
          var result = $defineProperty(object, object, object) && $defineProperty;
        } catch (error) {
        }
        return result;
      }();
      var stringFromCharCode = String.fromCharCode;
      var floor = Math.floor;
      var fromCodePoint = function(_) {
        var MAX_SIZE = 16384;
        var codeUnits = [];
        var highSurrogate;
        var lowSurrogate;
        var index = -1;
        var length = arguments.length;
        if (!length) {
          return "";
        }
        var result = "";
        while (++index < length) {
          var codePoint = Number(arguments[index]);
          if (!isFinite(codePoint) || codePoint < 0 || codePoint > 1114111 || floor(codePoint) != codePoint) {
            throw RangeError("Invalid code point: " + codePoint);
          }
          if (codePoint <= 65535) {
            codeUnits.push(codePoint);
          } else {
            codePoint -= 65536;
            highSurrogate = (codePoint >> 10) + 55296;
            lowSurrogate = codePoint % 1024 + 56320;
            codeUnits.push(highSurrogate, lowSurrogate);
          }
          if (index + 1 == length || codeUnits.length > MAX_SIZE) {
            result += stringFromCharCode.apply(null, codeUnits);
            codeUnits.length = 0;
          }
        }
        return result;
      };
      if (defineProperty) {
        defineProperty(String, "fromCodePoint", {
          value: fromCodePoint,
          configurable: true,
          writable: true
        });
      } else {
        String.fromCodePoint = fromCodePoint;
      }
    })();
  }
});

// node_modules/antlr4/tree/index.js
var require_tree = __commonJS((exports) => {
  var Tree = require_Tree();
  exports.Trees = require_Trees().Trees;
  exports.RuleNode = Tree.RuleNode;
  exports.ParseTreeListener = Tree.ParseTreeListener;
  exports.ParseTreeVisitor = Tree.ParseTreeVisitor;
  exports.ParseTreeWalker = Tree.ParseTreeWalker;
});

// node_modules/antlr4/error/DiagnosticErrorListener.js
var require_DiagnosticErrorListener = __commonJS((exports) => {
  var BitSet = require_Utils().BitSet;
  var ErrorListener = require_ErrorListener().ErrorListener;
  var Interval = require_IntervalSet().Interval;
  function DiagnosticErrorListener(exactOnly) {
    ErrorListener.call(this);
    exactOnly = exactOnly || true;
    this.exactOnly = exactOnly;
    return this;
  }
  DiagnosticErrorListener.prototype = Object.create(ErrorListener.prototype);
  DiagnosticErrorListener.prototype.constructor = DiagnosticErrorListener;
  DiagnosticErrorListener.prototype.reportAmbiguity = function(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
    if (this.exactOnly && !exact) {
      return;
    }
    var msg = "reportAmbiguity d=" + this.getDecisionDescription(recognizer, dfa) + ": ambigAlts=" + this.getConflictingAlts(ambigAlts, configs) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
    recognizer.notifyErrorListeners(msg);
  };
  DiagnosticErrorListener.prototype.reportAttemptingFullContext = function(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
    var msg = "reportAttemptingFullContext d=" + this.getDecisionDescription(recognizer, dfa) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
    recognizer.notifyErrorListeners(msg);
  };
  DiagnosticErrorListener.prototype.reportContextSensitivity = function(recognizer, dfa, startIndex, stopIndex, prediction, configs) {
    var msg = "reportContextSensitivity d=" + this.getDecisionDescription(recognizer, dfa) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
    recognizer.notifyErrorListeners(msg);
  };
  DiagnosticErrorListener.prototype.getDecisionDescription = function(recognizer, dfa) {
    var decision = dfa.decision;
    var ruleIndex = dfa.atnStartState.ruleIndex;
    var ruleNames = recognizer.ruleNames;
    if (ruleIndex < 0 || ruleIndex >= ruleNames.length) {
      return "" + decision;
    }
    var ruleName = ruleNames[ruleIndex] || null;
    if (ruleName === null || ruleName.length === 0) {
      return "" + decision;
    }
    return "" + decision + " (" + ruleName + ")";
  };
  DiagnosticErrorListener.prototype.getConflictingAlts = function(reportedAlts, configs) {
    if (reportedAlts !== null) {
      return reportedAlts;
    }
    var result = new BitSet();
    for (var i = 0; i < configs.items.length; i++) {
      result.add(configs.items[i].alt);
    }
    return "{" + result.values().join(", ") + "}";
  };
  exports.DiagnosticErrorListener = DiagnosticErrorListener;
});

// node_modules/antlr4/error/ErrorStrategy.js
var require_ErrorStrategy = __commonJS((exports) => {
  var Token = require_Token().Token;
  var Errors = require_Errors();
  var NoViableAltException = Errors.NoViableAltException;
  var InputMismatchException = Errors.InputMismatchException;
  var FailedPredicateException = Errors.FailedPredicateException;
  var ParseCancellationException = Errors.ParseCancellationException;
  var ATNState = require_ATNState().ATNState;
  var Interval = require_IntervalSet().Interval;
  var IntervalSet = require_IntervalSet().IntervalSet;
  function ErrorStrategy() {
  }
  ErrorStrategy.prototype.reset = function(recognizer) {
  };
  ErrorStrategy.prototype.recoverInline = function(recognizer) {
  };
  ErrorStrategy.prototype.recover = function(recognizer, e) {
  };
  ErrorStrategy.prototype.sync = function(recognizer) {
  };
  ErrorStrategy.prototype.inErrorRecoveryMode = function(recognizer) {
  };
  ErrorStrategy.prototype.reportError = function(recognizer) {
  };
  function DefaultErrorStrategy() {
    ErrorStrategy.call(this);
    this.errorRecoveryMode = false;
    this.lastErrorIndex = -1;
    this.lastErrorStates = null;
    return this;
  }
  DefaultErrorStrategy.prototype = Object.create(ErrorStrategy.prototype);
  DefaultErrorStrategy.prototype.constructor = DefaultErrorStrategy;
  DefaultErrorStrategy.prototype.reset = function(recognizer) {
    this.endErrorCondition(recognizer);
  };
  DefaultErrorStrategy.prototype.beginErrorCondition = function(recognizer) {
    this.errorRecoveryMode = true;
  };
  DefaultErrorStrategy.prototype.inErrorRecoveryMode = function(recognizer) {
    return this.errorRecoveryMode;
  };
  DefaultErrorStrategy.prototype.endErrorCondition = function(recognizer) {
    this.errorRecoveryMode = false;
    this.lastErrorStates = null;
    this.lastErrorIndex = -1;
  };
  DefaultErrorStrategy.prototype.reportMatch = function(recognizer) {
    this.endErrorCondition(recognizer);
  };
  DefaultErrorStrategy.prototype.reportError = function(recognizer, e) {
    if (this.inErrorRecoveryMode(recognizer)) {
      return;
    }
    this.beginErrorCondition(recognizer);
    if (e instanceof NoViableAltException) {
      this.reportNoViableAlternative(recognizer, e);
    } else if (e instanceof InputMismatchException) {
      this.reportInputMismatch(recognizer, e);
    } else if (e instanceof FailedPredicateException) {
      this.reportFailedPredicate(recognizer, e);
    } else {
      console.log("unknown recognition error type: " + e.constructor.name);
      console.log(e.stack);
      recognizer.notifyErrorListeners(e.getOffendingToken(), e.getMessage(), e);
    }
  };
  DefaultErrorStrategy.prototype.recover = function(recognizer, e) {
    if (this.lastErrorIndex === recognizer.getInputStream().index && this.lastErrorStates !== null && this.lastErrorStates.indexOf(recognizer.state) >= 0) {
      recognizer.consume();
    }
    this.lastErrorIndex = recognizer._input.index;
    if (this.lastErrorStates === null) {
      this.lastErrorStates = [];
    }
    this.lastErrorStates.push(recognizer.state);
    var followSet = this.getErrorRecoverySet(recognizer);
    this.consumeUntil(recognizer, followSet);
  };
  DefaultErrorStrategy.prototype.sync = function(recognizer) {
    if (this.inErrorRecoveryMode(recognizer)) {
      return;
    }
    var s = recognizer._interp.atn.states[recognizer.state];
    var la = recognizer.getTokenStream().LA(1);
    var nextTokens = recognizer.atn.nextTokens(s);
    if (nextTokens.contains(Token.EPSILON) || nextTokens.contains(la)) {
      return;
    }
    switch (s.stateType) {
      case ATNState.BLOCK_START:
      case ATNState.STAR_BLOCK_START:
      case ATNState.PLUS_BLOCK_START:
      case ATNState.STAR_LOOP_ENTRY:
        if (this.singleTokenDeletion(recognizer) !== null) {
          return;
        } else {
          throw new InputMismatchException(recognizer);
        }
        break;
      case ATNState.PLUS_LOOP_BACK:
      case ATNState.STAR_LOOP_BACK:
        this.reportUnwantedToken(recognizer);
        var expecting = new IntervalSet();
        expecting.addSet(recognizer.getExpectedTokens());
        var whatFollowsLoopIterationOrRule = expecting.addSet(this.getErrorRecoverySet(recognizer));
        this.consumeUntil(recognizer, whatFollowsLoopIterationOrRule);
        break;
      default:
    }
  };
  DefaultErrorStrategy.prototype.reportNoViableAlternative = function(recognizer, e) {
    var tokens = recognizer.getTokenStream();
    var input;
    if (tokens !== null) {
      if (e.startToken.type === Token.EOF) {
        input = "<EOF>";
      } else {
        input = tokens.getText(new Interval(e.startToken.tokenIndex, e.offendingToken.tokenIndex));
      }
    } else {
      input = "<unknown input>";
    }
    var msg = "no viable alternative at input " + this.escapeWSAndQuote(input);
    recognizer.notifyErrorListeners(msg, e.offendingToken, e);
  };
  DefaultErrorStrategy.prototype.reportInputMismatch = function(recognizer, e) {
    var msg = "mismatched input " + this.getTokenErrorDisplay(e.offendingToken) + " expecting " + e.getExpectedTokens().toString(recognizer.literalNames, recognizer.symbolicNames);
    recognizer.notifyErrorListeners(msg, e.offendingToken, e);
  };
  DefaultErrorStrategy.prototype.reportFailedPredicate = function(recognizer, e) {
    var ruleName = recognizer.ruleNames[recognizer._ctx.ruleIndex];
    var msg = "rule " + ruleName + " " + e.message;
    recognizer.notifyErrorListeners(msg, e.offendingToken, e);
  };
  DefaultErrorStrategy.prototype.reportUnwantedToken = function(recognizer) {
    if (this.inErrorRecoveryMode(recognizer)) {
      return;
    }
    this.beginErrorCondition(recognizer);
    var t = recognizer.getCurrentToken();
    var tokenName = this.getTokenErrorDisplay(t);
    var expecting = this.getExpectedTokens(recognizer);
    var msg = "extraneous input " + tokenName + " expecting " + expecting.toString(recognizer.literalNames, recognizer.symbolicNames);
    recognizer.notifyErrorListeners(msg, t, null);
  };
  DefaultErrorStrategy.prototype.reportMissingToken = function(recognizer) {
    if (this.inErrorRecoveryMode(recognizer)) {
      return;
    }
    this.beginErrorCondition(recognizer);
    var t = recognizer.getCurrentToken();
    var expecting = this.getExpectedTokens(recognizer);
    var msg = "missing " + expecting.toString(recognizer.literalNames, recognizer.symbolicNames) + " at " + this.getTokenErrorDisplay(t);
    recognizer.notifyErrorListeners(msg, t, null);
  };
  DefaultErrorStrategy.prototype.recoverInline = function(recognizer) {
    var matchedSymbol = this.singleTokenDeletion(recognizer);
    if (matchedSymbol !== null) {
      recognizer.consume();
      return matchedSymbol;
    }
    if (this.singleTokenInsertion(recognizer)) {
      return this.getMissingSymbol(recognizer);
    }
    throw new InputMismatchException(recognizer);
  };
  DefaultErrorStrategy.prototype.singleTokenInsertion = function(recognizer) {
    var currentSymbolType = recognizer.getTokenStream().LA(1);
    var atn = recognizer._interp.atn;
    var currentState = atn.states[recognizer.state];
    var next = currentState.transitions[0].target;
    var expectingAtLL2 = atn.nextTokens(next, recognizer._ctx);
    if (expectingAtLL2.contains(currentSymbolType)) {
      this.reportMissingToken(recognizer);
      return true;
    } else {
      return false;
    }
  };
  DefaultErrorStrategy.prototype.singleTokenDeletion = function(recognizer) {
    var nextTokenType = recognizer.getTokenStream().LA(2);
    var expecting = this.getExpectedTokens(recognizer);
    if (expecting.contains(nextTokenType)) {
      this.reportUnwantedToken(recognizer);
      recognizer.consume();
      var matchedSymbol = recognizer.getCurrentToken();
      this.reportMatch(recognizer);
      return matchedSymbol;
    } else {
      return null;
    }
  };
  DefaultErrorStrategy.prototype.getMissingSymbol = function(recognizer) {
    var currentSymbol = recognizer.getCurrentToken();
    var expecting = this.getExpectedTokens(recognizer);
    var expectedTokenType = expecting.first();
    var tokenText;
    if (expectedTokenType === Token.EOF) {
      tokenText = "<missing EOF>";
    } else {
      tokenText = "<missing " + recognizer.literalNames[expectedTokenType] + ">";
    }
    var current = currentSymbol;
    var lookback = recognizer.getTokenStream().LT(-1);
    if (current.type === Token.EOF && lookback !== null) {
      current = lookback;
    }
    return recognizer.getTokenFactory().create(current.source, expectedTokenType, tokenText, Token.DEFAULT_CHANNEL, -1, -1, current.line, current.column);
  };
  DefaultErrorStrategy.prototype.getExpectedTokens = function(recognizer) {
    return recognizer.getExpectedTokens();
  };
  DefaultErrorStrategy.prototype.getTokenErrorDisplay = function(t) {
    if (t === null) {
      return "<no token>";
    }
    var s = t.text;
    if (s === null) {
      if (t.type === Token.EOF) {
        s = "<EOF>";
      } else {
        s = "<" + t.type + ">";
      }
    }
    return this.escapeWSAndQuote(s);
  };
  DefaultErrorStrategy.prototype.escapeWSAndQuote = function(s) {
    s = s.replace(/\n/g, "\\n");
    s = s.replace(/\r/g, "\\r");
    s = s.replace(/\t/g, "\\t");
    return "'" + s + "'";
  };
  DefaultErrorStrategy.prototype.getErrorRecoverySet = function(recognizer) {
    var atn = recognizer._interp.atn;
    var ctx = recognizer._ctx;
    var recoverSet = new IntervalSet();
    while (ctx !== null && ctx.invokingState >= 0) {
      var invokingState = atn.states[ctx.invokingState];
      var rt = invokingState.transitions[0];
      var follow = atn.nextTokens(rt.followState);
      recoverSet.addSet(follow);
      ctx = ctx.parentCtx;
    }
    recoverSet.removeOne(Token.EPSILON);
    return recoverSet;
  };
  DefaultErrorStrategy.prototype.consumeUntil = function(recognizer, set) {
    var ttype = recognizer.getTokenStream().LA(1);
    while (ttype !== Token.EOF && !set.contains(ttype)) {
      recognizer.consume();
      ttype = recognizer.getTokenStream().LA(1);
    }
  };
  function BailErrorStrategy() {
    DefaultErrorStrategy.call(this);
    return this;
  }
  BailErrorStrategy.prototype = Object.create(DefaultErrorStrategy.prototype);
  BailErrorStrategy.prototype.constructor = BailErrorStrategy;
  BailErrorStrategy.prototype.recover = function(recognizer, e) {
    var context = recognizer._ctx;
    while (context !== null) {
      context.exception = e;
      context = context.parentCtx;
    }
    throw new ParseCancellationException(e);
  };
  BailErrorStrategy.prototype.recoverInline = function(recognizer) {
    this.recover(recognizer, new InputMismatchException(recognizer));
  };
  BailErrorStrategy.prototype.sync = function(recognizer) {
  };
  exports.BailErrorStrategy = BailErrorStrategy;
  exports.DefaultErrorStrategy = DefaultErrorStrategy;
});

// node_modules/antlr4/error/index.js
var require_error = __commonJS((exports) => {
  exports.RecognitionException = require_Errors().RecognitionException;
  exports.NoViableAltException = require_Errors().NoViableAltException;
  exports.LexerNoViableAltException = require_Errors().LexerNoViableAltException;
  exports.InputMismatchException = require_Errors().InputMismatchException;
  exports.FailedPredicateException = require_Errors().FailedPredicateException;
  exports.DiagnosticErrorListener = require_DiagnosticErrorListener().DiagnosticErrorListener;
  exports.BailErrorStrategy = require_ErrorStrategy().BailErrorStrategy;
  exports.ErrorListener = require_ErrorListener().ErrorListener;
});

// node_modules/antlr4/InputStream.js
var require_InputStream = __commonJS((exports) => {
  var Token = require_Token().Token;
  require_codepointat();
  require_fromcodepoint();
  function _loadString(stream) {
    stream._index = 0;
    stream.data = [];
    if (stream.decodeToUnicodeCodePoints) {
      for (var i = 0; i < stream.strdata.length; ) {
        var codePoint = stream.strdata.codePointAt(i);
        stream.data.push(codePoint);
        i += codePoint <= 65535 ? 1 : 2;
      }
    } else {
      for (var i = 0; i < stream.strdata.length; i++) {
        var codeUnit = stream.strdata.charCodeAt(i);
        stream.data.push(codeUnit);
      }
    }
    stream._size = stream.data.length;
  }
  function InputStream(data, decodeToUnicodeCodePoints) {
    this.name = "<empty>";
    this.strdata = data;
    this.decodeToUnicodeCodePoints = decodeToUnicodeCodePoints || false;
    _loadString(this);
    return this;
  }
  Object.defineProperty(InputStream.prototype, "index", {
    get: function() {
      return this._index;
    }
  });
  Object.defineProperty(InputStream.prototype, "size", {
    get: function() {
      return this._size;
    }
  });
  InputStream.prototype.reset = function() {
    this._index = 0;
  };
  InputStream.prototype.consume = function() {
    if (this._index >= this._size) {
      throw "cannot consume EOF";
    }
    this._index += 1;
  };
  InputStream.prototype.LA = function(offset) {
    if (offset === 0) {
      return 0;
    }
    if (offset < 0) {
      offset += 1;
    }
    var pos = this._index + offset - 1;
    if (pos < 0 || pos >= this._size) {
      return Token.EOF;
    }
    return this.data[pos];
  };
  InputStream.prototype.LT = function(offset) {
    return this.LA(offset);
  };
  InputStream.prototype.mark = function() {
    return -1;
  };
  InputStream.prototype.release = function(marker) {
  };
  InputStream.prototype.seek = function(_index) {
    if (_index <= this._index) {
      this._index = _index;
      return;
    }
    this._index = Math.min(_index, this._size);
  };
  InputStream.prototype.getText = function(start, stop) {
    if (stop >= this._size) {
      stop = this._size - 1;
    }
    if (start >= this._size) {
      return "";
    } else {
      if (this.decodeToUnicodeCodePoints) {
        var result = "";
        for (var i = start; i <= stop; i++) {
          result += String.fromCodePoint(this.data[i]);
        }
        return result;
      } else {
        return this.strdata.slice(start, stop + 1);
      }
    }
  };
  InputStream.prototype.toString = function() {
    return this.strdata;
  };
  exports.InputStream = InputStream;
});

// node_modules/antlr4/CharStreams.js
var require_CharStreams = __commonJS((exports) => {
  var InputStream = require_InputStream().InputStream;
  var isNodeJs = typeof window === "undefined" && typeof importScripts === "undefined";
  var fs4 = isNodeJs ? require("fs") : null;
  var CharStreams = {
    fromString: function(str) {
      return new InputStream(str, true);
    },
    fromBlob: function(blob, encoding, onLoad, onError) {
      var reader = FileReader();
      reader.onload = function(e) {
        var is = new InputStream(e.target.result, true);
        onLoad(is);
      };
      reader.onerror = onError;
      reader.readAsText(blob, encoding);
    },
    fromBuffer: function(buffer, encoding) {
      return new InputStream(buffer.toString(encoding), true);
    },
    fromPath: function(path2, encoding, callback) {
      fs4.readFile(path2, encoding, function(err, data) {
        var is = null;
        if (data !== null) {
          is = new InputStream(data, true);
        }
        callback(err, is);
      });
    },
    fromPathSync: function(path2, encoding) {
      var data = fs4.readFileSync(path2, encoding);
      return new InputStream(data, true);
    }
  };
  exports.CharStreams = CharStreams;
});

// node_modules/antlr4/FileStream.js
var require_FileStream = __commonJS((exports) => {
  var InputStream = require_InputStream().InputStream;
  var isNodeJs = typeof window === "undefined" && typeof importScripts === "undefined";
  var fs4 = isNodeJs ? require("fs") : null;
  function FileStream(fileName, decodeToUnicodeCodePoints) {
    var data = fs4.readFileSync(fileName, "utf8");
    InputStream.call(this, data, decodeToUnicodeCodePoints);
    this.fileName = fileName;
    return this;
  }
  FileStream.prototype = Object.create(InputStream.prototype);
  FileStream.prototype.constructor = FileStream;
  exports.FileStream = FileStream;
});

// node_modules/antlr4/BufferedTokenStream.js
var require_BufferedTokenStream = __commonJS((exports) => {
  var Token = require_Token().Token;
  var Lexer = require_Lexer().Lexer;
  var Interval = require_IntervalSet().Interval;
  function TokenStream() {
    return this;
  }
  function BufferedTokenStream(tokenSource) {
    TokenStream.call(this);
    this.tokenSource = tokenSource;
    this.tokens = [];
    this.index = -1;
    this.fetchedEOF = false;
    return this;
  }
  BufferedTokenStream.prototype = Object.create(TokenStream.prototype);
  BufferedTokenStream.prototype.constructor = BufferedTokenStream;
  BufferedTokenStream.prototype.mark = function() {
    return 0;
  };
  BufferedTokenStream.prototype.release = function(marker) {
  };
  BufferedTokenStream.prototype.reset = function() {
    this.seek(0);
  };
  BufferedTokenStream.prototype.seek = function(index) {
    this.lazyInit();
    this.index = this.adjustSeekIndex(index);
  };
  BufferedTokenStream.prototype.get = function(index) {
    this.lazyInit();
    return this.tokens[index];
  };
  BufferedTokenStream.prototype.consume = function() {
    var skipEofCheck = false;
    if (this.index >= 0) {
      if (this.fetchedEOF) {
        skipEofCheck = this.index < this.tokens.length - 1;
      } else {
        skipEofCheck = this.index < this.tokens.length;
      }
    } else {
      skipEofCheck = false;
    }
    if (!skipEofCheck && this.LA(1) === Token.EOF) {
      throw "cannot consume EOF";
    }
    if (this.sync(this.index + 1)) {
      this.index = this.adjustSeekIndex(this.index + 1);
    }
  };
  BufferedTokenStream.prototype.sync = function(i) {
    var n = i - this.tokens.length + 1;
    if (n > 0) {
      var fetched = this.fetch(n);
      return fetched >= n;
    }
    return true;
  };
  BufferedTokenStream.prototype.fetch = function(n) {
    if (this.fetchedEOF) {
      return 0;
    }
    for (var i = 0; i < n; i++) {
      var t = this.tokenSource.nextToken();
      t.tokenIndex = this.tokens.length;
      this.tokens.push(t);
      if (t.type === Token.EOF) {
        this.fetchedEOF = true;
        return i + 1;
      }
    }
    return n;
  };
  BufferedTokenStream.prototype.getTokens = function(start, stop, types) {
    if (types === void 0) {
      types = null;
    }
    if (start < 0 || stop < 0) {
      return null;
    }
    this.lazyInit();
    var subset = [];
    if (stop >= this.tokens.length) {
      stop = this.tokens.length - 1;
    }
    for (var i = start; i < stop; i++) {
      var t = this.tokens[i];
      if (t.type === Token.EOF) {
        break;
      }
      if (types === null || types.contains(t.type)) {
        subset.push(t);
      }
    }
    return subset;
  };
  BufferedTokenStream.prototype.LA = function(i) {
    return this.LT(i).type;
  };
  BufferedTokenStream.prototype.LB = function(k) {
    if (this.index - k < 0) {
      return null;
    }
    return this.tokens[this.index - k];
  };
  BufferedTokenStream.prototype.LT = function(k) {
    this.lazyInit();
    if (k === 0) {
      return null;
    }
    if (k < 0) {
      return this.LB(-k);
    }
    var i = this.index + k - 1;
    this.sync(i);
    if (i >= this.tokens.length) {
      return this.tokens[this.tokens.length - 1];
    }
    return this.tokens[i];
  };
  BufferedTokenStream.prototype.adjustSeekIndex = function(i) {
    return i;
  };
  BufferedTokenStream.prototype.lazyInit = function() {
    if (this.index === -1) {
      this.setup();
    }
  };
  BufferedTokenStream.prototype.setup = function() {
    this.sync(0);
    this.index = this.adjustSeekIndex(0);
  };
  BufferedTokenStream.prototype.setTokenSource = function(tokenSource) {
    this.tokenSource = tokenSource;
    this.tokens = [];
    this.index = -1;
    this.fetchedEOF = false;
  };
  BufferedTokenStream.prototype.nextTokenOnChannel = function(i, channel) {
    this.sync(i);
    if (i >= this.tokens.length) {
      return -1;
    }
    var token = this.tokens[i];
    while (token.channel !== this.channel) {
      if (token.type === Token.EOF) {
        return -1;
      }
      i += 1;
      this.sync(i);
      token = this.tokens[i];
    }
    return i;
  };
  BufferedTokenStream.prototype.previousTokenOnChannel = function(i, channel) {
    while (i >= 0 && this.tokens[i].channel !== channel) {
      i -= 1;
    }
    return i;
  };
  BufferedTokenStream.prototype.getHiddenTokensToRight = function(tokenIndex, channel) {
    if (channel === void 0) {
      channel = -1;
    }
    this.lazyInit();
    if (tokenIndex < 0 || tokenIndex >= this.tokens.length) {
      throw "" + tokenIndex + " not in 0.." + this.tokens.length - 1;
    }
    var nextOnChannel = this.nextTokenOnChannel(tokenIndex + 1, Lexer.DEFAULT_TOKEN_CHANNEL);
    var from_ = tokenIndex + 1;
    var to = nextOnChannel === -1 ? this.tokens.length - 1 : nextOnChannel;
    return this.filterForChannel(from_, to, channel);
  };
  BufferedTokenStream.prototype.getHiddenTokensToLeft = function(tokenIndex, channel) {
    if (channel === void 0) {
      channel = -1;
    }
    this.lazyInit();
    if (tokenIndex < 0 || tokenIndex >= this.tokens.length) {
      throw "" + tokenIndex + " not in 0.." + this.tokens.length - 1;
    }
    var prevOnChannel = this.previousTokenOnChannel(tokenIndex - 1, Lexer.DEFAULT_TOKEN_CHANNEL);
    if (prevOnChannel === tokenIndex - 1) {
      return null;
    }
    var from_ = prevOnChannel + 1;
    var to = tokenIndex - 1;
    return this.filterForChannel(from_, to, channel);
  };
  BufferedTokenStream.prototype.filterForChannel = function(left, right, channel) {
    var hidden = [];
    for (var i = left; i < right + 1; i++) {
      var t = this.tokens[i];
      if (channel === -1) {
        if (t.channel !== Lexer.DEFAULT_TOKEN_CHANNEL) {
          hidden.push(t);
        }
      } else if (t.channel === channel) {
        hidden.push(t);
      }
    }
    if (hidden.length === 0) {
      return null;
    }
    return hidden;
  };
  BufferedTokenStream.prototype.getSourceName = function() {
    return this.tokenSource.getSourceName();
  };
  BufferedTokenStream.prototype.getText = function(interval) {
    this.lazyInit();
    this.fill();
    if (interval === void 0 || interval === null) {
      interval = new Interval(0, this.tokens.length - 1);
    }
    var start = interval.start;
    if (start instanceof Token) {
      start = start.tokenIndex;
    }
    var stop = interval.stop;
    if (stop instanceof Token) {
      stop = stop.tokenIndex;
    }
    if (start === null || stop === null || start < 0 || stop < 0) {
      return "";
    }
    if (stop >= this.tokens.length) {
      stop = this.tokens.length - 1;
    }
    var s = "";
    for (var i = start; i < stop + 1; i++) {
      var t = this.tokens[i];
      if (t.type === Token.EOF) {
        break;
      }
      s = s + t.text;
    }
    return s;
  };
  BufferedTokenStream.prototype.fill = function() {
    this.lazyInit();
    while (this.fetch(1e3) === 1e3) {
      continue;
    }
  };
  exports.BufferedTokenStream = BufferedTokenStream;
});

// node_modules/antlr4/CommonTokenStream.js
var require_CommonTokenStream = __commonJS((exports) => {
  var Token = require_Token().Token;
  var BufferedTokenStream = require_BufferedTokenStream().BufferedTokenStream;
  function CommonTokenStream(lexer, channel) {
    BufferedTokenStream.call(this, lexer);
    this.channel = channel === void 0 ? Token.DEFAULT_CHANNEL : channel;
    return this;
  }
  CommonTokenStream.prototype = Object.create(BufferedTokenStream.prototype);
  CommonTokenStream.prototype.constructor = CommonTokenStream;
  CommonTokenStream.prototype.adjustSeekIndex = function(i) {
    return this.nextTokenOnChannel(i, this.channel);
  };
  CommonTokenStream.prototype.LB = function(k) {
    if (k === 0 || this.index - k < 0) {
      return null;
    }
    var i = this.index;
    var n = 1;
    while (n <= k) {
      i = this.previousTokenOnChannel(i - 1, this.channel);
      n += 1;
    }
    if (i < 0) {
      return null;
    }
    return this.tokens[i];
  };
  CommonTokenStream.prototype.LT = function(k) {
    this.lazyInit();
    if (k === 0) {
      return null;
    }
    if (k < 0) {
      return this.LB(-k);
    }
    var i = this.index;
    var n = 1;
    while (n < k) {
      if (this.sync(i + 1)) {
        i = this.nextTokenOnChannel(i + 1, this.channel);
      }
      n += 1;
    }
    return this.tokens[i];
  };
  CommonTokenStream.prototype.getNumberOfOnChannelTokens = function() {
    var n = 0;
    this.fill();
    for (var i = 0; i < this.tokens.length; i++) {
      var t = this.tokens[i];
      if (t.channel === this.channel) {
        n += 1;
      }
      if (t.type === Token.EOF) {
        break;
      }
    }
    return n;
  };
  exports.CommonTokenStream = CommonTokenStream;
});

// node_modules/antlr4/Parser.js
var require_Parser = __commonJS((exports) => {
  var Token = require_Token().Token;
  var ParseTreeListener = require_Tree().ParseTreeListener;
  var Recognizer = require_Recognizer().Recognizer;
  var DefaultErrorStrategy = require_ErrorStrategy().DefaultErrorStrategy;
  var ATNDeserializer = require_ATNDeserializer().ATNDeserializer;
  var ATNDeserializationOptions = require_ATNDeserializationOptions().ATNDeserializationOptions;
  var TerminalNode = require_Tree().TerminalNode;
  var ErrorNode = require_Tree().ErrorNode;
  function TraceListener(parser) {
    ParseTreeListener.call(this);
    this.parser = parser;
    return this;
  }
  TraceListener.prototype = Object.create(ParseTreeListener.prototype);
  TraceListener.prototype.constructor = TraceListener;
  TraceListener.prototype.enterEveryRule = function(ctx) {
    console.log("enter   " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.parser._input.LT(1).text);
  };
  TraceListener.prototype.visitTerminal = function(node) {
    console.log("consume " + node.symbol + " rule " + this.parser.ruleNames[this.parser._ctx.ruleIndex]);
  };
  TraceListener.prototype.exitEveryRule = function(ctx) {
    console.log("exit    " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.parser._input.LT(1).text);
  };
  function Parser(input) {
    Recognizer.call(this);
    this._input = null;
    this._errHandler = new DefaultErrorStrategy();
    this._precedenceStack = [];
    this._precedenceStack.push(0);
    this._ctx = null;
    this.buildParseTrees = true;
    this._tracer = null;
    this._parseListeners = null;
    this._syntaxErrors = 0;
    this.setInputStream(input);
    return this;
  }
  Parser.prototype = Object.create(Recognizer.prototype);
  Parser.prototype.contructor = Parser;
  Parser.bypassAltsAtnCache = {};
  Parser.prototype.reset = function() {
    if (this._input !== null) {
      this._input.seek(0);
    }
    this._errHandler.reset(this);
    this._ctx = null;
    this._syntaxErrors = 0;
    this.setTrace(false);
    this._precedenceStack = [];
    this._precedenceStack.push(0);
    if (this._interp !== null) {
      this._interp.reset();
    }
  };
  Parser.prototype.match = function(ttype) {
    var t = this.getCurrentToken();
    if (t.type === ttype) {
      this._errHandler.reportMatch(this);
      this.consume();
    } else {
      t = this._errHandler.recoverInline(this);
      if (this.buildParseTrees && t.tokenIndex === -1) {
        this._ctx.addErrorNode(t);
      }
    }
    return t;
  };
  Parser.prototype.matchWildcard = function() {
    var t = this.getCurrentToken();
    if (t.type > 0) {
      this._errHandler.reportMatch(this);
      this.consume();
    } else {
      t = this._errHandler.recoverInline(this);
      if (this._buildParseTrees && t.tokenIndex === -1) {
        this._ctx.addErrorNode(t);
      }
    }
    return t;
  };
  Parser.prototype.getParseListeners = function() {
    return this._parseListeners || [];
  };
  Parser.prototype.addParseListener = function(listener) {
    if (listener === null) {
      throw "listener";
    }
    if (this._parseListeners === null) {
      this._parseListeners = [];
    }
    this._parseListeners.push(listener);
  };
  Parser.prototype.removeParseListener = function(listener) {
    if (this._parseListeners !== null) {
      var idx = this._parseListeners.indexOf(listener);
      if (idx >= 0) {
        this._parseListeners.splice(idx, 1);
      }
      if (this._parseListeners.length === 0) {
        this._parseListeners = null;
      }
    }
  };
  Parser.prototype.removeParseListeners = function() {
    this._parseListeners = null;
  };
  Parser.prototype.triggerEnterRuleEvent = function() {
    if (this._parseListeners !== null) {
      var ctx = this._ctx;
      this._parseListeners.map(function(listener) {
        listener.enterEveryRule(ctx);
        ctx.enterRule(listener);
      });
    }
  };
  Parser.prototype.triggerExitRuleEvent = function() {
    if (this._parseListeners !== null) {
      var ctx = this._ctx;
      this._parseListeners.slice(0).reverse().map(function(listener) {
        ctx.exitRule(listener);
        listener.exitEveryRule(ctx);
      });
    }
  };
  Parser.prototype.getTokenFactory = function() {
    return this._input.tokenSource._factory;
  };
  Parser.prototype.setTokenFactory = function(factory) {
    this._input.tokenSource._factory = factory;
  };
  Parser.prototype.getATNWithBypassAlts = function() {
    var serializedAtn = this.getSerializedATN();
    if (serializedAtn === null) {
      throw "The current parser does not support an ATN with bypass alternatives.";
    }
    var result = this.bypassAltsAtnCache[serializedAtn];
    if (result === null) {
      var deserializationOptions = new ATNDeserializationOptions();
      deserializationOptions.generateRuleBypassTransitions = true;
      result = new ATNDeserializer(deserializationOptions).deserialize(serializedAtn);
      this.bypassAltsAtnCache[serializedAtn] = result;
    }
    return result;
  };
  var Lexer = require_Lexer().Lexer;
  Parser.prototype.compileParseTreePattern = function(pattern, patternRuleIndex, lexer) {
    lexer = lexer || null;
    if (lexer === null) {
      if (this.getTokenStream() !== null) {
        var tokenSource = this.getTokenStream().tokenSource;
        if (tokenSource instanceof Lexer) {
          lexer = tokenSource;
        }
      }
    }
    if (lexer === null) {
      throw "Parser can't discover a lexer to use";
    }
    var m = new ParseTreePatternMatcher(lexer, this);
    return m.compile(pattern, patternRuleIndex);
  };
  Parser.prototype.getInputStream = function() {
    return this.getTokenStream();
  };
  Parser.prototype.setInputStream = function(input) {
    this.setTokenStream(input);
  };
  Parser.prototype.getTokenStream = function() {
    return this._input;
  };
  Parser.prototype.setTokenStream = function(input) {
    this._input = null;
    this.reset();
    this._input = input;
  };
  Parser.prototype.getCurrentToken = function() {
    return this._input.LT(1);
  };
  Parser.prototype.notifyErrorListeners = function(msg, offendingToken, err) {
    offendingToken = offendingToken || null;
    err = err || null;
    if (offendingToken === null) {
      offendingToken = this.getCurrentToken();
    }
    this._syntaxErrors += 1;
    var line = offendingToken.line;
    var column = offendingToken.column;
    var listener = this.getErrorListenerDispatch();
    listener.syntaxError(this, offendingToken, line, column, msg, err);
  };
  Parser.prototype.consume = function() {
    var o = this.getCurrentToken();
    if (o.type !== Token.EOF) {
      this.getInputStream().consume();
    }
    var hasListener = this._parseListeners !== null && this._parseListeners.length > 0;
    if (this.buildParseTrees || hasListener) {
      var node;
      if (this._errHandler.inErrorRecoveryMode(this)) {
        node = this._ctx.addErrorNode(o);
      } else {
        node = this._ctx.addTokenNode(o);
      }
      node.invokingState = this.state;
      if (hasListener) {
        this._parseListeners.map(function(listener) {
          if (node instanceof ErrorNode || node.isErrorNode !== void 0 && node.isErrorNode()) {
            listener.visitErrorNode(node);
          } else if (node instanceof TerminalNode) {
            listener.visitTerminal(node);
          }
        });
      }
    }
    return o;
  };
  Parser.prototype.addContextToParseTree = function() {
    if (this._ctx.parentCtx !== null) {
      this._ctx.parentCtx.addChild(this._ctx);
    }
  };
  Parser.prototype.enterRule = function(localctx, state, ruleIndex) {
    this.state = state;
    this._ctx = localctx;
    this._ctx.start = this._input.LT(1);
    if (this.buildParseTrees) {
      this.addContextToParseTree();
    }
    if (this._parseListeners !== null) {
      this.triggerEnterRuleEvent();
    }
  };
  Parser.prototype.exitRule = function() {
    this._ctx.stop = this._input.LT(-1);
    if (this._parseListeners !== null) {
      this.triggerExitRuleEvent();
    }
    this.state = this._ctx.invokingState;
    this._ctx = this._ctx.parentCtx;
  };
  Parser.prototype.enterOuterAlt = function(localctx, altNum) {
    localctx.setAltNumber(altNum);
    if (this.buildParseTrees && this._ctx !== localctx) {
      if (this._ctx.parentCtx !== null) {
        this._ctx.parentCtx.removeLastChild();
        this._ctx.parentCtx.addChild(localctx);
      }
    }
    this._ctx = localctx;
  };
  Parser.prototype.getPrecedence = function() {
    if (this._precedenceStack.length === 0) {
      return -1;
    } else {
      return this._precedenceStack[this._precedenceStack.length - 1];
    }
  };
  Parser.prototype.enterRecursionRule = function(localctx, state, ruleIndex, precedence) {
    this.state = state;
    this._precedenceStack.push(precedence);
    this._ctx = localctx;
    this._ctx.start = this._input.LT(1);
    if (this._parseListeners !== null) {
      this.triggerEnterRuleEvent();
    }
  };
  Parser.prototype.pushNewRecursionContext = function(localctx, state, ruleIndex) {
    var previous = this._ctx;
    previous.parentCtx = localctx;
    previous.invokingState = state;
    previous.stop = this._input.LT(-1);
    this._ctx = localctx;
    this._ctx.start = previous.start;
    if (this.buildParseTrees) {
      this._ctx.addChild(previous);
    }
    if (this._parseListeners !== null) {
      this.triggerEnterRuleEvent();
    }
  };
  Parser.prototype.unrollRecursionContexts = function(parentCtx) {
    this._precedenceStack.pop();
    this._ctx.stop = this._input.LT(-1);
    var retCtx = this._ctx;
    if (this._parseListeners !== null) {
      while (this._ctx !== parentCtx) {
        this.triggerExitRuleEvent();
        this._ctx = this._ctx.parentCtx;
      }
    } else {
      this._ctx = parentCtx;
    }
    retCtx.parentCtx = parentCtx;
    if (this.buildParseTrees && parentCtx !== null) {
      parentCtx.addChild(retCtx);
    }
  };
  Parser.prototype.getInvokingContext = function(ruleIndex) {
    var ctx = this._ctx;
    while (ctx !== null) {
      if (ctx.ruleIndex === ruleIndex) {
        return ctx;
      }
      ctx = ctx.parentCtx;
    }
    return null;
  };
  Parser.prototype.precpred = function(localctx, precedence) {
    return precedence >= this._precedenceStack[this._precedenceStack.length - 1];
  };
  Parser.prototype.inContext = function(context) {
    return false;
  };
  Parser.prototype.isExpectedToken = function(symbol) {
    var atn = this._interp.atn;
    var ctx = this._ctx;
    var s = atn.states[this.state];
    var following = atn.nextTokens(s);
    if (following.contains(symbol)) {
      return true;
    }
    if (!following.contains(Token.EPSILON)) {
      return false;
    }
    while (ctx !== null && ctx.invokingState >= 0 && following.contains(Token.EPSILON)) {
      var invokingState = atn.states[ctx.invokingState];
      var rt = invokingState.transitions[0];
      following = atn.nextTokens(rt.followState);
      if (following.contains(symbol)) {
        return true;
      }
      ctx = ctx.parentCtx;
    }
    if (following.contains(Token.EPSILON) && symbol === Token.EOF) {
      return true;
    } else {
      return false;
    }
  };
  Parser.prototype.getExpectedTokens = function() {
    return this._interp.atn.getExpectedTokens(this.state, this._ctx);
  };
  Parser.prototype.getExpectedTokensWithinCurrentRule = function() {
    var atn = this._interp.atn;
    var s = atn.states[this.state];
    return atn.nextTokens(s);
  };
  Parser.prototype.getRuleIndex = function(ruleName) {
    var ruleIndex = this.getRuleIndexMap()[ruleName];
    if (ruleIndex !== null) {
      return ruleIndex;
    } else {
      return -1;
    }
  };
  Parser.prototype.getRuleInvocationStack = function(p) {
    p = p || null;
    if (p === null) {
      p = this._ctx;
    }
    var stack = [];
    while (p !== null) {
      var ruleIndex = p.ruleIndex;
      if (ruleIndex < 0) {
        stack.push("n/a");
      } else {
        stack.push(this.ruleNames[ruleIndex]);
      }
      p = p.parentCtx;
    }
    return stack;
  };
  Parser.prototype.getDFAStrings = function() {
    return this._interp.decisionToDFA.toString();
  };
  Parser.prototype.dumpDFA = function() {
    var seenOne = false;
    for (var i = 0; i < this._interp.decisionToDFA.length; i++) {
      var dfa = this._interp.decisionToDFA[i];
      if (dfa.states.length > 0) {
        if (seenOne) {
          console.log();
        }
        this.printer.println("Decision " + dfa.decision + ":");
        this.printer.print(dfa.toString(this.literalNames, this.symbolicNames));
        seenOne = true;
      }
    }
  };
  Parser.prototype.getSourceName = function() {
    return this._input.sourceName;
  };
  Parser.prototype.setTrace = function(trace) {
    if (!trace) {
      this.removeParseListener(this._tracer);
      this._tracer = null;
    } else {
      if (this._tracer !== null) {
        this.removeParseListener(this._tracer);
      }
      this._tracer = new TraceListener(this);
      this.addParseListener(this._tracer);
    }
  };
  exports.Parser = Parser;
});

// node_modules/antlr4/index.js
var require_antlr4 = __commonJS((exports) => {
  exports.atn = require_atn();
  exports.codepointat = require_codepointat();
  exports.dfa = require_dfa();
  exports.fromcodepoint = require_fromcodepoint();
  exports.tree = require_tree();
  exports.error = require_error();
  exports.Token = require_Token().Token;
  exports.CharStreams = require_CharStreams().CharStreams;
  exports.CommonToken = require_Token().CommonToken;
  exports.InputStream = require_InputStream().InputStream;
  exports.FileStream = require_FileStream().FileStream;
  exports.CommonTokenStream = require_CommonTokenStream().CommonTokenStream;
  exports.Lexer = require_Lexer().Lexer;
  exports.Parser = require_Parser().Parser;
  var pc = require_PredictionContext();
  exports.PredictionContextCache = pc.PredictionContextCache;
  exports.ParserRuleContext = require_ParserRuleContext().ParserRuleContext;
  exports.Interval = require_IntervalSet().Interval;
  exports.Utils = require_Utils();
});

// src/ast/LessLexer.js
var require_LessLexer = __commonJS((exports) => {
  var antlr45 = require_antlr4();
  var serializedATN = [
    "\u608B\uA72A\u8133\uB9ED\u417C\u3BE7\u7786\u5964",
    "\x91\u054A\b\b\b	",
    "				",
    "\x07	\x07\b	\b			\n	\n",
    "\v	\v\f	\f\r	\r	",
    "				",
    "			",
    "				",
    "			",
    "			 	 !	",
    `!"	"#	#$	$%	%&	&'	'`,
    "(	()	)*	*+	+,	,-	-.	.",
    "/	/0	01	12	23	34	45	5",
    "6	67	78	89	9:	:;	;<	<",
    "=	=>	>?	?@	@A	AB	BC	C",
    "D	DE	EF	FG	GH	HI	IJ	J",
    "K	KL	LM	MN	NO	OP	PQ	Q",
    "R	RS	ST	TU	UV	VW	WX	X",
    "Y	YZ	Z[	[\\	\\]	]^	^_	_",
    "`	`a	ab	bc	cd	de	ef	f",
    "g	gh	hi	ij	jk	kl	lm	m",
    "n	no	op	pq	qr	rs	st	t",
    "u	uv	vw	wx	xy	yz	z{	{",
    "|	|}	}~	~\x7F	\x7F\x80	\x80",
    "\x81	\x81\x82	\x82\x83	\x83\x84	",
    "\x84\x85	\x85\x86	\x86\x87	\x87",
    "\x88	\x88\x89	\x89\x8A	\x8A\x8B	",
    "\x8B\x8C	\x8C\x8D	\x8D\x8E	\x8E",
    "\x8F	\x8F\x90	\x90\x91	\x91\x92	",
    "\x92\x93	\x93\x94	\x94\x95	\x95",
    "\x96	\x96\x97	\x97\x98	\x98\x99	",
    "\x99\x9A	\x9A\x9B	\x9B",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "\u0165\n",
    "\x07",
    "\x07\b\b		\n\n\v",
    "\v\f\f\r\r",
    "",
    "",
    "",
    "",
    "",
    "",
    '   !!!""',
    "###$$$%%%%",
    "&&&&&''''",
    "''''(((((",
    "(()))))***",
    "*****+++++",
    "++++++,,,,",
    ",,,,,,,---",
    "---.......",
    "...///////",
    "0000011112",
    "2222333333",
    "3334444455",
    "55666677\x077\u022B\n7\f",
    "77\u022E\v7777\x077\u0233\n7\f7",
    "7\u0236\v77\u0238\n77788\x078\u023E",
    "\n8\f88\u0241\v8888\x078\u0246\n8\f8",
    "8\u0249\v888\u024C\n899::\x07",
    ":\u0252\n:\f::\u0255\v:::\u0258\n::",
    ":\u025B\n:\r::\u025C:\x07:\u0260\n:\f::\u0263\v",
    ":::\u0266\n:::\u0269\n:\r::\u026A",
    ":\u026D\n:;;;\u0271\n;\r;;\u0272<",
    "<<<\u0278\n<\r<<\u0279<<=",
    "===\x07=\u0282\n=\f==\u0285\v==",
    "===\u028A\n==\u028C\n===>",
    ">>>\x07>\u0294\n>\f>>\u0297\v>>",
    ">>>>??????",
    "??????????",
    "??????????",
    "??????????",
    "??????????",
    "??????????",
    "??????????",
    "??????????",
    "???\u02EC\n?@@@@@@",
    "AAAAAAAABB",
    "BBBBBBBCCC",
    "CCCCCDDDDD",
    "EEEEEEEEEF",
    "FFFFFFFFFF",
    "FFGGGGGGGH",
    "HIIIIIIIIJ",
    "JJJJJJKKKK",
    "KKKKLLLLLM",
    "MMMMMNNNNN",
    "NNNNNNOOOO",
    "OOPPPPPQQQ",
    "QRRRRSSSSS",
    "TTTTUUUUUV",
    "VVVWWWWWXX",
    "XYYYYZZZZ[",
    "[[[\\\\\\\\]]",
    "]]]]]]]^^^",
    "^^^^^^____",
    "____``````",
    "````aaaaaa",
    "bbbbbbbbcc",
    "cccddddddd",
    "ddddddeeee",
    "eeeffffggg",
    "gghhhhhiii",
    "ijjjjjkkkk",
    "lllllmmmmn",
    "nnnnnnnnnn",
    "oooooooooo",
    "pppppppqqq",
    "qqqqqqqqqq",
    "qrrrrrrrrr",
    "sssstttttt",
    "uuuuuvvvvv",
    "vwwwwwxxxx",
    "xxxxxxyyyy",
    "yyyyyzzzzz",
    "zzzzzz{{{{",
    "{{{{||||||",
    "|}}}}}}}~~",
    "~~~~~~\x7F\x7F\x7F",
    "\x7F\x7F\x80\x80\x80\x80",
    "\x80\x81\x81\x81\x81\x82",
    "\x82\x82\x82\x82\x82\x82",
    "\x82\x82\x82\x83\x83\x83",
    "\x83\x83\x83\x83\x83\x83",
    "\x84\x84\x84\x84\x84\x84",
    "\x84\x84\x84\x85\x85\x85",
    "\x85\x85\x85\x85\x86\x86",
    "\x86\x86\x86\x86\x86\x86",
    "\x87\x87\x87\x87\x87\x87",
    "\x87\x87\x87\x87\x88\x88",
    "\x88\x88\x88\x88\x88\x88",
    "\x88\x88\x89\x89\x89\x89",
    "\x89\x89\x89\x89\x89\x89",
    "\x89\x8A\x8A\x8A\x8A\x8A",
    "\x8A\x8A\x8A\x8A\x8A\x8B",
    "\x8B\x8B\x8B\x8B\x8B\x8B",
    "\x8B\x8C\x8C\x8C\x8C\x8C",
    "\x8C\x8C\x8C\x8C\x8D\x8D",
    "\x8D\x8D\x8E\x8E\x8E\u050C\n",
    "\x8E\r\x8E\x8E\u050D\x8E\u0510\n\x8E\x8F",
    "\x8F\x8F\x8F\x8F\x90\x90",
    "\x90\x90\x90\x91\x91\x91",
    "\x91\x92\x92\x93\x93\x93",
    "\x93\x94\x94\x95\x95\x95",
    "\x95\x95\x96\x96\x96\x96",
    "\x96\x97\x97\x97\x97\x97",
    "\x98\x98\x98\x98\x98\x99",
    "\x99\x99\x99\x99\x9A\x9A",
    "\x9A\x9A\x9A\x9B\x9B\x9B",
    "\x9B\x9B\u0295\x9C\x07",
    "	\v\r\x07\b	\n\v",
    "\f\r!#%",
    "')+-/13579",
    `;=? A!C"E#G$I%K&M'O(Q)S*U+W,Y-[.]/_0a1c2e3g4i5k6m7o8q`,
    "s9u:w;y<{=}>\x7F?\x81@\x83A\x85B\x87C\x89D\x8BE",
    "\x8DF\x8FG\x91H\x93I\x95J\x97K\x99L\x9BM\x9DN\x9F",
    "O\xA1P\xA3Q\xA5R\xA7S\xA9T\xABU\xADV\xAFW\xB1X\xB3",
    "Y\xB5Z\xB7[\xB9\\\xBB]\xBD^\xBF_\xC1`\xC3a\xC5b\xC7",
    "c\xC9d\xCBe\xCDf\xCFg\xD1h\xD3i\xD5j\xD7k\xD9l\xDB",
    "m\xDDn\xDFo\xE1p\xE3q\xE5r\xE7s\xE9t\xEBu\xEDv\xEF",
    "w\xF1x\xF3y\xF5z\xF7{\xF9|\xFB}\xFD~\xFF\x7F\u0101",
    "\x80\u0103\x81\u0105\x82\u0107\x83\u0109\x84\u010B\x85\u010D",
    "\x86\u010F\x87\u0111\x88\u0113\x89\u0115\x8A\u0117\x8B\u0119",
    "\x8C\u011B\x8D\u011D\x8E\u011F\u0121\x8F\u0123\u0125",
    "\x90\u0127\u0129\x91\u012B\u012D\u012F\u0131",
    "\u0133\u0135\u0137\n",
    "\x0700C\\aac|\u0102\0\b/02;C\\aac|\u0102\0",
    "\f\f$$\f\f))2",
    ';CHch\v\f""\f\f',
    "\f\f++==\u05B8",
    "\x07	",
    "\v\r",
    "",
    "",
    "",
    "",
    "!",
    "#%",
    "')",
    "+-",
    "/13",
    "57",
    "9;",
    "=?",
    "AC",
    "EGI",
    "KM",
    "OQ",
    "SU",
    "WY",
    "[]_",
    "ac",
    "eg",
    "ik",
    "mo",
    "suw",
    "y{",
    "}\x7F",
    "\x81\x83",
    "\x85\x87",
    "\x89\x8B",
    "\x8D\x8F",
    "\x91\x93",
    "\x95\x97",
    "\x99\x9B",
    "\x9D\x9F",
    "\xA1\xA3",
    "\xA5\xA7",
    "\xA9\xAB",
    "\xAD\xAF",
    "\xB1\xB3",
    "\xB5\xB7",
    "\xB9\xBB",
    "\xBD\xBF",
    "\xC1\xC3",
    "\xC5\xC7",
    "\xC9\xCB",
    "\xCD\xCF",
    "\xD1\xD3",
    "\xD5\xD7",
    "\xD9\xDB",
    "\xDD\xDF",
    "\xE1\xE3",
    "\xE5\xE7",
    "\xE9\xEB",
    "\xED\xEF",
    "\xF1\xF3",
    "\xF5\xF7",
    "\xF9\xFB",
    "\xFD\xFF",
    "\u0101\u0103",
    "\u0105\u0107",
    "\u0109\u010B",
    "\u010D\u010F",
    "\u0111\u0113",
    "\u0115\u0117",
    "\u0119\u011B",
    "\u011D\u011F",
    "\u0121\u0123",
    "\u0125\u0127",
    "\u0129\u012B",
    "\u012D\u012F",
    "\u0131\u0133",
    "\u0135\u0137",
    "\u0139\x07\u013E",
    "	\u0164\v\u0166",
    "\r\u016A\u016F",
    "\u0171\u0173",
    "\u0175\u0177",
    "\u0179\u017B",
    "\u017D\u017F",
    "!\u0181#\u0183",
    "%\u0185'\u0187",
    ")\u0189+\u018B-\u018D",
    "/\u018F1\u0191",
    "3\u01945\u0196",
    "7\u01989\u019A",
    ";\u019C=\u019E",
    "?\u01A1A\u01A4C\u01A7",
    "E\u01AAG\u01AC",
    "I\u01AFK\u01B2",
    "M\u01B6O\u01BB",
    "Q\u01C3S\u01CA",
    "U\u01CFW\u01D7Y\u01E2",
    "[\u01ED]\u01F3",
    "_\u01FDa\u0204",
    "c\u0209e\u020D",
    "g\u0212i\u021B",
    "k\u0220m\u0224o\u0237",
    "q\u024Bs\u024D",
    "u\u026Cw\u026E",
    "y\u0277{\u027D",
    "}\u028F\x7F\u02EB",
    "\x81\u02ED\x83\u02F3",
    "\x85\u02FB\x87\u0304",
    "\x89\u030C\x8B\u0311",
    "\x8D\u031A\x8F\u0327",
    "\x91\u032E\x93\u0330",
    "\x95\u0338\x97\u033F",
    "\x99\u0347\x9B\u034C",
    "\x9D\u0352\x9F\u035D",
    "\xA1\u0363\xA3\u0368",
    "\xA5\u036C\xA7\u0370",
    "\xA9\u0375\xAB\u0379",
    "\xAD\u037E\xAF\u0382",
    "\xB1\u0387\xB3\u038A",
    "\xB5\u038E\xB7\u0392",
    "\xB9\u0396\xBB\u039A",
    "\xBD\u03A3\xBF\u03AC",
    "\xC1\u03B4\xC3\u03BE",
    "\xC5\u03C4\xC7\u03CC",
    "\xC9\u03D1\xCB\u03DE",
    "\xCD\u03E5\xCF\u03E9",
    "\xD1\u03EE\xD3\u03F3",
    "\xD5\u03F7\xD7\u03FC",
    "\xD9\u0400\xDB\u0405",
    "\xDD\u0409\xDF\u0414",
    "\xE1\u041E\xE3\u0425",
    "\xE5\u0433\xE7\u043C",
    "\xE9\u0440\xEB\u0446",
    "\xED\u044B\xEF\u0451",
    "\xF1\u0456\xF3\u0460",
    "\xF5\u0469\xF7\u0474",
    "\xF9\u047C\xFB\u0483",
    "\xFD\u048A\xFF\u0492",
    "\u0101\u0497\u0103\u049C",
    "\u0105\u04A0\u0107\u04AA",
    "\u0109\u04B3\u010B\u04BC",
    "\u010D\u04C3\u010F\u04CB",
    "\u0111\u04D5\u0113\u04DF",
    "\u0115\u04EA\u0117\u04F4",
    "\u0119\u04FC\u011B\u0505",
    "\u011D\u050F\u011F\u0511",
    "\u0121\u0516\u0123\u051B",
    "\u0125\u051F\u0127\u0521",
    "\u0129\u0525\u012B\u0527",
    "\u012D\u052C\u012F\u0531",
    "\u0131\u0536\u0133\u053B",
    "\u0135\u0540\u0137\u0545",
    "\u0139\u013A\x07p\u013A\u013B\x07w",
    "\u013B\u013C\x07n\u013C\u013D\x07n\u013D",
    "\u013E\u013F\x07k\u013F",
    "\u0140\x07p\u0140\b\u0141\u0165",
    "\x07'\u0142\u0143\x07r\u0143\u0165\x07",
    "z\u0144\u0145\x07e\u0145\u0165\x07o",
    "\u0146\u0147\x07o\u0147\u0165\x07o",
    "\u0148\u0149\x07k\u0149\u0165\x07p\u014A",
    "\u014B\x07r\u014B\u0165\x07v\u014C\u014D",
    "\x07r\u014D\u0165\x07e\u014E\u014F\x07",
    "g\u014F\u0165\x07o\u0150\u0151\x07g",
    "\u0151\u0165\x07z\u0152\u0153\x07f",
    "\u0153\u0154\x07g\u0154\u0165\x07i\u0155",
    "\u0156\x07t\u0156\u0157\x07c\u0157\u0165",
    "\x07f\u0158\u0159\x07i\u0159\u015A\x07",
    "t\u015A\u015B\x07c\u015B\u0165\x07f",
    "\u015C\u015D\x07o\u015D\u0165\x07u",
    "\u015E\u0165\x07u\u015F\u0160\x07j\u0160",
    "\u0165\x07|\u0161\u0162\x07m\u0162\u0163",
    "\x07j\u0163\u0165\x07|\u0164\u0141",
    "\u0164\u0142\u0164\u0144",
    "\u0164\u0146\u0164\u0148",
    "\u0164\u014A\u0164\u014C",
    "\u0164\u014E\u0164\u0150",
    "\u0164\u0152\u0164\u0155",
    "\u0164\u0158\u0164\u015C",
    "\u0164\u015E\u0164\u015F",
    "\u0164\u0161\u0165\n",
    "\u0166\u0167\x070\u0167\u0168\x07",
    "0\u0168\u0169\x070\u0169\f",
    "\u016A\u016B+\u016B\u016C	",
    "\u016C\u016D\u016D\u016E\b",
    "\u016E\u016F\u0170\x07*",
    "\u0170\u0171\u0172\x07+",
    "\u0172\u0173\u0174\x07}",
    "\u0174\u0175\u0176\x07\x7F",
    "\u0176\u0177\u0178\x07]",
    "\u0178\u0179\u017A\x07_",
    "\u017A\u017B\u017C\x07@",
    "\u017C\u017D\u017E\x07\x80",
    "\u017E\u017F\u0180\x07>",
    "\u0180 \u0181\u0182\x07<\u0182",
    '"\u0183\u0184\x07=\u0184$',
    "\u0185\u0186\x07.\u0186&",
    "\u0187\u0188\x070\u0188(",
    "\u0189\u018A\x07&\u018A*",
    "\u018B\u018C\x07B\u018C,\u018D",
    "\u018E\x07(\u018E.\u018F\u0190",
    "\x07%\u01900\u0191\u0192\x07",
    "<\u0192\u0193\x07<\u01932",
    "\u0194\u0195\x07-\u01954",
    "\u0196\u0197\x07,\u01976\u0198",
    "\u0199\x071\u01998\u019A\u019B",
    "\x07/\u019B:\u019C\u019D\x07",
    "'\u019D<\u019E\u019F\x07?",
    "\u019F\u01A0\x07?\u01A0>",
    "\u01A1\u01A2\x07@\u01A2\u01A3\x07?\u01A3",
    "@\u01A4\u01A5\x07>\u01A5\u01A6",
    "\x07?\u01A6B\u01A7\u01A8\x07",
    "#\u01A8\u01A9\x07?\u01A9D",
    "\u01AA\u01AB\x07?\u01ABF",
    "\u01AC\u01AD\x07~\u01AD\u01AE\x07?\u01AE",
    "H\u01AF\u01B0\x07\x80\u01B0",
    "\u01B1\x07?\u01B1J\u01B2\u01B3",
    "\x07w\u01B3\u01B4\x07t\u01B4\u01B5\x07",
    "n\u01B5L\u01B6\u01B7K%",
    "\u01B7\u01B8\x07\u01B8\u01B9",
    "\u01B9\u01BA\b&\u01BAN\u01BB\u01BC",
    "\x07B\u01BC\u01BD\x07k\u01BD\u01BE\x07",
    "o\u01BE\u01BF\x07r\u01BF\u01C0\x07q",
    "\u01C0\u01C1\x07t\u01C1\u01C2\x07v",
    "\u01C2P\u01C3\u01C4\x07B\u01C4",
    "\u01C5\x07o\u01C5\u01C6\x07g\u01C6\u01C7",
    "\x07f\u01C7\u01C8\x07k\u01C8\u01C9\x07",
    "c\u01C9R\u01CA\u01CB\x07q",
    "\u01CB\u01CC\x07p\u01CC\u01CD\x07n",
    "\u01CD\u01CE\x07{\u01CET\u01CF",
    "\u01D0\x07<\u01D0\u01D1\x07g\u01D1\u01D2",
    "\x07z\u01D2\u01D3\x07v\u01D3\u01D4\x07",
    "g\u01D4\u01D5\x07p\u01D5\u01D6\x07f",
    "\u01D6V\u01D7\u01D8\x07#",
    "\u01D8\u01D9\x07k\u01D9\u01DA\x07o\u01DA",
    "\u01DB\x07r\u01DB\u01DC\x07q\u01DC\u01DD",
    "\x07t\u01DD\u01DE\x07v\u01DE\u01DF\x07",
    "c\u01DF\u01E0\x07p\u01E0\u01E1\x07v",
    "\u01E1X\u01E2\u01E3\x07B",
    "\u01E3\u01E4\x07c\u01E4\u01E5\x07t\u01E5",
    "\u01E6\x07i\u01E6\u01E7\x07w\u01E7\u01E8",
    "\x07o\u01E8\u01E9\x07g\u01E9\u01EA\x07",
    "p\u01EA\u01EB\x07v\u01EB\u01EC\x07u",
    "\u01ECZ\u01ED\u01EE\x07B",
    "\u01EE\u01EF\x07t\u01EF\u01F0\x07g\u01F0",
    "\u01F1\x07u\u01F1\u01F2\x07v\u01F2\\",
    "\u01F3\u01F4\x07t\u01F4\u01F5\x07",
    "g\u01F5\u01F6\x07h\u01F6\u01F7\x07g",
    "\u01F7\u01F8\x07t\u01F8\u01F9\x07g",
    "\u01F9\u01FA\x07p\u01FA\u01FB\x07e\u01FB",
    "\u01FC\x07g\u01FC^\u01FD\u01FE",
    "\x07k\u01FE\u01FF\x07p\u01FF\u0200\x07",
    "n\u0200\u0201\x07k\u0201\u0202\x07p",
    "\u0202\u0203\x07g\u0203`",
    "\u0204\u0205\x07n\u0205\u0206\x07g\u0206",
    "\u0207\x07u\u0207\u0208\x07u\u0208b",
    "\u0209\u020A\x07e\u020A\u020B\x07",
    "u\u020B\u020C\x07u\u020Cd",
    "\u020D\u020E\x07q\u020E\u020F\x07p",
    "\u020F\u0210\x07e\u0210\u0211\x07g\u0211",
    "f\u0212\u0213\x07o\u0213\u0214",
    "\x07w\u0214\u0215\x07n\u0215\u0216\x07",
    "v\u0216\u0217\x07k\u0217\u0218\x07r",
    "\u0218\u0219\x07n\u0219\u021A\x07g",
    "\u021Ah\u021B\u021C\x07y\u021C",
    "\u021D\x07j\u021D\u021E\x07g\u021E\u021F",
    "\x07p\u021Fj\u0220\u0221\x07",
    "p\u0221\u0222\x07q\u0222\u0223\x07v",
    "\u0223l\u0224\u0225\x07c",
    "\u0225\u0226\x07p\u0226\u0227\x07f\u0227",
    "n\u0228\u022C	\u0229\u022B",
    "	\u022A\u0229\u022B\u022E",
    "\u022C\u022A\u022C\u022D",
    "\u022D\u0238\u022E\u022C",
    "\u022F\u0230\x07/\u0230\u0234",
    "	\u0231\u0233	\u0232\u0231",
    "\u0233\u0236\u0234\u0232",
    "\u0234\u0235\u0235\u0238",
    "\u0236\u0234\u0237\u0228",
    "\u0237\u022F\u0238\u0239",
    "\u0239\u023A\b7\u023Ap",
    "\u023B\u023F\x07$\u023C\u023E\n",
    "\u023D\u023C\u023E\u0241",
    "\u023F\u023D\u023F\u0240",
    "\u0240\u0242\u0241\u023F",
    "\u0242\u024C\x07$\u0243\u0247\x07)\u0244",
    "\u0246\n\u0245\u0244\u0246",
    "\u0249\u0247\u0245\u0247",
    "\u0248\u0248\u024A\u0249",
    "\u0247\u024A\u024C\x07)\u024B",
    "\u023B\u024B\u0243\u024C",
    "r\u024D\u024Eq8\u024Et",
    "\u024F\u0257\x07/\u0250\u02522;",
    "\u0251\u0250\u0252\u0255",
    "\u0253\u0251\u0253\u0254",
    "\u0254\u0256\u0255\u0253",
    "\u0256\u0258\x070\u0257\u0253",
    "\u0257\u0258\u0258\u025A",
    "\u0259\u025B2;\u025A\u0259\u025B",
    "\u025C\u025C\u025A\u025C",
    "\u025D\u025D\u026D\u025E",
    "\u02602;\u025F\u025E\u0260\u0263",
    "\u0261\u025F\u0261\u0262",
    "\u0262\u0264\u0263\u0261",
    "\u0264\u0266\x070\u0265\u0261",
    "\u0265\u0266\u0266\u0268",
    "\u0267\u02692;\u0268\u0267",
    "\u0269\u026A\u026A\u0268",
    "\u026A\u026B\u026B\u026D",
    "\u026C\u024F\u026C\u0265",
    "\u026Dv\u026E\u0270\x07",
    "%\u026F\u0271	\u0270\u026F",
    "\u0271\u0272\u0272\u0270",
    "\u0272\u0273\u0273x",
    "\u0274\u0278	\x07\u0275\u0276\x07",
    "\u0276\u0278\x07\f\u0277\u0274",
    "\u0277\u0275\u0278\u0279",
    "\u0279\u0277\u0279\u027A",
    "\u027A\u027B\u027B\u027C\b<",
    "\u027Cz\u027D\u027E\x071",
    "\u027E\u027F\x071\u027F\u0283",
    "\u0280\u0282\n\b\u0281\u0280\u0282",
    "\u0285\u0283\u0281\u0283",
    "\u0284\u0284\u028B\u0285",
    "\u0283\u0286\u028C\x07\f\u0287",
    "\u0289\x07\u0288\u028A\x07\f\u0289",
    "\u0288\u0289\u028A\u028A",
    "\u028C\u028B\u0286\u028B",
    "\u0287\u028C\u028D\u028D",
    "\u028E\b=\u028E|\u028F\u0290\x07",
    "1\u0290\u0291\x07,\u0291\u0295",
    "\u0292\u0294\v\u0293\u0292",
    "\u0294\u0297\u0295\u0296",
    "\u0295\u0293\u0296\u0298",
    "\u0297\u0295\u0298\u0299\x07,",
    "\u0299\u029A\x071\u029A\u029B",
    "\u029B\u029C\b>\u029C~",
    "\u029D\u02EC\x81@\u029E\u02EC\x83A\u029F",
    "\u02EC\x85B\u02A0\u02EC\x87C\u02A1\u02EC",
    "\x89D\u02A2\u02EC\x8BE\u02A3\u02EC",
    "\x8DF\u02A4\u02EC\x8FG\u02A5\u02EC\x91",
    "H\u02A6\u02EC;\u02A7\u02EC\x93I",
    "\u02A8\u02EC\x95J\u02A9\u02EC\x97K\u02AA",
    "\u02EC\x99L\u02AB\u02EC\x9BM\u02AC\u02EC",
    "\x9DN\u02AD\u02EC\x9FO\u02AE\u02EC",
    "\xA1P\u02AF\u02EC\xA3Q\u02B0\u02EC\xA5",
    "R\u02B1\u02EC\xA7S\u02B2\u02EC\xA9T",
    "\u02B3\u02EC\xABU\u02B4\u02EC\xADV\u02B5",
    "\u02EC\xAFW\u02B6\u02EC\xB1X\u02B7\u02EC",
    "\xB3Y\u02B8\u02EC\xB5Z\u02B9\u02EC",
    "\xB7[\u02BA\u02EC\xB9\\\u02BB\u02EC\xBB",
    "]\u02BC\u02EC\xBD^\u02BD\u02EC\xBF_",
    "\u02BE\u02EC\xC1`\u02BF\u02EC\xC3a\u02C0",
    "\u02EC\xC5b\u02C1\u02EC\xC7c\u02C2\u02EC",
    "\xC9d\u02C3\u02EC\xCBe\u02C4\u02EC",
    "\xCDf\u02C5\u02EC\xCFg\u02C6\u02EC\xD1",
    "h\u02C7\u02EC\xD3i\u02C8\u02EC\xD5j",
    "\u02C9\u02EC\xD7k\u02CA\u02EC\xD9l\u02CB",
    "\u02EC\xDBm\u02CC\u02EC\xDDn\u02CD\u02EC",
    "\xDFo\u02CE\u02EC\xE1p\u02CF\u02EC",
    "\xE3q\u02D0\u02EC\xE5r\u02D1\u02EC\xE7",
    "s\u02D2\u02EC\xE9t\u02D3\u02EC\xEBu",
    "\u02D4\u02EC\xEDv\u02D5\u02EC\xEFw\u02D6",
    "\u02EC\xF1x\u02D7\u02EC\xF3y\u02D8\u02EC",
    "\xF5z\u02D9\u02EC\xF7{\u02DA\u02EC",
    "\xF9|\u02DB\u02EC\xFB}\u02DC\u02EC\xFD",
    "~\u02DD\u02EC\xFF\x7F\u02DE\u02EC\u0101",
    "\x80\u02DF\u02EC\u0103\x81\u02E0\u02EC\u0105",
    "\x82\u02E1\u02EC\u0107\x83\u02E2\u02EC\u0109",
    "\x84\u02E3\u02EC\u010B\x85\u02E4\u02EC\u010D",
    "\x86\u02E5\u02EC\u010F\x87\u02E6\u02EC\u0111",
    "\x88\u02E7\u02EC\u0113\x89\u02E8\u02EC\u0115",
    "\x8A\u02E9\u02EC\u0117\x8B\u02EA\u02EC\u0119",
    "\x8C\u02EB\u029D\u02EB\u029E",
    "\u02EB\u029F\u02EB\u02A0",
    "\u02EB\u02A1\u02EB\u02A2",
    "\u02EB\u02A3\u02EB\u02A4",
    "\u02EB\u02A5\u02EB\u02A6",
    "\u02EB\u02A7\u02EB\u02A8",
    "\u02EB\u02A9\u02EB\u02AA",
    "\u02EB\u02AB\u02EB\u02AC",
    "\u02EB\u02AD\u02EB\u02AE",
    "\u02EB\u02AF\u02EB\u02B0",
    "\u02EB\u02B1\u02EB\u02B2",
    "\u02EB\u02B3\u02EB\u02B4",
    "\u02EB\u02B5\u02EB\u02B6",
    "\u02EB\u02B7\u02EB\u02B8",
    "\u02EB\u02B9\u02EB\u02BA",
    "\u02EB\u02BB\u02EB\u02BC",
    "\u02EB\u02BD\u02EB\u02BE",
    "\u02EB\u02BF\u02EB\u02C0",
    "\u02EB\u02C1\u02EB\u02C2",
    "\u02EB\u02C3\u02EB\u02C4",
    "\u02EB\u02C5\u02EB\u02C6",
    "\u02EB\u02C7\u02EB\u02C8",
    "\u02EB\u02C9\u02EB\u02CA",
    "\u02EB\u02CB\u02EB\u02CC",
    "\u02EB\u02CD\u02EB\u02CE",
    "\u02EB\u02CF\u02EB\u02D0",
    "\u02EB\u02D1\u02EB\u02D2",
    "\u02EB\u02D3\u02EB\u02D4",
    "\u02EB\u02D5\u02EB\u02D6",
    "\u02EB\u02D7\u02EB\u02D8",
    "\u02EB\u02D9\u02EB\u02DA",
    "\u02EB\u02DB\u02EB\u02DC",
    "\u02EB\u02DD\u02EB\u02DE",
    "\u02EB\u02DF\u02EB\u02E0",
    "\u02EB\u02E1\u02EB\u02E2",
    "\u02EB\u02E3\u02EB\u02E4",
    "\u02EB\u02E5\u02EB\u02E6",
    "\u02EB\u02E7\u02EB\u02E8",
    "\u02EB\u02E9\u02EB\u02EA",
    "\u02EC\x80\u02ED\u02EE\x07e",
    "\u02EE\u02EF\x07q\u02EF\u02F0\x07n",
    "\u02F0\u02F1\x07q\u02F1\u02F2\x07t",
    "\u02F2\x82\u02F3\u02F4\x07e",
    "\u02F4\u02F5\x07q\u02F5\u02F6\x07p\u02F6",
    "\u02F7\x07x\u02F7\u02F8\x07g\u02F8\u02F9",
    "\x07t\u02F9\u02FA\x07v\u02FA\x84",
    "\u02FB\u02FC\x07f\u02FC\u02FD\x07",
    "c\u02FD\u02FE\x07v\u02FE\u02FF\x07c",
    "\u02FF\u0300\x07/\u0300\u0301\x07w",
    "\u0301\u0302\x07t\u0302\u0303\x07k\u0303",
    "\x86\u0304\u0305\x07f\u0305",
    "\u0306\x07g\u0306\u0307\x07h\u0307\u0308",
    "\x07c\u0308\u0309\x07w\u0309\u030A\x07",
    "n\u030A\u030B\x07v\u030B\x88",
    "\u030C\u030D\x07w\u030D\u030E\x07p",
    "\u030E\u030F\x07k\u030F\u0310\x07v",
    "\u0310\x8A\u0311\u0312\x07i",
    "\u0312\u0313\x07g\u0313\u0314\x07v\u0314",
    "\u0315\x07/\u0315\u0316\x07w\u0316\u0317",
    "\x07p\u0317\u0318\x07k\u0318\u0319\x07",
    "v\u0319\x8C\u031A\u031B\x07",
    "u\u031B\u031C\x07x\u031C\u031D\x07i",
    "\u031D\u031E\x07/\u031E\u031F\x07i",
    "\u031F\u0320\x07t\u0320\u0321\x07c\u0321",
    "\u0322\x07f\u0322\u0323\x07k\u0323\u0324",
    "\x07g\u0324\u0325\x07p\u0325\u0326\x07",
    "v\u0326\x8E\u0327\u0328\x07",
    "g\u0328\u0329\x07u\u0329\u032A\x07e",
    "\u032A\u032B\x07c\u032B\u032C\x07r",
    "\u032C\u032D\x07g\u032D\x90",
    "\u032E\u032F\x07g\u032F\x92",
    "\u0330\u0331\x07t\u0331\u0332\x07g\u0332",
    "\u0333\x07r\u0333\u0334\x07n\u0334\u0335",
    "\x07c\u0335\u0336\x07e\u0336\u0337\x07",
    "g\u0337\x94\u0338\u0339\x07",
    "n\u0339\u033A\x07g\u033A\u033B\x07p",
    "\u033B\u033C\x07i\u033C\u033D\x07v",
    "\u033D\u033E\x07j\u033E\x96",
    "\u033F\u0340\x07g\u0340\u0341\x07z\u0341",
    "\u0342\x07v\u0342\u0343\x07t\u0343\u0344",
    "\x07c\u0344\u0345\x07e\u0345\u0346\x07",
    "v\u0346\x98\u0347\u0348\x07",
    "e\u0348\u0349\x07g\u0349\u034A\x07k",
    "\u034A\u034B\x07n\u034B\x9A",
    "\u034C\u034D\x07h\u034D\u034E\x07n",
    "\u034E\u034F\x07q\u034F\u0350\x07q\u0350",
    "\u0351\x07t\u0351\x9C\u0352",
    "\u0353\x07r\u0353\u0354\x07g\u0354\u0355",
    "\x07t\u0355\u0356\x07e\u0356\u0357\x07",
    "g\u0357\u0358\x07p\u0358\u0359\x07v",
    "\u0359\u035A\x07c\u035A\u035B\x07i",
    "\u035B\u035C\x07g\u035C\x9E",
    "\u035D\u035E\x07t\u035E\u035F\x07q\u035F",
    "\u0360\x07w\u0360\u0361\x07p\u0361\u0362",
    "\x07f\u0362\xA0\u0363\u0364",
    "\x07u\u0364\u0365\x07s\u0365\u0366\x07",
    "t\u0366\u0367\x07v\u0367\xA2",
    "\u0368\u0369\x07c\u0369\u036A\x07d",
    "\u036A\u036B\x07u\u036B\xA4",
    "\u036C\u036D\x07u\u036D\u036E\x07k",
    "\u036E\u036F\x07p\u036F\xA6",
    "\u0370\u0371\x07c\u0371\u0372\x07u\u0372",
    "\u0373\x07k\u0373\u0374\x07p\u0374\xA8",
    "\u0375\u0376\x07e\u0376\u0377",
    "\x07q\u0377\u0378\x07u\u0378\xAA",
    "\u0379\u037A\x07c\u037A\u037B\x07",
    "e\u037B\u037C\x07q\u037C\u037D\x07u",
    "\u037D\xAC\u037E\u037F\x07v",
    "\u037F\u0380\x07c\u0380\u0381\x07p",
    "\u0381\xAE\u0382\u0383\x07c",
    "\u0383\u0384\x07v\u0384\u0385\x07c\u0385",
    "\u0386\x07p\u0386\xB0\u0387",
    "\u0388\x07r\u0388\u0389\x07k\u0389\xB2",
    "\u038A\u038B\x07r\u038B\u038C",
    "\x07q\u038C\u038D\x07y\u038D\xB4",
    "\u038E\u038F\x07o\u038F\u0390\x07",
    "q\u0390\u0391\x07f\u0391\xB6",
    "\u0392\u0393\x07o\u0393\u0394\x07k",
    "\u0394\u0395\x07p\u0395\xB8",
    "\u0396\u0397\x07o\u0397\u0398\x07c",
    "\u0398\u0399\x07z\u0399\xBA",
    "\u039A\u039B\x07k\u039B\u039C\x07u\u039C",
    "\u039D\x07p\u039D\u039E\x07w\u039E\u039F",
    "\x07o\u039F\u03A0\x07d\u03A0\u03A1\x07",
    "g\u03A1\u03A2\x07t\u03A2\xBC",
    "\u03A3\u03A4\x07k\u03A4\u03A5\x07u",
    "\u03A5\u03A6\x07u\u03A6\u03A7\x07v",
    "\u03A7\u03A8\x07t\u03A8\u03A9\x07k\u03A9",
    "\u03AA\x07p\u03AA\u03AB\x07i\u03AB\xBE",
    "\u03AC\u03AD\x07k\u03AD\u03AE",
    "\x07u\u03AE\u03AF\x07e\u03AF\u03B0\x07",
    "q\u03B0\u03B1\x07n\u03B1\u03B2\x07q",
    "\u03B2\u03B3\x07t\u03B3\xC0",
    "\u03B4\u03B5\x07k\u03B5\u03B6\x07u",
    "\u03B6\u03B7\x07m\u03B7\u03B8\x07g\u03B8",
    "\u03B9\x07{\u03B9\u03BA\x07y\u03BA\u03BB",
    "\x07q\u03BB\u03BC\x07t\u03BC\u03BD\x07",
    "f\u03BD\xC2\u03BE\u03BF\x07",
    "k\u03BF\u03C0\x07u\u03C0\u03C1\x07w",
    "\u03C1\u03C2\x07t\u03C2\u03C3\x07n",
    "\u03C3\xC4\u03C4\u03C5\x07k",
    "\u03C5\u03C6\x07u\u03C6\u03C7\x07r\u03C7",
    "\u03C8\x07k\u03C8\u03C9\x07z\u03C9\u03CA",
    "\x07g\u03CA\u03CB\x07n\u03CB\xC6",
    "\u03CC\u03CD\x07k\u03CD\u03CE\x07",
    "u\u03CE\u03CF\x07g\u03CF\u03D0\x07o",
    "\u03D0\xC8\u03D1\u03D2\x07k",
    "\u03D2\u03D3\x07u\u03D3\u03D4\x07r",
    "\u03D4\u03D5\x07g\u03D5\u03D6\x07t\u03D6",
    "\u03D7\x07e\u03D7\u03D8\x07g\u03D8\u03D9",
    "\x07p\u03D9\u03DA\x07v\u03DA\u03DB\x07",
    "c\u03DB\u03DC\x07i\u03DC\u03DD\x07g",
    "\u03DD\xCA\u03DE\u03DF\x07k",
    "\u03DF\u03E0\x07u\u03E0\u03E1\x07w",
    "\u03E1\u03E2\x07p\u03E2\u03E3\x07k\u03E3",
    "\u03E4\x07v\u03E4\xCC\u03E5",
    "\u03E6\x07t\u03E6\u03E7\x07i\u03E7\u03E8",
    "\x07d\u03E8\xCE\u03E9\u03EA",
    "\x07t\u03EA\u03EB\x07i\u03EB\u03EC\x07",
    "d\u03EC\u03ED\x07c\u03ED\xD0",
    "\u03EE\u03EF\x07c\u03EF\u03F0\x07t",
    "\u03F0\u03F1\x07i\u03F1\u03F2\x07d",
    "\u03F2\xD2\u03F3\u03F4\x07j",
    "\u03F4\u03F5\x07u\u03F5\u03F6\x07n\u03F6",
    "\xD4\u03F7\u03F8\x07j\u03F8",
    "\u03F9\x07u\u03F9\u03FA\x07n\u03FA\u03FB",
    "\x07c\u03FB\xD6\u03FC\u03FD",
    "\x07j\u03FD\u03FE\x07u\u03FE\u03FF\x07",
    "x\u03FF\xD8\u0400\u0401\x07",
    "j\u0401\u0402\x07u\u0402\u0403\x07x",
    "\u0403\u0404\x07c\u0404\xDA",
    "\u0405\u0406\x07j\u0406\u0407\x07w",
    "\u0407\u0408\x07g\u0408\xDC",
    "\u0409\u040A\x07u\u040A\u040B\x07c\u040B",
    "\u040C\x07v\u040C\u040D\x07w\u040D\u040E",
    "\x07t\u040E\u040F\x07c\u040F\u0410\x07",
    "v\u0410\u0411\x07k\u0411\u0412\x07q",
    "\u0412\u0413\x07p\u0413\xDE",
    "\u0414\u0415\x07n\u0415\u0416\x07k",
    "\u0416\u0417\x07i\u0417\u0418\x07j\u0418",
    "\u0419\x07v\u0419\u041A\x07p\u041A\u041B",
    "\x07g\u041B\u041C\x07u\u041C\u041D\x07",
    "u\u041D\xE0\u041E\u041F\x07",
    "j\u041F\u0420\x07u\u0420\u0421\x07x",
    "\u0421\u0422\x07j\u0422\u0423\x07w",
    "\u0423\u0424\x07g\u0424\xE2",
    "\u0425\u0426\x07j\u0426\u0427\x07u\u0427",
    "\u0428\x07x\u0428\u0429\x07u\u0429\u042A",
    "\x07c\u042A\u042B\x07v\u042B\u042C\x07",
    "w\u042C\u042D\x07t\u042D\u042E\x07c",
    "\u042E\u042F\x07v\u042F\u0430\x07k",
    "\u0430\u0431\x07q\u0431\u0432\x07p\u0432",
    "\xE4\u0433\u0434\x07j\u0434",
    "\u0435\x07u\u0435\u0436\x07x\u0436\u0437",
    "\x07x\u0437\u0438\x07c\u0438\u0439\x07",
    "n\u0439\u043A\x07w\u043A\u043B\x07g",
    "\u043B\xE6\u043C\u043D\x07t",
    "\u043D\u043E\x07g\u043E\u043F\x07f",
    "\u043F\xE8\u0440\u0441\x07i",
    "\u0441\u0442\x07t\u0442\u0443\x07g\u0443",
    "\u0444\x07g\u0444\u0445\x07p\u0445\xEA",
    "\u0446\u0447\x07d\u0447\u0448",
    "\x07n\u0448\u0449\x07w\u0449\u044A\x07",
    "g\u044A\xEC\u044B\u044C\x07",
    "c\u044C\u044D\x07n\u044D\u044E\x07r",
    "\u044E\u044F\x07j\u044F\u0450\x07c",
    "\u0450\xEE\u0451\u0452\x07n",
    "\u0452\u0453\x07w\u0453\u0454\x07o\u0454",
    "\u0455\x07c\u0455\xF0\u0456",
    "\u0457\x07n\u0457\u0458\x07w\u0458\u0459",
    "\x07o\u0459\u045A\x07k\u045A\u045B\x07",
    "p\u045B\u045C\x07c\u045C\u045D\x07p",
    "\u045D\u045E\x07e\u045E\u045F\x07g",
    "\u045F\xF2\u0460\u0461\x07u",
    "\u0461\u0462\x07c\u0462\u0463\x07v\u0463",
    "\u0464\x07w\u0464\u0465\x07t\u0465\u0466",
    "\x07c\u0466\u0467\x07v\u0467\u0468\x07",
    "g\u0468\xF4\u0469\u046A\x07",
    "f\u046A\u046B\x07g\u046B\u046C\x07u",
    "\u046C\u046D\x07c\u046D\u046E\x07v",
    "\u046E\u046F\x07w\u046F\u0470\x07t\u0470",
    "\u0471\x07c\u0471\u0472\x07v\u0472\u0473",
    "\x07g\u0473\xF6\u0474\u0475",
    "\x07n\u0475\u0476\x07k\u0476\u0477\x07",
    "i\u0477\u0478\x07j\u0478\u0479\x07v",
    "\u0479\u047A\x07g\u047A\u047B\x07p",
    "\u047B\xF8\u047C\u047D\x07f",
    "\u047D\u047E\x07c\u047E\u047F\x07t\u047F",
    "\u0480\x07m\u0480\u0481\x07g\u0481\u0482",
    "\x07p\u0482\xFA\u0483\u0484",
    "\x07h\u0484\u0485\x07c\u0485\u0486\x07",
    "f\u0486\u0487\x07g\u0487\u0488\x07k",
    "\u0488\u0489\x07p\u0489\xFC",
    "\u048A\u048B\x07h\u048B\u048C\x07c",
    "\u048C\u048D\x07f\u048D\u048E\x07g\u048E",
    "\u048F\x07q\u048F\u0490\x07w\u0490\u0491",
    "\x07v\u0491\xFE\u0492\u0493",
    "\x07h\u0493\u0494\x07c\u0494\u0495\x07",
    "f\u0495\u0496\x07g\u0496\u0100",
    "\u0497\u0498\x07u\u0498\u0499\x07r",
    "\u0499\u049A\x07k\u049A\u049B\x07p",
    "\u049B\u0102\u049C\u049D\x07o",
    "\u049D\u049E\x07k\u049E\u049F\x07z\u049F",
    "\u0104\u04A0\u04A1\x07i\u04A1",
    "\u04A2\x07t\u04A2\u04A3\x07g\u04A3\u04A4",
    "\x07{\u04A4\u04A5\x07u\u04A5\u04A6\x07",
    "e\u04A6\u04A7\x07c\u04A7\u04A8\x07n",
    "\u04A8\u04A9\x07g\u04A9\u0106",
    "\u04AA\u04AB\x07e\u04AB\u04AC\x07q",
    "\u04AC\u04AD\x07p\u04AD\u04AE\x07v\u04AE",
    "\u04AF\x07t\u04AF\u04B0\x07c\u04B0\u04B1",
    "\x07u\u04B1\u04B2\x07v\u04B2\u0108",
    "\u04B3\u04B4\x07o\u04B4\u04B5\x07",
    "w\u04B5\u04B6\x07n\u04B6\u04B7\x07v",
    "\u04B7\u04B8\x07k\u04B8\u04B9\x07r",
    "\u04B9\u04BA\x07n\u04BA\u04BB\x07{\u04BB",
    "\u010A\u04BC\u04BD\x07u\u04BD",
    "\u04BE\x07e\u04BE\u04BF\x07t\u04BF\u04C0",
    "\x07g\u04C0\u04C1\x07g\u04C1\u04C2\x07",
    "p\u04C2\u010C\u04C3\u04C4\x07",
    "q\u04C4\u04C5\x07x\u04C5\u04C6\x07g",
    "\u04C6\u04C7\x07t\u04C7\u04C8\x07n",
    "\u04C8\u04C9\x07c\u04C9\u04CA\x07{\u04CA",
    "\u010E\u04CB\u04CC\x07u\u04CC",
    "\u04CD\x07q\u04CD\u04CE\x07h\u04CE\u04CF",
    "\x07v\u04CF\u04D0\x07n\u04D0\u04D1\x07",
    "k\u04D1\u04D2\x07i\u04D2\u04D3\x07j",
    "\u04D3\u04D4\x07v\u04D4\u0110",
    "\u04D5\u04D6\x07j\u04D6\u04D7\x07c",
    "\u04D7\u04D8\x07t\u04D8\u04D9\x07f\u04D9",
    "\u04DA\x07n\u04DA\u04DB\x07k\u04DB\u04DC",
    "\x07i\u04DC\u04DD\x07j\u04DD\u04DE\x07",
    "v\u04DE\u0112\u04DF\u04E0\x07",
    "f\u04E0\u04E1\x07k\u04E1\u04E2\x07h",
    "\u04E2\u04E3\x07h\u04E3\u04E4\x07g",
    "\u04E4\u04E5\x07t\u04E5\u04E6\x07g\u04E6",
    "\u04E7\x07p\u04E7\u04E8\x07e\u04E8\u04E9",
    "\x07g\u04E9\u0114\u04EA\u04EB",
    "\x07g\u04EB\u04EC\x07z\u04EC\u04ED\x07",
    "e\u04ED\u04EE\x07n\u04EE\u04EF\x07w",
    "\u04EF\u04F0\x07u\u04F0\u04F1\x07k",
    "\u04F1\u04F2\x07q\u04F2\u04F3\x07p\u04F3",
    "\u0116\u04F4\u04F5\x07c\u04F5",
    "\u04F6\x07x\u04F6\u04F7\x07g\u04F7\u04F8",
    "\x07t\u04F8\u04F9\x07c\u04F9\u04FA\x07",
    "i\u04FA\u04FB\x07g\u04FB\u0118",
    "\u04FC\u04FD\x07p\u04FD\u04FE\x07g",
    "\u04FE\u04FF\x07i\u04FF\u0500\x07c",
    "\u0500\u0501\x07v\u0501\u0502\x07k\u0502",
    "\u0503\x07q\u0503\u0504\x07p\u0504\u011A",
    "\u0505\u0506\b\u0506\u0507",
    "\u0507\u0508\b\x8D\u0508\u011C",
    "\u0509\u0510q8\u050A\u050C\n	",
    "\u050B\u050A\u050C\u050D",
    "\u050D\u050B\u050D\u050E",
    "\u050E\u0510\u050F\u0509",
    "\u050F\u050B\u0510\u011E",
    "\u0511\u0512	\u0512\u0513",
    "\u0513\u0514\b\x8F\u0514\u0515\b\x8F",
    "\u0515\u0120\u0516\u0517y<\u0517",
    "\u0518\u0518\u0519\b\x90\u0519",
    "\u051A\b\x90\u051A\u0122\u051B",
    "\u051C)\u051C\u051D\u051D",
    "\u051E\b\x91\x07\u051E\u0124\u051F",
    "\u0520\r\u0520\u0126\u0521",
    "\u0522\n\u0522\u0523\u0523",
    "\u0524\b\x93\b\u0524\u0128\u0525\u0526",
    "o7\u0526\u012A\u0527\u0528",
    "\v\u0528\u0529\u0529\u052A\b",
    "\x95\u052A\u052B\b\x95	\u052B\u012C",
    "\u052C\u052D'\u052D\u052E",
    "\u052E\u052F\b\x96\u052F\u0530\b\x96\n",
    "\u0530\u012E\u0531\u0532\x07",
    "\u0532\u0533\u0533\u0534\b\x97",
    "\u0534\u0535\b\x97\v\u0535\u0130",
    "\u0536\u0537\b\u0537\u0538",
    "\u0538\u0539\b\x98\u0539\u053A\b\x98\f\u053A\u0132",
    "\u053B\u053C!\u053C\u053D",
    "\u053D\u053E\b\x99\u053E\u053F",
    "\b\x99\r\u053F\u0134\u0540\u0541",
    "%\u0541\u0542\u0542\u0543\b\x9A",
    "\u0543\u0544\b\x9A\u0544\u0136",
    "\u0545\u0546#\u0546\u0547",
    "\u0547\u0548\b\x9B\u0548\u0549\b\x9B",
    "\u0549\u0138\u0164",
    "\u022C\u0234\u0237\u023F\u0247\u024B\u0253\u0257\u025C\u0261\u0265\u026A",
    "\u026C\u0272\u0277\u0279\u0283\u0289\u028B\u0295\u02EB\u050D\u050F",
    "\x07\x07\b",
    "	\n		\v			",
    "\b					"
  ].join("");
  var atn = new antlr45.atn.ATNDeserializer().deserialize(serializedATN);
  var decisionsToDFA = atn.decisionToState.map(function(ds, index) {
    return new antlr45.dfa.DFA(ds, index);
  });
  function LessLexer5(input) {
    antlr45.Lexer.call(this, input);
    this._interp = new antlr45.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr45.PredictionContextCache());
    return this;
  }
  LessLexer5.prototype = Object.create(antlr45.Lexer.prototype);
  LessLexer5.prototype.constructor = LessLexer5;
  Object.defineProperty(LessLexer5.prototype, "atn", {
    get: function() {
      return atn;
    }
  });
  LessLexer5.EOF = antlr45.Token.EOF;
  LessLexer5.NULL = 1;
  LessLexer5.IN = 2;
  LessLexer5.Unit = 3;
  LessLexer5.Ellipsis = 4;
  LessLexer5.InterpolationStart = 5;
  LessLexer5.LPAREN = 6;
  LessLexer5.RPAREN = 7;
  LessLexer5.BlockStart = 8;
  LessLexer5.BlockEnd = 9;
  LessLexer5.LBRACK = 10;
  LessLexer5.RBRACK = 11;
  LessLexer5.GT = 12;
  LessLexer5.TIL = 13;
  LessLexer5.LT = 14;
  LessLexer5.COLON = 15;
  LessLexer5.SEMI = 16;
  LessLexer5.COMMA = 17;
  LessLexer5.DOT = 18;
  LessLexer5.DOLLAR = 19;
  LessLexer5.AT = 20;
  LessLexer5.PARENTREF = 21;
  LessLexer5.HASH = 22;
  LessLexer5.COLONCOLON = 23;
  LessLexer5.PLUS = 24;
  LessLexer5.TIMES = 25;
  LessLexer5.DIV = 26;
  LessLexer5.MINUS = 27;
  LessLexer5.PERC = 28;
  LessLexer5.EQEQ = 29;
  LessLexer5.GTEQ = 30;
  LessLexer5.LTEQ = 31;
  LessLexer5.NOTEQ = 32;
  LessLexer5.EQ = 33;
  LessLexer5.PIPE_EQ = 34;
  LessLexer5.TILD_EQ = 35;
  LessLexer5.URL = 36;
  LessLexer5.UrlStart = 37;
  LessLexer5.IMPORT = 38;
  LessLexer5.MEDIA = 39;
  LessLexer5.MEDIAONLY = 40;
  LessLexer5.EXTEND = 41;
  LessLexer5.IMPORTANT = 42;
  LessLexer5.ARGUMENTS = 43;
  LessLexer5.REST = 44;
  LessLexer5.REFERENCE = 45;
  LessLexer5.INLINE = 46;
  LessLexer5.LESS = 47;
  LessLexer5.CSS = 48;
  LessLexer5.ONCE = 49;
  LessLexer5.MULTIPLE = 50;
  LessLexer5.WHEN = 51;
  LessLexer5.NOT = 52;
  LessLexer5.AND = 53;
  LessLexer5.Identifier = 54;
  LessLexer5.StringLiteral = 55;
  LessLexer5.Number = 56;
  LessLexer5.Color = 57;
  LessLexer5.WS = 58;
  LessLexer5.SL_COMMENT = 59;
  LessLexer5.COMMENT = 60;
  LessLexer5.FUNCTION_NAME = 61;
  LessLexer5.COLOR = 62;
  LessLexer5.CONVERT = 63;
  LessLexer5.DATA_URI = 64;
  LessLexer5.DEFAULT = 65;
  LessLexer5.UNIT = 66;
  LessLexer5.GET_UNIT = 67;
  LessLexer5.SVG_GRADIENT = 68;
  LessLexer5.ESCAPE = 69;
  LessLexer5.E = 70;
  LessLexer5.REPLACE = 71;
  LessLexer5.LENGTH = 72;
  LessLexer5.EXTRACT = 73;
  LessLexer5.CEIL = 74;
  LessLexer5.FLOOR = 75;
  LessLexer5.PERCENTAGE = 76;
  LessLexer5.ROUND = 77;
  LessLexer5.SQRT = 78;
  LessLexer5.ABS = 79;
  LessLexer5.SIN = 80;
  LessLexer5.ASIN = 81;
  LessLexer5.COS = 82;
  LessLexer5.ACOS = 83;
  LessLexer5.TAN = 84;
  LessLexer5.ATAN = 85;
  LessLexer5.PI = 86;
  LessLexer5.POW = 87;
  LessLexer5.MOD = 88;
  LessLexer5.MIN = 89;
  LessLexer5.MAX = 90;
  LessLexer5.ISNUMBER = 91;
  LessLexer5.ISSTRING = 92;
  LessLexer5.ISCOLOR = 93;
  LessLexer5.ISKEYWORD = 94;
  LessLexer5.ISURL = 95;
  LessLexer5.ISPIXEL = 96;
  LessLexer5.ISEM = 97;
  LessLexer5.ISPERCENTAGE = 98;
  LessLexer5.ISUNIT = 99;
  LessLexer5.RGB = 100;
  LessLexer5.RGBA = 101;
  LessLexer5.ARGB = 102;
  LessLexer5.HSL = 103;
  LessLexer5.HSLA = 104;
  LessLexer5.HSV = 105;
  LessLexer5.HSVA = 106;
  LessLexer5.HUE = 107;
  LessLexer5.SATURATION = 108;
  LessLexer5.LIGHTNESS = 109;
  LessLexer5.HSVHUE = 110;
  LessLexer5.HSVSATURATION = 111;
  LessLexer5.HSVVALUE = 112;
  LessLexer5.RED = 113;
  LessLexer5.GREEN = 114;
  LessLexer5.BLUE = 115;
  LessLexer5.ALPHA = 116;
  LessLexer5.LUMA = 117;
  LessLexer5.LUMINANCE = 118;
  LessLexer5.SATURATE = 119;
  LessLexer5.DESATURATE = 120;
  LessLexer5.LIGHTEN = 121;
  LessLexer5.DARKEN = 122;
  LessLexer5.FADEIN = 123;
  LessLexer5.FADEOUT = 124;
  LessLexer5.FADE = 125;
  LessLexer5.SPIN = 126;
  LessLexer5.MIX = 127;
  LessLexer5.GREYSCALE = 128;
  LessLexer5.CONTRAST = 129;
  LessLexer5.MULTIPLY = 130;
  LessLexer5.SCREEN = 131;
  LessLexer5.OVERLAY = 132;
  LessLexer5.SOFTLIGHT = 133;
  LessLexer5.HARDLIGHT = 134;
  LessLexer5.DIFFERENCE = 135;
  LessLexer5.EXCLUSION = 136;
  LessLexer5.AVERAGE = 137;
  LessLexer5.NEGATION = 138;
  LessLexer5.UrlEnd = 139;
  LessLexer5.Url = 140;
  LessLexer5.SPACE = 141;
  LessLexer5.InterpolationStartAfter = 142;
  LessLexer5.IdentifierAfter = 143;
  LessLexer5.URL_STARTED = 1;
  LessLexer5.IDENTIFY = 2;
  LessLexer5.prototype.channelNames = ["DEFAULT_TOKEN_CHANNEL", "HIDDEN"];
  LessLexer5.prototype.modeNames = ["DEFAULT_MODE", "URL_STARTED", "IDENTIFY"];
  LessLexer5.prototype.literalNames = [
    null,
    "'null'",
    "'in'",
    null,
    "'...'",
    null,
    "'('",
    "')'",
    "'{'",
    "'}'",
    "'['",
    "']'",
    "'>'",
    "'~'",
    "'<'",
    "':'",
    "';'",
    "','",
    "'.'",
    "'$'",
    "'@'",
    "'&'",
    "'#'",
    "'::'",
    "'+'",
    "'*'",
    "'/'",
    "'-'",
    "'%'",
    "'=='",
    "'>='",
    "'<='",
    "'!='",
    "'='",
    "'|='",
    "'~='",
    "'url'",
    null,
    "'@import'",
    "'@media'",
    "'only'",
    "':extend'",
    "'!important'",
    "'@arguments'",
    "'@rest'",
    "'reference'",
    "'inline'",
    "'less'",
    "'css'",
    "'once'",
    "'multiple'",
    "'when'",
    "'not'",
    "'and'",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "'color'",
    "'convert'",
    "'data-uri'",
    "'default'",
    "'unit'",
    "'get-unit'",
    "'svg-gradient'",
    "'escape'",
    "'e'",
    "'replace'",
    "'length'",
    "'extract'",
    "'ceil'",
    "'floor'",
    "'percentage'",
    "'round'",
    "'sqrt'",
    "'abs'",
    "'sin'",
    "'asin'",
    "'cos'",
    "'acos'",
    "'tan'",
    "'atan'",
    "'pi'",
    "'pow'",
    "'mod'",
    "'min'",
    "'max'",
    "'isnumber'",
    "'isstring'",
    "'iscolor'",
    "'iskeyword'",
    "'isurl'",
    "'ispixel'",
    "'isem'",
    "'ispercentage'",
    "'isunit'",
    "'rgb'",
    "'rgba'",
    "'argb'",
    "'hsl'",
    "'hsla'",
    "'hsv'",
    "'hsva'",
    "'hue'",
    "'saturation'",
    "'lightness'",
    "'hsvhue'",
    "'hsvsaturation'",
    "'hsvvalue'",
    "'red'",
    "'green'",
    "'blue'",
    "'alpha'",
    "'luma'",
    "'luminance'",
    "'saturate'",
    "'desaturate'",
    "'lighten'",
    "'darken'",
    "'fadein'",
    "'fadeout'",
    "'fade'",
    "'spin'",
    "'mix'",
    "'greyscale'",
    "'contrast'",
    "'multiply'",
    "'screen'",
    "'overlay'",
    "'softlight'",
    "'hardlight'",
    "'difference'",
    "'exclusion'",
    "'average'",
    "'negation'"
  ];
  LessLexer5.prototype.symbolicNames = [
    null,
    "NULL",
    "IN",
    "Unit",
    "Ellipsis",
    "InterpolationStart",
    "LPAREN",
    "RPAREN",
    "BlockStart",
    "BlockEnd",
    "LBRACK",
    "RBRACK",
    "GT",
    "TIL",
    "LT",
    "COLON",
    "SEMI",
    "COMMA",
    "DOT",
    "DOLLAR",
    "AT",
    "PARENTREF",
    "HASH",
    "COLONCOLON",
    "PLUS",
    "TIMES",
    "DIV",
    "MINUS",
    "PERC",
    "EQEQ",
    "GTEQ",
    "LTEQ",
    "NOTEQ",
    "EQ",
    "PIPE_EQ",
    "TILD_EQ",
    "URL",
    "UrlStart",
    "IMPORT",
    "MEDIA",
    "MEDIAONLY",
    "EXTEND",
    "IMPORTANT",
    "ARGUMENTS",
    "REST",
    "REFERENCE",
    "INLINE",
    "LESS",
    "CSS",
    "ONCE",
    "MULTIPLE",
    "WHEN",
    "NOT",
    "AND",
    "Identifier",
    "StringLiteral",
    "Number",
    "Color",
    "WS",
    "SL_COMMENT",
    "COMMENT",
    "FUNCTION_NAME",
    "COLOR",
    "CONVERT",
    "DATA_URI",
    "DEFAULT",
    "UNIT",
    "GET_UNIT",
    "SVG_GRADIENT",
    "ESCAPE",
    "E",
    "REPLACE",
    "LENGTH",
    "EXTRACT",
    "CEIL",
    "FLOOR",
    "PERCENTAGE",
    "ROUND",
    "SQRT",
    "ABS",
    "SIN",
    "ASIN",
    "COS",
    "ACOS",
    "TAN",
    "ATAN",
    "PI",
    "POW",
    "MOD",
    "MIN",
    "MAX",
    "ISNUMBER",
    "ISSTRING",
    "ISCOLOR",
    "ISKEYWORD",
    "ISURL",
    "ISPIXEL",
    "ISEM",
    "ISPERCENTAGE",
    "ISUNIT",
    "RGB",
    "RGBA",
    "ARGB",
    "HSL",
    "HSLA",
    "HSV",
    "HSVA",
    "HUE",
    "SATURATION",
    "LIGHTNESS",
    "HSVHUE",
    "HSVSATURATION",
    "HSVVALUE",
    "RED",
    "GREEN",
    "BLUE",
    "ALPHA",
    "LUMA",
    "LUMINANCE",
    "SATURATE",
    "DESATURATE",
    "LIGHTEN",
    "DARKEN",
    "FADEIN",
    "FADEOUT",
    "FADE",
    "SPIN",
    "MIX",
    "GREYSCALE",
    "CONTRAST",
    "MULTIPLY",
    "SCREEN",
    "OVERLAY",
    "SOFTLIGHT",
    "HARDLIGHT",
    "DIFFERENCE",
    "EXCLUSION",
    "AVERAGE",
    "NEGATION",
    "UrlEnd",
    "Url",
    "SPACE",
    "InterpolationStartAfter",
    "IdentifierAfter"
  ];
  LessLexer5.prototype.ruleNames = [
    "NULL",
    "IN",
    "Unit",
    "Ellipsis",
    "InterpolationStart",
    "LPAREN",
    "RPAREN",
    "BlockStart",
    "BlockEnd",
    "LBRACK",
    "RBRACK",
    "GT",
    "TIL",
    "LT",
    "COLON",
    "SEMI",
    "COMMA",
    "DOT",
    "DOLLAR",
    "AT",
    "PARENTREF",
    "HASH",
    "COLONCOLON",
    "PLUS",
    "TIMES",
    "DIV",
    "MINUS",
    "PERC",
    "EQEQ",
    "GTEQ",
    "LTEQ",
    "NOTEQ",
    "EQ",
    "PIPE_EQ",
    "TILD_EQ",
    "URL",
    "UrlStart",
    "IMPORT",
    "MEDIA",
    "MEDIAONLY",
    "EXTEND",
    "IMPORTANT",
    "ARGUMENTS",
    "REST",
    "REFERENCE",
    "INLINE",
    "LESS",
    "CSS",
    "ONCE",
    "MULTIPLE",
    "WHEN",
    "NOT",
    "AND",
    "Identifier",
    "STRING",
    "StringLiteral",
    "Number",
    "Color",
    "WS",
    "SL_COMMENT",
    "COMMENT",
    "FUNCTION_NAME",
    "COLOR",
    "CONVERT",
    "DATA_URI",
    "DEFAULT",
    "UNIT",
    "GET_UNIT",
    "SVG_GRADIENT",
    "ESCAPE",
    "E",
    "REPLACE",
    "LENGTH",
    "EXTRACT",
    "CEIL",
    "FLOOR",
    "PERCENTAGE",
    "ROUND",
    "SQRT",
    "ABS",
    "SIN",
    "ASIN",
    "COS",
    "ACOS",
    "TAN",
    "ATAN",
    "PI",
    "POW",
    "MOD",
    "MIN",
    "MAX",
    "ISNUMBER",
    "ISSTRING",
    "ISCOLOR",
    "ISKEYWORD",
    "ISURL",
    "ISPIXEL",
    "ISEM",
    "ISPERCENTAGE",
    "ISUNIT",
    "RGB",
    "RGBA",
    "ARGB",
    "HSL",
    "HSLA",
    "HSV",
    "HSVA",
    "HUE",
    "SATURATION",
    "LIGHTNESS",
    "HSVHUE",
    "HSVSATURATION",
    "HSVVALUE",
    "RED",
    "GREEN",
    "BLUE",
    "ALPHA",
    "LUMA",
    "LUMINANCE",
    "SATURATE",
    "DESATURATE",
    "LIGHTEN",
    "DARKEN",
    "FADEIN",
    "FADEOUT",
    "FADE",
    "SPIN",
    "MIX",
    "GREYSCALE",
    "CONTRAST",
    "MULTIPLY",
    "SCREEN",
    "OVERLAY",
    "SOFTLIGHT",
    "HARDLIGHT",
    "DIFFERENCE",
    "EXCLUSION",
    "AVERAGE",
    "NEGATION",
    "UrlEnd",
    "Url",
    "BlockStart_ID",
    "SPACE",
    "DOLLAR_ID",
    "InterpolationStartAfter",
    "InterpolationEnd_ID",
    "IdentifierAfter",
    "Ellipsis_ID",
    "DOT_ID",
    "LPAREN_ID",
    "RPAREN_ID",
    "COLON_ID",
    "COMMA_ID",
    "SEMI_ID"
  ];
  LessLexer5.prototype.grammarFileName = "LessLexer.g4";
  exports.LessLexer = LessLexer5;
});

// src/ast/LessParserListener.js
var require_LessParserListener = __commonJS((exports) => {
  var antlr45 = require_antlr4();
  function LessParserListener5() {
    antlr45.tree.ParseTreeListener.call(this);
    return this;
  }
  LessParserListener5.prototype = Object.create(antlr45.tree.ParseTreeListener.prototype);
  LessParserListener5.prototype.constructor = LessParserListener5;
  LessParserListener5.prototype.enterStylesheet = function(ctx) {
  };
  LessParserListener5.prototype.exitStylesheet = function(ctx) {
  };
  LessParserListener5.prototype.enterStatement = function(ctx) {
  };
  LessParserListener5.prototype.exitStatement = function(ctx) {
  };
  LessParserListener5.prototype.enterMedia = function(ctx) {
  };
  LessParserListener5.prototype.exitMedia = function(ctx) {
  };
  LessParserListener5.prototype.enterMediaQueryList = function(ctx) {
  };
  LessParserListener5.prototype.exitMediaQueryList = function(ctx) {
  };
  LessParserListener5.prototype.enterMediaQuery = function(ctx) {
  };
  LessParserListener5.prototype.exitMediaQuery = function(ctx) {
  };
  LessParserListener5.prototype.enterMediaType = function(ctx) {
  };
  LessParserListener5.prototype.exitMediaType = function(ctx) {
  };
  LessParserListener5.prototype.enterMediaExpression = function(ctx) {
  };
  LessParserListener5.prototype.exitMediaExpression = function(ctx) {
  };
  LessParserListener5.prototype.enterMediaFeature = function(ctx) {
  };
  LessParserListener5.prototype.exitMediaFeature = function(ctx) {
  };
  LessParserListener5.prototype.enterVariableName = function(ctx) {
  };
  LessParserListener5.prototype.exitVariableName = function(ctx) {
  };
  LessParserListener5.prototype.enterCommandStatement = function(ctx) {
  };
  LessParserListener5.prototype.exitCommandStatement = function(ctx) {
  };
  LessParserListener5.prototype.enterMathCharacter = function(ctx) {
  };
  LessParserListener5.prototype.exitMathCharacter = function(ctx) {
  };
  LessParserListener5.prototype.enterMathStatement = function(ctx) {
  };
  LessParserListener5.prototype.exitMathStatement = function(ctx) {
  };
  LessParserListener5.prototype.enterExpression = function(ctx) {
  };
  LessParserListener5.prototype.exitExpression = function(ctx) {
  };
  LessParserListener5.prototype.enterFunction = function(ctx) {
  };
  LessParserListener5.prototype.exitFunction = function(ctx) {
  };
  LessParserListener5.prototype.enterConditions = function(ctx) {
  };
  LessParserListener5.prototype.exitConditions = function(ctx) {
  };
  LessParserListener5.prototype.enterCondition = function(ctx) {
  };
  LessParserListener5.prototype.exitCondition = function(ctx) {
  };
  LessParserListener5.prototype.enterConditionStatement = function(ctx) {
  };
  LessParserListener5.prototype.exitConditionStatement = function(ctx) {
  };
  LessParserListener5.prototype.enterVariableDeclaration = function(ctx) {
  };
  LessParserListener5.prototype.exitVariableDeclaration = function(ctx) {
  };
  LessParserListener5.prototype.enterImportDeclaration = function(ctx) {
  };
  LessParserListener5.prototype.exitImportDeclaration = function(ctx) {
  };
  LessParserListener5.prototype.enterImportOption = function(ctx) {
  };
  LessParserListener5.prototype.exitImportOption = function(ctx) {
  };
  LessParserListener5.prototype.enterReferenceUrl = function(ctx) {
  };
  LessParserListener5.prototype.exitReferenceUrl = function(ctx) {
  };
  LessParserListener5.prototype.enterMediaTypes = function(ctx) {
  };
  LessParserListener5.prototype.exitMediaTypes = function(ctx) {
  };
  LessParserListener5.prototype.enterRuleset = function(ctx) {
  };
  LessParserListener5.prototype.exitRuleset = function(ctx) {
  };
  LessParserListener5.prototype.enterBlock = function(ctx) {
  };
  LessParserListener5.prototype.exitBlock = function(ctx) {
  };
  LessParserListener5.prototype.enterMixinDefinition = function(ctx) {
  };
  LessParserListener5.prototype.exitMixinDefinition = function(ctx) {
  };
  LessParserListener5.prototype.enterMixinGuard = function(ctx) {
  };
  LessParserListener5.prototype.exitMixinGuard = function(ctx) {
  };
  LessParserListener5.prototype.enterMixinDefinitionParam = function(ctx) {
  };
  LessParserListener5.prototype.exitMixinDefinitionParam = function(ctx) {
  };
  LessParserListener5.prototype.enterMixinReference = function(ctx) {
  };
  LessParserListener5.prototype.exitMixinReference = function(ctx) {
  };
  LessParserListener5.prototype.enterSelectors = function(ctx) {
  };
  LessParserListener5.prototype.exitSelectors = function(ctx) {
  };
  LessParserListener5.prototype.enterSelector = function(ctx) {
  };
  LessParserListener5.prototype.exitSelector = function(ctx) {
  };
  LessParserListener5.prototype.enterAttrib = function(ctx) {
  };
  LessParserListener5.prototype.exitAttrib = function(ctx) {
  };
  LessParserListener5.prototype.enterNegation = function(ctx) {
  };
  LessParserListener5.prototype.exitNegation = function(ctx) {
  };
  LessParserListener5.prototype.enterPseudo = function(ctx) {
  };
  LessParserListener5.prototype.exitPseudo = function(ctx) {
  };
  LessParserListener5.prototype.enterElement = function(ctx) {
  };
  LessParserListener5.prototype.exitElement = function(ctx) {
  };
  LessParserListener5.prototype.enterSelectorPrefix = function(ctx) {
  };
  LessParserListener5.prototype.exitSelectorPrefix = function(ctx) {
  };
  LessParserListener5.prototype.enterAttribRelate = function(ctx) {
  };
  LessParserListener5.prototype.exitAttribRelate = function(ctx) {
  };
  LessParserListener5.prototype.enterIdentifier = function(ctx) {
  };
  LessParserListener5.prototype.exitIdentifier = function(ctx) {
  };
  LessParserListener5.prototype.enterIdentifierPart = function(ctx) {
  };
  LessParserListener5.prototype.exitIdentifierPart = function(ctx) {
  };
  LessParserListener5.prototype.enterIdentifierVariableName = function(ctx) {
  };
  LessParserListener5.prototype.exitIdentifierVariableName = function(ctx) {
  };
  LessParserListener5.prototype.enterProperty = function(ctx) {
  };
  LessParserListener5.prototype.exitProperty = function(ctx) {
  };
  LessParserListener5.prototype.enterValues = function(ctx) {
  };
  LessParserListener5.prototype.exitValues = function(ctx) {
  };
  LessParserListener5.prototype.enterUrl = function(ctx) {
  };
  LessParserListener5.prototype.exitUrl = function(ctx) {
  };
  LessParserListener5.prototype.enterMeasurement = function(ctx) {
  };
  LessParserListener5.prototype.exitMeasurement = function(ctx) {
  };
  exports.LessParserListener = LessParserListener5;
});

// src/ast/LessParser.js
var require_LessParser = __commonJS((exports) => {
  var antlr45 = require_antlr4();
  var LessParserListener5 = require_LessParserListener().LessParserListener;
  var serializedATN = [
    "\u608B\uA72A\u8133\uB9ED\u417C\u3BE7\u7786\u5964",
    "\x91\u01B1		",
    "			\x07	\x07",
    "\b	\b			\n	\n\v	\v\f	\f",
    "\r	\r			",
    "			",
    "				",
    "			",
    "				",
    '	 	 !	!"	"#	#',
    "$	$%	%&	&'	'(	()	)*	*",
    "+	+,	,\x07Z\n\f",
    "]\v",
    "f\n",
    "\x07",
    "o\n\fr\vt\n",
    "w\n",
    "\x07|\n\f\x7F\v",
    "\x07\x84\n\f",
    "\x87\v\x89\n\x07\x07",
    "\b\b\b\b\b\x91\n\b\b\b",
    "		\n\n\n\n\n\x9B\n\n\v",
    "\v\x9E\n\v\r\v\v\x9F\v",
    "\v\xA3\n\v\f\f\r\r\r",
    "",
    "\xB2\n",
    "",
    "\xBF\n",
    "\xC4\n",
    "\x07\xCB\n",
    "\f\xCE\v",
    "",
    "\xD9\n",
    "\xE0\n",
    "",
    "\x07\xEB\n\f\xEE",
    "\v\xF2\n",
    "\xF6\n",
    "",
    "\u0100\n\x07",
    "\u0105\n\f\u0108\v",
    "",
    "\x07\u0113\n\f",
    "\u0116\v\u0119\n",
    "",
    "\x07\u0122\n\f\u0125\v",
    "\u0127\n\u012A\n",
    "\u012E\n",
    "\u0137",
    "\n\u013C\n",
    "\u0140\n",
    "\x07\u0147\n",
    "\f\u014A\v\u014D",
    "\n\r\u014E\x07\u0152\n",
    "\f\u0155\v\u0158",
    "\n      \u015F\n  ",
    " !!!!!\u0167\n!!!!\u016B",
    '\n!!!"""###',
    "########\u017C\n#$",
    "$%%&&\x07&\u0184\n&\f&&\u0187\v",
    "&&&&&\x07&\u018D\n&\f&&\u0190\v",
    "&&\u0192\n&''''''\u0199",
    "\n'(())))***",
    "\x07*\u01A4\n*\f**\u01A7\v*++++",
    ",,,\u01AF\n,,-",
    '\b\n\f "$&(*',
    ",.02468:<>@BDFHJLNPRTV\f**66",
    "77 !##",
    "/489",
    "#%88\x91\x91",
    "\u01C5[e",
    "g\bs\n\x88",
    "\f\x8A\x8C",
    "\x94\x9A",
    "\x9D\xA4",
    "\xA6\xBE",
    "\xC0\xC7",
    ' \xD8"\xDF',
    "$\xE1&\xE5",
    "(\xF9*\xFF",
    ",\u0101.\u01090\u010C",
    "2\u011C4\u0131",
    "6\u01368\u0138",
    ":\u0143<\u014C",
    ">\u0159@\u0162",
    "B\u016ED\u017BF\u017D",
    "H\u017FJ\u0191",
    "L\u0198N\u019A",
    "P\u019CR\u01A0",
    "T\u01A8V\u01AC",
    "XZYXZ]",
    "[Y[\\\\",
    "][^f&",
    "_f.`a$ab\x07",
    "bfcf2df",
    "e^e_e`",
    "ecedf",
    "gh\x07)hi\b",
    "ij0j\x07kp\n",
    "lm\x07mo\nnl",
    "orpnpq",
    "qtrp",
    "skstt	",
    "uw	vuvw",
    "wxx}\f\x07y",
    "z\x077z|\b{y",
    "|\x7F}{}~",
    "~\x89\x7F}",
    "\x80\x85\b\x81\x82\x077",
    "\x82\x84\b\x83\x81",
    "\x84\x87\x85\x83",
    "\x85\x86\x86\x89",
    "\x87\x85\x88v",
    "\x88\x80\x89\v",
    "\x8A\x8BJ&\x8B\r\x8C\x8D",
    "\x07\b\x8D\x90	\x8E\x8F\x07",
    "\x8F\x91\x90\x8E",
    "\x90\x91\x91\x92",
    "\x92\x93\x07	\x93",
    "\x94\x95J&\x95",
    "\x96\x97\x07\x97\x9B",
    "\n\x98\x99\x07\x99\x9B\x078",
    "\x9A\x96\x9A\x98",
    "\x9B\x9C\x9E",
    "\x9D\x9C\x9E\x9F",
    "\x9F\x9D\x9F\xA0",
    "\xA0\xA2\xA1\xA3\r",
    "\xA2\xA1\xA2\xA3",
    "\xA3\xA4\xA5	",
    "\xA5\xA6\xA7\f",
    "\xA7\xA8\v\xA8",
    "\xA9\xBFV,\xAA\xABJ&\xAB\xAC",
    "\x07,\xAC\xBF\xAD\xBF",
    "J&\xAE\xAFJ&\xAF\xB1\x07\b",
    "\xB0\xB2R*\xB1\xB0\xB1",
    "\xB2\xB2\xB3\xB3",
    "\xB4\x07	\xB4\xBF\xB5",
    "\xB6\x07;\xB6\xBF\x07,\xB7\xBF",
    "\x07;\xB8\xBF\x079\xB9\xBF",
    "T+\xBA\xBB\n\xBB\xBC\x07,",
    "\xBC\xBF\xBD\xBF\n",
    "\xBE\xA9\xBE\xAA",
    "\xBE\xAD\xBE\xAE",
    "\xBE\xB5\xBE\xB7",
    "\xBE\xB8\xBE\xB9",
    "\xBE\xBA\xBE\xBD",
    "\xBF\xC0\xC1\x07?",
    "\xC1\xC3\x07\b\xC2\xC4R*\xC3\xC2",
    "\xC3\xC4\xC4\xC5",
    "\xC5\xC6\x07	\xC6",
    "\xC7\xCC \xC8\xC9",
    "	\xC9\xCB \xCA\xC8",
    "\xCB\xCE\xCC\xCA",
    "\xCC\xCD\xCD",
    "\xCE\xCC\xCF\xD0\x07",
    '\b\xD0\xD1"\xD1\xD2\x07	',
    "\xD2\xD9\xD3\xD4\x076",
    '\xD4\xD5\x07\b\xD5\xD6"',
    "\xD6\xD7\x07	\xD7\xD9",
    "\xD8\xCF\xD8\xD3",
    "\xD9!\xDA\xDB\v",
    "\xDB\xDC	\xDC\xDD\v",
    "\xDD\xE0\xDE\xE0\v",
    "\xDF\xDA\xDF\xDE",
    "\xE0#\xE1\xE2\n\xE2",
    "\xE3\x07\xE3\xE4R*\xE4%",
    "\xE5\xF1\x07(\xE6\xE7\x07",
    "\b\xE7\xEC(\xE8\xE9\x07",
    "\xE9\xEB(\xEA\xE8",
    "\xEB\xEE\xEC\xEA",
    "\xEC\xED\xED\xEF",
    "\xEE\xEC\xEF\xF0\x07	",
    "\xF0\xF2\xF1\xE6",
    "\xF1\xF2\xF2\xF3",
    "\xF3\xF5*\xF4\xF6,",
    "\xF5\xF4\xF5\xF6",
    "\xF6\xF7\xF7\xF8\x07",
    "\xF8'\xF9\xFA	",
    "\xFA)\xFB\u0100\x079\xFC",
    "\xFD\x07'\xFD\xFE\x07\x8E\xFE",
    "\u0100\x07\x8D\xFF\xFB\xFF",
    "\xFC\u0100+\u0101",
    "\u0106\x078\u0102\u0103\x07\u0103",
    "\u0105\x078\u0104\u0102\u0105",
    "\u0108\u0106\u0104\u0106",
    "\u0107\u0107-\u0108",
    "\u0106\u0109\u010A:\u010A",
    "\u010B0\u010B/\u010C\u0114",
    "\x07\n\u010D\u010EP)\u010E\u010F\x07",
    "\u010F\u0113\u0110\u0113",
    "\u0111\u01138\u0112\u010D",
    "\u0112\u0110\u0112\u0111",
    "\u0113\u0116\u0114\u0112",
    "\u0114\u0115\u0115\u0118",
    "\u0116\u0114\u0117\u0119P",
    ")\u0118\u0117\u0118\u0119",
    "\u0119\u011A\u011A\u011B\x07\v",
    "\u011B1\u011C\u011D:",
    "\u011D\u0126\x07\b\u011E\u01236",
    "\u011F\u0120\x07\u0120\u01226",
    "\u0121\u011F\u0122\u0125",
    "\u0123\u0121\u0123\u0124",
    "\u0124\u0127\u0125\u0123",
    "\u0126\u011E\u0126\u0127",
    "\u0127\u0129\u0128\u012A\x07",
    "\u0129\u0128\u0129\u012A",
    "\u012A\u012B\u012B\u012D\x07	",
    "\u012C\u012E4\u012D\u012C",
    "\u012D\u012E\u012E\u012F",
    "\u012F\u01300\u01303\u0131",
    "\u0132\x075\u0132\u0133\u0133",
    "5\u0134\u0137\n\u0135\u0137",
    "$\u0136\u0134\u0136\u0135",
    "\u01377\u0138\u0139",
    "<\u0139\u013B\x07\b\u013A\u013C",
    "R*\u013B\u013A\u013B\u013C",
    "\u013C\u013D\u013D\u013F\x07	",
    "\u013E\u0140\x07,\u013F\u013E",
    "\u013F\u0140\u0140\u0141",
    "\u0141\u0142\x07\u01429",
    "\u0143\u0148<\u0144\u0145\x07",
    "\u0145\u0147<\u0146\u0144",
    "\u0147\u014A\u0148\u0146",
    "\u0148\u0149\u0149;",
    "\u014A\u0148\u014B\u014DD",
    "#\u014C\u014B\u014D\u014E",
    "\u014E\u014C\u014E\u014F",
    "\u014F\u0153\u0150\u0152>",
    " \u0151\u0150\u0152\u0155",
    "\u0153\u0151\u0153\u0154",
    "\u0154\u0157\u0155\u0153",
    '\u0156\u0158B"\u0157\u0156',
    "\u0157\u0158\u0158=",
    "\u0159\u015A\x07\f\u015A\u015E\x078",
    "\u015B\u015CH%\u015C\u015D	\x07\u015D\u015F",
    "\u015E\u015B\u015E\u015F",
    "\u015F\u0160\u0160\u0161",
    "\x07\r\u0161?\u0162\u0163\x07",
    "\u0163\u0164\x076\u0164\u0166\x07",
    "\b\u0165\u0167\x07\f\u0166\u0165",
    "\u0166\u0167\u0167\u0168",
    "\u0168\u016A:\u0169\u016B\x07\r",
    "\u016A\u0169\u016A\u016B",
    "\u016B\u016C\u016C\u016D\x07	",
    "\u016DA\u016E\u016F	\b\u016F",
    "\u0170\x078\u0170C\u0171\u0172",
    "F$\u0172\u0173J&\u0173\u017C",
    "\u0174\u017CJ&\u0175\u0176\x07",
    '\u0176\u017CJ&\u0177\u017CB"\u0178\u017C',
    "@!\u0179\u017C\x07\u017A\u017C\x07",
    "\u017B\u0171\u017B\u0174",
    "\u017B\u0175\u017B\u0177",
    "\u017B\u0178\u017B\u0179",
    "\u017B\u017A\u017CE",
    "\u017D\u017E		\u017EG",
    "\u017F\u0180	\n\u0180I\u0181\u0185",
    "\x078\u0182\u0184L'\u0183\u0182",
    "\u0184\u0187\u0185\u0183",
    "\u0185\u0186\u0186\u0192",
    "\u0187\u0185\u0188\u0189\x07\x07",
    "\u0189\u018AN(\u018A\u018E\x07\v",
    "\u018B\u018DL'\u018C\u018B",
    "\u018D\u0190\u018E\u018C",
    "\u018E\u018F\u018F\u0192",
    "\u0190\u018E\u0191\u0181",
    "\u0191\u0188\u0192K",
    "\u0193\u0194\x07\x90\u0194\u0195N(\u0195",
    "\u0196\x07\v\u0196\u0199\u0197",
    "\u0199\x07\x91\u0198\u0193\u0198",
    "\u0197\u0199M\u019A",
    "\u019B	\v\u019BO\u019C\u019D",
    "J&\u019D\u019E\x07\u019E\u019F",
    "R*\u019FQ\u01A0\u01A5\v",
    "\u01A1\u01A2\x07\u01A2\u01A4\v",
    "\u01A3\u01A1\u01A4\u01A7",
    "\u01A5\u01A3\u01A5\u01A6",
    "\u01A6S\u01A7\u01A5",
    "\u01A8\u01A9\x07'\u01A9\u01AA\x07\x8E",
    "\u01AA\u01AB\x07\x8D\u01ABU",
    "\u01AC\u01AE\x07:\u01AD\u01AF\x07",
    "\u01AE\u01AD\u01AE\u01AF",
    "\u01AFW1[epsv}\x85\x88\x90\x9A",
    "\x9F\xA2\xB1\xBE\xC3\xCC\xD8\xDF\xEC\xF1\xF5\xFF",
    "\u0106\u0112\u0114\u0118\u0123\u0126\u0129\u012D\u0136\u013B\u013F\u0148",
    "\u014E\u0153\u0157\u015E\u0166\u016A\u017B\u0185\u018E\u0191\u0198\u01A5",
    "\u01AE"
  ].join("");
  var atn = new antlr45.atn.ATNDeserializer().deserialize(serializedATN);
  var decisionsToDFA = atn.decisionToState.map(function(ds, index) {
    return new antlr45.dfa.DFA(ds, index);
  });
  var sharedContextCache = new antlr45.PredictionContextCache();
  var literalNames = [
    null,
    "'null'",
    "'in'",
    null,
    "'...'",
    null,
    "'('",
    "')'",
    "'{'",
    "'}'",
    "'['",
    "']'",
    "'>'",
    "'~'",
    "'<'",
    "':'",
    "';'",
    "','",
    "'.'",
    "'$'",
    "'@'",
    "'&'",
    "'#'",
    "'::'",
    "'+'",
    "'*'",
    "'/'",
    "'-'",
    "'%'",
    "'=='",
    "'>='",
    "'<='",
    "'!='",
    "'='",
    "'|='",
    "'~='",
    "'url'",
    null,
    "'@import'",
    "'@media'",
    "'only'",
    "':extend'",
    "'!important'",
    "'@arguments'",
    "'@rest'",
    "'reference'",
    "'inline'",
    "'less'",
    "'css'",
    "'once'",
    "'multiple'",
    "'when'",
    "'not'",
    "'and'",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "'color'",
    "'convert'",
    "'data-uri'",
    "'default'",
    "'unit'",
    "'get-unit'",
    "'svg-gradient'",
    "'escape'",
    "'e'",
    "'replace'",
    "'length'",
    "'extract'",
    "'ceil'",
    "'floor'",
    "'percentage'",
    "'round'",
    "'sqrt'",
    "'abs'",
    "'sin'",
    "'asin'",
    "'cos'",
    "'acos'",
    "'tan'",
    "'atan'",
    "'pi'",
    "'pow'",
    "'mod'",
    "'min'",
    "'max'",
    "'isnumber'",
    "'isstring'",
    "'iscolor'",
    "'iskeyword'",
    "'isurl'",
    "'ispixel'",
    "'isem'",
    "'ispercentage'",
    "'isunit'",
    "'rgb'",
    "'rgba'",
    "'argb'",
    "'hsl'",
    "'hsla'",
    "'hsv'",
    "'hsva'",
    "'hue'",
    "'saturation'",
    "'lightness'",
    "'hsvhue'",
    "'hsvsaturation'",
    "'hsvvalue'",
    "'red'",
    "'green'",
    "'blue'",
    "'alpha'",
    "'luma'",
    "'luminance'",
    "'saturate'",
    "'desaturate'",
    "'lighten'",
    "'darken'",
    "'fadein'",
    "'fadeout'",
    "'fade'",
    "'spin'",
    "'mix'",
    "'greyscale'",
    "'contrast'",
    "'multiply'",
    "'screen'",
    "'overlay'",
    "'softlight'",
    "'hardlight'",
    "'difference'",
    "'exclusion'",
    "'average'",
    "'negation'"
  ];
  var symbolicNames = [
    null,
    "NULL",
    "IN",
    "Unit",
    "Ellipsis",
    "InterpolationStart",
    "LPAREN",
    "RPAREN",
    "BlockStart",
    "BlockEnd",
    "LBRACK",
    "RBRACK",
    "GT",
    "TIL",
    "LT",
    "COLON",
    "SEMI",
    "COMMA",
    "DOT",
    "DOLLAR",
    "AT",
    "PARENTREF",
    "HASH",
    "COLONCOLON",
    "PLUS",
    "TIMES",
    "DIV",
    "MINUS",
    "PERC",
    "EQEQ",
    "GTEQ",
    "LTEQ",
    "NOTEQ",
    "EQ",
    "PIPE_EQ",
    "TILD_EQ",
    "URL",
    "UrlStart",
    "IMPORT",
    "MEDIA",
    "MEDIAONLY",
    "EXTEND",
    "IMPORTANT",
    "ARGUMENTS",
    "REST",
    "REFERENCE",
    "INLINE",
    "LESS",
    "CSS",
    "ONCE",
    "MULTIPLE",
    "WHEN",
    "NOT",
    "AND",
    "Identifier",
    "StringLiteral",
    "Number",
    "Color",
    "WS",
    "SL_COMMENT",
    "COMMENT",
    "FUNCTION_NAME",
    "COLOR",
    "CONVERT",
    "DATA_URI",
    "DEFAULT",
    "UNIT",
    "GET_UNIT",
    "SVG_GRADIENT",
    "ESCAPE",
    "E",
    "REPLACE",
    "LENGTH",
    "EXTRACT",
    "CEIL",
    "FLOOR",
    "PERCENTAGE",
    "ROUND",
    "SQRT",
    "ABS",
    "SIN",
    "ASIN",
    "COS",
    "ACOS",
    "TAN",
    "ATAN",
    "PI",
    "POW",
    "MOD",
    "MIN",
    "MAX",
    "ISNUMBER",
    "ISSTRING",
    "ISCOLOR",
    "ISKEYWORD",
    "ISURL",
    "ISPIXEL",
    "ISEM",
    "ISPERCENTAGE",
    "ISUNIT",
    "RGB",
    "RGBA",
    "ARGB",
    "HSL",
    "HSLA",
    "HSV",
    "HSVA",
    "HUE",
    "SATURATION",
    "LIGHTNESS",
    "HSVHUE",
    "HSVSATURATION",
    "HSVVALUE",
    "RED",
    "GREEN",
    "BLUE",
    "ALPHA",
    "LUMA",
    "LUMINANCE",
    "SATURATE",
    "DESATURATE",
    "LIGHTEN",
    "DARKEN",
    "FADEIN",
    "FADEOUT",
    "FADE",
    "SPIN",
    "MIX",
    "GREYSCALE",
    "CONTRAST",
    "MULTIPLY",
    "SCREEN",
    "OVERLAY",
    "SOFTLIGHT",
    "HARDLIGHT",
    "DIFFERENCE",
    "EXCLUSION",
    "AVERAGE",
    "NEGATION",
    "UrlEnd",
    "Url",
    "SPACE",
    "InterpolationStartAfter",
    "IdentifierAfter"
  ];
  var ruleNames = [
    "stylesheet",
    "statement",
    "media",
    "mediaQueryList",
    "mediaQuery",
    "mediaType",
    "mediaExpression",
    "mediaFeature",
    "variableName",
    "commandStatement",
    "mathCharacter",
    "mathStatement",
    "expression",
    "function",
    "conditions",
    "condition",
    "conditionStatement",
    "variableDeclaration",
    "importDeclaration",
    "importOption",
    "referenceUrl",
    "mediaTypes",
    "ruleset",
    "block",
    "mixinDefinition",
    "mixinGuard",
    "mixinDefinitionParam",
    "mixinReference",
    "selectors",
    "selector",
    "attrib",
    "negation",
    "pseudo",
    "element",
    "selectorPrefix",
    "attribRelate",
    "identifier",
    "identifierPart",
    "identifierVariableName",
    "property",
    "values",
    "url",
    "measurement"
  ];
  function LessParser5(input) {
    antlr45.Parser.call(this, input);
    this._interp = new antlr45.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
  }
  LessParser5.prototype = Object.create(antlr45.Parser.prototype);
  LessParser5.prototype.constructor = LessParser5;
  Object.defineProperty(LessParser5.prototype, "atn", {
    get: function() {
      return atn;
    }
  });
  LessParser5.EOF = antlr45.Token.EOF;
  LessParser5.NULL = 1;
  LessParser5.IN = 2;
  LessParser5.Unit = 3;
  LessParser5.Ellipsis = 4;
  LessParser5.InterpolationStart = 5;
  LessParser5.LPAREN = 6;
  LessParser5.RPAREN = 7;
  LessParser5.BlockStart = 8;
  LessParser5.BlockEnd = 9;
  LessParser5.LBRACK = 10;
  LessParser5.RBRACK = 11;
  LessParser5.GT = 12;
  LessParser5.TIL = 13;
  LessParser5.LT = 14;
  LessParser5.COLON = 15;
  LessParser5.SEMI = 16;
  LessParser5.COMMA = 17;
  LessParser5.DOT = 18;
  LessParser5.DOLLAR = 19;
  LessParser5.AT = 20;
  LessParser5.PARENTREF = 21;
  LessParser5.HASH = 22;
  LessParser5.COLONCOLON = 23;
  LessParser5.PLUS = 24;
  LessParser5.TIMES = 25;
  LessParser5.DIV = 26;
  LessParser5.MINUS = 27;
  LessParser5.PERC = 28;
  LessParser5.EQEQ = 29;
  LessParser5.GTEQ = 30;
  LessParser5.LTEQ = 31;
  LessParser5.NOTEQ = 32;
  LessParser5.EQ = 33;
  LessParser5.PIPE_EQ = 34;
  LessParser5.TILD_EQ = 35;
  LessParser5.URL = 36;
  LessParser5.UrlStart = 37;
  LessParser5.IMPORT = 38;
  LessParser5.MEDIA = 39;
  LessParser5.MEDIAONLY = 40;
  LessParser5.EXTEND = 41;
  LessParser5.IMPORTANT = 42;
  LessParser5.ARGUMENTS = 43;
  LessParser5.REST = 44;
  LessParser5.REFERENCE = 45;
  LessParser5.INLINE = 46;
  LessParser5.LESS = 47;
  LessParser5.CSS = 48;
  LessParser5.ONCE = 49;
  LessParser5.MULTIPLE = 50;
  LessParser5.WHEN = 51;
  LessParser5.NOT = 52;
  LessParser5.AND = 53;
  LessParser5.Identifier = 54;
  LessParser5.StringLiteral = 55;
  LessParser5.Number = 56;
  LessParser5.Color = 57;
  LessParser5.WS = 58;
  LessParser5.SL_COMMENT = 59;
  LessParser5.COMMENT = 60;
  LessParser5.FUNCTION_NAME = 61;
  LessParser5.COLOR = 62;
  LessParser5.CONVERT = 63;
  LessParser5.DATA_URI = 64;
  LessParser5.DEFAULT = 65;
  LessParser5.UNIT = 66;
  LessParser5.GET_UNIT = 67;
  LessParser5.SVG_GRADIENT = 68;
  LessParser5.ESCAPE = 69;
  LessParser5.E = 70;
  LessParser5.REPLACE = 71;
  LessParser5.LENGTH = 72;
  LessParser5.EXTRACT = 73;
  LessParser5.CEIL = 74;
  LessParser5.FLOOR = 75;
  LessParser5.PERCENTAGE = 76;
  LessParser5.ROUND = 77;
  LessParser5.SQRT = 78;
  LessParser5.ABS = 79;
  LessParser5.SIN = 80;
  LessParser5.ASIN = 81;
  LessParser5.COS = 82;
  LessParser5.ACOS = 83;
  LessParser5.TAN = 84;
  LessParser5.ATAN = 85;
  LessParser5.PI = 86;
  LessParser5.POW = 87;
  LessParser5.MOD = 88;
  LessParser5.MIN = 89;
  LessParser5.MAX = 90;
  LessParser5.ISNUMBER = 91;
  LessParser5.ISSTRING = 92;
  LessParser5.ISCOLOR = 93;
  LessParser5.ISKEYWORD = 94;
  LessParser5.ISURL = 95;
  LessParser5.ISPIXEL = 96;
  LessParser5.ISEM = 97;
  LessParser5.ISPERCENTAGE = 98;
  LessParser5.ISUNIT = 99;
  LessParser5.RGB = 100;
  LessParser5.RGBA = 101;
  LessParser5.ARGB = 102;
  LessParser5.HSL = 103;
  LessParser5.HSLA = 104;
  LessParser5.HSV = 105;
  LessParser5.HSVA = 106;
  LessParser5.HUE = 107;
  LessParser5.SATURATION = 108;
  LessParser5.LIGHTNESS = 109;
  LessParser5.HSVHUE = 110;
  LessParser5.HSVSATURATION = 111;
  LessParser5.HSVVALUE = 112;
  LessParser5.RED = 113;
  LessParser5.GREEN = 114;
  LessParser5.BLUE = 115;
  LessParser5.ALPHA = 116;
  LessParser5.LUMA = 117;
  LessParser5.LUMINANCE = 118;
  LessParser5.SATURATE = 119;
  LessParser5.DESATURATE = 120;
  LessParser5.LIGHTEN = 121;
  LessParser5.DARKEN = 122;
  LessParser5.FADEIN = 123;
  LessParser5.FADEOUT = 124;
  LessParser5.FADE = 125;
  LessParser5.SPIN = 126;
  LessParser5.MIX = 127;
  LessParser5.GREYSCALE = 128;
  LessParser5.CONTRAST = 129;
  LessParser5.MULTIPLY = 130;
  LessParser5.SCREEN = 131;
  LessParser5.OVERLAY = 132;
  LessParser5.SOFTLIGHT = 133;
  LessParser5.HARDLIGHT = 134;
  LessParser5.DIFFERENCE = 135;
  LessParser5.EXCLUSION = 136;
  LessParser5.AVERAGE = 137;
  LessParser5.NEGATION = 138;
  LessParser5.UrlEnd = 139;
  LessParser5.Url = 140;
  LessParser5.SPACE = 141;
  LessParser5.InterpolationStartAfter = 142;
  LessParser5.IdentifierAfter = 143;
  LessParser5.RULE_stylesheet = 0;
  LessParser5.RULE_statement = 1;
  LessParser5.RULE_media = 2;
  LessParser5.RULE_mediaQueryList = 3;
  LessParser5.RULE_mediaQuery = 4;
  LessParser5.RULE_mediaType = 5;
  LessParser5.RULE_mediaExpression = 6;
  LessParser5.RULE_mediaFeature = 7;
  LessParser5.RULE_variableName = 8;
  LessParser5.RULE_commandStatement = 9;
  LessParser5.RULE_mathCharacter = 10;
  LessParser5.RULE_mathStatement = 11;
  LessParser5.RULE_expression = 12;
  LessParser5.RULE_function = 13;
  LessParser5.RULE_conditions = 14;
  LessParser5.RULE_condition = 15;
  LessParser5.RULE_conditionStatement = 16;
  LessParser5.RULE_variableDeclaration = 17;
  LessParser5.RULE_importDeclaration = 18;
  LessParser5.RULE_importOption = 19;
  LessParser5.RULE_referenceUrl = 20;
  LessParser5.RULE_mediaTypes = 21;
  LessParser5.RULE_ruleset = 22;
  LessParser5.RULE_block = 23;
  LessParser5.RULE_mixinDefinition = 24;
  LessParser5.RULE_mixinGuard = 25;
  LessParser5.RULE_mixinDefinitionParam = 26;
  LessParser5.RULE_mixinReference = 27;
  LessParser5.RULE_selectors = 28;
  LessParser5.RULE_selector = 29;
  LessParser5.RULE_attrib = 30;
  LessParser5.RULE_negation = 31;
  LessParser5.RULE_pseudo = 32;
  LessParser5.RULE_element = 33;
  LessParser5.RULE_selectorPrefix = 34;
  LessParser5.RULE_attribRelate = 35;
  LessParser5.RULE_identifier = 36;
  LessParser5.RULE_identifierPart = 37;
  LessParser5.RULE_identifierVariableName = 38;
  LessParser5.RULE_property = 39;
  LessParser5.RULE_values = 40;
  LessParser5.RULE_url = 41;
  LessParser5.RULE_measurement = 42;
  function StylesheetContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_stylesheet;
    return this;
  }
  StylesheetContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  StylesheetContext.prototype.constructor = StylesheetContext;
  StylesheetContext.prototype.statement = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(StatementContext);
    } else {
      return this.getTypedRuleContext(StatementContext, i);
    }
  };
  StylesheetContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterStylesheet(this);
    }
  };
  StylesheetContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitStylesheet(this);
    }
  };
  LessParser5.StylesheetContext = StylesheetContext;
  LessParser5.prototype.stylesheet = function() {
    var localctx = new StylesheetContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, LessParser5.RULE_stylesheet);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 89;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while ((_la & ~31) == 0 && (1 << _la & (1 << LessParser5.InterpolationStart | 1 << LessParser5.GT | 1 << LessParser5.TIL | 1 << LessParser5.COLON | 1 << LessParser5.AT | 1 << LessParser5.PARENTREF | 1 << LessParser5.HASH | 1 << LessParser5.COLONCOLON | 1 << LessParser5.PLUS | 1 << LessParser5.TIMES)) !== 0 || (_la - 38 & ~31) == 0 && (1 << _la - 38 & (1 << LessParser5.IMPORT - 38 | 1 << LessParser5.MEDIA - 38 | 1 << LessParser5.Identifier - 38)) !== 0) {
        this.state = 86;
        this.statement();
        this.state = 91;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function StatementContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_statement;
    return this;
  }
  StatementContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  StatementContext.prototype.constructor = StatementContext;
  StatementContext.prototype.importDeclaration = function() {
    return this.getTypedRuleContext(ImportDeclarationContext, 0);
  };
  StatementContext.prototype.ruleset = function() {
    return this.getTypedRuleContext(RulesetContext, 0);
  };
  StatementContext.prototype.variableDeclaration = function() {
    return this.getTypedRuleContext(VariableDeclarationContext, 0);
  };
  StatementContext.prototype.SEMI = function() {
    return this.getToken(LessParser5.SEMI, 0);
  };
  StatementContext.prototype.mixinDefinition = function() {
    return this.getTypedRuleContext(MixinDefinitionContext, 0);
  };
  StatementContext.prototype.media = function() {
    return this.getTypedRuleContext(MediaContext, 0);
  };
  StatementContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterStatement(this);
    }
  };
  StatementContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitStatement(this);
    }
  };
  LessParser5.StatementContext = StatementContext;
  LessParser5.prototype.statement = function() {
    var localctx = new StatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, LessParser5.RULE_statement);
    try {
      this.state = 99;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 1, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 92;
          this.importDeclaration();
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 93;
          this.ruleset();
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          this.state = 94;
          this.variableDeclaration();
          this.state = 95;
          this.match(LessParser5.SEMI);
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          this.state = 97;
          this.mixinDefinition();
          break;
        case 5:
          this.enterOuterAlt(localctx, 5);
          this.state = 98;
          this.media();
          break;
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function MediaContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_media;
    return this;
  }
  MediaContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  MediaContext.prototype.constructor = MediaContext;
  MediaContext.prototype.MEDIA = function() {
    return this.getToken(LessParser5.MEDIA, 0);
  };
  MediaContext.prototype.mediaQueryList = function() {
    return this.getTypedRuleContext(MediaQueryListContext, 0);
  };
  MediaContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext, 0);
  };
  MediaContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterMedia(this);
    }
  };
  MediaContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitMedia(this);
    }
  };
  LessParser5.MediaContext = MediaContext;
  LessParser5.prototype.media = function() {
    var localctx = new MediaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, LessParser5.RULE_media);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 101;
      this.match(LessParser5.MEDIA);
      this.state = 102;
      this.mediaQueryList();
      this.state = 103;
      this.block();
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function MediaQueryListContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_mediaQueryList;
    return this;
  }
  MediaQueryListContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  MediaQueryListContext.prototype.constructor = MediaQueryListContext;
  MediaQueryListContext.prototype.mediaQuery = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(MediaQueryContext);
    } else {
      return this.getTypedRuleContext(MediaQueryContext, i);
    }
  };
  MediaQueryListContext.prototype.COMMA = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(LessParser5.COMMA);
    } else {
      return this.getToken(LessParser5.COMMA, i);
    }
  };
  MediaQueryListContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterMediaQueryList(this);
    }
  };
  MediaQueryListContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitMediaQueryList(this);
    }
  };
  LessParser5.MediaQueryListContext = MediaQueryListContext;
  LessParser5.prototype.mediaQueryList = function() {
    var localctx = new MediaQueryListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, LessParser5.RULE_mediaQueryList);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 113;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === LessParser5.InterpolationStart || _la === LessParser5.LPAREN || (_la - 40 & ~31) == 0 && (1 << _la - 40 & (1 << LessParser5.MEDIAONLY - 40 | 1 << LessParser5.NOT - 40 | 1 << LessParser5.Identifier - 40)) !== 0) {
        this.state = 105;
        this.mediaQuery();
        this.state = 110;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === LessParser5.COMMA) {
          this.state = 106;
          this.match(LessParser5.COMMA);
          this.state = 107;
          this.mediaQuery();
          this.state = 112;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function MediaQueryContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_mediaQuery;
    return this;
  }
  MediaQueryContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  MediaQueryContext.prototype.constructor = MediaQueryContext;
  MediaQueryContext.prototype.mediaType = function() {
    return this.getTypedRuleContext(MediaTypeContext, 0);
  };
  MediaQueryContext.prototype.AND = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(LessParser5.AND);
    } else {
      return this.getToken(LessParser5.AND, i);
    }
  };
  MediaQueryContext.prototype.mediaExpression = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(MediaExpressionContext);
    } else {
      return this.getTypedRuleContext(MediaExpressionContext, i);
    }
  };
  MediaQueryContext.prototype.MEDIAONLY = function() {
    return this.getToken(LessParser5.MEDIAONLY, 0);
  };
  MediaQueryContext.prototype.NOT = function() {
    return this.getToken(LessParser5.NOT, 0);
  };
  MediaQueryContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterMediaQuery(this);
    }
  };
  MediaQueryContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitMediaQuery(this);
    }
  };
  LessParser5.MediaQueryContext = MediaQueryContext;
  LessParser5.prototype.mediaQuery = function() {
    var localctx = new MediaQueryContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, LessParser5.RULE_mediaQuery);
    var _la = 0;
    try {
      this.state = 134;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case LessParser5.InterpolationStart:
        case LessParser5.MEDIAONLY:
        case LessParser5.NOT:
        case LessParser5.Identifier:
          this.enterOuterAlt(localctx, 1);
          this.state = 116;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          if (_la === LessParser5.MEDIAONLY || _la === LessParser5.NOT) {
            this.state = 115;
            _la = this._input.LA(1);
            if (!(_la === LessParser5.MEDIAONLY || _la === LessParser5.NOT)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);
              this.consume();
            }
          }
          this.state = 118;
          this.mediaType();
          this.state = 123;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          while (_la === LessParser5.AND) {
            this.state = 119;
            this.match(LessParser5.AND);
            this.state = 120;
            this.mediaExpression();
            this.state = 125;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
          }
          break;
        case LessParser5.LPAREN:
          this.enterOuterAlt(localctx, 2);
          this.state = 126;
          this.mediaExpression();
          this.state = 131;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          while (_la === LessParser5.AND) {
            this.state = 127;
            this.match(LessParser5.AND);
            this.state = 128;
            this.mediaExpression();
            this.state = 133;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
          }
          break;
        default:
          throw new antlr45.error.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function MediaTypeContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_mediaType;
    return this;
  }
  MediaTypeContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  MediaTypeContext.prototype.constructor = MediaTypeContext;
  MediaTypeContext.prototype.identifier = function() {
    return this.getTypedRuleContext(IdentifierContext, 0);
  };
  MediaTypeContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterMediaType(this);
    }
  };
  MediaTypeContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitMediaType(this);
    }
  };
  LessParser5.MediaTypeContext = MediaTypeContext;
  LessParser5.prototype.mediaType = function() {
    var localctx = new MediaTypeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, LessParser5.RULE_mediaType);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 136;
      this.identifier();
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function MediaExpressionContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_mediaExpression;
    return this;
  }
  MediaExpressionContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  MediaExpressionContext.prototype.constructor = MediaExpressionContext;
  MediaExpressionContext.prototype.LPAREN = function() {
    return this.getToken(LessParser5.LPAREN, 0);
  };
  MediaExpressionContext.prototype.mediaFeature = function() {
    return this.getTypedRuleContext(MediaFeatureContext, 0);
  };
  MediaExpressionContext.prototype.RPAREN = function() {
    return this.getToken(LessParser5.RPAREN, 0);
  };
  MediaExpressionContext.prototype.COLON = function() {
    return this.getToken(LessParser5.COLON, 0);
  };
  MediaExpressionContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  };
  MediaExpressionContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterMediaExpression(this);
    }
  };
  MediaExpressionContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitMediaExpression(this);
    }
  };
  LessParser5.MediaExpressionContext = MediaExpressionContext;
  LessParser5.prototype.mediaExpression = function() {
    var localctx = new MediaExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, LessParser5.RULE_mediaExpression);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 138;
      this.match(LessParser5.LPAREN);
      this.state = 139;
      this.mediaFeature();
      this.state = 142;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === LessParser5.COLON) {
        this.state = 140;
        this.match(LessParser5.COLON);
        this.state = 141;
        this.expression();
      }
      this.state = 144;
      this.match(LessParser5.RPAREN);
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function MediaFeatureContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_mediaFeature;
    return this;
  }
  MediaFeatureContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  MediaFeatureContext.prototype.constructor = MediaFeatureContext;
  MediaFeatureContext.prototype.identifier = function() {
    return this.getTypedRuleContext(IdentifierContext, 0);
  };
  MediaFeatureContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterMediaFeature(this);
    }
  };
  MediaFeatureContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitMediaFeature(this);
    }
  };
  LessParser5.MediaFeatureContext = MediaFeatureContext;
  LessParser5.prototype.mediaFeature = function() {
    var localctx = new MediaFeatureContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, LessParser5.RULE_mediaFeature);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 146;
      this.identifier();
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function VariableNameContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_variableName;
    return this;
  }
  VariableNameContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  VariableNameContext.prototype.constructor = VariableNameContext;
  VariableNameContext.prototype.AT = function() {
    return this.getToken(LessParser5.AT, 0);
  };
  VariableNameContext.prototype.variableName = function() {
    return this.getTypedRuleContext(VariableNameContext, 0);
  };
  VariableNameContext.prototype.Identifier = function() {
    return this.getToken(LessParser5.Identifier, 0);
  };
  VariableNameContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterVariableName(this);
    }
  };
  VariableNameContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitVariableName(this);
    }
  };
  LessParser5.VariableNameContext = VariableNameContext;
  LessParser5.prototype.variableName = function() {
    var localctx = new VariableNameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, LessParser5.RULE_variableName);
    try {
      this.state = 152;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 9, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 148;
          this.match(LessParser5.AT);
          this.state = 149;
          this.variableName();
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 150;
          this.match(LessParser5.AT);
          this.state = 151;
          this.match(LessParser5.Identifier);
          break;
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function CommandStatementContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_commandStatement;
    return this;
  }
  CommandStatementContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  CommandStatementContext.prototype.constructor = CommandStatementContext;
  CommandStatementContext.prototype.mathStatement = function() {
    return this.getTypedRuleContext(MathStatementContext, 0);
  };
  CommandStatementContext.prototype.expression = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i);
    }
  };
  CommandStatementContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterCommandStatement(this);
    }
  };
  CommandStatementContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitCommandStatement(this);
    }
  };
  LessParser5.CommandStatementContext = CommandStatementContext;
  LessParser5.prototype.commandStatement = function() {
    var localctx = new CommandStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, LessParser5.RULE_commandStatement);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 155;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      do {
        this.state = 154;
        this.expression();
        this.state = 157;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      } while (_la === LessParser5.InterpolationStart || _la === LessParser5.AT || (_la - 37 & ~31) == 0 && (1 << _la - 37 & (1 << LessParser5.UrlStart - 37 | 1 << LessParser5.Identifier - 37 | 1 << LessParser5.StringLiteral - 37 | 1 << LessParser5.Number - 37 | 1 << LessParser5.Color - 37)) !== 0);
      this.state = 160;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if ((_la & ~31) == 0 && (1 << _la & (1 << LessParser5.PLUS | 1 << LessParser5.TIMES | 1 << LessParser5.DIV | 1 << LessParser5.MINUS | 1 << LessParser5.PERC)) !== 0) {
        this.state = 159;
        this.mathStatement();
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function MathCharacterContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_mathCharacter;
    return this;
  }
  MathCharacterContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  MathCharacterContext.prototype.constructor = MathCharacterContext;
  MathCharacterContext.prototype.TIMES = function() {
    return this.getToken(LessParser5.TIMES, 0);
  };
  MathCharacterContext.prototype.PLUS = function() {
    return this.getToken(LessParser5.PLUS, 0);
  };
  MathCharacterContext.prototype.DIV = function() {
    return this.getToken(LessParser5.DIV, 0);
  };
  MathCharacterContext.prototype.MINUS = function() {
    return this.getToken(LessParser5.MINUS, 0);
  };
  MathCharacterContext.prototype.PERC = function() {
    return this.getToken(LessParser5.PERC, 0);
  };
  MathCharacterContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterMathCharacter(this);
    }
  };
  MathCharacterContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitMathCharacter(this);
    }
  };
  LessParser5.MathCharacterContext = MathCharacterContext;
  LessParser5.prototype.mathCharacter = function() {
    var localctx = new MathCharacterContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, LessParser5.RULE_mathCharacter);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 162;
      _la = this._input.LA(1);
      if (!((_la & ~31) == 0 && (1 << _la & (1 << LessParser5.PLUS | 1 << LessParser5.TIMES | 1 << LessParser5.DIV | 1 << LessParser5.MINUS | 1 << LessParser5.PERC)) !== 0)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);
        this.consume();
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function MathStatementContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_mathStatement;
    return this;
  }
  MathStatementContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  MathStatementContext.prototype.constructor = MathStatementContext;
  MathStatementContext.prototype.mathCharacter = function() {
    return this.getTypedRuleContext(MathCharacterContext, 0);
  };
  MathStatementContext.prototype.commandStatement = function() {
    return this.getTypedRuleContext(CommandStatementContext, 0);
  };
  MathStatementContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterMathStatement(this);
    }
  };
  MathStatementContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitMathStatement(this);
    }
  };
  LessParser5.MathStatementContext = MathStatementContext;
  LessParser5.prototype.mathStatement = function() {
    var localctx = new MathStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, LessParser5.RULE_mathStatement);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 164;
      this.mathCharacter();
      this.state = 165;
      this.commandStatement();
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function ExpressionContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_expression;
    return this;
  }
  ExpressionContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  ExpressionContext.prototype.constructor = ExpressionContext;
  ExpressionContext.prototype.measurement = function() {
    return this.getTypedRuleContext(MeasurementContext, 0);
  };
  ExpressionContext.prototype.identifier = function() {
    return this.getTypedRuleContext(IdentifierContext, 0);
  };
  ExpressionContext.prototype.IMPORTANT = function() {
    return this.getToken(LessParser5.IMPORTANT, 0);
  };
  ExpressionContext.prototype.LPAREN = function() {
    return this.getToken(LessParser5.LPAREN, 0);
  };
  ExpressionContext.prototype.RPAREN = function() {
    return this.getToken(LessParser5.RPAREN, 0);
  };
  ExpressionContext.prototype.values = function() {
    return this.getTypedRuleContext(ValuesContext, 0);
  };
  ExpressionContext.prototype.Color = function() {
    return this.getToken(LessParser5.Color, 0);
  };
  ExpressionContext.prototype.StringLiteral = function() {
    return this.getToken(LessParser5.StringLiteral, 0);
  };
  ExpressionContext.prototype.url = function() {
    return this.getTypedRuleContext(UrlContext, 0);
  };
  ExpressionContext.prototype.variableName = function() {
    return this.getTypedRuleContext(VariableNameContext, 0);
  };
  ExpressionContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterExpression(this);
    }
  };
  ExpressionContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitExpression(this);
    }
  };
  LessParser5.ExpressionContext = ExpressionContext;
  LessParser5.prototype.expression = function() {
    var localctx = new ExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, LessParser5.RULE_expression);
    var _la = 0;
    try {
      this.state = 188;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 13, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 167;
          this.measurement();
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 168;
          this.identifier();
          this.state = 169;
          this.match(LessParser5.IMPORTANT);
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          this.state = 171;
          this.identifier();
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          this.state = 172;
          this.identifier();
          this.state = 173;
          this.match(LessParser5.LPAREN);
          this.state = 175;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          if (_la === LessParser5.InterpolationStart || _la === LessParser5.AT || (_la - 37 & ~31) == 0 && (1 << _la - 37 & (1 << LessParser5.UrlStart - 37 | 1 << LessParser5.Identifier - 37 | 1 << LessParser5.StringLiteral - 37 | 1 << LessParser5.Number - 37 | 1 << LessParser5.Color - 37)) !== 0) {
            this.state = 174;
            this.values();
          }
          this.state = 177;
          this.match(LessParser5.RPAREN);
          break;
        case 5:
          this.enterOuterAlt(localctx, 5);
          this.state = 179;
          this.match(LessParser5.Color);
          this.state = 180;
          this.match(LessParser5.IMPORTANT);
          break;
        case 6:
          this.enterOuterAlt(localctx, 6);
          this.state = 181;
          this.match(LessParser5.Color);
          break;
        case 7:
          this.enterOuterAlt(localctx, 7);
          this.state = 182;
          this.match(LessParser5.StringLiteral);
          break;
        case 8:
          this.enterOuterAlt(localctx, 8);
          this.state = 183;
          this.url();
          break;
        case 9:
          this.enterOuterAlt(localctx, 9);
          this.state = 184;
          this.variableName();
          this.state = 185;
          this.match(LessParser5.IMPORTANT);
          break;
        case 10:
          this.enterOuterAlt(localctx, 10);
          this.state = 187;
          this.variableName();
          break;
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function FunctionContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_function;
    return this;
  }
  FunctionContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  FunctionContext.prototype.constructor = FunctionContext;
  FunctionContext.prototype.FUNCTION_NAME = function() {
    return this.getToken(LessParser5.FUNCTION_NAME, 0);
  };
  FunctionContext.prototype.LPAREN = function() {
    return this.getToken(LessParser5.LPAREN, 0);
  };
  FunctionContext.prototype.RPAREN = function() {
    return this.getToken(LessParser5.RPAREN, 0);
  };
  FunctionContext.prototype.values = function() {
    return this.getTypedRuleContext(ValuesContext, 0);
  };
  FunctionContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterFunction(this);
    }
  };
  FunctionContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitFunction(this);
    }
  };
  LessParser5.FunctionContext = FunctionContext;
  LessParser5.prototype.function = function() {
    var localctx = new FunctionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, LessParser5.RULE_function);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 190;
      this.match(LessParser5.FUNCTION_NAME);
      this.state = 191;
      this.match(LessParser5.LPAREN);
      this.state = 193;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === LessParser5.InterpolationStart || _la === LessParser5.AT || (_la - 37 & ~31) == 0 && (1 << _la - 37 & (1 << LessParser5.UrlStart - 37 | 1 << LessParser5.Identifier - 37 | 1 << LessParser5.StringLiteral - 37 | 1 << LessParser5.Number - 37 | 1 << LessParser5.Color - 37)) !== 0) {
        this.state = 192;
        this.values();
      }
      this.state = 195;
      this.match(LessParser5.RPAREN);
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function ConditionsContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_conditions;
    return this;
  }
  ConditionsContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  ConditionsContext.prototype.constructor = ConditionsContext;
  ConditionsContext.prototype.condition = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(ConditionContext);
    } else {
      return this.getTypedRuleContext(ConditionContext, i);
    }
  };
  ConditionsContext.prototype.AND = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(LessParser5.AND);
    } else {
      return this.getToken(LessParser5.AND, i);
    }
  };
  ConditionsContext.prototype.COMMA = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(LessParser5.COMMA);
    } else {
      return this.getToken(LessParser5.COMMA, i);
    }
  };
  ConditionsContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterConditions(this);
    }
  };
  ConditionsContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitConditions(this);
    }
  };
  LessParser5.ConditionsContext = ConditionsContext;
  LessParser5.prototype.conditions = function() {
    var localctx = new ConditionsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, LessParser5.RULE_conditions);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 197;
      this.condition();
      this.state = 202;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === LessParser5.COMMA || _la === LessParser5.AND) {
        this.state = 198;
        _la = this._input.LA(1);
        if (!(_la === LessParser5.COMMA || _la === LessParser5.AND)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);
          this.consume();
        }
        this.state = 199;
        this.condition();
        this.state = 204;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function ConditionContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_condition;
    return this;
  }
  ConditionContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  ConditionContext.prototype.constructor = ConditionContext;
  ConditionContext.prototype.LPAREN = function() {
    return this.getToken(LessParser5.LPAREN, 0);
  };
  ConditionContext.prototype.conditionStatement = function() {
    return this.getTypedRuleContext(ConditionStatementContext, 0);
  };
  ConditionContext.prototype.RPAREN = function() {
    return this.getToken(LessParser5.RPAREN, 0);
  };
  ConditionContext.prototype.NOT = function() {
    return this.getToken(LessParser5.NOT, 0);
  };
  ConditionContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterCondition(this);
    }
  };
  ConditionContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitCondition(this);
    }
  };
  LessParser5.ConditionContext = ConditionContext;
  LessParser5.prototype.condition = function() {
    var localctx = new ConditionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, LessParser5.RULE_condition);
    try {
      this.state = 214;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case LessParser5.LPAREN:
          this.enterOuterAlt(localctx, 1);
          this.state = 205;
          this.match(LessParser5.LPAREN);
          this.state = 206;
          this.conditionStatement();
          this.state = 207;
          this.match(LessParser5.RPAREN);
          break;
        case LessParser5.NOT:
          this.enterOuterAlt(localctx, 2);
          this.state = 209;
          this.match(LessParser5.NOT);
          this.state = 210;
          this.match(LessParser5.LPAREN);
          this.state = 211;
          this.conditionStatement();
          this.state = 212;
          this.match(LessParser5.RPAREN);
          break;
        default:
          throw new antlr45.error.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function ConditionStatementContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_conditionStatement;
    return this;
  }
  ConditionStatementContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  ConditionStatementContext.prototype.constructor = ConditionStatementContext;
  ConditionStatementContext.prototype.commandStatement = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(CommandStatementContext);
    } else {
      return this.getTypedRuleContext(CommandStatementContext, i);
    }
  };
  ConditionStatementContext.prototype.EQ = function() {
    return this.getToken(LessParser5.EQ, 0);
  };
  ConditionStatementContext.prototype.LT = function() {
    return this.getToken(LessParser5.LT, 0);
  };
  ConditionStatementContext.prototype.GT = function() {
    return this.getToken(LessParser5.GT, 0);
  };
  ConditionStatementContext.prototype.GTEQ = function() {
    return this.getToken(LessParser5.GTEQ, 0);
  };
  ConditionStatementContext.prototype.LTEQ = function() {
    return this.getToken(LessParser5.LTEQ, 0);
  };
  ConditionStatementContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterConditionStatement(this);
    }
  };
  ConditionStatementContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitConditionStatement(this);
    }
  };
  LessParser5.ConditionStatementContext = ConditionStatementContext;
  LessParser5.prototype.conditionStatement = function() {
    var localctx = new ConditionStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, LessParser5.RULE_conditionStatement);
    var _la = 0;
    try {
      this.state = 221;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 17, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 216;
          this.commandStatement();
          this.state = 217;
          _la = this._input.LA(1);
          if (!((_la - 12 & ~31) == 0 && (1 << _la - 12 & (1 << LessParser5.GT - 12 | 1 << LessParser5.LT - 12 | 1 << LessParser5.GTEQ - 12 | 1 << LessParser5.LTEQ - 12 | 1 << LessParser5.EQ - 12)) !== 0)) {
            this._errHandler.recoverInline(this);
          } else {
            this._errHandler.reportMatch(this);
            this.consume();
          }
          this.state = 218;
          this.commandStatement();
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 220;
          this.commandStatement();
          break;
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function VariableDeclarationContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_variableDeclaration;
    return this;
  }
  VariableDeclarationContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  VariableDeclarationContext.prototype.constructor = VariableDeclarationContext;
  VariableDeclarationContext.prototype.variableName = function() {
    return this.getTypedRuleContext(VariableNameContext, 0);
  };
  VariableDeclarationContext.prototype.COLON = function() {
    return this.getToken(LessParser5.COLON, 0);
  };
  VariableDeclarationContext.prototype.values = function() {
    return this.getTypedRuleContext(ValuesContext, 0);
  };
  VariableDeclarationContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterVariableDeclaration(this);
    }
  };
  VariableDeclarationContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitVariableDeclaration(this);
    }
  };
  LessParser5.VariableDeclarationContext = VariableDeclarationContext;
  LessParser5.prototype.variableDeclaration = function() {
    var localctx = new VariableDeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, LessParser5.RULE_variableDeclaration);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 223;
      this.variableName();
      this.state = 224;
      this.match(LessParser5.COLON);
      this.state = 225;
      this.values();
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function ImportDeclarationContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_importDeclaration;
    return this;
  }
  ImportDeclarationContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  ImportDeclarationContext.prototype.constructor = ImportDeclarationContext;
  ImportDeclarationContext.prototype.IMPORT = function() {
    return this.getToken(LessParser5.IMPORT, 0);
  };
  ImportDeclarationContext.prototype.referenceUrl = function() {
    return this.getTypedRuleContext(ReferenceUrlContext, 0);
  };
  ImportDeclarationContext.prototype.SEMI = function() {
    return this.getToken(LessParser5.SEMI, 0);
  };
  ImportDeclarationContext.prototype.LPAREN = function() {
    return this.getToken(LessParser5.LPAREN, 0);
  };
  ImportDeclarationContext.prototype.RPAREN = function() {
    return this.getToken(LessParser5.RPAREN, 0);
  };
  ImportDeclarationContext.prototype.mediaTypes = function() {
    return this.getTypedRuleContext(MediaTypesContext, 0);
  };
  ImportDeclarationContext.prototype.importOption = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(ImportOptionContext);
    } else {
      return this.getTypedRuleContext(ImportOptionContext, i);
    }
  };
  ImportDeclarationContext.prototype.COMMA = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(LessParser5.COMMA);
    } else {
      return this.getToken(LessParser5.COMMA, i);
    }
  };
  ImportDeclarationContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterImportDeclaration(this);
    }
  };
  ImportDeclarationContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitImportDeclaration(this);
    }
  };
  LessParser5.ImportDeclarationContext = ImportDeclarationContext;
  LessParser5.prototype.importDeclaration = function() {
    var localctx = new ImportDeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, LessParser5.RULE_importDeclaration);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 227;
      this.match(LessParser5.IMPORT);
      this.state = 239;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === LessParser5.LPAREN) {
        this.state = 228;
        this.match(LessParser5.LPAREN);
        this.state = 229;
        this.importOption();
        this.state = 234;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === LessParser5.COMMA) {
          this.state = 230;
          this.match(LessParser5.COMMA);
          this.state = 231;
          this.importOption();
          this.state = 236;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 237;
        this.match(LessParser5.RPAREN);
      }
      this.state = 241;
      this.referenceUrl();
      this.state = 243;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === LessParser5.Identifier) {
        this.state = 242;
        this.mediaTypes();
      }
      this.state = 245;
      this.match(LessParser5.SEMI);
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function ImportOptionContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_importOption;
    return this;
  }
  ImportOptionContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  ImportOptionContext.prototype.constructor = ImportOptionContext;
  ImportOptionContext.prototype.REFERENCE = function() {
    return this.getToken(LessParser5.REFERENCE, 0);
  };
  ImportOptionContext.prototype.INLINE = function() {
    return this.getToken(LessParser5.INLINE, 0);
  };
  ImportOptionContext.prototype.LESS = function() {
    return this.getToken(LessParser5.LESS, 0);
  };
  ImportOptionContext.prototype.CSS = function() {
    return this.getToken(LessParser5.CSS, 0);
  };
  ImportOptionContext.prototype.ONCE = function() {
    return this.getToken(LessParser5.ONCE, 0);
  };
  ImportOptionContext.prototype.MULTIPLE = function() {
    return this.getToken(LessParser5.MULTIPLE, 0);
  };
  ImportOptionContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterImportOption(this);
    }
  };
  ImportOptionContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitImportOption(this);
    }
  };
  LessParser5.ImportOptionContext = ImportOptionContext;
  LessParser5.prototype.importOption = function() {
    var localctx = new ImportOptionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, LessParser5.RULE_importOption);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 247;
      _la = this._input.LA(1);
      if (!((_la - 45 & ~31) == 0 && (1 << _la - 45 & (1 << LessParser5.REFERENCE - 45 | 1 << LessParser5.INLINE - 45 | 1 << LessParser5.LESS - 45 | 1 << LessParser5.CSS - 45 | 1 << LessParser5.ONCE - 45 | 1 << LessParser5.MULTIPLE - 45)) !== 0)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);
        this.consume();
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function ReferenceUrlContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_referenceUrl;
    return this;
  }
  ReferenceUrlContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  ReferenceUrlContext.prototype.constructor = ReferenceUrlContext;
  ReferenceUrlContext.prototype.StringLiteral = function() {
    return this.getToken(LessParser5.StringLiteral, 0);
  };
  ReferenceUrlContext.prototype.UrlStart = function() {
    return this.getToken(LessParser5.UrlStart, 0);
  };
  ReferenceUrlContext.prototype.Url = function() {
    return this.getToken(LessParser5.Url, 0);
  };
  ReferenceUrlContext.prototype.UrlEnd = function() {
    return this.getToken(LessParser5.UrlEnd, 0);
  };
  ReferenceUrlContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterReferenceUrl(this);
    }
  };
  ReferenceUrlContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitReferenceUrl(this);
    }
  };
  LessParser5.ReferenceUrlContext = ReferenceUrlContext;
  LessParser5.prototype.referenceUrl = function() {
    var localctx = new ReferenceUrlContext(this, this._ctx, this.state);
    this.enterRule(localctx, 40, LessParser5.RULE_referenceUrl);
    try {
      this.state = 253;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case LessParser5.StringLiteral:
          this.enterOuterAlt(localctx, 1);
          this.state = 249;
          this.match(LessParser5.StringLiteral);
          break;
        case LessParser5.UrlStart:
          this.enterOuterAlt(localctx, 2);
          this.state = 250;
          this.match(LessParser5.UrlStart);
          this.state = 251;
          this.match(LessParser5.Url);
          this.state = 252;
          this.match(LessParser5.UrlEnd);
          break;
        default:
          throw new antlr45.error.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function MediaTypesContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_mediaTypes;
    return this;
  }
  MediaTypesContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  MediaTypesContext.prototype.constructor = MediaTypesContext;
  MediaTypesContext.prototype.Identifier = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(LessParser5.Identifier);
    } else {
      return this.getToken(LessParser5.Identifier, i);
    }
  };
  MediaTypesContext.prototype.COMMA = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(LessParser5.COMMA);
    } else {
      return this.getToken(LessParser5.COMMA, i);
    }
  };
  MediaTypesContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterMediaTypes(this);
    }
  };
  MediaTypesContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitMediaTypes(this);
    }
  };
  LessParser5.MediaTypesContext = MediaTypesContext;
  LessParser5.prototype.mediaTypes = function() {
    var localctx = new MediaTypesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 42, LessParser5.RULE_mediaTypes);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 255;
      this.match(LessParser5.Identifier);
      this.state = 260;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === LessParser5.COMMA) {
        this.state = 256;
        this.match(LessParser5.COMMA);
        this.state = 257;
        this.match(LessParser5.Identifier);
        this.state = 262;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function RulesetContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_ruleset;
    return this;
  }
  RulesetContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  RulesetContext.prototype.constructor = RulesetContext;
  RulesetContext.prototype.selectors = function() {
    return this.getTypedRuleContext(SelectorsContext, 0);
  };
  RulesetContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext, 0);
  };
  RulesetContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterRuleset(this);
    }
  };
  RulesetContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitRuleset(this);
    }
  };
  LessParser5.RulesetContext = RulesetContext;
  LessParser5.prototype.ruleset = function() {
    var localctx = new RulesetContext(this, this._ctx, this.state);
    this.enterRule(localctx, 44, LessParser5.RULE_ruleset);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 263;
      this.selectors();
      this.state = 264;
      this.block();
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function BlockContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_block;
    return this;
  }
  BlockContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  BlockContext.prototype.constructor = BlockContext;
  BlockContext.prototype.BlockStart = function() {
    return this.getToken(LessParser5.BlockStart, 0);
  };
  BlockContext.prototype.BlockEnd = function() {
    return this.getToken(LessParser5.BlockEnd, 0);
  };
  BlockContext.prototype.property = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(PropertyContext);
    } else {
      return this.getTypedRuleContext(PropertyContext, i);
    }
  };
  BlockContext.prototype.SEMI = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(LessParser5.SEMI);
    } else {
      return this.getToken(LessParser5.SEMI, i);
    }
  };
  BlockContext.prototype.statement = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(StatementContext);
    } else {
      return this.getTypedRuleContext(StatementContext, i);
    }
  };
  BlockContext.prototype.mixinReference = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(MixinReferenceContext);
    } else {
      return this.getTypedRuleContext(MixinReferenceContext, i);
    }
  };
  BlockContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterBlock(this);
    }
  };
  BlockContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitBlock(this);
    }
  };
  LessParser5.BlockContext = BlockContext;
  LessParser5.prototype.block = function() {
    var localctx = new BlockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 46, LessParser5.RULE_block);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 266;
      this.match(LessParser5.BlockStart);
      this.state = 274;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 24, this._ctx);
      while (_alt != 2 && _alt != antlr45.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          this.state = 272;
          this._errHandler.sync(this);
          var la_ = this._interp.adaptivePredict(this._input, 23, this._ctx);
          switch (la_) {
            case 1:
              this.state = 267;
              this.property();
              this.state = 268;
              this.match(LessParser5.SEMI);
              break;
            case 2:
              this.state = 270;
              this.statement();
              break;
            case 3:
              this.state = 271;
              this.mixinReference();
              break;
          }
        }
        this.state = 276;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 24, this._ctx);
      }
      this.state = 278;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === LessParser5.InterpolationStart || _la === LessParser5.Identifier) {
        this.state = 277;
        this.property();
      }
      this.state = 280;
      this.match(LessParser5.BlockEnd);
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function MixinDefinitionContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_mixinDefinition;
    return this;
  }
  MixinDefinitionContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  MixinDefinitionContext.prototype.constructor = MixinDefinitionContext;
  MixinDefinitionContext.prototype.selectors = function() {
    return this.getTypedRuleContext(SelectorsContext, 0);
  };
  MixinDefinitionContext.prototype.LPAREN = function() {
    return this.getToken(LessParser5.LPAREN, 0);
  };
  MixinDefinitionContext.prototype.RPAREN = function() {
    return this.getToken(LessParser5.RPAREN, 0);
  };
  MixinDefinitionContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext, 0);
  };
  MixinDefinitionContext.prototype.mixinDefinitionParam = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(MixinDefinitionParamContext);
    } else {
      return this.getTypedRuleContext(MixinDefinitionParamContext, i);
    }
  };
  MixinDefinitionContext.prototype.Ellipsis = function() {
    return this.getToken(LessParser5.Ellipsis, 0);
  };
  MixinDefinitionContext.prototype.mixinGuard = function() {
    return this.getTypedRuleContext(MixinGuardContext, 0);
  };
  MixinDefinitionContext.prototype.SEMI = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(LessParser5.SEMI);
    } else {
      return this.getToken(LessParser5.SEMI, i);
    }
  };
  MixinDefinitionContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterMixinDefinition(this);
    }
  };
  MixinDefinitionContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitMixinDefinition(this);
    }
  };
  LessParser5.MixinDefinitionContext = MixinDefinitionContext;
  LessParser5.prototype.mixinDefinition = function() {
    var localctx = new MixinDefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 48, LessParser5.RULE_mixinDefinition);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 282;
      this.selectors();
      this.state = 283;
      this.match(LessParser5.LPAREN);
      this.state = 292;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === LessParser5.AT) {
        this.state = 284;
        this.mixinDefinitionParam();
        this.state = 289;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === LessParser5.SEMI) {
          this.state = 285;
          this.match(LessParser5.SEMI);
          this.state = 286;
          this.mixinDefinitionParam();
          this.state = 291;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
      this.state = 295;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === LessParser5.Ellipsis) {
        this.state = 294;
        this.match(LessParser5.Ellipsis);
      }
      this.state = 297;
      this.match(LessParser5.RPAREN);
      this.state = 299;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === LessParser5.WHEN) {
        this.state = 298;
        this.mixinGuard();
      }
      this.state = 301;
      this.block();
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function MixinGuardContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_mixinGuard;
    return this;
  }
  MixinGuardContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  MixinGuardContext.prototype.constructor = MixinGuardContext;
  MixinGuardContext.prototype.WHEN = function() {
    return this.getToken(LessParser5.WHEN, 0);
  };
  MixinGuardContext.prototype.conditions = function() {
    return this.getTypedRuleContext(ConditionsContext, 0);
  };
  MixinGuardContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterMixinGuard(this);
    }
  };
  MixinGuardContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitMixinGuard(this);
    }
  };
  LessParser5.MixinGuardContext = MixinGuardContext;
  LessParser5.prototype.mixinGuard = function() {
    var localctx = new MixinGuardContext(this, this._ctx, this.state);
    this.enterRule(localctx, 50, LessParser5.RULE_mixinGuard);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 303;
      this.match(LessParser5.WHEN);
      this.state = 304;
      this.conditions();
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function MixinDefinitionParamContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_mixinDefinitionParam;
    return this;
  }
  MixinDefinitionParamContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  MixinDefinitionParamContext.prototype.constructor = MixinDefinitionParamContext;
  MixinDefinitionParamContext.prototype.variableName = function() {
    return this.getTypedRuleContext(VariableNameContext, 0);
  };
  MixinDefinitionParamContext.prototype.variableDeclaration = function() {
    return this.getTypedRuleContext(VariableDeclarationContext, 0);
  };
  MixinDefinitionParamContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterMixinDefinitionParam(this);
    }
  };
  MixinDefinitionParamContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitMixinDefinitionParam(this);
    }
  };
  LessParser5.MixinDefinitionParamContext = MixinDefinitionParamContext;
  LessParser5.prototype.mixinDefinitionParam = function() {
    var localctx = new MixinDefinitionParamContext(this, this._ctx, this.state);
    this.enterRule(localctx, 52, LessParser5.RULE_mixinDefinitionParam);
    try {
      this.state = 308;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 30, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 306;
          this.variableName();
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 307;
          this.variableDeclaration();
          break;
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function MixinReferenceContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_mixinReference;
    return this;
  }
  MixinReferenceContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  MixinReferenceContext.prototype.constructor = MixinReferenceContext;
  MixinReferenceContext.prototype.selector = function() {
    return this.getTypedRuleContext(SelectorContext, 0);
  };
  MixinReferenceContext.prototype.LPAREN = function() {
    return this.getToken(LessParser5.LPAREN, 0);
  };
  MixinReferenceContext.prototype.RPAREN = function() {
    return this.getToken(LessParser5.RPAREN, 0);
  };
  MixinReferenceContext.prototype.SEMI = function() {
    return this.getToken(LessParser5.SEMI, 0);
  };
  MixinReferenceContext.prototype.values = function() {
    return this.getTypedRuleContext(ValuesContext, 0);
  };
  MixinReferenceContext.prototype.IMPORTANT = function() {
    return this.getToken(LessParser5.IMPORTANT, 0);
  };
  MixinReferenceContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterMixinReference(this);
    }
  };
  MixinReferenceContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitMixinReference(this);
    }
  };
  LessParser5.MixinReferenceContext = MixinReferenceContext;
  LessParser5.prototype.mixinReference = function() {
    var localctx = new MixinReferenceContext(this, this._ctx, this.state);
    this.enterRule(localctx, 54, LessParser5.RULE_mixinReference);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 310;
      this.selector();
      this.state = 311;
      this.match(LessParser5.LPAREN);
      this.state = 313;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === LessParser5.InterpolationStart || _la === LessParser5.AT || (_la - 37 & ~31) == 0 && (1 << _la - 37 & (1 << LessParser5.UrlStart - 37 | 1 << LessParser5.Identifier - 37 | 1 << LessParser5.StringLiteral - 37 | 1 << LessParser5.Number - 37 | 1 << LessParser5.Color - 37)) !== 0) {
        this.state = 312;
        this.values();
      }
      this.state = 315;
      this.match(LessParser5.RPAREN);
      this.state = 317;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === LessParser5.IMPORTANT) {
        this.state = 316;
        this.match(LessParser5.IMPORTANT);
      }
      this.state = 319;
      this.match(LessParser5.SEMI);
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function SelectorsContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_selectors;
    return this;
  }
  SelectorsContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  SelectorsContext.prototype.constructor = SelectorsContext;
  SelectorsContext.prototype.selector = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(SelectorContext);
    } else {
      return this.getTypedRuleContext(SelectorContext, i);
    }
  };
  SelectorsContext.prototype.COMMA = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(LessParser5.COMMA);
    } else {
      return this.getToken(LessParser5.COMMA, i);
    }
  };
  SelectorsContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterSelectors(this);
    }
  };
  SelectorsContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitSelectors(this);
    }
  };
  LessParser5.SelectorsContext = SelectorsContext;
  LessParser5.prototype.selectors = function() {
    var localctx = new SelectorsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 56, LessParser5.RULE_selectors);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 321;
      this.selector();
      this.state = 326;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === LessParser5.COMMA) {
        this.state = 322;
        this.match(LessParser5.COMMA);
        this.state = 323;
        this.selector();
        this.state = 328;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function SelectorContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_selector;
    return this;
  }
  SelectorContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  SelectorContext.prototype.constructor = SelectorContext;
  SelectorContext.prototype.element = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(ElementContext);
    } else {
      return this.getTypedRuleContext(ElementContext, i);
    }
  };
  SelectorContext.prototype.attrib = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(AttribContext);
    } else {
      return this.getTypedRuleContext(AttribContext, i);
    }
  };
  SelectorContext.prototype.pseudo = function() {
    return this.getTypedRuleContext(PseudoContext, 0);
  };
  SelectorContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterSelector(this);
    }
  };
  SelectorContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitSelector(this);
    }
  };
  LessParser5.SelectorContext = SelectorContext;
  LessParser5.prototype.selector = function() {
    var localctx = new SelectorContext(this, this._ctx, this.state);
    this.enterRule(localctx, 58, LessParser5.RULE_selector);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 330;
      this._errHandler.sync(this);
      var _alt = 1;
      do {
        switch (_alt) {
          case 1:
            this.state = 329;
            this.element();
            break;
          default:
            throw new antlr45.error.NoViableAltException(this);
        }
        this.state = 332;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 34, this._ctx);
      } while (_alt != 2 && _alt != antlr45.atn.ATN.INVALID_ALT_NUMBER);
      this.state = 337;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === LessParser5.LBRACK) {
        this.state = 334;
        this.attrib();
        this.state = 339;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 341;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === LessParser5.COLON || _la === LessParser5.COLONCOLON) {
        this.state = 340;
        this.pseudo();
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function AttribContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_attrib;
    return this;
  }
  AttribContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  AttribContext.prototype.constructor = AttribContext;
  AttribContext.prototype.LBRACK = function() {
    return this.getToken(LessParser5.LBRACK, 0);
  };
  AttribContext.prototype.Identifier = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(LessParser5.Identifier);
    } else {
      return this.getToken(LessParser5.Identifier, i);
    }
  };
  AttribContext.prototype.RBRACK = function() {
    return this.getToken(LessParser5.RBRACK, 0);
  };
  AttribContext.prototype.attribRelate = function() {
    return this.getTypedRuleContext(AttribRelateContext, 0);
  };
  AttribContext.prototype.StringLiteral = function() {
    return this.getToken(LessParser5.StringLiteral, 0);
  };
  AttribContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterAttrib(this);
    }
  };
  AttribContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitAttrib(this);
    }
  };
  LessParser5.AttribContext = AttribContext;
  LessParser5.prototype.attrib = function() {
    var localctx = new AttribContext(this, this._ctx, this.state);
    this.enterRule(localctx, 60, LessParser5.RULE_attrib);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 343;
      this.match(LessParser5.LBRACK);
      this.state = 344;
      this.match(LessParser5.Identifier);
      this.state = 348;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if ((_la - 33 & ~31) == 0 && (1 << _la - 33 & (1 << LessParser5.EQ - 33 | 1 << LessParser5.PIPE_EQ - 33 | 1 << LessParser5.TILD_EQ - 33)) !== 0) {
        this.state = 345;
        this.attribRelate();
        this.state = 346;
        _la = this._input.LA(1);
        if (!(_la === LessParser5.Identifier || _la === LessParser5.StringLiteral)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
      this.state = 350;
      this.match(LessParser5.RBRACK);
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function NegationContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_negation;
    return this;
  }
  NegationContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  NegationContext.prototype.constructor = NegationContext;
  NegationContext.prototype.COLON = function() {
    return this.getToken(LessParser5.COLON, 0);
  };
  NegationContext.prototype.NOT = function() {
    return this.getToken(LessParser5.NOT, 0);
  };
  NegationContext.prototype.LPAREN = function() {
    return this.getToken(LessParser5.LPAREN, 0);
  };
  NegationContext.prototype.selectors = function() {
    return this.getTypedRuleContext(SelectorsContext, 0);
  };
  NegationContext.prototype.RPAREN = function() {
    return this.getToken(LessParser5.RPAREN, 0);
  };
  NegationContext.prototype.LBRACK = function() {
    return this.getToken(LessParser5.LBRACK, 0);
  };
  NegationContext.prototype.RBRACK = function() {
    return this.getToken(LessParser5.RBRACK, 0);
  };
  NegationContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterNegation(this);
    }
  };
  NegationContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitNegation(this);
    }
  };
  LessParser5.NegationContext = NegationContext;
  LessParser5.prototype.negation = function() {
    var localctx = new NegationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 62, LessParser5.RULE_negation);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 352;
      this.match(LessParser5.COLON);
      this.state = 353;
      this.match(LessParser5.NOT);
      this.state = 354;
      this.match(LessParser5.LPAREN);
      this.state = 356;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === LessParser5.LBRACK) {
        this.state = 355;
        this.match(LessParser5.LBRACK);
      }
      this.state = 358;
      this.selectors();
      this.state = 360;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === LessParser5.RBRACK) {
        this.state = 359;
        this.match(LessParser5.RBRACK);
      }
      this.state = 362;
      this.match(LessParser5.RPAREN);
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function PseudoContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_pseudo;
    return this;
  }
  PseudoContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  PseudoContext.prototype.constructor = PseudoContext;
  PseudoContext.prototype.Identifier = function() {
    return this.getToken(LessParser5.Identifier, 0);
  };
  PseudoContext.prototype.COLON = function() {
    return this.getToken(LessParser5.COLON, 0);
  };
  PseudoContext.prototype.COLONCOLON = function() {
    return this.getToken(LessParser5.COLONCOLON, 0);
  };
  PseudoContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterPseudo(this);
    }
  };
  PseudoContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitPseudo(this);
    }
  };
  LessParser5.PseudoContext = PseudoContext;
  LessParser5.prototype.pseudo = function() {
    var localctx = new PseudoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 64, LessParser5.RULE_pseudo);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 364;
      _la = this._input.LA(1);
      if (!(_la === LessParser5.COLON || _la === LessParser5.COLONCOLON)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);
        this.consume();
      }
      this.state = 365;
      this.match(LessParser5.Identifier);
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function ElementContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_element;
    return this;
  }
  ElementContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  ElementContext.prototype.constructor = ElementContext;
  ElementContext.prototype.selectorPrefix = function() {
    return this.getTypedRuleContext(SelectorPrefixContext, 0);
  };
  ElementContext.prototype.identifier = function() {
    return this.getTypedRuleContext(IdentifierContext, 0);
  };
  ElementContext.prototype.HASH = function() {
    return this.getToken(LessParser5.HASH, 0);
  };
  ElementContext.prototype.pseudo = function() {
    return this.getTypedRuleContext(PseudoContext, 0);
  };
  ElementContext.prototype.negation = function() {
    return this.getTypedRuleContext(NegationContext, 0);
  };
  ElementContext.prototype.PARENTREF = function() {
    return this.getToken(LessParser5.PARENTREF, 0);
  };
  ElementContext.prototype.TIMES = function() {
    return this.getToken(LessParser5.TIMES, 0);
  };
  ElementContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterElement(this);
    }
  };
  ElementContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitElement(this);
    }
  };
  LessParser5.ElementContext = ElementContext;
  LessParser5.prototype.element = function() {
    var localctx = new ElementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 66, LessParser5.RULE_element);
    try {
      this.state = 377;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 40, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 367;
          this.selectorPrefix();
          this.state = 368;
          this.identifier();
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 370;
          this.identifier();
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          this.state = 371;
          this.match(LessParser5.HASH);
          this.state = 372;
          this.identifier();
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          this.state = 373;
          this.pseudo();
          break;
        case 5:
          this.enterOuterAlt(localctx, 5);
          this.state = 374;
          this.negation();
          break;
        case 6:
          this.enterOuterAlt(localctx, 6);
          this.state = 375;
          this.match(LessParser5.PARENTREF);
          break;
        case 7:
          this.enterOuterAlt(localctx, 7);
          this.state = 376;
          this.match(LessParser5.TIMES);
          break;
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function SelectorPrefixContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_selectorPrefix;
    return this;
  }
  SelectorPrefixContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  SelectorPrefixContext.prototype.constructor = SelectorPrefixContext;
  SelectorPrefixContext.prototype.GT = function() {
    return this.getToken(LessParser5.GT, 0);
  };
  SelectorPrefixContext.prototype.PLUS = function() {
    return this.getToken(LessParser5.PLUS, 0);
  };
  SelectorPrefixContext.prototype.TIL = function() {
    return this.getToken(LessParser5.TIL, 0);
  };
  SelectorPrefixContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterSelectorPrefix(this);
    }
  };
  SelectorPrefixContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitSelectorPrefix(this);
    }
  };
  LessParser5.SelectorPrefixContext = SelectorPrefixContext;
  LessParser5.prototype.selectorPrefix = function() {
    var localctx = new SelectorPrefixContext(this, this._ctx, this.state);
    this.enterRule(localctx, 68, LessParser5.RULE_selectorPrefix);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 379;
      _la = this._input.LA(1);
      if (!((_la & ~31) == 0 && (1 << _la & (1 << LessParser5.GT | 1 << LessParser5.TIL | 1 << LessParser5.PLUS)) !== 0)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);
        this.consume();
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function AttribRelateContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_attribRelate;
    return this;
  }
  AttribRelateContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  AttribRelateContext.prototype.constructor = AttribRelateContext;
  AttribRelateContext.prototype.EQ = function() {
    return this.getToken(LessParser5.EQ, 0);
  };
  AttribRelateContext.prototype.TILD_EQ = function() {
    return this.getToken(LessParser5.TILD_EQ, 0);
  };
  AttribRelateContext.prototype.PIPE_EQ = function() {
    return this.getToken(LessParser5.PIPE_EQ, 0);
  };
  AttribRelateContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterAttribRelate(this);
    }
  };
  AttribRelateContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitAttribRelate(this);
    }
  };
  LessParser5.AttribRelateContext = AttribRelateContext;
  LessParser5.prototype.attribRelate = function() {
    var localctx = new AttribRelateContext(this, this._ctx, this.state);
    this.enterRule(localctx, 70, LessParser5.RULE_attribRelate);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 381;
      _la = this._input.LA(1);
      if (!((_la - 33 & ~31) == 0 && (1 << _la - 33 & (1 << LessParser5.EQ - 33 | 1 << LessParser5.PIPE_EQ - 33 | 1 << LessParser5.TILD_EQ - 33)) !== 0)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);
        this.consume();
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function IdentifierContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_identifier;
    return this;
  }
  IdentifierContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  IdentifierContext.prototype.constructor = IdentifierContext;
  IdentifierContext.prototype.Identifier = function() {
    return this.getToken(LessParser5.Identifier, 0);
  };
  IdentifierContext.prototype.identifierPart = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(IdentifierPartContext);
    } else {
      return this.getTypedRuleContext(IdentifierPartContext, i);
    }
  };
  IdentifierContext.prototype.InterpolationStart = function() {
    return this.getToken(LessParser5.InterpolationStart, 0);
  };
  IdentifierContext.prototype.identifierVariableName = function() {
    return this.getTypedRuleContext(IdentifierVariableNameContext, 0);
  };
  IdentifierContext.prototype.BlockEnd = function() {
    return this.getToken(LessParser5.BlockEnd, 0);
  };
  IdentifierContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterIdentifier(this);
    }
  };
  IdentifierContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitIdentifier(this);
    }
  };
  LessParser5.IdentifierContext = IdentifierContext;
  LessParser5.prototype.identifier = function() {
    var localctx = new IdentifierContext(this, this._ctx, this.state);
    this.enterRule(localctx, 72, LessParser5.RULE_identifier);
    var _la = 0;
    try {
      this.state = 399;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case LessParser5.Identifier:
          this.enterOuterAlt(localctx, 1);
          this.state = 383;
          this.match(LessParser5.Identifier);
          this.state = 387;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          while (_la === LessParser5.InterpolationStartAfter || _la === LessParser5.IdentifierAfter) {
            this.state = 384;
            this.identifierPart();
            this.state = 389;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
          }
          break;
        case LessParser5.InterpolationStart:
          this.enterOuterAlt(localctx, 2);
          this.state = 390;
          this.match(LessParser5.InterpolationStart);
          this.state = 391;
          this.identifierVariableName();
          this.state = 392;
          this.match(LessParser5.BlockEnd);
          this.state = 396;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          while (_la === LessParser5.InterpolationStartAfter || _la === LessParser5.IdentifierAfter) {
            this.state = 393;
            this.identifierPart();
            this.state = 398;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
          }
          break;
        default:
          throw new antlr45.error.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function IdentifierPartContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_identifierPart;
    return this;
  }
  IdentifierPartContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  IdentifierPartContext.prototype.constructor = IdentifierPartContext;
  IdentifierPartContext.prototype.InterpolationStartAfter = function() {
    return this.getToken(LessParser5.InterpolationStartAfter, 0);
  };
  IdentifierPartContext.prototype.identifierVariableName = function() {
    return this.getTypedRuleContext(IdentifierVariableNameContext, 0);
  };
  IdentifierPartContext.prototype.BlockEnd = function() {
    return this.getToken(LessParser5.BlockEnd, 0);
  };
  IdentifierPartContext.prototype.IdentifierAfter = function() {
    return this.getToken(LessParser5.IdentifierAfter, 0);
  };
  IdentifierPartContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterIdentifierPart(this);
    }
  };
  IdentifierPartContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitIdentifierPart(this);
    }
  };
  LessParser5.IdentifierPartContext = IdentifierPartContext;
  LessParser5.prototype.identifierPart = function() {
    var localctx = new IdentifierPartContext(this, this._ctx, this.state);
    this.enterRule(localctx, 74, LessParser5.RULE_identifierPart);
    try {
      this.state = 406;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case LessParser5.InterpolationStartAfter:
          this.enterOuterAlt(localctx, 1);
          this.state = 401;
          this.match(LessParser5.InterpolationStartAfter);
          this.state = 402;
          this.identifierVariableName();
          this.state = 403;
          this.match(LessParser5.BlockEnd);
          break;
        case LessParser5.IdentifierAfter:
          this.enterOuterAlt(localctx, 2);
          this.state = 405;
          this.match(LessParser5.IdentifierAfter);
          break;
        default:
          throw new antlr45.error.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function IdentifierVariableNameContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_identifierVariableName;
    return this;
  }
  IdentifierVariableNameContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  IdentifierVariableNameContext.prototype.constructor = IdentifierVariableNameContext;
  IdentifierVariableNameContext.prototype.Identifier = function() {
    return this.getToken(LessParser5.Identifier, 0);
  };
  IdentifierVariableNameContext.prototype.IdentifierAfter = function() {
    return this.getToken(LessParser5.IdentifierAfter, 0);
  };
  IdentifierVariableNameContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterIdentifierVariableName(this);
    }
  };
  IdentifierVariableNameContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitIdentifierVariableName(this);
    }
  };
  LessParser5.IdentifierVariableNameContext = IdentifierVariableNameContext;
  LessParser5.prototype.identifierVariableName = function() {
    var localctx = new IdentifierVariableNameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 76, LessParser5.RULE_identifierVariableName);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 408;
      _la = this._input.LA(1);
      if (!(_la === LessParser5.Identifier || _la === LessParser5.IdentifierAfter)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);
        this.consume();
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function PropertyContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_property;
    return this;
  }
  PropertyContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  PropertyContext.prototype.constructor = PropertyContext;
  PropertyContext.prototype.identifier = function() {
    return this.getTypedRuleContext(IdentifierContext, 0);
  };
  PropertyContext.prototype.COLON = function() {
    return this.getToken(LessParser5.COLON, 0);
  };
  PropertyContext.prototype.values = function() {
    return this.getTypedRuleContext(ValuesContext, 0);
  };
  PropertyContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterProperty(this);
    }
  };
  PropertyContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitProperty(this);
    }
  };
  LessParser5.PropertyContext = PropertyContext;
  LessParser5.prototype.property = function() {
    var localctx = new PropertyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 78, LessParser5.RULE_property);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 410;
      this.identifier();
      this.state = 411;
      this.match(LessParser5.COLON);
      this.state = 412;
      this.values();
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function ValuesContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_values;
    return this;
  }
  ValuesContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  ValuesContext.prototype.constructor = ValuesContext;
  ValuesContext.prototype.commandStatement = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(CommandStatementContext);
    } else {
      return this.getTypedRuleContext(CommandStatementContext, i);
    }
  };
  ValuesContext.prototype.COMMA = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(LessParser5.COMMA);
    } else {
      return this.getToken(LessParser5.COMMA, i);
    }
  };
  ValuesContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterValues(this);
    }
  };
  ValuesContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitValues(this);
    }
  };
  LessParser5.ValuesContext = ValuesContext;
  LessParser5.prototype.values = function() {
    var localctx = new ValuesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 80, LessParser5.RULE_values);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 414;
      this.commandStatement();
      this.state = 419;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === LessParser5.COMMA) {
        this.state = 415;
        this.match(LessParser5.COMMA);
        this.state = 416;
        this.commandStatement();
        this.state = 421;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function UrlContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_url;
    return this;
  }
  UrlContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  UrlContext.prototype.constructor = UrlContext;
  UrlContext.prototype.UrlStart = function() {
    return this.getToken(LessParser5.UrlStart, 0);
  };
  UrlContext.prototype.Url = function() {
    return this.getToken(LessParser5.Url, 0);
  };
  UrlContext.prototype.UrlEnd = function() {
    return this.getToken(LessParser5.UrlEnd, 0);
  };
  UrlContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterUrl(this);
    }
  };
  UrlContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitUrl(this);
    }
  };
  LessParser5.UrlContext = UrlContext;
  LessParser5.prototype.url = function() {
    var localctx = new UrlContext(this, this._ctx, this.state);
    this.enterRule(localctx, 82, LessParser5.RULE_url);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 422;
      this.match(LessParser5.UrlStart);
      this.state = 423;
      this.match(LessParser5.Url);
      this.state = 424;
      this.match(LessParser5.UrlEnd);
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  function MeasurementContext(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    antlr45.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LessParser5.RULE_measurement;
    return this;
  }
  MeasurementContext.prototype = Object.create(antlr45.ParserRuleContext.prototype);
  MeasurementContext.prototype.constructor = MeasurementContext;
  MeasurementContext.prototype.Number = function() {
    return this.getToken(LessParser5.Number, 0);
  };
  MeasurementContext.prototype.Unit = function() {
    return this.getToken(LessParser5.Unit, 0);
  };
  MeasurementContext.prototype.enterRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.enterMeasurement(this);
    }
  };
  MeasurementContext.prototype.exitRule = function(listener) {
    if (listener instanceof LessParserListener5) {
      listener.exitMeasurement(this);
    }
  };
  LessParser5.MeasurementContext = MeasurementContext;
  LessParser5.prototype.measurement = function() {
    var localctx = new MeasurementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 84, LessParser5.RULE_measurement);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 426;
      this.match(LessParser5.Number);
      this.state = 428;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === LessParser5.Unit) {
        this.state = 427;
        this.match(LessParser5.Unit);
      }
    } catch (re) {
      if (re instanceof antlr45.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  };
  exports.LessParser = LessParser5;
});

// node_modules/commander/index.js
var require_commander = __commonJS((exports, module2) => {
  const EventEmitter = require("events").EventEmitter;
  const spawn = require("child_process").spawn;
  const path2 = require("path");
  const fs4 = require("fs");
  class Option {
    constructor(flags, description) {
      this.flags = flags;
      this.required = flags.includes("<");
      this.optional = flags.includes("[");
      this.variadic = /\w\.\.\.[>\]]$/.test(flags);
      this.mandatory = false;
      const optionFlags = _parseOptionFlags(flags);
      this.short = optionFlags.shortFlag;
      this.long = optionFlags.longFlag;
      this.negate = false;
      if (this.long) {
        this.negate = this.long.startsWith("--no-");
      }
      this.description = description || "";
      this.defaultValue = void 0;
    }
    name() {
      if (this.long) {
        return this.long.replace(/^--/, "");
      }
      return this.short.replace(/^-/, "");
    }
    attributeName() {
      return camelcase(this.name().replace(/^no-/, ""));
    }
    is(arg) {
      return this.short === arg || this.long === arg;
    }
  }
  class CommanderError extends Error {
    constructor(exitCode, code, message) {
      super(message);
      Error.captureStackTrace(this, this.constructor);
      this.name = this.constructor.name;
      this.code = code;
      this.exitCode = exitCode;
      this.nestedError = void 0;
    }
  }
  class Command2 extends EventEmitter {
    constructor(name) {
      super();
      this.commands = [];
      this.options = [];
      this.parent = null;
      this._allowUnknownOption = false;
      this._args = [];
      this.rawArgs = null;
      this._scriptPath = null;
      this._name = name || "";
      this._optionValues = {};
      this._storeOptionsAsProperties = true;
      this._storeOptionsAsPropertiesCalled = false;
      this._passCommandToAction = true;
      this._actionResults = [];
      this._actionHandler = null;
      this._executableHandler = false;
      this._executableFile = null;
      this._defaultCommandName = null;
      this._exitCallback = null;
      this._aliases = [];
      this._combineFlagAndOptionalValue = true;
      this._hidden = false;
      this._hasHelpOption = true;
      this._helpFlags = "-h, --help";
      this._helpDescription = "display help for command";
      this._helpShortFlag = "-h";
      this._helpLongFlag = "--help";
      this._hasImplicitHelpCommand = void 0;
      this._helpCommandName = "help";
      this._helpCommandnameAndArgs = "help [command]";
      this._helpCommandDescription = "display help for command";
    }
    command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
      let desc = actionOptsOrExecDesc;
      let opts = execOpts;
      if (typeof desc === "object" && desc !== null) {
        opts = desc;
        desc = null;
      }
      opts = opts || {};
      const args = nameAndArgs.split(/ +/);
      const cmd = this.createCommand(args.shift());
      if (desc) {
        cmd.description(desc);
        cmd._executableHandler = true;
      }
      if (opts.isDefault)
        this._defaultCommandName = cmd._name;
      cmd._hidden = !!(opts.noHelp || opts.hidden);
      cmd._hasHelpOption = this._hasHelpOption;
      cmd._helpFlags = this._helpFlags;
      cmd._helpDescription = this._helpDescription;
      cmd._helpShortFlag = this._helpShortFlag;
      cmd._helpLongFlag = this._helpLongFlag;
      cmd._helpCommandName = this._helpCommandName;
      cmd._helpCommandnameAndArgs = this._helpCommandnameAndArgs;
      cmd._helpCommandDescription = this._helpCommandDescription;
      cmd._exitCallback = this._exitCallback;
      cmd._storeOptionsAsProperties = this._storeOptionsAsProperties;
      cmd._passCommandToAction = this._passCommandToAction;
      cmd._combineFlagAndOptionalValue = this._combineFlagAndOptionalValue;
      cmd._executableFile = opts.executableFile || null;
      this.commands.push(cmd);
      cmd._parseExpectedArgs(args);
      cmd.parent = this;
      if (desc)
        return this;
      return cmd;
    }
    createCommand(name) {
      return new Command2(name);
    }
    addCommand(cmd, opts) {
      if (!cmd._name)
        throw new Error("Command passed to .addCommand() must have a name");
      function checkExplicitNames(commandArray) {
        commandArray.forEach((cmd2) => {
          if (cmd2._executableHandler && !cmd2._executableFile) {
            throw new Error(`Must specify executableFile for deeply nested executable: ${cmd2.name()}`);
          }
          checkExplicitNames(cmd2.commands);
        });
      }
      checkExplicitNames(cmd.commands);
      opts = opts || {};
      if (opts.isDefault)
        this._defaultCommandName = cmd._name;
      if (opts.noHelp || opts.hidden)
        cmd._hidden = true;
      this.commands.push(cmd);
      cmd.parent = this;
      return this;
    }
    arguments(desc) {
      return this._parseExpectedArgs(desc.split(/ +/));
    }
    addHelpCommand(enableOrNameAndArgs, description) {
      if (enableOrNameAndArgs === false) {
        this._hasImplicitHelpCommand = false;
      } else {
        this._hasImplicitHelpCommand = true;
        if (typeof enableOrNameAndArgs === "string") {
          this._helpCommandName = enableOrNameAndArgs.split(" ")[0];
          this._helpCommandnameAndArgs = enableOrNameAndArgs;
        }
        this._helpCommandDescription = description || this._helpCommandDescription;
      }
      return this;
    }
    _lazyHasImplicitHelpCommand() {
      if (this._hasImplicitHelpCommand === void 0) {
        this._hasImplicitHelpCommand = this.commands.length && !this._actionHandler && !this._findCommand("help");
      }
      return this._hasImplicitHelpCommand;
    }
    _parseExpectedArgs(args) {
      if (!args.length)
        return;
      args.forEach((arg) => {
        const argDetails = {
          required: false,
          name: "",
          variadic: false
        };
        switch (arg[0]) {
          case "<":
            argDetails.required = true;
            argDetails.name = arg.slice(1, -1);
            break;
          case "[":
            argDetails.name = arg.slice(1, -1);
            break;
        }
        if (argDetails.name.length > 3 && argDetails.name.slice(-3) === "...") {
          argDetails.variadic = true;
          argDetails.name = argDetails.name.slice(0, -3);
        }
        if (argDetails.name) {
          this._args.push(argDetails);
        }
      });
      this._args.forEach((arg, i) => {
        if (arg.variadic && i < this._args.length - 1) {
          throw new Error(`only the last argument can be variadic '${arg.name}'`);
        }
      });
      return this;
    }
    exitOverride(fn) {
      if (fn) {
        this._exitCallback = fn;
      } else {
        this._exitCallback = (err) => {
          if (err.code !== "commander.executeSubCommandAsync") {
            throw err;
          } else {
          }
        };
      }
      return this;
    }
    _exit(exitCode, code, message) {
      if (this._exitCallback) {
        this._exitCallback(new CommanderError(exitCode, code, message));
      }
      process.exit(exitCode);
    }
    action(fn) {
      const listener = (args) => {
        const expectedArgsCount = this._args.length;
        const actionArgs = args.slice(0, expectedArgsCount);
        if (this._passCommandToAction) {
          actionArgs[expectedArgsCount] = this;
        } else {
          actionArgs[expectedArgsCount] = this.opts();
        }
        if (args.length > expectedArgsCount) {
          actionArgs.push(args.slice(expectedArgsCount));
        }
        const actionResult = fn.apply(this, actionArgs);
        let rootCommand = this;
        while (rootCommand.parent) {
          rootCommand = rootCommand.parent;
        }
        rootCommand._actionResults.push(actionResult);
      };
      this._actionHandler = listener;
      return this;
    }
    _checkForOptionNameClash(option) {
      if (!this._storeOptionsAsProperties || this._storeOptionsAsPropertiesCalled) {
        return;
      }
      if (option.name() === "help") {
        return;
      }
      const commandProperty = this._getOptionValue(option.attributeName());
      if (commandProperty === void 0) {
        return;
      }
      let foundClash = true;
      if (option.negate) {
        const positiveLongFlag = option.long.replace(/^--no-/, "--");
        foundClash = !this._findOption(positiveLongFlag);
      } else if (option.long) {
        const negativeLongFlag = option.long.replace(/^--/, "--no-");
        foundClash = !this._findOption(negativeLongFlag);
      }
      if (foundClash) {
        throw new Error(`option '${option.name()}' clashes with existing property '${option.attributeName()}' on Command
- call storeOptionsAsProperties(false) to store option values safely,
- or call storeOptionsAsProperties(true) to suppress this check,
- or change option name

Read more on https://git.io/JJc0W`);
      }
    }
    _optionEx(config, flags, description, fn, defaultValue) {
      const option = new Option(flags, description);
      const oname = option.name();
      const name = option.attributeName();
      option.mandatory = !!config.mandatory;
      this._checkForOptionNameClash(option);
      if (typeof fn !== "function") {
        if (fn instanceof RegExp) {
          const regex = fn;
          fn = (val, def) => {
            const m = regex.exec(val);
            return m ? m[0] : def;
          };
        } else {
          defaultValue = fn;
          fn = null;
        }
      }
      if (option.negate || option.optional || option.required || typeof defaultValue === "boolean") {
        if (option.negate) {
          const positiveLongFlag = option.long.replace(/^--no-/, "--");
          defaultValue = this._findOption(positiveLongFlag) ? this._getOptionValue(name) : true;
        }
        if (defaultValue !== void 0) {
          this._setOptionValue(name, defaultValue);
          option.defaultValue = defaultValue;
        }
      }
      this.options.push(option);
      this.on("option:" + oname, (val) => {
        const oldValue = this._getOptionValue(name);
        if (val !== null && fn) {
          val = fn(val, oldValue === void 0 ? defaultValue : oldValue);
        } else if (val !== null && option.variadic) {
          if (oldValue === defaultValue || !Array.isArray(oldValue)) {
            val = [val];
          } else {
            val = oldValue.concat(val);
          }
        }
        if (typeof oldValue === "boolean" || typeof oldValue === "undefined") {
          if (val == null) {
            this._setOptionValue(name, option.negate ? false : defaultValue || true);
          } else {
            this._setOptionValue(name, val);
          }
        } else if (val !== null) {
          this._setOptionValue(name, option.negate ? false : val);
        }
      });
      return this;
    }
    option(flags, description, fn, defaultValue) {
      return this._optionEx({}, flags, description, fn, defaultValue);
    }
    requiredOption(flags, description, fn, defaultValue) {
      return this._optionEx({mandatory: true}, flags, description, fn, defaultValue);
    }
    combineFlagAndOptionalValue(arg) {
      this._combineFlagAndOptionalValue = arg === void 0 || arg;
      return this;
    }
    allowUnknownOption(arg) {
      this._allowUnknownOption = arg === void 0 || arg;
      return this;
    }
    storeOptionsAsProperties(value) {
      this._storeOptionsAsPropertiesCalled = true;
      this._storeOptionsAsProperties = value === void 0 || value;
      if (this.options.length) {
        throw new Error("call .storeOptionsAsProperties() before adding options");
      }
      return this;
    }
    passCommandToAction(value) {
      this._passCommandToAction = value === void 0 || value;
      return this;
    }
    _setOptionValue(key, value) {
      if (this._storeOptionsAsProperties) {
        this[key] = value;
      } else {
        this._optionValues[key] = value;
      }
    }
    _getOptionValue(key) {
      if (this._storeOptionsAsProperties) {
        return this[key];
      }
      return this._optionValues[key];
    }
    parse(argv, parseOptions) {
      if (argv !== void 0 && !Array.isArray(argv)) {
        throw new Error("first parameter to parse must be array or undefined");
      }
      parseOptions = parseOptions || {};
      if (argv === void 0) {
        argv = process.argv;
        if (process.versions && process.versions.electron) {
          parseOptions.from = "electron";
        }
      }
      this.rawArgs = argv.slice();
      let userArgs;
      switch (parseOptions.from) {
        case void 0:
        case "node":
          this._scriptPath = argv[1];
          userArgs = argv.slice(2);
          break;
        case "electron":
          if (process.defaultApp) {
            this._scriptPath = argv[1];
            userArgs = argv.slice(2);
          } else {
            userArgs = argv.slice(1);
          }
          break;
        case "user":
          userArgs = argv.slice(0);
          break;
        default:
          throw new Error(`unexpected parse option { from: '${parseOptions.from}' }`);
      }
      if (!this._scriptPath && process.mainModule) {
        this._scriptPath = process.mainModule.filename;
      }
      this._name = this._name || this._scriptPath && path2.basename(this._scriptPath, path2.extname(this._scriptPath));
      this._parseCommand([], userArgs);
      return this;
    }
    parseAsync(argv, parseOptions) {
      this.parse(argv, parseOptions);
      return Promise.all(this._actionResults).then(() => this);
    }
    _executeSubCommand(subcommand, args) {
      args = args.slice();
      let launchWithNode = false;
      const sourceExt = [".js", ".ts", ".tsx", ".mjs"];
      this._checkForMissingMandatoryOptions();
      let scriptPath = this._scriptPath;
      if (!scriptPath && process.mainModule) {
        scriptPath = process.mainModule.filename;
      }
      let baseDir;
      try {
        const resolvedLink = fs4.realpathSync(scriptPath);
        baseDir = path2.dirname(resolvedLink);
      } catch (e) {
        baseDir = ".";
      }
      let bin = path2.basename(scriptPath, path2.extname(scriptPath)) + "-" + subcommand._name;
      if (subcommand._executableFile) {
        bin = subcommand._executableFile;
      }
      const localBin = path2.join(baseDir, bin);
      if (fs4.existsSync(localBin)) {
        bin = localBin;
      } else {
        sourceExt.forEach((ext) => {
          if (fs4.existsSync(`${localBin}${ext}`)) {
            bin = `${localBin}${ext}`;
          }
        });
      }
      launchWithNode = sourceExt.includes(path2.extname(bin));
      let proc;
      if (process.platform !== "win32") {
        if (launchWithNode) {
          args.unshift(bin);
          args = incrementNodeInspectorPort(process.execArgv).concat(args);
          proc = spawn(process.argv[0], args, {stdio: "inherit"});
        } else {
          proc = spawn(bin, args, {stdio: "inherit"});
        }
      } else {
        args.unshift(bin);
        args = incrementNodeInspectorPort(process.execArgv).concat(args);
        proc = spawn(process.execPath, args, {stdio: "inherit"});
      }
      const signals = ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"];
      signals.forEach((signal) => {
        process.on(signal, () => {
          if (proc.killed === false && proc.exitCode === null) {
            proc.kill(signal);
          }
        });
      });
      const exitCallback = this._exitCallback;
      if (!exitCallback) {
        proc.on("close", process.exit.bind(process));
      } else {
        proc.on("close", () => {
          exitCallback(new CommanderError(process.exitCode || 0, "commander.executeSubCommandAsync", "(close)"));
        });
      }
      proc.on("error", (err) => {
        if (err.code === "ENOENT") {
          const executableMissing = `'${bin}' does not exist
 - if '${subcommand._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name`;
          throw new Error(executableMissing);
        } else if (err.code === "EACCES") {
          throw new Error(`'${bin}' not executable`);
        }
        if (!exitCallback) {
          process.exit(1);
        } else {
          const wrappedError = new CommanderError(1, "commander.executeSubCommandAsync", "(error)");
          wrappedError.nestedError = err;
          exitCallback(wrappedError);
        }
      });
      this.runningCommand = proc;
    }
    _dispatchSubcommand(commandName, operands, unknown) {
      const subCommand = this._findCommand(commandName);
      if (!subCommand)
        this._helpAndError();
      if (subCommand._executableHandler) {
        this._executeSubCommand(subCommand, operands.concat(unknown));
      } else {
        subCommand._parseCommand(operands, unknown);
      }
    }
    _parseCommand(operands, unknown) {
      const parsed = this.parseOptions(unknown);
      operands = operands.concat(parsed.operands);
      unknown = parsed.unknown;
      this.args = operands.concat(unknown);
      if (operands && this._findCommand(operands[0])) {
        this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
      } else if (this._lazyHasImplicitHelpCommand() && operands[0] === this._helpCommandName) {
        if (operands.length === 1) {
          this.help();
        } else {
          this._dispatchSubcommand(operands[1], [], [this._helpLongFlag]);
        }
      } else if (this._defaultCommandName) {
        outputHelpIfRequested(this, unknown);
        this._dispatchSubcommand(this._defaultCommandName, operands, unknown);
      } else {
        if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
          this._helpAndError();
        }
        outputHelpIfRequested(this, parsed.unknown);
        this._checkForMissingMandatoryOptions();
        if (parsed.unknown.length > 0) {
          this.unknownOption(parsed.unknown[0]);
        }
        if (this._actionHandler) {
          const args = this.args.slice();
          this._args.forEach((arg, i) => {
            if (arg.required && args[i] == null) {
              this.missingArgument(arg.name);
            } else if (arg.variadic) {
              args[i] = args.splice(i);
            }
          });
          this._actionHandler(args);
          this.emit("command:" + this.name(), operands, unknown);
        } else if (operands.length) {
          if (this._findCommand("*")) {
            this._dispatchSubcommand("*", operands, unknown);
          } else if (this.listenerCount("command:*")) {
            this.emit("command:*", operands, unknown);
          } else if (this.commands.length) {
            this.unknownCommand();
          }
        } else if (this.commands.length) {
          this._helpAndError();
        } else {
        }
      }
    }
    _findCommand(name) {
      if (!name)
        return void 0;
      return this.commands.find((cmd) => cmd._name === name || cmd._aliases.includes(name));
    }
    _findOption(arg) {
      return this.options.find((option) => option.is(arg));
    }
    _checkForMissingMandatoryOptions() {
      for (let cmd = this; cmd; cmd = cmd.parent) {
        cmd.options.forEach((anOption) => {
          if (anOption.mandatory && cmd._getOptionValue(anOption.attributeName()) === void 0) {
            cmd.missingMandatoryOptionValue(anOption);
          }
        });
      }
    }
    parseOptions(argv) {
      const operands = [];
      const unknown = [];
      let dest = operands;
      const args = argv.slice();
      function maybeOption(arg) {
        return arg.length > 1 && arg[0] === "-";
      }
      let activeVariadicOption = null;
      while (args.length) {
        const arg = args.shift();
        if (arg === "--") {
          if (dest === unknown)
            dest.push(arg);
          dest.push(...args);
          break;
        }
        if (activeVariadicOption && !maybeOption(arg)) {
          this.emit(`option:${activeVariadicOption.name()}`, arg);
          continue;
        }
        activeVariadicOption = null;
        if (maybeOption(arg)) {
          const option = this._findOption(arg);
          if (option) {
            if (option.required) {
              const value = args.shift();
              if (value === void 0)
                this.optionMissingArgument(option);
              this.emit(`option:${option.name()}`, value);
            } else if (option.optional) {
              let value = null;
              if (args.length > 0 && !maybeOption(args[0])) {
                value = args.shift();
              }
              this.emit(`option:${option.name()}`, value);
            } else {
              this.emit(`option:${option.name()}`);
            }
            activeVariadicOption = option.variadic ? option : null;
            continue;
          }
        }
        if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
          const option = this._findOption(`-${arg[1]}`);
          if (option) {
            if (option.required || option.optional && this._combineFlagAndOptionalValue) {
              this.emit(`option:${option.name()}`, arg.slice(2));
            } else {
              this.emit(`option:${option.name()}`);
              args.unshift(`-${arg.slice(2)}`);
            }
            continue;
          }
        }
        if (/^--[^=]+=/.test(arg)) {
          const index = arg.indexOf("=");
          const option = this._findOption(arg.slice(0, index));
          if (option && (option.required || option.optional)) {
            this.emit(`option:${option.name()}`, arg.slice(index + 1));
            continue;
          }
        }
        if (arg.length > 1 && arg[0] === "-") {
          dest = unknown;
        }
        dest.push(arg);
      }
      return {operands, unknown};
    }
    opts() {
      if (this._storeOptionsAsProperties) {
        const result = {};
        const len = this.options.length;
        for (let i = 0; i < len; i++) {
          const key = this.options[i].attributeName();
          result[key] = key === this._versionOptionName ? this._version : this[key];
        }
        return result;
      }
      return this._optionValues;
    }
    missingArgument(name) {
      const message = `error: missing required argument '${name}'`;
      console.error(message);
      this._exit(1, "commander.missingArgument", message);
    }
    optionMissingArgument(option, flag) {
      let message;
      if (flag) {
        message = `error: option '${option.flags}' argument missing, got '${flag}'`;
      } else {
        message = `error: option '${option.flags}' argument missing`;
      }
      console.error(message);
      this._exit(1, "commander.optionMissingArgument", message);
    }
    missingMandatoryOptionValue(option) {
      const message = `error: required option '${option.flags}' not specified`;
      console.error(message);
      this._exit(1, "commander.missingMandatoryOptionValue", message);
    }
    unknownOption(flag) {
      if (this._allowUnknownOption)
        return;
      const message = `error: unknown option '${flag}'`;
      console.error(message);
      this._exit(1, "commander.unknownOption", message);
    }
    unknownCommand() {
      const partCommands = [this.name()];
      for (let parentCmd = this.parent; parentCmd; parentCmd = parentCmd.parent) {
        partCommands.unshift(parentCmd.name());
      }
      const fullCommand = partCommands.join(" ");
      const message = `error: unknown command '${this.args[0]}'.` + (this._hasHelpOption ? ` See '${fullCommand} ${this._helpLongFlag}'.` : "");
      console.error(message);
      this._exit(1, "commander.unknownCommand", message);
    }
    version(str, flags, description) {
      if (str === void 0)
        return this._version;
      this._version = str;
      flags = flags || "-V, --version";
      description = description || "output the version number";
      const versionOption = new Option(flags, description);
      this._versionOptionName = versionOption.attributeName();
      this.options.push(versionOption);
      this.on("option:" + versionOption.name(), () => {
        process.stdout.write(str + "\n");
        this._exit(0, "commander.version", str);
      });
      return this;
    }
    description(str, argsDescription) {
      if (str === void 0 && argsDescription === void 0)
        return this._description;
      this._description = str;
      this._argsDescription = argsDescription;
      return this;
    }
    alias(alias) {
      if (alias === void 0)
        return this._aliases[0];
      let command = this;
      if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
        command = this.commands[this.commands.length - 1];
      }
      if (alias === command._name)
        throw new Error("Command alias can't be the same as its name");
      command._aliases.push(alias);
      return this;
    }
    aliases(aliases) {
      if (aliases === void 0)
        return this._aliases;
      aliases.forEach((alias) => this.alias(alias));
      return this;
    }
    usage(str) {
      if (str === void 0) {
        if (this._usage)
          return this._usage;
        const args = this._args.map((arg) => {
          return humanReadableArgName(arg);
        });
        return [].concat(this.options.length || this._hasHelpOption ? "[options]" : [], this.commands.length ? "[command]" : [], this._args.length ? args : []).join(" ");
      }
      this._usage = str;
      return this;
    }
    name(str) {
      if (str === void 0)
        return this._name;
      this._name = str;
      return this;
    }
    prepareCommands() {
      const commandDetails = this.commands.filter((cmd) => {
        return !cmd._hidden;
      }).map((cmd) => {
        const args = cmd._args.map((arg) => {
          return humanReadableArgName(arg);
        }).join(" ");
        return [
          cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + (args ? " " + args : ""),
          cmd._description
        ];
      });
      if (this._lazyHasImplicitHelpCommand()) {
        commandDetails.push([this._helpCommandnameAndArgs, this._helpCommandDescription]);
      }
      return commandDetails;
    }
    largestCommandLength() {
      const commands = this.prepareCommands();
      return commands.reduce((max, command) => {
        return Math.max(max, command[0].length);
      }, 0);
    }
    largestOptionLength() {
      const options = [].slice.call(this.options);
      options.push({
        flags: this._helpFlags
      });
      return options.reduce((max, option) => {
        return Math.max(max, option.flags.length);
      }, 0);
    }
    largestArgLength() {
      return this._args.reduce((max, arg) => {
        return Math.max(max, arg.name.length);
      }, 0);
    }
    padWidth() {
      let width = this.largestOptionLength();
      if (this._argsDescription && this._args.length) {
        if (this.largestArgLength() > width) {
          width = this.largestArgLength();
        }
      }
      if (this.commands && this.commands.length) {
        if (this.largestCommandLength() > width) {
          width = this.largestCommandLength();
        }
      }
      return width;
    }
    optionHelp() {
      const width = this.padWidth();
      const columns = process.stdout.columns || 80;
      const descriptionWidth = columns - width - 4;
      function padOptionDetails(flags, description) {
        return pad(flags, width) + "  " + optionalWrap(description, descriptionWidth, width + 2);
      }
      ;
      const help = this.options.map((option) => {
        const fullDesc = option.description + (!option.negate && option.defaultValue !== void 0 ? " (default: " + JSON.stringify(option.defaultValue) + ")" : "");
        return padOptionDetails(option.flags, fullDesc);
      });
      const showShortHelpFlag = this._hasHelpOption && this._helpShortFlag && !this._findOption(this._helpShortFlag);
      const showLongHelpFlag = this._hasHelpOption && !this._findOption(this._helpLongFlag);
      if (showShortHelpFlag || showLongHelpFlag) {
        let helpFlags = this._helpFlags;
        if (!showShortHelpFlag) {
          helpFlags = this._helpLongFlag;
        } else if (!showLongHelpFlag) {
          helpFlags = this._helpShortFlag;
        }
        help.push(padOptionDetails(helpFlags, this._helpDescription));
      }
      return help.join("\n");
    }
    commandHelp() {
      if (!this.commands.length && !this._lazyHasImplicitHelpCommand())
        return "";
      const commands = this.prepareCommands();
      const width = this.padWidth();
      const columns = process.stdout.columns || 80;
      const descriptionWidth = columns - width - 4;
      return [
        "Commands:",
        commands.map((cmd) => {
          const desc = cmd[1] ? "  " + cmd[1] : "";
          return (desc ? pad(cmd[0], width) : cmd[0]) + optionalWrap(desc, descriptionWidth, width + 2);
        }).join("\n").replace(/^/gm, "  "),
        ""
      ].join("\n");
    }
    helpInformation() {
      let desc = [];
      if (this._description) {
        desc = [
          this._description,
          ""
        ];
        const argsDescription = this._argsDescription;
        if (argsDescription && this._args.length) {
          const width = this.padWidth();
          const columns = process.stdout.columns || 80;
          const descriptionWidth = columns - width - 5;
          desc.push("Arguments:");
          this._args.forEach((arg) => {
            desc.push("  " + pad(arg.name, width) + "  " + wrap(argsDescription[arg.name] || "", descriptionWidth, width + 4));
          });
          desc.push("");
        }
      }
      let cmdName = this._name;
      if (this._aliases[0]) {
        cmdName = cmdName + "|" + this._aliases[0];
      }
      let parentCmdNames = "";
      for (let parentCmd = this.parent; parentCmd; parentCmd = parentCmd.parent) {
        parentCmdNames = parentCmd.name() + " " + parentCmdNames;
      }
      const usage = [
        "Usage: " + parentCmdNames + cmdName + " " + this.usage(),
        ""
      ];
      let cmds = [];
      const commandHelp = this.commandHelp();
      if (commandHelp)
        cmds = [commandHelp];
      let options = [];
      if (this._hasHelpOption || this.options.length > 0) {
        options = [
          "Options:",
          "" + this.optionHelp().replace(/^/gm, "  "),
          ""
        ];
      }
      return usage.concat(desc).concat(options).concat(cmds).join("\n");
    }
    outputHelp(cb) {
      if (!cb) {
        cb = (passthru) => {
          return passthru;
        };
      }
      const cbOutput = cb(this.helpInformation());
      if (typeof cbOutput !== "string" && !Buffer.isBuffer(cbOutput)) {
        throw new Error("outputHelp callback must return a string or a Buffer");
      }
      process.stdout.write(cbOutput);
      this.emit(this._helpLongFlag);
    }
    helpOption(flags, description) {
      if (typeof flags === "boolean") {
        this._hasHelpOption = flags;
        return this;
      }
      this._helpFlags = flags || this._helpFlags;
      this._helpDescription = description || this._helpDescription;
      const helpFlags = _parseOptionFlags(this._helpFlags);
      this._helpShortFlag = helpFlags.shortFlag;
      this._helpLongFlag = helpFlags.longFlag;
      return this;
    }
    help(cb) {
      this.outputHelp(cb);
      this._exit(process.exitCode || 0, "commander.help", "(outputHelp)");
    }
    _helpAndError() {
      this.outputHelp();
      this._exit(1, "commander.help", "(outputHelp)");
    }
  }
  exports = module2.exports = new Command2();
  exports.program = exports;
  exports.Command = Command2;
  exports.Option = Option;
  exports.CommanderError = CommanderError;
  function camelcase(flag) {
    return flag.split("-").reduce((str, word) => {
      return str + word[0].toUpperCase() + word.slice(1);
    });
  }
  function pad(str, width) {
    const len = Math.max(0, width - str.length);
    return str + Array(len + 1).join(" ");
  }
  function wrap(str, width, indent) {
    const regex = new RegExp(".{1," + (width - 1) + "}([\\s\u200B]|$)|[^\\s\u200B]+?([\\s\u200B]|$)", "g");
    const lines = str.match(regex) || [];
    return lines.map((line, i) => {
      if (line.slice(-1) === "\n") {
        line = line.slice(0, line.length - 1);
      }
      return (i > 0 && indent ? Array(indent + 1).join(" ") : "") + line.trimRight();
    }).join("\n");
  }
  function optionalWrap(str, width, indent) {
    if (str.match(/[\n]\s+/))
      return str;
    const minWidth = 40;
    if (width < minWidth)
      return str;
    return wrap(str, width, indent);
  }
  function outputHelpIfRequested(cmd, args) {
    const helpOption = cmd._hasHelpOption && args.find((arg) => arg === cmd._helpLongFlag || arg === cmd._helpShortFlag);
    if (helpOption) {
      cmd.outputHelp();
      cmd._exit(0, "commander.helpDisplayed", "(outputHelp)");
    }
  }
  function humanReadableArgName(arg) {
    const nameOutput = arg.name + (arg.variadic === true ? "..." : "");
    return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
  }
  function _parseOptionFlags(flags) {
    let shortFlag;
    let longFlag;
    const flagParts = flags.split(/[ |,]+/);
    if (flagParts.length > 1 && !/^[[<]/.test(flagParts[1]))
      shortFlag = flagParts.shift();
    longFlag = flagParts.shift();
    if (!shortFlag && /^-[^-]$/.test(longFlag)) {
      shortFlag = longFlag;
      longFlag = void 0;
    }
    return {shortFlag, longFlag};
  }
  function incrementNodeInspectorPort(args) {
    return args.map((arg) => {
      if (!arg.startsWith("--inspect")) {
        return arg;
      }
      let debugOption;
      let debugHost = "127.0.0.1";
      let debugPort = "9229";
      let match;
      if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
        debugOption = match[1];
      } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
        debugOption = match[1];
        if (/^\d+$/.test(match[3])) {
          debugPort = match[3];
        } else {
          debugHost = match[3];
        }
      } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
        debugOption = match[1];
        debugHost = match[3];
        debugPort = match[4];
      }
      if (debugOption && debugPort !== "0") {
        return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
      }
      return arg;
    });
  }
});

// src/FileSupport.js
const fs = require("fs");
const path = require("path");
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

// src/RefactorAnalysis.js
const antlr4 = __toModule(require_antlr4());
const LessLexer = __toModule(require_LessLexer());
const LessParser = __toModule(require_LessParser());

// src/CssColors.js
const CSS_COLOR_NAMES = [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgrey",
  "darkgreen",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "grey",
  "green",
  "greenyellow",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgrey",
  "lightgreen",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen"
];

// src/RefactorAnalysisListener.js
const LessParserListener = __toModule(require_LessParserListener());
let Checker = {
  hasColor: function(value) {
    return value.startsWith("#") || CSS_COLOR_NAMES.includes(value.toLowerCase()) || value.startsWith("rgba") || value.startsWith("rgb");
  },
  hasImportant: function(value) {
    return value.includes("!important");
  }
};
class RefactorAnalysisListener extends LessParserListener.LessParserListener {
  setMetaData(data) {
    this.metadata = data;
  }
  enterMedia(ctx) {
    if (!this.metadata.mediaQueries) {
      this.metadata.mediaQueries = [];
    }
    this.metadata.mediaQueries.push({
      type: "@media",
      file: this.metadata.filePath,
      start: ctx.start.line,
      end: ctx.stop.line
    });
  }
  enterBlock(ctx) {
  }
  enterProperty(ctx) {
    let propertyKey = ctx.children[0].getText();
    let valuesExpr = ctx.children[2];
    let propertyValue = valuesExpr.getText();
    if (Checker.hasImportant(propertyValue)) {
      if (!this.metadata.importants) {
        this.metadata.importants = [];
      }
      this.metadata.importants.push({
        type: "!important",
        file: this.metadata.filePath,
        line: valuesExpr.start.line
      });
    }
    switch (propertyKey) {
      case "color":
      case "background-color":
      case "border-color":
        if (Checker.hasColor(propertyValue)) {
          this.append_issue(valuesExpr, "color");
          this.updateColorMap(valuesExpr);
        }
        break;
      case "border":
      case "border-right":
      case "border-left":
      case "border-bottom":
      case "border-top":
      case "border-right-color":
      case "border-left-color":
      case "border-bottom-color":
      case "border-top-color":
      case "box-shadow":
      case "background":
        if (!valuesExpr.children) {
          return;
        }
        let commandStatement = valuesExpr.children[0];
        for (let child of commandStatement.children) {
          if (Checker.hasColor(child.getText())) {
            this.append_issue(child, "color");
            this.updateColorMap(child);
          }
        }
        break;
      case "font-family":
        if (!this.metadata.fontFamily) {
          this.metadata.fontFamily = [];
        }
        this.metadata.fontFamily.push({
          type: "font-family",
          origin: this.getOriginText(valuesExpr),
          file: this.metadata.filePath,
          start: {
            line: valuesExpr.start.line,
            column: valuesExpr.start.column
          },
          stop: {
            line: valuesExpr.stop.line,
            column: valuesExpr.stop.column
          }
        });
        break;
    }
  }
  updateColorMap(valuesExpr) {
    let text = this.getOriginText(valuesExpr);
    if (!this.COLOR_MAPS[text]) {
      this.COLOR_MAPS[text] = "@color" + this.COLOR_INDEX;
      this.COLOR_INDEX = this.COLOR_INDEX + 1;
    }
    let line = valuesExpr.start.line;
    if (!this.COLOR_FILE_MAPS[text]) {
      this.COLOR_FILE_MAPS[text] = [this.metadata.filePath + ":" + line];
    } else {
      this.COLOR_FILE_MAPS[text].push(this.metadata.filePath + ":" + line);
    }
  }
  append_issue(node, type) {
    this.metadata.issues.push({
      type,
      origin: this.getOriginText(node),
      start: {
        line: node.start.line,
        column: node.start.column
      },
      stop: {
        line: node.stop.line,
        column: node.stop.column
      }
    });
  }
  getOriginText(node) {
    let inputStream = node.start.getInputStream();
    if (!inputStream) {
      return node.getText();
    }
    return inputStream.getText(node.start.start, node.stop.stop);
  }
}
RefactorAnalysisListener.prototype.metadata = {};
RefactorAnalysisListener.prototype.COLOR_MAPS = {};
RefactorAnalysisListener.prototype.COLOR_FILE_MAPS = {};
RefactorAnalysisListener.prototype.COLOR_INDEX = 0;

// src/RefactorAnalysis.js
function refactorAnalysis(input, filePath, colorIndex) {
  const filename = filePath.replace(/^.*[\\\/]/, "");
  let chars = new antlr4.default.InputStream(input);
  let lexer = new LessLexer.LessLexer(chars);
  let tokens = new antlr4.default.CommonTokenStream(lexer);
  let parser = new LessParser.LessParser(tokens);
  parser.buildParseTrees = true;
  let tree = parser.stylesheet();
  let listener = new RefactorAnalysisListener();
  listener.setMetaData({
    fileName: filename,
    filePath,
    fontFamily: [],
    importants: [],
    mediaQueries: [],
    issues: []
  });
  listener.COLOR_INDEX = colorIndex;
  antlr4.default.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);
  return {
    metadata: listener.metadata,
    colorMappings: listener.COLOR_MAPS,
    colorIndex: listener.COLOR_INDEX,
    colorFileMaps: listener.COLOR_FILE_MAPS
  };
}

// src/Analysis.js
const fs2 = require("fs");
function analysisDir(dir) {
  let data = {
    colorMappings: {},
    issues: [],
    fontFamily: [],
    importants: [],
    mediaQueries: [],
    colorFileMaps: {},
    summary: {}
  };
  let colorIndex = 1;
  walkDir(dir, function(filePath) {
    const filename = filePath.replace(/^.*[\\\/]/, "");
    if (!(filename.endsWith(".less") || filename.endsWith(".css"))) {
      return;
    }
    const fileContents = fs2.readFileSync(filePath, "utf8");
    let result = refactorAnalysis(fileContents, filePath, colorIndex);
    colorIndex = result.colorIndex;
    if (result.metadata.issues.length !== 0) {
      data.issues = data.issues.concat(result.metadata);
    }
    data.fontFamily = data.fontFamily.concat(result.metadata.fontFamily);
    data.importants = data.importants.concat(result.metadata.importants);
    data.mediaQueries = data.mediaQueries.concat(result.metadata.mediaQueries);
    Object.assign(data.colorMappings, result.colorMappings);
    Object.assign(data.colorFileMaps, result.colorFileMaps);
  });
  data.summary = {
    colors: Object.keys(data.colorMappings).length,
    importants: data.importants.length,
    mediaQueries: data.mediaQueries.length,
    issues: Object.keys(data.issues).length
  };
  fs2.writeFileSync("results.json", JSON.stringify(data, null, "	"));
  fs2.writeFileSync("mappings.less", buildMappings(data.colorMappings, data.colorFileMaps));
  return data;
}
function buildMappings(json, colorFileMaps) {
  let ret = "";
  for (const key in json) {
    let files = colorFileMaps[key];
    for (let file of files) {
      ret = `${ret}// ${file}
`;
    }
    ret = `${ret + [json[key]]}: ${key};
`;
  }
  return ret;
}

// src/CodeModifer.js
function spliceSlice(str, index, count, add) {
  if (index < 0) {
    index = str.length + index;
    if (index < 0) {
      index = 0;
    }
  }
  return str.slice(0, index) + (add || "") + str.slice(index + count);
}

// src/MappingAnalysis.js
const antlr43 = __toModule(require_antlr4());
const LessLexer3 = __toModule(require_LessLexer());
const LessParser3 = __toModule(require_LessParser());

// src/MappingListener.js
const LessParserListener3 = __toModule(require_LessParserListener());
class MappingListener extends LessParserListener3.LessParserListener {
  enterStylesheet(ctx) {
  }
  setMapping(node) {
    this.mapping = node;
  }
  enterVariableDeclaration(ctx) {
    let propertyKey = this.getOriginText(ctx.children[0]);
    let propertyValue = this.getOriginText(ctx.children[2]);
    this.mapping[propertyValue] = propertyKey;
  }
  getOriginText(node) {
    let inputStream = node.start.getInputStream();
    if (!inputStream) {
      return node.getText();
    }
    return inputStream.getText(node.start.start, node.stop.stop);
  }
}

// src/MappingAnalysis.js
function mappingAnalysis(input) {
  let chars = new antlr43.default.InputStream(input);
  let lexer = new LessLexer3.LessLexer(chars);
  let tokens = new antlr43.default.CommonTokenStream(lexer);
  let parser = new LessParser3.LessParser(tokens);
  parser.buildParseTrees = true;
  let tree = parser.stylesheet();
  let listener = new MappingListener();
  listener.setMapping({});
  antlr43.default.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);
  return {
    mapping: listener.mapping
  };
}

// src/Refactor.js
const fs3 = require("fs");
function modifyFile(data, fileIssue, mappings) {
  const lines = data.split(/\r?\n/);
  for (let issue of fileIssue.issues) {
    let line = lines[issue.start.line - 1];
    line = spliceSlice(line, issue.start.column, issue.origin.length, mappings[issue.origin]);
    lines[issue.start.line - 1] = line;
  }
  return lines;
}
function refactorDir(mappingFile, issuesFile) {
  const fileContents = fs3.readFileSync(mappingFile, "utf8");
  let mappings = mappingAnalysis(fileContents).mapping;
  const issues_text = fs3.readFileSync(issuesFile, "utf8");
  const allIssues = JSON.parse(issues_text).issues;
  for (let fileIssue of allIssues) {
    const data = fs3.readFileSync(fileIssue.filePath, "UTF-8");
    let lines = modifyFile(data, fileIssue, mappings);
    fs3.writeFileSync(fileIssue.filePath, lines.join("\n"));
  }
}

// src/cli.js
const {Command} = require_commander();
const program = new Command();
program.version("0.0.1");
program.command("analysis <path>").alias("A").description("analysis code", {
  title: "Analysis Less/CSS Code"
}).action((path2) => {
  analysisDir(path2);
});
program.command("refactor <path>").alias("R").description("refactor css files", {
  index: "auto refactor css files"
}).action((path2) => {
  refactorDir("mappings.less", "results.json");
});
program.parse(process.argv);
if (!process.argv.slice(2).length || !process.argv.length) {
  program.outputHelp();
}
//# sourceMappingURL=cli.js.map
