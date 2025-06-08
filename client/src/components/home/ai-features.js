import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";

function AiFeatures() {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-8 mb-10 mt-14 shadow-2xl overflow-hidden border border-gray-800">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-900 opacity-30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-pink-900 opacity-20 rounded-full blur-3xl pointer-events-none" />
      <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2 text-purple-300 drop-shadow">
        <Sparkles className="h-7 w-7 text-purple-400 animate-pulse" />
        AI Image Creation
      </h2>
      <p className="text-gray-300 mb-6 text-center text-lg">
        Instantly create <span className="font-semibold text-purple-300">stunning thumbnails</span> for your YouTube videos with AI.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          variant="outline"
          className="cursor-pointer rounded-full px-7 py-6 bg-gradient-to-r from-gray-800 via-purple-900 to-gray-900 hover:from-purple-800 hover:to-gray-800 text-purple-200 hover:text-white border-purple-900 shadow-md flex items-center transition-all duration-200 hover:scale-105"
        >
          <Sparkles className="h-5 w-5 mr-2 text-blue-400" />
          Generate from video title
        </Button>
        <Button
          variant="outline"
          className="cursor-pointer rounded-full px-7 py-6 bg-gradient-to-r from-gray-800 via-pink-900 to-gray-900 hover:from-pink-800 hover:to-gray-800 text-pink-200 hover:text-white border-pink-900 shadow-md flex items-center transition-all duration-200 hover:scale-105"
        >
          <Sparkles className="h-5 w-5 mr-2 text-pink-400" />
          Generate custom image
        </Button>
      </div>
    </div>
  );
}

export default AiFeatures;
