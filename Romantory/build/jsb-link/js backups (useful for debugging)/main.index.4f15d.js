window.__require = function e(t, n, o) {
function i(s, a) {
if (!n[s]) {
if (!t[s]) {
var c = s.split("/");
c = c[c.length - 1];
if (!t[c]) {
var l = "function" == typeof __require && __require;
if (!a && l) return l(c, !0);
if (r) return r(c, !0);
throw new Error("Cannot find module '" + s + "'");
}
s = c;
}
var u = n[s] = {
exports: {}
};
t[s][0].call(u.exports, function(e) {
return i(t[s][1][e] || e);
}, u, u.exports, e, t, n, o);
}
return n[s].exports;
}
for (var r = "function" == typeof __require && __require, s = 0; s < o.length; s++) i(o[s]);
return i;
}({
AdvanceTick: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "83eedfB7jNJ5ZoW2ukkP1Tk", "AdvanceTick");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.AdvanceTick = void 0;
var o = function() {
function e() {
this.juggleInterval = 0;
this.time = 0;
}
e.prototype.onJuggle = function(e) {
this.time += e;
for (var t = !1; this.time >= this.juggleInterval; ) {
t = !0;
this.time -= this.juggleInterval;
null != this.onTick && this.onTick.call(this.thisObj);
}
return t;
};
e.prototype.setFrameRate = function(e) {
e <= 0 || (this.juggleInterval = 1e3 / e);
};
e.prototype.clear = function() {
this.time = 0;
};
e.prototype.dispose = function() {
this.time = 0;
this.juggleInterval = 0;
this.onTick = null;
this.thisObj = null;
};
e.ClassName = "AdvanceTick";
return e;
}();
n.AdvanceTick = o;
cc._RF.pop();
}, {} ],
ApplicationContext: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9ce73yWayxKRp3z6oaDGJY1", "ApplicationContext");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ApplicationContext = void 0;
var i = function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.initDatas = function() {
cc.game.setFrameRate(50);
e.prototype.initDatas.call(this);
};
t.prototype.initModules = function() {
e.prototype.initModules.call(this);
};
t.prototype.onLoadSceneComplete = function(t, n) {
e.prototype.onLoadSceneComplete.call(this, t, n);
};
t.ClassName = "ApplicationContext";
return t;
}(e("../../../Framework/Core/FContext").FContext);
n.ApplicationContext = i;
cc._RF.pop();
}, {
"../../../Framework/Core/FContext": "FContext"
} ],
ApplicationEvent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "17ce2RNwARCIb1bZwhCS6JX", "ApplicationEvent");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ApplicationEvent = void 0;
var i = function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.ClassName = "ApplicationEvent";
t.ON_EXIT_APPLICATION = "OnExitApplication";
return t;
}(e("./FEvent").FEvent);
n.ApplicationEvent = i;
cc._RF.pop();
}, {
"./FEvent": "FEvent"
} ],
Application: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "25f835SSZROFIiqisCxacZT", "Application");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.Application = void 0;
var o = e("./Assets"), i = e("../Utility/dx/dispatchFEvent"), r = e("../Events/SceneEvent"), s = e("../Managers/AudioManager"), a = function() {
function e() {}
e.Bootstrap = function(e, t, n) {
if (!this.isBootStrap) {
this.SetApplicationSize(t);
null != n ? new n() : new o.Assets();
this.context && this.context.dispose();
this.context = "function" == typeof e ? new e() : e;
this.context.initialize();
this.isBootStrap = !0;
}
};
e.SetApplicationSize = function(e) {
null != e && (this.Size = e);
};
e.SetCurrentScene = function(e) {
this.CurrentScene = e;
"isLayout" in e && e.isLayout && (cc.sys.isNative ? "isNativeLockOrien" in e && e.isNativeLockOrien : "isWebOrien" in e && e.isWebOrien);
i.dispatchFEvent(new r.SceneEvent(r.SceneEvent.SET_CURRENT_SCENE, cc.director.getScene().name));
};
e.OnCurrentSceneDestroy = function() {
this.CurrentScene = null;
};
e.SetButtonSound = function() {
if (!cc.Button.prototype.touchBeganClone) {
cc.Button.prototype.touchBeganClone = cc.Button.prototype._onTouchBegan;
cc.Button.prototype._onTouchBegan = function(e) {
this.interactable && this.enabledInHierarchy && s.AudioManager.IsCanPlayEffect && s.AudioManager.PlayEffect("button");
this.touchBeganClone(e);
};
}
};
e.AddFont = function() {
if (!cc.Label.prototype.onLoadClone) {
cc.Label.prototype.onLoadClone = cc.Label.prototype.onLoad;
cc.Label.prototype.onLoad = function() {
var e = this;
this.font || cc.assetManager.resources.load("Fonts/ALKATIPTor", cc.Font, function(t, n) {
if (e.node) {
e.font = n;
e._forceUpdateRenderData(!0);
}
});
this.onLoadClone();
};
}
};
e.Exit = function() {
this.context && this.context.dispose();
if (cc.sys.isNative) {
cc.game.end();
cc.director.end();
}
};
e.ClassName = "Application";
e.Size = cc.v2(1080, 1920);
e.CurrentScene = null;
e.context = null;
e.CanvasScale = cc.v2(1, 1);
e.isBootStrap = !1;
return e;
}();
n.Application = a;
cc._RF.pop();
}, {
"../Events/SceneEvent": "SceneEvent",
"../Managers/AudioManager": "AudioManager",
"../Utility/dx/dispatchFEvent": "dispatchFEvent",
"./Assets": "Assets"
} ],
ArrayUtility: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5ef3aZf6stF8LbEgpDNq2YA", "ArrayUtility");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ArrayUtility = void 0;
var o = function() {
function e() {}
e.SortOn = function(e, t) {
e.sort(function(e, n) {
return e[t] - n[t];
});
};
e.SortNum = function(e) {
e.sort(function(e, t) {
return e - t;
});
};
e.Difference = function(e, t) {
var n = [];
e = e.concat();
t = t.concat();
for (var o = 0; o < e.length; o++) {
var i = t.indexOf(e[o]);
if (-1 != i) {
t.splice(i, 1);
e.splice(o, 1);
o--;
}
}
e.length > 0 && (n = n.concat(e));
t.length > 0 && (n = n.concat(t));
return n;
};
e.Identical = function(e, t) {
for (var n = [], o = 0; o < e.length; o++) -1 != t.indexOf(e[o]) && n.push(e[o]);
return n;
};
return e;
}();
n.ArrayUtility = o;
cc._RF.pop();
}, {} ],
AssetUtility: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "03d44QBJGpBzqea9TBFxmSu", "AssetUtility");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.AssetUtility = void 0;
var o = e("../Managers/LanguageManager"), i = e("./StringUtility"), r = function() {
function e() {}
e.GetCacheUUIDs = function() {
return {};
};
e.RemoveInvalidAsset = function(e) {
for (var t = 0; t < e.assets.length; t++) if (null == e.assetTypes[t]) {
e.assets.splice(t, 1);
e.assetTypes.splice(t, 1);
t--;
}
};
e.GetAtlas = function(e) {
var t = this.findAtlas(e, 0);
return t == e && -1 == t.indexOf(this.SPLIT_CHAR) ? "null" : i.StringUtility.TrimSpace(t);
};
e.findAtlas = function(e, t) {
if (t > 3) return e + " ";
if (null != e && -1 != e.indexOf(this.SPLIT_CHAR)) {
var n = this.SplitAtlas(e), i = o.LanguageManager.GetLang(n[0]);
"null" != i && "" != i && (n[0] = i);
e = n.join(this.SPLIT_CHAR);
} else {
var r = o.LanguageManager.GetLang(e);
null != r && "null" != r && (e = this.findAtlas(r, ++t));
}
return e;
};
e.SplitAtlas = function(e) {
return e.split(this.SPLIT_CHAR);
};
e.GetAssetPath = function(e) {
var t = this.SplitAtlas(e);
return t.length < 2 ? e : t[0];
};
e.SPLIT_CHAR = "?:";
return e;
}();
n.AssetUtility = r;
cc._RF.pop();
}, {
"../Managers/LanguageManager": "LanguageManager",
"./StringUtility": "StringUtility"
} ],
Assets: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ca517oU+PhGsqWFdtRSr1QM", "Assets");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.Assets = void 0;
var o = e("../Enums/LoaderType"), i = e("../Enums/AudioType"), r = e("../Managers/LanguageManager"), s = function() {
function e() {
this.prefabs = "Prefabs/";
this.audios = "Audios/";
this.textures = "Textures/";
this.languages = "Languages/";
this.fonts = "Fonts/";
this.dragonBones = "DragonBones/";
e._instance = this;
}
Object.defineProperty(e, "instance", {
get: function() {
null == e._instance && (e._instance = new e());
return e._instance;
},
enumerable: !1,
configurable: !0
});
e.GetAudio = function(t, n) {
var o = this.musicDir;
n == i.AudioType.EFFECT ? o = this.effectDir : n == i.AudioType.VOICE && (o = this.voiceDir + r.LanguageManager.CurrentName + "/");
return e.instance.audios + o + t;
};
e.GetPrefab = function(t) {
return 0 == t.indexOf(e.instance.prefabs) ? t : e.instance.prefabs + t;
};
e.GetTexture = function(t, n) {
void 0 === n && (n = "png");
return e.instance.textures + t;
};
e.GetFonts = function(t) {
return e.instance.fonts + t;
};
e.GetLanguage = function(t) {
return e.instance.languages + t;
};
e.GetDragonBone = function(t) {
return {
name: e.instance.dragonBones + t,
ske: e.instance.dragonBones + t + "_ske",
tex: e.instance.dragonBones + t + "_tex",
img: e.instance.dragonBones + t + "_tex"
};
};
e.GetAssets = function(t) {
for (var n = {
assets: [],
assetTypes: []
}, i = 0; i < t.length; i++) if (null != t[i]) if ("string" == typeof t[i]) {
n.assets.push(this.GetPrefab(t[i]));
n.assetTypes.push(cc.Prefab);
} else if (t[i].type == o.LoaderType.PREFAB) {
n.assets.push(this.GetPrefab(t[i].asset));
n.assetTypes.push(cc.Prefab);
} else if (t[i].type == o.LoaderType.AUDIO) ; else if (t[i].type == o.LoaderType.IMAGE) {
n.assets.push(this.GetTexture(t[i].asset));
n.assetTypes.push(cc.Texture2D);
} else if (t[i].type == o.LoaderType.DRAGON_BONE) {
var r = e.GetDragonBone(t[i].asset);
n.assets.push(r.ske);
n.assetTypes.push(dragonBones.DragonBonesAsset);
n.assets.push(r.tex);
n.assetTypes.push(dragonBones.DragonBonesAtlasAsset);
n.assets.push(r.name);
n.assetTypes.push(null);
} else if (t[i].type == o.LoaderType.SPRITE_ATLAS) {
n.assets.push(this.GetTexture(t[i].asset));
n.assetTypes.push(cc.SpriteAtlas);
}
return n;
};
e.effectDir = "Effects/";
e.voiceDir = "Voices/";
e.musicDir = "Musics/";
e._instance = null;
return e;
}();
n.Assets = s;
cc._RF.pop();
}, {
"../Enums/AudioType": "AudioType",
"../Enums/LoaderType": "LoaderType",
"../Managers/LanguageManager": "LanguageManager"
} ],
AudioManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0f14b2gpXJDybJlR8Pypryc", "AudioManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.AudioManager = void 0;
var o = e("../Enums/AudioType"), i = e("./StoreManager"), r = e("../Sounds/AudioStacker"), s = e("../Core/Assets"), a = function() {
function e() {}
Object.defineProperty(e, "IsCanPlayEffect", {
get: function() {
return this.isCanPlayEffect;
},
set: function(e) {
this.isCanPlayEffect != e && (this.isCanPlayEffect = e);
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e, "IsCanPlayMusic", {
get: function() {
return this.isCanPlayMusic;
},
set: function(e) {
if (this.isCanPlayMusic != e) {
this.isCanPlayMusic = e;
!e && this.music && this.music.clear();
}
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e, "EffectVolum", {
get: function() {
return this.effectVolum;
},
set: function(e) {
if (this.effectVolum != e) {
this.effectVolum = e;
this.effect && (this.effect.volume = this.effectVolum);
this.voice && (this.voice.volume = this.effectVolum);
}
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e, "MusicVolume", {
get: function() {
return this.musicVolume;
},
set: function(e) {
if (this.musicVolume != e) {
this.musicVolume = e;
this.music && (this.music.volume = this.musicVolume);
}
},
enumerable: !1,
configurable: !0
});
e.PlayEffect = function(e, t) {
void 0 === t && (t = !0);
if (this.IsCanPlayEffect) {
var n = null;
if (t) {
(n = i.StoreManager.New(r.AudioStacker)).onComplete = n.dispose;
n.clear();
} else {
null == this.effect && (this.effect = i.StoreManager.New(r.AudioStacker));
n = this.effect;
}
n.volume = this.effectVolum;
n.addAudio(s.Assets.GetAudio(e, o.AudioType.EFFECT));
n.play();
}
};
e.PlayVoice = function(e, t) {
void 0 === t && (t = !1);
if (this.IsCanPlayEffect) {
var n = null;
if (t) {
(n = i.StoreManager.New(r.AudioStacker)).onComplete = n.dispose;
n.clear();
} else {
null == this.voice && (this.voice = i.StoreManager.New(r.AudioStacker));
n = this.voice;
}
n.volume = this.effectVolum;
n.addAudio(s.Assets.GetAudio(e, o.AudioType.VOICE));
n.play();
}
};
e.PlayNumVoice = function(e) {
if (this.IsCanPlayEffect) {
null == this.voice && (this.voice = i.StoreManager.New(r.AudioStacker));
this.voice.addAudio(s.Assets.GetAudio(e, o.AudioType.VOICE));
this.voice.play();
}
};
e.PlayMusic = function(e) {
if (this.IsCanPlayMusic) {
null == this.music && (this.music = i.StoreManager.New(r.AudioStacker));
var t = s.Assets.GetAudio(e, o.AudioType.MUSIC);
if (!this.music.currentAudio || this.music.currentAudio.name != t) {
this.music.volume = this.musicVolume;
this.music.clear();
this.music.loop = !0;
this.music.addAudio(t);
this.music.play();
}
}
};
e.StopPlay = function() {
this.effect && this.effect.clear();
this.voice && this.voice.clear();
};
e.isCanPlayEffect = !0;
e.isCanPlayMusic = !0;
e.effectVolum = 1;
e.musicVolume = 1;
return e;
}();
n.AudioManager = a;
cc._RF.pop();
}, {
"../Core/Assets": "Assets",
"../Enums/AudioType": "AudioType",
"../Sounds/AudioStacker": "AudioStacker",
"./StoreManager": "StoreManager"
} ],
AudioStacker: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "8c6f80uOvFBFJRxOEWfmBmV", "AudioStacker");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.AudioStacker = void 0;
var o = e("./Audio"), i = e("../Managers/StoreManager"), r = function() {
function e() {
this.loop = !1;
this.audios = [];
this._currentAudio = null;
this.isPlaying = !1;
this._volume = 1;
this.isForceStop = !1;
}
Object.defineProperty(e.prototype, "currentAudio", {
get: function() {
return this._currentAudio;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "volume", {
get: function() {
return this._volume;
},
set: function(e) {
this._volume = e;
this.currentAudio && (this.currentAudio.volume = this._volume);
if (e > 0 && this.isForceStop && this.isPlaying) {
this.isForceStop = !1;
this.playNextSound();
}
},
enumerable: !1,
configurable: !0
});
e.prototype.addAudio = function(e) {
this.audios.push(e);
};
e.prototype.play = function() {
if (!this.isPlaying) {
this.isPlaying = !0;
this.playNextSound();
}
};
e.prototype.playNextSound = function() {
if (0 == this.volume && this.loop && this.isPlaying) this.isForceStop = !0; else if (0 == this.audios.length) {
null != this.onComplete && (0 == this.onComplete.length ? this.onComplete() : this.onComplete(this));
this.clear();
} else {
var e = this.audios.shift();
this.currentAudio && this.currentAudio.dispose();
this._currentAudio = i.StoreManager.New(o.Audio);
this.currentAudio.volume = this.volume;
this.currentAudio.name = e;
this.currentAudio.audioAsset = e;
this.currentAudio.onComplete = this.playNextSound.bind(this);
this.currentAudio.play();
this.loop && this.audios.push(e);
}
};
e.prototype.clear = function() {
this.isPlaying = !1;
this.currentAudio && this.currentAudio.dispose();
this._currentAudio = null;
this.audios.length = 0;
this.loop = !1;
this.isForceStop = !1;
};
e.prototype.dispose = function() {
this.clear();
this.onComplete = null;
this._currentAudio = null;
};
e.ClassName = "AudioStacker";
return e;
}();
n.AudioStacker = r;
cc._RF.pop();
}, {
"../Managers/StoreManager": "StoreManager",
"./Audio": "Audio"
} ],
AudioType: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "58f3esKNb9J/bV3asztouN8", "AudioType");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.AudioType = void 0;
(function(e) {
e[e.MUSIC = 0] = "MUSIC";
e[e.EFFECT = 1] = "EFFECT";
e[e.VOICE = 2] = "VOICE";
})(n.AudioType || (n.AudioType = {}));
cc._RF.pop();
}, {} ],
Audio: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4f1d9DpYfVEw5rlK+k+/6iu", "Audio");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.Audio = void 0;
var o = e("../Managers/CacheManager"), i = e("../Managers/ResourceManager"), r = e("../Managers/StoreManager"), s = e("../Utility/dx/Fun"), a = function() {
function e() {
this.loop = !1;
this._volume = 1;
this._isPlaying = !1;
this.audioID = -1;
}
Object.defineProperty(e.prototype, "isPlaying", {
get: function() {
return this._isPlaying;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "volume", {
get: function() {
return this._volume;
},
set: function(e) {
this._volume = e;
null != this._sound && -1 != this.audioID && cc.audioEngine.setVolume(this.audioID, this._volume);
},
enumerable: !1,
configurable: !0
});
e.prototype.play = function() {
if (null != this.audioAsset && "" != this.audioAsset && !this.isPlaying) {
this._isPlaying = !0;
this._sound = o.CacheManager.GetCache(this.audioAsset);
null != this._sound ? this.playSound() : i.ResourceManager.LoadAudio(this.name, s.Fun(this.onAudioComplete, this));
}
};
e.prototype.stop = function() {
if (this.isPlaying) {
this._isPlaying = !1;
this.stopSound();
}
};
e.prototype.onAudioComplete = function(e) {
this._sound = o.CacheManager.GetCache(e);
this.isPlaying && this.playSound();
};
e.prototype.playSound = function() {
var e = this;
if (null != this._sound) {
this.audioID = cc.audioEngine.play(this._sound, this.loop, this.volume);
cc.audioEngine.setFinishCallback(this.audioID, function() {
return e.onPlayAudioComplete();
});
}
};
e.prototype.stopSound = function() {
null != this._sound && -1 != this.audioID && cc.audioEngine.stop(this.audioID);
};
e.prototype.onPlayAudioComplete = function() {
this.audioID = -1;
null != this.onComplete && this.onComplete();
};
e.prototype.dispose = function() {
this.onComplete = null;
this.stopSound();
this.name = null;
this._isPlaying = !1;
this._sound = null;
this.volume = 1;
this.loop = !1;
this.audioID = -1;
r.StoreManager.Store(this);
};
e.ClassName = "Audio";
return e;
}();
n.Audio = a;
cc._RF.pop();
}, {
"../Managers/CacheManager": "CacheManager",
"../Managers/ResourceManager": "ResourceManager",
"../Managers/StoreManager": "StoreManager",
"../Utility/dx/Fun": "Fun"
} ],
BookCoverBinder: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5e5089WbHNNma1Y5cXwRmu4", "BookCoverBinder");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.BookCoverBinder = void 0;
var i = e("../../../../Framework/Core/FBinder"), r = e("../../../../Framework/Events/ModuleEvent"), s = e("../../../../Framework/Managers/EventManager"), a = e("../../../../Framework/Utility/dx/getNodeChildByName"), c = e("../../Common/ModuleNames"), l = function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.initViews = function() {
e.prototype.initViews.call(this);
this.closeBtn = a.getNodeChildByName(this.asset, "btnClose");
};
t.prototype.addEvents = function() {
e.prototype.addEvents.call(this);
this.closeBtn.on(cc.Node.EventType.TOUCH_START, this.closeBtnClick, this);
};
t.prototype.closeBtnClick = function() {
s.EventManager.dispatchEvent(new r.ModuleEvent(r.ModuleEvent.HIDE_MODULE, c.ModuleNames.BookCoverModule));
};
return t;
}(i.FBinder);
n.BookCoverBinder = l;
cc._RF.pop();
}, {
"../../../../Framework/Core/FBinder": "FBinder",
"../../../../Framework/Events/ModuleEvent": "ModuleEvent",
"../../../../Framework/Managers/EventManager": "EventManager",
"../../../../Framework/Utility/dx/getNodeChildByName": "getNodeChildByName",
"../../Common/ModuleNames": "ModuleNames"
} ],
BookCoverData: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "af523p0fixIppWtubsKjBZB", "BookCoverData");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.BookCoverData = void 0;
var o = function() {
function e() {}
e.setData = function(e) {
this.data = e;
};
e.getData = function() {
return this.data;
};
e.data = null;
return e;
}();
n.BookCoverData = o;
cc._RF.pop();
}, {} ],
BookCoverModule: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "cf12e3eIBRJ5b18JfGPhG5Z", "BookCoverModule");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.BookCoverModule = void 0;
var i = e("../../../../Framework/Core/FModule"), r = e("./BookCoverBinder"), s = e("./BookCoverData"), a = function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
Object.defineProperty(t.prototype, "assets", {
get: function() {
return [ "BookCover/BookCoverBinder" ];
},
enumerable: !1,
configurable: !0
});
t.prototype.createViews = function() {
e.prototype.createViews.call(this);
this.binder = new r.BookCoverBinder();
};
t.prototype.show = function(t, n) {
s.BookCoverData.setData(n);
e.prototype.show.call(this, t, n);
};
t.ClassName = "BookCoverModule";
return t;
}(i.FModule);
n.BookCoverModule = a;
cc._RF.pop();
}, {
"../../../../Framework/Core/FModule": "FModule",
"./BookCoverBinder": "BookCoverBinder",
"./BookCoverData": "BookCoverData"
} ],
BookShelfBinder: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "12f0bMdKp1H4KYOPnEjudxN", "BookShelfBinder");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../../Framework/Core/Assets"), s = e("../../../../Framework/Core/FBinder"), a = e("../../../../Framework/Managers/CacheManager"), c = e("../../../../Framework/Managers/ResourceManager"), l = e("../../../../Framework/Managers/StoreManager"), u = e("../../../../Framework/Utility/dx/Fun"), p = e("../../../../Framework/Utility/dx/getNodeChildByName"), h = e("./BookShelfItem"), d = e("./BookShelfManager"), f = cc._decorator, g = f.ccclass, y = (f.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.bookShelfItem = null;
return t;
}
t.prototype.initViews = function() {
e.prototype.initViews.call(this);
this.bookShelfItem = p.getNodeChildByName(this.asset, "BookShelfItem");
this.initShow();
};
t.prototype.initShow = function() {
var e = this, t = d.BookShelfManager.getBookShelfList(), n = t.length;
c.ResourceManager.LoadPrefab("BookShelf/BookShelfItem", u.Fun(function(o) {
for (var i = 0; i < n; i++) {
var s = l.StoreManager.NewNode(a.CacheManager.GetCache(r.Assets.GetPrefab(o)));
s.getComponent(h.BookShelfItem).initShow(t[i]);
e.bookShelfItem.addChild(s);
s.x = 340 * i - 350;
}
}, this));
};
return t = i([ g ], t);
}(s.FBinder));
n.default = y;
cc._RF.pop();
}, {
"../../../../Framework/Core/Assets": "Assets",
"../../../../Framework/Core/FBinder": "FBinder",
"../../../../Framework/Managers/CacheManager": "CacheManager",
"../../../../Framework/Managers/ResourceManager": "ResourceManager",
"../../../../Framework/Managers/StoreManager": "StoreManager",
"../../../../Framework/Utility/dx/Fun": "Fun",
"../../../../Framework/Utility/dx/getNodeChildByName": "getNodeChildByName",
"./BookShelfItem": "BookShelfItem",
"./BookShelfManager": "BookShelfManager"
} ],
BookShelfInfo: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "7a03cNThEVEAbUn5ZIllOr0", "BookShelfInfo");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.BookShelfInfo = void 0;
var i = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.id = 0;
t.type = 0;
t.name = "";
t.price = 0;
return t;
}
return t;
}(e("../../../../Framework/Core/FObject").FObject);
n.BookShelfInfo = i;
cc._RF.pop();
}, {
"../../../../Framework/Core/FObject": "FObject"
} ],
BookShelfItem: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e7ca6TpWjlNZpqZti/8kY1s", "BookShelfItem");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
n.BookShelfItem = void 0;
var r = e("../../../../Framework/Core/FView"), s = e("../../../../Framework/Utility/dx/dispatchFEventWith"), a = e("../../../../Framework/Utility/dx/getNodeChildByName"), c = e("../../Common/GameEvent"), l = cc._decorator, u = l.ccclass, p = (l.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.bookIcon = null;
t.bookLabel = null;
t.priceLabel = null;
t.bookInfo = null;
return t;
}
t.prototype.onLoad = function() {
this.bookIcon = a.getNodeChildByName(this.node, "BookIcon");
this.bookLabel = a.getNodeChildByName(this.node, "BookLabel", cc.Label);
this.priceLabel = a.getNodeChildByName(this.node, "PriceLabel", cc.Label);
this.updateShow();
};
t.prototype.initShow = function(e) {
this.bookInfo = e;
};
t.prototype.addEvents = function() {
e.prototype.addEvents.call(this);
this.bookIcon.on(cc.Node.EventType.TOUCH_START, function() {
s.dispatchFEventWith(c.GameEvent.OpenBookCover, {});
}, this);
};
t.prototype.updateShow = function() {
this.bookLabel.string = this.bookInfo.name;
this.priceLabel.string = this.bookInfo.price.toString();
};
return t = i([ u ], t);
}(r.FView));
n.BookShelfItem = p;
cc._RF.pop();
}, {
"../../../../Framework/Core/FView": "FView",
"../../../../Framework/Utility/dx/dispatchFEventWith": "dispatchFEventWith",
"../../../../Framework/Utility/dx/getNodeChildByName": "getNodeChildByName",
"../../Common/GameEvent": "GameEvent"
} ],
BookShelfManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "02dc7nOtc9NbrO4P22OxtHA", "BookShelfManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.BookShelfManager = void 0;
var o = e("../../../../Framework/Structs/Dictionary"), i = e("./BookShelfInfo"), r = function() {
function e() {}
e.initConfig = function() {
cc.resources.load("Config/Scene", function(t, n) {
t ? console.log("err:", t) : e.setupConfigData(n.json.bookShelf);
});
};
e.setupConfigData = function(e) {
for (var t = e.length, n = null, o = 0; o < t; ++o) {
(n = new i.BookShelfInfo()).id = e[o].id;
n.type = e[o].type;
n.name = e[o].name;
n.price = e[o].price;
this.bookShelfDic.setValue(n.id, n);
}
};
e.getBookShelfList = function() {
return this.bookShelfDic.getValues();
};
e.getBookShilfInfoById = function(e) {
return this.bookShelfDic.getValue(e);
};
e.bookShelfDic = new o.Dictionary();
return e;
}();
n.BookShelfManager = r;
cc._RF.pop();
}, {
"../../../../Framework/Structs/Dictionary": "Dictionary",
"./BookShelfInfo": "BookShelfInfo"
} ],
BookShelfModule: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "76ad0gfT3JNEIwexxjm+E/n", "BookShelfModule");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.BookShelfModule = void 0;
var i = e("../../../../Framework/Core/FModule"), r = e("./BookShelfBinder"), s = function(e) {
o(t, e);
function t() {
var t = e.call(this) || this;
t.isNeedPreload = !1;
t.isReleaseAsset = !1;
t.delayReleaseAssetTime = 0;
return t;
}
Object.defineProperty(t.prototype, "assets", {
get: function() {
return [ "BookShelf/BookShelfBinder" ];
},
enumerable: !1,
configurable: !0
});
t.prototype.createViews = function() {
e.prototype.createViews.call(this);
this.binder = new r.default();
};
t.prototype.showViews = function() {
e.prototype.showViews.call(this);
};
t.prototype.hideViews = function() {
e.prototype.hideViews.call(this);
};
t.ClassName = "BookShelfModule";
return t;
}(i.FModule);
n.BookShelfModule = s;
cc._RF.pop();
}, {
"../../../../Framework/Core/FModule": "FModule",
"./BookShelfBinder": "BookShelfBinder"
} ],
ButtonStatus: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1d766OuFP1JSKE0GU/crkV+", "ButtonStatus");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ButtonStatus = void 0;
(function(e) {
e[e.NORMAL = 0] = "NORMAL";
e[e.HOVER = 1] = "HOVER";
e[e.PRESSED = 2] = "PRESSED";
e[e.DISABLED = 3] = "DISABLED";
})(n.ButtonStatus || (n.ButtonStatus = {}));
cc._RF.pop();
}, {} ],
CButton: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "fd5dcWJVfVD+KF0/ZhXERTl", "CButton");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
n.CButton = void 0;
var r = e("../Utility/dx/dispatchSoundEvent"), s = e("../Events/SoundEvent"), a = e("../Utility/dx/dispatchFEventWith"), c = cc._decorator, l = c.ccclass, u = c.inspector, p = c.menu, h = c.executeInEditMode, d = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.clickAudio = null;
t.click = null;
t.clickEvent = null;
return t;
}
t.prototype._onTouchEnded = function(t) {
var n = this._pressed;
e.prototype._onTouchEnded.call(this, t);
if (this._pressed != n) {
null != this.click && (0 == this.click.length ? this.click.excute() : this.click.excute([ this ]));
null != this.clickEvent && "" != this.clickEvent && a.dispatchFEventWith(this.clickEvent, this);
null != this.clickAudio && "" != this.clickAudio && r.dispatchSoundEvent(s.SoundEvent.PLAY_EFFECT, this.clickAudio);
}
t.stopPropagation();
};
t.prototype.onDestroy = function() {
this.clickAudio = null;
this.clickEvent = null;
this.click && (this.click = null);
};
t.ClassName = "CButton";
return t = i([ l, h, p("Components/基础组件/CButton"), u("packages://inspector/inspectors/comps/button.js") ], t);
}(cc.Button);
n.CButton = d;
cc._RF.pop();
}, {
"../Events/SoundEvent": "SoundEvent",
"../Utility/dx/dispatchFEventWith": "dispatchFEventWith",
"../Utility/dx/dispatchSoundEvent": "dispatchSoundEvent"
} ],
CDragonBones: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5e9cdCiCJZCkrRq90Dmn7sF", "CDragonBones");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.CDragonBones = void 0;
var o = function() {
function e() {}
e.setDragonBones = function(e, t, n, o, i, r) {
e.dragonAsset = null;
e.dragonAtlasAsset = null;
e.armatureName = "";
cc.resources.load(t, dragonBones.DragonBonesAsset, function(t, s) {
cc.resources.load(n, dragonBones.DragonBonesAtlasAsset, function(t, n) {
e.dragonAsset = s;
e.dragonAtlasAsset = n;
e.armatureName = o;
e.playAnimation(i, r);
});
});
};
return e;
}();
n.CDragonBones = o;
cc._RF.pop();
}, {} ],
CLanguageButtonInfo: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1c5c8oldU9FhbJ7nj3DiZj9", "CLanguageButtonInfo");
var o = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
n.CLanguageButtonInfo = void 0;
var i = cc._decorator, r = i.ccclass, s = i.property, a = function() {
function e() {
this._normal = "";
this._pressed = "";
this._hover = "";
this._disabled = "";
this.callback = null;
}
Object.defineProperty(e.prototype, "normal", {
get: function() {
return this._normal;
},
set: function(e) {
this._normal = e;
this.updateStatus();
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "pressed", {
get: function() {
return this._pressed;
},
set: function(e) {
this._pressed = e;
this.updateStatus();
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "hover", {
get: function() {
return this._hover;
},
set: function(e) {
this._hover = e;
this.updateStatus();
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "disabled", {
get: function() {
return this._disabled;
},
set: function(e) {
this._disabled = e;
this.updateStatus();
},
enumerable: !1,
configurable: !0
});
e.prototype.updateStatus = function() {
null != this.callback && this.callback();
};
e.ClassName = "CLanguageButtonInfo";
o([ s({
serializable: !0
}) ], e.prototype, "_normal", void 0);
o([ s({
serializable: !0
}) ], e.prototype, "normal", null);
o([ s({
serializable: !0
}) ], e.prototype, "_pressed", void 0);
o([ s({
serializable: !0
}) ], e.prototype, "pressed", null);
o([ s({
serializable: !0
}) ], e.prototype, "_hover", void 0);
o([ s({
serializable: !0
}) ], e.prototype, "hover", null);
o([ s({
serializable: !0
}) ], e.prototype, "_disabled", void 0);
o([ s({
serializable: !0
}) ], e.prototype, "disabled", null);
return e = o([ r("CLanguageButtonInfo") ], e);
}();
n.CLanguageButtonInfo = a;
cc._RF.pop();
}, {} ],
CLanguage: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "aac47DTZF1A2aLUFrqV+nbv", "CLanguage");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
n.CLanguage = void 0;
var r = e("../Enums/LanguageType"), s = e("./Infos/CLanguageButtonInfo"), a = e("../Utility/dx/excuteNodeEvents"), c = e("../Managers/LanguageManager"), l = e("../Utility/AssetUtility"), u = e("../Managers/ResourceManager"), p = e("../Utility/dx/formatString"), h = e("../Managers/EventManager"), d = cc._decorator, f = d.ccclass, g = d.property, y = d.executeInEditMode, m = d.menu, v = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._type = r.LanguageType.TEXT;
t._target = null;
t._key = "";
t._buttonInfo = null;
t._appendLangIndex = !1;
t._args = [];
t.events = [];
t._comp = null;
return t;
}
Object.defineProperty(t.prototype, "type", {
get: function() {
return this._type;
},
set: function(e) {
if (this._type != e) {
this._type = e;
this.invalidate();
}
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(t.prototype, "target", {
get: function() {
return this._target;
},
set: function(e) {
if (this._target != e) {
this._target = e;
this.invalidate();
}
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(t.prototype, "key", {
get: function() {
return this._key;
},
set: function(e) {
if (this._key != e) {
this._key = e;
this.invalidate();
}
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(t.prototype, "buttonInfo", {
get: function() {
return this._buttonInfo;
},
set: function(e) {
this._buttonInfo = e;
this._buttonInfo.callback = this.invalidate.bind(this);
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(t.prototype, "appendLangIndex", {
get: function() {
return this._appendLangIndex;
},
set: function(e) {
this._appendLangIndex = e;
this.invalidate();
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(t.prototype, "args", {
get: function() {
return this._args;
},
set: function(e) {
this._args = e;
this.invalidate();
},
enumerable: !1,
configurable: !0
});
t.prototype.start = function() {
this.invalidate();
};
t.prototype.onChangeLanguage = function(e) {
this.type != r.LanguageType.FUNCTION ? this.invalidate() : a.excuteNodeEvents(this.events);
};
t.prototype.invalidate = function() {
var e = this;
if (c.LanguageManager.CurrentIndex < 0) 0; else {
var t = this.comp;
if (null != t) if (this.type == r.LanguageType.TEXT) if ("" == this.key) t.string = ""; else {
if (null == (s = this.getAsset(this.key)) || "null" == s) t.font = null; else {
var n = l.AssetUtility.SplitAtlas(s);
if (n.length > 1 && "" != n[0] && "null" != n[0]) {
var o = n.shift(), i = l.AssetUtility.GetAtlas(o);
"" != i && null != i && "null" != i ? u.ResourceManager.LoadFont(i, t) : "" != o && null != o && "null" != o ? u.ResourceManager.LoadFont(o, t) : t.font = null;
} else t.font = null;
t.font || cc.assetManager.resources.load("Fonts/ALKATIPTor", cc.Font, function(n, o) {
if (e.node) {
t.font = o;
t._forceUpdateRenderData(!0);
}
});
t.string = n[0];
}
} else if (this.type == r.LanguageType.SPRITE) {
if (null == (s = this.getAsset(this.key)) || "null" == s) t.spriteFrame = null; else {
this.appendLangIndex && (s += c.LanguageManager.CurrentIndex);
u.ResourceManager.LoadSpriteFrame(s, t);
}
} else if (this.type == r.LanguageType.BUTTON) {
if (null == this.buttonInfo) return;
if ("" != this.buttonInfo.normal) {
var s = this.getAsset(this.buttonInfo.normal);
this.appendLangIndex && (s += c.LanguageManager.CurrentIndex);
u.ResourceManager.LoadButtonSpriteFrame(s, t, "normalSprite");
}
if ("" != this.buttonInfo.pressed) {
s = this.getAsset(this.buttonInfo.pressed);
this.appendLangIndex && (s += c.LanguageManager.CurrentIndex);
u.ResourceManager.LoadButtonSpriteFrame(s, t, "pressedSprite");
}
if ("" != this.buttonInfo.hover) {
s = this.getAsset(this.buttonInfo.hover);
this.appendLangIndex && (s += c.LanguageManager.CurrentIndex);
u.ResourceManager.LoadButtonSpriteFrame(s, t, "hoverSprite");
}
if ("" != this.buttonInfo.disabled) {
s = this.getAsset(this.buttonInfo.disabled);
this.appendLangIndex && (s += c.LanguageManager.CurrentIndex);
u.ResourceManager.LoadButtonSpriteFrame(s, t, "disabledSprite");
}
}
}
};
t.prototype.getAsset = function(e) {
return p.formatString(l.AssetUtility.GetAtlas(e), this.args);
};
Object.defineProperty(t.prototype, "comp", {
get: function() {
null == this.target && null != this.node && (this.target = this.node);
if (null != this._comp) return this._comp;
var e = null;
this.type == r.LanguageType.SPRITE ? e = this.target.getComponent(cc.Sprite) : this.type == r.LanguageType.BUTTON ? e = this.target.getComponent(cc.Button) : this.type == r.LanguageType.TEXT && this.target && null == (e = this.target.getComponent(cc.Label)) && (e = this.target.getComponent(cc.RichText));
this._comp = e;
return e;
},
enumerable: !1,
configurable: !0
});
t.prototype.onEnable = function() {
c.LanguageManager.AddItem(this);
};
t.prototype.onDisable = function() {
h.EventManager.removeEvent(this);
c.LanguageManager.RemoveItem(this);
};
t.ClassName = "CLanguage";
i([ g({
type: cc.Enum(r.LanguageType)
}) ], t.prototype, "_type", void 0);
i([ g({
serializable: !0
}) ], t.prototype, "_target", void 0);
i([ g({
serializable: !0
}) ], t.prototype, "_key", void 0);
i([ g({
type: s.CLanguageButtonInfo,
serializable: !0
}) ], t.prototype, "_buttonInfo", void 0);
i([ g({
serializable: !0
}) ], t.prototype, "_appendLangIndex", void 0);
i([ g({
type: cc.String
}) ], t.prototype, "_args", void 0);
i([ g({
type: cc.Enum(r.LanguageType),
tooltip: "多语言类型"
}) ], t.prototype, "type", null);
i([ g({
type: cc.Node,
tooltip: "多语言目标Node，Text支持cc.Label和cc.RichText"
}) ], t.prototype, "target", null);
i([ g({
serializable: !0,
visible: function() {
return this.type == r.LanguageType.TEXT || this.type == r.LanguageType.SPRITE;
},
tooltip: "多语言文件中的Key值"
}) ], t.prototype, "key", null);
i([ g({
type: s.CLanguageButtonInfo,
visible: function() {
return this.type == r.LanguageType.BUTTON;
},
tooltip: "多语言Button设置"
}) ], t.prototype, "buttonInfo", null);
i([ g({
visible: function() {
return this.type == r.LanguageType.SPRITE || this.type == r.LanguageType.BUTTON;
},
tooltip: "在多语言取Key值会在key值后面拼接上当前的多语言下标值"
}) ], t.prototype, "appendLangIndex", null);
i([ g({
type: cc.String,
visible: function() {
return this.type != r.LanguageType.FUNCTION;
},
tooltip: "显示多语言文本时，允许使用{0}...{n}的方式格式化字符串"
}) ], t.prototype, "args", null);
i([ g({
type: [ cc.Component.EventHandler ],
visible: function() {
return this.type == r.LanguageType.FUNCTION;
}
}) ], t.prototype, "events", void 0);
return t = i([ f, m("Components/多语言组件/CLanguage"), y ], t);
}(cc.Component);
n.CLanguage = v;
cc._RF.pop();
}, {
"../Enums/LanguageType": "LanguageType",
"../Managers/EventManager": "EventManager",
"../Managers/LanguageManager": "LanguageManager",
"../Managers/ResourceManager": "ResourceManager",
"../Utility/AssetUtility": "AssetUtility",
"../Utility/dx/excuteNodeEvents": "excuteNodeEvents",
"../Utility/dx/formatString": "formatString",
"./Infos/CLanguageButtonInfo": "CLanguageButtonInfo"
} ],
CNodePool: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "639eeOVku9Ki6PwZ+SJcC5I", "CNodePool");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.CNodePool = void 0;
var o = function() {
function e(e) {
this.nodeTemplate = null;
this.pool = null;
this.nodeTemplate = cc.instantiate(e);
this.pool = new cc.NodePool();
e instanceof cc.Prefab && e.destroy();
}
e.prototype.Get = function() {
if (this.nodeTemplate && this.pool) {
var e = this.pool.get();
e || (e = cc.instantiate(this.nodeTemplate));
return e;
}
};
e.prototype.Put = function(e) {
if (this.nodeTemplate && this.pool && e) {
e.parent && e.removeFromParent();
this.pool.put(e);
}
};
e.prototype.Size = function() {
if (this.nodeTemplate && this.pool) return this.pool.size();
};
e.prototype.Clear = function() {
this.nodeTemplate && this.pool && this.pool.clear();
};
e.prototype.Destroy = function() {
this.pool && this.pool.clear();
this.nodeTemplate && this.nodeTemplate.destroy();
this.pool = null;
this.nodeTemplate = null;
};
e.prototype.PutArr = function(e) {
if (e && !(e.length <= 0)) for (var t = e.length - 1; t >= 0; t--) this.Put(e[t]);
};
return e;
}();
n.CNodePool = o;
cc._RF.pop();
}, {} ],
CScrollView: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "be644Cigp1DHYjd4tHsJJYc", "CScrollView");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
n.CScrollView = void 0;
var r = e("./ScrollEasy"), s = cc._decorator, a = s.ccclass, c = s.property, l = (s.inspector, 
s.menu), u = s.executeInEditMode, p = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._useScrollEasy = !1;
t._scrollEasy = null;
return t;
}
Object.defineProperty(t.prototype, "useScrollEasy", {
get: function() {
return this._useScrollEasy;
},
set: function(e) {
this._useScrollEasy = e;
this.autoCreateSv();
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(t.prototype, "scrollEasy", {
get: function() {
return this._scrollEasy;
},
enumerable: !1,
configurable: !0
});
t.prototype.onDestroy = function() {
this._scrollEasy && this._scrollEasy.Clear();
};
t.prototype.autoCreateSv = function() {};
t.prototype.bindScrollEasy = function() {
var e = cc.find("spring_top", this.content), t = cc.find("layout_list", this.content), n = cc.find("spring_bottom", this.content);
this._scrollEasy = new r.ScrollEasy();
this._scrollEasy.BindNode(this, t, e, n);
};
t.ClassName = "CScrollView";
i([ c({
visible: !1
}) ], t.prototype, "_useScrollEasy", void 0);
i([ c({
displayName: "是否使用简易滑窗功能",
tooltip: "目前仅支持垂直滑窗",
type: cc.Boolean
}) ], t.prototype, "useScrollEasy", null);
return t = i([ a, u, l("Components/基础组件/CScrollView") ], t);
}(cc.ScrollView);
n.CScrollView = p;
cc._RF.pop();
}, {
"./ScrollEasy": "ScrollEasy"
} ],
CacheManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "bc63506HqRCr4RrNHm+lSNq", "CacheManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.CacheManager = void 0;
var o = e("./../Utility/AssetUtility"), i = e("../Utility/dx/cancelDelayReleaseRes"), r = e("../Utility/dx/getFileName"), s = e("./InstanceManager"), a = e("../Define/Instances"), c = function() {
function e() {}
e.HasCache = function(e) {
return null != this.caches[o.AssetUtility.GetAssetPath(e)];
};
e.Cache = function(e, t) {
var n = o.AssetUtility.GetAssetPath(e);
this.caches[n] != t && (this.caches[n] = t);
};
e.GetCache = function(e, t) {
void 0 === t && (t = !0);
var n = o.AssetUtility.GetAssetPath(e);
t && i.cancelDelayReleaseRes(n);
return this.caches[n];
};
e.RemoveCache = function(e) {
var t = o.AssetUtility.GetAssetPath(e);
if (this.caches[t]) {
var n = this.caches[t];
if (n instanceof cc.Asset && !(n instanceof cc.SpriteFrame) && !(n instanceof cc.Texture2D)) for (var i = cc.loader.getDependsRecursively(n), c = s.InstanceManager.GetInstance(Object, a.Instances.CacheDepUUIDCounts), l = 0; l < i.length; l++) if (null != i[l]) {
var u = r.getFileName(i[l]);
null != c[u] && c[u]--;
c[u] <= 0 && delete c[u];
}
delete this.caches[t];
}
};
e.GetCacheSpriteFrame = function(e) {
var t = o.AssetUtility.SplitAtlas(e);
if (t.length < 2) return this.GetCache(t[0]);
var n = this.GetCache(t[0]);
return null == n ? null : n.getSpriteFrame(t[1]);
};
e.caches = {};
return e;
}();
n.CacheManager = c;
cc._RF.pop();
}, {
"../Define/Instances": "Instances",
"../Utility/dx/cancelDelayReleaseRes": "cancelDelayReleaseRes",
"../Utility/dx/getFileName": "getFileName",
"./../Utility/AssetUtility": "AssetUtility",
"./InstanceManager": "InstanceManager"
} ],
ClientDealer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4454bbarb1M6ZT9D8k5xKwA", "ClientDealer");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ClientDealer = void 0;
var o = e("../../Utility/dx/trace"), i = function() {
function e() {
this.handlers = {};
}
e.prototype.addHandler = function(e, t, n) {
void 0 === n && (n = !1);
n ? this.handlers[e] = t : void 0 == this.handlers[e] ? this.handlers[e] = t : o.trace("重复设置Handler====>0x", e.toString(16));
};
e.prototype.removeHandler = function(e) {
void 0 != this.handlers[e] && delete this.handlers[e];
};
e.prototype.getKey = function(e) {
return e.packetID;
};
e.prototype.getHandler = function(e) {
return this.handlers[e];
};
e.prototype.clear = function() {
this.handlers = {};
};
e.prototype.dispose = function() {
this.handlers = null;
};
e.ClassName = "ClientDealer";
return e;
}();
n.ClientDealer = i;
cc._RF.pop();
}, {
"../../Utility/dx/trace": "trace"
} ],
ClientManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3f5fdKT8zJNx6msyCUslKqz", "ClientManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ClientManager = void 0;
var o = e("../Network/Sockets/Client"), i = e("../Network/Sockets/ClientMessage"), r = e("./StoreManager"), s = function() {
function e() {}
e.SetDefaultClass = function(e, t) {
this.clientClass = e;
this.messageClass = t;
};
e.SwapClient = function(e, t) {
var n = e.clientName;
e.clientName = t.clientName;
t.clientName = n;
this.clients[e.clientName] = e;
this.clients[t.clientName] = t;
};
e.IsActiveClient = function(e) {
var t = this.clients[e];
return !!t && t.isConnected;
};
e.SendMessage = function(e, t, n, o, i) {
for (var s = [], a = 5; a < arguments.length; a++) s[a - 5] = arguments[a];
if (null != t) {
-1 == this.traceMsgs.indexOf(n) && console.log("向服务器发送消息====>", n);
var c = this.GetClientByName(e);
if (null != c && c.isConnected) {
var l = r.StoreManager.New(this.messageClass);
l.setMessage(n, t, !0);
c.sendMessage(l);
}
}
};
e.SendProtobufMessage = function(e, t, n) {
if (null != t) {
1103 != n && console.log("向服务器发送消息====>", n);
var o = this.GetClientByName(e);
if (null != o && o.isConnected) {
var i = r.StoreManager.New(this.messageClass);
i.setMessage(n, t, !0);
o.sendMessage(i);
}
}
};
e.GetClientByName = function(e) {
var t = this.clients[e];
null == t && (t = this.GetNewClient(e));
return t;
};
e.DisposeClients = function() {
for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
for (var n = 0; n < e.length; n++) {
var o = this.clients[e[n]];
if (null != o) {
o.dispose();
delete this.clients[e[n]];
}
}
};
e.GetNewClient = function(e, t, n) {
void 0 === t && (t = null);
void 0 === n && (n = 0);
var o = r.StoreManager.New(this.clientClass);
null != t && 0 != n && o.connect(t, n);
o.clientName = e;
this.clients[e] = o;
return o;
};
e.clientClass = o.Client;
e.messageClass = i.ClientMessage;
e.clients = {};
e.traceMsgs = [ 1103, 1201, 1112, 105 ];
return e;
}();
n.ClientManager = s;
cc._RF.pop();
}, {
"../Network/Sockets/Client": "Client",
"../Network/Sockets/ClientMessage": "ClientMessage",
"./StoreManager": "StoreManager"
} ],
ClientMessage: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "8a836EwzoZB8pZbwjg3iaYG", "ClientMessage");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ClientMessage = void 0;
var o = e("../../Managers/StoreManager"), i = function() {
function e() {
this.packetID = 0;
this._content = null;
}
e.prototype.write = function(e, t) {
void 0 === t && (t = !1);
"string" != typeof e && (e = JSON.stringify(e));
};
e.prototype.parser = function(e) {
this._content = "string" == typeof e ? JSON.parse(e) : e;
};
e.prototype.clear = function() {
this._content = null;
this.packetID = 0;
};
Object.defineProperty(e.prototype, "bytes", {
get: function() {
return this._bytes;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "content", {
get: function() {
return this._content;
},
enumerable: !1,
configurable: !0
});
e.prototype.dispose = function() {
this.clear();
o.StoreManager.Store(this);
};
e.prototype.setMessage = function(e, t, n) {
void 0 === e && (e = null);
void 0 === t && (t = null);
void 0 === n && (n = !1);
null != e && (this.packetID = e);
null != t && this.write(t, n);
};
e.Get = function(t, n, i) {
void 0 === t && (t = null);
void 0 === n && (n = null);
void 0 === i && (i = !1);
var r = o.StoreManager.New(e);
r.setMessage(t, n, i);
return r;
};
e.ClassName = "ClientMessage";
return e;
}();
n.ClientMessage = i;
cc._RF.pop();
}, {
"../../Managers/StoreManager": "StoreManager"
} ],
ClientSocket: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "8bf4fHWqoBCMIn5ziGUVubU", "ClientSocket");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ClientSocket = void 0;
var i = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.buffer = null;
return t;
}
t.prototype.connectByUrl = function(e) {
this.serverHost = e;
this.reconnect();
};
t.prototype.reconnect = function() {
var t = this;
this.connected && this.close();
null != this.serverHost && "" != this.serverHost && setTimeout(function() {
return e.prototype.connectByUrl.call(t, t.serverHost);
}, 1);
};
t.prototype.onSocketGetData = function(t) {
if (t) {
if (this.buffer) {
this.buffer.push(new Uint8Array(t));
t = this.buffer.packetBytes;
}
e.prototype.onSocketGetData.call(this, t);
}
};
t.prototype.send = function(t) {
null != t && e.prototype.send.call(this, t);
};
t.prototype.close = function() {
e.prototype.close.call(this);
this.buffer && this.buffer.clear();
};
t.prototype.dispose = function() {
e.prototype.dispose.call(this);
this.buffer = null;
};
Object.defineProperty(t.prototype, "socketBytes", {
get: function() {
return this.buffer ? this.buffer.packetBytes : null;
},
set: function(e) {
this.buffer && (this.buffer.packetBytes = e);
},
enumerable: !1,
configurable: !0
});
t.ClassName = "ClientSocket";
return t;
}(e("./Socket").Socket);
n.ClientSocket = i;
cc._RF.pop();
}, {
"./Socket": "Socket"
} ],
Client: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b496faar9tIzZ2hzfB7Ef1j", "Client");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.Client = void 0;
var o = e("../../Utility/dx/trace"), i = e("./ClientDealer"), r = e("./ClientMessage"), s = e("./ClientSocket"), a = e("./PacketBuffer"), c = function() {
function e() {
this.repeatConnectCount = 3;
this._clientName = null;
this.currentRepeat = 0;
this.dealer = new i.ClientDealer();
this.initialize();
}
e.prototype.initialize = function() {
this._clientName = "Client";
this.socket = new s.ClientSocket();
this.socket.buffer = new a.PacketBuffer();
this.socket.timeOut = 5e3;
this.socket.addCallBacks(this, this.onSocketConnected, this.onGetSocketData, this.onSocketClosed, this.onSocketError, this.onSocketTimeOut);
};
e.prototype.addCallBacks = function(e, t, n, o, i, r) {
this.onConnected = t;
this.onClosed = o;
this.onGetClientData = n;
this.onError = i;
this.onTimeOut = r;
this.thisObject = e;
};
e.prototype.connect = function(e, t) {
this.currentRepeat = 0;
this.connectURL(e + ":" + t);
};
e.prototype.connectURL = function(e) {
-1 == e.indexOf("ws://") && (e = "ws://" + e);
this.address = e;
this.socket && this.socket.connectByUrl(e);
};
e.prototype.onSocketConnected = function() {
this.currentRepeat = this.repeatConnectCount;
null != this.onConnected && (0 == this.onConnected.length ? this.onConnected.call(this.thisObject) : 1 == this.onConnected.length && this.onConnected.call(this.thisObject, this));
};
e.prototype.onGetSocketData = function(e) {
var t = this.socket.socketBytes;
if (0 != t.length) {
var n = t.shift(), i = this.createMessage(n);
this.socket.socketBytes.length = 0;
this.onGetReceiveMessage(i);
var r = this.dealer.getHandler(n);
null != r ? r.onDeal(this, i) : o.trace("Client " + this.clientName, "未设置用于处理 PacketID=0x" + n.toString(16) + " 的 ClientHandler", JSON.stringify(i.content));
null != this.onGetClientData && (0 == this.onGetClientData.length ? this.onGetClientData.call(this.thisObject) : 1 == this.onGetClientData.length ? this.onGetClientData.call(this.thisObject, this) : 2 == this.onGetClientData.length && this.onGetClientData.call(this.thisObject, this, i));
i.dispose();
}
};
e.prototype.createMessage = function(e) {
return r.ClientMessage.Get(e);
};
e.prototype.onGetReceiveMessage = function(e) {};
e.prototype.onSocketClosed = function() {
null != this.onClosed && (0 == this.onClosed.length ? this.onClosed.call(this.thisObject) : 1 == this.onClosed.length && this.onClosed.call(this.thisObject, this));
};
e.prototype.onSocketError = function() {
this.currentRepeat++;
this.currentRepeat < this.repeatConnectCount ? this.socket.reconnect() : null != this.onError && (0 == this.onError.length ? this.onError.call(this.thisObject) : 1 == this.onError.length && this.onError.call(this.thisObject, this));
};
e.prototype.onSocketTimeOut = function() {
this.currentRepeat++;
this.currentRepeat < this.repeatConnectCount ? this.socket.reconnect() : null != this.onTimeOut && (0 == this.onTimeOut.length ? this.onTimeOut.call(this.thisObject) : 1 == this.onTimeOut.length && this.onTimeOut.call(this.thisObject, this));
};
e.prototype.sendMessage = function(e) {
if (null != e) {
var t = e.bytes;
this.sendBytes(t);
e.dispose();
}
};
e.prototype.sendBytes = function(e) {
this.socket && this.socket.send(e);
};
Object.defineProperty(e.prototype, "isConnected", {
get: function() {
return this.socket && this.socket.connected;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "clientName", {
get: function() {
return this._clientName;
},
set: function(e) {
this._clientName = e;
},
enumerable: !1,
configurable: !0
});
e.prototype.clearHandlers = function() {
this.dealer && this.dealer.clear();
};
e.prototype.addHandler = function(e, t, n) {
void 0 === n && (n = !1);
this.dealer && this.dealer.addHandler(e, t, n);
};
e.prototype.removeHandler = function(e) {
this.dealer && this.dealer.removeHandler(e);
};
e.prototype.clearCallbacks = function() {
this.onError = null;
this.onClosed = null;
this.onTimeOut = null;
this.onConnected = null;
this.onGetClientData = null;
};
e.prototype.close = function() {
this.socket && this.socket.close();
};
e.prototype.dispose = function() {
this.clearCallbacks();
this.close();
this.clearHandlers();
this.socket && this.socket.dispose();
this.dealer && this.dealer.dispose();
this.thisObject = null;
this.socket = null;
this.dealer = null;
};
e.ClassName = "Client";
return e;
}();
n.Client = c;
cc._RF.pop();
}, {
"../../Utility/dx/trace": "trace",
"./ClientDealer": "ClientDealer",
"./ClientMessage": "ClientMessage",
"./ClientSocket": "ClientSocket",
"./PacketBuffer": "PacketBuffer"
} ],
DelayFramer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c6cdeSsrQFAjY7/IN5raza3", "DelayFramer");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.DelayFramer = void 0;
var o = e("../Core/FFunction"), i = e("./JFramer"), r = e("../Utility/dx/trace"), s = e("../Utility/dx/getTime"), a = function() {
function e() {}
e.Push = function(e) {
if (null != e) if (-1 == o.FFunction.FindIndexOf(e, this.delayFuns)) {
this.delayFuns.push(e);
this.delayFuns.length > 0 && this.Invalidate();
} else e.dispose();
};
e.Remove = function(e) {
var t = o.FFunction.FindIndexOf(e, this.delayFuns);
t > -1 && this.delayFuns.splice(t, 1);
e.dispose();
};
e.Invalidate = function() {
if (!this.framer) {
this.framer = i.JFramer.GetFramer();
this.framer.addFramerCallback(this, this.OnInvalidate);
this.framer.name = "DelayFramer";
}
this.framer.running || this.framer.start();
};
e.OnInvalidate = function() {
if (this.executeFrameDelay <= 0) {
this.framer && this.framer.stop();
for (;this.delayFuns.length > 0; ) this.delayFuns.shift().excute();
null != this._onExecuteComplete && this._onExecuteComplete.call(this._thisObj);
this._onExecuteComplete = null;
} else {
for (var e = 0; this.delayFuns.length > 0; ) {
var t = s.getTime();
this.delayFuns.shift().excute();
if ((e += s.getTime() - t) >= this.executeFrameDelay) {
r.trace("[DelayFramer] 超时执行(ms):", e, "  允许执行时长(ms):", this.executeFrameDelay, "  剩余 ", this.delayFuns.length, " 个方法将延时至第", this.framer.frame + 1, "帧执行.....");
break;
}
}
if (0 == this.delayFuns.length) {
this.framer && this.framer.stop();
null != this._onExecuteComplete && this._onExecuteComplete.call(this._thisObj);
this._onExecuteComplete = null;
}
}
};
e.ClassName = "DelayFramer";
e.delayFuns = [];
e.executeFrameDelay = 0;
return e;
}();
n.DelayFramer = a;
cc._RF.pop();
}, {
"../Core/FFunction": "FFunction",
"../Utility/dx/getTime": "getTime",
"../Utility/dx/trace": "trace",
"./JFramer": "JFramer"
} ],
Device: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4731bA824VFU7nrdCYf+WmO", "Device");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
e.netWorkStatus = function() {
return 1;
};
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
Dictionary: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5f193K8cWRP6rrseUWXmyMR", "Dictionary");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.Dictionary = void 0;
var o = function() {
function e() {
this.keys = [];
this.values = [];
}
e.prototype.setValue = function(e, t) {
var n = this.keys.indexOf(e);
if (-1 == n) {
this.keys.push(e);
this.values.push(t);
} else this.values[n] = t;
};
e.prototype.getValue = function(e) {
var t = this.keys.indexOf(e);
return -1 == t ? null : this.values[t];
};
e.prototype.remove = function(e) {
var t = this.keys.indexOf(e, 0);
if (t > -1) {
this.keys.splice(t, 1);
this.values.splice(t, 1);
}
};
e.prototype.hasKey = function(e) {
return -1 != this.keys.indexOf(e);
};
e.prototype.getKeys = function() {
return this.keys;
};
e.prototype.getValues = function() {
return this.values;
};
Object.defineProperty(e.prototype, "count", {
get: function() {
return this.keys.length;
},
enumerable: !1,
configurable: !0
});
e.ClassName = "Dictionary";
return e;
}();
n.Dictionary = o;
cc._RF.pop();
}, {} ],
DownImage: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f2b24dTwhtFobc5/jXZ/BFd", "DownImage");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
e.downloadRemoteImageAndSave = function(e, t) {
var n = e.split("/"), o = n[n.length - 1];
if (jsb) {
var i = jsb.fileUtils.getWritablePath() + "save_remote_image_res/", r = new XMLHttpRequest();
r.onreadystatechange = function() {
if (4 === r.readyState && 200 === r.status) {
jsb.fileUtils.isDirectoryExist(i) || jsb.fileUtils.createDirectory(i);
jsb.fileUtils.writeDataToFile(new Uint8Array(r.response), i + o) && t(i + o);
}
}.bind(this);
r.responseType = "arraybuffer";
r.open("GET", e, !0);
r.send();
cc.assetManager.loadRemote;
}
};
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
DragonBoneLoader: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3d50fKxPppFTZelM2jk+Iox", "DragonBoneLoader");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.DragonBoneLoader = void 0;
var i = e("../Enums/LoaderType"), r = e("../Managers/StoreManager"), s = e("./Loader"), a = e("../Managers/CacheManager"), c = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.boneData = null;
t.isDragonBoneError = !1;
return t;
}
t.prototype.load = function(e, t, n) {
this.boneData = e;
this.loads([ e.ske, e.tex ], [ dragonBones.DragonBonesAsset, dragonBones.DragonBonesAtlasAsset ]);
};
t.prototype.complete = function() {
if (this.cacheAsset) {
var e = {
dragonAsset: this.getContent(0),
dragonAtlasAsset: this.getContent(1)
};
a.CacheManager.HasCache(this.boneData.name) || a.CacheManager.Cache(this.boneData.name, e);
}
this._urls = [ this.boneData.name ];
this._loaderTypes = [ i.LoaderType.DRAGON_BONE ];
this.excuteCallback("onComplete");
this.dispose();
};
t.prototype.loadAsset = function() {
this.isDragonBoneError || e.prototype.loadAsset.call(this);
};
t.prototype.onLoadError = function(e) {
this.isDragonBoneError = !0;
this.excuteCallback("onError", {
resName: this.boneData.name,
message: e.message,
index: this._index,
loaderType: this.getLoaderType(this._index)
});
};
t.prototype.dispose = function() {
this.isDragonBoneError = !1;
this.boneData = null;
e.prototype.dispose.call(this);
};
t.Get = function() {
return r.StoreManager.New(t);
};
t.ClassName = "DragonBoneLoader";
return t;
}(s.Loader);
n.DragonBoneLoader = c;
cc._RF.pop();
}, {
"../Enums/LoaderType": "LoaderType",
"../Managers/CacheManager": "CacheManager",
"../Managers/StoreManager": "StoreManager",
"./Loader": "Loader"
} ],
DragonBoneUtility: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "390ffOFKZ1N+6+O/yVbBSYz", "DragonBoneUtility");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.DragonBoneUtility = void 0;
var o = function() {
function e() {}
e.CompareVersion = function(e) {
null == this.Version && (this.Version = this.ParserVersion(dragonBones.DragonBones.VERSION));
for (var t = this.ParserVersion(e), n = Math.max(this.Version.length, t.length), o = 0; o < n; o++) {
if (t[o] > this.Version[o]) return !1;
if (t[o] < this.Version[o]) return !0;
}
return !0;
};
e.ParserVersion = function(e) {
for (var t = e.split("."), n = 0; n < t.length; n++) t[n] = parseInt(t[n]);
return t;
};
e.Version = null;
return e;
}();
n.DragonBoneUtility = o;
cc._RF.pop();
}, {} ],
EventManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f0fd9MB2hZIyq4Aodp/lkkV", "EventManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.EventManager = void 0;
var o = e("../Events/FEvent"), i = e("../Events/ModuleEvent"), r = e("../Structs/Dictionary"), s = e("../Utility/dx/trace"), a = function() {
function e() {}
e.addEvent = function(e, t, n) {
this.events.hasKey(e) || this.events.setValue(e, {
length: 0
});
var o = this.events.getValue(e);
if (void 0 == o[t]) {
o[t] = [];
o.length++;
}
var i = o[t];
-1 == i.indexOf(n) && i.push(n);
};
e.removeEvent = function(e, t, n) {
if (this.events.hasKey(e)) {
var o, i = this.events.getValue(e);
if (null != t) {
if (!i[t]) return;
o = i[t];
if (null != n) {
var r = o.indexOf(n);
r > -1 && o.splice(r, 1);
} else {
o = i[t];
for (;o.length > 0; ) o.shift();
}
if (0 == o.length) {
i.length--;
delete i[t];
}
} else for (var s in i) if ("length" != s) {
o = i[s];
i.length--;
for (;o.length > 0; ) o.shift();
}
i.length <= 0 && this.events.remove(e);
}
};
e.dispatchEventWith = function(e, t) {
this.dispatchEvent(new o.FEvent(e, t));
};
e.dispatchEvent = function(e) {
for (var t, n, o, i = e.type, r = this.events.getKeys(), s = 0; s < r.length; s++) {
n = r[s];
if ((t = this.events.getValue(n))[i]) {
o = t[i];
for (var a = 0; a < o.length; a++) 0 == o[a].length ? o[a].call(n) : o[a].call(n, e);
}
}
};
e.dispatchModuleEventWith = function(e, t, n, o) {
this.dispatchEvent(new i.ModuleEvent(e, t, null, n, o));
};
e.Print = function() {
s.trace("------------------- Start Events ------------------------");
for (var e, t, n = this.events.getKeys(), o = 0; o < n.length; o++) {
t = n[o];
var i = "";
e = this.events.getValue(t);
for (var r in e) "length" != r && (i += r + ",");
s.trace(i, "-----\x3e", t);
}
s.trace("-----------------Total Events:" + n.length + "----------------------");
};
e.events = new r.Dictionary();
return e;
}();
n.EventManager = a;
cc._RF.pop();
}, {
"../Events/FEvent": "FEvent",
"../Events/ModuleEvent": "ModuleEvent",
"../Structs/Dictionary": "Dictionary",
"../Utility/dx/trace": "trace"
} ],
FBinder: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "80a02ZemKdO161J1Umu0lsY", "FBinder");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.FBinder = void 0;
var o = e("../Managers/EventManager"), i = e("../Timers/JTimer"), r = function() {
function e() {
this.moduleNode = null;
this.disObjects = [];
this.initialize();
}
e.prototype.initialize = function() {};
e.prototype.bindView = function(e) {
for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
if (null != this.asset) {
this.removeEvents();
this.clearViews();
}
this.asset = e;
this.initViews();
this.addEvents();
};
e.prototype.initViews = function() {};
e.prototype.addEvents = function() {};
e.prototype.clearViews = function() {};
e.prototype.removeEvents = function() {
o.EventManager.removeEvent(this);
};
e.prototype.update = function(e) {};
e.prototype.dispose = function() {
i.JTimer.ClearTimeOut(this);
this.removeEvents();
this.clearViews();
this.disposeObjects();
this.moduleNode = null;
this.asset = null;
};
e.prototype.addObject = function(e) {
-1 == this.disObjects.indexOf(e) && this.disObjects.push(e);
return e;
};
e.prototype.disposeObjects = function() {
for (;this.disObjects.length > 0; ) this.disObjects.shift().dispose();
};
return e;
}();
n.FBinder = r;
cc._RF.pop();
}, {
"../Managers/EventManager": "EventManager",
"../Timers/JTimer": "JTimer"
} ],
FContext: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d0829O6MPhBW6t6GI8jxJE/", "FContext");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.FContext = void 0;
var o = e("../Events/ApplicationEvent"), i = e("../Events/ModuleEvent"), r = e("../Events/SceneEvent"), s = e("../Events/SoundEvent"), a = e("../Events/UIEvent"), c = e("../Managers/AudioManager"), l = e("../Managers/EventManager"), u = e("../Managers/ModuleManager"), p = e("../Managers/ResourceManager"), h = e("../Utility/dx/addEvent"), d = e("../Utility/dx/dispatchFEvent"), f = e("../Utility/dx/Fun"), g = e("../Utility/dx/trace"), y = e("./Application"), m = function() {
function e() {}
e.prototype.initialize = function() {
this.initDatas();
this.addEvents();
this.initModules();
};
e.prototype.initDatas = function() {};
e.prototype.initModules = function() {};
e.prototype.addEvents = function() {
h.addEvent(this, i.ModuleEvent.SHOW_MODULE, this.showModule);
h.addEvent(this, i.ModuleEvent.HIDE_MODULE, this.hideModule);
h.addEvent(this, i.ModuleEvent.DISPOSE_MODULE, this.disposeModule);
h.addEvent(this, i.ModuleEvent.PLAY_DISPOSE_ANIMATION, this.playDisposeModuleAnmiation);
h.addEvent(this, i.ModuleEvent.EXCUTE_MODULE_FUNCTION, this.excuteModuleFun);
h.addEvent(this, a.UIEvent.ADD_TO_LAYER, this.onAddToLayer);
h.addEvent(this, a.UIEvent.DISPOSE_LAYER_ELEMENTS, this.onDisposeLayerElements);
h.addEvent(this, a.UIEvent.HIDE_LAYER_ELEMENTS, this.onHideLayerElements);
h.addEvent(this, r.SceneEvent.CHANGE_SCENE, this.onChangeScene);
h.addEvent(this, o.ApplicationEvent.ON_EXIT_APPLICATION, this.onExitApplication);
h.addEvent(this, s.SoundEvent.PLAY_EFFECT, this.playEffect);
h.addEvent(this, s.SoundEvent.PLAY_VOICE, this.playVoice);
h.addEvent(this, s.SoundEvent.PLAY_MUSIC, this.playMusic);
h.addEvent(this, s.SoundEvent.PLAY_NUMBER, this.playNumVoice);
};
e.prototype.playEffect = function(e) {
c.AudioManager.PlayEffect(e.data);
};
e.prototype.playVoice = function(e) {
c.AudioManager.PlayVoice(e.data);
};
e.prototype.playNumVoice = function(e) {
c.AudioManager.PlayNumVoice(e.data);
};
e.prototype.playMusic = function(e) {
c.AudioManager.PlayMusic(e.data);
};
e.prototype.showModule = function(e) {
var t = u.ModuleManager.GetModule(e.moduleName, e.instanceName);
if (null != t) {
t.moduleName = e.moduleName;
if (null != y.Application.CurrentScene) {
var n = null != e.gameLayer ? e.gameLayer instanceof cc.Node ? e.gameLayer : y.Application.CurrentScene.getLayer(e.gameLayer) : null;
t.startModule();
t.show(n, e.data);
}
} else g.trace("未找到模块====>", e.moduleName);
};
e.prototype.hideModule = function(e) {
if (u.ModuleManager.HasModule(e.moduleName, e.instanceName)) {
u.ModuleManager.GetModule(e.moduleName, e.instanceName, !1).hide(e.data);
}
};
e.prototype.playDisposeModuleAnmiation = function(e) {
if (u.ModuleManager.HasModule(e.moduleName, e.instanceName)) {
u.ModuleManager.GetModule(e.moduleName, e.instanceName).isPlayDisposeAnimation = !0;
u.ModuleManager.DisposeModule(e.moduleName, e.instanceName);
}
};
e.prototype.disposeModule = function(e) {
u.ModuleManager.HasModule(e.moduleName, e.instanceName) && u.ModuleManager.DisposeModule(e.moduleName, e.instanceName);
};
e.prototype.excuteModuleFun = function(e) {
if (e.data && u.ModuleManager.HasModule(e.moduleName, e.instanceName)) {
var t = e.data.funName;
if (null != t && "" != t) {
u.ModuleManager.GetModule(e.moduleName, e.instanceName).excuteModuleFun(t, [ e.data ]);
}
}
};
e.prototype.onAddToLayer = function(e) {
var t = e.view;
if (null != t) {
y.Application.CurrentScene.getLayer(e.gameLayer).addChild(t);
if (null != e.data) {
var n = t.node;
null == n && (n = t);
e.data.x && (n.x = e.data.x);
e.data.y && (n.y = e.data.y);
}
}
};
e.prototype.onDisposeLayerElements = function(e) {};
e.prototype.onHideLayerElements = function(e) {};
e.prototype.onChangeScene = function(e) {
var t = e.sceneName;
p.ResourceManager.LoadScene(t, f.Fun(this.onLoadSceneComplete, this, !0, [ e.data ]), f.Fun(this.onLoadSceneProgress, this, !0, [ t ]));
};
e.prototype.onLoadSceneProgress = function(e, t) {
d.dispatchFEvent(new r.SceneEvent(r.SceneEvent.LOAD_PROGRESS, e, t));
};
e.prototype.onLoadSceneComplete = function(e, t) {
cc.director.loadScene(t, function() {
return y.Application.CurrentScene.onGetSceneData(e);
});
};
e.prototype.removeEvents = function() {
document.onvisibilitychange = null;
l.EventManager.removeEvent(this);
};
e.prototype.onExitApplication = function(e) {
y.Application.Exit();
};
e.prototype.dispose = function() {};
e.ClassName = "FContext";
return e;
}();
n.FContext = m;
cc._RF.pop();
}, {
"../Events/ApplicationEvent": "ApplicationEvent",
"../Events/ModuleEvent": "ModuleEvent",
"../Events/SceneEvent": "SceneEvent",
"../Events/SoundEvent": "SoundEvent",
"../Events/UIEvent": "UIEvent",
"../Managers/AudioManager": "AudioManager",
"../Managers/EventManager": "EventManager",
"../Managers/ModuleManager": "ModuleManager",
"../Managers/ResourceManager": "ResourceManager",
"../Utility/dx/Fun": "Fun",
"../Utility/dx/addEvent": "addEvent",
"../Utility/dx/dispatchFEvent": "dispatchFEvent",
"../Utility/dx/trace": "trace",
"./Application": "Application"
} ],
FEvent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5ea75BcDsBKtapDuqqTb2o4", "FEvent");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.FEvent = void 0;
var o = function() {
function e(e, t) {
this._data = null;
this._type = null;
this._data = t;
this._type = e;
}
Object.defineProperty(e.prototype, "data", {
get: function() {
return this._data;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "type", {
get: function() {
return this._type;
},
enumerable: !1,
configurable: !0
});
e.ClassName = "FEvent";
return e;
}();
n.FEvent = o;
cc._RF.pop();
}, {} ],
FFunction: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "540496Ke91AU7ogYkSZz/2s", "FFunction");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.FFunction = void 0;
var o = function() {
function e() {
this.isOnce = !0;
this.target = null;
this.fun = null;
this.params = null;
}
e.prototype.excute = function(e) {
if (null != this.fun) {
var t = [];
null != this.params && this.params.length > 0 && (t = t.concat(this.params));
null != e && e.length > 0 && (t = t.concat(e));
return this.fun.apply(this.target, t);
}
this.isOnce && this.dispose();
};
Object.defineProperty(e.prototype, "length", {
get: function() {
return this.fun ? this.fun.length : 0;
},
enumerable: !1,
configurable: !0
});
e.prototype.dispose = function() {
this.isOnce = !0;
this.fun = null;
this.target = null;
this.params = null;
};
e.Compare = function(e, t) {
return e.target == t.target && e.fun == t.fun;
};
e.FindIndexOf = function(e, t) {
for (var n = 0; n < t.length; n++) if (this.Compare(e, t[n])) return n;
return -1;
};
e.ClassName = "FFunction";
return e;
}();
n.FFunction = o;
cc._RF.pop();
}, {} ],
FMediator: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2de84jLsxNJ0pg8wvHophTi", "FMediator");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.FMediator = void 0;
var o = e("../Events/ModuleEvent"), i = e("../Loaders/Loader"), r = e("../Managers/EventManager"), s = e("../Managers/ModuleManager"), a = e("../Utility/AssetUtility"), c = e("../Utility/dx/addEvent"), l = e("../Utility/dx/cancelDelayReleaseRes"), u = e("../Utility/dx/dispatchModuleEvent"), p = e("../Utility/dx/getQualifiedClassName"), h = e("./Assets"), d = function() {
function e() {
this.sceneName = "";
this.mediatorName = "";
this.isInitModules = !1;
this.modules = {};
this.disObjects = [];
this.proxy = null;
this.isStartMediator = !1;
this.mediatorName = p.getQualifiedClassName(this);
}
e.prototype.startMediator = function() {
if (!this.isStartMediator) {
this.isStartMediator = !0;
this.isInitModules || this.initialize();
this.showModules();
this.addEvents();
this.initDatas();
}
};
e.prototype.initProxy = function() {};
e.prototype.preloadAssets = function() {
var e = [];
for (var t in this.modules) this.modules[t].isNeedPreload && (e = e.concat(this.modules[t].assets));
var n = i.Loader.Get(), o = h.Assets.GetAssets(e);
l.cancelDelayReleaseRes(o.assets);
a.AssetUtility.RemoveInvalidAsset(o);
n.loads(o.assets, o.assetTypes);
return n;
};
e.prototype.initialize = function() {
if (!this.isInitModules) {
this.isInitModules = !0;
this.initModules();
this.initProxy();
}
};
e.prototype.initModules = function() {};
e.prototype.initDatas = function() {};
e.prototype.addModule = function(e, t) {
for (var n = [], o = 2; o < arguments.length; o++) n[o - 2] = arguments[o];
"function" == typeof t ? s.ModuleManager.AddModuleClass(e, t, !0) : "object" == typeof t && s.ModuleManager.AddModule(t, e);
var i = s.ModuleManager.GetModule(e);
this.modules[e] = i;
i.moduleName = e;
this.addModuleEvent(i, n);
return i;
};
e.prototype.addModuleEvent = function(e, t) {
null == this.moduleEvents && (this.moduleEvents = {});
for (var n = 0; n < t.length; n++) {
null == this.moduleEvents[t[n]] && (this.moduleEvents[t[n]] = []);
-1 == this.moduleEvents[t[n]].indexOf(e) && this.moduleEvents[t[n]].push(e);
}
};
e.prototype.showModules = function() {};
e.prototype.addEvents = function() {
c.addEvent(this, o.ModuleEvent.ON_DISPOSE_MODULE_OBJECT, this.onDisposeModuleObject);
};
e.prototype.showModule = function(e, t, n) {
u.dispatchModuleEvent(o.ModuleEvent.SHOW_MODULE, e, null, t, n);
};
e.prototype.removeEvents = function() {
r.EventManager.removeEvent(this);
};
e.prototype.removeModules = function() {
for (var e in this.modules) {
u.dispatchModuleEvent(o.ModuleEvent.DISPOSE_MODULE, e);
delete this.modules[e];
}
};
e.prototype.excuteModuleEvent = function(e, t) {
for (var n = [], o = 2; o < arguments.length; o++) n[o - 2] = arguments[o];
if (this.moduleEvents) {
var i = this.moduleEvents[e];
if (null != i) {
n.unshift(t);
for (var r = 0; r < i.length; r++) {
var s = i[r].excuteModuleFun;
null != s && s.apply(i[r], n);
}
}
}
};
e.prototype.onDisposeModuleObject = function(e) {
var t = e.data;
if (null != t && this.modules[t.moduleName]) {
for (var n in this.moduleEvents) {
var o = this.moduleEvents[n].indexOf(t);
-1 != o && this.moduleEvents[n].splice(o, 1);
}
delete this.modules[t.moduleName];
}
};
e.prototype.dispose = function() {
this.moduleEvents = null;
this.removeEvents();
this.removeModules();
this.disposeObjects();
this.disposeProxy();
};
e.prototype.disposeProxy = function() {
null != this.proxy && this.proxy.dispose();
};
e.prototype.addObject = function(e) {
-1 == this.disObjects.indexOf(e) && this.disObjects.push(e);
};
e.prototype.disposeObjects = function() {
for (;this.disObjects.length > 0; ) this.disObjects.shift().dispose();
};
return e;
}();
n.FMediator = d;
cc._RF.pop();
}, {
"../Events/ModuleEvent": "ModuleEvent",
"../Loaders/Loader": "Loader",
"../Managers/EventManager": "EventManager",
"../Managers/ModuleManager": "ModuleManager",
"../Utility/AssetUtility": "AssetUtility",
"../Utility/dx/addEvent": "addEvent",
"../Utility/dx/cancelDelayReleaseRes": "cancelDelayReleaseRes",
"../Utility/dx/dispatchModuleEvent": "dispatchModuleEvent",
"../Utility/dx/getQualifiedClassName": "getQualifiedClassName",
"./Assets": "Assets"
} ],
FModule: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "df210FRLuZMPICsy8CJm2Yq", "FModule");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.FModule = void 0;
var o = e("../Enums/LoaderType"), i = e("../Events/ModuleEvent"), r = e("../Loaders/Loader"), s = e("../Managers/EventManager"), a = e("../Managers/ResourceManager"), c = e("../Timers/DelayFramer"), l = e("../Utility/AssetUtility"), u = e("../Utility/dx/cancelDelayReleaseRes"), p = e("../Utility/dx/delayReleaseRes"), h = e("../Utility/dx/dispatchModuleEvent"), d = e("../Utility/dx/Fun"), f = e("../Utility/dx/getQualifiedClassName"), g = e("./Assets"), y = e("./FBinder"), m = function() {
function e() {
this.moduleName = null;
this.isNeedPreload = !1;
this.isReleaseAsset = !1;
this.delayReleaseAssetTime = 0;
this.isNeedCache = !0;
this.isPlayDisposeAnimation = !1;
this.isNeedShowLoadBar = !1;
this.moduleData = null;
this.isInitAsset = !1;
this._isInitialize = !1;
this.isShowModule = !1;
this.delayCalls = [];
this.disObjects = [];
this.binder = null;
this.moduleName = f.getQualifiedClassName(this);
}
Object.defineProperty(e.prototype, "assets", {
get: function() {
return [];
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "isInitialize", {
get: function() {
return this._isInitialize;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "isValid", {
get: function() {
return !this.isInitAsset || this.node && this.node.isValid;
},
enumerable: !1,
configurable: !0
});
e.prototype.startModule = function() {
this._isInitialize || this.initialize();
};
e.prototype.initialize = function() {
this._isInitialize = !0;
this.loadAssets();
};
e.prototype.loadAssets = function() {
var e = this;
if (0 == this.assets.length) this.initViews(); else {
var t = r.Loader.Get();
t.cacheAsset = this.isNeedCache;
t.addCallback(null, function() {
return e.initViews();
}, function(t) {
return e.onLoadAssetProgress(t);
});
var n = g.Assets.GetAssets(this.assets);
u.cancelDelayReleaseRes(n.assets);
l.AssetUtility.RemoveInvalidAsset(n);
t.loads(n.assets, n.assetTypes);
}
};
e.prototype.onLoadAssetProgress = function(e) {
this.isNeedPreload || this.isNeedShowLoadBar && h.dispatchModuleEvent(i.ModuleEvent.LOAD_MODULE_ASSET_PROGRESS + this.moduleName, this.moduleName, null, null, {
progress: e
});
};
e.prototype.initViews = function() {
if (!this.isInitAsset) {
null == this.node && (this.node = this.createMainNode());
this.createViews();
this.bindViews();
this.isShowModule && this.showViews();
c.DelayFramer.Push(d.Fun(this.excuteDelayCalls, this));
this.addEvents();
this.isInitAsset = !0;
h.dispatchModuleEvent(i.ModuleEvent.LOAD_MODULE_ASSET_COMPLETE + this.moduleName, this.moduleName);
}
};
e.prototype.bindViews = function() {
if (this.binder && this.node) {
this.binder.bindView(this.node);
this.binder.moduleNode = this.node;
}
};
e.prototype.createMainNode = function() {
if (this.assets.length > 0) {
var e = this.assets[0];
if ("string" != typeof e) {
if (e.type != o.LoaderType.PREFAB) return new cc.Node(this.moduleName);
e = e.asset;
}
return this.instantiatePrefab(e);
}
return new cc.Node(this.moduleName);
};
e.prototype.createViews = function() {};
e.prototype.showViews = function() {
if (null != this.node) {
this.node.name = this.moduleName;
!this.node.parent && this.parent && this.parent.addChild(this.node);
if (null != this.moduleData) {
void 0 != this.moduleData.x && (this.node.x = this.moduleData.x);
void 0 != this.moduleData.y && (this.node.y = this.moduleData.y);
}
}
};
e.prototype.show = function(e, t) {
this.isShowModule = !0;
this.moduleData = t;
this.parent = e;
this.parent != e && null != this.node && this.node.removeFromParent();
this.isInitAsset && this.showViews();
};
e.prototype.hide = function(e) {
this.hideViews();
};
e.prototype.hideViews = function() {
this.isShowModule = !1;
null == this.node || this.isPlayDisposeAnimation || this.node.removeFromParent(!1);
};
e.prototype.addEvents = function() {};
e.prototype.removeEvents = function() {
s.EventManager.removeEvent(this);
};
e.prototype.onHideAnimationComplete = function() {
this.isPlayDisposeAnimation = !1;
this.dispose();
};
e.prototype.playDisposeAnimation = function() {
this.isPlayDisposeAnimation && this.node && this.node.isValid && this.hide();
return !1;
};
e.prototype.dispose = function() {
if (!this.playDisposeAnimation()) {
this.isPlayDisposeAnimation = !1;
this.binder && this.binder.dispose();
this.removeEvents();
this.disposeObjects();
if (this.node && this.node.isValid) {
this.hideViews();
this.node.destroyAllChildren();
this.node.destroy();
}
this.releaseAssets();
this.isShowModule = !1;
this.isInitAsset = !1;
this._isInitialize = !1;
this.delayCalls.length = 0;
this.parent = null;
this.moduleData = null;
this.moduleName = null;
this.binder = null;
this.node = null;
}
};
e.prototype.addObject = function(e) {
e instanceof y.FBinder && (e.moduleNode = this.node);
-1 == this.disObjects.indexOf(e) && this.disObjects.push(e);
return e;
};
e.prototype.disposeObjects = function() {
for (;this.disObjects.length > 0; ) this.disObjects.shift().dispose();
};
e.prototype.instantiatePrefab = function(e) {
return a.ResourceManager.InstantiatePrefab(e);
};
e.prototype.excuteModuleFun = function(e) {
for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
if (!this.isInitAsset || this.delayCalls.length > 0) this.delayCalls.push({
funName: e,
args: t
}); else {
var o = this[e];
null != o && o.apply(this, t);
}
};
e.prototype.excuteDelayCalls = function() {
if (this.isInitAsset) for (;this.delayCalls.length > 0; ) {
var e = this.delayCalls.shift(), t = this[e.funName];
null != t && t.apply(this, e.args);
}
};
e.prototype.releaseAssets = function() {
this.excuteModuleFun;
if (this.isReleaseAsset) {
var e = g.Assets.GetAssets(this.assets);
p.delayReleaseRes(e.assets, this.delayReleaseAssetTime);
}
};
e.prototype.applyModuleFun = function(e, t, n) {};
return e;
}();
n.FModule = m;
cc._RF.pop();
}, {
"../Enums/LoaderType": "LoaderType",
"../Events/ModuleEvent": "ModuleEvent",
"../Loaders/Loader": "Loader",
"../Managers/EventManager": "EventManager",
"../Managers/ResourceManager": "ResourceManager",
"../Timers/DelayFramer": "DelayFramer",
"../Utility/AssetUtility": "AssetUtility",
"../Utility/dx/Fun": "Fun",
"../Utility/dx/cancelDelayReleaseRes": "cancelDelayReleaseRes",
"../Utility/dx/delayReleaseRes": "delayReleaseRes",
"../Utility/dx/dispatchModuleEvent": "dispatchModuleEvent",
"../Utility/dx/getQualifiedClassName": "getQualifiedClassName",
"./Assets": "Assets",
"./FBinder": "FBinder"
} ],
FObject: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "cecb7GxY2NOS7reuhyDGifn", "FObject");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.FObject = void 0;
var o = e("../Utility/ObjectUtility"), i = function() {
function e() {}
e.prototype.update = function(e) {
this.analysis(e);
};
e.prototype.analysis = function(e) {
for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
o.ObjectUtility.Analysis(this, this, e, this.customSetProperty, this.unOwnSetProperty, t);
};
e.prototype.unOwnSetProperty = function(e, t, n) {};
e.prototype.customSetProperty = function(t, n, o) {
null != this[o] && this[o] instanceof e ? this[o].update(n[o]) : this.unOwnSetProperty(t, n, o);
};
e.prototype.clone = function() {
return null;
};
return e;
}();
n.FObject = i;
cc._RF.pop();
}, {
"../Utility/ObjectUtility": "ObjectUtility"
} ],
FProxy: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f78deHNGJtG1qvMUwmGpO2d", "FProxy");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../Managers/EventManager"), i = e("../Managers/ProxyManager"), r = e("../Managers/ClientManager"), s = function() {
function e() {
this.client = null;
this.isNeedDisposeClient = !0;
}
e.prototype.initialize = function() {
i.ProxyManager.AddProxy(this);
this.client = this.initClient();
this.client.isConnected || this.connectServer();
this.initHandlers();
this.addEvents();
};
e.prototype.addHandler = function(e, t) {
this.client.addHandler(e, new t(), !0);
};
e.prototype.connectServer = function() {};
e.prototype.initClient = function() {
return null;
};
e.prototype.initHandlers = function() {};
e.prototype.addEvents = function() {};
e.prototype.removeEvents = function() {
o.EventManager.removeEvent(this);
};
e.prototype.dispose = function() {
i.ProxyManager.RemoveProxy(this);
this.removeEvents();
if (null != this.client) {
this.client.clearHandlers();
this.isNeedDisposeClient && r.ClientManager.DisposeClients(this.client.clientName);
}
};
e.ClassName = "FProxy";
return e;
}();
n.default = s;
cc._RF.pop();
}, {
"../Managers/ClientManager": "ClientManager",
"../Managers/EventManager": "EventManager",
"../Managers/ProxyManager": "ProxyManager"
} ],
FScene: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3cd0aOW03pF7rYcCMyax/U1", "FScene");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
n.FScene = void 0;
var r = e("../Managers/EventManager"), s = e("../Utility/dx/stageHeight"), a = e("../Utility/dx/stageWidth"), c = e("./Application"), l = e("./FMediator"), u = cc._decorator, p = u.ccclass, h = u.property, d = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.root3D = null;
t._creatLayer = !1;
t.layers = [];
t.mediator = null;
t.cameras = {};
return t;
}
n = t;
Object.defineProperty(t.prototype, "creatLayer", {
get: function() {
return this._creatLayer;
},
set: function(e) {
this._creatLayer = e;
e && this.createLayers();
},
enumerable: !1,
configurable: !0
});
t.prototype.onLoad = function() {
c.Application.SetCurrentScene(this);
this.createLayers();
this.findCameras();
};
t.prototype.findCameras = function() {
for (var e = cc.director.getScene().getComponentsInChildren(cc.Camera), t = 0; t < e.length; t++) 0 != e[t].node.active && (this.cameras[e[t].node.name] = e[t]);
};
t.prototype.getCamera = function(e) {
return this.cameras[e];
};
t.prototype.start = function() {
if (null != this.mediator) {
this.mediator.sceneName = cc.director.getScene().name;
this.mediator.startMediator();
}
};
t.prototype.createLayers = function() {
this.layers.length = 0;
for (var e = 0; e < n.layerNames.length; e++) {
var t = this.node.getChildByName(n.layerNames[e]);
if (null == t) {
(t = new cc.Node(n.layerNames[e])).setContentSize(a.stageWidth(), s.stageHeight());
this.node.addChild(t);
}
t.setContentSize(cc.Canvas.instance.designResolution);
this.layers.push(t);
}
};
t.prototype.getLayer = function(e) {
return -1 == e ? this.root3D : this.layers[e];
};
t.prototype.onDisable = function() {
r.EventManager.removeEvent(this);
null != this.mediator && this.mediator.dispose();
this.mediator = null;
};
t.prototype.onDestroy = function() {
c.Application.OnCurrentSceneDestroy();
};
t.prototype.onGetSceneData = function(e) {
e instanceof l.FMediator && (this.mediator = e);
};
var n;
t.layerNames = [ "Background", "Content", "UI", "PopupMask", "Popup", "WindowMask", "Window" ];
i([ h({
type: cc.Node,
serializable: !0,
displayName: "3D Root",
tooltip: "3D 场景的根节点"
}) ], t.prototype, "root3D", void 0);
i([ h({
serializable: !0
}) ], t.prototype, "_creatLayer", void 0);
i([ h({
serializable: !0
}) ], t.prototype, "creatLayer", null);
return t = n = i([ p ], t);
}(cc.Component);
n.FScene = d;
cc._RF.pop();
}, {
"../Managers/EventManager": "EventManager",
"../Utility/dx/stageHeight": "stageHeight",
"../Utility/dx/stageWidth": "stageWidth",
"./Application": "Application",
"./FMediator": "FMediator"
} ],
FView: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "53b44Qq4PlK7oGD8+P5cpBc", "FView");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
n.FView = void 0;
var r = e("../Managers/EventManager"), s = e("../Timers/DelayFramer"), a = e("../Utility/dx/Fun"), c = cc._decorator, l = c.ccclass, u = (c.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.show = function(e, t) {
if (null != e && null != this.node && e != this.node.parent) {
this.node.removeFromParent();
e.addChild(this.node);
}
};
t.prototype.hide = function(e) {
this.node && this.node.removeFromParent();
};
t.prototype.addEvents = function() {};
t.prototype.removeEvents = function() {
r.EventManager.removeEvent(this);
};
t.prototype.invalidate = function() {
s.DelayFramer.Push(a.Fun(this.render, this));
};
t.prototype.onInvalidate = function() {
s.DelayFramer.Remove(a.Fun(this.render, this));
this.render();
};
t.prototype.render = function() {};
t.prototype.onEnable = function() {
this.addEvents();
};
t.prototype.onDisable = function() {
s.DelayFramer.Remove(a.Fun(this.render, this));
this.removeEvents();
};
return t = i([ l ], t);
}(cc.Component));
n.FView = u;
cc._RF.pop();
}, {
"../Managers/EventManager": "EventManager",
"../Timers/DelayFramer": "DelayFramer",
"../Utility/dx/Fun": "Fun"
} ],
Fun: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2ed10g4q4JBi6lH7Kdd8rFe", "Fun");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.Fun = void 0;
var o = e("../../Core/FFunction"), i = e("../../Managers/StoreManager");
n.Fun = function(e, t, n, r) {
void 0 === n && (n = !0);
var s = i.StoreManager.New(o.FFunction);
s.isOnce = n;
s.fun = e;
s.target = t;
s.params = r;
return s;
};
cc._RF.pop();
}, {
"../../Core/FFunction": "FFunction",
"../../Managers/StoreManager": "StoreManager"
} ],
GameEvent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2487bGI8hxBsJeyTSxJL5P9", "GameEvent");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.GameEvent = void 0;
var o = function() {
function e() {}
e.ClassName = "GameEvent";
e.GameLogin = "GameLogin";
e.GameStart = "GameStart";
e.OpenBookCover = "OpenBookCover";
return e;
}();
n.GameEvent = o;
cc._RF.pop();
}, {} ],
GameLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b5b17mbK/dMf6Cxaxn3CBIg", "GameLayer");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.GameLayer = void 0;
(function(e) {
e[e.Root3D = -1] = "Root3D";
e[e.Background = 0] = "Background";
e[e.Content = 1] = "Content";
e[e.UI = 2] = "UI";
e[e.PopupMask = 3] = "PopupMask";
e[e.Popup = 4] = "Popup";
e[e.WindowMask = 5] = "WindowMask";
e[e.Window = 6] = "Window";
})(n.GameLayer || (n.GameLayer = {}));
cc._RF.pop();
}, {} ],
Global: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "73ed2vuBF1D644vlYzMYXxh", "Global");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.Global = void 0;
var o = function() {
function e() {}
e.ClassName = "Global";
e.SN_NUM = 0;
e.START_TIME = Date.now();
return e;
}();
n.Global = o;
cc._RF.pop();
}, {} ],
HttpMethod: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9d01f6SnN1PnouF0PPmw4ES", "HttpMethod");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.HttpMethod = void 0;
(function(e) {
e.GET = "GET";
e.POST = "POST";
})(n.HttpMethod || (n.HttpMethod = {}));
cc._RF.pop();
}, {} ],
HttpRequest: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "fc03e4DtfRAha4YdZxGgI3E", "HttpRequest");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.HttpRequest = void 0;
var o = function() {
function e() {
this._url = "";
this._method = "";
this.api = "";
this.async = !0;
}
e.prototype.addCallBacks = function(e, t, n, o) {
this.onComplete = t;
this.onError = o;
this.onProgress = n;
this.thisObj = e;
};
Object.defineProperty(e.prototype, "responseType", {
get: function() {
return this._responseType;
},
set: function(e) {
this._responseType = e;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "withCredentials", {
get: function() {
return this._withCredentials;
},
set: function(e) {
this._withCredentials = e;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "response", {
get: function() {
if (!this._xhr) return null;
if (void 0 != this._xhr.response) return this._xhr.response;
if ("text" == this._responseType) return this._xhr.responseText;
if ("arraybuffer" == this._responseType && /msie 9.0/i.test(navigator.userAgent)) {
return window.convertResponseBodyToText(this._xhr.responseBody);
}
return "document" == this._responseType ? this._xhr.responseXML : null;
},
enumerable: !1,
configurable: !0
});
e.prototype.open = function(e, t, n) {
void 0 === t && (t = "GET");
void 0 === n && (n = !0);
this._url = e;
this._method = t;
if (this._xhr) {
this._xhr.abort();
this._xhr = null;
}
this.async = n;
this._xhr = this.getXHR();
this._xhr.onreadystatechange = this.onReadyStateChange.bind(this);
this._xhr.onprogress = this.updateProgress.bind(this);
this._xhr.open(this._method, this._url, this.async);
};
Object.defineProperty(e.prototype, "xhr", {
get: function() {
return this._xhr;
},
enumerable: !1,
configurable: !0
});
e.prototype.getXHR = function() {
if (window.XMLHttpRequest) return new window.XMLHttpRequest();
throw Error("Not Fount XMLHttpRequest!!!!");
};
e.prototype.onReadyStateChange = function() {
var e = this._xhr;
if (4 == e.readyState) {
var t = e.status >= 400 || 0 == e.status;
this._url;
setTimeout(function() {
t ? this.onError && (0 == this.onError.length ? this.onError.call(this.thisObj) : this.onError.call(this.thisObj, this)) : this.onComplete && (0 == this.onComplete.length ? this.onComplete.call(this.thisObj) : this.onComplete.call(this.thisObj, this, this.response));
}.bind(this), 0);
}
};
e.prototype.updateProgress = function(e) {
e.lengthComputable && this.onProgress && this.onProgress.call(this.thisObj, e.loaded, e.total);
};
e.prototype.send = function(e) {
null != this._responseType && (this._xhr.responseType = this._responseType);
null != this._withCredentials && (this._xhr.withCredentials = this._withCredentials);
if (this.headerObj) for (var t in this.headerObj) this._xhr.setRequestHeader(t, this.headerObj[t]);
this._xhr.send(e);
if (!this.async) return this._xhr.responseText;
};
e.prototype.abort = function() {
this.api = "";
this._xhr && this._xhr.abort();
};
e.prototype.getAllResponseHeaders = function() {
if (!this._xhr) return null;
var e = this._xhr.getAllResponseHeaders();
return e || "";
};
e.prototype.setRequestHeader = function(e, t) {
this.headerObj || (this.headerObj = {});
this.headerObj[e] = t;
};
e.prototype.getResponseHeader = function(e) {
if (!this._xhr) return null;
var t = this._xhr.getResponseHeader(e);
return t || "";
};
e.prototype.dispose = function() {
this.abort();
this.async = !0;
this.headerObj = null;
this.onProgress = null;
this.onComplete = null;
this.onError = null;
this.thisObj = null;
};
e.ClassName = "HttpRequest";
return e;
}();
n.HttpRequest = o;
cc._RF.pop();
}, {} ],
HttpResponseType: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6ad86y0SwlIg4XqEYSM+iEj", "HttpResponseType");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.HttpResponseType = void 0;
var o = function() {
function e() {}
e.ClassName = "HttpResponseType";
e.TEXT = "text";
e.ARRAY_BUFFER = "arraybuffer";
return e;
}();
n.HttpResponseType = o;
cc._RF.pop();
}, {} ],
IBinder: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4769b+/RfBC24t3AwAX/O11", "IBinder");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
IClientMessage: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5fb5aFMeIxChaQ3L/dwZEMh", "IClientMessage");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
IClient: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "51f3b7ppN5B4545QoKR8keD", "IClient");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
IContext: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "57188oFlYtKAaz1Wi/Cocy/", "IContext");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
IDispose: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9d097mOK/hPLaOrWrIzNy4k", "IDispose");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
IHttpRequest: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "82302jeH5pLNojvcAlB68hS", "IHttpRequest");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
IJuggle: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d3ce3Y/ovxGG6SRItuEoSCG", "IJuggle");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
ILanguage: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "eb31cR39T5PTJDg6W8ca0Z3", "ILanguage");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
ILoader: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "602faNa6CBOhaGeI/6Hw22w", "ILoader");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
IMediator: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e8fbfwKFoZHlYqoGl7P47Sg", "IMediator");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
IModule: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b9667hSchZM86EOdRfA2m34", "IModule");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
IProxy: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "7e0c8eTYklNWrkq9WoHU9IU", "IProxy");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
IReceiveHandler: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0c734H6CwJErqKCm/bg+zh/", "IReceiveHandler");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
IStore: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5b8aeYUYRtB3IHnD4BuRjgk", "IStore");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
InstanceManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "bb042PsVl9ADrxyArUcOXAd", "InstanceManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.InstanceManager = void 0;
var o = e("../Utility/dx/getQualifiedClassName"), i = function() {
function e() {}
e.GetInstance = function(e, t) {
var n = t || o.getQualifiedClassName(e);
this.instanceDict[n] || (this.instanceDict[n] = new e());
var i = this.instanceDict[n];
t && i.hasOwnProperty("name") && (i.name = t);
return i;
};
e.HasInstance = function(e) {
return null != this.instanceDict[e];
};
e.DisposeInstance = function(e) {
if (this.instanceDict[e]) {
var t = this.instanceDict[e];
t && t.hasOwnProperty("dispose") && t.dispose();
delete this.instanceDict[e];
}
};
e.instanceDict = {};
return e;
}();
n.InstanceManager = i;
cc._RF.pop();
}, {
"../Utility/dx/getQualifiedClassName": "getQualifiedClassName"
} ],
Instances: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3061dqkNStFU4r0iCy6kKTR", "Instances");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.Instances = void 0;
var o = function() {
function e() {}
e.ClassName = "Instances";
e.ResUUIDMaps = "ResUUIDMaps";
e.CacheDepUUIDCounts = "CacheDepUUIDCounts";
return e;
}();
n.Instances = o;
cc._RF.pop();
}, {} ],
JFrameStacker: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1b7c8utbO9APqtTmneHUCO3", "JFrameStacker");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.JFrameStacker = void 0;
var o = e("./JFramer"), i = e("../Utility/ArrayUtility"), r = e("../Managers/StoreManager"), s = e("../Managers/EventManager"), a = function() {
function e() {
this.frames = [];
this.isStart = !1;
}
e.prototype.addFrame = function(e, t, n) {
for (var o = [], i = 3; i < arguments.length; i++) o[i - 3] = arguments[i];
this.stop();
this.frames.push({
obj: t,
frame: e,
fun: n,
args: o
});
};
e.prototype.start = function() {
if (!this.isStart) {
i.ArrayUtility.SortOn(this.frames, "frame");
this.isStart = !0;
if (null == this.framer) {
this.framer = o.JFramer.GetFramer();
this.framer.addFramerCallback(this, this.onFrame);
this.framer.name = "JFrameStacker";
}
this.framer.start();
this.tickTriggerFrame();
}
};
e.prototype.onFrame = function() {
this.tickTriggerFrame();
};
e.prototype.tickTriggerFrame = function() {
for (var e = 0; e < this.frames.length; e++) if (this.frames[e].frame == this.framer.frame) {
var t = this.frames[e];
this.frames.splice(e, 1);
t.fun && t.fun.call(t.obj, t.args);
e--;
}
0 == this.frames.length && stop();
};
e.prototype.stop = function() {
if (this.isStart) {
this.isStart = !1;
this.framer && this.framer.stop();
}
};
e.prototype.dispose = function() {
this.stop();
this.frames.length = 0;
this.framer && this.framer.dispose();
this.framer = null;
s.EventManager.removeEvent(this);
};
e.GetFramer = function() {
return r.StoreManager.New(e);
};
e.ClassName = "JFrameStacker";
return e;
}();
n.JFrameStacker = a;
cc._RF.pop();
}, {
"../Managers/EventManager": "EventManager",
"../Managers/StoreManager": "StoreManager",
"../Utility/ArrayUtility": "ArrayUtility",
"./JFramer": "JFramer"
} ],
JFramer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d51a6wmTOlNmZvLYpdv9jNl", "JFramer");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.JFramer = void 0;
var o = e("../Managers/StoreManager"), i = e("../Managers/JuggleManager"), r = e("../Managers/EventManager"), s = function() {
function e() {
this.isStarting = !1;
this._frame = 0;
this.thisObj = null;
this.name = "";
}
e.prototype.start = function() {
if (!this.isStarting) {
this._frame = 0;
i.JuggleManager.AddJuggle(this);
this.isStarting = !0;
}
};
e.prototype.stop = function() {
if (this.isStarting) {
this._frame = 0;
this.isStarting = !1;
i.JuggleManager.RemoveJuggle(this);
}
};
e.prototype.onJuggle = function(e) {
this._frame++;
null != this.frameHandler && this.frameHandler.call(this.thisObj);
};
e.prototype.addFramerCallback = function(e, t) {
this.thisObj = e;
this.frameHandler = t;
};
e.prototype.dispose = function() {
this.stop();
this.frameHandler = null;
this.thisObj = null;
r.EventManager.removeEvent(this);
};
Object.defineProperty(e.prototype, "frame", {
get: function() {
return this._frame;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "running", {
get: function() {
return this.isStarting;
},
enumerable: !1,
configurable: !0
});
e.prototype.toString = function() {
return "[Object JFramer name=" + this.name + "]";
};
e.GetFramer = function() {
return o.StoreManager.New(e);
};
e.ClassName = "JFramer";
return e;
}();
n.JFramer = s;
cc._RF.pop();
}, {
"../Managers/EventManager": "EventManager",
"../Managers/JuggleManager": "JuggleManager",
"../Managers/StoreManager": "StoreManager"
} ],
JTimer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5d68cIwbz5NxJPxs5vAIfsr", "JTimer");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.JTimer = void 0;
var o = e("./AdvanceTick"), i = e("../Managers/JuggleManager"), r = e("../Managers/StoreManager"), s = e("../Structs/Dictionary"), a = e("../Managers/EventManager"), c = function() {
function e() {
this.name = "";
this.timeHandler = null;
this.completeHandler = null;
this._repeatCount = -1;
this.isStarting = !1;
this.lastSetRepeatCount = -1;
this.tickArgs = null;
this.completeArgs = null;
this._currentCount = 0;
this.juggleTick = new o.AdvanceTick();
this.juggleTick.onTick = this.onRenderer;
this.juggleTick.thisObj = this;
}
e.prototype.addTimerCallback = function(e, t, n, o, i) {
this.thisObj = e;
this.timeHandler = t;
this.completeHandler = n;
this.tickArgs = o;
this.completeArgs = i;
};
e.prototype.onRenderer = function() {
if (0 != this.isStarting) {
this._currentCount++;
if (this.repeatCount > 0) {
this._repeatCount--;
this.applyTimeTick();
if (0 == this.repeatCount) {
this.stop();
this.applyTimeComplete();
}
} else this.applyTimeTick();
}
};
e.prototype.applyTimeComplete = function() {
null != this.completeHandler && (null == this.completeArgs ? 0 == this.completeHandler.length ? this.completeHandler.apply(this.thisObj) : this.completeHandler.apply(this.thisObj, this) : this.completeHandler.apply(this.thisObj, this.completeArgs));
};
e.prototype.applyTimeTick = function() {
null != this.timeHandler && (null == this.tickArgs ? 0 == this.timeHandler.length ? this.timeHandler.apply(this.thisObj) : this.timeHandler.apply(this.thisObj, this) : this.timeHandler.apply(this.thisObj, this.tickArgs));
};
e.prototype.start = function() {
this.repeatCount = this.lastSetRepeatCount;
if (!this.isStarting) {
i.JuggleManager.AddJuggle(this);
this.isStarting = !0;
}
};
e.prototype.stop = function() {
if (this.isStarting) {
this.isStarting = !1;
i.JuggleManager.RemoveJuggle(this);
}
};
e.prototype.reset = function() {
this.stop();
this.juggleTick.clear();
this.repeatCount = this.lastSetRepeatCount;
};
Object.defineProperty(e.prototype, "repeatCount", {
get: function() {
return this._repeatCount;
},
set: function(e) {
this._repeatCount = e;
this.lastSetRepeatCount = this._repeatCount;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "delay", {
get: function() {
return this.juggleTick.juggleInterval;
},
set: function(e) {
e <= 0 && (e = Number.MAX_VALUE);
this.juggleTick.juggleInterval = e;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "running", {
get: function() {
return this.isStarting;
},
enumerable: !1,
configurable: !0
});
e.prototype.onJuggle = function(e) {
this.juggleTick.onJuggle(e);
};
Object.defineProperty(e.prototype, "currentCount", {
get: function() {
return this._currentCount;
},
enumerable: !1,
configurable: !0
});
e.prototype.dispose = function() {
this.stop();
this.name = "";
this.thisObj = null;
this.delay = Number.MAX_VALUE;
this.repeatCount = -1;
this.juggleTick.clear();
this.completeHandler = null;
this.completeArgs = null;
this.tickArgs = null;
this._currentCount = 0;
this.timeHandler = null;
this.lastSetRepeatCount = -1;
a.EventManager.removeEvent(this);
};
e.GetTimer = function(t, n) {
void 0 === n && (n = -1);
var o = r.StoreManager.New(e);
o.delay = t;
o.repeatCount = n;
return o;
};
e.TimeOut = function(t, n, o) {
if (n <= 0) {
o && o.excute();
return null;
}
var i = e.GetTimer(n, 1), r = this.times.getValue(t);
null == r && (r = []);
r.push(i);
this.times.setValue(t, r);
i.addTimerCallback(null, function() {
o && o.excute();
e.ClearTimeOut(t, i);
});
i.start();
return i;
};
e.ClearTimeOut = function(e, t) {
var n = this.times.getValue(e);
if (null != n) if (null != t) {
var o = n.indexOf(t);
o > -1 && n.splice(o, 1);
0 == n.length && this.times.remove(e);
t.dispose();
} else {
for (;n.length > 0; ) n.shift().dispose();
this.times.remove(e);
}
};
e.prototype.toString = function() {
return "[Object JTimer name=" + name + " delay=" + this.delay + " repeatCount=" + this.lastSetRepeatCount + " tick=" + this.timeHandler + " tickComplete=" + this.completeHandler + "]";
};
e.ClassName = "JTimer";
e.times = new s.Dictionary();
return e;
}();
n.JTimer = c;
cc._RF.pop();
}, {
"../Managers/EventManager": "EventManager",
"../Managers/JuggleManager": "JuggleManager",
"../Managers/StoreManager": "StoreManager",
"../Structs/Dictionary": "Dictionary",
"./AdvanceTick": "AdvanceTick"
} ],
JuggleFramer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "64357wm+9hItYg6DAMTebfz", "JuggleFramer");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.JuggleFramer = void 0;
var o = function() {
function e() {
this.onFrame = null;
this.isRunning = !1;
this.handler = 0;
this.isRender = !1;
for (var e = [ "ms", "moz", "webkit", "o" ], t = 0; t < e.length && !window.requestAnimationFrame; ++t) {
var n = e[t];
window.requestAnimationFrame = window[n + "RequestAnimationFrame"];
window.cancelAnimationFrame = window[n + "CancelAnimationFrame"] || window[n + "CancelRequestAnimationFrame"];
}
window.requestAnimationFrame || (window.requestAnimationFrame = function(e) {
return setTimeout(function() {
return e(17);
}, 17);
});
window.cancelAnimationFrame || (window.cancelAnimationFrame = clearTimeout);
}
e.prototype.start = function() {
if (!this.isRunning || null == this.onFrame) {
this.isRunning = !0;
this.isRender = !1;
this.render();
}
};
e.prototype.render = function() {
var e = this;
if (this.isRunning || null != this.onFrame) {
this.isRender && this.onFrame.excute();
this.isRender = !0;
this.handler = window.requestAnimationFrame(function() {
return e.render();
});
}
};
e.prototype.stop = function() {
if (this.isRunning) {
this.isRunning = !1;
this.isRender = !1;
window.cancelAnimationFrame(this.handler);
}
};
e.ClassName = "JuggleFramer";
return e;
}();
n.JuggleFramer = o;
cc._RF.pop();
}, {} ],
JuggleManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "00bd7W4pXVBUZdtFSjvWQ/E", "JuggleManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.JuggleManager = void 0;
var o = e("../Utility/dx/Fun"), i = e("../Utility/dx/trace"), r = e("../Timers/JuggleFramer"), s = e("../Utility/dx/getTime"), a = function() {
function e() {}
e.AddJuggle = function(e) {
if (-1 == this.juggles.indexOf(e)) {
this.juggles.push(e);
this.startJuggle();
}
};
e.RemoveJuggle = function(e) {
var t = this.juggles.indexOf(e);
if (-1 != t) {
this.juggles.splice(t, 1);
0 == this.juggles.length && this.stopJuggle();
}
};
e.startJuggle = function() {
if (!this.isStartJuggle) {
this.isStartJuggle = !0;
this.lastJuggleTime = s.getTime();
if (null == this.framer) {
this.framer = new r.JuggleFramer();
this.framer.onFrame = o.Fun(this.onJuggle, this, !1);
}
this.framer.start();
}
};
e.stopJuggle = function() {
if (0 != this.isStartJuggle) {
this.isStartJuggle = !1;
this.framer && this.framer.stop();
}
};
e.onJuggle = function(e) {
if (0 != this.isStartJuggle) {
var t = s.getTime();
this.currentJuggleTime = t - this.lastJuggleTime;
this.currentJuggleTime > 1e3 && (this.currentJuggleTime = 1e3);
this.lastJuggleTime = t;
for (var n = 0; n < this.juggles.length; n++) this.juggles[n].onJuggle(this.currentJuggleTime);
}
};
e.Print = function() {
for (var e = 0; e < this.juggles.length; e++) i.trace(this.juggles[e].name, "===>", this.juggles[e]);
};
e.juggles = [];
e.isStartJuggle = !1;
e.currentJuggleTime = 0;
e.lastJuggleTime = 0;
e.framer = null;
return e;
}();
n.JuggleManager = a;
cc._RF.pop();
}, {
"../Timers/JuggleFramer": "JuggleFramer",
"../Utility/dx/Fun": "Fun",
"../Utility/dx/getTime": "getTime",
"../Utility/dx/trace": "trace"
} ],
LanguageManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4f861rSasVDm4HCTlxKkaiF", "LanguageManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.LanguageManager = void 0;
var o = e("./ResourceManager"), i = e("../Utility/dx/Fun"), r = e("./CacheManager"), s = e("../Core/Assets"), a = e("../Utility/dx/trace"), c = function() {
function e() {}
e.AddItem = function(e) {
if (null != e) {
-1 == this.items.indexOf(e) && this.items.push(e);
this.langIndex < 0 || e.onChangeLanguage(this.langIndex);
}
};
e.RemoveItem = function(e) {
if (null != e) {
var t = this.items.indexOf(e);
-1 != t && this.items.splice(t, 1);
}
};
e.GetLang = function(e) {
return null == this.langData || void 0 == this.langData[e] ? e : this.langData[e];
};
e.ChangeLanguage = function(e) {
"string" == typeof e && (e = this.LanguageNames.indexOf(e));
if ("number" == typeof e) {
if (e < 0 || e == this.langIndex || this.isLoading) return;
this.isLoading = !0;
o.ResourceManager.LoadText(this.GetAssetName(e), i.Fun(this.onLanguageComplete, this, !0, [ e ]));
}
};
e.onLanguageComplete = function(e) {
this.isLoading = !1;
var t = this.GetAssetName(e);
if (r.CacheManager.HasCache(t)) {
var n = r.CacheManager.GetCache(t);
this.langData = n.json;
this.langIndex = e;
this.onChangeLanguage();
}
};
e.onChangeLanguage = function() {
for (var e = 0; e < this.items.length; e++) this.items[e].onChangeLanguage(this.langIndex);
};
e.GetAssetName = function(e) {
return s.Assets.GetLanguage(this.LanguageNames[e]);
};
Object.defineProperty(e, "CurrentIndex", {
get: function() {
return this.langIndex;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e, "CurrentName", {
get: function() {
return this.langIndex < -1 ? null : this.LanguageNames[this.langIndex];
},
enumerable: !1,
configurable: !0
});
e.Print = function() {
a.trace("----------------- Start Languages----------------------");
for (var e = 0; e < this.items.length; e++) a.trace("===>", this.items[e]);
a.trace("-----------------Total Languages:" + this.items.length + "----------------------");
};
e.LanguageNames = [];
e.items = [];
e.langData = null;
e.langIndex = -100;
e.isLoading = !1;
return e;
}();
n.LanguageManager = c;
cc._RF.pop();
}, {
"../Core/Assets": "Assets",
"../Utility/dx/Fun": "Fun",
"../Utility/dx/trace": "trace",
"./CacheManager": "CacheManager",
"./ResourceManager": "ResourceManager"
} ],
LanguageType: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5894coQXZdH4rzOk55Vdk8c", "LanguageType");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.LanguageType = void 0;
(function(e) {
e[e.TEXT = 0] = "TEXT";
e[e.SPRITE = 1] = "SPRITE";
e[e.BUTTON = 2] = "BUTTON";
e[e.FUNCTION = 3] = "FUNCTION";
})(n.LanguageType || (n.LanguageType = {}));
cc._RF.pop();
}, {} ],
LoaderType: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f0b753g1C9I8YUVUG7GQWHm", "LoaderType");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.LoaderType = void 0;
(function(e) {
e[e.TEXT = 0] = "TEXT";
e[e.IMAGE = 1] = "IMAGE";
e[e.SPRITE = 2] = "SPRITE";
e[e.SPRITE_ATLAS = 3] = "SPRITE_ATLAS";
e[e.PREFAB = 4] = "PREFAB";
e[e.FONT = 5] = "FONT";
e[e.SCENE = 6] = "SCENE";
e[e.AUDIO = 7] = "AUDIO";
e[e.DRAGON_BONE = 8] = "DRAGON_BONE";
e[e.SPINE = 9] = "SPINE";
e[e.RAW = 10] = "RAW";
})(n.LoaderType || (n.LoaderType = {}));
cc._RF.pop();
}, {} ],
Loader: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "23fd4bVswlNib5BhSAmfUPx", "Loader");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.Loader = void 0;
var o = e("../Managers/CacheManager"), i = e("../Enums/LoaderType"), r = e("../Managers/StoreManager"), s = function() {
function e() {
this.cacheAsset = !0;
this._contents = [];
this._callbacks = [];
this._index = -1;
this._urls = [];
this.countRatio = 0;
}
Object.defineProperty(e.prototype, "length", {
get: function() {
return this._urls.length;
},
enumerable: !1,
configurable: !0
});
e.prototype.getURL = function(e) {
return this._urls[e];
};
e.prototype.getAssetType = function(e) {
return this._assetTypes ? this._assetTypes[e] : null;
};
e.prototype.getLoaderType = function(e) {
return this._loaderTypes ? this._loaderTypes[e] : null;
};
e.prototype.getContent = function(e) {
return this._contents[e];
};
e.prototype.addCallback = function(e, t, n, o) {
this._callbacks.push({
target: e,
onComplete: t,
onProgress: n,
onError: o
});
};
e.prototype.load = function(e, t, n) {
if (this._urls.length > 0) {
this._urls.push(e);
if (null != t) {
null == this._assetTypes && (this._assetTypes = []);
this._assetTypes[this._assetTypes.length] = t;
}
if (null != n) {
null == this._loaderTypes && (this._loaderTypes = []);
this._loaderTypes[this._loaderTypes.length] = n;
}
} else this.loads([ e ], null != t ? [ t ] : null, null != n ? [ n ] : null);
};
e.prototype.loads = function(e, t, n) {
this._urls = e;
this._assetTypes = t;
this._loaderTypes = n;
this.countRatio = 100 / e.length;
this.loadAsset();
};
e.prototype.loadAsset = function() {
var e = this;
this._index++;
if (this._index >= this._urls.length) setTimeout(function() {
return e.complete();
}, 1); else {
var t = this.getURL(this._index);
if (o.CacheManager.HasCache(t)) this.onLoadComplete(null, o.CacheManager.GetCache(t)); else {
var n = this.getAssetType(this._index), r = this.getLoaderType(this._index);
r == i.LoaderType.IMAGE ? cc.assetManager.loadRemote(t, {
cacheEnabled: !0
}, function(t, n) {
return e.onLoadComplete(t, n);
}) : r == i.LoaderType.RAW ? cc.assetManager.resources.load(cc.url.raw(t), function(t, n, o) {
return e.onLoadProgress(t, n, o);
}, function(t, n) {
return e.onLoadComplete(t, n);
}) : cc.assetManager.resources.load(t, n, function(t, n, o) {
return e.onLoadProgress(t, n, o);
}, function(t, n) {
return e.onLoadComplete(t, n);
});
}
}
};
e.prototype.onLoadComplete = function(e, t) {
this._contents.push(t);
if (null != e) this.onLoadError(e); else if (this.cacheAsset) {
var n = this._urls[this._index];
o.CacheManager.HasCache(n) || o.CacheManager.Cache(n, t);
}
this.loadAsset();
};
e.prototype.complete = function() {
this.excuteCallback("onComplete");
this.dispose();
};
e.prototype.onLoadProgress = function(e, t, n) {
var o = 100;
0 != t && (o = Math.floor(this.countRatio * this._index + e / t * this.countRatio));
this.excuteCallback("onProgress", o);
};
e.prototype.onLoadError = function(e) {
this.excuteCallback("onError", {
resName: this._urls[this._index],
message: e.message,
index: this._index,
loaderType: this.getLoaderType(this._index)
});
this._callbacks.length <= 1 && null == this._callbacks[0] && null == this._callbacks[0].onError && cc.log("[加载资源出错] 第", this._index + 1, "个资源==", this._urls, "===>", e.message);
};
e.prototype.excuteCallback = function(e, t) {
for (var n = 0; n < this._callbacks.length; n++) {
var o = this._callbacks[n][e];
null != o && (0 == o.length ? o.call(this._callbacks[n].target) : 1 == o.length ? null != t ? o.call(this._callbacks[n].target, t) : o.call(this._callbacks[n].target, this) : 2 == o.length && o.call(this._callbacks[n].target, t, this));
}
};
e.prototype.dispose = function() {
this._index = -1;
this._callbacks.length = 0;
this._assetTypes && (this._assetTypes.length = 0);
this._urls.length = 0;
this._contents.length = 0;
this.cacheAsset = !0;
r.StoreManager.Store(this);
};
e.Get = function() {
return r.StoreManager.New(e);
};
e.ClassName = "Loader";
return e;
}();
n.Loader = s;
cc._RF.pop();
}, {
"../Enums/LoaderType": "LoaderType",
"../Managers/CacheManager": "CacheManager",
"../Managers/StoreManager": "StoreManager"
} ],
LocalCacheData: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0e8c3miaKxIPo8+GKsZO+n5", "LocalCacheData");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.LocalCacheData = void 0;
var o = function() {
function e() {}
e.isFirstEnterGame = function() {
var e = cc.sys.localStorage.getItem("IS_FIRST_ENTER_GAME");
return 0 == !JSON.parse(e);
};
e.setFirstEnterGame = function(e) {
var t = JSON.stringify(e);
cc.sys.localStorage.setItem("IS_FIRST_ENTER_GAME", t);
};
return e;
}();
n.LocalCacheData = o;
cc._RF.pop();
}, {} ],
LoginBinder: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "815ac4ruYpItpDeCXFxDeUx", "LoginBinder");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../../Framework/Core/FBinder"), s = e("../../../../Framework/Utility/dx/getNodeChildByName"), a = e("../../Common/Util"), c = e("./LoginConst"), l = cc._decorator, u = l.ccclass, p = (l.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.initViews = function() {
e.prototype.initViews.call(this);
this.loginBtn = s.getNodeChildByName(this.asset, "LoginBtn");
this.txtInfo = s.getNodeChildByName(this.asset, "txtInfo", cc.Label);
this.ldProgress = s.getNodeChildByName(this.asset, "ldProgress");
this.txtLoadingNum = s.getNodeChildByName(this.ldProgress, "txtLoadingNum", cc.Label);
this.ldProgress.active = !1;
};
t.prototype.setCurStatus = function(e) {
this.curStatus = e;
this.ldProgress.active = e == c.Status.loading;
this.txtInfo.node.active = e == c.Status.check;
e == c.Status.check && (this.txtInfo.string = c.LoginString.CHECK);
};
t.prototype.setLoadProgress = function(e) {
var t = 100 * e;
this.ldProgress.getComponent(cc.ProgressBar).progress = e;
this.txtLoadingNum.string = a.default.getKeepNum(t, 0) + "%";
};
t.prototype.addEvents = function() {
this.loginBtn.on(cc.Node.EventType.TOUCH_START, this.loginBtnClick, this);
};
t.prototype.loginBtnClick = function() {
cc.director.loadScene("MainScene");
};
return t = i([ u ], t);
}(r.FBinder));
n.default = p;
cc._RF.pop();
}, {
"../../../../Framework/Core/FBinder": "FBinder",
"../../../../Framework/Utility/dx/getNodeChildByName": "getNodeChildByName",
"../../Common/Util": "Util",
"./LoginConst": "LoginConst"
} ],
LoginConst: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "dfc701/PaNPUpev3yE/TA0z", "LoginConst");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.LoginString = n.Status = void 0;
(function(e) {
e[e.check = 0] = "check";
e[e.loading = 1] = "loading";
})(n.Status || (n.Status = {}));
var o = function() {
function e() {}
e.CHECK = "正在检测数据...";
e.urls = [ "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2551081007,1410450136&fm=26&gp=0.jpg", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F16%2F20150916122614_sm2CY.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616839231&t=e053c2200619253aba2db88c34321e5c", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190114%2F19%2F1547466519-RzElvipwtO.jpg&refer=http%3A%2F%2Fimage.biaobaiju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616843834&t=13cfd26086b52ef691afa8fd347a501c", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F09%2F11%2F2057d551800682d.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616843834&t=add8c9893fc2bb9dd205172dfca3d4fc", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic32.photophoto.cn%2F20140821%2F0005018354159792_b.jpg&refer=http%3A%2F%2Fpic32.photophoto.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616843834&t=89e33f09ed678f2c9cb6719456896d52", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F09%2F11%2F2057d551800682d.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616843834&t=add8c9893fc2bb9dd205172dfca3d4fc", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F17%2F06%2F22%2F415cfd02a8cbeea0f8e4acabab210252.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616843834&t=0ac6714d881499867ed19d546a4643aa" ];
return e;
}();
n.LoginString = o;
cc._RF.pop();
}, {} ],
LoginLoad: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5598cVSdkRJT7oR/F7PVfHg", "LoginLoad");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../../../Framework/Managers/CacheManager"), i = function() {
function e() {
this.urls = [];
this.totalLoadNum = 0;
}
e.getInstance = function() {
null == this.instance && (this.instance = new e());
return this.instance;
};
e.prototype.startLoad = function(e, t) {
this.totalLoadNum = this.urls.length;
this.progressCallback = e;
this.compileCallback = t;
this.load();
};
e.prototype.load = function() {
var e = this, t = this.urls.pop();
if (t) cc.assetManager.loadRemote(t, function(n, i) {
e.progressCallback((e.totalLoadNum - e.urls.length) / e.totalLoadNum);
o.CacheManager.Cache(t, i);
e.load();
}); else if (this.compileCallback) {
this.progressCallback((this.totalLoadNum - this.urls.length) / this.totalLoadNum);
this.compileCallback();
}
};
e.prototype.setLoadImageUrls = function(e) {
this.urls = e;
};
e.instance = null;
return e;
}();
n.default = i;
cc._RF.pop();
}, {
"../../../../Framework/Managers/CacheManager": "CacheManager"
} ],
LoginMediator: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "48b02j8J5FNVZOgzsfOoC4R", "LoginMediator");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.LoginMediator = void 0;
var i = e("../../../../Framework/Core/Application"), r = e("../../../../Framework/Core/FMediator"), s = e("../../../../Framework/Enums/GameLayer"), a = e("../../Common/ModuleNames"), c = e("../../Modules/LoginModule/LoginModule"), l = function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.initDatas = function() {
e.prototype.initDatas.call(this);
i.Application.SetButtonSound();
i.Application.AddFont();
console.log("LoginMediator");
};
t.prototype.initModules = function() {
e.prototype.initModules.call(this);
this.addModule(a.ModuleNames.LoginModule, c.LoginModule);
};
t.prototype.showModules = function() {
e.prototype.showModules.call(this);
this.showModule(a.ModuleNames.LoginModule, s.GameLayer.Content);
};
t.prototype.addEvents = function() {
e.prototype.addEvents.call(this);
};
t.prototype.dispose = function() {
e.prototype.dispose.call(this);
};
return t;
}(r.FMediator);
n.LoginMediator = l;
cc._RF.pop();
}, {
"../../../../Framework/Core/Application": "Application",
"../../../../Framework/Core/FMediator": "FMediator",
"../../../../Framework/Enums/GameLayer": "GameLayer",
"../../Common/ModuleNames": "ModuleNames",
"../../Modules/LoginModule/LoginModule": "LoginModule"
} ],
LoginModule: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "80defoj6mpE2LGUEO2f2Ako", "LoginModule");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.LoginModule = void 0;
var i = e("../../../../Framework/Core/FModule"), r = e("../BookShelf/BookShelfManager"), s = e("./LoginBinder"), a = e("./LoginConst"), c = e("./LoginLoad"), l = function(e) {
o(t, e);
function t() {
var t = e.call(this) || this;
t.isNeedPreload = !1;
t.isReleaseAsset = !1;
t.delayReleaseAssetTime = 0;
return t;
}
Object.defineProperty(t.prototype, "assets", {
get: function() {
return [ "LoginModule/LoginBinder", "LoginModule/LoginABinder" ];
},
enumerable: !1,
configurable: !0
});
t.prototype.createViews = function() {
e.prototype.createViews.call(this);
r.BookShelfManager.initConfig();
this.binder = new s.default();
};
t.prototype.initViews = function() {
var t = this;
e.prototype.initViews.call(this);
this.binder.setCurStatus(a.Status.check);
this.binder.setLoadProgress(0);
setTimeout(function() {
t.binder.setCurStatus(a.Status.loading);
c.default.getInstance().setLoadImageUrls(a.LoginString.urls);
c.default.getInstance().startLoad(function(e) {
t.binder.setLoadProgress(e);
}, function() {
cc.director.loadScene("MainScene");
});
}, 2e3);
};
t.prototype.addEvents = function() {
e.prototype.addEvents.call(this);
};
t.prototype.hide = function(t) {
e.prototype.hide.call(this, t);
};
t.ClassName = "LoginModule";
return t;
}(i.FModule);
n.LoginModule = l;
cc._RF.pop();
}, {
"../../../../Framework/Core/FModule": "FModule",
"../BookShelf/BookShelfManager": "BookShelfManager",
"./LoginBinder": "LoginBinder",
"./LoginConst": "LoginConst",
"./LoginLoad": "LoginLoad"
} ],
LoginScene: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "10b2aBc+6FGkJOsnFrsk4Fr", "LoginScene");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../../Framework/Core/Application"), s = e("../../../../Framework/Core/FScene"), a = e("../../Common/ApplicationContext"), c = e("./LoginMediator"), l = cc._decorator, u = l.ccclass, p = (l.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
cc.debug.setDisplayStats(!1);
this.mediator = new c.LoginMediator();
r.Application.Bootstrap(a.ApplicationContext, cc.v2(1080, 1920));
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
t.prototype.onDestroy = function() {
e.prototype.onDestroy.call(this);
};
return t = i([ u ], t);
}(s.FScene));
n.default = p;
cc._RF.pop();
}, {
"../../../../Framework/Core/Application": "Application",
"../../../../Framework/Core/FScene": "FScene",
"../../Common/ApplicationContext": "ApplicationContext",
"./LoginMediator": "LoginMediator"
} ],
LumosEffect: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c013foSqdFAFrG72jjLpZmw", "LumosEffect");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Managers/EventManager"), s = cc._decorator, a = s.ccclass, c = s.property, l = s.menu, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.attributeName = "opacity";
t.startValue = 0;
t.endValue = 0;
t.durtion = 0;
t.isLoop = !0;
t.isYoYo = !0;
t.isAwakeStart = !0;
return t;
}
t.prototype.startEffect = function() {
if ("" != this.attributeName && null != this.attributeName) {
var e = JSON.parse('{"' + this.attributeName + '":' + this.startValue + "}"), t = JSON.parse('{"' + this.attributeName + '":' + this.endValue + "}");
this.node.stopAllActions();
for (var n in e) this.node[n] = e[n];
this.isLoop && (this.isYoYo ? this.tween = cc.tween(this.node).to(this.durtion, t).to(this.durtion, e).union().repeatForever().start() : this.tween = cc.tween(this.node).to(this.durtion, t).union().reverseTime().repeatForever().start());
}
};
t.prototype.onEnable = function() {
this.isAwakeStart && this.startEffect();
};
t.prototype.onDisable = function() {
r.EventManager.removeEvent(this);
this.node.stopAllActions();
};
t.ClassName = "LumosEffect";
i([ c({
displayName: "特效属性"
}) ], t.prototype, "attributeName", void 0);
i([ c({
displayName: "开始值"
}) ], t.prototype, "startValue", void 0);
i([ c({
displayName: "结束值"
}) ], t.prototype, "endValue", void 0);
i([ c({
displayName: "持续时间"
}) ], t.prototype, "durtion", void 0);
i([ c({
displayName: "重复"
}) ], t.prototype, "isLoop", void 0);
i([ c({
displayName: "来回缓动",
visible: function() {
return this.isLoop;
}
}) ], t.prototype, "isYoYo", void 0);
i([ c({
displayName: "自动运行"
}) ], t.prototype, "isAwakeStart", void 0);
return t = i([ a, l("游戏特效/呼吸灯组件") ], t);
}(cc.Component);
n.default = u;
cc._RF.pop();
}, {
"../Managers/EventManager": "EventManager"
} ],
MainBinder: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5a1f8Rn4bJKyYkacqlY5a21", "MainBinder");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../../Framework/Core/FBinder"), s = e("../../../../Framework/Events/ModuleEvent"), a = e("../../../../Framework/Managers/EventManager"), c = e("../../../../Framework/Timers/JTimer"), l = e("../../../../Framework/Utility/dx/getNodeChildByName"), u = e("../../../../Framework/Utility/StringUtility"), p = e("../../Common/ModuleNames"), h = cc._decorator, d = h.ccclass, f = (h.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.timer = null;
t.countDownCount = 3;
return t;
}
t.prototype.initViews = function() {
e.prototype.initViews.call(this);
console.log("MainBinder initViews");
this.bg = l.getNodeChildByName(this.asset, "Bg");
this.icon = l.getNodeChildByName(this.asset, "Icon");
this.label = l.getNodeChildByName(this.asset, "Label", cc.Label);
this.closeBtn = l.getNodeChildByName(this.asset, "CloseBtn");
};
t.prototype.initShow = function() {
this.label.string = "文本测试";
this.timer = this.addObject(c.JTimer.GetTimer(1e3));
this.timer.addTimerCallback(this, this.onTimeTick);
this.timer.start();
this.addEvents();
};
t.prototype.addEvents = function() {
this.closeBtn.on(cc.Node.EventType.TOUCH_START, this.closeBtnClick, this);
};
t.prototype.closeBtnClick = function() {
a.EventManager.dispatchEvent(new s.ModuleEvent(s.ModuleEvent.HIDE_MODULE, p.ModuleNames.MainModule));
cc.director.loadScene("LoginScene");
};
t.prototype.onTimeTick = function() {
this.countDownCount -= 1;
if (0 == this.countDownCount) {
this.countDownCount = 0;
this.stopTimer();
this.icon.active = !0;
} else this.label.string = "定时器倒计时 " + u.StringUtility.toHHmmss(this.countDownCount);
};
t.prototype.stopTimer = function() {
this.timer && this.timer.reset();
};
return t = i([ d ], t);
}(r.FBinder));
n.default = f;
cc._RF.pop();
}, {
"../../../../Framework/Core/FBinder": "FBinder",
"../../../../Framework/Events/ModuleEvent": "ModuleEvent",
"../../../../Framework/Managers/EventManager": "EventManager",
"../../../../Framework/Timers/JTimer": "JTimer",
"../../../../Framework/Utility/StringUtility": "StringUtility",
"../../../../Framework/Utility/dx/getNodeChildByName": "getNodeChildByName",
"../../Common/ModuleNames": "ModuleNames"
} ],
MainMediator: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "98038XO4+9CjojPW0uQ7nRP", "MainMediator");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.MainMediator = void 0;
var i = e("../../../../Framework/Core/FMediator"), r = e("../../../../Framework/Enums/GameLayer"), s = e("../../../../Framework/Utility/dx/addEvent"), a = e("../../Common/GameEvent"), c = e("../../Common/ModuleNames"), l = e("../../Modules/BookCover/BookCoverModule"), u = e("../../Modules/BookShelf/BookShelfModule"), p = e("../../Modules/MainModule/MainModule"), h = function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.initDatas = function() {
e.prototype.initDatas.call(this);
};
t.prototype.startMediator = function() {
e.prototype.startMediator.call(this);
};
t.prototype.initModules = function() {
e.prototype.initModules.call(this);
this.addModule(c.ModuleNames.MainModule, p.MainModule, a.GameEvent.GameStart);
this.addModule(c.ModuleNames.BookShelfModule, u.BookShelfModule);
this.addModule(c.ModuleNames.BookCoverModule, l.BookCoverModule);
};
t.prototype.showModules = function() {
e.prototype.showModules.call(this);
this.showModule(c.ModuleNames.MainModule, r.GameLayer.Content);
this.showModule(c.ModuleNames.BookShelfModule, r.GameLayer.UI);
};
t.prototype.addEvents = function() {
e.prototype.addEvents.call(this);
s.addEvent(this, a.GameEvent.OpenBookCover, this.openBookCover);
};
t.prototype.openBookCover = function(e) {
this.showModule(c.ModuleNames.BookCoverModule, r.GameLayer.Popup, e.data);
};
t.prototype.dispose = function() {
e.prototype.dispose.call(this);
};
return t;
}(i.FMediator);
n.MainMediator = h;
cc._RF.pop();
}, {
"../../../../Framework/Core/FMediator": "FMediator",
"../../../../Framework/Enums/GameLayer": "GameLayer",
"../../../../Framework/Utility/dx/addEvent": "addEvent",
"../../Common/GameEvent": "GameEvent",
"../../Common/ModuleNames": "ModuleNames",
"../../Modules/BookCover/BookCoverModule": "BookCoverModule",
"../../Modules/BookShelf/BookShelfModule": "BookShelfModule",
"../../Modules/MainModule/MainModule": "MainModule"
} ],
MainModule: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "60d47ooptpPebavIXy0CMBq", "MainModule");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.MainModule = void 0;
var i = e("../../../../Framework/Core/FModule"), r = e("./MainBinder"), s = function(e) {
o(t, e);
function t() {
var t = e.call(this) || this;
t.isNeedPreload = !1;
t.isReleaseAsset = !1;
t.delayReleaseAssetTime = 0;
return t;
}
Object.defineProperty(t.prototype, "assets", {
get: function() {
return [ "MainModule/MainBinder", "BookShelf/BookShelfItem" ];
},
enumerable: !1,
configurable: !0
});
t.prototype.createViews = function() {
e.prototype.createViews.call(this);
this.binder = new r.default();
};
t.prototype.showViews = function() {
e.prototype.showViews.call(this);
this.binder.initShow();
};
t.prototype.hideViews = function() {
e.prototype.hideViews.call(this);
};
t.ClassName = "MainModule";
return t;
}(i.FModule);
n.MainModule = s;
cc._RF.pop();
}, {
"../../../../Framework/Core/FModule": "FModule",
"./MainBinder": "MainBinder"
} ],
MainScene: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "51267hdJ51Mk5hIhwucyGOu", "MainScene");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../../Framework/Core/FScene"), s = e("./MainMediator"), a = cc._decorator, c = a.ccclass, l = (a.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
this.mediator = new s.MainMediator();
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
t.prototype.onDestroy = function() {
e.prototype.onDestroy.call(this);
};
return t = i([ c ], t);
}(r.FScene));
n.default = l;
cc._RF.pop();
}, {
"../../../../Framework/Core/FScene": "FScene",
"./MainMediator": "MainMediator"
} ],
ModuleEvent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6f1ddHXAlRLNL4del3XpKe6", "ModuleEvent");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ModuleEvent = void 0;
var i = e("./FEvent"), r = e("../Enums/GameLayer"), s = function(e) {
o(t, e);
function t(t, n, o, i, s) {
var a = e.call(this, t, s) || this;
a._moduleName = null;
a._gameLayer = null;
a._instanceName = null;
a._moduleName = n;
a._gameLayer = i;
a._instanceName = o;
null == a._gameLayer && (a._gameLayer = r.GameLayer.UI);
return a;
}
Object.defineProperty(t.prototype, "instanceName", {
get: function() {
return this._instanceName;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(t.prototype, "moduleName", {
get: function() {
return this._moduleName;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(t.prototype, "gameLayer", {
get: function() {
return this._gameLayer;
},
enumerable: !1,
configurable: !0
});
t.ClassName = "ModuleEvent";
t.SHOW_MODULE = "ShowModule";
t.HIDE_MODULE = "HideModule";
t.DISPOSE_MODULE = "DisposeModule";
t.PLAY_DISPOSE_ANIMATION = "PlayDisposeAnimation";
t.LOAD_MODULE_ASSET_PROGRESS = "LoadModuleAssetProgress";
t.LOAD_MODULE_ASSET_COMPLETE = "LoadModuleAssetComplete";
t.EXCUTE_MODULE_FUNCTION = "ExcuteModuleFunction";
t.ON_DISPOSE_MODULE_OBJECT = "OnDisposeModuleObject";
return t;
}(i.FEvent);
n.ModuleEvent = s;
cc._RF.pop();
}, {
"../Enums/GameLayer": "GameLayer",
"./FEvent": "FEvent"
} ],
ModuleManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b23d1FMNA1Dj65WJNvNr7DD", "ModuleManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ModuleManager = void 0;
var o = e("../Utility/dx/trace"), i = e("../Utility/dx/dispatchFEventWith"), r = e("../Events/ModuleEvent"), s = function() {
function e() {}
e.AddModuleClass = function(e, t, n) {
n || void 0 == this.domains[e] ? this.domains[e] = t : o.trace("重复设置名称为 ", e, " 的模块！！！");
};
e.RemoveModuleClass = function(e) {
this.domains[e] && delete this.domains[e];
};
e.HasModule = function(e, t) {
var n = this.ConvetName(e, t);
return null != this.modules[n];
};
e.AddModule = function(e, t, n) {
var i = this.ConvetName(t, n);
void 0 == this.modules[i] ? this.modules[i] = e : o.trace("[ModuleManager]", t, " 中实例中已经存在！！！");
};
e.GetModule = function(e, t, n) {
void 0 === n && (n = !0);
var o = this.ConvetName(e, t);
if (n && this.modules[o] && this.modules[o].isInitialize && !this.modules[o].isValid) {
this.modules[o].dispose();
delete this.modules[o];
}
if (null == this.modules[o]) {
var i = this.domains[e];
null != i && (this.modules[o] = new i());
}
return this.modules[o];
};
e.DisposeModule = function(e, t) {
var n = this.ConvetName(e, t);
if (null != this.modules[n]) {
i.dispatchFEventWith(r.ModuleEvent.ON_DISPOSE_MODULE_OBJECT, this.modules[n]);
this.modules[n].dispose();
delete this.modules[n];
}
};
e.ConvetName = function(e, t) {
return e + "_" + (t || e);
};
e.ApplyModuleFun = function(e, t, n, o) {
if (this.HasModule(e)) {
this.GetModule(e, null, !1).applyModuleFun(t, n, o);
}
};
e.Print = function() {
o.trace("-----------------Start Modules----------------------");
var e = 0;
for (var t in this.modules) {
o.trace(t, "===>", this.modules[t]);
e++;
}
o.trace("-----------------Total Module:" + e + "----------------------");
};
e.domains = {};
e.modules = {};
return e;
}();
n.ModuleManager = s;
cc._RF.pop();
}, {
"../Events/ModuleEvent": "ModuleEvent",
"../Utility/dx/dispatchFEventWith": "dispatchFEventWith",
"../Utility/dx/trace": "trace"
} ],
ModuleNames: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "cb739P2eXtOh4buVFYBjPa2", "ModuleNames");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ModuleNames = void 0;
var o = function() {
function e() {}
e.ClassName = "ModuleNames";
e.Preload = "PreloadModule";
e.Mask = "MaskModule";
e.Popup = "PopupModule";
e.LoginModule = "LoginModule";
e.MainModule = "MainModule";
e.BookShelfModule = "BookShelfModule";
e.BookCoverModule = "BookCoverModule";
return e;
}();
n.ModuleNames = o;
cc._RF.pop();
}, {} ],
ObjectUtility: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b6fb3lxx7tEl5hjY8Bpuoa3", "ObjectUtility");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ObjectUtility = void 0;
var o = e("./dx/getQualifiedClassName"), i = e("../Core/FObject"), r = function() {
function e() {}
e.prototype.ObjectUtility = function() {};
e.GetObjectClassName = function(e) {
var t = o.getQualifiedClassName(e);
return t.substring(t.indexOf("::"));
};
e.SetProperty = function(e, t) {
for (var n in t) e[n] = t[n];
};
e.Analysis = function(e, t, n, o, i, r) {
if (null != n) for (var s in n) t.hasOwnProperty(s) ? 0 == r.length || -1 == r.indexOf(s) ? t[s] != n[s] && (t[s] = n[s]) : null != o && o.call(e, t, n, s) : null != i && i.call(e, t, n, s);
};
e.CloneObject = function(e) {};
e.ToArray = function(e) {
for (var t = [], n = 0; n < e.length; n++) t[n] = e[n];
return t;
};
e.TransformObjectVector = function(e, t) {
if (e) {
var n = [];
if (e.hasOwnProperty("length")) for (var o = 0; o < e.length; o++) if (t == String || t == Number || t == Boolean) n.push(e[o]); else {
var r = new t();
r instanceof i.FObject ? r.update(e[o]) : this.Analysis(this, r, e[o], this.CustomSetProperty, this.CustomSetProperty, []);
n.push(r);
} else for (var s in e) n[s] = e[s];
return n;
}
return [];
};
e.CustomSetProperty = function(e, t, n) {};
return e;
}();
n.ObjectUtility = r;
cc._RF.pop();
}, {
"../Core/FObject": "FObject",
"./dx/getQualifiedClassName": "getQualifiedClassName"
} ],
PacketBuffer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "06ed3YrZYhMZ7d/GCIE12kk", "PacketBuffer");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.PacketBuffer = void 0;
var o = function() {
function e() {
this.bytes = [];
}
e.prototype.push = function(e) {
for (var t = 0; t < e.byteLength; t++) this.bytes.push(e[t]);
};
e.prototype.clear = function() {
this.bytes.length = 0;
};
Object.defineProperty(e.prototype, "packetBytes", {
get: function() {
return this.bytes;
},
set: function(e) {
this.bytes = e;
},
enumerable: !1,
configurable: !0
});
e.prototype.dispose = function() {
this.clear();
};
e.ClassName = "PacketBuffer";
return e;
}();
n.PacketBuffer = o;
cc._RF.pop();
}, {} ],
PointUtility: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a6a533il7NC9KbFUaUQp4R5", "PointUtility");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.PointUtility = void 0;
var o = function() {
function e() {}
e.Length = function(e) {
return Math.sqrt(e.x * e.x + e.y * e.y);
};
e.Distance = function(e, t) {
return Math.sqrt((e.x - t.x) * (e.x - t.x) + (e.y - t.y) * (e.y - t.y));
};
e.InterPolate = function(e, t, n) {
var o = 1 - n;
return cc.v2(e.x * n + t.x * o, e.y * n + t.y * o);
};
e.ToFixed = function(e, t) {
if (!e) return null;
e.x = parseFloat(e.x.toFixed(t));
e.y = parseFloat(e.y.toFixed(t));
e.hasOwnProperty("z") && (e.z = parseFloat(e.z.toFixed(t)));
return e;
};
e.ReversePoint = function(e) {
var t = e.y;
e.y = e.x;
e.x = t;
return e;
};
e.LengthenPoint = function(e, t, n, o) {
void 0 === o && (o = cc.v2(1, 1));
t = cc.misc.degreesToRadians(t);
return cc.v2(Math.cos(t) * o.x, Math.sin(t) * o.y).mul(n).addSelf(e);
};
e.Object2Point = function(e, t) {
if (!t) return null;
e.x = t.x;
e.y = t.y;
e.hasOwnProperty("z") && (e.z = t.z);
return e;
};
e.getInsertPointBetweenCircleAndLine = function(e, t, n, o, i, r, s, a) {
var c = 0, l = this.binaryEquationGetKB(e, t, n, o), u = l[0], p = l[1], h = 1 + u * u, d = 2 * u * (p - r) - 2 * i, f = i * i + (p - r) * (p - r) - s * s, g = [];
this.quadEquationGetX(h, d, f).forEach(function(e) {
var t = u * e + p;
g.push(cc.v2(e, t));
});
if (0 == g.length) return c;
if (1 == g.length) {
var y = g[0].sub(a);
return Math.sqrt(y.x * y.x + y.y * y.y);
}
var m = g[0].sub(a), v = Math.sqrt(m.x * m.x + m.y * m.y), _ = g[1].sub(a), M = Math.sqrt(_.x * _.x + _.y * _.y);
return c = v < M ? v : M;
};
e.binaryEquationGetKB = function(e, t, n, o) {
return [ (t - o) / (e - n), (e * o - n * t) / (e - n) ];
};
e.quadEquationGetX = function(e, t, n) {
var o = [], i = Math.pow(t, 2) - 4 * e * n;
if (i > 0) {
o.push((-t + Math.sqrt(i)) / (2 * e));
o.push((-t - Math.sqrt(i)) / (2 * e));
} else 0 == i && o.push(-t / (2 * e));
return o;
};
e.DEG_TO_RAD = Math.PI / 180;
return e;
}();
n.PointUtility = o;
cc._RF.pop();
}, {} ],
PopupAnimType: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "623afPl8QVNMo4jeD19Dr1r", "PopupAnimType");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.PopupAnimType = void 0;
(function(e) {
e[e.SCALE = 0] = "SCALE";
e[e.UP = 1] = "UP";
e[e.DOWN = 2] = "DOWN";
e[e.LEFT = 3] = "LEFT";
e[e.RIGHT = 4] = "RIGHT";
})(n.PopupAnimType || (n.PopupAnimType = {}));
cc._RF.pop();
}, {} ],
ProxyManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0c0c2d4Z21PWY2Ttiu/jkGF", "ProxyManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ProxyManager = void 0;
var o = e("../Utility/dx/getQualifiedClassName"), i = function() {
function e() {}
e.AddProxy = function(e, t) {
null == t && (t = o.getQualifiedClassName(e));
this.proxys[t] = e;
};
e.RemoveProxy = function(e) {
var t = "";
t = "string" == typeof e ? e : o.getQualifiedClassName(e);
delete this.proxys[t];
};
e.GetProxy = function(e) {
return this.proxys[e];
};
e.ProxyDispose = function(e) {
var t = this.GetProxy(e);
null != t && t.dispose();
};
e.proxys = {};
return e;
}();
n.ProxyManager = i;
cc._RF.pop();
}, {
"../Utility/dx/getQualifiedClassName": "getQualifiedClassName"
} ],
ReceiveHandler: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5c72ci7QJVMnaGz+Idxkkj1", "ReceiveHandler");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ReceiveHandler = void 0;
var o = e("../../Utility/dx/trace"), i = e("../../Utility/ObjectUtility"), r = function() {
function e() {}
e.prototype.onDeal = function(e, t) {};
e.prototype.onDealError = function(e, t, n) {
var r = i.ObjectUtility.GetObjectClassName(this);
o.trace(r, "   ========>   处理消息失败！！！");
};
e.prototype.dispose = function() {};
e.ClassName = "ReceiveHandler";
return e;
}();
n.ReceiveHandler = r;
cc._RF.pop();
}, {
"../../Utility/ObjectUtility": "ObjectUtility",
"../../Utility/dx/trace": "trace"
} ],
ResizeEvent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "514dfx9Oy9Lb4yr2UB2cZvu", "ResizeEvent");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ResizeEvent = void 0;
var i = function(e) {
o(t, e);
function t(t, n, o, i, r) {
var s = e.call(this, t, i) || this;
s.rotation = null;
s.oldSize = n;
s.newSize = o;
s.rotation = r;
return s;
}
t.ClassName = "ResizeEvent";
t.ON_WINDOW_RESIZE = "OnWindowResize";
return t;
}(e("./FEvent").FEvent);
n.ResizeEvent = i;
cc._RF.pop();
}, {
"./FEvent": "FEvent"
} ],
ResourceManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "dfa23SDHERM+YPr8is4jeu/", "ResourceManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ResourceManager = void 0;
var o = e("../Core/Assets"), i = e("../Enums/LoaderType"), r = e("../Loaders/DragonBoneLoader"), s = e("../Loaders/Loader"), a = e("../Loaders/SceneLoader"), c = e("../Utility/AssetUtility"), l = e("../Utility/dx/cancelDelayReleaseRes"), u = e("./CacheManager"), p = function() {
function e() {}
e.LoadSpine = function(e, t, n) {
this.isValidAssetPath(e, n);
};
e.LoadDragonBone = function(e, t, n, r, s, a, c) {
if (this.isValidAssetPath(e, c)) {
var l = o.Assets.GetDragonBone(e);
this.addLoader(l, i.LoaderType.DRAGON_BONE, {
armatureDisplay: t,
armatureName: n,
animationName: r,
onComplete: a,
onError: c,
playTimes: s
});
}
};
e.LoadRawData = function(e, t, n) {
this.isValidAssetPath(e, n) && this.addLoader(e, i.LoaderType.RAW, {
onComplete: t,
onError: n
});
};
e.LoadText = function(e, t, n) {
this.isValidAssetPath(e, n) && this.addLoader(e, i.LoaderType.TEXT, {
onComplete: t,
onError: n
});
};
e.LoadAudio = function(e, t, n) {
if (this.isValidAssetPath(e, n)) {
var o = e;
this.addLoader(o, i.LoaderType.AUDIO, {
onComplete: t,
onError: n
}, cc.AudioClip);
}
};
e.LoadPrefab = function(e, t, n) {
if (this.isValidAssetPath(e, n)) {
var r = o.Assets.GetPrefab(e);
this.addLoader(r, i.LoaderType.PREFAB, {
onComplete: t,
onError: n
});
}
};
e.LoadSpriteFrame = function(e, t, n, r) {
if (this.isValidAssetPath(e, r)) {
e = o.Assets.GetTexture(e);
var s = c.AssetUtility.SplitAtlas(e), a = s.length > 1;
0;
this.addLoader(s[0], a ? i.LoaderType.SPRITE_ATLAS : i.LoaderType.SPRITE, {
sprite: t,
assetName: s[1],
onComplete: n,
onError: r
}, a ? cc.SpriteAtlas : cc.SpriteFrame);
}
};
e.LoadButtonSpriteFrame = function(e, t, n, r, s) {
if (this.isValidAssetPath(e, s)) {
e = o.Assets.GetTexture(e);
var a = c.AssetUtility.SplitAtlas(e), l = a.length > 1;
0;
this.addLoader(a[0], l ? i.LoaderType.SPRITE_ATLAS : i.LoaderType.SPRITE, {
button: t,
frameName: n,
assetName: a[1],
onComplete: r,
onError: s
}, l ? cc.SpriteAtlas : cc.SpriteFrame);
}
};
e.LoadScene = function(e, t, n, o) {
this.addLoader(e, i.LoaderType.SCENE, {
onComplete: t,
onProgress: n,
onError: o
});
};
e.LoadImage = function(e, t, n, o) {
this.addLoader(e, i.LoaderType.IMAGE, {
sprite: t,
onComplete: n,
onError: o
}, cc.SpriteFrame);
};
e.LoadFont = function(e, t, n, r) {
var s = o.Assets.GetFonts(e);
this.addLoader(s, i.LoaderType.FONT, {
lable: t,
onComplete: n,
onError: r
}, cc.Font);
};
e.isValidAssetPath = function(e, t) {
if ("" == e || "null" == e || -1 != e.lastIndexOf("null")) {
null != t && t();
return !1;
}
return !0;
};
e.addLoader = function(e, t, n, o) {
if (null != e) {
var c = e;
t == i.LoaderType.DRAGON_BONE && (c = e.name);
l.cancelDelayReleaseRes(c);
if (u.CacheManager.HasCache(c)) this.excuteAssetCallback(c, t, n); else if (void 0 == this.loadCallbacks[c]) {
var p = null;
p = t == i.LoaderType.SCENE ? a.SceneLoader.Get() : t == i.LoaderType.DRAGON_BONE ? r.DragonBoneLoader.Get() : s.Loader.Get();
this.loadCallbacks[c] = [ n ];
p.addCallback(this, this.onLoadComplete, this.onLoadProgress, this.onLoadError);
p.load(e, o, t);
} else this.loadCallbacks[c].push(n);
}
};
e.onLoadError = function(e) {
var t = this.loadCallbacks[e.resName];
delete this.loadCallbacks[e.resName];
if (null != t) {
for (var n = 0; n < t.length; n++) if (null != t[n]) {
var o = t[n].onError;
null != o && o.excute();
}
t && (t.length = 0);
}
};
e.onLoadProgress = function(e, t) {
if (t instanceof a.SceneLoader) {
var n = t.getSceneName(0), o = this.loadCallbacks[n];
if (null == o) return;
for (var i = 0; i < o.length; i++) if (null != o[i]) {
var r = o[i].onProgress;
null != r && r.excute([ e ]);
}
}
};
e.onLoadComplete = function(e) {
if (e instanceof s.Loader) for (var t = 0; t < e.length; t++) {
var n = e.getURL(t), o = e.getLoaderType(t);
if (null != (c = this.loadCallbacks[n])) {
for (var r = 0; r < c.length; r++) this.excuteAssetCallback(n, o, c[r]);
delete this.loadCallbacks[n];
}
} else if (e instanceof a.SceneLoader) {
var c;
n = e.getSceneName(0);
if (null == (c = this.loadCallbacks[n])) return;
for (r = 0; r < c.length; r++) this.excuteAssetCallback(n, i.LoaderType.SCENE, c[r]);
delete this.loadCallbacks[n];
}
};
e.excuteAssetCallback = function(e, t, n) {
if (t == i.LoaderType.SPRITE_ATLAS) {
var o = u.CacheManager.GetCache(e);
if (!(o instanceof cc.SpriteAtlas)) {
console.log("无法获取图集资源---\x3e", e, o);
return;
}
var r = o.getSpriteFrame(n.assetName);
null != n.sprite && n.sprite.node && n.sprite.node.isValid && (n.sprite.spriteFrame = r);
null != n.button && n.button.node && n.button.node.isValid && (n.button[n.frameName] = r);
} else if (t == i.LoaderType.SPRITE || t == i.LoaderType.IMAGE) {
var s = u.CacheManager.GetCache(e);
if (s instanceof cc.Texture2D) {
s = new cc.SpriteFrame(s);
u.CacheManager.Cache(e, s);
}
null != n.sprite && n.sprite.node && n.sprite.node.isValid && (n.sprite.spriteFrame = s);
null != n.button && n.button.node && n.button.node.isValid && (n.button[n.frameName] = s);
} else if (t == i.LoaderType.FONT) null != n.lable && n.lable.node && n.lable.node.isValid && (n.lable.font = u.CacheManager.GetCache(e)); else if (t == i.LoaderType.DRAGON_BONE) {
var a = u.CacheManager.GetCache(e);
if (null != n.armatureDisplay && n.armatureDisplay.node && n.armatureDisplay.node.isValid) {
n.armatureDisplay.dragonAsset = null;
n.armatureDisplay.dragonAtlasAsset = null;
n.armatureDisplay.armatureName = null;
n.armatureDisplay.animationName = null;
n.armatureDisplay.dragonAsset = a.dragonAsset;
n.armatureDisplay.dragonAtlasAsset = a.dragonAtlasAsset;
if (null == n.armatureName) {
var c = n.armatureDisplay.getArmatureNames();
n.armatureName = c[0];
if (null == n.animationName) for (var l = 0; l < c.length; l++) {
if (0 != (p = n.armatureDisplay.getAnimationNames(c[l])).length) {
n.armatureName = c[l];
n.animationName = p[0];
break;
}
}
} else if (null == n.animationName) {
var p;
0 != (p = n.armatureDisplay.getAnimationNames(n.armatureName)).length && (n.animationName = p[0]);
}
null != n.armatureName && (n.armatureDisplay.armatureName = n.armatureName);
null != n.animationName && n.armatureDisplay.playAnimation(n.animationName, n.playTimes ? n.playTimes : n.armatureDisplay.playTimes);
}
}
var h = n.onComplete;
if (null != h) {
null == n.args && (n.args = []);
n.args.unshift(e);
0 == h.length ? h.excute() : h.excute(n.args);
}
};
e.InstantiatePrefab = function(e) {
var t = o.Assets.GetPrefab(e), n = u.CacheManager.GetCache(t);
return null != n ? cc.instantiate(n) : null;
};
e.loadCallbacks = {};
return e;
}();
n.ResourceManager = p;
cc._RF.pop();
}, {
"../Core/Assets": "Assets",
"../Enums/LoaderType": "LoaderType",
"../Loaders/DragonBoneLoader": "DragonBoneLoader",
"../Loaders/Loader": "Loader",
"../Loaders/SceneLoader": "SceneLoader",
"../Utility/AssetUtility": "AssetUtility",
"../Utility/dx/cancelDelayReleaseRes": "cancelDelayReleaseRes",
"./CacheManager": "CacheManager"
} ],
ResourceReleaseManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6ed4dzBPQtF9YUqlkMjmLEN", "ResourceReleaseManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ResourceReleaseManager = void 0;
var o = e("./CacheManager"), i = e("../Utility/dx/getTime"), r = e("../Timers/JFramer"), s = function() {
function e() {}
e.ClearReleaseDelay = function(e) {
if (null != this.delayRes[e]) {
delete this.delayRes[e];
if (!this.timer || !this.timer.running) return;
this.CheckNeedStopTimer();
}
};
e.ReleaseAssets = function(e, t) {
void 0 === t && (t = 0);
for (var n = e.assets, o = 0; o < n.length; o++) this.ReleaseAsset(n[o], t);
};
e.ReleaseAsset = function(e, t) {
void 0 === t && (t = 0);
t <= 0 ? this.Release(e) : this.AddReleaseDelay(e, t);
};
e.AddReleaseDelay = function(e, t) {
this.delayRes[e] = t;
if (null == this.timer) {
this.timer = new r.JFramer();
this.timer.name = "ResourceReleaseManager";
this.timer.addFramerCallback(this, this.OnReleaseResTick);
}
if (!this.timer.running) {
this.lastUpdateTime = i.getTime();
this.timer.start();
}
};
e.CheckNeedStopTimer = function() {
0 == Object.keys(this.delayRes).length && this.timer.stop();
};
e.OnReleaseResTick = function() {
var e = i.getTime(), t = e - this.lastUpdateTime, n = !1;
for (var o in this.delayRes) {
this.delayRes[o] -= t;
if (this.delayRes[o] <= 0) {
n = !0;
this.Release(o);
delete this.delayRes[o];
}
}
this.lastUpdateTime = e;
n && this.CheckNeedStopTimer();
};
e.Release = function(e) {
cc.assetManager.resources.release(e);
o.CacheManager.RemoveCache(e);
};
e.delayRes = {};
e.timer = null;
e.lastUpdateTime = 0;
return e;
}();
n.ResourceReleaseManager = s;
cc._RF.pop();
}, {
"../Timers/JFramer": "JFramer",
"../Utility/dx/getTime": "getTime",
"./CacheManager": "CacheManager"
} ],
SceneEvent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "36c20uprsRG2YCX79z/bVKY", "SceneEvent");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.SceneEvent = void 0;
var i = function(e) {
o(t, e);
function t(t, n, o) {
var i = e.call(this, t, o) || this;
i._sceneName = null;
i._sceneName = n;
return i;
}
Object.defineProperty(t.prototype, "sceneName", {
get: function() {
return this._sceneName;
},
enumerable: !1,
configurable: !0
});
t.ClassName = "SceneEvent";
t.CHANGE_SCENE = "OnChangeScene";
t.SET_CURRENT_SCENE = "OnSetCurrentScene";
t.DESTROY_CURRENT_SCENE = "OnDestroyCurrentScene";
t.LOAD_PROGRESS = "OnSceneLoadProgress";
return t;
}(e("./FEvent").FEvent);
n.SceneEvent = i;
cc._RF.pop();
}, {
"./FEvent": "FEvent"
} ],
SceneLoader: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "abbfbkQlZNGNp63+rYZ0zCa", "SceneLoader");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.SceneLoader = void 0;
var o = e("../Managers/CacheManager"), i = e("../Enums/LoaderType"), r = e("../Managers/StoreManager"), s = function() {
function e() {
this.cacheAsset = !0;
this._callbacks = [];
this._contents = [];
this._index = -1;
this._sceneNames = [];
this.countRatio = 0;
}
Object.defineProperty(e.prototype, "length", {
get: function() {
return 1;
},
enumerable: !1,
configurable: !0
});
e.prototype.getSceneName = function(e) {
return this._sceneNames[e];
};
e.prototype.getLoaderType = function(e) {
return i.LoaderType.SCENE;
};
e.prototype.getContent = function(e) {
return this.getSceneName(e);
};
e.prototype.getAssetType = function(e) {
return null;
};
e.prototype.addCallback = function(e, t, n, o) {
this._callbacks.push({
target: e,
onComplete: t,
onProgress: n,
onError: o
});
};
e.prototype.load = function(e, t, n) {
this._sceneNames.push(e);
this.countRatio = 100 / this._sceneNames.length;
this.loadAsset();
};
e.prototype.loadAsset = function() {
var e = this;
this._index++;
if (this._index >= this._sceneNames.length) setTimeout(function() {
return e.complete();
}, 1); else {
var t = this.getSceneName(this._index);
o.CacheManager.HasCache(t) ? this.onLoadComplete(null, o.CacheManager.GetCache(t)) : cc.director.preloadScene(t, function(t, n, o) {
return e.onLoadProgress(t, n, o);
}, function(n) {
return e.onLoadComplete(n, t);
});
}
};
e.prototype.complete = function() {
this.excuteCallback("onComplete");
this.dispose();
};
e.prototype.onLoadComplete = function(e, t) {
this._contents.push(t);
if (null != e) this.onLoadError(e); else if (this.cacheAsset) {
var n = this._sceneNames[this._index];
o.CacheManager.HasCache(n) || o.CacheManager.Cache(n, t);
}
this.loadAsset();
};
e.prototype.onLoadProgress = function(e, t, n) {
var o = 100;
0 != t && (o = Math.floor(this.countRatio * this._index + e / t * this.countRatio));
this.excuteCallback("onProgress", o);
};
e.prototype.onLoadError = function(e) {
e.loaderType = this.getLoaderType(0);
this.excuteCallback("onError", e);
};
e.prototype.excuteCallback = function(e, t) {
for (var n = 0, o = 0; o < this._callbacks.length; o++) {
var i = this._callbacks[o][e];
if (null != i) {
n++;
0 == i.length ? i.call(this._callbacks[o].target) : 1 == i.length ? null != t ? i.call(this._callbacks[o].target, t) : i.call(this._callbacks[o].target, this) : 2 == i.length && i.call(this._callbacks[o].target, t, this);
}
}
return n;
};
e.prototype.dispose = function() {
this._index = -1;
this._callbacks.length = 0;
this._sceneNames.length = 0;
this._contents.length = 0;
this.cacheAsset = !0;
r.StoreManager.Store(this);
};
e.Get = function() {
return r.StoreManager.New(e);
};
e.ClassName = "SceneLoader";
return e;
}();
n.SceneLoader = s;
cc._RF.pop();
}, {
"../Enums/LoaderType": "LoaderType",
"../Managers/CacheManager": "CacheManager",
"../Managers/StoreManager": "StoreManager"
} ],
SceneOrientationType: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "885acaAFxhJuqP5ih1jY+UX", "SceneOrientationType");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.SceneOrientationType = void 0;
(function(e) {
e[e.PORTRAIT_0 = 0] = "PORTRAIT_0";
e[e.LANDSCAPE_90 = 90] = "LANDSCAPE_90";
e[e.PORTRAIT_180 = 180] = "PORTRAIT_180";
e[e.LANDSCAPE_270 = 270] = "LANDSCAPE_270";
})(n.SceneOrientationType || (n.SceneOrientationType = {}));
cc._RF.pop();
}, {} ],
ScrollEasy: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "45426JJ2tpA07BbY6DyBOx2", "ScrollEasy");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ScrollEasy = void 0;
var o = e("./CNodePool"), i = function() {
function e() {
this.sv = null;
this.cn = null;
this.list = null;
this.topSpring = null;
this.bottomSpring = null;
this.itemTemplate = null;
this.itemPool = null;
this.initItemCb = null;
this.topCb = null;
this.btmCb = null;
this.cbState = !1;
this.maxCount = 0;
this.spacing = 0;
this.cacheData = [];
this.svBox = null;
this.topIndex = 0;
this.bottomIndex = 0;
this.cacheCount = 0;
this.lastContentPosY = 0;
this.initRound = 0;
this.active = !1;
}
e.prototype.BindNode = function(e, t, n, o) {
if (!(e && t && n && o)) return !1;
this.sv = e;
this.cn = this.sv.content;
this.list = t;
this.topSpring = n;
this.bottomSpring = o;
var i = this.list.getComponent(cc.Layout);
i && (this.spacing = i.spacingY);
this.cn.anchorY = .5;
this.list.anchorY = .5;
this.addListen();
this.active = !0;
return !0;
};
e.prototype.BindItem = function(e, t, n) {
if (!e || t !== +t || t <= 0 || !n) return !1;
this.itemTemplate = e;
this.itemPool = new o.CNodePool(this.itemTemplate);
this.maxCount = 2 * t;
this.cacheCount = Math.floor(t / 2);
this.initItemCb = n;
this.svBox = this.getBoxToWorld(this.sv.node);
return !0;
};
e.prototype.BindTopBtmCb = function(e, t) {
e && (this.topCb = e);
t && (this.btmCb = t);
};
e.prototype.BindData = function(e) {
if (!e) return !1;
this.cacheData = e;
this.cbState = !1;
this.initRound++;
this.initRound > 4294967295 && (this.initRound = 0);
return !0;
};
e.prototype.InitSv = function(e) {
var t = this;
void 0 === e && (e = 0);
if (!(e !== +e || e < 0) && this.sv && this.cacheData && this.itemPool && this.list && this.cn && this.topSpring && this.bottomSpring && this.active) {
var n = this.sv.node.getComponent(cc.Widget);
n && n.updateAlignment();
this.itemPool.PutArr(this.list.children);
var o = this.cn.getComponent(cc.Layout), i = this.list.getComponent(cc.Layout);
if (!(this.cacheData.length <= 0)) {
var r = Math.max(0, Math.min(this.cacheData.length - this.maxCount, e)), s = Math.max(0, Math.min(this.cacheData.length - this.maxCount / 2, e));
this.sv.stopAutoScroll();
this.svBox = this.getBoxToWorld(this.sv.node);
var a = Math.min(this.cacheData.length, this.maxCount);
this.topIndex = r;
this.bottomIndex = r + a - 1;
var c = 0, l = this.topIndex, u = function() {
t.topSpring.height = 0;
t.bottomSpring.height = 0;
i.updateLayout();
o.updateLayout();
t.sv.scrollToOffset(cc.v2(0, c));
t.hideOutItem();
}, p = function(e) {
if (e == t.initRound && t.active) {
var n = t.itemPool.Get();
t.setItem(n, t.cacheData[l]);
n.parent || t.list.addChild(n);
l < s && (c += n.height + t.spacing);
l++;
t.topSpring.height += n.height + t.spacing;
l > t.bottomIndex ? u() : p(e);
}
};
p(this.initRound);
}
}
};
e.prototype.UpdateData = function(e, t) {
if (e === +e && t && this.itemPool && this.list && this.svBox && this.cacheData && this.cn && this.topSpring && this.bottomSpring) for (var n = 0; n < t.length; n++) e + n > this.cacheData.length - 1 ? this.cacheData.push(t[n]) : this.cacheData[e + n] = t[n];
};
e.prototype.UpdateSv = function() {
if (this.list && this.cacheData && this.active) for (var e = 0; e < this.list.childrenCount; e++) {
var t = this.list.children[e];
this.setItem(t, this.cacheData[e + this.topIndex]);
}
};
e.prototype.Clear = function() {
this.removeListen();
this.sv = null;
this.cn = null;
this.list = null;
this.topSpring = null;
this.bottomSpring = null;
this.itemTemplate = null;
this.itemPool && this.itemPool.Destroy();
this.spacing = 0;
this.svBox = null;
this.maxCount = 0;
this.cacheData = [];
this.topIndex = 0;
this.bottomIndex = 0;
this.cacheCount = 0;
this.lastContentPosY = 0;
this.active = !1;
};
e.prototype.IsDataEnough = function() {
return this.cacheData.length >= this.maxCount;
};
e.prototype.CanUpdate = function(e) {
return this.IsDataEnough() && this.cacheData.length <= e;
};
e.prototype.addListen = function() {
this.sv && this.sv.node && this.sv.node.on("scrolling", this.onScrolling.bind(this), this);
};
e.prototype.removeListen = function() {
this.sv && this.sv.node && this.sv.node.off("scrolling", this.onScrolling.bind(this), this);
};
e.prototype.setItem = function(e, t) {
this.initItemCb && this.initItemCb(e, t);
};
e.prototype.onScrolling = function() {
if (this.sv && this.cacheData && this.itemPool && this.list && !(this.list.childrenCount <= 0) && this.svBox && this.cn && this.topSpring && this.bottomSpring && this.active) {
var e = !0;
this.lastContentPosY > this.cn.y && (e = !1);
this.lastContentPosY = this.cn.y;
if (!(this.list.childrenCount <= this.cacheCount)) {
var t = Math.floor(this.cacheCount / 2), n = this.list.children[t], o = this.list.children[this.list.childrenCount - t - 1];
if (e) {
if (this.getBoxToWorld(o).intersects(this.svBox)) for (var i = 0; i < t; i++) if (this.bottomIndex < this.cacheData.length - 1) {
this.bottomIndex++;
var r = this.itemPool.Get();
this.setItem(r, this.cacheData[this.bottomIndex]);
this.list.addChild(r);
var s = r.height + this.spacing, a = this.bottomSpring.height;
this.bottomSpring.height = this.bottomIndex == this.cacheData.length - 1 ? 0 : Math.max(0, this.bottomSpring.height - s);
this.topIndex++;
var c = this.list.children[0];
this.itemPool.Put(c);
var l = c.height + this.spacing;
this.topSpring.height += l;
if ((u = s - (a - this.bottomSpring.height)) > 0) this.topSpring.height += u; else if (this.topSpring.height + u > 0) this.topSpring.height += u; else {
this.cn.y += this.topSpring.height + u;
this.topSpring.height = 0;
}
}
} else {
if (this.getBoxToWorld(n).intersects(this.svBox)) for (i = 0; i < t; i++) if (this.topIndex > 0) {
this.topIndex--;
r = this.itemPool.Get();
this.setItem(r, this.cacheData[this.topIndex]);
this.list.insertChild(r, 0);
s = r.height + this.spacing, a = this.topSpring.height;
this.topSpring.height = 0 == this.topIndex ? 0 : Math.max(0, this.topSpring.height - s);
this.bottomIndex--;
c = this.list.children[this.list.children.length - 1];
this.itemPool.Put(c);
var u;
l = c.height + this.spacing;
this.bottomSpring.height += l;
if ((u = s - (a - this.topSpring.height)) > 0) this.bottomSpring.height += u; else if (this.bottomSpring.height + u > 0) this.bottomSpring.height += u; else {
this.cn.y += this.bottomSpring.height + u;
this.bottomSpring.height = 0;
}
}
}
if (!this.cbState) {
this.topCb && 0 == this.topIndex && (this.cbState = this.topCb());
this.btmCb && this.bottomIndex == this.cacheData.length - 1 && (this.cbState = this.btmCb());
}
this.hideOutItem();
}
}
};
e.prototype.hideOutItem = function() {
if (this.list && !(this.list.childrenCount <= 0) && this.svBox && this.active) for (var e = 0; e < this.list.childrenCount; e++) {
var t = this.list.children[e];
t && (this.svBox.intersects(this.getBoxToWorld(t)) ? t.opacity = 255 : t.opacity = 0);
}
};
e.prototype.getBoxToWorld = function(e) {
var t = e.parent.convertToWorldSpaceAR(cc.v2(e.x - e.anchorX * e.width, e.y - e.anchorY * e.height));
return new cc.Rect(t.x, t.y, e.width, e.height);
};
return e;
}();
n.ScrollEasy = i;
cc._RF.pop();
}, {
"./CNodePool": "CNodePool"
} ],
Socket: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "963e0jmxN9BloJohnF0wr0X", "Socket");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.Socket = void 0;
var o = e("../../Utility/dx/trace"), i = function() {
function e() {
this._connected = !1;
this.timeOutID = 0;
this._timeOut = 0;
this.isConnecting = !1;
if (!window.WebSocket) throw Error("WebSocket Error!!!!!!");
}
e.prototype.addCallBacks = function(e, t, n, o, i, r) {
this.onConnect = t;
this.onClose = o;
this.onSocketData = n;
this.onError = i;
this.onTimeOut = r;
this.thisObject = e;
};
e.prototype.connect = function(e, t) {
this.connectByUrl("ws://" + e + ":" + t);
};
e.prototype.connectByUrl = function(e) {
if (null != e && "" != e) {
o.trace("Socket", "===正在连接服务器:" + e);
this.isConnecting = !0;
this.socket = new window.WebSocket(e);
this.socket.binaryType = "arraybuffer";
this.startConnectTimeOut();
this._bindEvent();
}
};
e.prototype._bindEvent = function() {
var e = this;
this.socket.onopen = function() {
return e.onSocketConnected();
};
this.socket.onclose = function(t) {
return e.onSocketClosed(t);
};
this.socket.onerror = function(t) {
return e.onSocketError(t);
};
this.socket.onmessage = function(t) {
return e.onSocketGetData(t.data);
};
};
e.prototype.onSocketGetData = function(e) {
this.onSocketData && this.onSocketData.call(this.thisObject, e);
};
e.prototype.onSocketConnected = function() {
this.stopConnectTimeOut();
this._connected = !0;
this.onConnect && this.onConnect.call(this.thisObject);
};
e.prototype.onSocketClosed = function(e) {
console.log("Socket Closed!!!");
this.stopConnectTimeOut();
this._connected = !1;
this.onClose && this.onClose.call(this.thisObject);
};
e.prototype.onSocketError = function(e) {
this.stopConnectTimeOut();
this._connected = !1;
this.onError && this.onError.call(this.thisObject);
};
e.prototype.send = function(e) {
this._connected && this.socket.readyState == this.socket.OPEN && this.socket.send(e);
};
e.prototype.close = function() {
cc.log("socket close");
this.disconnect();
};
e.prototype.disconnect = function() {
this.stopConnectTimeOut();
this._connected = !1;
this.socket && this.socket.close();
};
e.prototype.onSocketTimeOut = function() {
null != this.onTimeOut && (0 == this.onTimeOut.length ? this.onTimeOut.call(this.thisObject) : 1 == this.onTimeOut.length && this.onTimeOut.call(this.thisObject, this));
this.socket.close();
this.stopConnectTimeOut();
};
e.prototype.startConnectTimeOut = function() {
if (this.isConnecting && this.timeOut > 0 && 0 == this.timeOutID) {
var e = this;
this.timeOutID = setTimeout(function() {
e.onSocketTimeOut();
}, this.timeOut);
}
};
e.prototype.stopConnectTimeOut = function() {
this.isConnecting = !1;
0 != this.timeOutID && clearTimeout(this.timeOutID);
this.timeOutID = 0;
};
Object.defineProperty(e.prototype, "timeOut", {
get: function() {
return this._timeOut;
},
set: function(e) {
this._timeOut = e;
this.startConnectTimeOut();
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "connected", {
get: function() {
return this._connected;
},
enumerable: !1,
configurable: !0
});
e.prototype.dispose = function() {
this.close();
this.socket = null;
this.onConnect = null;
this.onClose = null;
this.onSocketData = null;
this.onError = null;
this.onTimeOut = null;
this.thisObject = null;
};
e.ClassName = "Socket";
return e;
}();
n.Socket = i;
cc._RF.pop();
}, {
"../../Utility/dx/trace": "trace"
} ],
SoundEvent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d672aSFK3ZCG42Y8v3fbRxl", "SoundEvent");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.SoundEvent = void 0;
var i = function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.ClassName = "SoundEvent";
t.PLAY_NUMBER = "OnPlayNumber";
t.PLAY_EFFECT = "OnPlayEffect";
t.PLAY_VOICE = "OnPlayVoice";
t.PLAY_MUSIC = "OnPlayMusic";
return t;
}(e("./FEvent").FEvent);
n.SoundEvent = i;
cc._RF.pop();
}, {
"./FEvent": "FEvent"
} ],
StoreManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b5cc4lnpIRAH4PZr60H6qZh", "StoreManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.StoreManager = void 0;
var o = e("../Core/Assets"), i = e("../Utility/dx/getQualifiedClassName"), r = e("../Utility/dx/trace"), s = e("./CacheManager"), a = function() {
function e() {}
e.Store = function(e, t) {
t || (t = i.getQualifiedClassName(e));
this.PushObject(t, e);
};
e.New = function(e, t) {
t || (t = i.getQualifiedClassName(e));
var n = this.GetObject(t);
null == n && (n = new e());
return n;
};
e.NewPrefabNode = function(e) {
return "string" == typeof e ? s.CacheManager.HasCache(o.Assets.GetPrefab(e)) ? this.NewNode(s.CacheManager.GetCache(o.Assets.GetPrefab(e))) : null : this.NewNode(e);
};
e.NewNode = function(e) {
var t = i.getQualifiedClassName(e);
if (e instanceof cc.Prefab) {
var n = this.GetObject(t + "_" + e.name);
null == n && (n = cc.instantiate(e));
null != n._prefab && (this.prefabPaths[n._prefab.fileId] = t + "_" + e.name);
return n;
}
var o = this.GetObject(t);
if (null == o) {
o = new cc.Node().addComponent(e);
}
return o;
};
e.StoreNode = function(e) {
if (e instanceof cc.Node) {
this.ResetNode(e);
if (e._prefab) {
var t = this.prefabPaths[e._prefab.fileId];
this.PushObject(t, e);
return;
}
} else {
if (null == e || !e.node) return;
this.ResetNode(e.node);
if (e instanceof cc.Sprite) {
e.sizeMode = cc.Sprite.SizeMode.TRIMMED;
e.spriteFrame = null;
}
var n = i.getQualifiedClassName(e);
this.PushObject(n, e);
}
};
e.ResetNode = function(e) {
e.parent && e.removeFromParent();
e.color = cc.Color.WHITE;
e.anchorX = .5;
e.anchorY = .5;
e.opacity = 255;
"angle" in e ? e.angle = 0 : e.rotation = 0;
e.scaleX = 1;
e.scaleY = 1;
e.skewX = 0;
e.skewY = 0;
e.x = 0;
e.y = 0;
};
e.ReleasePrefab = function(e) {
var t = i.getQualifiedClassName(e);
e instanceof cc.Prefab && (t = t + "_" + e.name);
var n = this.pools[t];
if (null != n) for (;n.length > 0; ) {
var o = n.shift();
o.destroyAllChildren();
o.destroy();
}
};
e.Release = function() {
for (var e in this.prefabPaths) delete this.prefabPaths[e];
for (var t in this.pools) {
if (0 == t.indexOf("cc.")) for (var n = this.pools[t], o = 0; o < n.length; o++) n[o] instanceof cc.Node ? n[o].isValid && n[o].destroy() : n[o].node && n[o].node.isValid && n[o].node.destroy();
delete this.pools[t];
}
};
e.GetObject = function(e) {
return void 0 != this.pools[e] && this.pools[e].length > 0 ? this.pools[e].shift() : null;
};
e.PushObject = function(e, t) {
void 0 == this.pools[e] && (this.pools[e] = []);
-1 == this.pools[e].indexOf(t) && this.pools[e].push(t);
};
e.Print = function() {
r.trace("-----------------Start Stores----------------------");
var e = 0;
for (var t in this.pools) {
r.trace(t, "===>", this.pools[t].length);
e++;
}
r.trace("-----------------Total Stores:" + e + "----------------------");
};
e.pools = {};
e.prefabPaths = {};
return e;
}();
n.StoreManager = a;
cc._RF.pop();
}, {
"../Core/Assets": "Assets",
"../Utility/dx/getQualifiedClassName": "getQualifiedClassName",
"../Utility/dx/trace": "trace",
"./CacheManager": "CacheManager"
} ],
StringUtility: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "29dc0KxG3xCipGEKMwjm1Lb", "StringUtility");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.StringUtility = void 0;
var o = function() {
function e() {}
e.TrimSpace = function(e) {
return e.replace(/^\s*(.*?)[\s\n]*$/g, "$1");
};
e.GetLength = function(e) {
for (var t = e.split(""), n = 0, o = 0; o < t.length; o++) {
var i = t[o];
this.IsChinese(i) ? n += 2 : n += 1;
}
return n;
};
e.IsChinese = function(e) {
return /^.*[\u4E00-\u9FA5]+.*$/.test(e);
};
e.Format = function() {
for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
var n = [].slice.call(arguments), o = 0;
return n.shift().replace(/%(\w)?(\d)?([dfsx])/gi, function(e, t, i, r) {
var s = n[o++], a = s >= 10 ? "" : "0", c = i ? new Array(i - 0 + 1).join(t || "") : a;
"d" == r && (c += parseInt(s));
return i ? c.slice(-1 * i) : c;
});
};
e.Cut = function(e, t) {
var n, o = 0, i = "";
n = e.length;
for (var r = 0; r < n; r++) {
var s = e.charAt(r);
o++;
escape(s).length > 4 && o++;
i = i.concat(s);
if (o >= t) return i = i.concat("...");
}
if (o < t) return e;
};
e.toUtf8 = function(e) {
var t, n, o, i;
t = "";
o = e.length;
for (n = 0; n < o; n++) if ((i = e.charCodeAt(n)) >= 1 && i <= 127) t += e.charAt(n); else if (i > 2047) {
t += String.fromCharCode(224 | i >> 12 & 15);
t += String.fromCharCode(128 | i >> 6 & 63);
t += String.fromCharCode(128 | i >> 0 & 63);
} else {
t += String.fromCharCode(192 | i >> 6 & 31);
t += String.fromCharCode(128 | i >> 0 & 63);
}
return t;
};
e.toHHmmss = function(e) {
var t = Math.floor(e / 86400), n = Math.floor((e - 24 * t * 3600) / 3600), o = Math.floor((e - 24 * t * 3600 - 3600 * n) / 60), i = e - 24 * t * 3600 - 3600 * n - 60 * o;
return (n < 10 ? "0" + n : n) + ":" + (o < 10 ? "0" + o : o) + ":" + (i < 10 ? "0" + i : i);
};
e.ClassName = "StringUtility";
return e;
}();
n.StringUtility = o;
cc._RF.pop();
}, {} ],
UIEvent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "16721aqDnFKH5MFTrf9Vxk3", "UIEvent");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.UIEvent = void 0;
var i = function(e) {
o(t, e);
function t(t, n, o, i) {
var r = e.call(this, t, o) || this;
r._gameLayer = null;
r._view = null;
r._gameLayer = i;
r._view = n;
return r;
}
Object.defineProperty(t.prototype, "gameLayer", {
get: function() {
return this._gameLayer;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(t.prototype, "view", {
get: function() {
return this._view;
},
enumerable: !1,
configurable: !0
});
t.ClassName = "UIEvent";
t.ADD_TO_LAYER = "AddToLayer";
t.DISPOSE_LAYER_ELEMENTS = "DisposeLayerElements";
t.HIDE_LAYER_ELEMENTS = "HideLayerElements";
return t;
}(e("./FEvent").FEvent);
n.UIEvent = i;
cc._RF.pop();
}, {
"./FEvent": "FEvent"
} ],
Util: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4887dehBNxPLp4lXyT3noPT", "Util");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
e.getKeepNum = function(e, t) {
var n = Math.pow(10, t), o = e * Math.pow(10, t);
o = Math.floor(o);
return o /= n;
};
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
WebClient: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "13ebcAdvoBHg7qmSV2pBU4N", "WebClient");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
n.WebClient = void 0;
var i = e("./HttpRequest"), r = e("./HttpResponseType"), s = e("../../Timers/JTimer"), a = e("../../Utility/dx/Fun"), c = function(e) {
o(t, e);
function t() {
var t = e.call(this) || this;
t.clientName = "";
t.timeOut = 0;
t.responseType = r.HttpResponseType.TEXT;
return t;
}
t.prototype.addCallBacks = function(t, n, o, i, r) {
e.prototype.addCallBacks.call(this, t, n, o, i);
this.onTimeOut = r;
};
t.prototype.open = function(t, n) {
void 0 === n && (n = "POST");
e.prototype.open.call(this, t, n);
this.timeOut > 0 && s.JTimer.TimeOut(this, this.timeOut, a.Fun(this.onTimeOutHandler, this));
};
t.prototype.onReadyStateChange = function() {
s.JTimer.ClearTimeOut(this);
e.prototype.onReadyStateChange.call(this);
};
t.prototype.onTimeOutHandler = function() {
this.onTimeOut ? 0 == this.onTimeOut.length ? this.onTimeOut.call(this.thisObj) : this.onTimeOut.call(this.thisObj, this) : this.onError && (0 == this.onError.length ? this.onError.call(this.thisObj) : this.onError.call(this.thisObj, this));
this.abort();
};
t.prototype.abort = function() {
s.JTimer.ClearTimeOut(this);
e.prototype.abort.call(this);
};
t.prototype.dispose = function() {
this.timeOut = 0;
e.prototype.dispose.call(this);
};
t.ClassName = "WebClient";
return t;
}(i.HttpRequest);
n.WebClient = c;
cc._RF.pop();
}, {
"../../Timers/JTimer": "JTimer",
"../../Utility/dx/Fun": "Fun",
"./HttpRequest": "HttpRequest",
"./HttpResponseType": "HttpResponseType"
} ],
WebManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "90fa7LP0FpA3oni9rSJsQol", "WebManager");
var o = this && this.__awaiter || function(e, t, n, o) {
function i(e) {
return e instanceof n ? e : new n(function(t) {
t(e);
});
}
return new (n || (n = Promise))(function(n, r) {
function s(e) {
try {
c(o.next(e));
} catch (e) {
r(e);
}
}
function a(e) {
try {
c(o.throw(e));
} catch (e) {
r(e);
}
}
function c(e) {
e.done ? n(e.value) : i(e.value).then(s, a);
}
c((o = o.apply(e, t || [])).next());
});
}, i = this && this.__generator || function(e, t) {
var n, o, i, r, s = {
label: 0,
sent: function() {
if (1 & i[0]) throw i[1];
return i[1];
},
trys: [],
ops: []
};
return r = {
next: a(0),
throw: a(1),
return: a(2)
}, "function" == typeof Symbol && (r[Symbol.iterator] = function() {
return this;
}), r;
function a(e) {
return function(t) {
return c([ e, t ]);
};
}
function c(r) {
if (n) throw new TypeError("Generator is already executing.");
for (;s; ) try {
if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 
0) : o.next) && !(i = i.call(o, r[1])).done) return i;
(o = 0, i) && (r = [ 2 & r[0], i.value ]);
switch (r[0]) {
case 0:
case 1:
i = r;
break;

case 4:
s.label++;
return {
value: r[1],
done: !1
};

case 5:
s.label++;
o = r[1];
r = [ 0 ];
continue;

case 7:
r = s.ops.pop();
s.trys.pop();
continue;

default:
if (!(i = s.trys, i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
s = 0;
continue;
}
if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
s.label = r[1];
break;
}
if (6 === r[0] && s.label < i[1]) {
s.label = i[1];
i = r;
break;
}
if (i && s.label < i[2]) {
s.label = i[2];
s.ops.push(r);
break;
}
i[2] && s.ops.pop();
s.trys.pop();
continue;
}
r = t.call(e, s);
} catch (e) {
r = [ 6, e ];
o = 0;
} finally {
n = i = 0;
}
if (5 & r[0]) throw r[1];
return {
value: r[0] ? r[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
n.WebManager = void 0;
var r = e("../Network/Web/WebClient"), s = e("../Utility/dx/trace"), a = e("./StoreManager"), c = function() {
function e() {}
e.SetDefaultClass = function(e) {
this.clientClass = e;
};
e.GetWebData = function(e, t, n, o) {
void 0 === o && (o = null);
if (void 0 == this.clientDict[e]) {
this.clientDict[e] = {
onComplete: n,
onFail: o
};
var i = this.GetClient();
"timeOut" in i && (i.timeOut = 1e4);
i.open(e);
i.api = e;
i.send(t ? JSON.stringify(t) : null);
}
};
e.GetWebDataAsync = function(e, t) {
return o(this, void 0, void 0, function() {
var n = this;
return i(this, function(o) {
return [ 2, new Promise(function(o, i) {
var r = n.GetClient(!1);
"timeOut" in r && (r.timeOut = 5e3);
r.addCallBacks(n, function(e, t) {
return o(t);
}, null, function(e) {
return o("");
});
r.open(e, "GET");
r.send(t ? JSON.stringify(t) : null);
}) ];
});
});
};
e.onWebClientGetData = function(e, t) {
if (void 0 != this.clientDict[e.api]) {
var n = this.clientDict[e.api];
null != n.onComplete && n.onComplete(t);
n.onComplete = null;
}
this.storeClient(e);
};
e.onWebClientFail = function(e) {
s.trace("[WebManager] 无法获取Web接口===>", e.api, " 的数据!!!");
if (void 0 != this.clientDict[e.api]) {
var t = this.clientDict[e.api];
null != t.onFail && t.onFail();
}
this.storeClient(e);
};
e.onWebClientTimeOut = function(e) {
s.trace("[WebManager]调用Web接口===>", e.api, " 超时!!!");
if (void 0 != this.clientDict[e.api]) {
var t = this.clientDict[e.api];
null != t.onFail && t.onFail();
}
this.storeClient(e);
};
e.storeClient = function(e) {
void 0 != this.clientDict[e.api] && delete this.clientDict[e.api];
e.dispose();
};
e.GetClient = function(e) {
void 0 === e && (e = !0);
var t = a.StoreManager.New(this.clientClass);
e && (t instanceof r.WebClient ? t.addCallBacks(this, this.onWebClientGetData, null, this.onWebClientFail, this.onWebClientTimeOut) : t.addCallBacks(this, this.onWebClientGetData, null, this.onWebClientFail));
return t;
};
e.clientClass = r.WebClient;
e.clientDict = {};
return e;
}();
n.WebManager = c;
cc._RF.pop();
}, {
"../Network/Web/WebClient": "WebClient",
"../Utility/dx/trace": "trace",
"./StoreManager": "StoreManager"
} ],
addEvent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c4b8cB7AY5O05CFHovOZcYi", "addEvent");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.addEvent = void 0;
var o = e("./../../Managers/EventManager");
n.addEvent = function(e, t, n) {
o.EventManager.addEvent(e, t, n);
};
cc._RF.pop();
}, {
"./../../Managers/EventManager": "EventManager"
} ],
cancelDelayReleaseRes: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5d2a2VraXpBO5DWrfvThq2P", "cancelDelayReleaseRes");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.cancelDelayReleaseRes = void 0;
var o = e("../../Managers/ResourceReleaseManager");
n.cancelDelayReleaseRes = function(e) {
if (null != e) if ("string" == typeof e) o.ResourceReleaseManager.ClearReleaseDelay(e); else for (var t = 0; t < e.length; t++) o.ResourceReleaseManager.ClearReleaseDelay(e[t]);
};
cc._RF.pop();
}, {
"../../Managers/ResourceReleaseManager": "ResourceReleaseManager"
} ],
delayReleaseRes: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "7bbbdlE101Mco+cn35yIQ7l", "delayReleaseRes");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.delayReleaseRes = void 0;
var o = e("../../Managers/ResourceReleaseManager");
n.delayReleaseRes = function(e, t) {
if ("string" == typeof e) o.ResourceReleaseManager.ReleaseAsset(e, t); else for (var n = 0; n < e.length; n++) o.ResourceReleaseManager.ReleaseAsset(e[n], t);
};
cc._RF.pop();
}, {
"../../Managers/ResourceReleaseManager": "ResourceReleaseManager"
} ],
dispatchFEventWith: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6de800Lj3JM4ZQed3qK59g3", "dispatchFEventWith");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.dispatchFEventWith = void 0;
var o = e("./../../Managers/EventManager");
n.dispatchFEventWith = function(e, t) {
o.EventManager.dispatchEventWith(e, t);
};
cc._RF.pop();
}, {
"./../../Managers/EventManager": "EventManager"
} ],
dispatchFEvent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "264f9/FxSFJPKXZPu7Yfa02", "dispatchFEvent");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.dispatchFEvent = void 0;
var o = e("./../../Managers/EventManager");
n.dispatchFEvent = function(e) {
o.EventManager.dispatchEvent(e);
};
cc._RF.pop();
}, {
"./../../Managers/EventManager": "EventManager"
} ],
dispatchModuleEvent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "322beLUf55HwYm3pddqBmzN", "dispatchModuleEvent");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.dispatchModuleEvent = void 0;
var o = e("../../Managers/EventManager"), i = e("../../Events/ModuleEvent");
n.dispatchModuleEvent = function(e, t, n, r, s) {
o.EventManager.dispatchEvent(new i.ModuleEvent(e, t, n, r, s));
};
cc._RF.pop();
}, {
"../../Events/ModuleEvent": "ModuleEvent",
"../../Managers/EventManager": "EventManager"
} ],
dispatchSoundEvent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ba055E/p05EM6AUorxKArEA", "dispatchSoundEvent");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.dispatchSoundEvent = void 0;
var o = e("../../Events/SoundEvent"), i = e("../../Managers/EventManager");
n.dispatchSoundEvent = function(e, t) {
i.EventManager.dispatchEvent(new o.SoundEvent(e, t));
};
cc._RF.pop();
}, {
"../../Events/SoundEvent": "SoundEvent",
"../../Managers/EventManager": "EventManager"
} ],
excuteNodeEvents: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f88d8L/calItZBJtw0zD87b", "excuteNodeEvents");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.excuteNodeEvents = void 0;
n.excuteNodeEvents = function(e, t) {
if (null != e) for (var n = 0; n < e.length; n++) {
var o = e[n], i = null;
if (null == o.component || "" == o.component) {
if (null == o._componentName || "" == o._componentName) continue;
i = o.target.getComponent(o._componentName);
} else i = o.target.getComponent(o.component);
if (null != i) {
var r = i[o.handler];
null != r && (0 == r.length ? r.apply(i) : 1 == r.length ? r.apply(i, [ t ]) : 2 == r.length && r.apply(i, [ t, o.customEventData ]));
}
}
};
cc._RF.pop();
}, {} ],
formatDate: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "793f4QoMjBH1L2nYRcAiBuK", "formatDate");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.formatDate = void 0;
n.formatDate = function(e, t) {
void 0 === t && (t = "yyyy-mm-dd hh:MM");
var n;
n = e instanceof Date ? e : "number" == typeof e ? new Date(e) : new Date(e.year, e.month, e.day);
function o(e) {
return e > 9 ? e + "" : "0" + e;
}
return t = (t = (t = (t = (t = (t = (t = t.replace("yyyy", n.getFullYear() + "")).replace("mm", o(n.getMonth() + 1))).replace("dd", o(n.getDate()))).replace("hh", o(n.getHours()))).replace("MM", o(n.getMinutes()))).replace("ss", o(n.getSeconds()))).replace("ms", o(n.getMilliseconds()));
};
cc._RF.pop();
}, {} ],
formatString: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c9abcMK9I1IhY65t++GFIuA", "formatString");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.formatString = void 0;
n.formatString = function(e, t) {
for (var n = 0; n < t.length; n++) e = e.replace("{" + n + "}", t[n]);
return e;
};
cc._RF.pop();
}, {} ],
getCamera: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "252694vVrxL8Z7a14et+JNA", "getCamera");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.getCamera = void 0;
var o = e("../../Core/Application");
n.getCamera = function(e) {
return o.Application.CurrentScene.getCamera(e);
};
cc._RF.pop();
}, {
"../../Core/Application": "Application"
} ],
getFileExtension: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "940208a3blDlYgUXhdzELtk", "getFileExtension");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.getFileExtension = void 0;
n.getFileExtension = function(e) {
var t = e.lastIndexOf(".");
return t > -1 ? e.substring(t + 1) : e;
};
cc._RF.pop();
}, {} ],
getFileName: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "7bd33elSs1A5IiceTPyOHTO", "getFileName");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.getFileName = void 0;
n.getFileName = function(e) {
var t = e.lastIndexOf("/");
-1 == t && (t = e.lastIndexOf("\\"));
t > -1 && (t = (e = e.substring(t + 1)).indexOf(".")) > -1 && (e = e.substring(0, t));
return e;
};
cc._RF.pop();
}, {} ],
getLang: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d0868lFWWZBx7HWWTixFJQ9", "getLang");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.getLang = void 0;
var o = e("../../Managers/LanguageManager"), i = e("./formatString");
n.getLang = function(e, t) {
return null != t ? i.formatString(o.LanguageManager.GetLang(e), t) : o.LanguageManager.GetLang(e);
};
cc._RF.pop();
}, {
"../../Managers/LanguageManager": "LanguageManager",
"./formatString": "formatString"
} ],
getNodeChildByName: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "665c6F3Qq9G36GB/Ug6mgFk", "getNodeChildByName");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.getNodeChildByName = void 0;
n.getNodeChildByName = function(e, t, n) {
for (var o = t.split("/"); o.length > 0; ) if (null == (e = e.getChildByName(o.shift())) || 0 == o.length) return null != e && null != n ? e.getComponent(n) : e;
return null;
};
cc._RF.pop();
}, {} ],
getPointA2BAngle: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "eeb12G9EYRCEa886xynndm8", "getPointA2BAngle");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.getPointA2BAngle = void 0;
n.getPointA2BAngle = function(e, t, n) {
void 0 === n && (n = 0);
var o = t.sub(e);
return 180 * Math.atan2(o.y, o.x) / Math.PI + n;
};
cc._RF.pop();
}, {} ],
getQualifiedClassName: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "40538nR/vBDxIgZgRqc/4Yl", "getQualifiedClassName");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.getQualifiedClassName = void 0;
n.getQualifiedClassName = function e(t) {
if (null != t.ClassName) return t.ClassName;
if ("function" == typeof t) {
var n = t.prototype;
if (n && n.hasOwnProperty("__classname__") && n.__classname__) return n.__classname__;
var o = "";
t.name && (o = t.name);
if (t.toString) {
var i, r = t.toString();
(i = "[" === r.charAt(0) ? r.match(/\[\w+\s*(\w+)\]/) : r.match(/function\s*(\w+)/)) && 2 === i.length && (o = i[1]);
}
return "Object" !== o ? o : "";
}
return t && t.constructor ? e(t.constructor) : "";
};
cc._RF.pop();
}, {} ],
getTime: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3fab3S4UeRCsKBjTVaiMuZF", "getTime");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.getTime = void 0;
var o = e("./../../Datas/Global");
n.getTime = function() {
0 == o.Global.START_TIME && (o.Global.START_TIME = Date.now());
return Date.now() - o.Global.START_TIME;
};
cc._RF.pop();
}, {
"./../../Datas/Global": "Global"
} ],
getURLParam: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f1349KMBgJLfoNDofCqXKpr", "getURLParam");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.getURLParam = void 0;
n.getURLParam = function(e) {
var t = decodeURIComponent(window.location.search);
if (null == (t = t.toLowerCase()) || t.length <= 1) return null;
var n = t.indexOf(e + "=");
if (-1 == n) return null;
n += e.length + 1;
var o = t.indexOf("&", n);
-1 == o && (o = t.length);
return t.substring(n, o);
};
cc._RF.pop();
}, {} ],
graySprite: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4e6faWAONFNs5b4RQV+hTk3", "graySprite");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.graySprite = void 0;
n.graySprite = function(e, t) {
var n = null;
n = e ? cc.Material.getBuiltinMaterial("2d-gray-sprite") : cc.Material.getBuiltinMaterial("2d-sprite");
n = cc.MaterialVariant.create(n, t);
t.setMaterial(0, n);
};
cc._RF.pop();
}, {} ],
integer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0cfe8Pbv+NKSbdW77UE9cHV", "integer");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.integer = void 0;
n.integer = function(e) {
return e < 0 ? Math.ceil(e) : Math.floor(e);
};
cc._RF.pop();
}, {} ],
stageHeight: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9cb98gL3LZBLYZLTuZ/3lnr", "stageHeight");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.stageHeight = void 0;
var o = e("../../Core/Application");
n.stageHeight = function() {
return o.Application.Size.y;
};
cc._RF.pop();
}, {
"../../Core/Application": "Application"
} ],
stageWidth: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "243eaMaPBBOT4tJ3JTump7/", "stageWidth");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.stageWidth = void 0;
var o = e("../../Core/Application");
n.stageWidth = function() {
return o.Application.Size.x;
};
cc._RF.pop();
}, {
"../../Core/Application": "Application"
} ],
trace: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a3ae5fWnG5DcJG8RW9Jbinm", "trace");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.trace = void 0;
var o = e("./formatDate");
n.trace = function() {
for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
var n = o.formatDate(new Date(), "hh:MM:ss ms");
n = "[" + n + "]";
e.unshift(n);
console.log.apply(null, e);
};
cc._RF.pop();
}, {
"./formatDate": "formatDate"
} ],
"use_v2.1-2.2.1_cc.Toggle_event": [ function(e, t, n) {
"use strict";
cc._RF.push(t, "8849aNsYH5I8bhAILG0BV/f", "use_v2.1-2.2.1_cc.Toggle_event");
cc.Toggle && (cc.Toggle._triggerEventInScript_isChecked = !0);
cc._RF.pop();
}, {} ]
}, {}, [ "CButton", "CDragonBones", "CLanguage", "CNodePool", "CScrollView", "CLanguageButtonInfo", "ScrollEasy", "Application", "Assets", "FBinder", "FContext", "FFunction", "FMediator", "FModule", "FObject", "FProxy", "FScene", "FView", "Global", "Instances", "LumosEffect", "AudioType", "ButtonStatus", "GameLayer", "LanguageType", "LoaderType", "PopupAnimType", "SceneOrientationType", "ApplicationEvent", "FEvent", "ModuleEvent", "ResizeEvent", "SceneEvent", "SoundEvent", "UIEvent", "IBinder", "IContext", "IDispose", "IJuggle", "ILanguage", "ILoader", "IMediator", "IModule", "IProxy", "IStore", "IClient", "IClientMessage", "IHttpRequest", "IReceiveHandler", "DragonBoneLoader", "Loader", "SceneLoader", "AudioManager", "CacheManager", "ClientManager", "EventManager", "InstanceManager", "JuggleManager", "LanguageManager", "ModuleManager", "ProxyManager", "ResourceManager", "ResourceReleaseManager", "StoreManager", "WebManager", "Client", "ClientDealer", "ClientMessage", "ClientSocket", "PacketBuffer", "ReceiveHandler", "Socket", "HttpMethod", "HttpRequest", "HttpResponseType", "WebClient", "Audio", "AudioStacker", "Dictionary", "AdvanceTick", "DelayFramer", "JFrameStacker", "JFramer", "JTimer", "JuggleFramer", "ArrayUtility", "AssetUtility", "DragonBoneUtility", "ObjectUtility", "PointUtility", "StringUtility", "Fun", "addEvent", "cancelDelayReleaseRes", "delayReleaseRes", "dispatchFEvent", "dispatchFEventWith", "dispatchModuleEvent", "dispatchSoundEvent", "excuteNodeEvents", "formatDate", "formatString", "getCamera", "getFileExtension", "getFileName", "getLang", "getNodeChildByName", "getPointA2BAngle", "getQualifiedClassName", "getTime", "getURLParam", "graySprite", "integer", "stageHeight", "stageWidth", "trace", "ApplicationContext", "Device", "DownImage", "GameEvent", "LocalCacheData", "ModuleNames", "Util", "BookCoverBinder", "BookCoverData", "BookCoverModule", "BookShelfBinder", "BookShelfInfo", "BookShelfItem", "BookShelfManager", "BookShelfModule", "LoginBinder", "LoginConst", "LoginLoad", "LoginModule", "MainBinder", "MainModule", "LoginMediator", "LoginScene", "MainMediator", "MainScene", "use_v2.1-2.2.1_cc.Toggle_event" ]);