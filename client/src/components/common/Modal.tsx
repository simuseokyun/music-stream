import { Modal as ModalProps } from '../../types/models/modal';

export default function Modal({ modalTitle, onClose, children }: ModalProps) {
    return (
        <div className="fixed w-full h-full flex flex-col justify-center items-center bg-[rgba(0,0,0,0.8)] z-20 ">
            <div className="max-w-[500px] p-5 w-[80%] rounded-[8px] bg-main relative">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-lg">{modalTitle}</h1>
                    <img className="img-small" src="/assets/closeButton.png" alt="닫기 아이콘" onClick={onClose} />
                </div>
                {children}
            </div>
        </div>
    );
}
