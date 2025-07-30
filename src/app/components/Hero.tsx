import Upload from "./Upload";

export default function Hero() {
    return (
        <div className="text-center text-white">
            <span className="font-black text-5xl">Transcribe audios y videos al instante</span>
            <p className="text-xl my-[16px]">Convierte conversaciones, entrevistas, clases y reuniones en texto editable, buscable y exportable. Sin complicaciones.</p>
            <div className="w-full flex justify-center">
                <Upload></Upload>
            </div>
        </div>
    )
}