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
		} else if (arguments.length > 1 && Object.prototype.toString.call(value) !== "[object Object]") {
			// key and at least value given, set cookie...
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

	$.cookie.defaults = {};
	$.cookie.getStorage = function(options){
		options = $.extend($.cookie.defaults, options);
		if ( options.useLocalStorage && canLocalStorage() ){
			return localStorage;
		} else if ( canSessionStorage() && ( options.useLocalStorage || options.useSessionStorage ) ){
			//fallback if no localStorage avail use the sessionStorage
			return sessionStorage;
		} else {
			return new $.cookie.cookieStorage(options);
		}	
		function canLocalStorage(){
			return localStorage ? 1 : 0;
		}
		function canSessionStorage(){
			return sessionStorage ? 1 : 0;
		}
	}

	$.cookie.cookieStorage = function ( options ) {
			function cookie_encode( string ){
				//full uri decode not only to encode ",; =" but to save unicode charaters
				var decoded = encodeURIComponent(string);
				//encode back common and allowed charaters {}:"#[] to save space and make the cookies more human readable
				var ns = decoded.replace(/(%7B|%7D|%3A|%22|%23|%5B|%5D)/g,function(charater){return decodeURIComponent(charater);});
				return ns;
			}

			this.options = $.extend( $.cookie.defaults, options );
			this.removeItem = function ( key, options ) {
				options = $.extend( options, { "expires" : -1 } );
				options = $.extend( this.options, options);
				var value = null;
				this.setItem( key, value, options );
			};
			this.getItem = function ( key, options ) {
				options = $.extend(this.options, options);
				var decode = options.raw ? function (s) { return s; } : decodeURIComponent;
				key = cookie_encode(key);
				//make the key regex safe
				key = key.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
				var regex = new RegExp('(?:^|; )' + key + '=([^;]*)');
				var result = regex.exec(document.cookie);
				result = result ? decode(result[1]) : null;
				return result;
			};
			this.setItem = function ( key, value, options ) {
				options = $.extend(this.options, options);
				if (typeof options.expires === 'number') {
					var days = options.expires, t = options.expires = new Date();
					t.setDate(t.getDate() + days);
				}
				value = String( value );
				var cookie = [
					options.raw ? key : cookie_encode(key), '=',
					options.raw ? value : cookie_encode(value),
					options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					options.path ? '; path=' + options.path : '',
					options.domain ? '; domain=' + options.domain : '',
					options.secure ? '; secure' : ''
				].join('');
				return document.cookie = cookie;
			};
			
			this.getAll = function( options ){
				options = $.extend( this.options, options );
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
			}
	};
})( jQuery );