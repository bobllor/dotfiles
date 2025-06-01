import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./src/windows/Bar"
import RightSideMenu from "./src/windows/RightSideMenu"
import { showMenu } from "./globals/vars"

App.start({
    css: style,
    main() {
        const monitors = App.get_monitors();
                
        Bar(monitors[0]);
        RightSideMenu(monitors[0], showMenu);
    },
})
