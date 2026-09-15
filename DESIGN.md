# ElevAmp concept — Design system

## Design intent

An experienced operator made an invisible process visible.

The interface should feel professional, precise, candid, and calm. Visual interest comes from composition, typography, diagrams, and one purposeful interaction—not ornament or spectacle.

## Principles

1. **Problem before product.** Lead with the operational failure, not HubSpot.
2. **Technology last.** The page order reinforces People → Process → Technology.
3. **Show the system.** Use paths, stages, ownership, and data continuity instead of fake product UI.
4. **One personal hook.** The Ultimate Frisbee reference appears once.
5. **Evidence without theater.** No fake metrics, dashboards, testimonials, or logos.
6. **Motion explains.** Animation is used for routes, handoffs, and state changes only.

## Visual vocabulary

### Color

- Paper: `#f4f3ee`
- Secondary paper: `#ebeae4`
- Ink: `#181b19`
- Muted text: `#666b66`
- Line: `#d2d3cc`
- Accent: `#2f6959`
- Accent dark: `#19493d`
- Accent soft: `#dce8e2`
- Warning: `#b8683b`

The palette is original and uses no copied ElevAmp or HubSpot brand assets.

### Typography

- Display/body: Manrope-compatible system sans-serif
- Operational metadata: monospaced system font
- Headlines use tight tracking and restrained weight.
- Monospace appears only for system labels, stages, times, and evidence metadata.

### Shape

- Small 3–6px radii.
- Thin rules and borders.
- Pills are reserved for process stages.
- Shadows are subtle and used only for elevated interactive surfaces.

### Spacing

- Desktop sections: ~120px vertical.
- Mobile sections: ~90px vertical.
- Content width is controlled through two-column compositions rather than a universal centered container.

## Motion

Target intensity: 3/10.

Permitted:

- inquiry signal moving through a workflow;
- route tracing;
- state transition from unmanaged to designed;
- hover and focus feedback.

Avoid:

- parallax;
- scroll hijacking;
- decorative looping animation;
- autoplay video;
- 3D/WebGL;
- delayed access to content.

All animation must collapse under `prefers-reduced-motion`.

## Accessibility

- Semantic landmarks and heading order.
- Skip link.
- Visible keyboard focus.
- Native controls where possible.
- Form questions use labelled radio inputs.
- Results receive programmatic focus.
- Controls expose pressed and disabled state.
- No meaning is communicated by color alone.
- Minimum target size near 44px.

## Responsive behavior

- Hero moves from two columns to one.
- Diagnostic introduction loses sticky behavior on smaller displays.
- Three-column frameworks stack.
- Process visual remains legible without horizontal scrolling.
- Handoff diagram is recomposed for narrow screens.

## Anti-patterns

Do not add law-firm stock photography, gavels, scales, court columns, generic feature grids, gradient-heavy AI styling, glassmorphism, fake browser windows, fake HubSpot dashboards, logo walls, unauthorized portraits, or excessive rounded cards.
