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

**List and Field Methods**

- [`vision6.addField`](http://developers.vision6.com.au/3.0/method/addfield)
- [`vision6.addList`](http://developers.vision6.com.au/3.0/method/addlist)
- [`vision6.clearList`](http://developers.vision6.com.au/3.0/method/clearlist)
- [`vision6.countFields`](http://developers.vision6.com.au/3.0/method/countfields)
- [`vision6.countLists`](http://developers.vision6.com.au/3.0/method/countlists)
- [`vision6.deleteField`](http://developers.vision6.com.au/3.0/method/deletefield)
- [`vision6.deleteList`](http://developers.vision6.com.au/3.0/method/deletelist)
- [`vision6.editField`](http://developers.vision6.com.au/3.0/method/editfield)
- [`vision6.editList`](http://developers.vision6.com.au/3.0/method/editlist)
- [`vision6.getFieldById`](http://developers.vision6.com.au/3.0/method/getfieldbyid)
- [`vision6.getFolderIdForField`](http://developers.vision6.com.au/3.0/method/getfolderidforfield)
- [`vision6.getListById`](http://developers.vision6.com.au/3.0/method/getlistbyid)
- [`vision6.getTimezoneList`](http://developers.vision6.com.au/3.0/method/gettimezonelist)
- [`vision6.searchFields`](http://developers.vision6.com.au/3.0/method/searchfields)
- [`vision6.searchLists`](http://developers.vision6.com.au/3.0/method/searchlists)
- [`vision6.setFieldFolderId`](http://developers.vision6.com.au/3.0/method/setfieldfolderid)


**Contact Methods**

- [`vision6.addContacts`](http://developers.vision6.com.au/3.0/method/addcontacts)
- [`vision6.confirmContact`](http://developers.vision6.com.au/3.0/method/confirmcontact)
- [`vision6.countContacts`](http://developers.vision6.com.au/3.0/method/countcontacts)
- [`vision6.countPreviousUnsubscribers`](http://developers.vision6.com.au/3.0/method/countpreviousunsubscribers)
- [`vision6.deactivateContact`](http://developers.vision6.com.au/3.0/method/deactivatecontact)
- [`vision6.deleteContacts`](http://developers.vision6.com.au/3.0/method/deletecontacts)
- [`vision6.editContacts`](http://developers.vision6.com.au/3.0/method/editcontacts)
- [`vision6.getContactById`](http://developers.vision6.com.au/3.0/method/getcontactbyid)
- [`vision6.reactivateContact`](http://developers.vision6.com.au/3.0/method/reactivatecontact)
- [`vision6.resubscribeContact`](http://developers.vision6.com.au/3.0/method/resubscribecontact)
- [`vision6.searchContacts`](http://developers.vision6.com.au/3.0/method/searchcontacts)
- [`vision6.searchPreviousUnsubscribers`](http://developers.vision6.com.au/3.0/method/searchpreviousunsubscribers)
- [`vision6.subscribeContact`](http://developers.vision6.com.au/3.0/method/subscribecontact)
- [`vision6.unsubscribeContact`](http://developers.vision6.com.au/3.0/method/unsubscribecontact)
- [`vision6.unsubscribeContactById`](http://developers.vision6.com.au/3.0/method/unsubscribecontactbyid)

## Validation

This package is jam packed with strictness. Using Json Schema Validation, all requests are validated locally before sending
off to the API.

Additionally, unit tests will validate responses from the API against expected schema.
