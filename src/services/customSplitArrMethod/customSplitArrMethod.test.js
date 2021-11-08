import customSplitArrMethod from './customSplitArrMethod.service';

describe('customSplitArrMethod', () => {
    const arr = ['string1', true, {}, 1]
    test('works', async () => {
        expect(customSplitArrMethod(arr)).toEqual([ [{}], [1], ['string1'], [true]]);
    })
})