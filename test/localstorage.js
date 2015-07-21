/* global describe, it */
import {expect} from 'chai'
import localStorage from '../src'

describe('localStorage', () => {
  it('should set a string', () => {
    localStorage.setItem('foo', 'bar')
    expect(localStorage.getItem('foo')).to.equal('bar')
  })

  it('should set an object', () => {
    const o = {a: 1, b: 'string', c: {x: 1, y: 2}}
    localStorage.setItem('obj', o)
    expect(localStorage.getItem('obj')).to.eql(o.toString())
  })
})
