export default function Skills({ skills }){
    return (
        <div className="skills">
            {skills?.map(curr => ( 
                curr === null ? "" : <div key={curr.skill}>{curr.skill + " Lvl. " + curr.level}</div>
            ))}
        </div>
    )
}