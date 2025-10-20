import React, { useState } from "react";

// Dummy modal for UI, replace with your modal implementation
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          margin: "10vh auto",
          padding: 24,
          borderRadius: 8,
          maxWidth: 500,
        }}
      >
        {children}
        <button onClick={onClose} style={{ marginTop: 16 }}>
          إغلاق
        </button>
      </div>
    </div>
  );
}

const defaultMediaData = (mediaType) => ({
  Role: mediaType === "video" ? "Video" : "Image",
  AlternateText: "",
  Caption: "",
  SortOrder: 1,
});

export default function MediaPicker({
  value,
  onChange,
  mediaType = "image",
  error,
}) {
  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(value || "");
  const [uploading, setUploading] = useState(false);
  const [mediaList, setMediaList] = useState([]);

  // Fetch existing media (simulate API)
  React.useEffect(() => {
    // TODO: Replace with real API call
    setMediaList([
      { id: "1", url: "/media/sample1.jpg", type: "image" },
      { id: "2", url: "/media/sample2.jpg", type: "image" },
    ]);
  }, []);

  const handlePick = (media) => {
    setSelectedMedia(media.url);
    setOpen(false);
    if (onChange) onChange(media.url);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    // Prepare form data
    const formData = new FormData();
    formData.append("file", file);
    Object.entries(defaultMediaData(mediaType)).forEach(([k, v]) =>
      formData.append(k, v)
    );
    // TODO: Replace with your media API endpoint
    const res = await fetch("/api/media/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setUploading(false);
    if (data && (data.mediaId || data.url)) {
      setSelectedMedia(data.url || "");
      if (onChange) onChange(data.url || "");
      setOpen(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ padding: "6px 12px", borderRadius: 6, background: "#eee" }}
        >
          اختر أو ارفع ميديا
        </button>
        {selectedMedia &&
          (mediaType === "image" ? (
            <img
              src={selectedMedia}
              alt="preview"
              style={{
                width: 48,
                height: 48,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          ) : (
            <video
              src={selectedMedia}
              controls
              style={{ width: 80, height: 48, borderRadius: 4 }}
            />
          ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h3>اختر ميديا موجودة</h3>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {mediaList
            .filter((m) => m.type === mediaType)
            .map((media) => (
              <div
                key={media.id}
                style={{ cursor: "pointer" }}
                onClick={() => handlePick(media)}
              >
                {mediaType === "image" ? (
                  <img
                    src={media.url}
                    alt="media"
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                ) : (
                  <video
                    src={media.url}
                    style={{ width: 80, height: 80, borderRadius: 6 }}
                  />
                )}
              </div>
            ))}
        </div>
        <hr style={{ margin: "16px 0" }} />
        <h3>أو ارفع ميديا جديدة</h3>
        <input
          type="file"
          accept={mediaType === "image" ? "image/*" : "video/*"}
          onChange={handleUpload}
          disabled={uploading}
        />
        {uploading && <p>جاري الرفع...</p>}
      </Modal>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
