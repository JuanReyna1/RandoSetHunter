export default function SetPiece({pieceName = "None"}){
    return(
        <div>
            <table border={5}>
                <tr>
                    <th>{pieceName}</th>
                </tr>
                <tr>
                    <td>{pieceName}</td>
                </tr>
            </table>
        </div>
    )
}