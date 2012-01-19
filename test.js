var before = {
    setup: function () {
		$.cookie.defaults={};
		//do not expect cookies to be deleted
        cookies = document.cookie.split('; ')
        for (var i = 0, c; (c = (cookies)[i]) && (c = c.split('=')[0]); i++) {
            document.cookie = c + '=0; expires=Wed, 31 Dec 1969 23:59:59 GMT';
        }
    }
};


module('read', before);

test('simple value', 1, function () {
    document.cookie = 'c=v';
    equals($.cookie('c'), 'v', 'should return value');
});

test('not existing', 1, function () {
    equals($.cookie('whatever'), null, 'should return null');
});


test('raw: true', 1, function () {
    document.cookie = 'c=%20v';
    equals($.cookie('c', { raw: true }), '%20v', 'should not decode');
});

module('decode', before);

test('decode', 1, function () {
	var key = ' c[]#=';
	var value = ' c[]#=';
	
	$.cookie(key,value);
	var res = $.cookie(key);
    equals(res, value, 'should decode key and value');
});


module('write', before);

test('String primitive', 1, function () {
    $.cookie('c', 'v');
    equals($.cookie('c'), 'v', 'should write value');
});

test('String object', 1, function () {
    $.cookie('c', new String('v'));
    equals($.cookie('c'), 'v', 'should write value');
});

test('value "[object Object]"', 1, function() {
    $.cookie('c', '[object Object]');
    equals($.cookie('c'), '[object Object]', 'should write value');
});

test('return', 1, function () {
    equals($.cookie('c', 'v'), 'c=v', 'should return written cookie string');
});

test('raw: true', 1, function () {
    equals($.cookie('c', ' v', { raw: true }).split('=')[1],
        ' v', 'should not encode');
});


module('delete', before);
	
test('delete', 1, function () {
    document.cookie = 'c=v';
    $.cookie('c',null);
    equals($.cookie('c'), null, 'should delete with null as value');
});

module('default options', before);

test('path', 2, function () {
  $.cookie.defaults.path = '/';
  $.cookie('test', 'ok');
  equals($.cookie('test'), 'ok', 'path "/" is ok');
  
  $.cookie('test', null);
  equals($.cookie('test'), null, 'should delete with null as value');
  
});

test('wrongpath', 1, function () {
  $.cookie.defaults.path = '/test';
  $.cookie('test', 'value');
  equals($.cookie('test'), null, 'path "/test" should return null');
});

module('all cookie detail', before);

test('all cookies', 3, function(){
  deepEqual($.cookie(), {}, '$.cookie is {}');
  $.cookie('test', 'ok');
  equals($.cookie('test'), 'ok', 'should return ok');
  deepEqual($.cookie(), {test: 'ok'}, '$.cookie is {test: \'ok\'}');
});

module('localStorage', before);
test('localStorage',2,function(){
	$.cookie.defaults.useLocalStorage = 1;
	$.cookie('test', 'ok');
	equals($.cookie('test'), 'ok', 'should return ok');
	equals(document.cookie, '', 'should be empty, delete cookies and re-run');
});