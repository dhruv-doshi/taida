export interface CompetitorInfo {
  name: string
  strengths: string[]
  weaknesses: string[]
  market_position: string
  threat_level: 'low' | 'medium' | 'high'
}

export interface CompetitorAnalysis {
  competitors: CompetitorInfo[]
  market_positioning: string
  competitive_gaps: string[]
  opportunities: string[]
}

export interface RegulationInfo {
  name: string
  jurisdiction: string
  description: string
  compliance_status: 'required' | 'recommended' | 'optional'
}

export interface RiskInfo {
  type: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  mitigation: string
}

export interface LegalAnalysis {
  regulations: RegulationInfo[]
  risks: RiskInfo[]
  risk_score: number
  risk_summary: string
}

export interface TaidaResult {
  competitor_analysis: CompetitorAnalysis
  legal_analysis: LegalAnalysis
}

export interface TaidaAnalysis {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  request: {
    product: string
    target_market: string
    sector: string
    competitors: string[]
  }
  result: TaidaResult | null
  created_at: string
}

export interface AnalyzeRequest {
  product: string
  target_market: string
  sector: string
  competitors: string[]
}
