import About from "@/components/pages/About";
import Hero from "@/components/pages/Hero";
import Navbar from "@/components/pages/Navbar";
import Projects from "@/components/pages/Projects";
import Contact from "@/components/pages/Contact";
import Skills from "@/components/pages/Skills";
import Slider from "@/components/Slider";
import Blogs from "@/components/pages/Blogs";


export default function(){
    return (
        <div className="px-3">
            {/* <Navbar></Navbar> */}
            <Hero></Hero>
            <Slider></Slider>
            <About></About>
            <Projects></Projects>
            <Skills></Skills>
            <Blogs></Blogs>
            <Contact></Contact>
            {/* <div>Hellow orld</div> */}
        </div>
    )
}