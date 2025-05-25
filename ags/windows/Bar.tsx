import { Astal, Gtk, Gdk } from "astal/gtk3"
import Workspaces from "../widgets/Bar/Workspaces"


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
                        <Workspaces />
                    </box>
                </centerbox>
            </window>
        </>
    )
}