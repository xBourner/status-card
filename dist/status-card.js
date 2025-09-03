const De = "b2.13.2", Te = {
  version: De
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = globalThis, Ut = $t.ShadowRoot && ($t.ShadyCSS === void 0 || $t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ft = Symbol(), oe = /* @__PURE__ */ new WeakMap();
let $e = class {
  constructor(t, i, o) {
    if (this._$cssResult$ = !0, o !== Ft) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Ut && t === void 0) {
      const o = i !== void 0 && i.length === 1;
      o && (t = oe.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && oe.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Oe = (e) => new $e(typeof e == "string" ? e : e + "", void 0, Ft), ct = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce(((o, s, n) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[n + 1]), e[0]);
  return new $e(i, e, Ft);
}, Le = (e, t) => {
  if (Ut) e.adoptedStyleSheets = t.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of t) {
    const o = document.createElement("style"), s = $t.litNonce;
    s !== void 0 && o.setAttribute("nonce", s), o.textContent = i.cssText, e.appendChild(o);
  }
}, ne = Ut ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const o of t.cssRules) i += o.cssText;
  return Oe(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Pe, defineProperty: He, getOwnPropertyDescriptor: Ie, getOwnPropertyNames: Me, getOwnPropertySymbols: Be, getPrototypeOf: Ne } = Object, q = globalThis, ae = q.trustedTypes, je = ae ? ae.emptyScript : "", Pt = q.reactiveElementPolyfillSupport, pt = (e, t) => e, Et = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? je : null;
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
} }, Rt = (e, t) => !Pe(e, t), re = { attribute: !0, type: String, converter: Et, reflect: !1, hasChanged: Rt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), q.litPropertyMetadata ?? (q.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class at extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = re) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.elementProperties.set(t, i), !i.noAccessor) {
      const o = Symbol(), s = this.getPropertyDescriptor(t, o, i);
      s !== void 0 && He(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, o) {
    const { get: s, set: n } = Ie(this.prototype, t) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get() {
      return s == null ? void 0 : s.call(this);
    }, set(a) {
      const r = s == null ? void 0 : s.call(this);
      n.call(this, a), this.requestUpdate(t, r, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? re;
  }
  static _$Ei() {
    if (this.hasOwnProperty(pt("elementProperties"))) return;
    const t = Ne(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(pt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(pt("properties"))) {
      const i = this.properties, o = [...Me(i), ...Be(i)];
      for (const s of o) this.createProperty(s, i[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [o, s] of i) this.elementProperties.set(o, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, o] of this.elementProperties) {
      const s = this._$Eu(i, o);
      s !== void 0 && this._$Eh.set(s, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const s of o) i.unshift(ne(s));
    } else t !== void 0 && i.push(ne(t));
    return i;
  }
  static _$Eu(t, i) {
    const o = i.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const o of i.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Le(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach(((i) => {
      var o;
      return (o = i.hostConnected) == null ? void 0 : o.call(i);
    }));
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach(((i) => {
      var o;
      return (o = i.hostDisconnected) == null ? void 0 : o.call(i);
    }));
  }
  attributeChangedCallback(t, i, o) {
    this._$AK(t, o);
  }
  _$EC(t, i) {
    var n;
    const o = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, o);
    if (s !== void 0 && o.reflect === !0) {
      const a = (((n = o.converter) == null ? void 0 : n.toAttribute) !== void 0 ? o.converter : Et).toAttribute(i, o.type);
      this._$Em = t, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var n;
    const o = this.constructor, s = o._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = o.getPropertyOptions(s), r = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : Et;
      this._$Em = s, this[s] = r.fromAttribute(i, a.type), this._$Em = null;
    }
  }
  requestUpdate(t, i, o) {
    if (t !== void 0) {
      if (o ?? (o = this.constructor.getPropertyOptions(t)), !(o.hasChanged ?? Rt)(this[t], i)) return;
      this.P(t, i, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, i, o) {
    this._$AL.has(t) || this._$AL.set(t, i), o.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
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
    var o;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, a] of s) a.wrapped !== !0 || this._$AL.has(n) || this[n] === void 0 || this.P(n, this[n], a);
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (o = this._$EO) == null || o.forEach(((s) => {
        var n;
        return (n = s.hostUpdate) == null ? void 0 : n.call(s);
      })), this.update(i)) : this._$EU();
    } catch (s) {
      throw t = !1, this._$EU(), s;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var i;
    (i = this._$EO) == null || i.forEach(((o) => {
      var s;
      return (s = o.hostUpdated) == null ? void 0 : s.call(o);
    })), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
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
    this._$Ej && (this._$Ej = this._$Ej.forEach(((i) => this._$EC(i, this[i])))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
at.elementStyles = [], at.shadowRootOptions = { mode: "open" }, at[pt("elementProperties")] = /* @__PURE__ */ new Map(), at[pt("finalized")] = /* @__PURE__ */ new Map(), Pt == null || Pt({ ReactiveElement: at }), (q.reactiveElementVersions ?? (q.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = globalThis, At = ft.trustedTypes, ce = At ? At.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, we = "$lit$", V = `lit$${Math.random().toFixed(9).slice(2)}$`, Ee = "?" + V, Ue = `<${Ee}>`, tt = document, _t = () => tt.createComment(""), gt = (e) => e === null || typeof e != "object" && typeof e != "function", Vt = Array.isArray, Fe = (e) => Vt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Ht = `[ 	
\f\r]`, ht = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, le = /-->/g, de = />/g, Z = RegExp(`>|${Ht}(?:([^\\s"'>=/]+)(${Ht}*=${Ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ue = /'/g, he = /"/g, Ae = /^(?:script|style|textarea|title)$/i, Re = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), g = Re(1), j = Symbol.for("lit-noChange"), C = Symbol.for("lit-nothing"), me = /* @__PURE__ */ new WeakMap(), X = tt.createTreeWalker(tt, 129);
function Ce(e, t) {
  if (!Vt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ce !== void 0 ? ce.createHTML(t) : t;
}
const Ve = (e, t) => {
  const i = e.length - 1, o = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = ht;
  for (let r = 0; r < i; r++) {
    const c = e[r];
    let l, h, d = -1, m = 0;
    for (; m < c.length && (a.lastIndex = m, h = a.exec(c), h !== null); ) m = a.lastIndex, a === ht ? h[1] === "!--" ? a = le : h[1] !== void 0 ? a = de : h[2] !== void 0 ? (Ae.test(h[2]) && (s = RegExp("</" + h[2], "g")), a = Z) : h[3] !== void 0 && (a = Z) : a === Z ? h[0] === ">" ? (a = s ?? ht, d = -1) : h[1] === void 0 ? d = -2 : (d = a.lastIndex - h[2].length, l = h[1], a = h[3] === void 0 ? Z : h[3] === '"' ? he : ue) : a === he || a === ue ? a = Z : a === le || a === de ? a = ht : (a = Z, s = void 0);
    const u = a === Z && e[r + 1].startsWith("/>") ? " " : "";
    n += a === ht ? c + Ue : d >= 0 ? (o.push(l), c.slice(0, d) + we + c.slice(d) + V + u) : c + V + (d === -2 ? r : u);
  }
  return [Ce(e, n + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class yt {
  constructor({ strings: t, _$litType$: i }, o) {
    let s;
    this.parts = [];
    let n = 0, a = 0;
    const r = t.length - 1, c = this.parts, [l, h] = Ve(t, i);
    if (this.el = yt.createElement(l, o), X.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = X.nextNode()) !== null && c.length < r; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(we)) {
          const m = h[a++], u = s.getAttribute(d).split(V), p = /([.?@])?(.*)/.exec(m);
          c.push({ type: 1, index: n, name: p[2], strings: u, ctor: p[1] === "." ? Ge : p[1] === "?" ? We : p[1] === "@" ? Ke : zt }), s.removeAttribute(d);
        } else d.startsWith(V) && (c.push({ type: 6, index: n }), s.removeAttribute(d));
        if (Ae.test(s.tagName)) {
          const d = s.textContent.split(V), m = d.length - 1;
          if (m > 0) {
            s.textContent = At ? At.emptyScript : "";
            for (let u = 0; u < m; u++) s.append(d[u], _t()), X.nextNode(), c.push({ type: 2, index: ++n });
            s.append(d[m], _t());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ee) c.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(V, d + 1)) !== -1; ) c.push({ type: 7, index: n }), d += V.length - 1;
      }
      n++;
    }
  }
  static createElement(t, i) {
    const o = tt.createElement("template");
    return o.innerHTML = t, o;
  }
}
function rt(e, t, i = e, o) {
  var a, r;
  if (t === j) return t;
  let s = o !== void 0 ? (a = i._$Co) == null ? void 0 : a[o] : i._$Cl;
  const n = gt(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== n && ((r = s == null ? void 0 : s._$AO) == null || r.call(s, !1), n === void 0 ? s = void 0 : (s = new n(e), s._$AT(e, i, o)), o !== void 0 ? (i._$Co ?? (i._$Co = []))[o] = s : i._$Cl = s), s !== void 0 && (t = rt(e, s._$AS(e, t.values), s, o)), t;
}
let qe = class {
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
    const { el: { content: i }, parts: o } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? tt).importNode(i, !0);
    X.currentNode = s;
    let n = X.nextNode(), a = 0, r = 0, c = o[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let l;
        c.type === 2 ? l = new lt(n, n.nextSibling, this, t) : c.type === 1 ? l = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (l = new Ze(n, this, t)), this._$AV.push(l), c = o[++r];
      }
      a !== (c == null ? void 0 : c.index) && (n = X.nextNode(), a++);
    }
    return X.currentNode = tt, s;
  }
  p(t) {
    let i = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, i), i += o.strings.length - 2) : o._$AI(t[i])), i++;
  }
};
class lt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, o, s) {
    this.type = 2, this._$AH = C, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = o, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = rt(this, t, i), gt(t) ? t === C || t == null || t === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : t !== this._$AH && t !== j && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Fe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== C && gt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(tt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: i, _$litType$: o } = t, s = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = yt.createElement(Ce(o.h, o.h[0]), this.options)), o);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === s) this._$AH.p(i);
    else {
      const a = new qe(s, this), r = a.u(this.options);
      a.p(i), this.T(r), this._$AH = a;
    }
  }
  _$AC(t) {
    let i = me.get(t.strings);
    return i === void 0 && me.set(t.strings, i = new yt(t)), i;
  }
  k(t) {
    Vt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let o, s = 0;
    for (const n of t) s === i.length ? i.push(o = new lt(this.O(_t()), this.O(_t()), this, this.options)) : o = i[s], o._$AI(n), s++;
    s < i.length && (this._$AR(o && o._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, i); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class zt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, o, s, n) {
    this.type = 1, this._$AH = C, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = C;
  }
  _$AI(t, i = this, o, s) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = rt(this, t, i, 0), a = !gt(t) || t !== this._$AH && t !== j, a && (this._$AH = t);
    else {
      const r = t;
      let c, l;
      for (t = n[0], c = 0; c < n.length - 1; c++) l = rt(this, r[o + c], i, c), l === j && (l = this._$AH[c]), a || (a = !gt(l) || l !== this._$AH[c]), l === C ? t = C : t !== C && (t += (l ?? "") + n[c + 1]), this._$AH[c] = l;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
let Ge = class extends zt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === C ? void 0 : t;
  }
};
class We extends zt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== C);
  }
}
class Ke extends zt {
  constructor(t, i, o, s, n) {
    super(t, i, o, s, n), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = rt(this, t, i, 0) ?? C) === j) return;
    const o = this._$AH, s = t === C && o !== C || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, n = t !== C && (o === C || s);
    s && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ze {
  constructor(t, i, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    rt(this, t);
  }
}
const Je = { I: lt }, It = ft.litHtmlPolyfillSupport;
It == null || It(yt, lt), (ft.litHtmlVersions ?? (ft.litHtmlVersions = [])).push("3.2.1");
const Xe = (e, t, i) => {
  const o = (i == null ? void 0 : i.renderBefore) ?? t;
  let s = o._$litPart$;
  if (s === void 0) {
    const n = (i == null ? void 0 : i.renderBefore) ?? null;
    o._$litPart$ = s = new lt(t.insertBefore(_t(), n), n, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let N = class extends at {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Xe(i, this.renderRoot, this.renderOptions);
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
    return j;
  }
};
var be;
N._$litElement$ = !0, N.finalized = !0, (be = globalThis.litElementHydrateSupport) == null || be.call(globalThis, { LitElement: N });
const Mt = globalThis.litElementPolyfillSupport;
Mt == null || Mt({ LitElement: N });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const kt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer((() => {
    customElements.define(e, t);
  })) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ye = { attribute: !0, type: String, converter: Et, reflect: !1, hasChanged: Rt }, Qe = (e = Ye, t, i) => {
  const { kind: o, metadata: s } = i;
  let n = globalThis.litPropertyMetadata.get(s);
  if (n === void 0 && globalThis.litPropertyMetadata.set(s, n = /* @__PURE__ */ new Map()), n.set(i.name, e), o === "accessor") {
    const { name: a } = i;
    return { set(r) {
      const c = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, c, e);
    }, init(r) {
      return r !== void 0 && this.P(a, void 0, e), r;
    } };
  }
  if (o === "setter") {
    const { name: a } = i;
    return function(r) {
      const c = this[a];
      t.call(this, r), this.requestUpdate(a, c, e);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function b(e) {
  return (t, i) => typeof i == "object" ? Qe(e, t, i) : ((o, s, n) => {
    const a = s.hasOwnProperty(n);
    return s.constructor.createProperty(n, a ? { ...o, wrapped: !0 } : o), a ? Object.getOwnPropertyDescriptor(s, n) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function w(e) {
  return b({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qt = { ATTRIBUTE: 1, CHILD: 2 }, Dt = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Tt = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, i, o) {
    this._$Ct = t, this._$AM = i, this._$Ci = o;
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
const { I: ti } = Je, pe = () => document.createComment(""), mt = (e, t, i) => {
  var n;
  const o = e._$AA.parentNode, s = t === void 0 ? e._$AB : t._$AA;
  if (i === void 0) {
    const a = o.insertBefore(pe(), s), r = o.insertBefore(pe(), s);
    i = new ti(a, r, e, e.options);
  } else {
    const a = i._$AB.nextSibling, r = i._$AM, c = r !== e;
    if (c) {
      let l;
      (n = i._$AQ) == null || n.call(i, e), i._$AM = e, i._$AP !== void 0 && (l = e._$AU) !== r._$AU && i._$AP(l);
    }
    if (a !== s || c) {
      let l = i._$AA;
      for (; l !== a; ) {
        const h = l.nextSibling;
        o.insertBefore(l, s), l = h;
      }
    }
  }
  return i;
}, J = (e, t, i = e) => (e._$AI(t, i), e), ei = {}, ii = (e, t = ei) => e._$AH = t, si = (e) => e._$AH, Bt = (e) => {
  var o;
  (o = e._$AP) == null || o.call(e, !1, !0);
  let t = e._$AA;
  const i = e._$AB.nextSibling;
  for (; t !== i; ) {
    const s = t.nextSibling;
    t.remove(), t = s;
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe = (e, t, i) => {
  const o = /* @__PURE__ */ new Map();
  for (let s = t; s <= i; s++) o.set(e[s], s);
  return o;
}, Se = Dt(class extends Tt {
  constructor(e) {
    if (super(e), e.type !== qt.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, i) {
    let o;
    i === void 0 ? i = t : t !== void 0 && (o = t);
    const s = [], n = [];
    let a = 0;
    for (const r of e) s[a] = o ? o(r, a) : a, n[a] = i(r, a), a++;
    return { values: n, keys: s };
  }
  render(e, t, i) {
    return this.dt(e, t, i).values;
  }
  update(e, [t, i, o]) {
    const s = si(e), { values: n, keys: a } = this.dt(t, i, o);
    if (!Array.isArray(s)) return this.ut = a, n;
    const r = this.ut ?? (this.ut = []), c = [];
    let l, h, d = 0, m = s.length - 1, u = 0, p = n.length - 1;
    for (; d <= m && u <= p; ) if (s[d] === null) d++;
    else if (s[m] === null) m--;
    else if (r[d] === a[u]) c[u] = J(s[d], n[u]), d++, u++;
    else if (r[m] === a[p]) c[p] = J(s[m], n[p]), m--, p--;
    else if (r[d] === a[p]) c[p] = J(s[d], n[p]), mt(e, c[p + 1], s[d]), d++, p--;
    else if (r[m] === a[u]) c[u] = J(s[m], n[u]), mt(e, s[d], s[m]), m--, u++;
    else if (l === void 0 && (l = fe(a, u, p), h = fe(r, d, m)), l.has(r[d])) if (l.has(r[m])) {
      const _ = h.get(a[u]), f = _ !== void 0 ? s[_] : null;
      if (f === null) {
        const y = mt(e, s[d]);
        J(y, n[u]), c[u] = y;
      } else c[u] = J(f, n[u]), mt(e, s[d], f), s[_] = null;
      u++;
    } else Bt(s[m]), m--;
    else Bt(s[d]), d++;
    for (; u <= p; ) {
      const _ = mt(e, c[p + 1]);
      J(_, n[u]), c[u++] = _;
    }
    for (; d <= m; ) {
      const _ = s[d++];
      _ !== null && Bt(_);
    }
    return this.ut = a, ii(e, c), j;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = Dt(class extends Tt {
  constructor(e) {
    var t;
    if (super(e), e.type !== qt.ATTRIBUTE || e.name !== "class" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return " " + Object.keys(e).filter(((t) => e[t])).join(" ") + " ";
  }
  update(e, [t]) {
    var o, s;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter(((n) => n !== ""))));
      for (const n in t) t[n] && !((o = this.nt) != null && o.has(n)) && this.st.add(n);
      return this.render(t);
    }
    const i = e.element.classList;
    for (const n of this.st) n in t || (i.remove(n), this.st.delete(n));
    for (const n in t) {
      const a = !!t[n];
      a === this.st.has(n) || (s = this.nt) != null && s.has(n) || (a ? (i.add(n), this.st.add(n)) : (i.remove(n), this.st.delete(n)));
    }
    return j;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xe = "important", oi = " !" + xe, R = Dt(class extends Tt {
  constructor(e) {
    var t;
    if (super(e), e.type !== qt.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return Object.keys(e).reduce(((t, i) => {
      const o = e[i];
      return o == null ? t : t + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${o};`;
    }), "");
  }
  update(e, [t]) {
    const { style: i } = e.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const o of this.ft) t[o] == null && (this.ft.delete(o), o.includes("-") ? i.removeProperty(o) : i[o] = null);
    for (const o in t) {
      const s = t[o];
      if (s != null) {
        this.ft.add(o);
        const n = typeof s == "string" && s.endsWith(oi);
        o.includes("-") || n ? i.setProperty(o, n ? s.slice(0, -11) : s, n ? xe : "") : i[o] = s;
      }
    }
    return j;
  }
});
var _e = Number.isNaN || function(t) {
  return typeof t == "number" && t !== t;
};
function ni(e, t) {
  return !!(e === t || _e(e) && _e(t));
}
function ai(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var i = 0; i < e.length; i++)
    if (!ni(e[i], t[i]))
      return !1;
  return !0;
}
function x(e, t) {
  t === void 0 && (t = ai);
  var i = null;
  function o() {
    for (var s = [], n = 0; n < arguments.length; n++)
      s[n] = arguments[n];
    if (i && i.lastThis === this && t(s, i.lastArgs))
      return i.lastResult;
    var a = e.apply(this, s);
    return i = {
      lastResult: a,
      lastArgs: s,
      lastThis: this
    }, a;
  }
  return o.clear = function() {
    i = null;
  }, o;
}
var ri = "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z", Gt = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", ci = "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z", li = "M17 14V17H14V19H17V22H19V19H22V17H19V14M20 11V12.3C19.4 12.1 18.7 12 18 12C16.8 12 15.6 12.4 14.7 13H7V11H20M12.1 17H7V15H12.8C12.5 15.6 12.2 16.3 12.1 17M7 7H20V9H7V7M5 19H7V21H3V3H7V5H5V19Z", di = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", ui = "M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z", hi = "M10 19.11L12.11 17H7V15H14V15.12L16.12 13H7V11H17V12.12L18.24 10.89C18.72 10.41 19.35 10.14 20.04 10.14C20.37 10.14 20.7 10.21 21 10.33V5C21 3.89 20.1 3 19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.9 21 5 21H10V19.11M7 7H17V9H7V7M21.7 14.35L20.7 15.35L18.65 13.3L19.65 12.3C19.86 12.09 20.21 12.09 20.42 12.3L21.7 13.58C21.91 13.79 21.91 14.14 21.7 14.35M12 19.94L18.06 13.88L20.11 15.93L14.06 22H12V19.94Z", mi = "M17 6H7c-3.31 0-6 2.69-6 6s2.69 6 6 6h10c3.31 0 6-2.69 6-6s-2.69-6-6-6zm0 10H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h10c2.21 0 4 1.79 4 4s-1.79 4-4 4zM7 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z";
function pi(e, t, i) {
  switch (e) {
    case "alarm_control_panel":
      return t === "off" ? "mdi:alarm-light-off" : "mdi:alarm-light";
    case "siren":
      return t === "off" ? "mdi:bell-off" : "mdi:bell-ring";
    case "lock":
      return t === "off" ? "mdi:lock" : "mdi:lock-open";
    case "light":
      return t === "off" ? "mdi:lightbulb-off" : "mdi:lightbulb";
    case "media_player":
      return t === "off" ? "mdi:cast-off" : "mdi:cast";
    case "climate":
      return t === "off" ? "mdi:thermostat-cog" : "mdi:thermostat";
    case "vacuum":
      return t === "off" ? "mdi:robot-vacuum-off" : "mdi:robot-vacuum";
    case "fan":
      return t === "off" ? "mdi:fan-off" : "mdi:fan";
    case "switch":
      if (i)
        switch (i) {
          case "outlet":
            return t === "off" ? "mdi:power-plug-off" : "mdi:power-plug";
          case "switch":
            return t === "off" ? "mdi:toggle-switch-off" : "mdi:toggle-switch";
        }
    case "cover":
      if (i)
        switch (i) {
          case "door":
            return t === "off" ? "mdi:door-closed" : "mdi:door-open";
          case "garage":
            return t === "off" ? "mdi:garage" : "mdi:garage-open";
          case "gate":
            return t === "off" ? "mdi:gate" : "mdi:gate-open";
          case "blind":
            return t === "off" ? "mdi:blinds" : "mdi:blinds-open";
          case "curtain":
            return t === "off" ? "mdi:curtains-closed" : "mdi:curtains";
          case "damper":
            return t === "off" ? "mdi:valve-closed" : "mdi:valve";
          case "awning":
            return t === "off" ? "mdi:awning-outline" : "mdi:awning";
          case "shutter":
            return t === "off" ? "mdi:window-shutter" : "mdi:window-shutter-open";
          case "shade":
            return t === "off" ? "mdi:roller-shade-closed" : "mdi:roller-shade";
          case "window":
            return t === "off" ? "mdi:window-closed" : "mdi:window-open";
          default:
            return "mdi:help-circle";
        }
      return t === "off" ? "mdi:window-closed" : "mdi:window-open";
    case "binary_sensor":
      if (i)
        switch (i) {
          case "door":
            return t === "off" ? "mdi:door-closed" : "mdi:door-open";
          case "window":
            return t === "off" ? "mdi:window-closed" : "mdi:window-open";
          case "lock":
            return t === "off" ? "mdi:lock-open" : "mdi:lock";
          case "motion":
            return t === "off" ? "mdi:motion-sensor-off" : "mdi:motion-sensor";
          case "presence":
            return t === "off" ? "mdi:home-off" : "mdi:home";
          case "occupancy":
            return t === "off" ? "mdi:seat-outline" : "mdi:seat";
          case "vibration":
            return t === "off" ? "mdi:vibrate-off" : "mdi:vibrate";
          case "plug":
            return t === "off" ? "mdi:power-plug-off" : "mdi:power-plug";
          case "power":
            return t === "off" ? "mdi:power-off" : "mdi:power";
          case "battery":
            return t === "off" ? "mdi:battery-off" : "mdi:battery";
          case "battery_charging":
            return t === "off" ? "mdi:battery-alert" : "mdi:battery-charging";
          case "moving":
            return t === "off" ? "mdi:car-off" : "mdi:car";
          case "running":
            return t === "off" ? "mdi:play-pause" : "mdi:play";
          case "gas":
            return "mdi:gas-cylinder";
          case "carbon_monoxide":
            return "mdi:molecule-co";
          case "cold":
            return t === "off" ? "mdi:snowflake-off" : "mdi:snowflake";
          case "heat":
            return t === "off" ? "mdi:weather-sunny-off" : "mdi:weather-sunny";
          case "moisture":
            return t === "off" ? "mdi:water-off" : "mdi:water";
          case "connectivity":
            return "mdi:connection";
          case "opening":
            return t === "off" ? "mdi:shield-lock" : "mdi:shield-lock-open";
          case "garage_door":
            return t === "off" ? "mdi:garage" : "mdi:garage-open";
          case "light":
            return t === "off" ? "mdi:lightbulb-off" : "mdi:lightbulb-on";
          case "problem":
            return t === "off" ? "mdi:alert-circle-check" : "mdi:alert-circle";
          case "safety":
            return t === "off" ? "mdi:shield-alert-outline" : "mdi:shield-alert";
          case "smoke":
            return t === "off" ? "mdi:smoke-detector-off" : "mdi:smoke-detector";
          case "sound":
            return t === "off" ? "mdi:volume-off" : "mdi:volume-high";
          case "tamper":
            return t === "off" ? "mdi:shield-home-outline" : "mdi:shield-home";
          case "update":
            return t === "off" ? "mdi:autorenew-off" : "mdi:autorenew";
          default:
            return "mdi:help-circle";
        }
      return t === "off" ? "mdi:radiobox-blank" : "mdi:checkbox-marked-circle";
    case "humidifier":
      return t === "off" ? "mdi:water-off" : "mdi:air-humidifier";
    case "lawn_mower":
      return t === "off" ? "mdi:lawn-mower" : "mdi:robot-mower";
    case "valve":
      return "mdi:valve";
    case "water_heater":
      return t === "off" ? "mdi:water-pump-off" : "mdi:water-boiler";
    case "remote":
      return t === "off" ? "mdi:remote-off" : "mdi:remote";
    case "device_tracker":
      return t === "off" ? "mdi:account-off" : "mdi:cellphone";
    case "update":
      return t === "off" ? "mdi:autorenew-off" : "mdi:autorenew";
    case "input_boolean":
      return t === "off" ? "mdi:toggle-switch-off" : "mdi:toggle-switch";
    case "timer":
      return t === "off" ? "mdi:timer-off" : "mdi:timer-outline";
    case "counter":
      return t === "off" ? "mdi:numeric" : "mdi:counter";
    case "calendar":
      return t === "off" ? "mdi:calendar-off" : "mdi:calendar";
    case "person":
      return "mdi:account";
    default:
      return console.warn(`Unable to find icon for domain ${e} (${t})`), "mdi:help-circle";
  }
}
const ot = [
  "alarm_control_panel",
  "siren",
  "lock",
  "light",
  "media_player",
  "climate",
  "Switch - switch",
  "Switch - outlet",
  "vacuum",
  "fan",
  "humidifier",
  "lawn_mower",
  "valve",
  "water_heater",
  "remote",
  "Cover - door",
  "Cover - window",
  "Cover - garage",
  "Cover - gate",
  "Cover - blind",
  "Cover - curtain",
  "Cover - damper",
  "Cover - awning",
  "Cover - shade",
  "Cover - shutter",
  "Binary Sensor - door",
  "Binary Sensor - window",
  "Binary Sensor - lock",
  "Binary Sensor - motion",
  "Binary Sensor - presence",
  "Binary Sensor - occupancy",
  "Binary Sensor - vibration",
  "Binary Sensor - plug",
  "Binary Sensor - power",
  "Binary Sensor - battery",
  "Binary Sensor - battery_charging",
  "Binary Sensor - moving",
  "Binary Sensor - running",
  "Binary Sensor - gas",
  "Binary Sensor - carbon_monoxide",
  "Binary Sensor - cold",
  "Binary Sensor - heat",
  "Binary Sensor - moisture",
  "Binary Sensor - connectivity",
  "Binary Sensor - opening",
  "Binary Sensor - garage_door",
  "Binary Sensor - light",
  "Binary Sensor - problem",
  "Binary Sensor - safety",
  "Binary Sensor - smoke",
  "Binary Sensor - sound",
  "Binary Sensor - tamper",
  "Binary Sensor - update",
  "update",
  "device_tracker",
  "input_boolean",
  "timer",
  "counter",
  "calendar"
], Wt = [
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
], fi = {
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
}, Zt = class Zt {
  static setEntitiesByDomain(t) {
    this._entitiesByDomain = t;
  }
  static getEntitiesByDomain() {
    return this._entitiesByDomain;
  }
  static getAllEntities() {
    return Object.values(this._entitiesByDomain).flat();
  }
};
Zt._entitiesByDomain = {};
let Ct = Zt;
function O(e, t, i) {
  return e.localize(
    `component.${i}.entity_component._.state.${t}`
  ) || t;
}
function Ot(e, t, i, o) {
  if (/^key_\d+$/.test(t.name))
    return e.localize("ui.components.related-filter-menu.filter") || "Filter";
  switch (t.name) {
    case "header":
      return i && o ? i === "switch" && o === "switch" ? `${e.localize(
        "ui.panel.lovelace.editor.card.entities.name"
      )} in ${e.localize("component.switch.entity_component._.name")}` : `${e.localize(
        "ui.panel.lovelace.editor.card.entities.name"
      )} in ${e.localize(
        `ui.dialogs.entity_registry.editor.device_classes.${i}.${o}`
      )}` : i ? `${e.localize(
        "ui.panel.lovelace.editor.card.entities.name"
      )} in ${e.localize(`component.${i}.entity_component._.name`)}` : e.localize("ui.panel.lovelace.editor.card.entities.name");
    case "square":
      return e.localize("ui.panel.lovelace.editor.card.grid.square");
    case "hide_person_name":
      return e.localize("ui.common.hide") + " " + e.localize("component.person.entity_component._.name") + " " + e.localize("ui.common.name");
    case "hide_content_name":
      return e.localize("ui.common.hide") + " " + e.localize("ui.panel.lovelace.editor.card.markdown.content") + " " + e.localize("ui.common.name");
    case "hide_person":
      return e.localize("ui.common.hide") + " " + e.localize("component.person.entity_component._.name");
    case "list_mode":
      return e.localize("ui.card.common.turn_on") + " " + e.localize("ui.components.media-browser.list") + " " + e.localize("ui.dialogs.helper_settings.input_text.mode");
    case "columns":
      return e.localize(
        "ui.panel.lovelace.editor.action-editor.actions.more-info"
      ) + " " + e.localize("ui.panel.lovelace.editor.card.grid.columns");
    case "edit_filters":
      return e.localize("ui.panel.lovelace.editor.common.edit") + " " + e.localize("ui.components.subpage-data-table.filters");
    case "area":
      return e.localize("ui.panel.lovelace.editor.card.area.name");
    case "floor":
      return e.localize("ui.components.selectors.selector.types.floor");
    case "label_filter":
      return e.localize("ui.components.label-picker.label") + " " + e.localize("ui.components.related-filter-menu.filter");
    case "label":
    case "hidden_labels":
      return e.localize("ui.components.label-picker.label");
    case "entities":
      return e.localize("ui.panel.lovelace.editor.card.entities.name");
    case "extra_entities":
      return "Extra " + e.localize("ui.panel.lovelace.editor.card.entities.name");
    case "entity":
      return e.localize("ui.components.selectors.selector.types.entity");
    case "hide_filter":
      return e.localize("ui.common.hide") + " " + e.localize("ui.panel.lovelace.editor.card.entities.name");
    case "edit_domains_dc":
      return e.localize("ui.panel.lovelace.editor.common.edit") + " " + e.localize("ui.panel.lovelace.editor.card.markdown.content");
    case "icon":
      return e.localize("ui.components.selectors.selector.types.icon");
    case "color":
      return e.localize("ui.panel.lovelace.editor.card.tile.color");
    case "background_color":
      return e.localize("ui.panel.lovelace.editor.card.generic.icon") + " " + e.localize("ui.panel.lovelace.editor.edit_view.tab_background") + " " + e.localize("ui.panel.lovelace.editor.card.tile.color");
    case "multiple_areas":
      return "Multi " + e.localize("ui.panel.lovelace.editor.card.area.name");
    case "multiple_floors":
      return "Multi " + e.localize("ui.components.selectors.selector.types.floor");
    case "show_total_number":
      return e.localize("ui.common.enable") + " " + e.localize(
        "component.sensor.entity_component._.state_attributes.state_class.state.total"
      ) + " " + e.localize("component.number.entity_component._.name");
    case "show_total_entities":
      return e.localize("ui.common.enable") + " " + e.localize(
        "component.sensor.entity_component._.state_attributes.state_class.state.total"
      ) + " " + e.localize("ui.panel.lovelace.editor.card.entities.name");
    case "appearance":
      return e.localize("ui.panel.lovelace.editor.card.tile.appearance") || "Appearance";
    case "tap_action":
    case "hold_action":
    case "double_tap_action":
      return e.localize(
        `ui.panel.lovelace.editor.card.generic.${t.name}`
      );
    case "popup_card":
      return "Change Popup Card Type";
    case "group_id":
      return e.localize("component.group.entity_component._.name") + " " + e.localize("ui.common.name");
    case "group_icon":
      return e.localize("component.group.entity_component._.name") + " " + e.localize("ui.panel.lovelace.editor.card.generic.icon");
    case "group_status":
      return e.localize("component.group.entity_component._.name") + " " + e.localize("ui.components.selectors.selector.types.state") + " (" + e.localize("ui.panel.lovelace.editor.card.config.optional") + ")";
    case "hide":
      return e.localize("ui.common.hide");
    case "state":
      return e.localize("ui.components.entity.entity-state-picker.state");
    case "invert":
    case "invert_state":
      return e.localize("ui.dialogs.entity_registry.editor.invert.label");
    case "show_entity_picture":
      return e.localize(
        "ui.panel.lovelace.editor.card.tile.show_entity_picture"
      );
    case "name":
      return e.localize("ui.common.name");
    case "no_scroll":
      return e.localize(
        "ui.panel.lovelace.editor.edit_view_header.settings.badges_wrap_options.wrap"
      ) + " " + e.localize("ui.panel.lovelace.editor.card.generic.content");
    case "popup":
      return "Popup";
    case "ungroup_areas":
      return e.localize("ui.common.disable") + " " + e.localize("ui.panel.lovelace.editor.card.area.name") + " " + e.localize("component.group.entity_component._.name");
    case "popup_sort":
      return "Popup Sort";
    default:
      if (Wt.includes(t.name))
        return e.localize(`component.${t.name}.entity_component._.name`) || t.name;
      for (const [s, n] of Object.entries(fi))
        if (n.includes(t.name))
          return e.localize(
            `ui.dialogs.entity_registry.editor.device_classes.${s}.${t.name}`
          ) || t.name;
      return e.localize(
        `ui.panel.lovelace.editor.card.area.${t.name}`
      );
  }
}
var Y, ge;
(function(e) {
  e.language = "language", e.system = "system", e.comma_decimal = "comma_decimal", e.decimal_comma = "decimal_comma", e.space_comma = "space_comma", e.none = "none";
})(Y || (Y = {})), (function(e) {
  e.language = "language", e.system = "system", e.am_pm = "12", e.twenty_four = "24";
})(ge || (ge = {}));
function ze() {
  return (ze = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = arguments[t];
      for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (e[o] = i[o]);
    }
    return e;
  }).apply(this, arguments);
}
function I(e) {
  return e.substr(0, e.indexOf("."));
}
var _i = function(e) {
  switch (e.number_format) {
    case Y.comma_decimal:
      return ["en-US", "en"];
    case Y.decimal_comma:
      return ["de", "es", "it"];
    case Y.space_comma:
      return ["fr", "sv", "cs"];
    case Y.system:
      return;
    default:
      return e.language;
  }
}, gi = function(e, t) {
  return t === void 0 && (t = 2), Math.round(e * Math.pow(10, t)) / Math.pow(10, t);
}, yi = function(e, t, i) {
  var o = t ? _i(t) : void 0;
  if (Number.isNaN = Number.isNaN || function s(n) {
    return typeof n == "number" && s(n);
  }, (t == null ? void 0 : t.number_format) !== Y.none && !Number.isNaN(Number(e)) && Intl) try {
    return new Intl.NumberFormat(o, ye(e, i)).format(Number(e));
  } catch (s) {
    return console.error(s), new Intl.NumberFormat(void 0, ye(e, i)).format(Number(e));
  }
  return typeof e == "string" ? e : gi(e, void 0).toString() + "";
}, ye = function(e, t) {
  var i = ze({ maximumFractionDigits: 2 }, t);
  if (typeof e != "string") return i;
  {
    var o = e.indexOf(".") > -1 ? e.split(".")[1].length : 0;
    i.minimumFractionDigits = o, i.maximumFractionDigits = o;
  }
  return i;
}, vi = ["closed", "locked", "off"], St = function(e, t, i, o) {
  o = o || {}, i = i ?? {};
  var s = new Event(t, { bubbles: o.bubbles === void 0 || o.bubbles, cancelable: !!o.cancelable, composed: o.composed === void 0 || o.composed });
  return s.detail = i, e.dispatchEvent(s), s;
}, vt = function(e) {
  St(window, "haptic", e);
}, bi = function(e, t, i) {
  i === void 0 && (i = !1), i ? history.replaceState(null, "", t) : history.pushState(null, "", t), St(window, "location-changed", { replace: i });
}, $i = function(e, t, i) {
  i === void 0 && (i = !0);
  var o, s = I(t), n = s === "group" ? "homeassistant" : s;
  switch (s) {
    case "lock":
      o = i ? "unlock" : "lock";
      break;
    case "cover":
      o = i ? "open_cover" : "close_cover";
      break;
    default:
      o = i ? "turn_on" : "turn_off";
  }
  return e.callService(n, o, { entity_id: t });
}, wi = function(e, t) {
  var i = vi.includes(e.states[t].state);
  return $i(e, t, i);
}, Ei = function(e, t, i, o) {
  if (o || (o = { action: "more-info" }), !o.confirmation || o.confirmation.exemptions && o.confirmation.exemptions.some(function(n) {
    return n.user === t.user.id;
  }) || (vt("warning"), confirm(o.confirmation.text || "Are you sure you want to " + o.action + "?"))) switch (o.action) {
    case "more-info":
      (i.entity || i.camera_image) && St(e, "hass-more-info", { entityId: i.entity ? i.entity : i.camera_image });
      break;
    case "navigate":
      o.navigation_path && bi(0, o.navigation_path);
      break;
    case "url":
      o.url_path && window.open(o.url_path);
      break;
    case "toggle":
      i.entity && (wi(t, i.entity), vt("success"));
      break;
    case "call-service":
      if (!o.service) return void vt("failure");
      var s = o.service.split(".", 2);
      t.callService(s[0], s[1], o.service_data, o.target), vt("success");
      break;
    case "fire-dom-event":
      St(e, "ll-custom", o);
  }
}, Ai = function(e, t, i, o) {
  var s;
  o === "double_tap" && i.double_tap_action ? s = i.double_tap_action : o === "hold" && i.hold_action ? s = i.hold_action : o === "tap" && i.tap_action && (s = i.tap_action), Ei(e, t, i, s);
};
function nt(e) {
  return e !== void 0 && e.action !== "none";
}
x(
  (e) => new Intl.Collator(e)
);
const Ci = x(
  (e) => new Intl.Collator(e, { sensitivity: "accent" })
), Si = (e, t) => e < t ? -1 : e > t ? 1 : 0, xi = (e, t, i = void 0) => Intl != null && Intl.Collator ? Ci(i).compare(e, t) : Si(e.toLowerCase(), t.toLowerCase());
function T(e, t, i) {
  const o = new CustomEvent(t, {
    bubbles: !1,
    composed: !1,
    detail: i
  });
  e.dispatchEvent(o);
}
class zi extends HTMLElement {
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
    t.actionHandler && wt(i, t.actionHandler.options) || (t.actionHandler && (t.removeEventListener("touchstart", t.actionHandler.start), t.removeEventListener("touchend", t.actionHandler.end), t.removeEventListener("touchcancel", t.actionHandler.end), t.removeEventListener("mousedown", t.actionHandler.start), t.removeEventListener("click", t.actionHandler.end), t.removeEventListener(
      "keydown",
      t.actionHandler.handleKeyDown
    )), t.actionHandler = { options: i }, !i.disabled && (t.actionHandler.start = (o) => {
      this.cancelled = !1, o.touches ? (o.touches[0].clientX, o.touches[0].clientY) : (o.clientX, o.clientY), i.hasHold && (this.held = !1, this.timer = window.setTimeout(() => {
        this.held = !0;
      }, this.holdTime));
    }, t.actionHandler.end = (o) => {
      if (o.currentTarget !== o.target || o.type === "touchcancel" || o.type === "touchend" && this.cancelled)
        return;
      const s = o.target;
      o.cancelable && o.preventDefault(), i.hasHold && (clearTimeout(this.timer), this.timer = void 0), i.hasHold && this.held ? T(s, "action", { action: "hold" }) : i.hasDoubleClick ? o.type === "click" && o.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, T(s, "action", { action: "tap" });
      }, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, T(s, "action", { action: "double_tap" })) : T(s, "action", { action: "tap" });
    }, t.actionHandler.handleKeyDown = (o) => {
      ["Enter", " "].includes(o.key) && o.currentTarget.actionHandler.end(o);
    }, t.addEventListener("touchstart", t.actionHandler.start, {
      passive: !0
    }), t.addEventListener("touchend", t.actionHandler.end), t.addEventListener("touchcancel", t.actionHandler.end), t.addEventListener("mousedown", t.actionHandler.start, {
      passive: !0
    }), t.addEventListener("click", t.actionHandler.end), t.addEventListener("keydown", t.actionHandler.handleKeyDown)));
  }
}
customElements.define("action-handler-status-card", zi);
const ki = () => {
  const e = document.body;
  if (e.querySelector("action-handler-status-card"))
    return e.querySelector("action-handler-status-card");
  const t = document.createElement("action-handler-status-card");
  return e.appendChild(t), t;
}, Di = (e, t) => {
  const i = ki();
  i && i.bind(e, t);
}, bt = Dt(
  class extends Tt {
    update(e, [t]) {
      return Di(e.element, t), j;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    render(e) {
    }
  }
), wt = (e, t) => {
  if (e === t)
    return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor)
      return !1;
    let i, o;
    if (Array.isArray(e)) {
      if (o = e.length, o !== t.length)
        return !1;
      for (i = o; i-- !== 0; )
        if (!wt(e[i], t[i]))
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
        if (!wt(i[1], t.get(i[0])))
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
      if (o = e.length, o !== t.length)
        return !1;
      for (i = o; i-- !== 0; )
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
    const s = Object.keys(e);
    if (o = s.length, o !== Object.keys(t).length)
      return !1;
    for (i = o; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, s[i]))
        return !1;
    for (i = o; i-- !== 0; ) {
      const n = s[i];
      if (!wt(e[n], t[n]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}, Ti = (e, t, i) => {
  var n;
  const o = i || t.theme;
  if (e.__themes || (e.__themes = { cacheKey: null, keys: {} }), !o || o === "default") {
    e.removeAttribute("style"), e.__themes.cacheKey = "default";
    return;
  }
  const s = (n = t.themes) == null ? void 0 : n[o];
  if (!s) {
    console.warn(`Theme "${o}" not found.`), e.removeAttribute("style"), e.__themes.cacheKey = "default";
    return;
  }
  if (e.__themes.cacheKey !== o) {
    for (const [a, r] of Object.entries(s))
      e.style.setProperty(`--${a}`, String(r));
    e.__themes.cacheKey = o;
  }
};
function k(e) {
  return e.split("_").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
}
const ve = [
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
];
function xt(e, t) {
  let i = [];
  return Array.isArray(t.filters) ? i = t.filters : [
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
  ].forEach((o) => {
    t[o] !== void 0 && i.push({ key: o, value: t[o] });
  }), Object.values(e.hass.states).filter((o) => e.hiddenEntities.includes(o.entity_id) ? !1 : i.length ? i.every(
    (s) => Oi(e, o, s, {
      areas: e.areas,
      devices: e.devices,
      entities: e.entities
    })
  ) : !0);
}
function Nt(e, t) {
  if (!e) return !1;
  const i = t.match(/^([<>]=?)?\s*(\d+)$/);
  if (!i) return !1;
  const [, o, s] = i, n = parseInt(s, 10), a = /* @__PURE__ */ new Date(), r = new Date(e), c = (a.getTime() - r.getTime()) / 6e4;
  switch (o) {
    case ">":
      return c > n;
    case ">=":
      return c >= n;
    case "<":
      return c < n;
    case "<=":
      return c <= n;
    default:
      return Math.round(c) === n;
  }
}
function E(e, t) {
  if (Array.isArray(t))
    return t.some((i) => E(e, i));
  if (typeof t == "string" && t.startsWith("!"))
    return !E(e, t.slice(1));
  if (typeof t == "string" && /^([<>]=?)\s*(-?\d+(\.\d+)?)([mhd])$/.test(t)) {
    const [, i, o, , s] = t.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)([mhd])$/) || [], n = parseFloat(o), a = Date.now(), r = new Date(e).getTime();
    if (isNaN(r)) return !1;
    let c = (a - r) / 6e4;
    switch (s === "h" && (c /= 60), s === "d" && (c /= 1440), i) {
      case ">":
        return c > n;
      case ">=":
        return c >= n;
      case "<":
        return c < n;
      case "<=":
        return c <= n;
    }
  }
  if (typeof t == "string" && /^([<>]=?)\s*(-?\d+(\.\d+)?)$/.test(t)) {
    const [, i, o] = t.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)$/) || [], s = parseFloat(o), n = parseFloat(e);
    switch (i) {
      case ">":
        return n > s;
      case ">=":
        return n >= s;
      case "<":
        return n < s;
      case "<=":
        return n <= s;
    }
  }
  if (typeof t == "string" && t.includes("*")) {
    const i = "^" + t.split("*").map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*") + "$";
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
function Oi(e, t, i, o) {
  var n, a, r, c, l, h, d, m;
  const s = (n = o.entities) == null ? void 0 : n.find((u) => u.entity_id === t.entity_id);
  switch (i.key) {
    case "area": {
      let u = s == null ? void 0 : s.area_id;
      if (!u && (s != null && s.device_id)) {
        const p = (a = o.devices) == null ? void 0 : a.find((_) => _.id === s.device_id);
        u = p == null ? void 0 : p.area_id;
      }
      return E(u, i.value);
    }
    case "domain":
      return E(I(t.entity_id), i.value);
    case "entity_id":
      return E(t.entity_id, i.value);
    case "state":
      return E(t.state, i.value);
    case "name": {
      const u = t.attributes.friendly_name ?? "";
      return E(u, i.value);
    }
    case "attributes":
      return !i.value || typeof i.value != "object" ? !1 : Object.entries(i.value).every(([u, p]) => {
        const _ = u.split(":");
        let f = t.attributes;
        for (const y of _)
          if (f = f == null ? void 0 : f[y], f === void 0) break;
        return f === void 0 ? !1 : E(f, p);
      });
    case "device":
      return E(s == null ? void 0 : s.device_id, i.value);
    case "integration":
      return s ? E(s.platform, i.value) || E(s.config_entry_id, i.value) : !1;
    case "entity_category":
      return E(s == null ? void 0 : s.entity_category, i.value);
    case "label": {
      const u = o.labels, p = (_) => {
        if (E(_, i.value)) return !0;
        if (u) {
          const f = u.find((y) => y.label_id === _);
          if (f && E(f.name, i.value)) return !0;
        }
        return !1;
      };
      if (s != null && s.labels && s.labels.some(p)) return !0;
      if (s != null && s.device_id) {
        const _ = (r = o.devices) == null ? void 0 : r.find((f) => f.id === s.device_id);
        if (_ != null && _.labels && _.labels.some(p)) return !0;
      }
      return !1;
    }
    case "floor": {
      let u = s == null ? void 0 : s.area_id;
      if (!u && (s != null && s.device_id)) {
        const _ = (c = o.devices) == null ? void 0 : c.find((f) => f.id === s.device_id);
        u = _ == null ? void 0 : _.area_id;
      }
      if (!u) return !1;
      const p = (l = o.areas) == null ? void 0 : l.find((_) => _.area_id === u);
      return E(p == null ? void 0 : p.floor_id, i.value);
    }
    case "hidden_by":
      return E(s == null ? void 0 : s.hidden_by, i.value);
    case "device_manufacturer": {
      if (s != null && s.device_id) {
        const u = (h = o.devices) == null ? void 0 : h.find((p) => p.id === s.device_id);
        return E(u == null ? void 0 : u.manufacturer, i.value);
      }
      return !1;
    }
    case "device_model": {
      if (s != null && s.device_id) {
        const u = (d = o.devices) == null ? void 0 : d.find((p) => p.id === s.device_id);
        return E(u == null ? void 0 : u.model, i.value);
      }
      return !1;
    }
    case "last_changed":
      return typeof i.value == "string" && /^[<>]=?\s*\d+$/.test(i.value) ? Nt(t.last_changed, i.value) : E(t.last_changed, i.value);
    case "last_updated":
      return typeof i.value == "string" && /^[<>]=?\s*\d+$/.test(i.value) ? Nt(t.last_updated, i.value) : E(t.last_updated, i.value);
    case "last_triggered":
      return typeof i.value == "string" && /^[<>]=?\s*\d+$/.test(i.value) ? Nt(t.attributes.last_triggered, i.value) : E(t.attributes.last_triggered, i.value);
    case "group": {
      const u = e.hass.states[i.value];
      return !u || !Array.isArray((m = u.attributes) == null ? void 0 : m.entity_id) ? !1 : u.attributes.entity_id.includes(t.entity_id);
    }
    default:
      return !0;
  }
}
var Li = Object.defineProperty, D = (e, t, i, o) => {
  for (var s = void 0, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (s = a(t, i, s) || s);
  return s && Li(t, i, s), s;
};
const Pi = /* @__PURE__ */ new Set([
  "off",
  "idle",
  "not_home",
  "closed",
  "locked",
  "standby",
  "disarmed",
  "unknown",
  "unavailable"
]);
var Q;
const M = (Q = class extends N {
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
    }, this.computeLabel = x(
      (t, i, o) => Ot(this.hass, t, i, o)
    ), this.groupAndSortEntities = x(
      (t, i, o, s) => {
        const n = /* @__PURE__ */ new Map();
        for (const r of t) {
          const c = this.getAreaForEntity(r);
          n.has(c) || n.set(c, []), n.get(c).push(r);
        }
        return Array.from(n.entries()).sort(
          ([r], [c]) => {
            var d, m;
            const l = ((d = o.get(r)) == null ? void 0 : d.toLowerCase()) ?? (r === "unassigned" ? "unassigned" : r), h = ((m = o.get(c)) == null ? void 0 : m.toLowerCase()) ?? (c === "unassigned" ? "unassigned" : c);
            return l.localeCompare(h);
          }
        ).map(([r, c]) => [r, s(c)]);
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
        features: [{ type: "media-player-volume-slider" }]
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
  showDialog(t) {
    this.title = t.title ?? this.title, this.hass = t.hass, this.entities = t.entities ?? [], t.content !== void 0 && (this.content = t.content), this.selectedDomain = t.selectedDomain, this.selectedDeviceClass = t.selectedDeviceClass, this.selectedGroup = t.selectedGroup, this.card = t.card, this._cardEls.clear(), this.open = !0, this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cardEls.clear();
  }
  _toTileConfig(t) {
    return {
      type: "tile",
      entity: t.entity
    };
  }
  async _createCardElement(t, i, o = !1) {
    var s, n, a;
    try {
      const r = await ((s = window == null ? void 0 : window.loadCardHelpers) == null ? void 0 : s.call(window));
      if (r != null && r.createCardElement) {
        const c = r.createCardElement(i);
        return c.hass = t, (n = c.setAttribute) == null || n.call(c, "data-hui-card", ""), c;
      }
    } catch {
    }
    try {
      const r = i.type || "tile", c = typeof r == "string" && r.startsWith("custom:"), l = c ? r.slice(7) : `hui-${r}-card`;
      c && !customElements.get(l) && await customElements.whenDefined(l).catch(() => {
      });
      const h = document.createElement(l);
      return typeof h.setConfig == "function" && h.setConfig(i), h.hass = t, (a = h.setAttribute) == null || a.call(h, "data-hui-card", ""), h;
    } catch {
      if (!o)
        return this._createCardElement(
          t,
          this._toTileConfig(i),
          !0
        );
      const r = document.createElement("div");
      return r.setAttribute("data-hui-card", ""), r;
    }
  }
  _getPopupCardConfig(t) {
    var u, p, _, f;
    const i = this.card, o = t.entity_id.split(".")[0], s = this.selectedDomain || o, n = this.selectedDomain ? this.selectedDeviceClass : (f = (_ = (p = (u = this.hass) == null ? void 0 : u.states) == null ? void 0 : p[t.entity_id]) == null ? void 0 : _.attributes) == null ? void 0 : f.device_class, a = n ? `${k(s)} - ${n}` : s, r = typeof (i == null ? void 0 : i.getCustomizationForType) == "function" ? i.getCustomizationForType(a) : void 0, c = r == null ? void 0 : r.popup_card, l = c && typeof c.type == "string" && c.type || (r == null ? void 0 : r.popup_card_type) || "tile", h = l === "tile" ? this.DOMAIN_FEATURES[o] ?? {} : {};
    let d = {};
    if (c && typeof c == "object") {
      const { type: y, entity: B, ...L } = c;
      d = L;
    } else
      d = (r == null ? void 0 : r.popup_card_options) ?? {};
    return {
      type: l,
      entity: t.entity_id,
      ...h,
      ...d
    };
  }
  shouldUpdate(t) {
    if (!this.open)
      return t.has("open");
    if (t.size === 1 && t.has("hass")) {
      const i = this._getCurrentEntities().map((n) => n.entity_id).sort(), o = (this._lastEntityIds || []).slice().sort(), s = i.length === o.length && i.every((n, a) => n === o[a]);
      return this._updateCardsHass(), !s;
    }
    return !0;
  }
  _updateCardsHass() {
    this.hass && this._cardEls.forEach((t) => {
      try {
        t.hass = this.hass;
      } catch {
      }
    });
  }
  _getOrCreateCard(t) {
    const i = t.entity_id, o = this._cardEls.get(i);
    if (o) {
      try {
        o.hass = this.hass;
      } catch {
      }
      return o;
    }
    const s = document.createElement("div");
    s.classList.add("card-placeholder"), s.setAttribute("data-hui-card", ""), this._cardEls.set(i, s);
    const n = this._getPopupCardConfig(t);
    return this._createCardElement(this.hass, n).then((a) => {
      try {
        this._cardEls.get(i) === s && (s.replaceWith(a), this._cardEls.set(i, a)), a.hass = this.hass;
      } catch {
      }
    }), s;
  }
  _getCurrentEntities() {
    var a, r, c;
    const t = this.card, i = this.selectedDomain, o = this.selectedDeviceClass, s = this.selectedGroup;
    let n = [];
    if (s !== void 0 && ((r = (a = t._config) == null ? void 0 : a.content) != null && r[s])) {
      const l = t._config.content[s], h = (c = t._config.rulesets) == null ? void 0 : c.find(
        (d) => d.group_id === l
      );
      n = h ? xt(t, h) : [];
    } else
      i ? n = ((typeof (t == null ? void 0 : t._shouldShowTotalEntities) == "function" ? t._shouldShowTotalEntities(i, o) : !1) ? !0 : this._showAll) ? t._totalEntities(i, o) : t._isOn(i, o) : n = Array.isArray(this.entities) ? this.entities : [];
    return n;
  }
  toggleAllOrOn() {
    this._showAll = !this._showAll;
  }
  handleAskToggleDomain(t) {
    t.stopPropagation();
    const i = "popup-dialog-confirmation";
    this.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag: i,
          dialogImport: () => customElements.whenDefined(i),
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
    var o, s;
    const i = (o = this.card.entities) == null ? void 0 : o.find(
      (n) => n.entity_id === t.entity_id
    );
    if (i) {
      if (i.area_id)
        return i.area_id;
      if (i.device_id) {
        const n = (s = this.card.devices) == null ? void 0 : s.find(
          (a) => a.id === i.device_id
        );
        if (n && n.area_id)
          return n.area_id;
      }
    }
    return "unassigned";
  }
  _getEntityName(t) {
    return (t.attributes && t.attributes.friendly_name || t.entity_id).toString();
  }
  _isActive(t) {
    return !Pi.has(t.state);
  }
  sortEntitiesForPopup(t) {
    var s, n;
    const i = ((n = (s = this.card) == null ? void 0 : s._config) == null ? void 0 : n.popup_sort) || "name", o = t.slice();
    return i === "state" ? o.sort((a, r) => {
      const c = this._isActive(a) ? 0 : 1, l = this._isActive(r) ? 0 : 1;
      if (c !== l) return c - l;
      const h = a.entity_id.split(".")[0], d = r.entity_id.split(".")[0], m = this.hass ? O(this.hass, a.state, h) : a.state, u = this.hass ? O(this.hass, r.state, d) : r.state, p = (m || "").localeCompare(u || "");
      return p !== 0 ? p : this._getEntityName(a).toLowerCase().localeCompare(this._getEntityName(r).toLowerCase());
    }) : o.sort(
      (a, r) => this._getEntityName(a).toLowerCase().localeCompare(this._getEntityName(r).toLowerCase())
    );
  }
  render() {
    var $, P, dt, ut, z, Xt, Yt, Qt, te, ee, ie, se;
    if (!this.open) return g``;
    const t = ($ = this.card) != null && $.list_mode ? 1 : ((dt = (P = this.card) == null ? void 0 : P._config) == null ? void 0 : dt.columns) || 4, i = this.selectedDomain, o = this.selectedDeviceClass, s = this.selectedGroup, n = this.card, r = (typeof (n == null ? void 0 : n._shouldShowTotalEntities) == "function" ? n._shouldShowTotalEntities(i, o) : !1) ? !0 : this._showAll, c = new Map(
      (ut = n.areas) == null ? void 0 : ut.map((v) => [v.area_id, v.name])
    );
    let l = [], h = !1;
    if (s !== void 0 && ((Xt = (z = n._config) == null ? void 0 : z.content) != null && Xt[s])) {
      const v = n._config.content[s], H = (Yt = n._config.rulesets) == null ? void 0 : Yt.find(
        (F) => F.group_id === v
      );
      l = H ? xt(n, H) : [];
    } else
      i ? l = r ? n._totalEntities(i, o) : n._isOn(i, o) : l = Array.isArray(this.entities) ? this.entities : [], h = !0;
    const d = this.sortEntitiesForPopup(l), m = new Set(l.map((v) => v.entity_id));
    Array.from(this._cardEls.keys()).forEach((v) => {
      m.has(v) || this._cardEls.delete(v);
    }), this._lastEntityIds = l.map((v) => v.entity_id);
    const u = this.groupAndSortEntities(
      l,
      n.areas,
      c,
      this.sortEntitiesForPopup.bind(this)
    ), p = ((Qt = n == null ? void 0 : n._config) == null ? void 0 : Qt.ungroupAreas) === !0 || ((te = n == null ? void 0 : n._config) == null ? void 0 : te.ungroup_areas) === !0 || ((ee = n == null ? void 0 : n._config) == null ? void 0 : ee.area_grouping) !== void 0 && ((ie = n == null ? void 0 : n._config) == null ? void 0 : ie.area_grouping) === !1, _ = u.length ? Math.max(...u.map(([, v]) => v.length)) : 0, f = p ? Math.min(t, Math.max(1, l.length)) : Math.min(t, Math.max(1, _)), y = o ? `${k(i)} - ${o}` : i, B = typeof (n == null ? void 0 : n.getCustomizationForType) == "function" ? n.getCustomizationForType(y) : void 0, L = (B == null ? void 0 : B.invert) === !0;
    return g`
      <ha-dialog
        .open=${this.open}
        hideActions
        @closed=${this._onClosed}
        style="--columns: ${f};"
      >
        <style>
          ${Q.styles}
        </style>
        <div class="dialog-header">
          <ha-icon-button
            slot="trigger"
            .label=${this.hass.localize("ui.common.close")}
            .path=${Gt}
            @click=${this._onClosed}
          ></ha-icon-button>
          <h3>
            ${(() => {
      var F, it;
      const v = this.selectedGroup, H = this.card;
      if (v !== void 0 && ((it = (F = H == null ? void 0 : H._config) == null ? void 0 : F.content) != null && it[v])) {
        const ke = H._config.content[v];
        return this.hass.localize(
          "ui.panel.lovelace.editor.card.entities.name"
        ) + " in " + ke;
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

          ${h ? g`
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
                    .path=${ci}
                  ></ha-icon-button>

                  <ha-list-item
                    graphic="icon"
                    @click=${this.handleAskToggleDomain}
                    @closed=${this._stopPropagation}
                  >
                    ${L ? this.hass.localize("ui.card.common.turn_on") : this.hass.localize("ui.card.common.turn_off")}
                    <ha-svg-icon
                      slot="graphic"
                      .path=${mi}
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
                      .path=${ui}
                    ></ha-svg-icon>
                  </ha-list-item>
                </ha-button-menu>
              ` : ""}
        </div>
        <div class="dialog-content">
          ${(se = this.card) != null && se.list_mode ? p ? g`
                  <ul class="entity-list">
                    ${d.map(
      (v) => g`<li class="entity-item">- ${v.entity_id}</li>`
    )}
                  </ul>
                ` : g`
                  <ul class="entity-list">
                    ${u.map(([v, H]) => {
      const F = c.get(v) ?? (v === "unassigned" ? "Unassigned" : v);
      return g`
                        <li class="entity-item">
                          <h4>${F}:</h4>
                          <ul>
                            ${H.map(
        (it) => g`
                                <li class="entity-item">
                                  - ${it.entity_id}
                                </li>
                              `
      )}
                          </ul>
                        </li>
                      `;
    })}
                  </ul>
                ` : p ? g`
                <div class="entity-cards">
                  ${d.map(
      (v) => g` <div class="entity-card">
                      ${this._getOrCreateCard(v)}
                    </div>`
    )}
                </div>
              ` : g`${u.map(([v, H]) => {
      const F = c.get(v) ?? (v === "unassigned" ? "Unassigned" : v);
      return g`
                  <div class="cards-wrapper">
                    <h4>${F}</h4>
                    <div class="entity-cards">
                      ${H.map(
        (it) => g`
                          <div class="entity-card">
                            ${this._getOrCreateCard(it)}
                          </div>
                        `
      )}
                    </div>
                  </div>
                `;
    })}`}
          ${l.length === 0 ? this.content : ""}
        </div>
      </ha-dialog>
    `;
  }
}, Q.styles = ct`
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none;
    }

    ha-dialog {
      --dialog-content-padding: 12px;
      --mdc-dialog-min-width: calc((var(--columns, 4) * 22.5vw) + 3vw);
      --mdc-dialog-max-width: calc((var(--columns, 4) * 22.5vw) + 5vw);
      box-sizing: border-box;
      overflow-x: auto;
    }

    .dialog-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      min-width: 15vw;
    }
    .dialog-header .menu-button {
      margin-left: auto;
    }
    .dialog-content {
      margin-bottom: 16px;
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
      width: calc(var(--columns, 4) * 22.5vw);
      box-sizing: border-box;
      font-size: 1.2em;
      margin: 0.8em 0.2em;
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
        width: 45vw;
      }
      .entity-cards {
        grid-template-columns: repeat(var(--columns, 2), 45vw);
      }
      h4 {
        width: calc(var(--columns, 2) * 45vw);
        margin: 0.8em 0.2em;
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
        width: 100%;
      }
      .entity-cards {
        grid-template-columns: 1fr;
      }
      h4 {
        width: 100%;
        font-size: 1.2em;
        margin: 0.6em 0;
        padding: 0 8px;
        box-sizing: border-box;
      }
    }
  `, Q);
D([
  b({ type: Boolean })
], M.prototype, "open");
D([
  b({ type: String })
], M.prototype, "title");
D([
  b({ type: String })
], M.prototype, "selectedDomain");
D([
  b({ type: String })
], M.prototype, "selectedDeviceClass");
D([
  b({ type: String })
], M.prototype, "content");
D([
  b({ type: Array })
], M.prototype, "entities");
D([
  b({ attribute: !1 })
], M.prototype, "hass");
D([
  b({ attribute: !1 })
], M.prototype, "card");
D([
  w()
], M.prototype, "_showAll");
D([
  w()
], M.prototype, "selectedGroup");
let Hi = M;
customElements.define("popup-dialog", Hi);
const Jt = class Jt extends N {
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
    var a, r;
    if (!this.open || !this.hass || !this.card) return g``;
    const t = this.selectedDomain || "", i = this.selectedDeviceClass, o = i ? `${k(t)} - ${i}` : t, s = (r = (a = this.card) == null ? void 0 : a.getCustomizationForType) == null ? void 0 : r.call(a, o), n = (s == null ? void 0 : s.invert) === !0;
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
Jt.styles = ct``;
let G = Jt;
D([
  b({ type: Boolean })
], G.prototype, "open");
D([
  b({ attribute: !1 })
], G.prototype, "hass");
D([
  b({ attribute: !1 })
], G.prototype, "card");
D([
  b({ type: String })
], G.prototype, "selectedDomain");
D([
  b({ type: String })
], G.prototype, "selectedDeviceClass");
customElements.define("popup-dialog-confirmation", G);
var Ii = Object.defineProperty, Mi = Object.getOwnPropertyDescriptor, S = (e, t, i, o) => {
  for (var s = o > 1 ? void 0 : o ? Mi(t, i) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (s = (o ? a(t, i, s) : a(s)) || s);
  return o && s && Ii(t, i, s), s;
};
let A = class extends N {
  constructor() {
    super(...arguments), this.areas = [], this.devices = [], this.entities = [], this.entitiesByDomain = {}, this.selectedDomain = null, this.selectedDeviceClass = null, this.hiddenEntities = [], this.hiddenLabels = [], this.hiddenAreas = [], this.hide_person = !1, this.hide_content_name = !0, this.list_mode = !1, this._showAll = !1, this._confirmOpen = !1, this._confirmParams = {
      domain: "",
      deviceClass: void 0
    }, this.selectedGroup = null, this._entitiesByDomain = x(
      (e, t, i, o) => {
        const s = this._config.area || null, n = this._config.floor || null, a = this._config.label || null, r = new Map(
          t.map((d) => [d.id, d])
        ), c = i ?? [], l = e.filter((d) => {
          var P, dt, ut;
          if (I(d.entity_id) === "update")
            return !d.hidden_by && !d.disabled_by;
          const u = d.device_id ? r.get(d.device_id) : null;
          if (!(d.area_id !== null || u && u.area_id !== null) || !(a ? ((P = d.labels) == null ? void 0 : P.some((z) => a.includes(z))) || (((dt = u == null ? void 0 : u.labels) == null ? void 0 : dt.some((z) => a.includes(z))) ?? !1) : !0))
            return !1;
          const f = s ? Array.isArray(s) ? s : [s] : null, y = n ? Array.isArray(n) ? n : [n] : null, B = f ? d.area_id !== void 0 && f.includes(d.area_id) || u && u.area_id !== void 0 && f.includes(u.area_id) : !0, L = y ? d.area_id !== void 0 && c.some(
            (z) => z.area_id === d.area_id && z.floor_id !== void 0 && y.includes(z.floor_id)
          ) || (u == null ? void 0 : u.area_id) && c.some(
            (z) => z.area_id === u.area_id && z.floor_id !== void 0 && y.includes(z.floor_id)
          ) : !0, $ = this.hiddenAreas && this.hiddenAreas.length > 0 ? !(d.area_id && this.hiddenAreas.includes(d.area_id) || u && u.area_id && this.hiddenAreas.includes(u.area_id)) : !0;
          return !d.hidden_by && !d.disabled_by && B && L && $ && !((ut = d.labels) != null && ut.some((z) => this.hiddenLabels.includes(z))) && !this.hiddenEntities.includes(d.entity_id);
        }).map((d) => d.entity_id), h = {};
        for (const d of l) {
          const m = I(d);
          if (!Wt.includes(m))
            continue;
          const u = o[d];
          u && (m in h || (h[m] = []), h[m].push(u));
        }
        return h;
      }
    ), this.computeLabel = x(
      (e, t, i) => Ot(this.hass, e, t, i)
    ), this._computeExtraItems = x(
      (e, t) => {
        const i = e.content || [];
        return e.extra_entities ? e.extra_entities.reduce((o, s) => {
          var p;
          if (!i.includes(s)) return o;
          const n = t[s];
          if (!n) return o;
          const a = (p = e.customization) == null ? void 0 : p.find(
            (_) => _.type === s
          );
          if (a && a.state !== void 0 && a.invert_state !== void 0) {
            const _ = a.invert_state === "true", f = n.state === a.state;
            if (!_ && !f || _ && f) return o;
          }
          const r = i.indexOf(s), c = r >= 0 ? r : 0, l = this.getCustomIcon(s, void 0, n), h = this.getCustomName(s, void 0, n) ?? n.attributes.friendly_name ?? s, d = this.getCustomColor(s, void 0), m = this.getCustomCSS(
            s,
            void 0
          ), u = this.getBackgroundColor(
            s,
            void 0
          );
          return o.push({
            type: "extra",
            panel: s,
            entity: n,
            order: c,
            icon: l,
            name: h,
            color: d,
            icon_css: m,
            background_color: u
          }), o;
        }, []).sort((o, s) => o.order - s.order) : [];
      }
    ), this._computeGroupItems = x(
      (e, t) => e.map((i, o) => {
        const s = t.find((a) => a.group_id === i);
        if (!(!s || !Object.keys(s).some(
          (a) => a !== "group_id" && a !== "group_icon" && s[a] !== void 0 && s[a] !== ""
        )))
          return {
            type: "group",
            group_id: i,
            order: o,
            ruleset: s
          };
      }).filter(
        (i) => !!i
      )
    ), this._computeDomainItems = x(
      (e) => e.reduce((t, i) => (i.includes(" - ") || t.push({
        type: "domain",
        domain: i,
        order: e.indexOf(i)
      }), t), [])
    ), this._computeDeviceClassItems = x(
      (e) => e.reduce((t, i) => {
        if (i.includes(" - ")) {
          const [o, s] = i.split(" - ");
          t.push({
            type: "deviceClass",
            domain: o.trim().toLowerCase().replace(/\s+/g, "_"),
            deviceClass: s.trim().toLowerCase(),
            order: e.indexOf(i)
          });
        }
        return t;
      }, [])
    ), this._computeSortedEntities = x(
      (e, t, i, o) => [...e, ...t, ...i, ...o].sort(
        (s, n) => s.order - n.order
      )
    );
  }
  firstUpdated(e) {
    this._loadData();
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      rows: 2
    };
  }
  async _loadData() {
    var e, t, i;
    try {
      const [o, s, n] = await Promise.all([
        ((e = this.hass) == null ? void 0 : e.callWS({
          type: "config/area_registry/list"
        })) ?? [],
        ((t = this.hass) == null ? void 0 : t.callWS({
          type: "config/device_registry/list"
        })) ?? [],
        ((i = this.hass) == null ? void 0 : i.callWS({
          type: "config/entity_registry/list"
        })) ?? []
      ]);
      this.areas = o, this.devices = s, this.entities = n, this._processEntities();
    } catch (o) {
      console.error("Error loading data:", o);
    }
  }
  _processEntities() {
    const e = this._entitiesByDomain(
      this.entities,
      this.devices,
      this.areas ?? [],
      this.hass.states
    );
    Ct.setEntitiesByDomain(
      Object.fromEntries(
        Object.entries(e).map(([t, i]) => [
          t,
          i.map((o) => o.entity_id)
        ])
      )
    ), this.entitiesByDomain = e;
  }
  _baseEntities(e, t) {
    return (this._entitiesByDomain(
      this.entities,
      this.devices,
      this.areas ?? [],
      this.hass.states
    )[e] || []).filter((o) => {
      const s = o.state;
      if (s === "unavailable" || s === "unknown")
        return !1;
      const n = o.attributes.device_class;
      return e === "switch" ? t === "outlet" ? n === "outlet" : t === "switch" ? n === "switch" || n === void 0 : !0 : !t || n === t;
    });
  }
  _totalEntities(e, t) {
    return this._baseEntities(e, t);
  }
  _shouldShowTotalEntities(e, t) {
    if (this._config.show_total_entities) return !0;
    const i = t ? `${k(e)} - ${t}` : e, o = this.getCustomizationForType(i);
    return (o == null ? void 0 : o.show_total_entities) === !0;
  }
  _shouldShowTotalNumbers(e, t) {
    if (this._config.show_total_number) return !0;
    const i = t ? `${k(e)} - ${t}` : e, o = this.getCustomizationForType(i);
    return (o == null ? void 0 : o.show_total_number) === !0;
  }
  _isOn(e, t) {
    var n;
    const i = this._baseEntities(e, t), o = t ? `${k(e)} - ${t}` : e, s = ((n = this.getCustomizationForType(o)) == null ? void 0 : n.invert) === !0;
    return i.filter((a) => {
      if (e === "climate") {
        const c = a.attributes.hvac_action;
        if (c !== void 0) {
          const l = !["idle", "off"].includes(c);
          return s ? !l : l;
        }
      }
      if (e === "humidifier") {
        const c = a.attributes.action;
        if (c !== void 0) {
          const l = !["idle", "off"].includes(c);
          return s ? !l : l;
        }
      }
      let r = !ve.includes(a.state);
      return s ? !r : r;
    });
  }
  setConfig(e) {
    if (!e)
      throw new Error("Invalid configuration.");
    this._config = e, this.hide_person = e.hide_person !== void 0 ? e.hide_person : !1, this.hide_content_name = e.hide_content_name !== void 0 ? e.hide_content_name : !1, this.list_mode = e.list_mode !== void 0 ? e.list_mode : !1, this.hiddenEntities = e.hidden_entities || [], this.hiddenLabels = e.hidden_labels || [], this.hiddenAreas = e.hidden_areas || [];
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
    var s, n, a;
    let t = "Details";
    typeof e == "string" ? t = this.getCustomName(e) || this.computeLabel({ name: e }) : typeof e == "number" && ((s = this._config.content) != null && s[e]) && (t = this._config.content[e]);
    let i = [];
    if (typeof e == "number") {
      const r = (n = this._config.content) == null ? void 0 : n[e], c = (a = this._config.rulesets) == null ? void 0 : a.find(
        (l) => l.group_id === r
      );
      i = c ? xt(this, c) : [];
    } else {
      const r = this.selectedDeviceClass || void 0;
      i = this._shouldShowTotalEntities(e, r) ? this._totalEntities(e, r) : this._isOn(e, r);
    }
    this._showPopup(this, "popup-dialog", {
      title: t,
      hass: this.hass,
      entities: i,
      selectedDomain: typeof e == "string" ? e : void 0,
      selectedDeviceClass: this.selectedDeviceClass || void 0,
      selectedGroup: this.selectedGroup || void 0,
      card: this,
      content: i.length ? void 0 : "Keine Entitäten"
    });
  }
  updated(e) {
    if (super.updated(e), !this._config || !this.hass) return;
    const t = e.get("hass"), i = e.get("_config");
    if (e.has("selectedDomain") && this.selectedDomain) {
      const o = this.selectedDomain;
      if (o.includes(".")) {
        const s = o, n = this.hass.states[s];
        n && this.showMoreInfo(n);
      } else
        this._openDomainPopup(o);
      setTimeout(() => {
        this.selectedDomain = null;
      }, 0);
    }
    if (e.has("selectedGroup") && this.selectedGroup !== null) {
      const o = this.selectedGroup;
      this._openDomainPopup(o), setTimeout(() => {
        this.selectedGroup = null;
      }, 0);
    }
    (e.has("hass") && (!t || t.themes !== this.hass.themes) || e.has("_config") && (!i || i.theme !== this._config.theme)) && Ti(this, this.hass.themes, this._config.theme);
  }
  showMoreInfo(e) {
    const t = new CustomEvent("hass-more-info", {
      detail: { entityId: e.entity_id },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(t);
  }
  getStatusProperty(e, t, i) {
    if (this._shouldShowTotalEntities(e, t) && !this._shouldShowTotalNumbers(e, t))
      return "";
    const o = [
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
    ];
    let s;
    t ? s = `${k(e)} - ${t}` : s = e;
    const n = this.getCustomizationForType(s), a = (n == null ? void 0 : n.invert) === !0;
    switch (e) {
      case "device_tracker": {
        const r = O(
          this.hass,
          "home",
          "device_tracker"
        ), c = O(
          this.hass,
          "not_home",
          "device_tracker"
        );
        return a ? c : r;
      }
      case "lock":
      case "cover": {
        const r = O(this.hass, "open", "cover"), c = O(
          this.hass,
          "closed",
          "cover"
        );
        return a ? c : r;
      }
      case "person":
        return i === "home" ? O(this.hass, "home", "person") : i === "not_home" ? O(this.hass, "not_home", "person") : i ?? "unknown";
      default: {
        if (t && o.includes(t)) {
          const l = O(this.hass, "open", "cover"), h = O(
            this.hass,
            "closed",
            "cover"
          );
          return a ? h : l;
        }
        const r = O(
          this.hass,
          i ?? "on",
          "light"
        ), c = O(
          this.hass,
          i ?? "off",
          "light"
        );
        return a ? c : r;
      }
    }
  }
  getCustomizationForType(e) {
    var t;
    if (e)
      return (t = this._config.customization) == null ? void 0 : t.find(
        (i) => {
          var o;
          return ((o = i.type) == null ? void 0 : o.toLowerCase()) === e.toLowerCase();
        }
      );
  }
  getCustomIcon(e, t, i) {
    let o;
    t ? o = `${k(e)} - ${t}` : o = e;
    const s = this.getCustomizationForType(o);
    if ((s == null ? void 0 : s.show_entity_picture) === !0 && i && i.attributes && i.attributes.entity_picture)
      return i.attributes.entity_picture;
    if (s && s.icon)
      return s.icon;
    if (i && i.attributes && i.attributes.icon)
      return i.attributes.icon;
    if (!i) {
      const a = (s == null ? void 0 : s.invert) === !0 ? "off" : "on";
      let r = e;
      return !t && e.includes(".") && (r = e.split(".")[0]), pi(r, a, t);
    }
    return "";
  }
  getBackgroundColor(e, t) {
    var s;
    const i = t ? `${k(e)} - ${t}` : e, o = this.getCustomizationForType(i);
    return o && Array.isArray(o.background_color) ? `rgb(${o.background_color.join(",")})` : Array.isArray((s = this._config) == null ? void 0 : s.background_color) ? `rgb(${this._config.background_color.join(",")})` : "rgba(var(--rgb-primary-text-color), 0.15)";
  }
  getCustomColor(e, t) {
    let i;
    t ? i = `${k(e)} - ${t}` : i = e;
    const o = this.getCustomizationForType(i);
    if (o && o.icon_color)
      return o.icon_color;
    if (this._config && this._config.color)
      return this._config.color;
  }
  getCustomName(e, t, i) {
    let o;
    t ? o = `${k(e)} - ${t}` : o = e;
    const s = this.getCustomizationForType(o);
    if (s && s.name)
      return s.name;
    if (i && i.attributes.friendly_name)
      return i.attributes.friendly_name;
  }
  getCustomCSS(e, t) {
    let i;
    t ? i = `${k(e)} - ${t}` : i = e;
    const o = this.getCustomizationForType(i);
    if (o && o.icon_css)
      return o.icon_css;
  }
  toggleDomain(e, t) {
    e = e ?? this.selectedDomain, t = t ?? this.selectedDeviceClass, t && `${k(e)}${t}`;
    const i = this._isOn(e, t);
    if (i.length === 0) {
      console.warn(`Keine aktiven Entitäten für ${e} gefunden.`);
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
    ].includes(e)) {
      this.hass.callService(e, "toggle", {
        entity_id: i.map((o) => o.entity_id)
      });
      return;
    }
    for (const o of i) {
      let s = !ve.includes(o.state);
      e === "media_player" ? this.hass.callService(e, s ? "media_pause" : "media_play", {
        entity_id: o.entity_id
      }) : e === "lock" ? this.hass.callService(e, s ? "lock" : "unlock", {
        entity_id: o.entity_id
      }) : e === "vacuum" ? this.hass.callService(e, s ? "stop" : "start", {
        entity_id: o.entity_id
      }) : e === "alarm_control_panel" ? this.hass.callService(
        e,
        s ? "alarm_arm_away" : "alarm_disarm",
        { entity_id: o.entity_id }
      ) : e === "lawn_mower" ? this.hass.callService(e, s ? "pause" : "start_mowing", {
        entity_id: o.entity_id
      }) : e === "water_heater" ? this.hass.callService(e, s ? "turn_off" : "turn_on", {
        entity_id: o.entity_id
      }) : e === "update" && this.hass.callService(e, s ? "skip" : "install", {
        entity_id: o.entity_id
      });
    }
  }
  _handleDomainAction(e, t) {
    return (i) => {
      var h, d, m;
      i.stopPropagation();
      let o = t ? `${k(e)} - ${t}` : e;
      const s = this.getCustomizationForType(o);
      let n, a;
      i.detail.action === "tap" ? (n = s == null ? void 0 : s.tap_action, a = (h = this._config) == null ? void 0 : h.tap_action) : i.detail.action === "hold" ? (n = s == null ? void 0 : s.hold_action, a = (d = this._config) == null ? void 0 : d.hold_action) : i.detail.action === "double_tap" && (n = s == null ? void 0 : s.double_tap_action, a = (m = this._config) == null ? void 0 : m.double_tap_action);
      const r = n !== void 0 ? n : a, c = typeof r == "string" && r === "more-info" || typeof r == "object" && (r == null ? void 0 : r.action) === "more-info", l = typeof r == "string" && r === "toggle" || typeof r == "object" && (r == null ? void 0 : r.action) === "toggle";
      if (e.includes(".")) {
        const u = e, p = this.hass.states[u], _ = I(u);
        if (l) {
          this.hass.callService(_, "toggle", { entity_id: u });
          return;
        }
        if (c) {
          this.showMoreInfo(p);
          return;
        }
      }
      if (c || r === void 0) {
        this.selectedDomain = e, this.selectedDeviceClass = t || null;
        return;
      }
      if (l) {
        this.toggleDomain(e, t);
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
        i.detail.action
      );
    };
  }
  getPersonItems() {
    return this.hide_person ? [] : this.entities.filter(
      (e) => {
        var t;
        return e.entity_id.startsWith("person.") && !this.hiddenEntities.includes(e.entity_id) && !((t = e.labels) != null && t.some((i) => this.hiddenLabels.includes(i))) && !e.hidden_by && !e.disabled_by;
      }
    ).reverse().map((e) => this.hass.states[e.entity_id]).filter((e) => !!e);
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
  _getIconStyles(e, t = {}) {
    const { color: i, background_color: o, square: s, isNotHome: n } = t, a = {
      "border-radius": s ? "20%" : "50%",
      "background-color": o,
      color: i ? `var(--${i}-color)` : void 0
    };
    return e === "person" && n && (a.filter = "grayscale(100%)"), a;
  }
  renderPersonEntities() {
    return this.getPersonItems().map((t) => {
      var a, r;
      const i = this.hass.states[t.entity_id], o = (i == null ? void 0 : i.state) !== "home", s = {
        horizontal: this._config.content_layout === "horizontal"
      }, n = {
        "border-radius": (a = this._config) != null && a.square ? "20%" : "50%",
        filter: o ? "grayscale(100%)" : "none"
      };
      return g`
        <sl-tab
          slot="nav"
          panel=${t.entity_id}
          @click="${() => this.showMoreInfo(t)}"
        >
          <div class="entity ${st(s)}">
            <div class="entity-icon" style=${R(n)}>
              ${t.attributes.entity_picture ? g`<img
                    src=${t.attributes.entity_picture}
                    alt=${t.attributes.friendly_name || t.entity_id}
                    style=${R(n)}
                  />` : g`<ha-icon
                    class="center"
                    icon=${t.attributes.icon || "mdi:account"}
                    style=${R(n)}
                  ></ha-icon>`}
            </div>
            <div class="entity-info">
              ${this.hide_content_name ? "" : g`<div class="entity-name">
                    ${((r = t.attributes.friendly_name) == null ? void 0 : r.split(" ")[0]) || ""}
                  </div>`}
              <div class="entity-state">
                ${this.getStatusProperty(
        "person",
        void 0,
        i == null ? void 0 : i.state
      )}
              </div>
            </div>
          </div>
        </sl-tab>
      `;
    });
  }
  renderExtraTab(e) {
    const { panel: t, entity: i, icon: o, name: s, color: n, icon_css: a, background_color: r } = e, c = this.hass.states[t], l = i.state, h = Number(l), d = !Number.isNaN(h) && l !== "" ? yi(h, this.hass.locale) : O(this.hass, l, I(t)), m = i.attributes.unit_of_measurement, u = this.getCustomizationForType(t), p = this._handleDomainAction(t), _ = bt({
      hasHold: nt(
        (u == null ? void 0 : u.hold_action) ?? this._config.hold_action
      ),
      hasDoubleClick: nt(
        (u == null ? void 0 : u.double_tap_action) ?? this._config.double_tap_action
      )
    }), f = {
      horizontal: this._config.content_layout === "horizontal"
    }, y = this._getIconStyles("extra", {
      color: n,
      background_color: r,
      square: this._config.square
    });
    return g`
      <sl-tab slot="nav" panel=${t} @action=${p} .actionHandler=${_}>
        <div class="extra-entity ${st(f)}">
          <div class="entity-icon" style=${R(y)}>
            ${o.startsWith("/") || o.startsWith("http") ? g`<img
                  src=${o}
                  alt=${s}
                  style="border-radius:${this._config.square ? "20%" : "50%"};object-fit:cover;"
                />` : g`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${c}
                  .icon=${o}
                  data-domain=${I(t)}
                  data-state=${c.state}
                  style="${a || ""}"
                ></ha-state-icon>`}
          </div>
          <div class="entity-info">
            ${this.hide_content_name ? "" : g`<div class="entity-name">${s}</div>`}
            <div class="entity-state">
              ${d}${m ? ` ${m}` : ""}
            </div>
          </div>
        </div>
      </sl-tab>
    `;
  }
  renderGroupTab(e, t) {
    const i = xt(this, e);
    if (!i.length) return g``;
    const o = e.group_id || this.hass.localize(
      "component.group.entity_component._.name ${index + 1}"
    ), s = e.group_icon || "mdi:format-list-group", n = this.getCustomColor(o), a = this.getBackgroundColor(o), r = () => {
      this.selectedGroup = t;
    }, c = bt({
      hasHold: !1,
      hasDoubleClick: !1
    }), l = {
      horizontal: this._config.content_layout === "horizontal"
    }, h = this._getIconStyles("domain", {
      color: n,
      background_color: a,
      square: this._config.square
    });
    return g`
      <sl-tab
        slot="nav"
        panel=${"group-" + t}
        @action=${r}
        .actionHandler=${c}
      >
        <div class="entity ${st(l)}">
          <div class="entity-icon" style=${R(h)}>
            <ha-icon icon=${s}></ha-icon>
          </div>
          <div class="entity-info">
            ${this.hide_content_name ? "" : g`<div class="entity-name">${o}</div>`}
            <div class="entity-state">
              ${i.length}
              ${e.group_status ? ` ${e.group_status}` : ""}
            </div>
          </div>
        </div>
      </sl-tab>
    `;
  }
  renderDomainTab(e) {
    const { domain: t } = e, i = this._isOn(t), o = this._totalEntities(t);
    if (!(this._shouldShowTotalEntities(t) ? o : i).length) return g``;
    const a = this.getCustomColor(t), r = this.getCustomizationForType(t), c = this._handleDomainAction(t), l = bt({
      hasHold: nt(
        (r == null ? void 0 : r.hold_action) ?? this._config.hold_action
      ),
      hasDoubleClick: nt(
        (r == null ? void 0 : r.double_tap_action) ?? this._config.double_tap_action
      )
    }), h = {
      horizontal: this._config.content_layout === "horizontal"
    }, d = this._getIconStyles("domain", {
      color: a,
      background_color: this.getBackgroundColor(t),
      square: this._config.square
    });
    return g`
      <sl-tab
        slot="nav"
        panel=${t}
        @action=${c}
        .actionHandler=${l}
      >
        <div class="entity ${st(h)}">
          <div class="entity-icon" style=${R(d)}>
            <ha-icon
              icon=${this.getCustomIcon(t)}
              style=${R({})}
            ></ha-icon>
          </div>
          <div class="entity-info">
            ${this.hide_content_name ? "" : g`<div class="entity-name">
                  ${this.getCustomName(t) || this.computeLabel({ name: t })}
                </div>`}
            <div class="entity-state">
              ${this._shouldShowTotalNumbers(t) ? `${i.length}/${o.length} ${this.getStatusProperty(
      t
    )}` : this._shouldShowTotalEntities(t) ? `${o.length}` : `${i.length} ${this.getStatusProperty(t)}`}
            </div>
          </div>
        </div>
      </sl-tab>
    `;
  }
  renderDeviceClassTab(e) {
    const { domain: t, deviceClass: i } = e, o = this._isOn(t, i), s = this._totalEntities(t, i);
    if (!(this._shouldShowTotalEntities(t, i) ? s : o).length) return g``;
    const r = this.getCustomColor(t, i), c = `${k(t)} - ${i}`, l = this.getCustomizationForType(c), h = this._handleDomainAction(t, i), d = bt({
      hasHold: nt(
        (l == null ? void 0 : l.hold_action) ?? this._config.hold_action
      ),
      hasDoubleClick: nt(
        (l == null ? void 0 : l.double_tap_action) ?? this._config.double_tap_action
      )
    }), m = {
      horizontal: this._config.content_layout === "horizontal"
    }, u = this._getIconStyles("deviceClass", {
      color: r,
      background_color: this.getBackgroundColor(t, i),
      square: this._config.square
    });
    return g`
      <sl-tab
        slot="nav"
        panel=${i}
        @action=${h}
        .actionHandler=${d}
      >
        <div class="entity ${st(m)}">
          <div class="entity-icon" style=${R(u)}>
            <ha-icon icon=${this.getCustomIcon(t, i)}></ha-icon>
          </div>
          <div class="entity-info">
            ${this.hide_content_name ? "" : g`<div class="entity-name">
                  ${this.getCustomName(t, i) || this.computeLabel({ name: i })}
                </div>`}
            <div class="entity-state">
              ${this._shouldShowTotalNumbers(t, i) ? `${o.length}/${s.length} ${this.getStatusProperty(
      t,
      i
    )}` : this._shouldShowTotalEntities(t, i) ? `${s.length}` : `${o.length} ${this.getStatusProperty(
      t,
      i
    )}`}
            </div>
          </div>
        </div>
      </sl-tab>
    `;
  }
  renderTab(e) {
    switch (e.type) {
      case "extra":
        return this.renderExtraTab(e);
      case "group":
        return this.renderGroupTab(e.ruleset, e.order);
      case "domain":
        return this.renderDomainTab(e);
      case "deviceClass":
        return this.renderDeviceClassTab(e);
    }
  }
  render() {
    const e = this.getExtraItems(), t = this.getGroupItems(), i = this.getDomainItems(), o = this.getDeviceClassItems(), s = this._computeSortedEntities(
      e,
      t,
      i,
      o
    ), n = {
      "no-scroll": !!this._config.no_scroll
    };
    return g`
      <ha-card>
        <sl-tab-group no-scroll-controls class=${st(n)}>
          ${this.renderPersonEntities()}
          ${Se(
      s,
      (a) => a.type === "extra" ? a.panel : a.type === "domain" ? a.domain : a.type === "deviceClass" ? `${a.domain}-${a.deviceClass}` : a.type === "group" ? `group-${a.group_id}` : "",
      (a) => this.renderTab(a)
    )}
        </sl-tab-group>
      </ha-card>
    `;
  }
  static get styles() {
    return ct`
      ha-card {
        overflow: hidden;
        position: relative;
        height: 100%;
        align-content: center;
      }
      sl-tab-group {
        padding: 6px 4px;
        align-content: center;
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
      sl-tab {
        pointer-events: auto;
      }
      sl-tab * {
        pointer-events: none;
      }
      sl-tab::part(base) {
        padding: 0 8px !important;
        display: flex;
      }
      sl-tab-group::part(tabs) {
        border-bottom: none !important;
      }
      sl-tab-group.no-scroll::part(tabs) {
        display: flex;
        flex-wrap: wrap;
        overflow-x: visible !important;
        max-width: 100%;
        border-bottom: none !important;
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
S([
  b({ attribute: !1 })
], A.prototype, "hass", 2);
S([
  b({ type: Object })
], A.prototype, "_config", 2);
S([
  w()
], A.prototype, "areas", 2);
S([
  w()
], A.prototype, "devices", 2);
S([
  w()
], A.prototype, "entities", 2);
S([
  w()
], A.prototype, "entitiesByDomain", 2);
S([
  w()
], A.prototype, "selectedDomain", 2);
S([
  w()
], A.prototype, "selectedDeviceClass", 2);
S([
  w()
], A.prototype, "hiddenEntities", 2);
S([
  w()
], A.prototype, "hiddenLabels", 2);
S([
  w()
], A.prototype, "hiddenAreas", 2);
S([
  w()
], A.prototype, "hide_person", 2);
S([
  w()
], A.prototype, "hide_content_name", 2);
S([
  w()
], A.prototype, "list_mode", 2);
S([
  w()
], A.prototype, "_showAll", 2);
S([
  w()
], A.prototype, "_confirmOpen", 2);
S([
  w()
], A.prototype, "_confirmParams", 2);
S([
  w()
], A.prototype, "selectedGroup", 2);
A = S([
  kt("status-card")
], A);
var Bi = Object.defineProperty, Ni = Object.getOwnPropertyDescriptor, Lt = (e, t, i, o) => {
  for (var s = o > 1 ? void 0 : o ? Ni(t, i) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (s = (o ? a(t, i, s) : a(s)) || s);
  return o && s && Bi(t, i, s), s;
};
class Kt extends N {
  constructor() {
    super(...arguments), this.SelectOptions = [], this._entityKeys = /* @__PURE__ */ new WeakMap();
  }
  _getKey(t) {
    return this._entityKeys.has(t) || this._entityKeys.set(t, Math.random().toString()), this._entityKeys.get(t);
  }
  render() {
    return this.hass ? g`
      <div class="customization">
        ${this.customizationkey && Se(
      this.customizationkey,
      (t) => this._getKey(t),
      (t, i) => g`
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
                .value=${t.type}
                @closed=${(o) => o.stopPropagation()}
                @value-changed=${this._valueChanged}
              >
                ${this.SelectOptions.map(
        (o) => g`<mwc-list-item .value=${o.value}
                      >${o.label}</mwc-list-item
                    >`
      )}
              </ha-select>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.remove")}
                .path=${Gt}
                class="remove-icon"
                .index=${i}
                @click=${this._removeRow}
              ></ha-icon-button>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.edit")}
                .path=${di}
                class="edit-icon"
                .index=${i}
                @click=${this._editRow}
              ></ha-icon-button>
            </div>
          `
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
            @closed=${(t) => t.stopPropagation()}
            @click=${this._addRow}
          >
            ${this.SelectOptions.map(
      (t) => g`<mwc-list-item .value=${t.value}
                  >${t.label}</mwc-list-item
                >`
    )}
          </ha-select>
        </div>
      </div>
    ` : C;
  }
  _valueChanged(t) {
    if (!this.customizationkey || !this.hass)
      return;
    const i = t.detail.value, o = t.target.index, s = this.customizationkey.concat();
    s[o] = { ...s[o], type: i || "" }, T(this, this.customizationChangedEvent, s);
  }
  _removeRow(t) {
    t.stopPropagation();
    const i = t.currentTarget.index;
    if (i != null) {
      const o = this.customizationkey.concat();
      o.splice(i, 1), T(
        this,
        this.customizationChangedEvent,
        o
      );
    }
  }
  _editRow(t) {
    t.stopPropagation();
    const i = t.target.index;
    i != null && T(this, "edit-item", i);
  }
  _addRow(t) {
    if (t.stopPropagation(), !this.customizationkey || !this.hass)
      return;
    const i = this.shadowRoot.querySelector(
      ".add-customization"
    );
    if (!i || !i.value)
      return;
    const s = { type: i.value };
    T(this, this.customizationChangedEvent, [
      ...this.customizationkey,
      s
    ]), i.value = "";
  }
  static get styles() {
    return ct`
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
Lt([
  b({ attribute: !1 })
], Kt.prototype, "hass", 2);
Lt([
  b({ type: Array })
], Kt.prototype, "SelectOptions", 2);
let jt = class extends Kt {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customizationkey() {
    return this.customization;
  }
};
Lt([
  b({ attribute: !1 })
], jt.prototype, "customization", 2);
jt = Lt([
  kt("status-items-editor")
], jt);
var ji = Object.defineProperty, Ui = Object.getOwnPropertyDescriptor, K = (e, t, i, o) => {
  for (var s = o > 1 ? void 0 : o ? Ui(t, i) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (s = (o ? a(t, i, s) : a(s)) || s);
  return o && s && ji(t, i, s), s;
};
let U = class extends N {
  constructor() {
    super(...arguments), this.useSensorSchema = !1, this._schemadomain = x(() => {
      const e = [
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
        { name: "tap_action", selector: { ui_action: { actions: e } } },
        { name: "double_tap_action", selector: { ui_action: { actions: e } } },
        { name: "hold_action", selector: { ui_action: { actions: e } } },
        { name: "popup_card", selector: { object: {} } }
      ];
    }), this._schemaEntity = x(() => {
      var i;
      const e = ((i = this.config) == null ? void 0 : i.type) || "", t = [
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
              selector: { state: { entity_id: e } }
            }
          ]
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
    var i;
    if (!this.hass || !this.config)
      return g``;
    (i = this._config) != null && i.invert_state || (this._config = {
      ...this._config,
      invert_state: this.config.invert_state || "false",
      icon_color: this.config.icon_color || void 0,
      tap_action: this.config.tap_action || void 0,
      double_tap_action: this.config.double_tap_action || void 0,
      hold_action: this.config.hold_action || void 0
    });
    let e;
    switch (this.getSchema) {
      case "domain":
        e = this._schemadomain();
        break;
      case "entity":
        e = this._schemaEntity();
        break;
    }
    const t = {
      ...this._config
    };
    return g`
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${e}
        .computeLabel=${(o) => Ot(this.hass, o)}
        @value-changed=${this._valueChangedSchema}
      ></ha-form>
    `;
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
    return ct`
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
K([
  b({ attribute: !1 })
], U.prototype, "config", 2);
K([
  b({ attribute: !1 })
], U.prototype, "hass", 2);
K([
  b({ attribute: !1 })
], U.prototype, "lovelace", 2);
K([
  b({ type: Boolean })
], U.prototype, "useSensorSchema", 2);
K([
  b({ type: Number })
], U.prototype, "index", 2);
K([
  w()
], U.prototype, "getSchema", 2);
K([
  w()
], U.prototype, "_config", 2);
U = K([
  kt("status-item-editor")
], U);
var Fi = Object.defineProperty, Ri = Object.getOwnPropertyDescriptor, et = (e, t, i, o) => {
  for (var s = o > 1 ? void 0 : o ? Ri(t, i) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (s = (o ? a(t, i, s) : a(s)) || s);
  return o && s && Fi(t, i, s), s;
};
let W = class extends N {
  constructor() {
    super(...arguments), this._subElementEditorDomain = void 0, this._subElementEditorEntity = void 0, this.rulesets = [
      {
        group_id: "",
        group_icon: "",
        group_status: "",
        rules: [{ key: "", value: "" }]
      }
    ], this.computeLabel = x(
      (e, t, i) => Ot(this.hass, e, t, i)
    ), this._filterInitialized = !1, this._lastFilter = {
      area: [],
      floor: [],
      label: []
    }, this._schema = x(
      (e, t, i, o, s) => {
        const n = this.computeLabel({ name: "area" }), a = this.computeLabel({ name: "floor" }), r = this.computeLabel({ name: "label" }), c = this.computeLabel({ name: "entity" }), l = this.computeLabel({ name: "name" }), h = this.computeLabel({ name: "state" }), d = this.getAllEntities(), m = [
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
                    options: ["vertical", "horizontal"].map((u) => ({
                      label: this.hass.localize(
                        `ui.panel.lovelace.editor.card.tile.content_layout_options.${u}`
                      ),
                      value: u,
                      image: {
                        src: `/static/images/form/tile_content_layout_${u}.svg`,
                        src_dark: `/static/images/form/tile_content_layout_${u}_dark.svg`,
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
              { name: "tap_action", selector: { ui_action: { actions: m } } },
              { name: "double_tap_action", selector: { ui_action: { actions: m } } },
              { name: "hold_action", selector: { ui_action: { actions: m } } }
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
                          { value: "area", label: n },
                          { value: "floor", label: a }
                        ]
                      }
                    }
                  },
                  { name: "label_filter", selector: { boolean: {} } }
                ]
              },
              ...e === "area" && o === !1 ? [
                { name: "multiple_areas", selector: { boolean: {} } },
                { name: "area", selector: { area: {} } }
              ] : [],
              ...e === "area" && o === !0 ? [
                { name: "multiple_areas", selector: { boolean: {} } },
                { name: "area", selector: { area: { multiple: !0 } } }
              ] : [],
              ...e === "floor" && s === !1 ? [
                { name: "multiple_floors", selector: { boolean: {} } },
                { name: "floor", selector: { floor: {} } }
              ] : [],
              ...e === "floor" && s === !0 ? [
                { name: "multiple_floors", selector: { boolean: {} } },
                { name: "floor", selector: { floor: { multiple: !0 } } }
              ] : [],
              ...t ? [
                { name: "label", selector: { label: { multiple: !0 } } }
              ] : []
            ]
          },
          {
            name: "entities",
            flatten: !0,
            type: "expandable",
            icon: "mdi:invoice-text-edit",
            schema: [
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
                    selector: { select: { options: [c, r, n] } }
                  }
                ]
              },
              ...i === c ? [
                {
                  name: "hidden_entities",
                  selector: {
                    entity: { multiple: !0, include_entities: d }
                  }
                }
              ] : [],
              ...i === r ? [
                {
                  name: "hidden_labels",
                  selector: { label: { multiple: !0 } }
                }
              ] : [],
              ...i === n ? [
                {
                  name: "hidden_areas",
                  selector: { area: { multiple: !0 } }
                }
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
                      { value: "name", label: l },
                      { value: "state", label: h }
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
    ), this._toggleschema = x((e) => [
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
    ]), this._buildToggleOptions = x(
      (e, t) => this._buildOptions("toggle", e, t)
    ), this._memoizedClassesForArea = x(
      (e, t, i) => this._classesForArea(e, t, i)
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
    }, this._addRuleset = () => {
      this.rulesets = [
        ...this.rulesets,
        { group_id: "", group_icon: "", rules: [{ key: "", value: "" }] }
      ];
    }, this._removeRuleset = (e) => {
      this.rulesets = this.rulesets.filter((t, i) => i !== e), this._updateConfigFromRulesets();
    };
  }
  getAllEntities() {
    return Ct.getAllEntities();
  }
  setConfig(e) {
    this._config = {
      ...e,
      columns: e.columns ?? 4,
      hide_person: e.hide_person ?? !1,
      list_mode: e.list_mode ?? !1,
      hide_content_name: e.hide_content_name ?? !1,
      customization: e.customization ?? []
    }, this._loadRulesetsFromConfig();
  }
  _updateAreaFloorInConfig() {
    if (!this._config || !this._config.filter) return;
    this._config.filter === "area" && this._config.floor !== void 0 ? (delete this._config.floor, T(this, "config-changed", { config: { ...this._config } })) : this._config.filter === "floor" && this._config.area !== void 0 && (delete this._config.area, T(this, "config-changed", { config: { ...this._config } }));
  }
  async updated(e) {
    super.updated(e);
    let t = !1;
    if (!(!this.hass || !this._config) && e.has("_config")) {
      this._updateAreaFloorInConfig(), (this._config.label_filter === !1 && this._config.label !== void 0 || Array.isArray(this._config.label) && this._config.label.length === 0) && (delete this._config.label, t = !0);
      const i = e.get("_config"), o = (i == null ? void 0 : i.extra_entities) ?? [], s = this._config.extra_entities ?? [], n = (i == null ? void 0 : i.content) ?? [], a = this._config.content ?? [], r = Array.isArray(this._config.area) ? [...this._config.area] : this._config.area ? [this._config.area] : [], c = Array.isArray(this._config.floor) ? [...this._config.floor] : this._config.floor ? [this._config.floor] : [], l = Array.isArray(this._config.label) ? [...this._config.label] : [];
      this._filterInitialized || (this._lastFilter = {
        area: r,
        floor: c,
        label: l
      }, this._filterInitialized = !0);
      const h = this._lastFilter.area, d = this._lastFilter.floor, m = this._lastFilter.label, u = !this.arraysEqual(m, l), p = !this.arraysEqual(d, c);
      if (!this.arraysEqual(h, r) || p || u) {
        const y = this._memoizedClassesForArea(
          r,
          c,
          l
        ).sort(
          (B, L) => ot.indexOf(B) - ot.indexOf(L)
        );
        this._config = {
          ...this._config,
          content: [...y]
        }, this._lastFilter = {
          area: [...r],
          floor: [...c],
          label: [...l]
        }, t = !0;
      }
      if (this._config.rulesets && Array.isArray(this._config.rulesets)) {
        const f = this._config.rulesets.filter(
          ($) => Object.keys($).some(
            (P) => P !== "group_id" && P !== "group_icon" && P !== "group_status" && $[P] !== void 0 && $[P] !== ""
          )
        ).map(($) => $.group_id).filter(($) => $ && $.length > 1);
        let y = Array.isArray(this._config.content) ? [...this._config.content] : [];
        y = y.filter(($) => !f.includes($));
        const B = this._config.extra_entities ?? [];
        let L = 0;
        for (let $ = 0; $ < y.length; $++) {
          if (!B.includes(y[$])) {
            L = $;
            break;
          }
          L = $ + 1;
        }
        y = [
          ...y.slice(0, L),
          ...f.filter(($) => !y.includes($)),
          ...y.slice(L)
        ], this.arraysEqual(y, this._config.content ?? []) || (this._config = {
          ...this._config,
          content: y
        }, t = !0);
      }
      if (!this.arraysEqual(o, s)) {
        let f = [...a];
        s.forEach((y) => {
          f.includes(y) || f.unshift(y);
        }), f = f.filter(
          (y) => !y.includes(".") || s.includes(y)
        ), this.arraysEqual(f, a) || (this._config = {
          ...this._config,
          content: f
        }, t = !0);
      }
      if (!this.arraysEqual(n, a)) {
        let f = [...s];
        f = f.filter((y) => a.includes(y)), this.arraysEqual(f, s) || (this._config = {
          ...this._config,
          extra_entities: f
        }, t = !0);
      }
      t && (T(this, "config-changed", { config: { ...this._config } }), this.requestUpdate());
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
        const o = e.rules.map((n, a) => a !== i ? n.key : null).filter((n) => n), s = this.ruleKeySelector.options.filter(
          ([n]) => !o.includes(n) || n === t.key
        );
        return {
          type: "grid",
          schema: [
            {
              type: "select",
              name: `key_${i}`,
              options: s
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
    this._config = e.detail.value, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config }
      })
    );
  }
  get toggleSelectOptions() {
    var e;
    return this._buildToggleOptions(
      this._memoizedClassesForArea(
        this._config.area || [],
        this._config.floor || [],
        this._config.label || []
      ),
      ((e = this._config) == null ? void 0 : e.content) || []
    );
  }
  get contentSelectOptions() {
    const e = this._config.content ?? [];
    return this._buildOptions("toggle", e, e);
  }
  arraysEqual(e, t) {
    return e.length === t.length && new Set(e).size === new Set(t).size;
  }
  _classesForArea(e, t, i) {
    var c;
    const o = ((c = this._config) == null ? void 0 : c.extra_entities) || [];
    let s = Object.values(this.hass.entities).filter(
      (l) => !l.hidden && Wt.includes(I(l.entity_id))
    );
    if (e && e.length > 0)
      s = s.filter(
        (l) => {
          var h;
          return e.includes(l.area_id) || l.device_id && e.includes((h = this.hass.devices[l.device_id]) == null ? void 0 : h.area_id);
        }
      );
    else if (t && t.length > 0) {
      const l = Object.values(this.hass.areas).filter(
        (h) => h.floor_id !== void 0 && t.includes(h.floor_id)
      ).map((h) => h.area_id);
      s = s.filter(
        (h) => {
          var d;
          return h.area_id !== void 0 && l.includes(h.area_id) || h.device_id && ((d = this.hass.devices[h.device_id]) == null ? void 0 : d.area_id) !== void 0 && l.includes(
            this.hass.devices[h.device_id].area_id
          );
        }
      );
    }
    i && i.length > 0 && (s = s.filter(
      (l) => {
        var h, d;
        return ((h = l.labels) == null ? void 0 : h.some((m) => i.includes(m))) || l.device_id && Array.isArray((d = this.hass.devices[l.device_id]) == null ? void 0 : d.labels) && this.hass.devices[l.device_id].labels.some(
          (m) => i.includes(m)
        );
      }
    ));
    const n = new Set(
      s.map((l) => I(l.entity_id)).filter((l) => l !== "binary_sensor" && l !== "cover" && l !== "switch")
    ), a = /* @__PURE__ */ new Set();
    s.filter(
      (l) => ["binary_sensor", "cover", "switch"].includes(
        I(l.entity_id)
      )
    ).forEach((l) => {
      var m;
      const h = I(l.entity_id), d = ((m = this.hass.states[l.entity_id]) == null ? void 0 : m.attributes.device_class) || "";
      d && a.add(`${k(h)} - ${d}`);
    });
    const r = [...a];
    return [...n, ...r, ...o].sort(
      (l, h) => {
        const d = ot.findIndex((u) => l.startsWith(u)), m = ot.findIndex((u) => h.startsWith(u));
        return (d === -1 ? ot.length : d) - (m === -1 ? ot.length : m);
      }
    );
  }
  _buildOptions(e, t, i) {
    const s = [.../* @__PURE__ */ new Set([...t, ...i])].map((n) => {
      const a = n.match(/^(.+?)\s*-\s*(.+)$/);
      if (a) {
        const r = a[1].toLowerCase().replace(" ", "_"), c = a[2].toLowerCase();
        if (r === "switch" && c === "switch") {
          const d = this.hass.localize(
            "component.switch.entity_component._.name"
          );
          return {
            value: n,
            label: `${d} - ${d}`
          };
        }
        const l = this.hass.localize(`component.${r}.entity_component._.name`) || a[1], h = this.hass.localize(
          `ui.dialogs.entity_registry.editor.device_classes.${r}.${c}`
        ) || a[2];
        return {
          value: n,
          label: `${l} - ${h}`
        };
      }
      return {
        value: n,
        label: n === "scene" ? "Scene" : e === "toggle" ? this.hass.localize(
          `component.${n}.entity_component._.name`
        ) || n : this.hass.localize(
          `component.${e}.entity_component.${n}.name`
        ) || n
      };
    });
    return s.sort((n, a) => {
      const r = n.value.includes("."), c = a.value.includes(".");
      return r && !c ? -1 : !r && c ? 1 : xi(
        n.label,
        a.label,
        this.hass.locale.language
      );
    }), s;
  }
  _itemChanged(e, t, i) {
    if (e.stopPropagation(), !this._config || !this.hass)
      return;
    const o = t == null ? void 0 : t.index;
    if (o != null) {
      const s = [...this._config.customization ?? []];
      s[o] = e.detail, T(this, "config-changed", {
        config: { ...this._config, customization: s }
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
    const t = e.detail, o = (this._config.customization ?? [])[t];
    let s;
    o && o.type && o.type.includes(".") ? s = "Entity" : s = "Domain", this._editItem(e, s);
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
    var c, l, h, d, m;
    const o = `_subElementEditor${e.charAt(0).toUpperCase() + e.slice(1)}`, s = this[o], n = ((h = (l = (c = this._config) == null ? void 0 : c.customization) == null ? void 0 : l[(s == null ? void 0 : s.index) ?? 0]) == null ? void 0 : h.type) ?? "unknown", a = n.match(/^(.+?)\s*-\s*(.+)$/);
    let r = n;
    if (a) {
      const u = a[1].toLowerCase().replace(" ", "_"), p = a[2].toLowerCase();
      if (u === "switch" && p === "switch") {
        const _ = this.hass.localize(
          "component.switch.entity_component._.name"
        );
        r = `${_} - ${_}`;
      } else {
        const _ = this.hass.localize(`component.${u}.entity_component._.name`) || a[1], f = this.hass.localize(
          `ui.dialogs.entity_registry.editor.device_classes.${u}.${p}`
        ) || a[2];
        r = `${_} - ${f}`;
      }
    } else
      r = this.hass.localize(`component.${n}.entity_component._.name`) || n;
    return g`
      <div class="header">
        <div class="back-title">
          <ha-icon-button
            slot="trigger"
            .label=${this.hass.localize("ui.common.back")}
            .path=${ri}
            @click=${t}
          ></ha-icon-button>
          <span slot="title">${r}</span>
        </div>
      </div>
      <status-item-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .config=${((m = (d = this._config) == null ? void 0 : d.customization) == null ? void 0 : m[(s == null ? void 0 : s.index) ?? 0]) ?? {}}
        .getSchema=${e}
        .index=${(s == null ? void 0 : s.index) ?? 0}
        @config-changed=${i}
      >
      </status-item-editor>
    `;
  }
  _customizationChanged(e, t) {
    e.stopPropagation(), !(!this._config || !this.hass) && T(this, "config-changed", {
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
        (o) => o !== "group_id" && o !== "group_icon" && o !== "group_status" && e[o] !== void 0
      ).map((o) => ({
        key: o,
        value: e[o] ?? ""
      }));
      return (t.length === 0 || ((i = t[t.length - 1]) == null ? void 0 : i.key) !== "") && t.push({ key: "", value: "" }), {
        group_id: e.group_id ?? "",
        group_icon: e.group_icon ?? "",
        group_status: e.group_status ?? "",
        rules: t
      };
    });
  }
  _saveRulesetsToConfig() {
    const e = this.rulesets.map((t) => {
      const i = t.rules.reduce((o, s) => (s.key && s.key !== "" && (o[s.key] = s.value ?? ""), o), {});
      return {
        group_id: t.group_id ?? "",
        group_icon: t.group_icon ?? "",
        group_status: t.group_status ?? "",
        ...i
      };
    });
    this._config = {
      ...this._config,
      rulesets: e
    }, T(this, "config-changed", { config: this._config });
  }
  _updateConfigFromRulesets() {
    this._saveRulesetsToConfig();
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
    return e.rules.forEach((i, o) => {
      t[`key_${o}`] = i.key, t[`value_${o}`] = i.value;
    }), t;
  }
  _groupValueChanged(e, t) {
    var s;
    const { value: i } = e.detail, o = Object.keys(i).filter((n) => n.startsWith("key_")).map((n) => {
      const a = n.split("_")[1];
      return {
        key: i[`key_${a}`] ?? "",
        value: i[`value_${a}`] ?? ""
      };
    });
    (o.length === 0 || ((s = o[o.length - 1]) == null ? void 0 : s.key) !== "") && o.push({ key: "", value: "" }), this.rulesets = this.rulesets.map(
      (n, a) => a === t ? {
        group_id: i.group_id ?? "",
        group_icon: i.group_icon ?? "",
        group_status: i.group_status ?? "",
        rules: o
      } : n
    ), this._updateConfigFromRulesets();
  }
  render() {
    if (!this.hass || !this._config)
      return g`<div>Loading...</div>`;
    const e = this._toggleschema(this.toggleSelectOptions), t = this._schema(
      this._config.filter ?? "",
      this._config.label_filter ?? !1,
      this._config.hide_filter ?? "",
      this._config.multiple_areas ?? !1,
      this._config.multiple_floors ?? !1
    ), o = {
      content: this._memoizedClassesForArea(
        this._config.area || [],
        this._config.floor || [],
        this._config.label || []
      ),
      ...this._config
    };
    return this._subElementEditorDomain ? this._renderSubElementEditorDomain() : this._subElementEditorEntity ? this._renderSubElementEditorEntity() : g`
      <ha-form
        .hass=${this.hass}
        .data=${o}
        .schema=${t}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon
            class="secondary"
            .path=${li}
          ></ha-svg-icon>
          Smart Groups
        </div>
        <div class="content">
          ${this.rulesets.map(
      (s, n) => g`
              <ha-expansion-panel class="group-panel main" outlined>
                <div slot="header" class="group-header">
                  ${s.group_id ? s.group_id : `${this.hass.localize(
        "component.group.entity_component._.name"
      )} ${n + 1}`}
                  <span class="group-actions">
                    <ha-icon-button
                      slot="trigger"
                      .label=${this.hass.localize("ui.common.remove")}
                      .path=${Gt}
                      @click=${() => this._removeRuleset(n)}
                    ></ha-icon-button>
                  </span>
                </div>
                <div class="content">
                  <ha-form
                    .hass=${this.hass}
                    .data=${this._groupFormData(s)}
                    .schema=${this.getGroupSchema(s)}
                    .computeLabel=${this.computeLabel}
                    @value-changed=${(a) => this._groupValueChanged(a, n)}
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
          <ha-svg-icon class="secondary" .path=${hi}></ha-svg-icon>
          ${this.computeLabel.bind(this)({ name: "edit_domains_dc" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${o}
            .schema=${e}
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
    return ct`
      .secondary {
        color: var(--secondary-text-color);
      }
      .main {
        margin: 5px 0;
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
    `;
  }
};
et([
  b({ attribute: !1 })
], W.prototype, "hass", 2);
et([
  b({ attribute: !1 })
], W.prototype, "lovelace", 2);
et([
  b({ type: Object })
], W.prototype, "_config", 2);
et([
  w()
], W.prototype, "_subElementEditorDomain", 2);
et([
  w()
], W.prototype, "_subElementEditorEntity", 2);
et([
  w()
], W.prototype, "rulesets", 2);
W = et([
  kt("status-card-editor")
], W);
console.info(
  `%c STATUS-CARD %c ${Te.version} `,
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
