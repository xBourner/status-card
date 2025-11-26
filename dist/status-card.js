const Me = "v3.1", He = {
  version: Me
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const St = globalThis, Kt = St.ShadowRoot && (St.ShadyCSS === void 0 || St.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Wt = Symbol(), re = /* @__PURE__ */ new WeakMap();
let Ce = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Wt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Kt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = re.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && re.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Pe = (i) => new Ce(typeof i == "string" ? i : i + "", void 0, Wt), pt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce(((s, o, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[n + 1]), i[0]);
  return new Ce(e, i, Wt);
}, Ie = (i, t) => {
  if (Kt) i.adoptedStyleSheets = t.map(((e) => e instanceof CSSStyleSheet ? e : e.styleSheet));
  else for (const e of t) {
    const s = document.createElement("style"), o = St.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = e.cssText, i.appendChild(s);
  }
}, ce = Kt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Pe(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: je, defineProperty: Fe, getOwnPropertyDescriptor: Re, getOwnPropertyNames: Be, getOwnPropertySymbols: Ne, getPrototypeOf: Ue } = Object, et = globalThis, le = et.trustedTypes, qe = le ? le.emptyScript : "", jt = et.reactiveElementPolyfillSupport, vt = (i, t) => i, zt = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? qe : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, Zt = (i, t) => !je(i, t), de = { attribute: !0, type: String, converter: zt, reflect: !1, useDefault: !1, hasChanged: Zt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), et.litPropertyMetadata ?? (et.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ft = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = de) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(t, s, e);
      o !== void 0 && Fe(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: o, set: n } = Re(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: o, set(a) {
      const c = o == null ? void 0 : o.call(this);
      n == null || n.call(this, a), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? de;
  }
  static _$Ei() {
    if (this.hasOwnProperty(vt("elementProperties"))) return;
    const t = Ue(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(vt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(vt("properties"))) {
      const e = this.properties, s = [...Be(e), ...Ne(e)];
      for (const o of s) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, o] of e) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const o = this._$Eu(e, s);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const o of s) e.unshift(ce(o));
    } else t !== void 0 && e.push(ce(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise(((e) => this.enableUpdating = e)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach(((e) => e(this)));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ie(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach(((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    }));
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach(((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    }));
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var n;
    const s = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, s);
    if (o !== void 0 && s.reflect === !0) {
      const a = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : zt).toAttribute(e, s.type);
      this._$Em = t, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, a;
    const s = this.constructor, o = s._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const c = s.getPropertyOptions(o), r = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : zt;
      this._$Em = o;
      const l = r.fromAttribute(e, c.type);
      this[o] = l ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    var o;
    if (t !== void 0) {
      const n = this.constructor, a = this[t];
      if (s ?? (s = n.getPropertyOptions(t)), !((s.hasChanged ?? Zt)(a, e) || s.useDefault && s.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: o, wrapped: n }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
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
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach(((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
      })), this.update(e)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach(((s) => {
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
    this._$Eq && (this._$Eq = this._$Eq.forEach(((e) => this._$ET(e, this[e])))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
ft.elementStyles = [], ft.shadowRootOptions = { mode: "open" }, ft[vt("elementProperties")] = /* @__PURE__ */ new Map(), ft[vt("finalized")] = /* @__PURE__ */ new Map(), jt == null || jt({ ReactiveElement: ft }), (et.reactiveElementVersions ?? (et.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bt = globalThis, kt = bt.trustedTypes, he = kt ? kt.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Se = "$lit$", Q = `lit$${Math.random().toFixed(9).slice(2)}$`, xe = "?" + Q, Ve = `<${xe}>`, lt = document, wt = () => lt.createComment(""), At = (i) => i === null || typeof i != "object" && typeof i != "function", Jt = Array.isArray, Ge = (i) => Jt(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", Ft = `[ 	
\f\r]`, gt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ue = /-->/g, fe = />/g, nt = RegExp(`>|${Ft}(?:([^\\s"'>=/]+)(${Ft}*=${Ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), me = /'/g, pe = /"/g, ze = /^(?:script|style|textarea|title)$/i, Ke = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), $ = Ke(1), G = Symbol.for("lit-noChange"), z = Symbol.for("lit-nothing"), _e = /* @__PURE__ */ new WeakMap(), rt = lt.createTreeWalker(lt, 129);
function ke(i, t) {
  if (!Jt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return he !== void 0 ? he.createHTML(t) : t;
}
const We = (i, t) => {
  const e = i.length - 1, s = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = gt;
  for (let c = 0; c < e; c++) {
    const r = i[c];
    let l, d, h = -1, u = 0;
    for (; u < r.length && (a.lastIndex = u, d = a.exec(r), d !== null); ) u = a.lastIndex, a === gt ? d[1] === "!--" ? a = ue : d[1] !== void 0 ? a = fe : d[2] !== void 0 ? (ze.test(d[2]) && (o = RegExp("</" + d[2], "g")), a = nt) : d[3] !== void 0 && (a = nt) : a === nt ? d[0] === ">" ? (a = o ?? gt, h = -1) : d[1] === void 0 ? h = -2 : (h = a.lastIndex - d[2].length, l = d[1], a = d[3] === void 0 ? nt : d[3] === '"' ? pe : me) : a === pe || a === me ? a = nt : a === ue || a === fe ? a = gt : (a = nt, o = void 0);
    const f = a === nt && i[c + 1].startsWith("/>") ? " " : "";
    n += a === gt ? r + Ve : h >= 0 ? (s.push(l), r.slice(0, h) + Se + r.slice(h) + Q + f) : r + Q + (h === -2 ? c : f);
  }
  return [ke(i, n + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Et {
  constructor({ strings: t, _$litType$: e }, s) {
    let o;
    this.parts = [];
    let n = 0, a = 0;
    const c = t.length - 1, r = this.parts, [l, d] = We(t, e);
    if (this.el = Et.createElement(l, s), rt.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = rt.nextNode()) !== null && r.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(Se)) {
          const u = d[a++], f = o.getAttribute(h).split(Q), m = /([.?@])?(.*)/.exec(u);
          r.push({ type: 1, index: n, name: m[2], strings: f, ctor: m[1] === "." ? Je : m[1] === "?" ? Xe : m[1] === "@" ? Ye : Ot }), o.removeAttribute(h);
        } else h.startsWith(Q) && (r.push({ type: 6, index: n }), o.removeAttribute(h));
        if (ze.test(o.tagName)) {
          const h = o.textContent.split(Q), u = h.length - 1;
          if (u > 0) {
            o.textContent = kt ? kt.emptyScript : "";
            for (let f = 0; f < u; f++) o.append(h[f], wt()), rt.nextNode(), r.push({ type: 2, index: ++n });
            o.append(h[u], wt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === xe) r.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(Q, h + 1)) !== -1; ) r.push({ type: 7, index: n }), h += Q.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = lt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function mt(i, t, e = i, s) {
  var a, c;
  if (t === G) return t;
  let o = s !== void 0 ? (a = e._$Co) == null ? void 0 : a[s] : e._$Cl;
  const n = At(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((c = o == null ? void 0 : o._$AO) == null || c.call(o, !1), n === void 0 ? o = void 0 : (o = new n(i), o._$AT(i, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = o : e._$Cl = o), o !== void 0 && (t = mt(i, o._$AS(i, t.values), o, s)), t;
}
let Ze = class {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? lt).importNode(e, !0);
    rt.currentNode = o;
    let n = rt.nextNode(), a = 0, c = 0, r = s[0];
    for (; r !== void 0; ) {
      if (a === r.index) {
        let l;
        r.type === 2 ? l = new _t(n, n.nextSibling, this, t) : r.type === 1 ? l = new r.ctor(n, r.name, r.strings, this, t) : r.type === 6 && (l = new Qe(n, this, t)), this._$AV.push(l), r = s[++c];
      }
      a !== (r == null ? void 0 : r.index) && (n = rt.nextNode(), a++);
    }
    return rt.currentNode = lt, o;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
};
class _t {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, o) {
    this.type = 2, this._$AH = z, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = mt(this, t, e), At(t) ? t === z || t == null || t === "" ? (this._$AH !== z && this._$AR(), this._$AH = z) : t !== this._$AH && t !== G && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ge(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== z && At(this._$AH) ? this._$AA.nextSibling.data = t : this.T(lt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Et.createElement(ke(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(e);
    else {
      const a = new Ze(o, this), c = a.u(this.options);
      a.p(e), this.T(c), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = _e.get(t.strings);
    return e === void 0 && _e.set(t.strings, e = new Et(t)), e;
  }
  k(t) {
    Jt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, o = 0;
    for (const n of t) o === e.length ? e.push(s = new _t(this.O(wt()), this.O(wt()), this, this.options)) : s = e[o], s._$AI(n), o++;
    o < e.length && (this._$AR(s && s._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const o = t.nextSibling;
      t.remove(), t = o;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class Ot {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, o, n) {
    this.type = 1, this._$AH = z, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = z;
  }
  _$AI(t, e = this, s, o) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = mt(this, t, e, 0), a = !At(t) || t !== this._$AH && t !== G, a && (this._$AH = t);
    else {
      const c = t;
      let r, l;
      for (t = n[0], r = 0; r < n.length - 1; r++) l = mt(this, c[s + r], e, r), l === G && (l = this._$AH[r]), a || (a = !At(l) || l !== this._$AH[r]), l === z ? t = z : t !== z && (t += (l ?? "") + n[r + 1]), this._$AH[r] = l;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === z ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Je extends Ot {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === z ? void 0 : t;
  }
}
class Xe extends Ot {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== z);
  }
}
class Ye extends Ot {
  constructor(t, e, s, o, n) {
    super(t, e, s, o, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = mt(this, t, e, 0) ?? z) === G) return;
    const s = this._$AH, o = t === z && s !== z || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== z && (s === z || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Qe {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    mt(this, t);
  }
}
const ti = { I: _t }, Rt = bt.litHtmlPolyfillSupport;
Rt == null || Rt(Et, _t), (bt.litHtmlVersions ?? (bt.litHtmlVersions = [])).push("3.3.1");
const ei = (i, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = o = new _t(t.insertBefore(wt(), n), n, void 0, e ?? {});
  }
  return o._$AI(i), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct = globalThis;
let V = class extends ft {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ei(e, this.renderRoot, this.renderOptions);
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
    return G;
  }
};
var Ee;
V._$litElement$ = !0, V.finalized = !0, (Ee = ct.litElementHydrateSupport) == null || Ee.call(ct, { LitElement: V });
const Bt = ct.litElementPolyfillSupport;
Bt == null || Bt({ LitElement: V });
(ct.litElementVersions ?? (ct.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer((() => {
    customElements.define(i, t);
  })) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ii = { attribute: !0, type: String, converter: zt, reflect: !1, hasChanged: Zt }, si = (i = ii, t, e) => {
  const { kind: s, metadata: o } = e;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), n.set(e.name, i), s === "accessor") {
    const { name: a } = e;
    return { set(c) {
      const r = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(a, r, i);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, i, c), c;
    } };
  }
  if (s === "setter") {
    const { name: a } = e;
    return function(c) {
      const r = this[a];
      t.call(this, c), this.requestUpdate(a, r, i);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function E(i) {
  return (t, e) => typeof e == "object" ? si(i, t, e) : ((s, o, n) => {
    const a = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, s), a ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function O(i) {
  return E({ ...i, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xt = { ATTRIBUTE: 1, CHILD: 2 }, Lt = (i) => (...t) => ({ _$litDirective$: i, values: t });
let Mt = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: oi } = ti, ge = () => document.createComment(""), yt = (i, t, e) => {
  var n;
  const s = i._$AA.parentNode, o = t === void 0 ? i._$AB : t._$AA;
  if (e === void 0) {
    const a = s.insertBefore(ge(), o), c = s.insertBefore(ge(), o);
    e = new oi(a, c, i, i.options);
  } else {
    const a = e._$AB.nextSibling, c = e._$AM, r = c !== i;
    if (r) {
      let l;
      (n = e._$AQ) == null || n.call(e, i), e._$AM = i, e._$AP !== void 0 && (l = i._$AU) !== c._$AU && e._$AP(l);
    }
    if (a !== o || r) {
      let l = e._$AA;
      for (; l !== a; ) {
        const d = l.nextSibling;
        s.insertBefore(l, o), l = d;
      }
    }
  }
  return e;
}, at = (i, t, e = i) => (i._$AI(t, e), i), ni = {}, ai = (i, t = ni) => i._$AH = t, ri = (i) => i._$AH, Nt = (i) => {
  i._$AR(), i._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ye = (i, t, e) => {
  const s = /* @__PURE__ */ new Map();
  for (let o = t; o <= e; o++) s.set(i[o], o);
  return s;
}, tt = Lt(class extends Mt {
  constructor(i) {
    if (super(i), i.type !== Xt.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(i, t, e) {
    let s;
    e === void 0 ? e = t : t !== void 0 && (s = t);
    const o = [], n = [];
    let a = 0;
    for (const c of i) o[a] = s ? s(c, a) : a, n[a] = e(c, a), a++;
    return { values: n, keys: o };
  }
  render(i, t, e) {
    return this.dt(i, t, e).values;
  }
  update(i, [t, e, s]) {
    const o = ri(i), { values: n, keys: a } = this.dt(t, e, s);
    if (!Array.isArray(o)) return this.ut = a, n;
    const c = this.ut ?? (this.ut = []), r = [];
    let l, d, h = 0, u = o.length - 1, f = 0, m = n.length - 1;
    for (; h <= u && f <= m; ) if (o[h] === null) h++;
    else if (o[u] === null) u--;
    else if (c[h] === a[f]) r[f] = at(o[h], n[f]), h++, f++;
    else if (c[u] === a[m]) r[m] = at(o[u], n[m]), u--, m--;
    else if (c[h] === a[m]) r[m] = at(o[h], n[m]), yt(i, r[m + 1], o[h]), h++, m--;
    else if (c[u] === a[f]) r[f] = at(o[u], n[f]), yt(i, o[h], o[u]), u--, f++;
    else if (l === void 0 && (l = ye(a, f, m), d = ye(c, h, u)), l.has(c[h])) if (l.has(c[u])) {
      const y = d.get(a[f]), p = y !== void 0 ? o[y] : null;
      if (p === null) {
        const _ = yt(i, o[h]);
        at(_, n[f]), r[f] = _;
      } else r[f] = at(p, n[f]), yt(i, o[h], p), o[y] = null;
      f++;
    } else Nt(o[u]), u--;
    else Nt(o[h]), h++;
    for (; f <= m; ) {
      const y = yt(i, r[m + 1]);
      at(y, n[f]), r[f++] = y;
    }
    for (; h <= u; ) {
      const y = o[h++];
      y !== null && Nt(y);
    }
    return this.ut = a, ai(i, r), G;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = Lt(class extends Mt {
  constructor(i) {
    var t;
    if (super(i), i.type !== Xt.ATTRIBUTE || i.name !== "class" || ((t = i.strings) == null ? void 0 : t.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(i) {
    return " " + Object.keys(i).filter(((t) => i[t])).join(" ") + " ";
  }
  update(i, [t]) {
    var s, o;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), i.strings !== void 0 && (this.nt = new Set(i.strings.join(" ").split(/\s/).filter(((n) => n !== ""))));
      for (const n in t) t[n] && !((s = this.nt) != null && s.has(n)) && this.st.add(n);
      return this.render(t);
    }
    const e = i.element.classList;
    for (const n of this.st) n in t || (e.remove(n), this.st.delete(n));
    for (const n in t) {
      const a = !!t[n];
      a === this.st.has(n) || (o = this.nt) != null && o.has(n) || (a ? (e.add(n), this.st.add(n)) : (e.remove(n), this.st.delete(n)));
    }
    return G;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const De = "important", ci = " !" + De, J = Lt(class extends Mt {
  constructor(i) {
    var t;
    if (super(i), i.type !== Xt.ATTRIBUTE || i.name !== "style" || ((t = i.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(i) {
    return Object.keys(i).reduce(((t, e) => {
      const s = i[e];
      return s == null ? t : t + `${e = e.includes("-") ? e : e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }), "");
  }
  update(i, [t]) {
    const { style: e } = i.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const s of this.ft) t[s] == null && (this.ft.delete(s), s.includes("-") ? e.removeProperty(s) : e[s] = null);
    for (const s in t) {
      const o = t[s];
      if (o != null) {
        this.ft.add(s);
        const n = typeof o == "string" && o.endsWith(ci);
        s.includes("-") || n ? e.setProperty(s, n ? o.slice(0, -11) : o, n ? De : "") : e[s] = o;
      }
    }
    return G;
  }
});
var ve = Number.isNaN || function(t) {
  return typeof t == "number" && t !== t;
};
function li(i, t) {
  return !!(i === t || ve(i) && ve(t));
}
function di(i, t) {
  if (i.length !== t.length)
    return !1;
  for (var e = 0; e < i.length; e++)
    if (!li(i[e], t[e]))
      return !1;
  return !0;
}
function A(i, t) {
  t === void 0 && (t = di);
  var e = null;
  function s() {
    for (var o = [], n = 0; n < arguments.length; n++)
      o[n] = arguments[n];
    if (e && e.lastThis === this && t(o, e.lastArgs))
      return e.lastResult;
    var a = i.apply(this, o);
    return e = {
      lastResult: a,
      lastArgs: o,
      lastThis: this
    }, a;
  }
  return s.clear = function() {
    e = null;
  }, s;
}
var hi = "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z", Yt = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", ui = "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z", be = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z", $e = "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z", fi = "M17 14V17H14V19H17V22H19V19H22V17H19V14M20 11V12.3C19.4 12.1 18.7 12 18 12C16.8 12 15.6 12.4 14.7 13H7V11H20M12.1 17H7V15H12.8C12.5 15.6 12.2 16.3 12.1 17M7 7H20V9H7V7M5 19H7V21H3V3H7V5H5V19Z", mi = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", pi = "M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z", we = "M10 19.11L12.11 17H7V15H14V15.12L16.12 13H7V11H17V12.12L18.24 10.89C18.72 10.41 19.35 10.14 20.04 10.14C20.37 10.14 20.7 10.21 21 10.33V5C21 3.89 20.1 3 19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.9 21 5 21H10V19.11M7 7H17V9H7V7M21.7 14.35L20.7 15.35L18.65 13.3L19.65 12.3C19.86 12.09 20.21 12.09 20.42 12.3L21.7 13.58C21.91 13.79 21.91 14.14 21.7 14.35M12 19.94L18.06 13.88L20.11 15.93L14.06 22H12V19.94Z", _i = "M17 6H7c-3.31 0-6 2.69-6 6s2.69 6 6 6h10c3.31 0 6-2.69 6-6s-2.69-6-6-6zm0 10H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h10c2.21 0 4 1.79 4 4s-1.79 4-4 4zM7 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z";
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
], gi = (i, t, e, s, o) => {
  var h, u, f, m, y;
  const n = e || (t == null ? void 0 : t.theme), a = (t == null ? void 0 : t.darkMode) || !1;
  i.__themes || (i.__themes = { cacheKey: null, keys: /* @__PURE__ */ new Set() });
  let c = n || "", r = {};
  if (n === "default" && ((h = i.__themes) == null ? void 0 : h.cacheKey) === "default")
    return;
  if (n && n !== "default" && ((u = t == null ? void 0 : t.themes) != null && u[n])) {
    const { modes: p, ..._ } = t.themes[n] || {};
    r = { ...r, ..._ }, p && (a && p.dark ? r = { ...r, ...p.dark } : !a && p.light && (r = { ...r, ...p.light }));
  } else if (!n && (!((f = i.__themes) != null && f.keys) || i.__themes.keys.size === 0))
    return;
  const l = ((m = i.__themes) == null ? void 0 : m.keys) || /* @__PURE__ */ new Set(), d = new Set(Object.keys(r));
  if (n === "default" && d.size === 0) {
    for (const p of l)
      try {
        i.style.removeProperty(`--${p}`);
      } catch {
      }
    i.__themes = { cacheKey: "default", keys: /* @__PURE__ */ new Set() };
    return;
  }
  if (((y = i.__themes) == null ? void 0 : y.cacheKey) === c) {
    let p = !0;
    if (l.size !== d.size)
      p = !1;
    else
      for (const _ of l)
        if (!d.has(_)) {
          p = !1;
          break;
        }
    if (p) return;
  }
  for (const p of l)
    if (!d.has(p))
      try {
        i.style.removeProperty(`--${p}`);
      } catch {
      }
  for (const [p, _] of Object.entries(r))
    i.style.setProperty(`--${p}`, String(_));
  i.__themes.cacheKey = c || null, i.__themes.keys = d;
}, T = (i, t, e, s) => {
  s = s || {}, e = e ?? {};
  const o = new Event(t, {
    bubbles: s.bubbles === void 0 ? !0 : s.bubbles,
    cancelable: !!s.cancelable,
    composed: s.composed === void 0 ? !0 : s.composed
  });
  return o.detail = e, i.dispatchEvent(o), o;
}, R = (i) => i.substr(0, i.indexOf("."));
A(
  (i) => new Intl.Collator(i)
);
const yi = A(
  (i) => new Intl.Collator(i, { sensitivity: "accent" })
), vi = (i, t) => i < t ? -1 : i > t ? 1 : 0, Oe = (i, t, e = void 0) => Intl != null && Intl.Collator ? yi(e).compare(i, t) : vi(i.toLowerCase(), t.toLowerCase()), xt = (i, t) => {
  if (i === t)
    return !0;
  if (i && t && typeof i == "object" && typeof t == "object") {
    if (i.constructor !== t.constructor)
      return !1;
    let e, s;
    if (Array.isArray(i)) {
      if (s = i.length, s !== t.length)
        return !1;
      for (e = s; e-- !== 0; )
        if (!xt(i[e], t[e]))
          return !1;
      return !0;
    }
    if (i instanceof Map && t instanceof Map) {
      if (i.size !== t.size)
        return !1;
      for (e of i.entries())
        if (!t.has(e[0]))
          return !1;
      for (e of i.entries())
        if (!xt(e[1], t.get(e[0])))
          return !1;
      return !0;
    }
    if (i instanceof Set && t instanceof Set) {
      if (i.size !== t.size)
        return !1;
      for (e of i.entries())
        if (!t.has(e[0]))
          return !1;
      return !0;
    }
    if (ArrayBuffer.isView(i) && ArrayBuffer.isView(t)) {
      if (s = i.length, s !== t.length)
        return !1;
      for (e = s; e-- !== 0; )
        if (i[e] !== t[e])
          return !1;
      return !0;
    }
    if (i.constructor === RegExp)
      return i.source === t.source && i.flags === t.flags;
    if (i.valueOf !== Object.prototype.valueOf)
      return i.valueOf() === t.valueOf();
    if (i.toString !== Object.prototype.toString)
      return i.toString() === t.toString();
    const o = Object.keys(i);
    if (s = o.length, s !== Object.keys(t).length)
      return !1;
    for (e = s; e-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, o[e]))
        return !1;
    for (e = s; e-- !== 0; ) {
      const n = o[e];
      if (!xt(i[n], t[n]))
        return !1;
    }
    return !0;
  }
  return i !== i && t !== t;
};
class bi extends HTMLElement {
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
  bind(t, e = {}) {
    t.actionHandler && xt(e, t.actionHandler.options) || (t.actionHandler && (t.removeEventListener("touchstart", t.actionHandler.start), t.removeEventListener("touchend", t.actionHandler.end), t.removeEventListener("touchcancel", t.actionHandler.end), t.removeEventListener("mousedown", t.actionHandler.start), t.removeEventListener("click", t.actionHandler.end), t.removeEventListener(
      "keydown",
      t.actionHandler.handleKeyDown
    )), t.actionHandler = { options: e }, !e.disabled && (t.actionHandler.start = (s) => {
      this.cancelled = !1, s.touches ? (s.touches[0].clientX, s.touches[0].clientY) : (s.clientX, s.clientY), e.hasHold && (this.held = !1, this.timer = window.setTimeout(() => {
        this.held = !0;
      }, this.holdTime));
    }, t.actionHandler.end = (s) => {
      if (s.currentTarget !== s.target || s.type === "touchcancel" || s.type === "touchend" && this.cancelled)
        return;
      const o = s.target;
      s.cancelable && s.preventDefault(), e.hasHold && (clearTimeout(this.timer), this.timer = void 0), e.hasHold && this.held ? T(o, "action", { action: "hold" }) : e.hasDoubleClick ? s.type === "click" && s.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, T(o, "action", { action: "tap" });
      }, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, T(o, "action", { action: "double_tap" })) : T(o, "action", { action: "tap" });
    }, t.actionHandler.handleKeyDown = (s) => {
      ["Enter", " "].includes(s.key) && s.currentTarget.actionHandler.end(s);
    }, t.addEventListener("touchstart", t.actionHandler.start, {
      passive: !0
    }), t.addEventListener("touchend", t.actionHandler.end), t.addEventListener("touchcancel", t.actionHandler.end), t.addEventListener("mousedown", t.actionHandler.start, {
      passive: !0
    }), t.addEventListener("click", t.actionHandler.end), t.addEventListener("keydown", t.actionHandler.handleKeyDown)));
  }
}
customElements.define("action-handler-status-card", bi);
const $i = () => {
  const i = document.body;
  if (i.querySelector("action-handler-status-card"))
    return i.querySelector(
      "action-handler-status-card"
    );
  const t = document.createElement("action-handler-status-card");
  return i.appendChild(t), t;
}, wi = (i, t) => {
  const e = $i();
  e && e.bind(i, t);
}, Ct = Lt(
  class extends Mt {
    update(i, [t]) {
      return wi(i.element, t), G;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(i) {
    }
  }
), Ai = async (i, t, e, s) => {
  T(i, "hass-action", { config: e, action: s });
};
function ut(i) {
  return i !== void 0 && i.action !== "none";
}
const q = {
  alarm_control_panel: { on: "mdi:alarm-light", off: "mdi:alarm-light-off" },
  siren: { on: "mdi:bell-ring", off: "mdi:bell_off" },
  lock: { on: "mdi:lock-open", off: "mdi:lock" },
  light: { on: "mdi:lightbulb", off: "mdi:lightbulb-off" },
  media_player: { on: "mdi:cast", off: "mdi:cast-off" },
  climate: { on: "mdi:thermostat", off: "mdi:thermostat-cog" },
  humidifier: { on: "mdi:air-humidifier", off: "mdi:air-humidifier-off" },
  switch: {
    on: "mdi:toggle-switch",
    off: "mdi:toggle-switch-off",
    switch: { on: "mdi:toggle-switch", off: "mdi:toggle-switch-off" },
    outlet: { on: "mdi:power-plug", off: "mdi:power-plug-off" }
  },
  vacuum: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-off" },
  lawn_mower: { on: "robot-mower", off: "mdi:robot-mower" },
  fan: { on: "mdi:fan", off: "mdi:fan-off" },
  cover: {
    on: "mdi:garage-open",
    off: "mdi:garage",
    garage: { on: "mdi:garage-open", off: "mdi:garage" },
    door: { on: "mdi:door-open", off: "mdi:door-closed" },
    gate: { on: "mdi:gate-open", off: "mdi:gate" },
    blind: { on: "mdi:blinds-open", off: "mdi:blinds" },
    curtain: { on: "mdi:curtains", off: "mdi:curtains-closed" },
    damper: { on: "mdi:valve-open", off: "mdi:valve-closed" },
    awning: { on: "mdi:awning-outline", off: "mdi:awning-outline" },
    shutter: { on: "mdi:window-shutter-open", off: "mdi:window-shutter" },
    shade: { on: "mdi:roller-shade", off: "mdi:roller-shade-closed" },
    window: { on: "mdi:window-open", off: "mdi:window-closed" }
  },
  binary_sensor: {
    on: "mdi:power-off",
    off: "mdi:power-off",
    motion: { on: "mdi:motion-sensor", off: "mdi:motion-sensor-off" },
    moisture: { on: "mdi:water-alert", off: "mdi:water-off" },
    window: { on: "mdi:window-open", off: "mdi:window-closed" },
    door: { on: "mdi:door-open", off: "mdi:door-closed" },
    lock: { on: "mdi:lock-open", off: "mdi:lock" },
    presence: { on: "mdi:home-outline", off: "mdi:home-export-outline" },
    occupancy: { on: "mdi:seat", off: "mdi:seat-outline" },
    vibration: { on: "mdi:vibrate", off: "mdi:vibrate-off" },
    opening: { on: "mdi:shield-lock-open", off: "mdi:shield-lock" },
    garage_door: { on: "mdi:garage-open", off: "mdi:garage" },
    problem: {
      on: "mdi:alert-circle-outline",
      off: "mdi:alert-circle-check-outline"
    },
    smoke: {
      on: "mdi:smoke-detector-outline",
      off: "mdi:smoke-detector-off-outline"
    },
    running: { on: "mdi:play", off: "mdi:pause" },
    plug: { on: "mdi:power-plug", off: "mdi:power-plug-off" },
    power: { on: "mdi:power", off: "mdi:power-off" },
    battery: { on: "mdi:battery-alert", off: "mdi:battery" },
    battery_charging: { on: "mdi:battery-charging", off: "mdi:battery-check" },
    gas: { on: "mdi:gas-station-outline", off: "mdi:gas-station-off-outline" },
    carbon_monoxide: { on: "mdi:molecule-co", off: "mdi:molecule-co" },
    cold: { on: "mdi:snowflake", off: "mdi:snowflake-off" },
    heat: { on: "mdi:weather-sunny", off: "mdi:weather-sunny-off" },
    connectivity: { on: "mdi:connection", off: "mdi:connection" },
    safety: { on: "mdi:shield-alert-outline", off: "mdi:shield-check-outline" },
    sound: { on: "mdi:volume-high", off: "mdi:volume-off" },
    update: { on: "mdi:autorenew", off: "mdi:autorenew-off" },
    tamper: { on: "mdi:shield-home", off: "mdi:shield-home" },
    light: { on: "mdi:lightbulb-outline", off: "mdi:lightbulb-off-outline" },
    moving: { on: "mdi:car", off: "mdi:car-off" }
  },
  person: { on: "mdi:account", off: "mdi:account-off" },
  device_tracker: { on: "mdi:account", off: "mdi:account-off" },
  valve: { on: "mdi:valve", off: "mdi:valve-closed" },
  water_heater: { on: "mdi:water-boiler", off: "mdi:water-pump-off" },
  remote: { on: "mdi:remote", off: "mdi:remote-off" },
  update: { on: "mdi:autorenew", off: "mdi:autorenew-off" },
  air_quality: { on: "mdi:air-filter", off: "mdi:air-filter" },
  camera: { on: "mdi:camera", off: "mdi:camera-off" },
  calendar: { on: "mdi:calendar", off: "mdi:calendar-remove" },
  scene: { on: "mdi:movie", off: "mdi:movie-off" },
  notifications: { on: "mdi:bell", off: "mdi:bell-off" },
  sensor: { on: "mdi:gauge", off: "mdi:gauge" },
  script: { on: "mdi:script-text", off: "mdi:script-text" },
  tags: { on: "mdi:tag-multiple", off: "mdi:tag-multiple" },
  select: { on: "mdi:format-list-bulleted", off: "mdi:format-list-bulleted" },
  automation: { on: "mdi:robot", off: "mdi:robot-off" },
  button: { on: "mdi:gesture-tap-button", off: "mdi:gesture-tap-button" },
  number: { on: "mdi:numeric", off: "mdi:numeric" },
  conversation: { on: "mdi:comment-multiple", off: "mdi:comment-multiple" },
  assist_satellite: {
    on: "mdi:satellite-variant",
    off: "mdi:satellite-variant"
  },
  counter: { on: "mdi:counter", off: "mdi:counter" },
  event: { on: "mdi:calendar-star", off: "mdi:calendar-star" },
  group: {
    on: "mdi:google-circles-communities",
    off: "mdi:google-circles-communities"
  },
  image: { on: "mdi:image", off: "mdi:image-off" },
  image_processing: {
    on: "mdi:image-filter-center-focus",
    off: "mdi:image-filter-center-focus"
  },
  input_boolean: { on: "mdi:toggle-switch", off: "mdi:toggle-switch-off" },
  input_datetime: { on: "mdi:calendar-clock", off: "mdi:calendar-clock" },
  input_number: { on: "mdi:numeric", off: "mdi:numeric" },
  input_select: {
    on: "mdi:format-list-bulleted",
    off: "mdi:format-list-bulleted"
  },
  input_text: { on: "mdi:text-box", off: "mdi:text-box" },
  stt: { on: "mdi:record-rec", off: "mdi:record" },
  sun: { on: "mdi:weather-sunny", off: "mdi:weather-night" },
  text: { on: "mdi:text-box", off: "mdi:text-box" },
  date: { on: "mdi:calendar", off: "mdi:calendar-remove" },
  datetime: { on: "mdi:calendar-clock", off: "mdi:calendar-clock" },
  time: { on: "mdi:clock-outline", off: "mdi:clock-off" },
  timer: { on: "mdi:timer-outline", off: "mdi:timer-off" },
  todo: {
    on: "mdi:check-circle-outline",
    off: "mdi:checkbox-blank-circle-outline"
  },
  tts: { on: "mdi:volume-high", off: "mdi:volume-off" },
  wake_word: { on: "mdi:microphone", off: "mdi:microphone-off" },
  weather: { on: "mdi:weather-partly-cloudy", off: "mdi:weather-night" },
  zone: { on: "mdi:map-marker", off: "mdi:map-marker-off" },
  geo_location: { on: "mdi:map-marker", off: "mdi:map-marker-off" }
}, Y = [
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
], Ei = {
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
};
function Te(i, t, e, s, o, n) {
  const a = o.area && o.area.length ? o.area : null, c = o.floor && o.floor.length ? o.floor : null, r = o.label && o.label.length ? o.label : null, l = o.hiddenAreas || [], d = o.hiddenLabels || [], h = o.hiddenEntities || [], u = new Set(l), f = new Set(d), m = new Set(h), y = new Map(Object.values(t).map((b) => [b.id, b])), p = new Map(
    Object.values(e).map((b) => [
      b.area_id,
      b.floor_id
    ])
  ), _ = Object.values(i).filter((b) => {
    var x, k, L;
    const g = b.entity_id.split(".")[0];
    if (!n.includes(g)) return !1;
    if (g === "update")
      return !b.hidden;
    const v = b.device_id ? y.get(b.device_id) : void 0;
    if (!(b.area_id != null || v && v.area_id != null) || r && !((((x = b.labels) == null ? void 0 : x.some((K) => r.includes(K))) ?? !1) || (((k = v == null ? void 0 : v.labels) == null ? void 0 : k.some((K) => r.includes(K))) ?? !1)) || a && !(b.area_id !== void 0 && b.area_id !== null && a.includes(b.area_id) || v && v.area_id !== void 0 && v.area_id !== null && a.includes(v.area_id)))
      return !1;
    if (c) {
      const N = b.area_id ? p.get(b.area_id) : void 0, K = v != null && v.area_id ? p.get(v.area_id) : void 0;
      if (!(N && c.includes(N) || K && c.includes(K))) return !1;
    }
    return u.size && (b.area_id && u.has(b.area_id) || v && v.area_id && u.has(v.area_id)) || (L = b.labels) != null && L.some((N) => f.has(N)) || m.has(b.entity_id) ? !1 : !b.hidden;
  }).map((b) => b.entity_id), C = {};
  for (const b of _) {
    const g = b.split(".")[0], v = s[b];
    v && (C[g] || (C[g] = [])).push(v);
  }
  return C;
}
function H(i, t) {
  return t ? `${i} - ${t}` : i;
}
function Ae(i, t) {
  var e, s;
  return ((s = (e = i == null ? void 0 : i[t]) == null ? void 0 : e.attributes) == null ? void 0 : s.friendly_name) || t;
}
function Dt(i, t) {
  return (e, s) => Oe(
    Ae(i, e),
    Ae(i, s),
    t
  );
}
function X(i, t) {
  if (i === t) return !0;
  if (!Array.isArray(i) || !Array.isArray(t) || i.length !== t.length) return !1;
  const e = new Set(t);
  for (const s of i)
    if (!e.has(s)) return !1;
  return !0;
}
function F(i, t, e) {
  return i.localize(
    `component.${e}.entity_component._.state.${t}`
  ) || t;
}
function Ht(i, t, e, s) {
  if (/^key_\d+$/.test(t.name))
    return i.localize("ui.components.related-filter-menu.filter") || "Filter";
  switch (t.name) {
    case "header":
      return e && s ? e === "switch" && s === "switch" ? `${i.localize(
        "ui.panel.lovelace.editor.card.entities.name"
      )} in ${i.localize("component.switch.entity_component._.name")}` : `${i.localize(
        "ui.panel.lovelace.editor.card.entities.name"
      )} in ${i.localize(
        `ui.dialogs.entity_registry.editor.device_classes.${e}.${s}`
      )}` : e ? `${i.localize(
        "ui.panel.lovelace.editor.card.entities.name"
      )} in ${i.localize(`component.${e}.entity_component._.name`)}` : i.localize("ui.panel.lovelace.editor.card.entities.name");
    case "square":
      return i.localize("ui.panel.lovelace.editor.card.grid.square");
    case "hide_person_name":
      return i.localize("ui.common.hide") + " " + i.localize("component.person.entity_component._.name") + " " + i.localize("ui.common.name");
    case "hide_content_name":
      return i.localize("ui.common.hide") + " " + i.localize("ui.panel.lovelace.editor.card.markdown.content") + " " + i.localize("ui.common.name");
    case "hide_person":
      return i.localize("ui.common.hide") + " " + i.localize("component.person.entity_component._.name");
    case "list_mode":
      return i.localize("ui.card.common.turn_on") + " " + i.localize("ui.components.media-browser.list") + " " + i.localize("ui.dialogs.helper_settings.input_text.mode");
    case "columns":
      return i.localize(
        "ui.panel.lovelace.editor.action-editor.actions.more-info"
      ) + " " + i.localize("ui.panel.lovelace.editor.card.grid.columns");
    case "edit_filters":
      return i.localize("ui.panel.lovelace.editor.common.edit") + " " + i.localize("ui.components.subpage-data-table.filters");
    case "area":
      return i.localize("ui.panel.lovelace.editor.card.area.name");
    case "floor":
      return i.localize("ui.components.selectors.selector.types.floor");
    case "label_filter":
      return i.localize("ui.components.label-picker.label") + " " + i.localize("ui.components.related-filter-menu.filter");
    case "label":
    case "hidden_labels":
      return i.localize("ui.components.label-picker.label");
    case "entities":
      return i.localize("ui.panel.lovelace.editor.card.entities.name");
    case "extra_entities":
      return "Extra " + i.localize("ui.panel.lovelace.editor.card.entities.name");
    case "entity":
      return i.localize("ui.components.selectors.selector.types.entity");
    case "hide_filter":
      return i.localize("ui.common.hide") + " " + i.localize("ui.panel.lovelace.editor.card.entities.name");
    case "edit_domains_dc":
      return i.localize("ui.panel.lovelace.editor.common.edit") + " " + i.localize("ui.panel.lovelace.editor.card.markdown.content");
    case "icon":
      return i.localize("ui.components.selectors.selector.types.icon");
    case "color":
      return i.localize("ui.panel.lovelace.editor.card.tile.color");
    case "background_color":
      return i.localize("ui.panel.lovelace.editor.card.generic.icon") + " " + i.localize("ui.panel.lovelace.editor.edit_view.tab_background") + " " + i.localize("ui.panel.lovelace.editor.card.tile.color");
    case "multiple_areas":
      return "Multi " + i.localize("ui.panel.lovelace.editor.card.area.name");
    case "multiple_floors":
      return "Multi " + i.localize("ui.components.selectors.selector.types.floor");
    case "show_total_number":
      return i.localize("ui.common.enable") + " " + i.localize(
        "component.sensor.entity_component._.state_attributes.state_class.state.total"
      ) + " " + i.localize("component.number.entity_component._.name");
    case "show_total_entities":
      return i.localize("ui.common.enable") + " " + i.localize(
        "component.sensor.entity_component._.state_attributes.state_class.state.total"
      ) + " " + i.localize("ui.panel.lovelace.editor.card.entities.name");
    case "appearance":
      return i.localize("ui.panel.lovelace.editor.card.tile.appearance") || "Appearance";
    case "tap_action":
    case "hold_action":
    case "double_tap_action":
      return i.localize(
        `ui.panel.lovelace.editor.card.generic.${t.name}`
      );
    case "popup_card":
      return "Change Popup Card Type";
    case "group_id":
      return i.localize("component.group.entity_component._.name") + " " + i.localize("ui.common.name");
    case "group_icon":
      return i.localize("component.group.entity_component._.name") + " " + i.localize("ui.panel.lovelace.editor.card.generic.icon");
    case "group_status":
      return i.localize("component.group.entity_component._.name") + " " + i.localize("ui.components.selectors.selector.types.state") + " (" + i.localize("ui.panel.lovelace.editor.card.config.optional") + ")";
    case "hide":
      return i.localize("ui.common.hide");
    case "state":
      return i.localize("ui.components.entity.entity-state-picker.state");
    case "invert":
    case "invert_state":
      return i.localize("ui.dialogs.entity_registry.editor.invert.label");
    case "show_entity_picture":
      return i.localize(
        "ui.panel.lovelace.editor.card.tile.show_entity_picture"
      );
    case "name":
      return i.localize("ui.common.name");
    case "no_scroll":
      return i.localize(
        "ui.panel.lovelace.editor.edit_view_header.settings.badges_wrap_options.wrap"
      ) + " " + i.localize("ui.panel.lovelace.editor.card.generic.content");
    case "popup":
      return "Popup";
    case "ungroup_areas":
      return i.localize("ui.common.disable") + " " + i.localize("ui.panel.lovelace.editor.card.area.name") + " " + i.localize("component.group.entity_component._.name");
    case "popup_sort":
      return "Popup Sort";
    case "state_content":
      return i.localize("ui.panel.lovelace.editor.card.tile.state_content");
    case "hide_card_if_empty":
      return i.localize("ui.common.hide") + " Status Card if empty";
    default:
      if (Y.includes(t.name))
        return i.localize(`component.${t.name}.entity_component._.name`) || t.name;
      for (const [o, n] of Object.entries(Ei))
        if (n.includes(t.name))
          return i.localize(
            `ui.dialogs.entity_registry.editor.device_classes.${o}.${t.name}`
          ) || t.name;
      return i.localize(
        `ui.panel.lovelace.editor.card.area.${t.name}`
      );
  }
}
function Ut(i, t, e) {
  return i.callWS({ type: `config/${t}_registry/list` }).then((s) => s.reduce((o, n) => {
    const a = n[e];
    return (typeof a == "string" || typeof a == "number") && (o[String(a)] = n), o;
  }, {}));
}
const Ci = A(
  (i = []) => new Map(i.map((t) => [t.entity_id, t]))
), Si = A(
  (i = []) => new Map(i.map((t) => [t.id, t]))
), xi = A(
  (i = []) => new Map(i.map((t) => [t.area_id, t]))
), zi = A(
  (i, t, e, s, o, n, a) => {
    let c = [];
    Array.isArray(t.filters) ? c = t.filters : [
      "area",
      "floor",
      "label",
      "domain",
      "entity_id",
      "state",
      "name",
      "attributes",
      "device",
      "integration",
      "entity_category",
      "hidden_by",
      "device_manufacturer",
      "device_model",
      "last_changed",
      "last_updated",
      "last_triggered",
      "level",
      "group"
    ].forEach((h) => {
      t[h] !== void 0 && c.push({ key: h, value: t[h] });
    });
    const r = Ci(e), l = Si(s), d = xi(o);
    return Object.values(a).filter((h) => n.includes(h.entity_id) ? !1 : c.length ? c.every(
      (u) => ki(i, h, u, {
        areas: o,
        devices: s,
        entities: e,
        entityMap: r,
        deviceMap: l,
        areaMap: d
      })
    ) : !0);
  }
);
function $t(i, t) {
  var a, c, r, l;
  const e = i, s = e.entities || e.__registryEntities || Object.values(((a = e.hass) == null ? void 0 : a.states) ?? {}), o = e.devices || e.__registryDevices || Object.values(((c = e.hass) == null ? void 0 : c.devices) ?? {}), n = e.areas || e.__registryAreas || Object.values(((r = e.hass) == null ? void 0 : r.areas) ?? {});
  return !e.__registryEntities && e.hass && typeof e.hass.callWS == "function" && !e.__registryFetchInProgress && (e.__registryFetchInProgress = !0, Promise.all([
    Ut(e.hass, "entity", "entity_id").catch(
      () => ({})
    ),
    Ut(e.hass, "device", "id").catch(
      () => ({})
    ),
    Ut(e.hass, "area", "area_id").catch(
      () => ({})
    )
  ]).then(([d, h, u]) => {
    try {
      e.__registryEntities = Object.values(d), e.__registryDevices = Object.values(h), e.__registryAreas = Object.values(u);
    } catch {
    }
  }).catch(() => {
  }).finally(() => {
    var d;
    e.__registryFetchInProgress = !1;
    try {
      (d = e.requestUpdate) == null || d.call(e);
    } catch {
    }
  })), zi(
    i,
    t,
    s,
    o,
    n,
    e.hiddenEntities || [],
    ((l = e.hass) == null ? void 0 : l.states) || {}
  );
}
function qt(i, t) {
  if (!i) return !1;
  const e = t.match(/^([<>]=?)?\s*(\d+)$/);
  if (!e) return !1;
  const [, s, o] = e, n = parseInt(o, 10), a = /* @__PURE__ */ new Date(), c = new Date(i), r = (a.getTime() - c.getTime()) / 6e4;
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
function S(i, t) {
  if (Array.isArray(t))
    return t.some((e) => S(i, e));
  if (typeof t == "string" && t.startsWith("!"))
    return !S(i, t.slice(1));
  if (typeof t == "string" && /^([<>]=?)\s*(-?\d+(\.\d+)?)([mhd])$/.test(t)) {
    const [, e, s, , o] = t.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)([mhd])$/) || [], n = parseFloat(s), a = Date.now(), c = new Date(i).getTime();
    if (isNaN(c)) return !1;
    let r = (a - c) / 6e4;
    switch (o === "h" && (r /= 60), o === "d" && (r /= 1440), e) {
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
    const [, e, s] = t.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)$/) || [], o = parseFloat(s), n = parseFloat(i);
    switch (e) {
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
    const e = "^" + t.split("*").map((o) => o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*") + "$";
    return new RegExp(e, "i").test(String(i));
  }
  if (typeof t == "string" && t.length > 2 && t.startsWith("/") && t.endsWith("/"))
    try {
      return new RegExp(t.slice(1, -1), "i").test(String(i));
    } catch {
      return !1;
    }
  return i === t;
}
function ki(i, t, e, s) {
  var n, a, c, r, l, d, h, u, f;
  const o = ((n = s.entityMap) == null ? void 0 : n.get(t.entity_id)) || ((a = s.entities) == null ? void 0 : a.find((m) => m.entity_id === t.entity_id));
  switch (e.key) {
    case "area": {
      let m = o == null ? void 0 : o.area_id;
      if (!m && (o != null && o.device_id)) {
        const y = (s.deviceMap && (o != null && o.device_id) ? s.deviceMap.get(o.device_id) : void 0) || ((c = s.devices) == null ? void 0 : c.find((p) => p.id === o.device_id));
        m = y == null ? void 0 : y.area_id;
      }
      return S(m, e.value);
    }
    case "domain":
      return S(R(t.entity_id), e.value);
    case "entity_id":
      return S(t.entity_id, e.value);
    case "state":
      return S(t.state, e.value);
    case "name": {
      const m = t.attributes.friendly_name ?? "";
      return S(m, e.value);
    }
    case "attributes":
      return !e.value || typeof e.value != "object" ? !1 : Object.entries(e.value).every(([m, y]) => {
        const p = m.split(":");
        let _ = t.attributes;
        for (const C of p)
          if (_ = _ == null ? void 0 : _[C], _ === void 0) break;
        return _ === void 0 ? !1 : S(_, y);
      });
    case "device":
      return S(o == null ? void 0 : o.device_id, e.value);
    case "integration":
      return o ? S(o.platform, e.value) || S(o.config_entry_id, e.value) : !1;
    case "entity_category":
      return S(o == null ? void 0 : o.entity_category, e.value);
    case "label": {
      const m = s.labels, y = (p) => {
        if (S(p, e.value)) return !0;
        if (m) {
          const _ = m.find((C) => C.label_id === p);
          if (_ && S(_.name, e.value)) return !0;
        }
        return !1;
      };
      if (o != null && o.labels && o.labels.some(y)) return !0;
      if (o != null && o.device_id) {
        const p = (s.deviceMap && (o != null && o.device_id) ? s.deviceMap.get(o.device_id) : void 0) || ((r = s.devices) == null ? void 0 : r.find((_) => _.id === o.device_id));
        if (p != null && p.labels && p.labels.some(y)) return !0;
      }
      return !1;
    }
    case "floor": {
      let m = o == null ? void 0 : o.area_id;
      if (!m && (o != null && o.device_id)) {
        const p = (s.deviceMap && (o != null && o.device_id) ? s.deviceMap.get(o.device_id) : void 0) || ((l = s.devices) == null ? void 0 : l.find((_) => _.id === o.device_id));
        m = p == null ? void 0 : p.area_id;
      }
      if (!m) return !1;
      const y = (s.areaMap ? s.areaMap.get(m) : void 0) || ((d = s.areas) == null ? void 0 : d.find((p) => p.area_id === m));
      return S(y == null ? void 0 : y.floor_id, e.value);
    }
    case "hidden_by":
      return S(o == null ? void 0 : o.hidden_by, e.value);
    case "device_manufacturer": {
      if (o != null && o.device_id) {
        const m = (s.deviceMap && (o != null && o.device_id) ? s.deviceMap.get(o.device_id) : void 0) || ((h = s.devices) == null ? void 0 : h.find((y) => y.id === o.device_id));
        return S(m == null ? void 0 : m.manufacturer, e.value);
      }
      return !1;
    }
    case "device_model": {
      if (o != null && o.device_id) {
        const m = (s.deviceMap && (o != null && o.device_id) ? s.deviceMap.get(o.device_id) : void 0) || ((u = s.devices) == null ? void 0 : u.find((y) => y.id === o.device_id));
        return S(m == null ? void 0 : m.model, e.value);
      }
      return !1;
    }
    case "last_changed":
      return typeof e.value == "string" && /^[<>]=?\s*\d+$/.test(e.value) ? qt(t.last_changed, e.value) : S(t.last_changed, e.value);
    case "last_updated":
      return typeof e.value == "string" && /^[<>]=?\s*\d+$/.test(e.value) ? qt(t.last_updated, e.value) : S(t.last_updated, e.value);
    case "last_triggered":
      return typeof e.value == "string" && /^[<>]=?\s*\d+$/.test(e.value) ? qt(t.attributes.last_triggered, e.value) : S(t.attributes.last_triggered, e.value);
    case "group": {
      const m = i.hass.states[e.value];
      return !m || !Array.isArray((f = m.attributes) == null ? void 0 : f.entity_id) ? !1 : m.attributes.entity_id.includes(t.entity_id);
    }
    default:
      return !0;
  }
}
var Di = Object.defineProperty, M = (i, t, e, s) => {
  for (var o = void 0, n = i.length - 1, a; n >= 0; n--)
    (a = i[n]) && (o = a(t, e, o) || o);
  return o && Di(t, e, o), o;
};
const te = class te extends V {
  constructor() {
    super(...arguments), this.open = !1, this.title = "", this.content = "", this.entities = [], this._showAll = !1, this._cardEls = /* @__PURE__ */ new Map(), this._lastEntityIds = [], this._onClosed = (t) => {
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
    }, this.computeLabel = A(
      (t, e, s) => Ht(this.hass, t, e, s)
    ), this._popupCardConfigCache = /* @__PURE__ */ new Map(), this._cardElementCache = /* @__PURE__ */ new Map(), this._sortEntitiesMemo = A(
      (t, e, s, o) => {
        const n = t.slice();
        if (e === "state") {
          const c = Dt(o, s);
          return n.sort((r, l) => {
            const d = this._isActive(r) ? 0 : 1, h = this._isActive(l) ? 0 : 1;
            if (d !== h) return d - h;
            const u = R(r.entity_id), f = R(l.entity_id), m = this.hass ? F(this.hass, r.state, u) : r.state, y = this.hass ? F(this.hass, l.state, f) : l.state, p = (m || "").localeCompare(y || "");
            return p !== 0 ? p : c(r.entity_id, l.entity_id);
          });
        }
        const a = Dt(o, s);
        return n.sort((c, r) => a(c.entity_id, r.entity_id));
      }
    ), this.groupAndSortEntities = A(
      (t, e, s) => {
        const o = /* @__PURE__ */ new Map();
        for (const a of t) {
          const c = this.getAreaForEntity(a);
          o.has(c) || o.set(c, []), o.get(c).push(a);
        }
        return Array.from(o.entries()).sort(
          ([a], [c]) => {
            var d, h;
            const r = ((d = e.get(a)) == null ? void 0 : d.toLowerCase()) ?? (a === "unassigned" ? "unassigned" : a), l = ((h = e.get(c)) == null ? void 0 : h.toLowerCase()) ?? (c === "unassigned" ? "unassigned" : c);
            return r.localeCompare(l);
          }
        ).map(([a, c]) => [a, s(c)]);
      }
    ), this.DOMAIN_FEATURES = {
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
  }
  async showDialog(t) {
    this.title = t.title ?? this.title, this.hass = t.hass, this.entities = t.entities ?? [], t.content !== void 0 && (this.content = t.content), this.selectedDomain = t.selectedDomain, this.selectedDeviceClass = t.selectedDeviceClass, this.selectedGroup = t.selectedGroup, this.card = t.card, this._cardEls.clear(), this.open = !0, this.requestUpdate();
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
    var e, s, o, n, a, c;
    const t = (c = (a = (n = (o = (s = (e = document.querySelector("body > home-assistant")) == null ? void 0 : e.shadowRoot) == null ? void 0 : s.querySelector("status-card-popup")) == null ? void 0 : o.shadowRoot) == null ? void 0 : n.querySelector("ha-dialog")) == null ? void 0 : a.shadowRoot) == null ? void 0 : c.querySelector(
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
  _toTileConfig(t) {
    return {
      type: "tile",
      entity: t.entity
    };
  }
  async _createCardElement(t, e, s = !1) {
    var o, n, a;
    try {
      const c = await ((o = window == null ? void 0 : window.loadCardHelpers) == null ? void 0 : o.call(window));
      if (c != null && c.createCardElement) {
        const r = c.createCardElement(e);
        return r.hass = t, (n = r.setAttribute) == null || n.call(r, "data-hui-card", ""), r;
      }
    } catch {
    }
    try {
      const c = e.type || "tile", r = typeof c == "string" && c.startsWith("custom:"), l = r ? c.slice(7) : `hui-${c}-card`;
      r && !customElements.get(l) && await customElements.whenDefined(l).catch(() => {
      });
      const d = document.createElement(l);
      return typeof d.setConfig == "function" && d.setConfig(e), d.hass = t, (a = d.setAttribute) == null || a.call(d, "data-hui-card", ""), d;
    } catch {
      if (!s)
        return this._createCardElement(
          t,
          this._toTileConfig(e),
          !0
        );
      const c = document.createElement("div");
      return c.setAttribute("data-hui-card", ""), c;
    }
  }
  _getPopupCardConfig(t) {
    var y, p, _, C;
    const e = this.card, s = R(t.entity_id), o = this.selectedDomain || s, n = this.selectedDomain ? this.selectedDeviceClass : (C = (_ = (p = (y = this.hass) == null ? void 0 : y.states) == null ? void 0 : p[t.entity_id]) == null ? void 0 : _.attributes) == null ? void 0 : C.device_class, a = H(o, n), c = typeof (e == null ? void 0 : e.getCustomizationForType) == "function" ? e.getCustomizationForType(a) : void 0, r = c == null ? void 0 : c.popup_card, l = r && typeof r.type == "string" && r.type || "tile", d = l === "tile" ? this.DOMAIN_FEATURES[s] ?? {} : {};
    let h = {};
    if (r && typeof r == "object") {
      const { type: b, entity: g, ...v } = r;
      h = v;
    } else
      h = {};
    const u = {
      type: l,
      entity: t.entity_id,
      ...d,
      ...h
    }, f = this._configHash(u), m = this._popupCardConfigCache.get(t.entity_id);
    return m && m.hash === f ? m.config : (this._popupCardConfigCache.set(t.entity_id, {
      hash: f,
      config: u
    }), u);
  }
  shouldUpdate(t) {
    if (!this.open)
      return t.has("open");
    if (t.size === 1 && t.has("hass")) {
      const e = this._getCurrentEntities().map((n) => n.entity_id).sort(), s = (this._lastEntityIds || []).slice().sort(), o = e.length === s.length && e.every((n, a) => n === s[a]);
      return this._updateCardsHass(), !o;
    }
    return !0;
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
    const e = t.entity_id, s = this._getPopupCardConfig(t), o = this._configHash(s), n = this._cardElementCache.get(e);
    if (n && n.hash === o)
      return n.el.hass = this.hass, n.el;
    const a = document.createElement("div");
    return a.classList.add("card-placeholder"), a.setAttribute("data-hui-card", ""), this._cardEls.set(e, a), this._createCardElement(this.hass, s).then((c) => {
      try {
        this._cardEls.get(e) === a && (a.replaceWith(c), this._cardEls.set(e, c), this._cardElementCache.set(e, { hash: o, el: c })), c.hass = this.hass;
      } catch {
      }
    }), this._cardElementCache.set(e, { hash: o, el: a }), a;
  }
  _getCurrentEntities() {
    var a, c, r;
    const t = this.card, e = this.selectedDomain, s = this.selectedDeviceClass, o = this.selectedGroup;
    let n = [];
    if (o !== void 0 && ((c = (a = t._config) == null ? void 0 : a.content) != null && c[o])) {
      const l = t._config.content[o], d = (r = t._config.rulesets) == null ? void 0 : r.find(
        (h) => h.group_id === l
      );
      n = d ? $t(t, d) : [];
    } else
      e ? n = ((typeof (t == null ? void 0 : t._shouldShowTotalEntities) == "function" ? t._shouldShowTotalEntities(e, s) : !1) ? !0 : this._showAll) ? t._totalEntities(e, s) : t._isOn(e, s) : n = Array.isArray(this.entities) ? this.entities : [];
    return n;
  }
  toggleAllOrOn() {
    this._showAll = !this._showAll;
  }
  handleAskToggleDomain(t) {
    t.stopPropagation();
    const e = "status-card-popup-confirmation";
    this.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag: e,
          dialogImport: () => customElements.whenDefined(e),
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
  handleAskToggleAll(t) {
    t.stopPropagation(), this.toggleAllOrOn();
  }
  _stopPropagation(t) {
    t.stopPropagation();
  }
  getAreaForEntity(t) {
    var s, o;
    const e = (s = Object.values(this.hass.entities)) == null ? void 0 : s.find(
      (n) => n.entity_id === t.entity_id
    );
    if (e) {
      if (e.area_id)
        return e.area_id;
      if (e.device_id) {
        const n = (o = Object.values(this.hass.devices)) == null ? void 0 : o.find(
          (a) => a.id === e.device_id
        );
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
  sortEntitiesForPopup(t) {
    var s, o, n, a, c;
    const e = ((o = (s = this.card) == null ? void 0 : s._config) == null ? void 0 : o.popup_sort) || "name";
    return this._sortEntitiesMemo(
      t,
      e,
      ((a = (n = this.hass) == null ? void 0 : n.locale) == null ? void 0 : a.language) ?? "en",
      ((c = this.hass) == null ? void 0 : c.states) ?? {}
    );
  }
  render() {
    var B, x, k, L, N, K, It, ie, se, oe, ne, ae;
    if (!this.open) return $``;
    const t = (B = this.card) != null && B.list_mode ? 1 : ((k = (x = this.card) == null ? void 0 : x._config) == null ? void 0 : k.columns) || 4, e = this.selectedDomain, s = this.selectedDeviceClass, o = this.selectedGroup, n = this.card, c = (typeof (n == null ? void 0 : n._shouldShowTotalEntities) == "function" ? n._shouldShowTotalEntities(e, s) : !1) ? !0 : this._showAll, r = /* @__PURE__ */ new Map(), l = ((L = this.hass) == null ? void 0 : L.areas) ?? [], d = Array.isArray(l) ? l : Object.values(l);
    for (const w of d) {
      const D = w;
      D && D.area_id && D.name && r.set(D.area_id, D.name);
    }
    let h = [], u = !1;
    if (o !== void 0 && ((K = (N = n._config) == null ? void 0 : N.content) != null && K[o])) {
      const w = n._config.content[o], D = (It = n._config.rulesets) == null ? void 0 : It.find(
        (Z) => Z.group_id === w
      );
      h = D ? $t(n, D) : [];
    } else
      e ? h = c ? n._totalEntities(e, s) : n._isOn(e, s) : h = Array.isArray(this.entities) ? this.entities : [], u = !0;
    const f = this.sortEntitiesForPopup(h), m = new Set(h.map((w) => w.entity_id));
    Array.from(this._cardEls.keys()).forEach((w) => {
      m.has(w) || this._cardEls.delete(w);
    }), this._lastEntityIds = h.map((w) => w.entity_id);
    const y = this.groupAndSortEntities(
      h,
      r,
      this.sortEntitiesForPopup.bind(this)
    ), p = ((ie = n == null ? void 0 : n._config) == null ? void 0 : ie.ungroupAreas) === !0 || ((se = n == null ? void 0 : n._config) == null ? void 0 : se.ungroup_areas) === !0 || ((oe = n == null ? void 0 : n._config) == null ? void 0 : oe.area_grouping) !== void 0 && ((ne = n == null ? void 0 : n._config) == null ? void 0 : ne.area_grouping) === !1, _ = y.length ? Math.max(...y.map(([, w]) => w.length)) : 0, C = p ? Math.min(t, Math.max(1, h.length)) : Math.min(t, Math.max(1, _)), b = H(e, s), g = typeof (n == null ? void 0 : n.getCustomizationForType) == "function" ? n.getCustomizationForType(b) : void 0, v = (g == null ? void 0 : g.invert) === !0;
    return $`
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
            .path=${Yt}
            @click=${this._onClosed}
          ></ha-icon-button>
          <h3>
            ${(() => {
      var Z, U;
      const w = this.selectedGroup, D = this.card;
      if (w !== void 0 && ((U = (Z = D == null ? void 0 : D._config) == null ? void 0 : Z.content) != null && U[w])) {
        const Le = D._config.content[w];
        return this.hass.localize(
          "ui.panel.lovelace.editor.card.entities.name"
        ) + " in " + Le;
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

          ${u ? $`
                <ha-button-menu
                  class="menu-button"
                  slot="actionItems"
                  fixed
                  corner="BOTTOM_END"
                  menu-corner="END"
                  @closed=${this._stopPropagation}
                >
                  <ha-icon-button
                    slot="trigger"
                    .label=${this.hass.localize("ui.common.menu")}
                    .path=${ui}
                  ></ha-icon-button>

                  <ha-list-item
                    graphic="icon"
                    @click=${this.handleAskToggleDomain}
                    @closed=${this._stopPropagation}
                  >
                    ${v ? this.hass.localize("ui.card.common.turn_on") : this.hass.localize("ui.card.common.turn_off")}
                    <ha-svg-icon
                      slot="graphic"
                      .path=${_i}
                    ></ha-svg-icon>
                  </ha-list-item>

                  <ha-list-item
                    graphic="icon"
                    @click=${this.handleAskToggleAll}
                    @closed=${this._stopPropagation}
                  >
                    ${this.hass.localize("ui.card.common.toggle") + " " + this.hass.localize(
      "component.sensor.entity_component._.state_attributes.state_class.state.total"
    ) + " " + this.hass.localize(
      "ui.panel.lovelace.editor.card.entities.name"
    )}
                    <ha-svg-icon
                      slot="graphic"
                      .path=${pi}
                    ></ha-svg-icon>
                  </ha-list-item>
                </ha-button-menu>
              ` : ""}
        </div>
        <div class="dialog-content scrollable">
          ${(ae = this.card) != null && ae.list_mode ? p ? $`
                  <ul class="entity-list">
                    ${tt(
      f,
      (w) => w.entity_id,
      (w) => $`<li class="entity-item">- ${w.entity_id}</li>`
    )}
                  </ul>
                ` : $`
                  <ul class="entity-list">
                    ${tt(
      y,
      ([w]) => w,
      ([w, D]) => {
        const Z = r.get(w) ?? (w === "unassigned" ? "Unassigned" : w);
        return $`
                          <li class="entity-item">
                            <h4>${Z}:</h4>
                            <ul>
                              ${tt(
          D,
          (U) => U.entity_id,
          (U) => $`<li class="entity-item">
                                    - ${U.entity_id}
                                  </li>`
        )}
                            </ul>
                          </li>
                        `;
      }
    )}
                  </ul>
                ` : p ? $`
                <h4></h4>
                <div class="entity-cards">
                  ${tt(
      f,
      (w) => w.entity_id,
      (w) => $`
                      <div class="entity-card">
                        ${this._getOrCreateCard(w)}
                      </div>
                    `
    )}
                </div>
              ` : $`${y.map(([w, D]) => {
      const Z = r.get(w) ?? (w === "unassigned" ? "Unassigned" : w);
      return $`
                  <div class="cards-wrapper">
                    <h4>${Z}</h4>
                    <div class="entity-cards">
                      ${tt(
        D,
        (U) => U.entity_id,
        (U) => $`
                          <div class="entity-card">
                            ${this._getOrCreateCard(U)}
                          </div>
                        `
      )}
                    </div>
                  </div>
                `;
    })}`}
          ${h.length === 0 ? this.content : ""}
        </div>
      </ha-dialog>
    `;
  }
};
te.styles = pt`
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
let I = te;
M([
  E({ type: Boolean })
], I.prototype, "open");
M([
  E({ type: String })
], I.prototype, "title");
M([
  E({ type: String })
], I.prototype, "selectedDomain");
M([
  E({ type: String })
], I.prototype, "selectedDeviceClass");
M([
  E({ type: String })
], I.prototype, "content");
M([
  E({ type: Array })
], I.prototype, "entities");
M([
  E({ attribute: !1 })
], I.prototype, "hass");
M([
  E({ attribute: !1 })
], I.prototype, "card");
M([
  O()
], I.prototype, "_showAll");
M([
  O()
], I.prototype, "selectedGroup");
customElements.define("status-card-popup", I);
const ee = class ee extends V {
  constructor() {
    super(...arguments), this.open = !1, this._onClosed = () => {
      this.open = !1, this.dispatchEvent(
        new CustomEvent("dialog-closed", { bubbles: !0, composed: !0 })
      );
    }, this._confirm = () => {
      var t, e;
      try {
        (e = (t = this.card) == null ? void 0 : t.toggleDomain) == null || e.call(t, this.selectedDomain, this.selectedDeviceClass);
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
    if (!this.open || !this.hass || !this.card) return $``;
    const t = this.selectedDomain || "", e = this.selectedDeviceClass, s = H(t, e), o = (c = (a = this.card) == null ? void 0 : a.getCustomizationForType) == null ? void 0 : c.call(a, s), n = (o == null ? void 0 : o.invert) === !0;
    return $`
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
ee.styles = pt``;
let it = ee;
M([
  E({ type: Boolean })
], it.prototype, "open");
M([
  E({ attribute: !1 })
], it.prototype, "hass");
M([
  E({ attribute: !1 })
], it.prototype, "card");
M([
  E({ type: String })
], it.prototype, "selectedDomain");
M([
  E({ type: String })
], it.prototype, "selectedDeviceClass");
customElements.define(
  "status-card-popup-confirmation",
  it
);
var Oi = Object.defineProperty, Ti = Object.getOwnPropertyDescriptor, j = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? Ti(t, e) : t, n = i.length - 1, a; n >= 0; n--)
    (a = i[n]) && (o = (s ? a(t, e, o) : a(o)) || o);
  return s && o && Oi(t, e, o), o;
};
let P = class extends V {
  constructor() {
    super(...arguments), this.entitiesByDomain = {}, this.selectedDomain = null, this.selectedDeviceClass = null, this.hiddenEntities = [], this.hiddenLabels = [], this.hiddenAreas = [], this.hide_person = !1, this.hide_content_name = !0, this.list_mode = !1, this.selectedGroup = null, this._computeEntitiesByDomainMemo = A(
      (i, t, e, s, o, n, a, c, r, l) => Te(
        i || {},
        t || {},
        e || {},
        s,
        { area: o, floor: n, label: a, hiddenAreas: c, hiddenLabels: r, hiddenEntities: l },
        Y
      )
    ), this._baseEntitiesMemo = A(
      (i, t, e) => i.filter((s) => {
        const o = s.state;
        if (o === "unavailable" || o === "unknown") return !1;
        const n = s.attributes.device_class;
        return t === "switch" ? e === "outlet" ? n === "outlet" : e === "switch" ? n === "switch" || n === void 0 : !0 : !e || n === e;
      })
    ), this.computeLabel = A(
      (i, t, e) => Ht(this.hass, i, t, e)
    ), this._customizationIndex = A((i) => {
      const t = /* @__PURE__ */ new Map();
      return (i ?? []).forEach((e) => {
        e.type && t.set(e.type.toLowerCase(), e);
      }), t;
    }), this._getPersonItemsMemo = A(
      (i, t, e, s, o) => s ? [] : Object.values(i).filter(
        (n) => {
          var a;
          return n.entity_id.startsWith("person.") && !t.includes(n.entity_id) && !((a = n.labels) != null && a.some((c) => e.includes(c))) && !n.hidden;
        }
      ).reverse().map((n) => o[n.entity_id]).filter((n) => !!n)
    ), this._computeExtraItems = A(
      (i, t) => {
        const e = i.content || [];
        return i.extra_entities ? i.extra_entities.reduce((s, o) => {
          var m;
          if (!e.includes(o)) return s;
          const n = t[o];
          if (!n) return s;
          const a = (m = i.customization) == null ? void 0 : m.find(
            (y) => y.type === o
          );
          if (a && a.state !== void 0 && a.invert_state !== void 0) {
            const y = a.invert_state === "true", p = n.state === a.state;
            if (!y && !p || y && p) return s;
          }
          const c = e.indexOf(o), r = c >= 0 ? c : 0, l = this.getCustomIcon(o, void 0, n), d = this.getCustomName(o, void 0, n) ?? n.attributes.friendly_name ?? o, h = this.getCustomColor(o, void 0), u = this.getCustomCSS(
            o,
            void 0
          ), f = this.getBackgroundColor(
            o,
            void 0
          );
          return s.push({
            type: "extra",
            panel: o,
            entity: n,
            order: r,
            icon: l,
            name: d,
            color: h,
            icon_css: u,
            background_color: f
          }), s;
        }, []).sort((s, o) => s.order - o.order) : [];
      }
    ), this._computeGroupItems = A(
      (i, t) => i.map((e, s) => {
        const o = t.find((a) => a.group_id === e);
        if (!(!o || !Object.keys(o).some(
          (a) => a !== "group_id" && a !== "group_icon" && o[a] !== void 0 && o[a] !== ""
        )))
          return {
            type: "group",
            group_id: e,
            order: s,
            ruleset: o
          };
      }).filter(
        (e) => !!e
      )
    ), this._computeDomainItems = A(
      (i) => i.map(
        (t, e) => t.includes(" - ") ? null : {
          type: "domain",
          domain: t.trim().toLowerCase().replace(/\s+/g, "_"),
          order: e
        }
      ).filter((t) => t !== null)
    ), this._computeDeviceClassItems = A(
      (i) => i.map((t, e) => {
        if (!t.includes(" - ")) return null;
        const [s, o] = t.split(" - ");
        return {
          type: "deviceClass",
          domain: s.trim().toLowerCase().replace(/\s+/g, "_"),
          deviceClass: o.trim().toLowerCase(),
          order: e
        };
      }).filter((t) => t !== null)
    ), this._computeSortedEntities = A(
      (i, t, e, s) => [...i, ...t, ...e, ...s].sort(
        (o, n) => o.order - n.order
      )
    );
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      rows: 2
    };
  }
  _processEntities() {
    const i = this._entitiesByDomain();
    i !== this.entitiesByDomain && (this.entitiesByDomain = i);
  }
  _entitiesByDomain() {
    var d, h, u, f;
    const i = this.hass.entities || [], t = this.hass.devices || [], e = this.hass.areas || [], s = ((d = this.hass) == null ? void 0 : d.states) || {}, o = ((h = this._config) == null ? void 0 : h.area) || null, n = ((u = this._config) == null ? void 0 : u.floor) || null, a = ((f = this._config) == null ? void 0 : f.label) || null, c = this.hiddenAreas, r = this.hiddenLabels, l = this.hiddenEntities;
    return this._computeEntitiesByDomainMemo(
      i,
      t,
      e,
      s,
      o,
      n,
      a,
      c,
      r,
      l
    );
  }
  _baseEntities(i, t) {
    const e = this._entitiesByDomain()[i] || [];
    return this._baseEntitiesMemo(e, i, t);
  }
  _totalEntities(i, t) {
    return this._baseEntities(i, t);
  }
  _shouldShowTotalEntities(i, t) {
    if (this._config.show_total_entities) return !0;
    const e = H(i, t), s = this.getCustomizationForType(e);
    return (s == null ? void 0 : s.show_total_entities) === !0;
  }
  _shouldShowTotalNumbers(i, t) {
    if (this._config.show_total_number) return !0;
    const e = H(i, t), s = this.getCustomizationForType(e);
    return (s == null ? void 0 : s.show_total_number) === !0;
  }
  _isOn(i, t) {
    var n;
    const e = this._baseEntities(i, t), s = H(i, t), o = ((n = this.getCustomizationForType(s)) == null ? void 0 : n.invert) === !0;
    return e.filter((a) => {
      if (i === "climate") {
        const r = a.attributes.hvac_action;
        if (r !== void 0) {
          const l = !["idle", "off"].includes(r);
          return o ? !l : l;
        }
      }
      if (i === "humidifier") {
        const r = a.attributes.action;
        if (r !== void 0) {
          const l = !["idle", "off"].includes(r);
          return o ? !l : l;
        }
      }
      let c = !Vt.includes(a.state);
      return o ? !c : c;
    });
  }
  setConfig(i) {
    if (!i)
      throw new Error("Invalid configuration.");
    this._config = i, this.hide_person = i.hide_person !== void 0 ? i.hide_person : !1, this.hide_content_name = i.hide_content_name !== void 0 ? i.hide_content_name : !1, this.list_mode = i.list_mode !== void 0 ? i.list_mode : !1, this.hiddenEntities = i.hidden_entities || [], this.hiddenLabels = i.hidden_labels || [], this.hiddenAreas = i.hidden_areas || [];
  }
  _showPopup(i, t, e) {
    i.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag: t,
          dialogImport: () => customElements.whenDefined(t),
          dialogParams: e
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _openDomainPopup(i) {
    var o, n, a;
    let t = "Details";
    typeof i == "string" ? t = this.getCustomName(i) || this.computeLabel({ name: i }) : typeof i == "number" && ((o = this._config.content) != null && o[i]) && (t = this._config.content[i]);
    let e = [];
    if (typeof i == "number") {
      const c = (n = this._config.content) == null ? void 0 : n[i], r = (a = this._config.rulesets) == null ? void 0 : a.find(
        (l) => l.group_id === c
      );
      e = r ? $t(this, r) : [];
    } else {
      const c = this.selectedDeviceClass || void 0;
      e = this._shouldShowTotalEntities(i, c) ? this._totalEntities(i, c) : this._isOn(i, c);
    }
    this._showPopup(this, "status-card-popup", {
      title: t,
      hass: this.hass,
      entities: e,
      selectedDomain: typeof i == "string" ? i : void 0,
      selectedDeviceClass: this.selectedDeviceClass || void 0,
      selectedGroup: this.selectedGroup || void 0,
      card: this,
      content: e.length ? void 0 : "Keine Entitäten"
    });
  }
  updated(i) {
    if (super.updated(i), !this._config || !this.hass) return;
    const t = i.get("hass"), e = i.get("_config");
    if (i.has("selectedDomain") && this.selectedDomain) {
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
    if (i.has("selectedGroup") && this.selectedGroup !== null) {
      const s = this.selectedGroup;
      this._openDomainPopup(s), setTimeout(() => {
        this.selectedGroup = null;
      }, 0);
    }
    (i.has("hass") && (!t || t.themes !== this.hass.themes) || i.has("_config") && (!e || e.theme !== this._config.theme)) && gi(
      this,
      this.hass.themes,
      this._config.theme
    ), (i.has("hass") || i.has("_config") || i.has("hiddenEntities") || i.has("hiddenLabels") || i.has("hiddenAreas")) && (!t || t.states !== this.hass.states || i.has("_config") || i.has("hiddenEntities") || i.has("hiddenLabels") || i.has("hiddenAreas")) && this._processEntities();
  }
  showMoreInfo(i) {
    const t = new CustomEvent("hass-more-info", {
      detail: { entityId: i.entity_id },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(t);
  }
  getStatusProperty(i, t, e) {
    if (this._shouldShowTotalEntities(i, t) && !this._shouldShowTotalNumbers(i, t))
      return "";
    const s = [
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
    ], o = H(i, t), n = this.getCustomizationForType(o), a = (n == null ? void 0 : n.invert) === !0;
    switch (i) {
      case "device_tracker": {
        const c = F(
          this.hass,
          "home",
          "device_tracker"
        ), r = F(
          this.hass,
          "not_home",
          "device_tracker"
        );
        return a ? r : c;
      }
      case "lock":
      case "cover": {
        const c = F(this.hass, "open", "cover"), r = F(
          this.hass,
          "closed",
          "cover"
        );
        return a ? r : c;
      }
      case "person":
        return e === "home" ? F(this.hass, "home", "person") : e === "not_home" ? F(this.hass, "not_home", "person") : e ?? "unknown";
      default: {
        if (t && s.includes(t)) {
          const l = F(this.hass, "open", "cover"), d = F(
            this.hass,
            "closed",
            "cover"
          );
          return a ? d : l;
        }
        const c = F(
          this.hass,
          e ?? "on",
          "light"
        ), r = F(
          this.hass,
          e ?? "off",
          "light"
        );
        return a ? r : c;
      }
    }
  }
  getCustomizationForType(i) {
    return i ? this._customizationIndex(this._config.customization).get(i.toLowerCase()) : void 0;
  }
  getCustomIcon(i, t, e) {
    const s = this.getCustomizationForType(
      H(i, t)
    );
    if ((s == null ? void 0 : s.show_entity_picture) === !0 && e && e.attributes && e.attributes.entity_picture)
      return e.attributes.entity_picture;
    if (s && s.icon)
      return s.icon;
    if (e && e.attributes && e.attributes.icon)
      return e.attributes.icon;
    const n = (s == null ? void 0 : s.invert) === !0 ? "off" : "on";
    let a = i;
    if (!t && i.includes(".") && (a = i.split(".")[0]), q && q[a]) {
      const c = q[a];
      if (t && typeof c == "object") {
        const r = c[t];
        if (r) {
          if (typeof r == "string") return r;
          if (typeof r == "object" && "on" in r && "off" in r)
            return r[n] || r.on || r.off;
        }
      }
      if (typeof c == "object" && "on" in c && "off" in c)
        return c[n] || c.on || c.off;
      if (typeof c == "string") return c;
    }
    return "";
  }
  getBackgroundColor(i, t) {
    var o;
    const e = this.getCustomizationForType(
      H(i, t)
    ), s = (n) => n.length === 4 ? `rgba(${n[0]},${n[1]},${n[2]},${n[3]})` : `rgb(${n[0]},${n[1]},${n[2]})`;
    if (e && Array.isArray(e.background_color)) {
      const n = e.background_color;
      if (n.length >= 3) return s(n);
    }
    if (Array.isArray((o = this._config) == null ? void 0 : o.background_color)) {
      const n = this._config.background_color;
      if (n.length >= 3) return s(n);
    }
    return "rgba(var(--rgb-primary-text-color), 0.15)";
  }
  getCustomColor(i, t) {
    const e = this.getCustomizationForType(
      H(i, t)
    );
    if (e && e.icon_color)
      return e.icon_color;
    if (this._config && this._config.color)
      return this._config.color;
  }
  getCustomName(i, t, e) {
    const s = this.getCustomizationForType(
      H(i, t)
    );
    if (s && s.name)
      return s.name;
    if (e && e.attributes.friendly_name)
      return e.attributes.friendly_name;
  }
  getCustomCSS(i, t) {
    const e = this.getCustomizationForType(
      H(i, t)
    );
    if (e && e.icon_css)
      return e.icon_css;
  }
  toggleDomain(i, t) {
    i = i ?? this.selectedDomain, t = t ?? this.selectedDeviceClass;
    const e = this._isOn(i, t);
    if (e.length === 0) {
      console.warn(`Keine aktiven Entitäten für ${i} gefunden.`);
      return;
    }
    if ([
      "light",
      "switch",
      "fan",
      "cover",
      "siren",
      "climate",
      "humidifier",
      "valve",
      "remote"
    ].includes(i)) {
      this.hass.callService(i, "toggle", {
        entity_id: e.map((s) => s.entity_id)
      });
      return;
    }
    for (const s of e) {
      let o = !Vt.includes(s.state);
      i === "media_player" ? this.hass.callService(i, o ? "media_pause" : "media_play", {
        entity_id: s.entity_id
      }) : i === "lock" ? this.hass.callService(i, o ? "lock" : "unlock", {
        entity_id: s.entity_id
      }) : i === "vacuum" ? this.hass.callService(i, o ? "stop" : "start", {
        entity_id: s.entity_id
      }) : i === "alarm_control_panel" ? this.hass.callService(
        i,
        o ? "alarm_arm_away" : "alarm_disarm",
        { entity_id: s.entity_id }
      ) : i === "lawn_mower" ? this.hass.callService(i, o ? "pause" : "start_mowing", {
        entity_id: s.entity_id
      }) : i === "water_heater" ? this.hass.callService(i, o ? "turn_off" : "turn_on", {
        entity_id: s.entity_id
      }) : i === "update" && this.hass.callService(i, o ? "skip" : "install", {
        entity_id: s.entity_id
      });
    }
  }
  _handleDomainAction(i, t) {
    return (e) => {
      var l, d, h;
      e.stopPropagation();
      const s = this.getCustomizationForType(
        H(i, t)
      );
      let o, n;
      e.detail.action === "tap" ? (o = s == null ? void 0 : s.tap_action, n = (l = this._config) == null ? void 0 : l.tap_action) : e.detail.action === "hold" ? (o = s == null ? void 0 : s.hold_action, n = (d = this._config) == null ? void 0 : d.hold_action) : e.detail.action === "double_tap" && (o = s == null ? void 0 : s.double_tap_action, n = (h = this._config) == null ? void 0 : h.double_tap_action);
      const a = o !== void 0 ? o : n, c = typeof a == "string" && a === "more-info" || typeof a == "object" && (a == null ? void 0 : a.action) === "more-info", r = typeof a == "string" && a === "toggle" || typeof a == "object" && (a == null ? void 0 : a.action) === "toggle";
      if (i.includes(".")) {
        const u = i, f = this.hass.states[u], m = R(u);
        if (r) {
          this.hass.callService(m, "toggle", { entity_id: u });
          return;
        }
        if (c) {
          this.showMoreInfo(f);
          return;
        }
      }
      if (c || a === void 0) {
        this.selectedDomain = i, this.selectedDeviceClass = t || null;
        return;
      }
      if (r) {
        this.toggleDomain(i, t);
        return;
      }
      Ai(
        this,
        this.hass,
        {
          tap_action: (s == null ? void 0 : s.tap_action) || this._config.tap_action,
          hold_action: (s == null ? void 0 : s.hold_action) || this._config.hold_action,
          double_tap_action: (s == null ? void 0 : s.double_tap_action) || this._config.double_tap_action
        },
        e.detail.action
      );
    };
  }
  getPersonItems() {
    return this._getPersonItemsMemo(
      this.hass.entities,
      this.hiddenEntities,
      this.hiddenLabels,
      this.hide_person,
      this.hass.states
    );
  }
  getGroupItems() {
    return this._computeGroupItems(
      this._config.content || [],
      this._config.rulesets || []
    );
  }
  getExtraItems() {
    return !this._config || !this.hass ? [] : this._computeExtraItems(this._config, this.hass.states);
  }
  getDomainItems() {
    return this._computeDomainItems(this._config.content || []);
  }
  getDeviceClassItems() {
    return this._computeDeviceClassItems(this._config.content || []);
  }
  _getIconStyles(i, t = {}) {
    const { color: e, background_color: s, square: o, isNotHome: n } = t, a = {
      "border-radius": o ? "20%" : "50%",
      "background-color": s,
      color: e ? `var(--${e}-color)` : void 0
    };
    return i === "person" && n && (a.filter = "grayscale(100%)"), a;
  }
  renderExtraTab(i) {
    const { panel: t, icon: e, name: s, color: o, icon_css: n, background_color: a } = i, c = this.hass.states[t], r = this.getCustomizationForType(t), l = this._handleDomainAction(t), d = Ct({
      hasHold: ut(
        (r == null ? void 0 : r.hold_action) ?? this._config.hold_action
      ),
      hasDoubleClick: ut(
        (r == null ? void 0 : r.double_tap_action) ?? this._config.double_tap_action
      )
    }), h = {
      horizontal: this._config.content_layout === "horizontal"
    }, u = this._getIconStyles("extra", {
      color: o,
      background_color: a,
      square: this._config.square
    }), f = (r == null ? void 0 : r.state_content) ?? void 0;
    return $`
      <ha-tab-group-tab
        slot="nav"
        panel=${t}
        @action=${l}
        .actionHandler=${d}
      >
        <div class="extra-entity ${ht(h)}">
          <div class="entity-icon" style=${J(u)}>
            ${e.startsWith("/") || e.startsWith("http") ? $`<img
                  src=${e}
                  alt=${s}
                  style="border-radius:${this._config.square ? "20%" : "50%"};object-fit:cover;"
                />` : $`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${c}
                  .icon=${e}
                  data-domain=${R(t)}
                  data-state=${c.state}
                  style="${n || ""}"
                ></ha-state-icon>`}
          </div>
          <div class="entity-info">
            ${this.hide_content_name ? "" : $`<div class="entity-name">${s}</div>`}
            <div class="entity-state">
              <state-display
                .stateObj=${c}
                .hass=${this.hass}
                .content=${f}
                .name=${s}
              ></state-display>
            </div>
          </div>
        </div>
      </ha-tab-group-tab>
    `;
  }
  renderGroupTab(i, t) {
    const e = $t(this, i);
    if (!e.length) return $``;
    const s = i.group_id || `${this.hass.localize("component.group.entity_component._.name")} ${t + 1}`, o = i.group_icon || "mdi:format-list-group", n = this.getCustomColor(s), a = this.getBackgroundColor(s), c = () => {
      this.selectedGroup = t;
    }, r = Ct({
      hasHold: !1,
      hasDoubleClick: !1
    }), l = {
      horizontal: this._config.content_layout === "horizontal"
    }, d = this._getIconStyles("domain", {
      color: n,
      background_color: a,
      square: this._config.square
    });
    return $`
      <ha-tab-group-tab
        slot="nav"
        panel=${"group-" + t}
        @action=${c}
        .actionHandler=${r}
      >
        <div class="entity ${ht(l)}">
          <div class="entity-icon" style=${J(d)}>
            <ha-icon icon=${o}></ha-icon>
          </div>
          <div class="entity-info">
            ${this.hide_content_name ? "" : $`<div class="entity-name">${s}</div>`}
            <div class="entity-state">
              ${e.length}
              ${i.group_status ? ` ${i.group_status}` : ""}
            </div>
          </div>
        </div>
      </ha-tab-group-tab>
    `;
  }
  renderDomainTab(i) {
    const { domain: t } = i, e = this._isOn(t), s = this._totalEntities(t);
    if (!(this._shouldShowTotalEntities(t) ? s : e).length) return $``;
    const a = this.getCustomColor(t), c = this.getCustomizationForType(t), r = this._handleDomainAction(t), l = Ct({
      hasHold: ut(
        (c == null ? void 0 : c.hold_action) ?? this._config.hold_action
      ),
      hasDoubleClick: ut(
        (c == null ? void 0 : c.double_tap_action) ?? this._config.double_tap_action
      )
    }), d = {
      horizontal: this._config.content_layout === "horizontal"
    }, h = this._getIconStyles("domain", {
      color: a,
      background_color: this.getBackgroundColor(t),
      square: this._config.square
    });
    return $`
      <ha-tab-group-tab
        slot="nav"
        panel=${t}
        @action=${r}
        .actionHandler=${l}
      >
        <div class="entity ${ht(d)}">
          <div class="entity-icon" style=${J(h)}>
            <ha-icon
              icon=${this.getCustomIcon(t)}
              style=${J({})}
            ></ha-icon>
          </div>
          <div class="entity-info">
            ${this.hide_content_name ? "" : $`<div class="entity-name">
                  ${this.getCustomName(t) || this.computeLabel({ name: t })}
                </div>`}
            <div class="entity-state">
              ${this._shouldShowTotalNumbers(t) ? `${e.length}/${s.length} ${this.getStatusProperty(
      t
    )}` : this._shouldShowTotalEntities(t) ? `${s.length}` : `${e.length} ${this.getStatusProperty(t)}`}
            </div>
          </div>
        </div>
      </ha-tab-group-tab>
    `;
  }
  renderDeviceClassTab(i) {
    const { domain: t, deviceClass: e } = i, s = this._isOn(t, e), o = this._totalEntities(t, e);
    if (!(this._shouldShowTotalEntities(t, e) ? o : s).length) return $``;
    const c = this.getCustomColor(t, e), r = this.getCustomizationForType(
      H(t, e)
    ), l = this._handleDomainAction(t, e), d = Ct({
      hasHold: ut(
        (r == null ? void 0 : r.hold_action) ?? this._config.hold_action
      ),
      hasDoubleClick: ut(
        (r == null ? void 0 : r.double_tap_action) ?? this._config.double_tap_action
      )
    }), h = {
      horizontal: this._config.content_layout === "horizontal"
    }, u = this._getIconStyles("deviceClass", {
      color: c,
      background_color: this.getBackgroundColor(t, e),
      square: this._config.square
    });
    return $`
      <ha-tab-group-tab
        slot="nav"
        panel=${e}
        @action=${l}
        .actionHandler=${d}
      >
        <div class="entity ${ht(h)}">
          <div class="entity-icon" style=${J(u)}>
            <ha-icon icon=${this.getCustomIcon(t, e)}></ha-icon>
          </div>
          <div class="entity-info">
            ${this.hide_content_name ? "" : $`<div class="entity-name">
                  ${this.getCustomName(t, e) || this.computeLabel({ name: e })}
                </div>`}
            <div class="entity-state">
              ${this._shouldShowTotalNumbers(t, e) ? `${s.length}/${o.length} ${this.getStatusProperty(
      t,
      e
    )}` : this._shouldShowTotalEntities(t, e) ? `${o.length}` : `${s.length} ${this.getStatusProperty(
      t,
      e
    )}`}
            </div>
          </div>
        </div>
      </ha-tab-group-tab>
    `;
  }
  renderTab(i) {
    switch (i.type) {
      case "extra":
        return this.renderExtraTab(i);
      case "group":
        return this.renderGroupTab(i.ruleset, i.order);
      case "domain":
        return this.renderDomainTab(i);
      case "deviceClass":
        return this.renderDeviceClassTab(i);
    }
  }
  render() {
    const i = this.getExtraItems(), t = this.getGroupItems(), e = this.getDomainItems(), s = this.getDeviceClassItems(), o = this._computeSortedEntities(
      i,
      t,
      e,
      s
    ), n = this.getPersonItems(), a = this._config.hide_card_if_empty ?? !1;
    let c = !1;
    if (n && n.length > 0 && (c = !0), !c && i && i.length > 0 && (c = !0), !c && t && t.length > 0)
      for (const l of t) {
        const d = $t(this, l.ruleset);
        if (d && d.length > 0) {
          c = !0;
          break;
        }
      }
    if (!c && e && e.length > 0)
      for (const l of e) {
        const d = this.selectedDeviceClass || void 0, u = this._shouldShowTotalEntities(l.domain, d) ? this._totalEntities(l.domain, d) : this._isOn(l.domain, d);
        if (u && u.length > 0) {
          c = !0;
          break;
        }
      }
    if (!c && s && s.length > 0)
      for (const l of s) {
        const d = l.deviceClass, h = l.domain, f = this._shouldShowTotalEntities(h, d) ? this._totalEntities(h, d) : this._isOn(h, d);
        if (f && f.length > 0) {
          c = !0;
          break;
        }
      }
    if (!c && a) {
      try {
        this.setAttribute("hidden", "");
      } catch {
      }
      return $``;
    }
    try {
      this.hasAttribute("hidden") && this.removeAttribute("hidden");
    } catch {
    }
    const r = {
      "no-scroll": !!this._config.no_scroll
    };
    return $`
      <ha-card>
        <ha-tab-group without-scroll-controls class=${ht(r)}>
          <ha-tab-group-tab style="display:none" active></ha-tab-group-tab>
          ${tt(
      n,
      (l) => l.entity_id,
      (l) => {
        var m, y;
        const d = this.hass.states[l.entity_id], h = (d == null ? void 0 : d.state) !== "home", u = {
          horizontal: this._config.content_layout === "horizontal"
        }, f = {
          "border-radius": (m = this._config) != null && m.square ? "20%" : "50%",
          filter: h ? "grayscale(100%)" : "none"
        };
        return $`
                <ha-tab-group-tab
                  slot="nav"
                  panel=${l.entity_id}
                  @click="${() => this.showMoreInfo(l)}"
                >
                  <div class="entity ${ht(u)}">
                    <div class="entity-icon" style=${J(f)}>
                      ${l.attributes.entity_picture ? $`<img
                            src=${l.attributes.entity_picture}
                            alt=${l.attributes.friendly_name || l.entity_id}
                            style=${J(f)}
                          />` : $`<ha-icon
                            class="center"
                            icon=${l.attributes.icon || "mdi:account"}
                            style=${J(f)}
                          ></ha-icon>`}
                    </div>
                    <div class="entity-info">
                      ${this.hide_content_name ? "" : $`<div class="entity-name">
                            ${((y = l.attributes.friendly_name) == null ? void 0 : y.split(" ")[0]) || ""}
                          </div>`}
                      <div class="entity-state">
                        ${this.getStatusProperty(
          "person",
          void 0,
          d == null ? void 0 : d.state
        )}
                      </div>
                    </div>
                  </div>
                </ha-tab-group-tab>
              `;
      }
    )}
          ${tt(
      o,
      (l) => l.type === "extra" ? l.panel : l.type === "domain" ? l.domain : l.type === "deviceClass" ? `${l.domain}-${l.deviceClass}` : l.type === "group" ? `group-${l.group_id}` : "",
      (l) => this.renderTab(l)
    )}
        </ha-tab-group>
      </ha-card>
    `;
  }
  static get styles() {
    return pt`
      ha-card {
        overflow: hidden;
        position: relative;
        height: 100%;
        align-content: center;
      }
      ha-tab-group {
        --track-width: unset !important;
        padding: 6px 4px;
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
        overflow: hidden;
      }
      .entity-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgba(var(--rgb-primary-text-color), 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
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
    `;
  }
  static getConfigElement() {
    return document.createElement("status-card-editor");
  }
  static getStubConfig() {
    return {};
  }
};
j([
  E({ attribute: !1 })
], P.prototype, "hass", 2);
j([
  E({ type: Object })
], P.prototype, "_config", 2);
j([
  O()
], P.prototype, "entitiesByDomain", 2);
j([
  O()
], P.prototype, "selectedDomain", 2);
j([
  O()
], P.prototype, "selectedDeviceClass", 2);
j([
  O()
], P.prototype, "hiddenEntities", 2);
j([
  O()
], P.prototype, "hiddenLabels", 2);
j([
  O()
], P.prototype, "hiddenAreas", 2);
j([
  O()
], P.prototype, "hide_person", 2);
j([
  O()
], P.prototype, "hide_content_name", 2);
j([
  O()
], P.prototype, "list_mode", 2);
j([
  O()
], P.prototype, "selectedGroup", 2);
P = j([
  Tt("status-card")
], P);
var Li = Object.defineProperty, Mi = Object.getOwnPropertyDescriptor, Pt = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? Mi(t, e) : t, n = i.length - 1, a; n >= 0; n--)
    (a = i[n]) && (o = (s ? a(t, e, o) : a(o)) || o);
  return s && o && Li(t, e, o), o;
};
class Qt extends V {
  constructor() {
    super(...arguments), this.SelectOptions = [], this._entityKeys = /* @__PURE__ */ new WeakMap();
  }
  _getKey(t) {
    return this._entityKeys.has(t) || this._entityKeys.set(t, Math.random().toString()), this._entityKeys.get(t);
  }
  render() {
    if (!this.hass)
      return z;
    const t = new Set(
      (this.customizationkey || []).map((s) => s.type)
    ), e = this.SelectOptions.filter(
      (s) => !t.has(s.value)
    );
    return $`
      <div class="customization">
        ${this.customizationkey && tt(
      this.customizationkey,
      (s) => this._getKey(s),
      (s, o) => {
        var n;
        return $`
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
                .path=${Yt}
                class="remove-icon"
                .index=${o}
                @click=${this._removeRow}
              ></ha-icon-button>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.edit")}
                .path=${mi}
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
            ${e.map(
      (s) => $`<mwc-list-item .value=${s.value}
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
    const e = t.detail.value, s = t.target.index, o = this.customizationkey.concat();
    o[s] = { ...o[s], type: e || "" }, T(this, "config-changed", o);
  }
  _removeRow(t) {
    t.stopPropagation();
    const e = t.currentTarget.index;
    if (e != null) {
      const s = this.customizationkey.concat();
      s.splice(e, 1), T(this, "config-changed", s);
    }
  }
  _editRow(t) {
    t.stopPropagation();
    const e = t.target.index;
    e != null && T(this, "edit-item", e);
  }
  _addRow(t) {
    if (t.stopPropagation(), !this.customizationkey || !this.hass)
      return;
    const e = this.shadowRoot.querySelector(
      ".add-customization"
    );
    if (!e || !e.value)
      return;
    const o = { type: e.value };
    T(this, "config-changed", [
      ...this.customizationkey,
      o
    ]), e.value = "";
  }
  static get styles() {
    return pt`
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
Pt([
  E({ attribute: !1 })
], Qt.prototype, "hass", 2);
Pt([
  E({ type: Array })
], Qt.prototype, "SelectOptions", 2);
let Gt = class extends Qt {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customizationkey() {
    return this.customization;
  }
};
Pt([
  E({ attribute: !1 })
], Gt.prototype, "customization", 2);
Gt = Pt([
  Tt("status-items-editor")
], Gt);
var Hi = Object.defineProperty, Pi = Object.getOwnPropertyDescriptor, ot = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? Pi(t, e) : t, n = i.length - 1, a; n >= 0; n--)
    (a = i[n]) && (o = (s ? a(t, e, o) : a(o)) || o);
  return s && o && Hi(t, e, o), o;
};
let W = class extends V {
  constructor() {
    super(...arguments), this.useSensorSchema = !1, this._schemadomain = A(() => {
      const i = [
        "more-info",
        "toggle",
        "navigate",
        "url",
        "perform-action",
        "none"
      ];
      return [
        { name: "invert", selector: { boolean: {} } },
        { name: "show_total_number", selector: { boolean: {} } },
        { name: "show_total_entities", selector: { boolean: {} } },
        { name: "name", selector: { text: {} } },
        { name: "icon", selector: { icon: {} } },
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
        },
        { name: "tap_action", selector: { ui_action: { actions: i } } },
        { name: "double_tap_action", selector: { ui_action: { actions: i } } },
        { name: "hold_action", selector: { ui_action: { actions: i } } },
        { name: "popup_card", selector: { object: {} } }
      ];
    }), this._schemaEntity = A(() => {
      var e;
      const i = ((e = this.config) == null ? void 0 : e.type) || "", t = [
        "more-info",
        "toggle",
        "navigate",
        "url",
        "perform-action",
        "none"
      ];
      return [
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
                      label: this.hass.localize(
                        "ui.panel.lovelace.editor.condition-editor.condition.state.state_equal"
                      ),
                      value: "false"
                    },
                    {
                      label: this.hass.localize(
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
              selector: { state: { entity_id: i } }
            }
          ]
        },
        {
          name: "state_content",
          selector: { ui_state_content: { entity_id: i } }
        },
        { name: "name", selector: { text: {} } },
        { name: "show_entity_picture", selector: { boolean: {} } },
        { name: "icon", selector: { icon: {} } },
        {
          name: "icon_color",
          selector: { ui_color: { default_color: "state", include_state: !0 } }
        },
        {
          name: "background_color",
          selector: {
            color_rgb: { default_color: "state", include_state: !0 }
          }
        },
        { name: "tap_action", selector: { ui_action: { actions: t } } },
        { name: "double_tap_action", selector: { ui_action: { actions: t } } },
        { name: "hold_action", selector: { ui_action: { actions: t } } }
      ];
    });
  }
  render() {
    var e, s;
    if (!this.hass || !this.config)
      return $``;
    (e = this._config) != null && e.invert_state || (this._config = {
      ...this._config,
      type: ((s = this._config) == null ? void 0 : s.type) ?? this.config.type ?? "",
      invert_state: this.config.invert_state || "false",
      icon_color: this.config.icon_color || void 0,
      tap_action: this.config.tap_action || void 0,
      double_tap_action: this.config.double_tap_action || void 0,
      hold_action: this.config.hold_action || void 0
    });
    let i;
    switch (this.getSchema) {
      case "domain":
        i = this._schemadomain();
        break;
      case "entity":
        i = this._schemaEntity();
        break;
    }
    const t = {
      ...this._config
    };
    return $`
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${i}
        .computeLabel=${(o) => Ht(this.hass, o)}
        @value-changed=${this._valueChangedSchema}
      ></ha-form>
    `;
  }
  _valueChangedSchema(i) {
    if (!this.config)
      return;
    i.stopPropagation();
    const t = {
      ...this.config,
      ...i.detail.value
    };
    this._config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: t
      })
    );
  }
  setConfig(i) {
    this._config = {
      ...i,
      customization: i.customization ?? []
    };
  }
  static get styles() {
    return pt`
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
      }
      .side-by-side > * {
        flex: 1 1 0%;
        padding-right: 4px;
      }
    `;
  }
};
ot([
  E({ attribute: !1 })
], W.prototype, "config", 2);
ot([
  E({ attribute: !1 })
], W.prototype, "hass", 2);
ot([
  E({ attribute: !1 })
], W.prototype, "lovelace", 2);
ot([
  E({ type: Boolean })
], W.prototype, "useSensorSchema", 2);
ot([
  E({ type: Number })
], W.prototype, "index", 2);
ot([
  O()
], W.prototype, "getSchema", 2);
ot([
  O()
], W.prototype, "_config", 2);
W = ot([
  Tt("status-item-editor")
], W);
var Ii = Object.defineProperty, ji = Object.getOwnPropertyDescriptor, dt = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? ji(t, e) : t, n = i.length - 1, a; n >= 0; n--)
    (a = i[n]) && (o = (s ? a(t, e, o) : a(o)) || o);
  return s && o && Ii(t, e, o), o;
};
let st = class extends V {
  constructor() {
    super(...arguments), this._subElementEditorDomain = void 0, this._subElementEditorEntity = void 0, this.rulesets = [
      {
        group_id: "",
        group_icon: "",
        group_status: "",
        rules: [{ key: "", value: "" }]
      }
    ], this.computeLabel = A(
      (i, t, e) => Ht(this.hass, i, t, e)
    ), this._filterInitialized = !1, this._lastFilter = {
      area: [],
      floor: [],
      label: []
    }, this._groupPreviousIds = /* @__PURE__ */ new Map(), this._schema = A(
      (i, t, e, s) => {
        const o = this.computeLabel({ name: "area" }), n = this.computeLabel({ name: "floor" }), a = this.computeLabel({ name: "name" }), c = this.computeLabel({ name: "state" }), r = [
          "more-info",
          "toggle",
          "navigate",
          "url",
          "perform-action",
          "none"
        ];
        return [
          {
            name: "appearance",
            flatten: !0,
            type: "expandable",
            icon: "mdi:palette",
            schema: [
              {
                name: "",
                type: "grid",
                schema: [
                  { name: "hide_person", selector: { boolean: {} } },
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
                  }
                ]
              },
              {
                name: "",
                type: "grid",
                schema: [
                  { name: "theme", required: !1, selector: { theme: {} } }
                ]
              },
              {
                name: "content_layout",
                required: !0,
                selector: {
                  select: {
                    mode: "box",
                    options: ["vertical", "horizontal"].map((l) => ({
                      label: this.hass.localize(
                        `ui.panel.lovelace.editor.card.tile.content_layout_options.${l}`
                      ),
                      value: l,
                      image: {
                        src: `/static/images/form/tile_content_layout_${l}.svg`,
                        src_dark: `/static/images/form/tile_content_layout_${l}_dark.svg`,
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
              },
              { name: "tap_action", selector: { ui_action: { actions: r } } },
              { name: "double_tap_action", selector: { ui_action: { actions: r } } },
              { name: "hold_action", selector: { ui_action: { actions: r } } }
            ]
          },
          {
            name: "edit_filters",
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
                          { value: "area", label: o },
                          { value: "floor", label: n }
                        ]
                      }
                    }
                  },
                  { name: "label_filter", selector: { boolean: {} } }
                ]
              },
              ...i === "area" && e === !1 ? [
                { name: "multiple_areas", selector: { boolean: {} } },
                { name: "area", selector: { area: {} } }
              ] : [],
              ...i === "area" && e === !0 ? [
                { name: "multiple_areas", selector: { boolean: {} } },
                { name: "area", selector: { area: { multiple: !0 } } }
              ] : [],
              ...i === "floor" && s === !1 ? [
                { name: "multiple_floors", selector: { boolean: {} } },
                { name: "floor", selector: { floor: {} } }
              ] : [],
              ...i === "floor" && s === !0 ? [
                { name: "multiple_floors", selector: { boolean: {} } },
                { name: "floor", selector: { floor: { multiple: !0 } } }
              ] : [],
              ...t ? [
                { name: "label", selector: { label: { multiple: !0 } } }
              ] : []
            ]
          },
          {
            name: "popup",
            flatten: !0,
            type: "expandable",
            icon: "mdi:arrange-bring-forward",
            schema: [
              {
                name: "ungroup_areas",
                selector: { boolean: {} }
              },
              {
                name: "popup_sort",
                selector: {
                  select: {
                    options: [
                      { value: "name", label: a },
                      { value: "state", label: c }
                    ]
                  }
                }
              },
              { name: "list_mode", selector: { boolean: {} } },
              {
                name: "columns",
                required: !1,
                selector: { number: { min: 1, max: 4, mode: "box" } }
              }
            ]
          }
        ];
      }
    ), this._toggleschema = A((i) => [
      {
        name: "content",
        selector: {
          select: {
            reorder: !0,
            multiple: !0,
            custom_value: !0,
            options: i
          }
        }
      }
    ]), this._entitiesSchema = A((i) => {
      const t = this.computeLabel({ name: "area" }), e = this.computeLabel({ name: "label" }), s = this.computeLabel({ name: "entity" });
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
                    { value: "label", label: e },
                    { value: "area", label: t }
                  ]
                }
              }
            }
          ]
        },
        ...i === "label" ? [
          {
            name: "hidden_labels",
            selector: { label: { multiple: !0 } }
          }
        ] : [],
        ...i === "area" ? [
          {
            name: "hidden_areas",
            selector: { area: { multiple: !0 } }
          }
        ] : []
      ];
    }), this._buildToggleOptions = A(
      (i, t) => this._buildOptions("toggle", i, t)
    ), this._memoizedClassesForArea = A(
      (i, t, e) => this._classesForArea(i, t, e)
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
    }, this._removeRuleset = (i) => {
      this.rulesets = this.rulesets.filter((t, e) => e !== i), this._updateConfigFromRulesets();
    }, this._toggleEntityHidden = (i) => {
      var s;
      const t = new Set(((s = this._config) == null ? void 0 : s.hidden_entities) ?? []);
      t.has(i) ? t.delete(i) : t.add(i);
      const e = Array.from(t);
      this._config = {
        ...this._config || {},
        hidden_entities: e
      }, T(this, "config-changed", { config: { ...this._config } });
    };
  }
  setConfig(i) {
    this._config = {
      ...i,
      columns: i.columns ?? 4,
      hide_person: i.hide_person ?? !1,
      list_mode: i.list_mode ?? !1,
      hide_content_name: i.hide_content_name ?? !1,
      customization: i.customization ?? []
    }, Array.isArray(this._config.content) && (this._config = {
      ...this._config,
      content: this._config.content.map(
        (t) => this._normalizeContentEntry(t)
      )
    }), this._loadRulesetsFromConfig();
  }
  _updateAreaFloorInConfig() {
    if (!this._config || !this._config.filter) return;
    this._config.filter === "area" && this._config.floor !== void 0 ? (delete this._config.floor, T(this, "config-changed", { config: { ...this._config } })) : this._config.filter === "floor" && this._config.area !== void 0 && (delete this._config.area, T(this, "config-changed", { config: { ...this._config } }));
  }
  async updated(i) {
    super.updated(i);
    let t = !1;
    if (!(!this.hass || !this._config) && i.has("_config")) {
      if (this._updateAreaFloorInConfig(), (this._config.label_filter === !1 && this._config.label !== void 0 || Array.isArray(this._config.label) && this._config.label.length === 0) && (delete this._config.label, t = !0), this._config.hide_filter && !["entity", "label", "area"].includes(this._config.hide_filter)) {
        const _ = (/* @__PURE__ */ new Map([
          [this.computeLabel({ name: "entity" }), "entity"],
          [this.computeLabel({ name: "label" }), "label"],
          [this.computeLabel({ name: "area" }), "area"]
        ])).get(this._config.hide_filter);
        _ && (this._config = { ...this._config, hide_filter: _ }, t = !0);
      }
      const e = i.get("_config"), s = (e == null ? void 0 : e.extra_entities) ?? [], o = this._config.extra_entities ?? [], n = (e == null ? void 0 : e.content) ?? [], a = this._config.content ?? [], c = Array.isArray(this._config.area) ? [...this._config.area] : this._config.area ? [this._config.area] : [], r = Array.isArray(this._config.floor) ? [...this._config.floor] : this._config.floor ? [this._config.floor] : [], l = Array.isArray(this._config.label) ? [...this._config.label] : [];
      this._filterInitialized || (this._lastFilter = {
        area: c,
        floor: r,
        label: l
      }, this._filterInitialized = !0);
      const d = this._lastFilter.area, h = this._lastFilter.floor, u = this._lastFilter.label, f = !X(u, l), m = !X(h, r);
      if (!X(d, c) || m || f) {
        const p = this.possibleToggleDomains, _ = [];
        for (const b of Object.keys(q)) {
          const g = q[b];
          for (const v of Object.keys(g))
            v !== "on" && v !== "off" && _.push(`${b} - ${v}`);
          _.push(b);
        }
        const C = p.map((b) => this._normalizeContentEntry(b)).sort((b, g) => {
          const v = _.indexOf(b), B = _.indexOf(g);
          return (v === -1 ? _.length : v) - (B === -1 ? _.length : B);
        });
        this._config = {
          ...this._config,
          content: [...C]
        }, this._lastFilter = {
          area: [...c],
          floor: [...r],
          label: [...l]
        }, t = !0;
      }
      if (this._config.rulesets && Array.isArray(this._config.rulesets)) {
        const p = this._config.rulesets.filter(
          (g) => Object.keys(g).some(
            (v) => v !== "group_id" && v !== "group_icon" && v !== "group_status" && g[v] !== void 0 && g[v] !== ""
          )
        ).map((g) => g.group_id).filter((g) => g && g.length > 1);
        let _ = Array.isArray(this._config.content) ? [...this._config.content] : [];
        _ = _.filter((g) => !p.includes(g));
        const C = this._config.extra_entities ?? [];
        let b = 0;
        for (let g = 0; g < _.length; g++) {
          if (!C.includes(_[g])) {
            b = g;
            break;
          }
          b = g + 1;
        }
        _ = [
          ..._.slice(0, b),
          ...p.filter((g) => !_.includes(g)),
          ..._.slice(b)
        ], X(_, this._config.content ?? []) || (this._config = {
          ...this._config,
          content: _
        }, t = !0);
      }
      if (!X(s, o)) {
        let p = [...a];
        o.forEach((_) => {
          p.includes(_) || p.unshift(_);
        }), p = p.filter(
          (_) => !_.includes(".") || o.includes(_)
        ), X(p, a) || (this._config = {
          ...this._config,
          content: p
        }, t = !0);
      }
      if (!X(n, a)) {
        let p = [...o];
        p = p.filter((_) => a.includes(_)), X(p, o) || (this._config = {
          ...this._config,
          extra_entities: p
        }, t = !0);
      }
      t && (T(this, "config-changed", { config: { ...this._config } }), this.requestUpdate());
    }
  }
  getGroupSchema(i) {
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
      ...i.rules.map((t, e) => {
        const s = i.rules.map((n, a) => a !== e ? n.key : null).filter((n) => n), o = this.ruleKeySelector.options.filter(
          ([n]) => !s.includes(n) || n === t.key
        );
        return {
          type: "grid",
          schema: [
            {
              type: "select",
              name: `key_${e}`,
              options: o
            },
            {
              name: `value_${e}`,
              selector: this.filterValueSelector[t.key] ?? { text: {} }
            }
          ]
        };
      })
    ];
  }
  _valueChanged(i) {
    const t = i.detail.value;
    Array.isArray(t == null ? void 0 : t.content) && (t.content = t.content.map(
      (e) => this._normalizeContentEntry(e)
    )), this._config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config }
      })
    );
  }
  get possibleToggleDomains() {
    var i, t, e;
    return this._memoizedClassesForArea(
      ((i = this._config) == null ? void 0 : i.area) || [],
      ((t = this._config) == null ? void 0 : t.floor) || [],
      ((e = this._config) == null ? void 0 : e.label) || []
    );
  }
  get toggleSelectOptions() {
    var i;
    return this._buildToggleOptions(
      this.possibleToggleDomains,
      ((i = this._config) == null ? void 0 : i.content) || []
    );
  }
  get contentSelectOptions() {
    const i = this._config.content ?? [];
    return this._buildOptions("toggle", i, i);
  }
  _parseTypePair(i) {
    const t = i.match(/^(.+?)\s*-\s*(.+)$/);
    if (!t) return null;
    const e = t[1].toLowerCase().replace(/\s+/g, "_"), s = t[2].toLowerCase();
    return { domain: e, deviceClass: s };
  }
  _normalizeContentEntry(i) {
    if (i.includes(".")) return i;
    const t = this._parseTypePair(i);
    if (t) {
      const { domain: s, deviceClass: o } = t;
      return q[s] || Y.includes(s) ? `${s} - ${o}` : i;
    }
    const e = i.trim().toLowerCase().replace(/\s+/g, "_");
    return q[e] || Y.includes(e) ? e : i;
  }
  _labelForTypePair(i) {
    var e, s, o;
    if (i.includes(".")) {
      const n = (s = (e = this.hass) == null ? void 0 : e.states) == null ? void 0 : s[i];
      return ((o = n == null ? void 0 : n.attributes) == null ? void 0 : o.friendly_name) || i;
    }
    const t = this._parseTypePair(i);
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
    return i === "scene" ? "Scene" : this.hass.localize(`component.${i}.entity_component._.name`) || i;
  }
  _classesForArea(i, t, e) {
    var l;
    const s = ((l = this._config) == null ? void 0 : l.extra_entities) || [];
    let o = Object.values(this.hass.entities).filter(
      (d) => !d.hidden && Y.includes(R(d.entity_id))
    );
    if (i && i.length > 0)
      o = o.filter(
        (d) => {
          var h;
          return i.includes(d.area_id) || d.device_id && i.includes((h = this.hass.devices[d.device_id]) == null ? void 0 : h.area_id);
        }
      );
    else if (t && t.length > 0) {
      const d = Object.values(this.hass.areas).filter(
        (h) => h.floor_id !== void 0 && t.includes(h.floor_id)
      ).map((h) => h.area_id);
      o = o.filter(
        (h) => {
          var u;
          return h.area_id !== void 0 && d.includes(h.area_id) || h.device_id && ((u = this.hass.devices[h.device_id]) == null ? void 0 : u.area_id) !== void 0 && d.includes(
            this.hass.devices[h.device_id].area_id
          );
        }
      );
    }
    e && e.length > 0 && (o = o.filter(
      (d) => {
        var h, u;
        return ((h = d.labels) == null ? void 0 : h.some((f) => e.includes(f))) || d.device_id && Array.isArray((u = this.hass.devices[d.device_id]) == null ? void 0 : u.labels) && this.hass.devices[d.device_id].labels.some(
          (f) => e.includes(f)
        );
      }
    ));
    const n = [];
    for (const d of Object.keys(q)) {
      const h = q[d];
      for (const u of Object.keys(h))
        u !== "on" && u !== "off" && n.push(`${d} - ${u}`);
      n.push(d);
    }
    const a = new Set(
      o.map((d) => R(d.entity_id)).filter((d) => d !== "binary_sensor" && d !== "cover" && d !== "switch").map((d) => d)
    ), c = /* @__PURE__ */ new Set();
    o.filter(
      (d) => ["binary_sensor", "cover", "switch"].includes(
        R(d.entity_id)
      )
    ).forEach((d) => {
      var f;
      const h = R(d.entity_id), u = ((f = this.hass.states[d.entity_id]) == null ? void 0 : f.attributes.device_class) || "";
      u && c.add(`${h} - ${u}`);
    });
    const r = [...c];
    return [...a, ...r, ...s].sort(
      (d, h) => {
        const u = n.indexOf(d), f = n.indexOf(h);
        return (u === -1 ? n.length : u) - (f === -1 ? n.length : f);
      }
    );
  }
  _buildOptions(i, t, e) {
    var c;
    const s = [.../* @__PURE__ */ new Set([...t, ...e])], o = ((c = this.hass) == null ? void 0 : c.states) || {}, n = /* @__PURE__ */ new Map(), a = s.map((r) => {
      var d, h;
      if (n.has(r))
        return { value: r, label: n.get(r) };
      let l;
      return r.includes(".") ? l = ((h = (d = o[r]) == null ? void 0 : d.attributes) == null ? void 0 : h.friendly_name) || r : r === "scene" ? l = "Scene" : l = this._labelForTypePair(r), n.set(r, l), { value: r, label: l };
    });
    return a.sort((r, l) => {
      const d = r.value.includes("."), h = l.value.includes(".");
      return d && !h ? -1 : !d && h ? 1 : Oe(
        r.label,
        l.label,
        this.hass.locale.language
      );
    }), a;
  }
  _itemChanged(i, t, e) {
    if (i.stopPropagation(), !this._config || !this.hass)
      return;
    const s = t == null ? void 0 : t.index;
    if (s != null) {
      const o = [...this._config.customization ?? []];
      o[s] = i.detail, T(this, "config-changed", {
        config: { ...this._config, customization: o }
      });
    }
  }
  _editItem(i, t) {
    if (i.stopPropagation(), !this._config || !this.hass)
      return;
    const e = i.detail;
    this[`_subElementEditor${t}`] = { index: e };
  }
  _edit_itemDomain(i) {
    const t = i.detail, s = (this._config.customization ?? [])[t];
    let o;
    s && s.type && s.type.includes(".") ? o = "Entity" : o = "Domain", this._editItem(i, o);
  }
  _itemChangedDomain(i) {
    this._itemChanged(i, this._subElementEditorDomain, "customization");
  }
  _itemChangedEntity(i) {
    this._itemChanged(i, this._subElementEditorEntity, "customization");
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
  _renderSubElementEditor(i, t, e) {
    var c, r, l, d, h;
    const s = `_subElementEditor${i.charAt(0).toUpperCase() + i.slice(1)}`, o = this[s], n = ((l = (r = (c = this._config) == null ? void 0 : c.customization) == null ? void 0 : r[(o == null ? void 0 : o.index) ?? 0]) == null ? void 0 : l.type) ?? "unknown", a = this._labelForTypePair(n);
    return $`
      <div class="header">
        <div class="back-title">
          <ha-icon-button
            slot="trigger"
            .label=${this.hass.localize("ui.common.back")}
            .path=${hi}
            @click=${t}
          ></ha-icon-button>
          <span slot="title">${a}</span>
        </div>
      </div>
      <status-item-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .config=${((h = (d = this._config) == null ? void 0 : d.customization) == null ? void 0 : h[(o == null ? void 0 : o.index) ?? 0]) ?? {}}
        .getSchema=${i}
        .index=${(o == null ? void 0 : o.index) ?? 0}
        @config-changed=${e}
      >
      </status-item-editor>
    `;
  }
  _customizationChanged(i, t) {
    i.stopPropagation(), !(!this._config || !this.hass) && T(this, "config-changed", {
      config: {
        ...this._config,
        customization: i.detail
      }
    });
  }
  _customizationChangedDomain(i) {
    this._customizationChanged(i, "domain");
  }
  _loadRulesetsFromConfig() {
    this.rulesets = (this._config.rulesets ?? []).map((i) => {
      var e;
      const t = Object.keys(i).filter(
        (s) => s !== "group_id" && s !== "group_icon" && s !== "group_status" && i[s] !== void 0
      ).map((s) => ({
        key: s,
        value: i[s] ?? ""
      }));
      return (t.length === 0 || ((e = t[t.length - 1]) == null ? void 0 : e.key) !== "") && t.push({ key: "", value: "" }), {
        group_id: i.group_id ?? "",
        group_icon: i.group_icon ?? "",
        group_status: i.group_status ?? "",
        rules: t
      };
    }), this._groupPreviousIds.clear(), this.rulesets.forEach(
      (i, t) => this._groupPreviousIds.set(t, i.group_id || "")
    );
  }
  _commitRulesets() {
    var n;
    const i = this.rulesets.map((a) => {
      const c = a.rules.reduce((r, l) => (l.key && l.key !== "" && (r[l.key] = l.value ?? ""), r), {});
      return {
        group_id: a.group_id ?? "",
        group_icon: a.group_icon ?? "",
        group_status: a.group_status ?? "",
        ...c
      };
    }), t = Array.isArray((n = this._config) == null ? void 0 : n.content) ? [...this._config.content] : [], e = /* @__PURE__ */ new Map();
    i.forEach((a, c) => {
      const r = a.group_id ?? "", l = this._groupPreviousIds.get(c) ?? "";
      l && l !== r && e.set(l, r);
    });
    const s = /* @__PURE__ */ new Set(), o = [];
    for (const a of t) {
      const c = e.get(a) ?? a;
      s.has(c) || (s.add(c), o.push(c));
    }
    this._config = {
      ...this._config,
      rulesets: i,
      content: o
    }, this._groupPreviousIds.clear(), i.forEach(
      (a, c) => this._groupPreviousIds.set(c, a.group_id ?? "")
    ), T(this, "config-changed", { config: this._config });
  }
  _updateConfigFromRulesets() {
    this._commitRulesets();
  }
  get ruleKeySelector() {
    const i = [
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
    return i.sort((t, e) => t[1].localeCompare(e[1], this.hass.locale.language)), {
      type: "select",
      options: i
    };
  }
  _groupFormData(i) {
    const t = {
      group_id: i.group_id,
      group_icon: i.group_icon,
      group_status: i.group_status ?? ""
    };
    return i.rules.forEach((e, s) => {
      t[`key_${s}`] = e.key, t[`value_${s}`] = e.value;
    }), t;
  }
  _groupValueChanged(i, t) {
    var r;
    const { value: e } = i.detail, s = Object.keys(e).filter((l) => l.startsWith("key_")).map((l) => {
      const d = l.split("_")[1];
      return {
        key: e[`key_${d}`] ?? "",
        value: e[`value_${d}`] ?? ""
      };
    });
    (s.length === 0 || ((r = s[s.length - 1]) == null ? void 0 : r.key) !== "") && s.push({ key: "", value: "" });
    const o = {
      group_id: e.group_id ?? "",
      group_icon: e.group_icon ?? "",
      group_status: e.group_status ?? "",
      rules: s
    };
    this.rulesets = this.rulesets.map(
      (l, d) => d === t ? o : l
    );
    const n = this.rulesets[t] ?? {
      group_id: "",
      group_icon: "",
      group_status: "",
      rules: []
    }, a = this._groupFormData(n);
    if (!Object.keys(e).some((l) => l === "group_id" ? !1 : e[l] !== a[l])) {
      this._groupDrafts.add(t);
      return;
    }
    this._groupDrafts.delete(t), this._updateConfigFromRulesets();
  }
  _groupFormBlur(i) {
    this._groupDrafts.has(i) && (this._groupDrafts.delete(i), this._updateConfigFromRulesets());
  }
  _groupAllEntitiesByDomain() {
    var d, h, u, f, m, y, p, _, C, b, g, v, B;
    const i = Object.values(((d = this.hass) == null ? void 0 : d.entities) || {}), t = Object.values(((h = this.hass) == null ? void 0 : h.devices) || {}), e = (u = this.hass) != null && u.areas ? Object.values(this.hass.areas) : [], s = {
      area: Array.isArray((f = this._config) == null ? void 0 : f.area) ? this._config.area : (m = this._config) != null && m.area ? [this._config.area] : [],
      floor: Array.isArray((y = this._config) == null ? void 0 : y.floor) ? this._config.floor : (p = this._config) != null && p.floor ? [this._config.floor] : [],
      label: Array.isArray((_ = this._config) == null ? void 0 : _.label) ? this._config.label : [],
      hiddenAreas: ((C = this._config) == null ? void 0 : C.hidden_areas) ?? [],
      hiddenLabels: ((b = this._config) == null ? void 0 : b.hidden_labels) ?? [],
      hiddenEntities: ((g = this._config) == null ? void 0 : g.hidden_entities) ?? []
    }, o = Te(
      i,
      t,
      e,
      ((v = this.hass) == null ? void 0 : v.states) || {},
      s,
      Y
    ), n = Object.fromEntries(
      Object.entries(o).map(([x, k]) => [
        x,
        k.map((L) => L.entity_id)
      ])
    ), a = this._hiddenEntitiesByDomain(), c = ((B = this.hass) == null ? void 0 : B.states) || {}, r = Array.from(
      /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(a)])
    ).filter((x) => Y.includes(x)), l = Dt(
      c,
      this.hass.locale.language
    );
    return r.sort((x, k) => x.localeCompare(k)).map((x) => {
      const k = /* @__PURE__ */ new Set([
        ...n[x] || [],
        ...a[x] || []
      ]);
      return { domain: x, entities: Array.from(k).sort(l) };
    });
  }
  _domainLabel(i) {
    var t, e;
    return ((e = (t = this.hass) == null ? void 0 : t.localize) == null ? void 0 : e.call(t, `component.${i}.entity_component._.name`)) || i;
  }
  _isHiddenEntity(i) {
    var e;
    const t = ((e = this._config) == null ? void 0 : e.hidden_entities) ?? [];
    return Array.isArray(t) && t.includes(i);
  }
  _getDeviceClassLabel(i, t) {
    if (!t || t === "other")
      return this.hass.localize("ui.dialogs.helper_settings.generic.other") ?? "Other";
    const e = `ui.dialogs.entity_registry.editor.device_classes.${i}.${t}`;
    return this.hass.localize(e) || t;
  }
  _groupByDeviceClass(i, t) {
    var a, c, r;
    const e = ((a = this.hass) == null ? void 0 : a.states) || {}, s = {};
    for (const l of t) {
      const d = ((r = (c = e[l]) == null ? void 0 : c.attributes) == null ? void 0 : r.device_class) || "";
      d && (s[d] || (s[d] = []), s[d].push(l));
    }
    const o = Dt(
      e,
      this.hass.locale.language
    );
    return Object.keys(s).sort((l, d) => l.localeCompare(d)).map((l) => ({
      deviceClass: l,
      label: this._getDeviceClassLabel(i, l),
      entities: s[l].slice().sort(o)
    }));
  }
  _hiddenEntitiesByDomain() {
    var h, u, f, m, y, p, _;
    const i = {}, t = Array.isArray((h = this._config) == null ? void 0 : h.hidden_entities) ? this._config.hidden_entities : [];
    if (t.length === 0) return i;
    const e = ((u = this.hass) == null ? void 0 : u.entities) || {}, s = ((f = this.hass) == null ? void 0 : f.devices) || {}, o = (m = this.hass) != null && m.areas ? Object.values(this.hass.areas) : [], n = (y = this._config) == null ? void 0 : y.area, a = (p = this._config) == null ? void 0 : p.floor, c = (_ = this._config) == null ? void 0 : _.label, r = n ? Array.isArray(n) ? n : [n] : [], l = a ? Array.isArray(a) ? a : [a] : [], d = c ? Array.isArray(c) ? c : [c] : [];
    for (const C of t) {
      const b = R(C);
      if (!Y.includes(b)) continue;
      const g = e[C], v = g != null && g.device_id ? s[g.device_id] : void 0;
      if (((g == null ? void 0 : g.area_id) != null || (v == null ? void 0 : v.area_id) != null) && !(d.length && !(Array.isArray(g == null ? void 0 : g.labels) && g.labels.some((k) => d.includes(k)) || Array.isArray(v == null ? void 0 : v.labels) && v.labels.some((k) => d.includes(k)))) && !(r.length && !(g != null && g.area_id && r.includes(g.area_id) || v != null && v.area_id && r.includes(v.area_id)))) {
        if (l.length) {
          const x = (g == null ? void 0 : g.area_id) && o.some(
            (L) => L.area_id === g.area_id && L.floor_id && l.includes(L.floor_id)
          ), k = (v == null ? void 0 : v.area_id) && o.some(
            (L) => L.area_id === v.area_id && L.floor_id && l.includes(L.floor_id)
          );
          if (!x && !k) continue;
        }
        i[b] || (i[b] = []), i[b].push(C);
      }
    }
    return i;
  }
  _domainIcon(i, t = "on", e) {
    const s = q;
    if (i in s) {
      const o = s[i];
      return typeof o == "string" ? o : e && o[e] ? o[e][t === "off" ? "off" : "on"] || o[e] : o[t === "off" ? "off" : "on"] || Object.values(o)[0];
    }
    return "mdi:help-circle";
  }
  render() {
    var o, n;
    if (!this.hass || !this._config)
      return $`<div>Loading...</div>`;
    const i = this._toggleschema(this.toggleSelectOptions), t = this._schema(
      this._config.filter ?? "",
      this._config.label_filter ?? !1,
      this._config.multiple_areas ?? !1,
      this._config.multiple_floors ?? !1
    ), s = {
      content: this.possibleToggleDomains,
      ...this._config
    };
    return this._subElementEditorDomain ? this._renderSubElementEditorDomain() : this._subElementEditorEntity ? this._renderSubElementEditorEntity() : $`
      <ha-form
        .hass=${this.hass}
        .data=${s}
        .schema=${t}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon class="secondary" .path=${we}></ha-svg-icon>
          ${this.hass.localize("ui.panel.lovelace.editor.card.entities.name") ?? "Entities"}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${s}
            .schema=${this._entitiesSchema(((o = this._config) == null ? void 0 : o.hide_filter) ?? "")}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>

          ${(((n = this._config) == null ? void 0 : n.hide_filter) ?? "") === "entity" ? $`
                ${this._groupAllEntitiesByDomain().map(
      (a) => $`
                    <ha-expansion-panel outlined class="domain-panel">
                      <div slot="header" class="domain-header">
                        <ha-icon
                          .icon=${this._domainIcon(a.domain, "on")}
                        ></ha-icon>
                        <span class="domain-title"
                          >${this._domainLabel(a.domain)}</span
                        >
                      </div>
                      <div class="content">
                        ${["binary_sensor", "cover"].includes(a.domain) ? this._groupByDeviceClass(
        a.domain,
        a.entities
      ).map(
        (c) => $`
                                <ha-expansion-panel
                                  outlined
                                  class="domain-panel"
                                >
                                  <div slot="header" class="dc-header">
                                    <ha-icon
                                      .icon=${this._domainIcon(
          a.domain,
          "on"
        )}
                                    ></ha-icon>
                                    <span class="dc-title">${c.label}</span>
                                  </div>
                                  <div class="content">
                                    ${c.entities.map(
          (r) => {
            var l, d;
            return $`
                                        <div class="entity-row">
                                          <span class="entity-name">
                                            ${((d = (l = this.hass.states[r]) == null ? void 0 : l.attributes) == null ? void 0 : d.friendly_name) || r}
                                          </span>
                                          <ha-icon-button
                                            .path=${this._isHiddenEntity(r) ? be : $e}
                                            .label=${this._isHiddenEntity(r) ? this.hass.localize(
              "ui.common.show"
            ) ?? "Show" : this.hass.localize(
              "ui.common.hide"
            ) ?? "Hide"}
                                            @click=${() => this._toggleEntityHidden(r)}
                                          ></ha-icon-button>
                                        </div>
                                      `;
          }
        )}
                                  </div>
                                </ha-expansion-panel>
                              `
      ) : a.entities.map(
        (c) => {
          var r, l;
          return $`
                                <div class="entity-row">
                                  <span class="entity-name">
                                    ${((l = (r = this.hass.states[c]) == null ? void 0 : r.attributes) == null ? void 0 : l.friendly_name) || c}
                                  </span>
                                  <ha-icon-button
                                    .path=${this._isHiddenEntity(c) ? be : $e}
                                    .label=${this._isHiddenEntity(c) ? this.hass.localize("ui.common.show") ?? "Show" : this.hass.localize("ui.common.hide") ?? "Hide"}
                                    @click=${() => this._toggleEntityHidden(c)}
                                  ></ha-icon-button>
                                </div>
                              `;
        }
      )}
                      </div>
                    </ha-expansion-panel>
                  `
    )}
              ` : $``}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon
            class="secondary"
            .path=${fi}
          ></ha-svg-icon>
          Smart Groups
        </div>
        <div class="content">
          ${this.rulesets.map(
      (a, c) => $`
              <ha-expansion-panel class="group-panel main" outlined>
                <div slot="header" class="group-header">
                  ${a.group_id ? a.group_id : `${this.hass.localize(
        "component.group.entity_component._.name"
      )} ${c + 1}`}
                  <span class="group-actions">
                    <ha-icon-button
                      slot="trigger"
                      .label=${this.hass.localize("ui.common.remove")}
                      .path=${Yt}
                      @click=${() => this._removeRuleset(c)}
                    ></ha-icon-button>
                  </span>
                </div>
                <div class="content">
                  <ha-form
                    .hass=${this.hass}
                    .data=${this._groupFormData(a)}
                    .schema=${this.getGroupSchema(a)}
                    .computeLabel=${this.computeLabel}
                    @value-changed=${(r) => this._groupValueChanged(r, c)}
                    @focusout=${() => this._groupFormBlur(c)}
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
          <ha-svg-icon class="secondary" .path=${we}></ha-svg-icon>
          ${this.computeLabel.bind(this)({ name: "edit_domains_dc" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${s}
            .schema=${i}
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
    `;
  }
  static get styles() {
    return pt`
      .secondary {
        color: var(--secondary-text-color);
      }
      .main {
        margin: 5px 0;
        --ha-card-border-radius: 6px;
        margin-top: 16px;
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
dt([
  E({ attribute: !1 })
], st.prototype, "hass", 2);
dt([
  E({ attribute: !1 })
], st.prototype, "lovelace", 2);
dt([
  E({ type: Object })
], st.prototype, "_config", 2);
dt([
  O()
], st.prototype, "_subElementEditorDomain", 2);
dt([
  O()
], st.prototype, "_subElementEditorEntity", 2);
dt([
  O()
], st.prototype, "rulesets", 2);
st = dt([
  Tt("status-card-editor")
], st);
console.info(
  `%c STATUS-CARD %c ${He.version} `,
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
