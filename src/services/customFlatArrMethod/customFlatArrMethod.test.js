import customFlatArrMethod from './customFlatArrMethod.service';

describe('customFlatArrMethod', () => {
    const arr = ['string1', 'string2', 'string3', ['string4', 'string5']]
    test('works', async () => {
        expect(customFlatArrMethod(arr)).toEqual(['string1', 'string2', 'string3', 'string4', 'string5']);
    })
})