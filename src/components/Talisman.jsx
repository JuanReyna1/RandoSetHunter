import DecoSlots from "./DecoSlots"
import Skills from "./Skills"

export default function Talisman({ talisman, internal }){
    return (
        <div className="talisman">
            <table border={5}>
                <thead>
                    <tr>
                        <th>
                            Talisman
                        </th>
                        <th>
                            Deco Slots
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Skills skills={internal.skills} />
                        </td>
                        <td>
                            <DecoSlots slotted={internal.decos} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}