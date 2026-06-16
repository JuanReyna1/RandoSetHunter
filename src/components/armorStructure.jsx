import SetPiece from "./SetPiece"

export function ArmorStructure({armor = []}){

    const armorPieces = [
        "Helmet",
        "Torso",
        "Arms",
        "Legs",
        "Boots"
    ]

    return (
        <div className='armor'>
            {armorPieces.map(piece => (
                <SetPiece pieceName={piece} />
            ))}
        </div>
    )
}

export default ArmorStructure