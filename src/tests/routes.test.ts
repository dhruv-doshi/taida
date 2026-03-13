import { describe, it, expect } from 'vitest'
import { ROUTES } from '@/constants/routes'

describe('ROUTES', () => {
  it('has correct static routes', () => {
    expect(ROUTES.HOME).toBe('/')
    expect(ROUTES.LOGIN).toBe('/login')
    expect(ROUTES.REGISTER).toBe('/register')
    expect(ROUTES.ANALYZE).toBe('/analyze')
    expect(ROUTES.HISTORY).toBe('/history')
  })

  it('generates result route with id', () => {
    expect(ROUTES.RESULT('abc-123')).toBe('/result/abc-123')
    expect(ROUTES.RESULT('xyz')).toBe('/result/xyz')
  })
})
