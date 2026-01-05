import { FiFileText } from "react-icons/fi"
import type { UserDoc } from "./Sidebar"

export const Formatted = (uploaded_at: string) => new Date(uploaded_at).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
})

const UploadedFilesSidebar = ({ files }: { files: UserDoc[] }) => {
    return (
        <aside className="w-full bg-zinc-900 p-4 rounded-xl h-full overflow-y-auto">
            {files.length === 0 && (
                <p className="text-gray-400 text-sm">No files uploaded yet.</p>
            )}

            <ul className="space-y-3">
                {files.map((file, index) => (
                    <li
                        key={`${file.id}-${index}`}
                        className="bg-zinc-600 rounded-lg p-3 cursor-pointer"
                    >
                        <div className="flex items-start gap-3">
                            <FiFileText className="text-blue-800 mt-1" />
                            <div className="flex-1">
                                <p className="text-sm font-medium truncate text-white">
                                    {file.filename}
                                </p>
                                <p className="text-xs text-gray-300">
                                    Size: {file.size_kb.toFixed(2)} KB
                                </p>
                                <p className="text-xs truncate text-gray-300">
                                    Uploaded: {Formatted(file.uploaded_at)}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default UploadedFilesSidebar