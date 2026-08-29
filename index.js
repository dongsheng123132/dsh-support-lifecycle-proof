import { inspectSupportLifecycleManifestJson, verifySupportLifecycleManifest } from './lib/support-lifecycle-proof.mjs'
export const name = 'dsh-support-lifecycle-proof'
export const inject = ['tools']
const render = (_a, value) => [{ type: 'text', text: JSON.stringify(value, null, 2) }]
const tool = value => ({ ...value, output: { schema: {}, render } })
export function createDefinitions(_ctx = {}, config = {}) { const workspaceRoot = config.workspaceRoot || process.cwd(); return [tool({ name: 'dsh_support_lifecycle_inspect', description: 'Inspect bounded support-lifecycle evidence.', parameters: { type: 'object', required: ['manifestJson'], properties: { manifestJson: { type: 'string' } }, additionalProperties: false }, execute: async ({ manifestJson }) => inspectSupportLifecycleManifestJson(manifestJson) }), tool({ name: 'dsh_support_lifecycle_verify', description: 'Verify supplied support and retirement evidence and write a redacted report.', parameters: { type: 'object', required: ['manifestPath', 'artifactDir'], properties: { manifestPath: { type: 'string' }, artifactDir: { type: 'string' } }, additionalProperties: false }, execute: async args => verifySupportLifecycleManifest({ workspaceRoot, ...args }) })] }
export function apply(ctx, config = {}) { for (const definition of createDefinitions(ctx, config)) ctx.tools.register(definition) }
