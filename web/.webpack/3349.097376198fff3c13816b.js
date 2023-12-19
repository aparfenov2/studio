(self.webpackChunk=self.webpackChunk||[]).push([[3349],{3349:(b,S,c)=>{var A=c(48834).Buffer,P=c(63136).Z;const I=c(58779)();let i;function z(){if(!i)throw new Error('wasm-zstd has not finished loading. Please wait with "await isLoaded" before calling any methods')}function e(s){return z(),i._compressBound(s)}function B(s,v){z();const d=s.byteLength,h=e(d),m=i._malloc(d),p=i._malloc(h);v==null&&(v=3),new Uint8Array(i.HEAPU8.buffer,m,d).set(s);const o=i._compress(p,h,m,d,v);try{if(o===-1)throw new Error("Error during compression");const N=A.allocUnsafe(o);return A.from(i.HEAPU8.buffer).copy(N,0,p,p+o),N}finally{i._free(m),i._free(p)}}function x(s,v){z();const d=s.byteLength,h=i._malloc(d),m=i._malloc(v);new Uint8Array(i.HEAPU8.buffer,h,d).set(s);const _=i._decompress(m,v,h,d);try{if(_===-1)throw new Error("Error during decompression");const o=A.allocUnsafe(_);return A.from(i.HEAPU8.buffer).copy(o,0,m,m+_),o}finally{i._free(h),i._free(m)}}const g=I.then(s=>s.ready.then(()=>{}));b.exports={compressBound:e,compress:B,decompress:x,isLoaded:g},I.then(s=>{i=s})},58779:(b,S,c)=>{var A="../../node_modules/@foxglove/wasm-zstd/dist/wasm-zstd.js",P="../../node_modules/@foxglove/wasm-zstd/dist",f=c(63136).Z,I=(()=>{var i=typeof document<"u"&&document.currentScript?document.currentScript.src:void 0;return i=i||A,function(e){e=e||{};var e=typeof e<"u"?e:{},B,x;e.ready=new Promise(function(n,t){B=n,x=t});var g;typeof f<"u"&&(e.ENVIRONMENT=f.env.WASM_ZSTD_ENVIRONMENT),e.locateFile=function(n){return _?(g={normalize:function(t){return t}},P+"/"+n):n.endsWith(".wasm")?c(7664):n};var s=Object.assign({},e),v=[],d="./this.program",h=(n,t)=>{throw t},m=typeof window=="object",p=typeof importScripts=="function",_=typeof f=="object"&&typeof f.versions=="object"&&typeof f.versions.node=="string",o="";function N(n){return e.locateFile?e.locateFile(n,o):o+n}var D,O,W,re;function ie(n){if(n instanceof Te)return;T("exiting due to exception: "+n)}if(_){p?o=c(21023).dirname(o)+"/":o=P+"/";var j,g;j=c(15448),g=c(21023),D=(t,r)=>(t=g.normalize(t),j.readFileSync(t,r?void 0:"utf8")),W=t=>{var r=D(t,!0);return r.buffer||(r=new Uint8Array(r)),r},O=(t,r,a)=>{t=g.normalize(t),j.readFile(t,function(w,R){w?a(w):r(R.buffer)})},f.argv.length>1&&(d=f.argv[1].replace(/\\/g,"/")),v=f.argv.slice(2),h=(t,r)=>{if(ve())throw f.exitCode=t,r;ie(r),f.exit(t)},e.inspect=function(){return"[Emscripten Module object]"}}else(m||p)&&(p?o=self.location.href:typeof document<"u"&&document.currentScript&&(o=document.currentScript.src),i&&(o=i),o.indexOf("blob:")!==0?o=o.substr(0,o.replace(/[?#].*/,"").lastIndexOf("/")+1):o="",D=n=>{var t=new XMLHttpRequest;return t.open("GET",n,!1),t.send(null),t.responseText},p&&(W=n=>{var t=new XMLHttpRequest;return t.open("GET",n,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)}),O=(n,t,r)=>{var a=new XMLHttpRequest;a.open("GET",n,!0),a.responseType="arraybuffer",a.onload=()=>{if(a.status==200||a.status==0&&a.response){t(a.response);return}r()},a.onerror=r,a.send(null)},re=n=>document.title=n);var De=e.print||console.log.bind(console),T=e.printErr||console.warn.bind(console);Object.assign(e,s),s=null,e.arguments&&(v=e.arguments),e.thisProgram&&(d=e.thisProgram),e.quit&&(h=e.quit);var M;e.wasmBinary&&(M=e.wasmBinary);var oe=e.noExitRuntime||!0;typeof WebAssembly!="object"&&V("no native wasm support detected");var F,G=!1,ae,K,se,k,ue,ce,fe,le,de,me;function Y(n){K=n,e.HEAP8=se=new Int8Array(n),e.HEAP16=ue=new Int16Array(n),e.HEAP32=fe=new Int32Array(n),e.HEAPU8=k=new Uint8Array(n),e.HEAPU16=ce=new Uint16Array(n),e.HEAPU32=le=new Uint32Array(n),e.HEAPF32=de=new Float32Array(n),e.HEAPF64=me=new Float64Array(n)}var je=e.INITIAL_MEMORY||2097152,pe,J=[],Q=[],$=[],ye=!1;function ve(){return oe}function he(){if(e.preRun)for(typeof e.preRun=="function"&&(e.preRun=[e.preRun]);e.preRun.length;)Ae(e.preRun.shift());X(J)}function _e(){ye=!0,X(Q)}function we(){if(e.postRun)for(typeof e.postRun=="function"&&(e.postRun=[e.postRun]);e.postRun.length;)Ee(e.postRun.shift());X($)}function Ae(n){J.unshift(n)}function ge(n){Q.unshift(n)}function Ee(n){$.unshift(n)}var E=0,C=null,H=null;function Re(n){E++,e.monitorRunDependencies&&e.monitorRunDependencies(E)}function be(n){if(E--,e.monitorRunDependencies&&e.monitorRunDependencies(E),E==0&&(C!==null&&(clearInterval(C),C=null),H)){var t=H;H=null,t()}}function V(n){e.onAbort&&e.onAbort(n),n="Aborted("+n+")",T(n),G=!0,ae=1,n+=". Build with -sASSERTIONS for more info.";var t=new WebAssembly.RuntimeError(n);throw x(t),t}var Pe="data:application/octet-stream;base64,";function q(n){return n.startsWith(Pe)}function ee(n){return n.startsWith("file://")}var u;u="wasm-zstd.wasm",q(u)||(u=N(u));function ne(n){try{if(n==u&&M)return new Uint8Array(M);if(W)return W(n);throw"both async and sync fetching of the wasm failed"}catch(t){V(t)}}function Ie(){if(!M&&(m||p)){if(typeof fetch=="function"&&!ee(u))return fetch(u,{credentials:"same-origin"}).then(function(n){if(!n.ok)throw"failed to load wasm binary file at '"+u+"'";return n.arrayBuffer()}).catch(function(){return ne(u)});if(O)return new Promise(function(n,t){O(u,function(r){n(new Uint8Array(r))},t)})}return Promise.resolve().then(function(){return ne(u)})}function xe(){var n={a:Be};function t(l,y){var U=l.exports;e.asm=U,F=e.asm.c,Y(F.buffer),pe=e.asm.e,ge(e.asm.d),be("wasm-instantiate")}Re("wasm-instantiate");function r(l){t(l.instance)}function a(l){return Ie().then(function(y){return WebAssembly.instantiate(y,n)}).then(function(y){return y}).then(l,function(y){T("failed to asynchronously prepare wasm: "+y),V(y)})}function w(){return!M&&typeof WebAssembly.instantiateStreaming=="function"&&!q(u)&&!ee(u)&&!_&&typeof fetch=="function"?fetch(u,{credentials:"same-origin"}).then(function(l){var y=WebAssembly.instantiateStreaming(l,n);return y.then(r,function(U){return T("wasm streaming compile failed: "+U),T("falling back to ArrayBuffer instantiation"),a(r)})}):a(r)}if(e.instantiateWasm)try{var R=e.instantiateWasm(n,t);return R}catch(l){T("Module.instantiateWasm callback failed with error: "+l),x(l)}return w().catch(x),{}}function Te(n){this.name="ExitStatus",this.message="Program terminated with exit("+n+")",this.status=n}function X(n){for(;n.length>0;)n.shift()(e)}function Ue(n,t,r){k.copyWithin(n,t,t+r)}function Me(){return 2147483648}function He(n){try{return F.grow(n-K.byteLength+65535>>>16),Y(F.buffer),1}catch{}}function Se(n){var t=k.length;n=n>>>0;var r=Me();if(n>r)return!1;let a=(U,Z)=>U+(Z-U%Z)%Z;for(var w=1;w<=4;w*=2){var R=t*(1+.2/w);R=Math.min(R,n+100663296);var l=Math.min(r,a(Math.max(n,R),65536)),y=He(l);if(y)return!0}return!1}var Be={b:Ue,a:Se},ke=xe(),Ne=e.___wasm_call_ctors=function(){return(Ne=e.___wasm_call_ctors=e.asm.d).apply(null,arguments)},Oe=e._malloc=function(){return(Oe=e._malloc=e.asm.f).apply(null,arguments)},We=e._free=function(){return(We=e._free=e.asm.g).apply(null,arguments)},Fe=e._compressBound=function(){return(Fe=e._compressBound=e.asm.h).apply(null,arguments)},Le=e._compress=function(){return(Le=e._compress=e.asm.i).apply(null,arguments)},ze=e._decompress=function(){return(ze=e._decompress=e.asm.j).apply(null,arguments)},L;H=function n(){L||te(),L||(H=n)};function te(n){if(n=n||v,E>0||(he(),E>0))return;function t(){L||(L=!0,e.calledRun=!0,!G&&(_e(),B(e),e.onRuntimeInitialized&&e.onRuntimeInitialized(),we()))}e.setStatus?(e.setStatus("Running..."),setTimeout(function(){setTimeout(function(){e.setStatus("")},1),t()},1)):t()}if(e.preInit)for(typeof e.preInit=="function"&&(e.preInit=[e.preInit]);e.preInit.length>0;)e.preInit.pop()();return te(),e.ready}})();b.exports=I},63136:(b,S,c)=>{"use strict";c.d(S,{Z:()=>P});const P={nextTick:(f,...I)=>{queueMicrotask(()=>{f(...I)})},title:"browser",browser:!0,env:{},argv:[]}},7664:(b,S,c)=>{"use strict";b.exports=c.p+"a2884a6e6f89bb6ad800.wasm"},15448:()=>{}}]);

//# sourceMappingURL=3349.097376198fff3c13816b.js.map