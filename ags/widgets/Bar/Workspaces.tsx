import { Variable, execAsync, bind } from "astal"
import Hyprland from "gi://AstalHyprland"

function moveWorkspace(id: number){
    execAsync(`hyprctl dispatch workspace ${id}`);
}

function genButtons(id: number){
    const hypr = Hyprland.get_default();
    
    return (
        <>
            <button
            className={bind(hypr, "focusedWorkspace").as(ws =>
                {   
                    // on quick switching, ws is null. this preventgs
                    // the error logs from popping up.
                    if (!ws) return "";

                    return ws.id == id && ws ? "is-focused" : "";
                }
            )}
            onClicked={() => moveWorkspace(id)}>
                <label>{id}</label>
            </button>
        </>
    )
}

export default function Workspaces() {
    const hypr = Hyprland.get_default();

    const workspaces = [...Array(5).keys()].map(id => genButtons(id + 1));

    return <box className="Workspaces">
        {workspaces.map(button => (
            button
        ))}
    </box>
}