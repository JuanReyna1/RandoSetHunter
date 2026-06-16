import SetPiece from "../components/SetPiece"
import ArmorStructure from "../components/armorStructure"
import { useState } from 'react'
import Button from "../components/Button"
import { armor, categorized, randomPiece} from '../data/index'
import { allWeapons, randomWeapon } from '../data/weapons/index'
import WeaponStructure from "../components/weaponStructure"

function RandoSet(){

    const defaultSet = {
        armor : { head: {}, chest: {}, arms: {}, waist: {}, legs: {} },
        weapon : {}
    }

    const [set, setSet] = new useState(defaultSet)
    const [te, setTe] = new useState()

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
    }

    return(
        <div id='RandoSet'>
            <h1>Test</h1>
            <WeaponStructure weapon={set.weapon} />
            <ArmorStructure armor={set.armor}/>
            <Button onClick={ () => randomSet() }/>
        </div>
    )
}

export default RandoSet