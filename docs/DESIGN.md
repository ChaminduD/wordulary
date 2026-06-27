# Wordulary Design System

> Version: 1.0
> Last Updated: June 2026
> This document is a living reference.
> Update it only when a design decision becomes the new standard across Wordulary.

---

# Design Philosophy

Wordulary is a vocabulary learning application designed for long reading sessions.

The interface should feel:

* Calm
* Focused
* Intelligent
* Encouraging
* Modern

The interface should **not** feel:

* Loud
* Gamified
* Corporate
* Over-designed
* Distracting

When making design decisions, always prioritize readability and simplicity over decoration.

---

# Typography

## Font Family

Primary font

* Inter

---

## Text Hierarchy

### Page Title

```
text-3xl
font-semibold
tracking-tight
```

Examples

* Dashboard
* Your Terms
* Collections
* Review

---

### Page Description

```
text-sm
text-muted-foreground
```

Explains the purpose of the page.

---

### Section Title

```
text-lg
font-semibold
```

Examples

* AI Content
* Danger Zone
* Vocabulary Overview

---

### Subsection Title

```
text-sm
font-semibold
text-muted-foreground
```

Examples

* Definition
* Examples
* Synonyms
* Antonyms

---

### Body Text

```
text-base
leading-7
```

Used for reading content.

---

### Supporting Text

```
text-sm
text-muted-foreground
```

Examples

* Helper text
* Empty state descriptions
* Status messages

---

# Layout

Every page should generally follow this structure.

```
Page Header

↓

Primary Actions

↓

Controls / Filters

↓

Content
```

Users should understand:

1. Where they are
2. What they can do
3. What content they are looking at

within the first screen.

---

# Cards

Cards group related information.

Use cards to separate concepts, not every piece of content.

Standard card style:

```
rounded-xl
border
bg-card
p-6
```

Cards should generally contain:

* title
* optional description
* content

---

# Spacing

## Between page sections

```
space-y-8
```

---

## Inside cards

```
space-y-6
```

---

## Reading content

```
space-y-8
```

Examples:

* Definition
* Examples
* Synonyms

---

## Label and value

```
space-y-2
```

or

```
mt-2
```

---

# Buttons

Buttons should communicate importance.

## Primary

Main action of the page.

Examples

* Add Term
* Save Term
* Generate AI
* Mark Mastered

There should usually be only **one primary action** per screen.

---

## Outline

Secondary actions.

Examples

* Import
* Start Over

---

## Ghost

Low emphasis actions.

Examples

* Cancel
* Back

---

## Destructive

Actions that permanently delete data.

Examples

* Delete Term
* Delete Collection

---

# Forms

Prefer shadcn/ui components over native HTML controls.

Use:

* Button
* Input
* Textarea
* Checkbox
* Select
* Alert Dialog

Avoid mixing browser-native controls with styled components unless there is a specific reason.

---

# Search & Filters

Search should appear before filters.

Related filters should be grouped together.

Example

```
Search

Status
[ New ]
[ Learning ]

AI
[ Generated ]
[ Missing AI ]
```

Show the number of results near the filters.

Provide a clear way to reset active filters.

---

# Empty States

Every empty state should answer:

* Why is this empty?
* What should the user do next?

Example

```
No terms yet

Import your vocabulary
or add your first term.

[ Add Term ]
```

---

# Icons

Use Lucide icons.

Icons should support labels.

Prefer:

```
📚 Terms
```

instead of

```
📚
```

alone.

Maintain consistent icon sizing throughout the application.

---

# Color Philosophy

Color should communicate meaning.

Avoid using color for decoration only.

General guidelines

* Neutral colors should dominate.
* Accent colors should guide attention.
* Destructive actions should remain clearly distinguishable.
* Success and progress should feel calm rather than loud.

---

# Component Philosophy

Parents control layout.

Children control appearance.

Parents are responsible for:

* spacing
* grid
* flex
* alignment

Children are responsible for:

* typography
* colors
* borders
* icons

---

# Consistency Rules

Avoid introducing random values.

Instead, reuse existing patterns whenever possible.

Do not create multiple styles for the same purpose.

Examples:

❌ Multiple page title sizes

```
text-xl
text-2xl
text-3xl
```

Use one standard.

❌ Mixed card styles

```
rounded
rounded-lg
rounded-xl
```

Use one standard.

---

# Feature Design Checklist

Before implementing a new feature, ask:

* Does this solve a real user problem?
* Is the interface simple?
* Does it follow the existing design system?
* Does it feel like Wordulary?
* Is the primary action obvious?
* Is the content easy to scan?

If the answer to any question is "No", redesign before implementing.

---

# Guiding Principle

A user should never have to think about the interface.

The interface should quietly support learning while staying out of the user's way.
