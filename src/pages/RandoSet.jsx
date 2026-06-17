import SetPiece from "../components/SetPiece"
import ArmorStructure from "../components/armorStructure"
import { useState, useEffect } from 'react'
import Button from "../components/Button"
import { randomPiece, randomDeco } from '../data/index'
import { randomWeapon, isArtian } from '../data/weapons/index'
import WeaponStructure from "../components/weaponStructure"

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

    /**
     * Sets for containing all necessary data for the armor pieces and weapon itself
     * Seperate useState for ease of access to update the slots of the set
     */

    const [set, setSet] = new useState(defaultSet)
    const [slotted, setSlotted] = new useState(defaultSlotted)

   
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

        setSet(prev => ({
            ...prev,
            armor: newArmor,
            weapon: newWeapon
        }));

        setSlotted(prev => ({
            weaponSlotted : newWeapon.slots.map(level => randomDeco("weapon", level)) ?? [],
            armorSlotted: Object.entries(newArmor).reduce((acc, [key, piece]) => {
                acc[key] = piece.slots.map(level => randomDeco('armor', level))
                return acc
            }, { head: [], chest: [], arms: [], waist: [], legs: [] })
        }))
    }

    return(
        <div id='RandoSet'>
            <WeaponStructure weapon={set.weapon} slotted={slotted.weaponSlotted} />
            <ArmorStructure armor={set.armor} slotted={slotted.armorSlotted} />
            <Button onClick={ () => randomSet() }/>
            {
                useEffect(() => {
                    console.log(set)
                    console.log(slotted)
                    console.log(isArtian(set.weapon.name))
                }, [set, slotted])
            }
        </div>
    )
}

export default RandoSet