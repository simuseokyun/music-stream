import { ReactNode } from 'react';

interface Modal {
    modalTitle: string;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ modalTitle, onClose, children }: Modal) {
    return (
        <div className="bg-[rgba(0,0,0,0.8)] fixed w-full h-full z-20 flex justify-center items-center flex-col">
            <div className="max-w-[500px] p-[15px] w-[80%] h-[300px] overflow-y-scroll rounded-[8px] bg-main relative">
                <div className="flex justify-between items-center mb-[20px]">
                    <h1 className="text-lg">{modalTitle}</h1>
                    <img className="img-small" src="/assets/closeButton.png" alt="닫기" onClick={onClose} />
                </div>
                {children}
            </div>
        </div>
    );
}
