var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _typeof2=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}(function webpackUniversalModuleDefinition(root,factory){if((typeof exports==='undefined'?'undefined':_typeof2(exports))==='object'&&(typeof module==='undefined'?'undefined':_typeof2(module))==='object')module.exports=factory();else if(typeof define==='function'&&define.amd)define([],factory);else if((typeof exports==='undefined'?'undefined':_typeof2(exports))==='object')exports["io"]=factory();else root["io"]=factory();})(this,function(){return(/******/function(modules){// webpackBootstrap
/******/// The module cache
/******/var installedModules={};/******/// The require function
/******/function __webpack_require__(moduleId){/******/// Check if module is in cache
/******/if(installedModules[moduleId])/******/return installedModules[moduleId].exports;/******/// Create a new module (and put it into the cache)
/******/var module=installedModules[moduleId]={/******/exports:{},/******/id:moduleId,/******/loaded:false/******/};/******/// Execute the module function
/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);/******/// Flag the module as loaded
/******/module.loaded=true;/******/// Return the exports of the module
/******/return module.exports;/******/}/******/// expose the modules object (__webpack_modules__)
/******/__webpack_require__.m=modules;/******/// expose the module cache
/******/__webpack_require__.c=installedModules;/******/// __webpack_public_path__
/******/__webpack_require__.p="";/******/// Load entry module and return exports
/******/return __webpack_require__(0);/******/}(/************************************************************************//******/[/* 0 *//***/function(module,exports,__webpack_require__){'use strict';var _typeof=typeof Symbol==="function"&&_typeof2(Symbol.iterator)==="symbol"?function(obj){return typeof obj==='undefined'?'undefined':_typeof2(obj);}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj==='undefined'?'undefined':_typeof2(obj);};/**
	 * Module dependencies.
	 */var url=__webpack_require__(1);var parser=__webpack_require__(7);var Manager=__webpack_require__(17);var debug=__webpack_require__(3)('socket.io-client');/**
	 * Module exports.
	 */module.exports=exports=lookup;/**
	 * Managers cache.
	 */var cache=exports.managers={};/**
	 * Looks up an existing `Manager` for multiplexing.
	 * If the user summons:
	 *
	 *   `io('http://localhost/a');`
	 *   `io('http://localhost/b');`
	 *
	 * We reuse the existing instance based on same scheme/port/host,
	 * and we initialize sockets for each namespace.
	 *
	 * @api public
	 */function lookup(uri,opts){if((typeof uri==='undefined'?'undefined':_typeof(uri))==='object'){opts=uri;uri=undefined;}opts=opts||{};var parsed=url(uri);var source=parsed.source;var id=parsed.id;var path=parsed.path;var sameNamespace=cache[id]&&path in cache[id].nsps;var newConnection=opts.forceNew||opts['force new connection']||false===opts.multiplex||sameNamespace;var io;if(newConnection){debug('ignoring socket cache for %s',source);io=Manager(source,opts);}else{if(!cache[id]){debug('new io instance for %s',source);cache[id]=Manager(source,opts);}io=cache[id];}if(parsed.query&&!opts.query){opts.query=parsed.query;}else if(opts&&'object'===_typeof(opts.query)){opts.query=encodeQueryString(opts.query);}return io.socket(parsed.path,opts);}/**
	 *  Helper method to parse query objects to string.
	 * @param {object} query
	 * @returns {string}
	 */function encodeQueryString(obj){var str=[];for(var p in obj){if(obj.hasOwnProperty(p)){str.push(encodeURIComponent(p)+'='+encodeURIComponent(obj[p]));}}return str.join('&');}/**
	 * Protocol version.
	 *
	 * @api public
	 */exports.protocol=parser.protocol;/**
	 * `connect`.
	 *
	 * @param {String} uri
	 * @api public
	 */exports.connect=lookup;/**
	 * Expose constructors for standalone build.
	 *
	 * @api public
	 */exports.Manager=__webpack_require__(17);exports.Socket=__webpack_require__(44);/***/},/* 1 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global){'use strict';/**
	 * Module dependencies.
	 */var parseuri=__webpack_require__(2);var debug=__webpack_require__(3)('socket.io-client:url');/**
	 * Module exports.
	 */module.exports=url;/**
	 * URL parser.
	 *
	 * @param {String} url
	 * @param {Object} An object meant to mimic window.location.
	 *                 Defaults to window.location.
	 * @api public
	 */function url(uri,loc){var obj=uri;// default to window.location
loc=loc||global.location;if(null==uri)uri=loc.protocol+'//'+loc.host;// relative path support
if('string'===typeof uri){if('/'===uri.charAt(0)){if('/'===uri.charAt(1)){uri=loc.protocol+uri;}else{uri=loc.host+uri;}}if(!/^(https?|wss?):\/\//.test(uri)){debug('protocol-less url %s',uri);if('undefined'!==typeof loc){uri=loc.protocol+'//'+uri;}else{uri='https://'+uri;}}// parse
debug('parse %s',uri);obj=parseuri(uri);}// make sure we treat `localhost:80` and `localhost` equally
if(!obj.port){if(/^(http|ws)$/.test(obj.protocol)){obj.port='80';}else if(/^(http|ws)s$/.test(obj.protocol)){obj.port='443';}}obj.path=obj.path||'/';var ipv6=obj.host.indexOf(':')!==-1;var host=ipv6?'['+obj.host+']':obj.host;// define unique id
obj.id=obj.protocol+'://'+host+':'+obj.port;// define href
obj.href=obj.protocol+'://'+host+(loc&&loc.port===obj.port?'':':'+obj.port);return obj;}/* WEBPACK VAR INJECTION */}).call(exports,function(){return this;}());/***/},/* 2 *//***/function(module,exports){/**
	 * Parses an URI
	 *
	 * @author Steven Levithan <stevenlevithan.com> (MIT license)
	 * @api private
	 */var re=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;var parts=['source','protocol','authority','userInfo','user','password','host','port','relative','path','directory','file','query','anchor'];module.exports=function parseuri(str){var src=str,b=str.indexOf('['),e=str.indexOf(']');if(b!=-1&&e!=-1){str=str.substring(0,b)+str.substring(b,e).replace(/:/g,';')+str.substring(e,str.length);}var m=re.exec(str||''),uri={},i=14;while(i--){uri[parts[i]]=m[i]||'';}if(b!=-1&&e!=-1){uri.source=src;uri.host=uri.host.substring(1,uri.host.length-1).replace(/;/g,':');uri.authority=uri.authority.replace('[','').replace(']','').replace(/;/g,':');uri.ipv6uri=true;}return uri;};/***/},/* 3 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(process){/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */exports=module.exports=__webpack_require__(5);exports.log=log;exports.formatArgs=formatArgs;exports.save=save;exports.load=load;exports.useColors=useColors;exports.storage='undefined'!=typeof chrome&&'undefined'!=typeof chrome.storage?chrome.storage.local:localstorage();/**
	 * Colors.
	 */exports.colors=['lightseagreen','forestgreen','goldenrod','dodgerblue','darkorchid','crimson'];/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */function useColors(){// is webkit? http://stackoverflow.com/a/16459606/376773
// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
return typeof document!=='undefined'&&'WebkitAppearance'in document.documentElement.style||// is firebug? http://stackoverflow.com/a/398120/376773
window.console&&(console.firebug||console.exception&&console.table)||// is firefox >= v31?
// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31;}/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */exports.formatters.j=function(v){try{return JSON.stringify(v);}catch(err){return'[UnexpectedJSONParseError]: '+err.message;}};/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */function formatArgs(){var args=arguments;var useColors=this.useColors;args[0]=(useColors?'%c':'')+this.namespace+(useColors?' %c':' ')+args[0]+(useColors?'%c ':' ')+'+'+exports.humanize(this.diff);if(!useColors)return args;var c='color: '+this.color;args=[args[0],c,'color: inherit'].concat(Array.prototype.slice.call(args,1));// the final "%c" is somewhat tricky, because there could be other
// arguments passed either before or after the %c, so we need to
// figure out the correct index to insert the CSS into
var index=0;var lastC=0;args[0].replace(/%[a-z%]/g,function(match){if('%%'===match)return;index++;if('%c'===match){// we only are interested in the *last* %c
// (the user may have provided their own)
lastC=index;}});args.splice(lastC,0,c);return args;}/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */function log(){// this hackery is required for IE8/9, where
// the `console.log` function doesn't have 'apply'
return'object'===(typeof console==='undefined'?'undefined':_typeof2(console))&&console.log&&Function.prototype.apply.call(console.log,console,arguments);}/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */function save(namespaces){try{if(null==namespaces){exports.storage.removeItem('debug');}else{exports.storage.debug=namespaces;}}catch(e){}}/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */function load(){var r;try{return exports.storage.debug;}catch(e){}// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
if(typeof process!=='undefined'&&'env'in process){return process.env.DEBUG;}}/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */exports.enable(load());/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */function localstorage(){try{return window.localStorage;}catch(e){}}/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(4));/***/},/* 4 *//***/function(module,exports){// shim for using process in browser
var process=module.exports={};// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error('setTimeout has not been defined');}function defaultClearTimeout(){throw new Error('clearTimeout has not been defined');}(function(){try{if(typeof setTimeout==='function'){cachedSetTimeout=setTimeout;}else{cachedSetTimeout=defaultSetTimout;}}catch(e){cachedSetTimeout=defaultSetTimout;}try{if(typeof clearTimeout==='function'){cachedClearTimeout=clearTimeout;}else{cachedClearTimeout=defaultClearTimeout;}}catch(e){cachedClearTimeout=defaultClearTimeout;}})();function runTimeout(fun){if(cachedSetTimeout===setTimeout){//normal enviroments in sane situations
return setTimeout(fun,0);}// if setTimeout wasn't available but was latter defined
if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedSetTimeout(fun,0);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
return cachedSetTimeout.call(null,fun,0);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
return cachedSetTimeout.call(this,fun,0);}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){//normal enviroments in sane situations
return clearTimeout(marker);}// if clearTimeout wasn't available but was latter defined
if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedClearTimeout(marker);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
return cachedClearTimeout.call(null,marker);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
// Some versions of I.E. have different rules for clearTimeout vs setTimeout
return cachedClearTimeout.call(this,marker);}}}var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return;}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else{queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;runClearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue);}};// v8 likes predictible objects
function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version='';// empty string to avoid regexp issues
process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return'/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};/***/},/* 5 *//***/function(module,exports,__webpack_require__){/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */exports=module.exports=debug.debug=debug;exports.coerce=coerce;exports.disable=disable;exports.enable=enable;exports.enabled=enabled;exports.humanize=__webpack_require__(6);/**
	 * The currently active debug mode names, and names to skip.
	 */exports.names=[];exports.skips=[];/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */exports.formatters={};/**
	 * Previously assigned color.
	 */var prevColor=0;/**
	 * Previous log timestamp.
	 */var prevTime;/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */function selectColor(){return exports.colors[prevColor++%exports.colors.length];}/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */function debug(namespace){// define the `disabled` version
function disabled(){}disabled.enabled=false;// define the `enabled` version
function enabled(){var self=enabled;// set `diff` timestamp
var curr=+new Date();var ms=curr-(prevTime||curr);self.diff=ms;self.prev=prevTime;self.curr=curr;prevTime=curr;// add the `color` if not set
if(null==self.useColors)self.useColors=exports.useColors();if(null==self.color&&self.useColors)self.color=selectColor();var args=new Array(arguments.length);for(var i=0;i<args.length;i++){args[i]=arguments[i];}args[0]=exports.coerce(args[0]);if('string'!==typeof args[0]){// anything else let's inspect with %o
args=['%o'].concat(args);}// apply any `formatters` transformations
var index=0;args[0]=args[0].replace(/%([a-z%])/g,function(match,format){// if we encounter an escaped % then don't increase the array index
if(match==='%%')return match;index++;var formatter=exports.formatters[format];if('function'===typeof formatter){var val=args[index];match=formatter.call(self,val);// now we need to remove `args[index]` since it's inlined in the `format`
args.splice(index,1);index--;}return match;});// apply env-specific formatting
args=exports.formatArgs.apply(self,args);var logFn=enabled.log||exports.log||console.log.bind(console);logFn.apply(self,args);}enabled.enabled=true;var fn=exports.enabled(namespace)?enabled:disabled;fn.namespace=namespace;return fn;}/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */function enable(namespaces){exports.save(namespaces);var split=(namespaces||'').split(/[\s,]+/);var len=split.length;for(var i=0;i<len;i++){if(!split[i])continue;// ignore empty strings
namespaces=split[i].replace(/[\\^$+?.()|[\]{}]/g,'\\$&').replace(/\*/g,'.*?');if(namespaces[0]==='-'){exports.skips.push(new RegExp('^'+namespaces.substr(1)+'$'));}else{exports.names.push(new RegExp('^'+namespaces+'$'));}}}/**
	 * Disable debug output.
	 *
	 * @api public
	 */function disable(){exports.enable('');}/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */function enabled(name){var i,len;for(i=0,len=exports.skips.length;i<len;i++){if(exports.skips[i].test(name)){return false;}}for(i=0,len=exports.names.length;i<len;i++){if(exports.names[i].test(name)){return true;}}return false;}/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */function coerce(val){if(val instanceof Error)return val.stack||val.message;return val;}/***/},/* 6 *//***/function(module,exports){/**
	 * Helpers.
	 */var s=1000;var m=s*60;var h=m*60;var d=h*24;var y=d*365.25;/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */module.exports=function(val,options){options=options||{};var type=typeof val==='undefined'?'undefined':_typeof2(val);if(type==='string'&&val.length>0){return parse(val);}else if(type==='number'&&isNaN(val)===false){return options.long?fmtLong(val):fmtShort(val);}throw new Error('val is not a non-empty string or a valid number. val='+JSON.stringify(val));};/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */function parse(str){str=String(str);if(str.length>10000){return;}var match=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);if(!match){return;}var n=parseFloat(match[1]);var type=(match[2]||'ms').toLowerCase();switch(type){case'years':case'year':case'yrs':case'yr':case'y':return n*y;case'days':case'day':case'd':return n*d;case'hours':case'hour':case'hrs':case'hr':case'h':return n*h;case'minutes':case'minute':case'mins':case'min':case'm':return n*m;case'seconds':case'second':case'secs':case'sec':case's':return n*s;case'milliseconds':case'millisecond':case'msecs':case'msec':case'ms':return n;default:return undefined;}}/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */function fmtShort(ms){if(ms>=d){return Math.round(ms/d)+'d';}if(ms>=h){return Math.round(ms/h)+'h';}if(ms>=m){return Math.round(ms/m)+'m';}if(ms>=s){return Math.round(ms/s)+'s';}return ms+'ms';}/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */function fmtLong(ms){return plural(ms,d,'day')||plural(ms,h,'hour')||plural(ms,m,'minute')||plural(ms,s,'second')||ms+' ms';}/**
	 * Pluralization helper.
	 */function plural(ms,n,name){if(ms<n){return;}if(ms<n*1.5){return Math.floor(ms/n)+' '+name;}return Math.ceil(ms/n)+' '+name+'s';}/***/},/* 7 *//***/function(module,exports,__webpack_require__){/**
	 * Module dependencies.
	 */var debug=__webpack_require__(8)('socket.io-parser');var json=__webpack_require__(11);var Emitter=__webpack_require__(13);var binary=__webpack_require__(14);var isBuf=__webpack_require__(16);/**
	 * Protocol version.
	 *
	 * @api public
	 */exports.protocol=4;/**
	 * Packet types.
	 *
	 * @api public
	 */exports.types=['CONNECT','DISCONNECT','EVENT','ACK','ERROR','BINARY_EVENT','BINARY_ACK'];/**
	 * Packet type `connect`.
	 *
	 * @api public
	 */exports.CONNECT=0;/**
	 * Packet type `disconnect`.
	 *
	 * @api public
	 */exports.DISCONNECT=1;/**
	 * Packet type `event`.
	 *
	 * @api public
	 */exports.EVENT=2;/**
	 * Packet type `ack`.
	 *
	 * @api public
	 */exports.ACK=3;/**
	 * Packet type `error`.
	 *
	 * @api public
	 */exports.ERROR=4;/**
	 * Packet type 'binary event'
	 *
	 * @api public
	 */exports.BINARY_EVENT=5;/**
	 * Packet type `binary ack`. For acks with binary arguments.
	 *
	 * @api public
	 */exports.BINARY_ACK=6;/**
	 * Encoder constructor.
	 *
	 * @api public
	 */exports.Encoder=Encoder;/**
	 * Decoder constructor.
	 *
	 * @api public
	 */exports.Decoder=Decoder;/**
	 * A socket.io Encoder instance
	 *
	 * @api public
	 */function Encoder(){}/**
	 * Encode a packet as a single string if non-binary, or as a
	 * buffer sequence, depending on packet type.
	 *
	 * @param {Object} obj - packet object
	 * @param {Function} callback - function to handle encodings (likely engine.write)
	 * @return Calls callback with Array of encodings
	 * @api public
	 */Encoder.prototype.encode=function(obj,callback){debug('encoding packet %j',obj);if(exports.BINARY_EVENT==obj.type||exports.BINARY_ACK==obj.type){encodeAsBinary(obj,callback);}else{var encoding=encodeAsString(obj);callback([encoding]);}};/**
	 * Encode packet as string.
	 *
	 * @param {Object} packet
	 * @return {String} encoded
	 * @api private
	 */function encodeAsString(obj){var str='';var nsp=false;// first is type
str+=obj.type;// attachments if we have them
if(exports.BINARY_EVENT==obj.type||exports.BINARY_ACK==obj.type){str+=obj.attachments;str+='-';}// if we have a namespace other than `/`
// we append it followed by a comma `,`
if(obj.nsp&&'/'!=obj.nsp){nsp=true;str+=obj.nsp;}// immediately followed by the id
if(null!=obj.id){if(nsp){str+=',';nsp=false;}str+=obj.id;}// json data
if(null!=obj.data){if(nsp)str+=',';str+=json.stringify(obj.data);}debug('encoded %j as %s',obj,str);return str;}/**
	 * Encode packet as 'buffer sequence' by removing blobs, and
	 * deconstructing packet into object with placeholders and
	 * a list of buffers.
	 *
	 * @param {Object} packet
	 * @return {Buffer} encoded
	 * @api private
	 */function encodeAsBinary(obj,callback){function writeEncoding(bloblessData){var deconstruction=binary.deconstructPacket(bloblessData);var pack=encodeAsString(deconstruction.packet);var buffers=deconstruction.buffers;buffers.unshift(pack);// add packet info to beginning of data list
callback(buffers);// write all the buffers
}binary.removeBlobs(obj,writeEncoding);}/**
	 * A socket.io Decoder instance
	 *
	 * @return {Object} decoder
	 * @api public
	 */function Decoder(){this.reconstructor=null;}/**
	 * Mix in `Emitter` with Decoder.
	 */Emitter(Decoder.prototype);/**
	 * Decodes an ecoded packet string into packet JSON.
	 *
	 * @param {String} obj - encoded packet
	 * @return {Object} packet
	 * @api public
	 */Decoder.prototype.add=function(obj){var packet;if('string'==typeof obj){packet=decodeString(obj);if(exports.BINARY_EVENT==packet.type||exports.BINARY_ACK==packet.type){// binary packet's json
this.reconstructor=new BinaryReconstructor(packet);// no attachments, labeled binary but no binary data to follow
if(this.reconstructor.reconPack.attachments===0){this.emit('decoded',packet);}}else{// non-binary full packet
this.emit('decoded',packet);}}else if(isBuf(obj)||obj.base64){// raw binary data
if(!this.reconstructor){throw new Error('got binary data when not reconstructing a packet');}else{packet=this.reconstructor.takeBinaryData(obj);if(packet){// received final buffer
this.reconstructor=null;this.emit('decoded',packet);}}}else{throw new Error('Unknown type: '+obj);}};/**
	 * Decode a packet String (JSON data)
	 *
	 * @param {String} str
	 * @return {Object} packet
	 * @api private
	 */function decodeString(str){var p={};var i=0;// look up type
p.type=Number(str.charAt(0));if(null==exports.types[p.type])return error();// look up attachments if type binary
if(exports.BINARY_EVENT==p.type||exports.BINARY_ACK==p.type){var buf='';while(str.charAt(++i)!='-'){buf+=str.charAt(i);if(i==str.length)break;}if(buf!=Number(buf)||str.charAt(i)!='-'){throw new Error('Illegal attachments');}p.attachments=Number(buf);}// look up namespace (if any)
if('/'==str.charAt(i+1)){p.nsp='';while(++i){var c=str.charAt(i);if(','==c)break;p.nsp+=c;if(i==str.length)break;}}else{p.nsp='/';}// look up id
var next=str.charAt(i+1);if(''!==next&&Number(next)==next){p.id='';while(++i){var c=str.charAt(i);if(null==c||Number(c)!=c){--i;break;}p.id+=str.charAt(i);if(i==str.length)break;}p.id=Number(p.id);}// look up json data
if(str.charAt(++i)){p=tryParse(p,str.substr(i));}debug('decoded %s as %j',str,p);return p;}function tryParse(p,str){try{p.data=json.parse(str);}catch(e){return error();}return p;};/**
	 * Deallocates a parser's resources
	 *
	 * @api public
	 */Decoder.prototype.destroy=function(){if(this.reconstructor){this.reconstructor.finishedReconstruction();}};/**
	 * A manager of a binary event's 'buffer sequence'. Should
	 * be constructed whenever a packet of type BINARY_EVENT is
	 * decoded.
	 *
	 * @param {Object} packet
	 * @return {BinaryReconstructor} initialized reconstructor
	 * @api private
	 */function BinaryReconstructor(packet){this.reconPack=packet;this.buffers=[];}/**
	 * Method to be called when binary data received from connection
	 * after a BINARY_EVENT packet.
	 *
	 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
	 * @return {null | Object} returns null if more binary data is expected or
	 *   a reconstructed packet object if all buffers have been received.
	 * @api private
	 */BinaryReconstructor.prototype.takeBinaryData=function(binData){this.buffers.push(binData);if(this.buffers.length==this.reconPack.attachments){// done with buffer list
var packet=binary.reconstructPacket(this.reconPack,this.buffers);this.finishedReconstruction();return packet;}return null;};/**
	 * Cleans up binary packet reconstruction variables.
	 *
	 * @api private
	 */BinaryReconstructor.prototype.finishedReconstruction=function(){this.reconPack=null;this.buffers=[];};function error(data){return{type:exports.ERROR,data:'parser error'};}/***/},/* 8 *//***/function(module,exports,__webpack_require__){/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */exports=module.exports=__webpack_require__(9);exports.log=log;exports.formatArgs=formatArgs;exports.save=save;exports.load=load;exports.useColors=useColors;exports.storage='undefined'!=typeof chrome&&'undefined'!=typeof chrome.storage?chrome.storage.local:localstorage();/**
	 * Colors.
	 */exports.colors=['lightseagreen','forestgreen','goldenrod','dodgerblue','darkorchid','crimson'];/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */function useColors(){// is webkit? http://stackoverflow.com/a/16459606/376773
return'WebkitAppearance'in document.documentElement.style||// is firebug? http://stackoverflow.com/a/398120/376773
window.console&&(console.firebug||console.exception&&console.table)||// is firefox >= v31?
// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31;}/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */exports.formatters.j=function(v){return JSON.stringify(v);};/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */function formatArgs(){var args=arguments;var useColors=this.useColors;args[0]=(useColors?'%c':'')+this.namespace+(useColors?' %c':' ')+args[0]+(useColors?'%c ':' ')+'+'+exports.humanize(this.diff);if(!useColors)return args;var c='color: '+this.color;args=[args[0],c,'color: inherit'].concat(Array.prototype.slice.call(args,1));// the final "%c" is somewhat tricky, because there could be other
// arguments passed either before or after the %c, so we need to
// figure out the correct index to insert the CSS into
var index=0;var lastC=0;args[0].replace(/%[a-z%]/g,function(match){if('%%'===match)return;index++;if('%c'===match){// we only are interested in the *last* %c
// (the user may have provided their own)
lastC=index;}});args.splice(lastC,0,c);return args;}/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */function log(){// this hackery is required for IE8/9, where
// the `console.log` function doesn't have 'apply'
return'object'===(typeof console==='undefined'?'undefined':_typeof2(console))&&console.log&&Function.prototype.apply.call(console.log,console,arguments);}/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */function save(namespaces){try{if(null==namespaces){exports.storage.removeItem('debug');}else{exports.storage.debug=namespaces;}}catch(e){}}/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */function load(){var r;try{r=exports.storage.debug;}catch(e){}return r;}/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */exports.enable(load());/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */function localstorage(){try{return window.localStorage;}catch(e){}}/***/},/* 9 *//***/function(module,exports,__webpack_require__){/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */exports=module.exports=debug;exports.coerce=coerce;exports.disable=disable;exports.enable=enable;exports.enabled=enabled;exports.humanize=__webpack_require__(10);/**
	 * The currently active debug mode names, and names to skip.
	 */exports.names=[];exports.skips=[];/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */exports.formatters={};/**
	 * Previously assigned color.
	 */var prevColor=0;/**
	 * Previous log timestamp.
	 */var prevTime;/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */function selectColor(){return exports.colors[prevColor++%exports.colors.length];}/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */function debug(namespace){// define the `disabled` version
function disabled(){}disabled.enabled=false;// define the `enabled` version
function enabled(){var self=enabled;// set `diff` timestamp
var curr=+new Date();var ms=curr-(prevTime||curr);self.diff=ms;self.prev=prevTime;self.curr=curr;prevTime=curr;// add the `color` if not set
if(null==self.useColors)self.useColors=exports.useColors();if(null==self.color&&self.useColors)self.color=selectColor();var args=Array.prototype.slice.call(arguments);args[0]=exports.coerce(args[0]);if('string'!==typeof args[0]){// anything else let's inspect with %o
args=['%o'].concat(args);}// apply any `formatters` transformations
var index=0;args[0]=args[0].replace(/%([a-z%])/g,function(match,format){// if we encounter an escaped % then don't increase the array index
if(match==='%%')return match;index++;var formatter=exports.formatters[format];if('function'===typeof formatter){var val=args[index];match=formatter.call(self,val);// now we need to remove `args[index]` since it's inlined in the `format`
args.splice(index,1);index--;}return match;});if('function'===typeof exports.formatArgs){args=exports.formatArgs.apply(self,args);}var logFn=enabled.log||exports.log||console.log.bind(console);logFn.apply(self,args);}enabled.enabled=true;var fn=exports.enabled(namespace)?enabled:disabled;fn.namespace=namespace;return fn;}/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */function enable(namespaces){exports.save(namespaces);var split=(namespaces||'').split(/[\s,]+/);var len=split.length;for(var i=0;i<len;i++){if(!split[i])continue;// ignore empty strings
namespaces=split[i].replace(/\*/g,'.*?');if(namespaces[0]==='-'){exports.skips.push(new RegExp('^'+namespaces.substr(1)+'$'));}else{exports.names.push(new RegExp('^'+namespaces+'$'));}}}/**
	 * Disable debug output.
	 *
	 * @api public
	 */function disable(){exports.enable('');}/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */function enabled(name){var i,len;for(i=0,len=exports.skips.length;i<len;i++){if(exports.skips[i].test(name)){return false;}}for(i=0,len=exports.names.length;i<len;i++){if(exports.names[i].test(name)){return true;}}return false;}/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */function coerce(val){if(val instanceof Error)return val.stack||val.message;return val;}/***/},/* 10 *//***/function(module,exports){/**
	 * Helpers.
	 */var s=1000;var m=s*60;var h=m*60;var d=h*24;var y=d*365.25;/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */module.exports=function(val,options){options=options||{};if('string'==typeof val)return parse(val);return options.long?long(val):short(val);};/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */function parse(str){str=''+str;if(str.length>10000)return;var match=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);if(!match)return;var n=parseFloat(match[1]);var type=(match[2]||'ms').toLowerCase();switch(type){case'years':case'year':case'yrs':case'yr':case'y':return n*y;case'days':case'day':case'd':return n*d;case'hours':case'hour':case'hrs':case'hr':case'h':return n*h;case'minutes':case'minute':case'mins':case'min':case'm':return n*m;case'seconds':case'second':case'secs':case'sec':case's':return n*s;case'milliseconds':case'millisecond':case'msecs':case'msec':case'ms':return n;}}/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */function short(ms){if(ms>=d)return Math.round(ms/d)+'d';if(ms>=h)return Math.round(ms/h)+'h';if(ms>=m)return Math.round(ms/m)+'m';if(ms>=s)return Math.round(ms/s)+'s';return ms+'ms';}/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */function long(ms){return plural(ms,d,'day')||plural(ms,h,'hour')||plural(ms,m,'minute')||plural(ms,s,'second')||ms+' ms';}/**
	 * Pluralization helper.
	 */function plural(ms,n,name){if(ms<n)return;if(ms<n*1.5)return Math.floor(ms/n)+' '+name;return Math.ceil(ms/n)+' '+name+'s';}/***/},/* 11 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(module,global){/*** IMPORTS FROM imports-loader ***/var define=false;/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */;(function(){// Detect the `define` function exposed by asynchronous module loaders. The
// strict `define` check is necessary for compatibility with `r.js`.
var isLoader=typeof define==="function"&&define.amd;// A set of types used to distinguish objects from primitives.
var objectTypes={"function":true,"object":true};// Detect the `exports` object exposed by CommonJS implementations.
var freeExports=objectTypes[typeof exports==='undefined'?'undefined':_typeof2(exports)]&&exports&&!exports.nodeType&&exports;// Use the `global` object exposed by Node (including Browserify via
// `insert-module-globals`), Narwhal, and Ringo as the default context,
// and the `window` object in browsers. Rhino exports a `global` function
// instead.
var root=objectTypes[typeof window==='undefined'?'undefined':_typeof2(window)]&&window||this,freeGlobal=freeExports&&objectTypes[typeof module==='undefined'?'undefined':_typeof2(module)]&&module&&!module.nodeType&&(typeof global==='undefined'?'undefined':_typeof2(global))=="object"&&global;if(freeGlobal&&(freeGlobal["global"]===freeGlobal||freeGlobal["window"]===freeGlobal||freeGlobal["self"]===freeGlobal)){root=freeGlobal;}// Public: Initializes JSON 3 using the given `context` object, attaching the
// `stringify` and `parse` functions to the specified `exports` object.
function runInContext(context,exports){context||(context=root["Object"]());exports||(exports=root["Object"]());// Native constructor aliases.
var Number=context["Number"]||root["Number"],String=context["String"]||root["String"],Object=context["Object"]||root["Object"],Date=context["Date"]||root["Date"],SyntaxError=context["SyntaxError"]||root["SyntaxError"],TypeError=context["TypeError"]||root["TypeError"],Math=context["Math"]||root["Math"],nativeJSON=context["JSON"]||root["JSON"];// Delegate to the native `stringify` and `parse` implementations.
if((typeof nativeJSON==='undefined'?'undefined':_typeof2(nativeJSON))=="object"&&nativeJSON){exports.stringify=nativeJSON.stringify;exports.parse=nativeJSON.parse;}// Convenience aliases.
var objectProto=Object.prototype,getClass=objectProto.toString,_isProperty,_forEach,undef;// Test the `Date#getUTC*` methods. Based on work by @Yaffle.
var isExtended=new Date(-3509827334573292);try{// The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
// results for certain dates in Opera >= 10.53.
isExtended=isExtended.getUTCFullYear()==-109252&&isExtended.getUTCMonth()===0&&isExtended.getUTCDate()===1&&// Safari < 2.0.2 stores the internal millisecond time value correctly,
// but clips the values returned by the date methods to the range of
// signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
isExtended.getUTCHours()==10&&isExtended.getUTCMinutes()==37&&isExtended.getUTCSeconds()==6&&isExtended.getUTCMilliseconds()==708;}catch(exception){}// Internal: Determines whether the native `JSON.stringify` and `parse`
// implementations are spec-compliant. Based on work by Ken Snyder.
function has(name){if(has[name]!==undef){// Return cached feature test result.
return has[name];}var isSupported;if(name=="bug-string-char-index"){// IE <= 7 doesn't support accessing string characters using square
// bracket notation. IE 8 only supports this for primitives.
isSupported="a"[0]!="a";}else if(name=="json"){// Indicates whether both `JSON.stringify` and `JSON.parse` are
// supported.
isSupported=has("json-stringify")&&has("json-parse");}else{var value,serialized='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';// Test `JSON.stringify`.
if(name=="json-stringify"){var stringify=exports.stringify,stringifySupported=typeof stringify=="function"&&isExtended;if(stringifySupported){// A test function object with a custom `toJSON` method.
(value=function value(){return 1;}).toJSON=value;try{stringifySupported=// Firefox 3.1b1 and b2 serialize string, number, and boolean
// primitives as object literals.
stringify(0)==="0"&&// FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
// literals.
stringify(new Number())==="0"&&stringify(new String())=='""'&&// FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
// does not define a canonical JSON representation (this applies to
// objects with `toJSON` properties as well, *unless* they are nested
// within an object or array).
stringify(getClass)===undef&&// IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
// FF 3.1b3 pass this test.
stringify(undef)===undef&&// Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
// respectively, if the value is omitted entirely.
stringify()===undef&&// FF 3.1b1, 2 throw an error if the given value is not a number,
// string, array, object, Boolean, or `null` literal. This applies to
// objects with custom `toJSON` methods as well, unless they are nested
// inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
// methods entirely.
stringify(value)==="1"&&stringify([value])=="[1]"&&// Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
// `"[null]"`.
stringify([undef])=="[null]"&&// YUI 3.0.0b1 fails to serialize `null` literals.
stringify(null)=="null"&&// FF 3.1b1, 2 halts serialization if an array contains a function:
// `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
// elides non-JSON values from objects and arrays, unless they
// define custom `toJSON` methods.
stringify([undef,getClass,null])=="[null,null,null]"&&// Simple serialization test. FF 3.1b1 uses Unicode escape sequences
// where character escape codes are expected (e.g., `\b` => `\u0008`).
stringify({"a":[value,true,false,null,"\x00\b\n\f\r\t"]})==serialized&&// FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
stringify(null,value)==="1"&&stringify([1,2],null,1)=="[\n 1,\n 2\n]"&&// JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
// serialize extended years.
stringify(new Date(-8.64e15))=='"-271821-04-20T00:00:00.000Z"'&&// The milliseconds are optional in ES 5, but required in 5.1.
stringify(new Date(8.64e15))=='"+275760-09-13T00:00:00.000Z"'&&// Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
// four-digit years instead of six-digit years. Credits: @Yaffle.
stringify(new Date(-621987552e5))=='"-000001-01-01T00:00:00.000Z"'&&// Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
// values less than 1000. Credits: @Yaffle.
stringify(new Date(-1))=='"1969-12-31T23:59:59.999Z"';}catch(exception){stringifySupported=false;}}isSupported=stringifySupported;}// Test `JSON.parse`.
if(name=="json-parse"){var parse=exports.parse;if(typeof parse=="function"){try{// FF 3.1b1, b2 will throw an exception if a bare literal is provided.
// Conforming implementations should also coerce the initial argument to
// a string prior to parsing.
if(parse("0")===0&&!parse(false)){// Simple parsing test.
value=parse(serialized);var parseSupported=value["a"].length==5&&value["a"][0]===1;if(parseSupported){try{// Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
parseSupported=!parse('"\t"');}catch(exception){}if(parseSupported){try{// FF 4.0 and 4.0.1 allow leading `+` signs and leading
// decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
// certain octal literals.
parseSupported=parse("01")!==1;}catch(exception){}}if(parseSupported){try{// FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
// points. These environments, along with FF 3.1b1 and 2,
// also allow trailing commas in JSON objects and arrays.
parseSupported=parse("1.")!==1;}catch(exception){}}}}}catch(exception){parseSupported=false;}}isSupported=parseSupported;}}return has[name]=!!isSupported;}if(!has("json")){// Common `[[Class]]` name aliases.
var functionClass="[object Function]",dateClass="[object Date]",numberClass="[object Number]",stringClass="[object String]",arrayClass="[object Array]",booleanClass="[object Boolean]";// Detect incomplete support for accessing string characters by index.
var charIndexBuggy=has("bug-string-char-index");// Define additional utility methods if the `Date` methods are buggy.
if(!isExtended){var floor=Math.floor;// A mapping between the months of the year and the number of days between
// January 1st and the first of the respective month.
var Months=[0,31,59,90,120,151,181,212,243,273,304,334];// Internal: Calculates the number of days between the Unix epoch and the
// first day of the given month.
var getDay=function getDay(year,month){return Months[month]+365*(year-1970)+floor((year-1969+(month=+(month>1)))/4)-floor((year-1901+month)/100)+floor((year-1601+month)/400);};}// Internal: Determines if a property is a direct property of the given
// object. Delegates to the native `Object#hasOwnProperty` method.
if(!(_isProperty=objectProto.hasOwnProperty)){_isProperty=function isProperty(property){var members={},constructor;if((members.__proto__=null,members.__proto__={// The *proto* property cannot be set multiple times in recent
// versions of Firefox and SeaMonkey.
"toString":1},members).toString!=getClass){// Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
// supports the mutable *proto* property.
_isProperty=function isProperty(property){// Capture and break the object's prototype chain (see section 8.6.2
// of the ES 5.1 spec). The parenthesized expression prevents an
// unsafe transformation by the Closure Compiler.
var original=this.__proto__,result=property in(this.__proto__=null,this);// Restore the original prototype chain.
this.__proto__=original;return result;};}else{// Capture a reference to the top-level `Object` constructor.
constructor=members.constructor;// Use the `constructor` property to simulate `Object#hasOwnProperty` in
// other environments.
_isProperty=function isProperty(property){var parent=(this.constructor||constructor).prototype;return property in this&&!(property in parent&&this[property]===parent[property]);};}members=null;return _isProperty.call(this,property);};}// Internal: Normalizes the `for...in` iteration algorithm across
// environments. Each enumerated key is yielded to a `callback` function.
_forEach=function forEach(object,callback){var size=0,Properties,members,property;// Tests for bugs in the current environment's `for...in` algorithm. The
// `valueOf` property inherits the non-enumerable flag from
// `Object.prototype` in older versions of IE, Netscape, and Mozilla.
(Properties=function Properties(){this.valueOf=0;}).prototype.valueOf=0;// Iterate over a new instance of the `Properties` class.
members=new Properties();for(property in members){// Ignore all properties inherited from `Object.prototype`.
if(_isProperty.call(members,property)){size++;}}Properties=members=null;// Normalize the iteration algorithm.
if(!size){// A list of non-enumerable properties inherited from `Object.prototype`.
members=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"];// IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
// properties.
_forEach=function forEach(object,callback){var isFunction=getClass.call(object)==functionClass,property,length;var hasProperty=!isFunction&&typeof object.constructor!="function"&&objectTypes[_typeof2(object.hasOwnProperty)]&&object.hasOwnProperty||_isProperty;for(property in object){// Gecko <= 1.0 enumerates the `prototype` property of functions under
// certain conditions; IE does not.
if(!(isFunction&&property=="prototype")&&hasProperty.call(object,property)){callback(property);}}// Manually invoke the callback for each non-enumerable property.
for(length=members.length;property=members[--length];hasProperty.call(object,property)&&callback(property)){}};}else if(size==2){// Safari <= 2.0.4 enumerates shadowed properties twice.
_forEach=function forEach(object,callback){// Create a set of iterated properties.
var members={},isFunction=getClass.call(object)==functionClass,property;for(property in object){// Store each property name to prevent double enumeration. The
// `prototype` property of functions is not enumerated due to cross-
// environment inconsistencies.
if(!(isFunction&&property=="prototype")&&!_isProperty.call(members,property)&&(members[property]=1)&&_isProperty.call(object,property)){callback(property);}}};}else{// No bugs detected; use the standard `for...in` algorithm.
_forEach=function forEach(object,callback){var isFunction=getClass.call(object)==functionClass,property,isConstructor;for(property in object){if(!(isFunction&&property=="prototype")&&_isProperty.call(object,property)&&!(isConstructor=property==="constructor")){callback(property);}}// Manually invoke the callback for the `constructor` property due to
// cross-environment inconsistencies.
if(isConstructor||_isProperty.call(object,property="constructor")){callback(property);}};}return _forEach(object,callback);};// Public: Serializes a JavaScript `value` as a JSON string. The optional
// `filter` argument may specify either a function that alters how object and
// array members are serialized, or an array of strings and numbers that
// indicates which properties should be serialized. The optional `width`
// argument may be either a string or number that specifies the indentation
// level of the output.
if(!has("json-stringify")){// Internal: A map of control characters and their escaped equivalents.
var Escapes={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"};// Internal: Converts `value` into a zero-padded string such that its
// length is at least equal to `width`. The `width` must be <= 6.
var leadingZeroes="000000";var toPaddedString=function toPaddedString(width,value){// The `|| 0` expression is necessary to work around a bug in
// Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
return(leadingZeroes+(value||0)).slice(-width);};// Internal: Double-quotes a string `value`, replacing all ASCII control
// characters (characters with code unit values between 0 and 31) with
// their escaped equivalents. This is an implementation of the
// `Quote(value)` operation defined in ES 5.1 section 15.12.3.
var unicodePrefix='\\u00';var quote=function quote(value){var result='"',index=0,length=value.length,useCharIndex=!charIndexBuggy||length>10;var symbols=useCharIndex&&(charIndexBuggy?value.split(""):value);for(;index<length;index++){var charCode=value.charCodeAt(index);// If the character is a control character, append its Unicode or
// shorthand escape sequence; otherwise, append the character as-is.
switch(charCode){case 8:case 9:case 10:case 12:case 13:case 34:case 92:result+=Escapes[charCode];break;default:if(charCode<32){result+=unicodePrefix+toPaddedString(2,charCode.toString(16));break;}result+=useCharIndex?symbols[index]:value.charAt(index);}}return result+'"';};// Internal: Recursively serializes an object. Implements the
// `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
var serialize=function serialize(property,object,callback,properties,whitespace,indentation,stack){var value,className,year,month,date,time,hours,minutes,seconds,milliseconds,results,element,index,length,prefix,result;try{// Necessary for host object support.
value=object[property];}catch(exception){}if((typeof value==='undefined'?'undefined':_typeof2(value))=="object"&&value){className=getClass.call(value);if(className==dateClass&&!_isProperty.call(value,"toJSON")){if(value>-1/0&&value<1/0){// Dates are serialized according to the `Date#toJSON` method
// specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
// for the ISO 8601 date time string format.
if(getDay){// Manually compute the year, month, date, hours, minutes,
// seconds, and milliseconds if the `getUTC*` methods are
// buggy. Adapted from @Yaffle's `date-shim` project.
date=floor(value/864e5);for(year=floor(date/365.2425)+1970-1;getDay(year+1,0)<=date;year++){}for(month=floor((date-getDay(year,0))/30.42);getDay(year,month+1)<=date;month++){}date=1+date-getDay(year,month);// The `time` value specifies the time within the day (see ES
// 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
// to compute `A modulo B`, as the `%` operator does not
// correspond to the `modulo` operation for negative numbers.
time=(value%864e5+864e5)%864e5;// The hours, minutes, seconds, and milliseconds are obtained by
// decomposing the time within the day. See section 15.9.1.10.
hours=floor(time/36e5)%24;minutes=floor(time/6e4)%60;seconds=floor(time/1e3)%60;milliseconds=time%1e3;}else{year=value.getUTCFullYear();month=value.getUTCMonth();date=value.getUTCDate();hours=value.getUTCHours();minutes=value.getUTCMinutes();seconds=value.getUTCSeconds();milliseconds=value.getUTCMilliseconds();}// Serialize extended years correctly.
value=(year<=0||year>=1e4?(year<0?"-":"+")+toPaddedString(6,year<0?-year:year):toPaddedString(4,year))+"-"+toPaddedString(2,month+1)+"-"+toPaddedString(2,date)+// Months, dates, hours, minutes, and seconds should have two
// digits; milliseconds should have three.
"T"+toPaddedString(2,hours)+":"+toPaddedString(2,minutes)+":"+toPaddedString(2,seconds)+// Milliseconds are optional in ES 5.0, but required in 5.1.
"."+toPaddedString(3,milliseconds)+"Z";}else{value=null;}}else if(typeof value.toJSON=="function"&&(className!=numberClass&&className!=stringClass&&className!=arrayClass||_isProperty.call(value,"toJSON"))){// Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
// `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
// ignores all `toJSON` methods on these objects unless they are
// defined directly on an instance.
value=value.toJSON(property);}}if(callback){// If a replacement function was provided, call it to obtain the value
// for serialization.
value=callback.call(object,property,value);}if(value===null){return"null";}className=getClass.call(value);if(className==booleanClass){// Booleans are represented literally.
return""+value;}else if(className==numberClass){// JSON numbers must be finite. `Infinity` and `NaN` are serialized as
// `"null"`.
return value>-1/0&&value<1/0?""+value:"null";}else if(className==stringClass){// Strings are double-quoted and escaped.
return quote(""+value);}// Recursively serialize objects and arrays.
if((typeof value==='undefined'?'undefined':_typeof2(value))=="object"){// Check for cyclic structures. This is a linear search; performance
// is inversely proportional to the number of unique nested objects.
for(length=stack.length;length--;){if(stack[length]===value){// Cyclic structures cannot be serialized by `JSON.stringify`.
throw TypeError();}}// Add the object to the stack of traversed objects.
stack.push(value);results=[];// Save the current indentation level and indent one additional level.
prefix=indentation;indentation+=whitespace;if(className==arrayClass){// Recursively serialize array elements.
for(index=0,length=value.length;index<length;index++){element=serialize(index,value,callback,properties,whitespace,indentation,stack);results.push(element===undef?"null":element);}result=results.length?whitespace?"[\n"+indentation+results.join(",\n"+indentation)+"\n"+prefix+"]":"["+results.join(",")+"]":"[]";}else{// Recursively serialize object members. Members are selected from
// either a user-specified list of property names, or the object
// itself.
_forEach(properties||value,function(property){var element=serialize(property,value,callback,properties,whitespace,indentation,stack);if(element!==undef){// According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
// is not the empty string, let `member` {quote(property) + ":"}
// be the concatenation of `member` and the `space` character."
// The "`space` character" refers to the literal space
// character, not the `space` {width} argument provided to
// `JSON.stringify`.
results.push(quote(property)+":"+(whitespace?" ":"")+element);}});result=results.length?whitespace?"{\n"+indentation+results.join(",\n"+indentation)+"\n"+prefix+"}":"{"+results.join(",")+"}":"{}";}// Remove the object from the traversed object stack.
stack.pop();return result;}};// Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
exports.stringify=function(source,filter,width){var whitespace,callback,properties,className;if(objectTypes[typeof filter==='undefined'?'undefined':_typeof2(filter)]&&filter){if((className=getClass.call(filter))==functionClass){callback=filter;}else if(className==arrayClass){// Convert the property names array into a makeshift set.
properties={};for(var index=0,length=filter.length,value;index<length;value=filter[index++],(className=getClass.call(value),className==stringClass||className==numberClass)&&(properties[value]=1)){}}}if(width){if((className=getClass.call(width))==numberClass){// Convert the `width` to an integer and create a string containing
// `width` number of space characters.
if((width-=width%1)>0){for(whitespace="",width>10&&(width=10);whitespace.length<width;whitespace+=" "){}}}else if(className==stringClass){whitespace=width.length<=10?width:width.slice(0,10);}}// Opera <= 7.54u2 discards the values associated with empty string keys
// (`""`) only if they are used directly within an object member list
// (e.g., `!("" in { "": 1})`).
return serialize("",(value={},value[""]=source,value),callback,properties,whitespace,"",[]);};}// Public: Parses a JSON source string.
if(!has("json-parse")){var fromCharCode=String.fromCharCode;// Internal: A map of escaped control characters and their unescaped
// equivalents.
var Unescapes={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"};// Internal: Stores the parser state.
var Index,Source;// Internal: Resets the parser state and throws a `SyntaxError`.
var abort=function abort(){Index=Source=null;throw SyntaxError();};// Internal: Returns the next token, or `"$"` if the parser has reached
// the end of the source string. A token may be a string, number, `null`
// literal, or Boolean literal.
var lex=function lex(){var source=Source,length=source.length,value,begin,position,isSigned,charCode;while(Index<length){charCode=source.charCodeAt(Index);switch(charCode){case 9:case 10:case 13:case 32:// Skip whitespace tokens, including tabs, carriage returns, line
// feeds, and space characters.
Index++;break;case 123:case 125:case 91:case 93:case 58:case 44:// Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
// the current position.
value=charIndexBuggy?source.charAt(Index):source[Index];Index++;return value;case 34:// `"` delimits a JSON string; advance to the next character and
// begin parsing the string. String tokens are prefixed with the
// sentinel `@` character to distinguish them from punctuators and
// end-of-string tokens.
for(value="@",Index++;Index<length;){charCode=source.charCodeAt(Index);if(charCode<32){// Unescaped ASCII control characters (those with a code unit
// less than the space character) are not permitted.
abort();}else if(charCode==92){// A reverse solidus (`\`) marks the beginning of an escaped
// control character (including `"`, `\`, and `/`) or Unicode
// escape sequence.
charCode=source.charCodeAt(++Index);switch(charCode){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:// Revive escaped control characters.
value+=Unescapes[charCode];Index++;break;case 117:// `\u` marks the beginning of a Unicode escape sequence.
// Advance to the first character and validate the
// four-digit code point.
begin=++Index;for(position=Index+4;Index<position;Index++){charCode=source.charCodeAt(Index);// A valid sequence comprises four hexdigits (case-
// insensitive) that form a single hexadecimal value.
if(!(charCode>=48&&charCode<=57||charCode>=97&&charCode<=102||charCode>=65&&charCode<=70)){// Invalid Unicode escape sequence.
abort();}}// Revive the escaped character.
value+=fromCharCode("0x"+source.slice(begin,Index));break;default:// Invalid escape sequence.
abort();}}else{if(charCode==34){// An unescaped double-quote character marks the end of the
// string.
break;}charCode=source.charCodeAt(Index);begin=Index;// Optimize for the common case where a string is valid.
while(charCode>=32&&charCode!=92&&charCode!=34){charCode=source.charCodeAt(++Index);}// Append the string as-is.
value+=source.slice(begin,Index);}}if(source.charCodeAt(Index)==34){// Advance to the next character and return the revived string.
Index++;return value;}// Unterminated string.
abort();default:// Parse numbers and literals.
begin=Index;// Advance past the negative sign, if one is specified.
if(charCode==45){isSigned=true;charCode=source.charCodeAt(++Index);}// Parse an integer or floating-point value.
if(charCode>=48&&charCode<=57){// Leading zeroes are interpreted as octal literals.
if(charCode==48&&(charCode=source.charCodeAt(Index+1),charCode>=48&&charCode<=57)){// Illegal octal literal.
abort();}isSigned=false;// Parse the integer component.
for(;Index<length&&(charCode=source.charCodeAt(Index),charCode>=48&&charCode<=57);Index++){}// Floats cannot contain a leading decimal point; however, this
// case is already accounted for by the parser.
if(source.charCodeAt(Index)==46){position=++Index;// Parse the decimal component.
for(;position<length&&(charCode=source.charCodeAt(position),charCode>=48&&charCode<=57);position++){}if(position==Index){// Illegal trailing decimal.
abort();}Index=position;}// Parse exponents. The `e` denoting the exponent is
// case-insensitive.
charCode=source.charCodeAt(Index);if(charCode==101||charCode==69){charCode=source.charCodeAt(++Index);// Skip past the sign following the exponent, if one is
// specified.
if(charCode==43||charCode==45){Index++;}// Parse the exponential component.
for(position=Index;position<length&&(charCode=source.charCodeAt(position),charCode>=48&&charCode<=57);position++){}if(position==Index){// Illegal empty exponent.
abort();}Index=position;}// Coerce the parsed value to a JavaScript number.
return+source.slice(begin,Index);}// A negative sign may only precede numbers.
if(isSigned){abort();}// `true`, `false`, and `null` literals.
if(source.slice(Index,Index+4)=="true"){Index+=4;return true;}else if(source.slice(Index,Index+5)=="false"){Index+=5;return false;}else if(source.slice(Index,Index+4)=="null"){Index+=4;return null;}// Unrecognized token.
abort();}}// Return the sentinel `$` character if the parser has reached the end
// of the source string.
return"$";};// Internal: Parses a JSON `value` token.
var get=function get(value){var results,hasMembers;if(value=="$"){// Unexpected end of input.
abort();}if(typeof value=="string"){if((charIndexBuggy?value.charAt(0):value[0])=="@"){// Remove the sentinel `@` character.
return value.slice(1);}// Parse object and array literals.
if(value=="["){// Parses a JSON array, returning a new JavaScript array.
results=[];for(;;hasMembers||(hasMembers=true)){value=lex();// A closing square bracket marks the end of the array literal.
if(value=="]"){break;}// If the array literal contains elements, the current token
// should be a comma separating the previous element from the
// next.
if(hasMembers){if(value==","){value=lex();if(value=="]"){// Unexpected trailing `,` in array literal.
abort();}}else{// A `,` must separate each array element.
abort();}}// Elisions and leading commas are not permitted.
if(value==","){abort();}results.push(get(value));}return results;}else if(value=="{"){// Parses a JSON object, returning a new JavaScript object.
results={};for(;;hasMembers||(hasMembers=true)){value=lex();// A closing curly brace marks the end of the object literal.
if(value=="}"){break;}// If the object literal contains members, the current token
// should be a comma separator.
if(hasMembers){if(value==","){value=lex();if(value=="}"){// Unexpected trailing `,` in object literal.
abort();}}else{// A `,` must separate each object member.
abort();}}// Leading commas are not permitted, object property names must be
// double-quoted strings, and a `:` must separate each property
// name and value.
if(value==","||typeof value!="string"||(charIndexBuggy?value.charAt(0):value[0])!="@"||lex()!=":"){abort();}results[value.slice(1)]=get(lex());}return results;}// Unexpected token encountered.
abort();}return value;};// Internal: Updates a traversed object member.
var update=function update(source,property,callback){var element=walk(source,property,callback);if(element===undef){delete source[property];}else{source[property]=element;}};// Internal: Recursively traverses a parsed JSON object, invoking the
// `callback` function for each value. This is an implementation of the
// `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
var walk=function walk(source,property,callback){var value=source[property],length;if((typeof value==='undefined'?'undefined':_typeof2(value))=="object"&&value){// `forEach` can't be used to traverse an array in Opera <= 8.54
// because its `Object#hasOwnProperty` implementation returns `false`
// for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
if(getClass.call(value)==arrayClass){for(length=value.length;length--;){update(value,length,callback);}}else{_forEach(value,function(property){update(value,property,callback);});}}return callback.call(source,property,value);};// Public: `JSON.parse`. See ES 5.1 section 15.12.2.
exports.parse=function(source,callback){var result,value;Index=0;Source=""+source;result=get(lex());// If a JSON string contains multiple tokens, it is invalid.
if(lex()!="$"){abort();}// Reset the parser state.
Index=Source=null;return callback&&getClass.call(callback)==functionClass?walk((value={},value[""]=result,value),"",callback):result;};}}exports["runInContext"]=runInContext;return exports;}if(freeExports&&!isLoader){// Export for CommonJS environments.
runInContext(root,freeExports);}else{// Export for web browsers and JavaScript engines.
var nativeJSON=root.JSON,previousJSON=root["JSON3"],isRestored=false;var JSON3=runInContext(root,root["JSON3"]={// Public: Restores the original value of the global `JSON` object and
// returns a reference to the `JSON3` object.
"noConflict":function noConflict(){if(!isRestored){isRestored=true;root.JSON=nativeJSON;root["JSON3"]=previousJSON;nativeJSON=previousJSON=null;}return JSON3;}});root.JSON={"parse":JSON3.parse,"stringify":JSON3.stringify};}// Export for asynchronous module loaders.
if(isLoader){define(function(){return JSON3;});}}).call(this);/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(12)(module),function(){return this;}());/***/},/* 12 *//***/function(module,exports){module.exports=function(module){if(!module.webpackPolyfill){module.deprecate=function(){};module.paths=[];// module.parent = undefined by default
module.children=[];module.webpackPolyfill=1;}return module;};/***/},/* 13 *//***/function(module,exports){/**
	 * Expose `Emitter`.
	 */module.exports=Emitter;/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */function Emitter(obj){if(obj)return mixin(obj);};/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */function mixin(obj){for(var key in Emitter.prototype){obj[key]=Emitter.prototype[key];}return obj;}/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */Emitter.prototype.on=Emitter.prototype.addEventListener=function(event,fn){this._callbacks=this._callbacks||{};(this._callbacks[event]=this._callbacks[event]||[]).push(fn);return this;};/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */Emitter.prototype.once=function(event,fn){var self=this;this._callbacks=this._callbacks||{};function on(){self.off(event,on);fn.apply(this,arguments);}on.fn=fn;this.on(event,on);return this;};/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(event,fn){this._callbacks=this._callbacks||{};// all
if(0==arguments.length){this._callbacks={};return this;}// specific event
var callbacks=this._callbacks[event];if(!callbacks)return this;// remove all handlers
if(1==arguments.length){delete this._callbacks[event];return this;}// remove specific handler
var cb;for(var i=0;i<callbacks.length;i++){cb=callbacks[i];if(cb===fn||cb.fn===fn){callbacks.splice(i,1);break;}}return this;};/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */Emitter.prototype.emit=function(event){this._callbacks=this._callbacks||{};var args=[].slice.call(arguments,1),callbacks=this._callbacks[event];if(callbacks){callbacks=callbacks.slice(0);for(var i=0,len=callbacks.length;i<len;++i){callbacks[i].apply(this,args);}}return this;};/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */Emitter.prototype.listeners=function(event){this._callbacks=this._callbacks||{};return this._callbacks[event]||[];};/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */Emitter.prototype.hasListeners=function(event){return!!this.listeners(event).length;};/***/},/* 14 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global){/*global Blob,File*//**
	 * Module requirements
	 */var isArray=__webpack_require__(15);var isBuf=__webpack_require__(16);/**
	 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
	 * Anything with blobs or files should be fed through removeBlobs before coming
	 * here.
	 *
	 * @param {Object} packet - socket.io event packet
	 * @return {Object} with deconstructed packet and list of buffers
	 * @api public
	 */exports.deconstructPacket=function(packet){var buffers=[];var packetData=packet.data;function _deconstructPacket(data){if(!data)return data;if(isBuf(data)){var placeholder={_placeholder:true,num:buffers.length};buffers.push(data);return placeholder;}else if(isArray(data)){var newData=new Array(data.length);for(var i=0;i<data.length;i++){newData[i]=_deconstructPacket(data[i]);}return newData;}else if('object'==(typeof data==='undefined'?'undefined':_typeof2(data))&&!(data instanceof Date)){var newData={};for(var key in data){newData[key]=_deconstructPacket(data[key]);}return newData;}return data;}var pack=packet;pack.data=_deconstructPacket(packetData);pack.attachments=buffers.length;// number of binary 'attachments'
return{packet:pack,buffers:buffers};};/**
	 * Reconstructs a binary packet from its placeholder packet and buffers
	 *
	 * @param {Object} packet - event packet with placeholders
	 * @param {Array} buffers - binary buffers to put in placeholder positions
	 * @return {Object} reconstructed packet
	 * @api public
	 */exports.reconstructPacket=function(packet,buffers){var curPlaceHolder=0;function _reconstructPacket(data){if(data&&data._placeholder){var buf=buffers[data.num];// appropriate buffer (should be natural order anyway)
return buf;}else if(isArray(data)){for(var i=0;i<data.length;i++){data[i]=_reconstructPacket(data[i]);}return data;}else if(data&&'object'==(typeof data==='undefined'?'undefined':_typeof2(data))){for(var key in data){data[key]=_reconstructPacket(data[key]);}return data;}return data;}packet.data=_reconstructPacket(packet.data);packet.attachments=undefined;// no longer useful
return packet;};/**
	 * Asynchronously removes Blobs or Files from data via
	 * FileReader's readAsArrayBuffer method. Used before encoding
	 * data as msgpack. Calls callback with the blobless data.
	 *
	 * @param {Object} data
	 * @param {Function} callback
	 * @api private
	 */exports.removeBlobs=function(data,callback){function _removeBlobs(obj,curKey,containingObject){if(!obj)return obj;// convert any blob
if(global.Blob&&obj instanceof Blob||global.File&&obj instanceof File){pendingBlobs++;// async filereader
var fileReader=new FileReader();fileReader.onload=function(){// this.result == arraybuffer
if(containingObject){containingObject[curKey]=this.result;}else{bloblessData=this.result;}// if nothing pending its callback time
if(! --pendingBlobs){callback(bloblessData);}};fileReader.readAsArrayBuffer(obj);// blob -> arraybuffer
}else if(isArray(obj)){// handle array
for(var i=0;i<obj.length;i++){_removeBlobs(obj[i],i,obj);}}else if(obj&&'object'==(typeof obj==='undefined'?'undefined':_typeof2(obj))&&!isBuf(obj)){// and object
for(var key in obj){_removeBlobs(obj[key],key,obj);}}}var pendingBlobs=0;var bloblessData=data;_removeBlobs(bloblessData);if(!pendingBlobs){callback(bloblessData);}};/* WEBPACK VAR INJECTION */}).call(exports,function(){return this;}());/***/},/* 15 *//***/function(module,exports){module.exports=Array.isArray||function(arr){return Object.prototype.toString.call(arr)=='[object Array]';};/***/},/* 16 *//***/function(module,exports){/* WEBPACK VAR INJECTION */(function(global){module.exports=isBuf;/**
	 * Returns true if obj is a buffer or an arraybuffer.
	 *
	 * @api private
	 */function isBuf(obj){return global.Buffer&&global.Buffer.isBuffer(obj)||global.ArrayBuffer&&obj instanceof ArrayBuffer;}/* WEBPACK VAR INJECTION */}).call(exports,function(){return this;}());/***/},/* 17 *//***/function(module,exports,__webpack_require__){'use strict';var _typeof=typeof Symbol==="function"&&_typeof2(Symbol.iterator)==="symbol"?function(obj){return typeof obj==='undefined'?'undefined':_typeof2(obj);}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj==='undefined'?'undefined':_typeof2(obj);};/**
	 * Module dependencies.
	 */var eio=__webpack_require__(18);var Socket=__webpack_require__(44);var Emitter=__webpack_require__(35);var parser=__webpack_require__(7);var on=__webpack_require__(46);var bind=__webpack_require__(47);var debug=__webpack_require__(3)('socket.io-client:manager');var indexOf=__webpack_require__(42);var Backoff=__webpack_require__(48);/**
	 * IE6+ hasOwnProperty
	 */var has=Object.prototype.hasOwnProperty;/**
	 * Module exports
	 */module.exports=Manager;/**
	 * `Manager` constructor.
	 *
	 * @param {String} engine instance or engine uri/opts
	 * @param {Object} options
	 * @api public
	 */function Manager(uri,opts){if(!(this instanceof Manager))return new Manager(uri,opts);if(uri&&'object'===(typeof uri==='undefined'?'undefined':_typeof(uri))){opts=uri;uri=undefined;}opts=opts||{};opts.path=opts.path||'/socket.io';this.nsps={};this.subs=[];this.opts=opts;this.reconnection(opts.reconnection!==false);this.reconnectionAttempts(opts.reconnectionAttempts||Infinity);this.reconnectionDelay(opts.reconnectionDelay||1000);this.reconnectionDelayMax(opts.reconnectionDelayMax||5000);this.randomizationFactor(opts.randomizationFactor||0.5);this.backoff=new Backoff({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()});this.timeout(null==opts.timeout?20000:opts.timeout);this.readyState='closed';this.uri=uri;this.connecting=[];this.lastPing=null;this.encoding=false;this.packetBuffer=[];this.encoder=new parser.Encoder();this.decoder=new parser.Decoder();this.autoConnect=opts.autoConnect!==false;if(this.autoConnect)this.open();}/**
	 * Propagate given event to sockets and emit on `this`
	 *
	 * @api private
	 */Manager.prototype.emitAll=function(){this.emit.apply(this,arguments);for(var nsp in this.nsps){if(has.call(this.nsps,nsp)){this.nsps[nsp].emit.apply(this.nsps[nsp],arguments);}}};/**
	 * Update `socket.id` of all sockets
	 *
	 * @api private
	 */Manager.prototype.updateSocketIds=function(){for(var nsp in this.nsps){if(has.call(this.nsps,nsp)){this.nsps[nsp].id=this.engine.id;}}};/**
	 * Mix in `Emitter`.
	 */Emitter(Manager.prototype);/**
	 * Sets the `reconnection` config.
	 *
	 * @param {Boolean} true/false if it should automatically reconnect
	 * @return {Manager} self or value
	 * @api public
	 */Manager.prototype.reconnection=function(v){if(!arguments.length)return this._reconnection;this._reconnection=!!v;return this;};/**
	 * Sets the reconnection attempts config.
	 *
	 * @param {Number} max reconnection attempts before giving up
	 * @return {Manager} self or value
	 * @api public
	 */Manager.prototype.reconnectionAttempts=function(v){if(!arguments.length)return this._reconnectionAttempts;this._reconnectionAttempts=v;return this;};/**
	 * Sets the delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */Manager.prototype.reconnectionDelay=function(v){if(!arguments.length)return this._reconnectionDelay;this._reconnectionDelay=v;this.backoff&&this.backoff.setMin(v);return this;};Manager.prototype.randomizationFactor=function(v){if(!arguments.length)return this._randomizationFactor;this._randomizationFactor=v;this.backoff&&this.backoff.setJitter(v);return this;};/**
	 * Sets the maximum delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */Manager.prototype.reconnectionDelayMax=function(v){if(!arguments.length)return this._reconnectionDelayMax;this._reconnectionDelayMax=v;this.backoff&&this.backoff.setMax(v);return this;};/**
	 * Sets the connection timeout. `false` to disable
	 *
	 * @return {Manager} self or value
	 * @api public
	 */Manager.prototype.timeout=function(v){if(!arguments.length)return this._timeout;this._timeout=v;return this;};/**
	 * Starts trying to reconnect if reconnection is enabled and we have not
	 * started reconnecting yet
	 *
	 * @api private
	 */Manager.prototype.maybeReconnectOnOpen=function(){// Only try to reconnect if it's the first time we're connecting
if(!this.reconnecting&&this._reconnection&&this.backoff.attempts===0){// keeps reconnection from firing twice for the same reconnection loop
this.reconnect();}};/**
	 * Sets the current transport `socket`.
	 *
	 * @param {Function} optional, callback
	 * @return {Manager} self
	 * @api public
	 */Manager.prototype.open=Manager.prototype.connect=function(fn,opts){debug('readyState %s',this.readyState);if(~this.readyState.indexOf('open'))return this;debug('opening %s',this.uri);this.engine=eio(this.uri,this.opts);var socket=this.engine;var self=this;this.readyState='opening';this.skipReconnect=false;// emit `open`
var openSub=on(socket,'open',function(){self.onopen();fn&&fn();});// emit `connect_error`
var errorSub=on(socket,'error',function(data){debug('connect_error');self.cleanup();self.readyState='closed';self.emitAll('connect_error',data);if(fn){var err=new Error('Connection error');err.data=data;fn(err);}else{// Only do this if there is no fn to handle the error
self.maybeReconnectOnOpen();}});// emit `connect_timeout`
if(false!==this._timeout){var timeout=this._timeout;debug('connect attempt will timeout after %d',timeout);// set timer
var timer=setTimeout(function(){debug('connect attempt timed out after %d',timeout);openSub.destroy();socket.close();socket.emit('error','timeout');self.emitAll('connect_timeout',timeout);},timeout);this.subs.push({destroy:function destroy(){clearTimeout(timer);}});}this.subs.push(openSub);this.subs.push(errorSub);return this;};/**
	 * Called upon transport open.
	 *
	 * @api private
	 */Manager.prototype.onopen=function(){debug('open');// clear old subs
this.cleanup();// mark as open
this.readyState='open';this.emit('open');// add new subs
var socket=this.engine;this.subs.push(on(socket,'data',bind(this,'ondata')));this.subs.push(on(socket,'ping',bind(this,'onping')));this.subs.push(on(socket,'pong',bind(this,'onpong')));this.subs.push(on(socket,'error',bind(this,'onerror')));this.subs.push(on(socket,'close',bind(this,'onclose')));this.subs.push(on(this.decoder,'decoded',bind(this,'ondecoded')));};/**
	 * Called upon a ping.
	 *
	 * @api private
	 */Manager.prototype.onping=function(){this.lastPing=new Date();this.emitAll('ping');};/**
	 * Called upon a packet.
	 *
	 * @api private
	 */Manager.prototype.onpong=function(){this.emitAll('pong',new Date()-this.lastPing);};/**
	 * Called with data.
	 *
	 * @api private
	 */Manager.prototype.ondata=function(data){this.decoder.add(data);};/**
	 * Called when parser fully decodes a packet.
	 *
	 * @api private
	 */Manager.prototype.ondecoded=function(packet){this.emit('packet',packet);};/**
	 * Called upon socket error.
	 *
	 * @api private
	 */Manager.prototype.onerror=function(err){debug('error',err);this.emitAll('error',err);};/**
	 * Creates a new socket for the given `nsp`.
	 *
	 * @return {Socket}
	 * @api public
	 */Manager.prototype.socket=function(nsp,opts){var socket=this.nsps[nsp];if(!socket){socket=new Socket(this,nsp,opts);this.nsps[nsp]=socket;var self=this;socket.on('connecting',onConnecting);socket.on('connect',function(){socket.id=self.engine.id;});if(this.autoConnect){// manually call here since connecting evnet is fired before listening
onConnecting();}}function onConnecting(){if(!~indexOf(self.connecting,socket)){self.connecting.push(socket);}}return socket;};/**
	 * Called upon a socket close.
	 *
	 * @param {Socket} socket
	 */Manager.prototype.destroy=function(socket){var index=indexOf(this.connecting,socket);if(~index)this.connecting.splice(index,1);if(this.connecting.length)return;this.close();};/**
	 * Writes a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */Manager.prototype.packet=function(packet){debug('writing packet %j',packet);var self=this;if(packet.query&&packet.type===0)packet.nsp+='?'+packet.query;if(!self.encoding){// encode, then write to engine with result
self.encoding=true;this.encoder.encode(packet,function(encodedPackets){for(var i=0;i<encodedPackets.length;i++){self.engine.write(encodedPackets[i],packet.options);}self.encoding=false;self.processPacketQueue();});}else{// add packet to the queue
self.packetBuffer.push(packet);}};/**
	 * If packet buffer is non-empty, begins encoding the
	 * next packet in line.
	 *
	 * @api private
	 */Manager.prototype.processPacketQueue=function(){if(this.packetBuffer.length>0&&!this.encoding){var pack=this.packetBuffer.shift();this.packet(pack);}};/**
	 * Clean up transport subscriptions and packet buffer.
	 *
	 * @api private
	 */Manager.prototype.cleanup=function(){debug('cleanup');var subsLength=this.subs.length;for(var i=0;i<subsLength;i++){var sub=this.subs.shift();sub.destroy();}this.packetBuffer=[];this.encoding=false;this.lastPing=null;this.decoder.destroy();};/**
	 * Close the current socket.
	 *
	 * @api private
	 */Manager.prototype.close=Manager.prototype.disconnect=function(){debug('disconnect');this.skipReconnect=true;this.reconnecting=false;if('opening'===this.readyState){// `onclose` will not fire because
// an open event never happened
this.cleanup();}this.backoff.reset();this.readyState='closed';if(this.engine)this.engine.close();};/**
	 * Called upon engine close.
	 *
	 * @api private
	 */Manager.prototype.onclose=function(reason){debug('onclose');this.cleanup();this.backoff.reset();this.readyState='closed';this.emit('close',reason);if(this._reconnection&&!this.skipReconnect){this.reconnect();}};/**
	 * Attempt a reconnection.
	 *
	 * @api private
	 */Manager.prototype.reconnect=function(){if(this.reconnecting||this.skipReconnect)return this;var self=this;if(this.backoff.attempts>=this._reconnectionAttempts){debug('reconnect failed');this.backoff.reset();this.emitAll('reconnect_failed');this.reconnecting=false;}else{var delay=this.backoff.duration();debug('will wait %dms before reconnect attempt',delay);this.reconnecting=true;var timer=setTimeout(function(){if(self.skipReconnect)return;debug('attempting reconnect');self.emitAll('reconnect_attempt',self.backoff.attempts);self.emitAll('reconnecting',self.backoff.attempts);// check again for the case socket closed in above events
if(self.skipReconnect)return;self.open(function(err){if(err){debug('reconnect attempt error');self.reconnecting=false;self.reconnect();self.emitAll('reconnect_error',err.data);}else{debug('reconnect success');self.onreconnect();}});},delay);this.subs.push({destroy:function destroy(){clearTimeout(timer);}});}};/**
	 * Called upon successful reconnect.
	 *
	 * @api private
	 */Manager.prototype.onreconnect=function(){var attempt=this.backoff.attempts;this.reconnecting=false;this.backoff.reset();this.updateSocketIds();this.emitAll('reconnect',attempt);};/***/},/* 18 *//***/function(module,exports,__webpack_require__){module.exports=__webpack_require__(19);/***/},/* 19 *//***/function(module,exports,__webpack_require__){module.exports=__webpack_require__(20);/**
	 * Exports parser
	 *
	 * @api public
	 *
	 */module.exports.parser=__webpack_require__(27);/***/},/* 20 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global){/**
	 * Module dependencies.
	 */var transports=__webpack_require__(21);var Emitter=__webpack_require__(35);var debug=__webpack_require__(3)('engine.io-client:socket');var index=__webpack_require__(42);var parser=__webpack_require__(27);var parseuri=__webpack_require__(2);var parsejson=__webpack_require__(43);var parseqs=__webpack_require__(36);/**
	 * Module exports.
	 */module.exports=Socket;/**
	 * Socket constructor.
	 *
	 * @param {String|Object} uri or options
	 * @param {Object} options
	 * @api public
	 */function Socket(uri,opts){if(!(this instanceof Socket))return new Socket(uri,opts);opts=opts||{};if(uri&&'object'===(typeof uri==='undefined'?'undefined':_typeof2(uri))){opts=uri;uri=null;}if(uri){uri=parseuri(uri);opts.hostname=uri.host;opts.secure=uri.protocol==='https'||uri.protocol==='wss';opts.port=uri.port;if(uri.query)opts.query=uri.query;}else if(opts.host){opts.hostname=parseuri(opts.host).host;}this.secure=null!=opts.secure?opts.secure:global.location&&'https:'===location.protocol;if(opts.hostname&&!opts.port){// if no port is specified manually, use the protocol default
opts.port=this.secure?'443':'80';}this.agent=opts.agent||false;this.hostname=opts.hostname||(global.location?location.hostname:'localhost');this.port=opts.port||(global.location&&location.port?location.port:this.secure?443:80);this.query=opts.query||{};if('string'===typeof this.query)this.query=parseqs.decode(this.query);this.upgrade=false!==opts.upgrade;this.path=(opts.path||'/engine.io').replace(/\/$/,'')+'/';this.forceJSONP=!!opts.forceJSONP;this.jsonp=false!==opts.jsonp;this.forceBase64=!!opts.forceBase64;this.enablesXDR=!!opts.enablesXDR;this.timestampParam=opts.timestampParam||'t';this.timestampRequests=opts.timestampRequests;this.transports=opts.transports||['polling','websocket'];this.readyState='';this.writeBuffer=[];this.prevBufferLen=0;this.policyPort=opts.policyPort||843;this.rememberUpgrade=opts.rememberUpgrade||false;this.binaryType=null;this.onlyBinaryUpgrades=opts.onlyBinaryUpgrades;this.perMessageDeflate=false!==opts.perMessageDeflate?opts.perMessageDeflate||{}:false;if(true===this.perMessageDeflate)this.perMessageDeflate={};if(this.perMessageDeflate&&null==this.perMessageDeflate.threshold){this.perMessageDeflate.threshold=1024;}// SSL options for Node.js client
this.pfx=opts.pfx||null;this.key=opts.key||null;this.passphrase=opts.passphrase||null;this.cert=opts.cert||null;this.ca=opts.ca||null;this.ciphers=opts.ciphers||null;this.rejectUnauthorized=opts.rejectUnauthorized===undefined?null:opts.rejectUnauthorized;this.forceNode=!!opts.forceNode;// other options for Node.js client
var freeGlobal=(typeof global==='undefined'?'undefined':_typeof2(global))==='object'&&global;if(freeGlobal.global===freeGlobal){if(opts.extraHeaders&&Object.keys(opts.extraHeaders).length>0){this.extraHeaders=opts.extraHeaders;}if(opts.localAddress){this.localAddress=opts.localAddress;}}// set on handshake
this.id=null;this.upgrades=null;this.pingInterval=null;this.pingTimeout=null;// set on heartbeat
this.pingIntervalTimer=null;this.pingTimeoutTimer=null;this.open();}Socket.priorWebsocketSuccess=false;/**
	 * Mix in `Emitter`.
	 */Emitter(Socket.prototype);/**
	 * Protocol version.
	 *
	 * @api public
	 */Socket.protocol=parser.protocol;// this is an int
/**
	 * Expose deps for legacy compatibility
	 * and standalone browser access.
	 */Socket.Socket=Socket;Socket.Transport=__webpack_require__(26);Socket.transports=__webpack_require__(21);Socket.parser=__webpack_require__(27);/**
	 * Creates transport of the given type.
	 *
	 * @param {String} transport name
	 * @return {Transport}
	 * @api private
	 */Socket.prototype.createTransport=function(name){debug('creating transport "%s"',name);var query=clone(this.query);// append engine.io protocol identifier
query.EIO=parser.protocol;// transport name
query.transport=name;// session id if we already have one
if(this.id)query.sid=this.id;var transport=new transports[name]({agent:this.agent,hostname:this.hostname,port:this.port,secure:this.secure,path:this.path,query:query,forceJSONP:this.forceJSONP,jsonp:this.jsonp,forceBase64:this.forceBase64,enablesXDR:this.enablesXDR,timestampRequests:this.timestampRequests,timestampParam:this.timestampParam,policyPort:this.policyPort,socket:this,pfx:this.pfx,key:this.key,passphrase:this.passphrase,cert:this.cert,ca:this.ca,ciphers:this.ciphers,rejectUnauthorized:this.rejectUnauthorized,perMessageDeflate:this.perMessageDeflate,extraHeaders:this.extraHeaders,forceNode:this.forceNode,localAddress:this.localAddress});return transport;};function clone(obj){var o={};for(var i in obj){if(obj.hasOwnProperty(i)){o[i]=obj[i];}}return o;}/**
	 * Initializes transport to use and starts probe.
	 *
	 * @api private
	 */Socket.prototype.open=function(){var transport;if(this.rememberUpgrade&&Socket.priorWebsocketSuccess&&this.transports.indexOf('websocket')!==-1){transport='websocket';}else if(0===this.transports.length){// Emit error on next tick so it can be listened to
var self=this;setTimeout(function(){self.emit('error','No transports available');},0);return;}else{transport=this.transports[0];}this.readyState='opening';// Retry with the next transport if the transport is disabled (jsonp: false)
try{transport=this.createTransport(transport);}catch(e){this.transports.shift();this.open();return;}transport.open();this.setTransport(transport);};/**
	 * Sets the current transport. Disables the existing one (if any).
	 *
	 * @api private
	 */Socket.prototype.setTransport=function(transport){debug('setting transport %s',transport.name);var self=this;if(this.transport){debug('clearing existing transport %s',this.transport.name);this.transport.removeAllListeners();}// set up transport
this.transport=transport;// set up transport listeners
transport.on('drain',function(){self.onDrain();}).on('packet',function(packet){self.onPacket(packet);}).on('error',function(e){self.onError(e);}).on('close',function(){self.onClose('transport close');});};/**
	 * Probes a transport.
	 *
	 * @param {String} transport name
	 * @api private
	 */Socket.prototype.probe=function(name){debug('probing transport "%s"',name);var transport=this.createTransport(name,{probe:1});var failed=false;var self=this;Socket.priorWebsocketSuccess=false;function onTransportOpen(){if(self.onlyBinaryUpgrades){var upgradeLosesBinary=!this.supportsBinary&&self.transport.supportsBinary;failed=failed||upgradeLosesBinary;}if(failed)return;debug('probe transport "%s" opened',name);transport.send([{type:'ping',data:'probe'}]);transport.once('packet',function(msg){if(failed)return;if('pong'===msg.type&&'probe'===msg.data){debug('probe transport "%s" pong',name);self.upgrading=true;self.emit('upgrading',transport);if(!transport)return;Socket.priorWebsocketSuccess='websocket'===transport.name;debug('pausing current transport "%s"',self.transport.name);self.transport.pause(function(){if(failed)return;if('closed'===self.readyState)return;debug('changing transport and sending upgrade packet');cleanup();self.setTransport(transport);transport.send([{type:'upgrade'}]);self.emit('upgrade',transport);transport=null;self.upgrading=false;self.flush();});}else{debug('probe transport "%s" failed',name);var err=new Error('probe error');err.transport=transport.name;self.emit('upgradeError',err);}});}function freezeTransport(){if(failed)return;// Any callback called by transport should be ignored since now
failed=true;cleanup();transport.close();transport=null;}// Handle any error that happens while probing
function onerror(err){var error=new Error('probe error: '+err);error.transport=transport.name;freezeTransport();debug('probe transport "%s" failed because of error: %s',name,err);self.emit('upgradeError',error);}function onTransportClose(){onerror('transport closed');}// When the socket is closed while we're probing
function onclose(){onerror('socket closed');}// When the socket is upgraded while we're probing
function onupgrade(to){if(transport&&to.name!==transport.name){debug('"%s" works - aborting "%s"',to.name,transport.name);freezeTransport();}}// Remove all listeners on the transport and on self
function cleanup(){transport.removeListener('open',onTransportOpen);transport.removeListener('error',onerror);transport.removeListener('close',onTransportClose);self.removeListener('close',onclose);self.removeListener('upgrading',onupgrade);}transport.once('open',onTransportOpen);transport.once('error',onerror);transport.once('close',onTransportClose);this.once('close',onclose);this.once('upgrading',onupgrade);transport.open();};/**
	 * Called when connection is deemed open.
	 *
	 * @api public
	 */Socket.prototype.onOpen=function(){debug('socket open');this.readyState='open';Socket.priorWebsocketSuccess='websocket'===this.transport.name;this.emit('open');this.flush();// we check for `readyState` in case an `open`
// listener already closed the socket
if('open'===this.readyState&&this.upgrade&&this.transport.pause){debug('starting upgrade probes');for(var i=0,l=this.upgrades.length;i<l;i++){this.probe(this.upgrades[i]);}}};/**
	 * Handles a packet.
	 *
	 * @api private
	 */Socket.prototype.onPacket=function(packet){if('opening'===this.readyState||'open'===this.readyState||'closing'===this.readyState){debug('socket receive: type "%s", data "%s"',packet.type,packet.data);this.emit('packet',packet);// Socket is live - any packet counts
this.emit('heartbeat');switch(packet.type){case'open':this.onHandshake(parsejson(packet.data));break;case'pong':this.setPing();this.emit('pong');break;case'error':var err=new Error('server error');err.code=packet.data;this.onError(err);break;case'message':this.emit('data',packet.data);this.emit('message',packet.data);break;}}else{debug('packet received with socket readyState "%s"',this.readyState);}};/**
	 * Called upon handshake completion.
	 *
	 * @param {Object} handshake obj
	 * @api private
	 */Socket.prototype.onHandshake=function(data){this.emit('handshake',data);this.id=data.sid;this.transport.query.sid=data.sid;this.upgrades=this.filterUpgrades(data.upgrades);this.pingInterval=data.pingInterval;this.pingTimeout=data.pingTimeout;this.onOpen();// In case open handler closes socket
if('closed'===this.readyState)return;this.setPing();// Prolong liveness of socket on heartbeat
this.removeListener('heartbeat',this.onHeartbeat);this.on('heartbeat',this.onHeartbeat);};/**
	 * Resets ping timeout.
	 *
	 * @api private
	 */Socket.prototype.onHeartbeat=function(timeout){clearTimeout(this.pingTimeoutTimer);var self=this;self.pingTimeoutTimer=setTimeout(function(){if('closed'===self.readyState)return;self.onClose('ping timeout');},timeout||self.pingInterval+self.pingTimeout);};/**
	 * Pings server every `this.pingInterval` and expects response
	 * within `this.pingTimeout` or closes connection.
	 *
	 * @api private
	 */Socket.prototype.setPing=function(){var self=this;clearTimeout(self.pingIntervalTimer);self.pingIntervalTimer=setTimeout(function(){debug('writing ping packet - expecting pong within %sms',self.pingTimeout);self.ping();self.onHeartbeat(self.pingTimeout);},self.pingInterval);};/**
	* Sends a ping packet.
	*
	* @api private
	*/Socket.prototype.ping=function(){var self=this;this.sendPacket('ping',function(){self.emit('ping');});};/**
	 * Called on `drain` event
	 *
	 * @api private
	 */Socket.prototype.onDrain=function(){this.writeBuffer.splice(0,this.prevBufferLen);// setting prevBufferLen = 0 is very important
// for example, when upgrading, upgrade packet is sent over,
// and a nonzero prevBufferLen could cause problems on `drain`
this.prevBufferLen=0;if(0===this.writeBuffer.length){this.emit('drain');}else{this.flush();}};/**
	 * Flush write buffers.
	 *
	 * @api private
	 */Socket.prototype.flush=function(){if('closed'!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){debug('flushing %d packets in socket',this.writeBuffer.length);this.transport.send(this.writeBuffer);// keep track of current length of writeBuffer
// splice writeBuffer and callbackBuffer on `drain`
this.prevBufferLen=this.writeBuffer.length;this.emit('flush');}};/**
	 * Sends a message.
	 *
	 * @param {String} message.
	 * @param {Function} callback function.
	 * @param {Object} options.
	 * @return {Socket} for chaining.
	 * @api public
	 */Socket.prototype.write=Socket.prototype.send=function(msg,options,fn){this.sendPacket('message',msg,options,fn);return this;};/**
	 * Sends a packet.
	 *
	 * @param {String} packet type.
	 * @param {String} data.
	 * @param {Object} options.
	 * @param {Function} callback function.
	 * @api private
	 */Socket.prototype.sendPacket=function(type,data,options,fn){if('function'===typeof data){fn=data;data=undefined;}if('function'===typeof options){fn=options;options=null;}if('closing'===this.readyState||'closed'===this.readyState){return;}options=options||{};options.compress=false!==options.compress;var packet={type:type,data:data,options:options};this.emit('packetCreate',packet);this.writeBuffer.push(packet);if(fn)this.once('flush',fn);this.flush();};/**
	 * Closes the connection.
	 *
	 * @api private
	 */Socket.prototype.close=function(){if('opening'===this.readyState||'open'===this.readyState){this.readyState='closing';var self=this;if(this.writeBuffer.length){this.once('drain',function(){if(this.upgrading){waitForUpgrade();}else{close();}});}else if(this.upgrading){waitForUpgrade();}else{close();}}function close(){self.onClose('forced close');debug('socket closing - telling transport to close');self.transport.close();}function cleanupAndClose(){self.removeListener('upgrade',cleanupAndClose);self.removeListener('upgradeError',cleanupAndClose);close();}function waitForUpgrade(){// wait for upgrade to finish since we can't send packets while pausing a transport
self.once('upgrade',cleanupAndClose);self.once('upgradeError',cleanupAndClose);}return this;};/**
	 * Called upon transport error
	 *
	 * @api private
	 */Socket.prototype.onError=function(err){debug('socket error %j',err);Socket.priorWebsocketSuccess=false;this.emit('error',err);this.onClose('transport error',err);};/**
	 * Called upon transport close.
	 *
	 * @api private
	 */Socket.prototype.onClose=function(reason,desc){if('opening'===this.readyState||'open'===this.readyState||'closing'===this.readyState){debug('socket close with reason: "%s"',reason);var self=this;// clear timers
clearTimeout(this.pingIntervalTimer);clearTimeout(this.pingTimeoutTimer);// stop event from firing again for transport
this.transport.removeAllListeners('close');// ensure transport won't stay open
this.transport.close();// ignore further transport communication
this.transport.removeAllListeners();// set ready state
this.readyState='closed';// clear session id
this.id=null;// emit close event
this.emit('close',reason,desc);// clean buffers after, so users can still
// grab the buffers on `close` event
self.writeBuffer=[];self.prevBufferLen=0;}};/**
	 * Filters upgrades, returning only those matching client transports.
	 *
	 * @param {Array} server upgrades
	 * @api private
	 *
	 */Socket.prototype.filterUpgrades=function(upgrades){var filteredUpgrades=[];for(var i=0,j=upgrades.length;i<j;i++){if(~index(this.transports,upgrades[i]))filteredUpgrades.push(upgrades[i]);}return filteredUpgrades;};/* WEBPACK VAR INJECTION */}).call(exports,function(){return this;}());/***/},/* 21 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global){/**
	 * Module dependencies
	 */var XMLHttpRequest=__webpack_require__(22);var XHR=__webpack_require__(24);var JSONP=__webpack_require__(39);var websocket=__webpack_require__(40);/**
	 * Export transports.
	 */exports.polling=polling;exports.websocket=websocket;/**
	 * Polling transport polymorphic constructor.
	 * Decides on xhr vs jsonp based on feature detection.
	 *
	 * @api private
	 */function polling(opts){var xhr;var xd=false;var xs=false;var jsonp=false!==opts.jsonp;if(global.location){var isSSL='https:'===location.protocol;var port=location.port;// some user agents have empty `location.port`
if(!port){port=isSSL?443:80;}xd=opts.hostname!==location.hostname||port!==opts.port;xs=opts.secure!==isSSL;}opts.xdomain=xd;opts.xscheme=xs;xhr=new XMLHttpRequest(opts);if('open'in xhr&&!opts.forceJSONP){return new XHR(opts);}else{if(!jsonp)throw new Error('JSONP disabled');return new JSONP(opts);}}/* WEBPACK VAR INJECTION */}).call(exports,function(){return this;}());/***/},/* 22 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global){// browser shim for xmlhttprequest module
var hasCORS=__webpack_require__(23);module.exports=function(opts){var xdomain=opts.xdomain;// scheme must be same when usign XDomainRequest
// http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
var xscheme=opts.xscheme;// XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
// https://github.com/Automattic/engine.io-client/pull/217
var enablesXDR=opts.enablesXDR;// XMLHttpRequest can be disabled on IE
try{if('undefined'!==typeof XMLHttpRequest&&(!xdomain||hasCORS)){return new XMLHttpRequest();}}catch(e){}// Use XDomainRequest for IE8 if enablesXDR is true
// because loading bar keeps flashing when using jsonp-polling
// https://github.com/yujiosaka/socke.io-ie8-loading-example
try{if('undefined'!==typeof XDomainRequest&&!xscheme&&enablesXDR){return new XDomainRequest();}}catch(e){}if(!xdomain){try{return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');}catch(e){}}};/* WEBPACK VAR INJECTION */}).call(exports,function(){return this;}());/***/},/* 23 *//***/function(module,exports){/**
	 * Module exports.
	 *
	 * Logic borrowed from Modernizr:
	 *
	 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
	 */try{module.exports=typeof XMLHttpRequest!=='undefined'&&'withCredentials'in new XMLHttpRequest();}catch(err){// if XMLHttp support is disabled in IE then it will throw
// when trying to create
module.exports=false;}/***/},/* 24 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global){/**
	 * Module requirements.
	 */var XMLHttpRequest=__webpack_require__(22);var Polling=__webpack_require__(25);var Emitter=__webpack_require__(35);var inherit=__webpack_require__(37);var debug=__webpack_require__(3)('engine.io-client:polling-xhr');/**
	 * Module exports.
	 */module.exports=XHR;module.exports.Request=Request;/**
	 * Empty function
	 */function empty(){}/**
	 * XHR Polling constructor.
	 *
	 * @param {Object} opts
	 * @api public
	 */function XHR(opts){Polling.call(this,opts);this.requestTimeout=opts.requestTimeout;if(global.location){var isSSL='https:'===location.protocol;var port=location.port;// some user agents have empty `location.port`
if(!port){port=isSSL?443:80;}this.xd=opts.hostname!==global.location.hostname||port!==opts.port;this.xs=opts.secure!==isSSL;}else{this.extraHeaders=opts.extraHeaders;}}/**
	 * Inherits from Polling.
	 */inherit(XHR,Polling);/**
	 * XHR supports binary
	 */XHR.prototype.supportsBinary=true;/**
	 * Creates a request.
	 *
	 * @param {String} method
	 * @api private
	 */XHR.prototype.request=function(opts){opts=opts||{};opts.uri=this.uri();opts.xd=this.xd;opts.xs=this.xs;opts.agent=this.agent||false;opts.supportsBinary=this.supportsBinary;opts.enablesXDR=this.enablesXDR;// SSL options for Node.js client
opts.pfx=this.pfx;opts.key=this.key;opts.passphrase=this.passphrase;opts.cert=this.cert;opts.ca=this.ca;opts.ciphers=this.ciphers;opts.rejectUnauthorized=this.rejectUnauthorized;opts.requestTimeout=this.requestTimeout;// other options for Node.js client
opts.extraHeaders=this.extraHeaders;return new Request(opts);};/**
	 * Sends data.
	 *
	 * @param {String} data to send.
	 * @param {Function} called upon flush.
	 * @api private
	 */XHR.prototype.doWrite=function(data,fn){var isBinary=typeof data!=='string'&&data!==undefined;var req=this.request({method:'POST',data:data,isBinary:isBinary});var self=this;req.on('success',fn);req.on('error',function(err){self.onError('xhr post error',err);});this.sendXhr=req;};/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */XHR.prototype.doPoll=function(){debug('xhr poll');var req=this.request();var self=this;req.on('data',function(data){self.onData(data);});req.on('error',function(err){self.onError('xhr poll error',err);});this.pollXhr=req;};/**
	 * Request constructor
	 *
	 * @param {Object} options
	 * @api public
	 */function Request(opts){this.method=opts.method||'GET';this.uri=opts.uri;this.xd=!!opts.xd;this.xs=!!opts.xs;this.async=false!==opts.async;this.data=undefined!==opts.data?opts.data:null;this.agent=opts.agent;this.isBinary=opts.isBinary;this.supportsBinary=opts.supportsBinary;this.enablesXDR=opts.enablesXDR;this.requestTimeout=opts.requestTimeout;// SSL options for Node.js client
this.pfx=opts.pfx;this.key=opts.key;this.passphrase=opts.passphrase;this.cert=opts.cert;this.ca=opts.ca;this.ciphers=opts.ciphers;this.rejectUnauthorized=opts.rejectUnauthorized;// other options for Node.js client
this.extraHeaders=opts.extraHeaders;this.create();}/**
	 * Mix in `Emitter`.
	 */Emitter(Request.prototype);/**
	 * Creates the XHR object and sends the request.
	 *
	 * @api private
	 */Request.prototype.create=function(){var opts={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};// SSL options for Node.js client
opts.pfx=this.pfx;opts.key=this.key;opts.passphrase=this.passphrase;opts.cert=this.cert;opts.ca=this.ca;opts.ciphers=this.ciphers;opts.rejectUnauthorized=this.rejectUnauthorized;var xhr=this.xhr=new XMLHttpRequest(opts);var self=this;try{debug('xhr open %s: %s',this.method,this.uri);xhr.open(this.method,this.uri,this.async);try{if(this.extraHeaders){xhr.setDisableHeaderCheck(true);for(var i in this.extraHeaders){if(this.extraHeaders.hasOwnProperty(i)){xhr.setRequestHeader(i,this.extraHeaders[i]);}}}}catch(e){}if(this.supportsBinary){// This has to be done after open because Firefox is stupid
// http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
xhr.responseType='arraybuffer';}if('POST'===this.method){try{if(this.isBinary){xhr.setRequestHeader('Content-type','application/octet-stream');}else{xhr.setRequestHeader('Content-type','text/plain;charset=UTF-8');}}catch(e){}}try{xhr.setRequestHeader('Accept','*/*');}catch(e){}// ie6 check
if('withCredentials'in xhr){xhr.withCredentials=true;}if(this.requestTimeout){xhr.timeout=this.requestTimeout;}if(this.hasXDR()){xhr.onload=function(){self.onLoad();};xhr.onerror=function(){self.onError(xhr.responseText);};}else{xhr.onreadystatechange=function(){if(4!==xhr.readyState)return;if(200===xhr.status||1223===xhr.status){self.onLoad();}else{// make sure the `error` event handler that's user-set
// does not throw in the same tick and gets caught here
setTimeout(function(){self.onError(xhr.status);},0);}};}debug('xhr data %s',this.data);xhr.send(this.data);}catch(e){// Need to defer since .create() is called directly fhrom the constructor
// and thus the 'error' event can only be only bound *after* this exception
// occurs.  Therefore, also, we cannot throw here at all.
setTimeout(function(){self.onError(e);},0);return;}if(global.document){this.index=Request.requestsCount++;Request.requests[this.index]=this;}};/**
	 * Called upon successful response.
	 *
	 * @api private
	 */Request.prototype.onSuccess=function(){this.emit('success');this.cleanup();};/**
	 * Called if we have data.
	 *
	 * @api private
	 */Request.prototype.onData=function(data){this.emit('data',data);this.onSuccess();};/**
	 * Called upon error.
	 *
	 * @api private
	 */Request.prototype.onError=function(err){this.emit('error',err);this.cleanup(true);};/**
	 * Cleans up house.
	 *
	 * @api private
	 */Request.prototype.cleanup=function(fromError){if('undefined'===typeof this.xhr||null===this.xhr){return;}// xmlhttprequest
if(this.hasXDR()){this.xhr.onload=this.xhr.onerror=empty;}else{this.xhr.onreadystatechange=empty;}if(fromError){try{this.xhr.abort();}catch(e){}}if(global.document){delete Request.requests[this.index];}this.xhr=null;};/**
	 * Called upon load.
	 *
	 * @api private
	 */Request.prototype.onLoad=function(){var data;try{var contentType;try{contentType=this.xhr.getResponseHeader('Content-Type').split(';')[0];}catch(e){}if(contentType==='application/octet-stream'){data=this.xhr.response||this.xhr.responseText;}else{if(!this.supportsBinary){data=this.xhr.responseText;}else{try{data=String.fromCharCode.apply(null,new Uint8Array(this.xhr.response));}catch(e){var ui8Arr=new Uint8Array(this.xhr.response);var dataArray=[];for(var idx=0,length=ui8Arr.length;idx<length;idx++){dataArray.push(ui8Arr[idx]);}data=String.fromCharCode.apply(null,dataArray);}}}}catch(e){this.onError(e);}if(null!=data){this.onData(data);}};/**
	 * Check if it has XDomainRequest.
	 *
	 * @api private
	 */Request.prototype.hasXDR=function(){return'undefined'!==typeof global.XDomainRequest&&!this.xs&&this.enablesXDR;};/**
	 * Aborts the request.
	 *
	 * @api public
	 */Request.prototype.abort=function(){this.cleanup();};/**
	 * Aborts pending requests when unloading the window. This is needed to prevent
	 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
	 * emitted.
	 */Request.requestsCount=0;Request.requests={};if(global.document){if(global.attachEvent){global.attachEvent('onunload',unloadHandler);}else if(global.addEventListener){global.addEventListener('beforeunload',unloadHandler,false);}}function unloadHandler(){for(var i in Request.requests){if(Request.requests.hasOwnProperty(i)){Request.requests[i].abort();}}}/* WEBPACK VAR INJECTION */}).call(exports,function(){return this;}());/***/},/* 25 *//***/function(module,exports,__webpack_require__){/**
	 * Module dependencies.
	 */var Transport=__webpack_require__(26);var parseqs=__webpack_require__(36);var parser=__webpack_require__(27);var inherit=__webpack_require__(37);var yeast=__webpack_require__(38);var debug=__webpack_require__(3)('engine.io-client:polling');/**
	 * Module exports.
	 */module.exports=Polling;/**
	 * Is XHR2 supported?
	 */var hasXHR2=function(){var XMLHttpRequest=__webpack_require__(22);var xhr=new XMLHttpRequest({xdomain:false});return null!=xhr.responseType;}();/**
	 * Polling interface.
	 *
	 * @param {Object} opts
	 * @api private
	 */function Polling(opts){var forceBase64=opts&&opts.forceBase64;if(!hasXHR2||forceBase64){this.supportsBinary=false;}Transport.call(this,opts);}/**
	 * Inherits from Transport.
	 */inherit(Polling,Transport);/**
	 * Transport name.
	 */Polling.prototype.name='polling';/**
	 * Opens the socket (triggers polling). We write a PING message to determine
	 * when the transport is open.
	 *
	 * @api private
	 */Polling.prototype.doOpen=function(){this.poll();};/**
	 * Pauses polling.
	 *
	 * @param {Function} callback upon buffers are flushed and transport is paused
	 * @api private
	 */Polling.prototype.pause=function(onPause){var self=this;this.readyState='pausing';function pause(){debug('paused');self.readyState='paused';onPause();}if(this.polling||!this.writable){var total=0;if(this.polling){debug('we are currently polling - waiting to pause');total++;this.once('pollComplete',function(){debug('pre-pause polling complete');--total||pause();});}if(!this.writable){debug('we are currently writing - waiting to pause');total++;this.once('drain',function(){debug('pre-pause writing complete');--total||pause();});}}else{pause();}};/**
	 * Starts polling cycle.
	 *
	 * @api public
	 */Polling.prototype.poll=function(){debug('polling');this.polling=true;this.doPoll();this.emit('poll');};/**
	 * Overloads onData to detect payloads.
	 *
	 * @api private
	 */Polling.prototype.onData=function(data){var self=this;debug('polling got data %s',data);var callback=function callback(packet,index,total){// if its the first message we consider the transport open
if('opening'===self.readyState){self.onOpen();}// if its a close packet, we close the ongoing requests
if('close'===packet.type){self.onClose();return false;}// otherwise bypass onData and handle the message
self.onPacket(packet);};// decode payload
parser.decodePayload(data,this.socket.binaryType,callback);// if an event did not trigger closing
if('closed'!==this.readyState){// if we got data we're not polling
this.polling=false;this.emit('pollComplete');if('open'===this.readyState){this.poll();}else{debug('ignoring poll - transport state "%s"',this.readyState);}}};/**
	 * For polling, send a close packet.
	 *
	 * @api private
	 */Polling.prototype.doClose=function(){var self=this;function close(){debug('writing close packet');self.write([{type:'close'}]);}if('open'===this.readyState){debug('transport open - closing');close();}else{// in case we're trying to close while
// handshaking is in progress (GH-164)
debug('transport not open - deferring close');this.once('open',close);}};/**
	 * Writes a packets payload.
	 *
	 * @param {Array} data packets
	 * @param {Function} drain callback
	 * @api private
	 */Polling.prototype.write=function(packets){var self=this;this.writable=false;var callbackfn=function callbackfn(){self.writable=true;self.emit('drain');};parser.encodePayload(packets,this.supportsBinary,function(data){self.doWrite(data,callbackfn);});};/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */Polling.prototype.uri=function(){var query=this.query||{};var schema=this.secure?'https':'http';var port='';// cache busting is forced
if(false!==this.timestampRequests){query[this.timestampParam]=yeast();}if(!this.supportsBinary&&!query.sid){query.b64=1;}query=parseqs.encode(query);// avoid port if default for schema
if(this.port&&('https'===schema&&Number(this.port)!==443||'http'===schema&&Number(this.port)!==80)){port=':'+this.port;}// prepend ? to query
if(query.length){query='?'+query;}var ipv6=this.hostname.indexOf(':')!==-1;return schema+'://'+(ipv6?'['+this.hostname+']':this.hostname)+port+this.path+query;};/***/},/* 26 *//***/function(module,exports,__webpack_require__){/**
	 * Module dependencies.
	 */var parser=__webpack_require__(27);var Emitter=__webpack_require__(35);/**
	 * Module exports.
	 */module.exports=Transport;/**
	 * Transport abstract constructor.
	 *
	 * @param {Object} options.
	 * @api private
	 */function Transport(opts){this.path=opts.path;this.hostname=opts.hostname;this.port=opts.port;this.secure=opts.secure;this.query=opts.query;this.timestampParam=opts.timestampParam;this.timestampRequests=opts.timestampRequests;this.readyState='';this.agent=opts.agent||false;this.socket=opts.socket;this.enablesXDR=opts.enablesXDR;// SSL options for Node.js client
this.pfx=opts.pfx;this.key=opts.key;this.passphrase=opts.passphrase;this.cert=opts.cert;this.ca=opts.ca;this.ciphers=opts.ciphers;this.rejectUnauthorized=opts.rejectUnauthorized;this.forceNode=opts.forceNode;// other options for Node.js client
this.extraHeaders=opts.extraHeaders;this.localAddress=opts.localAddress;}/**
	 * Mix in `Emitter`.
	 */Emitter(Transport.prototype);/**
	 * Emits an error.
	 *
	 * @param {String} str
	 * @return {Transport} for chaining
	 * @api public
	 */Transport.prototype.onError=function(msg,desc){var err=new Error(msg);err.type='TransportError';err.description=desc;this.emit('error',err);return this;};/**
	 * Opens the transport.
	 *
	 * @api public
	 */Transport.prototype.open=function(){if('closed'===this.readyState||''===this.readyState){this.readyState='opening';this.doOpen();}return this;};/**
	 * Closes the transport.
	 *
	 * @api private
	 */Transport.prototype.close=function(){if('opening'===this.readyState||'open'===this.readyState){this.doClose();this.onClose();}return this;};/**
	 * Sends multiple packets.
	 *
	 * @param {Array} packets
	 * @api private
	 */Transport.prototype.send=function(packets){if('open'===this.readyState){this.write(packets);}else{throw new Error('Transport not open');}};/**
	 * Called upon open
	 *
	 * @api private
	 */Transport.prototype.onOpen=function(){this.readyState='open';this.writable=true;this.emit('open');};/**
	 * Called with data.
	 *
	 * @param {String} data
	 * @api private
	 */Transport.prototype.onData=function(data){var packet=parser.decodePacket(data,this.socket.binaryType);this.onPacket(packet);};/**
	 * Called with a decoded packet.
	 */Transport.prototype.onPacket=function(packet){this.emit('packet',packet);};/**
	 * Called upon close.
	 *
	 * @api private
	 */Transport.prototype.onClose=function(){this.readyState='closed';this.emit('close');};/***/},/* 27 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global){/**
	 * Module dependencies.
	 */var keys=__webpack_require__(28);var hasBinary=__webpack_require__(29);var sliceBuffer=__webpack_require__(30);var after=__webpack_require__(31);var utf8=__webpack_require__(32);var base64encoder;if(global&&global.ArrayBuffer){base64encoder=__webpack_require__(33);}/**
	 * Check if we are running an android browser. That requires us to use
	 * ArrayBuffer with polling transports...
	 *
	 * http://ghinda.net/jpeg-blob-ajax-android/
	 */var isAndroid=typeof navigator!=='undefined'&&/Android/i.test(navigator.userAgent);/**
	 * Check if we are running in PhantomJS.
	 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
	 * https://github.com/ariya/phantomjs/issues/11395
	 * @type boolean
	 */var isPhantomJS=typeof navigator!=='undefined'&&/PhantomJS/i.test(navigator.userAgent);/**
	 * When true, avoids using Blobs to encode payloads.
	 * @type boolean
	 */var dontSendBlobs=isAndroid||isPhantomJS;/**
	 * Current protocol version.
	 */exports.protocol=3;/**
	 * Packet types.
	 */var packets=exports.packets={open:0// non-ws
,close:1// non-ws
,ping:2,pong:3,message:4,upgrade:5,noop:6};var packetslist=keys(packets);/**
	 * Premade error packet.
	 */var err={type:'error',data:'parser error'};/**
	 * Create a blob api even for blob builder when vendor prefixes exist
	 */var Blob=__webpack_require__(34);/**
	 * Encodes a packet.
	 *
	 *     <packet type id> [ <data> ]
	 *
	 * Example:
	 *
	 *     5hello world
	 *     3
	 *     4
	 *
	 * Binary is encoded in an identical principle
	 *
	 * @api private
	 */exports.encodePacket=function(packet,supportsBinary,utf8encode,callback){if('function'==typeof supportsBinary){callback=supportsBinary;supportsBinary=false;}if('function'==typeof utf8encode){callback=utf8encode;utf8encode=null;}var data=packet.data===undefined?undefined:packet.data.buffer||packet.data;if(global.ArrayBuffer&&data instanceof ArrayBuffer){return encodeArrayBuffer(packet,supportsBinary,callback);}else if(Blob&&data instanceof global.Blob){return encodeBlob(packet,supportsBinary,callback);}// might be an object with { base64: true, data: dataAsBase64String }
if(data&&data.base64){return encodeBase64Object(packet,callback);}// Sending data as a utf-8 string
var encoded=packets[packet.type];// data fragment is optional
if(undefined!==packet.data){encoded+=utf8encode?utf8.encode(String(packet.data)):String(packet.data);}return callback(''+encoded);};function encodeBase64Object(packet,callback){// packet data is an object { base64: true, data: dataAsBase64String }
var message='b'+exports.packets[packet.type]+packet.data.data;return callback(message);}/**
	 * Encode packet helpers for binary types
	 */function encodeArrayBuffer(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback);}var data=packet.data;var contentArray=new Uint8Array(data);var resultBuffer=new Uint8Array(1+data.byteLength);resultBuffer[0]=packets[packet.type];for(var i=0;i<contentArray.length;i++){resultBuffer[i+1]=contentArray[i];}return callback(resultBuffer.buffer);}function encodeBlobAsArrayBuffer(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback);}var fr=new FileReader();fr.onload=function(){packet.data=fr.result;exports.encodePacket(packet,supportsBinary,true,callback);};return fr.readAsArrayBuffer(packet.data);}function encodeBlob(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback);}if(dontSendBlobs){return encodeBlobAsArrayBuffer(packet,supportsBinary,callback);}var length=new Uint8Array(1);length[0]=packets[packet.type];var blob=new Blob([length.buffer,packet.data]);return callback(blob);}/**
	 * Encodes a packet with binary data in a base64 string
	 *
	 * @param {Object} packet, has `type` and `data`
	 * @return {String} base64 encoded message
	 */exports.encodeBase64Packet=function(packet,callback){var message='b'+exports.packets[packet.type];if(Blob&&packet.data instanceof global.Blob){var fr=new FileReader();fr.onload=function(){var b64=fr.result.split(',')[1];callback(message+b64);};return fr.readAsDataURL(packet.data);}var b64data;try{b64data=String.fromCharCode.apply(null,new Uint8Array(packet.data));}catch(e){// iPhone Safari doesn't let you apply with typed arrays
var typed=new Uint8Array(packet.data);var basic=new Array(typed.length);for(var i=0;i<typed.length;i++){basic[i]=typed[i];}b64data=String.fromCharCode.apply(null,basic);}message+=global.btoa(b64data);return callback(message);};/**
	 * Decodes a packet. Changes format to Blob if requested.
	 *
	 * @return {Object} with `type` and `data` (if any)
	 * @api private
	 */exports.decodePacket=function(data,binaryType,utf8decode){if(data===undefined){return err;}// String data
if(typeof data=='string'){if(data.charAt(0)=='b'){return exports.decodeBase64Packet(data.substr(1),binaryType);}if(utf8decode){data=tryDecode(data);if(data===false){return err;}}var type=data.charAt(0);if(Number(type)!=type||!packetslist[type]){return err;}if(data.length>1){return{type:packetslist[type],data:data.substring(1)};}else{return{type:packetslist[type]};}}var asArray=new Uint8Array(data);var type=asArray[0];var rest=sliceBuffer(data,1);if(Blob&&binaryType==='blob'){rest=new Blob([rest]);}return{type:packetslist[type],data:rest};};function tryDecode(data){try{data=utf8.decode(data);}catch(e){return false;}return data;}/**
	 * Decodes a packet encoded in a base64 string
	 *
	 * @param {String} base64 encoded message
	 * @return {Object} with `type` and `data` (if any)
	 */exports.decodeBase64Packet=function(msg,binaryType){var type=packetslist[msg.charAt(0)];if(!base64encoder){return{type:type,data:{base64:true,data:msg.substr(1)}};}var data=base64encoder.decode(msg.substr(1));if(binaryType==='blob'&&Blob){data=new Blob([data]);}return{type:type,data:data};};/**
	 * Encodes multiple messages (payload).
	 *
	 *     <length>:data
	 *
	 * Example:
	 *
	 *     11:hello world2:hi
	 *
	 * If any contents are binary, they will be encoded as base64 strings. Base64
	 * encoded strings are marked with a b before the length specifier
	 *
	 * @param {Array} packets
	 * @api private
	 */exports.encodePayload=function(packets,supportsBinary,callback){if(typeof supportsBinary=='function'){callback=supportsBinary;supportsBinary=null;}var isBinary=hasBinary(packets);if(supportsBinary&&isBinary){if(Blob&&!dontSendBlobs){return exports.encodePayloadAsBlob(packets,callback);}return exports.encodePayloadAsArrayBuffer(packets,callback);}if(!packets.length){return callback('0:');}function setLengthHeader(message){return message.length+':'+message;}function encodeOne(packet,doneCallback){exports.encodePacket(packet,!isBinary?false:supportsBinary,true,function(message){doneCallback(null,setLengthHeader(message));});}map(packets,encodeOne,function(err,results){return callback(results.join(''));});};/**
	 * Async array map using after
	 */function map(ary,each,done){var result=new Array(ary.length);var next=after(ary.length,done);var eachWithIndex=function eachWithIndex(i,el,cb){each(el,function(error,msg){result[i]=msg;cb(error,result);});};for(var i=0;i<ary.length;i++){eachWithIndex(i,ary[i],next);}}/*
	 * Decodes data when a payload is maybe expected. Possible binary contents are
	 * decoded from their base64 representation
	 *
	 * @param {String} data, callback method
	 * @api public
	 */exports.decodePayload=function(data,binaryType,callback){if(typeof data!='string'){return exports.decodePayloadAsBinary(data,binaryType,callback);}if(typeof binaryType==='function'){callback=binaryType;binaryType=null;}var packet;if(data==''){// parser error - ignoring payload
return callback(err,0,1);}var length='',n,msg;for(var i=0,l=data.length;i<l;i++){var chr=data.charAt(i);if(':'!=chr){length+=chr;}else{if(''==length||length!=(n=Number(length))){// parser error - ignoring payload
return callback(err,0,1);}msg=data.substr(i+1,n);if(length!=msg.length){// parser error - ignoring payload
return callback(err,0,1);}if(msg.length){packet=exports.decodePacket(msg,binaryType,true);if(err.type==packet.type&&err.data==packet.data){// parser error in individual packet - ignoring payload
return callback(err,0,1);}var ret=callback(packet,i+n,l);if(false===ret)return;}// advance cursor
i+=n;length='';}}if(length!=''){// parser error - ignoring payload
return callback(err,0,1);}};/**
	 * Encodes multiple messages (payload) as binary.
	 *
	 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
	 * 255><data>
	 *
	 * Example:
	 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
	 *
	 * @param {Array} packets
	 * @return {ArrayBuffer} encoded payload
	 * @api private
	 */exports.encodePayloadAsArrayBuffer=function(packets,callback){if(!packets.length){return callback(new ArrayBuffer(0));}function encodeOne(packet,doneCallback){exports.encodePacket(packet,true,true,function(data){return doneCallback(null,data);});}map(packets,encodeOne,function(err,encodedPackets){var totalLength=encodedPackets.reduce(function(acc,p){var len;if(typeof p==='string'){len=p.length;}else{len=p.byteLength;}return acc+len.toString().length+len+2;// string/binary identifier + separator = 2
},0);var resultArray=new Uint8Array(totalLength);var bufferIndex=0;encodedPackets.forEach(function(p){var isString=typeof p==='string';var ab=p;if(isString){var view=new Uint8Array(p.length);for(var i=0;i<p.length;i++){view[i]=p.charCodeAt(i);}ab=view.buffer;}if(isString){// not true binary
resultArray[bufferIndex++]=0;}else{// true binary
resultArray[bufferIndex++]=1;}var lenStr=ab.byteLength.toString();for(var i=0;i<lenStr.length;i++){resultArray[bufferIndex++]=parseInt(lenStr[i]);}resultArray[bufferIndex++]=255;var view=new Uint8Array(ab);for(var i=0;i<view.length;i++){resultArray[bufferIndex++]=view[i];}});return callback(resultArray.buffer);});};/**
	 * Encode as Blob
	 */exports.encodePayloadAsBlob=function(packets,callback){function encodeOne(packet,doneCallback){exports.encodePacket(packet,true,true,function(encoded){var binaryIdentifier=new Uint8Array(1);binaryIdentifier[0]=1;if(typeof encoded==='string'){var view=new Uint8Array(encoded.length);for(var i=0;i<encoded.length;i++){view[i]=encoded.charCodeAt(i);}encoded=view.buffer;binaryIdentifier[0]=0;}var len=encoded instanceof ArrayBuffer?encoded.byteLength:encoded.size;var lenStr=len.toString();var lengthAry=new Uint8Array(lenStr.length+1);for(var i=0;i<lenStr.length;i++){lengthAry[i]=parseInt(lenStr[i]);}lengthAry[lenStr.length]=255;if(Blob){var blob=new Blob([binaryIdentifier.buffer,lengthAry.buffer,encoded]);doneCallback(null,blob);}});}map(packets,encodeOne,function(err,results){return callback(new Blob(results));});};/*
	 * Decodes data when a payload is maybe expected. Strings are decoded by
	 * interpreting each byte as a key code for entries marked to start with 0. See
	 * description of encodePayloadAsBinary
	 *
	 * @param {ArrayBuffer} data, callback method
	 * @api public
	 */exports.decodePayloadAsBinary=function(data,binaryType,callback){if(typeof binaryType==='function'){callback=binaryType;binaryType=null;}var bufferTail=data;var buffers=[];var numberTooLong=false;while(bufferTail.byteLength>0){var tailArray=new Uint8Array(bufferTail);var isString=tailArray[0]===0;var msgLength='';for(var i=1;;i++){if(tailArray[i]==255)break;if(msgLength.length>310){numberTooLong=true;break;}msgLength+=tailArray[i];}if(numberTooLong)return callback(err,0,1);bufferTail=sliceBuffer(bufferTail,2+msgLength.length);msgLength=parseInt(msgLength);var msg=sliceBuffer(bufferTail,0,msgLength);if(isString){try{msg=String.fromCharCode.apply(null,new Uint8Array(msg));}catch(e){// iPhone Safari doesn't let you apply to typed arrays
var typed=new Uint8Array(msg);msg='';for(var i=0;i<typed.length;i++){msg+=String.fromCharCode(typed[i]);}}}buffers.push(msg);bufferTail=sliceBuffer(bufferTail,msgLength);}var total=buffers.length;buffers.forEach(function(buffer,i){callback(exports.decodePacket(buffer,binaryType,true),i,total);});};/* WEBPACK VAR INJECTION */}).call(exports,function(){return this;}());/***/},/* 28 *//***/function(module,exports){/**
	 * Gets the keys for an object.
	 *
	 * @return {Array} keys
	 * @api private
	 */module.exports=Object.keys||function keys(obj){var arr=[];var has=Object.prototype.hasOwnProperty;for(var i in obj){if(has.call(obj,i)){arr.push(i);}}return arr;};/***/},/* 29 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global){/*
	 * Module requirements.
	 */var isArray=__webpack_require__(15);/**
	 * Module exports.
	 */module.exports=hasBinary;/**
	 * Checks for binary data.
	 *
	 * Right now only Buffer and ArrayBuffer are supported..
	 *
	 * @param {Object} anything
	 * @api public
	 */function hasBinary(data){function _hasBinary(obj){if(!obj)return false;if(global.Buffer&&global.Buffer.isBuffer&&global.Buffer.isBuffer(obj)||global.ArrayBuffer&&obj instanceof ArrayBuffer||global.Blob&&obj instanceof Blob||global.File&&obj instanceof File){return true;}if(isArray(obj)){for(var i=0;i<obj.length;i++){if(_hasBinary(obj[i])){return true;}}}else if(obj&&'object'==(typeof obj==='undefined'?'undefined':_typeof2(obj))){// see: https://github.com/Automattic/has-binary/pull/4
if(obj.toJSON&&'function'==typeof obj.toJSON){obj=obj.toJSON();}for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)&&_hasBinary(obj[key])){return true;}}}return false;}return _hasBinary(data);}/* WEBPACK VAR INJECTION */}).call(exports,function(){return this;}());/***/},/* 30 *//***/function(module,exports){/**
	 * An abstraction for slicing an arraybuffer even when
	 * ArrayBuffer.prototype.slice is not supported
	 *
	 * @api public
	 */module.exports=function(arraybuffer,start,end){var bytes=arraybuffer.byteLength;start=start||0;end=end||bytes;if(arraybuffer.slice){return arraybuffer.slice(start,end);}if(start<0){start+=bytes;}if(end<0){end+=bytes;}if(end>bytes){end=bytes;}if(start>=bytes||start>=end||bytes===0){return new ArrayBuffer(0);}var abv=new Uint8Array(arraybuffer);var result=new Uint8Array(end-start);for(var i=start,ii=0;i<end;i++,ii++){result[ii]=abv[i];}return result.buffer;};/***/},/* 31 *//***/function(module,exports){module.exports=after;function after(count,callback,err_cb){var bail=false;err_cb=err_cb||noop;proxy.count=count;return count===0?callback():proxy;function proxy(err,result){if(proxy.count<=0){throw new Error('after called too many times');}--proxy.count;// after first error, rest are passed to err_cb
if(err){bail=true;callback(err);// future error callbacks will go to error handler
callback=err_cb;}else if(proxy.count===0&&!bail){callback(null,result);}}}function noop(){}/***/},/* 32 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module,global){/*! https://mths.be/wtf8 v1.0.0 by @mathias */;(function(root){// Detect free variables `exports`
var freeExports=(typeof exports==='undefined'?'undefined':_typeof2(exports))=='object'&&exports;// Detect free variable `module`
var freeModule=(typeof module==='undefined'?'undefined':_typeof2(module))=='object'&&module&&module.exports==freeExports&&module;// Detect free variable `global`, from Node.js or Browserified code,
// and use it as `root`
var freeGlobal=(typeof global==='undefined'?'undefined':_typeof2(global))=='object'&&global;if(freeGlobal.global===freeGlobal||freeGlobal.window===freeGlobal){root=freeGlobal;}/*--------------------------------------------------------------------------*/var stringFromCharCode=String.fromCharCode;// Taken from https://mths.be/punycode
function ucs2decode(string){var output=[];var counter=0;var length=string.length;var value;var extra;while(counter<length){value=string.charCodeAt(counter++);if(value>=0xD800&&value<=0xDBFF&&counter<length){// high surrogate, and there is a next character
extra=string.charCodeAt(counter++);if((extra&0xFC00)==0xDC00){// low surrogate
output.push(((value&0x3FF)<<10)+(extra&0x3FF)+0x10000);}else{// unmatched surrogate; only append this code unit, in case the next
// code unit is the high surrogate of a surrogate pair
output.push(value);counter--;}}else{output.push(value);}}return output;}// Taken from https://mths.be/punycode
function ucs2encode(array){var length=array.length;var index=-1;var value;var output='';while(++index<length){value=array[index];if(value>0xFFFF){value-=0x10000;output+=stringFromCharCode(value>>>10&0x3FF|0xD800);value=0xDC00|value&0x3FF;}output+=stringFromCharCode(value);}return output;}/*--------------------------------------------------------------------------*/function createByte(codePoint,shift){return stringFromCharCode(codePoint>>shift&0x3F|0x80);}function encodeCodePoint(codePoint){if((codePoint&0xFFFFFF80)==0){// 1-byte sequence
return stringFromCharCode(codePoint);}var symbol='';if((codePoint&0xFFFFF800)==0){// 2-byte sequence
symbol=stringFromCharCode(codePoint>>6&0x1F|0xC0);}else if((codePoint&0xFFFF0000)==0){// 3-byte sequence
symbol=stringFromCharCode(codePoint>>12&0x0F|0xE0);symbol+=createByte(codePoint,6);}else if((codePoint&0xFFE00000)==0){// 4-byte sequence
symbol=stringFromCharCode(codePoint>>18&0x07|0xF0);symbol+=createByte(codePoint,12);symbol+=createByte(codePoint,6);}symbol+=stringFromCharCode(codePoint&0x3F|0x80);return symbol;}function wtf8encode(string){var codePoints=ucs2decode(string);var length=codePoints.length;var index=-1;var codePoint;var byteString='';while(++index<length){codePoint=codePoints[index];byteString+=encodeCodePoint(codePoint);}return byteString;}/*--------------------------------------------------------------------------*/function readContinuationByte(){if(byteIndex>=byteCount){throw Error('Invalid byte index');}var continuationByte=byteArray[byteIndex]&0xFF;byteIndex++;if((continuationByte&0xC0)==0x80){return continuationByte&0x3F;}// If we end up here, it’s not a continuation byte.
throw Error('Invalid continuation byte');}function decodeSymbol(){var byte1;var byte2;var byte3;var byte4;var codePoint;if(byteIndex>byteCount){throw Error('Invalid byte index');}if(byteIndex==byteCount){return false;}// Read the first byte.
byte1=byteArray[byteIndex]&0xFF;byteIndex++;// 1-byte sequence (no continuation bytes)
if((byte1&0x80)==0){return byte1;}// 2-byte sequence
if((byte1&0xE0)==0xC0){var byte2=readContinuationByte();codePoint=(byte1&0x1F)<<6|byte2;if(codePoint>=0x80){return codePoint;}else{throw Error('Invalid continuation byte');}}// 3-byte sequence (may include unpaired surrogates)
if((byte1&0xF0)==0xE0){byte2=readContinuationByte();byte3=readContinuationByte();codePoint=(byte1&0x0F)<<12|byte2<<6|byte3;if(codePoint>=0x0800){return codePoint;}else{throw Error('Invalid continuation byte');}}// 4-byte sequence
if((byte1&0xF8)==0xF0){byte2=readContinuationByte();byte3=readContinuationByte();byte4=readContinuationByte();codePoint=(byte1&0x0F)<<0x12|byte2<<0x0C|byte3<<0x06|byte4;if(codePoint>=0x010000&&codePoint<=0x10FFFF){return codePoint;}}throw Error('Invalid WTF-8 detected');}var byteArray;var byteCount;var byteIndex;function wtf8decode(byteString){byteArray=ucs2decode(byteString);byteCount=byteArray.length;byteIndex=0;var codePoints=[];var tmp;while((tmp=decodeSymbol())!==false){codePoints.push(tmp);}return ucs2encode(codePoints);}/*--------------------------------------------------------------------------*/var wtf8={'version':'1.0.0','encode':wtf8encode,'decode':wtf8decode};// Some AMD build optimizers, like r.js, check for specific condition patterns
// like the following:
if(true){!(__WEBPACK_AMD_DEFINE_RESULT__=function(){return wtf8;}.call(exports,__webpack_require__,exports,module),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(freeExports&&!freeExports.nodeType){if(freeModule){// in Node.js or RingoJS v0.8.0+
freeModule.exports=wtf8;}else{// in Narwhal or RingoJS v0.7.0-
var object={};var hasOwnProperty=object.hasOwnProperty;for(var key in wtf8){hasOwnProperty.call(wtf8,key)&&(freeExports[key]=wtf8[key]);}}}else{// in Rhino or a web browser
root.wtf8=wtf8;}})(this);/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(12)(module),function(){return this;}());/***/},/* 33 *//***/function(module,exports){/*
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */(function(){"use strict";var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";// Use a lookup table to find the index.
var lookup=new Uint8Array(256);for(var i=0;i<chars.length;i++){lookup[chars.charCodeAt(i)]=i;}exports.encode=function(arraybuffer){var bytes=new Uint8Array(arraybuffer),i,len=bytes.length,base64="";for(i=0;i<len;i+=3){base64+=chars[bytes[i]>>2];base64+=chars[(bytes[i]&3)<<4|bytes[i+1]>>4];base64+=chars[(bytes[i+1]&15)<<2|bytes[i+2]>>6];base64+=chars[bytes[i+2]&63];}if(len%3===2){base64=base64.substring(0,base64.length-1)+"=";}else if(len%3===1){base64=base64.substring(0,base64.length-2)+"==";}return base64;};exports.decode=function(base64){var bufferLength=base64.length*0.75,len=base64.length,i,p=0,encoded1,encoded2,encoded3,encoded4;if(base64[base64.length-1]==="="){bufferLength--;if(base64[base64.length-2]==="="){bufferLength--;}}var arraybuffer=new ArrayBuffer(bufferLength),bytes=new Uint8Array(arraybuffer);for(i=0;i<len;i+=4){encoded1=lookup[base64.charCodeAt(i)];encoded2=lookup[base64.charCodeAt(i+1)];encoded3=lookup[base64.charCodeAt(i+2)];encoded4=lookup[base64.charCodeAt(i+3)];bytes[p++]=encoded1<<2|encoded2>>4;bytes[p++]=(encoded2&15)<<4|encoded3>>2;bytes[p++]=(encoded3&3)<<6|encoded4&63;}return arraybuffer;};})();/***/},/* 34 *//***/function(module,exports){/* WEBPACK VAR INJECTION */(function(global){/**
	 * Create a blob builder even when vendor prefixes exist
	 */var BlobBuilder=global.BlobBuilder||global.WebKitBlobBuilder||global.MSBlobBuilder||global.MozBlobBuilder;/**
	 * Check if Blob constructor is supported
	 */var blobSupported=function(){try{var a=new Blob(['hi']);return a.size===2;}catch(e){return false;}}();/**
	 * Check if Blob constructor supports ArrayBufferViews
	 * Fails in Safari 6, so we need to map to ArrayBuffers there.
	 */var blobSupportsArrayBufferView=blobSupported&&function(){try{var b=new Blob([new Uint8Array([1,2])]);return b.size===2;}catch(e){return false;}}();/**
	 * Check if BlobBuilder is supported
	 */var blobBuilderSupported=BlobBuilder&&BlobBuilder.prototype.append&&BlobBuilder.prototype.getBlob;/**
	 * Helper function that maps ArrayBufferViews to ArrayBuffers
	 * Used by BlobBuilder constructor and old browsers that didn't
	 * support it in the Blob constructor.
	 */function mapArrayBufferViews(ary){for(var i=0;i<ary.length;i++){var chunk=ary[i];if(chunk.buffer instanceof ArrayBuffer){var buf=chunk.buffer;// if this is a subarray, make a copy so we only
// include the subarray region from the underlying buffer
if(chunk.byteLength!==buf.byteLength){var copy=new Uint8Array(chunk.byteLength);copy.set(new Uint8Array(buf,chunk.byteOffset,chunk.byteLength));buf=copy.buffer;}ary[i]=buf;}}}function BlobBuilderConstructor(ary,options){options=options||{};var bb=new BlobBuilder();mapArrayBufferViews(ary);for(var i=0;i<ary.length;i++){bb.append(ary[i]);}return options.type?bb.getBlob(options.type):bb.getBlob();};function BlobConstructor(ary,options){mapArrayBufferViews(ary);return new Blob(ary,options||{});};module.exports=function(){if(blobSupported){return blobSupportsArrayBufferView?global.Blob:BlobConstructor;}else if(blobBuilderSupported){return BlobBuilderConstructor;}else{return undefined;}}();/* WEBPACK VAR INJECTION */}).call(exports,function(){return this;}());/***/},/* 35 *//***/function(module,exports,__webpack_require__){/**
	 * Expose `Emitter`.
	 */if(true){module.exports=Emitter;}/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */function Emitter(obj){if(obj)return mixin(obj);};/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */function mixin(obj){for(var key in Emitter.prototype){obj[key]=Emitter.prototype[key];}return obj;}/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */Emitter.prototype.on=Emitter.prototype.addEventListener=function(event,fn){this._callbacks=this._callbacks||{};(this._callbacks['$'+event]=this._callbacks['$'+event]||[]).push(fn);return this;};/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */Emitter.prototype.once=function(event,fn){function on(){this.off(event,on);fn.apply(this,arguments);}on.fn=fn;this.on(event,on);return this;};/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(event,fn){this._callbacks=this._callbacks||{};// all
if(0==arguments.length){this._callbacks={};return this;}// specific event
var callbacks=this._callbacks['$'+event];if(!callbacks)return this;// remove all handlers
if(1==arguments.length){delete this._callbacks['$'+event];return this;}// remove specific handler
var cb;for(var i=0;i<callbacks.length;i++){cb=callbacks[i];if(cb===fn||cb.fn===fn){callbacks.splice(i,1);break;}}return this;};/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */Emitter.prototype.emit=function(event){this._callbacks=this._callbacks||{};var args=[].slice.call(arguments,1),callbacks=this._callbacks['$'+event];if(callbacks){callbacks=callbacks.slice(0);for(var i=0,len=callbacks.length;i<len;++i){callbacks[i].apply(this,args);}}return this;};/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */Emitter.prototype.listeners=function(event){this._callbacks=this._callbacks||{};return this._callbacks['$'+event]||[];};/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */Emitter.prototype.hasListeners=function(event){return!!this.listeners(event).length;};/***/},/* 36 *//***/function(module,exports){/**
	 * Compiles a querystring
	 * Returns string representation of the object
	 *
	 * @param {Object}
	 * @api private
	 */exports.encode=function(obj){var str='';for(var i in obj){if(obj.hasOwnProperty(i)){if(str.length)str+='&';str+=encodeURIComponent(i)+'='+encodeURIComponent(obj[i]);}}return str;};/**
	 * Parses a simple querystring into an object
	 *
	 * @param {String} qs
	 * @api private
	 */exports.decode=function(qs){var qry={};var pairs=qs.split('&');for(var i=0,l=pairs.length;i<l;i++){var pair=pairs[i].split('=');qry[decodeURIComponent(pair[0])]=decodeURIComponent(pair[1]);}return qry;};/***/},/* 37 *//***/function(module,exports){module.exports=function(a,b){var fn=function fn(){};fn.prototype=b.prototype;a.prototype=new fn();a.prototype.constructor=a;};/***/},/* 38 *//***/function(module,exports){'use strict';var alphabet='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),length=64,map={},seed=0,i=0,prev;/**
	 * Return a string representing the specified number.
	 *
	 * @param {Number} num The number to convert.
	 * @returns {String} The string representation of the number.
	 * @api public
	 */function encode(num){var encoded='';do{encoded=alphabet[num%length]+encoded;num=Math.floor(num/length);}while(num>0);return encoded;}/**
	 * Return the integer value specified by the given string.
	 *
	 * @param {String} str The string to convert.
	 * @returns {Number} The integer value represented by the string.
	 * @api public
	 */function decode(str){var decoded=0;for(i=0;i<str.length;i++){decoded=decoded*length+map[str.charAt(i)];}return decoded;}/**
	 * Yeast: A tiny growing id generator.
	 *
	 * @returns {String} A unique id.
	 * @api public
	 */function yeast(){var now=encode(+new Date());if(now!==prev)return seed=0,prev=now;return now+'.'+encode(seed++);}//
// Map each character to its index.
//
for(;i<length;i++){map[alphabet[i]]=i;}//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode=encode;yeast.decode=decode;module.exports=yeast;/***/},/* 39 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global){/**
	 * Module requirements.
	 */var Polling=__webpack_require__(25);var inherit=__webpack_require__(37);/**
	 * Module exports.
	 */module.exports=JSONPPolling;/**
	 * Cached regular expressions.
	 */var rNewline=/\n/g;var rEscapedNewline=/\\n/g;/**
	 * Global JSONP callbacks.
	 */var callbacks;/**
	 * Noop.
	 */function empty(){}/**
	 * JSONP Polling constructor.
	 *
	 * @param {Object} opts.
	 * @api public
	 */function JSONPPolling(opts){Polling.call(this,opts);this.query=this.query||{};// define global callbacks array if not present
// we do this here (lazily) to avoid unneeded global pollution
if(!callbacks){// we need to consider multiple engines in the same page
if(!global.___eio)global.___eio=[];callbacks=global.___eio;}// callback identifier
this.index=callbacks.length;// add callback to jsonp global
var self=this;callbacks.push(function(msg){self.onData(msg);});// append to query string
this.query.j=this.index;// prevent spurious errors from being emitted when the window is unloaded
if(global.document&&global.addEventListener){global.addEventListener('beforeunload',function(){if(self.script)self.script.onerror=empty;},false);}}/**
	 * Inherits from Polling.
	 */inherit(JSONPPolling,Polling);/*
	 * JSONP only supports binary as base64 encoded strings
	 */JSONPPolling.prototype.supportsBinary=false;/**
	 * Closes the socket.
	 *
	 * @api private
	 */JSONPPolling.prototype.doClose=function(){if(this.script){this.script.parentNode.removeChild(this.script);this.script=null;}if(this.form){this.form.parentNode.removeChild(this.form);this.form=null;this.iframe=null;}Polling.prototype.doClose.call(this);};/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */JSONPPolling.prototype.doPoll=function(){var self=this;var script=document.createElement('script');if(this.script){this.script.parentNode.removeChild(this.script);this.script=null;}script.async=true;script.src=this.uri();script.onerror=function(e){self.onError('jsonp poll error',e);};var insertAt=document.getElementsByTagName('script')[0];if(insertAt){insertAt.parentNode.insertBefore(script,insertAt);}else{(document.head||document.body).appendChild(script);}this.script=script;var isUAgecko='undefined'!==typeof navigator&&/gecko/i.test(navigator.userAgent);if(isUAgecko){setTimeout(function(){var iframe=document.createElement('iframe');document.body.appendChild(iframe);document.body.removeChild(iframe);},100);}};/**
	 * Writes with a hidden iframe.
	 *
	 * @param {String} data to send
	 * @param {Function} called upon flush.
	 * @api private
	 */JSONPPolling.prototype.doWrite=function(data,fn){var self=this;if(!this.form){var form=document.createElement('form');var area=document.createElement('textarea');var id=this.iframeId='eio_iframe_'+this.index;var iframe;form.className='socketio';form.style.position='absolute';form.style.top='-1000px';form.style.left='-1000px';form.target=id;form.method='POST';form.setAttribute('accept-charset','utf-8');area.name='d';form.appendChild(area);document.body.appendChild(form);this.form=form;this.area=area;}this.form.action=this.uri();function complete(){initIframe();fn();}function initIframe(){if(self.iframe){try{self.form.removeChild(self.iframe);}catch(e){self.onError('jsonp polling iframe removal error',e);}}try{// ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
var html='<iframe src="javascript:0" name="'+self.iframeId+'">';iframe=document.createElement(html);}catch(e){iframe=document.createElement('iframe');iframe.name=self.iframeId;iframe.src='javascript:0';}iframe.id=self.iframeId;self.form.appendChild(iframe);self.iframe=iframe;}initIframe();// escape \n to prevent it from being converted into \r\n by some UAs
// double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
data=data.replace(rEscapedNewline,'\\\n');this.area.value=data.replace(rNewline,'\\n');try{this.form.submit();}catch(e){}if(this.iframe.attachEvent){this.iframe.onreadystatechange=function(){if(self.iframe.readyState==='complete'){complete();}};}else{this.iframe.onload=complete;}};/* WEBPACK VAR INJECTION */}).call(exports,function(){return this;}());/***/},/* 40 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global){/**
	 * Module dependencies.
	 */var Transport=__webpack_require__(26);var parser=__webpack_require__(27);var parseqs=__webpack_require__(36);var inherit=__webpack_require__(37);var yeast=__webpack_require__(38);var debug=__webpack_require__(3)('engine.io-client:websocket');var BrowserWebSocket=global.WebSocket||global.MozWebSocket;var NodeWebSocket;if(typeof window==='undefined'){try{NodeWebSocket=__webpack_require__(41);}catch(e){}}/**
	 * Get either the `WebSocket` or `MozWebSocket` globals
	 * in the browser or try to resolve WebSocket-compatible
	 * interface exposed by `ws` for Node-like environment.
	 */var WebSocket=BrowserWebSocket;if(!WebSocket&&typeof window==='undefined'){WebSocket=NodeWebSocket;}/**
	 * Module exports.
	 */module.exports=WS;/**
	 * WebSocket transport constructor.
	 *
	 * @api {Object} connection options
	 * @api public
	 */function WS(opts){var forceBase64=opts&&opts.forceBase64;if(forceBase64){this.supportsBinary=false;}this.perMessageDeflate=opts.perMessageDeflate;this.usingBrowserWebSocket=BrowserWebSocket&&!opts.forceNode;if(!this.usingBrowserWebSocket){WebSocket=NodeWebSocket;}Transport.call(this,opts);}/**
	 * Inherits from Transport.
	 */inherit(WS,Transport);/**
	 * Transport name.
	 *
	 * @api public
	 */WS.prototype.name='websocket';/*
	 * WebSockets support binary
	 */WS.prototype.supportsBinary=true;/**
	 * Opens socket.
	 *
	 * @api private
	 */WS.prototype.doOpen=function(){if(!this.check()){// let probe timeout
return;}var uri=this.uri();var protocols=void 0;var opts={agent:this.agent,perMessageDeflate:this.perMessageDeflate};// SSL options for Node.js client
opts.pfx=this.pfx;opts.key=this.key;opts.passphrase=this.passphrase;opts.cert=this.cert;opts.ca=this.ca;opts.ciphers=this.ciphers;opts.rejectUnauthorized=this.rejectUnauthorized;if(this.extraHeaders){opts.headers=this.extraHeaders;}if(this.localAddress){opts.localAddress=this.localAddress;}try{this.ws=this.usingBrowserWebSocket?new WebSocket(uri):new WebSocket(uri,protocols,opts);}catch(err){return this.emit('error',err);}if(this.ws.binaryType===undefined){this.supportsBinary=false;}if(this.ws.supports&&this.ws.supports.binary){this.supportsBinary=true;this.ws.binaryType='nodebuffer';}else{this.ws.binaryType='arraybuffer';}this.addEventListeners();};/**
	 * Adds event listeners to the socket
	 *
	 * @api private
	 */WS.prototype.addEventListeners=function(){var self=this;this.ws.onopen=function(){self.onOpen();};this.ws.onclose=function(){self.onClose();};this.ws.onmessage=function(ev){self.onData(ev.data);};this.ws.onerror=function(e){self.onError('websocket error',e);};};/**
	 * Writes data to socket.
	 *
	 * @param {Array} array of packets.
	 * @api private
	 */WS.prototype.write=function(packets){var self=this;this.writable=false;// encodePacket efficient as it uses WS framing
// no need for encodePayload
var total=packets.length;for(var i=0,l=total;i<l;i++){(function(packet){parser.encodePacket(packet,self.supportsBinary,function(data){if(!self.usingBrowserWebSocket){// always create a new object (GH-437)
var opts={};if(packet.options){opts.compress=packet.options.compress;}if(self.perMessageDeflate){var len='string'===typeof data?global.Buffer.byteLength(data):data.length;if(len<self.perMessageDeflate.threshold){opts.compress=false;}}}// Sometimes the websocket has already been closed but the browser didn't
// have a chance of informing us about it yet, in that case send will
// throw an error
try{if(self.usingBrowserWebSocket){// TypeError is thrown when passing the second argument on Safari
self.ws.send(data);}else{self.ws.send(data,opts);}}catch(e){debug('websocket closed before onclose event');}--total||done();});})(packets[i]);}function done(){self.emit('flush');// fake drain
// defer to next tick to allow Socket to clear writeBuffer
setTimeout(function(){self.writable=true;self.emit('drain');},0);}};/**
	 * Called upon close
	 *
	 * @api private
	 */WS.prototype.onClose=function(){Transport.prototype.onClose.call(this);};/**
	 * Closes socket.
	 *
	 * @api private
	 */WS.prototype.doClose=function(){if(typeof this.ws!=='undefined'){this.ws.close();}};/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */WS.prototype.uri=function(){var query=this.query||{};var schema=this.secure?'wss':'ws';var port='';// avoid port if default for schema
if(this.port&&('wss'===schema&&Number(this.port)!==443||'ws'===schema&&Number(this.port)!==80)){port=':'+this.port;}// append timestamp to URI
if(this.timestampRequests){query[this.timestampParam]=yeast();}// communicate binary support capabilities
if(!this.supportsBinary){query.b64=1;}query=parseqs.encode(query);// prepend ? to query
if(query.length){query='?'+query;}var ipv6=this.hostname.indexOf(':')!==-1;return schema+'://'+(ipv6?'['+this.hostname+']':this.hostname)+port+this.path+query;};/**
	 * Feature detection for WebSocket.
	 *
	 * @return {Boolean} whether this transport is available.
	 * @api public
	 */WS.prototype.check=function(){return!!WebSocket&&!('__initialize'in WebSocket&&this.name===WS.prototype.name);};/* WEBPACK VAR INJECTION */}).call(exports,function(){return this;}());/***/},/* 41 *//***/function(module,exports){/* (ignored) *//***/},/* 42 *//***/function(module,exports){var indexOf=[].indexOf;module.exports=function(arr,obj){if(indexOf)return arr.indexOf(obj);for(var i=0;i<arr.length;++i){if(arr[i]===obj)return i;}return-1;};/***/},/* 43 *//***/function(module,exports){/* WEBPACK VAR INJECTION */(function(global){/**
	 * JSON parse.
	 *
	 * @see Based on jQuery#parseJSON (MIT) and JSON2
	 * @api private
	 */var rvalidchars=/^[\],:{}\s]*$/;var rvalidescape=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;var rvalidtokens=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;var rvalidbraces=/(?:^|:|,)(?:\s*\[)+/g;var rtrimLeft=/^\s+/;var rtrimRight=/\s+$/;module.exports=function parsejson(data){if('string'!=typeof data||!data){return null;}data=data.replace(rtrimLeft,'').replace(rtrimRight,'');// Attempt to parse using the native JSON parser first
if(global.JSON&&JSON.parse){return JSON.parse(data);}if(rvalidchars.test(data.replace(rvalidescape,'@').replace(rvalidtokens,']').replace(rvalidbraces,''))){return new Function('return '+data)();}};/* WEBPACK VAR INJECTION */}).call(exports,function(){return this;}());/***/},/* 44 *//***/function(module,exports,__webpack_require__){'use strict';/**
	 * Module dependencies.
	 */var parser=__webpack_require__(7);var Emitter=__webpack_require__(35);var toArray=__webpack_require__(45);var on=__webpack_require__(46);var bind=__webpack_require__(47);var debug=__webpack_require__(3)('socket.io-client:socket');var hasBin=__webpack_require__(29);/**
	 * Module exports.
	 */module.exports=exports=Socket;/**
	 * Internal events (blacklisted).
	 * These events can't be emitted by the user.
	 *
	 * @api private
	 */var events={connect:1,connect_error:1,connect_timeout:1,connecting:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1,ping:1,pong:1};/**
	 * Shortcut to `Emitter#emit`.
	 */var emit=Emitter.prototype.emit;/**
	 * `Socket` constructor.
	 *
	 * @api public
	 */function Socket(io,nsp,opts){this.io=io;this.nsp=nsp;this.json=this;// compat
this.ids=0;this.acks={};this.receiveBuffer=[];this.sendBuffer=[];this.connected=false;this.disconnected=true;if(opts&&opts.query){this.query=opts.query;}if(this.io.autoConnect)this.open();}/**
	 * Mix in `Emitter`.
	 */Emitter(Socket.prototype);/**
	 * Subscribe to open, close and packet events
	 *
	 * @api private
	 */Socket.prototype.subEvents=function(){if(this.subs)return;var io=this.io;this.subs=[on(io,'open',bind(this,'onopen')),on(io,'packet',bind(this,'onpacket')),on(io,'close',bind(this,'onclose'))];};/**
	 * "Opens" the socket.
	 *
	 * @api public
	 */Socket.prototype.open=Socket.prototype.connect=function(){if(this.connected)return this;this.subEvents();this.io.open();// ensure open
if('open'===this.io.readyState)this.onopen();this.emit('connecting');return this;};/**
	 * Sends a `message` event.
	 *
	 * @return {Socket} self
	 * @api public
	 */Socket.prototype.send=function(){var args=toArray(arguments);args.unshift('message');this.emit.apply(this,args);return this;};/**
	 * Override `emit`.
	 * If the event is in `events`, it's emitted normally.
	 *
	 * @param {String} event name
	 * @return {Socket} self
	 * @api public
	 */Socket.prototype.emit=function(ev){if(events.hasOwnProperty(ev)){emit.apply(this,arguments);return this;}var args=toArray(arguments);var parserType=parser.EVENT;// default
if(hasBin(args)){parserType=parser.BINARY_EVENT;}// binary
var packet={type:parserType,data:args};packet.options={};packet.options.compress=!this.flags||false!==this.flags.compress;// event ack callback
if('function'===typeof args[args.length-1]){debug('emitting packet with ack id %d',this.ids);this.acks[this.ids]=args.pop();packet.id=this.ids++;}if(this.connected){this.packet(packet);}else{this.sendBuffer.push(packet);}delete this.flags;return this;};/**
	 * Sends a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */Socket.prototype.packet=function(packet){packet.nsp=this.nsp;this.io.packet(packet);};/**
	 * Called upon engine `open`.
	 *
	 * @api private
	 */Socket.prototype.onopen=function(){debug('transport is open - connecting');// write connect packet if necessary
if('/'!==this.nsp){if(this.query){this.packet({type:parser.CONNECT,query:this.query});}else{this.packet({type:parser.CONNECT});}}};/**
	 * Called upon engine `close`.
	 *
	 * @param {String} reason
	 * @api private
	 */Socket.prototype.onclose=function(reason){debug('close (%s)',reason);this.connected=false;this.disconnected=true;delete this.id;this.emit('disconnect',reason);};/**
	 * Called with socket packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */Socket.prototype.onpacket=function(packet){if(packet.nsp!==this.nsp)return;switch(packet.type){case parser.CONNECT:this.onconnect();break;case parser.EVENT:this.onevent(packet);break;case parser.BINARY_EVENT:this.onevent(packet);break;case parser.ACK:this.onack(packet);break;case parser.BINARY_ACK:this.onack(packet);break;case parser.DISCONNECT:this.ondisconnect();break;case parser.ERROR:this.emit('error',packet.data);break;}};/**
	 * Called upon a server event.
	 *
	 * @param {Object} packet
	 * @api private
	 */Socket.prototype.onevent=function(packet){var args=packet.data||[];debug('emitting event %j',args);if(null!=packet.id){debug('attaching ack callback to event');args.push(this.ack(packet.id));}if(this.connected){emit.apply(this,args);}else{this.receiveBuffer.push(args);}};/**
	 * Produces an ack callback to emit with an event.
	 *
	 * @api private
	 */Socket.prototype.ack=function(id){var self=this;var sent=false;return function(){// prevent double callbacks
if(sent)return;sent=true;var args=toArray(arguments);debug('sending ack %j',args);var type=hasBin(args)?parser.BINARY_ACK:parser.ACK;self.packet({type:type,id:id,data:args});};};/**
	 * Called upon a server acknowlegement.
	 *
	 * @param {Object} packet
	 * @api private
	 */Socket.prototype.onack=function(packet){var ack=this.acks[packet.id];if('function'===typeof ack){debug('calling ack %s with %j',packet.id,packet.data);ack.apply(this,packet.data);delete this.acks[packet.id];}else{debug('bad ack %s',packet.id);}};/**
	 * Called upon server connect.
	 *
	 * @api private
	 */Socket.prototype.onconnect=function(){this.connected=true;this.disconnected=false;this.emit('connect');this.emitBuffered();};/**
	 * Emit buffered events (received and emitted).
	 *
	 * @api private
	 */Socket.prototype.emitBuffered=function(){var i;for(i=0;i<this.receiveBuffer.length;i++){emit.apply(this,this.receiveBuffer[i]);}this.receiveBuffer=[];for(i=0;i<this.sendBuffer.length;i++){this.packet(this.sendBuffer[i]);}this.sendBuffer=[];};/**
	 * Called upon server disconnect.
	 *
	 * @api private
	 */Socket.prototype.ondisconnect=function(){debug('server disconnect (%s)',this.nsp);this.destroy();this.onclose('io server disconnect');};/**
	 * Called upon forced client/server side disconnections,
	 * this method ensures the manager stops tracking us and
	 * that reconnections don't get triggered for this.
	 *
	 * @api private.
	 */Socket.prototype.destroy=function(){if(this.subs){// clean subscriptions to avoid reconnections
for(var i=0;i<this.subs.length;i++){this.subs[i].destroy();}this.subs=null;}this.io.destroy(this);};/**
	 * Disconnects the socket manually.
	 *
	 * @return {Socket} self
	 * @api public
	 */Socket.prototype.close=Socket.prototype.disconnect=function(){if(this.connected){debug('performing disconnect (%s)',this.nsp);this.packet({type:parser.DISCONNECT});}// remove socket from pool
this.destroy();if(this.connected){// fire events
this.onclose('io client disconnect');}return this;};/**
	 * Sets the compress flag.
	 *
	 * @param {Boolean} if `true`, compresses the sending data
	 * @return {Socket} self
	 * @api public
	 */Socket.prototype.compress=function(compress){this.flags=this.flags||{};this.flags.compress=compress;return this;};/***/},/* 45 *//***/function(module,exports){module.exports=toArray;function toArray(list,index){var array=[];index=index||0;for(var i=index||0;i<list.length;i++){array[i-index]=list[i];}return array;}/***/},/* 46 *//***/function(module,exports){"use strict";/**
	 * Module exports.
	 */module.exports=on;/**
	 * Helper for subscriptions.
	 *
	 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
	 * @param {String} event name
	 * @param {Function} callback
	 * @api public
	 */function on(obj,ev,fn){obj.on(ev,fn);return{destroy:function destroy(){obj.removeListener(ev,fn);}};}/***/},/* 47 *//***/function(module,exports){/**
	 * Slice reference.
	 */var slice=[].slice;/**
	 * Bind `obj` to `fn`.
	 *
	 * @param {Object} obj
	 * @param {Function|String} fn or string
	 * @return {Function}
	 * @api public
	 */module.exports=function(obj,fn){if('string'==typeof fn)fn=obj[fn];if('function'!=typeof fn)throw new Error('bind() requires a function');var args=slice.call(arguments,2);return function(){return fn.apply(obj,args.concat(slice.call(arguments)));};};/***/},/* 48 *//***/function(module,exports){/**
	 * Expose `Backoff`.
	 */module.exports=Backoff;/**
	 * Initialize backoff timer with `opts`.
	 *
	 * - `min` initial timeout in milliseconds [100]
	 * - `max` max timeout [10000]
	 * - `jitter` [0]
	 * - `factor` [2]
	 *
	 * @param {Object} opts
	 * @api public
	 */function Backoff(opts){opts=opts||{};this.ms=opts.min||100;this.max=opts.max||10000;this.factor=opts.factor||2;this.jitter=opts.jitter>0&&opts.jitter<=1?opts.jitter:0;this.attempts=0;}/**
	 * Return the backoff duration.
	 *
	 * @return {Number}
	 * @api public
	 */Backoff.prototype.duration=function(){var ms=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var rand=Math.random();var deviation=Math.floor(rand*this.jitter*ms);ms=(Math.floor(rand*10)&1)==0?ms-deviation:ms+deviation;}return Math.min(ms,this.max)|0;};/**
	 * Reset the number of attempts.
	 *
	 * @api public
	 */Backoff.prototype.reset=function(){this.attempts=0;};/**
	 * Set the minimum duration
	 *
	 * @api public
	 */Backoff.prototype.setMin=function(min){this.ms=min;};/**
	 * Set the maximum duration
	 *
	 * @api public
	 */Backoff.prototype.setMax=function(max){this.max=max;};/**
	 * Set the jitter
	 *
	 * @api public
	 */Backoff.prototype.setJitter=function(jitter){this.jitter=jitter;};/***/}/******/]));});;//# sourceMappingURL=socket.io.js.map
// This file was generated by libdot/bin/concat.sh.
// It has been marked read-only for your safety.  Rather
// than edit it directly, please modify one of these source
// files...
//
// libdot/js/lib.js
// libdot/js/lib_polyfill.js
// libdot/js/lib_array.js
// libdot/js/lib_colors.js
// libdot/js/lib_f.js
// libdot/js/lib_message_manager.js
// libdot/js/lib_preference_manager.js
// libdot/js/lib_resource.js
// libdot/js/lib_storage.js
// libdot/js/lib_storage_chrome.js
// libdot/js/lib_storage_local.js
// libdot/js/lib_storage_memory.js
// libdot/js/lib_test_manager.js
// libdot/js/lib_utf8.js
// libdot/third_party/wcwidth/lib_wc.js
// hterm/js/hterm.js
// hterm/js/hterm_frame.js
// hterm/js/hterm_keyboard.js
// hterm/js/hterm_keyboard_bindings.js
// hterm/js/hterm_keyboard_keymap.js
// hterm/js/hterm_keyboard_keypattern.js
// hterm/js/hterm_options.js
// hterm/js/hterm_parser.js
// hterm/js/hterm_parser_identifiers.js
// hterm/js/hterm_preference_manager.js
// hterm/js/hterm_pubsub.js
// hterm/js/hterm_screen.js
// hterm/js/hterm_scrollport.js
// hterm/js/hterm_terminal.js
// hterm/js/hterm_terminal_io.js
// hterm/js/hterm_text_attributes.js
// hterm/js/hterm_vt.js
// hterm/js/hterm_vt_character_map.js
//
// SOURCE FILE: libdot/js/lib.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';if(typeof lib!='undefined')throw new Error('Global "lib" object already exists.');var lib={};/**
 * Map of "dependency" to ["source", ...].
 *
 * Each dependency is a object name, like "lib.fs", "source" is the url that
 * depends on the object.
 */lib.runtimeDependencies_={};/**
 * List of functions that need to be invoked during library initialization.
 *
 * Each element in the initCallbacks_ array is itself a two-element array.
 * Element 0 is a short string describing the owner of the init routine, useful
 * for debugging.  Element 1 is the callback function.
 */lib.initCallbacks_=[];/**
 * Records a runtime dependency.
 *
 * This can be useful when you want to express a run-time dependency at
 * compile time.  It is not intended to be a full-fledged library system or
 * dependency tracker.  It's just there to make it possible to debug the
 * deps without running all the code.
 *
 * Object names are specified as strings.  For example...
 *
 *     lib.rtdep('lib.colors', 'lib.PreferenceManager');
 *
 * Object names need not be rooted by 'lib'.  You may use this to declare a
 * dependency on any object.
 *
 * The client program may call lib.ensureRuntimeDependencies() at startup in
 * order to ensure that all runtime dependencies have been met.
 *
 * @param {string} var_args One or more objects specified as strings.
 */lib.rtdep=function(var_args){var source;try{throw new Error();}catch(ex){var stackArray=ex.stack.split('\n');// In Safari, the resulting stackArray will only have 2 elements and the
// individual strings are formatted differently.
if(stackArray.length>=3){source=stackArray[2].replace(/^\s*at\s+/,'');}else{source=stackArray[1].replace(/^\s*global code@/,'');}}for(var i=0;i<arguments.length;i++){var path=arguments[i];if(path instanceof Array){lib.rtdep.apply(lib,path);}else{var ary=this.runtimeDependencies_[path];if(!ary)ary=this.runtimeDependencies_[path]=[];ary.push(source);}}};/**
 * Ensures that all runtime dependencies are met, or an exception is thrown.
 *
 * Every unmet runtime dependency will be logged to the JS console.  If at
 * least one dependency is unmet this will raise an exception.
 */lib.ensureRuntimeDependencies_=function(){var passed=true;for(var path in lib.runtimeDependencies_){var sourceList=lib.runtimeDependencies_[path];var names=path.split('.');// In a document context 'window' is the global object.  In a worker it's
// called 'self'.
var obj=window||self;for(var i=0;i<names.length;i++){if(!(names[i]in obj)){console.warn('Missing "'+path+'" is needed by',sourceList);passed=false;break;}obj=obj[names[i]];}}if(!passed)throw new Error('Failed runtime dependency check');};/**
 * Register an initialization function.
 *
 * The initialization functions are invoked in registration order when
 * lib.init() is invoked.  Each function will receive a single parameter, which
 * is a function to be invoked when it completes its part of the initialization.
 *
 * @param {string} name A short descriptive name of the init routine useful for
 *     debugging.
 * @param {function(function)} callback The initialization function to register.
 * @return {function} The callback parameter.
 */lib.registerInit=function(name,callback){lib.initCallbacks_.push([name,callback]);return callback;};/**
 * Initialize the library.
 *
 * This will ensure that all registered runtime dependencies are met, and
 * invoke any registered initialization functions.
 *
 * Initialization is asynchronous.  The library is not ready for use until
 * the onInit function is invoked.
 *
 * @param {function()} onInit The function to invoke when initialization is
 *     complete.
 * @param {function(*)} opt_logFunction An optional function to send
 *     initialization related log messages to.
 */lib.init=function(onInit,opt_logFunction){var ary=lib.initCallbacks_;var initNext=function initNext(){if(ary.length){var rec=ary.shift();if(opt_logFunction)opt_logFunction('init: '+rec[0]);rec[1](lib.f.alarm(initNext));}else{onInit();}};if(typeof onInit!='function')throw new Error('Missing or invalid argument: onInit');lib.ensureRuntimeDependencies_();setTimeout(initNext,0);};// SOURCE FILE: libdot/js/lib_polyfill.js
// Copyright 2017 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * @fileoverview Polyfills for ES2016+ features we want to use.
 */// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if(!String.prototype.padStart){String.prototype.padStart=function(targetLength,padString){// If the string is already long enough, nothing to do!
targetLength-=this.length;if(targetLength<=0)return String(this);if(padString===undefined)padString=' ';// In case the pad is multiple chars long.
if(targetLength>padString.length)padString=padString.repeat(targetLength/padString.length+1);return padString.slice(0,targetLength)+String(this);};}// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
if(!String.prototype.padEnd){String.prototype.padEnd=function(targetLength,padString){// If the string is already long enough, nothing to do!
targetLength-=this.length;if(targetLength<=0)return String(this);if(padString===undefined)padString=' ';// In case the pad is multiple chars long.
if(targetLength>padString.length)padString=padString.repeat(targetLength/padString.length+1);return String(this)+padString.slice(0,targetLength);};}// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Object/values
// https://github.com/tc39/proposal-object-values-entries/blob/master/polyfill.js
if(!Object.values||!Object.entries){var reduce=Function.bind.call(Function.call,Array.prototype.reduce);var isEnumerable=Function.bind.call(Function.call,Object.prototype.propertyIsEnumerable);var concat=Function.bind.call(Function.call,Array.prototype.concat);if(!Object.values){Object.values=function values(O){return reduce(Reflect.ownKeys(O),function(v,k){return concat(v,typeof k==='string'&&isEnumerable(O,k)?[O[k]]:[]);},[]);};}if(!Object.entries){Object.entries=function entries(O){return reduce(Reflect.ownKeys(O),function(e,k){return concat(e,typeof k==='string'&&isEnumerable(O,k)?[[k,O[k]]]:[]);},[]);};}}// SOURCE FILE: libdot/js/lib_array.js
// Copyright 2017 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * @fileoverview Helper functions for (typed) arrays.
 */lib.array={};/**
 * Convert an array of four unsigned bytes into an unsigned 32-bit integer (big
 * endian).
 *
 * @param {!Array.<!number>} array
 * @returns {!number}
 */lib.array.arrayBigEndianToUint32=function(array){var maybeSigned=array[0]<<24|array[1]<<16|array[2]<<8|array[3]<<0;// Interpret the result of the bit operations as an unsigned integer.
return maybeSigned>>>0;};/**
 * Convert an unsigned 32-bit integer into an array of four unsigned bytes (big
 * endian).
 *
 * @param {!number} uint32
 * @returns {!Array.<!number>}
 */lib.array.uint32ToArrayBigEndian=function(uint32){return[uint32>>>24&0xFF,uint32>>>16&0xFF,uint32>>>8&0xFF,uint32>>>0&0xFF];};/**
 * Concatenate an arbitrary number of typed arrays of the same type into a new
 * typed array of this type.
 *
 * @template TYPED_ARRAY
 * @param {...!TYPED_ARRAY} arrays
 * @returns {!TYPED_ARRAY}
 */lib.array.concatTyped=function(){var resultLength=0;for(var _len=arguments.length,arrays=Array(_len),_key=0;_key<_len;_key++){arrays[_key]=arguments[_key];}var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=arrays[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var array=_step.value;resultLength+=array.length;}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}var result=new arrays[0].constructor(resultLength);var pos=0;var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=arrays[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var _array=_step2.value;result.set(_array,pos);pos+=_array.length;}}catch(err){_didIteratorError2=true;_iteratorError2=err;}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return();}}finally{if(_didIteratorError2){throw _iteratorError2;}}}return result;};/**
 * Compare two array-like objects entrywise.
 *
 * @template ARRAY_LIKE
 * @param {?ARRAY_LIKE} a
 * @param {?ARRAY_LIKE} b
 * @returns {!boolean} true if both arrays are null or they agree entrywise;
 *     false otherwise.
 */lib.array.compare=function(a,b){if(a===null||b===null){return a===null&&b===null;}if(a.length!==b.length){return false;}for(var i=0;i<a.length;i++){if(a[i]!==b[i]){return false;}}return true;};// SOURCE FILE: libdot/js/lib_colors.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * Namespace for color utilities.
 */lib.colors={};/**
 * First, some canned regular expressions we're going to use in this file.
 *
 *
 *                              BRACE YOURSELF
 *
 *                                 ,~~~~.
 *                                 |>_< ~~
 *                                3`---'-/.
 *                                3:::::\v\
 *                               =o=:::::\,\
 *                                | :::::\,,\
 *
 *                        THE REGULAR EXPRESSIONS
 *                               ARE COMING.
 *
 * There's no way to break long RE literals in JavaScript.  Fix that why don't
 * you?  Oh, and also there's no way to write a string that doesn't interpret
 * escapes.
 *
 * Instead, we stoop to this .replace() trick.
 */lib.colors.re_={// CSS hex color, #RGB.
hex16:/#([a-f0-9])([a-f0-9])([a-f0-9])/i,// CSS hex color, #RRGGBB.
hex24:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/i,// CSS rgb color, rgb(rrr,ggg,bbb).
rgb:new RegExp(('^/s*rgb/s*/(/s*(/d{1,3})/s*,/s*(/d{1,3})/s*,'+'/s*(/d{1,3})/s*/)/s*$').replace(/\//g,'\\'),'i'),// CSS rgb color, rgb(rrr,ggg,bbb,aaa).
rgba:new RegExp(('^/s*rgba/s*'+'/(/s*(/d{1,3})/s*,/s*(/d{1,3})/s*,/s*(/d{1,3})/s*'+'(?:,/s*(/d+(?:/./d+)?)/s*)/)/s*$').replace(/\//g,'\\'),'i'),// Either RGB or RGBA.
rgbx:new RegExp(('^/s*rgba?/s*'+'/(/s*(/d{1,3})/s*,/s*(/d{1,3})/s*,/s*(/d{1,3})/s*'+'(?:,/s*(/d+(?:/./d+)?)/s*)?/)/s*$').replace(/\//g,'\\'),'i'),// An X11 "rgb:dddd/dddd/dddd" value.
x11rgb:/^\s*rgb:([a-f0-9]{1,4})\/([a-f0-9]{1,4})\/([a-f0-9]{1,4})\s*$/i,// English color name.
name:/[a-z][a-z0-9\s]+/};/**
 * Convert a CSS rgb(ddd,ddd,ddd) color value into an X11 color value.
 *
 * Other CSS color values are ignored to ensure sanitary data handling.
 *
 * Each 'ddd' component is a one byte value specified in decimal.
 *
 * @param {string} value The CSS color value to convert.
 * @return {string} The X11 color value or null if the value could not be
 *     converted.
 */lib.colors.rgbToX11=function(value){function scale(v){v=(Math.min(v,255)*257).toString(16);return lib.f.zpad(v,4);}var ary=value.match(lib.colors.re_.rgbx);if(!ary)return null;return'rgb:'+scale(ary[1])+'/'+scale(ary[2])+'/'+scale(ary[3]);};/**
 * Convert a legacy X11 colover value into an CSS rgb(...) color value.
 *
 * They take the form:
 * 12 bit: #RGB          -> #R000G000B000
 * 24 bit: #RRGGBB       -> #RR00GG00BB00
 * 36 bit: #RRRGGGBBB    -> #RRR0GGG0BBB0
 * 48 bit: #RRRRGGGGBBBB
 * These are the most significant bits.
 *
 * Truncate values back down to 24 bit since that's all CSS supports.
 */lib.colors.x11HexToCSS=function(v){if(!v.startsWith('#'))return null;// Strip the leading # off.
v=v.substr(1);// Reject unknown sizes.
if([3,6,9,12].indexOf(v.length)==-1)return null;// Reject non-hex values.
if(v.match(/[^a-f0-9]/i))return null;// Split the colors out.
var size=v.length/3;var r=v.substr(0,size);var g=v.substr(size,size);var b=v.substr(size+size,size);// Normalize to 16 bits.
function norm16(v){v=parseInt(v,16);return size==2?v:// 16 bit
size==1?v<<4:// 8 bit
v>>4*(size-2);// 24 or 32 bit
}return lib.colors.arrayToRGBA([r,g,b].map(norm16));};/**
 * Convert an X11 color value into an CSS rgb(...) color value.
 *
 * The X11 value may be an X11 color name, or an RGB value of the form
 * rgb:hhhh/hhhh/hhhh.  If a component value is less than 4 digits it is
 * padded out to 4, then scaled down to fit in a single byte.
 *
 * @param {string} value The X11 color value to convert.
 * @return {string} The CSS color value or null if the value could not be
 *     converted.
 */lib.colors.x11ToCSS=function(v){function scale(v){// Pad out values with less than four digits.  This padding (probably)
// matches xterm.  It's difficult to say for sure since xterm seems to
// arrive at a padded value and then perform some combination of
// gamma correction, color space transformation, and quantization.
if(v.length==1){// Single digits pad out to four by repeating the character.  "f" becomes
// "ffff".  Scaling down a hex value of this pattern by 257 is the same
// as cutting off one byte.  We skip the middle step and just double
// the character.
return parseInt(v+v,16);}if(v.length==2){// Similar deal here.  X11 pads two digit values by repeating the
// byte (or scale up by 257).  Since we're going to scale it back
// down anyway, we can just return the original value.
return parseInt(v,16);}if(v.length==3){// Three digit values seem to be padded by repeating the final digit.
// e.g. 10f becomes 10ff.
v=v+v.substr(2);}// Scale down the 2 byte value.
return Math.round(parseInt(v,16)/257);}var ary=v.match(lib.colors.re_.x11rgb);if(!ary){// Handle the legacy format.
if(v.startsWith('#'))return lib.colors.x11HexToCSS(v);else return lib.colors.nameToRGB(v);}ary.splice(0,1);return lib.colors.arrayToRGBA(ary.map(scale));};/**
 * Converts one or more CSS '#RRGGBB' color values into their rgb(...)
 * form.
 *
 * Arrays are converted in place. If a value cannot be converted, it is
 * replaced with null.
 *
 * @param {string|Array.<string>} A single RGB value or array of RGB values to
 *     convert.
 * @return {string|Array.<string>} The converted value or values.
 */lib.colors.hexToRGB=function(arg){var hex16=lib.colors.re_.hex16;var hex24=lib.colors.re_.hex24;function convert(hex){if(hex.length==4){hex=hex.replace(hex16,function(h,r,g,b){return"#"+r+r+g+g+b+b;});}var ary=hex.match(hex24);if(!ary)return null;return'rgb('+parseInt(ary[1],16)+', '+parseInt(ary[2],16)+', '+parseInt(ary[3],16)+')';}if(arg instanceof Array){for(var i=0;i<arg.length;i++){arg[i]=convert(arg[i]);}}else{arg=convert(arg);}return arg;};/**
 * Converts one or more CSS rgb(...) forms into their '#RRGGBB' color values.
 *
 * If given an rgba(...) form, the alpha field is thrown away.
 *
 * Arrays are converted in place. If a value cannot be converted, it is
 * replaced with null.
 *
 * @param {string|Array.<string>} A single rgb(...) value or array of rgb(...)
 *     values to convert.
 * @return {string|Array.<string>} The converted value or values.
 */lib.colors.rgbToHex=function(arg){function convert(rgb){var ary=lib.colors.crackRGB(rgb);if(!ary)return null;return'#'+lib.f.zpad((parseInt(ary[0])<<16|parseInt(ary[1])<<8|parseInt(ary[2])<<0).toString(16),6);}if(arg instanceof Array){for(var i=0;i<arg.length;i++){arg[i]=convert(arg[i]);}}else{arg=convert(arg);}return arg;};/**
 * Take any valid css color definition and turn it into an rgb or rgba value.
 *
 * Returns null if the value could not be normalized.
 */lib.colors.normalizeCSS=function(def){if(def.startsWith('#'))return lib.colors.hexToRGB(def);if(lib.colors.re_.rgbx.test(def))return def;return lib.colors.nameToRGB(def);};/**
 * Convert a 3 or 4 element array into an rgba(...) string.
 */lib.colors.arrayToRGBA=function(ary){var alpha=ary.length>3?ary[3]:1;return'rgba('+ary[0]+', '+ary[1]+', '+ary[2]+', '+alpha+')';};/**
 * Overwrite the alpha channel of an rgb/rgba color.
 */lib.colors.setAlpha=function(rgb,alpha){var ary=lib.colors.crackRGB(rgb);ary[3]=alpha;return lib.colors.arrayToRGBA(ary);};/**
 * Mix a percentage of a tint color into a base color.
 */lib.colors.mix=function(base,tint,percent){var ary1=lib.colors.crackRGB(base);var ary2=lib.colors.crackRGB(tint);for(var i=0;i<4;++i){var diff=ary2[i]-ary1[i];ary1[i]=Math.round(parseInt(ary1[i])+diff*percent);}return lib.colors.arrayToRGBA(ary1);};/**
 * Split an rgb/rgba color into an array of its components.
 *
 * On success, a 4 element array will be returned.  For rgb values, the alpha
 * will be set to 1.
 */lib.colors.crackRGB=function(color){if(color.startsWith('rgba')){var ary=color.match(lib.colors.re_.rgba);if(ary){ary.shift();return ary;}}else{var ary=color.match(lib.colors.re_.rgb);if(ary){ary.shift();ary.push('1');return ary;}}console.error('Couldn\'t crack: '+color);return null;};/**
 * Convert an X11 color name into a CSS rgb(...) value.
 *
 * Names are stripped of spaces and converted to lowercase.  If the name is
 * unknown, null is returned.
 *
 * This list of color name to RGB mapping is derived from the stock X11
 * rgb.txt file.
 *
 * @param {string} name The color name to convert.
 * @return {string} The corresponding CSS rgb(...) value.
 */lib.colors.nameToRGB=function(name){if(name in lib.colors.colorNames)return lib.colors.colorNames[name];name=name.toLowerCase();if(name in lib.colors.colorNames)return lib.colors.colorNames[name];name=name.replace(/\s+/g,'');if(name in lib.colors.colorNames)return lib.colors.colorNames[name];return null;};/**
 * The stock color palette.
 */lib.colors.stockColorPalette=lib.colors.hexToRGB([// The "ANSI 16"...
'#000000','#CC0000','#4E9A06','#C4A000','#3465A4','#75507B','#06989A','#D3D7CF','#555753','#EF2929','#00BA13','#FCE94F','#729FCF','#F200CB','#00B5BD','#EEEEEC',// The 6x6 color cubes...
'#000000','#00005F','#000087','#0000AF','#0000D7','#0000FF','#005F00','#005F5F','#005F87','#005FAF','#005FD7','#005FFF','#008700','#00875F','#008787','#0087AF','#0087D7','#0087FF','#00AF00','#00AF5F','#00AF87','#00AFAF','#00AFD7','#00AFFF','#00D700','#00D75F','#00D787','#00D7AF','#00D7D7','#00D7FF','#00FF00','#00FF5F','#00FF87','#00FFAF','#00FFD7','#00FFFF','#5F0000','#5F005F','#5F0087','#5F00AF','#5F00D7','#5F00FF','#5F5F00','#5F5F5F','#5F5F87','#5F5FAF','#5F5FD7','#5F5FFF','#5F8700','#5F875F','#5F8787','#5F87AF','#5F87D7','#5F87FF','#5FAF00','#5FAF5F','#5FAF87','#5FAFAF','#5FAFD7','#5FAFFF','#5FD700','#5FD75F','#5FD787','#5FD7AF','#5FD7D7','#5FD7FF','#5FFF00','#5FFF5F','#5FFF87','#5FFFAF','#5FFFD7','#5FFFFF','#870000','#87005F','#870087','#8700AF','#8700D7','#8700FF','#875F00','#875F5F','#875F87','#875FAF','#875FD7','#875FFF','#878700','#87875F','#878787','#8787AF','#8787D7','#8787FF','#87AF00','#87AF5F','#87AF87','#87AFAF','#87AFD7','#87AFFF','#87D700','#87D75F','#87D787','#87D7AF','#87D7D7','#87D7FF','#87FF00','#87FF5F','#87FF87','#87FFAF','#87FFD7','#87FFFF','#AF0000','#AF005F','#AF0087','#AF00AF','#AF00D7','#AF00FF','#AF5F00','#AF5F5F','#AF5F87','#AF5FAF','#AF5FD7','#AF5FFF','#AF8700','#AF875F','#AF8787','#AF87AF','#AF87D7','#AF87FF','#AFAF00','#AFAF5F','#AFAF87','#AFAFAF','#AFAFD7','#AFAFFF','#AFD700','#AFD75F','#AFD787','#AFD7AF','#AFD7D7','#AFD7FF','#AFFF00','#AFFF5F','#AFFF87','#AFFFAF','#AFFFD7','#AFFFFF','#D70000','#D7005F','#D70087','#D700AF','#D700D7','#D700FF','#D75F00','#D75F5F','#D75F87','#D75FAF','#D75FD7','#D75FFF','#D78700','#D7875F','#D78787','#D787AF','#D787D7','#D787FF','#D7AF00','#D7AF5F','#D7AF87','#D7AFAF','#D7AFD7','#D7AFFF','#D7D700','#D7D75F','#D7D787','#D7D7AF','#D7D7D7','#D7D7FF','#D7FF00','#D7FF5F','#D7FF87','#D7FFAF','#D7FFD7','#D7FFFF','#FF0000','#FF005F','#FF0087','#FF00AF','#FF00D7','#FF00FF','#FF5F00','#FF5F5F','#FF5F87','#FF5FAF','#FF5FD7','#FF5FFF','#FF8700','#FF875F','#FF8787','#FF87AF','#FF87D7','#FF87FF','#FFAF00','#FFAF5F','#FFAF87','#FFAFAF','#FFAFD7','#FFAFFF','#FFD700','#FFD75F','#FFD787','#FFD7AF','#FFD7D7','#FFD7FF','#FFFF00','#FFFF5F','#FFFF87','#FFFFAF','#FFFFD7','#FFFFFF',// The greyscale ramp...
'#080808','#121212','#1C1C1C','#262626','#303030','#3A3A3A','#444444','#4E4E4E','#585858','#626262','#6C6C6C','#767676','#808080','#8A8A8A','#949494','#9E9E9E','#A8A8A8','#B2B2B2','#BCBCBC','#C6C6C6','#D0D0D0','#DADADA','#E4E4E4','#EEEEEE']);/**
 * The current color palette, possibly with user changes.
 */lib.colors.colorPalette=lib.colors.stockColorPalette;/**
 * Named colors according to the stock X11 rgb.txt file.
 */lib.colors.colorNames={"aliceblue":"rgb(240, 248, 255)","antiquewhite":"rgb(250, 235, 215)","antiquewhite1":"rgb(255, 239, 219)","antiquewhite2":"rgb(238, 223, 204)","antiquewhite3":"rgb(205, 192, 176)","antiquewhite4":"rgb(139, 131, 120)","aquamarine":"rgb(127, 255, 212)","aquamarine1":"rgb(127, 255, 212)","aquamarine2":"rgb(118, 238, 198)","aquamarine3":"rgb(102, 205, 170)","aquamarine4":"rgb(69, 139, 116)","azure":"rgb(240, 255, 255)","azure1":"rgb(240, 255, 255)","azure2":"rgb(224, 238, 238)","azure3":"rgb(193, 205, 205)","azure4":"rgb(131, 139, 139)","beige":"rgb(245, 245, 220)","bisque":"rgb(255, 228, 196)","bisque1":"rgb(255, 228, 196)","bisque2":"rgb(238, 213, 183)","bisque3":"rgb(205, 183, 158)","bisque4":"rgb(139, 125, 107)","black":"rgb(0, 0, 0)","blanchedalmond":"rgb(255, 235, 205)","blue":"rgb(0, 0, 255)","blue1":"rgb(0, 0, 255)","blue2":"rgb(0, 0, 238)","blue3":"rgb(0, 0, 205)","blue4":"rgb(0, 0, 139)","blueviolet":"rgb(138, 43, 226)","brown":"rgb(165, 42, 42)","brown1":"rgb(255, 64, 64)","brown2":"rgb(238, 59, 59)","brown3":"rgb(205, 51, 51)","brown4":"rgb(139, 35, 35)","burlywood":"rgb(222, 184, 135)","burlywood1":"rgb(255, 211, 155)","burlywood2":"rgb(238, 197, 145)","burlywood3":"rgb(205, 170, 125)","burlywood4":"rgb(139, 115, 85)","cadetblue":"rgb(95, 158, 160)","cadetblue1":"rgb(152, 245, 255)","cadetblue2":"rgb(142, 229, 238)","cadetblue3":"rgb(122, 197, 205)","cadetblue4":"rgb(83, 134, 139)","chartreuse":"rgb(127, 255, 0)","chartreuse1":"rgb(127, 255, 0)","chartreuse2":"rgb(118, 238, 0)","chartreuse3":"rgb(102, 205, 0)","chartreuse4":"rgb(69, 139, 0)","chocolate":"rgb(210, 105, 30)","chocolate1":"rgb(255, 127, 36)","chocolate2":"rgb(238, 118, 33)","chocolate3":"rgb(205, 102, 29)","chocolate4":"rgb(139, 69, 19)","coral":"rgb(255, 127, 80)","coral1":"rgb(255, 114, 86)","coral2":"rgb(238, 106, 80)","coral3":"rgb(205, 91, 69)","coral4":"rgb(139, 62, 47)","cornflowerblue":"rgb(100, 149, 237)","cornsilk":"rgb(255, 248, 220)","cornsilk1":"rgb(255, 248, 220)","cornsilk2":"rgb(238, 232, 205)","cornsilk3":"rgb(205, 200, 177)","cornsilk4":"rgb(139, 136, 120)","cyan":"rgb(0, 255, 255)","cyan1":"rgb(0, 255, 255)","cyan2":"rgb(0, 238, 238)","cyan3":"rgb(0, 205, 205)","cyan4":"rgb(0, 139, 139)","darkblue":"rgb(0, 0, 139)","darkcyan":"rgb(0, 139, 139)","darkgoldenrod":"rgb(184, 134, 11)","darkgoldenrod1":"rgb(255, 185, 15)","darkgoldenrod2":"rgb(238, 173, 14)","darkgoldenrod3":"rgb(205, 149, 12)","darkgoldenrod4":"rgb(139, 101, 8)","darkgray":"rgb(169, 169, 169)","darkgreen":"rgb(0, 100, 0)","darkgrey":"rgb(169, 169, 169)","darkkhaki":"rgb(189, 183, 107)","darkmagenta":"rgb(139, 0, 139)","darkolivegreen":"rgb(85, 107, 47)","darkolivegreen1":"rgb(202, 255, 112)","darkolivegreen2":"rgb(188, 238, 104)","darkolivegreen3":"rgb(162, 205, 90)","darkolivegreen4":"rgb(110, 139, 61)","darkorange":"rgb(255, 140, 0)","darkorange1":"rgb(255, 127, 0)","darkorange2":"rgb(238, 118, 0)","darkorange3":"rgb(205, 102, 0)","darkorange4":"rgb(139, 69, 0)","darkorchid":"rgb(153, 50, 204)","darkorchid1":"rgb(191, 62, 255)","darkorchid2":"rgb(178, 58, 238)","darkorchid3":"rgb(154, 50, 205)","darkorchid4":"rgb(104, 34, 139)","darkred":"rgb(139, 0, 0)","darksalmon":"rgb(233, 150, 122)","darkseagreen":"rgb(143, 188, 143)","darkseagreen1":"rgb(193, 255, 193)","darkseagreen2":"rgb(180, 238, 180)","darkseagreen3":"rgb(155, 205, 155)","darkseagreen4":"rgb(105, 139, 105)","darkslateblue":"rgb(72, 61, 139)","darkslategray":"rgb(47, 79, 79)","darkslategray1":"rgb(151, 255, 255)","darkslategray2":"rgb(141, 238, 238)","darkslategray3":"rgb(121, 205, 205)","darkslategray4":"rgb(82, 139, 139)","darkslategrey":"rgb(47, 79, 79)","darkturquoise":"rgb(0, 206, 209)","darkviolet":"rgb(148, 0, 211)","debianred":"rgb(215, 7, 81)","deeppink":"rgb(255, 20, 147)","deeppink1":"rgb(255, 20, 147)","deeppink2":"rgb(238, 18, 137)","deeppink3":"rgb(205, 16, 118)","deeppink4":"rgb(139, 10, 80)","deepskyblue":"rgb(0, 191, 255)","deepskyblue1":"rgb(0, 191, 255)","deepskyblue2":"rgb(0, 178, 238)","deepskyblue3":"rgb(0, 154, 205)","deepskyblue4":"rgb(0, 104, 139)","dimgray":"rgb(105, 105, 105)","dimgrey":"rgb(105, 105, 105)","dodgerblue":"rgb(30, 144, 255)","dodgerblue1":"rgb(30, 144, 255)","dodgerblue2":"rgb(28, 134, 238)","dodgerblue3":"rgb(24, 116, 205)","dodgerblue4":"rgb(16, 78, 139)","firebrick":"rgb(178, 34, 34)","firebrick1":"rgb(255, 48, 48)","firebrick2":"rgb(238, 44, 44)","firebrick3":"rgb(205, 38, 38)","firebrick4":"rgb(139, 26, 26)","floralwhite":"rgb(255, 250, 240)","forestgreen":"rgb(34, 139, 34)","gainsboro":"rgb(220, 220, 220)","ghostwhite":"rgb(248, 248, 255)","gold":"rgb(255, 215, 0)","gold1":"rgb(255, 215, 0)","gold2":"rgb(238, 201, 0)","gold3":"rgb(205, 173, 0)","gold4":"rgb(139, 117, 0)","goldenrod":"rgb(218, 165, 32)","goldenrod1":"rgb(255, 193, 37)","goldenrod2":"rgb(238, 180, 34)","goldenrod3":"rgb(205, 155, 29)","goldenrod4":"rgb(139, 105, 20)","gray":"rgb(190, 190, 190)","gray0":"rgb(0, 0, 0)","gray1":"rgb(3, 3, 3)","gray10":"rgb(26, 26, 26)","gray100":"rgb(255, 255, 255)","gray11":"rgb(28, 28, 28)","gray12":"rgb(31, 31, 31)","gray13":"rgb(33, 33, 33)","gray14":"rgb(36, 36, 36)","gray15":"rgb(38, 38, 38)","gray16":"rgb(41, 41, 41)","gray17":"rgb(43, 43, 43)","gray18":"rgb(46, 46, 46)","gray19":"rgb(48, 48, 48)","gray2":"rgb(5, 5, 5)","gray20":"rgb(51, 51, 51)","gray21":"rgb(54, 54, 54)","gray22":"rgb(56, 56, 56)","gray23":"rgb(59, 59, 59)","gray24":"rgb(61, 61, 61)","gray25":"rgb(64, 64, 64)","gray26":"rgb(66, 66, 66)","gray27":"rgb(69, 69, 69)","gray28":"rgb(71, 71, 71)","gray29":"rgb(74, 74, 74)","gray3":"rgb(8, 8, 8)","gray30":"rgb(77, 77, 77)","gray31":"rgb(79, 79, 79)","gray32":"rgb(82, 82, 82)","gray33":"rgb(84, 84, 84)","gray34":"rgb(87, 87, 87)","gray35":"rgb(89, 89, 89)","gray36":"rgb(92, 92, 92)","gray37":"rgb(94, 94, 94)","gray38":"rgb(97, 97, 97)","gray39":"rgb(99, 99, 99)","gray4":"rgb(10, 10, 10)","gray40":"rgb(102, 102, 102)","gray41":"rgb(105, 105, 105)","gray42":"rgb(107, 107, 107)","gray43":"rgb(110, 110, 110)","gray44":"rgb(112, 112, 112)","gray45":"rgb(115, 115, 115)","gray46":"rgb(117, 117, 117)","gray47":"rgb(120, 120, 120)","gray48":"rgb(122, 122, 122)","gray49":"rgb(125, 125, 125)","gray5":"rgb(13, 13, 13)","gray50":"rgb(127, 127, 127)","gray51":"rgb(130, 130, 130)","gray52":"rgb(133, 133, 133)","gray53":"rgb(135, 135, 135)","gray54":"rgb(138, 138, 138)","gray55":"rgb(140, 140, 140)","gray56":"rgb(143, 143, 143)","gray57":"rgb(145, 145, 145)","gray58":"rgb(148, 148, 148)","gray59":"rgb(150, 150, 150)","gray6":"rgb(15, 15, 15)","gray60":"rgb(153, 153, 153)","gray61":"rgb(156, 156, 156)","gray62":"rgb(158, 158, 158)","gray63":"rgb(161, 161, 161)","gray64":"rgb(163, 163, 163)","gray65":"rgb(166, 166, 166)","gray66":"rgb(168, 168, 168)","gray67":"rgb(171, 171, 171)","gray68":"rgb(173, 173, 173)","gray69":"rgb(176, 176, 176)","gray7":"rgb(18, 18, 18)","gray70":"rgb(179, 179, 179)","gray71":"rgb(181, 181, 181)","gray72":"rgb(184, 184, 184)","gray73":"rgb(186, 186, 186)","gray74":"rgb(189, 189, 189)","gray75":"rgb(191, 191, 191)","gray76":"rgb(194, 194, 194)","gray77":"rgb(196, 196, 196)","gray78":"rgb(199, 199, 199)","gray79":"rgb(201, 201, 201)","gray8":"rgb(20, 20, 20)","gray80":"rgb(204, 204, 204)","gray81":"rgb(207, 207, 207)","gray82":"rgb(209, 209, 209)","gray83":"rgb(212, 212, 212)","gray84":"rgb(214, 214, 214)","gray85":"rgb(217, 217, 217)","gray86":"rgb(219, 219, 219)","gray87":"rgb(222, 222, 222)","gray88":"rgb(224, 224, 224)","gray89":"rgb(227, 227, 227)","gray9":"rgb(23, 23, 23)","gray90":"rgb(229, 229, 229)","gray91":"rgb(232, 232, 232)","gray92":"rgb(235, 235, 235)","gray93":"rgb(237, 237, 237)","gray94":"rgb(240, 240, 240)","gray95":"rgb(242, 242, 242)","gray96":"rgb(245, 245, 245)","gray97":"rgb(247, 247, 247)","gray98":"rgb(250, 250, 250)","gray99":"rgb(252, 252, 252)","green":"rgb(0, 255, 0)","green1":"rgb(0, 255, 0)","green2":"rgb(0, 238, 0)","green3":"rgb(0, 205, 0)","green4":"rgb(0, 139, 0)","greenyellow":"rgb(173, 255, 47)","grey":"rgb(190, 190, 190)","grey0":"rgb(0, 0, 0)","grey1":"rgb(3, 3, 3)","grey10":"rgb(26, 26, 26)","grey100":"rgb(255, 255, 255)","grey11":"rgb(28, 28, 28)","grey12":"rgb(31, 31, 31)","grey13":"rgb(33, 33, 33)","grey14":"rgb(36, 36, 36)","grey15":"rgb(38, 38, 38)","grey16":"rgb(41, 41, 41)","grey17":"rgb(43, 43, 43)","grey18":"rgb(46, 46, 46)","grey19":"rgb(48, 48, 48)","grey2":"rgb(5, 5, 5)","grey20":"rgb(51, 51, 51)","grey21":"rgb(54, 54, 54)","grey22":"rgb(56, 56, 56)","grey23":"rgb(59, 59, 59)","grey24":"rgb(61, 61, 61)","grey25":"rgb(64, 64, 64)","grey26":"rgb(66, 66, 66)","grey27":"rgb(69, 69, 69)","grey28":"rgb(71, 71, 71)","grey29":"rgb(74, 74, 74)","grey3":"rgb(8, 8, 8)","grey30":"rgb(77, 77, 77)","grey31":"rgb(79, 79, 79)","grey32":"rgb(82, 82, 82)","grey33":"rgb(84, 84, 84)","grey34":"rgb(87, 87, 87)","grey35":"rgb(89, 89, 89)","grey36":"rgb(92, 92, 92)","grey37":"rgb(94, 94, 94)","grey38":"rgb(97, 97, 97)","grey39":"rgb(99, 99, 99)","grey4":"rgb(10, 10, 10)","grey40":"rgb(102, 102, 102)","grey41":"rgb(105, 105, 105)","grey42":"rgb(107, 107, 107)","grey43":"rgb(110, 110, 110)","grey44":"rgb(112, 112, 112)","grey45":"rgb(115, 115, 115)","grey46":"rgb(117, 117, 117)","grey47":"rgb(120, 120, 120)","grey48":"rgb(122, 122, 122)","grey49":"rgb(125, 125, 125)","grey5":"rgb(13, 13, 13)","grey50":"rgb(127, 127, 127)","grey51":"rgb(130, 130, 130)","grey52":"rgb(133, 133, 133)","grey53":"rgb(135, 135, 135)","grey54":"rgb(138, 138, 138)","grey55":"rgb(140, 140, 140)","grey56":"rgb(143, 143, 143)","grey57":"rgb(145, 145, 145)","grey58":"rgb(148, 148, 148)","grey59":"rgb(150, 150, 150)","grey6":"rgb(15, 15, 15)","grey60":"rgb(153, 153, 153)","grey61":"rgb(156, 156, 156)","grey62":"rgb(158, 158, 158)","grey63":"rgb(161, 161, 161)","grey64":"rgb(163, 163, 163)","grey65":"rgb(166, 166, 166)","grey66":"rgb(168, 168, 168)","grey67":"rgb(171, 171, 171)","grey68":"rgb(173, 173, 173)","grey69":"rgb(176, 176, 176)","grey7":"rgb(18, 18, 18)","grey70":"rgb(179, 179, 179)","grey71":"rgb(181, 181, 181)","grey72":"rgb(184, 184, 184)","grey73":"rgb(186, 186, 186)","grey74":"rgb(189, 189, 189)","grey75":"rgb(191, 191, 191)","grey76":"rgb(194, 194, 194)","grey77":"rgb(196, 196, 196)","grey78":"rgb(199, 199, 199)","grey79":"rgb(201, 201, 201)","grey8":"rgb(20, 20, 20)","grey80":"rgb(204, 204, 204)","grey81":"rgb(207, 207, 207)","grey82":"rgb(209, 209, 209)","grey83":"rgb(212, 212, 212)","grey84":"rgb(214, 214, 214)","grey85":"rgb(217, 217, 217)","grey86":"rgb(219, 219, 219)","grey87":"rgb(222, 222, 222)","grey88":"rgb(224, 224, 224)","grey89":"rgb(227, 227, 227)","grey9":"rgb(23, 23, 23)","grey90":"rgb(229, 229, 229)","grey91":"rgb(232, 232, 232)","grey92":"rgb(235, 235, 235)","grey93":"rgb(237, 237, 237)","grey94":"rgb(240, 240, 240)","grey95":"rgb(242, 242, 242)","grey96":"rgb(245, 245, 245)","grey97":"rgb(247, 247, 247)","grey98":"rgb(250, 250, 250)","grey99":"rgb(252, 252, 252)","honeydew":"rgb(240, 255, 240)","honeydew1":"rgb(240, 255, 240)","honeydew2":"rgb(224, 238, 224)","honeydew3":"rgb(193, 205, 193)","honeydew4":"rgb(131, 139, 131)","hotpink":"rgb(255, 105, 180)","hotpink1":"rgb(255, 110, 180)","hotpink2":"rgb(238, 106, 167)","hotpink3":"rgb(205, 96, 144)","hotpink4":"rgb(139, 58, 98)","indianred":"rgb(205, 92, 92)","indianred1":"rgb(255, 106, 106)","indianred2":"rgb(238, 99, 99)","indianred3":"rgb(205, 85, 85)","indianred4":"rgb(139, 58, 58)","ivory":"rgb(255, 255, 240)","ivory1":"rgb(255, 255, 240)","ivory2":"rgb(238, 238, 224)","ivory3":"rgb(205, 205, 193)","ivory4":"rgb(139, 139, 131)","khaki":"rgb(240, 230, 140)","khaki1":"rgb(255, 246, 143)","khaki2":"rgb(238, 230, 133)","khaki3":"rgb(205, 198, 115)","khaki4":"rgb(139, 134, 78)","lavender":"rgb(230, 230, 250)","lavenderblush":"rgb(255, 240, 245)","lavenderblush1":"rgb(255, 240, 245)","lavenderblush2":"rgb(238, 224, 229)","lavenderblush3":"rgb(205, 193, 197)","lavenderblush4":"rgb(139, 131, 134)","lawngreen":"rgb(124, 252, 0)","lemonchiffon":"rgb(255, 250, 205)","lemonchiffon1":"rgb(255, 250, 205)","lemonchiffon2":"rgb(238, 233, 191)","lemonchiffon3":"rgb(205, 201, 165)","lemonchiffon4":"rgb(139, 137, 112)","lightblue":"rgb(173, 216, 230)","lightblue1":"rgb(191, 239, 255)","lightblue2":"rgb(178, 223, 238)","lightblue3":"rgb(154, 192, 205)","lightblue4":"rgb(104, 131, 139)","lightcoral":"rgb(240, 128, 128)","lightcyan":"rgb(224, 255, 255)","lightcyan1":"rgb(224, 255, 255)","lightcyan2":"rgb(209, 238, 238)","lightcyan3":"rgb(180, 205, 205)","lightcyan4":"rgb(122, 139, 139)","lightgoldenrod":"rgb(238, 221, 130)","lightgoldenrod1":"rgb(255, 236, 139)","lightgoldenrod2":"rgb(238, 220, 130)","lightgoldenrod3":"rgb(205, 190, 112)","lightgoldenrod4":"rgb(139, 129, 76)","lightgoldenrodyellow":"rgb(250, 250, 210)","lightgray":"rgb(211, 211, 211)","lightgreen":"rgb(144, 238, 144)","lightgrey":"rgb(211, 211, 211)","lightpink":"rgb(255, 182, 193)","lightpink1":"rgb(255, 174, 185)","lightpink2":"rgb(238, 162, 173)","lightpink3":"rgb(205, 140, 149)","lightpink4":"rgb(139, 95, 101)","lightsalmon":"rgb(255, 160, 122)","lightsalmon1":"rgb(255, 160, 122)","lightsalmon2":"rgb(238, 149, 114)","lightsalmon3":"rgb(205, 129, 98)","lightsalmon4":"rgb(139, 87, 66)","lightseagreen":"rgb(32, 178, 170)","lightskyblue":"rgb(135, 206, 250)","lightskyblue1":"rgb(176, 226, 255)","lightskyblue2":"rgb(164, 211, 238)","lightskyblue3":"rgb(141, 182, 205)","lightskyblue4":"rgb(96, 123, 139)","lightslateblue":"rgb(132, 112, 255)","lightslategray":"rgb(119, 136, 153)","lightslategrey":"rgb(119, 136, 153)","lightsteelblue":"rgb(176, 196, 222)","lightsteelblue1":"rgb(202, 225, 255)","lightsteelblue2":"rgb(188, 210, 238)","lightsteelblue3":"rgb(162, 181, 205)","lightsteelblue4":"rgb(110, 123, 139)","lightyellow":"rgb(255, 255, 224)","lightyellow1":"rgb(255, 255, 224)","lightyellow2":"rgb(238, 238, 209)","lightyellow3":"rgb(205, 205, 180)","lightyellow4":"rgb(139, 139, 122)","limegreen":"rgb(50, 205, 50)","linen":"rgb(250, 240, 230)","magenta":"rgb(255, 0, 255)","magenta1":"rgb(255, 0, 255)","magenta2":"rgb(238, 0, 238)","magenta3":"rgb(205, 0, 205)","magenta4":"rgb(139, 0, 139)","maroon":"rgb(176, 48, 96)","maroon1":"rgb(255, 52, 179)","maroon2":"rgb(238, 48, 167)","maroon3":"rgb(205, 41, 144)","maroon4":"rgb(139, 28, 98)","mediumaquamarine":"rgb(102, 205, 170)","mediumblue":"rgb(0, 0, 205)","mediumorchid":"rgb(186, 85, 211)","mediumorchid1":"rgb(224, 102, 255)","mediumorchid2":"rgb(209, 95, 238)","mediumorchid3":"rgb(180, 82, 205)","mediumorchid4":"rgb(122, 55, 139)","mediumpurple":"rgb(147, 112, 219)","mediumpurple1":"rgb(171, 130, 255)","mediumpurple2":"rgb(159, 121, 238)","mediumpurple3":"rgb(137, 104, 205)","mediumpurple4":"rgb(93, 71, 139)","mediumseagreen":"rgb(60, 179, 113)","mediumslateblue":"rgb(123, 104, 238)","mediumspringgreen":"rgb(0, 250, 154)","mediumturquoise":"rgb(72, 209, 204)","mediumvioletred":"rgb(199, 21, 133)","midnightblue":"rgb(25, 25, 112)","mintcream":"rgb(245, 255, 250)","mistyrose":"rgb(255, 228, 225)","mistyrose1":"rgb(255, 228, 225)","mistyrose2":"rgb(238, 213, 210)","mistyrose3":"rgb(205, 183, 181)","mistyrose4":"rgb(139, 125, 123)","moccasin":"rgb(255, 228, 181)","navajowhite":"rgb(255, 222, 173)","navajowhite1":"rgb(255, 222, 173)","navajowhite2":"rgb(238, 207, 161)","navajowhite3":"rgb(205, 179, 139)","navajowhite4":"rgb(139, 121, 94)","navy":"rgb(0, 0, 128)","navyblue":"rgb(0, 0, 128)","oldlace":"rgb(253, 245, 230)","olivedrab":"rgb(107, 142, 35)","olivedrab1":"rgb(192, 255, 62)","olivedrab2":"rgb(179, 238, 58)","olivedrab3":"rgb(154, 205, 50)","olivedrab4":"rgb(105, 139, 34)","orange":"rgb(255, 165, 0)","orange1":"rgb(255, 165, 0)","orange2":"rgb(238, 154, 0)","orange3":"rgb(205, 133, 0)","orange4":"rgb(139, 90, 0)","orangered":"rgb(255, 69, 0)","orangered1":"rgb(255, 69, 0)","orangered2":"rgb(238, 64, 0)","orangered3":"rgb(205, 55, 0)","orangered4":"rgb(139, 37, 0)","orchid":"rgb(218, 112, 214)","orchid1":"rgb(255, 131, 250)","orchid2":"rgb(238, 122, 233)","orchid3":"rgb(205, 105, 201)","orchid4":"rgb(139, 71, 137)","palegoldenrod":"rgb(238, 232, 170)","palegreen":"rgb(152, 251, 152)","palegreen1":"rgb(154, 255, 154)","palegreen2":"rgb(144, 238, 144)","palegreen3":"rgb(124, 205, 124)","palegreen4":"rgb(84, 139, 84)","paleturquoise":"rgb(175, 238, 238)","paleturquoise1":"rgb(187, 255, 255)","paleturquoise2":"rgb(174, 238, 238)","paleturquoise3":"rgb(150, 205, 205)","paleturquoise4":"rgb(102, 139, 139)","palevioletred":"rgb(219, 112, 147)","palevioletred1":"rgb(255, 130, 171)","palevioletred2":"rgb(238, 121, 159)","palevioletred3":"rgb(205, 104, 137)","palevioletred4":"rgb(139, 71, 93)","papayawhip":"rgb(255, 239, 213)","peachpuff":"rgb(255, 218, 185)","peachpuff1":"rgb(255, 218, 185)","peachpuff2":"rgb(238, 203, 173)","peachpuff3":"rgb(205, 175, 149)","peachpuff4":"rgb(139, 119, 101)","peru":"rgb(205, 133, 63)","pink":"rgb(255, 192, 203)","pink1":"rgb(255, 181, 197)","pink2":"rgb(238, 169, 184)","pink3":"rgb(205, 145, 158)","pink4":"rgb(139, 99, 108)","plum":"rgb(221, 160, 221)","plum1":"rgb(255, 187, 255)","plum2":"rgb(238, 174, 238)","plum3":"rgb(205, 150, 205)","plum4":"rgb(139, 102, 139)","powderblue":"rgb(176, 224, 230)","purple":"rgb(160, 32, 240)","purple1":"rgb(155, 48, 255)","purple2":"rgb(145, 44, 238)","purple3":"rgb(125, 38, 205)","purple4":"rgb(85, 26, 139)","red":"rgb(255, 0, 0)","red1":"rgb(255, 0, 0)","red2":"rgb(238, 0, 0)","red3":"rgb(205, 0, 0)","red4":"rgb(139, 0, 0)","rosybrown":"rgb(188, 143, 143)","rosybrown1":"rgb(255, 193, 193)","rosybrown2":"rgb(238, 180, 180)","rosybrown3":"rgb(205, 155, 155)","rosybrown4":"rgb(139, 105, 105)","royalblue":"rgb(65, 105, 225)","royalblue1":"rgb(72, 118, 255)","royalblue2":"rgb(67, 110, 238)","royalblue3":"rgb(58, 95, 205)","royalblue4":"rgb(39, 64, 139)","saddlebrown":"rgb(139, 69, 19)","salmon":"rgb(250, 128, 114)","salmon1":"rgb(255, 140, 105)","salmon2":"rgb(238, 130, 98)","salmon3":"rgb(205, 112, 84)","salmon4":"rgb(139, 76, 57)","sandybrown":"rgb(244, 164, 96)","seagreen":"rgb(46, 139, 87)","seagreen1":"rgb(84, 255, 159)","seagreen2":"rgb(78, 238, 148)","seagreen3":"rgb(67, 205, 128)","seagreen4":"rgb(46, 139, 87)","seashell":"rgb(255, 245, 238)","seashell1":"rgb(255, 245, 238)","seashell2":"rgb(238, 229, 222)","seashell3":"rgb(205, 197, 191)","seashell4":"rgb(139, 134, 130)","sienna":"rgb(160, 82, 45)","sienna1":"rgb(255, 130, 71)","sienna2":"rgb(238, 121, 66)","sienna3":"rgb(205, 104, 57)","sienna4":"rgb(139, 71, 38)","skyblue":"rgb(135, 206, 235)","skyblue1":"rgb(135, 206, 255)","skyblue2":"rgb(126, 192, 238)","skyblue3":"rgb(108, 166, 205)","skyblue4":"rgb(74, 112, 139)","slateblue":"rgb(106, 90, 205)","slateblue1":"rgb(131, 111, 255)","slateblue2":"rgb(122, 103, 238)","slateblue3":"rgb(105, 89, 205)","slateblue4":"rgb(71, 60, 139)","slategray":"rgb(112, 128, 144)","slategray1":"rgb(198, 226, 255)","slategray2":"rgb(185, 211, 238)","slategray3":"rgb(159, 182, 205)","slategray4":"rgb(108, 123, 139)","slategrey":"rgb(112, 128, 144)","snow":"rgb(255, 250, 250)","snow1":"rgb(255, 250, 250)","snow2":"rgb(238, 233, 233)","snow3":"rgb(205, 201, 201)","snow4":"rgb(139, 137, 137)","springgreen":"rgb(0, 255, 127)","springgreen1":"rgb(0, 255, 127)","springgreen2":"rgb(0, 238, 118)","springgreen3":"rgb(0, 205, 102)","springgreen4":"rgb(0, 139, 69)","steelblue":"rgb(70, 130, 180)","steelblue1":"rgb(99, 184, 255)","steelblue2":"rgb(92, 172, 238)","steelblue3":"rgb(79, 148, 205)","steelblue4":"rgb(54, 100, 139)","tan":"rgb(210, 180, 140)","tan1":"rgb(255, 165, 79)","tan2":"rgb(238, 154, 73)","tan3":"rgb(205, 133, 63)","tan4":"rgb(139, 90, 43)","thistle":"rgb(216, 191, 216)","thistle1":"rgb(255, 225, 255)","thistle2":"rgb(238, 210, 238)","thistle3":"rgb(205, 181, 205)","thistle4":"rgb(139, 123, 139)","tomato":"rgb(255, 99, 71)","tomato1":"rgb(255, 99, 71)","tomato2":"rgb(238, 92, 66)","tomato3":"rgb(205, 79, 57)","tomato4":"rgb(139, 54, 38)","turquoise":"rgb(64, 224, 208)","turquoise1":"rgb(0, 245, 255)","turquoise2":"rgb(0, 229, 238)","turquoise3":"rgb(0, 197, 205)","turquoise4":"rgb(0, 134, 139)","violet":"rgb(238, 130, 238)","violetred":"rgb(208, 32, 144)","violetred1":"rgb(255, 62, 150)","violetred2":"rgb(238, 58, 140)","violetred3":"rgb(205, 50, 120)","violetred4":"rgb(139, 34, 82)","wheat":"rgb(245, 222, 179)","wheat1":"rgb(255, 231, 186)","wheat2":"rgb(238, 216, 174)","wheat3":"rgb(205, 186, 150)","wheat4":"rgb(139, 126, 102)","white":"rgb(255, 255, 255)","whitesmoke":"rgb(245, 245, 245)","yellow":"rgb(255, 255, 0)","yellow1":"rgb(255, 255, 0)","yellow2":"rgb(238, 238, 0)","yellow3":"rgb(205, 205, 0)","yellow4":"rgb(139, 139, 0)","yellowgreen":"rgb(154, 205, 50)"};// SOURCE FILE: libdot/js/lib_f.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * Grab bag of utility functions.
 */lib.f={};/**
 * Create a unique enum value.
 *
 * @suppress {lintChecks}
 * @param {string} name A human friendly name for debugging.
 * @return {Object} A unique enum that won't compare equal to anything else.
 */lib.f.createEnum=function(name){// We use a String object as nothing else should be using them -- we want to
// use string primitives normally.  But debuggers will include our name.
// eslint-disable-next-line no-new-wrappers
return new String(name);};/**
 * Replace variable references in a string.
 *
 * Variables are of the form %FUNCTION(VARNAME).  FUNCTION is an optional
 * escape function to apply to the value.
 *
 * For example
 *   lib.f.replaceVars("%(greeting), %encodeURIComponent(name)",
 *                     { greeting: "Hello",
 *                       name: "Google+" });
 *
 * Will result in "Hello, Google%2B".
 */lib.f.replaceVars=function(str,vars){return str.replace(/%([a-z]*)\(([^\)]+)\)/gi,function(match,fn,varname){if(typeof vars[varname]=='undefined')throw'Unknown variable: '+varname;var rv=vars[varname];if(fn in lib.f.replaceVars.functions){rv=lib.f.replaceVars.functions[fn](rv);}else if(fn){throw'Unknown escape function: '+fn;}return rv;});};/**
 * Functions that can be used with replaceVars.
 *
 * Clients can add to this list to extend lib.f.replaceVars().
 */lib.f.replaceVars.functions={encodeURI:encodeURI,encodeURIComponent:encodeURIComponent,escapeHTML:function escapeHTML(str){var map={'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#39;'};return str.replace(/[<>&\"\']/g,function(m){return map[m];});}};/**
 * Get the list of accepted UI languages.
 *
 * @param {function(Array)} callback Function to invoke with the results.  The
 *     parameter is a list of locale names.
 */lib.f.getAcceptLanguages=function(callback){if(lib.f.getAcceptLanguages.chromeSupported()){chrome.i18n.getAcceptLanguages(callback);}else{setTimeout(function(){callback([navigator.language.replace(/-/g,'_')]);},0);}};lib.f.getAcceptLanguages.chromeSupported=function(){return window.chrome&&chrome.i18n;};/**
 * Parse a query string into a hash.
 *
 * This takes a url query string in the form 'name1=value&name2=value' and
 * converts it into an object of the form { name1: 'value', name2: 'value' }.
 * If a given name appears multiple times in the query string, only the
 * last value will appear in the result.
 *
 * Names and values are passed through decodeURIComponent before being added
 * to the result object.
 *
 * @param {string} queryString The string to parse.  If it starts with a
 *     leading '?', the '?' will be ignored.
 */lib.f.parseQuery=function(queryString){if(queryString.startsWith('?'))queryString=queryString.substr(1);var rv={};var pairs=queryString.split('&');for(var i=0;i<pairs.length;i++){var pair=pairs[i].split('=');rv[decodeURIComponent(pair[0])]=decodeURIComponent(pair[1]);}return rv;};lib.f.getURL=function(path){if(lib.f.getURL.chromeSupported())return chrome.runtime.getURL(path);return path;};lib.f.getURL.chromeSupported=function(){return window.chrome&&chrome.runtime&&chrome.runtime.getURL;};/**
 * Clamp a given integer to a specified range.
 *
 * @param {integer} v The value to be clamped.
 * @param {integer} min The minimum acceptable value.
 * @param {integer} max The maximum acceptable value.
 */lib.f.clamp=function(v,min,max){if(v<min)return min;if(v>max)return max;return v;};/**
 * Left pad a number to a given length with leading zeros.
 *
 * @param {string|integer} number The number to pad.
 * @param {integer} length The desired length.
 * @return {string} The padded number as a string.
 */lib.f.zpad=function(number,length){return String(number).padStart(length,'0');};/**
 * Return a string containing a given number of space characters.
 *
 * This method maintains a static cache of the largest amount of whitespace
 * ever requested.  It shouldn't be used to generate an insanely huge amount of
 * whitespace.
 *
 * @param {integer} length The desired amount of whitespace.
 * @param {string} A string of spaces of the requested length.
 */lib.f.getWhitespace=function(length){if(length<=0)return'';var f=this.getWhitespace;if(!f.whitespace)f.whitespace='          ';while(length>f.whitespace.length){f.whitespace+=f.whitespace;}return f.whitespace.substr(0,length);};/**
 * Ensure that a function is called within a certain time limit.
 *
 * Simple usage looks like this...
 *
 *  lib.registerInit(lib.f.alarm(onInit));
 *
 * This will log a warning to the console if onInit() is not invoked within
 * 5 seconds.
 *
 * If you're performing some operation that may take longer than 5 seconds you
 * can pass a duration in milliseconds as the optional second parameter.
 *
 * If you pass a string identifier instead of a callback function, you'll get a
 * wrapper generator rather than a single wrapper.  Each call to the
 * generator will return a wrapped version of the callback wired to
 * a shared timeout.  This is for cases where you want to ensure that at least
 * one of a set of callbacks is invoked before a timeout expires.
 *
 *   var alarm = lib.f.alarm('fetch object');
 *   lib.foo.fetchObject(alarm(onSuccess), alarm(onFailure));
 *
 * @param {function(*)} callback The function to wrap in an alarm.
 * @param {int} opt_ms Optional number of milliseconds to wait before raising
 *     an alarm.  Default is 5000 (5 seconds).
 * @return {function} If callback is a function then the return value will be
 *     the wrapped callback.  If callback is a string then the return value will
 *     be a function that generates new wrapped callbacks.
 */lib.f.alarm=function(callback,opt_ms){var ms=opt_ms||5*1000;var stack=lib.f.getStack(1);return function(){// This outer function is called immediately.  It's here to capture a new
// scope for the timeout variable.
// The 'timeout' variable is shared by this timeout function, and the
// callback wrapper.
var timeout=setTimeout(function(){var name=typeof callback=='string'?name:callback.name;name=name?': '+name:'';console.warn('lib.f.alarm: timeout expired: '+ms/1000+'s'+name);console.log(stack);timeout=null;},ms);var wrapperGenerator=function wrapperGenerator(callback){return function(){if(timeout){clearTimeout(timeout);timeout=null;}return callback.apply(null,arguments);};};if(typeof callback=='string')return wrapperGenerator;return wrapperGenerator(callback);}();};/**
 * Return the current call stack after skipping a given number of frames.
 *
 * This method is intended to be used for debugging only.  It returns an
 * Object instead of an Array, because the console stringifies arrays by
 * default and that's not what we want.
 *
 * A typical call might look like...
 *
 *    console.log('Something wicked this way came', lib.f.getStack());
 *    //                         Notice the comma ^
 *
 * This would print the message to the js console, followed by an object
 * which can be clicked to reveal the stack.
 *
 * @param {number} opt_ignoreFrames The optional number of stack frames to
 *     ignore.  The actual 'getStack' call is always ignored.
 */lib.f.getStack=function(opt_ignoreFrames){var ignoreFrames=opt_ignoreFrames?opt_ignoreFrames+2:2;var stackArray;try{throw new Error();}catch(ex){stackArray=ex.stack.split('\n');}var stackObject={};for(var i=ignoreFrames;i<stackArray.length;i++){stackObject[i-ignoreFrames]=stackArray[i].replace(/^\s*at\s+/,'');}return stackObject;};/**
 * Divides the two numbers and floors the results, unless the remainder is less
 * than an incredibly small value, in which case it returns the ceiling.
 * This is useful when the number are truncated approximations of longer
 * values, and so doing division with these numbers yields a result incredibly
 * close to a whole number.
 *
 * @param {number} numerator
 * @param {number} denominator
 * @return {number}
 */lib.f.smartFloorDivide=function(numerator,denominator){var val=numerator/denominator;var ceiling=Math.ceil(val);if(ceiling-val<.0001){return ceiling;}else{return Math.floor(val);}};/**
 * Get a random integer in a range (inclusive).
 *
 * @param {number} min The lowest integer in the range.
 * @param {number} max The highest integer in the range.
 * @return {number} A random number between min & max.
 */lib.f.randomInt=function(min,max){return Math.floor(Math.random()*(max-min+1))+min;};// SOURCE FILE: libdot/js/lib_message_manager.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * MessageManager class handles internationalized strings.
 *
 * Note: chrome.i18n isn't sufficient because...
 *     1. There's a bug in chrome that makes it unavailable in iframes:
 *        https://crbug.com/130200
 *     2. The client code may not be packaged in a Chrome extension.
 *     3. The client code may be part of a library packaged in a third-party
 *        Chrome extension.
 *
 * @param {Array} languages List of languages to load, in the order they
 *     should be loaded.  Newer messages replace older ones.  'en' is
 *     automatically added as the first language if it is not already present.
 */lib.MessageManager=function(languages){this.languages_=languages.map(function(el){return el.replace(/-/g,'_');});if(this.languages_.indexOf('en')==-1)this.languages_.unshift('en');this.messages={};};/**
 * Add message definitions to the message manager.
 *
 * This takes an object of the same format of a Chrome messages.json file.  See
 * <https://developer.chrome.com/extensions/i18n-messages>.
 */lib.MessageManager.prototype.addMessages=function(defs){for(var key in defs){var def=defs[key];if(!def.placeholders){this.messages[key]=def.message;}else{// Replace "$NAME$" placeholders with "$1", etc.
this.messages[key]=def.message.replace(/\$([a-z][^\s\$]+)\$/ig,function(m,name){return defs[key].placeholders[name.toLowerCase()].content;});}}};/**
 * Load the first available language message bundle.
 *
 * @param {string} pattern A url pattern containing a "$1" where the locale
 *     name should go.
 * @param {function(Array,Array)} onComplete Function to be called when loading
 *     is complete.  The two arrays are the list of successful and failed
 *     locale names.  If the first parameter is length 0, no locales were
 *     loaded.
 */lib.MessageManager.prototype.findAndLoadMessages=function(pattern,onComplete){var languages=this.languages_.concat();var loaded=[];var failed=[];function onLanguageComplete(state){if(state){loaded=languages.shift();}else{failed=languages.shift();}if(languages.length){tryNextLanguage();}else{onComplete(loaded,failed);}}var tryNextLanguage=function(){this.loadMessages(this.replaceReferences(pattern,languages),onLanguageComplete.bind(this,true),onLanguageComplete.bind(this,false));}.bind(this);tryNextLanguage();};/**
 * Load messages from a messages.json file.
 */lib.MessageManager.prototype.loadMessages=function(url,onSuccess,opt_onError){var xhr=new XMLHttpRequest();xhr.onloadend=function(){if(xhr.status!=200){if(opt_onError)opt_onError(xhr.status);return;}this.addMessages(JSON.parse(xhr.responseText));onSuccess();}.bind(this);xhr.open('GET',url);xhr.send();};/**
 * Replace $1...$n references with the elements of the args array.
 *
 * @param {string} msg String containing the message and argument references.
 * @param {Array} args Array containing the argument values.
 */lib.MessageManager.replaceReferences=function(msg,args){return msg.replace(/\$(\d+)/g,function(m,index){return args[index-1];});};/**
 * Per-instance copy of replaceReferences.
 */lib.MessageManager.prototype.replaceReferences=lib.MessageManager.replaceReferences;/**
 * Get a message by name, optionally replacing arguments too.
 *
 * @param {string} msgname String containing the name of the message to get.
 * @param {Array} opt_args Optional array containing the argument values.
 * @param {string} opt_default Optional value to return if the msgname is not
 *     found.  Returns the message name by default.
 */lib.MessageManager.prototype.get=function(msgname,opt_args,opt_default){var message;if(msgname in this.messages){message=this.messages[msgname];}else{if(window.chrome&&window.chrome.i18n)message=chrome.i18n.getMessage(msgname);if(!message){console.warn('Unknown message: '+msgname);return typeof opt_default=='undefined'?msgname:opt_default;}}if(!opt_args)return message;if(!(opt_args instanceof Array))opt_args=[opt_args];return this.replaceReferences(message,opt_args);};/**
 * Process all of the "i18n" html attributes found in a given dom fragment.
 *
 * The real work happens in processI18nAttribute.
 */lib.MessageManager.prototype.processI18nAttributes=function(dom){var nodes=dom.querySelectorAll('[i18n]');for(var i=0;i<nodes.length;i++){this.processI18nAttribute(nodes[i]);}};/**
 * Process the "i18n" attribute in the specified node.
 *
 * The i18n attribute should contain a JSON object.  The keys are taken to
 * be attribute names, and the values are message names.
 *
 * If the JSON object has a "_" (underscore) key, its value is used as the
 * textContent of the element.
 *
 * Message names can refer to other attributes on the same element with by
 * prefixing with a dollar sign.  For example...
 *
 *   <button id='send-button'
 *           i18n='{"aria-label": "$id", "_": "SEND_BUTTON_LABEL"}'
 *           ></button>
 *
 * The aria-label message name will be computed as "SEND_BUTTON_ARIA_LABEL".
 * Notice that the "id" attribute was appended to the target attribute, and
 * the result converted to UPPER_AND_UNDER style.
 */lib.MessageManager.prototype.processI18nAttribute=function(node){// Convert the "lower-and-dashes" attribute names into
// "UPPER_AND_UNDER" style.
var thunk=function thunk(str){return str.replace(/-/g,'_').toUpperCase();};var i18n=node.getAttribute('i18n');if(!i18n)return;try{i18n=JSON.parse(i18n);}catch(ex){console.error('Can\'t parse '+node.tagName+'#'+node.id+': '+i18n);throw ex;}// Load all the messages specified in the i18n attributes.
for(var key in i18n){// The node attribute we'll be setting.
var attr=key;var msgname=i18n[key];// For "=foo", re-use the referenced message name.
if(msgname.startsWith('=')){key=msgname.substr(1);msgname=i18n[key];}// For "$foo", calculate the message name.
if(msgname.startsWith('$'))msgname=thunk(node.getAttribute(msgname.substr(1))+'_'+key);// Finally load the message.
var msg=this.get(msgname);if(attr=='_')node.textContent=msg;else node.setAttribute(attr,msg);}};// SOURCE FILE: libdot/js/lib_preference_manager.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * Constructor for lib.PreferenceManager objects.
 *
 * These objects deal with persisting changes to stable storage and notifying
 * consumers when preferences change.
 *
 * It is intended that the backing store could be something other than HTML5
 * storage, but there aren't any use cases at the moment.  In the future there
 * may be a chrome api to store sync-able name/value pairs, and we'd want
 * that.
 *
 * @param {lib.Storage.*} storage The storage object to use as a backing
 *     store.
 * @param {string} opt_prefix The optional prefix to be used for all preference
 *     names.  The '/' character should be used to separate levels of hierarchy,
 *     if you're going to have that kind of thing.  If provided, the prefix
 *     should start with a '/'.  If not provided, it defaults to '/'.
 */lib.PreferenceManager=function(storage,opt_prefix){this.storage=storage;this.storageObserver_=this.onStorageChange_.bind(this);this.isActive_=false;this.activate();this.trace=false;var prefix=opt_prefix||'/';if(!prefix.endsWith('/'))prefix+='/';this.prefix=prefix;this.prefRecords_={};this.globalObservers_=[];this.childFactories_={};// Map of list-name to {map of child pref managers}
// As in...
//
//  this.childLists_ = {
//    'profile-ids': {
//      'one': PreferenceManager,
//      'two': PreferenceManager,
//      ...
//    },
//
//    'frob-ids': {
//      ...
//    }
//  }
this.childLists_={};};/**
 * Used internally to indicate that the current value of the preference should
 * be taken from the default value defined with the preference.
 *
 * Equality tests against this value MUST use '===' or '!==' to be accurate.
 */lib.PreferenceManager.prototype.DEFAULT_VALUE=lib.f.createEnum('DEFAULT');/**
 * An individual preference.
 *
 * These objects are managed by the PreferenceManager, you shouldn't need to
 * handle them directly.
 */lib.PreferenceManager.Record=function(name,defaultValue){this.name=name;this.defaultValue=defaultValue;this.currentValue=this.DEFAULT_VALUE;this.observers=[];};/**
 * A local copy of the DEFAULT_VALUE constant to make it less verbose.
 */lib.PreferenceManager.Record.prototype.DEFAULT_VALUE=lib.PreferenceManager.prototype.DEFAULT_VALUE;/**
 * Register a callback to be invoked when this preference changes.
 *
 * @param {function(value, string, lib.PreferenceManager} observer The function
 *     to invoke.  It will receive the new value, the name of the preference,
 *     and a reference to the PreferenceManager as parameters.
 */lib.PreferenceManager.Record.prototype.addObserver=function(observer){this.observers.push(observer);};/**
 * Unregister an observer callback.
 *
 * @param {function} observer A previously registered callback.
 */lib.PreferenceManager.Record.prototype.removeObserver=function(observer){var i=this.observers.indexOf(observer);if(i>=0)this.observers.splice(i,1);};/**
 * Fetch the value of this preference.
 */lib.PreferenceManager.Record.prototype.get=function(){if(this.currentValue===this.DEFAULT_VALUE){if(/^(string|number)$/.test(_typeof2(this.defaultValue)))return this.defaultValue;if(_typeof2(this.defaultValue)=='object'){// We want to return a COPY of the default value so that users can
// modify the array or object without changing the default value.
return JSON.parse(JSON.stringify(this.defaultValue));}return this.defaultValue;}return this.currentValue;};/**
 * Stop this preference manager from tracking storage changes.
 *
 * Call this if you're going to swap out one preference manager for another so
 * that you don't get notified about irrelevant changes.
 */lib.PreferenceManager.prototype.deactivate=function(){if(!this.isActive_)throw new Error('Not activated');this.isActive_=false;this.storage.removeObserver(this.storageObserver_);};/**
 * Start tracking storage changes.
 *
 * If you previously deactivated this preference manager, you can reactivate it
 * with this method.  You don't need to call this at initialization time, as
 * it's automatically called as part of the constructor.
 */lib.PreferenceManager.prototype.activate=function(){if(this.isActive_)throw new Error('Already activated');this.isActive_=true;this.storage.addObserver(this.storageObserver_);};/**
 * Read the backing storage for these preferences.
 *
 * You should do this once at initialization time to prime the local cache
 * of preference values.  The preference manager will monitor the backing
 * storage for changes, so you should not need to call this more than once.
 *
 * This function recursively reads storage for all child preference managers as
 * well.
 *
 * This function is asynchronous, if you need to read preference values, you
 * *must* wait for the callback.
 *
 * @param {function()} opt_callback Optional function to invoke when the read
 *     has completed.
 */lib.PreferenceManager.prototype.readStorage=function(opt_callback){var _this=this;var pendingChildren=0;function onChildComplete(){if(--pendingChildren==0&&opt_callback)opt_callback();}var keys=Object.keys(this.prefRecords_).map(function(el){return _this.prefix+el;});if(this.trace)console.log('Preferences read: '+this.prefix);this.storage.getItems(keys,function(items){var prefixLength=this.prefix.length;for(var key in items){var value=items[key];var name=key.substr(prefixLength);var needSync=name in this.childLists_&&JSON.stringify(value)!=JSON.stringify(this.prefRecords_[name].currentValue);this.prefRecords_[name].currentValue=value;if(needSync){pendingChildren++;this.syncChildList(name,onChildComplete);}}if(pendingChildren==0&&opt_callback)setTimeout(opt_callback);}.bind(this));};/**
 * Define a preference.
 *
 * This registers a name, default value, and onChange handler for a preference.
 *
 * @param {string} name The name of the preference.  This will be prefixed by
 *     the prefix of this PreferenceManager before written to local storage.
 * @param {string|number|boolean|Object|Array|null} value The default value of
 *     this preference.  Anything that can be represented in JSON is a valid
 *     default value.
 * @param {function(value, string, lib.PreferenceManager} opt_observer A
 *     function to invoke when the preference changes.  It will receive the new
 *     value, the name of the preference, and a reference to the
 *     PreferenceManager as parameters.
 */lib.PreferenceManager.prototype.definePreference=function(name,value,opt_onChange){var record=this.prefRecords_[name];if(record){this.changeDefault(name,value);}else{record=this.prefRecords_[name]=new lib.PreferenceManager.Record(name,value);}if(opt_onChange)record.addObserver(opt_onChange);};/**
 * Define multiple preferences with a single function call.
 *
 * @param {Array} defaults An array of 3-element arrays.  Each three element
 *     array should contain the [key, value, onChange] parameters for a
 *     preference.
 */lib.PreferenceManager.prototype.definePreferences=function(defaults){for(var i=0;i<defaults.length;i++){this.definePreference(defaults[i][0],defaults[i][1],defaults[i][2]);}};/**
 * Define an ordered list of child preferences.
 *
 * Child preferences are different from just storing an array of JSON objects
 * in that each child is an instance of a preference manager.  This means you
 * can observe changes to individual child preferences, and get some validation
 * that you're not reading or writing to an undefined child preference value.
 *
 * @param {string} listName A name for the list of children.  This must be
 *     unique in this preference manager.  The listName will become a
 *     preference on this PreferenceManager used to store the ordered list of
 *     child ids.  It is also used in get/add/remove operations to identify the
 *     list of children to operate on.
 * @param {function} childFactory A function that will be used to generate
 *     instances of these children.  The factory function will receive the
 *     parent lib.PreferenceManager object and a unique id for the new child
 *     preferences.
 */lib.PreferenceManager.prototype.defineChildren=function(listName,childFactory){// Define a preference to hold the ordered list of child ids.
this.definePreference(listName,[],this.onChildListChange_.bind(this,listName));this.childFactories_[listName]=childFactory;this.childLists_[listName]={};};/**
 * Register to observe preference changes.
 *
 * @param {Function} global A callback that will happen for every preference.
 *     Pass null if you don't need one.
 * @param {Object} map A map of preference specific callbacks.  Pass null if
 *     you don't need any.
 */lib.PreferenceManager.prototype.addObservers=function(global,map){if(global&&typeof global!='function')throw new Error('Invalid param: globals');if(global)this.globalObservers_.push(global);if(!map)return;for(var name in map){if(!(name in this.prefRecords_))throw new Error('Unknown preference: '+name);this.prefRecords_[name].addObserver(map[name]);}};/**
 * Dispatch the change observers for all known preferences.
 *
 * It may be useful to call this after readStorage completes, in order to
 * get application state in sync with user preferences.
 *
 * This can be used if you've changed a preference manager out from under
 * a live object, for example when switching to a different prefix.
 */lib.PreferenceManager.prototype.notifyAll=function(){for(var name in this.prefRecords_){this.notifyChange_(name);}};/**
 * Notify the change observers for a given preference.
 *
 * @param {string} name The name of the preference that changed.
 */lib.PreferenceManager.prototype.notifyChange_=function(name){var record=this.prefRecords_[name];if(!record)throw new Error('Unknown preference: '+name);var currentValue=record.get();for(var i=0;i<this.globalObservers_.length;i++){this.globalObservers_[i](name,currentValue);}for(var i=0;i<record.observers.length;i++){record.observers[i](currentValue,name,this);}};/**
 * Create a new child PreferenceManager for the given child list.
 *
 * The optional hint parameter is an opaque prefix added to the auto-generated
 * unique id for this child.  Your child factory can parse out the prefix
 * and use it.
 *
 * @param {string} listName The child list to create the new instance from.
 * @param {string} opt_hint Optional hint to include in the child id.
 * @param {string} opt_id Optional id to override the generated id.
 */lib.PreferenceManager.prototype.createChild=function(listName,opt_hint,opt_id){var ids=this.get(listName);var id;if(opt_id){id=opt_id;if(ids.indexOf(id)!=-1)throw new Error('Duplicate child: '+listName+': '+id);}else{// Pick a random, unique 4-digit hex identifier for the new profile.
while(!id||ids.indexOf(id)!=-1){id=lib.f.randomInt(1,0xffff).toString(16);id=lib.f.zpad(id,4);if(opt_hint)id=opt_hint+':'+id;}}var childManager=this.childFactories_[listName](this,id);childManager.trace=this.trace;childManager.resetAll();this.childLists_[listName][id]=childManager;ids.push(id);this.set(listName,ids);return childManager;};/**
 * Remove a child preferences instance.
 *
 * Removes a child preference manager and clears any preferences stored in it.
 *
 * @param {string} listName The name of the child list containing the child to
 *     remove.
 * @param {string} id The child ID.
 */lib.PreferenceManager.prototype.removeChild=function(listName,id){var prefs=this.getChild(listName,id);prefs.resetAll();var ids=this.get(listName);var i=ids.indexOf(id);if(i!=-1){ids.splice(i,1);this.set(listName,ids);}delete this.childLists_[listName][id];};/**
 * Return a child PreferenceManager instance for a given id.
 *
 * If the child list or child id is not known this will return the specified
 * default value or throw an exception if no default value is provided.
 *
 * @param {string} listName The child list to look in.
 * @param {string} id The child ID.
 * @param {*} opt_default The optional default value to return if the child
 *     is not found.
 */lib.PreferenceManager.prototype.getChild=function(listName,id,opt_default){if(!(listName in this.childLists_))throw new Error('Unknown child list: '+listName);var childList=this.childLists_[listName];if(!(id in childList)){if(typeof opt_default=='undefined')throw new Error('Unknown "'+listName+'" child: '+id);return opt_default;}return childList[id];};/**
 * Calculate the difference between two lists of child ids.
 *
 * Given two arrays of child ids, this function will return an object
 * with "added", "removed", and "common" properties.  Each property is
 * a map of child-id to `true`.  For example, given...
 *
 *    a = ['child-x', 'child-y']
 *    b = ['child-y']
 *
 *    diffChildLists(a, b) =>
 *      { added: { 'child-x': true }, removed: {}, common: { 'child-y': true } }
 *
 * The added/removed properties assume that `a` is the current list.
 *
 * @param {Array[string]} a The most recent list of child ids.
 * @param {Array[string]} b An older list of child ids.
 * @return {Object} An object with added/removed/common properties.
 */lib.PreferenceManager.diffChildLists=function(a,b){var rv={added:{},removed:{},common:{}};for(var i=0;i<a.length;i++){if(b.indexOf(a[i])!=-1){rv.common[a[i]]=true;}else{rv.added[a[i]]=true;}}for(var i=0;i<b.length;i++){if(b[i]in rv.added||b[i]in rv.common)continue;rv.removed[b[i]]=true;}return rv;};/**
 * Synchronize a list of child PreferenceManagers instances with the current
 * list stored in prefs.
 *
 * This will instantiate any missing managers and read current preference values
 * from storage.  Any active managers that no longer appear in preferences will
 * be deleted.
 *
 * @param {string} listName The child list to synchronize.
 * @param {function()} opt_callback Optional function to invoke when the sync
 *     is complete.
 */lib.PreferenceManager.prototype.syncChildList=function(listName,opt_callback){var pendingChildren=0;function onChildStorage(){if(--pendingChildren==0&&opt_callback)opt_callback();}// The list of child ids that we *should* have a manager for.
var currentIds=this.get(listName);// The known managers at the start of the sync.  Any manager still in this
// list at the end should be discarded.
var oldIds=Object.keys(this.childLists_[listName]);var rv=lib.PreferenceManager.diffChildLists(currentIds,oldIds);for(var i=0;i<currentIds.length;i++){var id=currentIds[i];var managerIndex=oldIds.indexOf(id);if(managerIndex>=0)oldIds.splice(managerIndex,1);if(!this.childLists_[listName][id]){var childManager=this.childFactories_[listName](this,id);if(!childManager){console.warn('Unable to restore child: '+listName+': '+id);continue;}childManager.trace=this.trace;this.childLists_[listName][id]=childManager;pendingChildren++;childManager.readStorage(onChildStorage);}}for(var i=0;i<oldIds.length;i++){delete this.childLists_[listName][oldIds[i]];}if(!pendingChildren&&opt_callback)setTimeout(opt_callback);};/**
 * Reset a preference to its default state.
 *
 * This will dispatch the onChange handler if the preference value actually
 * changes.
 *
 * @param {string} name The preference to reset.
 */lib.PreferenceManager.prototype.reset=function(name){var record=this.prefRecords_[name];if(!record)throw new Error('Unknown preference: '+name);this.storage.removeItem(this.prefix+name);if(record.currentValue!==this.DEFAULT_VALUE){record.currentValue=this.DEFAULT_VALUE;this.notifyChange_(name);}};/**
 * Reset all preferences back to their default state.
 */lib.PreferenceManager.prototype.resetAll=function(){var changed=[];for(var listName in this.childLists_){var childList=this.childLists_[listName];for(var id in childList){childList[id].resetAll();}}for(var name in this.prefRecords_){if(this.prefRecords_[name].currentValue!==this.DEFAULT_VALUE){this.prefRecords_[name].currentValue=this.DEFAULT_VALUE;changed.push(name);}}var keys=Object.keys(this.prefRecords_).map(function(el){return this.prefix+el;}.bind(this));this.storage.removeItems(keys);changed.forEach(this.notifyChange_.bind(this));};/**
 * Return true if two values should be considered not-equal.
 *
 * If both values are the same scalar type and compare equal this function
 * returns false (no difference), otherwise return true.
 *
 * This is used in places where we want to check if a preference has changed.
 * Rather than take the time to compare complex values we just consider them
 * to always be different.
 *
 * @param {*} a A value to compare.
 * @param {*} b A value to compare.
 */lib.PreferenceManager.prototype.diff=function(a,b){// If the types are different, or the type is not a simple primitive one.
if((typeof a==='undefined'?'undefined':_typeof2(a))!==(typeof b==='undefined'?'undefined':_typeof2(b))||!/^(undefined|boolean|number|string)$/.test(typeof a==='undefined'?'undefined':_typeof2(a))){return true;}return a!==b;};/**
 * Change the default value of a preference.
 *
 * This is useful when subclassing preference managers.
 *
 * The function does not alter the current value of the preference, unless
 * it has the old default value.  When that happens, the change observers
 * will be notified.
 *
 * @param {string} name The name of the parameter to change.
 * @param {*} newValue The new default value for the preference.
 */lib.PreferenceManager.prototype.changeDefault=function(name,newValue){var record=this.prefRecords_[name];if(!record)throw new Error('Unknown preference: '+name);if(!this.diff(record.defaultValue,newValue)){// Default value hasn't changed.
return;}if(record.currentValue!==this.DEFAULT_VALUE){// This pref has a specific value, just change the default and we're done.
record.defaultValue=newValue;return;}record.defaultValue=newValue;this.notifyChange_(name);};/**
 * Change the default value of multiple preferences.
 *
 * @param {Object} map A map of name -> value pairs specifying the new default
 *     values.
 */lib.PreferenceManager.prototype.changeDefaults=function(map){for(var key in map){this.changeDefault(key,map[key]);}};/**
 * Set a preference to a specific value.
 *
 * This will dispatch the onChange handler if the preference value actually
 * changes.
 *
 * @param {string} key The preference to set.
 * @param {*} value The value to set.  Anything that can be represented in
 *     JSON is a valid value.
 */lib.PreferenceManager.prototype.set=function(name,newValue){var record=this.prefRecords_[name];if(!record)throw new Error('Unknown preference: '+name);var oldValue=record.get();if(!this.diff(oldValue,newValue))return;if(this.diff(record.defaultValue,newValue)){record.currentValue=newValue;this.storage.setItem(this.prefix+name,newValue);}else{record.currentValue=this.DEFAULT_VALUE;this.storage.removeItem(this.prefix+name);}// We need to manually send out the notification on this instance.  If we
// The storage event won't fire a notification because we've already changed
// the currentValue, so it won't see a difference.  If we delayed changing
// currentValue until the storage event, a pref read immediately after a write
// would return the previous value.
//
// The notification is in a timeout so clients don't accidentally depend on
// a synchronous notification.
setTimeout(this.notifyChange_.bind(this,name),0);};/**
 * Get the value of a preference.
 *
 * @param {string} key The preference to get.
 */lib.PreferenceManager.prototype.get=function(name){var record=this.prefRecords_[name];if(!record)throw new Error('Unknown preference: '+name);return record.get();};/**
 * Return all non-default preferences as a JSON object.
 *
 * This includes any nested preference managers as well.
 */lib.PreferenceManager.prototype.exportAsJson=function(){var rv={};for(var name in this.prefRecords_){if(name in this.childLists_){rv[name]=[];var childIds=this.get(name);for(var i=0;i<childIds.length;i++){var id=childIds[i];rv[name].push({id:id,json:this.getChild(name,id).exportAsJson()});}}else{var record=this.prefRecords_[name];if(record.currentValue!=this.DEFAULT_VALUE)rv[name]=record.currentValue;}}return rv;};/**
 * Import a JSON blob of preferences previously generated with exportAsJson.
 *
 * This will create nested preference managers as well.
 */lib.PreferenceManager.prototype.importFromJson=function(json,opt_onComplete){var pendingWrites=0;var onWriteStorage=function onWriteStorage(){if(--pendingWrites<1&&opt_onComplete)opt_onComplete();};for(var name in json){if(name in this.childLists_){var childList=json[name];for(var i=0;i<childList.length;i++){var id=childList[i].id;var childPrefManager=this.childLists_[name][id];if(!childPrefManager)childPrefManager=this.createChild(name,null,id);childPrefManager.importFromJson(childList[i].json,onWriteStorage);pendingWrites++;}}else{this.set(name,json[name],onWriteStorage);pendingWrites++;}}};/**
 * Called when one of the child list preferences changes.
 */lib.PreferenceManager.prototype.onChildListChange_=function(listName){this.syncChildList(listName);};/**
 * Called when a key in the storage changes.
 */lib.PreferenceManager.prototype.onStorageChange_=function(map){for(var key in map){if(this.prefix){if(key.lastIndexOf(this.prefix,0)!=0)continue;}var name=key.substr(this.prefix.length);if(!(name in this.prefRecords_)){// Sometimes we'll get notified about prefs that are no longer defined.
continue;}var record=this.prefRecords_[name];var newValue=map[key].newValue;var currentValue=record.currentValue;if(currentValue===record.DEFAULT_VALUE)currentValue=void 0;if(this.diff(currentValue,newValue)){if(typeof newValue=='undefined'||newValue===null){record.currentValue=record.DEFAULT_VALUE;}else{record.currentValue=newValue;}this.notifyChange_(name);}}};// SOURCE FILE: libdot/js/lib_resource.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * Storage for canned resources.
 *
 * These are usually non-JavaScript things that are collected during a build
 * step and converted into a series of 'lib.resource.add(...)' calls.  See
 * the "@resource" directive from libdot/bin/concat.sh for the canonical use
 * case.
 *
 * This is global storage, so you should prefix your resource names to avoid
 * collisions.
 */lib.resource={resources_:{}};/**
 * Add a resource.
 *
 * @param {string} name A name for the resource.  You should prefix this to
 *   avoid collisions with resources from a shared library.
 * @param {string} type A mime type for the resource, or "raw" if not
 *   applicable.
 * @param {*} data The value of the resource.
 */lib.resource.add=function(name,type,data){lib.resource.resources_[name]={type:type,name:name,data:data};};/**
 * Retrieve a resource record.
 *
 * The resource data is stored on the "data" property of the returned object.
 *
 * @param {string} name The name of the resource to get.
 * @param {*} opt_defaultValue The optional value to return if the resource is
 *   not defined.
 * @return {object} An object with "type", "name", and "data" properties.
 */lib.resource.get=function(name,opt_defaultValue){if(!(name in lib.resource.resources_)){if(typeof opt_defaultValue=='undefined')throw'Unknown resource: '+name;return opt_defaultValue;}return lib.resource.resources_[name];};/**
 * Retrieve resource data.
 *
 * @param {string} name The name of the resource to get.
 * @param {*} opt_defaultValue The optional value to return if the resource is
 *   not defined.
 * @return {*} The resource data.
 */lib.resource.getData=function(name,opt_defaultValue){if(!(name in lib.resource.resources_)){if(typeof opt_defaultValue=='undefined')throw'Unknown resource: '+name;return opt_defaultValue;}return lib.resource.resources_[name].data;};/**
 * Retrieve resource as a data: url.
 *
 * @param {string} name The name of the resource to get.
 * @param {*} opt_defaultValue The optional value to return if the resource is
 *   not defined.
 * @return {*} A data: url encoded version of the resource.
 */lib.resource.getDataUrl=function(name,opt_defaultValue){var resource=lib.resource.get(name,opt_defaultValue);return'data:'+resource.type+','+resource.data;};// SOURCE FILE: libdot/js/lib_storage.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * Namespace for implementations of persistent, possibly cloud-backed
 * storage.
 */lib.Storage=new Object();// SOURCE FILE: libdot/js/lib_storage_chrome.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * chrome.storage based class with an async interface that is interchangeable
 * with other lib.Storage.* implementations.
 */lib.Storage.Chrome=function(storage){this.storage_=storage;this.observers_=[];chrome.storage.onChanged.addListener(this.onChanged_.bind(this));};/**
 * Called by the storage implementation when the storage is modified.
 */lib.Storage.Chrome.prototype.onChanged_=function(changes,areaname){if(chrome.storage[areaname]!=this.storage_)return;for(var i=0;i<this.observers_.length;i++){this.observers_[i](changes);}};/**
 * Register a function to observe storage changes.
 *
 * @param {function(map)} callback The function to invoke when the storage
 *     changes.
 */lib.Storage.Chrome.prototype.addObserver=function(callback){this.observers_.push(callback);};/**
 * Unregister a change observer.
 *
 * @param {function} observer A previously registered callback.
 */lib.Storage.Chrome.prototype.removeObserver=function(callback){var i=this.observers_.indexOf(callback);if(i!=-1)this.observers_.splice(i,1);};/**
 * Delete everything in this storage.
 *
 * @param {function(map)} callback The function to invoke when the delete
 *     has completed.
 */lib.Storage.Chrome.prototype.clear=function(opt_callback){this.storage_.clear();if(opt_callback)setTimeout(opt_callback,0);};/**
 * Return the current value of a storage item.
 *
 * @param {string} key The key to look up.
 * @param {function(value) callback The function to invoke when the value has
 *     been retrieved.
 */lib.Storage.Chrome.prototype.getItem=function(key,callback){this.storage_.get(key,callback);};/**
 * Fetch the values of multiple storage items.
 *
 * @param {Array} keys The keys to look up.
 * @param {function(map) callback The function to invoke when the values have
 *     been retrieved.
 */lib.Storage.Chrome.prototype.getItems=function(keys,callback){this.storage_.get(keys,callback);};/**
 * Set a value in storage.
 *
 * @param {string} key The key for the value to be stored.
 * @param {*} value The value to be stored.  Anything that can be serialized
 *     with JSON is acceptable.
 * @param {function()} opt_callback Optional function to invoke when the
 *     set is complete.  You don't have to wait for the set to complete in order
 *     to read the value, since the local cache is updated synchronously.
 */lib.Storage.Chrome.prototype.setItem=function(key,value,opt_callback){var _this2=this;var onComplete=function onComplete(){if(chrome.runtime.lastError){// Doesn't seem to be any better way of handling this.
// https://crbug.com/764759
if(chrome.runtime.lastError.message.indexOf('MAX_WRITE_OPERATIONS')){console.warn('Will retry save of '+key+' after exceeding quota',chrome.runtime.lastError);setTimeout(function(){return _this2.setItem(key,value,onComplete);},1000);return;}else{console.error('Unknown runtime error',chrome.runtime.lastError);}}if(opt_callback)opt_callback();};var obj={};obj[key]=value;this.storage_.set(obj,onComplete);};/**
 * Set multiple values in storage.
 *
 * @param {Object} map A map of key/values to set in storage.
 * @param {function()} opt_callback Optional function to invoke when the
 *     set is complete.  You don't have to wait for the set to complete in order
 *     to read the value, since the local cache is updated synchronously.
 */lib.Storage.Chrome.prototype.setItems=function(obj,opt_callback){this.storage_.set(obj,opt_callback);};/**
 * Remove an item from storage.
 *
 * @param {string} key The key to be removed.
 * @param {function()} opt_callback Optional function to invoke when the
 *     remove is complete.  You don't have to wait for the set to complete in
 *     order to read the value, since the local cache is updated synchronously.
 */lib.Storage.Chrome.prototype.removeItem=function(key,opt_callback){this.storage_.remove(key,opt_callback);};/**
 * Remove multiple items from storage.
 *
 * @param {Array} keys The keys to be removed.
 * @param {function()} opt_callback Optional function to invoke when the
 *     remove is complete.  You don't have to wait for the set to complete in
 *     order to read the value, since the local cache is updated synchronously.
 */lib.Storage.Chrome.prototype.removeItems=function(keys,opt_callback){this.storage_.remove(keys,opt_callback);};// SOURCE FILE: libdot/js/lib_storage_local.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * window.localStorage based class with an async interface that is
 * interchangeable with other lib.Storage.* implementations.
 */lib.Storage.Local=function(){this.observers_=[];this.storage_=window.localStorage;window.addEventListener('storage',this.onStorage_.bind(this));};/**
 * Called by the storage implementation when the storage is modified.
 */lib.Storage.Local.prototype.onStorage_=function(e){if(e.storageArea!=this.storage_)return;// JS throws an exception if JSON.parse is given an empty string. So here we
// only parse if the value is truthy. This mean the empty string, undefined
// and null will not be parsed.
var prevValue=e.oldValue?JSON.parse(e.oldValue):e.oldValue;var curValue=e.newValue?JSON.parse(e.newValue):e.newValue;var o={};o[e.key]={oldValue:prevValue,newValue:curValue};for(var i=0;i<this.observers_.length;i++){this.observers_[i](o);}};/**
 * Register a function to observe storage changes.
 *
 * @param {function(map)} callback The function to invoke when the storage
 *     changes.
 */lib.Storage.Local.prototype.addObserver=function(callback){this.observers_.push(callback);};/**
 * Unregister a change observer.
 *
 * @param {function} observer A previously registered callback.
 */lib.Storage.Local.prototype.removeObserver=function(callback){var i=this.observers_.indexOf(callback);if(i!=-1)this.observers_.splice(i,1);};/**
 * Delete everything in this storage.
 *
 * @param {function(map)} callback The function to invoke when the delete
 *     has completed.
 */lib.Storage.Local.prototype.clear=function(opt_callback){this.storage_.clear();if(opt_callback)setTimeout(opt_callback,0);};/**
 * Return the current value of a storage item.
 *
 * @param {string} key The key to look up.
 * @param {function(value) callback The function to invoke when the value has
 *     been retrieved.
 */lib.Storage.Local.prototype.getItem=function(key,callback){var value=this.storage_.getItem(key);if(typeof value=='string'){try{value=JSON.parse(value);}catch(e){// If we can't parse the value, just return it unparsed.
}}setTimeout(callback.bind(null,value),0);};/**
 * Fetch the values of multiple storage items.
 *
 * @param {Array} keys The keys to look up.
 * @param {function(map) callback The function to invoke when the values have
 *     been retrieved.
 */lib.Storage.Local.prototype.getItems=function(keys,callback){var rv={};for(var i=keys.length-1;i>=0;i--){var key=keys[i];var value=this.storage_.getItem(key);if(typeof value=='string'){try{rv[key]=JSON.parse(value);}catch(e){// If we can't parse the value, just return it unparsed.
rv[key]=value;}}else{keys.splice(i,1);}}setTimeout(callback.bind(null,rv),0);};/**
 * Set a value in storage.
 *
 * @param {string} key The key for the value to be stored.
 * @param {*} value The value to be stored.  Anything that can be serialized
 *     with JSON is acceptable.
 * @param {function()} opt_callback Optional function to invoke when the
 *     set is complete.  You don't have to wait for the set to complete in order
 *     to read the value, since the local cache is updated synchronously.
 */lib.Storage.Local.prototype.setItem=function(key,value,opt_callback){this.storage_.setItem(key,JSON.stringify(value));if(opt_callback)setTimeout(opt_callback,0);};/**
 * Set multiple values in storage.
 *
 * @param {Object} map A map of key/values to set in storage.
 * @param {function()} opt_callback Optional function to invoke when the
 *     set is complete.  You don't have to wait for the set to complete in order
 *     to read the value, since the local cache is updated synchronously.
 */lib.Storage.Local.prototype.setItems=function(obj,opt_callback){for(var key in obj){this.storage_.setItem(key,JSON.stringify(obj[key]));}if(opt_callback)setTimeout(opt_callback,0);};/**
 * Remove an item from storage.
 *
 * @param {string} key The key to be removed.
 * @param {function()} opt_callback Optional function to invoke when the
 *     remove is complete.  You don't have to wait for the set to complete in
 *     order to read the value, since the local cache is updated synchronously.
 */lib.Storage.Local.prototype.removeItem=function(key,opt_callback){this.storage_.removeItem(key);if(opt_callback)setTimeout(opt_callback,0);};/**
 * Remove multiple items from storage.
 *
 * @param {Array} keys The keys to be removed.
 * @param {function()} opt_callback Optional function to invoke when the
 *     remove is complete.  You don't have to wait for the set to complete in
 *     order to read the value, since the local cache is updated synchronously.
 */lib.Storage.Local.prototype.removeItems=function(ary,opt_callback){for(var i=0;i<ary.length;i++){this.storage_.removeItem(ary[i]);}if(opt_callback)setTimeout(opt_callback,0);};// SOURCE FILE: libdot/js/lib_storage_memory.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * In-memory storage class with an async interface that is interchangeable with
 * other lib.Storage.* implementations.
 */lib.Storage.Memory=function(){this.observers_=[];this.storage_={};};/**
 * Register a function to observe storage changes.
 *
 * @param {function(map)} callback The function to invoke when the storage
 *     changes.
 */lib.Storage.Memory.prototype.addObserver=function(callback){this.observers_.push(callback);};/**
 * Unregister a change observer.
 *
 * @param {function} observer A previously registered callback.
 */lib.Storage.Memory.prototype.removeObserver=function(callback){var i=this.observers_.indexOf(callback);if(i!=-1)this.observers_.splice(i,1);};/**
 * Delete everything in this storage.
 *
 * @param {function(map)} callback The function to invoke when the delete
 *     has completed.
 */lib.Storage.Memory.prototype.clear=function(opt_callback){var e={};for(var key in this.storage_){e[key]={oldValue:this.storage_[key],newValue:void 0};}this.storage_={};setTimeout(function(){for(var i=0;i<this.observers_.length;i++){this.observers_[i](e);}}.bind(this),0);if(opt_callback)setTimeout(opt_callback,0);};/**
 * Return the current value of a storage item.
 *
 * @param {string} key The key to look up.
 * @param {function(value) callback The function to invoke when the value has
 *     been retrieved.
 */lib.Storage.Memory.prototype.getItem=function(key,callback){var value=this.storage_[key];if(typeof value=='string'){try{value=JSON.parse(value);}catch(e){// If we can't parse the value, just return it unparsed.
}}setTimeout(callback.bind(null,value),0);};/**
 * Fetch the values of multiple storage items.
 *
 * @param {Array} keys The keys to look up.
 * @param {function(map) callback The function to invoke when the values have
 *     been retrieved.
 */lib.Storage.Memory.prototype.getItems=function(keys,callback){var rv={};for(var i=keys.length-1;i>=0;i--){var key=keys[i];var value=this.storage_[key];if(typeof value=='string'){try{rv[key]=JSON.parse(value);}catch(e){// If we can't parse the value, just return it unparsed.
rv[key]=value;}}else{keys.splice(i,1);}}setTimeout(callback.bind(null,rv),0);};/**
 * Set a value in storage.
 *
 * @param {string} key The key for the value to be stored.
 * @param {*} value The value to be stored.  Anything that can be serialized
 *     with JSON is acceptable.
 * @param {function()} opt_callback Optional function to invoke when the
 *     set is complete.  You don't have to wait for the set to complete in order
 *     to read the value, since the local cache is updated synchronously.
 */lib.Storage.Memory.prototype.setItem=function(key,value,opt_callback){var oldValue=this.storage_[key];this.storage_[key]=JSON.stringify(value);var e={};e[key]={oldValue:oldValue,newValue:value};setTimeout(function(){for(var i=0;i<this.observers_.length;i++){this.observers_[i](e);}}.bind(this),0);if(opt_callback)setTimeout(opt_callback,0);};/**
 * Set multiple values in storage.
 *
 * @param {Object} map A map of key/values to set in storage.
 * @param {function()} opt_callback Optional function to invoke when the
 *     set is complete.  You don't have to wait for the set to complete in order
 *     to read the value, since the local cache is updated synchronously.
 */lib.Storage.Memory.prototype.setItems=function(obj,opt_callback){var e={};for(var key in obj){e[key]={oldValue:this.storage_[key],newValue:obj[key]};this.storage_[key]=JSON.stringify(obj[key]);}setTimeout(function(){for(var i=0;i<this.observers_.length;i++){this.observers_[i](e);}}.bind(this));if(opt_callback)setTimeout(opt_callback,0);};/**
 * Remove an item from storage.
 *
 * @param {string} key The key to be removed.
 * @param {function()} opt_callback Optional function to invoke when the
 *     remove is complete.  You don't have to wait for the set to complete in
 *     order to read the value, since the local cache is updated synchronously.
 */lib.Storage.Memory.prototype.removeItem=function(key,opt_callback){delete this.storage_[key];if(opt_callback)setTimeout(opt_callback,0);};/**
 * Remove multiple items from storage.
 *
 * @param {Array} keys The keys to be removed.
 * @param {function()} opt_callback Optional function to invoke when the
 *     remove is complete.  You don't have to wait for the set to complete in
 *     order to read the value, since the local cache is updated synchronously.
 */lib.Storage.Memory.prototype.removeItems=function(ary,opt_callback){for(var i=0;i<ary.length;i++){delete this.storage_[ary[i]];}if(opt_callback)setTimeout(opt_callback,0);};// SOURCE FILE: libdot/js/lib_test_manager.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * @fileoverview JavaScript unit testing framework for synchronous and
 *     asynchronous tests.
 *
 * This file contains the lib.TestManager and related classes.  At the moment
 * it's all collected in a single file since it's reasonably small
 * (=~1k lines), and it's a lot easier to include one file into your test
 * harness than it is to include seven.
 *
 * The following classes are defined...
 *
 *   lib.TestManager - The root class and entrypoint for creating test runs.
 *   lib.TestManager.Log - Logging service.
 *   lib.TestManager.Suite - A collection of tests.
 *   lib.TestManager.Test - A single test.
 *   lib.TestManager.TestRun - Manages the execution of a set of tests.
 *   lib.TestManager.Result - A single test result.
 *//**
 * Root object in the unit test hierarchy, and keeper of the log object.
 *
 * @param {lib.TestManager.Log} opt_log Optional lib.TestManager.Log object.
 *     Logs to the JavaScript console if omitted.
 */lib.TestManager=function(opt_log){this.log=opt_log||new lib.TestManager.Log();};/**
 * Create a new test run object for this test manager.
 *
 * @param {Object} opt_cx An object to be passed to test suite setup(),
 *     preamble(), and test cases during this test run.  This object is opaque
 *     to lib.TestManager.* code.  It's entirely up to the test suite what it's
 *     used for.
 */lib.TestManager.prototype.createTestRun=function(opt_cx){return new lib.TestManager.TestRun(this,opt_cx);};/**
 * Called when a test run associated with this test manager completes.
 *
 * Clients may override this to call an appropriate function.
 */lib.TestManager.prototype.onTestRunComplete=function(testRun){};/**
 * Called before a test associated with this test manager is run.
 *
 * @param {lib.TestManager.Result} result The result object for the upcoming
 *     test.
 * @param {Object} cx The context object for a test run.
 */lib.TestManager.prototype.testPreamble=function(result,cx){};/**
 * Called after a test associated with this test manager finishes.
 *
 * @param {lib.TestManager.Result} result The result object for the finished
 *     test.
 * @param {Object} cx The context object for a test run.
 */lib.TestManager.prototype.testPostamble=function(result,cx){};/**
 * Destination for test case output.
 *
 * Thw API will be the same as the console object.  e.g. We support info(),
 * warn(), error(), etc... just like console.info(), etc...
 *
 * @param {Object} opt_console The console object to route all logging through.
 *     Should provide saome API as the standard console API.
 */lib.TestManager.Log=function(){var _this3=this;var opt_console=arguments.length>0&&arguments[0]!==undefined?arguments[0]:console;this.save=false;this.data='';this.prefix_='';this.prefixStack_=0;// Capture all the console entry points in case code at runtime calls these
// directly.  We want to be able to still see things.
// We also expose the direct API to our callers (e.g. we provide warn()).
this.console_=opt_console;['log','debug','info','warn','error'].forEach(function(level){var msgPrefix='';switch(level){case'debug':case'warn':case'error':msgPrefix=level.toUpperCase()+': ';break;}var oLog=_this3.console_[level];_this3[level]=_this3.console_[level]=function(){for(var _len2=arguments.length,args=Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2];}if(_this3.save)_this3.data+=_this3.prefix_+msgPrefix+args.join(' ')+'\n';oLog.apply(_this3.console_,args);};});// Wrap/bind the group functions.
['group','groupCollapsed'].forEach(function(group){var oGroup=_this3.console_[group];_this3[group]=_this3.console_[group]=function(){var label=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'';oGroup(label);if(_this3.save)_this3.data+=_this3.prefix_+label+'\n';_this3.prefix_='  '.repeat(++_this3.prefixStack_);};});var oGroupEnd=this.console_.groupEnd;this.groupEnd=this.console_.groupEnd=function(){oGroupEnd();_this3.prefix_='  '.repeat(--_this3.prefixStack_);};};/**
 * Returns a new constructor function that will inherit from
 * lib.TestManager.Suite.
 *
 * Use this function to create a new test suite subclass.  It will return a
 * properly initialized constructor function for the subclass.  You can then
 * override the setup() and preamble() methods if necessary and add test cases
 * to the subclass.
 *
 *   var MyTests = new lib.TestManager.Suite('MyTests');
 *
 *   MyTests.prototype.setup = function(cx) {
 *     // Sets this.size to cx.size if it exists, or the default value of 10
 *     // if not.
 *     this.setDefault(cx, {size: 10});
 *   };
 *
 *   MyTests.prototype.preamble = function(result, cx) {
 *     // Some tests (even successful ones) may side-effect this list, so
 *     // recreate it before every test.
 *     this.list = [];
 *     for (var i = 0; i < this.size; i++) {
 *       this.list[i] = i;
 *     }
 *   };
 *
 *   // Basic synchronous test case.
 *   MyTests.addTest('pop-length', function(result, cx) {
 *       this.list.pop();
 *
 *       // If this assertion fails, the testcase will stop here.
 *       result.assertEQ(this.list.length, this.size - 1);
 *
 *       // A test must indicate it has passed by calling this method.
 *       result.pass();
 *     });
 *
 *   // Sample asynchronous test case.
 *   MyTests.addTest('async-pop-length', function(result, cx) {
 *       var callback = () => {
 *           result.assertEQ(this.list.length, this.size - 1);
 *           result.pass();
 *       };
 *
 *       // Wait 100ms to check the array length for the sake of this example.
 *       setTimeout(callback, 100);
 *
 *       this.list.pop();
 *
 *       // Indicate that this test needs another 200ms to complete.
 *       // If the test does not report pass/fail by then, it is considered to
 *       // have timed out.
 *       result.requestTime(200);
 *     });
 *
 *   ...
 *
 * @param {string} suiteName The name of the test suite.
 */lib.TestManager.Suite=function(suiteName){function ctor(testManager,cx){this.testManager_=testManager;this.suiteName=suiteName;this.setup(cx);}ctor.suiteName=suiteName;ctor.addTest=lib.TestManager.Suite.addTest;ctor.disableTest=lib.TestManager.Suite.disableTest;ctor.getTest=lib.TestManager.Suite.getTest;ctor.getTestList=lib.TestManager.Suite.getTestList;ctor.testList_=[];ctor.testMap_={};ctor.prototype=Object.create(lib.TestManager.Suite.prototype);ctor.constructor=lib.TestManager.Suite;lib.TestManager.Suite.subclasses.push(ctor);return ctor;};/**
 * List of lib.TestManager.Suite subclasses, in the order they were defined.
 */lib.TestManager.Suite.subclasses=[];/**
 * Add a test to a lib.TestManager.Suite.
 *
 * This method is copied to new subclasses when they are created.
 */lib.TestManager.Suite.addTest=function(testName,testFunction){if(testName in this.testMap_)throw'Duplicate test name: '+testName;var test=new lib.TestManager.Test(this,testName,testFunction);this.testMap_[testName]=test;this.testList_.push(test);};/**
 * Defines a disabled test.
 */lib.TestManager.Suite.disableTest=function(testName,testFunction){if(testName in this.testMap_)throw'Duplicate test name: '+testName;var test=new lib.TestManager.Test(this,testName,testFunction);console.log('Disabled test: '+test.fullName);};/**
 * Get a lib.TestManager.Test instance by name.
 *
 * This method is copied to new subclasses when they are created.
 *
 * @param {string} testName The name of the desired test.
 * @return {lib.TestManager.Test} The requested test, or undefined if it was not
 *     found.
 */lib.TestManager.Suite.getTest=function(testName){return this.testMap_[testName];};/**
 * Get an array of lib.TestManager.Tests associated with this Suite.
 *
 * This method is copied to new subclasses when they are created.
 */lib.TestManager.Suite.getTestList=function(){return this.testList_;};/**
 * Set properties on a test suite instance, pulling the property value from
 * the context if it exists and from the defaults dictionary if not.
 *
 * This is intended to be used in your test suite's setup() method to
 * define parameters for the test suite which may be overridden through the
 * context object.  For example...
 *
 *   MySuite.prototype.setup = function(cx) {
 *     this.setDefaults(cx, {size: 10});
 *   };
 *
 * If the context object has a 'size' property then this.size will be set to
 * the value of cx.size, otherwise this.size will get a default value of 10.
 *
 * @param {Object} cx The context object for a test run.
 * @param {Object} defaults An object containing name/value pairs to set on
 *     this test suite instance.  The value listed here will be used if the
 *     name is not defined on the context object.
 */lib.TestManager.Suite.prototype.setDefaults=function(cx,defaults){for(var k in defaults){this[k]=k in cx?cx[k]:defaults[k];}};/**
 * Subclassable method called to set up the test suite.
 *
 * The default implementation of this method is a no-op.  If your test suite
 * requires some kind of suite-wide setup, this is the place to do it.
 *
 * It's fine to store state on the test suite instance, that state will be
 * accessible to all tests in the suite.  If any test case fails, the entire
 * test suite object will be discarded and a new one will be created for
 * the remaining tests.
 *
 * Any side effects outside of this test suite instance must be idempotent.
 * For example, if you're adding DOM nodes to a document, make sure to first
 * test that they're not already there.  If they are, remove them rather than
 * reuse them.  You should not count on their state, since they were probably
 * left behind by a failed testcase.
 *
 * Any exception here will abort the remainder of the test run.
 *
 * @param {Object} cx The context object for a test run.
 */lib.TestManager.Suite.prototype.setup=function(cx){};/**
 * Subclassable method called to do pre-test set up.
 *
 * The default implementation of this method is a no-op.  If your test suite
 * requires some kind of pre-test setup, this is the place to do it.
 *
 * This can be used to avoid a bunch of boilerplate setup/teardown code in
 * this suite's testcases.
 *
 * Any exception here will abort the remainder of the test run.
 *
 * @param {lib.TestManager.Result} result The result object for the upcoming
 *     test.
 * @param {Object} cx The context object for a test run.
 */lib.TestManager.Suite.prototype.preamble=function(result,cx){};/**
 * Subclassable method called to do post-test tear-down.
 *
 * The default implementation of this method is a no-op.  If your test suite
 * requires some kind of pre-test setup, this is the place to do it.
 *
 * This can be used to avoid a bunch of boilerplate setup/teardown code in
 * this suite's testcases.
 *
 * Any exception here will abort the remainder of the test run.
 *
 * @param {lib.TestManager.Result} result The result object for the finished
 *     test.
 * @param {Object} cx The context object for a test run.
 */lib.TestManager.Suite.prototype.postamble=function(result,cx){};/**
 * Object representing a single test in a test suite.
 *
 * These are created as part of the lib.TestManager.Suite.addTest() method.
 * You should never have to construct one by hand.
 *
 * @param {lib.TestManager.Suite} suiteClass The test suite class containing
 *     this test.
 * @param {string} testName The local name of this test case, not including the
 *     test suite name.
 * @param {function(lib.TestManager.Result, Object)} testFunction The function
 *     to invoke for this test case.  This is passed a Result instance and the
 *     context object associated with the test run.
 *
 */lib.TestManager.Test=function(suiteClass,testName,testFunction){/**
   * The test suite class containing this function.
   */this.suiteClass=suiteClass;/**
   * The local name of this test, not including the test suite name.
   */this.testName=testName;/**
   * The global name of this test, including the test suite name.
   */this.fullName=suiteClass.suiteName+'['+testName+']';// The function to call for this test.
this.testFunction_=testFunction;};/**
 * Execute this test.
 *
 * This is called by a lib.TestManager.Result instance, as part of a
 * lib.TestManager.TestRun.  You should not call it by hand.
 *
 * @param {lib.TestManager.Result} result The result object for the test.
 */lib.TestManager.Test.prototype.run=function(result){try{// Tests are applied to the parent lib.TestManager.Suite subclass.
this.testFunction_.apply(result.suite,[result,result.testRun.cx]);}catch(ex){if(ex instanceof lib.TestManager.Result.TestComplete)return;result.println('Test raised an exception: '+ex);if(ex.stack){if(ex.stack instanceof Array){result.println(ex.stack.join('\n'));}else{result.println(ex.stack);}}result.completeTest_(result.FAILED,false);}};/**
 * Used to choose a set of tests and run them.
 *
 * It's slightly more convenient to construct one of these from
 * lib.TestManager.prototype.createTestRun().
 *
 * @param {lib.TestManager} testManager The testManager associated with this
 *     TestRun.
 * @param {Object} cx A context to be passed into the tests.  This can be used
 *     to set parameters for the test suite or individual test cases.
 */lib.TestManager.TestRun=function(testManager,cx){/**
   * The associated lib.TestManager instance.
   */this.testManager=testManager;/**
   * Shortcut to the lib.TestManager's log.
   */this.log=testManager.log;/**
   * The test run context.  It's entirely up to the test suite and test cases
   * how this is used.  It is opaque to lib.TestManager.* classes.
   */this.cx=cx||{};/**
   * The list of test cases that encountered failures.
   */this.failures=[];/**
   * The list of test cases that passed.
   */this.passes=[];/**
   * The time the test run started, or null if it hasn't been started yet.
   */this.startDate=null;/**
   * The time in milliseconds that the test run took to complete, or null if
   * it hasn't completed yet.
   */this.duration=null;/**
   * The most recent result object, or null if the test run hasn't started
   * yet.  In order to detect late failures, this is not cleared when the test
   * completes.
   */this.currentResult=null;/**
   * Number of maximum failures.  The test run will stop when this number is
   * reached.  If 0 or omitted, the entire set of selected tests is run, even
   * if some fail.
   */this.maxFailures=0;/**
   * True if this test run ended early because of an unexpected condition.
   */this.panic=false;// List of pending test cases.
this.testQueue_=[];};/**
 * This value can be passed to select() to indicate that all tests should
 * be selected.
 */lib.TestManager.TestRun.prototype.ALL_TESTS=lib.f.createEnum('<all-tests>');/**
 * Add a single test to the test run.
 */lib.TestManager.TestRun.prototype.selectTest=function(test){this.testQueue_.push(test);};lib.TestManager.TestRun.prototype.selectSuite=function(suiteClass,opt_pattern){var pattern=opt_pattern||this.ALL_TESTS;var selectCount=0;var testList=suiteClass.getTestList();for(var j=0;j<testList.length;j++){var test=testList[j];// Note that we're using "!==" rather than "!=" so that we're matching
// the ALL_TESTS String object, rather than the contents of the string.
if(pattern!==this.ALL_TESTS){if(pattern instanceof RegExp){if(!pattern.test(test.testName))continue;}else if(test.testName!=pattern){continue;}}this.selectTest(test);selectCount++;}return selectCount;};/**
 * Selects one or more tests to gather results for.
 *
 * Selecting the same test more than once is allowed.
 *
 * @param {string|RegExp} pattern Pattern used to select tests.
 *     If TestRun.prototype.ALL_TESTS, all tests are selected.
 *     If a string, only the test that exactly matches is selected.
 *     If a RegExp, only tests matching the RegExp are added.
 *
 * @return {int} The number of additional tests that have been selected into
 *     this TestRun.
 */lib.TestManager.TestRun.prototype.selectPattern=function(pattern){var selectCount=0;for(var i=0;i<lib.TestManager.Suite.subclasses.length;i++){selectCount+=this.selectSuite(lib.TestManager.Suite.subclasses[i],pattern);}if(!selectCount){this.log.warn('No tests matched selection criteria: '+pattern);}return selectCount;};/**
 * Hooked up to window.onerror during a test run in order to catch exceptions
 * that would otherwise go uncaught.
 */lib.TestManager.TestRun.prototype.onUncaughtException_=function(message,file,line){if(message.indexOf('Uncaught lib.TestManager.Result.TestComplete')==0||message.indexOf('status: passed')!=-1){// This is a result.pass() or result.fail() call from a callback.  We're
// already going to deal with it as part of the completeTest_() call
// that raised it.  We can safely squelch this error message.
return true;}if(!this.currentResult)return;if(message=='Uncaught '+this.currentResult.expectedErrorMessage_){// Test cases may need to raise an unhandled exception as part of the test.
return;}var when='during';if(this.currentResult.status!=this.currentResult.PENDING)when='after';this.log.error('Uncaught exception '+when+' test case: '+this.currentResult.test.fullName);this.log.error(message+', '+file+':'+line);this.currentResult.completeTest_(this.currentResult.FAILED,false);return false;};/**
 * Called to when this test run has completed.
 *
 * This method typically re-runs itself asynchronously, in order to let the
 * DOM stabilize and short-term timeouts to complete before declaring the
 * test run complete.
 *
 * @param {boolean} opt_skipTimeout If true, the timeout is skipped and the
 *     test run is completed immediately.  This should only be used from within
 *     this function.
 */lib.TestManager.TestRun.prototype.onTestRunComplete_=function(opt_skipTimeout){if(!opt_skipTimeout){// The final test may have left a lingering setTimeout(..., 0), or maybe
// poked at the DOM in a way that will trigger a event to fire at the end
// of this stack, so we give things a chance to settle down before our
// final cleanup...
setTimeout(this.onTestRunComplete_.bind(this),0,true);return;}this.duration=new Date()-this.startDate;this.log.groupEnd();this.log.info(this.passes.length+' passed, '+this.failures.length+' failed, '+this.msToSeconds_(this.duration));this.summarize();window.onerror=null;this.testManager.onTestRunComplete(this);};/**
 * Called by the lib.TestManager.Result object when a test completes.
 *
 * @param {lib.TestManager.Result} result The result object which has just
 *     completed.
 */lib.TestManager.TestRun.prototype.onResultComplete=function(result){try{this.testManager.testPostamble(result,this.cx);result.suite.postamble(result,this.ctx);}catch(ex){this.log.error('Unexpected exception in postamble: '+(ex.stack?ex.stack:ex));this.panic=true;}if(result.status!=result.PASSED)this.log.error(result.status);else if(result.duration>500)this.log.warn('Slow test took '+this.msToSeconds_(result.duration));this.log.groupEnd();if(result.status==result.FAILED){this.failures.push(result);this.currentSuite=null;}else if(result.status==result.PASSED){this.passes.push(result);}else{this.log.error('Unknown result status: '+result.test.fullName+': '+result.status);this.panic=true;return;}this.runNextTest_();};/**
 * Called by the lib.TestManager.Result object when a test which has already
 * completed reports another completion.
 *
 * This is usually indicative of a buggy testcase.  It is probably reporting a
 * result on exit and then again from an asynchronous callback.
 *
 * It may also be the case that the last act of the testcase causes a DOM change
 * which triggers some event to run after the test returns.  If the event
 * handler reports a failure or raises an uncaught exception, the test will
 * fail even though it has already completed.
 *
 * In any case, re-completing a test ALWAYS moves it into the failure pile.
 *
 * @param {lib.TestManager.Result} result The result object which has just
 *     completed.
 * @param {string} lateStatus The status that the test attempted to record this
 *     time around.
 */lib.TestManager.TestRun.prototype.onResultReComplete=function(result,lateStatus){this.log.error('Late complete for test: '+result.test.fullName+': '+lateStatus);// Consider any late completion a failure, even if it's a double-pass, since
// it's a misuse of the testing API.
var index=this.passes.indexOf(result);if(index>=0){this.passes.splice(index,1);this.failures.push(result);}};/**
 * Run the next test in the queue.
 */lib.TestManager.TestRun.prototype.runNextTest_=function(){if(this.panic||!this.testQueue_.length){this.onTestRunComplete_();return;}if(this.maxFailures&&this.failures.length>=this.maxFailures){this.log.error('Maximum failure count reached, aborting test run.');this.onTestRunComplete_();return;}// Peek at the top test first.  We remove it later just before it's about
// to run, so that we don't disturb the incomplete test count in the
// event that we fail before running it.
var test=this.testQueue_[0];var suite=this.currentResult?this.currentResult.suite:null;try{if(!suite||!(suite instanceof test.suiteClass)){if(suite)this.log.groupEnd();this.log.group(test.suiteClass.suiteName);suite=new test.suiteClass(this.testManager,this.cx);}}catch(ex){// If test suite setup fails we're not even going to try to run the tests.
this.log.error('Exception during setup: '+(ex.stack?ex.stack:ex));this.panic=true;this.onTestRunComplete_();return;}try{this.log.group(test.testName);this.currentResult=new lib.TestManager.Result(this,suite,test);this.testManager.testPreamble(this.currentResult,this.cx);suite.preamble(this.currentResult,this.cx);this.testQueue_.shift();}catch(ex){this.log.error('Unexpected exception during test preamble: '+(ex.stack?ex.stack:ex));this.log.groupEnd();this.panic=true;this.onTestRunComplete_();return;}try{this.currentResult.run();}catch(ex){// Result.run() should catch test exceptions and turn them into failures.
// If we got here, it means there is trouble in the testing framework.
this.log.error('Unexpected exception during test run: '+(ex.stack?ex.stack:ex));this.panic=true;}};/**
 * Run the selected list of tests.
 *
 * Some tests may need to run asynchronously, so you cannot assume the run is
 * complete when this function returns.  Instead, pass in a function to be
 * called back when the run has completed.
 *
 * This function will log the results of the test run as they happen into the
 * log defined by the associated lib.TestManager.  By default this is
 * console.log, which can be viewed in the JavaScript console of most browsers.
 *
 * The browser state is determined by the last test to run.  We intentionally
 * don't do any cleanup so that you can inspect the state of a failed test, or
 * leave the browser ready for manual testing.
 *
 * Any failures in lib.TestManager.* code or test suite setup or test case
 * preamble will cause the test run to abort.
 */lib.TestManager.TestRun.prototype.run=function(){this.log.info('Running '+this.testQueue_.length+' test(s)');window.onerror=this.onUncaughtException_.bind(this);this.startDate=new Date();this.runNextTest_();};/**
 * Format milliseconds as fractional seconds.
 */lib.TestManager.TestRun.prototype.msToSeconds_=function(ms){var secs=(ms/1000).toFixed(2);return secs+'s';};/**
 * Log the current result summary.
 */lib.TestManager.TestRun.prototype.summarize=function(){if(this.failures.length){for(var i=0;i<this.failures.length;i++){this.log.error('FAILED: '+this.failures[i].test.fullName);}}if(this.testQueue_.length){this.log.warn('Test run incomplete: '+this.testQueue_.length+' test(s) were not run.');}};/**
 * Record of the result of a single test.
 *
 * These are constructed during a test run, you shouldn't have to make one
 * on your own.
 *
 * An instance of this class is passed in to each test function.  It can be
 * used to add messages to the test log, to record a test pass/fail state, to
 * test assertions, or to create exception-proof wrappers for callback
 * functions.
 *
 * @param {lib.TestManager.TestRun} testRun The TestRun instance associated with
 *     this result.
 * @param {lib.TestManager.Suit} suite The Suite containing the test we're
 *     collecting this result for.
 * @param {lib.TestManager.Test} test The test we're collecting this result for.
 */lib.TestManager.Result=function(testRun,suite,test){/**
   * The TestRun instance associated with this result.
   */this.testRun=testRun;/**
   * The Suite containing the test we're collecting this result for.
   */this.suite=suite;/**
   * The test we're collecting this result for.
   */this.test=test;/**
   * The time we started to collect this result, or null if we haven't started.
   */this.startDate=null;/**
   * The time in milliseconds that the test took to complete, or null if
   * it hasn't completed yet.
   */this.duration=null;/**
   * The current status of this test result.
   */this.status=this.PENDING;// An error message that the test case is expected to generate.
this.expectedErrorMessage_=null;};/**
 * Possible values for this.status.
 */lib.TestManager.Result.prototype.PENDING='pending';lib.TestManager.Result.prototype.FAILED='FAILED';lib.TestManager.Result.prototype.PASSED='passed';/**
 * Exception thrown when a test completes (pass or fail), to ensure no more of
 * the test is run.
 */lib.TestManager.Result.TestComplete=function(result){this.result=result;};lib.TestManager.Result.TestComplete.prototype.toString=function(){return'lib.TestManager.Result.TestComplete: '+this.result.test.fullName+', status: '+this.result.status;};/**
 * Start the test associated with this result.
 */lib.TestManager.Result.prototype.run=function(){this.startDate=new Date();this.test.run(this);if(this.status==this.PENDING&&!this.timeout_){this.println('Test did not return a value and did not request more time.');this.completeTest_(this.FAILED,false);}};/**
 * Unhandled error message this test expects to generate.
 *
 * This must be the exact string that would appear in the JavaScript console,
 * minus the 'Uncaught ' prefix.
 *
 * The test case does *not* automatically fail if the error message is not
 * encountered.
 */lib.TestManager.Result.prototype.expectErrorMessage=function(str){this.expectedErrorMessage_=str;};/**
 * Function called when a test times out.
 */lib.TestManager.Result.prototype.onTimeout_=function(){this.timeout_=null;if(this.status!=this.PENDING)return;this.println('Test timed out.');this.completeTest_(this.FAILED,false);};/**
 * Indicate that a test case needs more time to complete.
 *
 * Before a test case returns it must report a pass/fail result, or request more
 * time to do so.
 *
 * If a test does not report pass/fail before the time expires it will
 * be reported as a timeout failure.  Any late pass/fails will be noted in the
 * test log, but will not affect the final result of the test.
 *
 * Test cases may call requestTime more than once.  If you have a few layers
 * of asynchronous API to go through, you should call this once per layer with
 * an estimate of how long each callback will take to complete.
 *
 * @param {int} ms Number of milliseconds requested.
 */lib.TestManager.Result.prototype.requestTime=function(ms){if(this.timeout_)clearTimeout(this.timeout_);this.timeout_=setTimeout(this.onTimeout_.bind(this),ms);};/**
 * Report the completion of a test.
 *
 * @param {string} status The status of the test case.
 * @param {boolean} opt_throw Optional boolean indicating whether or not
 *     to throw the TestComplete exception.
 */lib.TestManager.Result.prototype.completeTest_=function(status,opt_throw){if(this.status==this.PENDING){this.duration=new Date()-this.startDate;this.status=status;this.testRun.onResultComplete(this);}else{this.testRun.onResultReComplete(this,status);}if(arguments.length<2||opt_throw)throw new lib.TestManager.Result.TestComplete(this);};/**
 * Assert that an actual value is exactly equal to the expected value.
 *
 * This uses the JavaScript '===' operator in order to avoid type coercion.
 *
 * If the assertion fails, the test is marked as a failure and a TestCompleted
 * exception is thrown.
 *
 * @param {*} actual The actual measured value.
 * @param {*} expected The value expected.
 * @param {string} opt_name An optional name used to identify this
 *     assertion in the test log.  If omitted it will be the file:line
 *     of the caller.
 */lib.TestManager.Result.prototype.assertEQ=function(actual,expected,opt_name){// Utility function to pretty up the log.
function format(value){if(typeof value=='number')return value;var str=String(value);var ary=str.split('\n').map(function(e){return JSON.stringify(e);});if(ary.length>1){// If the string has newlines, start it off on its own line so that
// it's easier to compare against another string with newlines.
return'\n'+ary.join('\n');}else{return ary.join('\n');}}if(actual===expected)return;// Deal with common object types since JavaScript can't.
if(expected instanceof Array)if(lib.array.compare(actual,expected))return;var name=opt_name?'['+opt_name+']':'';this.fail('assertEQ'+name+': '+this.getCallerLocation_(1)+': '+format(actual)+' !== '+format(expected));};/**
 * Assert that a value is true.
 *
 * This uses the JavaScript '===' operator in order to avoid type coercion.
 * The must be the boolean value `true`, not just some "truish" value.
 *
 * If the assertion fails, the test is marked as a failure and a TestCompleted
 * exception is thrown.
 *
 * @param {boolean} actual The actual measured value.
 * @param {string} opt_name An optional name used to identify this
 *     assertion in the test log.  If omitted it will be the file:line
 *     of the caller.
 */lib.TestManager.Result.prototype.assert=function(actual,opt_name){if(actual===true)return;var name=opt_name?'['+opt_name+']':'';this.fail('assert'+name+': '+this.getCallerLocation_(1)+': '+String(actual));};/**
 * Return the filename:line of a calling stack frame.
 *
 * This uses a dirty hack.  It throws an exception, catches it, and examines
 * the stack property of the caught exception.
 *
 * @param {int} frameIndex The stack frame to return.  0 is the frame that
 *     called this method, 1 is its caller, and so on.
 * @return {string} A string of the format "filename:linenumber".
 */lib.TestManager.Result.prototype.getCallerLocation_=function(frameIndex){try{throw new Error();}catch(ex){var frame=ex.stack.split('\n')[frameIndex+2];var ary=frame.match(/([^/]+:\d+):\d+\)?$/);return ary?ary[1]:'???';}};/**
 * Write a message to the result log.
 */lib.TestManager.Result.prototype.println=function(message){this.testRun.log.info(message);};/**
 * Mark a failed test and exit out of the rest of the test.
 *
 * This will throw a TestCompleted exception, causing the current test to stop.
 *
 * @param {string} opt_message Optional message to add to the log.
 */lib.TestManager.Result.prototype.fail=function(opt_message){if(arguments.length)this.println(opt_message);this.completeTest_(this.FAILED,true);};/**
 * Mark a passed test and exit out of the rest of the test.
 *
 * This will throw a TestCompleted exception, causing the current test to stop.
 */lib.TestManager.Result.prototype.pass=function(){this.completeTest_(this.PASSED,true);};// SOURCE FILE: libdot/js/lib_utf8.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';// TODO(davidben): When the string encoding API is implemented,
// replace this with the native in-browser implementation.
//
// https://wiki.whatwg.org/wiki/StringEncoding
// https://encoding.spec.whatwg.org/
/**
 * A stateful UTF-8 decoder.
 */lib.UTF8Decoder=function(){// The number of bytes left in the current sequence.
this.bytesLeft=0;// The in-progress code point being decoded, if bytesLeft > 0.
this.codePoint=0;// The lower bound on the final code point, if bytesLeft > 0.
this.lowerBound=0;};/**
 * Decodes a some UTF-8 data, taking into account state from previous
 * data streamed through the encoder.
 *
 * @param {String} str data to decode, represented as a JavaScript
 *     String with each code unit representing a byte between 0x00 to
 *     0xFF.
 * @return {String} The data decoded into a JavaScript UTF-16 string.
 */lib.UTF8Decoder.prototype.decode=function(str){var ret='';for(var i=0;i<str.length;i++){var c=str.charCodeAt(i);if(this.bytesLeft==0){if(c<=0x7F){ret+=str.charAt(i);}else if(0xC0<=c&&c<=0xDF){this.codePoint=c-0xC0;this.bytesLeft=1;this.lowerBound=0x80;}else if(0xE0<=c&&c<=0xEF){this.codePoint=c-0xE0;this.bytesLeft=2;this.lowerBound=0x800;}else if(0xF0<=c&&c<=0xF7){this.codePoint=c-0xF0;this.bytesLeft=3;this.lowerBound=0x10000;}else if(0xF8<=c&&c<=0xFB){this.codePoint=c-0xF8;this.bytesLeft=4;this.lowerBound=0x200000;}else if(0xFC<=c&&c<=0xFD){this.codePoint=c-0xFC;this.bytesLeft=5;this.lowerBound=0x4000000;}else{ret+='\uFFFD';}}else{if(0x80<=c&&c<=0xBF){this.bytesLeft--;this.codePoint=(this.codePoint<<6)+(c-0x80);if(this.bytesLeft==0){// Got a full sequence. Check if it's within bounds and
// filter out surrogate pairs.
var codePoint=this.codePoint;if(codePoint<this.lowerBound||0xD800<=codePoint&&codePoint<=0xDFFF||codePoint>0x10FFFF){ret+='\uFFFD';}else{// Encode as UTF-16 in the output.
if(codePoint<0x10000){ret+=String.fromCharCode(codePoint);}else{// Surrogate pair.
codePoint-=0x10000;ret+=String.fromCharCode(0xD800+(codePoint>>>10&0x3FF),0xDC00+(codePoint&0x3FF));}}}}else{// Too few bytes in multi-byte sequence. Rewind stream so we
// don't lose the next byte.
ret+='\uFFFD';this.bytesLeft=0;i--;}}}return ret;};/**
 * Decodes UTF-8 data. This is a convenience function for when all the
 * data is already known.
 *
 * @param {String} str data to decode, represented as a JavaScript
 *     String with each code unit representing a byte between 0x00 to
 *     0xFF.
 * @return {String} The data decoded into a JavaScript UTF-16 string.
 */lib.decodeUTF8=function(utf8){return new lib.UTF8Decoder().decode(utf8);};/**
 * Encodes a UTF-16 string into UTF-8.
 *
 * TODO(davidben): Do we need a stateful version of this that can
 * handle a surrogate pair split in two calls? What happens if a
 * keypress event would have contained a character outside the BMP?
 *
 * @param {String} str The string to encode.
 * @return {String} The string encoded as UTF-8, as a JavaScript
 *     string with bytes represented as code units from 0x00 to 0xFF.
 */lib.encodeUTF8=function(str){var ret='';for(var i=0;i<str.length;i++){// Get a unicode code point out of str.
var c=str.charCodeAt(i);if(0xDC00<=c&&c<=0xDFFF){c=0xFFFD;}else if(0xD800<=c&&c<=0xDBFF){if(i+1<str.length){var d=str.charCodeAt(i+1);if(0xDC00<=d&&d<=0xDFFF){// Swallow a surrogate pair.
c=0x10000+((c&0x3FF)<<10)+(d&0x3FF);i++;}else{c=0xFFFD;}}else{c=0xFFFD;}}// Encode c in UTF-8.
var bytesLeft;if(c<=0x7F){ret+=str.charAt(i);continue;}else if(c<=0x7FF){ret+=String.fromCharCode(0xC0|c>>>6);bytesLeft=1;}else if(c<=0xFFFF){ret+=String.fromCharCode(0xE0|c>>>12);bytesLeft=2;}else/* if (c <= 0x10FFFF) */{ret+=String.fromCharCode(0xF0|c>>>18);bytesLeft=3;}while(bytesLeft>0){bytesLeft--;ret+=String.fromCharCode(0x80|c>>>6*bytesLeft&0x3F);}}return ret;};// SOURCE FILE: libdot/third_party/wcwidth/lib_wc.js
// Copyright (c) 2014 The Chromium OS Authors. All rights reserved.
// Use of lib.wc source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * This JavaScript library is ported from the wcwidth.js module of node.js.
 * The original implementation can be found at:
 * https://npmjs.org/package/wcwidth.js
 *//**
 * JavaScript porting of Markus Kuhn's wcwidth() implementation
 *
 * The following explanation comes from the original C implementation:
 *
 * This is an implementation of wcwidth() and wcswidth() (defined in
 * IEEE Std 1002.1-2001) for Unicode.
 *
 * http://www.opengroup.org/onlinepubs/007904975/functions/wcwidth.html
 * http://www.opengroup.org/onlinepubs/007904975/functions/wcswidth.html
 *
 * In fixed-width output devices, Latin characters all occupy a single
 * "cell" position of equal width, whereas ideographic CJK characters
 * occupy two such cells. Interoperability between terminal-line
 * applications and (teletype-style) character terminals using the
 * UTF-8 encoding requires agreement on which character should advance
 * the cursor by how many cell positions. No established formal
 * standards exist at present on which Unicode character shall occupy
 * how many cell positions on character terminals. These routines are
 * a first attempt of defining such behavior based on simple rules
 * applied to data provided by the Unicode Consortium.
 *
 * For some graphical characters, the Unicode standard explicitly
 * defines a character-cell width via the definition of the East Asian
 * FullWidth (F), Wide (W), Half-width (H), and Narrow (Na) classes.
 * In all these cases, there is no ambiguity about which width a
 * terminal shall use. For characters in the East Asian Ambiguous (A)
 * class, the width choice depends purely on a preference of backward
 * compatibility with either historic CJK or Western practice.
 * Choosing single-width for these characters is easy to justify as
 * the appropriate long-term solution, as the CJK practice of
 * displaying these characters as double-width comes from historic
 * implementation simplicity (8-bit encoded characters were displayed
 * single-width and 16-bit ones double-width, even for Greek,
 * Cyrillic, etc.) and not any typographic considerations.
 *
 * Much less clear is the choice of width for the Not East Asian
 * (Neutral) class. Existing practice does not dictate a width for any
 * of these characters. It would nevertheless make sense
 * typographically to allocate two character cells to characters such
 * as for instance EM SPACE or VOLUME INTEGRAL, which cannot be
 * represented adequately with a single-width glyph. The following
 * routines at present merely assign a single-cell width to all
 * neutral characters, in the interest of simplicity. This is not
 * entirely satisfactory and should be reconsidered before
 * establishing a formal standard in lib.wc area. At the moment, the
 * decision which Not East Asian (Neutral) characters should be
 * represented by double-width glyphs cannot yet be answered by
 * applying a simple rule from the Unicode database content. Setting
 * up a proper standard for the behavior of UTF-8 character terminals
 * will require a careful analysis not only of each Unicode character,
 * but also of each presentation form, something the author of these
 * routines has avoided to do so far.
 *
 * http://www.unicode.org/unicode/reports/tr11/
 *
 * Markus Kuhn -- 2007-05-26 (Unicode 5.0)
 *
 * Permission to use, copy, modify, and distribute lib.wc software
 * for any purpose and without fee is hereby granted. The author
 * disclaims all warranties with regard to lib.wc software.
 *
 * Latest version: http://www.cl.cam.ac.uk/~mgk25/ucs/wcwidth.c
 *//**
 * The following function defines the column width of an ISO 10646 character
 * as follows:
 *
 *  - The null character (U+0000) has a column width of 0.
 *  - Other C0/C1 control characters and DEL will lead to a return value of -1.
 *  - Non-spacing and enclosing combining characters (general category code Mn
 *    or Me in the Unicode database) have a column width of 0.
 *  - SOFT HYPHEN (U+00AD) has a column width of 1.
 *  - Other format characters (general category code Cf in the Unicode database)
 *    and ZERO WIDTH SPACE (U+200B) have a column width of 0.
 *  - Hangul Jamo medial vowels and final consonants (U+1160-U+11FF) have a
 *    column width of 0.
 *  - Spacing characters in the East Asian Wide (W) or East Asian Full-width (F)
 *    category as defined in Unicode Technical Report #11 have a column width of
 *    2.
 *  - East Asian Ambiguous characters are taken into account if
 *    regardCjkAmbiguous flag is enabled. They have a column width of 2.
 *  - All remaining characters (including all printable ISO 8859-1 and WGL4
 *    characters, Unicode control characters, etc.) have a column width of 1.
 *
 * This implementation assumes that characters are encoded in ISO 10646.
 */lib.wc={};// Width of a nul character.
lib.wc.nulWidth=0;// Width of a control character.
lib.wc.controlWidth=0;// Flag whether to consider East Asian Ambiguous characters.
lib.wc.regardCjkAmbiguous=false;// Width of an East Asian Ambiguous character.
lib.wc.cjkAmbiguousWidth=2;// Sorted list of non-overlapping intervals of non-spacing characters
// generated by the `./ranges.py` helper.
lib.wc.combining=[[0x00ad,0x00ad],[0x0300,0x036f],[0x0483,0x0489],[0x0591,0x05bd],[0x05bf,0x05bf],[0x05c1,0x05c2],[0x05c4,0x05c5],[0x05c7,0x05c7],[0x0610,0x061a],[0x061c,0x061c],[0x064b,0x065f],[0x0670,0x0670],[0x06d6,0x06dc],[0x06df,0x06e4],[0x06e7,0x06e8],[0x06ea,0x06ed],[0x0711,0x0711],[0x0730,0x074a],[0x07a6,0x07b0],[0x07eb,0x07f3],[0x0816,0x0819],[0x081b,0x0823],[0x0825,0x0827],[0x0829,0x082d],[0x0859,0x085b],[0x08d4,0x08e1],[0x08e3,0x0902],[0x093a,0x093a],[0x093c,0x093c],[0x0941,0x0948],[0x094d,0x094d],[0x0951,0x0957],[0x0962,0x0963],[0x0981,0x0981],[0x09bc,0x09bc],[0x09c1,0x09c4],[0x09cd,0x09cd],[0x09e2,0x09e3],[0x0a01,0x0a02],[0x0a3c,0x0a3c],[0x0a41,0x0a42],[0x0a47,0x0a48],[0x0a4b,0x0a4d],[0x0a51,0x0a51],[0x0a70,0x0a71],[0x0a75,0x0a75],[0x0a81,0x0a82],[0x0abc,0x0abc],[0x0ac1,0x0ac5],[0x0ac7,0x0ac8],[0x0acd,0x0acd],[0x0ae2,0x0ae3],[0x0afa,0x0aff],[0x0b01,0x0b01],[0x0b3c,0x0b3c],[0x0b3f,0x0b3f],[0x0b41,0x0b44],[0x0b4d,0x0b4d],[0x0b56,0x0b56],[0x0b62,0x0b63],[0x0b82,0x0b82],[0x0bc0,0x0bc0],[0x0bcd,0x0bcd],[0x0c00,0x0c00],[0x0c3e,0x0c40],[0x0c46,0x0c48],[0x0c4a,0x0c4d],[0x0c55,0x0c56],[0x0c62,0x0c63],[0x0c81,0x0c81],[0x0cbc,0x0cbc],[0x0cbf,0x0cbf],[0x0cc6,0x0cc6],[0x0ccc,0x0ccd],[0x0ce2,0x0ce3],[0x0d00,0x0d01],[0x0d3b,0x0d3c],[0x0d41,0x0d44],[0x0d4d,0x0d4d],[0x0d62,0x0d63],[0x0dca,0x0dca],[0x0dd2,0x0dd4],[0x0dd6,0x0dd6],[0x0e31,0x0e31],[0x0e34,0x0e3a],[0x0e47,0x0e4e],[0x0eb1,0x0eb1],[0x0eb4,0x0eb9],[0x0ebb,0x0ebc],[0x0ec8,0x0ecd],[0x0f18,0x0f19],[0x0f35,0x0f35],[0x0f37,0x0f37],[0x0f39,0x0f39],[0x0f71,0x0f7e],[0x0f80,0x0f84],[0x0f86,0x0f87],[0x0f8d,0x0f97],[0x0f99,0x0fbc],[0x0fc6,0x0fc6],[0x102d,0x1030],[0x1032,0x1037],[0x1039,0x103a],[0x103d,0x103e],[0x1058,0x1059],[0x105e,0x1060],[0x1071,0x1074],[0x1082,0x1082],[0x1085,0x1086],[0x108d,0x108d],[0x109d,0x109d],[0x1160,0x11ff],[0x135d,0x135f],[0x1712,0x1714],[0x1732,0x1734],[0x1752,0x1753],[0x1772,0x1773],[0x17b4,0x17b5],[0x17b7,0x17bd],[0x17c6,0x17c6],[0x17c9,0x17d3],[0x17dd,0x17dd],[0x180b,0x180e],[0x1885,0x1886],[0x18a9,0x18a9],[0x1920,0x1922],[0x1927,0x1928],[0x1932,0x1932],[0x1939,0x193b],[0x1a17,0x1a18],[0x1a1b,0x1a1b],[0x1a56,0x1a56],[0x1a58,0x1a5e],[0x1a60,0x1a60],[0x1a62,0x1a62],[0x1a65,0x1a6c],[0x1a73,0x1a7c],[0x1a7f,0x1a7f],[0x1ab0,0x1abe],[0x1b00,0x1b03],[0x1b34,0x1b34],[0x1b36,0x1b3a],[0x1b3c,0x1b3c],[0x1b42,0x1b42],[0x1b6b,0x1b73],[0x1b80,0x1b81],[0x1ba2,0x1ba5],[0x1ba8,0x1ba9],[0x1bab,0x1bad],[0x1be6,0x1be6],[0x1be8,0x1be9],[0x1bed,0x1bed],[0x1bef,0x1bf1],[0x1c2c,0x1c33],[0x1c36,0x1c37],[0x1cd0,0x1cd2],[0x1cd4,0x1ce0],[0x1ce2,0x1ce8],[0x1ced,0x1ced],[0x1cf4,0x1cf4],[0x1cf8,0x1cf9],[0x1dc0,0x1df9],[0x1dfb,0x1dff],[0x200b,0x200f],[0x202a,0x202e],[0x2060,0x2064],[0x2066,0x206f],[0x20d0,0x20f0],[0x2cef,0x2cf1],[0x2d7f,0x2d7f],[0x2de0,0x2dff],[0x302a,0x302d],[0x3099,0x309a],[0xa66f,0xa672],[0xa674,0xa67d],[0xa69e,0xa69f],[0xa6f0,0xa6f1],[0xa802,0xa802],[0xa806,0xa806],[0xa80b,0xa80b],[0xa825,0xa826],[0xa8c4,0xa8c5],[0xa8e0,0xa8f1],[0xa926,0xa92d],[0xa947,0xa951],[0xa980,0xa982],[0xa9b3,0xa9b3],[0xa9b6,0xa9b9],[0xa9bc,0xa9bc],[0xa9e5,0xa9e5],[0xaa29,0xaa2e],[0xaa31,0xaa32],[0xaa35,0xaa36],[0xaa43,0xaa43],[0xaa4c,0xaa4c],[0xaa7c,0xaa7c],[0xaab0,0xaab0],[0xaab2,0xaab4],[0xaab7,0xaab8],[0xaabe,0xaabf],[0xaac1,0xaac1],[0xaaec,0xaaed],[0xaaf6,0xaaf6],[0xabe5,0xabe5],[0xabe8,0xabe8],[0xabed,0xabed],[0xfb1e,0xfb1e],[0xfe00,0xfe0f],[0xfe20,0xfe2f],[0xfeff,0xfeff],[0xfff9,0xfffb],[0x101fd,0x101fd],[0x102e0,0x102e0],[0x10376,0x1037a],[0x10a01,0x10a03],[0x10a05,0x10a06],[0x10a0c,0x10a0f],[0x10a38,0x10a3a],[0x10a3f,0x10a3f],[0x10ae5,0x10ae6],[0x11001,0x11001],[0x11038,0x11046],[0x1107f,0x11081],[0x110b3,0x110b6],[0x110b9,0x110ba],[0x11100,0x11102],[0x11127,0x1112b],[0x1112d,0x11134],[0x11173,0x11173],[0x11180,0x11181],[0x111b6,0x111be],[0x111ca,0x111cc],[0x1122f,0x11231],[0x11234,0x11234],[0x11236,0x11237],[0x1123e,0x1123e],[0x112df,0x112df],[0x112e3,0x112ea],[0x11300,0x11301],[0x1133c,0x1133c],[0x11340,0x11340],[0x11366,0x1136c],[0x11370,0x11374],[0x11438,0x1143f],[0x11442,0x11444],[0x11446,0x11446],[0x114b3,0x114b8],[0x114ba,0x114ba],[0x114bf,0x114c0],[0x114c2,0x114c3],[0x115b2,0x115b5],[0x115bc,0x115bd],[0x115bf,0x115c0],[0x115dc,0x115dd],[0x11633,0x1163a],[0x1163d,0x1163d],[0x1163f,0x11640],[0x116ab,0x116ab],[0x116ad,0x116ad],[0x116b0,0x116b5],[0x116b7,0x116b7],[0x1171d,0x1171f],[0x11722,0x11725],[0x11727,0x1172b],[0x11a01,0x11a06],[0x11a09,0x11a0a],[0x11a33,0x11a38],[0x11a3b,0x11a3e],[0x11a47,0x11a47],[0x11a51,0x11a56],[0x11a59,0x11a5b],[0x11a8a,0x11a96],[0x11a98,0x11a99],[0x11c30,0x11c36],[0x11c38,0x11c3d],[0x11c3f,0x11c3f],[0x11c92,0x11ca7],[0x11caa,0x11cb0],[0x11cb2,0x11cb3],[0x11cb5,0x11cb6],[0x11d31,0x11d36],[0x11d3a,0x11d3a],[0x11d3c,0x11d3d],[0x11d3f,0x11d45],[0x11d47,0x11d47],[0x16af0,0x16af4],[0x16b30,0x16b36],[0x16f8f,0x16f92],[0x1bc9d,0x1bc9e],[0x1bca0,0x1bca3],[0x1d167,0x1d169],[0x1d173,0x1d182],[0x1d185,0x1d18b],[0x1d1aa,0x1d1ad],[0x1d242,0x1d244],[0x1da00,0x1da36],[0x1da3b,0x1da6c],[0x1da75,0x1da75],[0x1da84,0x1da84],[0x1da9b,0x1da9f],[0x1daa1,0x1daaf],[0x1e000,0x1e006],[0x1e008,0x1e018],[0x1e01b,0x1e021],[0x1e023,0x1e024],[0x1e026,0x1e02a],[0x1e8d0,0x1e8d6],[0x1e944,0x1e94a],[0xe0001,0xe0001],[0xe0020,0xe007f],[0xe0100,0xe01ef]];// Sorted list of non-overlapping intervals of East Asian Ambiguous characters
// generated by the `./ranges.py` helper.
lib.wc.ambiguous=[[0x00a1,0x00a1],[0x00a4,0x00a4],[0x00a7,0x00a8],[0x00aa,0x00aa],[0x00ad,0x00ae],[0x00b0,0x00b4],[0x00b6,0x00ba],[0x00bc,0x00bf],[0x00c6,0x00c6],[0x00d0,0x00d0],[0x00d7,0x00d8],[0x00de,0x00e1],[0x00e6,0x00e6],[0x00e8,0x00ea],[0x00ec,0x00ed],[0x00f0,0x00f0],[0x00f2,0x00f3],[0x00f7,0x00fa],[0x00fc,0x00fc],[0x00fe,0x00fe],[0x0101,0x0101],[0x0111,0x0111],[0x0113,0x0113],[0x011b,0x011b],[0x0126,0x0127],[0x012b,0x012b],[0x0131,0x0133],[0x0138,0x0138],[0x013f,0x0142],[0x0144,0x0144],[0x0148,0x014b],[0x014d,0x014d],[0x0152,0x0153],[0x0166,0x0167],[0x016b,0x016b],[0x01ce,0x01ce],[0x01d0,0x01d0],[0x01d2,0x01d2],[0x01d4,0x01d4],[0x01d6,0x01d6],[0x01d8,0x01d8],[0x01da,0x01da],[0x01dc,0x01dc],[0x0251,0x0251],[0x0261,0x0261],[0x02c4,0x02c4],[0x02c7,0x02c7],[0x02c9,0x02cb],[0x02cd,0x02cd],[0x02d0,0x02d0],[0x02d8,0x02db],[0x02dd,0x02dd],[0x02df,0x02df],[0x0300,0x036f],[0x0391,0x03a1],[0x03a3,0x03a9],[0x03b1,0x03c1],[0x03c3,0x03c9],[0x0401,0x0401],[0x0410,0x044f],[0x0451,0x0451],[0x1100,0x115f],[0x2010,0x2010],[0x2013,0x2016],[0x2018,0x2019],[0x201c,0x201d],[0x2020,0x2022],[0x2024,0x2027],[0x2030,0x2030],[0x2032,0x2033],[0x2035,0x2035],[0x203b,0x203b],[0x203e,0x203e],[0x2074,0x2074],[0x207f,0x207f],[0x2081,0x2084],[0x20ac,0x20ac],[0x2103,0x2103],[0x2105,0x2105],[0x2109,0x2109],[0x2113,0x2113],[0x2116,0x2116],[0x2121,0x2122],[0x2126,0x2126],[0x212b,0x212b],[0x2153,0x2154],[0x215b,0x215e],[0x2160,0x216b],[0x2170,0x2179],[0x2189,0x2189],[0x2190,0x2199],[0x21b8,0x21b9],[0x21d2,0x21d2],[0x21d4,0x21d4],[0x21e7,0x21e7],[0x2200,0x2200],[0x2202,0x2203],[0x2207,0x2208],[0x220b,0x220b],[0x220f,0x220f],[0x2211,0x2211],[0x2215,0x2215],[0x221a,0x221a],[0x221d,0x2220],[0x2223,0x2223],[0x2225,0x2225],[0x2227,0x222c],[0x222e,0x222e],[0x2234,0x2237],[0x223c,0x223d],[0x2248,0x2248],[0x224c,0x224c],[0x2252,0x2252],[0x2260,0x2261],[0x2264,0x2267],[0x226a,0x226b],[0x226e,0x226f],[0x2282,0x2283],[0x2286,0x2287],[0x2295,0x2295],[0x2299,0x2299],[0x22a5,0x22a5],[0x22bf,0x22bf],[0x2312,0x2312],[0x231a,0x231b],[0x2329,0x232a],[0x23e9,0x23ec],[0x23f0,0x23f0],[0x23f3,0x23f3],[0x2460,0x24e9],[0x24eb,0x254b],[0x2550,0x2573],[0x2580,0x258f],[0x2592,0x2595],[0x25a0,0x25a1],[0x25a3,0x25a9],[0x25b2,0x25b3],[0x25b6,0x25b7],[0x25bc,0x25bd],[0x25c0,0x25c1],[0x25c6,0x25c8],[0x25cb,0x25cb],[0x25ce,0x25d1],[0x25e2,0x25e5],[0x25ef,0x25ef],[0x25fd,0x25fe],[0x2605,0x2606],[0x2609,0x2609],[0x260e,0x260f],[0x2614,0x2615],[0x261c,0x261c],[0x261e,0x261e],[0x2640,0x2640],[0x2642,0x2642],[0x2648,0x2653],[0x2660,0x2661],[0x2663,0x2665],[0x2667,0x266a],[0x266c,0x266d],[0x266f,0x266f],[0x267f,0x267f],[0x2693,0x2693],[0x269e,0x269f],[0x26a1,0x26a1],[0x26aa,0x26ab],[0x26bd,0x26bf],[0x26c4,0x26e1],[0x26e3,0x26e3],[0x26e8,0x26ff],[0x2705,0x2705],[0x270a,0x270b],[0x2728,0x2728],[0x273d,0x273d],[0x274c,0x274c],[0x274e,0x274e],[0x2753,0x2755],[0x2757,0x2757],[0x2776,0x277f],[0x2795,0x2797],[0x27b0,0x27b0],[0x27bf,0x27bf],[0x2b1b,0x2b1c],[0x2b50,0x2b50],[0x2b55,0x2b59],[0x2e80,0x2fdf],[0x2ff0,0x303e],[0x3040,0x4dbf],[0x4e00,0xa4cf],[0xa960,0xa97f],[0xac00,0xd7a3],[0xe000,0xfaff],[0xfe00,0xfe19],[0xfe30,0xfe6f],[0xff01,0xff60],[0xffe0,0xffe6],[0xfffd,0xfffd],[0x16fe0,0x16fe1],[0x17000,0x18aff],[0x1b000,0x1b12f],[0x1b170,0x1b2ff],[0x1f004,0x1f004],[0x1f0cf,0x1f0cf],[0x1f100,0x1f10a],[0x1f110,0x1f12d],[0x1f130,0x1f169],[0x1f170,0x1f1ac],[0x1f200,0x1f202],[0x1f210,0x1f23b],[0x1f240,0x1f248],[0x1f250,0x1f251],[0x1f260,0x1f265],[0x1f300,0x1f320],[0x1f32d,0x1f335],[0x1f337,0x1f37c],[0x1f37e,0x1f393],[0x1f3a0,0x1f3ca],[0x1f3cf,0x1f3d3],[0x1f3e0,0x1f3f0],[0x1f3f4,0x1f3f4],[0x1f3f8,0x1f43e],[0x1f440,0x1f440],[0x1f442,0x1f4fc],[0x1f4ff,0x1f53d],[0x1f54b,0x1f54e],[0x1f550,0x1f567],[0x1f57a,0x1f57a],[0x1f595,0x1f596],[0x1f5a4,0x1f5a4],[0x1f5fb,0x1f64f],[0x1f680,0x1f6c5],[0x1f6cc,0x1f6cc],[0x1f6d0,0x1f6d2],[0x1f6eb,0x1f6ec],[0x1f6f4,0x1f6f8],[0x1f910,0x1f93e],[0x1f940,0x1f94c],[0x1f950,0x1f96b],[0x1f980,0x1f997],[0x1f9c0,0x1f9c0],[0x1f9d0,0x1f9e6],[0x20000,0x2fffd],[0x30000,0x3fffd],[0xe0100,0xe01ef],[0xf0000,0xffffd],[0x100000,0x10fffd]];// Sorted list of non-overlapping intervals of East Asian Unambiguous characters
// generated by the `./ranges.py` helper.
lib.wc.unambiguous=[[0x1100,0x115f],[0x231a,0x231b],[0x2329,0x232a],[0x23e9,0x23ec],[0x23f0,0x23f0],[0x23f3,0x23f3],[0x25fd,0x25fe],[0x2614,0x2615],[0x2648,0x2653],[0x267f,0x267f],[0x2693,0x2693],[0x26a1,0x26a1],[0x26aa,0x26ab],[0x26bd,0x26be],[0x26c4,0x26c5],[0x26ce,0x26ce],[0x26d4,0x26d4],[0x26ea,0x26ea],[0x26f2,0x26f3],[0x26f5,0x26f5],[0x26fa,0x26fa],[0x26fd,0x26fd],[0x2705,0x2705],[0x270a,0x270b],[0x2728,0x2728],[0x274c,0x274c],[0x274e,0x274e],[0x2753,0x2755],[0x2757,0x2757],[0x2795,0x2797],[0x27b0,0x27b0],[0x27bf,0x27bf],[0x2b1b,0x2b1c],[0x2b50,0x2b50],[0x2b55,0x2b55],[0x2e80,0x2fdf],[0x2ff0,0x303e],[0x3040,0x3247],[0x3250,0x4dbf],[0x4e00,0xa4cf],[0xa960,0xa97f],[0xac00,0xd7a3],[0xf900,0xfaff],[0xfe10,0xfe19],[0xfe30,0xfe6f],[0xff01,0xff60],[0xffe0,0xffe6],[0x16fe0,0x16fe1],[0x17000,0x18aff],[0x1b000,0x1b12f],[0x1b170,0x1b2ff],[0x1f004,0x1f004],[0x1f0cf,0x1f0cf],[0x1f18e,0x1f18e],[0x1f191,0x1f19a],[0x1f200,0x1f202],[0x1f210,0x1f23b],[0x1f240,0x1f248],[0x1f250,0x1f251],[0x1f260,0x1f265],[0x1f300,0x1f320],[0x1f32d,0x1f335],[0x1f337,0x1f37c],[0x1f37e,0x1f393],[0x1f3a0,0x1f3ca],[0x1f3cf,0x1f3d3],[0x1f3e0,0x1f3f0],[0x1f3f4,0x1f3f4],[0x1f3f8,0x1f43e],[0x1f440,0x1f440],[0x1f442,0x1f4fc],[0x1f4ff,0x1f53d],[0x1f54b,0x1f54e],[0x1f550,0x1f567],[0x1f57a,0x1f57a],[0x1f595,0x1f596],[0x1f5a4,0x1f5a4],[0x1f5fb,0x1f64f],[0x1f680,0x1f6c5],[0x1f6cc,0x1f6cc],[0x1f6d0,0x1f6d2],[0x1f6eb,0x1f6ec],[0x1f6f4,0x1f6f8],[0x1f910,0x1f93e],[0x1f940,0x1f94c],[0x1f950,0x1f96b],[0x1f980,0x1f997],[0x1f9c0,0x1f9c0],[0x1f9d0,0x1f9e6],[0x20000,0x2fffd],[0x30000,0x3fffd]];/**
 * Binary search to check if the given unicode character is in the table.
 *
 * @param {integer} ucs A unicode character code.
 * @param {Object} table A sorted list of internals to match against.
 * @return {boolean} True if the given character is in the table.
 */lib.wc.binaryTableSearch_=function(ucs,table){var min=0,max=table.length-1;var mid;if(ucs<table[min][0]||ucs>table[max][1])return false;while(max>=min){mid=Math.floor((min+max)/2);if(ucs>table[mid][1]){min=mid+1;}else if(ucs<table[mid][0]){max=mid-1;}else{return true;}}return false;};/**
 * Binary search to check if the given unicode character is a space character.
 *
 * @param {integer} ucs A unicode character code.
 *
 * @return {boolean} True if the given character is a space character; false
 *     otherwise.
 */lib.wc.isSpace=function(ucs){return lib.wc.binaryTableSearch_(ucs,lib.wc.combining);};/**
 * Auxiliary function for checking if the given unicode character is a East
 * Asian Ambiguous character.
 *
 * @param {integer} ucs A unicode character code.
 *
 * @return {boolean} True if the given character is a East Asian Ambiguous
 * character.
 */lib.wc.isCjkAmbiguous=function(ucs){return lib.wc.binaryTableSearch_(ucs,lib.wc.ambiguous);};/**
 * Determine the column width of the given character.
 *
 * @param {integer} ucs A unicode character code.
 *
 * @return {integer} The column width of the given character.
 */lib.wc.charWidth=function(ucs){if(lib.wc.regardCjkAmbiguous){return lib.wc.charWidthRegardAmbiguous(ucs);}else{return lib.wc.charWidthDisregardAmbiguous(ucs);}};/**
 * Determine the column width of the given character without considering East
 * Asian Ambiguous characters.
 *
 * @param {integer} ucs A unicode character code.
 *
 * @return {integer} The column width of the given character.
 */lib.wc.charWidthDisregardAmbiguous=function(ucs){// Optimize for ASCII characters.
if(ucs<0x7f){if(ucs>=0x20)return 1;else if(ucs==0)return lib.wc.nulWidth;else/* if (ucs < 0x20) */return lib.wc.controlWidth;}// Test for 8-bit control characters.
if(ucs<0xa0)return lib.wc.controlWidth;// Binary search in table of non-spacing characters.
if(lib.wc.isSpace(ucs))return 0;// Binary search in table of wide characters.
return lib.wc.binaryTableSearch_(ucs,lib.wc.unambiguous)?2:1;};/**
 * Determine the column width of the given character considering East Asian
 * Ambiguous characters.
 *
 * @param {integer} ucs A unicode character code.
 *
 * @return {integer} The column width of the given character.
 */lib.wc.charWidthRegardAmbiguous=function(ucs){if(lib.wc.isCjkAmbiguous(ucs))return lib.wc.cjkAmbiguousWidth;return lib.wc.charWidthDisregardAmbiguous(ucs);};/**
 * Determine the column width of the given string.
 *
 * @param {string} str A string.
 *
 * @return {integer} The column width of the given string.
 */lib.wc.strWidth=function(str){var width,rv=0;for(var i=0;i<str.length;){var codePoint=str.codePointAt(i);width=lib.wc.charWidth(codePoint);if(width<0)return-1;rv+=width;i+=codePoint<=0xffff?1:2;}return rv;};/**
 * Get the substring at the given column offset of the given column width.
 *
 * @param {string} str The string to get substring from.
 * @param {integer} start The starting column offset to get substring.
 * @param {integer} opt_width The column width of the substring.
 *
 * @return {string} The substring.
 */lib.wc.substr=function(str,start,opt_width){var startIndex=0;var endIndex,width;// Fun edge case: Normally we associate zero width codepoints (like combining
// characters) with the previous codepoint, so we skip any leading ones while
// including trailing ones.  However, if there are zero width codepoints at
// the start of the string, and the substring starts at 0, lets include them
// in the result.  This also makes for a simple optimization for a common
// request.
if(start){for(width=0;startIndex<str.length;){var codePoint=str.codePointAt(startIndex);width+=lib.wc.charWidth(codePoint);if(width>start)break;startIndex+=codePoint<=0xffff?1:2;}}if(opt_width!=undefined){for(endIndex=startIndex,width=0;endIndex<str.length;){var _codePoint=str.codePointAt(endIndex);width+=lib.wc.charWidth(_codePoint);if(width>opt_width)break;endIndex+=_codePoint<=0xffff?1:2;}return str.substring(startIndex,endIndex);}return str.substr(startIndex);};/**
 * Get substring at the given start and end column offset.
 *
 * @param {string} str The string to get substring from.
 * @param {integer} start The starting column offset.
 * @param {integer} end The ending column offset.
 *
 * @return {string} The substring.
 */lib.wc.substring=function(str,start,end){return lib.wc.substr(str,start,end-start);};lib.resource.add('libdot/changelog/version','text/plain','1.19'+'');lib.resource.add('libdot/changelog/date','text/plain','2017-10-16'+'');// SOURCE FILE: hterm/js/hterm.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';lib.rtdep('lib.Storage');/**
 * @fileoverview Declares the hterm.* namespace and some basic shared utilities
 * that are too small to deserve dedicated files.
 */var hterm={};/**
 * The type of window hosting hterm.
 *
 * This is set as part of hterm.init().  The value is invalid until
 * initialization completes.
 */hterm.windowType=null;/**
 * Warning message to display in the terminal when browser zoom is enabled.
 *
 * You can replace it with your own localized message.
 */hterm.zoomWarningMessage='ZOOM != 100%';/**
 * Brief overlay message displayed when text is copied to the clipboard.
 *
 * By default it is the unicode BLACK SCISSORS character, but you can
 * replace it with your own localized message.
 *
 * This is only displayed when the 'enable-clipboard-notice' preference
 * is enabled.
 */hterm.notifyCopyMessage='\u2702';/**
 * Text shown in a desktop notification for the terminal
 * bell.  \u226a is a unicode EIGHTH NOTE, %(title) will
 * be replaced by the terminal title.
 */hterm.desktopNotificationTitle='\u266A %(title) \u266A';/**
 * List of known hterm test suites.
 *
 * A test harness should ensure that they all exist before running.
 */hterm.testDeps=['hterm.ScrollPort.Tests','hterm.Screen.Tests','hterm.Terminal.Tests','hterm.VT.Tests','hterm.VT.CannedTests'];/**
 * The hterm init function, registered with lib.registerInit().
 *
 * This is called during lib.init().
 *
 * @param {function} onInit The function lib.init() wants us to invoke when
 *     initialization is complete.
 */lib.registerInit('hterm',function(onInit){function onWindow(window){hterm.windowType=window.type;setTimeout(onInit,0);}function onTab(tab){if(tab&&window.chrome){chrome.windows.get(tab.windowId,null,onWindow);}else{// TODO(rginda): This is where we end up for a v1 app's background page.
// Maybe windowType = 'none' would be more appropriate, or something.
hterm.windowType='normal';setTimeout(onInit,0);}}if(!hterm.defaultStorage){if(window.chrome&&chrome.storage&&chrome.storage.sync){hterm.defaultStorage=new lib.Storage.Chrome(chrome.storage.sync);}else{hterm.defaultStorage=new lib.Storage.Local();}}// The chrome.tabs API is not supported in packaged apps, and detecting if
// you're a packaged app is a little awkward.
var isPackagedApp=false;if(window.chrome&&chrome.runtime&&chrome.runtime.getManifest){var manifest=chrome.runtime.getManifest();isPackagedApp=manifest.app&&manifest.app.background;}if(isPackagedApp){// Packaged apps are never displayed in browser tabs.
setTimeout(onWindow.bind(null,{type:'popup'}),0);}else{if(window.chrome&&chrome.tabs){// The getCurrent method gets the tab that is "currently running", not the
// topmost or focused tab.
chrome.tabs.getCurrent(onTab);}else{setTimeout(onWindow.bind(null,{type:'normal'}),0);}}});/**
 * Return decimal { width, height } for a given dom node.
 */hterm.getClientSize=function(dom){return dom.getBoundingClientRect();};/**
 * Return decimal width for a given dom node.
 */hterm.getClientWidth=function(dom){return dom.getBoundingClientRect().width;};/**
 * Return decimal height for a given dom node.
 */hterm.getClientHeight=function(dom){return dom.getBoundingClientRect().height;};/**
 * Copy the current selection to the system clipboard.
 *
 * @param {HTMLDocument} The document with the selection to copy.
 */hterm.copySelectionToClipboard=function(document){try{document.execCommand('copy');}catch(firefoxException){// Ignore this. FF throws an exception if there was an error, even though
// the spec says just return false.
}};/**
 * Paste the system clipboard into the element with focus.
 *
 * Note: In Chrome/Firefox app/extension environments, you'll need the
 * "clipboardRead" permission.  In other environments, this might always
 * fail as the browser frequently blocks access for security reasons.
 *
 * @param {HTMLDocument} The document to paste into.
 * @return {boolean} True if the paste succeeded.
 */hterm.pasteFromClipboard=function(document){try{return document.execCommand('paste');}catch(firefoxException){// Ignore this.  FF 40 and older would incorrectly throw an exception if
// there was an error instead of returning false.
return false;}};/**
 * Create a new notification.
 *
 * @param {Object} params Various parameters for the notification.
 * @param {string} params.title The title (defaults to the window's title).
 * @param {string} params.body The message body (main text).
 */hterm.notify=function(params){var def=function def(curr,fallback){return curr!==undefined?curr:fallback;};if(params===undefined||params===null)params={};// Merge the user's choices with the default settings.  We don't take it
// directly in case it was stuffed with excess junk.
var options={'body':params.body,'icon':def(params.icon,lib.resource.getDataUrl('hterm/images/icon-96'))};var title=def(params.title,window.document.title);if(!title)title='hterm';title=lib.f.replaceVars(hterm.desktopNotificationTitle,{'title':title});var n=new Notification(title,options);n.onclick=function(){window.focus();this.close();};return n;};/**
 * Constructor for a hterm.Size record.
 *
 * Instances of this class have public read/write members for width and height.
 *
 * @param {integer} width The width of this record.
 * @param {integer} height The height of this record.
 */hterm.Size=function(width,height){this.width=width;this.height=height;};/**
 * Adjust the width and height of this record.
 *
 * @param {integer} width The new width of this record.
 * @param {integer} height The new height of this record.
 */hterm.Size.prototype.resize=function(width,height){this.width=width;this.height=height;};/**
 * Return a copy of this record.
 *
 * @return {hterm.Size} A new hterm.Size instance with the same width and
 * height.
 */hterm.Size.prototype.clone=function(){return new hterm.Size(this.width,this.height);};/**
 * Set the height and width of this instance based on another hterm.Size.
 *
 * @param {hterm.Size} that The object to copy from.
 */hterm.Size.prototype.setTo=function(that){this.width=that.width;this.height=that.height;};/**
 * Test if another hterm.Size instance is equal to this one.
 *
 * @param {hterm.Size} that The other hterm.Size instance.
 * @return {boolean} True if both instances have the same width/height, false
 *     otherwise.
 */hterm.Size.prototype.equals=function(that){return this.width==that.width&&this.height==that.height;};/**
 * Return a string representation of this instance.
 *
 * @return {string} A string that identifies the width and height of this
 *     instance.
 */hterm.Size.prototype.toString=function(){return'[hterm.Size: '+this.width+', '+this.height+']';};/**
 * Constructor for a hterm.RowCol record.
 *
 * Instances of this class have public read/write members for row and column.
 *
 * This class includes an 'overflow' bit which is use to indicate that an
 * attempt has been made to move the cursor column passed the end of the
 * screen.  When this happens we leave the cursor column set to the last column
 * of the screen but set the overflow bit.  In this state cursor movement
 * happens normally, but any attempt to print new characters causes a cr/lf
 * first.
 *
 * @param {integer} row The row of this record.
 * @param {integer} column The column of this record.
 * @param {boolean} opt_overflow Optional boolean indicating that the RowCol
 *     has overflowed.
 */hterm.RowCol=function(row,column,opt_overflow){this.row=row;this.column=column;this.overflow=!!opt_overflow;};/**
 * Adjust the row and column of this record.
 *
 * @param {integer} row The new row of this record.
 * @param {integer} column The new column of this record.
 * @param {boolean} opt_overflow Optional boolean indicating that the RowCol
 *     has overflowed.
 */hterm.RowCol.prototype.move=function(row,column,opt_overflow){this.row=row;this.column=column;this.overflow=!!opt_overflow;};/**
 * Return a copy of this record.
 *
 * @return {hterm.RowCol} A new hterm.RowCol instance with the same row and
 * column.
 */hterm.RowCol.prototype.clone=function(){return new hterm.RowCol(this.row,this.column,this.overflow);};/**
 * Set the row and column of this instance based on another hterm.RowCol.
 *
 * @param {hterm.RowCol} that The object to copy from.
 */hterm.RowCol.prototype.setTo=function(that){this.row=that.row;this.column=that.column;this.overflow=that.overflow;};/**
 * Test if another hterm.RowCol instance is equal to this one.
 *
 * @param {hterm.RowCol} that The other hterm.RowCol instance.
 * @return {boolean} True if both instances have the same row/column, false
 *     otherwise.
 */hterm.RowCol.prototype.equals=function(that){return this.row==that.row&&this.column==that.column&&this.overflow==that.overflow;};/**
 * Return a string representation of this instance.
 *
 * @return {string} A string that identifies the row and column of this
 *     instance.
 */hterm.RowCol.prototype.toString=function(){return'[hterm.RowCol: '+this.row+', '+this.column+', '+this.overflow+']';};// SOURCE FILE: hterm/js/hterm_frame.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';lib.rtdep('lib.f');/**
 * First draft of the interface between the terminal and a third party dialog.
 *
 * This is rough.  It's just the terminal->dialog layer.  To complete things
 * we'll also need a command->terminal layer.  That will have to facilitate
 * command->terminal->dialog or direct command->dialog communication.
 *
 * I imagine this class will change significantly when that happens.
 *//**
 * Construct a new frame for the given terminal.
 *
 * @param terminal {hterm.Terminal} The parent terminal object.
 * @param url {String} The url to load in the frame.
 * @param opt_options {Object} Optional options for the frame.  Not implemented.
 */hterm.Frame=function(terminal,url,opt_options){this.terminal_=terminal;this.div_=terminal.div_;this.url=url;this.options=opt_options||{};this.iframe_=null;this.container_=null;this.messageChannel_=null;};/**
 * Handle messages from the iframe.
 */hterm.Frame.prototype.onMessage_=function(e){switch(e.data.name){case'ipc-init-ok':// We get this response after we send them ipc-init and they finish.
this.sendTerminalInfo_();return;case'terminal-info-ok':// We get this response after we send them terminal-info and they finish.
// Show the finished frame, and then rebind our message handler to the
// callback below.
this.container_.style.display='flex';this.messageChannel_.port1.onmessage=this.onMessage.bind(this);this.onLoad();return;default:console.log('Unknown message from frame:',e.data);return;}};/**
 * Clients could override this, I guess.
 *
 * It doesn't support multiple listeners, but I'm not sure that would make sense
 * here.  It's probably better to speak directly to our parents.
 */hterm.Frame.prototype.onMessage=function(){};/**
 * Handle iframe onLoad event.
 */hterm.Frame.prototype.onLoad_=function(){this.messageChannel_=new MessageChannel();this.messageChannel_.port1.onmessage=this.onMessage_.bind(this);this.messageChannel_.port1.start();this.iframe_.contentWindow.postMessage({name:'ipc-init',argv:[{messagePort:this.messageChannel_.port2}]},this.url,[this.messageChannel_.port2]);};/**
 * Clients may override this.
 */hterm.Frame.prototype.onLoad=function(){};/**
 * Sends the terminal-info message to the iframe.
 */hterm.Frame.prototype.sendTerminalInfo_=function(){lib.f.getAcceptLanguages(function(languages){this.postMessage('terminal-info',[{acceptLanguages:languages,foregroundColor:this.terminal_.getForegroundColor(),backgroundColor:this.terminal_.getBackgroundColor(),cursorColor:this.terminal_.getCursorColor(),fontSize:this.terminal_.getFontSize(),fontFamily:this.terminal_.getFontFamily(),baseURL:lib.f.getURL('/')}]);}.bind(this));};/**
 * User clicked the close button on the frame decoration.
 */hterm.Frame.prototype.onCloseClicked_=function(){this.close();};/**
 * Close this frame.
 */hterm.Frame.prototype.close=function(){if(!this.container_||!this.container_.parentNode)return;this.container_.parentNode.removeChild(this.container_);this.onClose();};/**
 * Clients may override this.
 */hterm.Frame.prototype.onClose=function(){};/**
 * Send a message to the iframe.
 */hterm.Frame.prototype.postMessage=function(name,argv){if(!this.messageChannel_)throw new Error('Message channel is not set up.');this.messageChannel_.port1.postMessage({name:name,argv:argv});};/**
 * Show the UI for this frame.
 *
 * The iframe src is not loaded until this method is called.
 */hterm.Frame.prototype.show=function(){var self=this;function opt(name,defaultValue){if(name in self.options)return self.options[name];return defaultValue;}var self=this;if(this.container_&&this.container_.parentNode){console.error('Frame already visible');return;}var headerHeight='16px';var divSize=hterm.getClientSize(this.div_);var width=opt('width',640);var height=opt('height',480);var left=(divSize.width-width)/2;var top=(divSize.height-height)/2;var document=this.terminal_.document_;var container=this.container_=document.createElement('div');container.style.cssText='position: absolute;'+'display: none;'+'flex-direction: column;'+'top: 10%;'+'left: 4%;'+'width: 90%;'+'height: 80%;'+'min-height: 20%;'+'max-height: 80%;'+'box-shadow: 0 0 2px '+this.terminal_.getForegroundColor()+';'+'border: 2px '+this.terminal_.getForegroundColor()+' solid;';if(false){// No use for the close button, so no use for the window header either.
var header=document.createElement('div');header.style.cssText='display: flex;'+'justify-content: flex-end;'+'height: '+headerHeight+';'+'background-color: '+this.terminal_.getForegroundColor()+';'+'color: '+this.terminal_.getBackgroundColor()+';'+'font-size: 16px;'+'font-family: '+this.terminal_.getFontFamily();container.appendChild(header);var button=document.createElement('div');button.setAttribute('role','button');button.style.cssText='margin-top: -3px;'+'margin-right: 3px;'+'cursor: pointer;';button.textContent='\u2A2F';button.addEventListener('click',this.onCloseClicked_.bind(this));header.appendChild(button);}var iframe=this.iframe_=document.createElement('iframe');iframe.onload=this.onLoad_.bind(this);iframe.style.cssText='display: flex;'+'flex: 1;'+'width: 100%';iframe.setAttribute('src',this.url);iframe.setAttribute('seamless',true);container.appendChild(iframe);this.div_.appendChild(container);};// SOURCE FILE: hterm/js/hterm_keyboard.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';lib.rtdep('hterm.Keyboard.KeyMap');/**
 * Keyboard handler.
 *
 * Consumes onKey* events and invokes onVTKeystroke on the associated
 * hterm.Terminal object.
 *
 * See also: [XTERM] as referenced in vt.js.
 *
 * @param {hterm.Terminal} The Terminal object associated with this keyboard.
 */hterm.Keyboard=function(terminal){// The parent vt interpreter.
this.terminal=terminal;// The element we're currently capturing keyboard events for.
this.keyboardElement_=null;// The event handlers we are interested in, and their bound callbacks, saved
// so they can be uninstalled with removeEventListener, when required.
this.handlers_=[['focusout',this.onFocusOut_.bind(this)],['keydown',this.onKeyDown_.bind(this)],['keypress',this.onKeyPress_.bind(this)],['keyup',this.onKeyUp_.bind(this)],['textInput',this.onTextInput_.bind(this)]];/**
   * The current key map.
   */this.keyMap=new hterm.Keyboard.KeyMap(this);this.bindings=new hterm.Keyboard.Bindings(this);/**
   * none: Disable any AltGr related munging.
   * ctrl-alt: Assume Ctrl+Alt means AltGr.
   * left-alt: Assume left Alt means AltGr.
   * right-alt: Assume right Alt means AltGr.
   */this.altGrMode='none';/**
   * If true, Shift-Insert will fall through to the browser as a paste.
   * If false, the keystroke will be sent to the host.
   */this.shiftInsertPaste=true;/**
   * If true, home/end will control the terminal scrollbar and shift home/end
   * will send the VT keycodes.  If false then home/end sends VT codes and
   * shift home/end scrolls.
   */this.homeKeysScroll=false;/**
   * Same as above, except for page up/page down.
   */this.pageKeysScroll=false;/**
   * If true, Ctrl-Plus/Minus/Zero controls zoom.
   * If false, Ctrl-Shift-Plus/Minus/Zero controls zoom, Ctrl-Minus sends ^_,
   * Ctrl-Plus/Zero do nothing.
   */this.ctrlPlusMinusZeroZoom=true;/**
   * Ctrl+C copies if true, sends ^C to host if false.
   * Ctrl+Shift+C sends ^C to host if true, copies if false.
   */this.ctrlCCopy=false;/**
   * Ctrl+V pastes if true, sends ^V to host if false.
   * Ctrl+Shift+V sends ^V to host if true, pastes if false.
   */this.ctrlVPaste=false;/**
   * Enable/disable application keypad.
   *
   * This changes the way numeric keys are sent from the keyboard.
   */this.applicationKeypad=false;/**
   * Enable/disable the application cursor mode.
   *
   * This changes the way cursor keys are sent from the keyboard.
   */this.applicationCursor=false;/**
   * If true, the backspace should send BS ('\x08', aka ^H).  Otherwise
   * the backspace key should send '\x7f'.
   */this.backspaceSendsBackspace=false;/**
   * The encoding method for data sent to the host.
   */this.characterEncoding='utf-8';/**
   * Set whether the meta key sends a leading escape or not.
   */this.metaSendsEscape=true;/**
   * Set whether meta-V gets passed to host.
   */this.passMetaV=true;/**
   * Controls how the alt key is handled.
   *
   *  escape....... Send an ESC prefix.
   *  8-bit........ Add 128 to the unshifted character as in xterm.
   *  browser-key.. Wait for the keypress event and see what the browser says.
   *                (This won't work well on platforms where the browser
   *                 performs a default action for some alt sequences.)
   *
   * This setting only matters when alt is distinct from meta (altIsMeta is
   * false.)
   */this.altSendsWhat='escape';/**
   * Set whether the alt key acts as a meta key, instead of producing 8-bit
   * characters.
   *
   * True to enable, false to disable, null to autodetect based on platform.
   */this.altIsMeta=false;/**
   * If true, tries to detect DEL key events that are from alt-backspace on
   * Chrome OS vs from a true DEL key press.
   *
   * Background: At the time of writing, on Chrome OS, alt-backspace is mapped
   * to DEL. Some users may be happy with this, but others may be frustrated
   * that it's impossible to do meta-backspace. If the user enables this pref,
   * we use a trick to tell a true DEL keypress from alt-backspace: on
   * alt-backspace, we will see the alt key go down, then get a DEL keystroke
   * that indicates that alt is not pressed. See https://crbug.com/174410 .
   */this.altBackspaceIsMetaBackspace=false;/**
   * Used to keep track of the current alt-key state, which is necessary for
   * the altBackspaceIsMetaBackspace preference above and for the altGrMode
   * preference.  This is a bitmap with where bit positions correspond to the
   * "location" property of the key event.
   */this.altKeyPressed=0;/**
   * If true, Chrome OS media keys will be mapped to their F-key equivalent.
   * E.g. "Back" will be mapped to F1. If false, Chrome will handle the keys.
   */this.mediaKeysAreFKeys=false;/**
   * Holds the previous setting of altSendsWhat when DECSET 1039 is used. When
   * DECRST 1039 is used, altSendsWhat is changed back to this and this is
   * nulled out.
   */this.previousAltSendsWhat_=null;};/**
 * Special handling for keyCodes in a keyboard layout.
 */hterm.Keyboard.KeyActions={/**
   * Call preventDefault and stopPropagation for this key event and nothing
   * else.
   */CANCEL:lib.f.createEnum('CANCEL'),/**
   * This performs the default terminal action for the key.  If used in the
   * 'normal' action and the the keystroke represents a printable key, the
   * character will be sent to the host.  If used in one of the modifier
   * actions, the terminal will perform the normal action after (possibly)
   * altering it.
   *
   *  - If the normal sequence starts with CSI, the sequence will be adjusted
   *    to include the modifier parameter as described in [XTERM] in the final
   *    table of the "PC-Style Function Keys" section.
   *
   *  - If the control key is down and the key represents a printable character,
   *    and the uppercase version of the unshifted keycap is between
   *    64 (ASCII '@') and 95 (ASCII '_'), then the uppercase version of the
   *    unshifted keycap minus 64 is sent.  This makes '^@' send '\x00' and
   *    '^_' send '\x1f'.  (Note that one higher that 0x1f is 0x20, which is
   *    the first printable ASCII value.)
   *
   *  - If the alt key is down and the key represents a printable character then
   *    the value of the character is shifted up by 128.
   *
   *  - If meta is down and configured to send an escape, '\x1b' will be sent
   *    before the normal action is performed.
   */DEFAULT:lib.f.createEnum('DEFAULT'),/**
   * Causes the terminal to opt out of handling the key event, instead letting
   * the browser deal with it.
   */PASS:lib.f.createEnum('PASS'),/**
   * Insert the first or second character of the keyCap, based on e.shiftKey.
   * The key will be handled in onKeyDown, and e.preventDefault() will be
   * called.
   *
   * It is useful for a modified key action, where it essentially strips the
   * modifier while preventing the browser from reacting to the key.
   */STRIP:lib.f.createEnum('STRIP')};/**
 * Encode a string according to the 'send-encoding' preference.
 */hterm.Keyboard.prototype.encode=function(str){if(this.characterEncoding=='utf-8')return this.terminal.vt.encodeUTF8(str);return str;};/**
 * Capture keyboard events sent to the associated element.
 *
 * This enables the keyboard.  Captured events are consumed by this class
 * and will not perform their default action or bubble to other elements.
 *
 * Passing a null element will uninstall the keyboard handlers.
 *
 * @param {HTMLElement} element The element whose events should be captured, or
 *     null to disable the keyboard.
 */hterm.Keyboard.prototype.installKeyboard=function(element){if(element==this.keyboardElement_)return;if(element&&this.keyboardElement_)this.installKeyboard(null);for(var i=0;i<this.handlers_.length;i++){var handler=this.handlers_[i];if(element){element.addEventListener(handler[0],handler[1]);}else{this.keyboardElement_.removeEventListener(handler[0],handler[1]);}}this.keyboardElement_=element;};/**
 * Disable keyboard event capture.
 *
 * This will allow the browser to process key events normally.
 */hterm.Keyboard.prototype.uninstallKeyboard=function(){this.installKeyboard(null);};/**
 * Handle onTextInput events.
 *
 * These are generated when using IMEs, Virtual Keyboards (VKs), compose keys,
 * Unicode input, etc...
 */hterm.Keyboard.prototype.onTextInput_=function(e){if(!e.data)return;// Just pass the generated buffer straight down.  No need for us to split it
// up or otherwise parse it ahead of times.
this.terminal.onVTKeystroke(e.data);};/**
 * Handle onKeyPress events.
 */hterm.Keyboard.prototype.onKeyPress_=function(e){var code;var key=String.fromCharCode(e.which);var lowerKey=key.toLowerCase();if((e.ctrlKey||e.metaKey)&&(lowerKey=='c'||lowerKey=='v')){// On FF the key press (not key down) event gets fired for copy/paste.
// Let it fall through for the default browser behavior.
return;}if(e.altKey&&this.altSendsWhat=='browser-key'&&e.charCode==0){// If we got here because we were expecting the browser to handle an
// alt sequence but it didn't do it, then we might be on an OS without
// an enabled IME system.  In that case we fall back to xterm-like
// behavior.
//
// This happens here only as a fallback.  Typically these platforms should
// set altSendsWhat to either 'escape' or '8-bit'.
var ch=String.fromCharCode(e.keyCode);if(!e.shiftKey)ch=ch.toLowerCase();code=ch.charCodeAt(0)+128;}else if(e.charCode>=32){ch=e.charCode;}if(ch)this.terminal.onVTKeystroke(String.fromCharCode(ch));e.preventDefault();e.stopPropagation();};/**
 * Prevent default handling for non-ctrl-shifted event.
 *
 * When combined with Chrome permission 'app.window.fullscreen.overrideEsc',
 * and called for both key down and key up events,
 * the ESC key remains usable within fullscreen Chrome app windows.
 */hterm.Keyboard.prototype.preventChromeAppNonCtrlShiftDefault_=function(e){if(!window.chrome||!window.chrome.app||!window.chrome.app.window)return;if(!e.ctrlKey||!e.shiftKey)e.preventDefault();};hterm.Keyboard.prototype.onFocusOut_=function(e){this.altKeyPressed=0;};hterm.Keyboard.prototype.onKeyUp_=function(e){if(e.keyCode==18)this.altKeyPressed=this.altKeyPressed&~(1<<e.location-1);if(e.keyCode==27)this.preventChromeAppNonCtrlShiftDefault_(e);};/**
 * Handle onKeyDown events.
 */hterm.Keyboard.prototype.onKeyDown_=function(e){if(e.keyCode==18)this.altKeyPressed=this.altKeyPressed|1<<e.location-1;if(e.keyCode==27)this.preventChromeAppNonCtrlShiftDefault_(e);var keyDef=this.keyMap.keyDefs[e.keyCode];if(!keyDef){console.warn('No definition for keyCode: '+e.keyCode);return;}// The type of action we're going to use.
var resolvedActionType=null;var self=this;function getAction(name){// Get the key action for the given action name.  If the action is a
// function, dispatch it.  If the action defers to the normal action,
// resolve that instead.
resolvedActionType=name;var action=keyDef[name];if(typeof action=='function')action=action.apply(self.keyMap,[e,keyDef]);if(action===DEFAULT&&name!='normal')action=getAction('normal');return action;}// Note that we use the triple-equals ('===') operator to test equality for
// these constants, in order to distinguish usage of the constant from usage
// of a literal string that happens to contain the same bytes.
var CANCEL=hterm.Keyboard.KeyActions.CANCEL;var DEFAULT=hterm.Keyboard.KeyActions.DEFAULT;var PASS=hterm.Keyboard.KeyActions.PASS;var STRIP=hterm.Keyboard.KeyActions.STRIP;var control=e.ctrlKey;var alt=this.altIsMeta?false:e.altKey;var meta=this.altIsMeta?e.altKey||e.metaKey:e.metaKey;// In the key-map, we surround the keyCap for non-printables in "[...]"
var isPrintable=!/^\[\w+\]$/.test(keyDef.keyCap);switch(this.altGrMode){case'ctrl-alt':if(isPrintable&&control&&alt){// ctrl-alt-printable means altGr.  We clear out the control and
// alt modifiers and wait to see the charCode in the keydown event.
control=false;alt=false;}break;case'right-alt':if(isPrintable&&this.terminal.keyboard.altKeyPressed&2){control=false;alt=false;}break;case'left-alt':if(isPrintable&&this.terminal.keyboard.altKeyPressed&1){control=false;alt=false;}break;}var action;if(control){action=getAction('control');}else if(alt){action=getAction('alt');}else if(meta){action=getAction('meta');}else{action=getAction('normal');}// If e.maskShiftKey was set (during getAction) it means the shift key is
// already accounted for in the action, and we should not act on it any
// further. This is currently only used for Ctrl-Shift-Tab, which should send
// "CSI Z", not "CSI 1 ; 2 Z".
var shift=!e.maskShiftKey&&e.shiftKey;var keyDown={keyCode:e.keyCode,shift:e.shiftKey,// not `var shift` from above.
ctrl:control,alt:alt,meta:meta};var binding=this.bindings.getBinding(keyDown);if(binding){// Clear out the modifier bits so we don't try to munge the sequence
// further.
shift=control=alt=meta=false;resolvedActionType='normal';action=binding.action;if(typeof action=='function')action=action.call(this,this.terminal,keyDown);}if(alt&&this.altSendsWhat=='browser-key'&&action==DEFAULT){// When altSendsWhat is 'browser-key', we wait for the keypress event.
// In keypress, the browser should have set the event.charCode to the
// appropriate character.
// TODO(rginda): Character compositions will need some black magic.
action=PASS;}if(action===PASS||action===DEFAULT&&!(control||alt||meta)){// If this key is supposed to be handled by the browser, or it is an
// unmodified key with the default action, then exit this event handler.
// If it's an unmodified key, it'll be handled in onKeyPress where we
// can tell for sure which ASCII code to insert.
//
// This block needs to come before the STRIP test, otherwise we'll strip
// the modifier and think it's ok to let the browser handle the keypress.
// The browser won't know we're trying to ignore the modifiers and might
// perform some default action.
return;}if(action===STRIP){alt=control=false;action=keyDef.normal;if(typeof action=='function')action=action.apply(this.keyMap,[e,keyDef]);if(action==DEFAULT&&keyDef.keyCap.length==2)action=keyDef.keyCap.substr(shift?1:0,1);}e.preventDefault();e.stopPropagation();if(action===CANCEL)return;if(action!==DEFAULT&&typeof action!='string'){console.warn('Invalid action: '+JSON.stringify(action));return;}// Strip the modifier that is associated with the action, since we assume that
// modifier has already been accounted for in the action.
if(resolvedActionType=='control'){control=false;}else if(resolvedActionType=='alt'){alt=false;}else if(resolvedActionType=='meta'){meta=false;}if(action.substr(0,2)=='\x1b['&&(alt||control||shift||meta)){// The action is an escape sequence that and it was triggered in the
// presence of a keyboard modifier, we may need to alter the action to
// include the modifier before sending it.
// The math is funky but aligns w/xterm.
var imod=1;if(shift)imod+=1;if(alt)imod+=2;if(control)imod+=4;if(meta)imod+=8;var mod=';'+imod;if(action.length==3){// Some of the CSI sequences have zero parameters unless modified.
action='\x1b[1'+mod+action.substr(2,1);}else{// Others always have at least one parameter.
action=action.substr(0,action.length-1)+mod+action.substr(action.length-1);}}else{if(action===DEFAULT){action=keyDef.keyCap.substr(shift?1:0,1);if(control){var unshifted=keyDef.keyCap.substr(0,1);var code=unshifted.charCodeAt(0);if(code>=64&&code<=95){action=String.fromCharCode(code-64);}}}if(alt&&this.altSendsWhat=='8-bit'&&action.length==1){var code=action.charCodeAt(0)+128;action=String.fromCharCode(code);}// We respect alt/metaSendsEscape even if the keymap action was a literal
// string.  Otherwise, every overridden alt/meta action would have to
// check alt/metaSendsEscape.
if(alt&&this.altSendsWhat=='escape'||meta&&this.metaSendsEscape){action='\x1b'+action;}}this.terminal.onVTKeystroke(action);};// SOURCE FILE: hterm/js/hterm_keyboard_bindings.js
// Copyright (c) 2015 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * A mapping from hterm.Keyboard.KeyPattern to an action.
 *
 * TODO(rginda): For now this bindings code is only used for user overrides.
 * hterm.Keyboard.KeyMap still handles all of the built-in key mappings.
 * It'd be nice if we migrated that over to be hterm.Keyboard.Bindings based.
 */hterm.Keyboard.Bindings=function(){this.bindings_={};};/**
 * Remove all bindings.
 */hterm.Keyboard.Bindings.prototype.clear=function(){this.bindings_={};};/**
 * Add a new binding.
 *
 * Internal API that assumes parsed objects as inputs.
 * See the public addBinding for more details.
 *
 * @param {hterm.Keyboard.KeyPattern} keyPattern
 * @param {string|function|hterm.Keyboard.KeyAction} action
 */hterm.Keyboard.Bindings.prototype.addBinding_=function(keyPattern,action){var binding=null;var list=this.bindings_[keyPattern.keyCode];if(list){for(var i=0;i<list.length;i++){if(list[i].keyPattern.matchKeyPattern(keyPattern)){binding=list[i];break;}}}if(binding){binding.action=action;}else{binding={keyPattern:keyPattern,action:action};if(!list){this.bindings_[keyPattern.keyCode]=[binding];}else{this.bindings_[keyPattern.keyCode].push(binding);list.sort(function(a,b){return hterm.Keyboard.KeyPattern.sortCompare(a.keyPattern,b.keyPattern);});}}};/**
 * Add a new binding.
 *
 * If a binding for the keyPattern already exists it will be overridden.
 *
 * More specific keyPatterns take precedence over those with wildcards.  Given
 * bindings for "Ctrl-A" and "Ctrl-*-A", and a "Ctrl-A" keydown, the "Ctrl-A"
 * binding will match even if "Ctrl-*-A" was created last.
 *
 * If action is a string, it will be passed through hterm.Parser.parseKeyAction.
 *
 * For example:
 *   // Will replace Ctrl-P keystrokes with the string "hiya!".
 *   addBinding('Ctrl-P', "'hiya!'");
 *   // Will cancel the keystroke entirely (make it do nothing).
 *   addBinding('Alt-D', hterm.Keyboard.KeyActions.CANCEL);
 *   // Will execute the code and return the action.
 *   addBinding('Ctrl-T', function() {
 *     console.log('Got a T!');
 *     return hterm.Keyboard.KeyActions.PASS;
 *   });
 *
 * @param {string|hterm.Keyboard.KeyPattern} keyPattern
 * @param {string|function|hterm.Keyboard.KeyAction} action
 */hterm.Keyboard.Bindings.prototype.addBinding=function(key,action){// If we're given a hterm.Keyboard.KeyPattern object, pass it down.
if(typeof key!='string'){this.addBinding_(key,action);return;}// Here we treat key as a string.
var p=new hterm.Parser();p.reset(key);var sequence;try{sequence=p.parseKeySequence();}catch(ex){console.error(ex);return;}if(!p.isComplete()){console.error(p.error('Expected end of sequence: '+sequence));return;}// If action is a string, parse it.  Otherwise assume it's callable.
if(typeof action=='string'){p.reset(action);try{action=p.parseKeyAction();}catch(ex){console.error(ex);return;}}if(!p.isComplete()){console.error(p.error('Expected end of sequence: '+sequence));return;}this.addBinding_(new hterm.Keyboard.KeyPattern(sequence),action);};/**
 * Add multiple bindings at a time using a map of {string: string, ...}
 *
 * This uses hterm.Parser to parse the maps key into KeyPatterns, and the
 * map values into {string|function|KeyAction}.
 *
 * For example:
 *  {
 *    // Will replace Ctrl-P keystrokes with the string "hiya!".
 *    'Ctrl-P': "'hiya!'",
 *    // Will cancel the keystroke entirely (make it do nothing).
 *    'Alt-D': hterm.Keyboard.KeyActions.CANCEL,
 *  }
 *
 * @param {Object} map
 */hterm.Keyboard.Bindings.prototype.addBindings=function(map){for(var key in map){this.addBinding(key,map[key]);}};/**
 * Return the binding that is the best match for the given keyDown record,
 * or null if there is no match.
 *
 * @param {Object} keyDown An object with a keyCode property and zero or
 *   more boolean properties representing key modifiers.  These property names
 *   must match those defined in hterm.Keyboard.KeyPattern.modifiers.
 */hterm.Keyboard.Bindings.prototype.getBinding=function(keyDown){var list=this.bindings_[keyDown.keyCode];if(!list)return null;for(var i=0;i<list.length;i++){var binding=list[i];if(binding.keyPattern.matchKeyDown(keyDown))return binding;}return null;};// SOURCE FILE: hterm/js/hterm_keyboard_keymap.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';lib.rtdep('hterm.Keyboard.KeyActions');/**
 * The default key map for hterm.
 *
 * Contains a mapping of keyCodes to keyDefs (aka key definitions).  The key
 * definition tells the hterm.Keyboard class how to handle keycodes.
 *
 * This should work for most cases, as the printable characters get handled
 * in the keypress event.  In that case, even if the keycap is wrong in the
 * key map, the correct character should be sent.
 *
 * Different layouts, such as Dvorak should work with this keymap, as those
 * layouts typically move keycodes around on the keyboard without disturbing
 * the actual keycaps.
 *
 * There may be issues with control keys on non-US keyboards or with keyboards
 * that very significantly from the expectations here, in which case we may
 * have to invent new key maps.
 *
 * The sequences defined in this key map come from [XTERM] as referenced in
 * vt.js, starting with the section titled "Alt and Meta Keys".
 */hterm.Keyboard.KeyMap=function(keyboard){this.keyboard=keyboard;this.keyDefs={};this.reset();};/**
 * Add a single key definition.
 *
 * The definition is a hash containing the following keys: 'keyCap', 'normal',
 * 'control', and 'alt'.
 *
 *  - keyCap is a string identifying the key.  For printable
 *    keys, the key cap should be exactly two characters, starting with the
 *    unshifted version.  For example, 'aA', 'bB', '1!' and '=+'.  For
 *    non-printable the key cap should be surrounded in square braces, as in
 *    '[INS]', '[LEFT]'.  By convention, non-printable keycaps are in uppercase
 *    but this is not a strict requirement.
 *
 *  - Normal is the action that should be performed when they key is pressed
 *    in the absence of any modifier.  See below for the supported actions.
 *
 *  - Control is the action that should be performed when they key is pressed
 *    along with the control modifier.  See below for the supported actions.
 *
 *  - Alt is the action that should be performed when they key is pressed
 *    along with the alt modifier.  See below for the supported actions.
 *
 *  - Meta is the action that should be performed when they key is pressed
 *    along with the meta modifier.  See below for the supported actions.
 *
 * Actions can be one of the hterm.Keyboard.KeyActions as documented below,
 * a literal string, or an array.  If the action is a literal string then
 * the string is sent directly to the host.  If the action is an array it
 * is taken to be an escape sequence that may be altered by modifier keys.
 * The second-to-last element of the array will be overwritten with the
 * state of the modifier keys, as specified in the final table of "PC-Style
 * Function Keys" from [XTERM].
 */hterm.Keyboard.KeyMap.prototype.addKeyDef=function(keyCode,def){if(keyCode in this.keyDefs)console.warn('Duplicate keyCode: '+keyCode);this.keyDefs[keyCode]=def;};/**
 * Add multiple key definitions in a single call.
 *
 * This function takes the key definitions as variable argument list.  Each
 * argument is the key definition specified as an array.
 *
 * (If the function took everything as one big hash we couldn't detect
 * duplicates, and there would be a lot more typing involved.)
 *
 * Each key definition should have 6 elements: (keyCode, keyCap, normal action,
 * control action, alt action and meta action).  See KeyMap.addKeyDef for the
 * meaning of these elements.
 */hterm.Keyboard.KeyMap.prototype.addKeyDefs=function(var_args){for(var i=0;i<arguments.length;i++){this.addKeyDef(arguments[i][0],{keyCap:arguments[i][1],normal:arguments[i][2],control:arguments[i][3],alt:arguments[i][4],meta:arguments[i][5]});}};/**
 * Set up the default state for this keymap.
 */hterm.Keyboard.KeyMap.prototype.reset=function(){this.keyDefs={};var self=this;// This function is used by the "macro" functions below.  It makes it
// possible to use the call() macro as an argument to any other macro.
function resolve(action,e,k){if(typeof action=='function')return action.apply(self,[e,k]);return action;}// If not application keypad a, else b.  The keys that care about
// application keypad ignore it when the key is modified.
function ak(a,b){return function(e,k){var action=e.shiftKey||e.ctrlKey||e.altKey||e.metaKey||!self.keyboard.applicationKeypad?a:b;return resolve(action,e,k);};}// If mod or not application cursor a, else b.  The keys that care about
// application cursor ignore it when the key is modified.
function ac(a,b){return function(e,k){var action=e.shiftKey||e.ctrlKey||e.altKey||e.metaKey||!self.keyboard.applicationCursor?a:b;return resolve(action,e,k);};}// If not backspace-sends-backspace keypad a, else b.
function bs(a,b){return function(e,k){var action=!self.keyboard.backspaceSendsBackspace?a:b;return resolve(action,e,k);};}// If not e.shiftKey a, else b.
function sh(a,b){return function(e,k){var action=!e.shiftKey?a:b;e.maskShiftKey=true;return resolve(action,e,k);};}// If not e.altKey a, else b.
function alt(a,b){return function(e,k){var action=!e.altKey?a:b;return resolve(action,e,k);};}// If no modifiers a, else b.
function mod(a,b){return function(e,k){var action=!(e.shiftKey||e.ctrlKey||e.altKey||e.metaKey)?a:b;return resolve(action,e,k);};}// Compute a control character for a given character.
function ctl(ch){return String.fromCharCode(ch.charCodeAt(0)-64);}// Call a method on the keymap instance.
function c(m){return function(e,k){return this[m](e,k);};}// Ignore if not trapping media keys.
function med(fn){return function(e,k){if(!self.keyboard.mediaKeysAreFKeys){// Block Back, Forward, and Reload keys to avoid navigating away from
// the current page.
return e.keyCode==166||e.keyCode==167||e.keyCode==168?hterm.Keyboard.KeyActions.CANCEL:hterm.Keyboard.KeyActions.PASS;}return resolve(fn,e,k);};}var ESC='\x1b';var CSI='\x1b[';var SS3='\x1bO';var CANCEL=hterm.Keyboard.KeyActions.CANCEL;var DEFAULT=hterm.Keyboard.KeyActions.DEFAULT;var PASS=hterm.Keyboard.KeyActions.PASS;var STRIP=hterm.Keyboard.KeyActions.STRIP;this.addKeyDefs(// These fields are: [keycode, keycap, normal, control, alt, meta]
// The browser sends the keycode 0 for some keys.  We'll just assume it's
// going to do the right thing by default for those keys.
[0,'[UNKNOWN]',PASS,PASS,PASS,PASS],// First row.
[27,'[ESC]',ESC,DEFAULT,DEFAULT,DEFAULT],[112,'[F1]',mod(SS3+'P',CSI+'P'),DEFAULT,CSI+"23~",DEFAULT],[113,'[F2]',mod(SS3+'Q',CSI+'Q'),DEFAULT,CSI+"24~",DEFAULT],[114,'[F3]',mod(SS3+'R',CSI+'R'),DEFAULT,CSI+"25~",DEFAULT],[115,'[F4]',mod(SS3+'S',CSI+'S'),DEFAULT,CSI+"26~",DEFAULT],[116,'[F5]',CSI+'15~',DEFAULT,CSI+"28~",DEFAULT],[117,'[F6]',CSI+'17~',DEFAULT,CSI+"29~",DEFAULT],[118,'[F7]',CSI+'18~',DEFAULT,CSI+"31~",DEFAULT],[119,'[F8]',CSI+'19~',DEFAULT,CSI+"32~",DEFAULT],[120,'[F9]',CSI+'20~',DEFAULT,CSI+"33~",DEFAULT],[121,'[F10]',CSI+'21~',DEFAULT,CSI+"34~",DEFAULT],[122,'[F11]',CSI+'23~',DEFAULT,CSI+"42~",DEFAULT],[123,'[F12]',CSI+'24~',DEFAULT,CSI+"43~",DEFAULT],// Second row.
[192,'`~',DEFAULT,sh(ctl('@'),ctl('^')),DEFAULT,PASS],[49,'1!',DEFAULT,c('onCtrlNum_'),c('onAltNum_'),c('onMetaNum_')],[50,'2@',DEFAULT,c('onCtrlNum_'),c('onAltNum_'),c('onMetaNum_')],[51,'3#',DEFAULT,c('onCtrlNum_'),c('onAltNum_'),c('onMetaNum_')],[52,'4$',DEFAULT,c('onCtrlNum_'),c('onAltNum_'),c('onMetaNum_')],[53,'5%',DEFAULT,c('onCtrlNum_'),c('onAltNum_'),c('onMetaNum_')],[54,'6^',DEFAULT,c('onCtrlNum_'),c('onAltNum_'),c('onMetaNum_')],[55,'7&',DEFAULT,c('onCtrlNum_'),c('onAltNum_'),c('onMetaNum_')],[56,'8*',DEFAULT,c('onCtrlNum_'),c('onAltNum_'),c('onMetaNum_')],[57,'9(',DEFAULT,c('onCtrlNum_'),c('onAltNum_'),c('onMetaNum_')],[48,'0)',DEFAULT,c('onPlusMinusZero_'),c('onAltNum_'),c('onPlusMinusZero_')],[189,'-_',DEFAULT,c('onPlusMinusZero_'),DEFAULT,c('onPlusMinusZero_')],[187,'=+',DEFAULT,c('onPlusMinusZero_'),DEFAULT,c('onPlusMinusZero_')],// Firefox -_ and =+
[173,'-_',DEFAULT,c('onPlusMinusZero_'),DEFAULT,c('onPlusMinusZero_')],[61,'=+',DEFAULT,c('onPlusMinusZero_'),DEFAULT,c('onPlusMinusZero_')],// Firefox Italian +*
[171,'+*',DEFAULT,c('onPlusMinusZero_'),DEFAULT,c('onPlusMinusZero_')],[8,'[BKSP]',bs('\x7f','\b'),bs('\b','\x7f'),DEFAULT,DEFAULT],// Third row.
[9,'[TAB]',sh('\t',CSI+'Z'),STRIP,PASS,DEFAULT],[81,'qQ',DEFAULT,ctl('Q'),DEFAULT,DEFAULT],[87,'wW',DEFAULT,ctl('W'),DEFAULT,DEFAULT],[69,'eE',DEFAULT,ctl('E'),DEFAULT,DEFAULT],[82,'rR',DEFAULT,ctl('R'),DEFAULT,DEFAULT],[84,'tT',DEFAULT,ctl('T'),DEFAULT,DEFAULT],[89,'yY',DEFAULT,ctl('Y'),DEFAULT,DEFAULT],[85,'uU',DEFAULT,ctl('U'),DEFAULT,DEFAULT],[73,'iI',DEFAULT,ctl('I'),DEFAULT,DEFAULT],[79,'oO',DEFAULT,ctl('O'),DEFAULT,DEFAULT],[80,'pP',DEFAULT,ctl('P'),DEFAULT,DEFAULT],[219,'[{',DEFAULT,ctl('['),DEFAULT,DEFAULT],[221,']}',DEFAULT,ctl(']'),DEFAULT,DEFAULT],[220,'\\|',DEFAULT,ctl('\\'),DEFAULT,DEFAULT],// Fourth row. (We let Ctrl-Shift-J pass for Chrome DevTools.)
[20,'[CAPS]',PASS,PASS,PASS,DEFAULT],[65,'aA',DEFAULT,ctl('A'),DEFAULT,DEFAULT],[83,'sS',DEFAULT,ctl('S'),DEFAULT,DEFAULT],[68,'dD',DEFAULT,ctl('D'),DEFAULT,DEFAULT],[70,'fF',DEFAULT,ctl('F'),DEFAULT,DEFAULT],[71,'gG',DEFAULT,ctl('G'),DEFAULT,DEFAULT],[72,'hH',DEFAULT,ctl('H'),DEFAULT,DEFAULT],[74,'jJ',DEFAULT,sh(ctl('J'),PASS),DEFAULT,DEFAULT],[75,'kK',DEFAULT,sh(ctl('K'),c('onClear_')),DEFAULT,DEFAULT],[76,'lL',DEFAULT,sh(ctl('L'),PASS),DEFAULT,DEFAULT],[186,';:',DEFAULT,STRIP,DEFAULT,DEFAULT],[222,'\'"',DEFAULT,STRIP,DEFAULT,DEFAULT],[13,'[ENTER]','\r',CANCEL,CANCEL,DEFAULT],// Fifth row.  This includes the copy/paste shortcuts.  On some
// platforms it's Ctrl-C/V, on others it's Meta-C/V.  We assume either
// Ctrl-C/Meta-C should pass to the browser when there is a selection,
// and Ctrl-Shift-V/Meta-*-V should always pass to the browser (since
// these seem to be recognized as paste too).
[16,'[SHIFT]',PASS,PASS,PASS,DEFAULT],[90,'zZ',DEFAULT,ctl('Z'),DEFAULT,DEFAULT],[88,'xX',DEFAULT,ctl('X'),DEFAULT,DEFAULT],[67,'cC',DEFAULT,c('onCtrlC_'),DEFAULT,c('onMetaC_')],[86,'vV',DEFAULT,c('onCtrlV_'),DEFAULT,c('onMetaV_')],[66,'bB',DEFAULT,sh(ctl('B'),PASS),DEFAULT,sh(DEFAULT,PASS)],[78,'nN',DEFAULT,c('onCtrlN_'),DEFAULT,c('onMetaN_')],[77,'mM',DEFAULT,ctl('M'),DEFAULT,DEFAULT],[188,',<',DEFAULT,alt(STRIP,PASS),DEFAULT,DEFAULT],[190,'.>',DEFAULT,alt(STRIP,PASS),DEFAULT,DEFAULT],[191,'/?',DEFAULT,sh(ctl('_'),ctl('?')),DEFAULT,DEFAULT],// Sixth and final row.
[17,'[CTRL]',PASS,PASS,PASS,PASS],[18,'[ALT]',PASS,PASS,PASS,PASS],[91,'[LAPL]',PASS,PASS,PASS,PASS],[32,' ',DEFAULT,ctl('@'),DEFAULT,DEFAULT],[92,'[RAPL]',PASS,PASS,PASS,PASS],[93,'[RMENU]',PASS,PASS,PASS,PASS],// These things.
[42,'[PRTSCR]',PASS,PASS,PASS,PASS],[145,'[SCRLK]',PASS,PASS,PASS,PASS],[19,'[BREAK]',PASS,PASS,PASS,PASS],// The block of six keys above the arrows.
[45,'[INSERT]',c('onKeyInsert_'),DEFAULT,DEFAULT,DEFAULT],[36,'[HOME]',c('onKeyHome_'),DEFAULT,DEFAULT,DEFAULT],[33,'[PGUP]',c('onKeyPageUp_'),DEFAULT,DEFAULT,DEFAULT],[46,'[DEL]',c('onKeyDel_'),DEFAULT,DEFAULT,DEFAULT],[35,'[END]',c('onKeyEnd_'),DEFAULT,DEFAULT,DEFAULT],[34,'[PGDOWN]',c('onKeyPageDown_'),DEFAULT,DEFAULT,DEFAULT],// Arrow keys.  When unmodified they respect the application cursor state,
// otherwise they always send the CSI codes.
[38,'[UP]',c('onKeyArrowUp_'),DEFAULT,DEFAULT,DEFAULT],[40,'[DOWN]',c('onKeyArrowDown_'),DEFAULT,DEFAULT,DEFAULT],[39,'[RIGHT]',ac(CSI+'C',SS3+'C'),DEFAULT,DEFAULT,DEFAULT],[37,'[LEFT]',ac(CSI+'D',SS3+'D'),DEFAULT,DEFAULT,DEFAULT],[144,'[NUMLOCK]',PASS,PASS,PASS,PASS],// With numlock off, the keypad generates the same key codes as the arrows
// and 'block of six' for some keys, and null key codes for the rest.
// Keypad with numlock on generates unique key codes...
[96,'[KP0]',DEFAULT,DEFAULT,DEFAULT,DEFAULT],[97,'[KP1]',DEFAULT,DEFAULT,DEFAULT,DEFAULT],[98,'[KP2]',DEFAULT,DEFAULT,DEFAULT,DEFAULT],[99,'[KP3]',DEFAULT,DEFAULT,DEFAULT,DEFAULT],[100,'[KP4]',DEFAULT,DEFAULT,DEFAULT,DEFAULT],[101,'[KP5]',DEFAULT,DEFAULT,DEFAULT,DEFAULT],[102,'[KP6]',DEFAULT,DEFAULT,DEFAULT,DEFAULT],[103,'[KP7]',DEFAULT,DEFAULT,DEFAULT,DEFAULT],[104,'[KP8]',DEFAULT,DEFAULT,DEFAULT,DEFAULT],[105,'[KP9]',DEFAULT,DEFAULT,DEFAULT,DEFAULT],[107,'[KP+]',DEFAULT,c('onPlusMinusZero_'),DEFAULT,c('onPlusMinusZero_')],[109,'[KP-]',DEFAULT,c('onPlusMinusZero_'),DEFAULT,c('onPlusMinusZero_')],[106,'[KP*]',DEFAULT,DEFAULT,DEFAULT,DEFAULT],[111,'[KP/]',DEFAULT,DEFAULT,DEFAULT,DEFAULT],[110,'[KP.]',DEFAULT,DEFAULT,DEFAULT,DEFAULT],// Chrome OS keyboard top row.
[166,'[BACK]',med(mod(SS3+'P',CSI+'P')),DEFAULT,CSI+"23~",DEFAULT],[167,'[FWD]',med(mod(SS3+'Q',CSI+'Q')),DEFAULT,CSI+"24~",DEFAULT],[168,'[RELOAD]',med(mod(SS3+'R',CSI+'R')),DEFAULT,CSI+"25~",DEFAULT],[183,'[FSCR]',med(mod(SS3+'S',CSI+'S')),DEFAULT,CSI+"26~",DEFAULT],[182,'[WINS]',med(CSI+'15~'),DEFAULT,CSI+"28~",DEFAULT],[216,'[BRIT-]',med(CSI+'17~'),DEFAULT,CSI+"29~",DEFAULT],[217,'[BRIT+]',med(CSI+'18~'),DEFAULT,CSI+"31~",DEFAULT]// 173 [MUTE], 174 [VOL-] and 175 [VOL+] are trapped by the Chrome OS
// window manager, so we'll never see them. Note that 173 is also
// Firefox's -_ keycode.
);};/**
 * Either allow the paste or send a key sequence.
 */hterm.Keyboard.KeyMap.prototype.onKeyInsert_=function(e){if(this.keyboard.shiftInsertPaste&&e.shiftKey)return hterm.Keyboard.KeyActions.PASS;return'\x1b[2~';};/**
 * Either scroll the scrollback buffer or send a key sequence.
 */hterm.Keyboard.KeyMap.prototype.onKeyHome_=function(e){if(!this.keyboard.homeKeysScroll^e.shiftKey){if(e.altey||e.ctrlKey||e.shiftKey||!this.keyboard.applicationCursor){return'\x1b[H';}return'\x1bOH';}this.keyboard.terminal.scrollHome();return hterm.Keyboard.KeyActions.CANCEL;};/**
 * Either scroll the scrollback buffer or send a key sequence.
 */hterm.Keyboard.KeyMap.prototype.onKeyEnd_=function(e){if(!this.keyboard.homeKeysScroll^e.shiftKey){if(e.altKey||e.ctrlKey||e.shiftKey||!this.keyboard.applicationCursor){return'\x1b[F';}return'\x1bOF';}this.keyboard.terminal.scrollEnd();return hterm.Keyboard.KeyActions.CANCEL;};/**
 * Either scroll the scrollback buffer or send a key sequence.
 */hterm.Keyboard.KeyMap.prototype.onKeyPageUp_=function(e){if(!this.keyboard.pageKeysScroll^e.shiftKey)return'\x1b[5~';this.keyboard.terminal.scrollPageUp();return hterm.Keyboard.KeyActions.CANCEL;};/**
 * Either send a true DEL, or sub in meta-backspace.
 *
 * On Chrome OS, if we know the alt key is down, but we get a DEL event that
 * claims that the alt key is not pressed, we know the DEL was a synthetic
 * one from a user that hit alt-backspace. Based on a user pref, we can sub
 * in meta-backspace in this case.
 */hterm.Keyboard.KeyMap.prototype.onKeyDel_=function(e){if(this.keyboard.altBackspaceIsMetaBackspace&&this.keyboard.altKeyPressed&&!e.altKey)return'\x1b\x7f';return'\x1b[3~';};/**
 * Either scroll the scrollback buffer or send a key sequence.
 */hterm.Keyboard.KeyMap.prototype.onKeyPageDown_=function(e){if(!this.keyboard.pageKeysScroll^e.shiftKey)return'\x1b[6~';this.keyboard.terminal.scrollPageDown();return hterm.Keyboard.KeyActions.CANCEL;};/**
 * Either scroll the scrollback buffer or send a key sequence.
 */hterm.Keyboard.KeyMap.prototype.onKeyArrowUp_=function(e){if(!this.keyboard.applicationCursor&&e.shiftKey){this.keyboard.terminal.scrollLineUp();return hterm.Keyboard.KeyActions.CANCEL;}return e.shiftKey||e.ctrlKey||e.altKey||e.metaKey||!this.keyboard.applicationCursor?'\x1b[A':'\x1bOA';};/**
 * Either scroll the scrollback buffer or send a key sequence.
 */hterm.Keyboard.KeyMap.prototype.onKeyArrowDown_=function(e){if(!this.keyboard.applicationCursor&&e.shiftKey){this.keyboard.terminal.scrollLineDown();return hterm.Keyboard.KeyActions.CANCEL;}return e.shiftKey||e.ctrlKey||e.altKey||e.metaKey||!this.keyboard.applicationCursor?'\x1b[B':'\x1bOB';};/**
 * Clear the primary/alternate screens and the scrollback buffer.
 */hterm.Keyboard.KeyMap.prototype.onClear_=function(e,keyDef){this.keyboard.terminal.wipeContents();return hterm.Keyboard.KeyActions.CANCEL;};/**
 * Either pass Ctrl-1..9 to the browser or send them to the host.
 *
 * Note that Ctrl-1 and Ctrl-9 don't actually have special sequences mapped
 * to them in xterm or gnome-terminal.  The range is really Ctrl-2..8, but
 * we handle 1..9 since Chrome treats the whole range special.
 */hterm.Keyboard.KeyMap.prototype.onCtrlNum_=function(e,keyDef){// Compute a control character for a given character.
function ctl(ch){return String.fromCharCode(ch.charCodeAt(0)-64);}if(this.keyboard.terminal.passCtrlNumber&&!e.shiftKey)return hterm.Keyboard.KeyActions.PASS;switch(keyDef.keyCap.substr(0,1)){case'1':return'1';case'2':return ctl('@');case'3':return ctl('[');case'4':return ctl('\\');case'5':return ctl(']');case'6':return ctl('^');case'7':return ctl('_');case'8':return'\x7f';case'9':return'9';}};/**
 * Either pass Alt-1..9 to the browser or send them to the host.
 */hterm.Keyboard.KeyMap.prototype.onAltNum_=function(e,keyDef){if(this.keyboard.terminal.passAltNumber&&!e.shiftKey)return hterm.Keyboard.KeyActions.PASS;return hterm.Keyboard.KeyActions.DEFAULT;};/**
 * Either pass Meta-1..9 to the browser or send them to the host.
 */hterm.Keyboard.KeyMap.prototype.onMetaNum_=function(e,keyDef){if(this.keyboard.terminal.passMetaNumber&&!e.shiftKey)return hterm.Keyboard.KeyActions.PASS;return hterm.Keyboard.KeyActions.DEFAULT;};/**
 * Either send a ^C or interpret the keystroke as a copy command.
 */hterm.Keyboard.KeyMap.prototype.onCtrlC_=function(e,keyDef){var selection=this.keyboard.terminal.getDocument().getSelection();if(!selection.isCollapsed){if(this.keyboard.ctrlCCopy&&!e.shiftKey){// Ctrl-C should copy if there is a selection, send ^C otherwise.
// Perform the copy by letting the browser handle Ctrl-C.  On most
// browsers, this is the *only* way to place text on the clipboard from
// the 'drive-by' web.
if(this.keyboard.terminal.clearSelectionAfterCopy){setTimeout(selection.collapseToEnd.bind(selection),50);}return hterm.Keyboard.KeyActions.PASS;}if(!this.keyboard.ctrlCCopy&&e.shiftKey){// Ctrl-Shift-C should copy if there is a selection, send ^C otherwise.
// Perform the copy manually.  This only works in situations where
// document.execCommand('copy') is allowed.
if(this.keyboard.terminal.clearSelectionAfterCopy){setTimeout(selection.collapseToEnd.bind(selection),50);}this.keyboard.terminal.copySelectionToClipboard();return hterm.Keyboard.KeyActions.CANCEL;}}return'\x03';};/**
 * Either send a ^N or open a new window to the same location.
 */hterm.Keyboard.KeyMap.prototype.onCtrlN_=function(e,keyDef){if(e.shiftKey){window.open(document.location.href,'','chrome=no,close=yes,resize=yes,scrollbars=yes,'+'minimizable=yes,width='+window.innerWidth+',height='+window.innerHeight);return hterm.Keyboard.KeyActions.CANCEL;}return'\x0e';};/**
 * Either send a ^V or issue a paste command.
 *
 * The default behavior is to paste if the user presses Ctrl-Shift-V, and send
 * a ^V if the user presses Ctrl-V. This can be flipped with the
 * 'ctrl-v-paste' preference.
 *
 */hterm.Keyboard.KeyMap.prototype.onCtrlV_=function(e,keyDef){if(!e.shiftKey&&this.keyboard.ctrlVPaste||e.shiftKey&&!this.keyboard.ctrlVPaste){// We try to do the pasting ourselves as not all browsers/OSs bind Ctrl-V to
// pasting.  Notably, on macOS, Ctrl-V/Ctrl-Shift-V do nothing.
// However, this might run into web restrictions, so if it fails, we still
// fallback to the letting the native behavior (hopefully) save us.
if(this.keyboard.terminal.paste())return hterm.Keyboard.KeyActions.CANCEL;else return hterm.Keyboard.KeyActions.PASS;}return'\x16';};/**
 * Either the default action or open a new window to the same location.
 */hterm.Keyboard.KeyMap.prototype.onMetaN_=function(e,keyDef){if(e.shiftKey){window.open(document.location.href,'','chrome=no,close=yes,resize=yes,scrollbars=yes,'+'minimizable=yes,width='+window.outerWidth+',height='+window.outerHeight);return hterm.Keyboard.KeyActions.CANCEL;}return hterm.Keyboard.KeyActions.DEFAULT;};/**
 * Either send a Meta-C or allow the browser to interpret the keystroke as a
 * copy command.
 *
 * If there is no selection, or if the user presses Meta-Shift-C, then we'll
 * transmit an '\x1b' (if metaSendsEscape is on) followed by 'c' or 'C'.
 *
 * If there is a selection, we defer to the browser.  In this case we clear out
 * the selection so the user knows we heard them, and also to give them a
 * chance to send a Meta-C by just hitting the key again.
 */hterm.Keyboard.KeyMap.prototype.onMetaC_=function(e,keyDef){var document=this.keyboard.terminal.getDocument();if(e.shiftKey||document.getSelection().isCollapsed){// If the shift key is being held, or there is no document selection, send
// a Meta-C.  The keyboard code will add the ESC if metaSendsEscape is true,
// we just have to decide between 'c' and 'C'.
return keyDef.keyCap.substr(e.shiftKey?1:0,1);}// Otherwise let the browser handle it as a copy command.
if(this.keyboard.terminal.clearSelectionAfterCopy){setTimeout(function(){document.getSelection().collapseToEnd();},50);}return hterm.Keyboard.KeyActions.PASS;};/**
 * Either PASS or DEFAULT Meta-V, depending on preference.
 *
 * Always PASS Meta-Shift-V to allow browser to interpret the keystroke as
 * a paste command.
 */hterm.Keyboard.KeyMap.prototype.onMetaV_=function(e,keyDef){if(e.shiftKey)return hterm.Keyboard.KeyActions.PASS;return this.keyboard.passMetaV?hterm.Keyboard.KeyActions.PASS:hterm.Keyboard.KeyActions.DEFAULT;};/**
 * Handle font zooming.
 *
 * The browser's built-in zoom has a bit of an issue at certain zoom levels.
 * At some magnifications, the measured height of a row of text differs from
 * the height that was explicitly set.
 *
 * We override the browser zoom keys to change the ScrollPort's font size to
 * avoid the issue.
 */hterm.Keyboard.KeyMap.prototype.onPlusMinusZero_=function(e,keyDef){if(!(this.keyboard.ctrlPlusMinusZeroZoom^e.shiftKey)){// If ctrl-PMZ controls zoom and the shift key is pressed, or
// ctrl-shift-PMZ controls zoom and this shift key is not pressed,
// then we want to send the control code instead of affecting zoom.
if(keyDef.keyCap=='-_')return'\x1f';// ^_
// Only ^_ is valid, the other sequences have no meaning.
return hterm.Keyboard.KeyActions.CANCEL;}if(this.keyboard.terminal.getZoomFactor()!=1){// If we're not at 1:1 zoom factor, let the Ctrl +/-/0 keys control the
// browser zoom, so it's easier to for the user to get back to 100%.
return hterm.Keyboard.KeyActions.PASS;}var cap=keyDef.keyCap.substr(0,1);if(cap=='0'){this.keyboard.terminal.setFontSize(0);}else{var size=this.keyboard.terminal.getFontSize();if(cap=='-'||keyDef.keyCap=='[KP-]'){size-=1;}else{size+=1;}this.keyboard.terminal.setFontSize(size);}return hterm.Keyboard.KeyActions.CANCEL;};// SOURCE FILE: hterm/js/hterm_keyboard_keypattern.js
// Copyright (c) 2015 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * A record of modifier bits and keycode used to define a key binding.
 *
 * The modifier names are enumerated in the static KeyPattern.modifiers
 * property below.  Each modifier can be true, false, or "*".  True means
 * the modifier key must be present, false means it must not, and "*" means
 * it doesn't matter.
 */hterm.Keyboard.KeyPattern=function(spec){this.wildcardCount=0;this.keyCode=spec.keyCode;hterm.Keyboard.KeyPattern.modifiers.forEach(function(mod){this[mod]=spec[mod]||false;if(this[mod]=='*')this.wildcardCount++;}.bind(this));};/**
 * Valid modifier names.
 */hterm.Keyboard.KeyPattern.modifiers=['shift','ctrl','alt','meta'];/**
 * A compare callback for Array.prototype.sort().
 *
 * The bindings code wants to be sure to search through the strictest key
 * patterns first, so that loosely defined patterns have a lower priority than
 * exact patterns.
 *
 * @param {hterm.Keyboard.KeyPattern} a
 * @param {hterm.Keyboard.KeyPattern} b
 */hterm.Keyboard.KeyPattern.sortCompare=function(a,b){if(a.wildcardCount<b.wildcardCount)return-1;if(a.wildcardCount>b.wildcardCount)return 1;return 0;};/**
 * Private method used to match this key pattern against other key patterns
 * or key down events.
 *
 * @param {Object} The object to match.
 * @param {boolean} True if we should ignore wildcards.  Useful when you want
 *   to perform and exact match against another key pattern.
 */hterm.Keyboard.KeyPattern.prototype.match_=function(obj,exactMatch){if(this.keyCode!=obj.keyCode)return false;var rv=true;hterm.Keyboard.KeyPattern.modifiers.forEach(function(mod){var modValue=mod in obj?obj[mod]:false;if(!rv||!exactMatch&&this[mod]=='*'||this[mod]==modValue)return;rv=false;}.bind(this));return rv;};/**
 * Return true if the given keyDown object is a match for this key pattern.
 *
 * @param {Object} keyDown An object with a keyCode property and zero or
 *   more boolean properties representing key modifiers.  These property names
 *   must match those defined in hterm.Keyboard.KeyPattern.modifiers.
 */hterm.Keyboard.KeyPattern.prototype.matchKeyDown=function(keyDown){return this.match_(keyDown,false);};/**
 * Return true if the given hterm.Keyboard.KeyPattern is exactly the same as
 * this one.
 *
 * @param {hterm.Keyboard.KeyPattern}
 */hterm.Keyboard.KeyPattern.prototype.matchKeyPattern=function(keyPattern){return this.match_(keyPattern,true);};// SOURCE FILE: hterm/js/hterm_options.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * @fileoverview This file implements the hterm.Options class,
 * which stores current operating conditions for the terminal.  This object is
 * used instead of a series of parameters to allow saving/restoring of cursor
 * conditions easily, and to provide an easy place for common configuration
 * options.
 *
 * Original code by Cory Maccarrone.
 *//**
 * Constructor for the hterm.Options class, optionally acting as a copy
 * constructor.
 *
 * The defaults are as defined in http://www.vt100.net/docs/vt510-rm/DECSTR
 * except that we enable autowrap (wraparound) by default since that seems to
 * be what xterm does.
 *
 * @param {hterm.Options=} opt_copy Optional instance to copy.
 * @constructor
 */hterm.Options=function(opt_copy){// All attributes in this class are public to allow easy access by the
// terminal.
this.wraparound=opt_copy?opt_copy.wraparound:true;this.reverseWraparound=opt_copy?opt_copy.reverseWraparound:false;this.originMode=opt_copy?opt_copy.originMode:false;this.autoCarriageReturn=opt_copy?opt_copy.autoCarriageReturn:false;this.cursorVisible=opt_copy?opt_copy.cursorVisible:false;this.cursorBlink=opt_copy?opt_copy.cursorBlink:false;this.insertMode=opt_copy?opt_copy.insertMode:false;this.reverseVideo=opt_copy?opt_copy.reverseVideo:false;this.bracketedPaste=opt_copy?opt_copy.bracketedPaste:false;};// SOURCE FILE: hterm/js/hterm_parser.js
// Copyright (c) 2015 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';lib.rtdep('hterm.Keyboard.KeyActions');/**
 * @constructor
 * Parses the key definition syntax used for user keyboard customizations.
 */hterm.Parser=function(){/**
   * @type {string} The source string.
   */this.source='';/**
   * @type {number} The current position.
   */this.pos=0;/**
   * @type {string?} The character at the current position.
   */this.ch=null;};hterm.Parser.prototype.error=function(message){return new Error('Parse error at '+this.pos+': '+message);};hterm.Parser.prototype.isComplete=function(){return this.pos==this.source.length;};hterm.Parser.prototype.reset=function(source,opt_pos){this.source=source;this.pos=opt_pos||0;this.ch=source.substr(0,1);};/**
 * Parse a key sequence.
 *
 * A key sequence is zero or more of the key modifiers defined in
 * hterm.Parser.identifiers.modifierKeys followed by a key code.  Key
 * codes can be an integer or an identifier from
 * hterm.Parser.identifiers.keyCodes.  Modifiers and keyCodes should be joined
 * by the dash character.
 *
 * An asterisk "*" can be used to indicate that the unspecified modifiers
 * are optional.
 *
 * For example:
 *   A: Matches only an unmodified "A" character.
 *   65: Same as above.
 *   0x41: Same as above.
 *   Ctrl-A: Matches only Ctrl-A.
 *   Ctrl-65: Same as above.
 *   Ctrl-0x41: Same as above.
 *   Ctrl-Shift-A: Matches only Ctrl-Shift-A.
 *   Ctrl-*-A: Matches Ctrl-A, as well as any other key sequence that includes
 *     at least the Ctrl and A keys.
 *
 * @return {Object} An object with shift, ctrl, alt, meta, keyCode
 *   properties.
 */hterm.Parser.prototype.parseKeySequence=function(){var rv={keyCode:null};for(var k in hterm.Parser.identifiers.modifierKeys){rv[hterm.Parser.identifiers.modifierKeys[k]]=false;}while(this.pos<this.source.length){this.skipSpace();var token=this.parseToken();if(token.type=='integer'){rv.keyCode=token.value;}else if(token.type=='identifier'){var ucValue=token.value.toUpperCase();if(ucValue in hterm.Parser.identifiers.modifierKeys&&hterm.Parser.identifiers.modifierKeys.hasOwnProperty(ucValue)){var mod=hterm.Parser.identifiers.modifierKeys[ucValue];if(rv[mod]&&rv[mod]!='*')throw this.error('Duplicate modifier: '+token.value);rv[mod]=true;}else if(ucValue in hterm.Parser.identifiers.keyCodes&&hterm.Parser.identifiers.keyCodes.hasOwnProperty(ucValue)){rv.keyCode=hterm.Parser.identifiers.keyCodes[ucValue];}else{throw this.error('Unknown key: '+token.value);}}else if(token.type=='symbol'){if(token.value=='*'){for(var id in hterm.Parser.identifiers.modifierKeys){var p=hterm.Parser.identifiers.modifierKeys[id];if(!rv[p])rv[p]='*';}}else{throw this.error('Unexpected symbol: '+token.value);}}else{throw this.error('Expected integer or identifier');}this.skipSpace();if(this.ch!='-')break;if(rv.keyCode!=null)throw this.error('Extra definition after target key');this.advance(1);}if(rv.keyCode==null)throw this.error('Missing target key');return rv;};hterm.Parser.prototype.parseKeyAction=function(){this.skipSpace();var token=this.parseToken();if(token.type=='string')return token.value;if(token.type=='identifier'){if(token.value in hterm.Parser.identifiers.actions&&hterm.Parser.identifiers.actions.hasOwnProperty(token.value))return hterm.Parser.identifiers.actions[token.value];throw this.error('Unknown key action: '+token.value);}throw this.error('Expected string or identifier');};hterm.Parser.prototype.peekString=function(){return this.ch=='\''||this.ch=='"';};hterm.Parser.prototype.peekIdentifier=function(){return this.ch.match(/[a-z_]/i);};hterm.Parser.prototype.peekInteger=function(){return this.ch.match(/[0-9]/);};hterm.Parser.prototype.parseToken=function(){if(this.ch=='*'){var rv={type:'symbol',value:this.ch};this.advance(1);return rv;}if(this.peekIdentifier())return{type:'identifier',value:this.parseIdentifier()};if(this.peekString())return{type:'string',value:this.parseString()};if(this.peekInteger())return{type:'integer',value:this.parseInteger()};throw this.error('Unexpected token');};hterm.Parser.prototype.parseIdentifier=function(){if(!this.peekIdentifier())throw this.error('Expected identifier');return this.parsePattern(/[a-z0-9_]+/ig);};hterm.Parser.prototype.parseInteger=function(){var base=10;if(this.ch=='0'&&this.pos<this.source.length-1&&this.source.substr(this.pos+1,1)=='x'){return parseInt(this.parsePattern(/0x[0-9a-f]+/gi));}return parseInt(this.parsePattern(/\d+/g));};/**
 * Parse a single or double quoted string.
 *
 * The current position should point at the initial quote character.  Single
 * quoted strings will be treated literally, double quoted will process escapes.
 *
 * TODO(rginda): Variable interpolation.
 *
 * @param {ParseState} parseState
 * @param {string} quote A single or double-quote character.
 * @return {string}
 */hterm.Parser.prototype.parseString=function(){var result='';var quote=this.ch;if(quote!='"'&&quote!='\'')throw this.error('String expected');this.advance(1);var re=new RegExp('[\\\\'+quote+']','g');while(this.pos<this.source.length){re.lastIndex=this.pos;if(!re.exec(this.source))throw this.error('Unterminated string literal');result+=this.source.substring(this.pos,re.lastIndex-1);this.advance(re.lastIndex-this.pos-1);if(quote=='"'&&this.ch=='\\'){this.advance(1);result+=this.parseEscape();continue;}if(quote=='\''&&this.ch=='\\'){result+=this.ch;this.advance(1);continue;}if(this.ch==quote){this.advance(1);return result;}}throw this.error('Unterminated string literal');};/**
 * Parse an escape code from the current position (which should point to
 * the first character AFTER the leading backslash.)
 *
 * @return {string}
 */hterm.Parser.prototype.parseEscape=function(){var map={'"':'"','\'':'\'','\\':'\\','a':'\x07','b':'\x08','e':'\x1b','f':'\x0c','n':'\x0a','r':'\x0d','t':'\x09','v':'\x0b','x':function x(){var value=this.parsePattern(/[a-z0-9]{2}/ig);return String.fromCharCode(parseInt(value,16));},'u':function u(){var value=this.parsePattern(/[a-z0-9]{4}/ig);return String.fromCharCode(parseInt(value,16));}};if(!(this.ch in map&&map.hasOwnProperty(this.ch)))throw this.error('Unknown escape: '+this.ch);var value=map[this.ch];this.advance(1);if(typeof value=='function')value=value.call(this);return value;};/**
 * Parse the given pattern starting from the current position.
 *
 * @param {RegExp} pattern A pattern representing the characters to span.  MUST
 *   include the "global" RegExp flag.
 * @return {string}
 */hterm.Parser.prototype.parsePattern=function(pattern){if(!pattern.global)throw this.error('Internal error: Span patterns must be global');pattern.lastIndex=this.pos;var ary=pattern.exec(this.source);if(!ary||pattern.lastIndex-ary[0].length!=this.pos)throw this.error('Expected match for: '+pattern);this.pos=pattern.lastIndex-1;this.advance(1);return ary[0];};/**
 * Advance the current position.
 *
 * @param {number} count
 */hterm.Parser.prototype.advance=function(count){this.pos+=count;this.ch=this.source.substr(this.pos,1);};/**
 * @param {string=} opt_expect A list of valid non-whitespace characters to
 *   terminate on.
 * @return {void}
 */hterm.Parser.prototype.skipSpace=function(opt_expect){if(!/\s/.test(this.ch))return;var re=/\s+/gm;re.lastIndex=this.pos;var source=this.source;if(re.exec(source))this.pos=re.lastIndex;this.ch=this.source.substr(this.pos,1);if(opt_expect){if(this.ch.indexOf(opt_expect)==-1){throw this.error('Expected one of '+opt_expect+', found: '+this.ch);}}};// SOURCE FILE: hterm/js/hterm_parser_identifiers.js
// Copyright (c) 2015 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * Collections of identifier for hterm.Parser.
 */hterm.Parser.identifiers={};/**
 * Modifier key names used when defining key sequences.
 *
 * These are upper case so we can normalize the user input and be forgiving.
 * "CTRL-A" and "Ctrl-A" and "ctrl-a" are all accepted.
 *
 * Note: Names here cannot overlap with hterm.Parser.identifiers.keyCodes.
 */hterm.Parser.identifiers.modifierKeys={SHIFT:'shift',CTRL:'ctrl',// Common alias.
CONTROL:'ctrl',ALT:'alt',META:'meta'};/**
 * Key codes useful when defining key sequences.
 *
 * Punctuation is mostly left out of this list because they can move around
 * based on keyboard locale and browser.
 *
 * In a key sequence like "Ctrl-ESC", the ESC comes from this list of
 * identifiers.  It is equivalent to "Ctrl-27" and "Ctrl-0x1b".
 *
 * These are upper case so we can normalize the user input and be forgiving.
 * "Ctrl-ESC" and "Ctrl-Esc" an "Ctrl-esc" are all accepted.
 *
 * We also include common aliases for the same key.  "Esc" and "Escape" are the
 * same key.
 *
 * Note: Names here cannot overlap with hterm.Parser.identifiers.modifierKeys.
 */hterm.Parser.identifiers.keyCodes={// Top row.
ESCAPE:27,ESC:27,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,// Row two.
ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,ZERO:48,BACKSPACE:8,BKSP:8,BS:8,// Row three.
TAB:9,Q:81,W:87,E:69,R:82,T:84,Y:89,U:85,I:73,O:79,P:80,// Row four.
CAPS_LOCK:20,CAPSLOCK:20,CAPS:20,A:65,S:83,D:68,F:70,G:71,H:72,J:74,K:75,L:76,// We map enter and return together even though enter should really be 10
// because most people don't know or care about the history here.  Plus,
// most keyboards/programs map them together already.  If they really want
// to bind them differently, they can also use the numeric value.
ENTER:13,ENT:13,RETURN:13,RET:13,// Row five.
Z:90,X:88,C:67,V:86,B:66,N:78,M:77,// Etc.
SPACE:32,SP:32,PRINT_SCREEN:42,PRTSC:42,SCROLL_LOCK:145,SCRLK:145,BREAK:19,BRK:19,INSERT:45,INS:45,HOME:36,PAGE_UP:33,PGUP:33,DELETE:46,DEL:46,END:35,PAGE_DOWN:34,PGDOWN:34,PGDN:34,UP:38,DOWN:40,RIGHT:39,LEFT:37,NUMLOCK:144,// Keypad
KP0:96,KP1:97,KP2:98,KP3:99,KP4:100,KP5:101,KP6:102,KP7:103,KP8:104,KP9:105,KP_PLUS:107,KP_ADD:107,KP_MINUS:109,KP_SUBTRACT:109,KP_STAR:106,KP_MULTIPLY:106,KP_DIVIDE:111,KP_DECIMAL:110,KP_PERIOD:110,// Chrome OS media keys
NAVIGATE_BACK:166,NAVIGATE_FORWARD:167,RELOAD:168,FULL_SCREEN:183,WINDOW_OVERVIEW:182,BRIGHTNESS_UP:216,BRIGHTNESS_DOWN:217};/**
 * Identifiers for use in key actions.
 */hterm.Parser.identifiers.actions={/**
   * Prevent the browser and operating system from handling the event.
   */CANCEL:hterm.Keyboard.KeyActions.CANCEL,/**
   * Wait for a "keypress" event, send the keypress charCode to the host.
   */DEFAULT:hterm.Keyboard.KeyActions.DEFAULT,/**
   * Let the browser or operating system handle the key.
   */PASS:hterm.Keyboard.KeyActions.PASS,/**
   * Scroll the terminal one page up.
   */scrollPageUp:function scrollPageUp(terminal){terminal.scrollPageUp();return hterm.Keyboard.KeyActions.CANCEL;},/**
   * Scroll the terminal one page down.
   */scrollPageDown:function scrollPageDown(terminal){terminal.scrollPageDown();return hterm.Keyboard.KeyActions.CANCEL;},/**
   * Scroll the terminal to the top.
   */scrollToTop:function scrollToTop(terminal){terminal.scrollEnd();return hterm.Keyboard.KeyActions.CANCEL;},/**
   * Scroll the terminal to the bottom.
   */scrollToBottom:function scrollToBottom(terminal){terminal.scrollEnd();return hterm.Keyboard.KeyActions.CANCEL;},/**
   * Clear the terminal and scrollback buffer.
   */clearScrollback:function clearScrollback(terminal){terminal.wipeContents();return hterm.Keyboard.KeyActions.CANCEL;}};// SOURCE FILE: hterm/js/hterm_preference_manager.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';lib.rtdep('lib.f','lib.Storage');/**
 * PreferenceManager subclass managing global NaSSH preferences.
 *
 * This is currently just an ordered list of known connection profiles.
 */hterm.PreferenceManager=function(profileId){lib.PreferenceManager.call(this,hterm.defaultStorage,'/hterm/profiles/'+profileId);var defs=hterm.PreferenceManager.defaultPreferences;Object.keys(defs).forEach(function(key){this.definePreference(key,defs[key][1]);}.bind(this));};hterm.PreferenceManager.categories={};hterm.PreferenceManager.categories.Keyboard='Keyboard';hterm.PreferenceManager.categories.Appearance='Appearance';hterm.PreferenceManager.categories.CopyPaste='CopyPaste';hterm.PreferenceManager.categories.Sounds='Sounds';hterm.PreferenceManager.categories.Scrolling='Scrolling';hterm.PreferenceManager.categories.Encoding='Encoding';hterm.PreferenceManager.categories.Miscellaneous='Miscellaneous';/**
 * List of categories, ordered by display order (top to bottom)
 */hterm.PreferenceManager.categoryDefinitions=[{id:hterm.PreferenceManager.categories.Appearance,text:'Appearance (fonts, colors, images)'},{id:hterm.PreferenceManager.categories.CopyPaste,text:'Copy & Paste'},{id:hterm.PreferenceManager.categories.Encoding,text:'Encoding'},{id:hterm.PreferenceManager.categories.Keyboard,text:'Keyboard'},{id:hterm.PreferenceManager.categories.Scrolling,text:'Scrolling'},{id:hterm.PreferenceManager.categories.Sounds,text:'Sounds'},{id:hterm.PreferenceManager.categories.Miscellaneous,text:'Misc.'}];hterm.PreferenceManager.defaultPreferences={'alt-gr-mode':[hterm.PreferenceManager.categories.Keyboard,null,[null,'none','ctrl-alt','left-alt','right-alt'],'Select an AltGr detection hack^Wheuristic.\n'+'\n'+'\'null\': Autodetect based on navigator.language:\n'+'      \'en-us\' => \'none\', else => \'right-alt\'\n'+'\'none\': Disable any AltGr related munging.\n'+'\'ctrl-alt\': Assume Ctrl+Alt means AltGr.\n'+'\'left-alt\': Assume left Alt means AltGr.\n'+'\'right-alt\': Assume right Alt means AltGr.\n'],'alt-backspace-is-meta-backspace':[hterm.PreferenceManager.categories.Keyboard,false,'bool','If set, undoes the Chrome OS Alt-Backspace->DEL remap, so that '+'alt-backspace indeed is alt-backspace.'],'alt-is-meta':[hterm.PreferenceManager.categories.Keyboard,false,'bool','Set whether the alt key acts as a meta key or as a distinct alt key.'],'alt-sends-what':[hterm.PreferenceManager.categories.Keyboard,'escape',['escape','8-bit','browser-key'],'Controls how the alt key is handled.\n'+'\n'+'  escape....... Send an ESC prefix.\n'+'  8-bit........ Add 128 to the unshifted character as in xterm.\n'+'  browser-key.. Wait for the keypress event and see what the browser \n'+'                says.  (This won\'t work well on platforms where the \n'+'                browser performs a default action for some alt sequences.)'],'audible-bell-sound':[hterm.PreferenceManager.categories.Sounds,'lib-resource:hterm/audio/bell','url','URL of the terminal bell sound.  Empty string for no audible bell.'],'desktop-notification-bell':[hterm.PreferenceManager.categories.Sounds,false,'bool','If true, terminal bells in the background will create a Web '+'Notification. https://www.w3.org/TR/notifications/\n'+'\n'+'Displaying notifications requires permission from the user. When this '+'option is set to true, hterm will attempt to ask the user for permission '+'if necessary. Note browsers may not show this permission request if it '+'did not originate from a user action.\n'+'\n'+'Chrome extensions with the "notifications" permission have permission to '+'display notifications.'],'background-color':[hterm.PreferenceManager.categories.Appearance,'rgb(16, 16, 16)','color','The background color for text with no other color attributes.'],'background-image':[hterm.PreferenceManager.categories.Appearance,'','string','CSS value of the background image.  Empty string for no image.\n'+'\n'+'For example:\n'+'  url(https://goo.gl/anedTK)\n'+'  linear-gradient(top bottom, blue, red)'],'background-size':[hterm.PreferenceManager.categories.Appearance,'','string','CSS value of the background image size.  Defaults to none.'],'background-position':[hterm.PreferenceManager.categories.Appearance,'','string','CSS value of the background image position.\n'+'\n'+'For example:\n'+'  10% 10%\n'+'  center'],'backspace-sends-backspace':[hterm.PreferenceManager.categories.Keyboard,false,'bool','If true, the backspace should send BS (\'\\x08\', aka ^H).  Otherwise '+'the backspace key should send \'\\x7f\'.'],'character-map-overrides':[hterm.PreferenceManager.categories.Appearance,null,'value','This is specified as an object. It is a sparse array, where each '+'property is the character set code and the value is an object that is '+'a sparse array itself. In that sparse array, each property is the '+'received character and the value is the displayed character.\n'+'\n'+'For example:\n'+'  {"0":{"+":"\\u2192",",":"\\u2190","-":"\\u2191",".":"\\u2193", '+'"0":"\\u2588"}}'],'close-on-exit':[hterm.PreferenceManager.categories.Miscellaneous,true,'bool','Whether or not to close the window when the command exits.'],'cursor-blink':[hterm.PreferenceManager.categories.Appearance,false,'bool','Whether or not to blink the cursor by default.'],'cursor-blink-cycle':[hterm.PreferenceManager.categories.Appearance,[1000,500],'value','The cursor blink rate in milliseconds.\n'+'\n'+'A two element array, the first of which is how long the cursor should be '+'on, second is how long it should be off.'],'cursor-color':[hterm.PreferenceManager.categories.Appearance,'rgba(255, 0, 0, 0.5)','color','The color of the visible cursor.'],'color-palette-overrides':[hterm.PreferenceManager.categories.Appearance,null,'value','Override colors in the default palette.\n'+'\n'+'This can be specified as an array or an object.  If specified as an '+'object it is assumed to be a sparse array, where each property '+'is a numeric index into the color palette.\n'+'\n'+'Values can be specified as almost any css color value.  This '+'includes #RGB, #RRGGBB, rgb(...), rgba(...), and any color names '+'that are also part of the stock X11 rgb.txt file.\n'+'\n'+'You can use \'null\' to specify that the default value should be not '+'be changed.  This is useful for skipping a small number of indices '+'when the value is specified as an array.'],'copy-on-select':[hterm.PreferenceManager.categories.CopyPaste,true,'bool','Automatically copy mouse selection to the clipboard.'],'use-default-window-copy':[hterm.PreferenceManager.categories.CopyPaste,false,'bool','Whether to use the default window copy behavior'],'clear-selection-after-copy':[hterm.PreferenceManager.categories.CopyPaste,true,'bool','Whether to clear the selection after copying.'],'ctrl-plus-minus-zero-zoom':[hterm.PreferenceManager.categories.Keyboard,true,'bool','If true, Ctrl-Plus/Minus/Zero controls zoom.\n'+'If false, Ctrl-Shift-Plus/Minus/Zero controls zoom, Ctrl-Minus sends ^_, '+'Ctrl-Plus/Zero do nothing.'],'ctrl-c-copy':[hterm.PreferenceManager.categories.Keyboard,false,'bool','Ctrl+C copies if true, send ^C to host if false.\n'+'Ctrl+Shift+C sends ^C to host if true, copies if false.'],'ctrl-v-paste':[hterm.PreferenceManager.categories.Keyboard,false,'bool','Ctrl+V pastes if true, send ^V to host if false.\n'+'Ctrl+Shift+V sends ^V to host if true, pastes if false.'],'east-asian-ambiguous-as-two-column':[hterm.PreferenceManager.categories.Keyboard,false,'bool','Set whether East Asian Ambiguous characters have two column width.'],'enable-8-bit-control':[hterm.PreferenceManager.categories.Keyboard,false,'bool','True to enable 8-bit control characters, false to ignore them.\n'+'\n'+'We\'ll respect the two-byte versions of these control characters '+'regardless of this setting.'],'enable-bold':[hterm.PreferenceManager.categories.Appearance,null,'tristate','True if we should use bold weight font for text with the bold/bright '+'attribute.  False to use the normal weight font.  Null to autodetect.'],'enable-bold-as-bright':[hterm.PreferenceManager.categories.Appearance,true,'bool','True if we should use bright colors (8-15 on a 16 color palette) '+'for any text with the bold attribute.  False otherwise.'],'enable-blink':[hterm.PreferenceManager.categories.Appearance,true,'bool','True if we should respect the blink attribute.  False to ignore it.  '],'enable-clipboard-notice':[hterm.PreferenceManager.categories.CopyPaste,true,'bool','Show a message in the terminal when the host writes to the clipboard.'],'enable-clipboard-write':[hterm.PreferenceManager.categories.CopyPaste,true,'bool','Allow the host to write directly to the system clipboard.'],'enable-dec12':[hterm.PreferenceManager.categories.Miscellaneous,false,'bool','Respect the host\'s attempt to change the cursor blink status using '+'DEC Private Mode 12.'],'environment':[hterm.PreferenceManager.categories.Miscellaneous,{'TERM':'xterm-256color'},'value','The default environment variables, as an object.'],'font-family':[hterm.PreferenceManager.categories.Appearance,'"DejaVu Sans Mono", "Everson Mono", FreeMono, "Menlo", "Terminal", '+'monospace','string','Default font family for the terminal text.'],'font-size':[hterm.PreferenceManager.categories.Appearance,15,'int','The default font size in pixels.'],'font-smoothing':[hterm.PreferenceManager.categories.Appearance,'antialiased','string','CSS font-smoothing property.'],'foreground-color':[hterm.PreferenceManager.categories.Appearance,'rgb(240, 240, 240)','color','The foreground color for text with no other color attributes.'],'home-keys-scroll':[hterm.PreferenceManager.categories.Keyboard,false,'bool','If true, home/end will control the terminal scrollbar and shift home/end '+'will send the VT keycodes.  If false then home/end sends VT codes and '+'shift home/end scrolls.'],'keybindings':[hterm.PreferenceManager.categories.Keyboard,null,'value','A map of key sequence to key actions.  Key sequences include zero or '+'more modifier keys followed by a key code.  Key codes can be decimal or '+'hexadecimal numbers, or a key identifier.  Key actions can be specified '+'a string to send to the host, or an action identifier.  For a full '+'explanation of the format, see https://goo.gl/LWRndr.\n'+'\n'+'Sample keybindings:\n'+'{\n'+'  "Ctrl-Alt-K": "clearScrollback",\n'+'  "Ctrl-Shift-L": "PASS",\n'+'  "Ctrl-H": "\'HELLO\\n\'"\n'+'}'],'max-string-sequence':[hterm.PreferenceManager.categories.Encoding,100000,'int','Max length of a DCS, OSC, PM, or APS sequence before we give up and '+'ignore the code.'],'media-keys-are-fkeys':[hterm.PreferenceManager.categories.Keyboard,false,'bool','If true, convert media keys to their Fkey equivalent. If false, let '+'the browser handle the keys.'],'meta-sends-escape':[hterm.PreferenceManager.categories.Keyboard,true,'bool','Set whether the meta key sends a leading escape or not.'],'mouse-right-click-paste':[hterm.PreferenceManager.categories.CopyPaste,true,'bool','Paste on right mouse button clicks.\n'+'\n'+'This option is activate independent of the "mouse-paste-button" '+'setting.\n'+'\n'+'Note: This will handle left & right handed mice correctly.'],'mouse-paste-button':[hterm.PreferenceManager.categories.CopyPaste,null,[null,0,1,2,3,4,5,6],'Mouse paste button, or null to autodetect.\n'+'\n'+'For autodetect, we\'ll use the middle mouse button for non-X11 '+'platforms (including Chrome OS).  On X11, we\'ll use the right mouse '+'button (since the native window manager should paste via the middle '+'mouse button).\n'+'\n'+'0 == left (primary) button.\n'+'1 == middle (auxiliary) button.\n'+'2 == right (secondary) button.\n'+'\n'+'This option is activate independent of the "mouse-right-click-paste" '+'setting.\n'+'\n'+'Note: This will handle left & right handed mice correctly.'],'word-break-match-left':[hterm.PreferenceManager.categories.CopyPaste,'[^\\s\\[\\](){}<>"\'\\^!@#$%&*,;:`]','string','Regular expression to halt matching to the left (start) of a selection.\n'+'\n'+'Normally this is a character class to reject specific characters.\n'+'We allow "~" and "." by default as paths frequently start with those.'],'word-break-match-right':[hterm.PreferenceManager.categories.CopyPaste,'[^\\s\\[\\](){}<>"\'\\^!@#$%&*,;:~.`]','string','Regular expression to halt matching to the right (end) of a selection.\n'+'\n'+'Normally this is a character class to reject specific characters.'],'word-break-match-middle':[hterm.PreferenceManager.categories.CopyPaste,'[^\\s\\[\\](){}<>"\'\\^]*','string','Regular expression to match all the characters in the middle.\n'+'\n'+'Normally this is a character class to reject specific characters.\n'+'\n'+'Used to expand the selection surrounding the starting point.'],'page-keys-scroll':[hterm.PreferenceManager.categories.Keyboard,false,'bool','If true, page up/down will control the terminal scrollbar and shift '+'page up/down will send the VT keycodes.  If false then page up/down '+'sends VT codes and shift page up/down scrolls.'],'pass-alt-number':[hterm.PreferenceManager.categories.Keyboard,null,'tristate','Set whether we should pass Alt-1..9 to the browser.\n'+'\n'+'This is handy when running hterm in a browser tab, so that you don\'t '+'lose Chrome\'s "switch to tab" keyboard accelerators.  When not running '+'in a tab it\'s better to send these keys to the host so they can be '+'used in vim or emacs.\n'+'\n'+'If true, Alt-1..9 will be handled by the browser.  If false, Alt-1..9 '+'will be sent to the host.  If null, autodetect based on browser platform '+'and window type.'],'pass-ctrl-number':[hterm.PreferenceManager.categories.Keyboard,null,'tristate','Set whether we should pass Ctrl-1..9 to the browser.\n'+'\n'+'This is handy when running hterm in a browser tab, so that you don\'t '+'lose Chrome\'s "switch to tab" keyboard accelerators.  When not running '+'in a tab it\'s better to send these keys to the host so they can be '+'used in vim or emacs.\n'+'\n'+'If true, Ctrl-1..9 will be handled by the browser.  If false, Ctrl-1..9 '+'will be sent to the host.  If null, autodetect based on browser platform '+'and window type.'],'pass-meta-number':[hterm.PreferenceManager.categories.Keyboard,null,'tristate','Set whether we should pass Meta-1..9 to the browser.\n'+'\n'+'This is handy when running hterm in a browser tab, so that you don\'t '+'lose Chrome\'s "switch to tab" keyboard accelerators.  When not running '+'in a tab it\'s better to send these keys to the host so they can be '+'used in vim or emacs.\n'+'\n'+'If true, Meta-1..9 will be handled by the browser.  If false, Meta-1..9 '+'will be sent to the host.  If null, autodetect based on browser platform '+'and window type.'],'pass-meta-v':[hterm.PreferenceManager.categories.Keyboard,true,'bool','Set whether meta-V gets passed to host.'],'receive-encoding':[hterm.PreferenceManager.categories.Encoding,'utf-8',['utf-8','raw'],'Set the expected encoding for data received from the host.\n'+'\n'+'Valid values are \'utf-8\' and \'raw\'.'],'scroll-on-keystroke':[hterm.PreferenceManager.categories.Scrolling,true,'bool','If true, scroll to the bottom on any keystroke.'],'scroll-on-output':[hterm.PreferenceManager.categories.Scrolling,false,'bool','If true, scroll to the bottom on terminal output.'],'scrollbar-visible':[hterm.PreferenceManager.categories.Scrolling,true,'bool','The vertical scrollbar mode.'],'scroll-wheel-may-send-arrow-keys':[hterm.PreferenceManager.categories.Scrolling,false,'bool','When using the alternative screen buffer, and DECCKM (Application Cursor '+'Keys) is active, mouse wheel scroll events will emulate arrow keys.\n'+'\n'+'It can be temporarily disabled by holding the shift key.\n'+'\n'+'This frequently comes up when using pagers (less) or reading man pages '+'or text editors (vi/nano) or using screen/tmux.'],'scroll-wheel-move-multiplier':[hterm.PreferenceManager.categories.Scrolling,1,'int','The multiplier for the pixel delta in wheel events caused by the '+'scroll wheel. Alters how fast the page scrolls.'],'send-encoding':[hterm.PreferenceManager.categories.Encoding,'utf-8',['utf-8','raw'],'Set the encoding for data sent to host.'],'terminal-encoding':[hterm.PreferenceManager.categories.Encoding,'iso-2022',['iso-2022','utf-8','utf-8-locked'],'The default terminal encoding (DOCS).\n'+'\n'+'ISO-2022 enables character map translations (like graphics maps).\n'+'UTF-8 disables support for those.\n'+'\n'+'The locked variant means the encoding cannot be changed at runtime '+'via terminal escape sequences.\n'+'\n'+'You should stick with UTF-8 unless you notice broken rendering with '+'legacy applications.'],'shift-insert-paste':[hterm.PreferenceManager.categories.Keyboard,true,'bool','Shift + Insert pastes if true, sent to host if false.'],'user-css':[hterm.PreferenceManager.categories.Appearance,'','url','URL of user stylesheet to include in the terminal document.'],'user-css-text':[hterm.PreferenceManager.categories.Appearance,'','multiline-string','Custom CSS text for styling the terminal.']};hterm.PreferenceManager.prototype=Object.create(lib.PreferenceManager.prototype);hterm.PreferenceManager.constructor=hterm.PreferenceManager;// SOURCE FILE: hterm/js/hterm_pubsub.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';/**
 * Utility class used to add publish/subscribe/unsubscribe functionality to
 * an existing object.
 */hterm.PubSub=function(){this.observers_={};};/**
 * Add publish, subscribe, and unsubscribe methods to an existing object.
 *
 * No other properties of the object are touched, so there is no need to
 * worry about clashing private properties.
 *
 * @param {Object} obj The object to add this behavior to.
 */hterm.PubSub.addBehavior=function(obj){var pubsub=new hterm.PubSub();for(var m in hterm.PubSub.prototype){obj[m]=hterm.PubSub.prototype[m].bind(pubsub);}};/**
 * Subscribe to be notified of messages about a subject.
 *
 * @param {string} subject The subject to subscribe to.
 * @param {function(Object)} callback The function to invoke for notifications.
 */hterm.PubSub.prototype.subscribe=function(subject,callback){if(!(subject in this.observers_))this.observers_[subject]=[];this.observers_[subject].push(callback);};/**
 * Unsubscribe from a subject.
 *
 * @param {string} subject The subject to unsubscribe from.
 * @param {function(Object)} callback A callback previously registered via
 *     subscribe().
 */hterm.PubSub.prototype.unsubscribe=function(subject,callback){var list=this.observers_[subject];if(!list)throw'Invalid subject: '+subject;var i=list.indexOf(callback);if(i<0)throw'Not subscribed: '+subject;list.splice(i,1);};/**
 * Publish a message about a subject.
 *
 * Subscribers (and the optional final callback) are invoked asynchronously.
 * This method will return before anyone is actually notified.
 *
 * @param {string} subject The subject to publish about.
 * @param {Object} e An arbitrary object associated with this notification.
 * @param {function(Object)} opt_lastCallback An optional function to call after
 *     all subscribers have been notified.
 */hterm.PubSub.prototype.publish=function(subject,e,opt_lastCallback){function notifyList(i){// Set this timeout before invoking the callback, so we don't have to
// concern ourselves with exceptions.
if(i<list.length-1)setTimeout(notifyList,0,i+1);list[i](e);}var list=this.observers_[subject];if(list){// Copy the list, in case it changes while we're notifying.
list=[].concat(list);}if(opt_lastCallback){if(list){list.push(opt_lastCallback);}else{list=[opt_lastCallback];}}if(list)setTimeout(notifyList,0,0);};// SOURCE FILE: hterm/js/hterm_screen.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';lib.rtdep('lib.f','lib.wc','hterm.RowCol','hterm.Size','hterm.TextAttributes');/**
 * @fileoverview This class represents a single terminal screen full of text.
 *
 * It maintains the current cursor position and has basic methods for text
 * insert and overwrite, and adding or removing rows from the screen.
 *
 * This class has no knowledge of the scrollback buffer.
 *
 * The number of rows on the screen is determined only by the number of rows
 * that the caller inserts into the screen.  If a caller wants to ensure a
 * constant number of rows on the screen, it's their responsibility to remove a
 * row for each row inserted.
 *
 * The screen width, in contrast, is enforced locally.
 *
 *
 * In practice...
 * - The hterm.Terminal class holds two hterm.Screen instances.  One for the
 * primary screen and one for the alternate screen.
 *
 * - The html.Screen class only cares that rows are HTMLElements.  In the
 * larger context of hterm, however, the rows happen to be displayed by an
 * hterm.ScrollPort and have to follow a few rules as a result.  Each
 * row must be rooted by the custom HTML tag 'x-row', and each must have a
 * rowIndex property that corresponds to the index of the row in the context
 * of the scrollback buffer.  These invariants are enforced by hterm.Terminal
 * because that is the class using the hterm.Screen in the context of an
 * hterm.ScrollPort.
 *//**
 * Create a new screen instance.
 *
 * The screen initially has no rows and a maximum column count of 0.
 *
 * @param {integer} opt_columnCount The maximum number of columns for this
 *    screen.  See insertString() and overwriteString() for information about
 *    what happens when too many characters are added too a row.  Defaults to
 *    0 if not provided.
 */hterm.Screen=function(opt_columnCount){/**
   * Public, read-only access to the rows in this screen.
   */this.rowsArray=[];// The max column width for this screen.
this.columnCount_=opt_columnCount||80;// The current color, bold, underline and blink attributes.
this.textAttributes=new hterm.TextAttributes(window.document);// Current zero-based cursor coordinates.
this.cursorPosition=new hterm.RowCol(0,0);// The node containing the row that the cursor is positioned on.
this.cursorRowNode_=null;// The node containing the span of text that the cursor is positioned on.
this.cursorNode_=null;// The offset in column width into cursorNode_ where the cursor is positioned.
this.cursorOffset_=null;// Regexes for expanding word selections.
this.wordBreakMatchLeft=null;this.wordBreakMatchRight=null;this.wordBreakMatchMiddle=null;};/**
 * Return the screen size as an hterm.Size object.
 *
 * @return {hterm.Size} hterm.Size object representing the current number
 *     of rows and columns in this screen.
 */hterm.Screen.prototype.getSize=function(){return new hterm.Size(this.columnCount_,this.rowsArray.length);};/**
 * Return the current number of rows in this screen.
 *
 * @return {integer} The number of rows in this screen.
 */hterm.Screen.prototype.getHeight=function(){return this.rowsArray.length;};/**
 * Return the current number of columns in this screen.
 *
 * @return {integer} The number of columns in this screen.
 */hterm.Screen.prototype.getWidth=function(){return this.columnCount_;};/**
 * Set the maximum number of columns per row.
 *
 * @param {integer} count The maximum number of columns per row.
 */hterm.Screen.prototype.setColumnCount=function(count){this.columnCount_=count;if(this.cursorPosition.column>=count)this.setCursorPosition(this.cursorPosition.row,count-1);};/**
 * Remove the first row from the screen and return it.
 *
 * @return {HTMLElement} The first row in this screen.
 */hterm.Screen.prototype.shiftRow=function(){return this.shiftRows(1)[0];};/**
 * Remove rows from the top of the screen and return them as an array.
 *
 * @param {integer} count The number of rows to remove.
 * @return {Array.<HTMLElement>} The selected rows.
 */hterm.Screen.prototype.shiftRows=function(count){return this.rowsArray.splice(0,count);};/**
 * Insert a row at the top of the screen.
 *
 * @param {HTMLElement} row The row to insert.
 */hterm.Screen.prototype.unshiftRow=function(row){this.rowsArray.splice(0,0,row);};/**
 * Insert rows at the top of the screen.
 *
 * @param {Array.<HTMLElement>} rows The rows to insert.
 */hterm.Screen.prototype.unshiftRows=function(rows){this.rowsArray.unshift.apply(this.rowsArray,rows);};/**
 * Remove the last row from the screen and return it.
 *
 * @return {HTMLElement} The last row in this screen.
 */hterm.Screen.prototype.popRow=function(){return this.popRows(1)[0];};/**
 * Remove rows from the bottom of the screen and return them as an array.
 *
 * @param {integer} count The number of rows to remove.
 * @return {Array.<HTMLElement>} The selected rows.
 */hterm.Screen.prototype.popRows=function(count){return this.rowsArray.splice(this.rowsArray.length-count,count);};/**
 * Insert a row at the bottom of the screen.
 *
 * @param {HTMLElement} row The row to insert.
 */hterm.Screen.prototype.pushRow=function(row){this.rowsArray.push(row);};/**
 * Insert rows at the bottom of the screen.
 *
 * @param {Array.<HTMLElement>} rows The rows to insert.
 */hterm.Screen.prototype.pushRows=function(rows){rows.push.apply(this.rowsArray,rows);};/**
 * Insert a row at the specified row of the screen.
 *
 * @param {integer} index The index to insert the row.
 * @param {HTMLElement} row The row to insert.
 */hterm.Screen.prototype.insertRow=function(index,row){this.rowsArray.splice(index,0,row);};/**
 * Insert rows at the specified row of the screen.
 *
 * @param {integer} index The index to insert the rows.
 * @param {Array.<HTMLElement>} rows The rows to insert.
 */hterm.Screen.prototype.insertRows=function(index,rows){for(var i=0;i<rows.length;i++){this.rowsArray.splice(index+i,0,rows[i]);}};/**
 * Remove a row from the screen and return it.
 *
 * @param {integer} index The index of the row to remove.
 * @return {HTMLElement} The selected row.
 */hterm.Screen.prototype.removeRow=function(index){return this.rowsArray.splice(index,1)[0];};/**
 * Remove rows from the bottom of the screen and return them as an array.
 *
 * @param {integer} index The index to start removing rows.
 * @param {integer} count The number of rows to remove.
 * @return {Array.<HTMLElement>} The selected rows.
 */hterm.Screen.prototype.removeRows=function(index,count){return this.rowsArray.splice(index,count);};/**
 * Invalidate the current cursor position.
 *
 * This sets this.cursorPosition to (0, 0) and clears out some internal
 * data.
 *
 * Attempting to insert or overwrite text while the cursor position is invalid
 * will raise an obscure exception.
 */hterm.Screen.prototype.invalidateCursorPosition=function(){this.cursorPosition.move(0,0);this.cursorRowNode_=null;this.cursorNode_=null;this.cursorOffset_=null;};/**
 * Clear the contents of the cursor row.
 */hterm.Screen.prototype.clearCursorRow=function(){this.cursorRowNode_.innerHTML='';this.cursorRowNode_.removeAttribute('line-overflow');this.cursorOffset_=0;this.cursorPosition.column=0;this.cursorPosition.overflow=false;var text;if(this.textAttributes.isDefault()){text='';}else{text=lib.f.getWhitespace(this.columnCount_);}// We shouldn't honor inverse colors when clearing an area, to match
// xterm's back color erase behavior.
var inverse=this.textAttributes.inverse;this.textAttributes.inverse=false;this.textAttributes.syncColors();var node=this.textAttributes.createContainer(text);this.cursorRowNode_.appendChild(node);this.cursorNode_=node;this.textAttributes.inverse=inverse;this.textAttributes.syncColors();};/**
 * Mark the current row as having overflowed to the next line.
 *
 * The line overflow state is used when converting a range of rows into text.
 * It makes it possible to recombine two or more overflow terminal rows into
 * a single line.
 *
 * This is distinct from the cursor being in the overflow state.  Cursor
 * overflow indicates that printing at the cursor position will commit a
 * line overflow, unless it is preceded by a repositioning of the cursor
 * to a non-overflow state.
 */hterm.Screen.prototype.commitLineOverflow=function(){this.cursorRowNode_.setAttribute('line-overflow',true);};/**
 * Relocate the cursor to a give row and column.
 *
 * @param {integer} row The zero based row.
 * @param {integer} column The zero based column.
 */hterm.Screen.prototype.setCursorPosition=function(row,column){if(!this.rowsArray.length){console.warn('Attempt to set cursor position on empty screen.');return;}if(row>=this.rowsArray.length){console.error('Row out of bounds: '+row);row=this.rowsArray.length-1;}else if(row<0){console.error('Row out of bounds: '+row);row=0;}if(column>=this.columnCount_){console.error('Column out of bounds: '+column);column=this.columnCount_-1;}else if(column<0){console.error('Column out of bounds: '+column);column=0;}this.cursorPosition.overflow=false;var rowNode=this.rowsArray[row];var node=rowNode.firstChild;if(!node){node=rowNode.ownerDocument.createTextNode('');rowNode.appendChild(node);}var currentColumn=0;if(rowNode==this.cursorRowNode_){if(column>=this.cursorPosition.column-this.cursorOffset_){node=this.cursorNode_;currentColumn=this.cursorPosition.column-this.cursorOffset_;}}else{this.cursorRowNode_=rowNode;}this.cursorPosition.move(row,column);while(node){var offset=column-currentColumn;var width=hterm.TextAttributes.nodeWidth(node);if(!node.nextSibling||width>offset){this.cursorNode_=node;this.cursorOffset_=offset;return;}currentColumn+=width;node=node.nextSibling;}};/**
 * Set the provided selection object to be a caret selection at the current
 * cursor position.
 */hterm.Screen.prototype.syncSelectionCaret=function(selection){try{selection.collapse(this.cursorNode_,this.cursorOffset_);}catch(firefoxIgnoredException){// FF can throw an exception if the range is off, rather than just not
// performing the collapse.
}};/**
 * Split a single node into two nodes at the given offset.
 *
 * For example:
 * Given the DOM fragment '<div><span>Hello World</span></div>', call splitNode_
 * passing the span and an offset of 6.  This would modify the fragment to
 * become: '<div><span>Hello </span><span>World</span></div>'.  If the span
 * had any attributes they would have been copied to the new span as well.
 *
 * The to-be-split node must have a container, so that the new node can be
 * placed next to it.
 *
 * @param {HTMLNode} node The node to split.
 * @param {integer} offset The offset into the node where the split should
 *     occur.
 */hterm.Screen.prototype.splitNode_=function(node,offset){var afterNode=node.cloneNode(false);var textContent=node.textContent;node.textContent=hterm.TextAttributes.nodeSubstr(node,0,offset);afterNode.textContent=lib.wc.substr(textContent,offset);if(afterNode.textContent)node.parentNode.insertBefore(afterNode,node.nextSibling);if(!node.textContent)node.parentNode.removeChild(node);};/**
 * Ensure that text is clipped and the cursor is clamped to the column count.
 */hterm.Screen.prototype.maybeClipCurrentRow=function(){var width=hterm.TextAttributes.nodeWidth(this.cursorRowNode_);if(width<=this.columnCount_){// Current row does not need clipping, but may need clamping.
if(this.cursorPosition.column>=this.columnCount_){this.setCursorPosition(this.cursorPosition.row,this.columnCount_-1);this.cursorPosition.overflow=true;}return;}// Save off the current column so we can maybe restore it later.
var currentColumn=this.cursorPosition.column;// Move the cursor to the final column.
this.setCursorPosition(this.cursorPosition.row,this.columnCount_-1);// Remove any text that partially overflows.
width=hterm.TextAttributes.nodeWidth(this.cursorNode_);if(this.cursorOffset_<width-1){this.cursorNode_.textContent=hterm.TextAttributes.nodeSubstr(this.cursorNode_,0,this.cursorOffset_+1);}// Remove all nodes after the cursor.
var rowNode=this.cursorRowNode_;var node=this.cursorNode_.nextSibling;while(node){rowNode.removeChild(node);node=this.cursorNode_.nextSibling;}if(currentColumn<this.columnCount_){// If the cursor was within the screen before we started then restore its
// position.
this.setCursorPosition(this.cursorPosition.row,currentColumn);}else{// Otherwise leave it at the the last column in the overflow state.
this.cursorPosition.overflow=true;}};/**
 * Insert a string at the current character position using the current
 * text attributes.
 *
 * You must call maybeClipCurrentRow() after in order to clip overflowed
 * text and clamp the cursor.
 *
 * It is also up to the caller to properly maintain the line overflow state
 * using hterm.Screen..commitLineOverflow().
 */hterm.Screen.prototype.insertString=function(str){var wcwidth=arguments.length>1&&arguments[1]!==undefined?arguments[1]:undefined;var cursorNode=this.cursorNode_;var cursorNodeText=cursorNode.textContent;this.cursorRowNode_.removeAttribute('line-overflow');// We may alter the width of the string by prepending some missing
// whitespaces, so we need to record the string width ahead of time.
if(wcwidth===undefined)wcwidth=lib.wc.strWidth(str);// No matter what, before this function exits the cursor column will have
// moved this much.
this.cursorPosition.column+=wcwidth;// Local cache of the cursor offset.
var offset=this.cursorOffset_;// Reverse offset is the offset measured from the end of the string.
// Zero implies that the cursor is at the end of the cursor node.
var reverseOffset=hterm.TextAttributes.nodeWidth(cursorNode)-offset;if(reverseOffset<0){// A negative reverse offset means the cursor is positioned past the end
// of the characters on this line.  We'll need to insert the missing
// whitespace.
var ws=lib.f.getWhitespace(-reverseOffset);// This whitespace should be completely unstyled.  Underline, background
// color, and strikethrough would be visible on whitespace, so we can't use
// one of those spans to hold the text.
if(!(this.textAttributes.underline||this.textAttributes.strikethrough||this.textAttributes.background||this.textAttributes.wcNode||!this.textAttributes.asciiNode||this.textAttributes.tileData!=null)){// Best case scenario, we can just pretend the spaces were part of the
// original string.
str=ws+str;}else if(cursorNode.nodeType==Node.TEXT_NODE||!(cursorNode.wcNode||!cursorNode.asciiNode||cursorNode.tileNode||cursorNode.style.textDecoration||cursorNode.style.backgroundColor)){// Second best case, the current node is able to hold the whitespace.
cursorNode.textContent=cursorNodeText+=ws;}else{// Worst case, we have to create a new node to hold the whitespace.
var wsNode=cursorNode.ownerDocument.createTextNode(ws);this.cursorRowNode_.insertBefore(wsNode,cursorNode.nextSibling);this.cursorNode_=cursorNode=wsNode;this.cursorOffset_=offset=-reverseOffset;cursorNodeText=ws;}// We now know for sure that we're at the last character of the cursor node.
reverseOffset=0;}if(this.textAttributes.matchesContainer(cursorNode)){// The new text can be placed directly in the cursor node.
if(reverseOffset==0){cursorNode.textContent=cursorNodeText+str;}else if(offset==0){cursorNode.textContent=str+cursorNodeText;}else{cursorNode.textContent=hterm.TextAttributes.nodeSubstr(cursorNode,0,offset)+str+hterm.TextAttributes.nodeSubstr(cursorNode,offset);}this.cursorOffset_+=wcwidth;return;}// The cursor node is the wrong style for the new text.  If we're at the
// beginning or end of the cursor node, then the adjacent node is also a
// potential candidate.
if(offset==0){// At the beginning of the cursor node, the check the previous sibling.
var previousSibling=cursorNode.previousSibling;if(previousSibling&&this.textAttributes.matchesContainer(previousSibling)){previousSibling.textContent+=str;this.cursorNode_=previousSibling;this.cursorOffset_=lib.wc.strWidth(previousSibling.textContent);return;}var newNode=this.textAttributes.createContainer(str);this.cursorRowNode_.insertBefore(newNode,cursorNode);this.cursorNode_=newNode;this.cursorOffset_=wcwidth;return;}if(reverseOffset==0){// At the end of the cursor node, the check the next sibling.
var nextSibling=cursorNode.nextSibling;if(nextSibling&&this.textAttributes.matchesContainer(nextSibling)){nextSibling.textContent=str+nextSibling.textContent;this.cursorNode_=nextSibling;this.cursorOffset_=lib.wc.strWidth(str);return;}var newNode=this.textAttributes.createContainer(str);this.cursorRowNode_.insertBefore(newNode,nextSibling);this.cursorNode_=newNode;// We specifically need to include any missing whitespace here, since it's
// going in a new node.
this.cursorOffset_=hterm.TextAttributes.nodeWidth(newNode);return;}// Worst case, we're somewhere in the middle of the cursor node.  We'll
// have to split it into two nodes and insert our new container in between.
this.splitNode_(cursorNode,offset);var newNode=this.textAttributes.createContainer(str);this.cursorRowNode_.insertBefore(newNode,cursorNode.nextSibling);this.cursorNode_=newNode;this.cursorOffset_=wcwidth;};/**
 * Overwrite the text at the current cursor position.
 *
 * You must call maybeClipCurrentRow() after in order to clip overflowed
 * text and clamp the cursor.
 *
 * It is also up to the caller to properly maintain the line overflow state
 * using hterm.Screen..commitLineOverflow().
 */hterm.Screen.prototype.overwriteString=function(str){var wcwidth=arguments.length>1&&arguments[1]!==undefined?arguments[1]:undefined;var maxLength=this.columnCount_-this.cursorPosition.column;if(!maxLength)return[str];if(wcwidth===undefined)wcwidth=lib.wc.strWidth(str);if(this.textAttributes.matchesContainer(this.cursorNode_)&&this.cursorNode_.textContent.substr(this.cursorOffset_)==str){// This overwrite would be a no-op, just move the cursor and return.
this.cursorOffset_+=wcwidth;this.cursorPosition.column+=wcwidth;return;}this.deleteChars(Math.min(wcwidth,maxLength));this.insertString(str,wcwidth);};/**
 * Forward-delete one or more characters at the current cursor position.
 *
 * Text to the right of the deleted characters is shifted left.  Only affects
 * characters on the same row as the cursor.
 *
 * @param {integer} count The column width of characters to delete.  This is
 *     clamped to the column width minus the cursor column.
 * @return {integer} The column width of the characters actually deleted.
 */hterm.Screen.prototype.deleteChars=function(count){var node=this.cursorNode_;var offset=this.cursorOffset_;var currentCursorColumn=this.cursorPosition.column;count=Math.min(count,this.columnCount_-currentCursorColumn);if(!count)return 0;var rv=count;var startLength,endLength;while(node&&count){// Sanity check so we don't loop forever, but we don't also go quietly.
if(count<0){console.error('Deleting '+rv+' chars went negative: '+count);break;}startLength=hterm.TextAttributes.nodeWidth(node);node.textContent=hterm.TextAttributes.nodeSubstr(node,0,offset)+hterm.TextAttributes.nodeSubstr(node,offset+count);endLength=hterm.TextAttributes.nodeWidth(node);// Deal with splitting wide characters.  There are two ways: we could delete
// the first column or the second column.  In both cases, we delete the wide
// character and replace one of the columns with a space (since the other
// was deleted).  If there are more chars to delete, the next loop will pick
// up the slack.
if(node.wcNode&&offset<startLength&&(endLength&&startLength==endLength||!endLength&&offset==1)){// No characters were deleted when there should be.  We're probably trying
// to delete one column width from a wide character node.  We remove the
// wide character node here and replace it with a single space.
var spaceNode=this.textAttributes.createContainer(' ');node.parentNode.insertBefore(spaceNode,offset?node:node.nextSibling);node.textContent='';endLength=0;count-=1;}else count-=startLength-endLength;var nextNode=node.nextSibling;if(endLength==0&&node!=this.cursorNode_){node.parentNode.removeChild(node);}node=nextNode;offset=0;}// Remove this.cursorNode_ if it is an empty non-text node.
if(this.cursorNode_.nodeType!=Node.TEXT_NODE&&!this.cursorNode_.textContent){var cursorNode=this.cursorNode_;if(cursorNode.previousSibling){this.cursorNode_=cursorNode.previousSibling;this.cursorOffset_=hterm.TextAttributes.nodeWidth(cursorNode.previousSibling);}else if(cursorNode.nextSibling){this.cursorNode_=cursorNode.nextSibling;this.cursorOffset_=0;}else{var emptyNode=this.cursorRowNode_.ownerDocument.createTextNode('');this.cursorRowNode_.appendChild(emptyNode);this.cursorNode_=emptyNode;this.cursorOffset_=0;}this.cursorRowNode_.removeChild(cursorNode);}return rv;};/**
 * Finds first X-ROW of a line containing specified X-ROW.
 * Used to support line overflow.
 *
 * @param {Node} row X-ROW to begin search for first row of line.
 * @return {Node} The X-ROW that is at the beginning of the line.
 **/hterm.Screen.prototype.getLineStartRow_=function(row){while(row.previousSibling&&row.previousSibling.hasAttribute('line-overflow')){row=row.previousSibling;}return row;};/**
 * Gets text of a line beginning with row.
 * Supports line overflow.
 *
 * @param {Node} row First X-ROW of line.
 * @return {string} Text content of line.
 **/hterm.Screen.prototype.getLineText_=function(row){var rowText="";while(row){rowText+=row.textContent;if(row.hasAttribute('line-overflow')){row=row.nextSibling;}else{break;}}return rowText;};/**
 * Returns X-ROW that is ancestor of the node.
 *
 * @param {Node} node Node to get X-ROW ancestor for.
 * @return {Node} X-ROW ancestor of node, or null if not found.
 **/hterm.Screen.prototype.getXRowAncestor_=function(node){while(node){if(node.nodeName==='X-ROW')break;node=node.parentNode;}return node;};/**
 * Returns position within line of character at offset within node.
 * Supports line overflow.
 *
 * @param {Node} row X-ROW at beginning of line.
 * @param {Node} node Node to get position of.
 * @param {integer} offset Offset into node.
 *
 * @return {integer} Position within line of character at offset within node.
 **/hterm.Screen.prototype.getPositionWithOverflow_=function(row,node,offset){if(!node)return-1;var ancestorRow=this.getXRowAncestor_(node);if(!ancestorRow)return-1;var position=0;while(ancestorRow!=row){position+=hterm.TextAttributes.nodeWidth(row);if(row.hasAttribute('line-overflow')&&row.nextSibling){row=row.nextSibling;}else{return-1;}}return position+this.getPositionWithinRow_(row,node,offset);};/**
 * Returns position within row of character at offset within node.
 * Does not support line overflow.
 *
 * @param {Node} row X-ROW to get position within.
 * @param {Node} node Node to get position for.
 * @param {integer} offset Offset within node to get position for.
 * @return {integer} Position within row of character at offset within node.
 **/hterm.Screen.prototype.getPositionWithinRow_=function(row,node,offset){if(node.parentNode!=row){// If we traversed to the top node, then there's nothing to find here.
if(node.parentNode==null)return-1;return this.getPositionWithinRow_(node.parentNode,node,offset)+this.getPositionWithinRow_(row,node.parentNode,0);}var position=0;for(var i=0;i<row.childNodes.length;i++){var currentNode=row.childNodes[i];if(currentNode==node)return position+offset;position+=hterm.TextAttributes.nodeWidth(currentNode);}return-1;};/**
 * Returns the node and offset corresponding to position within line.
 * Supports line overflow.
 *
 * @param {Node} row X-ROW at beginning of line.
 * @param {integer} position Position within line to retrieve node and offset.
 * @return {Array} Two element array containing node and offset respectively.
 **/hterm.Screen.prototype.getNodeAndOffsetWithOverflow_=function(row,position){while(row&&position>hterm.TextAttributes.nodeWidth(row)){if(row.hasAttribute('line-overflow')&&row.nextSibling){position-=hterm.TextAttributes.nodeWidth(row);row=row.nextSibling;}else{return-1;}}return this.getNodeAndOffsetWithinRow_(row,position);};/**
 * Returns the node and offset corresponding to position within row.
 * Does not support line overflow.
 *
 * @param {Node} row X-ROW to get position within.
 * @param {integer} position Position within row to retrieve node and offset.
 * @return {Array} Two element array containing node and offset respectively.
 **/hterm.Screen.prototype.getNodeAndOffsetWithinRow_=function(row,position){for(var i=0;i<row.childNodes.length;i++){var node=row.childNodes[i];var nodeTextWidth=hterm.TextAttributes.nodeWidth(node);if(position<=nodeTextWidth){if(node.nodeName==='SPAN'){/** Drill down to node contained by SPAN. **/return this.getNodeAndOffsetWithinRow_(node,position);}else{return[node,position];}}position-=nodeTextWidth;}return null;};/**
 * Returns the node and offset corresponding to position within line.
 * Supports line overflow.
 *
 * @param {Node} row X-ROW at beginning of line.
 * @param {integer} start Start position of range within line.
 * @param {integer} end End position of range within line.
 * @param {Range} range Range to modify.
 **/hterm.Screen.prototype.setRange_=function(row,start,end,range){var startNodeAndOffset=this.getNodeAndOffsetWithOverflow_(row,start);if(startNodeAndOffset==null)return;var endNodeAndOffset=this.getNodeAndOffsetWithOverflow_(row,end);if(endNodeAndOffset==null)return;range.setStart(startNodeAndOffset[0],startNodeAndOffset[1]);range.setEnd(endNodeAndOffset[0],endNodeAndOffset[1]);};/**
 * Expands selection to surround URLs.
 *
 * @param {Selection} selection Selection to expand.
 **/hterm.Screen.prototype.expandSelection=function(selection){if(!selection)return;var range=selection.getRangeAt(0);if(!range||range.toString().match(/\s/))return;var row=this.getLineStartRow_(this.getXRowAncestor_(range.startContainer));if(!row)return;var startPosition=this.getPositionWithOverflow_(row,range.startContainer,range.startOffset);if(startPosition==-1)return;var endPosition=this.getPositionWithOverflow_(row,range.endContainer,range.endOffset);if(endPosition==-1)return;// Use the user configurable match settings.
var leftMatch=this.wordBreakMatchLeft;var rightMatch=this.wordBreakMatchRight;var insideMatch=this.wordBreakMatchMiddle;//Move start to the left.
var rowText=this.getLineText_(row);var lineUpToRange=lib.wc.substring(rowText,0,endPosition);var leftRegularExpression=new RegExp(leftMatch+insideMatch+"$");var expandedStart=lineUpToRange.search(leftRegularExpression);if(expandedStart==-1||expandedStart>startPosition)return;//Move end to the right.
var lineFromRange=lib.wc.substring(rowText,startPosition,lib.wc.strWidth(rowText));var rightRegularExpression=new RegExp("^"+insideMatch+rightMatch);var found=lineFromRange.match(rightRegularExpression);if(!found)return;var expandedEnd=startPosition+lib.wc.strWidth(found[0]);if(expandedEnd==-1||expandedEnd<endPosition)return;this.setRange_(row,expandedStart,expandedEnd,range);selection.addRange(range);};// SOURCE FILE: hterm/js/hterm_scrollport.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';lib.rtdep('lib.f','hterm.PubSub','hterm.Size');/**
 * A 'viewport' view of fixed-height rows with support for selection and
 * copy-to-clipboard.
 *
 * 'Viewport' in this case means that only the visible rows are in the DOM.
 * If the rowProvider has 100,000 rows, but the ScrollPort is only 25 rows
 * tall, then only 25 dom nodes are created.  The ScrollPort will ask the
 * RowProvider to create new visible rows on demand as they are scrolled in
 * to the visible area.
 *
 * This viewport is designed so that select and copy-to-clipboard still works,
 * even when all or part of the selection is scrolled off screen.
 *
 * Note that the X11 mouse clipboard does not work properly when all or part
 * of the selection is off screen.  It would be difficult to fix this without
 * adding significant overhead to pathologically large selection cases.
 *
 * The RowProvider should return rows rooted by the custom tag name 'x-row'.
 * This ensures that we can quickly assign the correct display height
 * to the rows with css.
 *
 * @param {RowProvider} rowProvider An object capable of providing rows as
 *     raw text or row nodes.
 */hterm.ScrollPort=function(rowProvider){hterm.PubSub.addBehavior(this);this.rowProvider_=rowProvider;// SWAG the character size until we can measure it.
this.characterSize=new hterm.Size(10,10);// DOM node used for character measurement.
this.ruler_=null;this.selection=new hterm.ScrollPort.Selection(this);// A map of rowIndex => rowNode for each row that is drawn as part of a
// pending redraw_() call.  Null if there is no pending redraw_ call.
this.currentRowNodeCache_=null;// A map of rowIndex => rowNode for each row that was drawn as part of the
// previous redraw_() call.
this.previousRowNodeCache_={};// Used during scroll events to detect when the underlying cause is a resize.
this.lastScreenWidth_=null;this.lastScreenHeight_=null;// True if the user should be allowed to select text in the terminal.
// This is disabled when the host requests mouse drag events so that we don't
// end up with two notions of selection.
this.selectionEnabled_=true;// The last row count returned by the row provider, re-populated during
// syncScrollHeight().
this.lastRowCount_=0;// The scroll wheel pixel delta multiplier to increase/decrease
// the scroll speed of mouse wheel events. See: https://goo.gl/sXelnq
this.scrollWheelMultiplier_=1;// The last touch events we saw to support touch based scrolling.  Indexed
// by touch identifier since we can have more than one touch active.
this.lastTouch_={};/**
   * True if the last scroll caused the scrollport to show the final row.
   */this.isScrolledEnd=true;/**
   * A guess at the current scrollbar width, fixed in resize().
   */this.currentScrollbarWidthPx=16;/**
   * Whether the ctrl-v key on the screen should paste.
   */this.ctrlVPaste=false;this.div_=null;this.document_=null;// Collection of active timeout handles.
this.timeouts_={};this.observers_={};this.DEBUG_=false;};/**
 * Proxy for the native selection object which understands how to walk up the
 * DOM to find the containing row node and sort out which comes first.
 *
 * @param {hterm.ScrollPort} scrollPort The parent hterm.ScrollPort instance.
 */hterm.ScrollPort.Selection=function(scrollPort){this.scrollPort_=scrollPort;/**
   * The row containing the start of the selection.
   *
   * This may be partially or fully selected.  It may be the selection anchor
   * or the focus, but its rowIndex is guaranteed to be less-than-or-equal-to
   * that of the endRow.
   *
   * If only one row is selected then startRow == endRow.  If there is no
   * selection or the selection is collapsed then startRow == null.
   */this.startRow=null;/**
   * The row containing the end of the selection.
   *
   * This may be partially or fully selected.  It may be the selection anchor
   * or the focus, but its rowIndex is guaranteed to be greater-than-or-equal-to
   * that of the startRow.
   *
   * If only one row is selected then startRow == endRow.  If there is no
   * selection or the selection is collapsed then startRow == null.
   */this.endRow=null;/**
   * True if startRow != endRow.
   */this.isMultiline=null;/**
   * True if the selection is just a point rather than a range.
   */this.isCollapsed=null;};/**
 * Given a list of DOM nodes and a container, return the DOM node that
 * is first according to a depth-first search.
 *
 * Returns null if none of the children are found.
 */hterm.ScrollPort.Selection.prototype.findFirstChild=function(parent,childAry){var node=parent.firstChild;while(node){if(childAry.indexOf(node)!=-1)return node;if(node.childNodes.length){var rv=this.findFirstChild(node,childAry);if(rv)return rv;}node=node.nextSibling;}return null;};/**
 * Synchronize this object with the current DOM selection.
 *
 * This is a one-way synchronization, the DOM selection is copied to this
 * object, not the other way around.
 */hterm.ScrollPort.Selection.prototype.sync=function(){var self=this;// The dom selection object has no way to tell which nodes come first in
// the document, so we have to figure that out.
//
// This function is used when we detect that the "anchor" node is first.
function anchorFirst(){self.startRow=anchorRow;self.startNode=selection.anchorNode;self.startOffset=selection.anchorOffset;self.endRow=focusRow;self.endNode=selection.focusNode;self.endOffset=selection.focusOffset;}// This function is used when we detect that the "focus" node is first.
function focusFirst(){self.startRow=focusRow;self.startNode=selection.focusNode;self.startOffset=selection.focusOffset;self.endRow=anchorRow;self.endNode=selection.anchorNode;self.endOffset=selection.anchorOffset;}var selection=this.scrollPort_.getDocument().getSelection();this.startRow=null;this.endRow=null;this.isMultiline=null;this.isCollapsed=!selection||selection.isCollapsed;if(this.isCollapsed)return;var anchorRow=selection.anchorNode;while(anchorRow&&!('rowIndex'in anchorRow)){anchorRow=anchorRow.parentNode;}if(!anchorRow){console.error('Selection anchor is not rooted in a row node: '+selection.anchorNode.nodeName);return;}var focusRow=selection.focusNode;while(focusRow&&!('rowIndex'in focusRow)){focusRow=focusRow.parentNode;}if(!focusRow){console.error('Selection focus is not rooted in a row node: '+selection.focusNode.nodeName);return;}if(anchorRow.rowIndex<focusRow.rowIndex){anchorFirst();}else if(anchorRow.rowIndex>focusRow.rowIndex){focusFirst();}else if(selection.focusNode==selection.anchorNode){if(selection.anchorOffset<selection.focusOffset){anchorFirst();}else{focusFirst();}}else{// The selection starts and ends in the same row, but isn't contained all
// in a single node.
var firstNode=this.findFirstChild(anchorRow,[selection.anchorNode,selection.focusNode]);if(!firstNode)throw new Error('Unexpected error syncing selection.');if(firstNode==selection.anchorNode){anchorFirst();}else{focusFirst();}}this.isMultiline=anchorRow.rowIndex!=focusRow.rowIndex;};/**
 * Turn a div into this hterm.ScrollPort.
 */hterm.ScrollPort.prototype.decorate=function(div){this.div_=div;this.iframe_=div.ownerDocument.createElement('iframe');this.iframe_.style.cssText='border: 0;'+'height: 100%;'+'position: absolute;'+'width: 100%';// Set the iframe src to # in FF.  Otherwise when the frame's
// load event fires in FF it clears out the content of the iframe.
if('mozInnerScreenX'in window)// detect a FF only property
this.iframe_.src='#';div.appendChild(this.iframe_);this.iframe_.contentWindow.addEventListener('resize',this.onResize_.bind(this));var doc=this.document_=this.iframe_.contentDocument;doc.body.style.cssText='margin: 0px;'+'padding: 0px;'+'height: 100%;'+'width: 100%;'+'overflow: hidden;'+'cursor: var(--hterm-mouse-cursor-style);'+'-webkit-user-select: none;'+'-moz-user-select: none;';if(this.DEBUG_){// When we're debugging we add padding to the body so that the offscreen
// elements are visible.
this.document_.body.style.paddingTop=this.document_.body.style.paddingBottom='calc(var(--hterm-charsize-height) * 3)';}var style=doc.createElement('style');style.textContent='x-row {'+'  display: block;'+'  height: var(--hterm-charsize-height);'+'  line-height: var(--hterm-charsize-height);'+'}';doc.head.appendChild(style);this.userCssLink_=doc.createElement('link');this.userCssLink_.setAttribute('rel','stylesheet');this.userCssText_=doc.createElement('style');doc.head.appendChild(this.userCssText_);// TODO(rginda): Sorry, this 'screen_' isn't the same thing as hterm.Screen
// from screen.js.  I need to pick a better name for one of them to avoid
// the collision.
// We make this field editable even though we don't actually allow anything
// to be edited here so that Chrome will do the right thing with virtual
// keyboards and IMEs.  But make sure we turn off all the input helper logic
// that doesn't make sense here, and might inadvertently mung or save input.
// Some of these attributes are standard while others are browser specific,
// but should be safely ignored by other browsers.
this.screen_=doc.createElement('x-screen');this.screen_.setAttribute('contenteditable','true');this.screen_.setAttribute('spellcheck','false');this.screen_.setAttribute('autocomplete','off');this.screen_.setAttribute('autocorrect','off');this.screen_.setAttribute('autocaptalize','none');this.screen_.setAttribute('role','textbox');this.screen_.setAttribute('tabindex','-1');this.screen_.style.cssText='caret-color: transparent;'+'display: block;'+'font-family: monospace;'+'font-size: 15px;'+'font-variant-ligatures: none;'+'height: 100%;'+'overflow-y: scroll; overflow-x: hidden;'+'white-space: pre;'+'width: 100%;'+'outline: none !important';doc.body.appendChild(this.screen_);this.screen_.addEventListener('scroll',this.onScroll_.bind(this));this.screen_.addEventListener('wheel',this.onScrollWheel_.bind(this));this.screen_.addEventListener('touchstart',this.onTouch_.bind(this));this.screen_.addEventListener('touchmove',this.onTouch_.bind(this));this.screen_.addEventListener('touchend',this.onTouch_.bind(this));this.screen_.addEventListener('touchcancel',this.onTouch_.bind(this));this.screen_.addEventListener('copy',this.onCopy_.bind(this));this.screen_.addEventListener('paste',this.onPaste_.bind(this));this.screen_.addEventListener('drop',this.onDragAndDrop_.bind(this));doc.body.addEventListener('keydown',this.onBodyKeyDown_.bind(this));// This is the main container for the fixed rows.
this.rowNodes_=doc.createElement('div');this.rowNodes_.id='hterm:row-nodes';this.rowNodes_.style.cssText='display: block;'+'position: fixed;'+'overflow: hidden;'+'-webkit-user-select: text;'+'-moz-user-select: text;';this.screen_.appendChild(this.rowNodes_);// Two nodes to hold offscreen text during the copy event.
this.topSelectBag_=doc.createElement('x-select-bag');this.topSelectBag_.style.cssText='display: block;'+'overflow: hidden;'+'height: var(--hterm-charsize-height);'+'white-space: pre;';this.bottomSelectBag_=this.topSelectBag_.cloneNode();// Nodes above the top fold and below the bottom fold are hidden.  They are
// only used to hold rows that are part of the selection but are currently
// scrolled off the top or bottom of the visible range.
this.topFold_=doc.createElement('x-fold');this.topFold_.id='hterm:top-fold-for-row-selection';this.topFold_.style.cssText='display: block;';this.rowNodes_.appendChild(this.topFold_);this.bottomFold_=this.topFold_.cloneNode();this.bottomFold_.id='hterm:bottom-fold-for-row-selection';this.rowNodes_.appendChild(this.bottomFold_);// This hidden div accounts for the vertical space that would be consumed by
// all the rows in the buffer if they were visible.  It's what causes the
// scrollbar to appear on the 'x-screen', and it moves within the screen when
// the scrollbar is moved.
//
// It is set 'visibility: hidden' to keep the browser from trying to include
// it in the selection when a user 'drag selects' upwards (drag the mouse to
// select and scroll at the same time).  Without this, the selection gets
// out of whack.
this.scrollArea_=doc.createElement('div');this.scrollArea_.id='hterm:scrollarea';this.scrollArea_.style.cssText='visibility: hidden';this.screen_.appendChild(this.scrollArea_);// This svg element is used to detect when the browser is zoomed.  It must be
// placed in the outermost document for currentScale to be correct.
// TODO(rginda): This means that hterm nested in an iframe will not correctly
// detect browser zoom level.  We should come up with a better solution.
// Note: This must be http:// else Chrome cannot create the element correctly.
var xmlns='http://www.w3.org/2000/svg';this.svg_=this.div_.ownerDocument.createElementNS(xmlns,'svg');this.svg_.id='hterm:zoom-detector';this.svg_.setAttribute('xmlns',xmlns);this.svg_.setAttribute('version','1.1');this.svg_.style.cssText='position: absolute;'+'top: 0;'+'left: 0;'+'visibility: hidden';// We send focus to this element just before a paste happens, so we can
// capture the pasted text and forward it on to someone who cares.
this.pasteTarget_=doc.createElement('textarea');this.pasteTarget_.id='hterm:ctrl-v-paste-target';this.pasteTarget_.setAttribute('tabindex','-1');this.pasteTarget_.style.cssText='position: absolute;'+'height: 1px;'+'width: 1px;'+'left: 0px; '+'bottom: 0px;'+'opacity: 0';this.pasteTarget_.contentEditable=true;this.screen_.appendChild(this.pasteTarget_);this.pasteTarget_.addEventListener('textInput',this.handlePasteTargetTextInput_.bind(this));this.resize();};/**
 * Select the font-family and font-smoothing for this scrollport.
 *
 * @param {string} fontFamily Value of the CSS 'font-family' to use for this
 *     scrollport.  Should be a monospace font.
 * @param {string} opt_smoothing Optional value for '-webkit-font-smoothing'.
 *     Defaults to an empty string if not specified.
 */hterm.ScrollPort.prototype.setFontFamily=function(fontFamily,opt_smoothing){this.screen_.style.fontFamily=fontFamily;if(opt_smoothing){this.screen_.style.webkitFontSmoothing=opt_smoothing;}else{this.screen_.style.webkitFontSmoothing='';}this.syncCharacterSize();};hterm.ScrollPort.prototype.getFontFamily=function(){return this.screen_.style.fontFamily;};/**
 * Set a custom stylesheet to include in the scrollport.
 *
 * Defaults to null, meaning no custom css is loaded.  Set it back to null or
 * the empty string to remove a previously applied custom css.
 */hterm.ScrollPort.prototype.setUserCssUrl=function(url){if(url){this.userCssLink_.setAttribute('href',url);if(!this.userCssLink_.parentNode)this.document_.head.appendChild(this.userCssLink_);}else if(this.userCssLink_.parentNode){this.document_.head.removeChild(this.userCssLink_);}};hterm.ScrollPort.prototype.setUserCssText=function(text){this.userCssText_.textContent=text;};hterm.ScrollPort.prototype.focus=function(){this.iframe_.focus();this.screen_.focus();};hterm.ScrollPort.prototype.getForegroundColor=function(){return this.screen_.style.color;};hterm.ScrollPort.prototype.setForegroundColor=function(color){this.screen_.style.color=color;};hterm.ScrollPort.prototype.getBackgroundColor=function(){return this.screen_.style.backgroundColor;};hterm.ScrollPort.prototype.setBackgroundColor=function(color){this.screen_.style.backgroundColor=color;};hterm.ScrollPort.prototype.setBackgroundImage=function(image){this.screen_.style.backgroundImage=image;};hterm.ScrollPort.prototype.setBackgroundSize=function(size){this.screen_.style.backgroundSize=size;};hterm.ScrollPort.prototype.setBackgroundPosition=function(position){this.screen_.style.backgroundPosition=position;};hterm.ScrollPort.prototype.setCtrlVPaste=function(ctrlVPaste){this.ctrlVPaste=ctrlVPaste;};/**
 * Get the usable size of the scrollport screen.
 *
 * The width will not include the scrollbar width.
 */hterm.ScrollPort.prototype.getScreenSize=function(){var size=hterm.getClientSize(this.screen_);return{height:size.height,width:size.width-this.currentScrollbarWidthPx};};/**
 * Get the usable width of the scrollport screen.
 *
 * This the widget width minus scrollbar width.
 */hterm.ScrollPort.prototype.getScreenWidth=function(){return this.getScreenSize().width;};/**
 * Get the usable height of the scrollport screen.
 */hterm.ScrollPort.prototype.getScreenHeight=function(){return this.getScreenSize().height;};/**
 * Return the document that holds the visible rows of this hterm.ScrollPort.
 */hterm.ScrollPort.prototype.getDocument=function(){return this.document_;};/**
 * Returns the x-screen element that holds the rows of this hterm.ScrollPort.
 */hterm.ScrollPort.prototype.getScreenNode=function(){return this.screen_;};/**
 * Clear out any cached rowNodes.
 */hterm.ScrollPort.prototype.resetCache=function(){this.currentRowNodeCache_=null;this.previousRowNodeCache_={};};/**
 * Change the current rowProvider.
 *
 * This will clear the row cache and cause a redraw.
 *
 * @param {Object} rowProvider An object capable of providing the rows
 *     in this hterm.ScrollPort.
 */hterm.ScrollPort.prototype.setRowProvider=function(rowProvider){this.resetCache();this.rowProvider_=rowProvider;this.scheduleRedraw();};/**
 * Inform the ScrollPort that the root DOM nodes for some or all of the visible
 * rows are no longer valid.
 *
 * Specifically, this should be called if this.rowProvider_.getRowNode() now
 * returns an entirely different node than it did before.  It does not
 * need to be called if the content of a row node is the only thing that
 * changed.
 *
 * This skips some of the overhead of a full redraw, but should not be used
 * in cases where the scrollport has been scrolled, or when the row count has
 * changed.
 */hterm.ScrollPort.prototype.invalidate=function(){var node=this.topFold_.nextSibling;while(node!=this.bottomFold_){var nextSibling=node.nextSibling;node.parentElement.removeChild(node);node=nextSibling;}this.previousRowNodeCache_=null;var topRowIndex=this.getTopRowIndex();var bottomRowIndex=this.getBottomRowIndex(topRowIndex);this.drawVisibleRows_(topRowIndex,bottomRowIndex);};hterm.ScrollPort.prototype.scheduleInvalidate=function(){if(this.timeouts_.invalidate)return;var self=this;this.timeouts_.invalidate=setTimeout(function(){delete self.timeouts_.invalidate;self.invalidate();},0);};/**
 * Set the font size of the ScrollPort.
 */hterm.ScrollPort.prototype.setFontSize=function(px){this.screen_.style.fontSize=px+'px';this.syncCharacterSize();};/**
 * Return the current font size of the ScrollPort.
 */hterm.ScrollPort.prototype.getFontSize=function(){return parseInt(this.screen_.style.fontSize);};/**
 * Measure the size of a single character in pixels.
 *
 * @param {string} opt_weight The font weight to measure, or 'normal' if
 *     omitted.
 * @return {hterm.Size} A new hterm.Size object.
 */hterm.ScrollPort.prototype.measureCharacterSize=function(opt_weight){// Number of lines used to average the height of a single character.
var numberOfLines=100;// Number of chars per line used to average the width of a single character.
var lineLength=100;if(!this.ruler_){this.ruler_=this.document_.createElement('div');this.ruler_.id='hterm:ruler-character-size';this.ruler_.style.cssText='position: absolute;'+'top: 0;'+'left: 0;'+'visibility: hidden;'+'height: auto !important;'+'width: auto !important;';// We need to put the text in a span to make the size calculation
// work properly in Firefox
this.rulerSpan_=this.document_.createElement('span');this.rulerSpan_.id='hterm:ruler-span-workaround';this.rulerSpan_.innerHTML=('X'.repeat(lineLength)+'\r').repeat(numberOfLines);this.ruler_.appendChild(this.rulerSpan_);this.rulerBaseline_=this.document_.createElement('span');this.rulerSpan_.id='hterm:ruler-baseline';// We want to collapse it on the baseline
this.rulerBaseline_.style.fontSize='0px';this.rulerBaseline_.textContent='X';}this.rulerSpan_.style.fontWeight=opt_weight||'';this.rowNodes_.appendChild(this.ruler_);var rulerSize=hterm.getClientSize(this.rulerSpan_);var size=new hterm.Size(rulerSize.width/lineLength,rulerSize.height/numberOfLines);this.ruler_.appendChild(this.rulerBaseline_);size.baseline=this.rulerBaseline_.offsetTop;this.ruler_.removeChild(this.rulerBaseline_);this.rowNodes_.removeChild(this.ruler_);this.div_.ownerDocument.body.appendChild(this.svg_);size.zoomFactor=this.svg_.currentScale;this.div_.ownerDocument.body.removeChild(this.svg_);return size;};/**
 * Synchronize the character size.
 *
 * This will re-measure the current character size and adjust the height
 * of an x-row to match.
 */hterm.ScrollPort.prototype.syncCharacterSize=function(){this.characterSize=this.measureCharacterSize();this.resize();};/**
 * Reset dimensions and visible row count to account for a change in the
 * dimensions of the 'x-screen'.
 */hterm.ScrollPort.prototype.resize=function(){this.currentScrollbarWidthPx=hterm.getClientWidth(this.screen_)-this.screen_.clientWidth;this.syncScrollHeight();this.syncRowNodesDimensions_();var self=this;this.publish('resize',{scrollPort:this},function(){self.scrollRowToBottom(self.rowProvider_.getRowCount());self.scheduleRedraw();});};/**
 * Set the position and size of the row nodes element.
 */hterm.ScrollPort.prototype.syncRowNodesDimensions_=function(){var screenSize=this.getScreenSize();this.lastScreenWidth_=screenSize.width;this.lastScreenHeight_=screenSize.height;// We don't want to show a partial row because it would be distracting
// in a terminal, so we floor any fractional row count.
this.visibleRowCount=lib.f.smartFloorDivide(screenSize.height,this.characterSize.height);// Then compute the height of our integral number of rows.
var visibleRowsHeight=this.visibleRowCount*this.characterSize.height;// Then the difference between the screen height and total row height needs to
// be made up for as top margin.  We need to record this value so it
// can be used later to determine the topRowIndex.
this.visibleRowTopMargin=0;this.visibleRowBottomMargin=screenSize.height-visibleRowsHeight;this.topFold_.style.marginBottom=this.visibleRowTopMargin+'px';var topFoldOffset=0;var node=this.topFold_.previousSibling;while(node){topFoldOffset+=hterm.getClientHeight(node);node=node.previousSibling;}// Set the dimensions of the visible rows container.
this.rowNodes_.style.width=screenSize.width+'px';this.rowNodes_.style.height=visibleRowsHeight+topFoldOffset+'px';this.rowNodes_.style.left=this.screen_.offsetLeft+'px';this.rowNodes_.style.top=this.screen_.offsetTop-topFoldOffset+'px';};hterm.ScrollPort.prototype.syncScrollHeight=function(){// Resize the scroll area to appear as though it contains every row.
this.lastRowCount_=this.rowProvider_.getRowCount();this.scrollArea_.style.height=this.characterSize.height*this.lastRowCount_+this.visibleRowTopMargin+this.visibleRowBottomMargin+'px';};/**
 * Schedule a redraw to happen asynchronously.
 *
 * If this method is called multiple times before the redraw has a chance to
 * run only one redraw occurs.
 */hterm.ScrollPort.prototype.scheduleRedraw=function(){if(this.timeouts_.redraw)return;var self=this;this.timeouts_.redraw=setTimeout(function(){delete self.timeouts_.redraw;self.redraw_();},0);};/**
 * Redraw the current hterm.ScrollPort based on the current scrollbar position.
 *
 * When redrawing, we are careful to make sure that the rows that start or end
 * the current selection are not touched in any way.  Doing so would disturb
 * the selection, and cleaning up after that would cause flashes at best and
 * incorrect selection at worst.  Instead, we modify the DOM around these nodes.
 * We even stash the selection start/end outside of the visible area if
 * they are not supposed to be visible in the hterm.ScrollPort.
 */hterm.ScrollPort.prototype.redraw_=function(){this.resetSelectBags_();this.selection.sync();this.syncScrollHeight();this.currentRowNodeCache_={};var topRowIndex=this.getTopRowIndex();var bottomRowIndex=this.getBottomRowIndex(topRowIndex);this.drawTopFold_(topRowIndex);this.drawBottomFold_(bottomRowIndex);this.drawVisibleRows_(topRowIndex,bottomRowIndex);this.syncRowNodesDimensions_();this.previousRowNodeCache_=this.currentRowNodeCache_;this.currentRowNodeCache_=null;this.isScrolledEnd=this.getTopRowIndex()+this.visibleRowCount>=this.lastRowCount_;};/**
 * Ensure that the nodes above the top fold are as they should be.
 *
 * If the selection start and/or end nodes are above the visible range
 * of this hterm.ScrollPort then the dom will be adjusted so that they appear
 * before the top fold (the first x-fold element, aka this.topFold).
 *
 * If not, the top fold will be the first element.
 *
 * It is critical that this method does not move the selection nodes.  Doing
 * so would clear the current selection.  Instead, the rest of the DOM is
 * adjusted around them.
 */hterm.ScrollPort.prototype.drawTopFold_=function(topRowIndex){if(!this.selection.startRow||this.selection.startRow.rowIndex>=topRowIndex){// Selection is entirely below the top fold, just make sure the fold is
// the first child.
if(this.rowNodes_.firstChild!=this.topFold_)this.rowNodes_.insertBefore(this.topFold_,this.rowNodes_.firstChild);return;}if(!this.selection.isMultiline||this.selection.endRow.rowIndex>=topRowIndex){// Only the startRow is above the fold.
if(this.selection.startRow.nextSibling!=this.topFold_)this.rowNodes_.insertBefore(this.topFold_,this.selection.startRow.nextSibling);}else{// Both rows are above the fold.
if(this.selection.endRow.nextSibling!=this.topFold_){this.rowNodes_.insertBefore(this.topFold_,this.selection.endRow.nextSibling);}// Trim any intermediate lines.
while(this.selection.startRow.nextSibling!=this.selection.endRow){this.rowNodes_.removeChild(this.selection.startRow.nextSibling);}}while(this.rowNodes_.firstChild!=this.selection.startRow){this.rowNodes_.removeChild(this.rowNodes_.firstChild);}};/**
 * Ensure that the nodes below the bottom fold are as they should be.
 *
 * If the selection start and/or end nodes are below the visible range
 * of this hterm.ScrollPort then the dom will be adjusted so that they appear
 * after the bottom fold (the second x-fold element, aka this.bottomFold).
 *
 * If not, the bottom fold will be the last element.
 *
 * It is critical that this method does not move the selection nodes.  Doing
 * so would clear the current selection.  Instead, the rest of the DOM is
 * adjusted around them.
 */hterm.ScrollPort.prototype.drawBottomFold_=function(bottomRowIndex){if(!this.selection.endRow||this.selection.endRow.rowIndex<=bottomRowIndex){// Selection is entirely above the bottom fold, just make sure the fold is
// the last child.
if(this.rowNodes_.lastChild!=this.bottomFold_)this.rowNodes_.appendChild(this.bottomFold_);return;}if(!this.selection.isMultiline||this.selection.startRow.rowIndex<=bottomRowIndex){// Only the endRow is below the fold.
if(this.bottomFold_.nextSibling!=this.selection.endRow)this.rowNodes_.insertBefore(this.bottomFold_,this.selection.endRow);}else{// Both rows are below the fold.
if(this.bottomFold_.nextSibling!=this.selection.startRow){this.rowNodes_.insertBefore(this.bottomFold_,this.selection.startRow);}// Trim any intermediate lines.
while(this.selection.startRow.nextSibling!=this.selection.endRow){this.rowNodes_.removeChild(this.selection.startRow.nextSibling);}}while(this.rowNodes_.lastChild!=this.selection.endRow){this.rowNodes_.removeChild(this.rowNodes_.lastChild);}};/**
 * Ensure that the rows between the top and bottom folds are as they should be.
 *
 * This method assumes that drawTopFold_() and drawBottomFold_() have already
 * run, and that they have left any visible selection row (selection start
 * or selection end) between the folds.
 *
 * It recycles DOM nodes from the previous redraw where possible, but will ask
 * the rowSource to make new nodes if necessary.
 *
 * It is critical that this method does not move the selection nodes.  Doing
 * so would clear the current selection.  Instead, the rest of the DOM is
 * adjusted around them.
 */hterm.ScrollPort.prototype.drawVisibleRows_=function(topRowIndex,bottomRowIndex){var self=this;// Keep removing nodes, starting with currentNode, until we encounter
// targetNode.  Throws on failure.
function removeUntilNode(currentNode,targetNode){while(currentNode!=targetNode){if(!currentNode)throw'Did not encounter target node';if(currentNode==self.bottomFold_)throw'Encountered bottom fold before target node';var deadNode=currentNode;currentNode=currentNode.nextSibling;deadNode.parentNode.removeChild(deadNode);}}// Shorthand for things we're going to use a lot.
var selectionStartRow=this.selection.startRow;var selectionEndRow=this.selection.endRow;var bottomFold=this.bottomFold_;// The node we're examining during the current iteration.
var node=this.topFold_.nextSibling;var targetDrawCount=Math.min(this.visibleRowCount,this.rowProvider_.getRowCount());for(var drawCount=0;drawCount<targetDrawCount;drawCount++){var rowIndex=topRowIndex+drawCount;if(node==bottomFold){// We've hit the bottom fold, we need to insert a new row.
var newNode=this.fetchRowNode_(rowIndex);if(!newNode){console.log("Couldn't fetch row index: "+rowIndex);break;}this.rowNodes_.insertBefore(newNode,node);continue;}if(node.rowIndex==rowIndex){// This node is in the right place, move along.
node=node.nextSibling;continue;}if(selectionStartRow&&selectionStartRow.rowIndex==rowIndex){// The selection start row is supposed to be here, remove nodes until
// we find it.
removeUntilNode(node,selectionStartRow);node=selectionStartRow.nextSibling;continue;}if(selectionEndRow&&selectionEndRow.rowIndex==rowIndex){// The selection end row is supposed to be here, remove nodes until
// we find it.
removeUntilNode(node,selectionEndRow);node=selectionEndRow.nextSibling;continue;}if(node==selectionStartRow||node==selectionEndRow){// We encountered the start/end of the selection, but we don't want it
// yet.  Insert a new row instead.
var newNode=this.fetchRowNode_(rowIndex);if(!newNode){console.log("Couldn't fetch row index: "+rowIndex);break;}this.rowNodes_.insertBefore(newNode,node);continue;}// There is nothing special about this node, but it's in our way.  Replace
// it with the node that should be here.
var newNode=this.fetchRowNode_(rowIndex);if(!newNode){console.log("Couldn't fetch row index: "+rowIndex);break;}if(node==newNode){node=node.nextSibling;continue;}this.rowNodes_.insertBefore(newNode,node);if(!newNode.nextSibling)debugger;this.rowNodes_.removeChild(node);node=newNode.nextSibling;}if(node!=this.bottomFold_)removeUntilNode(node,bottomFold);};/**
 * Empty out both select bags and remove them from the document.
 *
 * These nodes hold the text between the start and end of the selection
 * when that text is otherwise off screen.  They are filled out in the
 * onCopy_ event.
 */hterm.ScrollPort.prototype.resetSelectBags_=function(){if(this.topSelectBag_.parentNode){this.topSelectBag_.textContent='';this.topSelectBag_.parentNode.removeChild(this.topSelectBag_);}if(this.bottomSelectBag_.parentNode){this.bottomSelectBag_.textContent='';this.bottomSelectBag_.parentNode.removeChild(this.bottomSelectBag_);}};/**
 * Place a row node in the cache of visible nodes.
 *
 * This method may only be used during a redraw_.
 */hterm.ScrollPort.prototype.cacheRowNode_=function(rowNode){this.currentRowNodeCache_[rowNode.rowIndex]=rowNode;};/**
 * Fetch the row node for the given index.
 *
 * This will return a node from the cache if possible, or will request one
 * from the RowProvider if not.
 *
 * If a redraw_ is in progress the row will be added to the current cache.
 */hterm.ScrollPort.prototype.fetchRowNode_=function(rowIndex){var node;if(this.previousRowNodeCache_&&rowIndex in this.previousRowNodeCache_){node=this.previousRowNodeCache_[rowIndex];}else{node=this.rowProvider_.getRowNode(rowIndex);}if(this.currentRowNodeCache_)this.cacheRowNode_(node);return node;};/**
 * Select all rows in the viewport.
 */hterm.ScrollPort.prototype.selectAll=function(){var firstRow;if(this.topFold_.nextSibling.rowIndex!=0){while(this.topFold_.previousSibling){this.rowNodes_.removeChild(this.topFold_.previousSibling);}firstRow=this.fetchRowNode_(0);this.rowNodes_.insertBefore(firstRow,this.topFold_);this.syncRowNodesDimensions_();}else{firstRow=this.topFold_.nextSibling;}var lastRowIndex=this.rowProvider_.getRowCount()-1;var lastRow;if(this.bottomFold_.previousSibling.rowIndex!=lastRowIndex){while(this.bottomFold_.nextSibling){this.rowNodes_.removeChild(this.bottomFold_.nextSibling);}lastRow=this.fetchRowNode_(lastRowIndex);this.rowNodes_.appendChild(lastRow);}else{lastRow=this.bottomFold_.previousSibling.rowIndex;}var selection=this.document_.getSelection();selection.collapse(firstRow,0);selection.extend(lastRow,lastRow.childNodes.length);this.selection.sync();};/**
 * Return the maximum scroll position in pixels.
 */hterm.ScrollPort.prototype.getScrollMax_=function(e){return hterm.getClientHeight(this.scrollArea_)+this.visibleRowTopMargin+this.visibleRowBottomMargin-hterm.getClientHeight(this.screen_);};/**
 * Scroll the given rowIndex to the top of the hterm.ScrollPort.
 *
 * @param {integer} rowIndex Index of the target row.
 */hterm.ScrollPort.prototype.scrollRowToTop=function(rowIndex){this.syncScrollHeight();this.isScrolledEnd=rowIndex+this.visibleRowCount>=this.lastRowCount_;var scrollTop=rowIndex*this.characterSize.height+this.visibleRowTopMargin;var scrollMax=this.getScrollMax_();if(scrollTop>scrollMax)scrollTop=scrollMax;if(this.screen_.scrollTop==scrollTop)return;this.screen_.scrollTop=scrollTop;this.scheduleRedraw();};/**
 * Scroll the given rowIndex to the bottom of the hterm.ScrollPort.
 *
 * @param {integer} rowIndex Index of the target row.
 */hterm.ScrollPort.prototype.scrollRowToBottom=function(rowIndex){this.syncScrollHeight();this.isScrolledEnd=rowIndex+this.visibleRowCount>=this.lastRowCount_;var scrollTop=rowIndex*this.characterSize.height+this.visibleRowTopMargin+this.visibleRowBottomMargin;scrollTop-=this.visibleRowCount*this.characterSize.height;if(scrollTop<0)scrollTop=0;if(this.screen_.scrollTop==scrollTop)return;this.screen_.scrollTop=scrollTop;};/**
 * Return the row index of the first visible row.
 *
 * This is based on the scroll position.  If a redraw_ is in progress this
 * returns the row that *should* be at the top.
 */hterm.ScrollPort.prototype.getTopRowIndex=function(){return Math.round(this.screen_.scrollTop/this.characterSize.height);};/**
 * Return the row index of the last visible row.
 *
 * This is based on the scroll position.  If a redraw_ is in progress this
 * returns the row that *should* be at the bottom.
 */hterm.ScrollPort.prototype.getBottomRowIndex=function(topRowIndex){return topRowIndex+this.visibleRowCount-1;};/**
 * Handler for scroll events.
 *
 * The onScroll event fires when scrollArea's scrollTop property changes.  This
 * may be due to the user manually move the scrollbar, or a programmatic change.
 */hterm.ScrollPort.prototype.onScroll_=function(e){var screenSize=this.getScreenSize();if(screenSize.width!=this.lastScreenWidth_||screenSize.height!=this.lastScreenHeight_){// This event may also fire during a resize (but before the resize event!).
// This happens when the browser moves the scrollbar as part of the resize.
// In these cases, we want to ignore the scroll event and let onResize
// handle things.  If we don't, then we end up scrolling to the wrong
// position after a resize.
this.resize();return;}this.redraw_();this.publish('scroll',{scrollPort:this});};/**
 * Clients can override this if they want to hear scrollwheel events.
 *
 * Clients may call event.preventDefault() if they want to keep the scrollport
 * from also handling the events.
 */hterm.ScrollPort.prototype.onScrollWheel=function(e){};/**
 * Handler for scroll-wheel events.
 *
 * The onScrollWheel event fires when the user moves their scrollwheel over this
 * hterm.ScrollPort.  Because the frontmost element in the hterm.ScrollPort is
 * a fixed position DIV, the scroll wheel does nothing by default.  Instead, we
 * have to handle it manually.
 */hterm.ScrollPort.prototype.onScrollWheel_=function(e){this.onScrollWheel(e);if(e.defaultPrevented)return;// Figure out how far this event wants us to scroll.
var delta=this.scrollWheelDelta(e);var top=this.screen_.scrollTop-delta;if(top<0)top=0;var scrollMax=this.getScrollMax_();if(top>scrollMax)top=scrollMax;if(top!=this.screen_.scrollTop){// Moving scrollTop causes a scroll event, which triggers the redraw.
this.screen_.scrollTop=top;// Only preventDefault when we've actually scrolled.  If there's nothing
// to scroll we want to pass the event through so Chrome can detect the
// overscroll.
e.preventDefault();}};/**
 * Calculate how far a wheel event should scroll.
 *
 * @param {WheelEvent} e The mouse wheel event to process.
 * @return {number} How far (in pixels) to scroll.
 */hterm.ScrollPort.prototype.scrollWheelDelta=function(e){var delta;switch(e.deltaMode){case WheelEvent.DOM_DELTA_PIXEL:delta=e.deltaY*this.scrollWheelMultiplier_;break;case WheelEvent.DOM_DELTA_LINE:delta=e.deltaY*this.characterSize.height;break;case WheelEvent.DOM_DELTA_PAGE:delta=e.deltaY*this.characterSize.height*this.screen_.getHeight();break;}// The sign is inverted from what we would expect.
return delta*-1;};/**
 * Clients can override this if they want to hear touch events.
 *
 * Clients may call event.preventDefault() if they want to keep the scrollport
 * from also handling the events.
 */hterm.ScrollPort.prototype.onTouch=function(e){};/**
 * Handler for touch events.
 */hterm.ScrollPort.prototype.onTouch_=function(e){this.onTouch(e);if(e.defaultPrevented)return;// Extract the fields from the Touch event that we need.  If we saved the
// event directly, it has references to other objects (like x-row) that
// might stick around for a long time.  This way we only have small objects
// in our lastTouch_ state.
var scrubTouch=function scrubTouch(t){return{id:t.identifier,y:t.clientY,x:t.clientX};};var i,touch;switch(e.type){case'touchstart':// Save the current set of touches.
for(i=0;i<e.changedTouches.length;++i){touch=scrubTouch(e.changedTouches[i]);this.lastTouch_[touch.id]=touch;}break;case'touchcancel':case'touchend':// Throw away existing touches that we're finished with.
for(i=0;i<e.changedTouches.length;++i){delete this.lastTouch_[e.changedTouches[i].identifier];}break;case'touchmove':// Walk all of the touches in this one event and merge all of their
// changes into one delta.  This lets multiple fingers scroll faster.
var delta=0;for(i=0;i<e.changedTouches.length;++i){touch=scrubTouch(e.changedTouches[i]);delta+=this.lastTouch_[touch.id].y-touch.y;this.lastTouch_[touch.id]=touch;}// Invert to match the touchscreen scrolling direction of browser windows.
delta*=-1;var top=this.screen_.scrollTop-delta;if(top<0)top=0;var scrollMax=this.getScrollMax_();if(top>scrollMax)top=scrollMax;if(top!=this.screen_.scrollTop){// Moving scrollTop causes a scroll event, which triggers the redraw.
this.screen_.scrollTop=top;}break;}// To disable gestures or anything else interfering with our scrolling.
e.preventDefault();};/**
 * Handler for resize events.
 *
 * The browser will resize us such that the top row stays at the top, but we
 * prefer to the bottom row to stay at the bottom.
 */hterm.ScrollPort.prototype.onResize_=function(e){// Re-measure, since onResize also happens for browser zoom changes.
this.syncCharacterSize();};/**
 * Clients can override this if they want to hear copy events.
 *
 * Clients may call event.preventDefault() if they want to keep the scrollport
 * from also handling the events.
 */hterm.ScrollPort.prototype.onCopy=function(e){};/**
 * Handler for copy-to-clipboard events.
 *
 * If some or all of the selected rows are off screen we may need to fill in
 * the rows between selection start and selection end.  This handler determines
 * if we're missing some of the selected text, and if so populates one or both
 * of the "select bags" with the missing text.
 */hterm.ScrollPort.prototype.onCopy_=function(e){this.onCopy(e);if(e.defaultPrevented)return;this.resetSelectBags_();this.selection.sync();if(!this.selection.startRow||this.selection.endRow.rowIndex-this.selection.startRow.rowIndex<2){return;}var topRowIndex=this.getTopRowIndex();var bottomRowIndex=this.getBottomRowIndex(topRowIndex);if(this.selection.startRow.rowIndex<topRowIndex){// Start of selection is above the top fold.
var endBackfillIndex;if(this.selection.endRow.rowIndex<topRowIndex){// Entire selection is above the top fold.
endBackfillIndex=this.selection.endRow.rowIndex;}else{// Selection extends below the top fold.
endBackfillIndex=this.topFold_.nextSibling.rowIndex;}this.topSelectBag_.textContent=this.rowProvider_.getRowsText(this.selection.startRow.rowIndex+1,endBackfillIndex);this.rowNodes_.insertBefore(this.topSelectBag_,this.selection.startRow.nextSibling);this.syncRowNodesDimensions_();}if(this.selection.endRow.rowIndex>bottomRowIndex){// Selection ends below the bottom fold.
var startBackfillIndex;if(this.selection.startRow.rowIndex>bottomRowIndex){// Entire selection is below the bottom fold.
startBackfillIndex=this.selection.startRow.rowIndex+1;}else{// Selection starts above the bottom fold.
startBackfillIndex=this.bottomFold_.previousSibling.rowIndex+1;}this.bottomSelectBag_.textContent=this.rowProvider_.getRowsText(startBackfillIndex,this.selection.endRow.rowIndex);this.rowNodes_.insertBefore(this.bottomSelectBag_,this.selection.endRow);}};/**
 * Focuses on the paste target on a ctrl-v keydown event, as in
 * FF a content editable element must be focused before the paste event.
 */hterm.ScrollPort.prototype.onBodyKeyDown_=function(e){if(!this.ctrlVPaste)return;var key=String.fromCharCode(e.which);var lowerKey=key.toLowerCase();if((e.ctrlKey||e.metaKey)&&lowerKey=="v")this.pasteTarget_.focus();};/**
 * Handle a paste event on the the ScrollPort's screen element.
 *
 * TODO: Handle ClipboardData.files transfers.  https://crbug.com/433581.
 */hterm.ScrollPort.prototype.onPaste_=function(e){this.pasteTarget_.focus();var self=this;setTimeout(function(){self.publish('paste',{text:self.pasteTarget_.value});self.pasteTarget_.value='';self.screen_.focus();},0);};/**
 * Handles a textInput event on the paste target. Stops this from
 * propagating as we want this to be handled in the onPaste_ method.
 */hterm.ScrollPort.prototype.handlePasteTargetTextInput_=function(e){e.stopPropagation();};/**
 * Handle a drop event on the the ScrollPort's screen element.
 *
 * By default we try to copy in the structured format (HTML/whatever).
 * The shift key can select plain text though.
 *
 * TODO: Handle DataTransfer.files transfers.  https://crbug.com/433581.
 *
 * @param {DragEvent} e The drag event that fired us.
 */hterm.ScrollPort.prototype.onDragAndDrop_=function(e){e.preventDefault();var data=void 0;var format=void 0;// If the shift key isn't active, try to find a text source (but not plain
// text).  e.g. text/html is OK.
if(!e.shiftKey){e.dataTransfer.types.forEach(function(t){if(!format&&t!='text/plain'&&t.startsWith('text/'))format=t;});// If we found a non-plain text source, try it out first.
if(format)data=e.dataTransfer.getData(format);}// If we haven't loaded anything useful, fall back to plain text.
if(!data)data=e.dataTransfer.getData('text/plain');if(data)this.publish('paste',{text:data});};/**
 * Set the vertical scrollbar mode of the ScrollPort.
 */hterm.ScrollPort.prototype.setScrollbarVisible=function(state){this.screen_.style.overflowY=state?'scroll':'hidden';};/**
 * Set scroll wheel multiplier. This alters how much the screen scrolls on
 * mouse wheel events.
 */hterm.ScrollPort.prototype.setScrollWheelMoveMultipler=function(multiplier){this.scrollWheelMultiplier_=multiplier;};// SOURCE FILE: hterm/js/hterm_terminal.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';lib.rtdep('lib.colors','lib.PreferenceManager','lib.resource','lib.wc','lib.f','hterm.Keyboard','hterm.Options','hterm.PreferenceManager','hterm.Screen','hterm.ScrollPort','hterm.Size','hterm.TextAttributes','hterm.VT');/**
 * Constructor for the Terminal class.
 *
 * A Terminal pulls together the hterm.ScrollPort, hterm.Screen and hterm.VT100
 * classes to provide the complete terminal functionality.
 *
 * There are a number of lower-level Terminal methods that can be called
 * directly to manipulate the cursor, text, scroll region, and other terminal
 * attributes.  However, the primary method is interpret(), which parses VT
 * escape sequences and invokes the appropriate Terminal methods.
 *
 * This class was heavily influenced by Cory Maccarrone's Framebuffer class.
 *
 * TODO(rginda): Eventually we're going to need to support characters which are
 * displayed twice as wide as standard latin characters.  This is to support
 * CJK (and possibly other character sets).
 *
 * @param {string} opt_profileId Optional preference profile name.  If not
 *     provided, defaults to 'default'.
 */hterm.Terminal=function(opt_profileId){this.profileId_=null;// Two screen instances.
this.primaryScreen_=new hterm.Screen();this.alternateScreen_=new hterm.Screen();// The "current" screen.
this.screen_=this.primaryScreen_;// The local notion of the screen size.  ScreenBuffers also have a size which
// indicates their present size.  During size changes, the two may disagree.
// Also, the inactive screen's size is not altered until it is made the active
// screen.
this.screenSize=new hterm.Size(0,0);// The scroll port we'll be using to display the visible rows.
this.scrollPort_=new hterm.ScrollPort(this);this.scrollPort_.subscribe('resize',this.onResize_.bind(this));this.scrollPort_.subscribe('scroll',this.onScroll_.bind(this));this.scrollPort_.subscribe('paste',this.onPaste_.bind(this));this.scrollPort_.onCopy=this.onCopy_.bind(this);// The div that contains this terminal.
this.div_=null;// The document that contains the scrollPort.  Defaulted to the global
// document here so that the terminal is functional even if it hasn't been
// inserted into a document yet, but re-set in decorate().
this.document_=window.document;// The rows that have scrolled off screen and are no longer addressable.
this.scrollbackRows_=[];// Saved tab stops.
this.tabStops_=[];// Keep track of whether default tab stops have been erased; after a TBC
// clears all tab stops, defaults aren't restored on resize until a reset.
this.defaultTabStops=true;// The VT's notion of the top and bottom rows.  Used during some VT
// cursor positioning and scrolling commands.
this.vtScrollTop_=null;this.vtScrollBottom_=null;// The DIV element for the visible cursor.
this.cursorNode_=null;// The current cursor shape of the terminal.
this.cursorShape_=hterm.Terminal.cursorShape.BLOCK;// The current color of the cursor.
this.cursorColor_=null;// Cursor blink on/off cycle in ms, overwritten by prefs once they're loaded.
this.cursorBlinkCycle_=[100,100];// Pre-bound onCursorBlink_ handler, so we don't have to do this for each
// cursor on/off servicing.
this.myOnCursorBlink_=this.onCursorBlink_.bind(this);// These prefs are cached so we don't have to read from local storage with
// each output and keystroke.  They are initialized by the preference manager.
this.backgroundColor_=null;this.foregroundColor_=null;this.scrollOnOutput_=null;this.scrollOnKeystroke_=null;this.scrollWheelArrowKeys_=null;// True if we should override mouse event reporting to allow local selection.
this.defeatMouseReports_=false;// Terminal bell sound.
this.bellAudio_=this.document_.createElement('audio');this.bellAudio_.id='hterm:bell-audio';this.bellAudio_.setAttribute('preload','auto');// All terminal bell notifications that have been generated (not necessarily
// shown).
this.bellNotificationList_=[];// Whether we have permission to display notifications.
this.desktopNotificationBell_=false;// Cursor position and attributes saved with DECSC.
this.savedOptions_={};// The current mode bits for the terminal.
this.options_=new hterm.Options();// Timeouts we might need to clear.
this.timeouts_={};// The VT escape sequence interpreter.
this.vt=new hterm.VT(this);// The keyboard handler.
this.keyboard=new hterm.Keyboard(this);// General IO interface that can be given to third parties without exposing
// the entire terminal object.
this.io=new hterm.Terminal.IO(this);// True if mouse-click-drag should scroll the terminal.
this.enableMouseDragScroll=true;this.copyOnSelect=null;this.mouseRightClickPaste=null;this.mousePasteButton=null;// Whether to use the default window copy behavior.
this.useDefaultWindowCopy=false;this.clearSelectionAfterCopy=true;this.realizeSize_(80,24);this.setDefaultTabStops();this.reportFocus=false;this.setProfile(opt_profileId||'default',function(){this.onTerminalReady();}.bind(this));};/**
 * Possible cursor shapes.
 */hterm.Terminal.cursorShape={BLOCK:'BLOCK',BEAM:'BEAM',UNDERLINE:'UNDERLINE'};/**
 * Clients should override this to be notified when the terminal is ready
 * for use.
 *
 * The terminal initialization is asynchronous, and shouldn't be used before
 * this method is called.
 */hterm.Terminal.prototype.onTerminalReady=function(){};/**
 * Default tab with of 8 to match xterm.
 */hterm.Terminal.prototype.tabWidth=8;/**
 * Select a preference profile.
 *
 * This will load the terminal preferences for the given profile name and
 * associate subsequent preference changes with the new preference profile.
 *
 * @param {string} profileId The name of the preference profile.  Forward slash
 *     characters will be removed from the name.
 * @param {function} opt_callback Optional callback to invoke when the profile
 *     transition is complete.
 */hterm.Terminal.prototype.setProfile=function(profileId,opt_callback){this.profileId_=profileId.replace(/\//g,'');var terminal=this;if(this.prefs_)this.prefs_.deactivate();this.prefs_=new hterm.PreferenceManager(this.profileId_);this.prefs_.addObservers(null,{'alt-gr-mode':function altGrMode(v){if(v==null){if(navigator.language.toLowerCase()=='en-us'){v='none';}else{v='right-alt';}}else if(typeof v=='string'){v=v.toLowerCase();}else{v='none';}if(!/^(none|ctrl-alt|left-alt|right-alt)$/.test(v))v='none';terminal.keyboard.altGrMode=v;},'alt-backspace-is-meta-backspace':function altBackspaceIsMetaBackspace(v){terminal.keyboard.altBackspaceIsMetaBackspace=v;},'alt-is-meta':function altIsMeta(v){terminal.keyboard.altIsMeta=v;},'alt-sends-what':function altSendsWhat(v){if(!/^(escape|8-bit|browser-key)$/.test(v))v='escape';terminal.keyboard.altSendsWhat=v;},'audible-bell-sound':function audibleBellSound(v){var ary=v.match(/^lib-resource:(\S+)/);if(ary){terminal.bellAudio_.setAttribute('src',lib.resource.getDataUrl(ary[1]));}else{terminal.bellAudio_.setAttribute('src',v);}},'desktop-notification-bell':function desktopNotificationBell(v){if(v&&Notification){terminal.desktopNotificationBell_=Notification.permission==='granted';if(!terminal.desktopNotificationBell_){// Note: We don't call Notification.requestPermission here because
// Chrome requires the call be the result of a user action (such as an
// onclick handler), and pref listeners are run asynchronously.
//
// A way of working around this would be to display a dialog in the
// terminal with a "click-to-request-permission" button.
console.warn('desktop-notification-bell is true but we do not have '+'permission to display notifications.');}}else{terminal.desktopNotificationBell_=false;}},'background-color':function backgroundColor(v){terminal.setBackgroundColor(v);},'background-image':function backgroundImage(v){terminal.scrollPort_.setBackgroundImage(v);},'background-size':function backgroundSize(v){terminal.scrollPort_.setBackgroundSize(v);},'background-position':function backgroundPosition(v){terminal.scrollPort_.setBackgroundPosition(v);},'backspace-sends-backspace':function backspaceSendsBackspace(v){terminal.keyboard.backspaceSendsBackspace=v;},'character-map-overrides':function characterMapOverrides(v){if(!(v==null||v instanceof Object)){console.warn('Preference character-map-modifications is not an '+'object: '+v);return;}terminal.vt.characterMaps.reset();terminal.vt.characterMaps.setOverrides(v);},'cursor-blink':function cursorBlink(v){terminal.setCursorBlink(!!v);},'cursor-blink-cycle':function cursorBlinkCycle(v){if(v instanceof Array&&typeof v[0]=='number'&&typeof v[1]=='number'){terminal.cursorBlinkCycle_=v;}else if(typeof v=='number'){terminal.cursorBlinkCycle_=[v,v];}else{// Fast blink indicates an error.
terminal.cursorBlinkCycle_=[100,100];}},'cursor-color':function cursorColor(v){terminal.setCursorColor(v);},'color-palette-overrides':function colorPaletteOverrides(v){if(!(v==null||v instanceof Object||v instanceof Array)){console.warn('Preference color-palette-overrides is not an array or '+'object: '+v);return;}lib.colors.colorPalette=lib.colors.stockColorPalette.concat();if(v){for(var key in v){var i=parseInt(key);if(isNaN(i)||i<0||i>255){console.log('Invalid value in palette: '+key+': '+v[key]);continue;}if(v[i]){var rgb=lib.colors.normalizeCSS(v[i]);if(rgb)lib.colors.colorPalette[i]=rgb;}}}terminal.primaryScreen_.textAttributes.resetColorPalette();terminal.alternateScreen_.textAttributes.resetColorPalette();},'copy-on-select':function copyOnSelect(v){terminal.copyOnSelect=!!v;},'use-default-window-copy':function useDefaultWindowCopy(v){terminal.useDefaultWindowCopy=!!v;},'clear-selection-after-copy':function clearSelectionAfterCopy(v){terminal.clearSelectionAfterCopy=!!v;},'ctrl-plus-minus-zero-zoom':function ctrlPlusMinusZeroZoom(v){terminal.keyboard.ctrlPlusMinusZeroZoom=v;},'ctrl-c-copy':function ctrlCCopy(v){terminal.keyboard.ctrlCCopy=v;},'ctrl-v-paste':function ctrlVPaste(v){terminal.keyboard.ctrlVPaste=v;terminal.scrollPort_.setCtrlVPaste(v);},'east-asian-ambiguous-as-two-column':function eastAsianAmbiguousAsTwoColumn(v){lib.wc.regardCjkAmbiguous=v;},'enable-8-bit-control':function enable8BitControl(v){terminal.vt.enable8BitControl=!!v;},'enable-bold':function enableBold(v){terminal.syncBoldSafeState();},'enable-bold-as-bright':function enableBoldAsBright(v){terminal.primaryScreen_.textAttributes.enableBoldAsBright=!!v;terminal.alternateScreen_.textAttributes.enableBoldAsBright=!!v;},'enable-blink':function enableBlink(v){terminal.syncBlinkState();},'enable-clipboard-write':function enableClipboardWrite(v){terminal.vt.enableClipboardWrite=!!v;},'enable-dec12':function enableDec12(v){terminal.vt.enableDec12=!!v;},'font-family':function fontFamily(v){terminal.syncFontFamily();},'font-size':function fontSize(v){terminal.setFontSize(v);},'font-smoothing':function fontSmoothing(v){terminal.syncFontFamily();},'foreground-color':function foregroundColor(v){terminal.setForegroundColor(v);},'home-keys-scroll':function homeKeysScroll(v){terminal.keyboard.homeKeysScroll=v;},'keybindings':function keybindings(v){terminal.keyboard.bindings.clear();if(!v)return;if(!(v instanceof Object)){console.error('Error in keybindings preference: Expected object');return;}try{terminal.keyboard.bindings.addBindings(v);}catch(ex){console.error('Error in keybindings preference: '+ex);}},'max-string-sequence':function maxStringSequence(v){terminal.vt.maxStringSequence=v;},'media-keys-are-fkeys':function mediaKeysAreFkeys(v){terminal.keyboard.mediaKeysAreFKeys=v;},'meta-sends-escape':function metaSendsEscape(v){terminal.keyboard.metaSendsEscape=v;},'mouse-right-click-paste':function mouseRightClickPaste(v){terminal.mouseRightClickPaste=v;},'mouse-paste-button':function mousePasteButton(v){terminal.syncMousePasteButton();},'page-keys-scroll':function pageKeysScroll(v){terminal.keyboard.pageKeysScroll=v;},'pass-alt-number':function passAltNumber(v){if(v==null){var osx=window.navigator.userAgent.match(/Mac OS X/);// Let Alt-1..9 pass to the browser (to control tab switching) on
// non-OS X systems, or if hterm is not opened in an app window.
v=!osx&&hterm.windowType!='popup';}terminal.passAltNumber=v;},'pass-ctrl-number':function passCtrlNumber(v){if(v==null){var osx=window.navigator.userAgent.match(/Mac OS X/);// Let Ctrl-1..9 pass to the browser (to control tab switching) on
// non-OS X systems, or if hterm is not opened in an app window.
v=!osx&&hterm.windowType!='popup';}terminal.passCtrlNumber=v;},'pass-meta-number':function passMetaNumber(v){if(v==null){var osx=window.navigator.userAgent.match(/Mac OS X/);// Let Meta-1..9 pass to the browser (to control tab switching) on
// OS X systems, or if hterm is not opened in an app window.
v=osx&&hterm.windowType!='popup';}terminal.passMetaNumber=v;},'pass-meta-v':function passMetaV(v){terminal.keyboard.passMetaV=v;},'receive-encoding':function receiveEncoding(v){if(!/^(utf-8|raw)$/.test(v)){console.warn('Invalid value for "receive-encoding": '+v);v='utf-8';}terminal.vt.characterEncoding=v;},'scroll-on-keystroke':function scrollOnKeystroke(v){terminal.scrollOnKeystroke_=v;},'scroll-on-output':function scrollOnOutput(v){terminal.scrollOnOutput_=v;},'scrollbar-visible':function scrollbarVisible(v){terminal.setScrollbarVisible(v);},'scroll-wheel-may-send-arrow-keys':function scrollWheelMaySendArrowKeys(v){terminal.scrollWheelArrowKeys_=v;},'scroll-wheel-move-multiplier':function scrollWheelMoveMultiplier(v){terminal.setScrollWheelMoveMultipler(v);},'send-encoding':function sendEncoding(v){if(!/^(utf-8|raw)$/.test(v)){console.warn('Invalid value for "send-encoding": '+v);v='utf-8';}terminal.keyboard.characterEncoding=v;},'shift-insert-paste':function shiftInsertPaste(v){terminal.keyboard.shiftInsertPaste=v;},'terminal-encoding':function terminalEncoding(v){terminal.vt.setEncoding(v);},'user-css':function userCss(v){terminal.scrollPort_.setUserCssUrl(v);},'user-css-text':function userCssText(v){terminal.scrollPort_.setUserCssText(v);},'word-break-match-left':function wordBreakMatchLeft(v){terminal.primaryScreen_.wordBreakMatchLeft=v;terminal.alternateScreen_.wordBreakMatchLeft=v;},'word-break-match-right':function wordBreakMatchRight(v){terminal.primaryScreen_.wordBreakMatchRight=v;terminal.alternateScreen_.wordBreakMatchRight=v;},'word-break-match-middle':function wordBreakMatchMiddle(v){terminal.primaryScreen_.wordBreakMatchMiddle=v;terminal.alternateScreen_.wordBreakMatchMiddle=v;}});this.prefs_.readStorage(function(){this.prefs_.notifyAll();if(opt_callback)opt_callback();}.bind(this));};/**
 * Returns the preferences manager used for configuring this terminal.
 *
 * @return {hterm.PreferenceManager}
 */hterm.Terminal.prototype.getPrefs=function(){return this.prefs_;};/**
 * Enable or disable bracketed paste mode.
 *
 * @param {boolean} state The value to set.
 */hterm.Terminal.prototype.setBracketedPaste=function(state){this.options_.bracketedPaste=state;};/**
 * Set the color for the cursor.
 *
 * If you want this setting to persist, set it through prefs_, rather than
 * with this method.
 *
 * @param {string} color The color to set.
 */hterm.Terminal.prototype.setCursorColor=function(color){this.cursorColor_=color;this.cursorNode_.style.backgroundColor=color;this.cursorNode_.style.borderColor=color;};/**
 * Return the current cursor color as a string.
 * @return {string}
 */hterm.Terminal.prototype.getCursorColor=function(){return this.cursorColor_;};/**
 * Enable or disable mouse based text selection in the terminal.
 *
 * @param {boolean} state The value to set.
 */hterm.Terminal.prototype.setSelectionEnabled=function(state){this.enableMouseDragScroll=state;};/**
 * Set the background color.
 *
 * If you want this setting to persist, set it through prefs_, rather than
 * with this method.
 *
 * @param {string} color The color to set.
 */hterm.Terminal.prototype.setBackgroundColor=function(color){this.backgroundColor_=lib.colors.normalizeCSS(color);this.primaryScreen_.textAttributes.setDefaults(this.foregroundColor_,this.backgroundColor_);this.alternateScreen_.textAttributes.setDefaults(this.foregroundColor_,this.backgroundColor_);this.scrollPort_.setBackgroundColor(color);};/**
 * Return the current terminal background color.
 *
 * Intended for use by other classes, so we don't have to expose the entire
 * prefs_ object.
 *
 * @return {string}
 */hterm.Terminal.prototype.getBackgroundColor=function(){return this.backgroundColor_;};/**
 * Set the foreground color.
 *
 * If you want this setting to persist, set it through prefs_, rather than
 * with this method.
 *
 * @param {string} color The color to set.
 */hterm.Terminal.prototype.setForegroundColor=function(color){this.foregroundColor_=lib.colors.normalizeCSS(color);this.primaryScreen_.textAttributes.setDefaults(this.foregroundColor_,this.backgroundColor_);this.alternateScreen_.textAttributes.setDefaults(this.foregroundColor_,this.backgroundColor_);this.scrollPort_.setForegroundColor(color);};/**
 * Return the current terminal foreground color.
 *
 * Intended for use by other classes, so we don't have to expose the entire
 * prefs_ object.
 *
 * @return {string}
 */hterm.Terminal.prototype.getForegroundColor=function(){return this.foregroundColor_;};/**
 * Create a new instance of a terminal command and run it with a given
 * argument string.
 *
 * @param {function} commandClass The constructor for a terminal command.
 * @param {string} argString The argument string to pass to the command.
 */hterm.Terminal.prototype.runCommandClass=function(commandClass,argString){var environment=this.prefs_.get('environment');if((typeof environment==='undefined'?'undefined':_typeof2(environment))!='object'||environment==null)environment={};var self=this;this.command=new commandClass({argString:argString||'',io:this.io.push(),environment:environment,onExit:function onExit(code){self.io.pop();self.uninstallKeyboard();if(self.prefs_.get('close-on-exit'))window.close();}});this.installKeyboard();this.command.run();};/**
 * Returns true if the current screen is the primary screen, false otherwise.
 *
 * @return {boolean}
 */hterm.Terminal.prototype.isPrimaryScreen=function(){return this.screen_==this.primaryScreen_;};/**
 * Install the keyboard handler for this terminal.
 *
 * This will prevent the browser from seeing any keystrokes sent to the
 * terminal.
 */hterm.Terminal.prototype.installKeyboard=function(){this.keyboard.installKeyboard(this.scrollPort_.getDocument().body);};/**
 * Uninstall the keyboard handler for this terminal.
 */hterm.Terminal.prototype.uninstallKeyboard=function(){this.keyboard.installKeyboard(null);};/**
 * Set a CSS variable.
 *
 * Normally this is used to set variables in the hterm namespace.
 *
 * @param {string} name The variable to set.
 * @param {string} value The value to assign to the variable.
 * @param {string?} opt_prefix The variable namespace/prefix to use.
 */hterm.Terminal.prototype.setCssVar=function(name,value){var opt_prefix=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'--hterm-';this.document_.documentElement.style.setProperty(''+opt_prefix+name,value);};/**
 * Set the font size for this terminal.
 *
 * Call setFontSize(0) to reset to the default font size.
 *
 * This function does not modify the font-size preference.
 *
 * @param {number} px The desired font size, in pixels.
 */hterm.Terminal.prototype.setFontSize=function(px){if(px===0)px=this.prefs_.get('font-size');this.scrollPort_.setFontSize(px);this.setCssVar('charsize-width',this.scrollPort_.characterSize.width+'px');this.setCssVar('charsize-height',this.scrollPort_.characterSize.height+'px');};/**
 * Get the current font size.
 *
 * @return {number}
 */hterm.Terminal.prototype.getFontSize=function(){return this.scrollPort_.getFontSize();};/**
 * Get the current font family.
 *
 * @return {string}
 */hterm.Terminal.prototype.getFontFamily=function(){return this.scrollPort_.getFontFamily();};/**
 * Set the CSS "font-family" for this terminal.
 */hterm.Terminal.prototype.syncFontFamily=function(){this.scrollPort_.setFontFamily(this.prefs_.get('font-family'),this.prefs_.get('font-smoothing'));this.syncBoldSafeState();};/**
 * Set this.mousePasteButton based on the mouse-paste-button pref,
 * autodetecting if necessary.
 */hterm.Terminal.prototype.syncMousePasteButton=function(){var button=this.prefs_.get('mouse-paste-button');if(typeof button=='number'){this.mousePasteButton=button;return;}var ary=navigator.userAgent.match(/\(X11;\s+(\S+)/);if(!ary||ary[1]=='CrOS'){this.mousePasteButton=1;// Middle mouse button.
}else{this.mousePasteButton=2;// Right mouse button.
}};/**
 * Enable or disable bold based on the enable-bold pref, autodetecting if
 * necessary.
 */hterm.Terminal.prototype.syncBoldSafeState=function(){var enableBold=this.prefs_.get('enable-bold');if(enableBold!==null){this.primaryScreen_.textAttributes.enableBold=enableBold;this.alternateScreen_.textAttributes.enableBold=enableBold;return;}var normalSize=this.scrollPort_.measureCharacterSize();var boldSize=this.scrollPort_.measureCharacterSize('bold');var isBoldSafe=normalSize.equals(boldSize);if(!isBoldSafe){console.warn('Bold characters disabled: Size of bold weight differs '+'from normal.  Font family is: '+this.scrollPort_.getFontFamily());}this.primaryScreen_.textAttributes.enableBold=isBoldSafe;this.alternateScreen_.textAttributes.enableBold=isBoldSafe;};/**
 * Enable or disable blink based on the enable-blink pref.
 */hterm.Terminal.prototype.syncBlinkState=function(){this.setCssVar('node-duration',this.prefs_.get('enable-blink')?'0.7s':'0');};/**
 * Set the mouse cursor style based on the current terminal mode.
 */hterm.Terminal.prototype.syncMouseStyle=function(){this.setCssVar('mouse-cursor-style',this.vt.mouseReport==this.vt.MOUSE_REPORT_DISABLED?'var(--hterm-mouse-cursor-text)':'var(--hterm-mouse-cursor-pointer)');};/**
 * Return a copy of the current cursor position.
 *
 * @return {hterm.RowCol} The RowCol object representing the current position.
 */hterm.Terminal.prototype.saveCursor=function(){return this.screen_.cursorPosition.clone();};/**
 * Return the current text attributes.
 *
 * @return {string}
 */hterm.Terminal.prototype.getTextAttributes=function(){return this.screen_.textAttributes;};/**
 * Set the text attributes.
 *
 * @param {string} textAttributes The attributes to set.
 */hterm.Terminal.prototype.setTextAttributes=function(textAttributes){this.screen_.textAttributes=textAttributes;};/**
 * Return the current browser zoom factor applied to the terminal.
 *
 * @return {number} The current browser zoom factor.
 */hterm.Terminal.prototype.getZoomFactor=function(){return this.scrollPort_.characterSize.zoomFactor;};/**
 * Change the title of this terminal's window.
 *
 * @param {string} title The title to set.
 */hterm.Terminal.prototype.setWindowTitle=function(title){window.document.title=title;};/**
 * Restore a previously saved cursor position.
 *
 * @param {hterm.RowCol} cursor The position to restore.
 */hterm.Terminal.prototype.restoreCursor=function(cursor){var row=lib.f.clamp(cursor.row,0,this.screenSize.height-1);var column=lib.f.clamp(cursor.column,0,this.screenSize.width-1);this.screen_.setCursorPosition(row,column);if(cursor.column>column||cursor.column==column&&cursor.overflow){this.screen_.cursorPosition.overflow=true;}};/**
 * Clear the cursor's overflow flag.
 */hterm.Terminal.prototype.clearCursorOverflow=function(){this.screen_.cursorPosition.overflow=false;};/**
 * Sets the cursor shape
 *
 * @param {string} shape The shape to set.
 */hterm.Terminal.prototype.setCursorShape=function(shape){this.cursorShape_=shape;this.restyleCursor_();};/**
 * Get the cursor shape
 *
 * @return {string}
 */hterm.Terminal.prototype.getCursorShape=function(){return this.cursorShape_;};/**
 * Set the width of the terminal, resizing the UI to match.
 *
 * @param {number} columnCount
 */hterm.Terminal.prototype.setWidth=function(columnCount){if(columnCount==null){this.div_.style.width='100%';return;}this.div_.style.width=Math.ceil(this.scrollPort_.characterSize.width*columnCount+this.scrollPort_.currentScrollbarWidthPx)+'px';this.realizeSize_(columnCount,this.screenSize.height);this.scheduleSyncCursorPosition_();};/**
 * Set the height of the terminal, resizing the UI to match.
 *
 * @param {number} rowCount The height in rows.
 */hterm.Terminal.prototype.setHeight=function(rowCount){if(rowCount==null){this.div_.style.height='100%';return;}this.div_.style.height=this.scrollPort_.characterSize.height*rowCount+'px';this.realizeSize_(this.screenSize.width,rowCount);this.scheduleSyncCursorPosition_();};/**
 * Deal with terminal size changes.
 *
 * @param {number} columnCount The number of columns.
 * @param {number} rowCount The number of rows.
 */hterm.Terminal.prototype.realizeSize_=function(columnCount,rowCount){if(columnCount!=this.screenSize.width)this.realizeWidth_(columnCount);if(rowCount!=this.screenSize.height)this.realizeHeight_(rowCount);// Send new terminal size to plugin.
this.io.onTerminalResize_(columnCount,rowCount);};/**
 * Deal with terminal width changes.
 *
 * This function does what needs to be done when the terminal width changes
 * out from under us.  It happens here rather than in onResize_() because this
 * code may need to run synchronously to handle programmatic changes of
 * terminal width.
 *
 * Relying on the browser to send us an async resize event means we may not be
 * in the correct state yet when the next escape sequence hits.
 *
 * @param {number} columnCount The number of columns.
 */hterm.Terminal.prototype.realizeWidth_=function(columnCount){if(columnCount<=0)throw new Error('Attempt to realize bad width: '+columnCount);var deltaColumns=columnCount-this.screen_.getWidth();this.screenSize.width=columnCount;this.screen_.setColumnCount(columnCount);if(deltaColumns>0){if(this.defaultTabStops)this.setDefaultTabStops(this.screenSize.width-deltaColumns);}else{for(var i=this.tabStops_.length-1;i>=0;i--){if(this.tabStops_[i]<columnCount)break;this.tabStops_.pop();}}this.screen_.setColumnCount(this.screenSize.width);};/**
 * Deal with terminal height changes.
 *
 * This function does what needs to be done when the terminal height changes
 * out from under us.  It happens here rather than in onResize_() because this
 * code may need to run synchronously to handle programmatic changes of
 * terminal height.
 *
 * Relying on the browser to send us an async resize event means we may not be
 * in the correct state yet when the next escape sequence hits.
 *
 * @param {number} rowCount The number of rows.
 */hterm.Terminal.prototype.realizeHeight_=function(rowCount){if(rowCount<=0)throw new Error('Attempt to realize bad height: '+rowCount);var deltaRows=rowCount-this.screen_.getHeight();this.screenSize.height=rowCount;var cursor=this.saveCursor();if(deltaRows<0){// Screen got smaller.
deltaRows*=-1;while(deltaRows){var lastRow=this.getRowCount()-1;if(lastRow-this.scrollbackRows_.length==cursor.row)break;if(this.getRowText(lastRow))break;this.screen_.popRow();deltaRows--;}var ary=this.screen_.shiftRows(deltaRows);this.scrollbackRows_.push.apply(this.scrollbackRows_,ary);// We just removed rows from the top of the screen, we need to update
// the cursor to match.
cursor.row=Math.max(cursor.row-deltaRows,0);}else if(deltaRows>0){// Screen got larger.
if(deltaRows<=this.scrollbackRows_.length){var scrollbackCount=Math.min(deltaRows,this.scrollbackRows_.length);var rows=this.scrollbackRows_.splice(this.scrollbackRows_.length-scrollbackCount,scrollbackCount);this.screen_.unshiftRows(rows);deltaRows-=scrollbackCount;cursor.row+=scrollbackCount;}if(deltaRows)this.appendRows_(deltaRows);}this.setVTScrollRegion(null,null);this.restoreCursor(cursor);};/**
 * Scroll the terminal to the top of the scrollback buffer.
 */hterm.Terminal.prototype.scrollHome=function(){this.scrollPort_.scrollRowToTop(0);};/**
 * Scroll the terminal to the end.
 */hterm.Terminal.prototype.scrollEnd=function(){this.scrollPort_.scrollRowToBottom(this.getRowCount());};/**
 * Scroll the terminal one page up (minus one line) relative to the current
 * position.
 */hterm.Terminal.prototype.scrollPageUp=function(){var i=this.scrollPort_.getTopRowIndex();this.scrollPort_.scrollRowToTop(i-this.screenSize.height+1);};/**
 * Scroll the terminal one page down (minus one line) relative to the current
 * position.
 */hterm.Terminal.prototype.scrollPageDown=function(){var i=this.scrollPort_.getTopRowIndex();this.scrollPort_.scrollRowToTop(i+this.screenSize.height-1);};/**
 * Scroll the terminal one line up relative to the current position.
 */hterm.Terminal.prototype.scrollLineUp=function(){var i=this.scrollPort_.getTopRowIndex();this.scrollPort_.scrollRowToTop(i-1);};/**
 * Scroll the terminal one line down relative to the current position.
 */hterm.Terminal.prototype.scrollLineDown=function(){var i=this.scrollPort_.getTopRowIndex();this.scrollPort_.scrollRowToTop(i+1);};/**
 * Clear primary screen, secondary screen, and the scrollback buffer.
 */hterm.Terminal.prototype.wipeContents=function(){this.scrollbackRows_.length=0;this.scrollPort_.resetCache();[this.primaryScreen_,this.alternateScreen_].forEach(function(screen){var bottom=screen.getHeight();if(bottom>0){this.renumberRows_(0,bottom);this.clearHome(screen);}}.bind(this));this.syncCursorPosition_();this.scrollPort_.invalidate();};/**
 * Full terminal reset.
 */hterm.Terminal.prototype.reset=function(){this.clearAllTabStops();this.setDefaultTabStops();this.clearHome(this.primaryScreen_);this.primaryScreen_.textAttributes.reset();this.clearHome(this.alternateScreen_);this.alternateScreen_.textAttributes.reset();this.setCursorBlink(!!this.prefs_.get('cursor-blink'));this.vt.reset();this.softReset();};/**
 * Soft terminal reset.
 *
 * Perform a soft reset to the default values listed in
 * http://www.vt100.net/docs/vt510-rm/DECSTR#T5-9
 */hterm.Terminal.prototype.softReset=function(){// Reset terminal options to their default values.
this.options_=new hterm.Options();// We show the cursor on soft reset but do not alter the blink state.
this.options_.cursorBlink=!!this.timeouts_.cursorBlink;// Xterm also resets the color palette on soft reset, even though it doesn't
// seem to be documented anywhere.
this.primaryScreen_.textAttributes.resetColorPalette();this.alternateScreen_.textAttributes.resetColorPalette();// The xterm man page explicitly says this will happen on soft reset.
this.setVTScrollRegion(null,null);// Xterm also shows the cursor on soft reset, but does not alter the blink
// state.
this.setCursorVisible(true);};/**
 * Move the cursor forward to the next tab stop, or to the last column
 * if no more tab stops are set.
 */hterm.Terminal.prototype.forwardTabStop=function(){var column=this.screen_.cursorPosition.column;for(var i=0;i<this.tabStops_.length;i++){if(this.tabStops_[i]>column){this.setCursorColumn(this.tabStops_[i]);return;}}// xterm does not clear the overflow flag on HT or CHT.
var overflow=this.screen_.cursorPosition.overflow;this.setCursorColumn(this.screenSize.width-1);this.screen_.cursorPosition.overflow=overflow;};/**
 * Move the cursor backward to the previous tab stop, or to the first column
 * if no previous tab stops are set.
 */hterm.Terminal.prototype.backwardTabStop=function(){var column=this.screen_.cursorPosition.column;for(var i=this.tabStops_.length-1;i>=0;i--){if(this.tabStops_[i]<column){this.setCursorColumn(this.tabStops_[i]);return;}}this.setCursorColumn(1);};/**
 * Set a tab stop at the given column.
 *
 * @param {integer} column Zero based column.
 */hterm.Terminal.prototype.setTabStop=function(column){for(var i=this.tabStops_.length-1;i>=0;i--){if(this.tabStops_[i]==column)return;if(this.tabStops_[i]<column){this.tabStops_.splice(i+1,0,column);return;}}this.tabStops_.splice(0,0,column);};/**
 * Clear the tab stop at the current cursor position.
 *
 * No effect if there is no tab stop at the current cursor position.
 */hterm.Terminal.prototype.clearTabStopAtCursor=function(){var column=this.screen_.cursorPosition.column;var i=this.tabStops_.indexOf(column);if(i==-1)return;this.tabStops_.splice(i,1);};/**
 * Clear all tab stops.
 */hterm.Terminal.prototype.clearAllTabStops=function(){this.tabStops_.length=0;this.defaultTabStops=false;};/**
 * Set up the default tab stops, starting from a given column.
 *
 * This sets a tabstop every (column % this.tabWidth) column, starting
 * from the specified column, or 0 if no column is provided.  It also flags
 * future resizes to set them up.
 *
 * This does not clear the existing tab stops first, use clearAllTabStops
 * for that.
 *
 * @param {integer} opt_start Optional starting zero based starting column, useful
 *     for filling out missing tab stops when the terminal is resized.
 */hterm.Terminal.prototype.setDefaultTabStops=function(opt_start){var start=opt_start||0;var w=this.tabWidth;// Round start up to a default tab stop.
start=start-1-(start-1)%w+w;for(var i=start;i<this.screenSize.width;i+=w){this.setTabStop(i);}this.defaultTabStops=true;};/**
 * Interpret a sequence of characters.
 *
 * Incomplete escape sequences are buffered until the next call.
 *
 * @param {string} str Sequence of characters to interpret or pass through.
 */hterm.Terminal.prototype.interpret=function(str){this.vt.interpret(str);this.scheduleSyncCursorPosition_();};/**
 * Take over the given DIV for use as the terminal display.
 *
 * @param {HTMLDivElement} div The div to use as the terminal display.
 */hterm.Terminal.prototype.decorate=function(div){this.div_=div;this.scrollPort_.decorate(div);this.scrollPort_.setBackgroundImage(this.prefs_.get('background-image'));this.scrollPort_.setBackgroundSize(this.prefs_.get('background-size'));this.scrollPort_.setBackgroundPosition(this.prefs_.get('background-position'));this.scrollPort_.setUserCssUrl(this.prefs_.get('user-css'));this.scrollPort_.setUserCssText(this.prefs_.get('user-css-text'));this.div_.focus=this.focus.bind(this);this.setFontSize(this.prefs_.get('font-size'));this.syncFontFamily();this.setScrollbarVisible(this.prefs_.get('scrollbar-visible'));this.setScrollWheelMoveMultipler(this.prefs_.get('scroll-wheel-move-multiplier'));this.document_=this.scrollPort_.getDocument();this.document_.body.oncontextmenu=function(){return false;};var onMouse=this.onMouse_.bind(this);var screenNode=this.scrollPort_.getScreenNode();screenNode.addEventListener('mousedown',onMouse);screenNode.addEventListener('mouseup',onMouse);screenNode.addEventListener('mousemove',onMouse);this.scrollPort_.onScrollWheel=onMouse;screenNode.addEventListener('focus',this.onFocusChange_.bind(this,true));// Listen for mousedown events on the screenNode as in FF the focus
// events don't bubble.
screenNode.addEventListener('mousedown',function(){setTimeout(this.onFocusChange_.bind(this,true));}.bind(this));screenNode.addEventListener('blur',this.onFocusChange_.bind(this,false));var style=this.document_.createElement('style');style.textContent='.cursor-node[focus="false"] {'+'  box-sizing: border-box;'+'  background-color: transparent !important;'+'  border-width: 2px;'+'  border-style: solid;'+'}'+'.wc-node {'+'  display: inline-block;'+'  text-align: center;'+'  width: calc(var(--hterm-charsize-width) * 2);'+'  line-height: var(--hterm-charsize-height);'+'}'+':root {'+'  --hterm-charsize-width: '+this.scrollPort_.characterSize.width+'px;'+'  --hterm-charsize-height: '+this.scrollPort_.characterSize.height+'px;'+// Default position hides the cursor for when the window is initializing.
'  --hterm-cursor-offset-col: -1;'+'  --hterm-cursor-offset-row: -1;'+'  --hterm-blink-node-duration: 0.7s;'+'  --hterm-mouse-cursor-text: text;'+'  --hterm-mouse-cursor-pointer: default;'+'  --hterm-mouse-cursor-style: var(--hterm-mouse-cursor-text);'+'}'+'@keyframes blink {'+'  from { opacity: 1.0; }'+'  to { opacity: 0.0; }'+'}'+'.blink-node {'+'  animation-name: blink;'+'  animation-duration: var(--hterm-blink-node-duration);'+'  animation-iteration-count: infinite;'+'  animation-timing-function: ease-in-out;'+'  animation-direction: alternate;'+'}';this.document_.head.appendChild(style);this.cursorNode_=this.document_.createElement('div');this.cursorNode_.id='hterm:terminal-cursor';this.cursorNode_.className='cursor-node';this.cursorNode_.style.cssText='position: absolute;'+'left: calc(var(--hterm-charsize-width) * var(--hterm-cursor-offset-col));'+'top: calc(var(--hterm-charsize-height) * var(--hterm-cursor-offset-row));'+'display: block;'+'width: var(--hterm-charsize-width);'+'height: var(--hterm-charsize-height);'+'-webkit-transition: opacity, background-color 100ms linear;'+'-moz-transition: opacity, background-color 100ms linear;';this.setCursorColor(this.prefs_.get('cursor-color'));this.setCursorBlink(!!this.prefs_.get('cursor-blink'));this.restyleCursor_();this.document_.body.appendChild(this.cursorNode_);// When 'enableMouseDragScroll' is off we reposition this element directly
// under the mouse cursor after a click.  This makes Chrome associate
// subsequent mousemove events with the scroll-blocker.  Since the
// scroll-blocker is a peer (not a child) of the scrollport, the mousemove
// events do not cause the scrollport to scroll.
//
// It's a hack, but it's the cleanest way I could find.
this.scrollBlockerNode_=this.document_.createElement('div');this.scrollBlockerNode_.id='hterm:mouse-drag-scroll-blocker';this.scrollBlockerNode_.style.cssText='position: absolute;'+'top: -99px;'+'display: block;'+'width: 10px;'+'height: 10px;';this.document_.body.appendChild(this.scrollBlockerNode_);this.scrollPort_.onScrollWheel=onMouse;['mousedown','mouseup','mousemove','click','dblclick'].forEach(function(event){this.scrollBlockerNode_.addEventListener(event,onMouse);this.cursorNode_.addEventListener(event,onMouse);this.document_.addEventListener(event,onMouse);}.bind(this));this.cursorNode_.addEventListener('mousedown',function(){setTimeout(this.focus.bind(this));}.bind(this));this.setReverseVideo(false);this.scrollPort_.focus();this.scrollPort_.scheduleRedraw();};/**
 * Return the HTML document that contains the terminal DOM nodes.
 *
 * @return {HTMLDocument}
 */hterm.Terminal.prototype.getDocument=function(){return this.document_;};/**
 * Focus the terminal.
 */hterm.Terminal.prototype.focus=function(){this.scrollPort_.focus();};/**
 * Return the HTML Element for a given row index.
 *
 * This is a method from the RowProvider interface.  The ScrollPort uses
 * it to fetch rows on demand as they are scrolled into view.
 *
 * TODO(rginda): Consider saving scrollback rows as (HTML source, text content)
 * pairs to conserve memory.
 *
 * @param {integer} index The zero-based row index, measured relative to the
 *     start of the scrollback buffer.  On-screen rows will always have the
 *     largest indices.
 * @return {HTMLElement} The 'x-row' element containing for the requested row.
 */hterm.Terminal.prototype.getRowNode=function(index){if(index<this.scrollbackRows_.length)return this.scrollbackRows_[index];var screenIndex=index-this.scrollbackRows_.length;return this.screen_.rowsArray[screenIndex];};/**
 * Return the text content for a given range of rows.
 *
 * This is a method from the RowProvider interface.  The ScrollPort uses
 * it to fetch text content on demand when the user attempts to copy their
 * selection to the clipboard.
 *
 * @param {integer} start The zero-based row index to start from, measured
 *     relative to the start of the scrollback buffer.  On-screen rows will
 *     always have the largest indices.
 * @param {integer} end The zero-based row index to end on, measured
 *     relative to the start of the scrollback buffer.
 * @return {string} A single string containing the text value of the range of
 *     rows.  Lines will be newline delimited, with no trailing newline.
 */hterm.Terminal.prototype.getRowsText=function(start,end){var ary=[];for(var i=start;i<end;i++){var node=this.getRowNode(i);ary.push(node.textContent);if(i<end-1&&!node.getAttribute('line-overflow'))ary.push('\n');}return ary.join('');};/**
 * Return the text content for a given row.
 *
 * This is a method from the RowProvider interface.  The ScrollPort uses
 * it to fetch text content on demand when the user attempts to copy their
 * selection to the clipboard.
 *
 * @param {integer} index The zero-based row index to return, measured
 *     relative to the start of the scrollback buffer.  On-screen rows will
 *     always have the largest indices.
 * @return {string} A string containing the text value of the selected row.
 */hterm.Terminal.prototype.getRowText=function(index){var node=this.getRowNode(index);return node.textContent;};/**
 * Return the total number of rows in the addressable screen and in the
 * scrollback buffer of this terminal.
 *
 * This is a method from the RowProvider interface.  The ScrollPort uses
 * it to compute the size of the scrollbar.
 *
 * @return {integer} The number of rows in this terminal.
 */hterm.Terminal.prototype.getRowCount=function(){return this.scrollbackRows_.length+this.screen_.rowsArray.length;};/**
 * Create DOM nodes for new rows and append them to the end of the terminal.
 *
 * This is the only correct way to add a new DOM node for a row.  Notice that
 * the new row is appended to the bottom of the list of rows, and does not
 * require renumbering (of the rowIndex property) of previous rows.
 *
 * If you think you want a new blank row somewhere in the middle of the
 * terminal, look into moveRows_().
 *
 * This method does not pay attention to vtScrollTop/Bottom, since you should
 * be using moveRows() in cases where they would matter.
 *
 * The cursor will be positioned at column 0 of the first inserted line.
 *
 * @param {number} count The number of rows to created.
 */hterm.Terminal.prototype.appendRows_=function(count){var cursorRow=this.screen_.rowsArray.length;var offset=this.scrollbackRows_.length+cursorRow;for(var i=0;i<count;i++){var row=this.document_.createElement('x-row');row.appendChild(this.document_.createTextNode(''));row.rowIndex=offset+i;this.screen_.pushRow(row);}var extraRows=this.screen_.rowsArray.length-this.screenSize.height;if(extraRows>0){var ary=this.screen_.shiftRows(extraRows);Array.prototype.push.apply(this.scrollbackRows_,ary);if(this.scrollPort_.isScrolledEnd)this.scheduleScrollDown_();}if(cursorRow>=this.screen_.rowsArray.length)cursorRow=this.screen_.rowsArray.length-1;this.setAbsoluteCursorPosition(cursorRow,0);};/**
 * Relocate rows from one part of the addressable screen to another.
 *
 * This is used to recycle rows during VT scrolls (those which are driven
 * by VT commands, rather than by the user manipulating the scrollbar.)
 *
 * In this case, the blank lines scrolled into the scroll region are made of
 * the nodes we scrolled off.  These have their rowIndex properties carefully
 * renumbered so as not to confuse the ScrollPort.
 *
 * @param {number} fromIndex The start index.
 * @param {number} count The number of rows to move.
 * @param {number} toIndex The destination index.
 */hterm.Terminal.prototype.moveRows_=function(fromIndex,count,toIndex){var ary=this.screen_.removeRows(fromIndex,count);this.screen_.insertRows(toIndex,ary);var start,end;if(fromIndex<toIndex){start=fromIndex;end=toIndex+count;}else{start=toIndex;end=fromIndex+count;}this.renumberRows_(start,end);this.scrollPort_.scheduleInvalidate();};/**
 * Renumber the rowIndex property of the given range of rows.
 *
 * The start and end indices are relative to the screen, not the scrollback.
 * Rows in the scrollback buffer cannot be renumbered.  Since they are not
 * addressable (you can't delete them, scroll them, etc), you should have
 * no need to renumber scrollback rows.
 *
 * @param {number} start The start index.
 * @param {number} end The end index.
 * @param {hterm.Screen} opt_screen The screen to renumber.
 */hterm.Terminal.prototype.renumberRows_=function(start,end,opt_screen){var screen=opt_screen||this.screen_;var offset=this.scrollbackRows_.length;for(var i=start;i<end;i++){screen.rowsArray[i].rowIndex=offset+i;}};/**
 * Print a string to the terminal.
 *
 * This respects the current insert and wraparound modes.  It will add new lines
 * to the end of the terminal, scrolling off the top into the scrollback buffer
 * if necessary.
 *
 * The string is *not* parsed for escape codes.  Use the interpret() method if
 * that's what you're after.
 *
 * @param{string} str The string to print.
 */hterm.Terminal.prototype.print=function(str){var startOffset=0;var strWidth=lib.wc.strWidth(str);// Fun edge case: If the string only contains zero width codepoints (like
// combining characters), we make sure to iterate at least once below.
if(strWidth==0&&str)strWidth=1;while(startOffset<strWidth){if(this.options_.wraparound&&this.screen_.cursorPosition.overflow){this.screen_.commitLineOverflow();this.newLine();}var count=strWidth-startOffset;var didOverflow=false;var substr;if(this.screen_.cursorPosition.column+count>=this.screenSize.width){didOverflow=true;count=this.screenSize.width-this.screen_.cursorPosition.column;}if(didOverflow&&!this.options_.wraparound){// If the string overflowed the line but wraparound is off, then the
// last printed character should be the last of the string.
// TODO: This will add to our problems with multibyte UTF-16 characters.
substr=lib.wc.substr(str,startOffset,count-1)+lib.wc.substr(str,strWidth-1);count=strWidth;}else{substr=lib.wc.substr(str,startOffset,count);}var tokens=hterm.TextAttributes.splitWidecharString(substr);for(var i=0;i<tokens.length;i++){this.screen_.textAttributes.wcNode=tokens[i].wcNode;this.screen_.textAttributes.asciiNode=tokens[i].asciiNode;if(this.options_.insertMode){this.screen_.insertString(tokens[i].str,tokens[i].wcStrWidth);}else{this.screen_.overwriteString(tokens[i].str,tokens[i].wcStrWidth);}this.screen_.textAttributes.wcNode=false;this.screen_.textAttributes.asciiNode=true;}this.screen_.maybeClipCurrentRow();startOffset+=count;}this.scheduleSyncCursorPosition_();if(this.scrollOnOutput_)this.scrollPort_.scrollRowToBottom(this.getRowCount());};/**
 * Set the VT scroll region.
 *
 * This also resets the cursor position to the absolute (0, 0) position, since
 * that's what xterm appears to do.
 *
 * Setting the scroll region to the full height of the terminal will clear
 * the scroll region.  This is *NOT* what most terminals do.  We're explicitly
 * going "off-spec" here because it makes `screen` and `tmux` overflow into the
 * local scrollback buffer, which means the scrollbars and shift-pgup/pgdn
 * continue to work as most users would expect.
 *
 * @param {integer} scrollTop The zero-based top of the scroll region.
 * @param {integer} scrollBottom The zero-based bottom of the scroll region,
 *     inclusive.
 */hterm.Terminal.prototype.setVTScrollRegion=function(scrollTop,scrollBottom){if(scrollTop==0&&scrollBottom==this.screenSize.height-1){this.vtScrollTop_=null;this.vtScrollBottom_=null;}else{this.vtScrollTop_=scrollTop;this.vtScrollBottom_=scrollBottom;}};/**
 * Return the top row index according to the VT.
 *
 * This will return 0 unless the terminal has been told to restrict scrolling
 * to some lower row.  It is used for some VT cursor positioning and scrolling
 * commands.
 *
 * @return {integer} The topmost row in the terminal's scroll region.
 */hterm.Terminal.prototype.getVTScrollTop=function(){if(this.vtScrollTop_!=null)return this.vtScrollTop_;return 0;};/**
 * Return the bottom row index according to the VT.
 *
 * This will return the height of the terminal unless the it has been told to
 * restrict scrolling to some higher row.  It is used for some VT cursor
 * positioning and scrolling commands.
 *
 * @return {integer} The bottom most row in the terminal's scroll region.
 */hterm.Terminal.prototype.getVTScrollBottom=function(){if(this.vtScrollBottom_!=null)return this.vtScrollBottom_;return this.screenSize.height-1;};/**
 * Process a '\n' character.
 *
 * If the cursor is on the final row of the terminal this will append a new
 * blank row to the screen and scroll the topmost row into the scrollback
 * buffer.
 *
 * Otherwise, this moves the cursor to column zero of the next row.
 */hterm.Terminal.prototype.newLine=function(){var cursorAtEndOfScreen=this.screen_.cursorPosition.row==this.screen_.rowsArray.length-1;if(this.vtScrollBottom_!=null){// A VT Scroll region is active, we never append new rows.
if(this.screen_.cursorPosition.row==this.vtScrollBottom_){// We're at the end of the VT Scroll Region, perform a VT scroll.
this.vtScrollUp(1);this.setAbsoluteCursorPosition(this.screen_.cursorPosition.row,0);}else if(cursorAtEndOfScreen){// We're at the end of the screen, the only thing to do is put the
// cursor to column 0.
this.setAbsoluteCursorPosition(this.screen_.cursorPosition.row,0);}else{// Anywhere else, advance the cursor row, and reset the column.
this.setAbsoluteCursorPosition(this.screen_.cursorPosition.row+1,0);}}else if(cursorAtEndOfScreen){// We're at the end of the screen.  Append a new row to the terminal,
// shifting the top row into the scrollback.
this.appendRows_(1);}else{// Anywhere else in the screen just moves the cursor.
this.setAbsoluteCursorPosition(this.screen_.cursorPosition.row+1,0);}};/**
 * Like newLine(), except maintain the cursor column.
 */hterm.Terminal.prototype.lineFeed=function(){var column=this.screen_.cursorPosition.column;this.newLine();this.setCursorColumn(column);};/**
 * If autoCarriageReturn is set then newLine(), else lineFeed().
 */hterm.Terminal.prototype.formFeed=function(){if(this.options_.autoCarriageReturn){this.newLine();}else{this.lineFeed();}};/**
 * Move the cursor up one row, possibly inserting a blank line.
 *
 * The cursor column is not changed.
 */hterm.Terminal.prototype.reverseLineFeed=function(){var scrollTop=this.getVTScrollTop();var currentRow=this.screen_.cursorPosition.row;if(currentRow==scrollTop){this.insertLines(1);}else{this.setAbsoluteCursorRow(currentRow-1);}};/**
 * Replace all characters to the left of the current cursor with the space
 * character.
 *
 * TODO(rginda): This should probably *remove* the characters (not just replace
 * with a space) if there are no characters at or beyond the current cursor
 * position.
 */hterm.Terminal.prototype.eraseToLeft=function(){var cursor=this.saveCursor();this.setCursorColumn(0);var count=cursor.column+1;this.screen_.overwriteString(lib.f.getWhitespace(count),count);this.restoreCursor(cursor);};/**
 * Erase a given number of characters to the right of the cursor.
 *
 * The cursor position is unchanged.
 *
 * If the current background color is not the default background color this
 * will insert spaces rather than delete.  This is unfortunate because the
 * trailing space will affect text selection, but it's difficult to come up
 * with a way to style empty space that wouldn't trip up the hterm.Screen
 * code.
 *
 * eraseToRight is ignored in the presence of a cursor overflow.  This deviates
 * from xterm, but agrees with gnome-terminal and konsole, xfce4-terminal.  See
 * crbug.com/232390 for details.
 *
 * @param {number} opt_count The number of characters to erase.
 */hterm.Terminal.prototype.eraseToRight=function(opt_count){if(this.screen_.cursorPosition.overflow)return;var maxCount=this.screenSize.width-this.screen_.cursorPosition.column;var count=opt_count?Math.min(opt_count,maxCount):maxCount;if(this.screen_.textAttributes.background===this.screen_.textAttributes.DEFAULT_COLOR){var cursorRow=this.screen_.rowsArray[this.screen_.cursorPosition.row];if(hterm.TextAttributes.nodeWidth(cursorRow)<=this.screen_.cursorPosition.column+count){this.screen_.deleteChars(count);this.clearCursorOverflow();return;}}var cursor=this.saveCursor();this.screen_.overwriteString(lib.f.getWhitespace(count),count);this.restoreCursor(cursor);this.clearCursorOverflow();};/**
 * Erase the current line.
 *
 * The cursor position is unchanged.
 */hterm.Terminal.prototype.eraseLine=function(){var cursor=this.saveCursor();this.screen_.clearCursorRow();this.restoreCursor(cursor);this.clearCursorOverflow();};/**
 * Erase all characters from the start of the screen to the current cursor
 * position, regardless of scroll region.
 *
 * The cursor position is unchanged.
 */hterm.Terminal.prototype.eraseAbove=function(){var cursor=this.saveCursor();this.eraseToLeft();for(var i=0;i<cursor.row;i++){this.setAbsoluteCursorPosition(i,0);this.screen_.clearCursorRow();}this.restoreCursor(cursor);this.clearCursorOverflow();};/**
 * Erase all characters from the current cursor position to the end of the
 * screen, regardless of scroll region.
 *
 * The cursor position is unchanged.
 */hterm.Terminal.prototype.eraseBelow=function(){var cursor=this.saveCursor();this.eraseToRight();var bottom=this.screenSize.height-1;for(var i=cursor.row+1;i<=bottom;i++){this.setAbsoluteCursorPosition(i,0);this.screen_.clearCursorRow();}this.restoreCursor(cursor);this.clearCursorOverflow();};/**
 * Fill the terminal with a given character.
 *
 * This methods does not respect the VT scroll region.
 *
 * @param {string} ch The character to use for the fill.
 */hterm.Terminal.prototype.fill=function(ch){var cursor=this.saveCursor();this.setAbsoluteCursorPosition(0,0);for(var row=0;row<this.screenSize.height;row++){for(var col=0;col<this.screenSize.width;col++){this.setAbsoluteCursorPosition(row,col);this.screen_.overwriteString(ch,1);}}this.restoreCursor(cursor);};/**
 * Erase the entire display and leave the cursor at (0, 0).
 *
 * This does not respect the scroll region.
 *
 * @param {hterm.Screen} opt_screen Optional screen to operate on.  Defaults
 *     to the current screen.
 */hterm.Terminal.prototype.clearHome=function(opt_screen){var screen=opt_screen||this.screen_;var bottom=screen.getHeight();if(bottom==0){// Empty screen, nothing to do.
return;}for(var i=0;i<bottom;i++){screen.setCursorPosition(i,0);screen.clearCursorRow();}screen.setCursorPosition(0,0);};/**
 * Erase the entire display without changing the cursor position.
 *
 * The cursor position is unchanged.  This does not respect the scroll
 * region.
 *
 * @param {hterm.Screen} opt_screen Optional screen to operate on.  Defaults
 *     to the current screen.
 */hterm.Terminal.prototype.clear=function(opt_screen){var screen=opt_screen||this.screen_;var cursor=screen.cursorPosition.clone();this.clearHome(screen);screen.setCursorPosition(cursor.row,cursor.column);};/**
 * VT command to insert lines at the current cursor row.
 *
 * This respects the current scroll region.  Rows pushed off the bottom are
 * lost (they won't show up in the scrollback buffer).
 *
 * @param {integer} count The number of lines to insert.
 */hterm.Terminal.prototype.insertLines=function(count){var cursorRow=this.screen_.cursorPosition.row;var bottom=this.getVTScrollBottom();count=Math.min(count,bottom-cursorRow);// The moveCount is the number of rows we need to relocate to make room for
// the new row(s).  The count is the distance to move them.
var moveCount=bottom-cursorRow-count+1;if(moveCount)this.moveRows_(cursorRow,moveCount,cursorRow+count);for(var i=count-1;i>=0;i--){this.setAbsoluteCursorPosition(cursorRow+i,0);this.screen_.clearCursorRow();}};/**
 * VT command to delete lines at the current cursor row.
 *
 * New rows are added to the bottom of scroll region to take their place.  New
 * rows are strictly there to take up space and have no content or style.
 *
 * @param {number} count The number of lines to delete.
 */hterm.Terminal.prototype.deleteLines=function(count){var cursor=this.saveCursor();var top=cursor.row;var bottom=this.getVTScrollBottom();var maxCount=bottom-top+1;count=Math.min(count,maxCount);var moveStart=bottom-count+1;if(count!=maxCount)this.moveRows_(top,count,moveStart);for(var i=0;i<count;i++){this.setAbsoluteCursorPosition(moveStart+i,0);this.screen_.clearCursorRow();}this.restoreCursor(cursor);this.clearCursorOverflow();};/**
 * Inserts the given number of spaces at the current cursor position.
 *
 * The cursor position is not changed.
 *
 * @param {number} count The number of spaces to insert.
 */hterm.Terminal.prototype.insertSpace=function(count){var cursor=this.saveCursor();var ws=lib.f.getWhitespace(count||1);this.screen_.insertString(ws,ws.length);this.screen_.maybeClipCurrentRow();this.restoreCursor(cursor);this.clearCursorOverflow();};/**
 * Forward-delete the specified number of characters starting at the cursor
 * position.
 *
 * @param {integer} count The number of characters to delete.
 */hterm.Terminal.prototype.deleteChars=function(count){var deleted=this.screen_.deleteChars(count);if(deleted&&!this.screen_.textAttributes.isDefault()){var cursor=this.saveCursor();this.setCursorColumn(this.screenSize.width-deleted);this.screen_.insertString(lib.f.getWhitespace(deleted));this.restoreCursor(cursor);}this.clearCursorOverflow();};/**
 * Shift rows in the scroll region upwards by a given number of lines.
 *
 * New rows are inserted at the bottom of the scroll region to fill the
 * vacated rows.  The new rows not filled out with the current text attributes.
 *
 * This function does not affect the scrollback rows at all.  Rows shifted
 * off the top are lost.
 *
 * The cursor position is not altered.
 *
 * @param {integer} count The number of rows to scroll.
 */hterm.Terminal.prototype.vtScrollUp=function(count){var cursor=this.saveCursor();this.setAbsoluteCursorRow(this.getVTScrollTop());this.deleteLines(count);this.restoreCursor(cursor);};/**
 * Shift rows below the cursor down by a given number of lines.
 *
 * This function respects the current scroll region.
 *
 * New rows are inserted at the top of the scroll region to fill the
 * vacated rows.  The new rows not filled out with the current text attributes.
 *
 * This function does not affect the scrollback rows at all.  Rows shifted
 * off the bottom are lost.
 *
 * @param {integer} count The number of rows to scroll.
 */hterm.Terminal.prototype.vtScrollDown=function(opt_count){var cursor=this.saveCursor();this.setAbsoluteCursorPosition(this.getVTScrollTop(),0);this.insertLines(opt_count);this.restoreCursor(cursor);};/**
 * Set the cursor position.
 *
 * The cursor row is relative to the scroll region if the terminal has
 * 'origin mode' enabled, or relative to the addressable screen otherwise.
 *
 * @param {integer} row The new zero-based cursor row.
 * @param {integer} row The new zero-based cursor column.
 */hterm.Terminal.prototype.setCursorPosition=function(row,column){if(this.options_.originMode){this.setRelativeCursorPosition(row,column);}else{this.setAbsoluteCursorPosition(row,column);}};/**
 * Move the cursor relative to its current position.
 *
 * @param {number} row
 * @param {number} column
 */hterm.Terminal.prototype.setRelativeCursorPosition=function(row,column){var scrollTop=this.getVTScrollTop();row=lib.f.clamp(row+scrollTop,scrollTop,this.getVTScrollBottom());column=lib.f.clamp(column,0,this.screenSize.width-1);this.screen_.setCursorPosition(row,column);};/**
 * Move the cursor to the specified position.
 *
 * @param {number} row
 * @param {number} column
 */hterm.Terminal.prototype.setAbsoluteCursorPosition=function(row,column){row=lib.f.clamp(row,0,this.screenSize.height-1);column=lib.f.clamp(column,0,this.screenSize.width-1);this.screen_.setCursorPosition(row,column);};/**
 * Set the cursor column.
 *
 * @param {integer} column The new zero-based cursor column.
 */hterm.Terminal.prototype.setCursorColumn=function(column){this.setAbsoluteCursorPosition(this.screen_.cursorPosition.row,column);};/**
 * Return the cursor column.
 *
 * @return {integer} The zero-based cursor column.
 */hterm.Terminal.prototype.getCursorColumn=function(){return this.screen_.cursorPosition.column;};/**
 * Set the cursor row.
 *
 * The cursor row is relative to the scroll region if the terminal has
 * 'origin mode' enabled, or relative to the addressable screen otherwise.
 *
 * @param {integer} row The new cursor row.
 */hterm.Terminal.prototype.setAbsoluteCursorRow=function(row){this.setAbsoluteCursorPosition(row,this.screen_.cursorPosition.column);};/**
 * Return the cursor row.
 *
 * @return {integer} The zero-based cursor row.
 */hterm.Terminal.prototype.getCursorRow=function(){return this.screen_.cursorPosition.row;};/**
 * Request that the ScrollPort redraw itself soon.
 *
 * The redraw will happen asynchronously, soon after the call stack winds down.
 * Multiple calls will be coalesced into a single redraw.
 */hterm.Terminal.prototype.scheduleRedraw_=function(){if(this.timeouts_.redraw)return;var self=this;this.timeouts_.redraw=setTimeout(function(){delete self.timeouts_.redraw;self.scrollPort_.redraw_();},0);};/**
 * Request that the ScrollPort be scrolled to the bottom.
 *
 * The scroll will happen asynchronously, soon after the call stack winds down.
 * Multiple calls will be coalesced into a single scroll.
 *
 * This affects the scrollbar position of the ScrollPort, and has nothing to
 * do with the VT scroll commands.
 */hterm.Terminal.prototype.scheduleScrollDown_=function(){if(this.timeouts_.scrollDown)return;var self=this;this.timeouts_.scrollDown=setTimeout(function(){delete self.timeouts_.scrollDown;self.scrollPort_.scrollRowToBottom(self.getRowCount());},10);};/**
 * Move the cursor up a specified number of rows.
 *
 * @param {integer} count The number of rows to move the cursor.
 */hterm.Terminal.prototype.cursorUp=function(count){return this.cursorDown(-(count||1));};/**
 * Move the cursor down a specified number of rows.
 *
 * @param {integer} count The number of rows to move the cursor.
 */hterm.Terminal.prototype.cursorDown=function(count){count=count||1;var minHeight=this.options_.originMode?this.getVTScrollTop():0;var maxHeight=this.options_.originMode?this.getVTScrollBottom():this.screenSize.height-1;var row=lib.f.clamp(this.screen_.cursorPosition.row+count,minHeight,maxHeight);this.setAbsoluteCursorRow(row);};/**
 * Move the cursor left a specified number of columns.
 *
 * If reverse wraparound mode is enabled and the previous row wrapped into
 * the current row then we back up through the wraparound as well.
 *
 * @param {integer} count The number of columns to move the cursor.
 */hterm.Terminal.prototype.cursorLeft=function(count){count=count||1;if(count<1)return;var currentColumn=this.screen_.cursorPosition.column;if(this.options_.reverseWraparound){if(this.screen_.cursorPosition.overflow){// If this cursor is in the right margin, consume one count to get it
// back to the last column.  This only applies when we're in reverse
// wraparound mode.
count--;this.clearCursorOverflow();if(!count)return;}var newRow=this.screen_.cursorPosition.row;var newColumn=currentColumn-count;if(newColumn<0){newRow=newRow-Math.floor(count/this.screenSize.width)-1;if(newRow<0){// xterm also wraps from row 0 to the last row.
newRow=this.screenSize.height+newRow%this.screenSize.height;}newColumn=this.screenSize.width+newColumn%this.screenSize.width;}this.setCursorPosition(Math.max(newRow,0),newColumn);}else{var newColumn=Math.max(currentColumn-count,0);this.setCursorColumn(newColumn);}};/**
 * Move the cursor right a specified number of columns.
 *
 * @param {integer} count The number of columns to move the cursor.
 */hterm.Terminal.prototype.cursorRight=function(count){count=count||1;if(count<1)return;var column=lib.f.clamp(this.screen_.cursorPosition.column+count,0,this.screenSize.width-1);this.setCursorColumn(column);};/**
 * Reverse the foreground and background colors of the terminal.
 *
 * This only affects text that was drawn with no attributes.
 *
 * TODO(rginda): Test xterm to see if reverse is respected for text that has
 * been drawn with attributes that happen to coincide with the default
 * 'no-attribute' colors.  My guess is probably not.
 *
 * @param {boolean} state The state to set.
 */hterm.Terminal.prototype.setReverseVideo=function(state){this.options_.reverseVideo=state;if(state){this.scrollPort_.setForegroundColor(this.prefs_.get('background-color'));this.scrollPort_.setBackgroundColor(this.prefs_.get('foreground-color'));}else{this.scrollPort_.setForegroundColor(this.prefs_.get('foreground-color'));this.scrollPort_.setBackgroundColor(this.prefs_.get('background-color'));}};/**
 * Ring the terminal bell.
 *
 * This will not play the bell audio more than once per second.
 */hterm.Terminal.prototype.ringBell=function(){this.cursorNode_.style.backgroundColor=this.scrollPort_.getForegroundColor();var self=this;setTimeout(function(){self.restyleCursor_();},200);// bellSquelchTimeout_ affects both audio and notification bells.
if(this.bellSquelchTimeout_)return;if(this.bellAudio_.getAttribute('src')){this.bellAudio_.play();this.bellSequelchTimeout_=setTimeout(function(){delete this.bellSquelchTimeout_;}.bind(this),500);}else{delete this.bellSquelchTimeout_;}if(this.desktopNotificationBell_&&!this.document_.hasFocus()){var n=hterm.notify();this.bellNotificationList_.push(n);// TODO: Should we try to raise the window here?
n.onclick=function(){self.closeBellNotifications_();};}};/**
 * Set the origin mode bit.
 *
 * If origin mode is on, certain VT cursor and scrolling commands measure their
 * row parameter relative to the VT scroll region.  Otherwise, row 0 corresponds
 * to the top of the addressable screen.
 *
 * Defaults to off.
 *
 * @param {boolean} state True to set origin mode, false to unset.
 */hterm.Terminal.prototype.setOriginMode=function(state){this.options_.originMode=state;this.setCursorPosition(0,0);};/**
 * Set the insert mode bit.
 *
 * If insert mode is on, existing text beyond the cursor position will be
 * shifted right to make room for new text.  Otherwise, new text overwrites
 * any existing text.
 *
 * Defaults to off.
 *
 * @param {boolean} state True to set insert mode, false to unset.
 */hterm.Terminal.prototype.setInsertMode=function(state){this.options_.insertMode=state;};/**
 * Set the auto carriage return bit.
 *
 * If auto carriage return is on then a formfeed character is interpreted
 * as a newline, otherwise it's the same as a linefeed.  The difference boils
 * down to whether or not the cursor column is reset.
 *
 * @param {boolean} state The state to set.
 */hterm.Terminal.prototype.setAutoCarriageReturn=function(state){this.options_.autoCarriageReturn=state;};/**
 * Set the wraparound mode bit.
 *
 * If wraparound mode is on, certain VT commands will allow the cursor to wrap
 * to the start of the following row.  Otherwise, the cursor is clamped to the
 * end of the screen and attempts to write past it are ignored.
 *
 * Defaults to on.
 *
 * @param {boolean} state True to set wraparound mode, false to unset.
 */hterm.Terminal.prototype.setWraparound=function(state){this.options_.wraparound=state;};/**
 * Set the reverse-wraparound mode bit.
 *
 * If wraparound mode is off, certain VT commands will allow the cursor to wrap
 * to the end of the previous row.  Otherwise, the cursor is clamped to column
 * 0.
 *
 * Defaults to off.
 *
 * @param {boolean} state True to set reverse-wraparound mode, false to unset.
 */hterm.Terminal.prototype.setReverseWraparound=function(state){this.options_.reverseWraparound=state;};/**
 * Selects between the primary and alternate screens.
 *
 * If alternate mode is on, the alternate screen is active.  Otherwise the
 * primary screen is active.
 *
 * Swapping screens has no effect on the scrollback buffer.
 *
 * Each screen maintains its own cursor position.
 *
 * Defaults to off.
 *
 * @param {boolean} state True to set alternate mode, false to unset.
 */hterm.Terminal.prototype.setAlternateMode=function(state){var cursor=this.saveCursor();this.screen_=state?this.alternateScreen_:this.primaryScreen_;if(this.screen_.rowsArray.length&&this.screen_.rowsArray[0].rowIndex!=this.scrollbackRows_.length){// If the screen changed sizes while we were away, our rowIndexes may
// be incorrect.
var offset=this.scrollbackRows_.length;var ary=this.screen_.rowsArray;for(var i=0;i<ary.length;i++){ary[i].rowIndex=offset+i;}}this.realizeWidth_(this.screenSize.width);this.realizeHeight_(this.screenSize.height);this.scrollPort_.syncScrollHeight();this.scrollPort_.invalidate();this.restoreCursor(cursor);this.scrollPort_.resize();};/**
 * Set the cursor-blink mode bit.
 *
 * If cursor-blink is on, the cursor will blink when it is visible.  Otherwise
 * a visible cursor does not blink.
 *
 * You should make sure to turn blinking off if you're going to dispose of a
 * terminal, otherwise you'll leak a timeout.
 *
 * Defaults to on.
 *
 * @param {boolean} state True to set cursor-blink mode, false to unset.
 */hterm.Terminal.prototype.setCursorBlink=function(state){this.options_.cursorBlink=state;if(!state&&this.timeouts_.cursorBlink){clearTimeout(this.timeouts_.cursorBlink);delete this.timeouts_.cursorBlink;}if(this.options_.cursorVisible)this.setCursorVisible(true);};/**
 * Set the cursor-visible mode bit.
 *
 * If cursor-visible is on, the cursor will be visible.  Otherwise it will not.
 *
 * Defaults to on.
 *
 * @param {boolean} state True to set cursor-visible mode, false to unset.
 */hterm.Terminal.prototype.setCursorVisible=function(state){this.options_.cursorVisible=state;if(!state){if(this.timeouts_.cursorBlink){clearTimeout(this.timeouts_.cursorBlink);delete this.timeouts_.cursorBlink;}this.cursorNode_.style.opacity='0';return;}this.syncCursorPosition_();this.cursorNode_.style.opacity='1';if(this.options_.cursorBlink){if(this.timeouts_.cursorBlink)return;this.onCursorBlink_();}else{if(this.timeouts_.cursorBlink){clearTimeout(this.timeouts_.cursorBlink);delete this.timeouts_.cursorBlink;}}};/**
 * Synchronizes the visible cursor and document selection with the current
 * cursor coordinates.
 */hterm.Terminal.prototype.syncCursorPosition_=function(){var topRowIndex=this.scrollPort_.getTopRowIndex();var bottomRowIndex=this.scrollPort_.getBottomRowIndex(topRowIndex);var cursorRowIndex=this.scrollbackRows_.length+this.screen_.cursorPosition.row;if(cursorRowIndex>bottomRowIndex){// Cursor is scrolled off screen, move it outside of the visible area.
this.setCssVar('cursor-offset-row','-1');return;}if(this.options_.cursorVisible&&this.cursorNode_.style.display=='none'){// Re-display the terminal cursor if it was hidden by the mouse cursor.
this.cursorNode_.style.display='';}// Position the cursor using CSS variable math.  If we do the math in JS,
// the float math will end up being more precise than the CSS which will
// cause the cursor tracking to be off.
this.setCssVar('cursor-offset-row',cursorRowIndex-topRowIndex+' + '+(this.scrollPort_.visibleRowTopMargin+'px'));this.setCssVar('cursor-offset-col',this.screen_.cursorPosition.column);this.cursorNode_.setAttribute('title','('+this.screen_.cursorPosition.column+', '+this.screen_.cursorPosition.row+')');// Update the caret for a11y purposes.
var selection=this.document_.getSelection();if(selection&&selection.isCollapsed)this.screen_.syncSelectionCaret(selection);};/**
 * Adjusts the style of this.cursorNode_ according to the current cursor shape
 * and character cell dimensions.
 */hterm.Terminal.prototype.restyleCursor_=function(){var shape=this.cursorShape_;if(this.cursorNode_.getAttribute('focus')=='false'){// Always show a block cursor when unfocused.
shape=hterm.Terminal.cursorShape.BLOCK;}var style=this.cursorNode_.style;switch(shape){case hterm.Terminal.cursorShape.BEAM:style.height='var(--hterm-charsize-height)';style.backgroundColor='transparent';style.borderBottomStyle=null;style.borderLeftStyle='solid';break;case hterm.Terminal.cursorShape.UNDERLINE:style.height=this.scrollPort_.characterSize.baseline+'px';style.backgroundColor='transparent';style.borderBottomStyle='solid';// correct the size to put it exactly at the baseline
style.borderLeftStyle=null;break;default:style.height='var(--hterm-charsize-height)';style.backgroundColor=this.cursorColor_;style.borderBottomStyle=null;style.borderLeftStyle=null;break;}};/**
 * Synchronizes the visible cursor with the current cursor coordinates.
 *
 * The sync will happen asynchronously, soon after the call stack winds down.
 * Multiple calls will be coalesced into a single sync.
 */hterm.Terminal.prototype.scheduleSyncCursorPosition_=function(){if(this.timeouts_.syncCursor)return;var self=this;this.timeouts_.syncCursor=setTimeout(function(){self.syncCursorPosition_();delete self.timeouts_.syncCursor;},0);};/**
 * Show or hide the zoom warning.
 *
 * The zoom warning is a message warning the user that their browser zoom must
 * be set to 100% in order for hterm to function properly.
 *
 * @param {boolean} state True to show the message, false to hide it.
 */hterm.Terminal.prototype.showZoomWarning_=function(state){if(!this.zoomWarningNode_){if(!state)return;this.zoomWarningNode_=this.document_.createElement('div');this.zoomWarningNode_.id='hterm:zoom-warning';this.zoomWarningNode_.style.cssText='color: black;'+'background-color: #ff2222;'+'font-size: large;'+'border-radius: 8px;'+'opacity: 0.75;'+'padding: 0.2em 0.5em 0.2em 0.5em;'+'top: 0.5em;'+'right: 1.2em;'+'position: absolute;'+'-webkit-text-size-adjust: none;'+'-webkit-user-select: none;'+'-moz-text-size-adjust: none;'+'-moz-user-select: none;';this.zoomWarningNode_.addEventListener('click',function(e){this.parentNode.removeChild(this);});}this.zoomWarningNode_.textContent=lib.MessageManager.replaceReferences(hterm.zoomWarningMessage,[parseInt(this.scrollPort_.characterSize.zoomFactor*100)]);this.zoomWarningNode_.style.fontFamily=this.prefs_.get('font-family');if(state){if(!this.zoomWarningNode_.parentNode)this.div_.parentNode.appendChild(this.zoomWarningNode_);}else if(this.zoomWarningNode_.parentNode){this.zoomWarningNode_.parentNode.removeChild(this.zoomWarningNode_);}};/**
 * Show the terminal overlay for a given amount of time.
 *
 * The terminal overlay appears in inverse video in a large font, centered
 * over the terminal.  You should probably keep the overlay message brief,
 * since it's in a large font and you probably aren't going to check the size
 * of the terminal first.
 *
 * @param {string} msg The text (not HTML) message to display in the overlay.
 * @param {number} opt_timeout The amount of time to wait before fading out
 *     the overlay.  Defaults to 1.5 seconds.  Pass null to have the overlay
 *     stay up forever (or until the next overlay).
 */hterm.Terminal.prototype.showOverlay=function(msg,opt_timeout){var _this4=this;if(!this.overlayNode_){if(!this.div_)return;this.overlayNode_=this.document_.createElement('div');this.overlayNode_.style.cssText='border-radius: 15px;'+'font-size: xx-large;'+'opacity: 0.75;'+'padding: 0.2em 0.5em 0.2em 0.5em;'+'position: absolute;'+'-webkit-user-select: none;'+'-webkit-transition: opacity 180ms ease-in;'+'-moz-user-select: none;'+'-moz-transition: opacity 180ms ease-in;';this.overlayNode_.addEventListener('mousedown',function(e){e.preventDefault();e.stopPropagation();},true);}this.overlayNode_.style.color=this.prefs_.get('background-color');this.overlayNode_.style.backgroundColor=this.prefs_.get('foreground-color');this.overlayNode_.style.fontFamily=this.prefs_.get('font-family');this.overlayNode_.textContent=msg;this.overlayNode_.style.opacity='0.75';if(!this.overlayNode_.parentNode)this.div_.appendChild(this.overlayNode_);var divSize=hterm.getClientSize(this.div_);var overlaySize=hterm.getClientSize(this.overlayNode_);this.overlayNode_.style.top=(divSize.height-overlaySize.height)/2+'px';this.overlayNode_.style.left=(divSize.width-overlaySize.width-this.scrollPort_.currentScrollbarWidthPx)/2+'px';if(this.overlayTimeout_)clearTimeout(this.overlayTimeout_);if(opt_timeout===null)return;this.overlayTimeout_=setTimeout(function(){_this4.overlayNode_.style.opacity='0';_this4.overlayTimeout_=setTimeout(function(){return _this4.hideOverlay();},200);},opt_timeout||1500);};/**
 * Hide the terminal overlay immediately.
 *
 * Useful when we show an overlay for an event with an unknown end time.
 */hterm.Terminal.prototype.hideOverlay=function(){if(this.overlayTimeout_)clearTimeout(this.overlayTimeout_);this.overlayTimeout_=null;if(this.overlayNode_.parentNode)this.overlayNode_.parentNode.removeChild(this.overlayNode_);this.overlayNode_.style.opacity='0.75';};/**
 * Paste from the system clipboard to the terminal.
 */hterm.Terminal.prototype.paste=function(){return hterm.pasteFromClipboard(this.document_);};/**
 * Copy a string to the system clipboard.
 *
 * Note: If there is a selected range in the terminal, it'll be cleared.
 *
 * @param {string} str The string to copy.
 */hterm.Terminal.prototype.copyStringToClipboard=function(str){if(this.prefs_.get('enable-clipboard-notice'))setTimeout(this.showOverlay.bind(this,hterm.notifyCopyMessage,500),200);var copySource=this.document_.createElement('pre');copySource.id='hterm:copy-to-clipboard-source';copySource.textContent=str;copySource.style.cssText='-webkit-user-select: text;'+'-moz-user-select: text;'+'position: absolute;'+'top: -99px';this.document_.body.appendChild(copySource);var selection=this.document_.getSelection();var anchorNode=selection.anchorNode;var anchorOffset=selection.anchorOffset;var focusNode=selection.focusNode;var focusOffset=selection.focusOffset;selection.selectAllChildren(copySource);hterm.copySelectionToClipboard(this.document_);// IE doesn't support selection.extend. This means that the selection
// won't return on IE.
if(selection.extend){selection.collapse(anchorNode,anchorOffset);selection.extend(focusNode,focusOffset);}copySource.parentNode.removeChild(copySource);};/**
 * Returns the selected text, or null if no text is selected.
 *
 * @return {string|null}
 */hterm.Terminal.prototype.getSelectionText=function(){var selection=this.scrollPort_.selection;selection.sync();if(selection.isCollapsed)return null;// Start offset measures from the beginning of the line.
var startOffset=selection.startOffset;var node=selection.startNode;if(node.nodeName!='X-ROW'){// If the selection doesn't start on an x-row node, then it must be
// somewhere inside the x-row.  Add any characters from previous siblings
// into the start offset.
if(node.nodeName=='#text'&&node.parentNode.nodeName=='SPAN'){// If node is the text node in a styled span, move up to the span node.
node=node.parentNode;}while(node.previousSibling){node=node.previousSibling;startOffset+=hterm.TextAttributes.nodeWidth(node);}}// End offset measures from the end of the line.
var endOffset=hterm.TextAttributes.nodeWidth(selection.endNode)-selection.endOffset;node=selection.endNode;if(node.nodeName!='X-ROW'){// If the selection doesn't end on an x-row node, then it must be
// somewhere inside the x-row.  Add any characters from following siblings
// into the end offset.
if(node.nodeName=='#text'&&node.parentNode.nodeName=='SPAN'){// If node is the text node in a styled span, move up to the span node.
node=node.parentNode;}while(node.nextSibling){node=node.nextSibling;endOffset+=hterm.TextAttributes.nodeWidth(node);}}var rv=this.getRowsText(selection.startRow.rowIndex,selection.endRow.rowIndex+1);return lib.wc.substring(rv,startOffset,lib.wc.strWidth(rv)-endOffset);};/**
 * Copy the current selection to the system clipboard, then clear it after a
 * short delay.
 */hterm.Terminal.prototype.copySelectionToClipboard=function(){var text=this.getSelectionText();if(text!=null)this.copyStringToClipboard(text);};hterm.Terminal.prototype.overlaySize=function(){this.showOverlay(this.screenSize.width+'x'+this.screenSize.height);};/**
 * Invoked by hterm.Terminal.Keyboard when a VT keystroke is detected.
 *
 * @param {string} string The VT string representing the keystroke, in UTF-16.
 */hterm.Terminal.prototype.onVTKeystroke=function(string){if(this.scrollOnKeystroke_)this.scrollPort_.scrollRowToBottom(this.getRowCount());this.io.onVTKeystroke(this.keyboard.encode(string));};/**
 * Launches url in a new tab.
 *
 * @param {string} url URL to launch in a new tab.
 */hterm.Terminal.prototype.openUrl=function(url){if(window.chrome&&window.chrome.browser){// For Chrome v2 apps, we need to use this API to properly open windows.
chrome.browser.openTab({'url':url});}else{var win=window.open(url,'_blank');win.focus();}};/**
 * Open the selected url.
 */hterm.Terminal.prototype.openSelectedUrl_=function(){var str=this.getSelectionText();// If there is no selection, try and expand wherever they clicked.
if(str==null){this.screen_.expandSelection(this.document_.getSelection());str=this.getSelectionText();// If clicking in empty space, return.
if(str==null)return;}// Make sure URL is valid before opening.
if(str.length>2048||str.search(/[\s\[\](){}<>"'\\^`]/)>=0)return;// If the URI isn't anchored, it'll open relative to the extension.
// We have no way of knowing the correct schema, so assume http.
if(str.search('^[a-zA-Z][a-zA-Z0-9+.-]*://')<0){// We have to whitelist a few protocols that lack authorities and thus
// never use the //.  Like mailto.
switch(str.split(':',1)[0]){case'mailto':break;default:str='http://'+str;break;}}this.openUrl(str);};/**
 * Add the terminalRow and terminalColumn properties to mouse events and
 * then forward on to onMouse().
 *
 * The terminalRow and terminalColumn properties contain the (row, column)
 * coordinates for the mouse event.
 *
 * @param {Event} e The mouse event to handle.
 */hterm.Terminal.prototype.onMouse_=function(e){if(e.processedByTerminalHandler_){// We register our event handlers on the document, as well as the cursor
// and the scroll blocker.  Mouse events that occur on the cursor or
// scroll blocker will also appear on the document, but we don't want to
// process them twice.
//
// We can't just prevent bubbling because that has other side effects, so
// we decorate the event object with this property instead.
return;}var reportMouseEvents=!this.defeatMouseReports_&&this.vt.mouseReport!=this.vt.MOUSE_REPORT_DISABLED;e.processedByTerminalHandler_=true;// One based row/column stored on the mouse event.
e.terminalRow=parseInt((e.clientY-this.scrollPort_.visibleRowTopMargin)/this.scrollPort_.characterSize.height)+1;e.terminalColumn=parseInt(e.clientX/this.scrollPort_.characterSize.width)+1;if(e.type=='mousedown'&&e.terminalColumn>this.screenSize.width){// Mousedown in the scrollbar area.
return;}if(this.options_.cursorVisible&&!reportMouseEvents){// If the cursor is visible and we're not sending mouse events to the
// host app, then we want to hide the terminal cursor when the mouse
// cursor is over top.  This keeps the terminal cursor from interfering
// with local text selection.
if(e.terminalRow-1==this.screen_.cursorPosition.row&&e.terminalColumn-1==this.screen_.cursorPosition.column){this.cursorNode_.style.display='none';}else if(this.cursorNode_.style.display=='none'){this.cursorNode_.style.display='';}}if(e.type=='mousedown'){if(e.altKey||!reportMouseEvents){// If VT mouse reporting is disabled, or has been defeated with
// alt-mousedown, then the mouse will act on the local selection.
this.defeatMouseReports_=true;this.setSelectionEnabled(true);}else{// Otherwise we defer ownership of the mouse to the VT.
this.defeatMouseReports_=false;this.document_.getSelection().collapseToEnd();this.setSelectionEnabled(false);e.preventDefault();}}if(!reportMouseEvents){if(e.type=='dblclick'&&this.copyOnSelect){this.screen_.expandSelection(this.document_.getSelection());this.copySelectionToClipboard(this.document_);}if(e.type=='click'&&!e.shiftKey&&(e.ctrlKey||e.metaKey)){// Debounce this event with the dblclick event.  If you try to doubleclick
// a URL to open it, Chrome will fire click then dblclick, but we won't
// have expanded the selection text at the first click event.
clearTimeout(this.timeouts_.openUrl);this.timeouts_.openUrl=setTimeout(this.openSelectedUrl_.bind(this),500);return;}if(e.type=='mousedown'){if(this.mouseRightClickPaste&&e.button==2/* right button */||e.button==this.mousePasteButton){if(!this.paste())console.warn('Could not paste manually due to web restrictions');}}if(e.type=='mouseup'&&e.button==0&&this.copyOnSelect&&!this.document_.getSelection().isCollapsed){this.copySelectionToClipboard(this.document_);}if((e.type=='mousemove'||e.type=='mouseup')&&this.scrollBlockerNode_.engaged){// Disengage the scroll-blocker after one of these events.
this.scrollBlockerNode_.engaged=false;this.scrollBlockerNode_.style.top='-99px';}// Emulate arrow key presses via scroll wheel events.
if(this.scrollWheelArrowKeys_&&!e.shiftKey&&this.keyboard.applicationCursor&&!this.isPrimaryScreen()){if(e.type=='wheel'){var delta=this.scrollPort_.scrollWheelDelta(e);var lines=lib.f.smartFloorDivide(Math.abs(delta),this.scrollPort_.characterSize.height);var data='\x1bO'+(delta<0?'B':'A');this.io.sendString(data.repeat(lines));e.preventDefault();}}}else/* if (this.reportMouseEvents) */{if(!this.scrollBlockerNode_.engaged){if(e.type=='mousedown'){// Move the scroll-blocker into place if we want to keep the scrollport
// from scrolling.
this.scrollBlockerNode_.engaged=true;this.scrollBlockerNode_.style.top=e.clientY-5+'px';this.scrollBlockerNode_.style.left=e.clientX-5+'px';}else if(e.type=='mousemove'){// Oh.  This means that drag-scroll was disabled AFTER the mouse down,
// in which case it's too late to engage the scroll-blocker.
this.document_.getSelection().collapseToEnd();e.preventDefault();}}this.onMouse(e);}if(e.type=='mouseup'&&this.document_.getSelection().isCollapsed){// Restore this on mouseup in case it was temporarily defeated with a
// alt-mousedown.  Only do this when the selection is empty so that
// we don't immediately kill the users selection.
this.defeatMouseReports_=false;}};/**
 * Clients should override this if they care to know about mouse events.
 *
 * The event parameter will be a normal DOM mouse click event with additional
 * 'terminalRow' and 'terminalColumn' properties.
 *
 * @param {Event} e The mouse event to handle.
 */hterm.Terminal.prototype.onMouse=function(e){};/**
 * React when focus changes.
 *
 * @param {boolean} focused True if focused, false otherwise.
 */hterm.Terminal.prototype.onFocusChange_=function(focused){this.cursorNode_.setAttribute('focus',focused);this.restyleCursor_();if(this.reportFocus){this.io.sendString(focused===true?'\x1b[I':'\x1b[O');}if(focused===true)this.closeBellNotifications_();};/**
 * React when the ScrollPort is scrolled.
 */hterm.Terminal.prototype.onScroll_=function(){this.scheduleSyncCursorPosition_();};/**
 * React when text is pasted into the scrollPort.
 *
 * @param {Event} e The DOM paste event to handle.
 */hterm.Terminal.prototype.onPaste_=function(e){var data=e.text.replace(/\n/mg,'\r');data=this.keyboard.encode(data);if(this.options_.bracketedPaste)data='\x1b[200~'+data+'\x1b[201~';this.io.sendString(data);};/**
 * React when the user tries to copy from the scrollPort.
 *
 * @param {Event} e The DOM copy event.
 */hterm.Terminal.prototype.onCopy_=function(e){if(!this.useDefaultWindowCopy){e.preventDefault();setTimeout(this.copySelectionToClipboard.bind(this),0);}};/**
 * React when the ScrollPort is resized.
 *
 * Note: This function should not directly contain code that alters the internal
 * state of the terminal.  That kind of code belongs in realizeWidth or
 * realizeHeight, so that it can be executed synchronously in the case of a
 * programmatic width change.
 */hterm.Terminal.prototype.onResize_=function(){var columnCount=Math.floor(this.scrollPort_.getScreenWidth()/this.scrollPort_.characterSize.width)||0;var rowCount=lib.f.smartFloorDivide(this.scrollPort_.getScreenHeight(),this.scrollPort_.characterSize.height)||0;if(columnCount<=0||rowCount<=0){// We avoid these situations since they happen sometimes when the terminal
// gets removed from the document or during the initial load, and we can't
// deal with that.
// This can also happen if called before the scrollPort calculates the
// character size, meaning we dived by 0 above and default to 0 values.
return;}var isNewSize=columnCount!=this.screenSize.width||rowCount!=this.screenSize.height;// We do this even if the size didn't change, just to be sure everything is
// in sync.
this.realizeSize_(columnCount,rowCount);this.showZoomWarning_(this.scrollPort_.characterSize.zoomFactor!=1);if(isNewSize)this.overlaySize();this.restyleCursor_();this.scheduleSyncCursorPosition_();};/**
 * Service the cursor blink timeout.
 */hterm.Terminal.prototype.onCursorBlink_=function(){if(!this.options_.cursorBlink){delete this.timeouts_.cursorBlink;return;}if(this.cursorNode_.getAttribute('focus')=='false'||this.cursorNode_.style.opacity=='0'){this.cursorNode_.style.opacity='1';this.timeouts_.cursorBlink=setTimeout(this.myOnCursorBlink_,this.cursorBlinkCycle_[0]);}else{this.cursorNode_.style.opacity='0';this.timeouts_.cursorBlink=setTimeout(this.myOnCursorBlink_,this.cursorBlinkCycle_[1]);}};/**
 * Set the scrollbar-visible mode bit.
 *
 * If scrollbar-visible is on, the vertical scrollbar will be visible.
 * Otherwise it will not.
 *
 * Defaults to on.
 *
 * @param {boolean} state True to set scrollbar-visible mode, false to unset.
 */hterm.Terminal.prototype.setScrollbarVisible=function(state){this.scrollPort_.setScrollbarVisible(state);};/**
 * Set the scroll wheel move multiplier.  This will affect how fast the page
 * scrolls on wheel events.
 *
 * Defaults to 1.
 *
 * @param {number} multiplier The multiplier to set.
 */hterm.Terminal.prototype.setScrollWheelMoveMultipler=function(multiplier){this.scrollPort_.setScrollWheelMoveMultipler(multiplier);};/**
 * Close all web notifications created by terminal bells.
 */hterm.Terminal.prototype.closeBellNotifications_=function(){this.bellNotificationList_.forEach(function(n){n.close();});this.bellNotificationList_.length=0;};// SOURCE FILE: hterm/js/hterm_terminal_io.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';lib.rtdep('lib.encodeUTF8');/**
 * Input/Output interface used by commands to communicate with the terminal.
 *
 * Commands like `nassh` and `crosh` receive an instance of this class as
 * part of their argv object.  This allows them to write to and read from the
 * terminal without exposing them to an entire hterm.Terminal instance.
 *
 * The active command must override the onVTKeystroke() and sendString() methods
 * of this class in order to receive keystrokes and send output to the correct
 * destination.
 *
 * Isolating commands from the terminal provides the following benefits:
 * - Provides a mechanism to save and restore onVTKeystroke and sendString
 *   handlers when invoking subcommands (see the push() and pop() methods).
 * - The isolation makes it easier to make changes in Terminal and supporting
 *   classes without affecting commands.
 * - In The Future commands may run in web workers where they would only be able
 *   to talk to a Terminal instance through an IPC mechanism.
 *
 * @param {hterm.Terminal}
 */hterm.Terminal.IO=function(terminal){this.terminal_=terminal;// The IO object to restore on IO.pop().
this.previousIO_=null;// Any data this object accumulated while not active.
this.buffered_='';};/**
 * Show the terminal overlay for a given amount of time.
 *
 * The terminal overlay appears in inverse video in a large font, centered
 * over the terminal.  You should probably keep the overlay message brief,
 * since it's in a large font and you probably aren't going to check the size
 * of the terminal first.
 *
 * @param {string} msg The text (not HTML) message to display in the overlay.
 * @param {number} opt_timeout The amount of time to wait before fading out
 *     the overlay.  Defaults to 1.5 seconds.  Pass null to have the overlay
 *     stay up forever (or until the next overlay).
 */hterm.Terminal.IO.prototype.showOverlay=function(message,opt_timeout){this.terminal_.showOverlay(message,opt_timeout);};/**
 * Hide the current overlay immediately.
 *
 * Useful when we show an overlay for an event with an unknown end time.
 */hterm.Terminal.IO.prototype.hideOverlay=function(){this.terminal_.hideOverlay();};/**
 * Open an frame in the current terminal window, pointed to the specified
 * url.
 *
 * Eventually we'll probably need size/position/decoration options.
 * The user should also be able to move/resize the frame.
 *
 * @param {string} url The URL to load in the frame.
 * @param {Object} opt_options Optional frame options.  Not implemented.
 */hterm.Terminal.IO.prototype.createFrame=function(url,opt_options){return new hterm.Frame(this.terminal_,url,opt_options);};/**
 * Change the preference profile for the terminal.
 *
 * @param profileName {string} The name of the preference profile to activate.
 */hterm.Terminal.IO.prototype.setTerminalProfile=function(profileName){this.terminal_.setProfile(profileName);};/**
 * Create a new hterm.Terminal.IO instance and make it active on the Terminal
 * object associated with this instance.
 *
 * This is used to pass control of the terminal IO off to a subcommand.  The
 * IO.pop() method can be used to restore control when the subcommand completes.
 */hterm.Terminal.IO.prototype.push=function(){var io=new hterm.Terminal.IO(this.terminal_);io.keyboardCaptured_=this.keyboardCaptured_;io.columnCount=this.columnCount;io.rowCount=this.rowCount;io.previousIO_=this.terminal_.io;this.terminal_.io=io;return io;};/**
 * Restore the Terminal's previous IO object.
 *
 * We'll flush out any queued data.
 */hterm.Terminal.IO.prototype.pop=function(){this.terminal_.io=this.previousIO_;this.previousIO_.flush();};/**
 * Flush accumulated data.
 *
 * If we're not the active IO, the connected process might still be writing
 * data to us, but we won't be displaying it.  Flush any buffered data now.
 */hterm.Terminal.IO.prototype.flush=function(){if(this.buffered_){this.terminal_.interpret(this.buffered_);this.buffered_='';}};/**
 * Called when data needs to be sent to the current command.
 *
 * Clients should override this to receive notification of pending data.
 *
 * @param {string} string The data to send.
 */hterm.Terminal.IO.prototype.sendString=function(string){// Override this.
console.log('Unhandled sendString: '+string);};/**
 * Called when a terminal keystroke is detected.
 *
 * Clients should override this to receive notification of keystrokes.
 *
 * The keystroke data will be encoded according to the 'send-encoding'
 * preference.
 *
 * @param {string} string The VT key sequence.
 */hterm.Terminal.IO.prototype.onVTKeystroke=function(string){// Override this.
console.log('Unobserverd VT keystroke: '+JSON.stringify(string));};hterm.Terminal.IO.prototype.onTerminalResize_=function(width,height){var obj=this;while(obj){obj.columnCount=width;obj.rowCount=height;obj=obj.previousIO_;}this.onTerminalResize(width,height);};/**
 * Called when terminal size is changed.
 *
 * Clients should override this to receive notification of resize.
 *
 * @param {string|integer} terminal width.
 * @param {string|integer} terminal height.
 */hterm.Terminal.IO.prototype.onTerminalResize=function(width,height){// Override this.
};/**
 * Write a UTF-8 encoded byte string to the terminal.
 *
 * @param {string} string The UTF-8 encoded string to print.
 */hterm.Terminal.IO.prototype.writeUTF8=function(string){// If another process has the foreground IO, buffer new data sent to this IO
// (since it's in the background).  When we're made the foreground IO again,
// we'll flush everything.
if(this.terminal_.io!=this){this.buffered_+=string;return;}this.terminal_.interpret(string);};/**
 * Write a UTF-8 encoded byte string to the terminal followed by crlf.
 *
 * @param {string} string The UTF-8 encoded string to print.
 */hterm.Terminal.IO.prototype.writelnUTF8=function(string){this.writeUTF8(string+'\r\n');};/**
 * Write a UTF-16 JavaScript string to the terminal.
 *
 * @param {string} string The string to print.
 */hterm.Terminal.IO.prototype.print=hterm.Terminal.IO.prototype.writeUTF16=function(string){this.writeUTF8(lib.encodeUTF8(string));};/**
 * Print a UTF-16 JavaScript string to the terminal followed by a newline.
 *
 * @param {string} string The string to print.
 */hterm.Terminal.IO.prototype.println=hterm.Terminal.IO.prototype.writelnUTF16=function(string){this.writelnUTF8(lib.encodeUTF8(string));};// SOURCE FILE: hterm/js/hterm_text_attributes.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';lib.rtdep('lib.colors');/**
 * Constructor for TextAttribute objects.
 *
 * These objects manage a set of text attributes such as foreground/
 * background color, bold, faint, italic, blink, underline, and strikethrough.
 *
 * TextAttribute instances can be used to construct a DOM container implementing
 * the current attributes, or to test an existing DOM container for
 * compatibility with the current attributes.
 *
 * @constructor
 * @param {HTMLDocument} document The parent document to use when creating
 *     new DOM containers.
 */hterm.TextAttributes=function(document){this.document_=document;// These variables contain the source of the color as either:
// SRC_DEFAULT  (use context default)
// SRC_RGB      (specified in 'rgb( r, g, b)' form)
// number       (representing the index from color palette to use)
this.foregroundSource=this.SRC_DEFAULT;this.backgroundSource=this.SRC_DEFAULT;// These properties cache the value in the color table, but foregroundSource
// and backgroundSource contain the canonical values.
this.foreground=this.DEFAULT_COLOR;this.background=this.DEFAULT_COLOR;this.defaultForeground='rgb(255, 255, 255)';this.defaultBackground='rgb(0, 0, 0)';// Any attributes added here that do not default to falsey (e.g. undefined or
// null) require a bit more care.  createContainer has to always attach the
// attribute so matchesContainer can work correctly.
this.bold=false;this.faint=false;this.italic=false;this.blink=false;this.underline=false;this.strikethrough=false;this.inverse=false;this.invisible=false;this.wcNode=false;this.asciiNode=true;this.tileData=null;this.colorPalette=null;this.resetColorPalette();};/**
 * If false, we ignore the bold attribute.
 *
 * This is used for fonts that have a bold version that is a different size
 * than the normal weight version.
 */hterm.TextAttributes.prototype.enableBold=true;/**
 * If true, use bright colors (if available) for bold text.
 *
 * This setting is independent of the enableBold setting.
 */hterm.TextAttributes.prototype.enableBoldAsBright=true;/**
 * A sentinel constant meaning "whatever the default color is in this context".
 */hterm.TextAttributes.prototype.DEFAULT_COLOR=lib.f.createEnum('');/**
 * A constant string used to specify that source color is context default.
 */hterm.TextAttributes.prototype.SRC_DEFAULT='default';/**
 * A constant string used to specify that the source of a color is a valid
 * rgb( r, g, b) specifier.
 */hterm.TextAttributes.prototype.SRC_RGB='rgb';/**
 * The document object which should own the DOM nodes created by this instance.
 *
 * @param {HTMLDocument} document The parent document.
 */hterm.TextAttributes.prototype.setDocument=function(document){this.document_=document;};/**
 * Create a deep copy of this object.
 *
 * @return {hterm.TextAttributes} A deep copy of this object.
 */hterm.TextAttributes.prototype.clone=function(){var rv=new hterm.TextAttributes(null);for(var key in this){rv[key]=this[key];}rv.colorPalette=this.colorPalette.concat();return rv;};/**
 * Reset the current set of attributes.
 *
 * This does not affect the palette.  Use resetColorPalette() for that.
 * It also doesn't affect the tile data, it's not meant to.
 */hterm.TextAttributes.prototype.reset=function(){this.foregroundSource=this.SRC_DEFAULT;this.backgroundSource=this.SRC_DEFAULT;this.foreground=this.DEFAULT_COLOR;this.background=this.DEFAULT_COLOR;this.bold=false;this.faint=false;this.italic=false;this.blink=false;this.underline=false;this.strikethrough=false;this.inverse=false;this.invisible=false;this.wcNode=false;this.asciiNode=true;};/**
 * Reset the color palette to the default state.
 */hterm.TextAttributes.prototype.resetColorPalette=function(){this.colorPalette=lib.colors.colorPalette.concat();this.syncColors();};/**
 * Test if the current attributes describe unstyled text.
 *
 * @return {boolean} True if the current attributes describe unstyled text.
 */hterm.TextAttributes.prototype.isDefault=function(){return this.foregroundSource==this.SRC_DEFAULT&&this.backgroundSource==this.SRC_DEFAULT&&!this.bold&&!this.faint&&!this.italic&&!this.blink&&!this.underline&&!this.strikethrough&&!this.inverse&&!this.invisible&&!this.wcNode&&this.asciiNode&&this.tileData==null;};/**
 * Create a DOM container (a span or a text node) with a style to match the
 * current set of attributes.
 *
 * This method will create a plain text node if the text is unstyled, or
 * an HTML span if the text is styled.  Due to lack of monospace wide character
 * fonts on certain systems (e.g. Chrome OS), we need to put each wide character
 * in a span of CSS class '.wc-node' which has double column width.
 * Each vt_tiledata tile is also represented by a span with a single
 * character, with CSS classes '.tile' and '.tile_<glyph number>'.
 *
 * @param {string} opt_textContent Optional text content for the new container.
 * @return {HTMLNode} An HTML span or text nodes styled to match the current
 *     attributes.
 */hterm.TextAttributes.prototype.createContainer=function(opt_textContent){if(this.isDefault()){// Only attach attributes where we need an explicit default for the
// matchContainer logic below.
var node=this.document_.createTextNode(opt_textContent);node.asciiNode=true;return node;}var span=this.document_.createElement('span');var style=span.style;var classes=[];if(this.foreground!=this.DEFAULT_COLOR)style.color=this.foreground;if(this.background!=this.DEFAULT_COLOR)style.backgroundColor=this.background;if(this.enableBold&&this.bold)style.fontWeight='bold';if(this.faint)span.faint=true;if(this.italic)style.fontStyle='italic';if(this.blink){classes.push('blink-node');span.blinkNode=true;}var textDecoration='';if(this.underline){textDecoration+=' underline';span.underline=true;}if(this.strikethrough){textDecoration+=' line-through';span.strikethrough=true;}if(textDecoration){style.textDecoration=textDecoration;}if(this.wcNode){classes.push('wc-node');span.wcNode=true;}span.asciiNode=this.asciiNode;if(this.tileData!=null){classes.push('tile');classes.push('tile_'+this.tileData);span.tileNode=true;}if(opt_textContent)span.textContent=opt_textContent;if(classes.length)span.className=classes.join(' ');return span;};/**
 * Tests if the provided object (string, span or text node) has the same
 * style as this TextAttributes instance.
 *
 * This indicates that text with these attributes could be inserted directly
 * into the target DOM node.
 *
 * For the purposes of this method, a string is considered a text node.
 *
 * @param {string|HTMLNode} obj The object to test.
 * @return {boolean} True if the provided container has the same style as
 *     this attributes instance.
 */hterm.TextAttributes.prototype.matchesContainer=function(obj){if(typeof obj=='string'||obj.nodeType==Node.TEXT_NODE)return this.isDefault();var style=obj.style;// We don't want to put multiple characters in a wcNode or a tile.
// See the comments in createContainer.
// For attributes that default to false, we do not require that obj have them
// declared, so always normalize them using !! (to turn undefined into false)
// in the compares below.
return!(this.wcNode||obj.wcNode)&&this.asciiNode==obj.asciiNode&&!(this.tileData!=null||obj.tileNode)&&this.foreground==style.color&&this.background==style.backgroundColor&&(this.enableBold&&this.bold)==!!style.fontWeight&&this.blink==!!obj.blinkNode&&this.italic==!!style.fontStyle&&!!this.underline==!!obj.underline&&!!this.strikethrough==!!obj.strikethrough;};hterm.TextAttributes.prototype.setDefaults=function(foreground,background){this.defaultForeground=foreground;this.defaultBackground=background;this.syncColors();};/**
 * Updates foreground and background properties based on current indices and
 * other state.
 *
 * @param {string} terminalForeground The terminal foreground color for use as
 *     inverse text background.
 * @param {string} terminalBackground The terminal background color for use as
 *     inverse text foreground.
 *
 */hterm.TextAttributes.prototype.syncColors=function(){function getBrightIndex(i){if(i<8){// If the color is from the lower half of the ANSI 16, add 8.
return i+8;}// If it's not from the 16 color palette, ignore bold requests.  This
// matches the behavior of gnome-terminal.
return i;}var foregroundSource=this.foregroundSource;var backgroundSource=this.backgroundSource;var defaultForeground=this.DEFAULT_COLOR;var defaultBackground=this.DEFAULT_COLOR;if(this.inverse){foregroundSource=this.backgroundSource;backgroundSource=this.foregroundSource;// We can't inherit the container's color anymore.
defaultForeground=this.defaultBackground;defaultBackground=this.defaultForeground;}if(this.enableBoldAsBright&&this.bold){if(foregroundSource!=this.SRC_DEFAULT&&foregroundSource!=this.SRC_RGB){foregroundSource=getBrightIndex(foregroundSource);}}if(this.invisible){foregroundSource=backgroundSource;defaultForeground=this.defaultBackground;}// Set fore/background colors unless already specified in rgb(r, g, b) form.
if(foregroundSource!=this.SRC_RGB){this.foreground=foregroundSource==this.SRC_DEFAULT?defaultForeground:this.colorPalette[foregroundSource];}if(this.faint&&!this.invisible){var colorToMakeFaint=this.foreground==this.DEFAULT_COLOR?this.defaultForeground:this.foreground;this.foreground=lib.colors.mix(colorToMakeFaint,'rgb(0, 0, 0)',0.3333);}if(backgroundSource!=this.SRC_RGB){this.background=backgroundSource==this.SRC_DEFAULT?defaultBackground:this.colorPalette[backgroundSource];}};/**
 * Static method used to test if the provided objects (strings, spans or
 * text nodes) have the same style.
 *
 * For the purposes of this method, a string is considered a text node.
 *
 * @param {string|HTMLNode} obj1 An object to test.
 * @param {string|HTMLNode} obj2 Another object to test.
 * @return {boolean} True if the containers have the same style.
 */hterm.TextAttributes.containersMatch=function(obj1,obj2){if(typeof obj1=='string')return hterm.TextAttributes.containerIsDefault(obj2);if(obj1.nodeType!=obj2.nodeType)return false;if(obj1.nodeType==Node.TEXT_NODE)return true;var style1=obj1.style;var style2=obj2.style;return style1.color==style2.color&&style1.backgroundColor==style2.backgroundColor&&style1.fontWeight==style2.fontWeight&&style1.fontStyle==style2.fontStyle&&style1.textDecoration==style2.textDecoration;};/**
 * Static method to test if a given DOM container represents unstyled text.
 *
 * For the purposes of this method, a string is considered a text node.
 *
 * @param {string|HTMLNode} obj1 An object to test.
 * @return {boolean} True if the object is unstyled.
 */hterm.TextAttributes.containerIsDefault=function(obj){return typeof obj=='string'||obj.nodeType==Node.TEXT_NODE;};/**
 * Static method to get the column width of a node's textContent.
 *
 * @param {HTMLElement} node The HTML element to get the width of textContent
 *     from.
 * @return {integer} The column width of the node's textContent.
 */hterm.TextAttributes.nodeWidth=function(node){if(!node.asciiNode){return lib.wc.strWidth(node.textContent);}else{return node.textContent.length;}};/**
 * Static method to get the substr of a node's textContent.  The start index
 * and substr width are computed in column width.
 *
 * @param {HTMLElement} node The HTML element to get the substr of textContent
 *     from.
 * @param {integer} start The starting offset in column width.
 * @param {integer} width The width to capture in column width.
 * @return {integer} The extracted substr of the node's textContent.
 */hterm.TextAttributes.nodeSubstr=function(node,start,width){if(!node.asciiNode){return lib.wc.substr(node.textContent,start,width);}else{return node.textContent.substr(start,width);}};/**
 * Static method to get the substring based of a node's textContent.  The
 * start index of end index are computed in column width.
 *
 * @param {HTMLElement} node The HTML element to get the substr of textContent
 *     from.
 * @param {integer} start The starting offset in column width.
 * @param {integer} end The ending offset in column width.
 * @return {integer} The extracted substring of the node's textContent.
 */hterm.TextAttributes.nodeSubstring=function(node,start,end){if(!node.asciiNode){return lib.wc.substring(node.textContent,start,end);}else{return node.textContent.substring(start,end);}};/**
 * Static method to split a string into contiguous runs of single-width
 * characters and runs of double-width characters.
 *
 * @param {string} str The string to split.
 * @return {Array} An array of objects that contain substrings of str, where
 *     each substring is either a contiguous runs of single-width characters
 *     or a double-width character.  For objects that contain a double-width
 *     character, its wcNode property is set to true.  For objects that contain
 *     only ASCII content, its asciiNode property is set to true.
 */hterm.TextAttributes.splitWidecharString=function(str){var rv=[];var base=0,length=0,wcStrWidth=0,wcCharWidth;var asciiNode=true;for(var i=0;i<str.length;){var c=str.codePointAt(i);var increment;if(c<128){wcStrWidth+=1;length+=1;increment=1;}else{increment=c<=0xffff?1:2;wcCharWidth=lib.wc.charWidth(c);if(wcCharWidth<=1){wcStrWidth+=wcCharWidth;length+=increment;asciiNode=false;}else{if(length){rv.push({str:str.substr(base,length),asciiNode:asciiNode,wcStrWidth:wcStrWidth});asciiNode=true;wcStrWidth=0;}rv.push({str:str.substr(i,increment),wcNode:true,asciiNode:false,wcStrWidth:2});base=i+increment;length=0;}}i+=increment;}if(length){rv.push({str:str.substr(base,length),asciiNode:asciiNode,wcStrWidth:wcStrWidth});}return rv;};// SOURCE FILE: hterm/js/hterm_vt.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';lib.rtdep('lib.colors','lib.f','lib.UTF8Decoder','hterm.VT.CharacterMap');/**
 * Constructor for the VT escape sequence interpreter.
 *
 * The interpreter operates on a terminal object capable of performing cursor
 * move operations, painting characters, etc.
 *
 * This interpreter is intended to be compatible with xterm, though it
 * ignores some of the more esoteric escape sequences.
 *
 * Control sequences are documented in hterm/doc/ControlSequences.md.
 *
 * @param {hterm.Terminal} terminal Terminal to use with the interpreter.
 */hterm.VT=function(terminal){/**
   * The display terminal object associated with this virtual terminal.
   */this.terminal=terminal;terminal.onMouse=this.onTerminalMouse_.bind(this);this.mouseReport=this.MOUSE_REPORT_DISABLED;// Parse state left over from the last parse.  You should use the parseState
// instance passed into your parse routine, rather than reading
// this.parseState_ directly.
this.parseState_=new hterm.VT.ParseState(this.parseUnknown_);// Any "leading modifiers" for the escape sequence, such as '?', ' ', or the
// other modifiers handled in this.parseCSI_.
this.leadingModifier_='';// Any "trailing modifiers".  Same character set as a leading modifier,
// except these are found after the numeric arguments.
this.trailingModifier_='';// Whether or not to respect the escape codes for setting terminal width.
this.allowColumnWidthChanges_=false;// The amount of time we're willing to wait for the end of an OSC sequence.
this.oscTimeLimit_=20000;// Decoder to maintain UTF-8 decode state.
this.utf8Decoder_=new lib.UTF8Decoder();/**
   * Whether to accept the 8-bit control characters.
   *
   * An 8-bit control character is one with the eighth bit set.  These
   * didn't work on 7-bit terminals so they all have two byte equivalents.
   * Most hosts still only use the two-byte versions.
   *
   * We ignore 8-bit control codes by default.  This is in order to avoid
   * issues with "accidental" usage of codes that need to be terminated.
   * The "accident" usually involves cat'ing binary data.
   */this.enable8BitControl=false;/**
   * Whether to allow the OSC 52 sequence to write to the system clipboard.
   */this.enableClipboardWrite=true;/**
   * Respect the host's attempt to change the cursor blink status using
   * the DEC Private mode 12.
   */this.enableDec12=false;/**
   * The expected encoding method for data received from the host.
   */this.characterEncoding='utf-8';/**
   * Max length of an unterminated DCS, OSC, PM or APC sequence before we give
   * up and ignore the code.
   *
   * These all end with a String Terminator (ST, '\x9c', ESC '\\') or
   * (BEL, '\x07') character, hence the "string sequence" moniker.
   */this.maxStringSequence=1024;/**
   * If true, emit warnings when we encounter a control character or escape
   * sequence that we don't recognize or explicitly ignore.
   *
   * We disable this by default as the console logging can be expensive when
   * dumping binary files (e.g. `cat /dev/zero`) to the point where you can't
   * recover w/out restarting.
   */this.warnUnimplemented=false;/**
   * The set of available character maps (used by G0...G3 below).
   */this.characterMaps=new hterm.VT.CharacterMaps();/**
   * The default G0...G3 character maps.
   * We default to the US/ASCII map everywhere as that aligns with other
   * terminals, and it makes it harder to accidentally switch to the graphics
   * character map (Ctrl-N).  Any program that wants to use the graphics map
   * will usually select it anyways since there's no guarantee what state any
   * of the maps are in at any particular time.
   */this.G0=this.G1=this.G2=this.G3=this.characterMaps.getMap('B');/**
   * The 7-bit visible character set.
   *
   * This is a mapping from inbound data to display glyph.  The GL set
   * contains the 94 bytes from 0x21 to 0x7e.
   *
   * The default GL set is 'B', US ASCII.
   */this.GL='G0';/**
   * The 8-bit visible character set.
   *
   * This is a mapping from inbound data to display glyph.  The GR set
   * contains the 94 bytes from 0xa1 to 0xfe.
   */this.GR='G0';/**
   * The current encoding of the terminal.
   *
   * We only support ECMA-35 and UTF-8, so go with a boolean here.
   * The encoding can be locked too.
   */this.codingSystemUtf8_=false;this.codingSystemLocked_=false;// Construct a regular expression to match the known one-byte control chars.
// This is used in parseUnknown_ to quickly scan a string for the next
// control character.
this.cc1Pattern_=null;this.updateEncodingState_();// Saved state used in DECSC.
//
// This is a place to store a copy VT state, it is *not* the active state.
this.savedState_=new hterm.VT.CursorState(this);};/**
 * No mouse events.
 */hterm.VT.prototype.MOUSE_REPORT_DISABLED=0;/**
 * DECSET mode 1000.
 *
 * Report mouse down/up events only.
 */hterm.VT.prototype.MOUSE_REPORT_CLICK=1;/**
 * DECSET mode 1002.
 *
 * Report mouse down/up and movement while a button is down.
 */hterm.VT.prototype.MOUSE_REPORT_DRAG=3;/**
 * ParseState constructor.
 *
 * This object tracks the current state of the parse.  It has fields for the
 * current buffer, position in the buffer, and the parse function.
 *
 * @param {function} defaultFunc The default parser function.
 * @param {string} opt_buf Optional string to use as the current buffer.
 */hterm.VT.ParseState=function(defaultFunction,opt_buf){this.defaultFunction=defaultFunction;this.buf=opt_buf||null;this.pos=0;this.func=defaultFunction;this.args=[];};/**
 * Reset the parser function, buffer, and position.
 */hterm.VT.ParseState.prototype.reset=function(opt_buf){this.resetParseFunction();this.resetBuf(opt_buf||'');this.resetArguments();};/**
 * Reset the parser function only.
 */hterm.VT.ParseState.prototype.resetParseFunction=function(){this.func=this.defaultFunction;};/**
 * Reset the buffer and position only.
 *
 * @param {string} buf Optional new value for buf, defaults to null.
 */hterm.VT.ParseState.prototype.resetBuf=function(opt_buf){this.buf=typeof opt_buf=='string'?opt_buf:null;this.pos=0;};/**
 * Reset the arguments list only.
 *
 * @param {string} opt_arg_zero Optional initial value for args[0].
 */hterm.VT.ParseState.prototype.resetArguments=function(opt_arg_zero){this.args.length=0;if(typeof opt_arg_zero!='undefined')this.args[0]=opt_arg_zero;};/**
 * Get an argument as an integer.
 *
 * @param {number} argnum The argument number to retrieve.
 */hterm.VT.ParseState.prototype.iarg=function(argnum,defaultValue){var str=this.args[argnum];if(str){var ret=parseInt(str,10);// An argument of zero is treated as the default value.
if(ret==0)ret=defaultValue;return ret;}return defaultValue;};/**
 * Advance the parse position.
 *
 * @param {integer} count The number of bytes to advance.
 */hterm.VT.ParseState.prototype.advance=function(count){this.pos+=count;};/**
 * Return the remaining portion of the buffer without affecting the parse
 * position.
 *
 * @return {string} The remaining portion of the buffer.
 */hterm.VT.ParseState.prototype.peekRemainingBuf=function(){return this.buf.substr(this.pos);};/**
 * Return the next single character in the buffer without affecting the parse
 * position.
 *
 * @return {string} The next character in the buffer.
 */hterm.VT.ParseState.prototype.peekChar=function(){return this.buf.substr(this.pos,1);};/**
 * Return the next single character in the buffer and advance the parse
 * position one byte.
 *
 * @return {string} The next character in the buffer.
 */hterm.VT.ParseState.prototype.consumeChar=function(){return this.buf.substr(this.pos++,1);};/**
 * Return true if the buffer is empty, or the position is past the end.
 */hterm.VT.ParseState.prototype.isComplete=function(){return this.buf==null||this.buf.length<=this.pos;};hterm.VT.CursorState=function(vt){this.vt_=vt;this.save();};hterm.VT.CursorState.prototype.save=function(){this.cursor=this.vt_.terminal.saveCursor();this.textAttributes=this.vt_.terminal.getTextAttributes().clone();this.GL=this.vt_.GL;this.GR=this.vt_.GR;this.G0=this.vt_.G0;this.G1=this.vt_.G1;this.G2=this.vt_.G2;this.G3=this.vt_.G3;};hterm.VT.CursorState.prototype.restore=function(){this.vt_.terminal.restoreCursor(this.cursor);this.vt_.terminal.setTextAttributes(this.textAttributes.clone());this.vt_.GL=this.GL;this.vt_.GR=this.GR;this.vt_.G0=this.G0;this.vt_.G1=this.G1;this.vt_.G2=this.G2;this.vt_.G3=this.G3;};hterm.VT.prototype.reset=function(){this.G0=this.characterMaps.getMap('B');this.G1=this.characterMaps.getMap('0');this.G2=this.characterMaps.getMap('B');this.G3=this.characterMaps.getMap('B');this.GL='G0';this.GR='G0';this.savedState_=new hterm.VT.CursorState(this);this.mouseReport=this.MOUSE_REPORT_DISABLED;};/**
 * Handle terminal mouse events.
 *
 * See the "Mouse Tracking" section of [xterm].
 */hterm.VT.prototype.onTerminalMouse_=function(e){if(this.mouseReport==this.MOUSE_REPORT_DISABLED)return;// Temporary storage for our response.
var response;// Modifier key state.
var mod=0;if(e.shiftKey)mod|=4;if(e.metaKey||this.terminal.keyboard.altIsMeta&&e.altKey)mod|=8;if(e.ctrlKey)mod|=16;// TODO(rginda): We should also support mode 1005 and/or 1006 to extend the
// coordinate space.  Though, after poking around just a little, I wasn't
// able to get vi or emacs to use either of these modes.
var x=String.fromCharCode(lib.f.clamp(e.terminalColumn+32,32,255));var y=String.fromCharCode(lib.f.clamp(e.terminalRow+32,32,255));switch(e.type){case'wheel':// Mouse wheel is treated as button 1 or 2 plus an additional 64.
b=(e.deltaY*-1>0?0:1)+96;b|=mod;response='\x1b[M'+String.fromCharCode(b)+x+y;// Keep the terminal from scrolling.
e.preventDefault();break;case'mousedown':// Buttons are encoded as button number plus 32.
var b=Math.min(e.button,2)+32;// And mix in the modifier keys.
b|=mod;response='\x1b[M'+String.fromCharCode(b)+x+y;break;case'mouseup':// Mouse up has no indication of which button was released.
response='\x1b[M\x23'+x+y;break;case'mousemove':if(this.mouseReport==this.MOUSE_REPORT_DRAG&&e.buttons){// Standard button bits.  The XTerm protocol only reports the first
// button press (e.g. if left & right are pressed, right is ignored),
// and it only supports the first three buttons.  If none of them are
// pressed, then XTerm flags it as a release.  We'll do the same.
b=32;// Priority here matches XTerm: left, middle, right.
if(e.buttons&0x1){// Report left button.
b+=0;}else if(e.buttons&0x4){// Report middle button.
b+=1;}else if(e.buttons&0x2){// Report right button.
b+=2;}else{// Release higher buttons.
b+=3;}// Add 32 to indicate mouse motion.
b+=32;// And mix in the modifier keys.
b|=mod;response='\x1b[M'+String.fromCharCode(b)+x+y;}break;case'click':case'dblclick':break;default:console.error('Unknown mouse event: '+e.type,e);break;}if(response)this.terminal.io.sendString(response);};/**
 * Interpret a string of characters, displaying the results on the associated
 * terminal object.
 *
 * The buffer will be decoded according to the 'receive-encoding' preference.
 */hterm.VT.prototype.interpret=function(buf){this.parseState_.resetBuf(this.decode(buf));while(!this.parseState_.isComplete()){var func=this.parseState_.func;var pos=this.parseState_.pos;var buf=this.parseState_.buf;this.parseState_.func.call(this,this.parseState_);if(this.parseState_.func==func&&this.parseState_.pos==pos&&this.parseState_.buf==buf){throw'Parser did not alter the state!';}}};/**
 * Decode a string according to the 'receive-encoding' preference.
 */hterm.VT.prototype.decode=function(str){if(this.characterEncoding=='utf-8')return this.decodeUTF8(str);return str;};/**
 * Encode a UTF-16 string as UTF-8.
 *
 * See also: https://en.wikipedia.org/wiki/UTF-16
 */hterm.VT.prototype.encodeUTF8=function(str){return lib.encodeUTF8(str);};/**
 * Decode a UTF-8 string into UTF-16.
 */hterm.VT.prototype.decodeUTF8=function(str){return this.utf8Decoder_.decode(str);};/**
 * Set the encoding of the terminal.
 *
 * @param {string} encoding The name of the encoding to set.
 */hterm.VT.prototype.setEncoding=function(encoding){switch(encoding){default:console.warn('Invalid value for "terminal-encoding": '+encoding);// Fall through.
case'iso-2022':this.codingSystemUtf8_=false;this.codingSystemLocked_=false;break;case'utf-8-locked':this.codingSystemUtf8_=true;this.codingSystemLocked_=true;break;case'utf-8':this.codingSystemUtf8_=true;this.codingSystemLocked_=false;break;}this.updateEncodingState_();};/**
 * Refresh internal state when the encoding changes.
 */hterm.VT.prototype.updateEncodingState_=function(){var _this5=this;// If we're in UTF8 mode, don't suport 8-bit escape sequences as we'll never
// see those -- everything should be UTF8!
var cc1=Object.keys(hterm.VT.CC1).filter(function(e){return!_this5.codingSystemUtf8_||e.charCodeAt()<0x80;}).map(function(e){return'\\x'+lib.f.zpad(e.charCodeAt().toString(16),2);}).join('');this.cc1Pattern_=new RegExp('['+cc1+']');};/**
 * The default parse function.
 *
 * This will scan the string for the first 1-byte control character (C0/C1
 * characters from [CTRL]).  Any plain text coming before the code will be
 * printed to the terminal, then the control character will be dispatched.
 */hterm.VT.prototype.parseUnknown_=function(parseState){var self=this;function print(str){if(!self.codingSystemUtf8_&&self[self.GL].GL)str=self[self.GL].GL(str);self.terminal.print(str);};// Search for the next contiguous block of plain text.
var buf=parseState.peekRemainingBuf();var nextControl=buf.search(this.cc1Pattern_);if(nextControl==0){// We've stumbled right into a control character.
this.dispatch('CC1',buf.substr(0,1),parseState);parseState.advance(1);return;}if(nextControl==-1){// There are no control characters in this string.
print(buf);parseState.reset();return;}print(buf.substr(0,nextControl));this.dispatch('CC1',buf.substr(nextControl,1),parseState);parseState.advance(nextControl+1);};/**
 * Parse a Control Sequence Introducer code and dispatch it.
 *
 * See [CSI] for some useful information about these codes.
 */hterm.VT.prototype.parseCSI_=function(parseState){var ch=parseState.peekChar();var args=parseState.args;if(ch>='@'&&ch<='~'){// This is the final character.
this.dispatch('CSI',this.leadingModifier_+this.trailingModifier_+ch,parseState);parseState.resetParseFunction();}else if(ch==';'){// Parameter delimiter.
if(this.trailingModifier_){// Parameter delimiter after the trailing modifier.  That's a paddlin'.
parseState.resetParseFunction();}else{if(!args.length){// They omitted the first param, we need to supply it.
args.push('');}args.push('');}}else if(ch>='0'&&ch<='9'){// Next byte in the current parameter.
if(this.trailingModifier_){// Numeric parameter after the trailing modifier.  That's a paddlin'.
parseState.resetParseFunction();}else{if(!args.length){args[0]=ch;}else{args[args.length-1]+=ch;}}}else if(ch>=' '&&ch<='?'&&ch!=':'){// Modifier character.
if(!args.length){this.leadingModifier_+=ch;}else{this.trailingModifier_+=ch;}}else if(this.cc1Pattern_.test(ch)){// Control character.
this.dispatch('CC1',ch,parseState);}else{// Unexpected character in sequence, bail out.
parseState.resetParseFunction();}parseState.advance(1);};/**
 * Skip over the string until the next String Terminator (ST, 'ESC \') or
 * Bell (BEL, '\x07').
 *
 * The string is accumulated in parseState.args[0].  Make sure to reset the
 * arguments (with parseState.resetArguments) before starting the parse.
 *
 * You can detect that parsing in complete by checking that the parse
 * function has changed back to the default parse function.
 *
 * If we encounter more than maxStringSequence characters, we send back
 * the unterminated sequence to be re-parsed with the default parser function.
 *
 * @return {boolean} If true, parsing is ongoing or complete.  If false, we've
 *     exceeded the max string sequence.
 */hterm.VT.prototype.parseUntilStringTerminator_=function(parseState){var buf=parseState.peekRemainingBuf();var args=parseState.args;// Since we might modify parse state buffer locally, if we want to advance
// the parse state buffer later on, we need to know how many chars we added.
var bufInserted=0;if(!args.length){args[0]='';args[1]=new Date();}else{// If our saved buffer ends with an escape, it's because we were hoping
// it's an ST split across two buffers.  Move it from our saved buffer
// to the start of our current buffer for processing anew.
if(args[0].slice(-1)=='\x1b'){args[0]=args[0].slice(0,-1);buf='\x1b'+buf;bufInserted=1;}}var nextTerminator=buf.search(/[\x1b\x07]/);var terminator=buf[nextTerminator];var foundTerminator=void 0;// If the next escape we see is not a start of a ST, fall through.  This will
// either be invalid (embedded escape), or we'll queue it up (wait for \\).
if(terminator=='\x1b'&&buf[nextTerminator+1]!='\\')foundTerminator=false;else foundTerminator=nextTerminator!=-1;if(!foundTerminator){// No terminator here, have to wait for the next string.
args[0]+=buf;var abortReason;if(args[0].length>this.maxStringSequence)abortReason='too long: '+args[0].length;// Special case: If our buffering happens to split the ST (\e\\), we have to
// buffer the content temporarily.  So don't reject a trailing escape here,
// instead we let it timeout or be rejected in the next pass.
if(terminator=='\x1b'&&nextTerminator!=buf.length-1)abortReason='embedded escape: '+nextTerminator;if(new Date()-args[1]>this.oscTimeLimit_)abortReason='timeout expired: '+(new Date()-args[1]);if(abortReason){if(this.warnUnimplemented)console.log('parseUntilStringTerminator_: aborting: '+abortReason,args[0]);parseState.reset(args[0]);return false;}parseState.advance(buf.length-bufInserted);return true;}if(args[0].length+nextTerminator>this.maxStringSequence){// We found the end of the sequence, but we still think it's too long.
parseState.reset(args[0]+buf);return false;}args[0]+=buf.substr(0,nextTerminator);parseState.resetParseFunction();parseState.advance(nextTerminator+(terminator=='\x1b'?2:1)-bufInserted);return true;};/**
 * Dispatch to the function that handles a given CC1, ESC, or CSI or VT52 code.
 */hterm.VT.prototype.dispatch=function(type,code,parseState){var handler=hterm.VT[type][code];if(!handler){if(this.warnUnimplemented)console.warn('Unknown '+type+' code: '+JSON.stringify(code));return;}if(handler==hterm.VT.ignore){if(this.warnUnimplemented)console.warn('Ignored '+type+' code: '+JSON.stringify(code));return;}if(type=='CC1'&&code>'\x7f'&&!this.enable8BitControl){// It's kind of a hack to put this here, but...
//
// If we're dispatching a 'CC1' code, and it's got the eighth bit set,
// but we're not supposed to handle 8-bit codes?  Just ignore it.
//
// This prevents an errant (DCS, '\x90'), (OSC, '\x9d'), (PM, '\x9e') or
// (APC, '\x9f') from locking up the terminal waiting for its expected
// (ST, '\x9c') or (BEL, '\x07').
console.warn('Ignoring 8-bit control code: 0x'+code.charCodeAt(0).toString(16));return;}handler.apply(this,[parseState,code]);};/**
 * Set one of the ANSI defined terminal mode bits.
 *
 * Invoked in response to SM/RM.
 *
 * Unexpected and unimplemented values are silently ignored.
 */hterm.VT.prototype.setANSIMode=function(code,state){if(code==4){// Insert Mode (IRM)
this.terminal.setInsertMode(state);}else if(code==20){// Automatic Newline (LNM)
this.terminal.setAutoCarriageReturn(state);}else if(this.warnUnimplemented){console.warn('Unimplemented ANSI Mode: '+code);}};/**
 * Set or reset one of the DEC Private modes.
 *
 * Invoked in response to DECSET/DECRST.
 */hterm.VT.prototype.setDECMode=function(code,state){switch(parseInt(code,10)){case 1:// DECCKM
this.terminal.keyboard.applicationCursor=state;break;case 3:// DECCOLM
if(this.allowColumnWidthChanges_){this.terminal.setWidth(state?132:80);this.terminal.clearHome();this.terminal.setVTScrollRegion(null,null);}break;case 5:// DECSCNM
this.terminal.setReverseVideo(state);break;case 6:// DECOM
this.terminal.setOriginMode(state);break;case 7:// DECAWM
this.terminal.setWraparound(state);break;case 12:// Start blinking cursor
if(this.enableDec12)this.terminal.setCursorBlink(state);break;case 25:// DECTCEM
this.terminal.setCursorVisible(state);break;case 30:// Show scrollbar
this.terminal.setScrollbarVisible(state);break;case 40:// Allow 80 - 132 (DECCOLM) Mode
this.terminal.allowColumnWidthChanges_=state;break;case 45:// Reverse-wraparound Mode
this.terminal.setReverseWraparound(state);break;case 67:// Backarrow key sends backspace (DECBKM)
this.terminal.keyboard.backspaceSendsBackspace=state;break;case 1000:// Report on mouse clicks only.
this.mouseReport=state?this.MOUSE_REPORT_CLICK:this.MOUSE_REPORT_DISABLED;this.terminal.syncMouseStyle();break;case 1002:// Report on mouse clicks and drags
this.mouseReport=state?this.MOUSE_REPORT_DRAG:this.MOUSE_REPORT_DISABLED;this.terminal.syncMouseStyle();break;case 1004:// Report on window focus change.
this.terminal.reportFocus=state;break;case 1010:// Scroll to bottom on tty output
this.terminal.scrollOnOutput=state;break;case 1011:// Scroll to bottom on key press
this.terminal.scrollOnKeystroke=state;break;case 1036:// Send ESC when Meta modifies a key
this.terminal.keyboard.metaSendsEscape=state;break;case 1039:// Send ESC when Alt modifies a key
if(state){if(!this.terminal.keyboard.previousAltSendsWhat_){this.terminal.keyboard.previousAltSendsWhat_=this.terminal.keyboard.altSendsWhat;this.terminal.keyboard.altSendsWhat='escape';}}else if(this.terminal.keyboard.previousAltSendsWhat_){this.terminal.keyboard.altSendsWhat=this.terminal.keyboard.previousAltSendsWhat_;this.terminal.keyboard.previousAltSendsWhat_=null;}break;case 47:// Use Alternate Screen Buffer
case 1047:this.terminal.setAlternateMode(state);break;case 1048:// Save cursor as in DECSC.
this.savedState_.save();case 1049:// 1047 + 1048 + clear.
if(state){this.savedState_.save();this.terminal.setAlternateMode(state);this.terminal.clear();}else{this.terminal.setAlternateMode(state);this.savedState_.restore();}break;case 2004:// Bracketed paste mode.
this.terminal.setBracketedPaste(state);break;default:if(this.warnUnimplemented)console.warn('Unimplemented DEC Private Mode: '+code);break;}};/**
 * Function shared by control characters and escape sequences that are
 * ignored.
 */hterm.VT.ignore=function(){};/**
 * Collection of control characters expressed in a single byte.
 *
 * This includes the characters from the C0 and C1 sets (see [CTRL]) that we
 * care about.  Two byte versions of the C1 codes are defined in the
 * hterm.VT.ESC collection.
 *
 * The 'CC1' mnemonic here refers to the fact that these are one-byte Control
 * Codes.  It's only used in this source file and not defined in any of the
 * referenced documents.
 */hterm.VT.CC1={};/**
 * Collection of two-byte and three-byte sequences starting with ESC.
 */hterm.VT.ESC={};/**
 * Collection of CSI (Control Sequence Introducer) sequences.
 *
 * These sequences begin with 'ESC [', and may take zero or more arguments.
 */hterm.VT.CSI={};/**
 * Collection of OSC (Operating System Control) sequences.
 *
 * These sequences begin with 'ESC ]', followed by a function number and a
 * string terminated by either ST or BEL.
 */hterm.VT.OSC={};/**
 * Collection of VT52 sequences.
 *
 * When in VT52 mode, other sequences are disabled.
 */hterm.VT.VT52={};/**
 * Null (NUL).
 *
 * Silently ignored.
 */hterm.VT.CC1['\x00']=hterm.VT.ignore;/**
 * Enquiry (ENQ).
 *
 * Transmit answerback message.
 *
 * The default answerback message in xterm is an empty string, so we just
 * ignore this.
 */hterm.VT.CC1['\x05']=hterm.VT.ignore;/**
 * Ring Bell (BEL).
 */hterm.VT.CC1['\x07']=function(){this.terminal.ringBell();};/**
 * Backspace (BS).
 *
 * Move the cursor to the left one character position, unless it is at the
 * left margin, in which case no action occurs.
 */hterm.VT.CC1['\x08']=function(){this.terminal.cursorLeft(1);};/**
 * Horizontal Tab (HT).
 *
 * Move the cursor to the next tab stop, or to the right margin if no further
 * tab stops are present on the line.
 */hterm.VT.CC1['\x09']=function(){this.terminal.forwardTabStop();};/**
 * Line Feed (LF).
 *
 * This code causes a line feed or a new line operation.  See Automatic
 * Newline (LNM).
 */hterm.VT.CC1['\x0a']=function(){this.terminal.formFeed();};/**
 * Vertical Tab (VT).
 *
 * Interpreted as LF.
 */hterm.VT.CC1['\x0b']=hterm.VT.CC1['\x0a'];/**
 * Form Feed (FF).
 *
 * Interpreted as LF.
 */hterm.VT.CC1['\x0c']=hterm.VT.CC1['\x0a'];/**
 * Carriage Return (CR).
 *
 * Move cursor to the left margin on the current line.
 */hterm.VT.CC1['\x0d']=function(){this.terminal.setCursorColumn(0);};/**
 * Shift Out (SO), aka Lock Shift 0 (LS1).
 *
 * Invoke G1 character set in GL.
 */hterm.VT.CC1['\x0e']=function(){this.GL='G1';};/**
 * Shift In (SI), aka Lock Shift 0 (LS0).
 *
 * Invoke G0 character set in GL.
 */hterm.VT.CC1['\x0f']=function(){this.GL='G0';};/**
 * Transmit On (XON).
 *
 * Not currently implemented.
 *
 * TODO(rginda): Implement?
 */hterm.VT.CC1['\x11']=hterm.VT.ignore;/**
 * Transmit Off (XOFF).
 *
 * Not currently implemented.
 *
 * TODO(rginda): Implement?
 */hterm.VT.CC1['\x13']=hterm.VT.ignore;/**
 * Cancel (CAN).
 *
 * If sent during a control sequence, the sequence is immediately terminated
 * and not executed.
 *
 * It also causes the error character to be displayed.
 */hterm.VT.CC1['\x18']=function(parseState){// If we've shifted in the G1 character set, shift it back out to
// the default character set.
if(this.GL=='G1'){this.GL='G0';}parseState.resetParseFunction();this.terminal.print('?');};/**
 * Substitute (SUB).
 *
 * Interpreted as CAN.
 */hterm.VT.CC1['\x1a']=hterm.VT.CC1['\x18'];/**
 * Escape (ESC).
 */hterm.VT.CC1['\x1b']=function(parseState){function parseESC(parseState){var ch=parseState.consumeChar();if(ch=='\x1b')return;this.dispatch('ESC',ch,parseState);if(parseState.func==parseESC)parseState.resetParseFunction();};parseState.func=parseESC;};/**
 * Delete (DEL).
 */hterm.VT.CC1['\x7f']=hterm.VT.ignore;// 8 bit control characters and their two byte equivalents, below...
/**
 * Index (IND).
 *
 * Like newline, only keep the X position
 */hterm.VT.CC1['\x84']=hterm.VT.ESC['D']=function(){this.terminal.lineFeed();};/**
 * Next Line (NEL).
 *
 * Like newline, but doesn't add lines.
 */hterm.VT.CC1['\x85']=hterm.VT.ESC['E']=function(){this.terminal.setCursorColumn(0);this.terminal.cursorDown(1);};/**
 * Horizontal Tabulation Set (HTS).
 */hterm.VT.CC1['\x88']=hterm.VT.ESC['H']=function(){this.terminal.setTabStop(this.terminal.getCursorColumn());};/**
 * Reverse Index (RI).
 *
 * Move up one line.
 */hterm.VT.CC1['\x8d']=hterm.VT.ESC['M']=function(){this.terminal.reverseLineFeed();};/**
 * Single Shift 2 (SS2).
 *
 * Select of G2 Character Set for the next character only.
 *
 * Not currently implemented.
 */hterm.VT.CC1['\x8e']=hterm.VT.ESC['N']=hterm.VT.ignore;/**
 * Single Shift 3 (SS3).
 *
 * Select of G3 Character Set for the next character only.
 *
 * Not currently implemented.
 */hterm.VT.CC1['\x8f']=hterm.VT.ESC['O']=hterm.VT.ignore;/**
 * Device Control String (DCS).
 *
 * Indicate a DCS sequence.  See Device-Control functions in [XTERM].
 * Not currently implemented.
 *
 * TODO(rginda): Consider implementing DECRQSS, the rest don't seem applicable.
 */hterm.VT.CC1['\x90']=hterm.VT.ESC['P']=function(parseState){parseState.resetArguments();parseState.func=this.parseUntilStringTerminator_;};/**
 * Start of Guarded Area (SPA).
 *
 * Will not implement.
 */hterm.VT.CC1['\x96']=hterm.VT.ESC['V']=hterm.VT.ignore;/**
 * End of Guarded Area (EPA).
 *
 * Will not implement.
 */hterm.VT.CC1['\x97']=hterm.VT.ESC['W']=hterm.VT.ignore;/**
 * Start of String (SOS).
 *
 * Will not implement.
 */hterm.VT.CC1['\x98']=hterm.VT.ESC['X']=hterm.VT.ignore;/**
 * Single Character Introducer (SCI, also DECID).
 *
 * Return Terminal ID.  Obsolete form of 'ESC [ c' (DA).
 */hterm.VT.CC1['\x9a']=hterm.VT.ESC['Z']=function(){this.terminal.io.sendString('\x1b[?1;2c');};/**
 * Control Sequence Introducer (CSI).
 *
 * The lead into most escape sequences.  See [CSI].
 */hterm.VT.CC1['\x9b']=hterm.VT.ESC['[']=function(parseState){parseState.resetArguments();this.leadingModifier_='';this.trailingModifier_='';parseState.func=this.parseCSI_;};/**
 * String Terminator (ST).
 *
 * Used to terminate DCS/OSC/PM/APC commands which may take string arguments.
 *
 * We don't directly handle it here, as it's only used to terminate other
 * sequences.  See the 'parseUntilStringTerminator_' method.
 */hterm.VT.CC1['\x9c']=hterm.VT.ESC['\\']=hterm.VT.ignore;/**
 * Operating System Command (OSC).
 *
 * Commands relating to the operating system.
 */hterm.VT.CC1['\x9d']=hterm.VT.ESC[']']=function(parseState){parseState.resetArguments();function parseOSC(parseState){if(!this.parseUntilStringTerminator_(parseState)){// The string sequence was too long.
return;}if(parseState.func==parseOSC){// We're not done parsing the string yet.
return;}// We're done.
var ary=parseState.args[0].match(/^(\d+);(.*)$/);if(ary){parseState.args[0]=ary[2];this.dispatch('OSC',ary[1],parseState);}else{console.warn('Invalid OSC: '+JSON.stringify(parseState.args[0]));}};parseState.func=parseOSC;};/**
 * Privacy Message (PM).
 *
 * Will not implement.
 */hterm.VT.CC1['\x9e']=hterm.VT.ESC['^']=function(parseState){parseState.resetArguments();parseState.func=this.parseUntilStringTerminator_;};/**
 * Application Program Control (APC).
 *
 * Will not implement.
 */hterm.VT.CC1['\x9f']=hterm.VT.ESC['_']=function(parseState){parseState.resetArguments();parseState.func=this.parseUntilStringTerminator_;};/**
 * ESC \x20 - Unclear to me where these originated, possibly in xterm.
 *
 * Not currently implemented:
 *   ESC \x20 F - Select 7 bit escape codes in responses (S7C1T).
 *   ESC \x20 G - Select 8 bit escape codes in responses (S8C1T).
 *                NB: We currently assume S7C1T always.
 *
 * Will not implement:
 *   ESC \x20 L - Set ANSI conformance level 1.
 *   ESC \x20 M - Set ANSI conformance level 2.
 *   ESC \x20 N - Set ANSI conformance level 3.
 */hterm.VT.ESC['\x20']=function(parseState){parseState.func=function(parseState){var ch=parseState.consumeChar();if(this.warnUnimplemented)console.warn('Unimplemented sequence: ESC 0x20 '+ch);parseState.resetParseFunction();};};/**
 * DEC 'ESC #' sequences.
 */hterm.VT.ESC['#']=function(parseState){parseState.func=function(parseState){var ch=parseState.consumeChar();if(ch=='8')// DEC Screen Alignment Test (DECALN)
this.terminal.fill('E');parseState.resetParseFunction();};};/**
 * Designate Other Coding System (DOCS).
 */hterm.VT.ESC['%']=function(parseState){parseState.func=function(parseState){var ch=parseState.consumeChar();// If we've locked the encoding, then just eat the bytes and return.
if(this.codingSystemLocked_){if(ch=='/')parseState.consumeChar();parseState.resetParseFunction();return;}// Process the encoding requests.
switch(ch){case'@':// Switch to ECMA 35.
this.setEncoding('iso-2022');break;case'G':// Switch to UTF-8.
this.setEncoding('utf-8');break;case'/':// One way transition to something else.
ch=parseState.consumeChar();switch(ch){case'G':// UTF-8 Level 1.
case'H':// UTF-8 Level 2.
case'I':// UTF-8 Level 3.
// We treat all UTF-8 levels the same.
this.setEncoding('utf-8-locked');break;default:if(this.warnUnimplemented)console.warn('Unknown ESC % / argument: '+JSON.stringify(ch));break;}break;default:if(this.warnUnimplemented)console.warn('Unknown ESC % argument: '+JSON.stringify(ch));break;}parseState.resetParseFunction();};};/**
 * Character Set Selection (SCS).
 *
 *   ESC ( Ps - Set G0 character set (VT100).
 *   ESC ) Ps - Set G1 character set (VT220).
 *   ESC * Ps - Set G2 character set (VT220).
 *   ESC + Ps - Set G3 character set (VT220).
 *   ESC - Ps - Set G1 character set (VT300).
 *   ESC . Ps - Set G2 character set (VT300).
 *   ESC / Ps - Set G3 character set (VT300).
 *
 * All other sequences are echoed to the terminal.
 */hterm.VT.ESC['(']=hterm.VT.ESC[')']=hterm.VT.ESC['*']=hterm.VT.ESC['+']=hterm.VT.ESC['-']=hterm.VT.ESC['.']=hterm.VT.ESC['/']=function(parseState,code){parseState.func=function(parseState){var ch=parseState.consumeChar();if(ch=='\x1b'){parseState.resetParseFunction();parseState.func();return;}var map=this.characterMaps.getMap(ch);if(map!==undefined){if(code=='('){this.G0=map;}else if(code==')'||code=='-'){this.G1=map;}else if(code=='*'||code=='.'){this.G2=map;}else if(code=='+'||code=='/'){this.G3=map;}}else if(this.warnUnimplemented){console.log('Invalid character set for "'+code+'": '+ch);}parseState.resetParseFunction();};};/**
 * Back Index (DECBI).
 *
 * VT420 and up.  Not currently implemented.
 */hterm.VT.ESC['6']=hterm.VT.ignore;/**
 * Save Cursor (DECSC).
 */hterm.VT.ESC['7']=function(){this.savedState_.save();};/**
 * Restore Cursor (DECRC).
 */hterm.VT.ESC['8']=function(){this.savedState_.restore();};/**
 * Forward Index (DECFI).
 *
 * VT210 and up.  Not currently implemented.
 */hterm.VT.ESC['9']=hterm.VT.ignore;/**
 * Application keypad (DECKPAM).
 */hterm.VT.ESC['=']=function(){this.terminal.keyboard.applicationKeypad=true;};/**
 * Normal keypad (DECKPNM).
 */hterm.VT.ESC['>']=function(){this.terminal.keyboard.applicationKeypad=false;};/**
 * Cursor to lower left corner of screen.
 *
 * Will not implement.
 *
 * This is only recognized by xterm when the hpLowerleftBugCompat resource is
 * set.
 */hterm.VT.ESC['F']=hterm.VT.ignore;/**
 * Full Reset (RIS).
 */hterm.VT.ESC['c']=function(){this.reset();this.terminal.reset();};/**
 * Memory lock/unlock.
 *
 * Will not implement.
 */hterm.VT.ESC['l']=hterm.VT.ESC['m']=hterm.VT.ignore;/**
 * Lock Shift 2 (LS2)
 *
 * Invoke the G2 Character Set as GL.
 */hterm.VT.ESC['n']=function(){this.GL='G2';};/**
 * Lock Shift 3 (LS3)
 *
 * Invoke the G3 Character Set as GL.
 */hterm.VT.ESC['o']=function(){this.GL='G3';};/**
 * Lock Shift 2, Right (LS3R)
 *
 * Invoke the G3 Character Set as GR.
 */hterm.VT.ESC['|']=function(){this.GR='G3';};/**
 * Lock Shift 2, Right (LS2R)
 *
 * Invoke the G2 Character Set as GR.
 */hterm.VT.ESC['}']=function(){this.GR='G2';};/**
 * Lock Shift 1, Right (LS1R)
 *
 * Invoke the G1 Character Set as GR.
 */hterm.VT.ESC['~']=function(){this.GR='G1';};/**
 * Change icon name and window title.
 *
 * We only change the window title.
 */hterm.VT.OSC['0']=function(parseState){this.terminal.setWindowTitle(parseState.args[0]);};/**
 * Change window title.
 */hterm.VT.OSC['2']=hterm.VT.OSC['0'];/**
 * Set/read color palette.
 */hterm.VT.OSC['4']=function(parseState){// Args come in as a single 'index1;rgb1 ... ;indexN;rgbN' string.
// We split on the semicolon and iterate through the pairs.
var args=parseState.args[0].split(';');var pairCount=parseInt(args.length/2);var colorPalette=this.terminal.getTextAttributes().colorPalette;var responseArray=[];for(var pairNumber=0;pairNumber<pairCount;++pairNumber){var colorIndex=parseInt(args[pairNumber*2]);var colorValue=args[pairNumber*2+1];if(colorIndex>=colorPalette.length)continue;if(colorValue=='?'){// '?' means we should report back the current color value.
colorValue=lib.colors.rgbToX11(colorPalette[colorIndex]);if(colorValue)responseArray.push(colorIndex+';'+colorValue);continue;}colorValue=lib.colors.x11ToCSS(colorValue);if(colorValue)colorPalette[colorIndex]=colorValue;}if(responseArray.length)this.terminal.io.sendString('\x1b]4;'+responseArray.join(';')+'\x07');};/**
 * iTerm2 growl notifications.
 */hterm.VT.OSC['9']=function(parseState){// This just dumps the entire string as the message.
hterm.notify({'body':parseState.args[0]});};/**
 * Change VT100 text foreground color.
 */hterm.VT.OSC['10']=function(parseState){// Args come in as a single string, but extra args will chain to the following
// OSC sequences.
var args=parseState.args[0].split(';');if(!args)return;var colorArg;var colorX11=lib.colors.x11ToCSS(args.shift());if(colorX11)this.terminal.setForegroundColor(colorX11);if(args.length>0){parseState.args[0]=args.join(';');hterm.VT.OSC['11'].apply(this,[parseState]);}};/**
 * Change VT100 text background color.
 */hterm.VT.OSC['11']=function(parseState){// Args come in as a single string, but extra args will chain to the following
// OSC sequences.
var args=parseState.args[0].split(';');if(!args)return;var colorArg;var colorX11=lib.colors.x11ToCSS(args.shift());if(colorX11)this.terminal.setBackgroundColor(colorX11);if(args.length>0){parseState.args[0]=args.join(';');hterm.VT.OSC['12'].apply(this,[parseState]);}};/**
 * Change text cursor color.
 */hterm.VT.OSC['12']=function(parseState){// Args come in as a single string, but extra args will chain to the following
// OSC sequences.
var args=parseState.args[0].split(';');if(!args)return;var colorArg;var colorX11=lib.colors.x11ToCSS(args.shift());if(colorX11)this.terminal.setCursorColor(colorX11);/* Note: If we support OSC 13+, we'd chain it here.
  if (args.length > 0) {
    parseState.args[0] = args.join(';');
    hterm.VT.OSC['13'].apply(this, [parseState]);
  }
  */};/**
 * Set the cursor shape.
 *
 * Parameter is expected to be in the form "CursorShape=number", where number is
 * one of:
 *
 *   0 - Block
 *   1 - I-Beam
 *   2 - Underline
 *
 * This is a bit of a de-facto standard supported by iTerm 2 and Konsole.  See
 * also: DECSCUSR.
 *
 * Invalid numbers will restore the cursor to the block shape.
 */hterm.VT.OSC['50']=function(parseState){var args=parseState.args[0].match(/CursorShape=(.)/i);if(!args){console.warn('Could not parse OSC 50 args: '+parseState.args[0]);return;}switch(args[1]){case'1':// CursorShape=1: I-Beam.
this.terminal.setCursorShape(hterm.Terminal.cursorShape.BEAM);break;case'2':// CursorShape=2: Underline.
this.terminal.setCursorShape(hterm.Terminal.cursorShape.UNDERLINE);break;default:// CursorShape=0: Block.
this.terminal.setCursorShape(hterm.Terminal.cursorShape.BLOCK);}};/**
 * Set/read system clipboard.
 *
 * Read is not implemented due to security considerations.  A remote app
 * that is able to both write and read to the clipboard could essentially
 * take over your session.
 *
 * The clipboard data will be decoded according to the 'receive-encoding'
 * preference.
 */hterm.VT.OSC['52']=function(parseState){// Args come in as a single 'clipboard;b64-data' string.  The clipboard
// parameter is used to select which of the X clipboards to address.  Since
// we're not integrating with X, we treat them all the same.
var args=parseState.args[0].match(/^[cps01234567]*;(.*)/);if(!args)return;var data=window.atob(args[1]);if(data)this.terminal.copyStringToClipboard(this.decode(data));};/**
 * URxvt perl modules.
 *
 * This is the escape system used by rxvt-unicode and its perl modules.
 * Obviously we don't support perl or custom modules, so we list a few common
 * ones that we find useful.
 *
 * Technically there is no format here, but most modules obey:
 * <module name>;<module args, usually ; delimited>
 */hterm.VT.OSC['777']=function(parseState){var ary;var urxvtMod=parseState.args[0].split(';',1)[0];switch(urxvtMod){case'notify':// Format:
// notify;title;message
var title,message;ary=parseState.args[0].match(/^[^;]+;([^;]*)(;([\s\S]*))?$/);if(ary){title=ary[1];message=ary[3];}hterm.notify({'title':title,'body':message});break;default:console.warn('Unknown urxvt module: '+parseState.args[0]);break;}};/**
 * Insert (blank) characters (ICH).
 */hterm.VT.CSI['@']=function(parseState){this.terminal.insertSpace(parseState.iarg(0,1));};/**
 * Cursor Up (CUU).
 */hterm.VT.CSI['A']=function(parseState){this.terminal.cursorUp(parseState.iarg(0,1));};/**
 * Cursor Down (CUD).
 */hterm.VT.CSI['B']=function(parseState){this.terminal.cursorDown(parseState.iarg(0,1));};/**
 * Cursor Forward (CUF).
 */hterm.VT.CSI['C']=function(parseState){this.terminal.cursorRight(parseState.iarg(0,1));};/**
 * Cursor Backward (CUB).
 */hterm.VT.CSI['D']=function(parseState){this.terminal.cursorLeft(parseState.iarg(0,1));};/**
 * Cursor Next Line (CNL).
 *
 * This is like Cursor Down, except the cursor moves to the beginning of the
 * line as well.
 */hterm.VT.CSI['E']=function(parseState){this.terminal.cursorDown(parseState.iarg(0,1));this.terminal.setCursorColumn(0);};/**
 * Cursor Preceding Line (CPL).
 *
 * This is like Cursor Up, except the cursor moves to the beginning of the
 * line as well.
 */hterm.VT.CSI['F']=function(parseState){this.terminal.cursorUp(parseState.iarg(0,1));this.terminal.setCursorColumn(0);};/**
 * Cursor Character Absolute (CHA).
 */hterm.VT.CSI['G']=function(parseState){this.terminal.setCursorColumn(parseState.iarg(0,1)-1);};/**
 * Cursor Position (CUP).
 */hterm.VT.CSI['H']=function(parseState){this.terminal.setCursorPosition(parseState.iarg(0,1)-1,parseState.iarg(1,1)-1);};/**
 * Cursor Forward Tabulation (CHT).
 */hterm.VT.CSI['I']=function(parseState){var count=parseState.iarg(0,1);count=lib.f.clamp(count,1,this.terminal.screenSize.width);for(var i=0;i<count;i++){this.terminal.forwardTabStop();}};/**
 * Erase in Display (ED, DECSED).
 */hterm.VT.CSI['J']=hterm.VT.CSI['?J']=function(parseState,code){var arg=parseState.args[0];if(!arg||arg==0){this.terminal.eraseBelow();}else if(arg==1){this.terminal.eraseAbove();}else if(arg==2){this.terminal.clear();}else if(arg==3){// The xterm docs say this means "Erase saved lines", but we'll just clear
// the display since killing the scrollback seems rude.
this.terminal.clear();}};/**
 * Erase in line (EL, DECSEL).
 */hterm.VT.CSI['K']=hterm.VT.CSI['?K']=function(parseState,code){var arg=parseState.args[0];if(!arg||arg==0){this.terminal.eraseToRight();}else if(arg==1){this.terminal.eraseToLeft();}else if(arg==2){this.terminal.eraseLine();}};/**
 * Insert Lines (IL).
 */hterm.VT.CSI['L']=function(parseState){this.terminal.insertLines(parseState.iarg(0,1));};/**
 * Delete Lines (DL).
 */hterm.VT.CSI['M']=function(parseState){this.terminal.deleteLines(parseState.iarg(0,1));};/**
 * Delete Characters (DCH).
 *
 * This command shifts the line contents left, starting at the cursor position.
 */hterm.VT.CSI['P']=function(parseState){this.terminal.deleteChars(parseState.iarg(0,1));};/**
 * Scroll Up (SU).
 */hterm.VT.CSI['S']=function(parseState){this.terminal.vtScrollUp(parseState.iarg(0,1));};/**
 * Scroll Down (SD).
 * Also 'Initiate highlight mouse tracking'.  Will not implement this part.
 */hterm.VT.CSI['T']=function(parseState){if(parseState.args.length<=1)this.terminal.vtScrollDown(parseState.iarg(0,1));};/**
 * Reset one or more features of the title modes to the default value.
 *
 *   ESC [ > Ps T
 *
 * Normally, "reset" disables the feature. It is possible to disable the
 * ability to reset features by compiling a different default for the title
 * modes into xterm.
 *
 * Ps values:
 *   0 - Do not set window/icon labels using hexadecimal.
 *   1 - Do not query window/icon labels using hexadecimal.
 *   2 - Do not set window/icon labels using UTF-8.
 *   3 - Do not query window/icon labels using UTF-8.
 *
 * Will not implement.
 */hterm.VT.CSI['>T']=hterm.VT.ignore;/**
 * Erase Characters (ECH).
 */hterm.VT.CSI['X']=function(parseState){this.terminal.eraseToRight(parseState.iarg(0,1));};/**
 * Cursor Backward Tabulation (CBT).
 */hterm.VT.CSI['Z']=function(parseState){var count=parseState.iarg(0,1);count=lib.f.clamp(count,1,this.terminal.screenSize.width);for(var i=0;i<count;i++){this.terminal.backwardTabStop();}};/**
 * Character Position Absolute (HPA).
 *
 * Same as Cursor Character Absolute (CHA).
 */hterm.VT.CSI['`']=hterm.VT.CSI['G'];/**
 * Character Position Relative (HPR).
 */hterm.VT.CSI['a']=function(parseState){this.terminal.setCursorColumn(this.terminal.getCursorColumn()+parseState.iarg(0,1));};/**
 * Repeat the preceding graphic character.
 *
 * Not currently implemented.
 */hterm.VT.CSI['b']=hterm.VT.ignore;/**
 * Send Device Attributes (Primary DA).
 *
 * TODO(rginda): This is hardcoded to send back 'VT100 with Advanced Video
 * Option', but it may be more correct to send a VT220 response once
 * we fill out the 'Not currently implemented' parts.
 */hterm.VT.CSI['c']=function(parseState){if(!parseState.args[0]||parseState.args[0]==0){this.terminal.io.sendString('\x1b[?1;2c');}};/**
 * Send Device Attributes (Secondary DA).
 *
 * TODO(rginda): This is hardcoded to send back 'VT100' but it may be more
 * correct to send a VT220 response once we fill out more 'Not currently
 * implemented' parts.
 */hterm.VT.CSI['>c']=function(parseState){this.terminal.io.sendString('\x1b[>0;256;0c');};/**
 * Line Position Absolute (VPA).
 */hterm.VT.CSI['d']=function(parseState){this.terminal.setAbsoluteCursorRow(parseState.iarg(0,1)-1);};/**
 * Horizontal and Vertical Position (HVP).
 *
 * Same as Cursor Position (CUP).
 */hterm.VT.CSI['f']=hterm.VT.CSI['H'];/**
 * Tab Clear (TBC).
 */hterm.VT.CSI['g']=function(parseState){if(!parseState.args[0]||parseState.args[0]==0){// Clear tab stop at cursor.
this.terminal.clearTabStopAtCursor(false);}else if(parseState.args[0]==3){// Clear all tab stops.
this.terminal.clearAllTabStops();}};/**
 * Set Mode (SM).
 */hterm.VT.CSI['h']=function(parseState){for(var i=0;i<parseState.args.length;i++){this.setANSIMode(parseState.args[i],true);}};/**
 * DEC Private Mode Set (DECSET).
 */hterm.VT.CSI['?h']=function(parseState){for(var i=0;i<parseState.args.length;i++){this.setDECMode(parseState.args[i],true);}};/**
 * Media Copy (MC).
 * Media Copy (MC, DEC Specific).
 *
 * These commands control the printer.  Will not implement.
 */hterm.VT.CSI['i']=hterm.VT.CSI['?i']=hterm.VT.ignore;/**
 * Reset Mode (RM).
 */hterm.VT.CSI['l']=function(parseState){for(var i=0;i<parseState.args.length;i++){this.setANSIMode(parseState.args[i],false);}};/**
 * DEC Private Mode Reset (DECRST).
 */hterm.VT.CSI['?l']=function(parseState){for(var i=0;i<parseState.args.length;i++){this.setDECMode(parseState.args[i],false);}};/**
 * Character Attributes (SGR).
 *
 * Iterate through the list of arguments, applying the attribute changes based
 * on the argument value...
 */hterm.VT.CSI['m']=function(parseState){function get256(i){if(parseState.args.length<i+2||parseState.args[i+1]!=5)return null;return parseState.iarg(i+2,0);}function getTrueColor(i){if(parseState.args.length<i+5||parseState.args[i+1]!=2)return null;var r=parseState.iarg(i+2,0);var g=parseState.iarg(i+3,0);var b=parseState.iarg(i+4,0);return'rgb('+r+' ,'+g+' ,'+b+')';}var attrs=this.terminal.getTextAttributes();if(!parseState.args.length){attrs.reset();return;}for(var i=0;i<parseState.args.length;i++){var arg=parseState.iarg(i,0);if(arg<30){if(arg==0){// Normal (default).
attrs.reset();}else if(arg==1){// Bold.
attrs.bold=true;}else if(arg==2){// Faint.
attrs.faint=true;}else if(arg==3){// Italic.
attrs.italic=true;}else if(arg==4){// Underline.
attrs.underline=true;}else if(arg==5){// Blink.
attrs.blink=true;}else if(arg==7){// Inverse.
attrs.inverse=true;}else if(arg==8){// Invisible.
attrs.invisible=true;}else if(arg==9){// Crossed out.
attrs.strikethrough=true;}else if(arg==22){// Not bold & not faint.
attrs.bold=false;attrs.faint=false;}else if(arg==23){// Not italic.
attrs.italic=false;}else if(arg==24){// Not underlined.
attrs.underline=false;}else if(arg==25){// Not blink.
attrs.blink=false;}else if(arg==27){// Steady.
attrs.inverse=false;}else if(arg==28){// Visible.
attrs.invisible=false;}else if(arg==29){// Not crossed out.
attrs.strikethrough=false;}}else if(arg<50){// Select fore/background color from bottom half of 16 color palette
// or from the 256 color palette or alternative specify color in fully
// qualified rgb(r, g, b) form.
if(arg<38){attrs.foregroundSource=arg-30;}else if(arg==38){// First check for true color definition
var trueColor=getTrueColor(i);if(trueColor!=null){attrs.foregroundSource=attrs.SRC_RGB;attrs.foreground=trueColor;i+=5;}else{// Check for 256 color
var c=get256(i);if(c==null)break;i+=2;if(c>=attrs.colorPalette.length)continue;attrs.foregroundSource=c;}}else if(arg==39){attrs.foregroundSource=attrs.SRC_DEFAULT;}else if(arg<48){attrs.backgroundSource=arg-40;}else if(arg==48){// First check for true color definition
var trueColor=getTrueColor(i);if(trueColor!=null){attrs.backgroundSource=attrs.SRC_RGB;attrs.background=trueColor;i+=5;}else{// Check for 256 color
var c=get256(i);if(c==null)break;i+=2;if(c>=attrs.colorPalette.length)continue;attrs.backgroundSource=c;}}else{attrs.backgroundSource=attrs.SRC_DEFAULT;}}else if(arg>=90&&arg<=97){attrs.foregroundSource=arg-90+8;}else if(arg>=100&&arg<=107){attrs.backgroundSource=arg-100+8;}}attrs.setDefaults(this.terminal.getForegroundColor(),this.terminal.getBackgroundColor());};/**
 * Set xterm-specific keyboard modes.
 *
 * Will not implement.
 */hterm.VT.CSI['>m']=hterm.VT.ignore;/**
 * Device Status Report (DSR, DEC Specific).
 *
 * 5 - Status Report. Result (OK) is CSI 0 n
 * 6 - Report Cursor Position (CPR) [row;column]. Result is CSI r ; c R
 */hterm.VT.CSI['n']=function(parseState){if(parseState.args[0]==5){this.terminal.io.sendString('\x1b0n');}else if(parseState.args[0]==6){var row=this.terminal.getCursorRow()+1;var col=this.terminal.getCursorColumn()+1;this.terminal.io.sendString('\x1b['+row+';'+col+'R');}};/**
 * Disable modifiers which may be enabled via CSI['>m'].
 *
 * Will not implement.
 */hterm.VT.CSI['>n']=hterm.VT.ignore;/**
 * Device Status Report (DSR, DEC Specific).
 *
 * 6  - Report Cursor Position (CPR) [row;column] as CSI ? r ; c R
 * 15 - Report Printer status as CSI ? 1 0 n (ready) or
 *      CSI ? 1 1 n (not ready).
 * 25 - Report UDK status as CSI ? 2 0 n (unlocked) or CSI ? 2 1 n (locked).
 * 26 - Report Keyboard status as CSI ? 2 7 ; 1 ; 0 ; 0 n (North American).
 *      The last two parameters apply to VT400 & up, and denote keyboard ready
 *      and LK01 respectively.
 * 53 - Report Locator status as CSI ? 5 3 n Locator available, if compiled-in,
 *      or CSI ? 5 0 n No Locator, if not.
 */hterm.VT.CSI['?n']=function(parseState){if(parseState.args[0]==6){var row=this.terminal.getCursorRow()+1;var col=this.terminal.getCursorColumn()+1;this.terminal.io.sendString('\x1b['+row+';'+col+'R');}else if(parseState.args[0]==15){this.terminal.io.sendString('\x1b[?11n');}else if(parseState.args[0]==25){this.terminal.io.sendString('\x1b[?21n');}else if(parseState.args[0]==26){this.terminal.io.sendString('\x1b[?12;1;0;0n');}else if(parseState.args[0]==53){this.terminal.io.sendString('\x1b[?50n');}};/**
 * This is used by xterm to decide whether to hide the pointer cursor as the
 * user types.
 *
 * Valid values for the parameter:
 *   0 - Never hide the pointer.
 *   1 - Hide if the mouse tracking mode is not enabled.
 *   2 - Always hide the pointer.
 *
 * If no parameter is given, xterm uses the default, which is 1.
 *
 * Not currently implemented.
 */hterm.VT.CSI['>p']=hterm.VT.ignore;/**
 * Soft terminal reset (DECSTR).
 */hterm.VT.CSI['!p']=function(){this.reset();this.terminal.softReset();};/**
 * Request ANSI Mode (DECRQM).
 *
 * Not currently implemented.
 */hterm.VT.CSI['$p']=hterm.VT.ignore;hterm.VT.CSI['?$p']=hterm.VT.ignore;/**
 * Set conformance level (DECSCL).
 *
 * Not currently implemented.
 */hterm.VT.CSI['"p']=hterm.VT.ignore;/**
 * Load LEDs (DECLL).
 *
 * Not currently implemented.  Could be implemented as virtual LEDs overlaying
 * the terminal if anyone cares.
 */hterm.VT.CSI['q']=hterm.VT.ignore;/**
 * Set cursor style (DECSCUSR, VT520).
 */hterm.VT.CSI[' q']=function(parseState){var arg=parseState.args[0];if(arg==0||arg==1){this.terminal.setCursorShape(hterm.Terminal.cursorShape.BLOCK);this.terminal.setCursorBlink(true);}else if(arg==2){this.terminal.setCursorShape(hterm.Terminal.cursorShape.BLOCK);this.terminal.setCursorBlink(false);}else if(arg==3){this.terminal.setCursorShape(hterm.Terminal.cursorShape.UNDERLINE);this.terminal.setCursorBlink(true);}else if(arg==4){this.terminal.setCursorShape(hterm.Terminal.cursorShape.UNDERLINE);this.terminal.setCursorBlink(false);}else if(arg==5){this.terminal.setCursorShape(hterm.Terminal.cursorShape.BEAM);this.terminal.setCursorBlink(true);}else if(arg==6){this.terminal.setCursorShape(hterm.Terminal.cursorShape.BEAM);this.terminal.setCursorBlink(false);}else{console.warn('Unknown cursor style: '+arg);}};/**
 * Select character protection attribute (DECSCA).
 *
 * Will not implement.
 */hterm.VT.CSI['"q']=hterm.VT.ignore;/**
 * Set Scrolling Region (DECSTBM).
 */hterm.VT.CSI['r']=function(parseState){var args=parseState.args;var scrollTop=args[0]?parseInt(args[0],10)-1:null;var scrollBottom=args[1]?parseInt(args[1],10)-1:null;this.terminal.setVTScrollRegion(scrollTop,scrollBottom);this.terminal.setCursorPosition(0,0);};/**
 * Restore DEC Private Mode Values.
 *
 * Will not implement.
 */hterm.VT.CSI['?r']=hterm.VT.ignore;/**
 * Change Attributes in Rectangular Area (DECCARA)
 *
 * Will not implement.
 */hterm.VT.CSI['$r']=hterm.VT.ignore;/**
 * Save cursor (ANSI.SYS)
 */hterm.VT.CSI['s']=function(){this.savedState_.save();};/**
 * Save DEC Private Mode Values.
 *
 * Will not implement.
 */hterm.VT.CSI['?s']=hterm.VT.ignore;/**
 * Window manipulation (from dtterm, as well as extensions).
 *
 * Will not implement.
 */hterm.VT.CSI['t']=hterm.VT.ignore;/**
 * Reverse Attributes in Rectangular Area (DECRARA).
 *
 * Will not implement.
 */hterm.VT.CSI['$t']=hterm.VT.ignore;/**
 * Set one or more features of the title modes.
 *
 * Will not implement.
 */hterm.VT.CSI['>t']=hterm.VT.ignore;/**
 * Set warning-bell volume (DECSWBV, VT520).
 *
 * Will not implement.
 */hterm.VT.CSI[' t']=hterm.VT.ignore;/**
 * Restore cursor (ANSI.SYS).
 */hterm.VT.CSI['u']=function(){this.savedState_.restore();};/**
 * Set margin-bell volume (DECSMBV, VT520).
 *
 * Will not implement.
 */hterm.VT.CSI[' u']=hterm.VT.ignore;/**
 * Copy Rectangular Area (DECCRA, VT400 and up).
 *
 * Will not implement.
 */hterm.VT.CSI['$v']=hterm.VT.ignore;/**
 * Enable Filter Rectangle (DECEFR).
 *
 * Will not implement.
 */hterm.VT.CSI['\'w']=hterm.VT.ignore;/**
 * Request Terminal Parameters (DECREQTPARM).
 *
 * Not currently implemented.
 */hterm.VT.CSI['x']=hterm.VT.ignore;/**
 * Select Attribute Change Extent (DECSACE).
 *
 * Will not implement.
 */hterm.VT.CSI['*x']=hterm.VT.ignore;/**
 * Fill Rectangular Area (DECFRA), VT420 and up.
 *
 * Will not implement.
 */hterm.VT.CSI['$x']=hterm.VT.ignore;/**
 * vt_tiledata (as used by NAOhack and UnNetHack)
 * (see https://nethackwiki.com/wiki/Vt_tiledata for more info)
 *
 * Implemented as far as we care (start a glyph and end a glyph).
 */hterm.VT.CSI['z']=function(parseState){if(parseState.args.length<1)return;var arg=parseState.args[0];if(arg==0){// Start a glyph (one parameter, the glyph number).
if(parseState.args.length<2)return;this.terminal.getTextAttributes().tileData=parseState.args[1];}else if(arg==1){// End a glyph.
this.terminal.getTextAttributes().tileData=null;}};/**
 * Enable Locator Reporting (DECELR).
 *
 * Not currently implemented.
 */hterm.VT.CSI['\'z']=hterm.VT.ignore;/**
 * Erase Rectangular Area (DECERA), VT400 and up.
 *
 * Will not implement.
 */hterm.VT.CSI['$z']=hterm.VT.ignore;/**
 * Select Locator Events (DECSLE).
 *
 * Not currently implemented.
 */hterm.VT.CSI['\'{']=hterm.VT.ignore;/**
 * Request Locator Position (DECRQLP).
 *
 * Not currently implemented.
 */hterm.VT.CSI['\'|']=hterm.VT.ignore;/**
 * Insert Columns (DECIC), VT420 and up.
 *
 * Will not implement.
 */hterm.VT.CSI['\'}']=hterm.VT.ignore;/**
 * Delete P s Columns (DECDC), VT420 and up.
 *
 * Will not implement.
 */hterm.VT.CSI['\'~']=hterm.VT.ignore;// SOURCE FILE: hterm/js/hterm_vt_character_map.js
// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';lib.rtdep('lib.f');/**
 * Character map object.
 *
 * Mapping from received to display character, used depending on the active
 * VT character set.
 *
 * GR maps are not currently supported.
 *
 * @param {string} description A human readable description of this map.
 * @param {Object} glmap The GL mapping from input to output characters.
 */hterm.VT.CharacterMap=function(description,glmap){/**
   * Short description for this character set, useful for debugging.
   */this.description=description;/**
   * The function to call to when this map is installed in GL.
   */this.GL=null;// Always keep an unmodified reference to the map.
// This allows us to sanely reset back to the original state.
this.glmapBase_=glmap;// Now sync the internal state as needed.
this.sync_();};/**
 * Internal helper for resyncing internal state.
 *
 * Used when the mappings change.
 *
 * @param {Object?} opt_glmap Additional mappings to overlay on top of the
 *     base mapping.
 */hterm.VT.CharacterMap.prototype.sync_=function(opt_glmap){var _this6=this;// If there are no maps, then reset the state back.
if(!this.glmapBase_&&!opt_glmap){this.GL=null;delete this.glmap_;delete this.glre_;return;}// Set the the GL mapping.  If we're given a custom mapping, then create a
// new object to hold the merged map.  This way we can cleanly reset back.
if(opt_glmap)this.glmap_=Object.assign({},this.glmapBase_,opt_glmap);else this.glmap_=this.glmapBase_;var glchars=Object.keys(this.glmap_).map(function(key){return'\\x'+lib.f.zpad(key.charCodeAt(0).toString(16));});this.glre_=new RegExp('['+glchars.join('')+']','g');this.GL=function(str){return str.replace(_this6.glre_,function(ch){return _this6.glmap_[ch];});};};/**
 * Reset map back to original mappings (discarding runtime updates).
 *
 * Specifically, any calls to setOverrides will be discarded.
 */hterm.VT.CharacterMap.prototype.reset=function(){// If we haven't been given a custom mapping, then there's nothing to reset.
if(this.glmap_!==this.glmapBase_)this.sync_();};/**
 * Merge custom changes to this map.
 *
 * The input map need not duplicate the existing mappings as it is merged with
 * the existing base map (what was created with).  Subsequent calls to this
 * will throw away previous override settings.
 *
 * @param {Object} glmap The custom map to override existing mappings.
 */hterm.VT.CharacterMap.prototype.setOverrides=function(glmap){this.sync_(glmap);};/**
 * Return a copy of this mapping.
 *
 * @return {hterm.VT.CharacterMap} A new hterm.VT.CharacterMap instance.
 */hterm.VT.CharacterMap.prototype.clone=function(){var map=new hterm.VT.CharacterMap(this.description,this.glmapBase_);if(this.glmap_!==this.glmapBase_)map.setOverrides(this.glmap_);return map;};/**
 * Table of character maps.
 */hterm.VT.CharacterMaps=function(){this.maps_=hterm.VT.CharacterMaps.DefaultMaps;// Always keep an unmodified reference to the map.
// This allows us to sanely reset back to the original state.
this.mapsBase_=this.maps_;};/**
 * Look up a previously registered map.
 *
 * @param {String} name The name of the map to lookup.
 * @return {hterm.VT.CharacterMap} The map, if it's been registered.
 */hterm.VT.CharacterMaps.prototype.getMap=function(name){if(this.maps_.hasOwnProperty(name))return this.maps_[name];else return undefined;};/**
 * Register a new map.
 *
 * Any previously registered maps by this name will be discarded.
 *
 * @param {String} name The name of the map.
 * @param {hterm.VT.CharacterMap} map The map to register.
 */hterm.VT.CharacterMaps.prototype.addMap=function(name,map){if(this.maps_===this.mapsBase_)this.maps_=Object.assign({},this.mapsBase_);this.maps_[name]=map;};/**
 * Reset the table and all its maps back to original state.
 */hterm.VT.CharacterMaps.prototype.reset=function(){if(this.maps_!==hterm.VT.CharacterMaps.DefaultMaps)this.maps_=hterm.VT.CharacterMaps.DefaultMaps;};/**
 * Merge custom changes to this table.
 *
 * @param {Object} maps A set of hterm.VT.CharacterMap objects.
 */hterm.VT.CharacterMaps.prototype.setOverrides=function(maps){if(this.maps_===this.mapsBase_)this.maps_=Object.assign({},this.mapsBase_);for(var name in maps){var map=this.getMap(name);if(map!==undefined){this.maps_[name]=map.clone();this.maps_[name].setOverrides(maps[name]);}else this.addMap(name,new hterm.VT.CharacterMap('user '+name,maps[name]));}};/**
 * The default set of supported character maps.
 */hterm.VT.CharacterMaps.DefaultMaps={};/**
 * VT100 Graphic character map.
 * http://vt100.net/docs/vt220-rm/table2-4.html
 */hterm.VT.CharacterMaps.DefaultMaps['0']=new hterm.VT.CharacterMap('graphic',{'\x60':'\u25C6',// ` -> diamond
'\x61':'\u2592',// a -> grey-box
'\x62':'\u2409',// b -> h/t
'\x63':'\u240C',// c -> f/f
'\x64':'\u240D',// d -> c/r
'\x65':'\u240A',// e -> l/f
'\x66':'\xB0',// f -> degree
'\x67':'\xB1',// g -> +/-
'\x68':'\u2424',// h -> n/l
'\x69':'\u240B',// i -> v/t
'\x6a':'\u2518',// j -> bottom-right
'\x6b':'\u2510',// k -> top-right
'\x6c':'\u250C',// l -> top-left
'\x6d':'\u2514',// m -> bottom-left
'\x6e':'\u253C',// n -> line-cross
'\x6f':'\u23BA',// o -> scan1
'\x70':'\u23BB',// p -> scan3
'\x71':'\u2500',// q -> scan5
'\x72':'\u23BC',// r -> scan7
'\x73':'\u23BD',// s -> scan9
'\x74':'\u251C',// t -> left-tee
'\x75':'\u2524',// u -> right-tee
'\x76':'\u2534',// v -> bottom-tee
'\x77':'\u252C',// w -> top-tee
'\x78':'\u2502',// x -> vertical-line
'\x79':'\u2264',// y -> less-equal
'\x7a':'\u2265',// z -> greater-equal
'\x7b':'\u03C0',// { -> pi
'\x7c':'\u2260',// | -> not-equal
'\x7d':'\xA3',// } -> british-pound
'\x7e':'\xB7'// ~ -> dot
});/**
 * British character map.
 * http://vt100.net/docs/vt220-rm/table2-5.html
 */hterm.VT.CharacterMaps.DefaultMaps['A']=new hterm.VT.CharacterMap('british',{'\x23':'\xA3'// # -> british-pound
});/**
 * US ASCII map, no changes.
 */hterm.VT.CharacterMaps.DefaultMaps['B']=new hterm.VT.CharacterMap('us',null);/**
 * Dutch character map.
 * http://vt100.net/docs/vt220-rm/table2-6.html
 */hterm.VT.CharacterMaps.DefaultMaps['4']=new hterm.VT.CharacterMap('dutch',{'\x23':'\xA3',// # -> british-pound
'\x40':'\xBE',// @ -> 3/4
'\x5b':'\u0132',// [ -> 'ij' ligature (xterm goes with \u00ff?)
'\x5c':'\xBD',// \ -> 1/2
'\x5d':'|',// ] -> vertical bar
'\x7b':'\xA8',// { -> two dots
'\x7c':'f',// | -> f
'\x7d':'\xBC',// } -> 1/4
'\x7e':'\xB4'// ~ -> acute
});/**
 * Finnish character map.
 * http://vt100.net/docs/vt220-rm/table2-7.html
 */hterm.VT.CharacterMaps.DefaultMaps['C']=hterm.VT.CharacterMaps.DefaultMaps['5']=new hterm.VT.CharacterMap('finnish',{'\x5b':'\xC4',// [ -> 'A' umlaut
'\x5c':'\xD6',// \ -> 'O' umlaut
'\x5d':'\xC5',// ] -> 'A' ring
'\x5e':'\xDC',// ~ -> 'u' umlaut
'\x60':'\xE9',// ` -> 'e' acute
'\x7b':'\xE4',// { -> 'a' umlaut
'\x7c':'\xF6',// | -> 'o' umlaut
'\x7d':'\xE5',// } -> 'a' ring
'\x7e':'\xFC'// ~ -> 'u' umlaut
});/**
 * French character map.
 * http://vt100.net/docs/vt220-rm/table2-8.html
 */hterm.VT.CharacterMaps.DefaultMaps['R']=new hterm.VT.CharacterMap('french',{'\x23':'\xA3',// # -> british-pound
'\x40':'\xE0',// @ -> 'a' grave
'\x5b':'\xB0',// [ -> ring
'\x5c':'\xE7',// \ -> 'c' cedilla
'\x5d':'\xA7',// ] -> section symbol (double s)
'\x7b':'\xE9',// { -> 'e' acute
'\x7c':'\xF9',// | -> 'u' grave
'\x7d':'\xE8',// } -> 'e' grave
'\x7e':'\xA8'// ~ -> umlaut
});/**
 * French Canadian character map.
 * http://vt100.net/docs/vt220-rm/table2-9.html
 */hterm.VT.CharacterMaps.DefaultMaps['Q']=new hterm.VT.CharacterMap('french canadian',{'\x40':'\xE0',// @ -> 'a' grave
'\x5b':'\xE2',// [ -> 'a' circumflex
'\x5c':'\xE7',// \ -> 'c' cedilla
'\x5d':'\xEA',// ] -> 'e' circumflex
'\x5e':'\xEE',// ^ -> 'i' circumflex
'\x60':'\xF4',// ` -> 'o' circumflex
'\x7b':'\xE9',// { -> 'e' acute
'\x7c':'\xF9',// | -> 'u' grave
'\x7d':'\xE8',// } -> 'e' grave
'\x7e':'\xFB'// ~ -> 'u' circumflex
});/**
 * German character map.
 * http://vt100.net/docs/vt220-rm/table2-10.html
 */hterm.VT.CharacterMaps.DefaultMaps['K']=new hterm.VT.CharacterMap('german',{'\x40':'\xA7',// @ -> section symbol (double s)
'\x5b':'\xC4',// [ -> 'A' umlaut
'\x5c':'\xD6',// \ -> 'O' umlaut
'\x5d':'\xDC',// ] -> 'U' umlaut
'\x7b':'\xE4',// { -> 'a' umlaut
'\x7c':'\xF6',// | -> 'o' umlaut
'\x7d':'\xFC',// } -> 'u' umlaut
'\x7e':'\xDF'// ~ -> eszett
});/**
 * Italian character map.
 * http://vt100.net/docs/vt220-rm/table2-11.html
 */hterm.VT.CharacterMaps.DefaultMaps['Y']=new hterm.VT.CharacterMap('italian',{'\x23':'\xA3',// # -> british-pound
'\x40':'\xA7',// @ -> section symbol (double s)
'\x5b':'\xB0',// [ -> ring
'\x5c':'\xE7',// \ -> 'c' cedilla
'\x5d':'\xE9',// ] -> 'e' acute
'\x60':'\xF9',// ` -> 'u' grave
'\x7b':'\xE0',// { -> 'a' grave
'\x7c':'\xF2',// | -> 'o' grave
'\x7d':'\xE8',// } -> 'e' grave
'\x7e':'\xEC'// ~ -> 'i' grave
});/**
 * Norwegian/Danish character map.
 * http://vt100.net/docs/vt220-rm/table2-12.html
 */hterm.VT.CharacterMaps.DefaultMaps['E']=hterm.VT.CharacterMaps.DefaultMaps['6']=new hterm.VT.CharacterMap('norwegian/danish',{'\x40':'\xC4',// @ -> 'A' umlaut
'\x5b':'\xC6',// [ -> 'AE' ligature
'\x5c':'\xD8',// \ -> 'O' stroke
'\x5d':'\xC5',// ] -> 'A' ring
'\x5e':'\xDC',// ^ -> 'U' umlaut
'\x60':'\xE4',// ` -> 'a' umlaut
'\x7b':'\xE6',// { -> 'ae' ligature
'\x7c':'\xF8',// | -> 'o' stroke
'\x7d':'\xE5',// } -> 'a' ring
'\x7e':'\xFC'// ~ -> 'u' umlaut
});/**
 * Spanish character map.
 * http://vt100.net/docs/vt220-rm/table2-13.html
 */hterm.VT.CharacterMaps.DefaultMaps['Z']=new hterm.VT.CharacterMap('spanish',{'\x23':'\xA3',// # -> british-pound
'\x40':'\xA7',// @ -> section symbol (double s)
'\x5b':'\xA1',// [ -> '!' inverted
'\x5c':'\xD1',// \ -> 'N' tilde
'\x5d':'\xBF',// ] -> '?' inverted
'\x7b':'\xB0',// { -> ring
'\x7c':'\xF1',// | -> 'n' tilde
'\x7d':'\xE7'// } -> 'c' cedilla
});/**
 * Swedish character map.
 * http://vt100.net/docs/vt220-rm/table2-14.html
 */hterm.VT.CharacterMaps.DefaultMaps['7']=hterm.VT.CharacterMaps.DefaultMaps['H']=new hterm.VT.CharacterMap('swedish',{'\x40':'\xC9',// @ -> 'E' acute
'\x5b':'\xC4',// [ -> 'A' umlaut
'\x5c':'\xD6',// \ -> 'O' umlaut
'\x5d':'\xC5',// ] -> 'A' ring
'\x5e':'\xDC',// ^ -> 'U' umlaut
'\x60':'\xE9',// ` -> 'e' acute
'\x7b':'\xE4',// { -> 'a' umlaut
'\x7c':'\xF6',// | -> 'o' umlaut
'\x7d':'\xE5',// } -> 'a' ring
'\x7e':'\xFC'// ~ -> 'u' umlaut
});/**
 * Swiss character map.
 * http://vt100.net/docs/vt220-rm/table2-15.html
 */hterm.VT.CharacterMaps.DefaultMaps['=']=new hterm.VT.CharacterMap('swiss',{'\x23':'\xF9',// # -> 'u' grave
'\x40':'\xE0',// @ -> 'a' grave
'\x5b':'\xE9',// [ -> 'e' acute
'\x5c':'\xE7',// \ -> 'c' cedilla
'\x5d':'\xEA',// ] -> 'e' circumflex
'\x5e':'\xEE',// ^ -> 'i' circumflex
'\x5f':'\xE8',// _ -> 'e' grave
'\x60':'\xF4',// ` -> 'o' circumflex
'\x7b':'\xE4',// { -> 'a' umlaut
'\x7c':'\xF6',// | -> 'o' umlaut
'\x7d':'\xFC',// } -> 'u' umlaut
'\x7e':'\xFB'// ~ -> 'u' circumflex
});lib.resource.add('hterm/audio/bell','audio/ogg;base64','T2dnUwACAAAAAAAAAADhqW5KAAAAAMFvEjYBHgF2b3JiaXMAAAAAAYC7AAAAAAAAAHcBAAAAAAC4'+'AU9nZ1MAAAAAAAAAAAAA4aluSgEAAAAAesI3EC3//////////////////8kDdm9yYmlzHQAAAFhp'+'cGguT3JnIGxpYlZvcmJpcyBJIDIwMDkwNzA5AAAAAAEFdm9yYmlzKUJDVgEACAAAADFMIMWA0JBV'+'AAAQAABgJCkOk2ZJKaWUoSh5mJRISSmllMUwiZiUicUYY4wxxhhjjDHGGGOMIDRkFQAABACAKAmO'+'o+ZJas45ZxgnjnKgOWlOOKcgB4pR4DkJwvUmY26mtKZrbs4pJQgNWQUAAAIAQEghhRRSSCGFFGKI'+'IYYYYoghhxxyyCGnnHIKKqigggoyyCCDTDLppJNOOumoo4466ii00EILLbTSSkwx1VZjrr0GXXxz'+'zjnnnHPOOeecc84JQkNWAQAgAAAEQgYZZBBCCCGFFFKIKaaYcgoyyIDQkFUAACAAgAAAAABHkRRJ'+'sRTLsRzN0SRP8ixREzXRM0VTVE1VVVVVdV1XdmXXdnXXdn1ZmIVbuH1ZuIVb2IVd94VhGIZhGIZh'+'GIZh+H3f933f930gNGQVACABAKAjOZbjKaIiGqLiOaIDhIasAgBkAAAEACAJkiIpkqNJpmZqrmmb'+'tmirtm3LsizLsgyEhqwCAAABAAQAAAAAAKBpmqZpmqZpmqZpmqZpmqZpmqZpmmZZlmVZlmVZlmVZ'+'lmVZlmVZlmVZlmVZlmVZlmVZlmVZlmVZlmVZQGjIKgBAAgBAx3Ecx3EkRVIkx3IsBwgNWQUAyAAA'+'CABAUizFcjRHczTHczzHczxHdETJlEzN9EwPCA1ZBQAAAgAIAAAAAABAMRzFcRzJ0SRPUi3TcjVX'+'cz3Xc03XdV1XVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYHQkFUAAAQAACGdZpZq'+'gAgzkGEgNGQVAIAAAAAYoQhDDAgNWQUAAAQAAIih5CCa0JrzzTkOmuWgqRSb08GJVJsnuamYm3PO'+'OeecbM4Z45xzzinKmcWgmdCac85JDJqloJnQmnPOeRKbB62p0ppzzhnnnA7GGWGcc85p0poHqdlY'+'m3POWdCa5qi5FJtzzomUmye1uVSbc84555xzzjnnnHPOqV6czsE54Zxzzonam2u5CV2cc875ZJzu'+'zQnhnHPOOeecc84555xzzglCQ1YBAEAAAARh2BjGnYIgfY4GYhQhpiGTHnSPDpOgMcgppB6NjkZK'+'qYNQUhknpXSC0JBVAAAgAACEEFJIIYUUUkghhRRSSCGGGGKIIaeccgoqqKSSiirKKLPMMssss8wy'+'y6zDzjrrsMMQQwwxtNJKLDXVVmONteaec645SGultdZaK6WUUkoppSA0ZBUAAAIAQCBkkEEGGYUU'+'UkghhphyyimnoIIKCA1ZBQAAAgAIAAAA8CTPER3RER3RER3RER3RER3P8RxREiVREiXRMi1TMz1V'+'VFVXdm1Zl3Xbt4Vd2HXf133f141fF4ZlWZZlWZZlWZZlWZZlWZZlCUJDVgEAIAAAAEIIIYQUUkgh'+'hZRijDHHnINOQgmB0JBVAAAgAIAAAAAAR3EUx5EcyZEkS7IkTdIszfI0T/M00RNFUTRNUxVd0RV1'+'0xZlUzZd0zVl01Vl1XZl2bZlW7d9WbZ93/d93/d93/d93/d939d1IDRkFQAgAQCgIzmSIimSIjmO'+'40iSBISGrAIAZAAABACgKI7iOI4jSZIkWZImeZZniZqpmZ7pqaIKhIasAgAAAQAEAAAAAACgaIqn'+'mIqniIrniI4oiZZpiZqquaJsyq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7rukBo'+'yCoAQAIAQEdyJEdyJEVSJEVyJAcIDVkFAMgAAAgAwDEcQ1Ikx7IsTfM0T/M00RM90TM9VXRFFwgN'+'WQUAAAIACAAAAAAAwJAMS7EczdEkUVIt1VI11VItVVQ9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'+'VVVVVVVVVVVV1TRN0zSB0JCVAAAZAAAjQQYZhBCKcpBCbj1YCDHmJAWhOQahxBiEpxAzDDkNInSQ'+'QSc9uJI5wwzz4FIoFURMg40lN44gDcKmXEnlOAhCQ1YEAFEAAIAxyDHEGHLOScmgRM4xCZ2UyDkn'+'pZPSSSktlhgzKSWmEmPjnKPSScmklBhLip2kEmOJrQAAgAAHAIAAC6HQkBUBQBQAAGIMUgophZRS'+'zinmkFLKMeUcUko5p5xTzjkIHYTKMQadgxAppRxTzinHHITMQeWcg9BBKAAAIMABACDAQig0ZEUA'+'ECcA4HAkz5M0SxQlSxNFzxRl1xNN15U0zTQ1UVRVyxNV1VRV2xZNVbYlTRNNTfRUVRNFVRVV05ZN'+'VbVtzzRl2VRV3RZV1bZl2xZ+V5Z13zNNWRZV1dZNVbV115Z9X9ZtXZg0zTQ1UVRVTRRV1VRV2zZV'+'17Y1UXRVUVVlWVRVWXZlWfdVV9Z9SxRV1VNN2RVVVbZV2fVtVZZ94XRVXVdl2fdVWRZ+W9eF4fZ9'+'4RhV1dZN19V1VZZ9YdZlYbd13yhpmmlqoqiqmiiqqqmqtm2qrq1bouiqoqrKsmeqrqzKsq+rrmzr'+'miiqrqiqsiyqqiyrsqz7qizrtqiquq3KsrCbrqvrtu8LwyzrunCqrq6rsuz7qizruq3rxnHrujB8'+'pinLpqvquqm6um7runHMtm0co6rqvirLwrDKsu/rui+0dSFRVXXdlF3jV2VZ921fd55b94WybTu/'+'rfvKceu60vg5z28cubZtHLNuG7+t+8bzKz9hOI6lZ5q2baqqrZuqq+uybivDrOtCUVV9XZVl3zdd'+'WRdu3zeOW9eNoqrquirLvrDKsjHcxm8cuzAcXds2jlvXnbKtC31jyPcJz2vbxnH7OuP2daOvDAnH'+'jwAAgAEHAIAAE8pAoSErAoA4AQAGIecUUxAqxSB0EFLqIKRUMQYhc05KxRyUUEpqIZTUKsYgVI5J'+'yJyTEkpoKZTSUgehpVBKa6GU1lJrsabUYu0gpBZKaS2U0lpqqcbUWowRYxAy56RkzkkJpbQWSmkt'+'c05K56CkDkJKpaQUS0otVsxJyaCj0kFIqaQSU0mptVBKa6WkFktKMbYUW24x1hxKaS2kEltJKcYU'+'U20txpojxiBkzknJnJMSSmktlNJa5ZiUDkJKmYOSSkqtlZJSzJyT0kFIqYOOSkkptpJKTKGU1kpK'+'sYVSWmwx1pxSbDWU0lpJKcaSSmwtxlpbTLV1EFoLpbQWSmmttVZraq3GUEprJaUYS0qxtRZrbjHm'+'GkppraQSW0mpxRZbji3GmlNrNabWam4x5hpbbT3WmnNKrdbUUo0txppjbb3VmnvvIKQWSmktlNJi'+'ai3G1mKtoZTWSiqxlZJabDHm2lqMOZTSYkmpxZJSjC3GmltsuaaWamwx5ppSi7Xm2nNsNfbUWqwt'+'xppTS7XWWnOPufVWAADAgAMAQIAJZaDQkJUAQBQAAEGIUs5JaRByzDkqCULMOSepckxCKSlVzEEI'+'JbXOOSkpxdY5CCWlFksqLcVWaykptRZrLQAAoMABACDABk2JxQEKDVkJAEQBACDGIMQYhAYZpRiD'+'0BikFGMQIqUYc05KpRRjzknJGHMOQioZY85BKCmEUEoqKYUQSkklpQIAAAocAAACbNCUWByg0JAV'+'AUAUAABgDGIMMYYgdFQyKhGETEonqYEQWgutddZSa6XFzFpqrbTYQAithdYySyXG1FpmrcSYWisA'+'AOzAAQDswEIoNGQlAJAHAEAYoxRjzjlnEGLMOegcNAgx5hyEDirGnIMOQggVY85BCCGEzDkIIYQQ'+'QuYchBBCCKGDEEIIpZTSQQghhFJK6SCEEEIppXQQQgihlFIKAAAqcAAACLBRZHOCkaBCQ1YCAHkA'+'AIAxSjkHoZRGKcYglJJSoxRjEEpJqXIMQikpxVY5B6GUlFrsIJTSWmw1dhBKaS3GWkNKrcVYa64h'+'pdZirDXX1FqMteaaa0otxlprzbkAANwFBwCwAxtFNicYCSo0ZCUAkAcAgCCkFGOMMYYUYoox55xD'+'CCnFmHPOKaYYc84555RijDnnnHOMMeecc845xphzzjnnHHPOOeecc44555xzzjnnnHPOOeecc845'+'55xzzgkAACpwAAAIsFFkc4KRoEJDVgIAqQAAABFWYowxxhgbCDHGGGOMMUYSYowxxhhjbDHGGGOM'+'McaYYowxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHG'+'GFtrrbXWWmuttdZaa6211lprrQBAvwoHAP8HG1ZHOCkaCyw0ZCUAEA4AABjDmHOOOQYdhIYp6KSE'+'DkIIoUNKOSglhFBKKSlzTkpKpaSUWkqZc1JSKiWlllLqIKTUWkottdZaByWl1lJqrbXWOgiltNRa'+'a6212EFIKaXWWostxlBKSq212GKMNYZSUmqtxdhirDGk0lJsLcYYY6yhlNZaazHGGGstKbXWYoy1'+'xlprSam11mKLNdZaCwDgbnAAgEiwcYaVpLPC0eBCQ1YCACEBAARCjDnnnHMQQgghUoox56CDEEII'+'IURKMeYcdBBCCCGEjDHnoIMQQgghhJAx5hx0EEIIIYQQOucchBBCCKGEUkrnHHQQQgghlFBC6SCE'+'EEIIoYRSSikdhBBCKKGEUkopJYQQQgmllFJKKaWEEEIIoYQSSimllBBCCKWUUkoppZQSQgghlFJK'+'KaWUUkIIoZRQSimllFJKCCGEUkoppZRSSgkhhFBKKaWUUkopIYQSSimllFJKKaUAAIADBwCAACPo'+'JKPKImw04cIDUGjISgCADAAAcdhq6ynWyCDFnISWS4SQchBiLhFSijlHsWVIGcUY1ZQxpRRTUmvo'+'nGKMUU+dY0oxw6yUVkookYLScqy1dswBAAAgCAAwECEzgUABFBjIAIADhAQpAKCwwNAxXAQE5BIy'+'CgwKx4Rz0mkDABCEyAyRiFgMEhOqgaJiOgBYXGDIB4AMjY20iwvoMsAFXdx1IIQgBCGIxQEUkICD'+'E2544g1PuMEJOkWlDgIAAAAA4AAAHgAAkg0gIiKaOY4Ojw+QEJERkhKTE5QAAAAAALABgA8AgCQF'+'iIiIZo6jw+MDJERkhKTE5AQlAAAAAAAAAAAACAgIAAAAAAAEAAAACAhPZ2dTAAQYOwAAAAAAAOGp'+'bkoCAAAAmc74DRgyNjM69TAzOTk74dnLubewsbagmZiNp4d0KbsExSY/I3XUTwJgkeZdn1HY4zoj'+'33/q9DFtv3Ui1/jmx7lCUtPt18/sYf9MkgAsAGRBd3gMGP4sU+qCPYBy9VrA3YqJosW3W2/ef1iO'+'/u3cg8ZG/57jU+pPmbGEJUgkfnaI39DbPqxddZphbMRmCc5rKlkUMkyx8iIoug5dJv1OYH9a59c+'+'3Gevqc7Z2XFdDjL/qHztRfjWEWxJ/aiGezjohu9HsCZdQBKbiH0VtU/3m85lDG2T/+xkZcYnX+E+'+'aqzv/xTgOoTFG+x7SNqQ4N+oAABSxuVXw77Jd5bmmTmuJakX7509HH0kGYKvARPpwfOSAPySPAc2'+'EkneDwB2HwAAJlQDYK5586N79GJCjx4+p6aDUd27XSvRyXLJkIC5YZ1jLv5lpOhZTz0s+DmnF1di'+'ptrnM6UDgIW11Xh8cHTd0/SmbgOAdxcyWwMAAGIrZ3fNSfZbzKiYrK4+tPqtnMVLOeWOG2kVvUY+'+'p2PJ/hkCl5aFRO4TLGYPZcIU3vYM1hohS4jHFlnyW/2T5J7kGsShXWT8N05V+3C/GPqJ1QdWisGP'+'xEzHqXISBPIinWDUt7IeJv/f5OtzBxpTzZZQ+CYEhHXfqG4aABQli72GJhN4oJv+hXcApAJSErAW'+'8G2raAX4NUcABnVt77CzZAB+LsHcVe+Q4h+QB1wh/ZrJTPxSBdI8mgTeAdTsQOoFUEng9BHcVPhx'+'SRRYkKWZJXOFYP6V4AEripJoEjXgA2wJRZHSExmJDm8F0A6gEXsg5a4ZsALItrMB7+fh7UKLvYWS'+'dtsDwFf1mzYzS1F82N1h2Oyt2e76B1QdS0SAsQigLPMOgJS9JRC7hFXA6kUsLFNKD5cA5cTRvgSq'+'Pc3Fl99xW3QTi/MHR8DEm6WnvaVQATwRqRKjywQ9BrrhugR2AKTsPQeQckrAOgDOhbTESyrXQ50C'+'kNpXdtWjW7W2/3UjeX3U95gIdalfRAoAmqUEiwp53hCdcCwlg47fcbfzlmQMAgaBkh7c+fcDgF+i'+'fwDXfzegLPcLYJsAAJQArTXjnh/uXGy3v1Hk3pV6/3t5ruW81f6prfbM2Q3WNVy98BwUtbCwhFhA'+'WuPev6Oe/4ZaFQUcgKrVs4defzh1TADA1DEh5b3VlDaECw5b+bPfkKos3tIAue3vJZOih3ga3l6O'+'3PSfIkrLv0PAS86PPdL7g8oc2KteNFKKzKRehOv2gJoFLBPXmaXvPBQILgJon0bbWBszrYZYYwE7'+'jl2j+vTdU7Vpk21LiU0QajPkywAAHqbUC0/YsYOdb4e6BOp7E0cCi04Ao/TgD8ZVAMid6h/A8IeB'+'Nkp6/xsAACZELEYIk+yvI6Qz1NN6lIftB/6IMWjWJNOqPTMedAmyaj6Es0QBklJpiSWWHnQ2CoYb'+'GWAmt+0gLQBFKCBnp2QUUQZ/1thtZDBJUpFWY82z34ocorB62oX7qB5y0oPAv/foxH25wVmgIHf2'+'xFOr8leZcBq1Kx3ZvCq9Bga639AxuHuPNL/71YCF4EywJpqHFAX6XF0sjVbuANnvvdLcrufYwOM/'+'iDa6iA468AYAAB6mNBMXcgTD8HSRqJ4vw8CjAlCEPACASlX/APwPOJKl9xQAAAPmnev2eWp33Xgy'+'w3Dvfz6myGk3oyP8YTKsCOvzAgALQi0o1c6Nzs2O2Pg2h4ACIJAgAGP0aNn5x0BDgVfH7u2TtyfD'+'cRIuYAyQhBF/lvSRAttgA6TPbWZA9gaUrZWAUEAA+Dx47Q3/r87HxUUqZmB0BmUuMlojFjHt1gDu'+'nnvuX8MImsjSq5WkzSzGS62OEIlOufWWezxWpv6FBgDgJVltfXFYtNAAnqU0xQoD0YLiXo5cF5QV'+'4CnY1tBLAkZCOABAhbk/AM+/AwSCCdlWAAAMcFjS7owb8GVDzveDiZvznbt2tF4bL5odN1YKl88T'+'AEABCZvufq9YCTBtMwVAQUEAwGtNltzSaHvADYC3TxLVjqiRA+OZAMhzcqEgRcAOwoCgvdTxsTHL'+'QEF6+oOb2+PAI8ciPQcXg7pOY+LjxQSv2fjmFuj34gGwz310/bGK6z3xgT887eomWULEaDd04wHe'+'tYxdjcgV2SxvSwn0VoZXJRqkRC5ASQ/muVoAUsX7AgAQMBNaVwAAlABRxT/1PmfqLqSRNDbhXb07'+'berpB3b94jpuWEZjBCD2OcdXFpCKEgCDfcFPMw8AAADUwT4lnUm50lmwrpMMhPQIKj6u0E8fr2vG'+'BngMNdIlrZsigjahljud6AFVg+tzXwUnXL3TJLpajaWKA4VAAAAMiFfqJgKAZ08XrtS3dxtQNYcp'+'PvYEG8ClvrQRJgBephwnNWJjtGqmp6VEPSvBe7EBiU3qgJbQAwD4Le8LAMDMhHbNAAAlgK+tFs5O'+'+YyJc9yCnJa3rxLPulGnxwsXV9Fsk2k4PisCAHC8FkwbGE9gJQAAoMnyksj0CdFMZLLgoz8M+Fxz'+'iwYBgIx+zHiCBAKAlBKNpF1sO9JpVcyEi9ar15YlHgrut5fPJnkdJ6vEwZPyAHQBIEDUrlMcBAAd'+'2KAS0Qq+JwRsE4AJZtMnAD6GnOYwYlOIZvtzUNdjreB7fiMkWI0CmBB6AIAKc38A9osEFlTSGECB'+'+cbeRDC0aRpLHqNPplcK/76Lxn2rpmqyXsYJWRi/FQAAAKBQk9MCAOibrQBQADCDsqpooPutd+05'+'Ce9g6iEdiYXgVmQAI4+4wskEBEiBloNQ6Ki0/KTQ0QjWfjxzi+AeuXKoMjEVfQOZzr0y941qLgM2'+'AExvbZOqcxZ6J6krlrj4y2j9AdgKDx6GnJsVLhbc42uq584+ouSdNBpoCiCVHrz+WzUA/DDtD8AT'+'gA3h0lMCAAzcFv+S+fSSNkeYWlTpb34mf2RfmqqJeMeklhHAfu7VoAEACgAApKRktL+KkQDWMwYC'+'UAAAAHCKsp80xhp91UjqQBw3x45cetqkjQEyu3G9B6N+R650Uq8OVig7wOm6Wun0ea4lKDPoabJs'+'6aLqgbhPzpv4KR4iODilw88ZpY7q1IOMcbASAOAVtmcCnobcrkG4KGS7/ZnskVWRNF9J0RUHKOnB'+'yy9WA8Dv6L4AAARMCQUA4GritfVM2lcZfH3Q3T/vZ47J2YHhcmBazjfdyuV25gLAzrc0cwAAAAAY'+'Ch6PdwAAAGyWjFW4yScjaWa2mGcofHxWxewKALglWBpLUvwwk+UOh5eNGyUOs1/EF+pZr+ud5Ozo'+'GwYdAABg2p52LiSgAY/ZVlOmilEgHn6G3OcwYjzI7vOj1t6xsx4S3lBY96EUQBF6AIBAmPYH4PoG'+'YCoJAADWe+OZJZi7/x76/yH7Lzf9M5XzRKnFPmveMsilQHwVAAAAAKB3LQD8PCIAAADga0QujBLy'+'wzeJ4a6Z/ERVBAUlAEDqvoM7BQBAuAguzFqILtmjH3Kd4wfKobnOhA3z85qWoRPm9hwoOHoDAAlC'+'bwDAA56FHAuXflHo3fe2ttG9XUDeA9YmYCBQ0oPr/1QC8IvuCwAAApbUAQCK22MmE3O78VAbHQT9'+'PIPNoT9zNc3l2Oe7TAVLANBufT8MAQAAAGzT4PS8AQAAoELGHb2uaCwwEv1EWhFriUkbAaAZ27/f'+'VZnTZXbWz3BwWpjUaMZKRj7dZ0J//gUeTdpVEwAAZOFsNxKAjQSgA+ABPoY8Jj5y2wje81jsXc/1'+'TOQWTDYZBmAkNDiqVwuA2NJ9AQAAEBKAt9Vrsfs/2N19MO91S9rd8EHTZHnzC5MYmfQEACy/FBcA'+'AADA5c4gi4z8RANs/m6FNXVo9DV46JG1BBDukqlw/Va5G7QbuGVSI+2aZaoLXJrdVj2zlC9Z5QEA'+'EFz/5QzgVZwAAAAA/oXcxyC6WfTu+09Ve/c766J4VTAGUFmA51+VANKi/QPoPwYgYAkA715OH4S0'+'s5KDHvj99MMq8TPFc3roKZnGOoT1bmIhVgc7XAMBAAAAAMAW1VbQw3gapzOpJd+Kd2fc4iSO62fJ'+'v9+movui1wUNPAj059N3OVxzk4gV73PmE8FIA2F5mRq37Evc76vLXfF4rD5UJJAw46hW6LZCb5sN'+'Ldx+kzMCAAB+hfy95+965ZCLP7B3/VlTHCvDEKtQhTm4KiCgAEAbrfbWTPssAAAAXpee1tVrozYY'+'n41wD1aeYtkKfswN5/SXPO0JDnhO/4laUortv/s412fybe/nONdncoCHnBVliu0CQGBWlPY/5Kwo'+'m2L/kruPM6Q7oz4tvDQy+bZ3HzOi+gNHA4DZEgA='+'');lib.resource.add('hterm/images/icon-96','image/png;base64','iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABGdBTUEAALGPC/xhBQAAAAFzUkdC'+'AK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dE'+'AP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAFKhJREFUeNrtXXlsXMd5/30z8649uDzE'+'mxRFibIsOXZ8VInTJFYSW3actE1ctWkctEF6I0VRFEWAoihQoAjQFmiBogWaIEADFCmQXklto04T'+'O0ndWI4bxZalWHJinTYtkRJFkctzl9zd977+8c49+UjuipbCD1y+9+ae75vvmJlv3gO2YRu2YRu2'+'YRu2YUuAtroBN3nfeKsaSXWurarvRvUrTnlccV/5a3lDReRKFdc4Za6nzvW2b7OIpwZh7N37iHYi'+'Pztyvy4iqA00Tng/WXH1f3GQsFki0Qbz+cAV12jeRkTwwUd2yfsVI89OjbLrwnoJILw8EoAOIAFg'+'LwDTCxcAJBEJIiIAgoiICAIgIgIBJGpdPRCRq3sPCBAJAii8QgAk/PIFkSBBQvh3QRkQXtECBKpx'+'H9br5hMikhcg4QV4dYkgARFBSkmlUmnp7LmLX8rl8q95OPKJ0DQCkPeTEcQrAD179+7+7LsP3vtJ'+'w9A1ZvbwFfQM/r1/AyD64KLBv5JHIaIwIpI5GIbevd82r0I3OMjvJfOo5ffCqw1EhIRlQQi3a37p'+'0atfTVB22PhIuHt95tnnBr75zHN/AGASoYjyxVVTCOCPfOWN9sGfue+df/L4r3z8MSGUOv3aWYDI'+'q43BEXXEQRPCQK5qFleFMdduOwMV3WKUBXFVyVXhtm3jrjtvw13vuL1uPXGAAUghkGlLPXJ9ZvZz'+'L738oz8HsOhFF2u3aH0E8JEvAWhe+n2PHD70Z7/xmccfLBSK9M1nX0AqnYFSKiB7fIiOzg3k21Be'+'YHW1gMkr1/DBB+6HkGLTxmRfbxf9+qc/8WszM9lzF99468twxZCAq5wbQiMCREWPBkDXde3eI489'+'+he/+1u/et/c3AK+/uSzyLTvgK7rm+tBE4CZA1HRaFT7oqNQKCCdsqBp61GD9eHBD77XunJ16o/+'+'6q+/cLJYLP2fhzfGGkRYiwBRK2fnL/3iRz7/uT/8nfuuz2Txla8+hXRbJ6QUKBaLuJmgVLJRKuSh'+'lIBpatiEFApACIFHH/lA//NHj33qe0ePvQJXEa/JnHEIoABYd925/zOPf+JjBxMJC//yxX+GYaZg'+'GAZse00ue1uByyWMQrGEldVVKCWbQgAA6OnegQP7997zvaPH2gGsIpQidWuoRwA/o2/bDz70off+'+'nFIa/fczz2Pq2hzSbRksLCxsNT43BI7jYCW/ihd/cBKWZTZhQcFV9qMjQ0gmEwm4hkqsOVEjDogq'+'37bOjvaElBKLizmYVgKWZW01HjeOLGaAbUipoJTWHAKwa4KYpmHCJUB0lQCoU0scK0gCMJRSqqOj'+'Hel0EqZpIpFIbDUeNwwOM2y7gO4dnWhrSzVFBDEzMpkULNM04BIgFsS1ggxNUzKVSiCRsEBEUEoF'+'iRq2v5HNXjMd18pSHVeZnuuniZaopIIQBAIhnUqgvb1tU3OBKFiWCdMydABWBH+bIoCvA3RNU9Ky'+'DOiahG2XAAAzszO4NHkZINcKALuddRHi3VWFReLcWy8dhxO5aFpvkhamD5HFwQQuStgwLPpsOza4'+'5GD/yD4MDw2jVCrCMHSkUwmws3kCMADD0GCZpialMG3bia4trVsJ+xkJAKSUStM0oWsSQrgTGdu2'+'MXllEmezF/HRhz+C4b6hyEgrnyjVLLzhcho1iFsDiGomOzt+Ds/8z7PIzmfR39eP1dVVSOEijR0n'+'RsFrg1ISpmkoQ9cTufxKrBbHmoUoJZWmlPDXRZgdMDNsx8HuXbtx3zvvhRQKTdFmLQACoT2dwY9e'+'fRWlvA1m1xJy2IEggkPrnUvXB9M0lGkaiVx+xR/ADQuPRQAppaY0JfzOBB0joFAs4Oyb59E0Y7pF'+'4DDDdmw47LgygQHbbs7Ij4JpGMIwjGRFcF0xFJcDdE0pUb3YQ1hYWsDFSxff7vgHMyO3kkMGiaAP'+'zScAwzB0YVlmAuHo3zQHkKaUppTHAUQBLQnAYm4J41feCldAGeHe2FaCq9fdXQMP8qt5sB6OlGbP'+'4pkBwzBgGHoKMdcIG82Ew0RK6UqTxHAJEHSBCLmVHCavXwUcwGpXMJIS2YnVhrq01cAOQxkC7YMG'+'5i6vwi65LV4trIK10GJyHLvpTTR0DZZlJtEEMxR+IVJJTSlFAFdZL47joFgswrEZ3X06Dv3eAH78'+'7Vm8/t0s8nMld9PjBhHCN1G7dlm490g3rIzCt/5yHIWiA5dxGQ5HOcBpatuYGZquwTSNTXMAogVo'+'SukuAXwlzFUpSRCyl1cx+VoOBz/Zi93vyeDE16bx1iuLsIsOSLSWCuwwEh0a9h/uxDs+2gWnxDj+'+'79dQKjhlg4bZl/vkiaDmtkvXNFimmURMJ4VYOkBpSldSug91TDYiIDdXwtEvTeDNlxZw3y/34PDn'+'duLCi/M4+eQ0Zt5cCdI1G/FKFxg5mME9R7rRMWTi/AtzOPnENLKXV2tyrA+lFqzkKk3BNI0k3BWE'+'5swDXA7wlm0bFEkEODbjzWPzmDqTw4HDnbjz57swdHcKp56+jte/k0VurtRUInSPJXD3Y90YfXcb'+'Zt7I49t/M45LJ5ZgF7lMAbsN9BfiXE5uthXEzFBK+TpAhrVunAAEeEp4DQ4oyyQI+fkSjn/tGsZf'+'WcA9j3Xjvk/0Yte72vD8FyZw/Y2VauRsAA483ImDn+oF28DL/zqFn3wni/xcESSoTvkExxdBBNil'+'FnCAlLBMM+Hhdk3HtThoIE1TulTuDlscAgAuNxCA6XN5HP+Pa8heWsHAgSQyA0ZzFr8IGHhHCuke'+'HedfmMOpb8wgly021jXkTsjYm9C0YjNJSgFvHuAP7qbMA3TpcwAo1ooDOwwjKTH2QDvu/lg3lCnw'+'g69cxcSpJc8dZJPgACeeuAYhgf0Pd6JjyMArX5/GlZ8sg23U5TCf+ESt0QFCCFiWYcF131kT4lhB'+'pDSXAMy+Eq1PAXYAIYHBu9O490g3evclMf7yAk785zSuX8i7Y68ZOoCA6xdW8N2/u4TRd2dw75Fu'+'PPqnu3Dmu7N49RszWLiyGvgGRfM47HjNdzmg6U6kRLAs02wGAXwieBwgggoaMUD7oI67fmEHbjvU'+'gfmrBTz395fw5ksLKK26pmgzO0wCsFcZ576XxeTpZdzxaCfu+HAXRg624eST0zh/dB6FXDjK3TUg'+'VwQREUot0AFCEEx3U8ZoBgEAVwdoUnheFnWGLztA1y4Tj/zxCIyUwI+emsaPn5nF8qyvFFs0D/C8'+'05Zni3jpq1MY/+EC7jnSg/f+5gB69yXw/BcnYBfDIeMrYaLW6ACAYFmmjpi7YqpmCRWMq2maLgIO'+'qFcUQ7MErp5ZxqmnZ0Jx0+IJWNBIr5qpszl852/fwp73ZNC3PwmhKCQAUWCGAu5MuNlriEQEy6za'+'FauLhHg6QClNejte9YQICcL1i3k8/4UJd/bZZHETGwGCYK8yzjw3h4vHFmAXym19dxfNE0Etcqkx'+'TVPTdd0qFApRPNaEtcxQAiA0TelCeKvRDTSoXWTYJb5ho75Rq0kApbwDrphrOREd0Ip5AOBuyhiG'+'HsttpB4BohiUmqZpgel4Mx1qournYCbcUg4wpLccUasVZVCLAJUZhKaUTp5hvTWCpXnAcEIOsG00'+'fxuVYRq6MA3dX5JuCGt5xhEAqWkq4IC4M+GYbV0/bLJ6h92dmlaJIG9ThkyzbE9gQ0rYB6lpSgUc'+'0CT8C0nQzPUvCDk2o7iysUU0gmsFcSCCnJZspeq6BtPUk3HSxrGChKZpmu/U2gwKsMPo2Z/E+397'+'AELFL48EMHFqGd//x0k49gYwR+VWUGvmAQxD12GZZgox1tpiuSa6HOCJIJ8umxo5hELOxvSFPEiu'+'IxcR5idXNzVqqwnQXBZghr8r5m/KbHgxzs+oNE1T/sBvhggiAcyOr+B//+FyUzsfD0ERM7RFIkjT'+'gj2BNTmgnhUUXcd2N4SpBUp4C6DVHABmaEr5+8L+rtiGlTADUK4I8kJ8XeDDes/KAw37zPUSrYUn'+'5tpJOJqE4ThOSACn+RzAAKSU/p7AmgI2phWkyeB4ZqQiAsFZtkFOZI+Ao7SgytVgeJoQVBkf+HRG'+'rxVhVBFGqHj24imSP3psFUAylYCSEsWSDdu2y86WNQukuytmIdwVq3tSJo5zrtI0JUMjiAJzbrB/'+'AA8YRnCWNnLON3JuFyEiIj8AZen9Vc0wL0JkRtMgGlfjDHBwDSLKzwp7dRZL+aYivZwAApZlWnAP'+'t0TxuSYBKocCA1BKUxIgMBy0taUAOCiVikilUkin0/FbFnEz3xxQLGMg6rpemX9paQm37x2DlLLM'+'U6IZIITwOUCraEAVERotR4ccoDQJAI7DGBrsx8MP3o+nv/V9dHf3BAc1IjguO00d+OpHffYrw5ir'+'09WMi5wd4PC8QLDHXHGmIHr1G8dgsOOgoyOJB973LjR/KSLYFYtuymxYCZOUUtM8z2i/w48cPgTT'+'MPDD46eQX1mG768Smqq+qAFEROwIQSASZVdBAiQIQggI8q7+c/AjSCEgZBgm/TgZ3stovKy4Rsqz'+'LBMjOweRSiXhNOFwRi0CmJbhE2BTm/KspNQ0pcrMVaUkDj/0fnzg0P0olkqhs+4a71xoeA0LKCur'+'Irhmf2rJzca9cl0Um3U0qZoAqNwV25AS9pEdnA2IguM4kFLC95bYLPiiJYIjtEI83BggWKapCSEs'+'x3E2txinlPJOx9z8k7AbBUTBSRkrl8tv+GUdDIClksphFsvL+ZacKLn1gL3V0DICrOuQXvSohUNE'+'2rnz41QqcdPNtVsRGEBbOgnbdkjTVKUZWgWqRn4fHABOoVBcNE2ztHPnoL7NAfHANHS8dPzE0sxM'+'dsILqvsGrXocEGRYXFx67fUz5y729e7Yw4ADjumb2AJoWq2xCtrwdh0TQRz74YmLpZI9HitHjTCC'+'a0KZANKGoX88lUo+pCmlhBASYMmAjE76Ea4CoNyerDYuUZHRXwiq2Pan8r/yNkcMAiqvv+pwFFWm'+'pQqbl6isaqoVVtajsJfB0piXwCEidhyHp6/PHpudnfs8gDm4b07xX+xXBnEW43jv2Ojo73/20x+e'+'zc47Fy6MN/IOXZ+ZxBvIE6eeCovbn0FXzjXqt4urEsVlGsPQ8NFHP0RP/dez4sv/9G8ZuK8wq2uK'+'xtkRs+44cNs7e3t61NEXXwVIVUye1o+f+nnXsT1ZlrwiH9dKjLp+TZVhoRNy/Jb5PrPjlyfAzDiw'+'f28vgD4AV+AuS5dq5au3FuS/I0IB6B3bM7L7wsW3IJSBjvb2ls0gb3YgIiym0hi/NImB/p5Mpi09'+'Or+weBqu+CliHYtx/ruCpGWZu3cOD/Sceu08ioUiFhcX12rHTy0QEXTdwKVLV7B/326tt3fHnvmF'+'RQMu8v03aAERIjTyC5IAtJGdg/s7OjLmbHYBXV29TVt6uFVB13VMXZtFwrIwMNA3dvbcGxaAFYQb'+'9LE5QAFI7Nk9cgdAyOeL2CFlS8XPrbDUoZTC4lIexVIJw0P9IwDScBVxzVOT9QggvbiuvWOjY9ns'+'PBxmLC0tbc+G1wApJWyHMTObxcjwYB+ALgBTCN8+WTYpa0QAQUTDu0eH+ycmp5BOtyGVSm0r4Big'+'6wYmJqYwNNTfIaXss237DEIRVMYFUQIEnnDwOGBwoG9ff19P+tXT52BZiVtCRLS6D8wM0zRx6fJV'+'/Oz991jdOzp3Xp2a9iVKlTlayQFR89PYPTp8wLJMys4tItNuYH5+fqvx97YHIQQ0XcfUtRmkUgnq'+'7+8duTo1raGOj1AlB0TnAOm9Y6O35XJ5MAskk8lt8bMOmMzOwHEYw0P9IydOnjYR6oC6BADK5wD9'+'e8d2DV65Og3dMKGUuuUUcCvFkcPA/PwCRnYODAJoA3AdNRy1anGABCA7O9vHRnYOdrx84sdgBubm'+'5rY5ICa4m/8Sk1enMTQ00A2gG8BbKOcCBmpzgASgj44M7+/oaJfXpmfR3t5xy07AWsUFhUIRlyem'+'cOcde9OpVHJgaWn5FawhgqLfhkmOje26nZmRyxXQtePmfU3xVoFpmbg2PYtMW1rr6+3eeX5pOaqE'+'gyWJShHkJ9px297RXddnsiiWbCwuLv5UiJ9aX/bYSBlE7nV5OYe2dAqDA727zl94s5IAZSIoKv9F'+'ImHt2rN7pDs7N4/l5WVIOesRwH8Tbs2qgwvXi6uKr9PB+u8ujomSeKlonZG0RmRl6AcPHcTAQC8G'+'B/uGEb5RPToh46j3bhCxc3hg39Bgn9nbswPpVBK53ErZR2tqOV358eVx4X2wzRRx2K103q12yEXo'+'5Bvcry99I4ewuI5kYdsj6SIOxV5omXOwphS6ujoghMDw0EAvXEvoSgTfAKrfaUMA9F0jQ7d3d3ch'+'k0njoQ+9b83NiK0VTnHendOqdnLdIIY7K3YJ0N8ppeixbecMYixFpHaNDI+mU0n3pdl8a9n+NxJ8'+'7ujv7030dO8YvHL1mr8zWsYBlZrZymTSKaUlQNLAVo/vmxsIxCV0tLeJzs72bo8AboSH71qroStL'+'S8u567PzyK86G9ox32yjW1lU6/sTrYFhmQqWZSGdSmZqpVZlqV3IzcxkZ6evTWFpebWmT2+tj6MF'+'76OtdbSL61gyzDXTlZ0hKE9Q9rEGrrK8uELec1Vc+bcJIvfRwyM1wpiry2sU5opvRqYtCcuUKBSK'+'JYQf/QzcFX0CRN0Rc8dPnD5qJZ7okVKCHYd8V27/RRcM9gAAewc/2bsLH+GnCf+Xp/PmFsFtEBum'+'Lqss8oTIX9lzUFCQJ9rAijRV92VtjTxHyquqpKzLjn+Fu+xsKyULzLzyxhuXnkSNL66WnYRB+KnC'+'DNydHP/dZzpCU7WWUuAGzxwjvlYZ9cLWm4cbxMUpD2vkqQzzkVwEUIC7Gb/iXQvez3fSYlWR0YZL'+'uUUvkYHw453+JGK9EKdTrdT0Db2TW9CO6DeGSyhHetWXVqOfvXAq7m0vY9xvBW+28RvJ3ygP4ca3'+'KcpJUU7wER/VAQBqK2H/DRZ+hspDe81EYKsQsZV1Vg7oKNKjyGegsXNuFOE302Ywr/G8Fe2pq4fq'+'IfZmQvjbHbZ6AGzDNmzDNmzD2xT+H+5UT7Tyxc2HAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA2'+'LTMwVDExOjUwOjAyLTA0OjAwOaSkCgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMy0xMS0wMVQxMDoz'+'ODoyNC0wNDowMNba8BsAAAAASUVORK5CYII='+'');lib.resource.add('hterm/concat/date','text/plain','Sun, 22 Oct 2017 11:00:51 +0000'+'');lib.resource.add('hterm/changelog/version','text/plain','1.73'+'');lib.resource.add('hterm/changelog/date','text/plain','2017-10-16'+'');lib.resource.add('hterm/git/HEAD','text/plain','git rev-parse HEAD'+'');var socket=io(location.origin,{path:'/wetty/socket.io'});var term=void 0;var buf='';var Wetty=function(){function Wetty(argv){_classCallCheck(this,Wetty);this.argv_=argv;this.io=null;this.pid_=-1;}_createClass(Wetty,[{key:'run',value:function run(){this.io=this.argv_.io.push();this.io.onVTKeystroke=this.sendString_.bind(this);this.io.sendString=this.sendString_.bind(this);this.io.onTerminalResize=this.onTerminalResize.bind(this);}},{key:'sendString_',value:function sendString_(str){socket.emit('input',str);}},{key:'onTerminalResize',value:function onTerminalResize(col,row){socket.emit('resize',{col:col,row:row});}}]);return Wetty;}();socket.on('connect',function(){window.addEventListener('beforeunload',handler,false);lib.init(function(){hterm.defaultStorage=new lib.Storage.Local();term=new hterm.Terminal();window.term=term;term.decorate(document.getElementById('terminal'));term.setCursorPosition(0,0);term.setCursorVisible(true);term.prefs_.set('ctrl-c-copy',true);term.prefs_.set('ctrl-v-paste',true);term.prefs_.set('use-default-window-copy',true);term.prefs_.set('send-encoding','raw');term.prefs_.set('receive-encoding','raw');term.prefs_.set('font-size',14);term.scrollPort_.screen_.setAttribute('spellcheck','false');term.scrollPort_.screen_.setAttribute('autocorrect','false');term.scrollPort_.screen_.setAttribute('autocomplete','false');term.scrollPort_.screen_.setAttribute('contenteditable','false');term.runCommandClass(Wetty,document.location.hash.substr(1));socket.emit('resize',{col:term.screenSize.width,row:term.screenSize.height});if(buf&&buf!==''){term.io.writeUTF8(buf);buf='';}});});socket.on('output',function(data){if(!term){buf+=data;return;}term.io.writeUTF8(data);});socket.on('logout',function(){window.removeEventListener('beforeunload',handler,false);});socket.on('disconnect',function(){window.removeEventListener('beforeunload',handler,false);});function handler(e){e.returnValue='Are you sure?';return e.returnValue;}