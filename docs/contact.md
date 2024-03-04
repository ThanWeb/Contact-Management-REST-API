# Contract API Spec

## Create Contact

Endpoint: POST /api/contacts

Request Header:
- X-API-TOKEN: token

Request Body:
```json
{
  "first_name": "Hans",
  "last_name": "Palla",
  "email": "hansolo.palla2115@gmail.com",
  "phone": "086313131131"
}
```

Response Body (Success):
```json
{
  "error": false,
  "message": "contact created",
  "data": {
    "id": 1,
    "first_name": "Hans",
    "last_name": "Palla",
    "email": "hansolo.palla2115@gmail.com",
    "phone": "086313131131"
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

## Get Contact

Endpoint: GET /api/contacts/:id

Request Header:
- X-API-TOKEN: token

Response Body (Success):
```json
{
  "error": false,
  "message": "contact created",
  "data": {
    "id": 1,
    "first_name": "Hans",
    "last_name": "Palla",
    "email": "hansolo.palla2115@gmail.com",
    "phone": "086313131131"
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

## Update Contact

Endpoint: PUT /api/contacts/:id

Request Header:
- X-API-TOKEN: token

Request Body:
```json
{
  "first_name": "Hans",
  "last_name": "Palla",
  "email": "hansolo.palla2115@gmail.com",
  "phone": "086313131131"
}
```

Response Body (Success):
```json
{
  "error": false,
  "message": "contact created",
  "data": {
    "id": 1,
    "first_name": "Hans",
    "last_name": "Palla",
    "email": "hansolo.palla2115@gmail.com",
    "phone": "086313131131"
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

## Remove Contact

Endpoint: DELETE /api/contacts/:id

Request Header:
- X-API-TOKEN: token

Response Body (Success):
```json
{
  "error": false,
  "message": "contact deleted"
}
```

Response Body (Failed):

```json
{
  "error": true,
  "message": "error message" 
}
```

## Search Contact

Endpoint: GET /api/contacts

Query Parameter:
- name: string, contact first_name or contact last_name, optional
- phone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10

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
      "first_name": "Hans",
      "last_name": "Palla",
      "email": "hansolo.palla2115@gmail.com",
      "phone": "086313131131"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
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