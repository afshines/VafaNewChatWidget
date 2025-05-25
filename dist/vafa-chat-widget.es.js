import { openBlock as l, createElementBlock as h, createElementVNode as a, normalizeClass as T, withDirectives as E, createCommentVNode as p, toDisplayString as v, vModelText as z, Fragment as L, renderList as B, createStaticVNode as be, vShow as te, withKeys as ke, createApp as _e } from "vue";
const x = /* @__PURE__ */ Object.create(null);
x.open = "0";
x.close = "1";
x.ping = "2";
x.pong = "3";
x.message = "4";
x.upgrade = "5";
x.noop = "6";
const I = /* @__PURE__ */ Object.create(null);
Object.keys(x).forEach((s) => {
  I[x[s]] = s;
});
const K = { type: "error", data: "parser error" }, ae = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", ce = typeof ArrayBuffer == "function", le = (s) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(s) : s && s.buffer instanceof ArrayBuffer, X = ({ type: s, data: e }, t, i) => ae && e instanceof Blob ? t ? i(e) : se(e, i) : ce && (e instanceof ArrayBuffer || le(e)) ? t ? i(e) : se(new Blob([e]), i) : i(x[s] + (e || "")), se = (s, e) => {
  const t = new FileReader();
  return t.onload = function() {
    const i = t.result.split(",")[1];
    e("b" + (i || ""));
  }, t.readAsDataURL(s);
};
function ie(s) {
  return s instanceof Uint8Array ? s : s instanceof ArrayBuffer ? new Uint8Array(s) : new Uint8Array(s.buffer, s.byteOffset, s.byteLength);
}
let V;
function Te(s, e) {
  if (ae && s.data instanceof Blob)
    return s.data.arrayBuffer().then(ie).then(e);
  if (ce && (s.data instanceof ArrayBuffer || le(s.data)))
    return e(ie(s.data));
  X(s, !1, (t) => {
    V || (V = new TextEncoder()), e(V.encode(t));
  });
}
const ne = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", O = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let s = 0; s < ne.length; s++)
  O[ne.charCodeAt(s)] = s;
