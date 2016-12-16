# Vision6 JSON-RPC Client

This is a **Promise based** javascript JSON-RPC client for the Vision6 Email Marketing
application.

The Vision6 API Developer documentation [can be found here](http://developer.vision6.com.au).

## Installing

```bash
npm install --save vision6-jsonrpc-client
```

## Using

Example:

```javascript
const Vision6 = require('vision6-jsonrpc-client');

var api_key = 'your_vision6_api_key';
var vision6 = new Vision6(api_key);

vision6.searchLists()
    .then(function (lists) {
        console.log(lists);
    })
    .catch(function (err) {
        console.error('Ah crap:', err);
    });
```

You must instantiate a new Vision6 object and specify the api key in that call
or you will get an exception.

## Methods

### Wrapped Methods

- `vision6.searchLists()`

### Unwrapped Methods

At the time of writing there are very few wrapped API methods implemented
in this package, however you can instantiate any API method by using `.call()`.
Let's try the not yet wrapped API method, [getContactById](http://developer.vision6.com.au/3.0/method/getcontactbyid):

```javascript
var list_id    = 123;
var contact_id = 456;

vision6.call('getContactById', [list_id, contact_id])
    .then(function (contact) {
        console.log(contact);
    })
    .catch(function (err) {
        console.error('Ah crap:', err);
    });
```
