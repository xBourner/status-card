const It = "b2.13.2", Bt = {
  version: It
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Se = globalThis, We = Se.ShadowRoot && (Se.ShadyCSS === void 0 || Se.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ke = Symbol(), ot = /* @__PURE__ */ new WeakMap();
let Ct = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== Ke) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (We && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = ot.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && ot.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Nt = (t) => new Ct(typeof t == "string" ? t : t + "", void 0, Ke), fe = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce(((s, o, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[n + 1]), t[0]);
  return new Ct(i, t, Ke);
}, jt = (t, e) => {
  if (We) t.adoptedStyleSheets = e.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of e) {
    const s = document.createElement("style"), o = Se.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, t.appendChild(s);
  }
}, nt = We ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return Nt(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ft, defineProperty: Ut, getOwnPropertyDescriptor: Rt, getOwnPropertyNames: Vt, getOwnPropertySymbols: qt, getPrototypeOf: Gt } = Object, J = globalThis, at = J.trustedTypes, Wt = at ? at.emptyScript : "", je = J.reactiveElementPolyfillSupport, ve = (t, e) => t, ze = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Wt : null;
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
} }, Ze = (t, e) => !Ft(t, e), rt = { attribute: !0, type: String, converter: ze, reflect: !1, hasChanged: Ze };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), J.litPropertyMetadata ?? (J.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class ue extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = rt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, i);
      o !== void 0 && Ut(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: o, set: n } = Rt(this.prototype, e) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get() {
      return o == null ? void 0 : o.call(this);
    }, set(a) {
      const c = o == null ? void 0 : o.call(this);
      n.call(this, a), this.requestUpdate(e, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? rt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ve("elementProperties"))) return;
    const e = Gt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ve("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ve("properties"))) {
      const i = this.properties, s = [...Vt(i), ...qt(i)];
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
      for (const o of s) i.unshift(nt(o));
    } else e !== void 0 && i.push(nt(e));
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
    return jt(e, this.constructor.elementStyles), e;
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
      const a = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : ze).toAttribute(i, s.type);
      this._$Em = e, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var n;
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = s.getPropertyOptions(o), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : ze;
      this._$Em = o, this[o] = c.fromAttribute(i, a.type), this._$Em = null;
    }
  }
  requestUpdate(e, i, s) {
    if (e !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(e)), !(s.hasChanged ?? Ze)(this[e], i)) return;
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
ue.elementStyles = [], ue.shadowRootOptions = { mode: "open" }, ue[ve("elementProperties")] = /* @__PURE__ */ new Map(), ue[ve("finalized")] = /* @__PURE__ */ new Map(), je == null || je({ ReactiveElement: ue }), (J.reactiveElementVersions ?? (J.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const be = globalThis, ke = be.trustedTypes, ct = ke ? ke.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, St = "$lit$", Z = `lit$${Math.random().toFixed(9).slice(2)}$`, xt = "?" + Z, Kt = `<${xt}>`, ae = document, $e = () => ae.createComment(""), we = (t) => t === null || typeof t != "object" && typeof t != "function", Je = Array.isArray, Zt = (t) => Je(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Fe = `[ 	
\f\r]`, ge = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, lt = /-->/g, dt = />/g, te = RegExp(`>|${Fe}(?:([^\\s"'>=/]+)(${Fe}*=${Fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ht = /'/g, ut = /"/g, zt = /^(?:script|style|textarea|title)$/i, Jt = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), v = Jt(1), R = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), mt = /* @__PURE__ */ new WeakMap(), se = ae.createTreeWalker(ae, 129);
function kt(t, e) {
  if (!Je(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ct !== void 0 ? ct.createHTML(e) : e;
}
const Xt = (t, e) => {
  const i = t.length - 1, s = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = ge;
  for (let c = 0; c < i; c++) {
    const r = t[c];
    let l, d, h = -1, p = 0;
    for (; p < r.length && (a.lastIndex = p, d = a.exec(r), d !== null); ) p = a.lastIndex, a === ge ? d[1] === "!--" ? a = lt : d[1] !== void 0 ? a = dt : d[2] !== void 0 ? (zt.test(d[2]) && (o = RegExp("</" + d[2], "g")), a = te) : d[3] !== void 0 && (a = te) : a === te ? d[0] === ">" ? (a = o ?? ge, h = -1) : d[1] === void 0 ? h = -2 : (h = a.lastIndex - d[2].length, l = d[1], a = d[3] === void 0 ? te : d[3] === '"' ? ut : ht) : a === ut || a === ht ? a = te : a === lt || a === dt ? a = ge : (a = te, o = void 0);
    const f = a === te && t[c + 1].startsWith("/>") ? " " : "";
    n += a === ge ? r + Kt : h >= 0 ? (s.push(l), r.slice(0, h) + St + r.slice(h) + Z + f) : r + Z + (h === -2 ? c : f);
  }
  return [kt(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Ae {
  constructor({ strings: e, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let n = 0, a = 0;
    const c = e.length - 1, r = this.parts, [l, d] = Xt(e, i);
    if (this.el = Ae.createElement(l, s), se.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = se.nextNode()) !== null && r.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(St)) {
          const p = d[a++], f = o.getAttribute(h).split(Z), u = /([.?@])?(.*)/.exec(p);
          r.push({ type: 1, index: n, name: u[2], strings: f, ctor: u[1] === "." ? Qt : u[1] === "?" ? ei : u[1] === "@" ? ti : Le }), o.removeAttribute(h);
        } else h.startsWith(Z) && (r.push({ type: 6, index: n }), o.removeAttribute(h));
        if (zt.test(o.tagName)) {
          const h = o.textContent.split(Z), p = h.length - 1;
          if (p > 0) {
            o.textContent = ke ? ke.emptyScript : "";
            for (let f = 0; f < p; f++) o.append(h[f], $e()), se.nextNode(), r.push({ type: 2, index: ++n });
            o.append(h[p], $e());
          }
        }
      } else if (o.nodeType === 8) if (o.data === xt) r.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(Z, h + 1)) !== -1; ) r.push({ type: 7, index: n }), h += Z.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const s = ae.createElement("template");
    return s.innerHTML = e, s;
  }
}
function pe(t, e, i = t, s) {
  var a, c;
  if (e === R) return e;
  let o = s !== void 0 ? (a = i._$Co) == null ? void 0 : a[s] : i._$Cl;
  const n = we(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((c = o == null ? void 0 : o._$AO) == null || c.call(o, !1), n === void 0 ? o = void 0 : (o = new n(t), o._$AT(t, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = o : i._$Cl = o), o !== void 0 && (e = pe(t, o._$AS(t, e.values), o, s)), e;
}
let Yt = class {
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
    const { el: { content: i }, parts: s } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? ae).importNode(i, !0);
    se.currentNode = o;
    let n = se.nextNode(), a = 0, c = 0, r = s[0];
    for (; r !== void 0; ) {
      if (a === r.index) {
        let l;
        r.type === 2 ? l = new _e(n, n.nextSibling, this, e) : r.type === 1 ? l = new r.ctor(n, r.name, r.strings, this, e) : r.type === 6 && (l = new ii(n, this, e)), this._$AV.push(l), r = s[++c];
      }
      a !== (r == null ? void 0 : r.index) && (n = se.nextNode(), a++);
    }
    return se.currentNode = ae, o;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
};
class _e {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, s, o) {
    this.type = 2, this._$AH = k, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    e = pe(this, e, i), we(e) ? e === k || e == null || e === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : e !== this._$AH && e !== R && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Zt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== k && we(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ae.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: i, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Ae.createElement(kt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(i);
    else {
      const a = new Yt(o, this), c = a.u(this.options);
      a.p(i), this.T(c), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = mt.get(e.strings);
    return i === void 0 && mt.set(e.strings, i = new Ae(e)), i;
  }
  k(e) {
    Je(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const n of e) o === i.length ? i.push(s = new _e(this.O($e()), this.O($e()), this, this.options)) : s = i[o], s._$AI(n), o++;
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
class Le {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, o, n) {
    this.type = 1, this._$AH = k, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = k;
  }
  _$AI(e, i = this, s, o) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = pe(this, e, i, 0), a = !we(e) || e !== this._$AH && e !== R, a && (this._$AH = e);
    else {
      const c = e;
      let r, l;
      for (e = n[0], r = 0; r < n.length - 1; r++) l = pe(this, c[s + r], i, r), l === R && (l = this._$AH[r]), a || (a = !we(l) || l !== this._$AH[r]), l === k ? e = k : e !== k && (e += (l ?? "") + n[r + 1]), this._$AH[r] = l;
    }
    a && !o && this.j(e);
  }
  j(e) {
    e === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
let Qt = class extends Le {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === k ? void 0 : e;
  }
};
class ei extends Le {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== k);
  }
}
class ti extends Le {
  constructor(e, i, s, o, n) {
    super(e, i, s, o, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = pe(this, e, i, 0) ?? k) === R) return;
    const s = this._$AH, o = e === k && s !== k || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== k && (s === k || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ii {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    pe(this, e);
  }
}
const si = { I: _e }, Ue = be.litHtmlPolyfillSupport;
Ue == null || Ue(Ae, _e), (be.litHtmlVersions ?? (be.litHtmlVersions = [])).push("3.2.1");
const oi = (t, e, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = o = new _e(e.insertBefore($e(), n), n, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let U = class extends ue {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = oi(i, this.renderRoot, this.renderOptions);
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
    return R;
  }
};
var Et;
U._$litElement$ = !0, U.finalized = !0, (Et = globalThis.litElementHydrateSupport) == null || Et.call(globalThis, { LitElement: U });
const Re = globalThis.litElementPolyfillSupport;
Re == null || Re({ LitElement: U });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Me = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ni = { attribute: !0, type: String, converter: ze, reflect: !1, hasChanged: Ze }, ai = (t = ni, e, i) => {
  const { kind: s, metadata: o } = i;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), n.set(i.name, t), s === "accessor") {
    const { name: a } = i;
    return { set(c) {
      const r = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(a, r, t);
    }, init(c) {
      return c !== void 0 && this.P(a, void 0, t), c;
    } };
  }
  if (s === "setter") {
    const { name: a } = i;
    return function(c) {
      const r = this[a];
      e.call(this, c), this.requestUpdate(a, r, t);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function A(t) {
  return (e, i) => typeof i == "object" ? ai(t, e, i) : ((s, o, n) => {
    const a = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, a ? { ...s, wrapped: !0 } : s), a ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function S(t) {
  return A({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xe = { ATTRIBUTE: 1, CHILD: 2 }, He = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Pe = class {
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
const { I: ri } = si, pt = () => document.createComment(""), ye = (t, e, i) => {
  var n;
  const s = t._$AA.parentNode, o = e === void 0 ? t._$AB : e._$AA;
  if (i === void 0) {
    const a = s.insertBefore(pt(), o), c = s.insertBefore(pt(), o);
    i = new ri(a, c, t, t.options);
  } else {
    const a = i._$AB.nextSibling, c = i._$AM, r = c !== t;
    if (r) {
      let l;
      (n = i._$AQ) == null || n.call(i, t), i._$AM = t, i._$AP !== void 0 && (l = t._$AU) !== c._$AU && i._$AP(l);
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
}, ie = (t, e, i = t) => (t._$AI(e, i), t), ci = {}, li = (t, e = ci) => t._$AH = e, di = (t) => t._$AH, Ve = (t) => {
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
const ft = (t, e, i) => {
  const s = /* @__PURE__ */ new Map();
  for (let o = e; o <= i; o++) s.set(t[o], o);
  return s;
}, Dt = He(class extends Pe {
  constructor(t) {
    if (super(t), t.type !== Xe.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, i) {
    let s;
    i === void 0 ? i = e : e !== void 0 && (s = e);
    const o = [], n = [];
    let a = 0;
    for (const c of t) o[a] = s ? s(c, a) : a, n[a] = i(c, a), a++;
    return { values: n, keys: o };
  }
  render(t, e, i) {
    return this.dt(t, e, i).values;
  }
  update(t, [e, i, s]) {
    const o = di(t), { values: n, keys: a } = this.dt(e, i, s);
    if (!Array.isArray(o)) return this.ut = a, n;
    const c = this.ut ?? (this.ut = []), r = [];
    let l, d, h = 0, p = o.length - 1, f = 0, u = n.length - 1;
    for (; h <= p && f <= u; ) if (o[h] === null) h++;
    else if (o[p] === null) p--;
    else if (c[h] === a[f]) r[f] = ie(o[h], n[f]), h++, f++;
    else if (c[p] === a[u]) r[u] = ie(o[p], n[u]), p--, u--;
    else if (c[h] === a[u]) r[u] = ie(o[h], n[u]), ye(t, r[u + 1], o[h]), h++, u--;
    else if (c[p] === a[f]) r[f] = ie(o[p], n[f]), ye(t, o[h], o[p]), p--, f++;
    else if (l === void 0 && (l = ft(a, f, u), d = ft(c, h, p)), l.has(c[h])) if (l.has(c[p])) {
      const g = d.get(a[f]), m = g !== void 0 ? o[g] : null;
      if (m === null) {
        const _ = ye(t, o[h]);
        ie(_, n[f]), r[f] = _;
      } else r[f] = ie(m, n[f]), ye(t, o[h], m), o[g] = null;
      f++;
    } else Ve(o[p]), p--;
    else Ve(o[h]), h++;
    for (; f <= u; ) {
      const g = ye(t, r[u + 1]);
      ie(g, n[f]), r[f++] = g;
    }
    for (; h <= p; ) {
      const g = o[h++];
      g !== null && Ve(g);
    }
    return this.ut = a, li(t, r), R;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le = He(class extends Pe {
  constructor(t) {
    var e;
    if (super(t), t.type !== Xe.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
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
    return R;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = "important", hi = " !" + Tt, W = He(class extends Pe {
  constructor(t) {
    var e;
    if (super(t), t.type !== Xe.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const n = typeof o == "string" && o.endsWith(hi);
        s.includes("-") || n ? i.setProperty(s, n ? o.slice(0, -11) : o, n ? Tt : "") : i[s] = o;
      }
    }
    return R;
  }
});
var _t = Number.isNaN || function(e) {
  return typeof e == "number" && e !== e;
};
function ui(t, e) {
  return !!(t === e || _t(t) && _t(e));
}
function mi(t, e) {
  if (t.length !== e.length)
    return !1;
  for (var i = 0; i < t.length; i++)
    if (!ui(t[i], e[i]))
      return !1;
  return !0;
}
function z(t, e) {
  e === void 0 && (e = mi);
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
var oe, gt;
(function(t) {
  t.language = "language", t.system = "system", t.comma_decimal = "comma_decimal", t.decimal_comma = "decimal_comma", t.space_comma = "space_comma", t.none = "none";
})(oe || (oe = {})), (function(t) {
  t.language = "language", t.system = "system", t.am_pm = "12", t.twenty_four = "24";
})(gt || (gt = {}));
function Ot() {
  return (Ot = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];
      for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
    }
    return t;
  }).apply(this, arguments);
}
function B(t) {
  return t.substr(0, t.indexOf("."));
}
var pi = function(t) {
  switch (t.number_format) {
    case oe.comma_decimal:
      return ["en-US", "en"];
    case oe.decimal_comma:
      return ["de", "es", "it"];
    case oe.space_comma:
      return ["fr", "sv", "cs"];
    case oe.system:
      return;
    default:
      return t.language;
  }
}, fi = function(t, e) {
  return e === void 0 && (e = 2), Math.round(t * Math.pow(10, e)) / Math.pow(10, e);
}, _i = function(t, e, i) {
  var s = e ? pi(e) : void 0;
  if (Number.isNaN = Number.isNaN || function o(n) {
    return typeof n == "number" && o(n);
  }, (e == null ? void 0 : e.number_format) !== oe.none && !Number.isNaN(Number(t)) && Intl) try {
    return new Intl.NumberFormat(s, yt(t, i)).format(Number(t));
  } catch (o) {
    return console.error(o), new Intl.NumberFormat(void 0, yt(t, i)).format(Number(t));
  }
  return typeof t == "string" ? t : fi(t, void 0).toString() + "";
}, yt = function(t, e) {
  var i = Ot({ maximumFractionDigits: 2 }, e);
  if (typeof t != "string") return i;
  {
    var s = t.indexOf(".") > -1 ? t.split(".")[1].length : 0;
    i.minimumFractionDigits = s, i.maximumFractionDigits = s;
  }
  return i;
}, gi = ["closed", "locked", "off"], De = function(t, e, i, s) {
  s = s || {}, i = i ?? {};
  var o = new Event(e, { bubbles: s.bubbles === void 0 || s.bubbles, cancelable: !!s.cancelable, composed: s.composed === void 0 || s.composed });
  return o.detail = i, t.dispatchEvent(o), o;
}, Ee = function(t) {
  De(window, "haptic", t);
}, yi = function(t, e, i) {
  i === void 0 && (i = !1), i ? history.replaceState(null, "", e) : history.pushState(null, "", e), De(window, "location-changed", { replace: i });
}, vi = function(t, e, i) {
  i === void 0 && (i = !0);
  var s, o = B(e), n = o === "group" ? "homeassistant" : o;
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
}, bi = function(t, e) {
  var i = gi.includes(t.states[e].state);
  return vi(t, e, i);
}, $i = function(t, e, i, s) {
  if (s || (s = { action: "more-info" }), !s.confirmation || s.confirmation.exemptions && s.confirmation.exemptions.some(function(n) {
    return n.user === e.user.id;
  }) || (Ee("warning"), confirm(s.confirmation.text || "Are you sure you want to " + s.action + "?"))) switch (s.action) {
    case "more-info":
      (i.entity || i.camera_image) && De(t, "hass-more-info", { entityId: i.entity ? i.entity : i.camera_image });
      break;
    case "navigate":
      s.navigation_path && yi(0, s.navigation_path);
      break;
    case "url":
      s.url_path && window.open(s.url_path);
      break;
    case "toggle":
      i.entity && (bi(e, i.entity), Ee("success"));
      break;
    case "call-service":
      if (!s.service) return void Ee("failure");
      var o = s.service.split(".", 2);
      e.callService(o[0], o[1], s.service_data, s.target), Ee("success");
      break;
    case "fire-dom-event":
      De(t, "ll-custom", s);
  }
}, wi = function(t, e, i, s) {
  var o;
  s === "double_tap" && i.double_tap_action ? o = i.double_tap_action : s === "hold" && i.hold_action ? o = i.hold_action : s === "tap" && i.tap_action && (o = i.tap_action), $i(t, e, i, o);
};
function de(t) {
  return t !== void 0 && t.action !== "none";
}
var Ai = "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z", Ye = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", Ei = "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z", vt = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z", bt = "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z", Ci = "M17 14V17H14V19H17V22H19V19H22V17H19V14M20 11V12.3C19.4 12.1 18.7 12 18 12C16.8 12 15.6 12.4 14.7 13H7V11H20M12.1 17H7V15H12.8C12.5 15.6 12.2 16.3 12.1 17M7 7H20V9H7V7M5 19H7V21H3V3H7V5H5V19Z", Si = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", xi = "M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z", $t = "M10 19.11L12.11 17H7V15H14V15.12L16.12 13H7V11H17V12.12L18.24 10.89C18.72 10.41 19.35 10.14 20.04 10.14C20.37 10.14 20.7 10.21 21 10.33V5C21 3.89 20.1 3 19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.9 21 5 21H10V19.11M7 7H17V9H7V7M21.7 14.35L20.7 15.35L18.65 13.3L19.65 12.3C19.86 12.09 20.21 12.09 20.42 12.3L21.7 13.58C21.91 13.79 21.91 14.14 21.7 14.35M12 19.94L18.06 13.88L20.11 15.93L14.06 22H12V19.94Z", zi = "M17 6H7c-3.31 0-6 2.69-6 6s2.69 6 6 6h10c3.31 0 6-2.69 6-6s-2.69-6-6-6zm0 10H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h10c2.21 0 4 1.79 4 4s-1.79 4-4 4zM7 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z";
function qe(t, e, i) {
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
          default:
            return e === "off" ? "mdi:toggle-switch-off" : "mdi:toggle-switch";
        }
      return e === "off" ? "mdi:toggle-switch-off" : "mdi:toggle-switch";
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
const he = [
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
], me = [
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
], ki = {
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
}, Di = z(
  (t) => new Intl.Collator(t, { sensitivity: "accent" })
), Ti = (t, e) => t < e ? -1 : t > e ? 1 : 0, Lt = (t, e, i = void 0) => Intl != null && Intl.Collator ? Di(i).compare(t, e) : Ti(t.toLowerCase(), e.toLowerCase());
function M(t, e, i) {
  const s = new CustomEvent(e, {
    bubbles: !1,
    composed: !1,
    detail: i
  });
  t.dispatchEvent(s);
}
class Oi extends HTMLElement {
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
    e.actionHandler && xe(i, e.actionHandler.options) || (e.actionHandler && (e.removeEventListener("touchstart", e.actionHandler.start), e.removeEventListener("touchend", e.actionHandler.end), e.removeEventListener("touchcancel", e.actionHandler.end), e.removeEventListener("mousedown", e.actionHandler.start), e.removeEventListener("click", e.actionHandler.end), e.removeEventListener(
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
      s.cancelable && s.preventDefault(), i.hasHold && (clearTimeout(this.timer), this.timer = void 0), i.hasHold && this.held ? M(o, "action", { action: "hold" }) : i.hasDoubleClick ? s.type === "click" && s.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, M(o, "action", { action: "tap" });
      }, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, M(o, "action", { action: "double_tap" })) : M(o, "action", { action: "tap" });
    }, e.actionHandler.handleKeyDown = (s) => {
      ["Enter", " "].includes(s.key) && s.currentTarget.actionHandler.end(s);
    }, e.addEventListener("touchstart", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("touchend", e.actionHandler.end), e.addEventListener("touchcancel", e.actionHandler.end), e.addEventListener("mousedown", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("click", e.actionHandler.end), e.addEventListener("keydown", e.actionHandler.handleKeyDown)));
  }
}
customElements.define("action-handler-status-card", Oi);
const Li = () => {
  const t = document.body;
  if (t.querySelector("action-handler-status-card"))
    return t.querySelector("action-handler-status-card");
  const e = document.createElement("action-handler-status-card");
  return t.appendChild(e), e;
}, Mi = (t, e) => {
  const i = Li();
  i && i.bind(t, e);
}, Ce = He(
  class extends Pe {
    update(t, [e]) {
      return Mi(t.element, e), R;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    render(t) {
    }
  }
), xe = (t, e) => {
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
        if (!xe(t[i], e[i]))
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
        if (!xe(i[1], e.get(i[0])))
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
      if (!xe(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
}, Hi = (t, e, i, s, o) => {
  var h, p, f, u, g;
  const n = i || (e == null ? void 0 : e.theme), a = (e == null ? void 0 : e.darkMode) || !1;
  t.__themes || (t.__themes = { cacheKey: null, keys: /* @__PURE__ */ new Set() });
  let c = n || "", r = {};
  if (n === "default" && ((h = t.__themes) == null ? void 0 : h.cacheKey) === "default")
    return;
  if (n && n !== "default" && ((p = e == null ? void 0 : e.themes) != null && p[n])) {
    const { modes: m, ..._ } = e.themes[n] || {};
    r = { ...r, ..._ }, m && (a && m.dark ? r = { ...r, ...m.dark } : !a && m.light && (r = { ...r, ...m.light }));
  } else if (!n && (!((f = t.__themes) != null && f.keys) || t.__themes.keys.size === 0))
    return;
  const l = ((u = t.__themes) == null ? void 0 : u.keys) || /* @__PURE__ */ new Set(), d = new Set(Object.keys(r));
  if (n === "default" && d.size === 0) {
    for (const m of l)
      try {
        t.style.removeProperty(`--${m}`);
      } catch {
      }
    t.__themes = { cacheKey: "default", keys: /* @__PURE__ */ new Set() };
    return;
  }
  if (((g = t.__themes) == null ? void 0 : g.cacheKey) === c) {
    let m = !0;
    if (l.size !== d.size)
      m = !1;
    else
      for (const _ of l)
        if (!d.has(_)) {
          m = !1;
          break;
        }
    if (m) return;
  }
  for (const m of l)
    if (!d.has(m))
      try {
        t.style.removeProperty(`--${m}`);
      } catch {
      }
  for (const [m, _] of Object.entries(r))
    t.style.setProperty(`--${m}`, String(_));
  t.__themes.cacheKey = c || null, t.__themes.keys = d;
};
function Mt(t, e, i, s, o, n) {
  const a = o.area && o.area.length ? o.area : null, c = o.floor && o.floor.length ? o.floor : null, r = o.label && o.label.length ? o.label : null, l = o.hiddenAreas || [], d = o.hiddenLabels || [], h = o.hiddenEntities || [], p = new Set(l), f = new Set(d), u = new Set(h), g = new Map(e.map((b) => [b.id, b])), m = new Map(
    i.map((b) => [b.area_id, b.floor_id])
  ), _ = t.filter((b) => {
    var x, D, L;
    const y = b.entity_id.split(".")[0];
    if (!n.includes(y)) return !1;
    if (y === "update")
      return !b.hidden_by && !b.disabled_by;
    const $ = b.device_id ? g.get(b.device_id) : void 0;
    if (!(b.area_id != null || $ && $.area_id != null) || r && !((((x = b.labels) == null ? void 0 : x.some((V) => r.includes(V))) ?? !1) || (((D = $ == null ? void 0 : $.labels) == null ? void 0 : D.some((V) => r.includes(V))) ?? !1)) || a && !(b.area_id !== void 0 && a.includes(b.area_id) || $ && $.area_id !== void 0 && a.includes($.area_id)))
      return !1;
    if (c) {
      const F = b.area_id ? m.get(b.area_id) : void 0, V = $ != null && $.area_id ? m.get($.area_id) : void 0;
      if (!(F && c.includes(F) || V && c.includes(V))) return !1;
    }
    return p.size && (b.area_id && p.has(b.area_id) || $ && $.area_id && p.has($.area_id)) || (L = b.labels) != null && L.some((F) => f.has(F)) || u.has(b.entity_id) ? !1 : !b.hidden_by && !b.disabled_by;
  }).map((b) => b.entity_id), E = {};
  for (const b of _) {
    const y = b.split(".")[0], $ = s[b];
    $ && (E[y] || (E[y] = [])).push($);
  }
  return E;
}
function Ht(t) {
  return t.split("_").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
}
function P(t, e) {
  return e ? `${Ht(t)} - ${e}` : t;
}
function wt(t, e) {
  var i, s;
  return ((s = (i = t == null ? void 0 : t[e]) == null ? void 0 : i.attributes) == null ? void 0 : s.friendly_name) || e;
}
function Te(t, e) {
  return (i, s) => Lt(
    wt(t, i),
    wt(t, s),
    e
  );
}
function K(t, e) {
  if (t === e) return !0;
  if (!Array.isArray(t) || !Array.isArray(e) || t.length !== e.length) return !1;
  const i = new Set(e);
  for (const s of t)
    if (!i.has(s)) return !1;
  return !0;
}
const At = [
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
function I(t, e, i) {
  return t.localize(
    `component.${i}.entity_component._.state.${e}`
  ) || e;
}
function Ie(t, e, i, s) {
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
      if (me.includes(e.name))
        return t.localize(`component.${e.name}.entity_component._.name`) || e.name;
      for (const [o, n] of Object.entries(ki))
        if (n.includes(e.name))
          return t.localize(
            `ui.dialogs.entity_registry.editor.device_classes.${o}.${e.name}`
          ) || e.name;
      return t.localize(
        `ui.panel.lovelace.editor.card.area.${e.name}`
      );
  }
}
function Oe(t, e) {
  let i = [];
  Array.isArray(e.filters) ? i = e.filters : [
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
  ].forEach((a) => {
    e[a] !== void 0 && i.push({ key: a, value: e[a] });
  });
  const s = new Map((t.entities || []).map((a) => [a.entity_id, a])), o = new Map((t.devices || []).map((a) => [a.id, a])), n = new Map((t.areas || []).map((a) => [a.area_id, a]));
  return Object.values(t.hass.states).filter((a) => t.hiddenEntities.includes(a.entity_id) ? !1 : i.length ? i.every(
    (c) => Pi(t, a, c, {
      areas: t.areas,
      devices: t.devices,
      entities: t.entities,
      entityMap: s,
      deviceMap: o,
      areaMap: n
    })
  ) : !0);
}
function C(t, e) {
  if (Array.isArray(e))
    return e.some((i) => C(t, i));
  if (typeof e == "string" && e.startsWith("!"))
    return !C(t, e.slice(1));
  if (typeof e == "string" && /^([<>]=?)\s*(-?\d+(\.\d+)?)([mhd])$/.test(e)) {
    const [, i, s, , o] = e.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)([mhd])$/) || [], n = parseFloat(s), a = Date.now(), c = new Date(t).getTime();
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
  if (typeof e == "string" && /^([<>]=?)?\s*\d+$/.test(e)) {
    const [, i, s] = e.match(/^([<>]=?)?\s*(\d+)$/) || [], o = parseFloat(s), n = new Date(t).getTime();
    if (!isNaN(n)) {
      const a = (Date.now() - n) / 6e4;
      switch (i) {
        case ">":
          return a > o;
        case ">=":
          return a >= o;
        case "<":
          return a < o;
        case "<=":
          return a <= o;
        default:
          return Math.round(a) === o;
      }
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
function Pi(t, e, i, s) {
  var n, a, c, r, l, d, h, p, f;
  const o = ((n = s.entityMap) == null ? void 0 : n.get(e.entity_id)) || ((a = s.entities) == null ? void 0 : a.find((u) => u.entity_id === e.entity_id));
  switch (i.key) {
    case "area": {
      let u = o == null ? void 0 : o.area_id;
      if (!u && (o != null && o.device_id)) {
        const g = (s.deviceMap && (o != null && o.device_id) ? s.deviceMap.get(o.device_id) : void 0) || ((c = s.devices) == null ? void 0 : c.find((m) => m.id === o.device_id));
        u = g == null ? void 0 : g.area_id;
      }
      return C(u, i.value);
    }
    case "domain":
      return C(B(e.entity_id), i.value);
    case "entity_id":
      return C(e.entity_id, i.value);
    case "state":
      return C(e.state, i.value);
    case "name": {
      const u = e.attributes.friendly_name ?? "";
      return C(u, i.value);
    }
    case "attributes":
      return !i.value || typeof i.value != "object" ? !1 : Object.entries(i.value).every(([u, g]) => {
        const m = u.split(":");
        let _ = e.attributes;
        for (const E of m)
          if (_ = _ == null ? void 0 : _[E], _ === void 0) break;
        return _ === void 0 ? !1 : C(_, g);
      });
    case "device":
      return C(o == null ? void 0 : o.device_id, i.value);
    case "integration":
      return o ? C(o.platform, i.value) || C(o.config_entry_id, i.value) : !1;
    case "entity_category":
      return C(o == null ? void 0 : o.entity_category, i.value);
    case "label": {
      const u = s.labels, g = (m) => {
        if (C(m, i.value)) return !0;
        if (u) {
          const _ = u.find((E) => E.label_id === m);
          if (_ && C(_.name, i.value)) return !0;
        }
        return !1;
      };
      if (o != null && o.labels && o.labels.some(g)) return !0;
      if (o != null && o.device_id) {
        const m = (s.deviceMap && (o != null && o.device_id) ? s.deviceMap.get(o.device_id) : void 0) || ((r = s.devices) == null ? void 0 : r.find((_) => _.id === o.device_id));
        if (m != null && m.labels && m.labels.some(g)) return !0;
      }
      return !1;
    }
    case "floor": {
      let u = o == null ? void 0 : o.area_id;
      if (!u && (o != null && o.device_id)) {
        const m = (s.deviceMap && (o != null && o.device_id) ? s.deviceMap.get(o.device_id) : void 0) || ((l = s.devices) == null ? void 0 : l.find((_) => _.id === o.device_id));
        u = m == null ? void 0 : m.area_id;
      }
      if (!u) return !1;
      const g = (s.areaMap ? s.areaMap.get(u) : void 0) || ((d = s.areas) == null ? void 0 : d.find((m) => m.area_id === u));
      return C(g == null ? void 0 : g.floor_id, i.value);
    }
    case "hidden_by":
      return C(o == null ? void 0 : o.hidden_by, i.value);
    case "device_manufacturer": {
      if (o != null && o.device_id) {
        const u = (s.deviceMap && (o != null && o.device_id) ? s.deviceMap.get(o.device_id) : void 0) || ((h = s.devices) == null ? void 0 : h.find((g) => g.id === o.device_id));
        return C(u == null ? void 0 : u.manufacturer, i.value);
      }
      return !1;
    }
    case "device_model": {
      if (o != null && o.device_id) {
        const u = (s.deviceMap && (o != null && o.device_id) ? s.deviceMap.get(o.device_id) : void 0) || ((p = s.devices) == null ? void 0 : p.find((g) => g.id === o.device_id));
        return C(u == null ? void 0 : u.model, i.value);
      }
      return !1;
    }
    case "last_changed":
      return C(e.last_changed, i.value);
    case "last_updated":
      return C(e.last_updated, i.value);
    case "last_triggered":
      return C(e.attributes.last_triggered, i.value);
    case "group": {
      const u = t.hass.states[i.value];
      return !u || !Array.isArray((f = u.attributes) == null ? void 0 : f.entity_id) ? !1 : u.attributes.entity_id.includes(e.entity_id);
    }
    default:
      return !0;
  }
}
var Ii = Object.defineProperty, H = (t, e, i, s) => {
  for (var o = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = a(e, i, o) || o);
  return o && Ii(e, i, o), o;
};
const Bi = /* @__PURE__ */ new Set([
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
var ne;
const j = (ne = class extends U {
  constructor() {
    super(...arguments), this.open = !1, this.title = "", this.content = "", this.entities = [], this._showAll = !1, this._cardEls = /* @__PURE__ */ new Map(), this._lastEntityIds = [], this._onClosed = (e) => {
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
    }, this.computeLabel = z(
      (e, i, s) => Ie(this.hass, e, i, s)
    ), this.groupAndSortEntities = z(
      (e, i, s) => {
        const o = /* @__PURE__ */ new Map();
        for (const a of e) {
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
  showDialog(e) {
    this.title = e.title ?? this.title, this.hass = e.hass, this.entities = e.entities ?? [], e.content !== void 0 && (this.content = e.content), this.selectedDomain = e.selectedDomain, this.selectedDeviceClass = e.selectedDeviceClass, this.selectedGroup = e.selectedGroup, this.card = e.card, this._cardEls.clear(), this.open = !0, this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cardEls.clear();
  }
  _toTileConfig(e) {
    return {
      type: "tile",
      entity: e.entity
    };
  }
  async _createCardElement(e, i, s = !1) {
    var o, n, a;
    try {
      const c = await ((o = window == null ? void 0 : window.loadCardHelpers) == null ? void 0 : o.call(window));
      if (c != null && c.createCardElement) {
        const r = c.createCardElement(i);
        return r.hass = e, (n = r.setAttribute) == null || n.call(r, "data-hui-card", ""), r;
      }
    } catch {
    }
    try {
      const c = i.type || "tile", r = typeof c == "string" && c.startsWith("custom:"), l = r ? c.slice(7) : `hui-${c}-card`;
      r && !customElements.get(l) && await customElements.whenDefined(l).catch(() => {
      });
      const d = document.createElement(l);
      return typeof d.setConfig == "function" && d.setConfig(i), d.hass = e, (a = d.setAttribute) == null || a.call(d, "data-hui-card", ""), d;
    } catch {
      if (!s)
        return this._createCardElement(
          e,
          this._toTileConfig(i),
          !0
        );
      const c = document.createElement("div");
      return c.setAttribute("data-hui-card", ""), c;
    }
  }
  _getPopupCardConfig(e) {
    var f, u, g, m;
    const i = this.card, s = B(e.entity_id), o = this.selectedDomain || s, n = this.selectedDomain ? this.selectedDeviceClass : (m = (g = (u = (f = this.hass) == null ? void 0 : f.states) == null ? void 0 : u[e.entity_id]) == null ? void 0 : g.attributes) == null ? void 0 : m.device_class, a = P(o, n), c = typeof (i == null ? void 0 : i.getCustomizationForType) == "function" ? i.getCustomizationForType(a) : void 0, r = c == null ? void 0 : c.popup_card, l = r && typeof r.type == "string" && r.type || (c == null ? void 0 : c.popup_card_type) || "tile", d = l === "tile" ? this.DOMAIN_FEATURES[s] ?? {} : {};
    let h = {};
    if (r && typeof r == "object") {
      const { type: _, entity: E, ...b } = r;
      h = b;
    } else
      h = (c == null ? void 0 : c.popup_card_options) ?? {};
    return {
      type: l,
      entity: e.entity_id,
      ...d,
      ...h
    };
  }
  shouldUpdate(e) {
    if (!this.open)
      return e.has("open");
    if (e.size === 1 && e.has("hass")) {
      const i = this._getCurrentEntities().map((n) => n.entity_id).sort(), s = (this._lastEntityIds || []).slice().sort(), o = i.length === s.length && i.every((n, a) => n === s[a]);
      return this._updateCardsHass(), !o;
    }
    return !0;
  }
  _updateCardsHass() {
    this.hass && this._cardEls.forEach((e) => {
      try {
        e.hass = this.hass;
      } catch {
      }
    });
  }
  _getOrCreateCard(e) {
    const i = e.entity_id, s = this._cardEls.get(i);
    if (s) {
      try {
        s.hass = this.hass;
      } catch {
      }
      return s;
    }
    const o = document.createElement("div");
    o.classList.add("card-placeholder"), o.setAttribute("data-hui-card", ""), this._cardEls.set(i, o);
    const n = this._getPopupCardConfig(e);
    return this._createCardElement(this.hass, n).then((a) => {
      try {
        this._cardEls.get(i) === o && (o.replaceWith(a), this._cardEls.set(i, a)), a.hass = this.hass;
      } catch {
      }
    }), o;
  }
  _getCurrentEntities() {
    var a, c, r;
    const e = this.card, i = this.selectedDomain, s = this.selectedDeviceClass, o = this.selectedGroup;
    let n = [];
    if (o !== void 0 && ((c = (a = e._config) == null ? void 0 : a.content) != null && c[o])) {
      const l = e._config.content[o], d = (r = e._config.rulesets) == null ? void 0 : r.find(
        (h) => h.group_id === l
      );
      n = d ? Oe(e, d) : [];
    } else
      i ? n = ((typeof (e == null ? void 0 : e._shouldShowTotalEntities) == "function" ? e._shouldShowTotalEntities(i, s) : !1) ? !0 : this._showAll) ? e._totalEntities(i, s) : e._isOn(i, s) : n = Array.isArray(this.entities) ? this.entities : [];
    return n;
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
  _isActive(e) {
    return !Bi.has(e.state);
  }
  sortEntitiesForPopup(e) {
    var n, a;
    const i = ((a = (n = this.card) == null ? void 0 : n._config) == null ? void 0 : a.popup_sort) || "name", s = e.slice();
    if (i === "state") {
      const c = Te(
        this.hass.states,
        this.hass.locale.language
      );
      return s.sort((r, l) => {
        const d = this._isActive(r) ? 0 : 1, h = this._isActive(l) ? 0 : 1;
        if (d !== h) return d - h;
        const p = B(r.entity_id), f = B(l.entity_id), u = this.hass ? I(this.hass, r.state, p) : r.state, g = this.hass ? I(this.hass, l.state, f) : l.state, m = (u || "").localeCompare(g || "");
        return m !== 0 ? m : c(r.entity_id, l.entity_id);
      });
    }
    const o = Te(
      this.hass.states,
      this.hass.locale.language
    );
    return s.sort((c, r) => o(c.entity_id, r.entity_id));
  }
  render() {
    var y, $, ee, x, D, L, F, V, Ne, tt, it, st;
    if (!this.open) return v``;
    const e = (y = this.card) != null && y.list_mode ? 1 : ((ee = ($ = this.card) == null ? void 0 : $._config) == null ? void 0 : ee.columns) || 4, i = this.selectedDomain, s = this.selectedDeviceClass, o = this.selectedGroup, n = this.card, c = (typeof (n == null ? void 0 : n._shouldShowTotalEntities) == "function" ? n._shouldShowTotalEntities(i, s) : !1) ? !0 : this._showAll, r = new Map(
      (x = n.areas) == null ? void 0 : x.map((w) => [w.area_id, w.name])
    );
    let l = [], d = !1;
    if (o !== void 0 && ((L = (D = n._config) == null ? void 0 : D.content) != null && L[o])) {
      const w = n._config.content[o], N = (F = n._config.rulesets) == null ? void 0 : F.find(
        (G) => G.group_id === w
      );
      l = N ? Oe(n, N) : [];
    } else
      i ? l = c ? n._totalEntities(i, s) : n._isOn(i, s) : l = Array.isArray(this.entities) ? this.entities : [], d = !0;
    const h = this.sortEntitiesForPopup(l), p = new Set(l.map((w) => w.entity_id));
    Array.from(this._cardEls.keys()).forEach((w) => {
      p.has(w) || this._cardEls.delete(w);
    }), this._lastEntityIds = l.map((w) => w.entity_id);
    const f = this.groupAndSortEntities(
      l,
      r,
      this.sortEntitiesForPopup.bind(this)
    ), u = ((V = n == null ? void 0 : n._config) == null ? void 0 : V.ungroupAreas) === !0 || ((Ne = n == null ? void 0 : n._config) == null ? void 0 : Ne.ungroup_areas) === !0 || ((tt = n == null ? void 0 : n._config) == null ? void 0 : tt.area_grouping) !== void 0 && ((it = n == null ? void 0 : n._config) == null ? void 0 : it.area_grouping) === !1, g = f.length ? Math.max(...f.map(([, w]) => w.length)) : 0, m = u ? Math.min(e, Math.max(1, l.length)) : Math.min(e, Math.max(1, g)), _ = P(i, s), E = typeof (n == null ? void 0 : n.getCustomizationForType) == "function" ? n.getCustomizationForType(_) : void 0, b = (E == null ? void 0 : E.invert) === !0;
    return v`
      <ha-dialog
        .open=${this.open}
        hideActions
        @closed=${this._onClosed}
        style="--columns: ${m};"
      >
        <style>
          ${ne.styles}
        </style>
        <div class="dialog-header">
          <ha-icon-button
            slot="trigger"
            .label=${this.hass.localize("ui.common.close")}
            .path=${Ye}
            @click=${this._onClosed}
          ></ha-icon-button>
          <h3>
            ${(() => {
      var G, ce;
      const w = this.selectedGroup, N = this.card;
      if (w !== void 0 && ((ce = (G = N == null ? void 0 : N._config) == null ? void 0 : G.content) != null && ce[w])) {
        const Pt = N._config.content[w];
        return this.hass.localize(
          "ui.panel.lovelace.editor.card.entities.name"
        ) + " in " + Pt;
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

          ${d ? v`
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
                    .path=${Ei}
                  ></ha-icon-button>

                  <ha-list-item
                    graphic="icon"
                    @click=${this.handleAskToggleDomain}
                    @closed=${this._stopPropagation}
                  >
                    ${b ? this.hass.localize("ui.card.common.turn_on") : this.hass.localize("ui.card.common.turn_off")}
                    <ha-svg-icon
                      slot="graphic"
                      .path=${zi}
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
                      .path=${xi}
                    ></ha-svg-icon>
                  </ha-list-item>
                </ha-button-menu>
              ` : ""}
        </div>
        <div class="dialog-content">
          ${(st = this.card) != null && st.list_mode ? u ? v`
                  <ul class="entity-list">
                    ${h.map(
      (w) => v`<li class="entity-item">- ${w.entity_id}</li>`
    )}
                  </ul>
                ` : v`
                  <ul class="entity-list">
                    ${f.map(([w, N]) => {
      const G = r.get(w) ?? (w === "unassigned" ? "Unassigned" : w);
      return v`
                        <li class="entity-item">
                          <h4>${G}:</h4>
                          <ul>
                            ${N.map(
        (ce) => v`
                                <li class="entity-item">
                                  - ${ce.entity_id}
                                </li>
                              `
      )}
                          </ul>
                        </li>
                      `;
    })}
                  </ul>
                ` : u ? v`
                <div class="entity-cards">
                  ${h.map(
      (w) => v` <div class="entity-card">
                      ${this._getOrCreateCard(w)}
                    </div>`
    )}
                </div>
              ` : v`${f.map(([w, N]) => {
      const G = r.get(w) ?? (w === "unassigned" ? "Unassigned" : w);
      return v`
                  <div class="cards-wrapper">
                    <h4>${G}</h4>
                    <div class="entity-cards">
                      ${N.map(
        (ce) => v`
                          <div class="entity-card">
                            ${this._getOrCreateCard(ce)}
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
}, ne.styles = fe`
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
  `, ne);
H([
  A({ type: Boolean })
], j.prototype, "open");
H([
  A({ type: String })
], j.prototype, "title");
H([
  A({ type: String })
], j.prototype, "selectedDomain");
H([
  A({ type: String })
], j.prototype, "selectedDeviceClass");
H([
  A({ type: String })
], j.prototype, "content");
H([
  A({ type: Array })
], j.prototype, "entities");
H([
  A({ attribute: !1 })
], j.prototype, "hass");
H([
  A({ attribute: !1 })
], j.prototype, "card");
H([
  S()
], j.prototype, "_showAll");
H([
  S()
], j.prototype, "selectedGroup");
let Ni = j;
customElements.define("popup-dialog", Ni);
const et = class et extends U {
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
    var a, c;
    if (!this.open || !this.hass || !this.card) return v``;
    const e = this.selectedDomain || "", i = this.selectedDeviceClass, s = P(e, i), o = (c = (a = this.card) == null ? void 0 : a.getCustomizationForType) == null ? void 0 : c.call(a, s), n = (o == null ? void 0 : o.invert) === !0;
    return v`
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
et.styles = fe``;
let X = et;
H([
  A({ type: Boolean })
], X.prototype, "open");
H([
  A({ attribute: !1 })
], X.prototype, "hass");
H([
  A({ attribute: !1 })
], X.prototype, "card");
H([
  A({ type: String })
], X.prototype, "selectedDomain");
H([
  A({ type: String })
], X.prototype, "selectedDeviceClass");
customElements.define("popup-dialog-confirmation", X);
var ji = Object.defineProperty, Fi = Object.getOwnPropertyDescriptor, O = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Fi(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && ji(e, i, o), o;
};
let T = class extends U {
  constructor() {
    super(...arguments), this.areas = [], this.devices = [], this.entities = [], this.entitiesByDomain = {}, this.selectedDomain = null, this.selectedDeviceClass = null, this.hiddenEntities = [], this.hiddenLabels = [], this.hiddenAreas = [], this.hide_person = !1, this.hide_content_name = !0, this.list_mode = !1, this.selectedGroup = null, this._entitiesByDomainMemo = z(
      (t, e, i, s, o, n, a, c, r, l) => Mt(
        t,
        e,
        i,
        s,
        {
          area: o || null,
          floor: n || null,
          label: a || null,
          hiddenAreas: c,
          hiddenLabels: r,
          hiddenEntities: l
        },
        me
      )
    ), this.computeLabel = z(
      (t, e, i) => Ie(this.hass, t, e, i)
    ), this._customizationIndex = z((t) => {
      const e = /* @__PURE__ */ new Map();
      return (t ?? []).forEach((i) => {
        i.type && e.set(i.type.toLowerCase(), i);
      }), e;
    }), this._computeExtraItems = z(
      (t, e) => {
        const i = t.content || [];
        return t.extra_entities ? t.extra_entities.reduce((s, o) => {
          var u;
          if (!i.includes(o)) return s;
          const n = e[o];
          if (!n) return s;
          const a = (u = t.customization) == null ? void 0 : u.find(
            (g) => g.type === o
          );
          if (a && a.state !== void 0 && a.invert_state !== void 0) {
            const g = a.invert_state === "true", m = n.state === a.state;
            if (!g && !m || g && m) return s;
          }
          const c = i.indexOf(o), r = c >= 0 ? c : 0, l = this.getCustomIcon(o, void 0, n), d = this.getCustomName(o, void 0, n) ?? n.attributes.friendly_name ?? o, h = this.getCustomColor(o, void 0), p = this.getCustomCSS(
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
            icon_css: p,
            background_color: f
          }), s;
        }, []).sort((s, o) => s.order - o.order) : [];
      }
    ), this._computeGroupItems = z(
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
    ), this._computeDomainItems = z(
      (t) => t.map(
        (e, i) => e.includes(" - ") ? null : { type: "domain", domain: e, order: i }
      ).filter((e) => e !== null)
    ), this._computeDeviceClassItems = z(
      (t) => t.map((e, i) => {
        if (!e.includes(" - ")) return null;
        const [s, o] = e.split(" - ");
        return {
          type: "deviceClass",
          domain: s.trim().toLowerCase().replace(/\s+/g, "_"),
          deviceClass: o.trim().toLowerCase(),
          order: i
        };
      }).filter((e) => e !== null)
    ), this._computeSortedEntities = z(
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
    this.entitiesByDomain = t;
  }
  _entitiesByDomain(t, e, i, s) {
    const o = this._config.area || null, n = this._config.floor || null, a = this._config.label || null;
    return this._entitiesByDomainMemo(
      t,
      e,
      i,
      s,
      o,
      n,
      a,
      this.hiddenAreas,
      this.hiddenLabels,
      this.hiddenEntities
    );
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
    const i = P(t, e), s = this.getCustomizationForType(i);
    return (s == null ? void 0 : s.show_total_entities) === !0;
  }
  _shouldShowTotalNumbers(t, e) {
    if (this._config.show_total_number) return !0;
    const i = P(t, e), s = this.getCustomizationForType(i);
    return (s == null ? void 0 : s.show_total_number) === !0;
  }
  _isOn(t, e) {
    var n;
    const i = this._baseEntities(t, e), s = P(t, e), o = ((n = this.getCustomizationForType(s)) == null ? void 0 : n.invert) === !0;
    return i.filter((a) => {
      if (t === "climate") {
        const r = a.attributes.hvac_action;
        if (r !== void 0) {
          const l = !["idle", "off"].includes(r);
          return o ? !l : l;
        }
      }
      if (t === "humidifier") {
        const r = a.attributes.action;
        if (r !== void 0) {
          const l = !["idle", "off"].includes(r);
          return o ? !l : l;
        }
      }
      let c = !At.includes(a.state);
      return o ? !c : c;
    });
  }
  setConfig(t) {
    if (!t)
      throw new Error("Invalid configuration.");
    this._config = t, this.hide_person = t.hide_person !== void 0 ? t.hide_person : !1, this.hide_content_name = t.hide_content_name !== void 0 ? t.hide_content_name : !1, this.list_mode = t.list_mode !== void 0 ? t.list_mode : !1, this.hiddenEntities = t.hidden_entities || [], this.hiddenLabels = t.hidden_labels || [], this.hiddenAreas = t.hidden_areas || [];
  }
  _showPopup(t, e, i) {
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
      const c = (n = this._config.content) == null ? void 0 : n[t], r = (a = this._config.rulesets) == null ? void 0 : a.find(
        (l) => l.group_id === c
      );
      i = r ? Oe(this, r) : [];
    } else {
      const c = this.selectedDeviceClass || void 0;
      i = this._shouldShowTotalEntities(t, c) ? this._totalEntities(t, c) : this._isOn(t, c);
    }
    this._showPopup(this, "popup-dialog", {
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
    if (t.has("selectedDomain") && this.selectedDomain) {
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
    (t.has("hass") && (!e || e.themes !== this.hass.themes) || t.has("_config") && (!i || i.theme !== this._config.theme)) && Hi(
      this,
      this.hass.themes,
      this._config.theme
    ), (t.has("hass") || t.has("_config") || t.has("hiddenEntities") || t.has("hiddenLabels") || t.has("hiddenAreas")) && (!e || e.states !== this.hass.states || t.has("_config") || t.has("hiddenEntities") || t.has("hiddenLabels") || t.has("hiddenAreas")) && this._processEntities();
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
    ], o = P(t, e), n = this.getCustomizationForType(o), a = (n == null ? void 0 : n.invert) === !0;
    switch (t) {
      case "device_tracker": {
        const c = I(
          this.hass,
          "home",
          "device_tracker"
        ), r = I(
          this.hass,
          "not_home",
          "device_tracker"
        );
        return a ? r : c;
      }
      case "lock":
      case "cover": {
        const c = I(this.hass, "open", "cover"), r = I(
          this.hass,
          "closed",
          "cover"
        );
        return a ? r : c;
      }
      case "person":
        return i === "home" ? I(this.hass, "home", "person") : i === "not_home" ? I(this.hass, "not_home", "person") : i ?? "unknown";
      default: {
        if (e && s.includes(e)) {
          const l = I(this.hass, "open", "cover"), d = I(
            this.hass,
            "closed",
            "cover"
          );
          return a ? d : l;
        }
        const c = I(
          this.hass,
          i ?? "on",
          "light"
        ), r = I(
          this.hass,
          i ?? "off",
          "light"
        );
        return a ? r : c;
      }
    }
  }
  getCustomizationForType(t) {
    return t ? this._customizationIndex(this._config.customization).get(t.toLowerCase()) : void 0;
  }
  getCustomIcon(t, e, i) {
    const s = this.getCustomizationForType(
      P(t, e)
    );
    if ((s == null ? void 0 : s.show_entity_picture) === !0 && i && i.attributes && i.attributes.entity_picture)
      return i.attributes.entity_picture;
    if (s && s.icon)
      return s.icon;
    if (i && i.attributes && i.attributes.icon)
      return i.attributes.icon;
    if (!i) {
      const n = (s == null ? void 0 : s.invert) === !0 ? "off" : "on";
      let a = t;
      return !e && t.includes(".") && (a = t.split(".")[0]), qe(a, n, e);
    }
    return "";
  }
  getBackgroundColor(t, e) {
    var o;
    const i = this.getCustomizationForType(
      P(t, e)
    ), s = (n) => n.length === 4 ? `rgba(${n[0]},${n[1]},${n[2]},${n[3]})` : `rgb(${n[0]},${n[1]},${n[2]})`;
    if (i && Array.isArray(i.background_color)) {
      const n = i.background_color;
      if (n.length >= 3) return s(n);
    }
    if (Array.isArray((o = this._config) == null ? void 0 : o.background_color)) {
      const n = this._config.background_color;
      if (n.length >= 3) return s(n);
    }
    return "rgba(var(--rgb-primary-text-color), 0.15)";
  }
  getCustomColor(t, e) {
    const i = this.getCustomizationForType(
      P(t, e)
    );
    if (i && i.icon_color)
      return i.icon_color;
    if (this._config && this._config.color)
      return this._config.color;
  }
  getCustomName(t, e, i) {
    const s = this.getCustomizationForType(
      P(t, e)
    );
    if (s && s.name)
      return s.name;
    if (i && i.attributes.friendly_name)
      return i.attributes.friendly_name;
  }
  getCustomCSS(t, e) {
    const i = this.getCustomizationForType(
      P(t, e)
    );
    if (i && i.icon_css)
      return i.icon_css;
  }
  toggleDomain(t, e) {
    t = t ?? this.selectedDomain, e = e ?? this.selectedDeviceClass;
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
      let o = !At.includes(s.state);
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
      var l, d, h;
      i.stopPropagation();
      const s = this.getCustomizationForType(
        P(t, e)
      );
      let o, n;
      i.detail.action === "tap" ? (o = s == null ? void 0 : s.tap_action, n = (l = this._config) == null ? void 0 : l.tap_action) : i.detail.action === "hold" ? (o = s == null ? void 0 : s.hold_action, n = (d = this._config) == null ? void 0 : d.hold_action) : i.detail.action === "double_tap" && (o = s == null ? void 0 : s.double_tap_action, n = (h = this._config) == null ? void 0 : h.double_tap_action);
      const a = o !== void 0 ? o : n, c = typeof a == "string" && a === "more-info" || typeof a == "object" && (a == null ? void 0 : a.action) === "more-info", r = typeof a == "string" && a === "toggle" || typeof a == "object" && (a == null ? void 0 : a.action) === "toggle";
      if (t.includes(".")) {
        const p = t, f = this.hass.states[p], u = B(p);
        if (r) {
          this.hass.callService(u, "toggle", { entity_id: p });
          return;
        }
        if (c) {
          this.showMoreInfo(f);
          return;
        }
      }
      if (c || a === void 0) {
        this.selectedDomain = t, this.selectedDeviceClass = e || null;
        return;
      }
      if (r) {
        this.toggleDomain(t, e);
        return;
      }
      wi(
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
      var a, c;
      const i = this.hass.states[e.entity_id], s = (i == null ? void 0 : i.state) !== "home", o = {
        horizontal: this._config.content_layout === "horizontal"
      }, n = {
        "border-radius": (a = this._config) != null && a.square ? "20%" : "50%",
        filter: s ? "grayscale(100%)" : "none"
      };
      return v`
        <sl-tab
          slot="nav"
          panel=${e.entity_id}
          @click="${() => this.showMoreInfo(e)}"
        >
          <div class="entity ${le(o)}">
            <div class="entity-icon" style=${W(n)}>
              ${e.attributes.entity_picture ? v`<img
                    src=${e.attributes.entity_picture}
                    alt=${e.attributes.friendly_name || e.entity_id}
                    style=${W(n)}
                  />` : v`<ha-icon
                    class="center"
                    icon=${e.attributes.icon || "mdi:account"}
                    style=${W(n)}
                  ></ha-icon>`}
            </div>
            <div class="entity-info">
              ${this.hide_content_name ? "" : v`<div class="entity-name">
                    ${((c = e.attributes.friendly_name) == null ? void 0 : c.split(" ")[0]) || ""}
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
    const { panel: e, entity: i, icon: s, name: o, color: n, icon_css: a, background_color: c } = t, r = this.hass.states[e], l = i.state, d = Number(l), h = !Number.isNaN(d) && l !== "" ? _i(d, this.hass.locale) : I(this.hass, l, B(e)), p = i.attributes.unit_of_measurement, f = this.getCustomizationForType(e), u = this._handleDomainAction(e), g = Ce({
      hasHold: de(
        (f == null ? void 0 : f.hold_action) ?? this._config.hold_action
      ),
      hasDoubleClick: de(
        (f == null ? void 0 : f.double_tap_action) ?? this._config.double_tap_action
      )
    }), m = {
      horizontal: this._config.content_layout === "horizontal"
    }, _ = this._getIconStyles("extra", {
      color: n,
      background_color: c,
      square: this._config.square
    });
    return v`
      <sl-tab slot="nav" panel=${e} @action=${u} .actionHandler=${g}>
        <div class="extra-entity ${le(m)}">
          <div class="entity-icon" style=${W(_)}>
            ${s.startsWith("/") || s.startsWith("http") ? v`<img
                  src=${s}
                  alt=${o}
                  style="border-radius:${this._config.square ? "20%" : "50%"};object-fit:cover;"
                />` : v`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${r}
                  .icon=${s}
                  data-domain=${B(e)}
                  data-state=${r.state}
                  style="${a || ""}"
                ></ha-state-icon>`}
          </div>
          <div class="entity-info">
            ${this.hide_content_name ? "" : v`<div class="entity-name">${o}</div>`}
            <div class="entity-state">
              ${h}${p ? ` ${p}` : ""}
            </div>
          </div>
        </div>
      </sl-tab>
    `;
  }
  renderGroupTab(t, e) {
    const i = Oe(this, t);
    if (!i.length) return v``;
    const s = t.group_id || `${this.hass.localize("component.group.entity_component._.name")} ${e + 1}`, o = t.group_icon || "mdi:format-list-group", n = this.getCustomColor(s), a = this.getBackgroundColor(s), c = () => {
      this.selectedGroup = e;
    }, r = Ce({
      hasHold: !1,
      hasDoubleClick: !1
    }), l = {
      horizontal: this._config.content_layout === "horizontal"
    }, d = this._getIconStyles("domain", {
      color: n,
      background_color: a,
      square: this._config.square
    });
    return v`
      <sl-tab
        slot="nav"
        panel=${"group-" + e}
        @action=${c}
        .actionHandler=${r}
      >
        <div class="entity ${le(l)}">
          <div class="entity-icon" style=${W(d)}>
            <ha-icon icon=${o}></ha-icon>
          </div>
          <div class="entity-info">
            ${this.hide_content_name ? "" : v`<div class="entity-name">${s}</div>`}
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
    if (!(this._shouldShowTotalEntities(e) ? s : i).length) return v``;
    const a = this.getCustomColor(e), c = this.getCustomizationForType(e), r = this._handleDomainAction(e), l = Ce({
      hasHold: de(
        (c == null ? void 0 : c.hold_action) ?? this._config.hold_action
      ),
      hasDoubleClick: de(
        (c == null ? void 0 : c.double_tap_action) ?? this._config.double_tap_action
      )
    }), d = {
      horizontal: this._config.content_layout === "horizontal"
    }, h = this._getIconStyles("domain", {
      color: a,
      background_color: this.getBackgroundColor(e),
      square: this._config.square
    });
    return v`
      <sl-tab
        slot="nav"
        panel=${e}
        @action=${r}
        .actionHandler=${l}
      >
        <div class="entity ${le(d)}">
          <div class="entity-icon" style=${W(h)}>
            <ha-icon
              icon=${this.getCustomIcon(e)}
              style=${W({})}
            ></ha-icon>
          </div>
          <div class="entity-info">
            ${this.hide_content_name ? "" : v`<div class="entity-name">
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
    if (!(this._shouldShowTotalEntities(e, i) ? o : s).length) return v``;
    const c = this.getCustomColor(e, i), r = this.getCustomizationForType(
      P(e, i)
    ), l = this._handleDomainAction(e, i), d = Ce({
      hasHold: de(
        (r == null ? void 0 : r.hold_action) ?? this._config.hold_action
      ),
      hasDoubleClick: de(
        (r == null ? void 0 : r.double_tap_action) ?? this._config.double_tap_action
      )
    }), h = {
      horizontal: this._config.content_layout === "horizontal"
    }, p = this._getIconStyles("deviceClass", {
      color: c,
      background_color: this.getBackgroundColor(e, i),
      square: this._config.square
    });
    return v`
      <sl-tab
        slot="nav"
        panel=${i}
        @action=${l}
        .actionHandler=${d}
      >
        <div class="entity ${le(h)}">
          <div class="entity-icon" style=${W(p)}>
            <ha-icon icon=${this.getCustomIcon(e, i)}></ha-icon>
          </div>
          <div class="entity-info">
            ${this.hide_content_name ? "" : v`<div class="entity-name">
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
  render() {
    const t = this.getExtraItems(), e = this.getGroupItems(), i = this.getDomainItems(), s = this.getDeviceClassItems(), o = this._computeSortedEntities(
      t,
      e,
      i,
      s
    ), n = {
      "no-scroll": !!this._config.no_scroll
    };
    return v`
      <ha-card>
        <sl-tab-group no-scroll-controls class=${le(n)}>
          ${this.renderPersonEntities()}
          ${Dt(
      o,
      (a) => a.type === "extra" ? a.panel : a.type === "domain" ? a.domain : a.type === "deviceClass" ? `${a.domain}-${a.deviceClass}` : a.type === "group" ? `group-${a.group_id}` : "",
      (a) => this.renderTab(a)
    )}
        </sl-tab-group>
      </ha-card>
    `;
  }
  static get styles() {
    return fe`
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
O([
  A({ attribute: !1 })
], T.prototype, "hass", 2);
O([
  A({ type: Object })
], T.prototype, "_config", 2);
O([
  S()
], T.prototype, "areas", 2);
O([
  S()
], T.prototype, "devices", 2);
O([
  S()
], T.prototype, "entities", 2);
O([
  S()
], T.prototype, "entitiesByDomain", 2);
O([
  S()
], T.prototype, "selectedDomain", 2);
O([
  S()
], T.prototype, "selectedDeviceClass", 2);
O([
  S()
], T.prototype, "hiddenEntities", 2);
O([
  S()
], T.prototype, "hiddenLabels", 2);
O([
  S()
], T.prototype, "hiddenAreas", 2);
O([
  S()
], T.prototype, "hide_person", 2);
O([
  S()
], T.prototype, "hide_content_name", 2);
O([
  S()
], T.prototype, "list_mode", 2);
O([
  S()
], T.prototype, "selectedGroup", 2);
T = O([
  Me("status-card")
], T);
var Ui = Object.defineProperty, Ri = Object.getOwnPropertyDescriptor, Be = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Ri(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Ui(e, i, o), o;
};
class Qe extends U {
  constructor() {
    super(...arguments), this.SelectOptions = [], this._entityKeys = /* @__PURE__ */ new WeakMap();
  }
  _getKey(e) {
    return this._entityKeys.has(e) || this._entityKeys.set(e, Math.random().toString()), this._entityKeys.get(e);
  }
  render() {
    return this.hass ? v`
      <div class="customization">
        ${this.customizationkey && Dt(
      this.customizationkey,
      (e) => this._getKey(e),
      (e, i) => v`
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
        (s) => v`<mwc-list-item .value=${s.value}
                      >${s.label}</mwc-list-item
                    >`
      )}
              </ha-select>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.remove")}
                .path=${Ye}
                class="remove-icon"
                .index=${i}
                @click=${this._removeRow}
              ></ha-icon-button>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.edit")}
                .path=${Si}
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
      (e) => v`<mwc-list-item .value=${e.value}
                  >${e.label}</mwc-list-item
                >`
    )}
          </ha-select>
        </div>
      </div>
    ` : k;
  }
  _valueChanged(e) {
    if (!this.customizationkey || !this.hass)
      return;
    const i = e.detail.value, s = e.target.index, o = this.customizationkey.concat();
    o[s] = { ...o[s], type: i || "" }, M(this, this.customizationChangedEvent, o);
  }
  _removeRow(e) {
    e.stopPropagation();
    const i = e.currentTarget.index;
    if (i != null) {
      const s = this.customizationkey.concat();
      s.splice(i, 1), M(
        this,
        this.customizationChangedEvent,
        s
      );
    }
  }
  _editRow(e) {
    e.stopPropagation();
    const i = e.target.index;
    i != null && M(this, "edit-item", i);
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
    M(this, this.customizationChangedEvent, [
      ...this.customizationkey,
      o
    ]), i.value = "";
  }
  static get styles() {
    return fe`
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
Be([
  A({ attribute: !1 })
], Qe.prototype, "hass", 2);
Be([
  A({ type: Array })
], Qe.prototype, "SelectOptions", 2);
let Ge = class extends Qe {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customizationkey() {
    return this.customization;
  }
};
Be([
  A({ attribute: !1 })
], Ge.prototype, "customization", 2);
Ge = Be([
  Me("status-items-editor")
], Ge);
var Vi = Object.defineProperty, qi = Object.getOwnPropertyDescriptor, Q = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? qi(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Vi(e, i, o), o;
};
let q = class extends U {
  constructor() {
    super(...arguments), this.useSensorSchema = !1, this._schemadomain = z(() => {
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
    }), this._schemaEntity = z(() => {
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
      return v``;
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
    return v`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${t}
        .computeLabel=${(s) => Ie(this.hass, s)}
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
    return fe`
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
Q([
  A({ attribute: !1 })
], q.prototype, "config", 2);
Q([
  A({ attribute: !1 })
], q.prototype, "hass", 2);
Q([
  A({ attribute: !1 })
], q.prototype, "lovelace", 2);
Q([
  A({ type: Boolean })
], q.prototype, "useSensorSchema", 2);
Q([
  A({ type: Number })
], q.prototype, "index", 2);
Q([
  S()
], q.prototype, "getSchema", 2);
Q([
  S()
], q.prototype, "_config", 2);
q = Q([
  Me("status-item-editor")
], q);
var Gi = Object.defineProperty, Wi = Object.getOwnPropertyDescriptor, re = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Wi(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Gi(e, i, o), o;
};
let Y = class extends U {
  constructor() {
    super(...arguments), this._subElementEditorDomain = void 0, this._subElementEditorEntity = void 0, this.rulesets = [
      {
        group_id: "",
        group_icon: "",
        group_status: "",
        rules: [{ key: "", value: "" }]
      }
    ], this.computeLabel = z(
      (t, e, i) => Ie(this.hass, t, e, i)
    ), this._filterInitialized = !1, this._lastFilter = {
      area: [],
      floor: [],
      label: []
    }, this._schema = z(
      (t, e, i, s) => {
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
              ...t === "area" && i === !1 ? [
                { name: "multiple_areas", selector: { boolean: {} } },
                { name: "area", selector: { area: {} } }
              ] : [],
              ...t === "area" && i === !0 ? [
                { name: "multiple_areas", selector: { boolean: {} } },
                { name: "area", selector: { area: { multiple: !0 } } }
              ] : [],
              ...t === "floor" && s === !1 ? [
                { name: "multiple_floors", selector: { boolean: {} } },
                { name: "floor", selector: { floor: {} } }
              ] : [],
              ...t === "floor" && s === !0 ? [
                { name: "multiple_floors", selector: { boolean: {} } },
                { name: "floor", selector: { floor: { multiple: !0 } } }
              ] : [],
              ...e ? [
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
    ), this._toggleschema = z((t) => [
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
    ]), this._entitiesSchema = z((t) => {
      const e = this.computeLabel({ name: "area" }), i = this.computeLabel({ name: "label" }), s = this.computeLabel({ name: "entity" });
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
                    { value: "area", label: e }
                  ]
                }
              }
            }
          ]
        },
        ...t === "label" ? [
          {
            name: "hidden_labels",
            selector: { label: { multiple: !0 } }
          }
        ] : [],
        ...t === "area" ? [
          {
            name: "hidden_areas",
            selector: { area: { multiple: !0 } }
          }
        ] : []
      ];
    }), this._buildToggleOptions = z(
      (t, e) => this._buildOptions("toggle", t, e)
    ), this._memoizedClassesForArea = z(
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
    }, this._toggleEntityHidden = (t) => {
      var s;
      const e = new Set(((s = this._config) == null ? void 0 : s.hidden_entities) ?? []);
      e.has(t) ? e.delete(t) : e.add(t);
      const i = Array.from(e);
      this._config = {
        ...this._config || {},
        hidden_entities: i
      }, M(this, "config-changed", { config: { ...this._config } });
    };
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
    this._config.filter === "area" && this._config.floor !== void 0 ? (delete this._config.floor, M(this, "config-changed", { config: { ...this._config } })) : this._config.filter === "floor" && this._config.area !== void 0 && (delete this._config.area, M(this, "config-changed", { config: { ...this._config } }));
  }
  async updated(t) {
    super.updated(t);
    let e = !1;
    if (!(!this.hass || !this._config) && t.has("_config")) {
      if (this._updateAreaFloorInConfig(), (this._config.label_filter === !1 && this._config.label !== void 0 || Array.isArray(this._config.label) && this._config.label.length === 0) && (delete this._config.label, e = !0), this._config.hide_filter && !["entity", "label", "area"].includes(this._config.hide_filter)) {
        const _ = (/* @__PURE__ */ new Map([
          [this.computeLabel({ name: "entity" }), "entity"],
          [this.computeLabel({ name: "label" }), "label"],
          [this.computeLabel({ name: "area" }), "area"]
        ])).get(this._config.hide_filter);
        _ && (this._config = { ...this._config, hide_filter: _ }, e = !0);
      }
      const i = t.get("_config"), s = (i == null ? void 0 : i.extra_entities) ?? [], o = this._config.extra_entities ?? [], n = (i == null ? void 0 : i.content) ?? [], a = this._config.content ?? [], c = Array.isArray(this._config.area) ? [...this._config.area] : this._config.area ? [this._config.area] : [], r = Array.isArray(this._config.floor) ? [...this._config.floor] : this._config.floor ? [this._config.floor] : [], l = Array.isArray(this._config.label) ? [...this._config.label] : [];
      this._filterInitialized || (this._lastFilter = {
        area: c,
        floor: r,
        label: l
      }, this._filterInitialized = !0);
      const d = this._lastFilter.area, h = this._lastFilter.floor, p = this._lastFilter.label, f = !K(p, l), u = !K(h, r);
      if (!K(d, c) || u || f) {
        const _ = this.possibleToggleDomains.sort(
          (E, b) => he.indexOf(E) - he.indexOf(b)
        );
        this._config = {
          ...this._config,
          content: [..._]
        }, this._lastFilter = {
          area: [...c],
          floor: [...r],
          label: [...l]
        }, e = !0;
      }
      if (this._config.rulesets && Array.isArray(this._config.rulesets)) {
        const m = this._config.rulesets.filter(
          (y) => Object.keys(y).some(
            ($) => $ !== "group_id" && $ !== "group_icon" && $ !== "group_status" && y[$] !== void 0 && y[$] !== ""
          )
        ).map((y) => y.group_id).filter((y) => y && y.length > 1);
        let _ = Array.isArray(this._config.content) ? [...this._config.content] : [];
        _ = _.filter((y) => !m.includes(y));
        const E = this._config.extra_entities ?? [];
        let b = 0;
        for (let y = 0; y < _.length; y++) {
          if (!E.includes(_[y])) {
            b = y;
            break;
          }
          b = y + 1;
        }
        _ = [
          ..._.slice(0, b),
          ...m.filter((y) => !_.includes(y)),
          ..._.slice(b)
        ], K(_, this._config.content ?? []) || (this._config = {
          ...this._config,
          content: _
        }, e = !0);
      }
      if (!K(s, o)) {
        let m = [...a];
        o.forEach((_) => {
          m.includes(_) || m.unshift(_);
        }), m = m.filter(
          (_) => !_.includes(".") || o.includes(_)
        ), K(m, a) || (this._config = {
          ...this._config,
          content: m
        }, e = !0);
      }
      if (!K(n, a)) {
        let m = [...o];
        m = m.filter((_) => a.includes(_)), K(m, o) || (this._config = {
          ...this._config,
          extra_entities: m
        }, e = !0);
      }
      e && (M(this, "config-changed", { config: { ...this._config } }), this.requestUpdate());
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
  get possibleToggleDomains() {
    var t, e, i;
    return this._memoizedClassesForArea(
      ((t = this._config) == null ? void 0 : t.area) || [],
      ((e = this._config) == null ? void 0 : e.floor) || [],
      ((i = this._config) == null ? void 0 : i.label) || []
    );
  }
  get toggleSelectOptions() {
    var t;
    return this._buildToggleOptions(
      this.possibleToggleDomains,
      ((t = this._config) == null ? void 0 : t.content) || []
    );
  }
  get contentSelectOptions() {
    const t = this._config.content ?? [];
    return this._buildOptions("toggle", t, t);
  }
  _parseTypePair(t) {
    const e = t.match(/^(.+?)\s*-\s*(.+)$/);
    if (!e) return null;
    const i = e[1].toLowerCase().replace(/\s+/g, "_"), s = e[2].toLowerCase();
    return { domain: i, deviceClass: s };
  }
  _labelForTypePair(t) {
    var i, s, o;
    if (t.includes(".")) {
      const n = (s = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : s[t];
      return ((o = n == null ? void 0 : n.attributes) == null ? void 0 : o.friendly_name) || t;
    }
    const e = this._parseTypePair(t);
    if (e) {
      const { domain: n, deviceClass: a } = e;
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
    return t === "scene" ? "Scene" : this.hass.localize(`component.${t}.entity_component._.name`) || t;
  }
  _classesForArea(t, e, i) {
    var r;
    const s = ((r = this._config) == null ? void 0 : r.extra_entities) || [];
    let o = Object.values(this.hass.entities).filter(
      (l) => !l.hidden && me.includes(B(l.entity_id))
    );
    if (t && t.length > 0)
      o = o.filter(
        (l) => {
          var d;
          return t.includes(l.area_id) || l.device_id && t.includes((d = this.hass.devices[l.device_id]) == null ? void 0 : d.area_id);
        }
      );
    else if (e && e.length > 0) {
      const l = Object.values(this.hass.areas).filter(
        (d) => d.floor_id !== void 0 && e.includes(d.floor_id)
      ).map((d) => d.area_id);
      o = o.filter(
        (d) => {
          var h;
          return d.area_id !== void 0 && l.includes(d.area_id) || d.device_id && ((h = this.hass.devices[d.device_id]) == null ? void 0 : h.area_id) !== void 0 && l.includes(
            this.hass.devices[d.device_id].area_id
          );
        }
      );
    }
    i && i.length > 0 && (o = o.filter(
      (l) => {
        var d, h;
        return ((d = l.labels) == null ? void 0 : d.some((p) => i.includes(p))) || l.device_id && Array.isArray((h = this.hass.devices[l.device_id]) == null ? void 0 : h.labels) && this.hass.devices[l.device_id].labels.some(
          (p) => i.includes(p)
        );
      }
    ));
    const n = new Set(
      o.map((l) => B(l.entity_id)).filter((l) => l !== "binary_sensor" && l !== "cover" && l !== "switch")
    ), a = /* @__PURE__ */ new Set();
    o.filter(
      (l) => ["binary_sensor", "cover", "switch"].includes(
        B(l.entity_id)
      )
    ).forEach((l) => {
      var p;
      const d = B(l.entity_id), h = ((p = this.hass.states[l.entity_id]) == null ? void 0 : p.attributes.device_class) || "";
      h && a.add(`${Ht(d)} - ${h}`);
    });
    const c = [...a];
    return [...n, ...c, ...s].sort(
      (l, d) => {
        const h = he.findIndex((f) => l.startsWith(f)), p = he.findIndex((f) => d.startsWith(f));
        return (h === -1 ? he.length : h) - (p === -1 ? he.length : p);
      }
    );
  }
  _buildOptions(t, e, i) {
    var c;
    const s = [.../* @__PURE__ */ new Set([...e, ...i])], o = ((c = this.hass) == null ? void 0 : c.states) || {}, n = /* @__PURE__ */ new Map(), a = s.map((r) => {
      var d, h;
      if (n.has(r))
        return { value: r, label: n.get(r) };
      let l;
      return r.includes(".") ? l = ((h = (d = o[r]) == null ? void 0 : d.attributes) == null ? void 0 : h.friendly_name) || r : r === "scene" ? l = "Scene" : l = this._labelForTypePair(r), n.set(r, l), { value: r, label: l };
    });
    return a.sort((r, l) => {
      const d = r.value.includes("."), h = l.value.includes(".");
      return d && !h ? -1 : !d && h ? 1 : Lt(
        r.label,
        l.label,
        this.hass.locale.language
      );
    }), a;
  }
  _itemChanged(t, e, i) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const s = e == null ? void 0 : e.index;
    if (s != null) {
      const o = [...this._config.customization ?? []];
      o[s] = t.detail, M(this, "config-changed", {
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
    var c, r, l, d, h;
    const s = `_subElementEditor${t.charAt(0).toUpperCase() + t.slice(1)}`, o = this[s], n = ((l = (r = (c = this._config) == null ? void 0 : c.customization) == null ? void 0 : r[(o == null ? void 0 : o.index) ?? 0]) == null ? void 0 : l.type) ?? "unknown", a = this._labelForTypePair(n);
    return v`
      <div class="header">
        <div class="back-title">
          <ha-icon-button
            slot="trigger"
            .label=${this.hass.localize("ui.common.back")}
            .path=${Ai}
            @click=${e}
          ></ha-icon-button>
          <span slot="title">${a}</span>
        </div>
      </div>
      <status-item-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .config=${((h = (d = this._config) == null ? void 0 : d.customization) == null ? void 0 : h[(o == null ? void 0 : o.index) ?? 0]) ?? {}}
        .getSchema=${t}
        .index=${(o == null ? void 0 : o.index) ?? 0}
        @config-changed=${i}
      >
      </status-item-editor>
    `;
  }
  _customizationChanged(t, e) {
    t.stopPropagation(), !(!this._config || !this.hass) && M(this, "config-changed", {
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
    }, M(this, "config-changed", { config: this._config });
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
  _groupAllEntitiesByDomain() {
    var d, h, p, f, u, g, m, _, E, b, y, $, ee;
    const t = Object.values(((d = this.hass) == null ? void 0 : d.entities) || {}), e = Object.values(((h = this.hass) == null ? void 0 : h.devices) || {}), i = (p = this.hass) != null && p.areas ? Object.values(this.hass.areas) : [], s = {
      area: Array.isArray((f = this._config) == null ? void 0 : f.area) ? this._config.area : (u = this._config) != null && u.area ? [this._config.area] : [],
      floor: Array.isArray((g = this._config) == null ? void 0 : g.floor) ? this._config.floor : (m = this._config) != null && m.floor ? [this._config.floor] : [],
      label: Array.isArray((_ = this._config) == null ? void 0 : _.label) ? this._config.label : [],
      hiddenAreas: ((E = this._config) == null ? void 0 : E.hidden_areas) ?? [],
      hiddenLabels: ((b = this._config) == null ? void 0 : b.hidden_labels) ?? [],
      hiddenEntities: ((y = this._config) == null ? void 0 : y.hidden_entities) ?? []
    }, o = Mt(
      t,
      e,
      i,
      (($ = this.hass) == null ? void 0 : $.states) || {},
      s,
      me
    ), n = Object.fromEntries(
      Object.entries(o).map(([x, D]) => [
        x,
        D.map((L) => L.entity_id)
      ])
    ), a = this._hiddenEntitiesByDomain(), c = ((ee = this.hass) == null ? void 0 : ee.states) || {}, r = Array.from(
      /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(a)])
    ).filter((x) => me.includes(x)), l = Te(
      c,
      this.hass.locale.language
    );
    return r.sort((x, D) => x.localeCompare(D)).map((x) => {
      const D = /* @__PURE__ */ new Set([
        ...n[x] || [],
        ...a[x] || []
      ]);
      return { domain: x, entities: Array.from(D).sort(l) };
    });
  }
  _domainLabel(t) {
    var e, i;
    return ((i = (e = this.hass) == null ? void 0 : e.localize) == null ? void 0 : i.call(e, `component.${t}.entity_component._.name`)) || t;
  }
  _isHiddenEntity(t) {
    var i;
    const e = ((i = this._config) == null ? void 0 : i.hidden_entities) ?? [];
    return Array.isArray(e) && e.includes(t);
  }
  _getDeviceClassLabel(t, e) {
    if (!e || e === "other")
      return this.hass.localize("ui.dialogs.helper_settings.generic.other") ?? "Other";
    const i = `ui.dialogs.entity_registry.editor.device_classes.${t}.${e}`;
    return this.hass.localize(i) || e;
  }
  _groupByDeviceClass(t, e) {
    var a, c, r;
    const i = ((a = this.hass) == null ? void 0 : a.states) || {}, s = {};
    for (const l of e) {
      const d = ((r = (c = i[l]) == null ? void 0 : c.attributes) == null ? void 0 : r.device_class) || "";
      d && (s[d] || (s[d] = []), s[d].push(l));
    }
    const o = Te(
      i,
      this.hass.locale.language
    );
    return Object.keys(s).sort((l, d) => l.localeCompare(d)).map((l) => ({
      deviceClass: l,
      label: this._getDeviceClassLabel(t, l),
      entities: s[l].slice().sort(o)
    }));
  }
  _hiddenEntitiesByDomain() {
    var h, p, f, u, g, m, _;
    const t = {}, e = Array.isArray((h = this._config) == null ? void 0 : h.hidden_entities) ? this._config.hidden_entities : [];
    if (e.length === 0) return t;
    const i = ((p = this.hass) == null ? void 0 : p.entities) || {}, s = ((f = this.hass) == null ? void 0 : f.devices) || {}, o = (u = this.hass) != null && u.areas ? Object.values(this.hass.areas) : [], n = (g = this._config) == null ? void 0 : g.area, a = (m = this._config) == null ? void 0 : m.floor, c = (_ = this._config) == null ? void 0 : _.label, r = n ? Array.isArray(n) ? n : [n] : [], l = a ? Array.isArray(a) ? a : [a] : [], d = c ? Array.isArray(c) ? c : [c] : [];
    for (const E of e) {
      const b = B(E);
      if (!me.includes(b)) continue;
      const y = i[E], $ = y != null && y.device_id ? s[y.device_id] : void 0;
      if (((y == null ? void 0 : y.area_id) != null || ($ == null ? void 0 : $.area_id) != null) && !(d.length && !(Array.isArray(y == null ? void 0 : y.labels) && y.labels.some((D) => d.includes(D)) || Array.isArray($ == null ? void 0 : $.labels) && $.labels.some((D) => d.includes(D)))) && !(r.length && !(y != null && y.area_id && r.includes(y.area_id) || $ != null && $.area_id && r.includes($.area_id)))) {
        if (l.length) {
          const x = (y == null ? void 0 : y.area_id) && o.some(
            (L) => L.area_id === y.area_id && L.floor_id && l.includes(L.floor_id)
          ), D = ($ == null ? void 0 : $.area_id) && o.some(
            (L) => L.area_id === $.area_id && L.floor_id && l.includes(L.floor_id)
          );
          if (!x && !D) continue;
        }
        t[b] || (t[b] = []), t[b].push(E);
      }
    }
    return t;
  }
  render() {
    var o, n;
    if (!this.hass || !this._config)
      return v`<div>Loading...</div>`;
    const t = this._toggleschema(this.toggleSelectOptions), e = this._schema(
      this._config.filter ?? "",
      this._config.label_filter ?? !1,
      this._config.multiple_areas ?? !1,
      this._config.multiple_floors ?? !1
    ), s = {
      content: this.possibleToggleDomains,
      ...this._config
    };
    return this._subElementEditorDomain ? this._renderSubElementEditorDomain() : this._subElementEditorEntity ? this._renderSubElementEditorEntity() : v`
      <ha-form
        .hass=${this.hass}
        .data=${s}
        .schema=${e}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon class="secondary" .path=${$t}></ha-svg-icon>
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

          ${(((n = this._config) == null ? void 0 : n.hide_filter) ?? "") === "entity" ? v`
                ${this._groupAllEntitiesByDomain().map(
      (a) => v`
                    <ha-expansion-panel outlined class="domain-panel">
                      <div slot="header" class="domain-header">
                        <ha-icon
                          icon=${qe(a.domain, "on")}
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
        (c) => v`
                                <ha-expansion-panel
                                  outlined
                                  class="domain-panel"
                                >
                                  <div slot="header" class="dc-header">
                                    <ha-icon
                                      icon=${qe(
          a.domain,
          "on",
          c.deviceClass
        )}
                                    ></ha-icon>
                                    <span class="dc-title">${c.label}</span>
                                  </div>
                                  <div class="content">
                                    ${c.entities.map(
          (r) => {
            var l, d;
            return v`
                                        <div class="entity-row">
                                          <span class="entity-name">
                                            ${((d = (l = this.hass.states[r]) == null ? void 0 : l.attributes) == null ? void 0 : d.friendly_name) || r}
                                          </span>
                                          <ha-icon-button
                                            .path=${this._isHiddenEntity(r) ? vt : bt}
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
          return v`
                                <div class="entity-row">
                                  <span class="entity-name">
                                    ${((l = (r = this.hass.states[c]) == null ? void 0 : r.attributes) == null ? void 0 : l.friendly_name) || c}
                                  </span>
                                  <ha-icon-button
                                    .path=${this._isHiddenEntity(c) ? vt : bt}
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
              ` : v``}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon
            class="secondary"
            .path=${Ci}
          ></ha-svg-icon>
          Smart Groups
        </div>
        <div class="content">
          ${this.rulesets.map(
      (a, c) => v`
              <ha-expansion-panel class="group-panel main" outlined>
                <div slot="header" class="group-header">
                  ${a.group_id ? a.group_id : `${this.hass.localize(
        "component.group.entity_component._.name"
      )} ${c + 1}`}
                  <span class="group-actions">
                    <ha-icon-button
                      slot="trigger"
                      .label=${this.hass.localize("ui.common.remove")}
                      .path=${Ye}
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
          <ha-svg-icon class="secondary" .path=${$t}></ha-svg-icon>
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
    return fe`
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
        margin: 12px 0;
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
re([
  A({ attribute: !1 })
], Y.prototype, "hass", 2);
re([
  A({ attribute: !1 })
], Y.prototype, "lovelace", 2);
re([
  A({ type: Object })
], Y.prototype, "_config", 2);
re([
  S()
], Y.prototype, "_subElementEditorDomain", 2);
re([
  S()
], Y.prototype, "_subElementEditorEntity", 2);
re([
  S()
], Y.prototype, "rulesets", 2);
Y = re([
  Me("status-card-editor")
], Y);
console.info(
  `%c STATUS-CARD %c ${Bt.version} `,
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
