"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import NoSSRWrapper from "@/components/dynamicWrapper";

import { selectWidgets, updateWidgets } from "@/lib/features/widgets/widgetsSlice";

import WidgetRow from "@/components/layout/widgetRow";

import type { WidgetRowType } from "@/lib/features/widgets/widgetsSlice";


export default function IndexPage() {
  const widgets = useAppSelector(selectWidgets);

  const dispatch = useAppDispatch();

  function changeHandler(data, position) {
    const updatedWidgets: WidgetRowType = [...widgets];
    updatedWidgets[position] = data;
    dispatch(updateWidgets(updatedWidgets));
  }

  return (
    <NoSSRWrapper>
      {widgets.map((widget, i) => {
        return (
          <WidgetRow key={i} data={widget} position={i} changeHandler={changeHandler}/>
        )
      })}
   </NoSSRWrapper>
  );
}
