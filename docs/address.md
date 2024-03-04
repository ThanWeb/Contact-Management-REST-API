# Address API Spec

## Create Address

Endpoint: POST /api/contacts/:idContact/addresses

Request Header:
- X-API-TOKEN: token

Request Body:
```json
{
  "street": "street name",
  "city": "city name",
  "province": "province name",
  "country": "country name",
  "postal_code": "82121"
}
```

Response Body (Success):
```json
{
  "error": false,
  "message": "address created",
  "data": {
    "id": 1,
    "street": "street name",
    "city": "city name",
    "province": "province name",
    "country": "country name",
    "postal_code": "82121"
  }
}
```

Response Body (Failed):

```json
{
  "error": true,
  "message": "error message" 
}
```

## Get Address

Endpoint: GET /api/contacts/:idContact/addresses/:idAddress

Request Header:
- X-API-TOKEN: token

Response Body (Success):
```json
{
  "error": false,
  "data": {
    "id": 1,
    "street": "street name",
    "city": "city name",
    "province": "province name",
    "country": "country name",
    "postal_code": "82121"
  }
}
```

Response Body (Failed):

```json
{
  "error": true,
  "message": "error message" 
}
```

## Update Address

Endpoint: PUT /api/contacts/:idContact/addresses/:idAddress

Request Header:
- X-API-TOKEN: token

Request Body:
```json
{
  "street": "street name",
  "city": "city name",
  "province": "province name",
  "country": "country name",
  "postal_code": "82121"
}
```

Response Body (Success):
```json
{
  "error": false,
  "message": "address updated",
  "data": {
    "id": 1,
    "street": "street name",
    "city": "city name",
    "province": "province name",
    "country": "country name",
    "postal_code": "82121"
  }
}
```

Response Body (Failed):

```json
{
  "error": true,
  "message": "error message" 
}
```

## Remove Address

Endpoint: PUT /api/contacts/:idContact/addresses/:idAddress

Request Header:
- X-API-TOKEN: token

Response Body (Success):
```json
{
  "error": false,
  "message": "address removed"
}
```

Response Body (Failed):

```json
{
  "error": true,
  "message": "error message" 
}
```

## List Address

Endpoint: GET /api/contacts/:idContact/addresses

Request Header:
- X-API-TOKEN: token

Response Body (Success):
```json
{
  "error": false,
  "message": "contact created",
  "data": [
    {
      "id": 1,
      "street": "street name",
      "city": "city name",
      "province": "province name",
      "country": "country name",
      "postal_code": "82121"
    }
  ]
}
```

Response Body (Failed):

```json
{
  "error": true,
  "message": "error message" 
}
```