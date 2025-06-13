import { displayPanel } from "./support/panelVars"

export default function PanelButtons(){
    const panelElements: Array<ButtonInfo> = [
        {name: "wifiPanel", label: "Wifi", action: () => {}, hasMenu: true},
    ]

    return (
        <>
            {panelElements.map(ele => (
                <box className={"panel-buttons"}>
                    <button
                    onClick={ele.action}
                    label={ele.label}>
                    </button>
                    <button
                    onClick={() => displayPanel.set(ele.name)}>
                        <label label={'>'}/>
                    </button>
                </box>
            ))}
        </>
    )
}

type ButtonInfo = {
    name: string,
    label: string,
    action: () => void,
    hasMenu: boolean
}