# Decision log

Record major design decisions here so downstream folders stay consistent.

Format: **Date | Decision | Rationale | Impacts**

---

| Date | Decision | Rationale | Impacts |
|------|----------|-----------|---------|
| 2026-07-01 | South facade is **60'**; tanks are **15' wide each** along that wall (30' total, half coverage) | Corrects initial width/length confusion — long edge faces south | 03-passive-solar, 04-water-tanks, 05-floor-plan |
| 2026-07-01 | Insulation-first envelope, not mass walls | User direction — conventional build | 02-envelope, 06-structure |
| 2026-07-01 | Thermal mass via interior water tanks behind glass | Core design concept | 04-water-tanks, 03-passive-solar, 07-mechanical |
| 2026-07-01 | Gentle south-facing slope; south (glass) side is low/downhill, north (rear) wall partially bermed into grade | Thermal buffer + wind protection on cold north side; south stays fully sun-exposed; drains downhill | 01-site, 06-structure, 02-envelope, 03-passive-solar |
| 2026-07-01 | **South flush with grade; north ~3' below grade** on 12% slope; monolithic slab + thickened tank pads + north retaining stem | User direction; level finish floor with passive-solar south exposure; north berm retained by `stem-north` | 01-site, 06-structure, 04-water-tanks |
| 2026-07-02 | Tanks **centered on each 30' half** (x 15 & 45); **front face butts the glass** (tank = glazing plane); **6" perimeter drain on 3 interior sides** (no south drain) | User direction — symmetric layout, plumbing/leak capture; tank pads moved + widened to match | 04-water-tanks, 06-structure, 03-passive-solar, 05-floor-plan |
| 2026-07-02 | **Full 60' south glazing**; tanks cover 30'; **centered glass entry door** in 15' bay between tanks; **6 south posts + eave header** frame the facade (roof not modeled yet) | User direction — structural independence from tanks; roof/overhang deferred | 03-passive-solar, 06-structure, 05-floor-plan |
| 2026-07-02 | **NE service core:** bath in NE corner; utility west of 3' hall (3' inset from north); kitchen west of shared wet wall (`wall-wet-north`) | User direction — east-side service cluster; wet wall stacks kitchen / utility / bath | 05-floor-plan, 07-mechanical |
| 2026-07-02 | Viewer **camera up = +Z** so plan/orbit views align with spec (+X east, +Z north) | East/west were mirrored on screen with default Y-up camera | viewer |
| 2026-07-02 | **Removed** NE service core partitions from model — redo layout later | Prior floor-plan geometry cleared after E/W viewer fixes | 05-floor-plan |
| 2026-07-02 | **NE bathroom:** 8'×8' in NE corner; **wet wall = south partition** (`wall-bath-wet-south`); **door on west wall**, swings west (`opening-bath-door`) | User direction — first room in east-side service core | 05-floor-plan, 07-mechanical |
| 2026-07-02 | **Hall widened to 5'** (z 20–25); **utility barn sliding doors** (`opening-util-barn-doors`, 6'×7') from hall on `wall-hall-south` | User direction — comfortable hall width; barn-style util entry | 05-floor-plan |
| 2026-07-02 | **Service core west edge at x 40** — utility, hall, kitchen, and wet wall all align (20' wide service block + 8' bath) | User direction — shrink west column together, no orphan gap | 05-floor-plan |
| 2026-07-02 | **Target site: Rapid City, SD / Black Hills**; design latitude **44.08°N** | User direction — narrows passive-solar geometry; band 43.75°–44.5°N is ±1" on overhang | 01-site, 03-passive-solar, 09-compliance |
| 2026-07-02 | **South roof cantilever P = 4.5'** (54"); sloped soffit parallel to roof (10'→12' over 25') | Solar study at 44.08°N — full summer-noon shade; bias cooler for summer comfort; future **wood-stove** backup allows slightly less winter passive gain | 03-passive-solar, 06-structure |
| 2026-07-02 | **Eave extension 2'** on **north** roof edge only (no E/W structural eave) | North drip past berm; south uses 4.5' cantilever; E/W dropped — unsupported rake problem | 03-passive-solar, 06-structure |
| 2026-07-02 | **Interior floors: solid, darker finish** in south sun path | User direction — secondary slab thermal mass; darker color improves solar absorption; tanks remain primary mass | 05-floor-plan, 03-passive-solar, 06-structure |
| 2026-07-02 | **Backup heat: wood stove** (future addition) | User direction — reduces reliance on peak winter passive gain; supports longer south overhang without under-heating risk | 07-mechanical, 05-floor-plan |
| 2026-07-02 | **Roof structure:** 25' N–S span; **exposed 2×12 purlins** @ 8' o.c.; **outsulation** above deck (R-49–60); **standing seam** steel | Longevity + heavy snow; exposed wood ceiling saves drywall; insulation continuous above deck avoids thermal bridging | 06-structure, 02-envelope |
| 2026-07-02 | **South cantilever struts** to existing 6 posts (deferred in model); **exposed header-south** | Strength + beauty at glass line; struts outside air barrier | 06-structure |
| 2026-07-02 | **Ceiling purlins modeled** (`purlin-*`) — bottom layer of roof assembly | Exposed finished wood below; rake-to-rake with 2' E/W eaves; ~4' o.c. (not 8'); deck/insulation/steel to follow | 06-structure |
| 2026-07-02 | **No east/west structural roof overhang** — rake purlins on `header-west` / `header-east` | No legitimate need (passive solar, structure, snow); unsupported corners; fascia drip optional | 03-passive-solar, 06-structure |
| 2026-07-02 | Viewer **`roof` layer** added — purlins and future roof assembly separate from `structure` | Hide foundation/posts/headers while inspecting roof build-up | viewer, 06-structure |
| 2026-07-02 | **Structural roof deck modeled** (`roof-deck`) — 3/4" plywood on purlin tops | Continuous air barrier plane; outsulation + standing seam to follow | 06-structure |
| 2026-07-02 | **Rigid roof insulation modeled** (`roof-insulation`) — 9" polyiso outsulation above deck | ~R-54 continuous layer; avoids thermal bridging through purlins; standing seam to follow | 06-structure |
| 2026-07-02 | **Roof underlayment modeled** (`roof-underlayment`) — synthetic on outsulation | WRB under standing seam; continuous over rigid insulation | 06-structure |
| 2026-07-02 | **Standing seam steel modeled** (`roof-steel`) — 24ga dark finish on underlayment | Final roof cladding; outsulation assembly complete | 06-structure |
| 2026-07-02 | **Purlin cavity fill** (`roof-bay-*`) + **envelope dams** + rake/eave closures | Bays split into interior/cantilever/north-eave; S/N dams seal overhang plenums from conditioned space | 06-structure |
| 2026-07-02 | **NW server room:** **12'×10'** (x 0–12, z 15–25); **all house electrical** on west wall; **2× 42U racks** on north wall; **dedicated mini-split** on north wall (`hvac-server-minisplit-head`); solid door south into living | User direction — IT + main panel/inverter/PV gear isolated from open plan; 4' rack pair + 4' service aisle + west gear wall; separate HVAC for continuous cooling | 05-floor-plan, 07-mechanical, 08-systems |
| 2026-07-02 | **Server room closet:** **4'×10'** (x 12–16, z 15–25) **east of server room**; **`wall-server-east`** shared; door **`opening-closet-door`** on east wall into open living | User direction — storage outside server room, east-facing access | 05-floor-plan |
| 2026-07-02 | **Bedroom nook:** **12'×10'** (x 18–30, z 15–25) east of closet; **`wall-bedroom-float`** south + **`wall-bedroom-east`** fourth wall; **`opening-bedroom-barn-door`** (4'×7' single barn door near north end); rail hardware (`hardware-bedroom-barn-rail-*`) lets the door slide south to open | User direction — enclosed sleeping nook with one sliding barn door on rails | 05-floor-plan |
| 2026-07-02 | **Tank curtains** (`curtain-tank-west` / `curtain-tank-east`) — insulated roll-up on tank north face; **projector-screen style** (closes down, opens up); west **black exterior / white interior**, east **black both sides**; west **75% closed**, east **75% open** | User direction — closed retains tank heat; open admits light through tank to interior; west interior white for room-facing surface | 04-water-tanks, 03-passive-solar |
| 2026-07-02 | **Living projector:** wall-mounted shelf on `wall-bedroom-float`, centered at x 15; projector faces south to `curtain-tank-west` | User direction — the white room-facing backing on the west tank curtain doubles as the projector screen | 05-floor-plan, 04-water-tanks |

---

## Pending decisions

- [ ] Site / jurisdiction (county, parcel — region locked to Rapid City / Black Hills)
- [ ] Tank construction material
- [x] ~~Use of remaining 30' south glazing (no tank)~~ — 7.5' ends + 15' entry bay with centered glass door
- [x] ~~Entry location~~ — centered glass door, south facade x 28.5–31.5
- [ ] Second bathroom — yes/no and placement
- [ ] Wood stove location and flue path (deferred)
- [ ] House HVAC strategy (server room has dedicated mini-split; living/service TBD)
