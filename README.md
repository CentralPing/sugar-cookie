# @CentralPing/sugar-cookie

[![Build Status](https://travis-ci.org/CentralPing/sugar-cookie.svg?branch=master)](https://travis-ci.org/CentralPing/sugar-cookie)
[![Coverage Status](https://coveralls.io/repos/github/CentralPing/sugar-cookie/badge.svg)](https://coveralls.io/github/CentralPing/sugar-cookie)
[![Dependency Status](https://david-dm.org/CentralPing/sugar-cookie.svg)](https://david-dm.org/CentralPing/sugar-cookie)
[![Greenkeeper Status](https://badges.greenkeeper.io/CentralPing/sugar-cookie.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/centralping/sugar-cookie/badge.svg)](https://snyk.io/test/github/centralping/sugar-cookie)

A slightly opinionated browser cookie parser.

## Backgound

JavaScript can access and modify HTTP cookies through the [`document.cookie`](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) interface. Unfortunately the API is a bit limited and cumbersome for managing cookies and storing values of types other than strings. `sugar-cookie` is effectively a wrapper around the native interface to aid with this and adds a little sugar on as well.

### Motivation & Opinion

Why make yet another cookie parser when there are plenty of [existing](https://github.com/js-cookie/js-cookie) [modules](https://github.com/madmurphy/cookies.js) (including the [original module](https://github.com/JasonCust/Cookie) this one is based on)? To be honest the main reason is simply an exercise in refactoring the aforementioned original module into a current version (at least as of mid 2018).
The other main reason is to continue to provide an alternative approach for dealing with a an odditiy of the `document.cookie` interface that most of the existing cookie parsers gloss over: that cookie names are not unique across host/path matching (see the [note on RFC2109](#a_note_on_retreiving_and_storing_cookies)).

Since cookie names can match multiple cookies depending on domain/path matching most browsers will return cookies in the order of specifity of the matches but with no way to determine what the host/path is for the returned cookies (`document.cookie` only returns the `name:value` pairs concatened together). Most parsers that are aware of this assume the browser is doing the right thing and only return the first cookie value per name. A problem with this approach is that a developer would never know there were mulitple matching cookies (which could be a pretty nasty thing to debug) or if it was desired they would never be able to access the other values without using `document.cookie` directly.

Which brings us to the *slightly* opinionated aspect of this module. Due to the possibility of a cookie name having mutliple values this module will return all cookie values as an array of values. While this will generally result in single element arrays, it will always provide a developer a way of quickly checking if there are multiple values and if so a way of having access to them. Unfortunately there is no way to include any information about the respective host/path values as this is not provided from the interface.

Another opinionated aspect of this module is the use of JSON stringification and parsing by default. Why? Well, since all cookie values are a concatenated string of `name=value[;attributes]` then any non-string values would need to be converted to a string. This happens automatically via the object value's `toString` method. Most objects will use the [`Object.prototype.toString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) method which simply returns `[object OBJECT_TYPE]` where `OBJECT_TYPE` is the type of the object. Arrays are a notable exception as their [`toString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString) method will effectively act as a `join` using commas. Reading these values later will either be useless, as in the case of most object types, or they will remain a string value rather than be reconstitued to the original object type.

What about pre-existing cookie values? The JSON parser would simply return them as strings (unless of course they were already encoded JSON). The only issue with using this approach is any strings set by `sugarCookie` would then be encoded JSON which includes quotation marks. Any other cookie parser *might* need to be aware of this. *I have not seen this as an issue yet.* If this is not desired or if a different conversion is desired then the conversion can be disabled (`null`, `false` or any falsy value) or modified by providing a function that accepts a string value.

#### A Note on Retreiving And Storing Cookies

[RFC2109](https://tools.ietf.org/html/rfc2109) states cookies are unique based on their name, domain and path. The `document.cookie` interface returns all accessible cookies (name, value pairs) by the domain and path matching rules. This creates a situation where a cookie name could be shared between multiple cookies. Therefore when setting a value, proper care should be taken to assign the cookie to the correct domain and path to avoid either creating a new cookie or updating an incorrect one.

## Installation

`npm i --save https://github.com/CentralPing/sugar-cookie`

## API Reference

<a name="module_sugarCookie..getAll"></a>

### sugarCookie~getAll(pattern, [conv]) ⇒ <code>Object.&lt;String, Array&gt;</code>
Gets all cookies matching the domain/path of the current page with optinal
name pattern matching. Values will be automatically parsed by JSON by
default. Cookie values are returned as arrays due to names being
non-unique for different hosts/paths.

**Kind**: inner method of [<code>sugarCookie</code>](#module_sugarCookie)  
**Returns**: <code>Object.&lt;String, Array&gt;</code> - An object where each key is a cookie name.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pattern | <code>RegExp</code> \| <code>String</code> |  | A regexp (or string) to match cookie names.  Strings can be substring matches (e.g. "bar" would match cookie "foobar"). |
| [conv] | <code>function</code> | <code>JSON.parse</code> | Function to convert value. |

**Example**  
```js
const cookies = getAll();
```
<a name="module_sugarCookie..get"></a>

### sugarCookie~get([name], [conv]) ⇒ <code>Array</code>
Get the value(s) for a cookie matching the provided name and the
domain/path of the current page. Values will be automatically parsed
by JSON by default. Cookie values are returned as arrays due to names
being non-unique for different hosts/paths.

**Kind**: inner method of [<code>sugarCookie</code>](#module_sugarCookie)  
**Returns**: <code>Array</code> - An array of parsed (if applicable) values.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [name] | <code>String</code> |  | The name of the cookie. |
| [conv] | <code>function</code> | <code>JSON.parse</code> | Function to convert value. |

**Example**  
```js
const fooCookie = get('foo');
```
<a name="module_sugarCookie..put"></a>

### sugarCookie~put([name], [value], [attributes], [conv])
Sets (or updates) a cookie with the provided name domain/path.

**Kind**: inner method of [<code>sugarCookie</code>](#module_sugarCookie)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [name] | <code>String</code> |  | The name of the cookie. |
| [value] | <code>\*</code> | <code>&#x27;&#x27;</code> | The value of the cookie. By default, all values  are stringified to allow easy conversion back to original types  (as allowed by JSON parsing). |
| [attributes] | <code>Object</code> |  | See [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) for more information about attributes. |
| [attributes.domain] | <code>String</code> |  | The domain of the cookie. Defaults to  the host portion of the current document location. If a domain is specified,  subdomains are always included. |
| [attributes.path] | <code>String</code> |  | The absolute path of the cookie. Defaults  to the current path of the current document location. |
| [attributes.secure] | <code>Boolean</code> |  | Indicates whether the cookie is  transmitted over secure protocols such as HTTPS. |
| [attributes.samesite] | <code>String</code> |  | Indicates if a cookie shouldn't be sent  with cross-site requests. See [SameSite](https://www.owasp.org/index.php/SameSite) for more information. |
| [attributes.maxAge] | <code>Number</code> |  | The maximum age of a cookie in seconds. |
| [attributes.expires] | <code>Date</code> \| <code>String</code> |  | The GMT timestamp of the cookie  expiration. |
| [conv] | <code>function</code> | <code>JSON.stringify</code> | Function to convert value. |

**Example**  
```js
put('foo', {someObject: 'value'});
put('bar', 'someStringValue', {path: '/somePath'});
```
<a name="module_sugarCookie..remove"></a>

### sugarCookie~remove([name], [attributes])
Removes an existing cookie (sets the expiration and max-age attributes
to expired values).

**Kind**: inner method of [<code>sugarCookie</code>](#module_sugarCookie)  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>String</code> | The name of the cookie. |
| [attributes] | <code>Object</code> | See [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) for more information about attributes. |
| [attributes.domain] | <code>String</code> | The domain of the cookie. Defaults to  the host portion of the current document location. If a domain is specified,  subdomains are always included. |
| [attributes.path] | <code>String</code> | The absolute path of the cookie. Defaults  to the current path of the current document location. |

**Example**  
```js
remove('foo');
remove('bar', {path: '/somePath'});
```

## Examples

### For Basic Cookie Parsing

```js
// Path: '/'
// Assuming no existing cookies
sugarCookie.put('foo', 'hello');
sugarCookie.put('bar', 'ciao');
sugarCookie.get('foo'); // ['hello']
sugarCookie.getAll(); // {foo: ['hello'], bar: ['ciao']}
sugarCookie.getAll('ar'); // {bar: ['ciao']}
sugarCookie.remove('foo');
sugarCookie.get('foo'); // undefined
sugarCookie.getAll(); // {bar: ['ciao']}

// Path: '/bar'
// Assuming foo and bar cookies exist at path '/'
sugarCookie.put('foo', 'bye');
sugarCookie.get('foo'); // ['bye', 'hello']
sugarCookie.getAll(); // {foo: ['bye', 'hello'], bar: ['ciao']}
sugarCookie.getAll('ar'); // {bar: ['ciao']}
sugarCookie.remove('foo');
sugarCookie.get('foo'); // ['bye']
sugarCookie.getAll(); // {bar: ['ciao'], 'foo': ['bye']}
```

### For Storing Any Type of Value

```js
sugarCookie.put('foo', {say: 'hello'});
sugarCookie.put('bar', ['ciao']);
sugarCookie.get('foo'); // [{say: 'hello'}]
sugarCookie.getAll(); // {foo: [{say: 'hello'}], bar: [['ciao']]}
sugarCookie.getAll('ar'); // {bar: [['ciao']]}
sugarCookie.remove('foo');
sugarCookie.get('foo'); // undefined
sugarCookie.getAll(); // {bar: [['ciao']]}
```

## License

MIT
