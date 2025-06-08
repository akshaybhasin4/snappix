"use client";

import { Sparkles, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { saveDesign } from "@/services/design-service";
import { useRouter } from "next/navigation";
import { useEditorStore } from "@/store";
import { toast } from "sonner";

function Banner() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userSubscription, userDesigns } = useEditorStore();

  console.log(userSubscription, "userSubscription");

  const handleCreateNewDesign = async () => {
    if (userDesigns?.length >= 5 && !userSubscription.isPremium) {
      toast.error("Please upgrade to premium!", {
        description: "You need to upgrade to premium to create more designs",
      });

      return;
    }
    if (loading) return;
    try {
      setLoading(true);

      const initialDesignData = {
        name: "Untitled design - Youtube Thumbnail",
        canvasData: null,
        width: 825,
        height: 465,
        category: "youtube_thumbnail",
      };

      const newDesign = await saveDesign(initialDesignData);

      if (newDesign?.success) {
        router.push(`/editor/${newDesign?.data?._id}`);
        setLoading(false);
      } else {
        throw new Error("Failed to create new design");
      }

      console.log(newDesign, "newDesign");
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6 sm:p-10 md:p-14 text-center shadow-2xl border border-gray-800">
      {/* Main content */}
      <div className="relative flex flex-col sm:flex-row justify-center items-center mb-3 sm:mb-6">
        <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-fuchsia-500 to-purple-600 p-2 shadow-lg mr-0 sm:mr-4">
          <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 text-white drop-shadow-lg" />
        </span>
        <span className="sm:ml-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-yellow-300 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
          Turn Ideas Into Eye-Catching Designs
        </span>
      </div>
      <h2 className="relative text-base sm:text-lg md:text-xl font-semibold mb-6 sm:mb-8 max-w-2xl mx-auto text-gray-200">
        Unleash your creativity with <span className="text-yellow-300">stunning thumbnails</span>
      </h2>
      <Button
        onClick={handleCreateNewDesign}
        className="relative cursor-pointer text-white bg-gray-800 hover:bg-gray-700 rounded-xl px-6 py-3 sm:px-8 sm:py-3.5 font-bold text-lg shadow-lg transition-all duration-200"
      >
        {loading && <Loader className="w-5 h-5 mr-2 animate-spin" />}
        Start Designing
      </Button>
    </div>
  );
}

export default Banner;
