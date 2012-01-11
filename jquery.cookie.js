/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

jQuery.CookieManager = function CookieManager(options){
		function cookie_encode(string){
			//full uri decode not only to encode ",; =" but to save unicode charaters
			var decoded = encodeURIComponent(string);
			//encode back common and allowed charaters {}:"#[] to save space and make the cookies more human readable
			var ns = decoded.replace(/(%7B|%7D|%3A|%22|%23|%5B|%5D)/g,function(charater){return decodeURIComponent(charater);});
			return ns;
		}

		this.options = jQuery.extend({}, options);
		this.delete_cookie = function delete_cookie(key) {
			document.cookie = encodeURIComponent(key) + '=0; expires=Wed, 31 Dec 1969 23:59:59 GMT';
		};
		this.get_cookie = function get_cookie(key, options) {
			options = jQuery.extend(this.options, options);
			var result,
			decode = options.raw ? function (s) { return s; } : decodeURIComponent;
			key = cookie_encode(key);
			key = key.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			return (result = new RegExp('(?:^|; )' + key + '=([^;]*)').exec(document.cookie)) ? 
				decode(result[1]) : null;
		};
		this.set_cookie = function set_cookie(key, value, options) {
			options = jQuery.extend(this.options, options);
			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}
			value = String(value);
			return (document.cookie = [
				options.raw ? key : cookie_encode(key), '=',
				options.raw ? value : cookie_encode(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
		};
};
jQuery.cookie = function (key, value, options) {
	if (arguments.length == 0) {
		
	}else if(arguments.length > 1 && String(value) !== "[object Object]") {
		// key and at least value given, set cookie...
		options = options || {};
		var cm = new jQuery.CookieManager(options)
		if (value === null || value === undefined) {
			cm.delete_cookie(key);
		}else{
			return cm.set_cookie(key,value);
		}
	}else{
		// key and possibly options given, get cookie...
		var cm = new jQuery.CookieManager(value);
		return cm.get_cookie(key);
	}
};

