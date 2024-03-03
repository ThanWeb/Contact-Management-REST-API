const request = require('supertest');
import { web } from "../src/application/web"
import { logger } from "../src/application/logging"
import { UserTest } from "./test-util";

describe('POST /api/users', () => { 
  afterEach(async () => {
    await UserTest.delete()
  })

  it ('should reject register new user if request is invalid', async () => {
    const response = await request(web)
      .post('/api/users')
      .send({
        username: '',
        password: '',
        name: ''
      })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should reject register new user if username already used', async () => {
    await UserTest.create()

    const response = await request(web)
      .post('/api/users')
      .send({
        username: 'test',
        password: 'test',
        name: 'test'
      })

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should register new user correctly', async () => {
    const response = await request(web)
      .post('/api/users')
      .send({
        username: 'test',
        password: 'test',
        name: 'test'
      })

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
    expect(response.body.message).toBe('registration success')
    expect(response.body.data.username).toBe('test')
    expect(response.body.data.name).toBe('test')
  })
})

describe('POST /api/users/login', () => { 
  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await UserTest.delete()
  })

  it ('should reject login user if request is invalid', async () => {
    const response = await request(web)
      .post('/api/users/login')
      .send({
        username: '',
        password: ''
      })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should reject login user if username is wrong', async () => {
    const response = await request(web)
      .post('/api/users/login')
      .send({
        username: 'wrongusername',
        password: 'test'
      })

    logger.debug(response.body)
    expect(response.status).toBe(401)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should reject login user if password is wrong', async () => {
    const response = await request(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'wrongpassword'
      })

    logger.debug(response.body)
    expect(response.status).toBe(401)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should be able to login', async () => {
    const response = await request(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'test'
      })

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
    expect(response.body.message).toBe('login success')
    expect(response.body.data.username).toBe('test')
    expect(response.body.data.name).toBe('test')
    expect(response.body.data.token).toBeDefined()
  })
})

describe('GET /api/users/current', () => { 
  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await UserTest.delete()
  })

  it ('should reject get user if token is invalid', async () => {
    const response = await request(web)
      .post('/api/users/current')
      .set('X-API-TOKEN', 'wrongtoken')

    logger.debug(response.body)
    expect(response.status).toBe(401)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should be able to get user', async () => {
    const response = await request(web)
      .get('/api/users/current')
      .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
    expect(response.body.data.username).toBe('test')
    expect(response.body.data.name).toBe('test')
  })
})