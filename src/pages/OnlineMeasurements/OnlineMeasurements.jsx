import { useState, useRef, useEffect } from 'react';
import { Camera, Video, Square, Download, RefreshCw, AlertCircle, Save, ChevronRight, Check } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const OnlineMeasurements = () => {
  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoURLs, setVideoURLs] = useState({ front: null, back: null });
  const [activeView, setActiveView] = useState('front'); // 'front' or 'back'
  const [error, setError] = useState(null);
  
  // Measurement Form State
  const [measurements, setMeasurements] = useState({
    name: '',
    phone: '',
    neck: '',
    shoulder: '',
    chest: '',
    waist: '',
    hips: '',
    sleeve: '',
    frontLength: '',
    backLength: '',
  });

  const videoRef = useRef(null);
  const downloadLinkRef = useRef(null);

  // Fix: Update video element when stream changes
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      setError(null);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please ensure you have granted permission.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  // Store Blobs separately from URLs to upload them
  const blobsRef = useRef({ front: null, back: null });

  const startRecording = () => {
    if (stream) {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      const chunks = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoURLs(prev => ({ ...prev, [activeView]: url }));
        blobsRef.current[activeView] = blob; // Store blob for upload
      };

      recorder.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const downloadVideo = (view) => {
    const url = videoURLs[view];
    if (url && downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `my-measurements-${view}.webm`;
      downloadLinkRef.current.click();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitMeasurements = async (e) => {
    e.preventDefault();
    
    // Create FormData
    const formData = new FormData();
    Object.keys(measurements).forEach(key => {
        formData.append(key, measurements[key]);
    });

    if (blobsRef.current.front) {
        formData.append('videoFront', blobsRef.current.front, 'front-view.webm');
    }
    if (blobsRef.current.back) {
        formData.append('videoBack', blobsRef.current.back, 'back-view.webm');
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/measurements`, {
            method: 'POST',
            body: formData, // do NOT set Content-Type header manually for FormData
        });

        if (response.ok) {
            alert("Measurements Submitted Successfully!");
            // Reset form
            setMeasurements({
                name: '', phone: '', neck: '', shoulder: '', chest: '', waist: '', hips: '', sleeve: '', frontLength: '', backLength: ''
            });
            setVideoURLs({ front: null, back: null });
            blobsRef.current = { front: null, back: null };
            // Clear URL objects to free memory
        } else {
            alert("Failed to submit measurements. Please try again.");
        }
    } catch (error) {
        console.error("Submission error:", error);
        alert("Network error. Please try again.");
    }
  };

  const switchView = (view) => {
    if (recording) stopRecording();
    setActiveView(view);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-[#C5A059] selection:text-white">
      <Navbar />
      
      <main className="pt-24 lg:pt-32 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[#C5A059] font-bold tracking-[0.25em] text-xs uppercase mb-4 block">
              Virtual Fitting Room
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-black mb-6">
              Online Measurements
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Record your Front and Back views separately to ensure a perfect fit. Use the guide below to enter your precise measurements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* LEFT COLUMN: Camera & Recording */}
            <div className="space-y-8">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">1</div>
                    <h3 className="text-xl font-serif">Record Your Fit</h3>
                  </div>
                  
                  {/* View Switcher */}
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    {['front', 'back'].map((view) => (
                      <button
                        key={view}
                        onClick={() => switchView(view)}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${
                          activeView === view 
                          ? 'bg-white shadow-sm text-black' 
                          : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        {view} View
                        {videoURLs[view] && <Check size={12} className="inline-block ml-2 text-green-500" />}
                      </button>
                    ))}
                  </div>
               </div>

              <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl group border-4 border-white ring-1 ring-gray-200">
                {stream ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    muted 
                    className="w-full h-full object-cover transform scale-x-[-1]" 
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50">
                    <Camera size={64} strokeWidth={1} className="mb-4" />
                    <p className="uppercase tracking-widest text-sm">Camera Offline</p>
                  </div>
                )}
                
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur text-white px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest border border-white/20">
                  {activeView} View
                </div>

                {recording && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    REC
                  </div>
                )}

                {/* Error Message */}
                {error && (
                   <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-center p-6 text-white z-20">
                     <p className="text-red-400 font-bold">{error}</p>
                   </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex flex-wrap gap-4 justify-center">
                {!stream ? (
                  <button 
                    onClick={startCamera}
                    className="flex items-center gap-3 bg-black text-white px-8 py-4 font-bold tracking-widest uppercase text-xs hover:bg-[#C5A059] transition-colors w-full justify-center"
                  >
                    <Camera size={18} /> Enable Camera
                  </button>
                ) : (
                  <div className="flex flex-col w-full gap-3">
                    {!recording ? (
                      <button 
                        onClick={startRecording}
                        className="flex items-center gap-3 bg-[#C5A059] text-white px-8 py-4 font-bold tracking-widest uppercase text-xs hover:bg-black transition-colors justify-center"
                      >
                        <Video size={18} /> Start Recording {activeView}
                      </button>
                    ) : (
                      <button 
                        onClick={stopRecording}
                        className="flex items-center gap-3 bg-red-600 text-white px-8 py-4 font-bold tracking-widest uppercase text-xs hover:bg-red-700 transition-colors justify-center"
                      >
                        <Square size={18} /> Stop Recording
                      </button>
                    )}
                    
                    <button 
                      onClick={stopCamera}
                      className="flex items-center gap-3 border border-gray-300 text-gray-500 px-6 py-3 font-bold tracking-widest uppercase text-xs hover:border-black hover:text-black transition-colors justify-center"
                    >
                       Turn Off
                    </button>
                  </div>
                )}
              </div>

              {/* Downloads List */}
              <div className="space-y-2">
                {Object.entries(videoURLs).map(([view, url]) => (
                  url && (
                    <div key={view} className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#C5A059]/20 p-2 rounded-full text-[#C5A059]">
                          <Check size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs uppercase tracking-widest">{view} Recording</h4>
                          <p className="text-xs text-gray-500">Ready to download</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                         <button 
                          onClick={() => downloadVideo(view)}
                          className="p-2 hover:bg-white hover:shadow-sm rounded transition-all text-[#C5A059]"
                          title="Download"
                        >
                          <Download size={18} />
                        </button>
                        <button 
                           onClick={() => setVideoURLs(prev => ({ ...prev, [view]: null }))}
                           className="p-2 hover:bg-white hover:shadow-sm rounded transition-all text-gray-400 hover:text-red-500"
                           title="Retake"
                        >
                           <RefreshCw size={18} />
                        </button>
                      </div>
                    </div>
                  )
                ))}
              </div>
               {/* Hidden download link */}
               <a ref={downloadLinkRef} className="hidden" />

            </div>

            {/* RIGHT COLUMN: Measurement Form */}
            <div className="bg-gray-50 p-8 lg:p-12">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-serif">Enter Details & Measurements</h3>
               </div>

               {/* Measurement Guide Image */}
               <div className="mb-8 p-4 bg-white border border-gray-200 rounded-lg">
                 <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 text-center">Reference Guide</p>
                 <div className="relative aspect-4/3 w-full bg-gray-100 rounded overflow-hidden">
                    {/* Placeholder for the generated image. Using a local file path that we will populate via generate_image */}
                    <img 
                      src="/measurement_guide_diagram.png" 
                      alt="Measurement Guide" 
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                 </div>
               </div>

               <form onSubmit={handleSubmitMeasurements} className="space-y-6">
                  
                  {/* User Details Section */}
                  <div className="bg-white p-6 rounded-lg border border-gray-100 mb-6 space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-widest text-black mb-4 border-b border-gray-100 pb-2">Personal Details</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={measurements.name}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          className="w-full bg-gray-50 border border-gray-200 p-4 text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Contact Number</label>
                        <input 
                          type="tel" 
                          name="phone"
                          required
                          value={measurements.phone}
                          onChange={handleInputChange}
                          placeholder="+94 77 123 4567"
                          className="w-full bg-gray-50 border border-gray-200 p-4 text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Measurement Fields */}
                    {[
                      { label: 'Neck (Collars)', name: 'neck', placeholder: 'e.g. 16"' },
                      { label: 'Shoulder Width', name: 'shoulder', placeholder: 'e.g. 18"' },
                      { label: 'Chest (circumference)', name: 'chest', placeholder: 'e.g. 40"' },
                      { label: 'Waist (circumference)', name: 'waist', placeholder: 'e.g. 34"' },
                      { label: 'Hips (circumference)', name: 'hips', placeholder: 'e.g. 38"' },
                      { label: 'Sleeve Length', name: 'sleeve', placeholder: 'e.g. 25"' },
                      { label: 'Front Length', name: 'frontLength', placeholder: 'e.g. 28"' },
                      { label: 'Back Length', name: 'backLength', placeholder: 'e.g. 29"' },
                    ].map((field) => (
                      <div key={field.name} className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                          {field.label}
                        </label>
                        <input 
                          type="text" 
                          name={field.name}
                          value={measurements[field.name]}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                          className="w-full bg-white border border-gray-200 p-4 text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-gray-200 mt-6">
                    <button 
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 bg-black text-white px-8 py-5 font-bold tracking-[0.2em] uppercase text-xs hover:bg-[#C5A059] transition-colors"
                    >
                      <Save size={18} /> Save Measurements
                    </button>
                    <p className="text-center text-gray-400 text-xs mt-4">
                      All measurements will be reviewed by our master tailors.
                    </p>
                  </div>
               </form>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OnlineMeasurements;
