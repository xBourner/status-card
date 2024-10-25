/*! For license information please see status-card.js.LICENSE.txt */
(()=>{"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class o{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=s.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(i,e))}return e}toString(){return this.cssText}}const n=(e,...t)=>{const s=1===e.length?e[0]:t.reduce(((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1]),e[0]);return new o(s,e,i)},a=(i,s)=>{if(t)i.adoptedStyleSheets=s.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const t of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=t.cssText,i.appendChild(s)}},r=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:d,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:m,getPrototypeOf:_}=Object,p=globalThis,u=p.trustedTypes,g=u?u.emptyScript:"",v=p.reactiveElementPolyfillSupport,y=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},f=(e,t)=>!d(e,t),$={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;class k extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&c(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get(){return s?.call(this)},set(t){const n=s?.call(this);o.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=_(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...h(e),...m(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return a(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EC(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=s,this[s]=o.fromAttribute(t,e.type),this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){if(i??=this.constructor.getPropertyOptions(e),!(i.hasChanged??f)(this[e],t))return;this.P(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(e,t,i){this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$Em!==e&&(this._$Ej??=new Set).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e)!0!==i.wrapped||this._$AL.has(t)||void 0===this[t]||this.P(t,this[t],i)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((e=>e.hostUpdate?.())),this.update(t)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&=this._$Ej.forEach((e=>this._$EC(e,this[e]))),this._$EU()}updated(e){}firstUpdated(e){}}k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[y("elementProperties")]=new Map,k[y("finalized")]=new Map,v?.({ReactiveElement:k}),(p.reactiveElementVersions??=[]).push("2.0.4");const C=globalThis,w=C.trustedTypes,E=w?w.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+x,S=`<${O}>`,D=document,z=()=>D.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,P=Array.isArray,M="[ \t\n\f\r]",B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,L=/>/g,R=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,j=/"/g,H=/^(?:script|style|textarea|title)$/i,T=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),W=T(1),K=(T(2),T(3),Symbol.for("lit-noChange")),G=Symbol.for("lit-nothing"),V=new WeakMap,F=D.createTreeWalker(D,129);function q(e,t){if(!P(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}class Z{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const a=e.length-1,r=this.parts,[d,c]=((e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":3===t?"<math>":"",a=B;for(let t=0;t<i;t++){const i=e[t];let r,d,c=-1,l=0;for(;l<i.length&&(a.lastIndex=l,d=a.exec(i),null!==d);)l=a.lastIndex,a===B?"!--"===d[1]?a=U:void 0!==d[1]?a=L:void 0!==d[2]?(H.test(d[2])&&(o=RegExp("</"+d[2],"g")),a=R):void 0!==d[3]&&(a=R):a===R?">"===d[0]?(a=o??B,c=-1):void 0===d[1]?c=-2:(c=a.lastIndex-d[2].length,r=d[1],a=void 0===d[3]?R:'"'===d[3]?j:I):a===j||a===I?a=R:a===U||a===L?a=B:(a=R,o=void 0);const h=a===R&&e[t+1].startsWith("/>")?" ":"";n+=a===B?i+S:c>=0?(s.push(r),i.slice(0,c)+A+i.slice(c)+x+h):i+x+(-2===c?t:h)}return[q(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]})(e,t);if(this.el=Z.createElement(d,i),F.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=F.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(A)){const t=c[n++],i=s.getAttribute(e).split(x),a=/([.?@])?(.*)/.exec(t);r.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?ee:"?"===a[1]?te:"@"===a[1]?ie:Y}),s.removeAttribute(e)}else e.startsWith(x)&&(r.push({type:6,index:o}),s.removeAttribute(e));if(H.test(s.tagName)){const e=s.textContent.split(x),t=e.length-1;if(t>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],z()),F.nextNode(),r.push({type:2,index:++o});s.append(e[t],z())}}}else if(8===s.nodeType)if(s.data===O)r.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(x,e+1));)r.push({type:7,index:o}),e+=x.length-1}o++}}static createElement(e,t){const i=D.createElement("template");return i.innerHTML=e,i}}function J(e,t,i=e,s){if(t===K)return t;let o=void 0!==s?i.o?.[s]:i.l;const n=N(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,i,s)),void 0!==s?(i.o??=[])[s]=o:i.l=o),void 0!==o&&(t=J(e,o._$AS(e,t.values),o,s)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??D).importNode(t,!0);F.currentNode=s;let o=F.nextNode(),n=0,a=0,r=i[0];for(;void 0!==r;){if(n===r.index){let t;2===r.type?t=new X(o,o.nextSibling,this,e):1===r.type?t=new r.ctor(o,r.name,r.strings,this,e):6===r.type&&(t=new se(o,this,e)),this._$AV.push(t),r=i[++a]}n!==r?.index&&(o=F.nextNode(),n++)}return F.currentNode=D,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this.v}constructor(e,t,i,s){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this.v=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),N(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==K&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>P(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new Q(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new Z(e)),t}k(e){P(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new X(this.O(z()),this.O(z()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this.v=e,this._$AP?.(e))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=J(this,e,t,0),n=!N(e)||e!==this._$AH&&e!==K,n&&(this._$AH=e);else{const s=e;let a,r;for(e=o[0],a=0;a<o.length-1;a++)r=J(this,s[i+a],t,a),r===K&&(r=this._$AH[a]),n||=!N(r)||r!==this._$AH[a],r===G?e=G:e!==G&&(e+=(r??"")+o[a+1]),this._$AH[a]=r}n&&!s&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}class te extends Y{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}}class ie extends Y{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??G)===K)return;const i=this._$AH,s=e===G&&i!==G||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==G&&(i===G||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const oe=C.litHtmlPolyfillSupport;oe?.(Z,X),(C.litHtmlVersions??=[]).push("3.2.0");class ne extends k{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.o=((e,t,i)=>{const s=i?.renderBefore??t;let o=s._$litPart$;if(void 0===o){const e=i?.renderBefore??null;s._$litPart$=o=new X(t.insertBefore(z(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.o?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.o?.setConnected(!1)}render(){return K}}ne._$litElement$=!0,ne.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:ne});const ae=globalThis.litElementPolyfillSupport;ae?.({LitElement:ne}),(globalThis.litElementVersions??=[]).push("4.1.0");const re={af:{edit_domains:"Bewerk Domeine",edit_cover_dc:"Bewerk Dek Geräteklassen",edit_binary_dc:"Bewerk Binêre Sensor Geräteklassen",show_person:"Wys Persone",bulk_mode:"Aktiveer Masseneditiermodus"},ar:{edit_domains:"تعديل المجالات",edit_cover_dc:"تعديل فئات أجهزة التغطية",edit_binary_dc:"تعديل فئات أجهزة الاستشعار الثنائية",show_person:"عرض الكيانات الشخصية",bulk_mode:"تفعيل وضع التحرير بالجملة"},bg:{edit_domains:"Редактиране на домейни",edit_cover_dc:"Редактиране на класове устройства за покритие",edit_binary_dc:"Редактиране на класове устройства за бинарни сензори",show_person:"Показване на лица",bulk_mode:"Активиране на режим за масово редактиране"},bn:{edit_domains:"ডোমেইন সম্পাদনা করুন",edit_cover_dc:"কভার ডিভাইস ক্লাস সম্পাদনা করুন",edit_binary_dc:"বাইনারি সেন্সর ডিভাইস ক্লাস সম্পাদনা করুন",show_person:"ব্যক্তি প্রদর্শন করুন",bulk_mode:"বাল্ক সম্পাদনা মোড সক্রিয় করুন"},bs:{edit_domains:"Uredi domene",edit_cover_dc:"Uredi klase uređaja za pokrivače",edit_binary_dc:"Uredi binarne klase senzora",show_person:"Prikaži osobe",bulk_mode:"Omogući način masovnog uređivanja"},ca:{edit_domains:"Edita dominis",edit_cover_dc:"Edita classes de dispositius de coberta",edit_binary_dc:"Edita classes de sensors binaris",show_person:"Mostrar entitats de persones",bulk_mode:"Activar el mode d'edició massiva"},cs:{edit_domains:"Upravit domény",edit_cover_dc:"Upravit třídy zařízení krytí",edit_binary_dc:"Upravit třídy binárních senzorů",show_person:"Zobrazit osoby",bulk_mode:"Povolit hromadné úpravy"},cy:{edit_domains:"Golygu Domonau",edit_cover_dc:"Golygu Dosbarthiadau Dyfeisiau Cysgodol",edit_binary_dc:"Golygu Dosbarthiadau Synwyryddion Bi-ner",show_person:"Dangos Personau",bulk_mode:"Caniatáu Modd Golygu Mawr"},da:{edit_domains:"Rediger domæner",edit_cover_dc:"Rediger dækklasse enheder",edit_binary_dc:"Rediger binære sensor enheder",show_person:"Vis personer",bulk_mode:"Aktivér masse redigeringsmode"},de:{edit_domains:"Bearbeite Domänen",edit_cover_dc:"Bearbeite Cover Geräteklassen",edit_binary_dc:"Bearbeite Binäre Sensoren Geräteklassen",show_person:"Personen anzeigen",bulk_mode:"Masseneditiermodus aktivieren"},el:{edit_domains:"Επεξεργασία Τομέων",edit_cover_dc:"Επεξεργασία Κατηγοριών Συσκευών Καλύμματος",edit_binary_dc:"Επεξεργασία Κατηγοριών Διψήφιων Αισθητήρων",show_person:"Εμφάνιση Ανθρώπων",bulk_mode:"Ενεργοποίηση Λειτουργίας Μαζικής Επεξεργασίας"},en:{edit_domains:"Edit Domains",edit_cover_dc:"Edit Cover Device Classes",edit_binary_dc:"Edit Binary Sensor Device Classes",show_person:"Show Person Entities",bulk_mode:"Enable Bulk Edit Mode"},eo:{edit_domains:"Redakti domenojn",edit_cover_dc:"Redakti kovrajn aparatojn",edit_binary_dc:"Redakti binarajn sensilojn",show_person:"Montri personojn",bulk_mode:"Ebligi masivan redaktadon"},es:{edit_domains:"Editar Dominios",edit_cover_dc:"Editar Clases de Dispositivos de Cubierta",edit_binary_dc:"Editar Clases de Sensores Binarios",show_person:"Mostrar Entidades de Personas",bulk_mode:"Activar Modo de Edición Masiva"},es419:{edit_domains:"Editar Dominios",edit_cover_dc:"Editar Clases de Dispositivos de Cubierta",edit_binary_dc:"Editar Clases de Sensores Binarios",show_person:"Mostrar Entidades de Personas",bulk_mode:"Activar Modo de Edición Masiva"},et:{edit_domains:"Redigeeri domeene",edit_cover_dc:"Redigeeri katte seadmete klasse",edit_binary_dc:"Redigeeri binaarsete andurite klasse",show_person:"Kuva isikud",bulk_mode:"Luba masstootmisrežiim"},eu:{edit_domains:"Editatu domeinak",edit_cover_dc:"Editatu estaldurako gailuen klaseak",edit_binary_dc:"Editatu sentsore bikoitzeko klaseak",show_person:"Pertsonak erakutsi",bulk_mode:"Gehitu masa-editatzeko modua"},fa:{edit_domains:"ویرایش دامنه‌ها",edit_cover_dc:"ویرایش کلاس‌های دستگاه پوشش",edit_binary_dc:"ویرایش کلاس‌های حسگرهای باینری",show_person:"نمایش موجودیت‌های شخصی",bulk_mode:"فعال کردن حالت ویرایش عمده"},fi:{edit_domains:"Muokkaa alueita",edit_cover_dc:"Muokkaa kattolaitteiden luokkia",edit_binary_dc:"Muokkaa binaaristen antureiden luokkia",show_person:"Näytä henkilöt",bulk_mode:"Ota käyttöön massamuokkaustila"},fy:{edit_domains:"Bewerk domeinen",edit_cover_dc:"Bewerk dek-apparatuerklassen",edit_binary_dc:"Bewerk binaire sensorapparatuerklassen",show_person:"Toon personen",bulk_mode:"Aktivearje massa-bewurkingsmodus"},fr:{edit_domains:"Modifier les domaines",edit_cover_dc:"Modifier les classes de dispositifs de couverture",edit_binary_dc:"Modifier les classes de capteurs binaires",show_person:"Afficher les entités de personnes",bulk_mode:"Activer le mode d'édition en masse"},ga:{edit_domains:"Déan comhoibriú ar na réimsí",edit_cover_dc:"Déan comhoibriú ar na ranganna gléasacha clúdach",edit_binary_dc:"Déan comhoibriú ar na ranganna braiteoirí dé-íogair",show_person:"Taispeáin na daoine",bulk_mode:"Cuir an mód comhoibriú ar aghaidh"},gl:{edit_domains:"Editar dominios",edit_cover_dc:"Editar clases de dispositivos de cobertura",edit_binary_dc:"Editar clases de sensores binarios",show_person:"Amosar entidades de persoas",bulk_mode:"Activar modo de edición en masa"},gsw:{edit_domains:"Bearbeite Domäne",edit_cover_dc:"Bearbeite Cover Gerätekategorien",edit_binary_dc:"Bearbeite binäre Sensorklassen",show_person:"Personen anzeigen",bulk_mode:"Masseneditiermodus aktivieren"},he:{edit_domains:"עריכת תחומים",edit_cover_dc:"עריכת קטגוריות מכשירים מכסים",edit_binary_dc:"עריכת קטגוריות חיישנים בינאריים",show_person:"הצגת ישויות אנשים",bulk_mode:"הפעלת מצב עריכה המוני"},hi:{edit_domains:"डोमेन संपादित करें",edit_cover_dc:"कवरेज उपकरण श्रेणियाँ संपादित करें",edit_binary_dc:"बाइनरी सेंसर उपकरण श्रेणियाँ संपादित करें",show_person:"व्यक्तियाँ दिखाएँ",bulk_mode:"मास संपादन मोड सक्रिय करें"},hr:{edit_domains:"Uredi domene",edit_cover_dc:"Uredi klase uređaja za pokrivače",edit_binary_dc:"Uredi binarne klase senzora",show_person:"Prikaži osobe",bulk_mode:"Omogući način masovnog uređivanja"},hu:{edit_domains:"Domének szerkesztése",edit_cover_dc:"Fedél eszközosztályok szerkesztése",edit_binary_dc:"Bináris érzékelők eszközosztályainak szerkesztése",show_person:"Személyek megjelenítése",bulk_mode:"Tömegszerkesztési mód engedélyezése"},hy:{edit_domains:"Խմբագրել դոմեյնները",edit_cover_dc:"Խմբագրել ծածկող սարքերի դասեր",edit_binary_dc:"Խմբագրել բինարային սենսորների դասեր",show_person:"Ցուցադրել անձինք",bulk_mode:"Արդյունավետ խմբագրելու ռեժիմը ակտիվացնել"},id:{edit_domains:"Edit Domain",edit_cover_dc:"Edit Kelas Perangkat Penutup",edit_binary_dc:"Edit Kelas Sensor Biner",show_person:"Tampilkan Entitas Orang",bulk_mode:"Aktifkan Mode Edit Massal"},it:{edit_domains:"Modifica Domini",edit_cover_dc:"Modifica Classi di Dispositivi di Copertura",edit_binary_dc:"Modifica Classi di Sensori Binari",show_person:"Mostra Entità Personali",bulk_mode:"Attiva Modalità di Modifica di Massa"},is:{edit_domains:"Breyta lénurðum",edit_cover_dc:"Breyta flokkum þakgripa",edit_binary_dc:"Breyta flokkunum af tvístrunarskynjurum",show_person:"Sýna einstaklinga",bulk_mode:"Virknast fjöldabreytandi"},ja:{edit_domains:"ドメインを編集",edit_cover_dc:"カバー デバイス クラスを編集",edit_binary_dc:"バイナリ センサー デバイス クラスを編集",show_person:"人のエンティティを表示",bulk_mode:"バルク編集モードを有効にする"},ka:{edit_domains:"დომენების რედაქტირება",edit_cover_dc:"ზვიგენის მოწყობილობების კლასების რედაქტირება",edit_binary_dc:"ბინარული სენსორების კლასების რედაქტირება",show_person:"პერსონების ჩვენება",bulk_mode:"მასობრივი რედაქტირების რეჟიმის აქტივაცია"},ko:{edit_domains:"도메인 편집",edit_cover_dc:"커버 장치 클래스 편집",edit_binary_dc:"이진 센서 장치 클래스 편집",show_person:"사람 엔티티 표시",bulk_mode:"대량 편집 모드 활성화"},lb:{edit_domains:"Domaine bearbechten",edit_cover_dc:"Dächer Gerät Klassen bearbechten",edit_binary_dc:"Binärsensoren Gerät Klassen bearbechten",show_person:"Persounen weisen",bulk_mode:"Massediteur Modus aktivéieren"},lt:{edit_domains:"Redaguoti domenas",edit_cover_dc:"Redaguoti dengiančių įrenginių klases",edit_binary_dc:"Redaguoti binarinių jutiklių klases",show_person:"Rodyti asmenis",bulk_mode:"Įgalinti masinį redagavimą"},lv:{edit_domains:"Rediģēt domēnus",edit_cover_dc:"Rediģēt seguma ierīču klases",edit_binary_dc:"Rediģēt bināro sensoru klases",show_person:"Rādīt personas",bulk_mode:"Iespējot masveida rediģēšanas režīmu"},mk:{edit_domains:"Уреди домени",edit_cover_dc:"Уреди категории на покривни уреди",edit_binary_dc:"Уреди категории на бинарни сензори",show_person:"Прикажи лица",bulk_mode:"Овозможи режим за масовно уредување"},ml:{edit_domains:"ഡൊമെയ്ൻ എഡിറ്റ് ചെയ്യുക",edit_cover_dc:"കവർ ഉപകരണം വിഭാഗങ്ങൾ എഡിറ്റ് ചെയ്യുക",edit_binary_dc:"ബൈനറി സെൻസർ ഉപകരണം വിഭാഗങ്ങൾ എഡിറ്റ് ചെയ്യുക",show_person:"യൂണിറ്റി കാണിക്കുക",bulk_mode:"ബൾക്ക് എഡിറ്റ് മോഡ് സജീവമാക്കുക"},nl:{edit_domains:"Domeinen bewerken",edit_cover_dc:"Bewerk dekkingsapparaatklassen",edit_binary_dc:"Bewerk binaire sensorapparaatklassen",show_person:"Toon personen",bulk_mode:"Schakel massabewerking in"},nb:{edit_domains:"Rediger domener",edit_cover_dc:"Rediger dekkeklasssenheter",edit_binary_dc:"Rediger binære sensor enheter",show_person:"Vis personer",bulk_mode:"Aktiver massemuligheter"},nn:{edit_domains:"Rediger domener",edit_cover_dc:"Rediger dekking enhetsklasser",edit_binary_dc:"Rediger binære sensor enhetsklasser",show_person:"Vis personer",bulk_mode:"Aktiver massebehandling"},pl:{edit_domains:"Edytuj domeny",edit_cover_dc:"Edytuj klasy urządzeń pokrycia",edit_binary_dc:"Edytuj klasy czujników binarnych",show_person:"Pokaż osoby",bulk_mode:"Włącz tryb edycji zbiorczej"},pt:{edit_domains:"Editar Domínios",edit_cover_dc:"Editar Classes de Dispositivos de Cobertura",edit_binary_dc:"Editar Classes de Sensores Binários",show_person:"Mostrar Entidades de Pessoas",bulk_mode:"Ativar Modo de Edição em Massa"},"pt-BR":{edit_domains:"Editar Domínios",edit_cover_dc:"Editar Classes de Dispositivos de Cobertura",edit_binary_dc:"Editar Classes de Sensores Binários",show_person:"Mostrar Entidades de Pessoas",bulk_mode:"Ativar Modo de Edição em Massa"},ro:{edit_domains:"Editați domeniile",edit_cover_dc:"Editați clasele de dispozitive de acoperire",edit_binary_dc:"Editați clasele senzorilor binari",show_person:"Afișați entitățile persoanelor",bulk_mode:"Activați modul de editare în masă"},ru:{edit_domains:"Редактировать домены",edit_cover_dc:"Редактировать классы устройств покрытия",edit_binary_dc:"Редактировать классы бинарных датчиков",show_person:"Показать лиц",bulk_mode:"Включить режим массового редактирования"},sk:{edit_domains:"Upraviť domény",edit_cover_dc:"Upraviť triedy zariadení pokrývajúcich",edit_binary_dc:"Upraviť triedy binárnych senzorov",show_person:"Zobraziť osoby",bulk_mode:"Povoliť hromadné úpravy"},sl:{edit_domains:"Uredi domene",edit_cover_dc:"Uredi razrede pokrivnih naprav",edit_binary_dc:"Uredi razrede binarnih senzorjev",show_person:"Prikaži osebe",bulk_mode:"Omogoči način množičnega urejanja"},sr:{edit_domains:"Уреди домене",edit_cover_dc:"Уреди класе покривних уређаја",edit_binary_dc:"Уреди класе бинарних сензора",show_person:"Прикажи особе",bulk_mode:"Омогући режим масовног уређивања"},"sr-Latn":{edit_domains:"Uredi domene",edit_cover_dc:"Uredi klase pokrivnih uređaja",edit_binary_dc:"Uredi klase binarnih senzora",show_person:"Prikaži osobe",bulk_mode:"Omogući režim masovnog uređivanja"},sv:{edit_domains:"Redigera domäner",edit_cover_dc:"Redigera klasser för täckningsenheter",edit_binary_dc:"Redigera klasser för binära sensorer",show_person:"Visa personer",bulk_mode:"Aktivera massredigeringsläge"},ta:{edit_domains:"அளவீட்டுகளை திருத்தவும்",edit_cover_dc:"மூடிய சாதன வகைகளை திருத்தவும்",edit_binary_dc:"இருமை உணர்படிகளின் வகைகளை திருத்தவும்",show_person:"மக்கள் செயல்படங்களை காண்பிக்கவும்",bulk_mode:"பெரிய அளவிலான திருத்தம் செயல்முறையை செயல்படுத்தவும்"},te:{edit_domains:"డొమెయిన్ సంపాదించు",edit_cover_dc:"కవర్ పరికరాల వర్గాలను సంపాదించు",edit_binary_dc:"బైనరీ సెన్సార్ పరికరాల వర్గాలను సంపాదించు",show_person:"వ్యక్తుల యూనిటీలను చూపించు",bulk_mode:"బల్క్ సంపాదన మోడ్ చురుకుగా చేయు"},th:{edit_domains:"แก้ไขโดเมน",edit_cover_dc:"แก้ไขประเภทอุปกรณ์ที่ปิด",edit_binary_dc:"แก้ไขประเภทเซ็นเซอร์แบบไบนารี",show_person:"แสดงเอนทิตีบุคคล",bulk_mode:"เปิดใช้งานโหมดแก้ไขกลุ่ม"},tr:{edit_domains:"Alanları düzenle",edit_cover_dc:"Kapatma cihaz sınıflarını düzenle",edit_binary_dc:"İkili sensör cihaz sınıflarını düzenle",show_person:"Kişi varlıklarını göster",bulk_mode:"Toplu düzenleme modunu etkinleştir"},uk:{edit_domains:"Редагувати домени",edit_cover_dc:"Редагувати класи покриттів",edit_binary_dc:"Редагувати класи бінарних датчиків",show_person:"Показати особи",bulk_mode:"Увімкнути режим масового редагування"},ur:{edit_domains:"ڈومین میں ترمیم کریں",edit_cover_dc:"کوریج ڈیوائس کلاسز میں ترمیم کریں",edit_binary_dc:"بائنری سینسر ڈیوائس کلاسز میں ترمیم کریں",show_person:"شخصیات کو دکھائیں",bulk_mode:"بلیک موڈ کو فعال کریں"},vi:{edit_domains:"Chỉnh sửa miền",edit_cover_dc:"Chỉnh sửa các loại thiết bị bảo vệ",edit_binary_dc:"Chỉnh sửa các loại cảm biến nhị phân",show_person:"Hiển thị thực thể cá nhân",bulk_mode:"Kích hoạt chế độ chỉnh sửa hàng loạt"},"zh-Hans":{edit_domains:"编辑域",edit_cover_dc:"编辑覆盖设备类别",edit_binary_dc:"编辑二进制传感器设备类别",show_person:"显示个人实体",bulk_mode:"启用批量编辑模式"},"zh-Hant":{edit_domains:"編輯域",edit_cover_dc:"編輯覆蓋設備類別",edit_binary_dc:"編輯二元感測器設備類別",show_person:"顯示人員實體",bulk_mode:"啟用批量編輯模式"}};function de(e,t="en"){return re[t]&&re[t][e]?re[t][e]:e}class ce extends ne{constructor(){super(),this.entityConfig=this.initializeEntityConfig()}initializeEntityConfig(){return{update:{icon:"mdi:update",sortOrder:1},light:{icon:"mdi:lightbulb",sortOrder:2},media_player:{icon:"mdi:cast",sortOrder:3},lock:{icon:"mdi:lock",sortOrder:4},input_boolean:{icon:"mdi:toggle-switch",sortOrder:5},timer:{icon:"mdi:timer-outline",sortOrder:6},counter:{icon:"mdi:counter",sortOrder:7},switch:{icon:"mdi:power",sortOrder:8},vacuum:{icon:"mdi:robot-vacuum",sortOrder:9},device_tracker:{icon:"mdi:cellphone",sortOrder:10},calendar:{icon:"mdi:calendar",sortOrder:11},climate:{icon:"mdi:thermostat",sortOrder:12},remote:{icon:"mdi:remote",sortOrder:13},fan:{icon:"mdi:fan",sortOrder:14},alarm_control_panel:{icon:"mdi:bell-ring",sortOrder:15},humidifier:{icon:"mdi:air-humidifier",sortOrder:16},lawn_mower:{icon:"mdi:robot-mower",sortOrder:17},siren:{icon:"mdi:alarm-light",sortOrder:18},valve:{icon:"mdi:valve",sortOrder:19},water_heater:{icon:"mdi:water-boiler",sortOrder:20},cover:{icon:{awning:"mdi:window-shutter-open",blind:"mdi:blinds-open",curtain:"mdi:curtains",damper:"mdi:valve",door:"mdi:door-open",garage:"mdi:garage-open",gate:"mdi:gate-open",shade:"mdi:roller-shade",shutter:"mdi:window-shutter-open",window:"mdi:window-open",none:"mdi:window-shutter"},deviceClasses:[{name:"awning",sortOrder:21},{name:"blind",sortOrder:22},{name:"curtain",sortOrder:23},{name:"damper",sortOrder:24},{name:"door",sortOrder:25},{name:"garage",sortOrder:26},{name:"gate",sortOrder:27},{name:"shade",sortOrder:28},{name:"shutter",sortOrder:29},{name:"window",sortOrder:30}]},binary_sensor:{icon:{battery:"mdi:battery-alert",battery_charging:"mdi:battery-charging",carbon_monoxide:"mdi:molecule-co",cold:"mdi:snowflake",connectivity:"mdi:connection",door:"mdi:door-open",garage_door:"mdi:garage-open",gas:"mdi:gas-cylinder",heat:"mdi:thermometer",light:"mdi:brightness-5",lock:"mdi:lock-open",moisture:"mdi:water",motion:"mdi:run",moving:"mdi:car",occupancy:"mdi:seat",opening:"mdi:door-open",plug:"mdi:power-plug",power:"mdi:power-plug",presence:"mdi:home",problem:"mdi:alert-circle",running:"mdi:play",safety:"mdi:shield-alert",smoke:"mdi:smoke-detector",sound:"mdi:volume-high",tamper:"mdi:shield-off",update:"mdi:update",vibration:"mdi:vibrate",window:"mdi:window-open",none:"mdi:alert-circle-outline"},deviceClasses:[{name:"battery",sortOrder:31},{name:"battery_charging",sortOrder:32},{name:"carbon_monoxide",sortOrder:33},{name:"cold",sortOrder:34},{name:"connectivity",sortOrder:35},{name:"door",sortOrder:36},{name:"garage_door",sortOrder:37},{name:"gas",sortOrder:38},{name:"heat",sortOrder:39},{name:"light",sortOrder:40},{name:"lock",sortOrder:41},{name:"moisture",sortOrder:42},{name:"motion",sortOrder:43},{name:"moving",sortOrder:44},{name:"occupancy",sortOrder:45},{name:"opening",sortOrder:46},{name:"plug",sortOrder:47},{name:"power",sortOrder:48},{name:"presence",sortOrder:49},{name:"problem",sortOrder:50},{name:"running",sortOrder:51},{name:"safety",sortOrder:52},{name:"smoke",sortOrder:53},{name:"sound",sortOrder:54},{name:"tamper",sortOrder:55},{name:"update",sortOrder:56},{name:"vibration",sortOrder:57},{name:"window",sortOrder:58}]}}}}customElements.define("status-card",class extends ce{static get properties(){return{hass:{type:Object},areas:{type:Array},devices:{type:Array},entities:{type:Array},config:{type:Object},selectedDomain:{type:String},entitiesInDomain:{type:Array},hideDomains:{type:Array},hideCoverDeviceClasses:{type:Array},hideBinaryDeviceClasses:{type:Array},hiddenEntities:{type:Array},domainIcons:{type:Array},domainNames:{type:Array},domainColors:{type:Array},BinaryDeviceClassNames:{type:Array},CoverDeviceClassNames:{type:Array},CoverDeviceClassIcons:{type:Array},BinaryDeviceClassIcons:{type:Array},BinaryDeviceClassColors:{type:Array},CoverDeviceClassColors:{type:Array},showPerson:{type:Boolean},bulkMode:{type:Boolean}}}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e,this.hass=e.hass,this.areas=[],this.devices=[],this.entities=[],this.entitiesInDomain=[],this.selectedDomain=null,this.hideDomains=e.hide_domains||[],this.hideCoverDeviceClasses=e.hide_cover_deviceClasses||[],this.hideBinaryDeviceClasses=e.hide_binary_deviceClasses||[],this.hiddenEntities=e.hidden_entities||[],this.domainIcons=e.domainIcons||[],this.domainNames=e.domainNames||[],this.domainColors=e.domainColors||[],this.CoverDeviceClassNames=e.CoverDeviceClassNames||[],this.BinaryDeviceClassNames=e.BinaryDeviceClassNames||[],this.CoverDeviceClassIcons=e.CoverDeviceClassIcons||[],this.BinaryDeviceClassIcons=e.BinaryDeviceClassIcons||[],this.CoverDeviceClassColors=e.CoverDeviceClassNames||[],this.BinaryDeviceClassColors=e.BinaryDeviceClassColors||[],this.showPerson=void 0===e.showPerson||e.showPerson,this.bulkMode=void 0!==e.bulkMode&&e.bulkMode}firstUpdated(){this.hass?this._loadData():console.error("HASS instance is not available.")}async _loadData(){if(this.hass)try{this.areas=await this.hass.callWS({type:"config/area_registry/list"}),this.devices=await this.hass.callWS({type:"config/device_registry/list"}),this.entities=await this.hass.callWS({type:"config/entity_registry/list"})}catch(e){console.error("Error loading data:",e)}else console.error("HASS instance is not available.")}getEntityStatus(e){return"device_tracker"===e.type?this.hass.localize("component.person.entity_component._.state.home"):"lock"===e.type||["window","lock","door"].includes(e.originalName)||"cover"===e.type||["awning","blind","curtain","damper","garage","gate","shade","shutter"].includes(e.originalName)?this.hass.localize("component.cover.entity_component._.state.open"):this.hass.localize("component.light.entity_component._.state.on")}getPersonStatus(e){const t=this.hass.states[e.entity_id]?.state;return"home"===t?this.hass.localize("component.person.entity_component._.state.home"):"not_home"===t?this.hass.localize("component.person.entity_component._.state.not_home"):t}getIconForEntity(e){return"binary_sensor"===e.type?this.BinaryDeviceClassIcons?.[e.originalName]||this.entityConfig.binary_sensor?.icon[e.originalName]:"cover"===e.type?this.CoverDeviceClassIcons?.[e.originalName]||this.entityConfig.cover?.icon[e.originalName]:this.domainIcons?.[e.type]||this.entityConfig[e.type]?.icon}getNameForEntity(e){return"binary_sensor"===e.type?this.BinaryDeviceClassNames?.[e.originalName]||this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.binary_sensor.${e.originalName}`):"cover"===e.type?this.CoverDeviceClassNames?.[e.originalName]||this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.cover.${e.originalName}`):this.domainNames?.[e.type]||this.hass.localize(`component.${e.type}.entity_component._.name`)||de(e.type,this.hass.language)}getColorForEntity(e){return"binary_sensor"===e.type?this.BinaryDeviceClassColors?.[e.originalName]||"":"cover"===e.type?this.CoverDeviceClassColors?.[e.originalName]||"":this.domainColors?.[e.type]||""}getSortOrder(e,t){return this._config.newSortOrder&&this._config.newSortOrder[e]?t?void 0!==this._config.newSortOrder[e][t]?this._config.newSortOrder[e][t]:this.initializeEntityConfig()[e]?.deviceClasses?.find((e=>e.name===t))?.sortOrder||1/0:void 0!==this._config.newSortOrder[e]?this._config.newSortOrder[e]:this.initializeEntityConfig()[e]?.sortOrder||1/0:this.initializeEntityConfig()[e]?.sortOrder||1/0}createCard(e){const t=document.createElement(`hui-${e.type}-card`);return t?(t.hass=this.hass,t.setConfig(e),t):W`<p>Kartenkonfiguration fehlgeschlagen</p>`}showMoreInfo(e,t,i){this.selectedDomain=e,this.entitiesInDomain=t,this.selectedEntityName=i,this.requestUpdate();const s=this.shadowRoot.getElementById("more-info-dialog");s&&(s.style.display="block",s.setAttribute("open","true"))}closeMoreInfo(){const e=this.shadowRoot.getElementById("more-info-dialog");e&&(e.removeAttribute("open"),e.style.display="none")}showMorePersonInfo(e){const t=new CustomEvent("hass-more-info",{detail:{entityId:e.entity_id},bubbles:!0,composed:!0});document.querySelector("home-assistant").dispatchEvent(t)}render(){const e=this.initializeEntityConfig(),t=this.showPerson?this.entities.filter((e=>e.entity_id.startsWith("person.")&&!this.hiddenEntities.includes(e.entity_id))):[],i={},s={},o={},n=["closed","locked","off","docked","idle","standby","paused","auto","not_home","disarmed"],a=["unavailable","unknown"];for(const t of this.areas){const r=new Set;for(const e of this.devices)e.area_id===t.area_id&&r.add(e.id);for(const d of this.entities){const c=d.entity_id.split(".")[0],l=this.hass.states[d.entity_id]?.state,h=this.hass.states[d.entity_id]?.attributes.device_class||"none";e[c]&&(!d||!this.hass.states[d.entity_id]||["cover","binary_sensor"].includes(c)||!(d.area_id?d.area_id===t.area_id:r.has(d.device_id))||n.includes(l)||a.includes(l)||this.hiddenEntities.includes(d.entity_id)||(i[c]||(i[c]=[]),i[c].push(d)),"cover"!==c||"on"!==l&&"open"!==l||!(d.area_id?d.area_id===t.area_id:r.has(d.device_id))||this.hiddenEntities.includes(d.entity_id)||e.cover.deviceClasses.some((e=>e.name===h))&&(o[h]||(o[h]=[]),o[h].push(d)),"binary_sensor"!==c||"on"!==l&&"open"!==l||!(d.area_id?d.area_id===t.area_id:r.has(d.device_id))||this.hiddenEntities.includes(d.entity_id)||e.binary_sensor.deviceClasses.some((e=>e.name===h))&&(s[h]||(s[h]=[]),s[h].push(d)))}}const r=[];Object.keys(i).forEach((t=>{r.push({type:t,originalName:t,entities:i[t],sortOrder:e[t]?.sortOrder||100})})),Object.keys(s).forEach((t=>{const i=s[t];r.push({type:"binary_sensor",originalName:t,device_class:t,entities:i,entityCount:i.length,sortOrder:e.binary_sensor.deviceClasses.find((e=>e.name===t))?.sortOrder||100})})),Object.keys(o).forEach((t=>{const i=o[t];r.push({type:"cover",originalName:t,device_class:t,entities:i,entityCount:i.length,sortOrder:e.cover.deviceClasses.find((e=>e.name===t))?.sortOrder||100})})),r.sort(((e,t)=>this.getSortOrder(e.type,e.device_class)-this.getSortOrder(t.type,t.device_class)));const d=this._config?.extra_entities||[];return W`
      <ha-card>
        <paper-tabs selected="0" scrollable hide-scroll-buttons>
          ${t.map((e=>W`
            <paper-tab @click=${()=>this.showMorePersonInfo(e)}>
              <div class="entity">
                <div class="entity-icon">
                  <img src="${this.hass.states[e.entity_id]?.attributes.entity_picture||""}" alt="Person Picture" />
                </div>
                <div class="entity-info">
                  <div class="entity-name">${this.hass.states[e.entity_id]?.attributes.friendly_name}</div>
                  <div class="entity-state">${this.getPersonStatus(e)}</div>
                </div>
              </div>
            </paper-tab>
          `))}
        
            ${d.map((({entity:e,status:t,icon:i,color:s})=>{const o=e?this.hass.states[e]:null,n=o?.attributes?.friendly_name||e;return o&&o.state===t?W`
                  <paper-tab>
                    <div class="extra-entity">
                      <div class="entity-icon" style="color: var(--${s||""}-color);">
                        <ha-icon icon="${i}"></ha-icon>
                      </div>
                      <div class="entity-info">
                        <div class="entity-name">${n}</div>
                        <div class="entity-state">${de(o?.state,this.hass.language)}</div>
                      </div>
                    </div>
                  </paper-tab>
                `:null}))}
          
          ${r.filter((e=>!this.hideDomains.includes(e.type))).filter((e=>"binary_sensor"!==e.type||!this.hideBinaryDeviceClasses.includes(e.originalName))).filter((e=>"cover"!==e.type||!this.hideCoverDeviceClasses.includes(e.originalName))).map((e=>W`
              <paper-tab @click=${()=>this.showMoreInfo(e.type,e.entities,this.getNameForEntity(e))}>
                <div class="entity">
                  <div class="entity-icon" style="color: var(--${this.getColorForEntity(e)||""}-color);">
                    <ha-icon icon="${this.getIconForEntity(e)}"></ha-icon>
                  </div>
                  <div class="entity-info">
                    <div class="entity-name">${this.getNameForEntity(e)}</div>
                    <div class="entity-state">
                      ${e.entities.length} ${this.getEntityStatus(e)}
                    </div>
                  </div>
                </div>
              </paper-tab>
            `))}              
            </paper-tabs>
          </ha-card>
      
          <ha-dialog id="more-info-dialog" style="display:none;">
            <div class="dialog-header">
              <ha-icon-button slot="navigationIcon" dialogaction="cancel" @click=${()=>this.closeMoreInfo()} title="Schließen">
                <ha-icon icon="mdi:close"></ha-icon>
              </ha-icon-button>
              <h3>${this.hass.localize("ui.panel.lovelace.editor.card.entities.name")} in ${this.selectedEntityName}:</h3>
            </div>
      
          <div class="tile-container">
            ${this.bulkMode?W`
                  <ul class="entity-list">
                    ${this.entitiesInDomain.map((e=>W`
                      <li class="entity-item">- ${e.entity_id}</li>
                    `))}
                  </ul>`:W`
                ${this.entitiesInDomain.map((e=>W`
                  <div class="entity-card" .entity="${e.entity_id}">
                    ${this.createCard({type:"tile",entity:e.entity_id,..."light"===this.selectedDomain&&{features:[{type:"light-brightness"}]},..."cover"===this.selectedDomain&&{features:[{type:"cover-open-close"},{type:"cover-position"}]}})}
                  </div>
                `))}
              `}
          </div>
        </ha-dialog>
        `}static get styles(){return n`  
          paper-tabs {
            height: 110px;
          }
          .entity {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .extra-entity {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .entity-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-background-color);
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
          .entity-info {
            text-align: center;
            margin-top: 5px;
          }
          .entity-name {
            font-weight: bold;
            margin-bottom: 2px;
          }   
          .entity-state {
            color: var(--secondary-text-color);
            font-size: 0.9em;
          }   
          .dialog-header {
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          .dialog-header ha-icon-button {
            margin-right: 10px;
          }
          .dialog-header h3 {
            margin-bottom: 10px;
          }
          ha-dialog#more-info-dialog {
            --mdc-dialog-max-width: 90vw;
          }
          .tile-container {
            display: flex;
            flex-wrap: wrap; 
            gap: 4px; 
            padding: 10px;
          }  
          .entity-card {
            width: 21vw;
            box-sizing: border-box;
          }
          .entity-list {
            list-style: none; 
          }            
          @media (max-width: 768px) {
            .tile-container {
              justify-content: center;
            }
            .entity-card {
              flex-basis: 100%;
              max-width: 100%;
            }
          }    
    `}static getConfigElement(){return document.createElement("status-card-editor")}static getStubConfig(){return{}}}),customElements.define("status-card-editor",class extends ce{static get properties(){return{hass:{},_config:{},openedDomains:{type:Array},openedDeviceClasses:{type:Array},coverDeviceClasses:{type:Array},binaryDeviceClasses:{type:Array},extraEntity:{type:String},extraEntityStatus:{type:String}}}constructor(){super(),this.openedDomains=[],this.openedDeviceClasses=[],this._config={extra_entities:[]}}setConfig(e){this._config=e,this._config.extra_entities=this._config.extra_entities||[]}connectedCallback(){super.connectedCallback()}configChanged(e){const t=new Event("config-changed",{bubbles:!0,composed:!0});t.detail={config:e},this.dispatchEvent(t)}_computeLabel(e){const t=this.data?.domain,i=this.data?.deviceClass?.name;return{entity:this.hass.localize("ui.components.selectors.selector.types.entity"),status:this.hass.localize("ui.components.selectors.selector.types.state"),color:this.hass.localize("ui.panel.lovelace.editor.card.tile.color"),icon:this.hass.localize("ui.components.selectors.selector.types.icon"),showPerson:de("show_person",this.hass.language),bulkMode:de("bulk_mode",this.hass.language),hideDomain:`${this.hass.localize(`component.${t}.entity_component._.name`)} ${this.hass.localize("ui.common.disable")}`,hideCoverDeviceClass:`${this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.cover.${i}`)} ${this.hass.localize("ui.common.disable")}`,hideBinaryDeviceClass:`${this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.binary_sensor.${i}`)} ${this.hass.localize("ui.common.disable")}`,domainName:this.hass.localize("ui.panel.lovelace.editor.cardpicker.domain"),deviceClassName:"Device Class",sortOrder:"Sort Order"}[e.name]}updateSortOrder(e,t,i){this._config.newSortOrder||(this._config.newSortOrder={}),this._config.newSortOrder[e]||(this._config.newSortOrder[e]={}),t?this._config.newSortOrder[e][t]=i:this._config.newSortOrder[e]=i,this.configChanged(this._config),this.requestUpdate()}_addExtraEntity(){this._config.extra_entities||(this._config.extra_entities=[]),this._config.extra_entities.push({entity:"",status:"",icon:"",color:""}),this.configChanged(this._config)}_updateEntity(e,t,i){this._config.extra_entities[e][t]=i,this.configChanged(this._config)}_removeExtraEntity(e){this._config.extra_entities.splice(e,1),this.configChanged(this._config)}toggleDetails(e,t,i){const s=`${t}-${i}`;"domain"===e?this.openedDomains=this.toggleArrayItem(this.openedDomains,t):"deviceClass"===e&&(this.openedDeviceClasses=this.toggleArrayItem(this.openedDeviceClasses,s)),this.requestUpdate()}toggleArrayItem(e,t){return e.includes(t)?e.filter((e=>e!==t)):[...e,t]}updateIcon(e,t,i){this._config[e]||(this._config[e]={}),this._config[e][t]=i,this.configChanged(this._config)}updateName(e,t,i){this._config[e]||(this._config[e]={}),this._config[e][t]=i,this.configChanged(this._config)}updateColor(e,t,i){this._config[e]||(this._config[e]={}),this._config[e][t]=i,this.configChanged(this._config)}toggleSetting(e,t,i){"showPerson"===e&&(this._config.showPerson=i),"bulkMode"===e?this._config.bulkMode=i:"domains"===e?(this._config.hide_domains||(this._config.hide_domains=[]),i?this._config.hide_domains.push(t):this._config.hide_domains=this._config.hide_domains.filter((e=>e!==t))):"binary_deviceClass"===e?(this._config.hide_binary_deviceClasses||(this._config.hide_binary_deviceClasses=[]),i?this._config.hide_binary_deviceClasses.push(t):this._config.hide_binary_deviceClasses=this._config.hide_binary_deviceClasses.filter((e=>e!==t))):"cover_deviceClass"===e&&(this._config.hide_cover_deviceClasses||(this._config.hide_cover_deviceClasses=[]),i?this._config.hide_cover_deviceClasses.push(t):this._config.hide_cover_deviceClasses=this._config.hide_cover_deviceClasses.filter((e=>e!==t))),this.configChanged(this._config)}addHiddenEntity(e){e&&!this._config.hidden_entities?.includes(e)&&(this._config.hidden_entities=this._config.hidden_entities||[],this._config.hidden_entities.push(e),this.configChanged(this._config))}removeHiddenEntity(e){this._config.hidden_entities=this._config.hidden_entities.filter((t=>t!==e)),this.configChanged(this._config)}render(){return this._config?W`
      <div>
        <div class=toggle> 
        <ha-form
          .schema=${[{name:"showPerson",selector:{boolean:{}}}]}
          .data=${{showPerson:void 0===this._config.showPerson||this._config.showPerson}}
          .hass=${this.hass}
          .computeLabel=${this._computeLabel}
          @value-changed=${e=>{const t=e.detail.value.showPerson;this.toggleSetting("showPerson",null,t)}}>
        </ha-form>
        <ha-form
          .schema=${[{name:"bulkMode",selector:{boolean:{}}}]}
          .data=${{bulkMode:this._config.bulkMode}}
          .hass=${this.hass}
          .computeLabel=${this._computeLabel}
          @value-changed=${e=>{const t=e.detail.value.bulkMode;this.toggleSetting("bulkMode",null,t)}}>
        </ha-form>
        </div>

        <p  @click=${()=>this.toggleDetails("domain","customization")} class="toggle-header">
        ${de("edit_domains",this.hass.language)}
          <ha-icon icon="${this.openedDomains.includes("customization")?"hass:chevron-up":"hass:chevron-down"}"></ha-icon>
        </p>
        ${this.openedDomains.includes("customization")?W`
          <div class="checkbox-group">
            ${Object.keys(this.entityConfig).filter((e=>"cover"!==e&&"binary_sensor"!==e)).map((e=>W`
                <div class="domain-container">
                  <div @click=${()=>this.toggleDetails("domain",e)} class="domain-header">
                    ${this.hass.localize(`component.${e}.entity_component._.name`)||e}
                    <ha-icon class="toggle-icon" icon="${this.openedDomains.includes(e)?"hass:chevron-up":"hass:chevron-down"}"></ha-icon>
                  </div>
                  ${this.openedDomains.includes(e)?W`
                    <div class="domain-settings">
                      <ha-form
                        .schema=${[{name:"hideDomain",selector:{boolean:{}}}]}
                        .data=${{hideDomain:this._config.hide_domains?.includes(e),domain:e}}
                        .hass=${this.hass}
                        .computeLabel=${this._computeLabel}
                        @value-changed=${t=>{const i=t.detail.value.hideDomain;this.toggleSetting("domains",e,i)}}>
                      </ha-form>

                      <ha-form
                        .schema=${[{name:"domainName",selector:{text:{}}}]}
                        .data=${{domainName:this._config.domainNames?.[e]||""}}
                        .hass=${this.hass}
                        .computeLabel=${this._computeLabel}
                        @value-changed=${t=>{const i=t.detail.value.domainName;this.updateName("domainNames",e,i)}}>
                      </ha-form>

<ha-form
  .schema=${[{name:"icon",selector:{icon:{}}}]}
  .data=${this._config.domainIcons?.[e]?{icon:this._config.domainIcons[e]}:{icon:""}}
  .hass=${this.hass}
  .computeLabel=${this._computeLabel}
  @value-changed=${t=>{const i=t.detail.value.icon;this.updateIcon("domainIcons",e,i)}}>
</ha-form>



                      <ha-form
                        .schema=${[{name:"color",selector:{ui_color:{}}}]}
                        .data=${{color:this._config.domainColors?.[e]||""}}
                        .hass=${this.hass}
                        .computeLabel=${this._computeLabel}
                        @value-changed=${t=>{const i=t.detail.value.color;this.updateColor("domainColors",e,i)}}>
                      </ha-form>

                      <ha-form
                        .schema=${[{name:"sortOrder",selector:{number:{}}}]}
                        .data=${{sortOrder:void 0!==this._config.newSortOrder?.[e]?this._config.newSortOrder?.[e]:this.entityConfig[e]?.sortOrder||0}} 
                        .hass=${this.hass}
                        .computeLabel=${this._computeLabel}
                        @value-changed=${t=>{const i=Number(t.detail.value.sortOrder);this.newSortOrder=i,this.updateSortOrder(e,null,i)}}>
                      </ha-form>

                    </div>
                  `:""}
                </div>
              `))}
          </div>
        `:""}

        <p @click=${()=>this.toggleDetails("deviceClass","cover")} class="toggle-header">
          ${de("edit_cover_dc",this.hass.language)} 
          <ha-icon icon="${this.openedDeviceClasses.some((e=>e.startsWith("cover-")))?"hass:chevron-up":"hass:chevron-down"}" class="toggle-icon"></ha-icon>
        </p>
        ${this.openedDeviceClasses.some((e=>e.startsWith("cover-")))?W`
          <div class="checkbox-group">
            ${this.entityConfig.cover.deviceClasses.map((e=>W`
              <div class="domain-container">
                <div 
                  @click=${()=>this.toggleDetails("deviceClass","cover",e.name)} 
                  class="domain-header">

                  ${this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.cover.${e.name}`)}

                  <ha-icon class="toggle-icon"
                    icon="${this.openedDeviceClasses.includes(`cover-${e.name}`)?"hass:chevron-up":"hass:chevron-down"}">
                  </ha-icon>
                </div>

                ${this.openedDeviceClasses.includes(`cover-${e.name}`)?W`
                  <div class="domain-settings">
                    <ha-form
                      .schema=${[{name:"hideCoverDeviceClass",selector:{boolean:{}}}]}
                      .data=${{hideCoverDeviceClass:this._config.hide_cover_deviceClasses?.includes(e.name),deviceClass:{name:e.name}}}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${t=>{const i=t.detail.value.hideCoverDeviceClass;this.toggleSetting("cover_deviceClass",e.name,i)}}>
                    </ha-form>

                    <ha-form
                      .schema=${[{name:"deviceClassName",selector:{text:{}}}]}
                      .data=${{deviceClassName:this._config.CoverDeviceClassNames?.[e.name]||""}}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${t=>{const i=t.detail.value.deviceClassName;this.updateName("CoverDeviceClassNames",e.name,i)}}>
                    </ha-form>

                    <ha-form
                      .schema=${[{name:"icon",selector:{icon:{}}}]}
                      .data=${{icon:this._config.CoverDeviceClassIcons?.[e.name]||""}}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${t=>{const i=t.detail.value.icon;this.updateIcon("CoverDeviceClassIcons",e.name,i)}}>
                    </ha-form>

                    <ha-form
                      .schema=${[{name:"color",selector:{ui_color:{}}}]}
                      .data=${{color:this._config.CoverDeviceClassColors?.[e.name]||""}}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${t=>{const i=t.detail.value.color;this.updateColor("CoverDeviceClassColors",e.name,i)}}>
                    </ha-form>


                    <ha-form
                      .schema=${[{name:"sortOrder",selector:{number:{}}}]}
                      .data=${{sortOrder:void 0!==this._config.newSortOrder?.cover?.[e.name]?this._config.newSortOrder.cover[e.name]:e.sortOrder||0}}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${t=>{const i=Number(t.detail.value.sortOrder);this.updateSortOrder("cover",e.name,i)}}>
                    </ha-form>


                  </div>
                `:""}
              </div>
            `))}
          </div>
        `:""}


        <p @click=${()=>this.toggleDetails("deviceClass","binary_sensor")} class="toggle-header">
            ${de("edit_binary_dc",this.hass.language)}
          <ha-icon icon="${this.openedDeviceClasses.some((e=>e.startsWith("binary_sensor-")))?"hass:chevron-up":"hass:chevron-down"}"></ha-icon>
        </p>
        ${this.openedDeviceClasses.some((e=>e.startsWith("binary_sensor-")))?W`
          <div class="checkbox-group">
            ${this.entityConfig.binary_sensor.deviceClasses.map((e=>W`
              <div class="domain-container">
                <div 
                  @click=${()=>this.toggleDetails("deviceClass","binary_sensor",e.name)} 
                  class="domain-header">

                  ${this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.binary_sensor.${e.name}`)}
                  
                  <ha-icon class="toggle-icon"
                    icon="${this.openedDeviceClasses.includes(`binary_sensor-${e.name}`)?"hass:chevron-up":"hass:chevron-down"}">
                  </ha-icon>

                  
                </div>

                ${this.openedDeviceClasses.includes(`binary_sensor-${e.name}`)?W`
                  <div class="domain-settings">

                    <ha-form
                      .schema=${[{name:"hideBinaryDeviceClass",selector:{boolean:{}}}]}
                      .data=${{hideBinaryDeviceClass:this._config.hide_binary_deviceClasses?.includes(e.name),deviceClass:{name:e.name}}}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${t=>{const i=t.detail.value.hideBinaryDeviceClass;this.toggleSetting("binary_deviceClass",e.name,i)}}>
                    </ha-form>


                    <ha-form
                      .schema=${[{name:"deviceClassName",selector:{text:{}}}]}
                      .data=${{deviceClassName:this._config.BinaryDeviceClassNames?.[e.name]||""}}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${t=>{const i=t.detail.value.deviceClassName;this.updateName("BinaryDeviceClassNames",e.name,i)}}>
                    </ha-form>

                    <ha-form
                      .schema=${[{name:"icon",selector:{icon:{}}}]}
                      .data=${{icon:this._config.BinaryDeviceClassIcons?.[e.name]||""}}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${t=>{const i=t.detail.value.icon;this.updateIcon("BinaryDeviceClassIcons",e.name,i)}}>
                    </ha-form>

                    <ha-form
                      .schema=${[{name:"color",selector:{ui_color:{}}}]}
                      .data=${{color:this._config.BinaryDeviceClassColors?.[e.name]||""}}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${t=>{const i=t.detail.value.color;this.updateColor("BinaryDeviceClassColors",e.name,i)}}>
                    </ha-form>

                    <ha-form
                      .schema=${[{name:"sortOrder",selector:{number:{}}}]}
                      .data=${{sortOrder:void 0!==this._config.newSortOrder?.binary_sensor?.[e.name]?this._config.newSortOrder.binary_sensor[e.name]:e.sortOrder||0}}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${t=>{const i=Number(t.detail.value.sortOrder);this.updateSortOrder("binary_sensor",e.name,i)}}>
                    </ha-form>
                  </div>
                `:""}
              </div>
            `))}
          </div>
        `:""}

        <div class=extra-entities>  
          <h2>Extra ${this.hass.localize("ui.panel.lovelace.editor.card.entities.name")}</h2>   
          <ha-icon-button 
            @click=${()=>this._addExtraEntity()}>
            <ha-icon class="extra-entitities-icon" icon="mdi:plus"></ha-icon>
          </ha-icon-button>
        </div>


        ${this._config.extra_entities.map(((e,t)=>W`
          <div class="extra-entity-input">
            <ha-form
              .schema=${[{name:"entity",selector:{entity:{}}}]}
              .data=${{entity:e.entity}}
              .hass=${this.hass}
              .computeLabel=${this._computeLabel}
              @value-changed=${e=>{const i=e.detail.value.entity;this._updateEntity(t,"entity",i)}}>
            </ha-form>

            <ha-form
              .schema=${[{name:"status",selector:{text:{}}}]}
              .data=${{status:e.status}}
              .hass=${this.hass}
              .computeLabel=${this._computeLabel}
              @value-changed=${e=>{const i=e.detail.value.status;this._updateEntity(t,"status",i)}}>
            </ha-form>
          </div>
          <div class="extra-entity-input-down">
              <ha-form
                .schema=${[{name:"icon",selector:{icon:{}}}]}
                .data=${{icon:e.icon||""}}
                .hass=${this.hass}
                .computeLabel=${this._computeLabel}
                @value-changed=${e=>{const i=e.detail.value.icon;this._updateEntity(t,"icon",i)}}>
              </ha-form>

              <ha-form
                .schema=${[{name:"color",selector:{ui_color:{}}}]}
                .data=${{color:e.color||""}}
                .hass=${this.hass}
                .computeLabel=${this._computeLabel}
                @value-changed=${e=>{const i=e.detail.value.color;this._updateEntity(t,"color",i)}}>
              </ha-form>

              <ha-icon-button
                class="remove-button"
                icon="mdi:minus"
                @click=${()=>this._removeExtraEntity(t)}>
                <ha-icon icon="mdi:minus"></ha-icon>
              </ha-icon-button>
          </div>
        `))}

        <div>
          <h2>${this.hass.localize("ui.panel.lovelace.editor.entities.remove")}</h2>
          <div class="entity-picker-container">
            <ha-form
              .schema=${[{name:"entity",selector:{entity:{}}}]}
              .hass=${this.hass}
              .computeLabel=${this._computeLabel}
              @value-changed=${e=>{this.addHiddenEntity(e.detail.value.entity)}}>
            </ha-form>
          </div>
        </div>
  
        ${this._config.hidden_entities&&this._config.hidden_entities.length>0?W`
          <h3>
            ${this.hass.localize("ui.dialogs.entity_registry.editor.disabled_label")}: 
          </h3>
          <ul>
            ${this._config.hidden_entities.map((e=>W`
              <li class="hidden-entity">
                ${e}
                <mwc-button @click=${()=>this.removeHiddenEntity(e)}>${this.hass.localize("ui.common.remove")}</mwc-button>
              </li>
            `))}
          </ul>
        `:""}
      </div>
    `:W`<div>Keine Konfiguration gefunden</div>`}static get styles(){return n`  
      ha-card {
        padding: 16px;
      }
      .domain-group {
        margin-bottom: 16px;
        cursor: pointer;
      }
      h2 {
        margin: 0;
        padding: 8px 0;
        font-size: 18px;
        display: flex;
        align-items: center;
      }
      ha-icon {
        margin-right: 8px;
      }
      .person-entity {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }
      .hidden-entity {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .checkbox-group {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 16px;
      }
      .checkbox-group label {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        cursor: pointer;
        flex-wrap: wrap; 
      }
      .domain-settings {
        margin-left: 20px;
        padding: 10px 0;
      }         
      .domain-container {
        flex: 1 1 calc(50% - 16px);
        box-sizing: border-box; 
      }
      .entity-picker-container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      .entity-picker-container ha-form {
        width: 100%; 
      }
      .entity-picker-container mwc-button {
        align-self: flex-end;
        margin-top: 8px; 
      }
      .row {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .entity-picker {
        flex: 7;
      }
      .status-text {
        flex: 3;
      }
      .extra-entities {
        display: flex;
        justify-content: space-between; 
        align-items: center; 
      }
      .extra-entity-input {
        display: flex;
        gap: 10px;
        margin-bottom: 5px;
      }
      .extra-entity-input > ha-form:nth-of-type(1) {
        flex:8;
      }
      .extra-entity-input > ha-form:nth-of-type(2) {
        flex: 2;
      }      
      .extra-entity-input-down {
        display: flex;
        gap: 10px;
      }
      .extra-entity-input-down > ha-form:nth-of-type(1) {
        flex:5;
      }
      .extra-entity-input-down > ha-form:nth-of-type(2) {
        flex: 3;
      }   
      .toggle {
        display: flex;
        gap: 20px;
        padding: 0 10px 0 10px;
      }
      .toggle > ha-form:nth-of-type(1) {
        flex:1;
      }

      .toggle > ha-form:nth-of-type(2) {
        flex: 1;
      }   
      .toggle-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--expansion-panel-summary-padding, 0 8px);
        border: 1px solid var(--divider-color); 
        border-radius: 4px; 
        cursor: pointer; 
        background-color: var(--paper-card-background-color);
        margin-bottom: 5px;
        font-weight: 500;
        min-height: 48px;
      }
      .domain-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--expansion-panel-summary-padding, 0 8px);
        border: 1px solid var(--divider-color); 
        border-radius: 4px; 
        cursor: pointer; 
        background-color: var(--paper-card-background-color);
        margin: 0 3px 5px 3px;
        font-weight: 500;
        min-height: 36px;
      }
      .toggle-icon {
        margin-left: auto;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"status-card",name:"Status Card",preview:!0,description:"A custom card that displays active entities grouped by domain.",documentationURL:"https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card"})})();