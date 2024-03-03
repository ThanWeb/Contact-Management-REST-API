const request = require('supertest');
import { web } from "../src/application/web"
import { logger } from "../src/application/logging"
import { ContactTest, UserTest } from "./test-util"

describe('POST /api/contacts', () => {
  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it('should reject create new contact when data is invalid', async () => {
    const response = await request(web)
    .post('/api/contacts')
    .set('X-API-TOKEN', 'test')
    .send({
      first_name: '',
      last_name: 'palla',
      email: 'hanspalla@example.com',
      phone: '08312123131'
    })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it('should reject create new contact when data is invalid', async () => {
    const response = await request(web)
    .post('/api/contacts')
    .set('X-API-TOKEN', 'test')
    .send({
      first_name: 'hans',
      last_name: '',
      email: 'hanspalla@example.com',
      phone: '08312123131'
    })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it('should reject create new contact when data is invalid', async () => {
    const response = await request(web)
    .post('/api/contacts')
    .set('X-API-TOKEN', 'test')
    .send({
      first_name: 'hans',
      last_name: 'palla',
      email: false,
      phone: '08312123131'
    })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it('should reject create new contact when data is invalid', async () => {
    const response = await request(web)
    .post('/api/contacts')
    .set('X-API-TOKEN', 'test')
    .send({
      first_name: 'hans',
      last_name: 'palla',
      email: 'hanspalla@example.com',
      phone: '081018198211111111111111111111111111111'
    })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it('should create new contact', async () => {
    const response = await request(web)
    .post('/api/contacts')
    .set('X-API-TOKEN', 'test')
    .send({
      first_name: 'hans',
      last_name: 'palla',
      email: 'hanspalla@example.com',
      phone: '081018198211'
    })

    logger.debug(response.body)
    expect(response.status).toBe(201)
    expect(response.body.error).toBe(false)
    expect(response.body.message).toBe('contact created')
    expect(response.body.data.id).toBeDefined()
    expect(response.body.data.first_name).toBe('hans')
    expect(response.body.data.last_name).toBe('palla')
    expect(response.body.data.email).toBe('hanspalla@example.com')
    expect(response.body.data.phone).toBe('081018198211')
  })
})