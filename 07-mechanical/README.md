# 07 — Mechanical

**HVAC, ventilation, plumbing, electrical** — everything that makes the building habitable.

## Scope

### Ventilation
- ERV/HRV or balanced ventilation (tight insulated shell)
- Natural ventilation (operable windows, stack effect at high north ceiling)
- Humidity control near tank zone

### Heating / cooling
- Degree to which passive + water mass covers loads
- Backup: mini-split, radiant, wood stove, hydronic from tanks
- Distribution in open 60'×25' volume

### Plumbing
- Domestic cold/hot
- Drain/waste/vent for two wet walls
- Laundry, utility sinks
- Connection to tank water if used (potable vs. separate — see 04)

### Electrical
- **Main electrical:** NW server room (`zone-server-room`) — panel, PV inverter, battery on west wall
- Utility room: branch circuits only (laundry, kitchen)
- PV-ready conduit, battery location if off-grid
- Lighting plan for deep open room

### Server room HVAC
- **Dedicated mini-split** on north wall (`hvac-server-minisplit-head`) — independent of house HVAC
- Outdoor condenser (`hvac-server-minisplit-condenser`) on north exterior (bermed side)
- Sized for rack + inverter/panel heat load

### Server room equipment (modeled in [spec.ts](./spec.ts))

| Entity | Size / placement | Role |
|--------|------------------|------|
| `rack-server-1`, `rack-server-2` | 2' × 4' × 7' each; **centered in room** (x 4–8, z 18–22) | 42U floor racks; walk-around all sides |
| `panel-electrical-main` | 6' tall on west wall (z ~20) | House service, PV, loads |
| `panel-electrical-spare` | 4' tall on west wall (z ~17) | Future expansion capacity |
| `hvac-server-minisplit-head` | High on north wall above racks | Dedicated room cooling |
| `hvac-server-minisplit-condenser` | North exterior | Pairs with indoor head |

## Open questions

- [ ] Primary heat source?
- [ ] Cool climate: is cooling or dehumidification the bigger issue?
- [ ] ERV required by code in jurisdiction?
- [ ] Tank hydronic coils — active coupling worth it?
- [ ] Electric vs. gas appliances (kitchen, dryer, DHW)

## Deliverables

- [ ] Mechanical concept narrative
- [ ] Plumbing riser diagram (schematic)
- [ ] Electrical single-line (schematic)
- [ ] Equipment list with rough locations
- [ ] Balance between passive mass and mechanical backup

## Viability

Document in `viability.md` when ready: passive + tank mass vs. backup heat/cool sizing; ERV necessity; operating cost; hydronic coupling to tanks.

## Design process

- `drawings/` — riser diagrams, single-line, equipment layout on plan
- `models/` — optional MEP overlay on floor plan

## Depends on

- [01-site](../01-site/), [02-envelope](../02-envelope/), [05-floor-plan](../05-floor-plan/), [04-water-tanks](../04-water-tanks/)

## Feeds

- [09-compliance](../09-compliance/) — mechanical and electrical code
