import { NavItem as NavItemProps } from '../../types/models/layout';

export default function NavItem({ icon, label, onClick, active }: NavItemProps) {
    return (
        <li
            className={`flex items-center p-2 rounded-md cursor-pointer ${
                active ? 'bg-[rgba(255,255,255,0.2)] font-semibold' : ''
            }`}
            onClick={onClick}
        >
            <img className="img-small lg:mr-2" src={icon} alt={label} />
            <p className="hidden lg:block">{label}</p>
        </li>
    );
}
