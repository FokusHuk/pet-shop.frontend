import React from 'react';
import { IPet } from '../interfaces';
import './CardItem.css';

interface CardItemProps {
    pet: IPet
}

export const CardItem: React.FC<CardItemProps> = ({ pet }) => {

    const onDragStart = (event: React.DragEvent) => {
        localStorage.setItem("dndId", event.currentTarget.id);
      }
    
    return (
        <div className='card-item' id={pet.id} draggable='true' onDragStart={onDragStart}>
            <span className='card-item-name'>{pet.name}</span>
            <span className='card-item-price'>{pet.price}</span>
            <p className='card-item-description'>{pet.description}</p>
        </div>
    )
}