const Ce = (s) => {
  let e = s.length * 0.75, t = s.length, i, n = 0, r, o, c, d;
  s[s.length - 1] === "=" && (e--, s[s.length - 2] === "=" && e--);
  const b = new ArrayBuffer(e), g = new Uint8Array(b);
  for (i = 0; i < t; i += 4)
    r = O[s.charCodeAt(i)], o = O[s.charCodeAt(i + 1)], c = O[s.charCodeAt(i + 2)], d = O[s.charCodeAt(i + 3)], g[n++] = r << 2 | o >> 4, g[n++] = (o & 15) << 4 | c >> 2, g[n++] = (c & 3) << 6 | d & 63;
  return b;
}, Se = typeof ArrayBuffer == "function", G = (s, e) => {
  if (typeof s != "string")
    return {
      type: "message",
      data: he(s, e)
    };
  const t = s.charAt(0);
  return t === "b" ? {
    type: "message",
    data: Ee(s.substring(1), e)
  } : I[t] ? s.length > 1 ? {
    type: I[t],
    data: s.substring(1)
  } : {
    type: I[t]
  } : K;
}, Ee = (s, e) => {
  if (Se) {
    const t = Ce(s);
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
}, ue = String.fromCharCode(30), Le = (s, e) => {
  const t = s.length, i = new Array(t);
  let n = 0;
  s.forEach((r, o) => {
    X(r, !1, (c) => {
      i[o] = c, ++n === t && e(i.join(ue));
    });
  });
}, Be = (s, e) => {
  const t = s.split(ue), i = [];
  for (let n = 0; n < t.length; n++) {
    const r = G(t[n], e);
    if (i.push(r), r.type === "error")
      break;
  }
  return i;
};
function Ae() {
  return new TransformStream({
    transform(s, e) {
      Te(s, (t) => {
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
let Q;
function R(s) {
  return s.reduce((e, t) => e + t.length, 0);
}
function M(s, e) {
  if (s[0].length === e)
    return s.shift();
  const t = new Uint8Array(e);
  let i = 0;
  for (let n = 0; n < e; n++)
    t[n] = s[0][i++], i === s[0].length && (s.shift(), i = 0);
  return s.length && i < s[0].length && (s[0] = s[0].slice(i)), t;
}
function Oe(s, e) {
  Q || (Q = new TextDecoder());
  const t = [];
  let i = 0, n = -1, r = !1;
  return new TransformStream({
    transform(o, c) {
      for (t.push(o); ; ) {
        if (i === 0) {
          if (R(t) < 1)
            break;
          const d = M(t, 1);
          r = (d[0] & 128) === 128, n = d[0] & 127, n < 126 ? i = 3 : n === 126 ? i = 1 : i = 2;
        } else if (i === 1) {
          if (R(t) < 2)
            break;
          const d = M(t, 2);
          n = new DataView(d.buffer, d.byteOffset, d.length).getUint16(0), i = 3;
        } else if (i === 2) {
          if (R(t) < 8)
            break;
          const d = M(t, 8), b = new DataView(d.buffer, d.byteOffset, d.length), g = b.getUint32(0);
          if (g > Math.pow(2, 53 - 32) - 1) {
            c.enqueue(K);
            break;
          }
          n = g * Math.pow(2, 32) + b.getUint32(4), i = 3;
        } else {
          if (R(t) < n)
            break;
          const d = M(t, n);
          c.enqueue(G(r ? d : Q.decode(d), e)), i = 0;
        }
        if (n === 0 || n > s) {
          c.enqueue(K);
          break;
        }
      }
    }
  });
}
const de = 4;
function f(s) {
  if (s)
    return Re(s);
}
function Re(s) {
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
const U = (() => typeof Promise == "function" && typeof Promise.resolve == "function" ? (e) => Promise.resolve().then(e) : (e, t) => t(e, 0))(), m = (() => typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")())(), Me = "arraybuffer";
function fe(s, ...e) {
  return e.reduce((t, i) => (s.hasOwnProperty(i) && (t[i] = s[i]), t), {});
}
const Ie = m.setTimeout, Ne = m.clearTimeout;
function P(s, e) {
  e.useNativeTimers ? (s.setTimeoutFn = Ie.bind(m), s.clearTimeoutFn = Ne.bind(m)) : (s.setTimeoutFn = m.setTimeout.bind(m), s.clearTimeoutFn = m.clearTimeout.bind(m));
}
const De = 1.33;
function qe(s) {
  return typeof s == "string" ? Ue(s) : Math.ceil((s.byteLength || s.size) * De);
}
function Ue(s) {
  let e = 0, t = 0;
  for (let i = 0, n = s.length; i < n; i++)
    e = s.charCodeAt(i), e < 128 ? t += 1 : e < 2048 ? t += 2 : e < 55296 || e >= 57344 ? t += 3 : (i++, t += 4);
  return t;
}
function pe() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function Pe(s) {
  let e = "";
  for (let t in s)
    s.hasOwnProperty(t) && (e.length && (e += "&"), e += encodeURIComponent(t) + "=" + encodeURIComponent(s[t]));
  return e;
}
function ze(s) {
  let e = {}, t = s.split("&");
  for (let i = 0, n = t.length; i < n; i++) {
    let r = t[i].split("=");
    e[decodeURIComponent(r[0])] = decodeURIComponent(r[1]);
  }
  return e;
}
class Ve extends Error {
  constructor(e, t, i) {
    super(e), this.description = t, this.context = i, this.type = "TransportError";
  }
}
class Z extends f {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(e) {
    super(), this.writable = !1, P(this, e), this.opts = e, this.query = e.query, this.socket = e.socket, this.supportsBinary = !e.forceBase64;
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
    return super.emitReserved("error", new Ve(e, t, i)), this;
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
    const t = G(e, this.socket.binaryType);
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
    const t = Pe(e);
    return t.length ? "?" + t : "";
  }
}
class Qe extends Z {
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
    Be(e, this.socket.binaryType).forEach(t), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
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
    this.writable = !1, Le(e, (t) => {
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
const Fe = ve;
function Ke() {
}
class He extends Qe {
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
    super(), this.createRequest = e, P(this, i), this._opts = i, this._method = i.method || "GET", this._uri = t, this._data = i.data !== void 0 ? i.data : null, this._create();
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
      if (this._xhr.onreadystatechange = Ke, e)
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
const je = function() {
  const s = ge({
    xdomain: !1
  });
  return s && s.responseType !== null;
}();
class We extends He {
  constructor(e) {
    super(e);
    const t = e && e.forceBase64;
    this.supportsBinary = je && !t;
  }
  request(e = {}) {
    return Object.assign(e, { xd: this.xd }, this.opts), new w(ge, this.uri(), e);
  }
}
function ge(s) {
  const e = s.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!e || Fe))
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
class Ye extends Z {
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
      X(i, this.supportsBinary, (r) => {
        try {
          this.doWrite(i, r);
        } catch {
        }
        n && U(() => {
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
const F = m.WebSocket || m.MozWebSocket;
class Je extends Ye {
  createSocket(e, t, i) {
    return me ? new F(e, t, i) : t ? new F(e, t) : new F(e);
  }
  doWrite(e, t) {
    this.ws.send(t);
  }
}
class Xe extends Z {
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
        const t = Oe(Number.MAX_SAFE_INTEGER, this.socket.binaryType), i = e.readable.pipeThrough(t).getReader(), n = Ae();
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
        n && U(() => {
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
const Ge = {
  websocket: Je,
  webtransport: Xe,
  polling: We
}, Ze = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, $e = [
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
function H(s) {
  if (s.length > 8e3)
    throw "URI too long";
  const e = s, t = s.indexOf("["), i = s.indexOf("]");
  t != -1 && i != -1 && (s = s.substring(0, t) + s.substring(t, i).replace(/:/g, ";") + s.substring(i, s.length));
  let n = Ze.exec(s || ""), r = {}, o = 14;
  for (; o--; )
    r[$e[o]] = n[o] || "";
  return t != -1 && i != -1 && (r.source = e, r.host = r.host.substring(1, r.host.length - 1).replace(/;/g, ":"), r.authority = r.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), r.ipv6uri = !0), r.pathNames = et(r, r.path), r.queryKey = tt(r, r.query), r;
}
function et(s, e) {
  const t = /\/{2,9}/g, i = e.replace(t, "/").split("/");
  return (e.slice(0, 1) == "/" || e.length === 0) && i.splice(0, 1), e.slice(-1) == "/" && i.splice(i.length - 1, 1), i;
}
function tt(s, e) {
  const t = {};
  return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(i, n, r) {
    n && (t[n] = r);
  }), t;
}
const j = typeof addEventListener == "function" && typeof removeEventListener == "function", N = [];
j && addEventListener("offline", () => {
  N.forEach((s) => s());
}, !1);
class _ extends f {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(e, t) {
    if (super(), this.binaryType = Me, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, e && typeof e == "object" && (t = e, e = null), e) {
      const i = H(e);
      t.hostname = i.host, t.secure = i.protocol === "https" || i.protocol === "wss", t.port = i.port, i.query && (t.query = i.query);
    } else
      t.host && (t.hostname = H(t.host).host);
    P(this, t), this.secure = t.secure != null ? t.secure : typeof location < "u" && location.protocol === "https:", t.hostname && !t.port && (t.port = this.secure ? "443" : "80"), this.hostname = t.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = t.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, t.transports.forEach((i) => {
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
    }, t), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = ze(this.opts.query)), j && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, N.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
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
    const e = this.opts.rememberUpgrade && _.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
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
    this.readyState = "open", _.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
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
      if (n && (t += qe(n)), i > 0 && t > this._maxPayload)
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
    return e && (this._pingTimeoutTime = 0, U(() => {
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
    if (_.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
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
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), j && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const i = N.indexOf(this._offlineEventListener);
        i !== -1 && N.splice(i, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", e, t), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
_.protocol = de;
class st extends _ {
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
    _.priorWebsocketSuccess = !1;
    const n = () => {
      i || (t.send([{ type: "ping", data: "probe" }]), t.once("packet", (k) => {
        if (!i)
          if (k.type === "pong" && k.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", t), !t)
              return;
            _.priorWebsocketSuccess = t.name === "websocket", this.transport.pause(() => {
              i || this.readyState !== "closed" && (g(), this.setTransport(t), t.send([{ type: "upgrade" }]), this.emitReserved("upgrade", t), t = null, this.upgrading = !1, this.flush());
            });
          } else {
            const S = new Error("probe error");
            S.transport = t.name, this.emitReserved("upgradeError", S);
          }
      }));
    };
    function r() {
      i || (i = !0, g(), t.close(), t = null);
    }
    const o = (k) => {
      const S = new Error("probe error: " + k);
      S.transport = t.name, r(), this.emitReserved("upgradeError", S);
    };
    function c() {
      o("transport closed");
    }
    function d() {
      o("socket closed");
    }
    function b(k) {
      t && k.name !== t.name && r();
    }
    const g = () => {
      t.removeListener("open", n), t.removeListener("error", o), t.removeListener("close", c), this.off("close", d), this.off("upgrading", b);
    };
    t.once("open", n), t.once("error", o), t.once("close", c), this.once("close", d), this.once("upgrading", b), this._upgrades.indexOf("webtransport") !== -1 && e !== "webtransport" ? this.setTimeoutFn(() => {
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
let it = class extends st {
  constructor(e, t = {}) {
    const i = typeof e == "object" ? e : t;
    (!i.transports || i.transports && typeof i.transports[0] == "string") && (i.transports = (i.transports || ["polling", "websocket", "webtransport"]).map((n) => Ge[n]).filter((n) => !!n)), super(e, i);
  }
};
function nt(s, e = "", t) {
  let i = s;
  t = t || typeof location < "u" && location, s == null && (s = t.protocol + "//" + t.host), typeof s == "string" && (s.charAt(0) === "/" && (s.charAt(1) === "/" ? s = t.protocol + s : s = t.host + s), /^(https?|wss?):\/\//.test(s) || (typeof t < "u" ? s = t.protocol + "//" + s : s = "https://" + s), i = H(s)), i.port || (/^(http|ws)$/.test(i.protocol) ? i.port = "80" : /^(http|ws)s$/.test(i.protocol) && (i.port = "443")), i.path = i.path || "/";
  const r = i.host.indexOf(":") !== -1 ? "[" + i.host + "]" : i.host;
  return i.id = i.protocol + "://" + r + ":" + i.port + e, i.href = i.protocol + "://" + r + (t && t.port === i.port ? "" : ":" + i.port), i;
}
const rt = typeof ArrayBuffer == "function", ot = (s) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(s) : s.buffer instanceof ArrayBuffer, ye = Object.prototype.toString, at = typeof Blob == "function" || typeof Blob < "u" && ye.call(Blob) === "[object BlobConstructor]", ct = typeof File == "function" || typeof File < "u" && ye.call(File) === "[object FileConstructor]";
function $(s) {
  return rt && (s instanceof ArrayBuffer || ot(s)) || at && s instanceof Blob || ct && s instanceof File;
}
function D(s, e) {
  if (!s || typeof s != "object")
    return !1;
  if (Array.isArray(s)) {
    for (let t = 0, i = s.length; t < i; t++)
      if (D(s[t]))
        return !0;
    return !1;
  }
  if ($(s))
    return !0;
  if (s.toJSON && typeof s.toJSON == "function" && arguments.length === 1)
    return D(s.toJSON(), !0);
  for (const t in s)
    if (Object.prototype.hasOwnProperty.call(s, t) && D(s[t]))
      return !0;
  return !1;
}
function lt(s) {
  const e = [], t = s.data, i = s;
  return i.data = W(t, e), i.attachments = e.length, { packet: i, buffers: e };
}
function W(s, e) {
  if (!s)
    return s;
  if ($(s)) {
    const t = { _placeholder: !0, num: e.length };
    return e.push(s), t;
  } else if (Array.isArray(s)) {
    const t = new Array(s.length);
    for (let i = 0; i < s.length; i++)
      t[i] = W(s[i], e);
    return t;
  } else if (typeof s == "object" && !(s instanceof Date)) {
    const t = {};
    for (const i in s)
      Object.prototype.hasOwnProperty.call(s, i) && (t[i] = W(s[i], e));
    return t;
  }
  return s;
}
function ht(s, e) {
  return s.data = Y(s.data, e), delete s.attachments, s;
}
function Y(s, e) {
  if (!s)
    return s;
  if (s && s._placeholder === !0) {
    if (typeof s.num == "number" && s.num >= 0 && s.num < e.length)
      return e[s.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(s))
    for (let t = 0; t < s.length; t++)
      s[t] = Y(s[t], e);
  else if (typeof s == "object")
    for (const t in s)
      Object.prototype.hasOwnProperty.call(s, t) && (s[t] = Y(s[t], e));
  return s;
}
const ut = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
  // used by the Node.js EventEmitter
], dt = 5;
var u;
(function(s) {
  s[s.CONNECT = 0] = "CONNECT", s[s.DISCONNECT = 1] = "DISCONNECT", s[s.EVENT = 2] = "EVENT", s[s.ACK = 3] = "ACK", s[s.CONNECT_ERROR = 4] = "CONNECT_ERROR", s[s.BINARY_EVENT = 5] = "BINARY_EVENT", s[s.BINARY_ACK = 6] = "BINARY_ACK";
})(u || (u = {}));
class ft {
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
    return (e.type === u.EVENT || e.type === u.ACK) && D(e) ? this.encodeAsBinary({
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
    const t = lt(e), i = this.encodeAsString(t.packet), n = t.buffers;
    return n.unshift(i), n;
  }
}
function oe(s) {
  return Object.prototype.toString.call(s) === "[object Object]";
}
class ee extends f {
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
      i || t.type === u.BINARY_ACK ? (t.type = i ? u.EVENT : u.ACK, this.reconstructor = new pt(t), t.attachments === 0 && super.emitReserved("decoded", t)) : super.emitReserved("decoded", t);
    } else if ($(e) || e.base64)
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
      if (ee.isPayloadValid(i.type, r))
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
        return Array.isArray(t) && (typeof t[0] == "number" || typeof t[0] == "string" && ut.indexOf(t[0]) === -1);
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
class pt {
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
      const t = ht(this.reconPack, this.buffers);
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
const vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: ee,
  Encoder: ft,
  get PacketType() {
    return u;
  },
  protocol: dt
}, Symbol.toStringTag, { value: "Module" }));
function y(s, e, t) {
  return s.on(e, t), function() {
    s.off(e, t);
  };
}
const gt = Object.freeze({
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
    if (gt.hasOwnProperty(e))
      throw new Error('"' + e.toString() + '" is a reserved event name');
    if (t.unshift(e), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(t), this;
    const o = {
      type: u.EVENT,
      data: t
    };
    if (o.options = {}, o.options.compress = this.flags.compress !== !1, typeof t[t.length - 1] == "function") {
      const g = this.ids++, k = t.pop();
      this._registerAckCallback(g, k), o.id = g;
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
function C(s) {
  s = s || {}, this.ms = s.min || 100, this.max = s.max || 1e4, this.factor = s.factor || 2, this.jitter = s.jitter > 0 && s.jitter <= 1 ? s.jitter : 0, this.attempts = 0;
}
C.prototype.duration = function() {
  var s = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var e = Math.random(), t = Math.floor(e * this.jitter * s);
    s = Math.floor(e * 10) & 1 ? s + t : s - t;
  }
  return Math.min(s, this.max) | 0;
};
C.prototype.reset = function() {
  this.attempts = 0;
};
C.prototype.setMin = function(s) {
  this.ms = s;
};
C.prototype.setMax = function(s) {
  this.max = s;
};
C.prototype.setJitter = function(s) {
  this.jitter = s;
};
class J extends f {
  constructor(e, t) {
    var i;
    super(), this.nsps = {}, this.subs = [], e && typeof e == "object" && (t = e, e = void 0), t = t || {}, t.path = t.path || "/socket.io", this.opts = t, P(this, t), this.reconnection(t.reconnection !== !1), this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0), this.reconnectionDelay(t.reconnectionDelay || 1e3), this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3), this.randomizationFactor((i = t.randomizationFactor) !== null && i !== void 0 ? i : 0.5), this.backoff = new C({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(t.timeout == null ? 2e4 : t.timeout), this._readyState = "closed", this.uri = e;
    const n = t.parser || vt;
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
    this.engine = new it(this.uri, this.opts);
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
    U(() => {
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
const A = {};
function q(s, e) {
  typeof s == "object" && (e = s, s = void 0), e = e || {};
  const t = nt(s, e.path || "/socket.io"), i = t.source, n = t.id, r = t.path, o = A[n] && r in A[n].nsps, c = e.forceNew || e["force new connection"] || e.multiplex === !1 || o;
  let d;
  return c ? d = new J(i, e) : (A[n] || (A[n] = new J(i, e)), d = A[n]), t.query && !e.query && (e.query = t.queryKey), d.socket(t.path, e);
}
Object.assign(q, {
  Manager: J,
  Socket: we,
  io: q,
  connect: q
});
const mt = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [i, n] of e)
    t[i] = n;
  return t;
}, yt = {
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
      selectedQuestion: null
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
        this.token && (s.auth = { token: this.token }, console.log("Using token for authentication")), console.log("Connecting to socket server:", this.socketUrl), this.socket = q(this.socketUrl, s), this.socket.on("connect", () => {
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
}, wt = { class: "v-fixed v-flex v-flex-col v-gap-2 v-right-[20px] v-bottom-[20px]" }, xt = ["innerHTML"], bt = {
  key: 0,
  class: "v-py-4 v-px-3 v-bg-white v-text-slate-800 v-flex v-items-center v-relative v-flex-row v-border-b v-border-slate-200"
}, kt = { class: "v-flex v-justify-between v-items-center v-flex-1 v-gap-2" }, _t = { class: "v-flex v-grow v-flex-col v-gap-[2px]" }, Tt = { class: "v-text-xs" }, Ct = { class: "v-flex v-gap-2" }, St = {
  key: 0,
  viewBox: "0 0 512 512",
  fill: "currentColor",
  width: "16px",
  height: "16px"
}, Et = {
  key: 1,
  viewBox: "0 0 512 512",
  fill: "currentColor",
  width: "16px",
  height: "16px"
}, Lt = {
  key: 1,
  class: "v-bg-white v-py-4 v-px-3"
}, Bt = { class: "v-py-4 v-px-3 v-bg-[#1a237e] v-text-white v-flex v-items-center v-relative v-flex-row v-rounded-lg" }, At = { class: "v-flex v-justify-between v-items-center v-flex-1 v-gap-2" }, Ot = { class: "v-flex v-grow v-flex-col v-gap-[2px]" }, Rt = { class: "v-text-xs" }, Mt = { class: "v-flex v-gap-2" }, It = {
  key: 2,
  class: "v-py-4 v-px-3 v-bg-white v-text-slate-800 v-flex v-items-center v-relative v-flex-row v-border-b v-border-slate-200"
}, Nt = {
  key: 1,
  class: "v-p-2 v-rounded-lg v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center"
}, Dt = {
  key: 3,
  class: "v-relative v-flex v-flex-col v-h-full v-justify-between v-bg-white"
}, qt = { class: "v-px-3" }, Ut = { class: "v-p-2 v-rounded-lg v-border v-border-slate-200 v-bg-white v-flex v-flex-col v-gap-[2px]" }, Pt = ["onClick"], zt = { class: "v-flex-1 v-text-sm v-text-slate-800 v-overflow-hidden v-whitespace-nowrap v-truncate" }, Vt = { class: "v-px-3 v-pb-4" }, Qt = {
  key: 4,
  class: "v-relative v-flex v-flex-col v-h-full v-justify-between v-bg-white v-py-2 v-px-3 v-overflow-auto",
  ref: "chatBody"
}, Ft = { class: "v-grow" }, Kt = ["innerHTML"], Ht = {
  key: 0,
  class: "hascowebchat-message hascowebchat-bot-message typing-animation",
  style: { "font-style": "italic", opacity: "0.8" }
}, jt = {
  key: 0,
  class: "v-flex v-flex-col v-gap-2"
}, Wt = ["onClick"], Yt = {
  key: 5,
  class: "v-relative v-flex v-h-full v-overflow-hidden v-p-0 v-justify-start v-flex-col v-items-stretch"
}, Jt = { class: "v-py-2 v-px-3 v-border-b v-border-slate-200 v-bg-white" }, Xt = { class: "v-flex v-items-center v-justify-between v-rounded-lg v-bg-slate-100" }, Gt = {
  key: 0,
  class: "v-relative v-flex v-flex-col v-h-full v-bg-white v-overflow-auto"
}, Zt = { class: "v-py-2 v-px-3 v-border-b v-border-slate-200" }, $t = { class: "v-text-md v-text-slate-800 v-font-semibold" }, es = ["onClick"], ts = { class: "v-flex-1 v-flex v-flex-col v-gap-1" }, ss = { class: "v-text-sm v-text-slate-800 v-font-semibold" }, is = { class: "v-text-sm v-text-slate-800" }, ns = { class: "v-text-sm v-text-slate-600" }, rs = {
  key: 1,
  class: "v-bg-white v-flex v-flex-col v-grow v-overflow-auto"
}, os = { class: "v-py-2 v-px-3 v-border-b v-border-slate-200 v-gap-1 v-flex v-flex-col" }, as = { class: "v-text-sm v-text-slate-800 v-font-semibold" }, cs = { class: "v-text-sm v-text-slate-800" }, ls = { class: "v-text-sm v-text-slate-600" }, hs = ["onClick"], us = { class: "v-text-sm v-text-slate-800" }, ds = {
  key: 2,
  class: "v-bg-white v-flex v-flex-col v-grow v-overflow-auto"
}, fs = { class: "v-py-2 v-px-3 v-border-b v-border-slate-200 v-text-sm v-text-slate-800 v-font-semibold" }, ps = { class: "v-py-2 v-px-3 v-text-sm v-text-slate-800" }, vs = {
  key: 6,
  class: "v-py-2 v-px-3 v-bg-white v-border-t v-border-slate-200"
}, gs = { class: "v-flex v-items-center v-bg-white v-rounded-full v-border v-border-slate-200" }, ms = {
  key: 7,
  class: "v-flex v-justify-around v-items-center v-gap-2 v-bg-white v-py-2 v-h-[60px] v-border-t v-border-slate-200"
}, ys = {
  key: 0,
  viewBox: "0 0 576 512",
  fill: "currentColor",
  width: "20px",
  height: "20px"
}, ws = {
  key: 1,
  viewBox: "0 0 576 512",
  fill: "currentColor",
  width: "20px",
  height: "20px"
}, xs = {
  key: 0,
  viewBox: "0 0 512 512",
  fill: "currentColor",
  width: "20px",
  height: "20px"
}, bs = {
  key: 1,
  viewBox: "0 0 512 512",
  fill: "currentColor",
  width: "20px",
  height: "20px"
}, ks = {
  key: 0,
  viewBox: "0 0 448 512",
  fill: "currentColor",
  width: "20px",
  height: "20px"
}, _s = {
  key: 1,
  viewBox: "0 0 448 512",
  fill: "currentColor",
  width: "20px",
  height: "20px"
};
function Ts(s, e, t, i, n, r) {
  return l(), h("div", wt, [
    a("div", {
      class: "v-bg-white v-border v-border-slate-200 v-rounded-lg v-rounded-br-sm v-py-2 v-px-3 v-text-sm v-cursor-pointer v-w-fit v-hover:bg-slate-100 v-transition-colors v-duration-300",
      onClick: e[0] || (e[0] = (...o) => r.startConversationWithDefaultQuestion && r.startConversationWithDefaultQuestion(...o)),
      innerHTML: t.defaultQuestion
    }, null, 8, xt),
    a("div", {
      class: T(["v-bg-white v-border-1 v-border-bd v-flex v-items-center v-justify-center v-rounded-full v-h-[60px] v-w-[60px] v-z-70 no-shake v-overflow-hidden v-cursor-pointer", { "no-shake": n.hasInteracted }]),
      onClick: e[1] || (e[1] = (...o) => r.toggleChat && r.toggleChat(...o))
    }, e[20] || (e[20] = [
      a("img", {
        src: "https://vafaai.com/widget/images/logo.svg",
        alt: "Chat",
        class: "v-h-[32px]"
      }, null, -1)
    ]), 2),
    E(a("div", {
      class: T(["v-fixed v-transition-all v-duration-300 v-right-[20px] v-bottom-[20px] v-rounded-md v-overflow-hidden v-z-90 v-flex v-flex-col v-shadow-[0_10px_25px_rgba(0,0,0,0.2)]", { "v-max-h-[calc(100%-104px)] v-h-[calc(100%-104px)] v-w-[688px]": n.isMaximize, "v-w-[400px] v-h-[700px] v-max-h-[min(714px,100%-30px)]": !n.isMaximize, "v-right-0 v-bottom-0 v-top-0 v-rounded-none v-h-full v-max-h-100vh v-w-full": n.isMobile }])
    }, [
      n.currentTab === "messenger" ? (l(), h("div", bt, [
        a("div", kt, [
          n.currentTab !== "home" ? (l(), h("div", {
            key: 0,
            class: "v-p-2 v-rounded-lg v-cursor-pointer v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#2222220f] v-transition-colors v-duration-300",
            onClick: e[2] || (e[2] = (o) => r.switchTab("home"))
          }, e[21] || (e[21] = [
            a("svg", {
              viewBox: "0 0 320 512",
              fill: "currentColor",
              width: "16px",
              height: "16px"
            }, [
              a("path", { d: "M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z" })
            ], -1)
          ]))) : p("", !0),
          e[23] || (e[23] = a("img", {
            src: "https://vafaai.com/widget/images/logo.svg",
            alt: "Support Profile",
            class: "v-w-[32px] v-h-[32px]"
          }, null, -1)),
          a("div", _t, [
            e[22] || (e[22] = a("div", { class: "v-text-sm v-font-semibold" }, "پشتیبانی هوشمند ما", -1)),
            a("div", Tt, v(n.connectionStatus), 1)
          ])
        ]),
        a("div", Ct, [
          n.isMobile ? p("", !0) : (l(), h("div", {
            key: 0,
            class: "v-p-2 v-rounded-lg v-cursor-pointer v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#2222220f] v-transition-colors v-duration-300",
            onClick: e[3] || (e[3] = (o) => n.isMaximize = !n.isMaximize)
          }, [
            n.isMaximize ? (l(), h("svg", St, e[24] || (e[24] = [
              a("path", { d: "M489 57c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-135 135L320 72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 144c0 13.3 10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-86.1 0L489 57zM23 455c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l135-135 0 86.1c0 13.3 10.7 24 24 24s24-10.7 24-24l0-144c0-13.3-10.7-24-24-24L72 272c-13.3 0-24 10.7-24 24s10.7 24 24 24l86.1 0L23 455z" }, null, -1)
            ]))) : (l(), h("svg", Et, e[25] || (e[25] = [
              a("path", { d: "M295 183c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l135-135 0 86.1c0 13.3 10.7 24 24 24s24-10.7 24-24l0-144c0-13.3-10.7-24-24-24L344 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l86.1 0L295 183zM217 329c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L48 430.1 48 344c0-13.3-10.7-24-24-24s-24 10.7-24 24L0 488c0 13.3 10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-86.1 0L217 329z" }, null, -1)
            ])))
          ])),
          a("div", {
            class: "v-p-2 v-rounded-lg v-cursor-pointer v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#2222220f] v-transition-colors v-duration-300",
            onClick: e[4] || (e[4] = (...o) => r.closeChat && r.closeChat(...o))
          }, e[26] || (e[26] = [
            a("svg", {
              viewBox: "0 0 384 512",
              fill: "currentColor",
              width: "18px",
              height: "18px"
            }, [
              a("path", { d: "M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z" })
            ], -1)
          ]))
        ])
      ])) : p("", !0),
      n.currentTab === "home" ? (l(), h("div", Lt, [
        a("div", Bt, [
          a("div", At, [
            e[28] || (e[28] = a("img", {
              src: "https://vafaai.com/widget/images/logo.svg",
              alt: "Support Profile",
              class: "v-w-[32px] v-h-[32px]"
            }, null, -1)),
            a("div", Ot, [
              e[27] || (e[27] = a("div", { class: "v-text-sm v-font-semibold" }, "پشتیبانی هوشمند وفا", -1)),
              a("div", Rt, v(n.connectionStatus), 1)
            ])
          ]),
          a("div", Mt, [
            a("div", {
              class: "v-p-2 v-rounded-lg v-cursor-pointer v-text-white v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#22222240] v-transition-colors v-duration-300",
              onClick: e[5] || (e[5] = (...o) => r.closeChat && r.closeChat(...o))
            }, e[29] || (e[29] = [
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
      n.currentTab === "knowledge" ? (l(), h("div", It, [
        n.knowledgeView !== "categories" ? (l(), h("div", {
          key: 0,
          class: "v-p-2 v-rounded-lg v-cursor-pointer v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#2222220f] v-transition-colors v-duration-300",
          onClick: e[6] || (e[6] = (...o) => r.goBackKnowledge && r.goBackKnowledge(...o))
        }, e[30] || (e[30] = [
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
        e[32] || (e[32] = a("div", { class: "v-text-sm v-text-center v-font-semibold v-flex-1" }, "راهنما", -1)),
        a("div", {
          class: "v-p-2 v-rounded-lg v-cursor-pointer v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#2222220f] v-transition-colors v-duration-300",
          onClick: e[7] || (e[7] = (...o) => r.closeChat && r.closeChat(...o))
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
      ])) : p("", !0),
      n.currentTab === "home" ? (l(), h("div", Dt, [
        a("div", qt, [
          a("div", Ut, [
            a("div", {
              class: "v-flex v-items-center v-justify-between v-rounded-lg v-mb-[6px] v-bg-slate-100",
              onClick: e[10] || (e[10] = (...o) => r.focusOnSearch && r.focusOnSearch(...o))
            }, [
              E(a("input", {
                type: "text",
                "onUpdate:modelValue": e[8] || (e[8] = (o) => n.knowledgeSearchQuery = o),
                ref: "homeSearchInput",
                onFocus: e[9] || (e[9] = (...o) => r.showKnowledgeSearch && r.showKnowledgeSearch(...o)),
                placeholder: "جست و جو کنید",
                class: "v-flex-1 v-border-0 v-outline-0 v-bg-transparent v-text-sm v-py-2 v-px-3"
              }, null, 544), [
                [z, n.knowledgeSearchQuery]
              ]),
              e[33] || (e[33] = a("svg", {
                viewBox: "0 0 512 512",
                fill: "currentColor",
                width: "16px",
                height: "16px",
                class: "v-ml-3"
              }, [
                a("path", { d: "M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z" })
              ], -1))
            ]),
            (l(!0), h(L, null, B(n.featuredQuestions, (o) => (l(), h("div", {
              key: o.id,
              class: "v-flex v-items-center v-justify-between v-py-2 v-px-3 v-bg-white v-cursor-pointer v-rounded-lg v-hover:bg-slate-100",
              onClick: (c) => r.navigateToQuestion(o.id)
            }, [
              a("div", zt, v(o.question), 1),
              e[34] || (e[34] = a("svg", {
                viewBox: "0 0 320 512",
                fill: "currentColor",
                width: "14px",
                height: "14px"
              }, [
                a("path", { d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" })
              ], -1))
            ], 8, Pt))), 128))
          ])
        ]),
        a("div", Vt, [
          a("div", {
            class: "v-bg-[#1a237e] v-text-white v-text-md v-rounded-lg v-py-3 v-px-6 v-flex v-items-center v-justify-between v-w-full v-cursor-pointer v-transition-colors v-duration-300",
            onClick: e[11] || (e[11] = (o) => r.switchTab("messenger"))
          }, e[35] || (e[35] = [
            be('<svg viewBox="0 0 512 512" fill="currentColor" width="24px" height="24px" data-v-620edbcf><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm165.8 21.7c-7.6 8.1-20.2 8.5-28.3 .9s-8.5-20.2-.9-28.3c14.5-15.5 35.2-22.3 54.6-22.3s40.1 6.8 54.6 22.3c7.6 8.1 7.1 20.7-.9 28.3s-20.7 7.1-28.3-.9c-5.5-5.8-14.8-9.7-25.4-9.7s-19.9 3.8-25.4 9.7z" data-v-620edbcf></path></svg><div class="v-text-md v-font-bold" data-v-620edbcf>شروع گفتگو</div><svg viewBox="0 0 320 512" fill="currentColor" width="16px" height="16px" data-v-620edbcf><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" data-v-620edbcf></path></svg>', 3)
          ]))
        ])
      ])) : p("", !0),
      n.currentTab === "messenger" ? (l(), h("div", Qt, [
        a("div", Ft, [
          (l(!0), h(L, null, B(n.messages, (o, c) => E((l(), h("div", {
            key: c,
            class: T([
              "v-max-w-[80%] v-rounded-xl v-mb-2 v-text-sm v-py-2 v-px-3",
              o.isUser ? "v-bg-[#1a237e] v-text-white v-rounded-br-sm v-justify-self-start" : "v-bg-slate-100 v-text-slate-800 v-rounded-bl-sm v-justify-self-end",
              o.isStreaming ? "v-streaming-message" : "",
              o.isComplete ? "v-complete-message" : ""
            ])
          }, [
            a("div", {
              innerHTML: o.content
            }, null, 8, Kt)
          ], 2)), [
            [te, o.content && (!o.isComplete || o.isComplete && o.content)]
          ])), 128)),
          n.isThinking ? (l(), h("div", Ht, e[36] || (e[36] = [
            a("span", { class: "typing-dot" }, null, -1),
            a("span", { class: "typing-dot" }, null, -1),
            a("span", { class: "typing-dot" }, null, -1)
          ]))) : p("", !0)
        ]),
        n.showDefaultQuestions && n.currentTab === "messenger" && n.messages.length <= 2 ? (l(), h("div", jt, [
          (l(!0), h(L, null, B(n.defaultQuestions, (o, c) => (l(), h("div", {
            key: c,
            class: "v-border v-border-slate-200 v-rounded-full v-py-2 v-px-3 v-text-sm v-cursor-pointer v-w-fit v-hover:bg-slate-100 v-transition-colors v-duration-300",
            onClick: (d) => r.selectDefaultQuestion(o)
          }, v(o), 9, Wt))), 128))
        ])) : p("", !0)
      ], 512)) : p("", !0),
      n.currentTab === "knowledge" ? (l(), h("div", Yt, [
        a("div", Jt, [
          a("div", Xt, [
            E(a("input", {
              type: "text",
              "onUpdate:modelValue": e[12] || (e[12] = (o) => n.knowledgeSearchQuery = o),
              onInput: e[13] || (e[13] = (...o) => r.searchKnowledgeBase && r.searchKnowledgeBase(...o)),
              placeholder: "جست و جو کنید",
              class: "v-flex-1 v-border-0 v-outline-0 v-bg-transparent v-text-sm v-py-2 v-px-3"
            }, null, 544), [
              [z, n.knowledgeSearchQuery]
            ]),
            e[37] || (e[37] = a("svg", {
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
        n.knowledgeView === "categories" ? (l(), h("div", Gt, [
          a("div", Zt, [
            a("div", $t, v(r.filteredCategories.length) + " دسته بندی ", 1)
          ]),
          (l(!0), h(L, null, B(r.filteredCategories, (o) => (l(), h("div", {
            key: o.id,
            class: "v-flex v-items-center v-justify-between v-border-b v-border-slate-200 v-cursor-pointer v-px-3 v-py-2 v-gap-2 v-hover:bg-slate-100 v-transition-colors v-duration-300",
            onClick: (c) => r.selectCategory(o)
          }, [
            a("div", ts, [
              a("div", ss, v(o.title), 1),
              a("div", is, v(o.description), 1),
              a("div", ns, v(o.questions.length) + " پرسش ", 1)
            ]),
            e[38] || (e[38] = a("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16px",
              height: "16px",
              viewBox: "0 0 320 512",
              fill: "currentColor"
            }, [
              a("path", { d: "M15 239c-9.4 9.4-9.4 24.6 0 33.9L207 465c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L65.9 256 241 81c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L15 239z" })
            ], -1))
          ], 8, es))), 128))
        ])) : p("", !0),
        e[40] || (e[40] = a("div", { class: "v-absolute v-pointer-events-none v-h-[36px] v-bottom-0 v-w-full v-bg-gradient-to-b v-from-transparent v-to-white" }, null, -1)),
        n.knowledgeView === "questions" ? (l(), h("div", rs, [
          a("div", os, [
            a("div", as, v(n.selectedCategory.title), 1),
            a("div", cs, v(n.selectedCategory.description), 1),
            a("div", ls, v(r.filteredQuestions.length) + " پرسش ", 1)
          ]),
          (l(!0), h(L, null, B(r.filteredQuestions, (o) => (l(), h("div", {
            key: o.id,
            class: "v-flex v-items-center v-justify-between v-py-3 v-px-3 v-border-b v-border-slate-200 v-cursor-pointer v-gap-2 v-hover:bg-slate-100 v-transition-colors v-duration-300",
            onClick: (c) => r.selectQuestion(o)
          }, [
            a("div", us, v(o.question), 1),
            e[39] || (e[39] = a("svg", {
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
          ], 8, hs))), 128))
        ])) : p("", !0),
        n.knowledgeView === "answer" ? (l(), h("div", ds, [
          a("div", fs, v(n.selectedQuestion.question), 1),
          a("div", ps, v(n.selectedQuestion.answer), 1)
        ])) : p("", !0)
      ])) : p("", !0),
      n.currentTab === "messenger" ? (l(), h("div", vs, [
        a("div", gs, [
          E(a("input", {
            type: "text",
            "onUpdate:modelValue": e[14] || (e[14] = (o) => n.inputMessage = o),
            onKeyup: e[15] || (e[15] = ke((...o) => r.sendMessage && r.sendMessage(...o), ["enter"])),
            placeholder: "اینجا تایپ کنید ...",
            class: "v-flex-1 v-border-0 v-outline-0 v-bg-transparent v-text-sm v-py-2 v-px-3 v-rounded-full"
          }, null, 544), [
            [z, n.inputMessage]
          ]),
          (l(), h("svg", {
            viewBox: "0 0 512 512",
            fill: "currentColor",
            width: "20px",
            height: "20px",
            class: "v-ml-3 v-text-[#1a237e] v-rotate-180 v-cursor-pointer",
            onClick: e[16] || (e[16] = (...o) => r.sendMessage && r.sendMessage(...o))
          }, e[41] || (e[41] = [
            a("path", { d: "M133.9 232L65.8 95.9 383.4 232l-249.5 0zm0 48l249.5 0L65.8 416.1l68-136.1zM44.6 34.6C32.3 29.3 17.9 32.3 8.7 42S-2.6 66.3 3.4 78.3L92.2 256 3.4 433.7c-6 12-3.9 26.5 5.3 36.3s23.5 12.7 35.9 7.5l448-192c11.8-5 19.4-16.6 19.4-29.4s-7.6-24.4-19.4-29.4l-448-192z" }, null, -1)
          ])))
        ]),
        e[42] || (e[42] = a("div", { class: "v-text-center v-text-xs v-text-slate-600 v-pt-2" }, "ساخته شده با وفا", -1))
      ])) : p("", !0),
      n.currentTab === "home" || n.currentTab === "knowledge" ? (l(), h("div", ms, [
        a("div", {
          class: T(["v-flex v-flex-col v-flex-1 v-items-center v-justify-center v-cursor-pointer v-gap-2", { active: n.currentTab === "home", "v-text-[#1a237e] v-font-semibold": n.currentTab === "home", "v-text-slate-800": n.currentTab !== "home" }]),
          onClick: e[17] || (e[17] = (o) => r.switchTab("home"))
        }, [
          n.currentTab === "home" ? (l(), h("svg", ys, e[43] || (e[43] = [
            a("path", { d: "M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" }, null, -1)
          ]))) : (l(), h("svg", ws, e[44] || (e[44] = [
            a("path", { d: "M303.5 5.7c-9-7.6-22.1-7.6-31.1 0l-264 224c-10.1 8.6-11.3 23.7-2.8 33.8s23.7 11.3 33.8 2.8L64 245.5 64 432c0 44.2 35.8 80 80 80l288 0c44.2 0 80-35.8 80-80l0-186.5 24.5 20.8c10.1 8.6 25.3 7.3 33.8-2.8s7.3-25.3-2.8-33.8l-264-224zM464 204.8L464 432c0 17.7-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32l0-227.2L288 55.5 464 204.8z" }, null, -1)
          ]))),
          e[45] || (e[45] = a("div", { class: "v-text-xs" }, "خانه", -1))
        ], 2),
        a("div", {
          class: T(["v-flex v-flex-col v-flex-1 v-items-center v-justify-center v-cursor-pointer v-gap-2", { active: n.currentTab === "messenger", "v-text-[#1a237e] v-font-semibold": n.currentTab === "messenger", "v-text-slate-800": n.currentTab !== "messenger" }]),
          onClick: e[18] || (e[18] = (o) => r.switchTab("messenger"))
        }, [
          n.currentTab === "messenger" ? (l(), h("svg", xs, e[46] || (e[46] = [
            a("path", { d: "M0 64C0 28.7 28.7 0 64 0L448 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-138.7 0L185.6 508.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3l0-80-96 0c-35.3 0-64-28.7-64-64L0 64zm152 80c-13.3 0-24 10.7-24 24s10.7 24 24 24l208 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-208 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0z" }, null, -1)
          ]))) : (l(), h("svg", bs, e[47] || (e[47] = [
            a("path", { d: "M208 416c0-26.5-21.5-48-48-48l-96 0c-8.8 0-16-7.2-16-16L48 64c0-8.8 7.2-16 16-16l384 0c8.8 0 16 7.2 16 16l0 288c0 8.8-7.2 16-16 16l-138.7 0c-10.4 0-20.5 3.4-28.8 9.6L208 432l0-16zm-.2 76.2l.2-.2 101.3-76L448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l48 0 48 0 0 48 0 4 0 .3 0 6.4 0 21.3c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L202.7 496l5.1-3.8zM152 144c-13.3 0-24 10.7-24 24s10.7 24 24 24l208 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-208 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0z" }, null, -1)
          ]))),
          e[48] || (e[48] = a("div", { class: "v-text-xs" }, "پیام رسان", -1))
        ], 2),
        a("div", {
          class: T(["v-flex v-flex-col v-flex-1 v-items-center v-justify-center v-cursor-pointer v-gap-2", { active: n.currentTab === "knowledge", "v-text-[#1a237e] v-font-semibold": n.currentTab === "knowledge", "v-text-slate-800": n.currentTab !== "knowledge" }]),
          onClick: e[19] || (e[19] = (o) => r.switchTab("knowledge"))
        }, [
          n.currentTab === "knowledge" ? (l(), h("svg", ks, e[49] || (e[49] = [
            a("path", { d: "M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm73.8 133.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L248 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM192 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" }, null, -1)
          ]))) : (l(), h("svg", _s, e[50] || (e[50] = [
            a("path", { d: "M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm137.8 69.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L248 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM192 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" }, null, -1)
          ]))),
          e[51] || (e[51] = a("div", { class: "v-text-xs" }, "راهنما", -1))
        ], 2)
      ])) : p("", !0)
    ], 2), [
      [te, n.isOpen]
    ])
  ]);
}
const xe = /* @__PURE__ */ mt(yt, [["render", Ts], ["__scopeId", "data-v-620edbcf"]]);
function Cs(s, e = {}) {
  const t = document.querySelector(s);
  if (!t) {
    console.error(`Container with selector ${s} not found`);
    return;
  }
  const i = _e(xe, e);
  return i.mount(t), i;
}
const Ss = {
  ChatWidget: xe,
  init: Cs
};
typeof window < "u" && (window.VafaChatWidget = Ss);
export {
  xe as ChatWidget,
  Ss as default,
  Cs as init
};
