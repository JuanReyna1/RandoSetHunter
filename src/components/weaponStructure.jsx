import DecoSlots from "./DecoSlots"
import { getRandomFocus, getRandomReinforcement } from "../data/weapons"
import Reinforcements from "./Reinforcements"

export default function WeaponStructure({weapon = {}, slotted = []}){
    const isGog = weapon.isGog
    const isArtian = weapon.isArtian
    const isMelee = Object.hasOwn(weapon, "sharpness")
    return (
        <div>
            <table border={5}>
                <thead>
                    <tr>
                        <th>Weapon</th>
                        <th>Deco Slots</th>
                        {(isArtian || isGog) && <th>Reinforcements</th>}
                        {weapon.isGog && <th>Focus</th>}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{weapon ? weapon.name : "Empty"}</td>
                        <td>
                            <DecoSlots slotted={slotted} />
                        </td>
                        {(isArtian || isGog) && <td><Reinforcements isMelee={isMelee} /></td>}
                        {isGog && <td>{getRandomFocus()}</td>}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}