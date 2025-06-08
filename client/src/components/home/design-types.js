"use client";

import { designTypes } from "@/config";
import { saveDesign } from "@/services/design-service";
import { useEditorStore } from "@/store";
import { Loader, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function DesignTypes() {
  const { userDesigns, userSubscription } = useEditorStore();
  const [currentSelectedType, setCurrentSelectedType] = useState(-1);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreateNewDesign = async (getCurrentType, index) => {
    setCurrentSelectedType(index);
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
        name: getCurrentType.label,
        canvasData: null,
        width: getCurrentType.width,
        height: getCurrentType.height,
        category: getCurrentType.label,
      };

      const newDesign = await saveDesign(initialDesignData);

      if (newDesign?.success) {
        router.push(`/editor/${newDesign?.data?._id}`);
        setLoading(false);
      } else {
        throw new Error("Failed to create new design");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 mt-14 justify-center">
      {designTypes.map((type, index) => (
        <div
          onClick={() => handleCreateNewDesign(type, index)}
          key={index}
          className={`group flex cursor-pointer flex-col items-center transition-transform duration-200 hover:scale-105`}
        >
          <div
            className={`
              ${type.bgColor}
              w-12 h-12 rounded-3xl shadow-xl flex items-center justify-center mb-4 transition-all duration-200
              group-hover:shadow-2xl relative overflow-hidden
            `}
            style={{
              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10), 0 1.5px 6px 0 rgba(0,0,0,0.08)",
            }}
          >
            <span className="text-3xl group-hover:scale-125 transition-transform duration-200 drop-shadow-lg">
              {type.icon}
            </span>
            <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 bg-gradient-to-br from-white/60 to-primary/20" />
          </div>
          <span className="text-base font-semibold items-center flex gap-2 text-center text-muted-foreground group-hover:text-primary transition-colors duration-200">
            {loading && currentSelectedType === index && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            {type.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default DesignTypes;
