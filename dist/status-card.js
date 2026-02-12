const W1 = "v3.2.1", q1 = {
  version: W1
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = globalThis, de = Dt.ShadowRoot && (Dt.ShadyCSS === void 0 || Dt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, he = Symbol(), Le = /* @__PURE__ */ new WeakMap();
let S1 = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== he) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (de && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = Le.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Le.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const K1 = (e) => new S1(typeof e == "string" ? e : e + "", void 0, he), mt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce(((s, o, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[n + 1]), e[0]);
  return new S1(i, e, he);
}, Y1 = (e, t) => {
  if (de) e.adoptedStyleSheets = t.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of t) {
    const s = document.createElement("style"), o = Dt.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, e.appendChild(s);
  }
}, Ae = de ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return K1(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: J1, defineProperty: X1, getOwnPropertyDescriptor: Q1, getOwnPropertyNames: ti, getOwnPropertySymbols: ei, getPrototypeOf: ii } = Object, et = globalThis, He = et.trustedTypes, si = He ? He.emptyScript : "", Ft = et.reactiveElementPolyfillSupport, vt = (e, t) => e, It = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? si : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, ue = (e, t) => !J1(e, t), Ve = { attribute: !0, type: String, converter: It, reflect: !1, useDefault: !1, hasChanged: ue };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), et.litPropertyMetadata ?? (et.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ft = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Ve) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(t, s, i);
      o !== void 0 && X1(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: o, set: n } = Q1(this.prototype, t) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: o, set(a) {
      const c = o == null ? void 0 : o.call(this);
      n == null || n.call(this, a), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ve;
  }
  static _$Ei() {
    if (this.hasOwnProperty(vt("elementProperties"))) return;
    const t = ii(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(vt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(vt("properties"))) {
      const i = this.properties, s = [...ti(i), ...ei(i)];
      for (const o of s) this.createProperty(o, i[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [s, o] of i) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const o = this._$Eu(i, s);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const o of s) i.unshift(Ae(o));
    } else t !== void 0 && i.push(Ae(t));
    return i;
  }
  static _$Eu(t, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise(((i) => this.enableUpdating = i)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach(((i) => i(this)));
  }
  addController(t) {
    var i;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) == null || i.call(t));
  }
  removeController(t) {
    var i;
    (i = this._$EO) == null || i.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Y1(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach(((i) => {
      var s;
      return (s = i.hostConnected) == null ? void 0 : s.call(i);
    }));
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach(((i) => {
      var s;
      return (s = i.hostDisconnected) == null ? void 0 : s.call(i);
    }));
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$ET(t, i) {
    var n;
    const s = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, s);
    if (o !== void 0 && s.reflect === !0) {
      const a = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : It).toAttribute(i, s.type);
      this._$Em = t, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var n, a;
    const s = this.constructor, o = s._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const c = s.getPropertyOptions(o), r = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : It;
      this._$Em = o;
      const l = r.fromAttribute(i, c.type);
      this[o] = l ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, i, s) {
    var o;
    if (t !== void 0) {
      const n = this.constructor, a = this[t];
      if (s ?? (s = n.getPropertyOptions(t)), !((s.hasChanged ?? ue)(a, i) || s.useDefault && s.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: o, wrapped: n }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? i ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, a] of o) {
        const { wrapped: c } = a, r = this[n];
        c !== !0 || this._$AL.has(n) || r === void 0 || this.C(n, void 0, a, r);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach(((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
      })), this.update(i)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var i;
    (i = this._$EO) == null || i.forEach(((s) => {
      var o;
      return (o = s.hostUpdated) == null ? void 0 : o.call(s);
    })), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach(((i) => this._$ET(i, this[i])))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
ft.elementStyles = [], ft.shadowRootOptions = { mode: "open" }, ft[vt("elementProperties")] = /* @__PURE__ */ new Map(), ft[vt("finalized")] = /* @__PURE__ */ new Map(), Ft == null || Ft({ ReactiveElement: ft }), (et.reactiveElementVersions ?? (et.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bt = globalThis, Tt = bt.trustedTypes, $e = Tt ? Tt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, x1 = "$lit$", Q = `lit$${Math.random().toFixed(9).slice(2)}$`, z1 = "?" + Q, oi = `<${z1}>`, lt = document, Lt = () => lt.createComment(""), At = (e) => e === null || typeof e != "object" && typeof e != "function", pe = Array.isArray, ni = (e) => pe(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Nt = `[ 	
\f\r]`, Ct = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Me = /-->/g, we = />/g, nt = RegExp(`>|${Nt}(?:([^\\s"'>=/]+)(${Nt}*=${Nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ee = /'/g, Se = /"/g, k1 = /^(?:script|style|textarea|title)$/i, ai = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), g = ai(1), U = Symbol.for("lit-noChange"), D = Symbol.for("lit-nothing"), xe = /* @__PURE__ */ new WeakMap(), rt = lt.createTreeWalker(lt, 129);
function D1(e, t) {
  if (!pe(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return $e !== void 0 ? $e.createHTML(t) : t;
}
const ri = (e, t) => {
  const i = e.length - 1, s = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Ct;
  for (let c = 0; c < i; c++) {
    const r = e[c];
    let l, d, h = -1, f = 0;
    for (; f < r.length && (a.lastIndex = f, d = a.exec(r), d !== null); ) f = a.lastIndex, a === Ct ? d[1] === "!--" ? a = Me : d[1] !== void 0 ? a = we : d[2] !== void 0 ? (k1.test(d[2]) && (o = RegExp("</" + d[2], "g")), a = nt) : d[3] !== void 0 && (a = nt) : a === nt ? d[0] === ">" ? (a = o ?? Ct, h = -1) : d[1] === void 0 ? h = -2 : (h = a.lastIndex - d[2].length, l = d[1], a = d[3] === void 0 ? nt : d[3] === '"' ? Se : Ee) : a === Se || a === Ee ? a = nt : a === Me || a === we ? a = Ct : (a = nt, o = void 0);
    const u = a === nt && e[c + 1].startsWith("/>") ? " " : "";
    n += a === Ct ? r + oi : h >= 0 ? (s.push(l), r.slice(0, h) + x1 + r.slice(h) + Q + u) : r + Q + (h === -2 ? c : u);
  }
  return [D1(e, n + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Ht {
  constructor({ strings: t, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let n = 0, a = 0;
    const c = t.length - 1, r = this.parts, [l, d] = ri(t, i);
    if (this.el = Ht.createElement(l, s), rt.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = rt.nextNode()) !== null && r.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(x1)) {
          const f = d[a++], u = o.getAttribute(h).split(Q), m = /([.?@])?(.*)/.exec(f);
          r.push({ type: 1, index: n, name: m[2], strings: u, ctor: m[1] === "." ? li : m[1] === "?" ? di : m[1] === "@" ? hi : Zt }), o.removeAttribute(h);
        } else h.startsWith(Q) && (r.push({ type: 6, index: n }), o.removeAttribute(h));
        if (k1.test(o.tagName)) {
          const h = o.textContent.split(Q), f = h.length - 1;
          if (f > 0) {
            o.textContent = Tt ? Tt.emptyScript : "";
            for (let u = 0; u < f; u++) o.append(h[u], Lt()), rt.nextNode(), r.push({ type: 2, index: ++n });
            o.append(h[f], Lt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === z1) r.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(Q, h + 1)) !== -1; ) r.push({ type: 7, index: n }), h += Q.length - 1;
      }
      n++;
    }
  }
  static createElement(t, i) {
    const s = lt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function _t(e, t, i = e, s) {
  var a, c;
  if (t === U) return t;
  let o = s !== void 0 ? (a = i._$Co) == null ? void 0 : a[s] : i._$Cl;
  const n = At(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((c = o == null ? void 0 : o._$AO) == null || c.call(o, !1), n === void 0 ? o = void 0 : (o = new n(e), o._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = o : i._$Cl = o), o !== void 0 && (t = _t(e, o._$AS(e, t.values), o, s)), t;
}
let ci = class {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: s } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? lt).importNode(i, !0);
    rt.currentNode = o;
    let n = rt.nextNode(), a = 0, c = 0, r = s[0];
    for (; r !== void 0; ) {
      if (a === r.index) {
        let l;
        r.type === 2 ? l = new gt(n, n.nextSibling, this, t) : r.type === 1 ? l = new r.ctor(n, r.name, r.strings, this, t) : r.type === 6 && (l = new ui(n, this, t)), this._$AV.push(l), r = s[++c];
      }
      a !== (r == null ? void 0 : r.index) && (n = rt.nextNode(), a++);
    }
    return rt.currentNode = lt, o;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
};
class gt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, s, o) {
    this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = _t(this, t, i), At(t) ? t === D || t == null || t === "" ? (this._$AH !== D && this._$AR(), this._$AH = D) : t !== this._$AH && t !== U && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ni(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== D && At(this._$AH) ? this._$AA.nextSibling.data = t : this.T(lt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: i, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Ht.createElement(D1(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(i);
    else {
      const a = new ci(o, this), c = a.u(this.options);
      a.p(i), this.T(c), this._$AH = a;
    }
  }
  _$AC(t) {
    let i = xe.get(t.strings);
    return i === void 0 && xe.set(t.strings, i = new Ht(t)), i;
  }
  k(t) {
    pe(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const n of t) o === i.length ? i.push(s = new gt(this.O(Lt()), this.O(Lt()), this, this.options)) : s = i[o], s._$AI(n), o++;
    o < i.length && (this._$AR(s && s._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); t !== this._$AB; ) {
      const o = t.nextSibling;
      t.remove(), t = o;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class Zt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, o, n) {
    this.type = 1, this._$AH = D, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = D;
  }
  _$AI(t, i = this, s, o) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = _t(this, t, i, 0), a = !At(t) || t !== this._$AH && t !== U, a && (this._$AH = t);
    else {
      const c = t;
      let r, l;
      for (t = n[0], r = 0; r < n.length - 1; r++) l = _t(this, c[s + r], i, r), l === U && (l = this._$AH[r]), a || (a = !At(l) || l !== this._$AH[r]), l === D ? t = D : t !== D && (t += (l ?? "") + n[r + 1]), this._$AH[r] = l;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class li extends Zt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === D ? void 0 : t;
  }
}
class di extends Zt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== D);
  }
}
class hi extends Zt {
  constructor(t, i, s, o, n) {
    super(t, i, s, o, n), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = _t(this, t, i, 0) ?? D) === U) return;
    const s = this._$AH, o = t === D && s !== D || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== D && (s === D || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ui {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    _t(this, t);
  }
}
const pi = { I: gt }, Ut = bt.litHtmlPolyfillSupport;
Ut == null || Ut(Ht, gt), (bt.litHtmlVersions ?? (bt.litHtmlVersions = [])).push("3.3.1");
const fi = (e, t, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? t;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = o = new gt(t.insertBefore(Lt(), n), n, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct = globalThis;
let N = class extends ft {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const t = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = t.firstChild), t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = fi(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return U;
  }
};
var E1;
N._$litElement$ = !0, N.finalized = !0, (E1 = ct.litElementHydrateSupport) == null || E1.call(ct, { LitElement: N });
const Wt = ct.litElementPolyfillSupport;
Wt == null || Wt({ LitElement: N });
(ct.litElementVersions ?? (ct.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer((() => {
    customElements.define(e, t);
  })) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _i = { attribute: !0, type: String, converter: It, reflect: !1, hasChanged: ue }, mi = (e = _i, t, i) => {
  const { kind: s, metadata: o } = i;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(i.name, e), s === "accessor") {
    const { name: a } = i;
    return { set(c) {
      const r = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(a, r, e);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, e, c), c;
    } };
  }
  if (s === "setter") {
    const { name: a } = i;
    return function(c) {
      const r = this[a];
      t.call(this, c), this.requestUpdate(a, r, e);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function $(e) {
  return (t, i) => typeof i == "object" ? mi(e, t, i) : ((s, o, n) => {
    const a = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, s), a ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function H(e) {
  return $({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe = { ATTRIBUTE: 1, CHILD: 2 }, Rt = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Bt = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, i, s) {
    this._$Ct = t, this._$AM = i, this._$Ci = s;
  }
  _$AS(t, i) {
    return this.update(t, i);
  }
  update(t, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: gi } = pi, ze = () => document.createComment(""), yt = (e, t, i) => {
  var n;
  const s = e._$AA.parentNode, o = t === void 0 ? e._$AB : t._$AA;
  if (i === void 0) {
    const a = s.insertBefore(ze(), o), c = s.insertBefore(ze(), o);
    i = new gi(a, c, e, e.options);
  } else {
    const a = i._$AB.nextSibling, c = i._$AM, r = c !== e;
    if (r) {
      let l;
      (n = i._$AQ) == null || n.call(i, e), i._$AM = e, i._$AP !== void 0 && (l = e._$AU) !== c._$AU && i._$AP(l);
    }
    if (a !== o || r) {
      let l = i._$AA;
      for (; l !== a; ) {
        const d = l.nextSibling;
        s.insertBefore(l, o), l = d;
      }
    }
  }
  return i;
}, at = (e, t, i = e) => (e._$AI(t, i), e), Ci = {}, yi = (e, t = Ci) => e._$AH = t, vi = (e) => e._$AH, qt = (e) => {
  e._$AR(), e._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ke = (e, t, i) => {
  const s = /* @__PURE__ */ new Map();
  for (let o = t; o <= i; o++) s.set(e[o], o);
  return s;
}, tt = Rt(class extends Bt {
  constructor(e) {
    if (super(e), e.type !== fe.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, i) {
    let s;
    i === void 0 ? i = t : t !== void 0 && (s = t);
    const o = [], n = [];
    let a = 0;
    for (const c of e) o[a] = s ? s(c, a) : a, n[a] = i(c, a), a++;
    return { values: n, keys: o };
  }
  render(e, t, i) {
    return this.dt(e, t, i).values;
  }
  update(e, [t, i, s]) {
    const o = vi(e), { values: n, keys: a } = this.dt(t, i, s);
    if (!Array.isArray(o)) return this.ut = a, n;
    const c = this.ut ?? (this.ut = []), r = [];
    let l, d, h = 0, f = o.length - 1, u = 0, m = n.length - 1;
    for (; h <= f && u <= m; ) if (o[h] === null) h++;
    else if (o[f] === null) f--;
    else if (c[h] === a[u]) r[u] = at(o[h], n[u]), h++, u++;
    else if (c[f] === a[m]) r[m] = at(o[f], n[m]), f--, m--;
    else if (c[h] === a[m]) r[m] = at(o[h], n[m]), yt(e, r[m + 1], o[h]), h++, m--;
    else if (c[f] === a[u]) r[u] = at(o[f], n[u]), yt(e, o[h], o[f]), f--, u++;
    else if (l === void 0 && (l = ke(a, u, m), d = ke(c, h, f)), l.has(c[h])) if (l.has(c[f])) {
      const y = d.get(a[u]), _ = y !== void 0 ? o[y] : null;
      if (_ === null) {
        const p = yt(e, o[h]);
        at(p, n[u]), r[u] = p;
      } else r[u] = at(_, n[u]), yt(e, o[h], _), o[y] = null;
      u++;
    } else qt(o[f]), f--;
    else qt(o[h]), h++;
    for (; u <= m; ) {
      const y = yt(e, r[m + 1]);
      at(y, n[u]), r[u++] = y;
    }
    for (; h <= f; ) {
      const y = o[h++];
      y !== null && qt(y);
    }
    return this.ut = a, yi(e, r), U;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = Rt(class extends Bt {
  constructor(e) {
    var t;
    if (super(e), e.type !== fe.ATTRIBUTE || e.name !== "class" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return " " + Object.keys(e).filter(((t) => e[t])).join(" ") + " ";
  }
  update(e, [t]) {
    var s, o;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter(((n) => n !== ""))));
      for (const n in t) t[n] && !((s = this.nt) != null && s.has(n)) && this.st.add(n);
      return this.render(t);
    }
    const i = e.element.classList;
    for (const n of this.st) n in t || (i.remove(n), this.st.delete(n));
    for (const n in t) {
      const a = !!t[n];
      a === this.st.has(n) || (o = this.nt) != null && o.has(n) || (a ? (i.add(n), this.st.add(n)) : (i.remove(n), this.st.delete(n)));
    }
    return U;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O1 = "important", bi = " !" + O1, z = Rt(class extends Bt {
  constructor(e) {
    var t;
    if (super(e), e.type !== fe.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return Object.keys(e).reduce(((t, i) => {
      const s = e[i];
      return s == null ? t : t + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }), "");
  }
  update(e, [t]) {
    const { style: i } = e.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const s of this.ft) t[s] == null && (this.ft.delete(s), s.includes("-") ? i.removeProperty(s) : i[s] = null);
    for (const s in t) {
      const o = t[s];
      if (o != null) {
        this.ft.add(s);
        const n = typeof o == "string" && o.endsWith(bi);
        s.includes("-") || n ? i.setProperty(s, n ? o.slice(0, -11) : o, n ? O1 : "") : i[s] = o;
      }
    }
    return U;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Kt = (e) => e ?? D;
var De = Number.isNaN || function(t) {
  return typeof t == "number" && t !== t;
};
function Li(e, t) {
  return !!(e === t || De(e) && De(t));
}
function Ai(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var i = 0; i < e.length; i++)
    if (!Li(e[i], t[i]))
      return !1;
  return !0;
}
function M(e, t) {
  t === void 0 && (t = Ai);
  var i = null;
  function s() {
    for (var o = [], n = 0; n < arguments.length; n++)
      o[n] = arguments[n];
    if (i && i.lastThis === this && t(o, i.lastArgs))
      return i.lastResult;
    var a = e.apply(this, o);
    return i = {
      lastResult: a,
      lastArgs: o,
      lastThis: this
    }, a;
  }
  return s.clear = function() {
    i = null;
  }, s;
}
var Oe = "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z", Ie = "M12,4A4,4 0 0,1 16,8C16,9.95 14.6,11.58 12.75,11.93L8.07,7.25C8.42,5.4 10.05,4 12,4M12.28,14L18.28,20L20,21.72L18.73,23L15.73,20H4V18C4,16.16 6.5,14.61 9.87,14.14L2.78,7.05L4.05,5.78L12.28,14M20,18V19.18L15.14,14.32C18,14.93 20,16.35 20,18Z", Te = "M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z", Hi = "M11 9C8.79 9 7 10.79 7 13S8.79 17 11 17 15 15.21 15 13 13.21 9 11 9M11 15C9.9 15 9 14.11 9 13S9.9 11 11 11 13 11.9 13 13 12.11 15 11 15M7 4H14C16.21 4 18 5.79 18 8V9H16V8C16 6.9 15.11 6 14 6H7C5.9 6 5 6.9 5 8V20H16V18H18V22H3V8C3 5.79 4.79 4 7 4M19 10.5C19 10.5 21 12.67 21 14C21 15.1 20.1 16 19 16S17 15.1 17 14C17 12.67 19 10.5 19 10.5", Vi = "M22.1 21.5L2.4 1.7L1.1 3L3.8 5.7C3.3 6.3 3 7.1 3 8V22H18V19.9L20.8 22.7L22.1 21.5M9.6 11.5L12.4 14.3C12.1 14.7 11.6 15 11 15C9.9 15 9 14.1 9 13C9 12.4 9.3 11.9 9.6 11.5M16 17.9V20H5V8C5 7.7 5.1 7.4 5.2 7.1L8.2 10.1C7.5 10.8 7 11.9 7 13C7 15.2 8.8 17 11 17C12.1 17 13.2 16.5 13.9 15.8L16 17.9M17 13.8C17.1 12.5 19 10.5 19 10.5S21 12.7 21 14C21 15 20.2 15.9 19.2 16L17 13.8M9.2 6L7.2 4H14C16.2 4 18 5.8 18 8V9H16V8C16 6.9 15.1 6 14 6H9.2Z", $i = "M6,6.9L3.87,4.78L5.28,3.37L7.4,5.5L6,6.9M13,1V4H11V1H13M20.13,4.78L18,6.9L16.6,5.5L18.72,3.37L20.13,4.78M4.5,10.5V12.5H1.5V10.5H4.5M19.5,10.5H22.5V12.5H19.5V10.5M6,20H18A2,2 0 0,1 20,22H4A2,2 0 0,1 6,20M12,5A6,6 0 0,1 18,11V19H6V11A6,6 0 0,1 12,5Z", Mi = "M18 14.8L9 5.8C9.9 5.3 10.9 5 12 5C15.3 5 18 7.7 18 11V14.8M20.1 4.8L18.7 3.4L16.6 5.5L18 6.9L20.1 4.8M19.5 10.5V12.5H22.5V10.5H19.5M4.5 10.5H1.5V12.5H4.5V10.5M1.1 3L6.6 8.5C6.2 9.2 6 10.1 6 11V19H17.1L18.1 20H6C4.9 20 4 20.9 4 22H20.1L20.8 22.7L22.1 21.4L2.4 1.7L1.1 3M13 1H11V4H13V1Z", wi = "M18.75 22.16L16 19.16L17.16 18L18.75 19.59L22.34 16L23.5 17.41L18.75 22.16M11 15H13V17H11V15M11 7H13V13H11V7M12 2C17.5 2 22 6.5 22 12L21.92 13.31C21.31 13.11 20.67 13 19.94 13L20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C12.71 20 13.39 19.91 14.05 19.74C14.13 20.42 14.33 21.06 14.62 21.65C13.78 21.88 12.9 22 12 22C6.47 22 2 17.5 2 12C2 6.5 6.47 2 12 2Z", Ei = "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z", Pe = "M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z", Ze = "M18 12C18 11 17.74 10.04 17.3 9.2L18.76 7.74C19.54 8.97 20 10.43 20 12C20 13.39 19.64 14.68 19 15.82L17.5 14.32C17.82 13.6 18 12.83 18 12M2.39 1.73L1.11 3L5.5 7.37C4.55 8.68 4 10.27 4 12C4 13.57 4.46 15.03 5.24 16.26L6.7 14.8C6.25 13.97 6 13 6 12C6 10.83 6.34 9.74 6.92 8.81L15.19 17.08C14.26 17.66 13.17 18 12 18V15L8 19L12 23V20C13.73 20 15.32 19.45 16.63 18.5L20.84 22.73L22.11 21.46L2.39 1.73M12 6V8.8L12.1 8.9L16 5L12 1V4C10.62 4 9.32 4.36 8.18 5L9.68 6.5C10.4 6.18 11.18 6 12 6Z", Ge = "M5.06 7C4.63 7 4.22 7.14 3.84 7.42C3.46 7.7 3.24 8.06 3.14 8.5L2.11 12.91C1.86 14 2.06 14.92 2.69 15.73C2.81 15.85 2.93 15.97 3.04 16.07C3.63 16.64 4.28 17 5.22 17C6.16 17 6.91 16.59 7.47 16.05C8.1 16.67 8.86 17 9.8 17C10.64 17 11.44 16.63 12 16.07C12.68 16.7 13.45 17 14.3 17C15.17 17 15.91 16.67 16.54 16.05C17.11 16.62 17.86 17 18.81 17C19.76 17 20.43 16.65 21 16.06C21.09 15.97 21.18 15.87 21.28 15.77C21.94 14.95 22.14 14 21.89 12.91L20.86 8.5C20.73 8.06 20.5 7.7 20.13 7.42C19.77 7.14 19.38 7 18.94 7H5.06M18.89 8.97L19.97 13.38C20.06 13.81 19.97 14.2 19.69 14.55C19.44 14.86 19.13 15 18.75 15C18.44 15 18.17 14.9 17.95 14.66C17.73 14.43 17.61 14.16 17.58 13.84L16.97 9L18.89 8.97M5.06 9H7.03L6.42 13.84C6.3 14.63 5.91 15 5.25 15C4.84 15 4.53 14.86 4.31 14.55C4.03 14.2 3.94 13.81 4.03 13.38L5.06 9M9.05 9H11V13.7C11 14.05 10.89 14.35 10.64 14.62C10.39 14.88 10.08 15 9.7 15C9.36 15 9.07 14.88 8.84 14.59C8.61 14.3 8.5 14 8.5 13.66V13.5L9.05 9M13 9H14.95L15.5 13.5C15.58 13.92 15.5 14.27 15.21 14.57C14.95 14.87 14.61 15 14.2 15C13.89 15 13.61 14.88 13.36 14.62C13.11 14.35 13 14.05 13 13.7V9Z", Si = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z", xi = "M13 14H11V8H13M13 18H11V16H13M16.7 4H15V2H9V4H7.3C6.6 4 6 4.6 6 5.3V20.6C6 21.4 6.6 22 7.3 22H16.6C17.3 22 17.9 21.4 17.9 20.7V5.3C18 4.6 17.4 4 16.7 4Z", zi = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.66C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4M11,20V14.5H9L13,7V12.5H15", ki = "M16.75 21.16L14 18.16L15.16 17L16.75 18.59L20.34 15L21.5 16.41L16.75 21.16M12 18C12 14.69 14.69 12 18 12V5.33C18 4.6 17.4 4 16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H13.54C12.58 20.94 12 19.54 12 18Z", Di = "M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21", Re = "M20.84,22.73L18.11,20H3V19L5,17V11C5,9.86 5.29,8.73 5.83,7.72L1.11,3L2.39,1.73L22.11,21.46L20.84,22.73M19,15.8V11C19,7.9 16.97,5.17 14,4.29C14,4.19 14,4.1 14,4A2,2 0 0,0 12,2A2,2 0 0,0 10,4C10,4.1 10,4.19 10,4.29C9.39,4.47 8.8,4.74 8.26,5.09L19,15.8M12,23A2,2 0 0,0 14,21H10A2,2 0 0,0 12,23Z", Oi = "M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z", Ii = "M3,2H21A1,1 0 0,1 22,3V5A1,1 0 0,1 21,6H20V13A1,1 0 0,1 19,14H13V16.17C14.17,16.58 15,17.69 15,19A3,3 0 0,1 12,22A3,3 0 0,1 9,19C9,17.69 9.83,16.58 11,16.17V14H5A1,1 0 0,1 4,13V6H3A1,1 0 0,1 2,5V3A1,1 0 0,1 3,2M12,18A1,1 0 0,0 11,19A1,1 0 0,0 12,20A1,1 0 0,0 13,19A1,1 0 0,0 12,18Z", Ti = "M3 2H21C21.55 2 22 2.45 22 3V5C22 5.55 21.55 6 21 6H20V7C20 7.55 19.55 8 19 8H13V10.17C14.17 10.58 15 11.7 15 13C15 14.66 13.66 16 12 16C10.34 16 9 14.66 9 13C9 11.69 9.84 10.58 11 10.17V8H5C4.45 8 4 7.55 4 7V6H3C2.45 6 2 5.55 2 5V3C2 2.45 2.45 2 3 2M12 12C11.45 12 11 12.45 11 13C11 13.55 11.45 14 12 14C12.55 14 13 13.55 13 13C13 12.45 12.55 12 12 12Z", Be = "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z", Et = "M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z", je = "M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M9.31,17L11.75,14.56L14.19,17L15.25,15.94L12.81,13.5L15.25,11.06L14.19,10L11.75,12.44L9.31,10L8.25,11.06L10.69,13.5L8.25,15.94L9.31,17Z", Fe = "M19 19H5V8H19M16 1V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3H18V1M10.88 12H7.27L10.19 14.11L9.08 17.56L12 15.43L14.92 17.56L13.8 14.12L16.72 12H13.12L12 8.56L10.88 12Z", Pi = "M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z", Zi = "M1.2,4.47L2.5,3.2L20,20.72L18.73,22L16.73,20H4A2,2 0 0,1 2,18V6C2,5.78 2.04,5.57 2.1,5.37L1.2,4.47M7,4L9,2H15L17,4H20A2,2 0 0,1 22,6V18C22,18.6 21.74,19.13 21.32,19.5L16.33,14.5C16.76,13.77 17,12.91 17,12A5,5 0 0,0 12,7C11.09,7 10.23,7.24 9.5,7.67L5.82,4H7M7,12A5,5 0 0,0 12,17C12.5,17 13.03,16.92 13.5,16.77L11.72,15C10.29,14.85 9.15,13.71 9,12.28L7.23,10.5C7.08,10.97 7,11.5 7,12M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9Z", Gi = "M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z", Ri = "M20.5,19.85L6.41,5.76L2.41,1.76L1.11,3L4.57,6.46L3,11V19A1,1 0 0,0 4,20H5A1,1 0 0,0 6,19V18H16.11L20.84,22.73L22.11,21.46L20.5,19.85M6.5,15A1.5,1.5 0 0,1 5,13.5A1.5,1.5 0 0,1 6.5,12A1.5,1.5 0 0,1 8,13.5A1.5,1.5 0 0,1 6.5,15M5,10L5.78,7.67L8.11,10H5M17.5,5.5L19,10H13.2L16.12,12.92C16.5,12.17 17.37,11.86 18.12,12.21C18.87,12.57 19.18,13.47 18.83,14.21C18.68,14.5 18.43,14.77 18.12,14.92L21,17.8V11L18.92,5C18.71,4.4 18.14,4 17.5,4H7.2L8.7,5.5H17.5Z", Bi = "M1,10V12A9,9 0 0,1 10,21H12C12,14.92 7.07,10 1,10M1,14V16A5,5 0 0,1 6,21H8A7,7 0 0,0 1,14M1,18V21H4A3,3 0 0,0 1,18M21,3H3C1.89,3 1,3.89 1,5V8H3V5H21V19H14V21H21A2,2 0 0,0 23,19V5C23,3.89 22.1,3 21,3Z", ji = "M1.6,1.27L0.25,2.75L1.41,3.8C1.16,4.13 1,4.55 1,5V8H3V5.23L18.2,19H14V21H20.41L22.31,22.72L23.65,21.24M6.5,3L8.7,5H21V16.14L23,17.95V5C23,3.89 22.1,3 21,3M1,10V12A9,9 0 0,1 10,21H12C12,14.92 7.08,10 1,10M1,14V16A5,5 0 0,1 6,21H8A7,7 0 0,0 1,14M1,18V21H4A3,3 0 0,0 1,18Z", Fi = "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z", Ni = "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z", Ui = "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z", Wi = "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z", qi = "M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M12.5 12.8L7.7 15.6L7 14.2L11 11.9V7H12.5V12.8Z", _e = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", Ne = "M12,23A1,1 0 0,1 11,22V19H7A2,2 0 0,1 5,17V7A2,2 0 0,1 7,5H21A2,2 0 0,1 23,7V17A2,2 0 0,1 21,19H16.9L13.2,22.71C13,22.89 12.76,23 12.5,23H12M3,15H1V3A2,2 0 0,1 3,1H19V3H3V15Z", Ue = "M21.4 7.5C22.2 8.3 22.2 9.6 21.4 10.3L18.6 13.1L10.8 5.3L13.6 2.5C14.4 1.7 15.7 1.7 16.4 2.5L18.2 4.3L21.2 1.3L22.6 2.7L19.6 5.7L21.4 7.5M15.6 13.3L14.2 11.9L11.4 14.7L9.3 12.6L12.1 9.8L10.7 8.4L7.9 11.2L6.4 9.8L3.6 12.6C2.8 13.4 2.8 14.7 3.6 15.4L5.4 17.2L1.4 21.2L2.8 22.6L6.8 18.6L8.6 20.4C9.4 21.2 10.7 21.2 11.4 20.4L14.2 17.6L12.8 16.2L15.6 13.3Z", We = "M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z", Ki = "M23 3H1V1H23V3M2 22H6C6 19 4 17 4 17C10 13 11 4 11 4H2V22M22 4H13C13 4 14 13 20 17C20 17 18 19 18 22H22V4Z", Yi = "M23 3H1V1H23V3M2 22H11V4H2V22M22 4H13V22H22V4Z", qe = "M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z", Ke = "M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z", Ji = "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z", Ye = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z", Je = "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z", Xi = "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z", Qi = "M12.5,2C9.64,2 8.57,4.55 9.29,7.47L15,13.16C15.87,13.37 16.81,13.81 17.28,14.73C18.46,17.1 22.03,17 22.03,12.5C22.03,8.92 18.05,8.13 14.35,10.13C14.03,9.73 13.61,9.42 13.13,9.22C13.32,8.29 13.76,7.24 14.75,6.75C17.11,5.57 17,2 12.5,2M3.28,4L2,5.27L4.47,7.73C3.22,7.74 2,8.87 2,11.5C2,15.07 5.96,15.85 9.65,13.87C9.97,14.27 10.4,14.59 10.89,14.79C10.69,15.71 10.25,16.75 9.27,17.24C6.91,18.42 7,22 11.5,22C13.8,22 14.94,20.36 14.94,18.21L18.73,22L20,20.72L3.28,4Z", St = "M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z", ts = "M5 5V19H7V21H3V3H7V5H5M20 7H7V9H20V7M20 11H7V13H20V11M20 15H7V17H20V15Z", es = "M17 14V17H14V19H17V22H19V19H22V17H19V14M20 11V12.3C19.4 12.1 18.7 12 18 12C16.8 12 15.6 12.4 14.7 13H7V11H20M12.1 17H7V15H12.8C12.5 15.6 12.2 16.3 12.1 17M7 7H20V9H7V7M5 19H7V21H3V3H7V5H5V19Z", Yt = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z", Jt = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12Z", is = "M1 4.27L2.28 3L6 6.72L21 21.72L19.73 23L17.72 21C16.56 20.85 15.65 19.94 15.5 18.78L14 17.27V21H4V7.27L1 4.27M19.77 7.23C20.22 7.68 20.5 8.31 20.5 9L20.5 18.67L19 17.18V11.29C18.69 11.42 18.36 11.5 18 11.5C16.62 11.5 15.5 10.38 15.5 9C15.5 7.93 16.17 7.03 17.11 6.67L15 4.56L16.06 3.5L19.78 7.22L19.77 7.23M11.82 10H12V5H6.82L5.06 3.24C5.34 3.09 5.66 3 6 3H12C13.1 3 14 3.9 14 5V12H15C16.1 12 17 12.9 17 14V15.18L11.82 10M6 10H6.73L6 9.27V10M6 12V19H12V15.27L8.73 12H6M18 10C18.55 10 19 9.55 19 9C19 8.45 18.55 8 18 8C17.45 8 17 8.45 17 9C17 9.55 17.45 10 18 10Z", ss = "M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7.03 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14A2,2 0 0,0 15,12H14V5A2,2 0 0,0 12,3H6A2,2 0 0,0 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23M12,13.5V19H6V12H12V13.5M12,10H6V5H12V10M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10Z", os = "M9 6V11H7V7H5V11H3V9H1V21H3V19H5V21H7V19H9V21H11V19H13V21H15V19H17V21H19V19H21V21H23V9H21V11H19V7H17V11H15V6H13V11H11V6H9M3 13H5V17H3V13M7 13H9V17H7V13M11 13H13V17H11V13M15 13H17V17H15V13M19 13H21V17H19V13Z", ns = "M7 21V7H5V11H3V9H1V21H3V19H5V21H7M3 17V13H5V17H3M21 9V11H19V7H17V21H19V19H21V21H23V9H21M21 17H19V13H21V17Z", Xe = "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z", Qe = "M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z", t1 = "M15,12C13.89,12 13,12.89 13,14A2,2 0 0,0 15,16A2,2 0 0,0 17,14C17,12.89 16.1,12 15,12M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M14,9C14,7.89 13.1,7 12,7C10.89,7 10,7.89 10,9A2,2 0 0,0 12,11A2,2 0 0,0 14,9M9,12A2,2 0 0,0 7,14A2,2 0 0,0 9,16A2,2 0 0,0 11,14C11,12.89 10.1,12 9,12Z", as = "M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z", rs = "M24 13L20 17V14H11V12H20V9L24 13M4 20V12H1L11 3L18 9.3V10H15.79L11 5.69L6 10.19V18H16V16H18V20H4Z", cs = "M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22", ls = "M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z", e1 = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z", ds = "M21 17.2L6.8 3H19C20.1 3 21 3.9 21 5V17.2M20.7 22L19.7 21H5C3.9 21 3 20.1 3 19V4.3L2 3.3L3.3 2L22 20.7L20.7 22M16.8 18L12.9 14.1L11 16.5L8.5 13.5L5 18H16.8Z", hs = "M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z", us = "M12,2C9.76,2 7.78,3.05 6.5,4.68L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z", ps = "M12,2C9.76,2 7.78,3.05 6.5,4.68L7.93,6.11C8.84,4.84 10.32,4 12,4A5,5 0 0,1 17,9C17,10.68 16.16,12.16 14.89,13.06L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M7.23,10.5L12.73,16H10V13.58C8.68,13 7.66,11.88 7.23,10.5M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z", fs = "M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z", i1 = "M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z", s1 = "M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17Z", o1 = "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z", n1 = "M16.37,16.1L11.75,11.47L11.64,11.36L3.27,3L2,4.27L5.18,7.45C5.06,7.95 5,8.46 5,9C5,14.25 12,22 12,22C12,22 13.67,20.15 15.37,17.65L18.73,21L20,19.72M12,6.5A2.5,2.5 0 0,1 14.5,9C14.5,9.73 14.17,10.39 13.67,10.85L17.3,14.5C18.28,12.62 19,10.68 19,9A7,7 0 0,0 12,2C10,2 8.24,2.82 6.96,4.14L10.15,7.33C10.61,6.82 11.26,6.5 12,6.5Z", _s = "M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z", ms = "M19,11C19,12.19 18.66,13.3 18.1,14.28L16.87,13.05C17.14,12.43 17.3,11.74 17.3,11H19M15,11.16L9,5.18V5A3,3 0 0,1 12,2A3,3 0 0,1 15,5V11L15,11.16M4.27,3L21,19.73L19.73,21L15.54,16.81C14.77,17.27 13.91,17.58 13,17.72V21H11V17.72C7.72,17.23 5,14.41 5,11H6.7C6.7,14 9.24,16.1 12,16.1C12.81,16.1 13.6,15.91 14.31,15.58L12.65,13.92L12,14A3,3 0 0,1 9,11V10.28L3,4.27L4.27,3Z", a1 = "M8 7C6.9 7 6 7.9 6 9V15C6 16.11 6.9 17 8 17H11V15H8V9H11V7H8M14 7C12.9 7 12 7.9 12 9V15C12 16.11 12.9 17 14 17H16C17.11 17 18 16.11 18 15V9C18 7.9 17.11 7 16 7H14M14 9H16V15H14V9", gs = "M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33M21,1A2,2 0 0,0 23,3V1H21M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z", Cs = "M11.4 8.2H15V10H13.2L11.4 8.2M19.67 1H18.33C18.33 3.58 20.42 5.67 23 5.67V4.33C21.16 4.33 19.67 2.84 19.67 1M21 1C21 2.11 21.9 3 23 3V1H21M17 1H15.67C15.67 5.05 18.95 8.33 23 8.33V7C19.69 7 17 4.31 17 1M10 3.8C11 3.8 11.8 3 11.8 2S11 .2 10 .2 8.2 1 8.2 2 9 3.8 10 3.8M2.39 1.73L1.11 3L3.46 5.35L2 5.8V11H3.8V7.33L5.05 6.94L5.68 7.57L2 22H3.8L6.67 13.89L9 17V22H10.8V15.59L8.31 11.05L8.5 10.37L20.84 22.73L22.11 21.46L2.39 1.73M9.38 4.87C9.08 4.37 8.54 4.03 7.92 4.03C7.75 4.03 7.58 4.06 7.42 4.11L7.34 4.14L11.35 8.15L9.38 4.87Z", ys = "M18,4L20,8H17L15,4H13L15,8H12L10,4H8L10,8H7L5,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V4H18Z", vs = "M22.11 21.46L20.84 22.73L18.11 20H4C2.9 20 2 19.11 2 18V6C2 5.42 2.25 4.9 2.65 4.54L1.11 3L2.39 1.73L22.11 21.46M21.88 18.68C21.96 18.47 22 18.24 22 18V4H18L20 8H17L15 4H13L15 8H12L10 4H8L8.8 5.6L21.88 18.68Z", xt = "M4,17V9H2V7H6V17H4M22,15C22,16.11 21.1,17 20,17H16V15H20V13H18V11H20V9H16V7H20A2,2 0 0,1 22,9V10.5A1.5,1.5 0 0,1 20.5,12A1.5,1.5 0 0,1 22,13.5V15M14,15V17H8V13C8,11.89 8.9,11 10,11H12V9H8V7H12A2,2 0 0,1 14,9V11C14,12.11 13.1,13 12,13H10V15H14Z", bs = "M14,19H18V5H14M6,19H10V5H6V19Z", Ls = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", As = "M8,5.14V19.14L19,12.14L8,5.14Z", Hs = "M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13", Xt = "M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M12,19A7,7 0 0,1 5,12A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19Z", r1 = "M16,7V3H14V7H10V3H8V7H8C7,7 6,8 6,9V14.5L9.5,18V21H14.5V18L18,14.5V9C18,8 17,7 16,7Z", c1 = "M20.84 22.73L15.31 17.2L14.5 18V21H9.5V18L6 14.5V9C6 8.7 6.1 8.41 6.25 8.14L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M18 14.5V9C18 8 17 7 16 7V3H14V7H10.2L17.85 14.65L18 14.5M10 3H8V4.8L10 6.8V3Z", Vs = "M19,12C19,15.86 15.86,19 12,19C8.14,19 5,15.86 5,12C5,8.14 8.14,5 12,5C15.86,5 19,8.14 19,12Z", $s = "M12.5,5A7.5,7.5 0 0,0 5,12.5A7.5,7.5 0 0,0 12.5,20A7.5,7.5 0 0,0 20,12.5A7.5,7.5 0 0,0 12.5,5M7,10H9A1,1 0 0,1 10,11V12C10,12.5 9.62,12.9 9.14,12.97L10.31,15H9.15L8,13V15H7M12,10H14V11H12V12H14V13H12V14H14V15H12A1,1 0 0,1 11,14V11A1,1 0 0,1 12,10M16,10H18V11H16V14H18V15H16A1,1 0 0,1 15,14V11A1,1 0 0,1 16,10M8,11V12H9V11", Ms = "M12,0C8.96,0 6.21,1.23 4.22,3.22L5.63,4.63C7.26,3 9.5,2 12,2C14.5,2 16.74,3 18.36,4.64L19.77,3.23C17.79,1.23 15.04,0 12,0M7.05,6.05L8.46,7.46C9.37,6.56 10.62,6 12,6C13.38,6 14.63,6.56 15.54,7.46L16.95,6.05C15.68,4.78 13.93,4 12,4C10.07,4 8.32,4.78 7.05,6.05M12,15A2,2 0 0,1 10,13A2,2 0 0,1 12,11A2,2 0 0,1 14,13A2,2 0 0,1 12,15M15,9H9A1,1 0 0,0 8,10V22A1,1 0 0,0 9,23H15A1,1 0 0,0 16,22V10A1,1 0 0,0 15,9Z", ws = "M2,5.27L3.28,4L21,21.72L19.73,23L16,19.27V22A1,1 0 0,1 15,23H9C8.46,23 8,22.55 8,22V11.27L2,5.27M12,0C15.05,0 17.8,1.23 19.77,3.23L18.36,4.64C16.75,3 14.5,2 12,2C9.72,2 7.64,2.85 6.06,4.24L4.64,2.82C6.59,1.07 9.17,0 12,0M12,4C13.94,4 15.69,4.78 16.95,6.05L15.55,7.46C14.64,6.56 13.39,6 12,6C10.83,6 9.76,6.4 8.9,7.08L7.5,5.66C8.7,4.62 10.28,4 12,4M15,9C15.56,9 16,9.45 16,10V14.18L13.5,11.69L13.31,11.5L10.82,9H15M10.03,13.3C10.16,14.16 10.84,14.85 11.71,15L10.03,13.3Z", Es = "M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z", l1 = "M1 14V5H13C18.5 5 23 9.5 23 15V17H20.83C20.42 18.17 19.31 19 18 19C16.69 19 15.58 18.17 15.17 17H10C9.09 18.21 7.64 19 6 19C3.24 19 1 16.76 1 14M6 11C4.34 11 3 12.34 3 14C3 15.66 4.34 17 6 17C7.66 17 9 15.66 9 14C9 12.34 7.66 11 6 11M15 10V12H20.25C19.92 11.27 19.5 10.6 19 10H15Z", Ss = "M23 15V18C23 18.5 22.64 18.88 22.17 18.97L18.97 15.77C19 15.68 19 15.59 19 15.5C19 14.12 17.88 13 16.5 13C16.41 13 16.32 13 16.23 13.03L10.2 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2S14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C17.87 7 21 10.13 21 14H22C22.55 14 23 14.45 23 15M22.11 21.46L20.84 22.73L19.89 21.78C19.62 21.92 19.32 22 19 22H5C3.9 22 3 21.11 3 20V19H2C1.45 19 1 18.55 1 18V15C1 14.45 1.45 14 2 14H3C3 11.53 4.29 9.36 6.22 8.11L1.11 3L2.39 1.73L22.11 21.46M10 15.5C10 14.12 8.88 13 7.5 13S5 14.12 5 15.5 6.12 18 7.5 18 10 16.88 10 15.5M16.07 17.96L14.04 15.93C14.23 16.97 15.04 17.77 16.07 17.96Z", xs = "M12,2C14.65,2 17.19,3.06 19.07,4.93L17.65,6.35C16.15,4.85 14.12,4 12,4C9.88,4 7.84,4.84 6.35,6.35L4.93,4.93C6.81,3.06 9.35,2 12,2M3.66,6.5L5.11,7.94C4.39,9.17 4,10.57 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,10.57 19.61,9.17 18.88,7.94L20.34,6.5C21.42,8.12 22,10.04 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12C2,10.04 2.58,8.12 3.66,6.5M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C14.08,15.58 13.06,16 12,16C10.94,16 9.92,15.58 9.17,14.83L7.76,16.24C6.63,15.12 6,13.59 6,12A6,6 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z", zs = "M20.8 22.7L18 19.9C16.3 21.2 14.2 22 12 22C6.5 22 2 17.5 2 12C2 10 2.6 8.1 3.7 6.5L5.2 7.9C4.4 9.2 4 10.6 4 12C4 16.4 7.6 20 12 20C13.7 20 15.3 19.4 16.6 18.5L13.7 15.6C13.2 15.9 12.6 16 12 16C10.9 16 9.9 15.6 9.2 14.8L7.8 16.2C6.6 15.1 6 13.6 6 12C6 10.8 6.3 9.7 6.9 8.8L1.1 3L2.4 1.7L22.1 21.4L20.8 22.7M20 12C20 13.4 19.6 14.7 19 15.8L20.5 17.3C21.5 15.8 22 14 22 12C22 10 21.4 8.1 20.3 6.5L18.8 7.9C19.6 9.2 20 10.6 20 12M12 4C14.1 4 16.2 4.8 17.7 6.3L19.1 4.9C17.2 3.1 14.7 2 12 2C10.1 2 8.3 2.5 6.7 3.5L8.2 5C9.3 4.3 10.7 4 12 4M17.5 14.3C17.8 13.6 18 12.8 18 12C18 8.7 15.3 6 12 6C11.2 6 10.4 6.2 9.7 6.5L11.4 8.2C11.6 8.1 11.8 8 12 8C12.6 8 13 8.4 13 9C13 9.2 12.9 9.4 12.8 9.6L17.5 14.3Z", ks = "M20 19V3H4V19H2V21H22V19H20M6 19V13H11V14.8C10.6 15.1 10.2 15.6 10.2 16.2C10.2 17.2 11 18 12 18S13.8 17.2 13.8 16.2C13.8 15.6 13.5 15.1 13 14.8V13H18V19H6Z", Ds = "M20 19V3H4V19H2V21H10.25C10.25 21.97 11.03 22.75 12 22.75S13.75 21.97 13.75 21H22V19H20M6 19V17H11V19H6M13 19V17H18V19H13Z", d1 = "M11.62,1L17.28,6.67L15.16,8.79L13.04,6.67L11.62,8.09L13.95,10.41L12.79,11.58L13.24,12.04C14.17,11.61 15.31,11.77 16.07,12.54L12.54,16.07C11.77,15.31 11.61,14.17 12.04,13.24L11.58,12.79L10.41,13.95L8.09,11.62L6.67,13.04L8.79,15.16L6.67,17.28L1,11.62L3.14,9.5L5.26,11.62L6.67,10.21L3.84,7.38C3.06,6.6 3.06,5.33 3.84,4.55L4.55,3.84C5.33,3.06 6.6,3.06 7.38,3.84L10.21,6.67L11.62,5.26L9.5,3.14L11.62,1M18,14A4,4 0 0,1 14,18V16A2,2 0 0,0 16,14H18M22,14A8,8 0 0,1 14,22V20A6,6 0 0,0 20,14H22Z", h1 = "M17.8,20C17.4,21.2 16.3,22 15,22H5C3.3,22 2,20.7 2,19V18H5L14.2,18C14.6,19.2 15.7,20 17,20H17.8M19,2C20.7,2 22,3.3 22,5V6H20V5C20,4.4 19.6,4 19,4C18.4,4 18,4.4 18,5V18H17C16.4,18 16,17.6 16,17V16H5V5C5,3.3 6.3,2 8,2H19M8,6V8H15V6H8M8,10V12H14V10H8Z", Os = "M4,18V21H7V18H17V21H20V15H4V18M19,10H22V13H19V10M2,10H5V13H2V10M17,13H7V5A2,2 0 0,1 9,3H15A2,2 0 0,1 17,5V13Z", Is = "M15,5V12H9V5H15M15,3H9A2,2 0 0,0 7,5V14H17V5A2,2 0 0,0 15,3M22,10H19V13H22V10M5,10H2V13H5V10M20,15H4V21H6V17H18V21H20V15Z", Ts = "M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M11,7H13V13H11V7M11,15H13V17H11V15Z", Ps = "M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9", u1 = "M11,13H13V16H16V11H18L12,6L6,11H8V16H11V13M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1Z", Zs = "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.3V15.8C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.7V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z", Gs = "M12 1L3 5V11C3 16.5 6.8 21.7 12 23C17.2 21.7 21 16.5 21 11V5L12 1M16 15.8C16 16.4 15.4 17 14.7 17H9.2C8.6 17 8 16.4 8 15.7V12.2C8 11.6 8.6 11 9.2 11V8.5C9.2 7.1 10.6 6 12 6S14.8 7.1 14.8 8.5V9H13.5V8.5C13.5 7.7 12.8 7.2 12 7.2S10.5 7.7 10.5 8.5V11H14.8C15.4 11 16 11.6 16 12.3V15.8Z", Rs = "M8.2 5L6.2 3H19C20.11 3 21 3.9 21 5V17.8L19 15.8V5H8.2M17.5 14.32C17.82 13.6 18 12.83 18 12C18 8.68 15.31 6 12 6C11.17 6 10.4 6.18 9.68 6.5L11.27 8.07C11.5 8.03 11.75 8 12 8C14.21 8 16 9.79 16 12C16 12.25 15.97 12.5 15.93 12.73L17.5 14.32M22.11 21.46L20.84 22.73L19.1 21C19.07 21 19.03 21 19 21H5C3.89 21 3 20.1 3 19V5C3 4.97 3 4.93 3 4.9L1.11 3L2.39 1.73L22.11 21.46M8 12C8 14.21 9.79 16 12 16C12.62 16 13.19 15.85 13.71 15.6L8.4 10.29C8.15 10.81 8 11.39 8 12M17.11 19L15.19 17.08C14.26 17.66 13.17 18 12 18C8.69 18 6 15.31 6 12C6 10.83 6.34 9.74 6.92 8.81L5 6.89V19H17.11Z", Bs = "M19 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3M19 19H5V5H19V19M12 18C15.31 18 18 15.31 18 12C18 8.68 15.31 6 12 6C8.68 6 6 8.68 6 12C6 15.31 8.69 18 12 18M12 8C14.21 8 16 9.79 16 12S14.21 16 12 16 8 14.21 8 12 9.79 8 12 8Z", js = "M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z", Fs = "M11 5.12L9.29 3.41L10.71 2L12 3.29L13.29 2L14.71 3.41L13 5.12V7.38L15.45 8.82L17.45 7.69L18.07 5.36L20 5.88L19.54 7.65L21.31 8.12L20.79 10.05L18.46 9.43L16.46 10.56V13.26L14.5 11.3V10.56L12.74 9.54L10.73 7.53L11 7.38V5.12M18.46 14.57L16.87 13.67L19.55 16.35L21.3 15.88L20.79 13.95L18.46 14.57M13 16.62V18.88L14.7 20.59L13.29 22L12 20.71L10.71 22L9.29 20.59L11 18.88V16.62L8.55 15.18L6.55 16.31L5.93 18.64L4 18.12L4.47 16.36L2.7 15.89L3.22 13.96L5.55 14.58L7.55 13.45V10.56L5.55 9.43L3.22 10.05L2.7 8.12L4.47 7.65L4 5.89L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73L14.1 16L13 16.62M12 14.89L12.63 14.5L9.5 11.39V13.44L12 14.89Z", Ns = "M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z", p1 = "M5.5,9A1.5,1.5 0 0,0 7,7.5A1.5,1.5 0 0,0 5.5,6A1.5,1.5 0 0,0 4,7.5A1.5,1.5 0 0,0 5.5,9M17.41,11.58C17.77,11.94 18,12.44 18,13C18,13.55 17.78,14.05 17.41,14.41L12.41,19.41C12.05,19.77 11.55,20 11,20C10.45,20 9.95,19.78 9.58,19.41L2.59,12.42C2.22,12.05 2,11.55 2,11V6C2,4.89 2.89,4 4,4H9C9.55,4 10.05,4.22 10.41,4.58L17.41,11.58M13.54,5.71L14.54,4.71L21.41,11.58C21.78,11.94 22,12.45 22,13C22,13.55 21.78,14.05 21.42,14.41L16.04,19.79L15.04,18.79L20.75,13L13.54,5.71Z", zt = "M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z", f1 = "M10 19.11L12.11 17H7V15H14V15.12L16.12 13H7V11H17V12.12L18.24 10.89C18.72 10.41 19.35 10.14 20.04 10.14C20.37 10.14 20.7 10.21 21 10.33V5C21 3.89 20.1 3 19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.9 21 5 21H10V19.11M7 7H17V9H7V7M21.7 14.35L20.7 15.35L18.65 13.3L19.65 12.3C19.86 12.09 20.21 12.09 20.42 12.3L21.7 13.58C21.91 13.79 21.91 14.14 21.7 14.35M12 19.94L18.06 13.88L20.11 15.93L14.06 22H12V19.94Z", Us = "M16.95,16.95L14.83,14.83C15.55,14.1 16,13.1 16,12C16,11.26 15.79,10.57 15.43,10L17.6,7.81C18.5,9 19,10.43 19,12C19,13.93 18.22,15.68 16.95,16.95M12,5C13.57,5 15,5.5 16.19,6.4L14,8.56C13.43,8.21 12.74,8 12,8A4,4 0 0,0 8,12C8,13.1 8.45,14.1 9.17,14.83L7.05,16.95C5.78,15.68 5,13.93 5,12A7,7 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z", Ws = "M22 12.66C21.07 12.24 20.07 12 19 12C19 10.43 18.5 9 17.6 7.81L15.43 10C15.79 10.57 16 11.26 16 12C16 12.24 16 12.5 15.94 12.7C13.61 13.84 12 16.23 12 19C12 20.07 12.24 21.07 12.66 22C12.44 22 12.22 22 12 22C10.69 22 9.39 21.74 8.17 21.24C6.96 20.74 5.86 20 4.93 19.07C3.05 17.2 2 14.65 2 12C2 9.35 3.05 6.8 4.93 4.93C5.86 4 6.96 3.26 8.17 2.76C9.39 2.26 10.69 2 12 2C17.5 2 22 6.47 22 12C22 12.22 22 12.44 22 12.66M12 5C10.14 5 8.36 5.74 7.05 7.05C5.74 8.36 5 10.14 5 12C5 13.93 5.78 15.68 7.05 16.95L9.17 14.83C8.45 14.1 8 13.1 8 12C8 10.94 8.42 9.92 9.17 9.17C9.92 8.42 10.94 8 12 8C12.74 8 13.43 8.21 14 8.56L16.19 6.4C15 5.5 13.57 5 12 5M23.83 20.64C23.89 20.53 23.87 20.39 23.77 20.32L22.72 19.5C22.74 19.33 22.75 19.16 22.75 19C22.75 18.84 22.74 18.67 22.72 18.5L23.77 17.68C23.87 17.61 23.89 17.5 23.83 17.36L22.83 15.64C22.77 15.53 22.64 15.5 22.53 15.53L21.28 16L21.14 15.91C20.91 15.77 20.7 15.64 20.44 15.54L20.25 14.21C20.23 14.09 20.13 14 20 14H18C17.88 14 17.77 14.09 17.75 14.21L17.57 15.54C17.3 15.64 17.09 15.78 16.86 15.92L16.72 16L15.5 15.53C15.37 15.5 15.23 15.53 15.17 15.64L14.17 17.36C14.11 17.5 14.14 17.61 14.23 17.68L15.29 18.5L15.29 18.53C15.27 18.69 15.25 18.84 15.25 19C15.25 19.16 15.27 19.31 15.29 19.47C15.29 19.5 15.29 19.5 15.29 19.5L14.23 20.32C14.14 20.39 14.11 20.53 14.17 20.64L15.17 22.37C15.23 22.5 15.37 22.5 15.5 22.5L16.72 21.97C17 22.17 17.25 22.34 17.57 22.47L17.75 23.79C17.77 23.91 17.88 24 18 24H20C20.13 24 20.23 23.91 20.25 23.79L20.44 22.47C20.75 22.34 21 22.17 21.28 21.97L22.53 22.5C22.64 22.5 22.77 22.5 22.83 22.37L23.83 20.64M19 17.25C19.97 17.25 20.75 18.03 20.75 19C20.75 19.97 19.96 20.75 19 20.75C18.04 20.75 17.25 19.97 17.25 19C17.25 18.03 18.03 17.25 19 17.25Z", qs = "M3 4L1.75 5.27L4.5 8.03C3.55 9.45 3 11.16 3 13C3 17.97 7.03 22 12 22C13.84 22 15.55 21.45 17 20.5L19.5 23L20.75 21.73L13.04 14L3 4M15 1H9V3H15M21 13C21 14.83 20.45 16.53 19.5 17.94L13 11.45V7H11V9.45L7.05 5.5C8.47 4.55 10.17 4 12 4C14.12 4 16.07 4.74 17.62 5.97L19.04 4.55L20.45 5.97L19.03 7.39C20.26 8.93 21 10.88 21 13Z", Ks = "M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z", Qt = "M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M17,15A3,3 0 0,1 14,12A3,3 0 0,1 17,9A3,3 0 0,1 20,12A3,3 0 0,1 17,15Z", te = "M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M7,15A3,3 0 0,1 4,12A3,3 0 0,1 7,9A3,3 0 0,1 10,12A3,3 0 0,1 7,15Z", Ys = "M17 6H7c-3.31 0-6 2.69-6 6s2.69 6 6 6h10c3.31 0 6-2.69 6-6s-2.69-6-6-6zm0 10H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h10c2.21 0 4 1.79 4 4s-1.79 4-4 4zM7 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z", Js = "M4 22H2V2H4M22 2H20V22H22M17.24 5.34L13.24 9.34A3 3 0 0 0 9.24 13.34L5.24 17.34L6.66 18.76L10.66 14.76A3 3 0 0 0 14.66 10.76L18.66 6.76Z", _1 = "M22 2V22H20V13H14.82A3 3 0 0 1 9.18 13H4V22H2V2H4V11H9.18A3 3 0 0 1 14.82 11H20V2Z", Xs = "M4 22H2V2H4M22 2H20V22H22M11 4V9.18A3 3 0 0 0 11 14.82V20H13V14.82A3 3 0 0 0 13 9.18V4Z", Qs = "M16,19H8V5H16M16.5,3H7.5A1.5,1.5 0 0,0 6,4.5V19.5A1.5,1.5 0 0,0 7.5,21H16.5A1.5,1.5 0 0,0 18,19.5V4.5A1.5,1.5 0 0,0 16.5,3M19,17H21V7H19M22,9V15H24V9M3,17H5V7H3M0,15H2V9H0V15Z", to = "M8.2,5L6.55,3.35C6.81,3.12 7.15,3 7.5,3H16.5A1.5,1.5 0 0,1 18,4.5V14.8L16,12.8V5H8.2M0,15H2V9H0V15M21,17V7H19V15.8L20.2,17H21M3,17H5V7H3V17M18,17.35L22.11,21.46L20.84,22.73L18,19.85C17.83,20.54 17.21,21 16.5,21H7.5A1.5,1.5 0 0,1 6,19.5V7.89L1.11,3L2.39,1.73L6.09,5.44L8,7.34L16,15.34L18,17.34V17.35M16,17.89L8,9.89V19H16V17.89M22,9V15H24V9H22Z", m1 = "M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z", g1 = "M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z", eo = "M10 3.25C10 3.25 16 10 16 14C16 17.31 13.31 20 10 20S4 17.31 4 14C4 10 10 3.25 10 3.25M20 7V13H18V7H20M18 17H20V15H18V17Z", io = "M8 2C6.89 2 6 2.89 6 4V16C6 17.11 6.89 18 8 18H9V20H6V22H9C10.11 22 11 21.11 11 20V18H13V20C13 21.11 13.89 22 15 22H18V20H15V18H16C17.11 18 18 17.11 18 16V4C18 2.89 17.11 2 16 2H8M12 4.97A2 2 0 0 1 14 6.97A2 2 0 0 1 12 8.97A2 2 0 0 1 10 6.97A2 2 0 0 1 12 4.97M10 14.5H14V16H10V14.5Z", so = "M20.84 22.73L16.29 18.18C15.2 19.3 13.69 20 12 20C8.69 20 6 17.31 6 14C6 12.67 6.67 11.03 7.55 9.44L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M18 14C18 10 12 3.25 12 3.25S10.84 4.55 9.55 6.35L17.95 14.75C18 14.5 18 14.25 18 14Z", oo = "M5.7 2.5A2 2 0 0 1 7 2H9A2 2 0 0 1 11 4V5H19A2 2 0 0 1 21 7V11A1 1 0 0 1 21 13H17A1 1 0 0 1 17 11V9H12.2M20.84 22.73L22.11 21.46L11 10.34L2.39 1.73L1.11 3L3.65 5.54A2 2 0 0 0 5 9V18H4A2 2 0 0 0 2 20V22H14V20A2 2 0 0 0 12 18H11V12.89Z", C1 = "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z", no = "M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z", y1 = "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z", ao = "M22.11 21.46L2.39 1.73L1.11 3L4.97 6.86L3.34 7L5.11 10.79C5.25 10 5.5 9.24 5.94 8.5C6 8.36 6.13 8.24 6.22 8.11L7.66 9.55C7.25 10.27 7 11.11 7 12C7 14.76 9.24 17 12 17C12.9 17 13.73 16.75 14.45 16.34L20.84 22.73L22.11 21.46M12 15C10.34 15 9 13.66 9 12C9 11.67 9.07 11.36 9.17 11.06L12.94 14.83C12.64 14.93 12.33 15 12 15M18.05 8.5C17.63 7.78 17.1 7.15 16.5 6.64L20.65 7L18.88 10.79C18.74 10 18.47 9.23 18.05 8.5M12 7C14.76 7 17 9.24 17 12C17 12.54 16.89 13.05 16.74 13.54L15 11.78C14.87 10.3 13.7 9.13 12.22 9L10.47 7.27C10.95 7.11 11.46 7 12 7M12 5C11.16 5 10.35 5.15 9.61 5.42L12 2L14.39 5.42C13.65 5.15 12.84 5 12 5M18.87 13.21L20.64 17L20.24 17.04L18.25 15.05C18.54 14.45 18.76 13.84 18.87 13.21M12 19C12.82 19 13.63 18.83 14.37 18.56L12 22L9.59 18.56C10.33 18.83 11.14 19 12 19M5.95 15.5C6.37 16.24 6.91 16.86 7.5 17.37L3.36 17L5.12 13.23C5.26 14 5.53 14.78 5.95 15.5Z", v1 = "M6,11H10V9H14V11H18V4H6V11M18,13H6V20H18V13M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z", b1 = "M6,8H10V6H14V8H18V4H6V8M18,10H6V15H18V10M6,20H18V17H6V20M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z", ro = "M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9M8 12H16V14H8V12M8 15H16V17H8V15M8 18H16V20H8V18Z", co = "M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9Z";
const Vt = [
  "closed",
  "locked",
  "off",
  "docked",
  "idle",
  "standby",
  "paused",
  "auto",
  "not_home",
  "disarmed",
  "0"
], lo = (e, t, i, s, o) => {
  var h, f, u, m, y;
  const n = i || (t == null ? void 0 : t.theme), a = (t == null ? void 0 : t.darkMode) || !1;
  e.__themes || (e.__themes = { cacheKey: null, keys: /* @__PURE__ */ new Set() });
  let c = n || "", r = {};
  if (n === "default" && ((h = e.__themes) == null ? void 0 : h.cacheKey) === "default")
    return;
  if (n && n !== "default" && ((f = t == null ? void 0 : t.themes) != null && f[n])) {
    const { modes: _, ...p } = t.themes[n] || {};
    r = { ...r, ...p }, _ && (a && _.dark ? r = { ...r, ..._.dark } : !a && _.light && (r = { ...r, ..._.light }));
  } else if (!n && (!((u = e.__themes) != null && u.keys) || e.__themes.keys.size === 0))
    return;
  const l = ((m = e.__themes) == null ? void 0 : m.keys) || /* @__PURE__ */ new Set(), d = new Set(Object.keys(r));
  if (n === "default" && d.size === 0) {
    for (const _ of l)
      try {
        e.style.removeProperty(`--${_}`);
      } catch {
      }
    e.__themes = { cacheKey: "default", keys: /* @__PURE__ */ new Set() };
    return;
  }
  if (((y = e.__themes) == null ? void 0 : y.cacheKey) === c) {
    let _ = !0;
    if (l.size !== d.size)
      _ = !1;
    else
      for (const p of l)
        if (!d.has(p)) {
          _ = !1;
          break;
        }
    if (_) return;
  }
  for (const _ of l)
    if (!d.has(_))
      try {
        e.style.removeProperty(`--${_}`);
      } catch {
      }
  for (const [_, p] of Object.entries(r))
    e.style.setProperty(`--${_}`, String(p));
  e.__themes.cacheKey = c || null, e.__themes.keys = d;
}, P = (e, t, i, s) => {
  s = s || {}, i = i ?? {};
  const o = new Event(t, {
    bubbles: s.bubbles === void 0 ? !0 : s.bubbles,
    cancelable: !!s.cancelable,
    composed: s.composed === void 0 ? !0 : s.composed
  });
  return o.detail = i, e.dispatchEvent(o), o;
}, I = (e) => e.substr(0, e.indexOf(".")), ho = (e) => (t, i) => e.includes(t, i), me = "unavailable", uo = "unknown", po = "off", fo = [me, uo], _o = ho(fo), mo = (e) => {
  const t = e.attributes.entity_id || [], i = [
    ...new Set(t.map((s) => I(s)))
  ];
  return i.length === 1 ? i[0] : void 0;
};
function go(e) {
  return Array.isArray(e) ? e.reverse().reduce((t, i) => `var(${i}${t ? `, ${t}` : ""})`, void 0) : `var(${e})`;
}
const Co = (e, t = "_") => {
  const i = "àáâäæãåāăąабçćčđďдèéêëēėęěеёэфğǵгḧхîïíīįìıİийкłлḿмñńǹňнôöòóœøōõőоṕпŕřрßśšşșсťțтûüùúūǘůűųувẃẍÿýыžźżз·", s = `aaaaaaaaaaabcccdddeeeeeeeeeeefggghhiiiiiiiiijkllmmnnnnnoooooooooopprrrsssssstttuuuuuuuuuuvwxyyyzzzz${t}`, o = new RegExp(i.split("").join("|"), "g"), n = {
    ж: "zh",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ю: "iu",
    я: "ia"
  };
  let a;
  return e === "" ? a = "" : (a = e.toString().toLowerCase().replace(o, (c) => s.charAt(i.indexOf(c))).replace(/[а-я]/g, (c) => n[c] || "").replace(/(\d),(?=\d)/g, "$1").replace(/[^a-z0-9]+/g, t).replace(new RegExp(`(${t})\\1+`, "g"), "$1").replace(new RegExp(`^${t}+`), "").replace(new RegExp(`${t}+$`), ""), a === "" && (a = "unknown")), a;
}, yo = (e) => {
  const t = Number(e);
  if (!isNaN(t))
    return t >= 70 ? "--state-sensor-battery-high-color" : t >= 30 ? "--state-sensor-battery-medium-color" : "--state-sensor-battery-low-color";
};
function vo(e, t) {
  const i = I(e.entity_id), s = e == null ? void 0 : e.state;
  if (["button", "event", "input_button", "scene"].includes(i))
    return s !== me;
  if (_o(s) || s === po && i !== "alert")
    return !1;
  switch (i) {
    case "alarm_control_panel":
      return s !== "disarmed";
    case "alert":
      return s !== "idle";
    case "cover":
      return s !== "closed";
    case "device_tracker":
    case "person":
      return s !== "not_home";
    case "lawn_mower":
      return ["mowing", "error"].includes(s);
    case "lock":
      return s !== "locked";
    case "media_player":
      return s !== "standby";
    case "vacuum":
      return !["idle", "docked", "paused"].includes(s);
    case "valve":
      return s !== "closed";
    case "plant":
      return s === "problem";
    case "group":
      return ["on", "home", "open", "locked", "problem"].includes(s);
    case "timer":
      return s === "active";
    case "camera":
      return s === "streaming";
  }
  return !0;
}
const L1 = /* @__PURE__ */ new Set([
  "alarm_control_panel",
  "alert",
  "automation",
  "binary_sensor",
  "calendar",
  "camera",
  "climate",
  "cover",
  "device_tracker",
  "fan",
  "group",
  "humidifier",
  "input_boolean",
  "lawn_mower",
  "light",
  "lock",
  "media_player",
  "person",
  "plant",
  "remote",
  "schedule",
  "script",
  "siren",
  "sun",
  "switch",
  "timer",
  "update",
  "vacuum",
  "valve",
  "water_heater",
  "weather"
]), bo = (e, t, i, s) => {
  const o = [], n = Co(i, "_"), a = s ? "active" : "inactive";
  return t && o.push(`--state-${e}-${t}-${n}-color`), o.push(
    `--state-${e}-${n}-color`,
    `--state-${e}-${a}-color`,
    `--state-${a}-color`
  ), o;
}, A1 = (e, t, i) => {
  const s = t.state, o = vo(t);
  return bo(
    e,
    t.attributes.device_class,
    s,
    o
  );
}, Lo = (e, t) => {
  const i = e == null ? void 0 : e.state, s = I(e.entity_id), o = e.attributes.device_class;
  if (s === "sensor" && o === "battery") {
    const n = yo(i);
    if (n)
      return [n];
  }
  if (s === "group") {
    const n = mo(e);
    if (n && L1.has(n))
      return A1(n, e);
  }
  if (L1.has(s))
    return A1(s, e);
}, Ao = (e, t) => {
  if ((e == null ? void 0 : e.state) === me)
    return "var(--state-unavailable-color)";
  const s = Lo(e);
  if (s)
    return go(s);
}, Ho = (e) => {
  const t = I(e.entity_id), i = e.state;
  if (t === "light" && i === "on") {
    const s = e.attributes.rgb_color;
    if (s)
      return `rgb(${s.join(",")})`;
  }
  return Ao(e);
};
M(
  (e) => new Intl.Collator(e)
);
const Vo = M(
  (e) => new Intl.Collator(e, { sensitivity: "accent" })
), $o = (e, t) => e < t ? -1 : e > t ? 1 : 0, I1 = (e, t, i = void 0) => Intl != null && Intl.Collator ? Vo(i).compare(e, t) : $o(e.toLowerCase(), t.toLowerCase()), Ot = (e, t) => {
  if (e === t)
    return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor)
      return !1;
    let i, s;
    if (Array.isArray(e)) {
      if (s = e.length, s !== t.length)
        return !1;
      for (i = s; i-- !== 0; )
        if (!Ot(e[i], t[i]))
          return !1;
      return !0;
    }
    if (e instanceof Map && t instanceof Map) {
      if (e.size !== t.size)
        return !1;
      for (i of e.entries())
        if (!t.has(i[0]))
          return !1;
      for (i of e.entries())
        if (!Ot(i[1], t.get(i[0])))
          return !1;
      return !0;
    }
    if (e instanceof Set && t instanceof Set) {
      if (e.size !== t.size)
        return !1;
      for (i of e.entries())
        if (!t.has(i[0]))
          return !1;
      return !0;
    }
    if (ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
      if (s = e.length, s !== t.length)
        return !1;
      for (i = s; i-- !== 0; )
        if (e[i] !== t[i])
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    const o = Object.keys(e);
    if (s = o.length, s !== Object.keys(t).length)
      return !1;
    for (i = s; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, o[i]))
        return !1;
    for (i = s; i-- !== 0; ) {
      const n = o[i];
      if (!Ot(e[n], t[n]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
};
class Mo extends HTMLElement {
  constructor() {
    super(...arguments), this.holdTime = 500, this.held = !1, this.cancelled = !1;
  }
  connectedCallback() {
    [
      "touchcancel",
      "mouseout",
      "mouseup",
      "touchmove",
      "mousewheel",
      "wheel",
      "scroll"
    ].forEach((t) => {
      document.addEventListener(
        t,
        () => {
          this.cancelled = !0, this.timer && (clearTimeout(this.timer), this.timer = void 0);
        },
        { passive: !0 }
      );
    });
  }
  bind(t, i = {}) {
    t.actionHandler && Ot(i, t.actionHandler.options) || (t.actionHandler && (t.removeEventListener("touchstart", t.actionHandler.start), t.removeEventListener("touchend", t.actionHandler.end), t.removeEventListener("touchcancel", t.actionHandler.end), t.removeEventListener("mousedown", t.actionHandler.start), t.removeEventListener("click", t.actionHandler.end), t.removeEventListener(
      "keydown",
      t.actionHandler.handleKeyDown
    )), t.actionHandler = { options: i }, !i.disabled && (t.actionHandler.start = (s) => {
      this.cancelled = !1, s.touches ? (s.touches[0].clientX, s.touches[0].clientY) : (s.clientX, s.clientY), i.hasHold && (this.held = !1, this.timer = window.setTimeout(() => {
        this.held = !0;
      }, this.holdTime));
    }, t.actionHandler.end = (s) => {
      if (s.currentTarget !== s.target || s.type === "touchcancel" || s.type === "touchend" && this.cancelled)
        return;
      const o = s.target;
      s.cancelable && s.preventDefault(), i.hasHold && (clearTimeout(this.timer), this.timer = void 0), i.hasHold && this.held ? P(o, "action", { action: "hold" }) : i.hasDoubleClick ? s.type === "click" && s.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, P(o, "action", { action: "tap" });
      }, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, P(o, "action", { action: "double_tap" })) : P(o, "action", { action: "tap" });
    }, t.actionHandler.handleKeyDown = (s) => {
      ["Enter", " "].includes(s.key) && s.currentTarget.actionHandler.end(s);
    }, t.addEventListener("touchstart", t.actionHandler.start, {
      passive: !0
    }), t.addEventListener("touchend", t.actionHandler.end), t.addEventListener("touchcancel", t.actionHandler.end), t.addEventListener("mousedown", t.actionHandler.start, {
      passive: !0
    }), t.addEventListener("click", t.actionHandler.end), t.addEventListener("keydown", t.actionHandler.handleKeyDown)));
  }
}
customElements.define("action-handler-status-card", Mo);
const wo = () => {
  const e = document.body;
  if (e.querySelector("action-handler-status-card"))
    return e.querySelector(
      "action-handler-status-card"
    );
  const t = document.createElement(
    "action-handler-status-card"
  );
  return e.appendChild(t), t;
}, Eo = (e, t) => {
  const i = wo();
  i && i.bind(e, t);
}, ee = Rt(
  class extends Bt {
    update(e, [t]) {
      return Eo(e.element, t), U;
    }
    render(e) {
    }
  }
), So = async (e, t, i, s) => {
  P(e, "hass-action", { config: i, action: s });
};
function pt(e) {
  return e !== void 0 && e.action !== "none";
}
function ie(e, t, i) {
  return e.callWS({ type: `config/${t}_registry/list` }).then((s) => s.reduce((o, n) => {
    const a = n[i];
    return (typeof a == "string" || typeof a == "number") && (o[String(a)] = n), o;
  }, {}));
}
function T1(e, t, i, s, o) {
  const n = s.area && s.area.length > 0 ? Array.isArray(s.area) ? s.area : [s.area] : null, a = s.floor && s.floor.length > 0 ? Array.isArray(s.floor) ? s.floor : [s.floor] : null, c = s.label && s.label.length > 0 ? Array.isArray(s.label) ? s.label : [s.label] : null, r = s.hiddenAreas || [], l = s.hiddenLabels || [], d = s.hiddenEntities || [], h = new Set(r), f = new Set(l), u = new Set(d), m = new Set(o), y = new Map(Object.values(t).map((p) => [p.id, p])), _ = new Map(
    Object.values(i).map((p) => [
      p.area_id,
      p.floor_id
    ])
  );
  return Object.values(e).filter((p) => {
    var v, V, S;
    const b = p.entity_id.split(".")[0];
    if (!m.has(b)) return !1;
    if (b === "update")
      return !p.hidden;
    const C = p.device_id ? y.get(p.device_id) : void 0;
    if (!(p.area_id != null || C && C.area_id != null) || c && !((((v = p.labels) == null ? void 0 : v.some((Z) => c.includes(Z))) ?? !1) || (((V = C == null ? void 0 : C.labels) == null ? void 0 : V.some((Z) => c.includes(Z))) ?? !1)) || n && !(p.area_id !== void 0 && p.area_id !== null && n.includes(p.area_id) || C && C.area_id !== void 0 && C.area_id !== null && n.includes(C.area_id)))
      return !1;
    if (a) {
      const x = p.area_id ? _.get(p.area_id) : void 0, Z = C != null && C.area_id ? _.get(C.area_id) : void 0;
      if (!(x && a.includes(x) || Z && a.includes(Z))) return !1;
    }
    return h.size && (p.area_id && h.has(p.area_id) || C && C.area_id && h.has(C.area_id)) || (S = p.labels) != null && S.some((x) => f.has(x)) || u.has(p.entity_id) ? !1 : !p.hidden;
  }).map((p) => p.entity_id);
}
function P1(e, t) {
  const i = {};
  for (const s of e) {
    const o = s.split(".")[0], n = t[s];
    n && (i[o] || (i[o] = [])).push(n);
  }
  return i;
}
function H1(e, t, i, s, o, n) {
  const a = T1(
    e,
    t,
    i,
    o,
    n
  );
  return P1(a, s);
}
function R(e, t) {
  return t ? `${e} - ${t}` : e;
}
function V1(e, t) {
  var i, s;
  return ((s = (i = e == null ? void 0 : e[t]) == null ? void 0 : i.attributes) == null ? void 0 : s.friendly_name) || t;
}
function Pt(e, t) {
  return (i, s) => I1(
    V1(e, i),
    V1(e, s),
    t
  );
}
function J(e, t) {
  if (e === t) return !0;
  if (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length) return !1;
  const i = new Set(t);
  for (const s of e)
    if (!i.has(s)) return !1;
  return !0;
}
function xo(e) {
  return {
    type: "tile",
    entity: e.entity
  };
}
let K = null;
function zo(e, t) {
  var i, s;
  try {
    const o = t.type || "tile", a = typeof o == "string" && o.startsWith("custom:") ? o.slice(7) : `hui-${o}-card`;
    if (customElements.get(a)) {
      const c = document.createElement(a);
      return typeof c.setConfig == "function" && c.setConfig(t), c.hass = e, (i = c.setAttribute) == null || i.call(c, "data-hui-card", ""), c;
    }
  } catch {
  }
  if (K != null && K.createCardElement)
    try {
      const o = K.createCardElement(t);
      return o instanceof Promise ? void 0 : (o.hass = e, (s = o.setAttribute) == null || s.call(o, "data-hui-card", ""), o);
    } catch {
      return;
    }
}
async function Z1(e, t, i = !1) {
  var s, o, n;
  try {
    K || (K = await ((s = window.loadCardHelpers) == null ? void 0 : s.call(window)));
    const a = K;
    if (a != null && a.createCardElement) {
      const c = a.createCardElement(t);
      return c.hass = e, (o = c.setAttribute) == null || o.call(c, "data-hui-card", ""), c;
    }
  } catch {
  }
  try {
    const a = t.type || "tile", c = typeof a == "string" && a.startsWith("custom:"), r = c ? a.slice(7) : `hui-${a}-card`;
    c && !customElements.get(r) && await customElements.whenDefined(r).catch(() => {
    });
    const l = document.createElement(r);
    return typeof l.setConfig == "function" && l.setConfig(t), l.hass = e, (n = l.setAttribute) == null || n.call(l, "data-hui-card", ""), l;
  } catch {
    if (!i)
      return Z1(e, xo(t), !0);
    const a = document.createElement("div");
    return a.setAttribute("data-hui-card", ""), a;
  }
}
async function ko() {
  var e;
  if (!K)
    try {
      K = await ((e = window.loadCardHelpers) == null ? void 0 : e.call(window));
    } catch {
    }
}
const F = {
  alarm_control_panel: { on: $i, off: Mi },
  siren: { on: Oi, off: Re },
  lock: { on: s1, off: i1 },
  light: { on: hs, off: us },
  media_player: { on: Bi, off: ji },
  climate: { on: Us, off: Ws },
  humidifier: { on: Hi, off: Vi },
  switch: {
    on: Qt,
    off: te,
    switch: { on: Qt, off: te },
    outlet: { on: r1, off: c1 }
  },
  vacuum: { on: xs, off: zs },
  lawn_mower: { on: l1, off: l1 },
  fan: { on: Xi, off: Qi },
  cover: {
    on: Jt,
    off: Yt,
    garage: { on: Jt, off: Yt },
    door: { on: Ke, off: qe },
    gate: { on: ns, off: os },
    blind: { on: Ti, off: Ii },
    curtain: { on: Ki, off: Yi },
    damper: { on: Xs, off: _1 },
    awning: { on: Ge, off: Ge },
    shutter: { on: co, off: ro },
    shade: { on: ks, off: Ds },
    window: { on: b1, off: v1 }
  },
  binary_sensor: {
    on: Xt,
    off: Xt,
    motion: { on: gs, off: Cs },
    moisture: { on: eo, off: so },
    window: { on: b1, off: v1 },
    door: { on: Ke, off: qe },
    lock: { on: s1, off: i1 },
    presence: { on: cs, off: rs },
    occupancy: { on: Os, off: Is },
    vibration: { on: Qs, off: to },
    opening: { on: Gs, off: Zs },
    garage_door: { on: Jt, off: Yt },
    problem: {
      on: Ei,
      off: wi
    },
    smoke: {
      on: Bs,
      off: Rs
    },
    running: { on: As, off: bs },
    plug: { on: r1, off: c1 },
    power: { on: Hs, off: Xt },
    battery: { on: xi, off: Si },
    battery_charging: { on: zi, off: ki },
    gas: { on: ss, off: is },
    carbon_monoxide: { on: a1, off: a1 },
    cold: { on: js, off: Fs },
    heat: { on: y1, off: ao },
    connectivity: { on: Ue, off: Ue },
    safety: { on: Ts, off: Ps },
    sound: { on: m1, off: g1 },
    update: { on: Pe, off: Ze },
    tamper: { on: u1, off: u1 },
    light: { on: fs, off: ps },
    moving: { on: Gi, off: Ri }
  },
  person: { on: Oe, off: Ie },
  device_tracker: { on: Oe, off: Ie },
  valve: { on: Js, off: _1 },
  water_heater: { on: io, off: oo },
  remote: { on: Ms, off: ws },
  update: { on: Pe, off: Ze },
  air_quality: { on: Te, off: Te },
  camera: { on: Pi, off: Zi },
  calendar: { on: Be, off: je },
  scene: { on: ys, off: vs },
  notifications: { on: Di, off: Re },
  sensor: { on: Xe, off: Xe },
  script: { on: h1, off: h1 },
  tags: { on: p1, off: p1 },
  select: { on: St, off: St },
  automation: { on: Es, off: Ss },
  button: { on: Qe, off: Qe },
  number: { on: xt, off: xt },
  conversation: { on: Ne, off: Ne },
  assist_satellite: {
    on: d1,
    off: d1
  },
  counter: { on: We, off: We },
  event: { on: Fe, off: Fe },
  group: {
    on: t1,
    off: t1
  },
  image: { on: ls, off: ds },
  image_processing: {
    on: e1,
    off: e1
  },
  input_boolean: { on: Qt, off: te },
  input_datetime: { on: Et, off: Et },
  input_number: { on: xt, off: xt },
  input_select: {
    on: St,
    off: St
  },
  input_text: { on: zt, off: zt },
  stt: { on: $s, off: Vs },
  sun: { on: y1, off: C1 },
  text: { on: zt, off: zt },
  date: { on: Be, off: je },
  datetime: { on: Et, off: Et },
  time: { on: Wi, off: qi },
  timer: { on: Ks, off: qs },
  todo: {
    on: Fi,
    off: Ni
  },
  tts: { on: m1, off: g1 },
  wake_word: { on: _s, off: ms },
  weather: { on: no, off: C1 },
  zone: { on: o1, off: n1 },
  geo_location: { on: o1, off: n1 }
}, X = [
  "alarm_control_panel",
  "siren",
  "lock",
  "light",
  "media_player",
  "climate",
  "switch",
  "vacuum",
  "fan",
  "cover",
  "binary_sensor",
  "humidifier",
  "lawn_mower",
  "valve",
  "water_heater",
  "remote",
  "update",
  "device_tracker",
  "input_boolean",
  "timer",
  "counter",
  "calendar"
], Do = [
  "light",
  "switch",
  "fan",
  "cover",
  "siren",
  "climate",
  "humidifier",
  "valve",
  "remote"
], Oo = [
  "window",
  "door",
  "lock",
  "awning",
  "blind",
  "curtain",
  "damper",
  "garage",
  "gate",
  "shade",
  "shutter"
], Io = {
  binary_sensor: [
    "door",
    "window",
    "lock",
    "motion",
    "presence",
    "occupancy",
    "plug",
    "power",
    "battery",
    "battery_charging",
    "moving",
    "running",
    "gas",
    "carbon_monoxide",
    "vibration",
    "cold",
    "heat",
    "moisture",
    "connectivity",
    "opening",
    "garage_door",
    "light",
    "problem",
    "safety",
    "smoke",
    "sound",
    "tamper",
    "update"
  ],
  cover: [
    "door",
    "window",
    "garage",
    "gate",
    "blind",
    "curtain",
    "damper",
    "awning",
    "shade",
    "shutter"
  ],
  switch: ["switch", "outlet"]
}, To = {
  alarm_control_panel: {
    state_content: ["state", "last_changed"],
    features: [
      {
        type: "alarm-modes",
        modes: [
          "armed_home",
          "armed_away",
          "armed_night",
          "armed_vacation",
          "armed_custom_bypass",
          "disarmed"
        ]
      }
    ]
  },
  light: {
    state_content: ["state", "brightness", "last_changed"],
    features: [{ type: "light-brightness" }]
  },
  cover: {
    state_content: ["state", "position", "last_changed"],
    features: [{ type: "cover-open-close" }, { type: "cover-position" }]
  },
  vacuum: {
    state_content: ["state", "last_changed"],
    features: [
      {
        type: "vacuum-commands",
        commands: [
          "start_pause",
          "stop",
          "clean_spot",
          "locate",
          "return_home"
        ]
      }
    ]
  },
  climate: {
    state_content: ["state", "current_temperature", "last_changed"],
    features: [
      {
        type: "climate-hvac-modes",
        hvac_modes: [
          "auto",
          "heat_cool",
          "heat",
          "cool",
          "dry",
          "fan_only",
          "off"
        ]
      }
    ]
  },
  water_heater: {
    state_content: ["state", "last_changed"],
    features: [
      {
        type: "water-heater-operation-modes",
        operation_modes: [
          "electric",
          "gas",
          "heat_pump",
          "eco",
          "performance",
          "high_demand",
          "off"
        ]
      }
    ]
  },
  humidifier: {
    state_content: ["state", "current_humidity", "last_changed"],
    features: [{ type: "target-humidity" }]
  },
  media_player: {
    show_entity_picture: !0,
    state_content: ["state", "volume_level", "last_changed"],
    features: [{ type: "media-player-playback" }]
  },
  lock: {
    state_content: ["state", "last_changed"],
    features: [{ type: "lock-commands" }]
  },
  fan: {
    state_content: ["state", "percentage", "last_changed"],
    features: [{ type: "fan-speed" }]
  },
  counter: {
    state_content: ["state", "last_changed"],
    features: [
      {
        type: "counter-actions",
        actions: ["increment", "decrement", "reset"]
      }
    ]
  },
  lawn_mower: {
    state_content: ["state", "last_changed"],
    features: [
      {
        type: "lawn-mower-commands",
        commands: ["start_pause", "dock"]
      }
    ]
  },
  update: {
    state_content: ["state", "latest_version", "last_changed"],
    features: [{ type: "update-actions", backup: "ask" }]
  },
  switch: {
    state_content: ["state", "last_changed"],
    features: [{ type: "toggle" }]
  },
  input_boolean: {
    state_content: ["state", "last_changed"],
    features: [{ type: "toggle" }]
  },
  calendar: {
    state_content: "message"
  },
  timer: {
    state_content: ["state", "remaining_time"]
  },
  binary_sensor: {
    state_content: ["state", "last_changed"]
  },
  device_tracker: {
    state_content: ["state", "last_changed"]
  },
  remote: {
    state_content: ["state", "last_changed"]
  },
  valve: {
    state_content: ["state", "last_changed"],
    features: [{ type: "valve-open-close" }]
  }
};
function W(e, t, i) {
  return e.localize(
    `component.${i}.entity_component._.state.${t}`
  ) || t;
}
const Po = {
  square: (e) => e.localize("ui.panel.lovelace.editor.card.grid.square"),
  hide_person_name: (e) => `${e.localize("ui.common.hide")} ${e.localize(
    "component.person.entity_component._.name"
  )} ${e.localize("ui.common.name")}`,
  hide_content_name: (e) => `${e.localize("ui.common.hide")} ${e.localize(
    "ui.panel.lovelace.editor.card.markdown.content"
  )} ${e.localize("ui.common.name")}`,
  hide_person: (e) => `${e.localize("ui.common.hide")} ${e.localize(
    "component.person.entity_component._.name"
  )}`,
  list_mode: (e) => `${e.localize("ui.card.common.turn_on")} ${e.localize(
    "ui.components.media-browser.list"
  )} ${e.localize("ui.dialogs.helper_settings.input_text.mode")}`,
  columns: (e) => `${e.localize(
    "ui.panel.lovelace.editor.action-editor.actions.more-info"
  )} ${e.localize("ui.panel.lovelace.editor.card.grid.columns")}`,
  edit_filters: (e) => `${e.localize("ui.panel.lovelace.editor.common.edit")} ${e.localize(
    "ui.components.subpage-data-table.filters"
  )}`,
  area: (e) => e.localize("ui.panel.lovelace.editor.card.area.name"),
  floor: (e) => e.localize("ui.components.selectors.selector.types.floor"),
  label_filter: (e) => `${e.localize("ui.components.label-picker.label")} ${e.localize(
    "ui.components.related-filter-menu.filter"
  )}`,
  label: (e) => e.localize("ui.components.label-picker.label"),
  hidden_labels: (e) => e.localize("ui.components.label-picker.label"),
  entities: (e) => e.localize("ui.panel.lovelace.editor.card.entities.name"),
  extra_entities: (e) => `Extra ${e.localize("ui.panel.lovelace.editor.card.entities.name")}`,
  entity: (e) => e.localize("ui.components.selectors.selector.types.entity"),
  hide_filter: (e) => `${e.localize("ui.common.hide")} ${e.localize(
    "ui.panel.lovelace.editor.card.entities.name"
  )}`,
  edit_domains_dc: (e) => `${e.localize("ui.panel.lovelace.editor.common.edit")} ${e.localize(
    "ui.panel.lovelace.editor.card.markdown.content"
  )}`,
  icon: (e) => e.localize("ui.components.selectors.selector.types.icon"),
  color: (e) => e.localize("ui.panel.lovelace.editor.card.tile.color"),
  background_color: (e) => `${e.localize(
    "ui.panel.lovelace.editor.card.generic.icon"
  )} ${e.localize(
    "ui.panel.lovelace.editor.edit_view.tab_background"
  )} ${e.localize("ui.panel.lovelace.editor.card.tile.color")}`,
  multiple_areas: (e) => `Multi ${e.localize("ui.panel.lovelace.editor.card.area.name")}`,
  multiple_floors: (e) => `Multi ${e.localize("ui.components.selectors.selector.types.floor")}`,
  show_total_number: (e) => `${e.localize("ui.common.enable")} ${e.localize(
    "component.sensor.entity_component._.state_attributes.state_class.state.total"
  )} ${e.localize("component.number.entity_component._.name")}`,
  show_total_entities: (e) => `${e.localize("ui.common.enable")} ${e.localize(
    "component.sensor.entity_component._.state_attributes.state_class.state.total"
  )} ${e.localize("ui.panel.lovelace.editor.card.entities.name")}`,
  appearance: (e) => e.localize("ui.panel.lovelace.editor.card.tile.appearance") || "Appearance",
  tap_action: (e) => e.localize("ui.panel.lovelace.editor.card.generic.tap_action"),
  hold_action: (e) => e.localize("ui.panel.lovelace.editor.card.generic.hold_action"),
  double_tap_action: (e) => e.localize("ui.panel.lovelace.editor.card.generic.double_tap_action"),
  popup_card: () => "Change Popup Card Type",
  group_id: (e) => `${e.localize(
    "component.group.entity_component._.name"
  )} ${e.localize("ui.common.name")}`,
  group_icon: (e) => `${e.localize(
    "component.group.entity_component._.name"
  )} ${e.localize("ui.panel.lovelace.editor.card.generic.icon")}`,
  group_status: (e) => `${e.localize(
    "component.group.entity_component._.name"
  )} ${e.localize(
    "ui.components.selectors.selector.types.state"
  )} (${e.localize("ui.panel.lovelace.editor.card.config.optional")})`,
  hide: (e) => e.localize("ui.common.hide"),
  state: (e) => e.localize("ui.components.entity.entity-state-picker.state"),
  invert: (e) => e.localize("ui.dialogs.entity_registry.editor.invert.label"),
  invert_state: (e) => e.localize("ui.dialogs.entity_registry.editor.invert.label"),
  show_entity_picture: (e) => e.localize("ui.panel.lovelace.editor.card.tile.show_entity_picture"),
  name: (e) => e.localize("ui.common.name"),
  no_scroll: (e) => `${e.localize(
    "ui.panel.lovelace.editor.edit_view_header.settings.badges_wrap_options.wrap"
  )} ${e.localize("ui.panel.lovelace.editor.card.generic.content")}`,
  popup: () => "Popup",
  ungroup_areas: (e) => `${e.localize("ui.common.disable")} ${e.localize(
    "ui.panel.lovelace.editor.card.area.name"
  )} ${e.localize("component.group.entity_component._.name")}`,
  popup_sort: () => "Popup Sort",
  state_content: (e) => e.localize("ui.panel.lovelace.editor.card.tile.state_content"),
  hide_card_if_empty: (e) => `${e.localize("ui.common.hide")} Status Card if empty`,
  badge_mode: (e) => `${e.localize("ui.common.enable")} Badge `,
  badge_color: (e) => `Badge ${e.localize("ui.panel.lovelace.editor.card.tile.color")}`,
  badge_text_color: (e) => `Badge ${e.localize(
    "component.text.entity_component._.name"
  )} ${e.localize("ui.panel.lovelace.editor.card.tile.color")}`,
  person: (e) => e.localize("component.person.entity_component._.name"),
  person_home_color: (e) => `${e.localize(
    "component.person.entity_component._.state.home"
  )} ${e.localize("ui.panel.lovelace.editor.card.tile.color")}`,
  person_away_color: (e) => `${e.localize(
    "component.person.entity_component._.state.not_home"
  )} ${e.localize("ui.panel.lovelace.editor.card.tile.color")}`,
  person_home_icon: (e) => `${e.localize(
    "component.person.entity_component._.state.home"
  )} ${e.localize("ui.components.selectors.selector.types.icon")}`,
  person_away_icon: (e) => `${e.localize(
    "component.person.entity_component._.state.not_home"
  )} ${e.localize("ui.components.selectors.selector.types.icon")}`,
  no_background: (e) => `${e.localize("ui.common.hide")} ${e.localize(
    "ui.panel.lovelace.editor.edit_view.tab_background"
  )}`,
  activate_state_color: (e) => `${e.localize(
    "ui.panel.lovelace.editor.card.generic.state_color"
  )}`
};
function Zo(e, t, i) {
  return t && i ? t === "switch" && i === "switch" ? `${e.localize(
    "ui.panel.lovelace.editor.card.entities.name"
  )} in ${e.localize("component.switch.entity_component._.name")}` : `${e.localize(
    "ui.panel.lovelace.editor.card.entities.name"
  )} in ${e.localize(
    `ui.dialogs.entity_registry.editor.device_classes.${t}.${i}`
  )}` : t ? `${e.localize(
    "ui.panel.lovelace.editor.card.entities.name"
  )} in ${e.localize(`component.${t}.entity_component._.name`)}` : e.localize("ui.panel.lovelace.editor.card.entities.name");
}
function Go(e, t) {
  if (X.includes(t))
    return e.localize(`component.${t}.entity_component._.name`) || t;
  for (const [i, s] of Object.entries(Io))
    if (s.includes(t))
      return e.localize(
        `ui.dialogs.entity_registry.editor.device_classes.${i}.${t}`
      ) || t;
  return e.localize(`ui.panel.lovelace.editor.card.area.${t}`);
}
function $t(e, t, i, s) {
  if (/^key_\d+$/.test(t.name))
    return e.localize("ui.components.related-filter-menu.filter") || "Filter";
  if (t.name === "header")
    return Zo(e, i, s);
  const o = Po[t.name];
  return o ? o(e) : Go(e, t.name);
}
var Ro = Object.defineProperty, O = (e, t, i, s) => {
  for (var o = void 0, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (o = a(t, i, o) || o);
  return o && Ro(t, i, o), o;
};
const Ce = class Ce extends N {
  constructor() {
    super(...arguments), this.open = !1, this.title = "", this.content = "", this.entities = [], this._showAll = !1, this._cardEls = /* @__PURE__ */ new Map(), this._lastEntityIds = [], this._activeEntities = [], this._allEntities = [], this._onClosed = (t) => {
      this.open = !1, this._cardEls.clear(), this.dispatchEvent(
        new CustomEvent("dialog-closed", {
          bubbles: !0,
          composed: !0,
          detail: { dialog: this }
        })
      ), this.dispatchEvent(
        new CustomEvent("popup-closed", {
          bubbles: !0,
          composed: !0,
          detail: { dialog: this }
        })
      );
    }, this._onPopState = (t) => {
      this.open && this._onClosed(t);
    }, this._entities = [], this.computeLabel = M(
      (t, i, s) => $t(this.hass, t, i, s)
    ), this._popupCardConfigCache = /* @__PURE__ */ new Map(), this._cardElementCache = /* @__PURE__ */ new Map(), this._sortEntitiesMemo = M(
      (t, i, s, o) => {
        const n = t.slice();
        if (i === "state") {
          const c = Pt(o, s);
          return n.sort((r, l) => {
            const d = this._isActive(r) ? 0 : 1, h = this._isActive(l) ? 0 : 1;
            if (d !== h) return d - h;
            const f = I(r.entity_id), u = I(l.entity_id), m = this.hass ? W(this.hass, r.state, f) : r.state, y = this.hass ? W(this.hass, l.state, u) : l.state, _ = (m || "").localeCompare(y || "");
            return _ !== 0 ? _ : c(r.entity_id, l.entity_id);
          });
        }
        const a = Pt(o, s);
        return n.sort((c, r) => a(c.entity_id, r.entity_id));
      }
    ), this.groupAndSortEntities = M(
      (t, i, s) => {
        const o = /* @__PURE__ */ new Map();
        for (const a of t) {
          const c = this.getAreaForEntity(a);
          o.has(c) || o.set(c, []), o.get(c).push(a);
        }
        return Array.from(o.entries()).sort(
          ([a], [c]) => {
            var d, h;
            const r = ((d = i.get(a)) == null ? void 0 : d.toLowerCase()) ?? (a === "unassigned" ? "unassigned" : a), l = ((h = i.get(c)) == null ? void 0 : h.toLowerCase()) ?? (c === "unassigned" ? "unassigned" : c);
            return r.localeCompare(l);
          }
        ).map(([a, c]) => [a, s(c)]);
      }
    );
  }
  async showDialog(t) {
    if (this.title = t.title ?? this.title, this.hass = t.hass, this._activeEntities = t.entities ?? [], this._allEntities = t.allEntities ?? [], (!t.allEntities || t.allEntities.length === 0) && (this._allEntities = this._activeEntities), this.entities = t.entities ?? [], t.content !== void 0 && (this.content = t.content), this.selectedDomain = t.selectedDomain, this.selectedDeviceClass = t.selectedDeviceClass, this.selectedGroup = t.selectedGroup, this.card = t.card, this._cardEls.clear(), this._showAll = t.initialShowAll ?? !1, this.open = !0, await ko(), !customElements.get("hui-tile-card"))
      try {
        await customElements.whenDefined("hui-tile-card");
      } catch {
      }
    this.requestUpdate();
    try {
      await this.updateComplete;
    } catch {
    }
    this._applyDialogStyleAfterRender();
  }
  _applyDialogStyleAfterRender() {
    try {
      requestAnimationFrame(() => {
        try {
          this._applyDialogStyle();
        } catch {
        }
      });
    } catch {
      try {
        this._applyDialogStyle();
      } catch {
      }
    }
  }
  _applyDialogStyle() {
    var i, s, o, n, a, c;
    const t = (c = (a = (n = (o = (s = (i = document.querySelector("body > home-assistant")) == null ? void 0 : i.shadowRoot) == null ? void 0 : s.querySelector("status-card-popup")) == null ? void 0 : o.shadowRoot) == null ? void 0 : n.querySelector("ha-dialog")) == null ? void 0 : a.shadowRoot) == null ? void 0 : c.querySelector(
      "div > div.mdc-dialog__container > div.mdc-dialog__surface"
    );
    return t ? (t.style.minHeight = "unset", !0) : !1;
  }
  firstUpdated(t) {
    super.firstUpdated(t);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("popstate", this._onPopState);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("popstate", this._onPopState), this._cardEls.clear();
  }
  async _createCardElement(t, i, s = !1) {
    return Z1(t, i, s);
  }
  _getPopupCardConfig(t) {
    var y, _, p, b, C;
    const i = this.card;
    if (this.selectedGroup !== void 0 && ((y = i._config.content) != null && y[this.selectedGroup])) {
      const L = i._config.content[this.selectedGroup], v = i.getCustomizationForType(L);
      if (v != null && v.popup_card)
        return {
          ...v.popup_card,
          entity: t.entity_id
        };
    }
    const s = I(t.entity_id), o = this.selectedDomain || s, n = this.selectedDomain ? this.selectedDeviceClass : (C = (b = (p = (_ = this.hass) == null ? void 0 : _.states) == null ? void 0 : p[t.entity_id]) == null ? void 0 : b.attributes) == null ? void 0 : C.device_class, a = R(o, n), c = typeof (i == null ? void 0 : i.getCustomizationForType) == "function" ? i.getCustomizationForType(a) : void 0, r = c == null ? void 0 : c.popup_card, l = r && typeof r.type == "string" && r.type || "tile", d = l === "tile" ? To[s] ?? {} : {};
    let h = {};
    if (r && typeof r == "object") {
      const { type: L, entity: v, ...V } = r;
      h = V;
    } else
      h = {};
    const f = {
      type: l,
      entity: t.entity_id,
      ...d,
      ...h
    }, u = this._configHash(f), m = this._popupCardConfigCache.get(t.entity_id);
    return m && m.hash === u ? m.config : (this._popupCardConfigCache.set(t.entity_id, {
      hash: u,
      config: f
    }), f);
  }
  shouldUpdate(t) {
    if (!this.open)
      return t.has("open");
    if (t.has("hass")) {
      const i = t.get("hass"), s = this.hass;
      if (!s || !i || i.themes !== s.themes || i.language !== s.language || i.localize !== s.localize || this._hasRelevantStateChanged(i, s)) {
        const o = this._getCurrentEntities().map((c) => c.entity_id).sort(), n = (this._lastEntityIds || []).slice().sort(), a = o.length === n.length && o.every((c, r) => c === n[r]);
        return this._updateCardsHass(), !a;
      }
      return !1;
    }
    return !0;
  }
  _hasRelevantStateChanged(t, i) {
    for (const s of this._allEntities)
      if (t.states[s.entity_id] !== i.states[s.entity_id])
        return !0;
    return !1;
  }
  _updateCardsHass() {
    this.hass && this._cardEls.forEach((t) => {
      if (t.hass !== this.hass)
        try {
          t.hass = this.hass;
        } catch {
        }
    });
  }
  _getOrCreateCard(t) {
    const i = t.entity_id, s = this._getPopupCardConfig(t), o = this._configHash(s), n = this._cardElementCache.get(i);
    if (n && n.hash === o)
      return n.el.hass = this.hass, this._cardEls.set(i, n.el), n.el;
    const a = zo(this.hass, s);
    if (a)
      return a.hass !== this.hass && (a.hass = this.hass), this._cardEls.set(i, a), this._cardElementCache.set(i, { hash: o, el: a }), a;
    const c = document.createElement("div");
    return c.classList.add("card-placeholder"), c.setAttribute("data-hui-card", ""), this._cardEls.set(i, c), this._createCardElement(this.hass, s).then((r) => {
      try {
        this._cardEls.get(i) === c && (c.replaceWith(r), this._cardEls.set(i, r), this._cardElementCache.set(i, { hash: o, el: r })), r.hass = this.hass;
      } catch {
      }
    }), this._cardElementCache.set(i, { hash: o, el: c }), c;
  }
  willUpdate(t) {
    super.willUpdate(t), (t.has("open") || t.has("hass") || t.has("selectedDomain") || t.has("selectedGroup") || t.has("_showAll")) && (this._entities = this._getCurrentEntities());
  }
  _getUpdatedEntity(t) {
    var i;
    return ((i = this.hass) == null ? void 0 : i.states[t.entity_id]) || t;
  }
  _isEntityActive(t) {
    var r;
    const i = this.selectedDomain || I(t.entity_id), s = this.selectedDeviceClass || t.attributes.device_class, o = R(i, s), n = typeof ((r = this.card) == null ? void 0 : r.getCustomizationForType) == "function" ? this.card.getCustomizationForType(o) : void 0, a = (n == null ? void 0 : n.invert) === !0;
    if (i === "climate") {
      const l = t.attributes.hvac_action;
      if (l !== void 0) {
        const d = !["idle", "off"].includes(l);
        return a ? !d : d;
      }
    }
    if (i === "humidifier") {
      const l = t.attributes.action;
      if (l !== void 0) {
        const d = !["idle", "off"].includes(l);
        return a ? !d : d;
      }
    }
    const c = !Vt.includes(t.state);
    return a ? !c : c;
  }
  _getCurrentEntities() {
    if (!this.hass)
      return this._showAll ? this._allEntities : this._activeEntities;
    const t = this._allEntities.map((i) => this._getUpdatedEntity(i));
    return this._showAll ? t : t.filter((i) => this._isEntityActive(i));
  }
  toggleAllOrOn() {
    this._showAll = !this._showAll;
  }
  _handleMenuAction(t) {
    const i = t.detail.item.action;
    i === "toggle_domain" ? this.handleAskToggleDomain() : i === "toggle_all" && this.handleAskToggleAll();
  }
  handleAskToggleDomain() {
    const t = "status-card-popup-confirmation";
    this.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag: t,
          dialogImport: () => customElements.whenDefined(t),
          dialogParams: {
            hass: this.hass,
            card: this.card,
            selectedDomain: this.selectedDomain,
            selectedDeviceClass: this.selectedDeviceClass
          }
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  handleAskToggleAll() {
    this.toggleAllOrOn();
  }
  _stopPropagation(t) {
    t.stopPropagation();
  }
  getAreaForEntity(t) {
    var s, o;
    const i = (s = this.hass) == null ? void 0 : s.entities[t.entity_id];
    if (i) {
      if (i.area_id)
        return i.area_id;
      if (i.device_id) {
        const n = (o = this.hass) == null ? void 0 : o.devices[i.device_id];
        if (n && n.area_id)
          return n.area_id;
      }
    }
    return "unassigned";
  }
  _isActive(t) {
    return !Vt.includes(t.state);
  }
  _configHash(t) {
    return JSON.stringify(t);
  }
  _getGroupCustomization() {
    var t;
    if (this.selectedGroup !== void 0 && ((t = this.card._config.content) != null && t[this.selectedGroup])) {
      const i = this.card._config.content[this.selectedGroup];
      return this.card.getCustomizationForType(i);
    }
  }
  sortEntitiesForPopup(t) {
    var o, n, a, c;
    const i = this._getGroupCustomization(), s = (i == null ? void 0 : i.popup_sort) || ((o = this.card._config) == null ? void 0 : o.popup_sort) || "name";
    return this._sortEntitiesMemo(
      t,
      s,
      ((a = (n = this.hass) == null ? void 0 : n.locale) == null ? void 0 : a.language) ?? "en",
      ((c = this.hass) == null ? void 0 : c.states) ?? {}
    );
  }
  render() {
    var S, x, Z, ot, ve, be;
    if (!this.open) return g``;
    const t = this._getGroupCustomization(), i = (t == null ? void 0 : t.list_mode) ?? this.card.list_mode, s = (t == null ? void 0 : t.columns) ?? this.card._config.columns ?? 4, o = i ? 1 : s, n = this.selectedDomain, a = this.selectedDeviceClass, c = this.selectedGroup, r = this.card, l = /* @__PURE__ */ new Map(), d = ((S = this.hass) == null ? void 0 : S.areas) ?? [], h = Array.isArray(d) ? d : Object.values(d);
    for (const A of h)
      A && A.area_id && A.name && l.set(A.area_id, A.name);
    let f = this._entities, u = !1;
    c === void 0 && n && (u = !0);
    const m = this.sortEntitiesForPopup(f), y = new Set(f.map((A) => A.entity_id));
    Array.from(this._cardEls.keys()).forEach((A) => {
      y.has(A) || this._cardEls.delete(A);
    }), this._lastEntityIds = f.map((A) => A.entity_id);
    const _ = this.groupAndSortEntities(
      f,
      l,
      this.sortEntitiesForPopup.bind(this)
    ), p = (t == null ? void 0 : t.ungroup_areas) === !0 || ((x = r == null ? void 0 : r._config) == null ? void 0 : x.ungroupAreas) === !0 || ((Z = r == null ? void 0 : r._config) == null ? void 0 : Z.ungroup_areas) === !0 || ((ot = r == null ? void 0 : r._config) == null ? void 0 : ot.area_grouping) !== void 0 && ((ve = r == null ? void 0 : r._config) == null ? void 0 : ve.area_grouping) === !1, b = _.length ? Math.max(..._.map(([, A]) => A.length)) : 0, C = p ? Math.min(o, Math.max(1, f.length)) : Math.min(o, Math.max(1, b)), L = R(n, a), v = typeof (r == null ? void 0 : r.getCustomizationForType) == "function" ? r.getCustomizationForType(L) : void 0, V = (v == null ? void 0 : v.invert) === !0;
    return g`
      <ha-dialog
        .open=${this.open}
        hideActions
        @closed=${this._onClosed}
        style="--columns: ${C};"
      >
        <div class="dialog-header">
          <ha-icon-button
            slot="trigger"
            .label=${this.hass.localize("ui.common.close")}
            .path=${_e}
            @click=${this._onClosed}
          ></ha-icon-button>
          <h3>
            ${(() => {
      var ht, j;
      const A = this.selectedGroup, dt = this.card;
      if (A !== void 0 && ((j = (ht = dt._config) == null ? void 0 : ht.content) != null && j[A])) {
        const U1 = dt._config.content[A];
        return this.hass.localize(
          "ui.panel.lovelace.editor.card.entities.name"
        ) + " in " + U1;
      }
      return this.selectedDomain && this.selectedDeviceClass ? this.computeLabel(
        { name: "header" },
        this.selectedDomain,
        this.selectedDeviceClass
      ) : this.computeLabel(
        { name: "header" },
        this.selectedDomain || void 0
      );
    })()}
          </h3>

          ${u ? g`
                <ha-dropdown
                  slot="actionItems"
                  placement="bottom-end"
                  @wa-select=${this._handleMenuAction}
                  @closed=${this._stopPropagation}
                >
                  <ha-icon-button
                    slot="trigger"
                    .label=${this.hass.localize("ui.common.menu")}
                    .path=${Ji}
                  ></ha-icon-button>

                  <ha-dropdown-item
                    graphic="icon"
                    .action=${"toggle_domain"}
                  >
                    <ha-svg-icon
                      slot="icon"
                      .path=${Ys}
                    ></ha-svg-icon>
                    ${V ? this.hass.localize("ui.card.common.turn_on") : this.hass.localize("ui.card.common.turn_off")}
                  </ha-dropdown-item>

                  <ha-dropdown-item
                    graphic="icon"
                    .action=${"toggle_all"}
                  >
                    <ha-svg-icon
                      slot="icon"
                      .path=${Ns}
                    ></ha-svg-icon>
                    ${this.hass.localize("ui.card.common.toggle") + " " + this.hass.localize(
      "component.sensor.entity_component._.state_attributes.state_class.state.total"
    ) + " " + this.hass.localize(
      "ui.panel.lovelace.editor.card.entities.name"
    )}
                  </ha-dropdown-item>
                </ha-dropdown>
              ` : ""}
        </div>
        <div class="dialog-content scrollable">
          ${(be = this.card) != null && be.list_mode ? p ? g`
                  <ul class="entity-list">
                    ${tt(
      m,
      (A) => A.entity_id,
      (A) => g`<li class="entity-item">- ${A.entity_id}</li>`
    )}
                  </ul>
                ` : g`
                  <ul class="entity-list">
                    ${tt(
      _,
      ([A]) => A,
      ([A, dt]) => {
        const ht = l.get(A) ?? (A === "unassigned" ? "Unassigned" : A);
        return g`
                          <li class="entity-item">
                            <h4>${ht}:</h4>
                            <ul>
                              ${tt(
          dt,
          (j) => j.entity_id,
          (j) => g`<li class="entity-item">
                                    - ${j.entity_id}
                                  </li>`
        )}
                            </ul>
                          </li>
                        `;
      }
    )}
                  </ul>
                ` : p ? g`
                <h4></h4>
                <div class="entity-cards">
                  ${tt(
      m,
      (A) => A.entity_id,
      (A) => g`
                      <div class="entity-card">
                        ${this._getOrCreateCard(A)}
                      </div>
                    `
    )}
                </div>
              ` : g`${_.map(([A, dt]) => {
      const ht = l.get(A) ?? (A === "unassigned" ? "Unassigned" : A);
      return g`
                  <div class="cards-wrapper">
                    <h4>${ht}</h4>
                    <div class="entity-cards">
                      ${tt(
        dt,
        (j) => j.entity_id,
        (j) => g`
                          <div class="entity-card">
                            ${this._getOrCreateCard(j)}
                          </div>
                        `
      )}
                    </div>
                  </div>
                `;
    })}`}
          ${f.length === 0 ? this.content : ""}
        </div>
      </ha-dialog>
    `;
  }
};
Ce.styles = mt`
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none;
    }

    ha-dialog {
      --dialog-content-padding: 12px;
      --mdc-dialog-min-width: calc((var(--columns, 4) * 22.5vw) + 3vw);
      --mdc-dialog-max-width: 96vw;
      box-sizing: border-box;
      overflow-x: auto;
    }

    .dialog-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      min-width: 15vw;
      position: sticky;
      top: 0;
      z-index: 10;
      border-bottom: 1px solid rgba(0, 0, 0, 0.07);
      background: transparent;
    }
    .dialog-header h3 {
      flex-grow: 1;
      margin: 0; /* Ensure default margins don't mess up height */
    }
    .dialog-header .menu-button {
      margin-left: auto;
    }
    .dialog-content.scrollable {
      margin-bottom: 16px;
      max-height: 80vh;
      overflow-y: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .dialog-content.scrollable::-webkit-scrollbar {
      display: none;
    }
    .dialog-actions {
      text-align: right;
    }
    .cards-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      overflow-x: auto;
    }
    .entity-list {
      list-style: none;
      padding: 0 8px;
      margin: 0;
    }
    .entity-list .entity-item {
      list-style: none;
      margin: 0.2em 0;
    }
    h4 {
      width: 100%;
      padding-left: 1.5em;
      box-sizing: border-box;
      font-size: 1.2em;
      margin: 0.6em 0;
    }
    .entity-cards {
      display: grid;
      grid-template-columns: repeat(var(--columns, 4), 22.5vw);
      gap: 4px;
      width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      justify-content: center;
    }
    .entity-card {
      width: 22.5vw;
      box-sizing: border-box;
    }
    @media (max-width: 1200px) {
      ha-dialog {
        --mdc-dialog-min-width: 96vw;
        --mdc-dialog-max-width: 96vw;
      }
      .entity-card {
        width: 30vw;
      }
      .entity-cards {
        grid-template-columns: repeat(3, 30vw);
      }
      h4 {
        width: 100%;
        font-size: 1.2em;
        margin: 0.6em 0;
        padding: 0 1em;
        box-sizing: border-box;
      }
    }

    @media (max-width: 900px) {
      ha-dialog {
        --mdc-dialog-min-width: 96vw;
        --mdc-dialog-max-width: 96vw;
      }
      .entity-card {
        width: 45vw;
      }
      .entity-cards {
        grid-template-columns: repeat(2, 45vw);
      }
      h4 {
        width: 100%;
        font-size: 1.2em;
        margin: 0.6em 0;
        padding: 0 1em;
        box-sizing: border-box;
      }
    }

    @media (max-width: 700px) {
      ha-dialog {
        --dialog-content-padding: 8px;
        --mdc-dialog-min-width: 96vw;
        --mdc-dialog-max-width: 96vw;
      }
      .cards-wrapper {
        align-items: stretch;
        width: 100%;
        overflow-x: hidden;
      }
      .entity-card {
        width: 92vw;
      }
      .entity-cards {
        grid-template-columns: 1fr;
      }
      h4 {
        width: 100%;
        font-size: 1.2em;
        margin: 0.6em 0;
        padding: 0 0.3em;
        box-sizing: border-box;
      }
    }
  `;
let T = Ce;
O([
  $({ type: Boolean })
], T.prototype, "open");
O([
  $({ type: String })
], T.prototype, "title");
O([
  $({ type: String })
], T.prototype, "selectedDomain");
O([
  $({ type: String })
], T.prototype, "selectedDeviceClass");
O([
  $({ type: String })
], T.prototype, "content");
O([
  $({ type: Array })
], T.prototype, "entities");
O([
  $({ attribute: !1 })
], T.prototype, "hass");
O([
  $({ attribute: !1 })
], T.prototype, "card");
O([
  H()
], T.prototype, "_showAll");
O([
  H()
], T.prototype, "selectedGroup");
O([
  H()
], T.prototype, "_entities");
customElements.define("status-card-popup", T);
const ye = class ye extends N {
  constructor() {
    super(...arguments), this.open = !1, this._onClosed = () => {
      this.open = !1, this.dispatchEvent(
        new CustomEvent("dialog-closed", { bubbles: !0, composed: !0 })
      );
    }, this._confirm = () => {
      var t, i;
      try {
        (i = (t = this.card) == null ? void 0 : t.toggleDomain) == null || i.call(t, this.selectedDomain, this.selectedDeviceClass);
      } catch {
      }
      this._onClosed();
    };
  }
  showDialog(t) {
    this.hass = t.hass, this.card = t.card, this.selectedDomain = t.selectedDomain, this.selectedDeviceClass = t.selectedDeviceClass, this.open = !0, this.requestUpdate();
  }
  render() {
    var a, c;
    if (!this.open || !this.hass || !this.card) return g``;
    const t = this.selectedDomain || "", i = this.selectedDeviceClass, s = R(t, i), o = (c = (a = this.card) == null ? void 0 : a.getCustomizationForType) == null ? void 0 : c.call(a, s), n = (o == null ? void 0 : o.invert) === !0;
    return g`
      <ha-dialog
        .open=${this.open}
        heading="${n ? this.hass.localize("ui.card.common.turn_on") + "?" : this.hass.localize("ui.card.common.turn_off") + "?"}"
        @closed=${this._onClosed}
      >
        <div>
          ${this.hass.localize(
      "ui.panel.lovelace.cards.actions.action_confirmation",
      {
        action: n ? this.hass.localize("ui.card.common.turn_on") : this.hass.localize("ui.card.common.turn_off")
      }
    )}
        </div>
        <ha-button
          appearance="plain"
          slot="secondaryAction"
          dialogAction="close"
        >
          ${this.hass.localize("ui.common.no")}
        </ha-button>
        <ha-button
          appearance="accent"
          slot="primaryAction"
          @click=${this._confirm}
        >
          ${this.hass.localize("ui.common.yes")}
        </ha-button>
      </ha-dialog>
    `;
  }
};
ye.styles = mt``;
let it = ye;
O([
  $({ type: Boolean })
], it.prototype, "open");
O([
  $({ attribute: !1 })
], it.prototype, "hass");
O([
  $({ attribute: !1 })
], it.prototype, "card");
O([
  $({ type: String })
], it.prototype, "selectedDomain");
O([
  $({ type: String })
], it.prototype, "selectedDeviceClass");
customElements.define(
  "status-card-popup-confirmation",
  it
);
const G = (e, t) => e ? typeof e == "object" ? Object.entries(e).reduce((o, [n, a]) => {
  const c = n.startsWith("--") ? n : n.replace(/-([a-z])/g, (r, l) => l.toUpperCase());
  return o[c] = String(a), o;
}, {}) : (e.trim(), e.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\n/g, " ").split(";").map((o) => o.trim()).filter((o) => o && o.includes(":")).reduce((o, n) => {
  const a = n.split(":"), c = a[0], r = a.slice(1).join(":");
  if (c && r !== void 0) {
    const l = c.trim(), d = l.startsWith("--") ? l : l.replace(/-([a-z])/g, (h, f) => f.toUpperCase());
    o[d] = r.trim();
  }
  return o;
}, {})) : {}, se = (e, t, i) => t && t._parsedCss ? t._parsedCss : e ? G(e) : {}, Bo = mt`
  :host-context(hui-badge[preview]) {
    max-width: 500px;
    overflow: hidden;
    display: block;
  }
  ha-card {
    overflow: hidden;
    position: relative;
    height: 100%;
    align-content: center;
    max-width: 100%;
  }
  ha-card.no-background {
    background: none;
    border: none;
    box-shadow: none;
  }
  ha-tab-group {
    --track-width: unset !important;
    padding: 6px 4px;
  }
  ha-tab-group.badge-mode {
    padding: 2px;
  }
  ha-tab-group-tab[active],
  ha-tab-group-tab.active {
    font-size: var(--ha-font-size-m);
    --wa-color-brand-on-quiet: var(
      --ha-tab-active-text-color,
      var(--primary-color)
    );
    --wa-color-neutral-on-quiet: var(--wa-color-brand-on-quiet);
    opacity: 0.8;
    color: inherit;
    --wa-space-l: 16px;
  }
  ha-tab-group-tab[active]:hover,
  ha-tab-group-tab.active:hover {
    color: var(--wa-color-brand-on-quiet) !important;
  }
  ha-tab-group::part(nav) {
    padding: 0 !important;
  }
  ha-tab-group-tab {
    pointer-events: auto;
  }
  ha-tab-group-tab * {
    pointer-events: none;
  }
  ha-tab-group-tab::part(base) {
    padding: 0 8px !important;
  }
  ha-tab-group-tab.badge-mode::part(base) {
    padding: 0 4px !important;
  }
  ha-tab-group.no-scroll::part(tabs) {
    display: flex;
    flex-wrap: wrap;
    overflow-x: visible !important;
    max-width: 100%;
    border-bottom: none !important;
  }
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .entity.horizontal,
  .extra-entity.horizontal {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .entity,
  .extra-entity {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .entity.horizontal .entity-icon,
  .extra-entity.horizontal .entity-icon {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: rgba(var(--rgb-primary-text-color), 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
  }
  .entity-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(var(--rgb-primary-text-color), 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
  }
  ha-tab-group-tab {
    position: relative;
    overflow: visible;
  }
  ha-tab-group-tab[data-badge]::after {
    content: attr(data-badge);
    position: absolute;
    top: 0;
    right: 0;
    min-width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: var(--status-card-badge-color, var(--primary-color));
    color: var(--status-card-badge-text-color, var(--text-primary-color));
    font-size: 0.75rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    box-sizing: border-box;
    z-index: 1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }
  .person-badge {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: var(--status-card-badge-color, var(--primary-color));
    color: var(--status-card-badge-text-color, var(--text-primary-color));
    font-size: 0.75rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    box-sizing: border-box;
    z-index: 1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }
  .person-badge ha-icon {
    --mdc-icon-size: 14px;
  }
  .entity-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  .entity.horizontal .entity-info,
  .extra-entity.horizontal .entity-info {
    text-align: left;
    margin-top: 3px;
    padding-left: 8px;
  }
  .entity-info {
    text-align: center;
    margin-top: 7px;
  }
  .entity-name {
    font-weight: bold;
  }
  .entity-state {
    color: var(--secondary-text-color);
    font-size: 0.9em;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to { transform: rotate(360deg);}
  }
  @keyframes pulse { 0% { transform: scale(1);}
    50% { transform: scale(1.1);}
    100% { transform: scale(1);
    }
  }
  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg);}
    10% { transform: translate(-1px, -2px) rotate(-1deg);}
    20% { transform: translate(-3px, 0px) rotate(1deg);}
    30% { transform: translate(3px, 2px) rotate(0deg);}
    40% { transform: translate(1px, -1px) rotate(1deg);}
    50% { transform: translate(-1px, 2px) rotate(-1deg);}
    60% { transform: translate(-3px, 1px) rotate(0deg);}
    70% { transform: translate(3px, 1px) rotate(-1deg);}
    80% { transform: translate(-1px, -1px) rotate(1deg);}
    90% { transform: translate(1px, 2px) rotate(0deg);}
    100% { transform: translate(1px, -2px) rotate(-1deg);}
  }
  @keyframes blink {
    50% { opacity: 0; }
  }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-6px); }
    60% { transform: translateY(-3px); }
    }
  }
`, G1 = (e) => {
  const t = /* @__PURE__ */ new Map();
  return (e ?? []).forEach((i) => {
    var s, o, n;
    if (i.type) {
      const a = { ...i };
      if ((s = a.styles) != null && s.card && (a._parsedCss = G(a.styles.card)), (o = a.styles) != null && o.button) {
        const c = G(a.styles.button);
        a._parsedCss = { ...a._parsedCss, ...c };
      }
      (n = a.styles) != null && n.icon && (a._parsedIconCss = G(a.styles.icon)), t.set(a.type.toLowerCase(), a);
    }
  }), t;
};
function Mt(e, t, i) {
  return t ? (i || G1(e.customization)).get(t.toLowerCase()) : void 0;
}
function wt(e, t, i, s, o) {
  const n = Mt(
    e,
    R(i, s),
    o
  );
  if (n && n[t] !== void 0)
    return n[t];
}
function R1(e, t, i, s, o) {
  const n = Mt(
    e,
    R(t, i),
    o
  );
  if ((n == null ? void 0 : n.show_entity_picture) === !0 && s && s.attributes && s.attributes.entity_picture)
    return s.attributes.entity_picture;
  if (n && n.icon)
    return n.icon;
  if (s && s.attributes && s.attributes.icon)
    return s.attributes.icon;
  const c = (n == null ? void 0 : n.invert) === !0 ? "off" : "on";
  let r = t;
  if (!i && t.includes(".") && (r = t.split(".")[0]), F && F[r]) {
    const l = F[r];
    if (i && typeof l == "object") {
      const d = l[i];
      if (d) {
        if (typeof d == "string") return d;
        if (typeof d == "object" && "on" in d && "off" in d)
          return d[c] || d.on || d.off;
      }
    }
    if (typeof l == "object" && "on" in l && "off" in l)
      return l[c] || l.on || l.off;
    if (typeof l == "string") return l;
  }
  return "";
}
function ae(e, t, i, s) {
  const o = Mt(
    e,
    R(t, i),
    s
  ), n = (a) => a.length === 4 ? `rgba(${a[0]},${a[1]},${a[2]},${a[3]})` : `rgb(${a[0]},${a[1]},${a[2]})`;
  if (o && Array.isArray(o.background_color)) {
    const a = o.background_color;
    if (a.length >= 3) return n(a);
  }
  if (Array.isArray(e == null ? void 0 : e.background_color)) {
    const a = e.background_color;
    if (a.length >= 3) return n(a);
  }
  return "rgba(var(--rgb-primary-text-color), 0.15)";
}
function $1(e, t, i, s) {
  return wt(
    e,
    "icon_color",
    t,
    i,
    s
  ) || e.color;
}
function re(e, t, i, s, o) {
  return wt(
    e,
    "name",
    t,
    i,
    o
  ) || (s == null ? void 0 : s.attributes.friendly_name);
}
function jo(e, t, i, s) {
  return wt(
    e,
    "icon_css",
    t,
    i,
    s
  );
}
function Fo(e, t) {
  const i = W(e, "home", "device_tracker"), s = W(
    e,
    "not_home",
    "device_tracker"
  );
  return t ? s : i;
}
function B1(e, t) {
  const i = W(e, "open", "cover"), s = W(e, "closed", "cover");
  return t ? s : i;
}
function No(e, t) {
  return t === "home" ? W(e, "home", "person") : t === "not_home" ? W(e, "not_home", "person") : t ?? "unknown";
}
function Uo(e, t, i, s) {
  if (i && Oo.includes(i))
    return B1(e, t);
  const o = W(e, s ?? "on", "light"), n = W(e, s ?? "off", "light");
  return t ? n : o;
}
function oe(e, t, i, s, o, n, a, c) {
  const r = R(i, s), l = Mt(t, r, c), d = (l == null ? void 0 : l.invert) === !0;
  switch (i) {
    case "device_tracker":
      return Fo(e, d);
    case "lock":
    case "cover":
      return B1(e, d);
    case "person":
      return No(e, o);
    default:
      return Uo(e, d, s, o);
  }
}
function Wo(e, t = {}) {
  const { color: i, background_color: s, square: o, isNotHome: n } = t, a = {
    "border-radius": o ? "20%" : "50%",
    "background-color": s,
    color: i ? i.startsWith("rgb") || i.startsWith("#") || i.startsWith("hsl") || i.startsWith("var") ? i : `var(--${i}-color)` : void 0
  };
  return e === "person" && n && (a.filter = "grayscale(100%)"), a;
}
const qo = (e, t, i, s) => s ? [] : Object.values(e).filter(
  (o) => {
    var n;
    return o.entity_id.startsWith("person.") && !t.includes(o.entity_id) && !((n = o.labels) != null && n.some((a) => i.includes(a))) && !o.hidden;
  }
).map((o) => o.entity_id).reverse(), Ko = (e, t) => e.map((i) => t[i]).filter((i) => !!i), Yo = (e, t, i) => {
  const s = e.content || [];
  return e.extra_entities ? e.extra_entities.reduce((o, n) => {
    var y;
    if (!s.includes(n)) return o;
    const a = t[n];
    if (!a) return o;
    const c = (y = e.customization) == null ? void 0 : y.find(
      (_) => _.type === n
    );
    if (c && c.state !== void 0 && c.invert_state !== void 0) {
      const _ = c.invert_state === "true", p = a.state === c.state;
      if (!_ && !p || _ && p) return o;
    }
    const r = s.indexOf(n), l = r >= 0 ? r : 0, d = R1(
      e,
      n,
      void 0,
      a,
      i
    ), h = re(e, n, void 0, a, i) ?? a.attributes.friendly_name ?? n, f = wt(
      e,
      "icon_color",
      n,
      void 0,
      i
    ) || ((c == null ? void 0 : c.activate_state_color) ?? e.activate_state_color ? Ho(a) : void 0) || e.color, u = jo(
      e,
      n,
      void 0,
      i
    ), m = ae(
      e,
      n,
      void 0,
      i
    );
    return o.push({
      type: "extra",
      panel: n,
      entity: a,
      order: l,
      icon: d,
      name: h,
      color: f,
      icon_css: u,
      background_color: m
    }), o;
  }, []).sort((o, n) => o.order - n.order) : [];
}, Jo = (e, t) => e.map((i, s) => {
  const o = t.find((a) => a.group_id === i);
  if (!(!o || !Object.keys(o).some(
    (a) => a !== "group_id" && a !== "group_icon" && o[a] !== void 0 && o[a] !== ""
  )))
    return {
      type: "group",
      group_id: i,
      order: s,
      ruleset: o
    };
}).filter((i) => !!i), Xo = (e) => e.map(
  (t, i) => t.includes(" - ") ? null : {
    type: "domain",
    domain: t.trim().toLowerCase().replace(/\s+/g, "_"),
    order: i
  }
).filter((t) => t !== null), Qo = (e) => e.map((t, i) => {
  if (!t.includes(" - ")) return null;
  const [s, o] = t.split(" - ");
  return {
    type: "deviceClass",
    domain: s.trim().toLowerCase().replace(/\s+/g, "_"),
    deviceClass: o.trim().toLowerCase(),
    order: i
  };
}).filter((t) => t !== null), ce = [
  "area",
  "floor",
  "label",
  "domain",
  "entity_id",
  "device",
  "integration",
  "entity_category",
  "hidden_by",
  "device_manufacturer",
  "device_model"
], j1 = (e, t, i, s, o, n, a, c) => {
  let r = [];
  if (Array.isArray(e.filters))
    r = e.filters.filter((l) => ce.includes(l.key));
  else {
    const l = e;
    ce.forEach((d) => {
      l[d] !== void 0 && r.push({ key: d, value: l[d] });
    });
  }
  return !r.length && !o.length ? t.map((l) => l.entity_id) : t.filter((l) => {
    if (o.includes(l.entity_id)) return !1;
    if (!r.length) return !0;
    const d = { entity_id: l.entity_id };
    return r.every(
      (h) => N1({}, d, h, {
        areas: s,
        devices: i,
        entities: t,
        entityMap: n,
        deviceMap: a,
        areaMap: c
      })
    );
  }).map((l) => l.entity_id);
}, F1 = (e, t, i, s, o, n, a) => {
  let c = [];
  if (Array.isArray(t.filters))
    c = t.filters.filter((r) => !ce.includes(r.key));
  else {
    const r = t;
    [
      "state",
      "name",
      "attributes",
      "last_changed",
      "last_updated",
      "last_triggered",
      "level",
      "group"
    ].forEach((l) => {
      r[l] !== void 0 && c.push({ key: l, value: r[l] });
    });
  }
  return c.length ? i.map((r) => s[r]).filter((r) => r ? c.every(
    (l) => N1(e, r, l, {
      entityMap: o,
      deviceMap: n,
      areaMap: a
    })
  ) : !1) : i.map((r) => s[r]).filter((r) => !!r);
};
function tn(e, t, i, s, o) {
  var f;
  const n = e.__registryEntities || [], a = e.__registryDevices || [], c = e.__registryAreas || [], r = i || new Map(n.map((u) => [u.entity_id, u])), l = s || new Map(a.map((u) => [u.id, u])), d = o || new Map(c.map((u) => [u.area_id, u])), h = j1(
    t,
    n,
    a,
    c,
    e.hiddenEntities || [],
    r,
    l,
    d
  );
  return F1(
    e,
    t,
    h,
    ((f = e.hass) == null ? void 0 : f.states) || {},
    r,
    l,
    d
  );
}
function ne(e, t) {
  if (!e) return !1;
  const i = t.match(/^([<>]=?)?\s*(\d+)$/);
  if (!i) return !1;
  const [, s, o] = i, n = parseInt(o, 10), a = /* @__PURE__ */ new Date(), c = new Date(e), r = (a.getTime() - c.getTime()) / 6e4;
  switch (s) {
    case ">":
      return r > n;
    case ">=":
      return r >= n;
    case "<":
      return r < n;
    case "<=":
      return r <= n;
    default:
      return Math.round(r) === n;
  }
}
function k(e, t) {
  if (Array.isArray(t))
    return t.some((i) => k(e, i));
  if (typeof t == "string" && t.startsWith("!"))
    return !k(e, t.slice(1));
  if (typeof t == "string" && /^([<>]=?)\s*(-?\d+(\.\d+)?)([mhd])$/.test(t)) {
    const [, i, s, , o] = t.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)([mhd])$/) || [], n = parseFloat(s), a = Date.now(), c = new Date(e).getTime();
    if (isNaN(c)) return !1;
    let r = (a - c) / 6e4;
    switch (o === "h" && (r /= 60), o === "d" && (r /= 1440), i) {
      case ">":
        return r > n;
      case ">=":
        return r >= n;
      case "<":
        return r < n;
      case "<=":
        return r <= n;
    }
  }
  if (typeof t == "string" && /^([<>]=?)\s*(-?\d+(\.\d+)?)$/.test(t)) {
    const [, i, s] = t.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)$/) || [], o = parseFloat(s), n = parseFloat(e);
    switch (i) {
      case ">":
        return n > o;
      case ">=":
        return n >= o;
      case "<":
        return n < o;
      case "<=":
        return n <= o;
    }
  }
  if (typeof t == "string" && t.includes("*")) {
    const i = "^" + t.split("*").map((o) => o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*") + "$";
    return new RegExp(i, "i").test(String(e));
  }
  if (typeof t == "string" && t.length > 2 && t.startsWith("/") && t.endsWith("/"))
    try {
      return new RegExp(t.slice(1, -1), "i").test(String(e));
    } catch {
      return !1;
    }
  return e === t;
}
const en = {
  area: (e, t, { entityMap: i, deviceMap: s }, o) => {
    let n = o == null ? void 0 : o.area_id;
    if (!n && (o != null && o.device_id)) {
      const a = s == null ? void 0 : s.get(o.device_id);
      n = a == null ? void 0 : a.area_id;
    }
    return Array.isArray(t) ? t.includes(n) : n === t;
  },
  domain: (e, t) => k(I(e.entity_id), t),
  entity_id: (e, t) => k(e.entity_id, t),
  state: (e, t) => k(e.state, t),
  name: (e, t) => k(e.attributes.friendly_name ?? "", t),
  attributes: (e, t) => !t || typeof t != "object" ? !1 : Object.entries(t).every(([i, s]) => {
    const o = i.split(":");
    let n = e.attributes;
    for (const a of o) {
      if (n === void 0) break;
      n = n[a];
    }
    return n !== void 0 ? k(n, s) : !1;
  }),
  device: (e, t, i, s) => k(s == null ? void 0 : s.device_id, t),
  integration: (e, t, i, s) => !!s && (k(s.platform, t) || k(s.config_entry_id, t)),
  entity_category: (e, t, i, s) => k(s == null ? void 0 : s.entity_category, t),
  label: (e, t, { deviceMap: i, card: s }, o) => {
    var c, r;
    const n = s.labels, a = (l) => {
      if (k(l, t)) return !0;
      if (n) {
        const d = n.find((h) => h.label_id === l);
        if (d && k(d.name, t)) return !0;
      }
      return !1;
    };
    if ((c = o == null ? void 0 : o.labels) != null && c.some(a)) return !0;
    if (o != null && o.device_id) {
      const l = i == null ? void 0 : i.get(o.device_id);
      if ((r = l == null ? void 0 : l.labels) != null && r.some(a)) return !0;
    }
    return !1;
  },
  floor: (e, t, { entityMap: i, deviceMap: s, areaMap: o }, n) => {
    var r;
    let a = n == null ? void 0 : n.area_id;
    if (!a && (n != null && n.device_id) && (a = (r = s == null ? void 0 : s.get(n.device_id)) == null ? void 0 : r.area_id), !a) return !1;
    const c = o == null ? void 0 : o.get(a);
    return k(c == null ? void 0 : c.floor_id, t);
  },
  hidden_by: (e, t, i, s) => k(s == null ? void 0 : s.hidden_by, t),
  device_manufacturer: (e, t, { deviceMap: i }, s) => {
    if (!(s != null && s.device_id)) return !1;
    const o = i == null ? void 0 : i.get(s.device_id);
    return k(o == null ? void 0 : o.manufacturer, t);
  },
  device_model: (e, t, { deviceMap: i }, s) => {
    if (!(s != null && s.device_id)) return !1;
    const o = i == null ? void 0 : i.get(s.device_id);
    return k(o == null ? void 0 : o.model, t);
  },
  last_changed: (e, t) => typeof t == "string" && /^[<>]=?\s*\d+$/.test(t) ? ne(e.last_changed, t) : k(e.last_changed, t),
  last_updated: (e, t) => typeof t == "string" && /^[<>]=?\s*\d+$/.test(t) ? ne(e.last_updated, t) : k(e.last_updated, t),
  last_triggered: (e, t) => typeof t == "string" && /^[<>]=?\s*\d+$/.test(t) ? ne(e.attributes.last_triggered, t) : k(e.attributes.last_triggered, t),
  group: (e, t, { card: i }) => {
    var o, n;
    const s = i.hass.states[t];
    return !!((n = (o = s == null ? void 0 : s.attributes) == null ? void 0 : o.entity_id) != null && n.includes(e.entity_id));
  }
};
function N1(e, t, i, s) {
  var a, c;
  const o = ((a = s.entityMap) == null ? void 0 : a.get(t.entity_id)) || ((c = s.entities) == null ? void 0 : c.find((r) => r.entity_id === t.entity_id)), n = en[i.key];
  return n ? n(t, i.value, { ...s, card: e }, o) : !0;
}
function M1(e, t, i, s) {
  if (t.length === 0) {
    console.warn(`Keine aktiven Entitäten für ${i} gefunden.`);
    return;
  }
  if (Do.includes(i)) {
    e.callService(i, "toggle", {
      entity_id: t.map((o) => o.entity_id)
    });
    return;
  }
  for (const o of t) {
    let n = !Vt.includes(o.state);
    i === "media_player" ? e.callService(i, n ? "media_pause" : "media_play", {
      entity_id: o.entity_id
    }) : i === "lock" ? e.callService(i, n ? "lock" : "unlock", {
      entity_id: o.entity_id
    }) : i === "vacuum" ? e.callService(i, n ? "stop" : "start", {
      entity_id: o.entity_id
    }) : i === "alarm_control_panel" ? e.callService(i, n ? "alarm_arm_away" : "alarm_disarm", {
      entity_id: o.entity_id
    }) : i === "lawn_mower" ? e.callService(i, n ? "pause" : "start_mowing", {
      entity_id: o.entity_id
    }) : i === "water_heater" ? e.callService(i, n ? "turn_off" : "turn_on", {
      entity_id: o.entity_id
    }) : i === "update" && e.callService(i, n ? "skip" : "install", {
      entity_id: o.entity_id
    });
  }
}
function kt(e, t, i, s) {
  const o = `${t}_action`;
  return wt(e, o, i, s) || e[o];
}
function w1(e, t, i, s, o, n, a) {
  n.stopPropagation();
  const c = n.detail.action, r = kt(i, c, s, o), l = typeof r == "string" && r === "more-info" || typeof r == "object" && (r == null ? void 0 : r.action) === "more-info", d = typeof r == "string" && r === "toggle" || typeof r == "object" && (r == null ? void 0 : r.action) === "toggle";
  if (s.includes(".")) {
    const h = s, f = I(h);
    if (d) {
      t.callService(f, "toggle", { entity_id: h });
      return;
    }
    if (l) {
      a.showMoreInfo(h);
      return;
    }
  }
  if (l || r === void 0) {
    a.selectDomain(s, o);
    return;
  }
  if (d) {
    a.toggleDomain(s, o);
    return;
  }
  So(
    e,
    t,
    {
      tap_action: kt(i, "tap", s, o),
      hold_action: kt(i, "hold", s, o),
      double_tap_action: kt(
        i,
        "double_tap",
        s,
        o
      )
    },
    c
  );
}
var sn = Object.defineProperty, on = Object.getOwnPropertyDescriptor, E = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? on(t, i) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (o = (s ? a(t, i, o) : a(o)) || o);
  return s && o && sn(t, i, o), o;
};
let w = class extends N {
  constructor() {
    super(...arguments), this.entitiesByDomain = {}, this.selectedDomain = null, this.selectedDeviceClass = null, this.hiddenEntities = [], this.hiddenLabels = [], this.hiddenAreas = [], this.hide_person = !1, this.hide_content_name = !0, this.list_mode = !1, this.badge_mode = !1, this.no_background = !1, this.badge_color = "", this.badge_text_color = "", this.selectedGroup = null, this._shouldHideCard = !1, this.__registryEntities = [], this.__registryDevices = [], this.__registryAreas = [], this.__registryFetchInProgress = !1, this._parsedGlobalCss = {}, this._parsedGlobalIconCss = {}, this._parsedGlobalCardCss = {}, this._parsedGlobalNameCss = {}, this._parsedGlobalStateCss = {}, this._computeIncludedIdsMemo = M(
      (e, t, i, s, o, n, a, c, r) => T1(
        e || {},
        t || {},
        i || {},
        {
          area: s,
          floor: o,
          label: n,
          hiddenAreas: a,
          hiddenLabels: c,
          hiddenEntities: r
        },
        X
      )
    ), this._mapIdsToStatesMemo = M(
      (e, t) => P1(e, t),
      (e, t) => {
        const [i, s] = e, [o, n] = t;
        if (i !== o) return !1;
        for (const a of i)
          if (s[a] !== n[a]) return !1;
        return !0;
      }
    ), this._customizationIndexMemo = M(G1), this._computePersonIdsMemo = M(qo), this._mapPersonIdsToStatesMemo = M(
      (e, t) => Ko(e, t),
      (e, t) => {
        const [i, s] = e, [o, n] = t;
        if (i !== o) return !1;
        for (const a of i)
          if (s[a] !== n[a]) return !1;
        return !0;
      }
    ), this._computeExtraItemsMemo = M(
      Yo,
      (e, t) => {
        const [i, s, o] = e, [n, a, c] = t;
        if (i !== n || o !== c) return !1;
        const r = i.extra_entities;
        if (!r) return !0;
        for (const l of r)
          if (s[l] !== a[l]) return !1;
        return !0;
      }
    ), this._computeGroupItemsMemo = M(Jo), this._computeDomainItemsMemo = M(Xo), this._computeDeviceClassItemsMemo = M(Qo), this._computeEntityMap = M(
      (e) => new Map(e.map((t) => [t.entity_id, t]))
    ), this._computeDeviceMap = M(
      (e) => new Map(e.map((t) => [t.id, t]))
    ), this._computeAreaMap = M(
      (e) => new Map(e.map((t) => [t.area_id, t]))
    ), this._computeGroupCandidatesMemo = M(
      (e, t, i, s, o) => {
        const n = /* @__PURE__ */ new Map(), a = this._computeEntityMap(t), c = this._computeDeviceMap(i), r = this._computeAreaMap(s);
        return e.forEach((l) => {
          const d = j1(
            l,
            t,
            i,
            s,
            o,
            a,
            c,
            r
          );
          n.set(l.group_id, d);
        }), n;
      }
    ), this._computeGroupResultsMemo = M(
      (e, t, i, s, o, n) => {
        const a = /* @__PURE__ */ new Map(), c = {
          __registryEntities: s,
          __registryDevices: o,
          __registryAreas: n,
          hass: { states: t }
        }, r = this._computeEntityMap(s), l = this._computeDeviceMap(o), d = this._computeAreaMap(n);
        return i.forEach((h) => {
          const f = e.get(h.group_id) || [], u = F1(
            c,
            h,
            f,
            t,
            r,
            l,
            d
          );
          a.set(h.group_id, u);
        }), a;
      }
    ), this._baseEntitiesMemo = M(
      (e, t, i) => e.filter((s) => {
        const o = s.state;
        if (o === "unavailable" || o === "unknown") return !1;
        const n = s.attributes.device_class;
        return t === "switch" ? i === "outlet" ? n === "outlet" : i === "switch" ? n === "switch" || n === void 0 : !0 : !i || n === i;
      })
    ), this.computeLabel = M(
      (e, t, i) => $t(this.hass, e, t, i)
    ), this._computeSortedEntities = M(
      (e, t, i, s) => [...e, ...t, ...i, ...s].sort(
        (o, n) => o.order - n.order
      )
    );
  }
  _ensureRegistryData() {
    this.__registryEntities.length || !this.hass || typeof this.hass.callWS != "function" || this.__registryFetchInProgress || (this.__registryFetchInProgress = !0, Promise.all([
      ie(this.hass, "entity", "entity_id"),
      ie(this.hass, "device", "id"),
      ie(this.hass, "area", "area_id")
    ]).then(([e, t, i]) => {
      this.__registryEntities = Object.values(e), this.__registryDevices = Object.values(t), this.__registryAreas = Object.values(i);
    }).catch((e) => {
      console.error("Error fetching registry data", e);
    }).finally(() => {
      this.__registryFetchInProgress = !1, this.requestUpdate();
    }));
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      rows: 2
    };
  }
  shouldUpdate(e) {
    if (!this._config) return !1;
    if (e.has("_config") || e.has("selectedDomain") || e.has("selectedDeviceClass") || e.has("selectedGroup") || e.has("list_mode") || e.has("badge_mode") || e.has("_showAll") || e.has("_shouldHideCard") || e.has("__registryEntities") || e.has("__registryDevices") || e.has("__registryAreas")) return !0;
    const t = e.get("hass");
    return !t || !this.hass || t.themes !== this.hass.themes || t.states !== this.hass.states || t.localize !== this.hass.localize || t.language !== this.hass.language;
  }
  _processEntities() {
    const e = this._entitiesByDomain();
    e !== this.entitiesByDomain && (this.entitiesByDomain = e);
  }
  _entitiesByDomain() {
    var h, f, u, m;
    const e = this.hass.entities || [], t = this.hass.devices || [], i = this.hass.areas || [], s = ((h = this.hass) == null ? void 0 : h.states) || {}, o = ((f = this._config) == null ? void 0 : f.area) || null, n = ((u = this._config) == null ? void 0 : u.floor) || null, a = ((m = this._config) == null ? void 0 : m.label) || null, c = this.hiddenAreas, r = this.hiddenLabels, l = this.hiddenEntities, d = this._computeIncludedIdsMemo(
      e,
      t,
      i,
      o,
      n,
      a,
      c,
      r,
      l
    );
    return this._mapIdsToStatesMemo(d, s);
  }
  _baseEntities(e, t) {
    const i = this._entitiesByDomain()[e] || [];
    return this._baseEntitiesMemo(i, e, t);
  }
  _totalEntities(e, t) {
    return this._baseEntities(e, t);
  }
  _shouldShowTotalEntities(e, t) {
    if (this._config.show_total_entities) return !0;
    const i = R(e, t), s = this.getCustomizationForType(i);
    return (s == null ? void 0 : s.show_total_entities) === !0;
  }
  _shouldShowTotalNumbers(e, t) {
    if (this._config.show_total_number) return !0;
    const i = R(e, t), s = this.getCustomizationForType(i);
    return (s == null ? void 0 : s.show_total_number) === !0;
  }
  _isOn(e, t) {
    const i = this._baseEntities(e, t), s = R(e, t), o = this.getCustomizationForType(s), n = (o == null ? void 0 : o.invert) === !0;
    return i.filter((a) => {
      if (e === "climate") {
        const r = a.attributes.hvac_action;
        if (r !== void 0) {
          const l = !["idle", "off"].includes(r);
          return n ? !l : l;
        }
      }
      if (e === "humidifier") {
        const r = a.attributes.action;
        if (r !== void 0) {
          const l = !["idle", "off"].includes(r);
          return n ? !l : l;
        }
      }
      let c = !Vt.includes(a.state);
      return n ? !c : c;
    });
  }
  setConfig(e) {
    if (!e)
      throw new Error("Invalid configuration.");
    this._config = e, this.hide_person = e.hide_person !== void 0 ? e.hide_person : !1, this.hide_content_name = e.hide_content_name !== void 0 ? e.hide_content_name : !1, this.list_mode = e.list_mode !== void 0 ? e.list_mode : !1, this.badge_mode = !!e.badge_mode, this.no_background = !!e.no_background, this.badge_color = e.badge_color || "", this.badge_text_color = e.badge_text_color || "", this.hiddenEntities = e.hidden_entities || [], this.hiddenLabels = e.hidden_labels || [], this.hiddenAreas = e.hidden_areas || [], this._config.customization, this._config.styles && (this._config.styles.card && (this._parsedGlobalCardCss = G(this._config.styles.card)), this._config.styles.button && (this._parsedGlobalCss = G(this._config.styles.button)), this._config.styles.icon && (this._parsedGlobalIconCss = G(this._config.styles.icon)), this._config.styles.name && (this._parsedGlobalNameCss = G(this._config.styles.name)), this._config.styles.state && (this._parsedGlobalStateCss = G(this._config.styles.state)));
  }
  _showPopup(e, t, i) {
    e.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag: t,
          dialogImport: () => customElements.whenDefined(t),
          dialogParams: i
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _openDomainPopup(e) {
    var a, c, r;
    let t = "Details";
    typeof e == "string" ? t = re(this._config, e) || this.computeLabel({ name: e }) : typeof e == "number" && ((a = this._config.content) != null && a[e]) && (t = this._config.content[e]);
    let i = [], s = [];
    if (typeof e == "number") {
      const l = (c = this._config.content) == null ? void 0 : c[e], d = (r = this._config.rulesets) == null ? void 0 : r.find(
        (h) => h.group_id === l
      );
      if (d) {
        const h = this._computeEntityMap(this.__registryEntities), f = this._computeDeviceMap(this.__registryDevices), u = this._computeAreaMap(this.__registryAreas);
        s = tn(
          this,
          d,
          h,
          f,
          u
        ), i = s.filter((m) => {
          if (I(m.entity_id) === "climate") {
            const y = m.attributes.hvac_action;
            if (y !== void 0)
              return !["idle", "off"].includes(y);
          }
          return !Vt.includes(m.state);
        });
      } else
        i = [], s = [];
    } else {
      const l = this.selectedDeviceClass || void 0;
      s = this._totalEntities(e, l), i = this._shouldShowTotalEntities(e, l) ? s : this._isOn(e, l);
    }
    const o = typeof e == "string" ? this._shouldShowTotalEntities(
      e,
      this.selectedDeviceClass || void 0
    ) : !1;
    this._showPopup(this, "status-card-popup", {
      title: t,
      hass: this.hass,
      entities: i,
      allEntities: s,
      selectedDomain: typeof e == "string" ? e : void 0,
      selectedDeviceClass: this.selectedDeviceClass || void 0,
      selectedGroup: this.selectedGroup !== null ? this.selectedGroup : void 0,
      card: this,
      content: i.length ? void 0 : "Keine Entitäten",
      initialShowAll: o
    });
  }
  willUpdate(e) {
    super.willUpdate(e), !(!this._config || !this.hass) && (e.has("hass") || e.has("_config") || e.has("hiddenEntities") || e.has("hiddenLabels") || e.has("hiddenAreas")) && (this._processEntities(), this._updateShouldHideCard());
  }
  updated(e) {
    if (super.updated(e), !this._config || !this.hass) return;
    this._ensureRegistryData();
    const t = e.get("hass"), i = e.get("_config");
    if (e.has("selectedDomain") && this.selectedDomain) {
      const s = this.selectedDomain;
      if (s.includes(".")) {
        const o = s, n = this.hass.states[o];
        n && this.showMoreInfo(n);
      } else
        this._openDomainPopup(s);
      setTimeout(() => {
        this.selectedDomain = null;
      }, 0);
    }
    if (e.has("selectedGroup") && this.selectedGroup !== null) {
      const s = this.selectedGroup;
      this._openDomainPopup(s), setTimeout(() => {
        this.selectedGroup = null;
      }, 0);
    }
    (e.has("hass") && (!t || t.themes !== this.hass.themes) || e.has("_config") && (!i || i.theme !== this._config.theme)) && lo(
      this,
      this.hass.themes,
      this._config.theme
    );
  }
  showMoreInfo(e) {
    const t = new CustomEvent("hass-more-info", {
      detail: { entityId: e.entity_id },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(t);
  }
  _hasContent() {
    if (this.getPersonItems().length > 0 || this.getExtraItems().length > 0)
      return !0;
    const e = this._computeGroupCandidatesMemo(
      this._config.rulesets || [],
      this.__registryEntities,
      this.__registryDevices,
      this.__registryAreas,
      this.hiddenEntities
    ), t = this._computeGroupResultsMemo(
      e,
      this.hass.states,
      this._config.rulesets || [],
      this.__registryEntities,
      this.__registryDevices,
      this.__registryAreas
    );
    return !!(this.getGroupItems().some(
      (n) => (t.get(n.group_id) || []).length > 0
    ) || [
      ...this.getDomainItems(),
      ...this.getDeviceClassItems()
    ].some((n) => {
      const a = n.domain, c = n.deviceClass || void 0;
      return (this._shouldShowTotalEntities(a, c) ? this._totalEntities(a, c) : this._isOn(a, c)).length > 0;
    }));
  }
  _updateShouldHideCard() {
    if ((this._config.hide_card_if_empty ?? !1) !== !0) {
      this._shouldHideCard = !1;
      return;
    }
    this._shouldHideCard = !this._hasContent();
  }
  getPersonItems() {
    const e = this._computePersonIdsMemo(
      this.hass.entities,
      this.hiddenEntities,
      this.hiddenLabels,
      this.hide_person
    );
    return this._mapPersonIdsToStatesMemo(e, this.hass.states);
  }
  getExtraItems() {
    return !this._config || !this.hass ? [] : this._computeExtraItemsMemo(
      this._config,
      this.hass.states,
      this._customizationIndexMemo(this._config.customization)
    );
  }
  getGroupItems() {
    return this._computeGroupItemsMemo(
      this._config.content || [],
      this._config.rulesets || []
    );
  }
  getDomainItems() {
    return this._computeDomainItemsMemo(this._config.content || []);
  }
  getDeviceClassItems() {
    return this._computeDeviceClassItemsMemo(this._config.content || []);
  }
  toggleDomain(e, t) {
    e = e ?? this.selectedDomain, t = t ?? this.selectedDeviceClass;
    const i = this._isOn(e, t);
    M1(this.hass, i, e);
  }
  _handleDomainAction(e, t) {
    return (i) => {
      w1(
        this,
        this.hass,
        this._config,
        e,
        t,
        i,
        {
          showMoreInfo: (s) => {
            const o = this.hass.states[s];
            o && this.showMoreInfo(o);
          },
          toggleDomain: (s, o) => this.toggleDomain(s, o),
          selectDomain: (s, o) => {
            this.selectedDomain = s, this.selectedDeviceClass = o || null;
          }
        }
      );
    };
  }
  _handleGroupAction(e, t, i) {
    return (s) => {
      w1(
        this,
        this.hass,
        this._config,
        e,
        void 0,
        s,
        {
          showMoreInfo: (o) => {
            const n = this.hass.states[o];
            n && this.showMoreInfo(n);
          },
          toggleDomain: () => {
            i.forEach((o) => {
              const n = I(o.entity_id);
              M1(this.hass, [o], n);
            });
          },
          selectDomain: () => {
            this.selectedGroup = t;
          }
        }
      );
    };
  }
  getCustomizationForType(e) {
    return Mt(
      this._config,
      e,
      this._customizationIndexMemo(this._config.customization)
    );
  }
  _getIconStyles(e, t = {}) {
    return Wo(e, t);
  }
  renderExtraTab(e) {
    var V, S, x;
    const { panel: t, icon: i, name: s, color: o, icon_css: n, background_color: a } = e, c = this.hass.states[t], r = this.getCustomizationForType(t), l = this._handleDomainAction(t), d = ee({
      hasHold: pt(
        (r == null ? void 0 : r.hold_action) ?? this._config.hold_action
      ),
      hasDoubleClick: pt(
        (r == null ? void 0 : r.double_tap_action) ?? this._config.double_tap_action
      )
    }), h = {
      horizontal: this._config.content_layout === "horizontal"
    }, f = this._getIconStyles("extra", {
      color: o,
      background_color: a,
      square: this._config.square
    }), u = (r == null ? void 0 : r.state_content) ?? "state", m = (r == null ? void 0 : r.badge_mode) ?? this.badge_mode, y = (r == null ? void 0 : r.badge_color) || this.badge_color || void 0, _ = (r == null ? void 0 : r.badge_text_color) || this.badge_text_color || void 0, p = {
      "--status-card-badge-color": y ? `var(--${y}-color)` : void 0,
      "--status-card-badge-text-color": _ ? `var(--${_}-color)` : void 0
    }, b = se(
      ((V = r == null ? void 0 : r.styles) == null ? void 0 : V.button) || ((S = r == null ? void 0 : r.styles) == null ? void 0 : S.card),
      r
    ), C = { ...this._parsedGlobalCss, ...b }, L = (r == null ? void 0 : r._parsedIconCss) || G((x = r == null ? void 0 : r.styles) == null ? void 0 : x.icon), v = {
      ...this._parsedGlobalIconCss,
      ...L
    };
    return g`
      <ha-tab-group-tab
        slot="nav"
        panel=${t}
        @action=${l}
        .actionHandler=${d}
        class=${m ? "badge-mode" : ""}
        style=${z(p)}
        data-badge=${Kt(m ? "1" : void 0)}
      >
        <div
          class="extra-entity ${ut(h)}"
          style=${z(C)}
        >
          <div
            class="entity-icon"
            style=${z({ ...f, ...v })}
          >
            ${i.startsWith("/") || i.startsWith("http") ? g`<img
                  src=${i}
                  alt=${s}
                  style="border-radius:${this._config.square ? "20%" : "50%"};object-fit:cover;"
                />` : i.startsWith("M") ? g`<ha-svg-icon
                  .path=${i}
                  style="${n || ""}"
                ></ha-svg-icon>` : g`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${c}
                  .icon=${i}
                  data-domain=${I(t)}
                  data-state=${c.state}
                  style="${n || ""}"
                ></ha-state-icon>`}
          </div>

          ${m ? "" : g`<div class="entity-info">
                ${this.hide_content_name ? "" : g`<div
                      class="entity-name"
                      style=${z(this._parsedGlobalNameCss)}
                    >
                      ${s}
                    </div>`}
                <div
                  class="entity-state"
                  style=${z(this._parsedGlobalStateCss)}
                >
                  <state-display
                    .stateObj=${c}
                    .hass=${this.hass}
                    .content=${u}
                    .name=${s}
                  ></state-display>
                </div>
              </div>`}
        </div>
      </ha-tab-group-tab>
    `;
  }
  renderGroupTab(e, t) {
    var V, S, x;
    const i = this._computeGroupCandidatesMemo(
      this._config.rulesets || [],
      this.__registryEntities,
      this.__registryDevices,
      this.__registryAreas,
      this.hiddenEntities
    ), o = this._computeGroupResultsMemo(
      i,
      this.hass.states,
      this._config.rulesets || [],
      this.__registryEntities,
      this.__registryDevices,
      this.__registryAreas
    ).get(e.group_id) || [];
    if (!o.length) return g``;
    const n = e.group_id || `${this.hass.localize("component.group.entity_component._.name")} ${t + 1}`, a = e.group_icon || ts, c = $1(
      this._config,
      n,
      void 0,
      this._customizationIndexMemo(this._config.customization)
    ), r = ae(
      this._config,
      n,
      void 0,
      this._customizationIndexMemo(this._config.customization)
    ), l = this.getCustomizationForType(n), d = this._handleGroupAction(n, t, o), h = ee({
      hasHold: pt(
        (l == null ? void 0 : l.hold_action) ?? this._config.hold_action
      ),
      hasDoubleClick: pt(
        (l == null ? void 0 : l.double_tap_action) ?? this._config.double_tap_action
      )
    }), f = {
      horizontal: this._config.content_layout === "horizontal"
    }, u = this._getIconStyles("domain", {
      color: c,
      background_color: r,
      square: this._config.square
    }), m = (l == null ? void 0 : l.badge_color) || this.badge_color || void 0, y = (l == null ? void 0 : l.badge_text_color) || this.badge_text_color || void 0, _ = {
      "--status-card-badge-color": m ? `var(--${m}-color)` : void 0,
      "--status-card-badge-text-color": y ? `var(--${y}-color)` : void 0
    }, p = se(
      ((V = l == null ? void 0 : l.styles) == null ? void 0 : V.button) || ((S = l == null ? void 0 : l.styles) == null ? void 0 : S.card),
      l
    ), b = { ...this._parsedGlobalCss, ...p }, C = (l == null ? void 0 : l._parsedIconCss) || G((x = l == null ? void 0 : l.styles) == null ? void 0 : x.icon), L = {
      ...this._parsedGlobalIconCss,
      ...C
    }, v = (l == null ? void 0 : l.badge_mode) ?? this.badge_mode;
    return g`
      <ha-tab-group-tab
        slot="nav"
        panel=${"group-" + t}
        @action=${d}
        .actionHandler=${h}
        class=${v ? "badge-mode" : ""}
        style=${z(_)}
        data-badge=${Kt(
      v && o.length > 0 ? String(o.length) : void 0
    )}
      >
        <div
          class="entity ${ut(f)}"
          style=${z(b)}
        >
          <div
            class="entity-icon"
            style=${z({ ...u, ...L })}
          >
            ${a.startsWith("M") ? g`<ha-svg-icon .path=${a}></ha-svg-icon>` : g`<ha-icon icon=${a}></ha-icon>`}
          </div>
          ${v ? "" : g`<div class="entity-info">
                ${this.hide_content_name ? "" : g`<div
                      class="entity-name"
                      style=${z(this._parsedGlobalNameCss)}
                    >
                      ${n}
                    </div>`}
                <div
                  class="entity-state"
                  style=${z(this._parsedGlobalStateCss)}
                >
                  ${o.length}
                  ${e.group_status ? ` ${e.group_status}` : ""}
                </div>
              </div>`}
        </div>
      </ha-tab-group-tab>
    `;
  }
  renderItemTab(e) {
    var S, x, Z;
    const t = e.domain, i = e.deviceClass, s = this._isOn(t, i), o = this._totalEntities(t, i), a = this._shouldShowTotalEntities(t, i) ? o : s;
    if (!a.length) return g``;
    const c = $1(
      this._config,
      t,
      i,
      this._customizationIndexMemo(this._config.customization)
    ), r = this.getCustomizationForType(
      R(t, i)
    ), l = this._handleDomainAction(t, i), d = ee({
      hasHold: pt(
        (r == null ? void 0 : r.hold_action) ?? this._config.hold_action
      ),
      hasDoubleClick: pt(
        (r == null ? void 0 : r.double_tap_action) ?? this._config.double_tap_action
      )
    }), h = {
      horizontal: this._config.content_layout === "horizontal"
    }, f = this._getIconStyles("domain", {
      color: c,
      background_color: ae(
        this._config,
        t,
        i,
        this._customizationIndexMemo(this._config.customization)
      ),
      square: this._config.square
    }), u = re(this._config, t, i) || this.computeLabel({ name: i || t });
    let m;
    this._shouldShowTotalNumbers(t, i) ? m = `${s.length}/${o.length} ${oe(
      this.hass,
      this._config,
      t,
      i
    )}` : this._shouldShowTotalEntities(t, i) ? m = `${o.length}` : m = `${s.length} ${oe(
      this.hass,
      this._config,
      t,
      i
    )}`;
    const y = (r == null ? void 0 : r.badge_color) || this.badge_color || void 0, _ = (r == null ? void 0 : r.badge_text_color) || this.badge_text_color || void 0, p = {
      "--status-card-badge-color": y ? `var(--${y}-color)` : void 0,
      "--status-card-badge-text-color": _ ? `var(--${_}-color)` : void 0
    }, b = (r == null ? void 0 : r.badge_mode) ?? this.badge_mode, C = se(
      ((S = r == null ? void 0 : r.styles) == null ? void 0 : S.button) || ((x = r == null ? void 0 : r.styles) == null ? void 0 : x.card),
      r
    ), L = { ...this._parsedGlobalCss, ...C }, v = (r == null ? void 0 : r._parsedIconCss) || G((Z = r == null ? void 0 : r.styles) == null ? void 0 : Z.icon), V = {
      ...this._parsedGlobalIconCss,
      ...v
    };
    return g`
      <ha-tab-group-tab
        slot="nav"
        panel=${i || t}
        @action=${l}
        .actionHandler=${d}
        class=${b ? "badge-mode" : ""}
        style=${z(p)}
        data-badge=${Kt(
      b && a.length > 0 ? String(a.length) : void 0
    )}
      >
        <div
          class="entity ${ut(h)}"
          style=${z(L)}
        >
          <div
            class="entity-icon"
            style=${z({ ...f, ...V })}
          >
            ${(() => {
      const ot = R1(this._config, t, i);
      return ot.startsWith("M") ? g`<ha-svg-icon .path=${ot}></ha-svg-icon>` : g`<ha-icon icon=${ot}></ha-icon>`;
    })()}
          </div>
          ${b ? "" : g`<div class="entity-info">
                ${this.hide_content_name ? "" : g`<div
                      class="entity-name"
                      style=${z(this._parsedGlobalNameCss)}
                    >
                      ${u}
                    </div>`}
                <div
                  class="entity-state"
                  style=${z(this._parsedGlobalStateCss)}
                >
                  ${m}
                </div>
              </div>`}
        </div>
      </ha-tab-group-tab>
    `;
  }
  renderTab(e) {
    switch (e.type) {
      case "extra":
        return this.renderExtraTab(e);
      case "group":
        return this.renderGroupTab(e.ruleset, e.order);
      case "domain":
      case "deviceClass":
        return this.renderItemTab(e);
    }
  }
  render() {
    const e = this.getExtraItems(), t = this.getGroupItems(), i = this.getDomainItems(), s = this.getDeviceClassItems(), o = this._computeSortedEntities(
      e,
      t,
      i,
      s
    ), n = this.getPersonItems();
    if (this._shouldHideCard)
      return this.hidden = !0, g``;
    this.hidden = !1;
    const a = {
      "no-scroll": !!this._config.no_scroll,
      "badge-mode": this.badge_mode,
      "no-background": this.no_background
    };
    return g`
      <ha-card
        class=${ut(a)}
        style=${z(this._parsedGlobalCardCss)}
      >
        <ha-tab-group without-scroll-controls class=${ut(a)}>
          <ha-tab-group-tab style="display:none" active></ha-tab-group-tab>
          ${tt(
      n,
      (c) => c.entity_id,
      (c) => {
        var b, C, L;
        const r = this.hass.states[c.entity_id], l = (r == null ? void 0 : r.state) !== "home", d = {
          horizontal: this._config.content_layout === "horizontal"
        }, h = {
          "border-radius": (b = this._config) != null && b.square ? "20%" : "50%",
          filter: l ? "grayscale(100%)" : "none"
        }, f = this._config.person_home_color, u = this._config.person_away_color, m = this._config.person_home_icon || "mdi:home", y = this._config.person_away_icon || "mdi:home-export-outline", _ = l ? u || "red" : f || "green", p = l ? y : m;
        return g`
                <ha-tab-group-tab
                  slot="nav"
                  panel=${c.entity_id}
                  @click="${() => this.showMoreInfo(c)}"
                  class=${this.badge_mode ? "badge-mode" : ""}
                >
                  ${this.badge_mode ? g`<div
                        class="person-badge"
                        style=${z({
          "--status-card-badge-color": `var(--${_}-color)`,
          "--status-card-badge-text-color": this.badge_text_color ? `var(--${this.badge_text_color}-color)` : void 0
        })}
                      >
                        ${p.startsWith("M") ? g`<ha-svg-icon .path=${p}></ha-svg-icon>` : g`<ha-icon icon=${p}></ha-icon>`}
                      </div>` : ""}
                  <div class="entity ${ut(d)}">
                    <div class="entity-icon" style=${z(h)}>
                      ${c.attributes.entity_picture ? g`<img
                            src=${c.attributes.entity_picture}
                            alt=${c.attributes.friendly_name || c.entity_id}
                            style=${z(h)}
                          />` : (C = c.attributes.icon) != null && C.startsWith("M") ? g`<ha-svg-icon
                            class="center"
                            .path=${c.attributes.icon}
                            style=${z(h)}
                          ></ha-svg-icon>` : g`<ha-icon
                            class="center"
                            icon=${c.attributes.icon || "mdi:account"}
                            style=${z(h)}
                          ></ha-icon>`}
                    </div>
                    ${this.badge_mode ? "" : g`<div class="entity-info">
                          ${this.hide_content_name ? "" : g`<div class="entity-name">
                                ${((L = c.attributes.friendly_name) == null ? void 0 : L.split(
          " "
        )[0]) || ""}
                              </div>`}
                          <div class="entity-state">
                            ${oe(
          this.hass,
          this._config,
          "person",
          void 0,
          r == null ? void 0 : r.state
        )}
                          </div>
                        </div>`}
                  </div>
                </ha-tab-group-tab>
              `;
      }
    )}
          ${tt(
      o,
      (c) => c.type === "extra" ? c.panel : c.type === "domain" ? c.domain : c.type === "deviceClass" ? `${c.domain}-${c.deviceClass}` : c.type === "group" ? `group-${c.group_id}` : "",
      (c) => this.renderTab(c)
    )}
        </ha-tab-group>
      </ha-card>
    `;
  }
  static get styles() {
    return [Bo];
  }
  static getConfigElement() {
    return document.createElement("status-card-editor");
  }
  static getStubConfig() {
    return {};
  }
};
E([
  $({ type: Object })
], w.prototype, "_config", 2);
E([
  H()
], w.prototype, "entitiesByDomain", 2);
E([
  H()
], w.prototype, "selectedDomain", 2);
E([
  H()
], w.prototype, "selectedDeviceClass", 2);
E([
  H()
], w.prototype, "hiddenEntities", 2);
E([
  H()
], w.prototype, "hiddenLabels", 2);
E([
  H()
], w.prototype, "hiddenAreas", 2);
E([
  H()
], w.prototype, "hide_person", 2);
E([
  H()
], w.prototype, "hide_content_name", 2);
E([
  H()
], w.prototype, "list_mode", 2);
E([
  H()
], w.prototype, "badge_mode", 2);
E([
  H()
], w.prototype, "no_background", 2);
E([
  H()
], w.prototype, "badge_color", 2);
E([
  H()
], w.prototype, "badge_text_color", 2);
E([
  H()
], w.prototype, "selectedGroup", 2);
E([
  $({ attribute: !1 })
], w.prototype, "hass", 2);
E([
  H()
], w.prototype, "_shouldHideCard", 2);
E([
  H()
], w.prototype, "__registryEntities", 2);
E([
  H()
], w.prototype, "__registryDevices", 2);
E([
  H()
], w.prototype, "__registryAreas", 2);
E([
  H()
], w.prototype, "__registryFetchInProgress", 2);
E([
  H()
], w.prototype, "_parsedGlobalCss", 2);
E([
  H()
], w.prototype, "_parsedGlobalIconCss", 2);
E([
  H()
], w.prototype, "_parsedGlobalCardCss", 2);
E([
  H()
], w.prototype, "_parsedGlobalNameCss", 2);
E([
  H()
], w.prototype, "_parsedGlobalStateCss", 2);
w = E([
  Gt("status-card")
], w);
function nn(e, t, i, s, o) {
  const n = (d, h, f) => $t(e, d, h, f), a = n({ name: "area" }), c = n({ name: "floor" }), r = n({ name: "name" }), l = n({ name: "state" });
  return [
    {
      name: "person",
      // @ts-ignore
      flatten: !0,
      type: "expandable",
      icon: "mdi:account",
      schema: [
        { name: "hide_person", selector: { boolean: {} } },
        {
          name: "person_home_color",
          selector: {
            ui_color: { default_color: "state", include_state: !0 }
          }
        },
        {
          name: "person_away_color",
          selector: {
            ui_color: { default_color: "state", include_state: !0 }
          }
        },
        {
          name: "person_home_icon",
          selector: { icon: { placeholder: "mdi:home" } }
        },
        {
          name: "person_away_icon",
          selector: { icon: { placeholder: "mdi:home-export-outline" } }
        }
      ]
    },
    {
      name: "edit_filters",
      // @ts-ignore
      flatten: !0,
      type: "expandable",
      icon: "mdi:filter-cog",
      schema: [
        {
          name: "",
          type: "grid",
          schema: [
            {
              name: "filter",
              selector: {
                select: {
                  options: [
                    { value: "area", label: a },
                    { value: "floor", label: c }
                  ]
                }
              }
            },
            { name: "label_filter", selector: { boolean: {} } }
          ]
        },
        ...t === "area" && s === !1 ? [
          { name: "multiple_areas", selector: { boolean: {} } },
          { name: "area", selector: { area: {} } }
        ] : [],
        ...t === "area" && s === !0 ? [
          { name: "multiple_areas", selector: { boolean: {} } },
          { name: "area", selector: { area: { multiple: !0 } } }
        ] : [],
        ...t === "floor" && o === !1 ? [
          { name: "multiple_floors", selector: { boolean: {} } },
          { name: "floor", selector: { floor: {} } }
        ] : [],
        ...t === "floor" && o === !0 ? [
          { name: "multiple_floors", selector: { boolean: {} } },
          { name: "floor", selector: { floor: { multiple: !0 } } }
        ] : [],
        ...i ? [
          { name: "label", selector: { label: { multiple: !0 } } }
        ] : []
      ]
    },
    {
      name: "popup",
      // @ts-ignore
      flatten: !0,
      type: "expandable",
      icon: "mdi:arrange-bring-forward",
      schema: [
        {
          name: "",
          type: "grid",
          schema: [
            {
              name: "ungroup_areas",
              selector: { boolean: {} }
            },
            { name: "list_mode", selector: { boolean: {} } }
          ]
        },
        {
          name: "popup_sort",
          selector: {
            select: {
              options: [
                { value: "name", label: r },
                { value: "state", label: l }
              ]
            }
          }
        },
        {
          name: "columns",
          required: !1,
          selector: { number: { min: 1, max: 4 } }
        }
      ]
    }
  ];
}
function an(e, t) {
  return [
    {
      name: "",
      type: "grid",
      schema: [
        { name: "hide_content_name", selector: { boolean: {} } },
        {
          name: "show_total_number",
          selector: { boolean: {} }
        },
        {
          name: "square",
          selector: { boolean: {} }
        },
        {
          name: "show_total_entities",
          selector: { boolean: {} }
        },
        {
          name: "no_scroll",
          selector: { boolean: {} }
        },
        {
          name: "hide_card_if_empty",
          selector: { boolean: {} }
        },
        { name: "badge_mode", selector: { boolean: {} } },
        { name: "no_background", selector: { boolean: {} } }
      ]
    },
    ...t ? [
      {
        name: "",
        type: "grid",
        schema: [
          {
            name: "badge_color",
            selector: {
              ui_color: { default_color: "state", include_state: !0 }
            }
          },
          {
            name: "badge_text_color",
            selector: {
              ui_color: { default_color: "state", include_state: !0 }
            }
          }
        ]
      }
    ] : [],
    {
      name: "",
      type: "grid",
      schema: [{ name: "theme", required: !1, selector: { theme: {} } }]
    },
    {
      name: "content_layout",
      required: !0,
      selector: {
        select: {
          mode: "box",
          options: ["vertical", "horizontal"].map((i) => ({
            label: e.localize(
              `ui.panel.lovelace.editor.card.tile.content_layout_options.${i}`
            ),
            value: i,
            image: {
              src: `/static/images/form/tile_content_layout_${i}.svg`,
              src_dark: `/static/images/form/tile_content_layout_${i}_dark.svg`,
              flip_rtl: !0
            }
          }))
        }
      }
    },
    {
      name: "color",
      selector: {
        ui_color: { default_color: "state", include_state: !0 }
      }
    },
    {
      name: "background_color",
      selector: {
        color_rgb: {}
      }
    }
  ];
}
function rn(e) {
  const t = [
    "more-info",
    "toggle",
    "navigate",
    "url",
    "perform-action",
    "none"
  ];
  return [
    { name: "tap_action", selector: { ui_action: { actions: t } } },
    { name: "double_tap_action", selector: { ui_action: { actions: t } } },
    { name: "hold_action", selector: { ui_action: { actions: t } } }
  ];
}
const cn = (e, t, i, s, o) => e === "domain" ? [
  {
    name: "",
    type: "grid",
    schema: [
      ...o ? [] : [{ name: "invert", selector: { boolean: {} } }],
      { name: "badge_mode", selector: { boolean: {} } },
      ...s ? [
        {
          name: "badge_color",
          selector: {
            ui_color: { default_color: "state", include_state: !0 }
          }
        },
        {
          name: "badge_text_color",
          selector: {
            ui_color: { default_color: "state", include_state: !0 }
          }
        }
      ] : [],
      ...o ? [] : [
        { name: "show_total_number", selector: { boolean: {} } },
        { name: "show_total_entities", selector: { boolean: {} } }
      ]
    ]
  },
  ...o ? [] : [
    { name: "name", selector: { text: {} } },
    { name: "icon", selector: { icon: {} } }
  ],
  {
    name: "icon_color",
    selector: {
      ui_color: { default_color: "state", include_state: !0 }
    }
  },
  {
    name: "background_color",
    selector: {
      color_rgb: { default_color: "state", include_state: !0 }
    }
  }
] : [
  {
    name: "",
    type: "grid",
    schema: [
      {
        name: "invert_state",
        required: !0,
        selector: {
          select: {
            mode: "dropdown",
            options: [
              {
                label: i.localize(
                  "ui.panel.lovelace.editor.condition-editor.condition.state.state_equal"
                ),
                value: "false"
              },
              {
                label: i.localize(
                  "ui.panel.lovelace.editor.condition-editor.condition.state.state_not_equal"
                ),
                value: "true"
              }
            ]
          }
        }
      },
      {
        name: "state",
        selector: { state: { entity_id: t || "" } }
      }
    ]
  },
  {
    name: "state_content",
    selector: { ui_state_content: { entity_id: t } }
  },
  { name: "name", selector: { text: {} } },
  { name: "show_entity_picture", selector: { boolean: {} } },
  { name: "icon", selector: { icon: {} } },
  { name: "activate_state_color", selector: { boolean: {} } },
  {
    name: "icon_color",
    selector: {
      ui_color: { default_color: "state", include_state: !0 }
    }
  },
  {
    name: "background_color",
    selector: {
      color_rgb: { default_color: "state", include_state: !0 }
    }
  }
], ln = (e, t, i, s) => {
  const o = [
    "more-info",
    "toggle",
    "navigate",
    "url",
    "perform-action",
    "none"
  ];
  return [
    { name: "tap_action", selector: { ui_action: { actions: o } } },
    { name: "double_tap_action", selector: { ui_action: { actions: o } } },
    { name: "hold_action", selector: { ui_action: { actions: o } } }
  ];
}, dn = () => [
  {
    name: "styles",
    selector: {
      object: {}
    }
  }
], hn = () => [
  {
    name: "styles",
    selector: {
      object: {}
    }
  }
];
var un = Object.defineProperty, pn = Object.getOwnPropertyDescriptor, q = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? pn(t, i) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (o = (s ? a(t, i, o) : a(o)) || o);
  return s && o && un(t, i, o), o;
};
let B = class extends N {
  constructor() {
    super(...arguments), this.useSensorSchema = !1, this.isGroup = !1, this._activeTab = "appearance";
  }
  willUpdate(e) {
    e.has("config") && this.config && (this._config = {
      ...this.config,
      invert_state: this.config.invert_state || "false"
    });
  }
  render() {
    var i, s, o, n;
    if (!this.hass || !this.config)
      return g``;
    let e;
    this._activeTab === "appearance" ? e = cn(
      this.getSchema,
      (i = this.config) == null ? void 0 : i.type,
      this.hass,
      ((s = this._config) == null ? void 0 : s.badge_mode) ?? !1,
      this.isGroup
    ) : this._activeTab === "actions" ? e = ln(
      this.getSchema,
      (o = this.config) == null ? void 0 : o.type,
      this.hass,
      ((n = this._config) == null ? void 0 : n.badge_mode) ?? !1
    ) : this._activeTab === "style" && (e = dn());
    const t = {
      ...this._config
    };
    return g`
      <ha-tab-group>
        <ha-tab-group-tab
          .active=${this._activeTab === "appearance"}
          @click=${() => this._activeTab = "appearance"}
        >
          ${this.hass.localize("ui.panel.lovelace.editor.card.map.appearance")}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "actions"}
          @click=${() => this._activeTab = "actions"}
        >
          ${this.hass.localize("ui.panel.lovelace.editor.card.generic.actions")}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "style"}
          @click=${() => this._activeTab = "style"}
        >
          Style
        </ha-tab-group-tab>
        ${this.getSchema === "domain" ? g`
              <ha-tab-group-tab
                .active=${this._activeTab === "popup"}
                @click=${() => this._activeTab = "popup"}
              >
                Popup Card
              </ha-tab-group-tab>
            ` : ""}
      </ha-tab-group>
      ${this._activeTab === "style" ? g`
            <ha-alert alert-type="info" title="Style Guide">
              <p>
                You can use standard CSS per identifier. <br />
                <strong>Identifiers:</strong>
              </p>
              <ul>
                <li><b>button</b>: Item Container (Background, Border)</li>
                <li><b>icon</b>: Item Icon</li>
                <li><b>name</b>: Entity Name</li>
                <li><b>state</b>: Entity State Value</li>
                ${this.getSchema === "entity" ? g`<li><b>name</b>: Item Name (Label)</li>` : g``}
              </ul>
              <p>
                <strong>Animations:</strong> <br />
                spin, pulse, shake, blink, bounce
              </p>
              <p><strong>Example:</strong></p>
              <pre>
button:
  --mdc-icon-size: 24px;
  border: none;
  color: green;            
icon:
  animation: spin 2s linear infinite;
  --mdc-icon-size: 40px;
  color: var(--primary-color);
name:
  font-size: 15px;    </pre
              >
            </ha-alert>
          ` : ""}
      ${this._activeTab === "popup" ? this._renderPopupTab() : g`
            <ha-form
              .hass=${this.hass}
              .data=${t}
              .schema=${e}
              .computeLabel=${(a) => a.name === "styles" ? "Styles" : $t(this.hass, a)}
              @value-changed=${this._valueChangedSchema}
            ></ha-form>
          `}
    `;
  }
  _renderPopupTab() {
    var t;
    const e = (t = this._config) == null ? void 0 : t.popup_card;
    return e ? g`
      <div class="card-editor">
        <div class="card-header">
          <h3>
            Popup
            ${this.hass.localize(
      "ui.panel.lovelace.editor.edit_card.tab_config"
    )}
          </h3>
          <ha-button
            class="warning"
            @click=${this._removePopupCard}
            .disabled=${!e}
          >
            ${this.hass.localize("ui.common.delete")}
          </ha-button>
        </div>
        <hui-card-element-editor
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          .value=${e}
          @config-changed=${this._popupCardChanged}
        ></hui-card-element-editor>
      </div>
    ` : g`
        <div class="card-picker">
          <hui-card-picker
            .hass=${this.hass}
            .lovelace=${this.lovelace}
            @config-changed=${this._cardPicked}
          ></hui-card-picker>
        </div>
      `;
  }
  _cardPicked(e) {
    e.stopPropagation();
    const t = e.detail.config;
    this._updatePopupCard(t);
  }
  _popupCardChanged(e) {
    e.stopPropagation();
    const t = e.detail.config;
    this._updatePopupCard(t);
  }
  _updatePopupCard(e) {
    if (!this._config) return;
    const t = {
      ...this._config,
      popup_card: e
    };
    this._config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: t
      })
    );
  }
  _removePopupCard() {
    if (!this._config) return;
    const { popup_card: e, ...t } = this._config;
    this._config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: this._config
      })
    );
  }
  _valueChangedSchema(e) {
    if (!this.config)
      return;
    e.stopPropagation();
    const t = {
      ...this.config,
      ...e.detail.value
    };
    this._config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: t
      })
    );
  }
  setConfig(e) {
    this._config = {
      ...e,
      customization: e.customization ?? []
    };
  }
  static get styles() {
    return mt`
      .checkbox {
        display: flex;
        align-items: center;
        padding: 8px 0;
      }
      .checkbox input {
        height: 20px;
        width: 20px;
        margin-left: 0;
        margin-right: 8px;
      }
      h3 {
        margin-bottom: 0.5em;
      }
      .row {
        margin-bottom: 12px;
        margin-top: 12px;
        display: block;
      }
      .side-by-side {
        display: flex;
        align-items: center;
      }
      .side-by-side > * {
        flex: 1 1 0%;
        padding-right: 4px;
      }
      ha-tab-group {
        display: block;
        margin-bottom: 16px;
        padding: 0 1em;
      }
      ha-tab-group-tab {
        flex: 1;
      }
      ha-tab-group-tab::part(base) {
        width: 100%;
        justify-content: center;
      }
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
      .card-editor {
        border: 1px solid var(--divider-color);
        padding: 12px;
        border-radius: 4px;
        margin-top: 16px;
      }
      .warning {
        --mdc-theme-primary: var(--error-color);
      }
    `;
  }
};
q([
  $({ attribute: !1 })
], B.prototype, "config", 2);
q([
  $({ attribute: !1 })
], B.prototype, "hass", 2);
q([
  $({ attribute: !1 })
], B.prototype, "lovelace", 2);
q([
  $({ type: Boolean })
], B.prototype, "useSensorSchema", 2);
q([
  $({ type: Number })
], B.prototype, "index", 2);
q([
  $()
], B.prototype, "getSchema", 2);
q([
  $({ type: Boolean })
], B.prototype, "isGroup", 2);
q([
  H()
], B.prototype, "_config", 2);
q([
  H()
], B.prototype, "_activeTab", 2);
B = q([
  Gt("status-card-item-editor")
], B);
var fn = Object.defineProperty, _n = Object.getOwnPropertyDescriptor, jt = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? _n(t, i) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (o = (s ? a(t, i, o) : a(o)) || o);
  return s && o && fn(t, i, o), o;
};
class ge extends N {
  constructor() {
    super(...arguments), this.SelectOptions = [], this._entityKeys = /* @__PURE__ */ new WeakMap();
  }
  _getKey(t) {
    return this._entityKeys.has(t) || this._entityKeys.set(t, Math.random().toString()), this._entityKeys.get(t);
  }
  render() {
    if (!this.hass)
      return D;
    const t = new Set(
      (this.customizationkey || []).map((s) => s.type)
    ), i = this.SelectOptions.filter(
      (s) => !t.has(s.value)
    );
    return g`
      <div class="customization">
        ${this.customizationkey && tt(
      this.customizationkey,
      (s) => this._getKey(s),
      (s, o) => {
        var n;
        return g`
            <div class="customize-item">
              <ha-select
                label=${this.hass.localize(
          "ui.panel.lovelace.editor.common.edit"
        ) + " " + this.hass.localize(
          "ui.panel.lovelace.editor.card.markdown.content"
        )}
                name="Customize"
                class="select-customization"
                naturalMenuWidth
                fixedMenuPosition
                .value=${s.type}
                @closed=${(a) => a.stopPropagation()}
                @value-changed=${this._valueChanged}
              >
                <mwc-list-item .value=${s.type} selected disabled>
                  ${((n = this.SelectOptions.find((a) => a.value === s.type)) == null ? void 0 : n.label) || s.type}
                </mwc-list-item>
              </ha-select>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.remove")}
                .path=${_e}
                class="remove-icon"
                .index=${o}
                @click=${this._removeRow}
              ></ha-icon-button>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.edit")}
                .path=${Ls}
                class="edit-icon"
                .index=${o}
                @click=${this._editRow}
              ></ha-icon-button>
            </div>
          `;
      }
    )}

        <div class="add-item row">
          <ha-select
            label=${this.hass.localize(
      "ui.panel.lovelace.editor.common.edit"
    ) + " " + this.hass.localize(
      "ui.panel.lovelace.editor.card.markdown.content"
    )}
            name="Customize"
            class="add-customization"
            naturalMenuWidth
            fixedMenuPosition
            @closed=${(s) => s.stopPropagation()}
            @click=${this._addRow}
          >
            ${i.map(
      (s) => g`<mwc-list-item .value=${s.value}
                  >${s.label}</mwc-list-item
                >`
    )}
          </ha-select>
        </div>
      </div>
    `;
  }
  _valueChanged(t) {
    if (!this.customizationkey || !this.hass)
      return;
    const i = t.detail.value, s = t.target.index;
    if (s === void 0) return;
    const o = this.customizationkey.concat();
    o[s] = { ...o[s], type: i || "" }, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: o,
        bubbles: !0,
        composed: !0
      })
    );
  }
  _removeRow(t) {
    t.stopPropagation();
    const i = t.currentTarget.index;
    if (i != null) {
      const s = this.customizationkey.concat();
      s.splice(i, 1), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: s,
          bubbles: !0,
          composed: !0
        })
      );
    }
  }
  _editRow(t) {
    t.stopPropagation();
    const i = t.target.index;
    i != null && P(this, "edit-item", i);
  }
  _addRow(t) {
    if (t.stopPropagation(), !this.customizationkey || !this.hass)
      return;
    const i = this.shadowRoot.querySelector(
      ".add-customization"
    );
    if (!i || !i.value)
      return;
    const o = { type: i.value };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: [...this.customizationkey, o],
        bubbles: !0,
        composed: !0
      })
    ), i.value = "";
  }
  static get styles() {
    return mt`
      .customization {
        margin-top: 16px;
      }
      .customize-item,
      .add-item {
        display: flex;
        align-items: center;
      }
      .add-customization,
      .select-customization {
        width: 100%;
        margin-top: 8px;
      }
      .remove-icon,
      .edit-icon {
        --mdc-icon-button-size: 36px;
        color: var(--secondary-text-color);
        padding-left: 4px;
      }
    `;
  }
}
jt([
  $({ attribute: !1 })
], ge.prototype, "hass", 2);
jt([
  $({ type: Array })
], ge.prototype, "SelectOptions", 2);
let le = class extends ge {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customizationkey() {
    return this.customization;
  }
};
jt([
  $({ attribute: !1 })
], le.prototype, "customization", 2);
le = jt([
  Gt("status-items-editor")
], le);
var mn = Object.defineProperty, gn = Object.getOwnPropertyDescriptor, st = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? gn(t, i) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (o = (s ? a(t, i, o) : a(o)) || o);
  return s && o && mn(t, i, o), o;
};
let Y = class extends N {
  constructor() {
    super(...arguments), this._subElementEditorDomain = void 0, this._subElementEditorEntity = void 0, this.rulesets = [
      {
        group_id: "",
        group_icon: "",
        group_status: "",
        rules: [{ key: "", value: "" }]
      }
    ], this._activeTab = "config", this.computeLabel = M(
      (e, t, i) => $t(this.hass, e, t, i)
    ), this._filterInitialized = !1, this._lastFilter = {
      area: [],
      floor: [],
      label: []
    }, this._groupPreviousIds = /* @__PURE__ */ new Map(), this._schema = M(
      (e, t, i, s, o, n) => {
        switch (e) {
          case "appearance":
            return an(this.hass, n);
          case "actions":
            return rn(this.hass);
          case "style":
            return hn();
          case "config":
          default:
            return nn(
              this.hass,
              t,
              i,
              s,
              o
            );
        }
      }
    ), this._toggleschema = M((e) => [
      {
        name: "content",
        selector: {
          select: {
            reorder: !0,
            multiple: !0,
            custom_value: !0,
            options: e
          }
        }
      }
    ]), this._entitiesSchema = M((e) => {
      const t = this.computeLabel({ name: "area" }), i = this.computeLabel({ name: "label" }), s = this.computeLabel({ name: "entity" });
      return [
        {
          name: "extra_entities",
          selector: { entity: { multiple: !0 } }
        },
        {
          name: "",
          type: "grid",
          schema: [
            {
              name: "hide_filter",
              selector: {
                select: {
                  options: [
                    { value: "entity", label: s },
                    { value: "label", label: i },
                    { value: "area", label: t }
                  ]
                }
              }
            }
          ]
        },
        ...e === "label" ? [
          {
            name: "hidden_labels",
            selector: { label: { multiple: !0 } }
          }
        ] : [],
        ...e === "area" ? [
          {
            name: "hidden_areas",
            selector: { area: { multiple: !0 } }
          }
        ] : []
      ];
    }), this._buildToggleOptions = M(
      (e, t) => this._buildOptions("toggle", e, t)
    ), this._memoizedClassesForArea = M(
      (e, t, i, s, o, n) => this._classesForArea(e, t, i, s, o, n)
    ), this.filterValueSelector = {
      attributes: { object: {} },
      area: { area: {} },
      device: { device: {} },
      entity_id: { entity: {} },
      entity_category: {
        select: { options: ["config", "diagnostic"], mode: "dropdown" }
      },
      floor: { floor: {} },
      group: { entity: { filter: { domain: "group" } } },
      hidden_by: {
        select: { options: ["user", "integration"], mode: "dropdown" }
      },
      integration: { config_entry: {} },
      label: { label: {} }
    }, this._groupDrafts = /* @__PURE__ */ new Set(), this._addRuleset = () => {
      this.rulesets = [
        ...this.rulesets,
        { group_id: "", group_icon: "", rules: [{ key: "", value: "" }] }
      ];
    }, this._removeRuleset = (e) => {
      this.rulesets = this.rulesets.filter((t, i) => i !== e), this._updateConfigFromRulesets();
    }, this._toggleEntityHidden = (e) => {
      var s;
      const t = new Set(((s = this._config) == null ? void 0 : s.hidden_entities) ?? []);
      t.has(e) ? t.delete(e) : t.add(e);
      const i = Array.from(t);
      this._config = {
        ...this._config || {},
        hidden_entities: i
      }, P(this, "config-changed", { config: { ...this._config } });
    };
  }
  setConfig(e) {
    this._config = {
      ...e,
      columns: e.columns ?? 4,
      hide_person: e.hide_person ?? !1,
      list_mode: e.list_mode ?? !1,
      hide_content_name: e.hide_content_name ?? !1,
      customization: e.customization ?? []
    }, Array.isArray(this._config.content) && (this._config = {
      ...this._config,
      content: this._config.content.map(
        (t) => this._normalizeContentEntry(t)
      )
    }), this._loadRulesetsFromConfig();
  }
  _updateAreaFloorInConfig() {
    if (!this._config || !this._config.filter) return;
    this._config.filter === "area" && this._config.floor !== void 0 ? (delete this._config.floor, P(this, "config-changed", { config: { ...this._config } })) : this._config.filter === "floor" && this._config.area !== void 0 && (delete this._config.area, P(this, "config-changed", { config: { ...this._config } }));
  }
  async updated(e) {
    super.updated(e);
    let t = !1;
    if (!(!this.hass || !this._config) && e.has("_config")) {
      if (this._updateAreaFloorInConfig(), (this._config.label_filter === !1 && this._config.label !== void 0 || Array.isArray(this._config.label) && this._config.label.length === 0) && (delete this._config.label, t = !0), this._config.hide_filter && !["entity", "label", "area"].includes(this._config.hide_filter)) {
        const p = (/* @__PURE__ */ new Map([
          [this.computeLabel({ name: "entity" }), "entity"],
          [this.computeLabel({ name: "label" }), "label"],
          [this.computeLabel({ name: "area" }), "area"]
        ])).get(this._config.hide_filter);
        p && (this._config = { ...this._config, hide_filter: p }, t = !0);
      }
      const i = e.get("_config"), s = (i == null ? void 0 : i.extra_entities) ?? [], o = this._config.extra_entities ?? [], n = (i == null ? void 0 : i.content) ?? [], a = this._config.content ?? [], c = Array.isArray(this._config.area) ? [...this._config.area] : this._config.area ? [this._config.area] : [], r = Array.isArray(this._config.floor) ? [...this._config.floor] : this._config.floor ? [this._config.floor] : [], l = Array.isArray(this._config.label) ? [...this._config.label] : [];
      this._filterInitialized || (this._lastFilter = {
        area: c,
        floor: r,
        label: l
      }, this._filterInitialized = !0);
      const d = this._lastFilter.area, h = this._lastFilter.floor, f = this._lastFilter.label, u = !J(f, l), m = !J(h, r);
      if (!J(d, c) || m || u) {
        const _ = this.possibleToggleDomains, p = [];
        for (const C of Object.keys(F)) {
          const L = F[C];
          for (const v of Object.keys(L))
            v !== "on" && v !== "off" && p.push(`${C} - ${v}`);
          p.push(C);
        }
        const b = _.map((C) => this._normalizeContentEntry(C)).sort((C, L) => {
          const v = p.indexOf(C), V = p.indexOf(L);
          return (v === -1 ? p.length : v) - (V === -1 ? p.length : V);
        });
        this._config = {
          ...this._config,
          content: [...b]
        }, this._lastFilter = {
          area: [...c],
          floor: [...r],
          label: [...l]
        }, t = !0;
      }
      if (this._config.rulesets && Array.isArray(this._config.rulesets)) {
        const _ = this._config.rulesets.filter(
          (L) => Object.keys(L).some(
            (v) => v !== "group_id" && v !== "group_icon" && v !== "group_status" && L[v] !== void 0 && L[v] !== ""
          )
        ).map((L) => L.group_id).filter((L) => L && L.length > 1);
        let p = Array.isArray(this._config.content) ? [...this._config.content] : [];
        p = p.filter((L) => !_.includes(L));
        const b = this._config.extra_entities ?? [];
        let C = 0;
        for (let L = 0; L < p.length; L++) {
          if (!b.includes(p[L])) {
            C = L;
            break;
          }
          C = L + 1;
        }
        p = [
          ...p.slice(0, C),
          ..._.filter((L) => !p.includes(L)),
          ...p.slice(C)
        ], J(p, this._config.content ?? []) || (this._config = {
          ...this._config,
          content: p
        }, t = !0);
      }
      if (!J(s, o)) {
        let _ = [...a];
        o.forEach((p) => {
          _.includes(p) || _.unshift(p);
        }), _ = _.filter(
          (p) => !p.includes(".") || o.includes(p)
        ), J(_, a) || (this._config = {
          ...this._config,
          content: _
        }, t = !0);
      }
      if (!J(n, a)) {
        let _ = [...o];
        _ = _.filter((p) => a.includes(p)), J(_, o) || (this._config = {
          ...this._config,
          extra_entities: _
        }, t = !0);
      }
      t && (P(this, "config-changed", { config: { ...this._config } }), this.requestUpdate());
    }
  }
  getGroupSchema(e) {
    return [
      {
        name: "group_id",
        selector: { text: {} }
      },
      {
        name: "group_icon",
        selector: { icon: {} }
      },
      {
        name: "group_status",
        selector: { text: {} }
      },
      ...e.rules.map((t, i) => {
        const s = e.rules.map((n, a) => a !== i ? n.key : null).filter((n) => n), o = this.ruleKeySelector.options.filter(
          ([n]) => !s.includes(n) || n === t.key
        );
        return {
          type: "grid",
          schema: [
            {
              type: "select",
              name: `key_${i}`,
              options: o
            },
            {
              name: `value_${i}`,
              selector: this.filterValueSelector[t.key] ?? { text: {} }
            }
          ]
        };
      })
    ];
  }
  _valueChanged(e) {
    const t = e.detail.value;
    Array.isArray(t == null ? void 0 : t.content) && (t.content = t.content.map(
      (i) => this._normalizeContentEntry(i)
    )), this._config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config }
      })
    );
  }
  get possibleToggleDomains() {
    var e, t, i;
    return this._memoizedClassesForArea(
      ((e = this._config) == null ? void 0 : e.area) || [],
      ((t = this._config) == null ? void 0 : t.floor) || [],
      ((i = this._config) == null ? void 0 : i.label) || [],
      this.hass.entities,
      this.hass.devices,
      this.hass.areas
    );
  }
  get toggleSelectOptions() {
    var e;
    return this._buildToggleOptions(
      this.possibleToggleDomains,
      ((e = this._config) == null ? void 0 : e.content) || []
    );
  }
  get contentSelectOptions() {
    const e = this._config.content ?? [];
    return this._buildOptions("toggle", e, e);
  }
  _parseTypePair(e) {
    const t = e.match(/^(.+?)\s*-\s*(.+)$/);
    if (!t) return null;
    const i = t[1].toLowerCase().replace(/\s+/g, "_"), s = t[2].toLowerCase();
    return { domain: i, deviceClass: s };
  }
  _normalizeContentEntry(e) {
    if (e.includes(".")) return e;
    const t = this._parseTypePair(e);
    if (t) {
      const { domain: s, deviceClass: o } = t;
      return F[s] || X.includes(s) ? `${s} - ${o}` : e;
    }
    const i = e.trim().toLowerCase().replace(/\s+/g, "_");
    return F[i] || X.includes(i) ? i : e;
  }
  _labelForTypePair(e) {
    var i, s, o;
    if (e.includes(".")) {
      const n = (s = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : s[e];
      return ((o = n == null ? void 0 : n.attributes) == null ? void 0 : o.friendly_name) || e;
    }
    const t = this._parseTypePair(e);
    if (t) {
      const { domain: n, deviceClass: a } = t;
      if (n === "switch" && a === "switch") {
        const l = this.hass.localize(
          "component.switch.entity_component._.name"
        );
        return `${l} - ${l}`;
      }
      const c = this.hass.localize(`component.${n}.entity_component._.name`) || n, r = this.hass.localize(
        `ui.dialogs.entity_registry.editor.device_classes.${n}.${a}`
      ) || a;
      return `${c} - ${r}`;
    }
    return e === "scene" ? "Scene" : this.hass.localize(`component.${e}.entity_component._.name`) || e;
  }
  _classesForArea(e, t, i, s, o, n) {
    var f;
    const a = ((f = this._config) == null ? void 0 : f.extra_entities) || [], c = H1(
      s,
      o,
      n,
      this.hass.states,
      { area: e, floor: t, label: i },
      X
    ), r = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set();
    for (const u in c) {
      if (!Object.prototype.hasOwnProperty.call(c, u))
        continue;
      const m = c[u];
      ["binary_sensor", "cover", "switch"].includes(u) ? m.forEach((y) => {
        const _ = y.attributes.device_class;
        _ && l.add(`${u} - ${_}`);
      }) : r.add(u);
    }
    const d = [];
    for (const u of Object.keys(F)) {
      const m = F[u];
      for (const y of Object.keys(m))
        y !== "on" && y !== "off" && d.push(`${u} - ${y}`);
      d.push(u);
    }
    const h = [...l];
    return [...r, ...h, ...a].sort(
      (u, m) => {
        const y = d.indexOf(u), _ = d.indexOf(m);
        return (y === -1 ? d.length : y) - (_ === -1 ? d.length : _);
      }
    );
  }
  _buildOptions(e, t, i) {
    var c;
    const s = [.../* @__PURE__ */ new Set([...t, ...i])], o = ((c = this.hass) == null ? void 0 : c.states) || {}, n = /* @__PURE__ */ new Map(), a = s.map((r) => {
      var d, h;
      if (n.has(r))
        return { value: r, label: n.get(r) };
      let l;
      return r.includes(".") ? l = ((h = (d = o[r]) == null ? void 0 : d.attributes) == null ? void 0 : h.friendly_name) || r : r === "scene" ? l = "Scene" : l = this._labelForTypePair(r), n.set(r, l), { value: r, label: l };
    });
    return a.sort((r, l) => {
      const d = r.value.includes("."), h = l.value.includes(".");
      return d && !h ? -1 : !d && h ? 1 : I1(
        r.label,
        l.label,
        this.hass.locale.language
      );
    }), a;
  }
  _itemChanged(e, t, i) {
    if (e.stopPropagation(), !this._config || !this.hass)
      return;
    const s = t == null ? void 0 : t.index;
    if (s != null) {
      const o = [...this._config.customization ?? []];
      o[s] = e.detail, P(this, "config-changed", {
        config: { ...this._config, customization: o }
      });
    }
  }
  _editItem(e, t) {
    if (e.stopPropagation(), !this._config || !this.hass)
      return;
    const i = e.detail;
    this[`_subElementEditor${t}`] = { index: i };
  }
  _edit_itemDomain(e) {
    const t = e.detail, s = (this._config.customization ?? [])[t];
    let o;
    s && s.type && s.type.includes(".") ? o = "Entity" : o = "Domain", this._editItem(e, o);
  }
  _itemChangedDomain(e) {
    this._itemChanged(e, this._subElementEditorDomain, "customization");
  }
  _itemChangedEntity(e) {
    this._itemChanged(e, this._subElementEditorEntity, "customization");
  }
  _renderSubElementEditorDomain() {
    return this._renderSubElementEditor(
      "domain",
      this._goBackDomain,
      this._itemChangedDomain
    );
  }
  _renderSubElementEditorEntity() {
    return this._renderSubElementEditor(
      "entity",
      this._goBackEntity,
      this._itemChangedEntity
    );
  }
  _goBackDomain() {
    this._subElementEditorDomain = void 0;
  }
  _goBackEntity() {
    this._subElementEditorEntity = void 0;
  }
  _renderSubElementEditor(e, t, i) {
    var r, l, d, h, f, u, m;
    const s = `_subElementEditor${e.charAt(0).toUpperCase() + e.slice(1)}`, o = this[s], n = ((d = (l = (r = this._config) == null ? void 0 : r.customization) == null ? void 0 : l[(o == null ? void 0 : o.index) ?? 0]) == null ? void 0 : d.type) ?? "unknown", a = this._labelForTypePair(n), c = ((f = (h = this._config) == null ? void 0 : h.rulesets) == null ? void 0 : f.some((y) => y.group_id === n)) ?? !1;
    return g`
      <div class="header">
        <div class="back-title">
          <ha-icon-button
            slot="trigger"
            .label=${this.hass.localize("ui.common.back")}
            .path=${Ui}
            @click=${t}
          ></ha-icon-button>
          <span slot="title">${a}</span>
        </div>
      </div>
      <status-card-item-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .config=${((m = (u = this._config) == null ? void 0 : u.customization) == null ? void 0 : m[(o == null ? void 0 : o.index) ?? 0]) ?? {}}
        .getSchema=${e}
        .index=${(o == null ? void 0 : o.index) ?? 0}
        .isGroup=${c}
        @config-changed=${i}
      >
      </status-card-item-editor>
    `;
  }
  _customizationChanged(e, t) {
    e.stopPropagation(), !(!this._config || !this.hass) && P(this, "config-changed", {
      config: {
        ...this._config,
        customization: e.detail
      }
    });
  }
  _customizationChangedDomain(e) {
    this._customizationChanged(e, "domain");
  }
  _loadRulesetsFromConfig() {
    this.rulesets = (this._config.rulesets ?? []).map((e) => {
      var i;
      const t = Object.keys(e).filter(
        (s) => s !== "group_id" && s !== "group_icon" && s !== "group_status" && e[s] !== void 0
      ).map((s) => ({
        key: s,
        value: e[s] ?? ""
      }));
      return (t.length === 0 || ((i = t[t.length - 1]) == null ? void 0 : i.key) !== "") && t.push({ key: "", value: "" }), {
        group_id: e.group_id ?? "",
        group_icon: e.group_icon ?? "",
        group_status: e.group_status ?? "",
        rules: t
      };
    }), this._groupPreviousIds.clear(), this.rulesets.forEach(
      (e, t) => this._groupPreviousIds.set(t, e.group_id || "")
    );
  }
  _commitRulesets() {
    var n;
    const e = this.rulesets.map((a) => {
      const c = a.rules.reduce((r, l) => (l.key && l.key !== "" && (r[l.key] = l.value ?? ""), r), {});
      return {
        group_id: a.group_id ?? "",
        group_icon: a.group_icon ?? "",
        group_status: a.group_status ?? "",
        ...c
      };
    }), t = Array.isArray((n = this._config) == null ? void 0 : n.content) ? [...this._config.content] : [], i = /* @__PURE__ */ new Map();
    e.forEach((a, c) => {
      const r = a.group_id ?? "", l = this._groupPreviousIds.get(c) ?? "";
      l && l !== r && i.set(l, r);
    });
    const s = /* @__PURE__ */ new Set(), o = [];
    for (const a of t) {
      const c = i.get(a) ?? a;
      s.has(c) || (s.add(c), o.push(c));
    }
    this._config = {
      ...this._config,
      rulesets: e,
      content: o
    }, this._groupPreviousIds.clear(), e.forEach(
      (a, c) => this._groupPreviousIds.set(c, a.group_id ?? "")
    ), P(this, "config-changed", {
      config: this._config
    });
  }
  _updateConfigFromRulesets() {
    this._commitRulesets();
  }
  get ruleKeySelector() {
    const e = [
      [
        "area",
        this.hass.localize("ui.components.selectors.selector.types.area")
      ],
      [
        "attributes",
        this.hass.localize("ui.components.selectors.selector.types.attribute")
      ],
      [
        "device",
        this.hass.localize("ui.components.selectors.selector.types.device")
      ],
      [
        "domain",
        this.hass.localize("ui.panel.lovelace.editor.cardpicker.domain")
      ],
      [
        "entity_category",
        this.hass.localize("ui.components.category-picker.category")
      ],
      [
        "entity_id",
        this.hass.localize("ui.dialogs.entity_registry.editor.entity_id")
      ],
      ["floor", this.hass.localize("ui.components.floor-picker.floor")],
      ["group", this.hass.localize("component.group.entity_component._.name")],
      ["hidden_by", "Hidden by"],
      [
        "integration",
        this.hass.localize("ui.components.related-items.integration")
      ],
      ["label", this.hass.localize("ui.components.label-picker.label")],
      [
        "last_changed",
        this.hass.localize("ui.components.state-content-picker.last_changed")
      ],
      [
        "last_triggered",
        this.hass.localize(
          "component.automation.entity_component._.state_attributes.last_triggered.name"
        )
      ],
      [
        "last_updated",
        this.hass.localize("ui.components.state-content-picker.last_updated")
      ],
      ["device_manufacturer", "Manufacturer"],
      ["device_model", "Model"],
      ["name", this.hass.localize("ui.common.name")],
      [
        "state",
        this.hass.localize("ui.components.selectors.selector.types.state")
      ]
    ];
    return e.sort((t, i) => t[1].localeCompare(i[1], this.hass.locale.language)), {
      type: "select",
      options: e
    };
  }
  _groupFormData(e) {
    const t = {
      group_id: e.group_id,
      group_icon: e.group_icon,
      group_status: e.group_status ?? ""
    };
    return e.rules.forEach((i, s) => {
      t[`key_${s}`] = i.key, t[`value_${s}`] = i.value;
    }), t;
  }
  _groupValueChanged(e, t) {
    var l;
    const { value: i } = e.detail, s = this.rulesets[t] ?? {
      group_id: "",
      group_icon: "",
      group_status: "",
      rules: []
    }, o = this._groupFormData(s), n = { ...o, ...i }, a = Object.keys(n).filter((d) => d.startsWith("key_")).sort((d, h) => {
      const f = parseInt(d.split("_")[1], 10), u = parseInt(h.split("_")[1], 10);
      return f - u;
    }).map((d) => {
      const h = d.split("_")[1];
      return {
        key: n[`key_${h}`] ?? "",
        value: n[`value_${h}`] ?? ""
      };
    });
    (a.length === 0 || ((l = a[a.length - 1]) == null ? void 0 : l.key) !== "") && a.push({ key: "", value: "" });
    const c = {
      group_id: n.group_id ?? "",
      group_icon: n.group_icon ?? "",
      group_status: n.group_status ?? "",
      rules: a
    };
    if (this.rulesets = this.rulesets.map(
      (d, h) => h === t ? c : d
    ), !Object.keys(n).some((d) => d === "group_id" ? !1 : n[d] !== o[d])) {
      this._groupDrafts.add(t);
      return;
    }
    this._groupDrafts.delete(t), this._updateConfigFromRulesets();
  }
  _groupFormBlur(e) {
    this._groupDrafts.has(e) && (this._groupDrafts.delete(e), this._updateConfigFromRulesets());
  }
  _groupAllEntitiesByDomain() {
    var h, f, u, m, y, _, p, b, C, L;
    const e = this.hass.entities || {}, t = this.hass.devices || {}, i = this.hass.areas || {}, s = {
      area: Array.isArray((h = this._config) == null ? void 0 : h.area) ? this._config.area : (f = this._config) != null && f.area ? [this._config.area] : [],
      floor: Array.isArray((u = this._config) == null ? void 0 : u.floor) ? this._config.floor : (m = this._config) != null && m.floor ? [this._config.floor] : [],
      label: Array.isArray((y = this._config) == null ? void 0 : y.label) ? this._config.label : [],
      hiddenAreas: ((_ = this._config) == null ? void 0 : _.hidden_areas) ?? [],
      hiddenLabels: ((p = this._config) == null ? void 0 : p.hidden_labels) ?? [],
      hiddenEntities: ((b = this._config) == null ? void 0 : b.hidden_entities) ?? []
    }, o = H1(
      e,
      t,
      i,
      ((C = this.hass) == null ? void 0 : C.states) || {},
      s,
      [...X, "person"]
    ), n = Object.values(this.hass.states).filter(
      (v) => I(v.entity_id) === "person"
    );
    if (n.length > 0) {
      const v = o.person || [], V = new Set(v.map((x) => x.entity_id)), S = n.filter(
        (x) => !V.has(x.entity_id)
      );
      o.person = [...v, ...S];
    }
    const a = Object.fromEntries(
      Object.entries(o).map(([v, V]) => [
        v,
        V.map((S) => S.entity_id)
      ])
    ), c = this._hiddenEntitiesByDomain(), r = ((L = this.hass) == null ? void 0 : L.states) || {}, l = Array.from(
      /* @__PURE__ */ new Set([...Object.keys(a), ...Object.keys(c)])
    ).filter((v) => [...X, "person"].includes(v)), d = Pt(
      r,
      this.hass.locale.language
    );
    return l.sort((v, V) => v.localeCompare(V)).map((v) => {
      const V = /* @__PURE__ */ new Set([
        ...a[v] || [],
        ...c[v] || []
      ]);
      return { domain: v, entities: Array.from(V).sort(d) };
    });
  }
  _domainLabel(e) {
    var t, i;
    return ((i = (t = this.hass) == null ? void 0 : t.localize) == null ? void 0 : i.call(t, `component.${e}.entity_component._.name`)) || e;
  }
  _isHiddenEntity(e) {
    var i;
    const t = ((i = this._config) == null ? void 0 : i.hidden_entities) ?? [];
    return Array.isArray(t) && t.includes(e);
  }
  _getDeviceClassLabel(e, t) {
    if (!t || t === "other")
      return this.hass.localize("ui.dialogs.helper_settings.generic.other") ?? "Other";
    const i = `ui.dialogs.entity_registry.editor.device_classes.${e}.${t}`;
    return this.hass.localize(i) || t;
  }
  _groupByDeviceClass(e, t) {
    var a, c, r;
    const i = ((a = this.hass) == null ? void 0 : a.states) || {}, s = {};
    for (const l of t) {
      const d = ((r = (c = i[l]) == null ? void 0 : c.attributes) == null ? void 0 : r.device_class) || "";
      d && (s[d] || (s[d] = []), s[d].push(l));
    }
    const o = Pt(
      i,
      this.hass.locale.language
    );
    return Object.keys(s).sort((l, d) => l.localeCompare(d)).map((l) => ({
      deviceClass: l,
      label: this._getDeviceClassLabel(e, l),
      entities: s[l].slice().sort(o)
    }));
  }
  _hiddenEntitiesByDomain() {
    var h, f, u, m, y;
    const e = {}, t = Array.isArray((h = this._config) == null ? void 0 : h.hidden_entities) ? this._config.hidden_entities : [];
    if (t.length === 0) return e;
    const i = this.hass.entities || {}, s = this.hass.devices || {}, o = (f = this.hass) != null && f.areas ? Object.values(this.hass.areas) : [], n = (u = this._config) == null ? void 0 : u.area, a = (m = this._config) == null ? void 0 : m.floor, c = (y = this._config) == null ? void 0 : y.label, r = n ? Array.isArray(n) ? n : [n] : [], l = a ? Array.isArray(a) ? a : [a] : [], d = c ? Array.isArray(c) ? c : [c] : [];
    for (const _ of t) {
      const p = I(_);
      if (![...X, "person"].includes(p)) continue;
      const b = i[_], C = b != null && b.device_id ? s[b.device_id] : void 0;
      if (((b == null ? void 0 : b.area_id) != null || (C == null ? void 0 : C.area_id) != null) && !(d.length && !(Array.isArray(b == null ? void 0 : b.labels) && b.labels.some((V) => d.includes(V)) || Array.isArray(C == null ? void 0 : C.labels) && C.labels.some((V) => d.includes(V)))) && !(r.length && !(b != null && b.area_id && r.includes(b.area_id) || C != null && C.area_id && r.includes(C.area_id)))) {
        if (l.length) {
          const v = (b == null ? void 0 : b.area_id) && o.some(
            (S) => S.area_id === b.area_id && S.floor_id && l.includes(S.floor_id)
          ), V = (C == null ? void 0 : C.area_id) && o.some(
            (S) => S.area_id === C.area_id && S.floor_id && l.includes(S.floor_id)
          );
          if (!v && !V) continue;
        }
        e[p] || (e[p] = []), e[p].push(_);
      }
    }
    return e;
  }
  _domainIcon(e, t = "on", i) {
    const s = F;
    if (e in s) {
      const o = s[e];
      if (typeof o == "string") return o;
      if (i && o[i]) {
        const n = o[i];
        return typeof n == "string" ? n : n[t === "off" ? "off" : "on"] || n.on;
      }
      return o[t === "off" ? "off" : "on"] || o.on;
    }
    return as;
  }
  _handleTabSelected(e) {
    e.detail.name && (this._activeTab = e.detail.name);
  }
  render() {
    var s, o;
    if (!this.hass || !this._config)
      return g`<div>Loading...</div>`;
    const e = this._schema(
      this._activeTab,
      this._config.filter ?? "",
      this._config.label_filter ?? !1,
      this._config.multiple_areas ?? !1,
      this._config.multiple_floors ?? !1,
      this._config.badge_mode ?? !1
    ), i = {
      content: this.possibleToggleDomains,
      ...this._config
    };
    return this._subElementEditorDomain ? this._renderSubElementEditorDomain() : this._subElementEditorEntity ? this._renderSubElementEditorEntity() : g`
      <ha-tab-group
        .hass=${this.hass}
        id="tab-group"
        @wa-tab-show=${this._handleTabSelected}
      >
        <ha-tab-group-tab
          slot="nav"
          panel="config"
          .active=${this._activeTab === "config"}
        >
          ${this.hass.localize("ui.panel.lovelace.editor.edit_card.tab_config")}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          slot="nav"
          panel="appearance"
          .active=${this._activeTab === "appearance"}
        >
          ${this.hass.localize("ui.panel.lovelace.editor.card.map.appearance")}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          slot="nav"
          panel="actions"
          .active=${this._activeTab === "actions"}
        >
          ${this.hass.localize("ui.panel.lovelace.editor.card.generic.actions")}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          slot="nav"
          panel="style"
          .active=${this._activeTab === "style"}
        >
          Style
        </ha-tab-group-tab>
      </ha-tab-group>

      ${this._activeTab === "style" ? g`
            <ha-alert alert-type="info" title="Style Guide">
              <p>
                You can use standard CSS per identifier. <br />
                <strong>Identifiers:</strong>
              </p>
              <ul>
                <li><b>card</b>: Card Container (Background, Border)</li>
                <li><b>button</b>: Item Container (Background, Border)</li>
                <li><b>icon</b>: Item Icon</li>
                <li><b>name</b>: Entity Name</li>
                <li><b>state</b>: Entity State Value</li>
              </ul>
              <p>
                <strong>Animations:</strong> <br />
                spin, pulse, shake, blink, bounce
              </p>
              <p><strong>Example:</strong></p>
              <pre>
card:
  background-color: rgba(255, 0, 0, 0.1);
  border: none;              
icon:
  animation: spin 2s linear infinite;
  --mdc-icon-size: 40px;
  color: var(--primary-color);
name:
  font-size: 15px;  
              </pre
              >
            </ha-alert>
          ` : ""}

      <ha-form
        .hass=${this.hass}
        .data=${i}
        .schema=${e}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      ${this._activeTab === "config" ? g`
            <ha-expansion-panel outlined class="main">
              <div slot="header" role="heading" aria-level="3">
                <ha-svg-icon
                  class="secondary"
                  .path=${f1}
                ></ha-svg-icon>
                ${this.hass.localize(
      "ui.panel.lovelace.editor.card.entities.name"
    ) ?? "Entities"}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${i}
                  .schema=${this._entitiesSchema(
      ((s = this._config) == null ? void 0 : s.hide_filter) ?? ""
    )}
                  .computeLabel=${this.computeLabel}
                  @value-changed=${this._valueChanged}
                ></ha-form>

                ${(((o = this._config) == null ? void 0 : o.hide_filter) ?? "") === "entity" ? g`
                      ${this._groupAllEntitiesByDomain().map(
      (n) => g`
                          <ha-expansion-panel outlined class="domain-panel">
                            <div slot="header" class="domain-header">
                              <ha-svg-icon
                                .path=${this._domainIcon(n.domain, "on")}
                              ></ha-svg-icon>
                              <span class="domain-title"
                                >${this._domainLabel(n.domain)}</span
                              >
                            </div>
                            <div class="content">
                              ${["binary_sensor", "cover"].includes(
        n.domain
      ) ? this._groupByDeviceClass(
        n.domain,
        n.entities
      ).map(
        (a) => g`
                                      <ha-expansion-panel
                                        outlined
                                        class="domain-panel"
                                      >
                                        <div slot="header" class="dc-header">
                                          <ha-svg-icon
                                            .path=${this._domainIcon(
          n.domain,
          "on",
          a.deviceClass
        )}
                                          ></ha-svg-icon>
                                          <span class="dc-title"
                                            >${a.label}</span
                                          >
                                        </div>
                                        <div class="content">
                                          ${a.entities.map(
          (c) => {
            var r, l;
            return g`
                                              <div class="entity-row">
                                                <span class="entity-name">
                                                  ${((l = (r = this.hass.states[c]) == null ? void 0 : r.attributes) == null ? void 0 : l.friendly_name) || c}
                                                </span>
                                                <ha-icon-button
                                                  .path=${this._isHiddenEntity(
              c
            ) ? Je : Ye}
                                                  .label=${this._isHiddenEntity(
              c
            ) ? this.hass.localize(
              "ui.common.show"
            ) ?? "Show" : this.hass.localize(
              "ui.common.hide"
            ) ?? "Hide"}
                                                  @click=${() => this._toggleEntityHidden(
              c
            )}
                                                ></ha-icon-button>
                                              </div>
                                            `;
          }
        )}
                                        </div>
                                      </ha-expansion-panel>
                                    `
      ) : n.entities.map(
        (a) => {
          var c, r;
          return g`
                                      <div class="entity-row">
                                        <span class="entity-name">
                                          ${((r = (c = this.hass.states[a]) == null ? void 0 : c.attributes) == null ? void 0 : r.friendly_name) || a}
                                        </span>
                                        <ha-icon-button
                                          .path=${this._isHiddenEntity(a) ? Je : Ye}
                                          .label=${this._isHiddenEntity(a) ? this.hass.localize(
            "ui.common.show"
          ) ?? "Show" : this.hass.localize(
            "ui.common.hide"
          ) ?? "Hide"}
                                          @click=${() => this._toggleEntityHidden(a)}
                                        ></ha-icon-button>
                                      </div>
                                    `;
        }
      )}
                            </div>
                          </ha-expansion-panel>
                        `
    )}
                    ` : g``}
              </div>
            </ha-expansion-panel>

            <ha-expansion-panel outlined class="main">
              <div slot="header" role="heading" aria-level="3">
                <ha-svg-icon
                  class="secondary"
                  .path=${es}
                ></ha-svg-icon>
                Smart Groups
              </div>
              <div class="content">
                ${this.rulesets.map(
      (n, a) => g`
                    <ha-expansion-panel class="group-panel main" outlined>
                      <div slot="header" class="group-header">
                        ${n.group_id ? n.group_id : `${this.hass.localize(
        "component.group.entity_component._.name"
      )} ${a + 1}`}
                        <span class="group-actions">
                          <ha-icon-button
                            slot="trigger"
                            .label=${this.hass.localize("ui.common.remove")}
                            .path=${_e}
                            @click=${() => this._removeRuleset(a)}
                          ></ha-icon-button>
                        </span>
                      </div>
                      <div class="content">
                        <ha-form
                          .hass=${this.hass}
                          .data=${this._groupFormData(n)}
                          .schema=${this.getGroupSchema(n)}
                          .computeLabel=${this.computeLabel}
                          @value-changed=${(c) => this._groupValueChanged(c, a)}
                          @focusout=${() => this._groupFormBlur(a)}
                        ></ha-form>
                      </div>
                    </ha-expansion-panel>
                  `
    )}
                <div class="add-group-row">
                  <ha-button raised @click=${this._addRuleset}>
                    ${this.hass.localize("ui.common.add")}
                  </ha-button>
                </div>
              </div>
            </ha-expansion-panel>

            <ha-expansion-panel outlined class="main">
              <div slot="header" role="heading" aria-level="3">
                <ha-svg-icon
                  class="secondary"
                  .path=${f1}
                ></ha-svg-icon>
                ${this.computeLabel.bind(this)({ name: "edit_domains_dc" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${i}
                  .schema=${this._toggleschema(this.toggleSelectOptions)}
                  .computeLabel=${this.computeLabel}
                  @value-changed=${this._valueChanged}
                ></ha-form>
                <status-items-editor
                  .hass=${this.hass}
                  .customization=${this._config.customization}
                  .SelectOptions=${this.contentSelectOptions}
                  @edit-item=${this._edit_itemDomain}
                  @config-changed=${this._customizationChangedDomain}
                >
                </status-items-editor>
              </div>
            </ha-expansion-panel>
          ` : ""}
    `;
  }
  static get styles() {
    return mt`
      .secondary {
        color: var(--secondary-text-color);
      }
      .main {
        --ha-card-border-radius: 6px;
        margin-top: 24px;
      }
      .content {
        margin: 10px 0px;
      }
      .title {
        font-size: 18px;
      }
      .back-title {
        display: flex;
        align-items: center;
        font-size: 18px;
        gap: 0.5em;
      }
      ha-icon {
        display: flex;
      }
      ha-tab-group {
        display: block;
        margin-bottom: 16px;
        padding: 0 1em;
      }
      ha-tab-group-tab {
        flex: 1;
      }
      ha-tab-group-tab::part(base) {
        width: 100%;
        justify-content: center;
      }
      .header {
        margin-bottom: 0.5em;
      }
      .group-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .group-actions {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .add-group-row {
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
      }
      .entity-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 4px 0;
      }
      .entity-name {
        flex: 1 1 auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .domain-panel {
        margin-top: 6px;
      }
      .domain-header {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .domain-header ha-icon {
        --mdc-icon-size: 20px;
      }
      .dc-header {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .dc-header ha-icon {
        --mdc-icon-size: 20px;
      }
    `;
  }
};
st([
  $({ attribute: !1 })
], Y.prototype, "hass", 2);
st([
  $({ attribute: !1 })
], Y.prototype, "lovelace", 2);
st([
  $({ type: Object })
], Y.prototype, "_config", 2);
st([
  H()
], Y.prototype, "_subElementEditorDomain", 2);
st([
  H()
], Y.prototype, "_subElementEditorEntity", 2);
st([
  H()
], Y.prototype, "rulesets", 2);
st([
  H()
], Y.prototype, "_activeTab", 2);
Y = st([
  Gt("status-card-editor")
], Y);
console.info(
  `%c STATUS-CARD %c ${q1.version} `,
  "color: steelblue; background: black; font-weight: bold;",
  "color: white ; background: dimgray; font-weight: bold;"
);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "status-card",
  name: "Status Card",
  preview: !0,
  description: "A custom card that displays active entities grouped by domain/device class."
});
window.customBadges = window.customBadges || [];
window.customBadges.push({
  type: "status-card",
  name: "Status Card",
  preview: !0,
  description: "A custom card that displays active entities grouped by domain/device class."
});
