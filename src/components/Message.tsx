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
        className={`p-4 rounded-lg ${sender === "user"
          ? "bg-indigo-600 text-white"
          : "bg-white text-gray-900"
          }`}
      >
        {sender === "user" ? text :
          <div data-color-mode={"light"}>
            <MDEditor.Markdown source={text} className="p-5" />
            <div className="flex gap-2">
              <Clock /> {Formatted(response_at)}
            </div>
          </div>
        }
      </div>

      {citations && citations.length > 0 && (
        <div className="mt-2 bg-gray-50 border rounded-lg p-3">
          <p className="text-xs font-semibold text-gray-600 mb-2">
            Refrences (Citations)
          </p>
          <ul className="divide-y divide-dashed">
            {citations.map((c, i) => {
              const isOpen = openIndex === i
              return (
                <li key={i} className="px-3 py-2">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="text-indigo-500" />
                      {c.filename}
                    </div>

                    {isOpen ? (
                      <ChevronUp className="text-gray-500" />
                    ) : (
                      <ChevronDown className="text-gray-500" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="mt-3 ml-6 rounded-lg border bg-white p-3 text-xs text-gray-700">
                      <div className="grid grid-cols-12 gap-y-2 gap-x-4">

                        <div className="col-span-3 font-medium text-gray-500">
                          Pages
                        </div>
                        <div className="col-span-9">
                          {c.page_start} - {c.page_end}
                        </div>

                        <div className="col-span-3 font-medium text-gray-500">
                          Text
                        </div>
                        <div className="col-span-9 max-h-32 overflow-y-auto rounded text-gray-600 leading-relaxed">
                          {c.text}
                        </div>

                        {"score" in c && (
                          <>
                            <div className="col-span-3 font-medium text-gray-500">
                              Similarity
                            </div>
                            <div className="col-span-9">
                              {Number(c.score).toFixed(3)}
                            </div>
                          </>
                        )}

                        {"final_score" in c && (
                          <>
                            <div className="col-span-3 font-medium text-gray-500">
                              Final score
                            </div>
                            <div className="col-span-9">
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
