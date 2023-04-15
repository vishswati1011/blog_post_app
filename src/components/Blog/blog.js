import './blog.css'
import image7 from '../images/image 7.png'
const Blog = () => {
    return (
        <div>
            <div class="blogTitle">
                <h1 class="apps"><b>Apps Deployer Blog</b></h1>
                <h1 className='apps2'><b>The latest insights and trends in Technology</b></h1>
            </div>
            <div className='containers'>
                <div className='items1'> <img src={image7}></img></div>
                <div className='items2'>
                    <h2>Product Management Frameworks</h2>
                    <p>Lorem ipsum dolor sit amet Aut alias.Lorem ipsum dolor sit amet Aut alias.Lorem ipsum dolor sit amet Aut alias.Lorem ipsum dolor sit amet Aut alias.Lorem ipsum dolor sit amet Aut alias. </p>
                    <label><b>10 min read</b></label>
                </div>

            </div>

            {/* <div className="containers">
                <div className="items">
                    this is first item
                </div>
                <div className="items">
                    this is first item
                </div>
            </div> */}
        </div>
    )
}
export default Blog