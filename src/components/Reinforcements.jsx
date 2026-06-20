import { getRandomReinforcement } from "../data/weapons"

export default function Reinforcements( { isMelee } ){

    const buffs = getRandomReinforcement(isMelee)

    console.log(buffs)

    return (
        <div>
            <ul>
                { buffs.map((buff, index) => (
                    <li key={index}>{buff}</li>
                )) }
            </ul>
        </div>
    )
}