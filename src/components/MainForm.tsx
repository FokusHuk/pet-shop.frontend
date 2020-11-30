import React from 'react';
import { Card } from './Card';
import { getPets, getBalance, getCartPets, getCost, addToCart, removeFromCart, buyPets } from "../api";
import { useEffect, useState, useRef } from "react";
import { IPet } from '../interfaces';
import './MainForm.css';

function MainForm() {

    const [pets, setPets] = useState([] as IPet[]);
    const [cartPets, setCartPets] = useState([] as IPet[]);
    const [balance, setBalance] = useState(0);
    const [cost, setCost] = useState(0);

    const changeState = async (id: string, targetId: string) => {
        if (targetId === "cart") {
            await addToCart(id);
            const filteredPets = pets.filter(pet => pet.id != id);
            const movedPet = pets.filter(pet => pet.id == id);
            const newCartPets = cartPets.concat(movedPet);
            setPets(filteredPets);
            setCartPets(newCartPets);
        }
        else {
            await removeFromCart(id);
            const filteredCartPets = cartPets.filter(pet => pet.id != id);
            const movedPet = cartPets.filter(pet => pet.id == id);
            const newPets = pets.concat(movedPet);
            setPets(newPets);
            setCartPets(filteredCartPets);
        }

        const { totalCost } = await getCost();
        setCost(totalCost);
    }

    const onClickBuyBtn = async () => {
        await buyPets();

        const { totalCost } = await getCost();
        setCost(totalCost);
        
        const { balance } = await getBalance();
        setBalance(balance);

        setCartPets([]);
    }

    useEffect(() => {
        const ufGetPets = async () => {
            const pets = await getPets();
            setPets(pets);
        }
        ufGetPets();
    }, []);

    useEffect(() => {
        const ufGetCartPets = async () => {
            const cartPets = await getCartPets();
            setCartPets(cartPets);
        }
        ufGetCartPets();
    }, []);

    useEffect(() => {
        const ufGetBalance = async () => {
            const { balance } = await getBalance();
            setBalance(balance);
        }
        ufGetBalance();
    }, []);

    useEffect(() => {
        const ufGetCost = async () => {
            const { totalCost } = await getCost();
            setCost(totalCost);
        }
        ufGetCost();
    }, []);

    return (
        <div>
            <Card title='Товары' pets={pets} id="items" onChangeState={changeState} />
            <Card title='Корзина' pets={cartPets} id="cart" onChangeState={changeState} />
            <div className='stats'>
                <p className='balance'>Баланс: {balance}$</p>
                <p className='cost'>Стоимость: {cost}$</p>
                <button className='buy-btn' onClick={onClickBuyBtn}>Купить</button>
            </div>
        </div>
    )
}

export default MainForm;