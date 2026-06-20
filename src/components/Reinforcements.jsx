import { getRandomReinforcement } from "../data/weapons"

export default function Reinforcements( { isMelee } ){

    const buffs = getRandomReinforcement(isMelee)

    return (
        <div>
            <ul>
                { buffs.map(buff => {
                    <li>{buff}</li>
                }) }
            </ul>
        </div>
    )
}