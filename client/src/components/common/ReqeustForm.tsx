import Modal from './Modal';

export default function ReqeustForm({ onClose }: { onClose: () => void }) {
    return (
        <Modal onClose={onClose} modalTitle="등록 요청">
            <h1 className="text-base">"sim31059999@gmail.com"으로 구글 아이디를 보내주세요!</h1>
        </Modal>
    );
}
