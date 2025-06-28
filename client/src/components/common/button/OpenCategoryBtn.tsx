import useUserStore from '../../../store/user';

export default function OpenCategoryBtn({ onClick }: { onClick: () => void }) {
    const { user } = useUserStore();
    if (!user) return;
    return <img src="/assets/addButton.svg" alt="추가" onClick={onClick} />;
}
