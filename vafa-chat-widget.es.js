import { openBlock as l, createElementBlock as h, createElementVNode as a, normalizeClass as R, withDirectives as E, createCommentVNode as p, toDisplayString as v, vModelText as Q, Fragment as S, renderList as I, createStaticVNode as ke, vShow as U, withKeys as be, createTextVNode as Ae, createApp as Re } from "vue";
const x = /* @__PURE__ */ Object.create(null);
x.open = "0";
x.close = "1";
x.ping = "2";
x.pong = "3";
x.message = "4";
x.upgrade = "5";
x.noop = "6";
const P = /* @__PURE__ */ Object.create(null);
Object.keys(x).forEach((s) => {
  P[x[s]] = s;
});
const F = { type: "error", data: "parser error" }, ae = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", ce = typeof ArrayBuffer == "function", le = (s) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(s) : s && s.buffer instanceof ArrayBuffer, J = ({ type: s, data: e }, t, i) => ae && e instanceof Blob ? t ? i(e) : se(e, i) : ce && (e instanceof ArrayBuffer || le(e)) ? t ? i(e) : se(new Blob([e]), i) : i(x[s] + (e || "")), se = (s, e) => {
  const t = new FileReader();
  return t.onload = function() {
    const i = t.result.split(",")[1];
    e("b" + (i || ""));
  }, t.readAsDataURL(s);
};
function ie(s) {
  return s instanceof Uint8Array ? s : s instanceof ArrayBuffer ? new Uint8Array(s) : new Uint8Array(s.buffer, s.byteOffset, s.byteLength);
}
let D;
function Ee(s, e) {
  if (ae && s.data instanceof Blob)
    return s.data.arrayBuffer().then(ie).then(e);
  if (ce && (s.data instanceof ArrayBuffer || le(s.data)))
    return e(ie(s.data));
  J(s, !1, (t) => {
    D || (D = new TextEncoder()), e(D.encode(t));
  });
}
const ne = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", B = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let s = 0; s < ne.length; s++)
  B[ne.charCodeAt(s)] = s;
