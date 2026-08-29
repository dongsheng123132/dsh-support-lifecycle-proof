import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, mkdtemp, mkdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { evaluateSupportLifecycleManifest, verifySupportLifecycleManifest } from '../lib/support-lifecycle-proof.mjs'
const fixture = () => readFile(new URL('../examples/closed.json', import.meta.url), 'utf8')
test('closed supplied lifecycle manifest passes', async () => assert.equal(evaluateSupportLifecycleManifest(await fixture()).verdict, 'support-lifecycle-closed'))
test('expired component without retirement fails', async () => { const m = JSON.parse(await fixture()); m.retirements = []; assert.equal(evaluateSupportLifecycleManifest(m).verdict, 'not-closed') })
test('writes below explicit artifactDir and reads it back', async () => { const root = await mkdtemp(join(tmpdir(), 'lifecycle-proof-')); await mkdir(join(root, 'in')); await writeFile(join(root, 'in', 'manifest.json'), await fixture()); const result = await verifySupportLifecycleManifest({ workspaceRoot: root, manifestPath: 'in/manifest.json', artifactDir: 'out' }); assert.equal(result.artifact.verifiedByReadBack, true); assert.match(result.artifact.path, /^out\//) })
