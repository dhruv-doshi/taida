import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import type { TaidaAnalysis, AnalyzeRequest } from '@/types/taida'

export function useTaidaAnalyze() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: AnalyzeRequest): Promise<TaidaAnalysis> => {
      const res = await apiClient.post('/taida/analyze', data)
      return res.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taida-analyses'] })
    },
  })
}

export function useTaidaHistory() {
  return useQuery({
    queryKey: ['taida-analyses'],
    queryFn: async (): Promise<TaidaAnalysis[]> => {
      const res = await apiClient.get('/taida/analyses')
      return res.data.data
    },
  })
}

export function useTaidaAnalysis(id: string) {
  return useQuery({
    queryKey: ['taida-analysis', id],
    queryFn: async (): Promise<TaidaAnalysis> => {
      const res = await apiClient.get(`/taida/analyses/${id}`)
      return res.data.data
    },
    enabled: !!id,
  })
}
