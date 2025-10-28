import Barriers from "./Barriers";
import Images from "./Images";
import RapAndCss from "./RapAndCss";

export default function TrainingSection(){


    return(
        <div className="bg-[var(--rh-yellow-500)]/10 py-20">
            <Barriers/>
            <Images/>
            <RapAndCss/>
        </div>
    );
}