import { useRef, useState } from "react";

function CameraScan({ goBack }) {

  const videoRef = useRef(null);

  const canvasRef = useRef(null);

  const [image, setImage] = useState(null);

  const [warning, setWarning] = useState(false);

  // OPEN CAMERA

  const startCamera = async () => {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

      videoRef.current.srcObject = stream;

    }

    catch (error) {

      alert("Camera access denied.");
    }
  };

  // CAPTURE IMAGE

  const captureImage = () => {

    const canvas = canvasRef.current;

    const video = videoRef.current;

    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;

    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0);

    const imageData =
      canvas.toDataURL("image/png");

    setImage(imageData);

    setWarning(false);
  };

  // UPLOAD IMAGE

  const uploadImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      setImage(reader.result);

    };

    reader.readAsDataURL(file);
  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      {/* BACK BUTTON */}

      <button
        onClick={goBack}
        className="mb-8 bg-green-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-green-300"
      >
        ← Back to Home
      </button>

      {/* TITLE */}

      <h1 className="text-5xl font-bold text-green-400 mb-4">
        Live Plant Scanner
      </h1>

      <p className="text-yellow-300 text-xl mb-10">
        Demo AI Analysis (Prototype Version)
      </p>

      {/* MAIN BOX */}

      <div className="bg-white/10 p-8 rounded-3xl border border-green-400 max-w-5xl">

        {/* FILE INPUT */}

        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          className="mb-8"
        />

        {/* CAMERA */}

        <video
          ref={videoRef}
          autoPlay
          className="w-full rounded-3xl mb-6"
        />

        {/* HIDDEN CANVAS */}

        <canvas
          ref={canvasRef}
          className="hidden"
        />

        {/* BUTTONS */}

        <div className="flex gap-6 flex-wrap mb-8">

          <button
            onClick={startCamera}
            className="bg-blue-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-blue-300"
          >
            Open Camera
          </button>

          <button
            onClick={captureImage}
            className="bg-green-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-green-300"
          >
            Capture Plant
          </button>

        </div>

        {/* IMAGE PREVIEW */}

        {image && (

          <div>

            <h2 className="text-3xl font-bold mb-6">
              Uploaded Image
            </h2>

            <img
              src={image}
              alt="uploaded"
              className="rounded-3xl border border-green-400 w-full mb-8"
            />

            {/* CONTROL BUTTONS */}

            <div className="flex gap-4 mb-6 flex-wrap">

              <button
                onClick={() => setWarning(false)}
                className="bg-green-400 text-black px-5 py-2 rounded-xl font-bold hover:bg-green-300"
              >
                Analyze as Plant
              </button>

              <button
                onClick={() => setWarning(true)}
                className="bg-red-400 text-black px-5 py-2 rounded-xl font-bold hover:bg-red-300"
              >
                Not a Plant
              </button>

            </div>

            {/* RESULT */}

            {

              warning ? (

                <div className="bg-red-500/20 border border-red-400 p-6 rounded-2xl">

                  <h2 className="text-3xl font-bold text-red-300 mb-4">
                    Invalid Image Detected
                  </h2>

                  <p className="text-xl">
                    Uploaded image does not appear to contain plant details.
                  </p>

                  <p className="text-xl mt-4">
                    Please upload:
                  </p>

                  <ul className="list-disc pl-8 text-lg mt-4 leading-8">

                    <li>
                      Leaf close-up images
                    </li>

                    <li>
                      Crop disease symptoms
                    </li>

                    <li>
                      Plant-focused photos
                    </li>

                    <li>
                      Good lighting conditions
                    </li>

                  </ul>

                </div>

              ) : (

                <div className="bg-green-500/20 border border-green-400 p-6 rounded-2xl">

                  <h2 className="text-3xl font-bold text-green-300 mb-4">
                    AI Plant Analysis
                  </h2>

                  <p className="text-xl">
                    Plant image detected successfully.
                  </p>

                  <ul className="list-disc pl-8 text-lg mt-4 leading-8">

                    <li>
                      Minor leaf discoloration observed
                    </li>

                    <li>
                      Maintain watering schedule
                    </li>

                    <li>
                      Monitor fungal symptoms
                    </li>

                    <li>
                      Ensure healthy sunlight exposure
                    </li>

                  </ul>

                  <p className="text-xl mt-6">
                    AI Recommendation:
                    Continue regular crop monitoring.
                  </p>

                </div>

              )

            }

          </div>

        )}

      </div>

    </div>
  );
}

export default CameraScan;