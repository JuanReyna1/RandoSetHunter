import SetPiece from "./SetPiece"

export function ArmorStructure({ armor = {} }) {
    return (
        <div className='armor'>
            {Object.entries(armor).map(([key, value]) => (
                <div key={key}>
                    <table border={5}>
                        <thead>
                            <tr>
                                <th>{key}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{value?.names?.en ?? "Empty"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}

export default ArmorStructure