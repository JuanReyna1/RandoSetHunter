import SetPiece from "./SetPiece"
import DecoSlots from "./DecoSlots"

export function ArmorStructure({ armor = {}, slotted = {} }) {
    return (
        <div className='armor'>
            {Object.entries(armor).map(([key, value]) => (
                <div key={key}>
                    <table border={5}>
                        <thead>
                            <tr>
                                <th>{key}</th>
                                <th>Deco Slots</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {value.names.en}
                                </td>
                                <td>
                                    <DecoSlots slotted={slotted[key]} />    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}

export default ArmorStructure