import type { PlanoId } from '../data/conteudo'

export interface DadosCadastro {
  nome_completo: string
  email: string
  celular: string
  plano: PlanoId
  consentimento: boolean
}

const CHAVES_UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const

/** Guarda os UTMs da primeira visita (anúncios da Meta, Google etc.) para enviar junto com o cadastro. */
export function capturarUtms() {
  try {
    const params = new URLSearchParams(window.location.search)
    const utms = Object.fromEntries(CHAVES_UTM.filter((k) => params.get(k)).map((k) => [k, params.get(k)]))
    if (Object.keys(utms).length) sessionStorage.setItem('dpj_utms', JSON.stringify(utms))
  } catch {
    /* navegação privada: segue sem UTMs */
  }
}

function lerUtms(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem('dpj_utms') ?? '{}')
  } catch {
    return {}
  }
}

export class ErroCadastro extends Error {}

export async function enviarCadastro(dados: DadosCadastro) {
  const corpo = { ...dados, ...lerUtms(), origem_pagina: window.location.href.slice(0, 300) }
  let resp: Response
  try {
    resp = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo),
    })
  } catch {
    throw new ErroCadastro('Sem conexão com o servidor. Tente novamente em instantes.')
  }
  if (!resp.ok) {
    const erro = await resp.json().catch(() => null)
    const msg = erro?.detail?.[0]?.msg?.replace(/^Value error, /, '')
    throw new ErroCadastro(msg ?? 'Não foi possível enviar seu cadastro. Tente novamente.')
  }
  return (await resp.json()) as { id: string; nome: string; plano: PlanoId }
}

export function mascararCelular(valor: string) {
  const d = valor.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function validarCadastro(d: Omit<DadosCadastro, 'plano'>) {
  const erros: Partial<Record<keyof DadosCadastro, string>> = {}
  if (d.nome_completo.trim().split(/\s+/).length < 2) erros.nome_completo = 'Informe nome e sobrenome'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) erros.email = 'Informe um e-mail válido'
  const cel = d.celular.replace(/\D/g, '')
  if (cel.length !== 11 || cel[2] !== '9') erros.celular = 'Informe DDD + celular com 9 dígitos'
  if (!d.consentimento) erros.consentimento = 'É preciso aceitar para continuar'
  return erros
}
