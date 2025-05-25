import {exec, subprocess} from "astal/process"
import { Variable, bind } from "astal"
import { Astal, Gtk, Gdk } from "astal/gtk3"

export default function PowerMenu(monitor: Gdk.Monitor, showMenu: Variable<boolean>){
  const { TOP } = Astal.WindowAnchor;
  
  return (
    <>
        <window
        gdkmonitor={monitor}
        anchor={TOP}
        visible={showMenu()}>
            <box>
                <button
                onClick={() => showMenu.set(!showMenu.get())}>
                  <label>Hello!</label>
                </button>
            </box>
        </window>
    </>
  )
}

