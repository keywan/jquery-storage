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
	function delete_cookie(key) {
		document.cookie = encodeURIComponent(key) + '=0; expires=Wed, 31 Dec 1969 23:59:59 GMT';
	}
	function get_cookie(key, options) {
		options = jQuery.extend({}, options);
		var result,
		decode = options.raw ? function (s) { return s; } : decodeURIComponent;
		return (result = new RegExp('(?:^|; )' + decode(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
	}
	function set_cookie(key, value, options) {
		options = jQuery.extend({ encodeKey: true }, options);
		var result,
			decode = options.raw ? function (s) { return s; } : decodeURIComponent,
			decodeKey = options.encodeKey ? decodeURIComponent : function (s) { return s; };
		return (result = new RegExp('(?:^|; )' + decodeKey(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
	}	
	if (arguments.length == 0) {
		//new API
		return {
			delete: delete_cookie,
			get: get_cookie,
			set: set_cookie
		}
	}else if(arguments.length > 1 && String(value) !== "[object Object]") {
		// key and at least value given, set cookie...
		options = jQuery.extend({}, options);
		if (value === null || value === undefined) {
			delete_cookie(key);
		}else{
			return set_cookie(key,value,options);
		}
	}else{
		// key and possibly options given, get cookie...		
		return get_cookie(key,value);
	}

};

function cookie_encode(string){
	//full uri decode not only to encode ",; =" but to save unicode charaters
	var decoded = encodeURIComponent(string);
	//encode back common and allowed charaters {}:"#[] to save space and make the cookies more human readable
	var ns = decoded.replace(/(%7B|%7D|%3A|%22|%23|%5B|%5D)/g,function(charater){return decodeURIComponent(charater);});
	return ns;
}
