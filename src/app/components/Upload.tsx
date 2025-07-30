'use client'
import Image from "next/image"
import { useState, useRef } from "react"

import ModalTranscript from "./ModalTranscript";
import Loader from "./Loader";

export default function Upload() {
    const [view, setView] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [pathFile, setPathFile] = useState("")
    const [transcript, setTranscript] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0])
            setView(true)
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        setIsLoading(true)

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:3001/transcribe', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            setPathFile("http://localhost:3001/download/" + result["filename"])
            setTranscript(result["transcript"])
            setIsModalOpen(true)
        } catch (error) {
            console.error('Error al subir el archivo:', error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className={`bg-[#948979] rounded-3xl overflow-hidden transition-all duration-[1s] ease-in-out ${isLoading ? "opacity-30" : ""}`} style={{ maxHeight: view ? "600px" : "405px" }}>
                <div className="flex justify-center items-center bg-[#393E46] w-[1046px] h-[405px] rounded-3xl">
                    <div className="pt-[64px] w-[1025px] h-[381.34px] border-dashed border-3 rounded-2xl">
                        <span className="font-semibold text-xl">Arrastra y suelta tu archivo aquí</span><br />
                        <span className="font-light text-lg">o haz clic para seleccionarlo desde tu dispositivo.</span>
                        <div className="flex justify-center w-full mt-[16px]">
                            <Image src={"/upload_icon.png"} alt="Upload Icon" width={96} height={96}></Image>
                        </div>
                        <div className="flex justify-center w-full pt-[24px]">
                            <input
                                className="hidden"
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <div onClick={handleButtonClick} className="cursor-pointer flex justify-center items-center bg-[#948979] text-[#222831] rounded-xl w-[258px] h-[48px]">
                                <Image src={"/clip_button_icon.png"} alt="Clip Icon" width={32} height={32}></Image>
                                <span className="font-bold text-lg">Seleccionar archivo</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`transition-all duration-[1s] ease-in-out ${view ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"} flex justify-between items-center h-[48px] px-8 border-t border-white`}>
                    <div className="text-[#92D594] flex">
                        <Image src={"/succes_icon.png"} alt="Succes Icon" width={24} height={24}></Image>
                        <span className="ms-1">{file?.name}</span>
                    </div>
                    <div className="flex">
                        <div onClick={handleSubmit} className="cursor-pointer w-[128px] h-[36px} rounded-full align-middle text-white font-semibold text-base bg-[#393E46] me-4">Transcribir</div>
                        <div onClick={() => setView(false)} className="cursor-pointer">
                            <Image src={"/delete_icon.png"} alt="" width={24} height={24}></Image>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`w-[1064px] flex justify-center fixed translate-y-1/2 inset-y-0 z-20 ${isLoading ? "" : "hidden"}`}>
                <Loader></Loader>
            </div>
            <ModalTranscript pathFile={pathFile} isOpen={isModalOpen} onClose={() => {
                setIsModalOpen(false)
                setView(false)
            }}>
                {transcript}
            </ModalTranscript>
        </>
    )
}