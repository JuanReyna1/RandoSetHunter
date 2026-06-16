export default function Button({onClick}){
    return (
        <div>
            <button onClick={(e) => onClick()}>Random Set</button>
        </div>
    )
}