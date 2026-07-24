import { useState, useEffect } from "react";
import { useAnalyzeWebsite } from "../apiCalls/apiWebsiteAnalyzer";
import { Pointer, Rotate3D } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism-tomorrow.css";

export const Home = () => {
    const [url, setUrl] = useState("");
    const [htmlOpen, sethtmlOpen] = useState(false);
    const {
        mutate: analyzeWebsite,
        data,
        isPending,
        isError,
        error,
    } = useAnalyzeWebsite();

    useEffect(() => {
        Prism.highlightAll();
    }, [htmlOpen]);
    const handleSubmit = (e) => {
        e.preventDefault();

        analyzeWebsite({
            url,
        });
    };
    const report = data?.data;
    console.log(data)
    console.log(report)
    return (
        <div className="min-h-screen flex justify-center bg-neutral-900">
            <div className="w-full max-w-2xl bg-neutral-900 text-white rounded-xl shadow-lg md:p-8 p-2">

                <h1 className="text-3xl font-bold hover:underline mb-6">
                    Website Analyzer
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full border rounded-lg p-3 outline-none"
                    />

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-white text-[17px] mb-2 md:text-[20px] hover:bg-amber-100 transition-colors duration-300 ease-in-out text-black py-3 font-[Saira] font-[500] rounded-lg"
                    >
                        {isPending ? <div className="flex   items-center h-full hover:scale-[1.02] justify-center  transition-transform duration-200 ease-in-out w-full ">
                            Analyzing...<Rotate3D className="animate-spin " />
                        </div> : <div className=" w-full h-full hover:scale-[1.05] transition-transform duration-300 ease-in-out">Analyze</div>}
                    </button>

                </form>

                {isError && (
                    <div className="mt-8 rounded-lg border border-red-300 bg-red-50 p-4">
                        <p className="text-red-600 font-medium">
                            {error?.response?.data?.message || error?.message}
                        </p>

                        <details className="mt-3 cursor-pointer">
                            <summary className="font-medium text-gray-700">
                                Why did this happen?
                            </summary>

                            <div className="mt-3 text-sm text-gray-600 space-y-2">
                                <p>
                                    Some websites intentionally block automated requests from
                                    servers to prevent scraping or abuse.
                                </p>

                                <p>
                                    If you're analyzing websites like <strong>LeetCode</strong>,
                                    LinkedIn, Instagram, or other protected platforms, they may
                                    respond with an HTTP <strong>403 Forbidden</strong> status.
                                </p>

                                <p>
                                    This doesn't mean the Website Analyzer is broken. It simply
                                    means the target website doesn't allow automated access.
                                </p>

                                <p className="font-medium">
                                    Try public websites such as:
                                </p>

                                <ul className="list-disc ml-5">
                                    <li>https://react.dev</li>
                                    <li>https://vite.dev</li>
                                    <li>https://example.com</li>
                                    <li>https://developer.mozilla.org</li>
                                </ul>
                            </div>
                        </details>
                    </div>
                )}

                {data && (
                    <div className=" border rounded-[5px] p-5  text-[14px] md:text-[16px] space-y-3">
                        <p className="flex gap-5 cursor-pointer" onClick={() => sethtmlOpen((prev) => !prev)}><strong >HTML: Click to view </strong><Pointer className="hover:fill-amber-100" /></p>
                        <p><strong>Status:</strong> {report?.status}</p>
                        <p><strong>Response Time:</strong> {report?.responseTime}</p>
                        <p><strong>Title:</strong> {report?.title}</p>
                        <p><strong>Meta Description:</strong> {report?.description}</p>
                        <p><strong>First H1:</strong> {report?.h1}</p>
                        <p><strong>Images Missing Alt:</strong> {report?.missingAlt}</p>
                        <p><strong>Word Count:</strong> {report?.wordCount}</p>
                    </div>

                )}
                {htmlOpen && (
                    <div
                        className="fixed inset-0 no-scrollbar bg-black/40 z-40"
                        onClick={() => sethtmlOpen(false)}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={`fixed bottom-0 no-scrollbar left-1/2 -translate-x-1/2 w-full md:w-[80%]  h-[75vh] bg-neutral-600 text-white rounded-t-2xl shadow-2xl  overflow-y-auto z-50 transition-transform duration-300 ease-in-out ${htmlOpen ? "translate-y-0" : "translate-y-full"}`}
                        >
                            <div className="flex justify-between bg-netural-600  items-center mb-4">
                                <h2 className="font-bold pt-5 pl-5 text-xl">
                                    HTML Source
                                </h2>

                                <button
                                    onClick={() => sethtmlOpen(false)}
                                    className="md:text-2xl pt-5  text-xl pr-5"
                                >
                                    ✕
                                </button>
                            </div>

                            <pre className="rounded-lg overflow-auto">
                                <code className="language-markup">
                                    {report?.html}
                                </code>
                            </pre>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
