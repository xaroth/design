import type { Item } from '../ItemCard/items.ts'

const uncounted = (text: string) => ({ text, counted: false })

export const socket = 'Socket near Heart of Oak'

export const sockets = [socket, 'Socket near Iron Reflexes', 'Socket near Resolute Technique']

export const rareJewel: Item = {
  rarity: 'rare',
  name: 'Vengeance Glimmer',
  base: 'Crimson Jewel',
  mods: ['7% increased maximum Life', '+12% to Fire Resistance', uncounted('14% increased Physical Damage with Axes')],
}

export const timelessJewel: Item = {
  rarity: 'unique',
  name: 'Glorious Vanity',
  base: 'Timeless Jewel',
  mods: [
    'Bathed in the blood of 4512 sacrificed in the name of Doryani',
    'Passives in radius are Conquered by the Vaal',
    uncounted('Historic'),
  ],
}

export const pastedJewel = `Rarity: Rare
Vengeance Glimmer
Crimson Jewel
--------
Item Level: 84
--------
7% increased maximum Life
+12% to Fire Resistance
14% increased Physical Damage with Axes`

export const versions = ['Glorious Vanity', 'Lethal Pride', 'Brutal Restraint', 'Militant Faith', 'Elegant Hubris']

export const conquerors = ['Doryani', 'Xibaqua', 'Ahuana']

export type NodeChange = {
  from: string
  to?: string
  lines: string[]
  kind?: 'Keystone' | 'Notable'
  allocated?: boolean
}

// What each node in the socket's radius becomes under one seed. Small nodes either change or gain lines.
export const becomes = (seed: number): NodeChange[] => [
  {
    from: 'Unwavering Stance',
    to: 'Corrupted Soul',
    kind: 'Keystone',
    lines: [
      '50% of Non-Chaos Damage taken bypasses Energy Shield',
      'Gain 15% of Maximum Life as Extra Maximum Energy Shield',
    ],
  },
  {
    from: 'Heart of Oak',
    to: seed === 4512 ? 'Ritual of Might' : 'Ritual of Flesh',
    kind: 'Notable',
    allocated: true,
    lines: ['20% increased Melee Damage', '+18% to Melee Critical Strike Multiplier'],
  },
  {
    from: 'Bone Breaker',
    to: 'Thaumaturgical Aptitude',
    kind: 'Notable',
    allocated: true,
    lines: ['Gain 8% of Physical Damage as Extra Chaos Damage'],
  },
  {
    from: 'Golem’s Blood',
    to: 'Revitalising Winds',
    kind: 'Notable',
    lines: ['8% increased Movement Speed', '1.2% of Life Regenerated per second'],
  },
  { from: 'Strength', allocated: true, lines: ['+4% to Chaos Resistance'] },
  { from: 'Armour', to: 'Chaos Resistance', allocated: true, lines: ['+7% to Chaos Resistance'] },
  { from: 'Life', lines: ['4% increased maximum Life'] },
]

export type Wanted = { name: string; kind: 'Notable' | 'Stat'; weight: number; min?: number }

export const wanted: Wanted[] = [
  { name: 'Ritual of Might', kind: 'Notable', weight: 10 },
  { name: '% increased maximum Life', kind: 'Stat', weight: 2, min: 8 },
  { name: '% to Chaos Resistance', kind: 'Stat', weight: 1 },
]

export const wantable = [
  'Ritual of Flesh',
  'Revitalising Winds',
  '% increased Melee Damage',
  '% increased Movement Speed',
]

export type Result = { seed: number; score: number; gives: string }

export const results: Result[] = [
  { seed: 4512, score: 46, gives: 'Ritual of Might; 12% maximum Life; 11% Chaos Resistance' },
  { seed: 7088, score: 41, gives: 'Ritual of Might; 10% maximum Life; 6% Chaos Resistance' },
  { seed: 1290, score: 38, gives: 'Ritual of Might; 8% maximum Life; 12% Chaos Resistance' },
  { seed: 3366, score: 30, gives: 'Ritual of Might; 9% maximum Life' },
  { seed: 6015, score: 24, gives: '12% maximum Life' },
]

export const seedRange = { min: 100, max: 8000 }
