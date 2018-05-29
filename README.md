# @CentralPing/sugar-cookie

[![Build Status](https://travis-ci.org/CentralPing/sugar-cookie.svg?branch=master)](https://travis-ci.org/CentralPing/sugar-cookie)
[![Coverage Status](https://coveralls.io/repos/github/CentralPing/sugar-cookie/badge.svg)](https://coveralls.io/github/CentralPing/sugar-cookie)
[![Dependency Status](https://david-dm.org/CentralPing/sugar-cookie.svg)](https://david-dm.org/CentralPing/sugar-cookie)
[![Greenkeeper Status](https://badges.greenkeeper.io/CentralPing/sugar-cookie.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/centralping/sugar-cookie/badge.svg)](https://snyk.io/test/github/centralping/sugar-cookie)

A slightly opinionated browser cookie parser.

## Backgound
JavaScript can access and modify HTTP cookies through the [`document.cookie`](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) interface. Unfortunately it is a bit limited in accessing individual cookies. `sugar-cookie` is effectively a wrapper around the native interface to aid with using this interface with a little sugar on top.

### A Note on retreiving and storing cookies through `document.cookie`.

[RFC2109](https://tools.ietf.org/html/rfc2109) states cookies are unique based on their name, domain and path. The `document.cookie` interface returns all accessible cookies (name, value pairs) by the domain and path matching rules. This creates a situation where a cookie name could be shared between multiple cookies. Therefore when setting a value, proper care should be taken to assign the cookie to the correct domain and path to avoid either creating a new cookie or updating an incorrect one.

## Installation

`npm i --save https://github.com/CentralPing/sugar-cookie`

## API Reference

<a name="module_sugarCookie..get"></a>

### sugarCookie~get(name) ⇒ <code>String</code> \| <code>Array.&lt;String&gt;</code>
Get the value(s) for a cookie matching the provided name and the
domain/path of the current page.
If cookies from multiple matching paths match the name then an
array of values is returned.

**Kind**: inner method of [<code>sugarCookie</code>](#module_sugarCookie)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the cookie. |

**Example**  
```js
const fooCookie = get('foo');
```
<a name="module_sugarCookie..getAll"></a>

### sugarCookie~getAll() ⇒ <code>Object</code>
Gets all cookies matching the domain/path of the current page.
Values will be automatically parsed by JSON if possible.

**Kind**: inner method of [<code>sugarCookie</code>](#module_sugarCookie)  
**Example**  
```js
const cookies = getAll();
```
<a name="module_sugarCookie..put"></a>

### sugarCookie~put(name, value, attributes, [toJSON])
Sets (or updates) a cookie with the provided name domain/path.
By default, all values are stringified to allow easy conversion back
to original types (as allowed by JSON parsing).

**Kind**: inner method of [<code>sugarCookie</code>](#module_sugarCookie)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>String</code> |  | The name of the cookie. |
| value | <code>\*</code> |  | The value of the cookie. |
| attributes | <code>Object</code> |  |  |
| [toJSON] | <code>Boolean</code> | <code>true</code> | Enable or disable stringification of value. |

**Example**  
```js
put('foo', {someObject: 'value'});
put('bar', 'someStringValue', {path: '/somePath'});
```
<a name="module_sugarCookie..remove"></a>

### sugarCookie~remove(name, attributes)
Removes an existing cookie (sets the expiration and max-age attributes
to expired values).

**Kind**: inner method of [<code>sugarCookie</code>](#module_sugarCookie)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the cookie. |
| attributes | <code>Object</code> |  |

**Example**  
```js
remove('foo');
remove('bar', {path: '/somePath'});
```

## Examples

### For Cookie Parsing

```js
// From path '/'
sugarCookie.put('foo', 'hello');
const fooCookie = sugarCookie.get('foo'); // 'hello'

// From path '/'
sugarCookie.put('foo', {say: 'hello'}, {path: '/bar'});
const fooCookieFromBar = sugarCookie.get('foo', {path: '/bar'}); // {say: 'hello'}

// From path '/'
const cookies = sugarCookie.getAll(); // {foo: 'hello'}

// From path '/bar'
const cookies = sugarCookie.getAll(); // {foo: [{say: 'hello'}, 'hello']}

// From path '/'
sugarCookie.remove('foo');
const fooCookie = sugarCookie.get('foo'); // undefined

// From path '/'
sugarCookie.remove('foo', {path: '/bar'});
const cookies = sugarCookie.getAll(); // {}
```

## License

MIT