const Te = (s) => {
  let e = s.length * 0.75, t = s.length, i, n = 0, r, o, c, d;
  s[s.length - 1] === "=" && (e--, s[s.length - 2] === "=" && e--);
  const k = new ArrayBuffer(e), g = new Uint8Array(k);
  for (i = 0; i < t; i += 4)
    r = B[s.charCodeAt(i)], o = B[s.charCodeAt(i + 1)], c = B[s.charCodeAt(i + 2)], d = B[s.charCodeAt(i + 3)], g[n++] = r << 2 | o >> 4, g[n++] = (o & 15) << 4 | c >> 2, g[n++] = (c & 3) << 6 | d & 63;
  return k;
}, Ce = typeof ArrayBuffer == "function", Y = (s, e) => {
  if (typeof s != "string")
    return {
      type: "message",
      data: he(s, e)
    };
  const t = s.charAt(0);
  return t === "b" ? {
    type: "message",
    data: Se(s.substring(1), e)
  } : P[t] ? s.length > 1 ? {
    type: P[t],
    data: s.substring(1)
  } : {
    type: P[t]
  } : F;
}, Se = (s, e) => {
  if (Ce) {
    const t = Te(s);
    return he(t, e);
  } else
    return { base64: !0, data: s };
}, he = (s, e) => {
  switch (e) {
    case "blob":
      return s instanceof Blob ? s : new Blob([s]);
    case "arraybuffer":
    default:
      return s instanceof ArrayBuffer ? s : s.buffer;
  }
}, ue = String.fromCharCode(30), Ie = (s, e) => {
  const t = s.length, i = new Array(t);
  let n = 0;
  s.forEach((r, o) => {
    J(r, !1, (c) => {
      i[o] = c, ++n === t && e(i.join(ue));
    });
  });
}, Ve = (s, e) => {
  const t = s.split(ue), i = [];
  for (let n = 0; n < t.length; n++) {
    const r = Y(t[n], e);
    if (i.push(r), r.type === "error")
      break;
  }
  return i;
};
function Be() {
  return new TransformStream({
    transform(s, e) {
      Ee(s, (t) => {
        const i = t.length;
        let n;
        if (i < 126)
          n = new Uint8Array(1), new DataView(n.buffer).setUint8(0, i);
        else if (i < 65536) {
          n = new Uint8Array(3);
          const r = new DataView(n.buffer);
          r.setUint8(0, 126), r.setUint16(1, i);
        } else {
          n = new Uint8Array(9);
          const r = new DataView(n.buffer);
          r.setUint8(0, 127), r.setBigUint64(1, BigInt(i));
        }
        s.data && typeof s.data != "string" && (n[0] |= 128), e.enqueue(n), e.enqueue(t);
      });
    }
  });
}
let M;
function L(s) {
  return s.reduce((e, t) => e + t.length, 0);
}
function O(s, e) {
  if (s[0].length === e)
    return s.shift();
  const t = new Uint8Array(e);
  let i = 0;
  for (let n = 0; n < e; n++)
    t[n] = s[0][i++], i === s[0].length && (s.shift(), i = 0);
  return s.length && i < s[0].length && (s[0] = s[0].slice(i)), t;
}
function Le(s, e) {
  M || (M = new TextDecoder());
  const t = [];
  let i = 0, n = -1, r = !1;
  return new TransformStream({
    transform(o, c) {
      for (t.push(o); ; ) {
        if (i === 0) {
          if (L(t) < 1)
            break;
          const d = O(t, 1);
          r = (d[0] & 128) === 128, n = d[0] & 127, n < 126 ? i = 3 : n === 126 ? i = 1 : i = 2;
        } else if (i === 1) {
          if (L(t) < 2)
            break;
          const d = O(t, 2);
          n = new DataView(d.buffer, d.byteOffset, d.length).getUint16(0), i = 3;
        } else if (i === 2) {
          if (L(t) < 8)
            break;
          const d = O(t, 8), k = new DataView(d.buffer, d.byteOffset, d.length), g = k.getUint32(0);
          if (g > Math.pow(2, 53 - 32) - 1) {
            c.enqueue(F);
            break;
          }
          n = g * Math.pow(2, 32) + k.getUint32(4), i = 3;
        } else {
          if (L(t) < n)
            break;
          const d = O(t, n);
          c.enqueue(Y(r ? d : M.decode(d), e)), i = 0;
        }
        if (n === 0 || n > s) {
          c.enqueue(F);
          break;
        }
      }
    }
  });
}
const de = 4;
function f(s) {
  if (s)
    return Oe(s);
}
function Oe(s) {
  for (var e in f.prototype)
    s[e] = f.prototype[e];
  return s;
}
f.prototype.on = f.prototype.addEventListener = function(s, e) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + s] = this._callbacks["$" + s] || []).push(e), this;
};
f.prototype.once = function(s, e) {
  function t() {
    this.off(s, t), e.apply(this, arguments);
  }
  return t.fn = e, this.on(s, t), this;
};
f.prototype.off = f.prototype.removeListener = f.prototype.removeAllListeners = f.prototype.removeEventListener = function(s, e) {
  if (this._callbacks = this._callbacks || {}, arguments.length == 0)
    return this._callbacks = {}, this;
  var t = this._callbacks["$" + s];
  if (!t)
    return this;
  if (arguments.length == 1)
    return delete this._callbacks["$" + s], this;
  for (var i, n = 0; n < t.length; n++)
    if (i = t[n], i === e || i.fn === e) {
      t.splice(n, 1);
      break;
    }
  return t.length === 0 && delete this._callbacks["$" + s], this;
};
f.prototype.emit = function(s) {
  this._callbacks = this._callbacks || {};
  for (var e = new Array(arguments.length - 1), t = this._callbacks["$" + s], i = 1; i < arguments.length; i++)
    e[i - 1] = arguments[i];
  if (t) {
    t = t.slice(0);
    for (var i = 0, n = t.length; i < n; ++i)
      t[i].apply(this, e);
  }
  return this;
};
f.prototype.emitReserved = f.prototype.emit;
f.prototype.listeners = function(s) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + s] || [];
};
f.prototype.hasListeners = function(s) {
  return !!this.listeners(s).length;
};
const j = (() => typeof Promise == "function" && typeof Promise.resolve == "function" ? (e) => Promise.resolve().then(e) : (e, t) => t(e, 0))(), m = (() => typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")())(), Pe = "arraybuffer";
function fe(s, ...e) {
  return e.reduce((t, i) => (s.hasOwnProperty(i) && (t[i] = s[i]), t), {});
}
const qe = m.setTimeout, He = m.clearTimeout;
function z(s, e) {
  e.useNativeTimers ? (s.setTimeoutFn = qe.bind(m), s.clearTimeoutFn = He.bind(m)) : (s.setTimeoutFn = m.setTimeout.bind(m), s.clearTimeoutFn = m.clearTimeout.bind(m));
}
const Ne = 1.33;
function je(s) {
  return typeof s == "string" ? ze(s) : Math.ceil((s.byteLength || s.size) * Ne);
}
function ze(s) {
  let e = 0, t = 0;
  for (let i = 0, n = s.length; i < n; i++)
    e = s.charCodeAt(i), e < 128 ? t += 1 : e < 2048 ? t += 2 : e < 55296 || e >= 57344 ? t += 3 : (i++, t += 4);
  return t;
}
function pe() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function Qe(s) {
  let e = "";
  for (let t in s)
    s.hasOwnProperty(t) && (e.length && (e += "&"), e += encodeURIComponent(t) + "=" + encodeURIComponent(s[t]));
  return e;
}
function Ue(s) {
  let e = {}, t = s.split("&");
  for (let i = 0, n = t.length; i < n; i++) {
    let r = t[i].split("=");
    e[decodeURIComponent(r[0])] = decodeURIComponent(r[1]);
  }
  return e;
}
class De extends Error {
  constructor(e, t, i) {
    super(e), this.description = t, this.context = i, this.type = "TransportError";
  }
}
class $ extends f {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(e) {
    super(), this.writable = !1, z(this, e), this.opts = e, this.query = e.query, this.socket = e.socket, this.supportsBinary = !e.forceBase64;
  }
  /**
   * Emits an error.
   *
   * @param {String} reason
   * @param description
   * @param context - the error context
   * @return {Transport} for chaining
   * @protected
   */
  onError(e, t, i) {
    return super.emitReserved("error", new De(e, t, i)), this;
  }
  /**
   * Opens the transport.
   */
  open() {
    return this.readyState = "opening", this.doOpen(), this;
  }
  /**
   * Closes the transport.
   */
  close() {
    return (this.readyState === "opening" || this.readyState === "open") && (this.doClose(), this.onClose()), this;
  }
  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   */
  send(e) {
    this.readyState === "open" && this.write(e);
  }
  /**
   * Called upon open
   *
   * @protected
   */
  onOpen() {
    this.readyState = "open", this.writable = !0, super.emitReserved("open");
  }
  /**
   * Called with data.
   *
   * @param {String} data
   * @protected
   */
  onData(e) {
    const t = Y(e, this.socket.binaryType);
    this.onPacket(t);
  }
  /**
   * Called with a decoded packet.
   *
   * @protected
   */
  onPacket(e) {
    super.emitReserved("packet", e);
  }
  /**
   * Called upon close.
   *
   * @protected
   */
  onClose(e) {
    this.readyState = "closed", super.emitReserved("close", e);
  }
  /**
   * Pauses the transport, in order not to lose packets during an upgrade.
   *
   * @param onPause
   */
  pause(e) {
  }
  createUri(e, t = {}) {
    return e + "://" + this._hostname() + this._port() + this.opts.path + this._query(t);
  }
  _hostname() {
    const e = this.opts.hostname;
    return e.indexOf(":") === -1 ? e : "[" + e + "]";
  }
  _port() {
    return this.opts.port && (this.opts.secure && +(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80) ? ":" + this.opts.port : "";
  }
  _query(e) {
    const t = Qe(e);
    return t.length ? "?" + t : "";
  }
}
class Me extends $ {
  constructor() {
    super(...arguments), this._polling = !1;
  }
  get name() {
    return "polling";
  }
  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @protected
   */
  doOpen() {
    this._poll();
  }
  /**
   * Pauses polling.
   *
   * @param {Function} onPause - callback upon buffers are flushed and transport is paused
   * @package
   */
  pause(e) {
    this.readyState = "pausing";
    const t = () => {
      this.readyState = "paused", e();
    };
    if (this._polling || !this.writable) {
      let i = 0;
      this._polling && (i++, this.once("pollComplete", function() {
        --i || t();
      })), this.writable || (i++, this.once("drain", function() {
        --i || t();
      }));
    } else
      t();
  }
  /**
   * Starts polling cycle.
   *
   * @private
   */
  _poll() {
    this._polling = !0, this.doPoll(), this.emitReserved("poll");
  }
  /**
   * Overloads onData to detect payloads.
   *
   * @protected
   */
  onData(e) {
    const t = (i) => {
      if (this.readyState === "opening" && i.type === "open" && this.onOpen(), i.type === "close")
        return this.onClose({ description: "transport closed by the server" }), !1;
      this.onPacket(i);
    };
    Ve(e, this.socket.binaryType).forEach(t), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
  }
  /**
   * For polling, send a close packet.
   *
   * @protected
   */
  doClose() {
    const e = () => {
      this.write([{ type: "close" }]);
    };
    this.readyState === "open" ? e() : this.once("open", e);
  }
  /**
   * Writes a packets payload.
   *
   * @param {Array} packets - data packets
   * @protected
   */
  write(e) {
    this.writable = !1, Ie(e, (t) => {
      this.doWrite(t, () => {
        this.writable = !0, this.emitReserved("drain");
      });
    });
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const e = this.opts.secure ? "https" : "http", t = this.query || {};
    return this.opts.timestampRequests !== !1 && (t[this.opts.timestampParam] = pe()), !this.supportsBinary && !t.sid && (t.b64 = 1), this.createUri(e, t);
  }
}
let ve = !1;
try {
  ve = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const _e = ve;
function Fe() {
}
class We extends Me {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @package
   */
  constructor(e) {
    if (super(e), typeof location < "u") {
      const t = location.protocol === "https:";
      let i = location.port;
      i || (i = t ? "443" : "80"), this.xd = typeof location < "u" && e.hostname !== location.hostname || i !== e.port;
    }
  }
  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @private
   */
  doWrite(e, t) {
    const i = this.request({
      method: "POST",
      data: e
    });
    i.on("success", t), i.on("error", (n, r) => {
      this.onError("xhr post error", n, r);
    });
  }
  /**
   * Starts a poll cycle.
   *
   * @private
   */
  doPoll() {
    const e = this.request();
    e.on("data", this.onData.bind(this)), e.on("error", (t, i) => {
      this.onError("xhr poll error", t, i);
    }), this.pollXhr = e;
  }
}
class w extends f {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(e, t, i) {
    super(), this.createRequest = e, z(this, i), this._opts = i, this._method = i.method || "GET", this._uri = t, this._data = i.data !== void 0 ? i.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var e;
    const t = fe(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    t.xdomain = !!this._opts.xd;
    const i = this._xhr = this.createRequest(t);
    try {
      i.open(this._method, this._uri, !0);
      try {
        if (this._opts.extraHeaders) {
          i.setDisableHeaderCheck && i.setDisableHeaderCheck(!0);
          for (let n in this._opts.extraHeaders)
            this._opts.extraHeaders.hasOwnProperty(n) && i.setRequestHeader(n, this._opts.extraHeaders[n]);
        }
      } catch {
      }
      if (this._method === "POST")
        try {
          i.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch {
        }
      try {
        i.setRequestHeader("Accept", "*/*");
      } catch {
      }
      (e = this._opts.cookieJar) === null || e === void 0 || e.addCookies(i), "withCredentials" in i && (i.withCredentials = this._opts.withCredentials), this._opts.requestTimeout && (i.timeout = this._opts.requestTimeout), i.onreadystatechange = () => {
        var n;
        i.readyState === 3 && ((n = this._opts.cookieJar) === null || n === void 0 || n.parseCookies(
          // @ts-ignore
          i.getResponseHeader("set-cookie")
        )), i.readyState === 4 && (i.status === 200 || i.status === 1223 ? this._onLoad() : this.setTimeoutFn(() => {
          this._onError(typeof i.status == "number" ? i.status : 0);
        }, 0));
      }, i.send(this._data);
    } catch (n) {
      this.setTimeoutFn(() => {
        this._onError(n);
      }, 0);
      return;
    }
    typeof document < "u" && (this._index = w.requestsCount++, w.requests[this._index] = this);
  }
  /**
   * Called upon error.
   *
   * @private
   */
  _onError(e) {
    this.emitReserved("error", e, this._xhr), this._cleanup(!0);
  }
  /**
   * Cleans up house.
   *
   * @private
   */
  _cleanup(e) {
    if (!(typeof this._xhr > "u" || this._xhr === null)) {
      if (this._xhr.onreadystatechange = Fe, e)
        try {
          this._xhr.abort();
        } catch {
        }
      typeof document < "u" && delete w.requests[this._index], this._xhr = null;
    }
  }
  /**
   * Called upon load.
   *
   * @private
   */
  _onLoad() {
    const e = this._xhr.responseText;
    e !== null && (this.emitReserved("data", e), this.emitReserved("success"), this._cleanup());
  }
  /**
   * Aborts the request.
   *
   * @package
   */
  abort() {
    this._cleanup();
  }
}
w.requestsCount = 0;
w.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function")
    attachEvent("onunload", re);
  else if (typeof addEventListener == "function") {
    const s = "onpagehide" in m ? "pagehide" : "unload";
    addEventListener(s, re, !1);
  }
}
function re() {
  for (let s in w.requests)
    w.requests.hasOwnProperty(s) && w.requests[s].abort();
}
const Ke = function() {
  const s = ge({
    xdomain: !1
  });
  return s && s.responseType !== null;
}();
class Xe extends We {
  constructor(e) {
    super(e);
    const t = e && e.forceBase64;
    this.supportsBinary = Ke && !t;
  }
  request(e = {}) {
    return Object.assign(e, { xd: this.xd }, this.opts), new w(ge, this.uri(), e);
  }
}
function ge(s) {
  const e = s.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!e || _e))
      return new XMLHttpRequest();
  } catch {
  }
  if (!e)
    try {
      return new m[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const me = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class Ze extends $ {
  get name() {
    return "websocket";
  }
  doOpen() {
    const e = this.uri(), t = this.opts.protocols, i = me ? {} : fe(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    this.opts.extraHeaders && (i.headers = this.opts.extraHeaders);
    try {
      this.ws = this.createSocket(e, t, i);
    } catch (n) {
      return this.emitReserved("error", n);
    }
    this.ws.binaryType = this.socket.binaryType, this.addEventListeners();
  }
  /**
   * Adds event listeners to the socket
   *
   * @private
   */
  addEventListeners() {
    this.ws.onopen = () => {
      this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
    }, this.ws.onclose = (e) => this.onClose({
      description: "websocket connection closed",
      context: e
    }), this.ws.onmessage = (e) => this.onData(e.data), this.ws.onerror = (e) => this.onError("websocket error", e);
  }
  write(e) {
    this.writable = !1;
    for (let t = 0; t < e.length; t++) {
      const i = e[t], n = t === e.length - 1;
      J(i, this.supportsBinary, (r) => {
        try {
          this.doWrite(i, r);
        } catch {
        }
        n && j(() => {
          this.writable = !0, this.emitReserved("drain");
        }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    typeof this.ws < "u" && (this.ws.onerror = () => {
    }, this.ws.close(), this.ws = null);
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const e = this.opts.secure ? "wss" : "ws", t = this.query || {};
    return this.opts.timestampRequests && (t[this.opts.timestampParam] = pe()), this.supportsBinary || (t.b64 = 1), this.createUri(e, t);
  }
}
const _ = m.WebSocket || m.MozWebSocket;
class Ge extends Ze {
  createSocket(e, t, i) {
    return me ? new _(e, t, i) : t ? new _(e, t) : new _(e);
  }
  doWrite(e, t) {
    this.ws.send(t);
  }
}
class Je extends $ {
  get name() {
    return "webtransport";
  }
  doOpen() {
    try {
      this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
    } catch (e) {
      return this.emitReserved("error", e);
    }
    this._transport.closed.then(() => {
      this.onClose();
    }).catch((e) => {
      this.onError("webtransport error", e);
    }), this._transport.ready.then(() => {
      this._transport.createBidirectionalStream().then((e) => {
        const t = Le(Number.MAX_SAFE_INTEGER, this.socket.binaryType), i = e.readable.pipeThrough(t).getReader(), n = Be();
        n.readable.pipeTo(e.writable), this._writer = n.writable.getWriter();
        const r = () => {
          i.read().then(({ done: c, value: d }) => {
            c || (this.onPacket(d), r());
          }).catch((c) => {
          });
        };
        r();
        const o = { type: "open" };
        this.query.sid && (o.data = `{"sid":"${this.query.sid}"}`), this._writer.write(o).then(() => this.onOpen());
      });
    });
  }
  write(e) {
    this.writable = !1;
    for (let t = 0; t < e.length; t++) {
      const i = e[t], n = t === e.length - 1;
      this._writer.write(i).then(() => {
        n && j(() => {
          this.writable = !0, this.emitReserved("drain");
        }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    var e;
    (e = this._transport) === null || e === void 0 || e.close();
  }
}
const Ye = {
  websocket: Ge,
  webtransport: Je,
  polling: Xe
}, $e = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, et = [
  "source",
  "protocol",
  "authority",
  "userInfo",
  "user",
  "password",
  "host",
  "port",
  "relative",
  "path",
  "directory",
  "file",
  "query",
  "anchor"
];
function W(s) {
  if (s.length > 8e3)
    throw "URI too long";
  const e = s, t = s.indexOf("["), i = s.indexOf("]");
  t != -1 && i != -1 && (s = s.substring(0, t) + s.substring(t, i).replace(/:/g, ";") + s.substring(i, s.length));
  let n = $e.exec(s || ""), r = {}, o = 14;
  for (; o--; )
    r[et[o]] = n[o] || "";
  return t != -1 && i != -1 && (r.source = e, r.host = r.host.substring(1, r.host.length - 1).replace(/;/g, ":"), r.authority = r.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), r.ipv6uri = !0), r.pathNames = tt(r, r.path), r.queryKey = st(r, r.query), r;
}
function tt(s, e) {
  const t = /\/{2,9}/g, i = e.replace(t, "/").split("/");
  return (e.slice(0, 1) == "/" || e.length === 0) && i.splice(0, 1), e.slice(-1) == "/" && i.splice(i.length - 1, 1), i;
}
function st(s, e) {
  const t = {};
  return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(i, n, r) {
    n && (t[n] = r);
  }), t;
}
const K = typeof addEventListener == "function" && typeof removeEventListener == "function", q = [];
K && addEventListener("offline", () => {
  q.forEach((s) => s());
}, !1);
class A extends f {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(e, t) {
    if (super(), this.binaryType = Pe, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, e && typeof e == "object" && (t = e, e = null), e) {
      const i = W(e);
      t.hostname = i.host, t.secure = i.protocol === "https" || i.protocol === "wss", t.port = i.port, i.query && (t.query = i.query);
    } else
      t.host && (t.hostname = W(t.host).host);
    z(this, t), this.secure = t.secure != null ? t.secure : typeof location < "u" && location.protocol === "https:", t.hostname && !t.port && (t.port = this.secure ? "443" : "80"), this.hostname = t.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = t.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, t.transports.forEach((i) => {
      const n = i.prototype.name;
      this.transports.push(n), this._transportsByName[n] = i;
    }), this.opts = Object.assign({
      path: "/engine.io",
      agent: !1,
      withCredentials: !1,
      upgrade: !0,
      timestampParam: "t",
      rememberUpgrade: !1,
      addTrailingSlash: !0,
      rejectUnauthorized: !0,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: !1
    }, t), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = Ue(this.opts.query)), K && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, q.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
  }
  /**
   * Creates transport of the given type.
   *
   * @param {String} name - transport name
   * @return {Transport}
   * @private
   */
  createTransport(e) {
    const t = Object.assign({}, this.opts.query);
    t.EIO = de, t.transport = e, this.id && (t.sid = this.id);
    const i = Object.assign({}, this.opts, {
      query: t,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    }, this.opts.transportOptions[e]);
    return new this._transportsByName[e](i);
  }
  /**
   * Initializes transport to use and starts probe.
   *
   * @private
   */
  _open() {
    if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    }
    const e = this.opts.rememberUpgrade && A.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
    this.readyState = "opening";
    const t = this.createTransport(e);
    t.open(), this.setTransport(t);
  }
  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @private
   */
  setTransport(e) {
    this.transport && this.transport.removeAllListeners(), this.transport = e, e.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", (t) => this._onClose("transport close", t));
  }
  /**
   * Called when connection is deemed open.
   *
   * @private
   */
  onOpen() {
    this.readyState = "open", A.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
  }
  /**
   * Handles a packet.
   *
   * @private
   */
  _onPacket(e) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing")
      switch (this.emitReserved("packet", e), this.emitReserved("heartbeat"), e.type) {
        case "open":
          this.onHandshake(JSON.parse(e.data));
          break;
        case "ping":
          this._sendPacket("pong"), this.emitReserved("ping"), this.emitReserved("pong"), this._resetPingTimeout();
          break;
        case "error":
          const t = new Error("server error");
          t.code = e.data, this._onError(t);
          break;
        case "message":
          this.emitReserved("data", e.data), this.emitReserved("message", e.data);
          break;
      }
  }
  /**
   * Called upon handshake completion.
   *
   * @param {Object} data - handshake obj
   * @private
   */
  onHandshake(e) {
    this.emitReserved("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this._pingInterval = e.pingInterval, this._pingTimeout = e.pingTimeout, this._maxPayload = e.maxPayload, this.onOpen(), this.readyState !== "closed" && this._resetPingTimeout();
  }
  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @private
   */
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    const e = this._pingInterval + this._pingTimeout;
    this._pingTimeoutTime = Date.now() + e, this._pingTimeoutTimer = this.setTimeoutFn(() => {
      this._onClose("ping timeout");
    }, e), this.opts.autoUnref && this._pingTimeoutTimer.unref();
  }
  /**
   * Called on `drain` event
   *
   * @private
   */
  _onDrain() {
    this.writeBuffer.splice(0, this._prevBufferLen), this._prevBufferLen = 0, this.writeBuffer.length === 0 ? this.emitReserved("drain") : this.flush();
  }
  /**
   * Flush write buffers.
   *
   * @private
   */
  flush() {
    if (this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      const e = this._getWritablePackets();
      this.transport.send(e), this._prevBufferLen = e.length, this.emitReserved("flush");
    }
  }
  /**
   * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
   * long-polling)
   *
   * @private
   */
  _getWritablePackets() {
    if (!(this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1))
      return this.writeBuffer;
    let t = 1;
    for (let i = 0; i < this.writeBuffer.length; i++) {
      const n = this.writeBuffer[i].data;
      if (n && (t += je(n)), i > 0 && t > this._maxPayload)
        return this.writeBuffer.slice(0, i);
      t += 2;
    }
    return this.writeBuffer;
  }
  /**
   * Checks whether the heartbeat timer has expired but the socket has not yet been notified.
   *
   * Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
   * `write()` method then the message would not be buffered by the Socket.IO client.
   *
   * @return {boolean}
   * @private
   */
  /* private */
  _hasPingExpired() {
    if (!this._pingTimeoutTime)
      return !0;
    const e = Date.now() > this._pingTimeoutTime;
    return e && (this._pingTimeoutTime = 0, j(() => {
      this._onClose("ping timeout");
    }, this.setTimeoutFn)), e;
  }
  /**
   * Sends a message.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  write(e, t, i) {
    return this._sendPacket("message", e, t, i), this;
  }
  /**
   * Sends a message. Alias of {@link Socket#write}.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  send(e, t, i) {
    return this._sendPacket("message", e, t, i), this;
  }
  /**
   * Sends a packet.
   *
   * @param {String} type: packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @private
   */
  _sendPacket(e, t, i, n) {
    if (typeof t == "function" && (n = t, t = void 0), typeof i == "function" && (n = i, i = null), this.readyState === "closing" || this.readyState === "closed")
      return;
    i = i || {}, i.compress = i.compress !== !1;
    const r = {
      type: e,
      data: t,
      options: i
    };
    this.emitReserved("packetCreate", r), this.writeBuffer.push(r), n && this.once("flush", n), this.flush();
  }
  /**
   * Closes the connection.
   */
  close() {
    const e = () => {
      this._onClose("forced close"), this.transport.close();
    }, t = () => {
      this.off("upgrade", t), this.off("upgradeError", t), e();
    }, i = () => {
      this.once("upgrade", t), this.once("upgradeError", t);
    };
    return (this.readyState === "opening" || this.readyState === "open") && (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", () => {
      this.upgrading ? i() : e();
    }) : this.upgrading ? i() : e()), this;
  }
  /**
   * Called upon transport error
   *
   * @private
   */
  _onError(e) {
    if (A.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
      return this.transports.shift(), this._open();
    this.emitReserved("error", e), this._onClose("transport error", e);
  }
  /**
   * Called upon transport close.
   *
   * @private
   */
  _onClose(e, t) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), K && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const i = q.indexOf(this._offlineEventListener);
        i !== -1 && q.splice(i, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", e, t), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
A.protocol = de;
class it extends A {
  constructor() {
    super(...arguments), this._upgrades = [];
  }
  onOpen() {
    if (super.onOpen(), this.readyState === "open" && this.opts.upgrade)
      for (let e = 0; e < this._upgrades.length; e++)
        this._probe(this._upgrades[e]);
  }
  /**
   * Probes a transport.
   *
   * @param {String} name - transport name
   * @private
   */
  _probe(e) {
    let t = this.createTransport(e), i = !1;
    A.priorWebsocketSuccess = !1;
    const n = () => {
      i || (t.send([{ type: "ping", data: "probe" }]), t.once("packet", (b) => {
        if (!i)
          if (b.type === "pong" && b.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", t), !t)
              return;
            A.priorWebsocketSuccess = t.name === "websocket", this.transport.pause(() => {
              i || this.readyState !== "closed" && (g(), this.setTransport(t), t.send([{ type: "upgrade" }]), this.emitReserved("upgrade", t), t = null, this.upgrading = !1, this.flush());
            });
          } else {
            const C = new Error("probe error");
            C.transport = t.name, this.emitReserved("upgradeError", C);
          }
      }));
    };
    function r() {
      i || (i = !0, g(), t.close(), t = null);
    }
    const o = (b) => {
      const C = new Error("probe error: " + b);
      C.transport = t.name, r(), this.emitReserved("upgradeError", C);
    };
    function c() {
      o("transport closed");
    }
    function d() {
      o("socket closed");
    }
    function k(b) {
      t && b.name !== t.name && r();
    }
    const g = () => {
      t.removeListener("open", n), t.removeListener("error", o), t.removeListener("close", c), this.off("close", d), this.off("upgrading", k);
    };
    t.once("open", n), t.once("error", o), t.once("close", c), this.once("close", d), this.once("upgrading", k), this._upgrades.indexOf("webtransport") !== -1 && e !== "webtransport" ? this.setTimeoutFn(() => {
      i || t.open();
    }, 200) : t.open();
  }
  onHandshake(e) {
    this._upgrades = this._filterUpgrades(e.upgrades), super.onHandshake(e);
  }
  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} upgrades - server upgrades
   * @private
   */
  _filterUpgrades(e) {
    const t = [];
    for (let i = 0; i < e.length; i++)
      ~this.transports.indexOf(e[i]) && t.push(e[i]);
    return t;
  }
}
let nt = class extends it {
  constructor(e, t = {}) {
    const i = typeof e == "object" ? e : t;
    (!i.transports || i.transports && typeof i.transports[0] == "string") && (i.transports = (i.transports || ["polling", "websocket", "webtransport"]).map((n) => Ye[n]).filter((n) => !!n)), super(e, i);
  }
};
function rt(s, e = "", t) {
  let i = s;
  t = t || typeof location < "u" && location, s == null && (s = t.protocol + "//" + t.host), typeof s == "string" && (s.charAt(0) === "/" && (s.charAt(1) === "/" ? s = t.protocol + s : s = t.host + s), /^(https?|wss?):\/\//.test(s) || (typeof t < "u" ? s = t.protocol + "//" + s : s = "https://" + s), i = W(s)), i.port || (/^(http|ws)$/.test(i.protocol) ? i.port = "80" : /^(http|ws)s$/.test(i.protocol) && (i.port = "443")), i.path = i.path || "/";
  const r = i.host.indexOf(":") !== -1 ? "[" + i.host + "]" : i.host;
  return i.id = i.protocol + "://" + r + ":" + i.port + e, i.href = i.protocol + "://" + r + (t && t.port === i.port ? "" : ":" + i.port), i;
}
const ot = typeof ArrayBuffer == "function", at = (s) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(s) : s.buffer instanceof ArrayBuffer, ye = Object.prototype.toString, ct = typeof Blob == "function" || typeof Blob < "u" && ye.call(Blob) === "[object BlobConstructor]", lt = typeof File == "function" || typeof File < "u" && ye.call(File) === "[object FileConstructor]";
function ee(s) {
  return ot && (s instanceof ArrayBuffer || at(s)) || ct && s instanceof Blob || lt && s instanceof File;
}
function H(s, e) {
  if (!s || typeof s != "object")
    return !1;
  if (Array.isArray(s)) {
    for (let t = 0, i = s.length; t < i; t++)
      if (H(s[t]))
        return !0;
    return !1;
  }
  if (ee(s))
    return !0;
  if (s.toJSON && typeof s.toJSON == "function" && arguments.length === 1)
    return H(s.toJSON(), !0);
  for (const t in s)
    if (Object.prototype.hasOwnProperty.call(s, t) && H(s[t]))
      return !0;
  return !1;
}
function ht(s) {
  const e = [], t = s.data, i = s;
  return i.data = X(t, e), i.attachments = e.length, { packet: i, buffers: e };
}
function X(s, e) {
  if (!s)
    return s;
  if (ee(s)) {
    const t = { _placeholder: !0, num: e.length };
    return e.push(s), t;
  } else if (Array.isArray(s)) {
    const t = new Array(s.length);
    for (let i = 0; i < s.length; i++)
      t[i] = X(s[i], e);
    return t;
  } else if (typeof s == "object" && !(s instanceof Date)) {
    const t = {};
    for (const i in s)
      Object.prototype.hasOwnProperty.call(s, i) && (t[i] = X(s[i], e));
    return t;
  }
  return s;
}
function ut(s, e) {
  return s.data = Z(s.data, e), delete s.attachments, s;
}
function Z(s, e) {
  if (!s)
    return s;
  if (s && s._placeholder === !0) {
    if (typeof s.num == "number" && s.num >= 0 && s.num < e.length)
      return e[s.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(s))
    for (let t = 0; t < s.length; t++)
      s[t] = Z(s[t], e);
  else if (typeof s == "object")
    for (const t in s)
      Object.prototype.hasOwnProperty.call(s, t) && (s[t] = Z(s[t], e));
  return s;
}
const dt = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
  // used by the Node.js EventEmitter
], ft = 5;
var u;
(function(s) {
  s[s.CONNECT = 0] = "CONNECT", s[s.DISCONNECT = 1] = "DISCONNECT", s[s.EVENT = 2] = "EVENT", s[s.ACK = 3] = "ACK", s[s.CONNECT_ERROR = 4] = "CONNECT_ERROR", s[s.BINARY_EVENT = 5] = "BINARY_EVENT", s[s.BINARY_ACK = 6] = "BINARY_ACK";
})(u || (u = {}));
class pt {
  /**
   * Encoder constructor
   *
   * @param {function} replacer - custom replacer to pass down to JSON.parse
   */
  constructor(e) {
    this.replacer = e;
  }
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */
  encode(e) {
    return (e.type === u.EVENT || e.type === u.ACK) && H(e) ? this.encodeAsBinary({
      type: e.type === u.EVENT ? u.BINARY_EVENT : u.BINARY_ACK,
      nsp: e.nsp,
      data: e.data,
      id: e.id
    }) : [this.encodeAsString(e)];
  }
  /**
   * Encode packet as string.
   */
  encodeAsString(e) {
    let t = "" + e.type;
    return (e.type === u.BINARY_EVENT || e.type === u.BINARY_ACK) && (t += e.attachments + "-"), e.nsp && e.nsp !== "/" && (t += e.nsp + ","), e.id != null && (t += e.id), e.data != null && (t += JSON.stringify(e.data, this.replacer)), t;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(e) {
    const t = ht(e), i = this.encodeAsString(t.packet), n = t.buffers;
    return n.unshift(i), n;
  }
}
function oe(s) {
  return Object.prototype.toString.call(s) === "[object Object]";
}
class te extends f {
  /**
   * Decoder constructor
   *
   * @param {function} reviver - custom reviver to pass down to JSON.stringify
   */
  constructor(e) {
    super(), this.reviver = e;
  }
  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */
  add(e) {
    let t;
    if (typeof e == "string") {
      if (this.reconstructor)
        throw new Error("got plaintext data when reconstructing a packet");
      t = this.decodeString(e);
      const i = t.type === u.BINARY_EVENT;
      i || t.type === u.BINARY_ACK ? (t.type = i ? u.EVENT : u.ACK, this.reconstructor = new vt(t), t.attachments === 0 && super.emitReserved("decoded", t)) : super.emitReserved("decoded", t);
    } else if (ee(e) || e.base64)
      if (this.reconstructor)
        t = this.reconstructor.takeBinaryData(e), t && (this.reconstructor = null, super.emitReserved("decoded", t));
      else
        throw new Error("got binary data when not reconstructing a packet");
    else
      throw new Error("Unknown type: " + e);
  }
  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */
  decodeString(e) {
    let t = 0;
    const i = {
      type: Number(e.charAt(0))
    };
    if (u[i.type] === void 0)
      throw new Error("unknown packet type " + i.type);
    if (i.type === u.BINARY_EVENT || i.type === u.BINARY_ACK) {
      const r = t + 1;
      for (; e.charAt(++t) !== "-" && t != e.length; )
        ;
      const o = e.substring(r, t);
      if (o != Number(o) || e.charAt(t) !== "-")
        throw new Error("Illegal attachments");
      i.attachments = Number(o);
    }
    if (e.charAt(t + 1) === "/") {
      const r = t + 1;
      for (; ++t && !(e.charAt(t) === "," || t === e.length); )
        ;
      i.nsp = e.substring(r, t);
    } else
      i.nsp = "/";
    const n = e.charAt(t + 1);
    if (n !== "" && Number(n) == n) {
      const r = t + 1;
      for (; ++t; ) {
        const o = e.charAt(t);
        if (o == null || Number(o) != o) {
          --t;
          break;
        }
        if (t === e.length)
          break;
      }
      i.id = Number(e.substring(r, t + 1));
    }
    if (e.charAt(++t)) {
      const r = this.tryParse(e.substr(t));
      if (te.isPayloadValid(i.type, r))
        i.data = r;
      else
        throw new Error("invalid payload");
    }
    return i;
  }
  tryParse(e) {
    try {
      return JSON.parse(e, this.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(e, t) {
    switch (e) {
      case u.CONNECT:
        return oe(t);
      case u.DISCONNECT:
        return t === void 0;
      case u.CONNECT_ERROR:
        return typeof t == "string" || oe(t);
      case u.EVENT:
      case u.BINARY_EVENT:
        return Array.isArray(t) && (typeof t[0] == "number" || typeof t[0] == "string" && dt.indexOf(t[0]) === -1);
      case u.ACK:
      case u.BINARY_ACK:
        return Array.isArray(t);
    }
  }
  /**
   * Deallocates a parser's resources
   */
  destroy() {
    this.reconstructor && (this.reconstructor.finishedReconstruction(), this.reconstructor = null);
  }
}
class vt {
  constructor(e) {
    this.packet = e, this.buffers = [], this.reconPack = e;
  }
  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   */
  takeBinaryData(e) {
    if (this.buffers.push(e), this.buffers.length === this.reconPack.attachments) {
      const t = ut(this.reconPack, this.buffers);
      return this.finishedReconstruction(), t;
    }
    return null;
  }
  /**
   * Cleans up binary packet reconstruction variables.
   */
  finishedReconstruction() {
    this.reconPack = null, this.buffers = [];
  }
}
const gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: te,
  Encoder: pt,
  get PacketType() {
    return u;
  },
  protocol: ft
}, Symbol.toStringTag, { value: "Module" }));
function y(s, e, t) {
  return s.on(e, t), function() {
    s.off(e, t);
  };
}
const mt = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class we extends f {
  /**
   * `Socket` constructor.
   */
  constructor(e, t, i) {
    super(), this.connected = !1, this.recovered = !1, this.receiveBuffer = [], this.sendBuffer = [], this._queue = [], this._queueSeq = 0, this.ids = 0, this.acks = {}, this.flags = {}, this.io = e, this.nsp = t, i && i.auth && (this.auth = i.auth), this._opts = Object.assign({}, i), this.io._autoConnect && this.open();
  }
  /**
   * Whether the socket is currently disconnected
   *
   * @example
   * const socket = io();
   *
   * socket.on("connect", () => {
   *   console.log(socket.disconnected); // false
   * });
   *
   * socket.on("disconnect", () => {
   *   console.log(socket.disconnected); // true
   * });
   */
  get disconnected() {
    return !this.connected;
  }
  /**
   * Subscribe to open, close and packet events
   *
   * @private
   */
  subEvents() {
    if (this.subs)
      return;
    const e = this.io;
    this.subs = [
      y(e, "open", this.onopen.bind(this)),
      y(e, "packet", this.onpacket.bind(this)),
      y(e, "error", this.onerror.bind(this)),
      y(e, "close", this.onclose.bind(this))
    ];
  }
  /**
   * Whether the Socket will try to reconnect when its Manager connects or reconnects.
   *
   * @example
   * const socket = io();
   *
   * console.log(socket.active); // true
   *
   * socket.on("disconnect", (reason) => {
   *   if (reason === "io server disconnect") {
   *     // the disconnection was initiated by the server, you need to manually reconnect
   *     console.log(socket.active); // false
   *   }
   *   // else the socket will automatically try to reconnect
   *   console.log(socket.active); // true
   * });
   */
  get active() {
    return !!this.subs;
  }
  /**
   * "Opens" the socket.
   *
   * @example
   * const socket = io({
   *   autoConnect: false
   * });
   *
   * socket.connect();
   */
  connect() {
    return this.connected ? this : (this.subEvents(), this.io._reconnecting || this.io.open(), this.io._readyState === "open" && this.onopen(), this);
  }
  /**
   * Alias for {@link connect()}.
   */
  open() {
    return this.connect();
  }
  /**
   * Sends a `message` event.
   *
   * This method mimics the WebSocket.send() method.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
   *
   * @example
   * socket.send("hello");
   *
   * // this is equivalent to
   * socket.emit("message", "hello");
   *
   * @return self
   */
  send(...e) {
    return e.unshift("message"), this.emit.apply(this, e), this;
  }
  /**
   * Override `emit`.
   * If the event is in `events`, it's emitted normally.
   *
   * @example
   * socket.emit("hello", "world");
   *
   * // all serializable datastructures are supported (no need to call JSON.stringify)
   * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
   *
   * // with an acknowledgement from the server
   * socket.emit("hello", "world", (val) => {
   *   // ...
   * });
   *
   * @return self
   */
  emit(e, ...t) {
    var i, n, r;
    if (mt.hasOwnProperty(e))
      throw new Error('"' + e.toString() + '" is a reserved event name');
    if (t.unshift(e), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(t), this;
    const o = {
      type: u.EVENT,
      data: t
    };
    if (o.options = {}, o.options.compress = this.flags.compress !== !1, typeof t[t.length - 1] == "function") {
      const g = this.ids++, b = t.pop();
      this._registerAckCallback(g, b), o.id = g;
    }
    const c = (n = (i = this.io.engine) === null || i === void 0 ? void 0 : i.transport) === null || n === void 0 ? void 0 : n.writable, d = this.connected && !(!((r = this.io.engine) === null || r === void 0) && r._hasPingExpired());
    return this.flags.volatile && !c || (d ? (this.notifyOutgoingListeners(o), this.packet(o)) : this.sendBuffer.push(o)), this.flags = {}, this;
  }
  /**
   * @private
   */
  _registerAckCallback(e, t) {
    var i;
    const n = (i = this.flags.timeout) !== null && i !== void 0 ? i : this._opts.ackTimeout;
    if (n === void 0) {
      this.acks[e] = t;
      return;
    }
    const r = this.io.setTimeoutFn(() => {
      delete this.acks[e];
      for (let c = 0; c < this.sendBuffer.length; c++)
        this.sendBuffer[c].id === e && this.sendBuffer.splice(c, 1);
      t.call(this, new Error("operation has timed out"));
    }, n), o = (...c) => {
      this.io.clearTimeoutFn(r), t.apply(this, c);
    };
    o.withError = !0, this.acks[e] = o;
  }
  /**
   * Emits an event and waits for an acknowledgement
   *
   * @example
   * // without timeout
   * const response = await socket.emitWithAck("hello", "world");
   *
   * // with a specific timeout
   * try {
   *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
   * } catch (err) {
   *   // the server did not acknowledge the event in the given delay
   * }
   *
   * @return a Promise that will be fulfilled when the server acknowledges the event
   */
  emitWithAck(e, ...t) {
    return new Promise((i, n) => {
      const r = (o, c) => o ? n(o) : i(c);
      r.withError = !0, t.push(r), this.emit(e, ...t);
    });
  }
  /**
   * Add the packet to the queue.
   * @param args
   * @private
   */
  _addToQueue(e) {
    let t;
    typeof e[e.length - 1] == "function" && (t = e.pop());
    const i = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: e,
      flags: Object.assign({ fromQueue: !0 }, this.flags)
    };
    e.push((n, ...r) => i !== this._queue[0] ? void 0 : (n !== null ? i.tryCount > this._opts.retries && (this._queue.shift(), t && t(n)) : (this._queue.shift(), t && t(null, ...r)), i.pending = !1, this._drainQueue())), this._queue.push(i), this._drainQueue();
  }
  /**
   * Send the first packet of the queue, and wait for an acknowledgement from the server.
   * @param force - whether to resend a packet that has not been acknowledged yet
   *
   * @private
   */
  _drainQueue(e = !1) {
    if (!this.connected || this._queue.length === 0)
      return;
    const t = this._queue[0];
    t.pending && !e || (t.pending = !0, t.tryCount++, this.flags = t.flags, this.emit.apply(this, t.args));
  }
  /**
   * Sends a packet.
   *
   * @param packet
   * @private
   */
  packet(e) {
    e.nsp = this.nsp, this.io._packet(e);
  }
  /**
   * Called upon engine `open`.
   *
   * @private
   */
  onopen() {
    typeof this.auth == "function" ? this.auth((e) => {
      this._sendConnectPacket(e);
    }) : this._sendConnectPacket(this.auth);
  }
  /**
   * Sends a CONNECT packet to initiate the Socket.IO session.
   *
   * @param data
   * @private
   */
  _sendConnectPacket(e) {
    this.packet({
      type: u.CONNECT,
      data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, e) : e
    });
  }
  /**
   * Called upon engine or manager `error`.
   *
   * @param err
   * @private
   */
  onerror(e) {
    this.connected || this.emitReserved("connect_error", e);
  }
  /**
   * Called upon engine `close`.
   *
   * @param reason
   * @param description
   * @private
   */
  onclose(e, t) {
    this.connected = !1, delete this.id, this.emitReserved("disconnect", e, t), this._clearAcks();
  }
  /**
   * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
   * the server.
   *
   * @private
   */
  _clearAcks() {
    Object.keys(this.acks).forEach((e) => {
      if (!this.sendBuffer.some((i) => String(i.id) === e)) {
        const i = this.acks[e];
        delete this.acks[e], i.withError && i.call(this, new Error("socket has been disconnected"));
      }
    });
  }
  /**
   * Called with socket packet.
   *
   * @param packet
   * @private
   */
  onpacket(e) {
    if (e.nsp === this.nsp)
      switch (e.type) {
        case u.CONNECT:
          e.data && e.data.sid ? this.onconnect(e.data.sid, e.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case u.EVENT:
        case u.BINARY_EVENT:
          this.onevent(e);
          break;
        case u.ACK:
        case u.BINARY_ACK:
          this.onack(e);
          break;
        case u.DISCONNECT:
          this.ondisconnect();
          break;
        case u.CONNECT_ERROR:
          this.destroy();
          const i = new Error(e.data.message);
          i.data = e.data.data, this.emitReserved("connect_error", i);
          break;
      }
  }
  /**
   * Called upon a server event.
   *
   * @param packet
   * @private
   */
  onevent(e) {
    const t = e.data || [];
    e.id != null && t.push(this.ack(e.id)), this.connected ? this.emitEvent(t) : this.receiveBuffer.push(Object.freeze(t));
  }
  emitEvent(e) {
    if (this._anyListeners && this._anyListeners.length) {
      const t = this._anyListeners.slice();
      for (const i of t)
        i.apply(this, e);
    }
    super.emit.apply(this, e), this._pid && e.length && typeof e[e.length - 1] == "string" && (this._lastOffset = e[e.length - 1]);
  }
  /**
   * Produces an ack callback to emit with an event.
   *
   * @private
   */
  ack(e) {
    const t = this;
    let i = !1;
    return function(...n) {
      i || (i = !0, t.packet({
        type: u.ACK,
        id: e,
        data: n
      }));
    };
  }
  /**
   * Called upon a server acknowledgement.
   *
   * @param packet
   * @private
   */
  onack(e) {
    const t = this.acks[e.id];
    typeof t == "function" && (delete this.acks[e.id], t.withError && e.data.unshift(null), t.apply(this, e.data));
  }
  /**
   * Called upon server connect.
   *
   * @private
   */
  onconnect(e, t) {
    this.id = e, this.recovered = t && this._pid === t, this._pid = t, this.connected = !0, this.emitBuffered(), this.emitReserved("connect"), this._drainQueue(!0);
  }
  /**
   * Emit buffered events (received and emitted).
   *
   * @private
   */
  emitBuffered() {
    this.receiveBuffer.forEach((e) => this.emitEvent(e)), this.receiveBuffer = [], this.sendBuffer.forEach((e) => {
      this.notifyOutgoingListeners(e), this.packet(e);
    }), this.sendBuffer = [];
  }
  /**
   * Called upon server disconnect.
   *
   * @private
   */
  ondisconnect() {
    this.destroy(), this.onclose("io server disconnect");
  }
  /**
   * Called upon forced client/server side disconnections,
   * this method ensures the manager stops tracking us and
   * that reconnections don't get triggered for this.
   *
   * @private
   */
  destroy() {
    this.subs && (this.subs.forEach((e) => e()), this.subs = void 0), this.io._destroy(this);
  }
  /**
   * Disconnects the socket manually. In that case, the socket will not try to reconnect.
   *
   * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
   *
   * @example
   * const socket = io();
   *
   * socket.on("disconnect", (reason) => {
   *   // console.log(reason); prints "io client disconnect"
   * });
   *
   * socket.disconnect();
   *
   * @return self
   */
  disconnect() {
    return this.connected && this.packet({ type: u.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
  }
  /**
   * Alias for {@link disconnect()}.
   *
   * @return self
   */
  close() {
    return this.disconnect();
  }
  /**
   * Sets the compress flag.
   *
   * @example
   * socket.compress(false).emit("hello");
   *
   * @param compress - if `true`, compresses the sending data
   * @return self
   */
  compress(e) {
    return this.flags.compress = e, this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
   * ready to send messages.
   *
   * @example
   * socket.volatile.emit("hello"); // the server may or may not receive it
   *
   * @returns self
   */
  get volatile() {
    return this.flags.volatile = !0, this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
   * given number of milliseconds have elapsed without an acknowledgement from the server:
   *
   * @example
   * socket.timeout(5000).emit("my-event", (err) => {
   *   if (err) {
   *     // the server did not acknowledge the event in the given delay
   *   }
   * });
   *
   * @returns self
   */
  timeout(e) {
    return this.flags.timeout = e, this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * @example
   * socket.onAny((event, ...args) => {
   *   console.log(`got ${event}`);
   * });
   *
   * @param listener
   */
  onAny(e) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.push(e), this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * @example
   * socket.prependAny((event, ...args) => {
   *   console.log(`got event ${event}`);
   * });
   *
   * @param listener
   */
  prependAny(e) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(e), this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`got event ${event}`);
   * }
   *
   * socket.onAny(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAny(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAny();
   *
   * @param listener
   */
  offAny(e) {
    if (!this._anyListeners)
      return this;
    if (e) {
      const t = this._anyListeners;
      for (let i = 0; i < t.length; i++)
        if (e === t[i])
          return t.splice(i, 1), this;
    } else
      this._anyListeners = [];
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAny() {
    return this._anyListeners || [];
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.onAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  onAnyOutgoing(e) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(e), this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.prependAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  prependAnyOutgoing(e) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(e), this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`sent event ${event}`);
   * }
   *
   * socket.onAnyOutgoing(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAnyOutgoing(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAnyOutgoing();
   *
   * @param [listener] - the catch-all listener (optional)
   */
  offAnyOutgoing(e) {
    if (!this._anyOutgoingListeners)
      return this;
    if (e) {
      const t = this._anyOutgoingListeners;
      for (let i = 0; i < t.length; i++)
        if (e === t[i])
          return t.splice(i, 1), this;
    } else
      this._anyOutgoingListeners = [];
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  /**
   * Notify the listeners for each packet sent
   *
   * @param packet
   *
   * @private
   */
  notifyOutgoingListeners(e) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const t = this._anyOutgoingListeners.slice();
      for (const i of t)
        i.apply(this, e.data);
    }
  }
}
function T(s) {
  s = s || {}, this.ms = s.min || 100, this.max = s.max || 1e4, this.factor = s.factor || 2, this.jitter = s.jitter > 0 && s.jitter <= 1 ? s.jitter : 0, this.attempts = 0;
}
T.prototype.duration = function() {
  var s = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var e = Math.random(), t = Math.floor(e * this.jitter * s);
    s = Math.floor(e * 10) & 1 ? s + t : s - t;
  }
  return Math.min(s, this.max) | 0;
};
T.prototype.reset = function() {
  this.attempts = 0;
};
T.prototype.setMin = function(s) {
  this.ms = s;
};
T.prototype.setMax = function(s) {
  this.max = s;
};
T.prototype.setJitter = function(s) {
  this.jitter = s;
};
class G extends f {
  constructor(e, t) {
    var i;
    super(), this.nsps = {}, this.subs = [], e && typeof e == "object" && (t = e, e = void 0), t = t || {}, t.path = t.path || "/socket.io", this.opts = t, z(this, t), this.reconnection(t.reconnection !== !1), this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0), this.reconnectionDelay(t.reconnectionDelay || 1e3), this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3), this.randomizationFactor((i = t.randomizationFactor) !== null && i !== void 0 ? i : 0.5), this.backoff = new T({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(t.timeout == null ? 2e4 : t.timeout), this._readyState = "closed", this.uri = e;
    const n = t.parser || gt;
    this.encoder = new n.Encoder(), this.decoder = new n.Decoder(), this._autoConnect = t.autoConnect !== !1, this._autoConnect && this.open();
  }
  reconnection(e) {
    return arguments.length ? (this._reconnection = !!e, e || (this.skipReconnect = !0), this) : this._reconnection;
  }
  reconnectionAttempts(e) {
    return e === void 0 ? this._reconnectionAttempts : (this._reconnectionAttempts = e, this);
  }
  reconnectionDelay(e) {
    var t;
    return e === void 0 ? this._reconnectionDelay : (this._reconnectionDelay = e, (t = this.backoff) === null || t === void 0 || t.setMin(e), this);
  }
  randomizationFactor(e) {
    var t;
    return e === void 0 ? this._randomizationFactor : (this._randomizationFactor = e, (t = this.backoff) === null || t === void 0 || t.setJitter(e), this);
  }
  reconnectionDelayMax(e) {
    var t;
    return e === void 0 ? this._reconnectionDelayMax : (this._reconnectionDelayMax = e, (t = this.backoff) === null || t === void 0 || t.setMax(e), this);
  }
  timeout(e) {
    return arguments.length ? (this._timeout = e, this) : this._timeout;
  }
  /**
   * Starts trying to reconnect if reconnection is enabled and we have not
   * started reconnecting yet
   *
   * @private
   */
  maybeReconnectOnOpen() {
    !this._reconnecting && this._reconnection && this.backoff.attempts === 0 && this.reconnect();
  }
  /**
   * Sets the current transport `socket`.
   *
   * @param {Function} fn - optional, callback
   * @return self
   * @public
   */
  open(e) {
    if (~this._readyState.indexOf("open"))
      return this;
    this.engine = new nt(this.uri, this.opts);
    const t = this.engine, i = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const n = y(t, "open", function() {
      i.onopen(), e && e();
    }), r = (c) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", c), e ? e(c) : this.maybeReconnectOnOpen();
    }, o = y(t, "error", r);
    if (this._timeout !== !1) {
      const c = this._timeout, d = this.setTimeoutFn(() => {
        n(), r(new Error("timeout")), t.close();
      }, c);
      this.opts.autoUnref && d.unref(), this.subs.push(() => {
        this.clearTimeoutFn(d);
      });
    }
    return this.subs.push(n), this.subs.push(o), this;
  }
  /**
   * Alias for open()
   *
   * @return self
   * @public
   */
  connect(e) {
    return this.open(e);
  }
  /**
   * Called upon transport open.
   *
   * @private
   */
  onopen() {
    this.cleanup(), this._readyState = "open", this.emitReserved("open");
    const e = this.engine;
    this.subs.push(
      y(e, "ping", this.onping.bind(this)),
      y(e, "data", this.ondata.bind(this)),
      y(e, "error", this.onerror.bind(this)),
      y(e, "close", this.onclose.bind(this)),
      // @ts-ignore
      y(this.decoder, "decoded", this.ondecoded.bind(this))
    );
  }
  /**
   * Called upon a ping.
   *
   * @private
   */
  onping() {
    this.emitReserved("ping");
  }
  /**
   * Called with data.
   *
   * @private
   */
  ondata(e) {
    try {
      this.decoder.add(e);
    } catch (t) {
      this.onclose("parse error", t);
    }
  }
  /**
   * Called when parser fully decodes a packet.
   *
   * @private
   */
  ondecoded(e) {
    j(() => {
      this.emitReserved("packet", e);
    }, this.setTimeoutFn);
  }
  /**
   * Called upon socket error.
   *
   * @private
   */
  onerror(e) {
    this.emitReserved("error", e);
  }
  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @public
   */
  socket(e, t) {
    let i = this.nsps[e];
    return i ? this._autoConnect && !i.active && i.connect() : (i = new we(this, e, t), this.nsps[e] = i), i;
  }
  /**
   * Called upon a socket close.
   *
   * @param socket
   * @private
   */
  _destroy(e) {
    const t = Object.keys(this.nsps);
    for (const i of t)
      if (this.nsps[i].active)
        return;
    this._close();
  }
  /**
   * Writes a packet.
   *
   * @param packet
   * @private
   */
  _packet(e) {
    const t = this.encoder.encode(e);
    for (let i = 0; i < t.length; i++)
      this.engine.write(t[i], e.options);
  }
  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @private
   */
  cleanup() {
    this.subs.forEach((e) => e()), this.subs.length = 0, this.decoder.destroy();
  }
  /**
   * Close the current socket.
   *
   * @private
   */
  _close() {
    this.skipReconnect = !0, this._reconnecting = !1, this.onclose("forced close");
  }
  /**
   * Alias for close()
   *
   * @private
   */
  disconnect() {
    return this._close();
  }
  /**
   * Called when:
   *
   * - the low-level engine is closed
   * - the parser encountered a badly formatted packet
   * - all sockets are disconnected
   *
   * @private
   */
  onclose(e, t) {
    var i;
    this.cleanup(), (i = this.engine) === null || i === void 0 || i.close(), this.backoff.reset(), this._readyState = "closed", this.emitReserved("close", e, t), this._reconnection && !this.skipReconnect && this.reconnect();
  }
  /**
   * Attempt a reconnection.
   *
   * @private
   */
  reconnect() {
    if (this._reconnecting || this.skipReconnect)
      return this;
    const e = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      this.backoff.reset(), this.emitReserved("reconnect_failed"), this._reconnecting = !1;
    else {
      const t = this.backoff.duration();
      this._reconnecting = !0;
      const i = this.setTimeoutFn(() => {
        e.skipReconnect || (this.emitReserved("reconnect_attempt", e.backoff.attempts), !e.skipReconnect && e.open((n) => {
          n ? (e._reconnecting = !1, e.reconnect(), this.emitReserved("reconnect_error", n)) : e.onreconnect();
        }));
      }, t);
      this.opts.autoUnref && i.unref(), this.subs.push(() => {
        this.clearTimeoutFn(i);
      });
    }
  }
  /**
   * Called upon successful reconnect.
   *
   * @private
   */
  onreconnect() {
    const e = this.backoff.attempts;
    this._reconnecting = !1, this.backoff.reset(), this.emitReserved("reconnect", e);
  }
}
const V = {};
function N(s, e) {
  typeof s == "object" && (e = s, s = void 0), e = e || {};
  const t = rt(s, e.path || "/socket.io"), i = t.source, n = t.id, r = t.path, o = V[n] && r in V[n].nsps, c = e.forceNew || e["force new connection"] || e.multiplex === !1 || o;
  let d;
  return c ? d = new G(i, e) : (V[n] || (V[n] = new G(i, e)), d = V[n]), t.query && !e.query && (e.query = t.queryKey), d.socket(t.path, e);
}
Object.assign(N, {
  Manager: G,
  Socket: we,
  io: N,
  connect: N
});
const yt = "data:image/jpeg;base64,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";
const wt = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [i, n] of e)
    t[i] = n;
  return t;
}, xt = {
  name: "ChatWidget",
  props: {
    token: {
      type: String,
      required: !0
    },
    assistantId: {
      type: String,
      required: !1,
      default: ""
    },
    welcomeTitle: {
      type: String,
      default: "  خوش آمدید"
    },
    initialMessage: {
      type: String,
      default: "سلام  ما خوش آمدی "
    },
    defaultQuestion: {
      type: String,
      default: ""
    },
    suggestedQuestions: {
      type: Array,
      default: () => [
        ""
      ]
    },
    apiBaseUrl: {
      type: String,
      default: "https://api.vafaai.com"
    }
  },
  computed: {
    // Filter categories based on search query
    filteredCategories() {
      if (!this.knowledgeSearchQuery.trim())
        return this.knowledgeData;
      const s = this.knowledgeSearchQuery.trim().toLowerCase();
      return this.knowledgeData.filter((e) => e.title.toLowerCase().includes(s) || e.description.toLowerCase().includes(s) ? !0 : e.questions.some(
        (t) => t.question.toLowerCase().includes(s) || t.answer.toLowerCase().includes(s)
      ));
    },
    // Filter questions based on search query
    filteredQuestions() {
      if (!this.selectedCategory)
        return [];
      if (!this.knowledgeSearchQuery.trim())
        return this.selectedCategory.questions;
      const s = this.knowledgeSearchQuery.trim().toLowerCase();
      return this.selectedCategory.questions.filter(
        (e) => e.question.toLowerCase().includes(s) || e.answer.toLowerCase().includes(s)
      );
    }
  },
  data() {
    return {
      justCompleted: !1,
      pendingMessage: null,
      isOpen: !1,
      hasInteracted: !1,
      isMaximize: !1,
      isMobile: !1,
      inputMessage: "",
      messages: [],
      socket: null,
      connectionStatus: "آنلاین",
      connectionColor: "green",
      sessionData: {
        id: null,
        initialized: !1
      },
      isThinking: !1,
      currentStreamingMessage: null,
      messageTimeout: null,
      // For detecting timeouts
      socketUrl: null,
      // Use the suggestedQuestions from props instead of hardcoding them
      defaultQuestions: this.suggestedQuestions,
      showDefaultQuestions: !0,
      initialMessage: "سلام  خوش آمدی",
      userId: null,
      currentTab: "home",
      // Knowledge Base Data
      knowledgeData: [],
      allQuestions: [],
      // Flat list of all questions for easier access
      featuredQuestions: [],
      // Will be loaded from API based on inHome flag
      knowledgeView: "categories",
      // categories, questions, answer
      knowledgeViewTitle: "راهنما",
      knowledgeSearchQuery: "",
      selectedCategory: null,
      selectedQuestion: null,
      showResetConfirmation: !1
    };
  },
  mounted() {
    this.userId = localStorage.getItem("hascowebchat_user_id"), this.userId || (this.userId = "user_" + Math.random().toString(36).substr(2, 9), localStorage.setItem("hascowebchat_user_id", this.userId)), this.loadKnowledgeBaseData(), this.loadMessagesFromLocalStorage(), console.log("ChatWidget mounted with userId:", this.userId);
    const s = localStorage.getItem("lastSessionId");
    s && (console.log("Found existing session ID:", s), this.sessionData.id = s), this.messages.length === 0 && (this.messages.push({
      content: this.initialMessage,
      isUser: !1,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }), this.saveMessagesToLocalStorage()), this.hasInteracted = localStorage.getItem("hascowebchat_interacted") === "true", this.socketUrl = `${this.apiBaseUrl}?token=${this.token}`, console.log("Socket URL set to:", this.socketUrl), setTimeout(() => {
      this.initSocket();
    }, 500), this.setShakeTimer(), document.addEventListener("click", this.resetShakeTimer), document.addEventListener("mousemove", this.resetShakeTimer), document.addEventListener("keypress", this.resetShakeTimer), document.addEventListener("scroll", this.resetShakeTimer);
    const e = document.getElementById("hascowebchat-button");
    e && e.addEventListener("animationend", () => {
      this.hasInteracted = !0;
    });
  },
  created() {
    this.checkMobile(), window.addEventListener("resize", this.checkMobile);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.resetShakeTimer), document.removeEventListener("mousemove", this.resetShakeTimer), document.removeEventListener("keypress", this.resetShakeTimer), document.removeEventListener("scroll", this.resetShakeTimer), window.removeEventListener("resize", this.checkMobile), this.socket && (this.socket.disconnect(), this.socket.removeAllListeners()), this.shakeTimer && clearTimeout(this.shakeTimer), this.messageTimeout && clearTimeout(this.messageTimeout);
  },
  methods: {
    // Load knowledge base data from API
    async loadKnowledgeBaseData() {
      try {
        if (!this.assistantId) {
          console.warn("No assistantId provided, cannot load knowledge base"), this.knowledgeData = [], this.allQuestions = [], this.featuredQuestions = [];
          return;
        }
        const s = await fetch(`${this.apiBaseUrl}/public/kb/${this.assistantId}`);
        if (!s.ok)
          throw new Error(`Failed to fetch knowledge base: ${s.status}`);
        const e = await s.json();
        e.success && e.data && e.data.categories ? (this.knowledgeData = e.data.categories, this.allQuestions = [], this.knowledgeData.forEach((t) => {
          t.questions.forEach((i) => {
            this.allQuestions.push({
              ...i,
              categoryId: t.id,
              categoryTitle: t.title
            });
          });
        }), this.loadFeaturedQuestions(), console.log(`Loaded knowledge base with ${this.knowledgeData.length} categories and ${this.allQuestions.length} questions`)) : (console.warn("Knowledge base data not found or empty"), this.knowledgeData = [], this.allQuestions = [], this.featuredQuestions = []);
      } catch (s) {
        console.error("Error loading knowledge base data:", s), this.knowledgeData = [], this.allQuestions = [], this.featuredQuestions = [];
      }
    },
    // Load featured questions from API (questions with inHome=true)
    async loadFeaturedQuestions() {
      try {
        if (!this.assistantId) {
          console.warn("No assistantId provided, cannot load featured questions"), this.featuredQuestions = [];
          return;
        }
        const s = await fetch(`${this.apiBaseUrl}/public/kb/${this.assistantId}/featured`);
        if (!s.ok)
          throw new Error(`Failed to fetch featured questions: ${s.status}`);
        const e = await s.json();
        e.success && e.data && e.data.featuredQuestions ? (this.featuredQuestions = e.data.featuredQuestions, console.log(`Loaded ${this.featuredQuestions.length} featured questions`)) : (console.warn("Featured questions not found or empty"), this.featuredQuestions = []);
      } catch (s) {
        console.error("Error loading featured questions:", s), this.featuredQuestions = [];
      }
    },
    loadMessagesFromLocalStorage() {
      if (this.userId)
        try {
          const s = this.token ? `vafachat_messages_${this.userId}_${this.token}` : `vafachat_messages_${this.userId}`, e = localStorage.getItem(s);
          if (e) {
            const t = JSON.parse(e);
            Array.isArray(t) && t.length > 0 && (this.messages = t, console.log(
              `Loaded ${t.length} messages from localStorage using key: ${s}`
            ), this.$nextTick(() => {
              this.scrollToBottom();
            }));
          }
        } catch (s) {
          console.error("Error loading chat history:", s);
        }
    },
    saveMessagesToLocalStorage() {
      if (this.userId)
        try {
          const s = this.token ? `vafachat_messages_${this.userId}_${this.token}` : `vafachat_messages_${this.userId}`, e = this.messages.map((t) => ({
            content: t.content,
            isUser: t.isUser,
            isImage: t.isImage || !1,
            isError: t.isError || !1,
            timestamp: t.timestamp || (/* @__PURE__ */ new Date()).toISOString()
          }));
          localStorage.setItem(s, JSON.stringify(e)), console.log(`Saved ${e.length} messages to localStorage with key: ${s}`);
        } catch (s) {
          console.error("Error saving chat history:", s);
        }
    },
    // Define threshold for mobile (768px or smaller)
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    // Get question by ID
    getQuestionById(s) {
      return this.allQuestions.find((t) => t.id === s) || { question: "سوال یافت نشد", answer: "" };
    },
    // Navigate to a specific question
    navigateToQuestion(s) {
      const e = this.getQuestionById(s);
      if (e) {
        const t = this.knowledgeData.find(
          (i) => i.id === e.categoryId
        );
        t && (this.switchTab("knowledge"), this.selectedCategory = t, this.knowledgeView = "questions", this.knowledgeViewTitle = t.title, this.$nextTick(() => {
          this.selectQuestion(e);
        }));
      }
    },
    // Focus on search input
    focusOnSearch() {
      this.$nextTick(() => {
        this.$refs.homeSearchInput && this.$refs.homeSearchInput.focus();
      });
    },
    // Show knowledge section when search is focused
    showKnowledgeSearch() {
      this.switchTab("knowledge"), this.$nextTick(() => {
        const s = document.querySelector(
          ".knowledge-search-input"
        );
        s && s.focus();
      });
    },
    // Filter categories based on search query
    searchKnowledgeBase() {
      this.knowledgeView === "answer" && (this.knowledgeView = "categories");
    },
    // Select a category to view its questions
    selectCategory(s) {
      this.selectedCategory = s, this.knowledgeView = "questions", this.knowledgeViewTitle = s.title;
    },
    // Select a question to view its answer
    selectQuestion(s) {
      this.selectedQuestion = s, this.knowledgeView = "answer";
    },
    // Go back in knowledge base navigation
    goBackKnowledge() {
      this.knowledgeView === "questions" ? (this.knowledgeView = "categories", this.knowledgeViewTitle = "راهنما") : this.knowledgeView === "answer" && (this.knowledgeView = "questions", this.knowledgeViewTitle = this.selectedCategory.title);
    },
    // Reset to main categories view
    resetToCategories() {
      this.knowledgeView = "categories", this.knowledgeViewTitle = "راهنما";
    },
    switchTab(s) {
      this.currentTab = s, this.isMaximize = !1, s === "messenger" && this.$nextTick(() => {
        this.scrollToBottom();
      }), s === "knowledge" && (this.knowledgeView = "categories", this.knowledgeViewTitle = "راهنما", this.knowledgeSearchQuery = "");
    },
    selectDefaultQuestion(s) {
      this.inputMessage = s, this.sendMessage(), this.showDefaultQuestions = !1;
    },
    initSocket() {
      try {
        this.socket && (console.log("Cleaning up existing socket connection"), this.socket.disconnect(), this.socket.removeAllListeners(), this.socket = null), this.socketUrl = this.apiBaseUrl, console.log("Using socket URL:", this.socketUrl);
        const s = {
          reconnection: !0,
          reconnectionAttempts: 5,
          reconnectionDelay: 1e3,
          timeout: 6e4,
          // 60 second timeout for responses
          transports: ["websocket", "polling"]
          // Prefer websocket for better streaming
        };
        this.token && (s.auth = { token: this.token }, console.log("Using token for authentication")), console.log("Connecting to socket server:", this.socketUrl), this.socket = N(this.socketUrl, s), this.socket.on("connect", () => {
          console.log("Connected to socket server, socket id:", this.socket.id), this.connectionStatus = "متصل شد", this.connectionColor = "green", this.sessionData.id && (console.log("Reregistering existing session:", this.sessionData.id), this.socket.emit("register_session", {
            sessionId: this.sessionData.id,
            userId: this.userId
          }));
        }), this.socket.on("disconnect", (t) => {
          console.log("Disconnected from socket server. Reason:", t), this.connectionStatus = "قطع شد", this.connectionColor = "red", (t === "io server disconnect" || t === "transport close") && (console.log("Attempting to reconnect..."), this.socket.connect());
        }), this.socket.on("connect_error", (t) => {
          console.error("Socket connection error:", t), this.connectionStatus = "خطا در اتصال", this.connectionColor = "red";
        }), this.socket.on("session_created", (t) => {
          console.log("Session created/joined:", t), this.sessionData.id = t.sessionId, this.sessionData.initialized = !0, localStorage.setItem("lastSessionId", t.sessionId), this.connectionStatus = "آماده گفتگو", this.connectionColor = "green";
        });
        const e = (t) => (i) => {
          console.log(`Received ${t} event:`, i), this.messageTimeout && (clearTimeout(this.messageTimeout), this.messageTimeout = null), this.handleResponseData(i);
        };
        this.socket.on("bot_response", e("bot_response")), this.socket.on("message", e("message")), this.socket.on("assistant_message", e("assistant_message")), this.socket.on("error", (t) => {
          console.error("Socket error:", t), this.messageTimeout && (clearTimeout(this.messageTimeout), this.messageTimeout = null), this.isThinking = !1, this.addErrorMessage(
            typeof t == "string" ? t : t.message || "خطای ناشناخته"
          );
        }), this.socket.onAny((t, ...i) => {
          console.log(`Socket event '${t}' received:`, i);
        });
      } catch (s) {
        console.error("Error in initSocket:", s), this.connectionStatus = "خطا در اتصال", this.addErrorMessage("خطا در اتصال به سرور: " + s.message);
      }
    },
    startConversationWithDefaultQuestion() {
      this.isOpen = !0, this.hasInteracted = !0, localStorage.setItem("hascowebchat_interacted", "true"), this.currentTab = "messenger";
    },
    toggleChat() {
      this.isOpen = !this.isOpen, this.hasInteracted = !0, localStorage.setItem("hascowebchat_interacted", "true"), this.isOpen && this.$nextTick(() => {
        const s = document.getElementById("hascowebchat-input");
        s && s.focus();
      });
    },
    closeChat() {
      this.isOpen = !1, this.isMaximize = !1;
    },
    resetChat() {
      this.messages = [], this.showResetConfirmation = !1, this.currentResponse = "", this.isTyping = !1, this.sessionData = {
        id: null,
        initialized: !1
      }, this.inputMessage = "", this.showDefaultQuestions = !0, this.saveMessagesToLocalStorage(), this.switchTab("home");
    },
    toggleResetConfirmation() {
      console.log("Toggling reset confirmation popup", !this.showResetConfirmation), this.showResetConfirmation = !this.showResetConfirmation;
    },
    sendMessage() {
      if (!this.inputMessage.trim())
        return;
      this.isOpen === !1 && (this.isOpen = !0, this.hasInteracted = !0, localStorage.setItem("hascowebchat_interacted", "true"), this.resetShakeTimer()), this.showDefaultQuestions = !1;
      const s = this.inputMessage.trim();
      if (this.inputMessage = "", this.messages.push({
        content: s,
        isUser: !0,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }), this.$nextTick(() => {
        this.scrollToBottom();
      }), this.isThinking = !0, this.socket && this.socket.connected) {
        console.log("Sending message to server:", {
          userId: this.userId,
          sessionId: this.sessionData.id || null,
          message: s
        }), this.messageTimeout && clearTimeout(this.messageTimeout), this.messageTimeout = setTimeout(() => {
          this.isThinking && (console.warn("No response received from server within timeout"), this.isThinking = !1, this.addErrorMessage("پاسخی از سرور دریافت نشد. لطفاً مجدداً تلاش کنید."));
        }, 3e4);
        const e = {
          userId: this.userId,
          sessionId: this.sessionData.id || null,
          message: s,
          assistant_id: this.assistantId || ""
        };
        this.socket.emit("chat message", e), this.socket.emit("send_message", e), this.socket.connected || (console.error("Socket appears connected but emit failed"), this.handleSendFailure());
      } else
        console.error("Socket not connected. Cannot send message."), this.handleSendFailure(), console.log("Attempting to reestablish connection..."), this.initSocket(), setTimeout(() => {
          this.socket && this.socket.connected ? (console.log("Connection reestablished, retrying message send"), this.socket.emit("chat message", {
            userId: this.userId,
            sessionId: this.sessionData.id || null,
            message: s,
            assistant_id: this.assistantId || ""
          })) : console.error("Reconnection failed, message not sent");
        }, 3e3);
      this.saveMessagesToLocalStorage();
    },
    // Helper method to handle send failures consistently
    handleSendFailure() {
      this.isThinking = !1, this.addErrorMessage("اتصال به سرور برقرار نیست. لطفاً صفحه را رفرش کنید و مجدداً تلاش کنید.");
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.chatBody && (this.$refs.chatBody.scrollTop = this.$refs.chatBody.scrollHeight);
      });
    },
    handleResponseData(s) {
      if (s) {
        if (s.type)
          switch (s.type) {
            case "thinking":
              this.isThinking = !0;
              return;
            case "chunk": {
              const e = s.message || s.content || s.text || "";
              e && (this.pendingMessage ? this.pendingMessage += e : this.pendingMessage = e);
              return;
            }
            case "complete": {
              this.isThinking = !1;
              let e = this.pendingMessage || s.message || s.content || s.text || "";
              const t = Date.now() + "-" + Math.random().toString(36).substring(2, 9);
              if (console.log(`Processing complete message with ID: ${t}`), this.messages.some(
                (r) => !r.isUser && r.content === this.processMessageWithImages(e) && (/* @__PURE__ */ new Date()).getTime() - new Date(r.timestamp).getTime() < 2e3
              )) {
                console.warn("Duplicate message detected, not adding to UI"), this.pendingMessage = null;
                return;
              }
              const n = this.processMessageWithImages(e);
              n ? (console.log("Adding complete message to UI:", n), this.messages.push({
                content: n,
                isUser: !1,
                timestamp: (/* @__PURE__ */ new Date()).toISOString(),
                messageId: t
              }), this.saveMessagesToLocalStorage(), this.$nextTick(() => {
                this.scrollToBottom();
              })) : console.warn("No content to display for complete message"), this.pendingMessage = null, this.justCompleted = !0, setTimeout(() => {
                this.justCompleted = !1;
              }, 3e3);
              return;
            }
            case "error":
              this.addErrorMessage(s.message || "خطایی رخ داد");
              return;
          }
        if (typeof s == "string") {
          this.addBotMessage(s);
          return;
        }
        if (s.content, s.message) {
          this.addBotMessage(s.message);
          return;
        }
        if (s.text) {
          this.addBotMessage(s.text);
          return;
        }
        console.warn("Unknown response format:", s), this.addBotMessage(JSON.stringify(s));
      }
    },
    addBotMessageChunk(s = "") {
      const e = s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      this.pendingMessage ? this.pendingMessage += e : this.pendingMessage = e, this.isThinking = !0;
    },
    addErrorMessage(s) {
      s && (this.messages.push({
        content: s,
        isUser: !1,
        isError: !0,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }), this.saveMessagesToLocalStorage(), this.$nextTick(() => {
        this.scrollToBottom();
      }));
    },
    processMessageWithImages(s) {
      if (!s)
        return "";
      console.log("Processing message for images:", s);
      try {
        let e = s, t;
        const i = /!\[(.*?)\]\((http[s]?:\/\/[^\s)]+)\)/g;
        for (; (t = i.exec(s)) !== null; ) {
          const n = t[0], r = t[1], o = t[2];
          console.log(
            `Found image: ${o} with alt text: ${r}`
          );
          const c = `__IMAGE_PLACEHOLDER_${Math.random().toString(36).substring(2, 15)}__`;
          e = e.replace(
            n,
            c
          );
          const d = `<div class="message-image-container"><img src="${o}" alt="${r}" class="message-image" style="max-width:100%;height:auto;display:block;margin:10px auto;"></div>`;
          e = e.replace(
            c,
            d
          );
        }
        return console.log("Processed message:", e), e;
      } catch (e) {
        return console.error("Error processing images:", e), s;
      }
    },
    setShakeTimer() {
      this.shakeTimer && clearTimeout(this.shakeTimer), this.shakeTimer = setTimeout(() => {
        if (!this.hasInteracted && !this.isOpen) {
          const s = document.getElementById(
            "hascowebchat-button"
          );
          s && (s.style.animation = "none", s.offsetHeight, s.style.animation = null, this.hasInteracted = !1);
        }
      }, 12e4);
    },
    resetShakeTimer() {
      this.setShakeTimer();
    }
  }
}, kt = { class: "v-fixed v-flex v-flex-col v-gap-2 v-right-[20px] v-bottom-[20px]" }, bt = ["innerHTML"], At = {
  key: 0,
  class: "v-py-4 v-px-3 v-bg-white v-text-slate-800 v-flex v-items-center v-relative v-flex-row v-border-b v-border-slate-200"
}, Rt = { class: "v-flex v-justify-between v-items-center v-flex-1 v-gap-2" }, Et = { class: "v-flex v-grow v-flex-col v-gap-[2px]" }, Tt = { class: "v-text-xs" }, Ct = { class: "v-flex v-gap-2" }, St = {
  key: 0,
  viewBox: "0 0 512 512",
  fill: "currentColor",
  width: "16px",
  height: "16px"
}, It = {
  key: 1,
  viewBox: "0 0 512 512",
  fill: "currentColor",
  width: "16px",
  height: "16px"
}, Vt = {
  key: 1,
  class: "v-bg-white v-py-4 v-px-3"
}, Bt = { class: "v-py-4 v-px-3 v-bg-[#1a237e] v-text-white v-flex v-items-center v-relative v-flex-row v-rounded-lg" }, Lt = { class: "v-flex v-justify-between v-items-center v-flex-1 v-gap-2" }, Ot = { class: "v-flex v-grow v-flex-col v-gap-[2px]" }, Pt = { class: "v-text-xs" }, qt = { class: "v-flex v-gap-2" }, Ht = {
  key: 2,
  class: "v-py-4 v-px-3 v-bg-white v-text-slate-800 v-flex v-items-center v-relative v-flex-row v-border-b v-border-slate-200"
}, Nt = {
  key: 1,
  class: "v-p-2 v-rounded-lg v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center"
}, jt = {
  key: 3,
  class: "v-relative v-flex v-flex-col v-h-full v-justify-between v-bg-white"
}, zt = { class: "v-px-3" }, Qt = { class: "v-p-2 v-rounded-lg v-border v-border-slate-200 v-bg-white v-flex v-flex-col v-gap-[2px]" }, Ut = ["onClick"], Dt = { class: "v-flex-1 v-text-sm v-text-slate-800 v-overflow-hidden v-whitespace-nowrap v-truncate" }, Mt = { class: "v-px-3 v-pb-4" }, _t = {
  key: 4,
  class: "v-relative v-flex v-flex-col v-h-full v-justify-between v-bg-white v-py-2 v-px-3 v-overflow-auto",
  ref: "chatBody"
}, Ft = { class: "v-grow" }, Wt = ["innerHTML"], Kt = {
  key: 0,
  class: "hascowebchat-message hascowebchat-bot-message typing-animation",
  style: { "font-style": "italic", opacity: "0.8" }
}, Xt = {
  key: 0,
  class: "v-flex v-flex-col v-gap-2"
}, Zt = ["onClick"], Gt = {
  key: 5,
  class: "v-relative v-flex v-h-full v-overflow-hidden v-p-0 v-justify-start v-flex-col v-items-stretch"
}, Jt = { class: "v-py-2 v-px-3 v-border-b v-border-slate-200 v-bg-white" }, Yt = { class: "v-flex v-items-center v-justify-between v-rounded-lg v-bg-slate-100" }, $t = {
  key: 0,
  class: "v-relative v-flex v-flex-col v-h-full v-bg-white v-overflow-auto"
}, es = { class: "v-py-2 v-px-3 v-border-b v-border-slate-200" }, ts = { class: "v-text-md v-text-slate-800 v-font-semibold" }, ss = ["onClick"], is = { class: "v-flex-1 v-flex v-flex-col v-gap-1" }, ns = { class: "v-text-sm v-text-slate-800 v-font-semibold" }, rs = { class: "v-text-sm v-text-slate-800" }, os = { class: "v-text-sm v-text-slate-600" }, as = {
  key: 1,
  class: "v-bg-white v-flex v-flex-col v-grow v-overflow-auto"
}, cs = { class: "v-py-2 v-px-3 v-border-b v-border-slate-200 v-gap-1 v-flex v-flex-col" }, ls = { class: "v-text-sm v-text-slate-800 v-font-semibold" }, hs = { class: "v-text-sm v-text-slate-800" }, us = { class: "v-text-sm v-text-slate-600" }, ds = ["onClick"], fs = { class: "v-text-sm v-text-slate-800" }, ps = {
  key: 2,
  class: "v-bg-white v-flex v-flex-col v-grow v-overflow-auto"
}, vs = { class: "v-py-2 v-px-3 v-border-b v-border-slate-200 v-text-sm v-text-slate-800 v-font-semibold" }, gs = { class: "v-py-2 v-px-3 v-text-sm v-text-slate-800" }, ms = {
  key: 6,
  class: "v-py-2 v-px-3 v-bg-white v-border-t v-border-slate-200"
}, ys = { class: "v-flex v-items-center v-bg-white v-rounded-full v-border v-border-slate-200" }, ws = {
  key: 7,
  class: "v-flex v-justify-around v-items-center v-gap-2 v-bg-white v-py-2 v-h-[60px] v-border-t v-border-slate-200"
}, xs = {
  key: 0,
  viewBox: "0 0 576 512",
  fill: "currentColor",
  width: "20px",
  height: "20px"
}, ks = {
  key: 1,
  viewBox: "0 0 576 512",
  fill: "currentColor",
  width: "20px",
  height: "20px"
}, bs = {
  key: 0,
  viewBox: "0 0 512 512",
  fill: "currentColor",
  width: "20px",
  height: "20px"
}, As = {
  key: 1,
  viewBox: "0 0 512 512",
  fill: "currentColor",
  width: "20px",
  height: "20px"
}, Rs = {
  key: 0,
  viewBox: "0 0 448 512",
  fill: "currentColor",
  width: "20px",
  height: "20px"
}, Es = {
  key: 1,
  viewBox: "0 0 448 512",
  fill: "currentColor",
  width: "20px",
  height: "20px"
}, Ts = { class: "reset-confirmation-overlay" }, Cs = { class: "reset-confirmation-content" }, Ss = { class: "v-flex v-justify-center v-gap-3 v-mt-4" };
function Is(s, e, t, i, n, r) {
  return l(), h("div", kt, [
    a("div", {
      class: "v-bg-white v-border v-border-slate-200 v-rounded-lg v-rounded-br-sm v-py-2 v-px-3 v-text-sm v-cursor-pointer v-w-fit v-hover:bg-slate-100 v-transition-colors v-duration-300",
      onClick: e[0] || (e[0] = (...o) => r.startConversationWithDefaultQuestion && r.startConversationWithDefaultQuestion(...o)),
      innerHTML: t.defaultQuestion
    }, null, 8, bt),
    a("div", {
      class: R(["v-bg-white v-border-1 v-border-bd v-flex v-items-center v-justify-center v-rounded-full v-h-[60px] v-w-[60px] v-z-70 no-shake v-overflow-hidden v-cursor-pointer", { "no-shake": n.hasInteracted }]),
      onClick: e[1] || (e[1] = (...o) => r.toggleChat && r.toggleChat(...o))
    }, e[24] || (e[24] = [
      a("img", {
        src: "https://vafaai.com/widget/images/logo.svg",
        alt: "Chat",
        class: "v-h-[32px]"
      }, null, -1)
    ]), 2),
    E(a("div", {
      class: R(["v-fixed v-transition-all v-duration-300 v-right-[20px] v-bottom-[20px] v-rounded-md v-overflow-hidden v-z-90 v-flex v-flex-col v-shadow-[0_10px_25px_rgba(0,0,0,0.2)]", { "v-max-h-[calc(100%-104px)] v-h-[calc(100%-104px)] v-w-[688px]": n.isMaximize, "v-w-[400px] v-h-[700px] v-max-h-[min(714px,100%-30px)]": !n.isMaximize, "v-right-0 v-bottom-0 v-top-0 v-rounded-none v-h-full v-max-h-100vh v-w-full": n.isMobile }])
    }, [
      n.currentTab === "messenger" ? (l(), h("div", At, [
        a("div", Rt, [
          n.currentTab !== "home" ? (l(), h("div", {
            key: 0,
            class: "v-p-2 v-rounded-lg v-cursor-pointer v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#2222220f] v-transition-colors v-duration-300",
            onClick: e[2] || (e[2] = (o) => r.switchTab("home"))
          }, e[25] || (e[25] = [
            a("svg", {
              viewBox: "0 0 320 512",
              fill: "currentColor",
              width: "16px",
              height: "16px"
            }, [
              a("path", { d: "M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z" })
            ], -1)
          ]))) : p("", !0),
          e[27] || (e[27] = a("img", {
            src: "https://vafaai.com/widget/images/logo.svg",
            alt: "Support Profile",
            class: "v-w-[32px] v-h-[32px]"
          }, null, -1)),
          a("div", Et, [
            e[26] || (e[26] = a("div", { class: "v-text-sm v-font-semibold" }, "پشتیبانی هوشمند ما", -1)),
            a("div", Tt, v(n.connectionStatus), 1)
          ])
        ]),
        a("div", Ct, [
          n.isMobile ? p("", !0) : (l(), h("div", {
            key: 0,
            class: "v-p-2 v-rounded-lg v-cursor-pointer v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#2222220f] v-transition-colors v-duration-300",
            onClick: e[3] || (e[3] = (o) => n.isMaximize = !n.isMaximize)
          }, [
            n.isMaximize ? (l(), h("svg", St, e[28] || (e[28] = [
              a("path", { d: "M489 57c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-135 135L320 72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 144c0 13.3 10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-86.1 0L489 57zM23 455c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l135-135 0 86.1c0 13.3 10.7 24 24 24s24-10.7 24-24l0-144c0-13.3-10.7-24-24-24L72 272c-13.3 0-24 10.7-24 24s10.7 24 24 24l86.1 0L23 455z" }, null, -1)
            ]))) : (l(), h("svg", It, e[29] || (e[29] = [
              a("path", { d: "M295 183c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l135-135 0 86.1c0 13.3 10.7 24 24 24s24-10.7 24-24l0-144c0-13.3-10.7-24-24-24L344 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l86.1 0L295 183zM217 329c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L48 430.1 48 344c0-13.3-10.7-24-24-24s-24 10.7-24 24L0 488c0 13.3 10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-86.1 0L217 329z" }, null, -1)
            ])))
          ])),
          a("div", {
            class: "v-p-2 v-rounded-lg v-cursor-pointer v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#2222220f] v-transition-colors v-duration-300",
            onClick: e[4] || (e[4] = (...o) => r.closeChat && r.closeChat(...o))
          }, e[30] || (e[30] = [
            a("svg", {
              viewBox: "0 0 448 512",
              fill: "currentColor",
              width: "16px",
              height: "16px"
            }, [
              a("path", { d: "M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" })
            ], -1)
          ])),
          a("div", {
            class: "v-p-2 v-rounded-lg v-cursor-pointer v-text-red-600 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#ff000015] v-transition-colors v-duration-300",
            onClick: e[5] || (e[5] = (o) => n.showResetConfirmation = !0)
          }, e[31] || (e[31] = [
            a("svg", {
              viewBox: "0 0 384 512",
              fill: "currentColor",
              width: "16px",
              height: "16px"
            }, [
              a("path", { d: "M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z" })
            ], -1)
          ]))
        ])
      ])) : p("", !0),
      n.currentTab === "home" ? (l(), h("div", Vt, [
        a("div", Bt, [
          a("div", Lt, [
            e[33] || (e[33] = a("img", {
              src: "https://vafaai.com/widget/images/logo.svg",
              alt: "Support Profile",
              class: "v-w-[32px] v-h-[32px]"
            }, null, -1)),
            a("div", Ot, [
              e[32] || (e[32] = a("div", { class: "v-text-sm v-font-semibold" }, "پشتیبانی هوشمند وفا", -1)),
              a("div", Pt, v(n.connectionStatus), 1)
            ])
          ]),
          a("div", qt, [
            a("div", {
              class: "v-p-2 v-rounded-lg v-cursor-pointer v-text-white v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#22222240] v-transition-colors v-duration-300",
              onClick: e[6] || (e[6] = (...o) => r.closeChat && r.closeChat(...o))
            }, e[34] || (e[34] = [
              a("svg", {
                viewBox: "0 0 384 512",
                fill: "currentColor",
                width: "16px",
                height: "16px"
              }, [
                a("path", { d: "M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z" })
              ], -1)
            ]))
          ])
        ])
      ])) : p("", !0),
      n.currentTab === "knowledge" ? (l(), h("div", Ht, [
        n.knowledgeView !== "categories" ? (l(), h("div", {
          key: 0,
          class: "v-p-2 v-rounded-lg v-cursor-pointer v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#2222220f] v-transition-colors v-duration-300",
          onClick: e[7] || (e[7] = (...o) => r.goBackKnowledge && r.goBackKnowledge(...o))
        }, e[35] || (e[35] = [
          a("svg", {
            "data-v-8cc45828": "",
            viewBox: "0 0 320 512",
            fill: "currentColor",
            width: "16px",
            height: "16px"
          }, [
            a("path", {
              "data-v-8cc45828": "",
              d: "M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"
            })
          ], -1)
        ]))) : (l(), h("div", Nt)),
        e[38] || (e[38] = a("div", { class: "v-text-sm v-text-center v-font-semibold v-flex-1" }, "راهنما", -1)),
        a("div", {
          class: "v-p-2 v-rounded-lg v-cursor-pointer v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#2222220f] v-transition-colors v-duration-300",
          onClick: e[8] || (e[8] = (...o) => r.closeChat && r.closeChat(...o))
        }, e[36] || (e[36] = [
          a("svg", {
            viewBox: "0 0 448 512",
            fill: "currentColor",
            width: "16px",
            height: "16px"
          }, [
            a("path", { d: "M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" })
          ], -1)
        ])),
        a("div", {
          class: "v-p-2 v-rounded-lg v-cursor-pointer v-text-red-600 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#ff000015] v-transition-colors v-duration-300",
          onClick: e[9] || (e[9] = (o) => n.showResetConfirmation = !0)
        }, e[37] || (e[37] = [
          a("svg", {
            viewBox: "0 0 384 512",
            fill: "currentColor",
            width: "16px",
            height: "16px"
          }, [
            a("path", { d: "M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z" })
          ], -1)
        ]))
      ])) : p("", !0),
      n.currentTab === "home" ? (l(), h("div", jt, [
        a("div", zt, [
          a("div", Qt, [
            a("div", {
              class: "v-flex v-items-center v-justify-between v-rounded-lg v-mb-[6px] v-bg-slate-100",
              onClick: e[12] || (e[12] = (...o) => r.focusOnSearch && r.focusOnSearch(...o))
            }, [
              E(a("input", {
                type: "text",
                "onUpdate:modelValue": e[10] || (e[10] = (o) => n.knowledgeSearchQuery = o),
                ref: "homeSearchInput",
                onFocus: e[11] || (e[11] = (...o) => r.showKnowledgeSearch && r.showKnowledgeSearch(...o)),
                placeholder: "جست و جو کنید",
                class: "v-flex-1 v-border-0 v-outline-0 v-bg-transparent v-text-sm v-py-2 v-px-3"
              }, null, 544), [
                [Q, n.knowledgeSearchQuery]
              ]),
              e[39] || (e[39] = a("svg", {
                viewBox: "0 0 512 512",
                fill: "currentColor",
                width: "16px",
                height: "16px",
                class: "v-ml-3"
              }, [
                a("path", { d: "M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z" })
              ], -1))
            ]),
            (l(!0), h(S, null, I(n.featuredQuestions, (o) => (l(), h("div", {
              key: o.id,
              class: "v-flex v-items-center v-justify-between v-py-2 v-px-3 v-bg-white v-cursor-pointer v-rounded-lg v-hover:bg-slate-100",
              onClick: (c) => r.navigateToQuestion(o.id)
            }, [
              a("div", Dt, v(o.question), 1),
              e[40] || (e[40] = a("svg", {
                viewBox: "0 0 320 512",
                fill: "currentColor",
                width: "14px",
                height: "14px"
              }, [
                a("path", { d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" })
              ], -1))
            ], 8, Ut))), 128))
          ])
        ]),
        a("div", Mt, [
          a("div", {
            class: "v-bg-[#1a237e] v-text-white v-text-md v-rounded-lg v-py-3 v-px-6 v-flex v-items-center v-justify-between v-w-full v-cursor-pointer v-transition-colors v-duration-300",
            onClick: e[13] || (e[13] = (o) => r.switchTab("messenger"))
          }, e[41] || (e[41] = [
            ke('<svg viewBox="0 0 512 512" fill="currentColor" width="24px" height="24px" data-v-5d75ea62><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm165.8 21.7c-7.6 8.1-20.2 8.5-28.3 .9s-8.5-20.2-.9-28.3c14.5-15.5 35.2-22.3 54.6-22.3s40.1 6.8 54.6 22.3c7.6 8.1 7.1 20.7-.9 28.3s-20.7 7.1-28.3-.9c-5.5-5.8-14.8-9.7-25.4-9.7s-19.9 3.8-25.4 9.7z" data-v-5d75ea62></path></svg><div class="v-text-md v-font-bold" data-v-5d75ea62>شروع گفتگو</div><svg viewBox="0 0 320 512" fill="currentColor" width="16px" height="16px" data-v-5d75ea62><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" data-v-5d75ea62></path></svg>', 3)
          ]))
        ])
      ])) : p("", !0),
      n.currentTab === "messenger" ? (l(), h("div", _t, [
        a("div", Ft, [
          (l(!0), h(S, null, I(n.messages, (o, c) => E((l(), h("div", {
            key: c,
            class: R([
              "v-max-w-[80%] v-rounded-xl v-mb-2 v-text-sm v-py-2 v-px-3",
              o.isUser ? "v-bg-[#1a237e] v-text-white v-rounded-br-sm v-justify-self-start" : "v-bg-slate-100 v-text-slate-800 v-rounded-bl-sm v-justify-self-end",
              o.isStreaming ? "v-streaming-message" : "",
              o.isComplete ? "v-complete-message" : ""
            ])
          }, [
            a("div", {
              innerHTML: o.content
            }, null, 8, Wt)
          ], 2)), [
            [U, o.content && (!o.isComplete || o.isComplete && o.content)]
          ])), 128)),
          n.isThinking ? (l(), h("div", Kt, e[42] || (e[42] = [
            a("span", { class: "typing-dot" }, null, -1),
            a("span", { class: "typing-dot" }, null, -1),
            a("span", { class: "typing-dot" }, null, -1)
          ]))) : p("", !0)
        ]),
        n.showDefaultQuestions && n.currentTab === "messenger" && n.messages.length <= 2 ? (l(), h("div", Xt, [
          (l(!0), h(S, null, I(n.defaultQuestions, (o, c) => (l(), h("div", {
            key: c,
            class: "v-border v-border-slate-200 v-rounded-full v-py-2 v-px-3 v-text-sm v-cursor-pointer v-w-fit v-hover:bg-slate-100 v-transition-colors v-duration-300",
            onClick: (d) => r.selectDefaultQuestion(o)
          }, v(o), 9, Zt))), 128))
        ])) : p("", !0)
      ], 512)) : p("", !0),
      n.currentTab === "knowledge" ? (l(), h("div", Gt, [
        a("div", Jt, [
          a("div", Yt, [
            E(a("input", {
              type: "text",
              "onUpdate:modelValue": e[14] || (e[14] = (o) => n.knowledgeSearchQuery = o),
              onInput: e[15] || (e[15] = (...o) => r.searchKnowledgeBase && r.searchKnowledgeBase(...o)),
              placeholder: "جست و جو کنید",
              class: "v-flex-1 v-border-0 v-outline-0 v-bg-transparent v-text-sm v-py-2 v-px-3"
            }, null, 544), [
              [Q, n.knowledgeSearchQuery]
            ]),
            e[43] || (e[43] = a("svg", {
              viewBox: "0 0 512 512",
              fill: "currentColor",
              width: "16px",
              height: "16px",
              class: "v-ml-3"
            }, [
              a("path", { d: "M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z" })
            ], -1))
          ])
        ]),
        n.knowledgeView === "categories" ? (l(), h("div", $t, [
          a("div", es, [
            a("div", ts, v(r.filteredCategories.length) + " دسته بندی ", 1)
          ]),
          (l(!0), h(S, null, I(r.filteredCategories, (o) => (l(), h("div", {
            key: o.id,
            class: "v-flex v-items-center v-justify-between v-border-b v-border-slate-200 v-cursor-pointer v-px-3 v-py-2 v-gap-2 v-hover:bg-slate-100 v-transition-colors v-duration-300",
            onClick: (c) => r.selectCategory(o)
          }, [
            a("div", is, [
              a("div", ns, v(o.title), 1),
              a("div", rs, v(o.description), 1),
              a("div", os, v(o.questions.length) + " پرسش ", 1)
            ]),
            e[44] || (e[44] = a("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16px",
              height: "16px",
              viewBox: "0 0 320 512",
              fill: "currentColor"
            }, [
              a("path", { d: "M15 239c-9.4 9.4-9.4 24.6 0 33.9L207 465c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L65.9 256 241 81c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L15 239z" })
            ], -1))
          ], 8, ss))), 128))
        ])) : p("", !0),
        e[46] || (e[46] = a("div", { class: "v-absolute v-pointer-events-none v-h-[36px] v-bottom-0 v-w-full v-bg-gradient-to-b v-from-transparent v-to-white" }, null, -1)),
        n.knowledgeView === "questions" ? (l(), h("div", as, [
          a("div", cs, [
            a("div", ls, v(n.selectedCategory.title), 1),
            a("div", hs, v(n.selectedCategory.description), 1),
            a("div", us, v(r.filteredQuestions.length) + " پرسش ", 1)
          ]),
          (l(!0), h(S, null, I(r.filteredQuestions, (o) => (l(), h("div", {
            key: o.id,
            class: "v-flex v-items-center v-justify-between v-py-3 v-px-3 v-border-b v-border-slate-200 v-cursor-pointer v-gap-2 v-hover:bg-slate-100 v-transition-colors v-duration-300",
            onClick: (c) => r.selectQuestion(o)
          }, [
            a("div", fs, v(o.question), 1),
            e[45] || (e[45] = a("svg", {
              "data-v-8cc45828": "",
              xmlns: "http://www.w3.org/2000/svg",
              width: "16px",
              height: "16px",
              viewBox: "0 0 320 512",
              fill: "currentColor"
            }, [
              a("path", {
                "data-v-8cc45828": "",
                d: "M15 239c-9.4 9.4-9.4 24.6 0 33.9L207 465c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L65.9 256 241 81c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L15 239z"
              })
            ], -1))
          ], 8, ds))), 128))
        ])) : p("", !0),
        n.knowledgeView === "answer" ? (l(), h("div", ps, [
          a("div", vs, v(n.selectedQuestion.question), 1),
          a("div", gs, v(n.selectedQuestion.answer), 1)
        ])) : p("", !0)
      ])) : p("", !0),
      n.currentTab === "messenger" ? (l(), h("div", ms, [
        a("div", ys, [
          E(a("input", {
            type: "text",
            "onUpdate:modelValue": e[16] || (e[16] = (o) => n.inputMessage = o),
            onKeyup: e[17] || (e[17] = be((...o) => r.sendMessage && r.sendMessage(...o), ["enter"])),
            placeholder: "اینجا تایپ کنید ...",
            class: "v-flex-1 v-border-0 v-outline-0 v-bg-transparent v-text-sm v-py-2 v-px-3 v-rounded-full"
          }, null, 544), [
            [Q, n.inputMessage]
          ]),
          (l(), h("svg", {
            viewBox: "0 0 512 512",
            fill: "currentColor",
            width: "20px",
            height: "20px",
            class: "v-ml-3 v-text-[#1a237e] v-rotate-180 v-cursor-pointer",
            onClick: e[18] || (e[18] = (...o) => r.sendMessage && r.sendMessage(...o))
          }, e[47] || (e[47] = [
            a("path", { d: "M133.9 232L65.8 95.9 383.4 232l-249.5 0zm0 48l249.5 0L65.8 416.1l68-136.1zM44.6 34.6C32.3 29.3 17.9 32.3 8.7 42S-2.6 66.3 3.4 78.3L92.2 256 3.4 433.7c-6 12-3.9 26.5 5.3 36.3s23.5 12.7 35.9 7.5l448-192c11.8-5 19.4-16.6 19.4-29.4s-7.6-24.4-19.4-29.4l-448-192z" }, null, -1)
          ])))
        ]),
        e[48] || (e[48] = a("div", { class: "v-text-center v-text-xs v-text-slate-600 v-pt-2 v-flex v-items-center v-justify-center" }, [
          Ae(" ساخته شده با "),
          a("a", {
            href: "https://vafaai.com",
            target: "_blank",
            rel: "noopener noreferrer",
            title: "وفا - پلتفرم هوش مصنوعی",
            "aria-label": "وبسایت وفا"
          }, [
            a("img", {
              src: yt,
              alt: "لوگوی وفا - پلتفرم هوش مصنوعی",
              class: "v-ml-1",
              style: { width: "52px", height: "auto", "margin-right": "4px" }
            })
          ])
        ], -1))
      ])) : p("", !0),
      n.currentTab === "home" || n.currentTab === "knowledge" ? (l(), h("div", ws, [
        a("div", {
          class: R(["v-flex v-flex-col v-flex-1 v-items-center v-justify-center v-cursor-pointer v-gap-2", { active: n.currentTab === "home", "v-text-[#1a237e] v-font-semibold": n.currentTab === "home", "v-text-slate-800": n.currentTab !== "home" }]),
          onClick: e[19] || (e[19] = (o) => r.switchTab("home"))
        }, [
          n.currentTab === "home" ? (l(), h("svg", xs, e[49] || (e[49] = [
            a("path", { d: "M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" }, null, -1)
          ]))) : (l(), h("svg", ks, e[50] || (e[50] = [
            a("path", { d: "M303.5 5.7c-9-7.6-22.1-7.6-31.1 0l-264 224c-10.1 8.6-11.3 23.7-2.8 33.8s23.7 11.3 33.8 2.8L64 245.5 64 432c0 44.2 35.8 80 80 80l288 0c44.2 0 80-35.8 80-80l0-186.5 24.5 20.8c10.1 8.6 25.3 7.3 33.8-2.8s7.3-25.3-2.8-33.8l-264-224zM464 204.8L464 432c0 17.7-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32l0-227.2L288 55.5 464 204.8z" }, null, -1)
          ]))),
          e[51] || (e[51] = a("div", { class: "v-text-xs" }, "خانه", -1))
        ], 2),
        a("div", {
          class: R(["v-flex v-flex-col v-flex-1 v-items-center v-justify-center v-cursor-pointer v-gap-2", { active: n.currentTab === "messenger", "v-text-[#1a237e] v-font-semibold": n.currentTab === "messenger", "v-text-slate-800": n.currentTab !== "messenger" }]),
          onClick: e[20] || (e[20] = (o) => r.switchTab("messenger"))
        }, [
          n.currentTab === "messenger" ? (l(), h("svg", bs, e[52] || (e[52] = [
            a("path", { d: "M0 64C0 28.7 28.7 0 64 0L448 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-138.7 0L185.6 508.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3l0-80-96 0c-35.3 0-64-28.7-64-64L0 64zm152 80c-13.3 0-24 10.7-24 24s10.7 24 24 24l208 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-208 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0z" }, null, -1)
          ]))) : (l(), h("svg", As, e[53] || (e[53] = [
            a("path", { d: "M208 416c0-26.5-21.5-48-48-48l-96 0c-8.8 0-16-7.2-16-16L48 64c0-8.8 7.2-16 16-16l384 0c8.8 0 16 7.2 16 16l0 288c0 8.8-7.2 16-16 16l-138.7 0c-10.4 0-20.5 3.4-28.8 9.6L208 432l0-16zm-.2 76.2l.2-.2 101.3-76L448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l48 0 48 0 0 48 0 4 0 .3 0 6.4 0 21.3c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L202.7 496l5.1-3.8zM152 144c-13.3 0-24 10.7-24 24s10.7 24 24 24l208 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-208 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0z" }, null, -1)
          ]))),
          e[54] || (e[54] = a("div", { class: "v-text-xs" }, "پیام رسان", -1))
        ], 2),
        a("div", {
          class: R(["v-flex v-flex-col v-flex-1 v-items-center v-justify-center v-cursor-pointer v-gap-2", { active: n.currentTab === "knowledge", "v-text-[#1a237e] v-font-semibold": n.currentTab === "knowledge", "v-text-slate-800": n.currentTab !== "knowledge" }]),
          onClick: e[21] || (e[21] = (o) => r.switchTab("knowledge"))
        }, [
          n.currentTab === "knowledge" ? (l(), h("svg", Rs, e[55] || (e[55] = [
            a("path", { d: "M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm73.8 133.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L248 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM192 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" }, null, -1)
          ]))) : (l(), h("svg", Es, e[56] || (e[56] = [
            a("path", { d: "M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm137.8 69.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L248 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM192 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" }, null, -1)
          ]))),
          e[57] || (e[57] = a("div", { class: "v-text-xs" }, "راهنما", -1))
        ], 2)
      ])) : p("", !0)
    ], 2), [
      [U, n.isOpen]
    ]),
    E(a("div", Ts, [
      a("div", Cs, [
        e[58] || (e[58] = a("div", { class: "v-text-lg v-font-bold v-mb-3" }, "آیا واقعا میخواهید این چت را ببندید؟", -1)),
        a("div", Ss, [
          a("button", {
            onClick: e[22] || (e[22] = (...o) => r.resetChat && r.resetChat(...o)),
            class: "v-px-4 v-py-2 v-bg-red-600 v-text-white v-rounded-md v-hover:bg-red-700"
          }, "بستن چت"),
          a("button", {
            onClick: e[23] || (e[23] = (o) => n.showResetConfirmation = !1),
            class: "v-px-4 v-py-2 v-bg-slate-200 v-text-slate-800 v-rounded-md v-hover:bg-slate-300"
          }, "انصراف")
        ])
      ])
    ], 512), [
      [U, n.showResetConfirmation]
    ])
  ]);
}
const xe = /* @__PURE__ */ wt(xt, [["render", Is], ["__scopeId", "data-v-5d75ea62"]]);
function Vs(s, e = {}) {
  const t = document.querySelector(s);
  if (!t) {
    console.error(`Container with selector ${s} not found`);
    return;
  }
  const i = Re(xe, e);
  return i.mount(t), i;
}
const Bs = {
  ChatWidget: xe,
  init: Vs
};
typeof window < "u" && (window.VafaChatWidget = Bs);
export {
  xe as ChatWidget,
  Bs as default,
  Vs as init
};
