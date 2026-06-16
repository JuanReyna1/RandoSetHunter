export default function WeaponStructure({weapon = {}}){
    return (
        <div>
            <table border={5}>
                <thead>
                    <tr>
                        <th>Weapon</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{weapon ? weapon.name : "Empty"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}