"use client";

import { Characters } from "@/components/characters/Characters";

import { Senses } from "@/components/senses/Senses";
import { Condition } from "@/components/condition/Condition";
import { Skills } from "@/components/skills/Skills";
import { Abilities } from "@/components/abilities/Abilities";
import { SavingThrows } from "@/components/savingThrows/SavingThrows";

import { Languages } from "@/components/languages/Languages";

import NoSSRWrapper from "@/components/dynamicWrapper";

import { useState } from "react";

import { updateWidgetRows } from "@/lib/features/widgetRows/widgetRowsSlice";

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

const componentMapping = {
  Characters,
  Senses,
  Condition,
  Languages,
  Skills,
  Abilities,
  SavingThrows,
}

export default function Row({data, position, changeHandler}) {
    const [items, setItems] = useState(data);
    const sensors = useSensors(
        useSensor(PointerSensor),
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

                changeHandler(newArray, position);
                
                return newArray;
            });
        }
        
    }
  return (
    <NoSSRWrapper>
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
                const Component = componentMapping[id];
                return (
                    <SortableWidget key={id} id={id}>
                        <Component />
                    </SortableWidget>
                )
            })}
        </SortableContext>
        </div>
        </DndContext>
    </NoSSRWrapper>
  );
}
