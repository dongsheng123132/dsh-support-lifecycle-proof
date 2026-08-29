import { readFile } from 'node:fs/promises'
import { evaluateSupportLifecycleManifest } from '../lib/support-lifecycle-proof.mjs'
const report = evaluateSupportLifecycleManifest(await readFile(new URL('../examples/closed.json', import.meta.url), 'utf8'))
if (report.verdict !== 'support-lifecycle-closed') throw new Error('closed fixture did not close')
console.log(JSON.stringify({ ok: true, verdict: report.verdict }))
