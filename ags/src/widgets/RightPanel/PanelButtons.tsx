import { displayPanel } from "./support/panelVars"

export default function PanelButtons(){
    const actions: Array<{name: string, label: string}> = [
        {name: "wifiPanel", label: "Wifi"},
    ]

    return (
        <>
            {actions.map(action => (
                <button
                label={action.label}
                name={"panel-buttons"}
                onClick={() => displayPanel.set(action.name)}>
                </button>
            ))}
        </>
    )
}