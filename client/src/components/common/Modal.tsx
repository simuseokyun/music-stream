import { Modal as ModalProps } from '../../types/models/modal';

export default function Modal({ modalTitle, onClose, children }: ModalProps) {
    return (
        <div className="bg-[rgba(0,0,0,0.8)] fixed w-full h-full z-20 flex justify-center items-center flex-col">
            <div className="max-w-[500px] p-[15px] w-[80%] max-h-[300px] overflow-y-scroll rounded-[8px] bg-main relative">
                <div className="flex justify-between items-center mb-[20px]">
                    <h1 className="text-lg">{modalTitle}</h1>
                    <img className="img-small" src="/assets/closeButton.png" alt="닫기" onClick={onClose} />
                </div>
                {children}
            </div>
        </div>
    );
}
