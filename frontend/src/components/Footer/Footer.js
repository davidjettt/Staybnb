import github from '../../images/github-icon.svg'
import linkedin from '../../images/linkedin-icon.svg'
import './Footer.css';

export default function Footer () {
    return (
        <>
            <div className="footer">
                <div className='footer-sub'>
                    <div className='footer-left'>
                        <div className='footer-staybnb'>© 2022 Staybnb, Inc</div>
                    </div>
                    <div className='footer-right'>
                        <div className='developer-container'>
                            Developed by David Jetsupphasuk
                        </div>
                        <div className='icons-container'>
                            <a target='_blank' rel='noreferrer' href='https://github.com/davidjettt'>
                                <img className='github' src={github} alt='github' />
                            </a>
                            <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/david-jetsupphasuk-1494a6125/'>
                                <img className='linkedin' src={linkedin} alt='linkedin' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
