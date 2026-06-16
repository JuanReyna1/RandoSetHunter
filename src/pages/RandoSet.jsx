import SetPiece from "../components/SetPiece"
import ArmorStructure from "../components/armorStructure"
import { useState, useEffect } from 'react'
import Button from "../components/Button"
import { randomPiece, randomDeco } from '../data/index'
import { allWeapons, randomWeapon, weaponData } from '../data/weapons/index'
import WeaponStructure from "../components/weaponStructure"

function RandoSet(){

    const defaultSet = {
        armor : { head: {}, chest: {}, arms: {}, waist: {}, legs: {} },
        weapon : {}
    }

    const defaultSlotted = {
        weaponSlotted : [],
        armorSlotted : []
    }

    const [set, setSet] = new useState(defaultSet)
    const [slotted, setSlotted] = new useState(defaultSlotted)

    function randomSet(){
        setSet(prev => ({
            ...prev,
            armor: {
            head: randomPiece("head"),
            chest: randomPiece("chest"),
            arms: randomPiece("arms"),
            waist: randomPiece("waist"),
            legs: randomPiece("legs"),
            },
            weapon: randomWeapon()
        }));

        setSlotted(prev => ({
            weaponSlotted : set.weapon?.slots?.map(slot => randomDeco("weapon", slot)) ?? []
            //armorSlotted : set.armor.slots.map(slot => rand)
        }))
    }

    return(
        <div id='RandoSet'>
            <h1>Test</h1>
            <WeaponStructure weapon={set.weapon} slotted={slotted.weaponSlotted} />
            <ArmorStructure armor={set.armor}/>
            <Button onClick={ () => randomSet() }/>
            {
                useEffect(() => {
                    console.log(set)
                    console.log(slotted)
                }, [set, slotted])
            }
        </div>
    )
}

export default RandoSet