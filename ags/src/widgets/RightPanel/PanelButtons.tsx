import { align } from "../../../globals/vars"
import { displayPanel } from "./support/panelVars"
import { panelElements, panelButtonIcons } from "./support/panelVars"

export default function PanelButtons(){
    const lengthLimit: number = 15;

    return (
        <>
            <box 
            spacing={5}
            orientation={1}
            halign={align.START}
            className={"panel-buttons"}>
                {panelElements.map(ele => (
                    <box
                    spacing={4}
                    className={"panel-button"}>
                        <box
                        className={"action-icon"}>
                            <button
                            halign={align.CENTER}
                            className={"primary"}
                            onClick={ele.action}>
                                <label
                                label={panelButtonIcons.get(ele.name)}
                                halign={align.CENTER}/>
                            </button>
                        </box>
                        <box
                        hexpand
                        halign={align.CENTER}
                        orientation={1}>
                            <label 
                            className={"meta-text"}
                            label={ele.meta}/>
                            <label 
                            className={"alt-text"}
                            label={ele.labelBind.as(str => {
                                return str.length > lengthLimit ? 
                                str.slice(0, lengthLimit) + '...' : str;
                            })}/>
                        </box>
                        <button
                        className={"secondary"}
                        onClick={() => displayPanel.set(ele.name)}>
                            <label label={''}/>
                        </button>
                    </box>
                ))}
            </box>
        </>
    )
}