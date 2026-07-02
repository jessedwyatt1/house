# 05 — Floor plan

Interior **program, layout, wet walls, and circulation**.

## Building shell (for layout)

```
        ←────────── 60' (south wall) ──────────→

    S   ┌──────────────────────────────────────┐
    O   │  tank │  tank │   open glass zone    │  ~10' south
    U   │  15'  │  15'  │        30'           │  buffer
    T   ├──────────────────────────────────────┤
    H   │                                      │
        │         OPEN LIVING VOLUME             │  ~15' mid
        │                                      │
        ├──────────┬────┬───────────────┤
    N   │  SERVER  │CLST│ util / hall / │  BATH (NE)      │
        │  12'×10' │4×10│ laundry (east)│  8'×8'          │
        └──────────┴────┴───────────────┘
              25' depth
```

## Northwest server room (modeled in [spec.ts](./spec.ts))

```
z=25  ┌──────────┬────┬─────────────────┐  north shell
      │  SERVER  │CLST│    HALL   │ BATH│
z=20  │   ROOM   │4×10│     ├─────┤     │
      │ 12'×10'  │ →  │     │UTIL │     │
z=15  ├──────────┴────┴─────┴─────────┤
      │         KITCHEN                 │
z=10  └─────────────────────────────────┘
      │         open living             │
      0   12  16  40         52         60 → E
```

| Entity | Footprint | Notes |
|--------|-----------|-------|
| `zone-server-room` | **12' × 10'** (x 0–12, z 15–25) | NW corner; house electrical + IT |
| `zone-server-closet` | **4' × 10'** (x 12–16, z 15–25) | East of server room; door east |
| `wall-server-south-*` | x 0–12 at z 15 | South partition into open living; split around 3' door near west end |
| `wall-server-east-*` | x 12, z 15–25 | Server room / closet shared wall; split around south-half door |
| `wall-closet-south` | x 12–16 at z 15 | Closet south partition |
| `wall-closet-east-*` | x 16, z 15–25 | Closet east wall; split around north-half door |
| `opening-server-door` | 3' × 6'-8" on `wall-server-south-*` | Near west end; shown open into living |
| `opening-closet-south-door` | 2'-8" × 6'-8" on `wall-server-east-*` | South half; shown open west into server room |
| `opening-closet-north-door` | 2'-8" × 6'-8" on `wall-closet-east-*` | North half; shown open east, hinged at north jamb |
| `zone-bedroom` | **12' × 10'** (x 18–30, z 15–25) | Bedroom nook east of closet |
| `furn-bed-bedroom-*` | 60" × 80" queen bed | Head against south partition; centered in nook |
| `furn-nightstand-bedroom-*` | 20" × 16" pair | Flanking queen bed at headboard |
| `wall-bedroom-float` | x 18–30 at z 15 | South partition into open living |
| `wall-bedroom-east-*` | x 30, z 15–25 | East partition split around barn door opening |
| `opening-bedroom-barn-door` | 4' × 7' opening in east partition | Single barn door near north end; slides south on rail |
| `hardware-bedroom-barn-rail-*` | 8' rail + floor guide on east partition | Shows door travel from north opening to south pocket |
| `furn-gap-bookshelf-*` | 8' × 1' × 10' on bedroom south partition (x ~21–29, z ~14–15) | Floor-to-ceiling bookshelf on `wall-bedroom-float`; faces south |
| `furn-library-chair-*` | 2.5' chair at utility west wall (z ~16–18.5) | Seat + back; rotated 45° NW toward bookshelf |
| `furn-desk-server-*` | 72" × 32" desk + workstation on west wall | Riser + 2× 24" monitors; pad, keyboard, mouse; faces east |
| `furn-office-chair-desk-*` | 22" office chair | East of west-wall workstation; faces west |
| `furn-couch-service-*` | 12' × 8' L sectional on server/closet/bedroom partition | Main run faces south; 8' west return extends into living room |
| `furn-projector-shelf-*` / `equip-projector-*` | Wall shelf at x 15 on `wall-bedroom-float`; projector faces south | Aimed at `curtain-tank-west`, whose white room-facing backing doubles as the projection screen |

