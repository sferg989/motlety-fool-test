'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateCompanyPath(exchange: string, symbol: string) {
  revalidatePath(`/company/${exchange}/${symbol}`)
  return { success: true }
}

export async function revalidateArticlePath(path: string) {
  revalidatePath(`/article/${path}`)
  return { success: true }
}
