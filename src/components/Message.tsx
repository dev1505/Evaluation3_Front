import MDEditor from "@uiw/react-md-editor";
import { ChevronDown, ChevronUp, Clock, FileText } from "lucide-react";
import { useState } from "react";
import type { Citation } from "./Chat";
import { Formatted } from "./UploadFileSidebar";

const Message = ({ text, sender, citations, response_at }: { text: string, sender: string, response_at: string, citations: Citation[] }) => {

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={`max-w-xl ${sender === "user" ? "self-end" : "self-start"}`}>
      <div
        className={`p-4 rounded-lg shadow-md ${sender === "user"
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-900"
          }`}
      >
        {sender === "user" ? text :
          <div data-color-mode={"light"}>
            <MDEditor.Markdown
              source={text}
              className="p-2 prose prose-sm max-w-none" // Tailwind prose for better markdown rendering
            />
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
              <Clock size={14} /> <span className="font-medium">{Formatted(response_at)}</span>
            </div>
          </div>
        }
      </div>

      {citations && citations.length > 0 && (
        <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3 shadow-sm">
          <p className="text-xs font-semibold text-blue-700 mb-2">
            References (Citations)
          </p>
          <ul className="divide-y divide-blue-100">
            {citations.map((c, i) => {
              const isOpen = openIndex === i
              return (
                <li key={i} className="py-2">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between text-left text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-blue-500" />
                      <span className="text-sm font-medium">{c.filename}</span>
                    </div>

                    {isOpen ? (
                      <ChevronUp size={16} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-500" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="mt-3 ml-6 rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-gray-700 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="grid grid-cols-12 gap-y-2 gap-x-4">

                        <div className="col-span-3 font-medium text-gray-600">
                          Pages
                        </div>
                        <div className="col-span-9 text-gray-800">
                          {c.page_start} - {c.page_end}
                        </div>

                        <div className="col-span-3 font-medium text-gray-600">
                          Text
                        </div>
                        <div className="col-span-9 max-h-32 overflow-y-auto rounded bg-white p-2 border text-gray-800 leading-relaxed">
                          {c.text}
                        </div>

                        <div className="col-span-3 font-medium text-gray-600">
                          Citation
                        </div>
                        <div className="col-span-9 max-h-32 overflow-y-auto rounded bg-white p-2 border text-gray-800 leading-relaxed">
                          {c.citation}
                        </div>

                        {"score" in c && (
                          <>
                            <div className="col-span-3 font-medium text-gray-600">
                              Similarity
                            </div>
                            <div className="col-span-9 text-gray-800">
                              {Number(c.score).toFixed(3)}
                            </div>
                          </>
                        )}

                        {"final_score" in c && (
                          <>
                            <div className="col-span-3 font-medium text-gray-600">
                              Final score
                            </div>
                            <div className="col-span-9 text-gray-800">
                              {Number(c.final_score).toFixed(3)}
                            </div>
                          </>
                        )}

                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Message;