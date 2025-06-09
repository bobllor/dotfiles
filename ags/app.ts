import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./src/windows/Bar"
import RightPanel from "./src/windows/RightPanel"
import { showMenu } from "./globals/vars"
import Effects from "./globals/Effects"

App.start({
    css: style,
    main() {
        const monitors = App.get_monitors();
                
        Bar(monitors[0]);
        RightPanel(monitors[0], showMenu);
        Effects();
    },
})
