import { createFormRoute } from '@/lib/forms/handler'
import { auditRequestForm } from '@/lib/forms/audit-request'

export const POST = createFormRoute(auditRequestForm)
