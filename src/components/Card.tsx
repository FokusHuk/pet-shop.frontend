import React from 'react';
import './Card.css';
import { CardItem } from './CardItem';
import { IPet } from '../interfaces';

interface CardProps {
    title: string,
    pets: IPet[],
    id: string,
    onChangeState(id: string, targetId: string): void
}

export const Card: React.FC<CardProps> = ({ title, pets, id, onChangeState }) => {

    const onDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    }

    const onDrop = (event: React.DragEvent) => {
        const id = localStorage.getItem("dndId");
        localStorage.removeItem("dndId");
        if (id === null) return;
        
        onChangeState(id, event.currentTarget.id);
    }

    return (
        <div className='card'>
            <p className='card-title'>{title}</p>
            <hr />
            <div className='card-content' id={id} onDragOver={onDragOver} onDrop={onDrop}>
                 {
                    pets.map(pet => <CardItem pet={pet} {...pet}/>)
                 } 
            </div>
        </div>
    )
}