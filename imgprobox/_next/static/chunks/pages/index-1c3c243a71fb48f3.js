(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(8414)}])},8414:function(e,t,n){"use strict";let a;n.r(t),n.d(t,{default:function(){return j}});var r=n(5893),i=n(7294);n(4494);let o=Array(128).fill(void 0);o.push(void 0,null,!0,!1);let c=0,s=null;function l(){return(null===s||0===s.byteLength)&&(s=new Uint8Array(a.memory.buffer)),s}let u=new TextEncoder("utf-8"),d="function"==typeof u.encodeInto?function(e,t){return u.encodeInto(e,t)}:function(e,t){let n=u.encode(e);return t.set(n),{read:e.length,written:n.length}},f=null;function h(){return(null===f||0===f.byteLength)&&(f=new Int32Array(a.memory.buffer)),f}let g=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});function w(e,t){return g.decode(l().subarray(e,e+t))}g.decode();let m=o.length;function b(e){m===o.length&&o.push(o.length+1);let t=m;return m=o[t],o[t]=e,t}function _(e){let t=o[e];return e<132||(o[e]=m,m=e),t}let p=128,v=null;function y(e,t){try{return e.apply(this,t)}catch(e){a.__wbindgen_exn_store(b(e))}}async function x(e,t){if("function"==typeof Response&&e instanceof Response){if("function"==typeof WebAssembly.instantiateStreaming)try{return await WebAssembly.instantiateStreaming(e,t)}catch(t){if("application/wasm"!=e.headers.get("Content-Type"))console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",t);else throw t}let n=await e.arrayBuffer();return await WebAssembly.instantiate(n,t)}{let n=await WebAssembly.instantiate(e,t);return n instanceof WebAssembly.Instance?{instance:n,module:e}:n}}async function k(e){void 0===e&&(e=new n.U(n(5732)));let t=function(){let e={};return e.wbg={},e.wbg.__wbindgen_string_get=function(e,t){let n=o[t],r="string"==typeof n?n:void 0;var i=null==r?0:function(e,t,n){if(void 0===n){let n=u.encode(e),a=t(n.length);return l().subarray(a,a+n.length).set(n),c=n.length,a}let a=e.length,r=t(a),i=l(),o=0;for(;o<a;o++){let t=e.charCodeAt(o);if(t>127)break;i[r+o]=t}if(o!==a){0!==o&&(e=e.slice(o)),r=n(r,a,a=o+3*e.length);let t=l().subarray(r+o,r+a),i=d(e,t);o+=i.written}return c=o,r}(r,a.__wbindgen_malloc,a.__wbindgen_realloc),s=c;h()[e/4+1]=s,h()[e/4+0]=i},e.wbg.__wbindgen_string_new=function(e,t){let n=w(e,t);return b(n)},e.wbg.__wbindgen_object_drop_ref=function(e){_(e)},e.wbg.__wbg_data_ba126c289535c14a=function(e,t){let n=o[t].data,r=function(e,t){let n=t(1*e.length);return l().set(e,n/1),c=e.length,n}(n,a.__wbindgen_malloc),i=c;h()[e/4+1]=i,h()[e/4+0]=r},e.wbg.__wbg_newwithu8clampedarrayandsh_5983a7df9463fed0=function(){return y(function(e,t,n,r){let i=new ImageData(((null===v||0===v.byteLength)&&(v=new Uint8ClampedArray(a.memory.buffer)),v).subarray(e/1,e/1+t),n>>>0,r>>>0);return b(i)},arguments)},e.wbg.__wbg_getImageData_69bdab96ea46e1af=function(){return y(function(e,t,n,a,r){let i=o[e].getImageData(t,n,a,r);return b(i)},arguments)},e.wbg.__wbg_putImageData_3d6a58a9eb5f743c=function(){return y(function(e,t,n,a){o[e].putImageData(o[t],n,a)},arguments)},e.wbg.__wbg_get_27fe3dac1c4d0224=function(e,t){let n=o[e][t>>>0];return b(n)},e.wbg.__wbg_length_e498fbc24f9c1d4f=function(e){let t=o[e].length;return t},e.wbg.__wbindgen_throw=function(e,t){throw Error(w(e,t))},e}();("string"==typeof e||"function"==typeof Request&&e instanceof Request||"function"==typeof URL&&e instanceof URL)&&(e=fetch(e));let{instance:r,module:i}=await x(await e,t);return a=r.exports,k.__wbindgen_wasm_module=i,f=null,s=null,v=null,a}var j=function(){let e=(0,i.useRef)(),t=(0,i.useRef)(),n=(0,i.useRef)(),c=(0,i.useRef)(),s=!1,l=(0,i.useRef)(),[u,d]=(0,i.useState)(!1),[f,g]=(0,i.useState)(!1),[w,m]=(0,i.useState)(!1),[v,y]=(0,i.useState)(!1),x=(0,i.useCallback)((e,t,n)=>{let r=[u?"convolutionDemo":null,f?"powerLawMappingDemo":null,w?"inverseDemo":null,v?"stackedDemo":null].filter(e=>null!==e);!function(e,t,n,r){try{let c=a.__wbindgen_add_to_stack_pointer(-16);a.draw(c,function(e){if(1==p)throw Error("out of js stack");return o[--p]=e,p}(e),t,n,b(r));var i=h()[c/4+0];if(h()[c/4+1])throw _(i)}finally{a.__wbindgen_add_to_stack_pointer(16),o[p++]=void 0}}(e,t,n,r)},[u,f,w,v]);function j(e){var t=new FileReader;let n=new Image;n.onload=()=>{console.log("JS --> "+n.width+" and "+n.height),canvas.width=n.width,canvas.height=n.height,canvas.getContext("2d").drawImage(n,0,0),l.current(canvas.getContext("2d"),canvas.width,canvas.height)},t.onload=function(e){n.src=e.target.result},t.readAsDataURL(e.target.files[0])}return(0,i.useEffect)(()=>{l.current=x},[x]),(0,i.useEffect)(()=>{let a;let r=e.current,i=t.current,o=c.current,u=n.current;return async function(){function e(){r.width=i.videoWidth,r.height=i.videoHeight,r.getContext("2d").drawImage(i,0,0,r.width,r.height);let t=new Image;t.src=r.toDataURL(),r.getContext("2d").drawImage(t,0,0),l.current(r.getContext("2d"),640,640),s&&window.requestAnimationFrame(e)}await k(),o.onclick=function(){s?(a.getTracks()[0].stop(),s=!1,r.getContext("2d").clearRect(0,0,r.width,r.height)):(navigator.mediaDevices.getUserMedia({audio:!1,video:!0}).then(e=>{i.srcObject=e,a=e}).then(window.requestAnimationFrame(e)).catch(console.error),s=!0)},u.addEventListener("change",j,!1)}(),()=>{a&&a.getTracks().forEach(e=>e.stop())}},[]),(0,r.jsxs)("div",{className:"app-container",children:[(0,r.jsx)("h1",{children:"IMGPROBOX"}),(0,r.jsxs)("div",{className:"content",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{children:"less talk1"}),(0,r.jsx)("input",{className:"form-check-input",type:"checkbox",value:u,onChange:e=>d(e.target.checked),id:"convolutionDemo"}),(0,r.jsx)("label",{className:"form-check-label",htmlFor:"convolutionDemo",children:"Convolution Demo"})]}),(0,r.jsxs)("div",{className:"form-check",children:[(0,r.jsx)("input",{className:"form-check-input",type:"checkbox",value:f,onChange:e=>g(e.target.checked),id:"powerLawMappingDemo"}),(0,r.jsx)("label",{className:"form-check-label",htmlFor:"powerLawMappingDemo",children:"Power Law Mapping Demo"})]}),(0,r.jsxs)("div",{className:"form-check",children:[(0,r.jsx)("input",{className:"form-check-input",type:"checkbox",value:w,onChange:e=>m(e.target.checked),id:"inverseDemo"}),(0,r.jsx)("label",{className:"form-check-label",htmlFor:"inverseDemo",children:"Inverse Demo"})]}),(0,r.jsxs)("div",{className:"form-check",children:[(0,r.jsx)("input",{className:"form-check-input",type:"checkbox",value:v,onChange:e=>y(e.target.checked),id:"stackedDemo"}),(0,r.jsx)("label",{className:"form-check-label",htmlFor:"stackedDemo",children:"Stacked Demo"})]})]}),(0,r.jsxs)("div",{className:"options-column",children:[(0,r.jsxs)("div",{className:"options-row",children:[(0,r.jsx)("p",{children:"less talk2"}),(0,r.jsx)("canvas",{ref:e,id:"canvas",width:"640",height:"640",style:{width:"100%",height:"100%",objectFit:"contain"}})]}),(0,r.jsx)("div",{className:"options-row"}),(0,r.jsxs)("div",{className:"options-row",children:[(0,r.jsx)("p",{children:"less talk4"}),(0,r.jsx)("video",{ref:t,playsInline:!0,autoPlay:!0,muted:!0,style:{width:"100%"}}),(0,r.jsx)("button",{ref:c,className:"btn btn-primary mt-2",children:"Switch webcam"}),(0,r.jsx)("input",{type:"file",ref:n,id:"imageLoader",name:"imageLoader"})]})]})]})]})}},4494:function(){},5732:function(e,t,n){"use strict";e.exports=n.p+"static/media/without_a_bundler_bg.23c8d596.wasm"}},function(e){e.O(0,[501,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);