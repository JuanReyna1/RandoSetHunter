import SetPiece from "../components/SetPiece"
import ArmorStructure from "../components/armorStructure"
import { useState, useEffect } from 'react'
import Button from "../components/Button"
import { randomPiece, randomDeco, randomTalisman, totalArmor, randomizeTalisSkills, rng, randTalisDecos } from '../data/index'
import { randomWeapon, isArtian } from '../data/weapons/index'
import WeaponStructure from "../components/weaponStructure"
import Talisman from "../components/Talisman"

function RandoSet(){

    /**
     * Initial random default set for initial render
     */

    const defaultSet = {
        armor : {
            head: randomPiece("head"),
            chest: randomPiece("chest"),
            arms: randomPiece("arms"),
            waist: randomPiece("waist"),
            legs: randomPiece("legs"),
        },
        weapon : randomWeapon()
    }

    const defaultSlotted = {
        weaponSlotted : defaultSet.weapon?.slots?.map(level => randomDeco("weapon", level)) ?? [],
        armorSlotted : Object.entries(defaultSet.armor).reduce((acc, [key, piece]) => {
                acc[key] = piece.slots.map(level => randomDeco('armor', level))
                return acc
            }, { head: [], chest: [], arms: [], waist: [], legs: [] })
    }

    const defaultTranscendence = { head: false, chest: false, arms: false, waist: false, legs: false }
    const defaultOgSlots = Object.fromEntries(
                Object.entries(defaultSet.armor).map(([key, piece]) => [key, piece.slots])
            )
    const defaultTalisman = randomTalisman()
    const defaultCombo = defaultTalisman.possibleSlotCombos[rng(0,defaultTalisman.possibleSlotCombos.length)]
    console.log(defaultCombo)
    const defaultTalisSkills = {
        skills: randomizeTalisSkills(defaultTalisman),
        decos: randTalisDecos(defaultCombo)
    }

    /**
     * Sets for containing all necessary data for the armor pieces and weapon itself
     * Seperate useState for ease of access to update the slots of the set
     */

    const [set, setSet] = new useState(defaultSet)
    const [slotted, setSlotted] = new useState(defaultSlotted)
    const [transcended, setTranscended] = new useState(defaultTranscendence)
    const [ogSlots, setOgSlots] = new useState(defaultOgSlots)
    const [talisman, setTalisman] = new useState(defaultTalisman)
    const [talisInternals, setTalisInternals] = new useState(defaultTalisSkills)
   
    // Derived locally to avoid reading stale state in setSlotted
    
    function randomSet(){

        const newWeapon = randomWeapon()
        const newArmor = { 
            head: randomPiece("head"),
            chest: randomPiece("chest"),
            arms: randomPiece("arms"),
            waist: randomPiece("waist"),
            legs: randomPiece("legs"),
        }

        const newTalisman = randomTalisman()
        const combo = defaultTalisman.possibleSlotCombos[rng(0,defaultTalisman.possibleSlotCombos.length)]
        const newTalisSkills = {
            skills: randomizeTalisSkills(defaultTalisman),
            decos: randTalisDecos(combo)
        }

        updateTalisman(newTalisman)
        updateTalisSkills(newTalisSkills)

        const tempSlots = Object.fromEntries(
                Object.entries(newArmor).map(([key, piece]) => [key, piece.slots])
            )

        updateOgSlots(tempSlots)
        //console.log(tempSlots)

        const newWepSlots = newWeapon.slots.map(level => randomDeco("weapon", level)) ?? [];
        const newArmSlots = Object.entries(newArmor).reduce((acc, [key, piece]) => {
                acc[key] = piece.slots.map(level => randomDeco('armor', level))
                return acc
            }, { head: [], chest: [], arms: [], waist: [], legs: [] })
            

        updateSet(newArmor, newWeapon)
        updateSlotted(newArmSlots, newWepSlots)
        
    }

    function handleTranscend(kind){
        //updateTranscendence( { ...transcended, [kind]: !transcended[kind] } )
        !transcended[kind] ? transcend(kind) : unTranscend(kind)
    }

    //Decos to be reseted if armor piece is transcended

    function transcend(kind){

        const newArmor = { ...set.armor }
        const piece = { ...newArmor[kind] }
        let slots = piece.slots
        const rarity = piece.rarity
        if (rarity < 5 || rarity > 6) return;
        const maxSlotLength = rarity === 5 ? 3 : 2
        const maxSlotLevel = 3

        updateTranscendence( { ...transcended, [kind]: true } )

        slots = slots.map(level => Math.min(level + 1, maxSlotLevel))
            for(let i = slots.length; i < maxSlotLength; i += 1){
                slots.push(1)
            }

        //console.log(slots + " Rarity " + rarity)
        newArmor[kind] = { ...piece, slots }
        updateSet(newArmor, { ...set.weapon })

        const newPieceSlotted = randomizePieceSlots({ ...slotted.armorSlotted[kind] }, slots )
        //console.log(newPieceSlotted)
        updateSlotted( { ...slotted.armorSlotted, [kind]: newPieceSlotted }, [ ...slotted.weaponSlotted ] )

    }

    function unTranscend(kind){
        updateTranscendence( { ...transcended, [kind]: false } )
        const newArmor = {...set.armor, [kind] : { ...set.armor[kind], slots: ogSlots[kind] }}
        const newArmorSlotted = { ...slotted.armorSlotted, [kind] : randomizePieceSlots(kind, ogSlots[kind])}
        updateSet(newArmor, { ...set.weapon })
        updateSlotted(newArmorSlotted, [...slotted.weaponSlotted])
    }

    //Reusable for rerolling selective pieces

    function randomizePieceSlots(kind, slots){
        return slots.map(level => randomDeco('armor', level))
    }

    function updateSet(newArmor, newWeapon){
        setSet(prev => ({
            ...prev,
            armor: newArmor,
            weapon: newWeapon
        }));
    }

    function updateSlotted(newArmSlots, newWepSlots){
        setSlotted(prev => ({
            weaponSlotted : newWepSlots,
            armorSlotted: newArmSlots
        }))
    }

    function updateTranscendence(newTranscended){
        setTranscended(newTranscended)
    }

    function updateOgSlots(slots){
        setOgSlots(slots)
    }

    function updateTalisman(newTalisman){
        setTalisman(talisman)
    }

    function updateTalisSkills(newInternal){
        setTalisInternals(newInternal)
    }

    return(
        <div id='RandoSet'>
            <WeaponStructure weapon={set.weapon} slotted={slotted.weaponSlotted} />
            <ArmorStructure armor={set.armor} slotted={slotted.armorSlotted} handleTranscend={(kind) => handleTranscend(kind)} transcended={transcended} />
            <Talisman talisman={talisman} internal={talisInternals} />
            <Button onClick={ () => randomSet() }/>
            {
                useEffect(() => {
                    //console.log(set)
                    //console.log(slotted)
                    //console.log(isArtian(set.weapon.name))
                    //console.log({ ...slotted.weaponSlotted })
                    //console.log(set.armor.head.slots)
                    //console.log(ogSlots)
                    //console.log(talisman)
                    //console.log(talisInternals)
                }, [set, slotted])
            }
        </div>
    )
}

export default RandoSet