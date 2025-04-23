
const CulturalVideo = () => (
  <div className="my-6">
    <h3 className="text-xl font-bold mb-4">Upptäck kultur med video</h3>
    <div className="rounded-lg overflow-hidden aspect-video shadow-lg border border-gray-200">
      <iframe
        src="https://www.youtube.com/embed/1O_9oM0FQJc"
        title="Vad är kultur? - SVT Kortklipp"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
        allowFullScreen
        className="w-full h-64 md:h-96"
      ></iframe>
    </div>
  </div>
);

export default CulturalVideo;
