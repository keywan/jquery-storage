/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2011 Tom Dunlap
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Modified from jquery.cookie.js by Klaus Hartl (stilbuero.de)
 * Origenal source:  https://github.com/carhartl/jquery-cookie
 *
 * Last modified:  2011-08-11 by Tom Dunlap:  
 * - Added zero parameter method that checks if cookies are enables
 */
jQuery.cookie = function (key, value, options) {
	
	// if no arguments are passed, check and see if cookies are enabled
	if (arguments.length == 0){
		// the id is our test value
		var id = new Date().getTime();
		
		// generate a cookie to probe cookie access
		document.cookie = '__cookieprobe='+id+';path=/';
		
		// if the cookie has been set, then we're good
		return (document.cookie.indexOf(id) !== -1);
	}
	
    // key and at least value given, set cookie...
    else if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    else{
		options = value || {};
		var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
		return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
	}
};
