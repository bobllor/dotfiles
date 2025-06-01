import Hyprland from "gi://AstalHyprland"
import { bind } from "astal"

export default function Clients(){
    const hypr = Hyprland.get_default();
    const client = bind(hypr, "focusedClient");

    return (
        <>
            <box>
                {client.as(c => (
                    c ?
                    <label>{bind(c, "class").as(String)}</label>
                    :
                    <label label={"desktop"}></label>
                ))}
            </box>
        </>
    )
}