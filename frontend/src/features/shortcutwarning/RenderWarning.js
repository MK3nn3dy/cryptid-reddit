import { useSelector } from "react-redux"
import MaxShortcutsModal from "./MaxShortcutsModal";

const RenderWarning = () => {

    const warningVisible = useSelector((state) => state.user.warningVisible);

    if(warningVisible){
        return(
            <MaxShortcutsModal />
        )
    }
}

export default RenderWarning;