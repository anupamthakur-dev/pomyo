import { create } from "zustand";

export type TodoPanel = {
    isTodoPanel:boolean,
   close:()=>void,
   open:()=>void,
   toggle:()=>void
}

export const useTodoPanel = create<TodoPanel>((set)=>{
    const openPanelOnLoad = window.innerWidth > 1024;
    
 return {   isTodoPanel:openPanelOnLoad,
    close : ()=> set({isTodoPanel:false}),
    open : ()=> set( {isTodoPanel:true}),
    toggle : ()=> set((state)=>({isTodoPanel:!state.isTodoPanel}))}
})