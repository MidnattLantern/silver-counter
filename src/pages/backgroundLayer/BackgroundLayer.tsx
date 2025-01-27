// styles
import Styles from "./BackgroundLayer.module.css";
import Ambience from "../../assets/wallpaper/SilverAmbientAnimation.gif";
import { useSilverList } from "../../contexts/silverListContext";

const BackgroundLayer: React.FC = () => {

        const {
            windowSize,
        } = useSilverList();

    return(<div className={Styles.BaseMargins}>
        <div className={`
            ${Styles.BackgroundLayerBaseModule}
            ${windowSize.width < 1050 || windowSize.height < 500 ? (Styles.MarginsForNoContext) : (null)}
            `}>
            <img src={Ambience} alt="Failed to load ambience" className={`${Styles.FitAmbience}`}/>
        </div>
    </div>)
};

export default BackgroundLayer;