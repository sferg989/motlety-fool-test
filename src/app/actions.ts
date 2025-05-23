'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { REVALIDATION_TAGS } from './constants'

export async function revalidateCompanyPath(exchange: string, symbol: string) {
  await revalidateTag(`${REVALIDATION_TAGS.COMPANY}-${exchange}-${symbol}`)
  return { success: true }
}

export async function revalidateArticlePath(path: string) {
  revalidateTag(`${REVALIDATION_TAGS.ARTICLE}-${path}`)
  return { success: true }
}

export async function revalidateHomePage() {
  revalidatePath('/')
  return { success: true }
}

export async function revalidateAndRedirect(path: string, redirectPath?: string) {
  revalidatePath(path)

  if (redirectPath) {
    redirect(redirectPath)
  }

  return { success: true }
}

export async function revalidateByTag(tag: string) {
  revalidateTag(tag)
  return { success: true }
}
