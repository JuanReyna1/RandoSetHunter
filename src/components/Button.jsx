export default function Button({onClick}){
    return (
        <div>
            <button onClick={(e) => onClick()}>Click Here</button>
        </div>
    )
}