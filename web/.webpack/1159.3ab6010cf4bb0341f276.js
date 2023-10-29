"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1159],{66838:(C,H,t)=>{t.r(H),t.d(H,{default:()=>ot});var e=t(52322),J=t(93553),ue=t(28504),pe=t(58777),Me=t(41939),b=t(68434),X=t(63249),W=t(38677),z=t(56961),Y=t(87037),ge=t(24394),je=t(3104),j=t(2784),B=t(72970),me=t(91004),ye=t(29268),xe=t(75017),he=t(76479),c=t(93812),$=t(98043),K=t(31748),q=t(97851),_=t(32199),Q=t(72283),ee=t(96437),L=t(41574),te=t(71001),Ae=t(27379),fe=t(85321),Ie=t(16549),De=t(69208),ve=t(35296),O=t(81774),T=t(15400),Ne=t(83993),Z=t(82056),Ce=t(76635),Te=t(56924);const Ze={Hint:(0,e.jsx)(Ie.Z,{fontSize:"small"}),Info:(0,e.jsx)(De.Z,{fontSize:"small",color:"info"}),Warning:(0,e.jsx)(ve.Z,{fontSize:"small",color:"warning"}),Error:(0,e.jsx)(fe.Z,{fontSize:"small",color:"error"})},we=(0,B.ZL)()(s=>({listItem:{paddingTop:0,paddingBottom:0,marginBlock:s.spacing(.5)},listItemText:{display:"flex",flexDirection:"row",margin:0,gap:s.spacing(1)},listItemIcon:{alignSelf:"flex-start",minWidth:s.spacing(3)}})),Se=({diagnostics:s})=>{const{classes:a}=we();return s.length===0?(0,e.jsx)(c.Z,{gap:.5,padding:2,children:(0,e.jsx)(b.Z,{variant:"body2",color:"text.secondary",children:"No problems to display."})}):(0,e.jsx)(O.Z,{dense:!0,disablePadding:!0,children:s.map(({severity:d,message:M,source:o,startColumn:i,startLineNumber:n},y)=>{const x=(0,Ce.invert)(Te.H_)[d]??"Error",I=n!=null&&i!=null?`[${n+1},${i+1}]`:"";return(0,e.jsxs)(T.ZP,{className:a.listItem,children:[(0,e.jsx)(Ne.Z,{className:a.listItemIcon,children:Ze[x]}),(0,e.jsx)(Z.Z,{className:a.listItemText,primary:M,secondary:`${o} ${I}`,secondaryTypographyProps:{color:"text.secondary"}})]},`${M}_${y}`)})})};var k=t(14117),be=t(30650),ze=t(11701);const Le=({logs:s})=>{const a=(0,ze.lk)(),d={string:a.base0B,number:a.base09,boolean:a.base09,object:a.base08,undefined:a.base08};return s.length===0?(0,e.jsxs)(c.Z,{gap:.5,padding:2,children:[(0,e.jsx)(b.Z,{variant:"body2",color:"text.secondary",children:"No logs to display."}),(0,e.jsxs)(b.Z,{variant:"body2",color:"text.secondary",children:["Invoke ",(0,e.jsx)("code",{children:"log(someValue)"})," in your Foxglove Studio node code to see data printed here."]})]}):(0,e.jsx)(O.Z,{dense:!0,disablePadding:!0,children:s.map(({source:M,value:o},i)=>{const n=o!=null&&typeof o=="object";return(0,e.jsx)(T.ZP,{disablePadding:!0,secondaryAction:(0,e.jsx)(X.Z,{underline:"always",variant:"body2",color:"text.secondary",children:M}),children:(0,e.jsx)(k.Z,{children:n?(0,e.jsx)(be.ZP,{hideRoot:!0,data:o,invertTheme:!1,theme:a}):(0,e.jsx)(Z.Z,{primary:o==null||o===!1?String(o):o,primaryTypographyProps:{color:d[typeof o]??"text.primary"}})})},`${i}${M}`)})})},Oe=36,ke=(0,B.ZL)()(s=>({badge:{alignItems:"center",[`.${q.Z.badge}`]:{margin:s.spacing(-.25,0,-.25,1),position:"relative",transform:"none",[`&.${q.Z.invisible}`]:{display:"none"}}},tabs:{minHeight:Oe,position:"relative",bottom:-1,[`.${_.Z.root}`]:{minHeight:"auto",minWidth:s.spacing(8),padding:s.spacing(1.5,2),color:s.palette.text.secondary,"&.Mui-selected":{color:s.palette.text.primary}}}})),Ee=({nodeId:s,isSaved:a,save:d,diagnostics:M,logs:o})=>{const{classes:i}=ke(),[n,y]=(0,j.useState)("closed"),[x,I]=(0,j.useState)(!0),{clearUserNodeLogs:w}=(0,K.B)(),h=(0,j.useRef)(null),S=(f,m)=>{y(m)},D=f=>{n===f&&y("closed")};return(0,j.useEffect)(()=>{x&&h.current&&(h.current.scrollTop=h.current.scrollHeight)},[x,o]),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(Q.Z,{elevation:0,children:[(0,e.jsx)(z.Z,{}),(0,e.jsxs)(c.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",gap:1,paddingRight:1,children:[(0,e.jsxs)(ee.Z,{className:i.tabs,textColor:"inherit",value:n!=="closed"?n:!1,onChange:S,children:[(0,e.jsx)(L.Z,{label:(0,e.jsx)(te.Z,{color:"error",badgeContent:M.length,invisible:M.length===0,className:i.badge,children:"Problems"}),value:"diagnostics","data-testid":"np-errors",onClick:()=>{D("diagnostics")}}),(0,e.jsx)(L.Z,{label:(0,e.jsx)(te.Z,{color:"error",className:i.badge,badgeContent:o.length,invisible:o.length===0,children:"Logs"}),value:"logs","data-testid":"np-logs",onClick:()=>{D("logs")}})]}),(0,e.jsxs)(c.Z,{direction:"row",alignItems:"center",gap:.5,children:[n==="logs"&&(0,e.jsx)(W.Z,{size:"small",color:"primary",variant:"contained","data-testid":"np-logs-clear",disabled:o.length===0,onClick:()=>{s!=null&&w(s)},children:"Clear logs"}),(0,e.jsx)(W.Z,{size:"small",color:"primary",variant:"contained",disabled:a,title:"Ctrl/Cmd + S",onClick:()=>{s!=null&&(d(),w(s))},children:a?"Saved":"Save"})]})]}),n!=="closed"&&(0,e.jsx)(z.Z,{})]}),(0,e.jsx)(Q.Z,{elevation:0,children:(0,e.jsx)(c.Z,{fullHeight:!0,position:"relative",children:(0,e.jsx)(Ae.Z,{onScroll:({currentTarget:f})=>{const m=f.scrollHeight-f.scrollTop>f.clientHeight;m&&x?I(!1):!m&&!x&&I(!0)},ref:h,in:n!=="closed",children:(0,e.jsxs)(c.Z,{overflow:"auto",style:{height:150},children:[n==="diagnostics"&&(0,e.jsx)(Se,{diagnostics:M}),n==="logs"&&(0,e.jsx)(Le,{logs:o})]})})})})]})};var Pe=t(92679),Ye=t(28614),Be=t(50334),Re=t(63077),We=t(44419),Qe=t(65154),se=t(86294),Ve=t(64942);const Ge=[{name:"Skeleton",description:"An empty script",template:`import { Input, Message } from "./types";

type Output = {};

export const inputs = ["/topic"];
export const output = "/studio_script/output_topic";

export default function script(event: Input<"/topic">): Output {
  return {};
};
`},{name:"Markers",description:"A script that publishes one or more markers",template:`// This example shows how to publish a Marker message from a User Script.
//
// Publishing Marker messages with a User Script is a good way to visualize non-visual
// data.
//
// For example, if your robot calculates some projected paths and publishes them between two
// subsystems as a message, you can make a node that visualizes the path as a line list marker and view it in the 3D
// panel.

import { Input, Message } from "./types";

// The \`./markers\` utility provides a helper function to build a Marker.
import { buildRosMarker, MarkerTypes } from "./markers";

type GlobalVariables = { id: number };

export const inputs = ["/input/topic"];
export const output = "/studio_script/my_custom_topic";

// Our node will output a Marker message.
type Marker = Message<"visualization_msgs/Marker">;

// If you want to output multiple markers for a single input message, use a MarkerArray.
// The marker array message has one field, \`markers\`, which is an array of Marker messaages.
// type MarkerArray = Message<"visualization_msgs/MarkerArray">;

export default function script(event: Input<"/input/topic">, globalVars: GlobalVariables): Marker {
  return buildRosMarker({
      // Add any fields you want to set in the marker here
      // Any fields you omit will use default values
      // e.g 'type: MarkerTypes.ARROW' */
  });
};
`},{name:"Multiple Inputs",description:"A script that receives inputs on multiple topics",template:`// This example shows how to subscribe to multiple input topics.
//
// NOTE:
// User Scripts can subscribe to multiple input topics, but can only publish on a single topic.

import { Input } from "./types";

type Output = { topic: string };
type GlobalVariables = { id: number };

// List all the input topics in the \`input\` array
export const inputs = ["/input/topic", "/input/another"];
export const output = "/studio_script/output_topic";

// Make an InputEvent type alias. Since our node will get a message from either input topic, we need to enumerate the topics.
type InputEvent = Input<"/input/topic"> | Input<"/input/another">;

export default function script(event: InputEvent, globalVars: GlobalVariables): Output {
  // Remember that your node will get messages on each topic, so you
  // need to check each event's topic to know which fields are available on the message.
  switch (event.topic) {
    case "/input/topic":
      // topic specific input logic
      // Our message fields are specific to our topic message
      break;
    case "/input/another":
      // another specific logic
      break;
  }

  // Nodes can only output one type of message regardless of the inputs
  // Here we echo back the input topic as an example.
  return {
    topic: event.topic,
  };
};
`},{name:"GPS Location",description:"A script that publishes foxglove.LocationFix",template:`// This example shows how to publish a foxglove.LocationFix message
//
// https://foxglove.dev/docs/studio/messages/location-fix
//
// You can visualize this message with the Map panel
// https://foxglove.dev/docs/studio/panels/map

import { Input } from "./types";
import { LocationFix, PositionCovarianceType } from "@foxglove/schemas";

export const inputs = ["/input/topic"];
export const output = "/studio_script/my_gps";

export default function script(event: Input<"/input/topic">): LocationFix {
  return {
    timestamp: event.receiveTime,
    frame_id: "frame",
    latitude: 51.477928,
    longitude: -0.001545,
    altitude: 0,
    position_covariance_type: PositionCovarianceType.APPROXIMATED,
    position_covariance: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  };
}
`}],Ue=(0,B.ZL)()(s=>({tabs:{[`.${_.Z.root}`]:{minWidth:"auto",padding:s.spacing(1,1.125)}},explorerWrapper:{backgroundColor:s.palette.background.paper,width:350,overflow:"auto"}})),Fe=({nodes:s,selectNode:a,deleteNode:d,collapse:M,selectedNodeId:o})=>(0,e.jsxs)(c.Z,{flex:"auto",children:[(0,e.jsx)(V,{title:"Scripts",collapse:M}),(0,e.jsx)(O.Z,{dense:!0,children:Object.keys(s).map(i=>(0,e.jsx)(T.ZP,{disablePadding:!0,secondaryAction:(0,e.jsx)(Y.Z,{size:"small",onClick:()=>{d(i)},edge:"end","aria-label":"delete",title:"Delete",color:"error",children:(0,e.jsx)(Be.Z,{fontSize:"small"})}),children:(0,e.jsx)(k.Z,{selected:o===i,onClick:()=>{a(i)},children:(0,e.jsx)(Z.Z,{primary:s[i]?.name,primaryTypographyProps:{variant:"body1"}})})},i))})]}),{utilityFiles:He}=(0,Ve.L)(),V=({title:s,subheader:a,collapse:d})=>(0,e.jsx)(Qe.Z,{title:s,titleTypographyProps:{variant:"h5",gutterBottom:!0},subheader:a,subheaderTypographyProps:{variant:"body2",color:"text.secondary"},action:(0,e.jsx)(Y.Z,{size:"small",onClick:d,title:"Collapse",children:(0,e.jsx)(Pe.Z,{})})}),Je=({userNodes:s,selectNode:a,deleteNode:d,selectedNodeId:M,explorer:o,updateExplorer:i,setScriptOverride:n,script:y,addNewNode:x})=>{const{classes:I}=Ue(),w=o==="nodes",h=o==="utils",S=o==="templates",D=(0,j.useCallback)(v=>{const l=se.Uri.parse(`file://${v}`),u=se.editor.getModel(l);u&&n({filePath:u.uri.path,code:u.getValue(),readOnly:!0,selection:void 0},2)},[n]),f=(0,j.useMemo)(()=>{switch(o){case void 0:return!1;case"nodes":return"nodes";case"templates":return"templates";case"utils":return"utils"}return!1},[o]),m=(0,j.useMemo)(()=>({nodes:(0,e.jsx)(Fe,{nodes:s,selectNode:a,deleteNode:d,collapse:()=>{i(void 0)},selectedNodeId:M}),utils:(0,e.jsxs)(c.Z,{flex:"auto",position:"relative",children:[(0,e.jsx)(V,{collapse:()=>{i(void 0)},title:"Utilities",subheader:(0,e.jsxs)(b.Z,{variant:"body2",color:"text.secondary",children:["You can import any of these modules into your script using the following syntax:"," ",(0,e.jsx)("pre",{children:'import { ... } from "./pointClouds.ts".'})]})}),(0,e.jsxs)(O.Z,{dense:!0,children:[He.map(({fileName:v,filePath:l})=>(0,e.jsx)(T.ZP,{disablePadding:!0,onClick:D.bind(void 0,l),selected:y?l===y.filePath:!1,children:(0,e.jsx)(k.Z,{children:(0,e.jsx)(Z.Z,{primary:v,primaryTypographyProps:{variant:"body1"}})})},l)),(0,e.jsx)(T.ZP,{disablePadding:!0,onClick:D.bind(void 0,"/studio_script/generatedTypes.ts"),selected:y?y.filePath==="/studio_script/generatedTypes.ts":!1,children:(0,e.jsx)(k.Z,{children:(0,e.jsx)(Z.Z,{primary:"generatedTypes.ts",primaryTypographyProps:{variant:"body1"}})})})]})]}),templates:(0,e.jsxs)(c.Z,{flex:"auto",children:[(0,e.jsx)(V,{title:"Templates",subheader:"Create scripts from these templates, click a template to create a new script.",collapse:()=>{i(void 0)}}),(0,e.jsx)(O.Z,{dense:!0,children:Ge.map(({name:v,description:l,template:u})=>(0,e.jsx)(T.ZP,{disablePadding:!0,onClick:()=>{x(u)},children:(0,e.jsx)(k.Z,{children:(0,e.jsx)(Z.Z,{primary:v,primaryTypographyProps:{variant:"body1"},secondary:l})})},v))})]})}),[x,d,D,y,a,M,i,s]);return(0,e.jsx)(Q.Z,{elevation:0,children:(0,e.jsxs)(c.Z,{direction:"row",fullHeight:!0,children:[(0,e.jsxs)(ee.Z,{className:I.tabs,orientation:"vertical",value:f,children:[(0,e.jsx)(L.Z,{disableRipple:!0,value:"nodes",title:"Scripts",icon:(0,e.jsx)(We.Z,{fontSize:"large"}),"data-testid":"node-explorer",onClick:()=>{i(w?void 0:"nodes")}}),(0,e.jsx)(L.Z,{disableRipple:!0,value:"utils",title:"Utilities",icon:(0,e.jsx)(Ye.Z,{fontSize:"large"}),"data-testid":"utils-explorer",onClick:()=>{i(h?void 0:"utils")}}),(0,e.jsx)(L.Z,{disableRipple:!0,value:"templates",title:"Templates",icon:(0,e.jsx)(Re.Z,{fontSize:"large"}),"data-testid":"templates-explorer",onClick:()=>{i(S?void 0:"templates")}})]}),o!=null&&(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(z.Z,{flexItem:!0,orientation:"vertical"}),(0,e.jsx)("div",{className:I.explorerWrapper,children:m[o]})]}),(0,e.jsx)(z.Z,{flexItem:!0,orientation:"vertical"})]})})};var Xe=t(39367),A=t(2784);const $e=A.lazy(async()=>await Promise.all([t.e(144),t.e(1910)]).then(t.bind(t,19596))),Ke=`// The ./types module provides helper types for your Input events and messages.
import { Input, Message } from "./types";

// Your script can output well-known message types, any of your custom message types, or
// complete custom message types.
//
// Use \`Message\` to access types from the schemas defined in your data source:
// type Twist = Message<"geometry_msgs/Twist">;
//
// Import from the @foxglove/schemas package to use foxglove schema types:
// import { Pose, LocationFix } from "@foxglove/schemas";
//
// Conventionally, it's common to make a _type alias_ for your script's output type
// and use that type name as the return type for your script function.
// Here we've called the type \`Output\` but you can pick any type name.
type Output = {
  hello: string;
};

// These are the topics your script "subscribes" to. Studio will invoke your script function
// when any message is received on one of these topics.
export const inputs = ["/input/topic"];

// Any output your script produces is "published" to this topic. Published messages are only visible within Studio, not to your original data source.
export const output = "/studio_script/output_topic";

// This function is called with messages from your input topics.
// The first argument is an event with the topic, receive time, and message.
// Use the \`Input<...>\` helper to get the correct event type for your input topic messages.
export default function script(event: Input<"/input/topic">): Output {
  return {
    hello: "world!",
  };
};`,ne=(0,B.ZL)()(s=>({emptyState:{backgroundColor:s.palette.background.default},unsavedDot:{width:6,height:6,borderRadius:"50%",top:"50%",position:"absolute",right:s.spacing(1),transform:"translateY(-50%)",backgroundColor:s.palette.text.secondary},input:{[`.${pe.Z.input}`]:{padding:s.spacing(1)}}}));function qe(s){return{general:{fields:{autoFormatOnSave:{input:"boolean",label:"Auto-format on save",value:s.autoFormatOnSave}}}}}const _e=({addNewNode:s})=>{const{classes:a}=ne();return(0,e.jsx)(ye.Z,{className:a.emptyState,children:(0,e.jsx)(Me.Z,{maxWidth:"xs",children:(0,e.jsxs)(c.Z,{justifyContent:"center",alignItems:"center",gap:1,fullHeight:!0,children:[(0,e.jsxs)(b.Z,{variant:"inherit",gutterBottom:!0,children:["Welcome to User Scripts!",(0,e.jsx)("br",{}),"Get started by reading the"," ",(0,e.jsx)(X.Z,{color:"primary",underline:"hover",href:"https://foxglove.dev/docs/studio/panels/user-scripts",target:"_blank",children:"docs"}),", or just create a new script."]}),(0,e.jsx)(W.Z,{color:"inherit",variant:"contained",onClick:()=>{s()},startIcon:(0,e.jsx)(J.Z,{}),children:"New script"})]})})})},et=Object.freeze({}),tt=s=>s.selectedLayout?.data?.userNodes??et;function st(s){const{config:a,saveConfig:d}=s,{classes:M,theme:o}=ne(),{autoFormatOnSave:i=!1,selectedNodeId:n,editorForStorybook:y}=a,x=(0,Xe.W0)(),[I,w]=A.useState(void 0),h=(0,$.NS)(tt),{state:{nodeStates:S,rosLib:D,typesLib:f}}=(0,K.B)(),{setUserNodes:m}=(0,$._B)(),v=(n!=null?S[n]?.diagnostics:void 0)??[],l=n!=null?h[n]:void 0,[u,E]=A.useState([]),p=u.length>0?u[u.length-1]:void 0,G=!!l&&!!p&&p.filePath===l.name,R=!G||p.code===l.sourceCode,at=(n!=null?S[n]?.logs:void 0)??[],[oe,ae]=(0,j.useState)(()=>p?p.filePath+(p.readOnly?" (READONLY)":""):"script name"),U=o.palette.mode==="dark",it={backgroundColor:o.palette.background[U?"default":"paper"],width:`${Math.max(oe.length+4,10)}ch`},ie=(0,j.useCallback)(r=>{if(r.action!=="update")return;const{input:g,value:N,path:ct}=r.payload;g==="boolean"&&ct[1]==="autoFormatOnSave"&&d({autoFormatOnSave:N})},[d]);(0,j.useEffect)(()=>{x({actionHandler:ie,nodes:qe(a)})},[ie,a,x]),A.useLayoutEffect(()=>{if(l){const r=s.config.additionalBackStackItems??[];E([{filePath:l.name,code:l.sourceCode,readOnly:!1},...r])}},[s.config.additionalBackStackItems,l]),A.useLayoutEffect(()=>{ae(()=>p?p.filePath+(p.readOnly?" (READONLY)":""):"script name")},[p]);const P=(0,j.useCallback)(()=>{n!=null&&l&&p&&G&&m({[n]:{...l,sourceCode:p.code}})},[p,G,l,n,m]),F=A.useCallback(r=>{P();const g=(0,me.Z)(),N=r??Ke;m({[g]:{sourceCode:N,name:`${g.split("-")[0]}`}}),d({selectedNodeId:g})},[d,P,m]),le=A.useCallback(r=>{n==null||r==null||r===""||!l||m({[n]:{...l,sourceCode:r}})},[l,n,m]),re=A.useCallback((r,g)=>{g!=null&&g>0&&u.length>=g?E([...u.slice(0,g-1),r]):E([...u,r])},[u]),lt=A.useCallback(()=>{E(u.slice(0,u.length-1))},[u]),rt=A.useCallback(r=>{const g=[...u];if(g.length>0){const N=g.pop();N&&!N.readOnly&&E([...g,{...N,code:r}])}},[u]),ce=(0,j.useCallback)(()=>{R||P()},[R,P]),de=(0,j.useRef)(ce);return de.current=ce,(0,j.useEffect)(()=>()=>{de.current()},[]),(0,e.jsxs)(c.Z,{fullHeight:!0,children:[(0,e.jsx)(he.Z,{}),(0,e.jsx)(z.Z,{}),(0,e.jsxs)(c.Z,{direction:"row",fullHeight:!0,overflow:"hidden",children:[(0,e.jsx)(Je,{explorer:I,updateExplorer:w,selectNode:r=>{P(),d({selectedNodeId:r})},deleteNode:r=>{m({...h,[r]:void 0}),d({selectedNodeId:void 0})},selectedNodeId:n,userNodes:h,script:p,setScriptOverride:re,addNewNode:F}),(0,e.jsxs)(c.Z,{flexGrow:1,fullHeight:!0,overflow:"hidden",style:{backgroundColor:o.palette.background[U?"paper":"default"]},children:[(0,e.jsxs)(c.Z,{direction:"row",alignItems:"center",children:[u.length>1&&(0,e.jsx)(Y.Z,{title:"Go back","data-testid":"go-back",size:"small",onClick:lt,children:(0,e.jsx)(ue.Z,{})}),n!=null&&l&&(0,e.jsxs)("div",{style:{position:"relative"},children:[(0,e.jsx)(ge.Z,{className:M.input,size:"small",disableUnderline:!0,placeholder:"script name",value:oe,disabled:!p||p.readOnly,onChange:r=>{const g=r.target.value;ae(g),m({...h,[n]:{...l,name:g}})},inputProps:{spellCheck:!1,style:it}}),!R&&(0,e.jsx)("div",{className:M.unsavedDot})]}),(0,e.jsx)(Y.Z,{title:"New node","data-testid":"new-node",size:"small",onClick:()=>{F()},children:(0,e.jsx)(J.Z,{})})]}),(0,e.jsxs)(c.Z,{flexGrow:1,overflow:"hidden ",children:[n==null&&(0,e.jsx)(_e,{addNewNode:F}),(0,e.jsx)(c.Z,{flexGrow:1,fullWidth:!0,overflow:"hidden",style:{display:n!=null?"flex":"none"},children:(0,e.jsx)(j.Suspense,{fallback:(0,e.jsx)(c.Z,{direction:"row",flex:"auto",alignItems:"center",justifyContent:"center",fullHeight:!0,fullWidth:!0,style:{backgroundColor:o.palette.background[U?"default":"paper"]},children:(0,e.jsx)(je.Z,{size:28})}),children:y??(0,e.jsx)($e,{autoFormatOnSave:i,script:p,setScriptCode:rt,setScriptOverride:re,rosLib:D,typesLib:f,save:le})})}),(0,e.jsx)(c.Z,{children:(0,e.jsx)(Ee,{nodeId:n,isSaved:R,save:()=>{le(p?.code)},diagnostics:v,logs:at})})]})]})]})]})}const nt={selectedNodeId:void 0,autoFormatOnSave:!0},ot=(0,xe.Z)(Object.assign(st,{panelType:"NodePlayground",defaultConfig:nt}))},94748:C=>{C.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAAAHUlEQVQYV2PYvXu3JAi7uLiAMaYAjAGTQBPYLQkAa/0Zef3qRswAAAAASUVORK5CYII="},6161:C=>{C.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA1MyAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDguMDM2NCA0LjAxMDQySDQuMDA3NzlMNC4wMDc3OSAzMi4wMjg2SDQ4LjAzNjRWNC4wMTA0MlpNNC4wMDc3OSAwLjAwNzgxMjVDMS43OTcyMSAwLjAwNzgxMjUgMC4wMDUxODc5OSAxLjc5OTg0IDAuMDA1MTg3OTkgNC4wMTA0MlYzMi4wMjg2QzAuMDA1MTg3OTkgMzQuMjM5MiAxLjc5NzIxIDM2LjAzMTIgNC4wMDc3OSAzNi4wMzEySDQ4LjAzNjRDNTAuMjQ3IDM2LjAzMTIgNTIuMDM5IDM0LjIzOTIgNTIuMDM5IDMyLjAyODZWNC4wMTA0MkM1Mi4wMzkgMS43OTk4NCA1MC4yNDcgMC4wMDc4MTI1IDQ4LjAzNjQgMC4wMDc4MTI1SDQuMDA3NzlaTTguMDEwNDIgOC4wMTMwMkgxMi4wMTNWMTIuMDE1Nkg4LjAxMDQyVjguMDEzMDJaTTIwLjAxODIgOC4wMTMwMkgxNi4wMTU2VjEyLjAxNTZIMjAuMDE4MlY4LjAxMzAyWk0yNC4wMjA4IDguMDEzMDJIMjguMDIzNFYxMi4wMTU2SDI0LjAyMDhWOC4wMTMwMlpNMzYuMDI4NiA4LjAxMzAySDMyLjAyNlYxMi4wMTU2SDM2LjAyODZWOC4wMTMwMlpNNDAuMDMxMiA4LjAxMzAySDQ0LjAzMzlWMTIuMDE1Nkg0MC4wMzEyVjguMDEzMDJaTTE2LjAxNTYgMTYuMDE4Mkg4LjAxMDQyVjIwLjAyMDhIMTYuMDE1NlYxNi4wMTgyWk0yMC4wMTgyIDE2LjAxODJIMjQuMDIwOFYyMC4wMjA4SDIwLjAxODJWMTYuMDE4MlpNMzIuMDI2IDE2LjAxODJIMjguMDIzNFYyMC4wMjA4SDMyLjAyNlYxNi4wMTgyWk00NC4wMzM5IDE2LjAxODJWMjAuMDIwOEgzNi4wMjg2VjE2LjAxODJINDQuMDMzOVpNMTIuMDEzIDI0LjAyMzRIOC4wMTA0MlYyOC4wMjZIMTIuMDEzVjI0LjAyMzRaTTE2LjAxNTYgMjQuMDIzNEgzNi4wMjg2VjI4LjAyNkgxNi4wMTU2VjI0LjAyMzRaTTQ0LjAzMzkgMjQuMDIzNEg0MC4wMzEyVjI4LjAyNkg0NC4wMzM5VjI0LjAyMzRaIiBmaWxsPSIjNDI0MjQyIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg=="},51096:C=>{C.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA1MyAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDguMDM2NCA0LjAxMDQySDQuMDA3NzlMNC4wMDc3OSAzMi4wMjg2SDQ4LjAzNjRWNC4wMTA0MlpNNC4wMDc3OSAwLjAwNzgxMjVDMS43OTcyMSAwLjAwNzgxMjUgMC4wMDUxODc5OSAxLjc5OTg0IDAuMDA1MTg3OTkgNC4wMTA0MlYzMi4wMjg2QzAuMDA1MTg3OTkgMzQuMjM5MiAxLjc5NzIxIDM2LjAzMTIgNC4wMDc3OSAzNi4wMzEySDQ4LjAzNjRDNTAuMjQ3IDM2LjAzMTIgNTIuMDM5IDM0LjIzOTIgNTIuMDM5IDMyLjAyODZWNC4wMTA0MkM1Mi4wMzkgMS43OTk4NCA1MC4yNDcgMC4wMDc4MTI1IDQ4LjAzNjQgMC4wMDc4MTI1SDQuMDA3NzlaTTguMDEwNDIgOC4wMTMwMkgxMi4wMTNWMTIuMDE1Nkg4LjAxMDQyVjguMDEzMDJaTTIwLjAxODIgOC4wMTMwMkgxNi4wMTU2VjEyLjAxNTZIMjAuMDE4MlY4LjAxMzAyWk0yNC4wMjA4IDguMDEzMDJIMjguMDIzNFYxMi4wMTU2SDI0LjAyMDhWOC4wMTMwMlpNMzYuMDI4NiA4LjAxMzAySDMyLjAyNlYxMi4wMTU2SDM2LjAyODZWOC4wMTMwMlpNNDAuMDMxMiA4LjAxMzAySDQ0LjAzMzlWMTIuMDE1Nkg0MC4wMzEyVjguMDEzMDJaTTE2LjAxNTYgMTYuMDE4Mkg4LjAxMDQyVjIwLjAyMDhIMTYuMDE1NlYxNi4wMTgyWk0yMC4wMTgyIDE2LjAxODJIMjQuMDIwOFYyMC4wMjA4SDIwLjAxODJWMTYuMDE4MlpNMzIuMDI2IDE2LjAxODJIMjguMDIzNFYyMC4wMjA4SDMyLjAyNlYxNi4wMTgyWk00NC4wMzM5IDE2LjAxODJWMjAuMDIwOEgzNi4wMjg2VjE2LjAxODJINDQuMDMzOVpNMTIuMDEzIDI0LjAyMzRIOC4wMTA0MlYyOC4wMjZIMTIuMDEzVjI0LjAyMzRaTTE2LjAxNTYgMjQuMDIzNEgzNi4wMjg2VjI4LjAyNkgxNi4wMTU2VjI0LjAyMzRaTTQ0LjAzMzkgMjQuMDIzNEg0MC4wMzEyVjI4LjAyNkg0NC4wMzM5VjI0LjAyMzRaIiBmaWxsPSIjQzVDNUM1Ii8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg=="}}]);

//# sourceMappingURL=1159.3ab6010cf4bb0341f276.js.map