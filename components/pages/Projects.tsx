import ProjectContainer from "../ui/ProjectContainer"
import Title from "../ui/Title"



export default function Projects() {
    return (
        <div>
            <div>
                <div className=" py-6 lg:py-10">
                    <Title t_number="02" title="Projects built around hard problems." description="Selected Work" progress={20}></Title>
                </div>
                <div>
                    <ProjectContainer></ProjectContainer>
                </div>
            </div>
        </div>
    )
}