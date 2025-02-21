import { parseAspectRatio, parseRangeString } from '../packages/parser/src'

describe('utils', () => {
  it('page-range', () => {
    expect(parseRangeString(5)).toEqual([1, 2, 3, 4, 5])
    expect(parseRangeString(5, 'all')).toEqual([1, 2, 3, 4, 5])
    expect(parseRangeString(2, '*')).toEqual([1, 2])
    expect(parseRangeString(5, '1')).toEqual([1])
    expect(parseRangeString(10, '1,2-3,5')).toEqual([1, 2, 3, 5])
    expect(parseRangeString(10, '1;2-3;5')).toEqual([1, 2, 3, 5])
    expect(parseRangeString(10, '6-')).toEqual([6, 7, 8, 9, 10])
  })

  it('aspect-ratio', () => {
    expect(parseAspectRatio(1)).toEqual(1)
    expect(parseAspectRatio('16/9')).toEqual(16 / 9)
    expect(parseAspectRatio('16 / 9 ')).toEqual(16 / 9)
    expect(parseAspectRatio('3:4')).toEqual(3 / 4)
    expect(parseAspectRatio('1x1')).toEqual(1)
    expect(parseAspectRatio('1')).toEqual(1)

    expect(() => parseAspectRatio('hello')).toThrow()
    expect(() => parseAspectRatio('1/0')).toThrow()
  })
})
