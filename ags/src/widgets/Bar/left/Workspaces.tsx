import { bind } from "astal"
import Hyprland from "gi://AstalHyprland"

const WORKSPACES = 5;

function genButtons(id: number){
    const hypr = Hyprland.get_default();
    
    return (
        <>
            <button
            className={bind(hypr, "focusedWorkspace").as(ws =>
                {   
                    // on quick switching, ws is null. this prevents
                    // the error logs from popping up.
                    if (!ws) return "";

                    return ws.id == id && ws ? "is-focused" : "";
                }
            )}
            onClicked={() => hypr.dispatch("workspace", id.toString())}>
                <label>{id}</label>
            </button>
        </>
    )
}

export default function Workspaces() {
    const hypr = Hyprland.get_default();

    const workspaces = [...Array(WORKSPACES).keys()].map(id => genButtons(id + 1));

    return <box className="Workspaces">
        {workspaces.map(button => (
            button
        ))}
    </box>
}