**Layout intent:** west wall = `panel-electrical-main` + `panel-electrical-spare`; **center of room** = `rack-server-1` + `rack-server-2` (walk-around on all sides); north wall = `hvac-server-minisplit-head` (see [07-mechanical](../07-mechanical/spec.ts)).

## Northeast service core (modeled in [spec.ts](./spec.ts))

```
z=25  ┌─────────────────────────────────┐  north shell
      │    HALL (5')   │   BATHROOM     │  bath door →
z=20  ├──────────┤                │  util barn doors ↓
      │ UTILITY  │  (bath cont.)  │
z=15  ├──────────┴────────────────┤  ← wet wall
      │         KITCHEN           │
z=10  └───────────────────────────┘
      │         open living       │
      40         52             60 → E
```

| Entity | Footprint | Notes |
|--------|-----------|-------|
| `zone-hallway` | **12'** × 5' (x 40–52, z 20–25) | Runs to bath partition |
| `zone-bathroom` | 8' × 10' (x 52–60, z 15–25) | East column; door west into hall |
| `zone-utility` | 12' × 5' (x 40–52, z 15–20) | Butts bath |
| `zone-kitchen` | **20'** × 5' (x **40–60**, z 10–15) | South band |
| `wall-wet-south` | x **40–60** at z 15 | Shared wet wall |
| `wall-util-west` | x 40, z 15–20 | Service core west edge |
| `wall-bath-west` | x 52 | East wall of utility + bath partition |
| `opening-util-barn-doors` | 6' × 7' on `wall-hall-south` | Barn-style sliding doors, hall → utility |

Kitchen west of x 35 not modeled yet.

## Floors

- **Solid finish** throughout (no carpet in the south solar zone)
- **Darker color** in the winter sun path — secondary slab thermal mass alongside water tanks
- Slab: 6" monolithic (`slab-main` in 06-structure); thickened under tanks and south edge

## Program (from concept)

### Primary
- One large open room (living, dining, work, flexible sleep)

### East side (TBD)
- Kitchen
- Wet wall shared with: bathroom, utility room, laundry

### Possible west side
- ~~Second wet wall → second bathroom~~ → **NW server room** (electrical + IT)

### To assign
- ~~Entry / mudroom~~ → centered south glass door (03-passive-solar)
- ~~Mechanical / electrical space~~ → NW server room
- Storage
- Placement of 30' non-tank south glazing relative to living vs. entry

## Open questions

- [x] ~~Which 30' of south wall gets tanks~~ — centered on each 30' half (04-water-tanks)
- [ ] Service core side and layout (kitchen, bath, utility, wet wall)
- [ ] Single bath sufficient initially?
- [ ] Utility + laundry footprint (stacked vs. side-by-side)
- [ ] Need for closet / pantry / mudroom dimensions
- [x] ~~Future bedroom — partition now or reserve wall chase?~~ → **Bedroom nook** with single barn sliding door (`opening-bedroom-barn-door`)

## Deliverables

- [ ] Schematic plan (dimensioned)
- [ ] Wet wall elevations (plumbing stacks)
- [ ] Furniture / zone diagram
- [ ] Door and window schedule (rough)
- [ ] Circulation and entry flow narrative

## Viability

Document in `viability.md` when ready: single open room livability; wet-wall stacking efficiency; entry placement vs. heat loss; second bath worth the chase space.

## Design process

- `drawings/` — floor plans, wet-wall elevations, furniture zones
- `models/` — spatial walkthrough model

## Depends on

- [04-water-tanks](../04-water-tanks/), [03-passive-solar](../03-passive-solar/)

## Feeds

- [07-mechanical](../07-mechanical/) — chase sizes, panel location
- [09-compliance](../09-compliance/) — egress, clearances, ADA if desired
