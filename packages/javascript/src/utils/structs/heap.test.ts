import { describe, expect, test } from '@jest/globals';
import { MinHeap } from './heap';

const cases = {
    sort: [
        [5, 4, 3, 2, 1],
        [90, 87, 61, 69, 31, 9, 23, 11]
    ]
}

const results = {
    sort: [
        [1, 2, 3, 4, 5],
        [9, 11, 23, 31, 61, 69, 87, 90]
    ]
}

describe('heap test', () => {
    test("sort", () => {
        const tobesorts = cases.sort

        for (let [index, arr] of tobesorts.entries()) {
            const heap = MinHeap.from(arr)
            const sortArr = []
            while (heap.size() > 0) {
                sortArr.push(heap.pop())
            }
            console.log(sortArr)
            expect(sortArr).toEqual(results.sort[index])
        }
    })
})