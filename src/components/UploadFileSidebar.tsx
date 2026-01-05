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
        <aside className="w-full bg-gray-600 p-4 rounded-xl overflow-y-auto">
            <h2 className="text-gray-200 font-semibold mb-4">Uploaded Files</h2>

            {files.length === 0 && (
                <p className="text-gray-500 text-sm">No files uploaded</p>
            )}

            <ul className="space-y-3">
                {files.map((file, index) => (
                    <li
                        key={`${file.id}-${index}`}
                        className="bg-gray-700 rounded-lg p-3"
                    >
                        <div className="flex items-start gap-3">
                            <FiFileText className="text-indigo-400 mt-1" />

                            <div className="flex-1">
                                <p className="text-sm font-medium truncate">
                                    {file.filename}
                                </p>

                                <p className="text-xs">
                                    Size: {file.size_kb} KB
                                </p>

                                <p className="text-xs truncate">
                                    Uploaded at: {Formatted(file.uploaded_at)}
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
