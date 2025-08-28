import useUserStore from '../../../store/user';

export default function OpenCategoryBtn({ onClick }: { onClick: () => void }) {
    const session = useUserStore((state) => state.user);
    if (!session) return null;
    return <img src="/assets/addButton.svg" alt="추가 아이콘" onClick={onClick} />;
}
