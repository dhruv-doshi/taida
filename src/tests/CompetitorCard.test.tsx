import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CompetitorCard from '@/components/CompetitorCard'
import type { CompetitorInfo } from '@/types/taida'

const mockCompetitor: CompetitorInfo = {
  name: 'Acme Corp',
  strengths: ['Strong brand', 'Large customer base'],
  weaknesses: ['Slow innovation', 'High pricing'],
  market_position: 'Market leader in enterprise segment',
  threat_level: 'high',
}

describe('CompetitorCard', () => {
  it('renders competitor name', () => {
    render(<CompetitorCard competitor={mockCompetitor} />)
    expect(screen.getByText('Acme Corp')).toBeInTheDocument()
  })

  it('renders market position', () => {
    render(<CompetitorCard competitor={mockCompetitor} />)
    expect(screen.getByText('Market leader in enterprise segment')).toBeInTheDocument()
  })

  it('renders threat level badge', () => {
    render(<CompetitorCard competitor={mockCompetitor} />)
    expect(screen.getByText('high')).toBeInTheDocument()
  })

  it('renders all strengths', () => {
    render(<CompetitorCard competitor={mockCompetitor} />)
    expect(screen.getByText('· Strong brand')).toBeInTheDocument()
    expect(screen.getByText('· Large customer base')).toBeInTheDocument()
  })

  it('renders all weaknesses', () => {
    render(<CompetitorCard competitor={mockCompetitor} />)
    expect(screen.getByText('· Slow innovation')).toBeInTheDocument()
    expect(screen.getByText('· High pricing')).toBeInTheDocument()
  })

  it('renders low threat level', () => {
    render(<CompetitorCard competitor={{ ...mockCompetitor, threat_level: 'low' }} />)
    expect(screen.getByText('low')).toBeInTheDocument()
  })

  it('renders medium threat level', () => {
    render(<CompetitorCard competitor={{ ...mockCompetitor, threat_level: 'medium' }} />)
    expect(screen.getByText('medium')).toBeInTheDocument()
  })
})
