import rawArmor from './Armor.json'
import rawDeco from './Accessory.json'

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
                setBelong : set.game_id
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

const sortedDecos = {
    weapon : sortedWeaponDecos,
    armor : sortedArmorDecos
}

export function randomDeco(type, level){
    const chosenDecos = sortedDecos[type][level]
    const length = chosenDecos.length
    const randomNum = Math.floor(Math.random() * length)
    return chosenDecos[randomNum]
}

export function randomPiece(type) {
    const options = categorized[type];
    return options[Math.floor(Math.random() * options.length)];
}
