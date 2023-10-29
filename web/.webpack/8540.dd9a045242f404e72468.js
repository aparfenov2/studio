"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8540],{92897:(w,R,t)=>{t.d(R,{MessageReader:()=>K});const z=new TextDecoder;function x(n){if(n.length>=50)return z.decode(n);for(let e=0;e<n.length;e++)if(n[e]&128)return z.decode(n);return String.fromCharCode.apply(null,n)}function L(n,e){return n==null&&console.warn("bigint arrays are not supported in this environment"),(i,f,l)=>{if(n==null)throw new Error("bigint arrays are not supported in this environment");let v=f;const p=i.byteOffset+v,m=n.BYTES_PER_ELEMENT*l,Z=i.byteLength-f;if(m<0||m>Z)throw new RangeError(`Array(${e}) deserialization error: size ${m}, maxSize ${Z}`);if(p%n.BYTES_PER_ELEMENT===0)return new n(i.buffer,p,l);if(l<10){const I=new n(l);for(let D=0;D<l;++D)I[D]=i[e](v,!0),v+=n.BYTES_PER_ELEMENT;return I}const B=new Uint8Array(m);return B.set(new Uint8Array(i.buffer,p,m)),new n(B.buffer,B.byteOffset,l)}}const S=new Map([["bool",1],["int8",1],["uint8",1],["int16",2],["uint16",2],["int32",4],["uint32",4],["int64",8],["uint64",8],["float32",4],["float64",8],["time",8],["duration",8]]),d={bool:(n,e)=>n.getUint8(e)!==0,int8:(n,e)=>n.getInt8(e),uint8:(n,e)=>n.getUint8(e),int16:(n,e)=>n.getInt16(e,!0),uint16:(n,e)=>n.getUint16(e,!0),int32:(n,e)=>n.getInt32(e,!0),uint32:(n,e)=>n.getUint32(e,!0),int64:(n,e)=>n.getBigInt64(e,!0),uint64:(n,e)=>n.getBigUint64(e,!0),float32:(n,e)=>n.getFloat32(e,!0),float64:(n,e)=>n.getFloat64(e,!0),time:(n,e)=>{const i=n.getUint32(e,!0),f=n.getUint32(e+4,!0);return{sec:i,nsec:f}},duration:(n,e)=>{const i=n.getInt32(e,!0),f=n.getInt32(e+4,!0);return{sec:i,nsec:f}},string:(n,e)=>{const i=n.getUint32(e,!0),f=n.byteOffset+e+4,l=n.byteLength-e;if(i<0||i>l)throw new RangeError(`String deserialization error: length ${i}, maxLength ${l}`);const v=new Uint8Array(n.buffer,f,i);return x(v)},boolArray:(n,e,i)=>{let f=e;const l=new Array(i);for(let v=0;v<i;++v)l[v]=d.bool(n,f),f+=1;return l},int8Array:L(Int8Array,"getInt8"),uint8Array:L(Uint8Array,"getUint8"),int16Array:L(Int16Array,"getInt16"),uint16Array:L(Uint16Array,"getUint16"),int32Array:L(Int32Array,"getInt32"),uint32Array:L(Uint32Array,"getUint32"),int64Array:L(typeof BigInt64Array=="function"?BigInt64Array:void 0,"getBigInt64"),uint64Array:L(typeof BigUint64Array=="function"?BigUint64Array:void 0,"getBigUint64"),float32Array:L(Float32Array,"getFloat32"),float64Array:L(Float64Array,"getFloat64"),timeArray:(n,e,i)=>{let f=e;const l=new Array(i),v=n.byteOffset+f;if(v%Int32Array.BYTES_PER_ELEMENT===0){const p=new Int32Array(n.buffer,v,i*2);for(let m=0,Z=0;m<i;++m,Z=Z+2)l[m]={sec:p[Z],nsec:p[Z+1]}}else for(let p=0;p<i;++p)l[p]={sec:n.getInt32(f,!0),nsec:n.getInt32(f+4,!0)},f+=8;return l},durationArray:(n,e,i)=>d.timeArray(n,e,i),fixedArray:(n,e,i,f,l)=>{let v=e;const p=new Array(i);for(let m=0;m<i;++m)p[m]=f(n,v),v+=l(n,v);return p},dynamicArray:(n,e,i,f)=>{const l=n.getUint32(e,!0);return d.fixedArray(n,e+4,l,i,f)}},h={string:(n,e)=>{const i=n.getUint32(e,!0),f=n.byteLength-e-4;if(i<0||i>f)throw new RangeError(`String length error: length ${i}, maxLength ${f}`);return 4+i},fixedArray:(n,e,i,f)=>{let l=e,v=0;for(let m=0;m<i;++m){const Z=f(n,l);v+=Z,l+=Z}const p=n.byteLength-e;if(v>p)throw new RangeError(`Fixed array length error: size ${v}, maxSize ${p}`);return v},array:(n,e,i)=>{let f=e;const l=n.getUint32(f,!0);let v=4;f+=4;for(let m=0;m<l;++m){const Z=i(n,f);v+=Z,f+=Z}const p=n.byteLength-e;if(v>p)throw new RangeError(`Dynamic array length error: size ${v}, maxSize ${p}`);return v}};function o(n){return n.replace(/^[0-9]|[^a-zA-Z0-9_]/g,"_")}function a(n){if(n.isConstant===!0)return"";const e=fixedSizeTypes.get(n.type);if(e==null){const i=n.type==="string"?"builtinSizes.string":`${o(n.type)}.size`;return n.isArray===!0?n.arrayLength!=null?`
          static __${n.name}$size(view /* dataview */, offset) {
              return builtinSizes.fixedArray(view, offset, ${n.arrayLength}, ${i});
          }`:`
          static __${n.name}$size(view /* dataview */, offset) {
              return builtinSizes.array(view, offset, ${i});
          }`:`
      static __${n.name}$size(view /* dataview */, offset) {
          return ${i}(view, offset);
      }`}else return n.isArray===!0?n.arrayLength!=null?`
          static __${n.name}$size(view /* dataview */, offset) {
            return ${e} * ${n.arrayLength};
          }`:`
          static __${n.name}$size(view /* dataview */, offset) {
            const len = view.getUint32(offset, true);
            return 4 + len * ${e};
          }`:`
      static __${n.name}$size(view /* dataview */, offset) {
          return ${e};
      }`}function u(n,e){if(e.isConstant===!0)return"";const i=fixedSizeTypes.get(e.type),f=e.isArray===!0&&e.arrayLength!=null;if(i!=null&&(f||e.isArray===!1))if(e.arrayLength!=null){const l=i*e.arrayLength;return`
        // ${e.type}[${e.arrayLength}] ${e.name}
        totalSize += ${l};
        offset += ${l};
      `}else return`
        // ${e.type} ${e.name}
        totalSize += ${i};
        offset += ${i};
      `;return`
    // ${e.type} ${e.name}
    {
        const size = ${n}.__${e.name}$size(view, offset);
        totalSize += size;
        offset += size;
    }
    `}function A(n){if(n.isConstant===!0)return"";const e=n.type in deserializers,i=n.type in h,f=e?`deserializers.${n.type}`:`${o(n.type)}.build`,l=i?`builtinSizes.${n.type}`:`${o(n.type)}.size`,v=fixedSizeTypes.get(n.type);if(n.isArray===!0){const p=n.arrayLength;return p!=null?v!=null?`
          // ${n.type}[${p}] ${n.name}
          get ${n.name}() {
            const offset = this.__${n.name}$offset(this.#view, this.#offset);
            return deserializers.${n.type}Array(this.#view, offset, ${p});
          }`:`
        // ${n.type}[${p}] ${n.name}
          get ${n.name}() {
            const offset = this.__${n.name}$offset(this.#view, this.#offset);
            return deserializers.fixedArray(this.#view, offset, ${p}, ${f}, ${l});
          }`:v!=null?`
          // ${n.type}[] ${n.name}
          get ${n.name}() {
            const offset = this.__${n.name}$offset(this.#view, this.#offset);
            const len = this.#view.getUint32(offset, true);
            return deserializers.${n.type}Array(this.#view, offset + 4, len);
          }`:`
          // ${n.type}[] ${n.name}
          get ${n.name}() {
            const offset = this.__${n.name}$offset(this.#view, this.#offset);
            return deserializers.dynamicArray(this.#view, offset, ${f}, ${l});
          }`}else return`get ${n.name}() {
        const offset = this.__${n.name}$offset(this.#view, this.#offset);
        return ${f}(this.#view, offset);
      }`}function $(n){const e=new Array,i="__RootMsg";for(const m of n){const Z=o(m.name??i),B=new Array,I=new Array;let D;for(const C of m.definitions)C.isConstant!==!0&&(D==null?B.push(`
          __${C.name}$offset(view, initOffset) {
            return initOffset;
          }`):(I.push(`#_${C.name}_offset_cache = undefined;`),B.push(`
          __${C.name}$offset(view, initOffset) {
            if (this.#_${C.name}_offset_cache) {
              return this.#_${C.name}_offset_cache;
            }
            const prevOffset = this.__${D.name}$offset(view, initOffset);
            const totalOffset = prevOffset + ${Z}.__${D.name}$size(view, prevOffset);
            this.#_${C.name}_offset_cache = totalOffset;
            return totalOffset;
          }`)),D=C);const X=`class ${Z} {
        ${m.definitions.map(a).join(`
`)}

        // return the total serialized size of the message in the view
        static size(view /* DataView */, initOffset = 0) {
          let totalSize = 0;
          let offset = initOffset;

          ${m.definitions.map(u.bind(void 0,Z)).join(`
`)}

          return totalSize;
        }

        ${B.join(`
`)}

        // return an instance of ${Z} from the view at initOffset bytes into the view
        // NOTE: the underlying view data lifetime must be at least the lifetime of the instance
        static build(view /* DataView */, offset = 0) {
          return new ${Z}(view, offset);
        }

        #view = undefined;
        #offset;
        ${I.join(`
`)}
  
        constructor(view, offset = 0) {
          this.#view = view;
          this.#offset = offset;
        }

        // return a json object of the fields
        // This fully deserializes all fields of the message into native types
        // Typed arrays are considered native types and remain as typed arrays
        toJSON() {
          const view = this.#view;
          const buffer = new Uint8Array(view.buffer, view.byteOffset + this.#offset, view.byteLength - this.#offset);
          const reader = new StandardTypeReader(buffer);
          return new (typeReaders.get(${JSON.stringify(m.name??i)}))(reader);
        }

        // return a plain javascript object of the message
        // This fully deserializes all fields of the message into native types
        // Typed arrays are considered native types and remain as typed arrays
        toObject() {
          const view = this.#view;
          const buffer = new Uint8Array(view.buffer, view.byteOffset + this.#offset, view.byteLength - this.#offset);
          const reader = new StandardTypeReader(buffer);
          return new (typeReaders.get(${JSON.stringify(m.name??i)}))(reader);
        }

        ${m.definitions.map(A).join(`
`)}
    }`;e.push(X)}const f=e.reverse().join(`

`),l=createParsers({definitions:n,topLevelReaderKey:i}),v=new Function("deserializers","builtinSizes","typeReaders","StandardTypeReader",`${f}
return __RootMsg;`),p=v.call(void 0,deserializers,h,l,StandardTypeReader);return p.source=()=>v.toString(),p}function E(){const n=new Uint8Array(4),e=new Uint32Array(n.buffer);return e[0]=1,n[3]===1}if(!!E())throw new Error("Only Little Endian architectures are supported");class y{constructor(e){this.readerImpl=buildReader(e),this.definitions=e}size(e){const i=new DataView(e.buffer,e.byteOffset,e.byteLength);return this.readerImpl.size(i)}source(){return this.readerImpl.source()}readMessage(e){const i=new DataView(e.buffer,e.byteOffset,e.byteLength);return this.readerImpl.build(i)}}class F{constructor(e){this.buffer=e,this.offset=0,this.view=new DataView(e.buffer,e.byteOffset,e.byteLength)}json(){const e=this.string();try{return JSON.parse(e)}catch{return`Could not parse ${e}`}}string(){const e=this.uint32(),i=this.view.byteOffset+this.offset,f=this.view.byteLength-this.offset;if(e<0||e>f)throw new RangeError(`String deserialization error: length ${e}, maxLength ${f}`);const l=new Uint8Array(this.view.buffer,i,e);return this.offset+=e,x(l)}bool(){return this.uint8()!==0}int8(){return this.view.getInt8(this.offset++)}uint8(){return this.view.getUint8(this.offset++)}typedArray(e,i){const f=e??this.uint32(),l=this.view,v=this.offset+l.byteOffset;if(this.offset+=f*i.BYTES_PER_ELEMENT,v%i.BYTES_PER_ELEMENT===0)return new i(l.buffer,v,f);const p=i.BYTES_PER_ELEMENT*f,m=new Uint8Array(p);return m.set(new Uint8Array(l.buffer,v,p)),new i(m.buffer,m.byteOffset,f)}int16(){const e=this.view.getInt16(this.offset,!0);return this.offset+=2,e}uint16(){const e=this.view.getUint16(this.offset,!0);return this.offset+=2,e}int32(){const e=this.view.getInt32(this.offset,!0);return this.offset+=4,e}uint32(){const e=this.view.getUint32(this.offset,!0);return this.offset+=4,e}float32(){const e=this.view.getFloat32(this.offset,!0);return this.offset+=4,e}float64(){const e=this.view.getFloat64(this.offset,!0);return this.offset+=8,e}int64(){const e=this.offset;return this.offset+=8,this.view.getBigInt64(e,!0)}uint64(){const e=this.offset;return this.offset+=8,this.view.getBigUint64(e,!0)}time(){const e=this.offset;this.offset+=8;const i=this.view.getUint32(e,!0),f=this.view.getUint32(e+4,!0);return{sec:i,nsec:f}}duration(){const e=this.offset;this.offset+=8;const i=this.view.getInt32(e,!0),f=this.view.getInt32(e+4,!0);return{sec:i,nsec:f}}}const M=(n,e="")=>{let i="";const f=n.filter(l=>{const v=l.name??"";if(!e)return!v;const p=e.includes("/")?e:`/${e}`;return v.endsWith(p)?(i=v,!0):!1});if(f.length!==1)throw new Error(`Expected 1 top level type definition for '${e}' but found ${f.length}.`);return{...f[0],name:i}},g=n=>n.replace(/\//g,"_");function j(n){switch(n){case"int8":return"Int8Array";case"uint8":return"Uint8Array";case"int16":return"Int16Array";case"uint16":return"Uint16Array";case"int32":return"Int32Array";case"uint32":return"Uint32Array";case"int64":return"BigInt64Array";case"uint64":return"BigUint64Array";case"float32":return"Float32Array";case"float64":return"Float64Array";default:return}}const P=({definitions:n,options:e={},topLevelReaderKey:i})=>{if(n.length===0)throw new Error("no types given");const f=n.filter(Z=>!Z.name);if(f.length>1)throw new Error("multiple unnamed types");const l=f.length>0?f[0]:n[0],v=n.filter(Z=>!!Z.name),p=Z=>{const B=[];return Z.definitions.forEach(I=>{if(I.isConstant!==!0)if(I.isArray===!0){const D=j(I.type);if(D!=null){B.push(`this.${I.name} = reader.typedArray(${String(I.arrayLength)}, ${D});`);return}const X=`length_${I.name}`;B.push(`var ${X} = ${I.arrayLength!=null?I.arrayLength:"reader.uint32();"}`);const C=`this.${I.name}`;if(B.push(`${C} = new Array(${X})`),B.push(`for (var i = 0; i < ${X}; i++) {`),I.isComplex===!0){const k=M(n,I.type);B.push(`  ${C}[i] = new Record.${g(k.name)}(reader);`)}else B.push(`  ${C}[i] = reader.${I.type}();`);B.push("}")}else if(I.isComplex===!0){const D=M(n,I.type);B.push(`this.${I.name} = new Record.${g(D.name)}(reader);`)}else B.push(`this.${I.name} = reader.${I.type}();`)}),e.freeze===!0&&B.push("Object.freeze(this);"),B.join(`
    `)};let m=`
  const builtReaders = new Map();
  var Record = function (reader) {
    ${p(l)}
  };
  builtReaders.set(topLevelReaderKey, Record);
  `;for(const Z of v)m+=`
  Record.${g(Z.name)} = function(reader) {
    ${p(Z)}
  };
  builtReaders.set(${JSON.stringify(Z.name)}, Record.${g(Z.name)});
  `;return m+="return builtReaders;",new Function("topLevelReaderKey",m)(i)};class K{constructor(e,i={}){this.reader=P({definitions:e,options:i,topLevelReaderKey:"<toplevel>"}).get("<toplevel>")}readMessage(e){const i=new F(e);return new this.reader(i)}}},10161:w=>{var R=Object.prototype.hasOwnProperty,t="~";function z(){}Object.create&&(z.prototype=Object.create(null),new z().__proto__||(t=!1));function x(h,o,a){this.fn=h,this.context=o,this.once=a||!1}function L(h,o,a,u,A){if(typeof a!="function")throw new TypeError("The listener must be a function");var $=new x(a,u||h,A),E=t?t+o:o;return h._events[E]?h._events[E].fn?h._events[E]=[h._events[E],$]:h._events[E].push($):(h._events[E]=$,h._eventsCount++),h}function S(h,o){--h._eventsCount===0?h._events=new z:delete h._events[o]}function d(){this._events=new z,this._eventsCount=0}d.prototype.eventNames=function(){var o=[],a,u;if(this._eventsCount===0)return o;for(u in a=this._events)R.call(a,u)&&o.push(t?u.slice(1):u);return Object.getOwnPropertySymbols?o.concat(Object.getOwnPropertySymbols(a)):o},d.prototype.listeners=function(o){var a=t?t+o:o,u=this._events[a];if(!u)return[];if(u.fn)return[u.fn];for(var A=0,$=u.length,E=new Array($);A<$;A++)E[A]=u[A].fn;return E},d.prototype.listenerCount=function(o){var a=t?t+o:o,u=this._events[a];return u?u.fn?1:u.length:0},d.prototype.emit=function(o,a,u,A,$,E){var W=t?t+o:o;if(!this._events[W])return!1;var y=this._events[W],F=arguments.length,M,g;if(y.fn){switch(y.once&&this.removeListener(o,y.fn,void 0,!0),F){case 1:return y.fn.call(y.context),!0;case 2:return y.fn.call(y.context,a),!0;case 3:return y.fn.call(y.context,a,u),!0;case 4:return y.fn.call(y.context,a,u,A),!0;case 5:return y.fn.call(y.context,a,u,A,$),!0;case 6:return y.fn.call(y.context,a,u,A,$,E),!0}for(g=1,M=new Array(F-1);g<F;g++)M[g-1]=arguments[g];y.fn.apply(y.context,M)}else{var j=y.length,P;for(g=0;g<j;g++)switch(y[g].once&&this.removeListener(o,y[g].fn,void 0,!0),F){case 1:y[g].fn.call(y[g].context);break;case 2:y[g].fn.call(y[g].context,a);break;case 3:y[g].fn.call(y[g].context,a,u);break;case 4:y[g].fn.call(y[g].context,a,u,A);break;default:if(!M)for(P=1,M=new Array(F-1);P<F;P++)M[P-1]=arguments[P];y[g].fn.apply(y[g].context,M)}}return!0},d.prototype.on=function(o,a,u){return L(this,o,a,u,!1)},d.prototype.once=function(o,a,u){return L(this,o,a,u,!0)},d.prototype.removeListener=function(o,a,u,A){var $=t?t+o:o;if(!this._events[$])return this;if(!a)return S(this,$),this;var E=this._events[$];if(E.fn)E.fn===a&&(!A||E.once)&&(!u||E.context===u)&&S(this,$);else{for(var W=0,y=[],F=E.length;W<F;W++)(E[W].fn!==a||A&&!E[W].once||u&&E[W].context!==u)&&y.push(E[W]);y.length?this._events[$]=y.length===1?y[0]:y:S(this,$)}return this},d.prototype.removeAllListeners=function(o){var a;return o?(a=t?t+o:o,this._events[a]&&S(this,a)):(this._events=new z,this._eventsCount=0),this},d.prototype.off=d.prototype.removeListener,d.prototype.addListener=d.prototype.on,d.prefixed=t,d.EventEmitter=d,w.exports=d},43345:(w,R,t)=>{t.d(R,{Cy:()=>et,wf:()=>at,RR:()=>jt,VG:()=>rt,dI:()=>nt,og:()=>it,cb:()=>Jt,LU:()=>Nt});var z=t(33827),x=t(9565),L=t(54419),S=t(18711),d=t(76587),h=t(82072),o=t(11854),a=t(60786),u=t(10649),A=t(89538),$=t(62214),E=function(){function s(r,c){this.xf=c,this.pos=0,this.full=!1,this.acc=new Array(r)}return s.prototype["@@transducer/init"]=$.Z.init,s.prototype["@@transducer/result"]=function(r){return this.acc=null,this.xf["@@transducer/result"](r)},s.prototype["@@transducer/step"]=function(r,c){return this.store(c),this.full?this.xf["@@transducer/step"](r,this.getCopy()):r},s.prototype.store=function(r){this.acc[this.pos]=r,this.pos+=1,this.pos===this.acc.length&&(this.pos=0,this.full=!0)},s.prototype.getCopy=function(){return(0,A.Z)(Array.prototype.slice.call(this.acc,this.pos),Array.prototype.slice.call(this.acc,0,this.pos))},s}(),W=(0,a.Z)(function(r,c){return new E(r,c)});const y=W;var F=(0,a.Z)((0,u.Z)([],y,o.Z));const M=F;var g=t(9469),j=t(33759),P=t(47665),K=t(47339),n=t(71249),e=t(40668),i=t(10416),f=t(29447),l=t(86733),v=t(91620),p=t(54495),m=t(94039),Z=t(35267),B=t(91281),I=t(84817),D=t(67784),X=t(94413),C=t(33545),k=t(89499),Ht=t(27497),ft=function(){function s(r,c){this.xf=c,this.f=r}return s.prototype["@@transducer/init"]=$.Z.init,s.prototype["@@transducer/result"]=$.Z.result,s.prototype["@@transducer/step"]=function(r,c){if(this.f){if(this.f(c))return r;this.f=null}return this.xf["@@transducer/step"](r,c)},s}(),ut=(0,a.Z)(function(r,c){return new ft(r,c)});const ct=ut;var lt=t(78864),dt=(0,a.Z)((0,u.Z)(["dropWhile"],ct,function(r,c){for(var O=0,U=c.length;O<U&&r(c[O]);)O+=1;return(0,lt.Z)(O,1/0,c)}));const H=dt;var ht=t(87409),q=t(81583),vt=t(60268),yt=t(11291),gt=t(7054),pt=t(30559),mt=(0,q.Z)(function(r){return r!=null&&typeof r["fantasy-land/empty"]=="function"?r["fantasy-land/empty"]():r!=null&&r.constructor!=null&&typeof r.constructor["fantasy-land/empty"]=="function"?r.constructor["fantasy-land/empty"]():r!=null&&typeof r.empty=="function"?r.empty():r!=null&&r.constructor!=null&&typeof r.constructor.empty=="function"?r.constructor.empty():(0,yt.Z)(r)?[]:(0,pt.Z)(r)?"":(0,gt.Z)(r)?{}:(0,vt.Z)(r)?function(){return arguments}():void 0});const $t=mt;var Qt=t(47708),bt=t(7278),kt=t(75867),Et=t(91457),qt=t(66681),_t=t(84057),te=t(85043),ee=t(1177),ne=t(74845),re=t(43139),se=t(48170),ie=t(92893),ae=t(96163),At=t(81090),Ot=t(18513),oe=t(63717),fe=t(77939),ue=t(5652),ce=t(56693),le=t(78760),de=t(62041),he=t(94079),ve=t(82441),ye=t(80355),zt=(0,q.Z)(function(r){return r!=null&&(0,Et.Z)(r,$t(r))});const V=zt;var Lt=t(78642),ge=t(23699),pe=t(79745),me=t(93274),$e=t(33979),Ee=t(37931),Ae=t(70742),Oe=t(79485),ze=t(27552),Le=t(50114),Ze=t(19026),Zt=t(10218),xe=t(49866),Re=t(21014),Se=t(85894),Ie=t(15682),Ue=t(92158),Pe=t(75166),Be=t(14502),Te=t(735),xt=t(8287),Me=t(74761),De=t(93492),Q=t(33784),je=t(50265),we=t(38640),We=t(79464),Fe=t(1755),Ce=t(13075),_=t(58492),Ne=t(68727),Ke=t(49939),Xe=t(94323),Ye=t(85935),Rt=t(31227),Ve=t(7451),St=t(49391),Je=t(65124),Ge=t(58409),He=t(1707),Qe=t(6471),be=t(58260),ke=t(40801),qe=t(40023),_e=t(71027),tn=t(70147),en=t(38516),nn=t(76759),rn=t(67367),sn=t(96955),an=t(67461),on=t(78055),fn=t(92648),un=t(85057),cn=t(85552),ln=t(67594),dn=t(97650),It=t(31730),hn=t(93249),vn=t(39018),yn=t(91859),Ut=t(18954),Pt=(0,K.Z)(Ut.Z);const Bt=Pt;var gn=t(27892),pn=t(17044),mn=t(77011),Tt=function(s,r){var c={};for(var O in s)Object.prototype.hasOwnProperty.call(s,O)&&r.indexOf(O)<0&&(c[O]=s[O]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var U=0,O=Object.getOwnPropertySymbols(s);U<O.length;U++)r.indexOf(O[U])<0&&(c[O[U]]=s[O[U]]);return c};const tt=(...s)=>pipe.apply(null,s.map(r=>dissoc(r))),$n=s=>tt("from","to")(Object.assign({},s,{start:s.from,end:s.to})),En=([s,r])=>({start:s,end:r}),An=s=>tt("start","end")(Object.assign({},s,{from:s.start,to:s.end})),On=s=>[s.start,s.end],et=(s,r)=>{const c=s,{start:O,end:U}=c,N=Tt(c,["start","end"]),Y=[{start:-1/0,end:O},...r,{start:U,end:1/0}];return(0,Rt.Z)(Lt.Z,M(2,Y).map(([T,G])=>T.end>=G.start?null:Object.assign({start:T.end,end:G.start},N)))},b=(s,r)=>r.start<s.end&&r.end>s.start,Mt=(s,r)=>s.start<r&&r<s.end,J=s=>r=>r.end<=s.start,nt=(s,r)=>{if([s,r].some(V))return!1;const c=s[0],O=H(J(c),r);if(V(O))return!1;const U=O[0];return b(c,U)?!0:nt((0,D.Z)(1,s),O)},Dt=(s,r)=>s.start===r.end||s.end===r.start,jt=(s,r)=>s.end<=r.start,zn=(s,r)=>s.start>=r.end,Ln=(s,r)=>s.start===r.start,Zn=(s,r)=>s.end===r.end,rt=(s,r)=>s.start>=r.start&&s.end<=r.end,xn=(s,r)=>s.start===r.start&&s.end===r.end,st=(s,r)=>(0,Q.Z)((0,xt.Z)(s),(0,_.Z)(r)),wt=s=>s.reduce((r,c)=>r.end>c.end?r:c),Wt=(0,Q.Z)((0,At.Z)((0,ht.Z)(b,Dt)),(0,Zt.Z)((0,m.Z)((0,g.Z)({start:st(0,"start"),end:st(1,"end")}),[Ot.Z,wt]))),it=s=>Wt([...s]),Ft=(0,St.Z)((0,_.Z)("start")),Ct=(0,Q.Z)(l.Z,Ft,it),Nt=(s,r)=>Ct([...s],[...r]),Kt=(s,r)=>{const c=s[0].end>r[0].end?s:(0,D.Z)(1,s),O=r[0].end>s[0].end?r:(0,D.Z)(1,r);return[c,O]},Xt=([s,r])=>{if((0,S.Z)(V)([s,r]))return!1;const c=H(J(r[0]),s);if(V(c))return!1;const O=c[0],U=H(J(O),r);if(V(U))return!1;const N=U[0],Y=Object.assign({},N,{end:Math.min(O.end,N.end),start:Math.max(O.start,N.start)}),T=J(Y)(Y)?null:Y,G=Kt(c,U);return[T,G]},at=(s,r)=>(0,It.Z)(Xt,[s,r]).filter(c=>c!=null),ot=s=>s.reduce((r,c)=>r.start<c.start?r:c),Yt=s=>r=>{if(!r.length)return!1;const c=ot(r).start,O=r.filter(T=>T.end>c).map(T=>T.start===c?Object.assign({},T,{start:T.end}):T),U=ot(O).start,N=r.filter(T=>rt({start:c,end:U},T));return[Object.assign({},s(N),{start:c,end:U}),r.filter(T=>T.end>U).map(T=>T.start<=U?Object.assign({},T,{start:U}):T)]},Rn=(s,r)=>unfold(Yt(s),r),Vt=(s,r)=>et(r,s),Jt=(s,r)=>{const c=at(r,s);return Bt(s.map(O=>Vt(c.filter(b.bind(null,O)),O)))},Gt=(s,r)=>Mt(s,r)?[Object.assign({},s,{start:s.start,end:r}),Object.assign({},s,{start:r,end:s.end})]:[s],Sn=(s,r)=>s.length<1||r.length<1?r:unnest(r.map(c=>s.reduce((O,U)=>{const N=O.pop();return[...O,...Gt(N,U)]},[c])))},18711:(w,R,t)=>{t.d(R,{Z:()=>d});var z=t(60786),x=t(10649),L=t(54865),S=(0,z.Z)((0,x.Z)(["any"],L.Z,function(o,a){for(var u=0;u<a.length;){if(o(a[u]))return!0;u+=1}return!1}));const d=S},47339:(w,R,t)=>{t.d(R,{Z:()=>F});var z=t(60786),x=t(10649),L=t(90684),S=t(99957),d=t(92233),h=t(45576),o=t(62214),a=function(M){return{"@@transducer/init":o.Z.init,"@@transducer/result":function(g){return M["@@transducer/result"](g)},"@@transducer/step":function(g,j){var P=M["@@transducer/step"](g,j);return P["@@transducer/reduced"]?(0,S.Z)(P):P}}},u=function(g){var j=a(g);return{"@@transducer/init":o.Z.init,"@@transducer/result":function(P){return j["@@transducer/result"](P)},"@@transducer/step":function(P,K){return(0,d.Z)(K)?(0,h.Z)(j,P,K):(0,h.Z)(j,P,[K])}}};const A=u;var $=t(10218),E=(0,z.Z)(function(g,j){return(0,$.Z)(g,A(j))});const W=E;var y=(0,z.Z)((0,x.Z)(["fantasy-land/chain","chain"],W,function(g,j){return typeof j=="function"?function(P){return g(j(P))(P)}:(0,L.Z)(!1)((0,$.Z)(g,j))}));const F=y},67784:(w,R,t)=>{t.d(R,{Z:()=>u});var z=t(60786),x=t(10649),L=t(62214),S=function(){function A($,E){this.xf=E,this.n=$}return A.prototype["@@transducer/init"]=L.Z.init,A.prototype["@@transducer/result"]=L.Z.result,A.prototype["@@transducer/step"]=function($,E){return this.n>0?(this.n-=1,$):this.xf["@@transducer/step"]($,E)},A}(),d=(0,z.Z)(function($,E){return new S($,E)});const h=d;var o=t(78864),a=(0,z.Z)((0,x.Z)(["drop"],h,function($,E){return(0,o.Z)(Math.max(0,$),1/0,E)}));const u=a},11854:(w,R,t)=>{t.d(R,{Z:()=>z});function z(x,L){for(var S=0,d=L.length-(x-1),h=new Array(d>=0?d:0);S<d;)h[S]=Array.prototype.slice.call(L,S,S+x),S+=1;return h}},99957:(w,R,t)=>{t.d(R,{Z:()=>z});function z(x){return{"@@transducer/value":x,"@@transducer/reduced":!0}}},90684:(w,R,t)=>{t.d(R,{Z:()=>x});var z=t(92233);function x(L){return function S(d){for(var h,o,a,u=[],A=0,$=d.length;A<$;){if((0,z.Z)(d[A]))for(h=L?S(d[A]):d[A],a=0,o=h.length;a<o;)u[u.length]=h[a],a+=1;else u[u.length]=d[A];A+=1}return u}}},1844:(w,R,t)=>{t.d(R,{Z:()=>z});function z(x){return x&&x["@@transducer/reduced"]?x:{"@@transducer/value":x,"@@transducer/reduced":!0}}},54865:(w,R,t)=>{t.d(R,{Z:()=>h});var z=t(60786),x=t(1844),L=t(62214),S=function(){function o(a,u){this.xf=u,this.f=a,this.any=!1}return o.prototype["@@transducer/init"]=L.Z.init,o.prototype["@@transducer/result"]=function(a){return this.any||(a=this.xf["@@transducer/step"](a,!1)),this.xf["@@transducer/result"](a)},o.prototype["@@transducer/step"]=function(a,u){return this.f(u)&&(this.any=!0,a=(0,x.Z)(this.xf["@@transducer/step"](a,!0))),a},o}(),d=(0,z.Z)(function(a,u){return new S(a,u)});const h=d},78642:(w,R,t)=>{t.d(R,{Z:()=>L});var z=t(81583),x=(0,z.Z)(function(d){return d==null});const L=x},31730:(w,R,t)=>{t.d(R,{Z:()=>L});var z=t(60786),x=(0,z.Z)(function(d,h){for(var o=d(h),a=[];o&&o.length;)a[a.length]=o[0],o=d(o[1]);return a});const L=x},30686:(w,R,t)=>{t.d(R,{v:()=>z});var z=t(10161),x=null}}]);

//# sourceMappingURL=8540.dd9a045242f404e72468.js.map