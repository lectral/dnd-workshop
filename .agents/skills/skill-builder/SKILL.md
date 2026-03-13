---
name: skill-builder
description: Create or revise repository-local Copilot skills for this project. Use when the user wants a new `.agents` skill, a rewrite of an existing skill, or repository-specific guidance on skill structure, scope, activation, and references.
compatibility: Offline-friendly. Markdown only. Designed for repository-local skill authoring under `.agents/skills/`.
metadata:
  domain: agent-customization
  output: skill-spec-or-skill-file
---

# Skill Builder

Use this skill when the user wants to add, update, audit, or standardize a repository-local skill inside `.agents/skills/`.

## Core operating rules

- Follow the established repository pattern before inventing a new one.
- Keep each skill **narrow**. One skill should solve one class of request well.
- Write guidance for the agent, not marketing copy for the user.
- Prefer deterministic instructions over aspirational language.
- Final deliverables must be repository-ready: clean Markdown, valid frontmatter, and a directory layout that matches the other skills.

## Repository pattern to copy

Every skill in this repository should usually include:

1. `SKILL.md` with YAML frontmatter.
2. A short `# Title` matching the skill name in readable form.
3. A `Use this skill when...` opener that defines activation scope.
4. A rules section such as `## Core operating rules` or `## Non-negotiable rules`.
5. A concrete `## Workflow` or equivalent step-by-step execution section.
6. Optional structure guidance, output modes, or hard requirements when the skill needs them.
7. A `## References` section when supporting files exist.

## Frontmatter contract

Use this shape unless the skill clearly needs a tighter variation:

```yaml
---
name: skill-name
description: One precise sentence stating what the skill does, when to use it, and what quality bar it targets.
compatibility: Offline-friendly. Markdown only. Add tool or runtime requirements only if they are real.
metadata:
  domain: repository-domain
  output: primary-output-shape
---
```

## Workflow

1. Inspect neighboring skills first and extract the local conventions that repeat.
2. Define the new skill's exact scope: what it should be used for and what it should not cover.
3. Pick the minimum directory layout needed:
   - `SKILL.md` only for simple instruction-only skills.
   - `references/` when reusable checklists, templates, or format rules would otherwise clutter `SKILL.md`.
   - `scripts/` or `assets/` only when the skill genuinely requires local tooling or bundled data.
4. Write the activation sentence so the skill is discoverable and does not overlap too broadly with adjacent skills.
5. Add hard rules only when they constrain output in a useful, testable way.
6. Add a workflow that the agent can actually follow without guessing.
7. Add references only if those files exist or are being created in the same change.
8. If the repository has a central skill index such as `AGENTS.md`, register the new skill there.

## Hard requirements

- The skill name in frontmatter must match the directory name.
- The description must state both the task type and the activation cue.
- Do not promise tools, scripts, assets, or reference files that do not exist.
- Do not create a broad catch-all skill when a narrower one is possible.
- Do not duplicate repository-wide rules that already live in `AGENTS.md` unless the skill must restate them for correctness.
- If the skill defines output sections or formatting law, make those sections explicit and scannable.

## Quality bar

A good repository skill is:

- easy to trigger correctly
- hard to misuse
- specific about output
- aligned with neighboring skills in tone and structure
- small enough to maintain

## Default build checklist

- Is the scope narrower than a general-purpose writing skill?
- Is the activation sentence concrete?
- Does the workflow describe real steps instead of vague advice?
- Are references present only when justified?
- Does the file look consistent with the other `.agents/skills/*/SKILL.md` files?

## References

- Repository skill index: `AGENTS.md`
- Neighbor patterns: `.agents/skills/*/SKILL.md`
