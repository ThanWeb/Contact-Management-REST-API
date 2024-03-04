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

describe('GET /api/contacts/:contactId', () => { 
  beforeEach(async () => {
    await UserTest.create()
    await ContactTest.create()
  })

  afterEach(async () => {
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it ('should reject get contact is contat is not found', async () => {
    const contact = await ContactTest.get()
    const response = await request(web)
      .get(`/api/contacts/${contact.id + 2}`)
      .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should be able to get contact', async () => {
    const contact = await ContactTest.get()
    const response = await request(web)
      .get(`/api/contacts/${contact.id}`)
      .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
    expect(response.body.data.first_name).toBe(contact.first_name)
    expect(response.body.data.last_name).toBe(contact.last_name)
    expect(response.body.data.email).toBe(contact.email)
    expect(response.body.data.phone).toBe(contact.phone)
  })
})

describe('PUT /api/contacts/:contactId', () => { 
  beforeEach(async () => {
    await UserTest.create()
    await ContactTest.create()
  })

  afterEach(async () => {
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it ('should reject to update contact when contact is not found', async () => {
    const contact = await ContactTest.get()
    const response = await request(web)
      .put(`/api/contacts/${contact.id + 1}`)
      .set('X-API-TOKEN', 'test')
      .send({
        first_name: 'hans',
        last_name: 'rio',
        email: 'hans@example.com',
        phone: '0831115111211'
      })

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should reject to update contact when data is not exist', async () => {
    const contact = await ContactTest.get()
    const response = await request(web)
      .put(`/api/contacts/${contact.id}`)
      .set('X-API-TOKEN', 'test')
      .send({})

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })


  it ('should reject to update contact when data invalid', async () => {
    const contact = await ContactTest.get()
    const response = await request(web)
      .put(`/api/contacts/${contact.id}`)
      .set('X-API-TOKEN', 'test')
      .send({
        first_name: '',
        last_name: 'rio',
        email: 'hans@example.com',
        phone: '0831115111211'
      })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })
  
  it ('should reject to update contact when data invalid', async () => {
    const contact = await ContactTest.get()
    const response = await request(web)
      .put(`/api/contacts/${contact.id}`)
      .set('X-API-TOKEN', 'test')
      .send({
        first_name: 'hans',
        last_name: '',
        email: 'hans@example.com',
        phone: '0831115111211'
      })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should reject to update contact when data invalid', async () => {
    const contact = await ContactTest.get()
    const response = await request(web)
      .put(`/api/contacts/${contact.id}`)
      .set('X-API-TOKEN', 'test')
      .send({
        first_name: 'hans',
        last_name: 'rio',
        email: '',
        phone: '0831115111211'
      })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should reject to update contact when data invalid', async () => {
    const contact = await ContactTest.get()
    const response = await request(web)
      .put(`/api/contacts/${contact.id}`)
      .set('X-API-TOKEN', 'test')
      .send({
        first_name: 'hans',
        last_name: 'rio',
        email: 'hans@example.com',
        phone: 831115111211
      })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should be able to update contact', async () => {
    const contact = await ContactTest.get()
    const response = await request(web)
      .put(`/api/contacts/${contact.id}`)
      .set('X-API-TOKEN', 'test')
      .send({
        first_name: 'hans',
        last_name: 'rio',
        email: 'hans@example.com',
        phone: '0831115111211'
      })

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
    expect(response.body.data.id).toBe(contact.id)
    expect(response.body.data.first_name).toBe('hans')
    expect(response.body.data.last_name).toBe('rio')
    expect(response.body.data.email).toBe('hans@example.com')
    expect(response.body.data.phone).toBe('0831115111211')
  })
})

describe('DELETE /api/contacts/:contactId', () => { 
  beforeEach(async () => {
    await UserTest.create()
    await ContactTest.create()
  })

  afterEach(async () => {
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it ('should reject to remove contact when contact is not found', async () => {
    const contact = await ContactTest.get()
    const response = await request(web)
      .delete(`/api/contacts/${contact.id + 1}`)
      .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should be able to remove contact', async () => {
    const contact = await ContactTest.get()
    const response = await request(web)
      .delete(`/api/contacts/${contact.id}`)
      .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
    expect(response.body.message).toBe('contact removed')
  })
})

describe('GET /api/contacts', () => { 
  beforeEach(async () => {
    await UserTest.create()
    await ContactTest.create()
  })

  afterEach(async () => {
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it ('should be able to search contact without any query', async () => {
    const response = await request(web)
      .get('/api/contacts')
      .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
    expect(response.body.data.length).toBe(1)
    expect(response.body.paging.current_page).toBe(1)
    expect(response.body.paging.total_page).toBe(1)
    expect(response.body.paging.size).toBe(10)
  })

  it ('should be able to search contact with correct query name', async () => {
    const response = await request(web)
      .get('/api/contacts')
      .query({
        name: 'st'
      })
      .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
    expect(response.body.data.length).toBe(1)
    expect(response.body.paging.current_page).toBe(1)
    expect(response.body.paging.total_page).toBe(1)
    expect(response.body.paging.size).toBe(10)
  })

  it ('should be able to search contact with wrong query name', async () => {
    const response = await request(web)
      .get('/api/contacts')
      .query({
        name: 'sta'
      })
      .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
    expect(response.body.data.length).toBe(0)
    expect(response.body.paging.current_page).toBe(1)
    expect(response.body.paging.total_page).toBe(0)
    expect(response.body.paging.size).toBe(10)
  })

  it ('should be able to search contact with correct query email', async () => {
    const response = await request(web)
      .get('/api/contacts')
      .query({
        email: 'exam'
      })
      .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
    expect(response.body.data.length).toBe(1)
    expect(response.body.paging.current_page).toBe(1)
    expect(response.body.paging.total_page).toBe(1)
    expect(response.body.paging.size).toBe(10)
  })

  it ('should be able to search contact with correct query phone', async () => {
    const response = await request(web)
      .get('/api/contacts')
      .query({
        phone: '08'
      })
      .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
    expect(response.body.data.length).toBe(1)
    expect(response.body.paging.current_page).toBe(1)
    expect(response.body.paging.total_page).toBe(1)
    expect(response.body.paging.size).toBe(10)
  })

  it ('should be able to search contact with paging', async () => {
    const response = await request(web)
      .get('/api/contacts')
      .query({
        page: 2,
        size: 1
      })
      .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
    expect(response.body.data.length).toBe(0)
    expect(response.body.paging.current_page).toBe(2)
    expect(response.body.paging.total_page).toBe(1)
    expect(response.body.paging.size).toBe(1)
  })
})