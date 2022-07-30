
import { ImGithub } from 'react-icons/im';
import { BsLinkedin } from 'react-icons/bs';
import './Footer.css';

export default function Footer () {
    return (
        <>
            <div className="footer">
                <div className='footer-contents'>
                    <p>Developed by David Jetsupphasuk</p>
                    <div className='my-links'>
                        <a href='https://github.com/davidjettt'>
                            <div className='github-icon'>
                                <ImGithub />
                            </div>
                        </a>
                        <a href='https://www.linkedin.com/in/david-jetsupphasuk-1494a6125/'>
                            <div className='linkedin-icon'>
                                <BsLinkedin />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
