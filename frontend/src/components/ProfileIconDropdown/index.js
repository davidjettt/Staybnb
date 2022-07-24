
import { Link } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormModal';
import './ProfileIconDropdown.css';

export default function ProfileIconDropdown() {
    return (
        <div className='dropdown-container'>
            <button>
                <LoginFormModal />
            </button>
        </div>
    )
}
