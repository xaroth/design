import type { ItemModLine, ItemRarity } from '@xaroth.nl/design/parts'

export type Item = {
  rarity: ItemRarity
  name: string
  base?: string
  implicits?: ItemModLine[]
  mods?: ItemModLine[]
}

const uncounted = (text: string) => ({ text, counted: false })

// A Marauder's gear: every rarity, implicits, lines that do not count, and empty slots.
export const equipment: { slot: string; item?: Item }[] = [
  {
    slot: 'Weapon 1',
    item: {
      rarity: 'rare',
      name: 'Brood Edge',
      base: 'Siege Axe',
      mods: [
        'Adds 12 to 24 Physical Damage',
        '18% increased Attack Speed',
        '+31% to Global Critical Strike Multiplier',
        uncounted('+25 to Strength'),
      ],
    },
  },
  { slot: 'Weapon 2' },
  {
    slot: 'Helmet',
    item: {
      rarity: 'rare',
      name: 'Grim Visage',
      base: 'Eternal Burgonet',
      mods: [
        '+84 to maximum Life',
        '+40% to Cold Resistance',
        '+35% to Lightning Resistance',
        uncounted('+28 to Strength'),
      ],
    },
  },
  {
    slot: 'Body Armour',
    item: {
      rarity: 'unique',
      name: 'Kaom’s Heart',
      base: 'Glorious Plate',
      mods: [uncounted('Has no Sockets'), '+500 to maximum Life', '20% increased Fire Damage'],
    },
  },
  {
    slot: 'Gloves',
    item: {
      rarity: 'rare',
      name: 'Doom Knuckle',
      base: 'Titan Gauntlets',
      mods: ['+72 to maximum Life', '+38% to Fire Resistance', '+12% to Chaos Resistance'],
    },
  },
  {
    slot: 'Boots',
    item: {
      rarity: 'magic',
      name: 'Healthy Goliath Greaves of the Wind',
      base: 'Goliath Greaves',
      mods: ['+45 to maximum Life', uncounted('+22 to Dexterity')],
    },
  },
  {
    slot: 'Amulet',
    item: {
      rarity: 'rare',
      name: 'Rapture Locket',
      base: 'Agate Amulet',
      implicits: [uncounted('+18 to Strength and Intelligence')],
      mods: [
        '+62 to maximum Life',
        '+24% to Global Critical Strike Multiplier',
        uncounted('Allocates Heart of the Warrior'),
      ],
    },
  },
  {
    slot: 'Ring 1',
    item: {
      rarity: 'rare',
      name: 'Viper Turn',
      base: 'Two-Stone Ring',
      implicits: ['+14% to Fire and Cold Resistances'],
      mods: ['+55 to maximum Life', '+41% to Lightning Resistance'],
    },
  },
  { slot: 'Ring 2' },
  {
    slot: 'Belt',
    item: { rarity: 'normal', name: 'Leather Belt', base: 'Leather Belt', implicits: ['+34 to maximum Life'] },
  },
  { slot: 'Weapon 1 Swap' },
  { slot: 'Weapon 2 Swap' },
]

export const item = (slot: string): Item => {
  const found = equipment.find((e) => e.slot === slot)?.item
  if (!found) {
    throw new Error(`no item in ${slot}`)
  }
  return found
}

// Path of Building's item text, as pasted.
export const pastedText = `Rarity: RARE
Viper Turn
Two-Stone Ring
Implicits: 1
+14% to Fire and Cold Resistances
+55 to maximum Life
+41% to Lightning Resistance`
