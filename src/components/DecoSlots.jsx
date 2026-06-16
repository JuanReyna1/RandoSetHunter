export default function DecoSlots({ slotted = [] }){
    return (
        <div>
            {slotted?.map((slot, index) => (
                <div key={index}>{slot.names.en}</div>
            ))
            ?? (<div>Empty</div>)
            }
        </div>
    )
}