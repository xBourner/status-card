const Ka = "v3.3.3", Ua = {
  version: Ka
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ee = globalThis, ht = Ee.ShadowRoot && (Ee.ShadyCSS === void 0 || Ee.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, pt = Symbol(), yt = /* @__PURE__ */ new WeakMap();
let wa = class {
  constructor(e, a, r) {
    if (this._$cssResult$ = !0, r !== pt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = a;
  }
  get styleSheet() {
    let e = this.o;
    const a = this.t;
    if (ht && e === void 0) {
      const r = a !== void 0 && a.length === 1;
      r && (e = yt.get(a)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && yt.set(a, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Wa = (t) => new wa(typeof t == "string" ? t : t + "", void 0, pt), Ae = (t, ...e) => {
  const a = t.length === 1 ? t[0] : e.reduce(((r, i, s) => r + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[s + 1]), t[0]);
  return new wa(a, t, pt);
}, qa = (t, e) => {
  if (ht) t.adoptedStyleSheets = e.map(((a) => a instanceof CSSStyleSheet ? a : a.styleSheet));
  else for (const a of e) {
    const r = document.createElement("style"), i = Ee.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = a.cssText, t.appendChild(r);
  }
}, Ct = ht ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let a = "";
  for (const r of e.cssRules) a += r.cssText;
  return Wa(a);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ja, defineProperty: Ya, getOwnPropertyDescriptor: Qa, getOwnPropertyNames: Xa, getOwnPropertySymbols: er, getPrototypeOf: tr } = Object, re = globalThis, At = re.trustedTypes, ar = At ? At.emptyScript : "", Fe = re.reactiveElementPolyfillSupport, ve = (t, e) => t, Pe = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ar : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let a = t;
  switch (e) {
    case Boolean:
      a = t !== null;
      break;
    case Number:
      a = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        a = JSON.parse(t);
      } catch {
        a = null;
      }
  }
  return a;
} }, mt = (t, e) => !Ja(t, e), Lt = { attribute: !0, type: String, converter: Pe, reflect: !1, useDefault: !1, hasChanged: mt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), re.litPropertyMetadata ?? (re.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let he = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, a = Lt) {
    if (a.state && (a.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((a = Object.create(a)).wrapped = !0), this.elementProperties.set(e, a), !a.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, a);
      i !== void 0 && Ya(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, a, r) {
    const { get: i, set: s } = Qa(this.prototype, e) ?? { get() {
      return this[a];
    }, set(n) {
      this[a] = n;
    } };
    return { get: i, set(n) {
      const o = i == null ? void 0 : i.call(this);
      s == null || s.call(this, n), this.requestUpdate(e, o, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Lt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ve("elementProperties"))) return;
    const e = tr(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ve("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ve("properties"))) {
      const a = this.properties, r = [...Xa(a), ...er(a)];
      for (const i of r) this.createProperty(i, a[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const a = litPropertyMetadata.get(e);
      if (a !== void 0) for (const [r, i] of a) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [a, r] of this.elementProperties) {
      const i = this._$Eu(a, r);
      i !== void 0 && this._$Eh.set(i, a);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const a = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) a.unshift(Ct(i));
    } else e !== void 0 && a.push(Ct(e));
    return a;
  }
  static _$Eu(e, a) {
    const r = a.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise(((a) => this.enableUpdating = a)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach(((a) => a(this)));
  }
  addController(e) {
    var a;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((a = e.hostConnected) == null || a.call(e));
  }
  removeController(e) {
    var a;
    (a = this._$EO) == null || a.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), a = this.constructor.elementProperties;
    for (const r of a.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return qa(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach(((a) => {
      var r;
      return (r = a.hostConnected) == null ? void 0 : r.call(a);
    }));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach(((a) => {
      var r;
      return (r = a.hostDisconnected) == null ? void 0 : r.call(a);
    }));
  }
  attributeChangedCallback(e, a, r) {
    this._$AK(e, r);
  }
  _$ET(e, a) {
    var s;
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const n = (((s = r.converter) == null ? void 0 : s.toAttribute) !== void 0 ? r.converter : Pe).toAttribute(a, r.type);
      this._$Em = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(e, a) {
    var s, n;
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const o = r.getPropertyOptions(i), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((s = o.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? o.converter : Pe;
      this._$Em = i;
      const c = l.fromAttribute(a, o.type);
      this[i] = c ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, a, r) {
    var i;
    if (e !== void 0) {
      const s = this.constructor, n = this[e];
      if (r ?? (r = s.getPropertyOptions(e)), !((r.hasChanged ?? mt)(n, a) || r.useDefault && r.reflect && n === ((i = this._$Ej) == null ? void 0 : i.get(e)) && !this.hasAttribute(s._$Eu(e, r)))) return;
      this.C(e, a, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, a, { useDefault: r, reflect: i, wrapped: s }, n) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? a ?? this[e]), s !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (a = void 0), this._$AL.set(e, a)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (a) {
      Promise.reject(a);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [s, n] of this._$Ep) this[s] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, n] of i) {
        const { wrapped: o } = n, l = this[s];
        o !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, n, l);
      }
    }
    let e = !1;
    const a = this._$AL;
    try {
      e = this.shouldUpdate(a), e ? (this.willUpdate(a), (r = this._$EO) == null || r.forEach(((i) => {
        var s;
        return (s = i.hostUpdate) == null ? void 0 : s.call(i);
      })), this.update(a)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(a);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var a;
    (a = this._$EO) == null || a.forEach(((r) => {
      var i;
      return (i = r.hostUpdated) == null ? void 0 : i.call(r);
    })), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach(((a) => this._$ET(a, this[a])))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
he.elementStyles = [], he.shadowRootOptions = { mode: "open" }, he[ve("elementProperties")] = /* @__PURE__ */ new Map(), he[ve("finalized")] = /* @__PURE__ */ new Map(), Fe == null || Fe({ ReactiveElement: he }), (re.reactiveElementVersions ?? (re.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ke = globalThis, xe = ke.trustedTypes, Ht = xe ? xe.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, $a = "$lit$", ee = `lit$${Math.random().toFixed(9).slice(2)}$`, Sa = "?" + ee, rr = `<${Sa}>`, ce = document, be = () => ce.createComment(""), ye = (t) => t === null || typeof t != "object" && typeof t != "function", ft = Array.isArray, ir = (t) => ft(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Ne = `[ 	
\f\r]`, ge = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Vt = /-->/g, zt = />/g, se = RegExp(`>|${Ne}(?:([^\\s"'>=/]+)(${Ne}*=${Ne}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Mt = /'/g, wt = /"/g, Ea = /^(?:script|style|textarea|title)$/i, sr = (t) => (e, ...a) => ({ _$litType$: t, strings: e, values: a }), f = sr(1), F = Symbol.for("lit-noChange"), P = Symbol.for("lit-nothing"), $t = /* @__PURE__ */ new WeakMap(), oe = ce.createTreeWalker(ce, 129);
function ja(t, e) {
  if (!ft(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ht !== void 0 ? Ht.createHTML(e) : e;
}
const nr = (t, e) => {
  const a = t.length - 1, r = [];
  let i, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = ge;
  for (let o = 0; o < a; o++) {
    const l = t[o];
    let c, u, d = -1, p = 0;
    for (; p < l.length && (n.lastIndex = p, u = n.exec(l), u !== null); ) p = n.lastIndex, n === ge ? u[1] === "!--" ? n = Vt : u[1] !== void 0 ? n = zt : u[2] !== void 0 ? (Ea.test(u[2]) && (i = RegExp("</" + u[2], "g")), n = se) : u[3] !== void 0 && (n = se) : n === se ? u[0] === ">" ? (n = i ?? ge, d = -1) : u[1] === void 0 ? d = -2 : (d = n.lastIndex - u[2].length, c = u[1], n = u[3] === void 0 ? se : u[3] === '"' ? wt : Mt) : n === wt || n === Mt ? n = se : n === Vt || n === zt ? n = ge : (n = se, i = void 0);
    const h = n === se && t[o + 1].startsWith("/>") ? " " : "";
    s += n === ge ? l + rr : d >= 0 ? (r.push(c), l.slice(0, d) + $a + l.slice(d) + ee + h) : l + ee + (d === -2 ? o : h);
  }
  return [ja(t, s + (t[a] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class Ce {
  constructor({ strings: e, _$litType$: a }, r) {
    let i;
    this.parts = [];
    let s = 0, n = 0;
    const o = e.length - 1, l = this.parts, [c, u] = nr(e, a);
    if (this.el = Ce.createElement(c, r), oe.currentNode = this.el.content, a === 2 || a === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = oe.nextNode()) !== null && l.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith($a)) {
          const p = u[n++], h = i.getAttribute(d).split(ee), g = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: s, name: g[2], strings: h, ctor: g[1] === "." ? lr : g[1] === "?" ? cr : g[1] === "@" ? ur : De }), i.removeAttribute(d);
        } else d.startsWith(ee) && (l.push({ type: 6, index: s }), i.removeAttribute(d));
        if (Ea.test(i.tagName)) {
          const d = i.textContent.split(ee), p = d.length - 1;
          if (p > 0) {
            i.textContent = xe ? xe.emptyScript : "";
            for (let h = 0; h < p; h++) i.append(d[h], be()), oe.nextNode(), l.push({ type: 2, index: ++s });
            i.append(d[p], be());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Sa) l.push({ type: 2, index: s });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(ee, d + 1)) !== -1; ) l.push({ type: 7, index: s }), d += ee.length - 1;
      }
      s++;
    }
  }
  static createElement(e, a) {
    const r = ce.createElement("template");
    return r.innerHTML = e, r;
  }
}
function pe(t, e, a = t, r) {
  var n, o;
  if (e === F) return e;
  let i = r !== void 0 ? (n = a._$Co) == null ? void 0 : n[r] : a._$Cl;
  const s = ye(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== s && ((o = i == null ? void 0 : i._$AO) == null || o.call(i, !1), s === void 0 ? i = void 0 : (i = new s(t), i._$AT(t, a, r)), r !== void 0 ? (a._$Co ?? (a._$Co = []))[r] = i : a._$Cl = i), i !== void 0 && (e = pe(t, i._$AS(t, e.values), i, r)), e;
}
let or = class {
  constructor(e, a) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = a;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: a }, parts: r } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? ce).importNode(a, !0);
    oe.currentNode = i;
    let s = oe.nextNode(), n = 0, o = 0, l = r[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let c;
        l.type === 2 ? c = new me(s, s.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (c = new dr(s, this, e)), this._$AV.push(c), l = r[++o];
      }
      n !== (l == null ? void 0 : l.index) && (s = oe.nextNode(), n++);
    }
    return oe.currentNode = ce, i;
  }
  p(e) {
    let a = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, a), a += r.strings.length - 2) : r._$AI(e[a])), a++;
  }
};
class me {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, a, r, i) {
    this.type = 2, this._$AH = P, this._$AN = void 0, this._$AA = e, this._$AB = a, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const a = this._$AM;
    return a !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = a.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, a = this) {
    e = pe(this, e, a), ye(e) ? e === P || e == null || e === "" ? (this._$AH !== P && this._$AR(), this._$AH = P) : e !== this._$AH && e !== F && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ir(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== P && ye(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ce.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: a, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = Ce.createElement(ja(r.h, r.h[0]), this.options)), r);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === i) this._$AH.p(a);
    else {
      const n = new or(i, this), o = n.u(this.options);
      n.p(a), this.T(o), this._$AH = n;
    }
  }
  _$AC(e) {
    let a = $t.get(e.strings);
    return a === void 0 && $t.set(e.strings, a = new Ce(e)), a;
  }
  k(e) {
    ft(this._$AH) || (this._$AH = [], this._$AR());
    const a = this._$AH;
    let r, i = 0;
    for (const s of e) i === a.length ? a.push(r = new me(this.O(be()), this.O(be()), this, this.options)) : r = a[i], r._$AI(s), i++;
    i < a.length && (this._$AR(r && r._$AB.nextSibling, i), a.length = i);
  }
  _$AR(e = this._$AA.nextSibling, a) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, a); e !== this._$AB; ) {
      const i = e.nextSibling;
      e.remove(), e = i;
    }
  }
  setConnected(e) {
    var a;
    this._$AM === void 0 && (this._$Cv = e, (a = this._$AP) == null || a.call(this, e));
  }
}
class De {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, a, r, i, s) {
    this.type = 1, this._$AH = P, this._$AN = void 0, this.element = e, this.name = a, this._$AM = i, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = P;
  }
  _$AI(e, a = this, r, i) {
    const s = this.strings;
    let n = !1;
    if (s === void 0) e = pe(this, e, a, 0), n = !ye(e) || e !== this._$AH && e !== F, n && (this._$AH = e);
    else {
      const o = e;
      let l, c;
      for (e = s[0], l = 0; l < s.length - 1; l++) c = pe(this, o[r + l], a, l), c === F && (c = this._$AH[l]), n || (n = !ye(c) || c !== this._$AH[l]), c === P ? e = P : e !== P && (e += (c ?? "") + s[l + 1]), this._$AH[l] = c;
    }
    n && !i && this.j(e);
  }
  j(e) {
    e === P ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class lr extends De {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === P ? void 0 : e;
  }
}
class cr extends De {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== P);
  }
}
class ur extends De {
  constructor(e, a, r, i, s) {
    super(e, a, r, i, s), this.type = 5;
  }
  _$AI(e, a = this) {
    if ((e = pe(this, e, a, 0) ?? P) === F) return;
    const r = this._$AH, i = e === P && r !== P || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, s = e !== P && (r === P || i);
    i && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var a;
    typeof this._$AH == "function" ? this._$AH.call(((a = this.options) == null ? void 0 : a.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class dr {
  constructor(e, a, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = a, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    pe(this, e);
  }
}
const hr = { I: me }, Ke = ke.litHtmlPolyfillSupport;
Ke == null || Ke(Ce, me), (ke.litHtmlVersions ?? (ke.litHtmlVersions = [])).push("3.3.1");
const pr = (t, e, a) => {
  const r = (a == null ? void 0 : a.renderBefore) ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const s = (a == null ? void 0 : a.renderBefore) ?? null;
    r._$litPart$ = i = new me(e.insertBefore(be(), s), s, void 0, a ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le = globalThis;
let Z = class extends he {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var a;
    const e = super.createRenderRoot();
    return (a = this.renderOptions).renderBefore ?? (a.renderBefore = e.firstChild), e;
  }
  update(e) {
    const a = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = pr(a, this.renderRoot, this.renderOptions);
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
    return F;
  }
};
var Ma;
Z._$litElement$ = !0, Z.finalized = !0, (Ma = le.litElementHydrateSupport) == null || Ma.call(le, { LitElement: Z });
const Ue = le.litElementPolyfillSupport;
Ue == null || Ue({ LitElement: Z });
(le.litElementVersions ?? (le.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Te = (t) => (e, a) => {
  a !== void 0 ? a.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mr = { attribute: !0, type: String, converter: Pe, reflect: !1, hasChanged: mt }, fr = (t = mr, e, a) => {
  const { kind: r, metadata: i } = a;
  let s = globalThis.litPropertyMetadata.get(i);
  if (s === void 0 && globalThis.litPropertyMetadata.set(i, s = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(a.name, t), r === "accessor") {
    const { name: n } = a;
    return { set(o) {
      const l = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(n, l, t);
    }, init(o) {
      return o !== void 0 && this.C(n, void 0, t, o), o;
    } };
  }
  if (r === "setter") {
    const { name: n } = a;
    return function(o) {
      const l = this[n];
      e.call(this, o), this.requestUpdate(n, l, t);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function z(t) {
  return (e, a) => typeof a == "object" ? fr(t, e, a) : ((r, i, s) => {
    const n = i.hasOwnProperty(s);
    return i.constructor.createProperty(s, r), n ? Object.getOwnPropertyDescriptor(i, s) : void 0;
  })(t, e, a);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function A(t) {
  return z({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt = { ATTRIBUTE: 1, CHILD: 2 }, Be = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Oe = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, a, r) {
    this._$Ct = e, this._$AM = a, this._$Ci = r;
  }
  _$AS(e, a) {
    return this.update(e, a);
  }
  update(e, a) {
    return this.render(...a);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: gr } = hr, St = () => document.createComment(""), _e = (t, e, a) => {
  var s;
  const r = t._$AA.parentNode, i = e === void 0 ? t._$AB : e._$AA;
  if (a === void 0) {
    const n = r.insertBefore(St(), i), o = r.insertBefore(St(), i);
    a = new gr(n, o, t, t.options);
  } else {
    const n = a._$AB.nextSibling, o = a._$AM, l = o !== t;
    if (l) {
      let c;
      (s = a._$AQ) == null || s.call(a, t), a._$AM = t, a._$AP !== void 0 && (c = t._$AU) !== o._$AU && a._$AP(c);
    }
    if (n !== i || l) {
      let c = a._$AA;
      for (; c !== n; ) {
        const u = c.nextSibling;
        r.insertBefore(c, i), c = u;
      }
    }
  }
  return a;
}, ne = (t, e, a = t) => (t._$AI(e, a), t), _r = {}, vr = (t, e = _r) => t._$AH = e, kr = (t) => t._$AH, We = (t) => {
  t._$AR(), t._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = (t, e, a) => {
  const r = /* @__PURE__ */ new Map();
  for (let i = e; i <= a; i++) r.set(t[i], i);
  return r;
}, te = Be(class extends Oe {
  constructor(t) {
    if (super(t), t.type !== gt.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, a) {
    let r;
    a === void 0 ? a = e : e !== void 0 && (r = e);
    const i = [], s = [];
    let n = 0;
    for (const o of t) i[n] = r ? r(o, n) : n, s[n] = a(o, n), n++;
    return { values: s, keys: i };
  }
  render(t, e, a) {
    return this.dt(t, e, a).values;
  }
  update(t, [e, a, r]) {
    const i = kr(t), { values: s, keys: n } = this.dt(e, a, r);
    if (!Array.isArray(i)) return this.ut = n, s;
    const o = this.ut ?? (this.ut = []), l = [];
    let c, u, d = 0, p = i.length - 1, h = 0, g = s.length - 1;
    for (; d <= p && h <= g; ) if (i[d] === null) d++;
    else if (i[p] === null) p--;
    else if (o[d] === n[h]) l[h] = ne(i[d], s[h]), d++, h++;
    else if (o[p] === n[g]) l[g] = ne(i[p], s[g]), p--, g--;
    else if (o[d] === n[g]) l[g] = ne(i[d], s[g]), _e(t, l[g + 1], i[d]), d++, g--;
    else if (o[p] === n[h]) l[h] = ne(i[p], s[h]), _e(t, i[d], i[p]), p--, h++;
    else if (c === void 0 && (c = Et(n, h, g), u = Et(o, d, p)), c.has(o[d])) if (c.has(o[p])) {
      const y = u.get(n[h]), _ = y !== void 0 ? i[y] : null;
      if (_ === null) {
        const m = _e(t, i[d]);
        ne(m, s[h]), l[h] = m;
      } else l[h] = ne(_, s[h]), _e(t, i[d], _), i[y] = null;
      h++;
    } else We(i[p]), p--;
    else We(i[d]), d++;
    for (; h <= g; ) {
      const y = _e(t, l[g + 1]);
      ne(y, s[h]), l[h++] = y;
    }
    for (; d <= p; ) {
      const y = i[d++];
      y !== null && We(y);
    }
    return this.ut = n, vr(t, l), F;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de = Be(class extends Oe {
  constructor(t) {
    var e;
    if (super(t), t.type !== gt.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter(((e) => t[e])).join(" ") + " ";
  }
  update(t, [e]) {
    var r, i;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter(((s) => s !== ""))));
      for (const s in e) e[s] && !((r = this.nt) != null && r.has(s)) && this.st.add(s);
      return this.render(e);
    }
    const a = t.element.classList;
    for (const s of this.st) s in e || (a.remove(s), this.st.delete(s));
    for (const s in e) {
      const n = !!e[s];
      n === this.st.has(s) || (i = this.nt) != null && i.has(s) || (n ? (a.add(s), this.st.add(s)) : (a.remove(s), this.st.delete(s)));
    }
    return F;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pa = "important", br = " !" + Pa, S = Be(class extends Oe {
  constructor(t) {
    var e;
    if (super(t), t.type !== gt.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce(((e, a) => {
      const r = t[a];
      return r == null ? e : e + `${a = a.includes("-") ? a : a.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
    }), "");
  }
  update(t, [e]) {
    const { style: a } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const r of this.ft) e[r] == null && (this.ft.delete(r), r.includes("-") ? a.removeProperty(r) : a[r] = null);
    for (const r in e) {
      const i = e[r];
      if (i != null) {
        this.ft.add(r);
        const s = typeof i == "string" && i.endsWith(br);
        r.includes("-") || s ? a.setProperty(r, s ? i.slice(0, -11) : i, s ? Pa : "") : a[r] = i;
      }
    }
    return F;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qe = (t) => t ?? P;
var jt = Number.isNaN || function(e) {
  return typeof e == "number" && e !== e;
};
function yr(t, e) {
  return !!(t === e || jt(t) && jt(e));
}
function Cr(t, e) {
  if (t.length !== e.length)
    return !1;
  for (var a = 0; a < t.length; a++)
    if (!yr(t[a], e[a]))
      return !1;
  return !0;
}
function L(t, e) {
  e === void 0 && (e = Cr);
  var a = null;
  function r() {
    for (var i = [], s = 0; s < arguments.length; s++)
      i[s] = arguments[s];
    if (a && a.lastThis === this && e(i, a.lastArgs))
      return a.lastResult;
    var n = t.apply(this, i);
    return a = {
      lastResult: n,
      lastArgs: i,
      lastThis: this
    }, n;
  }
  return r.clear = function() {
    a = null;
  }, r;
}
var Pt = "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z", xt = "M12,4A4,4 0 0,1 16,8C16,9.95 14.6,11.58 12.75,11.93L8.07,7.25C8.42,5.4 10.05,4 12,4M12.28,14L18.28,20L20,21.72L18.73,23L15.73,20H4V18C4,16.16 6.5,14.61 9.87,14.14L2.78,7.05L4.05,5.78L12.28,14M20,18V19.18L15.14,14.32C18,14.93 20,16.35 20,18Z", It = "M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z", Ar = "M11 9C8.79 9 7 10.79 7 13S8.79 17 11 17 15 15.21 15 13 13.21 9 11 9M11 15C9.9 15 9 14.11 9 13S9.9 11 11 11 13 11.9 13 13 12.11 15 11 15M7 4H14C16.21 4 18 5.79 18 8V9H16V8C16 6.9 15.11 6 14 6H7C5.9 6 5 6.9 5 8V20H16V18H18V22H3V8C3 5.79 4.79 4 7 4M19 10.5C19 10.5 21 12.67 21 14C21 15.1 20.1 16 19 16S17 15.1 17 14C17 12.67 19 10.5 19 10.5", Lr = "M22.1 21.5L2.4 1.7L1.1 3L3.8 5.7C3.3 6.3 3 7.1 3 8V22H18V19.9L20.8 22.7L22.1 21.5M9.6 11.5L12.4 14.3C12.1 14.7 11.6 15 11 15C9.9 15 9 14.1 9 13C9 12.4 9.3 11.9 9.6 11.5M16 17.9V20H5V8C5 7.7 5.1 7.4 5.2 7.1L8.2 10.1C7.5 10.8 7 11.9 7 13C7 15.2 8.8 17 11 17C12.1 17 13.2 16.5 13.9 15.8L16 17.9M17 13.8C17.1 12.5 19 10.5 19 10.5S21 12.7 21 14C21 15 20.2 15.9 19.2 16L17 13.8M9.2 6L7.2 4H14C16.2 4 18 5.8 18 8V9H16V8C16 6.9 15.1 6 14 6H9.2Z", Hr = "M6,6.9L3.87,4.78L5.28,3.37L7.4,5.5L6,6.9M13,1V4H11V1H13M20.13,4.78L18,6.9L16.6,5.5L18.72,3.37L20.13,4.78M4.5,10.5V12.5H1.5V10.5H4.5M19.5,10.5H22.5V12.5H19.5V10.5M6,20H18A2,2 0 0,1 20,22H4A2,2 0 0,1 6,20M12,5A6,6 0 0,1 18,11V19H6V11A6,6 0 0,1 12,5Z", Vr = "M18 14.8L9 5.8C9.9 5.3 10.9 5 12 5C15.3 5 18 7.7 18 11V14.8M20.1 4.8L18.7 3.4L16.6 5.5L18 6.9L20.1 4.8M19.5 10.5V12.5H22.5V10.5H19.5M4.5 10.5H1.5V12.5H4.5V10.5M1.1 3L6.6 8.5C6.2 9.2 6 10.1 6 11V19H17.1L18.1 20H6C4.9 20 4 20.9 4 22H20.1L20.8 22.7L22.1 21.4L2.4 1.7L1.1 3M13 1H11V4H13V1Z", zr = "M18.75 22.16L16 19.16L17.16 18L18.75 19.59L22.34 16L23.5 17.41L18.75 22.16M11 15H13V17H11V15M11 7H13V13H11V7M12 2C17.5 2 22 6.5 22 12L21.92 13.31C21.31 13.11 20.67 13 19.94 13L20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C12.71 20 13.39 19.91 14.05 19.74C14.13 20.42 14.33 21.06 14.62 21.65C13.78 21.88 12.9 22 12 22C6.47 22 2 17.5 2 12C2 6.5 6.47 2 12 2Z", Mr = "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z", Dt = "M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z", Tt = "M18 12C18 11 17.74 10.04 17.3 9.2L18.76 7.74C19.54 8.97 20 10.43 20 12C20 13.39 19.64 14.68 19 15.82L17.5 14.32C17.82 13.6 18 12.83 18 12M2.39 1.73L1.11 3L5.5 7.37C4.55 8.68 4 10.27 4 12C4 13.57 4.46 15.03 5.24 16.26L6.7 14.8C6.25 13.97 6 13 6 12C6 10.83 6.34 9.74 6.92 8.81L15.19 17.08C14.26 17.66 13.17 18 12 18V15L8 19L12 23V20C13.73 20 15.32 19.45 16.63 18.5L20.84 22.73L22.11 21.46L2.39 1.73M12 6V8.8L12.1 8.9L16 5L12 1V4C10.62 4 9.32 4.36 8.18 5L9.68 6.5C10.4 6.18 11.18 6 12 6Z", Bt = "M5.06 7C4.63 7 4.22 7.14 3.84 7.42C3.46 7.7 3.24 8.06 3.14 8.5L2.11 12.91C1.86 14 2.06 14.92 2.69 15.73C2.81 15.85 2.93 15.97 3.04 16.07C3.63 16.64 4.28 17 5.22 17C6.16 17 6.91 16.59 7.47 16.05C8.1 16.67 8.86 17 9.8 17C10.64 17 11.44 16.63 12 16.07C12.68 16.7 13.45 17 14.3 17C15.17 17 15.91 16.67 16.54 16.05C17.11 16.62 17.86 17 18.81 17C19.76 17 20.43 16.65 21 16.06C21.09 15.97 21.18 15.87 21.28 15.77C21.94 14.95 22.14 14 21.89 12.91L20.86 8.5C20.73 8.06 20.5 7.7 20.13 7.42C19.77 7.14 19.38 7 18.94 7H5.06M18.89 8.97L19.97 13.38C20.06 13.81 19.97 14.2 19.69 14.55C19.44 14.86 19.13 15 18.75 15C18.44 15 18.17 14.9 17.95 14.66C17.73 14.43 17.61 14.16 17.58 13.84L16.97 9L18.89 8.97M5.06 9H7.03L6.42 13.84C6.3 14.63 5.91 15 5.25 15C4.84 15 4.53 14.86 4.31 14.55C4.03 14.2 3.94 13.81 4.03 13.38L5.06 9M9.05 9H11V13.7C11 14.05 10.89 14.35 10.64 14.62C10.39 14.88 10.08 15 9.7 15C9.36 15 9.07 14.88 8.84 14.59C8.61 14.3 8.5 14 8.5 13.66V13.5L9.05 9M13 9H14.95L15.5 13.5C15.58 13.92 15.5 14.27 15.21 14.57C14.95 14.87 14.61 15 14.2 15C13.89 15 13.61 14.88 13.36 14.62C13.11 14.35 13 14.05 13 13.7V9Z", wr = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z", $r = "M13 14H11V8H13M13 18H11V16H13M16.7 4H15V2H9V4H7.3C6.6 4 6 4.6 6 5.3V20.6C6 21.4 6.6 22 7.3 22H16.6C17.3 22 17.9 21.4 17.9 20.7V5.3C18 4.6 17.4 4 16.7 4Z", Sr = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.66C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4M11,20V14.5H9L13,7V12.5H15", Er = "M16.75 21.16L14 18.16L15.16 17L16.75 18.59L20.34 15L21.5 16.41L16.75 21.16M12 18C12 14.69 14.69 12 18 12V5.33C18 4.6 17.4 4 16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H13.54C12.58 20.94 12 19.54 12 18Z", jr = "M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21", Ot = "M20.84,22.73L18.11,20H3V19L5,17V11C5,9.86 5.29,8.73 5.83,7.72L1.11,3L2.39,1.73L22.11,21.46L20.84,22.73M19,15.8V11C19,7.9 16.97,5.17 14,4.29C14,4.19 14,4.1 14,4A2,2 0 0,0 12,2A2,2 0 0,0 10,4C10,4.1 10,4.19 10,4.29C9.39,4.47 8.8,4.74 8.26,5.09L19,15.8M12,23A2,2 0 0,0 14,21H10A2,2 0 0,0 12,23Z", Pr = "M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z", xr = "M3,2H21A1,1 0 0,1 22,3V5A1,1 0 0,1 21,6H20V13A1,1 0 0,1 19,14H13V16.17C14.17,16.58 15,17.69 15,19A3,3 0 0,1 12,22A3,3 0 0,1 9,19C9,17.69 9.83,16.58 11,16.17V14H5A1,1 0 0,1 4,13V6H3A1,1 0 0,1 2,5V3A1,1 0 0,1 3,2M12,18A1,1 0 0,0 11,19A1,1 0 0,0 12,20A1,1 0 0,0 13,19A1,1 0 0,0 12,18Z", Ir = "M3 2H21C21.55 2 22 2.45 22 3V5C22 5.55 21.55 6 21 6H20V7C20 7.55 19.55 8 19 8H13V10.17C14.17 10.58 15 11.7 15 13C15 14.66 13.66 16 12 16C10.34 16 9 14.66 9 13C9 11.69 9.84 10.58 11 10.17V8H5C4.45 8 4 7.55 4 7V6H3C2.45 6 2 5.55 2 5V3C2 2.45 2.45 2 3 2M12 12C11.45 12 11 12.45 11 13C11 13.55 11.45 14 12 14C12.55 14 13 13.55 13 13C13 12.45 12.55 12 12 12Z", Gt = "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z", ze = "M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z", Rt = "M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M9.31,17L11.75,14.56L14.19,17L15.25,15.94L12.81,13.5L15.25,11.06L14.19,10L11.75,12.44L9.31,10L8.25,11.06L10.69,13.5L8.25,15.94L9.31,17Z", Zt = "M19 19H5V8H19M16 1V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3H18V1M10.88 12H7.27L10.19 14.11L9.08 17.56L12 15.43L14.92 17.56L13.8 14.12L16.72 12H13.12L12 8.56L10.88 12Z", Dr = "M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z", Tr = "M1.2,4.47L2.5,3.2L20,20.72L18.73,22L16.73,20H4A2,2 0 0,1 2,18V6C2,5.78 2.04,5.57 2.1,5.37L1.2,4.47M7,4L9,2H15L17,4H20A2,2 0 0,1 22,6V18C22,18.6 21.74,19.13 21.32,19.5L16.33,14.5C16.76,13.77 17,12.91 17,12A5,5 0 0,0 12,7C11.09,7 10.23,7.24 9.5,7.67L5.82,4H7M7,12A5,5 0 0,0 12,17C12.5,17 13.03,16.92 13.5,16.77L11.72,15C10.29,14.85 9.15,13.71 9,12.28L7.23,10.5C7.08,10.97 7,11.5 7,12M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9Z", Br = "M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z", Or = "M20.5,19.85L6.41,5.76L2.41,1.76L1.11,3L4.57,6.46L3,11V19A1,1 0 0,0 4,20H5A1,1 0 0,0 6,19V18H16.11L20.84,22.73L22.11,21.46L20.5,19.85M6.5,15A1.5,1.5 0 0,1 5,13.5A1.5,1.5 0 0,1 6.5,12A1.5,1.5 0 0,1 8,13.5A1.5,1.5 0 0,1 6.5,15M5,10L5.78,7.67L8.11,10H5M17.5,5.5L19,10H13.2L16.12,12.92C16.5,12.17 17.37,11.86 18.12,12.21C18.87,12.57 19.18,13.47 18.83,14.21C18.68,14.5 18.43,14.77 18.12,14.92L21,17.8V11L18.92,5C18.71,4.4 18.14,4 17.5,4H7.2L8.7,5.5H17.5Z", Gr = "M1,10V12A9,9 0 0,1 10,21H12C12,14.92 7.07,10 1,10M1,14V16A5,5 0 0,1 6,21H8A7,7 0 0,0 1,14M1,18V21H4A3,3 0 0,0 1,18M21,3H3C1.89,3 1,3.89 1,5V8H3V5H21V19H14V21H21A2,2 0 0,0 23,19V5C23,3.89 22.1,3 21,3Z", Rr = "M1.6,1.27L0.25,2.75L1.41,3.8C1.16,4.13 1,4.55 1,5V8H3V5.23L18.2,19H14V21H20.41L22.31,22.72L23.65,21.24M6.5,3L8.7,5H21V16.14L23,17.95V5C23,3.89 22.1,3 21,3M1,10V12A9,9 0 0,1 10,21H12C12,14.92 7.08,10 1,10M1,14V16A5,5 0 0,1 6,21H8A7,7 0 0,0 1,14M1,18V21H4A3,3 0 0,0 1,18Z", Zr = "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z", Fr = "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z", Nr = "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z", Kr = "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z", Ur = "M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M12.5 12.8L7.7 15.6L7 14.2L11 11.9V7H12.5V12.8Z", Ge = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", Ft = "M12,23A1,1 0 0,1 11,22V19H7A2,2 0 0,1 5,17V7A2,2 0 0,1 7,5H21A2,2 0 0,1 23,7V17A2,2 0 0,1 21,19H16.9L13.2,22.71C13,22.89 12.76,23 12.5,23H12M3,15H1V3A2,2 0 0,1 3,1H19V3H3V15Z", Nt = "M21.4 7.5C22.2 8.3 22.2 9.6 21.4 10.3L18.6 13.1L10.8 5.3L13.6 2.5C14.4 1.7 15.7 1.7 16.4 2.5L18.2 4.3L21.2 1.3L22.6 2.7L19.6 5.7L21.4 7.5M15.6 13.3L14.2 11.9L11.4 14.7L9.3 12.6L12.1 9.8L10.7 8.4L7.9 11.2L6.4 9.8L3.6 12.6C2.8 13.4 2.8 14.7 3.6 15.4L5.4 17.2L1.4 21.2L2.8 22.6L6.8 18.6L8.6 20.4C9.4 21.2 10.7 21.2 11.4 20.4L14.2 17.6L12.8 16.2L15.6 13.3Z", Kt = "M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z", Wr = "M23 3H1V1H23V3M2 22H6C6 19 4 17 4 17C10 13 11 4 11 4H2V22M22 4H13C13 4 14 13 20 17C20 17 18 19 18 22H22V4Z", qr = "M23 3H1V1H23V3M2 22H11V4H2V22M22 4H13V22H22V4Z", Ut = "M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z", Wt = "M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z", Jr = "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z", qt = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z", Jt = "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z", Yr = "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z", Qr = "M12.5,2C9.64,2 8.57,4.55 9.29,7.47L15,13.16C15.87,13.37 16.81,13.81 17.28,14.73C18.46,17.1 22.03,17 22.03,12.5C22.03,8.92 18.05,8.13 14.35,10.13C14.03,9.73 13.61,9.42 13.13,9.22C13.32,8.29 13.76,7.24 14.75,6.75C17.11,5.57 17,2 12.5,2M3.28,4L2,5.27L4.47,7.73C3.22,7.74 2,8.87 2,11.5C2,15.07 5.96,15.85 9.65,13.87C9.97,14.27 10.4,14.59 10.89,14.79C10.69,15.71 10.25,16.75 9.27,17.24C6.91,18.42 7,22 11.5,22C13.8,22 14.94,20.36 14.94,18.21L18.73,22L20,20.72L3.28,4Z", Me = "M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z", Xr = "M5 5V19H7V21H3V3H7V5H5M20 7H7V9H20V7M20 11H7V13H20V11M20 15H7V17H20V15Z", ei = "M17 14V17H14V19H17V22H19V19H22V17H19V14M20 11V12.3C19.4 12.1 18.7 12 18 12C16.8 12 15.6 12.4 14.7 13H7V11H20M12.1 17H7V15H12.8C12.5 15.6 12.2 16.3 12.1 17M7 7H20V9H7V7M5 19H7V21H3V3H7V5H5V19Z", Je = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z", Ye = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12Z", ti = "M1 4.27L2.28 3L6 6.72L21 21.72L19.73 23L17.72 21C16.56 20.85 15.65 19.94 15.5 18.78L14 17.27V21H4V7.27L1 4.27M19.77 7.23C20.22 7.68 20.5 8.31 20.5 9L20.5 18.67L19 17.18V11.29C18.69 11.42 18.36 11.5 18 11.5C16.62 11.5 15.5 10.38 15.5 9C15.5 7.93 16.17 7.03 17.11 6.67L15 4.56L16.06 3.5L19.78 7.22L19.77 7.23M11.82 10H12V5H6.82L5.06 3.24C5.34 3.09 5.66 3 6 3H12C13.1 3 14 3.9 14 5V12H15C16.1 12 17 12.9 17 14V15.18L11.82 10M6 10H6.73L6 9.27V10M6 12V19H12V15.27L8.73 12H6M18 10C18.55 10 19 9.55 19 9C19 8.45 18.55 8 18 8C17.45 8 17 8.45 17 9C17 9.55 17.45 10 18 10Z", ai = "M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7.03 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14A2,2 0 0,0 15,12H14V5A2,2 0 0,0 12,3H6A2,2 0 0,0 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23M12,13.5V19H6V12H12V13.5M12,10H6V5H12V10M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10Z", ri = "M9 6V11H7V7H5V11H3V9H1V21H3V19H5V21H7V19H9V21H11V19H13V21H15V19H17V21H19V19H21V21H23V9H21V11H19V7H17V11H15V6H13V11H11V6H9M3 13H5V17H3V13M7 13H9V17H7V13M11 13H13V17H11V13M15 13H17V17H15V13M19 13H21V17H19V13Z", ii = "M7 21V7H5V11H3V9H1V21H3V19H5V21H7M3 17V13H5V17H3M21 9V11H19V7H17V21H19V19H21V21H23V9H21M21 17H19V13H21V17Z", Yt = "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z", Qt = "M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z", Xt = "M15,12C13.89,12 13,12.89 13,14A2,2 0 0,0 15,16A2,2 0 0,0 17,14C17,12.89 16.1,12 15,12M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M14,9C14,7.89 13.1,7 12,7C10.89,7 10,7.89 10,9A2,2 0 0,0 12,11A2,2 0 0,0 14,9M9,12A2,2 0 0,0 7,14A2,2 0 0,0 9,16A2,2 0 0,0 11,14C11,12.89 10.1,12 9,12Z", si = "M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z", ni = "M24 13L20 17V14H11V12H20V9L24 13M4 20V12H1L11 3L18 9.3V10H15.79L11 5.69L6 10.19V18H16V16H18V20H4Z", oi = "M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22", li = "M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z", ea = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z", ci = "M21 17.2L6.8 3H19C20.1 3 21 3.9 21 5V17.2M20.7 22L19.7 21H5C3.9 21 3 20.1 3 19V4.3L2 3.3L3.3 2L22 20.7L20.7 22M16.8 18L12.9 14.1L11 16.5L8.5 13.5L5 18H16.8Z", ui = "M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z", di = "M12,2C9.76,2 7.78,3.05 6.5,4.68L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z", hi = "M12,2C9.76,2 7.78,3.05 6.5,4.68L7.93,6.11C8.84,4.84 10.32,4 12,4A5,5 0 0,1 17,9C17,10.68 16.16,12.16 14.89,13.06L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M7.23,10.5L12.73,16H10V13.58C8.68,13 7.66,11.88 7.23,10.5M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z", pi = "M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z", ta = "M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z", aa = "M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17Z", ra = "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z", ia = "M16.37,16.1L11.75,11.47L11.64,11.36L3.27,3L2,4.27L5.18,7.45C5.06,7.95 5,8.46 5,9C5,14.25 12,22 12,22C12,22 13.67,20.15 15.37,17.65L18.73,21L20,19.72M12,6.5A2.5,2.5 0 0,1 14.5,9C14.5,9.73 14.17,10.39 13.67,10.85L17.3,14.5C18.28,12.62 19,10.68 19,9A7,7 0 0,0 12,2C10,2 8.24,2.82 6.96,4.14L10.15,7.33C10.61,6.82 11.26,6.5 12,6.5Z", mi = "M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z", fi = "M19,11C19,12.19 18.66,13.3 18.1,14.28L16.87,13.05C17.14,12.43 17.3,11.74 17.3,11H19M15,11.16L9,5.18V5A3,3 0 0,1 12,2A3,3 0 0,1 15,5V11L15,11.16M4.27,3L21,19.73L19.73,21L15.54,16.81C14.77,17.27 13.91,17.58 13,17.72V21H11V17.72C7.72,17.23 5,14.41 5,11H6.7C6.7,14 9.24,16.1 12,16.1C12.81,16.1 13.6,15.91 14.31,15.58L12.65,13.92L12,14A3,3 0 0,1 9,11V10.28L3,4.27L4.27,3Z", sa = "M8 7C6.9 7 6 7.9 6 9V15C6 16.11 6.9 17 8 17H11V15H8V9H11V7H8M14 7C12.9 7 12 7.9 12 9V15C12 16.11 12.9 17 14 17H16C17.11 17 18 16.11 18 15V9C18 7.9 17.11 7 16 7H14M14 9H16V15H14V9", gi = "M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33M21,1A2,2 0 0,0 23,3V1H21M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z", _i = "M11.4 8.2H15V10H13.2L11.4 8.2M19.67 1H18.33C18.33 3.58 20.42 5.67 23 5.67V4.33C21.16 4.33 19.67 2.84 19.67 1M21 1C21 2.11 21.9 3 23 3V1H21M17 1H15.67C15.67 5.05 18.95 8.33 23 8.33V7C19.69 7 17 4.31 17 1M10 3.8C11 3.8 11.8 3 11.8 2S11 .2 10 .2 8.2 1 8.2 2 9 3.8 10 3.8M2.39 1.73L1.11 3L3.46 5.35L2 5.8V11H3.8V7.33L5.05 6.94L5.68 7.57L2 22H3.8L6.67 13.89L9 17V22H10.8V15.59L8.31 11.05L8.5 10.37L20.84 22.73L22.11 21.46L2.39 1.73M9.38 4.87C9.08 4.37 8.54 4.03 7.92 4.03C7.75 4.03 7.58 4.06 7.42 4.11L7.34 4.14L11.35 8.15L9.38 4.87Z", vi = "M18,4L20,8H17L15,4H13L15,8H12L10,4H8L10,8H7L5,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V4H18Z", ki = "M22.11 21.46L20.84 22.73L18.11 20H4C2.9 20 2 19.11 2 18V6C2 5.42 2.25 4.9 2.65 4.54L1.11 3L2.39 1.73L22.11 21.46M21.88 18.68C21.96 18.47 22 18.24 22 18V4H18L20 8H17L15 4H13L15 8H12L10 4H8L8.8 5.6L21.88 18.68Z", we = "M4,17V9H2V7H6V17H4M22,15C22,16.11 21.1,17 20,17H16V15H20V13H18V11H20V9H16V7H20A2,2 0 0,1 22,9V10.5A1.5,1.5 0 0,1 20.5,12A1.5,1.5 0 0,1 22,13.5V15M14,15V17H8V13C8,11.89 8.9,11 10,11H12V9H8V7H12A2,2 0 0,1 14,9V11C14,12.11 13.1,13 12,13H10V15H14Z", bi = "M14,19H18V5H14M6,19H10V5H6V19Z", yi = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", Ci = "M8,5.14V19.14L19,12.14L8,5.14Z", Ai = "M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13", Qe = "M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M12,19A7,7 0 0,1 5,12A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19Z", na = "M16,7V3H14V7H10V3H8V7H8C7,7 6,8 6,9V14.5L9.5,18V21H14.5V18L18,14.5V9C18,8 17,7 16,7Z", oa = "M20.84 22.73L15.31 17.2L14.5 18V21H9.5V18L6 14.5V9C6 8.7 6.1 8.41 6.25 8.14L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M18 14.5V9C18 8 17 7 16 7V3H14V7H10.2L17.85 14.65L18 14.5M10 3H8V4.8L10 6.8V3Z", Li = "M19,12C19,15.86 15.86,19 12,19C8.14,19 5,15.86 5,12C5,8.14 8.14,5 12,5C15.86,5 19,8.14 19,12Z", Hi = "M12.5,5A7.5,7.5 0 0,0 5,12.5A7.5,7.5 0 0,0 12.5,20A7.5,7.5 0 0,0 20,12.5A7.5,7.5 0 0,0 12.5,5M7,10H9A1,1 0 0,1 10,11V12C10,12.5 9.62,12.9 9.14,12.97L10.31,15H9.15L8,13V15H7M12,10H14V11H12V12H14V13H12V14H14V15H12A1,1 0 0,1 11,14V11A1,1 0 0,1 12,10M16,10H18V11H16V14H18V15H16A1,1 0 0,1 15,14V11A1,1 0 0,1 16,10M8,11V12H9V11", Vi = "M12,0C8.96,0 6.21,1.23 4.22,3.22L5.63,4.63C7.26,3 9.5,2 12,2C14.5,2 16.74,3 18.36,4.64L19.77,3.23C17.79,1.23 15.04,0 12,0M7.05,6.05L8.46,7.46C9.37,6.56 10.62,6 12,6C13.38,6 14.63,6.56 15.54,7.46L16.95,6.05C15.68,4.78 13.93,4 12,4C10.07,4 8.32,4.78 7.05,6.05M12,15A2,2 0 0,1 10,13A2,2 0 0,1 12,11A2,2 0 0,1 14,13A2,2 0 0,1 12,15M15,9H9A1,1 0 0,0 8,10V22A1,1 0 0,0 9,23H15A1,1 0 0,0 16,22V10A1,1 0 0,0 15,9Z", zi = "M2,5.27L3.28,4L21,21.72L19.73,23L16,19.27V22A1,1 0 0,1 15,23H9C8.46,23 8,22.55 8,22V11.27L2,5.27M12,0C15.05,0 17.8,1.23 19.77,3.23L18.36,4.64C16.75,3 14.5,2 12,2C9.72,2 7.64,2.85 6.06,4.24L4.64,2.82C6.59,1.07 9.17,0 12,0M12,4C13.94,4 15.69,4.78 16.95,6.05L15.55,7.46C14.64,6.56 13.39,6 12,6C10.83,6 9.76,6.4 8.9,7.08L7.5,5.66C8.7,4.62 10.28,4 12,4M15,9C15.56,9 16,9.45 16,10V14.18L13.5,11.69L13.31,11.5L10.82,9H15M10.03,13.3C10.16,14.16 10.84,14.85 11.71,15L10.03,13.3Z", Mi = "M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z", la = "M1 14V5H13C18.5 5 23 9.5 23 15V17H20.83C20.42 18.17 19.31 19 18 19C16.69 19 15.58 18.17 15.17 17H10C9.09 18.21 7.64 19 6 19C3.24 19 1 16.76 1 14M6 11C4.34 11 3 12.34 3 14C3 15.66 4.34 17 6 17C7.66 17 9 15.66 9 14C9 12.34 7.66 11 6 11M15 10V12H20.25C19.92 11.27 19.5 10.6 19 10H15Z", wi = "M23 15V18C23 18.5 22.64 18.88 22.17 18.97L18.97 15.77C19 15.68 19 15.59 19 15.5C19 14.12 17.88 13 16.5 13C16.41 13 16.32 13 16.23 13.03L10.2 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2S14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C17.87 7 21 10.13 21 14H22C22.55 14 23 14.45 23 15M22.11 21.46L20.84 22.73L19.89 21.78C19.62 21.92 19.32 22 19 22H5C3.9 22 3 21.11 3 20V19H2C1.45 19 1 18.55 1 18V15C1 14.45 1.45 14 2 14H3C3 11.53 4.29 9.36 6.22 8.11L1.11 3L2.39 1.73L22.11 21.46M10 15.5C10 14.12 8.88 13 7.5 13S5 14.12 5 15.5 6.12 18 7.5 18 10 16.88 10 15.5M16.07 17.96L14.04 15.93C14.23 16.97 15.04 17.77 16.07 17.96Z", $i = "M12,2C14.65,2 17.19,3.06 19.07,4.93L17.65,6.35C16.15,4.85 14.12,4 12,4C9.88,4 7.84,4.84 6.35,6.35L4.93,4.93C6.81,3.06 9.35,2 12,2M3.66,6.5L5.11,7.94C4.39,9.17 4,10.57 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,10.57 19.61,9.17 18.88,7.94L20.34,6.5C21.42,8.12 22,10.04 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12C2,10.04 2.58,8.12 3.66,6.5M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C14.08,15.58 13.06,16 12,16C10.94,16 9.92,15.58 9.17,14.83L7.76,16.24C6.63,15.12 6,13.59 6,12A6,6 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z", Si = "M20.8 22.7L18 19.9C16.3 21.2 14.2 22 12 22C6.5 22 2 17.5 2 12C2 10 2.6 8.1 3.7 6.5L5.2 7.9C4.4 9.2 4 10.6 4 12C4 16.4 7.6 20 12 20C13.7 20 15.3 19.4 16.6 18.5L13.7 15.6C13.2 15.9 12.6 16 12 16C10.9 16 9.9 15.6 9.2 14.8L7.8 16.2C6.6 15.1 6 13.6 6 12C6 10.8 6.3 9.7 6.9 8.8L1.1 3L2.4 1.7L22.1 21.4L20.8 22.7M20 12C20 13.4 19.6 14.7 19 15.8L20.5 17.3C21.5 15.8 22 14 22 12C22 10 21.4 8.1 20.3 6.5L18.8 7.9C19.6 9.2 20 10.6 20 12M12 4C14.1 4 16.2 4.8 17.7 6.3L19.1 4.9C17.2 3.1 14.7 2 12 2C10.1 2 8.3 2.5 6.7 3.5L8.2 5C9.3 4.3 10.7 4 12 4M17.5 14.3C17.8 13.6 18 12.8 18 12C18 8.7 15.3 6 12 6C11.2 6 10.4 6.2 9.7 6.5L11.4 8.2C11.6 8.1 11.8 8 12 8C12.6 8 13 8.4 13 9C13 9.2 12.9 9.4 12.8 9.6L17.5 14.3Z", Ei = "M20 19V3H4V19H2V21H22V19H20M6 19V13H11V14.8C10.6 15.1 10.2 15.6 10.2 16.2C10.2 17.2 11 18 12 18S13.8 17.2 13.8 16.2C13.8 15.6 13.5 15.1 13 14.8V13H18V19H6Z", ji = "M20 19V3H4V19H2V21H10.25C10.25 21.97 11.03 22.75 12 22.75S13.75 21.97 13.75 21H22V19H20M6 19V17H11V19H6M13 19V17H18V19H13Z", ca = "M11.62,1L17.28,6.67L15.16,8.79L13.04,6.67L11.62,8.09L13.95,10.41L12.79,11.58L13.24,12.04C14.17,11.61 15.31,11.77 16.07,12.54L12.54,16.07C11.77,15.31 11.61,14.17 12.04,13.24L11.58,12.79L10.41,13.95L8.09,11.62L6.67,13.04L8.79,15.16L6.67,17.28L1,11.62L3.14,9.5L5.26,11.62L6.67,10.21L3.84,7.38C3.06,6.6 3.06,5.33 3.84,4.55L4.55,3.84C5.33,3.06 6.6,3.06 7.38,3.84L10.21,6.67L11.62,5.26L9.5,3.14L11.62,1M18,14A4,4 0 0,1 14,18V16A2,2 0 0,0 16,14H18M22,14A8,8 0 0,1 14,22V20A6,6 0 0,0 20,14H22Z", ua = "M17.8,20C17.4,21.2 16.3,22 15,22H5C3.3,22 2,20.7 2,19V18H5L14.2,18C14.6,19.2 15.7,20 17,20H17.8M19,2C20.7,2 22,3.3 22,5V6H20V5C20,4.4 19.6,4 19,4C18.4,4 18,4.4 18,5V18H17C16.4,18 16,17.6 16,17V16H5V5C5,3.3 6.3,2 8,2H19M8,6V8H15V6H8M8,10V12H14V10H8Z", Pi = "M4,18V21H7V18H17V21H20V15H4V18M19,10H22V13H19V10M2,10H5V13H2V10M17,13H7V5A2,2 0 0,1 9,3H15A2,2 0 0,1 17,5V13Z", xi = "M15,5V12H9V5H15M15,3H9A2,2 0 0,0 7,5V14H17V5A2,2 0 0,0 15,3M22,10H19V13H22V10M5,10H2V13H5V10M20,15H4V21H6V17H18V21H20V15Z", Ii = "M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M11,7H13V13H11V7M11,15H13V17H11V15Z", Di = "M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9", da = "M11,13H13V16H16V11H18L12,6L6,11H8V16H11V13M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1Z", Ti = "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.3V15.8C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.7V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z", Bi = "M12 1L3 5V11C3 16.5 6.8 21.7 12 23C17.2 21.7 21 16.5 21 11V5L12 1M16 15.8C16 16.4 15.4 17 14.7 17H9.2C8.6 17 8 16.4 8 15.7V12.2C8 11.6 8.6 11 9.2 11V8.5C9.2 7.1 10.6 6 12 6S14.8 7.1 14.8 8.5V9H13.5V8.5C13.5 7.7 12.8 7.2 12 7.2S10.5 7.7 10.5 8.5V11H14.8C15.4 11 16 11.6 16 12.3V15.8Z", Oi = "M8.2 5L6.2 3H19C20.11 3 21 3.9 21 5V17.8L19 15.8V5H8.2M17.5 14.32C17.82 13.6 18 12.83 18 12C18 8.68 15.31 6 12 6C11.17 6 10.4 6.18 9.68 6.5L11.27 8.07C11.5 8.03 11.75 8 12 8C14.21 8 16 9.79 16 12C16 12.25 15.97 12.5 15.93 12.73L17.5 14.32M22.11 21.46L20.84 22.73L19.1 21C19.07 21 19.03 21 19 21H5C3.89 21 3 20.1 3 19V5C3 4.97 3 4.93 3 4.9L1.11 3L2.39 1.73L22.11 21.46M8 12C8 14.21 9.79 16 12 16C12.62 16 13.19 15.85 13.71 15.6L8.4 10.29C8.15 10.81 8 11.39 8 12M17.11 19L15.19 17.08C14.26 17.66 13.17 18 12 18C8.69 18 6 15.31 6 12C6 10.83 6.34 9.74 6.92 8.81L5 6.89V19H17.11Z", Gi = "M19 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3M19 19H5V5H19V19M12 18C15.31 18 18 15.31 18 12C18 8.68 15.31 6 12 6C8.68 6 6 8.68 6 12C6 15.31 8.69 18 12 18M12 8C14.21 8 16 9.79 16 12S14.21 16 12 16 8 14.21 8 12 9.79 8 12 8Z", Ri = "M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z", Zi = "M11 5.12L9.29 3.41L10.71 2L12 3.29L13.29 2L14.71 3.41L13 5.12V7.38L15.45 8.82L17.45 7.69L18.07 5.36L20 5.88L19.54 7.65L21.31 8.12L20.79 10.05L18.46 9.43L16.46 10.56V13.26L14.5 11.3V10.56L12.74 9.54L10.73 7.53L11 7.38V5.12M18.46 14.57L16.87 13.67L19.55 16.35L21.3 15.88L20.79 13.95L18.46 14.57M13 16.62V18.88L14.7 20.59L13.29 22L12 20.71L10.71 22L9.29 20.59L11 18.88V16.62L8.55 15.18L6.55 16.31L5.93 18.64L4 18.12L4.47 16.36L2.7 15.89L3.22 13.96L5.55 14.58L7.55 13.45V10.56L5.55 9.43L3.22 10.05L2.7 8.12L4.47 7.65L4 5.89L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73L14.1 16L13 16.62M12 14.89L12.63 14.5L9.5 11.39V13.44L12 14.89Z", Fi = "M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z", ha = "M5.5,9A1.5,1.5 0 0,0 7,7.5A1.5,1.5 0 0,0 5.5,6A1.5,1.5 0 0,0 4,7.5A1.5,1.5 0 0,0 5.5,9M17.41,11.58C17.77,11.94 18,12.44 18,13C18,13.55 17.78,14.05 17.41,14.41L12.41,19.41C12.05,19.77 11.55,20 11,20C10.45,20 9.95,19.78 9.58,19.41L2.59,12.42C2.22,12.05 2,11.55 2,11V6C2,4.89 2.89,4 4,4H9C9.55,4 10.05,4.22 10.41,4.58L17.41,11.58M13.54,5.71L14.54,4.71L21.41,11.58C21.78,11.94 22,12.45 22,13C22,13.55 21.78,14.05 21.42,14.41L16.04,19.79L15.04,18.79L20.75,13L13.54,5.71Z", $e = "M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z", pa = "M10 19.11L12.11 17H7V15H14V15.12L16.12 13H7V11H17V12.12L18.24 10.89C18.72 10.41 19.35 10.14 20.04 10.14C20.37 10.14 20.7 10.21 21 10.33V5C21 3.89 20.1 3 19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.9 21 5 21H10V19.11M7 7H17V9H7V7M21.7 14.35L20.7 15.35L18.65 13.3L19.65 12.3C19.86 12.09 20.21 12.09 20.42 12.3L21.7 13.58C21.91 13.79 21.91 14.14 21.7 14.35M12 19.94L18.06 13.88L20.11 15.93L14.06 22H12V19.94Z", Ni = "M16.95,16.95L14.83,14.83C15.55,14.1 16,13.1 16,12C16,11.26 15.79,10.57 15.43,10L17.6,7.81C18.5,9 19,10.43 19,12C19,13.93 18.22,15.68 16.95,16.95M12,5C13.57,5 15,5.5 16.19,6.4L14,8.56C13.43,8.21 12.74,8 12,8A4,4 0 0,0 8,12C8,13.1 8.45,14.1 9.17,14.83L7.05,16.95C5.78,15.68 5,13.93 5,12A7,7 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z", Ki = "M22 12.66C21.07 12.24 20.07 12 19 12C19 10.43 18.5 9 17.6 7.81L15.43 10C15.79 10.57 16 11.26 16 12C16 12.24 16 12.5 15.94 12.7C13.61 13.84 12 16.23 12 19C12 20.07 12.24 21.07 12.66 22C12.44 22 12.22 22 12 22C10.69 22 9.39 21.74 8.17 21.24C6.96 20.74 5.86 20 4.93 19.07C3.05 17.2 2 14.65 2 12C2 9.35 3.05 6.8 4.93 4.93C5.86 4 6.96 3.26 8.17 2.76C9.39 2.26 10.69 2 12 2C17.5 2 22 6.47 22 12C22 12.22 22 12.44 22 12.66M12 5C10.14 5 8.36 5.74 7.05 7.05C5.74 8.36 5 10.14 5 12C5 13.93 5.78 15.68 7.05 16.95L9.17 14.83C8.45 14.1 8 13.1 8 12C8 10.94 8.42 9.92 9.17 9.17C9.92 8.42 10.94 8 12 8C12.74 8 13.43 8.21 14 8.56L16.19 6.4C15 5.5 13.57 5 12 5M23.83 20.64C23.89 20.53 23.87 20.39 23.77 20.32L22.72 19.5C22.74 19.33 22.75 19.16 22.75 19C22.75 18.84 22.74 18.67 22.72 18.5L23.77 17.68C23.87 17.61 23.89 17.5 23.83 17.36L22.83 15.64C22.77 15.53 22.64 15.5 22.53 15.53L21.28 16L21.14 15.91C20.91 15.77 20.7 15.64 20.44 15.54L20.25 14.21C20.23 14.09 20.13 14 20 14H18C17.88 14 17.77 14.09 17.75 14.21L17.57 15.54C17.3 15.64 17.09 15.78 16.86 15.92L16.72 16L15.5 15.53C15.37 15.5 15.23 15.53 15.17 15.64L14.17 17.36C14.11 17.5 14.14 17.61 14.23 17.68L15.29 18.5L15.29 18.53C15.27 18.69 15.25 18.84 15.25 19C15.25 19.16 15.27 19.31 15.29 19.47C15.29 19.5 15.29 19.5 15.29 19.5L14.23 20.32C14.14 20.39 14.11 20.53 14.17 20.64L15.17 22.37C15.23 22.5 15.37 22.5 15.5 22.5L16.72 21.97C17 22.17 17.25 22.34 17.57 22.47L17.75 23.79C17.77 23.91 17.88 24 18 24H20C20.13 24 20.23 23.91 20.25 23.79L20.44 22.47C20.75 22.34 21 22.17 21.28 21.97L22.53 22.5C22.64 22.5 22.77 22.5 22.83 22.37L23.83 20.64M19 17.25C19.97 17.25 20.75 18.03 20.75 19C20.75 19.97 19.96 20.75 19 20.75C18.04 20.75 17.25 19.97 17.25 19C17.25 18.03 18.03 17.25 19 17.25Z", Ui = "M3 4L1.75 5.27L4.5 8.03C3.55 9.45 3 11.16 3 13C3 17.97 7.03 22 12 22C13.84 22 15.55 21.45 17 20.5L19.5 23L20.75 21.73L13.04 14L3 4M15 1H9V3H15M21 13C21 14.83 20.45 16.53 19.5 17.94L13 11.45V7H11V9.45L7.05 5.5C8.47 4.55 10.17 4 12 4C14.12 4 16.07 4.74 17.62 5.97L19.04 4.55L20.45 5.97L19.03 7.39C20.26 8.93 21 10.88 21 13Z", Wi = "M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z", Xe = "M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M17,15A3,3 0 0,1 14,12A3,3 0 0,1 17,9A3,3 0 0,1 20,12A3,3 0 0,1 17,15Z", et = "M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M7,15A3,3 0 0,1 4,12A3,3 0 0,1 7,9A3,3 0 0,1 10,12A3,3 0 0,1 7,15Z", tt = "M17 6H7C3.69 6 1 8.69 1 12S3.69 18 7 18H17C20.31 18 23 15.31 23 12S20.31 6 17 6M17 16H7C4.79 16 3 14.21 3 12S4.79 8 7 8H17C19.21 8 21 9.79 21 12S19.21 16 17 16M17 9C15.34 9 14 10.34 14 12S15.34 15 17 15 20 13.66 20 12 18.66 9 17 9Z", qi = "M4 22H2V2H4M22 2H20V22H22M17.24 5.34L13.24 9.34A3 3 0 0 0 9.24 13.34L5.24 17.34L6.66 18.76L10.66 14.76A3 3 0 0 0 14.66 10.76L18.66 6.76Z", ma = "M22 2V22H20V13H14.82A3 3 0 0 1 9.18 13H4V22H2V2H4V11H9.18A3 3 0 0 1 14.82 11H20V2Z", Ji = "M4 22H2V2H4M22 2H20V22H22M11 4V9.18A3 3 0 0 0 11 14.82V20H13V14.82A3 3 0 0 0 13 9.18V4Z", Yi = "M16,19H8V5H16M16.5,3H7.5A1.5,1.5 0 0,0 6,4.5V19.5A1.5,1.5 0 0,0 7.5,21H16.5A1.5,1.5 0 0,0 18,19.5V4.5A1.5,1.5 0 0,0 16.5,3M19,17H21V7H19M22,9V15H24V9M3,17H5V7H3M0,15H2V9H0V15Z", Qi = "M8.2,5L6.55,3.35C6.81,3.12 7.15,3 7.5,3H16.5A1.5,1.5 0 0,1 18,4.5V14.8L16,12.8V5H8.2M0,15H2V9H0V15M21,17V7H19V15.8L20.2,17H21M3,17H5V7H3V17M18,17.35L22.11,21.46L20.84,22.73L18,19.85C17.83,20.54 17.21,21 16.5,21H7.5A1.5,1.5 0 0,1 6,19.5V7.89L1.11,3L2.39,1.73L6.09,5.44L8,7.34L16,15.34L18,17.34V17.35M16,17.89L8,9.89V19H16V17.89M22,9V15H24V9H22Z", fa = "M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z", ga = "M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z", Xi = "M10 3.25C10 3.25 16 10 16 14C16 17.31 13.31 20 10 20S4 17.31 4 14C4 10 10 3.25 10 3.25M20 7V13H18V7H20M18 17H20V15H18V17Z", es = "M8 2C6.89 2 6 2.89 6 4V16C6 17.11 6.89 18 8 18H9V20H6V22H9C10.11 22 11 21.11 11 20V18H13V20C13 21.11 13.89 22 15 22H18V20H15V18H16C17.11 18 18 17.11 18 16V4C18 2.89 17.11 2 16 2H8M12 4.97A2 2 0 0 1 14 6.97A2 2 0 0 1 12 8.97A2 2 0 0 1 10 6.97A2 2 0 0 1 12 4.97M10 14.5H14V16H10V14.5Z", ts = "M20.84 22.73L16.29 18.18C15.2 19.3 13.69 20 12 20C8.69 20 6 17.31 6 14C6 12.67 6.67 11.03 7.55 9.44L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M18 14C18 10 12 3.25 12 3.25S10.84 4.55 9.55 6.35L17.95 14.75C18 14.5 18 14.25 18 14Z", as = "M5.7 2.5A2 2 0 0 1 7 2H9A2 2 0 0 1 11 4V5H19A2 2 0 0 1 21 7V11A1 1 0 0 1 21 13H17A1 1 0 0 1 17 11V9H12.2M20.84 22.73L22.11 21.46L11 10.34L2.39 1.73L1.11 3L3.65 5.54A2 2 0 0 0 5 9V18H4A2 2 0 0 0 2 20V22H14V20A2 2 0 0 0 12 18H11V12.89Z", _a = "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z", rs = "M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z", va = "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z", is = "M22.11 21.46L2.39 1.73L1.11 3L4.97 6.86L3.34 7L5.11 10.79C5.25 10 5.5 9.24 5.94 8.5C6 8.36 6.13 8.24 6.22 8.11L7.66 9.55C7.25 10.27 7 11.11 7 12C7 14.76 9.24 17 12 17C12.9 17 13.73 16.75 14.45 16.34L20.84 22.73L22.11 21.46M12 15C10.34 15 9 13.66 9 12C9 11.67 9.07 11.36 9.17 11.06L12.94 14.83C12.64 14.93 12.33 15 12 15M18.05 8.5C17.63 7.78 17.1 7.15 16.5 6.64L20.65 7L18.88 10.79C18.74 10 18.47 9.23 18.05 8.5M12 7C14.76 7 17 9.24 17 12C17 12.54 16.89 13.05 16.74 13.54L15 11.78C14.87 10.3 13.7 9.13 12.22 9L10.47 7.27C10.95 7.11 11.46 7 12 7M12 5C11.16 5 10.35 5.15 9.61 5.42L12 2L14.39 5.42C13.65 5.15 12.84 5 12 5M18.87 13.21L20.64 17L20.24 17.04L18.25 15.05C18.54 14.45 18.76 13.84 18.87 13.21M12 19C12.82 19 13.63 18.83 14.37 18.56L12 22L9.59 18.56C10.33 18.83 11.14 19 12 19M5.95 15.5C6.37 16.24 6.91 16.86 7.5 17.37L3.36 17L5.12 13.23C5.26 14 5.53 14.78 5.95 15.5Z", ka = "M6,11H10V9H14V11H18V4H6V11M18,13H6V20H18V13M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z", ba = "M6,8H10V6H14V8H18V4H6V8M18,10H6V15H18V10M6,20H18V17H6V20M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z", ss = "M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9M8 12H16V14H8V12M8 15H16V17H8V15M8 18H16V20H8V18Z", ns = "M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9Z";
const _t = [
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
], os = (t, e, a, r, i) => {
  var d, p, h, g, y;
  const s = a || (e == null ? void 0 : e.theme), n = (e == null ? void 0 : e.darkMode) || !1;
  t.__themes || (t.__themes = { cacheKey: null, keys: /* @__PURE__ */ new Set() });
  let o = s || "", l = {};
  if (s === "default" && ((d = t.__themes) == null ? void 0 : d.cacheKey) === "default")
    return;
  if (s && s !== "default" && ((p = e == null ? void 0 : e.themes) != null && p[s])) {
    const { modes: _, ...m } = e.themes[s] || {};
    l = { ...l, ...m }, _ && (n && _.dark ? l = { ...l, ..._.dark } : !n && _.light && (l = { ...l, ..._.light }));
  } else if (!s && (!((h = t.__themes) != null && h.keys) || t.__themes.keys.size === 0))
    return;
  const c = ((g = t.__themes) == null ? void 0 : g.keys) || /* @__PURE__ */ new Set(), u = new Set(Object.keys(l));
  if (s === "default" && u.size === 0) {
    for (const _ of c)
      try {
        t.style.removeProperty(`--${_}`);
      } catch {
      }
    t.__themes = { cacheKey: "default", keys: /* @__PURE__ */ new Set() };
    return;
  }
  if (((y = t.__themes) == null ? void 0 : y.cacheKey) === o) {
    let _ = !0;
    if (c.size !== u.size)
      _ = !1;
    else
      for (const m of c)
        if (!u.has(m)) {
          _ = !1;
          break;
        }
    if (_) return;
  }
  for (const _ of c)
    if (!u.has(_))
      try {
        t.style.removeProperty(`--${_}`);
      } catch {
      }
  for (const [_, m] of Object.entries(l))
    t.style.setProperty(`--${_}`, String(m));
  t.__themes.cacheKey = o || null, t.__themes.keys = u;
}, B = (t, e, a, r) => {
  r = r || {}, a = a ?? {};
  const i = new Event(e, {
    bubbles: r.bubbles === void 0 ? !0 : r.bubbles,
    cancelable: !!r.cancelable,
    composed: r.composed === void 0 ? !0 : r.composed
  });
  return i.detail = a, t.dispatchEvent(i), i;
}, x = (t) => t.substr(0, t.indexOf(".")), ls = (t) => (e, a) => t.includes(e, a), vt = "unavailable", cs = "unknown", us = "off", ds = [vt, cs], hs = ls(ds), ps = (t) => {
  const e = t.attributes.entity_id || [], a = [
    ...new Set(e.map((r) => x(r)))
  ];
  return a.length === 1 ? a[0] : void 0;
};
function ms(t) {
  return Array.isArray(t) ? t.reverse().reduce((e, a) => `var(${a}${e ? `, ${e}` : ""})`, void 0) : `var(${t})`;
}
const fs = (t, e = "_") => {
  const a = "àáâäæãåāăąабçćčđďдèéêëēėęěеёэфğǵгḧхîïíīįìıİийкłлḿмñńǹňнôöòóœøōõőоṕпŕřрßśšşșсťțтûüùúūǘůűųувẃẍÿýыžźżз·", r = `aaaaaaaaaaabcccdddeeeeeeeeeeefggghhiiiiiiiiijkllmmnnnnnoooooooooopprrrsssssstttuuuuuuuuuuvwxyyyzzzz${e}`, i = new RegExp(a.split("").join("|"), "g"), s = {
    ж: "zh",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ю: "iu",
    я: "ia"
  };
  let n;
  return t === "" ? n = "" : (n = t.toString().toLowerCase().replace(i, (o) => r.charAt(a.indexOf(o))).replace(/[а-я]/g, (o) => s[o] || "").replace(/(\d),(?=\d)/g, "$1").replace(/[^a-z0-9]+/g, e).replace(new RegExp(`(${e})\\1+`, "g"), "$1").replace(new RegExp(`^${e}+`), "").replace(new RegExp(`${e}+$`), ""), n === "" && (n = "unknown")), n;
}, gs = (t) => {
  const e = Number(t);
  if (!isNaN(e))
    return e >= 70 ? "--state-sensor-battery-high-color" : e >= 30 ? "--state-sensor-battery-medium-color" : "--state-sensor-battery-low-color";
};
function _s(t, e) {
  const a = x(t.entity_id), r = t == null ? void 0 : t.state;
  if (["button", "event", "input_button", "scene"].includes(a))
    return r !== vt;
  if (hs(r) || r === us && a !== "alert")
    return !1;
  switch (a) {
    case "alarm_control_panel":
      return r !== "disarmed";
    case "alert":
      return r !== "idle";
    case "cover":
      return r !== "closed";
    case "device_tracker":
    case "person":
      return r !== "not_home";
    case "lawn_mower":
      return ["mowing", "error"].includes(r);
    case "lock":
      return r !== "locked";
    case "media_player":
      return r !== "standby";
    case "vacuum":
      return !["idle", "docked", "paused"].includes(r);
    case "valve":
      return r !== "closed";
    case "plant":
      return r === "problem";
    case "group":
      return ["on", "home", "open", "locked", "problem"].includes(r);
    case "timer":
      return r === "active";
    case "camera":
      return r === "streaming";
  }
  return !0;
}
const ya = /* @__PURE__ */ new Set([
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
]), vs = (t, e, a, r) => {
  const i = [], s = fs(a, "_"), n = r ? "active" : "inactive";
  return e && i.push(`--state-${t}-${e}-${s}-color`), i.push(
    `--state-${t}-${s}-color`,
    `--state-${t}-${n}-color`,
    `--state-${n}-color`
  ), i;
}, Ca = (t, e, a) => {
  const r = e.state, i = _s(e);
  return vs(
    t,
    e.attributes.device_class,
    r,
    i
  );
}, ks = (t, e) => {
  const a = t == null ? void 0 : t.state, r = x(t.entity_id), i = t.attributes.device_class;
  if (r === "sensor" && i === "battery") {
    const s = gs(a);
    if (s)
      return [s];
  }
  if (r === "group") {
    const s = ps(t);
    if (s && ya.has(s))
      return Ca(s, t);
  }
  if (ya.has(r))
    return Ca(r, t);
}, bs = (t, e) => {
  if ((t == null ? void 0 : t.state) === vt)
    return "var(--state-unavailable-color)";
  const r = ks(t);
  if (r)
    return ms(r);
}, ys = (t) => {
  const e = x(t.entity_id), a = t.state;
  if (e === "light" && a === "on") {
    const r = t.attributes.rgb_color;
    if (r)
      return `rgb(${r.join(",")})`;
  }
  return bs(t);
};
L(
  (t) => new Intl.Collator(t)
);
const Cs = L(
  (t) => new Intl.Collator(t, { sensitivity: "accent" })
), As = (t, e) => t < e ? -1 : t > e ? 1 : 0, xa = (t, e, a = void 0) => Intl != null && Intl.Collator ? Cs(a).compare(t, e) : As(t.toLowerCase(), e.toLowerCase()), je = (t, e) => {
  if (t === e)
    return !0;
  if (t && e && typeof t == "object" && typeof e == "object") {
    if (t.constructor !== e.constructor)
      return !1;
    let a, r;
    if (Array.isArray(t)) {
      if (r = t.length, r !== e.length)
        return !1;
      for (a = r; a-- !== 0; )
        if (!je(t[a], e[a]))
          return !1;
      return !0;
    }
    if (t instanceof Map && e instanceof Map) {
      if (t.size !== e.size)
        return !1;
      for (a of t.entries())
        if (!e.has(a[0]))
          return !1;
      for (a of t.entries())
        if (!je(a[1], e.get(a[0])))
          return !1;
      return !0;
    }
    if (t instanceof Set && e instanceof Set) {
      if (t.size !== e.size)
        return !1;
      for (a of t.entries())
        if (!e.has(a[0]))
          return !1;
      return !0;
    }
    if (ArrayBuffer.isView(t) && ArrayBuffer.isView(e)) {
      if (r = t.length, r !== e.length)
        return !1;
      for (a = r; a-- !== 0; )
        if (t[a] !== e[a])
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === e.source && t.flags === e.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === e.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === e.toString();
    const i = Object.keys(t);
    if (r = i.length, r !== Object.keys(e).length)
      return !1;
    for (a = r; a-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(e, i[a]))
        return !1;
    for (a = r; a-- !== 0; ) {
      const s = i[a];
      if (!je(t[s], e[s]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
};
class Ls extends HTMLElement {
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
  bind(e, a = {}) {
    e.actionHandler && je(a, e.actionHandler.options) || (e.actionHandler && (e.removeEventListener("touchstart", e.actionHandler.start), e.removeEventListener("touchend", e.actionHandler.end), e.removeEventListener("touchcancel", e.actionHandler.end), e.removeEventListener("mousedown", e.actionHandler.start), e.removeEventListener("click", e.actionHandler.end), e.removeEventListener(
      "keydown",
      e.actionHandler.handleKeyDown
    )), e.actionHandler = { options: a }, !a.disabled && (e.actionHandler.start = (r) => {
      this.cancelled = !1, r.touches ? (r.touches[0].clientX, r.touches[0].clientY) : (r.clientX, r.clientY), a.hasHold && (this.held = !1, this.timer = window.setTimeout(() => {
        this.held = !0;
      }, this.holdTime));
    }, e.actionHandler.end = (r) => {
      if (r.currentTarget !== r.target || r.type === "touchcancel" || r.type === "touchend" && this.cancelled)
        return;
      const i = r.target;
      r.cancelable && r.preventDefault(), a.hasHold && (clearTimeout(this.timer), this.timer = void 0), a.hasHold && this.held ? B(i, "action", { action: "hold" }) : a.hasDoubleClick ? r.type === "click" && r.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, B(i, "action", { action: "tap" });
      }, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, B(i, "action", { action: "double_tap" })) : B(i, "action", { action: "tap" });
    }, e.actionHandler.handleKeyDown = (r) => {
      ["Enter", " "].includes(r.key) && r.currentTarget.actionHandler.end(r);
    }, e.addEventListener("touchstart", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("touchend", e.actionHandler.end), e.addEventListener("touchcancel", e.actionHandler.end), e.addEventListener("mousedown", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("click", e.actionHandler.end), e.addEventListener("keydown", e.actionHandler.handleKeyDown)));
  }
}
customElements.define("action-handler-status-card", Ls);
const Hs = () => {
  const t = document.body;
  if (t.querySelector("action-handler-status-card"))
    return t.querySelector(
      "action-handler-status-card"
    );
  const e = document.createElement(
    "action-handler-status-card"
  );
  return t.appendChild(e), e;
}, Vs = (t, e) => {
  const a = Hs();
  a && a.bind(t, e);
}, zs = Be(
  class extends Oe {
    update(t, [e]) {
      return Vs(t.element, e), F;
    }
    render(t) {
    }
  }
), Ms = async (t, e, a, r) => {
  B(t, "hass-action", { config: a, action: r });
};
function Aa(t) {
  return t !== void 0 && t.action !== "none";
}
function at(t, e, a) {
  return t.callWS({ type: `config/${e}_registry/list` }).then((r) => r.reduce((i, s) => {
    const n = s[a];
    return (typeof n == "string" || typeof n == "number") && (i[String(n)] = s), i;
  }, {}));
}
function Ia(t, e, a, r, i) {
  const s = r.area && r.area.length > 0 ? Array.isArray(r.area) ? r.area : [r.area] : null, n = r.floor && r.floor.length > 0 ? Array.isArray(r.floor) ? r.floor : [r.floor] : null, o = r.label && r.label.length > 0 ? Array.isArray(r.label) ? r.label : [r.label] : null, l = r.hiddenAreas || [], c = r.hiddenLabels || [], u = r.hiddenEntities || [], d = new Set(l), p = new Set(c), h = new Set(u), g = new Set(i), y = new Map(Object.values(e).map((m) => [m.id, m])), _ = new Map(
    Object.values(a).map((m) => [
      m.area_id,
      m.floor_id
    ])
  );
  return Object.values(t).filter((m) => {
    var b, H, E;
    const v = m.entity_id.split(".")[0];
    if (!g.has(v)) return !1;
    if (v === "update")
      return !m.hidden;
    const k = m.device_id ? y.get(m.device_id) : void 0;
    if (!(m.area_id != null || k && k.area_id != null) || o && !((((b = m.labels) == null ? void 0 : b.some((U) => o.includes(U))) ?? !1) || (((H = k == null ? void 0 : k.labels) == null ? void 0 : H.some((U) => o.includes(U))) ?? !1)) || s && !(m.area_id !== void 0 && m.area_id !== null && s.includes(m.area_id) || k && k.area_id !== void 0 && k.area_id !== null && s.includes(k.area_id)))
      return !1;
    if (n) {
      const D = m.area_id ? _.get(m.area_id) : void 0, U = k != null && k.area_id ? _.get(k.area_id) : void 0;
      if (!(D && n.includes(D) || U && n.includes(U))) return !1;
    }
    return d.size && (m.area_id && d.has(m.area_id) || k && k.area_id && d.has(k.area_id)) || (E = m.labels) != null && E.some((D) => p.has(D)) || h.has(m.entity_id) ? !1 : !m.hidden;
  }).map((m) => m.entity_id);
}
function Da(t, e) {
  const a = {};
  for (const r of t) {
    const i = r.split(".")[0], s = e[r];
    s && (a[i] || (a[i] = [])).push(s);
  }
  return a;
}
function La(t, e, a, r, i, s) {
  const n = Ia(
    t,
    e,
    a,
    i,
    s
  );
  return Da(n, r);
}
function G(t, e) {
  return e ? `${t} - ${e}` : t;
}
function Ha(t, e) {
  var a, r;
  return ((r = (a = t == null ? void 0 : t[e]) == null ? void 0 : a.attributes) == null ? void 0 : r.friendly_name) || e;
}
function Ie(t, e) {
  return (a, r) => xa(
    Ha(t, a),
    Ha(t, r),
    e
  );
}
function Q(t, e) {
  if (t === e) return !0;
  if (!Array.isArray(t) || !Array.isArray(e) || t.length !== e.length) return !1;
  const a = new Set(e);
  for (const r of t)
    if (!a.has(r)) return !1;
  return !0;
}
function ws(t) {
  return {
    type: "tile",
    entity: t.entity
  };
}
function nt(t, e, a, r = !1) {
  const i = e || x(t.entity_id);
  if (a ?? t.attributes.device_class, i === "climate") {
    const n = t.attributes.hvac_action;
    if (n !== void 0) {
      const o = !["idle", "off"].includes(n);
      return r ? !o : o;
    }
  }
  if (i === "humidifier") {
    const n = t.attributes.action;
    if (n !== void 0) {
      const o = !["idle", "off"].includes(n);
      return r ? !o : o;
    }
  }
  const s = !_t.includes(t.state);
  return r ? !s : s;
}
let W = null;
function $s(t, e) {
  var a, r;
  try {
    const i = e.type || "tile", n = typeof i == "string" && i.startsWith("custom:") ? i.slice(7) : `hui-${i}-card`;
    if (customElements.get(n)) {
      const o = document.createElement(n);
      return typeof o.setConfig == "function" && o.setConfig(e), o.hass = t, (a = o.setAttribute) == null || a.call(o, "data-hui-card", ""), o;
    }
  } catch (i) {
    console.debug("status-card: Failed to create card element via customElements", i);
  }
  if (W != null && W.createCardElement)
    try {
      const i = W.createCardElement(e);
      return i instanceof Promise ? void 0 : (i.hass = t, (r = i.setAttribute) == null || r.call(i, "data-hui-card", ""), i);
    } catch (i) {
      console.debug("status-card: Failed to create card element via helpers", i);
      return;
    }
}
async function Ta(t, e, a = !1) {
  var r, i, s;
  try {
    W || (W = await ((r = window.loadCardHelpers) == null ? void 0 : r.call(window)));
    const n = W;
    if (n != null && n.createCardElement) {
      const o = n.createCardElement(e);
      return o.hass = t, (i = o.setAttribute) == null || i.call(o, "data-hui-card", ""), o;
    }
  } catch (n) {
    console.debug("status-card: Failed to load card helpers", n);
  }
  try {
    const n = e.type || "tile", o = typeof n == "string" && n.startsWith("custom:"), l = o ? n.slice(7) : `hui-${n}-card`;
    o && !customElements.get(l) && await customElements.whenDefined(l).catch(() => {
    });
    const c = document.createElement(l);
    return typeof c.setConfig == "function" && c.setConfig(e), c.hass = t, (s = c.setAttribute) == null || s.call(c, "data-hui-card", ""), c;
  } catch (n) {
    if (console.debug("status-card: Failed to create card element for type:", e.type, n), !a)
      return Ta(t, ws(e), !0);
    const o = document.createElement("div");
    return o.setAttribute("data-hui-card", ""), o;
  }
}
async function Ss() {
  var t;
  if (!W)
    try {
      W = await ((t = window.loadCardHelpers) == null ? void 0 : t.call(window));
    } catch (e) {
      console.debug("status-card: Failed to load card helpers", e);
    }
}
const ae = {
  alarm_control_panel: { on: Hr, off: Vr },
  siren: { on: Pr, off: Ot },
  lock: { on: aa, off: ta },
  light: { on: ui, off: di },
  media_player: { on: Gr, off: Rr },
  climate: { on: Ni, off: Ki },
  humidifier: { on: Ar, off: Lr },
  switch: {
    on: Xe,
    off: et,
    switch: { on: Xe, off: et },
    outlet: { on: na, off: oa }
  },
  vacuum: { on: $i, off: Si },
  lawn_mower: { on: la, off: la },
  fan: { on: Yr, off: Qr },
  cover: {
    on: Ye,
    off: Je,
    garage: { on: Ye, off: Je },
    door: { on: Wt, off: Ut },
    gate: { on: ii, off: ri },
    blind: { on: Ir, off: xr },
    curtain: { on: Wr, off: qr },
    damper: { on: Ji, off: ma },
    awning: { on: Bt, off: Bt },
    shutter: { on: ns, off: ss },
    shade: { on: Ei, off: ji },
    window: { on: ba, off: ka }
  },
  binary_sensor: {
    on: Qe,
    off: Qe,
    motion: { on: gi, off: _i },
    moisture: { on: Xi, off: ts },
    window: { on: ba, off: ka },
    door: { on: Wt, off: Ut },
    lock: { on: aa, off: ta },
    presence: { on: oi, off: ni },
    occupancy: { on: Pi, off: xi },
    vibration: { on: Yi, off: Qi },
    opening: { on: Bi, off: Ti },
    garage_door: { on: Ye, off: Je },
    problem: {
      on: Mr,
      off: zr
    },
    smoke: {
      on: Gi,
      off: Oi
    },
    running: { on: Ci, off: bi },
    plug: { on: na, off: oa },
    power: { on: Ai, off: Qe },
    battery: { on: $r, off: wr },
    battery_charging: { on: Sr, off: Er },
    gas: { on: ai, off: ti },
    carbon_monoxide: { on: sa, off: sa },
    cold: { on: Ri, off: Zi },
    heat: { on: va, off: is },
    connectivity: { on: Nt, off: Nt },
    safety: { on: Ii, off: Di },
    sound: { on: fa, off: ga },
    update: { on: Dt, off: Tt },
    tamper: { on: da, off: da },
    light: { on: pi, off: hi },
    moving: { on: Br, off: Or }
  },
  person: { on: Pt, off: xt },
  device_tracker: { on: Pt, off: xt },
  valve: { on: qi, off: ma },
  water_heater: { on: es, off: as },
  remote: { on: Vi, off: zi },
  update: { on: Dt, off: Tt },
  air_quality: { on: It, off: It },
  camera: { on: Dr, off: Tr },
  calendar: { on: Gt, off: Rt },
  scene: { on: vi, off: ki },
  notifications: { on: jr, off: Ot },
  sensor: { on: Yt, off: Yt },
  script: { on: ua, off: ua },
  tags: { on: ha, off: ha },
  select: { on: Me, off: Me },
  automation: { on: Mi, off: wi },
  button: { on: Qt, off: Qt },
  number: { on: we, off: we },
  conversation: { on: Ft, off: Ft },
  assist_satellite: {
    on: ca,
    off: ca
  },
  counter: { on: Kt, off: Kt },
  event: { on: Zt, off: Zt },
  group: {
    on: Xt,
    off: Xt
  },
  image: { on: li, off: ci },
  image_processing: {
    on: ea,
    off: ea
  },
  input_boolean: { on: Xe, off: et },
  input_datetime: { on: ze, off: ze },
  input_number: { on: we, off: we },
  input_select: {
    on: Me,
    off: Me
  },
  input_text: { on: $e, off: $e },
  stt: { on: Hi, off: Li },
  sun: { on: va, off: _a },
  text: { on: $e, off: $e },
  date: { on: Gt, off: Rt },
  datetime: { on: ze, off: ze },
  time: { on: Kr, off: Ur },
  timer: { on: Wi, off: Ui },
  todo: {
    on: Zr,
    off: Fr
  },
  tts: { on: fa, off: ga },
  wake_word: { on: mi, off: fi },
  weather: { on: rs, off: _a },
  zone: { on: ra, off: ia },
  geo_location: { on: ra, off: ia }
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
], Es = [
  "light",
  "switch",
  "fan",
  "cover",
  "siren",
  "climate",
  "humidifier",
  "valve",
  "remote"
], js = [
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
], Ps = {
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
}, xs = {
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
}, Is = {
  area_all: {
    en: "Toggle all in {area}",
    ar: "تبديل الكل في {area}",
    bg: "Превключи всичко в {area}",
    bn: "{area} এ সব টগল করুন",
    bs: "Prebaci sve u {area}",
    cs: "Přepnout vše v {area}",
    da: "Skift alt i {area}",
    de: "Alles in {area} umschalten",
    el: "Εναλλαγή όλων στην {area}",
    "en-GB": "Toggle all in {area}",
    es: "Alternar todo en {area}",
    "es-419": "Alternar todo en {area}",
    et: "Lülita kõik {area} piirkonnas",
    eu: "Aldatu dena {area}-n",
    fa: "تغییر وضعیت همه در {area}",
    fi: "Vaihda kaikki kohteessa {area}",
    fr: "Basculer tout dans {area}",
    "fr-CA": "Basculer tout dans {area}",
    gl: "Alternar todo en {area}",
    he: "החלף הכל ב-{area}",
    hi: "{area} में सब बदलें",
    hu: "Mindent vált a {area} területen",
    hy: "Փոխարկել բոլորը {area} տարածքում",
    id: "Alihkan Semua di {area}",
    it: "Alterna tutto in {area}",
    ja: "{area}のすべてを切り替え",
    ka: "{area}-ში ყველაფრის გადართვა",
    ko: "{area}의 모든 항목 전환",
    lt: "Perjungti viską vietovėje {area}",
    lv: "Pārslēgt visu apgabalā {area}",
    mk: "Превклучи сè во {area}",
    nl: "Alles omschakelen in {area}",
    nn: "Veksle alt i {area}",
    no: "Veksle alt i {area}",
    pl: "Przełącz wszystko w {area}",
    pt: "Alternar tudo em {area}",
    "pt-BR": "Alternar tudo em {area}",
    ro: "Comută tot în {area}",
    ru: "Переключить всё в {area}",
    sk: "Prepínať všetko v {area}",
    sl: "Prekleni vse v {area}",
    sr: "Пребаци све у {area}",
    sv: "Växla allt i {area}",
    th: "สลับทั้งหมดใน {area}",
    tr: "{area} içinde tümünü değiştir",
    uk: "Перемкнути все в {area}",
    ur: "{area} میں سب تبدیل کریں",
    vi: "Chuyển đổi tất cả trong {area}",
    "zh-Hans": "切换 {area} 中的所有项",
    "zh-Hant": "切換 {area} 中的所有項目"
  },
  area_light: {
    en: "Toggle lights in {area}",
    ar: "تبديل الأضواء في {area}",
    bg: "Превключи светлините в {area}",
    bn: "{area} এর লাইট টগল করুন",
    bs: "Prebaci svjetla u {area}",
    cs: "Přepnout světla v {area}",
    da: "Skift lys i {area}",
    de: "Lichter in {area} umschalten",
    el: "Εναλλαγή φώτων στην {area}",
    "en-GB": "Toggle lights in {area}",
    es: "Alternar luces en {area}",
    "es-419": "Alternar luces en {area}",
    et: "Lülita tuled {area} piirkonnas",
    eu: "Aldatu argiak {area}-n",
    fa: "تغییر وضعیت چراغ‌ها در {area}",
    fi: "Vaihda valot kohteessa {area}",
    fr: "Basculer les lumières dans {area}",
    "fr-CA": "Basculer les lumières dans {area}",
    gl: "Alternar luces en {area}",
    he: "החלף אורות ב-{area}",
    hi: "{area} में लाइट बदलें",
    hu: "Lámpák vált a {area} területen",
    hy: "Փոխարկել լույսերը {area} տարածքում",
    id: "Alihkan Lampu di {area}",
    it: "Alterna le luci in {area}",
    ja: "{area}の照明を切り替え",
    ka: "{area}-ში განათების გადართვა",
    ko: "{area} 조명 전환",
    lt: "Perjungti šviesas vietovėje {area}",
    lv: "Pārslēgt gaismas apgabalā {area}",
    mk: "Превклучи светла во {area}",
    nl: "Lichten omschakelen in {area}",
    nn: "Veksle lys i {area}",
    no: "Veksle lys i {area}",
    pl: "Przełącz światła w {area}",
    pt: "Alternar luzes em {area}",
    "pt-BR": "Alternar luzes em {area}",
    ro: "Comută luminile în {area}",
    ru: "Переключить свет в {area}",
    sk: "Prepínať svetlá v {area}",
    sl: "Prekleni luči v {area}",
    sr: "Пребаци светла у {area}",
    sv: "Växla ljus i {area}",
    th: "สลับไฟใน {area}",
    tr: "{area} içinde ışıkları değiştir",
    uk: "Перемкнути світло в {area}",
    ur: "{area} میں لائٹس تبدیل کریں",
    vi: "Chuyển đổi đèn trong {area}",
    "zh-Hans": "切换 {area} 的灯光",
    "zh-Hant": "切換 {area} 的燈光"
  },
  area_switch: {
    en: "Toggle switches in {area}",
    ar: "تبديل المفاتيح في {area}",
    bg: "Превключи превключвателите в {area}",
    bn: "{area} এর সুইচ টগল করুন",
    bs: "Prebaci prekidače u {area}",
    cs: "Přepnout vypínače v {area}",
    da: "Skift kontakter i {area}",
    de: "Schalter in {area} umschalten",
    el: "Εναλλαγή διακοπτών στην {area}",
    "en-GB": "Toggle switches in {area}",
    es: "Alternar interruptores en {area}",
    "es-419": "Alternar interruptores en {area}",
    et: "Lülita lülitid {area} piirkonnas",
    eu: "Aldatu etengailuak {area}-n",
    fa: "تغییر وضعیت کلیدها در {area}",
    fi: "Vaihda kytkimet kohteessa {area}",
    fr: "Basculer les interrupteurs dans {area}",
    "fr-CA": "Basculer les interrupteurs dans {area}",
    gl: "Alternar interruptores en {area}",
    he: "החלף מתגים ב-{area}",
    hi: "{area} में स्विच बदलें",
    hu: "Kapcsolók vált a {area} területen",
    hy: "Փոխարկել անջատիչները {area} տարածքում",
    id: "Alihkan Saklar di {area}",
    it: "Alterna gli interruttori in {area}",
    ja: "{area}のスイッチを切り替え",
    ka: "{area}-ში გადართველების გადართვა",
    ko: "{area} 스위치 전환",
    lt: "Perjungti jungiklius vietovėje {area}",
    lv: "Pārslēgt slēdžus apgabalā {area}",
    mk: "Превклучи прекинувачи во {area}",
    nl: "Schakelaars omschakelen in {area}",
    nn: "Veksle brytarar i {area}",
    no: "Veksle brytere i {area}",
    pl: "Przełącz przełączniki w {area}",
    pt: "Alternar interruptores em {area}",
    "pt-BR": "Alternar interruptores em {area}",
    ro: "Comută întrerupătoarele în {area}",
    ru: "Переключить выключатели в {area}",
    sk: "Prepínať vypínače v {area}",
    sl: "Prekleni stikala v {area}",
    sr: "Пребаци прекидаче у {area}",
    sv: "Växla brytare i {area}",
    th: "สลับสวิตช์ใน {area}",
    tr: "{area} içinde anahtarları değiştir",
    uk: "Перемкнути вимикачі в {area}",
    ur: "{area} میں سوئچ تبدیل کریں",
    vi: "Chuyển đổi công tắc trong {area}",
    "zh-Hans": "切换 {area} 的开关",
    "zh-Hant": "切換 {area} 的開關"
  },
  area_fan: {
    en: "Toggle fans in {area}",
    ar: "تبديل المراوح في {area}",
    bg: "Превключи вентилаторите в {area}",
    bn: "{area} এর পাখা টগল করুন",
    bs: "Prebaci ventilatore u {area}",
    cs: "Přepnout ventilátory v {area}",
    da: "Skift ventilatorer i {area}",
    de: "Ventilatoren in {area} umschalten",
    el: "Εναλλαγή ανεμιστήρων στην {area}",
    "en-GB": "Toggle fans in {area}",
    es: "Alternar ventiladores en {area}",
    "es-419": "Alternar ventiladores en {area}",
    et: "Lülita ventilaatorid {area} piirkonnas",
    eu: "Aldatu haizagailuak {area}-n",
    fa: "تغییر وضعیت فن‌ها در {area}",
    fi: "Vaihda tuulettimet kohteessa {area}",
    fr: "Basculer les ventilateurs dans {area}",
    "fr-CA": "Basculer les ventilateurs dans {area}",
    gl: "Alternar ventiladores en {area}",
    he: "החלף מאווררים ב-{area}",
    hi: "{area} में पंखे बदलें",
    hu: "Ventilátorok vált a {area} területen",
    hy: "Փոխարկել օդափոխիչները {area} տարածքում",
    id: "Alihkan Kipas di {area}",
    it: "Alterna le ventole in {area}",
    ja: "{area}の扇風機を切り替え",
    ka: "{area}-ში ვენტილატორების გადართვა",
    ko: "{area} 선풍기 전환",
    lt: "Perjungti ventilatorius vietovėje {area}",
    lv: "Pārslēgt ventilatorus apgabalā {area}",
    mk: "Превклучи вентилатори во {area}",
    nl: "Ventilatoren omschakelen in {area}",
    nn: "Veksle vifter i {area}",
    no: "Veksle vifter i {area}",
    pl: "Przełącz wentylatory w {area}",
    pt: "Alternar ventiladores em {area}",
    "pt-BR": "Alternar ventiladores em {area}",
    ro: "Comută ventilatoarele în {area}",
    ru: "Переключить вентиляторы в {area}",
    sk: "Prepínať ventilátory v {area}",
    sl: "Prekleni ventilatorje v {area}",
    sr: "Пребаци вентилаторе у {area}",
    sv: "Växla fläktar i {area}",
    th: "สลับพัดลมใน {area}",
    tr: "{area} içinde fanları değiştir",
    uk: "Перемкнути вентилятори в {area}",
    ur: "{area} میں پنکھے تبدیل کریں",
    vi: "Chuyển đổi quạt trong {area}",
    "zh-Hans": "切换 {area} 的风扇",
    "zh-Hant": "切換 {area} 的風扇"
  },
  area_cover: {
    en: "Toggle covers in {area}",
    ar: "تبديل الأغطية في {area}",
    bg: "Превключи щорите в {area}",
    bn: "{area} এর কভার টগল করুন",
    bs: "Prebaci pokrivače u {area}",
    cs: "Přepnout rolety v {area}",
    da: "Skift gardiner i {area}",
    de: "Beschattungen in {area} umschalten",
    el: "Εναλλαγή σκιάστρων στην {area}",
    "en-GB": "Toggle covers in {area}",
    es: "Alternar persianas en {area}",
    "es-419": "Alternar persianas en {area}",
    et: "Lülita rulood {area} piirkonnas",
    eu: "Aldatu pertsianak {area}-n",
    fa: "تغییر وضعیت پرده‌ها در {area}",
    fi: "Vaihda kaihtimet kohteessa {area}",
    fr: "Basculer les volets dans {area}",
    "fr-CA": "Basculer les volets dans {area}",
    gl: "Alternar toldos en {area}",
    he: "החלף וילונות ב-{area}",
    hi: "{area} में कवर बदलें",
    hu: "Reluxák vált a {area} területen",
    hy: "Փոխարկել շերտավարագույրները {area} տարածքում",
    id: "Alihkan Tirai di {area}",
    it: "Alterna le tapparelle in {area}",
    ja: "{area}のカバーを切り替え",
    ka: "{area}-ში ჟალუზების გადართვა",
    ko: "{area} 커버 전환",
    lt: "Perjungti žaliuzes vietovėje {area}",
    lv: "Pārslēgt žalūzijas apgabalā {area}",
    mk: "Превклучи ролетни во {area}",
    nl: "Afdekkingen omschakelen in {area}",
    nn: "Veksle persienner i {area}",
    no: "Veksle persienner i {area}",
    pl: "Przełącz rolety w {area}",
    pt: "Alternar persianas em {area}",
    "pt-BR": "Alternar persianas em {area}",
    ro: "Comută jaluzelele în {area}",
    ru: "Переключить жалюзи в {area}",
    sk: "Prepínať rolety v {area}",
    sl: "Prekleni polkna v {area}",
    sr: "Пребаци ролетне у {area}",
    sv: "Växla persienner i {area}",
    th: "สลับมู่ลี่ใน {area}",
    tr: "{area} içinde perdeleri değiştir",
    uk: "Перемкнути жалюзі в {area}",
    ur: "{area} میں کور تبدیل کریں",
    vi: "Chuyển đổi rèm trong {area}",
    "zh-Hans": "切换 {area} 的卷帘",
    "zh-Hant": "切換 {area} 的窗簾"
  },
  area_siren: {
    en: "Toggle sirens in {area}",
    ar: "تبديل صفارات الإنذار في {area}",
    bg: "Превключи сирените в {area}",
    bn: "{area} এর সাইরেন টগল করুন",
    bs: "Prebaci sirene u {area}",
    cs: "Přepnout sirény v {area}",
    da: "Skift sirener i {area}",
    de: "Sirenen in {area} umschalten",
    el: "Εναλλαγή σειρήνων στην {area}",
    "en-GB": "Toggle sirens in {area}",
    es: "Alternar sirenas en {area}",
    "es-419": "Alternar sirenas en {area}",
    et: "Lülita sireenid {area} piirkonnas",
    eu: "Aldatu sirenak {area}-n",
    fa: "تغییر وضعیت آژیرها در {area}",
    fi: "Vaihda sireenit kohteessa {area}",
    fr: "Basculer les sirènes dans {area}",
    "fr-CA": "Basculer les sirènes dans {area}",
    gl: "Alternar sirenas en {area}",
    he: "החלף צופרים ב-{area}",
    hi: "{area} में सायरन बदलें",
    hu: "Szirénák vált a {area} területen",
    hy: "Փոխարկել ազդանշանները {area} տարածքում",
    id: "Alihkan Sirine di {area}",
    it: "Alterna le sirene in {area}",
    ja: "{area}のサイレンを切り替え",
    ka: "{area}-ში სირენების გადართვა",
    ko: "{area} 사이렌 전환",
    lt: "Perjungti sirenas vietovėje {area}",
    lv: "Pārslēgt sirēnas apgabalā {area}",
    mk: "Превклучи сирени во {area}",
    nl: "Sirenes omschakelen in {area}",
    nn: "Veksle sirener i {area}",
    no: "Veksle sirener i {area}",
    pl: "Przełącz syreny w {area}",
    pt: "Alternar sirenes em {area}",
    "pt-BR": "Alternar sirenes em {area}",
    ro: "Comută sirenele în {area}",
    ru: "Переключить сирены в {area}",
    sk: "Prepínať sirény v {area}",
    sl: "Prekleni sirene v {area}",
    sr: "Пребаци сирене у {area}",
    sv: "Växla sirener i {area}",
    th: "สลับไซเรนใน {area}",
    tr: "{area} içinde sirenleri değiştir",
    uk: "Перемкнути сирени в {area}",
    ur: "{area} میں سائرن تبدیل کریں",
    vi: "Chuyển đổi còi báo động trong {area}",
    "zh-Hans": "切换 {area} 的警报器",
    "zh-Hant": "切換 {area} 的警報器"
  },
  area_climate: {
    en: "Toggle climate in {area}",
    ar: "تبديل المناخ في {area}",
    bg: "Превключи климатика в {area}",
    bn: "{area} এর ক্লাইমেট টগল করুন",
    bs: "Prebaci klimu u {area}",
    cs: "Přepnout klima v {area}",
    da: "Skift klima i {area}",
    de: "Klimaanlage in {area} umschalten",
    el: "Εναλλαγή κλίματος στην {area}",
    "en-GB": "Toggle climate in {area}",
    es: "Alternar clima en {area}",
    "es-419": "Alternar clima en {area}",
    et: "Lülita kliima {area} piirkonnas",
    eu: "Aldatu klima {area}-n",
    fa: "تغییر وضعیت سیستم آب و هوا در {area}",
    fi: "Vaihda ilmastointi kohteessa {area}",
    fr: "Basculer le climatiseur dans {area}",
    "fr-CA": "Basculer le climatiseur dans {area}",
    gl: "Alternar clima en {area}",
    he: "החלף אקלים ב-{area}",
    hi: "{area} में क्लाइमेट बदलें",
    hu: "Klíma vált a {area} területen",
    hy: "Փոխարկել կլիման {area} տարածքում",
    id: "Alihkan AC di {area}",
    it: "Alterna il clima in {area}",
    ja: "{area}の空調を切り替え",
    ka: "{area}-ში კლიმატის გადართვა",
    ko: "{area} 기기 전환",
    lt: "Perjungti klimatą vietovėje {area}",
    lv: "Pārslēgt klimatu apgabalā {area}",
    mk: "Превклучи клима во {area}",
    nl: "Klimaat omschakelen in {area}",
    nn: "Veksle klima i {area}",
    no: "Veksle klima i {area}",
    pl: "Przełącz klimatyzację w {area}",
    pt: "Alternar clima em {area}",
    "pt-BR": "Alternar clima em {area}",
    ro: "Comută climatizarea în {area}",
    ru: "Переключить климат в {area}",
    sk: "Prepínať klimatizáciu v {area}",
    sl: "Prekleni klimo v {area}",
    sr: "Пребаци климу у {area}",
    sv: "Växla klimat i {area}",
    th: "สลับระบบอากาศใน {area}",
    tr: "{area} içinde iklimi değiştir",
    uk: "Перемкнути клімат в {area}",
    ur: "{area} میں کلائمیٹ تبدیل کریں",
    vi: "Chuyển đổi điều hòa trong {area}",
    "zh-Hans": "切换 {area} 的气候调节",
    "zh-Hant": "切換 {area} 的氣候調節"
  },
  area_humidifier: {
    en: "Toggle humidifiers in {area}",
    ar: "تبديل أجهزة الترطيب في {area}",
    bg: "Превключи овлажнителите в {area}",
    bn: "{area} এর হিউমিডিফায়ার টগল করুন",
    bs: "Prebaci ovlaživače u {area}",
    cs: "Přepnout zvlhčovače v {area}",
    da: "Skift luftfugtere i {area}",
    de: "Luftbefeuchter in {area} umschalten",
    el: "Εναλλαγή υγραντήρων στην {area}",
    "en-GB": "Toggle humidifiers in {area}",
    es: "Alternar humidificadores en {area}",
    "es-419": "Alternar humidificadores en {area}",
    et: "Lülita niisutajad {area} piirkonnas",
    eu: "Aldatu hezegailuak {area}-n",
    fa: "تغییر وضعیت مرطوب‌کننده‌ها در {area}",
    fi: "Vaihda ilmankostuttimet kohteessa {area}",
    fr: "Basculer les humidificateurs dans {area}",
    "fr-CA": "Basculer les humidificateurs dans {area}",
    gl: "Alternar humidificadores en {area}",
    he: "החלף מכשירי לחות ב-{area}",
    hi: "{area} में ह्यूमिडिफ़ायर बदलें",
    hu: "Párásítók vált a {area} területen",
    hy: "Փոխարկել խոնավեցուցիչները {area} տարածքում",
    id: "Alihkan Humidifier di {area}",
    it: "Alterna gli umidificatori in {area}",
    ja: "{area}の加湿器を切り替え",
    ka: "{area}-ში დამატენიანებლების გადართვა",
    ko: "{area} 가습기 전환",
    lt: "Perjungti drėkintuvus vietovėje {area}",
    lv: "Pārslēgt gaisa mitrinātājus apgabalā {area}",
    mk: "Превклучи овлажнувачи во {area}",
    nl: "Luchtbevochtigers omschakelen in {area}",
    nn: "Veksle luftfuktarar i {area}",
    no: "Veksle luftfuktere i {area}",
    pl: "Przełącz nawilżacze w {area}",
    pt: "Alternar umidificadores em {area}",
    "pt-BR": "Alternar umidificadores em {area}",
    ro: "Comută umidificatoarele în {area}",
    ru: "Переключить увлажнители в {area}",
    sk: "Prepínať zvlhčovače v {area}",
    sl: "Prekleni vlažilce v {area}",
    sr: "Пребаци овлаживаче у {area}",
    sv: "Växla luftfuktare i {area}",
    th: "สลับเครื่องเพิ่มความชื้นใน {area}",
    tr: "{area} içinde nemlendiricileri değiştir",
    uk: "Перемкнути зволожувачі в {area}",
    ur: "{area} میں ہیومیڈیفائر تبدیل کریں",
    vi: "Chuyển đổi máy tạo ẩm trong {area}",
    "zh-Hans": "切换 {area} 的加湿器",
    "zh-Hant": "切換 {area} 的加濕器"
  },
  area_valve: {
    en: "Toggle valves in {area}",
    ar: "تبديل الصمامات في {area}",
    bg: "Превключи клапаните в {area}",
    bn: "{area} এর ভালভ টগল করুন",
    bs: "Prebaci ventile u {area}",
    cs: "Přepnout ventily v {area}",
    da: "Skift ventiler i {area}",
    de: "Ventile in {area} umschalten",
    el: "Εναλλαγή βαλβίδων στην {area}",
    "en-GB": "Toggle valves in {area}",
    es: "Alternar válvulas en {area}",
    "es-419": "Alternar válvulas en {area}",
    et: "Lülita ventiilid {area} piirkonnas",
    eu: "Aldatu balbulak {area}-n",
    fa: "تغییر وضعیت شیرها در {area}",
    fi: "Vaihda venttiilit kohteessa {area}",
    fr: "Basculer les vannes dans {area}",
    "fr-CA": "Basculer les vannes dans {area}",
    gl: "Alternar válvulas en {area}",
    he: "החלף שסתומים ב-{area}",
    hi: "{area} में वाल्व बदलें",
    hu: "Szelepek vált a {area} területen",
    hy: "Փոխարկել փականները {area} տարածքում",
    id: "Alihkan Katup di {area}",
    it: "Alterna le valvole in {area}",
    ja: "{area}のバルブを切り替え",
    ka: "{area}-ში სარქვლების გადართვა",
    ko: "{area} 밸브 전환",
    lt: "Perjungti vožtuvus vietovėje {area}",
    lv: "Pārslēgt vārstus apgabalā {area}",
    mk: "Превклучи вентили во {area}",
    nl: "Kleppen omschakelen in {area}",
    nn: "Veksle ventilane i {area}",
    no: "Veksle ventiler i {area}",
    pl: "Przełącz zawory w {area}",
    pt: "Alternar válvulas em {area}",
    "pt-BR": "Alternar válvulas em {area}",
    ro: "Comută supapele în {area}",
    ru: "Переключить клапаны в {area}",
    sk: "Prepínať ventily v {area}",
    sl: "Prekleni ventile v {area}",
    sr: "Пребаци вентиле у {area}",
    sv: "Växla ventiler i {area}",
    th: "สลับวาล์วใน {area}",
    tr: "{area} içinde vanaları değiştir",
    uk: "Перемкнути клапани в {area}",
    ur: "{area} میں والو تبدیل کریں",
    vi: "Chuyển đổi van trong {area}",
    "zh-Hans": "切换 {area} 的阀门",
    "zh-Hant": "切換 {area} 的閥門"
  },
  area_remote: {
    en: "Toggle remotes in {area}",
    ar: "تبديل أجهزة التحكم في {area}",
    bg: "Превключи дистанционните в {area}",
    bn: "{area} এর রিমোট টগল করুন",
    bs: "Prebaci daljinske u {area}",
    cs: "Přepnout dálkové ovladače v {area}",
    da: "Skift fjernbetjeninger i {area}",
    de: "Fernbedienungen in {area} umschalten",
    el: "Εναλλαγή τηλεχειριστηρίων στην {area}",
    "en-GB": "Toggle remotes in {area}",
    es: "Alternar controles remotos en {area}",
    "es-419": "Alternar controles remotos en {area}",
    et: "Lülita kaugjuhtimispuldid {area} piirkonnas",
    eu: "Aldatu urrutiko aginteak {area}-n",
    fa: "تغییر وضعیت کنترل‌ها در {area}",
    fi: "Vaihda kaukosäätimet kohteessa {area}",
    fr: "Basculer les télécommandes dans {area}",
    "fr-CA": "Basculer les télécommandes dans {area}",
    gl: "Alternar controis remotos en {area}",
    he: "החלף שלטים ב-{area}",
    hi: "{area} में रिमोट बदलें",
    hu: "Távirányítók vált a {area} területen",
    hy: "Փոխարկել հեռակառավարիչները {area} տարածքում",
    id: "Alihkan Remote di {area}",
    it: "Alterna i telecomandi in {area}",
    ja: "{area}のリモコンを切り替え",
    ka: "{area}-ში დისტანციურების გადართვა",
    ko: "{area} 리모컨 전환",
    lt: "Perjungti nuotolinio valdymo pultus vietovėje {area}",
    lv: "Pārslēgt tālvadības pultis apgabalā {area}",
    mk: "Превклучи далечински во {area}",
    nl: "Afstandsbedieningen omschakelen in {area}",
    nn: "Veksle fjernkontrollar i {area}",
    no: "Veksle fjernkontroller i {area}",
    pl: "Przełącz piloty w {area}",
    pt: "Alternar controles remotos em {area}",
    "pt-BR": "Alternar controles remotos em {area}",
    ro: "Comută telecomenzile în {area}",
    ru: "Переключить пульты в {area}",
    sk: "Prepínať diaľkové ovládače v {area}",
    sl: "Prekleni daljinske upravljalnike v {area}",
    sr: "Пребаци даљинске у {area}",
    sv: "Växla fjärrkontroller i {area}",
    th: "สลับรีโมทใน {area}",
    tr: "{area} içinde uzaktan kumandaları değiştir",
    uk: "Перемкнути пульти в {area}",
    ur: "{area} میں ریموٹ تبدیل کریں",
    vi: "Chuyển đổi điều khiển từ xa trong {area}",
    "zh-Hans": "切换 {area} 的遥控器",
    "zh-Hant": "切換 {area} 的遙控器"
  },
  area_media_player: {
    en: "Toggle players in {area}",
    ar: "تبديل المشغلات في {area}",
    bg: "Превключи плейърите в {area}",
    bn: "{area} এর প্লেয়ার টগল করুন",
    bs: "Prebaci playere u {area}",
    cs: "Přepnout přehrávače v {area}",
    da: "Skift afspillere i {area}",
    de: "Player in {area} umschalten",
    el: "Εναλλαγή συσκευών αναπαραγωγής στην {area}",
    "en-GB": "Toggle players in {area}",
    es: "Alternar reproductores en {area}",
    "es-419": "Alternar reproductores en {area}",
    et: "Lülita mängijad {area} piirkonnas",
    eu: "Aldatu erreproduktoreak {area}-n",
    fa: "تغییر وضعیت پخش‌کننده‌ها در {area}",
    fi: "Vaihda soittimet kohteessa {area}",
    fr: "Basculer les lecteurs dans {area}",
    "fr-CA": "Basculer les lecteurs dans {area}",
    gl: "Alternar reprodutores en {area}",
    he: "החלף נגנים ב-{area}",
    hi: "{area} में प्लेयर बदलें",
    hu: "Lejátszók vált a {area} területen",
    hy: "Փոխարկել նվագարկիչները {area} տարածքում",
    id: "Alihkan Pemutar di {area}",
    it: "Alterna i lettori in {area}",
    ja: "{area}のプレーヤーを切り替え",
    ka: "{area}-ში დამკვრელების გადართვა",
    ko: "{area} 플레이어 전환",
    lt: "Perjungti grotuvus vietovėje {area}",
    lv: "Pārslēgt atskaņotājus apgabalā {area}",
    mk: "Превклучи плеери во {area}",
    nl: "Spelers omschakelen in {area}",
    nn: "Veksle avspelarar i {area}",
    no: "Veksle medieavspillere i {area}",
    pl: "Przełącz odtwarzacze w {area}",
    pt: "Alternar reprodutores em {area}",
    "pt-BR": "Alternar reprodutores em {area}",
    ro: "Comută playerele în {area}",
    ru: "Переключить плееры в {area}",
    sk: "Prepínať prehrávače v {area}",
    sl: "Prekleni predvajalnike v {area}",
    sr: "Пребаци плејере у {area}",
    sv: "Växla spelare i {area}",
    th: "สลับเครื่องเล่นใน {area}",
    tr: "{area} içinde oynatıcıları değiştir",
    uk: "Перемкнути плеєри в {area}",
    ur: "{area} میں پلیئر تبدیل کریں",
    vi: "Chuyển đổi trình phát trong {area}",
    "zh-Hans": "切换 {area} 的播放器",
    "zh-Hant": "切換 {area} 的播放器"
  },
  area_lock: {
    en: "Toggle locks in {area}",
    ar: "تبديل الأقفال في {area}",
    bg: "Превключи ключалките в {area}",
    bn: "{area} এর তালা টগল করুন",
    bs: "Prebaci brave u {area}",
    cs: "Přepnout zámky v {area}",
    da: "Skift låse i {area}",
    de: "Schlösser in {area} umschalten",
    el: "Εναλλαγή κλειδαριών στην {area}",
    "en-GB": "Toggle locks in {area}",
    es: "Alternar cerraduras en {area}",
    "es-419": "Alternar cerraduras en {area}",
    et: "Lülita lukud {area} piirkonnas",
    eu: "Aldatu sarrailak {area}-n",
    fa: "تغییر وضعیت قفل‌ها در {area}",
    fi: "Vaihda lukot kohteessa {area}",
    fr: "Basculer les serrures dans {area}",
    "fr-CA": "Basculer les serrures dans {area}",
    gl: "Alternar pechaduras en {area}",
    he: "החלף מנעולים ב-{area}",
    hi: "{area} में ताले बदलें",
    hu: "Zárak vált a {area} területen",
    hy: "Փոխարկել կողպեքները {area} տարածքում",
    id: "Alihkan Kunci di {area}",
    it: "Alterna le serrature in {area}",
    ja: "{area}の鍵を切り替え",
    ka: "{area}-ში საკეტების გადართვა",
    ko: "{area} 잠금 전환",
    lt: "Perjungti spynas vietovėje {area}",
    lv: "Pārslēgt slēdzenes apgabalā {area}",
    mk: "Превклучи брави во {area}",
    nl: "Slotswijzigingen in {area}",
    nn: "Veksle låsar i {area}",
    no: "Veksle låser i {area}",
    pl: "Przełącz zamki w {area}",
    pt: "Alternar fechaduras em {area}",
    "pt-BR": "Alternar fechaduras em {area}",
    ro: "Comută încuietorile în {area}",
    ru: "Переключить замки в {area}",
    sk: "Prepínať zámky v {area}",
    sl: "Prekleni ključavnice v {area}",
    sr: "Пребаци браве у {area}",
    sv: "Växla lås i {area}",
    th: "สลับล็อกใน {area}",
    tr: "{area} içinde kilitleri değiştir",
    uk: "Перемкнути замки в {area}",
    ur: "{area} میں تالے تبدیل کریں",
    vi: "Chuyển đổi khóa trong {area}",
    "zh-Hans": "切换 {area} 的锁",
    "zh-Hant": "切換 {area} 的鎖"
  },
  area_vacuum: {
    en: "Toggle vacuums in {area}",
    ar: "تبديل المكانس في {area}",
    bg: "Превключи прахосмукачките в {area}",
    bn: "{area} এর ভ্যাকুয়াম টগল করুন",
    bs: "Prebaci usisivače u {area}",
    cs: "Přepnout vysavače v {area}",
    da: "Skift støvsugere i {area}",
    de: "Staubsauger in {area} umschalten",
    el: "Εναλλαγή ρομποτικών σκουπών στην {area}",
    "en-GB": "Toggle vacuums in {area}",
    es: "Alternar aspiradoras en {area}",
    "es-419": "Alternar aspiradoras en {area}",
    et: "Lülita tolmuimejad {area} piirkonnas",
    eu: "Aldatu xurgagailuak {area}-n",
    fa: "تغییر وضعیت جاروبرقی‌ها در {area}",
    fi: "Vaihda imurit kohteessa {area}",
    fr: "Basculer les aspirateurs dans {area}",
    "fr-CA": "Basculer les aspirateurs dans {area}",
    gl: "Alternar aspiradores en {area}",
    he: "החלף שואבים ב-{area}",
    hi: "{area} में वैक्यूम बदलें",
    hu: "Porszívók vált a {area} területen",
    hy: "Փոխարկել փոշեկուլները {area} տարածքում",
    id: "Alihkan Vakum di {area}",
    it: "Alterna gli aspirapolvere in {area}",
    ja: "{area}の掃除機を切り替え",
    ka: "{area}-ში მტვერსასრუტების გადართვა",
    ko: "{area} 청소기 전환",
    lt: "Perjungti dulkių siurbėlius vietovėje {area}",
    lv: "Pārslēgt putekļsūcējus apgabalā {area}",
    mk: "Превклучи правосмукалки во {area}",
    nl: "Stofzuigers omschakelen in {area}",
    nn: "Veksle støvsugarar i {area}",
    no: "Veksle støvsugere i {area}",
    pl: "Przełącz odkurzacze w {area}",
    pt: "Alternar aspiradores em {area}",
    "pt-BR": "Alternar aspiradores em {area}",
    ro: "Comută aspiratoarele în {area}",
    ru: "Переключить пылесосы в {area}",
    sk: "Prepínať vysávače v {area}",
    sl: "Prekleni sesalnike v {area}",
    sr: "Пребаци усисиваче у {area}",
    sv: "Växla dammsugare i {area}",
    th: "สลับดูดฝุ่นใน {area}",
    tr: "{area} içinde süpürgeleri değiştir",
    uk: "Перемкнути пилососи в {area}",
    ur: "{area} میں ویکیوم تبدیل کریں",
    vi: "Chuyển đổi máy hút bụi trong {area}",
    "zh-Hans": "切换 {area} 的扫地机器人",
    "zh-Hant": "切換 {area} 的掃地機器人"
  },
  area_alarm_control_panel: {
    en: "Toggle alarm in {area}",
    ar: "تبديل الإنذار في {area}",
    bg: "Превключи алармата в {area}",
    bn: "{area} এর অ্যালার্ম টগল করুন",
    bs: "Prebaci alarm u {area}",
    cs: "Přepnout alarm v {area}",
    da: "Skift alarm i {area}",
    de: "Alarm in {area} umschalten",
    el: "Εναλλαγή συναγερμού στην {area}",
    "en-GB": "Toggle alarm in {area}",
    es: "Alternar alarma en {area}",
    "es-419": "Alternar alarma en {area}",
    et: "Lülita alarm {area} piirkonnas",
    eu: "Aldatu alarma {area}-n",
    fa: "تغییر وضعیت آژیر در {area}",
    fi: "Vaihda hälytys kohteessa {area}",
    fr: "Basculer l'alarme dans {area}",
    "fr-CA": "Basculer l'alarme dans {area}",
    gl: "Alternar alarma en {area}",
    he: "החלף אזעקה ב-{area}",
    hi: "{area} में अलार्म बदलें",
    hu: "Riasztó vált a {area} területen",
    hy: "Փոխարկել ազդանշանը {area} տարածքում",
    id: "Alihkan Alarm di {area}",
    it: "Alterna l'allarme in {area}",
    ja: "{area}の警報を切り替え",
    ka: "{area}-ში სიგნალიზაციის გადართვა",
    ko: "{area} 알람 전환",
    lt: "Perjungti signalizaciją vietovėje {area}",
    lv: "Pārslēgt signalizāciju apgabalā {area}",
    mk: "Превклучи аларма во {area}",
    nl: "Alarm omschakelen in {area}",
    nn: "Veksle alarm i {area}",
    no: "Veksle alarm i {area}",
    pl: "Przełącz alarm w {area}",
    pt: "Alternar alarme em {area}",
    "pt-BR": "Alternar alarme em {area}",
    ro: "Comută alarma în {area}",
    ru: "Переключить сигнализацию в {area}",
    sk: "Prepínať alarm v {area}",
    sl: "Prekleni alarm v {area}",
    sr: "Пребаци аларм у {area}",
    sv: "Växla larm i {area}",
    th: "สลับสัญญาณเตือนใน {area}",
    tr: "{area} içinde alarmı değiştir",
    uk: "Перемкнути сигналізацію в {area}",
    ur: "{area} میں الارم تبدیل کریں",
    vi: "Chuyển đổi báo động trong {area}",
    "zh-Hans": "切换 {area} 的警报",
    "zh-Hant": "切換 {area} 的警報"
  },
  area_lawn_mower: {
    en: "Toggle mowers in {area}",
    ar: "تبديل جزازات العشب في {area}",
    bg: "Превключи косачките в {area}",
    bn: "{area} এর মাওয়ার টগল করুন",
    bs: "Prebaci kosilice u {area}",
    cs: "Přepnout sekačky v {area}",
    da: "Skift plæneklippere i {area}",
    de: "Mäher in {area} umschalten",
    el: "Εναλλαγή χλοοκοπτικών στην {area}",
    "en-GB": "Toggle mowers in {area}",
    es: "Alternar cortacéspedes en {area}",
    "es-419": "Alternar cortacéspedes en {area}",
    et: "Lülita muruniidukid {area} piirkonnas",
    eu: "Aldatu belar-mozgailuak {area}-n",
    fa: "تغییر وضعیت ماشین‌های چمن‌زنی در {area}",
    fi: "Vaihda ruohonleikkurit kohteessa {area}",
    fr: "Basculer les tondeuses dans {area}",
    "fr-CA": "Basculer les tondeuses dans {area}",
    gl: "Alternar cortacésped en {area}",
    he: "החלף מכסחות ב-{area}",
    hi: "{area} में मावर बदलें",
    hu: "Fűnyírók vált a {area} területen",
    hy: "Փոխարկել հնձիչները {area} տարածքում",
    id: "Alihkan Mesin Pemotong di {area}",
    it: "Alterna i rasaerba in {area}",
    ja: "{area}の芝刈り機を切り替え",
    ka: "{area}-ში სათიბების გადართვა",
    ko: "{area} 잔디깎기 전환",
    lt: "Perjungti žoliapjoves vietovėje {area}",
    lv: "Pārslēgt zāles pļāvējus apgabalā {area}",
    mk: "Превклучи косилки во {area}",
    nl: "Maaiers omschakelen in {area}",
    nn: "Veksle gressklypparar i {area}",
    no: "Veksle gressklippere i {area}",
    pl: "Przełącz kosiarki w {area}",
    pt: "Alternar cortadores de relva em {area}",
    "pt-BR": "Alternar cortadores de grama em {area}",
    ro: "Comută mașinile de tuns iarba în {area}",
    ru: "Переключить газонокосилки в {area}",
    sk: "Prepínať kosačky v {area}",
    sl: "Prekleni kosilnice v {area}",
    sr: "Пребаци косилице у {area}",
    sv: "Växla gräsklippare i {area}",
    th: "สลับเครื่องตัดหญ้าใน {area}",
    tr: "{area} içinde çim biçme makinelerini değiştir",
    uk: "Перемкнути газонокосарки в {area}",
    ur: "{area} میں ماؤر تبدیل کریں",
    vi: "Chuyển đổi máy cắt cỏ trong {area}",
    "zh-Hans": "切换 {area} 的割草机",
    "zh-Hant": "切換 {area} 的割草機"
  },
  area_water_heater: {
    en: "Toggle water heaters in {area}",
    ar: "تبديل سخانات المياه في {area}",
    bg: "Превключи бойлерите в {area}",
    bn: "{area} এর ওয়াটার হিটার টগল করুন",
    bs: "Prebaci bojlere u {area}",
    cs: "Přepnout ohřívače vody v {area}",
    da: "Skift vandvarmere i {area}",
    de: "Warmwasserbereiter in {area} umschalten",
    el: "Εναλλαγή θερμοσίφωνα στην {area}",
    "en-GB": "Toggle water heaters in {area}",
    es: "Alternar calentadores de agua en {area}",
    "es-419": "Alternar calentadores de agua en {area}",
    et: "Lülita veesoojendid {area} piirkonnas",
    eu: "Aldatu ur-berogailuak {area}-n",
    fa: "تغییر وضعیت آبگرمکن‌ها در {area}",
    fi: "Vaihda vedenlämmittimet kohteessa {area}",
    fr: "Basculer les chauffe-eau dans {area}",
    "fr-CA": "Basculer les chauffe-eau dans {area}",
    gl: "Alternar quentadores de auga en {area}",
    he: "החלף דודי מים ב-{area}",
    hi: "{area} में वॉटर हीटर बदलें",
    hu: "Vízmelegítők vált a {area} területen",
    hy: "Փոխարկել ջերմաջրերը {area} տարածքում",
    id: "Alihkan Pemanas Air di {area}",
    it: "Alterna gli scaldacqua in {area}",
    ja: "{area}の給湯器を切り替え",
    ka: "{area}-ში წყალგამაცხელებლების გადართვა",
    ko: "{area} 온수기 전환",
    lt: "Perjungti vandens šildytuvus vietovėje {area}",
    lv: "Pārslēgt ūdens sildītājus apgabalā {area}",
    mk: "Превклучи бојлери во {area}",
    nl: "Waterverwarmers omschakelen in {area}",
    nn: "Veksle varmtvassberedarar i {area}",
    no: "Veksle varmtvannsberedere i {area}",
    pl: "Przełącz podgrzewacze wody w {area}",
    pt: "Alternar esquentadores de água em {area}",
    "pt-BR": "Alternar aquecedores de água em {area}",
    ro: "Comută boilerele în {area}",
    ru: "Переключить водонагреватели в {area}",
    sk: "Prepínať ohrievače vody v {area}",
    sl: "Prekleni grelnike vode v {area}",
    sr: "Пребаци бојлере у {area}",
    sv: "Växla varmvattenberedare i {area}",
    th: "สลับเครื่องทำน้ำอุ่นใน {area}",
    tr: "{area} içinde su ısıtıcılarını değiştir",
    uk: "Перемкнути водонагрівачі в {area}",
    ur: "{area} میں واٹر ہیٹر تبدیل کریں",
    vi: "Chuyển đổi máy nước nóng trong {area}",
    "zh-Hans": "切换 {area} 的热水器",
    "zh-Hant": "切換 {area} 的熱水器"
  },
  area_update: {
    en: "Skip updates in {area}",
    ar: "تخطي التحديثات في {area}",
    bg: "Пропусни актуализациите в {area}",
    bn: "{area} এর আপডেট এড়িয়ে যান",
    bs: "Preskoči ažuriranja u {area}",
    cs: "Přeskočit aktualizace v {area}",
    da: "Spring opdateringer over i {area}",
    de: "Updates in {area} überspringen",
    el: "Παράβλεψη ενημερώσεων στην {area}",
    "en-GB": "Skip updates in {area}",
    es: "Omitir actualizaciones en {area}",
    "es-419": "Omitir actualizaciones en {area}",
    et: "Jäta värskendused {area} piirkonnas vahele",
    eu: "Saltatu eguneraketak {area}-n",
    fa: "رد کردن به‌روزرسانی‌ها در {area}",
    fi: "Ohita päivitykset kohteessa {area}",
    fr: "Ignorer les mises à jour dans {area}",
    "fr-CA": "Ignorer les mises à jour dans {area}",
    gl: "Omitir actualizacións en {area}",
    he: "דלג על עדכונים ב-{area}",
    hi: "{area} में अपडेट छोड़ें",
    hu: "Frissítések kihagyása a {area} területen",
    hy: "Բաց թողնել թարմացումները {area} տարածքում",
    id: "Lewati Pembaruan di {area}",
    it: "Salta gli aggiornamenti in {area}",
    ja: "{area}の更新をスキップ",
    ka: "{area}-ში განახლებების გამოტოვება",
    ko: "{area} 업데이트 건너뛰기",
    lt: "Praleisti atnaujinimus vietovėje {area}",
    lv: "Izlaist atjauninājumus apgabalā {area}",
    mk: "Прескокни ажурирања во {area}",
    nl: "Updates overslaan in {area}",
    nn: "Hopp over oppdateringar i {area}",
    no: "Hopp over oppdateringer i {area}",
    pl: "Pomiń aktualizacje w {area}",
    pt: "Ignorar atualizações em {area}",
    "pt-BR": "Ignorar atualizações em {area}",
    ro: "Omite actualizările în {area}",
    ru: "Пропустить обновления в {area}",
    sk: "Preskočiť aktualizácie v {area}",
    sl: "Preskoči posodobitve v {area}",
    sr: "Прескочи ажурирања у {area}",
    sv: "Hoppa över uppdateringar i {area}",
    th: "ข้ามการอัปเดตใน {area}",
    tr: "{area} içinde güncellemeleri atla",
    uk: "Пропустити оновлення в {area}",
    ur: "{area} میں اپڈیٹس چھوڑیں",
    vi: "Bỏ qua bản cập nhật trong {area}",
    "zh-Hans": "跳过 {area} 的更新",
    "zh-Hant": "跳過 {area} 的更新"
  },
  background_color: {
    en: "Icon Background Color",
    ar: "لون خلفية الأيقونة",
    bg: "Цвят на фона на иконата",
    bn: "আইকনের পেছনের রং",
    bs: "Boja pozadine ikone",
    cs: "Barva pozadí ikony",
    da: "Baggrundsfarve for ikon",
    de: "Symbol Hintergrundfarbe",
    el: "Χρώμα φόντου εικονιδίου",
    "en-GB": "Icon Background Color",
    es: "Color de fondo del icono",
    "es-419": "Color de fondo del icono",
    et: "Ikooni taustavärv",
    eu: "Ikonoaren atzealdeko kolorea",
    fa: "رنگ پس‌زمینه آیکون",
    fi: "Kuvakkeen taustaväri",
    fr: "Couleur d'arrière-plan de l'icône",
    "fr-CA": "Couleur d'arrière-plan de l'icône",
    gl: "Cor de fondo da icona",
    he: "צבע רקע של הסמל",
    hi: "आइकन की पृष्ठभूमि का रंग",
    hu: "Ikon háttérszíne",
    hy: "Պատկերակի ֆոնի գույն",
    id: "Warna Latar Belakang Ikon",
    it: "Colore di sfondo dell'icona",
    ja: "アイコンの背景色",
    ka: "ხატულის ფონის ფერი",
    ko: "아이콘 배경색",
    lt: "Piktogramos fono spalva",
    lv: "Ikonas fona krāsa",
    mk: "Боја на позадината на иконата",
    nl: "Achtergrondkleur van pictogram",
    nn: "Bakgrunnsfarge for ikon",
    no: "Bakgrunnsfarge for ikon",
    pl: "Kolor tła ikony",
    pt: "Cor de fundo do ícone",
    "pt-BR": "Cor de fundo do ícone",
    ro: "Culoarea fundalului pictogramei",
    ru: "Цвет фона значка",
    sk: "Farba pozadia ikony",
    sl: "Barva ozadja ikone",
    sr: "Боја позадине иконице",
    sv: "Bakgrundsfärg för ikon",
    th: "สีพื้นหลังไอคอน",
    tr: "Simge Arka Plan Rengi",
    uk: "Колір фону іконки",
    ur: "آئیکون کا پس منظر رنگ",
    vi: "Màu nền biểu tượng",
    "zh-Hans": "图标背景色",
    "zh-Hant": "圖示背景顏色"
  },
  badge_mode: {
    en: "Enable Badge Mode",
    ar: "تفعيل وضع الشارة",
    bg: "Активирай режим значка",
    bn: "ব্যাজ মোড সক্ষম করুন",
    bs: "Omogući režim značke",
    cs: "Povolit režim odznaku",
    da: "Aktiver badge-tilstand",
    de: "Aktiviere Badge Modus",
    el: "Ενεργοποίηση λειτουργίας σήματος",
    "en-GB": "Enable Badge Mode",
    es: "Activar modo insignia",
    "es-419": "Activar modo insignia",
    et: "Luba märgi režiim",
    eu: "Gaitu domeinuaren modua",
    fa: "فعال کردن حالت نشان",
    fi: "Ota käyttöön merkkitila",
    fr: "Activer le mode insigne",
    "fr-CA": "Activer le mode insigne",
    gl: "Activar o modo insignia",
    he: "הפעל מצב תג",
    hi: "बैज मोड सक्षम करें",
    hu: "Jelvénymód engedélyezése",
    hy: "Միացնել կրծքանշանի ռեժիմը",
    id: "Aktifkan Mode Lencana",
    it: "Abilita modalità badge",
    ja: "バッジモードを有効化",
    ka: "სამკერდე რეჟიმის ჩართვა",
    ko: "배지 모드 활성화",
    lt: "Įgalinti ženkliuko režimą",
    lv: "Iespējot nozīmītes režīmu",
    mk: "Активирај режим на значка",
    nl: "Badge-modus inschakelen",
    nn: "Aktiver merkjemodus",
    no: "Aktiver merkemodus",
    pl: "Włącz tryb odznaki",
    pt: "Ativar modo de emblema",
    "pt-BR": "Ativar modo de emblema",
    ro: "Activează modul insignă",
    ru: "Включить режим значка",
    sk: "Povoliť režim odznaku",
    sl: "Omogoči način značke",
    sr: "Активирај режим значке",
    sv: "Aktivera märkesläge",
    th: "เปิดใช้งานโหมดป้าย",
    tr: "Rozet Modunu Etkinleştir",
    uk: "Увімкнути режим значка",
    ur: "بیج موڈ فعال کریں",
    vi: "Bật chế độ huy hiệu",
    "zh-Hans": "启用徽章模式",
    "zh-Hant": "啟用徽章模式"
  },
  group_id: {
    en: "Group Name",
    ar: "اسم المجموعة",
    bg: "Име на групата",
    bn: "গ্রুপের নাম",
    bs: "Naziv grupe",
    cs: "Název skupiny",
    da: "Gruppenavn",
    de: "Gruppenname",
    el: "Όνομα ομάδας",
    "en-GB": "Group Name",
    es: "Nombre del grupo",
    "es-419": "Nombre del grupo",
    et: "Rühma nimi",
    eu: "Taldearen izena",
    fa: "نام گروه",
    fi: "Ryhmän nimi",
    fr: "Nom du groupe",
    "fr-CA": "Nom du groupe",
    gl: "Nome do grupo",
    he: "שם הקבוצה",
    hi: "समूह का नाम",
    hu: "Csoport neve",
    hy: "Խմբի անվանում",
    id: "Nama Grup",
    it: "Nome del gruppo",
    ja: "グループ名",
    ka: "ჯგუფის სახელი",
    ko: "그룹 이름",
    lt: "Grupės pavadinimas",
    lv: "Grupas nosaukums",
    mk: "Име на групата",
    nl: "Groepsnaam",
    nn: "Gruppenamn",
    no: "Gruppenavn",
    pl: "Nazwa grupy",
    pt: "Nome do grupo",
    "pt-BR": "Nome do grupo",
    ro: "Numele grupului",
    ru: "Название группы",
    sk: "Názov skupiny",
    sl: "Ime skupine",
    sr: "Назив групе",
    sv: "Gruppnamn",
    th: "ชื่อกลุ่ม",
    tr: "Grup Adı",
    uk: "Назва групи",
    ur: "گروپ کا نام",
    vi: "Tên nhóm",
    "zh-Hans": "组名称",
    "zh-Hant": "群組名稱"
  },
  group_icon: {
    en: "Group Icon",
    ar: "أيقونة المجموعة",
    bg: "Икона на групата",
    bn: "গ্রুপ আইকন",
    bs: "Ikona grupe",
    cs: "Ikona skupiny",
    da: "Gruppeikon",
    de: "Gruppensymbol",
    el: "Εικονίδιο ομάδας",
    "en-GB": "Group Icon",
    es: "Icono del grupo",
    "es-419": "Icono del grupo",
    et: "Rühma ikoon",
    eu: "Taldearen ikonoa",
    fa: "آیکون گروه",
    fi: "Ryhmän kuvake",
    fr: "Icône du groupe",
    "fr-CA": "Icône du groupe",
    gl: "Icona do grupo",
    he: "סמל הקבוצה",
    hi: "समूह आइकन",
    hu: "Csoport ikonja",
    hy: "Խմբի պատկերակ",
    id: "Ikon Grup",
    it: "Icona del gruppo",
    ja: "グループアイコン",
    ka: "ჯგუფის ხატულა",
    ko: "그룹 아이콘",
    lt: "Grupės piktograma",
    lv: "Grupas ikona",
    mk: "Икона на групата",
    nl: "Groepsicoon",
    nn: "Gruppeikon",
    no: "Gruppeikon",
    pl: "Ikona grupy",
    pt: "Ícone do grupo",
    "pt-BR": "Ícone do grupo",
    ro: "Pictograma grupului",
    ru: "Иконка группы",
    sk: "Ikona skupiny",
    sl: "Ikona skupine",
    sr: "Иконица групе",
    sv: "Gruppikon",
    th: "ไอคอนกลุ่ม",
    tr: "Grup Simgesi",
    uk: "Іконка групи",
    ur: "گروپ آئیکون",
    vi: "Biểu tượng nhóm",
    "zh-Hans": "组图标",
    "zh-Hant": "群組圖示"
  },
  group_status: {
    en: "Group State",
    ar: "حالة المجموعة",
    bg: "Състояние на групата",
    bn: "গ্রুপের অবস্থা",
    bs: "Stanje grupe",
    cs: "Stav skupiny",
    da: "Gruppetilstand",
    de: "Gruppenzustand",
    el: "Κατάσταση ομάδας",
    "en-GB": "Group State",
    es: "Estado del grupo",
    "es-419": "Estado del grupo",
    et: "Rühma olek",
    eu: "Taldearen egoera",
    fa: "وضعیت گروه",
    fi: "Ryhmän tila",
    fr: "État du groupe",
    "fr-CA": "État du groupe",
    gl: "Estado do grupo",
    he: "מצב הקבוצה",
    hi: "समूह की स्थिति",
    hu: "Csoport állapota",
    hy: "Խմբի վիճակ",
    id: "Status Grup",
    it: "Stato del gruppo",
    ja: "グループの状態",
    ka: "ჯგუფის მდგომარეობა",
    ko: "그룹 상태",
    lt: "Grupės būsena",
    lv: "Grupas stāvoklis",
    mk: "Состојба на групата",
    nl: "Groepsstatus",
    nn: "Gruppetilstand",
    no: "Gruppetilstand",
    pl: "Stan grupy",
    pt: "Estado do grupo",
    "pt-BR": "Estado do grupo",
    ro: "Starea grupului",
    ru: "Состояние группы",
    sk: "Stav skupiny",
    sl: "Stanje skupine",
    sr: "Стање групе",
    sv: "Gruppstatus",
    th: "สถานะกลุ่ม",
    tr: "Grup Durumu",
    uk: "Стан групи",
    ur: "گروپ کی حالت",
    vi: "Trạng thái nhóm",
    "zh-Hans": "组状态",
    "zh-Hant": "群組狀態"
  },
  columns: {
    en: "Popup Columns",
    ar: "أعمدة منبثقة",
    bg: "Колони в изкачащ прозорец",
    bn: "পপআপ কলাম",
    bs: "Kolone popupa",
    cs: "Sloupce vyskakovacího okna",
    da: "Kolonner i popup",
    de: "Spalten im Popup",
    el: "Στήλες αναδυόμενου",
    "en-GB": "Popup Columns",
    es: "Columnas en popup",
    "es-419": "Columnas en popup",
    et: "Hüpikakna veerud",
    eu: "Popuparen zutabeak",
    fa: "ستون‌های پاپ آپ",
    fi: "Ponnahdusikkunan sarakkeet",
    fr: "Colonnes dans la fenêtre contextuelle",
    "fr-CA": "Colonnes dans la fenêtre contextuelle",
    gl: "Columnas en popup",
    he: "עמודות חלון קופץ",
    hi: "पॉपअप कॉलम",
    hu: "Felugró ablak oszlopai",
    hy: "Պոպափի սյունակներ",
    id: "Kolom Popup",
    it: "Colonne popup",
    ja: "ポップアップの列数",
    ka: "პოპაპის სვეტები",
    ko: "팝업 열",
    lt: "Iškylančiojo lango stulpeliai",
    lv: "Uznirstošā loga kolonnas",
    mk: "Колони на скокачкото",
    nl: "Popup-kolommen",
    nn: "Kolonner i popup",
    no: "Kolonner i popup",
    pl: "Kolumny w oknie podręcznym",
    pt: "Colunas em popup",
    "pt-BR": "Colunas no pop-up",
    ro: "Coloane în fereastra pop-up",
    ru: "Столбцы во всплывающем окне",
    sk: "Stĺpce vyskakovacieho okna",
    sl: "Stolpci pojavnega okna",
    sr: "Колоне искачујућег прозора",
    sv: "Kolumner i popup",
    th: "คอลัมน์ป๊อปอัพ",
    tr: "Popup Sütunları",
    uk: "Стовпці у спливаючому вікні",
    ur: "پاپ اپ کالم",
    vi: "Số cột cửa sổ bật lên",
    "zh-Hans": "弹出窗口列数",
    "zh-Hant": "彈出視窗欄數"
  },
  edit_domains_dc: {
    en: "Edit Content",
    ar: "تعديل المحتوى",
    bg: "Редактиране на съдържанието",
    bn: "বিষয়বস্তু সম্পাদনা",
    bs: "Uredi sadržaj",
    cs: "Upravit obsah",
    da: "Rediger indhold",
    de: "Inhalt bearbeiten",
    el: "Επεξεργασία περιεχομένων",
    "en-GB": "Edit Content",
    es: "Editar contenido",
    "es-419": "Editar contenido",
    et: "Muuda sisu",
    eu: "Editatu edukia",
    fa: "ویرایش محتوا",
    fi: "Muokkaa sisältöä",
    fr: "Modifier le contenu",
    "fr-CA": "Modifier le contenu",
    gl: "Editar contido",
    he: "עריכת תוכן",
    hi: "सामग्री संपादित करें",
    hu: "Tartalom szerkesztése",
    hy: "Խմբագրել բովանդակությունը",
    id: "Edit Konten",
    it: "Modifica contenuto",
    ja: "コンテンツを編集",
    ka: "შიგთავსის რედაქტირება",
    ko: "콘텐츠 편집",
    lt: "Redaguoti turinį",
    lv: "Rediģēt saturu",
    mk: "Уреди содржина",
    nl: "Inhoud bewerken",
    nn: "Rediger innhald",
    no: "Rediger innhold",
    pl: "Edytuj zawartość",
    pt: "Editar conteúdo",
    "pt-BR": "Editar conteúdo",
    ro: "Editează conținutul",
    ru: "Редактировать содержание",
    sk: "Upraviť obsah",
    sl: "Uredi vsebino",
    sr: "Уреди садржај",
    sv: "Redigera innehåll",
    th: "แก้ไขเนื้อหา",
    tr: "İçeriği Düzenle",
    uk: "Редагувати вміст",
    ur: "مواد میں ترمیم کریں",
    vi: "Chỉnh sửa nội dung",
    "zh-Hans": "编辑内容",
    "zh-Hant": "編輯內容"
  },
  hide_person: {
    en: "Hide People",
    ar: "إخفاء الأشخاص",
    bg: "Скрий хората",
    bn: "ব্যক্তিদের লুকান",
    bs: "Sakrij osobe",
    cs: "Skrýt osoby",
    da: "Skjul personer",
    de: "Personen ausblenden",
    el: "Απόκρυψη ατόμων",
    "en-GB": "Hide People",
    es: "Ocultar personas",
    "es-419": "Ocultar personas",
    et: "Peida inimesed",
    eu: "Pertsonak ezkutatu",
    fa: "پنهان کردن افراد",
    fi: "Piilota henkilöt",
    fr: "Masquer les personnes",
    "fr-CA": "Masquer les personnes",
    gl: "Agochar persoas",
    he: "הסתר אנשים",
    hi: "लोगों को छिपाएँ",
    hu: "Személyek elrejtése",
    hy: "Թաքցնել անձանց",
    id: "Sembunyikan Orang",
    it: "Nascondi persone",
    ja: "人を非表示",
    ka: "ადამიანების დამალვა",
    ko: "사람 숨기기",
    lt: "Slėpti asmenis",
    lv: "Slēpt personas",
    mk: "Сокриј луѓе",
    nl: "Personen verbergen",
    nn: "Skjul personar",
    no: "Skjul personer",
    pl: "Ukryj osoby",
    pt: "Ocultar pessoas",
    "pt-BR": "Ocultar pessoas",
    ro: "Ascunde persoane",
    ru: "Скрыть людей",
    sk: "Skryť osoby",
    sl: "Skrij osebe",
    sr: "Сакриј особе",
    sv: "Dölj personer",
    th: "ซ่อนผู้คน",
    tr: "Kişileri Gizle",
    uk: "Сховати людей",
    ur: "لوگوں کو چھپائیں",
    vi: "Ẩn người",
    "zh-Hans": "隐藏人员",
    "zh-Hant": "隱藏人員"
  },
  hide_filter: {
    en: "Filter Entities",
    ar: "تصفية الكيانات",
    bg: "Филтрирай обекти",
    bn: "এন্টিটি ফিল্টার করুন",
    bs: "Filtriraj entitete",
    cs: "Filtrovat entity",
    da: "Filtrér enheder",
    de: "Entitäten filtern",
    el: "Φιλτράρισμα οντοτήτων",
    "en-GB": "Filter Entities",
    es: "Filtrar entidades",
    "es-419": "Filtrar entidades",
    et: "Filtreeri üksusi",
    eu: "Iragazi erakundeak",
    fa: "فیلتر کردن موجودیت‌ها",
    fi: "Suodata entiteettejä",
    fr: "Filtrer les entités",
    "fr-CA": "Filtrer les entités",
    gl: "Filtrar entidades",
    he: "סנן ישויות",
    hi: "एंटिटी फ़िल्टर करें",
    hu: "Entitások szűrése",
    hy: "Զտել կազմակերպությունները",
    id: "Saring Entitas",
    it: "Filtra entità",
    ja: "エンティティをフィルタリング",
    ka: "ობიექტების გაფილტვრა",
    ko: "엔티티 필터링",
    lt: "Filtruoti objektus",
    lv: "Filtrēt objektus",
    mk: "Филтрирај објекти",
    nl: "Entiteiten filteren",
    nn: "Filtrer einingar",
    no: "Filtrer enheter",
    pl: "Filtruj encje",
    pt: "Filtrar entidades",
    "pt-BR": "Filtrar entidades",
    ro: "Filtrează entitățile",
    ru: "Фильтровать объекты",
    sk: "Filtrovať entity",
    sl: "Filtriraj entitete",
    sr: "Филтрирај објекте",
    sv: "Filtrera enheter",
    th: "กรองเอนทิตี้",
    tr: "Varlıkları Filtrele",
    uk: "Фільтрувати об'єкти",
    ur: "انٹیٹی فلٹر کریں",
    vi: "Lọc thực thể",
    "zh-Hans": "筛选实体",
    "zh-Hant": "篩選實體"
  },
  hide_content_name: {
    en: "Hide Item Names",
    ar: "إخفاء أسماء العناصر",
    bg: "Скрий имената на елементите",
    bn: "আইটেমের নাম লুকান",
    bs: "Sakrij nazive stavki",
    cs: "Skrýt názvy položek",
    da: "Skjul elementnavne",
    de: "Inhaltsnamen ausblenden",
    el: "Απόκρυψη ονομάτων στοιχείων",
    "en-GB": "Hide Item Names",
    es: "Ocultar nombres de elementos",
    "es-419": "Ocultar nombres de elementos",
    et: "Peida üksuste nimed",
    eu: "Ezkutatu elementuen izenak",
    fa: "مخفی کردن نام موارد",
    fi: "Piilota kohteiden nimet",
    fr: "Masquer les noms des éléments",
    "fr-CA": "Masquer les noms des éléments",
    gl: "Agochar nomes de elementos",
    he: "הסתר שמות פריטים",
    hi: "आइटम के नाम छिपाएं",
    hu: "Elemek neveinek elrejtése",
    hy: "Թաքցնել տարրերի անունները",
    id: "Sembunyikan Nama Item",
    it: "Nascondi i nomi degli elementi",
    ja: "項目名を非表示",
    ka: "ელემენტების სახელების დამალვა",
    ko: "항목 이름 숨기기",
    lt: "Slėpti elementų pavadinimus",
    lv: "Paslēpt vienumu nosaukumus",
    mk: "Сокриј имиња на ставки",
    nl: "Itemnamen verbergen",
    nn: "Skjul elementnamn",
    no: "Skjul elementnavn",
    pl: "Ukryj nazwy elementów",
    pt: "Ocultar nomes de itens",
    "pt-BR": "Ocultar nomes de itens",
    ro: "Ascunde numele elementelor",
    ru: "Скрыть названия элементов",
    sk: "Skryť názvy položiek",
    sl: "Skrij imena elementov",
    sr: "Сакриј називе ставки",
    sv: "Dölj artikelnamn",
    th: "ซ่อนชื่อรายการ",
    tr: "Öğe Adlarını Gizle",
    uk: "Сховати назви елементів",
    ur: "آئٹم کے نام چھپائیں",
    vi: "Ẩn tên mục",
    "zh-Hans": "隐藏项目名称",
    "zh-Hant": "隱藏項目名稱"
  },
  show_total_number: {
    en: "Show Total Number",
    ar: "إظهار العدد الإجمالي",
    bg: "Покажи общия брой",
    bn: "মোট সংখ্যা দেখান",
    bs: "Prikaži ukupan broj",
    cs: "Zobrazit celkový počet",
    da: "Vis samlet antal",
    de: "Zeige Gesamtanzahl",
    el: "Εμφάνιση συνολικού αριθμού",
    "en-GB": "Show Total Number",
    es: "Mostrar número total",
    "es-419": "Mostrar número total",
    et: "Kuva koguarv",
    eu: "Erakutsi guztirako kopurua",
    fa: "نمایش تعداد کل",
    fi: "Näytä kokonaislukumäärä",
    fr: "Afficher le nombre total",
    "fr-CA": "Afficher le nombre total",
    gl: "Amosar número total",
    he: "הצג מספר כולל",
    hi: "कुल संख्या दिखाएं",
    hu: "Összes szám megjelenítése",
    hy: "Ցուցադրել ընդհանուր թիվը",
    id: "Tampilkan Jumlah Total",
    it: "Mostra numero totale",
    ja: "合計数を表示",
    ka: "ჯამური რაოდენობის ჩვენება",
    ko: "총 수 표시",
    lt: "Rodyti bendrą skaičių",
    lv: "Rādīt kopējo skaitu",
    mk: "Прикажи вкупен број",
    nl: "Totaal aantal weergeven",
    nn: "Vis totalt tal",
    no: "Vis totalt antall",
    pl: "Pokaż całkowitą liczbę",
    pt: "Mostrar número total",
    "pt-BR": "Mostrar número total",
    ro: "Afișează numărul total",
    ru: "Показать общее количество",
    sk: "Zobraziť celkový počet",
    sl: "Prikaži skupno število",
    sr: "Прикажи укупан број",
    sv: "Visa totalt antal",
    th: "แสดงจำนวนทั้งหมด",
    tr: "Toplam Sayıyı Göster",
    uk: "Показати загальну кількість",
    ur: "کل نمبر دکھائیں",
    vi: "Hiển thị tổng số",
    "zh-Hans": "显示总数",
    "zh-Hant": "顯示總數"
  },
  hide_card_if_empty: {
    en: "Hide Card When Nothing Is Active",
    ar: "إخفاء البطاقة عندما لا يكون شيء نشطًا",
    bg: "Скрий картата, когато нищо не е активно",
    bn: "কিছুই সক্রিয় না থাকলে কার্ড লুকান",
    bs: "Sakrij karticu kada ništa nije aktivno",
    cs: "Skrýt kartu, když nic není aktivní",
    da: "Skjul kort, når intet er aktivt",
    de: "Karte ausblenden, wenn nichts aktiv ist",
    el: "Απόκρυψη κάρτας όταν δεν υπάρχει ενεργό στοιχείο",
    "en-GB": "Hide Card When Nothing Is Active",
    es: "Ocultar tarjeta cuando nada está activo",
    "es-419": "Ocultar tarjeta cuando nada está activo",
    et: "Peida kaart, kui miski pole aktiivne",
    eu: "Ezkutatu txartela ezer aktibo ez dagoenean",
    fa: "مخفی کردن کارت وقتی چیزی فعال نیست",
    fi: "Piilota kortti, kun mikään ei ole aktiivinen",
    fr: "Masquer la carte lorsque rien n'est actif",
    "fr-CA": "Masquer la carte lorsque rien n'est actif",
    gl: "Agochar a tarxeta cando nada está activo",
    he: "הסתר כרטיס כאשר שום דבר אינו פעיל",
    hi: "कुछ भी सक्रिय न होने पर कार्ड छिपाएं",
    hu: "Kártya elrejtése, ha semmi sem aktív",
    hy: "Թաքցնել քարտը, երբ ոչինչ ակտիվ չէ",
    id: "Sembunyikan Kartu Saat Tidak Ada yang Aktif",
    it: "Nascondi la scheda quando non c'è nulla di attivo",
    ja: "何もアクティブでないときはカードを非表示",
    ka: "ბარათის დამალვა, როდესაც არაფერია აქტიური",
    ko: "활성 항목이 없으면 카드 숨기기",
    lt: "Slėpti kortelę, kai niekas nėra aktyvu",
    lv: "Paslēpt karti, kad nekas nav aktīvs",
    mk: "Сокриј ја картичката кога ништо не е активно",
    nl: "Kaart verbergen wanneer er niets actief is",
    nn: "Skjul kort når ingenting er aktivt",
    no: "Skjul kort når ingenting er aktivt",
    pl: "Ukryj kartę, gdy nic nie jest aktywne",
    pt: "Ocultar cartão quando nada estiver ativo",
    "pt-BR": "Ocultar cartão quando nada estiver ativo",
    ro: "Ascunde cardul când nimic nu este activ",
    ru: "Скрыть карту, когда ничего не активно",
    sk: "Skryť kartu, keď nič nie je aktívne",
    sl: "Skrij kartico, ko nič ni aktivno",
    sr: "Сакриј картицу када ништа није активно",
    sv: "Dölj kort när ingenting är aktivt",
    th: "ซ่อนการ์ดเมื่อไม่มีอะไรทำงาน",
    tr: "Hiçbir Şey Aktif Değilken Kartı Gizle",
    uk: "Сховати картку, коли нічого не активно",
    ur: "کچھ فعال نہ ہونے پر کارڈ چھپائیں",
    vi: "Ẩn thẻ khi không có gì đang hoạt động",
    "zh-Hans": "无活动内容时隐藏卡片",
    "zh-Hant": "沒有活動內容時隱藏卡片"
  },
  show_total_entities: {
    en: "Show All Entities",
    ar: "عرض جميع الكيانات",
    bg: "Покажи всички обекти",
    bn: "সব এন্টিটি দেখান",
    bs: "Prikaži sve entitete",
    cs: "Zobrazit všechny entity",
    da: "Vis alle enheder",
    de: "Zeige alle Entitäten",
    el: "Εμφάνιση όλων των οντοτήτων",
    "en-GB": "Show All Entities",
    es: "Mostrar todas las entidades",
    "es-419": "Mostrar todas las entidades",
    et: "Kuva kõik üksused",
    eu: "Erakutsi erakunde guztiak",
    fa: "نمایش همه موجودیت‌ها",
    fi: "Näytä kaikki entiteetit",
    fr: "Afficher toutes les entités",
    "fr-CA": "Afficher toutes les entités",
    gl: "Amosar todas as entidades",
    he: "הצג את כל הישויות",
    hi: "सभी एंटिटी दिखाएं",
    hu: "Összes entitás megjelenítése",
    hy: "Ցուցադրել բոլոր կազմակերպությունները",
    id: "Tampilkan Semua Entitas",
    it: "Mostra tutte le entità",
    ja: "すべてのエンティティを表示",
    ka: "ყველა ობიექტის ჩვენება",
    ko: "모든 엔티티 표시",
    lt: "Rodyti visus objektus",
    lv: "Rādīt visus objektus",
    mk: "Прикажи ги сите објекти",
    nl: "Alle entiteiten weergeven",
    nn: "Vis alle einingar",
    no: "Vis alle enheter",
    pl: "Pokaż wszystkie encje",
    pt: "Mostrar todas as entidades",
    "pt-BR": "Mostrar todas as entidades",
    ro: "Afișează toate entitățile",
    ru: "Показать все объекты",
    sk: "Zobraziť všetky entity",
    sl: "Prikaži vse entitete",
    sr: "Прикажи све објекте",
    sv: "Visa alla enheter",
    th: "แสดงเอนทิตี้ทั้งหมด",
    tr: "Tüm Varlıkları Göster",
    uk: "Показати всі об'єкти",
    ur: "تمام انٹیٹیز دکھائیں",
    vi: "Hiển thị tất cả thực thể",
    "zh-Hans": "显示所有实体",
    "zh-Hant": "顯示所有實體"
  },
  no_background: {
    en: "Hide Background",
    ar: "إخفاء الخلفية",
    bg: "Скрий фона",
    bn: "পেছনের রঙ লুকান",
    bs: "Sakrij pozadinu",
    cs: "Skrýt pozadí",
    da: "Skjul baggrund",
    de: "Hintergrund ausblenden",
    el: "Απόκρυψη φόντου",
    "en-GB": "Hide Background",
    es: "Ocultar fondo",
    "es-419": "Ocultar fondo",
    et: "Peida taust",
    eu: "Ezkutatu atzeko planoa",
    fa: "مخفی کردن پس‌زمینه",
    fi: "Piilota tausta",
    fr: "Masquer l'arrière-plan",
    "fr-CA": "Masquer l'arrière-plan",
    gl: "Agochar o fondo",
    he: "הסתר רקע",
    hi: "पृष्ठभूमि छिपाएं",
    hu: "Háttér elrejtése",
    hy: "Թաքցնել ֆոնը",
    id: "Sembunyikan Latar Belakang",
    it: "Nascondi lo sfondo",
    ja: "背景を非表示",
    ka: "ფონის დამალვა",
    ko: "배경 숨기기",
    lt: "Slėpti foną",
    lv: "Paslēpt fonu",
    mk: "Сокриј ја позадината",
    nl: "Achtergrond verbergen",
    nn: "Skjul bakgrunn",
    no: "Skjul bakgrunn",
    pl: "Ukryj tło",
    pt: "Ocultar fundo",
    "pt-BR": "Ocultar fundo",
    ro: "Ascunde fundalul",
    ru: "Скрыть фон",
    sk: "Skryť pozadie",
    sl: "Skrij ozadje",
    sr: "Сакриј позадину",
    sv: "Dölj bakgrund",
    th: "ซ่อนพื้นหลัง",
    tr: "Arka Planı Gizle",
    uk: "Сховати фон",
    ur: "پس‌منظر چھپائیں",
    vi: "Ẩn nền",
    "zh-Hans": "隐藏背景",
    "zh-Hant": "隱藏背景"
  },
  no_scroll: {
    en: "Show All Without Scrolling",
    ar: "عرض الكل دون تمرير",
    bg: "Покажи всичко без превъртане",
    bn: "স্ক্রল ছাড়াই সব দেখান",
    bs: "Prikaži sve bez skrolanja",
    cs: "Zobrazit vše bez rolování",
    da: "Vis alt uden at rulle",
    de: "Alles ohne Scrollen anzeigen",
    el: "Εμφάνιση όλων χωρίς κύλιση",
    "en-GB": "Show All Without Scrolling",
    es: "Mostrar todo sin desplazar",
    "es-419": "Mostrar todo sin desplazar",
    et: "Kuva kõik ilma kerimiseta",
    eu: "Erakutsi dena korritze gabe",
    fa: "نمایش همه بدون اسکرول",
    fi: "Näytä kaikki ilman vieritystä",
    fr: "Tout afficher sans défilement",
    "fr-CA": "Tout afficher sans défilement",
    gl: "Amosar todo sen desprazar",
    he: "הצג הכל ללא גלילה",
    hi: "बिना स्क्रॉल के सब दिखाएं",
    hu: "Minden megjelenítése görgetés nélkül",
    hy: "Ցուցադրել բոլորը առանց ոլորման",
    id: "Tampilkan Semua Tanpa Scroll",
    it: "Mostra tutto senza scorrere",
    ja: "スクロールせずにすべて表示",
    ka: "ყველაფრის ჩვენება გადახვევის გარეშე",
    ko: "스크롤 없이 모두 표시",
    lt: "Rodyti viską neslenkant",
    lv: "Rādīt visu bez ritošanas",
    mk: "Прикажи сè без скролување",
    nl: "Alles weergeven zonder scrollen",
    nn: "Vis alt utan å rulle",
    no: "Vis alt uten å rulle",
    pl: "Pokaż wszystko bez przewijania",
    pt: "Mostrar tudo sem rolar",
    "pt-BR": "Mostrar tudo sem rolar",
    ro: "Afișează tot fără derulare",
    ru: "Показать всё без прокрутки",
    sk: "Zobraziť všetko bez posúvania",
    sl: "Prikaži vse brez drsenja",
    sr: "Прикажи све без померања",
    sv: "Visa allt utan att rulla",
    th: "แสดงทั้งหมดโดยไม่ต้องเลื่อน",
    tr: "Kaydırmadan Tümünü Göster",
    uk: "Показати все без прокручування",
    ur: "اسکرول کے بغیر سب دکھائیں",
    vi: "Hiển thị tất cả mà không cuộn",
    "zh-Hans": "不滚动显示全部",
    "zh-Hant": "不捲動顯示全部"
  },
  square: {
    en: "Show Items as Squares",
    ar: "عرض العناصر كمربعات",
    bg: "Покажи елементите като квадрати",
    bn: "আইটেমগুলো বর্গক্ষেত্র হিসেবে দেখান",
    bs: "Prikaži stavke kao kvadrate",
    cs: "Zobrazit položky jako čtverce",
    da: "Vis elementer som firkanter",
    de: "Zeige Items als Quadrate",
    el: "Εμφάνιση στοιχείων ως τετράγωνα",
    "en-GB": "Show Items as Squares",
    es: "Mostrar elementos como cuadrados",
    "es-419": "Mostrar elementos como cuadrados",
    et: "Kuva üksused ruutudena",
    eu: "Erakutsi elementuak karratu gisa",
    fa: "نمایش موارد به‌صورت مربع",
    fi: "Näytä kohteet neliöinä",
    fr: "Afficher les éléments sous forme de carrés",
    "fr-CA": "Afficher les éléments sous forme de carrés",
    gl: "Amosar elementos como cadrados",
    he: "הצג פריטים כריבועים",
    hi: "आइटम को वर्गाकार रूप में दिखाएं",
    hu: "Elemek megjelenítése négyzetként",
    hy: "Ցուցադրել տարրերը քառակուսիների տեսքով",
    id: "Tampilkan Item sebagai Kotak",
    it: "Mostra elementi come quadrati",
    ja: "項目を正方形で表示",
    ka: "ელემენტების კვადრატების სახით ჩვენება",
    ko: "항목을 사각형으로 표시",
    lt: "Rodyti elementus kaip kvadratus",
    lv: "Rādīt vienumus kā kvadrātus",
    mk: "Прикажи ставки како квадрати",
    nl: "Items als vierkanten weergeven",
    nn: "Vis element som firkantar",
    no: "Vis elementer som firkanter",
    pl: "Pokaż elementy jako kwadraty",
    pt: "Mostrar itens como quadrados",
    "pt-BR": "Mostrar itens como quadrados",
    ro: "Afișează elementele ca pătrate",
    ru: "Показать элементы как квадраты",
    sk: "Zobraziť položky ako štvorce",
    sl: "Prikaži elemente kot kvadrate",
    sr: "Прикажи ставке као квадрате",
    sv: "Visa artiklar som rutor",
    th: "แสดงรายการเป็นสี่เหลี่ยม",
    tr: "Öğeleri Kare Olarak Göster",
    uk: "Показати елементи як квадрати",
    ur: "آئٹمز کو مربع کے طور پر دکھائیں",
    vi: "Hiển thị các mục dưới dạng hình vuông",
    "zh-Hans": "以正方形显示项目",
    "zh-Hant": "以正方形顯示項目"
  },
  toggle_on: {
    en: "Turn on",
    ar: "تشغيل",
    bg: "Включи",
    bn: "চালু করুন",
    bs: "Uključi",
    cs: "Zapnout",
    da: "Tænd",
    de: "Einschalten",
    el: "Ενεργοποίηση",
    "en-GB": "Turn on",
    es: "Encender",
    "es-419": "Encender",
    et: "Lülita sisse",
    eu: "Piztu",
    fa: "روشن کردن",
    fi: "Kytke päälle",
    fr: "Activer",
    "fr-CA": "Activer",
    gl: "Acender",
    he: "הפעל",
    hi: "चालू करें",
    hu: "Bekapcsolás",
    hy: "Միացնել",
    id: "Nyalakan",
    it: "Accendi",
    ja: "オンにする",
    ka: "ჩართვა",
    ko: "켜기",
    lt: "Įjungti",
    lv: "Ieslēgt",
    mk: "Вклучи",
    nl: "Inschakelen",
    nn: "Slå på",
    no: "Slå på",
    pl: "Włącz",
    pt: "Ligar",
    "pt-BR": "Ligar",
    ro: "Pornește",
    ru: "Включить",
    sk: "Zapnúť",
    sl: "Vklopi",
    sr: "Укључи",
    sv: "Slå på",
    th: "เปิด",
    tr: "Aç",
    uk: "Увімкнути",
    ur: "آن کریں",
    vi: "Bật",
    "zh-Hans": "开启",
    "zh-Hant": "開啟"
  },
  toggle_off: {
    en: "Turn off",
    ar: "إيقاف التشغيل",
    bg: "Изключи",
    bn: "বন্ধ করুন",
    bs: "Isključi",
    cs: "Vypnout",
    da: "Sluk",
    de: "Ausschalten",
    el: "Απενεργοποίηση",
    "en-GB": "Turn off",
    es: "Apagar",
    "es-419": "Apagar",
    et: "Lülita välja",
    eu: "Itzali",
    fa: "خاموش کردن",
    fi: "Kytke pois",
    fr: "Désactiver",
    "fr-CA": "Désactiver",
    gl: "Apagar",
    he: "כבה",
    hi: "बंद करें",
    hu: "Kikapcsolás",
    hy: "Անջատել",
    id: "Matikan",
    it: "Spegni",
    ja: "オフにする",
    ka: "გამორთვა",
    ko: "끄기",
    lt: "Išjungti",
    lv: "Izslēgt",
    mk: "Исклучи",
    nl: "Uitschakelen",
    nn: "Slå av",
    no: "Slå av",
    pl: "Wyłącz",
    pt: "Desligar",
    "pt-BR": "Desligar",
    ro: "Oprește",
    ru: "Выключить",
    sk: "Vypnúť",
    sl: "Izklopi",
    sr: "Искључи",
    sv: "Stäng av",
    th: "ปิด",
    tr: "Kapat",
    uk: "Вимкнути",
    ur: "بند کریں",
    vi: "Tắt",
    "zh-Hans": "关闭",
    "zh-Hant": "關閉"
  },
  on_light: {
    en: "Turn on lights",
    ar: "تشغيل الأضواء",
    bg: "Включи светлините",
    bn: "লাইট চালু করুন",
    bs: "Uključi svjetla",
    cs: "Zapnout světla",
    da: "Tænd lys",
    de: "Lichter einschalten",
    el: "Άναψε τα φώτα",
    "en-GB": "Turn on lights",
    es: "Encender luces",
    "es-419": "Encender luces",
    et: "Lülita tuled sisse",
    eu: "Piztu argiak",
    fa: "روشن کردن چراغ‌ها",
    fi: "Kytke valot päälle",
    fr: "Allumer les lumières",
    "fr-CA": "Allumer les lumières",
    gl: "Acender luces",
    he: "הפעל אורות",
    hi: "लाइट चालू करें",
    hu: "Lámpák bekapcsolása",
    hy: "Միացնել լույսերը",
    id: "Nyalakan Lampu",
    it: "Accendi le luci",
    ja: "照明をオンにする",
    ka: "განათების ჩართვა",
    ko: "조명 켜기",
    lt: "Įjungti šviesas",
    lv: "Ieslēgt gaismas",
    mk: "Вклучи светла",
    nl: "Lichten inschakelen",
    nn: "Slå på lysa",
    no: "Slå på lys",
    pl: "Włącz światła",
    pt: "Ligar luzes",
    "pt-BR": "Ligar luzes",
    ro: "Aprinde luminile",
    ru: "Включить свет",
    sk: "Zapnúť svetlá",
    sl: "Prižgi luči",
    sr: "Укључи светла",
    sv: "Sätt på lampor",
    th: "เปิดไฟ",
    tr: "Işıkları Aç",
    uk: "Увімкнути світло",
    ur: "لائٹس آن کریں",
    vi: "Bật đèn",
    "zh-Hans": "开启灯光",
    "zh-Hant": "開啟燈光"
  },
  off_light: {
    en: "Turn off lights",
    ar: "إيقاف تشغيل الأضواء",
    bg: "Изключи светлините",
    bn: "লাইট বন্ধ করুন",
    bs: "Isključi svjetla",
    cs: "Vypnout světla",
    da: "Sluk lys",
    de: "Lichter ausschalten",
    el: "Σβήσε τα φώτα",
    "en-GB": "Turn off lights",
    es: "Apagar luces",
    "es-419": "Apagar luces",
    et: "Lülita tuled välja",
    eu: "Itzali argiak",
    fa: "خاموش کردن چراغ‌ها",
    fi: "Kytke valot pois",
    fr: "Éteindre les lumières",
    "fr-CA": "Éteindre les lumières",
    gl: "Apagar luces",
    he: "כבה אורות",
    hi: "लाइट बंद करें",
    hu: "Lámpák kikapcsolása",
    hy: "Անջատել լույսերը",
    id: "Matikan Lampu",
    it: "Spegni le luci",
    ja: "照明をオフにする",
    ka: "განათების გამორთვა",
    ko: "조명 끄기",
    lt: "Išjungti šviesas",
    lv: "Izslēgt gaismas",
    mk: "Исклучи светла",
    nl: "Lichten uitschakelen",
    nn: "Slå av lysa",
    no: "Slå av lys",
    pl: "Wyłącz światła",
    pt: "Desligar luzes",
    "pt-BR": "Desligar luzes",
    ro: "Stinge luminile",
    ru: "Выключить свет",
    sk: "Vypnúť svetlá",
    sl: "Ugasi luči",
    sr: "Искључи светла",
    sv: "Stäng av lampor",
    th: "ปิดไฟ",
    tr: "Işıkları Kapat",
    uk: "Вимкнути світло",
    ur: "لائٹس بند کریں",
    vi: "Tắt đèn",
    "zh-Hans": "关闭灯光",
    "zh-Hant": "關閉燈光"
  },
  on_switch: {
    en: "Turn on switches",
    ar: "تشغيل المفاتيح",
    bg: "Включи превключвателите",
    bn: "সুইচ চালু করুন",
    bs: "Uključi prekidače",
    cs: "Zapnout vypínače",
    da: "Tænd kontakter",
    de: "Schalter einschalten",
    el: "Άναψε τους διακόπτες",
    "en-GB": "Turn on switches",
    es: "Encender interruptores",
    "es-419": "Encender interruptores",
    et: "Lülita lülitid sisse",
    eu: "Piztu etengailuak",
    fa: "روشن کردن کلیدها",
    fi: "Kytke kytkimet päälle",
    fr: "Allumer les interrupteurs",
    "fr-CA": "Allumer les interrupteurs",
    gl: "Acender interruptores",
    he: "הפעל מתגים",
    hi: "स्विच चालू करें",
    hu: "Kapcsolók bekapcsolása",
    hy: "Միացնել անջատիչները",
    id: "Nyalakan Saklar",
    it: "Accendi gli interruttori",
    ja: "スイッチをオンにする",
    ka: "გადართველების ჩართვა",
    ko: "스위치 켜기",
    lt: "Įjungti jungiklius",
    lv: "Ieslēgt slēdžus",
    mk: "Вклучи прекинувачи",
    nl: "Schakelaars inschakelen",
    nn: "Slå på brytarar",
    no: "Slå på brytere",
    pl: "Włącz przełączniki",
    pt: "Ligar interruptores",
    "pt-BR": "Ligar interruptores",
    ro: "Pornește întrerupătoarele",
    ru: "Включить выключатели",
    sk: "Zapnúť vypínače",
    sl: "Vklopi stikala",
    sr: "Укључи прекидаче",
    sv: "Sätt på brytare",
    th: "เปิดสวิตช์",
    tr: "Anahtarları Aç",
    uk: "Увімкнути вимикачі",
    ur: "سوئچ آن کریں",
    vi: "Bật công tắc",
    "zh-Hans": "开启开关",
    "zh-Hant": "開啟開關"
  },
  off_switch: {
    en: "Turn off switches",
    ar: "إيقاف تشغيل المفاتيح",
    bg: "Изключи превключвателите",
    bn: "সুইচ বন্ধ করুন",
    bs: "Isključi prekidače",
    cs: "Vypnout vypínače",
    da: "Sluk kontakter",
    de: "Schalter ausschalten",
    el: "Σβήσε τους διακόπτες",
    "en-GB": "Turn off switches",
    es: "Apagar interruptores",
    "es-419": "Apagar interruptores",
    et: "Lülita lülitid välja",
    eu: "Itzali etengailuak",
    fa: "خاموش کردن کلیدها",
    fi: "Kytke kytkimet pois",
    fr: "Éteindre les interrupteurs",
    "fr-CA": "Éteindre les interrupteurs",
    gl: "Apagar interruptores",
    he: "כבה מתגים",
    hi: "स्विच बंद करें",
    hu: "Kapcsolók kikapcsolása",
    hy: "Անջատել անջատիչները",
    id: "Matikan Saklar",
    it: "Spegni gli interruttori",
    ja: "スイッチをオフにする",
    ka: "გადართველების გამორთვა",
    ko: "스위치 끄기",
    lt: "Išjungti jungiklius",
    lv: "Izslēgt slēdžus",
    mk: "Исклучи прекинувачи",
    nl: "Schakelaars uitschakelen",
    nn: "Slå av brytarar",
    no: "Slå av brytere",
    pl: "Wyłącz przełączniki",
    pt: "Desligar interruptores",
    "pt-BR": "Desligar interruptores",
    ro: "Oprește întrerupătoarele",
    ru: "Выключить выключатели",
    sk: "Vypnúť vypínače",
    sl: "Izklopi stikala",
    sr: "Искључи прекидаче",
    sv: "Stäng av brytare",
    th: "ปิดสวิตช์",
    tr: "Anahtarları Kapat",
    uk: "Вимкнути вимикачі",
    ur: "سوئچ بند کریں",
    vi: "Tắt công tắc",
    "zh-Hans": "关闭开关",
    "zh-Hant": "關閉開關"
  },
  on_fan: {
    en: "Turn on fans",
    ar: "تشغيل المراوح",
    bg: "Включи вентилаторите",
    bn: "পাখা চালু করুন",
    bs: "Uključi ventilatore",
    cs: "Zapnout ventilátory",
    da: "Tænd ventilatorer",
    de: "Ventilatoren einschalten",
    el: "Άναψε τους ανεμιστήρες",
    "en-GB": "Turn on fans",
    es: "Encender ventiladores",
    "es-419": "Encender ventiladores",
    et: "Lülita ventilaatorid sisse",
    eu: "Piztu haizagailuak",
    fa: "روشن کردن فن‌ها",
    fi: "Kytke tuulettimet päälle",
    fr: "Allumer les ventilateurs",
    "fr-CA": "Allumer les ventilateurs",
    gl: "Acender ventiladores",
    he: "הפעל מאווררים",
    hi: "पंखे चालू करें",
    hu: "Ventilátorok bekapcsolása",
    hy: "Միացնել օդափոխիչները",
    id: "Nyalakan Kipas",
    it: "Accendi le ventole",
    ja: "扇風機をオンにする",
    ka: "ვენტილატორების ჩართვა",
    ko: "선풍기 켜기",
    lt: "Įjungti ventiliatorius",
    lv: "Ieslēgt ventilatorus",
    mk: "Вклучи вентилатори",
    nl: "Ventilatoren inschakelen",
    nn: "Slå på vifter",
    no: "Slå på vifter",
    pl: "Włącz wentylatory",
    pt: "Ligar ventiladores",
    "pt-BR": "Ligar ventiladores",
    ro: "Pornește ventilatoarele",
    ru: "Включить вентиляторы",
    sk: "Zapnúť ventilátory",
    sl: "Vklopi ventilatorje",
    sr: "Укључи вентилаторе",
    sv: "Sätt på fläktar",
    th: "เปิดพัดลม",
    tr: "Fanları Aç",
    uk: "Увімкнути вентилятори",
    ur: "پنکھے آن کریں",
    vi: "Bật quạt",
    "zh-Hans": "开启风扇",
    "zh-Hant": "開啟風扇"
  },
  off_fan: {
    en: "Turn off fans",
    ar: "إيقاف تشغيل المراوح",
    bg: "Изключи вентилаторите",
    bn: "পাখা বন্ধ করুন",
    bs: "Isključi ventilatore",
    cs: "Vypnout ventilátory",
    da: "Sluk ventilatorer",
    de: "Ventilatoren ausschalten",
    el: "Σβήσε τους ανεμιστήρες",
    "en-GB": "Turn off fans",
    es: "Apagar ventiladores",
    "es-419": "Apagar ventiladores",
    et: "Lülita ventilaatorid välja",
    eu: "Itzali haizagailuak",
    fa: "خاموش کردن فن‌ها",
    fi: "Kytke tuulettimet pois",
    fr: "Éteindre les ventilateurs",
    "fr-CA": "Éteindre les ventilateurs",
    gl: "Apagar ventiladores",
    he: "כבה מאווררים",
    hi: "पंखे बंद करें",
    hu: "Ventilátorok kikapcsolása",
    hy: "Անջատել օդափոխիչները",
    id: "Matikan Kipas",
    it: "Spegni le ventole",
    ja: "扇風機をオフにする",
    ka: "ვენტილატორების გამორთვა",
    ko: "선풍기 끄기",
    lt: "Išjungti ventilatorius",
    lv: "Izslēgt ventilatorus",
    mk: "Исклучи вентилатори",
    nl: "Ventilatoren uitschakelen",
    nn: "Slå av vifter",
    no: "Slå av vifter",
    pl: "Wyłącz wentylatory",
    pt: "Desligar ventiladores",
    "pt-BR": "Desligar ventiladores",
    ro: "Oprește ventilatoarele",
    ru: "Выключить вентиляторы",
    sk: "Vypnúť ventilátory",
    sl: "Izklopi ventilatorje",
    sr: "Искључи вентилаторе",
    sv: "Stäng av fläktar",
    th: "ปิดพัดลม",
    tr: "Fanları Kapat",
    uk: "Вимкнути вентилятори",
    ur: "پنکھے بند کریں",
    vi: "Tắt quạt",
    "zh-Hans": "关闭风扇",
    "zh-Hant": "關閉風扇"
  },
  on_cover: {
    en: "Open covers",
    ar: "فتح الأغطية",
    bg: "Отвори щорите",
    bn: "কভার খুলুন",
    bs: "Otvori pokrivače",
    cs: "Otevřít rolety",
    da: "Åbn gardiner",
    de: "Beschattungen öffnen",
    el: "Άνοιξε τα σκίαστρα",
    "en-GB": "Open covers",
    es: "Abrir persianas",
    "es-419": "Abrir persianas",
    et: "Ava rulood",
    eu: "Ireki pertsianak",
    fa: "باز کردن پرده‌ها",
    fi: "Avaa kaihtimet",
    fr: "Ouvrir les volets",
    "fr-CA": "Ouvrir les volets",
    gl: "Abrir toldos",
    he: "פתח וילונות",
    hi: "कवर खोलें",
    hu: "Reluxák kinyitása",
    hy: "Բացել շերտավարագույրները",
    id: "Buka Tirai",
    it: "Apri le tapparelle",
    ja: "カバーを開く",
    ka: "ჟალუზების გახსნა",
    ko: "커버 열기",
    lt: "Atidaryti žaliuzes",
    lv: "Atvērt žalūzijas",
    mk: "Отвори ролетни",
    nl: "Afdekkingen openen",
    nn: "Opne persienner",
    no: "Åpne persienner",
    pl: "Otwórz rolety",
    pt: "Abrir persianas",
    "pt-BR": "Abrir persianas",
    ro: "Deschide jaluzelele",
    ru: "Открыть жалюзи",
    sk: "Otvoriť rolety",
    sl: "Odpri polkna",
    sr: "Отвори ролетне",
    sv: "Öppna persienner",
    th: "เปิดมู่ลี่",
    tr: "Perdeleri Aç",
    uk: "Відкрити жалюзі",
    ur: "کور کھولیں",
    vi: "Mở rèm",
    "zh-Hans": "打开卷帘",
    "zh-Hant": "打開窗簾"
  },
  off_cover: {
    en: "Close covers",
    ar: "إغلاق الأغطية",
    bg: "Затвори щорите",
    bn: "কভার বন্ধ করুন",
    bs: "Zatvori pokrivače",
    cs: "Zavřít rolety",
    da: "Luk gardiner",
    de: "Beschattungen schließen",
    el: "Κλείσε τα σκίαστρα",
    "en-GB": "Close covers",
    es: "Cerrar persianas",
    "es-419": "Cerrar persianas",
    et: "Sulge rulood",
    eu: "Itxi pertsianak",
    fa: "بستن پرده‌ها",
    fi: "Sulje kaihtimet",
    fr: "Fermer les volets",
    "fr-CA": "Fermer les volets",
    gl: "Pechar toldos",
    he: "סגור וילונות",
    hi: "कवर बंद करें",
    hu: "Reluxák bezárása",
    hy: "Փակել շերտավարագույրները",
    id: "Tutup Tirai",
    it: "Chiudi le tapparelle",
    ja: "カバーを閉じる",
    ka: "ჟალუზების დახურვა",
    ko: "커버 닫기",
    lt: "Uždaryti žaliuzes",
    lv: "Aizvērt žalūzijas",
    mk: "Затвори ролетни",
    nl: "Afdekkingen sluiten",
    nn: "Lukk persienner",
    no: "Lukk persienner",
    pl: "Zamknij rolety",
    pt: "Fechar persianas",
    "pt-BR": "Fechar persianas",
    ro: "Închide jaluzelele",
    ru: "Закрыть жалюзи",
    sk: "Zavrieť rolety",
    sl: "Zapri polkna",
    sr: "Затвори ролетне",
    sv: "Stäng persienner",
    th: "ปิดมู่ลี่",
    tr: "Perdeleri Kapat",
    uk: "Закрити жалюзі",
    ur: "کور بند کریں",
    vi: "Đóng rèm",
    "zh-Hans": "关闭卷帘",
    "zh-Hant": "關閉窗簾"
  },
  on_siren: {
    en: "Turn on sirens",
    ar: "تشغيل صفارات الإنذار",
    bg: "Включи сирените",
    bn: "সাইরেন চালু করুন",
    bs: "Uključi sirene",
    cs: "Zapnout sirény",
    da: "Tænd sirener",
    de: "Sirenen einschalten",
    el: "Άναψε τις σειρήνες",
    "en-GB": "Turn on sirens",
    es: "Encender sirenas",
    "es-419": "Encender sirenas",
    et: "Lülita sireenid sisse",
    eu: "Piztu sirenak",
    fa: "روشن کردن آژیرها",
    fi: "Kytke sireenit päälle",
    fr: "Activer les sirènes",
    "fr-CA": "Activer les sirènes",
    gl: "Acender sirenas",
    he: "הפעל צופרים",
    hi: "सायरन चालू करें",
    hu: "Szirénák bekapcsolása",
    hy: "Միացնել ազդանշանները",
    id: "Nyalakan Sirine",
    it: "Accendi le sirene",
    ja: "サイレンをオンにする",
    ka: "სირენების ჩართვა",
    ko: "사이렌 켜기",
    lt: "Įjungti sirenas",
    lv: "Ieslēgt sirēnas",
    mk: "Вклучи сирени",
    nl: "Sirenes inschakelen",
    nn: "Slå på sirener",
    no: "Slå på sirener",
    pl: "Włącz syreny",
    pt: "Ligar sirenes",
    "pt-BR": "Ligar sirenes",
    ro: "Pornește sirenele",
    ru: "Включить сирены",
    sk: "Zapnúť sirény",
    sl: "Vklopi sirene",
    sr: "Укључи сирене",
    sv: "Sätt på sirener",
    th: "เปิดไซเรน",
    tr: "Sirenleri Aç",
    uk: "Увімкнути сирени",
    ur: "سائرن آن کریں",
    vi: "Bật còi báo động",
    "zh-Hans": "开启警报器",
    "zh-Hant": "開啟警報器"
  },
  off_siren: {
    en: "Turn off sirens",
    ar: "إيقاف تشغيل صفارات الإنذار",
    bg: "Изключи сирените",
    bn: "সাইরেন বন্ধ করুন",
    bs: "Isključi sirene",
    cs: "Vypnout sirény",
    da: "Sluk sirener",
    de: "Sirenen ausschalten",
    el: "Σβήσε τις σειρήνες",
    "en-GB": "Turn off sirens",
    es: "Apagar sirenas",
    "es-419": "Apagar sirenas",
    et: "Lülita sireenid välja",
    eu: "Itzali sirenak",
    fa: "خاموش کردن آژیرها",
    fi: "Kytke sireenit pois",
    fr: "Désactiver les sirènes",
    "fr-CA": "Désactiver les sirènes",
    gl: "Apagar sirenas",
    he: "כבה צופרים",
    hi: "सायरन बंद करें",
    hu: "Szirénák kikapcsolása",
    hy: "Անջատել ազդանշանները",
    id: "Matikan Sirine",
    it: "Spegni le sirene",
    ja: "サイレンをオフにする",
    ka: "სირენების გამორთვა",
    ko: "사이렌 끄기",
    lt: "Išjungti sirenas",
    lv: "Izslēgt sirēnas",
    mk: "Исклучи сирени",
    nl: "Sirenes uitschakelen",
    nn: "Slå av sirener",
    no: "Slå av sirener",
    pl: "Wyłącz syreny",
    pt: "Desligar sirenes",
    "pt-BR": "Desligar sirenes",
    ro: "Oprește sirenele",
    ru: "Выключить сирены",
    sk: "Vypnúť sirény",
    sl: "Izklopi sirene",
    sr: "Искључи сирене",
    sv: "Stäng av sirener",
    th: "ปิดไซเรน",
    tr: "Sirenleri Kapat",
    uk: "Вимкнути сирени",
    ur: "سائرن بند کریں",
    vi: "Tắt còi báo động",
    "zh-Hans": "关闭警报器",
    "zh-Hant": "關閉警報器"
  },
  on_climate: {
    en: "Turn on climate",
    ar: "تشغيل المناخ",
    bg: "Включи климатика",
    bn: "ক্লাইমেট চালু করুন",
    bs: "Uključi klimu",
    cs: "Zapnout klima",
    da: "Tænd klima",
    de: "Klimaanlage einschalten",
    el: "Άναψε το κλίμα",
    "en-GB": "Turn on climate",
    es: "Encender clima",
    "es-419": "Encender clima",
    et: "Lülita kliima sisse",
    eu: "Piztu klima",
    fa: "روشن کردن سیستم آب و هوا",
    fi: "Kytke ilmastointi päälle",
    fr: "Activer le climatiseur",
    "fr-CA": "Activer le climatiseur",
    gl: "Acender clima",
    he: "הפעל אקלים",
    hi: "क्लाइमेट चालू करें",
    hu: "Klíma bekapcsolása",
    hy: "Միացնել կլիման",
    id: "Nyalakan AC",
    it: "Accendi il clima",
    ja: "空調をオンにする",
    ka: "კლიმატის ჩართვა",
    ko: "기기 켜기",
    lt: "Įjungti klimatą",
    lv: "Ieslēgt klimatu",
    mk: "Вклучи клима",
    nl: "Klimaat inschakelen",
    nn: "Slå på klima",
    no: "Slå på klima",
    pl: "Włącz klimatyzację",
    pt: "Ligar clima",
    "pt-BR": "Ligar clima",
    ro: "Pornește climatizarea",
    ru: "Включить климат",
    sk: "Zapnúť klimatizáciu",
    sl: "Vklopi klimo",
    sr: "Укључи климу",
    sv: "Sätt på klimat",
    th: "เปิดระบบอากาศ",
    tr: "İklimi Aç",
    uk: "Увімкнути клімат",
    ur: "کلائمیٹ آن کریں",
    vi: "Bật điều hòa",
    "zh-Hans": "开启气候调节",
    "zh-Hant": "開啟氣候調節"
  },
  off_climate: {
    en: "Turn off climate",
    ar: "إيقاف تشغيل المناخ",
    bg: "Изключи климатика",
    bn: "ক্লাইমেট বন্ধ করুন",
    bs: "Isključi klimu",
    cs: "Vypnout klima",
    da: "Sluk klima",
    de: "Klimaanlage ausschalten",
    el: "Σβήσε το κλίμα",
    "en-GB": "Turn off climate",
    es: "Apagar clima",
    "es-419": "Apagar clima",
    et: "Lülita kliima välja",
    eu: "Itzali klima",
    fa: "خاموش کردن سیستم آب و هوا",
    fi: "Kytke ilmastointi pois",
    fr: "Désactiver le climatiseur",
    "fr-CA": "Désactiver le climatiseur",
    gl: "Apagar clima",
    he: "כבה אקלים",
    hi: "क्लाइमेट बंद करें",
    hu: "Klíma kikapcsolása",
    hy: "Անջատել կլիման",
    id: "Matikan AC",
    it: "Spegni il clima",
    ja: "空調をオフにする",
    ka: "კლიმატის გამორთვა",
    ko: "기기 끄기",
    lt: "Išjungti klimatą",
    lv: "Izslēgt klimatu",
    mk: "Исклучи клима",
    nl: "Klimaat uitschakelen",
    nn: "Slå av klima",
    no: "Slå av klima",
    pl: "Wyłącz klimatyzację",
    pt: "Desligar clima",
    "pt-BR": "Desligar clima",
    ro: "Oprește climatizarea",
    ru: "Выключить климат",
    sk: "Vypnúť klimatizáciu",
    sl: "Izklopi klimo",
    sr: "Искључи климу",
    sv: "Stäng av klimat",
    th: "ปิดระบบอากาศ",
    tr: "İklimi Kapat",
    uk: "Вимкнути клімат",
    ur: "کلائمیٹ بند کریں",
    vi: "Tắt điều hòa",
    "zh-Hans": "关闭气候调节",
    "zh-Hant": "關閉氣候調節"
  },
  on_humidifier: {
    en: "Turn on humidifiers",
    ar: "تشغيل أجهزة الترطيب",
    bg: "Включи овлажнителите",
    bn: "হিউমিডিফায়ার চালু করুন",
    bs: "Uključi ovlaživače",
    cs: "Zapnout zvlhčovače",
    da: "Tænd luftfugtere",
    de: "Luftbefeuchter einschalten",
    el: "Άναψε τους υγραντήρες",
    "en-GB": "Turn on humidifiers",
    es: "Encender humidificadores",
    "es-419": "Encender humidificadores",
    et: "Lülita niisutajad sisse",
    eu: "Piztu hezegailuak",
    fa: "روشن کردن مرطوب‌کننده‌ها",
    fi: "Kytke ilmankostuttimet päälle",
    fr: "Allumer les humidificateurs",
    "fr-CA": "Allumer les humidificateurs",
    gl: "Acender humidificadores",
    he: "הפעל מכשירי לחות",
    hi: "ह्यूमिडिफ़ायर चालू करें",
    hu: "Párásítók bekapcsolása",
    hy: "Միացնել խոնավեցուցիչները",
    id: "Nyalakan Humidifier",
    it: "Accendi gli umidificatori",
    ja: "加湿器をオンにする",
    ka: "დამატენიანებლების ჩართვა",
    ko: "가습기 켜기",
    lt: "Įjungti drėkintuvus",
    lv: "Ieslēgt gaisa mitrinātājus",
    mk: "Вклучи овлажнувачи",
    nl: "Luchtbevochtigers inschakelen",
    nn: "Slå på luftfuktarar",
    no: "Slå på luftfuktere",
    pl: "Włącz nawilżacze",
    pt: "Ligar umidificadores",
    "pt-BR": "Ligar umidificadores",
    ro: "Pornește umidificatoarele",
    ru: "Включить увлажнители",
    sk: "Zapnúť zvlhčovače",
    sl: "Vklopi vlažilce",
    sr: "Укључи овлаживаче",
    sv: "Sätt på luftfuktare",
    th: "เปิดเครื่องเพิ่มความชื้น",
    tr: "Nemlendiricileri Aç",
    uk: "Увімкнути зволожувачі",
    ur: "ہیومیڈیفائر آن کریں",
    vi: "Bật máy tạo ẩm",
    "zh-Hans": "开启加湿器",
    "zh-Hant": "開啟加濕器"
  },
  off_humidifier: {
    en: "Turn off humidifiers",
    ar: "إيقاف تشغيل أجهزة الترطيب",
    bg: "Изключи овлажнителите",
    bn: "হিউমিডিফায়ার বন্ধ করুন",
    bs: "Isključi ovlaživače",
    cs: "Vypnout zvlhčovače",
    da: "Sluk luftfugtere",
    de: "Luftbefeuchter ausschalten",
    el: "Σβήσε τους υγραντήρες",
    "en-GB": "Turn off humidifiers",
    es: "Apagar humidificadores",
    "es-419": "Apagar humidificadores",
    et: "Lülita niisutajad välja",
    eu: "Itzali hezegailuak",
    fa: "خاموش کردن مرطوب‌کننده‌ها",
    fi: "Kytke ilmankostuttimet pois",
    fr: "Éteindre les humidificateurs",
    "fr-CA": "Éteindre les humidificateurs",
    gl: "Apagar humidificadores",
    he: "כבה מכשירי לחות",
    hi: "ह्यूमिडिफ़ायर बंद करें",
    hu: "Párásítók kikapcsolása",
    hy: "Անջատել խոնավեցուցիչները",
    id: "Matikan Humidifier",
    it: "Spegni gli umidificatori",
    ja: "加湿器をオフにする",
    ka: "დამატენიანებლების გამორთვა",
    ko: "가습기 끄기",
    lt: "Išjungti drėkintuvus",
    lv: "Izslēgt gaisa mitrinātājus",
    mk: "Исклучи овлажнувачи",
    nl: "Luchtbevochtigers uitschakelen",
    nn: "Slå av luftfuktarar",
    no: "Slå av luftfuktere",
    pl: "Wyłącz nawilżacze",
    pt: "Desligar umidificadores",
    "pt-BR": "Desligar umidificadores",
    ro: "Oprește umidificatoarele",
    ru: "Выключить увлажнители",
    sk: "Vypnúť zvlhčovače",
    sl: "Izklopi vlažilce",
    sr: "Искључи овлаживаче",
    sv: "Stäng av luftfuktare",
    th: "ปิดเครื่องเพิ่มความชื้น",
    tr: "Nemlendiricileri Kapat",
    uk: "Вимкнути зволожувачі",
    ur: "ہیومیڈیفائر بند کریں",
    vi: "Tắt máy tạo ẩm",
    "zh-Hans": "关闭加湿器",
    "zh-Hant": "關閉加濕器"
  },
  on_valve: {
    en: "Open valves",
    ar: "فتح الصمامات",
    bg: "Отвори клапаните",
    bn: "ভালভ খুলুন",
    bs: "Otvori ventile",
    cs: "Otevřít ventily",
    da: "Åbn ventiler",
    de: "Ventile öffnen",
    el: "Άνοιξε τις βαλβίδες",
    "en-GB": "Open valves",
    es: "Abrir válvulas",
    "es-419": "Abrir válvulas",
    et: "Ava ventiilid",
    eu: "Ireki balbulak",
    fa: "باز کردن شیرها",
    fi: "Avaa venttiilit",
    fr: "Ouvrir les vannes",
    "fr-CA": "Ouvrir les vannes",
    gl: "Abrir válvulas",
    he: "פתח שסתומים",
    hi: "वाल्व खोलें",
    hu: "Szelepek kinyitása",
    hy: "Բացել փականները",
    id: "Buka Katup",
    it: "Apri le valvole",
    ja: "バルブを開く",
    ka: "სარქვლების გახსნა",
    ko: "밸브 열기",
    lt: "Atidaryti vožtuvus",
    lv: "Atvērt vārstus",
    mk: "Отвори вентили",
    nl: "Kleppen openen",
    nn: "Opne ventilane",
    no: "Åpne ventiler",
    pl: "Otwórz zawory",
    pt: "Abrir válvulas",
    "pt-BR": "Abrir válvulas",
    ro: "Deschide supapele",
    ru: "Открыть клапаны",
    sk: "Otvoriť ventily",
    sl: "Odpri ventile",
    sr: "Отвори вентиле",
    sv: "Öppna ventiler",
    th: "เปิดวาล์ว",
    tr: "Vanaları Aç",
    uk: "Відкрити клапани",
    ur: "والو کھولیں",
    vi: "Mở van",
    "zh-Hans": "打开阀门",
    "zh-Hant": "打開閥門"
  },
  off_valve: {
    en: "Close valves",
    ar: "إغلاق الصمامات",
    bg: "Затвори клапаните",
    bn: "ভালভ বন্ধ করুন",
    bs: "Zatvori ventile",
    cs: "Zavřít ventily",
    da: "Luk ventiler",
    de: "Ventile schließen",
    el: "Κλείσε τις βαλβίδες",
    "en-GB": "Close valves",
    es: "Cerrar válvulas",
    "es-419": "Cerrar válvulas",
    et: "Sulge ventiilid",
    eu: "Itxi balbulak",
    fa: "بستن شیرها",
    fi: "Sulje venttiilit",
    fr: "Fermer les vannes",
    "fr-CA": "Fermer les vannes",
    gl: "Pechar válvulas",
    he: "סגור שסתומים",
    hi: "वाल्व बंद करें",
    hu: "Szelepek bezárása",
    hy: "Փակել փականները",
    id: "Tutup Katup",
    it: "Chiudi le valvole",
    ja: "バルブを閉じる",
    ka: "სარქვლების დახურვა",
    ko: "밸브 닫기",
    lt: "Uždaryti vožtuvus",
    lv: "Aizvērt vārstus",
    mk: "Затвори вентили",
    nl: "Kleppen sluiten",
    nn: "Lukk ventilane",
    no: "Lukk ventiler",
    pl: "Zamknij zawory",
    pt: "Fechar válvulas",
    "pt-BR": "Fechar válvulas",
    ro: "Închide supapele",
    ru: "Закрыть клапаны",
    sk: "Zavrieť ventily",
    sl: "Zapri ventile",
    sr: "Затвори вентиле",
    sv: "Stäng ventiler",
    th: "ปิดวาล์ว",
    tr: "Vanaları Kapat",
    uk: "Закрити клапани",
    ur: "والو بند کریں",
    vi: "Đóng van",
    "zh-Hans": "关闭阀门",
    "zh-Hant": "關閉閥門"
  },
  on_remote: {
    en: "Turn on remotes",
    ar: "تشغيل أجهزة التحكم عن بعد",
    bg: "Включи дистанционните",
    bn: "রিমোট চালু করুন",
    bs: "Uključi daljinske",
    cs: "Zapnout dálkové ovladače",
    da: "Tænd fjernbetjeninger",
    de: "Fernbedienungen einschalten",
    el: "Άναψε τα τηλεχειριστήρια",
    "en-GB": "Turn on remotes",
    es: "Encender controles remotos",
    "es-419": "Encender controles remotos",
    et: "Lülita kaugjuhtimispuldid sisse",
    eu: "Piztu urrutiko aginteak",
    fa: "روشن کردن کنترل‌ها",
    fi: "Kytke kaukosäätimet päälle",
    fr: "Allumer les télécommandes",
    "fr-CA": "Allumer les télécommandes",
    gl: "Acender controis remotos",
    he: "הפעל שלטים",
    hi: "रिमोट चालू करें",
    hu: "Távirányítók bekapcsolása",
    hy: "Միացնել հեռակառավարիչները",
    id: "Nyalakan Remote",
    it: "Accendi i telecomandi",
    ja: "リモコンをオンにする",
    ka: "დისტანციურების ჩართვა",
    ko: "리모컨 켜기",
    lt: "Įjungti nuotolinio valdymo pultus",
    lv: "Ieslēgt tālvadības pultis",
    mk: "Вклучи далечински",
    nl: "Afstandsbedieningen inschakelen",
    nn: "Slå på fjernkontrollar",
    no: "Slå på fjernkontroller",
    pl: "Włącz piloty",
    pt: "Ligar controles remotos",
    "pt-BR": "Ligar controles remotos",
    ro: "Pornește telecomenzile",
    ru: "Включить пульты",
    sk: "Zapnúť diaľkové ovládače",
    sl: "Vklopi daljinske upravljalnike",
    sr: "Укључи даљинске",
    sv: "Sätt på fjärrkontroller",
    th: "เปิดรีโมท",
    tr: "Uzaktan Kumandaları Aç",
    uk: "Увімкнути пульти",
    ur: "ریموٹ آن کریں",
    vi: "Bật điều khiển từ xa",
    "zh-Hans": "开启遥控器  ",
    "zh-Hant": "開啟遙控器"
  },
  off_remote: {
    en: "Turn off remotes",
    ar: "إيقاف تشغيل أجهزة التحكم عن بعد",
    bg: "Изключи дистанционните",
    bn: "রিমোট বন্ধ করুন",
    bs: "Isključi daljinske",
    cs: "Vypnout dálkové ovladače",
    da: "Sluk fjernbetjeninger",
    de: "Fernbedienungen ausschalten",
    el: "Σβήσε τα τηλεχειριστήρια",
    "en-GB": "Turn off remotes",
    es: "Apagar controles remotos",
    "es-419": "Apagar controles remotos",
    et: "Lülita kaugjuhtimispuldid välja",
    eu: "Itzali urrutiko aginteak",
    fa: "خاموش کردن کنترل‌ها",
    fi: "Kytke kaukosäätimet pois",
    fr: "Éteindre les télécommandes",
    "fr-CA": "Éteindre les télécommandes",
    gl: "Apagar controis remotos",
    he: "כבה שלטים",
    hi: "रिमोट बंद करें",
    hu: "Távirányítók kikapcsolása",
    hy: "Անջատել հեռակառավարիչները",
    id: "Matikan Remote",
    it: "Spegni i telecomandi",
    ja: "リモコンをオフにする",
    ka: "დისტანციურების გამორთვა",
    ko: "리모컨 끄기",
    lt: "Išjungti nuotolinio valdymo pultus",
    lv: "Izslēgt tālvadības pultis",
    mk: "Исклучи далечински",
    nl: "Afstandsbedieningen uitschakelen",
    nn: "Slå av fjernkontrollar",
    no: "Slå av fjernkontroller",
    pl: "Wyłącz piloty",
    pt: "Desligar controles remotos",
    "pt-BR": "Desligar controles remotos",
    ro: "Oprește telecomenzile",
    ru: "Выключить пульты",
    sk: "Vypnúť diaľkové ovládače",
    sl: "Izklopi daljinske upravljalnike",
    sr: "Искључи даљинске",
    sv: "Stäng av fjärrkontroller",
    th: "ปิดรีโมท",
    tr: "Uzaktan Kumandaları Kapat",
    uk: "Вимкнути пульти",
    ur: "ریموٹ بند کریں",
    vi: "Tắt điều khiển từ xa",
    "zh-Hans": "关闭遥控器",
    "zh-Hant": "關閉遙控器"
  },
  on_media_player: {
    en: "Turn on players",
    ar: "تشغيل المشغلات",
    bg: "Включи плейърите",
    bn: "প্লেয়ার চালু করুন",
    bs: "Uključi playere",
    cs: "Zapnout přehrávače",
    da: "Tænd afspillere",
    de: "Player einschalten",
    el: "Άναψε τις συσκευές αναπαραγωγής",
    "en-GB": "Turn on players",
    es: "Encender reproductores",
    "es-419": "Encender reproductores",
    et: "Lülita mängijad sisse",
    eu: "Piztu erreproduktoreak",
    fa: "روشن کردن پخش‌کننده‌ها",
    fi: "Kytke soittimet päälle",
    fr: "Allumer les lecteurs",
    "fr-CA": "Allumer les lecteurs",
    gl: "Acender reprodutores",
    he: "הפעל נגנים",
    hi: "प्लेयर चालू करें",
    hu: "Lejátszók bekapcsolása",
    hy: "Միացնել նվագարկիչները",
    id: "Nyalakan Pemutar",
    it: "Accendi i lettori",
    ja: "プレーヤーをオンにする",
    ka: "დამკვრელების ჩართვა",
    ko: "플레이어 켜기",
    lt: "Įjungti grotuvus",
    lv: "Ieslēgt atskaņotājus",
    mk: "Вклучи плеери",
    nl: "Spelers inschakelen",
    nn: "Slå på avspelarar",
    no: "Slå på medieavspillere",
    pl: "Włącz odtwarzacze",
    pt: "Ligar reprodutores",
    "pt-BR": "Ligar reprodutores",
    ro: "Pornește playerele",
    ru: "Включить плееры",
    sk: "Zapnúť prehrávače",
    sl: "Vklopi predvajalnike",
    sr: "Укључи плејере",
    sv: "Sätt på spelare",
    th: "เปิดเครื่องเล่น",
    tr: "Oynatıcıları Aç",
    uk: "Увімкнути плеєри",
    ur: "پلیئر آن کریں",
    vi: "Bật trình phát",
    "zh-Hans": "开启播放器",
    "zh-Hant": "開啟播放器"
  },
  off_media_player: {
    en: "Turn off players",
    ar: "إيقاف تشغيل المشغلات",
    bg: "Изключи плейърите",
    bn: "প্লেয়ার বন্ধ করুন",
    bs: "Isključi playere",
    cs: "Vypnout přehrávače",
    da: "Sluk afspillere",
    de: "Player ausschalten",
    el: "Σβήσε τις συσκευές αναπαραγωγής",
    "en-GB": "Turn off players",
    es: "Apagar reproductores",
    "es-419": "Apagar reproductores",
    et: "Lülita mängijad välja",
    eu: "Itzali erreproduktoreak",
    fa: "خاموش کردن پخش‌کننده‌ها",
    fi: "Kytke soittimet pois",
    fr: "Éteindre les lecteurs",
    "fr-CA": "Éteindre les lecteurs",
    gl: "Apagar reprodutores",
    he: "כבה נגנים",
    hi: "प्लेयर बंद करें",
    hu: "Lejátszók kikapcsolása",
    hy: "Անջատել նվագարկիչները",
    id: "Matikan Pemutar",
    it: "Spegni i lettori",
    ja: "プレーヤーをオフにする",
    ka: "დამკვრელების გამორთვა",
    ko: "플레이어 끄기",
    lt: "Išjungti grotuvus",
    lv: "Izslēgt atskaņotājus",
    mk: "Исклучи плеери",
    nl: "Spelers uitschakelen",
    nn: "Slå av avspelarar",
    no: "Slå av medieavspillere",
    pl: "Wyłącz odtwarzacze",
    pt: "Desligar reprodutores",
    "pt-BR": "Desligar reprodutores",
    ro: "Oprește playerele",
    ru: "Выключить плееры",
    sk: "Vypnúť prehrávače",
    sl: "Izklopi predvajalnike",
    sr: "Искључи плејере",
    sv: "Stäng av spelare",
    th: "ปิดเครื่องเล่น",
    tr: "Oynatıcıları Kapat",
    uk: "Вимкнути плеєри",
    ur: "پلیئر بند کریں",
    vi: "Tắt trình phát",
    "zh-Hans": "关闭播放器",
    "zh-Hant": "關閉播放器"
  },
  on_lock: {
    en: "Unlock",
    ar: "فتح القفل",
    bg: "Отключи",
    bn: "আনলক করুন",
    bs: "Otključaj",
    cs: "Odemknout",
    da: "Lås op",
    de: "Entsperren",
    el: "Ξεκλείδωμα",
    "en-GB": "Unlock",
    es: "Desbloquear",
    "es-419": "Desbloquear",
    et: "Ava lukk",
    eu: "Desblokeatu",
    fa: "باز کردن قفل",
    fi: "Avaa lukitus",
    fr: "Déverrouiller",
    "fr-CA": "Déverrouiller",
    gl: "Desbloquear",
    he: "בטל נעילה",
    hi: "अनलॉक करें",
    hu: "Feloldás",
    hy: "Բացել կողպեքը",
    id: "Buka Kunci",
    it: "Sblocca",
    ja: "ロック解除",
    ka: "განბლოკვა",
    ko: "잠금 해제",
    lt: "Atrakinti",
    lv: "Atslēgt",
    mk: "Отклучи",
    nl: "Ontgrendelen",
    nn: "Lås opp",
    no: "Lås opp",
    pl: "Odblokuj",
    pt: "Destrancar",
    "pt-BR": "Destrancar",
    ro: "Deblocare",
    ru: "Разблокировать",
    sk: "Odomknúť",
    sl: "Odkleni",
    sr: "Откључај",
    sv: "Lås upp",
    th: "ปลดล็อก",
    tr: "Kilidi Aç",
    uk: "Розблокувати",
    ur: "انلاک کریں",
    vi: "Mở khóa",
    "zh-Hans": "解锁",
    "zh-Hant": "解鎖"
  },
  off_lock: {
    en: "Lock",
    ar: "قفل",
    bg: "Заключи",
    bn: "লক করুন",
    bs: "Zaključaj",
    cs: "Zamknout",
    da: "Lås",
    de: "Sperren",
    el: "Κλείδωμα",
    "en-GB": "Lock",
    es: "Bloquear",
    "es-419": "Bloquear",
    et: "Lukusta",
    eu: "Blokeatu",
    fa: "قفل کردن",
    fi: "Lukitse",
    fr: "Verrouiller",
    "fr-CA": "Verrouiller",
    gl: "Bloquear",
    he: "נעל",
    hi: "लॉक करें",
    hu: "Zárolás",
    hy: "Կողպել",
    id: "Kunci",
    it: "Blocca",
    ja: "ロック",
    ka: "დაბლოკვა",
    ko: "잠금",
    lt: "Užrakinti",
    lv: "Aizslēgt",
    mk: "Заклучи",
    nl: "Vergrendelen",
    nn: "Lås",
    no: "Lås",
    pl: "Zablokuj",
    pt: "Bloquear",
    "pt-BR": "Bloquear",
    ro: "Blocare",
    ru: "Заблокировать",
    sk: "Zamknúť",
    sl: "Zakleni",
    sr: "Закључај",
    sv: "Lås",
    th: "ล็อก",
    tr: "Kilitle",
    uk: "Заблокувати",
    ur: "لاک کریں",
    vi: "Khóa",
    "zh-Hans": "锁定",
    "zh-Hant": "鎖定"
  },
  on_vacuum: {
    en: "Start vacuums",
    ar: "تشغيل المكانس",
    bg: "Стартирай прахосмукачките",
    bn: "ভ্যাকুয়াম চালু করুন",
    bs: "Pokreni usisivače",
    cs: "Spustit vysavače",
    da: "Start støvsugere",
    de: "Staubsauger starten",
    el: "Έναρξη ρομποτικών σκουπών",
    "en-GB": "Start vacuums",
    es: "Iniciar aspiradoras",
    "es-419": "Iniciar aspiradoras",
    et: "Käivita tolmuimejad",
    eu: "Hasi xurgagailuak",
    fa: "شروع کردن جاروبرقی‌ها",
    fi: "Käynnistä imurit",
    fr: "Démarrer les aspirateurs",
    "fr-CA": "Démarrer les aspirateurs",
    gl: "Iniciar aspiradores",
    he: "הפעל שואבים",
    hi: "वैक्यूम शुरू करें",
    hu: "Porszívók elindítása",
    hy: "Գործարկել փոշեկուլները",
    id: "Mulai Vakum",
    it: "Avvia gli aspirapolvere",
    ja: "掃除機を起動",
    ka: "მტვერსასრუტების გაშვება",
    ko: "청소기 시작",
    lt: "Paleisti dulkių siurbėlius",
    lv: "Iedarbināt putekļsūcējus",
    mk: "Стартувај правосмукалки",
    nl: "Stofzuigers starten",
    nn: "Start støvsugarar",
    no: "Start støvsugere",
    pl: "Uruchom odkurzacze",
    pt: "Iniciar aspiradores",
    "pt-BR": "Iniciar aspiradores",
    ro: "Pornește aspiratoarele",
    ru: "Запустить пылесосы",
    sk: "Spustiť vysávače",
    sl: "Zaženi sesalnike",
    sr: "Покрени усисиваче",
    sv: "Starta dammsugare",
    th: "เริ่มดูดฝุ่น",
    tr: "Süpürgeleri Başlat",
    uk: "Запустити пилососи",
    ur: "ویکیوم شروع کریں",
    vi: "Bắt đầu máy hút bụi",
    "zh-Hans": "启动扫地机器人",
    "zh-Hant": "啟動掃地機器人"
  },
  off_vacuum: {
    en: "Stop vacuums",
    ar: "إيقاف المكانس",
    bg: "Спри прахосмукачките",
    bn: "ভ্যাকুয়াম বন্ধ করুন",
    bs: "Zaustavi usisivače",
    cs: "Zastavit vysavače",
    da: "Stop støvsugere",
    de: "Staubsauger stoppen",
    el: "Διακοπή ρομποτικών σκουπών",
    "en-GB": "Stop vacuums",
    es: "Detener aspiradoras",
    "es-419": "Detener aspiradoras",
    et: "Peata tolmuimejad",
    eu: "Gelditu xurgagailuak",
    fa: "متوقف کردن جاروبرقی‌ها",
    fi: "Pysäytä imurit",
    fr: "Arrêter les aspirateurs",
    "fr-CA": "Arrêter les aspirateurs",
    gl: "Deter aspiradores",
    he: "עצור שואבים",
    hi: "वैक्यूम बंद करें",
    hu: "Porszívók leállítása",
    hy: "Կանգնեցնել փոշեկուլները",
    id: "Hentikan Vakum",
    it: "Ferma gli aspirapolvere",
    ja: "掃除機を停止",
    ka: "მტვერსასრუტების გაჩერება",
    ko: "청소기 중지",
    lt: "Sustabdyti dulkių siurbėlius",
    lv: "Apturēt putekļsūcējus",
    mk: "Запри правосмукалки",
    nl: "Stofzuigers stoppen",
    nn: "Stopp støvsugarar",
    no: "Stopp støvsugere",
    pl: "Zatrzymaj odkurzacze",
    pt: "Parar aspiradores",
    "pt-BR": "Parar aspiradores",
    ro: "Oprește aspiratoarele",
    ru: "Остановить пылесосы",
    sk: "Zastaviť vysávače",
    sl: "Ustavi sesalnike",
    sr: "Заустави усисиваче",
    sv: "Stoppa dammsugare",
    th: "หยุดดูดฝุ่น",
    tr: "Süpürgeleri Durdur",
    uk: "Зупинити пилососи",
    ur: "ویکیوم بند کریں",
    vi: "Dừng máy hút bụi",
    "zh-Hans": "停止扫地机器人",
    "zh-Hant": "停止掃地機器人"
  },
  on_alarm_control_panel: {
    en: "Arm",
    ar: "تشغيل",
    bg: "Активирай",
    bn: "আর্ম করুন",
    bs: "Naoružaj",
    cs: "Aktivovat",
    da: "Aktiver",
    de: "Scharfen",
    el: "Ενεργοποίηση",
    "en-GB": "Arm",
    es: "Armar",
    "es-419": "Armar",
    et: "Terrere",
    eu: "Aktibatu",
    fa: "فعال کردن",
    fi: "Teroita",
    fr: "Armer",
    "fr-CA": "Armer",
    gl: "Armar",
    he: "הפעל",
    hi: "आर्म करें",
    hu: "Élesítés",
    hy: "Ակտիվացնել",
    id: "Aktifkan",
    it: "Inserisci",
    ja: "セットする",
    ka: "აქტივაცია",
    ko: "경보 설정",
    lt: "Įjungti",
    lv: "Ieslēgt",
    mk: "Активирај",
    nl: "Scherp aan",
    nn: "Skjerp",
    no: "Aktiver",
    pl: "Uzbrój",
    pt: "Armar",
    "pt-BR": "Armar",
    ro: "Armare",
    ru: "Взять под охрану",
    sk: "Aktivovať",
    sl: "Oboroži",
    sr: "Активирај",
    sv: "Skarpa",
    th: "ติดตั้ง",
    tr: "Devreye Al",
    uk: "Активувати",
    ur: "آرم کریں",
    vi: "Kích hoạt",
    "zh-Hans": "布防",
    "zh-Hant": "佈防"
  },
  off_alarm_control_panel: {
    en: "Disarm",
    ar: "إلغاء التشغيل",
    bg: "Деактивирай",
    bn: "ডিসআর্ম করুন",
    bs: "Razoružaj",
    cs: "Deaktivovat",
    da: "Deaktiver",
    de: "Entschärfen",
    el: "Απενεργοποίηση",
    "en-GB": "Disarm",
    es: "Desarmar",
    "es-419": "Desarmar",
    et: "Tühista",
    eu: "Desaktibatu",
    fa: "غیرفعال کردن",
    fi: "Teroita pois",
    fr: "Désarmer",
    "fr-CA": "Désarmer",
    gl: "Desarmar",
    he: "בטל הפעלה",
    hi: "डिसआर्म करें",
    hu: "Hatástalanítás",
    hy: "Ապաակտիվացնել",
    id: "Nonaktifkan",
    it: "Disinserisci",
    ja: "解除する",
    ka: "დეაქტივაცია",
    ko: "경보 해제",
    lt: "Išjungti",
    lv: "Izslēgt",
    mk: "Деактивирај",
    nl: "Scherp af",
    nn: "Løys",
    no: "Deaktiver",
    pl: "Rozbrój",
    pt: "Desarmar",
    "pt-BR": "Desarmar",
    ro: "Dezarmare",
    ru: "Снять с охраны",
    sk: "Deaktivovať",
    sl: "Razoroži",
    sr: "Деактивирај",
    sv: "Avaktivera",
    th: "ปิดการใช้งาน",
    tr: "Devre Dışı Bırak",
    uk: "Деактивувати",
    ur: "ڈس آرم کریں",
    vi: "Hủy kích hoạt",
    "zh-Hans": "撤防",
    "zh-Hant": "撤防"
  },
  on_lawn_mower: {
    en: "Start mowers",
    ar: "تشغيل جزازات العشب",
    bg: "Стартирай косачките",
    bn: "মাওয়ার চালু করুন",
    bs: "Pokreni kosilice",
    cs: "Spustit sekačky",
    da: "Start plæneklippere",
    de: "Mäher starten",
    el: "Έναρξη χλοοκοπτικών",
    "en-GB": "Start mowers",
    es: "Iniciar cortacéspedes",
    "es-419": "Iniciar cortacéspedes",
    et: "Käivita muruniidukid",
    eu: "Hasi belar-mozgailuak",
    fa: "شروع کردن ماشین‌های چمن‌زنی",
    fi: "Käynnistä ruohonleikkurit",
    fr: "Démarrer les tondeuses",
    "fr-CA": "Démarrer les tondeuses",
    gl: "Iniciar cortacésped",
    he: "הפעל מכסחות",
    hi: "मावर शुरू करें",
    hu: "Fűnyírók elindítása",
    hy: "Գործարկել հնձիչները",
    id: "Mulai Mesin Pemotong",
    it: "Avvia i rasaerba",
    ja: "芝刈り機を起動",
    ka: "სათიბების გაშვება",
    ko: "잔디깎기 시작",
    lt: "Paleisti žoliapjoves",
    lv: "Iedarbināt zāles pļāvējus",
    mk: "Стартувај косилки",
    nl: "Maaiers starten",
    nn: "Start gressklypparar",
    no: "Start gressklippere",
    pl: "Uruchom kosiarki",
    pt: "Iniciar cortadores de relva",
    "pt-BR": "Iniciar cortadores de grama",
    ro: "Pornește mașinile de tuns iarba",
    ru: "Запустить газонокосилки",
    sk: "Spustiť kosačky",
    sl: "Zaženi kosilnice",
    sr: "Покрени косилице",
    sv: "Starta gräsklippare",
    th: "เริ่มเครื่องตัดหญ้า",
    tr: "Çim Biçme Makinelerini Başlat",
    uk: "Запустити газонокосарки",
    ur: "ماؤر شروع کریں",
    vi: "Bắt đầu máy cắt cỏ",
    "zh-Hans": "启动割草机",
    "zh-Hant": "啟動割草機"
  },
  off_lawn_mower: {
    en: "Pause mowers",
    ar: "إيقاف جزازات العشب مؤقتًا",
    bg: "Паузирай косачките",
    bn: "মাওয়ার বিরতি দিন",
    bs: "Pauziraj kosilice",
    cs: "Pozastavit sekačky",
    da: "Pause plæneklippere",
    de: "Mäher pausieren",
    el: "Παύση χλοοκοπτικών",
    "en-GB": "Pause mowers",
    es: "Pausar cortacéspedes",
    "es-419": "Pausar cortacéspedes",
    et: "Peata muruniidukid",
    eu: "Pausatu belar-mozgailuak",
    fa: "مکث ماشین‌های چمن‌زنی",
    fi: "Tauota ruohonleikkurit",
    fr: "Mettre les tondeuses en pause",
    "fr-CA": "Mettre les tondeuses en pause",
    gl: "Pausar cortacésped",
    he: "השהה מכסחות",
    hi: "मावर रोकें",
    hu: "Fűnyírók szüneteltetése",
    hy: "Կասեցնել հնձիչները",
    id: "Jeda Mesin Pemotong",
    it: "Metti in pausa i rasaerba",
    ja: "芝刈り機を一時停止",
    ka: "სათიბების პაუზა",
    ko: "잔디깎기 일시정지",
    lt: "Pristabdyti žoliapjoves",
    lv: "Apturēt zāles pļāvējus",
    mk: "Паузирај косилки",
    nl: "Maaiers pauzeren",
    nn: "Pause gressklypparar",
    no: "Pause gressklippere",
    pl: "Wstrzymaj kosiarki",
    pt: "Pausar cortadores de relva",
    "pt-BR": "Pausar cortadores de grama",
    ro: "Pauzează mașinile de tuns iarba",
    ru: "Приостановить газонокосилки",
    sk: "Pozastaviť kosačky",
    sl: "Premor kosilnice",
    sr: "Паузирај косилице",
    sv: "Pausa gräsklippare",
    th: "หยุดชั่วคราวเครื่องตัดหญ้า",
    tr: "Çim Biçme Makinelerini Duraklat",
    uk: "Призупинити газонокосарки",
    ur: "ماؤر روکیں",
    vi: "Tạm dừng máy cắt cỏ",
    "zh-Hans": "暂停割草机",
    "zh-Hant": "暫停割草機"
  },
  on_water_heater: {
    en: "Turn on water heaters",
    ar: "تشغيل سخانات المياه",
    bg: "Включи бойлерите",
    bn: "ওয়াটার হিটার চালু করুন",
    bs: "Uključi bojlere",
    cs: "Zapnout ohřívače vody",
    da: "Tænd vandvarmere",
    de: "Warmwasserbereiter einschalten",
    el: "Άναψε το θερμοσίφωνα",
    "en-GB": "Turn on water heaters",
    es: "Encender calentadores de agua",
    "es-419": "Encender calentadores de agua",
    et: "Lülita veesoojendid sisse",
    eu: "Piztu ur-berogailuak",
    fa: "روشن کردن آبگرمکن‌ها",
    fi: "Kytke vedenlämmittimet päälle",
    fr: "Allumer les chauffe-eau",
    "fr-CA": "Allumer les chauffe-eau",
    gl: "Acender quentadores de auga",
    he: "הפעל דודי מים",
    hi: "वॉटर हीटर चालू करें",
    hu: "Vízmelegítők bekapcsolása",
    hy: "Միացնել ջերմաջրերը",
    id: "Nyalakan Pemanas Air",
    it: "Accendi gli scaldacqua",
    ja: "給湯器をオンにする",
    ka: "წყალგამაცხელებლების ჩართვა",
    ko: "온수기 켜기",
    lt: "Įjungti vandens šildytuvus",
    lv: "Ieslēgt ūdens sildītājus",
    mk: "Вклучи бојлери",
    nl: "Waterverwarmers inschakelen",
    nn: "Slå på varmtvassberedarar",
    no: "Slå på varmtvannsberedere",
    pl: "Włącz podgrzewacze wody",
    pt: "Ligar esquentadores de água",
    "pt-BR": "Ligar aquecedores de água",
    ro: "Pornește boilerele",
    ru: "Включить водонагреватели",
    sk: "Zapnúť ohrievače vody",
    sl: "Vklopi grelnike vode",
    sr: "Укључи бојлере",
    sv: "Sätt på varmvattenberedare",
    th: "เปิดเครื่องทำน้ำอุ่น",
    tr: "Su Isıtıcılarını Aç",
    uk: "Увімкнути водонагрівачі",
    ur: "واٹر ہیٹر آن کریں",
    vi: "Bật máy nước nóng",
    "zh-Hans": "开启热水器",
    "zh-Hant": "開啟熱水器"
  },
  off_water_heater: {
    en: "Turn off water heaters",
    ar: "إيقاف تشغيل سخانات المياه",
    bg: "Изключи бойлерите",
    bn: "ওয়াটার হিটার বন্ধ করুন",
    bs: "Isključi bojlere",
    cs: "Vypnout ohřívače vody",
    da: "Sluk vandvarmere",
    de: "Warmwasserbereiter ausschalten",
    el: "Σβήσε το θερμοσίφωνα",
    "en-GB": "Turn off water heaters",
    es: "Apagar calentadores de agua",
    "es-419": "Apagar calentadores de agua",
    et: "Lülita veesoojendid välja",
    eu: "Itzali ur-berogailuak",
    fa: "خاموش کردن آبگرمکن‌ها",
    fi: "Kytke vedenlämmittimet pois",
    fr: "Éteindre les chauffe-eau",
    "fr-CA": "Éteindre les chauffe-eau",
    gl: "Apagar quentadores de auga",
    he: "כבה דודי מים",
    hi: "वॉटर हीटर बंद करें",
    hu: "Vízmelegítők kikapcsolása",
    hy: "Անջատել ջերմաջրերը",
    id: "Matikan Pemanas Air",
    it: "Spegni gli scaldacqua",
    ja: "給湯器をオフにする",
    ka: "წყალგამაცხელებლების გამორთვა",
    ko: "온수기 끄기",
    lt: "Išjungti vandens šildytuvus",
    lv: "Izslēgt ūdens sildītājus",
    mk: "Исклучи бојлери",
    nl: "Waterverwarmers uitschakelen",
    nn: "Slå av varmtvassberedarar",
    no: "Slå av varmtvannsberedere",
    pl: "Wyłącz podgrzewacze wody",
    pt: "Desligar esquentadores de água",
    "pt-BR": "Desligar aquecedores de água",
    ro: "Oprește boilerele",
    ru: "Выключить водонагреватели",
    sk: "Vypnúť ohrievače vody",
    sl: "Izklopi grelnike vode",
    sr: "Искључи бојлере",
    sv: "Stäng av varmvattenberedare",
    th: "ปิดเครื่องทำน้ำอุ่น",
    tr: "Su Isıtıcılarını Kapat",
    uk: "Вимкнути водонагрівачі",
    ur: "واٹر ہیٹر بند کریں",
    vi: "Tắt máy nước nóng",
    "zh-Hans": "关闭热水器",
    "zh-Hant": "關閉熱水器"
  },
  on_update: {
    en: "Install updates",
    ar: "تثبيت التحديثات",
    bg: "Инсталирай актуализациите",
    bn: "আপডেট ইনস্টল করুন",
    bs: "Instaliraj ažuriranja",
    cs: "Nainstalovat aktualizace",
    da: "Installer opdateringer",
    de: "Updates installieren",
    el: "Εγκατάσταση ενημερώσεων",
    "en-GB": "Install updates",
    es: "Instalar actualizaciones",
    "es-419": "Instalar actualizaciones",
    et: "Paigalda värskendused",
    eu: "Instalatu eguneraketak",
    fa: "نصب به‌روزرسانی‌ها",
    fi: "Asenna päivitykset",
    fr: "Installer les mises à jour",
    "fr-CA": "Installer les mises à jour",
    gl: "Instalar actualizacións",
    he: "התקן עדכונים",
    hi: "अपडेट इंस्टॉल करें",
    hu: "Frissítések telepítése",
    hy: "Տեղադրել թարմացումները",
    id: "Instal Pembaruan",
    it: "Installa gli aggiornamenti",
    ja: "更新をインストール",
    ka: "განახლებების დაყენება",
    ko: "업데이트 설치",
    lt: "Įdiegti atnaujinimus",
    lv: "Instalēt atjauninājumus",
    mk: "Инсталирај ажурирања",
    nl: "Updates installeren",
    nn: "Installer oppdateringar",
    no: "Installer oppdateringer",
    pl: "Zainstaluj aktualizacje",
    pt: "Instalar atualizações",
    "pt-BR": "Instalar atualizações",
    ro: "Instalează actualizările",
    ru: "Установить обновления",
    sk: "Nainštalovať aktualizácie",
    sl: "Namesti posodobitve",
    sr: "Инсталирај ажурирања",
    sv: "Installera uppdateringar",
    th: "ติดตั้งการอัปเดต",
    tr: "Güncellemeleri Kur",
    uk: "Встановити оновлення",
    ur: "اپڈیٹس انسٹال کریں",
    vi: "Cài đặt bản cập nhật",
    "zh-Hans": "安装更新",
    "zh-Hant": "安裝更新"
  },
  off_update: {
    en: "Skip updates",
    ar: "تخطي التحديثات",
    bg: "Пропусни актуализациите",
    bn: "আপডেট এড়িয়ে যান",
    bs: "Preskoči ažuriranja",
    cs: "Přeskočit aktualizace",
    da: "Spring opdateringer over",
    de: "Updates überspringen",
    el: "Παράβλεψη ενημερώσεων",
    "en-GB": "Skip updates",
    es: "Omitir actualizaciones",
    "es-419": "Omitir actualizaciones",
    et: "Jäta värskendused vahele",
    eu: "Saltatu eguneraketak",
    fa: "رد کردن به‌روزرسانی‌ها",
    fi: "Ohita päivitykset",
    fr: "Ignorer les mises à jour",
    "fr-CA": "Ignorer les mises à jour",
    gl: "Omitir actualizacións",
    he: "דלג על עדכונים",
    hi: "अपडेट छोड़ें",
    hu: "Frissítések kihagyása",
    hy: "Բաց թողնել թարմացումները",
    id: "Lewati Pembaruan",
    it: "Salta gli aggiornamenti",
    ja: "更新をスキップ",
    ka: "განახლებების გამოტოვება",
    ko: "업데이트 건너뛰기",
    lt: "Praleisti atnaujinimus",
    lv: "Izlaist atjauninājumus",
    mk: "Прескокни ажурирања",
    nl: "Updates overslaan",
    nn: "Hopp over oppdateringar",
    no: "Hopp over oppdateringer",
    pl: "Pomiń aktualizacje",
    pt: "Ignorar atualizações",
    "pt-BR": "Ignorar atualizações",
    ro: "Omite actualizările",
    ru: "Пропустить обновления",
    sk: "Preskočiť aktualizácie",
    sl: "Preskoči posodobitve",
    sr: "Прескочи ажурирања",
    sv: "Hoppa över uppdateringar",
    th: "ข้ามการอัปเดต",
    tr: "Güncellemeleri Atla",
    uk: "Пропустити оновлення",
    ur: "اپڈیٹس چھوڑیں",
    vi: "Bỏ qua bản cập nhật",
    "zh-Hans": "跳过更新",
    "zh-Hant": "跳過更新"
  },
  list_mode: {
    en: "Show Entity IDs as List",
    ar: "عرض معرّفات الكيانات كقائمة",
    bg: "Показване на ID на обекти като списък",
    bn: "এন্টিটি আইডিগুলি তালিকা হিসেবে দেখান",
    bs: "Prikaži ID-je entiteta kao listu",
    cs: "Zobrazit ID entit jako seznam",
    da: "Vis entitets-id'er som liste",
    de: "Entity-IDs als Liste anzeigen",
    el: "Εμφάνιση αναγνωριστικών οντοτήτων ως λίστα",
    "en-GB": "Show Entity IDs as List",
    es: "Mostrar ID de entidades como lista",
    "es-419": "Mostrar ID de entidades como lista",
    et: "Kuva üksuste ID-d loendina",
    eu: "Erakunde ID-ak zerrenda gisa erakutsi",
    fa: "نمایش شناسه موجودیت‌ها به‌صورت لیست",
    fi: "Näytä entiteettien tunnukset luettelona",
    fr: "Afficher les ID d'entités sous forme de liste",
    "fr-CA": "Afficher les ID d'entités sous forme de liste",
    gl: "Amosar ID de entidades como lista",
    he: "הצג מזהי ישויות כרשימה",
    hi: "एंटिटी आईडी सूची के रूप में दिखाएं",
    hu: "Entitásazonosítók megjelenítése listaként",
    hy: "Ցուցադրել կազմակերպությունների ID-ները որպես ցուցակ",
    id: "Tampilkan ID Entitas sebagai Daftar",
    it: "Mostra ID delle entità come elenco",
    ja: "エンティティIDをリストで表示",
    ka: "ობიექტების იდენტიფიკატორების ჩვენება სიის სახით",
    ko: "엔티티 ID를 목록으로 표시",
    lt: "Rodyti objektų ID sąraše",
    lv: "Rādīt objektu ID kā sarakstu",
    mk: "Прикажи ID на објекти како список",
    nl: "Entiteit-ID's als lijst weergeven",
    nn: "Vis ID-ar til einingar som liste",
    no: "Vis ID-er til enheter som liste",
    pl: "Pokaż ID encji jako listę",
    pt: "Mostrar IDs de entidades como lista",
    "pt-BR": "Mostrar IDs de entidades como lista",
    ro: "Afișează ID-urile entităților ca listă",
    ru: "Показать ID объектов списком",
    sk: "Zobraziť ID entít ako zoznam",
    sl: "Prikaži ID-je entitet kot seznam",
    sr: "Прикажи ID-ове објеката као листу",
    sv: "Visa enhets-ID som lista",
    th: "แสดง ID ของเอนทิตี้เป็นรายการ",
    tr: "Varlık Kimliklerini Liste Olarak Göster",
    uk: "Показати ID об'єктів як список",
    ur: "انٹیٹی آئی ڈیز کو فہرست کے طور پر دکھائیں",
    vi: "Hiển thị ID thực thể dưới dạng danh sách",
    "zh-Hans": "以列表形式显示实体 ID",
    "zh-Hant": "以清單形式顯示實體 ID"
  },
  multiple_areas: {
    en: "Multiple Areas",
    ar: "مناطق متعددة",
    bg: "Няколко области",
    bn: "একাধিক এলাকা",
    bs: "Više područja",
    cs: "Více oblastí",
    da: "Flere områder",
    de: "Mehrere Bereiche",
    el: "Πολλαπλές περιοχές",
    "en-GB": "Multiple Areas",
    es: "Varias áreas",
    "es-419": "Varias áreas",
    et: "Mitu ala",
    eu: "Eremu anitz",
    fa: "چند منطقه",
    fi: "Useita alueita",
    fr: "Plusieurs zones",
    "fr-CA": "Plusieurs zones",
    gl: "Varias áreas",
    he: "אזורים מרובים",
    hi: "एकाधिक क्षेत्र",
    hu: "Több terület",
    hy: "Բազմակի տարածքներ",
    id: "Beberapa Area",
    it: "Più aree",
    ja: "複数のエリア",
    ka: "მრავალი ზონა",
    ko: "여러 영역",
    lt: "Kelios zonos",
    lv: "Vairākas zonas",
    mk: "Повеќе области",
    nl: "Meerdere gebieden",
    nn: "Fleire område",
    no: "Flere områder",
    pl: "Wiele obszarów",
    pt: "Várias áreas",
    "pt-BR": "Várias áreas",
    ro: "Mai multe zone",
    ru: "Несколько областей",
    sk: "Viac oblastí",
    sl: "Več območij",
    sr: "Више области",
    sv: "Flera områden",
    th: "หลายพื้นที่",
    tr: "Birden çok alan",
    uk: "Кілька зон",
    ur: "متعدد علاقے",
    vi: "Nhiều khu vực",
    "zh-Hans": "多个区域",
    "zh-Hant": "多個區域"
  },
  multiple_floors: {
    en: "Multiple Floors",
    ar: "طوابق متعددة",
    bg: "Няколко етажа",
    bn: "একাধিক তলা",
    bs: "Više spratova",
    cs: "Více pater",
    da: "Flere etager",
    de: "Mehrere Etagen",
    el: "Πολλαπλοί όροφοι",
    "en-GB": "Multiple Floors",
    es: "Varias plantas",
    "es-419": "Varias plantas",
    et: "Mitu korrust",
    eu: "Solairu anitz",
    fa: "چند طبقه",
    fi: "Useita kerroksia",
    fr: "Plusieurs étages",
    "fr-CA": "Plusieurs étages",
    gl: "Varias plantas",
    he: "קומות מרובות",
    hi: "एकाधिक मंज़िलें",
    hu: "Több emelet",
    hy: "Բազմակի հարկեր",
    id: "Beberapa Lantai",
    it: "Più piani",
    ja: "複数のフロア",
    ka: "მრავალი სართული",
    ko: "여러 층",
    lt: "Keli aukštai",
    lv: "Vairāki stāvi",
    mk: "Повеќе катови",
    nl: "Meerdere verdiepingen",
    nn: "Fleire etasjar",
    no: "Flere etasjer",
    pl: "Wiele pięter",
    pt: "Vários andares",
    "pt-BR": "Vários andares",
    ro: "Mai multe etaje",
    ru: "Несколько этажей",
    sk: "Viac poschodí",
    sl: "Več nadstropij",
    sr: "Више спратова",
    sv: "Flera våningar",
    th: "หลายชั้น",
    tr: "Birden çok kat",
    uk: "Кілька поверхів",
    ur: "متعدد منزلیں",
    vi: "Nhiều tầng",
    "zh-Hans": "多个楼层",
    "zh-Hant": "多個樓層"
  },
  popup_sort: {
    en: "Popup Sorting",
    ar: "ترتيب منبثقة",
    bg: "Сортиране в изкачащ прозорец",
    bn: "পপআপ সাজানো",
    bs: "Sortiranje popupa",
    cs: "Řazení vyskakovacího okna",
    da: "Sortering i popup",
    de: "Sortierung im Popup",
    el: "Ταξινόμηση αναδυόμενου",
    "en-GB": "Popup Sorting",
    es: "Ordenación en popup",
    "es-419": "Ordenación en popup",
    et: "Hüpikakna sortimine",
    eu: "Popuparen sailketa",
    fa: "مرتب‌سازی پاپ آپ",
    fi: "Ponnahsuikkunan järjestäminen",
    fr: "Tri dans la fenêtre contextuelle",
    "fr-CA": "Tri dans la fenêtre contextuelle",
    gl: "Ordenación en popup",
    he: "מיון חלון קופץ",
    hi: "पॉपअप क्रमबद्ध करना",
    hu: "Felugró ablak rendezése",
    hy: "Պոպափի դասավորում",
    id: "Pengurutan Popup",
    it: "Ordinamento popup",
    ja: "ポップアップの並べ替え",
    ka: "პოპაპის დალაგება",
    ko: "팝업 정렬",
    lt: "Iškylančiojo lango rūšiavimas",
    lv: "Uznirstošā loga kārtošana",
    mk: "Подредување на скокачко",
    nl: "Popups sorteren",
    nn: "Sortering i popup",
    no: "Sortering i popup",
    pl: "Sortowanie w oknie podręcznym",
    pt: "Ordenação em popup",
    "pt-BR": "Ordenação em popup",
    ro: "Sortare în fereastra pop-up",
    ru: "Сортировка во всплывающем окне",
    sk: "Zoradenie vyskakovacieho okna",
    sl: "Razvrščanje pojavnega okna",
    sr: "Сортирање искачујућег прозора",
    sv: "Sortering i popup",
    th: "การเรียงลำดับป๊อปอัพ",
    tr: "Popup Sıralama",
    uk: "Сортування у спливаючому вікні",
    ur: "پاپ اپ ترتیب",
    vi: "Sắp xếp cửa sổ bật lên",
    "zh-Hans": "弹出窗口排序",
    "zh-Hant": "彈出視窗排序"
  },
  ungroup_areas: {
    en: "Disable Area Groups",
    ar: "تعطيل مجموعات المناطق",
    bg: "Изключи групите на областите",
    bn: "এলাকা গ্রুপ নিষ্ক্রিয় করুন",
    bs: "Onemogući grupe oblasti",
    cs: "Zakázat skupiny oblastí",
    da: "Deaktiver områdegrupper",
    de: "Bereichsgruppen deaktivieren",
    el: "Απενεργοποίηση ομάδων περιοχής",
    "en-GB": "Disable Area Groups",
    es: "Desactivar grupos de áreas",
    "es-419": "Desactivar grupos de áreas",
    et: "Keela alagrupid",
    eu: "Desgaitu eremu taldeak",
    fa: "غیرفعال کردن گروه‌های منطقه",
    fi: "Poista alueet käytöstä",
    fr: "Désactiver les groupes de zones",
    "fr-CA": "Désactiver les groupes de zones",
    gl: "Desactivar grupos de áreas",
    he: "השבת קבוצות אזורים",
    hi: "क्षेत्र समूह अक्षम करें",
    hu: "Területcsoportok letiltása",
    hy: "Անջատել տարածքների խմբերը",
    id: "Nonaktifkan Grup Area",
    it: "Disattiva gruppi area",
    ja: "エリアグループを無効化",
    ka: "ზონის ჯგუფების გამორთვა",
    ko: "영역 그룹 비활성화",
    lt: "Išjungti zonų grupes",
    lv: "Atslēgt zonu grupas",
    mk: "Онеможи групи на области",
    nl: "Gebiedsgroepen uitschakelen",
    nn: "Deaktiver områdegrupper",
    no: "Deaktiver områdegrupper",
    pl: "Wyłącz grupy obszarów",
    pt: "Desativar grupos de áreas",
    "pt-BR": "Desativar grupos de áreas",
    ro: "Dezactivează grupurile de zone",
    ru: "Отключить группы областей",
    sk: "Zakázať skupiny oblastí",
    sl: "Onemogoči skupine območij",
    sr: "Онемогући групе области",
    sv: "Inaktivera områdesgrupper",
    th: "ปิดการใช้งานกลุ่มพื้นที่",
    tr: "Alan Gruplarını Devre Dışı Bırak",
    uk: "Вимкнути групи зон",
    ur: "خطے کے گروپس غیر فعال کریں",
    vi: "Vô hiệu hóa nhóm khu vực",
    "zh-Hans": "禁用区域分组",
    "zh-Hant": "停用區域群組"
  }
};
function w(t, e) {
  const a = Is[t];
  return a ? e in a ? a[e] : e.startsWith("es-") && a["es-419"] ? a["es-419"] : e.startsWith("pt-") && a["pt-BR"] ? a["pt-BR"] : e.startsWith("zh-") && a["zh-Hans"] ? a["zh-Hans"] : e.startsWith("en-") && a.en || a.en ? a.en : t : t;
}
function N(t, e, a) {
  return t.localize(
    `component.${a}.entity_component._.state.${e}`
  ) || e;
}
const Ds = {
  square: (t) => w("square", t.locale.language),
  hide_content_name: (t) => w("hide_content_name", t.locale.language),
  hide_person: (t) => `${t.localize("ui.common.hide")} ${t.localize(
    "component.person.entity_component._.name"
  )}`,
  list_mode: (t) => w("list_mode", t.locale.language),
  columns: (t) => w("columns", t.locale.language),
  edit_filters: (t) => `${t.localize("ui.panel.lovelace.editor.common.edit")} ${t.localize(
    "ui.components.subpage-data-table.filters"
  )}`,
  area: (t) => t.localize("ui.panel.lovelace.editor.card.area.name"),
  floor: (t) => t.localize("ui.components.selectors.selector.types.floor"),
  label_filter: (t) => `${t.localize("ui.components.label-picker.label")} ${t.localize(
    "ui.components.related-filter-menu.filter"
  )}`,
  label: (t) => t.localize("ui.components.label-picker.label"),
  hidden_labels: (t) => t.localize("ui.components.label-picker.label"),
  entities: (t) => t.localize("ui.panel.lovelace.editor.card.entities.name"),
  extra_entities: (t) => `Extra ${t.localize("ui.panel.lovelace.editor.card.entities.name")}`,
  entity: (t) => t.localize("ui.components.selectors.selector.types.entity"),
  hide_filter: (t) => w("hide_filter", t.locale.language),
  edit_domains_dc: (t) => w("edit_domains_dc", t.locale.language),
  icon: (t) => t.localize("ui.components.selectors.selector.types.icon"),
  color: (t) => t.localize("ui.panel.lovelace.editor.card.tile.color"),
  background_color: (t) => w("background_color", t.locale.language),
  multiple_areas: (t) => w("multiple_areas", t.locale.language),
  multiple_floors: (t) => w("multiple_floors", t.locale.language),
  show_total_number: (t) => w("show_total_number", t.locale.language),
  show_total_entities: (t) => w("show_total_entities", t.locale.language),
  appearance: (t) => t.localize("ui.panel.lovelace.editor.card.tile.appearance") || "Appearance",
  tap_action: (t) => t.localize("ui.panel.lovelace.editor.card.generic.tap_action"),
  hold_action: (t) => t.localize("ui.panel.lovelace.editor.card.generic.hold_action"),
  double_tap_action: (t) => t.localize("ui.panel.lovelace.editor.card.generic.double_tap_action"),
  popup_card: () => "Change Popup Card Type",
  group_id: (t) => w("group_id", t.locale.language),
  group_icon: (t) => w("group_icon", t.locale.language),
  group_status: (t) => `${w("group_status", t.locale.language)} (${t.localize(
    "ui.panel.lovelace.editor.card.config.optional"
  )})`,
  hide: (t) => t.localize("ui.common.hide"),
  state: (t) => t.localize("ui.components.entity.entity-state-picker.state"),
  invert: (t) => t.localize("ui.dialogs.entity_registry.editor.invert.label"),
  invert_state: (t) => t.localize("ui.dialogs.entity_registry.editor.invert.label"),
  show_entity_picture: (t) => t.localize("ui.panel.lovelace.editor.card.tile.show_entity_picture"),
  name: (t) => t.localize("ui.common.name"),
  no_scroll: (t) => w("no_scroll", t.locale.language),
  popup: () => "Popup",
  ungroup_areas: (t) => w("ungroup_areas", t.locale.language),
  popup_sort: (t) => w("popup_sort", t.locale.language),
  state_content: (t) => t.localize("ui.panel.lovelace.editor.card.tile.state_content"),
  hide_card_if_empty: (t) => w("hide_card_if_empty", t.locale.language),
  badge_mode: (t) => w("badge_mode", t.locale.language),
  badge_color: (t) => `Badge ${t.localize("ui.panel.lovelace.editor.card.tile.color")}`,
  badge_text_color: (t) => `Badge ${t.localize(
    "component.text.entity_component._.name"
  )} ${t.localize("ui.panel.lovelace.editor.card.tile.color")}`,
  person: (t) => t.localize("component.person.entity_component._.name"),
  person_home_color: (t) => `${t.localize(
    "component.person.entity_component._.state.home"
  )} ${t.localize("ui.panel.lovelace.editor.card.tile.color")}`,
  person_away_color: (t) => `${t.localize(
    "component.person.entity_component._.state.not_home"
  )} ${t.localize("ui.panel.lovelace.editor.card.tile.color")}`,
  person_home_icon: (t) => `${t.localize(
    "component.person.entity_component._.state.home"
  )} ${t.localize("ui.components.selectors.selector.types.icon")}`,
  person_away_icon: (t) => `${t.localize(
    "component.person.entity_component._.state.not_home"
  )} ${t.localize("ui.components.selectors.selector.types.icon")}`,
  no_background: (t) => w("no_background", t.locale.language),
  activate_state_color: (t) => `${t.localize(
    "ui.panel.lovelace.editor.card.generic.state_color"
  )}`
};
function Ts(t, e, a) {
  return e && a ? e === "switch" && a === "switch" ? `${t.localize(
    "ui.panel.lovelace.editor.card.entities.name"
  )} in ${t.localize("component.switch.entity_component._.name")}` : `${t.localize(
    "ui.panel.lovelace.editor.card.entities.name"
  )} in ${t.localize(
    `ui.dialogs.entity_registry.editor.device_classes.${e}.${a}`
  )}` : e ? `${t.localize(
    "ui.panel.lovelace.editor.card.entities.name"
  )} in ${t.localize(`component.${e}.entity_component._.name`)}` : t.localize("ui.panel.lovelace.editor.card.entities.name");
}
function Bs(t, e) {
  if (X.includes(e))
    return t.localize(`component.${e}.entity_component._.name`) || e;
  for (const [a, r] of Object.entries(Ps))
    if (r.includes(e))
      return t.localize(
        `ui.dialogs.entity_registry.editor.device_classes.${a}.${e}`
      ) || e;
  return t.localize(`ui.panel.lovelace.editor.card.area.${e}`);
}
function Le(t, e, a, r) {
  if (/^key_\d+$/.test(e.name))
    return t.localize("ui.components.related-filter-menu.filter") || "Filter";
  if (e.name === "header")
    return Ts(t, a, r);
  const i = Ds[e.name];
  return i ? i(t) : Bs(t, e.name);
}
const R = (t, e) => t ? typeof t == "object" ? Object.entries(t).reduce(
  (i, [s, n]) => {
    const o = s.startsWith("--") ? s : s.replace(/-([a-z])/g, (l, c) => c.toUpperCase());
    return i[o] = String(n), i;
  },
  {}
) : (t.trim(), t.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\n/g, " ").split(";").map((i) => i.trim()).filter((i) => i && i.includes(":")).reduce(
  (i, s) => {
    const n = s.split(":"), o = n[0], l = n.slice(1).join(":");
    if (o && l !== void 0) {
      const c = o.trim(), u = c.startsWith("--") ? c : c.replace(/-([a-z])/g, (d, p) => p.toUpperCase());
      i[u] = l.trim();
    }
    return i;
  },
  {}
)) : {}, Os = (t, e, a) => e && e._parsedCss ? e._parsedCss : t ? R(t) : {}, Gs = Ae`
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
`, Ba = (t) => {
  const e = /* @__PURE__ */ new Map();
  return (t ?? []).forEach((a) => {
    var r, i, s;
    if (a.type) {
      const n = { ...a };
      if ((r = n.styles) != null && r.card && (n._parsedCss = R(n.styles.card)), (i = n.styles) != null && i.button) {
        const o = R(n.styles.button);
        n._parsedCss = { ...n._parsedCss, ...o };
      }
      (s = n.styles) != null && s.icon && (n._parsedIconCss = R(n.styles.icon)), e.set(n.type.toLowerCase(), n);
    }
  }), e;
};
function He(t, e, a) {
  return e ? (a || Ba(t.customization)).get(e.toLowerCase()) : void 0;
}
function Ve(t, e, a, r, i) {
  const s = He(
    t,
    G(a, r),
    i
  );
  if (s && s[e] !== void 0)
    return s[e];
}
function Oa(t, e, a, r, i) {
  const s = He(
    t,
    G(e, a),
    i
  );
  if ((s == null ? void 0 : s.show_entity_picture) === !0 && r && r.attributes && r.attributes.entity_picture)
    return r.attributes.entity_picture;
  if (s && s.icon)
    return s.icon;
  if (r && r.attributes && r.attributes.icon)
    return r.attributes.icon;
  const o = (s == null ? void 0 : s.invert) === !0 ? "off" : "on";
  let l = e;
  if (!a && e.includes(".") && (l = e.split(".")[0]), ae && ae[l]) {
    const c = ae[l];
    if (a && typeof c == "object") {
      const u = c[a];
      if (u) {
        if (typeof u == "string") return u;
        if (typeof u == "object" && "on" in u && "off" in u)
          return u[o] || u.on || u.off;
      }
    }
    if (typeof c == "object" && "on" in c && "off" in c)
      return c[o] || c.on || c.off;
    if (typeof c == "string") return c;
  }
  return "";
}
function ot(t, e, a, r) {
  const i = He(
    t,
    G(e, a),
    r
  ), s = (n) => n.length === 4 ? `rgba(${n[0]},${n[1]},${n[2]},${n[3]})` : `rgb(${n[0]},${n[1]},${n[2]})`;
  if (i && Array.isArray(i.background_color)) {
    const n = i.background_color;
    if (n.length >= 3) return s(n);
  }
  if (Array.isArray(t == null ? void 0 : t.background_color)) {
    const n = t.background_color;
    if (n.length >= 3) return s(n);
  }
  return "rgba(var(--rgb-primary-text-color), 0.15)";
}
function Va(t, e, a, r) {
  return Ve(
    t,
    "icon_color",
    e,
    a,
    r
  ) || t.color;
}
function lt(t, e, a, r, i) {
  return Ve(
    t,
    "name",
    e,
    a,
    i
  ) || (r == null ? void 0 : r.attributes.friendly_name);
}
function Rs(t, e, a, r) {
  return Ve(
    t,
    "icon_css",
    e,
    a,
    r
  );
}
function Zs(t, e) {
  const a = N(t, "home", "device_tracker"), r = N(
    t,
    "not_home",
    "device_tracker"
  );
  return e ? r : a;
}
function Ga(t, e) {
  const a = N(t, "open", "cover"), r = N(t, "closed", "cover");
  return e ? r : a;
}
function Fs(t, e) {
  return e === "home" ? N(t, "home", "person") : e === "not_home" ? N(t, "not_home", "person") : e ?? "unknown";
}
function Ns(t, e, a, r) {
  if (a && js.includes(a))
    return Ga(t, e);
  const i = N(t, r ?? "on", "light"), s = N(t, r ?? "off", "light");
  return e ? s : i;
}
function rt(t, e, a, r, i, s, n, o) {
  const l = G(a, r), c = He(e, l, o), u = (c == null ? void 0 : c.invert) === !0;
  switch (a) {
    case "device_tracker":
      return Zs(t, u);
    case "lock":
    case "cover":
      return Ga(t, u);
    case "person":
      return Fs(t, i);
    default:
      return Ns(t, u, r, i);
  }
}
function Ks(t, e = {}) {
  const { color: a, background_color: r, square: i, isNotHome: s } = e, n = {
    "border-radius": i ? "20%" : "50%",
    "background-color": r,
    color: a ? a.startsWith("rgb") || a.startsWith("#") || a.startsWith("hsl") || a.startsWith("var") ? a : `var(--${a}-color)` : void 0
  };
  return t === "person" && s && (n.filter = "grayscale(100%)"), n;
}
function ct(t, e, a, r) {
  if (e.length === 0) {
    console.warn(`No active entities found for domain: ${a}`);
    return;
  }
  if (Es.includes(a)) {
    t.callService(a, "toggle", {
      entity_id: e.map((i) => i.entity_id)
    });
    return;
  }
  for (const i of e) {
    let s = !_t.includes(i.state);
    a === "media_player" ? t.callService(a, s ? "media_pause" : "media_play", {
      entity_id: i.entity_id
    }) : a === "lock" ? t.callService(a, s ? "lock" : "unlock", {
      entity_id: i.entity_id
    }) : a === "vacuum" ? t.callService(a, s ? "stop" : "start", {
      entity_id: i.entity_id
    }) : a === "alarm_control_panel" ? t.callService(a, s ? "alarm_arm_away" : "alarm_disarm", {
      entity_id: i.entity_id
    }) : a === "lawn_mower" ? t.callService(a, s ? "pause" : "start_mowing", {
      entity_id: i.entity_id
    }) : a === "water_heater" ? t.callService(a, s ? "turn_off" : "turn_on", {
      entity_id: i.entity_id
    }) : a === "update" && t.callService(a, s ? "skip" : "install", {
      entity_id: i.entity_id
    });
  }
}
function Se(t, e, a, r) {
  const i = `${e}_action`;
  return Ve(t, i, a, r) || t[i];
}
function za(t, e, a, r, i, s, n) {
  s.stopPropagation();
  const o = s.detail.action, l = Se(a, o, r, i), c = typeof l == "string" && l === "more-info" || typeof l == "object" && (l == null ? void 0 : l.action) === "more-info", u = typeof l == "string" && l === "toggle" || typeof l == "object" && (l == null ? void 0 : l.action) === "toggle";
  if (r.includes(".")) {
    const d = r, p = x(d);
    if (u) {
      e.callService(p, "toggle", { entity_id: d });
      return;
    }
    if (c) {
      n.showMoreInfo(d);
      return;
    }
  }
  if (c || l === void 0) {
    n.selectDomain(r, i);
    return;
  }
  if (u) {
    n.toggleDomain(r, i);
    return;
  }
  Ms(
    t,
    e,
    {
      tap_action: Se(a, "tap", r, i),
      hold_action: Se(a, "hold", r, i),
      double_tap_action: Se(
        a,
        "double_tap",
        r,
        i
      )
    },
    o
  );
}
var Us = Object.defineProperty, I = (t, e, a, r) => {
  for (var i = void 0, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (i = n(e, a, i) || i);
  return i && Us(e, a, i), i;
};
const Ws = [
  "light",
  "switch",
  "fan",
  "cover",
  "siren",
  "climate",
  "humidifier",
  "valve",
  "remote",
  "media_player",
  "lock",
  "vacuum",
  "alarm_control_panel",
  "lawn_mower",
  "water_heater",
  "update"
], bt = class bt extends Z {
  constructor() {
    super(...arguments), this.open = !1, this.title = "", this.content = "", this.entities = [], this._showAll = !1, this._cardEls = /* @__PURE__ */ new Map(), this._lastEntityIds = [], this._activeEntities = [], this._allEntities = [], this._currentEntitiesCache = [], this._opener = null, this._handleMoreInfo = (e) => {
      if (this._opener) {
        e.stopPropagation();
        const a = new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: e.detail
        });
        this._opener.dispatchEvent(a);
      }
    }, this._close = () => {
      var e;
      this.open && (this.open = !1, (e = window.history.state) != null && e.statusCardPopup && window.history.back());
    }, this._onDialogClosed = (e) => {
      const a = e.target;
      a && a.tagName !== "HA-ADAPTIVE-DIALOG" || (this.open = !1, this._cardEls.clear(), this._currentEntitiesCache = [], this._popupCardConfigCache.clear(), this._cardElementCache.clear(), this.dispatchEvent(
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
      ));
    }, this._onPopState = (e) => {
      var a;
      this.open && !((a = window.history.state) != null && a.statusCardPopup) && (this.open = !1);
    }, this._entities = [], this.computeLabel = L(
      (e, a, r) => !this.hass || !e ? (e == null ? void 0 : e.name) || "" : Le(this.hass, e, a, r)
    ), this._popupCardConfigCache = /* @__PURE__ */ new Map(), this._cardElementCache = /* @__PURE__ */ new Map(), this._sortEntitiesMemo = L(
      (e, a, r, i) => {
        const s = (i == null ? void 0 : i.states) ?? {}, n = e.slice();
        if (a === "state") {
          const l = Ie(s, r);
          return n.sort((c, u) => {
            const d = this._isActive(c) ? 0 : 1, p = this._isActive(u) ? 0 : 1;
            if (d !== p) return d - p;
            const h = x(c.entity_id), g = x(u.entity_id), y = i ? N(i, c.state, h) : c.state, _ = i ? N(i, u.state, g) : u.state, m = (y || "").localeCompare(_ || "");
            return m !== 0 ? m : l(c.entity_id, u.entity_id);
          });
        }
        const o = Ie(s, r);
        return n.sort((l, c) => o(l.entity_id, c.entity_id));
      }
    ), this._areaMapMemo = L(
      (e) => {
        const a = /* @__PURE__ */ new Map(), r = Array.isArray(e) ? e : Object.values(e ?? {});
        for (const i of r)
          i && i.area_id && i.name && a.set(i.area_id, i.name);
        return a;
      }
    ), this.sortEntitiesForPopup = (e) => {
      var i, s, n;
      const a = this._getGroupCustomization(), r = (a == null ? void 0 : a.popup_sort) || ((i = this.card._config) == null ? void 0 : i.popup_sort) || "name";
      return this._sortEntitiesMemo(
        e,
        r,
        ((n = (s = this.hass) == null ? void 0 : s.locale) == null ? void 0 : n.language) ?? "en",
        this.hass
      );
    }, this.groupAndSortEntities = L(
      (e, a, r) => {
        const i = /* @__PURE__ */ new Map();
        for (const n of e) {
          const o = this.getAreaForEntity(n);
          i.has(o) || i.set(o, []), i.get(o).push(n);
        }
        return Array.from(i.entries()).sort(
          ([n], [o]) => {
            var u, d;
            const l = ((u = a.get(n)) == null ? void 0 : u.toLowerCase()) ?? (n === "unassigned" ? "unassigned" : n), c = ((d = a.get(o)) == null ? void 0 : d.toLowerCase()) ?? (o === "unassigned" ? "unassigned" : o);
            return l.localeCompare(c);
          }
        ).map(([n, o]) => [n, r(o)]);
      }
    );
  }
  set hass(e) {
    const a = this._hass;
    this._hass = e, this.hasUpdated && a !== e && this._updateCardsHass(), this.requestUpdate("hass", a);
  }
  get hass() {
    return this._hass;
  }
  async showDialog(e) {
    if (this.title = e.title ?? this.title, this.hass = e.hass, this._opener = e.opener ?? null, this._activeEntities = e.entities ?? [], this._allEntities = e.allEntities ?? [], (!e.allEntities || e.allEntities.length === 0) && (this._allEntities = this._activeEntities), this.entities = e.entities ?? [], e.content !== void 0 && (this.content = e.content), this.selectedDomain = e.selectedDomain, this.selectedDeviceClass = e.selectedDeviceClass, this.selectedGroup = e.selectedGroup, this.card = e.card, this._cardEls.clear(), this._showAll = e.initialShowAll ?? !1, this.open = !0, window.history.pushState({ statusCardPopup: !0 }, ""), await Ss(), !customElements.get("hui-tile-card"))
      try {
        await customElements.whenDefined("hui-tile-card");
      } catch (r) {
        console.debug("status-card: hui-tile-card not defined", r);
      }
    this.requestUpdate(), await this.updateComplete;
    const a = this.renderRoot.querySelector("ha-adaptive-dialog");
    if (a && a.shadowRoot) {
      const r = a.shadowRoot.querySelector("ha-bottom-sheet");
      r && (r.style.removeProperty("--dialog-transform"), r.style.removeProperty("--dialog-transition"));
    }
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("popstate", this._onPopState);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("popstate", this._onPopState), this._cardEls.clear(), this._currentEntitiesCache = [], this._popupCardConfigCache.clear(), this._cardElementCache.clear();
  }
  async _createCardElement(e, a, r = !1) {
    return Ta(e, a, r);
  }
  _getPopupCardConfig(e) {
    var y, _, m, v, k;
    const a = this.card;
    if (this.selectedGroup !== void 0 && ((y = a._config.content) != null && y[this.selectedGroup])) {
      const $ = a._config.content[this.selectedGroup], b = a.getCustomizationForType($);
      if (b != null && b.popup_card)
        return {
          ...b.popup_card,
          entity: e.entity_id
        };
    }
    const r = x(e.entity_id), i = this.selectedDomain || r, s = this.selectedDomain ? this.selectedDeviceClass : (k = (v = (m = (_ = this.hass) == null ? void 0 : _.states) == null ? void 0 : m[e.entity_id]) == null ? void 0 : v.attributes) == null ? void 0 : k.device_class, n = G(i, s), o = typeof (a == null ? void 0 : a.getCustomizationForType) == "function" ? a.getCustomizationForType(n) : void 0, l = o == null ? void 0 : o.popup_card, c = l && typeof l.type == "string" && l.type || "tile", u = c === "tile" ? xs[r] ?? {} : {};
    let d = {};
    if (l && typeof l == "object") {
      const { type: $, entity: b, ...H } = l;
      d = H;
    } else
      d = {};
    const p = {
      type: c,
      entity: e.entity_id,
      ...u,
      ...d
    }, h = this._configHash(p), g = this._popupCardConfigCache.get(e.entity_id);
    return g && g.hash === h ? g.config : (this._popupCardConfigCache.set(e.entity_id, {
      hash: h,
      config: p
    }), p);
  }
  shouldUpdate(e) {
    if (!this.open)
      return e.has("open");
    const a = e.has("selectedDomain") || e.has("selectedDeviceClass") || e.has("selectedGroup") || e.has("_showAll");
    if (e.has("hass")) {
      const r = e.get("hass"), i = this.hass;
      if (!i || !r || r.themes !== i.themes || r.language !== i.language || r.localize !== i.localize || this._hasRelevantStateChanged(r, i)) {
        this._currentEntitiesCache = this._getCurrentEntities();
        const s = this._currentEntitiesCache.map((l) => l.entity_id).sort(), n = (this._lastEntityIds || []).slice().sort();
        return !(s.length === n.length && s.every((l, c) => l === n[c]));
      }
      return !1;
    }
    return a && (this._currentEntitiesCache = this._getCurrentEntities()), !0;
  }
  _hasRelevantStateChanged(e, a) {
    for (const r of this._allEntities)
      if (e.states[r.entity_id] !== a.states[r.entity_id])
        return !0;
    return !1;
  }
  _updateCardsHass() {
    this.hass && this._cardEls.forEach((e) => {
      if (e.hass !== this.hass)
        try {
          e.hass = this.hass;
        } catch (a) {
          console.debug("status-card: Failed to set hass on card element", a);
        }
    });
  }
  _getOrCreateCard(e) {
    const a = e.entity_id, r = this._getPopupCardConfig(e), i = this._configHash(r), s = this._cardElementCache.get(a);
    if (s && s.hash === i)
      return s.el.hass = this.hass, this._cardEls.set(a, s.el), s.el;
    const n = $s(this.hass, r);
    if (n)
      return n.hass !== this.hass && (n.hass = this.hass), this._cardEls.set(a, n), this._cardElementCache.set(a, { hash: i, el: n }), n;
    const o = document.createElement("div");
    return o.classList.add("card-placeholder"), o.setAttribute("data-hui-card", ""), this._cardEls.set(a, o), this._createCardElement(this.hass, r).then((l) => {
      try {
        this._cardEls.get(a) === o && (o.replaceWith(l), this._cardEls.set(a, l), this._cardElementCache.set(a, { hash: i, el: l })), l.hass = this.hass;
      } catch (c) {
        console.debug("status-card: Failed to create popup card for entity:", a, c);
      }
    }), this._cardElementCache.set(a, { hash: i, el: o }), o;
  }
  willUpdate(e) {
    super.willUpdate(e), (e.has("open") || e.has("hass") || e.has("selectedDomain") || e.has("selectedGroup") || e.has("_showAll")) && (this._entities = this._currentEntitiesCache.length > 0 ? this._currentEntitiesCache : this._getCurrentEntities());
  }
  _getUpdatedEntity(e) {
    var a;
    return ((a = this.hass) == null ? void 0 : a.states[e.entity_id]) || e;
  }
  _isEntityActive(e) {
    var o;
    const a = this.selectedDomain || x(e.entity_id), r = this.selectedDeviceClass || e.attributes.device_class, i = G(a, r), s = typeof ((o = this.card) == null ? void 0 : o.getCustomizationForType) == "function" ? this.card.getCustomizationForType(i) : void 0, n = (s == null ? void 0 : s.invert) === !0;
    return nt(e, a, r, n);
  }
  _getCurrentEntities() {
    return this.hass ? this._showAll ? this._allEntities.map((a) => this._getUpdatedEntity(a)) : this.selectedGroup !== void 0 ? this._activeEntities.map((a) => this._getUpdatedEntity(a)) : this._allEntities.map((a) => this._getUpdatedEntity(a)).filter((a) => this._isEntityActive(a)) : this._showAll ? this._allEntities : this._activeEntities;
  }
  toggleAllOrOn() {
    this._showAll = !this._showAll;
  }
  _handleMenuAction(e) {
    var r;
    const a = (r = e.detail.item) == null ? void 0 : r.action;
    a === "toggle_domain" ? this.handleAskToggleDomain() : a === "toggle_all" && this.handleAskToggleAll();
  }
  handleAskToggleDomain() {
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
  handleAskToggleAll() {
    this.toggleAllOrOn();
  }
  toggleArea(e) {
    if (!this.hass) return;
    const a = this.selectedDomain;
    if (!a) return;
    const r = this._entities.filter(
      (i) => this.getAreaForEntity(i) === e
    );
    r.length !== 0 && ct(this.hass, r, a, this.selectedDeviceClass);
  }
  _stopPropagation(e) {
    e.stopPropagation();
  }
  getAreaForEntity(e) {
    var r, i;
    const a = (r = this.hass) == null ? void 0 : r.entities[e.entity_id];
    if (a) {
      if (a.area_id)
        return a.area_id;
      if (a.device_id) {
        const s = (i = this.hass) == null ? void 0 : i.devices[a.device_id];
        if (s && s.area_id)
          return s.area_id;
      }
    }
    return "unassigned";
  }
  get _isToggleableDomain() {
    const e = this.selectedDomain;
    return !e || e.includes(".") ? !1 : Ws.includes(e);
  }
  _getDomainToggleLabel(e) {
    const a = this.selectedDomain, s = e ? {
      light: "on_light",
      switch: "on_switch",
      fan: "on_fan",
      cover: "on_cover",
      siren: "on_siren",
      climate: "on_climate",
      humidifier: "on_humidifier",
      valve: "on_valve",
      remote: "on_remote",
      media_player: "on_media_player",
      lock: "on_lock",
      vacuum: "on_vacuum",
      alarm_control_panel: "on_alarm_control_panel",
      lawn_mower: "on_lawn_mower",
      water_heater: "on_water_heater",
      update: "on_update"
    } : {
      light: "off_light",
      switch: "off_switch",
      fan: "off_fan",
      cover: "off_cover",
      siren: "off_siren",
      climate: "off_climate",
      humidifier: "off_humidifier",
      valve: "off_valve",
      remote: "off_remote",
      media_player: "off_media_player",
      lock: "off_lock",
      vacuum: "off_vacuum",
      alarm_control_panel: "off_alarm_control_panel",
      lawn_mower: "off_lawn_mower",
      water_heater: "off_water_heater",
      update: "off_update"
    }, n = e ? "toggle_on" : "toggle_off";
    if (!a)
      return e ? this.hass.localize("ui.card.common.turn_on") : this.hass.localize("ui.card.common.turn_off");
    const o = s[a] ?? n;
    return w(o, this.hass.locale.language);
  }
  _getDomainAreaToggleLabel(e) {
    const a = this.selectedDomain, i = a && {
      light: "area_light",
      switch: "area_switch",
      fan: "area_fan",
      cover: "area_cover",
      siren: "area_siren",
      climate: "area_climate",
      humidifier: "area_humidifier",
      valve: "area_valve",
      remote: "area_remote",
      media_player: "area_media_player",
      lock: "area_lock",
      vacuum: "area_vacuum",
      alarm_control_panel: "area_alarm_control_panel",
      lawn_mower: "area_lawn_mower",
      water_heater: "area_water_heater",
      update: "area_update"
    }[a] || "area_all";
    return w(i, this.hass.locale.language).replace("{area}", e);
  }
  _isActive(e) {
    return !_t.includes(e.state);
  }
  _configHash(e) {
    return JSON.stringify(e);
  }
  _getGroupCustomization() {
    var e;
    if (this.selectedGroup !== void 0 && ((e = this.card._config.content) != null && e[this.selectedGroup])) {
      const a = this.card._config.content[this.selectedGroup];
      return this.card.getCustomizationForType(a);
    }
  }
  render() {
    var b, H, E, D, U, Ze;
    if (!this.hass) return f``;
    const e = this._getGroupCustomization(), a = (e == null ? void 0 : e.list_mode) ?? this.card.list_mode, r = (e == null ? void 0 : e.columns) ?? this.card._config.columns ?? 4, i = a ? 1 : r, s = this.selectedDomain, n = this.selectedDeviceClass, o = this.selectedGroup, l = this.card, c = this._areaMapMemo((b = this.hass) == null ? void 0 : b.areas);
    let u = this._entities, d = !1;
    o === void 0 && s && (d = !0);
    const p = this.sortEntitiesForPopup(u), h = new Set(u.map((C) => C.entity_id));
    Array.from(this._cardEls.keys()).forEach((C) => {
      h.has(C) || this._cardEls.delete(C);
    }), this._lastEntityIds = u.map((C) => C.entity_id);
    const g = this.groupAndSortEntities(
      u,
      c,
      this.sortEntitiesForPopup
    ), y = (e == null ? void 0 : e.ungroup_areas) === !0 || ((H = l == null ? void 0 : l._config) == null ? void 0 : H.ungroupAreas) === !0 || ((E = l == null ? void 0 : l._config) == null ? void 0 : E.ungroup_areas) === !0 || ((D = l == null ? void 0 : l._config) == null ? void 0 : D.area_grouping) !== void 0 && ((U = l == null ? void 0 : l._config) == null ? void 0 : U.area_grouping) === !1, _ = g.length ? Math.max(...g.map(([, C]) => C.length)) : 0, m = y ? Math.min(i, Math.max(1, u.length)) : Math.min(i, Math.max(1, _));
    this.style.setProperty("--columns", String(m));
    const v = G(s, n), k = typeof (l == null ? void 0 : l.getCustomizationForType) == "function" ? l.getCustomizationForType(v) : void 0, $ = (k == null ? void 0 : k.invert) === !0;
    return f`
      <ha-adaptive-dialog
        .hass=${this.hass}
        .open=${this.open}
        @closed=${this._onDialogClosed}
        flexcontent
      >
        <ha-icon-button
          slot="headerNavigationIcon"
          .path=${Ge}
          @click=${this._close}
          .label=${this.hass.localize("ui.common.close")}
        ></ha-icon-button>
        <span slot="headerTitle">
          ${(() => {
      var Y, T;
      const C = this.selectedGroup, ue = this.card;
      if (C !== void 0 && ((T = (Y = ue._config) == null ? void 0 : Y.content) != null && T[C])) {
        const Na = ue._config.content[C];
        return this.hass.localize(
          "ui.panel.lovelace.editor.card.entities.name"
        ) + " in " + Na;
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
        </span>

        ${d ? f`
              <ha-dropdown
                slot="headerActionItems"
                placement="bottom-end"
                @wa-select=${this._handleMenuAction}
                @closed=${(C) => C.stopPropagation()}
              >
                <ha-icon-button
                  slot="trigger"
                  .label=${this.hass.localize("ui.common.menu")}
                  .path=${Jr}
                ></ha-icon-button>

                ${this._isToggleableDomain ? f`<ha-dropdown-item
                      graphic="icon"
                      .action=${"toggle_domain"}
                    >
                      <ha-svg-icon
                        slot="icon"
                        .path=${tt}
                      ></ha-svg-icon>
                      ${this._getDomainToggleLabel($)}
                    </ha-dropdown-item>` : ""}

                <ha-dropdown-item
                  graphic="icon"
                  .action=${"toggle_all"}
                >
                  <ha-svg-icon
                    slot="icon"
                    .path=${Fi}
                  ></ha-svg-icon>
                  ${this.hass.localize("ui.card.common.toggle") + " " + this.hass.localize(
      "component.sensor.entity_component._.state_attributes.state_class.state.total"
    ) + " " + this.hass.localize(
      "ui.panel.lovelace.editor.card.entities.name"
    )}
                </ha-dropdown-item>
              </ha-dropdown>
            ` : ""}
        <div class="dialog-content scrollable ha-scrollbar" @hass-more-info=${this._handleMoreInfo}>
          ${(Ze = this.card) != null && Ze.list_mode ? y ? f`
                  <ul class="entity-list">
                    ${te(
      p,
      (C) => C.entity_id,
      (C) => f`<li class="entity-item">- ${C.entity_id}</li>`
    )}
                  </ul>
                ` : f`
                  <ul class="entity-list">
                    ${te(
      g,
      ([C]) => C,
      ([C, ue]) => {
        const Y = c.get(C) ?? (C === "unassigned" ? "Unassigned" : C);
        return f`
                          <li class="entity-item">
                            <div class="area-header">
                              <h4>${Y}:</h4>
                              ${this._isToggleableDomain ? f`<ha-icon-button
                                    class="area-toggle-btn"
                                    .path=${tt}
                                    @click=${(T) => {
          T.stopPropagation(), this.toggleArea(C);
        }}
                                    label="${this._getDomainAreaToggleLabel(Y)}"
                                  ></ha-icon-button>` : ""}
                            </div>
                            <ul>
                              ${te(
          ue,
          (T) => T.entity_id,
          (T) => f`<li class="entity-item">
                                    - ${T.entity_id}
                                  </li>`
        )}
                            </ul>
                          </li>
                        `;
      }
    )}
                  </ul>
                ` : y ? f`
                <h4></h4>
                <div class="entity-cards">
                  ${te(
      p,
      (C) => C.entity_id,
      (C) => f`
                      <div class="entity-card">
                        ${this._getOrCreateCard(C)}
                      </div>
                    `
    )}
                </div>
              ` : f`${g.map(([C, ue]) => {
      const Y = c.get(C) ?? (C === "unassigned" ? "Unassigned" : C);
      return f`
                  <div class="cards-wrapper">
                    <div class="area-header">
                      <h4>${Y}</h4>
                      ${this._isToggleableDomain ? f`<ha-icon-button
                            class="area-toggle-btn"
                            .path=${tt}
                            @click=${(T) => {
        T.stopPropagation(), this.toggleArea(C);
      }}
                            label="${this._getDomainAreaToggleLabel(Y)}"
                          ></ha-icon-button>` : ""}
                    </div>
                    <div class="entity-cards">
                      ${te(
        ue,
        (T) => T.entity_id,
        (T) => f`
                          <div class="entity-card">
                            ${this._getOrCreateCard(T)}
                          </div>
                        `
      )}
                    </div>
                  </div>
                `;
    })}`}
          ${u.length === 0 ? this.content : ""}
        </div>
      </ha-adaptive-dialog>
    `;
  }
};
bt.styles = Ae`
    :host {
      display: block;
      --responsive-columns: var(--columns, 4);
    }
    :host([hidden]) {
      display: none;
    }

    ha-adaptive-dialog {
      --dialog-content-padding: 12px;
      --ha-dialog-max-width: 96vw !important;
      --ha-dialog-width-md: calc((var(--responsive-columns) * 22.5vw) + 3vw) !important;
      --ha-bottom-sheet-height: calc(100dvh - max(var(--safe-area-inset-top), 48px)) !important;
      --ha-bottom-sheet-max-height: var(--ha-bottom-sheet-height) !important;
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
      margin: 0;
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
    .area-header {
      display: flex;
      align-items: center;
      gap: 0.3em;
      width: 100%;
      box-sizing: border-box;
    }
    .area-header h4 {
      margin: 0.6em 0;
      width: auto;
      padding-left: 1rem;
    }
    .area-toggle-btn {
      --mdc-icon-button-icon-size: 20px;
      color: var(--secondary-text-color, rgba(0, 0, 0, 0.54));
    }
    .area-toggle-btn:hover {
      color: var(--primary-color, #03a9f4);
    }
    .entity-cards {
      display: grid;
      grid-template-columns: repeat(var(--responsive-columns), 1fr);
      gap: 8px;
      width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      justify-content: center;
      padding: 8px;
    }
    .entity-card {
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }
    @media (max-width: 1200px) {
      :host {
        --responsive-columns: min(var(--columns, 4), 3);
      }
      ha-adaptive-dialog {
        --ha-dialog-width-md: calc((var(--responsive-columns) * 44.5vw) + 3vw) !important;
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
      :host {
        --responsive-columns: min(var(--columns, 4), 2);
      }
      ha-adaptive-dialog {
        --ha-dialog-width-md: calc((var(--responsive-columns) * 29.5vw) + 3vw) !important;
      }
      h4 {
        width: 100%;
        font-size: 1.2em;
        margin: 0.6em 0;
        padding: 0 1em;
        box-sizing: border-box;
      }
    }

    @media (max-width: 600px) {
      :host {
        --responsive-columns: 1;
      }
      ha-adaptive-dialog {
        --dialog-content-padding: 8px;
        --ha-dialog-width-md: 100vw !important;
      }
      .cards-wrapper {
        align-items: stretch;
        width: 100%;
        overflow-x: hidden;
      }
      .entity-cards {
        grid-template-columns: 1fr;
        width: 100%;
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
let O = bt;
I([
  z({ type: Boolean })
], O.prototype, "open");
I([
  z({ type: String })
], O.prototype, "title");
I([
  z({ type: String })
], O.prototype, "selectedDomain");
I([
  z({ type: String })
], O.prototype, "selectedDeviceClass");
I([
  z({ type: String })
], O.prototype, "content");
I([
  z({ type: Array })
], O.prototype, "entities");
I([
  z({ attribute: !1 })
], O.prototype, "card");
I([
  A()
], O.prototype, "_showAll");
I([
  A()
], O.prototype, "selectedGroup");
I([
  A()
], O.prototype, "_entities");
customElements.define("status-card-popup", O);
class fe extends Z {
  constructor() {
    super(...arguments), this.open = !1, this._onPopState = () => {
      var e;
      this.open && !((e = window.history.state) != null && e.statusCardPopupConfirm) && (this.open = !1);
    }, this._close = () => {
      var e;
      this.open && (this.open = !1, (e = window.history.state) != null && e.statusCardPopupConfirm && window.history.back());
    }, this._onDialogClosed = (e) => {
      const a = e.target;
      a && a.tagName !== "HA-ADAPTIVE-DIALOG" || (this.open = !1, this.dispatchEvent(
        new CustomEvent("dialog-closed", { bubbles: !0, composed: !0 })
      ));
    }, this._confirm = () => {
      var e, a;
      try {
        (a = (e = this.card) == null ? void 0 : e.toggleDomain) == null || a.call(e, this.selectedDomain, this.selectedDeviceClass);
      } catch (r) {
        console.debug("status-card: Failed to toggle domain", r);
      }
      this._close();
    };
  }
  showDialog(e) {
    this.hass = e.hass, this.card = e.card, this.selectedDomain = e.selectedDomain, this.selectedDeviceClass = e.selectedDeviceClass, this.open = !0, window.history.pushState({ statusCardPopupConfirm: !0 }, ""), this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("popstate", this._onPopState);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("popstate", this._onPopState);
  }
  render() {
    var n, o;
    if (!this.hass || !this.card) return f``;
    const e = this.selectedDomain || "", a = this.selectedDeviceClass, r = G(e, a), i = (o = (n = this.card) == null ? void 0 : n.getCustomizationForType) == null ? void 0 : o.call(n, r), s = (i == null ? void 0 : i.invert) === !0;
    return f`
      <ha-adaptive-dialog
        .hass=${this.hass}
        .open=${this.open}
        @closed=${this._onDialogClosed}
      >
        <ha-icon-button
          slot="headerNavigationIcon"
          .path=${Ge}
          @click=${this._close}
          .label=${this.hass.localize("ui.common.close")}
        ></ha-icon-button>
        <span slot="headerTitle">
          ${s ? this.hass.localize("ui.card.common.turn_on") + "?" : this.hass.localize("ui.card.common.turn_off") + "?"}
        </span>
        <div class="dialog-content">
          ${this.hass.localize(
      "ui.panel.lovelace.cards.actions.action_confirmation",
      {
        action: s ? this.hass.localize("ui.card.common.turn_on") : this.hass.localize("ui.card.common.turn_off")
      }
    )}
        </div>
        <div slot="footer" style="display:flex;justify-content:flex-end;gap:8px;padding:8px 16px 16px;">
          <ha-button
            appearance="plain"
            @click=${this._close}
          >
            ${this.hass.localize("ui.common.no")}
          </ha-button>
          <ha-button
            appearance="accent"
            @click=${this._confirm}
          >
            ${this.hass.localize("ui.common.yes")}
          </ha-button>
        </div>
      </ha-adaptive-dialog>
    `;
  }
}
I([
  z({ type: Boolean })
], fe.prototype, "open");
I([
  z({ attribute: !1 })
], fe.prototype, "hass");
I([
  z({ attribute: !1 })
], fe.prototype, "card");
I([
  z({ type: String })
], fe.prototype, "selectedDomain");
I([
  z({ type: String })
], fe.prototype, "selectedDeviceClass");
customElements.define(
  "status-card-popup-confirmation",
  fe
);
const qs = (t, e, a, r) => r ? [] : Object.values(t).filter(
  (i) => {
    var s;
    return i.entity_id.startsWith("person.") && !e.includes(i.entity_id) && !((s = i.labels) != null && s.some((n) => a.includes(n))) && !i.hidden;
  }
).map((i) => i.entity_id).reverse(), Js = (t, e) => t.map((a) => e[a]).filter((a) => !!a), Ys = (t, e, a) => {
  const r = t.content || [];
  return t.extra_entities ? t.extra_entities.reduce((i, s) => {
    var y;
    if (!r.includes(s)) return i;
    const n = e[s];
    if (!n) return i;
    const o = (y = t.customization) == null ? void 0 : y.find(
      (_) => _.type === s
    );
    if (o && o.state !== void 0 && o.invert_state !== void 0) {
      const _ = o.invert_state === "true", m = n.state === o.state;
      if (!_ && !m || _ && m) return i;
    }
    const l = r.indexOf(s), c = l >= 0 ? l : 0, u = Oa(
      t,
      s,
      void 0,
      n,
      a
    ), d = lt(t, s, void 0, n, a) ?? n.attributes.friendly_name ?? s, p = Ve(
      t,
      "icon_color",
      s,
      void 0,
      a
    ) || ((o == null ? void 0 : o.activate_state_color) ?? t.activate_state_color ? ys(n) : void 0) || t.color, h = Rs(
      t,
      s,
      void 0,
      a
    ), g = ot(
      t,
      s,
      void 0,
      a
    );
    return i.push({
      type: "extra",
      panel: s,
      entity: n,
      order: c,
      icon: u,
      name: d,
      color: p,
      icon_css: h,
      background_color: g
    }), i;
  }, []).sort((i, s) => i.order - s.order) : [];
}, Qs = (t, e) => t.map((a, r) => {
  const i = e.find((n) => n.group_id === a);
  if (!(!i || !Object.keys(i).some(
    (n) => n !== "group_id" && n !== "group_icon" && i[n] !== void 0 && i[n] !== ""
  )))
    return {
      type: "group",
      group_id: a,
      order: r,
      ruleset: i
    };
}).filter((a) => !!a), Xs = (t) => t.map(
  (e, a) => e.includes(" - ") ? null : {
    type: "domain",
    domain: e.trim().toLowerCase().replace(/\s+/g, "_"),
    order: a
  }
).filter((e) => e !== null), en = (t) => t.map((e, a) => {
  if (!e.includes(" - ")) return null;
  const [r, i] = e.split(" - ");
  return {
    type: "deviceClass",
    domain: r.trim().toLowerCase().replace(/\s+/g, "_"),
    deviceClass: i.trim().toLowerCase(),
    order: a
  };
}).filter((e) => e !== null), ut = [
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
], Ra = (t, e, a, r, i, s, n, o) => {
  let l = [];
  if (Array.isArray(t.filters))
    l = t.filters.filter((c) => ut.includes(c.key));
  else {
    const c = t;
    ut.forEach((u) => {
      c[u] !== void 0 && l.push({ key: u, value: c[u] });
    });
  }
  return !l.length && !i.length ? e.map((c) => c.entity_id) : e.filter((c) => {
    if (i.includes(c.entity_id)) return !1;
    if (!l.length) return !0;
    const u = { entity_id: c.entity_id };
    return l.every(
      (d) => Fa({}, u, d, {
        areas: r,
        devices: a,
        entities: e,
        entityMap: s,
        deviceMap: n,
        areaMap: o
      })
    );
  }).map((c) => c.entity_id);
}, Za = (t, e, a, r, i, s, n) => {
  let o = [];
  if (Array.isArray(e.filters))
    o = e.filters.filter((l) => !ut.includes(l.key));
  else {
    const l = e;
    [
      "state",
      "name",
      "attributes",
      "last_changed",
      "last_updated",
      "last_triggered",
      "level",
      "group"
    ].forEach((c) => {
      l[c] !== void 0 && o.push({ key: c, value: l[c] });
    });
  }
  return o.length ? a.map((l) => r[l]).filter((l) => l ? o.every(
    (c) => Fa(t, l, c, {
      entityMap: i,
      deviceMap: s,
      areaMap: n
    })
  ) : !1) : a.map((l) => r[l]).filter((l) => !!l);
};
function tn(t, e, a, r, i) {
  var p;
  const s = t.__registryEntities || [], n = t.__registryDevices || [], o = t.__registryAreas || [], l = a || new Map(s.map((h) => [h.entity_id, h])), c = r || new Map(n.map((h) => [h.id, h])), u = i || new Map(o.map((h) => [h.area_id, h])), d = Ra(
    e,
    s,
    n,
    o,
    t.hiddenEntities || [],
    l,
    c,
    u
  );
  return Za(
    t,
    e,
    d,
    ((p = t.hass) == null ? void 0 : p.states) || {},
    l,
    c,
    u
  );
}
function it(t, e) {
  if (!t) return !1;
  const a = e.match(/^([<>]=?)?\s*(\d+)$/);
  if (!a) return !1;
  const [, r, i] = a, s = parseInt(i, 10), n = /* @__PURE__ */ new Date(), o = new Date(t), l = (n.getTime() - o.getTime()) / 6e4;
  switch (r) {
    case ">":
      return l > s;
    case ">=":
      return l >= s;
    case "<":
      return l < s;
    case "<=":
      return l <= s;
    default:
      return Math.round(l) === s;
  }
}
function j(t, e) {
  if (Array.isArray(e))
    return e.some((a) => j(t, a));
  if (typeof e == "string" && e.startsWith("!"))
    return !j(t, e.slice(1));
  if (typeof e == "string" && /^([<>]=?)\s*(-?\d+(\.\d+)?)([mhd])$/.test(e)) {
    const [, a, r, , i] = e.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)([mhd])$/) || [], s = parseFloat(r), n = Date.now(), o = new Date(t).getTime();
    if (isNaN(o)) return !1;
    let l = (n - o) / 6e4;
    switch (i === "h" && (l /= 60), i === "d" && (l /= 1440), a) {
      case ">":
        return l > s;
      case ">=":
        return l >= s;
      case "<":
        return l < s;
      case "<=":
        return l <= s;
    }
  }
  if (typeof e == "string" && /^([<>]=?)\s*(-?\d+(\.\d+)?)$/.test(e)) {
    const [, a, r] = e.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)$/) || [], i = parseFloat(r), s = parseFloat(t);
    switch (a) {
      case ">":
        return s > i;
      case ">=":
        return s >= i;
      case "<":
        return s < i;
      case "<=":
        return s <= i;
    }
  }
  if (typeof e == "string" && e.includes("*")) {
    const a = "^" + e.split("*").map((i) => i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*") + "$";
    return new RegExp(a, "i").test(String(t));
  }
  if (typeof e == "string" && e.length > 2 && e.startsWith("/") && e.endsWith("/"))
    try {
      return new RegExp(e.slice(1, -1), "i").test(String(t));
    } catch (a) {
      return console.debug("status-card: Invalid regex pattern:", e, a), !1;
    }
  return t === e;
}
const an = {
  area: (t, e, { entityMap: a, deviceMap: r }, i) => {
    let s = i == null ? void 0 : i.area_id;
    if (!s && (i != null && i.device_id)) {
      const n = r == null ? void 0 : r.get(i.device_id);
      s = n == null ? void 0 : n.area_id;
    }
    return Array.isArray(e) ? e.includes(s) : s === e;
  },
  domain: (t, e) => j(x(t.entity_id), e),
  entity_id: (t, e) => j(t.entity_id, e),
  state: (t, e) => j(t.state, e),
  name: (t, e) => j(t.attributes.friendly_name ?? "", e),
  attributes: (t, e) => !e || typeof e != "object" ? !1 : Object.entries(e).every(([a, r]) => {
    const i = a.split(":");
    let s = t.attributes;
    for (const n of i) {
      if (s === void 0) break;
      s = s[n];
    }
    return s !== void 0 ? j(s, r) : !1;
  }),
  device: (t, e, a, r) => j(r == null ? void 0 : r.device_id, e),
  integration: (t, e, a, r) => !!r && (j(r.platform, e) || j(r.config_entry_id, e)),
  entity_category: (t, e, a, r) => j(r == null ? void 0 : r.entity_category, e),
  label: (t, e, { deviceMap: a, card: r }, i) => {
    var o, l;
    const s = r.labels, n = (c) => {
      if (j(c, e)) return !0;
      if (s) {
        const u = s.find((d) => d.label_id === c);
        if (u && j(u.name, e)) return !0;
      }
      return !1;
    };
    if ((o = i == null ? void 0 : i.labels) != null && o.some(n)) return !0;
    if (i != null && i.device_id) {
      const c = a == null ? void 0 : a.get(i.device_id);
      if ((l = c == null ? void 0 : c.labels) != null && l.some(n)) return !0;
    }
    return !1;
  },
  floor: (t, e, { entityMap: a, deviceMap: r, areaMap: i }, s) => {
    var l;
    let n = s == null ? void 0 : s.area_id;
    if (!n && (s != null && s.device_id) && (n = (l = r == null ? void 0 : r.get(s.device_id)) == null ? void 0 : l.area_id), !n) return !1;
    const o = i == null ? void 0 : i.get(n);
    return j(o == null ? void 0 : o.floor_id, e);
  },
  hidden_by: (t, e, a, r) => j(r == null ? void 0 : r.hidden_by, e),
  device_manufacturer: (t, e, { deviceMap: a }, r) => {
    if (!(r != null && r.device_id)) return !1;
    const i = a == null ? void 0 : a.get(r.device_id);
    return j(i == null ? void 0 : i.manufacturer, e);
  },
  device_model: (t, e, { deviceMap: a }, r) => {
    if (!(r != null && r.device_id)) return !1;
    const i = a == null ? void 0 : a.get(r.device_id);
    return j(i == null ? void 0 : i.model, e);
  },
  last_changed: (t, e) => typeof e == "string" && /^[<>]=?\s*\d+$/.test(e) ? it(t.last_changed, e) : j(t.last_changed, e),
  last_updated: (t, e) => typeof e == "string" && /^[<>]=?\s*\d+$/.test(e) ? it(t.last_updated, e) : j(t.last_updated, e),
  last_triggered: (t, e) => typeof e == "string" && /^[<>]=?\s*\d+$/.test(e) ? it(t.attributes.last_triggered, e) : j(t.attributes.last_triggered, e),
  group: (t, e, { card: a }) => {
    var i, s;
    const r = a.hass.states[e];
    return !!((s = (i = r == null ? void 0 : r.attributes) == null ? void 0 : i.entity_id) != null && s.includes(t.entity_id));
  }
};
function Fa(t, e, a, r) {
  var n, o;
  const i = ((n = r.entityMap) == null ? void 0 : n.get(e.entity_id)) || ((o = r.entities) == null ? void 0 : o.find((l) => l.entity_id === e.entity_id)), s = an[a.key];
  return s ? s(e, a.value, { ...r, card: t }, i) : !0;
}
var rn = Object.defineProperty, sn = Object.getOwnPropertyDescriptor, M = (t, e, a, r) => {
  for (var i = r > 1 ? void 0 : r ? sn(e, a) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (i = (r ? n(e, a, i) : n(i)) || i);
  return r && i && rn(e, a, i), i;
};
let V = class extends Z {
  constructor() {
    super(...arguments), this.entitiesByDomain = {}, this.selectedDomain = null, this.selectedDeviceClass = null, this.hiddenEntities = [], this.hiddenLabels = [], this.hiddenAreas = [], this.hide_person = !1, this.hide_content_name = !0, this.list_mode = !1, this.badge_mode = !1, this.no_background = !1, this.badge_color = "", this.badge_text_color = "", this.selectedGroup = null, this._shouldHideCard = !1, this.__registryEntities = [], this.__registryDevices = [], this.__registryAreas = [], this.__registryFetchInProgress = !1, this._parsedGlobalCss = {}, this._parsedGlobalIconCss = {}, this._parsedGlobalCardCss = {}, this._parsedGlobalNameCss = {}, this._parsedGlobalStateCss = {}, this._computeIncludedIdsMemo = L(
      (t, e, a, r, i, s, n, o, l) => Ia(
        t || {},
        e || {},
        a || {},
        {
          area: r,
          floor: i,
          label: s,
          hiddenAreas: n,
          hiddenLabels: o,
          hiddenEntities: l
        },
        X
      )
    ), this._mapIdsToStatesMemo = L(
      (t, e) => Da(t, e),
      (t, e) => {
        const [a, r] = t, [i, s] = e;
        if (a !== i) return !1;
        for (const n of a)
          if (r[n] !== s[n]) return !1;
        return !0;
      }
    ), this._customizationIndexMemo = L(Ba), this._computePersonIdsMemo = L(qs), this._mapPersonIdsToStatesMemo = L(
      (t, e) => Js(t, e),
      (t, e) => {
        const [a, r] = t, [i, s] = e;
        if (a !== i) return !1;
        for (const n of a)
          if (r[n] !== s[n]) return !1;
        return !0;
      }
    ), this._computeExtraItemsMemo = L(
      Ys,
      (t, e) => {
        const [a, r, i] = t, [s, n, o] = e;
        if (a !== s || i !== o) return !1;
        const l = a.extra_entities;
        if (!l) return !0;
        for (const c of l)
          if (r[c] !== n[c]) return !1;
        return !0;
      }
    ), this._computeGroupItemsMemo = L(Qs), this._computeDomainItemsMemo = L(Xs), this._computeDeviceClassItemsMemo = L(en), this._computeEntityMap = L(
      (t) => new Map(t.map((e) => [e.entity_id, e]))
    ), this._computeDeviceMap = L(
      (t) => new Map(t.map((e) => [e.id, e]))
    ), this._computeAreaMap = L(
      (t) => new Map(t.map((e) => [e.area_id, e]))
    ), this._computeGroupCandidatesMemo = L(
      (t, e, a, r, i) => {
        const s = /* @__PURE__ */ new Map(), n = this._computeEntityMap(e), o = this._computeDeviceMap(a), l = this._computeAreaMap(r);
        return t.forEach((c) => {
          const u = Ra(
            c,
            e,
            a,
            r,
            i,
            n,
            o,
            l
          );
          s.set(c.group_id, u);
        }), s;
      }
    ), this._computeGroupResultsMemo = L(
      (t, e, a, r, i, s) => {
        const n = /* @__PURE__ */ new Map(), o = {
          __registryEntities: r,
          __registryDevices: i,
          __registryAreas: s,
          hass: { states: e }
        }, l = this._computeEntityMap(r), c = this._computeDeviceMap(i), u = this._computeAreaMap(s);
        return a.forEach((d) => {
          const p = t.get(d.group_id) || [], h = Za(
            o,
            d,
            p,
            e,
            l,
            c,
            u
          );
          n.set(d.group_id, h);
        }), n;
      }
    ), this._baseEntitiesMemo = L(
      (t, e, a) => t.filter((r) => {
        const i = r.state;
        if (i === "unavailable" || i === "unknown") return !1;
        const s = r.attributes.device_class;
        return e === "switch" ? a === "outlet" ? s === "outlet" : a === "switch" ? s === "switch" || s === void 0 : !0 : !a || s === a;
      })
    ), this.computeLabel = L(
      (t, e, a) => !this.hass || !t ? (t == null ? void 0 : t.name) || "" : Le(this.hass, t, e, a)
    ), this._handlePersonAction = (t) => (e) => {
      e.stopPropagation(), this.showMoreInfo(t);
    }, this._handleDomainAction = L(
      (t, e) => (a) => {
        za(
          this,
          this.hass,
          this._config,
          t,
          e,
          a,
          {
            showMoreInfo: (r) => {
              const i = this.hass.states[r];
              i && this.showMoreInfo(i);
            },
            toggleDomain: (r, i) => this.toggleDomain(r, i),
            selectDomain: (r, i) => {
              this.selectedDomain = r, this.selectedDeviceClass = i || null;
            }
          }
        );
      }
    ), this._computeActionHandler = L(
      (t, e) => zs({ hasHold: t, hasDoubleClick: e })
    ), this._computeSortedEntities = L(
      (t, e, a, r) => [...t, ...e, ...a, ...r].sort(
        (i, s) => i.order - s.order
      )
    );
  }
  _ensureRegistryData() {
    this.__registryEntities.length || !this.hass || typeof this.hass.callWS != "function" || this.__registryFetchInProgress || (this.__registryFetchInProgress = !0, Promise.all([
      at(this.hass, "entity", "entity_id"),
      at(this.hass, "device", "id"),
      at(this.hass, "area", "area_id")
    ]).then(([t, e, a]) => {
      this.__registryEntities = Object.values(t), this.__registryDevices = Object.values(e), this.__registryAreas = Object.values(a);
    }).catch((t) => {
      console.error("Error fetching registry data", t);
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
  shouldUpdate(t) {
    if (!this._config) return !1;
    if (t.has("_config") || t.has("selectedDomain") || t.has("selectedDeviceClass") || t.has("selectedGroup") || t.has("list_mode") || t.has("badge_mode") || t.has("_shouldHideCard") || t.has("__registryEntities") || t.has("__registryDevices") || t.has("__registryAreas")) return !0;
    const e = t.get("hass");
    return !e || !this.hass || e.themes !== this.hass.themes || e.states !== this.hass.states || e.localize !== this.hass.localize || e.language !== this.hass.language;
  }
  _processEntities() {
    const t = this._entitiesByDomain();
    t !== this.entitiesByDomain && (this.entitiesByDomain = t);
  }
  _entitiesByDomain() {
    var d, p, h, g;
    const t = this.hass.entities || [], e = this.hass.devices || [], a = this.hass.areas || [], r = ((d = this.hass) == null ? void 0 : d.states) || {}, i = ((p = this._config) == null ? void 0 : p.area) || null, s = ((h = this._config) == null ? void 0 : h.floor) || null, n = ((g = this._config) == null ? void 0 : g.label) || null, o = this.hiddenAreas, l = this.hiddenLabels, c = this.hiddenEntities, u = this._computeIncludedIdsMemo(
      t,
      e,
      a,
      i,
      s,
      n,
      o,
      l,
      c
    );
    return this._mapIdsToStatesMemo(u, r);
  }
  _baseEntities(t, e) {
    const a = this._entitiesByDomain()[t] || [];
    return this._baseEntitiesMemo(a, t, e);
  }
  _totalEntities(t, e) {
    return this._baseEntities(t, e);
  }
  _shouldShowTotalEntities(t, e) {
    if (this._config.show_total_entities) return !0;
    const a = G(t, e), r = this.getCustomizationForType(a);
    return (r == null ? void 0 : r.show_total_entities) === !0;
  }
  _shouldShowTotalNumbers(t, e) {
    if (this._config.show_total_number) return !0;
    const a = G(t, e), r = this.getCustomizationForType(a);
    return (r == null ? void 0 : r.show_total_number) === !0;
  }
  _isOn(t, e) {
    const a = this._baseEntities(t, e), r = G(t, e), i = this.getCustomizationForType(r), s = (i == null ? void 0 : i.invert) === !0;
    return a.filter(
      (n) => nt(n, t, e, s)
    );
  }
  setConfig(t) {
    if (!t)
      throw new Error("Invalid configuration.");
    this._config = t, this.hide_person = t.hide_person !== void 0 ? t.hide_person : !1, this.hide_content_name = t.hide_content_name !== void 0 ? t.hide_content_name : !1, this.list_mode = t.list_mode !== void 0 ? t.list_mode : !1, this.badge_mode = !!t.badge_mode, this.no_background = !!t.no_background, this.badge_color = t.badge_color || "", this.badge_text_color = t.badge_text_color || "", this.hiddenEntities = t.hidden_entities || [], this.hiddenLabels = t.hidden_labels || [], this.hiddenAreas = t.hidden_areas || [];
    const e = this._config.styles ?? {};
    this._parsedGlobalCardCss = R(e.card), this._parsedGlobalCss = R(e.button), this._parsedGlobalIconCss = R(e.icon), this._parsedGlobalNameCss = R(e.name), this._parsedGlobalStateCss = R(e.state);
  }
  _showPopup(t, e, a) {
    t.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag: e,
          dialogImport: () => customElements.whenDefined(e),
          dialogParams: a,
          opener: t
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _openDomainPopup(t) {
    var n, o, l, c;
    let e = "Details";
    typeof t == "string" ? e = lt(this._config, t) || this.computeLabel({ name: t }) : typeof t == "number" && ((n = this._config.content) != null && n[t]) && (e = this._config.content[t]);
    let a = [], r = [];
    if (typeof t == "number") {
      const u = (o = this._config.content) == null ? void 0 : o[t], d = (l = this._config.rulesets) == null ? void 0 : l.find(
        (p) => p.group_id === u
      );
      if (d) {
        const p = this._computeEntityMap(this.__registryEntities), h = this._computeDeviceMap(this.__registryDevices), g = this._computeAreaMap(this.__registryAreas);
        r = tn(
          this,
          d,
          p,
          h,
          g
        ), a = r;
      } else
        a = [], r = [];
    } else {
      const u = this.selectedDeviceClass || void 0;
      r = this._totalEntities(t, u), a = this._shouldShowTotalEntities(t, u) ? r : this._isOn(t, u);
    }
    const i = typeof t == "string" ? this._shouldShowTotalEntities(
      t,
      this.selectedDeviceClass || void 0
    ) : !1;
    this._showPopup(this, "status-card-popup", {
      title: e,
      hass: this.hass,
      entities: a,
      allEntities: r,
      selectedDomain: typeof t == "string" ? t : void 0,
      selectedDeviceClass: this.selectedDeviceClass || void 0,
      selectedGroup: this.selectedGroup !== null ? this.selectedGroup : void 0,
      card: this,
      opener: this,
      content: a.length ? void 0 : ((c = this.hass) == null ? void 0 : c.localize("ui.card.empty_state.no_entities")) ?? "No entities",
      initialShowAll: i
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearTimeout(this._resetDomainTimeout), clearTimeout(this._resetGroupTimeout);
  }
  willUpdate(t) {
    super.willUpdate(t), !(!this._config || !this.hass) && (t.has("hass") || t.has("_config") || t.has("hiddenEntities") || t.has("hiddenLabels") || t.has("hiddenAreas")) && (this._processEntities(), this._updateShouldHideCard());
  }
  updated(t) {
    if (super.updated(t), !this._config || !this.hass) return;
    this._ensureRegistryData();
    const e = t.get("hass"), a = t.get("_config");
    if (t.has("selectedDomain") && this.selectedDomain) {
      const r = this.selectedDomain;
      if (r.includes(".")) {
        const i = r, s = this.hass.states[i];
        s && this.showMoreInfo(s);
      } else
        this._openDomainPopup(r);
      clearTimeout(this._resetDomainTimeout), this._resetDomainTimeout = setTimeout(() => {
        this.selectedDomain = null;
      }, 0);
    }
    if (t.has("selectedGroup") && this.selectedGroup !== null) {
      const r = this.selectedGroup;
      this._openDomainPopup(r), clearTimeout(this._resetGroupTimeout), this._resetGroupTimeout = setTimeout(() => {
        this.selectedGroup = null;
      }, 0);
    }
    (t.has("hass") && (!e || e.themes !== this.hass.themes) || t.has("_config") && (!a || a.theme !== this._config.theme)) && os(
      this,
      this.hass.themes,
      this._config.theme
    );
  }
  showMoreInfo(t) {
    const e = new CustomEvent("hass-more-info", {
      detail: { entityId: t.entity_id },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(e);
  }
  _hasContent() {
    if (this.getPersonItems().length > 0)
      return !0;
    const t = this.getExtraItems();
    if (t.length > 0 && t.some((n) => {
      var l;
      const o = (l = this.hass) == null ? void 0 : l.states[n.panel];
      return o && o.state !== "unavailable" && o.state !== "unknown";
    }))
      return !0;
    const e = this._computeGroupCandidatesMemo(
      this._config.rulesets || [],
      this.__registryEntities,
      this.__registryDevices,
      this.__registryAreas,
      this.hiddenEntities
    ), a = this._computeGroupResultsMemo(
      e,
      this.hass.states,
      this._config.rulesets || [],
      this.__registryEntities,
      this.__registryDevices,
      this.__registryAreas
    );
    if (this.getGroupItems().some((s) => (a.get(s.group_id) || []).length > 0))
      return !0;
    const i = [
      ...this.getDomainItems(),
      ...this.getDeviceClassItems()
    ];
    for (const s of i) {
      const n = this._baseEntities(
        s.domain,
        s.deviceClass
      );
      if (n.length === 0) continue;
      const o = s.deviceClass ? `${s.domain} - ${s.deviceClass}` : s.domain, l = this.getCustomizationForType(o);
      if (this._config.show_total_entities || (l == null ? void 0 : l.show_total_entities) === !0) return !0;
      const u = (l == null ? void 0 : l.invert) === !0;
      if (n.filter(
        (p) => nt(
          p,
          s.domain,
          s.deviceClass,
          u
        )
      ).length > 0) return !0;
    }
    return !1;
  }
  _updateShouldHideCard() {
    if ((this._config.hide_card_if_empty ?? !1) !== !0) {
      this._shouldHideCard = !1, this.hidden = !1;
      return;
    }
    this._shouldHideCard = !this._hasContent(), this.hidden = this._shouldHideCard;
  }
  getPersonItems() {
    const t = this._computePersonIdsMemo(
      this.hass.entities,
      this.hiddenEntities,
      this.hiddenLabels,
      this.hide_person
    );
    return this._mapPersonIdsToStatesMemo(t, this.hass.states);
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
  toggleDomain(t, e) {
    t = t ?? this.selectedDomain, e = e ?? this.selectedDeviceClass;
    const a = this._isOn(t, e);
    ct(this.hass, a, t);
  }
  _handleGroupAction(t, e, a) {
    return (r) => {
      za(
        this,
        this.hass,
        this._config,
        t,
        void 0,
        r,
        {
          showMoreInfo: (i) => {
            const s = this.hass.states[i];
            s && this.showMoreInfo(s);
          },
          toggleDomain: () => {
            a.forEach((i) => {
              const s = x(i.entity_id);
              ct(this.hass, [i], s);
            });
          },
          selectDomain: () => {
            this.selectedGroup = e;
          }
        }
      );
    };
  }
  getCustomizationForType(t) {
    return He(
      this._config,
      t,
      this._customizationIndexMemo(this._config.customization)
    );
  }
  _getIconStyles(t, e = {}) {
    return Ks(t, e);
  }
  _computeBadgeStyles(t) {
    const e = (t == null ? void 0 : t.badge_color) || this.badge_color || void 0, a = (t == null ? void 0 : t.badge_text_color) || this.badge_text_color || void 0, r = {
      "--status-card-badge-color": e ? `var(--${e}-color)` : void 0,
      "--status-card-badge-text-color": a ? `var(--${a}-color)` : void 0
    };
    return { badgeColor: e, badgeTextColor: a, badgeStyles: r };
  }
  _computeButtonStyles(t) {
    var a, r;
    const e = Os(
      ((a = t == null ? void 0 : t.styles) == null ? void 0 : a.button) || ((r = t == null ? void 0 : t.styles) == null ? void 0 : r.card),
      t
    );
    return { ...this._parsedGlobalCss, ...e };
  }
  _computeCustomIconStyles(t) {
    var a;
    const e = (t == null ? void 0 : t._parsedIconCss) || R((a = t == null ? void 0 : t.styles) == null ? void 0 : a.icon);
    return { ...this._parsedGlobalIconCss, ...e };
  }
  _computeTabStyles(t, e = "domain", a) {
    const r = this._computeActionHandler(
      Aa((t == null ? void 0 : t.hold_action) ?? this._config.hold_action),
      Aa(
        (t == null ? void 0 : t.double_tap_action) ?? this._config.double_tap_action
      )
    ), i = {
      horizontal: this._config.content_layout === "horizontal"
    }, s = this._getIconStyles(e, {
      ...a,
      square: this._config.square
    }), { badgeStyles: n } = this._computeBadgeStyles(t), o = this._computeButtonStyles(t), l = this._computeCustomIconStyles(t), c = (t == null ? void 0 : t.badge_mode) ?? this.badge_mode;
    return {
      ah: r,
      contentClasses: i,
      iconStyles: s,
      badgeStyles: n,
      buttonStyles: o,
      customIconStyles: l,
      showBadge: c
    };
  }
  renderExtraTab(t) {
    const { panel: e, icon: a, name: r, color: i, icon_css: s, background_color: n } = t, o = this.hass.states[e], l = this.getCustomizationForType(e), c = this._handleDomainAction(e), {
      ah: u,
      contentClasses: d,
      iconStyles: p,
      badgeStyles: h,
      buttonStyles: g,
      customIconStyles: y,
      showBadge: _
    } = this._computeTabStyles(l, "extra", {
      color: i,
      background_color: n
    }), m = (l == null ? void 0 : l.state_content) ?? "state";
    return f`
      <ha-tab-group-tab
        slot="nav"
        panel=${e}
        @action=${c}
        .actionHandler=${u}
        class=${_ ? "badge-mode" : ""}
        style=${S(h)}
        data-badge=${qe(_ ? "1" : void 0)}
      >
        <div
          class="extra-entity ${de(d)}"
          style=${S(g)}
        >
          <div
            class="entity-icon"
            style=${S({ ...p, ...y })}
          >
            ${a.startsWith("/") || a.startsWith("http") ? f`<img
                  src=${a}
                  alt=${r}
                  style="border-radius:${this._config.square ? "20%" : "50%"};object-fit:cover;"
                />` : a.startsWith("M") ? f`<ha-svg-icon
                    .path=${a}
                    style="${s || ""}"
                  ></ha-svg-icon>` : f`<ha-state-icon
                    .hass=${this.hass}
                    .stateObj=${o}
                    .icon=${a}
                    data-domain=${x(e)}
                    data-state=${o.state}
                    style="${s || ""}"
                  ></ha-state-icon>`}
          </div>

          ${_ ? "" : f`<div class="entity-info">
                ${this.hide_content_name ? "" : f`<div
                      class="entity-name"
                      style=${S(this._parsedGlobalNameCss)}
                    >
                      ${r}
                    </div>`}
                <div
                  class="entity-state"
                  style=${S(this._parsedGlobalStateCss)}
                >
                  <state-display
                    .stateObj=${o}
                    .hass=${this.hass}
                    .content=${m}
                    .name=${r}
                  ></state-display>
                </div>
              </div>`}
        </div>
      </ha-tab-group-tab>
    `;
  }
  renderGroupTab(t, e) {
    const a = this._computeGroupCandidatesMemo(
      this._config.rulesets || [],
      this.__registryEntities,
      this.__registryDevices,
      this.__registryAreas,
      this.hiddenEntities
    ), i = this._computeGroupResultsMemo(
      a,
      this.hass.states,
      this._config.rulesets || [],
      this.__registryEntities,
      this.__registryDevices,
      this.__registryAreas
    ).get(t.group_id) || [];
    if (!i.length) return f``;
    const s = t.group_id || `${this.hass.localize("component.group.entity_component._.name")} ${e + 1}`, n = t.group_icon || Xr, o = Va(
      this._config,
      s,
      void 0,
      this._customizationIndexMemo(this._config.customization)
    ), l = ot(
      this._config,
      s,
      void 0,
      this._customizationIndexMemo(this._config.customization)
    ), c = this.getCustomizationForType(s), u = this._handleGroupAction(s, e, i), {
      ah: d,
      contentClasses: p,
      iconStyles: h,
      badgeStyles: g,
      buttonStyles: y,
      customIconStyles: _,
      showBadge: m
    } = this._computeTabStyles(c, "domain", {
      color: o,
      background_color: l
    });
    return f`
      <ha-tab-group-tab
        slot="nav"
        panel=${"group-" + e}
        @action=${u}
        .actionHandler=${d}
        class=${m ? "badge-mode" : ""}
        style=${S(g)}
        data-badge=${qe(
      m && i.length > 0 ? String(i.length) : void 0
    )}
      >
        <div
          class="entity ${de(p)}"
          style=${S(y)}
        >
          <div
            class="entity-icon"
            style=${S({ ...h, ..._ })}
          >
            ${n.startsWith("M") ? f`<ha-svg-icon .path=${n}></ha-svg-icon>` : f`<ha-icon icon=${n}></ha-icon>`}
          </div>
          ${m ? "" : f`<div class="entity-info">
                ${this.hide_content_name ? "" : f`<div
                      class="entity-name"
                      style=${S(this._parsedGlobalNameCss)}
                    >
                      ${s}
                    </div>`}
                <div
                  class="entity-state"
                  style=${S(this._parsedGlobalStateCss)}
                >
                  ${i.length}
                  ${t.group_status ? ` ${t.group_status}` : ""}
                </div>
              </div>`}
        </div>
      </ha-tab-group-tab>
    `;
  }
  renderItemTab(t) {
    const e = t.domain, a = t.deviceClass, r = this._isOn(e, a), i = this._totalEntities(e, a), n = this._shouldShowTotalEntities(e, a) ? i : r;
    if (!n.length) return f``;
    const o = Va(
      this._config,
      e,
      a,
      this._customizationIndexMemo(this._config.customization)
    ), l = this.getCustomizationForType(
      G(e, a)
    ), c = this._handleDomainAction(e, a), {
      ah: u,
      contentClasses: d,
      iconStyles: p,
      badgeStyles: h,
      buttonStyles: g,
      customIconStyles: y,
      showBadge: _
    } = this._computeTabStyles(l, "domain", {
      color: o,
      background_color: ot(
        this._config,
        e,
        a,
        this._customizationIndexMemo(this._config.customization)
      )
    }), m = lt(this._config, e, a) || this.computeLabel({ name: a || e });
    let v;
    return this._shouldShowTotalNumbers(e, a) ? v = `${r.length}/${i.length} ${rt(
      this.hass,
      this._config,
      e,
      a
    )}` : this._shouldShowTotalEntities(e, a) ? v = `${i.length}` : v = `${r.length} ${rt(
      this.hass,
      this._config,
      e,
      a
    )}`, f`
      <ha-tab-group-tab
        slot="nav"
        panel=${a || e}
        @action=${c}
        .actionHandler=${u}
        class=${_ ? "badge-mode" : ""}
        style=${S(h)}
        data-badge=${qe(
      _ && n.length > 0 ? String(n.length) : void 0
    )}
      >
        <div
          class="entity ${de(d)}"
          style=${S(g)}
        >
          <div
            class="entity-icon"
            style=${S({ ...p, ...y })}
          >
            ${(() => {
      const k = Oa(this._config, e, a);
      return k.startsWith("M") ? f`<ha-svg-icon .path=${k}></ha-svg-icon>` : f`<ha-icon icon=${k}></ha-icon>`;
    })()}
          </div>
          ${_ ? "" : f`<div class="entity-info">
                ${this.hide_content_name ? "" : f`<div
                      class="entity-name"
                      style=${S(this._parsedGlobalNameCss)}
                    >
                      ${m}
                    </div>`}
                <div
                  class="entity-state"
                  style=${S(this._parsedGlobalStateCss)}
                >
                  ${v}
                </div>
              </div>`}
        </div>
      </ha-tab-group-tab>
    `;
  }
  renderTab(t) {
    switch (t.type) {
      case "extra":
        return this.renderExtraTab(t);
      case "group":
        return this.renderGroupTab(t.ruleset, t.order);
      case "domain":
      case "deviceClass":
        return this.renderItemTab(t);
    }
  }
  render() {
    const t = this.getExtraItems(), e = this.getGroupItems(), a = this.getDomainItems(), r = this.getDeviceClassItems(), i = this._computeSortedEntities(
      t,
      e,
      a,
      r
    ), s = this.getPersonItems();
    if (this._shouldHideCard)
      return f``;
    const n = {
      "no-scroll": !!this._config.no_scroll,
      "badge-mode": this.badge_mode,
      "no-background": this.no_background
    };
    return f`
      <ha-card
        class=${de(n)}
        style=${S(this._parsedGlobalCardCss)}
      >
        <ha-tab-group without-scroll-controls class=${de(n)}>
          <ha-tab-group-tab style="display:none" active></ha-tab-group-tab>
          ${te(
      s,
      (o) => o.entity_id,
      (o) => {
        var v, k, $;
        const l = this.hass.states[o.entity_id], c = (l == null ? void 0 : l.state) !== "home", u = {
          horizontal: this._config.content_layout === "horizontal"
        }, d = {
          "border-radius": (v = this._config) != null && v.square ? "20%" : "50%",
          filter: c ? "grayscale(100%)" : "none"
        }, p = this._config.person_home_color, h = this._config.person_away_color, g = this._config.person_home_icon || "mdi:home", y = this._config.person_away_icon || "mdi:home-export-outline", _ = c ? h || "red" : p || "green", m = c ? y : g;
        return f`
                <ha-tab-group-tab
                  slot="nav"
                  @action=${this._handlePersonAction(o)}
                  .actionHandler=${this._computeActionHandler(!1, !1)}
                  class=${this.badge_mode ? "badge-mode" : ""}
                >
                  ${this.badge_mode ? f`<div
                        class="person-badge"
                        style=${S({
          "--status-card-badge-color": `var(--${_}-color)`,
          "--status-card-badge-text-color": this.badge_text_color ? `var(--${this.badge_text_color}-color)` : void 0
        })}
                      >
                        ${m.startsWith("M") ? f`<ha-svg-icon .path=${m}></ha-svg-icon>` : f`<ha-icon icon=${m}></ha-icon>`}
                      </div>` : ""}
                  <div class="entity ${de(u)}">
                    <div class="entity-icon" style=${S(d)}>
                      ${o.attributes.entity_picture ? f`<img
                            src=${o.attributes.entity_picture}
                            alt=${o.attributes.friendly_name || o.entity_id}
                            style=${S(d)}
                          />` : (k = o.attributes.icon) != null && k.startsWith("M") ? f`<ha-svg-icon
                              class="center"
                              .path=${o.attributes.icon}
                              style=${S(d)}
                            ></ha-svg-icon>` : f`<ha-icon
                              class="center"
                              icon=${o.attributes.icon || "mdi:account"}
                              style=${S(d)}
                            ></ha-icon>`}
                    </div>
                    ${this.badge_mode ? "" : f`<div class="entity-info">
                          ${this.hide_content_name ? "" : f`<div class="entity-name">
                                ${(($ = o.attributes.friendly_name) == null ? void 0 : $.split(
          " "
        )[0]) || ""}
                              </div>`}
                          <div class="entity-state">
                            ${rt(
          this.hass,
          this._config,
          "person",
          void 0,
          l == null ? void 0 : l.state
        )}
                          </div>
                        </div>`}
                  </div>
                </ha-tab-group-tab>
              `;
      }
    )}
          ${te(
      i,
      (o) => o.type === "extra" ? o.panel : o.type === "domain" ? o.domain : o.type === "deviceClass" ? `${o.domain}-${o.deviceClass}` : o.type === "group" ? `group-${o.group_id}` : "",
      (o) => this.renderTab(o)
    )}
        </ha-tab-group>
      </ha-card>
    `;
  }
  static get styles() {
    return [Gs];
  }
  static getConfigElement() {
    return document.createElement("status-card-editor");
  }
  static getStubConfig() {
    return {};
  }
};
M([
  z({ type: Object })
], V.prototype, "_config", 2);
M([
  A()
], V.prototype, "entitiesByDomain", 2);
M([
  A()
], V.prototype, "selectedDomain", 2);
M([
  A()
], V.prototype, "selectedDeviceClass", 2);
M([
  A()
], V.prototype, "hiddenEntities", 2);
M([
  A()
], V.prototype, "hiddenLabels", 2);
M([
  A()
], V.prototype, "hiddenAreas", 2);
M([
  A()
], V.prototype, "hide_person", 2);
M([
  A()
], V.prototype, "hide_content_name", 2);
M([
  A()
], V.prototype, "list_mode", 2);
M([
  A()
], V.prototype, "badge_mode", 2);
M([
  A()
], V.prototype, "no_background", 2);
M([
  A()
], V.prototype, "badge_color", 2);
M([
  A()
], V.prototype, "badge_text_color", 2);
M([
  A()
], V.prototype, "selectedGroup", 2);
M([
  z({ attribute: !1 })
], V.prototype, "hass", 2);
M([
  A()
], V.prototype, "_shouldHideCard", 2);
M([
  A()
], V.prototype, "__registryEntities", 2);
M([
  A()
], V.prototype, "__registryDevices", 2);
M([
  A()
], V.prototype, "__registryAreas", 2);
M([
  A()
], V.prototype, "__registryFetchInProgress", 2);
M([
  A()
], V.prototype, "_parsedGlobalCss", 2);
M([
  A()
], V.prototype, "_parsedGlobalIconCss", 2);
M([
  A()
], V.prototype, "_parsedGlobalCardCss", 2);
M([
  A()
], V.prototype, "_parsedGlobalNameCss", 2);
M([
  A()
], V.prototype, "_parsedGlobalStateCss", 2);
V = M([
  Te("status-card")
], V);
function nn(t, e, a, r, i) {
  const s = (u, d, p) => Le(t, u, d, p), n = s({ name: "area" }), o = s({ name: "floor" }), l = s({ name: "name" }), c = s({ name: "state" });
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
                    { value: "area", label: n },
                    { value: "floor", label: o }
                  ]
                }
              }
            },
            { name: "label_filter", selector: { boolean: {} } }
          ]
        },
        ...e === "area" && r === !1 ? [
          { name: "multiple_areas", selector: { boolean: {} } },
          { name: "area", selector: { area: {} } }
        ] : [],
        ...e === "area" && r === !0 ? [
          { name: "multiple_areas", selector: { boolean: {} } },
          { name: "area", selector: { area: { multiple: !0 } } }
        ] : [],
        ...e === "floor" && i === !1 ? [
          { name: "multiple_floors", selector: { boolean: {} } },
          { name: "floor", selector: { floor: {} } }
        ] : [],
        ...e === "floor" && i === !0 ? [
          { name: "multiple_floors", selector: { boolean: {} } },
          { name: "floor", selector: { floor: { multiple: !0 } } }
        ] : [],
        ...a ? [
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
                { value: "name", label: l },
                { value: "state", label: c }
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
function on(t, e) {
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
    ...e ? [
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
          options: ["vertical", "horizontal"].map((a) => ({
            label: t.localize(
              `ui.panel.lovelace.editor.card.tile.content_layout_options.${a}`
            ),
            value: a,
            image: {
              src: `/static/images/form/tile_content_layout_${a}.svg`,
              src_dark: `/static/images/form/tile_content_layout_${a}_dark.svg`,
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
function ln(t) {
  const e = [
    "more-info",
    "toggle",
    "navigate",
    "url",
    "perform-action",
    "none"
  ];
  return [
    { name: "tap_action", selector: { ui_action: { actions: e } } },
    { name: "double_tap_action", selector: { ui_action: { actions: e } } },
    { name: "hold_action", selector: { ui_action: { actions: e } } }
  ];
}
const cn = (t, e, a, r, i) => t === "domain" ? [
  {
    name: "",
    type: "grid",
    schema: [
      ...i ? [] : [{ name: "invert", selector: { boolean: {} } }],
      { name: "badge_mode", selector: { boolean: {} } },
      ...r ? [
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
      ...i ? [] : [
        { name: "show_total_number", selector: { boolean: {} } },
        { name: "show_total_entities", selector: { boolean: {} } }
      ]
    ]
  },
  ...i ? [] : [
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
                label: a.localize(
                  "ui.panel.lovelace.editor.condition-editor.condition.state.state_equal"
                ),
                value: "false"
              },
              {
                label: a.localize(
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
        selector: { state: { entity_id: e || "" } }
      }
    ]
  },
  {
    name: "state_content",
    selector: { ui_state_content: { entity_id: e } }
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
], un = (t, e, a, r) => {
  const i = [
    "more-info",
    "toggle",
    "navigate",
    "url",
    "perform-action",
    "none"
  ];
  return [
    { name: "tap_action", selector: { ui_action: { actions: i } } },
    { name: "double_tap_action", selector: { ui_action: { actions: i } } },
    { name: "hold_action", selector: { ui_action: { actions: i } } }
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
var pn = Object.defineProperty, mn = Object.getOwnPropertyDescriptor, J = (t, e, a, r) => {
  for (var i = r > 1 ? void 0 : r ? mn(e, a) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (i = (r ? n(e, a, i) : n(i)) || i);
  return r && i && pn(e, a, i), i;
};
let K = class extends Z {
  constructor() {
    super(...arguments), this.isGroup = !1, this._activeTab = "appearance";
  }
  willUpdate(t) {
    t.has("config") && this.config && (this._config = {
      ...this.config,
      invert_state: this.config.invert_state || "false"
    });
  }
  render() {
    var a, r, i, s;
    if (!this.hass || !this.config)
      return f``;
    let t;
    this._activeTab === "appearance" ? t = cn(
      this.getSchema,
      (a = this.config) == null ? void 0 : a.type,
      this.hass,
      ((r = this._config) == null ? void 0 : r.badge_mode) ?? !1,
      this.isGroup
    ) : this._activeTab === "actions" ? t = un(
      this.getSchema,
      (i = this.config) == null ? void 0 : i.type,
      this.hass,
      ((s = this._config) == null ? void 0 : s.badge_mode) ?? !1
    ) : this._activeTab === "style" && (t = dn());
    const e = {
      ...this._config
    };
    return f`
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
        ${this.getSchema === "domain" ? f`
              <ha-tab-group-tab
                .active=${this._activeTab === "popup"}
                @click=${() => this._activeTab = "popup"}
              >
                Popup Card
              </ha-tab-group-tab>
            ` : ""}
      </ha-tab-group>
      ${this._activeTab === "style" ? f`
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
                ${this.getSchema === "entity" ? f`<li><b>name</b>: Item Name (Label)</li>` : f``}
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
      ${this._activeTab === "popup" ? this._renderPopupTab() : f`
            <ha-form
              .hass=${this.hass}
              .data=${e}
              .schema=${t}
              .computeLabel=${(n) => n.name === "styles" ? "Styles" : Le(this.hass, n)}
              @value-changed=${this._valueChangedSchema}
            ></ha-form>
          `}
    `;
  }
  _renderPopupTab() {
    var e;
    const t = (e = this._config) == null ? void 0 : e.popup_card;
    return t ? f`
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
            .disabled=${!t}
          >
            ${this.hass.localize("ui.common.delete")}
          </ha-button>
        </div>
        <hui-card-element-editor
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          .value=${t}
          @config-changed=${this._popupCardChanged}
        ></hui-card-element-editor>
      </div>
    ` : f`
        <div class="card-picker">
          <hui-card-picker
            .hass=${this.hass}
            .lovelace=${this.lovelace}
            @config-changed=${this._cardPicked}
          ></hui-card-picker>
        </div>
      `;
  }
  _cardPicked(t) {
    t.stopPropagation();
    const e = t.detail.config;
    this._updatePopupCard(e);
  }
  _popupCardChanged(t) {
    t.stopPropagation();
    const e = t.detail.config;
    this._updatePopupCard(e);
  }
  _updatePopupCard(t) {
    if (!this._config) return;
    const e = {
      ...this._config,
      popup_card: t
    };
    this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _removePopupCard() {
    if (!this._config) return;
    const { popup_card: t, ...e } = this._config;
    this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    );
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
        detail: { config: e },
        bubbles: !0,
        composed: !0
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
    return Ae`
      h3 {
        margin-bottom: 0.5em;
      }
      ha-form {
        display: block;
      }
      ha-selector {
        width: 100%;
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
J([
  z({ attribute: !1 })
], K.prototype, "config", 2);
J([
  z({ attribute: !1 })
], K.prototype, "hass", 2);
J([
  z({ attribute: !1 })
], K.prototype, "lovelace", 2);
J([
  z({ type: Number })
], K.prototype, "index", 2);
J([
  z()
], K.prototype, "getSchema", 2);
J([
  z({ type: Boolean })
], K.prototype, "isGroup", 2);
J([
  A()
], K.prototype, "_config", 2);
J([
  A()
], K.prototype, "_activeTab", 2);
K = J([
  Te("status-card-item-editor")
], K);
var fn = Object.defineProperty, gn = Object.getOwnPropertyDescriptor, Re = (t, e, a, r) => {
  for (var i = r > 1 ? void 0 : r ? gn(e, a) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (i = (r ? n(e, a, i) : n(i)) || i);
  return r && i && fn(e, a, i), i;
};
class kt extends Z {
  constructor() {
    super(...arguments), this.SelectOptions = [], this._entityKeys = /* @__PURE__ */ new WeakMap();
  }
  _getKey(e) {
    return this._entityKeys.has(e) || this._entityKeys.set(e, Math.random().toString()), this._entityKeys.get(e);
  }
  render() {
    if (!this.hass)
      return P;
    const e = new Set(
      (this.customizationkey || []).map((r) => r.type)
    ), a = this.SelectOptions.filter(
      (r) => !e.has(r.value)
    );
    return f`
      <div class="customization">
        ${this.customizationkey && te(
      this.customizationkey,
      (r) => this._getKey(r),
      (r, i) => f`
            <div class="customize-item">
              <ha-selector
                .hass=${this.hass}
                .label=${w("edit_domains_dc", this.hass.locale.language)}
                .required=${!1}
                .selector=${{
        select: {
          options: this.SelectOptions,
          mode: "dropdown"
        }
      }}
                .value=${r.type}
                .index=${i}
                @value-changed=${this._valueChanged}
              ></ha-selector>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.remove")}
                .path=${Ge}
                class="remove-icon"
                .index=${i}
                @click=${this._removeRow}
              ></ha-icon-button>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.edit")}
                .path=${yi}
                class="edit-icon"
                .index=${i}
                @click=${this._editRow}
              ></ha-icon-button>
            </div>
          `
    )}

        <div class="add-item row">
          <ha-selector
            .hass=${this.hass}
            .label=${w("edit_domains_dc", this.hass.locale.language)}
            .required=${!1}
            .selector=${{
      select: {
        options: a,
        mode: "dropdown"
      }
    }}
            .value=${""}
            @value-changed=${this._addRow}
          ></ha-selector>
        </div>
      </div>
    `;
  }
  _valueChanged(e) {
    if (!this.customizationkey || !this.hass)
      return;
    const a = e.detail.value, i = e.target.index;
    if (i === void 0) return;
    const s = this.customizationkey.concat();
    s[i] = { ...s[i], type: a || "" }, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _removeRow(e) {
    e.stopPropagation();
    const a = e.currentTarget.index;
    if (a != null) {
      const r = this.customizationkey.concat();
      r.splice(a, 1), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: r },
          bubbles: !0,
          composed: !0
        })
      );
    }
  }
  _editRow(e) {
    e.stopPropagation();
    const a = e.target.index;
    a != null && B(this, "edit-item", a);
  }
  _addRow(e) {
    if (e.stopPropagation(), !this.customizationkey || !this.hass)
      return;
    const a = e.detail.value;
    if (!a)
      return;
    const r = { type: a };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: [...this.customizationkey, r] },
        bubbles: !0,
        composed: !0
      })
    );
  }
  static get styles() {
    return Ae`
      .customization {
        margin-top: 16px;
      }
      .customize-item,
      .add-item {
        display: flex;
        align-items: center;
      }
      .remove-icon,
      .edit-icon {
        --mdc-icon-button-size: 36px;
        color: var(--secondary-text-color);
        padding-left: 4px;
      }
      .customize-item ha-selector,
      .add-item ha-selector {
        flex: 1;
      }
    `;
  }
}
Re([
  z({ attribute: !1 })
], kt.prototype, "hass", 2);
Re([
  z({ type: Array })
], kt.prototype, "SelectOptions", 2);
let dt = class extends kt {
  get customizationkey() {
    return this.customization;
  }
};
Re([
  z({ attribute: !1 })
], dt.prototype, "customization", 2);
dt = Re([
  Te("status-items-editor")
], dt);
var _n = Object.defineProperty, vn = Object.getOwnPropertyDescriptor, ie = (t, e, a, r) => {
  for (var i = r > 1 ? void 0 : r ? vn(e, a) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (i = (r ? n(e, a, i) : n(i)) || i);
  return r && i && _n(e, a, i), i;
};
function st(t, e) {
  const { [e]: a, ...r } = t;
  return r;
}
let q = class extends Z {
  constructor() {
    super(...arguments), this._subElementEditorDomain = void 0, this._subElementEditorEntity = void 0, this.rulesets = [
      {
        group_id: "",
        group_icon: "",
        group_status: "",
        rules: [{ key: "", value: "" }]
      }
    ], this._activeTab = "config", this.computeLabel = L(
      (t, e, a) => !this.hass || !t ? (t == null ? void 0 : t.name) || "" : Le(this.hass, t, e, a)
    ), this._filterInitialized = !1, this._lastFilter = {
      area: [],
      floor: [],
      label: []
    }, this._groupPreviousIds = /* @__PURE__ */ new Map(), this._schema = L(
      (t, e, a, r, i, s) => {
        switch (t) {
          case "appearance":
            return on(this.hass, s);
          case "actions":
            return ln(this.hass);
          case "style":
            return hn();
          case "config":
          default:
            return nn(
              this.hass,
              e,
              a,
              r,
              i
            );
        }
      }
    ), this._toggleschema = L((t) => [
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
    ]), this._dynamicOrder = (() => {
      const t = [];
      for (const e of Object.keys(ae)) {
        const a = ae[e];
        for (const r of Object.keys(a))
          r !== "on" && r !== "off" && t.push(`${e} - ${r}`);
        t.push(e);
      }
      return t;
    })(), this._entitiesSchema = L((t) => {
      const e = this.computeLabel({ name: "area" }), a = this.computeLabel({ name: "label" }), r = this.computeLabel({ name: "entity" });
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
                    { value: "entity", label: r },
                    { value: "label", label: a },
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
    }), this._buildToggleOptions = L(
      (t, e) => this._buildOptions("toggle", t, e)
    ), this._memoizedClassesForArea = L(
      (t, e, a, r, i, s) => this._classesForArea(t, e, a, r, i, s)
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
    }, this._removeRuleset = (t) => {
      this.rulesets = this.rulesets.filter((e, a) => a !== t), this._updateConfigFromRulesets();
    }, this._toggleEntityHidden = (t) => {
      var r;
      const e = new Set(((r = this._config) == null ? void 0 : r.hidden_entities) ?? []);
      e.has(t) ? e.delete(t) : e.add(t);
      const a = Array.from(e);
      this._config = {
        ...this._config || {},
        hidden_entities: a
      }, B(this, "config-changed", { config: { ...this._config } });
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
    }, Array.isArray(this._config.content) && (this._config = {
      ...this._config,
      content: this._config.content.map(
        (e) => this._normalizeContentEntry(e)
      )
    }), this._loadRulesetsFromConfig();
  }
  _updateAreaFloorInConfig() {
    if (!this._config || !this._config.filter) return;
    this._config.filter === "area" && this._config.floor !== void 0 ? (this._config = st(this._config, "floor"), B(this, "config-changed", { config: this._config })) : this._config.filter === "floor" && this._config.area !== void 0 && (this._config = st(this._config, "area"), B(this, "config-changed", { config: this._config }));
  }
  async updated(t) {
    super.updated(t);
    let e = !1;
    if (!(!this.hass || !this._config) && t.has("_config")) {
      if (this._updateAreaFloorInConfig(), (this._config.label_filter === !1 && this._config.label !== void 0 || Array.isArray(this._config.label) && this._config.label.length === 0) && (this._config = st(this._config, "label"), e = !0), this._config.hide_filter && !["entity", "label", "area"].includes(this._config.hide_filter)) {
        const v = (/* @__PURE__ */ new Map([
          [this.computeLabel({ name: "entity" }), "entity"],
          [this.computeLabel({ name: "label" }), "label"],
          [this.computeLabel({ name: "area" }), "area"]
        ])).get(this._config.hide_filter);
        v && (this._config = { ...this._config, hide_filter: v }, e = !0);
      }
      const a = t.get("_config"), r = (a == null ? void 0 : a.extra_entities) ?? [], i = this._config.extra_entities ?? [], s = (a == null ? void 0 : a.content) ?? [], n = this._config.content ?? [], o = Array.isArray(this._config.area) ? [...this._config.area] : this._config.area ? [this._config.area] : [], l = Array.isArray(this._config.floor) ? [...this._config.floor] : this._config.floor ? [this._config.floor] : [], c = Array.isArray(this._config.label) ? [...this._config.label] : [];
      this._filterInitialized || (this._lastFilter = {
        area: o,
        floor: l,
        label: c
      }, this._filterInitialized = !0);
      const u = this._lastFilter.area, d = this._lastFilter.floor, p = this._lastFilter.label, h = !Q(p, c), g = !Q(d, l), y = !Q(u, o), _ = this._config.content === void 0;
      if (y || g || h || _) {
        const m = this._dynamicOrder, k = this.possibleToggleDomains.map(($) => this._normalizeContentEntry($)).sort(($, b) => {
          const H = m.indexOf($), E = m.indexOf(b);
          return (H === -1 ? m.length : H) - (E === -1 ? m.length : E);
        });
        this._config = {
          ...this._config,
          content: [...k]
        }, this._lastFilter = {
          area: [...o],
          floor: [...l],
          label: [...c]
        }, e = !0;
      }
      if (this._config.rulesets && Array.isArray(this._config.rulesets)) {
        const m = this._config.rulesets.filter(
          (b) => Object.keys(b).some(
            (H) => H !== "group_id" && H !== "group_icon" && H !== "group_status" && b[H] !== void 0 && b[H] !== ""
          )
        ).map((b) => b.group_id).filter((b) => b && b.length > 1);
        let v = Array.isArray(this._config.content) ? [...this._config.content] : [];
        v = v.filter((b) => !m.includes(b));
        const k = this._config.extra_entities ?? [];
        let $ = 0;
        for (let b = 0; b < v.length; b++) {
          if (!k.includes(v[b])) {
            $ = b;
            break;
          }
          $ = b + 1;
        }
        v = [
          ...v.slice(0, $),
          ...m.filter((b) => !v.includes(b)),
          ...v.slice($)
        ], Q(v, this._config.content ?? []) || (this._config = {
          ...this._config,
          content: v
        }, e = !0);
      }
      if (!Q(r, i)) {
        let m = [...n];
        i.forEach((v) => {
          m.includes(v) || m.unshift(v);
        }), m = m.filter(
          (v) => !v.includes(".") || i.includes(v)
        ), Q(m, n) || (this._config = {
          ...this._config,
          content: m
        }, e = !0);
      }
      if (!Q(s, n)) {
        let m = [...i];
        m = m.filter((v) => n.includes(v)), Q(m, i) || (this._config = {
          ...this._config,
          extra_entities: m
        }, e = !0);
      }
      e && (B(this, "config-changed", { config: { ...this._config } }), this.requestUpdate());
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
      ...t.rules.map((e, a) => {
        const r = t.rules.map((s, n) => n !== a ? s.key : null).filter((s) => s), i = this.ruleKeySelector.options.filter(
          ([s]) => !r.includes(s) || s === e.key
        );
        return {
          type: "grid",
          schema: [
            {
              type: "select",
              name: `key_${a}`,
              options: i
            },
            {
              name: `value_${a}`,
              selector: this.filterValueSelector[e.key] ?? { text: {} }
            }
          ]
        };
      })
    ];
  }
  _valueChanged(t) {
    const e = t.detail.value;
    Array.isArray(e == null ? void 0 : e.content) && (e.content = e.content.map(
      (a) => this._normalizeContentEntry(a)
    )), this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config }
      })
    );
  }
  get possibleToggleDomains() {
    var t, e, a;
    return this._memoizedClassesForArea(
      ((t = this._config) == null ? void 0 : t.area) || [],
      ((e = this._config) == null ? void 0 : e.floor) || [],
      ((a = this._config) == null ? void 0 : a.label) || [],
      this.hass.entities,
      this.hass.devices,
      this.hass.areas
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
    const a = e[1].toLowerCase().replace(/\s+/g, "_"), r = e[2].toLowerCase();
    return { domain: a, deviceClass: r };
  }
  _normalizeContentEntry(t) {
    if (t.includes(".")) return t;
    const e = this._parseTypePair(t);
    if (e) {
      const { domain: r, deviceClass: i } = e;
      return ae[r] || X.includes(r) ? `${r} - ${i}` : t;
    }
    const a = t.trim().toLowerCase().replace(/\s+/g, "_");
    return ae[a] || X.includes(a) ? a : t;
  }
  _labelForTypePair(t) {
    var a, r, i;
    if (t.includes(".")) {
      const s = (r = (a = this.hass) == null ? void 0 : a.states) == null ? void 0 : r[t];
      return ((i = s == null ? void 0 : s.attributes) == null ? void 0 : i.friendly_name) || t;
    }
    const e = this._parseTypePair(t);
    if (e) {
      const { domain: s, deviceClass: n } = e;
      if (s === "switch" && n === "switch") {
        const c = this.hass.localize(
          "component.switch.entity_component._.name"
        );
        return `${c} - ${c}`;
      }
      const o = this.hass.localize(`component.${s}.entity_component._.name`) || s, l = this.hass.localize(
        `ui.dialogs.entity_registry.editor.device_classes.${s}.${n}`
      ) || n;
      return `${o} - ${l}`;
    }
    return t === "scene" ? "Scene" : this.hass.localize(`component.${t}.entity_component._.name`) || t;
  }
  _classesForArea(t, e, a, r, i, s) {
    var p;
    const n = ((p = this._config) == null ? void 0 : p.extra_entities) || [], o = La(
      r,
      i,
      s,
      this.hass.states,
      { area: t, floor: e, label: a },
      X
    ), l = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set();
    for (const h in o) {
      if (!Object.prototype.hasOwnProperty.call(o, h))
        continue;
      const g = o[h];
      ["binary_sensor", "cover", "switch"].includes(h) ? g.forEach((y) => {
        const _ = y.attributes.device_class;
        _ && c.add(`${h} - ${_}`);
      }) : l.add(h);
    }
    const u = this._dynamicOrder, d = [...c];
    return [...l, ...d, ...n].sort(
      (h, g) => {
        const y = u.indexOf(h), _ = u.indexOf(g);
        return (y === -1 ? u.length : y) - (_ === -1 ? u.length : _);
      }
    );
  }
  _buildOptions(t, e, a) {
    var o;
    const r = [.../* @__PURE__ */ new Set([...e, ...a])], i = ((o = this.hass) == null ? void 0 : o.states) || {}, s = /* @__PURE__ */ new Map(), n = r.map((l) => {
      var u, d;
      if (s.has(l))
        return { value: l, label: s.get(l) };
      let c;
      return l.includes(".") ? c = ((d = (u = i[l]) == null ? void 0 : u.attributes) == null ? void 0 : d.friendly_name) || l : l === "scene" ? c = "Scene" : c = this._labelForTypePair(l), s.set(l, c), { value: l, label: c };
    });
    return n.sort((l, c) => {
      const u = l.value.includes("."), d = c.value.includes(".");
      return u && !d ? -1 : !u && d ? 1 : xa(
        l.label,
        c.label,
        this.hass.locale.language
      );
    }), n;
  }
  _itemChanged(t, e, a) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const r = e == null ? void 0 : e.index;
    if (r != null) {
      const i = [...this._config.customization ?? []];
      i[r] = t.detail.config, B(this, "config-changed", {
        config: { ...this._config, customization: i }
      });
    }
  }
  _editItem(t, e) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const a = t.detail;
    this[`_subElementEditor${e}`] = { index: a };
  }
  _edit_itemDomain(t) {
    const e = t.detail, r = (this._config.customization ?? [])[e];
    let i;
    r && r.type && r.type.includes(".") ? i = "Entity" : i = "Domain", this._editItem(t, i);
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
  _renderSubElementEditor(t, e, a) {
    var l, c, u, d, p, h, g;
    const r = `_subElementEditor${t.charAt(0).toUpperCase() + t.slice(1)}`, i = this[r], s = ((u = (c = (l = this._config) == null ? void 0 : l.customization) == null ? void 0 : c[(i == null ? void 0 : i.index) ?? 0]) == null ? void 0 : u.type) ?? "unknown", n = this._labelForTypePair(s), o = ((p = (d = this._config) == null ? void 0 : d.rulesets) == null ? void 0 : p.some((y) => y.group_id === s)) ?? !1;
    return f`
      <div class="header">
        <div class="back-title">
          <ha-icon-button
            slot="trigger"
            .label=${this.hass.localize("ui.common.back")}
            .path=${Nr}
            @click=${e}
          ></ha-icon-button>
          <span slot="title">${n}</span>
        </div>
      </div>
      <status-card-item-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .config=${((g = (h = this._config) == null ? void 0 : h.customization) == null ? void 0 : g[(i == null ? void 0 : i.index) ?? 0]) ?? {}}
        .getSchema=${t}
        .index=${(i == null ? void 0 : i.index) ?? 0}
        .isGroup=${o}
        @config-changed=${a}
      >
      </status-card-item-editor>
    `;
  }
  _customizationChanged(t, e) {
    t.stopPropagation(), !(!this._config || !this.hass) && B(this, "config-changed", {
      config: {
        ...this._config,
        customization: t.detail.config
      }
    });
  }
  _customizationChangedDomain(t) {
    this._customizationChanged(t, "domain");
  }
  _loadRulesetsFromConfig() {
    this.rulesets = (this._config.rulesets ?? []).map((t) => {
      var a;
      const e = Object.keys(t).filter(
        (r) => r !== "group_id" && r !== "group_icon" && r !== "group_status" && t[r] !== void 0
      ).map((r) => ({
        key: r,
        value: t[r] ?? ""
      }));
      return (e.length === 0 || ((a = e[e.length - 1]) == null ? void 0 : a.key) !== "") && e.push({ key: "", value: "" }), {
        group_id: t.group_id ?? "",
        group_icon: t.group_icon ?? "",
        group_status: t.group_status ?? "",
        rules: e
      };
    }), this._groupPreviousIds.clear(), this.rulesets.forEach(
      (t, e) => this._groupPreviousIds.set(e, t.group_id || "")
    );
  }
  _commitRulesets() {
    var s;
    const t = this.rulesets.map((n) => {
      const o = n.rules.reduce(
        (l, c) => (c.key && c.key !== "" && (l[c.key] = c.value ?? ""), l),
        {}
      );
      return {
        group_id: n.group_id ?? "",
        group_icon: n.group_icon ?? "",
        group_status: n.group_status ?? "",
        ...o
      };
    }), e = Array.isArray((s = this._config) == null ? void 0 : s.content) ? [...this._config.content] : [], a = /* @__PURE__ */ new Map();
    t.forEach((n, o) => {
      const l = n.group_id ?? "", c = this._groupPreviousIds.get(o) ?? "";
      c && c !== l && a.set(c, l);
    });
    const r = /* @__PURE__ */ new Set(), i = [];
    for (const n of e) {
      const o = a.get(n) ?? n;
      r.has(o) || (r.add(o), i.push(o));
    }
    this._config = {
      ...this._config,
      rulesets: t,
      content: i
    }, this._groupPreviousIds.clear(), t.forEach(
      (n, o) => this._groupPreviousIds.set(o, n.group_id ?? "")
    ), B(this, "config-changed", {
      config: this._config
    });
  }
  _updateConfigFromRulesets() {
    this._commitRulesets();
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
    return t.sort((e, a) => e[1].localeCompare(a[1], this.hass.locale.language)), {
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
    return t.rules.forEach((a, r) => {
      e[`key_${r}`] = a.key, e[`value_${r}`] = a.value;
    }), e;
  }
  _groupValueChanged(t, e) {
    var c;
    const { value: a } = t.detail, r = this.rulesets[e] ?? {
      group_id: "",
      group_icon: "",
      group_status: "",
      rules: []
    }, i = this._groupFormData(r), s = { ...i, ...a }, n = Object.keys(s).filter((u) => u.startsWith("key_")).sort((u, d) => {
      const p = parseInt(u.split("_")[1], 10), h = parseInt(d.split("_")[1], 10);
      return p - h;
    }).map((u) => {
      const d = u.split("_")[1];
      return {
        key: s[`key_${d}`] ?? "",
        value: s[`value_${d}`] ?? ""
      };
    });
    (n.length === 0 || ((c = n[n.length - 1]) == null ? void 0 : c.key) !== "") && n.push({ key: "", value: "" });
    const o = {
      group_id: s.group_id ?? "",
      group_icon: s.group_icon ?? "",
      group_status: s.group_status ?? "",
      rules: n
    };
    if (this.rulesets = this.rulesets.map(
      (u, d) => d === e ? o : u
    ), !Object.keys(s).some((u) => u === "group_id" ? !1 : s[u] !== i[u])) {
      this._groupDrafts.add(e);
      return;
    }
    this._groupDrafts.delete(e), this._updateConfigFromRulesets();
  }
  _groupFormBlur(t) {
    this._groupDrafts.has(t) && (this._groupDrafts.delete(t), this._updateConfigFromRulesets());
  }
  _groupAllEntitiesByDomain() {
    var d, p, h, g, y, _, m, v, k, $;
    const t = this.hass.entities || {}, e = this.hass.devices || {}, a = this.hass.areas || {}, r = {
      area: Array.isArray((d = this._config) == null ? void 0 : d.area) ? this._config.area : (p = this._config) != null && p.area ? [this._config.area] : [],
      floor: Array.isArray((h = this._config) == null ? void 0 : h.floor) ? this._config.floor : (g = this._config) != null && g.floor ? [this._config.floor] : [],
      label: Array.isArray((y = this._config) == null ? void 0 : y.label) ? this._config.label : [],
      hiddenAreas: ((_ = this._config) == null ? void 0 : _.hidden_areas) ?? [],
      hiddenLabels: ((m = this._config) == null ? void 0 : m.hidden_labels) ?? [],
      hiddenEntities: ((v = this._config) == null ? void 0 : v.hidden_entities) ?? []
    }, i = La(
      t,
      e,
      a,
      ((k = this.hass) == null ? void 0 : k.states) || {},
      r,
      [...X, "person"]
    ), s = Object.values(this.hass.states).filter(
      (b) => x(b.entity_id) === "person"
    );
    if (s.length > 0) {
      const b = i.person || [], H = new Set(b.map((D) => D.entity_id)), E = s.filter(
        (D) => !H.has(D.entity_id)
      );
      i.person = [...b, ...E];
    }
    const n = Object.fromEntries(
      Object.entries(i).map(([b, H]) => [
        b,
        H.map((E) => E.entity_id)
      ])
    ), o = this._hiddenEntitiesByDomain(), l = (($ = this.hass) == null ? void 0 : $.states) || {}, c = Array.from(
      /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(o)])
    ).filter((b) => [...X, "person"].includes(b)), u = Ie(
      l,
      this.hass.locale.language
    );
    return c.sort((b, H) => b.localeCompare(H)).map((b) => {
      const H = /* @__PURE__ */ new Set([
        ...n[b] || [],
        ...o[b] || []
      ]);
      return { domain: b, entities: Array.from(H).sort(u) };
    });
  }
  _domainLabel(t) {
    var e, a;
    return ((a = (e = this.hass) == null ? void 0 : e.localize) == null ? void 0 : a.call(e, `component.${t}.entity_component._.name`)) || t;
  }
  _isHiddenEntity(t) {
    var a;
    const e = ((a = this._config) == null ? void 0 : a.hidden_entities) ?? [];
    return Array.isArray(e) && e.includes(t);
  }
  _getDeviceClassLabel(t, e) {
    if (!e || e === "other")
      return this.hass.localize("ui.dialogs.helper_settings.generic.other") ?? "Other";
    const a = `ui.dialogs.entity_registry.editor.device_classes.${t}.${e}`;
    return this.hass.localize(a) || e;
  }
  _groupByDeviceClass(t, e) {
    var n, o, l;
    const a = ((n = this.hass) == null ? void 0 : n.states) || {}, r = {};
    for (const c of e) {
      const u = ((l = (o = a[c]) == null ? void 0 : o.attributes) == null ? void 0 : l.device_class) || "";
      u && (r[u] || (r[u] = []), r[u].push(c));
    }
    const i = Ie(
      a,
      this.hass.locale.language
    );
    return Object.keys(r).sort((c, u) => c.localeCompare(u)).map((c) => ({
      deviceClass: c,
      label: this._getDeviceClassLabel(t, c),
      entities: r[c].slice().sort(i)
    }));
  }
  _hiddenEntitiesByDomain() {
    var d, p, h, g, y;
    const t = {}, e = Array.isArray((d = this._config) == null ? void 0 : d.hidden_entities) ? this._config.hidden_entities : [];
    if (e.length === 0) return t;
    const a = this.hass.entities || {}, r = this.hass.devices || {}, i = (p = this.hass) != null && p.areas ? Object.values(this.hass.areas) : [], s = (h = this._config) == null ? void 0 : h.area, n = (g = this._config) == null ? void 0 : g.floor, o = (y = this._config) == null ? void 0 : y.label, l = s ? Array.isArray(s) ? s : [s] : [], c = n ? Array.isArray(n) ? n : [n] : [], u = o ? Array.isArray(o) ? o : [o] : [];
    for (const _ of e) {
      const m = x(_);
      if (![...X, "person"].includes(m)) continue;
      const v = a[_], k = v != null && v.device_id ? r[v.device_id] : void 0;
      if (((v == null ? void 0 : v.area_id) != null || (k == null ? void 0 : k.area_id) != null) && !(u.length && !(Array.isArray(v == null ? void 0 : v.labels) && v.labels.some((H) => u.includes(H)) || Array.isArray(k == null ? void 0 : k.labels) && k.labels.some((H) => u.includes(H)))) && !(l.length && !(v != null && v.area_id && l.includes(v.area_id) || k != null && k.area_id && l.includes(k.area_id)))) {
        if (c.length) {
          const b = (v == null ? void 0 : v.area_id) && i.some(
            (E) => E.area_id === v.area_id && E.floor_id && c.includes(E.floor_id)
          ), H = (k == null ? void 0 : k.area_id) && i.some(
            (E) => E.area_id === k.area_id && E.floor_id && c.includes(E.floor_id)
          );
          if (!b && !H) continue;
        }
        t[m] || (t[m] = []), t[m].push(_);
      }
    }
    return t;
  }
  _domainIcon(t, e = "on", a) {
    const r = ae;
    if (t in r) {
      const i = r[t];
      if (typeof i == "string") return i;
      if (a && i[a]) {
        const s = i[a];
        return typeof s == "string" ? s : s[e === "off" ? "off" : "on"] || s.on;
      }
      return i[e === "off" ? "off" : "on"] || i.on;
    }
    return si;
  }
  _handleTabSelected(t) {
    t.detail.name && (this._activeTab = t.detail.name);
  }
  render() {
    var r, i;
    if (!this.hass || !this._config)
      return f`<div>Loading...</div>`;
    const t = this._schema(
      this._activeTab,
      this._config.filter ?? "",
      this._config.label_filter ?? !1,
      this._config.multiple_areas ?? !1,
      this._config.multiple_floors ?? !1,
      this._config.badge_mode ?? !1
    ), a = {
      content: this.possibleToggleDomains,
      ...this._config
    };
    return this._subElementEditorDomain ? this._renderSubElementEditorDomain() : this._subElementEditorEntity ? this._renderSubElementEditorEntity() : f`
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

      ${this._activeTab === "style" ? f`
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
        .data=${a}
        .schema=${t}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      ${this._activeTab === "config" ? f`
            <ha-expansion-panel outlined class="main">
              <div slot="header" role="heading" aria-level="3">
                <ha-svg-icon
                  class="secondary"
                  .path=${pa}
                ></ha-svg-icon>
                ${this.hass.localize(
      "ui.panel.lovelace.editor.card.entities.name"
    ) ?? "Entities"}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${a}
                  .schema=${this._entitiesSchema(
      ((r = this._config) == null ? void 0 : r.hide_filter) ?? ""
    )}
                  .computeLabel=${this.computeLabel}
                  @value-changed=${this._valueChanged}
                ></ha-form>

                ${(((i = this._config) == null ? void 0 : i.hide_filter) ?? "") === "entity" ? f`
                      ${this._groupAllEntitiesByDomain().map(
      (s) => f`
                          <ha-expansion-panel outlined class="domain-panel">
                            <div slot="header" class="domain-header">
                              <ha-svg-icon
                                .path=${this._domainIcon(s.domain, "on")}
                              ></ha-svg-icon>
                              <span class="domain-title"
                                >${this._domainLabel(s.domain)}</span
                              >
                            </div>
                            <div class="content">
                              ${["binary_sensor", "cover"].includes(
        s.domain
      ) ? this._groupByDeviceClass(
        s.domain,
        s.entities
      ).map(
        (n) => f`
                                      <ha-expansion-panel
                                        outlined
                                        class="domain-panel"
                                      >
                                        <div slot="header" class="dc-header">
                                          <ha-svg-icon
                                            .path=${this._domainIcon(
          s.domain,
          "on",
          n.deviceClass
        )}
                                          ></ha-svg-icon>
                                          <span class="dc-title"
                                            >${n.label}</span
                                          >
                                        </div>
                                        <div class="content">
                                          ${n.entities.map(
          (o) => {
            var l, c;
            return f`
                                              <div class="entity-row">
                                                <span class="entity-name">
                                                  ${((c = (l = this.hass.states[o]) == null ? void 0 : l.attributes) == null ? void 0 : c.friendly_name) || o}
                                                </span>
                                                <ha-icon-button
                                                  .path=${this._isHiddenEntity(
              o
            ) ? Jt : qt}
                                                  .label=${this._isHiddenEntity(
              o
            ) ? this.hass.localize(
              "ui.common.show"
            ) ?? "Show" : this.hass.localize(
              "ui.common.hide"
            ) ?? "Hide"}
                                                  @click=${() => this._toggleEntityHidden(
              o
            )}
                                                ></ha-icon-button>
                                              </div>
                                            `;
          }
        )}
                                        </div>
                                      </ha-expansion-panel>
                                    `
      ) : s.entities.map(
        (n) => {
          var o, l;
          return f`
                                      <div class="entity-row">
                                        <span class="entity-name">
                                          ${((l = (o = this.hass.states[n]) == null ? void 0 : o.attributes) == null ? void 0 : l.friendly_name) || n}
                                        </span>
                                        <ha-icon-button
                                          .path=${this._isHiddenEntity(n) ? Jt : qt}
                                          .label=${this._isHiddenEntity(n) ? this.hass.localize(
            "ui.common.show"
          ) ?? "Show" : this.hass.localize(
            "ui.common.hide"
          ) ?? "Hide"}
                                          @click=${() => this._toggleEntityHidden(n)}
                                        ></ha-icon-button>
                                      </div>
                                    `;
        }
      )}
                            </div>
                          </ha-expansion-panel>
                        `
    )}
                    ` : f``}
              </div>
            </ha-expansion-panel>

            <ha-expansion-panel outlined class="main">
              <div slot="header" role="heading" aria-level="3">
                <ha-svg-icon
                  class="secondary"
                  .path=${ei}
                ></ha-svg-icon>
                Smart Groups
              </div>
              <div class="content">
                ${this.rulesets.map(
      (s, n) => f`
                    <ha-expansion-panel class="group-panel main" outlined>
                      <div slot="header" class="group-header">
                        ${s.group_id ? s.group_id : `${this.hass.localize(
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
                          .data=${this._groupFormData(s)}
                          .schema=${this.getGroupSchema(s)}
                          .computeLabel=${this.computeLabel}
                          @value-changed=${(o) => this._groupValueChanged(o, n)}
                          @focusout=${() => this._groupFormBlur(n)}
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
                  .path=${pa}
                ></ha-svg-icon>
                ${this.computeLabel({ name: "edit_domains_dc" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${a}
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
    return Ae`
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
      ha-form {
        display: block;
      }
      ha-selector {
        width: 100%;
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
ie([
  z({ attribute: !1 })
], q.prototype, "hass", 2);
ie([
  z({ attribute: !1 })
], q.prototype, "lovelace", 2);
ie([
  z({ type: Object })
], q.prototype, "_config", 2);
ie([
  A()
], q.prototype, "_subElementEditorDomain", 2);
ie([
  A()
], q.prototype, "_subElementEditorEntity", 2);
ie([
  A()
], q.prototype, "rulesets", 2);
ie([
  A()
], q.prototype, "_activeTab", 2);
q = ie([
  Te("status-card-editor")
], q);
console.info(
  `%c STATUS-CARD %c ${Ua.version} `,
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
