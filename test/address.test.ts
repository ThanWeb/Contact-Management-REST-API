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

describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await ContactTest.create()
    await AddressTest.create()
  })

  afterEach(async () => {
    await AddressTest.deleteAll()
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it ('should not be able to get address when contact is not found', async () => {
    const contact = await ContactTest.get()
    const address = await AddressTest.get()
    const response = await request(web)
      .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should not be able to get address when address is not found', async () => {
    const contact = await ContactTest.get()
    const address = await AddressTest.get()
    const response = await request(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should be able to get address', async () => {
    const contact = await ContactTest.get()
    const address = await AddressTest.get()
    const response = await request(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
    expect(response.body.data.id).toBeDefined()
    expect(response.body.data.street).toBe(address.street)
    expect(response.body.data.city).toBe(address.city)
    expect(response.body.data.province).toBe(address.province)
    expect(response.body.data.country).toBe(address.country)
    expect(response.body.data.postal_code).toBe(address.postal_code)
  })
})

describe('UPDATE /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await ContactTest.create()
    await AddressTest.create()
  })

  afterEach(async () => {
    await AddressTest.deleteAll()
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it ('should not be able to update address when request body is invalid', async () => {
    const contact = await ContactTest.get()
    const address = await AddressTest.get()
    const response = await request(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set('X-API-TOKEN', 'test')
      .send({
        street: 'new street',
        city: 'new city',
        province: 'new province',
        country: 'new country',
        postal_code: ''
      })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should not be able to update address when contact is not found', async () => {
    const contact = await ContactTest.get()
    const address = await AddressTest.get()
    const response = await request(web)
      .put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set('X-API-TOKEN', 'test')
      .send({
        street: 'new street',
        city: 'new city',
        province: 'new province',
        country: 'new country',
        postal_code: '654321'
      })

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should not be able to update address when address is not found', async () => {
    const contact = await ContactTest.get()
    const address = await AddressTest.get()
    const response = await request(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set('X-API-TOKEN', 'test')
      .send({
        street: 'new street',
        city: 'new city',
        province: 'new province',
        country: 'new country',
        postal_code: '654321'
      })

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should be able to update address', async () => {
    const contact = await ContactTest.get()
    const address = await AddressTest.get()
    const response = await request(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set('X-API-TOKEN', 'test')
      .send({
        street: 'new street',
        city: 'new city',
        province: 'new province',
        country: 'new country',
        postal_code: '654321'
      })

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
    expect(response.body.message).toBe('address updated')
    expect(response.body.data.id).toBe(address.id)
    expect(response.body.data.street).toBe('new street')
    expect(response.body.data.city).toBe('new city')
    expect(response.body.data.province).toBe('new province')
    expect(response.body.data.country).toBe('new country')
    expect(response.body.data.postal_code).toBe('654321')
  })
})

describe('DELETE /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await ContactTest.create()
    await AddressTest.create()
  })

  afterEach(async () => {
    await AddressTest.deleteAll()
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it ('should not be able to remove address when contact is not found', async () => {
    const contact = await ContactTest.get()
    const address = await AddressTest.get()
    const response = await request(web)
      .delete(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should not be able to update address when address is not found', async () => {
    const contact = await ContactTest.get()
    const address = await AddressTest.get()
    const response = await request(web)
      .delete(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toBeDefined()
  })

  it ('should be able to remove address', async () => {
    const contact = await ContactTest.get()
    const address = await AddressTest.get()
    const response = await request(web)
      .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
    expect(response.body.message).toBe('address removed')
  })
})
