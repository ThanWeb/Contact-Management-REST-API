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