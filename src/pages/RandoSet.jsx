import SetPiece from "../components/SetPiece"
import ArmorStructure from "../components/armorStructure"
import { useState } from 'react'
import Button from "../components/Button"
import { armor, categorized, randomPiece} from '../data/index'


function RandoSet(){

    const defaultSet = {
        armor : { head: {}, chest: {}, arms: {}, waist: {}, legs: {} }
    }

    const [set, setSet] = new useState(defaultSet)
    const [te, setTe] = new useState()

    function randomSet(){
        setTe(randomPiece("head").names.en)
    }

    return(
        <div id='RandoSet'>
            <h1>Test</h1>
            <ArmorStructure />
            <h1>{te}</h1>
            <Button onClick={ () => randomSet() }/>
        </div>
    )
}

export default RandoSet