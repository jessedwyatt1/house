# 04 — Water tanks (thermal mass)

The **interior water thermal battery** behind the south glass.

## Tank specification (current)

| | Per tank | Both tanks |
|---|----------|------------|
| Depth (into building) | 18" | — |
| Width (along 60' south wall) | 15' | 30' total |
| Height | 10' | — |
| Volume | ~225 ft³ ≈ 1,680 gal | ~3,360 gal |
| Weight (full) | ~14,000 lb | ~28,000 lb |

**Layout (modeled in [spec.ts](./spec.ts)):** The 60' slab is split into two 30' halves and one tank is centered on each half — `tank-west` centered at x = 15 (spans x 7.5–22.5) and `tank-east` centered at x = 45 (spans x 37.5–52.5). Together they cover **half** of the 60' south glazed wall.

**Tank front = glass line.** Each tank butts directly against the south glazing plane (front face at z = 0), so the tank front effectively *is* the glass on that stretch of wall.

**Perimeter drain.** A 6"-wide, 3"-deep recessed channel (`drain-tank-*-west` / `-north` / `-east`) wraps the three *interior* sides of each tank for leak capture and condensation. No drain on the south side, since that face meets the glass.

**Support.** Tanks bear on `slab-tank-west` / `slab-tank-east` in [06-structure](../06-structure/spec.ts), thickened pads centered under each tank and widened 6" to carry the drains.

**Tank curtains (`curtain-tank-west` / `curtain-tank-east`).** Insulated roll-up backing on the north face of each tank — projector-screen style: **closes down**, **opens up** into a housing at the tank top. **West:** black exterior, **white interior** (room-facing), doubling as the living-room projection screen; **east:** black both sides. Closed, the full north face is covered to help retain collected heat; open, more of the north face is exposed so light can pass through the tank into the room. **Modeled:** west **75% closed**, east **75% open** — in [spec.ts](./spec.ts).

## Scope

- Structural support (slab thickening, frames, tie to building)
- Tank material and construction (poured concrete, welded steel, lined wood, modular HDPE)
- Waterproofing, access ports, maintenance, leak detection
- Thermal coupling to room air (exposed surface area vs. insulation)
- Optional hydronic coils for active heat exchange
- Fill water source (municipal, rainwater, both)
- Condensation and humidity at glass interface
- Seismic restraints if applicable
- Lifecycle (algae, treatment if potable, freeze protection if ever unconditioned)

## Open questions

- [ ] Potable storage vs. heating-only dead water?
- [ ] Tank wall thickness and finish (exposed aesthetic inside)?
- [ ] Top of tank: open, covered, planted, walkway?
- [ ] Earthquake / slosh bracing?
- [ ] Is 3,360 gal sufficient mass for 1,500 sq ft in target climate?

## Deliverables

- [ ] Tank layout on south wall (dimensioned)
- [ ] Structural load path to foundation
- [ ] Material comparison matrix (cost, lifespan, risk)
- [ ] Thermal mass sanity check (time constant, daily swing damping)
- [ ] Detail: tank-to-slab, tank-to-glazing, expansion joint
- [ ] Maintenance and inspection plan

## Viability

See [viability.md](./viability.md) — thermal performance, structural load, leak risk, maintenance.

## Design process

- `drawings/` — tank plan, sections, connection details
- `models/` — tank placement in south buffer zone

## Feeds

- [06-structure](../06-structure/) — point loads
- [07-mechanical](../07-mechanical/) — optional hydronic, humidification
- [08-systems](../08-systems/) — rainwater tie-in
- [09-compliance](../09-compliance/) — structural, plumbing, health if potable
