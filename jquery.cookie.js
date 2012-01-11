/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = {
    get: function(key, options) {
        options = jQuery.extend({}, options);
	var result,
        decode = options.raw ? function (s) { return s; } : decodeURIComponent,
        return (result = new RegExp('(?:^|; )' + decode(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
    },
    set: function(key, value, options) {
	options = jQuery.extend({ encodeKey: true }, options);
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
            options.raw ? value : cookie_encode(value),
            options.raw ? key : cookie_encode(key), '=',
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    },

    delete: function(key) {
        document.cookie = encodeURIComponent(key) + '=0; expires=Wed, 31 Dec 1969 23:59:59 GMT';
    }
};

function cookie_encode(string){
	//full uri decode not only to encode ",; =" but to save unicode charaters
	var decoded = encodeURIComponent(string);
	//encode back common and allowed charaters {}:"#[] to save space and make the cookies more human readable
	var ns = decoded.replace(/(%7B|%7D|%3A|%22|%23|%5B|%5D)/g,function(charater){return decodeURIComponent(charater);});
	return ns;
}
