import rawBow from './Bow.json'
import rawChargeBlade from './ChargeBlade.json'
import rawDualBlades from './DualBlades.json'
import rawGreatSword from './GreatSword.json'
import rawGunlance from './Gunlance.json'
import rawHammer from './Hammer.json'
import rawHeavyBowgun from './HeavyBowgun.json'
import rawHuntingHorn from './HuntingHorn.json'
import rawInsectGlaive from './InsectGlaive.json'
import rawLance from './Lance.json'
import rawLightBowgun from './LightBowgun.json'
import rawLongSword from './LongSword.json'
import rawSwitchAxe from './SwitchAxe.json'
import rawSwordShield from './SwordShield.json'



const rawWeapons = {
  'Bow': rawBow,
  'Charge Blade': rawChargeBlade,
  'Dual Blades': rawDualBlades,
  'Great Sword': rawGreatSword,
  'Gunlance': rawGunlance,
  'Hammer': rawHammer,
  'Heavy Bowgun': rawHeavyBowgun,
  'Hunting Horn': rawHuntingHorn,
  'Insect Glaive': rawInsectGlaive,
  'Lance': rawLance,
  'Light Bowgun': rawLightBowgun,
  'Long Sword': rawLongSword,
  'Switch Axe': rawSwitchAxe,
  'Sword & Shield': rawSwordShield
}

function transformWeapons(rawData) {
    return rawData.map(weapon => ({
        id: weapon.game_id,
        name: weapon.names.en,
        kind: weapon.kind,
        rarity: weapon.rarity,
        attack: weapon.attack_raw,
        affinity: weapon.affinity,
        defense: weapon.defense,
        slots: weapon.slots,
        sharpness: weapon.sharpness,
        handicraft: weapon.handicraft,
        phial: weapon.phial?.kind ?? null,
        skills: weapon.skills
    }))
}

function extractNamesByType(typeIn){
  return [...new Set(rawWeapons[typeIn].map(weapon => weapon.names.en))]
}

// Seperated types 
const weaponData = Object.fromEntries(
  Object.entries(rawWeapons).map(([type, data]) => [
    type,
    transformWeapons(data)
  ])
)

const allWeapons = Object.values(weaponData)

const artianNames = "Angelbein, Chrono Gear, Tiltkreise, Varianza, Argenesis, Moteurvankel, Greifen, Omiltika, Diprielcha, Skyscraper, Animilater, Dimensius, Mundus Altus, Verdoloto, Ostrak Oblivion, Eternal Cusp, Promised Abyss, Wicked Regnum, Headsman's Hamus, Auguring Omen, Limbo Llor, Calamitous Angel, Trembling Hels, Aether Pike, Bound Admonition, Bethorned Agony, Onyx Choros, Kyrie Verd"

export function isArtian(name){
  return artianNames.includes(name) || name.includes('Artian')
}

export function randomWeapon(){
  const type = Math.floor(Math.random() * allWeapons.length)
  const weapon = Math.floor(Math.random() * allWeapons[type].length)
  return allWeapons[type][weapon]
}