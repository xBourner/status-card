const kt = "b2.13.0", Dt = {
  version: kt
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = globalThis, Ue = $e.ShadowRoot && ($e.ShadyCSS === void 0 || $e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Fe = Symbol(), st = /* @__PURE__ */ new WeakMap();
let bt = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== Fe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Ue && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = st.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && st.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Tt = (t) => new bt(typeof t == "string" ? t : t + "", void 0, Fe), ce = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce(((s, o, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[n + 1]), t[0]);
  return new bt(i, t, Fe);
}, Ot = (t, e) => {
  if (Ue) t.adoptedStyleSheets = e.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of e) {
    const s = document.createElement("style"), o = $e.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, t.appendChild(s);
  }
}, ot = Ue ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return Tt(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Pt, defineProperty: Lt, getOwnPropertyDescriptor: Ht, getOwnPropertyNames: It, getOwnPropertySymbols: Mt, getPrototypeOf: Bt } = Object, q = globalThis, nt = q.trustedTypes, Nt = nt ? nt.emptyScript : "", Pe = q.reactiveElementPolyfillSupport, pe = (t, e) => t, Ae = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Nt : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, Re = (t, e) => !Pt(t, e), at = { attribute: !0, type: String, converter: Ae, reflect: !1, hasChanged: Re };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), q.litPropertyMetadata ?? (q.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class ae extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = at) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, i);
      o !== void 0 && Lt(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: o, set: n } = Ht(this.prototype, e) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get() {
      return o == null ? void 0 : o.call(this);
    }, set(a) {
      const r = o == null ? void 0 : o.call(this);
      n.call(this, a), this.requestUpdate(e, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? at;
  }
  static _$Ei() {
    if (this.hasOwnProperty(pe("elementProperties"))) return;
    const e = Bt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(pe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(pe("properties"))) {
      const i = this.properties, s = [...It(i), ...Mt(i)];
      for (const o of s) this.createProperty(o, i[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [s, o] of i) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const o = this._$Eu(i, s);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const o of s) i.unshift(ot(o));
    } else e !== void 0 && i.push(ot(e));
    return i;
  }
  static _$Eu(e, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise(((i) => this.enableUpdating = i)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach(((i) => i(this)));
  }
  addController(e) {
    var i;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) == null || i.call(e));
  }
  removeController(e) {
    var i;
    (i = this._$EO) == null || i.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ot(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach(((i) => {
      var s;
      return (s = i.hostConnected) == null ? void 0 : s.call(i);
    }));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach(((i) => {
      var s;
      return (s = i.hostDisconnected) == null ? void 0 : s.call(i);
    }));
  }
  attributeChangedCallback(e, i, s) {
    this._$AK(e, s);
  }
  _$EC(e, i) {
    var n;
    const s = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, s);
    if (o !== void 0 && s.reflect === !0) {
      const a = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : Ae).toAttribute(i, s.type);
      this._$Em = e, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var n;
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = s.getPropertyOptions(o), r = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : Ae;
      this._$Em = o, this[o] = r.fromAttribute(i, a.type), this._$Em = null;
    }
  }
  requestUpdate(e, i, s) {
    if (e !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(e)), !(s.hasChanged ?? Re)(this[e], i)) return;
      this.P(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(e, i, s) {
    this._$AL.has(e) || this._$AL.set(e, i), s.reflect === !0 && this._$Em !== e && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(e);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
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
      if (o.size > 0) for (const [n, a] of o) a.wrapped !== !0 || this._$AL.has(n) || this[n] === void 0 || this.P(n, this[n], a);
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach(((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
      })), this.update(i)) : this._$EU();
    } catch (o) {
      throw e = !1, this._$EU(), o;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var i;
    (i = this._$EO) == null || i.forEach(((s) => {
      var o;
      return (o = s.hostUpdated) == null ? void 0 : o.call(s);
    })), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Ej && (this._$Ej = this._$Ej.forEach(((i) => this._$EC(i, this[i])))), this._$EU();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
ae.elementStyles = [], ae.shadowRootOptions = { mode: "open" }, ae[pe("elementProperties")] = /* @__PURE__ */ new Map(), ae[pe("finalized")] = /* @__PURE__ */ new Map(), Pe == null || Pe({ ReactiveElement: ae }), (q.reactiveElementVersions ?? (q.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe = globalThis, Ee = fe.trustedTypes, rt = Ee ? Ee.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, $t = "$lit$", V = `lit$${Math.random().toFixed(9).slice(2)}$`, wt = "?" + V, jt = `<${wt}>`, ee = document, _e = () => ee.createComment(""), ge = (t) => t === null || typeof t != "object" && typeof t != "function", Ve = Array.isArray, Ut = (t) => Ve(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Le = `[ 	
\f\r]`, he = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ct = /-->/g, lt = />/g, Z = RegExp(`>|${Le}(?:([^\\s"'>=/]+)(${Le}*=${Le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), dt = /'/g, ut = /"/g, At = /^(?:script|style|textarea|title)$/i, Ft = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), g = Ft(1), N = Symbol.for("lit-noChange"), C = Symbol.for("lit-nothing"), ht = /* @__PURE__ */ new WeakMap(), X = ee.createTreeWalker(ee, 129);
function Et(t, e) {
  if (!Ve(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return rt !== void 0 ? rt.createHTML(e) : e;
}
const Rt = (t, e) => {
  const i = t.length - 1, s = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = he;
  for (let r = 0; r < i; r++) {
    const c = t[r];
    let l, h, u = -1, m = 0;
    for (; m < c.length && (a.lastIndex = m, h = a.exec(c), h !== null); ) m = a.lastIndex, a === he ? h[1] === "!--" ? a = ct : h[1] !== void 0 ? a = lt : h[2] !== void 0 ? (At.test(h[2]) && (o = RegExp("</" + h[2], "g")), a = Z) : h[3] !== void 0 && (a = Z) : a === Z ? h[0] === ">" ? (a = o ?? he, u = -1) : h[1] === void 0 ? u = -2 : (u = a.lastIndex - h[2].length, l = h[1], a = h[3] === void 0 ? Z : h[3] === '"' ? ut : dt) : a === ut || a === dt ? a = Z : a === ct || a === lt ? a = he : (a = Z, o = void 0);
    const d = a === Z && t[r + 1].startsWith("/>") ? " " : "";
    n += a === he ? c + jt : u >= 0 ? (s.push(l), c.slice(0, u) + $t + c.slice(u) + V + d) : c + V + (u === -2 ? r : d);
  }
  return [Et(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class ye {
  constructor({ strings: e, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let n = 0, a = 0;
    const r = e.length - 1, c = this.parts, [l, h] = Rt(e, i);
    if (this.el = ye.createElement(l, s), X.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = X.nextNode()) !== null && c.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith($t)) {
          const m = h[a++], d = o.getAttribute(u).split(V), p = /([.?@])?(.*)/.exec(m);
          c.push({ type: 1, index: n, name: p[2], strings: d, ctor: p[1] === "." ? qt : p[1] === "?" ? Gt : p[1] === "@" ? Wt : xe }), o.removeAttribute(u);
        } else u.startsWith(V) && (c.push({ type: 6, index: n }), o.removeAttribute(u));
        if (At.test(o.tagName)) {
          const u = o.textContent.split(V), m = u.length - 1;
          if (m > 0) {
            o.textContent = Ee ? Ee.emptyScript : "";
            for (let d = 0; d < m; d++) o.append(u[d], _e()), X.nextNode(), c.push({ type: 2, index: ++n });
            o.append(u[m], _e());
          }
        }
      } else if (o.nodeType === 8) if (o.data === wt) c.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(V, u + 1)) !== -1; ) c.push({ type: 7, index: n }), u += V.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const s = ee.createElement("template");
    return s.innerHTML = e, s;
  }
}
function re(t, e, i = t, s) {
  var a, r;
  if (e === N) return e;
  let o = s !== void 0 ? (a = i._$Co) == null ? void 0 : a[s] : i._$Cl;
  const n = ge(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((r = o == null ? void 0 : o._$AO) == null || r.call(o, !1), n === void 0 ? o = void 0 : (o = new n(t), o._$AT(t, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = o : i._$Cl = o), o !== void 0 && (e = re(t, o._$AS(t, e.values), o, s)), e;
}
let Vt = class {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: s } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? ee).importNode(i, !0);
    X.currentNode = o;
    let n = X.nextNode(), a = 0, r = 0, c = s[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let l;
        c.type === 2 ? l = new le(n, n.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(n, c.name, c.strings, this, e) : c.type === 6 && (l = new Kt(n, this, e)), this._$AV.push(l), c = s[++r];
      }
      a !== (c == null ? void 0 : c.index) && (n = X.nextNode(), a++);
    }
    return X.currentNode = ee, o;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
};
class le {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, s, o) {
    this.type = 2, this._$AH = C, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = re(this, e, i), ge(e) ? e === C || e == null || e === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : e !== this._$AH && e !== N && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ut(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== C && ge(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ee.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: i, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = ye.createElement(Et(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(i);
    else {
      const a = new Vt(o, this), r = a.u(this.options);
      a.p(i), this.T(r), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = ht.get(e.strings);
    return i === void 0 && ht.set(e.strings, i = new ye(e)), i;
  }
  k(e) {
    Ve(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const n of e) o === i.length ? i.push(s = new le(this.O(_e()), this.O(_e()), this, this.options)) : s = i[o], s._$AI(n), o++;
    o < i.length && (this._$AR(s && s._$AB.nextSibling, o), i.length = o);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); e && e !== this._$AB; ) {
      const o = e.nextSibling;
      e.remove(), e = o;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}
class xe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, o, n) {
    this.type = 1, this._$AH = C, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = C;
  }
  _$AI(e, i = this, s, o) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = re(this, e, i, 0), a = !ge(e) || e !== this._$AH && e !== N, a && (this._$AH = e);
    else {
      const r = e;
      let c, l;
      for (e = n[0], c = 0; c < n.length - 1; c++) l = re(this, r[s + c], i, c), l === N && (l = this._$AH[c]), a || (a = !ge(l) || l !== this._$AH[c]), l === C ? e = C : e !== C && (e += (l ?? "") + n[c + 1]), this._$AH[c] = l;
    }
    a && !o && this.j(e);
  }
  j(e) {
    e === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
let qt = class extends xe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === C ? void 0 : e;
  }
};
class Gt extends xe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== C);
  }
}
class Wt extends xe {
  constructor(e, i, s, o, n) {
    super(e, i, s, o, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = re(this, e, i, 0) ?? C) === N) return;
    const s = this._$AH, o = e === C && s !== C || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== C && (s === C || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Kt {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    re(this, e);
  }
}
const Zt = { I: le }, He = fe.litHtmlPolyfillSupport;
He == null || He(ye, le), (fe.litHtmlVersions ?? (fe.litHtmlVersions = [])).push("3.2.1");
const Jt = (t, e, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = o = new le(e.insertBefore(_e(), n), n, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let B = class extends ae {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const e = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = e.firstChild), e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Jt(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return N;
  }
};
var vt;
B._$litElement$ = !0, B.finalized = !0, (vt = globalThis.litElementHydrateSupport) == null || vt.call(globalThis, { LitElement: B });
const Ie = globalThis.litElementPolyfillSupport;
Ie == null || Ie({ LitElement: B });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ze = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xt = { attribute: !0, type: String, converter: Ae, reflect: !1, hasChanged: Re }, Yt = (t = Xt, e, i) => {
  const { kind: s, metadata: o } = i;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), n.set(i.name, t), s === "accessor") {
    const { name: a } = i;
    return { set(r) {
      const c = e.get.call(this);
      e.set.call(this, r), this.requestUpdate(a, c, t);
    }, init(r) {
      return r !== void 0 && this.P(a, void 0, t), r;
    } };
  }
  if (s === "setter") {
    const { name: a } = i;
    return function(r) {
      const c = this[a];
      e.call(this, r), this.requestUpdate(a, c, t);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function v(t) {
  return (e, i) => typeof i == "object" ? Yt(t, e, i) : ((s, o, n) => {
    const a = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, a ? { ...s, wrapped: !0 } : s), a ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(t) {
  return v({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qe = { ATTRIBUTE: 1, CHILD: 2 }, ke = (t) => (...e) => ({ _$litDirective$: t, values: e });
let De = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, s) {
    this._$Ct = e, this._$AM = i, this._$Ci = s;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: Qt } = Zt, mt = () => document.createComment(""), me = (t, e, i) => {
  var n;
  const s = t._$AA.parentNode, o = e === void 0 ? t._$AB : e._$AA;
  if (i === void 0) {
    const a = s.insertBefore(mt(), o), r = s.insertBefore(mt(), o);
    i = new Qt(a, r, t, t.options);
  } else {
    const a = i._$AB.nextSibling, r = i._$AM, c = r !== t;
    if (c) {
      let l;
      (n = i._$AQ) == null || n.call(i, t), i._$AM = t, i._$AP !== void 0 && (l = t._$AU) !== r._$AU && i._$AP(l);
    }
    if (a !== o || c) {
      let l = i._$AA;
      for (; l !== a; ) {
        const h = l.nextSibling;
        s.insertBefore(l, o), l = h;
      }
    }
  }
  return i;
}, J = (t, e, i = t) => (t._$AI(e, i), t), ei = {}, ti = (t, e = ei) => t._$AH = e, ii = (t) => t._$AH, Me = (t) => {
  var s;
  (s = t._$AP) == null || s.call(t, !1, !0);
  let e = t._$AA;
  const i = t._$AB.nextSibling;
  for (; e !== i; ) {
    const o = e.nextSibling;
    e.remove(), e = o;
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = (t, e, i) => {
  const s = /* @__PURE__ */ new Map();
  for (let o = e; o <= i; o++) s.set(t[o], o);
  return s;
}, Ct = ke(class extends De {
  constructor(t) {
    if (super(t), t.type !== qe.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, i) {
    let s;
    i === void 0 ? i = e : e !== void 0 && (s = e);
    const o = [], n = [];
    let a = 0;
    for (const r of t) o[a] = s ? s(r, a) : a, n[a] = i(r, a), a++;
    return { values: n, keys: o };
  }
  render(t, e, i) {
    return this.dt(t, e, i).values;
  }
  update(t, [e, i, s]) {
    const o = ii(t), { values: n, keys: a } = this.dt(e, i, s);
    if (!Array.isArray(o)) return this.ut = a, n;
    const r = this.ut ?? (this.ut = []), c = [];
    let l, h, u = 0, m = o.length - 1, d = 0, p = n.length - 1;
    for (; u <= m && d <= p; ) if (o[u] === null) u++;
    else if (o[m] === null) m--;
    else if (r[u] === a[d]) c[d] = J(o[u], n[d]), u++, d++;
    else if (r[m] === a[p]) c[p] = J(o[m], n[p]), m--, p--;
    else if (r[u] === a[p]) c[p] = J(o[u], n[p]), me(t, c[p + 1], o[u]), u++, p--;
    else if (r[m] === a[d]) c[d] = J(o[m], n[d]), me(t, o[u], o[m]), m--, d++;
    else if (l === void 0 && (l = pt(a, d, p), h = pt(r, u, m)), l.has(r[u])) if (l.has(r[m])) {
      const _ = h.get(a[d]), f = _ !== void 0 ? o[_] : null;
      if (f === null) {
        const y = me(t, o[u]);
        J(y, n[d]), c[d] = y;
      } else c[d] = J(f, n[d]), me(t, o[u], f), o[_] = null;
      d++;
    } else Me(o[m]), m--;
    else Me(o[u]), u++;
    for (; d <= p; ) {
      const _ = me(t, c[p + 1]);
      J(_, n[d]), c[d++] = _;
    }
    for (; u <= m; ) {
      const _ = o[u++];
      _ !== null && Me(_);
    }
    return this.ut = a, ti(t, c), N;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const se = ke(class extends De {
  constructor(t) {
    var e;
    if (super(t), t.type !== qe.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter(((e) => t[e])).join(" ") + " ";
  }
  update(t, [e]) {
    var s, o;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter(((n) => n !== ""))));
      for (const n in e) e[n] && !((s = this.nt) != null && s.has(n)) && this.st.add(n);
      return this.render(e);
    }
    const i = t.element.classList;
    for (const n of this.st) n in e || (i.remove(n), this.st.delete(n));
    for (const n in e) {
      const a = !!e[n];
      a === this.st.has(n) || (o = this.nt) != null && o.has(n) || (a ? (i.add(n), this.st.add(n)) : (i.remove(n), this.st.delete(n)));
    }
    return N;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const St = "important", si = " !" + St, R = ke(class extends De {
  constructor(t) {
    var e;
    if (super(t), t.type !== qe.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce(((e, i) => {
      const s = t[i];
      return s == null ? e : e + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }), "");
  }
  update(t, [e]) {
    const { style: i } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const s of this.ft) e[s] == null && (this.ft.delete(s), s.includes("-") ? i.removeProperty(s) : i[s] = null);
    for (const s in e) {
      const o = e[s];
      if (o != null) {
        this.ft.add(s);
        const n = typeof o == "string" && o.endsWith(si);
        s.includes("-") || n ? i.setProperty(s, n ? o.slice(0, -11) : o, n ? St : "") : i[s] = o;
      }
    }
    return N;
  }
});
var ft = Number.isNaN || function(e) {
  return typeof e == "number" && e !== e;
};
function oi(t, e) {
  return !!(t === e || ft(t) && ft(e));
}
function ni(t, e) {
  if (t.length !== e.length)
    return !1;
  for (var i = 0; i < t.length; i++)
    if (!oi(t[i], e[i]))
      return !1;
  return !0;
}
function x(t, e) {
  e === void 0 && (e = ni);
  var i = null;
  function s() {
    for (var o = [], n = 0; n < arguments.length; n++)
      o[n] = arguments[n];
    if (i && i.lastThis === this && e(o, i.lastArgs))
      return i.lastResult;
    var a = t.apply(this, o);
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
var ai = "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z", Ge = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", ri = "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z", ci = "M17 14V17H14V19H17V22H19V19H22V17H19V14M20 11V12.3C19.4 12.1 18.7 12 18 12C16.8 12 15.6 12.4 14.7 13H7V11H20M12.1 17H7V15H12.8C12.5 15.6 12.2 16.3 12.1 17M7 7H20V9H7V7M5 19H7V21H3V3H7V5H5V19Z", li = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", di = "M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z", ui = "M10 19.11L12.11 17H7V15H14V15.12L16.12 13H7V11H17V12.12L18.24 10.89C18.72 10.41 19.35 10.14 20.04 10.14C20.37 10.14 20.7 10.21 21 10.33V5C21 3.89 20.1 3 19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.9 21 5 21H10V19.11M7 7H17V9H7V7M21.7 14.35L20.7 15.35L18.65 13.3L19.65 12.3C19.86 12.09 20.21 12.09 20.42 12.3L21.7 13.58C21.91 13.79 21.91 14.14 21.7 14.35M12 19.94L18.06 13.88L20.11 15.93L14.06 22H12V19.94Z", hi = "M17 6H7c-3.31 0-6 2.69-6 6s2.69 6 6 6h10c3.31 0 6-2.69 6-6s-2.69-6-6-6zm0 10H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h10c2.21 0 4 1.79 4 4s-1.79 4-4 4zM7 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z";
function mi(t, e, i) {
  switch (t) {
    case "alarm_control_panel":
      return e === "off" ? "mdi:alarm-light-off" : "mdi:alarm-light";
    case "siren":
      return e === "off" ? "mdi:bell-off" : "mdi:bell-ring";
    case "lock":
      return e === "off" ? "mdi:lock" : "mdi:lock-open";
    case "light":
      return e === "off" ? "mdi:lightbulb-off" : "mdi:lightbulb";
    case "media_player":
      return e === "off" ? "mdi:cast-off" : "mdi:cast";
    case "climate":
      return e === "off" ? "mdi:thermostat-cog" : "mdi:thermostat";
    case "vacuum":
      return e === "off" ? "mdi:robot-vacuum-off" : "mdi:robot-vacuum";
    case "fan":
      return e === "off" ? "mdi:fan-off" : "mdi:fan";
    case "switch":
      if (i)
        switch (i) {
          case "outlet":
            return e === "off" ? "mdi:power-plug-off" : "mdi:power-plug";
          case "switch":
            return e === "off" ? "mdi:toggle-switch-off" : "mdi:toggle-switch";
        }
    case "cover":
      if (i)
        switch (i) {
          case "door":
            return e === "off" ? "mdi:door-closed" : "mdi:door-open";
          case "garage":
            return e === "off" ? "mdi:garage" : "mdi:garage-open";
          case "gate":
            return e === "off" ? "mdi:gate" : "mdi:gate-open";
          case "blind":
            return e === "off" ? "mdi:blinds" : "mdi:blinds-open";
          case "curtain":
            return e === "off" ? "mdi:curtains-closed" : "mdi:curtains";
          case "damper":
            return e === "off" ? "mdi:valve-closed" : "mdi:valve";
          case "awning":
            return e === "off" ? "mdi:awning-outline" : "mdi:awning";
          case "shutter":
            return e === "off" ? "mdi:window-shutter" : "mdi:window-shutter-open";
          case "shade":
            return e === "off" ? "mdi:roller-shade-closed" : "mdi:roller-shade";
          case "window":
            return e === "off" ? "mdi:window-closed" : "mdi:window-open";
          default:
            return "mdi:help-circle";
        }
      return e === "off" ? "mdi:window-closed" : "mdi:window-open";
    case "binary_sensor":
      if (i)
        switch (i) {
          case "door":
            return e === "off" ? "mdi:door-closed" : "mdi:door-open";
          case "window":
            return e === "off" ? "mdi:window-closed" : "mdi:window-open";
          case "lock":
            return e === "off" ? "mdi:lock-open" : "mdi:lock";
          case "motion":
            return e === "off" ? "mdi:motion-sensor-off" : "mdi:motion-sensor";
          case "presence":
            return e === "off" ? "mdi:home-off" : "mdi:home";
          case "occupancy":
            return e === "off" ? "mdi:seat-outline" : "mdi:seat";
          case "vibration":
            return e === "off" ? "mdi:vibrate-off" : "mdi:vibrate";
          case "plug":
            return e === "off" ? "mdi:power-plug-off" : "mdi:power-plug";
          case "power":
            return e === "off" ? "mdi:power-off" : "mdi:power";
          case "battery":
            return e === "off" ? "mdi:battery-off" : "mdi:battery";
          case "battery_charging":
            return e === "off" ? "mdi:battery-alert" : "mdi:battery-charging";
          case "moving":
            return e === "off" ? "mdi:car-off" : "mdi:car";
          case "running":
            return e === "off" ? "mdi:play-pause" : "mdi:play";
          case "gas":
            return "mdi:gas-cylinder";
          case "carbon_monoxide":
            return "mdi:molecule-co";
          case "cold":
            return e === "off" ? "mdi:snowflake-off" : "mdi:snowflake";
          case "heat":
            return e === "off" ? "mdi:weather-sunny-off" : "mdi:weather-sunny";
          case "moisture":
            return e === "off" ? "mdi:water-off" : "mdi:water";
          case "connectivity":
            return "mdi:connection";
          case "opening":
            return e === "off" ? "mdi:shield-lock" : "mdi:shield-lock-open";
          case "garage_door":
            return e === "off" ? "mdi:garage" : "mdi:garage-open";
          case "light":
            return e === "off" ? "mdi:lightbulb-off" : "mdi:lightbulb-on";
          case "problem":
            return e === "off" ? "mdi:alert-circle-check" : "mdi:alert-circle";
          case "safety":
            return e === "off" ? "mdi:shield-alert-outline" : "mdi:shield-alert";
          case "smoke":
            return e === "off" ? "mdi:smoke-detector-off" : "mdi:smoke-detector";
          case "sound":
            return e === "off" ? "mdi:volume-off" : "mdi:volume-high";
          case "tamper":
            return e === "off" ? "mdi:shield-home-outline" : "mdi:shield-home";
          case "update":
            return e === "off" ? "mdi:autorenew-off" : "mdi:autorenew";
          default:
            return "mdi:help-circle";
        }
      return e === "off" ? "mdi:radiobox-blank" : "mdi:checkbox-marked-circle";
    case "humidifier":
      return e === "off" ? "mdi:water-off" : "mdi:air-humidifier";
    case "lawn_mower":
      return e === "off" ? "mdi:lawn-mower" : "mdi:robot-mower";
    case "valve":
      return "mdi:valve";
    case "water_heater":
      return e === "off" ? "mdi:water-pump-off" : "mdi:water-boiler";
    case "remote":
      return e === "off" ? "mdi:remote-off" : "mdi:remote";
    case "device_tracker":
      return e === "off" ? "mdi:account-off" : "mdi:cellphone";
    case "update":
      return e === "off" ? "mdi:autorenew-off" : "mdi:autorenew";
    case "input_boolean":
      return e === "off" ? "mdi:toggle-switch-off" : "mdi:toggle-switch";
    case "timer":
      return e === "off" ? "mdi:timer-off" : "mdi:timer-outline";
    case "counter":
      return e === "off" ? "mdi:numeric" : "mdi:counter";
    case "calendar":
      return e === "off" ? "mdi:calendar-off" : "mdi:calendar";
    case "person":
      return "mdi:account";
    default:
      return console.warn(`Unable to find icon for domain ${t} (${e})`), "mdi:help-circle";
  }
}
const oe = [
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
], We = [
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
], pi = {
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
}, Ze = class Ze {
  static setEntitiesByDomain(e) {
    this._entitiesByDomain = e;
  }
  static getEntitiesByDomain() {
    return this._entitiesByDomain;
  }
  static getAllEntities() {
    return Object.values(this._entitiesByDomain).flat();
  }
};
Ze._entitiesByDomain = {};
let Ce = Ze;
function P(t, e, i) {
  return t.localize(
    `component.${i}.entity_component._.state.${e}`
  ) || e;
}
function Te(t, e, i, s) {
  if (/^key_\d+$/.test(e.name))
    return t.localize("ui.components.related-filter-menu.filter") || "Filter";
  switch (e.name) {
    case "header":
      return i && s ? i === "switch" && s === "switch" ? `${t.localize(
        "ui.panel.lovelace.editor.card.entities.name"
      )} in ${t.localize("component.switch.entity_component._.name")}` : `${t.localize(
        "ui.panel.lovelace.editor.card.entities.name"
      )} in ${t.localize(
        `ui.dialogs.entity_registry.editor.device_classes.${i}.${s}`
      )}` : i ? `${t.localize(
        "ui.panel.lovelace.editor.card.entities.name"
      )} in ${t.localize(`component.${i}.entity_component._.name`)}` : t.localize("ui.panel.lovelace.editor.card.entities.name");
    case "square":
      return t.localize("ui.panel.lovelace.editor.card.grid.square");
    case "hide_person_name":
      return t.localize("ui.common.hide") + " " + t.localize("component.person.entity_component._.name") + " " + t.localize("ui.common.name");
    case "hide_content_name":
      return t.localize("ui.common.hide") + " " + t.localize("ui.panel.lovelace.editor.card.markdown.content") + " " + t.localize("ui.common.name");
    case "hide_person":
      return t.localize("ui.common.hide") + " " + t.localize("component.person.entity_component._.name");
    case "list_mode":
      return t.localize("ui.card.common.turn_on") + " " + t.localize("ui.components.media-browser.list") + " " + t.localize("ui.dialogs.helper_settings.input_text.mode");
    case "columns":
      return t.localize(
        "ui.panel.lovelace.editor.action-editor.actions.more-info"
      ) + " " + t.localize("ui.panel.lovelace.editor.card.grid.columns");
    case "edit_filters":
      return t.localize("ui.panel.lovelace.editor.common.edit") + " " + t.localize("ui.components.subpage-data-table.filters");
    case "area":
      return t.localize("ui.panel.lovelace.editor.card.area.name");
    case "floor":
      return t.localize("ui.components.selectors.selector.types.floor");
    case "label_filter":
      return t.localize("ui.components.label-picker.label") + " " + t.localize("ui.components.related-filter-menu.filter");
    case "label":
    case "hidden_labels":
      return t.localize("ui.components.label-picker.label");
    case "entities":
      return t.localize("ui.panel.lovelace.editor.card.entities.name");
    case "extra_entities":
      return "Extra " + t.localize("ui.panel.lovelace.editor.card.entities.name");
    case "entity":
      return t.localize("ui.components.selectors.selector.types.entity");
    case "hide_filter":
      return t.localize("ui.common.hide") + " " + t.localize("ui.panel.lovelace.editor.card.entities.name");
    case "edit_domains_dc":
      return t.localize("ui.panel.lovelace.editor.common.edit") + " " + t.localize("ui.panel.lovelace.editor.card.markdown.content");
    case "icon":
      return t.localize("ui.components.selectors.selector.types.icon");
    case "color":
      return t.localize("ui.panel.lovelace.editor.card.tile.color");
    case "background_color":
      return t.localize("ui.panel.lovelace.editor.card.generic.icon") + " " + t.localize("ui.panel.lovelace.editor.edit_view.tab_background") + " " + t.localize("ui.panel.lovelace.editor.card.tile.color");
    case "multiple_areas":
      return "Multi " + t.localize("ui.panel.lovelace.editor.card.area.name");
    case "multiple_floors":
      return "Multi " + t.localize("ui.components.selectors.selector.types.floor");
    case "show_total_number":
      return t.localize("ui.common.enable") + " " + t.localize(
        "component.sensor.entity_component._.state_attributes.state_class.state.total"
      ) + " " + t.localize("component.number.entity_component._.name");
    case "show_total_entities":
      return t.localize("ui.common.enable") + " " + t.localize(
        "component.sensor.entity_component._.state_attributes.state_class.state.total"
      ) + " " + t.localize("ui.panel.lovelace.editor.card.entities.name");
    case "appearance":
      return t.localize("ui.panel.lovelace.editor.card.tile.appearance") || "Appearance";
    case "tap_action":
    case "hold_action":
    case "double_tap_action":
      return t.localize(
        `ui.panel.lovelace.editor.card.generic.${e.name}`
      );
    case "popup_card":
      return "Change Popup Card Type";
    case "group_id":
      return t.localize("component.group.entity_component._.name") + " " + t.localize("ui.common.name");
    case "group_icon":
      return t.localize("component.group.entity_component._.name") + " " + t.localize("ui.panel.lovelace.editor.card.generic.icon");
    case "group_status":
      return t.localize("component.group.entity_component._.name") + " " + t.localize("ui.components.selectors.selector.types.state") + " (" + t.localize("ui.panel.lovelace.editor.card.config.optional") + ")";
    case "hide":
      return t.localize("ui.common.hide");
    case "state":
      return t.localize("ui.components.entity.entity-state-picker.state");
    case "invert":
    case "invert_state":
      return t.localize("ui.dialogs.entity_registry.editor.invert.label");
    case "show_entity_picture":
      return t.localize(
        "ui.panel.lovelace.editor.card.tile.show_entity_picture"
      );
    case "name":
      return t.localize("ui.common.name");
    case "no_scroll":
      return t.localize(
        "ui.panel.lovelace.editor.edit_view_header.settings.badges_wrap_options.wrap"
      ) + " " + t.localize("ui.panel.lovelace.editor.card.generic.content");
    case "popup":
      return "Popup";
    case "ungroup_areas":
      return t.localize("ui.common.disable") + " " + t.localize("ui.panel.lovelace.editor.card.area.name") + " " + t.localize("component.group.entity_component._.name");
    case "popup_sort":
      return "Popup Sort";
    default:
      if (We.includes(e.name))
        return t.localize(`component.${e.name}.entity_component._.name`) || e.name;
      for (const [o, n] of Object.entries(pi))
        if (n.includes(e.name))
          return t.localize(
            `ui.dialogs.entity_registry.editor.device_classes.${o}.${e.name}`
          ) || e.name;
      return t.localize(
        `ui.panel.lovelace.editor.card.area.${e.name}`
      );
  }
}
var Y, _t;
(function(t) {
  t.language = "language", t.system = "system", t.comma_decimal = "comma_decimal", t.decimal_comma = "decimal_comma", t.space_comma = "space_comma", t.none = "none";
})(Y || (Y = {})), (function(t) {
  t.language = "language", t.system = "system", t.am_pm = "12", t.twenty_four = "24";
})(_t || (_t = {}));
function xt() {
  return (xt = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];
      for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
    }
    return t;
  }).apply(this, arguments);
}
function M(t) {
  return t.substr(0, t.indexOf("."));
}
var fi = function(t) {
  switch (t.number_format) {
    case Y.comma_decimal:
      return ["en-US", "en"];
    case Y.decimal_comma:
      return ["de", "es", "it"];
    case Y.space_comma:
      return ["fr", "sv", "cs"];
    case Y.system:
      return;
    default:
      return t.language;
  }
}, _i = function(t, e) {
  return e === void 0 && (e = 2), Math.round(t * Math.pow(10, e)) / Math.pow(10, e);
}, gi = function(t, e, i) {
  var s = e ? fi(e) : void 0;
  if (Number.isNaN = Number.isNaN || function o(n) {
    return typeof n == "number" && o(n);
  }, (e == null ? void 0 : e.number_format) !== Y.none && !Number.isNaN(Number(t)) && Intl) try {
    return new Intl.NumberFormat(s, gt(t, i)).format(Number(t));
  } catch (o) {
    return console.error(o), new Intl.NumberFormat(void 0, gt(t, i)).format(Number(t));
  }
  return typeof t == "string" ? t : _i(t, void 0).toString() + "";
}, gt = function(t, e) {
  var i = xt({ maximumFractionDigits: 2 }, e);
  if (typeof t != "string") return i;
  {
    var s = t.indexOf(".") > -1 ? t.split(".")[1].length : 0;
    i.minimumFractionDigits = s, i.maximumFractionDigits = s;
  }
  return i;
}, yi = ["closed", "locked", "off"], Se = function(t, e, i, s) {
  s = s || {}, i = i ?? {};
  var o = new Event(e, { bubbles: s.bubbles === void 0 || s.bubbles, cancelable: !!s.cancelable, composed: s.composed === void 0 || s.composed });
  return o.detail = i, t.dispatchEvent(o), o;
}, ve = function(t) {
  Se(window, "haptic", t);
}, vi = function(t, e, i) {
  i === void 0 && (i = !1), i ? history.replaceState(null, "", e) : history.pushState(null, "", e), Se(window, "location-changed", { replace: i });
}, bi = function(t, e, i) {
  i === void 0 && (i = !0);
  var s, o = M(e), n = o === "group" ? "homeassistant" : o;
  switch (o) {
    case "lock":
      s = i ? "unlock" : "lock";
      break;
    case "cover":
      s = i ? "open_cover" : "close_cover";
      break;
    default:
      s = i ? "turn_on" : "turn_off";
  }
  return t.callService(n, s, { entity_id: e });
}, $i = function(t, e) {
  var i = yi.includes(t.states[e].state);
  return bi(t, e, i);
}, wi = function(t, e, i, s) {
  if (s || (s = { action: "more-info" }), !s.confirmation || s.confirmation.exemptions && s.confirmation.exemptions.some(function(n) {
    return n.user === e.user.id;
  }) || (ve("warning"), confirm(s.confirmation.text || "Are you sure you want to " + s.action + "?"))) switch (s.action) {
    case "more-info":
      (i.entity || i.camera_image) && Se(t, "hass-more-info", { entityId: i.entity ? i.entity : i.camera_image });
      break;
    case "navigate":
      s.navigation_path && vi(0, s.navigation_path);
      break;
    case "url":
      s.url_path && window.open(s.url_path);
      break;
    case "toggle":
      i.entity && ($i(e, i.entity), ve("success"));
      break;
    case "call-service":
      if (!s.service) return void ve("failure");
      var o = s.service.split(".", 2);
      e.callService(o[0], o[1], s.service_data, s.target), ve("success");
      break;
    case "fire-dom-event":
      Se(t, "ll-custom", s);
  }
}, Ai = function(t, e, i, s) {
  var o;
  s === "double_tap" && i.double_tap_action ? o = i.double_tap_action : s === "hold" && i.hold_action ? o = i.hold_action : s === "tap" && i.tap_action && (o = i.tap_action), wi(t, e, i, o);
};
function ne(t) {
  return t !== void 0 && t.action !== "none";
}
x(
  (t) => new Intl.Collator(t)
);
const Ei = x(
  (t) => new Intl.Collator(t, { sensitivity: "accent" })
), Ci = (t, e) => t < e ? -1 : t > e ? 1 : 0, Si = (t, e, i = void 0) => Intl != null && Intl.Collator ? Ei(i).compare(t, e) : Ci(t.toLowerCase(), e.toLowerCase());
function T(t, e, i) {
  const s = new CustomEvent(e, {
    bubbles: !1,
    composed: !1,
    detail: i
  });
  t.dispatchEvent(s);
}
class xi extends HTMLElement {
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
    ].forEach((e) => {
      document.addEventListener(
        e,
        () => {
          this.cancelled = !0, this.timer && (clearTimeout(this.timer), this.timer = void 0);
        },
        { passive: !0 }
      );
    });
  }
  bind(e, i = {}) {
    e.actionHandler && we(i, e.actionHandler.options) || (e.actionHandler && (e.removeEventListener("touchstart", e.actionHandler.start), e.removeEventListener("touchend", e.actionHandler.end), e.removeEventListener("touchcancel", e.actionHandler.end), e.removeEventListener("mousedown", e.actionHandler.start), e.removeEventListener("click", e.actionHandler.end), e.removeEventListener(
      "keydown",
      e.actionHandler.handleKeyDown
    )), e.actionHandler = { options: i }, !i.disabled && (e.actionHandler.start = (s) => {
      this.cancelled = !1, s.touches ? (s.touches[0].clientX, s.touches[0].clientY) : (s.clientX, s.clientY), i.hasHold && (this.held = !1, this.timer = window.setTimeout(() => {
        this.held = !0;
      }, this.holdTime));
    }, e.actionHandler.end = (s) => {
      if (s.currentTarget !== s.target || s.type === "touchcancel" || s.type === "touchend" && this.cancelled)
        return;
      const o = s.target;
      s.cancelable && s.preventDefault(), i.hasHold && (clearTimeout(this.timer), this.timer = void 0), i.hasHold && this.held ? T(o, "action", { action: "hold" }) : i.hasDoubleClick ? s.type === "click" && s.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, T(o, "action", { action: "tap" });
      }, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, T(o, "action", { action: "double_tap" })) : T(o, "action", { action: "tap" });
    }, e.actionHandler.handleKeyDown = (s) => {
      ["Enter", " "].includes(s.key) && s.currentTarget.actionHandler.end(s);
    }, e.addEventListener("touchstart", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("touchend", e.actionHandler.end), e.addEventListener("touchcancel", e.actionHandler.end), e.addEventListener("mousedown", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("click", e.actionHandler.end), e.addEventListener("keydown", e.actionHandler.handleKeyDown)));
  }
}
customElements.define("action-handler-status-card", xi);
const zi = () => {
  const t = document.body;
  if (t.querySelector("action-handler-status-card"))
    return t.querySelector("action-handler-status-card");
  const e = document.createElement("action-handler-status-card");
  return t.appendChild(e), e;
}, ki = (t, e) => {
  const i = zi();
  i && i.bind(t, e);
}, be = ke(
  class extends De {
    update(t, [e]) {
      return ki(t.element, e), N;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    render(t) {
    }
  }
), we = (t, e) => {
  if (t === e)
    return !0;
  if (t && e && typeof t == "object" && typeof e == "object") {
    if (t.constructor !== e.constructor)
      return !1;
    let i, s;
    if (Array.isArray(t)) {
      if (s = t.length, s !== e.length)
        return !1;
      for (i = s; i-- !== 0; )
        if (!we(t[i], e[i]))
          return !1;
      return !0;
    }
    if (t instanceof Map && e instanceof Map) {
      if (t.size !== e.size)
        return !1;
      for (i of t.entries())
        if (!e.has(i[0]))
          return !1;
      for (i of t.entries())
        if (!we(i[1], e.get(i[0])))
          return !1;
      return !0;
    }
    if (t instanceof Set && e instanceof Set) {
      if (t.size !== e.size)
        return !1;
      for (i of t.entries())
        if (!e.has(i[0]))
          return !1;
      return !0;
    }
    if (ArrayBuffer.isView(t) && ArrayBuffer.isView(e)) {
      if (s = t.length, s !== e.length)
        return !1;
      for (i = s; i-- !== 0; )
        if (t[i] !== e[i])
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === e.source && t.flags === e.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === e.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === e.toString();
    const o = Object.keys(t);
    if (s = o.length, s !== Object.keys(e).length)
      return !1;
    for (i = s; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(e, o[i]))
        return !1;
    for (i = s; i-- !== 0; ) {
      const n = o[i];
      if (!we(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
}, Di = (t, e, i) => {
  var n;
  const s = i || e.theme;
  if (t.__themes || (t.__themes = { cacheKey: null, keys: {} }), !s || s === "default") {
    t.removeAttribute("style"), t.__themes.cacheKey = "default";
    return;
  }
  const o = (n = e.themes) == null ? void 0 : n[s];
  if (!o) {
    console.warn(`Theme "${s}" not found.`), t.removeAttribute("style"), t.__themes.cacheKey = "default";
    return;
  }
  if (t.__themes.cacheKey !== s) {
    for (const [a, r] of Object.entries(o))
      t.style.setProperty(`--${a}`, String(r));
    t.__themes.cacheKey = s;
  }
};
function D(t) {
  return t.split("_").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
}
const yt = [
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
function Ne(t, e) {
  let i = [];
  return Array.isArray(e.filters) ? i = e.filters : [
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
  ].forEach((s) => {
    e[s] !== void 0 && i.push({ key: s, value: e[s] });
  }), Object.values(t.hass.states).filter((s) => t.hiddenEntities.includes(s.entity_id) ? !1 : i.length ? i.every(
    (o) => Ti(t, s, o, {
      areas: t.areas,
      devices: t.devices,
      entities: t.entities
    })
  ) : !0);
}
function Be(t, e) {
  if (!t) return !1;
  const i = e.match(/^([<>]=?)?\s*(\d+)$/);
  if (!i) return !1;
  const [, s, o] = i, n = parseInt(o, 10), a = /* @__PURE__ */ new Date(), r = new Date(t), c = (a.getTime() - r.getTime()) / 6e4;
  switch (s) {
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
function A(t, e) {
  if (Array.isArray(e))
    return e.some((i) => A(t, i));
  if (typeof e == "string" && e.startsWith("!"))
    return !A(t, e.slice(1));
  if (typeof e == "string" && /^([<>]=?)\s*(-?\d+(\.\d+)?)([mhd])$/.test(e)) {
    const [, i, s, , o] = e.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)([mhd])$/) || [], n = parseFloat(s), a = Date.now(), r = new Date(t).getTime();
    if (isNaN(r)) return !1;
    let c = (a - r) / 6e4;
    switch (o === "h" && (c /= 60), o === "d" && (c /= 1440), i) {
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
  if (typeof e == "string" && /^([<>]=?)\s*(-?\d+(\.\d+)?)$/.test(e)) {
    const [, i, s] = e.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)$/) || [], o = parseFloat(s), n = parseFloat(t);
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
  if (typeof e == "string" && e.includes("*")) {
    const i = "^" + e.split("*").map((o) => o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*") + "$";
    return new RegExp(i, "i").test(String(t));
  }
  if (typeof e == "string" && e.length > 2 && e.startsWith("/") && e.endsWith("/"))
    try {
      return new RegExp(e.slice(1, -1), "i").test(String(t));
    } catch {
      return !1;
    }
  return t === e;
}
function Ti(t, e, i, s) {
  var n, a, r, c, l, h, u, m;
  const o = (n = s.entities) == null ? void 0 : n.find((d) => d.entity_id === e.entity_id);
  switch (i.key) {
    case "area": {
      let d = o == null ? void 0 : o.area_id;
      if (!d && (o != null && o.device_id)) {
        const p = (a = s.devices) == null ? void 0 : a.find((_) => _.id === o.device_id);
        d = p == null ? void 0 : p.area_id;
      }
      return A(d, i.value);
    }
    case "domain":
      return A(M(e.entity_id), i.value);
    case "entity_id":
      return A(e.entity_id, i.value);
    case "state":
      return A(e.state, i.value);
    case "name": {
      const d = e.attributes.friendly_name ?? "";
      return A(d, i.value);
    }
    case "attributes":
      return !i.value || typeof i.value != "object" ? !1 : Object.entries(i.value).every(([d, p]) => {
        const _ = d.split(":");
        let f = e.attributes;
        for (const y of _)
          if (f = f == null ? void 0 : f[y], f === void 0) break;
        return f === void 0 ? !1 : A(f, p);
      });
    case "device":
      return A(o == null ? void 0 : o.device_id, i.value);
    case "integration":
      return o ? A(o.platform, i.value) || A(o.config_entry_id, i.value) : !1;
    case "entity_category":
      return A(o == null ? void 0 : o.entity_category, i.value);
    case "label": {
      const d = s.labels, p = (_) => {
        if (A(_, i.value)) return !0;
        if (d) {
          const f = d.find((y) => y.label_id === _);
          if (f && A(f.name, i.value)) return !0;
        }
        return !1;
      };
      if (o != null && o.labels && o.labels.some(p)) return !0;
      if (o != null && o.device_id) {
        const _ = (r = s.devices) == null ? void 0 : r.find((f) => f.id === o.device_id);
        if (_ != null && _.labels && _.labels.some(p)) return !0;
      }
      return !1;
    }
    case "floor": {
      let d = o == null ? void 0 : o.area_id;
      if (!d && (o != null && o.device_id)) {
        const _ = (c = s.devices) == null ? void 0 : c.find((f) => f.id === o.device_id);
        d = _ == null ? void 0 : _.area_id;
      }
      if (!d) return !1;
      const p = (l = s.areas) == null ? void 0 : l.find((_) => _.area_id === d);
      return A(p == null ? void 0 : p.floor_id, i.value);
    }
    case "hidden_by":
      return A(o == null ? void 0 : o.hidden_by, i.value);
    case "device_manufacturer": {
      if (o != null && o.device_id) {
        const d = (h = s.devices) == null ? void 0 : h.find((p) => p.id === o.device_id);
        return A(d == null ? void 0 : d.manufacturer, i.value);
      }
      return !1;
    }
    case "device_model": {
      if (o != null && o.device_id) {
        const d = (u = s.devices) == null ? void 0 : u.find((p) => p.id === o.device_id);
        return A(d == null ? void 0 : d.model, i.value);
      }
      return !1;
    }
    case "last_changed":
      return typeof i.value == "string" && /^[<>]=?\s*\d+$/.test(i.value) ? Be(e.last_changed, i.value) : A(e.last_changed, i.value);
    case "last_updated":
      return typeof i.value == "string" && /^[<>]=?\s*\d+$/.test(i.value) ? Be(e.last_updated, i.value) : A(e.last_updated, i.value);
    case "last_triggered":
      return typeof i.value == "string" && /^[<>]=?\s*\d+$/.test(i.value) ? Be(e.attributes.last_triggered, i.value) : A(e.attributes.last_triggered, i.value);
    case "group": {
      const d = t.hass.states[i.value];
      return !d || !Array.isArray((m = d.attributes) == null ? void 0 : m.entity_id) ? !1 : d.attributes.entity_id.includes(e.entity_id);
    }
    default:
      return !0;
  }
}
var Oi = Object.defineProperty, z = (t, e, i, s) => {
  for (var o = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = a(e, i, o) || o);
  return o && Oi(e, i, o), o;
}, Q;
const L = (Q = class extends B {
  constructor() {
    super(...arguments), this.open = !1, this.title = "", this.content = "", this.entities = [], this._confirmParams = {
      domain: "",
      deviceClass: void 0
    }, this._showAll = !1, this._confirmOpen = !1, this._onClosed = (e) => {
      this.open = !1, this.dispatchEvent(
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
      (e, i, s) => Te(this.hass, e, i, s)
    ), this.groupAndSortEntities = x(
      (e, i, s, o) => {
        const n = /* @__PURE__ */ new Map();
        for (const r of e) {
          const c = this.getAreaForEntity(r);
          n.has(c) || n.set(c, []), n.get(c).push(r);
        }
        return Array.from(n.entries()).sort(
          ([r], [c]) => {
            const l = i == null ? void 0 : i.find((d) => d.area_id === r), h = i == null ? void 0 : i.find((d) => d.area_id === c), u = l ? l.name.toLowerCase() : r === "unassigned" ? "unassigned" : r, m = h ? h.name.toLowerCase() : c === "unassigned" ? "unassigned" : c;
            return u.localeCompare(m);
          }
        ).map(([r, c]) => [r, o(c)]);
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
      }
    };
  }
  // HA Dialog API: wird von show-dialog aufgerufen
  showDialog(e) {
    this.title = e.title ?? this.title, this.hass = e.hass, this.entities = e.entities ?? [], e.content !== void 0 && (this.content = e.content), this.selectedDomain = e.selectedDomain, this.selectedDeviceClass = e.selectedDeviceClass, this.selectedGroup = e.selectedGroup, this.card = e.card, this.open = !0, this.requestUpdate();
  }
  createCard(e, i) {
    var a;
    const s = i.type || "tile", o = s.startsWith("custom:") ? s.slice(7) : `hui-${s}-card`, n = document.createElement(o);
    return n ? (n.hass = e, n.setConfig(i), (a = n.setAttribute) == null || a.call(n, "data-hui-card", ""), n) : g`<p>Invalid Configuration for card type: ${i.type}</p>`;
  }
  // Build the popup card config for an entity, allowing per-domain/device class overrides
  _getPopupCardConfig(e) {
    var d, p, _, f;
    const i = this.card, s = e.entity_id.split(".")[0], o = this.selectedDomain || s, n = this.selectedDomain ? this.selectedDeviceClass : (f = (_ = (p = (d = this.hass) == null ? void 0 : d.states) == null ? void 0 : p[e.entity_id]) == null ? void 0 : _.attributes) == null ? void 0 : f.device_class, a = n ? `${D(o)} - ${n}` : o, r = typeof (i == null ? void 0 : i.getCustomizationForType) == "function" ? i.getCustomizationForType(a) : void 0, c = r == null ? void 0 : r.popup_card, l = c && typeof c.type == "string" && c.type || (r == null ? void 0 : r.popup_card_type) || "tile", h = l === "tile" ? this.DOMAIN_FEATURES[s] ?? {} : {};
    let u = {};
    if (c && typeof c == "object") {
      const { type: y, entity: U, ...O } = c;
      u = O;
    } else
      u = (r == null ? void 0 : r.popup_card_options) ?? {};
    return {
      type: l,
      entity: e.entity_id,
      ...h,
      ...u
    };
  }
  updated(e) {
    super.updated(e), e.has("hass") && this.hass && this.renderRoot.querySelectorAll(
      "[data-hui-card]"
    ).forEach((s) => {
      try {
        s.hass = this.hass;
      } catch {
      }
    });
  }
  toggleAllOrOn() {
    this._showAll = !this._showAll;
  }
  handleAskToggleDomain(e) {
    e.stopPropagation();
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
  handleAskToggleAll(e) {
    e.stopPropagation(), this.toggleAllOrOn();
  }
  _stopPropagation(e) {
    e.stopPropagation();
  }
  getAreaForEntity(e) {
    var s, o;
    const i = (s = this.card.entities) == null ? void 0 : s.find(
      (n) => n.entity_id === e.entity_id
    );
    if (i) {
      if (i.area_id)
        return i.area_id;
      if (i.device_id) {
        const n = (o = this.card.devices) == null ? void 0 : o.find(
          (a) => a.id === i.device_id
        );
        if (n && n.area_id)
          return n.area_id;
      }
    }
    return "unassigned";
  }
  _getEntityName(e) {
    return (e.attributes && e.attributes.friendly_name || e.entity_id).toString();
  }
  _isActive(e) {
    return !(/* @__PURE__ */ new Set([
      "off",
      "idle",
      "not_home",
      "closed",
      "locked",
      "standby",
      "disarmed",
      "unknown",
      "unavailable"
    ])).has(e.state);
  }
  sortEntitiesForPopup(e) {
    var o, n;
    const i = ((n = (o = this.card) == null ? void 0 : o._config) == null ? void 0 : n.popup_sort) || "name", s = e.slice();
    return i === "state" ? s.sort((a, r) => {
      const c = this._isActive(a) ? 0 : 1, l = this._isActive(r) ? 0 : 1;
      if (c !== l) return c - l;
      const h = a.entity_id.split(".")[0], u = r.entity_id.split(".")[0], m = this.hass ? P(this.hass, a.state, h) : a.state, d = this.hass ? P(this.hass, r.state, u) : r.state, p = (m || "").localeCompare(d || "");
      return p !== 0 ? p : this._getEntityName(a).toLowerCase().localeCompare(this._getEntityName(r).toLowerCase());
    }) : s.sort(
      (a, r) => this._getEntityName(a).toLowerCase().localeCompare(this._getEntityName(r).toLowerCase())
    );
  }
  render() {
    var O, $, H, de, ue, k, Xe, Ye, Qe, et, tt, it;
    if (!this.open) return g``;
    const e = (O = this.card) != null && O.list_mode ? 1 : ((H = ($ = this.card) == null ? void 0 : $._config) == null ? void 0 : H.columns) || 4, i = this.selectedDomain, s = this.selectedDeviceClass, o = this.selectedGroup, n = this.card, r = (typeof (n == null ? void 0 : n._shouldShowTotalEntities) == "function" ? n._shouldShowTotalEntities(i, s) : !1) ? !0 : this._showAll, c = new Map(
      (de = n.areas) == null ? void 0 : de.map((w) => [w.area_id, w.name])
    );
    let l = [], h = !1;
    if (o !== void 0 && ((k = (ue = n._config) == null ? void 0 : ue.content) != null && k[o])) {
      const w = n._config.content[o], I = (Xe = n._config.rulesets) == null ? void 0 : Xe.find(
        (F) => F.group_id === w
      );
      l = I ? Ne(n, I) : [];
    } else
      i ? l = r ? n._totalEntities(i, s) : n._isOn(i, s) : l = Array.isArray(this.entities) ? this.entities : [], h = !0;
    const u = this.sortEntitiesForPopup(l), m = this.groupAndSortEntities(
      l,
      n.areas,
      c,
      this.sortEntitiesForPopup.bind(this)
    ), d = ((Ye = n == null ? void 0 : n._config) == null ? void 0 : Ye.ungroupAreas) === !0 || ((Qe = n == null ? void 0 : n._config) == null ? void 0 : Qe.ungroup_areas) === !0 || ((et = n == null ? void 0 : n._config) == null ? void 0 : et.area_grouping) !== void 0 && ((tt = n == null ? void 0 : n._config) == null ? void 0 : tt.area_grouping) === !1, p = m.length ? Math.max(...m.map(([, w]) => w.length)) : 0, _ = d ? Math.min(e, Math.max(1, l.length)) : Math.min(e, Math.max(1, p)), f = s ? `${D(i)} - ${s}` : i, y = typeof (n == null ? void 0 : n.getCustomizationForType) == "function" ? n.getCustomizationForType(f) : void 0, U = (y == null ? void 0 : y.invert) === !0;
    return g`
      <ha-dialog
        .open=${this.open}
        hideActions
        @closed=${this._onClosed}
        style="--columns: ${_};"
      >
        <style>
          ${Q.styles}
        </style>
        <div class="dialog-header">
          <ha-icon-button
            slot="trigger"
            .label=${this.hass.localize("ui.common.close")}
            .path=${Ge}
            @click=${this._onClosed}
          ></ha-icon-button>
          <h3>
            ${(() => {
      var F, ie;
      const w = this.selectedGroup, I = this.card;
      if (w !== void 0 && ((ie = (F = I == null ? void 0 : I._config) == null ? void 0 : F.content) != null && ie[w])) {
        const zt = I._config.content[w];
        return this.hass.localize(
          "ui.panel.lovelace.editor.card.entities.name"
        ) + " in " + zt;
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
                    .path=${ri}
                  ></ha-icon-button>

                  <ha-list-item
                    graphic="icon"
                    @click=${this.handleAskToggleDomain}
                    @closed=${this._stopPropagation}
                  >
                    ${U ? this.hass.localize("ui.card.common.turn_on") : this.hass.localize("ui.card.common.turn_off")}
                    <ha-svg-icon
                      slot="graphic"
                      .path=${hi}
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
                      .path=${di}
                    ></ha-svg-icon>
                  </ha-list-item>
                </ha-button-menu>
              ` : ""}
        </div>
        <div class="dialog-content">
          ${(it = this.card) != null && it.list_mode ? d ? g`
                  <ul class="entity-list">
                    ${u.map(
      (w) => g`<li class="entity-item">- ${w.entity_id}</li>`
    )}
                  </ul>
                ` : g`
                  <ul class="entity-list">
                    ${m.map(([w, I]) => {
      const F = c.get(w) ?? (w === "unassigned" ? "Unassigned" : w);
      return g`
                        <li class="entity-item">
                          <h4>${F}:</h4>
                          <ul>
                            ${I.map(
        (ie) => g`
                                <li class="entity-item">
                                  - ${ie.entity_id}
                                </li>
                              `
      )}
                          </ul>
                        </li>
                      `;
    })}
                  </ul>
                ` : d ? g`
                <div class="entity-cards">
                  ${u.map(
      (w) => g` <div class="entity-card">
                      ${this.createCard(
        this.hass,
        this._getPopupCardConfig(w)
      )}
                    </div>`
    )}
                </div>
              ` : g`${m.map(([w, I]) => {
      const F = c.get(w) ?? (w === "unassigned" ? "Unassigned" : w);
      return g`
                  <div class="cards-wrapper">
                    <h4>${F}</h4>
                    <div class="entity-cards">
                      ${I.map(
        (ie) => g`
                          <div class="entity-card">
                            ${this.createCard(
          this.hass,
          this._getPopupCardConfig(ie)
        )}
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
}, Q.styles = ce`
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none;
    }

    /* Desktop styles */
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

    /* Tablet */
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

    /* Mobile */
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
z([
  v({ type: Boolean })
], L.prototype, "open");
z([
  v({ type: String })
], L.prototype, "title");
z([
  v({ type: String })
], L.prototype, "selectedDomain");
z([
  v({ type: String })
], L.prototype, "selectedDeviceClass");
z([
  v({ type: String })
], L.prototype, "content");
z([
  v({ type: Array })
], L.prototype, "entities");
z([
  v({ attribute: !1 })
], L.prototype, "hass");
z([
  v({ attribute: !1 })
], L.prototype, "card");
z([
  b()
], L.prototype, "_confirmParams");
z([
  b()
], L.prototype, "_showAll");
z([
  b()
], L.prototype, "_confirmOpen");
z([
  b()
], L.prototype, "selectedGroup");
let Pi = L;
customElements.define("popup-dialog", Pi);
const Je = class Je extends B {
  constructor() {
    super(...arguments), this.open = !1, this._onClosed = () => {
      this.open = !1, this.dispatchEvent(
        new CustomEvent("dialog-closed", { bubbles: !0, composed: !0 })
      );
    }, this._confirm = () => {
      var e, i;
      try {
        (i = (e = this.card) == null ? void 0 : e.toggleDomain) == null || i.call(e, this.selectedDomain, this.selectedDeviceClass);
      } catch {
      }
      this._onClosed();
    };
  }
  showDialog(e) {
    this.hass = e.hass, this.card = e.card, this.selectedDomain = e.selectedDomain, this.selectedDeviceClass = e.selectedDeviceClass, this.open = !0, this.requestUpdate();
  }
  render() {
    var a, r;
    if (!this.open || !this.hass || !this.card) return g``;
    const e = this.selectedDomain || "", i = this.selectedDeviceClass, s = i ? `${D(e)} - ${i}` : e, o = (r = (a = this.card) == null ? void 0 : a.getCustomizationForType) == null ? void 0 : r.call(a, s), n = (o == null ? void 0 : o.invert) === !0;
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
Je.styles = ce``;
let G = Je;
z([
  v({ type: Boolean })
], G.prototype, "open");
z([
  v({ attribute: !1 })
], G.prototype, "hass");
z([
  v({ attribute: !1 })
], G.prototype, "card");
z([
  v({ type: String })
], G.prototype, "selectedDomain");
z([
  v({ type: String })
], G.prototype, "selectedDeviceClass");
customElements.define("popup-dialog-confirmation", G);
var Li = Object.defineProperty, Hi = Object.getOwnPropertyDescriptor, S = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Hi(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Li(e, i, o), o;
};
let E = class extends B {
  constructor() {
    super(...arguments), this.areas = [], this.devices = [], this.entities = [], this.entitiesByDomain = {}, this.selectedDomain = null, this.selectedDeviceClass = null, this.hiddenEntities = [], this.hiddenLabels = [], this.hiddenAreas = [], this.hide_person = !1, this.hide_content_name = !0, this.list_mode = !1, this._showAll = !1, this._confirmOpen = !1, this._confirmParams = {
      domain: "",
      deviceClass: void 0
    }, this.selectedGroup = null, this._entitiesByDomain = x(
      (t, e, i, s) => {
        const o = this._config.area || null, n = this._config.floor || null, a = this._config.label || null, r = new Map(
          e.map((u) => [u.id, u])
        ), c = i ?? [], l = t.filter((u) => {
          var H, de, ue;
          if (M(u.entity_id) === "update")
            return !u.hidden_by && !u.disabled_by;
          const d = u.device_id ? r.get(u.device_id) : null;
          if (!(u.area_id !== null || d && d.area_id !== null) || !(a ? ((H = u.labels) == null ? void 0 : H.some((k) => a.includes(k))) || (((de = d == null ? void 0 : d.labels) == null ? void 0 : de.some((k) => a.includes(k))) ?? !1) : !0))
            return !1;
          const f = o ? Array.isArray(o) ? o : [o] : null, y = n ? Array.isArray(n) ? n : [n] : null, U = f ? u.area_id !== void 0 && f.includes(u.area_id) || d && d.area_id !== void 0 && f.includes(d.area_id) : !0, O = y ? u.area_id !== void 0 && c.some(
            (k) => k.area_id === u.area_id && k.floor_id !== void 0 && y.includes(k.floor_id)
          ) || (d == null ? void 0 : d.area_id) && c.some(
            (k) => k.area_id === d.area_id && k.floor_id !== void 0 && y.includes(k.floor_id)
          ) : !0, $ = this.hiddenAreas && this.hiddenAreas.length > 0 ? !(u.area_id && this.hiddenAreas.includes(u.area_id) || d && d.area_id && this.hiddenAreas.includes(d.area_id)) : !0;
          return !u.hidden_by && !u.disabled_by && U && O && $ && !((ue = u.labels) != null && ue.some((k) => this.hiddenLabels.includes(k))) && !this.hiddenEntities.includes(u.entity_id);
        }).map((u) => u.entity_id), h = {};
        for (const u of l) {
          const m = M(u);
          if (!We.includes(m))
            continue;
          const d = s[u];
          d && (m in h || (h[m] = []), h[m].push(d));
        }
        return h;
      }
    ), this.computeLabel = x(
      (t, e, i) => Te(this.hass, t, e, i)
    ), this._computeExtraItems = x(
      (t, e) => {
        const i = t.content || [];
        return t.extra_entities ? t.extra_entities.reduce((s, o) => {
          var p;
          if (!i.includes(o)) return s;
          const n = e[o];
          if (!n) return s;
          const a = (p = t.customization) == null ? void 0 : p.find(
            (_) => _.type === o
          );
          if (a && a.state !== void 0 && a.invert_state !== void 0) {
            const _ = a.invert_state === "true", f = n.state === a.state;
            if (!_ && !f || _ && f) return s;
          }
          const r = i.indexOf(o), c = r >= 0 ? r : 0, l = this.getCustomIcon(o, void 0, n), h = this.getCustomName(o, void 0, n) ?? n.attributes.friendly_name ?? o, u = this.getCustomColor(o, void 0), m = this.getCustomCSS(
            o,
            void 0
          ), d = this.getBackgroundColor(
            o,
            void 0
          );
          return s.push({
            type: "extra",
            panel: o,
            entity: n,
            order: c,
            icon: l,
            name: h,
            color: u,
            icon_css: m,
            background_color: d
          }), s;
        }, []).sort((s, o) => s.order - o.order) : [];
      }
    ), this._computeGroupItems = x(
      (t, e) => t.map((i, s) => {
        const o = e.find((a) => a.group_id === i);
        if (!(!o || !Object.keys(o).some(
          (a) => a !== "group_id" && a !== "group_icon" && o[a] !== void 0 && o[a] !== ""
        )))
          return {
            type: "group",
            group_id: i,
            order: s,
            ruleset: o
          };
      }).filter(
        (i) => !!i
      )
    ), this._computeDomainItems = x(
      (t) => t.reduce((e, i) => (i.includes(" - ") || e.push({
        type: "domain",
        domain: i,
        order: t.indexOf(i)
      }), e), [])
    ), this._computeDeviceClassItems = x(
      (t) => t.reduce((e, i) => {
        if (i.includes(" - ")) {
          const [s, o] = i.split(" - ");
          e.push({
            type: "deviceClass",
            domain: s.trim().toLowerCase().replace(/\s+/g, "_"),
            deviceClass: o.trim().toLowerCase(),
            order: t.indexOf(i)
          });
        }
        return e;
      }, [])
    ), this._computeSortedEntities = x(
      (t, e, i, s) => [...t, ...e, ...i, ...s].sort(
        (o, n) => o.order - n.order
      )
    );
  }
  firstUpdated(t) {
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
    var t, e, i;
    try {
      const [s, o, n] = await Promise.all([
        ((t = this.hass) == null ? void 0 : t.callWS({
          type: "config/area_registry/list"
        })) ?? [],
        ((e = this.hass) == null ? void 0 : e.callWS({
          type: "config/device_registry/list"
        })) ?? [],
        ((i = this.hass) == null ? void 0 : i.callWS({
          type: "config/entity_registry/list"
        })) ?? []
      ]);
      this.areas = s, this.devices = o, this.entities = n, this._processEntities();
    } catch (s) {
      console.error("Error loading data:", s);
    }
  }
  _processEntities() {
    const t = this._entitiesByDomain(
      this.entities,
      this.devices,
      this.areas ?? [],
      this.hass.states
    );
    Ce.setEntitiesByDomain(
      Object.fromEntries(
        Object.entries(t).map(([e, i]) => [
          e,
          i.map((s) => s.entity_id)
        ])
      )
    ), this.entitiesByDomain = t;
  }
  _baseEntities(t, e) {
    return (this._entitiesByDomain(
      this.entities,
      this.devices,
      this.areas ?? [],
      this.hass.states
    )[t] || []).filter((s) => {
      const o = s.state;
      if (o === "unavailable" || o === "unknown")
        return !1;
      const n = s.attributes.device_class;
      return t === "switch" ? e === "outlet" ? n === "outlet" : e === "switch" ? n === "switch" || n === void 0 : !0 : !e || n === e;
    });
  }
  _totalEntities(t, e) {
    return this._baseEntities(t, e);
  }
  _shouldShowTotalEntities(t, e) {
    if (this._config.show_total_entities) return !0;
    const i = e ? `${D(t)} - ${e}` : t, s = this.getCustomizationForType(i);
    return (s == null ? void 0 : s.show_total_entities) === !0;
  }
  _shouldShowTotalNumbers(t, e) {
    if (this._config.show_total_number) return !0;
    const i = e ? `${D(t)} - ${e}` : t, s = this.getCustomizationForType(i);
    return (s == null ? void 0 : s.show_total_number) === !0;
  }
  _isOn(t, e) {
    var n;
    const i = this._baseEntities(t, e), s = e ? `${D(t)} - ${e}` : t, o = ((n = this.getCustomizationForType(s)) == null ? void 0 : n.invert) === !0;
    return i.filter((a) => {
      if (t === "climate") {
        const c = a.attributes.hvac_action;
        if (c !== void 0) {
          const l = !["idle", "off"].includes(c);
          return o ? !l : l;
        }
      }
      if (t === "humidifier") {
        const c = a.attributes.action;
        if (c !== void 0) {
          const l = !["idle", "off"].includes(c);
          return o ? !l : l;
        }
      }
      let r = !yt.includes(a.state);
      return o ? !r : r;
    });
  }
  setConfig(t) {
    if (!t)
      throw new Error("Invalid configuration.");
    this._config = t, this.hide_person = t.hide_person !== void 0 ? t.hide_person : !1, this.hide_content_name = t.hide_content_name !== void 0 ? t.hide_content_name : !1, this.list_mode = t.list_mode !== void 0 ? t.list_mode : !1, this.hiddenEntities = t.hidden_entities || [], this.hiddenLabels = t.hidden_labels || [], this.hiddenAreas = t.hidden_areas || [];
  }
  /*
    private _openDomainPopup(domain: string | number) {
      openDomainPopup(this, domain);
    }
  
    */
  // Helper zum Öffnen eines Dialogs über die HA-Dialog-API
  _showBrowserModPopup(t, e, i) {
    t.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag: e,
          dialogImport: () => customElements.whenDefined(e),
          dialogParams: i
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _openDomainPopup(t) {
    var o, n, a;
    let e = "Details";
    typeof t == "string" ? e = this.getCustomName(t) || this.computeLabel({ name: t }) : typeof t == "number" && ((o = this._config.content) != null && o[t]) && (e = this._config.content[t]);
    let i = [];
    if (typeof t == "number") {
      const r = (n = this._config.content) == null ? void 0 : n[t], c = (a = this._config.rulesets) == null ? void 0 : a.find(
        (l) => l.group_id === r
      );
      i = c ? Ne(this, c) : [];
    } else {
      const r = this.selectedDeviceClass || void 0;
      i = this._shouldShowTotalEntities(t, r) ? this._totalEntities(t, r) : this._isOn(t, r);
    }
    this._showBrowserModPopup(this, "popup-dialog", {
      title: e,
      hass: this.hass,
      entities: i,
      selectedDomain: typeof t == "string" ? t : void 0,
      selectedDeviceClass: this.selectedDeviceClass || void 0,
      selectedGroup: this.selectedGroup || void 0,
      card: this,
      content: i.length ? void 0 : "Keine Entitäten"
    });
  }
  updated(t) {
    if (super.updated(t), !this._config || !this.hass) return;
    const e = t.get("hass"), i = t.get("_config");
    if (t.has("hass") && e && e.states !== this.hass.states && this.dispatchEvent(
      new CustomEvent("entity-states-updated", {
        bubbles: !0,
        composed: !0
      })
    ), t.has("hass") && document.querySelectorAll(
      "popup-dialog"
    ).forEach((o) => {
      try {
        o.hass = this.hass;
      } catch {
      }
    }), t.has("selectedDomain") && this.selectedDomain) {
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
    if (t.has("selectedGroup") && this.selectedGroup !== null) {
      const s = this.selectedGroup;
      this._openDomainPopup(s), setTimeout(() => {
        this.selectedGroup = null;
      }, 0);
    }
    (t.has("hass") && (!e || e.themes !== this.hass.themes) || t.has("_config") && (!i || i.theme !== this._config.theme)) && Di(this, this.hass.themes, this._config.theme);
  }
  showMoreInfo(t) {
    const e = new CustomEvent("hass-more-info", {
      detail: { entityId: t.entity_id },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(e);
  }
  getStatusProperty(t, e, i) {
    if (this._shouldShowTotalEntities(t, e) && !this._shouldShowTotalNumbers(t, e))
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
    ];
    let o;
    e ? o = `${D(t)} - ${e}` : o = t;
    const n = this.getCustomizationForType(o), a = (n == null ? void 0 : n.invert) === !0;
    switch (t) {
      case "device_tracker": {
        const r = P(
          this.hass,
          "home",
          "device_tracker"
        ), c = P(
          this.hass,
          "not_home",
          "device_tracker"
        );
        return a ? c : r;
      }
      case "lock":
      case "cover": {
        const r = P(this.hass, "open", "cover"), c = P(
          this.hass,
          "closed",
          "cover"
        );
        return a ? c : r;
      }
      case "person":
        return i === "home" ? P(this.hass, "home", "person") : i === "not_home" ? P(this.hass, "not_home", "person") : i ?? "unknown";
      default: {
        if (e && s.includes(e)) {
          const l = P(this.hass, "open", "cover"), h = P(
            this.hass,
            "closed",
            "cover"
          );
          return a ? h : l;
        }
        const r = P(
          this.hass,
          i ?? "on",
          "light"
        ), c = P(
          this.hass,
          i ?? "off",
          "light"
        );
        return a ? c : r;
      }
    }
  }
  getCustomizationForType(t) {
    var e;
    if (t)
      return (e = this._config.customization) == null ? void 0 : e.find(
        (i) => {
          var s;
          return ((s = i.type) == null ? void 0 : s.toLowerCase()) === t.toLowerCase();
        }
      );
  }
  getCustomIcon(t, e, i) {
    let s;
    e ? s = `${D(t)} - ${e}` : s = t;
    const o = this.getCustomizationForType(s);
    if ((o == null ? void 0 : o.show_entity_picture) === !0 && i && i.attributes && i.attributes.entity_picture)
      return i.attributes.entity_picture;
    if (o && o.icon)
      return o.icon;
    if (i && i.attributes && i.attributes.icon)
      return i.attributes.icon;
    if (!i) {
      const a = (o == null ? void 0 : o.invert) === !0 ? "off" : "on";
      let r = t;
      return !e && t.includes(".") && (r = t.split(".")[0]), mi(r, a, e);
    }
    return "";
  }
  getBackgroundColor(t, e) {
    var o;
    const i = e ? `${D(t)} - ${e}` : t, s = this.getCustomizationForType(i);
    return s && Array.isArray(s.background_color) ? `rgb(${s.background_color.join(",")})` : Array.isArray((o = this._config) == null ? void 0 : o.background_color) ? `rgb(${this._config.background_color.join(",")})` : "rgba(var(--rgb-primary-text-color), 0.15)";
  }
  getCustomColor(t, e) {
    let i;
    e ? i = `${D(t)} - ${e}` : i = t;
    const s = this.getCustomizationForType(i);
    if (s && s.icon_color)
      return s.icon_color;
    if (this._config && this._config.color)
      return this._config.color;
  }
  getCustomName(t, e, i) {
    let s;
    e ? s = `${D(t)} - ${e}` : s = t;
    const o = this.getCustomizationForType(s);
    if (o && o.name)
      return o.name;
    if (i && i.attributes.friendly_name)
      return i.attributes.friendly_name;
  }
  getCustomCSS(t, e) {
    let i;
    e ? i = `${D(t)} - ${e}` : i = t;
    const s = this.getCustomizationForType(i);
    if (s && s.icon_css)
      return s.icon_css;
  }
  toggleDomain(t, e) {
    t = t ?? this.selectedDomain, e = e ?? this.selectedDeviceClass, e && `${D(t)}${e}`;
    const i = this._isOn(t, e);
    if (i.length === 0) {
      console.warn(`Keine aktiven Entitäten für ${t} gefunden.`);
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
    ].includes(t)) {
      this.hass.callService(t, "toggle", {
        entity_id: i.map((s) => s.entity_id)
      });
      return;
    }
    for (const s of i) {
      let o = !yt.includes(s.state);
      t === "media_player" ? this.hass.callService(t, o ? "media_pause" : "media_play", {
        entity_id: s.entity_id
      }) : t === "lock" ? this.hass.callService(t, o ? "lock" : "unlock", {
        entity_id: s.entity_id
      }) : t === "vacuum" ? this.hass.callService(t, o ? "stop" : "start", {
        entity_id: s.entity_id
      }) : t === "alarm_control_panel" ? this.hass.callService(
        t,
        o ? "alarm_arm_away" : "alarm_disarm",
        { entity_id: s.entity_id }
      ) : t === "lawn_mower" ? this.hass.callService(t, o ? "pause" : "start_mowing", {
        entity_id: s.entity_id
      }) : t === "water_heater" ? this.hass.callService(t, o ? "turn_off" : "turn_on", {
        entity_id: s.entity_id
      }) : t === "update" && this.hass.callService(t, o ? "skip" : "install", {
        entity_id: s.entity_id
      });
    }
  }
  _handleDomainAction(t, e) {
    return (i) => {
      var h, u, m;
      i.stopPropagation();
      let s = e ? `${D(t)} - ${e}` : t;
      const o = this.getCustomizationForType(s);
      let n, a;
      i.detail.action === "tap" ? (n = o == null ? void 0 : o.tap_action, a = (h = this._config) == null ? void 0 : h.tap_action) : i.detail.action === "hold" ? (n = o == null ? void 0 : o.hold_action, a = (u = this._config) == null ? void 0 : u.hold_action) : i.detail.action === "double_tap" && (n = o == null ? void 0 : o.double_tap_action, a = (m = this._config) == null ? void 0 : m.double_tap_action);
      const r = n !== void 0 ? n : a, c = typeof r == "string" && r === "more-info" || typeof r == "object" && (r == null ? void 0 : r.action) === "more-info", l = typeof r == "string" && r === "toggle" || typeof r == "object" && (r == null ? void 0 : r.action) === "toggle";
      if (t.includes(".")) {
        const d = t, p = this.hass.states[d], _ = M(d);
        if (l) {
          this.hass.callService(_, "toggle", { entity_id: d });
          return;
        }
        if (c) {
          this.showMoreInfo(p);
          return;
        }
      }
      if (c || r === void 0) {
        this.selectedDomain = t, this.selectedDeviceClass = e || null;
        return;
      }
      if (l) {
        this.toggleDomain(t, e);
        return;
      }
      Ai(
        this,
        this.hass,
        {
          tap_action: (o == null ? void 0 : o.tap_action) || this._config.tap_action,
          hold_action: (o == null ? void 0 : o.hold_action) || this._config.hold_action,
          double_tap_action: (o == null ? void 0 : o.double_tap_action) || this._config.double_tap_action
        },
        i.detail.action
      );
    };
  }
  getPersonItems() {
    return this.hide_person ? [] : this.entities.filter(
      (t) => {
        var e;
        return t.entity_id.startsWith("person.") && !this.hiddenEntities.includes(t.entity_id) && !((e = t.labels) != null && e.some((i) => this.hiddenLabels.includes(i))) && !t.hidden_by && !t.disabled_by;
      }
    ).reverse().map((t) => this.hass.states[t.entity_id]).filter((t) => !!t);
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
  _getIconStyles(t, e = {}) {
    const { color: i, background_color: s, square: o, isNotHome: n } = e, a = {
      "border-radius": o ? "20%" : "50%",
      "background-color": s,
      color: i ? `var(--${i}-color)` : void 0
    };
    return t === "person" && n && (a.filter = "grayscale(100%)"), a;
  }
  renderPersonEntities() {
    return this.getPersonItems().map((e) => {
      var a, r;
      const i = this.hass.states[e.entity_id], s = (i == null ? void 0 : i.state) !== "home", o = {
        horizontal: this._config.content_layout === "horizontal"
      }, n = {
        "border-radius": (a = this._config) != null && a.square ? "20%" : "50%",
        filter: s ? "grayscale(100%)" : "none"
      };
      return g`
        <sl-tab
          slot="nav"
          panel=${e.entity_id}
          @click="${() => this.showMoreInfo(e)}"
        >
          <div class="entity ${se(o)}">
            <div class="entity-icon" style=${R(n)}>
              ${e.attributes.entity_picture ? g`<img
                    src=${e.attributes.entity_picture}
                    alt=${e.attributes.friendly_name || e.entity_id}
                    style=${R(n)}
                  />` : g`<ha-icon
                    class="center"
                    icon=${e.attributes.icon || "mdi:account"}
                    style=${R(n)}
                  ></ha-icon>`}
            </div>
            <div class="entity-info">
              ${this.hide_content_name ? "" : g`<div class="entity-name">
                    ${((r = e.attributes.friendly_name) == null ? void 0 : r.split(" ")[0]) || ""}
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
  renderExtraTab(t) {
    const { panel: e, entity: i, icon: s, name: o, color: n, icon_css: a, background_color: r } = t, c = this.hass.states[e], l = i.state, h = Number(l), u = !Number.isNaN(h) && l !== "" ? gi(h, this.hass.locale) : P(this.hass, l, M(e)), m = i.attributes.unit_of_measurement, d = this.getCustomizationForType(e), p = this._handleDomainAction(e), _ = be({
      hasHold: ne(
        (d == null ? void 0 : d.hold_action) ?? this._config.hold_action
      ),
      hasDoubleClick: ne(
        (d == null ? void 0 : d.double_tap_action) ?? this._config.double_tap_action
      )
    }), f = {
      horizontal: this._config.content_layout === "horizontal"
    }, y = this._getIconStyles("extra", {
      color: n,
      background_color: r,
      square: this._config.square
    });
    return g`
      <sl-tab slot="nav" panel=${e} @action=${p} .actionHandler=${_}>
        <div class="extra-entity ${se(f)}">
          <div class="entity-icon" style=${R(y)}>
            ${s.startsWith("/") || s.startsWith("http") ? g`<img
                  src=${s}
                  alt=${o}
                  style="border-radius:${this._config.square ? "20%" : "50%"};object-fit:cover;"
                />` : g`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${c}
                  .icon=${s}
                  data-domain=${M(e)}
                  data-state=${c.state}
                  style="${a || ""}"
                ></ha-state-icon>`}
          </div>
          <div class="entity-info">
            ${this.hide_content_name ? "" : g`<div class="entity-name">${o}</div>`}
            <div class="entity-state">
              ${u}${m ? ` ${m}` : ""}
            </div>
          </div>
        </div>
      </sl-tab>
    `;
  }
  renderGroupTab(t, e) {
    const i = Ne(this, t);
    if (!i.length) return g``;
    const s = t.group_id || this.hass.localize(
      "component.group.entity_component._.name ${index + 1}"
    ), o = t.group_icon || "mdi:format-list-group", n = this.getCustomColor(s), a = this.getBackgroundColor(s), r = () => {
      this.selectedGroup = e;
    }, c = be({
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
        panel=${"group-" + e}
        @action=${r}
        .actionHandler=${c}
      >
        <div class="entity ${se(l)}">
          <div class="entity-icon" style=${R(h)}>
            <ha-icon icon=${o}></ha-icon>
          </div>
          <div class="entity-info">
            ${this.hide_content_name ? "" : g`<div class="entity-name">${s}</div>`}
            <div class="entity-state">
              ${i.length}
              ${t.group_status ? ` ${t.group_status}` : ""}
            </div>
          </div>
        </div>
      </sl-tab>
    `;
  }
  renderDomainTab(t) {
    const { domain: e } = t, i = this._isOn(e), s = this._totalEntities(e);
    if (!(this._shouldShowTotalEntities(e) ? s : i).length) return g``;
    const a = this.getCustomColor(e), r = this.getCustomizationForType(e), c = this._handleDomainAction(e), l = be({
      hasHold: ne(
        (r == null ? void 0 : r.hold_action) ?? this._config.hold_action
      ),
      hasDoubleClick: ne(
        (r == null ? void 0 : r.double_tap_action) ?? this._config.double_tap_action
      )
    }), h = {
      horizontal: this._config.content_layout === "horizontal"
    }, u = this._getIconStyles("domain", {
      color: a,
      background_color: this.getBackgroundColor(e),
      square: this._config.square
    });
    return g`
      <sl-tab
        slot="nav"
        panel=${e}
        @action=${c}
        .actionHandler=${l}
      >
        <div class="entity ${se(h)}">
          <div class="entity-icon" style=${R(u)}>
            <ha-icon
              icon=${this.getCustomIcon(e)}
              style=${R({})}
            ></ha-icon>
          </div>
          <div class="entity-info">
            ${this.hide_content_name ? "" : g`<div class="entity-name">
                  ${this.getCustomName(e) || this.computeLabel({ name: e })}
                </div>`}
            <div class="entity-state">
              ${this._shouldShowTotalNumbers(e) ? `${i.length}/${s.length} ${this.getStatusProperty(
      e
    )}` : this._shouldShowTotalEntities(e) ? `${s.length}` : `${i.length} ${this.getStatusProperty(e)}`}
            </div>
          </div>
        </div>
      </sl-tab>
    `;
  }
  renderDeviceClassTab(t) {
    const { domain: e, deviceClass: i } = t, s = this._isOn(e, i), o = this._totalEntities(e, i);
    if (!(this._shouldShowTotalEntities(e, i) ? o : s).length) return g``;
    const r = this.getCustomColor(e, i), c = `${D(e)} - ${i}`, l = this.getCustomizationForType(c), h = this._handleDomainAction(e, i), u = be({
      hasHold: ne(
        (l == null ? void 0 : l.hold_action) ?? this._config.hold_action
      ),
      hasDoubleClick: ne(
        (l == null ? void 0 : l.double_tap_action) ?? this._config.double_tap_action
      )
    }), m = {
      horizontal: this._config.content_layout === "horizontal"
    }, d = this._getIconStyles("deviceClass", {
      color: r,
      background_color: this.getBackgroundColor(e, i),
      square: this._config.square
    });
    return g`
      <sl-tab
        slot="nav"
        panel=${i}
        @action=${h}
        .actionHandler=${u}
      >
        <div class="entity ${se(m)}">
          <div class="entity-icon" style=${R(d)}>
            <ha-icon icon=${this.getCustomIcon(e, i)}></ha-icon>
          </div>
          <div class="entity-info">
            ${this.hide_content_name ? "" : g`<div class="entity-name">
                  ${this.getCustomName(e, i) || this.computeLabel({ name: i })}
                </div>`}
            <div class="entity-state">
              ${this._shouldShowTotalNumbers(e, i) ? `${s.length}/${o.length} ${this.getStatusProperty(
      e,
      i
    )}` : this._shouldShowTotalEntities(e, i) ? `${o.length}` : `${s.length} ${this.getStatusProperty(
      e,
      i
    )}`}
            </div>
          </div>
        </div>
      </sl-tab>
    `;
  }
  renderTab(t) {
    switch (t.type) {
      case "extra":
        return this.renderExtraTab(t);
      case "group":
        return this.renderGroupTab(t.ruleset, t.order);
      case "domain":
        return this.renderDomainTab(t);
      case "deviceClass":
        return this.renderDeviceClassTab(t);
    }
  }
  /*
  
    protected render() {
      const extra = this.getExtraItems();
      const group = this.getGroupItems();
      const domain = this.getDomainItems();
      const deviceClass = this.getDeviceClassItems();
      const sorted = this._computeSortedEntities(
        extra,
        group,
        domain,
        deviceClass
      );
      const noScroll = {
        "no-scroll": !!this._config.no_scroll, // true, wenn tabs_wrap aktiviert ist
      };
  
      return html`
        <ha-card>
          <sl-tab-group no-scroll-controls class=${classMap(noScroll)}>
            ${this.renderPersonEntities()}
            ${repeat(
              sorted,
              (i) =>
                i.type === "extra"
                  ? i.panel
                  : i.type === "domain"
                  ? i.domain
                  : i.type === "deviceClass"
                  ? `${i.domain}-${i.deviceClass}`
                  : i.type === "group"
                  ? `group-${i.group_id}`
                  : "",
              (i) => this.renderTab(i)
            )}
            ${this.selectedDomain !== null || this.selectedGroup !== null
              ? renderPopup(this)
              : ""}
          </sl-tab-group>
        </ha-card>
      `;
    }
  
    */
  render() {
    const t = this.getExtraItems(), e = this.getGroupItems(), i = this.getDomainItems(), s = this.getDeviceClassItems(), o = this._computeSortedEntities(
      t,
      e,
      i,
      s
    ), n = {
      "no-scroll": !!this._config.no_scroll
    };
    return g`
      <ha-card>
        <sl-tab-group no-scroll-controls class=${se(n)}>
          ${this.renderPersonEntities()}
          ${Ct(
      o,
      (a) => a.type === "extra" ? a.panel : a.type === "domain" ? a.domain : a.type === "deviceClass" ? `${a.domain}-${a.deviceClass}` : a.type === "group" ? `group-${a.group_id}` : "",
      (a) => this.renderTab(a)
    )}
        </sl-tab-group>
      </ha-card>
    `;
  }
  static get styles() {
    return ce`
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
  v({ attribute: !1 })
], E.prototype, "hass", 2);
S([
  v({ type: Object })
], E.prototype, "_config", 2);
S([
  b()
], E.prototype, "areas", 2);
S([
  b()
], E.prototype, "devices", 2);
S([
  b()
], E.prototype, "entities", 2);
S([
  b()
], E.prototype, "entitiesByDomain", 2);
S([
  b()
], E.prototype, "selectedDomain", 2);
S([
  b()
], E.prototype, "selectedDeviceClass", 2);
S([
  b()
], E.prototype, "hiddenEntities", 2);
S([
  b()
], E.prototype, "hiddenLabels", 2);
S([
  b()
], E.prototype, "hiddenAreas", 2);
S([
  b()
], E.prototype, "hide_person", 2);
S([
  b()
], E.prototype, "hide_content_name", 2);
S([
  b()
], E.prototype, "list_mode", 2);
S([
  b()
], E.prototype, "_showAll", 2);
S([
  b()
], E.prototype, "_confirmOpen", 2);
S([
  b()
], E.prototype, "_confirmParams", 2);
S([
  b()
], E.prototype, "selectedGroup", 2);
E = S([
  ze("status-card")
], E);
var Ii = Object.defineProperty, Mi = Object.getOwnPropertyDescriptor, Oe = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Mi(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Ii(e, i, o), o;
};
class Ke extends B {
  constructor() {
    super(...arguments), this.SelectOptions = [], this._entityKeys = /* @__PURE__ */ new WeakMap();
  }
  _getKey(e) {
    return this._entityKeys.has(e) || this._entityKeys.set(e, Math.random().toString()), this._entityKeys.get(e);
  }
  render() {
    return this.hass ? g`
      <div class="customization">
        ${this.customizationkey && Ct(
      this.customizationkey,
      (e) => this._getKey(e),
      (e, i) => g`
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
                .value=${e.type}
                @closed=${(s) => s.stopPropagation()}
                @value-changed=${this._valueChanged}
              >
                ${this.SelectOptions.map(
        (s) => g`<mwc-list-item .value=${s.value}
                      >${s.label}</mwc-list-item
                    >`
      )}
              </ha-select>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.remove")}
                .path=${Ge}
                class="remove-icon"
                .index=${i}
                @click=${this._removeRow}
              ></ha-icon-button>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.edit")}
                .path=${li}
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
            @closed=${(e) => e.stopPropagation()}
            @click=${this._addRow}
          >
            ${this.SelectOptions.map(
      (e) => g`<mwc-list-item .value=${e.value}
                  >${e.label}</mwc-list-item
                >`
    )}
          </ha-select>
        </div>
      </div>
    ` : C;
  }
  _valueChanged(e) {
    if (!this.customizationkey || !this.hass)
      return;
    const i = e.detail.value, s = e.target.index, o = this.customizationkey.concat();
    o[s] = { ...o[s], type: i || "" }, T(this, this.customizationChangedEvent, o);
  }
  _removeRow(e) {
    e.stopPropagation();
    const i = e.currentTarget.index;
    if (i != null) {
      const s = this.customizationkey.concat();
      s.splice(i, 1), T(
        this,
        this.customizationChangedEvent,
        s
      );
    }
  }
  _editRow(e) {
    e.stopPropagation();
    const i = e.target.index;
    i != null && T(this, "edit-item", i);
  }
  _addRow(e) {
    if (e.stopPropagation(), !this.customizationkey || !this.hass)
      return;
    const i = this.shadowRoot.querySelector(
      ".add-customization"
    );
    if (!i || !i.value)
      return;
    const o = { type: i.value };
    T(this, this.customizationChangedEvent, [
      ...this.customizationkey,
      o
    ]), i.value = "";
  }
  static get styles() {
    return ce`
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
Oe([
  v({ attribute: !1 })
], Ke.prototype, "hass", 2);
Oe([
  v({ type: Array })
], Ke.prototype, "SelectOptions", 2);
let je = class extends Ke {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customizationkey() {
    return this.customization;
  }
};
Oe([
  v({ attribute: !1 })
], je.prototype, "customization", 2);
je = Oe([
  ze("status-items-editor")
], je);
var Bi = Object.defineProperty, Ni = Object.getOwnPropertyDescriptor, K = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Ni(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Bi(e, i, o), o;
};
let j = class extends B {
  constructor() {
    super(...arguments), this.useSensorSchema = !1, this._schemadomain = x(() => {
      const t = [
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
        { name: "tap_action", selector: { ui_action: { actions: t } } },
        { name: "double_tap_action", selector: { ui_action: { actions: t } } },
        { name: "hold_action", selector: { ui_action: { actions: t } } },
        { name: "popup_card", selector: { object: {} } }
      ];
    }), this._schemaEntity = x(() => {
      var i;
      const t = ((i = this.config) == null ? void 0 : i.type) || "", e = [
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
              selector: { state: { entity_id: t } }
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
        { name: "tap_action", selector: { ui_action: { actions: e } } },
        { name: "double_tap_action", selector: { ui_action: { actions: e } } },
        { name: "hold_action", selector: { ui_action: { actions: e } } }
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
    let t;
    switch (this.getSchema) {
      case "domain":
        t = this._schemadomain();
        break;
      case "entity":
        t = this._schemaEntity();
        break;
    }
    const e = {
      ...this._config
    };
    return g`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${t}
        .computeLabel=${(s) => Te(this.hass, s)}
        @value-changed=${this._valueChangedSchema}
      ></ha-form>
    `;
  }
  _valueChangedSchema(t) {
    if (!this.config)
      return;
    t.stopPropagation();
    const e = {
      ...this.config,
      ...t.detail.value
    };
    this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: e
      })
    );
  }
  setConfig(t) {
    this._config = {
      ...t,
      customization: t.customization ?? []
    };
  }
  static get styles() {
    return ce`
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
  v({ attribute: !1 })
], j.prototype, "config", 2);
K([
  v({ attribute: !1 })
], j.prototype, "hass", 2);
K([
  v({ attribute: !1 })
], j.prototype, "lovelace", 2);
K([
  v({ type: Boolean })
], j.prototype, "useSensorSchema", 2);
K([
  v({ type: Number })
], j.prototype, "index", 2);
K([
  b()
], j.prototype, "getSchema", 2);
K([
  b()
], j.prototype, "_config", 2);
j = K([
  ze("status-item-editor")
], j);
var ji = Object.defineProperty, Ui = Object.getOwnPropertyDescriptor, te = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Ui(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && ji(e, i, o), o;
};
let W = class extends B {
  constructor() {
    super(...arguments), this._subElementEditorDomain = void 0, this._subElementEditorEntity = void 0, this.rulesets = [
      {
        group_id: "",
        group_icon: "",
        group_status: "",
        rules: [{ key: "", value: "" }]
      }
    ], this.computeLabel = x(
      (t, e, i) => Te(this.hass, t, e, i)
    ), this._filterInitialized = !1, this._lastFilter = {
      area: [],
      floor: [],
      label: []
    }, this._schema = x(
      (t, e, i, s, o) => {
        const n = this.computeLabel({ name: "area" }), a = this.computeLabel({ name: "floor" }), r = this.computeLabel({ name: "label" }), c = this.computeLabel({ name: "entity" }), l = this.computeLabel({ name: "name" }), h = this.computeLabel({ name: "state" }), u = this.getAllEntities(), m = [
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
                    options: ["vertical", "horizontal"].map((d) => ({
                      label: this.hass.localize(
                        `ui.panel.lovelace.editor.card.tile.content_layout_options.${d}`
                      ),
                      value: d,
                      image: {
                        src: `/static/images/form/tile_content_layout_${d}.svg`,
                        src_dark: `/static/images/form/tile_content_layout_${d}_dark.svg`,
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
              ...e ? [
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
                    entity: { multiple: !0, include_entities: u }
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
    ), this._toggleschema = x((t) => [
      {
        name: "content",
        selector: {
          select: {
            reorder: !0,
            multiple: !0,
            custom_value: !0,
            options: t
          }
        }
      }
    ]), this._buildToggleOptions = x(
      (t, e) => this._buildOptions("toggle", t, e)
    ), this._memoizedClassesForArea = x(
      (t, e, i) => this._classesForArea(t, e, i)
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
    }, this._removeRuleset = (t) => {
      this.rulesets = this.rulesets.filter((e, i) => i !== t), this._updateConfigFromRulesets();
    };
  }
  getAllEntities() {
    return Ce.getAllEntities();
  }
  setConfig(t) {
    this._config = {
      ...t,
      columns: t.columns ?? 4,
      hide_person: t.hide_person ?? !1,
      list_mode: t.list_mode ?? !1,
      hide_content_name: t.hide_content_name ?? !1,
      customization: t.customization ?? []
    }, this._loadRulesetsFromConfig();
  }
  _updateAreaFloorInConfig() {
    if (!this._config || !this._config.filter) return;
    this._config.filter === "area" && this._config.floor !== void 0 ? (delete this._config.floor, T(this, "config-changed", { config: { ...this._config } })) : this._config.filter === "floor" && this._config.area !== void 0 && (delete this._config.area, T(this, "config-changed", { config: { ...this._config } }));
  }
  async updated(t) {
    super.updated(t);
    let e = !1;
    if (!(!this.hass || !this._config) && t.has("_config")) {
      this._updateAreaFloorInConfig(), (this._config.label_filter === !1 && this._config.label !== void 0 || Array.isArray(this._config.label) && this._config.label.length === 0) && (delete this._config.label, e = !0);
      const i = t.get("_config"), s = (i == null ? void 0 : i.extra_entities) ?? [], o = this._config.extra_entities ?? [], n = (i == null ? void 0 : i.content) ?? [], a = this._config.content ?? [], r = Array.isArray(this._config.area) ? [...this._config.area] : this._config.area ? [this._config.area] : [], c = Array.isArray(this._config.floor) ? [...this._config.floor] : this._config.floor ? [this._config.floor] : [], l = Array.isArray(this._config.label) ? [...this._config.label] : [];
      this._filterInitialized || (this._lastFilter = {
        area: r,
        floor: c,
        label: l
      }, this._filterInitialized = !0);
      const h = this._lastFilter.area, u = this._lastFilter.floor, m = this._lastFilter.label, d = !this.arraysEqual(m, l), p = !this.arraysEqual(u, c);
      if (!this.arraysEqual(h, r) || p || d) {
        const y = this._memoizedClassesForArea(
          r,
          c,
          l
        ).sort(
          (U, O) => oe.indexOf(U) - oe.indexOf(O)
        );
        this._config = {
          ...this._config,
          content: [...y]
        }, this._lastFilter = {
          area: [...r],
          floor: [...c],
          label: [...l]
        }, e = !0;
      }
      if (this._config.rulesets && Array.isArray(this._config.rulesets)) {
        const f = this._config.rulesets.filter(
          ($) => Object.keys($).some(
            (H) => H !== "group_id" && H !== "group_icon" && H !== "group_status" && $[H] !== void 0 && $[H] !== ""
          )
        ).map(($) => $.group_id).filter(($) => $ && $.length > 1);
        let y = Array.isArray(this._config.content) ? [...this._config.content] : [];
        y = y.filter(($) => !f.includes($));
        const U = this._config.extra_entities ?? [];
        let O = 0;
        for (let $ = 0; $ < y.length; $++) {
          if (!U.includes(y[$])) {
            O = $;
            break;
          }
          O = $ + 1;
        }
        y = [
          ...y.slice(0, O),
          ...f.filter(($) => !y.includes($)),
          ...y.slice(O)
        ], this.arraysEqual(y, this._config.content ?? []) || (this._config = {
          ...this._config,
          content: y
        }, e = !0);
      }
      if (!this.arraysEqual(s, o)) {
        let f = [...a];
        o.forEach((y) => {
          f.includes(y) || f.unshift(y);
        }), f = f.filter(
          (y) => !y.includes(".") || o.includes(y)
        ), this.arraysEqual(f, a) || (this._config = {
          ...this._config,
          content: f
        }, e = !0);
      }
      if (!this.arraysEqual(n, a)) {
        let f = [...o];
        f = f.filter((y) => a.includes(y)), this.arraysEqual(f, o) || (this._config = {
          ...this._config,
          extra_entities: f
        }, e = !0);
      }
      e && (T(this, "config-changed", { config: { ...this._config } }), this.requestUpdate());
    }
  }
  getGroupSchema(t) {
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
      ...t.rules.map((e, i) => {
        const s = t.rules.map((n, a) => a !== i ? n.key : null).filter((n) => n), o = this.ruleKeySelector.options.filter(
          ([n]) => !s.includes(n) || n === e.key
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
              selector: this.filterValueSelector[e.key] ?? { text: {} }
            }
          ]
        };
      })
    ];
  }
  _valueChanged(t) {
    this._config = t.detail.value, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config }
      })
    );
  }
  get toggleSelectOptions() {
    var t;
    return this._buildToggleOptions(
      this._memoizedClassesForArea(
        this._config.area || [],
        this._config.floor || [],
        this._config.label || []
      ),
      ((t = this._config) == null ? void 0 : t.content) || []
    );
  }
  get contentSelectOptions() {
    const t = this._config.content ?? [];
    return this._buildOptions("toggle", t, t);
  }
  arraysEqual(t, e) {
    return t.length === e.length && new Set(t).size === new Set(e).size;
  }
  _classesForArea(t, e, i) {
    var c;
    const s = ((c = this._config) == null ? void 0 : c.extra_entities) || [];
    let o = Object.values(this.hass.entities).filter(
      (l) => !l.hidden && We.includes(M(l.entity_id))
    );
    if (t && t.length > 0)
      o = o.filter(
        (l) => {
          var h;
          return t.includes(l.area_id) || l.device_id && t.includes((h = this.hass.devices[l.device_id]) == null ? void 0 : h.area_id);
        }
      );
    else if (e && e.length > 0) {
      const l = Object.values(this.hass.areas).filter(
        (h) => h.floor_id !== void 0 && e.includes(h.floor_id)
      ).map((h) => h.area_id);
      o = o.filter(
        (h) => {
          var u;
          return h.area_id !== void 0 && l.includes(h.area_id) || h.device_id && ((u = this.hass.devices[h.device_id]) == null ? void 0 : u.area_id) !== void 0 && l.includes(
            this.hass.devices[h.device_id].area_id
          );
        }
      );
    }
    i && i.length > 0 && (o = o.filter(
      (l) => {
        var h, u;
        return ((h = l.labels) == null ? void 0 : h.some((m) => i.includes(m))) || l.device_id && Array.isArray((u = this.hass.devices[l.device_id]) == null ? void 0 : u.labels) && this.hass.devices[l.device_id].labels.some(
          (m) => i.includes(m)
        );
      }
    ));
    const n = new Set(
      o.map((l) => M(l.entity_id)).filter((l) => l !== "binary_sensor" && l !== "cover" && l !== "switch")
    ), a = /* @__PURE__ */ new Set();
    o.filter(
      (l) => ["binary_sensor", "cover", "switch"].includes(
        M(l.entity_id)
      )
    ).forEach((l) => {
      var m;
      const h = M(l.entity_id), u = ((m = this.hass.states[l.entity_id]) == null ? void 0 : m.attributes.device_class) || "";
      u && a.add(`${D(h)} - ${u}`);
    });
    const r = [...a];
    return [...n, ...r, ...s].sort(
      (l, h) => {
        const u = oe.findIndex((d) => l.startsWith(d)), m = oe.findIndex((d) => h.startsWith(d));
        return (u === -1 ? oe.length : u) - (m === -1 ? oe.length : m);
      }
    );
  }
  _buildOptions(t, e, i) {
    const o = [.../* @__PURE__ */ new Set([...e, ...i])].map((n) => {
      const a = n.match(/^(.+?)\s*-\s*(.+)$/);
      if (a) {
        const r = a[1].toLowerCase().replace(" ", "_"), c = a[2].toLowerCase();
        if (r === "switch" && c === "switch") {
          const u = this.hass.localize(
            "component.switch.entity_component._.name"
          );
          return {
            value: n,
            label: `${u} - ${u}`
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
        label: n === "scene" ? "Scene" : t === "toggle" ? this.hass.localize(
          `component.${n}.entity_component._.name`
        ) || n : this.hass.localize(
          `component.${t}.entity_component.${n}.name`
        ) || n
      };
    });
    return o.sort((n, a) => {
      const r = n.value.includes("."), c = a.value.includes(".");
      return r && !c ? -1 : !r && c ? 1 : Si(
        n.label,
        a.label,
        this.hass.locale.language
      );
    }), o;
  }
  _itemChanged(t, e, i) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const s = e == null ? void 0 : e.index;
    if (s != null) {
      const o = [...this._config.customization ?? []];
      o[s] = t.detail, T(this, "config-changed", {
        config: { ...this._config, customization: o }
      });
    }
  }
  _editItem(t, e) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const i = t.detail;
    this[`_subElementEditor${e}`] = { index: i };
  }
  _edit_itemDomain(t) {
    const e = t.detail, s = (this._config.customization ?? [])[e];
    let o;
    s && s.type && s.type.includes(".") ? o = "Entity" : o = "Domain", this._editItem(t, o);
  }
  _itemChangedDomain(t) {
    this._itemChanged(t, this._subElementEditorDomain, "customization");
  }
  _itemChangedEntity(t) {
    this._itemChanged(t, this._subElementEditorEntity, "customization");
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
  _renderSubElementEditor(t, e, i) {
    var c, l, h, u, m;
    const s = `_subElementEditor${t.charAt(0).toUpperCase() + t.slice(1)}`, o = this[s], n = ((h = (l = (c = this._config) == null ? void 0 : c.customization) == null ? void 0 : l[(o == null ? void 0 : o.index) ?? 0]) == null ? void 0 : h.type) ?? "unknown", a = n.match(/^(.+?)\s*-\s*(.+)$/);
    let r = n;
    if (a) {
      const d = a[1].toLowerCase().replace(" ", "_"), p = a[2].toLowerCase();
      if (d === "switch" && p === "switch") {
        const _ = this.hass.localize(
          "component.switch.entity_component._.name"
        );
        r = `${_} - ${_}`;
      } else {
        const _ = this.hass.localize(`component.${d}.entity_component._.name`) || a[1], f = this.hass.localize(
          `ui.dialogs.entity_registry.editor.device_classes.${d}.${p}`
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
            .path=${ai}
            @click=${e}
          ></ha-icon-button>
          <span slot="title">${r}</span>
        </div>
      </div>
      <status-item-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .config=${((m = (u = this._config) == null ? void 0 : u.customization) == null ? void 0 : m[(o == null ? void 0 : o.index) ?? 0]) ?? {}}
        .getSchema=${t}
        .index=${(o == null ? void 0 : o.index) ?? 0}
        @config-changed=${i}
      >
      </status-item-editor>
    `;
  }
  _customizationChanged(t, e) {
    t.stopPropagation(), !(!this._config || !this.hass) && T(this, "config-changed", {
      config: {
        ...this._config,
        customization: t.detail
      }
    });
  }
  _customizationChangedDomain(t) {
    this._customizationChanged(t, "domain");
  }
  _loadRulesetsFromConfig() {
    this.rulesets = (this._config.rulesets ?? []).map((t) => {
      var i;
      const e = Object.keys(t).filter(
        (s) => s !== "group_id" && s !== "group_icon" && s !== "group_status" && t[s] !== void 0
      ).map((s) => ({
        key: s,
        value: t[s] ?? ""
      }));
      return (e.length === 0 || ((i = e[e.length - 1]) == null ? void 0 : i.key) !== "") && e.push({ key: "", value: "" }), {
        group_id: t.group_id ?? "",
        group_icon: t.group_icon ?? "",
        group_status: t.group_status ?? "",
        rules: e
      };
    });
  }
  _saveRulesetsToConfig() {
    const t = this.rulesets.map((e) => {
      const i = e.rules.reduce((s, o) => (o.key && o.key !== "" && (s[o.key] = o.value ?? ""), s), {});
      return {
        group_id: e.group_id ?? "",
        group_icon: e.group_icon ?? "",
        group_status: e.group_status ?? "",
        ...i
      };
    });
    this._config = {
      ...this._config,
      rulesets: t
    }, T(this, "config-changed", { config: this._config });
  }
  _updateConfigFromRulesets() {
    this._saveRulesetsToConfig();
  }
  get ruleKeySelector() {
    const t = [
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
    return t.sort((e, i) => e[1].localeCompare(i[1], this.hass.locale.language)), {
      type: "select",
      options: t
    };
  }
  _groupFormData(t) {
    const e = {
      group_id: t.group_id,
      group_icon: t.group_icon,
      group_status: t.group_status ?? ""
    };
    return t.rules.forEach((i, s) => {
      e[`key_${s}`] = i.key, e[`value_${s}`] = i.value;
    }), e;
  }
  _groupValueChanged(t, e) {
    var o;
    const { value: i } = t.detail, s = Object.keys(i).filter((n) => n.startsWith("key_")).map((n) => {
      const a = n.split("_")[1];
      return {
        key: i[`key_${a}`] ?? "",
        value: i[`value_${a}`] ?? ""
      };
    });
    (s.length === 0 || ((o = s[s.length - 1]) == null ? void 0 : o.key) !== "") && s.push({ key: "", value: "" }), this.rulesets = this.rulesets.map(
      (n, a) => a === e ? {
        group_id: i.group_id ?? "",
        group_icon: i.group_icon ?? "",
        group_status: i.group_status ?? "",
        rules: s
      } : n
    ), this._updateConfigFromRulesets();
  }
  render() {
    if (!this.hass || !this._config)
      return g`<div>Loading...</div>`;
    const t = this._toggleschema(this.toggleSelectOptions), e = this._schema(
      this._config.filter ?? "",
      this._config.label_filter ?? !1,
      this._config.hide_filter ?? "",
      this._config.multiple_areas ?? !1,
      this._config.multiple_floors ?? !1
    ), s = {
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
        .data=${s}
        .schema=${e}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon
            class="secondary"
            .path=${ci}
          ></ha-svg-icon>
          Smart Groups
        </div>
        <div class="content">
          ${this.rulesets.map(
      (o, n) => g`
              <ha-expansion-panel class="group-panel main" outlined>
                <div slot="header" class="group-header">
                  ${o.group_id ? o.group_id : `${this.hass.localize(
        "component.group.entity_component._.name"
      )} ${n + 1}`}
                  <span class="group-actions">
                    <ha-icon-button
                      slot="trigger"
                      .label=${this.hass.localize("ui.common.remove")}
                      .path=${Ge}
                      @click=${() => this._removeRuleset(n)}
                    ></ha-icon-button>
                  </span>
                </div>
                <div class="content">
                  <ha-form
                    .hass=${this.hass}
                    .data=${this._groupFormData(o)}
                    .schema=${this.getGroupSchema(o)}
                    .computeLabel=${this.computeLabel}
                    @value-changed=${(a) => this._groupValueChanged(a, n)}
                  ></ha-form>
                </div>
              </ha-expansion-panel>
            `
    )}
          <div class="add-group-row">
            <ha-button
              slot="trigger"
              .label=${this.hass.localize("ui.common.add")}
              raised
              @click=${this._addRuleset}
            ></ha-button>
          </div>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon class="secondary" .path=${ui}></ha-svg-icon>
          ${this.computeLabel.bind(this)({ name: "edit_domains_dc" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${s}
            .schema=${t}
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
    return ce`
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
te([
  v({ attribute: !1 })
], W.prototype, "hass", 2);
te([
  v({ attribute: !1 })
], W.prototype, "lovelace", 2);
te([
  v({ type: Object })
], W.prototype, "_config", 2);
te([
  b()
], W.prototype, "_subElementEditorDomain", 2);
te([
  b()
], W.prototype, "_subElementEditorEntity", 2);
te([
  b()
], W.prototype, "rulesets", 2);
W = te([
  ze("status-card-editor")
], W);
console.info(
  `%c STATUS-CARD %c ${Dt.version} `,
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
