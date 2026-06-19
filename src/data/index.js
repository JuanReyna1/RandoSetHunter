import rawArmor from './Armor.json'
import rawDeco from './Accessory.json'
import talisman_layouts from './talisman_layouts.json'
import talisman_groups from './talisman_skill_groups.json'

function transformArmor(){
    return rawArmor.map(set => ({
        game_id : set.game_id,
        name : set.names.en,
        rarity : set.rarity,
        setBonus : set.set_bonus,
        setBonusId : set.set_bonus_id,
        groupBonus : set.group_bonus,
        groupBonusId : set.group_bonus_id,
        pieces : set.pieces,
    }))
}

export const decos = rawDeco.map(deco => ({
    names : deco.names,
    level : deco.level,
    skills : deco.skills,
    allowed_on : deco.allowed_on
}))

export const armor = transformArmor()

export const categorized = armor.reduce((acc, set) => {
    set.pieces.forEach(piece => {
        acc[piece.kind].push({ 
                ...piece, 
                setBonusId : set.setBonusId,
                groupBonusId : set.groupBonusId,
                setBelong : set.game_id,
                rarity : set.rarity
            }
        );
    });
    return acc;
    }, { head: [], chest: [], arms: [], waist: [], legs: [] });


const groupedDecos = decos.reduce((acc, deco) => {
        acc[deco.allowed_on].push(deco)
        return acc
    }, { weapon : [], armor : [] });

const sortedWeaponDecos = groupedDecos["weapon"].reduce((acc, deco) => {
    acc[deco.level].push(deco)
    return acc
}, { 1 : [], 2: [], 3 : []})

const sortedArmorDecos = groupedDecos["armor"].reduce((acc, deco) => {
    acc[deco.level].push(deco)
    return acc
}, { 1 : [], 2: [], 3 : []})

export function totalArmor(level){
    console.log(sortedArmorDecos[level].length)
}

const sortedDecos = {
    weapon : sortedWeaponDecos,
    armor : sortedArmorDecos
}

export function rng(min = 0, max){
    return Math.floor( Math.random() * (max - min) + min)
}

export function randomDeco(type, level){
    const trueLevel = rng(0, level) + 1
    const chosenDecos = sortedDecos[type][trueLevel]
    const length = chosenDecos.length
    const randomNum = rng(0, length)
    return chosenDecos[randomNum]
}

export function randomPiece(type) {
    const options = categorized[type];
    return options[rng(0, options.length)];
}

export function randomTalisman(){
    return { ...talisman_layouts[rng(0,talisman_layouts.length)] }
}

const groups = ["skill1Group", "skill2Group", "skill3Group"]

function getSkill(groupNum){
    if(groupNum === null) return null
    const group = talisman_groups[groupNum]
    return group[rng(0, group.length)]
}

export function randomizeTalisSkills(talisman){
    return groups.map(group => getSkill(talisman[group]))
}

export function randTalisDecos(combo){
    return combo.map(slot => slot === "W1" ? randomDeco('weapon', 1) : randomDeco('armor', slot))
}