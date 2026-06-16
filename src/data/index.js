import rawArmor from './Armor.json'

function transformArmor(){
    return rawArmor.map(set => ({
        name : set.names.en,
        rarity : set.rarity,
        setBonus : set.set_bonus,
        setBonusId : set.set_bonus_id,
        groupBonus : set.group_bonus,
        groupBonusId : set.group_bonus_id,
        pieces : set.pieces,
    }))
}

export const armor = transformArmor()

export const categorized = armor.reduce((acc, set) => {
    set.pieces.forEach(piece => {
        acc[piece.kind].push(piece, {
                setBonusId : set.setBonusId,
                groupBonusId : set.groupBonusId
            }
        );
    });
    return acc;
    }, { head: [], chest: [], arms: [], waist: [], legs: [] });

export function randomPiece(type) {
    const options = categorized[type];
    return options[Math.floor(Math.random() * options.length)];
}
