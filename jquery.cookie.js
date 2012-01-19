/**
 * jQuery storage plugin
 *
 * Copyright (c) 2012 Keywan Ghadami
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

//persistent / cookie, (html5storage), ajax, other 
// 
 
(function( $ ){ 
	const webStorage = 'webStorage';
	const cookieStorage = 'cookieStorage';
	const ajaxStorage = 'ajaxStorage';
	
	$.storage = function(options){
		options = $.extend({"path":"/"},$.storage.defaults, options);
	
		if ( canLocalStorage() && options.storageType == webStorage ) {
			return localStorage;
		} else if ( canSessionStorage() && options.storageType == webStorage) {
			//fallback if no localStorage avail use the sessionStorage
			return sessionStorage;
		} else if ( options.storageType == webStorage || options.storageType == cookieStorage) {
			return new $.storage.cookieStorage(options);
		} else if ( options.storageType == ajaxStorage) {
			//TODO Ajax Storage
		} else {
			//custom types?
		}
	};
	$.storage.defaults = {};
	$.storage.webStorageType = webStorage;
	$.storage.cookieStorageType = cookieStorage;
	$.storage.ajaxStorageType = ajaxStorage;

	function canLocalStorage(){
		return localStorage ? 1 : 0;
	};
		
	function canSessionStorage(){
		return sessionStorage ? 1 : 0;
	};
	
})( jQuery );


/**
 * jQuery storage.cookieStorage plugin
 *
 * Copyright (c) 2012 Keywan Ghadami
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function( $ ){ 
	$.storage.cookieStorage = function ( options ) {
			this.options = $.extend({}, $.storage.cookieStorage.defaults, options );
	};
	$.storage.cookieStorage.defaults = {};

	var cSP = $.storage.cookieStorage.prototype;
	cSP.cookie_encode = function ( string ){
		//full uri decode not only to encode ",; =" but to save unicode charaters
		var decoded = encodeURIComponent(string);
		//encode back common and allowed charaters {}:"#[] to save space and make the cookies more human readable
		var ns = decoded.replace(/(%7B|%7D|%3A|%22|%23|%5B|%5D)/g,function(charater){return decodeURIComponent(charater);});
		return ns;
	};
	cSP.removeItem = function ( key, options ) {
		options = $.extend({}, options, { "expires" : -1 } );
		options = $.extend({}, this.options, options);
		var value = null;
		this.setItem( key, value, options );
	};
	cSP.getItem = function ( key, options ) {
		options = $.extend({},this.options, options);
		var decode = options.raw ? function (s) { return s; } : decodeURIComponent;
		if (! options.raw){
			key = this.cookie_encode(key);
		}
		//make the key regex safe
		key = key.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
		var regex = new RegExp('(?:^|; )' + key + '=([^;]*)');
		var result = regex.exec(document.cookie);
		result = result ? decode(result[1]) : null;
		return result;
	};
	cSP.setItem = function ( key, value, options ) {
		options = $.extend({},this.options, options);
		if (typeof options.expires === 'number') {
			var days = options.expires, t = options.expires = new Date();
			t.setDate(t.getDate() + days);
		}
		value = String( value );
		var cookie = [
			options.raw ? key : this.cookie_encode(key), '=',
			options.raw ? value : this.cookie_encode(value),
			options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
			options.path ? '; path=' + options.path : '',
			options.domain ? '; domain=' + options.domain : '',
			options.secure ? '; secure' : ''
		].join('');
		return document.cookie = cookie;
	};
		
	cSP.getAll = function( options ){
		options = $.extend({}, this.options, options );
		var cookie_strings = document.cookie.split( ';' ), l = cookie_strings.length, cookies = {};
		if(l > 0 && $.trim(document.cookie) !== ''){
		  for( var i = 0; i < l; i++ ){
			  var cookie = cookie_strings[i].match( /([^=]+)=(.+)/ );
			  if( typeof cookie !== 'undefined' && cookie !== null ){
				cookies[ $.trim( decodeURIComponent( cookie[1] ) ) ] = $.trim( decodeURIComponent(cookie[2]));
			  }
		  }
		}
		return cookies;
	};
})( jQuery );


/**
 * jQuery object storage plugin
 *
 * Copyright (c) 2012 Keywan Ghadami
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function( $ ){ 
	/* object Storage */
	
	$.objectStorage = function(storage){
		this.storage = storage;
	};
	
	var oSP = $.objectStorage.prototype;
	oSP.getItem = function(key){
		var item = this.storage.getItem();
		return $.evalJSON(item);
	};
	oSP.removeItem = function(key){
		this.storage.removeItem(key);
	};
	oSP.setItem = function(key,value){
		var stringValue = $.toJSON(value);
		this.storage.setItem(key,stringValue);
	};
	
	$.objectStorage.getStorage = function(){
		var storage = $.storage();
		return new $.objectStorage(storage);
	};
})( jQuery );




/**
 * jQuery Cookie 2 plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function( $ ){ 
	$.cookie = function (key, value, options) {
		// if arguments is blank, return all cookie detail
		if ( arguments.length == 0 ) {
			var cm = $.cookie.getStorage(options);
			return cm.getAll(options);
		} else if (arguments.length > 1 && (value == null || Object.prototype.toString.call(value) !== "[object Object]" )) {
			// key and at least value given, set or delete cookie ...
			if (value == null) {
				var cm = $.cookie.getStorage(options);
				return cm.removeItem(key);
			}else{
				var cm = $.cookie.getStorage(options);
				return cm.setItem(key,value);
			}
		} else {
			// key and possibly options given, get cookie...
			options = value;
			var cm = $.cookie.getStorage(options);
			return cm.getItem(key);
		}
	};

	//default is using CookieStorage but it is posible to set storageType to webStore to redirect jquery.cookie to localStorage for libaries that use jquery.cookie
	$.cookie.defaults = {};
	$.cookie.getStorage = function(options){
		options = $.extend({},$.cookie.defaults,options);
		if ( options.storageType == null ){
			 return new $.storage.cookieStorage(options);
		}else{
			return $.storage(options);
		}
	};
})( jQuery );
