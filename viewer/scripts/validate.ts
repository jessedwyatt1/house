import { getActiveComposeProfile, getHouseModel } from '../model/compose.ts'
import { ComposeError } from '../model/composeMerge.ts'
import { HouseModelSchema } from '../model/schema.ts'
import { ZodError } from 'zod'

function formatZodError(error: ZodError): string {
  return error.issues
    .map((issue) => {
      const path =
        issue.path.length > 0 ? issue.path.map(String).join('.') : '(root)'
      return `  ${path}: ${issue.message}`
    })
    .join('\n')
}

function main(): void {
  const profile = getActiveComposeProfile()

  try {
    const raw = getHouseModel()
    const model = HouseModelSchema.parse(raw)
    const modules = model.meta?.modules
    const moduleNote =
      Array.isArray(modules) && modules.length > 0
        ? ` (${modules.length} modules: ${modules.join(', ')})`
        : ''
    console.log(
      `validate: OK — ${model.entities.length} entities${moduleNote} [profile: ${profile}]`,
    )
    process.exit(0)
  } catch (error) {
    console.error('validate: FAILED')
    if (error instanceof ComposeError) {
      console.error(`  compose: ${error.message}`)
    } else if (error instanceof ZodError) {
      console.error(formatZodError(error))
    } else {
      console.error(error)
    }
    process.exit(1)
  }
}

main()
