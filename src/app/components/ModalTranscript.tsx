import Image from "next/image"
import Link from "next/link";

import { motion, AnimatePresence } from 'framer-motion';

export default function ModalTranscript({ pathFile, isOpen, onClose, children }: { pathFile: string, isOpen: boolean, onClose: () => void, children: React.ReactNode }) {
    if (!isOpen) return null;
    return (
        <AnimatePresence>
            <motion.div
                className="fixed transition-all duration-[1s] ease-in-out translate-y-1/6 inset-y-0 z-20 w-[1096px] flex justify-center items-center h-[524px] bg-[#948979] rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="grid col-1 justify-items-end row-2 w-[1069px] h-[496px] bg-[#222831] rounded-lg">
                    <p className="row-span-10 font-light text-lg mt-5 mx-4 text-start">{children}</p>
                    <div className="flex justify-center">
                        <div className="cursor-pointer flex justify-center me-5 items-center h-[42px] rounded-xl">
                            <span onClick={onClose} className="text-[#DFD0B8] font-semibold hover:underline text-lg">Transcribir otro archivo</span>
                        </div>
                        <Link href={pathFile} download>
                            <div className="cursor-pointer flex justify-center me-5 items-center w-[148px] h-[42px] bg-[#DFD0B8] rounded-xl">
                                <Image src={"/download_icon.png"} alt="" width={24} height={24}></Image>
                                <span className="text-[#222831] font-bold text-lg">descargar</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}