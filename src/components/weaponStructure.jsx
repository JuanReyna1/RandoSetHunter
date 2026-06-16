import DecoSlots from "./DecoSlots"

export default function WeaponStructure({weapon = {}, slotted = []}){
    return (
        <div>
            <table border={5}>
                <thead>
                    <tr>
                        <th>Weapon</th>
                        <th>Deco Slots</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{weapon ? weapon.name : "Empty"}</td>
                        <td>
                            <DecoSlots slotted={slotted} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}