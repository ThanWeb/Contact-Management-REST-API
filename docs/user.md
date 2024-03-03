# User API Spec

## Register User

Endpoint: POST /api/users

Request Body:

```json
{
  "username": "username",
  "password": "secretpass",
  "name": "thisisname"
}
```

Response Body (Success):

```json
{
  "error": false,
  "message": "registration success",
  "data": {
    "username": "username",
    "name": "thisisname"
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

## Login User

Endpoint: POST /api/users/login

Request Body:

```json
{
  "username": "username",
  "password": "secretpass"
}
```

Response Body (Success):

```json
{
  "error": false,
  "message": "login success",
  "data": {
    "username": "username",
    "name": "thisisname",
    "token": "uuid"
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

## Get User

Endpoint: GET /api/users/current

Request Header:
- X-API-TOKEN: token

Response Body (Success):

```json
{
  "error": false,
  "data": {
    "username": "username",
    "name": "thisisname"
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

## Update User

Endpoint: PATCH /api/users/current

Request Header:
- X-API-TOKEN: token

Request Body:

```json
{
  "password": "secretpass", // tidak wajib
  "name": "name" // tidak wajib
}
```

Response Body (Success):

```json
{
  "error": false,
  "message": "update success",
  "data": {
    "username": "username",
    "name": "thisisname"
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

## Logout User

Endpoint: DELETE /api/users/current

Request Header:
- X-API-TOKEN: token

Response Body (Success):

```json
{
  "error": false,
  "message": "logout success",
}
```

Response Body (Failed):

```json
{ 
  "error": true,
  "message": "error message" 
}
```
