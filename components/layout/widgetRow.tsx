"use client";

import { useEffect } from "react";

import { Languages } from "@/components/languages/Languages";

import NoSSRWrapper from "@/components/dynamicWrapper";

import { useState } from "react";

import {
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
  import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
  
import { SortableWidget } from "./sortableWidget";

import { ComponentPlaceholder } from "./componentPlaceholder";

const componentMapping = [
  'Senses',
  'Condition',
  'Languages',
  'Skills',
  'Abilities',
  'SavingThrows',
]

import { SmallButton } from "@/components/elements/SmallButton";

export default function WidgetRow({data, position, changeHandler}) {
    const orderData = data.map((item, i) => {
        return `${item}-${i}`;
    });

    const [items, setItems] = useState(orderData);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 0.01
            }
        }),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event) {
        const {active, over} = event;
        
        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                const newArray = arrayMove(items, oldIndex, newIndex);
                
                return newArray;
            });
        }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentItems = [...items];
        let newName = `${e.target.elements.type.value}-${items.length}`;
        if (currentItems.includes(newName)) {
            newName += `-${Math.floor(Math.random() * (9 - 1 + 1) + 1).toString()}`;
        }
        currentItems.push(newName);
        setItems(currentItems);
    }

    function deleteItem(id) {
        const currentItems = [...items];
        currentItems.splice(currentItems.indexOf(id), 1);
        setItems(currentItems);
    }

    useEffect(() => {
        const newItems = items.map((item, i) => {
            return item.split("-")[0];
        });
        changeHandler(newItems, position);
    }, [items]);

  return (
    <NoSSRWrapper>
         <form className="flex justify-center mb-4 mt-12" onSubmit={handleSubmit}>
            <div>
                <select className="border border-gray-300 mr-2" name="type">
                    {componentMapping.map((component, i) => {
                        return (
                            <option key={i} value={component}>{component}</option>
                        );
                    })}
                </select>
                <SmallButton text="Add"/>
            </div>
        </form>
        <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        >
            <div className="flex flex-wrap gap-2 justify-center">
                <SortableContext 
                    items={items}
                    strategy={rectSortingStrategy}
                >
                    {items.map((id, i) => {
                        const componentName = id.split("-")[0];
                        return (
                            <div key={id} className="relative parent-reveal">
                                <SortableWidget key={id} id={id}>
                                    <ComponentPlaceholder text={componentName} />
                                    <div className="child-hide absolute top-0 right-0" onClick={(e) => {deleteItem(id) }}><SmallButton text="X" color="red"/></div>
                                </SortableWidget>
                            </div>
                        )
                    })}
                </SortableContext>
            </div>
        </DndContext>
    </NoSSRWrapper>
  );
}
