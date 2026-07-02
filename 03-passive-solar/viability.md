# Viability: south overhang and glazing (Rapid City / Black Hills)

**Status:** Decided (working numbers)
**Verdict:** Go — **4.5' south cantilever**, **2' north eave** (no E/W structural overhang), at **44.08°N**

## Question

How deep should the south roof cantilever be, and how far should eaves extend on the other sides, to admit winter sun on tanks and floor while keeping summer direct gain low?

## Constraints

- South glazing **10'** tall (floor to eave); roof **10' → 12'** over **25'** depth (4.6° pitch)
- Design latitude **44.08°N** (Rapid City); Black Hills band 43.75°–44.5°N changes overhang by ±1"
- High elevation (3,200–7,200 ft) increases solar intensity ~5–15% — favors slightly longer overhang
- **Wood stove** planned as backup heat — can trade a small amount of winter passive gain for summer comfort
- Summer preference: **ambient / diffuse** light; **no direct sun at solar noon** on the glazing
- Interior **solid dark floors** in sun path as secondary thermal mass (tanks remain primary)

## Solar noon sizing (sloped soffit)

Minimum south cantilever for full summer-noon shade of 10' glazing:

\[
P \geq \frac{H}{\tan\theta_{\text{roof}} + \tan\alpha_{\text{summer}}}
\]

At 44.08°N, summer solstice noon α ≈ **69.4°** → **P ≥ 3.65'**.

| P (south) | Summer noon | Winter noon | Winter floor penetration |
|-----------|-------------|-------------|--------------------------|
| 4.0' | 0% glazing lit | 80% lit | ~19.4' |
| **4.5'** *(chosen)* | **0%** | **78% lit** | **~18.8'** |
| 5.0' | 0% | 75% lit | ~18.2' |

**Chosen P = 4.5'** — full summer-noon shade with margin; winter still lights bottom **~7.8'** of 10' glass (tanks fully in direct sun); floor patch ~18.8' deep × 60' wide at winter solstice noon.

## Eave extensions

| Edge | Overhang | Notes |
|------|----------|-------|
| **South** | **4.5'** cantilever | Passive-solar shading — critical |
| **North** | **2'** | Drip line past bermed wall |
| **East / West** | **None** (structural) | Dropped — no strong need; unsupported corners; optional fascia drip |

South edge uses the **4.5' cantilever**, not a 2' eave. East/west 2' eaves were evaluated and removed (see decision log); morning/evening sun on 7.5' end bays is minor vs. the 60' south face.

## Summer off-noon caveat

A south overhang alone cannot block **all** direct summer beam. At P = 4.5', summer solstice **8–11 AM and 1–4 PM** still admit direct sun on the south glass (profile angle under the soffit). Solar **noon is fully shaded** — peak heat gain is blocked. Mitigations if needed later: lower-SHGC glass on non-tank bays, operable exterior shades, side fins.

## Monthly noon shading (P = 4.5')

| Month | Glazing in direct sun (noon) |
|-------|------------------------------|
| Dec–Feb | 70–80% |
| Mar, Oct–Nov | 58–67% |
| Apr, Aug | 29–39% |
| May | ~11% |
| Jun–Jul | **0%** |

## Verdict

**Go.** 4.5' south cantilever + 2' north eave at 44.08°N meets the design intent. Roof entity not yet in `spec.ts` — parameters ready for modeling.

## Next steps

- [ ] Add `roof-main` entity to `spec.ts` (`heelLow: 10`, `heelHigh: 12`, south cantilever 4.5', north eave 2')
- [ ] Glazing SHGC split: tank bays (high winter transmission) vs. open bays (lower SHGC)
- [ ] Optional: hourly sun-path drawing in `drawings/`
