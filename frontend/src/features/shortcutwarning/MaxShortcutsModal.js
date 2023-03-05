import { useDispatch } from "react-redux";
import { showHideWarning } from "../user/userSlice";

const MaxShortcutsModal = () => {

    const dispatch = useDispatch();
    
    const handleClose = () => {
        dispatch(showHideWarning(false));
    }

    return (
        <div className="icon-warning-bg">
            <div className="icon-warning">
                <p>The maximum number of shortcuts is 5! Delete some old ones first!</p>
                <div className="close-window-button" onClick={handleClose}>OK</div>
            </div>
        </div>
    )
}

export default MaxShortcutsModal;