import './blog.css'
import image7 from '../images/image7.png';
import Integrity from '../images/image8.png';
import Passion from '../images/image9.png';

import Responsibility from '../images/image11.png';
import Faith from '../images/image12.png';
import Ownership from '../images/image13.png';
import Research from '../images/image14.png';
import Mission from '../images/image15.png';
import Empathy from '../images/image10.png';

 const Blog = () => {

    let arrays = [{
        value1:'Empathy',
        imageurl1:Empathy,
        value2:'Responsibility',
        imageurl2:Responsibility,
     },
     {
        value1:'Faith',
        imageurl1:Faith,
        value2:'Owernship',
        imageurl2:Ownership,
     }
     ,{
        value1:'Research',
        imageurl1:Research,
        value2:'Mission',
        imageurl2:Mission,
     }
     ]

    let arrays2 = ['a', 'b', 'c', 'd', 'e','f','g','h','i','j']

    return (
        <div className='font_css'>
            <div class="blogTitle">
                <h1 class="apps"><b>Apps Deployer Blog</b></h1>
                <h1 className='apps2'><b>The latest insights and trends in Technology</b></h1>
            </div>
            <div className='container1'>
                <div className='items1'> <img src={image7}></img></div>
                <div className='items2'>
                    <h2>Product Management Frameworks</h2>
                    <p>Lorem ipsum dolor sit amet Aut alias.Lorem ipsum dolor sit amet Aut alias.Lorem ipsum dolor sit amet
                        Aut alias.Lorem ipsum dolor sit amet Aut alias.Lorem ipsum dolor sit amet Aut alias. </p>
                    <label><b>10 min read</b></label>
                </div>

            </div>
            {/****  blog code */}
            <div className="container1">
                {arrays2 && arrays2.map((item) => (
                    <div class="card ">
                        <img src={image7} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a longer card with supporting text below as a
                                natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                ))}

            </div>

            {/******  paragraph */}

            <div className='container2'>

                <h4> How It Started</h4>
                <label> Founded in 2020</label>
                <p>Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                    molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan,
                    risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget
                    condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora
                    torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
                    enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac
                    rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis
                    diam sit amet lacinia. Aliquam in elementum tellus.Porem ipsum dolor sit amet,
                    consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
                    Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
                    tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class
                    aptent taciti sociosqu ad litora
                    torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus </p>
            </div>

            {/***  image and para */}

            <div className='container1'>
                <div>
                    <h2> Our Mission</h2>
                    <p>Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                        sollicitudin lacus, ut interdum tellus elit sed risus.
                        Maecenas eget condimentum velit, sit amet feugiat lectus. Class ap</p>
                </div>
                <img src={Integrity} class="card-img-top" alt="..." />



            </div>


            {/** alll blog in one row */}

            <div className='blogcontainer'>
            <ul class="blogcards">
            {arrays2 && arrays2.map((item) => (
                    <li class="card scroll_grid">
                        <img src={image7} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a longer card with supporting text below as a
                                natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </li>
                ))}
                </ul>

             </div> 


            {/*** apps deployer values */}

            <div className='container3'>

                <div className='apps_values'>
                    <h4 className='apps_name'><b>Apps Deployer <br />Values</b></h4>
                    <h4 className='apps_perform'><b>I-PERFORM</b></h4>
                    <p>Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                        sollicitudin lacus, ut interdum tellus elit sed risus.
                        Maecenas eget condimentum velit, sit amet feugiat lectus.</p>
                    <label>Learn more  ----</label>
                </div>
                <div className='apps_firstimage'>
                    <img src={Integrity}  class="card-img-top" alt="..." />
                    <div className='textonFimage'>Integrity</div>

                </div>
                <div className='apps_secondimage'>
                    <img src={Passion} class="card-img-top" alt="..." />
                    <div className='textonSimage'> Passion</div>

                </div>


                {arrays && arrays.map((item) => (
                    <>
                        <div></div>
                        <div className='apps_firstimage'>
                            <img src={item.imageurl1} class="card-img-top" alt="..." />
                            <div className='textonFimage'>{item.value1}</div>
                        </div>
                        <div className='apps_secondimage'>
                            <img src={item.imageurl2} class="card-img-top" alt="..." />
                            <div className='textonSimage'> {item.value2}</div>
                        </div>
                    </>

                ))}
            </div>

        </div>
    )
}
export default Blog