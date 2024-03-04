const request = require('supertest');
import { web } from "../src/application/web"
import { logger } from "../src/application/logging"
import { AddressTest, ContactTest, UserTest } from "./test-util"

describe('POST /api/contacts/:contactId/addresses', () => {
  beforeEach(async () => {
    await UserTest.create()
    await ContactTest.create()
  })

  afterEach(async () => {
    await AddressTest.deleteAll()
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it ('should reject to create address if contact is not found', async () => {
    const contact = await ContactTest.get()
    const response = await request(web)
      .post(`/api/contacts/${contact.id + 1}/addresses`)
      .set('X-API-TOKEN', 'test')
      .send({
        street: 'street name',
        city: 'city name',
        province: 'province name',
        country: 'country name',
        postal_code: '1111111'
      })

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should be able to create address', async () => {
    const contact = await ContactTest.get()
    const response = await request(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set('X-API-TOKEN', 'test')
      .send({
        street: 'street name',
        city: 'city name',
        province: 'province name',
        country: 'country name',
        postal_code: '1111111'
      })

    logger.debug(response.body)
    expect(response.status).toBe(201)
    expect(response.body.error).toBe(false)
    expect(response.body.message).toBe('address created')
    expect(response.body.data.street).toBe('street name')
    expect(response.body.data.city).toBe('city name')
    expect(response.body.data.province).toBe('province name')
    expect(response.body.data.country).toBe('country name')
    expect(response.body.data.postal_code).toBe('1111111')
  })

  it ('should be able to create address without optional attribute', async () => {
    const contact = await ContactTest.get()
    const response = await request(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set('X-API-TOKEN', 'test')
      .send({
        street: '',
        city: '',
        province: '',
        country: 'country name',
        postal_code: '1111111'
      })

    logger.debug(response.body)
    expect(response.status).toBe(201)
    expect(response.body.error).toBe(false)
    expect(response.body.message).toBe('address created')
    expect(response.body.data.street).toBe('')
    expect(response.body.data.city).toBe('')
    expect(response.body.data.province).toBe('')
    expect(response.body.data.country).toBe('country name')
    expect(response.body.data.postal_code).toBe('1111111')
  })
})
