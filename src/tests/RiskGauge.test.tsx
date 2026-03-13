import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import RiskGauge from '@/components/RiskGauge'

describe('RiskGauge', () => {
  it('renders the risk score', () => {
    render(<RiskGauge score={72} />)
    expect(screen.getByText('72')).toBeInTheDocument()
    expect(screen.getByText('HIGH RISK')).toBeInTheDocument()
  })

  it('clamps score below 0 to 0', () => {
    render(<RiskGauge score={-10} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('clamps score above 100 to 100', () => {
    render(<RiskGauge score={150} />)
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('renders green color for low risk (< 33)', () => {
    const { container } = render(<RiskGauge score={20} />)
    const paths = container.querySelectorAll('path')
    // paths[0]=track, [1]=green band, [2]=yellow band, [3]=red band, [4]=active fill
    const activePath = paths[4]
    expect(activePath.getAttribute('stroke')).toBe('#22c55e')
  })

  it('renders amber color for medium risk (33-65)', () => {
    const { container } = render(<RiskGauge score={50} />)
    const paths = container.querySelectorAll('path')
    const activePath = paths[4]
    expect(activePath.getAttribute('stroke')).toBe('#f59e0b')
  })

  it('renders red color for high risk (>= 66)', () => {
    const { container } = render(<RiskGauge score={80} />)
    const paths = container.querySelectorAll('path')
    const activePath = paths[4]
    expect(activePath.getAttribute('stroke')).toBe('#ef4444')
  })
})
