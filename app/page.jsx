import About from "@/components/pages/About";
import Hero from "@/components/pages/Hero";
import Navbar from "@/components/pages/Navbar";
import Projects from "@/components/pages/Projects";
import Skills from "@/components/pages/Skills";
import Slider from "@/components/Slider";


export default function(){
    return (
        <div className="px-3">
            <Navbar></Navbar>
            <Hero></Hero>
            <Slider></Slider>
            <About></About>
            <Projects></Projects>
            <Skills></Skills>
            <div>Hellow orld</div>
        </div>
    )
}