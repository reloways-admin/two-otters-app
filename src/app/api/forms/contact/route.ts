import { createFormRoute } from '@/lib/forms/handler'
import { contactForm } from '@/lib/forms/contact'

export const POST = createFormRoute(contactForm)
