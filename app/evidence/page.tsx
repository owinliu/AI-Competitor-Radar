export default function EvidencePage() {
  const imgs = [
    "fenqile-app-home-0323.jpg",
    "fenqile-app-home-0402.jpg",
    "dxm-app-home-0323.jpg",
    "dxm-app-home-0402.jpg",
    "dxm-ops-campaign-0323.jpg",
    "dxm-ops-campaign-0402.jpg",
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h1 className="text-2xl font-semibold">证据库</h1>
      <p className="mt-2 text-sm text-slate-600">截图证据集中查看。</p>
      <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
        {imgs.map((src) => (
          <img key={src} src={`/evidence/${src}`} alt={src} className="rounded-lg border border-slate-200" />
        ))}
      </div>
    </div>
  );
}
