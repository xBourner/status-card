/*! For license information please see status-card.js.LICENSE.txt */
(()=>{"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;class n{constructor(e,t,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=o.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&o.set(i,e))}return e}toString(){return this.cssText}}const s=(e,...t)=>{const o=1===e.length?e[0]:t.reduce(((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1]),e[0]);return new n(o,e,i)},a=(i,o)=>{if(t)i.adoptedStyleSheets=o.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const t of o){const o=document.createElement("style"),n=e.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=t.cssText,i.appendChild(o)}},r=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:u,getOwnPropertySymbols:h,getPrototypeOf:m}=Object,p=globalThis,_=p.trustedTypes,f=_?_.emptyScript:"",g=p.reactiveElementPolyfillSupport,v=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!l(e,t),$={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;class w extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&c(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:n}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get(){return o?.call(this)},set(t){const s=o?.call(this);n.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...u(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return a(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EC(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=i.getPropertyOptions(o),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=o,this[o]=n.fromAttribute(t,e.type),this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){if(i??=this.constructor.getPropertyOptions(e),!(i.hasChanged??b)(this[e],t))return;this.P(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(e,t,i){this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$Em!==e&&(this._$Ej??=new Set).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e)!0!==i.wrapped||this._$AL.has(t)||void 0===this[t]||this.P(t,this[t],i)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((e=>e.hostUpdate?.())),this.update(t)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&=this._$Ej.forEach((e=>this._$EC(e,this[e]))),this._$EU()}updated(e){}firstUpdated(e){}}w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,g?.({ReactiveElement:w}),(p.reactiveElementVersions??=[]).push("2.0.4");const A=globalThis,C=A.trustedTypes,x=C?C.createPolicy("lit-html",{createHTML:e=>e}):void 0,z="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+E,k=`<${S}>`,O=document,D=()=>O.createComment(""),L=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,j=e=>T(e)||"function"==typeof e?.[Symbol.iterator],H="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,B=/>/g,I=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,N=/"/g,U=/^(?:script|style|textarea|title)$/i,F=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),V=F(1),q=(F(2),F(3),Symbol.for("lit-noChange")),W=Symbol.for("lit-nothing"),G=new WeakMap,K=O.createTreeWalker(O,129);function Z(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,o=[];let n,s=2===t?"<svg>":3===t?"<math>":"",a=P;for(let t=0;t<i;t++){const i=e[t];let r,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===P?"!--"===l[1]?a=M:void 0!==l[1]?a=B:void 0!==l[2]?(U.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=I):void 0!==l[3]&&(a=I):a===I?">"===l[0]?(a=n??P,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?I:'"'===l[3]?N:R):a===N||a===R?a=I:a===M||a===B?a=P:(a=I,n=void 0);const u=a===I&&e[t+1].startsWith("/>")?" ":"";s+=a===P?i+k:c>=0?(o.push(r),i.slice(0,c)+z+i.slice(c)+E+u):i+E+(-2===c?t:u)}return[Z(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class X{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let n=0,s=0;const a=e.length-1,r=this.parts,[l,c]=J(e,t);if(this.el=X.createElement(l,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=K.nextNode())&&r.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(z)){const t=c[s++],i=o.getAttribute(e).split(E),a=/([.?@])?(.*)/.exec(t);r.push({type:1,index:n,name:a[2],strings:i,ctor:"."===a[1]?ie:"?"===a[1]?oe:"@"===a[1]?ne:te}),o.removeAttribute(e)}else e.startsWith(E)&&(r.push({type:6,index:n}),o.removeAttribute(e));if(U.test(o.tagName)){const e=o.textContent.split(E),t=e.length-1;if(t>0){o.textContent=C?C.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],D()),K.nextNode(),r.push({type:2,index:++n});o.append(e[t],D())}}}else if(8===o.nodeType)if(o.data===S)r.push({type:2,index:n});else{let e=-1;for(;-1!==(e=o.data.indexOf(E,e+1));)r.push({type:7,index:n}),e+=E.length-1}n++}}static createElement(e,t){const i=O.createElement("template");return i.innerHTML=e,i}}function Y(e,t,i=e,o){if(t===q)return t;let n=void 0!==o?i._$Co?.[o]:i._$Cl;const s=L(t)?void 0:t._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(e),n._$AT(e,i,o)),void 0!==o?(i._$Co??=[])[o]=n:i._$Cl=n),void 0!==n&&(t=Y(e,n._$AS(e,t.values),n,o)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??O).importNode(t,!0);K.currentNode=o;let n=K.nextNode(),s=0,a=0,r=i[0];for(;void 0!==r;){if(s===r.index){let t;2===r.type?t=new ee(n,n.nextSibling,this,e):1===r.type?t=new r.ctor(n,r.name,r.strings,this,e):6===r.type&&(t=new se(n,this,e)),this._$AV.push(t),r=i[++a]}s!==r?.index&&(n=K.nextNode(),s++)}return K.currentNode=O,o}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),L(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):j(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new Q(o,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new X(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const n of e)o===t.length?t.push(i=new ee(this.O(D()),this.O(D()),this,this.options)):i=t[o],i._$AI(n),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,o){const n=this.strings;let s=!1;if(void 0===n)e=Y(this,e,t,0),s=!L(e)||e!==this._$AH&&e!==q,s&&(this._$AH=e);else{const o=e;let a,r;for(e=n[0],a=0;a<n.length-1;a++)r=Y(this,o[i+a],t,a),r===q&&(r=this._$AH[a]),s||=!L(r)||r!==this._$AH[a],r===W?e=W:e!==W&&(e+=(r??"")+n[a+1]),this._$AH[a]=r}s&&!o&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class oe extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class ne extends te{constructor(e,t,i,o,n){super(e,t,i,o,n),this.type=5}_$AI(e,t=this){if((e=Y(this,e,t,0)??W)===q)return;const i=this._$AH,o=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==W&&(i===W||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}}const ae={M:z,P:E,A:S,C:1,L:J,R:Q,D:j,V:Y,I:ee,H:te,N:oe,U:ne,B:ie,F:se},re=A.litHtmlPolyfillSupport;re?.(X,ee),(A.litHtmlVersions??=[]).push("3.2.1");class le extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const o=i?.renderBefore??t;let n=o._$litPart$;if(void 0===n){const e=i?.renderBefore??null;o._$litPart$=n=new ee(t.insertBefore(D(),e),e,void 0,i??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}le._$litElement$=!0,le.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:le});const ce=globalThis.litElementPolyfillSupport;ce?.({LitElement:le}),(globalThis.litElementVersions??=[]).push("4.1.1");const de=e=>(t,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)},ue={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},he=(e=ue,t,i)=>{const{kind:o,metadata:n}=i;let s=globalThis.litPropertyMetadata.get(n);if(void 0===s&&globalThis.litPropertyMetadata.set(n,s=new Map),s.set(i.name,e),"accessor"===o){const{name:o}=i;return{set(i){const n=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,n,e)},init(t){return void 0!==t&&this.P(o,void 0,e),t}}}if("setter"===o){const{name:o}=i;return function(i){const n=this[o];t.call(this,i),this.requestUpdate(o,n,e)}}throw Error("Unsupported decorator location: "+o)};function me(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const o=t.hasOwnProperty(i);return t.constructor.createProperty(i,o?{...e,wrapped:!0}:e),o?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function pe(e){return me({...e,state:!0,attribute:!1})}const _e=e=>(...t)=>({_$litDirective$:e,values:t});class fe{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const{I:ge}=ae,ve=()=>document.createComment(""),ye=(e,t,i)=>{const o=e._$AA.parentNode,n=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=o.insertBefore(ve(),n),s=o.insertBefore(ve(),n);i=new ge(t,s,e,e.options)}else{const t=i._$AB.nextSibling,s=i._$AM,a=s!==e;if(a){let t;i._$AQ?.(e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==s._$AU&&i._$AP(t)}if(t!==n||a){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;o.insertBefore(e,n),e=t}}}return i},be=(e,t,i=e)=>(e._$AI(t,i),e),$e={},we=e=>{e._$AP?.(!1,!0);let t=e._$AA;const i=e._$AB.nextSibling;for(;t!==i;){const e=t.nextSibling;t.remove(),t=e}},Ae=(e,t,i)=>{const o=new Map;for(let n=t;n<=i;n++)o.set(e[n],n);return o},Ce=_e(class extends fe{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let o;void 0===i?i=t:void 0!==t&&(o=t);const n=[],s=[];let a=0;for(const t of e)n[a]=o?o(t,a):a,s[a]=i(t,a),a++;return{values:s,keys:n}}render(e,t,i){return this.dt(e,t,i).values}update(e,[t,i,o]){const n=(e=>e._$AH)(e),{values:s,keys:a}=this.dt(t,i,o);if(!Array.isArray(n))return this.ut=a,s;const r=this.ut??=[],l=[];let c,d,u=0,h=n.length-1,m=0,p=s.length-1;for(;u<=h&&m<=p;)if(null===n[u])u++;else if(null===n[h])h--;else if(r[u]===a[m])l[m]=be(n[u],s[m]),u++,m++;else if(r[h]===a[p])l[p]=be(n[h],s[p]),h--,p--;else if(r[u]===a[p])l[p]=be(n[u],s[p]),ye(e,l[p+1],n[u]),u++,p--;else if(r[h]===a[m])l[m]=be(n[h],s[m]),ye(e,n[u],n[h]),h--,m++;else if(void 0===c&&(c=Ae(a,m,p),d=Ae(r,u,h)),c.has(r[u]))if(c.has(r[h])){const t=d.get(a[m]),i=void 0!==t?n[t]:null;if(null===i){const t=ye(e,n[u]);be(t,s[m]),l[m]=t}else l[m]=be(i,s[m]),ye(e,n[u],i),n[t]=null;m++}else we(n[h]),h--;else we(n[u]),u++;for(;m<=p;){const t=ye(e,l[p+1]);be(t,s[m]),l[m++]=t}for(;u<=h;){const e=n[u++];null!==e&&we(e)}return this.ut=a,((e,t=$e)=>{e._$AH=t})(e,l),q}}),xe=_e(class extends fe{constructor(e){if(super(e),1!==e.type||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){if(void 0===this.st){this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((e=>""!==e))));for(const e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}const i=e.element.classList;for(const e of this.st)e in t||(i.remove(e),this.st.delete(e));for(const e in t){const o=!!t[e];o===this.st.has(e)||this.nt?.has(e)||(o?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return q}}),ze="important",Ee=" !"+ze,Se=_e(class extends fe{constructor(e){if(super(e),1!==e.type||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,i)=>{const o=e[i];return null==o?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`}),"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(t)),this.render(t);for(const e of this.ft)null==t[e]&&(this.ft.delete(e),e.includes("-")?i.removeProperty(e):i[e]=null);for(const e in t){const o=t[e];if(null!=o){this.ft.add(e);const t="string"==typeof o&&o.endsWith(Ee);e.includes("-")||t?i.setProperty(e,t?o.slice(0,-11):o,t?ze:""):i[e]=o}}return q}});var ke,Oe,De,Le=Number.isNaN||function(e){return"number"==typeof e&&e!=e};function Te(e,t){if(e.length!==t.length)return!1;for(var i=0;i<e.length;i++)if(!((o=e[i])===(n=t[i])||Le(o)&&Le(n)))return!1;var o,n;return!0}function je(e,t){void 0===t&&(t=Te);var i=null;function o(){for(var o=[],n=0;n<arguments.length;n++)o[n]=arguments[n];if(i&&i.lastThis===this&&t(o,i.lastArgs))return i.lastResult;var s=e.apply(this,o);return i={lastResult:s,lastArgs:o,lastThis:this},s}return o.clear=function(){i=null},o}function He(e){return e.substr(0,e.indexOf("."))}(De=ke||(ke={})).language="language",De.system="system",De.comma_decimal="comma_decimal",De.decimal_comma="decimal_comma",De.space_comma="space_comma",De.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(Oe||(Oe={}));const Pe=(e,t)=>{const i={maximumFractionDigits:2,...t};if("string"!=typeof e)return i;if(!t||!t.minimumFractionDigits&&!t.maximumFractionDigits){const t=e.indexOf(".")>-1?e.split(".")[1].length:0;i.minimumFractionDigits=t,i.maximumFractionDigits=t}return i},Me=["closed","locked","off"],Be=(new Set(["fan","input_boolean","light","switch","group","automation"]),(e,t,i,o)=>{o=o||{},i=null==i?{}:i;const n=new Event(t,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return n.detail=i,e.dispatchEvent(n),n});new Set(["call-service","divider","section","weblink","cast","select"]);const Ie=e=>{Be(window,"haptic",e)},Re=(e,t,i,o)=>{let n;"double_tap"===o&&i.double_tap_action?n=i.double_tap_action:"hold"===o&&i.hold_action?n=i.hold_action:"tap"===o&&i.tap_action&&(n=i.tap_action),((e,t,i,o)=>{if(o||(o={action:"more-info"}),!o.confirmation||o.confirmation.exemptions&&o.confirmation.exemptions.some((e=>e.user===t.user.id))||(Ie("warning"),confirm(o.confirmation.text||`Are you sure you want to ${o.action}?`)))switch(o.action){case"more-info":(i.entity||i.camera_image)&&Be(e,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":o.navigation_path&&((e,t,i=!1)=>{i?history.replaceState(null,"",t):history.pushState(null,"",t),Be(window,"location-changed",{replace:i})})(0,o.navigation_path);break;case"url":o.url_path&&window.open(o.url_path);break;case"toggle":i.entity&&(((e,t)=>{((e,t,i=!0)=>{const o=He(t),n="group"===o?"homeassistant":o;let s;switch(o){case"lock":s=i?"unlock":"lock";break;case"cover":s=i?"open_cover":"close_cover";break;default:s=i?"turn_on":"turn_off"}e.callService(n,s,{entity_id:t})})(e,t,Me.includes(e.states[t].state))})(t,i.entity),Ie("success"));break;case"perform-action":{if(!o.perform_action)return void Ie("failure");const[e,i]=o.perform_action.split(".",2);t.callService(e,i,o.data,o.target),Ie("success");break}case"call-service":{if(!o.service)return void Ie("failure");const[e,i]=o.service.split(".",2);t.callService(e,i,o.data,o.target),Ie("success");break}case"fire-dom-event":Be(e,"ll-custom",o)}})(e,t,i,n)};function Ne(e){return void 0!==e&&"none"!==e.action}function Ue(e,t){let i=[];return Array.isArray(t.filters)?i=t.filters:["area","floor","label","domain","entity_id","state","name","attributes","device","integration","entity_category","hidden_by","device_manufacturer","device_model","last_changed","last_updated","last_triggered","level","group"].forEach((e=>{void 0!==t[e]&&i.push({key:e,value:t[e]})})),Object.values(e.hass.states).filter((t=>!e.hiddenEntities.includes(t.entity_id)&&(!i.length||i.every((i=>function(e,t,i,o){var n,s,a,r,l,c,d,u,h;const m=null===(n=o.entities)||void 0===n?void 0:n.find((e=>e.entity_id===t.entity_id));switch(i.key){case"area":{let e=null==m?void 0:m.area_id;if(!e&&(null==m?void 0:m.device_id)){const t=null===(s=o.devices)||void 0===s?void 0:s.find((e=>e.id===m.device_id));e=null==t?void 0:t.area_id}return Ve(e,i.value)}case"domain":return Ve(He(t.entity_id),i.value);case"entity_id":return Ve(t.entity_id,i.value);case"state":return Ve(t.state,i.value);case"name":return Ve(null!==(a=t.attributes.friendly_name)&&void 0!==a?a:"",i.value);case"attributes":return!(!i.value||"object"!=typeof i.value)&&Object.entries(i.value).every((([e,i])=>{const o=e.split(":");let n=t.attributes;for(const e of o)if(n=null==n?void 0:n[e],void 0===n)break;return void 0!==n&&Ve(n,i)}));case"device":return Ve(null==m?void 0:m.device_id,i.value);case"integration":return!!m&&(Ve(m.platform,i.value)||Ve(m.config_entry_id,i.value));case"entity_category":return Ve(null==m?void 0:m.entity_category,i.value);case"label":{const e=o.labels,t=t=>{if(Ve(t,i.value))return!0;if(e){const o=e.find((e=>e.label_id===t));if(o&&Ve(o.name,i.value))return!0}return!1};if((null==m?void 0:m.labels)&&m.labels.some(t))return!0;if(null==m?void 0:m.device_id){const e=null===(r=o.devices)||void 0===r?void 0:r.find((e=>e.id===m.device_id));if((null==e?void 0:e.labels)&&e.labels.some(t))return!0}return!1}case"floor":{let e=null==m?void 0:m.area_id;if(!e&&(null==m?void 0:m.device_id)){const t=null===(l=o.devices)||void 0===l?void 0:l.find((e=>e.id===m.device_id));e=null==t?void 0:t.area_id}if(!e)return!1;const t=null===(c=o.areas)||void 0===c?void 0:c.find((t=>t.area_id===e));return Ve(null==t?void 0:t.floor_id,i.value)}case"hidden_by":return Ve(null==m?void 0:m.hidden_by,i.value);case"device_manufacturer":if(null==m?void 0:m.device_id){const e=null===(d=o.devices)||void 0===d?void 0:d.find((e=>e.id===m.device_id));return Ve(null==e?void 0:e.manufacturer,i.value)}return!1;case"device_model":if(null==m?void 0:m.device_id){const e=null===(u=o.devices)||void 0===u?void 0:u.find((e=>e.id===m.device_id));return Ve(null==e?void 0:e.model,i.value)}return!1;case"last_changed":return"string"==typeof i.value&&/^[<>]=?\s*\d+$/.test(i.value)?Fe(t.last_changed,i.value):Ve(t.last_changed,i.value);case"last_updated":return"string"==typeof i.value&&/^[<>]=?\s*\d+$/.test(i.value)?Fe(t.last_updated,i.value):Ve(t.last_updated,i.value);case"last_triggered":return"string"==typeof i.value&&/^[<>]=?\s*\d+$/.test(i.value)?Fe(t.attributes.last_triggered,i.value):Ve(t.attributes.last_triggered,i.value);case"group":{const o=e.hass.states[i.value];return!(!o||!Array.isArray(null===(h=o.attributes)||void 0===h?void 0:h.entity_id))&&o.attributes.entity_id.includes(t.entity_id)}default:return!0}}(e,t,i,{areas:e.areas,devices:e.devices,entities:e.entities}))))))}function Fe(e,t){if(!e)return!1;const i=t.match(/^([<>]=?)?\s*(\d+)$/);if(!i)return!1;const[,o,n]=i,s=parseInt(n,10),a=new Date,r=new Date(e),l=(a.getTime()-r.getTime())/6e4;switch(o){case">":return l>s;case">=":return l>=s;case"<":return l<s;case"<=":return l<=s;default:return Math.round(l)===s}}function Ve(e,t){if(Array.isArray(t))return t.some((t=>Ve(e,t)));if("string"==typeof t&&t.startsWith("!"))return!Ve(e,t.slice(1));if("string"==typeof t&&/^([<>]=?)\s*(-?\d+(\.\d+)?)([mhd])$/.test(t)){const[,i,o,,n]=t.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)([mhd])$/)||[],s=parseFloat(o),a=Date.now(),r=new Date(e).getTime();if(isNaN(r))return!1;let l=(a-r)/6e4;switch("h"===n&&(l/=60),"d"===n&&(l/=1440),i){case">":return l>s;case">=":return l>=s;case"<":return l<s;case"<=":return l<=s}}if("string"==typeof t&&/^([<>]=?)\s*(-?\d+(\.\d+)?)$/.test(t)){const[,i,o]=t.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)$/)||[],n=parseFloat(o),s=parseFloat(e);switch(i){case">":return s>n;case">=":return s>=n;case"<":return s<n;case"<=":return s<=n}}if("string"==typeof t&&t.includes("*")){const i="^"+t.split("*").map((e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"))).join(".*")+"$";return new RegExp(i,"i").test(String(e))}if("string"==typeof t&&t.length>2&&t.startsWith("/")&&t.endsWith("/"))try{return new RegExp(t.slice(1,-1),"i").test(String(e))}catch(e){return!1}return e===t}je((e=>new Intl.Collator(e)));const qe=je((e=>new Intl.Collator(e,{sensitivity:"accent"})));function We(e,t,i){const o=new CustomEvent(t,{bubbles:!1,composed:!1,detail:i});e.dispatchEvent(o)}class Ge extends HTMLElement{constructor(){super(...arguments),this.holdTime=500,this.held=!1,this.cancelled=!1}connectedCallback(){["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach((e=>{document.addEventListener(e,(()=>{this.cancelled=!0,this.timer&&(clearTimeout(this.timer),this.timer=void 0)}),{passive:!0})}))}bind(e,t={}){e.actionHandler&&Ze(t,e.actionHandler.options)||(e.actionHandler&&(e.removeEventListener("touchstart",e.actionHandler.start),e.removeEventListener("touchend",e.actionHandler.end),e.removeEventListener("touchcancel",e.actionHandler.end),e.removeEventListener("mousedown",e.actionHandler.start),e.removeEventListener("click",e.actionHandler.end),e.removeEventListener("keydown",e.actionHandler.handleKeyDown)),e.actionHandler={options:t},t.disabled||(e.actionHandler.start=e=>{let i,o;this.cancelled=!1,e.touches?(i=e.touches[0].clientX,o=e.touches[0].clientY):(i=e.clientX,o=e.clientY),t.hasHold&&(this.held=!1,this.timer=window.setTimeout((()=>{this.held=!0}),this.holdTime))},e.actionHandler.end=e=>{if(e.currentTarget!==e.target)return;if("touchcancel"===e.type||"touchend"===e.type&&this.cancelled)return;const i=e.target;e.cancelable&&e.preventDefault(),t.hasHold&&(clearTimeout(this.timer),this.timer=void 0),t.hasHold&&this.held?We(i,"action",{action:"hold"}):t.hasDoubleClick?"click"===e.type&&e.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout((()=>{this.dblClickTimeout=void 0,We(i,"action",{action:"tap"})}),250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,We(i,"action",{action:"double_tap"})):We(i,"action",{action:"tap"})},e.actionHandler.handleKeyDown=e=>{["Enter"," "].includes(e.key)&&e.currentTarget.actionHandler.end(e)},e.addEventListener("touchstart",e.actionHandler.start,{passive:!0}),e.addEventListener("touchend",e.actionHandler.end),e.addEventListener("touchcancel",e.actionHandler.end),e.addEventListener("mousedown",e.actionHandler.start,{passive:!0}),e.addEventListener("click",e.actionHandler.end),e.addEventListener("keydown",e.actionHandler.handleKeyDown)))}}customElements.define("action-handler-status-card",Ge);const Ke=_e(class extends fe{update(e,[t]){return((e,t)=>{const i=(()=>{const e=document.body;if(e.querySelector("action-handler-status-card"))return e.querySelector("action-handler-status-card");const t=document.createElement("action-handler-status-card");return e.appendChild(t),t})();i&&i.bind(e,t)})(e.element,t),q}render(e){}}),Ze=(e,t)=>{if(e===t)return!0;if(e&&t&&"object"==typeof e&&"object"==typeof t){if(e.constructor!==t.constructor)return!1;let i,o;if(Array.isArray(e)){if(o=e.length,o!==t.length)return!1;for(i=o;0!=i--;)if(!Ze(e[i],t[i]))return!1;return!0}if(e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(i of e.entries())if(!t.has(i[0]))return!1;for(i of e.entries())if(!Ze(i[1],t.get(i[0])))return!1;return!0}if(e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(i of e.entries())if(!t.has(i[0]))return!1;return!0}if(ArrayBuffer.isView(e)&&ArrayBuffer.isView(t)){if(o=e.length,o!==t.length)return!1;for(i=o;0!=i--;)if(e[i]!==t[i])return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();const n=Object.keys(e);if(o=n.length,o!==Object.keys(t).length)return!1;for(i=o;0!=i--;)if(!Object.prototype.hasOwnProperty.call(t,n[i]))return!1;for(i=o;0!=i--;){const o=n[i];if(!Ze(e[o],t[o]))return!1}return!0}return e!=e&&t!=t},Je=e=>e.stopPropagation();function Xe(e){return e.split("_").map((e=>e.charAt(0).toUpperCase()+e.slice(1))).join(" ")}const Ye=["closed","locked","off","docked","idle","standby","paused","auto","not_home","disarmed","0"];var Qe="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";function et(){var e,t,i;this.selectedDomain=null,this.selectedDeviceClass=null,this.selectedGroup=null;const o=null===(e=document.querySelector("home-assistant"))||void 0===e?void 0:e.shadowRoot,n=null==o?void 0:o.querySelector("ha-dialog");n&&(null==o?void 0:o.contains(n))&&o.removeChild(n);const s=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("sl-tab-group");s&&(s.activeIndex=-1),((null===(i=this.shadowRoot)||void 0===i?void 0:i.querySelectorAll("sl-tab"))||[]).forEach((e=>{e.setAttribute("aria-selected","false"),e.removeAttribute("active")}))}function tt(e,t){const i=e.entities.find((e=>e.entity_id===t.entity_id));if(i){if(i.area_id)return i.area_id;if(i.device_id){const t=e.devices.find((e=>e.id===i.device_id));if(t&&t.area_id)return t.area_id}}return"unassigned"}function it(e){var t;e.stopPropagation(),(t=e.currentTarget.card)._confirmParams={domain:t.selectedDomain,deviceClass:t.selectedDeviceClass},t._confirmOpen=!0}function ot(e){var t;e.stopPropagation(),(t=e.currentTarget.card)._showAll=!t._showAll}const nt={alarm_control_panel:{state_content:["state","last_changed"],features:[{type:"alarm-modes",modes:["armed_home","armed_away","armed_night","armed_vacation","armed_custom_bypass","disarmed"]}]},light:{state_content:["state","brightness","last_changed"],features:[{type:"light-brightness"}]},cover:{state_content:["state","position","last_changed"],features:[{type:"cover-open-close"},{type:"cover-position"}]},vacuum:{state_content:["state","last_changed"],features:[{type:"vacuum-commands",commands:["start_pause","stop","clean_spot","locate","return_home"]}]},climate:{state_content:["state","current_temperature","last_changed"],features:[{type:"climate-hvac-modes",hvac_modes:["auto","heat_cool","heat","cool","dry","fan_only","off"]}]},water_heater:{state_content:["state","last_changed"],features:[{type:"water-heater-operation-modes",operation_modes:["electric","gas","heat_pump","eco","performance","high_demand","off"]}]},humidifier:{state_content:["state","current_humidity","last_changed"],features:[{type:"target-humidity"}]},media_player:{show_entity_picture:!0,state_content:["state","volume_level","last_changed"],features:[{type:"media-player-volume-slider"}]},lock:{state_content:["state","last_changed"],features:[{type:"lock-commands"}]},fan:{state_content:["state","percentage","last_changed"],features:[{type:"fan-speed"}]},counter:{state_content:["state","last_changed"],features:[{type:"counter-actions",actions:["increment","decrement","reset"]}]},lawn_mower:{state_content:["state","last_changed"],features:[{type:"lawn-mower-commands",commands:["start_pause","dock"]}]},update:{state_content:["state","latest_version","last_changed"],features:[{type:"update-actions",backup:"ask"}]},switch:{state_content:["state","last_changed"],features:[{type:"toggle"}]},input_boolean:{state_content:["state","last_changed"],features:[{type:"toggle"}]},calendar:{state_content:"message"},timer:{state_content:["state","remaining_time"]},binary_sensor:{state_content:["state","last_changed"]},device_tracker:{state_content:["state","last_changed"]},remote:{state_content:["state","last_changed"]}},st=je(((e,t,i,o,n)=>{const s=new Map;for(const t of e){const e=tt(n,t);s.has(e)||s.set(e,[]),s.get(e).push(t)}const a=Array.from(s.entries()).sort((([e],[i])=>{const o=null==t?void 0:t.find((t=>t.area_id===e)),n=null==t?void 0:t.find((e=>e.area_id===i)),s=o?o.name.toLowerCase():"unassigned"===e?"Unassigned":e,a=n?n.name.toLowerCase():"unassigned"===i?"Unassigned":i;return s.localeCompare(a)}));return a.map((([e,t])=>[e,o(t)]))}));const at="\n        ha-dialog {\n       --dialog-content-padding: 12px;\n      }\n      .area-group { padding: 0 5px;}\n      .dialog-header { display: flex;  justify-content: flex-start; align-items: center; gap: 8px; margin-bottom: 12px;} \n      .dialog-header ha-icon-button { margin-right: 10px;  }\n      ha-dialog#more-info-dialog { --mdc-dialog-max-width: 96vw; --mdc-dialog-min-width: 96vw; }\n      .entity-list { list-style: none;  display: flex; flex-direction: column; }\n      ul { margin: 0; padding: 5px;  };\n      .entity-card { flex-basis: 100%; max-width: 100%; }\n      .entity-cards { display: flex; flex-direction: column; gap: 4px; }\n      ha-icon { display: flex; }\n      h4 { font-size: 1.2em; margin: 0.6em 0.2em;} \n      .menu-button { position: absolute; right: 4px; left: auto; }\n  }\n",rt="\n        ha-dialog {\n       --dialog-content-padding: 12px;\n      }\n      .area-group { padding: 0 15px;}\n      .dialog-header { display: flex;  justify-content: flex-start; align-items: center; gap: 8px; margin-bottom: 12px; min-width: 15vw; } \n      .dialog-header ha-icon-button { margin-right: 10px;  }\n      ha-dialog#more-info-dialog { --mdc-dialog-max-width: none; --mdc-min-width: 15vw; width: auto; }\n      .entity-card { width: 22.5vw ;  box-sizing: border-box; }\n      .entity-list .entity-item { list-style: none;  display: flex; flex-direction: column; }\n      ul { margin: 0; padding: 5px;  }\n      ha-icon { display: flex; }\n      h4 { font-size: 1.2em; margin: 0.8em 0.2em;} \n      .menu-button { position: absolute; right: 4px; left: auto; }\n            .cards-wrapper {\n        display: flex;\n        justify-content: center;          \n        box-sizing: border-box;\n      }\n      .entity-cards {\n        display: grid;\n        grid-template-columns: repeat(var(--columns), 22.5vw);\n        gap: 4px;\n      }\n",lt=["alarm_control_panel","siren","lock","light","media_player","climate","Switch - switch","Switch - outlet","vacuum","fan","humidifier","lawn_mower","valve","water_heater","remote","Cover - door","Cover - window","Cover - garage","Cover - gate","Cover - blind","Cover - curtain","Cover - damper","Cover - awning","Cover - shade","Cover - shutter","Binary Sensor - door","Binary Sensor - window","Binary Sensor - lock","Binary Sensor - motion","Binary Sensor - presence","Binary Sensor - occupancy","Binary Sensor - vibration","Binary Sensor - plug","Binary Sensor - power","Binary Sensor - battery","Binary Sensor - battery_charging","Binary Sensor - moving","Binary Sensor - running","Binary Sensor - gas","Binary Sensor - carbon_monoxide","Binary Sensor - cold","Binary Sensor - heat","Binary Sensor - moisture","Binary Sensor - connectivity","Binary Sensor - opening","Binary Sensor - garage_door","Binary Sensor - light","Binary Sensor - problem","Binary Sensor - safety","Binary Sensor - smoke","Binary Sensor - sound","Binary Sensor - tamper","Binary Sensor - update","update","device_tracker","input_boolean","timer","counter","calendar"],ct=["alarm_control_panel","siren","lock","light","media_player","climate","switch","vacuum","fan","cover","binary_sensor","humidifier","lawn_mower","valve","water_heater","remote","update","device_tracker","input_boolean","timer","counter","calendar"],dt={binary_sensor:["door","window","lock","motion","presence","occupancy","plug","power","battery","battery_charging","moving","running","gas","carbon_monoxide","vibration","cold","heat","moisture","connectivity","opening","garage_door","light","problem","safety","smoke","sound","tamper","update"],cover:["door","window","garage","gate","blind","curtain","damper","awning","shade","shutter"],switch:["switch","outlet"]};class ut{static setEntitiesByDomain(e){this._entitiesByDomain=e}static getEntitiesByDomain(){return this._entitiesByDomain}static getAllEntities(){return Object.values(this._entitiesByDomain).flat()}}function ht(e,t,i){return e.localize(`component.${i}.entity_component._.state.${t}`)||t}function mt(e,t,i,o){if(/^key_\d+$/.test(t.name))return e.localize("ui.components.related-filter-menu.filter")||"Filter";switch(t.name){case"header":return i&&o?"switch"===i&&"switch"===o?`${e.localize("ui.panel.lovelace.editor.card.entities.name")} in ${e.localize("component.switch.entity_component._.name")}`:`${e.localize("ui.panel.lovelace.editor.card.entities.name")} in ${e.localize(`ui.dialogs.entity_registry.editor.device_classes.${i}.${o}`)}`:i?`${e.localize("ui.panel.lovelace.editor.card.entities.name")} in ${e.localize(`component.${i}.entity_component._.name`)}`:e.localize("ui.panel.lovelace.editor.card.entities.name");case"square":return e.localize("ui.panel.lovelace.editor.card.grid.square");case"hide_person_name":return e.localize("ui.common.hide")+" "+e.localize("component.person.entity_component._.name")+" "+e.localize("ui.common.name");case"hide_content_name":return e.localize("ui.common.hide")+" "+e.localize("ui.panel.lovelace.editor.card.markdown.content")+" "+e.localize("ui.common.name");case"hide_person":return e.localize("ui.common.hide")+" "+e.localize("component.person.entity_component._.name");case"list_mode":return e.localize("ui.card.common.turn_on")+" "+e.localize("ui.components.media-browser.list")+" "+e.localize("ui.dialogs.helper_settings.input_text.mode");case"columns":return e.localize("ui.panel.lovelace.editor.action-editor.actions.more-info")+" "+e.localize("ui.panel.lovelace.editor.card.grid.columns");case"edit_filters":return e.localize("ui.panel.lovelace.editor.common.edit")+" "+e.localize("ui.components.subpage-data-table.filters");case"area":return e.localize("ui.panel.lovelace.editor.card.area.name");case"floor":return e.localize("ui.components.selectors.selector.types.floor");case"label_filter":return e.localize("ui.components.label-picker.label")+" "+e.localize("ui.components.related-filter-menu.filter");case"label":case"hidden_labels":return e.localize("ui.components.label-picker.label");case"entities":return e.localize("ui.panel.lovelace.editor.card.entities.name");case"extra_entities":return"Extra "+e.localize("ui.panel.lovelace.editor.card.entities.name");case"entity":return e.localize("ui.components.selectors.selector.types.entity");case"hide_filter":return e.localize("ui.common.hide")+" "+e.localize("ui.panel.lovelace.editor.card.entities.name");case"edit_domains_dc":return e.localize("ui.panel.lovelace.editor.common.edit")+" "+e.localize("ui.panel.lovelace.editor.card.markdown.content");case"icon":return e.localize("ui.components.selectors.selector.types.icon");case"color":return e.localize("ui.panel.lovelace.editor.card.tile.color");case"background_color":return e.localize("ui.panel.lovelace.editor.card.generic.icon")+" "+e.localize("ui.panel.lovelace.editor.edit_view.tab_background")+" "+e.localize("ui.panel.lovelace.editor.card.tile.color");case"multiple_areas":return"Multi "+e.localize("ui.panel.lovelace.editor.card.area.name");case"multiple_floors":return"Multi "+e.localize("ui.components.selectors.selector.types.floor");case"show_total_number":return e.localize("ui.common.enable")+" "+e.localize("component.sensor.entity_component._.state_attributes.state_class.state.total")+" "+e.localize("component.number.entity_component._.name");case"show_total_entities":return e.localize("ui.common.enable")+" "+e.localize("component.sensor.entity_component._.state_attributes.state_class.state.total")+" "+e.localize("ui.panel.lovelace.editor.card.entities.name");case"appearance":return e.localize("ui.panel.lovelace.editor.card.tile.appearance")||"Appearance";case"tap_action":case"hold_action":case"double_tap_action":return e.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`);case"group_id":return e.localize("component.group.entity_component._.name")+" "+e.localize("ui.common.name");case"group_icon":return e.localize("component.group.entity_component._.name")+" "+e.localize("ui.panel.lovelace.editor.card.generic.icon");case"group_status":return e.localize("component.group.entity_component._.name")+" "+e.localize("ui.components.selectors.selector.types.state")+" ("+e.localize("ui.panel.lovelace.editor.card.config.optional")+")";case"hide":return e.localize("ui.common.hide");case"state":return e.localize("ui.components.entity.entity-state-picker.state");case"invert":case"invert_state":return e.localize("ui.dialogs.entity_registry.editor.invert.label");case"show_entity_picture":return e.localize("ui.panel.lovelace.editor.card.tile.show_entity_picture");case"name":return e.localize("ui.common.name");case"no_scroll":return e.localize("ui.panel.lovelace.editor.edit_view_header.settings.badges_wrap_options.wrap")+" "+e.localize("ui.panel.lovelace.editor.card.generic.content");default:if(ct.includes(t.name))return e.localize(`component.${t.name}.entity_component._.name`)||t.name;for(const[i,o]of Object.entries(dt))if(o.includes(t.name))return e.localize(`ui.dialogs.entity_registry.editor.device_classes.${i}.${t.name}`)||t.name;return e.localize(`ui.panel.lovelace.editor.card.area.${t.name}`)}}ut._entitiesByDomain={};var pt=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let _t=class extends le{constructor(){super(...arguments),this.areas=[],this.devices=[],this.entities=[],this.entitiesByDomain={},this.selectedDomain=null,this.selectedDeviceClass=null,this.hiddenEntities=[],this.hiddenLabels=[],this.hiddenAreas=[],this.hide_person=!1,this.hide_content_name=!0,this.list_mode=!1,this._showAll=!1,this._confirmOpen=!1,this._confirmParams={domain:"",deviceClass:void 0},this._isMobile=!1,this.selectedGroup=null,this._entitiesByDomain=je(((e,t,i,o)=>{const n=this._config.area||null,s=this._config.floor||null,a=this._config.label||null,r=new Map(t.map((e=>[e.id,e]))),l=null!=i?i:[],c=e.filter((e=>{var t,i,o,c;if("update"===He(e.entity_id))return!e.hidden_by&&!e.disabled_by;const d=e.device_id?r.get(e.device_id):null;if(!(null!==e.area_id||d&&null!==d.area_id))return!1;const u=!a||(null===(t=e.labels)||void 0===t?void 0:t.some((e=>a.includes(e))))||null!==(o=null===(i=null==d?void 0:d.labels)||void 0===i?void 0:i.some((e=>a.includes(e))))&&void 0!==o&&o;if(!u)return!1;const h=n?Array.isArray(n)?n:[n]:null,m=s?Array.isArray(s)?s:[s]:null,p=!h||void 0!==e.area_id&&h.includes(e.area_id)||d&&void 0!==d.area_id&&h.includes(d.area_id),_=!m||void 0!==e.area_id&&l.some((t=>t.area_id===e.area_id&&void 0!==t.floor_id&&m.includes(t.floor_id)))||(null==d?void 0:d.area_id)&&l.some((e=>e.area_id===d.area_id&&void 0!==e.floor_id&&m.includes(e.floor_id))),f=!(this.hiddenAreas&&this.hiddenAreas.length>0&&(e.area_id&&this.hiddenAreas.includes(e.area_id)||d&&d.area_id&&this.hiddenAreas.includes(d.area_id)));return!e.hidden_by&&!e.disabled_by&&p&&_&&f&&!(null===(c=e.labels)||void 0===c?void 0:c.some((e=>this.hiddenLabels.includes(e))))&&!this.hiddenEntities.includes(e.entity_id)})).map((e=>e.entity_id)),d={};for(const e of c){const t=He(e);if(!ct.includes(t))continue;const i=o[e];i&&(t in d||(d[t]=[]),d[t].push(i))}return d})),this.computeLabel=je(((e,t,i)=>mt(this.hass,e,t,i))),this._computeExtraItems=je(((e,t)=>{const i=e.content||[];return e.extra_entities?e.extra_entities.reduce(((o,n)=>{var s,a,r;if(!i.includes(n))return o;const l=t[n];if(!l)return o;const c=null===(s=e.customization)||void 0===s?void 0:s.find((e=>e.type===n));if(c&&void 0!==c.state&&void 0!==c.invert_state){const e="true"===c.invert_state,t=l.state===c.state;if(!e&&!t||e&&t)return o}const d=i.indexOf(n),u=d>=0?d:0,h=this.getCustomIcon(n,void 0,l),m=null!==(r=null!==(a=this.getCustomName(n,void 0,l))&&void 0!==a?a:l.attributes.friendly_name)&&void 0!==r?r:n,p=this.getCustomColor(n,void 0),_=this.getCustomCSS(n,void 0),f=this.getBackgroundColor(n,void 0);return o.push({type:"extra",panel:n,entity:l,order:u,icon:h,name:m,color:p,icon_css:_,background_color:f}),o}),[]).sort(((e,t)=>e.order-t.order)):[]})),this._computeGroupItems=je(((e,t)=>e.map(((e,i)=>{const o=t.find((t=>t.group_id===e));if(o)return Object.keys(o).some((e=>"group_id"!==e&&"group_icon"!==e&&void 0!==o[e]&&""!==o[e]))?{type:"group",group_id:e,order:i,ruleset:o}:void 0})).filter((e=>!!e)))),this._computeDomainItems=je((e=>e.reduce(((t,i)=>(i.includes(" - ")||t.push({type:"domain",domain:i,order:e.indexOf(i)}),t)),[]))),this._computeDeviceClassItems=je((e=>e.reduce(((t,i)=>{if(i.includes(" - ")){const[o,n]=i.split(" - ");t.push({type:"deviceClass",domain:o.trim().toLowerCase().replace(/\s+/g,"_"),deviceClass:n.trim().toLowerCase(),order:e.indexOf(i)})}return t}),[]))),this._computeSortedEntities=je(((e,t,i,o)=>[...e,...t,...i,...o].sort(((e,t)=>e.order-t.order))))}firstUpdated(e){this._loadData()}getCardSize(){return 2}getGridOptions(){return{rows:2}}_loadData(){var e,t,i,o,n,s;return function(e,t,i,o){return new(i||(i=Promise))((function(n,s){function a(e){try{l(o.next(e))}catch(e){s(e)}}function r(e){try{l(o.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(a,r)}l((o=o.apply(e,t||[])).next())}))}(this,void 0,void 0,(function*(){try{const[a,r,l]=yield Promise.all([null!==(t=null===(e=this.hass)||void 0===e?void 0:e.callWS({type:"config/area_registry/list"}))&&void 0!==t?t:[],null!==(o=null===(i=this.hass)||void 0===i?void 0:i.callWS({type:"config/device_registry/list"}))&&void 0!==o?o:[],null!==(s=null===(n=this.hass)||void 0===n?void 0:n.callWS({type:"config/entity_registry/list"}))&&void 0!==s?s:[]]);this.areas=a,this.devices=r,this.entities=l,this._processEntities()}catch(e){console.error("Error loading data:",e)}}))}_processEntities(){var e;const t=this._entitiesByDomain(this.entities,this.devices,null!==(e=this.areas)&&void 0!==e?e:[],this.hass.states);ut.setEntitiesByDomain(Object.fromEntries(Object.entries(t).map((([e,t])=>[e,t.map((e=>e.entity_id))])))),this.entitiesByDomain=t}_baseEntities(e,t){var i;return(this._entitiesByDomain(this.entities,this.devices,null!==(i=this.areas)&&void 0!==i?i:[],this.hass.states)[e]||[]).filter((i=>{const o=i.state;if("unavailable"===o||"unknown"===o)return!1;const n=i.attributes.device_class;return"switch"===e?"outlet"===t?"outlet"===n:"switch"!==t||"switch"===n||void 0===n:!t||n===t}))}_totalEntities(e,t){return this._baseEntities(e,t)}_shouldShowTotalEntities(e,t){if(this._config.show_total_entities)return!0;const i=t?`${Xe(e)} - ${t}`:e,o=this.getCustomizationForType(i);return!0===(null==o?void 0:o.show_total_entities)}_shouldShowTotalNumbers(e,t){if(this._config.show_total_number)return!0;const i=t?`${Xe(e)} - ${t}`:e,o=this.getCustomizationForType(i);return!0===(null==o?void 0:o.show_total_number)}_isOn(e,t){var i;const o=this._baseEntities(e,t),n=t?`${Xe(e)} - ${t}`:e,s=!0===(null===(i=this.getCustomizationForType(n))||void 0===i?void 0:i.invert);return o.filter((t=>{if("climate"===e){const e=t.attributes.hvac_action;if(void 0!==e){const t=!["idle","off"].includes(e);return s?!t:t}}if("humidifier"===e){const e=t.attributes.action;if(void 0!==e){const t=!["idle","off"].includes(e);return s?!t:t}}let i=!Ye.includes(t.state);return s?!i:i}))}setConfig(e){if(!e)throw new Error("Invalid configuration.");this._config=e,this.hide_person=void 0!==e.hide_person&&e.hide_person,this.hide_content_name=void 0!==e.hide_content_name&&e.hide_content_name,this.list_mode=void 0!==e.list_mode&&e.list_mode,this.hiddenEntities=e.hidden_entities||[],this.hiddenLabels=e.hidden_labels||[],this.hiddenAreas=e.hidden_areas||[]}updated(e){var t,i;if(super.updated(e),!this._config||!this.hass)return;const o=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector("ha-dialog"),n=null===(i=document.querySelector("home-assistant"))||void 0===i?void 0:i.shadowRoot;o&&o.parentElement!==n&&(null==n||n.appendChild(o));const s=e.get("hass"),a=e.get("_config");(!e.has("hass")||s&&s.themes===this.hass.themes)&&(!e.has("_config")||a&&a.theme===this._config.theme)||((e,t)=>{var i;const o=this._config.theme||t.theme;if(e.__themes||(e.__themes={cacheKey:null,keys:{}}),!o||"default"===o)return e.removeAttribute("style"),void(e.__themes.cacheKey="default");const n=null===(i=t.themes)||void 0===i?void 0:i[o];if(!n)return console.warn(`Theme "${o}" not found.`),e.removeAttribute("style"),void(e.__themes.cacheKey="default");if(e.__themes.cacheKey!==o){for(const[t,i]of Object.entries(n))e.style.setProperty(`--${t}`,String(i));e.__themes.cacheKey=o}})(this,this.hass.themes)}connectedCallback(){super.connectedCallback(),this._updateIsMobile(),window.addEventListener("resize",this._updateIsMobile.bind(this))}disconnectedCallback(){window.removeEventListener("resize",this._updateIsMobile.bind(this)),super.disconnectedCallback()}_updateIsMobile(){this._isMobile=window.innerWidth<=768}showMoreInfo(e){const t=new CustomEvent("hass-more-info",{detail:{entityId:e.entity_id},bubbles:!0,composed:!0});this.dispatchEvent(t)}getStatusProperty(e,t,i){if(this._shouldShowTotalEntities(e,t)&&!this._shouldShowTotalNumbers(e,t))return"";const o=["window","door","lock","awning","blind","curtain","damper","garage","gate","shade","shutter"];let n;n=t?`${Xe(e)} - ${t}`:e;const s=this.getCustomizationForType(n),a=!0===(null==s?void 0:s.invert);switch(e){case"device_tracker":{const e=ht(this.hass,"home","device_tracker"),t=ht(this.hass,"not_home","device_tracker");return a?t:e}case"lock":case"cover":{const e=ht(this.hass,"open","cover"),t=ht(this.hass,"closed","cover");return a?t:e}case"person":return"home"===i?ht(this.hass,"home","person"):"not_home"===i?ht(this.hass,"not_home","person"):null!=i?i:"unknown";default:{if(t&&o.includes(t)){const e=ht(this.hass,"open","cover"),t=ht(this.hass,"closed","cover");return a?t:e}const e=ht(this.hass,null!=i?i:"on","light"),n=ht(this.hass,null!=i?i:"off","light");return a?n:e}}}getCustomizationForType(e){var t;if(e)return null===(t=this._config.customization)||void 0===t?void 0:t.find((t=>{var i;return(null===(i=t.type)||void 0===i?void 0:i.toLowerCase())===e.toLowerCase()}))}getCustomIcon(e,t,i){let o;o=t?`${Xe(e)} - ${t}`:e;const n=this.getCustomizationForType(o);if(!0===(null==n?void 0:n.show_entity_picture)&&i&&i.attributes&&i.attributes.entity_picture)return i.attributes.entity_picture;if(n&&n.icon)return n.icon;if(i&&i.attributes&&i.attributes.icon)return i.attributes.icon;if(!i){const i=!0===(null==n?void 0:n.invert)?"off":"on";let o=e;return!t&&e.includes(".")&&(o=e.split(".")[0]),function(e,t,i){switch(e){case"alarm_control_panel":return"off"===t?"mdi:alarm-light-off":"mdi:alarm-light";case"siren":return"off"===t?"mdi:bell-off":"mdi:bell-ring";case"lock":return"off"===t?"mdi:lock":"mdi:lock-open";case"light":return"off"===t?"mdi:lightbulb-off":"mdi:lightbulb";case"media_player":return"off"===t?"mdi:cast-off":"mdi:cast";case"climate":return"off"===t?"mdi:thermostat-cog":"mdi:thermostat";case"vacuum":return"off"===t?"mdi:robot-vacuum-off":"mdi:robot-vacuum";case"fan":return"off"===t?"mdi:fan-off":"mdi:fan";case"switch":if(i)switch(i){case"outlet":return"off"===t?"mdi:power-plug-off":"mdi:power-plug";case"switch":return"off"===t?"mdi:toggle-switch-off":"mdi:toggle-switch"}case"cover":if(i)switch(i){case"door":return"off"===t?"mdi:door-closed":"mdi:door-open";case"garage":return"off"===t?"mdi:garage":"mdi:garage-open";case"gate":return"off"===t?"mdi:gate":"mdi:gate-open";case"blind":return"off"===t?"mdi:blinds":"mdi:blinds-open";case"curtain":return"off"===t?"mdi:curtains-closed":"mdi:curtains";case"damper":return"off"===t?"mdi:valve-closed":"mdi:valve";case"awning":return"off"===t?"mdi:awning-outline":"mdi:awning";case"shutter":return"off"===t?"mdi:window-shutter":"mdi:window-shutter-open";case"shade":return"off"===t?"mdi:roller-shade-closed":"mdi:roller-shade";case"window":return"off"===t?"mdi:window-closed":"mdi:window-open";default:return"mdi:help-circle"}return"off"===t?"mdi:window-closed":"mdi:window-open";case"binary_sensor":if(i)switch(i){case"door":return"off"===t?"mdi:door-closed":"mdi:door-open";case"window":return"off"===t?"mdi:window-closed":"mdi:window-open";case"lock":return"off"===t?"mdi:lock-open":"mdi:lock";case"motion":return"off"===t?"mdi:motion-sensor-off":"mdi:motion-sensor";case"presence":return"off"===t?"mdi:home-off":"mdi:home";case"occupancy":return"off"===t?"mdi:seat-outline":"mdi:seat";case"vibration":return"off"===t?"mdi:vibrate-off":"mdi:vibrate";case"plug":return"off"===t?"mdi:power-plug-off":"mdi:power-plug";case"power":return"off"===t?"mdi:power-off":"mdi:power";case"battery":return"off"===t?"mdi:battery-off":"mdi:battery";case"battery_charging":return"off"===t?"mdi:battery-alert":"mdi:battery-charging";case"moving":return"off"===t?"mdi:car-off":"mdi:car";case"running":return"off"===t?"mdi:play-pause":"mdi:play";case"gas":return"mdi:gas-cylinder";case"carbon_monoxide":return"mdi:molecule-co";case"cold":return"off"===t?"mdi:snowflake-off":"mdi:snowflake";case"heat":return"off"===t?"mdi:weather-sunny-off":"mdi:weather-sunny";case"moisture":return"off"===t?"mdi:water-off":"mdi:water";case"connectivity":return"mdi:connection";case"opening":return"off"===t?"mdi:shield-lock":"mdi:shield-lock-open";case"garage_door":return"off"===t?"mdi:garage":"mdi:garage-open";case"light":return"off"===t?"mdi:lightbulb-off":"mdi:lightbulb-on";case"problem":return"off"===t?"mdi:alert-circle-check":"mdi:alert-circle";case"safety":return"off"===t?"mdi:shield-alert-outline":"mdi:shield-alert";case"smoke":return"off"===t?"mdi:smoke-detector-off":"mdi:smoke-detector";case"sound":return"off"===t?"mdi:volume-off":"mdi:volume-high";case"tamper":return"off"===t?"mdi:shield-home-outline":"mdi:shield-home";case"update":return"off"===t?"mdi:autorenew-off":"mdi:autorenew";default:return"mdi:help-circle"}return"off"===t?"mdi:radiobox-blank":"mdi:checkbox-marked-circle";case"humidifier":return"off"===t?"mdi:water-off":"mdi:air-humidifier";case"lawn_mower":return"off"===t?"mdi:lawn-mower":"mdi:robot-mower";case"valve":return"mdi:valve";case"water_heater":return"off"===t?"mdi:water-pump-off":"mdi:water-boiler";case"remote":return"off"===t?"mdi:remote-off":"mdi:remote";case"device_tracker":return"off"===t?"mdi:account-off":"mdi:cellphone";case"update":return"off"===t?"mdi:autorenew-off":"mdi:autorenew";case"input_boolean":return"off"===t?"mdi:toggle-switch-off":"mdi:toggle-switch";case"timer":return"off"===t?"mdi:timer-off":"mdi:timer-outline";case"counter":return"off"===t?"mdi:numeric":"mdi:counter";case"calendar":return"off"===t?"mdi:calendar-off":"mdi:calendar";case"person":return"mdi:account";default:return console.warn(`Unable to find icon for domain ${e} (${t})`),"mdi:help-circle"}}(o,i,t)}return""}getBackgroundColor(e,t){var i;const o=t?`${Xe(e)} - ${t}`:e,n=this.getCustomizationForType(o);return n&&Array.isArray(n.background_color)?`rgb(${n.background_color.join(",")})`:Array.isArray(null===(i=this._config)||void 0===i?void 0:i.background_color)?`rgb(${this._config.background_color.join(",")})`:"rgba(var(--rgb-primary-text-color), 0.15)"}getCustomColor(e,t){let i;i=t?`${Xe(e)} - ${t}`:e;const o=this.getCustomizationForType(i);return o&&o.icon_color?o.icon_color:this._config&&this._config.color?this._config.color:void 0}getCustomName(e,t,i){let o;o=t?`${Xe(e)} - ${t}`:e;const n=this.getCustomizationForType(o);return n&&n.name?n.name:i&&i.attributes.friendly_name?i.attributes.friendly_name:void 0}getCustomCSS(e,t){let i;i=t?`${Xe(e)} - ${t}`:e;const o=this.getCustomizationForType(i);if(o&&o.icon_css)return o.icon_css}toggleDomain(e,t){let i;e=null!=e?e:this.selectedDomain,i=(t=null!=t?t:this.selectedDeviceClass)?`${Xe(e)} - ${t}`:e;const o=this._isOn(e,t);if(0!==o.length)if(["light","switch","fan","cover","siren","climate","humidifier","valve","remote"].includes(e))this.hass.callService(e,"toggle",{entity_id:o.map((e=>e.entity_id))});else for(const t of o){let i=!Ye.includes(t.state);"media_player"===e?this.hass.callService(e,i?"media_pause":"media_play",{entity_id:t.entity_id}):"lock"===e?this.hass.callService(e,i?"lock":"unlock",{entity_id:t.entity_id}):"vacuum"===e?this.hass.callService(e,i?"stop":"start",{entity_id:t.entity_id}):"alarm_control_panel"===e?this.hass.callService(e,i?"alarm_arm_away":"alarm_disarm",{entity_id:t.entity_id}):"lawn_mower"===e?this.hass.callService(e,i?"pause":"start_mowing",{entity_id:t.entity_id}):"water_heater"===e?this.hass.callService(e,i?"turn_off":"turn_on",{entity_id:t.entity_id}):"update"===e&&this.hass.callService(e,i?"skip":"install",{entity_id:t.entity_id})}else console.warn(`Keine aktiven Entitäten für ${e} gefunden.`)}_handleDomainAction(e,t){return i=>{var o,n,s;i.stopPropagation();let a=t?`${Xe(e)} - ${t}`:e;const r=this.getCustomizationForType(a);let l,c;"tap"===i.detail.action?(l=null==r?void 0:r.tap_action,c=null===(o=this._config)||void 0===o?void 0:o.tap_action):"hold"===i.detail.action?(l=null==r?void 0:r.hold_action,c=null===(n=this._config)||void 0===n?void 0:n.hold_action):"double_tap"===i.detail.action&&(l=null==r?void 0:r.double_tap_action,c=null===(s=this._config)||void 0===s?void 0:s.double_tap_action);const d=void 0!==l?l:c,u="string"==typeof d&&"more-info"===d||"object"==typeof d&&"more-info"===(null==d?void 0:d.action),h="string"==typeof d&&"toggle"===d||"object"==typeof d&&"toggle"===(null==d?void 0:d.action);if(e.includes(".")){const t=e,i=this.hass.states[t],o=He(t);if(h)return void this.hass.callService(o,"toggle",{entity_id:t});if(u)return void this.showMoreInfo(i)}if(u||void 0===d)return this.selectedDomain=e,void(this.selectedDeviceClass=t||null);h?this.toggleDomain(e,t):Re(this,this.hass,{tap_action:(null==r?void 0:r.tap_action)||this._config.tap_action,hold_action:(null==r?void 0:r.hold_action)||this._config.hold_action,double_tap_action:(null==r?void 0:r.double_tap_action)||this._config.double_tap_action},i.detail.action)}}getPersonItems(){return this.hide_person?[]:this.entities.filter((e=>{var t;return e.entity_id.startsWith("person.")&&!this.hiddenEntities.includes(e.entity_id)&&!(null===(t=e.labels)||void 0===t?void 0:t.some((e=>this.hiddenLabels.includes(e))))&&!e.hidden_by&&!e.disabled_by})).reverse().map((e=>this.hass.states[e.entity_id])).filter((e=>!!e))}getGroupItems(){return this._computeGroupItems(this._config.content||[],this._config.rulesets||[])}getExtraItems(){return this._config&&this.hass?this._computeExtraItems(this._config,this.hass.states):[]}getDomainItems(){return this._computeDomainItems(this._config.content||[])}getDeviceClassItems(){return this._computeDeviceClassItems(this._config.content||[])}_getIconStyles(e,t={}){const{color:i,background_color:o,square:n,isNotHome:s}=t,a={"border-radius":n?"20%":"50%","background-color":o,color:i?`var(--${i}-color)`:void 0};return"person"===e&&s&&(a.filter="grayscale(100%)"),a}renderPersonEntities(){return this.getPersonItems().map((e=>{var t,i;const o=this.hass.states[e.entity_id],n="home"!==(null==o?void 0:o.state),s={horizontal:"horizontal"===this._config.content_layout},a={"border-radius":(null===(t=this._config)||void 0===t?void 0:t.square)?"20%":"50%",filter:n?"grayscale(100%)":"none"};return V`
        <sl-tab
          slot="nav"
          panel=${e.entity_id}
          @click="${()=>this.showMoreInfo(e)}"
        >
          <div class="entity ${xe(s)}">
            <div class="entity-icon" style=${Se(a)}>
              ${e.attributes.entity_picture?V`<img
                    src=${e.attributes.entity_picture}
                    alt=${e.attributes.friendly_name||e.entity_id}
                    style=${Se(a)}
                  />`:V`<ha-icon
                    class="center"
                    icon=${e.attributes.icon||"mdi:account"}
                    style=${Se(a)}
                  ></ha-icon>`}
            </div>
            <div class="entity-info">
              ${this.hide_content_name?"":V`<div class="entity-name">
                    ${(null===(i=e.attributes.friendly_name)||void 0===i?void 0:i.split(" ")[0])||""}
                  </div>`}
              <div class="entity-state">
                ${this.getStatusProperty("person",void 0,null==o?void 0:o.state)}
              </div>
            </div>
          </div>
        </sl-tab>
      `}))}renderExtraTab(e){var t,i;const{panel:o,entity:n,icon:s,name:a,color:r,icon_css:l,background_color:c}=e,d=this.hass.states[o],u=n.state,h=Number(u),m=Number.isNaN(h)||""===u?ht(this.hass,u,He(o)):((e,t,i)=>{const o=t?(e=>{switch(e.number_format){case ke.comma_decimal:return["en-US","en"];case ke.decimal_comma:return["de","es","it"];case ke.space_comma:return["fr","sv","cs"];case ke.system:return;default:return e.language}})(t):void 0;if(Number.isNaN=Number.isNaN||function e(t){return"number"==typeof t&&e(t)},t?.number_format!==ke.none&&!Number.isNaN(Number(e))&&Intl)try{return new Intl.NumberFormat(o,Pe(e,i)).format(Number(e))}catch(t){return console.error(t),new Intl.NumberFormat(void 0,Pe(e,i)).format(Number(e))}return"string"==typeof e?e:`${((e,t=2)=>Math.round(e*10**t)/10**t)(e,i?.maximumFractionDigits).toString()}${"currency"===i?.style?` ${i.currency}`:""}`})(h,this.hass.locale),p=n.attributes.unit_of_measurement,_=this.getCustomizationForType(o),f=this._handleDomainAction(o),g=Ke({hasHold:Ne(null!==(t=null==_?void 0:_.hold_action)&&void 0!==t?t:this._config.hold_action),hasDoubleClick:Ne(null!==(i=null==_?void 0:_.double_tap_action)&&void 0!==i?i:this._config.double_tap_action)}),v={horizontal:"horizontal"===this._config.content_layout},y=this._getIconStyles("extra",{color:r,background_color:c,square:this._config.square});return V`
      <sl-tab slot="nav" panel=${o} @action=${f} .actionHandler=${g}>
        <div class="extra-entity ${xe(v)}">
          <div class="entity-icon" style=${Se(y)}>
            ${s.startsWith("/")||s.startsWith("http")?V`<img
                  src=${s}
                  alt=${a}
                  style="border-radius:${this._config.square?"20%":"50%"};object-fit:cover;"
                />`:V`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${d}
                  .icon=${s}
                  data-domain=${He(o)}
                  data-state=${d.state}
                  style="${l||""}"
                ></ha-state-icon>`}
          </div>
          <div class="entity-info">
            ${this.hide_content_name?"":V`<div class="entity-name">${a}</div>`}
            <div class="entity-state">
              ${m}${p?` ${p}`:""}
            </div>
          </div>
        </div>
      </sl-tab>
    `}renderGroupTab(e,t){const i=Ue(this,e);if(!i.length)return V``;const o=e.group_id||this.hass.localize("component.group.entity_component._.name ${index + 1}"),n=e.group_icon||"mdi:format-list-group",s=this.getCustomColor(o),a=this.getBackgroundColor(o),r=Ke({hasHold:!1,hasDoubleClick:!1}),l={horizontal:"horizontal"===this._config.content_layout},c=this._getIconStyles("domain",{color:s,background_color:a,square:this._config.square});return V`
      <sl-tab
        slot="nav"
        panel=${"group-"+t}
        @action=${()=>{this.selectedGroup=t}}
        .actionHandler=${r}
      >
        <div class="entity ${xe(l)}">
          <div class="entity-icon" style=${Se(c)}>
            <ha-icon icon=${n}></ha-icon>
          </div>
          <div class="entity-info">
            ${this.hide_content_name?"":V`<div class="entity-name">${o}</div>`}
            <div class="entity-state">
              ${i.length}
              ${e.group_status?` ${e.group_status}`:""}
            </div>
          </div>
        </div>
      </sl-tab>
    `}renderDomainTab(e){var t,i;const{domain:o}=e,n=this._isOn(o),s=this._totalEntities(o);if(!(this._shouldShowTotalEntities(o)?s:n).length)return V``;const a=this.getCustomColor(o),r=this.getCustomizationForType(o),l=this._handleDomainAction(o),c=Ke({hasHold:Ne(null!==(t=null==r?void 0:r.hold_action)&&void 0!==t?t:this._config.hold_action),hasDoubleClick:Ne(null!==(i=null==r?void 0:r.double_tap_action)&&void 0!==i?i:this._config.double_tap_action)}),d={horizontal:"horizontal"===this._config.content_layout},u=this._getIconStyles("domain",{color:a,background_color:this.getBackgroundColor(o),square:this._config.square});return V`
      <sl-tab
        slot="nav"
        panel=${o}
        @action=${l}
        .actionHandler=${c}
      >
        <div class="entity ${xe(d)}">
          <div class="entity-icon" style=${Se(u)}>
            <ha-icon
              icon=${this.getCustomIcon(o)}
              style=${Se({})}
            ></ha-icon>
          </div>
          <div class="entity-info">
            ${this.hide_content_name?"":V`<div class="entity-name">
                  ${this.getCustomName(o)||this.computeLabel({name:o})}
                </div>`}
            <div class="entity-state">
              ${this._shouldShowTotalNumbers(o)?`${n.length}/${s.length} ${this.getStatusProperty(o)}`:this._shouldShowTotalEntities(o)?`${s.length}`:`${n.length} ${this.getStatusProperty(o)}`}
            </div>
          </div>
        </div>
      </sl-tab>
    `}renderDeviceClassTab(e){var t,i;const{domain:o,deviceClass:n}=e,s=this._isOn(o,n),a=this._totalEntities(o,n);if(!(this._shouldShowTotalEntities(o,n)?a:s).length)return V``;const r=this.getCustomColor(o,n),l=`${Xe(o)} - ${n}`,c=this.getCustomizationForType(l),d=this._handleDomainAction(o,n),u=Ke({hasHold:Ne(null!==(t=null==c?void 0:c.hold_action)&&void 0!==t?t:this._config.hold_action),hasDoubleClick:Ne(null!==(i=null==c?void 0:c.double_tap_action)&&void 0!==i?i:this._config.double_tap_action)}),h={horizontal:"horizontal"===this._config.content_layout},m=this._getIconStyles("deviceClass",{color:r,background_color:this.getBackgroundColor(o,n),square:this._config.square});return V`
      <sl-tab
        slot="nav"
        panel=${n}
        @action=${d}
        .actionHandler=${u}
      >
        <div class="entity ${xe(h)}">
          <div class="entity-icon" style=${Se(m)}>
            <ha-icon icon=${this.getCustomIcon(o,n)}></ha-icon>
          </div>
          <div class="entity-info">
            ${this.hide_content_name?"":V`<div class="entity-name">
                  ${this.getCustomName(o,n)||this.computeLabel({name:n})}
                </div>`}
            <div class="entity-state">
              ${this._shouldShowTotalNumbers(o,n)?`${s.length}/${a.length} ${this.getStatusProperty(o,n)}`:this._shouldShowTotalEntities(o,n)?`${a.length}`:`${s.length} ${this.getStatusProperty(o,n)}`}
            </div>
          </div>
        </div>
      </sl-tab>
    `}renderTab(e){switch(e.type){case"extra":return this.renderExtraTab(e);case"group":return this.renderGroupTab(e.ruleset,e.order);case"domain":return this.renderDomainTab(e);case"deviceClass":return this.renderDeviceClassTab(e)}}render(){const e=this.getExtraItems(),t=this.getGroupItems(),i=this.getDomainItems(),o=this.getDeviceClassItems(),n=this._computeSortedEntities(e,t,i,o),s={"no-scroll":!!this._config.no_scroll};return V`
      <ha-card>
        <sl-tab-group no-scroll-controls class=${xe(s)}>
          ${this.renderPersonEntities()}
          ${Ce(n,(e=>"extra"===e.type?e.panel:"domain"===e.type?e.domain:"deviceClass"===e.type?`${e.domain}-${e.deviceClass}`:"group"===e.type?`group-${e.group_id}`:""),(e=>this.renderTab(e)))}
          ${null!==this.selectedDomain||null!==this.selectedGroup?function(e){var t,i,o;const n=e.list_mode?1:e._config.columns||4,s=e._isMobile?at:rt,a=!!e._config.show_total_entities,r=e._showAll?!a:a,l=new Map(null===(t=e.areas)||void 0===t?void 0:t.map((e=>[e.area_id,e.name])));let c,d=!1;if(null!==e.selectedGroup&&(null===(i=e._config.content)||void 0===i?void 0:i[e.selectedGroup])){const t=e._config.content[e.selectedGroup],i=null===(o=e._config.rulesets)||void 0===o?void 0:o.find((e=>e.group_id===t));c=i?Ue(e,i):[]}else c=e._shouldShowTotalEntities(e.selectedDomain,e.selectedDeviceClass)||e._showAll?e._totalEntities(e.selectedDomain,e.selectedDeviceClass):e._isOn(e.selectedDomain,e.selectedDeviceClass),d=!0;const u=e=>e.slice().sort(((e,t)=>{var i,o;if(r){const i=!Ye.includes(e.state);if(i!==!Ye.includes(t.state))return i?-1:1}const n=((null===(i=e.attributes)||void 0===i?void 0:i.friendly_name)||e.entity_id).toLowerCase(),s=((null===(o=t.attributes)||void 0===o?void 0:o.friendly_name)||t.entity_id).toLowerCase();return n.localeCompare(s)})),h=st(c,e.areas,l,u,e),m=Math.max(...h.map((([,e])=>e.length))),p=Math.min(n,m),_=e.selectedDomain,f=e.selectedDeviceClass,g=f?`${Xe(_)} - ${f}`:_,v=e.getCustomizationForType(g),y=!0===(null==v?void 0:v.invert);return V`
    <ha-dialog
      id="more-info-dialog"
      style="--columns: ${p};"
      open
      @closed="${et}"
    >
      <style>
        ${s}
      </style>
      <div class="dialog-header">
        <ha-icon-button
          slot="trigger"
          .label=${e.hass.localize("ui.common.close")}
          .path=${Qe}
          @click=${()=>et.call(e)}
        ></ha-icon-button>
        <h3>
          ${e.selectedDomain&&e.selectedDeviceClass?e.computeLabel({name:"header"},e.selectedDomain,e.selectedDeviceClass):e.computeLabel({name:"header"},e.selectedDomain||void 0)}
        </h3>
        ${d?V`
              <ha-button-menu
                class="menu-button"
                slot="actionItems"
                fixed
                corner="BOTTOM_END"
                menu-corner="END"
                @closed=${Je}
              >
                <ha-icon-button
                  slot="trigger"
                  .label=${e.hass.localize("ui.common.menu")}
                  .path=${"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"}
                ></ha-icon-button>

                <ha-list-item
                  graphic="icon"
                  @closed=${Je}
                  .card=${e}
                  @click=${it}
                >
                  ${y?e.hass.localize("ui.card.common.turn_on"):e.hass.localize("ui.card.common.turn_off")}
                  <ha-svg-icon
                    slot="graphic"
                    .path=${"M17 6H7c-3.31 0-6 2.69-6 6s2.69 6 6 6h10c3.31 0 6-2.69 6-6s-2.69-6-6-6zm0 10H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h10c2.21 0 4 1.79 4 4s-1.79 4-4 4zM7 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}
                  ></ha-svg-icon>
                </ha-list-item>

                <ha-list-item
                  graphic="icon"
                  @closed=${Je}
                  .card=${e}
                  @click=${ot}
                >
                  ${e.hass.localize("ui.card.common.toggle")+" "+e.hass.localize("component.sensor.entity_component._.state_attributes.state_class.state.total")+" "+e.hass.localize("ui.panel.lovelace.editor.card.entities.name")}
                  <ha-svg-icon
                    slot="graphic"
                    .path=${"M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z"}
                  ></ha-svg-icon>
                </ha-list-item>
              </ha-button-menu>
            `:""}
      </div>
      ${e.list_mode?V`
            <ul class="entity-list">
              ${h.map((([e,t])=>{var i;const o=null!==(i=l.get(e))&&void 0!==i?i:"unassigned"===e?"Unassigned":e,n=u(t);return V`
                  <li class="entity-item">
                    <h4>${o}:</h4>
                    <ul>
                      ${n.map((e=>V`
                          <li class="entity-item">- ${e.entity_id}</li>
                        `))}
                    </ul>
                  </li>
                `}))}
            </ul>
          `:V`
            ${h.map((([t,i])=>{var o;const n=null!==(o=l.get(t))&&void 0!==o?o:"unassigned"===t?"Unassigned":t,s=u(i);return V`
                <div class="area-group">
                  <h4>${n}</h4>
                  <div class="cards-wrapper">
                    <div class="entity-cards">
                      ${s.map((t=>{var i,o;return V`
                          <div class="entity-card">
                            ${function(e,t){const i=document.createElement(`hui-${t.type}-card`);return i?(i.hass=e.hass,i.setConfig(t),i):V`<p>Invalid Configuration for card type: ${t.type}</p>`}(e,Object.assign({type:"tile",entity:t.entity_id},null!==e.selectedGroup?null!==(i=nt[t.entity_id.split(".")[0]])&&void 0!==i?i:{}:null!==(o=nt[e.selectedDomain])&&void 0!==o?o:{}))}
                          </div>
                        `}))}
                    </div>
                  </div>
                </div>
              `}))}
          `}
    </ha-dialog>

    <ha-dialog
      heading="              ${y?e.hass.localize("ui.card.common.turn_on")+"?":e.hass.localize("ui.card.common.turn_off")+"?"}"
      ?open=${e._confirmOpen}
      @closed=${()=>e._confirmOpen=!1}
    >
      <div>
        ${e.hass.localize("ui.panel.lovelace.cards.actions.action_confirmation",{action:y?e.hass.localize("ui.card.common.turn_on"):e.hass.localize("ui.card.common.turn_off")})}
      </div>
      <mwc-button slot="secondaryAction" dialogAction="close"
        >${e.hass.localize("ui.common.no")}</mwc-button
      >
      <mwc-button
        slot="primaryAction"
        @click=${()=>function(e){e._confirmOpen=!1;const{domain:t,deviceClass:i}=e._confirmParams;e.toggleDomain(t,i)}(e)}
      >
        ${e.hass.localize("ui.common.yes")}</mwc-button
      >
    </ha-dialog>
  `}(this):""}
        </sl-tab-group>
      </ha-card>
    `}static get styles(){return s`
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
        margin-top: 7px;
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
    `}static getConfigElement(){return document.createElement("status-card-editor")}static getStubConfig(){return{}}};pt([me({attribute:!1})],_t.prototype,"hass",void 0),pt([me({type:Object})],_t.prototype,"_config",void 0),pt([pe()],_t.prototype,"areas",void 0),pt([pe()],_t.prototype,"devices",void 0),pt([pe()],_t.prototype,"entities",void 0),pt([pe()],_t.prototype,"entitiesByDomain",void 0),pt([pe()],_t.prototype,"selectedDomain",void 0),pt([pe()],_t.prototype,"selectedDeviceClass",void 0),pt([pe()],_t.prototype,"hiddenEntities",void 0),pt([pe()],_t.prototype,"hiddenLabels",void 0),pt([pe()],_t.prototype,"hiddenAreas",void 0),pt([pe()],_t.prototype,"hide_person",void 0),pt([pe()],_t.prototype,"hide_content_name",void 0),pt([pe()],_t.prototype,"list_mode",void 0),pt([pe()],_t.prototype,"_showAll",void 0),pt([pe()],_t.prototype,"_confirmOpen",void 0),pt([pe()],_t.prototype,"_confirmParams",void 0),pt([pe()],_t.prototype,"_isMobile",void 0),pt([pe()],_t.prototype,"selectedGroup",void 0),_t=pt([de("status-card")],_t);var ft=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};class gt extends le{constructor(){super(...arguments),this.SelectOptions=[],this._entityKeys=new WeakMap}_getKey(e){return this._entityKeys.has(e)||this._entityKeys.set(e,Math.random().toString()),this._entityKeys.get(e)}render(){return this.hass?V`
      <div class="customization">
        ${this.customizationkey&&Ce(this.customizationkey,(e=>this._getKey(e)),((e,t)=>V`
            <div class="customize-item">
              <ha-select
                label=${this.hass.localize("ui.panel.lovelace.editor.common.edit")+" "+this.hass.localize("ui.panel.lovelace.editor.card.markdown.content")}
                name="Customize"
                class="select-customization"
                naturalMenuWidth
                fixedMenuPosition
                .value=${e.type}
                @closed=${e=>e.stopPropagation()}
                @value-changed=${this._valueChanged}
              >
                ${this.SelectOptions.map((e=>V`<mwc-list-item .value=${e.value}
                      >${e.label}</mwc-list-item
                    >`))}
              </ha-select>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.remove")}
                .path=${Qe}
                class="remove-icon"
                .index=${t}
                @click=${this._removeRow}
              ></ha-icon-button>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.edit")}
                .path=${"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"}
                class="edit-icon"
                .index=${t}
                @click=${this._editRow}
              ></ha-icon-button>
            </div>
          `))}

        <div class="add-item row">
          <ha-select
            label=${this.hass.localize("ui.panel.lovelace.editor.common.edit")+" "+this.hass.localize("ui.panel.lovelace.editor.card.markdown.content")}
            name="Customize"
            class="add-customization"
            naturalMenuWidth
            fixedMenuPosition
            @closed=${e=>e.stopPropagation()}
            @click=${this._addRow}
          >
            ${this.SelectOptions.map((e=>V`<mwc-list-item .value=${e.value}
                  >${e.label}</mwc-list-item
                >`))}
          </ha-select>
        </div>
      </div>
    `:W}_valueChanged(e){if(!this.customizationkey||!this.hass)return;const t=e.detail.value,i=e.target.index,o=this.customizationkey.concat();o[i]=Object.assign(Object.assign({},o[i]),{type:t||""}),We(this,this.customizationChangedEvent,o)}_removeRow(e){e.stopPropagation();const t=e.currentTarget.index;if(null!=t){const e=this.customizationkey.concat();e.splice(t,1),We(this,this.customizationChangedEvent,e)}}_editRow(e){e.stopPropagation();const t=e.target.index;null!=t&&We(this,"edit-item",t)}_addRow(e){if(e.stopPropagation(),!this.customizationkey||!this.hass)return;const t=this.shadowRoot.querySelector(".add-customization");if(!t||!t.value)return;const i={type:t.value};We(this,this.customizationChangedEvent,[...this.customizationkey,i]),t.value=""}static get styles(){return s`
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
    `}}ft([me({attribute:!1})],gt.prototype,"hass",void 0),ft([me({type:Array})],gt.prototype,"SelectOptions",void 0);let vt=class extends gt{constructor(){super(...arguments),this.customizationChangedEvent="config-changed"}get customizationkey(){return this.customization}};ft([me({attribute:!1})],vt.prototype,"customization",void 0),vt=ft([de("status-items-editor")],vt);var yt=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let bt=class extends le{constructor(){super(...arguments),this.useSensorSchema=!1,this._schemadomain=je((()=>{const e=["more-info","toggle","navigate","url","perform-action","none"];return[{name:"invert",selector:{boolean:{}}},{name:"show_total_number",selector:{boolean:{}}},{name:"show_total_entities",selector:{boolean:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"icon_color",selector:{ui_color:{default_color:"state",include_state:!0}}},{name:"background_color",selector:{color_rgb:{default_color:"state",include_state:!0}}},{name:"tap_action",selector:{ui_action:{actions:e}}},{name:"double_tap_action",selector:{ui_action:{actions:e}}},{name:"hold_action",selector:{ui_action:{actions:e}}}]})),this._schemaEntity=je((()=>{var e;const t=(null===(e=this.config)||void 0===e?void 0:e.type)||"",i=["more-info","toggle","navigate","url","perform-action","none"];return[{name:"",type:"grid",schema:[{name:"invert_state",required:!0,selector:{select:{mode:"dropdown",options:[{label:this.hass.localize("ui.panel.lovelace.editor.condition-editor.condition.state.state_equal"),value:"false"},{label:this.hass.localize("ui.panel.lovelace.editor.condition-editor.condition.state.state_not_equal"),value:"true"}]}}},{name:"state",selector:{state:{entity_id:t}}}]},{name:"name",selector:{text:{}}},{name:"show_entity_picture",selector:{boolean:{}}},{name:"icon",selector:{icon:{}}},{name:"icon_color",selector:{ui_color:{default_color:"state",include_state:!0}}},{name:"background_color",selector:{color_rgb:{default_color:"state",include_state:!0}}},{name:"tap_action",selector:{ui_action:{actions:i}}},{name:"double_tap_action",selector:{ui_action:{actions:i}}},{name:"hold_action",selector:{ui_action:{actions:i}}}]}))}render(){var e;if(!this.hass||!this.config)return V``;let t;switch((null===(e=this._config)||void 0===e?void 0:e.invert_state)||(this._config=Object.assign(Object.assign({},this._config),{invert_state:this.config.invert_state||"false",icon_color:this.config.icon_color||void 0,tap_action:this.config.tap_action||void 0,double_tap_action:this.config.double_tap_action||void 0,hold_action:this.config.hold_action||void 0})),this.getSchema){case"domain":t=this._schemadomain();break;case"entity":t=this._schemaEntity()}const i=Object.assign({},this._config);return V`
      <ha-form
        .hass=${this.hass}
        .data=${i}
        .schema=${t}
        .computeLabel=${e=>mt(this.hass,e)}
        @value-changed=${this._valueChangedSchema}
      ></ha-form>
    `}_valueChangedSchema(e){if(!this.config)return;e.stopPropagation();const t=Object.assign(Object.assign({},this.config),e.detail.value);this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:t}))}setConfig(e){var t;this._config=Object.assign(Object.assign({},e),{customization:null!==(t=e.customization)&&void 0!==t?t:[]})}static get styles(){return s`
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
    `}};yt([me({attribute:!1})],bt.prototype,"config",void 0),yt([me({attribute:!1})],bt.prototype,"hass",void 0),yt([me({type:Boolean})],bt.prototype,"useSensorSchema",void 0),yt([me({type:Number})],bt.prototype,"index",void 0),yt([pe()],bt.prototype,"getSchema",void 0),yt([pe()],bt.prototype,"_config",void 0),bt=yt([de("status-item-editor")],bt);var $t=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let wt=class extends le{constructor(){super(...arguments),this._subElementEditorDomain=void 0,this._subElementEditorEntity=void 0,this.rulesets=[{group_id:"",group_icon:"",group_status:"",rules:[{key:"",value:""}]}],this.computeLabel=je(((e,t,i)=>mt(this.hass,e,t,i))),this._filterInitialized=!1,this._lastFilter={area:[],floor:[],label:[]},this._schema=je(((e,t,i,o,n)=>{const s=this.computeLabel({name:"area"}),a=this.computeLabel({name:"floor"}),r=this.computeLabel({name:"label"}),l=this.computeLabel({name:"entity"}),c=this.getAllEntities(),d=["more-info","toggle","navigate","url","perform-action","none"];return[{name:"appearance",flatten:!0,type:"expandable",icon:"mdi:palette",schema:[{name:"",type:"grid",schema:[{name:"hide_person",selector:{boolean:{}}},{name:"list_mode",selector:{boolean:{}}},{name:"hide_content_name",selector:{boolean:{}}},{name:"show_total_number",selector:{boolean:{}}},{name:"square",selector:{boolean:{}}},{name:"show_total_entities",selector:{boolean:{}}}]},{name:"",type:"grid",schema:[{name:"theme",required:!1,selector:{theme:{}}},{name:"columns",required:!1,selector:{number:{min:1,max:4,mode:"box"}}}]},{name:"no_scroll",selector:{boolean:{}}},{name:"content_layout",required:!0,selector:{select:{mode:"box",options:["vertical","horizontal"].map((e=>({label:this.hass.localize(`ui.panel.lovelace.editor.card.tile.content_layout_options.${e}`),value:e,image:{src:`/static/images/form/tile_content_layout_${e}.svg`,src_dark:`/static/images/form/tile_content_layout_${e}_dark.svg`,flip_rtl:!0}})))}}},{name:"color",selector:{ui_color:{default_color:"state",include_state:!0}}},{name:"background_color",selector:{color_rgb:{}}},{name:"tap_action",selector:{ui_action:{actions:d}}},{name:"double_tap_action",selector:{ui_action:{actions:d}}},{name:"hold_action",selector:{ui_action:{actions:d}}}]},{name:"edit_filters",flatten:!0,type:"expandable",icon:"mdi:filter-cog",schema:[{name:"",type:"grid",schema:[{name:"filter",selector:{select:{options:[{value:"area",label:s},{value:"floor",label:a}]}}},{name:"label_filter",selector:{boolean:{}}}]},...e===s&&!1===o?[{name:"multiple_areas",selector:{boolean:{}}},{name:"area",selector:{area:{}}}]:[],...e===s&&!0===o?[{name:"multiple_areas",selector:{boolean:{}}},{name:"area",selector:{area:{multiple:!0}}}]:[],...e===a&&!1===n?[{name:"multiple_floors",selector:{boolean:{}}},{name:"floor",selector:{floor:{}}}]:[],...e===a&&!0===n?[{name:"multiple_floors",selector:{boolean:{}}},{name:"floor",selector:{floor:{multiple:!0}}}]:[],...t?[{name:"label",selector:{label:{multiple:!0}}}]:[]]},{name:"entities",flatten:!0,type:"expandable",icon:"mdi:invoice-text-edit",schema:[{name:"extra_entities",selector:{entity:{multiple:!0}}},{name:"",type:"grid",schema:[{name:"hide_filter",selector:{select:{options:[l,r,s]}}}]},...i===l?[{name:"hidden_entities",selector:{entity:{multiple:!0,include_entities:c}}}]:[],...i===r?[{name:"hidden_labels",selector:{label:{multiple:!0}}}]:[],...i===s?[{name:"hidden_areas",selector:{area:{multiple:!0}}}]:[]]}]})),this._toggleschema=je((e=>[{name:"content",selector:{select:{reorder:!0,multiple:!0,custom_value:!0,options:e}}}])),this._buildToggleOptions=je(((e,t)=>this._buildOptions("toggle",e,t))),this._memoizedClassesForArea=je(((e,t,i)=>this._classesForArea(e,t,i))),this.filterValueSelector={attributes:{object:{}},area:{area:{}},device:{device:{}},entity_id:{entity:{}},entity_category:{select:{options:["config","diagnostic"],mode:"dropdown"}},floor:{floor:{}},group:{entity:{filter:{domain:"group"}}},hidden_by:{select:{options:["user","integration"],mode:"dropdown"}},integration:{config_entry:{}},label:{label:{}}},this._addRuleset=()=>{this.rulesets=[...this.rulesets,{group_id:"",group_icon:"",rules:[{key:"",value:""}]}]},this._removeRuleset=e=>{this.rulesets=this.rulesets.filter(((t,i)=>i!==e)),this._updateConfigFromRulesets()}}getAllEntities(){return ut.getAllEntities()}setConfig(e){var t,i,o,n,s;this._config=Object.assign(Object.assign({},e),{columns:null!==(t=e.columns)&&void 0!==t?t:4,hide_person:null!==(i=e.hide_person)&&void 0!==i&&i,list_mode:null!==(o=e.list_mode)&&void 0!==o&&o,hide_content_name:null!==(n=e.hide_content_name)&&void 0!==n&&n,customization:null!==(s=e.customization)&&void 0!==s?s:[]}),this._loadRulesetsFromConfig()}_updateAreaFloorInConfig(){this._config&&this._config.filter&&("area"===this._config.filter&&void 0!==this._config.floor?(delete this._config.floor,We(this,"config-changed",{config:Object.assign({},this._config)})):"floor"===this._config.filter&&void 0!==this._config.area&&(delete this._config.area,We(this,"config-changed",{config:Object.assign({},this._config)})))}updated(e){const t=Object.create(null,{updated:{get:()=>super.updated}});var i,o,n,s,a,r;return function(e,t,i,o){return new(i||(i=Promise))((function(n,s){function a(e){try{l(o.next(e))}catch(e){s(e)}}function r(e){try{l(o.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(a,r)}l((o=o.apply(e,t||[])).next())}))}(this,void 0,void 0,(function*(){t.updated.call(this,e);let l=!1;if(this.hass&&this._config&&e.has("_config")){this._updateAreaFloorInConfig(),(!1===this._config.label_filter&&void 0!==this._config.label||Array.isArray(this._config.label)&&0===this._config.label.length)&&(delete this._config.label,l=!0);const t=e.get("_config"),c=null!==(i=null==t?void 0:t.extra_entities)&&void 0!==i?i:[],d=null!==(o=this._config.extra_entities)&&void 0!==o?o:[],u=null!==(n=null==t?void 0:t.content)&&void 0!==n?n:[],h=null!==(s=this._config.content)&&void 0!==s?s:[],m=Array.isArray(this._config.area)?[...this._config.area]:this._config.area?[this._config.area]:[],p=Array.isArray(this._config.floor)?[...this._config.floor]:this._config.floor?[this._config.floor]:[],_=Array.isArray(this._config.label)?[...this._config.label]:[];this._filterInitialized||(this._lastFilter={area:m,floor:p,label:_},this._filterInitialized=!0);const f=this._lastFilter.area,g=this._lastFilter.floor,v=this._lastFilter.label,y=!this.arraysEqual(v,_),b=!this.arraysEqual(g,p);if(!this.arraysEqual(f,m)||b||y){const e=this._memoizedClassesForArea(m,p,_).sort(((e,t)=>lt.indexOf(e)-lt.indexOf(t)));this._config=Object.assign(Object.assign({},this._config),{content:[...e]}),this._lastFilter={area:[...m],floor:[...p],label:[..._]},l=!0}if(this._config.rulesets&&Array.isArray(this._config.rulesets)){const e=this._config.rulesets.filter((e=>Object.keys(e).some((t=>"group_id"!==t&&"group_icon"!==t&&"group_status"!==t&&void 0!==e[t]&&""!==e[t])))).map((e=>e.group_id)).filter((e=>e&&e.length>1));let t=Array.isArray(this._config.content)?[...this._config.content]:[];t=t.filter((t=>!e.includes(t)));const i=null!==(a=this._config.extra_entities)&&void 0!==a?a:[];let o=0;for(let e=0;e<t.length;e++){if(!i.includes(t[e])){o=e;break}o=e+1}t=[...t.slice(0,o),...e.filter((e=>!t.includes(e))),...t.slice(o)],this.arraysEqual(t,null!==(r=this._config.content)&&void 0!==r?r:[])||(this._config=Object.assign(Object.assign({},this._config),{content:t}),l=!0)}if(!this.arraysEqual(c,d)){let e=[...h];d.forEach((t=>{e.includes(t)||e.unshift(t)})),e=e.filter((e=>!e.includes(".")||d.includes(e))),this.arraysEqual(e,h)||(this._config=Object.assign(Object.assign({},this._config),{content:e}),l=!0)}if(!this.arraysEqual(u,h)){let e=[...d];e=e.filter((e=>h.includes(e))),this.arraysEqual(e,d)||(this._config=Object.assign(Object.assign({},this._config),{extra_entities:e}),l=!0)}l&&(We(this,"config-changed",{config:Object.assign({},this._config)}),this.requestUpdate())}}))}_valueChanged(e){this._config=e.detail.value,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}get toggleSelectOptions(){var e;return this._buildToggleOptions(this._memoizedClassesForArea(this._config.area||[],this._config.floor||[],this._config.label||[]),(null===(e=this._config)||void 0===e?void 0:e.content)||[])}get contentSelectOptions(){var e;const t=null!==(e=this._config.content)&&void 0!==e?e:[];return this._buildOptions("toggle",t,t)}arraysEqual(e,t){return e.length===t.length&&new Set(e).size===new Set(t).size}_classesForArea(e,t,i){var o;const n=(null===(o=this._config)||void 0===o?void 0:o.extra_entities)||[];let s=Object.values(this.hass.entities).filter((e=>!e.hidden&&ct.includes(He(e.entity_id))));if(e&&e.length>0)s=s.filter((t=>{var i;return e.includes(t.area_id)||t.device_id&&e.includes(null===(i=this.hass.devices[t.device_id])||void 0===i?void 0:i.area_id)}));else if(t&&t.length>0){const e=Object.values(this.hass.areas).filter((e=>void 0!==e.floor_id&&t.includes(e.floor_id))).map((e=>e.area_id));s=s.filter((t=>{var i;return void 0!==t.area_id&&e.includes(t.area_id)||t.device_id&&void 0!==(null===(i=this.hass.devices[t.device_id])||void 0===i?void 0:i.area_id)&&e.includes(this.hass.devices[t.device_id].area_id)}))}i&&i.length>0&&(s=s.filter((e=>{var t,o;return e.labels&&e.labels.some((e=>i.includes(e)))||e.device_id&&(null===(t=this.hass.devices[e.device_id])||void 0===t?void 0:t.labels)&&(null===(o=this.hass.devices[e.device_id])||void 0===o?void 0:o.labels.some((e=>i.includes(e))))})));const a=new Set(s.map((e=>He(e.entity_id))).filter((e=>"binary_sensor"!==e&&"cover"!==e&&"switch"!==e))),r=new Map;s.filter((e=>["binary_sensor","cover","switch"].includes(He(e.entity_id)))).forEach((e=>{var t;const i=He(e.entity_id),o=(null===(t=this.hass.states[e.entity_id])||void 0===t?void 0:t.attributes.device_class)||"";o&&(r.has(o)||r.set(o,new Set),r.get(o).add(i))}));const l=[...r.entries()].map((([e,t])=>`${[...t].map((e=>Xe(e))).join(", ")} - ${e}`));return[...a,...l,...n].sort(((e,t)=>{const i=lt.findIndex((t=>e.startsWith(t))),o=lt.findIndex((e=>t.startsWith(e)));return(-1===i?lt.length:i)-(-1===o?lt.length:o)}))}_buildOptions(e,t,i){const o=[...new Set([...t,...i])].map((t=>{const i=t.match(/^(.+?)\s*-\s*(.+)$/);if(i){const e=i[1].toLowerCase().replace(" ","_"),o=i[2].toLowerCase();if("switch"===e&&"switch"===o){const e=this.hass.localize("component.switch.entity_component._.name");return{value:t,label:`${e} - ${e}`}}return{value:t,label:`${this.hass.localize(`component.${e}.entity_component._.name`)||i[1]} - ${this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.${e}.${o}`)||i[2]}`}}return{value:t,label:"scene"===t?"Scene":"toggle"===e?this.hass.localize(`component.${t}.entity_component._.name`)||t:this.hass.localize(`component.${e}.entity_component.${t}.name`)||t}}));return o.sort(((e,t)=>{const i=e.value.includes("."),o=t.value.includes(".");return i&&!o?-1:!i&&o?1:((e,t,i)=>(null===Intl||void 0===Intl?void 0:Intl.Collator)?qe(i).compare(e,t):((e,t)=>e<t?-1:e>t?1:0)(e.toLowerCase(),t.toLowerCase()))(e.label,t.label,this.hass.locale.language)})),o}_itemChanged(e,t,i){var o;if(e.stopPropagation(),!this._config||!this.hass)return;const n=null==t?void 0:t.index;if(null!=n){const t=[...null!==(o=this._config.customization)&&void 0!==o?o:[]];t[n]=e.detail,We(this,"config-changed",{config:Object.assign(Object.assign({},this._config),{customization:t})})}}_editItem(e,t){if(e.stopPropagation(),!this._config||!this.hass)return;const i=e.detail;this[`_subElementEditor${t}`]={index:i}}_edit_itemDomain(e){var t;const i=e.detail,o=(null!==(t=this._config.customization)&&void 0!==t?t:[])[i];let n;n=o&&o.type&&o.type.includes(".")?"Entity":"Domain",this._editItem(e,n)}_itemChangedDomain(e){this._itemChanged(e,this._subElementEditorDomain,"customization")}_itemChangedEntity(e){this._itemChanged(e,this._subElementEditorEntity,"customization")}_renderSubElementEditorDomain(){return this._renderSubElementEditor("domain",this._goBackDomain,this._itemChangedDomain)}_renderSubElementEditorEntity(){return this._renderSubElementEditor("entity",this._goBackEntity,this._itemChangedEntity)}_goBackDomain(){this._subElementEditorDomain=void 0}_goBackEntity(){this._subElementEditorEntity=void 0}_renderSubElementEditor(e,t,i){var o,n,s,a,r,l,c,d,u,h;const m=this[`_subElementEditor${e.charAt(0).toUpperCase()+e.slice(1)}`],p=null!==(r=null===(a=null===(n=null===(o=this._config)||void 0===o?void 0:o.customization)||void 0===n?void 0:n[null!==(s=null==m?void 0:m.index)&&void 0!==s?s:0])||void 0===a?void 0:a.type)&&void 0!==r?r:"unknown",_=p.match(/^(.+?)\s*-\s*(.+)$/);let f=p;if(_){const e=_[1].toLowerCase().replace(" ","_"),t=_[2].toLowerCase();if("switch"===e&&"switch"===t){const e=this.hass.localize("component.switch.entity_component._.name");f=`${e} - ${e}`}else f=`${this.hass.localize(`component.${e}.entity_component._.name`)||_[1]} - ${this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.${e}.${t}`)||_[2]}`}else f=this.hass.localize(`component.${p}.entity_component._.name`)||p;return V`
      <div class="header">
        <div class="back-title">
          <ha-icon-button
            slot="trigger"
            .label=${this.hass.localize("ui.common.back")}
            .path=${"M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"}
            @click=${t}
          ></ha-icon-button>
          <span slot="title">${f}</span>
        </div>
      </div>
      <status-item-editor
        .hass=${this.hass}
        .config=${null!==(u=null===(c=null===(l=this._config)||void 0===l?void 0:l.customization)||void 0===c?void 0:c[null!==(d=null==m?void 0:m.index)&&void 0!==d?d:0])&&void 0!==u?u:{}}
        .getSchema=${e}
        .index=${null!==(h=null==m?void 0:m.index)&&void 0!==h?h:0}
        @config-changed=${i}
      >
      </status-item-editor>
    `}_customizationChanged(e,t){e.stopPropagation(),this._config&&this.hass&&We(this,"config-changed",{config:Object.assign(Object.assign({},this._config),{customization:e.detail})})}_customizationChangedDomain(e){this._customizationChanged(e,"domain")}_loadRulesetsFromConfig(){var e;this.rulesets=(null!==(e=this._config.rulesets)&&void 0!==e?e:[]).map((e=>{var t,i,o,n;const s=Object.keys(e).filter((t=>"group_id"!==t&&"group_icon"!==t&&"group_status"!==t&&void 0!==e[t])).map((t=>{var i;return{key:t,value:null!==(i=e[t])&&void 0!==i?i:""}}));return 0!==s.length&&""===(null===(t=s[s.length-1])||void 0===t?void 0:t.key)||s.push({key:"",value:""}),{group_id:null!==(i=e.group_id)&&void 0!==i?i:"",group_icon:null!==(o=e.group_icon)&&void 0!==o?o:"",group_status:null!==(n=e.group_status)&&void 0!==n?n:"",rules:s}}))}_saveRulesetsToConfig(){const e=this.rulesets.map((e=>{var t,i,o;const n=e.rules.reduce(((e,t)=>{var i;return t.key&&""!==t.key&&(e[t.key]=null!==(i=t.value)&&void 0!==i?i:""),e}),{});return Object.assign({group_id:null!==(t=e.group_id)&&void 0!==t?t:"",group_icon:null!==(i=e.group_icon)&&void 0!==i?i:"",group_status:null!==(o=e.group_status)&&void 0!==o?o:""},n)}));this._config=Object.assign(Object.assign({},this._config),{rulesets:e}),We(this,"config-changed",{config:this._config})}_updateConfigFromRulesets(){this._saveRulesetsToConfig()}get ruleKeySelector(){const e=[["area",this.hass.localize("ui.components.selectors.selector.types.area")],["attributes",this.hass.localize("ui.components.selectors.selector.types.attribute")],["device",this.hass.localize("ui.components.selectors.selector.types.device")],["domain",this.hass.localize("ui.panel.lovelace.editor.cardpicker.domain")],["entity_category",this.hass.localize("ui.components.category-picker.category")],["entity_id",this.hass.localize("ui.dialogs.entity_registry.editor.entity_id")],["floor",this.hass.localize("ui.components.floor-picker.floor")],["group",this.hass.localize("component.group.entity_component._.name")],["hidden_by","Hidden by"],["integration",this.hass.localize("ui.components.related-items.integration")],["label",this.hass.localize("ui.components.label-picker.label")],["last_changed",this.hass.localize("ui.components.state-content-picker.last_changed")],["last_triggered",this.hass.localize("component.automation.entity_component._.state_attributes.last_triggered.name")],["last_updated",this.hass.localize("ui.components.state-content-picker.last_updated")],["device_manufacturer","Manufacturer"],["device_model","Model"],["name",this.hass.localize("ui.common.name")],["state",this.hass.localize("ui.components.selectors.selector.types.state")]];return e.sort(((e,t)=>e[1].localeCompare(t[1],this.hass.locale.language))),{type:"select",options:e}}getGroupSchema(e){return[{name:"group_id",selector:{text:{}}},{name:"group_icon",selector:{icon:{}}},{name:"group_status",selector:{text:{}}},...e.rules.map(((t,i)=>{var o;const n=e.rules.map(((e,t)=>t!==i?e.key:null)).filter((e=>e)),s=this.ruleKeySelector.options.filter((([e])=>!n.includes(e)||e===t.key));return{type:"grid",schema:[{type:"select",name:`key_${i}`,options:s},{name:`value_${i}`,selector:null!==(o=this.filterValueSelector[t.key])&&void 0!==o?o:{text:{}}}]}}))]}_groupFormData(e){var t;const i={group_id:e.group_id,group_icon:e.group_icon,group_status:null!==(t=e.group_status)&&void 0!==t?t:""};return e.rules.forEach(((e,t)=>{i[`key_${t}`]=e.key,i[`value_${t}`]=e.value})),i}_groupValueChanged(e,t){var i;const{value:o}=e.detail,n=Object.keys(o).filter((e=>e.startsWith("key_"))).map((e=>{var t,i;const n=e.split("_")[1];return{key:null!==(t=o[`key_${n}`])&&void 0!==t?t:"",value:null!==(i=o[`value_${n}`])&&void 0!==i?i:""}}));0!==n.length&&""===(null===(i=n[n.length-1])||void 0===i?void 0:i.key)||n.push({key:"",value:""}),this.rulesets=this.rulesets.map(((e,i)=>{var s,a,r;return i===t?{group_id:null!==(s=o.group_id)&&void 0!==s?s:"",group_icon:null!==(a=o.group_icon)&&void 0!==a?a:"",group_status:null!==(r=o.group_status)&&void 0!==r?r:"",rules:n}:e})),this._updateConfigFromRulesets()}render(){var e,t,i,o,n;if(!this.hass||!this._config)return V`<div>Loading...</div>`;const s=this._toggleschema(this.toggleSelectOptions),a=this._schema(null!==(e=this._config.filter)&&void 0!==e?e:"",null!==(t=this._config.label_filter)&&void 0!==t&&t,null!==(i=this._config.hide_filter)&&void 0!==i?i:"",null!==(o=this._config.multiple_areas)&&void 0!==o&&o,null!==(n=this._config.multiple_floors)&&void 0!==n&&n),r=this._memoizedClassesForArea(this._config.area||[],this._config.floor||[],this._config.label||[]),l=Object.assign({content:r},this._config);return this._subElementEditorDomain?this._renderSubElementEditorDomain():this._subElementEditorEntity?this._renderSubElementEditorEntity():V`
      <ha-form
        .hass=${this.hass}
        .data=${l}
        .schema=${a}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon
            class="secondary"
            .path=${"M17 14V17H14V19H17V22H19V19H22V17H19V14M20 11V12.3C19.4 12.1 18.7 12 18 12C16.8 12 15.6 12.4 14.7 13H7V11H20M12.1 17H7V15H12.8C12.5 15.6 12.2 16.3 12.1 17M7 7H20V9H7V7M5 19H7V21H3V3H7V5H5V19Z"}
          ></ha-svg-icon>
          Smart Groups
        </div>
        <div class="content">
          ${this.rulesets.map(((e,t)=>V`
              <ha-expansion-panel class="group-panel main" outlined>
                <div slot="header" class="group-header">
                  ${e.group_id?e.group_id:`${this.hass.localize("component.group.entity_component._.name")} ${t+1}`}
                  <span class="group-actions">
                    <ha-icon-button
                      slot="trigger"
                      .label=${this.hass.localize("ui.common.remove")}
                      .path=${Qe}
                      @click=${()=>this._removeRuleset(t)}
                    ></ha-icon-button>
                  </span>
                </div>
                <div class="content">
                  <ha-form
                    .hass=${this.hass}
                    .data=${this._groupFormData(e)}
                    .schema=${this.getGroupSchema(e)}
                    .computeLabel=${this.computeLabel}
                    @value-changed=${e=>this._groupValueChanged(e,t)}
                  ></ha-form>
                </div>
              </ha-expansion-panel>
            `))}
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
          <ha-svg-icon class="secondary" .path=${"M10 19.11L12.11 17H7V15H14V15.12L16.12 13H7V11H17V12.12L18.24 10.89C18.72 10.41 19.35 10.14 20.04 10.14C20.37 10.14 20.7 10.21 21 10.33V5C21 3.89 20.1 3 19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.9 21 5 21H10V19.11M7 7H17V9H7V7M21.7 14.35L20.7 15.35L18.65 13.3L19.65 12.3C19.86 12.09 20.21 12.09 20.42 12.3L21.7 13.58C21.91 13.79 21.91 14.14 21.7 14.35M12 19.94L18.06 13.88L20.11 15.93L14.06 22H12V19.94Z"}></ha-svg-icon>
          ${this.computeLabel.bind(this)({name:"edit_domains_dc"})}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${l}
            .schema=${s}
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
    `}static get styles(){return s`
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
    `}};$t([me({attribute:!1})],wt.prototype,"hass",void 0),$t([me({type:Object})],wt.prototype,"_config",void 0),$t([pe()],wt.prototype,"_subElementEditorDomain",void 0),$t([pe()],wt.prototype,"_subElementEditorEntity",void 0),$t([pe()],wt.prototype,"rulesets",void 0),wt=$t([de("status-card-editor")],wt),console.info("%c STATUS-CARD %c 2.11.0 ","color: steelblue; background: black; font-weight: bold;","color: white ; background: dimgray; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:"status-card",name:"Status Card",preview:!0,description:"A custom card that displays active entities grouped by domain/device class."})})();
//# sourceMappingURL=status-card.js.map