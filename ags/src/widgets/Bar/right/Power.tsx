import { showMenu } from "../../../../globals/vars"

export default function Power(){
    return (
        <>
            <box>
                <button onClick={() => showMenu.set(!showMenu.get())}>P</button>
            </box>
        </>
    )
}