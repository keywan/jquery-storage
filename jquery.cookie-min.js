/**
 * jQuery Cookie plugin
 * Copyright (c) 2011 Tom Dunlap
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Modified from jquery.cookie.js by Klaus Hartl (stilbuero.de)
 * Origenal source:  https://github.com/carhartl/jquery-cookie
 * Last modified:  2011-08-11 by Tom Dunlap
 */

jQuery.cookie=function(key,value,options){if(arguments.length==0){var id=new Date().getTime();document.cookie='__cookieprobe='+id+';path=/';return(document.cookie.indexOf(id)!==-1);}
else if(arguments.length>1&&String(value)!=="[object Object]"){options=jQuery.extend({},options);if(value===null||value===undefined){options.expires=-1;}
if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+days);}
value=String(value);return(document.cookie=[encodeURIComponent(key),'=',options.raw?value:encodeURIComponent(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}
else{options=value||{};var result,decode=options.raw?function(s){return s;}:decodeURIComponent;return(result=new RegExp('(?:^|; )'+encodeURIComponent(key)+'=([^;]*)').exec(document.cookie))?decode(result[1]):null;}};