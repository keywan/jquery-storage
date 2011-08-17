/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2011 Tom Dunlap
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Modified from jquery.cookie.js by Klaus Hartl (stilbuero.de)
 * Original source:  https://github.com/carhartl/jquery-cookie
 *
 * Last modified:  2011-08-17 by Tom Dunlap:  
 * - (2011-08-17) Added localStorage support
 * - (2011-08-11) Added zero parameter method that checks if cookies are enables
 */

jQuery.cookie=function(a,b,c){if(arguments.length==0){var d=(new Date).getTime();document.cookie="__cookieprobe="+d+";path=/";return document.cookie.indexOf(d)!==-1}else if(arguments.length>1&&String(b)!=="[object Object]"){c=jQuery.extend({},c);if(b===null||b===undefined){c.expires=-1}if(typeof c.expires==="number"){var e=c.expires,f=c.expires=new Date;f.setDate(f.getDate()+e)}b=String(b);return document.cookie=[encodeURIComponent(a),"=",c.raw?b:encodeURIComponent(b),c.expires?"; expires="+c.expires.toUTCString():"",c.path?"; path="+c.path:"",c.domain?"; domain="+c.domain:"",c.secure?"; secure":""].join("")}else{c=b||{};var g,h=c.raw?function(a){return a}:decodeURIComponent;return(g=(new RegExp("(?:^|; )"+encodeURIComponent(a)+"=([^;]*)")).exec(document.cookie))?h(g[1]):null}};jQuery.storage=function(a,b){if(arguments.length==0){try{return"localStorage"in window&&window["localStorage"]!==null}catch(c){return false}}else if(arguments.length==1){return localStorage.getItem(a)}else{if(b===null){return localStorage.removeItem(a)}else{return localStorage.setItem(a,b)}}};jQuery.clearStorage=function(){localStorage.clear()};jQuery.storageKey=function(a){return localStorage.key(a)}