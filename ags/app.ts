import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./windows/Bar"
import PowerMenu from "./windows/PowerMenu"
import { showMenu } from "./globals/vars"

App.start({
    css: style,
    main() {
        const monitors = App.get_monitors();
                
        Bar(monitors[0]);
        PowerMenu(monitors[0], showMenu);
    },
})
