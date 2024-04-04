import { createContext, useEffect, useRef, useState } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext({});

function CloudinaryUploadWidget({ uwConfig, setPublicId, setImageUrl, imageUrl }: { uwConfig:object, setPublicId:Function, setImageUrl:Function, imageUrl:string}) {
  const scriptLoadedRef = useRef(false);

  const [imageHeight, setImageHeight] = useState(0);
  const firstContainerRef = useRef(null);
  const secondContainerRef = useRef(null);

  useEffect(() => {
    // Get the height of the image
    const img = new Image();
    img.onload = function () {
      setImageHeight(img.height);
    };
    img.src = imageUrl;
  }, [imageUrl]);

  useEffect(() => {
    // Check if the Cloudinary script is already loaded
    if (!scriptLoadedRef.current) {
      // Dynamically create and load the Cloudinary script
      const script = document.createElement("script");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.onload = () => {
        scriptLoadedRef.current = true;
        initializeCloudinaryWidget();
      };
      document.body.appendChild(script);
    } else {
      initializeCloudinaryWidget();
    }
  }, [setPublicId, uwConfig]);

  const initializeCloudinaryWidget = () => {
    //@ts-ignore
    if (window.cloudinary && window.cloudinary.createUploadWidget) {
      //@ts-ignore
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error:any, result:any) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setPublicId(result.info.public_id)
            setImageUrl(result.info.secure_url)
            myWidget.close()
          }
        }
      );

      document.getElementById("upload_widget")?.addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false,
      );
    } else {
      console.error("Cloudinary script is not loaded properly");
    }
  };

  return (
    <div className="relative w-full h-fit">
      <CloudinaryScriptContext.Provider value={{ scriptLoadedRef }} >
        <button
          id="upload_widget"
          className="w-full flex justify-center items-center border border-gray-300 rounded-md min-h-44 bg-gray-100"
        >
          <div className="flex flex-col items-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <div className="flex items-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <div className="ml-1">
                Cover Image
              </div>
            </div>
          </div>
        </button>
      </CloudinaryScriptContext.Provider>
      {imageUrl && 
        <div className="absolute inset-0 overflow-auto">
          <img src={imageUrl} className="object-cover w-full"/>
        </div>
      }
    </div>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };

