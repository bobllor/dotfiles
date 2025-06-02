import { Variable, bind } from "astal"
import { Astal, Gtk, Gdk } from "astal/gtk3"
import Networking from "../widgets/RightMenu/Networking";
import AccessPoints from "../widgets/RightMenu/AccessPoints";
import { wifiEntry } from "../../globals/vars";

export default function RightSideMenu(monitor: Gdk.Monitor, showMenu: Variable<boolean>){
  const { TOP, RIGHT } = Astal.WindowAnchor;
  
  return (
    <>
        <window
        gdkmonitor={monitor}
        anchor={TOP | RIGHT}
        visible={showMenu()}>
            <box 
            orientation={1}
            className={"right-menu"}>
                <Networking />
                <AccessPoints />
            </box>
        </window>
    </>
  )
}

