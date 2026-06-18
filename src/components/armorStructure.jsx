import SetPiece from "./SetPiece"
import DecoSlots from "./DecoSlots"

export function ArmorStructure({ armor = {}, slotted = {}, handleTranscend, transcended = {} }) {
    return (
        <div className='armor'>
            {Object.entries(armor).map(([key, value]) => (
                <div className='pieces' key={key}>
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
                                    {
                                        value.rarity >= 5 && value.rarity <=6 && 
                                        <div>
                                            <br></br>
                                            <label>Transcended</label>
                                            <input type="button" value={transcended[key] ? "Undo" : "Transcend"} onClick={
                                                (e) => {
                                                    console.log(key)
                                                    handleTranscend(key)
                                                }
                                            }
                                            ></input>
                                        </div>
                                    }
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