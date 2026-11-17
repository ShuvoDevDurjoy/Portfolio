import Certificate from "../ui/Certificates";
import Courses from "../ui/Courses";
import Education from "../ui/Education";
import Recognition from "../ui/Recongnition";
import Toolkit from "../ui/Toolkit";


export default function Skills() {
    return <div className="">
        <div className="max-w-6xl m-auto">
            <Toolkit></Toolkit>
            <Education></Education>
            <Recognition></Recognition>
            <Certificate></Certificate>
            <Courses></Courses>
        </div>
    </div>
}