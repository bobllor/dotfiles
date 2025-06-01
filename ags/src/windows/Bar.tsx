import { Astal, Gtk, Gdk } from "astal/gtk3"
import Workspaces from "../widgets/Bar/left/Workspaces"
import IconButton from "../widgets/Bar/left/IconButton"
import BatteryW from "../widgets/Bar/right/BatteryW"
import Clients from "../widgets/Bar/center/Clients"
import Power from "../widgets/Bar/right/Power"
import SysTray from "../widgets/Bar/right/SysTray"


export default function Bar(monitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    return (
        <>
            <window
            className="Bar"
            gdkmonitor={monitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={TOP | LEFT | RIGHT}>
                <centerbox>
                    <box hexpand halign={Gtk.Align.START}>
                        <IconButton />
                        <Workspaces />
                    </box>
                    <box>
                        <Clients />
                    </box>
                    <box halign={Gtk.Align.END}>
                        <SysTray />
                        <BatteryW />
                        <Power />
                    </box>
                </centerbox>
            </window>
        </>
    )
}