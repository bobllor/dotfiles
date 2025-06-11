import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./src/windows/Bar"
import RightPanel from "./src/windows/RightPanel"
import { showMenu } from "./globals/vars"
import Effects from "./globals/Effects"
import Notification from "./src/windows/Notification"

App.start({
    css: style,
    main() {
        // FIXME: make this on all monitors. for now i am only keeping it at one
        // as i am building this from scratch to keep it simple.
        const monitors = App.get_monitors();
                
        Bar(monitors[0]);
        RightPanel(monitors[0], showMenu);
        Notification(monitors[0]);
        Effects();
    },
})
