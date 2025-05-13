import type { Fiction } from '@/types/fiction'

export function getFictions(): Fiction[] {
  const stored = localStorage.getItem('myFictions')
  return stored ? JSON.parse(stored) : []
}

export function setFictions(fictions: Fiction[]) {
  localStorage.setItem('myFictions', JSON.stringify(fictions))
}
