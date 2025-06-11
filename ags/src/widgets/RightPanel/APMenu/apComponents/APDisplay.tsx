import { Binding } from "astal"
import { getIcon } from "../support/apUtils"
import { currentSSID } from "../../support/panelVars";
import { Gtk } from "astal/gtk3";

export default function APDisplay(ssid: string, strBind: Binding<number>): JSX.Element{
    return (
        <>  
            <box
            orientation={1}
            valign={Gtk.Align.START}>
                <label
                className={"ap-info-icon"} 
                label={strBind.as(str => {
                    return getIcon(4, str);
                })}></label>
            </box>
            <box
            orientation={1}>
                <label halign={Gtk.Align.START}>{ssid}</label>
                {ssid == currentSSID.get() && 
                <label halign={Gtk.Align.START}>Connected</label>}
            </box>
        </>
    )
}