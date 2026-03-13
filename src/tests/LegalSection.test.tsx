import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LegalSection from '@/components/LegalSection'
import type { LegalAnalysis } from '@/types/taida'

const mockLegal: LegalAnalysis = {
  risk_score: 65,
  risk_summary: 'Moderate legal exposure with manageable compliance requirements.',
  risks: [
    {
      type: 'Data Privacy',
      severity: 'high',
      description: 'GDPR compliance required for EU operations.',
      mitigation: 'Appoint a DPO and conduct data audits.',
    },
    {
      type: 'IP Infringement',
      severity: 'low',
      description: 'Minor trademark overlap in secondary market.',
      mitigation: 'Consult IP counsel for clearance.',
    },
  ],
  regulations: [
    {
      name: 'GDPR',
      jurisdiction: 'EU',
      description: 'General Data Protection Regulation.',
      compliance_status: 'required',
    },
  ],
}

describe('LegalSection', () => {
  it('renders risk summary', () => {
    render(<LegalSection legal={mockLegal} />)
    expect(screen.getByText('Moderate legal exposure with manageable compliance requirements.')).toBeInTheDocument()
  })

  it('renders risk types', () => {
    render(<LegalSection legal={mockLegal} />)
    expect(screen.getByText('Data Privacy')).toBeInTheDocument()
    expect(screen.getByText('IP Infringement')).toBeInTheDocument()
  })

  it('renders severity labels', () => {
    render(<LegalSection legal={mockLegal} />)
    expect(screen.getByText('high')).toBeInTheDocument()
    expect(screen.getByText('low')).toBeInTheDocument()
  })

  it('renders regulation name and jurisdiction', () => {
    render(<LegalSection legal={mockLegal} />)
    expect(screen.getByText('GDPR')).toBeInTheDocument()
    expect(screen.getByText('EU')).toBeInTheDocument()
  })

  it('renders mitigation text', () => {
    render(<LegalSection legal={mockLegal} />)
    expect(screen.getByText(/Appoint a DPO/)).toBeInTheDocument()
  })

  it('renders without regulations when empty', () => {
    render(<LegalSection legal={{ ...mockLegal, regulations: [] }} />)
    expect(screen.queryByText('Applicable Regulations')).not.toBeInTheDocument()
  })
})
