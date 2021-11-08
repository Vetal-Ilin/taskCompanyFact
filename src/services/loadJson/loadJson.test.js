import loadJson from './loadJson.service';

const unmockedFetch = global.fetch

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve(['string1', 'string2', 'string3']),
    })
})

afterAll(() => {
  global.fetch = unmockedFetch
})

// This is actual testing suite
describe('loadJson', () => {
  test('works', async () => {
    const json = await loadJson()
    expect(Array.isArray(json)).toEqual(true)
    expect(json.length).toEqual(3)
  })
})