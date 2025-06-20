import { Variable } from "astal"
import { Gtk } from "astal/gtk3";
import Astal from "gi://Astal?version=3.0";

export const defaultIcon: string = "󰣇";

export const showMenu = Variable<boolean>(false);

const winAnchor = Astal.WindowAnchor;
export const anchor = {
    RIGHT: winAnchor.RIGHT,
    LEFT: winAnchor.LEFT,
    TOP: winAnchor.TOP,
    BOTTOM: winAnchor.BOTTOM
};

const gtkAlign = Gtk.Align;
export const align = {
    CENTER: gtkAlign.CENTER,
    FILL: gtkAlign.FILL,
    BASELINE: gtkAlign.BASELINE,
    END: gtkAlign.END,
    START: gtkAlign.START
}

export const mouseEvent: Map<number, string> = new Map([
    [1, 'LEFT'],
    [2, 'MIDDLE'],
    [3, 'RIGHT']
]);