
import { ImGithub } from 'react-icons/im';
import './Footer.css';

export default function Footer () {

    return (
        <div className='footer-container'>
            <div className='footer'>
                <div className='github-icon-container'>
                    <a href='https://github.com/davidjettt' target='_blank'>
                        <ImGithub />
                    </a>
                </div>
            </div>
        </div>
    )
}
