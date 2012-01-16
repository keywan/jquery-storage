/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

jQuery.cookie = function (key, value, options) {
    // if arguments is blank, return all cookie detail
	var cm = new jQuery.cookie.CookieManager();
	if (arguments.length == 0) {
		return cm.get_all(options);
	}else if(arguments.length > 1 && String(value) !== "[object Object]") {
		// key and at least value given, set cookie...
		if (value === null || value === undefined) {
			options = value;
			cm.delete_cookie(key,options);
		}else{
			return cm.set_cookie(key,value,options);
		}
	}else{
		// key and possibly options given, get cookie...
		options = value;
		return cm.get_cookie(key,options);
	}
};

jQuery.cookie.defaults = {};

jQuery.cookie.CookieManager = function CookieManager(options){
		function cookie_encode(string){
			//full uri decode not only to encode ",; =" but to save unicode charaters
			var decoded = encodeURIComponent(string);
			//encode back common and allowed charaters {}:"#[] to save space and make the cookies more human readable
			var ns = decoded.replace(/(%7B|%7D|%3A|%22|%23|%5B|%5D)/g,function(charater){return decodeURIComponent(charater);});
			return ns;
		}

		this.options = jQuery.extend(jQuery.cookie.defaults, options);
		this.delete_cookie = function delete_cookie(key,options) {
			options = jQuery.extend(options, {"expires" : -1});
			options = jQuery.extend(this.options, options);
			var value = null;
			this.set_cookie(key,value,options);
		};
		this.get_cookie = function get_cookie(key, options) {
			options = jQuery.extend(this.options, options);
			var decode = options.raw ? function (s) { return s; } : decodeURIComponent;
			key = cookie_encode(key);
			//make the key regex safe
			key = key.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			var regex = new RegExp('(?:^|; )' + key + '=([^;]*)');
			var result = regex.exec(document.cookie);
			result = result ? decode(result[1]) : null;
			return result;
		};
		this.set_cookie = function set_cookie(key, value, options) {
			options = jQuery.extend(this.options, options);
			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}
			value = String(value);
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
		
		this.get_all = function(options){
			options = jQuery.extend(this.options, options);
			var cookie_strings = document.cookie.split(';'), l = cookie_strings.length, cookies = {};
			if(l > 0 && jQuery.trim(document.cookie) !== ''){
			  for(var i = 0; i < l; i ++){
				  var cookie = cookie_strings[i].match(/([^=]+)=(.+)/);
				  if(typeof cookie !== 'undefined' && cookie !== null){
					cookies[jQuery.trim(decodeURIComponent(cookie[1]))] = jQuery.trim(decodeURIComponent(cookie[2]));
				  }
			  }
			}
			return cookies;
		}
};



