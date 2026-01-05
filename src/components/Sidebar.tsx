/* eslint-disable react-refresh/only-export-components */
import { FileText, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAllDocs, verifyCitation } from '../api';
import FileUpload from './FileUpload';
import UploadedFilesSidebar from './UploadFileSidebar';

export type UserDoc = {
  id: string
  filename: string
  size_bytes: number
  size_kb: number
  size_mb: number
  uploaded_at: string
  extension: string
  mime_type: string
}

export enum ChunkingMethod {
  SLIDING_WINDOW = "SLIDING_WINDOW",
  SEMANTIC_CHUNKING = "SEMANTIC_CHUNKING",
}

export type SemanticMode = "paragraph" | "section" | "sentence"


const Sidebar = () => {

  const [uploadedFiles, setUploadedFiles] = useState<UserDoc[]>([])

  const [chunkingMethod, setChunkingMethod] = useState<ChunkingMethod>(
    ChunkingMethod.SLIDING_WINDOW
  )

  const [chunkingMode, setChunkingMode] = useState<SemanticMode>("paragraph")

  const resolvedMode =
    chunkingMethod === ChunkingMethod.SEMANTIC_CHUNKING
      ? chunkingMode
      : null

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await getAllDocs()
        setUploadedFiles(res.data)
        console.log(await verifyCitation({ query: "give me information about the gift program that gives me idea about the gift policies" }))
      } catch (e) {
        console.error(e)
      }
    }
    fetchFiles()
  }, [])


  return (
    <div className="w-1/4 min-h-screen bg-blue-900 text-white p-6 flex flex-col">
      <div className="flex items-center mb-10">
        <MessageCircle className="text-3xl mr-3" />
        <h1 className="text-2xl font-bold">DocuChat</h1>
      </div>
      <div className="flex flex-col grow">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <FileText className="mr-2" />
          Upload Document
        </h2>
        <FileUpload chunking_method={chunkingMethod} chunking_mode={chunkingMode} onUploadComplete={setUploadedFiles} />

        <div className="w-full max-w-md mt-5 rounded-xl border border-gray-200 bg-white p-3 shadow-sm text-gray-900">
          <h3 className="mb-4 text-lg font-semibold">
            Chunking Configuration
          </h3>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Chunking Method
              </label>

              <select
                value={chunkingMethod}
                onChange={(e) =>
                  setChunkingMethod(e.target.value as ChunkingMethod)
                }
                className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 rounded-md"
              >
                <option value={ChunkingMethod.SLIDING_WINDOW}>
                  Sliding Window
                </option>
                <option value={ChunkingMethod.SEMANTIC_CHUNKING}>
                  Semantic Chunking
                </option>
              </select>
            </div>

            {chunkingMethod === ChunkingMethod.SEMANTIC_CHUNKING && (
              <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <label className="text-sm font-medium text-gray-700">
                  Semantic Chunking Mode
                </label>

                <select
                  value={chunkingMode}
                  onChange={(e) =>
                    setChunkingMode(e.target.value as SemanticMode)
                  }
                  className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 rounded-md"
                >
                  <option value="paragraph">Paragraph</option>
                  <option value="section">Section</option>
                  <option value="sentence">Sentence</option>
                </select>
              </div>
            )}

            <div className="bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-600">
                  Method
                </span>
                <span className="text-gray-900">
                  {chunkingMethod === ChunkingMethod.SLIDING_WINDOW
                    ? "Sliding Window"
                    : "Semantic Chunking"}
                </span>
              </div>

              {resolvedMode && (
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-medium text-gray-600">
                    Mode
                  </span>
                  <span className="capitalize text-gray-900">
                    {resolvedMode}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='pr-2 mt-10'>
          <h2 className="text-gray-100 font-semibold mb-2">Uploaded Files</h2>
          <div className='max-h-55 grow overflow-y-auto'>
            <UploadedFilesSidebar files={uploadedFiles} />
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-auto">
        <p>&copy; 2024 DocuChat. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Sidebar;